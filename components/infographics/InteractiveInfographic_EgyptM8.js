'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoSunRay({ size = 70, color = '#FF9A3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ opacity: 0.22, ...style }}>
      {/* Sun circle */}
      <circle cx="35" cy="35" r="10" fill={color} opacity="0.6" />
      <circle cx="35" cy="35" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Rays */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const r = Math.PI * deg / 180;
        const x1 = 35 + 18 * Math.cos(r), y1 = 35 + 18 * Math.sin(r);
        const x2 = 35 + 30 * Math.cos(r), y2 = 35 + 30 * Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? 2 : 1} opacity={i % 3 === 0 ? 0.6 : 0.3} strokeLinecap="round" />;
      })}
    </svg>
  );
}

function DecoTemple({ size = 80, color = '#FF9A3C', style = {} }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 80 72" style={{ opacity: 0.2, ...style }}>
      {/* Mountain/cliff */}
      <path d="M2 70 Q20 20 38 15 Q56 20 78 70Z" fill={color} opacity="0.12" stroke={color} strokeWidth="1" />
      {/* Temple facade cut into mountain */}
      <rect x="24" y="40" width="32" height="30" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Door */}
      <rect x="34" y="52" width="12" height="18" rx="1" fill={color} opacity="0.4" />
      {/* 4 colossal statues (simplified) */}
      {[26, 32, 44, 50].map((x, i) => (
        <g key={i}>
          <rect x={x} y="42" width="4" height="10" rx="1" fill={color} opacity="0.5" />
          <circle cx={x + 2} cy="41" r="2.5" fill={color} opacity="0.6" />
        </g>
      ))}
      {/* Sun beam entering door */}
      <line x1="38" y1="54" x2="10" y2="30" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
      {/* Sun on horizon */}
      <circle cx="8" cy="28" r="5" fill={color} opacity="0.4" />
      {/* Light glow inside temple */}
      <circle cx="40" cy="60" r="4" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoCorridor({ size = 70, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" style={{ opacity: 0.2, ...style }}>
      {/* Corridor perspective lines */}
      <line x1="5" y1="5" x2="30" y2="15" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="5" y1="30" x2="30" y2="20" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="15" x2="30" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Inner chamber */}
      <ellipse cx="55" cy="17" rx="14" ry="16" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Light beam */}
      <line x1="5" y1="17" x2="55" y2="17" stroke={color} strokeWidth="2" strokeDasharray="3 2" opacity="0.5" />
      <circle cx="55" cy="17" r="5" fill={color} opacity="0.35" />
      {/* Hieroglyphic marks on walls */}
      {[12, 18, 24].map((y, i) => (
        <rect key={i} x="6" y={y} width="4" height="2" rx="0.5" fill={color} opacity="0.2" />
      ))}
    </svg>
  );
}

function DecoStatue({ size = 60, color = '#FF9A3C', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" style={{ opacity: 0.2, ...style }}>
      {/* Pharaoh seated statue */}
      <rect x="12" y="18" width="16" height="28" rx="2" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <circle cx="20" cy="12" r="8" fill={color} opacity="0.3" />
      {/* Double crown (nemes headdress) */}
      <path d="M12 12 Q20 4 28 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Hands on knees */}
      <rect x="11" y="32" width="7" height="5" rx="1" fill={color} opacity="0.3" />
      <rect x="22" y="32" width="7" height="5" rx="1" fill={color} opacity="0.3" />
      {/* Crook and flail symbols */}
      <line x1="22" y1="22" x2="22" y2="16" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="18" y1="22" x2="16" y2="16" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Base */}
      <rect x="8" y="46" width="24" height="6" rx="1" fill={color} opacity="0.3" />
      {/* Glowing halo (divine light) */}
      <circle cx="20" cy="12" r="12" fill={color} opacity="0.07" />
    </svg>
  );
}

function DecoCompassAngle({ size = 65, color = '#FF9A3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 65 65" style={{ opacity: 0.2, ...style }}>
      {/* Protractor-like arc */}
      <path d="M5 55 A 45 45 0 0 1 60 55" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Angle lines */}
      <line x1="5" y1="55" x2="30" y2="15" stroke={color} strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      <line x1="5" y1="55" x2="55" y2="55" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Angle arc */}
      <path d="M22 55 A 18 18 0 0 1 11 33" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Degree marks */}
      {[10, 20, 30, 40].map((d, i) => {
        const r = Math.PI * (180 - d * 4.5) / 180;
        return <line key={i} x1={5 + 40 * Math.cos(r)} y1={55 + 40 * Math.sin(r)} x2={5 + 45 * Math.cos(r)} y2={55 + 45 * Math.sin(r)} stroke={color} strokeWidth="1" opacity="0.3" />;
      })}
      {/* Sun on angle */}
      <circle cx="30" cy="15" r="5" fill={color} opacity="0.5" />
      <text x="20" y="46" fontSize="8" fill={color} opacity="0.6" fontFamily="monospace">22°</text>
    </svg>
  );
}

