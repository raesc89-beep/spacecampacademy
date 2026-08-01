'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya E-Group themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoEGroup({ size = 70, color = '#A1887F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="25" width="15" height="15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <rect x="40" y="15" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="40" y="30" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="40" y="45" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="25" y1="32.5" x2="40" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="25" y1="32.5" x2="40" y2="35" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="25" y1="32.5" x2="40" y2="50" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

function DecoSunrise({ size = 70, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 40 Q 30 20 50 40" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="35" r="8" fill={color} opacity="0.6" />
      {[0, 30, 60, 90, 120, 150, 180].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 12 * Math.cos(rad)} y1={35 - 12 * Math.sin(rad)} x2={30 + 18 * Math.cos(rad)} y2={35 - 18 * Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.7" />;
      })}
      <line x1="5" y1="40" x2="55" y2="40" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoThreeTemples({ size = 70, color = '#5D4037', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 15 45 L 20 30 L 25 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 28 45 L 33 25 L 38 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 41 45 L 46 30 L 51 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <line x1="10" y1="45" x2="55" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="25" r="2" fill={color} />
      <circle cx="33" cy="20" r="2" fill={color} />
      <circle cx="46" cy="25" r="2" fill={color} />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 15 L 10 45 L 50 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 25 22 L 35 22" stroke={color} strokeWidth="1.5" />
      <path d="M 20 30 L 40 30" stroke={color} strokeWidth="1.5" />
      <path d="M 15 37 L 45 37" stroke={color} strokeWidth="1.5" />
      <rect x="27" y="10" width="6" height="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCompass({ size = 70, color = '#039BE5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 30 12 L 34 30 L 30 48 L 26 30 Z" fill={color} opacity="0.5" />
      <path d="M 12 30 L 30 26 L 48 30 L 30 34 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'uaxactun-sitio': [DecoPyramid, DecoCompass, DecoEGroup],
  'grupo-e-original': [DecoEGroup, DecoSunrise, DecoThreeTemples],'tres-templos': [DecoThreeTemples, DecoSunrise, DecoPyramid],'funcionamiento-solar': [DecoSunrise, DecoCompass, DecoEGroup],
  'grupos-e-mundo-maya': [DecoCompass, DecoPyramid, DecoThreeTemples],'ceibal-mas-antiguo': [DecoPyramid, DecoEGroup, DecoSunrise],
  'legado-arquitectonico': [DecoThreeTemples, DecoCompass, DecoEGroup], }; const BIBLIOGRAPHY = ['Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Chase, A.F. & Chase, D.Z. (1995). "External Impetus, Internal Synthesis, and Standardization: E Group Assemblages", Acta Mesoamericana, 8',
  'Inomata, T. et al. (2013). "Early Ceremonial Constructions at Ceibal, Guatemala", Science, 340',
  'Aimers, J.J. & Rice, P.M. (2006). "Astronomy, Ritual, and the Interpretation of Maya E-Group Architectural Assemblages", Ancient Mesoamerica, 17',
  'Å prajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica, INAH',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'uaxactun-sitio',
    title: 'El Sitio: Uaxactún',
    color: '#A1887F',
    btnImage: '/assets/maya/infographic_m13/btn_uaxactun-sitio.jpg',
    image: '/assets/maya/infographic_m13/hero_uaxactun-sitio.jpg',
    content: [
      'Imagina una ciudad antigua oculta en la selva. Uaxactún, ubicada en Petén, Guatemala, es uno de los asentamientos más antiguos de la civilización maya. Sus constructores levantaron edificios desde el período Preclásico (900 a.C.). Usaban herramientas de piedra y conocimientos matemáticos para diseñar su entorno.',
      "El nombre fue dado en 1920 por Sylvanus Morley. Encontró una estela que marcaba el 'Baktún 8', así que combinó 'Uaxac' (ocho) y 'Tún' (piedra). Así nació 'Ocho Piedras'. Su nombre original podría haber sido Siaan K'aan, que significa 'Nacida del Cielo'.",
      'Durante siglos, Uaxactún fue un reino poderoso que compitió con la ciudad de Tikal, ubicada a 23 kilómetros. En el siglo IV, esta rivalidad culminó en un conflicto liderado por Tikal. Esto marcó la política maya de las tierras bajas.',
      'Uaxactún destacó por su conocimiento astronómico. Sus plazas y edificios interactuaban de forma perfecta con el sol, las estrellas y las estaciones. Eran maestros del espacio y el tiempo, organizando la ciudad para la observación.',
      'Su mayor logro fue la creación de un conjunto arquitectónico que funcionaba como laboratorio astronómico. Este complejo permitía a los sacerdotes saber con precisión cuándo sembrar, cosechar y realizar festivales. Se convirtió en un modelo copiado por muchas ciudades.',
    ],
    expandables: [
      {
        label: '¿Sabías que...?',
        icon: 'clock',
        text: 'En Uaxactún se descubrió una de las primeras pinturas al fresco del mundo maya, mostrando escenas cortesanas. También tiene arquitectura preclásica que prueba el genio de sus constructores.',
      },
      {
        label: 'Dato Astronómico',
        icon: 'atom',
        text: 'Los observatorios mayas no usaban lentes. Miraban el horizonte al amanecer o atardecer para medir los cambios de posición de los astros a simple vista.',
      },
    ],
    fact: 'Uaxactún tuvo ocupación continua desde el 900 a.C. Hasta el 900 d.C. Casi 2000 años. En comparación, muchos países modernos apenas tienen cientos de años.',
  },
  {
    id: 'grupo-e-original',
    title: 'El Grupo E Original',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m13/btn_grupo-e-original.jpg',
    image: '/assets/maya/infographic_m13/hero_grupo-e-original.jpg',
    content: [
      'En 1924, el arqueólogo Frans Blom cartografió Uaxactún y nombró los conjuntos de edificios con letras. Al llegar a una plaza con cuatro estructuras, la llamó "Grupo E".',
      'Blom notó una alineación particular. Había una pirámide al oeste y una plataforma al este con tres templos. Descubrió que los edificios marcaban las salidas del sol en solsticios y equinoccios.',
      'El Grupo E era un reloj solar gigante. Para los mayas, la arquitectura era su telescopio. El diseño mostraba ángulos exactos entre la pirámide y los templos.',
      'Este hallazgo hizo que el "Grupo E"se convirtiera en un término arqueológico oficial. Si se encuentra un complejo similar con pirámide al oeste y plataforma al este, se clasifica como"Complejo Tipo Grupo E".',
      'Esta revelación demostró que las ciudades mayas estaban planificadas matemáticamente desde sus inicios. No solo construían edificios, sino instrumentos astronómicos habitables.',
    ],
    expandables: [
      {
        label: 'En la Arqueología',
        icon: 'clock',
        text: 'Frans Blom también exploró Palenque y Chiapas. Junto a Oliver La Farge, realizó expediciones que revelaron ciudades mayas ocultas en la selva.',
      },
      {
        label: 'Mecánica del Observatorio',
        icon: 'atom',
        text: 'El Grupo E transforma el movimiento de la Tierra en el movimiento visible del sol. Desde la pirámide oeste, el sol parece moverse a lo largo de los templos orientales.',
      },
    ],
    fact: 'El Grupo E era centro de ceremonias públicas. Los sacerdotes observaban el sol naciente frente a multitudes, uniendo ciencia y religión.',
  },
  {
    id: 'tres-templos',
    title: 'Los Tres Templos',
    color: '#F8BBD0',
    btnImage: '/assets/maya/infographic_m13/btn_tres-templos.jpg',
    image: '/assets/maya/infographic_m13/hero_tres-templos.jpg',
    content: [
      'En la Plaza del Grupo E, una plataforma este soporta tres edificios: las Estructuras E-I, E-II y E-III. Funcionaban como miras astronómicas de piedra.',
      'El templo norte marca el solsticio de verano, el 21 de junio. Un observador en la pirámide oeste vería al sol salir detrás de este templo. Anunciaba el punto máximo del ciclo cálido.',
      'El templo central marca los equinoccios de marzo y septiembre, días en que la luz y la oscuridad duran lo mismo. El sol sale por el centro de este edificio.',
      'El templo sur marca el solsticio de invierno, alrededor del 21 de diciembre. A partir de esa fecha, los días comienzan a alargarse de nuevo.',
      'Los constructores crearon un marco para el recorrido del sol. El sol se mueve de un templo a otro a lo largo del año, usando el horizonte oriental como pantalla.',
    ],
    expandables: [
      {
        label: 'Geometría Exacta',
        icon: 'atom',
        text: 'La distancia entre la pirámide y los templos requería matemáticas complejas. Los arquitectos calcularon la amplitud angular del movimiento solar para espaciar los templos.',
      },
      {
        label: '¿Sabías que...?',
        icon: 'clock',
        text: 'En su apogeo, estos templos estaban cubiertos de estuco y pintados de rojo. El sol brillante coronaba edificios rojos en medio de la selva.',
      },
    ],
    fact: 'El diseño de tres templos se volvió sagrado e influyó en otros edificios. En su religión, la creación del mundo se marcaba con tres piedras celestiales, el Fogón de la Creación.',
  },
  {
    id: 'funcionamiento-solar',
    title: 'Cómo Funciona',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m13/btn_funcionamiento-solar.jpg',
    image: '/assets/maya/infographic_m13/hero_funcionamiento-solar.jpg',
    content: [
      'Imagina ser un astrónomo maya. Te sitúas en la Estructura E-VII-sub, una pirámide al oeste de la plaza. Te preparas al amanecer para observar el horizonte oriental.',
      'Desde la cima, miras la plataforma con los tres templos. Registras en qué punto sale el sol cada día a lo largo de los meses.',
      'La salida del sol se desplaza por el horizonte. En junio, amanece en el templo norte. En septiembre, en el templo central, y en diciembre, en el templo sur.',
      'Este viaje marca el ciclo solar. El Grupo E anunciaba fechas importantes para la agricultura, indicando el inicio de las lluvias y el tiempo de siembra.',
      'El sistema dependía del punto de vista. El observador debía estar en el eje de la pirámide oeste. La arquitectura guiaba a los astrónomos al punto exacto para la medición.',
    ],
    expandables: [
      {
        label: 'Calendario Agrícola',
        icon: 'clock',
        text: 'Construir el Grupo E aseguraba la producción de alimentos. Conocer el momento exacto para sembrar antes de las lluvias evitaba la hambruna.',
      },
      {
        label: 'Ilusión de Movimiento',
        icon: 'clock',
        text: 'Aunque vemos al sol moverse, es la Tierra la que orbita. Los mayas midieron el resultado visible de esta mecánica celeste sin tecnología moderna.',
      },
    ],
    fact: 'Estudios de arqueólogos como Ivan Šprajc muestran que los Grupos E también marcaban fechas agrarias importantes, como el 20 de febrero o el 30 de abril.',
  },
  {
    id: 'grupos-e-mundo-maya',
    title: 'Grupos E en el Mundo Maya',
    color: '#039BE5',
    btnImage: '/assets/maya/infographic_m13/btn_grupos-e-mundo-maya.jpg',
    image: '/assets/maya/infographic_m13/hero_grupos-e-mundo-maya.jpg',
    content: [
      'El diseño del Grupo E se replicó en Mesoamérica. Los arqueólogos han descubierto más de 100 de estos complejos astronómicos en la región.',
      'Se encuentran en Chiapas, Guatemala y Belice. Todos tienen una estructura de observación al poniente y una plataforma al oriente, siendo un diseño estandarizado.',
      'Con el crecimiento de las dinastías en el Período Clásico, el significado cambió. Ciudades como Tikal construyeron Grupos E que ya no apuntaban a los solsticios con exactitud.',
      'Estos Grupos E tardíos pasaron de ser observatorios a escenarios rituales. Servían para conectar a los reyes con el poder del sol y afirmar su autoridad.',
      'La estandarización demuestra la conexión entre las ciudades mayas. Eran una red de arquitectos que compartían diseños, probando su unidad cultural.',
    ],
    expandables: [
      {
        label: 'Sitios Emblemáticos',
        icon: 'atom',
        text: 'Se han encontrado Grupos E en Nakbé, El Mirador y Caracol. Muchos siguen ocultos en la selva, descubiertos ahora por tecnología LIDAR.',
      },
      {
        label: '¿Sabías que...?',
        icon: 'atom',
        text: 'Que distintos reinos independientes construyeran los mismos complejos astronómicos es un misterio de la arqueología que demuestra su gran cohesión cultural.',
      },
    ],
    fact: 'Aguada Fénix en Tabasco, anterior al 1000 a.C., presenta una plataforma orientada este-oeste. Esto indica que la importancia de las alineaciones solares es más antigua de lo pensado.',
  },
  {
    id: 'ceibal-mas-antiguo',
    title: 'Ceibal: El Más Antiguo',
    color: '#5D4037',
    btnImage: '/assets/maya/infographic_m13/btn_ceibal-mas-antiguo.jpg',
    image: '/assets/maya/infographic_m13/hero_ceibal-mas-antiguo.jpg',
    content: [
      'Por mucho tiempo se creyó que Uaxactún fue el primer Grupo E. Sin embargo, excavaciones recientes en Ceibal cambiaron la historia en 2013.',
      'Bajo las pirámides de Ceibal, hallaron un complejo Grupo E que data del 1000 a 950 a.C. Es más antiguo que Uaxactún y los centros olmecas como La Venta.',
      'En el 950 a.C. Ceibal tenía montículos de tierra con templos de madera. Aunque los materiales eran sencillos, la matemática de las alineaciones ya estaba presente.',
      'La observación del sol comenzó antes de que los mayas construyeran bóvedas de piedra. La planificación astronómica fue el primer proyecto comunitario maya.',
      'Este descubrimiento sugiere que las ideas astronómicas surgieron de comunidades interactuando y experimentando. El Grupo E fue el resultado de generaciones de observaciones.',
    ],
    expandables: [
      {
        label: 'Cita en la Ciencia',
        icon: 'atom',
        text: 'La investigación en Ceibal fue liderada por Takeshi Inomata y publicada en "Science". Dataciones de radiocarbono probaron los orígenes tempranos del complejo.',
      },
      {
        label: 'De Tierra a Piedra',
        icon: 'clock',
        text: 'Los mayas comenzaron construyendo con tierra compactada. Siglos después, aprendieron a revestir los edificios masivos con bloques de piedra cortada.',
      },
    ],
    fact: 'En la plaza temprana de Ceibal, se encontraron hachas de jadeíta enterradas en forma de cruz. El jade tuvo que ser importado, demostrando la riqueza del centro.',
  },
  {
    id: 'legado-arquitectonico',
    title: 'El Legado de los Grupos E',
    color: '#283593',
    btnImage: '/assets/maya/infographic_m13/btn_legado-arquitectonico.jpg',
    image: '/assets/maya/infographic_m13/hero_legado-arquitectonico.jpg',
    content: [
      'Al estudiar los Grupos E, los científicos concluyen que los mayas fueron astrónomos rigurosos desde sus orígenes. Su pensamiento empírico rivaliza con otras civilizaciones antiguas.',
      'Los mayas construyeron plazas ceremoniales para comprender los ritmos universales. Era un proyecto científico monumental para su tiempo.',
      'No separaron la ciencia del arte y la comunidad. El Grupo E era un lugar de encuentro donde se unían ciencia y religión frente a la sociedad.',
      'La tecnología LIDAR sigue revelando Grupos E ocultos bajo la selva. Esto confirma la importancia de este diseño en las ciudades mayas.',
      'El Grupo E muestra cómo la humanidad busca medir el tiempo y comprender el cielo para asegurar la supervivencia agrícola y cultural.',
    ],
    expandables: [
      {
        label: 'Alineaciones Complejas',
        icon: 'clock',
        text: 'Mediciones recientes indican que las alineaciones también marcaban fechas críticas de la siembra y eventos lunares, revelando una gran profundidad científica.',
      },
      {
        label: '¿Sabías que...?',
        icon: 'clock',
        text: 'Urbanistas contemporáneos en Latinoamérica integran ejes solares en parques y plazas. Es un tributo al ingenio arquitectónico prehispánico.',
      },
    ],
    fact: 'Los mayas dominaron la ingeniería con el uso de morteros de cal y el cálculo de la luz antes de construir sus majestuosos templos.',
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
      hue: Math.random() > 0.5 ? '161,136,127' : '255,143,0', // earth or sunrise orange
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,143,0,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#A1887F','#2E7D32','#F8BBD0','#FF8F00','#039BE5','#5D4037','#283593'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF8F00" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF8F00" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FF8F00" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FF8F00" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,143,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,143,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,143,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF8F00" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">UAXACTÚN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,143,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GRUPO E: EL OBSERVATORIO SOLAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,143,0,0.2)'}`,
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
      display: 'flex',
      flexDirection: 'column',
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
        background: 'rgba(10, 12, 10, 0.92)',
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
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={16} /> Profundizar en el Tema
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem',
          background: `linear-gradient(90deg, ${node.color}20, transparent)`,
          borderLeft: `4px solid ${node.color}`,
          padding: '1.2rem 1.5rem',
          borderRadius: '0 12px 12px 0',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          position: 'relative', zIndex: 2,
        }}>
          <Star size={24} style={{ color: node.color, flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Dato Curioso
            </h5>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
              "{node.fact}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds }) {
  const progress = (exploredIds.size / nodes.length) * 100;
  
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '4px', background: 'rgba(255,255,255,0.1)',
      zIndex: 10,
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #FF8F00, #F8BBD0)',
          boxShadow: '0 0 10px rgba(255,143,0,0.5)',
        }}
      />
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographicMayaM13() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const handleNodeClick = (node) => {
    if (activeNode?.id === node.id) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
      setExplored(prev => new Set(prev).add(node.id));
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div ref={containerRef} style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto',
      background: '#040614', color: '#fff',
      borderRadius: '24px', overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
    }}>
      <TemporalField />
      <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={explored} />

      <div style={{ padding: '3rem 2rem 2rem', position: 'relative', zIndex: 1 }}>
        <MayaHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '1.5rem', marginTop: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              index={i}
              node={node}
              isActive={activeNode?.id === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        {/* Active Node Content */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Start Prompt */}
        <AnimatePresence>
          {!activeNode && explored.size === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                textAlign: 'center', marginTop: '3rem',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(90deg)', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Selecciona un nodo para explorar el observatorio
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{
          marginTop: '4rem', padding: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.2)', borderRadius: '12px',
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes de Referencia
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
