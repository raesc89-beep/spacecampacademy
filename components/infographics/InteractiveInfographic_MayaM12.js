'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya themed) ────────────────────────────

function DecoStela({ size = 70, color = '#D7CCC8', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" style={{ opacity: 0.25, ...style }}>
      <rect x="10" y="5" width="20" height="50" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M15 10 L25 10 M15 15 L25 15 M15 20 L20 20 M15 25 L25 25 M15 30 L22 30 M15 35 L25 35 M15 40 L25 40 M15 45 L19 45 M15 50 L25 50" stroke={color} strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <circle cx="20" cy="15" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoBallCourt({ size = 70, color = '#558B2F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="5" y="15" width="15" height="30" fill="none" stroke={color} strokeWidth="2" />
      <rect x="40" y="15" width="15" height="30" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      <line x1="20" y1="30" x2="40" y2="30" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <path d="M 20 15 L 40 15 M 20 45 L 40 45" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoHieroglyphStair({ size = 70, color = '#F9A825', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 50 L15 50 L15 40 L25 40 L25 30 L35 30 L35 20 L45 20 L45 10 L55 10" fill="none" stroke={color} strokeWidth="2" />
      {/* Tiny glyph blocks */}
      {[10, 20, 30, 40].map((x, i) => (
        <rect key={i} x={x} y={45 - i * 10} width="4" height="4" fill={color} opacity="0.7" />
      ))}
      {[16, 26, 36, 46].map((x, i) => (
        <circle key={i} cx={x} cy={47 - i * 10} r="1.5" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}

function DecoAltarQ({ size = 70, color = '#D84315', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="10" y="15" width="40" height="30" rx="4" fill="none" stroke={color} strokeWidth="2" />
      {/* 4 sides representation */}
      <rect x="15" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <rect x="26" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <rect x="37" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Rulers tiny heads */}
      <circle cx="19" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="41" cy="25" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoMacaw({ size = 70, color = '#0277BD', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M40 20 Q50 15 55 25 Q45 28 40 25 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M40 20 Q35 10 25 15 C15 20 10 35 20 45 Q30 55 45 40 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="22" r="2.5" fill={color} opacity="0.8" />
      <path d="M25 25 Q15 30 20 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M55 25 Q58 35 50 45" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3,2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'copan-ciudad': [DecoStela, DecoHieroglyphStair, DecoMacaw],'estelas-astronomicas': [DecoStela, DecoAltarQ, DecoBallCourt],
  'congreso-astronomico': [DecoAltarQ, DecoStela, DecoHieroglyphStair],'altar-q': [DecoAltarQ, DecoHieroglyphStair, DecoMacaw],'escalinata-jeroglificos': [DecoHieroglyphStair, DecoStela, DecoBallCourt],'cancha-pelota': [DecoBallCourt, DecoMacaw, DecoAltarQ],
  'observatorio-copan': [DecoStela, DecoMacaw, DecoBallCourt],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Fash, W.L. (2001). Scribes, Warriors and Kings: The City of Copán and the Ancient Maya, Thames & Hudson',
  'Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Stuart, D. (2005). "Ideology and Classic Maya Kingship", A Catalyst for Ideas, SAR Press',
  'Baudez, C.F. (1994). Maya Sculpture of Copán, University of Oklahoma Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'copan-ciudad',
    title: 'La Ciudad: Copán',
    color: '#D7CCC8',
    btnImage: '/assets/maya/infographic_m12/btn_copan-ciudad.jpg',
    image: '/assets/maya/infographic_m12/hero_copan-ciudad.jpg',
    content: [
      'Imagina una gran ciudad escondida en la selva. Así es Copán, ubicada en el actual país de Honduras. Esta ciudad se alza en el valle del Río Copán. Los expertos la llaman la "Atenas del Mundo Maya". Copán es famosa por sus esculturas de piedra detalladas. Cada rincón cuenta una historia.',
      'El sitio fue declarado Patrimonio de la Humanidad por la UNESCO. Representa uno de los logros científicos de la humanidad antigua. Piensa en Copán como una universidad y galería de arte. Aquí, los reyes eran guerreros, intelectuales y astrónomos. La ciudad tenía plazas abiertas y templos pintados de colores brillantes.',
      'La ubicación de Copán no fue un accidente. El valle ofrecía tierras ricas para el cultivo del maíz, frijoles y calabazas. Tenían un río constante que aseguraba agua todo el año. Estaban cerca de rutas comerciales de obsidiana y jade. Esto permitió que sus gobernantes contrataran a los mejores artistas y arquitectos.',
      'Si Tikal era como la Nueva York del mundo antiguo por sus pirámides, Copán era como París, la capital del arte y el conocimiento. Sus escultores lograron dar volumen a la piedra. Crearon retratos tridimensionales de sus reyes que asombran en la actualidad.',
      'Lo que hace especial a Copán es su conexión con las estrellas. Toda la ciudad fue diseñada como un espejo del cielo. Sus plazas y monumentos estaban alineados con los movimientos del sol, la luna, Venus y las constelaciones. La astronomía era la herramienta principal para gobernar y decidir cuándo plantar las cosechas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Copán fue redescubierta en 1839 por John Lloyd Stephens y Frederick Catherwood. Stephens compró la ciudad por cincuenta dólares a un granjero local que cultivaba tabaco.' },
      { label: 'Tecnología Maya', icon: 'clock', text: 'Los escultores de Copán trabajaban una piedra llamada toba volcánica. Al extraerse, es suave y fácil de tallar. Al exponerse al aire, se endurece, permitiendo que sus obras sobrevivan en la selva.' },
    ],
    fact: 'A pesar de no tener herramientas de metal, los artistas de Copán crearon esculturas en "alto relieve". Las figuras resaltan de la piedra base y crean efectos de luz según la posición del sol.',
  },
  {
    id: 'estelas-astronomicas',
    title: 'Las Estelas Solares',
    color: '#F9A825',
    btnImage: '/assets/maya/infographic_m12/btn_estelas-astronomicas.jpg',
    image: '/assets/maya/infographic_m12/hero_estelas-astronomicas.jpg',
    content: [
      'Las estelas son la firma artística de Copán. Son bloques de piedra de más de cuatro metros de altura. Estas esculturas son retratos de los reyes, cubiertos con símbolos, dioses y registros astronómicos. En Copán hay más de 14 estelas que cuentan la historia del cosmos y la dinastía.',
      'Piensa en una estela como la portada de una revista tallada en roca. Anuncia el poder del rey y su conexión con el universo. El rey Waxaklajuun Ubaah Kawiil ordenó colocar estas estelas en la Gran Plaza siguiendo patrones geométricos. Se alinean con el sol durante los solsticios y equinoccios.',
      'El nivel de detalle permite ver las plumas en los tocados y los nudos de los cinturones. En los costados y la parte trasera, los mayas tallaron textos jeroglíficos. Funcionan como calendarios y calculadoras astronómicas. Registran eclipses, movimientos de Venus y ciclos lunares con precisión.',
      'Para los mayas, el rey mantenía el orden del universo. En las estelas, sostenían barras ceremoniales que simbolizaban el cielo. Las estelas funcionaban como antenas que conectaban la energía planetaria con la tierra. Cuando la luz iluminaba una estela, probaba que el universo funcionaba bien.',
      'Estas estelas son monumentos matemáticos. Los mayas usaban un sistema vigesimal y conocían el cero. Usando puntos y barras, registraban fechas millones de años en el pasado o futuro. Esto demuestra su comprensión del "tiempo profundo".',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Originalmente, estas estelas estaban pintadas con colores vibrantes. El color principal era el rojo de cinabrio, que representaba la vida y el sol. También usaban azul maya, verde, amarillo y negro.' },
      { label: 'Tecnología Maya', icon: 'atom', text: 'Bajo muchas estelas se encontraron "escondites" o cajas de piedra selladas. Contienen joyas de jade, conchas y vasijas. Estas ofrendas se plantaban para dar poder al monumento al inaugurarse.' },
    ],
    fact: 'La Estela C tiene un retrato del rey Waxaklajuun Ubaah Kawiil en ambos lados. Un lado muestra al rey joven mirando al este. El otro lado lo muestra anciano mirando al oeste, como metáfora del movimiento del sol.',
  },
  {
    id: 'congreso-astronomico',
    title: 'El Gran Congreso del 763',
    color: '#6A1B9A',
    btnImage: '/assets/maya/infographic_m12/btn_congreso-astronomico.jpg',
    image: '/assets/maya/infographic_m12/hero_congreso-astronomico.jpg',
    content: [
      'En el año 763 d.C. Copán fue sede de un congreso científico. Astrónomos, matemáticos y sacerdotes mayas se reunieron para debatir descubrimientos astronómicos. Fue similar a una convención científica para resolver problemas del calendario.',
      'El rey K\'ak\'Yipyaj Chan Kawiil organizó este encuentro. Necesitaban ajustar los calendarios porque se desincronizaron con los movimientos del sol y la luna. Era un ajuste similar a nuestro año bisiesto moderno.',
      'Los sabios desplegaron códices llenos de cálculos matemáticos. Discutieron cómo calibrar la duración de la lunación. Su objetivo era sincronizar el calendario ceremonial de 260 días con el calendario solar de 365 días.',
      'El congreso fue un éxito científico. Calcularon la duración de las fases lunares con gran precisión. Determinaron que 149 ciclos lunares equivalían a 4,400 días. Esto da un mes lunar de 29.5302 días, muy cercano al cálculo moderno de 29.53059 días.',
      'Para conmemorar este éxito, tallaron monumentos como el Altar Q y la Escalinata de los Jeroglíficos. Registraron estas fórmulas de corrección. Los mayas usaban la piedra para compartir conocimiento científico a través de las generaciones.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Venus era el planeta más importante para los mayas. Lo consideraban hermano del sol. Usaban sus ciclos para decidir cuándo ir a la guerra o coronar gobernantes.' },
      { label: 'Tecnología Maya', icon: 'clock', text: 'Los astrónomos mayas hacían observaciones a simple vista. Construían tubos estrechos de madera o piedra. Al mirar por estos agujeros, rastreaban movimientos estelares y registraban datos.' },
    ],
    fact: 'El conocimiento astronómico de este congreso se esparció. Ciudades como Palenque o Quiriguá empezaron a usar las fórmulas matemáticas acordadas en Copán, demostrando una red científica eficiente.',
  },
  {
    id: 'altar-q',
    title: 'El Misterioso Altar Q',
    color: '#D84315',
    btnImage: '/assets/maya/infographic_m12/btn_altar-q.jpg',
    image: '/assets/maya/infographic_m12/hero_altar-q.jpg',
    content: [
      'El Altar Q es un bloque de piedra que funciona como un registro histórico. Muestra a los 16 reyes de la dinastía de Copán sentados en cojines jeroglíficos. Fue mandado a hacer por Yax Pasaj Chan Yopaat para demostrar su derecho a gobernar.',
      'En los lados del altar, cada rey pasa el mando a su sucesor. En la parte delantera, el fundador Yax Kuk Mo\' entrega el cetro al rey 16. Aunque vivieron separados por 350 años, la imagen legitima el poder político.',
      'El Altar Q contiene un texto jeroglífico sobre la fundación de Copán. Narra que Yax Kuk Mo\' viajó a Teotihuacán en el año 426 d.C. para recibir su cetro y aprender astronomía. Tardó 153 días en llegar a Copán para fundar la ciudad.',
      'El altar se colocó al pie de la Estructura 16. Durante el año, la sombra del templo ilumina a reyes específicos en aniversarios importantes. Funciona como un reloj solar histórico.',
      'Debajo del altar, se descubrió una cripta con restos de 15 jaguares sacrificados. El número representaba a los 15 reyes anteriores. Era un ritual para conectar el poder de los felinos con las estrellas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Yax Kuk Mo\'fue real. Los científicos encontraron su tumba bajo las pirámides en los años 90. Tenía heridas graves, demostrando que fue un guerrero. Sus isótopos dentales confirmaron que venía de otra región.' },
      { label: 'Tecnología Maya', icon: 'atom', text: 'Cada rey en el Altar Q se sienta sobre un glifo. Ese glifo es su propio nombre escrito en jeroglífico. Es una forma inteligente de identificar personajes sin ocupar espacio extra.' },
    ],
    fact: 'El diseño cuadrado del Altar Q representa la visión maya del cosmos. Creían que el universo era plano con cuatro esquinas. El altar es un modelo del universo.',
  },
  {
    id: 'escalinata-jeroglificos',
    title: 'La Escalinata de los Jeroglíficos',
    color: '#0277BD',
    btnImage: '/assets/maya/infographic_m12/btn_escalinata-jeroglificos.jpg',
    image: '/assets/maya/infographic_m12/hero_escalinata-jeroglificos.jpg',
    content: [
      'La Escalinata de los Jeroglíficos en Copán es una biblioteca de piedra. Tiene 63 escalones con miles de símbolos tallados. Con más de 2,200 jeroglíficos, es el texto maya más largo de la historia.',
      'Iniciada por Waxaklajuun Ubaah Kawiil, fue terminada por el rey K\'ak\'Yipyaj Chan Kawiil en 755 d.C. Cuenta la historia, guerras y ceremonias de los reyes de Copán. Su legado quedó tallado en la ciudad.',
      'Con el tiempo, las raíces de los árboles y los sismos derrumbaron la escalera. En el siglo XIX, los arqueólogos la reconstruyeron en orden aleatorio porque no sabían leer jeroglíficos.',
      'Hoy, los epigrafistas usan computadoras para ordenar las piezas. Han descubierto que la escalinata registra fechas astronómicas. Muestra alineaciones de Venus y ciclos lunares en batallas clave.',
      'En el centro de la escalinata hay estatuas de guerreros armados. Representan a los espíritus de reyes pasados. En la base, un altar con la deidad del inframundo recuerda el origen de su historia.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La toba volcánica de Copán es frágil frente a la lluvia. Actualmente, la Escalinata está protegida por una gran carpa para evitar que las lluvias ácidas borren las letras de piedra.' },
      { label: 'Tecnología Maya', icon: 'clock', text: 'La escritura maya es logosilábica. Un jeroglífico puede representar una palabra completa o sílabas de sonido. Podían escribir la misma palabra de varias formas combinando sonidos e imágenes.' },
    ],
    fact: 'El texto revela que en el año 738, el gobernante 18 Conejo fue decapitado por el rey de Quiriguá. La escalinata menciona esto de pasada y destaca las victorias posteriores como propaganda.',
  },
  {
    id: 'cancha-pelota',
    title: 'La Cancha de Pelota Cósmica',
    color: '#558B2F',
    btnImage: '/assets/maya/infographic_m12/btn_cancha-pelota.jpg',
    image: '/assets/maya/infographic_m12/hero_cancha-pelota.jpg',
    content: [
      'Copán posee una de las canchas de Juego de Pelota mejor conservadas de Mesoamérica. Se encuentra en la zona principal y fue remodelada tres veces. Alcanzó su forma final bajo el reinado de 18 Conejo.',
      'El campo tiene forma de letra "I" mayúscula con un corredor central estrecho. Los jugadores golpeaban una pelota de hule con caderas, codos y rodillas. Usaban protecciones pesadas para evitar heridas graves.',
      'El juego recreaba un evento astronómico y mítico. Según el Popol Vuh, héroes gemelos derrotaron a los dioses del inframundo y resucitaron como el Sol y la Luna. El rebote de la pelota representaba al sol.',
      'Los marcadores de Copán son cabezas de guacamayas, el ave solar. Estaban fijados en los muros inclinados. Cuando la pelota los golpeaba, representaba el contacto entre humanos y las fuerzas solares.',
      'La alineación astronómica del Juego de Pelota es precisa. Durante los equinoccios, la luz del sol cruza el campo y divide la luz y las sombras. Esto refleja el equilibrio cósmico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los mayas cosechaban savia de caucho y la mezclaban con jugo de Ipomoea alba. Esta reacción química vulcanizaba la pelota para que rebotara con fuerza.' },
      { label: 'Tecnología Maya', icon: 'atom', text: 'Debajo de la cancha, los arqueólogos hallaron un escondite con un recipiente de cerámica. Contenía una ofrenda de fundación colocada antes del piso nuevo para dar fuerza al campo.' },
    ],
    fact: 'Los sacrificios humanos en el juego de pelota no ocurrían a diario. La mayoría de los juegos eran deportivos. Los sacrificios se reservaban para reyes capturados después de grandes guerras.',
  },
  {
    id: 'observatorio-copan',
    title: 'El Observatorio de las Colinas',
    color: '#004D40',
    btnImage: '/assets/maya/infographic_m12/btn_observatorio-copan.jpg',
    image: '/assets/maya/infographic_m12/hero_observatorio-copan.jpg',
    content: [
      'Los astrónomos de Copán convirtieron el valle en un observatorio astronómico. Instalaron la Estela 10 y la Estela 12 en colinas opuestas. Estaban separadas por siete kilómetros para funcionar como mira telescópica.',
      'Desde la Estela 12, se creaba una línea visual perfecta hacia la Estela 10. Cada 12 de abril, el sol se oculta justo detrás de la Estela 10. Era un marcador solar preciso.',
      'El 12 de abril marcaba el final de la época seca. Esta alineación era un reloj agrícola. El rey observaba el sol y anunciaba que era hora de sembrar maíz.',
      'Esto es astronomía práctica. La alineación del sol servía para la supervivencia agrícola. Si sembraban tarde o temprano, la cosecha fallaría. El sol dictaba la vida de Copán.',
      'El sistema de estelas formaba triángulos visuales desde los templos. Los mayas demostraron que no necesitan lentes ópticos para medir el universo. Usaron geometría, monumentos y paciencia para atrapar al sol.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sol vuelve a pasar por esa línea el 1 de septiembre, marcando el ciclo de cosecha. Muchos agricultores de Copán siguen usando estas fechas para sus actividades.' },
      { label: 'Tecnología Maya', icon: 'clock', text: 'Los mayas usaban estacas, cuerdas y observaciones de sombras en el horizonte. No tenían brújula magnética para orientar estas estelas, confiaban en el entorno natural.' },
    ],
    fact: 'El arqueoastrónomo Anthony Aveni cataloga a Copán como un marcador solar agrícola monumental. Demuestra que los sabios de Copán hacían ciencia de vanguardia.',
  },
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
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      // Mayan firefly/jungle colors
      hue: Math.random() > 0.5 ? '249,168,37' : '85,139,47', 
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.1;
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

// ─── Header Banner ──────────────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0.5rem' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(249,168,37,0.3))' }}>
        {/* Decorative arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D7CCC8','#F9A825','#6A1B9A','#D84315','#0277BD','#558B2F','#004D40'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Maya Sun icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F9A825" strokeWidth="2" opacity="0.8" />
        <circle cx="300" cy="30" r="6" fill="#F9A825" opacity="0.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line key={angle} x1="300" y1="16" x2="300" y2="10" stroke="#F9A825" strokeWidth="2" opacity="0.8" strokeLinecap="round" transform={`rotate(${angle} 300 30)`} />
        ))}
        
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,168,37,0.2)" />
            <stop offset="50%" stopColor="rgba(249,168,37,0.9)" />
            <stop offset="100%" stopColor="rgba(249,168,37,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F9A825" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">COPÃN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(249,168,37,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">LAS ESTELAS SOLARES</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(215,204,200,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
        {isActive && (
          <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }} />
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
        <motion.div layoutId="activeDotMayaM12"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }} />
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

const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem', borderRadius: '14px', border: `1px solid ${color}25`,
      overflow: 'hidden', background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ backgroundColor: `${color}12` }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.8rem 1rem',
          background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)' }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(12, 16, 12, 0.95)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`,
        borderRadius: '24px', position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${node.color}40`, borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}>
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{
            marginTop: '1.5rem', background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px', padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>Dato Científico</span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>{node.fact}</p>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(249,168,37,0.2)' }}>
      <Star size={14} style={{ color: '#F9A825', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #F9A825, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(249,168,37,0.4)' }} />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F9A825', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM12() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(12,16,12,0.9) 0%, rgba(15,20,15,0.85) 40%, rgba(12,16,12,0.92) 100%), ',
      backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(249,168,37,0.15)', boxShadow: '0 0 60px rgba(12,16,12,0.8), inset 0 0 80px rgba(0,0,0,0.5)',
    }}>
      <TemporalField />
      <MayaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ textAlign: 'center', color: 'rgba(249,168,37,0.8)', fontSize: '0.85rem', marginBottom: '1rem', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ChevronRight size={14} /> Toca cada monumento para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2, marginBottom: '1rem', padding: '0 0.5rem' }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: 'rgba(249,168,37,0.08)', borderRadius: '16px', border: '1px solid rgba(249,168,37,0.25)', position: 'relative', zIndex: 2 }}>
            <p style={{ margin: 0, color: '#F9A825', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔬  ¡Has explorado la grandeza astronómica de Copán!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              Ya estás listo para continuar con el siguiente módulo.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bibliografía ─── */}
      <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', borderRadius: '0 0 16px 16px', position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          🔬 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>"Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