function DecoUNESCO({ size = 65, color = '#FF9A3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 65 65" style={{ opacity: 0.2, ...style }}>
      {/* Globe */}
      <circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Latitude lines */}
      <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <ellipse cx="32" cy="22" rx="20" ry="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <ellipse cx="32" cy="42" rx="20" ry="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Meridian */}
      <line x1="32" y1="6" x2="32" y2="58" stroke={color} strokeWidth="1" opacity="0.25" />
      {/* Olive branch wreath */}
      <path d="M8 52 Q12 42 20 38" fill="none" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M57 52 Q53 42 45 38" fill="none" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      {/* Star */}
      <circle cx="32" cy="32" r="4" fill={color} opacity="0.4" />
      {/* Shield/heritage symbol */}
      <path d="M26 20 L39 20 L39 30 Q32 36 26 30Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoSandstone({ size = 70, color = '#D4A843', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* Sandstone rock layers */}
      <rect x="2" y="4" width="66" height="10" rx="2" fill={color} opacity="0.35" stroke={color} strokeWidth="0.8" />
      <rect x="4" y="15" width="62" height="9" rx="2" fill={color} opacity="0.28" stroke={color} strokeWidth="0.8" />
      <rect x="2" y="25" width="66" height="10" rx="2" fill={color} opacity="0.35" stroke={color} strokeWidth="0.8" />
      {/* Mineral crystal glints */}
      {[{x:15,y:8},{x:35,y:8},{x:55,y:8},{x:25,y:19},{x:48,y:19},{x:18,y:30},{x:42,y:30},{x:60,y:30}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} opacity="0.7" />
      ))}
      {/* Light reflection on surface */}
      <line x1="5" y1="6" x2="30" y2="6" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="40" y1="6" x2="65" y2="6" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function DecoNefertari({ size = 60, color = '#FF9A3C', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.2, ...style }}>
      {/* Queen figure with double-feather crown */}
      <rect x="14" y="18" width="12" height="24" rx="2" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <circle cx="20" cy="12" r="7" fill={color} opacity="0.3" />
      {/* Feather crown (Maat feathers) */}
      <line x1="17" y1="5" x2="15" y2="-2" stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="23" y1="5" x2="25" y2="-2" stroke={color} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <ellipse cx="15" cy="-3" rx="2" ry="4" fill={color} opacity="0.35" />
      <ellipse cx="25" cy="-3" rx="2" ry="4" fill={color} opacity="0.35" />
      {/* Ankh */}
      <ellipse cx="24" cy="26" rx="2.5" ry="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="24" y1="29" x2="24" y2="36" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      <line x1="20" y1="31" x2="28" y2="31" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      {/* Hathor horns + sun disk */}
      <path d="M11 10 Q13 6 20 8 Q27 6 29 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="20" cy="7" r="3" fill={color} opacity="0.3" />
      {/* Base */}
      <rect x="11" y="42" width="18" height="5" rx="1" fill={color} opacity="0.3" />
    </svg>
  );
}

// â”€â”€â”€ Deco map per node â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DECO_MAP = {
  'fenomeno': [DecoSunRay, DecoCorridor, DecoTemple],
  'colosos': [DecoStatue, DecoTemple, DecoSunRay],
  'ingenieria': [DecoCompassAngle, DecoCorridor, DecoSunRay],'ramses': [DecoStatue, DecoCompassAngle, DecoTemple],
  'arenisca': [DecoSandstone, DecoTemple, DecoSunRay],
  'rescate': [DecoUNESCO, DecoTemple, DecoCorridor],
  'nefertari': [DecoNefertari, DecoSunRay, DecoTemple],
  'legado': [DecoUNESCO, DecoStatue, DecoSunRay],
};

