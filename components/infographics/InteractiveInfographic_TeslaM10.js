'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Tesla Coil themed) ────────────────────────────
function DecoTeslaCoil({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Toroid */}
      <ellipse cx="30" cy="14" rx="14" ry="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Secondary coil */}
      <rect x="27" y="18" width="6" height="30" rx="2" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Winding lines */}
      {[0,3,6,9,12,15,18,21,24,27].map((y, i) => (
        <line key={i} x1="27" y1={19 + y} x2="33" y2={19 + y} stroke={color} strokeWidth="0.8" opacity="0.3" />
      ))}
      {/* Base */}
      <rect x="22" y="48" width="16" height="4" rx="1" fill={color} opacity="0.3" />
      {/* Sparks from top */}
      <path d="M30 9 Q25 4 20 2" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 9 Q35 3 40 1" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="20" cy="2" r="1.5" fill={color} opacity="0.4" />
      <circle cx="40" cy="1" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSparkGap({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Two electrodes */}
      <rect x="8" y="22" width="18" height="6" rx="2" fill={color} opacity="0.3" />
      <rect x="34" y="22" width="18" height="6" rx="2" fill={color} opacity="0.3" />
      {/* Spark arc */}
      <path d="M26 25 Q28 18 30 25 Q32 32 34 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Spark particles */}
      <circle cx="30" cy="20" r="1" fill={color} opacity="0.5" />
      <circle cx="28" cy="28" r="0.8" fill={color} opacity="0.4" />
      <circle cx="32" cy="18" r="1.2" fill={color} opacity="0.5" />
      {/* Connection wires */}
      <line x1="4" y1="25" x2="8" y2="25" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="52" y1="25" x2="56" y2="25" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Ground symbol */}
      <line x1="28" y1="38" x2="32" y2="38" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="29" y1="41" x2="31" y2="41" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="29.5" y1="44" x2="30.5" y2="44" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCapacitor({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Capacitor plates */}
      <line x1="10" y1="30" x2="24" y2="30" stroke={color} strokeWidth="1.5" />
      <line x1="24" y1="15" x2="24" y2="45" stroke={color} strokeWidth="2.5" opacity="0.6" />
      <line x1="36" y1="15" x2="36" y2="45" stroke={color} strokeWidth="2.5" opacity="0.6" />
      <line x1="36" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1.5" />
      {/* Electric field lines */}
      {[20, 25, 30, 35, 40].map((y, i) => (
        <line key={i} x1="26" y1={y} x2="34" y2={y} stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
      ))}
      {/* + and - */}
      <text x="17" y="22" fill={color} fontSize="10" fontWeight="bold" opacity="0.5">+</text>
      <text x="40" y="22" fill={color} fontSize="12" fontWeight="bold" opacity="0.5">−</text>
    </svg>
  );
}

function DecoLCCircuit({ size = 60, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circuit loop */}
      <rect x="10" y="10" width="40" height="40" rx="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Inductor (coil symbol on top) */}
      <path d="M18 10 Q22 2 26 10 Q30 2 34 10 Q38 2 42 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Capacitor (bottom) */}
      <line x1="26" y1="46" x2="26" y2="54" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="34" y1="46" x2="34" y2="54" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* f = 1/2π√LC label */}
      <text x="30" y="32" textAnchor="middle" fill={color} fontSize="7" fontFamily="serif" opacity="0.5">f=1/2π√LC</text>
    </svg>
  );
}

