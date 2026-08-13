'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Spacewalk themed) ────────────────────────────
function DecoHelmet({ size = 70, color = '#C44B4B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Helmet dome */}
      <path d="M30 8 C14 8 8 22 8 32 C8 42 14 52 30 52 C46 52 52 42 52 32 C52 22 46 8 30 8Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Visor */}
      <path d="M16 28 C16 20 22 14 30 14 C38 14 44 20 44 28 C44 36 38 40 30 40 C22 40 16 36 16 28Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      {/* Reflection glare */}
      <path d="M22 22 Q26 18 32 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Antenna */}
      <line x1="44" y1="18" x2="52" y2="10" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="52" cy="10" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoTether({ size = 80, color = '#A8B5C0', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Tether line curving */}
      <path d="M5 24 Q20 8 35 24 Q50 40 65 24 Q72 16 78 20" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Carabiner ends */}
      <circle cx="5" cy="24" r="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="78" cy="20" r="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Snap hooks */}
      <path d="M3 21 L7 21" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M76 17 L80 17" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Safety clip */}
      <rect x="38" y="20" width="6" height="8" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoSuitLayers({ size = 70, color = '#D45A5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Concentric suit layers */}
      <rect x="10" y="6" width="40" height="48" rx="12" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
      <rect x="14" y="10" width="32" height="40" rx="9" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <rect x="18" y="14" width="24" height="32" rx="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <rect x="22" y="18" width="16" height="24" rx="4" fill={color} opacity="0.1" stroke={color} strokeWidth="1.2" opacity="0.55" />
      {/* Layer labels */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.5" />
      <circle cx="46" cy="22" r="1.5" fill={color} opacity="0.4" />
      <circle cx="44" cy="29" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoWrench({ size = 60, color = '#96A3AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Wrench body */}
      <path d="M18 42 L38 22" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Wrench head */}
      <path d="M38 22 C42 18 48 18 50 22 C52 26 48 30 44 28 L38 22Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      {/* Wrench handle end */}
      <circle cx="16" cy="44" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Floating bolts */}
      <rect x="8" y="12" width="4" height="4" fill={color} opacity="0.3" transform="rotate(45 10 14)" />
      <rect x="48" y="40" width="3" height="3" fill={color} opacity="0.25" transform="rotate(30 49.5 41.5)" />
    </svg>
  );
}

function DecoRadiation({ size = 70, color = '#B43A3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Radiation trefoil - three blades */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {[0, 120, 240].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 30 + 8 * Math.cos(rad);
        const y1 = 30 + 8 * Math.sin(rad);
        const x2 = 30 + 22 * Math.cos(rad);
        const y2 = 30 + 22 * Math.sin(rad);
        return (
          <path key={i}
            d={`M${x1} ${y1} Q${30 + 18 * Math.cos(rad - 0.4)} ${30 + 18 * Math.sin(rad - 0.4)} ${x2} ${y2} Q${30 + 18 * Math.cos(rad + 0.4)} ${30 + 18 * Math.sin(rad + 0.4)} ${x1} ${y1}`}
            fill={color} opacity="0.2" stroke={color} strokeWidth="0.8" />
        );
      })}
      {/* Warning ring */}
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function DecoOxygenTank({ size = 65, color = '#8491A0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tank body */}
      <rect x="18" y="12" width="24" height="36" rx="12" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Tank valve */}
      <rect x="26" y="6" width="8" height="8" rx="2" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="30" y1="2" x2="30" y2="6" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Pressure gauge */}
      <circle cx="30" cy="26" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="26" x2="33" y2="23" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* O2 bubbles */}
      <circle cx="14" cy="20" r="1.5" fill={color} opacity="0.3" />
      <circle cx="48" cy="28" r="2" fill={color} opacity="0.25" />
      <circle cx="12" cy="36" r="1" fill={color} opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'primer-paseo-espacial': [DecoHelmet, DecoTether, DecoSuitLayers],
  'traje-emu': [DecoSuitLayers, DecoHelmet, DecoOxygenTank],
  'preparacion-eva': [DecoOxygenTank, DecoHelmet, DecoSuitLayers],
  'herramientas-vacio': [DecoWrench, DecoTether, DecoHelmet],
  'reparaciones-orbita': [DecoWrench, DecoSuitLayers, DecoTether],
  'peligros-espacio': [DecoRadiation, DecoHelmet, DecoTether],
  'futuro-paseos-espaciales': [DecoHelmet, DecoOxygenTank, DecoRadiation],
};