// â”€â”€â”€ Infographic Node Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Kitchen, K.A. (1982). Pharaoh Triumphant: The Life and Times of Ramesses II, Aris & Phillips',
  'Desroches-Noblecourt, C. (1997). Le Fabuleux Heritage de l\'Egypte, Schwartz',
  'UNESCO (1980). The Salvage of the Abu Simbel Temples, UNESCO',
  'Hawass, Z. (2000). The Mysteries of Abu Simbel, AUC Press',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "fenomeno",
    "bannerImage": "/assets/egypt/infographic_m8/banner_agricultura-egipcia.webp",
    "title": "El Fenómeno Solar",
    "color": "#FF9A3C",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_fenomeno.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_fenomeno.webp",
    "content": [
      "El fenómeno solar del Gran Templo de Abu Simbel constituye uno de los ejemplos más extraordinarios de arqueoastronomía de la civilización faraónica. Dos veces al año, los primeros rayos del sol naciente penetran a través de la estrecha entrada exterior y recorren exactamente sesenta y cinco metros a través de la gran sala hipóstila, el vestíbulo y la antecámara hasta alcanzar el sanctasanctórum tallado en la roca viva. Este acontecimiento lumínico no ocurre por azar, sino mediante un cálculo geodésico milimétrico.",
      "En el santuario más profundo esperan cuatro estatuas sedentes esculpidas en el lecho rocoso: el dios Ra-Horakhty, el propio faraón divinizado Ramsés II, el dios tebano Amun-Ra y el dios menfita Ptah. Cuando el haz de luz solar penetra en la penumbra del recinto sagrado, baña e ilumina de forma secuencial las figuras de Ra-Horakhty, Ramsés II y Amun-Ra durante aproximadamente veinte minutos. En marcado contraste, la estatua de Ptah permanece siempre en una sombra parcial o penumbra casi total.",
      "La exclusión lumínica de Ptah encierra un profundo simbolismo teológico y cosmológico dentro del pensamiento religioso del Imperio Nuevo. Ptah era la deidad tutelar de los artesanos y el señor del inframundo subterráneo, cuyo dominio residía en la oscuridad primordial y el silencio absoluto anterior a la creación. Iluminar a Ptah con la radiación directa del disco solar habría contradicho su naturaleza esencial como dios de las profundidades terrestres y la noche eterna.",
      "Históricamente, los egiptólogos han vinculado estas dos fechas de iluminación con dos aniversarios cruciales para el reinado de Ramsés II: el día de su nacimiento y el día de su coronación oficial como soberano del Alto y Bajo Egipto. Aunque la documentación epigráfica exacta de ambas efemérides sigue sujeta a interpretaciones cronológicas, las fechas originales correspondían al veintiuno de octubre y al veintiuno de febrero según el calendario juliano astronómico proléptico.",
      "Tras la colosal reubicación del templo en la década de 1960 para salvarlo de las aguas del lago Nasser, el fenómeno solar experimentó un desfase inevitable de veinticuatro horas. En la actualidad, el alineamiento solar se produce cada año el veintidós de octubre y el veintidós de febrero. A pesar de esa ligera variación temporal inducida por el traslado técnico del acantilado artificial, miles de visitantes y científicos se congregan puntualmente para admirar esta comunión magistral entre la piedra y el Sol."
    ],
    "fact": "El haz de luz solar recorre exactamente sesenta y cinco metros desde el dintel de acceso hasta el sanctasanctórum, iluminando un área focal de apenas dos metros y medio de anchura durante un intervalo cronometrado de diecinueve minutos cada veintidós de febrero y veintidós de octubre, fechas tradicionalmente vinculadas al nacimiento y coronación de Ramsés II.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La orientación de la fachada del Gran Templo está desviada exactamente diez coma cinco grados al sur del este verdadero. Esta ligera inclinación angular fue calculada deliberadamente por los agrimensores de Ramsés II para compensar la altura de las colinas situadas al otro lado del Nilo y permitir que los rayos del sol naciente entraran directos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La penetración de la luz sigue las leyes de la óptica geométrica en línea recta a través de vanos colineales sucesivos. El estrechamiento paulatino de los portales interiores actúa como un colimador óptico natural, permitiendo que únicamente un haz con un ángulo azimutal idéntico al vector solar del amanecer ilumine el sanctasanctórum."
      }
    ]
  },
  {
    "id": "colosos",
    "bannerImage": "/assets/egypt/infographic_m8/banner_calendario-agricola.webp",
    "title": "Los Cuatro Colosos",
    "color": "#FF8C00",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_colosos.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_colosos.webp",
    "content": [
      "La fachada monumental del Gran Templo de Abu Simbel está dominada por cuatro estatuas colosales de Ramsés II esculpidas directamente en la pared vertical de arenisca del acantilado de Meha. Con una altura asombrosa de veinte metros cada una, estas esculturas monolíticas reciben a los navegantes que surcan el río Nilo desde el sur, funcionando como una imponente declaración de soberanía militar y teológica egipcia sobre el territorio subyugado de Nubia.",
      "Cada coloso muestra al soberano entronizado con las manos apoyadas sobre los muslos, portando la doble corona de Nemes y el ureus sagrado que protegía la frente del faraón contra sus enemigos. Las estatuas se organizan en dos parejas a ambos lados de la entrada central. Entre los pies y junto a las piernas de los colosos aparecen esculpidas en bulto redondo figuras de menor escala que representan a la madre real Tuya, a la reina consorte Nefertari y a varios de los hijos primogénitos de la corte.",
      "El segundo coloso situado a la izquierda de la entrada sufrió un cataclismo sísmico devastador en el año treinta y cuatro del reinado de Ramsés II, correspondiente aproximadamente al 1245 antes de nuestra era. Un violento terremoto provocó la fractura de la mitad superior de la estatua, haciendo que el torso y la cabeza se desplomaran sobre la terraza inferior de la explanada. Los ingenieros del faraón decidieron no reconstruir el gigante caído, respetando la voluntad de los dioses manifestada a través del sismo.",
      "Durante la titánica campaña de rescate arqueológico de la UNESCO en la década de 1960, los ingenieros modernos y los egiptólogos debatieron intensamente si debían recolocar la cabeza caída en su posición original sobre los hombros del coloso. Por acuerdo unánime de los comités de patrimonio internacional, se decidió conservar los fragmentos fracturados en el suelo exactamente en la misma posición de derrumbe registrada durante tres milenios, respetando la historia geológica del yacimiento.",
      "Sobre la cornisa superior que corona la fachada monumental, una hilera de veintidós babuinos sagrados de dos metros y medio de altura esculpidos en la roca viva levanta sus brazos en adoración perpetua hacia el sol naciente. En la zoología sagrada egipcia, los babuinos eran los heraldos del dios solar Ra, ya que emiten ruidosos aullidos característicos durante los primeros rayos de la alborada, marcando el triunfo diario de la luz sobre las tinieblas cósmicas."
    ],
    "fact": "Cada uno de los cuatro colosos monolíticos posee una masa rocosa estimada en más de mil doscientas toneladas métricas, esculpidos con un ángulo de desplome de ochenta y dos grados hacia atrás para evitar deslizamientos gravitacionales en la pared del acantilado nubio, alcanzando más de veinte metros de altura desde la base del podio monumental.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A pesar de sus proporciones descomunales, las orejas de cada uno de los cuatro colosos de Ramsés II miden más de un metro de longitud y su boca supera los noventa centímetros de comisura a comisura. Los maestros canteros utilizaron cuerdas con nudos de codo real y plomadas de bronce para mantener la simetría anatómica perfecta en la arenisca."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La presión litostática ejercida por la masa rocosa sobre los colosos antes de su corte técnico superaba los dos megapascales. Para evitar que la roca colapsara al seccionarla, se inyectaron resinas poliméricas y morteros epóxicos fluidos en las microfracturas milenarias de la arenisca con presiones controladas de aire comprimido."
      }
    ]
  },
  {
    "id": "ingenieria",
    "bannerImage": "/assets/egypt/infographic_m8/banner_geometria-catastro.webp",
    "title": "Ingeniería Faraónica",
    "color": "#E8851A",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_ingenieria.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_ingenieria.webp",
    "content": [
      "La construcción del complejo subterráneo de Abu Simbel, catalogado tipológicamente como un speos o templo enteramente excavado en la roca viva, representó uno de los mayores desafíos técnicos y logísticos de la ingeniería del mundo antiguo. A diferencia de los templos convencionales construidos con bloques de piedra transportados y ensamblados en el exterior, aquí los maestros constructores debieron excavar hacia las entrañas de la montaña, vaciando miles de metros cúbicos de arenisca.",
      "Los topógrafos y agrimensores reales utilizaron el merkhet y la bay, dos instrumentos tradicionales de avistamiento astronómico, para trazar sobre la pared virgen del acantilado el eje direccional exacto que debía seguir la excavación. El túnel debía mantener una pendiente ascendente y una rectitud milimétrica a lo largo de decenas de metros en la más completa oscuridad, para que los rayos solares del amanecer pudieran alcanzar el santuario final sin ninguna desviación angular.",
      "Para iluminar el trabajo de los canteros en las galerías subterráneas sin saturar el aire con humo de antorchas, los obreros recurrieron a ingeniosos sistemas de mechas de lino alimentadas con aceite de sésamo y sal común. La adición de cloruro sódico a las lámparas reducía sustancialmente la emisión de hollín y partículas volátiles de carbono, preservando la visibilidad y evitando que los muros excavados se mancharan antes de recibir la capa de estuco y policromía.",
      "El vaciado de las cámaras se ejecutó de arriba hacia abajo mediante un método de terrazas escalonadas invertidas. Los canteros tallaban primero el techo de la sala para verificar la solidez estructural del estrato geológico superior. Posteriormente iban descendiendo, desbastando la arenisca circundante mientras reservaban bloques macizos intactos en el centro de las salas que luego serían esculpidos in situ como los ocho pilares osiríacos colosales de nueve metros de altura.",
      "La estabilidad estática del templo dependía de que los pilares soportaran el colosal peso litostático de la montaña suprayacente. Los calculistas egipcios sobredimensionaron deliberadamente las columnas cuadradas de la sala hipóstila principal, distribuyendo las cargas estructurales mediante arquitrabes de roca continua. Esta previsión arquitectónica permitió que el speos resistiera terremotos intensos y el peso de millones de toneladas de roca durante tres milenios continuos."
    ],
    "fact": "Los obreros de la Dinastía XIX extrajeron y desalojaron un volumen aproximado de quince mil quinientos metros cúbicos de roca arenisca viva del interior de la montaña, equivalentes a más de treinta y cinco mil toneladas de material pétreo retirado mediante capazos de esparto, trabajando con cinceles de bronce y mazos de madera dura bajo la luz de lucernas de aceite.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los canteros que excavaron Abu Simbel no utilizaban herramientas de hierro templado, sino cinceles forjados con aleaciones de bronce y arsénico o cobre endurecido por martilleo en frío, combinados con mazos pesados de madera de acacia y percutores esferoidales de dolerita traídos desde las canteras de Asuán."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La extracción de la arenisca se facilitaba introduciendo cuñas de madera seca de sicómoro en ranuras perimetrales practicadas en la roca. Al empapar periódicamente la madera con agua del Nilo, las fibras celulósicas se expandían hidroscópicamente generando presiones expansivas superiores a quince megapascales, fracturando la roca limpiamente."
      }
    ]
  },
  {
    "id": "ramses",
    "bannerImage": "/assets/egypt/infographic_m8/banner_impuestos-grano.webp",
    "title": "Ramsés el Grande",
    "color": "#FF7043",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_ramses.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_ramses.webp",
    "content": [
      "Ramsés II, perteneciente a la Dinastía XIX y proclamado con el nombre de entronización Usermaatra Setepenra, gobernó el Imperio Egipcio durante sesenta y seis años extraordinarios, desde 1279 hasta 1213 antes de nuestra era. Su reinado representó la cúspide del poder imperial, caracterizado por una colosal actividad constructiva en Tebas, Abidos, Pi-Ramsés y la frontera sur de Nubia. Abu Simbel fue concebido como el manifiesto definitivo de su propaganda ideológica y su autofinanciación divina.",
      "En los muros interiores de la gran sala hipóstila de Abu Simbel, el faraón ordenó esculpir en bajorrelieves policromados la crónica monumental de la Batalla de Kadesh, librada en el año cinco de su reinado contra el ejército del rey hitita Muwatalli II en las orillas del río Orontes. Aunque el combate fue un empate táctico que casi le cuesta la vida, la narrativa egipcia presentó la batalla como un triunfo personal absoluto en el que Ramsés, abandonado por sus tropas, invocó al dios Amun para vencer en solitario.",
      "El programa iconográfico del templo muestra una evolución teológica sin precedentes en la figura del monarca. En los relieves de las paredes exteriores e interiores, Ramsés II aparece ofreciendo incienso, libaciones y cautivos de guerra a las deidades tradicionales; sin embargo, en el sanctasanctórum y en diversos paneles rituales, el propio rey aparece adorando a su propia imagen divinizada, fusionándose con el principio cósmico de la realeza eterna y la luz solar vivificante.",
      "La longevidad de Ramsés II le permitió celebrar catorce fiestas de jubileo o Heb Sed a lo largo de su reinado. Esta ceremonia mágica y física tenía como objetivo revitalizar las energías vitales del faraón y renovar su pacto sagrado con el cosmos para garantizar la fertilidad de los campos egipcios y las crecidas regulares del Nilo. Muchos de los detalles arquitectónicos de Abu Simbel fueron diseñados para conmemorar perpetuamente la fuerza regenerativa acumulada durante estos rituales sed.",
      "La momia de Ramsés II, descubierta en 1881 en el escondrijo real de Deir el-Bahari (DB320) tras ser trasladada por sacerdotes de la Dinastía XXI para protegerla del saqueo de tumbas, reveló que el soberano falleció a una edad cercana a los noventa años. Sus restos físicos mostraron rasgos de un individuo robusto, pelirrojo natural y con una pronunciada artritis en la columna vertebral, testimonio biológico del líder que transformó el paisaje arquitectónico del Nilo."
    ],
    "fact": "Ramsés II engendró más de cien hijos e hijas durante sus seis décadas de reinado, celebrando catorce festividades del jubileo Heb Sed, superando en longevidad y número de monumentos erigidos a cualquier otro soberano de la historia del Egipto dinástico, consolidando una dinastía imperial que gobernó el Cercano Oriente con mano de hierro.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Ramsés II firmó en 1259 a.C. con el rey hitita Hattusili III el primer tratado de paz internacional documentado de la historia de la humanidad, grabado en planchas de plata y copiado en tablillas cuneiformes en Hattusa y en relieves de jeroglíficos en los muros del templo de Karnak y el Ramesseum, estableciendo una alianza defensiva mutua y la extradición reglamentada de refugiados políticos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 1976, la momia de Ramsés II fue trasladada a París para recibir un tratamiento urgente de radiación gamma con cobalto-60. El procedimiento esterilizó con éxito más de ochenta especies de hongos y microorganismos filamentosos que estaban degradando activamente los tejidos momificados en el Museo de El Cairo."
      }
    ]
  },
  {
    "id": "arenisca",
    "bannerImage": "/assets/egypt/infographic_m8/banner_legado-hidraulica.webp",
    "title": "La Arenisca Dorada",
    "color": "#D4870A",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_arenisca.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_arenisca.webp",
    "content": [
      "El material geológico que hace posible la monumentalidad y la policromía natural de Abu Simbel es la célebre arenisca nubia, perteneciente a la Formación Nubia del Cretácico Superior, depositada hace más de noventa millones de años por sistemas fluviales prehistóricos. Esta roca sedimentaria se compone principalmente de granos de cuarzo detrítico seleccionados por el viento y el agua, cementados de forma natural a lo largo de eones geológicos por una matriz rica en óxidos de hierro y sílice secundaria.",
      "La concentración variable de compuestos férricos, como la hematita (óxido de hierro III) y la goethita (oxihidróxido de hierro), otorga al acantilado de Meha una gama cromática extraordinaria que oscila entre los tonos amarillos pajizos, los ocres dorados y los púrpuras intensos. Cuando el sol del amanecer incide directamente sobre la fachada esculpida, la reflexión difusa de la luz sobre las facetas microscópicas de los granos de cuarzo produce un resplandor dorado característico que los egipcios asociaban con la carne de los dioses.",
      "Desde la perspectiva técnica de la cantería antigua, la arenisca nubia presentaba notables ventajas sobre las calizas del norte y los granitos del sur. Su relativa blandura permitía a los canteros vaciar grandes volúmenes con herramientas manuales de aleación de bronce y percutores líticos en tiempos significativamente más reducidos. Sin embargo, su estructura estratificada en capas sedimentarias horizontales suponía un peligro continuo de exfoliación y desprendimiento por cizalladura.",
      "La porosidad intrínseca de esta arenisca alcanza entre el quince y el veinte por ciento de su volumen total, lo que la hace sumamente permeable a las aguas subterráneas y al vapor ambiental. Durante milenios, el clima hiperárido del desierto de Nubia actuó como un conservante natural extraordinario, evitando la meteorización química provocada por la lluvia ácida o las heladas cíclicas. La mayor amenaza moderna para esta roca surgió con la creación del lago Nasser y el consiguiente aumento de la humedad freática.",
      "Los estudios petrológicos contemporáneos han demostrado que los artesanos de Ramsés II supieron identificar con precisión empírica los estratos más compactos y resistentes del acantilado para ubicar los rostros y torsos de los colosos. Los artesanos rellenaron las fallas geológicas naturales de la roca con morteros de cal apagada y cuarzo triturado antes de aplicar las finas capas de yeso sobre las que pintaron los jeroglíficos y emblemas de la corte imperial."
    ],
    "fact": "La Formación Geológica Nubia en el área de Abu Simbel presenta una resistencia a la compresión uniaxial media de treinta y cinco megapascales y una densidad aparente de dos coma tres gramos por centímetro cúbico, lo que permitió tallar galerías de dieciocho metros de luz libre sin desplomes, garantizando la estabilidad estructural milenaria de las salas hipóstilas del templo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En la mitología egipcia, el oro no era simplemente un metal precioso comercial, sino la sustancia divina incorruptible que componía la piel física de los dioses celestiales. La arenisca de Abu Simbel, al resplandecer con reflejos dorados bajo la luz matutina, transformaba el templo en un cuerpo divino viviente tallado en la montaña."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad de propagación de las ondas sísmicas longitudinales en la arenisca de Abu Simbel es de aproximadamente dos mil doscientos metros por segundo. Esta baja velocidad sónica refleja la naturaleza granular y porosa de la roca, confiriéndole una elevada capacidad de disipación de energía ante vibraciones mecánicas."
      }
    ]
  },
  {
    "id": "rescate",
    "bannerImage": "/assets/egypt/infographic_m8/banner_nilo-crecida.webp",
    "title": "El Gran Rescate",
    "color": "#FF6B2B",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_rescate.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_rescate.webp",
    "content": [
      "A finales de la década de 1950, la decisión del gobierno de Egipto de construir la Gran Presa de Asuán para regular las inundaciones del río Nilo y generar energía hidroeléctrica puso en peligro inminente de inmersión total a los templos de Nubia. Las aguas del futuro embalse, bautizado como lago Nasser, elevarían el nivel hídrico más de sesenta metros, sumergiendo de manera irreversible los complejos de Abu Simbel bajo una masa líquida que destruiría para siempre su vulnerable arenisca.",
      "Ante esta catástrofe patrimonial sin precedentes, la directora de antigüedades francesas Christiane Desroches-Noblecourt y el ministro de cultura egipcio Sarwat Okasha promovieron una campaña internacional a través de la UNESCO. El ocho de marzo de 1960, el director general de la UNESCO, Vittorino Veronese, lanzó un llamamiento solemne a la comunidad científica internacional. Más de cincuenta naciones aportaron fondos económicos, equipos geodésicos y contingentes de ingenieros mineros.",
      "Tras descartar audaces propuestas como encapsular el templo en un dique de hormigón transparente o elevarlo mediante gatos hidráulicos colosales en un solo bloque de trescientas mil toneladas, se aprobó el proyecto de un consorcio de constructoras suecas, alemanas, italianas, francesas y egipcias. La operación consistió en desmantelar meticulosamente los dos templos serrándolos en bloques individuales de veinte a treinta toneladas y reconstruirlos en una cota superior segura.",
      "Para ejecutar el corte sin dañar los delicados relieves policromados, se prohibió terminantemente el uso de maquinaria pesada percutora o explosivos en las proximidades inmediatas de las esculturas. Cuadrillas de expertos cortadores de mármol traídos desde las canteras italianas de Carrara utilizaron sierras de hilo de acero diamantado y sierras de mano accionadas con aire comprimido, manteniendo el espesor de las ranuras de corte en menos de seis milímetros de anchura.",
      "Entre 1964 y 1968, los dos templos fueron cortados en un total de mil treinta y seis bloques masivos, izados mediante grúas torre gigantescas y trasladados a una meseta artificial situada sesenta y cinco metros más arriba y doscientos metros más tierra adentro. Para soportar el acantilado y el paisaje artificial recreado, se levantó una gigantesca cúpula estructural de hormigón armado de ciento cuarenta metros de luz que cubre el techo de las salas originales sin tocarlas."
    ],
    "fact": "La operación internacional de rescate de Abu Simbel duró cuatro años y medio, movilizó a más de dos mil ingenieros y obreros especializados, y requirió el corte y reubicación milimétrica de mil treinta y seis bloques pétreos con un peso conjunto de trescientas doce mil toneladas, reconstruyendo el interior exacto bajo una colosal cúpula artificial de hormigón armado.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Para evitar que la vibración de las sierras desmoronara la arenisca en los bordes de los cortes, los restauradores aplicaron tiras adhesivas de gasa médica y resinas sintéticas solubles en acetona sobre los relieves esculpidos, retirándolas cuidadosamente con esponjas tibias tras el reensamblaje definitivo de cada bloque."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La cúpula de hormigón armado construida sobre el Gran Templo tiene un espesor de entre uno coma cinco y dos metros en su base y una curvatura parabólica calculada para soportar un peso superior a cien mil toneladas de rocas decorativas sin transmitir ninguna carga sobre las cámaras interiores talladas."
      }
    ]
  },
  {
    "id": "nefertari",
    "bannerImage": "/assets/egypt/infographic_m8/banner_nilometro.webp",
    "title": "El Templo de Nefertari",
    "color": "#FF8C5A",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_nefertari.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_nefertari.webp",
    "content": [
      "A unos cien metros al norte del Gran Templo de Ramsés II, excavado en el acantilado contiguo conocido antiguamente como la colina de Ibchek, se alza el Templo Menor de Abu Simbel. Este santuario subterráneo fue consagrado por el faraón a la diosa Hathor de Dendera, personificación de la música, el amor y la fertilidad celestial, y a su Gran Esposa Real favorita, la reina Nefertari Merit-en-Mut, cuyo nombre significa literalmente «la más bella de todas, amada del dios Mut».",
      "La fachada del Templo Menor constituye un testimonio arquitectónico único en toda la historia de las dinastías faraónicas. En lugar de seguir la tradición canónica milenaria que representaba a las consortes reales a una escala minúscula junto a las rodillas del monarca reinante, las seis estatuas colosales de diez metros de altura esculpidas en nichos alternos muestran a Nefertari con exactamente el mismo tamaño físico y jerárquico que las estatuas de su esposo Ramsés II.",
      "En la fachada se alternan dos estatuas de la reina representada como la diosa Hathor, coronada con los cuernos de vaca que enmarcan el disco solar y dos altas plumas de avestruz, flanqueadas por cuatro estatuas de Ramsés II portando la corona blanca del Alto Egipto y la corona doble unificada. Entre las piernas de las esculturas aparecen de nuevo los príncipes y princesas de la familia real, reforzando la noción del templo como monumento a la continuidad dinástica.",
      "El interior del speos consta de una sala hipóstila sostenida por seis pilares hathóricos cuadrangulares coronados con el rostro sereno de la deidad con orejas de vaca, instrumento musical del sistro sagrado en mano. En los relieves finamente grabados y pintados con pigmentos minerales deslumbrantes, la reina Nefertari aparece realizando ofrendas de loto, ungüentos y collares ceremoniales a deidades como Anukis, Satis, Isis y Hathor, siendo tratada con una deferencia litúrgica reservada a los reyes.",
      "Sobre el dintel de la entrada principal, Ramsés II ordenó grabar una dedicatoria que emociona a los epigrafistas por su sensibilidad poética dentro del lenguaje oficial del Imperio Nuevo: «Ramsés, amado de Amun, ha construido este templo excavado en la montaña para la Gran Esposa Real Nefertari, por quien el mismísimo Sol brilla cada mañana». El templo atestigua la extraordinaria influencia política y diplomática que alcanzó la soberana en la corte tebana."
    ],
    "fact": "Las seis estatuas colosales de la fachada del Templo Menor alcanzan los diez metros y medio de altura cada una, manteniendo una alineación perfecta de diez coma dos grados con respecto al horizonte para recibir los rayos crepusculares del sol naciente reflejados en el río, dedicadas conjuntamente a la reina Nefertari y a la diosa Hathor de Ibshek.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La reina Nefertari no solo fue una consorte ceremonial; cartas cuneiformes descubiertas en la capital hitita de Hattusa demuestran que mantenía correspondencia diplomática personal con la reina hitita Puduhepa, felicitándola por la paz sellada entre ambos imperios y enviándole joyas y vestidos de lino egipcio."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los relieves del templo de Nefertari conservan una reflectancia espectral muy pura en sus tonos amarillos gracias al uso de oropimente puro (trisulfuro de arsénico, As2S3) traído desde yacimientos volcánicos de Asia Menor, un pigmento semiconductor de excepcional brillo y resistencia a la degradación fotoquímica."
      }
    ]
  },
  {
    "id": "legado",
    "bannerImage": "/assets/egypt/infographic_m8/banner_shaduf-riego.webp",
    "title": "Legado Universal",
    "color": "#FF9A3C",
    "btnImage": "/assets/egypt/infographic_abusimbel/btn_legado.webp",
    "image": "/assets/egypt/infographic_abusimbel/hero_legado.webp",
    "content": [
      "Abu Simbel trasciende las fronteras de la egiptología para consolidarse como un símbolo imperecedero de la cooperación científica y cultural entre todas las naciones del planeta. La colosal campaña internacional de rescate ejecutada entre 1960 y 1968 demostró por primera vez en la historia que las obras maestras creadas por civilizaciones antiguas no pertenecían exclusivamente al país en cuyo territorio se encontraban, sino a la herencia espiritual y cultural colectiva de la humanidad.",
      "El éxito rotundo de la operación de salvamento de Nubia impulsó directamente a la UNESCO a redactar y aprobar en París la célebre Convención sobre la Protección del Patrimonio Mundial Cultural y Natural en noviembre de 1972. La lista del Patrimonio Mundial, que hoy tutela más de mil doscientos sitios arqueológicos, ciudades históricas y reservas ecológicas en todo el mundo, nació conceptualmente en las orillas arenosas del Nilo nubio frente a los cuatro colosos de Ramsés II.",
      "Para la ingeniería civil y la geodesia contemporáneas, la reubicación de Abu Simbel sentó las bases de los métodos modernos de preservación estructural de monumentos monolíticos sometidos a estrés ambiental. Los algoritmos de cálculo de tensiones, las técnicas no destructivas de corte por diamante y las metodologías de monitorización sismológica desarrolladas para salvar las salas de arenisca se aplican actualmente en la restauración de puentes históricos, catedrales góticas y presas.",
      "En el plano astronómico y divulgativo, el fenómeno solar de Abu Simbel continúa atrayendo el interés de astrofísicos y educadores que enseñan a las nuevas generaciones cómo la observación metódica de los ciclos solares permitía a los constructores antiguos calcular con precisión la rotación terrestre, los equinoccios y la latitud geográfica sin computadoras ni telescopios de refracción.",
      "La visión del Gran Templo resurgiendo sobre una colina artificial de hormigón y roca frente a las aguas azules del lago Nasser permanece como un tributo doble: al genio artístico y cosmológico de los arquitectos de Ramsés II en el segundo milenio antes de Cristo, y a la fraternidad solidaria de los científicos del siglo veinte que impidieron que el progreso industrial sepultara para siempre una cumbre del ingenio humano."
    ],
    "fact": "La campaña de rescate de Abu Simbel dio origen directo a la Convención de Patrimonio Mundial de la UNESCO en 1972, marcando la primera ocasión en que cincuenta países aunaron presupuestos y patentes tecnológicas para salvar un monumento antiguo de la extinción hidrológica, salvaguardando un tesoro arquitectónico irrepetible para la posteridad de la humanidad.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Como muestra de agradecimiento por la generosa ayuda internacional recibida durante el rescate de Nubia, el gobierno de Egipto donó cuatro templos completos a los países cooperantes: el Templo de Debod a España, el Templo de Dendur a Estados Unidos, el Templo de Taffa a los Países Bajos y el Templo de Ellesyia a Italia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los sistemas de prismas geodésicos láser de última generación instalados en el interior de la gran cúpula de hormigón vigilan de manera continua desplazamientos estructurales submilimétricos, registrando oscilaciones menores a cero coma un milímetros anuales en los bloques montados de la sala hipóstila."
      }
    ]
  }
];

