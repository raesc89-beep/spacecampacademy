'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoSerpentHead({ size = 70, color = '#FF6D00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 30 30 40 Q40 50 50 40 L55 45 L50 55 L10 55 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M10 40 L5 30 L15 25 L30 40" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="35" r="3" fill={color} opacity="0.6" />
      <path d="M40 45 Q45 40 50 45" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Feathers */}
      <path d="M15 25 Q20 15 10 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M20 28 Q30 18 20 15" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStaircase({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 55 L55 55 L55 45 L45 45 L45 35 L35 35 L35 25 L25 25 L25 15 L15 15 L15 5 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="15" y1="55" x2="15" y2="15" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="25" y1="55" x2="25" y2="25" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="35" y1="55" x2="35" y2="35" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="45" y1="55" x2="45" y2="45" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
    </svg>
  );
}

function DecoSunRays({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 15 * Math.cos(rad)} y1={30 + 15 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="2" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

function DecoTriangle({ size = 70, color = '#29B6F6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 10,50 50,50" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <polygon points="30,20 18,45 42,45" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <polygon points="30,30 25,40 35,40" fill={color} opacity="0.4" />
      {/* Light ray intersecting */}
      <line x1="0" y1="20" x2="60" y2="40" stroke={color} strokeWidth="1" opacity="0.7" strokeDasharray="4,2" />
    </svg>
  );
}

function DecoCalendarWheel({ size = 70, color = '#00C853', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner dots */}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
      {/* Divisions */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 18 * Math.cos(rad)} y1={30 + 18 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="1" />
        );
      })}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'piramide-castillo': [DecoStaircase, DecoTriangle, DecoCalendarWheel],'equinoccio-serpiente': [DecoSerpentHead, DecoSunRays, DecoTriangle],'geometria-solar': [DecoSunRays, DecoTriangle, DecoStaircase],
  'calendario-piedra': [DecoCalendarWheel, DecoStaircase, DecoSunRays],'acustica-quetzal': [DecoSerpentHead, DecoTriangle, DecoCalendarWheel],'construccion-capas': [DecoStaircase, DecoTriangle, DecoSerpentHead],'patrimonio-mundial': [DecoCalendarWheel, DecoSunRays, DecoStaircase],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lubman, D. (1998). "An Archaeological Study of Chirped Echo from the Mayan Pyramid at Chichén Itzá", JASA, 104',
  'Carlson, J.B. (1999). "Pilgrimage and the Equinox Serpent of Light and Shadow Phenomenon at the Castillo", Archaeoastronomy, 14',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Ringle, W. et al. (1998). "The Return of Quetzalcoatl: Evidence for the Spread of a World Religion", Ancient Mesoamerica, 9',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'piramide-castillo',
    title: 'El Castillo',
    color: '#FF6D00',
    btnImage: '/assets/maya/infographic_m2/btn_piramide-castillo.jpg',
    image: '/assets/maya/infographic_m2/hero_piramide-castillo.jpg',
    content: [
      'La pirámide de "El Castillo" se ubica en el centro de Chichén Itzá. Tiene 30 metros de altura y fue construida alrededor del año 1000 d.C. Es una obra maestra de la arquitectura monumental maya.',
      'Su estructura tiene 9 terrazas escalonadas. Estas plataformas representan los 9 niveles del Xibalbá, el inframundo maya. La pirámide es un modelo a escala de su universo espiritual, construido con bloques de piedra caliza.',
      'El Castillo tiene escalinatas en sus cuatro lados. Cada escalera cuenta con 91 escalones. Al multiplicar 91 por 4 y sumar la plataforma superior, obtenemos 365, el número de días en un año solar.',
      'Esta pirámide funciona como un calendario de piedra. Los mayas observaban el cielo con precisión y calcularon la duración del año solar (Haab). Construyeron el edificio para demostrar su dominio del tiempo y el espacio.',
      'La ubicación de El Castillo tiene una desviación calculada respecto al norte verdadero. Esta rotación permite que el sol interactúe con la arquitectura en días específicos, funcionando como un reloj solar.',
    ],
    expandables: [
      { label: 'El Haab Maya', icon: 'clock', text: 'El calendario Haab de 365 días se dividía en 18 meses de 20 días, más un periodo final llamado "Wayeb" de 5 días, que se consideraba un tiempo de rituales.' },
      { label: 'Un Nombre Español', icon: 'clock', text: 'Los conquistadores españoles llamaron "El Castillo" al edificio en el siglo XVI. Para los mayas, era el Templo de Kukulcán, el dios serpiente emplumada.' },
    ],
    fact: 'En el interior de la pirámide principal hay otra pirámide más antigua. Los gobernantes construían nuevos templos envolviendo los edificios anteriores.',
  },
  {
    id: 'equinoccio-serpiente',
    title: 'La Serpiente de Luz',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m2/btn_equinoccio-serpiente.jpg',
    image: '/assets/maya/infographic_m2/hero_equinoccio-serpiente.jpg',
    content: [
      'Dos veces al año, un fenómeno visual ocurre en El Castillo durante los equinoccios de primavera y otoño (20 de marzo y 22 de septiembre). En estas fechas, el día y la noche tienen la misma duración.',
      'Al final de la tarde, los rayos del sol golpean la esquina noroeste de las 9 terrazas escalonadas. Esto proyecta sombras triangulares sobre la alfarda de la escalinata norte.',
      'Conforme el sol desciende, se forman 7 triángulos de luz y sombra. Estos triángulos se conectan con la cabeza de serpiente de piedra en la base, creando la ilusión de una serpiente luminosa.',
      'Esta "Serpiente de Luz" representaba a Kukulcán descendiendo del cielo. Para los mayas, el evento marcaba el inicio del ciclo agrícola de primavera o las cosechas en otoño.',
      'El fenómeno es dinámico. A lo largo de aproximadamente tres horas, la serpiente parece deslizarse por el costado de la pirámide a medida que cambia el ángulo del sol.',
    ],
    expandables: [
      { label: 'Un Dios Viajero', icon: 'atom', text: 'Kukulcán es la versión maya de Quetzalcóatl de la cultura tolteca. Significa "Serpiente Emplumada" y era una deidad unificadora en Mesoamérica.' },
      { label: 'Precisión Relojera', icon: 'clock', text: 'El evento es visible varios días alrededor de los equinoccios, pero alcanza la forma de 7 triángulos completos exactamente en el día del equinoccio.' },
    ],
    fact: 'Un error en el ángulo de inclinación de los muros de la pirámide habría arruinado el efecto visual. Los arquitectos mayas dominaban la geometría tridimensional.',
  },
  {
    id: 'geometria-solar',
    title: 'Geometría Solar',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m2/btn_geometria-solar.jpg',
    image: '/assets/maya/infographic_m2/hero_geometria-solar.jpg',
    content: [
      'Los mayas lograron la figura de la serpiente mediante astronomía y geometría. La pirámide fue diseñada para reflejar la luz del sol debido a su ubicación y forma.',
      'El Castillo está rotado unos 20 grados al este del norte verdadero. Chichén Itzá se encuentra en la latitud de 20 grados norte. Esta coincidencia angular es esencial para el fenómeno de luz y sombra.',
      'La forma de las terrazas también es clave. Las esquinas están diseñadas con formas redondeadas. La luz rasante del atardecer choca contra estos bordes y proyecta los 7 triángulos.',
      'El ángulo del sol, la inclinación de las terrazas y la pendiente de la escalera debían estar sincronizados para crear las sombras. Todo fue calculado con precisión.',
      'Los constructores observaron los ciclos solares desde observatorios como El Caracol. Entendieron el movimiento de los astros y lo aplicaron a la arquitectura del edificio.',
    ],
    expandables: [
      { label: 'Luz y Sombra', icon: 'clock', text: 'El uso de luz y sombra en la arquitectura se llama "hierofanía", una revelación de lo sagrado. Para los mayas, el sol animaba la estructura de piedra.' },
      { label: 'Matemática Maya', icon: 'atom', text: 'Los mayas usaban un sistema matemático vigesimal e inventaron el cero de forma independiente. Esto les permitió realizar cálculos astronómicos complejos.' },
    ],
    fact: 'A pesar de la precesión de los equinoccios, el fenómeno visual sigue funcionando porque se basa en el ciclo anual del sol respecto a la estructura.',
  },
  {
    id: 'calendario-piedra',
    title: 'Calendario en Piedra',
    color: '#29B6F6',
    btnImage: '/assets/maya/infographic_m2/btn_calendario-piedra.jpg',
    image: '/assets/maya/infographic_m2/hero_calendario-piedra.jpg',
    content: [
      'Los 365 escalones de El Castillo simbolizan el año Haab. Además, la pirámide codifica los ciclos del tiempo maya, funcionando como un calendario monumental.',
      'Las terrazas de la pirámide están divididas por las escaleras centrales. Hay 18 secciones en cada cara, que representan los 18 meses (uinales) de 20 días del calendario Haab.',
      'Los mayas usaban el calendario sagrado Tzolkín de 260 días. El Haab y el Tzolkín formaban la Rueda Calendárica, donde un ciclo completo dura 52 años solares.',
      'Las fachadas de la pirámide tienen paneles decorativos. Hay exactamente 52 tableros tallados en cada lado, representando los años del ciclo de la Rueda Calendárica.',
      'El diseño de las terrazas, paneles y escalones integra números astronómicos. La estructura monumental es un registro de los ciclos del tiempo mesoamericano.',
    ],
    expandables: [
      { label: 'El Fuego Nuevo', icon: 'atom', text: 'Al final del ciclo de 52 años, los mayas celebraban la "Ceremonia del Fuego Nuevo" para asegurar la continuidad del mundo y el sol.' },
      { label: 'Dos Engranajes', icon: 'clock', text: 'El calendario Haab y el Tzolkín funcionan como dos engranajes. Tardan exactamente 52 años solares en volver a alinearse en la misma posición inicial.' },
    ],
    fact: 'Los mayas usaban la "Cuenta Larga" para registrar fechas desde el año 3114 a.C. Esto les permitía fechar eventos pasados y calcular futuros con notación de puntos y barras.',
  },
  {
    id: 'acustica-quetzal',
    title: 'Acústica del Quetzal',
    color: '#00C853',
    btnImage: '/assets/maya/infographic_m2/btn_acustica-quetzal.jpg',
    image: '/assets/maya/infographic_m2/hero_acustica-quetzal.jpg',
    content: [
      'Al aplaudir frente a la pirámide, se produce un efecto acústico. El edificio no devuelve un eco común de aplauso.',
      'El sonido rebota desde los escalones de piedra y produce un eco reverberante. Este sonido es similar al canto del quetzal, el ave sagrada del mundo maya y símbolo de Kukulcán.',
      'El efecto ocurre porque las ondas de sonido rebotan en los 91 escalones. Los peldaños más altos están más lejos, por lo que el sonido tarda un poco más en regresar.',
      'Este retraso continuo entre los ecos crea un "chirrido acústico" (frecuencia modulada). Los espectrogramas muestran que las frecuencias del eco son muy similares al canto real del quetzal.',
      'Se cree que la arquitectura fue diseñada intencionalmente. La altura y profundidad de los peldaños producirían tanto las sombras de la Serpiente de Luz como la acústica del ave sagrada.',
    ],
    expandables: [
      { label: 'El Ave Sagrada', icon: 'clock', text: 'El quetzal tiene plumas esmeraldas que se usaban para los penachos de los gobernantes. Era considerada el ave de la libertad en Mesoamérica.' },
      { label: 'El Gran Juego de Pelota', icon: 'clock', text: 'El Gran Juego de Pelota en Chichén Itzá tiene otra característica acústica. Un sonido en un extremo se escucha a más de 135 metros debido a los muros paralelos.' },
    ],
    fact: 'El ingeniero acústico David Lubman presentó un estudio en 1998 demostrando la similitud entre el eco del aplauso y el quetzal, cambiando la forma de estudiar el sonido arqueológico.',
  },
  {
    id: 'construccion-capas',
    title: 'Construcción en Capas',
    color: '#D50000',
    btnImage: '/assets/maya/infographic_m2/btn_construccion-capas.jpg',
    image: '/assets/maya/infographic_m2/hero_construccion-capas.jpg',
    content: [
      'El Castillo actual es la capa exterior del edificio. Los mayas construyeron esta pirámide sobre estructuras más antiguas, sellándolas en su interior en lugar de demolerlas.',
      'En los años treinta, arqueólogos excavaron la base de El Castillo. Descubrieron una pirámide interior casi intacta (la Subestructura) con su propio templo en la cima.',
      'En este templo interior ("Kukulcán I"), los arqueólogos encontraron un Chac Mool (una figura de piedra reclinada) y el Trono del Jaguar.',
      'El Trono del Jaguar es una escultura roja con incrustaciones de discos de jade. Sus ojos y dientes también tienen decoraciones y permanecía oculta en la pirámide interior.',
      'Construir en capas permitía a los nuevos gobernantes ampliar el templo principal mientras conservaban la santidad de los edificios anteriores.',
    ],
    expandables: [
      { label: 'Una Tercera Pirámide', icon: 'atom', text: 'En 2015, se descubrió otra pirámide más pequeña (Kukulcán 0) dentro de Kukulcán I utilizando tomografía eléctrica de resistividad 3D.' },
      { label: 'El Cenote Oculto', icon: 'atom', text: 'El escaneo 3D reveló que la pirámide de El Castillo está construida sobre un cenote oculto. Los cenotes eran considerados portales al inframundo.' },
    ],
    fact: 'El color original de la pirámide exterior era rojo con detalles en azul y verde. Estaba cubierta de estuco, a diferencia de la piedra gris expuesta de hoy.',
  },
  {
    id: 'patrimonio-mundial',
    title: 'Patrimonio Mundial',
    color: '#D7CCC8',
    btnImage: '/assets/maya/infographic_m2/btn_patrimonio-mundial.jpg',
    image: '/assets/maya/infographic_m2/hero_patrimonio-mundial.jpg',
    content: [
      'Chichén Itzá es un sitio arqueológico reconocido, y El Castillo es su estructura principal. En 1988, la UNESCO declaró la ciudad Patrimonio de la Humanidad.',
      'En 2007, Chichén Itzá y su pirámide principal fueron seleccionadas como una de las "Nuevas Siete Maravillas del Mundo Moderno" mediante una votación global.',
      'Millones de turistas visitan Chichén Itzá cada año. Este volumen de personas causa desgaste en la piedra caliza de los escalones de la pirámide.',
      'Desde 2006, las autoridades prohibieron escalar El Castillo. La medida protege la estructura y evita accidentes, garantizando su preservación.',
      'Los esfuerzos de conservación incluyen la limpieza y el estudio mediante escáneres de radar y tecnología moderna. Esto asegura que la ingeniería maya se mantenga conservada.',
    ],
    expandables: [
      { label: 'Redescubrimiento', icon: 'clock', text: 'Chichén Itzá fue abandonada y cubierta por la selva. En el siglo XIX, exploradores como John Lloyd Stephens y Frederick Catherwood la documentaron y atrajeron atención mundial.' },
      { label: 'Un Cielo para el Mañana', icon: 'clock', text: 'Existe un movimiento para conservar el "Cielo Oscuro" reduciendo la contaminación lumínica urbana, permitiendo observar las estrellas en sitios astronómicos antiguos.' },
    ],
    fact: 'En la década de 1920, la Institución Carnegie financió excavaciones en Chichén Itzá. El arqueólogo Sylvanus Morley dirigió los esfuerzos de excavación de la ciudad.',
  },
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
      hue: Math.random() > 0.5 ? '255,109,0' : '0,200,83', // orange or jade
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

