'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ━━━ SVG Decorative Elements (Tesla / Electricity themed) ━━━━━━━━━━━━━━━━━━━━
function DecoLightningBolt({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M34 4 L20 28 L28 28 L18 56 L44 24 L34 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="14" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="46" cy="12" r="1" fill={color} opacity="0.4" />
      <circle cx="50" cy="38" r="1.5" fill={color} opacity="0.5" />
      <circle cx="10" cy="42" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M16 12 Q10 18 14 24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M44 34 Q50 40 46 46" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCoilSvg({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tesla coil base */}
      <rect x="24" y="44" width="12" height="10" rx="2" fill={color} opacity="0.3" />
      <rect x="26" y="38" width="8" height="8" rx="1" fill={color} opacity="0.25" />
      {/* Coil windings */}
      <ellipse cx="30" cy="34" rx="10" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="28" rx="8" ry="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
      <ellipse cx="30" cy="22" rx="6" ry="2" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <ellipse cx="30" cy="16" rx="4" ry="1.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.55" />
      {/* Top discharge */}
      <circle cx="30" cy="10" r="3" fill={color} opacity="0.4" />
      <line x1="30" y1="7" x2="24" y2="2" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="7" x2="36" y2="2" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="7" x2="30" y2="1" stroke={color} strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}

function DecoGearSvg({ size = 60, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.3" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 30 + 10 * Math.cos(rad);
        const y1 = 30 + 10 * Math.sin(rad);
        const x2 = 30 + 15 * Math.cos(rad);
        const y2 = 30 + 15 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoBrainSvg({ size = 60, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized brain outline */}
      <path d="M30 52 C20 48 10 40 10 28 C10 16 18 8 28 8 C32 8 34 10 34 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M30 52 C40 48 50 40 50 28 C50 16 42 8 32 8 C28 8 26 10 26 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Central fissure */}
      <path d="M30 12 C30 20 30 40 30 48" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Neural connections */}
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.4" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.4" />
      <circle cx="20" cy="34" r="1.5" fill={color} opacity="0.35" />
      <circle cx="40" cy="34" r="1.5" fill={color} opacity="0.35" />
      <line x1="22" y1="24" x2="38" y2="24" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="20" y1="34" x2="40" y2="34" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoChurchSvg({ size = 70, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Church steeple */}
      <polygon points="30,6 22,22 38,22" fill={color} opacity="0.25" />
      <rect x="22" y="22" width="16" height="24" fill={color} opacity="0.2" />
      {/* Cross on top */}
      <line x1="30" y1="2" x2="30" y2="8" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="27" y1="4" x2="33" y2="4" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Door */}
      <path d="M26 46 L26 36 Q30 32 34 36 L34 46" fill={color} opacity="0.3" />
      {/* Base */}
      <rect x="16" y="46" width="28" height="4" rx="1" fill={color} opacity="0.2" />
      {/* Window */}
      <circle cx="30" cy="28" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoShipSvg({ size = 80, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ship hull */}
      <path d="M10 30 L15 35 L65 35 L70 30 L60 22 L20 22 Z" fill={color} opacity="0.25" />
      {/* Mast */}
      <line x1="40" y1="6" x2="40" y2="22" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Sail */}
      <path d="M42 8 L55 18 L42 20 Z" fill={color} opacity="0.2" />
      <path d="M38 8 L25 18 L38 20 Z" fill={color} opacity="0.15" />
      {/* Waves */}
      <path d="M5 36 Q15 32 25 36 Q35 40 45 36 Q55 32 65 36 Q70 38 75 36" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Smoke stack */}
      <rect x="48" y="16" width="4" height="6" fill={color} opacity="0.3" />
      <path d="M49 16 Q52 12 50 8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'smiljan-1856': [DecoLightningBolt, DecoChurchSvg, DecoCoilSvg],
  'pequeno-inventor': [DecoGearSvg, DecoBrainSvg, DecoLightningBolt],
  'tragedia-dane': [DecoChurchSvg, DecoLightningBolt, DecoBrainSvg],
  'anos-estudio': [DecoCoilSvg, DecoGearSvg, DecoLightningBolt],
  'viaje-america': [DecoShipSvg, DecoLightningBolt, DecoCoilSvg],
  'mente-tesla': [DecoBrainSvg, DecoCoilSvg, DecoGearSvg],
  'legado-infancia': [DecoLightningBolt, DecoGearSvg, DecoBrainSvg],
};

// ━━━ Content Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'Cheney, M. (2001). Tesla: Man Out of Time, Touchstone / Simon & Schuster',
  'Tesla, N. (1919). My Inventions: The Autobiography of Nikola Tesla, Electrical Experimenter Magazine',
  'Seifer, M.J. (1998). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'smiljan-1856',
    title: 'Smiljan, 1856',
    color: '#6B7B8A',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_smiljan-1856.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_smiljan-1856.jpg',
    content: [
      'Nikola Tesla nació exactamente a la medianoche entre el 9 y el 10 de julio de 1856, durante una tormenta eléctrica, en Smiljan, un pueblo de unas 400 personas situado en la región de Lika, dentro del Imperio Austrohúngaro (hoy Croacia). Según el registro parroquial de la Iglesia Ortodoxa Serbia de Smiljan, el parto fue atendido por una partera local que, al ver los rayos iluminar la habitación, declaró que el niño traería oscuridad. Su madre, Đuka Mandić, respondió con una frase que se convertiría en profecía: «No, será un hijo de la luz». La casa de nacimiento, una modesta vivienda de piedra junto a la iglesia, fue reconstruida en 2006 como museo memorial.',
      'Su padre, Milutin Tesla (1819–1879), servía como sacerdote de la Iglesia Ortodoxa Serbia y también escribía artículos sobre temas sociales para periódicos locales. Milutin dominaba varios idiomas y poseía una biblioteca considerable para la época. Su madre, Đuka Mandić (1822–1892), aunque sin educación formal, era reconocida en la comunidad por su capacidad para memorizar poemas heroicos serbios y por crear herramientas artesanales para el hogar. Nikola siempre atribuyó su capacidad inventiva a la herencia materna, señalando que ella construía instrumentos domésticos con sus propias manos.',
      'La familia Tesla estaba compuesta por cinco hijos: Dane (el mayor), Angelina, Milka, Nikola y Marica. Smiljan se encontraba en la Frontera Militar del Imperio Austrohúngaro, una zona creada como barrera defensiva contra el Imperio Otomano. Los serbios de esta región servían como soldados fronterizos a cambio de tierras y cierta autonomía religiosa. Este contexto militar y cultural marcó la educación de Nikola, que aprendió disciplina, resistencia y la importancia de la comunidad desde temprana edad.',
      'La iglesia ortodoxa donde predicaba Milutin Tesla se encontraba a escasos metros de la casa familiar. Nikola creció inmerso en los rituales, cantos y tradiciones de la iglesia serbia. Las campanas de la iglesia marcaban cada hora del día, y el joven Tesla desarrolló una sensibilidad particular a los sonidos y vibraciones que lo acompañaría toda su vida. El paisaje montañoso de Lika, con sus bosques de pinos y arroyos cristalinos, proporcionaba el escenario natural donde el niño comenzó a observar y experimentar con los fenómenos de la naturaleza.',
      'El clima de la región de Lika es continental, con inviernos severos que pueden alcanzar los -20°C y veranos templados. Las tormentas eléctricas son habituales durante el verano en esta zona montañosa de los Alpes Dináricos. Tesla recordaba en su autobiografía de 1919 que las tormentas de su infancia despertaron su primera curiosidad por la electricidad. Observaba los rayos caer sobre los picos cercanos y se preguntaba qué fuerza los producía. Esta curiosidad temprana, nacida entre montañas y relámpagos, sembró la semilla de una vida dedicada a comprender y controlar la energía eléctrica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Smiljan tenía apenas 400 habitantes cuando Tesla nació en 1856. La casa de la familia Tesla fue destruida durante la Segunda Guerra Mundial y reconstruida en 2006 por el gobierno croata como parte del Memorial Center Nikola Tesla. El centro incluye la casa reconstruida, la iglesia ortodoxa original y una réplica funcional de la bobina Tesla que lanza descargas eléctricas reales para los visitantes. El pueblo fue declarado zona de patrimonio cultural protegido en 2008 por el Ministerio de Cultura de Croacia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La tormenta eléctrica durante el nacimiento de Tesla no fue una coincidencia: la región de Lika, situada entre los Alpes Dináricos, experimenta un promedio de 40 a 50 días con tormentas eléctricas al año, especialmente durante los meses de verano. Los rayos se producen cuando las cargas eléctricas positivas y negativas se separan dentro de las nubes cumulonimbus. Un rayo típico transporta una corriente de 30,000 amperios y alcanza una temperatura de 30,000 Kelvin, cinco veces más caliente que la superficie del Sol.' },
    ],
    fact: 'El registro original del nacimiento de Tesla se conserva en los archivos de la Iglesia Ortodoxa Serbia en Smiljan. El documento, escrito en cirílico serbio, registra su nombre como «Nikola», su fecha de nacimiento como el 10 de julio de 1856 según el calendario gregoriano (28 de junio según el calendario juliano entonces usado por la iglesia), y a sus padres como Milutin Tesla y Đuka Mandić. Este registro se ha verificado por múltiples historiadores, incluyendo W. Bernard Carlson en su biografía de 2013 publicada por Princeton University Press.',
  },
  {
    id: 'pequeno-inventor',
    title: 'El Pequeño Inventor',
    color: '#D4A535',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_pequeno-inventor.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_pequeno-inventor.jpg',
    content: [
      'Desde los cinco años, Nikola Tesla mostraba una compulsión por construir mecanismos. En su autobiografía "My Inventions" (1919), Tesla describe su primer invento: un pequeño motor accionado por escarabajos de junio (Phyllophaga). Pegó cuatro de estos insectos a las aspas de una pequeña rueda con goma vegetal. Cuando los escarabajos batían sus alas, la rueda giraba con fuerza suficiente para hacer funcionar un mecanismo rudimentario. El dispositivo funcionó hasta que un compañero de juegos comió uno de los escarabajos, evento que provocó en Nikola una repulsión permanente hacia los insectos.',
      'Tesla construyó también una espada de madera con la que imitaba las batallas de los poemas heroicos serbios que su madre recitaba. Fabricó un arco y flechas que funcionaban con precisión y una honda calibrada que usaba para cazar ranas. Su proyecto más ambicioso de infancia fue construir un dispositivo para volar: después de observar que un paraguas abierto reducía la velocidad de caída, saltó desde el techo de un granero sosteniendo un paraguas. El resultado fue una caída violenta que lo dejó inconsciente durante varias horas y en cama durante semanas.',
      'Otra invención temprana fue una trampa para atrapar pájaros hecha con ramas y cuerdas. Nikola diseñó un mecanismo de resorte que cerraba la jaula cuando el pájaro tocaba un cebo colocado en el centro. También construyó pequeñas turbinas de agua que colocaba en los arroyos cercanos a Smiljan, observando cómo la corriente de agua podía generar movimiento mecánico. Este principio básico — convertir el flujo de un medio natural en rotación — sería la base conceptual de muchos de sus inventos adultos, incluyendo la turbina sin paletas que patentó en 1913.',
      'La capacidad de visualización mental de Tesla ya se manifestaba en su infancia. Según su propia descripción, podía imaginar objetos tridimensionales con tal claridad que a veces no distinguía entre lo imaginado y lo real. Cuando pensaba en una palabra, la imagen del objeto aparecía ante sus ojos con nitidez fotográfica. Podía «girar» mentalmente estos objetos, examinarlos desde distintos ángulos e incluso probar su funcionamiento en su imaginación antes de construirlos. Esta habilidad, que él llamaba su «método de visualización», le permitía diseñar máquinas completas sin necesidad de planos.',
      'Entre los seis y los ocho años, Tesla experimentaba con mecanismos cada vez más complejos. Desarmaba los relojes de la casa para estudiar sus engranajes, construía molinos de viento en miniatura con hojas de maíz y fabricaba pistolas de aire comprimido con tubos de bambú. Su madre, Đuka, lejos de reprenderlo, lo animaba proporcionándole materiales y espacio para experimentar. Tesla escribió años después que su madre fue «la primera ingeniera que conocí», pues ella misma diseñaba y construía utensilios para el hogar, incluyendo un batidor mecánico y un telar modificado que mejoraba la producción de tela.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El motor de escarabajos de junio de Tesla no era un juguete cualquiera: anticipaba el concepto moderno de bio-mimetismo, donde los ingenieros estudian mecanismos biológicos para crear tecnología. El vuelo de los escarabajos de junio genera una fuerza de sustentación de aproximadamente 0.5 gramos por insecto. Con cuatro escarabajos, el pequeño motor de Tesla producía cerca de 2 gramos de empuje, suficiente para hacer girar una rueda liviana. Hoy, investigadores del MIT estudian el vuelo de insectos para diseñar micro-drones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La memoria eidética, que Tesla describía como la capacidad de «fotografiar» mentalmente páginas enteras de texto y objetos tridimensionales, es un fenómeno neurológico documentado pero poco común. Los estudios de neurociencia indican que menos del 5% de los niños y menos del 1% de los adultos poseen alguna forma de memoria eidética. El fenómeno está asociado con una activación intensificada de la corteza visual primaria (área V1) del cerebro, que mantiene la información visual activa por períodos prolongados.' },
    ],
    fact: 'Tesla describió en "My Inventions" (1919) que su capacidad de visualización era tan intensa que a veces sufría «destellos de luz» que interferían con su visión normal. Los neurocientíficos modernos han identificado este fenómeno como «fotismo», una forma de sinestesia donde la estimulación mental produce percepciones visuales involuntarias. Investigadores de la Universidad de Sussex publicaron en 2018 que estas experiencias están correlacionadas con conexiones neuronales reforzadas entre la corteza prefrontal y las áreas visuales del cerebro, lo que podría explicar la creatividad técnica de Tesla.',
  },
  {
    id: 'tragedia-dane',
    title: 'La Tragedia de Dane',
    color: '#7A8B96',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_tragedia-dane.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_tragedia-dane.jpg',
    content: [
      'El evento más traumático de la infancia de Tesla ocurrió cuando tenía siete años: la muerte de su hermano mayor, Dane Tesla. Dane, cinco años mayor que Nikola, era considerado el hijo prodigio de la familia. Su padre Milutin lo describía como un genio con un talento natural para las matemáticas y la retórica. Según los relatos familiares, Dane superaba a Nikola en todas las áreas académicas y sociales. La muerte de Dane ocurrió tras un accidente con el caballo de la familia, un animal árabe de nombre desconocido, cuando el joven fue arrojado de la montura.',
      'Las circunstancias exactas del accidente siguen siendo objeto de debate entre los historiadores. En una versión, el caballo se encabritó y arrojó a Dane. En otra, referida por Tesla en cartas posteriores, Dane resbaló en una pendiente y cayó sobre rocas. El biógrafo W. Bernard Carlson señala que existe una tercera versión en la que el propio Tesla, entonces un niño pequeño, podría haber asustado al caballo sin intención. Independientemente de la causa exacta, Dane sufrió heridas internas graves y murió poco después. La fecha precisa no se ha establecido con certeza, pero se sitúa alrededor de 1863.',
      'La muerte de Dane tuvo consecuencias profundas en el desarrollo psicológico de Nikola. El niño comenzó a experimentar visiones involuntarias y perturbadoras. En su autobiografía, Tesla relata que veía destellos de luz cegadores acompañados de imágenes detalladas de objetos y escenas. Estos episodios, que los psicólogos modernos clasificarían como fenómenos disociativos o formas de sinestesia intensificada por el trauma, lo atormentaban pero también estimulaban su imaginación técnica. Tesla aprendió gradualmente a controlar estas visiones y a canalizarlas hacia la invención.',
      'Tras la muerte de Dane, la familia se trasladó a Gospić, una ciudad más grande situada a unos 6 kilómetros de Smiljan. Milutin Tesla fue asignado a la parroquia local, y Nikola ingresó en la escuela primaria de Gospić. El cambio de ambiente fue significativo: de un pueblo rural de 400 personas a una ciudad de varios miles. En Gospić, Tesla accedió a una biblioteca más amplia y a profesores con formación universitaria. Sin embargo, la sombra de Dane persistía. Nikola sentía que debía compensar la pérdida de su hermano sobresaliendo académicamente, una presión autoimpuesta que lo impulsó a estudiar con intensidad.',
      'La enfermedad que casi le cuesta la vida llegó años después, a los 17 años, cuando Tesla contrajo cólera durante una epidemia en la región. Estuvo postrado durante nueve meses, con episodios de fiebre alta y deshidratación severa. Los médicos de la época tenían recursos limitados contra el cólera, causado por la bacteria Vibrio cholerae. Su padre Milutin, que inicialmente quería que Nikola siguiera la carrera sacerdotal, le prometió durante la enfermedad que si sobrevivía lo enviaría a la mejor escuela de ingeniería. Esta promesa, hecha junto al lecho del enfermo, cambió la trayectoria de Tesla y, con ella, la historia de la tecnología eléctrica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla nunca superó del todo la muerte de su hermano Dane. En su autobiografía de 1919, escrita más de 50 años después del accidente, Tesla dedicó varios párrafos a recordar los talentos de Dane y a expresar que nada de lo que él logró pudo igualar lo que su hermano habría conseguido. Esta comparación constante con un hermano idealizado es un patrón psicológico que los terapeutas modernos denominan «duelo complicado por idealización del fallecido». La presión que Tesla se impuso moldeó su ética de trabajo durante toda su vida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El cólera que casi mató a Tesla a los 17 años es causado por la bacteria Vibrio cholerae. La enfermedad se transmite a través de agua contaminada y provoca diarrea severa que puede causar deshidratación mortal en horas. En el siglo XIX, las epidemias de cólera mataban a entre el 40% y el 60% de los infectados. En 1854, el médico John Snow demostró en Londres que el cólera se transmitía por el agua, no por el aire, al rastrear casos hasta una bomba de agua contaminada en Broad Street, estableciendo las bases de la epidemiología moderna.' },
    ],
    fact: 'La familia Tesla se mudó de Smiljan a Gospić tras la muerte de Dane, y Nikola asistió al Real Gymnasium de Gospić entre 1870 y 1873. Los registros escolares, conservados en los archivos de la ciudad, muestran que Tesla completó el programa de cuatro años en solo tres, destacando en matemáticas y física. Su profesor de física, Martin Sekulić, realizaba demostraciones experimentales que cautivaban al joven Tesla, incluyendo el uso de una botella de Leyden (un condensador primitivo inventado en 1745 en la Universidad de Leyden) para almacenar y descargar electricidad estática.',
  },
  {
    id: 'anos-estudio',
    title: 'Los Años de Estudio',
    color: '#C49225',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_anos-estudio.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_anos-estudio.jpg',
    content: [
      'En 1875, Nikola Tesla ingresó en la Escuela Politécnica de Graz (actual Universidad Técnica de Graz), en Austria, gracias a una beca de la Frontera Militar. Durante su primer año, asistía a clases desde las 3 de la mañana hasta las 11 de la noche, aprobando nueve exámenes (el doble de lo requerido) con las calificaciones más altas posibles. El decano de la facultad escribió una carta al padre de Tesla expresando que su hijo era «una estrella de primera magnitud». Sin embargo, en su segundo año, Tesla desarrolló una adicción al juego de cartas y billar que casi destruyó su carrera académica.',
      'Fue en Graz donde Tesla vio por primera vez un generador Gramme de corriente continua, operado por su profesor Jakob Pöschl. El dispositivo usaba escobillas de grafito para mantener el contacto eléctrico con el rotor giratorio, produciendo chispas constantes y pérdidas de energía. Tesla sugirió en clase que se podría eliminar las escobillas usando corriente alterna en lugar de continua. El profesor Pöschl dedicó toda una clase a explicar por qué la idea de Tesla era un «sueño perpetuo, una imposibilidad mecánica». Esta humillación pública, lejos de desanimarlo, fijó el problema en la mente de Tesla como una obsesión que duraría años.',
      'Tras abandonar Graz sin graduarse (un hecho que ocultó a su familia durante años), Tesla se trasladó a Budapest en 1881 para trabajar en la Compañía Nacional de Teléfonos de Hungría. Allí conoció a Anthony Szigety, un ingeniero mecánico que se convertiría en su amigo cercano. Tesla atravesó un periodo de crisis nerviosa en Budapest: sus sentidos se agudizaron hasta niveles dolorosos. Podía escuchar un reloj a tres habitaciones de distancia, sentía las vibraciones del tráfico en la calle a través del suelo, y la luz del sol le producía dolor físico.',
      'La solución al motor de corriente alterna llegó durante un paseo vespertino por el Parque de la Ciudad (Városliget) de Budapest en febrero de 1882. Tesla caminaba con Szigety mientras recitaba un pasaje del «Fausto» de Goethe. En ese momento, según su relato, la imagen completa de un campo magnético giratorio apareció en su mente con total claridad. Tomó una rama y dibujó en la arena los diagramas de lo que sería el motor de inducción polifásico. No se trataba de una idea vaga: Tesla visualizó el motor con sus dimensiones, materiales y funcionamiento exactos, como si estuviera viendo un plano técnico proyectado en su mente.',
      'El campo magnético giratorio que Tesla concibió en el parque de Budapest funciona mediante corrientes alternas desfasadas que alimentan bobinas distribuidas alrededor del motor. Cada par de bobinas genera un campo magnético que se desplaza como una onda, creando un efecto de rotación sin necesidad de contacto mecánico. Este principio eliminaba las escobillas del generador Gramme y resolvía el problema que el profesor Pöschl había declarado irresoluble. Tesla pasó los siguientes seis años refinando esta idea antes de poder construir un prototipo funcional, pero el concepto fundamental nunca cambió respecto a la visión original de aquel paseo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El verso del «Fausto» de Goethe que Tesla recitaba cuando concibió el motor de corriente alterna era: «El resplandor se retira, el día ya vivido queda atrás. Se apresura hacia allí, promoviendo nueva vida. Ah, que ninguna ala me eleve de la tierra para seguirlo siempre, siempre». Tesla consideraba este momento como el más importante de su vida. El Parque de la Ciudad de Budapest todavía existe y se ha colocado un banco conmemorativo cerca del lugar donde Tesla habría tenido esta revelación, identificado gracias a sus descripciones autobiográficas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El motor de inducción polifásico de Tesla funciona gracias al principio del campo magnético giratorio. Dos o más corrientes alternas desfasadas entre sí (típicamente 120° en un sistema trifásico) alimentan bobinas distribuidas simétricamente. El resultado es un campo magnético que rota a una velocidad sincronizada con la frecuencia de la corriente (por ejemplo, 3,600 RPM a 60 Hz con dos polos). Este campo induce corrientes en el rotor por la ley de Faraday, generando un par motor sin contacto físico. El 90% de los motores eléctricos del mundo actual usan este principio.' },
    ],
    fact: 'La Escuela Politécnica de Graz conserva los registros de calificaciones de Tesla de su primer año (1875-1876). Estos documentos muestran que obtuvo la nota máxima en todas las materias: física, matemáticas, mecánica analítica y geometría descriptiva. Sin embargo, no existen registros de que Tesla completara su programa. El profesor Jakob Pöschl, quien ridiculizó la idea de Tesla sobre la corriente alterna, murió en 1884 sin saber que su antiguo alumno había resuelto el problema exacto que él declaró irresoluble. El motor de inducción de Tesla fue patentado en 1888 (patente US 381,968).',
  },
  {
    id: 'viaje-america',
    title: 'El Viaje a América',
    color: '#8A9AA6',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_viaje-america.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_viaje-america.jpg',
    content: [
      'Antes de llegar a Estados Unidos, Tesla trabajó en París para la Continental Edison Company entre 1882 y 1884. Su supervisor, Charles Batchelor, era el socio más cercano de Thomas Edison en Europa. Tesla fue asignado a instalar sistemas de iluminación eléctrica en ciudades europeas, incluyendo Estrasburgo, donde aprovechó para construir su primer prototipo de motor de corriente alterna con materiales que reunió por su cuenta. El motor funcionó exactamente como lo había visualizado en el parque de Budapest dos años antes. Batchelor quedó tan convencido del talento de Tesla que le escribió una carta de recomendación para Edison.',
      'La carta de Batchelor a Edison es uno de los documentos más citados en la historia de la tecnología. Según la tradición, decía: «Conozco a dos grandes hombres y usted es uno de ellos; el otro es este joven». No se ha encontrado el original de esta carta, pero Tesla la mencionó en múltiples entrevistas entre 1890 y 1915, y el biógrafo Marc Seifer la documenta en "Wizard" (1998). Con esta carta y una colección de poemas, cálculos técnicos y apenas cuatro centavos en el bolsillo, Tesla embarcó hacia Nueva York en junio de 1884 a bordo del vapor Saturnia.',
      'Durante el viaje transatlántico, Tesla fue robado, perdió su equipaje y casi perdió el barco al quedarse dormido. Llegó a Nueva York el 6 de junio de 1884. Se presentó ante Edison en su laboratorio de la Quinta Avenida y fue contratado de inmediato. Edison le encargó rediseñar sus generadores de corriente continua, que sufrían problemas de eficiencia. Tesla trabajó durante meses, frecuentemente desde las 10:30 de la mañana hasta las 5:00 de la madrugada del día siguiente. Mejoró los diseños de Edison incorporando reguladores automáticos de voltaje que aumentaron la eficiencia en un rango estimado del 15% al 25%.',
      'La ruptura con Edison se produjo cuando Tesla reclamó una recompensa que creía prometida. Según el relato de Tesla, Edison le había ofrecido 50,000 dólares (equivalentes a más de 1.5 millones de dólares actuales) si lograba mejorar sus generadores. Cuando Tesla completó el trabajo y pidió el pago, Edison respondió: «Tesla, usted no entiende el humor americano». Tesla renunció al instante. Lo que siguió fue un período sombrío: sin empleo y sin contactos, Tesla cavó zanjas para la compañía de telégrafos de Nueva York por dos dólares diarios durante varios meses para sobrevivir en 1886 y 1887.',
      'La fortuna de Tesla cambió cuando conoció a los empresarios Alfred S. Brown y Charles F. Peck, quienes en abril de 1887 financiaron la creación de la Tesla Electric Company en un laboratorio de la calle Liberty, 89, en Manhattan. Allí, Tesla construyó prototipos funcionales de su sistema polifásico de corriente alterna, incluyendo generadores, transformadores y motores. En mayo de 1888, presentó su artículo «Un Nuevo Sistema de Motores y Transformadores de Corriente Alterna» ante el Instituto Americano de Ingenieros Eléctricos (AIEE). George Westinghouse, el principal rival de Edison, asistió a la presentación y ofreció a Tesla un contrato por 60,000 dólares en efectivo, acciones de su compañía y regalías de 2.50 dólares por caballo de fuerza.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los «cuatro centavos» con los que Tesla llegó a Nueva York son parte del mito fundacional del inventor inmigrante. Sin embargo, el historiador W. Bernard Carlson señala que Tesla probablemente tenía algo más de dinero del que declaró. Lo verificable es que Tesla llegó sin reserva de hotel, sin contactos personales en la ciudad y con una carta de presentación como su principal activo. El vapor Saturnia partió del puerto de Trieste (entonces territorio austrohúngaro) y tardó aproximadamente dos semanas en cruzar el Atlántico hasta el puerto de Nueva York.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El contrato de Westinghouse con Tesla en 1888 incluía regalías de 2.50 dólares por cada caballo de fuerza (HP) de capacidad eléctrica instalada usando las patentes de Tesla. Un caballo de fuerza equivale a 746 watts. Si este contrato se hubiera mantenido intacto, Tesla habría recibido miles de millones de dólares durante el siglo XX, dado que su sistema de corriente alterna alimenta la totalidad de la red eléctrica mundial. Tesla renunció voluntariamente a estas regalías en 1897 para salvar a la Westinghouse Electric Company de la bancarrota.' },
    ],
    fact: 'El laboratorio de Tesla en la calle Liberty, 89, en Manhattan, fue donde construyó los primeros motores de inducción polifásicos funcionales entre 1887 y 1888. Las patentes resultantes (US 381,968 a US 382,282, concedidas el 1 de mayo de 1888) describen el sistema completo de generación, transmisión y uso de corriente alterna polifásica. Estas siete patentes fundamentales son consideradas por los historiadores de la tecnología como el grupo de patentes más importante en la historia de la ingeniería eléctrica, comparable en impacto a la patente del teléfono de Bell (1876).',
  },
  {
    id: 'mente-tesla',
    title: 'La Mente de Tesla',
    color: '#B88420',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_mente-tesla.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_mente-tesla.jpg',
    content: [
      'La memoria eidética de Tesla es uno de los fenómenos cognitivos más documentados en la historia de la ciencia. En su autobiografía de 1919, Tesla describe cómo podía memorizar libros enteros después de una sola lectura. No se trataba de una habilidad parcial: Tesla podía recitar páginas específicas, recordar la posición de cada párrafo en la hoja y reproducir diagramas técnicos con precisión milimétrica. Hablaba ocho idiomas con fluidez: serbocroata, checo, alemán, francés, húngaro, italiano, inglés y latín. Aprendió cada idioma mediante la lectura de textos técnicos y literarios en el idioma original.',
      'La capacidad de visualización tridimensional de Tesla iba más allá de la memoria eidética convencional. Tesla podía construir una máquina completa en su mente, hacerla funcionar mentalmente, identificar puntos de desgaste y realizar modificaciones sin dibujar un solo plano. Según sus propias palabras en "My Inventions": «Cuando tengo una idea, la construyo inmediatamente en mi imaginación. Cambio la construcción, hago mejoras y opero el dispositivo en mi mente. Me es absolutamente indiferente si hago funcionar mi turbina en el pensamiento o la pruebo en mi taller. Hasta noto si hay un desequilibrio».',
      'Tesla también experimentaba formas de sinestesia, un fenómeno neurológico donde la estimulación de un sentido produce respuestas involuntarias en otro. Para Tesla, ciertas palabras producían sensaciones de sabor, y algunos sonidos generaban destellos de colores en su campo visual. Los neurocientíficos estiman que la sinestesia afecta entre el 2% y el 4% de la población general. En el caso de Tesla, la sinestesia parecía estar conectada con su capacidad creativa: las asociaciones sensoriales cruzadas le permitían percibir relaciones entre fenómenos que otros no podían ver.',
      'Los «experimentos mentales» de Tesla constituían su método principal de trabajo. A diferencia de Edison, quien realizaba miles de pruebas físicas para llegar a una solución (Edison probó más de 6,000 materiales para el filamento de su bombilla), Tesla diseñaba, probaba y perfeccionaba sus inventos por completo en su imaginación antes de construir un solo prototipo. Cuando finalmente construía el dispositivo físico, funcionaba prácticamente igual que en su simulación mental. Este método le permitía trabajar con una eficiencia que desconcertaba a sus contemporáneos.',
      'La sensibilidad sensorial de Tesla era extrema y bien documentada por sus biógrafos. Durante su crisis nerviosa en Budapest (1881), Tesla reportó que podía escuchar el tictac de un reloj a tres habitaciones de distancia, que el paso de un carruaje a varios metros le producía vibraciones dolorosas en todo el cuerpo, y que la luz del sol se sentía como golpes físicos en su cabeza. Esta hipersensibilidad, que la neurología moderna clasificaría como hiperestesia, disminuyó gradualmente pero nunca desapareció por completo. En sus años posteriores en Nueva York, Tesla insistía en habitaciones silenciosas, evitaba el contacto físico y calculaba el volumen de su comida antes de comerla.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla tenía rituales y hábitos específicos que la psicología moderna asociaría con trastorno obsesivo-compulsivo (TOC). Requería que el número de su habitación de hotel fuera divisible por tres. Usaba exactamente 18 servilletas (divisible por 3) para limpiar sus cubiertos antes de cada comida. Caminaba alrededor de un edificio tres veces antes de entrar. Estos comportamientos, lejos de ser caprichos, parecen haber sido mecanismos de control que le permitían gestionar su hipersensibilidad sensorial y mantener la concentración en su trabajo inventivo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La hiperestesia sensorial que Tesla experimentaba está documentada en la literatura médica como un aumento patológico de la sensibilidad a estímulos sensoriales. Puede manifestarse en cualquier sentido: táctil (hiperestesia táctil), auditivo (hiperacusia) o visual (fotofobia). Los estudios neurocientíficos publicados en el Journal of Neuroscience (2015) indican que la hiperestesia está asociada con una reducción del filtrado inhibitorio en el tálamo, la estructura cerebral que actúa como «puerta» reguladora de la información sensorial que llega a la corteza cerebral.' },
    ],
    fact: 'El método de «visualización mental completa» de Tesla fue documentado no solo por él mismo sino por colegas que presenciaron sus resultados. El ingeniero Arthur Kennelly, que trabajó con Tesla en la Westinghouse, reportó en 1893 que Tesla podía dictar las dimensiones exactas de cada pieza de una máquina nueva sin consultar ningún plano. Cuando se construía el dispositivo según estas especificaciones verbales, funcionaba correctamente en el primer intento. Este método contrasta con el de Edison, quien registró más de 1,000 patentes pero empleaba un sistema de prueba y error masivo que él mismo describió como «99% transpiración y 1% inspiración».',
  },
  {
    id: 'legado-infancia',
    title: 'El Legado de una Infancia',
    color: '#5A6B7A',
    btnImage: '/assets/nikola_tesla/infographic_m1/btn_legado-infancia.jpg',
    image: '/assets/nikola_tesla/infographic_m1/hero_legado-infancia.jpg',
    content: [
      'La infancia de Tesla en Smiljan y Gospić formó los cimientos de cada uno de sus inventos posteriores. Las turbinas de agua que construyó en los arroyos de Lika prefiguraron su turbina sin paletas (patente US 1,061,206 de 1913). El motor de escarabajos de junio anticipó su interés en convertir energía natural en movimiento mecánico. Su observación de las tormentas eléctricas sobre los Alpes Dináricos inspiró directamente sus experimentos con corrientes de alta frecuencia y alto voltaje en Colorado Springs en 1899, donde generó rayos artificiales de hasta 40 metros de longitud.',
      'La unidad de medida Tesla (T), adoptada por la Conferencia General de Pesos y Medidas en 1960, mide la densidad de flujo magnético (también llamada inducción magnética). Un tesla equivale a un weber por metro cuadrado, o equivalentemente, a un voltio-segundo por metro cuadrado. Para contexto: el campo magnético terrestre tiene una intensidad de aproximadamente 25 a 65 microteslas, un imán de refrigerador produce unos 5 militeslas, y las máquinas de resonancia magnética (MRI) en hospitales operan entre 1.5 y 3 teslas.',
      'El sistema de corriente alterna polifásica que Tesla concibió en Budapest y patentó en Nueva York es la base de toda la distribución eléctrica moderna. Cada vez que enciendes una luz, cargas un teléfono o usas una computadora, la electricidad llega a tu hogar gracias al sistema de Tesla. La central hidroeléctrica de las Cataratas del Niágara, inaugurada en 1896 usando generadores diseñados por Tesla y construidos por Westinghouse, fue la primera planta de energía de corriente alterna a gran escala del mundo. Generaba 37 megavatios, suficiente para alimentar toda la ciudad de Buffalo, Nueva York.',
      'Tesla acumuló más de 300 patentes en 26 países durante su vida. Entre sus inventos más importantes se encuentran: el motor de inducción (1888), la bobina Tesla (1891), el sistema de transmisión de radio (patente US 645,576 de 1897, reconocida por la Corte Suprema de EE.UU. en 1943 como anterior a la de Marconi), el control remoto por radio (1898, demostrado con un barco teledirigido en el Madison Square Garden), y los principios del radar (descritos en una carta a la Electrical Experimenter en 1917). Cada uno de estos inventos tiene raíces en las experiencias y observaciones de su infancia en la región de Lika.',
      'La empresa Tesla, Inc., fundada por Martin Eberhard y Marc Tarpenning en 2003 (con Elon Musk como presidente e inversor principal desde 2004), eligió el nombre de Nikola Tesla para honrar su contribución al motor eléctrico y al sistema de corriente alterna. Los motores de los vehículos Tesla Model S, Model 3, Model X y Model Y son descendientes directos del motor de inducción que Tesla patentó en 1888. El aeropuerto de Belgrado, Serbia, fue renombrado Aeropuerto Nikola Tesla en 2006. Su rostro aparece en el billete de 100 dinares serbios. Cada 10 de julio, su cumpleaños, se celebra el Día de Nikola Tesla en Croacia y Serbia.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla murió solo en la habitación 3327 del Hotel New Yorker en Manhattan el 7 de enero de 1943, a los 86 años. La habitación era la número 3327 porque 3+3+2+7=15, y 1+5=6, que es divisible por 3. Tras su muerte, el FBI confiscó dos camiones llenos de sus documentos, notas y prototipos. Estos materiales fueron clasificados como secretos por el gobierno estadounidense durante décadas. En 1952, el sobrino de Tesla, Sava Kosanović, logró que los documentos fueran enviados al Museo Nikola Tesla en Belgrado, donde se conservan más de 160,000 páginas de sus notas originales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La bobina Tesla, inventada en 1891, es un transformador resonante de alta frecuencia que puede producir voltajes de millones de voltios. Funciona mediante la oscilación resonante entre un circuito primario y uno secundario acoplados magnéticamente. La frecuencia de resonancia se calcula con la fórmula f = 1/(2π√LC), donde L es la inductancia y C la capacitancia del circuito. Las bobinas Tesla modernas se usan en aplicaciones industriales para pruebas de aislamiento eléctrico y en investigación de física de plasmas.' },
    ],
    fact: 'La Corte Suprema de Estados Unidos resolvió en 1943 (caso Marconi Wireless Telegraph Co. v. United States, 320 U.S. 1) que las patentes de Tesla sobre transmisión de radio (US 645,576 y US 649,621, concedidas en 1897 y 1900) tenían prioridad sobre la patente de Guglielmo Marconi de 1904. Esto confirmó que Tesla había inventado los principios fundamentales de la radio antes que Marconi. La decisión llegó meses después de la muerte de Tesla y no recibió la atención pública que merecía porque la Segunda Guerra Mundial dominaba las noticias del momento.',
  },
];

// ━━━ Electric Storm Particle Field (Canvas Background) ━━━━━━━━━━━━━━━━━━━━━━
function StormField() {
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

// ━━━ Tesla Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function TeslaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Lightning arc */}
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
        {/* Central lightning bolt icon */}
        <path d="M304 18 L296 32 L302 32 L294 44 L310 28 L302 28 Z" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">INFANCIA EN SMILJAN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LOS PRIMEROS AÑOS DE NIKOLA TESLA</text>
      </svg>
    </div>
  );
}

// ━━━ Organic Node Button (matching BttfM2 style) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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
          layoutId="activeDotTeslaM1"
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

// ━━━ Magazine-Style Content Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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

// ━━━ Progress Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━ Main Infographic Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function InteractiveInfographic_TeslaM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,12,25,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/tesla/tesla_m1.png)',
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
      <StormField />

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
              🏆 ¡Has explorado la infancia de Nikola Tesla!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Nacido del Rayo
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
