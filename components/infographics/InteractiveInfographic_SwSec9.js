'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Biomedical / Robotic Themed)
   ========================================================================= */

const DecoArm = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4 20L8 14L14 16L20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    <circle cx="8" cy="14" r="2" fill={color} />
    <circle cx="14" cy="16" r="2" fill={color} />
    <path d="M19 5L20 8L22 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DecoHeartbeat = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M2 12H6L9 4L15 20L18 12H22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
    <circle cx="15" cy="20" r="1.5" fill={color} />
    <circle cx="9" cy="4" r="1.5" fill={color} />
  </svg>
);

const DecoBrainChip = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="6" y="6" width="12" height="12" rx="2" stroke={color} strokeWidth="2" opacity="0.8"/>
    <path d="M12 6V3M12 21V18M6 12H3M21 12H18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 6V4M16 6V4M8 20V18M16 20V18M6 8H4M6 16H4M20 8H18M20 16H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const DecoLung = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 3V10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 10C12 10 9 12 7 15C5 18 6 21 8 21C10 21 11 18 12 15C13 18 14 21 16 21C18 21 19 18 17 15C15 12 12 10 12 10Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    <path d="M7 15L9 17M17 15L15 17" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const DecoHelmet = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2C6.48 2 2 6.48 2 12V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V12C22 6.48 17.52 2 12 2Z" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <path d="M8 12L10 16L14 16L16 12" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 16V22" stroke={color} strokeWidth="1.5"/>
    <circle cx="7" cy="18" r="2" fill={`${color}44`} stroke={color} strokeWidth="1"/>
    <circle cx="17" cy="18" r="2" fill={`${color}44`} stroke={color} strokeWidth="1"/>
  </svg>
);

const DecoSuit = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="5" y="4" width="14" height="16" rx="2" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <rect x="8" y="7" width="3" height="3" fill={color} opacity="0.9"/>
    <rect x="13" y="7" width="3" height="3" fill={color} opacity="0.6"/>
    <rect x="8" y="12" width="8" height="2" fill={color} opacity="0.5"/>
    <rect x="8" y="15" width="5" height="2" fill={color} opacity="0.5"/>
  </svg>
);

