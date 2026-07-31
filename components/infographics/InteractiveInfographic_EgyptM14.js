'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoSerpent({ size = 80, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.22, ...style }}>
      {/* Serpent body wavy */}
      <path d="M4 28 Q14 10 24 28 Q34 46 44 28 Q54 10 64 28 Q74 46 78 32"
        fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      {/* Head */}
      <ellipse cx="78" cy="30" rx="6" ry="4" fill={color} opacity="0.5" />
      {/* Forked tongue */}
      <line x1="84" y1="30" x2="90" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="84" y1="30" x2="90" y2="33" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Eye */}
      <circle cx="79" cy="28" r="1.5" fill="#000" opacity="0.6" />
      {/* Scales */}
      {[12, 26, 40, 56].map((x, i) => (
        <ellipse key={i} cx={x} cy={28 + (i % 2 === 0 ? -5 : 8)} rx="4" ry="2.5"
          fill={color} opacity="0.15" stroke={color} strokeWidth="0.5" />
      ))}
      {/* Glow aura */}
      <path d="M4 28 Q14 10 24 28 Q34 46 44 28 Q54 10 64 28 Q74 46 78 32"
        fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.05" />
    </svg>
  );
}

function DecoEclipse({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ opacity: 0.22, ...style }}>
      {/* Solar corona rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const r = Math.PI * deg / 180;
        const x1 = 35 + 22 * Math.cos(r), y1 = 35 + 22 * Math.sin(r);
        const x2 = 35 + (i % 3 === 0 ? 34 : 28) * Math.cos(r);
        const y2 = 35 + (i % 3 === 0 ? 34 : 28) * Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#FFD700" strokeWidth={i % 3 === 0 ? 2 : 1} opacity={i % 3 === 0 ? 0.5 : 0.25} strokeLinecap="round" />;
      })}
      {/* Sun ring (corona) */}
      <circle cx="35" cy="35" r="20" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />
      {/* Moon covering sun */}
      <circle cx="35" cy="35" r="18" fill="#1A0010" opacity="0.9" />
      {/* Red corona glow */}
      <circle cx="35" cy="35" r="20" fill="none" stroke={color} strokeWidth="3" opacity="0.4" />
      {/* Baily's beads effect */}
      {[0, 90, 180, 270].map((deg, i) => {
        const r = Math.PI * deg / 180;
        return <circle key={i} cx={35 + 20 * Math.cos(r)} cy={35 + 20 * Math.sin(r)}
          r="2.5" fill={color} opacity="0.5" />;
      })}
      {/* Diamond ring */}
      <circle cx="35" cy="15" r="3" fill="#FFD700" opacity="0.7" style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }} />
    </svg>
  );
}

function DecoAsteroid({ size = 65, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 65 52" style={{ opacity: 0.22, ...style }}>
      {/* Irregular asteroid shape */}
      <path d="M32 6 L44 10 L52 20 L50 34 L40 44 L26 46 L14 38 L10 24 L18 12 Z"
        fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Craters */}
      <circle cx="28" cy="20" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="32" r="4" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="22" cy="34" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Motion streak */}
      <line x1="10" y1="24" x2="-10" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="12" y1="18" x2="-6" y2="24" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      <line x1="14" y1="12" x2="-2" y2="17" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
      {/* Impact glow */}
      <circle cx="32" cy="26" r="20" fill={color} opacity="0.04" />
    </svg>
  );
}

function DecoSolarBarge({ size = 80, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Boat hull */}
      <path d="M10 32 Q40 42 70 32 Q60 44 40 46 Q20 44 10 32Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Sail/canopy */}
      <rect x="30" y="14" width="20" height="16" rx="2" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      {/* Sun disk on barge */}
      <circle cx="40" cy="12" r="8" fill={color} opacity="0.4" />
      <circle cx="40" cy="12" r="5" fill={color} opacity="0.6" />
      {/* Oars */}
      <line x1="18" y1="35" x2="12" y2="44" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="62" y1="35" x2="68" y2="44" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Water/stars below */}
      <line x1="4" y1="46" x2="76" y2="46" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Serpent attacking from below */}
      <path d="M5 46 Q20 38 35 46 Q50 54 65 46" fill="none" stroke="#FF5252" strokeWidth="1.5" opacity="0.3" />
      {/* Ray of light */}
      <circle cx="40" cy="12" r="14" fill="none" stroke={color} strokeWidth="0.8" opacity="0.15" />
    </svg>
  );
}

