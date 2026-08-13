'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Extinction themed) ————————————————————————
function DecoAsteroid({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Irregular asteroid body */}
      <path d="M30 8 L42 14 L48 28 L44 42 L32 50 L18 46 L10 34 L14 18 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Craters */}
      <circle cx="28" cy="24" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="36" cy="36" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="22" cy="38" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
      {/* Speed lines */}
      <line x1="50" y1="6" x2="56" y2="2" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="52" y1="12" x2="58" y2="8" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="48" y1="4" x2="54" y2="0" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Debris */}
      <circle cx="8" cy="48" r="1.5" fill={color} opacity="0.3" />
      <circle cx="52" cy="50" r="1" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoVolcano({ size = 70, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Mountain shape */}
      <path d="M10 55 L25 18 L30 22 L35 18 L50 55 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Eruption plume */}
      <path d="M27 18 Q24 8 30 5 Q36 8 33 18" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      {/* Smoke puffs */}
      <circle cx="30" cy="4" r="3" fill={color} opacity="0.2" />
      <circle cx="26" cy="2" r="2" fill={color} opacity="0.15" />
      <circle cx="34" cy="1" r="2.5" fill={color} opacity="0.15" />
      {/* Lava streams */}
      <path d="M28 30 Q26 40 22 50" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M32 28 Q35 40 40 52" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoFossil({ size = 70, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ammonite spiral */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.4" />
      {/* Ribs on shell */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 10 * Math.cos(rad)} y1={30 + 10 * Math.sin(rad)} x2={30 + 22 * Math.cos(rad)} y2={30 + 22 * Math.sin(rad)} stroke={color} strokeWidth="0.8" opacity="0.25" />;
      })}
    </svg>
  );
}