const DECO_MAP = {
  'protesis-bionicas': [DecoArm, DecoBrainChip],
  'soporte-vital': [DecoSuit, DecoHeartbeat],
  'exoesqueletos': [DecoArm, DecoSuit],
  'interfaz-cerebro': [DecoBrainChip, DecoHeartbeat],
  'regeneracion-tejidos': [DecoHeartbeat, DecoLung],
  'respiracion-asistida': [DecoLung, DecoHelmet],
  'cyborgs-futuro': [DecoHelmet, DecoBrainChip],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Kuiken, T. A., et al. (2009). 'Targeted muscle reinnervation for real-time myoelectric control of multifunction artificial arms'. JAMA, 301(6), 619-628.",
  "Lebedev, M. A., & Nicolelis, M. A. (2006). 'Brain-machine interfaces: past, present and future'. Trends in Neurosciences, 29(9), 536-546.",
  "Dollar, A. M., & Herr, H. (2008). 'Lower extremity exoskeletons and active orthoses: challenges and state-of-the-art'. IEEE Transactions on Robotics, 24(1), 144-158.",
  "Macchiarini, P., et al. (2008). 'Clinical transplantation of a tissue-engineered airway'. The Lancet, 372(9655), 2023-2030.",
  "Slutsky, A. S., & Ranieri, V. M. (2013). 'Ventilator-induced lung injury'. New England Journal of Medicine, 369(22), 2126-2136.",
  "Donoghue, J. P. (2002). 'Connecting cortex to machines: recent advances in brain interfaces'. Nature Neuroscience, 5(11), 1085-1088."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'protesis-bionicas',
    title: 'Prótesis Biónicas: El Brazo de Luke',
    color: '#D32F2F',
    btnImage: '/assets/starwars/infographic_vader/btn_protesis_bionicas.png',
    image: '/assets/starwars/infographic_vader/hero_protesis_bionicas.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_protesis_bionicas.png',
    bannerCaption: "Las prótesis biónicas modernas usan sensores mioeléctricos que traducen señales musculares en movimientos precisos.",
    content: [
      "Imagina perder una extremidad y poder reemplazarla con un brazo robótico funcional que responde directamente a tus pensamientos. En el mundo de la medicina moderna y la ingeniería biomédica, las prótesis biónicas han dejado de ser ciencia ficción para convertirse en una realidad transformadora. Utilizando materiales ligeros como la fibra de carbono y el titanio, junto con motores miniaturizados y sensores de alta precisión, los ingenieros han logrado crear extremidades artificiales que imitan de manera sorprendente el movimiento fluido y natural del cuerpo humano, devolviendo la independencia y mejorando drásticamente la calidad de vida de miles de pacientes amputados alrededor del mundo.",
      "Para lograr que una mano metálica se cierre con solo pensarlo, los médicos utilizan un procedimiento quirúrgico revolucionario llamado 'Reinervación Muscular Dirigida' (TMR, por sus siglas en inglés). Durante esta compleja cirugía, los cirujanos toman los nervios periféricos residuales que solían controlar el brazo amputado y los reconectan cuidadosamente a otros músculos sanos en el pecho o el hombro del paciente. Cuando el paciente piensa en cerrar su mano ausente, el cerebro envía la señal eléctrica, el nervio activa el músculo del pecho, y unos sensores especiales pegados a la piel captan esa pequeñísima corriente eléctrica, enviando inmediatamente un comando a la computadora de la prótesis robótica.",
      "Esta tecnología no solo se trata de movimiento muscular mecánico, sino de restaurar también el delicado y crucial sentido del tacto. Las prótesis experimentales más avanzadas de la actualidad están equipadas con cientos de micro-sensores de presión en las yemas de los dedos de silicona. Estos sensores recogen información táctil vital sobre la fuerza, la textura y la temperatura de los objetos, y envían esos datos de vuelta hacia el cerebro humano mediante pulsos eléctricos dirigidos a los nervios. ¡Esto significa que el paciente puede sentir literalmente si está agarrando un vaso de cristal frágil, una taza de café caliente o una manzana, evitando así aplastar accidentalmente los objetos cotidianos!",
      "Uno de los hitos tecnológicos más asombrosos en este fascinante campo de estudio es el famoso y complejo 'Brazo DEKA'(DEKA Arm System), desarrollado recientemente bajo la dirección de la Agencia de Proyectos de Investigación Avanzados de Defensa (DARPA) de los Estados Unidos. Irónicamente y de manera oficial, los ingenieros y científicos llamaron a este avanzado prototipo biomédico'El Brazo de Luke', inspirándose directamente en la prótesis cibernética ultra-realista que recibió el héroe galáctico Luke Skywalker tras su devastador y trágico enfrentamiento con Darth Vader en la Ciudad de las Nubes, marcando un cruce espectacular entre la ciencia ficción y la realidad médica.",
      "A medida que la inteligencia artificial y el aprendizaje automático (machine learning) avanzan a pasos agigantados, el futuro de las extremidades biónicas promete ser aún más increíble. Las computadoras integradas en las prótesis serán capaces de predecir automáticamente el movimiento que el usuario desea realizar, aprendiendo sus hábitos y rutinas diarias. Llegará un día, en un futuro no muy lejano, en que un brazo mecánico será estructural y funcionalmente superior a un brazo biológico natural, difuminando para siempre las líneas fronterizas que separan a la biología humana tradicional de la más pura robótica e ingeniería mecatrónica moderna."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Al final del clímax emocional del Episodio V: El Imperio Contraataca, Luke Skywalker pierde trágicamente su mano derecha en un feroz duelo de sables de luz contra Darth Vader. En la escena final a bordo de la fragata médica rebelde, un droide médico quirúrgico (el droide 2-1B) examina cuidadosamente la nueva y reluciente mano cibernética de Luke, abriendo pequeñas escotillas metálicas para probar las conexiones nerviosas biónicas. Cuando el droide pincha uno de los dedos robóticos con un instrumento médico punzante, Luke siente genuinamente el dolor, demostrando un sistema cibernético avanzado con perfecta retroalimentación táctil sensorial bidireccional, exactamente lo que la biomedicina moderna intenta lograr hoy en día.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La revolucionaria técnica quirúrgica de Reinervación Muscular Dirigida (TMR) fue desarrollada originalmente a principios de la década de 2000 por el pionero Dr. Todd Kuiken en el prestigioso Instituto de Rehabilitación de Chicago (RIC). Esta asombrosa cirugía de redirección nerviosa permite a los pacientes con amputaciones severas operar simultánea e instintivamente múltiples articulaciones mecánicas motorizadas de una prótesis biónica avanzada, simplemente al pensar en mover las articulaciones biológicas correspondientes de su brazo y mano faltantes, sin requerir ningún interruptor manual o comandos de voz adicionales.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Algunos de los materiales avanzados que se utilizan rutinariamente para recubrir exteriormente y proteger estéticamente las prótesis biónicas modernas están diseñados específicamente para reaccionar a factores ambientales complejos. Existen siliconas dermatológicas de grado médico que literalmente cambian de color sutilmente dependiendo del clima y la exposición directa a la luz solar (imitando perfectamente el proceso natural del bronceado de la piel humana), y que incluso están equipadas con micro-elementos calefactores internos diseñados para imitar fielmente el calor natural de un cuerpo vivo al contacto físico.' 
      }
    ],
    fact: 'El proyecto del Brazo DEKA, financiado por DARPA, logró desarrollar una prótesis robótica modular controlable simultáneamente en múltiples grados de libertad mediante señales electromiográficas (EMG). La agencia lo denominó oficialmente "Luke Arm" en un tributo directo a Star Wars, certificando su aprobación médica por la FDA de EE.UU. en 2014.'
  },
  {
    id: 'soporte-vital',
    title: 'El Traje: Sistema de Soporte Vital',
    color: '#607D8B',
    btnImage: '/assets/starwars/infographic_vader/btn_soporte_vital.png',
    image: '/assets/starwars/infographic_vader/hero_soporte_vital.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_soporte_vital.png',
    bannerCaption: "Los sistemas de soporte vital regulan presión, oxígeno y temperatura para sustituir funciones orgánicas comprometidas.",
    content: [
      "Cuando el entorno que nos rodea es absoluta y letal para la frágil biología humana, la ingeniería de soporte vital se convierte en nuestro único y más resistente escudo protector. Un sistema de soporte vital (Life Support System) es una compleja e intrincada red tecnológica diseñada específicamente para proporcionar los elementos básicos e indispensables que un organismo humano necesita biológicamente para sobrevivir: oxígeno puro, presión atmosférica estable, eliminación eficiente del dióxido de carbono tóxico, agua potable limpia y una regulación estricta y constante de la temperatura corporal central.",
      "El traje emblemático, oscuro e intimidante de Darth Vader es, en su núcleo más fundamental, una cámara de reanimación médica andante y una unidad de cuidados intensivos miniaturizada. Tras sufrir quemaduras volcánicas catastróficas y letales que destruyeron irreversiblemente casi la totalidad de su piel y sus pulmones en las ardientes orillas de lava del planeta Mustafar, Anakin Skywalker dependía al cien por ciento de su gruesa armadura de obsidiana presurizada. Este traje sellado de manera hermética servía simultáneamente como una barrera estéril contra infecciones masivas mortales y como un sistema de ventilación pulmonar mecánico ininterrumpido.",
      "En el mundo real de la ciencia aerospacial, el ejemplo supremo y más cercano a esta tecnología es el asombroso traje espacial para Actividades Extravehiculares (Traje EVA) que utilizan los astronautas altamente entrenados de la NASA en la Estación Espacial Internacional. Estos voluminosos e increíbles trajes blancos no son simples ropas; son esencialmente verdaderas naves espaciales con forma humana en miniatura. Contienen sofisticados subsistemas de enfriamiento por agua líquida que recorren cientos de metros de tuberías para evitar que el cuerpo del astronauta hierva bajo el intenso sol espacial, y sistemas químicos de depuración molecular que filtran continuamente el aire tóxico exhalado.",
      "La pesada y parpadeante placa de control computarizada que Darth Vader lleva anclada firmemente en el centro de su pecho no es un simple panel decorativo; es el ordenador médico central y el corazón tecnológico del traje, monitoreando constantemente docenas de variables biométricas críticas en tiempo real. En la Tierra contemporánea, los hospitales más modernos del mundo utilizan monitores de pacientes digitales de última generación que desempeñan funciones idénticas y rigurosas. Estos aparatos computarizados rastrean y analizan el ritmo cardíaco, la saturación porcentual de oxígeno en la sangre y la presión arterial continua, activando alarmas estridentes de manera inmediata si los signos vitales del paciente se desploman repentinamente.",
      "A medida que la ambiciosa exploración espacial humana se expande rápidamente con miras hacia las futuras colonizaciones habitables de la Luna y de las áridas llanuras rojas de Marte, la ingeniería de trajes de soporte vital portátiles y ligeros avanza a un ritmo frenético. Los ingenieros bioespaciales contemporáneos están desarrollando activamente impresionantes bio-trajes elásticos inteligentes que logran aplicar presión mecánica directa sobre la piel de los astronautas (en lugar de utilizar sistemas inflables gigantescos y torpes), garantizando una movilidad anatómica sin precedentes y una protección térmica total en los brutales e inhóspitos desiertos alienígenas y vacíos espaciales extremos."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la culminante y desoladora secuencia final del Episodio III: La Venganza de los Sith, presenciamos el agónico y dramático momento en que los droides quirúrgicos de emergencia instalan desesperadamente el doloroso traje de soporte vital en el cuerpo masivamente quemado de Anakin Skywalker. La pesada e imponente máscara respiratoria es descendida lentamente sobre su rostro y sellada herméticamente, momento en el cual escuchamos por primera vez el escalofriante y rítmico sonido mecánico de su respiración artificial, simbolizando la completa y absoluta transición del hombre hacia la dependencia total e irreversible de una fría máquina médica.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El complejo e inmenso Sistema de Soporte Vital y Control Ambiental (ECLSS, por sus siglas en inglés) utilizado permanentemente a bordo de la Estación Espacial Internacional moderna recicla casi el 93% de todos los líquidos corporales humanos, procesando rigurosamente incluso la transpiración ambiental y la orina humana hasta transformarla nuevamente en agua potable purificada que es estadísticamente más limpia y segura para el consumo humano que el agua promedio embotellada de la llave en la Tierra. Este nivel de purificación circular continua es tecnológicamente imperativo e indispensable para poder sobrevivir durante años en las inhóspitas condiciones del espacio profundo exterior.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Los impresionantes trajes espaciales de modelo EVA contemporáneos de la NASA son muy pesados y voluminosos; pesan asombrosamente alrededor de 127 kilogramos completos (casi 280 libras enteras) mientras se encuentran en la Tierra bajo gravedad normal. Sin embargo, en la ingravidez total del micro-espacio exterior, los astronautas experimentados se sienten ligeros y no notan en absoluto este peso masivo. De igual manera, se presume lógicamente que la pesada y blindada armadura de Darth Vader era fatigante para sus músculos y esqueleto destrozado, obligándolo a utilizar poderosamente la Fuerza oscura constantemente solo para poder caminar.' 
      }
    ],
    fact: 'El diseño funcional de un sistema autónomo de soporte vital humano requiere un equilibrio térmico y químico perfecto. El traje de Darth Vader refleja fielmente los principios de la medicina espacial y la tecnología de los trajes extravehiculares (EVA), integrando múltiples circuitos cerrados para el manejo del oxígeno, depuración de CO2 y regulación térmica extrema.'
  },
  {
    id: 'exoesqueletos',
    title: 'Exoesqueletos: Armaduras del Futuro',
    color: '#B71C1C',
    btnImage: '/assets/starwars/infographic_vader/btn_exoesqueletos.png',
    image: '/assets/starwars/infographic_vader/hero_exoesqueletos.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_exoesqueletos.png',
    bannerCaption: "Los exoesqueletos robóticos asisten la movilidad multiplicando la fuerza humana mediante actuadores hidráulicos y eléctricos.",
    content: [
      "Un exoesqueleto biomédico es una armadura mecanizada diseñada para acoplarse al cuerpo y multiplicar la fuerza humana o asistir la movilidad. Esta tecnología permite desde levantar pesadas cargas industriales hasta ayudar a una persona con parálisis a caminar nuevamente.",
      "El traje de Darth Vader funciona como un exoesqueleto médico. Debido al daño irreversible que sufrió en su columna y músculos por las quemaduras en Mustafar, el cuerpo de Anakin Skywalker era demasiado débil para sostenerse. Su armadura incluye servomotores y pistones que realizan el trabajo biomecánico, sustituyendo su fuerza biológica perdida.",
      "En los laboratorios actuales, los exoesqueletos médicos son clave en fisioterapia y rehabilitación. Sistemas como ReWalk o Ekso Bionics permiten a pacientes con lesiones en la médula espinal volver a caminar. Emplean motores eléctricos en la cadera y rodillas, junto a sensores inerciales que interpretan el cambio en el centro de gravedad del usuario para dar pasos automáticos.",
      "La industria y el sector militar también emplean estas tecnologías. Exoesqueletos de carga, como el HULC (Human Universal Load Carrier), transfieren el peso de mochilas pesadas directamente hacia el suelo. Esto desvía la presión de la columna vertebral y las piernas, reduciendo la fatiga del operario.",
      "En el futuro cercano, los investigadores desarrollan 'exo-trajes' de tejidos textiles blandos. Confeccionados con polímeros activos que reaccionan como músculos artificiales, estos trajes flexibles podrían asistir a personas mayores en su movilidad diaria de manera cómoda y discreta."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'El movimiento de Darth Vader se caracteriza por ser rígido y mecánico. Esta inmovilidad se debe a que su columna y músculos fueron severamente afectados. Su marcha depende por completo de los actuadores hidráulicos ubicados en las piernas artificiales de su exoesqueleto.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Los exoesqueletos médicos como ReWalk interactúan con sensores que detectan ligeros cambios posturales. Un pequeño ordenador evalúa la biomecánica de la marcha en fracciones de segundo y suministra energía a los motores ubicados en las rodillas para replicar un paso humano.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'En la naturaleza, la mayoría de los artrópodos, como abejas, arañas y cangrejos, cuentan con un exoesqueleto biológico. A diferencia de los humanos que tenemos un esqueleto interno, estos animales tienen sus tejidos blandos en el interior, resguardados por un caparazón estructural de quitina en el exterior.' 
      }
    ],
    fact: 'Los exoesqueletos motorizados como el sistema ReWalk, aprobado por la FDA en 2014, utilizan motores en cadera y rodilla junto con sensores de inclinación para restaurar la bipedestación y marcha en pacientes con paraplejia espinal completa, funcionando como un equivalente médico de la armadura mecanizada de Darth Vader.'
  },
  {
    id: 'interfaz-cerebro',
    title: 'Interfaces Cerebro-Máquina',
    color: '#90A4AE',
    btnImage: '/assets/starwars/infographic_vader/btn_interfaz_cerebro.png',
    image: '/assets/starwars/infographic_vader/hero_interfaz_cerebro.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_interfaz_cerebro.png',
    bannerCaption: "Las interfaces cerebro-computadora (BCI) decodifican señales neuronales corticales para controlar dispositivos externos.",
    content: [
      "Imagina poder mover un brazo robótico, escribir un mensaje o pilotar un dron con solo pensarlo, sin mover un solo músculo de tu cuerpo. Eso es exactamente lo que logran las Interfaces Cerebro-Computadora, conocidas como BCI por sus siglas en inglés (Brain-Computer Interface). Esta tecnología crea un puente directo entre tu cerebro y una máquina externa, traduciendo las señales eléctricas de tus neuronas en comandos digitales que un ordenador puede interpretar y ejecutar. Es como si tu cerebro tuviera un cable USB invisible conectado directamente al mundo digital, permitiéndote interactuar con la tecnología usando únicamente el poder de tus pensamientos.",
      "Para captar las señales del cerebro, los ingenieros biomédicos utilizan diferentes técnicas según el nivel de precisión que necesitan. La forma más sencilla y no invasiva es la electroencefalografía (EEG), que consiste en colocar una malla con docenas de pequeños sensores sobre el cuero cabelludo. Estos sensores detectan las ondas eléctricas que producen miles de millones de neuronas al comunicarse entre sí. Sin embargo, la señal que llega a través del cráneo es débil y borrosa, como intentar escuchar una conversación a través de una pared gruesa. Por eso, para aplicaciones más precisas, los científicos desarrollaron implantes que se colocan directamente sobre la superficie del cerebro o incluso dentro de él.",
      "El dispositivo implantable más famoso del mundo se llama el Utah Array, desarrollado por la Universidad de Utah en Estados Unidos. Es un chip cuadrado diminuto, más pequeño que una moneda de diez centavos, que contiene exactamente 100 micro-electrodos puntiagudos de silicio recubiertos de platino. Cada electrodo mide apenas 1.5 milímetros de largo y puede registrar la actividad eléctrica de neuronas individuales en el córtex motor del cerebro. Cuando el paciente piensa en mover su mano derecha, un patrón específico de neuronas se activa, y el chip captura esa diminuta tormenta eléctrica con una fidelidad extraordinaria, enviándola a un procesador que la traduce en movimiento real.",
      "Una vez que los electrodos capturan las señales cerebrales, entran en acción sofisticados algoritmos de inteligencia artificial. Estos programas analizan el patrón caótico de miles de descargas eléctricas simultáneas y aprenden a descifrar la firma única de cada comando mental: mover el brazo hacia arriba, cerrar el puño, girar la muñeca o escribir una letra específica. Un estudio publicado en Nature en 2021 demostró que un paciente tetrapléjico logró escribir 90 caracteres por minuto simplemente imaginando que movía su mano para trazar letras en el aire. El sistema de IA decodificaba sus pensamientos con una precisión del 94.1 por ciento.",
      "Empresas como Neuralink (fundada por Elon Musk), Synchron y Blackrock Neurotech están desarrollando la siguiente generación de implantes cerebrales. El chip N1 de Neuralink contiene 1,024 electrodos distribuidos en 64 hilos ultra-flexibles, cada uno más delgado que un cabello humano (entre 4 y 6 micrómetros de diámetro). Estos hilos se insertan en el cerebro mediante un robot quirúrgico de precisión milimétrica que evita dañar los vasos sanguíneos. En enero de 2024, Neuralink implantó su primer chip en un paciente humano llamado Noland Arbaugh, quien logró controlar un cursor de computadora y jugar videojuegos usando exclusivamente sus pensamientos."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Según los diccionarios visuales oficiales de Star Wars, el casco de Darth Vader está equipado con un sistema de interfaz neural directa. Finas agujas de biopolímero quirúrgico penetran a través de la zona cervical y se conectan directamente con la médula espinal dañada de Anakin Skywalker. Este sistema le permite controlar los sistemas vitales de su armadura, ajustar su visión aumentada panorámica y regular el flujo de medicamentos que recibe por vía intravenosa, todo ello sin necesidad de mover un solo músculo. Es el equivalente conceptual exacto de un moderno sistema BCI invasivo como el Utah Array.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El Utah Array, desarrollado por Richard Normann en la Universidad de Utah, es un chip de silicio de apenas 4 x 4 milímetros que contiene 100 micro-electrodos independientes de 1.5 mm de longitud, recubiertos de platino e iridio. Aprobado por la FDA para ensayos clínicos, ha sido implantado en más de 30 pacientes con parálisis. Cada electrodo puede registrar señales de neuronas individuales a frecuencias de hasta 30,000 muestras por segundo, proporcionando suficiente resolución para decodificar intenciones motoras complejas como la escritura manual imaginada.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La forma más común y no invasiva de leer la actividad cerebral es la electroencefalografía (EEG), inventada en 1924 por el neurólogo alemán Hans Berger. Consiste en una malla o gorro elástico con entre 16 y 256 pequeños electrodos circulares de plata-cloruro de plata que se pegan al cuero cabelludo. Estos sensores miden las ondas eléctricas producidas por la actividad sincronizada de millones de neuronas, desde las ondas alfa (relajación) hasta las ondas gamma (concentración intensa), todo sin necesidad de ninguna cirugía.' 
      }
    ],
    fact: 'En 2021, investigadores de Stanford publicaron en Nature que un paciente tetrapléjico con un implante BCI logró escribir texto a una velocidad de 90 caracteres por minuto (equivalente a 18 palabras), simplemente imaginando que trazaba letras con la mano. El sistema de inteligencia artificial decodificó sus señales cerebrales con un 94.1% de precisión, acercándose a la velocidad de escritura normal en un teléfono móvil.'
  },
  {
    id: 'regeneracion-tejidos',
    title: 'Tanques de Bacta: Regeneración Celular',
    color: '#C62828',
    btnImage: '/assets/starwars/infographic_vader/btn_regeneracion_tejidos.png',
    image: '/assets/starwars/infographic_vader/hero_regeneracion_tejidos.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_regeneracion_tejidos.png',
    bannerCaption: "La medicina regenerativa emplea células madre y bioandamios para reconstruir tejidos dañados como cartílago y piel.",
    content: [
      "En el universo de Star Wars, cuando un personaje resulta gravemente herido, quemado por lava o mutilado en combate, la solución médica galáctica es sumergirlo durante horas en un enorme tanque vertical lleno de un misterioso líquido azulado llamado Bacta. Este gel biológico ficticio acelera la regeneración de tejidos dañados, cierra heridas y repara quemaduras a una velocidad que haría llorar de envidia a cualquier cirujano terrestre. Aunque parezca pura fantasía, la ciencia real de la medicina regenerativa está trabajando para crear algo parecido: terapias que estimulen al cuerpo humano para repararse a sí mismo de maneras que antes se consideraban imposibles.",
      "El equivalente terrestre más cercano al Bacta son las células madre. Piensa en ellas como las piezas de LEGO más versátiles del cuerpo: son células que todavía no se han especializado y que pueden transformarse en casi cualquier tipo de tejido que el organismo necesite. Las células madre embrionarias pueden convertirse en neuronas, células musculares, células de la piel, cartílago, hueso o incluso células del corazón. En 2006, el científico japonés Shinya Yamanaka descubrió algo revolucionario: podía tomar células adultas normales (como las de la piel) y reprogramarlas para que volvieran a ser células madre. Las llamó iPSCs (células madre pluripotentes inducidas), y este descubrimiento le valió el Premio Nobel de Medicina en 2012.",
      "La bio-impresión 3D es otra tecnología que nos acerca al Bacta. Funciona exactamente como una impresora 3D normal, pero en lugar de plástico, utiliza tintas biológicas (bio-tintas) compuestas por hidrogeles biodegradables cargados con células vivas del propio paciente. Capa por capa, la bio-impresora construye estructuras tridimensionales de tejido vivo: piel para cubrir quemaduras graves, cartílago para reparar articulaciones dañadas, e incluso vasos sanguíneos funcionales. En 2019, investigadores de la Universidad de Tel Aviv lograron bio-imprimir un mini-corazón del tamaño de una cereza usando células cardíacas humanas, completo con cámaras y vasos sanguíneos.",
      "Los andamios o scaffolds de bioingeniería representan otro avance crucial. Son estructuras porosas tridimensionales fabricadas con materiales biodegradables como el ácido poliláctico (PLA) o el colágeno, que sirven como esqueleto temporal para que las células crezcan y se organicen formando nuevo tejido. Los médicos siembran células madre del paciente sobre estos andamios, los nutren con factores de crecimiento específicos, y el resultado es un parche de tejido vivo que puede implantarse quirúrgicamente. En 2023, científicos del Hospital General de Massachusetts cultivaron una oreja humana completa en un andamio de colágeno y la trasplantaron exitosamente a una paciente que había nacido con microtia.",
      "Aunque todavía no tenemos tanques gigantes de inmersión total como en Star Wars, los principios fundamentales son los mismos: acelerar la capacidad natural del cuerpo para curarse. Las terapias con plasma rico en plaquetas (PRP) ya se usan rutinariamente en hospitales de todo el mundo. Consisten en extraer sangre del paciente, centrifugarla para concentrar las plaquetas (que contienen factores de crecimiento naturales) e inyectar ese concentrado directamente en la zona dañada. Deportistas de élite como Rafael Nadal y Tiger Woods han utilizado PRP para recuperarse de lesiones musculares y tendinosas que antes requerían meses de rehabilitación."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Rogue One: Una Historia de Star Wars (2016), vemos a Darth Vader sin su armadura, flotando con su cuerpo destruido dentro de un enorme tanque de Bacta en su castillo de Mustafar. Esta escena perturbadora revela las terribles quemaduras que Anakin sufrió en su duelo contra Obi-Wan Kenobi junto a los ríos de lava. También en El Imperio Contraataca (1980), Luke Skywalker es sumergido en un tanque de Bacta en la base rebelde de Hoth tras ser atacado por un Wampa, mostrando cómo esta tecnología sana heridas profundas en cuestión de horas.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En las unidades de grandes quemados de hospitales especializados, los cirujanos utilizan sustitutos dérmicos como Integra (una matriz de colágeno bovino y condroitina-6-sulfato) y Apligraf (piel artificial cultivada con fibroblastos y queratinocitos humanos vivos). Estas tecnologías permiten recubrir quemaduras de tercer grado cuando no hay suficiente piel sana del paciente para hacer injertos. La piel bio-ingenierizada proporciona una barrera temporal mientras el cuerpo regenera su propia dermis por debajo, reduciendo la mortalidad por infección en pacientes con quemaduras extensas.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'El ajolote mexicano (Ambystoma mexicanum) es el campeón mundial de la regeneración animal. Este anfibio acuático rosado, originario de los canales de Xochimilco en la Ciudad de México, puede regenerar sus patas, cola, mandíbula, corazón, médula espinal e incluso partes de su cerebro sin formar cicatrices. Los científicos estudian los genes del ajolote para entender cómo activa programas regenerativos que los mamíferos hemos perdido durante la evolución, con la esperanza de algún día aplicar esos mecanismos a la medicina humana.' 
      }
    ],
    fact: 'En 2006, Shinya Yamanaka descubrió que cuatro genes específicos (Oct4, Sox2, Klf4 y c-Myc) pueden reprogramar células adultas comunes para convertirlas en células madre pluripotentes inducidas (iPSCs), capaces de transformarse en cualquier tipo de tejido. Este descubrimiento le valió el Premio Nobel de Medicina en 2012 y abrió la puerta a la medicina regenerativa personalizada sin necesidad de embriones.'
  },
  {
    id: 'respiracion-asistida',
    title: 'La Respiración de Vader',
    color: '#78909C',
    btnImage: '/assets/starwars/infographic_vader/btn_respiracion_asistida.png',
    image: '/assets/starwars/infographic_vader/hero_respiracion_asistida.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_respiracion_asistida.png',
    bannerCaption: "Los ventiladores mecánicos administran ciclos de presión positiva para asistir o reemplazar la respiración pulmonar.",
    content: [
      "Ese sonido rítmico, profundo y aterrador que escuchas cada vez que Darth Vader aparece en pantalla es probablemente el efecto sonoro más reconocible de toda la historia del cine. Pero detrás de ese inquietante silbido mecánico hay una realidad médica muy concreta: lo que estás escuchando es esencialmente un ventilador mecánico. El traje negro de Vader funciona como un sistema de soporte vital portátil que fuerza aire presurizado y enriquecido con oxígeno hacia el interior de sus pulmones severamente dañados por las quemaduras que sufrió en Mustafar, exactamente igual que las máquinas de ventilación asistida que salvan miles de vidas cada día en los hospitales de todo el mundo.",
      "En las Unidades de Cuidados Intensivos (UCI), los ventiladores mecánicos son equipos fundamentales que sostienen la vida de pacientes que no pueden respirar por sí mismos. Funcionan generando una presión positiva que empuja una mezcla calibrada de oxígeno y aire a través de un tubo endotraqueal insertado en la tráquea del paciente. Los ventiladores modernos, como el Hamilton C6 o el Draeger V500, son computadoras sofisticadas que monitorizan en tiempo real más de 50 parámetros respiratorios: volumen de aire, frecuencia, presión, niveles de CO2 y saturación de oxígeno. Pueden detectar cuándo el paciente intenta respirar por su cuenta y sincronizarse con su esfuerzo natural.",
      "Para los pacientes con fallo pulmonar extremo, donde ni siquiera el ventilador más potente puede oxigenar la sangre adecuadamente, existe una tecnología de último recurso llamada ECMO (Oxigenación por Membrana Extracorpórea). Es literalmente un pulmón artificial externo al cuerpo. La máquina ECMO extrae sangre venosa del paciente a través de una cánula gruesa, la hace pasar por una membrana especial de polimetilpenteno donde se le agrega oxígeno y se le retira dióxido de carbono, y luego devuelve esa sangre ya oxigenada al cuerpo. Durante la pandemia de COVID-19, la ECMO salvó la vida de miles de pacientes con neumonía severa cuyos pulmones habían dejado de funcionar casi por completo.",
      "La historia de la ventilación mecánica es una de las más dramáticas de la medicina. Todo comenzó durante las devastadoras epidemias de poliomielitis de las décadas de 1940 y 1950, cuando el virus atacaba las neuronas motoras del tronco cerebral y paralizaba los músculos respiratorios. Los médicos inventaron los llamados Pulmones de Acero: enormes cilindros metálicos sellados donde se introducía al paciente entero (excepto la cabeza). Una bomba creaba presión negativa dentro del cilindro, expandiendo el pecho del paciente y forzándolo a inhalar. En el pico de la epidemia de 1952 en Copenhague, el hospital Blegdam tenía tantos pacientes que 1,500 estudiantes de medicina se turnaron día y noche para ventilar manualmente a los enfermos con bolsas de goma.",
      "Los ventiladores portátiles modernos que llevan los paramédicos en las ambulancias son maravillas de la miniaturización. Pesan apenas 2 a 5 kilogramos y funcionan con baterías recargables durante horas. Compáralos con los Pulmones de Acero que pesaban más de 300 kilogramos y ocupaban una habitación entera. Los dispositivos más avanzados actuales, como el ventilador doméstico Trilogy de Philips, permiten que pacientes con enfermedades neuromusculares como la ELA (Esclerosis Lateral Amiotrófica) o distrofia muscular vivan en sus hogares con asistencia respiratoria continua, conectados a una máquina del tamaño de una mochila que les proporciona cada respiro, de día y de noche, igual que el traje de Vader."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'La icónica respiración mecánica de Darth Vader fue creada por el legendario diseñador de sonido Ben Burtt para la película original de 1977. Burtt no usó ningún equipo médico sofisticado: simplemente tomó un regulador de presión de un tanque de buceo antiguo y respiró a través de él frente a un micrófono, modificando la velocidad y el tono hasta conseguir ese ritmo lento, pesado y amenazante. Irónicamente, el sonido que aterroriza a toda una galaxia se creó con un equipo de buceo barato y un poco de creatividad, pero es médicamente preciso en su representación de un respirador mecánico de presión positiva.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La tecnología ECMO (Oxigenación por Membrana Extracorpórea) puede mantener vivo a un paciente durante semanas o incluso meses cuando sus pulmones han dejado de funcionar. La sangre circula a un flujo de 3 a 7 litros por minuto a través de una membrana de polimetilpenteno (PMP) de 0.03 milímetros de grosor, donde el oxígeno se difunde hacia los glóbulos rojos y el dióxido de carbono se elimina. Durante la pandemia de COVID-19, el uso de ECMO aumentó un 1,100% en algunos hospitales, salvando pacientes con neumonía bilateral grave que no respondían a la ventilación convencional.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Los Pulmones de Acero, inventados en 1928 por Philip Drinker y Louis Agassiz Shaw en la Universidad de Harvard, funcionaban creando presión negativa alrededor del cuerpo del paciente. El paciente quedaba sellado dentro de un cilindro metálico con solo la cabeza afuera, y una bomba eléctrica alternaba entre succionar y liberar el aire, expandiendo y comprimiendo el pecho rítmicamente. En el pico de las epidemias de polio, salas enteras de hospitales estaban llenas de filas de estos enormes cilindros metálicos, y algunos pacientes vivieron décadas enteras dentro de ellos.' 
      }
    ],
    fact: 'El sonido de la respiración de Vader es médicamente equivalente a un ventilador BiPAP (presión positiva de dos niveles en vías aéreas), que alterna entre una presión alta durante la inhalación y una presión baja durante la exhalación. Esta misma tecnología se usa hoy en ventiladores portátiles para pacientes con ELA, distrofia muscular y apnea severa del sueño, permitiéndoles respirar en sus hogares las 24 horas del día.'
  },
  {
    id: 'cyborgs-futuro',
    title: 'Cyborgs: El Futuro de la Humanidad',
    color: '#E53935',
    btnImage: '/assets/starwars/infographic_vader/btn_cyborgs_futuro.png',
    image: '/assets/starwars/infographic_vader/hero_cyborgs_futuro.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_cyborgs_futuro.png',
    bannerCaption: "El concepto de cyborg, acuñado en 1960 por Clynes y Kline, explora la integración de tecnología con biología humana.",
    content: [
      "Darth Vader plantea una de las preguntas filosóficas más profundas de toda la saga: cuando reemplazas tus brazos, tus piernas, tus pulmones y casi todo tu cuerpo por máquinas, en qué momento dejas de ser humano y te conviertes en algo diferente. La palabra cyborg (organismo cibernético) fue inventada en 1960 por los científicos Manfred Clynes y Nathan Kline en un artículo para la NASA, donde proponían modificar el cuerpo humano con tecnología para que pudiera sobrevivir en el espacio sin necesidad de trajes espaciales. La idea era simple pero revolucionaria: en lugar de cambiar el ambiente para adaptarlo al humano, cambiar al humano para adaptarlo al ambiente.",
      "Lo que mucha gente no sabe es que millones de personas en el mundo ya son técnicamente cyborgs. Si tienes un marcapasos cardíaco (un dispositivo electrónico del tamaño de una moneda grande implantado bajo la piel que envía pulsos eléctricos para regular el ritmo del corazón), eres un cyborg. Si llevas un implante coclear (un electrodo insertado en la cóclea del oído interno que convierte sonidos en señales eléctricas enviadas directamente al nervio auditivo), eres un cyborg. Solo en Estados Unidos, más de 3 millones de personas llevan marcapasos y unas 120,000 tienen implantes cocleares. Estos dispositivos demuestran que la fusión entre biología y tecnología ya no es ciencia ficción, sino medicina cotidiana.",
      "Neil Harbisson es quizás el cyborg más famoso del mundo y el primero reconocido oficialmente por un gobierno. Nacido con acromatopsia (incapacidad total para ver colores), Harbisson se implantó permanentemente en el cráneo una antena llamada Eyeborg que convierte las frecuencias de luz de los colores en vibraciones sonoras que su cerebro ha aprendido a interpretar. Su pasaporte británico lo muestra con la antena, siendo la primera persona en la historia cuya foto oficial de identificación incluye un dispositivo cibernético como parte integral de su identidad. Harbisson no solo percibe los colores visibles sino también frecuencias ultravioleta e infrarrojas que ningún ojo humano puede detectar.",
      "El campo del biohacking o grinder lleva esta filosofía al extremo. Miles de entusiastas alrededor del mundo se implantan voluntariamente pequeños chips NFC o RFID bajo la piel de las manos para abrir puertas, desbloquear teléfonos o almacenar datos médicos. Algunos se insertan imanes de neodimio en las yemas de los dedos para sentir campos electromagnéticos invisibles. La empresa sueca Biohax International ha implantado chips a más de 4,000 personas, permitiéndoles pagar en tiendas, acceder a edificios y viajar en tren con solo acercar la mano a un lector. Esta comunidad argumenta que la integración voluntaria de tecnología en el cuerpo es la siguiente etapa natural de la evolución humana.",
      "Sin embargo, la transformación de Vader también nos advierte sobre los peligros de perder nuestra humanidad en el proceso. La bioética moderna debate intensamente hasta dónde debemos llegar: si es aceptable mejorar un cuerpo sano (no solo reparar uno dañado), quién tendría acceso a estas mejoras y si podrían crear una desigualdad entre humanos aumentados y humanos naturales. El filósofo Nick Bostrom de la Universidad de Oxford llama a esto transhumanismo, y predice que para el año 2050 la tecnología permitirá aumentar significativamente la inteligencia, la fuerza y la longevidad humanas. La pregunta que Vader nos obliga a hacernos sigue vigente: al ganar poderes sobrehumanos a través de la tecnología, corremos el riesgo de perder algo esencialmente humano en el camino."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Obi-Wan Kenobi resume la tragedia de la transformación de Anakin con una de las frases más memorables de la saga: "Él es más máquina que hombre ahora, retorcido y malvado." Esta frase, pronunciada en El Retorno del Jedi (1983), plantea la pregunta central del transhumanismo: al reemplazar progresivamente cada parte del cuerpo biológico con componentes mecánicos, Vader perdió no solo su cuerpo sino también su conexión con su humanidad y sus emociones. Solo en sus momentos finales, al salvar a Luke, demuestra que la chispa humana nunca se extinguió completamente bajo toda esa armadura de durasteel.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Los implantes cocleares modernos, como el Nucleus 8 de Cochlear Limited, contienen un procesador externo con 22 canales de frecuencia que convierte las ondas sonoras en señales eléctricas codificadas. Un transmisor magnético envía estas señales a un receptor implantado bajo la piel, que las transmite a 22 electrodos de platino insertados en la cóclea del oído interno. Estos electrodos estimulan directamente las fibras del nervio auditivo, permitiendo que personas con sordera profunda perciban el habla y los sonidos ambientales. Más de 1 millón de implantes cocleares se han colocado en todo el mundo desde 1984.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Neil Harbisson, nacido en 1984 con acromatopsia total (ve solo en blanco y negro), se convirtió en 2004 en el primer cyborg legalmente reconocido cuando el gobierno británico aceptó que su antena Eyeborg apareciera en su foto de pasaporte. La antena, implantada permanentemente en su cráneo mediante osteointegración, convierte cada color en una vibración sonora única: el rojo suena como una nota Fa, el verde como un La, y el azul como un Do. Harbisson puede incluso percibir colores ultravioleta e infrarrojos que ningún humano normal puede ver, superando las capacidades biológicas naturales.' 
      }
    ],
    fact: 'La palabra cyborg fue acuñada en 1960 por Manfred Clynes y Nathan Kline en su artículo "Cyborgs and Space" para la revista Astronautics. Hoy, más de 4 millones de personas en el mundo llevan dispositivos implantados permanentemente (marcapasos, implantes cocleares, bombas de insulina, estimuladores cerebrales profundos), lo que los convierte técnicamente en organismos cibernéticos: seres donde la biología y la tecnología se fusionan para mantener o mejorar funciones vitales.'
  }
];

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
};