// ─── Content Data ──────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Thomas, D. (2000). Walking in Space: Development of Space Walking Techniques, Springer-Praxis',
  'Sellers, J. (2005). Understanding Space: An Introduction to Astronautics, McGraw-Hill',
  'NASA EVA Office (2019). EVA Design Requirements and Considerations, NASA/TP-2019-220224',
  'Leonov, A. & Scott, D. (2004). Two Sides of the Moon: Our Story of the Cold War Space Race, Thomas Dunne Books',
  'Portree, D. & Treviño, R. (1997). Walking to Olympus: An EVA Chronology, NASA Monographs in Aerospace History',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'primer-paseo-espacial',
    title: 'El Primer Paseo Espacial',
    color: '#C44B4B',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'El 18 de marzo de 1965, el cosmonauta soviético Alexei Leonov se convirtió en el primer ser humano en flotar en el vacío del espacio exterior. La misión Voskhod 2, lanzada desde el cosmódromo de Baikonur en Kazajistán, llevaba a Leonov y al comandante Pavel Belyayev. A las 11:34 hora de Moscú, Leonov abrió la escotilla de la cámara de descompresión inflable y se impulsó hacia el exterior. Durante 12 minutos y 9 segundos, flotó conectado a la nave por un cable umbilical de 5.35 metros de largo, alcanzando una velocidad orbital de 28,000 km/h mientras contemplaba la Tierra y las estrellas sin ninguna barrera sólida entre él y el cosmos.',
      'Lo que el público soviético no supo durante décadas fue que la primera caminata espacial estuvo a punto de terminar en tragedia. En el vacío del espacio, donde la presión exterior es prácticamente cero, el traje Berkut de Leonov se infló como un globo hasta el punto en que no podía doblar las articulaciones. Sus manos se separaron de los guantes y sus pies de las botas dentro del traje rígido. Leonov no podía alcanzar la cámara de la cámara de cine que llevaba montada ni podía maniobrar para regresar a la escotilla de la nave, y su frecuencia cardíaca se disparó a 190 latidos por minuto mientras luchaba contra su propio traje.',
      'Ante la emergencia, Leonov tomó una decisión arriesgada: sin consultar al control de tierra, abrió una válvula para reducir la presión dentro de su traje, liberando oxígeno al vacío. Esta maniobra era peligrosa porque reducir la presión demasiado podía causar embolia gaseosa y la muerte. Leonov redujo la presión de 0.4 atmósferas a 0.27 atmósferas, lo mínimo para mantenerse consciente. Logró flexionar sus extremidades lo suficiente para entrar de cabeza a la esclusa, en lugar de entrar con los pies por delante como estaba planeado, y cerrar la escotilla detrás de él. Su valentía y capacidad de improvisación bajo presión salvaron la misión.',
      'Los problemas no terminaron con el regreso al interior de la nave. El sistema de reentrada automática falló, obligando a Belyayev a pilotar la Voskhod 2 manualmente, algo que nunca se había intentado. La cápsula aterrizó a 386 kilómetros del punto planeado, en un denso bosque cubierto de nieve en los montes Urales. Leonov y Belyayev pasaron dos noches en temperaturas de -30°C, rodeados de lobos y osos, antes de ser rescatados por equipos en esquís. Leonov registró que perdió 6 kilogramos de peso corporal solo por el estrés de la misión.',
      'Solo dos meses y medio después, el 3 de junio de 1965, el astronauta estadounidense Ed White realizó la primera caminata espacial norteamericana durante la misión Gemini 4. White pasó 23 minutos fuera de la cápsula, impulsándose con una pistola de gas a presión manual. A diferencia de Leonov, White disfrutó tanto la experiencia que se resistió a regresar al interior cuando el control de misión se lo ordenó, diciendo: "Es la experiencia más triste de mi vida". La competencia entre Estados Unidos y la Unión Soviética por dominar los paseos espaciales impulsó avances técnicos que beneficiarían a toda la humanidad en las décadas siguientes.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Alexei Leonov era un talentoso artista que dibujó y pintó lo que vio durante su caminata espacial. Sus bocetos del amanecer orbital y la curvatura terrestre, realizados con lápices de colores que llevó a bordo, se convirtieron en las primeras obras de arte creadas en el espacio. Después de su retiro, Leonov produjo más de 200 pinturas espaciales que han sido exhibidas en museos de Moscú y Washington D.C. El cráter Leonov en la cara oculta de la Luna fue nombrado en su honor por la Unión Astronómica Internacional en 1970.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El traje Berkut que usó Leonov pesaba 20 kilogramos y tenía un sistema de soporte vital autónomo para solo 45 minutos. La presión interna operaba a 0.4 atmósferas de oxígeno puro, en contraste con la presión atmosférica terrestre de 1 atmósfera con 21% de oxígeno. Esta diferencia de presión fue precisamente lo que causó la inflación del traje en el vacío. Los trajes modernos como el EMU operan a 0.29 atmósferas (4.3 psi), un equilibrio entre movilidad y protección que tomó décadas de ingeniería para perfeccionar.' },
    ],
    fact: 'Desde la caminata de Leonov en 1965 hasta julio de 2024, se han realizado más de 270 caminatas espaciales desde la Estación Espacial Internacional solamente. El récord de mayor número de EVAs lo tiene el astronauta Michael López-Alegría con 10 caminatas que suman 67 horas y 40 minutos fuera de la estación. La caminata espacial más larga de la historia duró 8 horas y 56 minutos, realizada por Susan Helms y Jim Voss el 11 de marzo de 2001 durante la misión STS-102, mientras instalaban equipo en la ISS.',
  },
  {
    id: 'traje-emu',
    title: 'El Traje EMU',
    color: '#A8B5C0',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'La Unidad de Movilidad Extravehicular (EMU, por sus siglas en inglés) es el traje espacial que los astronautas de la NASA utilizan para realizar caminatas espaciales desde la Estación Espacial Internacional. Este traje no es una simple vestimenta protectora: es una nave espacial individual que permite a un ser humano sobrevivir y trabajar en el vacío del espacio durante períodos de 6 a 8 horas. Cada EMU pesa aproximadamente 127 kilogramos en la Tierra, aunque en microgravedad el astronauta no siente ese peso. El costo de fabricación de un solo traje EMU supera los 12 millones de dólares, y actualmente la NASA mantiene un inventario limitado de estos trajes, algunos de los cuales han estado en servicio desde la década de 1980.',
      'El EMU está compuesto por 14 capas de materiales diferentes, cada una con una función específica. La capa más interna es un forro de nylon que retiene la ventilación. Sobre esta se encuentra la Prenda de Enfriamiento Líquido (LCVG), una malla con 91.5 metros de tubos delgados por donde circula agua fría para regular la temperatura corporal del astronauta. Las capas intermedias incluyen una vejiga de uretano presurizado, una capa de restricción de Dacron que mantiene la forma del traje bajo presión, y múltiples capas de Mylar aluminizado que proporcionan aislamiento térmico. Las capas externas están fabricadas con Ortho-Fabric, una combinación de Gore-Tex, Kevlar y Nomex que resiste impactos de micrometeoritos a velocidades de hasta 7 km/s.',
      'El sistema de Soporte Vital Primario (PLSS), ubicado en la mochila que el astronauta lleva en la espalda, es el corazón del EMU. Este sistema suministra oxígeno respirable a una presión de 4.3 psi (0.29 atmósferas), elimina el dióxido de carbono mediante cartuchos de hidróxido de litio, regula la temperatura circulando agua a través de la LCVG, y genera energía eléctrica para la comunicación y los sensores del traje. El PLSS contiene un suministro de oxígeno primario para 8 horas de operación y un tanque de emergencia secundario (SOP) con 30 minutos adicionales. El agua de enfriamiento se almacena en un tanque sublimador que la expulsa al vacío, donde se convierte en cristales de hielo.',
      'El casco del EMU es una pieza de ingeniería de alta precisión. La burbuja exterior está fabricada de policarbonato transparente resistente a impactos, mientras que la visera protectora EVVA (Extravehicular Visor Assembly) incorpora un filtro dorado que refleja la radiación solar y ultravioleta. Sin esta protección, la luz solar directa en el espacio podría causar daño permanente en la retina en cuestión de segundos. El casco también contiene las luces de trabajo, una cámara de video HD, y el sistema de comunicación SCSM con auriculares y micrófono. Dentro del casco, una barra acolchada llamada "Valsalva device" permite al astronauta presionar la nariz contra ella para ecualizar la presión en los oídos sin usar las manos.',
      'Los guantes del EMU representan uno de los mayores desafíos de ingeniería del traje. Deben ser lo suficientemente flexibles para que el astronauta pueda manipular herramientas pequeñas y tornillos, pero al mismo tiempo deben soportar la presurización interna y proteger contra temperaturas que oscilan entre -157°C en la sombra y +121°C bajo la luz solar directa. Cada par de guantes se fabrica a medida para cada astronauta, utilizando moldes de yeso de sus manos. Los guantes tienen calentadores eléctricos en las puntas de los dedos y silicona de agarre en las palmas. A pesar de estos avances, muchos astronautas reportan daño en las uñas después de caminatas prolongadas, incluyendo la pérdida temporal de uñas por la presión constante sobre las puntas de los dedos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El traje EMU tiene un sistema de hidratación integrado llamado "In-suit Drink Bag" que contiene 0.95 litros de agua potable dentro del casco. El astronauta bebe a través de una pajilla flexible que puede alcanzar con la boca sin usar las manos. También incluye una barra de comida de cereales adherida dentro del casco como alimento de emergencia. Si un astronauta necesita rascarse la nariz, puede frotar su cara contra un trozo de Velcro colocado específicamente dentro del casco para ese propósito, una solución sencilla para un problema que se descubrió muy temprano en el programa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La presión interna del EMU de 4.3 psi (29.6 kPa) es solo el 30% de la presión atmosférica terrestre al nivel del mar (14.7 psi / 101.3 kPa). Este valor no fue elegido al azar: es el resultado de décadas de investigación para encontrar el equilibrio entre la movilidad del astronauta (menor presión = articulaciones más flexibles) y la seguridad fisiológica (suficiente presión parcial de oxígeno para mantener la oxigenación sanguínea). Con oxígeno al 100% a 4.3 psi, la presión parcial de O₂ es 222 mmHg, superior a los 160 mmHg del aire terrestre al nivel del mar.' },
    ],
    fact: 'Los trajes EMU actualmente en uso en la ISS fueron diseñados originalmente para el programa del Transbordador Espacial en 1981 y tienen una vida útil de diseño de 15 años. Varios de estos trajes han estado en servicio durante más de 40 años, sometidos a reparaciones y actualizaciones constantes. En 2013, el astronauta italiano Luca Parmitano sufrió una fuga de agua dentro de su casco durante la EVA-23, acumulándose aproximadamente 1.5 litros de agua alrededor de su cara, ojos, nariz y oídos. Parmitano no podía ver ni oír, y casi se ahogó dentro de su traje en el espacio. Este incidente llevó a la NASA a instalar almohadillas absorbentes de emergencia y un tubo de respiración dentro de todos los cascos EMU.',
  },
  {
    id: 'preparacion-eva',
    title: 'Preparación para EVA',
    color: '#D45A5A',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'Antes de que un astronauta pueda abrir la escotilla y flotar en el espacio, debe completar un protocolo de preparación que dura entre 12 y 16 horas, repartidas en varios días. Este proceso no es simplemente vestirse con un traje: involucra procedimientos médicos, verificaciones técnicas del equipo, coordinación con el control de misión en Houston, y un acondicionamiento fisiológico diseñado para prevenir una condición potencialmente mortal conocida como enfermedad por descompresión. Cada paso de la preparación sigue un cronograma estricto verificado por múltiples equipos en tierra y en la estación.',
      'El protocolo de pre-respiración es el procedimiento más crítico antes de una EVA. La Estación Espacial Internacional mantiene una atmósfera de 14.7 psi con 21% de oxígeno y 79% de nitrógeno, igual que en la Tierra. Sin embargo, el traje EMU opera a solo 4.3 psi con oxígeno al 100%. Si un astronauta pasara directamente de la presión de la estación a la del traje, el nitrógeno disuelto en su sangre formaría burbujas, causando la enfermedad por descompresión (conocida como "las curvas" entre los buzos). Para evitarlo, los astronautas respiran oxígeno puro durante varias horas para eliminar el nitrógeno de sus tejidos. El protocolo estándar ISLE requiere que los astronautas duerman en la esclusa a presión reducida de 10.2 psi la noche anterior.',
      'La preparación técnica del traje comienza el día anterior a la EVA. Los astronautas verifican la integridad de cada componente: los sellos de las juntas, las baterías del sistema de comunicación, los niveles de oxígeno en los tanques principales y de emergencia, el funcionamiento de la bomba de agua de enfriamiento, y la respuesta de los calentadores de los guantes. También cargan las baterías del PLSS (Primary Life Support System) y preparan las herramientas específicas que utilizarán. Cada herramienta se coloca en un orden determinado en el mini-workstation que llevarán al pecho, porque en el espacio, perder una herramienta significa que flotará lejos de forma irrecuperable.',
      'El entrenamiento previo a cada EVA incluye cientos de horas de práctica submarina en el Laboratorio de Flotabilidad Neutral (NBL) de la NASA en Houston. Esta piscina gigantesca mide 62 metros de largo, 31 metros de ancho y 12 metros de profundidad, y contiene 23.5 millones de litros de agua. En su interior hay réplicas a escala real de los módulos exteriores de la ISS. Los astronautas, vestidos con trajes ponderados para lograr flotabilidad neutra (ni flotan ni se hunden), practican cada movimiento que realizarán en la EVA real. Por cada hora de caminata espacial real, los astronautas practican aproximadamente 7 horas bajo el agua.',
      'La mañana de la EVA, los astronautas completan el protocolo de pre-respiración final, se colocan la Prenda de Enfriamiento Líquido (una malla con tubos de agua), y comienzan a vestirse con el traje EMU. El proceso de vestirse requiere la ayuda de otro astronauta y toma aproximadamente 45 minutos. Una vez sellados dentro del traje, los astronautas realizan una verificación de fugas presurizando el traje y monitoreando la caída de presión durante varios minutos. Si la tasa de fuga excede los límites permitidos, la EVA se cancela. Finalmente, la esclusa se despresuriza gradualmente durante 30 minutos, bajando de 14.7 psi a prácticamente cero, momento en el que se abre la escotilla al vacío del espacio.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El protocolo de campout (acampar) es una de las técnicas más ingeniosas para reducir el tiempo de pre-respiración. La noche antes de una EVA, los dos astronautas que realizarán la caminata duermen dentro de la esclusa Quest con la presión reducida a 10.2 psi. Esto equivale a pasar la noche a una altitud de aproximadamente 3,000 metros sobre el nivel del mar. Durante este "campamento" nocturno, el nitrógeno comienza a salir de sus tejidos gradualmente, reduciendo el tiempo de pre-respiración con mascarilla de oxígeno puro de 4 horas a solo 50 minutos la mañana siguiente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La enfermedad por descompresión ocurre cuando la presión ambiente disminuye lo suficiente para que el nitrógeno disuelto en los tejidos corporales forme burbujas de gas. A presión normal, el cuerpo humano contiene aproximadamente 1 litro de nitrógeno disuelto. Las burbujas pueden bloquear vasos sanguíneos y causar dolor articular, parálisis, e incluso la muerte. La Ley de Henry establece que la solubilidad de un gas en un líquido es directamente proporcional a la presión parcial de ese gas. La NASA utiliza modelos matemáticos basados en esta ley para calcular los tiempos exactos de pre-respiración necesarios.' },
    ],
    fact: 'En toda la historia del programa espacial, ningún astronauta ha desarrollado enfermedad por descompresión severa durante una EVA, gracias a la efectividad de los protocolos de pre-respiración. Sin embargo, en pruebas en cámara de altitud en tierra, se han documentado casos de dolor articular leve (conocido como "bends tipo I") en condiciones simuladas de EVA. El protocolo ISLE (In-Suit Light Exercise) actual requiere que los astronautas realicen 50 minutos de ejercicio ligero en bicicleta mientras respiran oxígeno puro a través de una mascarilla, acelerando la eliminación de nitrógeno un 40% comparado con estar en reposo.',
  },
  {
    id: 'herramientas-vacio',
    title: 'Herramientas en el Vacío',
    color: '#96A3AE',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'Trabajar en el vacío del espacio presenta desafíos que no existen en la Tierra. No hay gravedad que mantenga las herramientas sobre una mesa, no hay fricción del aire que frene un objeto en movimiento, y cada acción que el astronauta realiza genera una reacción igual y opuesta según la Tercera Ley de Newton. Si un astronauta intenta girar un tornillo sin estar firmemente anclado, su cuerpo entero rotará en la dirección opuesta. Por estas razones, cada herramienta utilizada en caminatas espaciales ha sido diseñada específicamente para funcionar en microgravedad, con mecanismos que compensan la ausencia de peso y la presurización de los guantes.',
      'La herramienta más utilizada durante las EVAs es la Pistola de Agarre (Pistol Grip Tool o PGT), un taladro/destornillador inalámbrico diseñado para el espacio. La PGT puede girar en ambas direcciones y tiene control de torque ajustable, lo cual es esencial porque aplicar demasiada fuerza a un perno en el espacio podría romperlo o hacer que el astronauta pierda su posición. La herramienta funciona con baterías recargables que operan en el rango de temperaturas extremas del espacio (de -157°C a +121°C). Cada PGT viene con un juego de puntas intercambiables de 7/16 de pulgada, el tamaño estándar de todos los pernos de la Estación Espacial Internacional, una decisión de diseño que simplifica enormemente las reparaciones.',
      'Para mantener su posición mientras trabajan, los astronautas utilizan un sistema de sujeciones para pies llamado APFR (Articulating Portable Foot Restraint). Este dispositivo se monta en el extremo del brazo robótico Canadarm2 o en puntos fijos de la estructura de la ISS, y permite que el astronauta "se pare" en el espacio con los pies asegurados mientras usa ambas manos para trabajar. Sin las restricciones de pies, cada vez que un astronauta empujara o tirara de algo, saldría volando en la dirección opuesta. El APFR tiene articulaciones ajustables que permiten al astronauta orientar su cuerpo en cualquier ángulo necesario para acceder a los componentes de la estación.',
      'La seguridad durante una EVA depende de un sistema de cuerdas y ganchos llamado sistema de atadura de seguridad. Cada astronauta está conectado a la estación mediante un cable de retracción de 25.9 metros (85 pies) que evita que se alejen flotando. Además, los astronautas llevan dos cuerdas cortas de seguridad (safety tethers) de 0.9 metros que enganchan y desenganchan alternativamente a los pasamanos de la estación mientras se desplazan, asegurando que siempre haya al menos un punto de conexión. Como último recurso, cada astronauta lleva un dispositivo SAFER (Simplified Aid For EVA Rescue), una mochila propulsora con 24 pequeños chorros de nitrógeno gaseoso que permite al astronauta volar de regreso a la estación si se desconecta accidentalmente.',
      'Más allá de las herramientas manuales, los astronautas utilizan equipo especializado para tareas específicas. Las cámaras de inspección con iluminación LED permiten examinar áreas de difícil acceso sin desmontar paneles. Los conectores de fluidos M/OD (Meteoroid/Orbital Debris) están diseñados para ser conectados y desconectados con una sola mano, porque los guantes presurizados reducen la fuerza de agarre del astronauta al 25% de su capacidad normal en la Tierra. Las bolsas de basura para EVA (Disposal bags) se utilizan para guardar componentes retirados que no pueden dejarse flotando como basura espacial. Cada herramienta tiene su propio cable de sujeción para evitar que se pierda: un tornillo de 10 centímetros flotando libremente en órbita se convierte en un proyectil que viaja a 28,000 km/h.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2008, la astronauta Heidemarie Stefanyshyn-Piper perdió accidentalmente una bolsa de herramientas valorada en aproximadamente 100,000 dólares durante la EVA de la misión STS-126. La bolsa se alejó flotando mientras ella limpiaba una articulación con grasa. La bolsa de herramientas fue rastreada desde la Tierra como un objeto orbital más, con designación oficial 1998-067BL, y fue visible a simple vista durante varias semanas antes de reentrar en la atmósfera y desintegrarse en agosto de 2009. Este incidente resaltó la necesidad de mejorar los protocolos de sujeción de equipo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El dispositivo SAFER contiene 1.36 kilogramos de nitrógeno gaseoso comprimido a 22.7 MPa (3,300 psi) que alimenta 24 toberas de propulsión distribuidas alrededor de la mochila. Puede generar un cambio de velocidad (delta-v) de hasta 3 metros por segundo, suficiente para que un astronauta recorra la distancia desde el extremo de los paneles solares hasta la escotilla de la estación. El sistema se controla con un joystick manual que el astronauta acciona con la mano izquierda. SAFER nunca se ha utilizado en una emergencia real, pero se prueba regularmente al final de algunas EVAs.' },
    ],
    fact: 'Todos los pernos exteriores de la Estación Espacial Internacional son de tamaño 7/16 de pulgada (11.1 mm), una decisión de diseño tomada en la década de 1990 para simplificar las caminatas espaciales. Esto significa que los astronautas solo necesitan un tipo de punta para su Pistol Grip Tool, eliminando la necesidad de cambiar entre diferentes tamaños durante operaciones complejas en el vacío. Esta estandarización ha ahorrado cientos de horas de trabajo en más de 270 caminatas espaciales realizadas desde la ISS, y se ha convertido en una referencia de diseño para futuras estaciones espaciales y hábitats lunares.',
  },
  {
    id: 'reparaciones-orbita',
    title: 'Reparaciones en Órbita',
    color: '#B43A3A',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'Las misiones de servicio al Telescopio Espacial Hubble representan algunas de las caminatas espaciales más complejas y exitosas en la historia de la exploración espacial. El Hubble fue lanzado el 24 de abril de 1990 con un defecto en su espejo primario: estaba pulido con una desviación de solo 2.2 micrómetros (más delgado que un cabello humano), pero esa diferencia causaba imágenes borrosas que amenazaban con convertir el telescopio de 1,500 millones de dólares en un fracaso. En diciembre de 1993, la tripulación del Transbordador Endeavour (STS-61) realizó cinco EVAs en cinco días consecutivos para instalar el sistema óptico corrector COSTAR, una hazaña técnica equivalente a realizar cirugía ocular a un paciente del tamaño de un autobús escolar mientras ambos orbitan la Tierra a 27,000 km/h.',
      'Durante las cinco misiones de servicio al Hubble (SM1 en 1993, SM2 en 1997, SM3A en 1999, SM3B en 2002, y SM4 en 2009), los astronautas realizaron un total de 23 caminatas espaciales que sumaron más de 166 horas de trabajo extravehicular. Instalaron nuevas cámaras, espectrógrafos, giróscopos de orientación, paneles solares, baterías y computadoras. La misión SM4 de 2009 fue particularmente desafiante porque incluyó la reparación in-situ del Space Telescope Imaging Spectrograph (STIS), un instrumento que nunca fue diseñado para ser reparado en el espacio. Los astronautas tuvieron que retirar 111 tornillos diminutos con una herramienta especialmente fabricada para esta tarea.',
      'Las fugas de amoníaco en la Estación Espacial Internacional han requerido algunas de las EVAs de emergencia más urgentes. El sistema de control térmico de la ISS utiliza 340 kilogramos de amoníaco anhidro líquido como refrigerante, circulándolo a través de radiadores externos para disipar el calor generado por los equipos de la estación. El 9 de mayo de 2013, los astronautas Chris Cassidy y Tom Marshburn realizaron una EVA de emergencia con solo un día de preparación (en lugar de las semanas habituales) para reparar una fuga de amoníaco en el segmento P6 de la estructura de la estación. Trabajaron durante 5 horas y 30 minutos para reemplazar una bomba de refrigerante de 355 kilogramos.',
      'La reparación de paneles solares ha sido otra categoría frecuente de EVAs en la ISS. Cada uno de los ocho conjuntos de paneles solares de la estación mide 35 metros de largo y genera hasta 31 kilovatios de electricidad. En noviembre de 2007, durante la misión STS-120, los astronautas descubrieron un desgarro de 76 centímetros en uno de los paneles solares del segmento P6 mientras se reposicionaba. El astronauta Scott Parazynski fue trasladado al extremo del brazo robótico Canadarm2 extendido con una sección adicional improvisada, alcanzando una distancia de 27 metros desde la estructura principal para coser literalmente el panel con hebillas de alambre improvisadas, mientras el panel estaba generando 120 voltios de corriente continua.',
      'Las lecciones aprendidas de cada reparación en órbita han transformado el diseño de las naves y estaciones espaciales modernas. El concepto de "diseño para mantenimiento" (Design for Serviceability) ahora es un requisito fundamental en la ingeniería espacial. Los componentes críticos del Módulo Lunar Gateway y de la estación espacial Axiom se están diseñando con conectores accesibles, paneles extraíbles sin herramientas especiales, y redundancia modular que permite reemplazar unidades completas en lugar de reparar componentes individuales. Cada tornillo, cada panel y cada conducto se diseña pensando en que un astronauta con guantes presurizados deberá acceder a él algún día.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante la misión de servicio SM4 al Hubble en 2009, el astronauta Mike Massimino no podía retirar un pasamanos que bloqueaba el acceso a un instrumento. Después de intentar con la herramienta correcta sin éxito, el control de misión le autorizó a arrancar el pasamanos con la mano, algo nunca antes hecho en una EVA. Massimino tiró con toda su fuerza, el pasamanos se soltó, y la reparación pudo continuar. Este momento fue descrito por los ingenieros en tierra como uno de los más tensos en la historia del programa de servicio del Hubble.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El amoníaco utilizado como refrigerante en la ISS circula por los radiadores externos a temperaturas entre -34°C y +46°C, disipando hasta 70 kilovatios de calor generado por los equipos electrónicos de la estación. El sistema tiene dos bucles independientes (A y B) para redundancia. Si un astronauta entra en contacto con amoníaco durante una EVA, el protocolo exige que permanezca en la esclusa durante un período de descontaminación de una hora, porque el amoníaco puede causar quemaduras químicas en piel, ojos y pulmones si entra en la estación.' },
    ],
    fact: 'La reparación del Telescopio Hubble en 1993 es considerada una de las 10 misiones espaciales más importantes de la historia. Antes de la corrección óptica, el espejo del Hubble tenía una aberración esférica de 2.2 micrómetros que producía imágenes borrosas. El sistema corrector COSTAR (Corrective Optics Space Telescope Axial Replacement) funcionó como un par de lentes correctivos, similar a unas gafas. Después de la reparación, la resolución del Hubble alcanzó 0.05 segundos de arco, permitiéndole distinguir objetos separados por una distancia equivalente a identificar dos luciérnagas a 3 metros de separación vistas desde Tokio estando tú en Washington D.C.',
  },
  {
    id: 'peligros-espacio',
    title: 'Peligros del Espacio',
    color: '#8491A0',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'El vacío del espacio es un entorno letal para el cuerpo humano. Sin la protección de un traje espacial, un astronauta perdería la conciencia en aproximadamente 15 segundos debido a la falta de oxígeno. Los fluidos corporales comenzarían a hervir a temperatura corporal porque el punto de ebullición del agua disminuye con la presión: a presión cero, el agua hierve a 37°C. Sin embargo, la piel humana es lo suficientemente elástica para contener esta ebullición parcialmente, por lo que una persona no "explotaría" como muestran algunas películas. Los datos de este escenario provienen de un accidente en 1966 en una cámara de vacío de la NASA, donde un técnico llamado Jim LeBlanc quedó expuesto al vacío durante 27 segundos antes de ser represurizado. Recordó que su última sensación fue la saliva hirviendo sobre su lengua.',
      'Los micrometeoritos y la basura espacial representan un peligro constante durante las caminatas espaciales. La ISS orbita a una altitud de 408 kilómetros a una velocidad de 7.66 km/s (27,576 km/h). A esta velocidad, incluso un fragmento de pintura de 1 milímetro impactando el traje de un astronauta tendría la energía cinética equivalente a una bala calibre .22. La NASA estima que hay más de 130 millones de fragmentos de basura espacial menores de 1 centímetro en órbita terrestre baja, más de 1 millón de fragmentos entre 1 y 10 centímetros, y aproximadamente 36,500 objetos mayores de 10 centímetros rastreados por el Comando Espacial de EE.UU. Las capas exteriores del EMU están diseñadas para resistir impactos de partículas de hasta 1 milímetro viajando a 7 km/s.',
      'La radiación espacial es un enemigo invisible que los astronautas enfrentan cada vez que salen de la estación. Sin la protección del campo magnético terrestre y la atmósfera, el cuerpo recibe dosis significativas de radiación cósmica galáctica (GCR) y partículas energéticas solares (SEP). Durante una EVA típica de 6 horas, un astronauta recibe una dosis de radiación equivalente a aproximadamente 3 radiografías de tórax. Sin embargo, durante un evento de partículas solares (SPE), la dosis puede multiplicarse por cientos en cuestión de minutos. La NASA monitorea constantemente la actividad solar, y si se detecta una llamarada solar intensa, se suspende cualquier EVA en curso y los astronautas deben regresar al interior de la estación lo antes posible.',
      'Las temperaturas extremas en el espacio son un desafío permanente durante las EVAs. En órbita terrestre baja, un objeto puede experimentar variaciones térmicas de casi 280°C: desde -157°C cuando está en la sombra de la Tierra hasta +121°C cuando recibe luz solar directa. La ISS completa una órbita cada 90 minutos, lo que significa que los astronautas pasan de luz a sombra cada 45 minutos aproximadamente. El traje EMU maneja estas temperaturas extremas mediante las capas de Mylar aluminizado que actúan como aislante térmico (el mismo material de las mantas de emergencia), la circulación de agua de enfriamiento a través de la LCVG, y los calentadores eléctricos en los guantes. A pesar de estas protecciones, los astronautas reportan sentir frío intenso en las puntas de los dedos durante períodos prolongados en la sombra.',
      'La fatiga física y el riesgo ergonómico son peligros subestimados de las caminatas espaciales. Aunque los objetos no pesan nada en microgravedad, siguen teniendo masa e inercia: mover un componente de 300 kilogramos requiere fuerza para acelerarlo y fuerza para frenarlo. Los guantes presurizados del EMU reducen la fuerza de agarre al 25% y cada movimiento de los dedos requiere trabajar contra la presión interna del traje, equivalente a apretar continuamente una pelota de tenis. Después de una EVA de 6-7 horas, los astronautas reportan fatiga muscular extrema en las manos y antebrazos, y algunos desarrollan ampollas, hematomas subungueales (sangre bajo las uñas) y en casos severos, onycholysis (desprendimiento de uñas). La NASA ha documentado que el 22% de los astronautas que realizan EVAs experimentan alguna forma de lesión en las manos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En febrero de 2024, la ISS realizó una maniobra de evasión de emergencia para evitar un fragmento de un viejo satélite ruso que pasó a solo 1 kilómetro de la estación. Los astronautas fueron alertados con solo horas de anticipación y tuvieron que cerrar las escotillas entre módulos y prepararse para una posible evacuación en las cápsulas Crew Dragon y Soyuz. La estación debe realizar maniobras de evasión de basura espacial varias veces al año, y desde 1999 ha ejecutado más de 30 maniobras de este tipo para esquivar objetos potencialmente peligrosos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radiación cósmica galáctica (GCR) está compuesta principalmente por protones (87%), partículas alfa (12%) y iones pesados como hierro (1%). Los iones pesados, conocidos como partículas HZE (High-Z and Energy), son particularmente dañinos porque pueden atravesar el blindaje del traje y la estación, rompiendo cadenas de ADN en las células. Un solo ion de hierro viajando casi a la velocidad de la luz puede depositar tanta energía en una célula como 600 protones. La NASA limita la exposición de por vida de un astronauta para mantener el riesgo de cáncer inducido por radiación por debajo del 3% adicional.' },
    ],
    fact: 'El Síndrome de Kessler, propuesto por el científico de la NASA Donald Kessler en 1978, describe un escenario donde la densidad de basura espacial en órbita terrestre baja se vuelve tan alta que las colisiones entre objetos generan más fragmentos, creando una reacción en cascada que haría ciertas órbitas inutilizables durante generaciones. En 2007, China destruyó su propio satélite Fengyun-1C en una prueba antisatélite, generando más de 3,500 fragmentos rastreables y más de 150,000 fragmentos menores de 1 centímetro. Este único evento aumentó la cantidad de basura espacial catalogada en un 25% y sigue representando un riesgo para la ISS y las caminatas espaciales.',
  },
  {
    id: 'futuro-paseos-espaciales',
    title: 'El Futuro de los Paseos Espaciales',
    color: '#E46A6A',
    btnImage: '/assets/astrotrain/astrotrain_m3.png',
    image: '/assets/astrotrain/astrotrain_m3.png',
    content: [
      'El programa Artemis de la NASA planea devolver astronautas a la superficie lunar para la década de 2020, y con ello surge la necesidad de un traje espacial completamente nuevo. El traje xEMU (Exploration Extravehicular Mobility Unit), desarrollado en colaboración con Axiom Space bajo un contrato de 228.5 millones de dólares, está diseñado para operar tanto en microgravedad orbital como en la superficie lunar con gravedad parcial (1/6 de la terrestre). A diferencia del EMU actual que solo permite a los astronautas moverse de la cintura para arriba, el traje Axiom Extravehicular Activity Suit (AxEMU) incorpora articulaciones de cadera y rodilla avanzadas que permiten caminar, agacharse y recoger muestras del suelo, movimientos que eran difíciles con los trajes Apollo de la década de 1970.',
      'El diseño del AxEMU incluye mejoras fundamentales respecto al EMU de 40 años que sigue en uso. El nuevo traje viene en una variedad de tallas que se ajustan a un rango más amplio de cuerpos humanos, solucionando un problema histórico: en 2019, la NASA tuvo que cancelar la primera caminata espacial exclusivamente femenina porque la estación no tenía dos torsos de traje EMU de talla mediana disponibles al mismo tiempo. El AxEMU incorpora un sistema de soporte vital regenerativo que utiliza amina sólida para absorber CO₂ en lugar de cartuchos de hidróxido de litio desechables, reduciendo la masa de consumibles. El casco tiene un visor con protección mejorada contra el polvo lunar, que es abrasivo como vidrio molido y se adhiere a todo por su carga electrostática.',
      'Las operaciones EVA en la Luna presentan desafíos radicalmente diferentes a los de la órbita terrestre. El polvo lunar (regolito) es un material fino y abrasivo compuesto por fragmentos de vidrio volcánico y minerales triturados por miles de millones de años de impactos de meteoritos sin erosión atmosférica. Las partículas tienen bordes cortantes que dañaron los trajes Apollo: durante la misión Apollo 17 en diciembre de 1972, el astronauta Harrison Schmitt reportó que el polvo lunar estaba desgastando las capas exteriores de su traje después de solo tres EVAs. El regolito también se adhiere por carga electrostática y puede contaminar sellos, visores y articulaciones mecánicas. Los nuevos trajes lunares incorporan materiales resistentes a la abrasión y sistemas de limpieza de polvo activos.',
      'Más allá de la Luna, los ingenieros ya trabajan en conceptos de trajes para la superficie de Marte. Las EVAs marcianas serán radicalmente diferentes: Marte tiene una atmósfera tenue de 0.6% de la presión terrestre compuesta en un 95% de dióxido de carbono, una gravedad del 38% de la terrestre, temperaturas que varían entre -140°C y +20°C, y tormentas de polvo globales que pueden durar meses. Un traje marciano necesitaría protección térmica menos extrema que en la Luna (porque la atmósfera proporciona algo de aislamiento), pero requeriría sistemas de filtración de polvo y resistencia a la abrasión eólica. Los retrasos de comunicación de hasta 24 minutos entre Marte y la Tierra significan que los astronautas deberán tomar decisiones de emergencia durante EVAs sin consultar al control de misión.',
      'Los avances en materiales inteligentes están revolucionando el concepto mismo del traje espacial. El MIT ha desarrollado prototipos de trajes bioelásticos que utilizan bobinas de aleación con memoria de forma (como el nitinol) integradas en el tejido para aplicar presión mecánica directa sobre la piel, en lugar de depender de una atmósfera presurizada dentro del traje. Este concepto, conocido como traje de presión mecánica o MCP (Mechanical Counter Pressure), podría reducir el peso del traje a menos de 25 kilogramos y eliminar la necesidad del largo protocolo de pre-respiración, ya que no habría diferencia de presión atmosférica. La profesora Dava Newman del MIT ha liderado esta investigación desde 2007, y aunque los prototipos actuales aún no pueden sellar completamente todas las áreas del cuerpo, la tecnología podría estar lista para las misiones marcianas de la década de 2040.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El contrato de Axiom Space para desarrollar los trajes del programa Artemis incluye un requisito inusual: los trajes deben poder ser utilizados por al menos el 99% de la población adulta de astronautas, incluyendo personas de entre 1.49 metros y 1.95 metros de altura. Este es un cambio significativo respecto a los trajes EMU actuales, que solo vienen en tres tallas de torso (mediano, grande y extra grande) y históricamente han limitado qué astronautas podían realizar caminatas espaciales. La primera mujer en caminar sobre la Luna usará un traje AxEMU durante la misión Artemis III.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El concepto de traje de presión mecánica (MCP) se basa en que el cuerpo humano necesita una presión externa mínima de aproximadamente 3.5 psi (24 kPa) para funcionar correctamente. En un traje convencional, esta presión la proporciona un gas (oxígeno). En un traje MCP, la presión la aplica directamente el tejido elástico contra la piel. La ventaja clave es que cualquier perforación en un traje MCP afectaría solo el área local (como un rasguño), mientras que una perforación en un traje presurizado con gas causaría la pérdida de toda la atmósfera del traje. La investigación de la profesora Newman en el MIT ha demostrado que las fibras de nitinol pueden generar la presión necesaria cuando se activan con una corriente eléctrica.' },
    ],
    fact: 'La primera caminata espacial comercial fue realizada el 12 de septiembre de 2024 durante la misión Polaris Dawn de SpaceX. Los tripulantes Jared Isaacman y Sarah Gillis utilizaron los nuevos trajes IVA/EVA de SpaceX, diseñados internamente por la compañía, para realizar una breve EVA desde la cápsula Crew Dragon a una altitud de 700 kilómetros, la mayor altitud alcanzada por humanos desde el programa Apollo. A diferencia de las EVAs tradicionales con esclusa, toda la cápsula se despresurizó, exponiendo a los cuatro tripulantes al vacío. Los trajes de SpaceX pesan solo 25 kilogramos, una fracción del peso del EMU de 127 kilogramos, aunque tienen una autonomía mucho menor.',
  },
];

