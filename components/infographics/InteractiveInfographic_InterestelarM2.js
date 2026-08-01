'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoOumuamua({ size = 70, color = '#FFB74D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="5" fill="none" stroke={color} strokeWidth="2" transform="rotate(45 30 30)" />
      <path d="M15 15 Q25 10 45 45 Q35 50 15 15" fill={color} opacity="0.3" />
      <circle cx="25" cy="25" r="1.5" fill={color} opacity="0.6" />
      <circle cx="35" cy="35" r="2" fill={color} opacity="0.5" />
      <circle cx="30" cy="30" r="1" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#26A69A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="10,50 20,20 45,10 35,40" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="20" x2="15" y2="10" stroke={color} strokeWidth="1.5" />
      <line x1="45" y1="10" x2="55" y2="5" stroke={color} strokeWidth="1.5" />
      <circle cx="27" cy="30" r="4" fill={color} opacity="0.4" />
      <path d="M10 50 L5 60 M35 40 L40 60" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoOrbitPath({ size = 70, color = '#42A5F5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 5 55 Q 30 5 55 55" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="30" cy="18" r="3" fill={color} opacity="0.5" />
      <circle cx="15" cy="40" r="2" fill={color} opacity="0.7" />
      <circle cx="45" cy="40" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoStarField({ size = 70, color = '#FFC107', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {[...Array(8)].map((_, i) => (
        <circle key={i} cx={Math.random() * 60} cy={Math.random() * 60} r={Math.random() * 1.5 + 0.5} fill={color} opacity={Math.random() * 0.5 + 0.3} />
      ))}
      <path d="M30 10 L32 28 L50 30 L32 32 L30 50 L28 32 L10 30 L28 28 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSpectrum({ size = 70, color = '#AB47BC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 30 Q 15 10, 25 30 T 45 30 T 65 30" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M5 40 Q 15 20, 25 40 T 45 40 T 65 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="25" y1="10" x2="25" y2="50" stroke={color} strokeDasharray="2 2" />
      <line x1="45" y1="10" x2="45" y2="50" stroke={color} strokeDasharray="2 2" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-2017': [DecoTelescope, DecoStarField, DecoOrbitPath],'nombre-hawaiano': [DecoOumuamua, DecoStarField, DecoSpectrum],
  'forma-enigmatica': [DecoOumuamua, DecoSpectrum, DecoOrbitPath],
  'aceleracion-misteriosa': [DecoOrbitPath, DecoOumuamua, DecoStarField],'hipotesis-cientificas': [DecoSpectrum, DecoTelescope, DecoOumuamua],
  'composicion-superficie': [DecoSpectrum, DecoStarField, DecoOrbitPath],'legado-cientifico': [DecoTelescope, DecoOrbitPath, DecoStarField],
}; const BIBLIOGRAPHY = ['Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  'Loeb, A. (2021). Extraterrestrial: The First Sign of Intelligent Life Beyond Earth, Houghton Mifflin',
  'Desch, S. & Jackson, A. (2021). "1I/\'Oumuamua as an N2 ice fragment", Journal of Geophysical Research: Planets, 126',
  'Bannister, M. et al. (2017). "Col-OSSOS: Colors of the Interstellar Planetesimal 1I/\'Oumuamua", The Astrophysical Journal Letters, 851',
  'Seligman, D. et al. (2019). "On the anomalous acceleration of 1I/2017 U1 \'Oumuamua", The Astrophysical Journal Letters, 876'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'descubrimiento-2017',
    title: 'El Descubrimiento',
    color: '#FFB74D',
    btnImage: '/assets/interestelar/infographic_m2/btn_descubrimiento-2017.jpg',
    image: '/assets/interestelar/infographic_m2/hero_descubrimiento-2017.jpg',
    content: [
      'El 19 de octubre de 2017, el investigador Robert Weryk notó algo inusual en las imágenes de su telescopio. Trabajaba en el observatorio Pan-STARRS1 en Hawái, que escanea el cielo en busca de asteroides locales. Al principio, el objeto detectado parecía un asteroide ordinario.',
      'Al calcular su trayectoria, descubrieron que no orbitaba el Sol. Los objetos locales tienen órbitas cerradas debido a la gravedad solar. Este objeto viajaba a 87 kilómetros por segundo, trazando una trayectoria hiperbólica abierta.',
      'Su velocidad era tan alta que la gravedad del Sol no podía capturarlo. Esto indicaba que era un visitante fugaz. Había viajado por el espacio interestelar durante millones de años antes de cruzar nuestro sistema solar.',
      'Este descubrimiento cambió la astronomía. Fue la primera prueba directa de objetos rocosos vagando entre las estrellas. Abrió una nueva era en la exploración de cuerpos interestelares.'
    ],
    expandables: [
      { label: 'El Telescopio Pan-STARRS', icon: 'zap', text: 'El telescopio Pan-STARRS1 en Hawái tiene una cámara de 1.400 megapíxeles. Está diseñado para detectar objetos pequeños y rápidos que se mueven por el cielo nocturno.' },
      { label: 'Velocidad Increíble', icon: 'clock', text: 'Oumuamua pasó por el Sol a casi 315.000 kilómetros por hora. A esa velocidad, el viaje de la Tierra a la Luna tomaría poco más de una hora.' }
    ],
    fact: 'Oumuamua fue descubierto 40 días después de su máxima aproximación al Sol. Los astrónomos tuvieron solo unas semanas para observarlo antes de que se volviera demasiado tenue.'
  },
  {
    id: 'nombre-hawaiano',
    title: 'El Nombre Hawaiano',
    color: '#EF5350',
    btnImage: '/assets/interestelar/infographic_m2/btn_nombre-hawaiano.jpg',
    image: '/assets/interestelar/infographic_m2/hero_nombre-hawaiano.jpg',
    content: [
      'Clasificar este objeto fue difícil. Recibió la etiqueta temporal C/2017 U1 por considerarse un cometa. Al no tener cola de gas, se cambió a A/2017 U1 como asteroide, pero ninguna categoría local encajaba.',
      'La Unión Astronómica Internacional creó una nueva clasificación para objetos interestelares: "I". El objeto fue nombrado 1I/2017 U1. El "1I" indica que es el primer cuerpo interestelar descubierto.',
      'El equipo descubridor eligió un nombre especial. Consultaron con expertos en lengua hawaiana y eligieron "Oumuamua". Significa "el primer mensajero que llega de lejos".',
      'El nombre compara al objeto con un explorador antiguo. Representa a un emisario enviado desde un sistema estelar desconocido. También honra la cultura hawaiana y los observatorios de las islas.'
    ],
    expandables: [
      { label: 'Pronunciación', icon: 'zap', text: 'El nombre incluye una pausa glotal llamada okina, escrita como \'Oumuamua. Muchos medios de comunicación tuvieron dificultades para pronunciarlo correctamente.' },
      { label: 'La Nueva Categoría', icon: 'atom', text: 'Ahora existe una regla para nombrar estos objetos. El segundo cuerpo interestelar descubierto en 2019 se designó 2I/Borisov, honrando a su descubridor.' }
    ],
    fact: 'El equipo consideró llamarlo "Rama" por la novela de Arthur C. Clarke. Finalmente optaron por un nombre que honrara a Hawái y su tradición astronómica.'
  },
  {
    id: 'forma-enigmatica',
    title: 'La Forma Enigmática',
    color: '#AB47BC',
    btnImage: '/assets/interestelar/infographic_m2/btn_forma-enigmatica.jpg',
    image: '/assets/interestelar/infographic_m2/hero_forma-enigmatica.jpg',
    content: [
      'La mayoría de los asteroides locales tienen formas esféricas o irregulares. Oumuamua sorprendió a los científicos al mostrar fluctuaciones extremas en su brillo. Su luz aumentaba y disminuía periódicamente cada 7.3 horas.',
      'Estos cambios de luz indicaban que Oumuamua tenía una forma muy alargada. Se calcula que era unas diez veces más largo que ancho, midiendo aproximadamente 230 metros de longitud y 35 metros de espesor.',
      'Ningún cuerpo conocido de nuestro sistema solar tiene estas proporciones. Los científicos plantearon que pudo formarse en un evento cataclísmico. Una colisión planetaria o el tirón gravitacional de una estrella podrían haberlo estirado y fragmentado.',
      'Otra teoría sugiere que Oumuamua tiene una forma achatada, como un disco. En cualquier caso, sus proporciones extremas reflejan las condiciones violentas de su sistema de origen.'
    ],
    expandables: [
      { label: 'Rotación Caótica', icon: 'zap', text: 'Oumuamua no gira sobre un solo eje, sino que experimenta una rotación no principal. Este movimiento de volteretas caóticas sugiere que sufrió impactos en su pasado.' },
      { label: 'El Desafío Visual', icon: 'clock', text: 'Ningún telescopio pudo fotografiar la forma real de Oumuamua. Solo aparecía como un punto de luz. Su forma alargada se dedujo matemáticamente a partir de sus variaciones de brillo.' }
    ],
    fact: 'Su forma extrema exige una alta cohesión estructural para evitar romperse al girar. Los científicos creen que su interior es denso y metálico, no un aglomerado de polvo.'
  },
  {
    id: 'aceleracion-misteriosa',
    title: 'Aceleración Misteriosa',
    color: '#26A69A',
    btnImage: '/assets/interestelar/infographic_m2/btn_aceleracion-misteriosa.jpg',
    image: '/assets/interestelar/infographic_m2/hero_aceleracion-misteriosa.jpg',
    content: [
      'Oumuamua presentó otra anomalía en su trayectoria. A medida que se alejaba del Sol, los telescopios detectaron una aceleración inesperada. El objeto se desviaba ligeramente de la ruta dictada por la gravedad solar.',
      'Esta "aceleración no gravitacional" es común en los cometas. Cuando el hielo se sublima por el calor, los chorros de gas actúan como propulsores naturales. Sin embargo, Oumuamua no mostraba ninguna cola visible.',
      'El telescopio infrarrojo Spitzer buscó señales de gas o polvo, pero no detectó nada. La ausencia de desgasificación visible dejó perplejos a los científicos. ¿Cómo podía acelerar sin emitir material?',
      'Esta incógnita desató un debate en la comunidad astronómica. Las teorías intentaron explicar qué fuerza impulsaba a Oumuamua. Se propusieron desde hielos invisibles hasta radiación solar empujando su superficie.'
    ],
    expandables: [
      { label: 'Presión de Radiación', icon: 'zap', text: 'Los fotones de la luz solar pueden empujar objetos en el espacio. Algunos sugirieron que Oumuamua era un cuerpo poroso de baja densidad que aceleraba por la presión de radiación.' },
      { label: 'El Telescopio Spitzer', icon: 'atom', text: 'El telescopio espacial Spitzer observa el universo en luz infrarroja. Su incapacidad para detectar polvo o gas alrededor de Oumuamua demostró que no era un cometa típico.' }
    ],
    fact: 'La aceleración fue de pocas milésimas de milímetro por segundo al cuadrado. Aunque pequeña, fue suficiente para desviar al objeto miles de kilómetros de la trayectoria calculada.'
  },
  {
    id: 'hipotesis-cientificas',
    title: 'Las Hipótesis',
    color: '#42A5F5',
    btnImage: '/assets/interestelar/infographic_m2/btn_hipotesis-cientificas.jpg',
    image: '/assets/interestelar/infographic_m2/hero_hipotesis-cientificas.jpg',
    content: [
      'Las anomalías de Oumuamua motivaron múltiples hipótesis. Avi Loeb, de la Universidad de Harvard, sugirió que podría ser una estructura artificial. Propuso que funcionaba como una vela solar fabricada por una civilización alienígena.',
      'La mayoría de los científicos prefirió explicaciones naturales. En 2021, Steven Desch y Alan Jackson postularon que era un fragmento de un exoplaneta. Si estaba compuesto de nitrógeno congelado, el gas sublimado sería invisible para los telescopios.',
      'Otra teoría propuso que era un iceberg de hidrógeno molecular. Formado en nubes moleculares frías, liberaría gas hidrógeno invisible al calentarse. Los críticos señalaron que un bloque de hidrógeno no sobreviviría el largo viaje.',
      'Una hipótesis reciente plantea que es un cometa de agua. Los rayos cósmicos atraparon hidrógeno dentro del hielo durante el viaje. Al acercarse al Sol, este hidrógeno escapó y causó la aceleración sin generar polvo visible.'
    ],
    expandables: [
      { label: 'La Navaja de Ockham', icon: 'zap', text: 'La ciencia prefiere explicaciones basadas en leyes físicas conocidas. Las teorías sobre hielo de nitrógeno o hidrógeno son más aceptadas que la hipótesis alienígena.' },
      { label: 'Efecto Yarkovsky', icon: 'atom', text: 'Los asteroides experimentan pequeñas aceleraciones al irradiar calor solar. Los cálculos demostraron que este efecto térmico era insuficiente para explicar la aceleración de Oumuamua.' }
    ],
    fact: 'El profesor Avi Loeb fundó el "Proyecto Galileo" para buscar otros artefactos de tecnología interestelar utilizando IA y redes de telescopios.'
  },
  {
    id: 'composicion-superficie',
    title: 'Superficie y Composición',
    color: '#FF7043',
    btnImage: '/assets/interestelar/infographic_m2/btn_composicion-superficie.jpg',
    image: '/assets/interestelar/infographic_m2/hero_composicion-superficie.jpg',
    content: [
      'Sin muestras directas, los astrónomos analizaron la luz reflejada por Oumuamua mediante espectroscopia. Los datos revelaron que su superficie era de color rojo oscuro. Este tono es similar al de los objetos transneptunianos.',
      'El color rojizo se debe a la irradiación de compuestos de carbono. La exposición prolongada a los rayos cósmicos y la radiación ultravioleta transforma el material orgánico. Se forma una costra gruesa conocida como "tolinas".',
      'Esta costra oscura actúa como un escudo térmico protector. Si Oumuamua tiene un interior helado, las tolinas evitaron que se sublimara rápidamente. Esto explicaría la ausencia de una coma cometaria.',
      'El análisis espectral no halló agua ni silicatos comunes. Su composición difiere de los asteroides locales. Oumuamua es un fragmento envuelto en material orgánico irradiado durante su travesía interestelar.'
    ],
    expandables: [
      { label: 'Espectroscopía', icon: 'zap', text: 'La espectroscopía identifica los materiales por cómo reflejan y absorben la luz. Permite conocer la composición de objetos distantes a partir de su firma luminosa.' },
      { label: 'El Escudo Protector', icon: 'clock', text: 'La gruesa capa de tolinas se forma tras millones de años de exposición a la radiación cósmica. Indica que Oumuamua tuvo un viaje muy largo por el medio interestelar.' }
    ],
    fact: 'Oumuamua tiene un albedo muy bajo, similar al del carbón. Al reflejar muy poca luz, fue muy difícil detectarlo contra el fondo oscuro del espacio.'
  },
  {
    id: 'legado-cientifico',
    title: 'El Legado Científico',
    color: '#FFC107',
    btnImage: '/assets/interestelar/infographic_m2/btn_legado-cientifico.jpg',
    image: '/assets/interestelar/infographic_m2/hero_legado-cientifico.jpg',
    content: [
      'El paso de Oumuamua demostró que nuestro sistema solar interactúa con objetos galácticos. Antes de su hallazgo, los objetos interestelares solo existían en teorías matemáticas y simulaciones de formación planetaria.',
      'Oumuamua confirmó que la formación de planetas expulsa millones de cuerpos al espacio. Escombros como este vagan por la Vía Láctea tras ser expulsados por la gravedad de planetas gigantes nacientes.',
      'Su descubrimiento impulsó el desarrollo de nuevos telescopios e instrumentos. El Observatorio Vera C. Rubin se construye para encontrar más de estos visitantes de forma temprana. La búsqueda pasó de ser accidental a un objetivo prioritario.',
      'Este visitante también inspiró futuros proyectos espaciales. Iniciativas como el "Proyecto Lyra" estudian sondas rápidas capaces de interceptar objetos interestelares. Oumuamua sentó las bases para estudiar materia de otras estrellas en nuestro vecindario.'
    ],
    expandables: [
      { label: 'El Segundo Visitante', icon: 'zap', text: 'En 2019 se descubrió 2I/Borisov, el segundo cuerpo interestelar. A diferencia de Oumuamua, Borisov se comportó como un cometa típico, validando que el espacio está lleno de estos objetos.' },
      { label: 'Misiones de Intercepción', icon: 'atom', text: 'La Agencia Espacial Europea planea la misión "Comet Interceptor". Lanzará una sonda que esperará en el espacio para interceptar a un nuevo visitante interestelar.' }
    ],
    fact: 'Las estimaciones estadísticas sugieren que miles de objetos del tamaño de Oumuamua orbitan dentro de nuestro sistema solar en cualquier momento. La mayoría permanecen indetectados por su baja luminosidad y alta velocidad.'
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
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
      hue: Math.random() > 0.5 ? '255,183,77' : '239,83,80', // amber or red
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

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,183,77,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFB74D','#EF5350','#AB47BC','#26A69A','#42A5F5','#FF7043','#FFC107'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <path d="M 300 20 L 303 27 L 310 30 L 303 33 L 300 40 L 297 33 L 290 30 L 297 27 Z" fill="none" stroke="#FFB74D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="300" cy="30" r="2" fill="#FFB74D" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,183,77,0.2)" />
            <stop offset="50%" stopColor="rgba(255,183,77,0.9)" />
            <stop offset="100%" stopColor="rgba(255,183,77,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFB74D" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">OUMUAMUA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,183,77,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER MENSAJERO INTERESTELAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,183,77,0.2)'}`,
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
          layoutId="activeDotOumuamua"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Explora Más Detalles
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fun Fact â”€â”€â”€ */}
        {node.fact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              background: `linear-gradient(90deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              padding: '1.2rem 1.5rem',
              borderRadius: '0 12px 12px 0',
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
            }}
          >
            <Star style={{ color: node.color, flexShrink: 0, marginTop: '2px' }} size={24} />
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: node.color, textTransform:'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                Dato Curioso
              </span>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onNodeClick }) {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Progreso de la Misión
        </h4>
        <div style={{ color: '#FFB74D', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {Math.round((exploredIds.size / nodes.length) * 100)}%
        </div>
      </div>
      <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {nodes.map((node, i) => {
          const isExplored = exploredIds.has(node.id);
          return (
            <button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              style={{
                position: 'absolute',
                left: `${(i / (nodes.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                width: '12px', height: '12px',
                borderRadius: '50%', background: isExplored ? node.color :'rgba(255,255,255,0.2)',
                border: `2px solid ${isExplored ? '#0B0E2D' : 'transparent'}`,
                boxShadow: isExplored ? `0 0 10px ${node.color}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              title={node.title}
            />
          );
        })}
        {/* Fill bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          background: 'linear-gradient(90deg, #FFB74D, #EF5350, #AB47BC, #26A69A, #42A5F5, #FF7043, #FFC107)',
          width: `${((exploredIds.size === 0 ? 0 : Array.from(exploredIds).map(id => nodes.findIndex(n => n.id === id)).sort((a,b)=>b-a)[0]) / (nodes.length - 1)) * 100}%`,
          borderRadius: '2px',
          transition: 'width 0.5s ease',
          zIndex: 1,
        }} />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const containerRef = useRef(null);

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  const handleNodeClick = (id) => {
    setActiveNodeId((prev) => (prev === id ? null : id));
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#0B0E2D', // Deep space background
      color: 'white',
      padding: '3rem 1rem',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }} ref={containerRef}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
        <InterstellarHeader />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '3rem',
          padding: '0 1rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              index={idx}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onNodeClick={handleNodeClick} />

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Bibliography Section */}
        <div style={{
          marginTop: '5rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes Científicas y Bibliografía
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#FFB74D', opacity: 0.7 }}>•</span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen a tamaño completo" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
