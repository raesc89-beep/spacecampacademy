'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Electricity & Magnetism themed) ————————————————
function DecoElectron({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.5" />
      {/* Electron orbits */}
      <ellipse cx="30" cy="30" rx="24" ry="9" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="24" ry="9" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="24" ry="9" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      {/* Electrons on orbits */}
      <circle cx="54" cy="30" r="2.5" fill={color} opacity="0.7" />
      <circle cx="18" cy="17" r="2.5" fill={color} opacity="0.7" />
      <circle cx="18" cy="43" r="2.5" fill={color} opacity="0.7" />
      {/* Charge symbol */}
      <line x1="27" y1="30" x2="33" y2="30" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="27" x2="30" y2="33" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoLightningBolt({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M34 4 L22 26 L30 26 L18 56 L44 22 L34 22 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Spark particles */}
      <circle cx="14" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="46" cy="12" r="1" fill={color} opacity="0.4" />
      <circle cx="50" cy="38" r="1.5" fill={color} opacity="0.5" />
      <circle cx="10" cy="42" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M16 14 Q10 19 14 24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M44 34 Q50 39 46 44" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCircuit({ size = 80, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Main circuit path */}
      <path d="M8 24 L20 24 L20 10 L40 10 L40 24 L50 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 24 L60 24 L60 38 L20 38 L20 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Resistor zigzag */}
      <path d="M50 24 L52 20 L54 28 L56 20 L58 28 L60 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Nodes */}
      <circle cx="20" cy="24" r="2.5" fill={color} opacity="0.5" />
      <circle cx="40" cy="10" r="2.5" fill={color} opacity="0.5" />
      <circle cx="60" cy="24" r="2.5" fill={color} opacity="0.5" />
      <circle cx="40" cy="38" r="2.5" fill={color} opacity="0.5" />
      {/* Battery symbol */}
      <line x1="6" y1="20" x2="6" y2="28" stroke={color} strokeWidth="2" opacity="0.6" />
      <line x1="10" y1="22" x2="10" y2="26" stroke={color} strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function DecoMagnet({ size = 60, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Horseshoe magnet */}
      <path d="M15 40 L15 22 Q15 8 30 8 Q45 8 45 22 L45 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Pole caps */}
      <rect x="10" y="38" width="10" height="6" rx="2" fill={color} opacity="0.4" />
      <rect x="40" y="38" width="10" height="6" rx="2" fill={color} opacity="0.4" />
      {/* Field lines */}
      <path d="M20 44 Q30 52 40 44" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M18 48 Q30 58 42 48" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* N and S labels */}
      <text x="15" y="36" fill={color} fontSize="6" fontWeight="bold" opacity="0.5" textAnchor="middle">N</text>
      <text x="45" y="36" fill={color} fontSize="6" fontWeight="bold" opacity="0.5" textAnchor="middle">S</text>
    </svg>
  );
}

function DecoCoil({ size = 70, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Coil windings */}
      <ellipse cx="30" cy="14" rx="16" ry="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="30" cy="22" rx="16" ry="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <ellipse cx="30" cy="30" rx="16" ry="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="30" cy="38" rx="16" ry="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <ellipse cx="30" cy="46" rx="16" ry="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Core */}
      <line x1="30" y1="9" x2="30" y2="51" stroke={color} strokeWidth="2" opacity="0.3" />
      {/* Sparks at top and bottom */}
      <circle cx="22" cy="8" r="1" fill={color} opacity="0.5" />
      <circle cx="38" cy="52" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoWaveform({ size = 80, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.22, ...style }}>
      {/* Sine wave */}
      <path d="M4 20 Q14 4 24 20 Q34 36 44 20 Q54 4 64 20 Q74 36 78 20" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      {/* Baseline */}
      <line x1="2" y1="20" x2="78" y2="20" stroke={color} strokeWidth="0.6" opacity="0.2" />
      {/* Peak markers */}
      <circle cx="14" cy="6" r="1.5" fill={color} opacity="0.4" />
      <circle cx="34" cy="34" r="1.5" fill={color} opacity="0.4" />
      <circle cx="54" cy="6" r="1.5" fill={color} opacity="0.4" />
      <circle cx="74" cy="34" r="1.5" fill={color} opacity="0.4" />
      {/* Amplitude arrows */}
      <line x1="14" y1="20" x2="14" y2="8" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="54" y1="20" x2="54" y2="8" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'electricidad-basico': [DecoElectron, DecoLightningBolt, DecoCircuit],
  'voltaje-corriente-resistencia': [DecoCircuit, DecoWaveform, DecoElectron],
  'circuitos-electricos': [DecoCircuit, DecoLightningBolt, DecoCoil],
  'magnetismo-electromagnetismo': [DecoMagnet, DecoCoil, DecoElectron],
  'induccion-electromagnetica': [DecoCoil, DecoWaveform, DecoMagnet],
  'potencia-electrica': [DecoLightningBolt, DecoCircuit, DecoWaveform],
  'electricidad-siglo-xxi': [DecoWaveform, DecoElectron, DecoCoil],
};

// ——— Content Data ————————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Griffiths, D.J. (2017). Introduction to Electrodynamics, 4th Edition, Cambridge University Press',
  'Serway, R.A. & Jewett, J.W. (2018). Physics for Scientists and Engineers, 10th Edition, Cengage Learning',
  'Feynman, R.P., Leighton, R.B. & Sands, M. (1964). The Feynman Lectures on Physics, Vol. II: Electromagnetism, Addison-Wesley',
  'Hughes, T.P. (1993). Networks of Power: Electrification in Western Society 1880–1930, Johns Hopkins University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'electricidad-basico',
    title: 'Electricidad: Lo Básico',
    color: '#6B7B8A',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_electricidad-basico.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_electricidad-basico.jpg',
    content: [
      'La electricidad comienza en el átomo. Cada átomo tiene un núcleo con protones (carga positiva) y neutrones (sin carga), rodeado por electrones (carga negativa) que orbitan en capas. El hidrógeno, el átomo más simple, tiene un solo protón y un solo electrón. El cobre, usado en cables eléctricos, tiene 29 electrones distribuidos en cuatro capas, y su electrón más externo se desprende con facilidad, lo que convierte al cobre en un conductor excelente. La carga eléctrica se mide en coulombs (C), nombrados en honor a Charles-Augustin de Coulomb, quien en 1785 midió la fuerza entre cargas eléctricas con una balanza de torsión que él mismo diseñó.',
      'La ley de Coulomb establece que la fuerza entre dos cargas eléctricas es directamente proporcional al producto de sus magnitudes e inversamente proporcional al cuadrado de la distancia que las separa. Matemáticamente, F = k × q₁ × q₂ / r², donde k vale 8.99 × 10⁹ N·m²/C². Esta ley tiene la misma estructura que la ley de gravitación de Newton, pero la fuerza eléctrica es aproximadamente 10³⁶ veces más fuerte que la gravitatoria. Si pudieras separar todos los electrones de los protones en un gramo de materia, la fuerza eléctrica resultante sería suficiente para levantar un peso equivalente a la masa de la Tierra.',
      'La electricidad estática ocurre cuando un objeto acumula un exceso de electrones en su superficie. Al frotar un globo contra tu cabello, los electrones del cabello pasan al globo por el efecto triboeléctrico. El globo queda cargado negativamente y el cabello queda cargado positivamente, por lo que ambos se atraen. Benjamin Franklin demostró en 1752, con su célebre experimento de la cometa durante una tormenta, que los rayos son descargas eléctricas naturales. Un rayo típico transporta una corriente de 30,000 amperios y alcanza una temperatura de 30,000 kelvin, cinco veces la temperatura de la superficie del Sol.',
      'La corriente eléctrica es el flujo organizado de electrones a través de un conductor. Se distinguen dos tipos principales: corriente continua (DC), donde los electrones se mueven en una sola dirección, como en una batería; y corriente alterna (AC), donde los electrones oscilan cambiando de dirección periódicamente. En la red eléctrica de la mayoría de los países, la corriente alterna oscila a 50 o 60 hercios, lo que significa que cambia de dirección 100 o 120 veces por segundo. Nikola Tesla demostró la superioridad de la corriente alterna para la transmisión a larga distancia en la Exposición Universal de Chicago en 1893.',
      'Los materiales se clasifican según su capacidad para conducir electricidad. Los conductores, como el cobre, la plata y el aluminio, permiten que los electrones se muevan con poca resistencia. Los aislantes, como el caucho, el vidrio y la cerámica, impiden el flujo de electrones casi por completo. Entre ambos se encuentran los semiconductores, como el silicio y el germanio, cuya conductividad puede controlarse añadiendo impurezas mediante un proceso llamado dopaje. Los semiconductores son la base de toda la electrónica moderna: cada chip de computadora contiene miles de millones de transistores fabricados con silicio dopado, todos operando gracias a los principios fundamentales de la carga eléctrica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tales de Mileto, filósofo griego del siglo VI a.C., fue la primera persona que documentó un fenómeno eléctrico. Observó que al frotar ámbar (en griego "elektron") con piel de animal, el ámbar atraía objetos pequeños como plumas y paja. De esa palabra griega, "elektron", deriva el término "electricidad" que usamos hoy. Tuvieron que pasar más de 2,000 años hasta que científicos como William Gilbert, en 1600, retomaran el estudio sistemático de estos fenómenos y acuñaran el término "electricus" en latín.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un solo coulomb de carga equivale a la carga de 6.242 × 10¹⁸ electrones. Para poner esto en perspectiva, si pudieras contar un electrón por segundo, tardarías más de 198 mil millones de años en contar todos los electrones de un coulomb, una cifra que supera ampliamente la edad del universo (13,800 millones de años). A pesar de contener tantos electrones, un coulomb es una unidad relativamente pequeña en ingeniería: una bombilla doméstica de 100 vatios a 120 voltios consume aproximadamente 0.83 coulombs por segundo.' },
    ],
    fact: 'El cuerpo humano genera electricidad constantemente. Las neuronas transmiten señales eléctricas a velocidades de hasta 120 metros por segundo, y el corazón produce impulsos eléctricos que se detectan con un electrocardiograma (ECG). El potencial eléctrico de una neurona en reposo es de aproximadamente -70 milivoltios, y durante un impulso nervioso cambia a +30 milivoltios en menos de un milisegundo. El cerebro humano contiene unos 86,000 millones de neuronas, cada una formando hasta 10,000 conexiones sinápticas, creando una red eléctrica de una complejidad que supera a cualquier circuito artificial construido hasta la fecha.',
  },
  {
    id: 'voltaje-corriente-resistencia',
    title: 'Voltaje, Corriente y Resistencia',
    color: '#D4A535',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_voltaje-corriente-resistencia.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_voltaje-corriente-resistencia.jpg',
    content: [
      'Georg Simon Ohm publicó en 1827 la ley que lleva su nombre: V = I × R, donde V es el voltaje en voltios, I es la corriente en amperios y R es la resistencia en ohmios. Esta relación establece que la corriente que fluye por un conductor es directamente proporcional al voltaje aplicado e inversamente proporcional a la resistencia del material. Ohm realizó sus experimentos con cables de diferentes metales y grosores, midiendo cuidadosamente la corriente producida por pilas electroquímicas. Al principio, la comunidad científica alemana rechazó su trabajo, pero James Clerk Maxwell lo reivindicó décadas después, y en 1881 se adoptó el ohmio como unidad internacional de resistencia.',
      'El voltaje se entiende mejor con la analogía del agua. Imaginemos un tanque de agua elevado conectado a una manguera. La altura del tanque (la presión del agua) corresponde al voltaje: cuanto mayor la altura, mayor la presión y más fuerza tiene el agua al salir. El flujo de agua que pasa por la manguera equivale a la corriente eléctrica (medida en amperios). El diámetro de la manguera determina cuánta agua puede fluir, igual que la resistencia limita el paso de electrones. Un voltaje de un voltio empuja un coulomb de carga a través de una resistencia de un ohmio produciendo una corriente de un amperio. Alessandro Volta construyó la primera batería en 1800, apilando discos de zinc y cobre separados por cartón empapado en salmuera.',
      'La resistencia eléctrica depende de cuatro factores: el material del conductor, su longitud, su área transversal y su temperatura. Un cable de cobre largo tiene más resistencia que uno corto. Un cable grueso permite más flujo que uno delgado. La plata es el mejor conductor metálico (resistividad de 1.59 × 10⁻⁸ Ω·m a 20°C), seguida por el cobre (1.68 × 10⁻⁸ Ω·m). El tungsteno tiene alta resistencia y soporta temperaturas extremas, por lo que Thomas Edison lo seleccionó en 1904 como filamento para bombillas incandescentes, donde alcanza 2,500°C y emite luz blanca. La resistencia de los metales aumenta con la temperatura porque los átomos vibran más y obstaculizan el paso de los electrones.',
      'André-Marie Ampère, científico francés, estableció en 1820 la relación entre la corriente eléctrica y los campos magnéticos. La unidad amperio (A) mide la intensidad de corriente: un amperio equivale al flujo de un coulomb de carga por segundo. Para dimensionar las magnitudes: un teléfono móvil consume entre 0.5 y 2 amperios durante la carga. Un secador de pelo opera a unos 10 amperios. Un rayo descarga entre 20,000 y 200,000 amperios en millonésimas de segundo. Las líneas de alta tensión transportan corrientes de cientos de amperios a voltajes de hasta 765,000 voltios para minimizar las pérdidas energéticas durante el transporte a través de grandes distancias.',
      'Los instrumentos para medir estas magnitudes transformaron la ingeniería eléctrica. El voltímetro mide la diferencia de potencial y se conecta en paralelo al componente que se mide. El amperímetro mide la corriente y se conecta en serie. El multímetro moderno, inventado en 1920 por Donald Macadie, un ingeniero de la British Post Office, combina voltímetro, amperímetro y ohmímetro en un solo dispositivo. Hoy existen multímetros digitales con precisión de 0.01% que pueden medir voltajes desde microvoltios hasta kilovoltios. Los osciloscopios, desarrollados en la década de 1930, permiten visualizar las ondas de corriente alterna en una pantalla, facilitando el diagnóstico de circuitos electrónicos complejos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La pila de Volta de 1800 fue el primer dispositivo capaz de producir un flujo constante de electricidad. Antes de ella, solo se disponía de descargas estáticas momentáneas. Napoleón Bonaparte quedó tan impresionado con la demostración de Volta que lo nombró conde y le otorgó una pensión vitalicia. La pila de Volta permitió a Humphry Davy descomponer compuestos químicos mediante electrólisis, descubriendo seis elementos nuevos (sodio, potasio, calcio, bario, estroncio y magnesio) entre 1807 y 1808.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de la señal eléctrica en un cable de cobre es cercana a la velocidad de la luz (aproximadamente 200,000 km/s, o dos tercios de c). Sin embargo, los electrones individuales se mueven a una velocidad promedio de solo 0.25 milímetros por segundo en un cable doméstico típico, lo que se conoce como velocidad de deriva. Lo que viaja rápido no son los electrones mismos, sino la onda electromagnética que los empuja. Es como una fila de bolas de billar: cuando golpeas la primera, la última se mueve casi instantáneamente, aunque cada bola individual se desplaza muy poco.' },
    ],
    fact: 'La anguila eléctrica (Electrophorus electricus), descubierta científicamente por el naturalista Carl Linnaeus en 1766, puede generar descargas de hasta 860 voltios y 1 amperio, lo que equivale a 860 vatios de potencia instantánea. Posee tres órganos eléctricos que ocupan el 80% de su cuerpo de hasta 2.5 metros de longitud. Cada órgano contiene miles de células llamadas electrocitos, que funcionan como baterías biológicas conectadas en serie. En 2019, investigadores de la Universidad de Nagoya en Japón descubrieron que las descargas de la anguila pueden transferir ADN a las células de organismos cercanos, actuando como una forma natural de electroporación, una técnica que se usa en laboratorios de genética.',
  },
  {
    id: 'circuitos-electricos',
    title: 'Circuitos Eléctricos',
    color: '#7A8B96',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_circuitos-electricos.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_circuitos-electricos.jpg',
    content: [
      'Un circuito eléctrico es un camino cerrado por el que fluye la corriente eléctrica. Requiere tres elementos mínimos: una fuente de energía (como una batería), un conductor (como un cable de cobre) y una carga (como una bombilla). Si el circuito se interrumpe en cualquier punto, la corriente deja de fluir. Los circuitos en serie conectan los componentes uno tras otro formando un solo camino. Si una bombilla se funde en un circuito en serie, todas las demás se apagan. Las antiguas luces navideñas usaban conexión en serie, lo que convertía encontrar la bombilla defectuosa en una tarea tediosa: había que probar cada una individualmente.',
      'Los circuitos en paralelo ofrecen múltiples caminos para la corriente. En este tipo de circuito, cada componente recibe el mismo voltaje de la fuente, y si uno falla, los demás continúan funcionando. Las instalaciones eléctricas residenciales usan circuitos en paralelo: puedes apagar una lámpara sin afectar al televisor o al refrigerador. La corriente total del circuito es la suma de las corrientes individuales de cada rama, según la primera ley de Kirchhoff (ley de corrientes), que Gustav Kirchhoff formuló en 1845 cuando tenía solo 21 años como estudiante en la Universidad de Königsberg.',
      'La segunda ley de Kirchhoff (ley de voltajes) establece que la suma de todas las diferencias de potencial alrededor de cualquier bucle cerrado en un circuito es igual a cero. Esto es una consecuencia directa de la conservación de la energía: la energía suministrada por la fuente debe ser igual a la energía consumida por los componentes del circuito. Estas dos leyes, junto con la ley de Ohm, permiten analizar circuitos de cualquier nivel de complejidad. Los ingenieros eléctricos usan programas de simulación como SPICE (Simulation Program with Integrated Circuit Emphasis), desarrollado en la Universidad de California, Berkeley, en 1973, para modelar circuitos con miles de componentes.',
      'Un cortocircuito ocurre cuando la corriente encuentra un camino de resistencia casi nula, usualmente por un cable dañado que hace contacto directo entre los terminales de la fuente. La corriente se dispara a valores peligrosos, generando calor suficiente para fundir cables e iniciar incendios. Para prevenir esto, se usan fusibles (que se funden al exceder una corriente máxima, abriendo el circuito) y disyuntores (que abren el circuito electromagnéticamente y pueden rearmarse). El primer fusible fue patentado por Thomas Edison en 1890 como parte de su sistema de distribución eléctrica en Nueva York.',
      'El cableado doméstico moderno sigue estándares estrictos. En la mayoría de países se utilizan tres conductores: fase (que lleva la corriente), neutro (que la retorna) y tierra (protección contra fallas). En Estados Unidos, el voltaje residencial estándar es 120 voltios a 60 Hz; en Europa y la mayor parte de Latinoamérica, es 220-240 voltios a 50 Hz. Los interruptores diferenciales (GFCI en inglés), obligatorios en baños y cocinas desde la década de 1970, detectan diferencias de corriente tan pequeñas como 5 miliamperios entre la fase y el neutro, desconectando el circuito en menos de 25 milisegundos para evitar electrocuciones. Esta tecnología ha reducido las muertes por electrocución doméstica en más del 80% desde su implementación generalizada.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El circuito integrado (microchip) fue inventado de forma independiente por Jack Kilby (Texas Instruments) y Robert Noyce (Fairchild Semiconductor) en 1958-1959. El primer chip de Kilby contenía un solo transistor, una resistencia y un condensador. Hoy, el procesador Apple M2 Ultra contiene 134,000 millones de transistores en una pieza de silicio del tamaño de una moneda. Este avance sigue la Ley de Moore, formulada por Gordon Moore en 1965, que predijo correctamente que el número de transistores en un chip se duplicaría cada dos años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La resistencia del cuerpo humano varía drásticamente según las condiciones. Con la piel seca, la resistencia entre las manos es de aproximadamente 100,000 ohmios. Con la piel mojada, puede bajar a 1,000 ohmios. A 120 voltios con piel seca, la corriente sería de 1.2 miliamperios (apenas perceptible). Con piel mojada, la corriente alcanzaría 120 miliamperios, suficiente para causar fibrilación ventricular y potencialmente la muerte. Por eso los interruptores diferenciales en baños y cocinas actúan con corrientes de solo 5 miliamperios.' },
    ],
    fact: 'La red eléctrica de un país es el circuito más grande jamás construido por la humanidad. La red eléctrica de Estados Unidos comprende más de 11,000 centrales generadoras, 600,000 kilómetros de líneas de transmisión de alto voltaje y 9,200 subestaciones eléctricas. La red sincroniza la frecuencia de todos sus generadores a exactamente 60.000 Hz con una precisión de ±0.02 Hz. Si la frecuencia cae por debajo de 59.95 Hz, se activan protocolos de emergencia para evitar un apagón en cascada. El gran apagón del noreste de 2003 dejó sin electricidad a 55 millones de personas en Estados Unidos y Canadá porque una alarma de software falló en la sala de control de FirstEnergy en Ohio.',
  },
  {
    id: 'magnetismo-electromagnetismo',
    title: 'Magnetismo y Electromagnetismo',
    color: '#C49225',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_magnetismo-electromagnetismo.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_magnetismo-electromagnetismo.jpg',
    content: [
      'Los campos magnéticos son regiones del espacio donde una fuerza actúa sobre materiales ferromagnéticos y cargas en movimiento. Los imanes poseen dos polos: norte y sur. Los polos iguales se repelen y los opuestos se atraen, similar a las cargas eléctricas, pero con una diferencia fundamental: no existen monopolos magnéticos aislados. Si cortas un imán por la mitad, obtienes dos imanes completos, cada uno con su polo norte y sur. La Tierra misma es un imán gigante cuyo campo magnético se extiende hasta 65,000 kilómetros en el espacio, formando la magnetosfera que nos protege del viento solar. El polo magnético norte terrestre no coincide con el polo geográfico: en 2023 se encontraba en el norte de Canadá, moviéndose hacia Siberia a unos 55 kilómetros por año.',
      'En 1820, Hans Christian Ørsted descubrió por accidente la conexión entre electricidad y magnetismo durante una clase. Al encender un circuito eléctrico, observó que la aguja de una brújula cercana se movía. Este hallazgo demostró que una corriente eléctrica genera un campo magnético a su alrededor. La noticia recorrió Europa en semanas, y André-Marie Ampère desarrolló la base matemática en solo siete días, describiendo la fuerza entre conductores que transportan corriente. Este descubrimiento unificó dos fuerzas que se creían separadas y abrió el camino a motores eléctricos, generadores y telecomunicaciones.',
      'Michael Faraday, hijo de un herrero y prácticamente autodidacta, descubrió en 1831 la inducción electromagnética, el principio inverso al de Ørsted: un campo magnético cambiante produce una corriente eléctrica en un conductor cercano. Faraday demostró esto moviendo un imán dentro de una bobina de cable y midiendo la corriente generada. También introdujo el concepto de "líneas de campo magnético", una herramienta visual que todavía se usa en la enseñanza y la investigación. A pesar de no tener formación matemática formal, las intuiciones experimentales de Faraday establecieron los fundamentos de toda la tecnología eléctrica moderna.',
      'James Clerk Maxwell, en 1865, unificó la electricidad, el magnetismo y la óptica en cuatro ecuaciones que describen el comportamiento de los campos electromagnéticos. Las ecuaciones de Maxwell predicen que los campos eléctricos y magnéticos se propagan juntos como ondas a la velocidad de la luz (299,792,458 m/s en el vacío). Maxwell dedujo que la luz visible es una onda electromagnética, una predicción que Heinrich Hertz confirmó experimentalmente en 1887 al generar y detectar ondas de radio en su laboratorio de la Universidad de Karlsruhe. Las cuatro ecuaciones de Maxwell se consideran entre los logros intelectuales más significativos en la historia de la física.',
      'Los electroimanes, inventados por William Sturgeon en 1825, utilizan corriente eléctrica para crear campos magnéticos controlables. Al enrollar un cable conductor alrededor de un núcleo de hierro y hacer pasar corriente, el hierro se magnetiza. Al cortar la corriente, el magnetismo desaparece. Los electroimanes modernos pueden generar campos magnéticos extremadamente potentes: los imanes superconductores del Gran Colisionador de Hadrones (LHC) en el CERN producen campos de 8.3 teslas, 170,000 veces más fuertes que el campo magnético terrestre (0.00005 teslas). Las máquinas de resonancia magnética (MRI) en hospitales usan electroimanes superconductores de 1.5 a 3 teslas enfriados con helio líquido a -269°C para generar imágenes detalladas del interior del cuerpo humano.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Faraday fue un comunicador científico notable. En 1825 inició las "Christmas Lectures" (Conferencias de Navidad) en la Royal Institution de Londres, una serie de charlas científicas para público joven que continúa hasta hoy, casi 200 años después. Faraday impartió 19 series de estas conferencias personalmente. En su conferencia más famosa, "La historia química de una vela" (1860), demostró principios de combustión, química y física usando solo una vela como herramienta. Esta tradición de hacer accesible la ciencia al público inspiró a divulgadores posteriores como Carl Sagan y Neil deGrasse Tyson.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ecuaciones de Maxwell predicen que cualquier carga eléctrica acelerada emite radiación electromagnética. Esta predicción tiene consecuencias prácticas directas: una antena de radio funciona acelerando electrones de ida y vuelta en un conductor metálico, generando ondas electromagnéticas que se propagan a la velocidad de la luz. Tu teléfono móvil emite ondas de entre 700 MHz y 2.7 GHz. Los hornos microondas utilizan ondas de 2.45 GHz que hacen vibrar las moléculas de agua en los alimentos, calentándolos desde el interior.' },
    ],
    fact: 'Algunas bacterias, como Magnetospirillum magnetotacticum, descubierta por Richard Blakemore en 1975, contienen cadenas de cristales de magnetita (Fe₃O₄) de tamaño nanométrico dentro de orgánulos llamados magnetosomas. Estas cadenas actúan como agujas de brújula microscópicas, permitiendo que las bacterias se orienten según el campo magnético terrestre para navegar hacia zonas con la concentración óptima de oxígeno. Cada bacteria contiene entre 15 y 20 cristales de magnetita alineados en una cadena, cada cristal de unos 50 nanómetros de diámetro. Este fenómeno, llamado magnetotaxis, es uno de los ejemplos más notables de nanotecnología biológica natural.',
  },
  {
    id: 'induccion-electromagnetica',
    title: 'Inducción Electromagnética',
    color: '#8A9AA6',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_induccion-electromagnetica.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_induccion-electromagnetica.jpg',
    content: [
      'La ley de Faraday de la inducción electromagnética, formulada en 1831, establece que un voltaje se induce en un conductor cuando cambia el flujo magnético que lo atraviesa. El voltaje inducido es proporcional a la tasa de cambio del flujo magnético: cuanto más rápido cambia el campo magnético, mayor es el voltaje generado. Esta ley se expresa como EMF = -dΦ/dt, donde Φ es el flujo magnético y el signo negativo proviene de la ley de Lenz. Este principio es la base del funcionamiento de todos los generadores eléctricos del mundo: desde las turbinas hidroeléctricas de la presa de Itaipú (que genera 14,000 megavatios) hasta los pequeños dinamos de las bicicletas.',
      'La ley de Lenz, propuesta por el físico ruso Heinrich Lenz en 1834, complementa la ley de Faraday especificando la dirección de la corriente inducida. Establece que la corriente inducida fluye en una dirección tal que su propio campo magnético se opone al cambio que la produjo. Esto es una manifestación de la conservación de la energía: si la corriente inducida reforzara el cambio original, se crearía energía de la nada, violando la primera ley de la termodinámica. La ley de Lenz explica por qué se necesita fuerza para mover un imán dentro de una bobina: la corriente inducida genera un campo magnético que se opone al movimiento del imán.',
      'Los generadores eléctricos convierten energía mecánica en energía eléctrica utilizando la inducción electromagnética. Un generador típico consiste en una bobina de cable que gira dentro de un campo magnético (o un imán que gira dentro de bobinas fijas). Al girar, el flujo magnético a través de la bobina cambia continuamente, induciendo un voltaje alterno. La frecuencia de la corriente generada depende de la velocidad de rotación. Para producir corriente alterna de 60 Hz, el rotor de un generador de dos polos debe girar exactamente a 3,600 revoluciones por minuto. Los generadores de las centrales nucleares pueden producir más de 1,000 megavatios cada uno, suficiente para abastecer a una ciudad de un millón de habitantes.',
      'Los transformadores, inventados de forma práctica por Lucien Gaulard y John Dixon Gibbs en 1881 y perfeccionados por William Stanley Jr. en 1886, permiten cambiar el voltaje de la corriente alterna sin pérdidas significativas de energía. Un transformador consta de dos bobinas enrolladas alrededor de un núcleo de hierro. La razón entre los voltajes de entrada y salida es igual a la razón entre el número de vueltas de cada bobina. Los transformadores elevadores aumentan el voltaje para transmisión a larga distancia (reduciendo las pérdidas por calor), mientras que los reductores lo disminuyen para uso doméstico. Sin transformadores, la electricidad no podría transmitirse eficientemente más allá de unos pocos kilómetros.',
      'La corriente alterna (AC) ganó la "Guerra de las Corrientes" frente a la corriente continua (DC) de Edison gracias a la capacidad de los transformadores para cambiar voltajes con eficiencia. Nikola Tesla diseñó el sistema polifásico de corriente alterna que la Westinghouse Electric Company implementó en la central hidroeléctrica de las cataratas del Niágara en 1895, transmitiendo electricidad a Buffalo, Nueva York, a 32 kilómetros de distancia. Este éxito demostró definitivamente la viabilidad del sistema AC. Hoy, sin embargo, la corriente continua de alto voltaje (HVDC) está regresando para transmisiones de ultra larga distancia: la línea HVDC del Río Madeira en Brasil transporta 7,100 megavatios a lo largo de 2,375 kilómetros con pérdidas de solo el 3.5%.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El frenado regenerativo en vehículos eléctricos es una aplicación directa de la ley de Lenz. Cuando un auto eléctrico desacelera, los motores se convierten en generadores: las ruedas hacen girar los rotores, induciendo corriente que recarga la batería. La resistencia magnética que crea esta corriente (según Lenz) actúa como freno. Los trenes de levitación magnética (maglev) también usan este principio: el tren Shanghai Transrapid alcanza 431 km/h flotando sobre rieles electromagnéticos sin fricción mecánica, usando inducción para propulsión y frenado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las cocinas de inducción calientan ollas mediante corrientes de Foucault (eddy currents) inducidas en el metal del recipiente. Una bobina bajo la superficie de vitrocerámica genera un campo magnético alterno a entre 20,000 y 100,000 Hz. Este campo induce corrientes circulares en el fondo metálico de la olla, calentándola por efecto Joule. La superficie de la cocina permanece relativamente fría porque la vitrocerámica no es conductora. Las cocinas de inducción tienen una eficiencia del 85-90%, frente al 40% de las cocinas de gas, y pueden hervir un litro de agua en menos de dos minutos.' },
    ],
    fact: 'Las tarjetas de crédito con banda magnética almacenan datos mediante la inducción electromagnética. La banda contiene partículas de óxido de hierro organizadas en patrones magnéticos que representan el número de cuenta y otros datos. Al deslizar la tarjeta, las partículas magnetizadas pasan frente a un cabezal lector que induce señales eléctricas interpretables. La banda magnética fue inventada por el ingeniero de IBM Forrest Parry en 1960, quien inicialmente no lograba adherir la banda al plástico. Su esposa sugirió usar la plancha de ropa para pegarla con calor, y funcionó. IBM suministró esta tecnología al gobierno de Estados Unidos para tarjetas de identificación antes de que los bancos la adoptaran en la década de 1970.',
  },
  {
    id: 'potencia-electrica',
    title: 'Potencia Eléctrica',
    color: '#B88420',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_potencia-electrica.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_potencia-electrica.jpg',
    content: [
      'La potencia eléctrica es la tasa a la que se consume o produce energía eléctrica. Se calcula con la fórmula P = I × V, donde P es la potencia en vatios (W), I es la corriente en amperios y V es el voltaje en voltios. Un vatio equivale a un julio de energía por segundo. La unidad lleva el nombre de James Watt, el ingeniero escocés que perfeccionó la máquina de vapor en 1769, aunque la potencia eléctrica fue definida formalmente décadas después. Combinando la ley de Ohm, la potencia también puede expresarse como P = I²R o P = V²/R, lo que permite calcularla conociendo cualquier par de las tres magnitudes eléctricas fundamentales.',
      'El kilovatio-hora (kWh) es la unidad de energía que aparece en las facturas de electricidad. No es una unidad de potencia sino de energía: equivale a consumir 1,000 vatios durante una hora, o 3,600,000 julios. Un hogar promedio en Estados Unidos consume unos 900 kWh al mes. Un refrigerador moderno usa entre 1 y 2 kWh al día. Un ciclo de lavadora consume 0.5-1 kWh. Un horno eléctrico puede usar 2-5 kWh por hora de funcionamiento. Cargar completamente un vehículo eléctrico Tesla Model 3 con batería de 60 kWh consume la misma energía que mantener encendidas 60 bombillas de 100 vatios durante 10 horas.',
      'La eficiencia energética mide qué fracción de la energía de entrada se convierte en trabajo útil. Las bombillas incandescentes de Edison convertían solo el 5% de la electricidad en luz, desperdiciando el 95% como calor. Las bombillas LED modernas alcanzan eficiencias del 50%, produciendo la misma cantidad de luz con una décima parte de la energía. Los motores eléctricos tienen eficiencias del 85-95%, muy superiores a los motores de combustión interna (25-35%). Un aire acondicionado con clasificación energética A+++ consume un 60% menos de energía que uno de clasificación D, lo que puede representar ahorros de cientos de euros anuales en la factura eléctrica.',
      'Las redes eléctricas transportan la energía desde las centrales generadoras hasta los consumidores. La potencia total instalada en el mundo superó los 8,000 gigavatios en 2023. Para minimizar las pérdidas durante la transmisión (que se disipan como calor en los cables según P = I²R), se eleva el voltaje a 110,000-765,000 voltios en líneas de transmisión de larga distancia. Al aumentar el voltaje, la corriente necesaria para transmitir la misma potencia disminuye proporcionalmente, reduciendo las pérdidas por calentamiento. Las subestaciones transformadoras reducen el voltaje progresivamente: de la línea de transmisión (400 kV) a distribución primaria (13.8 kV) y finalmente a uso doméstico (120-240 V).',
      'El factor de potencia es un concepto clave en instalaciones industriales y comerciales. En circuitos de corriente alterna, la potencia real (medida en vatios) puede ser menor que el producto del voltaje por la corriente debido al desfase entre ambos. Este desfase ocurre cuando hay cargas inductivas (motores, transformadores) o capacitivas en el circuito. Un factor de potencia de 1.0 indica que toda la corriente realiza trabajo útil; un factor de 0.7 significa que el 30% de la corriente circula sin producir trabajo, generando pérdidas adicionales. Las compañías eléctricas penalizan a clientes industriales con factores de potencia bajos, y se instalan bancos de condensadores para corregir el desfase y mejorar la eficiencia del sistema eléctrico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La primera central eléctrica comercial del mundo, la Pearl Street Station de Thomas Edison, comenzó a operar el 4 de septiembre de 1882 en el bajo Manhattan, alimentando 400 lámparas incandescentes en 85 edificios en un radio de 1.6 kilómetros. La planta generaba corriente continua a 110 voltios. Edison personalmente supervisó cada detalle, desde los generadores hasta el aislamiento de los cables subterráneos. Pese a su éxito inicial, el sistema DC de Edison quedó obsoleto en una década ante el sistema AC de Tesla y Westinghouse, que podía transmitir electricidad a distancias mucho mayores.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Estación Espacial Internacional (ISS) genera toda su electricidad mediante paneles solares que producen entre 84 y 120 kilovatios de potencia. Los paneles cubren un área total de 2,500 metros cuadrados y pesan 73,000 kilogramos. Durante los 45 minutos de cada órbita en que la ISS pasa por la sombra de la Tierra, la estación se alimenta de baterías de iones de litio que se recargan durante los 45 minutos de luz solar. La eficiencia de los paneles solares de la ISS es del 14%, inferior al 22-24% de los paneles terrestres modernos, debido a la degradación por radiación cósmica.' },
    ],
    fact: 'El consumo eléctrico global de los centros de datos (que alimentan Internet, la nube y la inteligencia artificial) alcanzó los 460 teravatios-hora en 2022, representando cerca del 2% del consumo eléctrico mundial, comparable al consumo total de un país como Francia. Se proyecta que para 2026 este consumo podría duplicarse, impulsado por la demanda de procesamiento de modelos de inteligencia artificial. Un solo entrenamiento del modelo GPT-4 consumió aproximadamente 50 gigavatios-hora de energía, equivalente al consumo anual de 4,600 hogares estadounidenses. Google, Microsoft y Amazon han comenzado a invertir en reactores nucleares pequeños (SMR) para alimentar sus centros de datos con energía de baja emisión de carbono.',
  },
  {
    id: 'electricidad-siglo-xxi',
    title: 'La Electricidad en el Siglo XXI',
    color: '#5A6B7A',
    btnImage: '/assets/nikola_tesla/infographic_m8/btn_electricidad-siglo-xxi.jpg',
    image: '/assets/nikola_tesla/infographic_m8/hero_electricidad-siglo-xxi.jpg',
    content: [
      'Las fuentes de energía renovable están transformando la generación eléctrica global. En 2023, la capacidad solar fotovoltaica mundial superó los 1,200 gigavatios, produciendo más del 5% de la electricidad global. Los paneles solares funcionan por el efecto fotovoltaico, descubierto por Edmond Becquerel en 1839 a los 19 años de edad: fotones de luz solar liberan electrones en materiales semiconductores, generando corriente eléctrica directa. La eficiencia de las células solares de silicio ha pasado del 6% en 1954 (cuando los Laboratorios Bell fabricaron la primera célula práctica) al 26.8% en laboratorio en 2023. El costo del kilovatio-hora solar ha caído un 89% entre 2010 y 2023, haciéndolo más barato que el carbón y el gas natural en la mayoría de los mercados.',
      'Las redes eléctricas inteligentes (smart grids) integran tecnología digital para optimizar la generación, distribución y consumo de electricidad. A diferencia de las redes tradicionales, que transmiten energía en una sola dirección (de la central al consumidor), las smart grids permiten flujos bidireccionales: un hogar con paneles solares puede enviar su excedente de energía a la red y recibir compensación económica. Los contadores inteligentes miden el consumo en tiempo real cada 15 minutos y transmiten los datos digitalmente. En España, el despliegue de contadores inteligentes alcanzó el 100% de los hogares en 2018, convirtiendo al país en uno de los primeros en completar esta transición en toda Europa.',
      'Los superconductores son materiales que conducen electricidad con resistencia exactamente igual a cero cuando se enfrían por debajo de una temperatura crítica. Heike Kamerlingh Onnes descubrió la superconductividad en 1911 al enfriar mercurio a 4.2 kelvin (-269°C) y observar que su resistencia eléctrica desaparecía por completo. En 1986, Johannes Georg Bednorz y Karl Alexander Müller descubrieron superconductores de alta temperatura que funcionan a 93 kelvin (-180°C), lo que permitió usar nitrógeno líquido (barato y abundante) como refrigerante en lugar de helio líquido. Si se lograra un superconductor a temperatura ambiente, se eliminarían todas las pérdidas en la transmisión eléctrica, que actualmente representan entre el 5% y el 10% de toda la electricidad generada.',
      'La transmisión inalámbrica de energía, uno de los grandes sueños de Nikola Tesla, está avanzando gradualmente. Tesla construyó la torre Wardenclyffe en 1901 en Shoreham, Long Island, con el objetivo de transmitir electricidad sin cables a todo el mundo, pero el proyecto se abandonó por falta de financiación en 1905. Hoy, la carga inalámbrica de teléfonos usa inducción electromagnética resonante a distancias de unos pocos centímetros. En 2020, investigadores del Instituto de Ciencia y Tecnología de Corea del Sur (KAIST) desarrollaron un sistema de carga inalámbrica para autobuses eléctricos que funciona con bobinas enterradas bajo el asfalto, permitiendo cargar el vehículo mientras circula.',
      'El almacenamiento de energía es el desafío clave para un futuro eléctrico renovable. Las baterías de iones de litio, desarrolladas por John Goodenough, Stanley Whittingham y Akira Yoshino (Premio Nobel de Química 2019), dominan el mercado con densidades energéticas de 250-300 Wh/kg. Las baterías de estado sólido prometen duplicar esta densidad para 2028. A escala de red, las centrales de bombeo hidroeléctrico almacenan el 95% de toda la energía almacenada en el mundo: bombean agua cuesta arriba cuando sobra electricidad y la dejan caer por turbinas cuando se necesita. Alternativas emergentes incluyen baterías de flujo de vanadio, aire comprimido en cavernas subterráneas y almacenamiento térmico en sales fundidas a 565°C, como las usadas en la planta termosolar Gemasolar en Sevilla, España, que puede generar electricidad durante 15 horas sin sol.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El país con mayor porcentaje de electricidad renovable en 2023 fue Islandia, con casi el 100% de su generación proveniente de fuentes geotérmicas (73%) e hidroeléctricas (27%). Costa Rica generó más del 98% de su electricidad con fuentes renovables durante varios años consecutivos. Noruega produce el 98% de su electricidad con hidroeléctricas. Dinamarca produjo un 55% de su electricidad con energía eólica en 2023, y en algunos días ventosos, sus turbinas generaron más del 140% de la demanda nacional, exportando el excedente a Alemania y Noruega.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fusión nuclear, la misma reacción que alimenta al Sol, podría proporcionar energía prácticamente ilimitada. El proyecto ITER en Cadarache, Francia, es un reactor de fusión experimental que costará más de 22,000 millones de euros y se espera que produzca su primer plasma de deuterio-tritio en 2035. ITER busca demostrar que es posible obtener 10 veces más energía de la que se inyecta para mantener la reacción (Q=10). En diciembre de 2022, el National Ignition Facility (NIF) en California logró por primera vez la "ignición" por fusión: produjo 3.15 megajulios de energía a partir de 2.05 megajulios de energía láser.' },
    ],
    fact: 'En 2016, el vuelo del Solar Impulse 2, pilotado por Bertrand Piccard y André Borschberg, demostró que un avión propulsado exclusivamente por energía solar podía dar la vuelta al mundo. El avión, con una envergadura de 72 metros (mayor que un Boeing 747) y un peso de solo 2,300 kg, completó 40,000 kilómetros en 17 etapas entre marzo de 2015 y julio de 2016. Sus 17,248 células solares alimentaban cuatro motores eléctricos de 17.4 caballos cada uno y cargaban baterías de litio de 633 kg que permitían volar de noche. El tramo más largo, de Nagoya (Japón) a Hawái, duró 117 horas y 52 minutos de vuelo continuo, estableciendo un récord mundial de vuelo solar.',
  },
];

// ——— Electric Field (Canvas Background) ——————————————————————————————————————
function ElectricField() {
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

// ——— Electricity Header ——————————————————————————————————————————————————————
function ElectricityHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Electric arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#elecGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6B7B8A','#D4A535','#7A8B96','#C49225','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central bolt icon */}
        <path d="M304 18 L296 32 L302 32 L294 44 L310 28 L304 28 Z" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" strokeLinejoin="round" />
        <defs>
          <linearGradient id="elecGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ELECTRICIDAD Y MAGNETISMO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DETRÁS DE LA ENERGÍA</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ——————————————————————————————————————————————————————
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
          layoutId="activeDotTeslaM8"
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

        {/* ——— Conditional Video Render ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————————————
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #6B7B8A, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————————————
export default function InteractiveInfographic_TeslaM8() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(15,12,20,0.8) 40%, rgba(10,10,15,0.88) 100%), url(/assets/tesla/tesla_m8.png)',
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
      <ElectricField />

      <ElectricityHeader />

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
              🏆 ¡Has dominado los secretos de la Electricidad y el Magnetismo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cazador de Inventos
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
