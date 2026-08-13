'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#E8C96A', style = {} }) {
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

function DecoStoneCircle({ size = 80, color = '#D4A843', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 40 + 30 * Math.cos(rad);
        const y = 40 + 30 * Math.sin(rad);
        return <rect key={i} x={x-3} y={y-5} width="6" height="10" rx="1" fill={color} opacity="0.5" transform={`rotate(${angle}, ${x}, ${y})`} />;
      })}
      <circle cx="40" cy="40" r="4" fill={color} opacity="0.4" />
      <circle cx="36" cy="38" r="2" fill={color} opacity="0.3" />
      <circle cx="44" cy="42" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoSolstice({ size = 80, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.2, ...style }}>
      <circle cx="40" cy="40" r="12" fill={color} opacity="0.4" />
      <circle cx="40" cy="40" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 40 + 22 * Math.cos(rad);
        const y1 = 40 + 22 * Math.sin(rad);
        const x2 = 40 + 32 * Math.cos(rad);
        const y2 = 40 + 32 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? 2.5 : 1} strokeLinecap="round" opacity="0.5" />;
      })}
    </svg>
  );
}

function DecoSerpent({ size = 80, color = '#FF6B6B', style = {} }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 80 64" style={{ opacity: 0.2, ...style }}>
      <path d="M12 56 Q12 30 24 20 Q36 10 40 16 Q44 22 36 28 Q28 34 32 44 Q36 54 48 48 Q60 42 56 28 Q52 14 64 8" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="66" cy="6" r="4" fill={color} opacity="0.4" />
      <circle cx="68" cy="4" r="1.5" fill={color} opacity="0.8" />
    </svg>
  );
}

