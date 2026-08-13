'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ━━━ SVG Decorative Elements (Wardenclyffe / Electrical Tower themed) ━━━━━━━━━━━━━━━━━━
function DecoTower({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tower base */}
      <line x1="22" y1="55" x2="30" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="55" x2="30" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Cross beams */}
      <line x1="24" y1="45" x2="36" y2="45" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="35" x2="35" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="27" y1="25" x2="33" y2="25" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Mushroom dome */}
      <ellipse cx="30" cy="8" rx="14" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M16 8 Q30 -2 44 8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Energy radiating from dome */}
      <circle cx="30" cy="5" r="2" fill={color} opacity="0.5" />
      <line x1="30" y1="2" x2="30" y2="-2" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="24" y1="3" x2="20" y2="0" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="36" y1="3" x2="40" y2="0" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoLightningBolt({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCoil({ size = 60, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tesla coil windings */}
      <ellipse cx="30" cy="48" rx="12" ry="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="30" cy="42" rx="10" ry="3.5" fill="none" stroke={color} strokeWidth="1.1" opacity="0.5" />
      <ellipse cx="30" cy="36" rx="8" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <ellipse cx="30" cy="30" rx="6" ry="2.5" fill="none" stroke={color} strokeWidth="0.9" opacity="0.5" />
      <ellipse cx="30" cy="24" rx="4" ry="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
      {/* Top sphere */}
      <circle cx="30" cy="18" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="18" r="2" fill={color} opacity="0.4" />
      {/* Discharge */}
      <path d="M35 16 Q42 10 38 5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M25 16 Q18 10 22 5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoWaveSignal({ size = 80, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Radio waves emanating */}
      <path d="M10 20 Q20 8 30 20 Q40 32 50 20 Q60 8 70 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 20 Q22 12 30 20 Q38 28 45 20 Q52 12 60 20" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      {/* Signal dots */}
      <circle cx="10" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="70" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="40" cy="20" r="1.5" fill={color} opacity="0.4" />
      {/* Antenna */}
      <line x1="5" y1="10" x2="5" y2="30" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="5" cy="8" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoGlobe({ size = 70, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Globe */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="30" cy="30" rx="10" ry="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Meridian */}
      <line x1="30" y1="8" x2="30" y2="52" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="8" y1="30" x2="52" y2="30" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Energy dots around globe */}
      <circle cx="30" cy="6" r="1.5" fill={color} opacity="0.5" />
      <circle cx="54" cy="30" r="1.5" fill={color} opacity="0.5" />
      <circle cx="30" cy="54" r="1.5" fill={color} opacity="0.5" />
      <circle cx="6" cy="30" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoBlueprintGrid({ size = 70, color = '#5A6B7A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Blueprint grid */}
      {[10, 20, 30, 40, 50].map((v, i) => (
        <line key={`h${i}`} x1="5" y1={v} x2="55" y2={v} stroke={color} strokeWidth="0.5" opacity="0.3" />
      ))}
      {[10, 20, 30, 40, 50].map((v, i) => (
        <line key={`v${i}`} x1={v} y1="5" x2={v} y2="55" stroke={color} strokeWidth="0.5" opacity="0.3" />
      ))}
      {/* Structure outline */}
      <rect x="15" y="12" rx="2" ry="2" width="30" height="40" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Dimension lines */}
      <line x1="12" y1="12" x2="12" y2="52" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="10" y1="12" x2="14" y2="12" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="10" y1="52" x2="14" y2="52" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Center mark */}
      <circle cx="30" cy="32" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="27" y1="32" x2="33" y2="32" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="29" x2="30" y2="35" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'plan-ambicioso': [DecoGlobe, DecoWaveSignal, DecoTower],
  'torre-wardenclyffe': [DecoTower, DecoBlueprintGrid, DecoCoil],
  'jp-morgan-financiero': [DecoBlueprintGrid, DecoGlobe, DecoLightningBolt],
  'construccion-torre': [DecoBlueprintGrid, DecoTower, DecoCoil],
  'colapso-financiero': [DecoLightningBolt, DecoWaveSignal, DecoGlobe],
  'demolicion-torre': [DecoTower, DecoLightningBolt, DecoBlueprintGrid],
  'wardenclyffe-hoy': [DecoGlobe, DecoCoil, DecoWaveSignal],
};

// ━━━ Content Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'Seifer, M.J. (1996). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
  'Cheney, M. (2001). Tesla: Man Out of Time, Simon & Schuster',
  'Tesla Memorial Society (2014). Wardenclyffe: Tesla\'s Dream of a World Wireless System, Tesla Museum Belgrade Archives',
  'Lomas, R. (1999). The Man Who Invented the Twentieth Century: Nikola Tesla, Forgotten Genius of Electricity, Headline Publishing',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'plan-ambicioso',
    title: 'El Plan Más Ambicioso',
    color: '#D4A535',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'En 1899, tras sus experimentos en Colorado Springs donde generó descargas eléctricas de más de 30 metros de longitud, Nikola Tesla regresó a Nueva York con una idea que superaba cualquier proyecto de ingeniería previo: el Sistema Mundial Inalámbrico. Su propuesta consistía en construir una red de estaciones transmisoras capaces de enviar electricidad, mensajes, imágenes y señales horarias a cualquier punto del planeta sin necesidad de cables. Tesla calculó que con entre 30 y 40 estaciones distribuidas estratégicamente por la Tierra, cada una equipada con torres de transmisión resonante, sería posible cubrir todo el globo con energía y comunicaciones.',
      'El concepto técnico se basaba en la resonancia electromagnética del planeta. Tesla había observado en Colorado Springs que la Tierra se comporta como un conductor eléctrico de baja resistencia cuando se estimula a su frecuencia natural de resonancia, aproximadamente 7.83 Hz, un valor que el físico alemán Winfried Otto Schumann confirmaría matemáticamente en 1952. Tesla proponía inyectar corriente alterna a alta frecuencia en la corteza terrestre y en la ionosfera simultáneamente, creando un circuito eléctrico planetario. Los receptores en cualquier ubicación podrían extraer energía de este campo resonante mediante antenas sintonizadas.',
      'El alcance del proyecto no se limitaba a la transmisión de energía. Tesla describió en su solicitud de patente US787412 (presentada en 1900 y concedida en 1905) un sistema que integraría transmisión de datos, señales telegráficas, reproducción de fotografías a distancia, sincronización horaria global y comunicaciones de voz. En esencia, Tesla diseñó una versión primitiva pero funcional de lo que hoy conocemos como internet combinado con una red eléctrica inalámbrica. Su documento técnico "The World System" de 1904 detallaba cada componente necesario para esta infraestructura global.',
      'Tesla presentó su visión como una solución a los problemas de desigualdad energética global. En sus escritos de 1900 publicados en Century Magazine bajo el título "The Problem of Increasing Human Energy", argumentó que la energía accesible para todos los seres humanos era la clave del progreso de la civilización. Su sistema eliminaría la necesidad de tendidos eléctricos costosos, haría innecesarias las plantas generadoras locales y permitiría que regiones remotas del planeta accedieran a electricidad y comunicaciones por primera vez en la historia.',
      'La propuesta incluía aplicaciones militares y de navegación que Tesla ofreció al gobierno estadounidense sin éxito. Describió sistemas de detección de objetos a distancia mediante ondas reflejadas, un principio que Robert Watson-Watt desarrollaría independientemente en 1935 como radar. También propuso la guía de embarcaciones mediante señales de radiofrecuencia, anticipando los sistemas de navegación GPS por casi un siglo. El gobierno rechazó las propuestas de Tesla por considerarlas técnicamente inviables, una decisión que muchos historiadores de la ciencia han calificado como un error significativo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En Colorado Springs, Tesla registró en su diario el 3 de julio de 1899 que había detectado señales eléctricas regulares que, según él, provenían de otro planeta. Aunque la comunidad científica lo ridiculizó, investigaciones posteriores sugieren que Tesla pudo haber captado emisiones de radio naturales de Júpiter o señales de rayos atmosféricos lejanos. Los radioastrónomos Karl Jansky y Grote Reber confirmarían décadas después que los planetas sí emiten señales de radio detectables desde la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La resonancia Schumann que Tesla intentó aprovechar es un fenómeno real y mensurable. La cavidad electromagnética entre la superficie terrestre y la ionosfera vibra a frecuencias específicas: 7.83 Hz (fundamental), 14.3 Hz, 20.8 Hz, 27.3 Hz y 33.8 Hz. Estas frecuencias fueron predichas matemáticamente por W.O. Schumann en 1952 y confirmadas experimentalmente por Schumann y Herbert König en 1954. Tesla las detectó empíricamente medio siglo antes, en 1899.' },
    ],
    fact: 'El artículo de Tesla "The Problem of Increasing Human Energy" publicado en junio de 1900 en Century Magazine contenía una ecuación que relacionaba el progreso humano con la energía disponible: E = ½MV², donde M representaba la masa humana total y V la velocidad del progreso. Tesla argumentó que aumentar la energía disponible por persona era equivalente a aumentar la "velocidad" de la civilización. Este marco conceptual anticipó por más de un siglo los índices modernos de desarrollo humano que correlacionan consumo energético per cápita con indicadores de bienestar social.',
  },
  {
    id: 'torre-wardenclyffe',
    title: 'La Torre de Wardenclyffe',
    color: '#6B7B8A',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'La Torre Wardenclyffe fue diseñada como el primer nodo del Sistema Mundial Inalámbrico de Tesla. Ubicada en un terreno de 200 acres en Shoreham, Long Island, Nueva York, la estructura principal consistía en una torre de transmisión de 57 metros (187 pies) de altura construida con madera y acero. Su elemento más distintivo era una cúpula hemisférica de cobre de 20 metros (68 pies) de diámetro en la parte superior, diseñada para funcionar como un electrodo de descarga capacitiva que distribuiría energía electromagnética hacia la ionosfera. El peso total de la estructura metálica superior superaba las 55 toneladas.',
      'El arquitecto Stanford White, uno de los más prestigiosos de la era dorada estadounidense y socio del estudio McKim, Mead & White, diseñó el laboratorio adjunto a la torre de forma gratuita. White, quien también diseñó el Madison Square Garden original y el Arco de Washington Square, consideraba a Tesla un genio y aceptó el proyecto como un favor personal. El laboratorio de ladrillo de dos pisos contenía talleres de maquinaria, generadores eléctricos, un taller de soplado de vidrio para fabricar tubos de vacío y oficinas administrativas. White fue asesinado en junio de 1906 por Harry Kendall Thaw, y nunca vio el proyecto completado.',
      'La torre incorporaba innovaciones técnicas sin precedente en la ingeniería de 1901. Tesla diseñó un sistema de transmisión que operaba a frecuencias entre 30 kHz y 100 kHz, con una potencia prevista de hasta 300 kilovatios. La cúpula metálica actuaba como un condensador atmosférico, acumulando carga eléctrica que luego se descargaba en pulsos controlados. Tesla calculó que la impedancia de la ionosfera a estas frecuencias permitiría la propagación de ondas electromagnéticas a distancias intercontinentales con pérdidas mínimas, una hipótesis que la física moderna ha confirmado parcialmente para frecuencias ELF (extremadamente baja frecuencia).',
      'El componente subterráneo de Wardenclyffe era tan elaborado como la estructura visible. Bajo la base de la torre, Tesla ordenó la excavación de un pozo central de 36 metros (120 pies) de profundidad, revestido con paredes de ladrillo de 3 metros de diámetro. Desde la base de este pozo se extendían 16 tuberías de hierro de 100 pies de longitud cada una, dispuestas en forma radial como los rayos de una rueda, penetrando profundamente en el sustrato acuífero de Long Island. Este sistema actuaba como un electrodo de tierra masivo, diseñado para inyectar corrientes eléctricas directamente en la corteza terrestre.',
      'Tesla seleccionó el sitio de Shoreham específicamente por sus características geológicas. El sustrato de Long Island consiste en depósitos glaciales de arena y grava con un nivel freático alto, lo que proporciona excelente conductividad eléctrica subterránea. Los análisis geológicos modernos han confirmado que la elección del sitio fue técnicamente acertada para el propósito de Tesla. La proximidad al océano Atlántico también era estratégica: Tesla planeaba que Wardenclyffe fuera el extremo occidental de un enlace transatlántico, con una estación receptora correspondiente en la costa de Inglaterra.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Stanford White cobró exactamente cero dólares por diseñar el laboratorio de Wardenclyffe. Cuando Tesla le explicó su visión de energía global gratuita, White quedó tan impresionado que donó su tiempo profesional. El laboratorio que diseñó medía 28 por 28 metros y contenía un taller mecánico con tornos y fresadoras, un laboratorio eléctrico con generadores de alta frecuencia, y un taller de vidrio donde Tesla fabricaba sus propios tubos de vacío experimentales. El edificio de ladrillo original todavía existe en 2024.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las 16 tuberías de hierro subterráneas de Wardenclyffe formaban un sistema de puesta a tierra con una resistencia eléctrica calculada por Tesla en menos de 5 ohmios. Para comparación, el estándar moderno de puesta a tierra eléctrica industrial requiere menos de 25 ohmios. Tesla logró una conductividad cinco veces superior al estándar actual utilizando tecnología de 1901. Los ingenieros que excavaron el sitio en estudios posteriores confirmaron la presencia de las tuberías exactamente como Tesla las describió en sus planos originales.' },
    ],
    fact: 'El peso de la cúpula metálica de Wardenclyffe (55 toneladas de cobre y acero a 57 metros de altura) presentó un problema de ingeniería estructural que Tesla resolvió con un diseño de torre octagonal progresivamente estrechada. Cada sección de la torre se construyó con vigas de madera de pino amarillo del sur reforzadas con pernos de acero, distribuyendo la carga de forma que la presión en la base no superara los 2,000 libras por pie cuadrado. Este diseño anticipó principios de ingeniería de torres de telecomunicaciones que no se estandarizarían hasta la década de 1920.',
  },
  {
    id: 'jp-morgan-financiero',
    title: 'J.P. Morgan: El Financiero',
    color: '#C49225',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'John Pierpont Morgan, el banquero más poderoso de Estados Unidos a principios del siglo XX, invirtió $150,000 dólares en el proyecto Wardenclyffe en marzo de 1901. Esta suma, equivalente a aproximadamente $5.4 millones de dólares actuales ajustados por inflación, representaba una fracción del patrimonio de Morgan, estimado en más de $80 millones de la época. A cambio, Morgan recibió el 51% de los derechos sobre las patentes de iluminación inalámbrica de Tesla y cualquier beneficio comercial derivado del proyecto. El contrato fue redactado por el abogado de Morgan y firmado el 21 de marzo de 1901.',
      'Morgan esperaba que Tesla construyera un sistema de comunicaciones inalámbricas transatlánticas capaz de competir con los cables telegráficos submarinos existentes y con los experimentos de radio de Guglielmo Marconi. El negocio de las comunicaciones transatlánticas era enormemente lucrativo: la compañía de cables Anglo-American Telegraph facturaba millones anuales por transmitir mensajes entre Europa y América. Morgan veía en Tesla la oportunidad de dominar este mercado con tecnología superior. Sin embargo, lo que Tesla realmente planeaba era mucho más ambicioso y, desde la perspectiva de Morgan, comercialmente problemático.',
      'Tesla ocultó deliberadamente a Morgan el alcance total de sus planes. Mientras el contrato especificaba un sistema de "comunicaciones inalámbricas", Tesla diseñó Wardenclyffe como una estación de transmisión de energía eléctrica gratuita para todo el planeta. Cuando Morgan comprendió gradualmente las verdaderas intenciones de Tesla, su reacción fue predecible desde un punto de vista empresarial. Según la biografía de Morgan escrita por Ron Chernow en 1990, Morgan habría preguntado: "Si cualquiera puede acceder a la energía libremente, ¿dónde se conecta el medidor?" Esta frase, aunque su atribución exacta es debatida por los historiadores, resume el conflicto fundamental entre la visión de Tesla y los intereses comerciales de Morgan.',
      'La relación entre Tesla y Morgan se deterioró rápidamente durante 1902 y 1903. Tesla escribió docenas de cartas a Morgan solicitando fondos adicionales, explicando que el proyecto requería al menos $300,000 para completarse, el doble de la inversión original. Morgan no solo rechazó cada solicitud, sino que su decisión de no invertir más envió una señal al resto de la comunidad financiera de Wall Street. Ningún otro inversor se atrevió a financiar un proyecto que J.P. Morgan había abandonado. Tesla quedó efectivamente bloqueado del mercado de capitales de Nueva York, una situación financiera de la que nunca se recuperaría completamente.',
      'El contraste entre las filosofías de Tesla y Morgan representa uno de los dilemas más persistentes de la historia de la tecnología: la tensión entre innovación pública y rentabilidad privada. Morgan financió proyectos que generaban monopolios controlables (ferrocarriles, acero, electricidad con medidor). Tesla proponía una infraestructura que, por su propia naturaleza, no podía ser monopolizada ni medida. Este mismo debate continúa en el siglo XXI con cuestiones como la neutralidad de internet, el acceso universal a la energía renovable y la propiedad de los datos digitales. La historia de Morgan y Tesla se estudia actualmente en programas de ética empresarial de universidades como Harvard y Stanford.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'J.P. Morgan controlaba en 1901 el equivalente a más del 3% del producto interno bruto de Estados Unidos a través de sus inversiones en acero (U.S. Steel), ferrocarriles (Northern Securities), electricidad (General Electric) y banca. Su fortuna personal era tan grande que en 1907 rescató al sistema financiero estadounidense de un colapso bancario usando sus propios fondos, una función que después asumiría la Reserva Federal, creada en 1913 parcialmente como respuesta a la crisis que Morgan resolvió.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los $150,000 que Morgan invirtió en Wardenclyffe habrían permitido comprar en 1901 aproximadamente 7,500 onzas de oro a $20.67 la onza (precio fijado por el Gold Standard Act de 1900). Esa misma cantidad de oro valdría hoy más de $15 millones de dólares. Sin embargo, el valor de las patentes de Tesla que Morgan adquirió al 51% sería incalculable: la patente US787412 de transmisión inalámbrica de energía y las patentes relacionadas son precursoras directas de la tecnología de carga inalámbrica, un mercado valorado en $13,500 millones de dólares en 2023.' },
    ],
    fact: 'Las cartas entre Tesla y Morgan se conservan en la Biblioteca del Congreso de Estados Unidos (Tesla Papers, Manuscript Division) y en los archivos de la Pierpont Morgan Library en Nueva York. En total existen 58 cartas de Tesla a Morgan y 12 respuestas de Morgan a Tesla, escritas entre 1900 y 1905. Las cartas revelan que Tesla ofreció repetidamente a Morgan participación en patentes futuras, derechos sobre tecnologías aún no inventadas, e incluso control sobre su propio salario, todo a cambio de financiamiento adicional que Morgan rechazó sistemáticamente.',
  },
  {
    id: 'construccion-torre',
    title: 'La Construcción',
    color: '#7A8B96',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'La construcción de Wardenclyffe comenzó en septiembre de 1901 y se extendió de forma intermitente hasta 1902, cuando la falta de fondos detuvo el trabajo. Tesla contrató a la firma de construcción W. D. Crow & Company para la estructura principal y supervisó personalmente cada aspecto técnico del proyecto. Los planos originales, conservados en el Museo Tesla de Belgrado, muestran más de 200 dibujos técnicos detallados que Tesla produjo a mano, incluyendo especificaciones de materiales, cálculos de carga estructural y diagramas de circuitos eléctricos para los sistemas de transmisión.',
      'El componente subterráneo fue la parte más compleja y costosa de la construcción. El pozo central de 36 metros de profundidad requirió técnicas de excavación minera, con refuerzo continuo de las paredes mediante ladrillo para evitar el colapso en el sustrato arenoso de Long Island. Las 16 tuberías de hierro de 30 metros (100 pies) de longitud se insertaron radialmente desde la base del pozo, perforando el acuífero subterráneo. Cada tubería tenía un diámetro de aproximadamente 10 centímetros y fue sellada en su extremo distal para evitar la entrada de agua mientras mantenía contacto eléctrico con las capas geológicas conductoras.',
      'El transmisor diseñado por Tesla para Wardenclyffe era un oscilador de alta frecuencia basado en sus patentes de transformadores resonantes. El dispositivo central era un transformador Tesla de gran tamaño, capaz de generar voltajes de hasta 100 millones de voltios según los cálculos de Tesla, aunque esta cifra nunca se verificó experimentalmente en Wardenclyffe. El sistema utilizaba un generador primario de corriente alterna que alimentaba un banco de condensadores, los cuales descargaban su energía acumulada a través del transformador resonante en pulsos de alta frecuencia sincronizados con la frecuencia de resonancia de la Tierra.',
      'Los materiales de construcción reflejan la tecnología disponible en 1901. La torre principal utilizó madera de pino amarillo del sur (Pinus palustris), seleccionada por su resistencia a la putrefacción y su alta resistencia estructural, con una densidad de 590 kg/m³. Las uniones empleaban pernos de acero galvanizado y conectores de cobre para las secciones eléctricamente activas. La cúpula hemisférica se construyó con láminas de cobre remachadas sobre un armazón de acero, con un espesor de cobre de aproximadamente 3 milímetros, suficiente para soportar las corrientes de alta frecuencia que circularían por su superficie exterior debido al efecto piel (skin effect).',
      'Tesla documentó cada fase de la construcción con fotografías, muchas de las cuales sobreviven en los archivos del Museo Tesla de Belgrado. Estas imágenes muestran la progresión desde la excavación inicial hasta la erección de la estructura de madera y la instalación parcial de la cúpula. Las fotografías revelan que la torre nunca se completó totalmente: la cúpula aparece parcialmente ensamblada en las últimas imágenes conocidas, fechadas en 1902. Los registros contables del proyecto, también preservados en Belgrado, indican que Tesla gastó aproximadamente $200,000 dólares, superando significativamente la inversión de Morgan de $150,000, con la diferencia cubierta por fondos personales de Tesla y créditos de proveedores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El efecto piel (skin effect) que Tesla utilizó en el diseño de la cúpula de Wardenclyffe es un fenómeno por el cual la corriente alterna de alta frecuencia tiende a circular por la superficie exterior de un conductor, no por su interior. A frecuencias de 100 kHz, la profundidad de penetración en cobre es de solo 0.21 milímetros. Esto significaba que Tesla podía usar láminas relativamente delgadas de cobre y aun así transmitir corrientes enormes, ya que solo la superficie exterior de la cúpula participaba en la transmisión.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los 100 millones de voltios que Tesla afirmó poder generar en Wardenclyffe habrían requerido un campo eléctrico de aproximadamente 30 kV/cm para evitar la ruptura dieléctrica del aire seco a nivel del mar. Tesla planeaba operar la torre en condiciones donde la geometría de la cúpula distribuiría el campo eléctrico uniformemente, reduciendo la concentración de carga en puntos específicos. Los ingenieros modernos de transmisión de alta tensión utilizan principios idénticos en el diseño de anillos corona para líneas de transmisión de ultra alto voltaje de 1,000 kV.' },
    ],
    fact: 'Los planos originales de Wardenclyffe preservados en el Museo Nikola Tesla de Belgrado incluyen un dibujo fechado el 14 de junio de 1901 que muestra el sistema completo de tuberías subterráneas con anotaciones manuscritas de Tesla especificando la composición del suelo a diferentes profundidades. Tesla anotó "arena gruesa con grava" a 10 metros, "arcilla azul compacta" a 20 metros y "sustrato acuífero principal" a 30 metros. Estudios geológicos del Servicio Geológico de Estados Unidos (USGS) realizados en la zona de Shoreham en 1988 confirmaron que estas descripciones son geológicamente precisas.',
  },
  {
    id: 'colapso-financiero',
    title: 'El Colapso Financiero',
    color: '#8A9AA6',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'El colapso financiero del proyecto Wardenclyffe fue resultado de múltiples factores convergentes entre 1901 y 1905. El pánico bursátil de mayo de 1901, desencadenado por la lucha por el control del ferrocarril Northern Pacific entre E.H. Harriman y la alianza Morgan-Hill, provocó la caída más abrupta del mercado de valores desde 1893. El índice Dow Jones perdió un 46% de su valor en pocos días. Aunque Morgan salió fortalecido de la crisis, su apetito por inversiones especulativas disminuyó considerablemente, y el proyecto de Tesla quedó clasificado internamente como "alto riesgo, retorno incierto".',
      'El 12 de diciembre de 1901, Guglielmo Marconi logró transmitir la letra "S" en código Morse a través del Atlántico, desde Poldhu en Cornwall, Inglaterra, hasta Signal Hill en St. John\'s, Terranova. Aunque la validez de esta transmisión fue cuestionada por varios ingenieros de la época (la señal era débil y algunos argumentaron que Marconi pudo haber confundido ruido atmosférico con la señal), el anuncio fue una catástrofe mediática para Tesla. Morgan ya no necesitaba a Tesla para comunicaciones transatlánticas: Marconi aparentemente ya lo había logrado con equipamiento mucho más simple y económico.',
      'Tesla intentó diferenciarse de Marconi enfatizando que su sistema podía transmitir energía, no solo señales. Pero esta distinción trabajó en su contra. Los inversores potenciales comprendieron que un sistema de energía gratuita no generaría ingresos por consumo, a diferencia de las comunicaciones telegráficas que cobraban por palabra transmitida. Tesla escribió a Morgan el 3 de julio de 1903: "Lo que propongo no es un sueño, es una empresa simple de ingeniería eléctrica, solo que costosa." Morgan no respondió a esta carta ni a las 14 siguientes que Tesla envió entre julio de 1903 y la muerte de Morgan en marzo de 1913.',
      'La situación económica personal de Tesla se deterioró en paralelo. Para 1905, Tesla debía más de $20,000 a la compañía constructora W.D. Crow, $7,000 al hotel Waldorf-Astoria por alojamiento acumulado, y sumas menores a múltiples proveedores de materiales eléctricos y mecánicos. El hotel Waldorf-Astoria, donde Tesla residió durante años, eventualmente aceptó la escritura de la propiedad de Wardenclyffe como garantía de la deuda hotelera. Tesla perdió así el control legal del terreno y la torre que había construido con tanto empeño.',
      'Entre 1905 y 1915, Tesla realizó esfuerzos continuos por encontrar nuevos inversores. Contactó a John Jacob Astor IV (quien moriría en el Titanic en 1912), al industrial Henry Clay Frick, y al propio gobierno de Estados Unidos a través del Departamento de Guerra. Todos rechazaron la propuesta. Tesla también intentó vender el proyecto a gobiernos extranjeros, incluyendo ofertas a Canadá, Reino Unido y varios países europeos. La marca de "fracaso" que la retirada de Morgan había dejado sobre el proyecto resultó insuperable. Ningún inversor estaba dispuesto a financiar lo que el hombre más rico de América había abandonado.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La transmisión transatlántica de Marconi en diciembre de 1901 utilizó una antena de 122 metros de altura sostenida por un cable atado a una cometa en el lado receptor. Varios ingenieros, incluyendo al inventor estadounidense Lee de Forest, cuestionaron públicamente si Marconi realmente había recibido la señal o si había interpretado descargas atmosféricas como la letra S. El debate no se resolvió definitivamente hasta 1902, cuando Marconi repitió el experimento con equipos más sensibles a bordo del transatlántico SS Philadelphia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El pánico bursátil de 1901 fue causado por una "esquina de mercado" (corner) sobre las acciones del Northern Pacific Railway. El precio por acción subió de $114 a $1,000 en un solo día (9 de mayo de 1901) mientras los vendedores en corto intentaban cubrir sus posiciones. Los corredores que habían vendido acciones que no poseían enfrentaron pérdidas catastróficas. Este evento llevó a la primera regulación seria del mercado de valores estadounidense y demostró la vulnerabilidad del sistema financiero que Tesla necesitaba para su proyecto.' },
    ],
    fact: 'Las patentes de radio de Tesla (US645576 y US649621, ambas de 1900) fueron originalmente reconocidas por la Oficina de Patentes de Estados Unidos como prioritarias sobre las de Marconi. En 1904, la Oficina revirtió inexplicablemente su decisión y otorgó prioridad a Marconi, posiblemente influenciada por los poderosos inversores de Marconi, que incluían a Andrew Carnegie y a Thomas Edison. No fue hasta el 21 de junio de 1943, seis meses después de la muerte de Tesla, que la Corte Suprema de Estados Unidos (caso Marconi Wireless Telegraph Co. v. United States, 320 U.S. 1) restauró la prioridad de Tesla, invalidando las patentes fundamentales de Marconi.',
  },
  {
    id: 'demolicion-torre',
    title: 'La Demolición',
    color: '#B88420',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'La Torre Wardenclyffe fue demolida en el verano de 1917, dieciséis años después de que comenzara su construcción. La empresa Smiley Steel Company de Nueva York ejecutó la demolición mediante el uso de cargas de dinamita colocadas en puntos estructurales clave de la base octagonal de madera. La torre fue derribada en una operación que duró varios días, y los restos metálicos, incluyendo las láminas de cobre de la cúpula parcialmente completada y los refuerzos de acero, fueron vendidos como chatarra. El producto de la venta del metal se destinó parcialmente a cubrir las deudas acumuladas de Tesla con diversos acreedores.',
      'La orden de demolición fue emitida por los nuevos propietarios del terreno, quienes habían adquirido la propiedad a través de procedimientos legales relacionados con las deudas impagadas de Tesla. El gobierno federal también mostró interés en la demolición: durante la Primera Guerra Mundial, las autoridades militares sospecharon que la torre podía ser utilizada por espías alemanes como antena de comunicaciones o como punto de referencia para submarinos U-boot que operaban en aguas cercanas a Long Island. Aunque no existe documentación definitiva de una orden gubernamental directa, el historiador Marc Seifer documentó en su biografía de 1996 que el Departamento de Marina expresó "preocupación activa" sobre la estructura.',
      'Para Tesla, la demolición representó una pérdida personal de proporciones difíciles de exagerar. Tenía 61 años cuando vio destruir la obra que consideraba su contribución más importante a la humanidad. En sus notas privadas, preservadas en el Museo Tesla de Belgrado, escribió que la destrucción de Wardenclyffe fue "la mayor tragedia" de su vida profesional. Sus colaboradores cercanos reportaron que Tesla evitó hablar del tema durante años y que la experiencia afectó su salud mental, contribuyendo al aislamiento progresivo que caracterizó sus últimas décadas de vida.',
      'El laboratorio de ladrillo diseñado por Stanford White sobrevivió a la demolición de la torre y fue reutilizado por distintas empresas durante el siglo XX. La compañía Peerless Photo Products ocupó el edificio desde la década de 1930 hasta la de 1980, utilizando las instalaciones para el procesamiento de película fotográfica. Esta actividad industrial dejó contaminación por solventes químicos en el terreno, específicamente tetracloroetileno y cadmio, que requerirían descontaminación posterior. El edificio original de Tesla, aunque modificado, mantuvo su estructura básica intacta durante más de un siglo.',
      'Los componentes subterráneos de Wardenclyffe, incluyendo el pozo central y las 16 tuberías radiales de hierro, permanecieron bajo tierra tras la demolición de la torre. Excavaciones parciales realizadas en distintos momentos del siglo XX confirmaron la presencia de estos elementos exactamente como Tesla los describió en sus planos. En 2012, un equipo de investigadores utilizó radar de penetración terrestre (GPR) para mapear la extensión completa del sistema subterráneo sin necesidad de excavación. Los resultados mostraron que las tuberías se extendían aproximadamente 30 metros desde el pozo central en cada dirección, formando un patrón radial simétrico visible en las imágenes de radar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Smiley Steel Company cobró aproximadamente $1,750 por la demolición de la torre, una suma que se pagó con el producto de la venta de los materiales de desecho. El cobre de la cúpula se vendió a un precio de mercado de aproximadamente 27 centavos por libra (precio promedio del cobre en 1917 según el Bureau of Mines). Las vigas de acero se vendieron como chatarra férrica a aproximadamente $30 por tonelada. El valor total de los materiales recuperados fue inferior a $5,000, una fracción del costo original de construcción.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El radar de penetración terrestre (GPR) utilizado para estudiar los restos subterráneos de Wardenclyffe en 2012 opera emitiendo pulsos electromagnéticos de alta frecuencia (entre 100 MHz y 1 GHz) hacia el suelo y registrando las reflexiones producidas por cambios en la conductividad eléctrica del subsuelo. Las tuberías de hierro de Tesla producen reflexiones muy nítidas debido al alto contraste de impedancia electromagnética entre el hierro y la arena circundante, con un coeficiente de reflexión superior al 80%.' },
    ],
    fact: 'La dinamita utilizada para demoler la Torre Wardenclyffe fue inventada por Alfred Nobel en 1867, exactamente 50 años antes de la demolición. Nobel patentó la dinamita como una forma estable de nitroglicerina absorbida en tierra de diatomeas (kieselguhr). La ironía histórica es notable: los premios Nobel, financiados con la fortuna que Nobel acumuló vendiendo dinamita, nunca fueron otorgados a Tesla. A pesar de ser nominado para el Premio Nobel de Física en 1937 por el físico Felix Ehrenhaft, Tesla nunca recibió el galardón. El comité Nobel citó la falta de "contribuciones recientes" como razón, ignorando que las patentes de Tesla constituían la base técnica de toda la industria eléctrica mundial.',
  },
  {
    id: 'wardenclyffe-hoy',
    title: 'Wardenclyffe Hoy',
    color: '#5A6B7A',
    btnImage: '/assets/tesla/tesla_m4.png',
    image: '/assets/tesla/tesla_m4.png',
    content: [
      'El terreno de Wardenclyffe permaneció en uso industrial durante décadas hasta que en 2009 la propiedad fue puesta a la venta por $1.6 millones de dólares. Un grupo de entusiastas de Tesla formó la organización sin fines de lucro Tesla Science Center at Wardenclyffe (TSC) con el objetivo de adquirir el sitio y convertirlo en un museo y centro de ciencias. Sin embargo, la organización carecía de los fondos necesarios y la propiedad estuvo a punto de ser comprada por un desarrollador inmobiliario que planeaba construir un centro comercial en el terreno histórico.',
      'La salvación del sitio llegó de una fuente inesperada. En agosto de 2012, Matthew Inman, creador del sitio web de humor y divulgación The Oatmeal, publicó un artículo titulado "Why Nikola Tesla was the greatest geek who ever lived" que se viralizó en internet. Inman lanzó una campaña de recaudación de fondos en la plataforma Indiegogo con el objetivo de reunir $850,000 dólares en 45 días para contribuir a la compra de Wardenclyffe. La campaña recaudó $1,370,511 dólares de 33,253 donantes individuales de 108 países en solo 9 días, estableciendo un récord para la plataforma en ese momento.',
      'Con los fondos de la campaña y una subvención equivalente de $850,000 dólares del estado de Nueva York otorgada por la gobernadora adjunta Kathy Hochul, el Tesla Science Center completó la compra del terreno de 15.7 acres y el laboratorio original de Tesla en mayo de 2013 por un precio final de $1,370,000 dólares. La compra incluyó el edificio de ladrillo de dos pisos diseñado por Stanford White, que para entonces tenía 112 años de antigüedad pero mantenía su integridad estructural básica.',
      'La descontaminación ambiental del sitio ha sido un proceso prolongado y costoso. Los años de uso industrial por Peerless Photo Products dejaron el suelo contaminado con tetracloroetileno (un solvente de limpieza en seco), cadmio y plata (del procesamiento fotográfico). La empresa Agfa-Gevaert, sucesora de Peerless, financió la mayor parte de la remediación ambiental, que incluyó la excavación y tratamiento de más de 4,000 metros cúbicos de suelo contaminado. La Agencia de Protección Ambiental de Nueva York (NYSDEC) supervisó el proceso, que se completó sustancialmente en 2018.',
      'Los planes actuales del Tesla Science Center incluyen la construcción de un museo interactivo de ciencias y tecnología en el sitio original. El diseño preliminar contempla exhibiciones sobre la vida y obra de Tesla, laboratorios educativos donde los visitantes puedan experimentar con electricidad y magnetismo, y una réplica a escala de la Torre Wardenclyffe como elemento arquitectónico central. La organización ha recaudado más de $4 millones de dólares adicionales desde la compra y ha recibido el apoyo de figuras como Elon Musk, quien donó $1 millón de dólares en 2014, y del gobierno del condado de Suffolk, que designó el sitio como punto de interés histórico protegido.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Matthew Inman, el creador de The Oatmeal, no tenía formación científica ni conexión previa con Tesla cuando lanzó la campaña. Inman es un diseñador web y humorista gráfico de Seattle que se interesó en Tesla tras leer la biografía de W. Bernard Carlson. Su artículo web, ilustrado con su estilo característico de humor visual, fue compartido más de 2 millones de veces en redes sociales y fue citado por medios como The New York Times, BBC, CNN y The Guardian como ejemplo del poder del activismo digital para la preservación del patrimonio histórico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La descontaminación del sitio de Wardenclyffe requirió técnicas de biorremediación y excavación selectiva. El tetracloroetileno (C₂Cl₄), un compuesto organoclorado utilizado como solvente de limpieza en seco, tiene una densidad de 1.62 g/cm³ (más denso que el agua), lo que hace que se hunda en el acuífero subterráneo formando charcos de fase densa no acuosa (DNAPL). La remediación requirió la instalación de pozos de extracción y sistemas de tratamiento con carbón activado para filtrar el contaminante del agua subterránea, un proceso que tomó más de 5 años.' },
    ],
    fact: 'El edificio del laboratorio de Wardenclyffe diseñado por Stanford White fue incluido en el Registro Nacional de Lugares Históricos de Estados Unidos el 3 de octubre de 2018, con el número de referencia 18000873. La nominación fue preparada por el historiador arquitectónico John Tauranac y documenta que el edificio es el único laboratorio de Tesla que sobrevive en su ubicación original. Todos los demás laboratorios de Tesla, incluyendo los de la Calle Houston en Manhattan (destruido por incendio en 1895) y el de Colorado Springs (demolido en 1904), fueron destruidos durante la vida del inventor o poco después.',
  },
];