function DecoCrater({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Crater rim - ellipse */}
      <ellipse cx="30" cy="30" rx="24" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="32" rx="18" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="30" cy="34" rx="10" ry="4" fill={color} opacity="0.15" />
      {/* Ejecta rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 24 * Math.cos(rad)} y1={30 + 12 * Math.sin(rad)} x2={30 + 28 * Math.cos(rad)} y2={30 + 14 * Math.sin(rad)} stroke={color} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />;
      })}
      {/* Impact center */}
      <circle cx="30" cy="34" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSkull({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Dino skull profile simplified */}
      <path d="M12 35 L12 22 Q12 10 25 10 L45 12 Q52 14 52 22 L50 28 L46 30 L42 28 L38 30 L52 35 L48 40 L15 40 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinejoin="round" />
      {/* Eye socket */}
      <circle cx="22" cy="22" r="4" fill={color} opacity="0.2" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Teeth */}
      <line x1="38" y1="35" x2="38" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="42" y1="35" x2="42" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="46" y1="35" x2="46" y2="39" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Jaw */}
      <path d="M15 40 L15 45 L48 45 L48 40" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoStrata({ size = 80, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Geological strata layers */}
      <line x1="5" y1="10" x2="75" y2="10" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="5" y1="18" x2="75" y2="18" stroke={color} strokeWidth="1.5" opacity="0.35" />
      {/* K-Pg boundary highlight */}
      <line x1="5" y1="26" x2="75" y2="26" stroke={color} strokeWidth="2.5" opacity="0.6" />
      <line x1="5" y1="34" x2="75" y2="34" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="5" y1="42" x2="75" y2="42" stroke={color} strokeWidth="1.5" opacity="0.25" />
      {/* Iridium marker dots */}
      {[15, 30, 45, 55, 65].map((x, i) => <circle key={i} cx={x} cy="26" r="1.5" fill={color} opacity="0.5" />)}
      {/* Label arrow */}
      <path d="M78 23 L78 29" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M76 23 L78 21 L80 23" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'ultimo-dia-cretacico': [DecoAsteroid, DecoCrater, DecoStrata],
  'chicxulub-crater': [DecoCrater, DecoAsteroid, DecoFossil],
  'invierno-impacto': [DecoVolcano, DecoAsteroid, DecoStrata],
  'deccan-traps': [DecoVolcano, DecoStrata, DecoCrater],
  'sobrevivientes-extincion': [DecoSkull, DecoFossil, DecoAsteroid],
  'evidencia-fosil': [DecoStrata, DecoFossil, DecoCrater],
  'mundo-despues': [DecoFossil, DecoSkull, DecoVolcano],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Alvarez, L. W., Alvarez, W., Asaro, F., & Michel, H. V. (1980). Extraterrestrial Cause for the Cretaceous-Tertiary Extinction. Science, 208(4448), 1095-1108',
  'Schulte, P., et al. (2010). The Chicxulub Asteroid Impact and Mass Extinction at the Cretaceous-Paleogene Boundary. Science, 327(5970), 1214-1218',
  'Brusatte, S. L. (2018). The Rise and Fall of the Dinosaurs: A New History of a Lost World. William Morrow',
  'Keller, G. (2014). Deccan Volcanism, the Chicxulub Impact, and the End-Cretaceous Mass Extinction: Coincidence? Cause and Effect? Geological Society of America Special Papers, 505, 57-89',
  'DePalma, R. A., et al. (2019). A Seismically Induced Onshore Surge Deposit at the KPg Boundary, North Dakota. Proceedings of the National Academy of Sciences, 116(17), 8190-8199',
  'Hull, P. M., et al. (2020). On Impact and Volcanism across the Cretaceous-Paleogene Boundary. Science, 367(6475), 266-272',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'ultimo-dia-cretacico',
    title: 'El Último Día del Cretácico',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_ultimo-dia-cretacico.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_ultimo-dia-cretacico.jpg',
    content: [
      'Hace 66 millones de años, el planeta Tierra era un mundo cálido dominado por dinosaurios que habían reinado durante más de 165 millones de años. Los continentes ocupaban posiciones diferentes a las actuales: la India era una isla flotando hacia Asia, el Atlántico era más estrecho, y América del Norte estaba parcialmente dividida por un mar interior. Los ecosistemas terrestres albergaban miles de especies de dinosaurios no avianos, desde depredadores como el Tyrannosaurus rex hasta herbívoros acorazados como el Triceratops y el Ankylosaurus, mientras los pterosaurios dominaban los cielos y los mosasaurios controlaban los océanos.',
      'En algún momento de ese último día del período Cretácico, un asteroide de entre 10 y 15 kilómetros de diámetro — aproximadamente del tamaño del Monte Everest — atravesó la atmósfera terrestre a una velocidad estimada de 20 kilómetros por segundo, equivalente a unos 72,000 kilómetros por hora. El objeto provenía del cinturón de asteroides entre Marte y Júpiter, y su trayectoria lo llevó a impactar en lo que hoy es la península de Yucatán, México, en aguas poco profundas de la plataforma continental del antiguo Mar de Tetis.',
      'El impacto liberó una energía equivalente a más de 10 mil millones de bombas de Hiroshima, o aproximadamente 4.2 × 10²³ julios. Para dimensionar esta cifra: toda la energía consumida por la humanidad en un año equivale a menos de una millonésima parte de la energía liberada en ese instante. La colisión vaporizó instantáneamente tanto el asteroide como varios kilómetros cúbicos de roca sedimentaria y agua marina, creando una bola de fuego que alcanzó temperaturas superiores a 10,000 grados Celsius, más caliente que la superficie del Sol.',
      'Las primeras consecuencias fueron inmediatas y catastróficas. Una onda de choque atmosférica se propagó a velocidad supersónica alrededor del globo, seguida por terremotos de magnitud estimada entre 10 y 12 en la escala de Richter — el terremoto más grande jamás registrado por instrumentos modernos fue de magnitud 9.5 en Chile en 1960. El impacto generó megatsunamis con olas de más de 100 metros de altura que barrieron las costas del Golfo de México y el Caribe.',
      'Robert DePalma describió en 2019 un sitio en Dakota del Norte, a más de 3,000 kilómetros del cráter, donde encontró peces fosilizados con esférulas de vidrio fundido (tektitas) incrustadas en sus branquias. Estas tektitas habían llovido del cielo minutos después del impacto, alcanzando la estratosfera y redistribuyéndose por todo el hemisferio. Los peces murieron atrapados por una oleada sísmica (seiche) provocada por el terremoto del impacto, preservando un registro directo del día en que un mundo terminó.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El asteroide que causó la extinción del Cretácico viajaba a tal velocidad que recorrió la distancia entre Madrid y Barcelona (aproximadamente 620 km) en solo 31 segundos. A esa velocidad, el tiempo entre el momento en que el asteroide tocó la parte superior de la atmósfera terrestre y su impacto contra el suelo fue de apenas 5 a 7 segundos. Los dinosaurios que estaban directamente debajo no tuvieron ninguna oportunidad de reaccionar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de 2020 publicado en Nature Communications por Gareth Collins del Imperial College London utilizó modelos hidrodinámicos para determinar que el ángulo de impacto del asteroide fue de aproximadamente 60 grados respecto a la horizontal. Este ángulo resultó ser el peor escenario posible para la vida en la Tierra, porque maximizó la cantidad de gases de azufre y dióxido de carbono lanzados a la atmósfera desde las rocas ricas en carbonatos y evaporitas del suelo marino de Yucatán.' },
    ],
    fact: 'El asteroide Chicxulub no fue el más grande que ha impactado la Tierra. El cráter de Vredefort en Sudáfrica, formado hace 2,023 millones de años, fue causado por un objeto de entre 20 y 25 kilómetros de diámetro, y su cráter original medía unos 300 kilómetros. Sin embargo, en aquella época la vida en la Tierra era exclusivamente microbiana y unicelular, por lo que el impacto no provocó una extinción masiva de la misma magnitud que Chicxulub.',
  },
  {
    id: 'chicxulub-crater',
    title: 'Chicxulub: El Cráter Oculto',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_chicxulub-crater.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_chicxulub-crater.jpg',
    content: [
      'El cráter de Chicxulub permanece oculto bajo cientos de metros de sedimentos acumulados durante 66 millones de años en la península de Yucatán, México. Con un diámetro de aproximadamente 180 kilómetros y una profundidad original estimada de 20 kilómetros, es una de las estructuras de impacto más grandes confirmadas en la Tierra. Su nombre proviene del pueblo maya de Chicxulub Puerto, ubicado cerca del centro del cráter, y en lengua maya significa "la pulga del diablo", una coincidencia lingüística que los científicos encuentran adecuada.',
      'El descubrimiento del cráter tiene una historia notable. En 1978, el geofísico Glen Penfield, trabajando para la compañía petrolera estatal mexicana Pemex, analizó datos de magnetometría y gravimetría durante prospecciones petroleras en el Golfo de México. Penfield detectó un arco semicircular de anomalías magnéticas bajo la costa norte de Yucatán que no correspondía a ninguna estructura geológica conocida. Junto con su colega Antonio Camargo, presentaron sus hallazgos en 1981 en la conferencia de la Society of Exploration Geophysicists, pero el trabajo recibió poca atención porque los datos de Pemex eran confidenciales.',
      'No fue hasta 1991 cuando el geólogo canadiense Alan Hildebrand, buscando el cráter predicho por la hipótesis de Alvarez, conectó los hallazgos de Penfield con la evidencia geológica. Hildebrand localizó muestras de roca de perforaciones petroleras realizadas en Yucatán en los años 1950 que contenían breccias de impacto (rocas fragmentadas y fundidas por la colisión) y cuarzo de choque. La datación radiométrica de estas rocas mediante el método argón-argón confirmó una edad de 66.043 ± 0.011 millones de años, coincidiendo con la extinción del Cretácico-Paleógeno.',
      'La estructura del cráter revela la violencia del impacto. Presenta un anillo de picos centrales (peak ring) a unos 80 kilómetros del centro, formado cuando el suelo rebotó después de la compresión inicial. En 2016, la Expedición 364 del International Ocean Discovery Program perforó el anillo de picos a 1,335 metros de profundidad bajo el fondo marino. Los núcleos de roca extraídos mostraron granito del basamento cristalino que había sido elevado más de 10 kilómetros desde su posición original, fracturado y parcialmente fundido por la energía del impacto.',
      'Un descubrimiento clave dentro del cráter fue la presencia de altas concentraciones de iridio, un elemento químico extremadamente raro en la corteza terrestre (apenas 0.001 partes por millón) pero presente en concentraciones mucho mayores en asteroides y meteoritos. La capa de iridio encontrada en la frontera Cretácico-Paleógeno en todo el mundo contiene aproximadamente 500,000 toneladas de este metal, una cantidad consistente con un asteroide del tamaño estimado. Esta firma geoquímica fue la primera pista que llevó al equipo de Luis y Walter Alvarez a formular su hipótesis del impacto en 1980.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La línea de cenotes (pozos naturales de agua dulce) que bordea la península de Yucatán sigue exactamente el borde del cráter de Chicxulub. Los cenotes se formaron porque las fracturas del impacto crearon zonas de roca más porosa donde el agua subterránea disolvió la caliza con mayor facilidad. Los antiguos mayas utilizaban estos cenotes como fuentes de agua potable y sitios ceremoniales sagrados, sin saber que estaban construyendo su civilización sobre el borde de un cráter de extinción masiva.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las perforaciones de 2016 en el anillo de picos del cráter revelaron que la vida microbiana recolonizó el interior del cráter en menos de 30,000 años después del impacto. Los investigadores encontraron bioturbación (huellas de organismos excavadores) en los sedimentos más antiguos post-impacto, así como restos de cianobacterias y foraminíferos planctónicos. El cráter caliente, rico en minerales y nutrientes, funcionó como una especie de fuente hidrotermal que aceleró la recuperación biológica local.' },
    ],
    fact: 'El cráter de Chicxulub no es visible a simple vista desde la superficie. Su existencia solo se puede detectar mediante instrumentos geofísicos. Sin embargo, hay una pista sutil: imágenes satelitales muestran un semicírculo de vegetación ligeramente diferente en el noroeste de Yucatán, donde las fracturas del cráter permiten que el agua subterránea fluya de manera distinta, creando condiciones de suelo que favorecen un tipo diferente de vegetación tropical respecto al terreno circundante.',
  },
  {
    id: 'invierno-impacto',
    title: 'El Invierno de Impacto',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_invierno-impacto.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_invierno-impacto.jpg',
    content: [
      'El impacto de Chicxulub desencadenó una cascada de efectos ambientales que transformaron la Tierra en un planeta hostil para la vida durante meses o años. En los primeros minutos, material eyectado fue lanzado a altitudes superiores a 100 kilómetros, alcanzando trayectorias suborbitales. Este material reentró en la atmósfera a velocidades hipersónicas en todas las latitudes del planeta, generando un calentamiento por fricción que elevó la temperatura del aire a nivel del suelo por encima de los 250 °C durante aproximadamente una hora. Este pulso térmico fue suficiente para encender incendios forestales masivos en áreas extensas de América del Norte y posiblemente otros continentes.',
      'Las tormentas de fuego que siguieron al impacto consumieron una proporción significativa de la biomasa vegetal terrestre. Estudios del registro de carbono fósil (hollín) en la capa del límite K-Pg muestran concentraciones que indican la combustión de aproximadamente el 70% de los bosques del planeta. El hollín resultante, combinado con los aerosoles de sulfato generados por la vaporización de las rocas ricas en yeso (sulfato de calcio) del fondo marino de Yucatán, formó una capa opaca en la atmósfera superior que bloqueó la radiación solar durante un período estimado de 18 a 24 meses.',
      'Este oscurecimiento global provocó un colapso de la fotosíntesis. Sin luz solar suficiente, las plantas terrestres dejaron de crecer y el fitoplancton oceánico — responsable de más del 50% de la producción de oxígeno del planeta — murió en cantidades masivas. Las cadenas alimentarias tanto terrestres como marinas se derrumbaron desde la base. Los herbívoros murieron por falta de alimento, seguidos por los depredadores que dependían de ellos. En los océanos, el colapso del fitoplancton provocó la extinción de los ammonites, los belemnites y numerosas familias de foraminíferos planctónicos.',
      'Las temperaturas globales descendieron entre 10 °C y 26 °C por debajo de los niveles previos al impacto, según modelos climáticos publicados en 2017 por Julia Brugger y colaboradores en la revista Geophysical Research Letters. Las regiones tropicales experimentaron heladas por primera vez en millones de años, y los océanos se enfriaron varios grados, alterando las corrientes marinas globales. Este invierno de impacto duró entre 3 y 16 años, dependiendo de la cantidad de hollín y aerosoles que permanecieron en la estratosfera.',
      'Después del invierno, llegó un calentamiento extremo. El dióxido de carbono (CO₂) liberado por la vaporización de carbonatos en Yucatán y por los incendios globales permaneció en la atmósfera durante miles de años, generando un efecto invernadero intenso. Las temperaturas subieron entre 2 °C y 5 °C por encima de los niveles del Cretácico tardío, y los océanos se acidificaron por la absorción de CO₂, lo que disolvió las conchas de organismos calcáreos. Este ciclo de frío extremo seguido de calor prolongado fue letal para la mayoría de los ecosistemas terrestres y marinos que habían sobrevivido al impacto inicial.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los aerosoles de azufre liberados por el impacto de Chicxulub también provocaron lluvia ácida con un pH estimado entre 1 y 2, similar al ácido de una batería de automóvil. Esta lluvia ácida disolvió las conchas de carbonato de calcio de los organismos marinos superficiales, contribuyó a la muerte masiva del fitoplancton y acidificó los ríos y lagos de agua dulce. La lluvia ácida persistió durante varios años después del impacto, hasta que los sulfatos fueron lavados de la atmósfera.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de 2017 en Proceedings of the National Academy of Sciences calculó que el impacto de Chicxulub liberó aproximadamente 325 gigatoneladas de azufre y 425 gigatoneladas de CO₂ a la atmósfera. Para comparar: las emisiones humanas anuales de CO₂ son de aproximadamente 40 gigatoneladas. El impacto liberó en segundos una cantidad de gases de efecto invernadero equivalente a más de diez años de emisiones industriales modernas, pero fue el azufre — no el CO₂ — el que causó el enfriamiento inmediato.' },
    ],
    fact: 'El hollín encontrado en la capa del límite K-Pg en todo el mundo tiene una composición química específica que indica que no provino solo de incendios forestales comunes. Un análisis de 2016 por Kaiho y Oshima en la revista Scientific Reports determinó que parte del hollín procedía de la combustión de hidrocarburos fósiles (petróleo y querógeno) presentes en las rocas sedimentarias de Yucatán que fueron vaporizadas por el impacto, lo que generó una "nube de petróleo quemado" a escala planetaria.',
  },
  {
    id: 'deccan-traps',
    title: 'Deccan Traps: El Otro Sospechoso',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_deccan-traps.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_deccan-traps.jpg',
    content: [
      'Mientras el asteroide de Chicxulub acapara la mayor parte de la atención, existe un segundo factor que los paleontólogos debaten activamente: las erupciones volcánicas de las Deccan Traps en lo que hoy es la India occidental. Estas erupciones representan uno de los eventos volcánicos más grandes en la historia de la Tierra, produciendo más de 1.5 millones de kilómetros cúbicos de lava basáltica que cubrieron un área de aproximadamente 500,000 kilómetros cuadrados — más grande que la superficie de España. Las capas de basalto acumuladas alcanzan espesores de hasta 2,400 metros en algunas regiones del estado de Maharashtra.',
      'La datación radiométrica mediante el método uranio-plomo, publicada por Blair Schoene y colaboradores en Science en 2019, demostró que la actividad principal de las Deccan Traps ocurrió en cuatro pulsos eruptivos entre 66.3 y 65.5 millones de años atrás, abarcando un período de aproximadamente 800,000 años. El pulso más intenso coincidió temporalmente con el impacto de Chicxulub, dentro de un margen de ±50,000 años, lo que plantea preguntas sobre la posible relación entre ambos eventos.',
      'La paleontóloga Gerta Keller, de la Universidad de Princeton, lideró durante décadas la posición de que las Deccan Traps fueron el principal agente de la extinción del Cretácico-Paleógeno. Keller argumentó que las emisiones volcánicas de CO₂ y SO₂ durante cientos de miles de años debilitaron progresivamente los ecosistemas globales antes de que el asteroide diera el golpe final. Según su modelo, las erupciones provocaron un calentamiento global de 2-3 °C, acidificación oceánica gradual y estrés ambiental sostenido que ya estaba reduciendo la diversidad de foraminíferos planctónicos antes del momento del impacto.',
      'En contraposición, Peter Schulte y un equipo internacional de 41 científicos publicaron en Science en 2010 un análisis exhaustivo que concluía que el impacto de Chicxulub fue la causa principal y suficiente de la extinción. Schulte argumentó que los patrones de extinción en el registro fósil son demasiado abruptos para ser explicados por un vulcanismo gradual, y que la evidencia geoquímica (iridio, cuarzo de choque, tektitas) apunta a un evento catastrófico único. Según este análisis, las Deccan Traps causaron perturbaciones ambientales, pero no extinciones masivas por sí solas.',
      'Un estudio de Pincelli Hull y colaboradores publicado en Science en 2020 intentó resolver el debate utilizando registros de temperatura oceánica de alta resolución. El estudio concluyó que la mayor parte del desgasamiento de CO₂ de las Deccan Traps ocurrió antes del impacto, causando un calentamiento de 2 °C que el ecosistema pudo absorber. La extinción masiva correlacionó exclusivamente con el impacto de Chicxulub. Sin embargo, Hull reconoció que las Deccan Traps pudieron haber condicionado los ecosistemas, haciéndolos más vulnerables al evento de impacto posterior. El debate entre "impacto solo" versus "doble causa" continúa activo en la comunidad paleontológica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Existe una hipótesis propuesta por Mark Richards y colaboradores en 2015 que sugiere que las ondas sísmicas del impacto de Chicxulub pudieron haber intensificado las erupciones de las Deccan Traps al otro lado del planeta. Según este modelo, el terremoto de magnitud 10+ generado por el impacto pudo haber reorganizado los conductos de magma bajo la India, aumentando el flujo de lava. Esto convertiría ambos eventos en parte de una sola cadena causal en lugar de coincidencias independientes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las erupciones de las Deccan Traps liberaron aproximadamente 8 × 10¹⁷ moles de CO₂ durante su período activo de 800,000 años. Para dimensionar: esto equivale a multiplicar las emisiones anuales actuales de CO₂ de toda la humanidad (40 gigatoneladas) por un factor de 500, pero repartidas a lo largo de 800 milenios. La tasa de emisión volcánica fue baja comparada con las emisiones humanas modernas, pero su duración fue suficiente para alterar el clima del Cretácico tardío.' },
    ],
    fact: 'Las Deccan Traps no son el único ejemplo de vulcanismo masivo asociado con una extinción. Las cinco grandes extinciones masivas de la historia de la Tierra — Ordovícico-Silúrico (444 Ma), Devónico tardío (372 Ma), Pérmica-Triásica (252 Ma), Triásica-Jurásica (201 Ma) y Cretácica-Paleógena (66 Ma) — todas coinciden con grandes provincias ígneas. La extinción pérmica, la más devastadora (eliminó el 96% de las especies marinas), coincidió con las Siberian Traps, erupciones que liberaron el doble de lava que las Deccan.',
  },
  {
    id: 'sobrevivientes-extincion',
    title: 'Quién Sobrevivió y Quién No',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_sobrevivientes-extincion.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_sobrevivientes-extincion.jpg',
    content: [
      'La extinción del Cretácico-Paleógeno eliminó aproximadamente el 76% de todas las especies del planeta, pero la distribución de las víctimas no fue aleatoria. Todos los dinosaurios no avianos desaparecieron: los terópodos carnívoros, los saurópodos de cuello largo, los ceratopsianos con cuernos, los hadrosaurios con pico de pato, los anquilosaurios acorazados y los paquicefalosaurios de cabeza gruesa. También se extinguieron los pterosaurios (reptiles voladores), los plesiosaurios y mosasaurios (reptiles marinos), los ammonites (moluscos cefalópodos con concha), y la mayoría de las familias de foraminíferos planctónicos marinos.',
      'Sin embargo, varios grupos de vertebrados cruzaron la frontera K-Pg. Los mamíferos sobrevivieron, aunque sufrieron pérdidas considerables: se estima que solo el 7% de las especies de mamíferos del Cretácico tardío sobrevivieron al evento. Los supervivientes tendían a ser pequeños (menores de 1 kilogramo), omnívoros o insectívoros, y muchos eran nocturnos o semifosoriales (vivían parcialmente bajo tierra). Estos rasgos les permitieron resistir las condiciones extremas del invierno de impacto porque necesitaban menos alimento, podían refugiarse en madrigueras y se alimentaban de insectos, semillas o materia orgánica en descomposición.',
      'Los cocodrilos y los aligatores sobrevivieron, lo cual puede parecer sorprendente dado su gran tamaño. La clave de su supervivencia reside en varios factores: son ectotermos (no generan su propio calor corporal), lo que reduce drásticamente sus necesidades energéticas; pueden pasar meses sin comer; viven en hábitats acuáticos que mantienen temperaturas más estables; y se alimentan de detritos orgánicos y carroña, recursos que permanecieron disponibles incluso durante el colapso de los ecosistemas terrestres. Las tortugas y los lagartos también sobrevivieron por razones similares.',
      'Las aves son dinosaurios terópodos — los descendientes directos de dinosaurios como el Velociraptor y el Deinonychus — y son los únicos dinosaurios que sobrevivieron. Pero no todas las aves del Cretácico lo lograron: los enantiornites (el grupo de aves más diverso del Cretácico) se extinguieron por completo. Las aves que sobrevivieron pertenecían al clado de los neornites (aves modernas) y tendían a ser pequeñas, con dietas basadas en semillas, granos o invertebrados acuáticos. Un estudio de Daniel Field y colaboradores publicado en Current Biology en 2018 propuso que las aves supervivientes eran predominantemente terrestres, no arbóreas, porque la destrucción de los bosques globales eliminó los hábitats arbóreos.',
      'En los océanos, los tiburones sobrevivieron con pérdidas moderadas, mientras que los peces óseos experimentaron extinciones selectivas pero mantuvieron una diversidad considerable. Los invertebrados marinos sufrieron de manera desigual: los ammonites y los belemnites desaparecieron por completo, pero los nautiloides (parientes de los ammonites con conchas más simples) sobrevivieron. Los bivalvos y gastrópodos sufrieron pérdidas del 50-60% de sus géneros, pero se recuperaron. La supervivencia selectiva dependió de factores como el tamaño corporal, la posición trófica, las necesidades metabólicas y la capacidad de entrar en estados de latencia durante períodos de escasez alimentaria prolongada.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las ranas y salamandras actuales representan uno de los éxitos de supervivencia más notables del evento K-Pg. A pesar de ser animales delicados con piel permeable sensible a la contaminación, los anfibios sobrevivieron al invierno de impacto, la lluvia ácida y el colapso ecosistémico. Los investigadores creen que su capacidad de entrar en estados de torpor metabólico durante meses, refugiarse bajo tierra o bajo el agua, y alimentarse de invertebrados detritivoros les permitió resistir las condiciones extremas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un análisis filogenético publicado en 2016 por Nicholas Longrich y colaboradores en Journal of Evolutionary Biology examinó el registro fósil de serpientes a través de la frontera K-Pg. El estudio encontró que al menos 6 linajes de serpientes cruzaron la extinción, y que el período inmediatamente posterior vio una radiación adaptativa de nuevas especies que ocuparon los nichos ecológicos dejados vacíos por los lagartos y pequeños depredadores extintos. Las serpientes modernas — boas, pitones, cobras, víboras — son todas descendientes de estos supervivientes del Cretácico.' },
    ],
    fact: 'El patrón de supervivencia selectiva revela una paradoja: los dinosaurios no avianos estaban entre los animales más exitosos de la historia, habiendo dominado todos los continentes durante 165 millones de años. Su extinción no se debió a alguna debilidad inherente, sino a que sus adaptaciones — gran tamaño corporal, alta tasa metabólica, dependencia de cadenas alimentarias complejas — resultaron ser desventajas específicas durante un evento de oscurecimiento global y colapso de la fotosíntesis que duró varios años.',
  },
  {
    id: 'evidencia-fosil',
    title: 'La Evidencia Fósil',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_evidencia-fosil.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_evidencia-fosil.jpg',
    content: [
      'La hipótesis del impacto extraterrestre como causa de la extinción del Cretácico fue propuesta en 1980 por el equipo formado por el físico Luis Walter Alvarez (Premio Nobel de Física 1968) y su hijo Walter Alvarez, geólogo de la Universidad de California, Berkeley, junto con los químicos nucleares Frank Asaro y Helen Michel. Su artículo, publicado en la revista Science, presentó una anomalía geoquímica descubierta en una capa de arcilla de apenas 1 centímetro de espesor en un afloramiento cerca de Gubbio, Italia, en la frontera entre los estratos del Cretácico y los del Paleógeno.',
      'Esa delgada capa de arcilla contenía concentraciones de iridio 30 veces superiores a las normales en la corteza terrestre. El iridio es un elemento del grupo del platino que es extremadamente raro en las rocas terrestres (0.001 partes por millón) pero se encuentra en concentraciones 1,000 veces mayores en ciertos tipos de meteoritos condríticos. Los Alvarez calcularon que la cantidad total de iridio depositada globalmente en esa capa correspondía a un asteroide de aproximadamente 10 kilómetros de diámetro. Estudios posteriores encontraron la anomalía de iridio en más de 350 sitios en todos los continentes y en sedimentos del fondo oceánico.',
      'Además del iridio, la capa del límite K-Pg contiene tres tipos adicionales de evidencia mineral de impacto. Primero, cuarzo de choque (shocked quartz): granos de cuarzo con conjuntos paralelos de deformaciones planares visibles al microscopio, que solo se producen bajo presiones superiores a 10 gigapascales, condiciones que solo se alcanzan en impactos de asteroides o explosiones nucleares. Segundo, tektitas y microesférulas de vidrio: gotas de roca fundida que fueron eyectadas y se solidificaron en el aire. Tercero, espinelas de níquel: microcristales que se forman durante la condensación de vapor de roca a altas temperaturas.',
      'El registro fósil muestra un patrón de extinción abrupto y sincrónico a nivel global. En las secciones marinas mejor estudiadas, como las de El Kef (Túnez), Stevns Klint (Dinamarca) y Brazos River (Texas), la diversidad de foraminíferos planctónicos cae del orden de 50-60 especies a menos de 5 especies en un intervalo sedimentario de milímetros, correspondiente a un período de tiempo geológicamente instantáneo. Los nanofósiles calcáreos (cocolitofóridos) muestran un patrón similar, con una caída del 90% en la diversidad de especies exactamente en el límite K-Pg.',
      'En el registro terrestre, el límite K-Pg se manifiesta como un cambio dramático en el registro polínico. En América del Norte, las secciones del límite muestran una "spike de helechos" (fern spike): una capa donde el polen de plantas con flores desaparece bruscamente y es reemplazado por esporas de helechos, que llegan a constituir el 70-100% del registro palinológico. Los helechos son plantas pioneras que colonizan terrenos devastados (se observó el mismo fenómeno tras la erupción del Monte Santa Helena en 1980), y su dominancia indica la destrucción casi total de los bosques del Cretácico y la posterior recolonización desde cero.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La hipótesis de Alvarez fue recibida con gran escepticismo cuando se publicó en 1980. Muchos paleontólogos se opusieron, argumentando que la extinción fue gradual y no repentina. El propio Luis Alvarez describió a sus críticos como "no muy buenos científicos... más parecidos a coleccionistas de sellos". Esta declaración provocó una guerra académica entre físicos y paleontólogos que duró más de una década. Irónicamente, la hipótesis del impacto fue finalmente confirmada por la evidencia paleontológica que ambos bandos ayudaron a recopilar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El cuarzo de choque encontrado en la capa del límite K-Pg presenta un patrón de distribución global que permite triangular la ubicación del impacto. Los granos más grandes (hasta 1 milímetro) se encuentran en América del Norte y el Caribe, disminuyendo progresivamente en tamaño con la distancia. En Europa, los granos miden 0.1-0.3 milímetros; en el Pacífico, menos de 0.1 milímetros. Esta distribución es consistente con un impacto en la región de Centroamérica y fue uno de los argumentos que guiaron la búsqueda del cráter en Yucatán.' },
    ],
    fact: 'Helen Michel, una de las cuatro autoras del artículo original de Alvarez de 1980, realizó el análisis de activación neutrónica que midió las concentraciones de iridio con una precisión de partes por billón. Esta técnica, desarrollada originalmente para la industria nuclear, implica bombardear las muestras de roca con neutrones en un reactor nuclear y medir la radiación gamma resultante para identificar elementos traza. Michel analizó más de 300 muestras de 95 sitios en todo el mundo durante los años 1980 y 1990, construyendo el mapa global de la anomalía de iridio.',
  },
  {
    id: 'mundo-despues',
    title: 'El Mundo Después',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/infographic_m7/btn_mundo-despues.jpg',
    image: '/assets/dinosaurios/infographic_m7/hero_mundo-despues.jpg',
    content: [
      'Los primeros miles de años después del impacto constituyeron un período de recuperación lenta conocido como la "zona muerta" del Paleoceno temprano. El registro fósil de este intervalo muestra comunidades ecológicas empobrecidas con baja diversidad y dominadas por especies oportunistas y generalistas. En los océanos, el fitoplancton calcáreo fue reemplazado temporalmente por dinoflagelados y diatomeas, organismos con esqueletos de sílice que resistieron mejor la acidificación. En tierra, los bosques de coníferas y angiospermas del Cretácico fueron sustituidos por comunidades de helechos y luego por bosques de sucesión temprana dominados por palmeras y otras plantas de rápido crecimiento.',
      'La recuperación de los ecosistemas marinos tomó entre 1 y 3 millones de años, según los registros de foraminíferos planctónicos y nanofósiles calcáreos. Los arrecifes de coral, que habían colapsado por completo durante la extinción, tardaron entre 4 y 10 millones de años en restablecer estructuras complejas. En los ecosistemas terrestres, los bosques cerrados reaparecieron en un plazo de 1.4 millones de años, según el análisis de megafloras fósiles en América del Norte publicado por Ellen Currano y colaboradores.',
      'La desaparición de los dinosaurios no avianos abrió los nichos ecológicos que estos habían ocupado durante 165 millones de años, permitiendo una radiación adaptativa de los mamíferos. En el Cretácico tardío, la mayoría de los mamíferos eran pequeños (menores de 10 kg) y nocturnos. En los primeros 10 millones de años del Paleoceno, los mamíferos aumentaron drásticamente su tamaño corporal máximo, pasando de menos de 10 kg a más de 50 kg. Nuevos órdenes aparecieron: los primeros primates, los ancestros de caballos y rinocerontes, los primeros carnívoros placentarios y los precursores de las ballenas.',
      'Las aves también experimentaron una diversificación notable. Daniel Field y colaboradores propusieron en 2018 que los neornites (aves modernas) se diversificaron rápidamente después de la extinción, cuando los bosques destruidos comenzaron a regenerarse y nuevos hábitats arbóreos se abrieron. Los paleognatos (ancestros de avestruces y emúes) y los neognatos (que incluyen a todas las demás aves vivientes, desde colibríes hasta águilas) divergieron en los primeros millones de años del Paleoceno. Esta radiación aviar fue paralela a la de los mamíferos, con ambos grupos llenando nichos ecológicos complementarios.',
      'El período Paleoceno-Eoceno, entre 56 y 33 millones de años atrás, vio el establecimiento de ecosistemas de tipo moderno. Los bosques tropicales se expandieron hasta latitudes que hoy son templadas: se han encontrado fósiles de palmeras y cocodrilos en Groenlandia y la Antártida, indicando un clima global considerablemente más cálido que el actual. Los mamíferos alcanzaron tamaños gigantescos: el Paraceratherium (un rinoceronte sin cuerno del Oligoceno) medía 5 metros de altura y pesaba 20 toneladas, y los ancestros de las ballenas completaron su transición de la tierra al mar. La catástrofe del Cretácico, paradójicamente, sentó las bases para el mundo que habitamos hoy.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Uno de los mamíferos más exitosos del Paleoceno temprano fue Loxolophus, un animal del tamaño de un gato que vivió en América del Norte apenas 300,000 años después de la extinción. Los fósiles de Loxolophus encontrados en Nuevo México por Thomas Williamson muestran un animal omnívoro con dientes adaptados para triturar insectos, semillas y pequeños vertebrados. Este tipo de mamífero generalista fue el prototipo de la diversificación posterior que produjo la variedad de mamíferos que conocemos hoy.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de 2016 publicado en Proceedings of the Royal Society B por Manabu Sakamoto y colaboradores analizó estadísticamente las tasas de especiación y extinción de dinosaurios no avianos durante los últimos 50 millones de años del Cretácico. El estudio encontró que los dinosaurios estaban experimentando una disminución a largo plazo en su tasa neta de diversificación: las nuevas especies aparecían más lentamente que la tasa a la que otras se extinguían. Esto no significa que los dinosaurios se estuvieran extinguiendo "solos", pero sí que su capacidad de recuperarse de una perturbación catastrófica estaba comprometida.' },
    ],
    fact: 'Si el asteroide de Chicxulub hubiera llegado unos minutos antes o después, podría haber impactado en el océano profundo en lugar de la plataforma continental de Yucatán. Un estudio de Kunio Kaiho y Naga Oshima publicado en Scientific Reports en 2017 calculó que un impacto en el océano profundo habría generado significativamente menos hollín y aerosoles de sulfato, reduciendo la severidad del invierno de impacto. Bajo ese escenario, los dinosaurios no avianos podrían haber sobrevivido, y la historia evolutiva posterior — incluyendo el surgimiento de los mamíferos grandes y eventualmente los primates — habría sido radicalmente diferente.',
  },
];

