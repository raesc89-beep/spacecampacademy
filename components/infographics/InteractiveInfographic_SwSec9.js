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
    title: 'PrÃ³tesis BiÃ³nicas: El Brazo de Luke',
    color: '#D32F2F',
    btnImage: '/assets/starwars/infographic_vader/btn_protesis_bionicas.png',
    image: '/assets/starwars/infographic_vader/hero_protesis_bionicas.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_protesis_bionicas.png',
    bannerCaption: "Las prÃ³tesis biÃ³nicas modernas usan sensores mioelÃ©ctricos que traducen seÃ±ales musculares en movimientos precisos.",
    content: [
      "Imagina perder una extremidad y poder reemplazarla con un brazo robÃ³tico completamente funcional que responde directamente a tus pensamientos. En el mundo de la medicina moderna y la ingenierÃ­a biomÃ©dica, las prÃ³tesis biÃ³nicas han dejado de ser ciencia ficciÃ³n para convertirse en una realidad transformadora. Utilizando materiales ligeros como la fibra de carbono y el titanio, junto con motores miniaturizados y sensores de alta precisiÃ³n, los ingenieros han logrado crear extremidades artificiales que imitan de manera sorprendente el movimiento fluido y natural del cuerpo humano, devolviendo la independencia y mejorando drÃ¡sticamente la calidad de vida de miles de pacientes amputados alrededor del mundo.",
      "Para lograr que una mano metÃ¡lica se cierre con solo pensarlo, los mÃ©dicos utilizan un procedimiento quirÃºrgico revolucionario llamado 'ReinervaciÃ³n Muscular Dirigida' (TMR, por sus siglas en inglÃ©s). Durante esta compleja cirugÃ­a, los cirujanos toman los nervios perifÃ©ricos residuales que solÃ­an controlar el brazo amputado y los reconectan cuidadosamente a otros mÃºsculos sanos en el pecho o el hombro del paciente. Cuando el paciente piensa en cerrar su mano ausente, el cerebro envÃ­a la seÃ±al elÃ©ctrica, el nervio activa el mÃºsculo del pecho, y unos sensores especiales pegados a la piel captan esa pequeÃ±Ã­sima corriente elÃ©ctrica, enviando inmediatamente un comando a la computadora de la prÃ³tesis robÃ³tica.",
      "Esta tecnologÃ­a no solo se trata de movimiento muscular mecÃ¡nico, sino de restaurar tambiÃ©n el delicado y crucial sentido del tacto. Las prÃ³tesis experimentales mÃ¡s avanzadas de la actualidad estÃ¡n equipadas con cientos de micro-sensores de presiÃ³n en las yemas de los dedos de silicona. Estos sensores recogen informaciÃ³n tÃ¡ctil vital sobre la fuerza, la textura y la temperatura de los objetos, y envÃ­an esos datos de vuelta hacia el cerebro humano mediante pulsos elÃ©ctricos dirigidos a los nervios. Â¡Esto significa que el paciente puede sentir literalmente si estÃ¡ agarrando un vaso de cristal frÃ¡gil, una taza de cafÃ© caliente o una manzana, evitando asÃ­ aplastar accidentalmente los objetos cotidianos!",
      "Uno de los hitos tecnolÃ³gicos mÃ¡s asombrosos en este fascinante campo de estudio es el famoso y complejo 'Brazo DEKA' (DEKA Arm System), desarrollado recientemente bajo la direcciÃ³n de la Agencia de Proyectos de InvestigaciÃ³n Avanzados de Defensa (DARPA) de los Estados Unidos. IrÃ³nicamente y de manera oficial, los ingenieros y cientÃ­ficos llamaron a este avanzado prototipo biomÃ©dico 'El Brazo de Luke', inspirÃ¡ndose directamente en la prÃ³tesis cibernÃ©tica ultra-realista que recibiÃ³ el hÃ©roe galÃ¡ctico Luke Skywalker tras su devastador y trÃ¡gico enfrentamiento con Darth Vader en la Ciudad de las Nubes, marcando un cruce espectacular entre la ciencia ficciÃ³n y la realidad mÃ©dica.",
      "A medida que la inteligencia artificial y el aprendizaje automÃ¡tico (machine learning) avanzan a pasos agigantados, el futuro de las extremidades biÃ³nicas promete ser aÃºn mÃ¡s increÃ­ble. Las computadoras integradas en las prÃ³tesis serÃ¡n capaces de predecir automÃ¡ticamente el movimiento que el usuario desea realizar, aprendiendo sus hÃ¡bitos y rutinas diarias. LlegarÃ¡ un dÃ­a, en un futuro no muy lejano, en que un brazo mecÃ¡nico serÃ¡ estructural y funcionalmente superior a un brazo biolÃ³gico natural, difuminando para siempre las lÃ­neas fronterizas que separan a la biologÃ­a humana tradicional de la mÃ¡s pura robÃ³tica e ingenierÃ­a mecatrÃ³nica moderna."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Al final del clÃ­max emocional del Episodio V: El Imperio Contraataca, Luke Skywalker pierde trÃ¡gicamente su mano derecha en un feroz duelo de sables de luz contra Darth Vader. En la escena final a bordo de la fragata mÃ©dica rebelde, un droide mÃ©dico quirÃºrgico (el droide 2-1B) examina cuidadosamente la nueva y reluciente mano cibernÃ©tica de Luke, abriendo pequeÃ±as escotillas metÃ¡licas para probar las conexiones nerviosas biÃ³nicas. Cuando el droide pincha uno de los dedos robÃ³ticos con un instrumento mÃ©dico punzante, Luke siente genuinamente el dolor, demostrando un sistema cibernÃ©tico avanzado con perfecta retroalimentaciÃ³n tÃ¡ctil sensorial bidireccional, exactamente lo que la biomedicina moderna intenta lograr hoy en dÃ­a.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La revolucionaria tÃ©cnica quirÃºrgica de ReinervaciÃ³n Muscular Dirigida (TMR) fue desarrollada originalmente a principios de la dÃ©cada de 2000 por el pionero Dr. Todd Kuiken en el prestigioso Instituto de RehabilitaciÃ³n de Chicago (RIC). Esta asombrosa cirugÃ­a de redirecciÃ³n nerviosa permite a los pacientes con amputaciones severas operar simultÃ¡nea e instintivamente mÃºltiples articulaciones mecÃ¡nicas motorizadas de una prÃ³tesis biÃ³nica avanzada, simplemente al pensar en mover las articulaciones biolÃ³gicas correspondientes de su brazo y mano faltantes, sin requerir ningÃºn interruptor manual o comandos de voz adicionales.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Algunos de los materiales avanzados que se utilizan rutinariamente para recubrir exteriormente y proteger estÃ©ticamente las prÃ³tesis biÃ³nicas modernas estÃ¡n diseÃ±ados especÃ­ficamente para reaccionar a factores ambientales complejos. Existen siliconas dermatolÃ³gicas de grado mÃ©dico que literalmente cambian de color sutilmente dependiendo del clima y la exposiciÃ³n directa a la luz solar (imitando perfectamente el proceso natural del bronceado de la piel humana), y que incluso estÃ¡n equipadas con micro-elementos calefactores internos diseÃ±ados para imitar fielmente el calor natural de un cuerpo vivo al contacto fÃ­sico.' 
      }
    ],
    fact: 'El proyecto del Brazo DEKA, financiado por DARPA, logrÃ³ desarrollar una prÃ³tesis robÃ³tica modular controlable simultÃ¡neamente en mÃºltiples grados de libertad mediante seÃ±ales electromiogrÃ¡ficas (EMG). La agencia lo denominÃ³ oficialmente "Luke Arm" en un tributo directo a Star Wars, certificando su aprobaciÃ³n mÃ©dica por la FDA de EE.UU. en 2014.'
  },
  {
    id: 'soporte-vital',
    title: 'El Traje: Sistema de Soporte Vital',
    color: '#607D8B',
    btnImage: '/assets/starwars/infographic_vader/btn_soporte_vital.png',
    image: '/assets/starwars/infographic_vader/hero_soporte_vital.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_soporte_vital.png',
    bannerCaption: "Los sistemas de soporte vital regulan presiÃ³n, oxÃ­geno y temperatura para sustituir funciones orgÃ¡nicas comprometidas.",
    content: [
      "Cuando el entorno que nos rodea es absoluta y completamente letal para la frÃ¡gil biologÃ­a humana, la ingenierÃ­a de soporte vital se convierte en nuestro Ãºnico y mÃ¡s resistente escudo protector. Un sistema de soporte vital (Life Support System) es una compleja e intrincada red tecnolÃ³gica diseÃ±ada especÃ­ficamente para proporcionar los elementos bÃ¡sicos e indispensables que un organismo humano necesita biolÃ³gicamente para sobrevivir: oxÃ­geno puro, presiÃ³n atmosfÃ©rica estable, eliminaciÃ³n eficiente del diÃ³xido de carbono tÃ³xico, agua potable limpia y una regulaciÃ³n estricta y constante de la temperatura corporal central.",
      "El traje emblemÃ¡tico, oscuro e intimidante de Darth Vader es, en su nÃºcleo mÃ¡s fundamental, una cÃ¡mara de reanimaciÃ³n mÃ©dica andante y una unidad de cuidados intensivos miniaturizada. Tras sufrir quemaduras volcÃ¡nicas catastrÃ³ficas y letales que destruyeron irreversiblemente casi la totalidad de su piel y sus pulmones en las ardientes orillas de lava del planeta Mustafar, Anakin Skywalker dependÃ­a al cien por ciento de su gruesa armadura de obsidiana presurizada. Este traje sellado de manera hermÃ©tica servÃ­a simultÃ¡neamente como una barrera estÃ©ril contra infecciones masivas mortales y como un sistema de ventilaciÃ³n pulmonar mecÃ¡nico ininterrumpido.",
      "En el mundo real de la ciencia aerospacial, el ejemplo supremo y mÃ¡s cercano a esta tecnologÃ­a es el asombroso traje espacial para Actividades Extravehiculares (Traje EVA) que utilizan los astronautas altamente entrenados de la NASA en la EstaciÃ³n Espacial Internacional. Estos voluminosos e increÃ­bles trajes blancos no son simples ropas; son esencialmente verdaderas naves espaciales con forma humana en miniatura. Contienen sofisticados subsistemas de enfriamiento por agua lÃ­quida que recorren cientos de metros de tuberÃ­as para evitar que el cuerpo del astronauta hierva bajo el intenso sol espacial, y sistemas quÃ­micos de depuraciÃ³n molecular que filtran continuamente el aire tÃ³xico exhalado.",
      "La pesada y parpadeante placa de control computarizada que Darth Vader lleva anclada firmemente en el centro de su pecho no es un simple panel decorativo; es el ordenador mÃ©dico central y el corazÃ³n tecnolÃ³gico del traje, monitoreando constantemente docenas de variables biomÃ©tricas crÃ­ticas en tiempo real. En la Tierra contemporÃ¡nea, los hospitales mÃ¡s modernos del mundo utilizan monitores de pacientes digitales de Ãºltima generaciÃ³n que desempeÃ±an funciones idÃ©nticas y rigurosas. Estos aparatos computarizados rastrean y analizan el ritmo cardÃ­aco, la saturaciÃ³n porcentual de oxÃ­geno en la sangre y la presiÃ³n arterial continua, activando alarmas estridentes de manera inmediata si los signos vitales del paciente se desploman repentinamente.",
      "A medida que la ambiciosa exploraciÃ³n espacial humana se expande rÃ¡pidamente con miras hacia las futuras colonizaciones habitables de la Luna y de las Ã¡ridas llanuras rojas de Marte, la ingenierÃ­a de trajes de soporte vital portÃ¡tiles y ligeros avanza a un ritmo verdaderamente frenÃ©tico. Los ingenieros bioespaciales contemporÃ¡neos estÃ¡n desarrollando activamente impresionantes bio-trajes elÃ¡sticos inteligentes que logran aplicar presiÃ³n mecÃ¡nica directa sobre la piel de los astronautas (en lugar de utilizar sistemas inflables gigantescos y torpes), garantizando una movilidad anatÃ³mica sin precedentes y una protecciÃ³n tÃ©rmica total en los brutales e inhÃ³spitos desiertos alienÃ­genas y vacÃ­os espaciales extremos."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la culminante y desoladora secuencia final del Episodio III: La Venganza de los Sith, presenciamos el agÃ³nico y dramÃ¡tico momento en que los droides quirÃºrgicos de emergencia instalan desesperadamente el doloroso traje de soporte vital en el cuerpo masivamente quemado de Anakin Skywalker. La pesada e imponente mÃ¡scara respiratoria es descendida lentamente sobre su rostro y sellada hermÃ©ticamente, momento en el cual escuchamos por primera vez el escalofriante y rÃ­tmico sonido mecÃ¡nico de su respiraciÃ³n artificial, simbolizando la completa y absoluta transiciÃ³n del hombre hacia la dependencia total e irreversible de una frÃ­a mÃ¡quina mÃ©dica.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El complejo e inmenso Sistema de Soporte Vital y Control Ambiental (ECLSS, por sus siglas en inglÃ©s) utilizado permanentemente a bordo de la EstaciÃ³n Espacial Internacional moderna recicla casi el 93% de todos los lÃ­quidos corporales humanos, procesando rigurosamente incluso la transpiraciÃ³n ambiental y la orina humana hasta transformarla nuevamente en agua potable purificada que es estadÃ­sticamente mÃ¡s limpia y segura para el consumo humano que el agua promedio embotellada de la llave en la Tierra. Este nivel de purificaciÃ³n circular continua es tecnolÃ³gicamente imperativo e indispensable para poder sobrevivir durante aÃ±os en las inhÃ³spitas condiciones del espacio profundo exterior.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Los impresionantes trajes espaciales de modelo EVA contemporÃ¡neos de la NASA son extremadamente pesados y voluminosos; pesan asombrosamente alrededor de 127 kilogramos completos (casi 280 libras enteras) mientras se encuentran en la Tierra bajo gravedad normal. Sin embargo, en la ingravidez total del micro-espacio exterior, los astronautas experimentados se sienten absolutamente ligeros y no notan en absoluto este peso masivo. De igual manera, se presume lÃ³gicamente que la pesada y blindada armadura de Darth Vader era increÃ­blemente fatigante para sus mÃºsculos y esqueleto destrozado, obligÃ¡ndolo a utilizar poderosamente la Fuerza oscura constantemente solo para poder caminar.' 
      }
    ],
    fact: 'El diseÃ±o funcional de un sistema autÃ³nomo de soporte vital humano requiere un equilibrio tÃ©rmico y quÃ­mico perfecto. El traje de Darth Vader refleja fielmente los principios de la medicina espacial y la tecnologÃ­a de los trajes extravehiculares (EVA), integrando mÃºltiples circuitos cerrados para el manejo del oxÃ­geno, depuraciÃ³n de CO2 y regulaciÃ³n tÃ©rmica extrema.'
  },
  {
    id: 'exoesqueletos',
    title: 'Exoesqueletos: Armaduras del Futuro',
    color: '#B71C1C',
    btnImage: '/assets/starwars/infographic_vader/btn_exoesqueletos.png',
    image: '/assets/starwars/infographic_vader/hero_exoesqueletos.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_exoesqueletos.png',
    bannerCaption: "Los exoesqueletos robÃ³ticos asisten la movilidad multiplicando la fuerza humana mediante actuadores hidrÃ¡ulicos y elÃ©ctricos.",
    content: [
      "Un exoesqueleto biomÃ©dico es una armadura mecanizada diseÃ±ada para acoplarse al cuerpo y multiplicar la fuerza humana o asistir la movilidad. Esta tecnologÃ­a permite desde levantar pesadas cargas industriales hasta ayudar a una persona con parÃ¡lisis a caminar nuevamente.",
      "El traje de Darth Vader funciona como un exoesqueleto mÃ©dico. Debido al daÃ±o irreversible que sufriÃ³ en su columna y mÃºsculos por las quemaduras en Mustafar, el cuerpo de Anakin Skywalker era demasiado dÃ©bil para sostenerse. Su armadura incluye servomotores y pistones que realizan el trabajo biomecÃ¡nico, sustituyendo su fuerza biolÃ³gica perdida.",
      "En los laboratorios actuales, los exoesqueletos mÃ©dicos son clave en fisioterapia y rehabilitaciÃ³n. Sistemas como ReWalk o Ekso Bionics permiten a pacientes con lesiones en la mÃ©dula espinal volver a caminar. Emplean motores elÃ©ctricos en la cadera y rodillas, junto a sensores inerciales que interpretan el cambio en el centro de gravedad del usuario para dar pasos automÃ¡ticos.",
      "La industria y el sector militar tambiÃ©n emplean estas tecnologÃ­as. Exoesqueletos de carga, como el HULC (Human Universal Load Carrier), transfieren el peso de mochilas pesadas directamente hacia el suelo. Esto desvÃ­a la presiÃ³n de la columna vertebral y las piernas, reduciendo la fatiga del operario.",
      "En el futuro cercano, los investigadores desarrollan 'exo-trajes' de tejidos textiles blandos. Confeccionados con polÃ­meros activos que reaccionan como mÃºsculos artificiales, estos trajes flexibles podrÃ­an asistir a personas mayores en su movilidad diaria de manera cÃ³moda y discreta."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'El movimiento de Darth Vader se caracteriza por ser rÃ­gido y mecÃ¡nico. Esta inmovilidad se debe a que su columna y mÃºsculos fueron severamente afectados. Su marcha depende por completo de los actuadores hidrÃ¡ulicos ubicados en las piernas artificiales de su exoesqueleto.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Los exoesqueletos mÃ©dicos como ReWalk interactÃºan con sensores que detectan ligeros cambios posturales. Un pequeÃ±o ordenador evalÃºa la biomecÃ¡nica de la marcha en fracciones de segundo y suministra energÃ­a a los motores ubicados en las rodillas para replicar un paso humano.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'En la naturaleza, la mayorÃ­a de los artrÃ³podos, como abejas, araÃ±as y cangrejos, cuentan con un exoesqueleto biolÃ³gico. A diferencia de los humanos que tenemos un esqueleto interno, estos animales tienen sus tejidos blandos en el interior, resguardados por un caparazÃ³n estructural de quitina en el exterior.' 
      }
    ],
    fact: 'Los exoesqueletos motorizados como el sistema ReWalk, aprobado por la FDA en 2014, utilizan motores en cadera y rodilla junto con sensores de inclinaciÃ³n para restaurar la bipedestaciÃ³n y marcha en pacientes con paraplejia espinal completa, funcionando como un equivalente mÃ©dico de la armadura mecanizada de Darth Vader.'
  },
  {
    id: 'interfaz-cerebro',
    title: 'Interfaces Cerebro-MÃ¡quina',
    color: '#90A4AE',
    btnImage: '/assets/starwars/infographic_vader/btn_interfaz_cerebro.png',
    image: '/assets/starwars/infographic_vader/hero_interfaz_cerebro.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_interfaz_cerebro.png',
    bannerCaption: "Las interfaces cerebro-computadora (BCI) decodifican seÃ±ales neuronales corticales para controlar dispositivos externos.",
    content: [
      "Imagina poder mover un brazo robÃ³tico, escribir un mensaje o pilotar un dron con solo pensarlo, sin mover un solo mÃºsculo de tu cuerpo. Eso es exactamente lo que logran las Interfaces Cerebro-Computadora, conocidas como BCI por sus siglas en inglÃ©s (Brain-Computer Interface). Esta tecnologÃ­a crea un puente directo entre tu cerebro y una mÃ¡quina externa, traduciendo las seÃ±ales elÃ©ctricas de tus neuronas en comandos digitales que un ordenador puede interpretar y ejecutar. Es como si tu cerebro tuviera un cable USB invisible conectado directamente al mundo digital, permitiÃ©ndote interactuar con la tecnologÃ­a usando Ãºnicamente el poder de tus pensamientos.",
      "Para captar las seÃ±ales del cerebro, los ingenieros biomÃ©dicos utilizan diferentes tÃ©cnicas segÃºn el nivel de precisiÃ³n que necesitan. La forma mÃ¡s sencilla y no invasiva es la electroencefalografÃ­a (EEG), que consiste en colocar una malla con docenas de pequeÃ±os sensores sobre el cuero cabelludo. Estos sensores detectan las ondas elÃ©ctricas que producen miles de millones de neuronas al comunicarse entre sÃ­. Sin embargo, la seÃ±al que llega a travÃ©s del crÃ¡neo es dÃ©bil y borrosa, como intentar escuchar una conversaciÃ³n a travÃ©s de una pared gruesa. Por eso, para aplicaciones mÃ¡s precisas, los cientÃ­ficos desarrollaron implantes que se colocan directamente sobre la superficie del cerebro o incluso dentro de Ã©l.",
      "El dispositivo implantable mÃ¡s famoso del mundo se llama el Utah Array, desarrollado por la Universidad de Utah en Estados Unidos. Es un chip cuadrado diminuto, mÃ¡s pequeÃ±o que una moneda de diez centavos, que contiene exactamente 100 micro-electrodos puntiagudos de silicio recubiertos de platino. Cada electrodo mide apenas 1.5 milÃ­metros de largo y puede registrar la actividad elÃ©ctrica de neuronas individuales en el cÃ³rtex motor del cerebro. Cuando el paciente piensa en mover su mano derecha, un patrÃ³n especÃ­fico de neuronas se activa, y el chip captura esa diminuta tormenta elÃ©ctrica con una fidelidad extraordinaria, enviÃ¡ndola a un procesador que la traduce en movimiento real.",
      "Una vez que los electrodos capturan las seÃ±ales cerebrales, entran en acciÃ³n sofisticados algoritmos de inteligencia artificial. Estos programas analizan el patrÃ³n caÃ³tico de miles de descargas elÃ©ctricas simultÃ¡neas y aprenden a descifrar la firma Ãºnica de cada comando mental: mover el brazo hacia arriba, cerrar el puÃ±o, girar la muÃ±eca o escribir una letra especÃ­fica. Un estudio publicado en Nature en 2021 demostrÃ³ que un paciente tetraplÃ©jico logrÃ³ escribir 90 caracteres por minuto simplemente imaginando que movÃ­a su mano para trazar letras en el aire. El sistema de IA decodificaba sus pensamientos con una precisiÃ³n del 94.1 por ciento.",
      "Empresas como Neuralink (fundada por Elon Musk), Synchron y Blackrock Neurotech estÃ¡n desarrollando la siguiente generaciÃ³n de implantes cerebrales. El chip N1 de Neuralink contiene 1,024 electrodos distribuidos en 64 hilos ultra-flexibles, cada uno mÃ¡s delgado que un cabello humano (entre 4 y 6 micrÃ³metros de diÃ¡metro). Estos hilos se insertan en el cerebro mediante un robot quirÃºrgico de precisiÃ³n milimÃ©trica que evita daÃ±ar los vasos sanguÃ­neos. En enero de 2024, Neuralink implantÃ³ su primer chip en un paciente humano llamado Noland Arbaugh, quien logrÃ³ controlar un cursor de computadora y jugar videojuegos usando exclusivamente sus pensamientos."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'SegÃºn los diccionarios visuales oficiales de Star Wars, el casco de Darth Vader estÃ¡ equipado con un sistema de interfaz neural directa. Finas agujas de biopolÃ­mero quirÃºrgico penetran a travÃ©s de la zona cervical y se conectan directamente con la mÃ©dula espinal daÃ±ada de Anakin Skywalker. Este sistema le permite controlar los sistemas vitales de su armadura, ajustar su visiÃ³n aumentada panorÃ¡mica y regular el flujo de medicamentos que recibe por vÃ­a intravenosa, todo ello sin necesidad de mover un solo mÃºsculo. Es el equivalente conceptual exacto de un moderno sistema BCI invasivo como el Utah Array.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El Utah Array, desarrollado por Richard Normann en la Universidad de Utah, es un chip de silicio de apenas 4 x 4 milÃ­metros que contiene 100 micro-electrodos independientes de 1.5 mm de longitud, recubiertos de platino e iridio. Aprobado por la FDA para ensayos clÃ­nicos, ha sido implantado en mÃ¡s de 30 pacientes con parÃ¡lisis. Cada electrodo puede registrar seÃ±ales de neuronas individuales a frecuencias de hasta 30,000 muestras por segundo, proporcionando suficiente resoluciÃ³n para decodificar intenciones motoras complejas como la escritura manual imaginada.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'La forma mÃ¡s comÃºn y no invasiva de leer la actividad cerebral es la electroencefalografÃ­a (EEG), inventada en 1924 por el neurÃ³logo alemÃ¡n Hans Berger. Consiste en una malla o gorro elÃ¡stico con entre 16 y 256 pequeÃ±os electrodos circulares de plata-cloruro de plata que se pegan al cuero cabelludo. Estos sensores miden las ondas elÃ©ctricas producidas por la actividad sincronizada de millones de neuronas, desde las ondas alfa (relajaciÃ³n) hasta las ondas gamma (concentraciÃ³n intensa), todo sin necesidad de ninguna cirugÃ­a.' 
      }
    ],
    fact: 'En 2021, investigadores de Stanford publicaron en Nature que un paciente tetraplÃ©jico con un implante BCI logrÃ³ escribir texto a una velocidad de 90 caracteres por minuto (equivalente a 18 palabras), simplemente imaginando que trazaba letras con la mano. El sistema de inteligencia artificial decodificÃ³ sus seÃ±ales cerebrales con un 94.1% de precisiÃ³n, acercÃ¡ndose a la velocidad de escritura normal en un telÃ©fono mÃ³vil.'
  },
  {
    id: 'regeneracion-tejidos',
    title: 'Tanques de Bacta: RegeneraciÃ³n Celular',
    color: '#C62828',
    btnImage: '/assets/starwars/infographic_vader/btn_regeneracion_tejidos.png',
    image: '/assets/starwars/infographic_vader/hero_regeneracion_tejidos.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_regeneracion_tejidos.png',
    bannerCaption: "La medicina regenerativa emplea cÃ©lulas madre y bioandamios para reconstruir tejidos daÃ±ados como cartÃ­lago y piel.",
    content: [
      "En el universo de Star Wars, cuando un personaje resulta gravemente herido, quemado por lava o mutilado en combate, la soluciÃ³n mÃ©dica galÃ¡ctica es sumergirlo durante horas en un enorme tanque vertical lleno de un misterioso lÃ­quido azulado llamado Bacta. Este gel biolÃ³gico ficticio acelera la regeneraciÃ³n de tejidos daÃ±ados, cierra heridas y repara quemaduras a una velocidad que harÃ­a llorar de envidia a cualquier cirujano terrestre. Aunque parezca pura fantasÃ­a, la ciencia real de la medicina regenerativa estÃ¡ trabajando para crear algo parecido: terapias que estimulen al cuerpo humano para repararse a sÃ­ mismo de maneras que antes se consideraban completamente imposibles.",
      "El equivalente terrestre mÃ¡s cercano al Bacta son las cÃ©lulas madre. Piensa en ellas como las piezas de LEGO mÃ¡s versÃ¡tiles del cuerpo: son cÃ©lulas que todavÃ­a no se han especializado y que pueden transformarse en casi cualquier tipo de tejido que el organismo necesite. Las cÃ©lulas madre embrionarias pueden convertirse en neuronas, cÃ©lulas musculares, cÃ©lulas de la piel, cartÃ­lago, hueso o incluso cÃ©lulas del corazÃ³n. En 2006, el cientÃ­fico japonÃ©s Shinya Yamanaka descubriÃ³ algo revolucionario: podÃ­a tomar cÃ©lulas adultas normales (como las de la piel) y reprogramarlas para que volvieran a ser cÃ©lulas madre. Las llamÃ³ iPSCs (cÃ©lulas madre pluripotentes inducidas), y este descubrimiento le valiÃ³ el Premio Nobel de Medicina en 2012.",
      "La bio-impresiÃ³n 3D es otra tecnologÃ­a que nos acerca al Bacta. Funciona exactamente como una impresora 3D normal, pero en lugar de plÃ¡stico, utiliza tintas biolÃ³gicas (bio-tintas) compuestas por hidrogeles biodegradables cargados con cÃ©lulas vivas del propio paciente. Capa por capa, la bio-impresora construye estructuras tridimensionales de tejido vivo: piel para cubrir quemaduras graves, cartÃ­lago para reparar articulaciones daÃ±adas, e incluso vasos sanguÃ­neos funcionales. En 2019, investigadores de la Universidad de Tel Aviv lograron bio-imprimir un mini-corazÃ³n del tamaÃ±o de una cereza usando cÃ©lulas cardÃ­acas humanas, completo con cÃ¡maras y vasos sanguÃ­neos.",
      "Los andamios o scaffolds de bioingenierÃ­a representan otro avance crucial. Son estructuras porosas tridimensionales fabricadas con materiales biodegradables como el Ã¡cido polilÃ¡ctico (PLA) o el colÃ¡geno, que sirven como esqueleto temporal para que las cÃ©lulas crezcan y se organicen formando nuevo tejido. Los mÃ©dicos siembran cÃ©lulas madre del paciente sobre estos andamios, los nutren con factores de crecimiento especÃ­ficos, y el resultado es un parche de tejido vivo que puede implantarse quirÃºrgicamente. En 2023, cientÃ­ficos del Hospital General de Massachusetts cultivaron una oreja humana completa en un andamio de colÃ¡geno y la trasplantaron exitosamente a una paciente que habÃ­a nacido con microtia.",
      "Aunque todavÃ­a no tenemos tanques gigantes de inmersiÃ³n total como en Star Wars, los principios fundamentales son los mismos: acelerar la capacidad natural del cuerpo para curarse. Las terapias con plasma rico en plaquetas (PRP) ya se usan rutinariamente en hospitales de todo el mundo. Consisten en extraer sangre del paciente, centrifugarla para concentrar las plaquetas (que contienen factores de crecimiento naturales) e inyectar ese concentrado directamente en la zona daÃ±ada. Deportistas de Ã©lite como Rafael Nadal y Tiger Woods han utilizado PRP para recuperarse de lesiones musculares y tendinosas que antes requerÃ­an meses de rehabilitaciÃ³n."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En Rogue One: Una Historia de Star Wars (2016), vemos a Darth Vader sin su armadura, flotando con su cuerpo destruido dentro de un enorme tanque de Bacta en su castillo de Mustafar. Esta escena perturbadora revela las terribles quemaduras que Anakin sufriÃ³ en su duelo contra Obi-Wan Kenobi junto a los rÃ­os de lava. TambiÃ©n en El Imperio Contraataca (1980), Luke Skywalker es sumergido en un tanque de Bacta en la base rebelde de Hoth tras ser atacado por un Wampa, mostrando cÃ³mo esta tecnologÃ­a sana heridas profundas en cuestiÃ³n de horas.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En las unidades de grandes quemados de hospitales especializados, los cirujanos utilizan sustitutos dÃ©rmicos como Integra (una matriz de colÃ¡geno bovino y condroitina-6-sulfato) y Apligraf (piel artificial cultivada con fibroblastos y queratinocitos humanos vivos). Estas tecnologÃ­as permiten recubrir quemaduras de tercer grado cuando no hay suficiente piel sana del paciente para hacer injertos. La piel bio-ingenierizada proporciona una barrera temporal mientras el cuerpo regenera su propia dermis por debajo, reduciendo la mortalidad por infecciÃ³n en pacientes con quemaduras extensas.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'El ajolote mexicano (Ambystoma mexicanum) es el campeÃ³n mundial de la regeneraciÃ³n animal. Este anfibio acuÃ¡tico rosado, originario de los canales de Xochimilco en la Ciudad de MÃ©xico, puede regenerar completamente sus patas, cola, mandÃ­bula, corazÃ³n, mÃ©dula espinal e incluso partes de su cerebro sin formar cicatrices. Los cientÃ­ficos estudian los genes del ajolote para entender cÃ³mo activa programas regenerativos que los mamÃ­feros hemos perdido durante la evoluciÃ³n, con la esperanza de algÃºn dÃ­a aplicar esos mecanismos a la medicina humana.' 
      }
    ],
    fact: 'En 2006, Shinya Yamanaka descubriÃ³ que cuatro genes especÃ­ficos (Oct4, Sox2, Klf4 y c-Myc) pueden reprogramar cÃ©lulas adultas comunes para convertirlas en cÃ©lulas madre pluripotentes inducidas (iPSCs), capaces de transformarse en cualquier tipo de tejido. Este descubrimiento le valiÃ³ el Premio Nobel de Medicina en 2012 y abriÃ³ la puerta a la medicina regenerativa personalizada sin necesidad de embriones.'
  },
  {
    id: 'respiracion-asistida',
    title: 'La RespiraciÃ³n de Vader',
    color: '#78909C',
    btnImage: '/assets/starwars/infographic_vader/btn_respiracion_asistida.png',
    image: '/assets/starwars/infographic_vader/hero_respiracion_asistida.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_respiracion_asistida.png',
    bannerCaption: "Los ventiladores mecÃ¡nicos administran ciclos de presiÃ³n positiva para asistir o reemplazar la respiraciÃ³n pulmonar.",
    content: [
      "Ese sonido rÃ­tmico, profundo y aterrador que escuchas cada vez que Darth Vader aparece en pantalla es probablemente el efecto sonoro mÃ¡s reconocible de toda la historia del cine. Pero detrÃ¡s de ese inquietante silbido mecÃ¡nico hay una realidad mÃ©dica muy concreta: lo que estÃ¡s escuchando es esencialmente un ventilador mecÃ¡nico. El traje negro de Vader funciona como un sistema de soporte vital portÃ¡til que fuerza aire presurizado y enriquecido con oxÃ­geno hacia el interior de sus pulmones severamente daÃ±ados por las quemaduras que sufriÃ³ en Mustafar, exactamente igual que las mÃ¡quinas de ventilaciÃ³n asistida que salvan miles de vidas cada dÃ­a en los hospitales de todo el mundo.",
      "En las Unidades de Cuidados Intensivos (UCI), los ventiladores mecÃ¡nicos son equipos fundamentales que sostienen la vida de pacientes que no pueden respirar por sÃ­ mismos. Funcionan generando una presiÃ³n positiva que empuja una mezcla calibrada de oxÃ­geno y aire a travÃ©s de un tubo endotraqueal insertado en la trÃ¡quea del paciente. Los ventiladores modernos, como el Hamilton C6 o el Draeger V500, son computadoras sofisticadas que monitorizan en tiempo real mÃ¡s de 50 parÃ¡metros respiratorios: volumen de aire, frecuencia, presiÃ³n, niveles de CO2 y saturaciÃ³n de oxÃ­geno. Pueden detectar cuÃ¡ndo el paciente intenta respirar por su cuenta y sincronizarse con su esfuerzo natural.",
      "Para los pacientes con fallo pulmonar extremo, donde ni siquiera el ventilador mÃ¡s potente puede oxigenar la sangre adecuadamente, existe una tecnologÃ­a de Ãºltimo recurso llamada ECMO (OxigenaciÃ³n por Membrana ExtracorpÃ³rea). Es literalmente un pulmÃ³n artificial externo al cuerpo. La mÃ¡quina ECMO extrae sangre venosa del paciente a travÃ©s de una cÃ¡nula gruesa, la hace pasar por una membrana especial de polimetilpenteno donde se le agrega oxÃ­geno y se le retira diÃ³xido de carbono, y luego devuelve esa sangre ya oxigenada al cuerpo. Durante la pandemia de COVID-19, la ECMO salvÃ³ la vida de miles de pacientes con neumonÃ­a severa cuyos pulmones habÃ­an dejado de funcionar casi por completo.",
      "La historia de la ventilaciÃ³n mecÃ¡nica es una de las mÃ¡s dramÃ¡ticas de la medicina. Todo comenzÃ³ durante las devastadoras epidemias de poliomielitis de las dÃ©cadas de 1940 y 1950, cuando el virus atacaba las neuronas motoras del tronco cerebral y paralizaba los mÃºsculos respiratorios. Los mÃ©dicos inventaron los llamados Pulmones de Acero: enormes cilindros metÃ¡licos sellados donde se introducÃ­a al paciente entero (excepto la cabeza). Una bomba creaba presiÃ³n negativa dentro del cilindro, expandiendo el pecho del paciente y forzÃ¡ndolo a inhalar. En el pico de la epidemia de 1952 en Copenhague, el hospital Blegdam tenÃ­a tantos pacientes que 1,500 estudiantes de medicina se turnaron dÃ­a y noche para ventilar manualmente a los enfermos con bolsas de goma.",
      "Los ventiladores portÃ¡tiles modernos que llevan los paramÃ©dicos en las ambulancias son maravillas de la miniaturizaciÃ³n. Pesan apenas 2 a 5 kilogramos y funcionan con baterÃ­as recargables durante horas. CompÃ¡ralos con los Pulmones de Acero que pesaban mÃ¡s de 300 kilogramos y ocupaban una habitaciÃ³n entera. Los dispositivos mÃ¡s avanzados actuales, como el ventilador domÃ©stico Trilogy de Philips, permiten que pacientes con enfermedades neuromusculares como la ELA (Esclerosis Lateral AmiotrÃ³fica) o distrofia muscular vivan en sus hogares con asistencia respiratoria continua, conectados a una mÃ¡quina del tamaÃ±o de una mochila que les proporciona cada respiro, de dÃ­a y de noche, igual que el traje de Vader."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'La icÃ³nica respiraciÃ³n mecÃ¡nica de Darth Vader fue creada por el legendario diseÃ±ador de sonido Ben Burtt para la pelÃ­cula original de 1977. Burtt no usÃ³ ningÃºn equipo mÃ©dico sofisticado: simplemente tomÃ³ un regulador de presiÃ³n de un tanque de buceo antiguo y respirÃ³ a travÃ©s de Ã©l frente a un micrÃ³fono, modificando la velocidad y el tono hasta conseguir ese ritmo lento, pesado y amenazante. IrÃ³nicamente, el sonido que aterroriza a toda una galaxia se creÃ³ con un equipo de buceo barato y un poco de creatividad, pero es mÃ©dicamente preciso en su representaciÃ³n de un respirador mecÃ¡nico de presiÃ³n positiva.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La tecnologÃ­a ECMO (OxigenaciÃ³n por Membrana ExtracorpÃ³rea) puede mantener vivo a un paciente durante semanas o incluso meses cuando sus pulmones han dejado de funcionar. La sangre circula a un flujo de 3 a 7 litros por minuto a travÃ©s de una membrana de polimetilpenteno (PMP) de 0.03 milÃ­metros de grosor, donde el oxÃ­geno se difunde hacia los glÃ³bulos rojos y el diÃ³xido de carbono se elimina. Durante la pandemia de COVID-19, el uso de ECMO aumentÃ³ un 1,100% en algunos hospitales, salvando pacientes con neumonÃ­a bilateral grave que no respondÃ­an a la ventilaciÃ³n convencional.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Los Pulmones de Acero, inventados en 1928 por Philip Drinker y Louis Agassiz Shaw en la Universidad de Harvard, funcionaban creando presiÃ³n negativa alrededor del cuerpo del paciente. El paciente quedaba sellado dentro de un cilindro metÃ¡lico con solo la cabeza afuera, y una bomba elÃ©ctrica alternaba entre succionar y liberar el aire, expandiendo y comprimiendo el pecho rÃ­tmicamente. En el pico de las epidemias de polio, salas enteras de hospitales estaban llenas de filas de estos enormes cilindros metÃ¡licos, y algunos pacientes vivieron dÃ©cadas enteras dentro de ellos.' 
      }
    ],
    fact: 'El sonido de la respiraciÃ³n de Vader es mÃ©dicamente equivalente a un ventilador BiPAP (presiÃ³n positiva de dos niveles en vÃ­as aÃ©reas), que alterna entre una presiÃ³n alta durante la inhalaciÃ³n y una presiÃ³n baja durante la exhalaciÃ³n. Esta misma tecnologÃ­a se usa hoy en ventiladores portÃ¡tiles para pacientes con ELA, distrofia muscular y apnea severa del sueÃ±o, permitiÃ©ndoles respirar en sus hogares las 24 horas del dÃ­a.'
  },
  {
    id: 'cyborgs-futuro',
    title: 'Cyborgs: El Futuro de la Humanidad',
    color: '#E53935',
    btnImage: '/assets/starwars/infographic_vader/btn_cyborgs_futuro.png',
    image: '/assets/starwars/infographic_vader/hero_cyborgs_futuro.png',
    bannerImage: '/assets/starwars/infographic_vader/banner_cyborgs_futuro.png',
    bannerCaption: "El concepto de cyborg, acuÃ±ado en 1960 por Clynes y Kline, explora la integraciÃ³n de tecnologÃ­a con biologÃ­a humana.",
    content: [
      "Darth Vader plantea una de las preguntas filosÃ³ficas mÃ¡s profundas de toda la saga: cuando reemplazas tus brazos, tus piernas, tus pulmones y casi todo tu cuerpo por mÃ¡quinas, en quÃ© momento dejas de ser humano y te conviertes en algo diferente. La palabra cyborg (organismo cibernÃ©tico) fue inventada en 1960 por los cientÃ­ficos Manfred Clynes y Nathan Kline en un artÃ­culo para la NASA, donde proponÃ­an modificar el cuerpo humano con tecnologÃ­a para que pudiera sobrevivir en el espacio sin necesidad de trajes espaciales. La idea era simple pero revolucionaria: en lugar de cambiar el ambiente para adaptarlo al humano, cambiar al humano para adaptarlo al ambiente.",
      "Lo que mucha gente no sabe es que millones de personas en el mundo ya son tÃ©cnicamente cyborgs. Si tienes un marcapasos cardÃ­aco (un dispositivo electrÃ³nico del tamaÃ±o de una moneda grande implantado bajo la piel que envÃ­a pulsos elÃ©ctricos para regular el ritmo del corazÃ³n), eres un cyborg. Si llevas un implante coclear (un electrodo insertado en la cÃ³clea del oÃ­do interno que convierte sonidos en seÃ±ales elÃ©ctricas enviadas directamente al nervio auditivo), eres un cyborg. Solo en Estados Unidos, mÃ¡s de 3 millones de personas llevan marcapasos y unas 120,000 tienen implantes cocleares. Estos dispositivos demuestran que la fusiÃ³n entre biologÃ­a y tecnologÃ­a ya no es ciencia ficciÃ³n, sino medicina cotidiana.",
      "Neil Harbisson es quizÃ¡s el cyborg mÃ¡s famoso del mundo y el primero reconocido oficialmente por un gobierno. Nacido con acromatopsia (incapacidad total para ver colores), Harbisson se implantÃ³ permanentemente en el crÃ¡neo una antena llamada Eyeborg que convierte las frecuencias de luz de los colores en vibraciones sonoras que su cerebro ha aprendido a interpretar. Su pasaporte britÃ¡nico lo muestra con la antena, siendo la primera persona en la historia cuya foto oficial de identificaciÃ³n incluye un dispositivo cibernÃ©tico como parte integral de su identidad. Harbisson no solo percibe los colores visibles sino tambiÃ©n frecuencias ultravioleta e infrarrojas que ningÃºn ojo humano puede detectar.",
      "El campo del biohacking o grinder lleva esta filosofÃ­a al extremo. Miles de entusiastas alrededor del mundo se implantan voluntariamente pequeÃ±os chips NFC o RFID bajo la piel de las manos para abrir puertas, desbloquear telÃ©fonos o almacenar datos mÃ©dicos. Algunos se insertan imanes de neodimio en las yemas de los dedos para sentir campos electromagnÃ©ticos invisibles. La empresa sueca Biohax International ha implantado chips a mÃ¡s de 4,000 personas, permitiÃ©ndoles pagar en tiendas, acceder a edificios y viajar en tren con solo acercar la mano a un lector. Esta comunidad argumenta que la integraciÃ³n voluntaria de tecnologÃ­a en el cuerpo es la siguiente etapa natural de la evoluciÃ³n humana.",
      "Sin embargo, la transformaciÃ³n de Vader tambiÃ©n nos advierte sobre los peligros de perder nuestra humanidad en el proceso. La bioÃ©tica moderna debate intensamente hasta dÃ³nde debemos llegar: si es aceptable mejorar un cuerpo sano (no solo reparar uno daÃ±ado), quiÃ©n tendrÃ­a acceso a estas mejoras y si podrÃ­an crear una desigualdad entre humanos aumentados y humanos naturales. El filÃ³sofo Nick Bostrom de la Universidad de Oxford llama a esto transhumanismo, y predice que para el aÃ±o 2050 la tecnologÃ­a permitirÃ¡ aumentar significativamente la inteligencia, la fuerza y la longevidad humanas. La pregunta que Vader nos obliga a hacernos sigue vigente: al ganar poderes sobrehumanos a travÃ©s de la tecnologÃ­a, corremos el riesgo de perder algo esencialmente humano en el camino."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Obi-Wan Kenobi resume la tragedia de la transformaciÃ³n de Anakin con una de las frases mÃ¡s memorables de la saga: "Ã‰l es mÃ¡s mÃ¡quina que hombre ahora, retorcido y malvado." Esta frase, pronunciada en El Retorno del Jedi (1983), plantea la pregunta central del transhumanismo: al reemplazar progresivamente cada parte del cuerpo biolÃ³gico con componentes mecÃ¡nicos, Vader perdiÃ³ no solo su cuerpo sino tambiÃ©n su conexiÃ³n con su humanidad y sus emociones. Solo en sus momentos finales, al salvar a Luke, demuestra que la chispa humana nunca se extinguiÃ³ completamente bajo toda esa armadura de durasteel.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Los implantes cocleares modernos, como el Nucleus 8 de Cochlear Limited, contienen un procesador externo con 22 canales de frecuencia que convierte las ondas sonoras en seÃ±ales elÃ©ctricas codificadas. Un transmisor magnÃ©tico envÃ­a estas seÃ±ales a un receptor implantado bajo la piel, que las transmite a 22 electrodos de platino insertados en la cÃ³clea del oÃ­do interno. Estos electrodos estimulan directamente las fibras del nervio auditivo, permitiendo que personas con sordera profunda perciban el habla y los sonidos ambientales. MÃ¡s de 1 millÃ³n de implantes cocleares se han colocado en todo el mundo desde 1984.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Neil Harbisson, nacido en 1984 con acromatopsia total (ve solo en blanco y negro), se convirtiÃ³ en 2004 en el primer cyborg legalmente reconocido cuando el gobierno britÃ¡nico aceptÃ³ que su antena Eyeborg apareciera en su foto de pasaporte. La antena, implantada permanentemente en su crÃ¡neo mediante osteointegraciÃ³n, convierte cada color en una vibraciÃ³n sonora Ãºnica: el rojo suena como una nota Fa, el verde como un La, y el azul como un Do. Harbisson puede incluso percibir colores ultravioleta e infrarrojos que ningÃºn humano normal puede ver, superando las capacidades biolÃ³gicas naturales.' 
      }
    ],
    fact: 'La palabra cyborg fue acuÃ±ada en 1960 por Manfred Clynes y Nathan Kline en su artÃ­culo "Cyborgs and Space" para la revista Astronautics. Hoy, mÃ¡s de 4 millones de personas en el mundo llevan dispositivos implantados permanentemente (marcapasos, implantes cocleares, bombas de insulina, estimuladores cerebrales profundos), lo que los convierte tÃ©cnicamente en organismos cibernÃ©ticos: seres donde la biologÃ­a y la tecnologÃ­a se fusionan para mantener o mejorar funciones vitales.'
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
          right: '5px',
          background: node.color,
          borderRadius: '50%',
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
            <span>INTEGRACIÃ“N CIBERNÃ‰TICA</span>
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
              Â¡ANÃLISIS BIOMÃ‰DICO COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>


        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>BIBLIOGRAFÃA ACADÃ‰MICA (ARCHIVOS IMPERIALES)</h3>
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
