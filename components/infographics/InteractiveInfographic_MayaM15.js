'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Codex themed) ────────────────────────────
function DecoCodexFold({ size = 70, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 10 L25 5 L40 10 L55 5 L55 50 L40 55 L25 50 L10 55 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="25" y1="5" x2="25" y2="50" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="40" y1="10" x2="40" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <rect x="15" y="15" width="6" height="6" fill={color} opacity="0.4" />
      <rect x="45" y="15" width="6" height="6" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoVenusTable({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 17 * Math.cos(rad)} cy={30 + 17 * Math.sin(rad)} r="3" fill={color} opacity="0.7" />;
      })}
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoEclipseRing({ size = 70, color = '#212121', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 A20 20 0 1 1 10 30" fill="none" stroke={color} strokeWidth="3" />
      <path d="M10 30 A20 20 0 0 1 30 10" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFF8E1" stroke={color} strokeWidth="1" />
      <path d="M20 40 L15 45 M40 40 L45 45 M20 20 L15 15" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoQuill({ size = 70, color = '#00695C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M50 10 C40 10 30 20 20 40 C18 45 15 50 10 50 C15 45 20 40 25 35 C35 25 45 15 50 10 Z" fill={color} opacity="0.5" stroke={color} strokeWidth="1" />
      <line x1="50" y1="10" x2="20" y2="40" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="48" r="2" fill={color} />
      <path d="M10 50 Q15 55 20 52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoGlyphColumn({ size = 70, color = '#5D4037', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="5" width="20" height="50" fill="none" stroke={color} strokeWidth="1.5" rx="3" />
      <rect x="23" y="8" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <rect x="23" y="24" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <rect x="23" y="40" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <circle cx="15" cy="14" r="2" fill={color} opacity="0.6" />
      <circle cx="15" cy="30" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'codice-descubrimiento': [DecoCodexFold, DecoQuill, DecoGlyphColumn],
  'estructura-fisica': [DecoCodexFold, DecoGlyphColumn, DecoQuill],
  'tablas-venus': [DecoVenusTable, DecoGlyphColumn, DecoCodexFold],'tablas-eclipses': [DecoEclipseRing, DecoVenusTable, DecoCodexFold],'tablas-lluvia': [DecoQuill, DecoEclipseRing, DecoGlyphColumn],'matematica-codice': [DecoGlyphColumn, DecoVenusTable, DecoCodexFold],'supervivencia-codice': [DecoCodexFold, DecoQuill, DecoEclipseRing],
}; const BIBLIOGRAPHY = ['Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
  'Coe, M.D. & Van Stone, M. (2005). Reading the Maya Glyphs, Thames & Hudson',
  'Thompson, J.E.S. (1972). A Commentary on the Dresden Codex, American Philosophical Society',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Love, B. (1994). The Paris Codex: Handbook for a Maya Priest, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'codice-descubrimiento',
    title: 'El Descubrimiento',
    color: '#C62828',
    btnImage: '/assets/maya/infographic_m15/btn_codice-descubrimiento.jpg',
    image: '/assets/maya/infographic_m15/hero_codice-descubrimiento.jpg',
    content: [
      'En 1739, Johann Christian Götze, director de la Biblioteca Real de Sajonia en Dresde, Alemania, compró el Códice de Dresde a un propietario en Viena. Se desconocía su autor, idioma y origen exacto.',
      'Durante casi un siglo, el códice no fue comprendido. Sus dibujos de dioses, animales y símbolos geométricos eran indescifrables. En el siglo XIX, el bibliotecario Ernst Förstemann descubrió que los puntos y barras formaban un sistema matemático.',
      'Durante la Segunda Guerra Mundial, en 1945, los Aliados bombardearon Dresde. La biblioteca sufrió daños severos, pero el libro sobrevivió en un sótano, aunque sufrió daños por el agua usada para apagar los incendios.',
      'Hoy, el Códice de Dresde se conserva en la Biblioteca Estatal de Sajonia (Sächsische Landesbibliothek). Se exhibe en una sala con temperatura y humedad controladas para preservarlo. Es uno de los pocos libros mayas que sobrevivieron a la colonia.',
      'Los historiadores creen que fue enviado a Europa poco después de la conquista española, posiblemente como regalo para el rey Carlos V. Pasó entre coleccionistas antes de llegar a la biblioteca. Permite estudiar el conocimiento astronómico maya.'
    ],
    expandables: [
      { label: 'Un Tesoro Rescatado', icon: 'clock', text: 'El agua en 1945 hizo que los pigmentos se corrieran. Los restauradores lo secaron durante años. Gracias a fotografías previas a la guerra, se conoce el contenido de las partes borradas.' },
      { label: 'El Primer Vistazo', icon: 'clock', text: 'El científico Alexander von Humboldt incluyó algunas páginas en sus publicaciones del siglo XIX. Esto permitió que científicos de todo el mundo estudiaran la escritura maya y su matemática.' }
    ],
    fact: 'El Códice de Dresde no se lee de izquierda a derecha. Se divide en "almanaques", y cada uno tiene un orden de lectura específico, a menudo en zigzag.'
  },
  {
    id: 'estructura-fisica',
    title: 'Estructura Física',
    color: '#5D4037',
    btnImage: '/assets/maya/infographic_m15/btn_estructura-fisica.jpg',
    image: '/assets/maya/infographic_m15/hero_estructura-fisica.jpg',
    content: [
      'El Códice de Dresde es una tira que mide 3.56 metros de largo. Los mayas lo doblaron como un acordeón, creando 39 hojas que se leen por ambos lados. Este formato se conoce como "libro biombo".',
      'Está hecho de la corteza interna de un árbol de higuera silvestre, material llamado "amate". Para prepararlo, remojaban y golpeaban la corteza. Finalmente, la cubrían con una capa de cal blanca para pintar.',
      'Los artistas, conocidos como "escribas", pertenecían a un alto rango social. Usaban pinceles finos de pelo de animal para dibujar glifos con gran precisión en espacios de un centímetro cuadrado.',
      'Usaron pigmentos naturales: el negro venía del carbón; el rojo, de minerales como la hematita o insectos como la cochinilla; y el "Azul Maya" se lograba mezclando arcilla con la planta del añil. Este azul es muy resistente.',
      'Se estima que el documento actual es una copia realizada entre los siglos XI y XII (1000 y 1200 d.C.) en Chichén Itzá, Yucatán, basada en tratados astronómicos más antiguos.'
    ],
    expandables: [
      { label: 'El Papel Amate', icon: 'atom', text: 'La capa de cal actuaba como sellador; sin ella, la tinta se habría esparcido por las fibras de la madera. Se usaban golpeadores de piedra para aplanar la corteza.' },
      { label: 'Manos Diferentes', icon: 'atom', text: 'El análisis de los dibujos revela que al menos ocho artistas diferentes trabajaron en el Códice de Dresde. Cada escriba tenía un estilo particular.' }
    ],
    fact: 'El formato de acordeón de 39 páginas permite 78 páginas legibles, aunque cuatro están en blanco. Un sacerdote podía abrir el libro en la sección exacta que necesitaba.'
  },
  {
    id: 'tablas-venus',
    title: 'Tablas de Venus',
    color: '#1565C0',
    btnImage: '/assets/maya/infographic_m15/btn_tablas-venus.jpg',
    image: '/assets/maya/infographic_m15/hero_tablas-venus.jpg',
    content: [
      'Las páginas 24 y de la 46 a la 50 contienen las "Tablas de Venus". Registran el ciclo del planeta visto desde la Tierra, dividiéndolo en cuatro fases.',
      'Venus representaba una fuerza asociada con deidades guerreras. El ciclo desde que aparece como estrella de la mañana hasta que es estrella de la tarde promedia 584 días. Las tablas registran estos ciclos con gran exactitud.',
      'Las tablas rastrean a Venus durante más de 33,000 días consecutivos (unos 90 años). Los sacerdotes predecían la "salida helíaca", cuando el planeta aparece antes del amanecer.',
      'El ciclo de Venus dura exactamente 583.92 días, no 584. Los mayas inventaron un sistema de corrección matemática para restar días y ajustar sus predicciones.',
      'Gracias a estas correcciones, las Tablas de Venus son los datos astronómicos más exactos del planeta creados antes del telescopio en Europa. Demuestran un dominio matemático mediante la observación.'
    ],
    expandables: [
      { label: 'Las Cuatro Fases', icon: 'atom', text: 'Dividieron el viaje en cuatro fases: 236 días como estrella de la mañana, 90 días detrás del Sol, 250 días como estrella de la tarde, y 8 días frente al Sol.' },
      { label: 'Corrección del Calendario', icon: 'clock', text: 'La página 24 muestra múltiplos del ciclo de Venus y fechas para saltarse días y corregir el calendario, demostrando un algoritmo de corrección astronómica.' }
    ],
    fact: 'La salida helíaca de Venus era considerada peligrosa. Los mayas creían que la luz del planeta afectaba a los gobernantes y cosechas, por lo que usaban el Códice para anticiparse a estas fechas.'
  },
  {
    id: 'tablas-eclipses',
    title: 'Tablas de Eclipses',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m15/btn_tablas-eclipses.jpg',
    image: '/assets/maya/infographic_m15/hero_tablas-eclipses.jpg',
    content: [
      'En las páginas 51 a 58, los mayas crearon un registro para predecir eclipses solares y lunares. Era un sistema de alerta para realizar rituales a tiempo.',
      'Registraron las fases lunares y agruparon 405 meses lunares, que equivalen a 11,960 días. Este ciclo conecta los movimientos del Sol, la Luna y la Tierra, permitiendo predecir su alineación.',
      'Las tablas están divididas en 69 grupos lunares. Agruparon los meses en paquetes de 5 y 6 lunaciones porque los eclipses ocurren en esos intervalos (cada 148 o 177 días).',
      'El manuscrito contiene dibujos del Sol o la Luna junto a bandas celestiales y criaturas que oscurecen la luz. Estas imágenes indicaban a los sacerdotes cuándo realizar ceremonias.',
      'La tabla predecía las condiciones matemáticas de un eclipse en la Tierra, aunque no fuera visible en las ciudades mayas. Esto muestra su comprensión de la periodicidad orbital.'
    ],
    expandables: [
      { label: 'El Número Mágico 11,960', icon: 'atom', text: 'El ciclo de 11,960 días sincroniza los ciclos lunares, el año solar y el calendario sagrado (Tzolkin), siendo divisible por 260.' },
      { label: 'Imágenes del Peligro', icon: 'clock', text: 'Las imágenes de serpientes mordiendo el glifo kin (Sol) representaban una batalla cósmica. La tabla indicaba cuándo el sol requeriría ofrendas.' }
    ],
    fact: 'Astrónomos confirmaron que la tabla de eclipses del Códice de Dresde cubre 33 años en el siglo VIII d.C. Y predice ventanas de eclipses solares con precisión.'
  },
  {
    id: 'tablas-lluvia',
    title: 'Tablas de Lluvia y Marte',
    color: '#00695C',
    btnImage: '/assets/maya/infographic_m15/btn_tablas-lluvia.jpg',
    image: '/assets/maya/infographic_m15/hero_tablas-lluvia.jpg',
    content: [
      'Una gran parte del Códice de Dresde está dedicada a almanaques agrícolas. Conectan los ciclos astronómicos con las lluvias y las estaciones de siembra.',
      'Chaac, el dios de la lluvia, aparece frecuentemente. Está ilustrado con hachas (truenos) y vasijas (agua). Se asocia a los cuatro puntos cardinales para indicar la dirección de vientos y tormentas.',
      'El códice también incluye tablas sobre Marte. Los mayas mapearon el movimiento retrógrado de Marte, cuando el planeta parece detenerse y moverse hacia atrás en el cielo nocturno.',
      'El ciclo de Marte en las tablas es de 780 días. El período sinódico real es de 779.94 días. Los mayas lograron esta alta precisión sin instrumentos ópticos.',
      'Estos almanaques indicaban cuándo preparar la tierra y sembrar. Combinando los ciclos de Marte, la Luna y las estaciones, aseguraban la producción agrícola.'
    ],
    expandables: [
      { label: 'El Dios Chaac', icon: 'atom', text: 'Chaac se asocia a cuatro colores: rojo (Este), blanco (Norte), negro (Oeste) y amarillo (Sur). Estas direcciones eran clave para el clima de Yucatán.' },
      { label: 'El Planeta Rojo', icon: 'atom', text: 'Dividieron el ciclo de 780 días de Marte en intervalos de 78 días. Este ciclo refleja el tiempo que tarda la Tierra en rebasar a Marte en su órbita.' }
    ],
    fact: 'La página 74 muestra "El Diluvio": un cocodrilo celeste y una diosa vertiendo agua. Podría representar la temporada de huracanes o una narración mitológica.'
  },
  {
    id: 'matematica-codice',
    title: 'La Matemática',
    color: '#F9A825',
    btnImage: '/assets/maya/infographic_m15/btn_matematica-codice.jpg',
    image: '/assets/maya/infographic_m15/hero_matematica-codice.jpg',
    content: [
      'El Códice de Dresde documenta el sistema matemático maya. Usaban una base vigesimal, agrupando cantidades de 20 en 20.',
      'Escribían números con dos símbolos: un punto representaba el uno y una barra el cinco. Al combinarlos y apilarlos en posiciones verticales, podían registrar cantidades mayores.',
      'Un gran logro fue el uso del cero, representado con una concha. El cero posicional les permitía escribir y calcular grandes cifras, facilitando la medición de ciclos largos.',
      'El códice contiene "Fechas de Cuenta Larga", un calendario que contaba los días desde la fecha de su creación mítica (3114 a.C.). Las páginas muestran cálculos de millones de días.',
      'Utilizaban algoritmos de corrección en el códice. Instruían a los sacerdotes a sumar o restar cantidades para ajustar los ciclos astronómicos a las observaciones reales.'
    ],
    expandables: [
      { label: 'El Cero de Concha', icon: 'clock', text: 'El uso del cero posicional permitió a los mayas realizar cálculos complejos siglos antes de su uso común en Europa.' },
      { label: 'Multiplicaciones Antiguas', icon: 'atom', text: 'El Códice incluye múltiplos precalculados de ciclos, como 91 o 78 días, funcionando como tablas de referencia para agilizar cálculos.' }
    ],
    fact: 'El "Número Serpiente" en el códice contiene un cálculo de más de 12 millones de días, apuntando a fechas mitológicas en el pasado distante.'
  },
  {
    id: 'supervivencia-codice',
    title: 'Supervivencia',
    color: '#FFF8E1',
    btnImage: '/assets/maya/infographic_m15/btn_supervivencia-codice.jpg',
    image: '/assets/maya/infographic_m15/hero_supervivencia-codice.jpg',
    content: [
      'El Códice de Dresde es uno de los cuatro códices mayas prehispánicos que sobreviven, junto al de Madrid, París y el Códice Maya de México.',
      'En 1562, el obispo franciscano Diego de Landa realizó un "auto de fe" en Maní, Yucatán. Ordenó quemar miles de objetos sagrados y códices mayas, destruyendo gran parte del registro histórico y científico.',
      'Landa justificó la quema afirmando que los libros contenían "supersticiones". Se perdió un conocimiento invaluable de astronomía, medicina e historia.',
      'Los cuatro códices sobrevivieron porque fueron enviados a Europa antes de las quemas. El Códice de Dresde es considerado el más complejo en contenido científico y matemático.',
      'El documento es una enciclopedia en papel de amate que sobrevivió a la colonia, al viaje oceánico y a la guerra. Preserva el registro astronómico de la civilización maya.'
    ],
    expandables: [
      { label: 'Los Cuatro Sobrevivientes', icon: 'atom', text: 'El Códice de París trata rituales, el de Madrid es un almanaque agrícola, y el Códice Maya de México se enfoca en el planeta Venus.' },
      { label: 'La Ironía Histórica', icon: 'clock', text: 'Diego de Landa documentó parte del alfabeto maya en su crónica posterior. Esas notas ayudaron a los epigrafistas modernos a descifrar los códices.' }
    ],
    fact: 'Cuando el astrónomo John Teeple analizó las tablas del Códice de Dresde en los años 1920, la comunidad científica reconoció el alto nivel matemático de la cultura maya.'
  }
];


// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
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
      hue: Math.random() > 0.5 ? '198,40,40' : '21,101,192', // Red or Blue (codex colors)
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

// ─── Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(198,40,40,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C62828','#5D4037','#1565C0','#212121','#00695C','#F9A825','#FFF8E1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <rect x="290" y="20" width="20" height="20" fill="none" stroke="#C62828" strokeWidth="1.5" opacity="0.6" rx="3" />
        <circle cx="300" cy="30" r="4" fill="#C62828" opacity="0.5" />
        <line x1="285" y1="30" x2="315" y2="30" stroke="#C62828" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(198,40,40,0.2)" />
            <stop offset="50%" stopColor="rgba(198,40,40,0.9)" />
            <stop offset="100%" stopColor="rgba(198,40,40,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C62828" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CÃƒ"DICE DE DRESDE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(198,40,40,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL LIBRO ASTRONÃƒ"MICO DE LOS MAYAS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,248,225,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
          layoutId="activeDotMaya"
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

// ─── Expandable Section with Random Direction ────────────────────────────────
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

// ─── Content Panel ────────────────────────────────────────────
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
        background: 'rgba(25, 20, 15, 0.92)',
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
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#000',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
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
          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{
            marginTop: '2rem', padding: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}40`,
            borderRadius: '16px',
            display: 'flex', gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
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
                Sabiduría Códice
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(198,40,40,0.15)',
    }}>
      <Star size={14} style={{ color: '#C62828', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C62828, #F9A825)', borderRadius: '3px', boxShadow: '0 0 8px rgba(198,40,40,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C62828', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM15() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
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
      backgroundImage: 'linear-gradient(180deg, rgba(15,10,10,0.85) 0%, rgba(20,15,10,0.8) 40%, rgba(15,10,10,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <MayaHeader />
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '1rem',
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
          {activeData ? (
            <ContentPanel
              key={activeData.id}
              node={activeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', padding: '3rem',
                color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: '16px',
                marginTop: '1rem',
              }}
            >
              <Sparkles size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Selecciona un nodo interactivo para explorar los misterios astronómicos y matemáticos del Códice de Dresde.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Bibliografía y Fuentes del Módulo
          </h4>
          <ul style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                lineHeight: 1.4,
              }}>
                <span style={{ color: '#C62828' }}>─â€“Â </span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox src={lightboxSrc} alt="Codex detailed view" onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