// ——— Extinction Particle Field (Canvas Background) ——————————————————————
function ExtinctionField() {
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
        p.y += 0.12; // falling down like ash
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

// ——— Extinction Header ——————————————————————————————————————————————
function ExtinctionHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Impact arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#extinctGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central asteroid icon */}
        <circle cx="300" cy="28" r="10" fill="none" stroke="#C17829" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="28" r="4" fill="#C17829" opacity="0.3" />
        <line x1="290" y1="18" x2="286" y2="14" stroke="#C17829" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <line x1="310" y1="18" x2="314" y2="14" stroke="#C17829" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <line x1="312" y1="36" x2="316" y2="40" stroke="#C17829" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="extinctGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(193,120,41,0.9)" />
            <stop offset="100%" stopColor="rgba(62,124,139,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C17829" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA GRAN EXTINCIÓN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(193,120,41,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL FIN DEL CRETÁCICO · 66 Ma</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ——————————————————————————————————————————
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
          layoutId="activeDotDinosM7"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

        {/* ——— Video Section ——— */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
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

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_DinosM7() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.88) 0%, rgba(20,15,10,0.82) 40%, rgba(10,10,15,0.9) 100%), url(/assets/dinosaurios/dinos_m7.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(93,138,104,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <ExtinctionField />

      <ExtinctionHeader />

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
              🏆 ¡Has explorado toda la evidencia de la extinción del Cretácico!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Paleontólogo
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
