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
    "id": "serpiente",
    "bannerImage": "/assets/egypt/infographic_m14/banner_astronomia-egipcia.webp",
    "title": "La Serpiente del Caos",
    "color": "#FF5252",
    "btnImage": "/assets/egypt/infographic_apofis/btn_serpiente.webp",
    "image": "/assets/egypt/infographic_apofis/hero_serpiente.webp",
    "content": [
      "En el panteón mitológico del Antiguo Egipto no existía una encarnación del mal más temible y destructiva que Apofis, conocido en jeroglíficos como Apep. Representado como una serpiente monstruosa de dimensiones titánicas que medía más de dieciséis metros de longitud en los relieves sagrados, Apofis no era un dios convencional al que se pudiera rendir culto o realizar ofrendas pacíficas, sino la personificación viviente de Isfet: el caos primordial y la entropía cósmica.",
      "A diferencia de las divinidades benévolas creadas por el dios solar Atum, la teología afirmaba que Apofis había surgido espontáneamente del fluido amniótico o cordón umbilical derramado por la diosa Neit en las aguas abisales del Nun. Al no haber sido engendrado por la palabra creadora de Maat, el monstruo carecía de alma inmortal (ba) y habitaba en la oscuridad infinita del inframundo, animado por un único odio obsesivo: aniquilar la luz del Sol y revertir el universo al silencio primordial.",
      "Cada noche, cuando la barca solar Mesektet descendía a las profundidades de la Duat, Apofis emergía de las tinieblas para emboscar al dios Ra. Con su mirada hipnótica y sus ensordecedores silbidos de trueno, la serpiente intentaba paralizar a la comitiva divina y beberse de golpe las aguas del río cósmico subterráneo, provocando que la barca encallara en bancos de arena estéril para devorar al disco solar en su indefensión.",
      "Para repeler el asalto diario del monstruo, Ra contaba con guerreros formidables en la proa de su navío. El más destacado era el dios Seth, señor de las tormentas y la fuerza bruta del desierto, quien resistía la mirada paralizante de Apofis y arponaba su cuerpo escamoso con una gran lanza de cobre estelar. En otras tradiciones, era la diosa leona Bastet o el gran Gato solar de Heliópolis quien rebanaba la cabeza de la serpiente bajo el árbol sagrado de Ished.",
      "Aunque Apofis era derrotado, acuchillado y quemado ritualmente al término de cada vigilia nocturna, el monstruo jamás podía ser destruido de forma definitiva. Al ser la manifestación natural de las fuerzas del caos inherentes al tejido del cosmos, renacía inexorablemente cada crepúsculo. Esta lucha perpetua recordaba a los egipcios que el orden del universo no era una garantía estática, sino una conquista heroica renovada cada amanecer."
    ],
    "fact": "La serpiente Apofis aparece documentada en textos funerarios desde el Reino Medio, describiéndose en el Libro de las Puertas con una longitud de treinta codos reales (quince coma siete metros) y pliegues ondulantes que aprisionaban las doce cavernas subterráneas de la Duat, personificando el principio del no-ser (Isfet) en oposición al orden cósmico universal (Maat).",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los Textos de los Sarcófagos se describe que los ojos de Apofis eran de pedernal ardiente y su aliento emitía miasmas sulfurosos que marchitaban la vegetación terrenal; cuando los escribas reales escribían su nombre jeroglífico, atravesaban el ideograma de la serpiente con puñales grabados para neutralizar mágicamente su poder."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La figura mitológica de Apofis se inspiró biológicamente en la pitón africana de roca (Python sebae), la serpiente más grande de África capaz de alcanzar siete metros y medio de longitud, y en restos fósiles de serpientes marinas gigantescas del Eoceno (Gigantophis garstini) halladas en los estratos calizos de Fayum."
      }
    ]
  },
  {
    "id": "eclipses",
    "bannerImage": "/assets/egypt/infographic_m14/banner_astronomia-medica.webp",
    "title": "Los Eclipses: Apofis Gana",
    "color": "#D32F2F",
    "btnImage": "/assets/egypt/infographic_apofis/btn_eclipses.webp",
    "image": "/assets/egypt/infographic_apofis/hero_eclipses.webp",
    "content": [
      "En una civilización donde el Sol era la fuente incuestionable de toda vida biológica, calor y orden moral sobre la faz de la tierra, la desaparición repentina del astro rey en pleno mediodía constituía una experiencia sobrecogedora y aterradora. Cuando se producía un eclipse solar total, el firmamento despejado de Egipto se teñía súbitamente de un crepúsculo espectral, bajaba bruscamente la temperatura y las estrellas se hacían visibles en pleno día.",
      "Para la teología del Antiguo Egipto, este fenómeno astronómico no era un simple alineamiento de sombras celestes, sino la temida manifestación física de que la serpiente Apofis había logrado una victoria temporal sobre el dios Ra. Se creía que el monstruo del abismo había saltado desde las profundidades del inframundo para engullir directamente la barca solar entre sus fauces oscuras, amenazando con extinguir la creación para siempre.",
      "Durante los minutos de oscuridad total del eclipse, el pánico y el fervor religioso se apoderaban de los templos de todo el país. Los sacerdotes no se quedaban paralizados como observadores pasivos: corrían de inmediato a los patios abiertos haciendo sonar ruidosamente campanas de bronce, sistros hathóricos y tambores sagrados para aturdir al monstruo celestial y obligarlo a soltar a su presa divina.",
      "Al mismo tiempo, los sacerdotes lectores entonaban a gritos los conjuros de protección más violentos del arsenal litúrgico egipcio, amenazando a la serpiente cósmica con el fuego devorador del ojo de Ra y con los cuchillos afilados del dios Horus. En los altares exteriores se encendían piras de madera aromática y se sacrificaban patos negros y figuras de cera roja que representaban al demonio devorador.",
      "Cuando el disco plateado de la Luna proseguía su avance orbital y los primeros rayos resplandecientes del Sol volvían a asomar por el borde lunar, estallaba un júbilo multitudinario a lo largo del Nilo. La luz había triunfado una vez más sobre el desorden: Seth había arponeado nuevamente a la serpiente y el orden cósmico de Maat quedaba restaurado, demostrando a la humanidad que la vida prevalecería sobre las tinieblas."
    ],
    "fact": "Durante un eclipse solar total, la radiación solar incidente sobre el suelo se reduce en más de un 99,9 % en cuestión de setenta segundos, provocando un descenso térmico local de hasta ocho grados Celsius que desorienta por completo a la fauna silvestre y desata vientos crepusculares repentinos, fenómeno atmosférico sobrecogedor que los antiguos interpretaban como el ataque directo de Apofis a la barca solar.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los eclipses de Luna también estaban asociados a los ataques de Apofis; cuando la Luna se teñía de color rojizo cobre durante un eclipse total debido a la refracción de la luz solar en la atmósfera terrestre, los egipcios creían que el satélite estaba empapado en la sangre de las heridas de la batalla celeste."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La coincidencia visual exacta del tamaño aparente del Sol y la Luna en el cielo (ambos con un diámetro angular aproximado de cero coma cinco grados) es un accidente astronómico único: el Sol es cuatrocientas veces más grande que la Luna, pero está exactamente cuatrocientas veces más alejado de la Tierra."
      }
    ]
  },
  {
    "id": "ciclo-saros",
    "bannerImage": "/assets/egypt/infographic_m14/banner_decanos-estelares.webp",
    "title": "El Ciclo Saros",
    "color": "#E53935",
    "btnImage": "/assets/egypt/infographic_apofis/btn_saros.webp",
    "image": "/assets/egypt/infographic_apofis/hero_saros.webp",
    "content": [
      "A pesar del terror mitológico que inspiraban los eclipses en la población general, los astrónomos de los templos no tardaron en advertir que las victorias aparentes de la serpiente Apofis no ocurrían de manera caótica o impredecible. Mediante el registro paciente y sistemático de las ocultaciones solares y lunares en tablas de archivo conservadas en las bibliotecas sagradas («Casas de la Vida»), descubrieron que el caos celeste obedecía a un ritmo matemático riguroso.",
      "Esta periodicidad geométrica fundamental es conocida en la astronomía mundial como el Ciclo Saros. Documentado inicialmente por los astrónomos caldeos y ampliamente asimilado por los sabios del Egipto ptolemaico en Alejandría, el Saros es un período temporal de dieciocho años, once días y ocho horas (exactamente seis mil quinientos ochenta y cinco coma treinta y dos días) tras el cual el Sol, la Tierra y la Luna regresan casi exactamente a la misma geometría orbital relativa.",
      "La base matemática del ciclo Saros descansa en la sincronización armónica de tres períodos orbitales lunares completamente distintos: el mes sinódico (las fases lunares, de 29,53 días), el mes draconítico (el cruce de la Luna por los nodos de la eclíptica, de 27,21 días) y el mes anomalístico (la distancia cambiante de la Luna en su órbita elíptica de perigeo a apogeo, de 27,55 días).",
      "Doscientos veintitrés meses sinódicos equivalen casi con precisión atómica a doscientos cuarenta y dos meses draconíticos y a doscientos treinta y nueve meses anomalísticos. Esta prodigiosa coincidencia orbital provoca que después de transcurrido un ciclo Saros completo, se repita un eclipse con características geométricas, duración y distancias astronómicas prácticamente idénticas al evento sucedido dieciocho años antes.",
      "Sin embargo, debido a las ocho horas fraccionarias adicionales del ciclo Saros (un tercio exacto de día), la rotación diurna de la Tierra desplaza la nueva franja de sombra del eclipse aproximadamente ciento veinte grados hacia el oeste del globo terráqueo. Para que un eclipse se repita en la misma región geográfica del Nilo, deben transcurrir tres ciclos Saros consecutivos (cincuenta y cuatro años y un mes), período conocido en astronomía como el ciclo Exeligmos."
    ],
    "fact": "El ciclo astronómico Saros abarca exactamente seis mil quinientos ochenta y cinco coma treinta y dos días (18 años, 11 días y 8 horas), vinculando doscientos veintitrés meses sinódicos con doscientos cuarenta y dos meses draconíticos para gobernar la periodicidad matemática de los eclipses, permitiendo predecir con asombrosa certeza la recurrencia geométrica de las sombras lunares sobre la Tierra.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El célebre Mecanismo de Anticitera, una computadora analógica de bronce de engranajes diferenciales construida en el siglo segundo antes de Cristo en el ámbito helenístico alejandrino, contaba con un dial espiral de doscientos veintitrés divisiones diseñado específicamente para calcular los eclipses del ciclo Saros."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La inclinación del plano orbital lunar respecto a la eclíptica es de cinco grados y nueve minutos. Por esta inclinación geométrica, la Luna nueva no produce un eclipse cada mes, requiriendo que la conjunción ocurra a menos de dieciocho coma cinco grados de distancia angular de uno de los nodos orbitales."
      }
    ]
  },
  {
    "id": "asteroide-2029",
    "bannerImage": "/assets/egypt/infographic_m14/banner_dendera-planetas.webp",
    "title": "Apophis: El Asteroide Real",
    "color": "#C62828",
    "btnImage": "/assets/egypt/infographic_apofis/btn_asteroid2029.webp",
    "image": "/assets/egypt/infographic_apofis/hero_asteroid2029.webp",
    "content": [
      "El diecinueve de junio de 2004, los astrónomos Roy Tucker, David Tholen y Fabrizio Bernardi descubrieron desde el Observatorio Nacional de Kitt Peak en Arizona un asteroide cercano a la Tierra que revitalizaría para siempre el mito de la serpiente cósmica. Catalogado inicialmente con la designación provisional 2004 MN4, los descubridores bautizaron formalmente a este bólido celeste como 99942 Apophis, en homenaje directo al dios egipcio del caos y la destrucción.",
      "Apophis es un asteroide rocoso perteneciente al grupo de los asteroides Atón, caracterizados por poseer órbitas heliocéntricas cuyo semieje mayor es inferior a una unidad astronómica. Con unas dimensiones estimadas en trescientos cuarenta metros de anchura en su eje medio y una forma alargada irregular similar a un cacahuete cósmico, este gigante de silicatos y metales posee una masa calculada en más de cuarenta millones de toneladas métricas.",
      "Pocos meses después de su descubrimiento, en diciembre de 2004, cálculos orbitales preliminares de alta precisión desataron una alarma científica internacional sin precedentes en la historia de la astronomía moderna. Los modelos matemáticos indicaban que existía una probabilidad alarmante de hasta un dos coma siete por ciento (una entre treinta y siete) de que el asteroide Apophis colisionara frontalmente contra el planeta Tierra en su aproximación del trece de abril de 2029.",
      "Esta escalofriante predicción elevó por primera vez en la historia a un objeto celeste al nivel cuatro de la Escala de Peligro de Impacto Técnico de Turín, movilizando a los mayores telescopios ópticos y radares planetarios del mundo para refinar su trayectoria. Mediciones de radar Doppler ultraprecisas efectuadas desde el radiotelescopio de Goldstone y el telescopio Green Bank lograron descartar definitivamente la posibilidad de una colisión directa en el año 2029.",
      "Sin embargo, el encuentro cercano del trece de abril de 2029 será uno de los espectáculos astronómicos más sobrecogedores del siglo veintiuno. Apophis cruzará el espacio a tan solo treinta y un mil seiscientos kilómetros sobre la superficie de la Tierra, situándose a una distancia más cercana que los satélites geoestacionarios de telecomunicaciones (35.786 km) y haciéndose visible a simple vista como una estrella fugaz para miles de millones de personas en Europa, África y Asia."
    ],
    "fact": "El asteroide 99942 Apophis posee un diámetro medio de trescientos cuarenta metros y una masa de cuarenta y un millones de toneladas, sobrevolando la Tierra el 13 de abril de 2029 a tan solo treinta y un mil seiscientos kilómetros, diez veces más cerca que la Luna, siendo visible a simple vista como una estrella en movimiento para miles de millones de personas.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La fecha en que el asteroide Apophis realizará su aproximación récord a la Tierra, el trece de abril de 2029, caerá curiosamente en viernes trece, una fecha cargada de supersticiones populares en la cultura occidental que muchos entusiastas del espacio vincularon humorísticamente con la serpiente del caos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Durante el sobrevuelo de 2029, las descomunales fuerzas de marea gravitacional ejercidas por la masa de la Tierra sobre Apophis alterarán significativamente su período de rotación de treinta coma seis horas y provocarán microterremotos superficiales que modificarán la distribución de los regolitos de su corteza."
      }
    ]
  },
  {
    "id": "peligro",
    "bannerImage": "/assets/egypt/infographic_m14/banner_eclipse-prediccion.webp",
    "title": "La Amenaza Real",
    "color": "#B71C1C",
    "btnImage": "/assets/egypt/infographic_apofis/btn_peligro.webp",
    "image": "/assets/egypt/infographic_apofis/hero_peligro.webp",
    "content": [
      "Aunque los cálculos astrofísicos modernos han descartado cualquier riesgo de colisión para el asteroide Apophis durante al menos los próximos cien años, estudiar el escenario teórico de un impacto frontal permite a la ciencia planetaria comprender la magnitud devastadora de la energía cinética almacenada en los objetos cercanos a la Tierra (NEO), recordando por qué los antiguos asociaban a estas rocas con cataclismos globales.",
      "La física de un impacto cósmico está regida por la ecuación fundamental de la energía cinética: la energía liberada es directamente proporcional a la mitad de la masa del proyectil multiplicada por el cuadrado de su velocidad de impacto (E = 1/2 m v²). Viajando a una velocidad hiperveloz de más de treinta kilómetros por segundo (ciento ocho mil kilómetros por hora) respecto a la atmósfera terrestre, la masa de cuarenta millones de toneladas de Apophis desataría una fuerza inaudita.",
      "Si un objeto del tamaño de Apophis impactara contra la corteza continental, la liberación de energía superaría de inmediato los mil doscientos megatones de equivalente en trinitrotolueno (TNT). Esta cifra colosal equivale a detonar simultáneamente más de ochenta mil bombas nucleares idénticas a la de Hiroshima, o veinticuatro veces la energía de la Bomba del Zar, el artefacto termonuclear más potente jamás detonado por la humanidad.",
      "El impacto instantáneo vaporizaría la roca sólida de la corteza, excavando un cráter de impacto de más de cinco kilómetros de diámetro y quinientos metros de profundidad en cuestión de segundos. Una bola de fuego térmica incandescente desataría incendios forestales masivos en un radio de cientos de kilómetros, mientras que una onda de choque hiperbárica arrasaría cualquier estructura humana y derribaría bosques enteros en miles de kilómetros cuadrados a la redonda.",
      "En caso de producirse un impacto oceánico en las aguas profundas del Atlántico o el Pacífico, la transferencia de energía al agua desplazaría columnas líquidas colosales, generando megatsunamis con olas iniciales de más de cien metros de altura. Estas olas gigantescas viajarían a través de las cuencas oceánicas a la velocidad de un avión comercial, devastando las franjas costeras habitadas con una fuerza destructiva digna del caos de Isfet."
    ],
    "fact": "El impacto cinético de un asteroide de trescientos cuarenta metros como Apophis liberaría mil doscientos megatones de energía de choque térmico, equivalente a ochenta mil bombas atómicas de Hiroshima, excavando un cráter de cinco kilómetros de diámetro en la corteza terrestre, devastando una superficie regional de miles de kilómetros cuadrados en cuestión de pocos minutos.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El asteroide que provocó la extinción masiva de los dinosaurios no aviares hace sesenta y seis millones de años en Chicxulub (México) tenía un diámetro estimado de diez a catorce kilómetros, liberando una energía de impacto cien millones de megatones, casi cien mil veces superior a la de Apophis, desatando megatsunamis globales y un invierno nuclear de varios años de duración sobre la biosfera terrestre."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La radiación térmica producida por un impacto de mil megatones alcanza temperaturas superficiales en el punto de impacto de más de diez mil grados Kelvin, emitiendo un pulso térmico ultravioleta e infrarrojo capaz de provocar quemaduras de tercer grado en organismos expuestos a más de sesenta kilómetros."
      }
    ]
  },
  {
    "id": "dart",
    "bannerImage": "/assets/egypt/infographic_m14/banner_legado-astronomia.webp",
    "title": "DART: Vencer a Apofis",
    "color": "#E53935",
    "btnImage": "/assets/egypt/infographic_apofis/btn_dart.webp",
    "image": "/assets/egypt/infographic_apofis/hero_dart.webp",
    "content": [
      "A diferencia de los sacerdotes faraónicos, que solo podían recurrir a cantos mágicos y figuras de cera para intentar detener a la serpiente celestial, la humanidad contemporánea ha desarrollado por primera vez en cuatro mil millones de años de historia terrestre la capacidad tecnológica real para desviar asteroides peligrosos y defender activamente la vida de nuestro planeta contra los impactos cósmicos.",
      "Esta revolución tecnológica fue demostrada con éxito rotundo el veintiséis de septiembre de 2022 mediante la misión espacial DART (Double Asteroid Redirection Test), diseñada y ejecutada por la NASA y el Laboratorio de Física Aplicada Johns Hopkins. La nave DART, con una masa de seiscientos diez kilogramos, viajó a través del espacio profundo con un único objetivo: estrellarse deliberadamente a velocidad hiperveloz contra un asteroide para modificar su órbita.",
      "El blanco elegido para la prueba fue Dimorphos, una pequeña luna asteroidal de ciento sesenta metros de diámetro que orbita alrededor de un asteroide mayor llamado Didymos. La nave impactó de lleno contra el centro del cuerpo celeste a una velocidad relativa vertiginosa de seis coma seis kilómetros por segundo (veintitrés mil setecientos sesenta kilómetros por hora), desintegrándose en una colisión frontal cinéticamente perfecta.",
      "La transferencia de momento lineal y el empuje reactivo generado por la eyección de miles de toneladas de roca y polvo pulverizado arrojadas al espacio multiplicaron la efectividad del impacto. Las observaciones astronómicas terrestres confirmaron que el impacto de DART redujo el período orbital de Dimorphos en treinta y tres minutos completos (pasando de once horas y cincuenta y cinco minutos a once horas y veintidós minutos), superando en más de veinticinco veces el objetivo mínimo.",
      "La misión DART demostró formalmente que la técnica del impactador cinético es una herramienta viable y eficaz para la defensa planetaria. Si en el futuro los astrónomos descubren un asteroide como Apophis en rumbo de colisión directa con décadas de antelación, bastará una pequeña desviación de su velocidad de unos pocos milímetros por segundo para que el monstruo pase a decenas de miles de kilómetros de la Tierra, asegurando la supervivencia humana."
    ],
    "fact": "La misión DART de la NASA impactó contra el asteroide Dimorphos a 23.760 km/h el 26 de septiembre de 2022, alterando su período orbital en treinta y tres minutos y validando la tecnología de impacto cinético para la defensa planetaria de la humanidad, demostrando nuestra capacidad técnica para proteger activamente el planeta frente a futuras amenazas siderales.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La pequeña nave italiana LICIACube, transportada a bordo de DART y liberada quince días antes del choque, fotografió en tiempo real el penacho de escombros eyectados por el impacto desde una distancia segura de cincuenta kilómetros, enviando imágenes históricas de la colisión a la Tierra, confirmando el éxito de la primera maniobra de redirección de un objeto cercano a la Tierra en la historia humana."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El factor de multiplicación del momento («beta») del impacto DART se calculó entre dos coma dos y tres coma seis. Esto significa que el retroceso impulsivo causado por las rocas eyectadas en dirección contraria aportó más del doble de fuerza de frenado que el simple choque inelástico de la masa de la nave."
      }
    ]
  },
  {
    "id": "libro-muertos",
    "bannerImage": "/assets/egypt/infographic_m14/banner_merkhet.webp",
    "title": "El Libro para Vencer a Apofis",
    "color": "#FF5252",
    "btnImage": "/assets/egypt/infographic_apofis/btn_libro.webp",
    "image": "/assets/egypt/infographic_apofis/hero_libro.webp",
    "content": [
      "En la literatura religiosa y sacerdotal del Antiguo Egipto existía un manual ritual especializado concebido expresamente para aniquilar y desarticular mágicamente a las fuerzas del caos: el «Libro para Vencer a Apofis» o el Papiro Bremner-Rhind (catalogado actualmente como Papiro BM EA 10188 en el Museo Británico de Londres). Compilado a finales del siglo cuarto antes de Cristo, este texto reúne liturgias arcanas practicadas en el templo de Amun-Ra en Karnak.",
      "El ritual requería una preparación ceremonial minuciosa ejecutada por los sacerdotes uab en el sanctasanctórum más apartado del templo tebano. Los sacerdotes comenzaban modelando con cera de abejas virgen una efigie tridimensional de la serpiente Apofis, esculpiendo sus anillos ondulantes y grabando su nombre secreto en el lomo con tinta verde y negra obtenida de malaquita triturada y carbón vegetal.",
      "A continuación, los oficiantes ataban el muñeco de cera con gruesas cuerdas de esparto negro teñidas, simbolizando las cadenas doradas con que los dioses encadenaban al monstruo en el abismo. Posteriormente, los sacerdotes procedían a mutilar la figura con cuchillos afilados de pedernal ritual, cortando sus articulaciones, aplastando su cabeza bajo sus pies descalzos y escupiendo repetidamente sobre los restos mientras recitaban fórmulas imprecatorias.",
      "El acto culminante de la liturgia consistía en arrojar los fragmentos cercenados de la serpiente de cera a un brasero de bronce alimentado con brasas al rojo vivo y carbón de acacia. Mientras la cera se derretía lentamente chisporroteando en las llamas hasta consumirse por completo, los sacerdotes apagaban las cenizas residuales vertiendo orina de animal y pisoteándolas con sus sandalias hasta borrarlas de la tierra.",
      "Este ritual no se consideraba una simple dramatización teatral, sino un acto de física mágica simpática indispensable para mantener la estabilidad del cosmos. Los sacerdotes creían firmemente que al destruir la materia física y el nombre del demonio en la tierra de Karnak, neutralizaban de forma simultánea el poder cósmico de Apofis en el cielo, permitiendo que la barca solar de Ra pudiera amanecer un día más sobre Egipto."
    ],
    "fact": "El Papiro Bremner-Rhind del Museo Británico mide cinco metros y medio de longitud con cuatrocientos cuarenta versos jeroglíficos continuos dedicados exclusivamente a describir los rituales cotidianos de Karnak para derrotar y quemar la efigie de la serpiente Apofis, asegurando mágicamente que el dios Ra resurgiera victorioso cada mañana en el horizonte oriental del Nilo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El Papiro Bremner-Rhind contiene además el célebre «Canto de las dos plañideras», donde las diosas hermanas Isis y Neftis lloran el cuerpo inerte de Osiris con cantos poéticos de una belleza desgarradora para convocar a su alma de vuelta al cuerpo antes del renacimiento estelar, preservando una de las joyas poéticas y litúrgicas más conmovedoras de toda la literatura tebana del siglo IV a.C."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La cera de abejas utilizada en el ritual está compuesta por ésteres de ácidos grasos (palmitato de miricilo) y alcoholes de cadena larga con un punto de fusión bajo (62 a 64 °C). Su fácil deformación plástica y su rápida combustión la convertían en el material ideal para representar la aniquilación térmica del caos."
      }
    ]
  },
  {
    "id": "legado-caos",
    "bannerImage": "/assets/egypt/infographic_m14/banner_nut-cosmologia.webp",
    "title": "El Caos que nos Creó",
    "color": "#FF1744",
    "btnImage": "/assets/egypt/infographic_apofis/btn_legado.webp",
    "image": "/assets/egypt/infographic_apofis/hero_legado.webp",
    "content": [
      "La dialéctica eterna entre el orden sagrado de Maat y el desorden implacable de Isfet encierra una de las lecciones filosóficas y científicas más profundas de la civilización egipcia. Lejos de ser un error del universo o un enemigo puramente destructivo, el caos era reconocido por los sabios del Nilo como la matriz primordial e indispensable de la que surge toda nueva creación y transformación biológica.",
      "En la astrofísica y la geología modernas, esta intuición antigua se ha confirmado con un rigor científico asombroso. El propio planeta Tierra y la vida que alberga son hijos directos de cataclismos cósmicos y colisiones caóticas. Hace cuatro mil quinientos millones de años, el choque titánico de un protoplaneta del tamaño de Marte llamado Tea contra la joven Tierra arrancó millones de toneladas de roca que se condensaron para formar nuestra Luna, estabilizando el clima.",
      "Asimismo, los millones de asteroides y cometas que bombardearon la Tierra primitiva durante el Gran Bombardeo Tardío no solo trajeron destrucción: fueron precisamente los bólidos helados los que sembraron nuestros océanos de agua líquida y suministraron los aminoácidos, hidrocarburos y bases nitrogenadas indispensables para el florecimiento de las primeras células vivas en la sopa química primordial.",
      "Incluso las extinciones masivas provocadas por impactos asteroidales, como la catástrofe que borró a los dinosaurios hace sesenta y seis millones de años, actuaron como gigantescos catalizadores evolutivos. Al despejar los nichos ecológicos dominados por los grandes reptiles, aquel impacto cósmico abrió la puerta a la radiación adaptativa de los pequeños mamíferos, culminando en la aparición de la especie humana y de su capacidad racional para comprender el universo.",
      "Comprender la danza cósmica entre Maat e Isfet, entre la serenidad del orden gravitatorio y la violencia creadora del impacto asteroidal, nos reconcilia con nuestra propia naturaleza en el cosmos. Cuando hoy la ciencia vigila las órbitas de asteroides como Apophis mediante telescopios y sondas de defensa planetaria, no estamos destruyendo el caos cósmico, sino asumiendo el deber sagrado de preservar la llama de la conciencia humana en la inmensidad del infinito."
    ],
    "fact": "Los análisis de isótopos de hidrógeno (D/H) confirman que al menos el setenta por ciento del agua que compone los océanos de la Tierra y el Nilo fue transportada por el impacto de asteroides y cometas durante los primeros cuatrocientos millones de años del sistema solar, demostrando que el agua primordial que dio vida a Egipto y al cosmos terrestre posee una cuna sideral.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los meteoritos carbonáceos de tipo condrita como el célebre meteorito Murchison contienen más de setenta aminoácidos distintos y compuestos orgánicos complejos que se formaron en el espacio interestelar antes incluso del nacimiento de la Tierra y el Sol, sugiriendo que los ladrillos moleculares fundamentales de la biología pudieron sembrarse desde el cosmos profundo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La teoría del caos determinista formulada por Edward Lorenz demuestra que sistemas gravitacionales de muchos cuerpos (como el cinturón de asteroides) son inherentemente caóticos a escalas de millones de años, donde perturbaciones resonantes con Júpiter desvían periódicamente asteroides hacia órbitas que cruzan la Tierra."
      }
    ]
  }
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