const EXPAND_ICONS = {
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  atom: <Atom size={18} />,
  sparkles: <Sparkles size={18} />
};

/* =========================================================================
   3. COMPONENTS
   ========================================================================= */

const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.05) + 0.01
    }));

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 100, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.005) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(255,100,100,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#D32F2F',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(211, 47, 47, 0.4)'
      }}>
        BIOMEDICINA Y ROBÃ“TICA
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#90A4AE',
        margin: 0,
        letterSpacing: '1px'
      }}>
        EL TRAJE DE DARTH VADER &middot; EL FUTURO DE LA HUMANIDAD
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec9" : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} 
          />
        ))}
      </div>
    </div>
  );
};

const NodeButton = ({ node, isVisited, onClick }) => {
  const isComplete = isVisited(node.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(node)}
      style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        padding: 0,
        border: `3px solid ${isComplete ? node.color : '#333'}`,
        background: '#1A1C29',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isComplete ? `0 0 15px ${node.color}55` : 'none',
        zIndex: 10
      }}
    >
      <img 
        src={node.btnImage} 
        alt={node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isComplete ? 1 : 0.6 }}
       loading="lazy" />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px', background: node.color, borderRadius:'50%',
          padding: '2px'
        }}>
          <Sparkles size={12} color="#000" />
        </div>
      )}
    </motion.button>
  );
};

