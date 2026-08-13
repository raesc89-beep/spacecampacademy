'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Tesla / Electricity themed) ────────────────────
function DecoTeslaCoil({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Coil base */}
      <rect x="25" y="42" width="10" height="14" rx="2" fill={color} opacity="0.3" />
      {/* Coil windings */}
      <ellipse cx="30" cy="42" rx="14" ry="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="30" cy="36" rx="12" ry="3.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
      <ellipse cx="30" cy="30" rx="10" ry="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="30" cy="24" rx="8" ry="2.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.55" />
      <ellipse cx="30" cy="18" rx="6" ry="2" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Top electrode */}
      <circle cx="30" cy="12" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="12" r="2" fill={color} opacity="0.6" />
      {/* Sparks */}
      <line x1="24" y1="8" x2="18" y2="3" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="36" y1="8" x2="42" y2="3" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="30" y1="7" x2="30" y2="1" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
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

function DecoRadioWave({ size = 80, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Antenna */}
      <line x1="12" y1="44" x2="12" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="3" fill={color} opacity="0.5" />
      {/* Concentric wave arcs */}
      <path d="M20 18 Q30 8 40 18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M24 18 Q38 2 52 18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M28 18 Q46 -4 64 18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Signal dots */}
      <circle cx="50" cy="14" r="1.5" fill={color} opacity="0.4" />
      <circle cx="62" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="70" cy="12" r="1.5" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoGear({ size = 60, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.5" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 30 + 12 * Math.cos(rad);
        const y1 = 30 + 12 * Math.sin(rad);
        const x2 = 30 + 17 * Math.cos(rad);
        const y2 = 30 + 17 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoCircuit({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circuit paths */}
      <path d="M10 30 L20 30 L20 15 L35 15 L35 30 L50 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <path d="M10 45 L25 45 L25 38 L45 38 L45 45 L50 45" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
      {/* Nodes */}
      <circle cx="20" cy="30" r="2.5" fill={color} opacity="0.5" />
      <circle cx="35" cy="15" r="2.5" fill={color} opacity="0.5" />
      <circle cx="35" cy="30" r="2.5" fill={color} opacity="0.5" />
      <circle cx="25" cy="45" r="2" fill={color} opacity="0.4" />
      <circle cx="45" cy="38" r="2" fill={color} opacity="0.4" />
      {/* Resistor symbol */}
      <path d="M20 15 L22 12 L24 18 L26 12 L28 18 L30 12 L32 18 L35 15" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoPatent({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Document shape */}
      <rect x="12" y="6" width="36" height="48" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Fold corner */}
      <path d="M38 6 L48 6 L48 16" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M38 6 L38 16 L48 16" fill={color} opacity="0.15" />
      {/* Text lines */}
      <line x1="18" y1="22" x2="42" y2="22" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="28" x2="38" y2="28" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="18" y1="34" x2="40" y2="34" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="18" y1="40" x2="36" y2="40" stroke={color} strokeWidth="1" opacity="0.2" />
      {/* Seal */}
      <circle cx="36" cy="46" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="36" cy="46" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'bobina-tesla': [DecoTeslaCoil, DecoLightningBolt, DecoCircuit],
  'radio-tesla-marconi': [DecoRadioWave, DecoTeslaCoil, DecoLightningBolt],
  'control-remoto': [DecoCircuit, DecoRadioWave, DecoGear],
  'rayos-x-tesla': [DecoTeslaCoil, DecoCircuit, DecoPatent],
  'turbina-tesla': [DecoGear, DecoCircuit, DecoTeslaCoil],
  'rayo-de-la-muerte': [DecoLightningBolt, DecoTeslaCoil, DecoRadioWave],
  'patentes-legado': [DecoPatent, DecoGear, DecoLightningBolt],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'Tesla, N. (1919). My Inventions: The Autobiography of Nikola Tesla, Electrical Experimenter Magazine',
  'Cheney, M. (2001). Tesla: Man Out of Time, Simon & Schuster',
  'O\'Neill, J.J. (1944). Prodigal Genius: The Life of Nikola Tesla, Ives Washburn',
  'Seifer, M.J. (1998). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'bobina-tesla',
    title: 'La Bobina de Tesla',
    color: '#6B7B8A',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'En 1891, Nikola Tesla patentó uno de sus inventos más reconocidos: la bobina de Tesla (patente US454,622). Este dispositivo es un transformador resonante que produce corrientes alternas de alto voltaje y alta frecuencia. A diferencia de los transformadores convencionales, la bobina de Tesla utiliza el principio de resonancia eléctrica para amplificar el voltaje de entrada hasta niveles que pueden superar los millones de voltios, generando descargas eléctricas visibles que se extienden varios metros a través del aire.',
      'El funcionamiento de la bobina se basa en dos circuitos oscilantes acoplados. El circuito primario contiene un condensador que se carga y descarga a través de un espacio de chispa (spark gap), generando oscilaciones en la bobina primaria. Estas oscilaciones transfieren energía a la bobina secundaria mediante inducción electromagnética. Cuando la frecuencia de resonancia de ambos circuitos coincide, la transferencia de energía alcanza su punto máximo, produciendo voltajes extremos en la terminal superior de la bobina secundaria.',
      'Tesla desarrolló este dispositivo como parte de su investigación sobre la transmisión inalámbrica de energía eléctrica. Su objetivo era demostrar que la electricidad podía distribuirse sin cables conductores, utilizando la Tierra y la ionosfera como medio de transmisión. En 1899, en su laboratorio de Colorado Springs, Tesla construyó una bobina de gran escala que produjo descargas de hasta 41 metros de longitud y generó truenos artificiales audibles a 24 kilómetros de distancia.',
      'Las aplicaciones modernas de la bobina de Tesla son diversas y van más allá del espectáculo visual. En medicina, las corrientes de alta frecuencia generadas por variantes de la bobina se utilizan en equipos de electrocirugía para cortar y cauterizar tejido. En la industria, se emplean para pruebas de aislamiento eléctrico y detección de fugas en sistemas de vacío. Los generadores de ozono basados en descargas de alta frecuencia se utilizan en tratamiento de agua potable en numerosas plantas de purificación.',
      'La bobina de Tesla también sentó las bases teóricas para la radio, las comunicaciones inalámbricas y los sistemas de iluminación sin cables. Tesla demostró públicamente que las lámparas podían encenderse sin conexión directa, sosteniendo tubos de vidrio llenos de gas que brillaban al recibir la energía radiada por la bobina. Estos experimentos, realizados ante audiencias en Columbia College y la Royal Institution de Londres en 1891 y 1892, precedieron por varios años las investigaciones de otros pioneros de la comunicación inalámbrica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La bobina más grande que Tesla construyó en Colorado Springs generó un voltaje estimado de 12 millones de voltios. Durante uno de sus experimentos en junio de 1899, la descarga eléctrica fue tan potente que fundió el generador de la compañía eléctrica local, El Paso Electric Company, dejando a toda la ciudad de Colorado Springs sin electricidad. Tesla tuvo que pagar por las reparaciones y prometer que no volvería a hacer pruebas sin aviso previo a la compañía.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las descargas de una bobina de Tesla no electrocutan a las personas debido al efecto piel (skin effect). Las corrientes de alta frecuencia (superiores a 100 kHz) tienden a fluir por la superficie de los conductores en lugar de penetrar hacia el interior. En el cuerpo humano, esto significa que la corriente circula por la capa externa de la piel sin atravesar los órganos internos ni el sistema nervioso. Este principio físico, descrito por Lord Kelvin en 1887, es lo que permite a los operadores de bobinas de Tesla dirigir arcos eléctricos con sus manos sin sufrir daño.' },
    ],
    fact: 'En septiembre de 1899, Tesla registró en su diario de Colorado Springs que había detectado señales eléctricas periódicas que, según él, provenían de otro planeta. Anotó: "Tengo un sentimiento profundo de haber sido el primero en escuchar el saludo de un planeta a otro." La comunidad científica moderna ha determinado que lo que Tesla probablemente detectó fueron emisiones naturales de radio del planeta Júpiter, cuyas tormentas electromagnéticas producen señales periódicas detectables con equipos sensibles. Tesla fue, sin saberlo, uno de los primeros radioastrónomos de la historia.',
  },
  {
    id: 'radio-tesla-marconi',
    title: 'Radio: ¿Tesla o Marconi?',
    color: '#D4A535',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'La disputa por la invención de la radio es una de las controversias más prolongadas en la historia de la tecnología. En 1897, Nikola Tesla presentó la patente US645,576 ante la Oficina de Patentes de Estados Unidos, describiendo un sistema completo de transmisión de energía eléctrica mediante ondas electromagnéticas. Esta patente detallaba los principios fundamentales de la comunicación por radio: un transmisor que generaba ondas electromagnéticas de frecuencia controlada y un receptor sintonizado para captar esas frecuencias específicas.',
      'Guglielmo Marconi, ingeniero italiano, realizó su primera demostración de telegrafía inalámbrica en 1896 y logró la primera transmisión transatlántica en diciembre de 1901, enviando la letra "S" en código Morse desde Poldhu, Cornualles, hasta Signal Hill, Terranova, una distancia de 3,500 kilómetros. Sin embargo, el sistema de Marconi utilizaba al menos 17 patentes previamente registradas por Tesla, incluyendo los circuitos sintonizados que permitían seleccionar una frecuencia específica entre múltiples señales.',
      'En 1900, la Oficina de Patentes de Estados Unidos rechazó la solicitud de Marconi, citando la prioridad de las patentes de Tesla. Sin embargo, en 1904, la misma oficina revirtió su decisión y otorgó la patente de radio a Marconi. Los historiadores señalan que esta reversión coincidió con las inversiones del financiero Andrew Carnegie y del inventor Thomas Edison en la compañía de Marconi, y con la creciente influencia de la Marconi Wireless Telegraph Company en los mercados financieros de Londres y Nueva York.',
      'La resolución definitiva llegó el 21 de junio de 1943, cuando la Corte Suprema de Estados Unidos, en el caso Marconi Wireless Telegraph Co. of America v. United States (320 U.S. 1), dictaminó que las patentes de Tesla tenían prioridad sobre las de Marconi. El fallo reconoció que los circuitos sintonizados de Tesla eran anteriores y fundamentales para el funcionamiento de cualquier sistema de radio. Esta decisión se produjo varios meses después de la muerte de Tesla, ocurrida el 7 de enero de 1943 en el Hotel New Yorker de Manhattan.',
      'Más allá de la disputa legal, la contribución de Tesla a las comunicaciones inalámbricas abarcó conceptos que tardarían décadas en materializarse. En una entrevista de 1926 publicada en la revista Colliers, Tesla describió un dispositivo portátil de comunicación que se ajusta con precisión a la definición de un teléfono inteligente moderno: un aparato de bolsillo capaz de transmitir voz, imagen y datos de forma inalámbrica a cualquier punto del planeta. Esta visión anticipó en más de 80 años la llegada del iPhone en 2007.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando el Titanic se hundió el 15 de abril de 1912, los operadores de radio Jack Phillips y Harold Bride utilizaron equipos Marconi para enviar señales de socorro. Las señales SOS fueron captadas por el barco Carpathia, que rescató a 710 supervivientes. Sin embargo, la tecnología de sintonización que permitía distinguir las señales de socorro de otras transmisiones provenía directamente de las patentes de Tesla. Los circuitos LC (inductancia-capacitancia) que Tesla diseñó en la década de 1890 son la base de toda la sintonización de radio hasta el día de hoy.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Tesla comprendió que las ondas electromagnéticas viajan a la velocidad de la luz (299,792,458 metros por segundo en el vacío) y que diferentes frecuencias podían coexistir sin interferencia si se utilizaban circuitos sintonizados. Este principio, conocido como multiplexación por división de frecuencia (FDM), es la base de toda la telecomunicación moderna: radio FM, televisión, telefonía celular, Wi-Fi y satélites. Cada dispositivo inalámbrico que utilizamos hoy emplea circuitos sintonizados derivados del diseño original de Tesla.' },
    ],
    fact: 'El Nobel de Física de 1909 fue otorgado a Guglielmo Marconi y Karl Ferdinand Braun "por sus contribuciones al desarrollo de la telegrafía inalámbrica." Tesla, quien esperaba compartir el premio, no fue mencionado. Según el biógrafo W. Bernard Carlson, Tesla rechazó una oferta previa para compartir un Nobel con Edison en 1915, declarando que Edison era "meramente un inventor" mientras que él era "un descubridor de principios nuevos." El comité Nobel nunca confirmó oficialmente que tal oferta existiera, y ninguno de los dos recibió el premio ese año.',
  },
  {
    id: 'control-remoto',
    title: 'Control Remoto',
    color: '#7A8B96',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'El 1 de septiembre de 1898, en el Madison Square Garden de Nueva York, Nikola Tesla realizó una demostración que dejó al público sin palabras. Ante una audiencia que incluía periodistas, científicos y curiosos, Tesla controlaba un pequeño bote metálico dentro de un tanque de agua utilizando únicamente un transmisor de radio. El bote, que Tesla denominó "teleautómaton" (patente US613,809), podía cambiar de dirección, encender y apagar sus luces, y detenerse o arrancar siguiendo las órdenes transmitidas por ondas de radio desde el otro lado de la sala.',
      'El diseño del teleautómaton era sofisticado para su época. El bote contenía una antena receptora, un sistema de engranajes accionado por motores eléctricos, un circuito lógico basado en relés que interpretaba diferentes combinaciones de frecuencias, y una batería interna. Tesla utilizó múltiples frecuencias de radio para enviar comandos distintos: una frecuencia para girar a babor, otra para girar a estribor, una tercera para avanzar y una cuarta para detenerse. Este sistema de codificación por frecuencias es el antepasado directo del control remoto moderno.',
      'Los espectadores reaccionaron con escepticismo y asombro por igual. Algunos creyeron que Tesla utilizaba telepatía para dirigir el bote. Un periodista del New York Herald sugirió que un mono amaestrado se ocultaba dentro del casco. Tesla, con su característico sentido del espectáculo, invitó al público a gritar comandos que él entonces "traducía" al bote mediante su transmisor, demostrando que la comunicación era puramente electromagnética y no dependía de ningún truco oculto.',
      'Tesla comprendió las implicaciones militares y civiles de su invento mucho antes que sus contemporáneos. En la documentación de su patente, describió vehículos no tripulados capaces de operar en zonas peligrosas: exploración submarina, rescate en desastres, y operaciones de combate sin arriesgar vidas humanas. Tesla ofreció su invento a la Marina de Estados Unidos, pero los oficiales lo rechazaron, considerándolo poco práctico para uso militar. No fue hasta la Segunda Guerra Mundial, más de 40 años después, que los torpedos y drones guiados por radio se convirtieron en armas operativas.',
      'El legado del teleautómaton se extiende a la robótica moderna, los drones y los vehículos autónomos. Los principios que Tesla demostró en 1898 — control remoto mediante señales codificadas, actuadores que responden a comandos digitales y operación autónoma de máquinas — son los pilares sobre los que se construyen los robots quirúrgicos como el da Vinci, los drones de inspección industrial y los rovers marcianos como Curiosity y Perseverance. La patente US613,809 es considerada por los historiadores de la tecnología como el acta de nacimiento de la robótica y la automatización.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando Tesla ofreció su teleautómaton al gobierno de Estados Unidos, intentó convencer a los militares de que la guerra podía librarse sin soldados en el campo de batalla. Escribió en 1900: "La guerra cesará de existir cuando todos los hombres combatientes sean reemplazados por máquinas." Esta predicción describe con precisión el debate actual sobre armas autónomas y drones militares. El Pentágono gastó más de 9,000 millones de dólares en sistemas no tripulados solo en el año fiscal 2023, según el informe del Departamento de Defensa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El circuito lógico del teleautómaton de Tesla utilizaba compuertas AND implementadas con relés electromecánicos. Una compuerta AND solo produce una salida cuando todas sus entradas están activas simultáneamente. Tesla necesitaba que el bote respondiera únicamente a combinaciones específicas de frecuencias para evitar interferencias accidentales. Este concepto — la lógica booleana implementada en hardware — es el mismo principio que utilizan los procesadores modernos, que contienen miles de millones de compuertas lógicas en un chip de silicio del tamaño de una uña.' },
    ],
    fact: 'La patente US613,809, titulada "Method of and Apparatus for Controlling Mechanism of Moving Vessels or Vehicles," fue concedida el 8 de noviembre de 1898 y contiene 18 reivindicaciones que cubren el control remoto de cualquier vehículo mediante ondas electromagnéticas. El documento incluye diagramas detallados del circuito receptor con compuertas lógicas, convirtiéndolo en uno de los primeros diseños documentados de un sistema digital de control. La Sociedad de Ingenieros Eléctricos e Informáticos del IEEE reconoció en 2015 al teleautómaton como un hito en la historia de la ingeniería eléctrica.',
  },
  {
    id: 'rayos-x-tesla',
    title: 'Rayos X',
    color: '#C49225',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'En 1894, un año antes de que Wilhelm Conrad Röntgen anunciara oficialmente su descubrimiento de los rayos X en diciembre de 1895, Nikola Tesla ya experimentaba con lo que denominó "radiaciones de sombra" en su laboratorio de la calle Houston número 46 en Nueva York. Utilizando tubos de vacío conectados a sus bobinas de alta frecuencia, Tesla produjo imágenes de objetos metálicos dentro de cajas cerradas y de estructuras óseas a través de tejido blando, sin comprender del todo la naturaleza de la radiación que estaba generando.',
      'Tesla logró producir algunas de las primeras fotografías de rayos X de alta calidad en Estados Unidos. Una de sus imágenes más célebres es una "fotografía de sombra" del pie de un hombre dentro de un zapato, donde se distinguen con claridad los huesos, los clavos del calzado y las costuras de la suela. También fotografió a su amigo Mark Twain en su laboratorio utilizando iluminación de tubos de Geissler, y produjo imágenes de la mano del escritor que mostraban la estructura ósea con un detalle que Röntgen calificó como superior a sus propias radiografías.',
      'Un evento desafortunado privó a Tesla de la prioridad en el descubrimiento. El 13 de marzo de 1895, un incendio destruyó por completo su laboratorio de la calle Houston, consumiendo años de notas, prototipos, equipos de investigación y las placas fotográficas que documentaban sus experimentos con "radiaciones de sombra." Tesla estimó las pérdidas en más de 50,000 dólares de la época (equivalentes a aproximadamente 1.8 millones de dólares actuales). Sin esas pruebas documentales, no pudo reclamar prioridad cuando Röntgen publicó sus resultados nueve meses después.',
      'Tras conocer el anuncio de Röntgen, Tesla reanudó sus investigaciones sobre rayos X con intensidad. Descubrió algo que muchos otros investigadores ignoraban: que la radiación X era peligrosa. Documentó quemaduras en la piel, irritación ocular severa, pérdida de cabello y dolores de cabeza persistentes después de exposiciones prolongadas. En una carta dirigida a la revista Electrical Review en 1897, Tesla advirtió que "los experimentadores no deben exponerse innecesariamente a estas radiaciones" y recomendó el uso de protecciones de plomo, convirtiéndose en uno de los primeros científicos en proponer medidas de seguridad radiológica.',
      'Las contribuciones de Tesla a la imagen médica no se limitaron a los rayos X convencionales. Desarrolló mejoras en los tubos de vacío que permitían producir imágenes de mayor resolución a distancias más largas. También experimentó con fluoroscopia, la técnica de observar imágenes de rayos X en tiempo real sobre una pantalla fluorescente, y propuso el uso de espejos cóncavos para concentrar la radiación y reducir los tiempos de exposición. Estos principios fueron incorporados posteriormente en los equipos de diagnóstico médico que se utilizan en hospitales de todo el mundo hasta el día de hoy.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mark Twain y Nikola Tesla mantuvieron una amistad cercana durante más de una década. Twain visitaba con frecuencia el laboratorio de Tesla y participaba voluntariamente como sujeto de experimentación. En una ocasión, Tesla convenció a Twain de que se parara sobre una plataforma vibratoria que oscilaba a frecuencias específicas. Twain describió la experiencia como "profundamente vigorizante" durante los primeros minutos, pero después de aproximadamente 90 segundos, el efecto laxante de la vibración lo obligó a abandonar la plataforma a toda velocidad rumbo al baño más cercano.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los rayos X son radiación electromagnética con longitudes de onda entre 0.01 y 10 nanómetros, mucho más cortas que la luz visible (400-700 nanómetros). Esta longitud de onda corta les permite penetrar tejidos blandos pero ser absorbidos por materiales densos como el hueso y el metal. La energía de un fotón de rayos X típico en diagnóstico médico es de aproximadamente 60 keV (kiloelectronvoltios), unas 30,000 veces más energético que un fotón de luz visible. Tesla fue de los primeros en correlacionar la energía de esta radiación con sus efectos biológicos dañinos.' },
    ],
    fact: 'Tesla envió varias de sus "fotografías de sombra" a Röntgen en 1895, quien respondió con una carta de agradecimiento elogiando la calidad de las imágenes. En su respuesta, Röntgen escribió: "Las fotografías son muy interesantes. ¿Tendría la amabilidad de indicarme cómo las ha obtenido?" Esta correspondencia se conserva en el Museo Tesla de Belgrado, Serbia. Irónicamente, Tesla nunca publicó formalmente sus resultados en una revista científica con revisión por pares, que era el estándar para establecer prioridad científica. Röntgen sí lo hizo, enviando su artículo a la Sociedad Física-Médica de Würzburg el 28 de diciembre de 1895.',
  },
  {
    id: 'turbina-tesla',
    title: 'Turbina de Tesla',
    color: '#8A9AA6',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'En 1913, Nikola Tesla patentó un diseño radicalmente diferente de turbina: un motor sin álabes (patente US1,061,206). Mientras que las turbinas convencionales utilizan aspas curvadas para extraer energía de un fluido en movimiento, la turbina de Tesla emplea una serie de discos lisos paralelos, separados por espaciadores delgados, que giran dentro de una carcasa sellada. El fluido (vapor, gas o líquido) entra por la periferia de los discos y fluye en espiral hacia el centro, donde es expulsado a través de un orificio de escape.',
      'El principio que hace funcionar esta turbina es el efecto de capa límite (boundary layer effect), descrito por Ludwig Prandtl en 1904. Cuando un fluido se mueve sobre una superficie sólida, la capa de moléculas más cercana a la superficie se adhiere a ella debido a la viscosidad, creando fricción. En una turbina convencional, esta fricción es indeseable y se minimiza. Tesla invirtió el paradigma: en su diseño, la fricción es el mecanismo principal de transferencia de energía. Las moléculas del fluido arrastran los discos por adhesión viscosa, haciéndolos girar.',
      'Tesla construyó un prototipo que alcanzó 200 caballos de fuerza (HP) utilizando discos de 30 centímetros de diámetro. En pruebas realizadas en la planta de la Waterside Station de la New York Edison Company, la turbina demostró una velocidad de rotación de 16,000 revoluciones por minuto (RPM). Tesla afirmó que versiones optimizadas podrían alcanzar eficiencias superiores al 95%, aunque las pruebas independientes de la época registraron eficiencias cercanas al 40%, limitadas principalmente por los materiales metalúrgicos disponibles en 1913.',
      'La razón por la que la turbina de Tesla no fue adoptada comercialmente en su época se debe a limitaciones de la ciencia de materiales del siglo XX temprano. Los discos, sometidos a fuerzas centrífugas a altas RPM y temperaturas elevadas, se deformaban y perdían su espaciado preciso, reduciendo la eficiencia. Los aceros disponibles en 1913 no podían resistir las condiciones operativas que el diseño requería. Con los materiales modernos — aleaciones de titanio, cerámicas avanzadas, fibra de carbono — estas limitaciones se han superado en gran medida.',
      'En el siglo XXI, la turbina de Tesla ha experimentado un resurgimiento notable. Investigadores del Instituto de Tecnología de Georgia publicaron en 2010 un estudio demostrando que microturbinas basadas en el diseño de Tesla pueden alcanzar eficiencias del 25% en escalas de pocos centímetros, superando a las microturbinas convencionales en ese rango de tamaño. Empresas como Nikola Labs y Tesla Turbine Technologies desarrollan versiones modernas para aplicaciones geotérmicas, recuperación de energía de gases de escape y bombeo de fluidos viscosos como petróleo crudo y aguas residuales, donde la ausencia de álabes elimina el problema del desgaste mecánico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla describió su turbina sin álabes como "mi invento más valioso." En una carta de 1911 dirigida a su amigo Robert Underwood Johnson, editor de la revista Century, Tesla escribió que la turbina haría obsoletos todos los motores de combustión interna existentes. Aunque esta predicción no se cumplió en su época, los principios de la turbina de Tesla se aplican hoy en bombas de sangre para pacientes con insuficiencia cardíaca. El flujo laminar que producen los discos lisos causa menos daño a los glóbulos rojos que las bombas centrífugas convencionales con aspas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El número de Reynolds (Re) determina si un fluido se comporta de manera laminar (ordenada) o turbulenta (caótica). La turbina de Tesla funciona óptimamente en el rango de Reynolds entre 10 y 1,000, donde el flujo es laminar y la transferencia de energía por viscosidad es máxima. A números de Reynolds más altos, el flujo se vuelve turbulento y la eficiencia disminuye. Esta es la razón por la que la turbina de Tesla es más eficiente que las turbinas convencionales en aplicaciones de pequeña escala y con fluidos viscosos, pero menos eficiente en turbinas industriales de gran tamaño.' },
    ],
    fact: 'La turbina sin álabes de Tesla tiene una ventaja única en aplicaciones biomédicas: al carecer de aspas cortantes, puede bombear fluidos biológicos sin dañar células ni proteínas. En 2012, investigadores del Hospital Universitario de Aquisgrán, Alemania, publicaron en la revista Artificial Organs un estudio que demostró que una bomba basada en el diseño de Tesla destruía un 70% menos de glóbulos rojos que las bombas centrífugas convencionales utilizadas en máquinas de circulación extracorpórea durante cirugías cardíacas. Este hallazgo ha impulsado el desarrollo de dispositivos de asistencia ventricular de nueva generación.',
  },
  {
    id: 'rayo-de-la-muerte',
    title: 'El Rayo de la Muerte',
    color: '#B88420',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'En julio de 1934, el día de su cumpleaños número 78, Nikola Tesla concedió una entrevista al New York Times en la que anunció que había concebido un arma defensiva capaz de derribar flotas enteras de aviones a una distancia de 400 kilómetros. Tesla denominó a este concepto "Teleforce" y lo describió como un generador de haces de partículas capaz de proyectar microscópicas partículas de tungsteno a velocidades cercanas a la de la luz. Los titulares de la prensa lo bautizaron inmediatamente como "el rayo de la muerte," un nombre que Tesla rechazó por considerarlo sensacionalista e inexacto.',
      'El diseño técnico de Teleforce, según la documentación que Tesla preparó para posibles compradores gubernamentales, constaba de cuatro componentes principales: un generador electrostático de alto voltaje tipo Van de Graaff para producir el potencial necesario; un mecanismo para generar y dirigir el haz de partículas; un tubo de vacío sellado con un sistema de bombeo diferencial para mantener el vacío a pesar de la abertura del haz; y un sistema óptico para enfocar y apuntar el arma. Tesla estimó el costo de construcción de una unidad defensiva en aproximadamente 2 millones de dólares de 1934.',
      'Tesla ofreció los planos de Teleforce a varios gobiernos. Escribió cartas al Departamento de Guerra de Estados Unidos, al gobierno británico, a la Unión Soviética y a la Liga de las Naciones. Su argumento no era ofensivo sino defensivo: creía que si todas las naciones poseyeran esta tecnología, la guerra aérea se volvería inviable y, por lo tanto, la paz mundial estaría garantizada. Este razonamiento anticipó la doctrina de destrucción mutua asegurada (MAD) que surgió durante la Guerra Fría con las armas nucleares, aunque aplicada a un arma de energía dirigida.',
      'La comunidad científica de la época recibió las declaraciones de Tesla con escepticismo. Los físicos señalaron que las partículas cargadas se dispersarían rápidamente en la atmósfera debido a la repulsión electrostática mutua, haciendo inviable un haz coherente a distancias de cientos de kilómetros. Sin embargo, los principios subyacentes de Teleforce eran científicamente válidos: los aceleradores de partículas modernos, como el Gran Colisionador de Hadrones (LHC) del CERN, utilizan campos electromagnéticos para acelerar partículas a velocidades cercanas a la de la luz dentro de tubos de vacío, siguiendo los mismos principios que Tesla describió.',
      'Tras la muerte de Tesla el 7 de enero de 1943, agentes del gobierno estadounidense confiscaron sus documentos personales de la habitación 3327 del Hotel New Yorker. El FBI, bajo la dirección de J. Edgar Hoover, encargó al físico John G. Trump — profesor del MIT y tío del futuro presidente Donald Trump — la evaluación de los papeles de Tesla. El informe de Trump, desclasificado en 2016, concluyó que los documentos contenían "ideas especulativas y filosóficas" pero ningún diseño funcional completo para un arma de haz de partículas. No obstante, el gobierno clasificó varios documentos como secretos, alimentando décadas de teorías sobre la posible viabilidad de Teleforce.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante la Guerra Fría, tanto Estados Unidos como la Unión Soviética desarrollaron programas de armas de energía dirigida parcialmente inspirados en los conceptos de Tesla. El programa estadounidense SDI (Strategic Defense Initiative), apodado "Star Wars" por los medios en 1983, incluía propuestas de satélites armados con láseres y aceleradores de partículas para destruir misiles balísticos soviéticos en vuelo. Aunque el programa nunca se implementó completamente, produjo avances en tecnología láser que se utilizan hoy en sistemas como el AN/SEQ-3 de la Armada de Estados Unidos, un láser de estado sólido de 150 kilovatios instalado en el destructor USS Portland.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un acelerador de partículas como el LHC del CERN acelera protones a 6.5 TeV (teraelectronvoltios), alcanzando el 99.9999991% de la velocidad de la luz. A esta velocidad, un protón completa el circuito de 27 kilómetros del LHC 11,245 veces por segundo. Sin embargo, la energía total de un haz del LHC es de aproximadamente 362 megajulios, equivalente a la energía cinética de un tren de 400 toneladas viajando a 150 km/h. Tesla imaginó un sistema similar pero transportable, algo que sigue siendo técnicamente inviable con la tecnología actual debido al tamaño y la potencia requeridos.' },
    ],
    fact: 'Los documentos confiscados a Tesla tras su muerte sumaban aproximadamente 80 baúles con notas, diagramas y correspondencia. Después de la evaluación de John G. Trump, el gobierno entregó los documentos al Museo Tesla en Belgrado, Serbia, en 1952, tras la intervención del sobrino de Tesla, Sava Kosanović, entonces embajador de Yugoslavia en Estados Unidos. Sin embargo, investigadores han documentado que al menos un cuaderno de notas y varios sobres sellados no fueron devueltos y permanecen clasificados. La solicitud de desclasificación bajo la Ley de Libertad de Información (FOIA) presentada en 2018 reveló que el FBI mantiene un archivo de Tesla de 361 páginas, de las cuales 64 permanecen total o parcialmente censuradas por razones de seguridad nacional.',
  },
  {
    id: 'patentes-legado',
    title: 'Patentes que Cambiaron el Mundo',
    color: '#5A6B7A',
    btnImage: '/assets/tesla/tesla_m5.png',
    image: '/assets/tesla/tesla_m5.png',
    content: [
      'A lo largo de su carrera, Nikola Tesla obtuvo más de 300 patentes registradas en 26 países diferentes. Solo en Estados Unidos, se le concedieron 112 patentes que cubren desde motores eléctricos y generadores hasta sistemas de iluminación, radio, control remoto y transmisión de energía. En conjunto, estas patentes sentaron las bases tecnológicas para la distribución eléctrica moderna, las telecomunicaciones inalámbricas y la automatización industrial. La Oficina de Patentes de Estados Unidos mantiene un archivo digital completo de las patentes de Tesla, que pueden consultarse a través de su sistema en línea.',
      'La patente más influyente de Tesla es probablemente la US381,968 (1888), que describe el motor de inducción de corriente alterna basado en el campo magnético rotativo. Este principio, que Tesla concibió durante un paseo por el parque Városliget de Budapest en febrero de 1882, permite convertir energía eléctrica en energía mecánica sin necesidad de conmutadores ni escobillas. Los motores de inducción derivados de esta patente mueven hoy aproximadamente el 45% de toda la electricidad consumida a nivel mundial, según la Agencia Internacional de Energía (IEA), desde ventiladores y refrigeradores hasta trenes de alta velocidad y cadenas de montaje industrial.',
      'George Westinghouse adquirió las patentes de corriente alterna de Tesla en 1888 por un total de 60,000 dólares en efectivo (equivalentes a aproximadamente 2 millones de dólares actuales) más regalías de 2.50 dólares por cada caballo de fuerza de electricidad vendida. Cuando Westinghouse enfrentó dificultades financieras durante la crisis económica de 1890-1893, Tesla renunció voluntariamente a sus regalías para salvar la empresa y, con ella, el sistema de corriente alterna. Se estima que esas regalías habrían valido más de 12,000 millones de dólares actuales, lo que habría convertido a Tesla en una de las personas más ricas de la historia.',
      'Las patentes de Tesla cubren tecnologías que tardaron décadas en ser desarrolladas comercialmente. La patente US1,119,732 (1914) describe un sistema de transmisión de energía inalámbrica que anticipa los cargadores inductivos que utilizamos hoy para teléfonos móviles. La patente US685,012 (1901) detalla un sistema para aprovechar la energía radiante de fuentes naturales, un concepto que guarda relación con las antenas rectificadoras (rectennas) que se investigan actualmente para captar energía de microondas transmitida desde satélites solares en órbita.',
      'El legado de Tesla se mide no solo en patentes sino en el impacto acumulado de sus ideas sobre la civilización tecnológica. La unidad de medida del campo magnético en el Sistema Internacional de Unidades lleva su nombre: el tesla (T), adoptado en 1960 por la Conferencia General de Pesos y Medidas. Un tesla equivale a un weber por metro cuadrado. Para referencia, el campo magnético de la Tierra en su superficie es de aproximadamente 50 microteslas (0.00005 T), mientras que una máquina de resonancia magnética (MRI) médica opera a 1.5-3 teslas, y el LHC del CERN utiliza electroimanes de 8.3 teslas para dirigir los haces de protones.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla murió en la pobreza el 7 de enero de 1943, en la habitación 3327 del Hotel New Yorker de Manhattan, a la edad de 86 años. A pesar de haber generado tecnologías con un valor acumulado de billones de dólares, sus últimos años los pasó alimentando palomas en el parque Bryant y en la catedral de San Patricio. Tesla tenía un vínculo particular con una paloma blanca a la que describió como "la razón de mi vida." Cuando la paloma murió, Tesla declaró: "Algo salió de mis ojos. Una luz, una luz real y poderosa." Nunca se recuperó de la pérdida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El motor de inducción de Tesla opera mediante un campo magnético rotativo generado por desfases en corrientes alternas polifásicas. En un motor trifásico, tres bobinas separadas 120 grados generan campos magnéticos que rotan a la frecuencia de la línea (50 Hz en Europa, 60 Hz en América). El rotor, que no tiene conexión eléctrica externa, se magnetiza por inducción y gira siguiendo al campo rotativo, siempre a una velocidad ligeramente menor (denominada deslizamiento). Esta diferencia de velocidad, típicamente del 2-5%, es necesaria para mantener la inducción. El diseño es tan robusto que motores industriales basados en este principio pueden operar continuamente durante 20-30 años sin mantenimiento.' },
    ],
    fact: 'El 10 de julio, fecha del nacimiento de Nikola Tesla en 1856 en Smiljan, Croacia (entonces Imperio Austríaco), ha sido declarado Día de Nikola Tesla en varios países y estados. En 2003, Elon Musk cofundó Tesla Motors (ahora Tesla, Inc.) en homenaje al inventor. La empresa, valorada en más de 800,000 millones de dólares en 2024, utiliza motores de inducción de corriente alterna directamente derivados de las patentes de Tesla de 1888 en varios de sus modelos de vehículos eléctricos. La historia completa ha cerrado un círculo: la tecnología que Tesla inventó hace más de 135 años impulsa hoy la revolución del transporte eléctrico.',
  },
];

// ─── Electric Particle Field (Canvas Background) ────────────────────────────
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

// ─── Tesla Inventions Header ─────────────────────────────────────────────────
function TeslaHeader() {
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
        {/* Central lightning icon */}
        <path d="M304 18 L296 32 L302 32 L294 44 L310 28 L304 28 Z" fill="#D4A535" opacity="0.6" stroke="#D4A535" strokeWidth="1" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">INVENTOS OLVIDADOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL LEGADO OCULTO DE NIKOLA TESLA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ─────────────────────────────
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
          layoutId="activeDotTeslaM5"
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

        {/* ─── Video Section ─── */}
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #6B7B8A, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_TeslaM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,12,25,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/tesla/tesla_m5.png)',
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

      <TeslaHeader />

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
              🏆 ¡Has descubierto todos los inventos olvidados de Tesla!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Inventor de la Radio
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