function DecoDARTMission({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ opacity: 0.22, ...style }}>
      {/* Spacecraft */}
      <rect x="30" y="25" width="14" height="8" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="1" />
      {/* Solar panels */}
      <rect x="10" y="27" width="18" height="4" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.8" />
      <rect x="42" y="27" width="18" height="4" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.8" />
      {/* Thruster/engine */}
      <polygon points="37,33 33,33 35,38 37,38" fill={color} opacity="0.5" />
      {/* Impact trajectory arrow */}
      <line x1="37" y1="38" x2="37" y2="54" stroke={color} strokeWidth="2" strokeDasharray="3 2" opacity="0.5" />
      {/* Asteroid target */}
      <path d="M30 58 L42 54 L46 62 L40 68 L28 66 L26 60Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      {/* Impact flash */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const r = Math.PI * deg / 180;
        return <line key={i} x1={37 + 4 * Math.cos(r)} y1={62 + 4 * Math.sin(r)}
          x2={37 + 10 * Math.cos(r)} y2={62 + 10 * Math.sin(r)}
          stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />;
      })}
      {/* Signal waves from spacecraft */}
      <circle cx="37" cy="25" r="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="37" cy="25" r="7" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function DecoSaros({ size = 65, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 65 65" style={{ opacity: 0.2, ...style }}>
      {/* Three-body system: Earth, Moon, Sun alignment */}
      {/* Earth */}
      <circle cx="10" cy="32" r="8" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5" />
      <text x="10" y="36" textAnchor="middle" fontSize="7" fill={color} opacity="0.6">ðŸŒ</text>
      {/* Moon */}
      <circle cx="32" cy="32" r="5" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      <text x="32" y="36" textAnchor="middle" fontSize="6" fill={color} opacity="0.6">ðŸŒ‘</text>
      {/* Sun */}
      <circle cx="55" cy="32" r="9" fill="#FFD700" opacity="0.3" stroke="#FFD700" strokeWidth="1" />
      {/* Alignment line */}
      <line x1="18" y1="32" x2="27" y2="32" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
      <line x1="37" y1="32" x2="46" y2="32" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
      {/* Shadow cone */}
      <path d="M10 28 L26 20 L26 44Z" fill={color} opacity="0.08" />
      {/* Saros cycle text */}
      <text x="32" y="56" textAnchor="middle" fontSize="7" fill={color} opacity="0.5" fontFamily="monospace">18.03 años</text>
      {/* Cycle arrow */}
      <path d="M8 54 Q32 62 56 54" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.35" />
      <polygon points="56,54 52,52 52,56" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoChicxulub({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 70 52" style={{ opacity: 0.22, ...style }}>
      {/* Impact crater */}
      <ellipse cx="35" cy="40" rx="30" ry="10" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5" />
      {/* Crater rings */}
      <ellipse cx="35" cy="40" rx="22" ry="7" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="35" cy="40" rx="14" ry="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Asteroid incoming */}
      <circle cx="35" cy="8" r="6" fill={color} opacity="0.4" stroke={color} strokeWidth="1" />
      {/* Trail */}
      <line x1="35" y1="14" x2="35" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Explosion debris */}
      {[{x:15,y:22},{x:55,y:22},{x:8,y:30},{x:62,y:30},{x:20,y:15},{x:50,y:15}].map((p,i) => (
        <line key={i} x1="35" y1="30" x2={p.x} y2={p.y}
          stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      ))}
      {/* Fire glow */}
      <circle cx="35" cy="30" r="10" fill={color} opacity="0.08" />
      <circle cx="35" cy="30" r="6" fill="#FFD700" opacity="0.1" />
    </svg>
  );
}

function DecoSandstorm({ size = 70, color = '#D4870A', style = {} }) {
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 70 45" style={{ opacity: 0.2, ...style }}>
      {/* Sand cloud layers */}
      <path d="M2 38 Q15 28 28 34 Q38 22 50 32 Q60 24 68 30 L68 45 L2 45Z"
        fill={color} opacity="0.25" stroke={color} strokeWidth="0.8" />
      {/* Second wave */}
      <path d="M2 32 Q12 22 25 28 Q37 16 52 26 Q62 18 68 24"
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Sun partially obscured */}
      <circle cx="50" cy="12" r="10" fill="#FF9A3C" opacity="0.25" />
      <circle cx="50" cy="12" r="7" fill="#FF9A3C" opacity="0.35" />
      {/* Dust particles */}
      {[{x:12,y:20},{x:25,y:14},{x:38,y:18},{x:55,y:8},{x:18,y:28},{x:42,y:10}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} opacity="0.5" />
      ))}
      {/* Wind lines */}
      <line x1="2" y1="18" x2="40" y2="12" stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
      <line x1="2" y1="24" x2="35" y2="20" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
    </svg>
  );
}

// â”€â”€â”€ Deco map per node â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DECO_MAP = {
  'serpiente': [DecoSerpent, DecoSolarBarge, DecoEclipse],
  'eclipses': [DecoEclipse, DecoSaros, DecoSerpent],
  'asteroide-2029': [DecoAsteroid, DecoEclipse, DecoSerpent],
  'peligro': [DecoAsteroid, DecoChicxulub, DecoSerpent],
  'ciclo-saros': [DecoSaros, DecoEclipse, DecoSolarBarge],
  'dart': [DecoDARTMission, DecoAsteroid, DecoChicxulub],'libro-muertos': [DecoSolarBarge, DecoSerpent, DecoEclipse],
  'legado-caos': [DecoChicxulub, DecoAsteroid, DecoDARTMission],
};