// ─── Spacewalk Particle Field (Canvas Background) ─────────────────────────────
function SpacewalkField() {
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
      hue: Math.random() > 0.5 ? '196,75,75' : '168,181,192', // red or silver
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

// ─── Spacewalk Header ──────────────────────────────────────────────────────────
function SpacewalkHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,75,75,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#evaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 EVA markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C44B4B','#A8B5C0','#D45A5A','#96A3AE','#B43A3A','#8491A0','#E46A6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central helmet icon */}
        <circle cx="300" cy="28" r="14" fill="none" stroke="#C44B4B" strokeWidth="1.5" opacity="0.6" />
        <path d="M290 24 Q300 16 310 24 Q310 34 300 36 Q290 34 290 24Z" fill="none" stroke="#C44B4B" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="28" r="3" fill="#C44B4B" opacity="0.3" />
        <defs>
          <linearGradient id="evaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(196,75,75,0.2)" />
            <stop offset="50%" stopColor="rgba(196,75,75,0.9)" />
            <stop offset="100%" stopColor="rgba(196,75,75,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C44B4B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PASEOS ESPACIALES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(196,75,75,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">TRABAJANDO EN EL VACÍO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(196,75,75,0.2)'}`,
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
          layoutId="activeDotAstroTrainM3"
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

// ─── Expandable Section with Random Direction ──────────────────────────────────
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

// ─── Magazine-Style Content Panel ──────────────────────────────────────────────
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

        {/* ─── Video Player (conditional) ─── */}
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

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(196,75,75,0.15)',
    }}>
      <Star size={14} style={{ color: '#C44B4B', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C44B4B, #A8B5C0)', borderRadius: '3px', boxShadow: '0 0 8px rgba(196,75,75,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C44B4B', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_AstroTrainM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(25,10,15,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/astrotrain/astrotrain_m3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(196,75,75,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <SpacewalkField />

      <SpacewalkHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(196,75,75,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(196,75,75,0.08)', borderRadius: '16px',
              border: '1px solid rgba(196,75,75,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C44B4B', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de los Paseos Espaciales!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Ingeniero Orbital
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