// â”€â”€â”€ Animated Star / Sand Particle Field â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SandParticleField() {
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
    // Stars in upper sky zone
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.5,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.45 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    // Sand particles drifting
    const sand = Array.from({ length: 30 }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.5 + h * 0.5,
      r: Math.random() * 1 + 0.5,
      vx: Math.random() * 0.3 + 0.1,
      vy: -(Math.random() * 0.1),
      o: Math.random() * 0.3 + 0.05,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 120, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      sand.forEach(s => {
        s.x += s.vx;
        if (s.x > w + 5) s.x = -5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${s.o})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Abu Simbel SVG Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AbuSimbelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-16px' }}>
      <svg viewBox="0 0 640 130" style={{ width: '100%', maxWidth: '640px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(255,154,60,0.3))' }}>
        {/* Mountain silhouette */}
        <path d="M80 110 Q200 30 320 20 Q440 30 560 110Z" fill="none" stroke="rgba(255,154,60,0.2)" strokeWidth="1.5" />
        {/* Temple facade outline */}
        <rect x="270" y="55" width="80" height="55" rx="2" fill="rgba(255,154,60,0.08)" stroke="rgba(255,154,60,0.3)" strokeWidth="1.5" />
        {/* Temple door */}
        <rect x="300" y="78" width="20" height="32" rx="1" fill="rgba(255,154,60,0.2)" />
        {/* 4 colossal statues */}
        {[275, 287, 313, 325].map((x, i) => (
          <g key={i}>
            <rect x={x} y="60" width="8" height="18" rx="1" fill="rgba(255,154,60,0.3)" />
            <circle cx={x + 4} cy="57" r="5" fill="rgba(255,154,60,0.4)" />
          </g>
        ))}
        {/* Animated solar beam */}
        <motion.line x1="130" y1="60" x2="300" y2="88"
          stroke="#FF9A3C" strokeWidth="2.5" strokeLinecap="round"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px #FF9A3C)' }}
        />
        {/* Sun on horizon */}
        <motion.circle cx="118" cy="58" r="14" fill="#FF9A3C"
          animate={{ opacity: [0.4, 0.9, 0.4], r: [12, 16, 12] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 10px #FF9A3C)' }}
        />
        {/* Horizon glow */}
        <motion.ellipse cx="320" cy="115" rx="200" ry="12" fill="#FF9A3C"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Light rays from sun */}
        {[-25,-12,0,12,25].map((angle, i) => {
          const r = Math.PI * angle / 180;
          return <motion.line key={i}
            x1={118 + 16 * Math.cos(r)} y1={58 + 16 * Math.sin(r)}
            x2={118 + 30 * Math.cos(r)} y2={58 + 30 * Math.sin(r)}
            stroke="#FF9A3C" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, delay: i * 0.1 }}
          />;
        })}
        {/* Decorative stars above mountain */}
        {[{cx:160,cy:18},{cx:210,cy:10},{cx:270,cy:8},{cx:370,cy:8},{cx:430,cy:10},{cx:480,cy:18}].map((s,i) => (
          <motion.circle key={i} cx={s.cx} cy={s.cy} r="2.5" fill="#FFD700"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }}
          />
        ))}
        {/* Title */}
        <text x="320" y="85" textAnchor="middle" fill="#FF9A3C" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ABU SIMBEL</text>
        <text x="320" y="105" textAnchor="middle" fill="rgba(255,154,60,0.65)" fontSize="10.5" fontFamily="monospace" letterSpacing="2.5">LA LUZ DEL SOLSTICIO · 1264 A.C.</text>
        {/* Gradient for background fading */}
        <defs>
          <linearGradient id="abuGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,154,60,0)" />
            <stop offset="50%" stopColor="rgba(255,154,60,0.9)" />
            <stop offset="100%" stopColor="rgba(255,154,60,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NodeButton({ node, isActive, onClick, index, explored }) {
  const wasExplored = explored.has(node.id);
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : wasExplored ? node.color + '60' : 'rgba(255,154,60,0.2)'}`,
        boxShadow: isActive
          ? `0 0 22px ${node.color}55, 0 0 44px ${node.color}22, inset 0 0 16px ${node.color}33`
          : wasExplored ? `0 4px 15px ${node.color}25` : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
         loading="lazy" />
        {wasExplored && !isActive && (
          <div style={{
            position: 'absolute', bottom: '4px', right: '4px',
            width: '18px', height: '18px', borderRadius: '50%',
            background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#1A0A00', fontSize: '10px', fontWeight: 900 }}>âœ“</span>
          </div>
        )}
        {isActive && (
          <motion.div animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }}
          />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : wasExplored ? node.color + 'CC' : 'rgba(255,255,255,0.72)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '96px', textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotM8"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

// â”€â”€â”€ Content Panel (Estándar M9) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-8px', rotate: 12 },
    { top: '42%', left: '-12px', rotate: -8 },
    { bottom: '10%', right: '8px', rotate: 18 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(18, 10, 2, 0.93)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}28`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.65)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* â”€â”€â”€ Two-Column Hero (Estándar: imagen + título y texto) â”€â”€â”€ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        {/* Izquierda: Hero Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
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
            pointerEvents: 'none',
          }} />
        </div>

        {/* Derecha: Título + primeros 2 párrafos */}
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.4rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {/* Decorativos flotantes */}
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        {/* Párrafos restantes en 2 columnas */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 1.8rem',
          position: 'relative', zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.025)', borderRadius: '12px',
                padding: '1.1rem 1.2rem', borderLeft: `3px solid ${node.color}30`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#1A0A00',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {['â—†', 'â—‡', 'â˜…', 'â—‰'][i % 4]}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.76, color: 'rgba(255,255,255,0.86)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* Fact box */}
                      {node.bannerImage && (
                <div className="relative w-full rounded-xl overflow-hidden mb-6" style={{aspectRatio:'16/5'}}>
                  <img
                    src={node.bannerImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium leading-tight">
                    {node.caption}
                  </p>
                </div>
              )}
              {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}28`, borderRadius: '16px',
            padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
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
                color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.72,
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(255,154,60,0.15)',
    }}>
      <Star size={14} style={{ color: '#FF9A3C', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #CC6B1A, #FF9A3C, #FFD700)',
            borderRadius: '3px', boxShadow: '0 0 8px rgba(255,154,60,0.4)',
          }}
        />
      </div>
      <span style={{
        fontSize: '0.75rem', color: '#FF9A3C', fontFamily: 'monospace',
        fontWeight: 'bold', minWidth: '45px', textAlign: 'right',
      }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM8() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,10,0,0.88) 0%, rgba(40,22,5,0.80) 40%, rgba(15,8,0,0.92) 100%), url(/assets/egypt/infographic_abusimbel/bg_abusimbel.png)',
      backgroundSize: 'cover', backgroundPosition: 'center 40%',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(255,154,60,0.12)',
      boxShadow: '0 0 60px rgba(20,8,0,0.85), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <SandParticleField />
      <AbuSimbelHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(255,154,60,0.72)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* Node Buttons Grid */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2,
        marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton
            key={node.id} node={node} index={index}
            isActive={activeNode === node.id}
            explored={explored}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      {/* Content Panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      {/* Completion Banner */}
      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(255,154,60,0.08)', borderRadius: '16px',
              border: '1px solid rgba(255,154,60,0.28)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FF9A3C', fontSize: '1.1rem', fontWeight: 'bold' }}>
              â˜€ï¸ ¡Has descubierto todos los secretos de Abu Simbel!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Rayo de Ramsés
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ Bibliografía â”€â”€â”€ */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ðŸ“š Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}