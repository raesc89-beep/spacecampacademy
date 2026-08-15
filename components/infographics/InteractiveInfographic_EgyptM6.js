'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.25, ...style }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#7EC8E3', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      <path d="M10 24 Q40 0 70 24 Q40 48 10 24Z" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="24" r="8" fill={color} opacity="0.4" />
      <circle cx="40" cy="24" r="4" fill={color} opacity="0.7" />
      <path d="M40 32 Q35 42 28 46" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="22" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoScarab({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="14" r="10" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="36" rx="12" ry="16" fill={color} opacity="0.3" />
      <path d="M18 30 Q2 18 6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 30 Q58 18 54 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="36" x2="6" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="54" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="42" x2="8" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="42" x2="52" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style }}>
      <polygon points="40,4 72,52 8,52" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="56,8 80,52 40,52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="2" r="2" fill={color} opacity="0.8" />
      <circle cx="56" cy="6" r="1.5" fill={color} opacity="0.6" />
      <circle cx="48" cy="0" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarCluster({ size = 60, color = '#C4A7E7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {[{x:30,y:10,r:3},{x:15,y:25,r:2},{x:45,y:20,r:2.5},{x:20,y:45,r:2},{x:40,y:42,r:3},{x:30,y:30,r:4},{x:10,y:12,r:1.5},{x:50,y:48,r:1.5}].map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill={color} opacity={0.6} />
          <circle cx={s.x} cy={s.y} r={s.r * 2.5} fill={color} opacity={0.1} />
        </g>
      ))}
    </svg>
  );
}