// ━━━ Electrical Storm Particle Field (Canvas Background) ━━━━━━━━━━━━━━━━━━━━━━━━━━
function ElectricalStormField() {
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
      hue: Math.random() > 0.5 ? '212,165,53' : '107,123,138', // marigold or storm grey
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

// ━━━ Wardenclyffe Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function WardenclyffHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Tower arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#teslaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D4A535','#6B7B8A','#C49225','#7A8B96','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central tower icon */}
        <line x1="300" y1="45" x2="300" y2="22" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="292" y1="45" x2="300" y2="22" stroke="#D4A535" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <line x1="308" y1="45" x2="300" y2="22" stroke="#D4A535" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <ellipse cx="300" cy="20" rx="8" ry="4" fill="none" stroke="#D4A535" strokeWidth="1" opacity="0.5" />
        <circle cx="300" cy="18" r="2" fill="#D4A535" opacity="0.5" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">WARDENCLYFFE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL SUEÑO ROTO DE TESLA</text>
      </svg>
    </div>
  );
}

// ━━━ Organic Node Button ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
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
          layoutId="activeDotTeslaM4"
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

// ━━━ Expandable Section with Random Direction ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━ Magazine-Style Content Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

      {/* ━━━ Two-Column Hero Section ━━━ */}
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

      {/* ━━━ Magazine Body ━━━ */}
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

        {/* ━━━ Expandable Interactive Sections ━━━ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ━━━ Conditional Video Player ━━━ */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
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

// ━━━ Progress Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A535, #6B7B8A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ━━━ Main Infographic Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function InteractiveInfographic_TeslaM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,12,20,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/tesla/tesla_m4.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <ElectricalStormField />

      <WardenclyffHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la historia completa de Wardenclyffe!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Pionero Inalámbrico
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━ Bibliografía ━━━ */}
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