// â”€â”€â”€ Infographic Nodes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Brozovic, M. et al. (2018). Goldstone and Arecibo radar observations of (99942) Apophis, Icarus, 300',
  'NASA/JPL (2021). Apophis: Planetary Defense Exercise, NASA Technical Report',
  'Daly, R.T. Et al. (2023). Successful kinetic impact into asteroid Dimorphos, Nature, 616',
  'Krupp, E.C. (1991). Beyond the Blue Horizon: Myths and Legends of the Sun, Moon, Stars, and Planets, HarperCollins',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'serpiente',
    title: 'La Serpiente del Caos',
    color: '#FF5252',
    btnImage: '/assets/egypt/infographic_apofis/btn_serpiente.png',
    image: '/assets/egypt/infographic_apofis/hero_serpiente.png',
    content: [
      'Imagina que cada noche, cuando el sol se mete en el horizonte, comienza una batalla épica que tú no puedes ver porque está pasando en otro mundo. Eso es exactamente lo que creían los egipcios. Para ellos, el sol no simplemente "se apagaba" como una lámpara. Ra, el dios del Sol, subía a su barca sagrada y navegaba por el inframundo toda la noche para poder volver a salir por el oriente al amanecer. ¡Y cada noche, una serpiente gigante intentaba detenerlo!',
      'Apofis (también llamado Apep) era la serpiente del caos: un monstruo tan enorme que medía decenas de kilómetros de longitud, tan grande que su cuerpo podía rodear el mundo entero. Vivía en las profundidades del abismo primordial, en la oscuridad total que existía antes de que el universo tuviera orden. Su único objetivo: devorar a Ra y su barca solar, apagar el sol para siempre y hundir todo en el caos eterno.',
      'Lo fascinante es que cada noche Ra ganaba. Y cada noche, Apofis volvía a intentarlo. Era el ciclo eterno: oscuridad contra luz, caos contra orden, muerte contra vida. Cada amanecer era la prueba de que Ra había ganado otra vez. Para los egipcios, ver salir el sol cada mañana no era algo que daban por sentado: era la celebración de una victoria cósmica que podría no haberse logrado.',
      'Seth, que en otros mitos egipcios es el villano (el asesino de Osiris), aquí es el héroe. Cada noche viajaba en la barca de Ra y luchaba con su lanza contra Apofis. Era el único dios lo suficientemente feroz y caótico para combatir a la serpiente del caos. Fue la primera vez en la historia donde "controlar el caos con caos" fue una estrategia oficial de los dioses.',
      'Esta historia no era solo un cuento para niños. Los sacerdotes en los templos realizaban rituales cada noche para ayudar a Ra en su batalla. Leían en voz alta hechizos del "Libro de Apofis" (Libro para expulsar a Apep), que describían con detalle cómo cortar, atar, quemar, escupir y disolver a la serpiente. El ritual era tan importante que se hacía incluso cuando había sol: la batalla nunca paraba.',
    ],
    fact: 'El nombre "Apofis"viene del griego, pero en egipcio antiguo se decía"Apep". En los textos más antiguos (Textos de los Ataúdes, ca. 2100 a.C.), se describen los rituales exactos para combatirlo. Un papiro del Museo Británico (Papiro Bremner-Rhind, ca. 300 a.C.) contiene el"Libro de Apep" con 75 hechizos específicos para derrotar a la serpiente, incluyendo instrucciones para escupirle, pisotearle la cabeza, y quemarlo a fuego lento. ¡Hasta hoy es uno de los rituales más elaborados conocidos de cualquier civilización antigua!',
  },
  {
    id: 'eclipses',
    title: 'Los Eclipses: Apofis Gana',
    color: '#D32F2F',
    btnImage: '/assets/egypt/infographic_apofis/btn_eclipses.png',
    image: '/assets/egypt/infographic_apofis/hero_eclipses.png',
    content: [
      'Imagina que estás en el campo hace 3,000 años sin internet, sin televisión y sin que nadie te haya explicado qué es la Luna o cómo funciona el sistema solar. De repente, a pleno mediodía, el cielo comienza a oscurecerse. El sol â€”que estaba radianteâ€” empieza a tener una mordida que crece poco a poco. Los pájaros dejan de cantar. Las vacas empiezan a caminar hacia el establo como si fuera de noche. La temperatura baja varios grados en minutos. Y entonces el sol desaparece completamente. ¿Qué sentirías?',
      'Para los egipcios, eso era exactamente lo que pasaba cuando Apofis lograba engullir al Sol. Un eclipse solar total puede durar hasta 7 minutos y 32 segundos. Durante ese tiempo, las estrellas aparecen en pleno día, el horizonte se pinta de naranja y rojo, y el corona del Sol â€”un halo de fuego que normalmente no se puede verâ€” aparece como una corona dorada alrededor del disco negro. Debía ser uno de los espectáculos más aterradores imaginables para alguien que no sabía que era temporal.',
      'Los eclipses solares ocurren porque la Luna â€”que es 400 veces más pequeña que el Solâ€” está exactamente 400 veces más cerca de la Tierra. Este "accidente cósmico" de escala hace que desde la Tierra, la Luna y el Sol parezcan exactamente del mismo tamaño cuando los miramos. Si la Luna fuera un poquito más pequeña o estuviera un poquito más lejos, solo veríamos eclipses parciales, nunca el espectáculo completo. ¡Es literalmente la coincidencia más alucinante del sistema solar!',
      'Sin embargo, los sacerdotes egipcios no los vivían completamente en pánico. Con suficientes registros y observaciones, se dieron cuenta de que los eclipses seguían un patrón. Llevando registros durante generaciones, descubrieron el ciclo de repetición y podían predecir aproximadamente cuándo vendría el próximo. Esto les daba poder: podían avisar al pueblo con anticipación y decirles "el sol va a desaparecer pero Ra ganará de nuevo".',
      'Los eclipses lunares (cuando la sombra de la Tierra cubre la Luna) también tenían explicación mítica: eran las pequeñas victorias de Apofis, que mordisqueaba incluso la barca de la Luna en su camino. La Luna roja sangre que vemos en los eclipses lunares totales â€”causada porque la atmósfera de la Tierra refracta la luz roja hacia la Lunaâ€” era, para los egipcios, la sangre de la batalla entre Ra y la serpiente.',
    ],
    fact: 'El eclipse solar total más largo posible dura exactamente 7 minutos y 32 segundos, y ocurre muy raramente. Los próximos grandes eclipses totales son: el 26 de enero de 2028 visible desde España y Portugal (â‰ˆ5 min), y el 2 de agosto de 2028 visible desde Australia y Nueva Zelanda. Los eclipses totales ocurren en cualquier lugar de la Tierra en promedio una vez cada 375 años. Si vives en el mismo lugar toda tu vida, estadísticamente solo verás uno o dos eclipses totales. ¡Son extraordinariamente raros para los observadores fijos!',
  },
  {
    id: 'ciclo-saros',
    title: 'El Ciclo Saros',
    color: '#E53935',
    btnImage: '/assets/egypt/infographic_apofis/btn_saros.png',
    image: '/assets/egypt/infographic_apofis/hero_saros.png',
    content: [
      'Ahora imagina que eres el sacerdote-astrónomo más inteligente de Egipto. Tienes acceso a 500 años de registros de eclipses escritos en papiro por tus predecesores. Un día, mientras estudias los registros, notas algo: los eclipses parecen repetirse en grupos. Después de exactamente 18 años, 11 días y 8 horas, aparece un eclipse muy similar al que ocurrió antes. ¡Acabas de descubrir el ciclo Saros sin que nadie te lo enseñara!',
      'El ciclo Saros es uno de los patrones astronómicos más elegantes de la naturaleza. Ocurre porque tres ciclos lunares diferentes "se sincronizan" perfectamente cada 18.03 años: el ciclo sinódico (lunación: 29.53 días), el ciclo dracónico (cuando la Luna cruza la eclíptica: 27.21 días) y el ciclo anomalístico (órbita completa de la Luna: 27.55 días). Cuando estos tres coinciden, los eclipses se repiten casi idénticamente.',
      'Los astrónomos babilonios y egipcios del primer milenio antes de Cristo usaban este ciclo para predecir eclipses con meses de anticipación. No necesitaban entender por qué funcionaba, solo necesitaban los registros históricos. Era como si tuvieras una caja de música muy larga: no necesitas saber cómo funciona mecánicamente para saber qué nota sonará la próxima. Con 18 años de registros, podías ver el patrón.',
      'Cada familia de eclipses en el ciclo Saros se llama "serie Saros". Cada serie dura entre 1,200 y 1,500 años y produce entre 69 y 87 eclipses. En este momento, hay 40 series Saros activas para eclipses solares. Cada eclipse solar que ves pertenece a una familia específica con su propio"número Saros". El eclipse del 21 de agosto de 2017 (el "gran eclipse americano") fue el Saros 145, el mismo ciclo que el eclipse del 11 de agosto de 1999 sobre Europa.',
      'Hoy usamos computadoras para calcular eclipses con precisión de milisegundos, miles de años en el futuro o el pasado. Pero el principio es el mismo que descubrieron los sacerdotes egipcios: la naturaleza tiene ritmos perfectamente periódicos. Y esos ritmos, una vez descubiertos, nos dan el poder de predecir el futuro. El conocimiento es la verdadera magia.',
    ],
    fact: 'El Eclipse Total de 2099 (12 de septiembre) sobre México durará 6 minutos 22 segundos, uno de los más largos del siglo XXI en América. Ya puedes marcarlo en tu calendario, aunque sea muy lejos. Los astrónomos babilonios del siglo VII a.C. Predecían eclipses con una exactitud de Â±3 días usando el ciclo Saros. La NASA hoy puede predecir eclipses con precisión de segundos para los próximos 5,000 años. ¡La diferencia es la potencia de cómputo, no el principio matemático!',
  },
  {
    id: 'asteroide-2029',
    title: 'Apophis: El Asteroide Real',
    color: '#C62828',
    btnImage: '/assets/egypt/infographic_apofis/btn_asteroid2029.png',
    image: '/assets/egypt/infographic_apofis/hero_asteroid2029.png',
    content: [
      'El 19 de junio de 2004, los astrónomos Roy Tucker, David Tholen y Fabrizio Bernardi descubrieron un nuevo asteroide usando el telescopio de la Universidad de Arizona. Cuando calcularon su órbita, algo los dejó sin palabras: el asteroide se acercaba peligrosamente a la Tierra. Lo llamaron "Apophis"en honor a la serpiente del caos egipcia, porque â€”como la serpiente míticaâ€” este asteroide amenazaba con"destruir el mundo".',
      'Apophis mide aproximadamente 370 metros de diámetro. Para que te imagines el tamaño: es más alto que el Empire State Building de Nueva York (443 metros de punta a punta). Si lo pusieras en una ciudad, abarcaría varias manzanas y sería más alto que cualquier edificio de México. No es del tamaño de los asteroides que matan dinosaurios, pero sería devastador si cayera en una ciudad o zona densamente poblada.',
      'En diciembre de 2004, los cálculos orbitales iniciales daban un 2.7% de probabilidad de impacto con la Tierra en 2029. Eso puede sonar pequeño, pero en el mundo de la defensa planetaria, el 2.7% es una alarma de nivel máximo. Para ponerlo en perspectiva: si un médico te dijera que tienes 2.7% de probabilidad de que algo grave pase durante una operación simple, sería suficiente para preocuparte seriamente.',
      'Con más observaciones durante los siguientes años, la probabilidad de impacto en 2029 fue descartada. Luego calcularon posible impacto en 2036 (también descartado). Luego en 2068 (también descartado en 2021). La NASA anunció en marzo de 2021 que Apophis NO impactará la Tierra en ninguna de esas fechas. Las órbitas del sistema solar son caóticas a largo plazo, pero tenemos suficientes datos para estar seguros por al menos los próximos 100 años.',
      'Lo que SÍ ocurrirá el 13 de abril de 2029 es histórico: Apophis pasará a solo 31,600 km de la Tierra, más cerca que los satélites geoestacionarios de comunicaciones (que orbitan a 35,786 km) y muchísimo más cerca que la Luna (384,400 km). Pasará entre la órbita GPS y los satélites geoestacionarios â€”una zona donde orbitan cientos de satélites humanos. Será visible a simple vista desde Europa, África y Asia, como un punto de luz moviéndose rápido a través del cielo nocturno. ¡Nunca en la historia registrada un asteroide de ese tamaño ha pasado tan cerca!',
    ],
    fact: 'El 13 de abril de 2029, Apophis llegará a su máxima proximidad a las 21:46 UTC. Desde Europa, se verá moverse a través del cielo nocturno como una estrella que avanza a velocidad visible, pasando de la constelación de Cáncer a Sagitario en pocas horas. Su magnitud aparente llegará a 3.1, perfectamente visible a simple vista (las estrellas de la Osa Mayor tienen magnitud 2). ¡Será el espectáculo astronómico gratuito más grande del siglo XXI!',
  },
  {
    id: 'peligro',
    title: 'La Amenaza Real',
    color: '#B71C1C',
    btnImage: '/assets/egypt/infographic_apofis/btn_peligro.png',
    image: '/assets/egypt/infographic_apofis/hero_peligro.png',
    content: [
      'Los egipcios tenían razón en algo fundamental: los peligros del cielo son reales. Un asteroide del tamaño de Apophis (370 metros) que impactara la Tierra liberaría una energía de aproximadamente 1,200 megatones de TNT. Para que compares: la bomba atómica de Hiroshima liberó 0.015 megatones. El impacto de Apophis sería unas 80,000 veces más poderoso que Hiroshima.',
      'Si Apophis cayera en tierra firme, crearía un cráter de varios kilómetros de diámetro y destruiría un área del tamaño de un país europeo mediano â€”piensa en Bélgica o Costa Ricaâ€” con el impacto directo. La onda de choque podría destruir edificios en un radio mucho mayor. El polvo lanzado a la atmósfera podría reducir la luz solar globalmente durante meses, afectando cosechas en todo el mundo.',
      'Si cayera en el océano, sería potencialmente peor: generaría tsunamis masivos que podrían devastar costas en miles de kilómetros. El impacto del Tunguska en 1908 (Siberia) fue causado por un objeto de solo 50-80 metros â€”¡menor que Apophis!â€” y aplanó 2,150 kmÂ² de bosque siberiano, derribando 80 millones de árboles. Si hubiera ocurrido sobre una ciudad, habría sido una catástrofe histórica.',
      'El caso más extremo conocido es el impacto de Chicxulub hace 66 millones de años. Un asteroide de 10-15 km de diámetro impactó en lo que hoy es la Península de Yucatán, México. La energía liberada fue equivalente a miles de millones de bombas de Hiroshima. La nube de polvo y ceniza bloqueó el sol durante años, colapsando la cadena alimentaria. El resultado: la extinción del 75% de todas las especies, incluyendo los dinosaurios no aviares.',
      'La ironía más profunda: sin el impacto de Chicxulub, probablemente los dinosaurios seguirían dominando la Tierra y los mamíferos serían criaturas pequeñas y marginales. Sin ese impacto, no habrían evolucionado los primates, no habrían evolucionado los humanos, y no habría nadie leyendo esto ahora mismo. La serpiente del caos no solo destruye: a veces, también crea. La extinción de los dinosaurios fue nuestra oportunidad.',
    ],
    fact: 'Existen hoy unos 2,200 asteroides clasificados como "Objetos Potencialmente Peligrosos" (PHAs), que tienen órbitas que cruzan la órbita de la Tierra y son lo suficientemente grandes (>140 metros) para causar daño regional si impactaran. La NASA estima que conocemos el 40% de todos los PHAs mayores de 140 metros que existen. El 60% restante todavía no ha sido descubierto. El telescopio espacial NEOWISE (NASA) y el futuro NEO Surveyor buscan activamente estos objetos.',
  },
  {
    id: 'dart',
    title: 'DART: Vencer a Apofis',
    color: '#E53935',
    btnImage: '/assets/egypt/infographic_apofis/btn_dart.png',
    image: '/assets/egypt/infographic_apofis/hero_dart.png',
    content: [
      'El 26 de septiembre de 2022, la humanidad hizo algo que ninguna civilización antes pudo hacer: cambió deliberadamente la trayectoria de un asteroide en el espacio. La misión DART (Double Asteroid Redirection Test) de la NASA chocó intencionalmente contra Dimorphos, el pequeño satélite del asteroide Didymos, y lo funcionó: el período orbital de Dimorphos se acortó en 33 minutos. Los egipcios habrían llamado a esto "expulsar a Apofis con la lanza de Seth".',
      'La misión DART fue conceptualmente simple pero técnicamente monumental. Una nave espacial del tamaño de una nevera viajó millones de kilómetros a 22,500 km/h y golpeó un asteroide de 160 metros de diámetro con una precisión asombrosa. La cámara DRACO transmitió imágenes en tiempo real hasta los últimos instantes antes del impacto. Miles de personas en el centro de control de la NASA vieron en vivo cómo la señal desapareció: impacto confirmado.',
      'El truco del "impacto cinético" funciona así: no necesitas destruir el asteroide (como en las películas). Solo necesitas darle un pequeño empujoncito que altere ligerísimamente su velocidad. Si cambias la velocidad del asteroide en solo unos pocos milímetros por segundo, años antes de que llegue a la Tierra, ese pequeño cambio acumulado en millones de kilómetros de viaje hará que pase por un punto completamente diferente. ¡Como desviar una pelota que viene hacia ti dándole un toquecito años antes de que llegue!',
      'La misión OSIRIS-Apex (antes llamada OSIRIS-REx, que ya recolectó muestras del asteroide Bennu y las entregó en septiembre de 2023) está actualmente viajando hacia Apophis. Llegará justo después del paso cercano a la Tierra en abril de 2029, cuando la gravedad terrestre habrá alterado ligeramente la órbita y rotación de Apophis. Estudiará exactamente cómo un encuentro gravitacional con la Tierra cambia un asteroide.',
      'La defensa planetaria es una de las pocas amenazas existenciales que la humanidad puede prevenir activamente con tecnología disponible hoy. A diferencia del cambio climático (que requiere cambios masivos de comportamiento social) o las pandemias (impredecibles), los impactos de asteroides son predecibles con décadas de anticipación y prevenibles con tecnología actual. Solo necesitamos detectar el peligro con suficiente antelación para actuar.',
    ],
    fact: 'La misión DART costó 330 millones de dólares: aproximadamente el mismo presupuesto que una película de Hollywood de gran producción. Para el costo de salvar potencialmente a millones de personas, es una de las mejores inversiones de la historia de la humanidad. La misión de seguimiento de la ESA llamada Hera fue lanzada en octubre de 2024 y llegará a Dimorphos en enero de 2027 para estudiar en detalle el cráter que dejó DART y medir exactamente cuánto cambió la órbita.',
  },
  {
    id: 'libro-muertos',
    title: 'El Libro para Vencer a Apofis',
    color: '#FF5252',
    btnImage: '/assets/egypt/infographic_apofis/btn_libro.png',
    image: '/assets/egypt/infographic_apofis/hero_libro.png',
    content: [
      'El "Libro de los Muertos"egipcio tiene un nombre incorrecto: su nombre real en egipcio antiguo es"Reu nu pert em hru", que se traduce como "Libro para Salir al Día". No era un libro para los muertos: era un manual de instrucciones para que el alma del difunto pudiera navegar con éxito por el inframundo, ayudar a Ra en su batalla nocturna, y salir triunfante al amanecer, exactamente como el Sol.',
      'Dentro de este "manual", hay un capítulo especialmente importante: el Capítulo 39, "Hechizo para repeler a Apophis". En él, el difunto (que viajaba en la barca de Ra como pasajero) recitaba fórmulas específicas para debilitar a la serpiente. Incluía instrucciones detalladas:"Retrocede, Apep, enemigo de Ra. La llama de Ra te quema. Las palabras de Ra te atan. Retrocede al lago de fuego, al Nun del sur."',
      'Los rituales del templo contra Apofis eran elaboradísimos y se realizaban todos los días. Los sacerdotes hacían un muñeco de arcilla o cera con la forma de Apofis, le escribían encima el nombre de la serpiente con tinta verde, y luego lo escupían, pisoteaban, quemaban y disolvían en ácido (vinagre). Cada acción de destrucción del muñeco debilitaba mágicamente al Apofis real. Es el concepto de "magia simpática": lo que le haces a la representación le pasa al original.',
      'El fascinante paralelo moderno: los físicos y astrónomas de defensa planetaria también hacen "modelos"de asteroides â€”representaciones computacionales en 3Dâ€” y los"atacan" virtualmente con diferentes métodos para ver cuál funciona mejor. Simulan impactos, explosiones nucleares en la superficie, y empujoncitos gravitacionales. Es magia simpática del siglo XXI: lo que le pasa al modelo virtual nos dice qué pasará con el original.',
      'El concepto más profundo del "Libro para Salir al Día"es que el ser humano â€”incluso el alma de un difuntoâ€” no era un espectador pasivo del cosmos: era un participante activo en la lucha cósmica entre el orden y el caos. Esta idea de que los humanos tienen responsabilidad en mantener el cosmos funcionando es sorprendentemente moderna. Hoy la llamamos"defensa planetaria" y "responsabilidad de civilización".',
    ],
    fact: 'El Papiro de Ani, conservado en el Museo Británico, es el ejemplo más famoso y completo del "Libro para Salir al Día". Tiene 23.5 metros de largo y fue escrito alrededor del 1250 a.C. para un escriba llamado Ani y su esposa Tutu. Fue encontrado en Tebas en 1888 y vendido al Museo Británico. El papiro incluye ilustraciones de los rituales contra Apofis, el Juicio del Alma ante Osiris, y el Campo de las Cañas (el paraíso egipcio). Hoy puedes verlo digitalmente en la colección en línea del British Museum.',
  },
  {
    id: 'legado-caos',
    title: 'El Caos que nos Creó',
    color: '#FF1744',
    btnImage: '/assets/egypt/infographic_apofis/btn_legado.png',
    image: '/assets/egypt/infographic_apofis/hero_legado.png',
    content: [
      'Aquí está la paradoja más grande del cosmos: Apofis, la serpiente del caos, tiene razón. El universo no es un lugar seguro ni ordenado. Los impactos de asteroides, las explosiones de supernovas, las colisiones galácticas: el caos cósmico es real y permanente. Pero hay algo que los egipcios no sabían: ese mismo caos es lo que nos creó. Sin caos, no existe la vida.',
      'El impacto de Chicxulub hace 66 millones de años acabó con el 75% de las especies de la Tierra. Fue la quinta extinción masiva de la historia de nuestro planeta. Los dinosaurios no aviares (todos excepto los que evolucionaron en aves) desaparecieron en menos de un millón de años. Parecía el fin del mundo. Pero en ese vacío ecológico enorme, los pequeños mamíferos que habían sobrevivido escondidos en madrigueras comenzaron a diversificarse y ocupar los nicones que dejaron los dinosaurios.',
      'En 10 millones de años después del impacto, los mamíferos habían pasado de ser criaturas del tamaño de un ratón a producir ballenas, elefantes, y primates. En 60 millones de años después del impacto, un primate bípedo inteligente estaba pintando bisontes en las cuevas de Altamira. En 66 millones de años exactos, ese primate estaba construyendo telescopios para vigilar el cielo en busca de asteroides. El caos destruyó a los dinosaurios. Y el caos, indirectamente, nos creó.',
      'El sistema de alerta temprana de asteroides actual incluye el Catalina Sky Survey, Pan-STARRS en Hawái, el Observatorio de Monte Palomar, y varios otros telescopios que escanean el cielo completo cada semana. Cuando detectan un "objeto que se mueve" contra el fondo fijo de las estrellas, calculan su órbita en horas. Si hay peligro, el mundo entero lo sabría en días. Es la versión moderna de los sacerdotes egipcios vigilando el cielo todas las noches buscando señales de Apofis.',
      'El legado más profundo del mito de Apofis no es la serpiente ni el caos: es la idea de que el universo exige vigilancia constante y acción colectiva. Los sacerdotes egipcios realizaban sus rituales cada noche, sin excepción, porque sabían que la batalla nunca terminaba. Hoy, miles de astrónomos en todo el mundo trabajan cada noche â€”también sin excepciónâ€” vigilando el cielo para que ningún Apophis real pille a la humanidad desprevenida. Somos los Ra modernos.',
    ],
    fact: 'La probabilidad de que un asteroide del tamaño de Apophis (370 metros) golpee la Tierra en cualquier siglo dado es aproximadamente del 0.016% (1 en 6,250 años). Para asteroides de 1 km, es una vez cada 500,000 años. Para el devastador evento tipo Chicxulub (10+ km), es una vez cada 100 millones de años. El riesgo es real pero gestionable â€”especialmente si detección y deflexión se invierten adecuadamente. Los egipcios inventaron la vigilancia del cielo. Nosotros la perfeccionamos.',
  },
];