function DecoCelestialMap({ size = 80, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      {/* Outer ring - celestial dome */}
      <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="40" cy="40" r="28" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Dividing line - north/south */}
      <line x1="6" y1="40" x2="74" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Constellation dots */}
      {[{x:25,y:20},{x:35,y:15},{x:45,y:18},{x:55,y:22},{x:30,y:28},{x:50,y:30}].map((p,i) => (
        <circle key={`n${i}`} cx={p.x} cy={p.y} r="2" fill={color} opacity="0.6" />
      ))}
      {/* Constellation lines */}
      <polyline points="25,20 35,15 45,18 55,22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <polyline points="30,28 35,15" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Planet boats in south */}
      {[20, 35, 50, 62].map((x, i) => (
        <g key={`p${i}`}>
          <path d={`M${x-5},55 Q${x},50 ${x+5},55`} fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <circle cx={x} cy={52} r="1.5" fill={color} opacity="0.5" />
        </g>
      ))}
      {/* Decan markers in south */}
      {[15, 25, 35, 45, 55, 65].map((x, i) => (
        <rect key={`d${i}`} x={x-1} y={64} width="2" height="5" rx="0.5" fill={color} opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoSolarBoat({ size = 80, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Boat hull */}
      <path d="M10 30 Q15 18 40 16 Q65 18 70 30 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Curved prow */}
      <path d="M10 30 Q5 25 8 18 Q10 14 14 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Curved stern */}
      <path d="M70 30 Q75 25 72 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sun disk on the boat */}
      <circle cx="40" cy="10" r="7" fill={color} opacity="0.4" />
      <circle cx="40" cy="10" r="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 40 + 11 * Math.cos(rad);
        const y1 = 10 + 11 * Math.sin(rad);
        const x2 = 40 + 14 * Math.cos(rad);
        const y2 = 10 + 14 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoHieroglyphColumn({ size = 40, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size * 3} viewBox="0 0 30 90" style={{ opacity: 0.15, ...style }}>
      {/* Cartouche border */}
      <rect x="4" y="2" width="22" height="86" rx="11" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Abstract glyphs */}
      <circle cx="15" cy="14" r="5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="15" cy="14" r="2" fill={color} opacity="0.4" />
      <path d="M10 28 L20 28 L15 22 Z" fill={color} opacity="0.3" />
      <line x1="10" y1="36" x2="20" y2="36" stroke={color} strokeWidth="1" />
      <path d="M10 44 Q15 38 20 44 Q15 50 10 44Z" fill="none" stroke={color} strokeWidth="1" />
      <rect x="10" y="56" width="10" height="6" rx="1" fill={color} opacity="0.3" />
      <path d="M12 68 L18 68 L18 76 L12 76 Z" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="15" cy="72" r="2" fill={color} opacity="0.3" />
      <line x1="10" y1="82" x2="20" y2="82" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'senenmut': [DecoCelestialMap, DecoAnkh, DecoPyramid],
  'techo-astronomico': [DecoCelestialMap, DecoStarCluster, DecoSolarBoat],'planetas-barcas': [DecoSolarBoat, DecoCelestialMap, DecoStarCluster],'constelaciones': [DecoStarCluster, DecoEye, DecoCelestialMap],'decanos': [DecoStarCluster, DecoScarab, DecoAnkh],
  'hatshepsut': [DecoAnkh, DecoPyramid, DecoHieroglyphColumn],'ciencia-moderna': [DecoCelestialMap, DecoEye, DecoStarCluster],'legado-cosmos': [DecoStarCluster, DecoAnkh, DecoCelestialMap],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Lull, J. & Belmonte, J.A. (2006). A firmament above Thebes, Journal for the History of Astronomy, 37',
  'Dorman, P.F. (1988). The Monuments of Senenmut, Kegan Paul',
  'Neugebauer, O. & Parker, R. (1969). Egyptian Astronomical Texts, Brown University Press',
  'Clagett, M. (1995). Ancient Egyptian Science, Vol. 2: Calendars, Clocks, and Astronomy',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'senenmut',
    title: 'Senenmut: El Genio',
    color: '#9B6BFF',
    btnImage: '/assets/egypt/infographic_senenmut/btn_senenmut.png',
    image: '/assets/egypt/infographic_senenmut/hero_senenmut.png',
    content: [
      'Senenmut vivió hace 3,500 años durante la dinastía XVIII. Fue un arquitecto y científico favorecido por la reina Hatshepsut.',
      'Como arquitecto personal de Hatshepsut, diseñó su templo en Deir el-Bahari. Su tumba, sin embargo, guardaba un registro astronómico notable.',
      'Senenmut se describía como maestro de las ciencias y artes. Diseñaba templos, calculaba posiciones estelares, supervisaba telares y coordinaba expediciones.',
      'Recibió un privilegio inédito para alguien que no era de la realeza: el permiso para tener su tumba en el Valle de los Reyes.',
      'Su tumba fue descubierta en 1925 por Herbert Winlock. Estaba esculpida en la colina de Deir el-Bahari, escondida detrás de la tumba principal.',
    ],
    fact: 'Senenmut tenía más de 80 títulos oficiales. Entre ellos: "Supervisor de los graneros de Amón", "Jefe de los trabajos del rey" y "Tutor de la princesa Neferura".',
  },
  {
    id: 'techo-astronomico',
    title: 'El Techo del Cielo',
    color: '#4A90D9',
    btnImage: '/assets/egypt/infographic_senenmut/btn_techo.png',
    image: '/assets/egypt/infographic_senenmut/hero_techo.png',
    content: [
      'Senenmut representó el cielo nocturno en el techo de su tumba. Es el primer mapa celeste completo conocido en la historia.',
      'El mapa tiene dos mitades. La mitad norte muestra las constelaciones circumpolares. La mitad sur muestra los 36 Decanos que usaban para medir el tiempo.',
      'Los artistas utilizaron pigmentos minerales de alta calidad: lapislázuli para el azul y ocre para el amarillo. Los colores siguen estables tras milenios.',
      'Antes de este mapa, los egipcios representaban el cielo norte o sur por separado. Senenmut fue el primero en combinar ambos.',
      'La entrada de la tumba estaba orientada de tal forma que, en ciertos días, la luz solar iluminaba el mapa celeste pintado en el techo.',
    ],
    fact: 'Equipos científicos analizan el techo con fotogrametría y escaneo láser 3D. Descubrieron capas invisibles que muestran las correcciones hechas por los artistas durante la obra.',
  },
  {
    id: 'planetas-barcas',
    title: 'Planetas en Barcas',
    color: '#FFB347',
    btnImage: '/assets/egypt/infographic_senenmut/btn_planetas.png',
    image: '/assets/egypt/infographic_senenmut/hero_planetas.png',
    content: [
      'Los egipcios identificaron los cinco planetas visibles, diferenciándolos de las estrellas fijas debido a su movimiento independiente.',
      'El mapa de Senenmut representa a Mercurio, Venus, Marte, Júpiter y Saturno como barcas divinas que navegan por el cielo.',
      'Cada planeta tenía una identidad divina. A Júpiter lo llamaban "Horus que ilumina las dos tierras" y a Saturno "Horus toro del cielo".',
      'Las simulaciones astronómicas confirman que las posiciones de los planetas en el mapa corresponden a alineaciones que ocurrieron en los siglos XV y XVI a.C.',
      'Es la representación más antigua conocida que distingue a los planetas como objetos errantes, un concepto desarrollado milenios después por los griegos.',
    ],
    fact: 'Venus se consideraba "estrella de la mañana" o "estrella de la tarde" según su posición en la órbita terrestre. Los egipcios tardaron en notar que se trataba del mismo cuerpo celeste.',
  },
  {
    id: 'constelaciones',
    title: 'Monstruos del Cielo',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_senenmut/btn_constelaciones.png',
    image: '/assets/egypt/infographic_senenmut/hero_constelaciones.png',
    content: [
      'Los egipcios veían figuras diferentes en las estrellas. Donde identificamos la Osa Mayor, ellos veían a "Mesjetiu", la pata de un toro. Draco era un hipopótamo y un cocodrilo.',
      'La mitad norte del techo muestra las constelaciones circumpolares. Estas nunca desaparecen bajo el horizonte, por lo que eran consideradas inmortales.',
      'Mesjetiu representaba la pata de un toro sagrado. Taweret, la diosa hipopótamo, sujetaba la pata del toro con una cadena estelar para mantener el orden.',
      'El cocodrilo celeste estaba asociado a Sobek, dios del agua. Según la creencia, el toro, el hipopótamo y el cocodrilo mantenían el equilibrio cósmico.',
      'Cada cultura interpreta el cielo según su entorno. Los egipcios vieron animales propios del Nilo en las mismas estrellas que otros pueblos interpretaron de forma distinta.',
    ],
    fact: 'La constelación Mesjetiu (Osa Mayor) aparece en ataúdes y techos de templos. Sus estrellas apuntan al Polo Norte celeste, sirviendo de brújula para orientar los monumentos.',
  },
  {
    id: 'decanos',
    title: 'El Reloj de Estrellas',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_senenmut/btn_decanos.png',
    image: '/assets/egypt/infographic_senenmut/hero_decanos.png',
    content: [
      'Los egipcios dividieron el cielo en 36 grupos de estrellas llamados Decanos. Cada grupo gobernaba 10 días del año y servía como reloj nocturno.',
      'Los sacerdotes miraban el horizonte este. Cuando un Decano específico aparecía, indicaba el inicio de una nueva hora. Así, dividieron la noche en 12 horas.',
      'El techo de Senenmut exhibe los 36 Decanos en la mitad sur del mapa. Combinados con las 12 horas diurnas medidas por relojes de sol, formaron el día de 24 horas.',
      'El sistema de 24 horas que utilizamos actualmente proviene de este modelo egipcio. Griegos y romanos adoptaron esta división del tiempo.',
      'Los Decanos también estructuraban el calendario. 36 Decanos multiplicados por 10 días sumaban 360 días. Añadían 5 días extras para completar el año solar de 365 días.',
    ],
    fact: 'La aparición de la estrella Sirio (Sopdet) en el horizonte marcaba el inicio del año nuevo egipcio. Este evento coincidía con la inundación anual del Nilo.',
  },
  {
    id: 'hatshepsut',
    title: 'La Reina Faraón',
    color: '#E91E63',
    btnImage: '/assets/egypt/infographic_senenmut/btn_hatshepsut.png',
    image: '/assets/egypt/infographic_senenmut/hero_hatshepsut.png',
    content: [
      'Hatshepsut gobernó Egipto como faraón. Aunque las mujeres egipcias poseían derechos como heredar o hacer negocios, gobernar con poder absoluto era excepcional.',
      'En lugar de campañas militares, Hatshepsut priorizó la expansión comercial. Organizó una expedición al País de Punt para obtener incienso, oro y marfil.',
      'Para consolidar su legitimidad, adoptó símbolos del poder faraónico, como la barba postiza y el tocado real. Usó estas insignias para ser reconocida como gobernante.',
      'El templo de Deir el-Bahari, diseñado por Senenmut, consta de tres terrazas escalonadas integradas en el acantilado. Sus proporciones matemáticas usan la proporción áurea.',
      'Tras su muerte, su sucesor Tutmosis III borró su nombre de los monumentos. La tumba secreta de Senenmut sobrevivió y conservó el mapa celeste intacto.',
    ],
    fact: 'Hatshepsut promovió un periodo de prosperidad durante su reinado de 22 años. Construyó múltiples monumentos. Tutmosis III eliminó su nombre para justificar su propia sucesión.',
  },
  {
    id: 'ciencia-moderna',
    title: 'Descifrando el Mapa',
    color: '#00BCD4',
    btnImage: '/assets/egypt/infographic_senenmut/btn_ciencia.png',
    image: '/assets/egypt/infographic_senenmut/hero_ciencia.png',
    content: [
      'Durante siglos, el mapa de Senenmut fue un misterio. Los investigadores reconocían su temática astronómica, pero no lograban interpretar los símbolos planetarios y estelares.',
      'El uso de simulaciones astronómicas permitió recrear el cielo nocturno visible desde Luxor hace 3,500 años. Al comparar los modelos, identificaron correlaciones precisas.',
      'Los resultados indican que el mapa representa una fecha específica del reinado de Hatshepsut. Las posiciones planetarias pintadas coinciden con alineaciones reales de esa época.',
      'El Techo Astronómico de Seti I, creado 200 años después, es una versión detallada del mapa de Senenmut. Esto demuestra la transmisión y mejora del conocimiento científico egipcio.',
      'La identificación de los símbolos continúa en investigación. Recientes estudios sugieren qué figuras representan a planetas como Júpiter y Venus.',
    ],
    fact: 'El orto helíaco de Sirio era la observación astronómica central del calendario. Los científicos calculan que en tiempos de Senenmut este evento ocurría a mediados de julio.',
  },
  {
    id: 'legado-cosmos',
    title: 'El Legado Cósmico',
    color: '#AB47BC',
    btnImage: '/assets/egypt/infographic_senenmut/btn_legado.png',
    image: '/assets/egypt/infographic_senenmut/hero_legado.png',
    content: [
      'El mapa de Senenmut influyó en su cultura. Sacerdotes posteriores copiaron y ampliaron sus representaciones en tumbas y templos clave.',
      'Comerciantes fenicios transmitieron la astronomía egipcia al Mediterráneo. Filósofos griegos la estudiaron, originando la ciencia astronómica que Ptolomeo plasmaría en Alejandría.',
      'La división del día en 24 horas y el año de 365 días provienen de Egipto. Los romanos adoptaron y adaptaron este sistema de tiempo.',
      'Los sistemas actuales de medición de tiempo conservan los conceptos originados por los sacerdotes egipcios al observar los Decanos.',
      'El mapa muestra el esfuerzo humano por interpretar el universo. Los registros astronómicos de Senenmut evidencian el avance científico alcanzado por su civilización.',
    ],
    fact: 'El calendario egipcio de 365 días fue adoptado por los romanos. Su error de un cuarto de día anual fue corregido por Julio César al incorporar el año bisiesto.',
  },
];

// â”€â”€â”€ Star Field Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StarField() {
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
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 107, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Senenmut Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SenenmutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(155,107,255,0.3))' }}>
        {/* Celestial dome arch */}
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#senenmutGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Constellation dots along the arch */}
        {[80, 130, 185, 240, 300, 360, 415, 470, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.14 + 12;
          return (
            <g key={i}>
              <motion.circle cx={cx} cy={cy} r="3" fill="#9B6BFF"
                animate={{ opacity: [0.3, 1, 0.3], r: [2, 3.5, 2] }}
                transition={{ duration: 2 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                style={{ filter: 'drop-shadow(0 0 5px #9B6BFF)' }}
              />
              {/* Constellation lines between some dots */}
              {i > 0 && i % 2 === 0 && (
                <line
                  x1={[80, 130, 185, 240, 300, 360, 415, 470, 520][i-1]}
                  y1={10 + Math.abs([80, 130, 185, 240, 300, 360, 415, 470, 520][i-1] - 300) * 0.14 + 12}
                  x2={cx} y2={cy}
                  stroke="rgba(155,107,255,0.3)" strokeWidth="1"
                />
              )}
            </g>
          );
        })}
        {/* Center celestial disk */}
        <circle cx="300" cy="8" r="10" fill="rgba(155,107,255,0.5)" style={{ filter: 'drop-shadow(0 0 12px rgba(155,107,255,0.5))' }} />
        <circle cx="300" cy="8" r="14" fill="none" stroke="rgba(155,107,255,0.3)" strokeWidth="1" />
        <circle cx="300" cy="8" r="5" fill="rgba(155,107,255,0.8)" />
        <circle cx="30" cy="110" r="5" fill="rgba(155,107,255,0.4)" />
        <circle cx="570" cy="110" r="5" fill="rgba(155,107,255,0.4)" />
        <defs>
          <linearGradient id="senenmutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(155,107,255,0.2)" />
            <stop offset="50%" stopColor="rgba(155,107,255,0.9)" />
            <stop offset="100%" stopColor="rgba(155,107,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="70" textAnchor="middle" fill="#9B6BFF" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MAPA DEL UNIVERSO</text>
        <text x="300" y="90" textAnchor="middle" fill="rgba(155,107,255,0.6)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">LA TUMBA DE SENENMUT · CIRCA 1473 A.C.</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (circular image-based) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(155,107,255,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.3s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}  loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: '-4px', borderRadius: '50%',
              border: `2px solid ${node.color}`, pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotM6"
          style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'rgba(12, 12, 35, 0.9)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
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

      {/* Two-Column Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>
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
              borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0,
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

      {/* Magazine Body */}
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
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem',
          position: 'relative', zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
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

        {/* Fact Box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px',
            padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'flex-start',
            gap: '1rem', position: 'relative', zIndex: 2,
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
                color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7,
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(155,107,255,0.15)',
    }}>
      <Star size={14} style={{ color: '#9B6BFF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #7B4FD4, #9B6BFF)', borderRadius: '3px', boxShadow: '0 0 8px rgba(155,107,255,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9B6BFF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,36,0.85) 0%, rgba(30,18,50,0.80) 40%, rgba(18,14,36,0.88) 100%), url(/assets/egypt/infographic_senenmut/bg_senenmut.png)',
      backgroundSize: 'cover', backgroundPosition: 'center center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(155,107,255,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />
      <SenenmutHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(155,107,255,0.7)', fontSize: '0.85rem',
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(155,107,255,0.08)', borderRadius: '16px',
              border: '1px solid rgba(155,107,255,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9B6BFF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ—ºï¸ ¡Has descifrado todos los secretos del Mapa del Universo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cartógrafo Estelar
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