// Map node IDs to decorative SVGs for floating decorations
const DECO_MAP = {
  'observatorio': [DecoStoneCircle, DecoStarCluster, DecoPyramid],'sahara-verde': [DecoSerpent, DecoAnkh, DecoSolstice],
  'megalitos': [DecoStoneCircle, DecoPyramid, DecoStarCluster],'solsticio': [DecoSolstice, DecoStarCluster, DecoEye],
  'orion-map': [DecoStarCluster, DecoPyramid, DecoStoneCircle],'tribus': [DecoAnkh, DecoScarab, DecoSerpent],
  'stonehenge': [DecoStoneCircle, DecoSolstice, DecoPyramid],'legado-nilo': [DecoAnkh, DecoStarCluster, DecoScarab],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Malville, J.M. et al. (1998). Megaliths and Neolithic astronomy in southern Egypt, Nature, 392',
  'Wendorf, F. & Schild, R. (2001). Holocene Settlement of the Egyptian Sahara, Springer',
  'Brophy, T.G. (2002). The Origin Map, Writers Club Press',
  'Malville, J.M. (2015). Astronomy at Nabta Playa, Handbook of Archaeoastronomy',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'observatorio',
    title: 'El Primer Observatorio',
    color: '#D4A843',
    btnImage: '/assets/egypt/infographic_m1/btn_observatorio.jpg',
    image: '/assets/egypt/infographic_m1/hero_observatorio.jpg',
    content: [
      'Imagina acampar en el desierto sin reloj ni calendario. ¿Cómo sabrías la fecha? Hace más de 7,000 años, las tribus resolvieron este problema construyendo un círculo de piedras que funcionaba como reloj y calendario. Este lugar, Nabta Playa, está en el sur de Egipto.',
      'El círculo de Nabta Playa es considerado el observatorio astronómico más antiguo de la Tierra, construido entre el 4800 y el 4000 a.C. Es 1,000 años más antiguo que Stonehenge y 2,000 años más antiguo que las Pirámides de Guiza.',
      'El "crómlech" o círculo consta de 30 piedras, con 6 piedras centrales colocadas en posiciones específicas. Cada piedra señala hacia una dirección astronómica, como la salida del Sol en el solsticio de verano o la posición de ciertas estrellas.',
      'Los arqueólogos Fred Wendorf y Romuald Schild descubrieron este sitio en los años 1990. Encontraron el círculo de piedras y cinco alineamientos megalíticos que se extienden desde un centro, apuntando al cielo.',
      'Hoy, Nabta Playa se encuentra a 800 km al sur de El Cairo. Es uno de los lugares más remotos del planeta, pero su importancia científica demuestra que la astronomía nació antes de lo que pensábamos.',
    ],
    fact: 'Nabta Playa es tan antiguo que cuando se construyó, el Sahara era una sabana verde con lagos, gacelas y jirafas. El observatorio se construyó junto a un lago que hoy es arena seca.',
  },
  {
    id: 'sahara-verde',
    title: 'El Sahara Verde',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_m1/btn_sahara-verde.jpg',
    image: '/assets/egypt/infographic_m1/hero_sahara-verde.jpg',
    content: [
      'Hace entre 11,000 y 5,000 años, el desierto del Sahara tenía ríos, lagos y bosques. Los científicos llaman a este periodo el "Sahara Verde". La Tierra se inclinó hacia el Sol, lo que cambió los patrones de lluvia sobre el norte de África.',
      'En Nabta Playa, los arqueólogos encontraron huesos de peces, conchas de moluscos y restos de plantas acuáticas. Había una gran cuenca endorreica donde las tribus se reunían durante el monzón. Era un oasis en medio de lo que hoy es desierto.',
      'Las tribus eran pastores seminómadas que criaban ganado vacuno. Seguían las lluvias estacionales y se reunían cerca del lago de Nabta Playa. Necesitaban saber cuándo iba a llover para sobrevivir, por lo que estudiaron las estrellas.',
      'El cambio climático que convirtió el Sahara en desierto fue gradual. Entre el 5500 y el 3500 a.C. Las lluvias disminuyeron. Las tribus migraron hacia el río Nilo. Esta migración es una teoría aceptada sobre el origen de la civilización egipcia.',
      'Los sedimentos del lago de Nabta Playa cuentan esta historia: las capas profundas tienen arcilla húmeda y restos orgánicos, y las superiores son arena seca.',
    ],
    fact: 'El "Sahara Verde" tenía ríos más grandes que el Mississippi. Los científicos han encontrado pinturas rupestres mostrando hipopótamos, cocodrilos y elefantes. Hoy esos lugares tienen altas temperaturas.',
  },
  {
    id: 'megalitos',
    title: 'Las Piedras Gigantes',
    color: '#A0522D',
    btnImage: '/assets/egypt/infographic_m1/btn_megalitos.jpg',
    image: '/assets/egypt/infographic_m1/hero_megalitos.jpg',
    content: [
      'Las piedras de Nabta Playa son megalitos ("mega" significa grande y "lithos" piedra). Algunas pesan toneladas y fueron traídas desde canteras lejanas. Las transportaron sin ruedas ni animales de carga, usando ingenio humano.',
      'El círculo principal tiene un diámetro de 4 metros y está formado por 30 piedras. Las 6 piedras centrales están colocadas en dos líneas de 3, con diferente inclinación. El astrofísico Thomas G. Brophy propuso que representan estrellas.',
      'Además del círculo, hay cinco alineamientos megalíticos que se extienden desde un punto central. Cada alineamiento apunta hacia una dirección astronómica.',
      'Algunos megalitos enterrados tienen formas esculpidas de hasta 2.5 metros de alto. Los investigadores interpretan una roca esculpida como un intento de escultura monumental.',
      'Las excavaciones revelaron cámaras subterráneas de piedra donde se realizaban ceremonias. Se encontraron esqueletos de ganado enterrados como ofrendas rituales. Cada piedra y alineamiento tenía un propósito conectado con el cielo.',
    ],
    fact: 'Los constructores de Nabta Playa carecían de herramientas de metal. Utilizaron piedra, cuerdas de fibra y palancas de madera. Mover una piedra de 2 toneladas requería al menos 20 personas trabajando en equipo.',
  },
  {
    id: 'solsticio',
    title: 'El Reloj del Solsticio',
    color: '#FFB347',
    btnImage: '/assets/egypt/infographic_m1/btn_solsticio.jpg',
    image: '/assets/egypt/infographic_m1/hero_solsticio.jpg',
    content: [
      'El solsticio de verano es el día más largo del año. Para las tribus de Nabta Playa, este día marcaba el inicio de las lluvias del monzón africano, garantizando agua y comida.',
      'El círculo de piedras tiene cuatro pares de "puertas" enfrentadas. Un par está orientado en dirección norte-sur. Otro par apunta en dirección nordeste-suroeste, señalando el punto del horizonte donde sale el Sol en el solsticio de verano.',
      'Mirando a través de una de las puertas de piedra, se puede ver el Sol salir entre las rocas. Este calendario de piedra indicaba que las lluvias llegarían pronto.',
      'Los científicos han verificado con software que las alineaciones siguen precisas después de 7,000 años. A pesar del cambio en la inclinación terrestre, los constructores acertaron con una precisión menor a 1 grado.',
      'Combinando las puertas y alineamientos, las tribus predecían las estaciones: cuándo sembrar y mover el ganado. Era un reloj astronómico de roca, creado milenios antes que los números escritos.',
    ],
    fact: 'En Nabta Playa celebraban el solsticio de verano con festines. Los arqueólogos hallaron huesos de animales en capas que corresponden a las temporadas de lluvia, evidenciando banquetes comunitarios.',
  },
  {
    id: 'orion-map',
    title: 'El Mapa de Orión',
    color: '#7EC8E3',
    btnImage: '/assets/egypt/infographic_m1/btn_orion-map.jpg',
    image: '/assets/egypt/infographic_m1/hero_orion-map.jpg',
    content: [
      'El cinturón de Orión está formado por tres estrellas en línea recta. Las tribus de Nabta Playa mapearon esta constelación en piedra hace 7,000 años.',
      'El astrofísico Thomas G. Brophy propuso que las 6 piedras centrales representan estrellas de Orión. Tres piedras corresponden al cinturón, y las otras al hombro de la constelación. Las piedras con mayor inclinación representan estrellas lejanas.',
      'Nabta Playa funcionaba como un mapa estelar tridimensional. Los constructores señalaron la posición de las estrellas y codificaron su distancia usando la inclinación de las piedras.',
      'Aunque la teoría es debatida, los alineamientos megalíticos apuntan hacia estrellas importantes. Esto incluye las del cinturón de Orión y Sirio, la estrella más brillante.',
      'Los egipcios llamaban al cinturón de Orión "Sah" y lo asociaban con Osiris. Si Nabta Playa mapeó a Orión antes que los faraones, la relación egipcia con esta constelación tendría raíces antiguas.',
    ],
    fact: 'Las tres estrellas del cinturón de Orión están a distancias diferentes: Alnitak y Mintaka a 1,200 años luz, y Alnilam a 2,000 años luz. Aunque parecen juntas, están separadas por enormes distancias espaciales.',
  },
  {
    id: 'tribus',
    title: 'Los Primeros Científicos',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_m1/btn_tribus.jpg',
    image: '/assets/egypt/infographic_m1/hero_tribus.jpg',
    content: [
      'Las tribus de Nabta Playa carecían de escritura, metales o ruedas, pero tenían capacidad de observación. Durante generaciones, observaron el cielo para aprender los patrones estelares y solares.',
      'Eran pastores seminómadas que criaban ganado. Su supervivencia dependía de encontrar agua, por lo que desarrollaron conocimientos astronómicos. Predecir las lluvias era vital para evitar que el ganado muriera.',
      'Los enterramientos de ganado revelan que estas tribus tenían una religión centrada en el cielo. Wendorf y Schild sugieren que el culto al ganado en Nabta Playa originó el culto a Hathor en Egipto.',
      'La construcción de Nabta Playa requirió planificación y cooperación. Estas tribus poseían jerarquías sociales, ceremonias y un conocimiento astronómico transmitido entre generaciones.',
      'Sin escritura, el conocimiento astronómico se transmitía oralmente. Los ancianos preservaban los datos de la tribu en su memoria. Las piedras se construyeron para asegurar que el conocimiento perdurara.',
    ],
    fact: 'Los huesos hallados en Nabta Playa muestran que las tribus eran saludables. Medían en promedio 1.75 metros y tenían dietas nutritivas basadas en leche, carne, pescado y plantas silvestres.',
  },
  {
    id: 'stonehenge',
    title: 'Más Antiguo que Stonehenge',
    color: '#9E9E9E',
    btnImage: '/assets/egypt/infographic_m1/btn_stonehenge.jpg',
    image: '/assets/egypt/infographic_m1/hero_stonehenge.jpg',
    content: [
      'Nabta Playa se construyó entre el 4800 y el 4000 a.C. Mientras que Stonehenge inició cerca del 3000 a.C. Cuando se puso la primera piedra de Stonehenge, Nabta Playa llevaba milenios existiendo.',
      'Stonehenge pesa 4,000 toneladas, con piedras de 25 toneladas. Nabta Playa es más modesto, pero su función astronómica es igual de avanzada. Ambos servían como observatorios precisos.',
      'Existen otros observatorios antiguos, como Göbekli Tepe o Carnac. Sin embargo, Nabta Playa destaca porque integra un calendario solar, un mapa estelar y un centro ritual en un solo complejo.',
      'Los científicos creen que la astronomía megalítica se inventó de forma independiente en varias regiones. Al observar el cielo durante generaciones, diferentes pueblos descubrieron sus patrones.',
      'Nabta Playa demuestra que África tuvo observatorios astronómicos mil años antes que Europa. La ciencia antigua se desarrolló en diversos continentes, sin pertenecer a una sola región.',
    ],
    fact: 'Stonehenge tardó 1,500 años en completarse. Nabta Playa, en cambio, estuvo en uso y fue modificado durante más de 5,000 años, abarcando un periodo mayor a la existencia de la escritura.',
  },
  {
    id: 'legado-nilo',
    title: 'El Camino al Nilo',
    color: '#1ABC9C',
    btnImage: '/assets/egypt/infographic_m1/btn_legado-nilo.jpg',
    image: '/assets/egypt/infographic_m1/hero_legado-nilo.jpg',
    content: [
      'Al secarse el Sahara, las tribus de Nabta Playa migraron hacia el río Nilo. Llevaban consigo miles de años de conocimiento astronómico guardado en sus tradiciones orales.',
      'Esta migración, entre el 3500 y el 3000 a.C. Coincide con la formación de la civilización egipcia. Los asentamientos predinásticos muestran prácticas culturales similares: culto al ganado y alineación astronómica.',
      'El egiptólogo Mark Lehner sugiere que Nabta Playa no inventó las pirámides, pero aportó conocimientos fundamentales para el desarrollo de la civilización egipcia.',
      'El culto al ganado derivó en el culto a Hathor, y la importancia de Orión influyó en el culto a Osiris. La orientación de piedras megalíticas sentó las bases para alinear las pirámides.',
      'La NASA y otras agencias espaciales estudian Nabta Playa como ejemplo del uso de astronomía con recursos mínimos, útil para futuras exploraciones donde la tecnología sea limitada.',
    ],
    fact: 'Nabta Playa está a 400 km del Nilo. El viaje tomaba semanas a pie con ganado. Los arqueólogos han hallado campamentos temporales que marcan esta antigua ruta migratoria a través del desierto.',
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
    const stars = Array.from({ length: 80 }, () => ({
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
        ctx.fillStyle = `rgba(212, 168, 67, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Nabta Playa Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NabtaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.3))' }}>
        {/* Stone circle arch */}
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#nabtaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Megalith stones along the arch */}
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.15 + 15;
          return (
            <g key={i}>
              <rect x={cx-5} y={cy-8} width="10" height="16" rx="2" fill="rgba(212,168,67,0.4)" stroke="rgba(212,168,67,0.6)" strokeWidth="1" />
              <motion.circle cx={cx} cy={cy-12} r="2.5" fill="#D4A843"
                animate={{ opacity: [0.3, 1, 0.3], r: [1.5, 3, 1.5] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                style={{ filter: 'drop-shadow(0 0 4px #D4A843)' }}
              />
            </g>
          );
        })}
        {/* Center sun disk */}
        <circle cx="300" cy="8" r="8" fill="rgba(212,168,67,0.6)" style={{ filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.5))' }} />
        <circle cx="300" cy="8" r="12" fill="none" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
        <circle cx="30" cy="110" r="5" fill="rgba(212,168,67,0.5)" />
        <circle cx="570" cy="110" r="5" fill="rgba(212,168,67,0.5)" />
        <defs>
          <linearGradient id="nabtaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.3)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="78" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">NABTA PLAYA</text>
        <text x="300" y="98" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER OBSERVATORIO DE LA HUMANIDAD</text>
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
      {/* Circular image container */}
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(212,168,67,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.btnImage}
          alt={node.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}
         loading="lazy" />
        {/* Glow ring when active */}
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

      {/* Label */}
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

      {/* Active dot */}
      {isActive && (
        <motion.div
          layoutId="activeDotM1"
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
        background: 'rgba(12, 12, 35, 0.9)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      {/* Close button */}
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
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

      {/* â”€â”€â”€ Magazine Body: Alternating text + decorations â”€â”€â”€ */}
      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {/* Floating decorative elements */}
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

        {/* Remaining paragraphs in magazine layout */}
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
                  gridColumn: isWide ? '1 / -1' : 'auto', background: `rgba(255,255,255,0.02)`, borderRadius:'12px',
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

        {/* â”€â”€â”€ Fact Box â”€â”€â”€ */}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A843', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #A0865A, #D4A843)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A843', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,26,0.82) 0%, rgba(30,22,12,0.78) 40%, rgba(18,14,26,0.85) 100%), url(/assets/egypt/infographic_nabta/bg_nabta.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,168,67,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />

      {/* Nabta header */}
      <NabtaHeader />

      {/* Progress */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {/* Instruction */}
      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,168,67,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* â”€â”€â”€ Organic Circular Nodes Grid â”€â”€â”€ */}
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

      {/* Expanded Content Panel */}
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

      {/* Completion message */}
      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸª¨ ¡Has explorado todos los secretos de Nabta Playa!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrónomo Ancestral
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