// â”€â”€â”€ Animated Chaos Field (stars + serpent-like particles) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ChaosField() {
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
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      col: Math.random() > 0.85 ? '#FF5252' : Math.random() > 0.6 ? '#FFD700' : '#ffffff',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col === '#FF5252'
          ? `rgba(255, 82, 82, ${Math.max(0, opacity)})`
          : s.col === '#FFD700'
            ? `rgba(255, 215, 0, ${Math.max(0, opacity)})`
            : `rgba(200, 180, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Apofis SVG Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ApofisHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 640 130" style={{ width: '100%', maxWidth: '640px', height: 'auto', filter: 'drop-shadow(0 0 14px rgba(255,82,82,0.35))' }}>
        {/* Serpent body across the top */}
        <motion.path
          d="M20 45 Q80 20 140 45 Q200 70 260 45 Q320 20 380 45 Q440 70 500 45 Q560 20 620 45"
          fill="none" stroke="#FF5252" strokeWidth="3" strokeLinecap="round"
          animate={{ pathLength: [0, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 6px #FF5252)' }}
        />
        {/* Serpent head (right side) */}
        <motion.ellipse cx="618" cy="45" rx="12" ry="8" fill="#FF5252" opacity="0.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Forked tongue */}
        <motion.path d="M630 45 L642 40 M630 45 L642 50" fill="none" stroke="#FF5252" strokeWidth="2"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Eclipse in center */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = Math.PI * deg / 180;
          return <motion.line key={i}
            x1={320 + 28 * Math.cos(r)} y1={65 + 28 * Math.sin(r)}
            x2={320 + 42 * Math.cos(r)} y2={65 + 42 * Math.sin(r)}
            stroke="#FFD700" strokeWidth={i % 2 === 0 ? 2 : 1.2} strokeLinecap="round"
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
          />;
        })}
        <circle cx="320" cy="65" r="25" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />
        <circle cx="320" cy="65" r="22" fill="#1A0010" opacity="0.95" />
        <circle cx="320" cy="65" r="22" fill="none" stroke="#FF5252" strokeWidth="3" opacity="0.5"
          style={{ filter: 'drop-shadow(0 0 8px #FF5252)' }}
        />
        {/* Stars around eclipse */}
        {[{x:270,y:30},{x:375,y:28},{x:245,y:65},{x:400,y:68},{x:268,y:100},{x:375,y:98}].map((s,i) => (
          <motion.circle key={i} cx={s.x} cy={s.y} r="2.5" fill={i % 2 === 0 ? '#FF5252' : '#FFD700'}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        {/* Asteroid approaching */}
        <motion.circle cx="100" cy="90" r="7" fill="#FF5252" opacity="0.4"
          animate={{ x: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.line x1="85" y1="90" x2="72" y2="94" stroke="#FF5252" strokeWidth="2"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Title */}
        <text x="320" y="104" textAnchor="middle" fill="#FF5252" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">APOFIS</text>
        <text x="320" y="122" textAnchor="middle" fill="rgba(255,82,82,0.6)" fontSize="10" fontFamily="monospace" letterSpacing="2.5">EL DEVORADOR DE SOLES · CAOS Y COSMOS</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : wasExplored ? node.color + '55' : 'rgba(255,82,82,0.2)'}`,
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
            <span style={{ color: '#1A0010', fontSize: '10px', fontWeight: 900 }}>âœ“</span>
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
        <motion.div layoutId="activeDotM14"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