const ExpandableSection = ({ data, color, direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const variant = dirVariants[direction] || dirVariants.up;
  
  return (
    <div style={{ marginBottom: '1rem', background: '#1A1C29', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${color}33` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: isOpen ? `${color}11` : 'transparent',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          fontFamily: '"Oswald", sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>
              {data.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoArm;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoSuit;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        inset: '2rem',
        background: '#0B0D17',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}  loading="lazy" />
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>{node.title}</h2>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
              width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
            }} />
          </div>
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[1]}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
                <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATAFILA
              </div>
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
                {node.fact}
              </p>
            </div>
            <div>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
              ))}
            </div>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '1.5rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}33`, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif', fontStyle: 'italic' }}>
                  {node.bannerCaption}
                </div>
              )}
            </div>
          )}

          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[3]}
          </p>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[4]}
          </p>
        </div>
      </div>
      
      <div style={{ padding: '1rem 2rem', background: '#1A1C29', borderTop: `1px solid ${node.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ color: '#90A4AE', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
          ARCHIVOS DEL IMPERIO / {node.title.toUpperCase()}
        </div>
        <button 
          onClick={onNext}
          style={{ 
            background: node.color, 
            color: '#FFF', 
            border: 'none', 
            padding: '0.75rem 2rem', 
            borderRadius: '24px', 
            fontWeight: 'bold', 
            fontFamily: '"Oswald", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: `0 4px 15px ${node.color}66`
          }}
        >
          {isLast ? 'FINALIZAR' : 'SIGUIENTE'} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec9() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

  const progress = (visitedNodes.size / INFOGRAPHIC_NODES.length) * 100;
  const isAllComplete = visitedNodes.size === INFOGRAPHIC_NODES.length;

  const handleNodeClick = (node) => {
    setActiveNode(node.id);
    if (!visitedNodes.has(node.id)) {
      setVisitedNodes(prev => new Set(prev).add(node.id));
    }
  };

  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      const nextNode = INFOGRAPHIC_NODES[currentIndex + 1];
      handleNodeClick(nextNode);
    } else {
      setActiveNode(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05060A', overflow: 'hidden', fontFamily: '"Lora", serif' }}>
      <StarField />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_vader/bg_vader.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNode} />
        
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '800px', 
          height: '400px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NodeButton node={node} isVisited={(id) => visitedNodes.has(id)} onClick={handleNodeClick} />
            </motion.div>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '600px', marginTop: '4rem', background: '#1A1C29', borderRadius: '12px', padding: '1rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: '"Oswald", sans-serif', color: '#90A4AE' }}>
            <span>INTEGRACIÃ“N CIBERNÉTICA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #D32F2F, #B71C1C)', boxShadow: '0 0 10px #D32F2F' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #D32F2F, #B71C1C)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(211, 47, 47, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_vader/badge_vader.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              ¡ANÁLISIS BIOMÉDICO COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>


        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>BIBLIOGRAFÍA ACADÉMICA (ARCHIVOS IMPERIALES)</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#78909C', fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>

      </div>

      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