// â”€â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,109,0,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FF6D00','#8D6E63','#FFD600','#29B6F6','#00C853','#D50000','#D7CCC8'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central icon */}
        <path d="M 285 30 L 315 30 L 300 10 Z" fill="none" stroke="#FF6D00" strokeWidth="1.5" opacity="0.6" />
        <path d="M 290 35 L 310 35 L 300 15 Z" fill="none" stroke="#FF6D00" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,109,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,109,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,109,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD600" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">KUKULCÁN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,109,0,0.8)" fontSize="12" fontFamily="monospace" letterSpacing="3">LA SERPIENTE DE LUZ</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,109,0,0.2)'}`,
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
          layoutId="activeDotMayaM2"
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
            <h4 style={{
              color: node.color, fontSize: '1.1rem', margin: '0 0 1rem 0',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={18} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fun Fact Footer â”€â”€â”€ */}
        {node.fact && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}30`,
            borderRadius: '16px',
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '45px', height: '45px', borderRadius: '50%',
              background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, border: `1px solid ${node.color}40`,
            }}>
              <Star size={22} color={node.color} />
            </div>
            <div>
              <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '1rem' }}>Hecho Asombroso</h5>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const percent = Math.round((exploredIds.size / nodes.length) * 100);
  return (
    <div style={{
      width: '100%', maxWidth: '800px', margin: '0 auto 2rem',
      background: 'rgba(10,12,30,0.6)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px',
      padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
      position: 'relative', zIndex: 2,
    }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFD600', width: '45px' }}>{percent}%</span>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: '#FFD600', borderRadius: '3px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {nodes.map((n, i) => (
          <button
            key={i}
            onClick={() => onSelect(n.id)}
            style={{
              width: '12px', height: '12px', borderRadius: '50%',
              border: 'none', cursor: 'pointer', background: exploredIds.has(n.id) ? n.color :'rgba(255,255,255,0.2)',
              boxShadow: exploredIds.has(n.id) ? `0 0 5px ${n.color}` : 'none',
              transition: 'all 0.3s',
            }}
            title={n.title}
          />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  const handleNodeClick = (id) => {
    setActiveNodeId(id);
    setExploredIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#050714',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <TimeTravelHeader />
        
        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onSelect={handleNodeClick} />

        {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        {/* Content Panel */}
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
        {!activeNode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h4 style={{ color: '#FFD600', margin: '0 0 1rem', fontSize: '1rem', letterSpacing: '1px' }}>FUENTES Y BIBLIOGRAFÍA</h4>
            <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              {BIBLIOGRAPHY.map((bib, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{bib}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