function DecoSafetyShield({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Shield shape */}
      <path d="M30 5 L50 15 L48 38 Q40 52 30 56 Q20 52 12 38 L10 15 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Inner shield */}
      <path d="M30 12 L44 20 L42 36 Q36 46 30 49 Q24 46 18 36 L16 20 Z" fill={color} opacity="0.08" />
      {/* Lightning bolt inside */}
      <path d="M32 20 L27 32 L31 32 L26 42 L36 28 L31 28 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSineWave({ size = 80, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Sine wave */}
      <path d="M5 20 Q15 5 25 20 Q35 35 45 20 Q55 5 65 20 Q75 35 80 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Resonance peak markers */}
      <circle cx="25" cy="20" r="2" fill={color} opacity="0.5" />
      <circle cx="45" cy="20" r="2" fill={color} opacity="0.5" />
      <circle cx="65" cy="20" r="2" fill={color} opacity="0.5" />
      {/* Amplitude arrows */}
      <line x1="15" y1="5" x2="15" y2="12" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="35" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'entendiendo-bobina': [DecoTeslaCoil, DecoLCCircuit, DecoSineWave],
  'seguridad-primero': [DecoSafetyShield, DecoSparkGap, DecoTeslaCoil],
  'materiales-necesarios': [DecoCapacitor, DecoTeslaCoil, DecoSparkGap],
  'construccion-paso-a-paso': [DecoTeslaCoil, DecoCapacitor, DecoSafetyShield],
  'tu-primera-chispa': [DecoSparkGap, DecoSineWave, DecoLCCircuit],
  'experimentos-divertidos': [DecoTeslaCoil, DecoSparkGap, DecoSineWave],
  'fisica-detras-magia': [DecoLCCircuit, DecoSineWave, DecoCapacitor],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Tilbury, M. (2007). The Ultimate Tesla Coil Design and Construction Guide, McGraw-Hill Education',
  'Phung, D.L. (2016). Tesla Coil Design and Construction: A Practical Guide, CreateSpace Independent Publishing',
  'Corum, K.L. & Corum, J.F. (1999). RF Coils, Helical Resonators and Voltage Magnification by Coherent Spatial Modes, Microwave Review, Vol. 5, No. 2',
  'Tesla, N. (1891). U.S. Patent 454,622: System of Electric Lighting, United States Patent Office',
  'Uth, R. (1999). Tesla: Master of Lightning, Barnes & Noble Books',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'entendiendo-bobina',
    title: 'Entendiendo la Bobina',
    color: '#6B7B8A',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_entendiendo-bobina.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_entendiendo-bobina.jpg',
    content: [
      'Una bobina de Tesla es un transformador resonante que genera voltajes muy altos a frecuencias elevadas, inventado por Nikola Tesla alrededor de 1891. Su funcionamiento se basa en un principio central de la física: la resonancia electromagnética. A diferencia de un transformador convencional, que transfiere energía mediante acoplamiento magnético cerrado entre dos bobinas, la bobina de Tesla utiliza acoplamiento débil y resonancia para multiplicar el voltaje de entrada cientos o miles de veces, produciendo descargas eléctricas visibles en el aire.',
      'El circuito primario consta de un condensador de alta tensión, un entrehierro (spark gap) y una bobina de pocas vueltas de alambre grueso. Cuando el condensador se carga completamente, la tensión rompe el aire en el entrehierro, creando un arco eléctrico que cierra el circuito. En ese instante, la energía almacenada en el condensador oscila entre el condensador y la bobina primaria a una frecuencia determinada por los valores de inductancia (L) y capacitancia (C) del circuito, siguiendo la fórmula de resonancia f = 1/(2π√LC).',
      'El circuito secundario es una bobina de muchas vueltas de alambre delgado enrollado sobre un tubo aislante, generalmente de PVC. Esta bobina tiene su propia frecuencia de resonancia natural, determinada por su inductancia y la capacitancia distribuida entre sus espiras y respecto al suelo. La clave del diseño consiste en ajustar la frecuencia del circuito primario para que coincida exactamente con la frecuencia natural del secundario, un proceso denominado sintonización.',
      'Cuando ambas frecuencias coinciden, se produce una transferencia de energía por resonancia magnética acoplada. La energía del circuito primario se transfiere al secundario con cada oscilación, acumulándose progresivamente. Dado que el secundario tiene muchas más vueltas que el primario, el voltaje se multiplica proporcionalmente, pudiendo alcanzar desde decenas de miles hasta millones de voltios en bobinas grandes.',
      'En la parte superior de la bobina secundaria se coloca un terminal de descarga, frecuentemente un toroide de aluminio. Este elemento actúa como un condensador de carga, almacenando las cargas eléctricas generadas. Cuando la tensión acumulada supera la rigidez dieléctrica del aire circundante (aproximadamente 30,000 voltios por centímetro a presión atmosférica normal), se producen descargas eléctricas luminosas, los arcos y coronas que hacen a las bobinas de Tesla tan llamativas para la demostración científica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Nikola Tesla presentó su patente estadounidense número 454,622 el 20 de mayo de 1891 bajo el título "Sistema de Iluminación Eléctrica". En su demostración ante el Instituto Americano de Ingenieros Eléctricos (AIEE) en la Universidad de Columbia en Nueva York, encendió tubos de vacío sin cables usando únicamente campos electromagnéticos de alta frecuencia generados por su bobina resonante, más de un siglo antes de que la carga inalámbrica se incorporara en teléfonos inteligentes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La mayor bobina de Tesla del mundo se encuentra en el Laboratorio de Investigación Electrum, en Auckland, Nueva Zealand. Construida entre 1997 y 2003 por Greg Leyh, mide 12 metros de altura y genera arcos eléctricos de más de 4 metros de longitud. Funciona a una frecuencia de resonancia cercana a 50 kHz y puede producir voltajes superiores a 3 millones de voltios. Se utiliza con fines educativos y de investigación sobre descargas atmosféricas a escala.' },
    ],
    fact: 'En 1899, Tesla construyó un laboratorio experimental en Colorado Springs, Colorado, donde instaló una bobina de Tesla de dimensiones sin precedentes: el "Transmisor Amplificador". Esta bobina generaba voltajes estimados en 12 millones de voltios y producía arcos eléctricos artificiales de más de 40 metros de longitud, visibles y audibles a más de 15 kilómetros de distancia. Durante sus experimentos, la descarga de energía fue tan potente que quemó el generador de la compañía eléctrica local de Colorado Springs, dejando a toda la ciudad sin electricidad.',
  },
  {
    id: 'seguridad-primero',
    title: 'Seguridad Primero',
    color: '#D4A535',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_seguridad-primero.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_seguridad-primero.jpg',
    content: [
      'Trabajar con bobinas de Tesla implica manejar voltajes que pueden superar los 50,000 voltios, corrientes potencialmente letales y componentes que almacenan energía eléctrica. Cualquier proyecto de construcción de bobina de Tesla requiere supervisión directa y constante de un adulto con conocimientos de electricidad. Este no es un proyecto para realizar sin supervisión bajo ninguna circunstancia, y comprender las reglas de seguridad es tan importante como comprender la física detrás del dispositivo.',
      'El riesgo principal no es el voltaje alto del secundario, sino la corriente del circuito primario. El condensador del circuito primario puede almacenar suficiente energía para producir una descarga letal incluso cuando la bobina está apagada. Antes de tocar cualquier componente del circuito, el condensador debe descargarse completamente usando una resistencia de descarga dedicada. Los condensadores pueden retener carga peligrosa durante horas o incluso días después de desconectar la fuente de alimentación, un fenómeno conocido como "recuperación dieléctrica".',
      'El equipo de protección personal mínimo incluye: gafas de seguridad con protección lateral (las descargas eléctricas generan radiación ultravioleta que puede dañar los ojos), guantes aislantes de caucho clasificados para alto voltaje, calzado con suela de goma gruesa, y ropa de algodón sin partes metálicas como cremalleras o botones que podrían actuar como puntos de descarga. Todo el área de trabajo debe tener un piso seco y no conductivo, y debe estar libre de materiales inflamables en un radio mínimo de 2 metros.',
      'Las reglas operativas fundamentales son: nunca operar la bobina solo, siempre mantener una mano en el bolsillo cuando se trabaja cerca del circuito energizado (esto evita que la corriente atraviese el corazón si accidentalmente se toca un componente vivo), desconectar siempre la alimentación antes de realizar ajustes, y nunca tocar la bobina mientras está funcionando. El entrehierro produce niveles de ruido superiores a 100 decibelios, por lo que se requiere protección auditiva durante la operación prolongada.',
      'Para proyectos escolares y educativos, se recomienda construir una bobina de Tesla de estado sólido (SSTC) de baja potencia en lugar de una con entrehierro. Las SSTC de menos de 50 vatios de entrada pueden producir arcos de 2 a 5 centímetros visualmente atractivos con un nivel de riesgo significativamente menor. También existen kits comerciales diseñados para uso educativo que operan con fuentes de alimentación de 12 o 24 voltios de corriente continua y generan campos de radiofrecuencia de baja potencia, suficientes para demostrar los principios de resonancia y transferencia inalámbrica de energía de forma segura.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La "jaula de Faraday" es un concepto clave en seguridad eléctrica, descubierto por Michael Faraday en 1836. Una estructura conductora cerrada bloquea los campos eléctricos externos, protegiendo todo lo que esté en su interior. Los coches, los aviones y los trajes de malla metálica que usan los operadores profesionales de bobinas de Tesla funcionan bajo este principio: la corriente fluye por la superficie exterior sin penetrar al interior.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El efecto piel (skin effect) explica por qué las descargas de alta frecuencia de una bobina de Tesla tienden a fluir por la superficie del cuerpo en lugar de penetrar hacia los órganos internos. A frecuencias superiores a 100 kHz, la corriente eléctrica se concentra en las capas más externas de cualquier conductor, incluida la piel humana. Sin embargo, este efecto NO hace que las bobinas de Tesla sean seguras para el contacto: quemaduras de radiofrecuencia, parada cardíaca por el circuito primario y daño auditivo permanente siguen siendo riesgos reales y documentados.' },
    ],
    fact: 'En febrero de 2014, un estudiante de 18 años en Cameron, Missouri (Estados Unidos), sufrió quemaduras de tercer grado en ambas manos al intentar construir una bobina de Tesla sin supervisión adulta, utilizando un condensador de microondas reciclado sin descarga previa. El incidente fue documentado por el Departamento de Bomberos local y se convirtió en un caso de estudio para la Asociación Nacional de Protección contra Incendios (NFPA). La regla más importante en cualquier proyecto eléctrico es simple y no negociable: siempre trabaja con un adulto capacitado presente.',
  },
  {
    id: 'materiales-necesarios',
    title: 'Materiales Necesarios',
    color: '#7A8B96',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_materiales-necesarios.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_materiales-necesarios.jpg',
    content: [
      'La bobina secundaria es el componente central y se construye enrollando alambre magneto (alambre de cobre esmaltado) sobre un tubo de PVC. Para una bobina educativa de tamaño mediano, se utiliza un tubo de PVC de tipo Schedule 40 con un diámetro exterior de 7.6 centímetros (3 pulgadas) y una longitud de 50 a 60 centímetros. El alambre magneto debe ser calibre AWG 28 a AWG 30 (0.32 a 0.25 milímetros de diámetro), y se necesitan aproximadamente 250 a 300 metros para cubrir unas 800 a 1000 vueltas uniformes sobre el tubo.',
      'El circuito primario requiere alambre de cobre desnudo o tubo de cobre de 6 milímetros de diámetro exterior, enrollado en una espiral plana o cónica de 8 a 12 vueltas. El condensador primario debe tener una capacitancia entre 5 y 15 nanofaradios (nF) y debe soportar voltajes de al menos 20,000 voltios de pico. Para uso educativo, se recomienda construir un condensador tipo MMC (Multi-Mini Capacitor) usando condensadores de película de polipropileno conectados en serie y paralelo para alcanzar los valores requeridos.',
      'El entrehierro (spark gap) más sencillo consiste en dos tornillos de acero inoxidable o tungsteno montados en soportes aislantes con una separación ajustable de 1 a 5 milímetros. Para mejor rendimiento y control, se puede construir un entrehierro rotativo usando un motor eléctrico con electrodos montados en un disco giratorio, lo cual permite controlar la tasa de descarga. El tungsteno es el material preferido para los electrodos porque tiene el punto de fusión más alto de todos los elementos: 3,422 grados Celsius.',
      'El terminal de descarga (toroide) se construye típicamente envolviendo un tubo flexible de aluminio de 10 centímetros de diámetro alrededor de un disco circular de cartón o madera. El diámetro exterior del toroide debe ser aproximadamente 3 a 4 veces el diámetro del tubo de la bobina secundaria, es decir, entre 23 y 30 centímetros para nuestro ejemplo. El toroide cumple dos funciones: actúa como capacitancia de carga para el circuito secundario y da forma al campo eléctrico para dirigir las descargas hacia arriba y hacia afuera.',
      'La fuente de alimentación para una bobina educativa puede ser un transformador de neón (NST) con una salida de 9,000 a 15,000 voltios a 30 o 60 miliamperios. Estos transformadores se encuentran en letreros de neón comerciales y tienen la ventaja de incluir protección de corriente incorporada que limita la corriente de salida, reduciendo el riesgo de descarga letal. También se necesita una buena conexión a tierra: una varilla de cobre de al menos 1.2 metros clavada en tierra húmeda, conectada al circuito mediante cable de cobre AWG 10 o más grueso.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El alambre magneto recibe su nombre porque fue desarrollado originalmente para enrollar electroimanes en el siglo XIX. El esmalte de poliuretano que recubre cada hilo tiene un espesor de solo 0.025 milímetros (25 micrómetros), pero puede soportar entre 1,000 y 5,000 voltios dependiendo de su clasificación. Si las espiras de la bobina secundaria no están perfectamente alineadas y uniformes, pueden crearse puntos de alto estrés eléctrico donde el esmalte se perfora, causando cortocircuitos internos que arruinan la bobina.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El PVC (policloruro de vinilo) se utiliza como forma de la bobina porque tiene una rigidez dieléctrica de aproximadamente 40 megavoltios por metro (MV/m), lo que significa que puede soportar 40 millones de voltios por cada metro de espesor antes de que la electricidad lo atraviese. Su constante dieléctrica es de 3.4, relativamente baja, lo cual minimiza las pérdidas de energía por calentamiento dieléctrico a las frecuencias de operación típicas de una bobina de Tesla (100 kHz a 500 kHz).' },
    ],
    fact: 'El tungsteno, utilizado en los electrodos del entrehierro, es el elemento con el punto de fusión más alto de toda la tabla periódica: 3,422 grados Celsius (6,192 grados Fahrenheit). Fue aislado por primera vez en 1783 por los hermanos españoles Juan José y Fausto Elhuyar en el Real Seminario de Vergara, en el País Vasco. Su nombre proviene del sueco "tung sten", que significa "piedra pesada". Un centímetro cúbico de tungsteno pesa 19.3 gramos, casi idéntico a la densidad del oro (19.32 g/cm³).',
  },
  {
    id: 'construccion-paso-a-paso',
    title: 'Construcción Paso a Paso',
    color: '#C49225',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_construccion-paso-a-paso.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_construccion-paso-a-paso.jpg',
    content: [
      'El primer paso es construir la bobina secundaria, ya que su frecuencia de resonancia natural determinará los parámetros de todos los demás componentes. Sella un extremo del tubo de PVC con una tapa adhesiva y aplica dos capas de barniz de poliuretano sobre toda la superficie exterior, dejando secar cada capa durante 24 horas. Esto sella los poros microscópicos del PVC y mejora su aislamiento eléctrico. Marca con un lápiz el punto de inicio del enrollado a 5 centímetros del extremo inferior.',
      'Para enrollar el alambre, fija el extremo del alambre magneto en la marca con cinta adhesiva dejando unos 15 centímetros de cable sobrante para la conexión. Gira el tubo lentamente, aplicando tensión constante al alambre para que cada espira quede perfectamente adyacente a la anterior sin espacios ni superposiciones. Este proceso requiere paciencia: enrollar 900 vueltas puede tomar entre 3 y 5 horas. Cada 100 vueltas, aplica una capa fina de barniz o pegamento de cianoacrilato para fijar las espiras. Deja 5 centímetros sin enrollar en el extremo superior.',
      'La bobina primaria se construye enrollando tubo de cobre de 6 milímetros en una espiral plana o ligeramente cónica. La primera vuelta debe tener un diámetro interior de al menos 2 centímetros más que el diámetro exterior de la bobina secundaria, para mantener un espacio de acoplamiento adecuado. Enrolla entre 8 y 12 vueltas con una separación de 5 a 8 milímetros entre cada vuelta. Monta la espiral sobre una base aislante de madera, acrílico o policarbonato, y conecta un extremo a una de las abrazaderas tipo cocodrilo para poder ajustar el punto de derivación.',
      'El montaje del entrehierro requiere instalar los dos electrodos sobre soportes aislantes con una separación inicial de 2 milímetros. Conecta un electrodo a un terminal del condensador primario y el otro al terminal restante del circuito primario. La conexión a tierra es crítica: el extremo inferior de la bobina secundaria debe conectarse directamente a la varilla de tierra mediante un cable corto y grueso, con la menor impedancia posible. Una mala conexión a tierra es la causa más común de mal funcionamiento en bobinas de Tesla.',
      'Antes de aplicar energía, verifica todas las conexiones dos veces. Asegúrate de que la base de la bobina secundaria está firmemente montada en el centro de la espiral primaria, que el toroide está bien sujeto en la parte superior de la bobina secundaria, y que todos los cables de conexión están bien apretados. Coloca la bobina sobre una superficie no conductiva (mesa de madera seca, sin barniz metálico), retira todos los dispositivos electrónicos del área (los campos de radiofrecuencia pueden dañar teléfonos y computadoras), y verifica que el extintor de incendios tipo C (para fuegos eléctricos) está accesible.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El factor de acoplamiento entre las bobinas primaria y secundaria de una bobina de Tesla típica es de solo 0.10 a 0.20 (10% a 20%). En un transformador convencional, el acoplamiento es cercano a 1.0 (100%). Este acoplamiento deliberadamente débil permite que el circuito secundario oscile libremente a su frecuencia natural de resonancia, acumulando energía con cada pulso del primario, similar a como empujar un columpio suavemente y en el momento justo lo hace subir cada vez más alto.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La longitud de onda de la señal de radiofrecuencia producida por una bobina de Tesla educativa típica (frecuencia de 200 kHz) es de aproximadamente 1,500 metros, calculada como c/f donde c es la velocidad de la luz (300,000 km/s). El secundario de 50 cm funciona como un resonador de cuarto de onda, lo que significa que su longitud eléctrica equivale a un cuarto de la longitud de onda. Esto es análogo a un tubo de órgano que resuena a una frecuencia determinada por su longitud.' },
    ],
    fact: 'Nikola Tesla describió en sus cuadernos de laboratorio de Colorado Springs (1899-1900) que enrollaba las bobinas secundarias a mano, espira por espira. Cada bobina requería varios días de trabajo manual continuo. Utilizaba seda aceitada como aislante entre capas, un material que proporcionaba una rigidez dieléctrica de aproximadamente 20 MV/m. Sus cuadernos, publicados en 1978 por el Museo Nikola Tesla de Belgrado, contienen más de 500 páginas de diagramas, cálculos y observaciones experimentales detalladas sobre resonancia y transferencia de energía inalámbrica.',
  },
  {
    id: 'tu-primera-chispa',
    title: 'Tu Primera Chispa',
    color: '#8A9AA6',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_tu-primera-chispa.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_tu-primera-chispa.jpg',
    content: [
      'El proceso de sintonización es el paso más crítico y requiere paciencia metódica. La bobina secundaria tiene una frecuencia de resonancia fija determinada por su geometría. El objetivo es ajustar la frecuencia del circuito primario para que coincida exactamente con esta frecuencia del secundario. Si las frecuencias no coinciden, la transferencia de energía será deficiente y los arcos serán débiles o inexistentes, sin importar cuánta potencia se suministre al circuito primario.',
      'Para medir la frecuencia de resonancia del secundario, se utiliza un generador de señales y un osciloscopio. Se conecta el generador de señales a una sola espira de alambre colocada cerca de la base del secundario y se barre la frecuencia desde 100 kHz hasta 500 kHz. La frecuencia a la cual el osciloscopio muestra el pico máximo de voltaje en la parte superior del secundario es la frecuencia de resonancia. Para una bobina con 900 vueltas de AWG 28 sobre un tubo de 7.6 cm de diámetro y 50 cm de longitud, esta frecuencia estará típicamente entre 180 y 250 kHz.',
      'El ajuste del primario se realiza moviendo el punto de conexión (derivación) a lo largo de la espiral primaria, cambiando el número efectivo de vueltas y por tanto la inductancia del circuito. Menos vueltas significan menor inductancia y mayor frecuencia de resonancia del primario; más vueltas significan mayor inductancia y menor frecuencia. La fórmula f = 1/(2π√LC) permite calcular la frecuencia para cada posición de derivación si se conocen los valores de L y C del circuito primario.',
      'Los problemas más comunes durante la primera puesta en marcha incluyen: ausencia de chispa en el entrehierro (separación demasiado grande o voltaje de alimentación insuficiente), entrehierro que chispea pero no hay descarga en el toroide (bobinas fuera de sintonía o mala conexión a tierra), arcos que saltan hacia la bobina primaria en lugar del toroide (acoplamiento excesivo o toroide demasiado pequeño), y ruido eléctrico que interfiere con equipos cercanos (necesidad de blindaje o filtros de radiofrecuencia en la línea de alimentación).',
      'Cuando la sintonización es correcta, el primer arco visible desde el toroide es un momento que difícilmente se olvida. El aire alrededor del terminal se ioniza, creando un resplandor azulado llamado corona eléctrica. Las moléculas de nitrógeno y oxígeno del aire absorben energía del campo eléctrico, se excitan a estados energéticos superiores, y al regresar a su estado fundamental emiten fotones de luz visible. El color azul-violeta proviene de las moléculas de nitrógeno excitadas, mientras que un tono más rosado indicaría mayor proporción de oxígeno ionizado.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sonido característico del entrehierro de una bobina de Tesla ("crack" repetitivo) se produce porque cada descarga en el entrehierro calienta el aire a temperaturas superiores a 20,000 grados Celsius en menos de un microsegundo. Esta expansión térmica explosiva crea una onda de choque acústica, exactamente el mismo fenómeno que produce los truenos durante una tormenta eléctrica, pero a escala reducida y con una frecuencia de repetición controlada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La rigidez dieléctrica del aire a presión atmosférica estándar (101.325 kPa) y temperatura ambiente es de aproximadamente 30 kV/cm (30,000 voltios por centímetro). Este valor fue medido con precisión por Friedrich Paschen en 1889, quien formuló la ley que lleva su nombre. Sin embargo, en una bobina de Tesla, las descargas ocurren a voltajes menores que lo predicho por la ley de Paschen porque la radiación ultravioleta y el ozono generados por descargas previas preionización el aire circundante, reduciendo su resistencia eléctrica.' },
    ],
    fact: 'El ozono (O₃) que se percibe como un olor metálico distintivo cerca de una bobina de Tesla en funcionamiento fue descubierto por Christian Friedrich Schönbein en 1840 en la Universidad de Basilea, Suiza. Lo identificó por su olor particular durante experimentos de electrólisis del agua. Su concentración alrededor de una bobina de Tesla puede alcanzar 0.1 a 0.5 partes por millón (ppm). La Organización Mundial de la Salud establece un límite de exposición de 0.05 ppm durante un promedio de 8 horas, por lo que las sesiones de operación de bobinas deben ser breves y en áreas bien ventiladas.',
  },
  {
    id: 'experimentos-divertidos',
    title: 'Experimentos Divertidos',
    color: '#B88420',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_experimentos-divertidos.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_experimentos-divertidos.jpg',
    content: [
      'Uno de los experimentos más llamativos con una bobina de Tesla es encender tubos fluorescentes sin conexión eléctrica directa. Cuando sostienes un tubo fluorescente estándar (con guantes aislantes y a una distancia prudente de la bobina), el campo electromagnético de alta frecuencia generado por la bobina excita el gas de mercurio dentro del tubo, que a su vez emite radiación ultravioleta. Esta radiación UV impacta el recubrimiento de fósforo de las paredes internas del tubo, que convierte la luz UV en luz visible blanca.',
      'La distancia a la que un tubo fluorescente se enciende depende de la potencia de la bobina y la frecuencia de operación. Una bobina educativa de 300 vatios puede iluminar un tubo de 120 centímetros a una distancia de 1 a 2 metros. Este fenómeno se debe a que el campo eléctrico oscilante de alta frecuencia genera una diferencia de potencial suficiente entre los extremos del tubo para ionizar el gas de mercurio en su interior, sin necesidad de contacto físico. Tesla demostró este mismo efecto en 1893 en la Feria Mundial de Chicago.',
      'Las "bobinas de Tesla musicales" o DRSSTC (Dual Resonant Solid State Tesla Coil) representan una aplicación moderna donde los arcos eléctricos producen sonido audible. El principio funciona así: los arcos se encienden y apagan miles de veces por segundo, calentando y enfriando el aire rápidamente. Si la frecuencia de encendido y apagado coincide con la frecuencia de una nota musical (por ejemplo, 440 Hz para la nota La central), el arco produce un tono audible. Controlando esta frecuencia con una señal MIDI, la bobina puede "tocar" melodías reconocibles.',
      'Otro experimento visual consiste en crear figuras de Lissajous con los arcos. Colocando un electrodo puntiagudo cerca del toroide y variando lentamente la frecuencia de operación, los arcos describen patrones complejos en el aire. Estos patrones fueron estudiados por el matemático francés Jules Antoine Lissajous en 1857 y representan la superposición de dos oscilaciones perpendiculares. En la bobina de Tesla, una oscilación proviene del campo eléctrico rotante y la otra del movimiento térmico ascendente del aire caliente ionizado.',
      'Para escuelas y entornos educativos, una "bobina de Tesla en miniatura" de estado sólido alimentada con 9 voltios puede demostrar todos estos principios de forma segura. Estos dispositivos, basados en un solo transistor (como el 2N2222A) y una bobina enrollada sobre un bolígrafo, producen campos de radiofrecuencia suficientes para encender un LED pequeño a distancia, hacer vibrar un fluorescente compacto, y demostrar transferencia inalámbrica de energía. El costo total de materiales es inferior a 5 dólares y el montaje toma menos de 30 minutos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En la Exposición Universal de Chicago de 1893, conocida como la "Feria Mundial Colombina", Nikola Tesla realizó una demostración que dejó perplejos a los 27 millones de visitantes. Sostuvo tubos de vacío que brillaban en sus manos sin conexión visible a ninguna fuente de energía, iluminados por los campos de alta frecuencia de sus bobinas. Thomas Edison había declarado que la corriente alterna era peligrosa; Tesla respondió literalmente haciéndola pasar por su propio cuerpo sin sufrir daño aparente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La bobina de Tesla musical más grande del mundo fue construida por el grupo ArcAttack en Austin, Texas. Sus dos bobinas DRSSTC de 3.5 metros de altura pueden producir arcos de más de 3 metros mientras "tocan" música a volúmenes superiores a 110 decibelios. Cada arco alcanza temperaturas de más de 30,000 grados Kelvin en su canal central, cinco veces más caliente que la superficie del Sol (5,778 K). La música se controla mediante señales MIDI enviadas a controladores FPGA que modulan los pulsos del inversor a frecuencias de audio.' },
    ],
    fact: 'Tesla demostró el primer dispositivo de control remoto del mundo en una exhibición en el Madison Square Garden de Nueva York en 1898. Su "teleautomaton" era un barco de 1.2 metros de longitud controlado por ondas de radio, que podía avanzar, retroceder, girar y encender luces a distancia. La patente US 613,809, otorgada el 8 de noviembre de 1898, describe no solo el control remoto sino también los fundamentos lógicos de lo que hoy llamamos robótica. Los asistentes pensaron que era magia o un truco; algunos sugirieron que un mono pequeño estaba escondido dentro del barco.',
  },
  {
    id: 'fisica-detras-magia',
    title: 'La Física Detrás de la Magia',
    color: '#5A6B7A',
    btnImage: '/assets/nikola_tesla/infographic_m10/btn_fisica-detras-magia.jpg',
    image: '/assets/nikola_tesla/infographic_m10/hero_fisica-detras-magia.jpg',
    content: [
      'El funcionamiento de la bobina de Tesla se fundamenta en los circuitos LC (inductancia-capacitancia), uno de los conceptos más importantes de la electrónica y la física de ondas. Un circuito LC consiste en un inductor (bobina de alambre) y un capacitor (condensador) conectados en un lazo cerrado. Cuando se carga el capacitor y se libera la energía, esta oscila entre el campo eléctrico del capacitor y el campo magnético del inductor, ida y vuelta, a una frecuencia natural específica.',
      'La frecuencia de resonancia de un circuito LC se calcula mediante la fórmula f = 1/(2π√LC), donde f es la frecuencia en hercios (Hz), L es la inductancia en henrios (H), y C es la capacitancia en faradios (F). Esta ecuación fue derivada por William Thomson (Lord Kelvin) en 1853. Para una bobina de Tesla con una inductancia primaria de 50 microhenrios y una capacitancia de 10 nanofaradios, la frecuencia de resonancia es: f = 1/(2π√(50×10⁻⁶ × 10×10⁻⁹)) = 1/(2π√(5×10⁻¹³)) ≈ 225,000 Hz, es decir, 225 kHz.',
      'La resonancia es un fenómeno que ocurre en todos los sistemas oscilantes, no solo en circuitos eléctricos. Un columpio en un parque tiene una frecuencia de resonancia natural: si empujas con el ritmo correcto, la amplitud del balanceo aumenta con cada empujón. Un puente puede resonar con el viento (como el famoso colapso del puente de Tacoma Narrows en Washington, Estados Unidos, el 7 de noviembre de 1940). Un vaso de cristal puede romperse con una nota musical que coincida con su frecuencia de resonancia natural, verificado experimentalmente a 550-600 Hz.',
      'La bobina de Tesla genera radiación electromagnética en la banda de radiofrecuencia (RF). Según las ecuaciones de Maxwell, publicadas por James Clerk Maxwell en 1865, todo circuito que transporta corrientes alternas emite ondas electromagnéticas. La intensidad de la radiación depende de la frecuencia y la corriente. A 200 kHz, la longitud de onda es de 1,500 metros, situándose en la banda de frecuencia baja (LF). Esta misma banda es utilizada por sistemas de navegación marítima, señales horarias y comunicaciones submarinas.',
      'La relación entre electricidad y magnetismo, unificada por Maxwell, es la base de toda la tecnología moderna de comunicaciones, energía y computación. La bobina de Tesla es, en esencia, un dispositivo que convierte energía eléctrica de baja frecuencia (50 o 60 Hz de la red eléctrica) en energía electromagnética de alta frecuencia (100-500 kHz), amplificando el voltaje mediante resonancia. Este mismo principio fundamental se aplica en transmisores de radio, hornos de microondas, resonancias magnéticas hospitalarias, cargadores inalámbricos de teléfonos y aceleradores de partículas como el Gran Colisionador de Hadrones (LHC) del CERN.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Heinrich Hertz demostró experimentalmente la existencia de las ondas electromagnéticas predichas por Maxwell en 1887, en la Universidad de Karlsruhe, Alemania. Su aparato era esencialmente un circuito LC con un entrehierro (un transmisor rudimentario) y un aro de alambre con otro entrehierro (un receptor rudimentario). Cuando activaba el transmisor, aparecían chispas minúsculas en el receptor ubicado al otro lado de la habitación, probando que la energía viajaba a través del espacio como ondas invisibles.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El factor de calidad Q de un circuito resonante mide qué tan "selectivo" es en su frecuencia de resonancia. Una bobina de Tesla secundaria bien construida puede alcanzar un factor Q de 200 a 400, significando que almacena entre 200 y 400 veces más energía de la que pierde en cada ciclo de oscilación. En comparación, un receptor de radio FM típico tiene un Q de 50-100, y un cristal de cuarzo de reloj tiene un Q de 10,000 a 100,000. Un factor Q alto permite acumular más energía y producir voltajes más altos.' },
    ],
    fact: 'Las ecuaciones de Maxwell, publicadas en 1865, consisten en cuatro ecuaciones que unifican la electricidad, el magnetismo y la óptica en un solo marco teórico. Predijeron que la luz es una onda electromagnética que viaja a 299,792,458 metros por segundo, un valor que fue confirmado experimentalmente por Albert Michelson en 1879 con un error menor al 0.06%. Estas mismas ecuaciones predicen que toda la radiación electromagnética (ondas de radio, microondas, infrarrojo, luz visible, ultravioleta, rayos X y rayos gamma) son manifestaciones del mismo fenómeno, diferenciándose únicamente en su frecuencia y longitud de onda.',
  },
];

// ─── Electric Field Canvas Background ────────────────────────────────────────
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

// ─── Tesla Coil Header ──────────────────────────────────────────────────────
function TeslaCoilHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Electric arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#teslaGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central coil icon */}
        <line x1="300" y1="42" x2="300" y2="20" stroke="#D4A535" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <ellipse cx="300" cy="18" rx="10" ry="4" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.5" />
        <path d="M290 15 Q285 8 280 5" fill="none" stroke="#D4A535" strokeWidth="1" opacity="0.4" />
        <path d="M310 15 Q315 8 320 5" fill="none" stroke="#D4A535" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">BOBINA DE TESLA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">CONSTRUYE TU PROPIA BOBINA</text>
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
          layoutId="activeDotTeslaM10"
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

        {/* ─── Conditional Video Render ─── */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
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

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_TeslaM10() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,12,25,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/tesla/tesla_m10.png)',
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

      <TeslaCoilHeader />

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
              🏆 ¡Has dominado la construcción de la Bobina de Tesla!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Constructor de Bobinas
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