// â”€â”€â”€ Two-Image Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”€â”€â”€ Content Panel (Estándar M9) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '6%', right: '-10px', rotate: 10 },
    { top: '40%', left: '-14px', rotate: -8 },
    { bottom: '10%', right: '6px', rotate: 16 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(15, 5, 5, 0.94)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}28`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.65)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color,
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
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${node.color}20, rgba(0,0,0,0.6))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title}
            onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.88, minHeight: '280px' }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 1.8rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,82,82,0.04)', borderRadius: '12px',
                padding: '1.1rem 1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#1A0000',
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
            background: `linear-gradient(135deg, ${node.color}10, ${node.color}04)`,
            border: `1px solid ${node.color}28`, borderRadius: '16px',
            padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem',
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
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.72 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(255,82,82,0.18)',
    }}>
      <Star size={14} style={{ color: '#FF5252', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B0000, #FF5252, #FF1744)', borderRadius: '3px', boxShadow: '0 0 8px rgba(255,82,82,0.5)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FF5252', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM14() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,2,2,0.92) 0%, rgba(25,5,5,0.85) 35%, rgba(10,2,2,0.95) 100%), url(/assets/egypt/infographic_apofis/bg_apofis.png)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(255,82,82,0.15)',
      boxShadow: '0 0 60px rgba(30,0,0,0.9), inset 0 0 80px rgba(0,0,0,0.4)',
    }}>
      <ChaosField />
      <ApofisHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(255,82,82,0.75)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2,
        marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index}
            isActive={activeNode === node.id}
            explored={explored}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(255,82,82,0.08)', borderRadius: '16px',
              border: '1px solid rgba(255,82,82,0.28)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FF5252', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ ¡Has vencido al Devorador de Soles!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Vencedor de las Sombras
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