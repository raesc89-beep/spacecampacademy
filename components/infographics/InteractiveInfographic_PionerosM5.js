'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// SVG Decorative Elements
function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} ${30 + 19 * Math.cos(rad)} ${30 + 19 * Math.sin(rad)})`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoClockFace({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const DECO_MAP = {
  'mision-vosjod': [DecoGear, DecoClockFace, DecoBolt],
  'traje-berkut': [DecoClockFace, DecoGear, DecoWormhole],
  'caminata-historica': [DecoWormhole, DecoAtomSvg, DecoClockFace],
  'regreso-peligroso': [DecoBolt, DecoWormhole, DecoAtomSvg],
};

const BIBLIOGRAPHY = [
  "Leonov, A., & Scott, D. (2004). 'Two Sides of the Moon: Our Story of the Cold War Space Race', Thomas Dunne Books.",
  "Siddiqi, A. A. (2000). 'Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974', NASA History Division.",
  "Harford, J. (1997). 'Korolev: How One Man Masterminded the Soviet Drive to Beat America to the Moon', John Wiley & Sons.",
  "Chertok, B. (2005). 'Rockets and People, Volume III: Hot Days of the Cold War', NASA History Division.",
  "Burgess, C., & Hall, R. (2009). 'The First Soviet Cosmonaut Team: Their Lives and Legacies', Springer Praxis Books.",
  "Portree, D. S. F. (1997). 'Mir Hardware Heritage', NASA Reference Publication 1357."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'mision-vosjod',
    title: 'La Misión Vosjod 2',
    color: '#D87D4A',
    btnImage: '/assets/course/animales_pioneros/btn_leonov.jpg',
    image: '/assets/course/animales_pioneros/hero_leonov.jpg',
    content: ['El 18 de marzo de 1965, la nave espacial Vosjod 2 despegó desde el cosmódromo de Baikonur rumbo a las estrellas.', 'A bordo iban dos valientes tripulantes: el comandante Pavel Belyayev y el piloto Alexei Leonov.', 'Su objetivo principal era realizar la primera caminata espacial en la historia de la humanidad, un paso gigante para la exploración.', 'La nave era una versión modificada del modelo Vostok, a la que le añadieron una esclusa de aire inflable llamada Volga.', 'Los ingenieros soviéticos trabajaron bajo mucha presión de tiempo para adelantarse al programa Gemini de la NASA.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['La misión duró un total de 26 horas en órbita alrededor de la Tierra.', 'El diseño de la esclusa Volga permitía que Leonov saliera al espacio sin despresurizar la cabina principal donde estaba Belyayev.', 'Volga pesaba 250 kilogramos y se extendía 2.5 metros hacia afuera una vez inflada en el espacio.', 'La nave alcanzó una altitud máxima de 495 kilómetros, mucho más alto de lo planeado originalmente.', 'Durante el despegue, los cosmonautas experimentaron una fuerza de gravedad intensa que los pegó a sus asientos.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['En plena Guerra Fría, la Unión Soviética y Estados Unidos competían por demostrar su superioridad tecnológica en el espacio.', 'El programa Vosjod fue un esfuerzo apresurado para lograr nuevos récords antes que los estadounidenses.', 'La nave Vostok original solo tenía espacio para un piloto, pero la Vosjod acomodó a dos eliminando los pesados asientos eyectables.', 'Los cosmonautas sabían que los sistemas no estaban completamente probados, pero aceptaron el riesgo por su país.', 'Este vuelo marcó el inicio de las actividades extravehiculares, esenciales hoy en día para mantener la Estación Espacial Internacional.'] }
    ],
    fact: 'La nave Vosjod 2 voló tan alto que estuvo cerca de quedarse atrapada en el espacio por meses si los motores fallaban.'
  },
  {
    id: 'traje-berkut',
    title: 'El Traje Espacial Berkut',
    color: '#D4B872',
    btnImage: '/assets/course/animales_pioneros/hero_traje_berkut.jpg',
    image: '/assets/course/animales_pioneros/hero_traje_berkut.jpg',
    content: ['El traje espacial Berkut, que significa "águila dorada", fue diseñado por la empresa rusa NPO Zvezda.', 'Pesaba 20 kilogramos en la Tierra e incluía una mochila especial con soporte vital para 45 minutos.', 'Tenía un torso rígido de aluminio, mientras que los brazos y piernas estaban hechos de capas flexibles de goma.', 'Su casco brillante contaba con un filtro dorado para proteger los ojos de Leonov de los fuertes rayos del Sol.', 'Para mantener la presión necesaria y permitir la respiración, el traje se inflaba como un globo gigante en el vacío.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['El mayor problema del traje Berkut fue que se infló demasiado en el espacio, volviéndose duro como una tabla.', 'Las articulaciones se pusieron tan tensas que doblar un brazo o una pierna requería una fuerza física enorme.', 'La mochila, llamada KP-55, suministraba oxígeno puro y eliminaba el dióxido de carbono producido al respirar.', 'Para volver a entrar a la nave, Leonov tuvo que liberar aire del traje usando una válvula de emergencia.', 'Bajar la presión rápidamente era muy peligroso, ya que podía causarle la enfermedad por descompresión en la sangre.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['Antes del Berkut, los trajes espaciales solo servían para proteger a los pilotos dentro de la cabina en caso de emergencia.', 'Este fue el primer diseño creado específicamente para operar de manera autónoma en el duro ambiente del espacio exterior.', 'Los ingenieros tuvieron que inventar materiales completamente nuevos que resistieran cambios extremos de temperatura.', 'El diseño base del Berkut sentó las bases para los trajes Orlan que usan los cosmonautas rusos en la actualidad.', 'La experiencia de Leonov demostró que los futuros trajes necesitarían articulaciones mucho más avanzadas y móviles.'] }
    ],
    fact: '¡El traje se infló tanto que los pies de Leonov se salieron de sus botas y sus manos ya no alcanzaban los guantes!'
  },
  {
    id: 'caminata-historica',
    title: 'La Caminata Histórica',
    color: '#80DEEA',
    btnImage: '/assets/course/animales_pioneros/btn_caminata_leonov.jpg',
    image: '/assets/course/animales_pioneros/hero_caminata_leonov.jpg',
    content: ['A las 11:34 de la mañana, Alexei Leonov abrió la escotilla y salió flotando hacia la inmensidad del cosmos.', 'Estuvo fuera de la nave durante 12 minutos y 9 segundos, conectado solo por un cordón de seguridad de 5.35 metros.', 'Desde allá arriba, Leonov pudo ver montañas, ríos y nubes moviéndose lentamente sobre la superficie terrestre.', 'Experimentó cambios de temperatura brutales: de -150°C en la sombra hasta +150°C bajo la luz directa del sol.', 'La caminata fue transmitida por televisión en vivo a toda Rusia, sorprendiendo a millones de espectadores.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['El traje de Leonov se infló tanto que no podía doblar los dedos para usar la cámara fotográfica.', 'Al intentar regresar, descubrió que era demasiado ancho para pasar por la entrada de la esclusa Volga.', 'Tuvo que tomar la arriesgada decisión de desinflar su traje manualmente mientras seguía flotando en el espacio.', 'En lugar de entrar de cabeza como estaba planeado, tuvo que entrar de pies para poder cerrar la puerta.', 'El esfuerzo físico fue tan grande que Leonov sudó litros de agua, empañando por completo el visor de su casco.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['Esta hazaña comprobó que los humanos podían sobrevivir y trabajar fuera de una nave espacial.', 'Estados Unidos logró su primera caminata espacial casi tres meses después, realizada por el astronauta Ed White.', 'Leonov reportó que el espacio era increíblemente silencioso, pudiendo escuchar solo su propia respiración y latidos.', 'Durante la caminata, la nave viajaba a una velocidad asombrosa de 28,000 kilómetros por hora alrededor de la Tierra.', 'Los médicos en Tierra estaban muy preocupados, ya que el ritmo cardíaco de Leonov llegó a 143 latidos por minuto.'] }
    ],
    fact: 'Mientras flotaba en el vacío, Leonov reportó haber escuchado extraños crujidos, que en realidad era el metal de la nave contrayéndose por el frío.'
  },
  {
    id: 'regreso-peligroso',
    title: 'Un Regreso al Límite',
    color: '#3949AB',
    btnImage: '/assets/course/animales_pioneros/btn_regreso_vosjod.jpg',
    image: '/assets/course/animales_pioneros/hero_regreso_vosjod.jpg',
    content: ['Después de la caminata, los problemas continuaron cuando el sistema de aterrizaje automático de la nave falló por completo.', 'El comandante Belyayev tuvo que tomar el control manual para encender los cohetes de frenado.', 'Debido a las dificultades, la cápsula aterrizó a 386 kilómetros de su objetivo original, en medio de la nieve.', 'Cayeron en lo profundo del bosque de taiga en los Montes Urales, rodeados de osos y lobos salvajes.', 'Pasaron dos noches soportando temperaturas de -30°C dentro de su cápsula atrapada entre grandes árboles.'],
    expandables: [
      { label: 'Análisis Detallado', icon: 'zap', text: ['Para poder orientar la nave correctamente, Belyayev tuvo que desabrocharse el cinturón y asomarse por la ventana.', 'El peso extra afectó el centro de gravedad, causando que la nave girara de manera brusca al entrar a la atmósfera.', 'La escotilla quedó bloqueada por un gran árbol, así que tuvieron que empujarla con todas sus fuerzas para poder salir.', 'El sistema eléctrico falló, por lo que los ventiladores dejaron de funcionar y la cabina se llenó de un frío intenso.', 'Los helicópteros de rescate los encontraron rápido, pero no podían aterrizar debido a lo espeso que era el bosque.'] },
      { label: 'Contexto Histórico', icon: 'clock', text: ['Los medios de comunicación soviéticos ocultaron el desvío y dijeron que los cosmonautas estaban descansando en el bosque.', 'Este aterrizaje de emergencia obligó a los ingenieros a mejorar los sistemas de navegación para futuras misiones.', 'El equipo de rescate tuvo que llegar esquiando, abriendo un claro en el bosque para que un helicóptero pudiera bajar.', 'Finalmente, los cosmonautas tuvieron que esquiar 9 kilómetros a través del espeso bosque para llegar a la nave de rescate.', 'A pesar de todos los contratiempos casi mortales, Leonov y Belyayev fueron recibidos como héroes nacionales en Moscú.'] }
    ],
    fact: 'Los cosmonautas llevaban una pistola especial de supervivencia en su equipo de emergencia para defenderse de los lobos hambrientos del bosque.'
  },
];

// Temporal Particle Field
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
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
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
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// Time Machine Header
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 4 }, (_, i) => {
          const t = (i + 0.5) / 4;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ALEXEI LEONOV</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA PRIMERA CAMINATA ESPACIAL</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
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
    </motion.button>
  );
}

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
            {item.text.map((para, i) => (
              <p key={i} style={{
                margin: '0 0 0.8rem', fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {para}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
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
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none' }}
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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_PionerosM5() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/course/animales_pioneros/banner_pioneros.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Contextual Background Image (§18) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('/assets/course/animales_pioneros/bg_pioneros.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem',
          marginBottom: '2rem', position: 'relative', zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode}
              node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '3rem', padding: '2rem',
              background: 'linear-gradient(135deg, rgba(216,125,74,0.1), rgba(128,222,234,0.05))',
              borderRadius: '20px', border: '1px solid rgba(216,125,74,0.3)',
              textAlign: 'center',
            }}
          >
            <Star size={40} color="#D87D4A" style={{ margin: '0 auto 1rem', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.5))' }} />
            <h3 style={{ color: '#D87D4A', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Misión Completada</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
              Has explorado exhaustivamente todos los detalles técnicos e históricos de la pionera misión Vosjod 2 y el histórico paseo espacial de Alexei Leonov.
            </p>
          </motion.div>
        )}

        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <h4 style={{ color: '#D87D4A', margin: '0 0 1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} />
            Bibliografía y Referencias
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
