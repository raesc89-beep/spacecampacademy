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
  'ingenieria': [DecoCompassAngle, DecoCorridor, DecoSunRay],
  'ramses': [DecoStatue, DecoCompassAngle, DecoTemple],
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
    id: 'fenomeno',
    title: 'El Fenómeno Solar',
    color: '#FF9A3C',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_fenomeno.png',
    image: '/assets/egypt/infographic_abusimbel/hero_fenomeno.png',
    content: [
      'Imagina que eres un faraón hace 3,200 años. Construyes un templo gigante dentro de una montaña y calculas que, exactamente dos días al año, los primeros rayos del sol de la mañana entrarán por la puerta y viajarán por un corredor oscuro de 65 metros â€”¡casi tan largo como una cancha de fútbol americano!â€” para iluminar tus estatuas en el fondo. Eso es exactamente lo que hizo Ramsés II con Abu Simbel.',
      'Cada año, el 22 de febrero y el 22 de octubre, algo mágico sucede en el sur de Egipto. El sol sale por el horizonte y sus primeros rayos entran por la puerta del templo, viajan 65 metros por el corredor completamente oscuro, y al final iluminan cuatro estatuas de los dioses en el santuario. Es como si el sol fuera un faro gigante apuntando exactamente a un punto secreto dentro de una montaña.',
      '¿Por qué esas dos fechas exactas? Los historiadores creen que el 22 de febrero era el cumpleaños de Ramsés II, y el 22 de octubre era el día de su coronación como faraón. Así, el sol â€”el dios más poderoso del cieloâ€” aparecía cada año para "felicitar" a Ramsés en sus días más importantes. Era su forma de demostrar que era un dios en la Tierra.',
      'De las cuatro estatuas que se iluminan, tres son dioses del sol: Ramsés II, Ra-Horajti (dios del horizonte solar) y Amón (rey de los dioses). Pero una estatua â€”la de Ptah, el dios de las tinieblas y la oscuridadâ€” siempre permanece en sombra. ¡Hasta en el diseño del templo los egipcios contaban una historia sobre la lucha entre la luz y la oscuridad!',
      'La precisión de este diseño es increíble. Los ingenieros egipcios calcularon el ángulo exacto al que sale el sol el 22 de febrero en esa latitud específica (22° Norte). Luego excavaron el corredor de 65 metros con exactamente ese ángulo. Si el ángulo fuera solo 1 grado diferente, el rayo de luz se desviaría varios metros y nunca llegaría a las estatuas. Es como apuntar un láser con una precisión perfecta durante 65 metros dentro de roca sólida.',
    ],
    fact: 'El 22 de febrero y el 22 de octubre NO son los solsticios ni los equinoccios. Son dos días específicos que solo se pueden calcular sabiendo con exactitud la latitud del lugar (22° Norte). Los ingenieros egipcios descubrieron y usaron geometría solar avanzada 3,200 años antes de que inventáramos las computadoras. Hoy los astrónomos modernos verifican sus cálculos con software y son casi perfectos.',
  },
  {
    id: 'colosos',
    title: 'Los Cuatro Colosos',
    color: '#FF8C00',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_colosos.png',
    image: '/assets/egypt/infographic_abusimbel/hero_colosos.png',
    content: [
      'Imagina que estás caminando por el desierto y de repente ves cuatro personas gigantes sentadas en una montaña. ¡Cada una mide entre 17 y 20 metros de altura! Para que te imagines el tamaño: si pusieras cuatro jirafa adultas una encima de otra, apenas llegarían a la barbilla de estas estatuas. Esos son los cuatro colosos de Abu Simbel.',
      'Las cuatro estatuas muestran a Ramsés II sentado en su trono, con las manos sobre las rodillas. A sus pies, esculpidas mucho más pequeñas, aparecen figuras de su esposa favorita Nefertari, su madre Tuy, y algunos de sus muchos hijos. El mensaje era claro: Ramsés II era tan grande comparado con el resto que hasta su familia parecía pequeña.',
      'Las cuatro figuras son idénticas â€”todas muestran a Ramsés IIâ€” pero representan diferentes aspectos de su divinidad. Era una forma egipcia de decir "Ramsés II es tan importante que necesitamos cuatro versiones de él para guardar el templo". Para los nubios al sur y los libios al oeste que pasaban por ahí, ver esas cuatro estatuas gigantes era un mensaje muy claro: no te metas con Egipto.',
      'Una de las estatuas tiene la parte superior rota â€”se cayó por un terremoto hace más de 2,000 añosâ€” y los fragmentos todavía están en el suelo, justo donde cayeron. Cuando los ingenieros modernos trasladaron el templo en los años 1960, dejaron los fragmentos exactamente en el mismo lugar. Decidieron que era más honesto mostrar que el tiempo también afecta las cosas más grandes.',
      'Entre las piernas de los colosos y alrededor de los pies, hay pequeñas figuras esculpidas de prisioneros con las manos atadas. Representan a los enemigos de Egipto: nubios al sur, libios al oeste, asiáticos al este. Era un mensaje político en piedra: Ramsés II tenía a sus enemigos "aplastados" literalmente bajo sus pies para siempre.',
    ],
    fact: 'Ramsés II vivió aproximadamente 90 años (1303-1213 a.C.), lo que era extraordinariamente raro en la antigüedad cuando la esperanza de vida promedio era de 35 años. Tuvo más de 100 hijos e hijas. Gobernó Egipto durante 66 años, el segundo reinado más largo de toda la historia egipcia. Construyó más monumentos que cualquier otro faraón. ¡Era literalmente el faraón más "extra" de todos!',
  },
  {
    id: 'ingenieria',
    title: 'Ingeniería Faraónica',
    color: '#E8851A',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_ingenieria.png',
    image: '/assets/egypt/infographic_abusimbel/hero_ingenieria.png',
    content: [
      '¿Cómo pudieron los egipcios calcular el ángulo exacto del sol sin Google Maps, sin calculadoras y sin telescopios? La respuesta es fascinante: usaban palos, sombras y mucha observación paciente. Durante años, los sacerdotes-astrónomos registraron exactamente en qué punto del horizonte salía el sol cada día del año. Con esos datos, construyeron un modelo mental perfectamente preciso del cielo.',
      'El corredor de Abu Simbel mide 65 metros de largo â€”casi tan largo como dos albercas olímpicas una detrás de otraâ€” y fue excavado completamente a mano en roca de arenisca roja. La puerta de entrada tiene un área de solo unos cuantos metros cuadrados, y el corredor se va estrechando hacia adentro. Lograr que un rayo de luz entre por ese hueco pequeño y viaje 65 metros hasta exactamente el punto correcto requirió un cálculo preciso.',
      'El ángulo del corredor corresponde al ángulo solar del amanecer del 22 de febrero en la latitud 22° Norte. Para calcular este ángulo, los ingenieros egipcios usaron un sistema de medición angular basado en la Estrella Polar (Thuban, en esa época) y las sombras del mediodía solar. Midieron con varas graduadas y cuerdas tensadas durante varios años antes de excavar.',
      'La tolerancia de error en la construcción fue extraordinaria. Si el corredor se hubiera desviado solo 0.5 grados en cualquier dirección, el rayo de luz habría fallado el blanco por más de 50 centímetros. Pero no falló. Después de 3,200 años, el fenómeno sigue ocurriendo con precisión perfecta. Incluso cuando se trasladó el templo en los años 1960, los ingenieros modernos se aseguraron de replicar el mismo ángulo exacto.',
      'La precisión requerida equivale a apuntar un puntero láser desde 100 metros de distancia hacia un blanco del tamaño de una moneda. Los egipcios lo lograron sin tecnología moderna, solo con observación, matemáticas y paciencia. Es posiblemente el cálculo de ingeniería más asombroso de la antigüedad.',
    ],
    fact: 'Los ingenieros egipcios usaron un sistema llamado "seked" para calcular ángulos. Un seked era la cantidad de palmos horizontales por cada codo (unidad de medida) de altura vertical, similar a nuestra tangente trigonométrica. ¡Estaban usando trigonométria práctica 2,000 años antes de que los griegos inventaran formalmente la trigonometría! El papiro de Rhind (hacia 1650 a.C.) describe estos cálculos con detalle.',
  },
  {
    id: 'ramses',
    title: 'Ramsés el Grande',
    color: '#FF7043',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_ramses.png',
    image: '/assets/egypt/infographic_abusimbel/hero_ramses.png',
    content: [
      'Ramsés II no solo construyó Abu Simbel; construyó más templos, colosales estatuas y monumentos que cualquier otro faraón en la historia de Egipto. Si todos los faraones egipcios fueran superhéroes, Ramsés II sería el que tiene el videojuego con más nivel de dificultad terminado, más trofeos, y encima de eso se auto-otorgó el título de "El Grande". Porque sí, Ramsés fue quien empezó a llamarse a sí mismo "El Grande".',
      'Abu Simbel cuenta en sus paredes la historia de la Batalla de Qadesh (hacia 1274 a.C.), la batalla más grande de carros de guerra de la historia antigua. Ramsés II se enfrentó al rey hitita Muwatalli II con miles de soldados y carros de guerra. El resultado fue un empate: ninguno de los dos ganó claramente. Pero en las paredes de Abu Simbel, Ramsés lo pintó como una victoria aplastante donde él solo derrotó a miles de enemigos.',
      'Los muros del templo muestran a Ramsés en su carro de guerra, enorme, disparando flechas hacia los enemigos que caen en pánico a su alrededor. Hay una escena específica donde Ramsés aparece tan grande que ocupa la mitad del mural, mientras sus enemigos son diminutos. Era propaganda política en piedra: "Yo soy tan poderoso que soy básicamente un dios".',
      'La Batalla de Qadesh terminó con el primer tratado de paz internacional de la historia conocida, firmado entre Ramsés II y el rey hitita Muwatalli II. Este tratado, grabado tanto en jeroglíficos como en cuneiforme hitita, fue un acuerdo de no agresión y defensa mutua. Una copia está en el Museo Egipcio de El Cairo, y otra en la sede de las Naciones Unidas en Nueva York, como símbolo de la primera diplomacia de la historia.',
      'Ramsés II fue tan famoso que muchos faraones posteriores quisieron parecerse a él. Varios faraones tomaron prestado su nombre (hay nueve "Ramsés" en la historia de Egipto). También se borró el nombre de otros faraones en monumentos antiguos y grabó el suyo propio, convirtiéndose efectivamente en el padre fundador del turismo arqueológico confuso de Egipto.',
    ],
    fact: 'El tratado de Qadesh (hacia 1258 a.C.) es el primer tratado de paz internacional de la historia del que tenemos registro escrito. Una copia en cuneiforme hitita está expuesta en la sede de las Naciones Unidas en Nueva York como símbolo de la diplomacia internacional. ¡La primera vez que dos países dijeron "hagamos las paces por escrito" fue hace 3,280 años y el documento sobrevivió!',
  },
  {
    id: 'arenisca',
    title: 'La Arenisca Dorada',
    color: '#D4870A',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_arenisca.png',
    image: '/assets/egypt/infographic_abusimbel/hero_arenisca.png',
    content: [
      '¿Por qué Abu Simbel es rojo-naranja? La respuesta está en la roca: es arenisca de Nubia, un tipo de roca formada hace millones de años cuando esa región era el fondo de un mar antiguo. La arenisca está compuesta de granos de cuarzo cementados con óxido de hierro, y ese óxido de hierro es exactamente el mismo compuesto que hace que el óxido de tus bicicletas sea café-rojizo.',
      'Los ingenieros egipcios eligieron deliberadamente este material por sus propiedades ópticas únicas. Cuando la luz del sol de la mañana toca la arenisca roja de Nubia, la roca absorbe algunas longitudes de onda de la luz y refleja principalmente los tonos dorados y anaranjados. Esto significa que durante el fenómeno solar del 22 de febrero, las estatuas no solo se iluminan: ¡parecen literalmente encenderse con fuego dorado!',
      'La arenisca también tiene una propiedad térmica interesante: se calienta muy rápidamente con el sol de la mañana pero tarda horas en enfriarse. Los sacerdotes egipcios describían este fenómeno como "la roca que guarda el calor del dios sol incluso después de que él se va". Era parte de la experiencia religiosa: tocar la piedra caliente por la tarde y sentir que el sol todavía estaba presente en ella.',
      'Sin embargo, la arenisca también es el mayor reto de conservación de Abu Simbel. Es una roca relativamente blanda que se erosiona con el viento y el agua. Las caras de las estatuas han perdido detalles a lo largo de 3,200 años de viento de arena del desierto. Hoy los conservadores aplican químicos especiales para endurecer la superficie y frenar la erosión, usando técnicas que no dañan la roca original.',
      'Cuando el templo fue trasladado en los años 1960, los geólogos analizaron en detalle la composición química de la arenisca para asegurarse de que los bloques cortados se recolocaran con el mismo lado hacia afuera. La arenisca tiene capas de diferente dureza (algunas más compactas, otras más porosas), y colocarlos al revés habría acelerado la erosión. Hasta en el traslado pensaron en la física de los materiales.',
    ],
    fact: 'La arenisca de Nubia que forma Abu Simbel tiene aproximadamente 65 millones de años de antigüedad: se formó durante el período Cretácico, ¡cuando los dinosaurios todavía vivían! Los granos de cuarzo y feldespato que la componen son fragmentos de montañas mucho más antiguas que se erosionaron, viajaron por ríos y se depositaron en el fondo del mar. En cada bloque del templo hay literalmente fragmentos de montañas de hace cientos de millones de años.',
  },
  {
    id: 'rescate',
    title: 'El Gran Rescate',
    color: '#FF6B2B',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_rescate.png',
    image: '/assets/egypt/infographic_abusimbel/hero_rescate.png',
    content: [
      'En 1960, el gobierno de Egipto decidió construir la Gran Presa de Asuán para controlar las inundaciones del Nilo y generar electricidad. El problema: la presa crearía el Lago Nasser, un lago artificial que inundaría completamente Abu Simbel bajo 40 metros de agua. El mundo entero entró en pánico: ¿cómo salvar uno de los monumentos más importantes de la humanidad?',
      'La UNESCO (la agencia cultural de las Naciones Unidas) lanzó una campaña de ayuda internacional de emergencia. Ingenieros de 50 países diferentes llegaron a Egipto con una misión casi imposible: mover un templo excavado en una montaña sin destruirlo. Primero calcularon que era físicamente posible cortarlo en bloques y reensamblarlo. El plan tomó cuatro años (1964-1968) y costó 80 millones de dólares (equivalentes a más de 600 millones de hoy).',
      'Los ingenieros cortaron el templo completo en 1,036 bloques de piedra. El bloque más grande pesaba 30 toneladas â€”el peso de cinco elefantes africanos adultosâ€” y el más pequeño pesaba unos 10 kg. Usaron motosierras con discos diamantados para cortar la roca sin vibrar demasiado (las vibraciones habrían roto las pinturas y los relieves). Luego numeraron cada bloque y lo fotografiaron desde múltiples ángulos.',
      'Los bloques fueron transportados colina arriba, 65 metros más alto y 200 metros más lejos del borde del lago. Ahí, los ingenieros construyeron una cúpula artificial de hormigón para reproducir exactamente la oscuridad interior del templo original. Después reensamblaron los 1,036 bloques como un gigantesco rompecabezas tridimensional, usando los números y las fotografías para asegurarse de que cada bloque estuviera exactamente en su lugar correcto.',
      'La parte más difícil fue mantener las mismas orientaciones astronómicas. Los ingenieros usaron computadoras (recién inventadas en esa época) para calcular el ángulo exacto del corredor que replicara el fenómeno solar del 22 de febrero. Lo lograron: cuando el templo fue reinaugurado en 1968, el fenómeno ocurrió exactamente igual que en el templo original. Un error de cálculo de varios días ocurrió por las diferencias de la nueva posición pero el fenómeno lumínico se replicó.',
    ],
    fact: 'El traslado de Abu Simbel fue tan impresionante que inspiró directamente la Convención del Patrimonio Mundial de la UNESCO, firmada en 1972. Esta convención hoy protege 1,199 sitios culturales y naturales en 168 países, desde la Gran Muralla China hasta los Parques Nacionales de Argentina. Sin Abu Simbel, ese sistema de protección global quizás no existiría. ¡Un templo del año 1264 a.C. protege el patrimonio del siglo XXI!',
  },
  {
    id: 'nefertari',
    title: 'El Templo de Nefertari',
    color: '#FF8C5A',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_nefertari.png',
    image: '/assets/egypt/infographic_abusimbel/hero_nefertari.png',
    content: [
      'Junto al gran templo de Ramsés II hay un segundo templo, más pequeño pero igual de hermoso: el Templo de Nefertari, la esposa favorita de Ramsés II. En la historia de Egipto â€”3,000 años de historia con cientos de faraonesâ€” solo hay un puñado de casos donde una reina recibió un templo completo dedicado a ella. Nefertari es uno de esos casos rarísimos, lo que habla de lo especial que fue su relación con Ramsés.',
      'El Templo de Nefertari está dedicado a Hathor, la diosa egipcia del amor, la música, la belleza y la alegría. Las pinturas interiores son las más coloridas y mejor conservadas de todo Egipto. Los azules, rojos, verdes y amarillos de hace 3,200 años siguen siendo brillantes hoy, protegidos por el ambiente seco del desierto. Es literalmente el "museo de arte" más antiguo del mundo en perfecto estado.',
      'La fachada del templo de Nefertari tiene seis estatuas colosales: cuatro de Ramsés II y dos de Nefertari. Pero hay algo notable: todas las estatuas tienen la misma altura. En el arte egipcio, el tamaño indicaba importancia: los faraones siempre se representaban más grandes que todo el mundo. Que Nefertari tuviera estatuas del mismo tamaño que Ramsés era una declaración pública enorme: "Esta mujer es mi igual".',
      'El templo de Nefertari también tiene un fenómeno solar, aunque diferente al de Ramsés. En los equinoccios (21 de marzo y 21 de septiembre), cuando el sol sale exactamente por el Este, los primeros rayos entran por la puerta y iluminan el rostro de la estatua de Hathor en el santuario interior. Es una alineación más sencilla que la de Ramsés, pero igualmente intencional.',
      'Las inscripciones del templo de Nefertari contienen una de las declaraciones de amor más famosas de la antigüedad. Ramsés II escribió sobre Nefertari: "La más bella de todas, por quien el sol brilla". En el mundo antiguo donde las mujeres eran frecuentemente invisibles en los registros oficiales, tener un faraón escribiendo poesía de amor en un templo monumental era algo verdaderamente extraordinario.',
    ],
    fact: 'El nombre completo de Nefertari era "Nefertari Meryetmut", que significa "La Bella Compañera, Amada de Mut". Las pinturas de su tumba en el Valle de las Reinas (QV66) son consideradas las más bellas del Antiguo Egipto. Cuando se descubrieron en 1904, algunos colores eran tan brillantes que los arqueólogos creyeron que eran pinturas modernas. Habían sobrevivido 3,200 años intactos en el ambiente seco del desierto.',
  },
  {
    id: 'legado',
    title: 'Legado Universal',
    color: '#FF9A3C',
    btnImage: '/assets/egypt/infographic_abusimbel/btn_legado.png',
    image: '/assets/egypt/infographic_abusimbel/hero_legado.png',
    content: [
      'Cada año, el 22 de febrero y el 22 de octubre, miles de personas de todo el mundo viajan al sur de Egipto para presenciar el fenómeno solar de Abu Simbel. Se congregan antes del amanecer en la oscuridad del desierto, esperan en silencio, y luego observan cómo los primeros rayos del sol entran por la puerta del templo y viajan por el corredor hasta iluminar las estatuas. Es uno de los pocos espectáculos astronómicos que puedes ver sin ningún instrumento especial.',
      'Abu Simbel se convirtió en Patrimonio de la Humanidad de la UNESCO en 1979, junto con los demás templos de Nubia. Hoy es el segundo sitio arqueológico más visitado de Egipto después de las Pirámides de Guiza, con más de 500,000 visitantes al año. El ingreso por turismo es vital para la economía local y para financiar la conservación de los templos.',
      'El impacto más duradero de Abu Simbel fue político y cultural: su rescate en los años 1960 demostró que la humanidad podía unirse para proteger el patrimonio cultural compartido. Esta idea fue el germen de la Convención del Patrimonio Mundial de la UNESCO (1972), que hoy protege sitios en todos los continentes, desde las Cataratas de Iguazú hasta la Gran Barrera de Coral, pasando por el casco histórico de la Ciudad de México.',
      'La experiencia de trasladar Abu Simbel generó técnicas de conservación que hoy se usan en todo el mundo. Los métodos de consolidación química de rocas porosas, los sistemas de monitoreo de temperatura y humedad en monumentos, y los protocolos de documentación fotográfica 3D que se desarrollaron en Abu Simbel son hoy estándares internacionales en arqueología.',
      'Hay algo profundamente poético en el legado de Abu Simbel: un templo construido por un faraón para glorificarse a sí mismo y demostrar su poder terminó siendo el símbolo del esfuerzo colectivo de la humanidad para proteger su herencia cultural común. Ramsés II quería ser recordado como un dios. En cambio, lo recordamos como la inspiración para el mayor sistema de protección del patrimonio humano de la historia.',
    ],
    fact: 'La Convención del Patrimonio Mundial de la UNESCO, inspirada por el rescate de Abu Simbel, ha sido firmada por 195 países, más que cualquier otro tratado internacional en la historia. Protege 1,199 sitios en 168 países. Algunos de los sitios más increíbles: las Islas Galápagos, el Coliseo Romano, Machu Picchu, los Parques Nacionales de Yellowstone, la Ciudad Prohibida de China, y las Pirámides de Guiza. ¡Todo gracias a que Egipto necesitó mover un templo!',
  },
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
            margin: '0 0 0.8rem', fontSize: '1.4rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#1A0A00',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
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