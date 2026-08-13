'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoPyramidBeam({ size = 80, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      <polygon points="40,4 70,72 10,72" fill="none" stroke={color} strokeWidth="2" />
      {/* Beam of light from apex */}
      <line x1="40" y1="4" x2="40" y2="-10" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="40" y1="4" x2="30" y2="-8" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="4" x2="50" y2="-8" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star at top */}
      <circle cx="40" cy="0" r="3" fill={color} opacity="0.5" />
      {/* Internal chamber */}
      <rect x="34" y="40" width="12" height="8" rx="1" fill={color} opacity="0.15" />
      <line x1="40" y1="48" x2="40" y2="72" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Shaft lines */}
      <line x1="37" y1="44" x2="20" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="43" y1="44" x2="60" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function DecoOrionBelt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ opacity: 0.2, ...style }}>
      {/* Three belt stars */}
      <circle cx="15" cy="30" r="4" fill={color} opacity="0.7" />
      <circle cx="35" cy="28" r="5" fill={color} opacity="0.8" />
      <circle cx="55" cy="32" r="4" fill={color} opacity="0.7" />
      {/* Belt line */}
      <line x1="15" y1="30" x2="55" y2="32" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Orion body outline */}
      <circle cx="35" cy="12" r="3" fill={color} opacity="0.4" />
      <line x1="35" y1="15" x2="35" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="18" x2="20" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="18" x2="50" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="22" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="48" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Glow halos */}
      {[{x:15,y:30},{x:35,y:28},{x:55,y:32}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="8" fill={color} opacity="0.08" />
      ))}
    </svg>
  );
}

function DecoCompass({ size = 60, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Cardinal points */}
      <text x="30" y="10" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold" opacity="0.6">N</text>
      <text x="30" y="56" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">S</text>
      <text x="5" y="33" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">W</text>
      <text x="55" y="33" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">E</text>
      {/* Needle */}
      <polygon points="30,12 27,30 30,28 33,30" fill={color} opacity="0.5" />
      <polygon points="30,48 27,30 30,32 33,30" fill={color} opacity="0.2" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarShaft({ size = 70, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 60 72" style={{ opacity: 0.2, ...style }}>
      {/* Shaft / corridor */}
      <rect x="24" y="8" width="12" height="56" rx="2" fill={color} opacity="0.1" stroke={color} strokeWidth="1" />
      {/* Star at top */}
      <circle cx="30" cy="4" r="4" fill={color} opacity="0.6" />
      <circle cx="30" cy="4" r="7" fill={color} opacity="0.15" />
      {/* Light rays going down */}
      <line x1="30" y1="8" x2="30" y2="64" stroke={color} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.3" />
      <line x1="27" y1="10" x2="27" y2="60" stroke={color} strokeWidth="0.3" opacity="0.15" />
      <line x1="33" y1="10" x2="33" y2="60" stroke={color} strokeWidth="0.3" opacity="0.15" />
      {/* Observer eye at bottom */}
      <ellipse cx="30" cy="66" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="66" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoMuon({ size = 60, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Particle tracks */}
      <line x1="10" y1="5" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="8" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="30" x2="15" y2="55" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="30" x2="48" y2="50" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Interaction point */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Particle dots */}
      {[{x:10,y:5},{x:50,y:8},{x:15,y:55},{x:48,y:50}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} opacity="0.5" />
      ))}
    </svg>
  );
}

function DecoStoneBlocks({ size = 80, color = '#D4A843', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.18, ...style }}>
      {/* Stone block rows */}
      <rect x="2" y="36" width="24" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="28" y="36" width="20" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="50" y="36" width="28" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="5" y="25" width="22" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="29" y="25" width="26" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="57" y="25" width="18" height="10" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      <rect x="14" y="14" width="20" height="10" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      <rect x="36" y="14" width="18" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="28" y="4" width="18" height="9" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

function DecoAnkh({ size = 60, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#F0A500', style = {} }) {
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

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'conductos': [DecoPyramidBeam, DecoStarShaft, DecoOrionBelt],'estrellas-laser': [DecoStarShaft, DecoOrionBelt, DecoPyramidBeam],'precision': [DecoCompass, DecoPyramidBeam, DecoStarShaft],'orion-piramides': [DecoOrionBelt, DecoPyramidBeam, DecoCompass],'constructores': [DecoStoneBlocks, DecoAnkh, DecoCompass],
  'scan-pyramids': [DecoMuon, DecoPyramidBeam, DecoStarShaft],
  'temperatura': [DecoPyramidBeam, DecoStoneBlocks, DecoEye],
  'legado-giza': [DecoOrionBelt, DecoAnkh, DecoCompass],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Lehner, M. (1997). The Complete Pyramids, Thames & Hudson',
  'Bauval, R. & Gilbert, A. (1994). The Orion Mystery, Crown',
  'Morishima, K. Et al. (2017). Discovery of a big void in Khufu\'s Pyramid by muon tomography, Nature, 552',
  'Dash, G. (2018). New angles on the Great Pyramid, AERA',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'conductos',
    title: 'Los Conductos Secretos',
    color: '#F0A500',
    btnImage: '/assets/egypt/infographic_m5/btn_conductos.jpg',
    image: '/assets/egypt/infographic_m5/hero_conductos.jpg',
    content: [
      'Dentro de la Gran Pirámide existen cuatro túneles estrechos que salen de la Cámara del Rey y de la Cámara de la Reina. Durante mucho tiempo se pensó que eran conductos de ventilación.',
      'Estos túneles tienen apenas 20 cm de ancho y atraviesan decenas de metros de piedra. Funcionan como tubos que dirigen la mirada hacia puntos específicos del cielo.',
      'Los astrónomos Kate Spence y Robert Bauval calcularon las posiciones estelares en el 2450 a.C. Y descubrieron que cada conducto apuntaba directamente a una estrella. Eran telescopios de piedra.',
      'Los constructores diseñaron cada conducto con un ángulo preciso. Desde la cámara interior, una persona podía ver una estrella específica a través del túnel.',
      'Las simulaciones astronómicas modernas confirman estas alineaciones. Los conductos servían como canales de comunicación entre el faraón en el interior y los dioses en las estrellas.',
    ],
    fact: 'Los conductos miden 20 Ã— 20 cm y atraviesan más de 60 metros de piedra manteniendo un ángulo constante. Una desviación de 1 grado habría impedido apuntar a la estrella objetivo. Los ingenieros egipcios mantuvieron esta precisión durante la construcción.',
  },
  {
    id: 'estrellas-laser',
    title: 'El Láser Estelar',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_m5/btn_estrellas-laser.jpg',
    image: '/assets/egypt/infographic_m5/hero_estrellas-laser.jpg',
    content: [
      'Cada conducto apuntaba a una estrella distinta para ayudar al faraón en su viaje tras la muerte. Para los egipcios, morir marcaba el inicio de un camino hacia las estrellas.',
      'El conducto norte de la Cámara del Rey apuntaba hacia Thuban, la Estrella Polar en el 2450 a.C. En esa época, Thuban era el centro alrededor del cual giraba el cielo nocturno.',
      'El conducto sur de la Cámara del Rey apuntaba a Alnitak, estrella del Cinturón de Orión. Orión representaba a Osiris, dios de la resurrección, y el conducto era el camino hacia él.',
      'El conducto sur de la Cámara de la Reina apuntaba a Sirio, la estrella asociada a la diosa Isis. Su aparición anual indicaba el comienzo de la inundación del Nilo y el Año Nuevo.',
      'El conducto norte de la Cámara de la Reina apuntaba a Kochab, en la Osa Menor. Juntos, los conductos formaban un mapa cósmico que abarcaba el norte, sur, Osiris e Isis.',
    ],
    fact: 'Thuban fue la estrella polar durante más de 2,000 años. Debido al fenómeno de precesión, el eje de la Tierra gira lentamente. Esto causa que distintas estrellas ocupen la posición de estrella polar con el tiempo.',
  },
  {
    id: 'precision',
    title: 'Precisión Imposible',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_m5/btn_precision.jpg',
    image: '/assets/egypt/infographic_m5/hero_precision.jpg',
    content: [
      'Los egipcios lograron esta precisión astronómica sin instrumentos modernos. Utilizaron un método que requería observar dos estrellas y usar una cuerda con peso.',
      'La astrónoma Kate Spence sugiere que observaban las estrellas Mizar y Kochab. Cuando ambas se alineaban verticalmente en la noche, marcaban el Norte verdadero con un error mínimo.',
      'El error era de solo 2 minutos de arco, aproximadamente una quinceava parte del ancho de la Luna. Podían orientar estructuras hacia el cielo con gran exactitud usando herramientas básicas.',
      'El instrumento principal se llamaba "merkhet"y consistía en una plomada. Al alinear dos merkhets con una estrella, determinaban el meridiano. Otro instrumento, el"bay", servía para apuntar.',
      'La base de la Gran Pirámide mide 230.4 metros de lado. La diferencia entre el lado más largo y el más corto es de 4.4 centímetros. Construyeron un edificio de 147 metros de alto con un margen de error casi nulo.',
    ],
    fact: 'Los cuatro lados de la Gran Pirámide están orientados hacia los puntos cardinales con un error de 3 minutos de arco. Al terminar la construcción (ca. 2450 a.C.), ese error probablemente era cero. La pequeña desviación se debe a la precesión terrestre.',
  },
  {
    id: 'orion-piramides',
    title: 'Orión en la Tierra',
    color: '#9B6BFF',
    btnImage: '/assets/egypt/infographic_m5/btn_orion-piramides.jpg',
    image: '/assets/egypt/infographic_m5/hero_orion-piramides.jpg',
    content: [
      'Las tres pirámides de Guiza no están en línea recta. Las pirámides de Keops y Kefrén están alineadas, pero la de Micerinos está desplazada hacia un lado.',
      'El ingeniero Robert Bauval propuso que las pirámides imitan la disposición de las estrellas del Cinturón de Orión. Dos estrellas están alineadas y la tercera está desplazada.',
      'La teoría sugiere que los egipcios construyeron una representación del cielo. Orión representaba a Osiris, y la Vía Láctea representaba el Nilo. Las pirámides conectaban la tierra con las estrellas.',
      'Esta correlación es debatida. Sin embargo, el conducto sur de la Cámara del Rey apunta hacia Alnitak en el Cinturón de Orión, mostrando la importancia astronómica del sitio.',
      'Los constructores de Guiza integraron sus conocimientos astronómicos en la arquitectura. Las pirámides funcionaban como monumentos diseñados para conectar el mundo terrenal con el celeste.',
    ],
    fact: 'El nombre egipcio de Orión era "Sah", manifestación celestial de Osiris. Cuando Orión reaparecía tras 70 días de invisibilidad, los sacerdotes celebraban su renacimiento. Este periodo coincide con los 70 días del proceso de momificación.',
  },
  {
    id: 'constructores',
    title: 'Los Constructores',
    color: '#FF7043',
    btnImage: '/assets/egypt/infographic_m5/btn_constructores.jpg',
    image: '/assets/egypt/infographic_m5/hero_constructores.jpg',
    content: [
      'La evidencia arqueológica indica que los constructores de las pirámides no eran esclavos. Eran obreros asalariados organizados en equipos con tareas específicas.',
      'Los papiros y marcas en las piedras revelan que trabajaban por turnos. Tenían días de descanso, buena alimentación y atención médica. Algunos equipos se llamaban "Los Amigos de Keops".',
      'Los esqueletos hallados en el cementerio de trabajadores muestran huesos sanados tras fracturas. Los médicos egipcios trataban sus lesiones, indicando que eran trabajadores valorados.',
      'El arquitecto jefe fue Hemiunu, sobrino del faraón Keops. Coordinaba a miles de trabajadores, ingenieros y materiales de construcción durante décadas.',
      'El papiro de Wadi el-Jarf detalla cómo transportaban bloques de granito desde Asuán, a 800 km de distancia. Usaban barcazas en el Nilo capaces de cargar 60 toneladas.',
    ],
    fact: 'La Gran Pirámide tiene 2.3 millones de bloques de piedra caliza, con un peso promedio de 2.5 toneladas cada uno. Los bloques de granito de las cámaras internas pesan hasta 80 toneladas.',
  },
  {
    id: 'scan-pyramids',
    title: 'Muones Cósmicos',
    color: '#4FC3F7',
    btnImage: '/assets/egypt/infographic_m5/btn_scan-pyramids.jpg',
    image: '/assets/egypt/infographic_m5/hero_scan-pyramids.jpg',
    content: [
      'En 2015, el proyecto ScanPyramids utilizó partículas subatómicas para analizar las pirámides de Guiza. Los muones cósmicos permitieron escanear el interior de la pirámide sin perforar la piedra.',
      'Los muones se crean cuando los rayos cósmicos chocan con la atmósfera terrestre. Atraviesan objetos pero se frenan en materiales densos como la piedra.',
      'Funciona como una radiografía: los muones atraviesan la pirámide y los detectores miden cuántos logran pasar. Si hay más muones en una zona, indica un espacio vacío.',
      'En 2017, los científicos hallaron una cavidad de 30 metros de largo sobre la Gran Galería. Este espacio había permanecido oculto durante 4,500 años y su función es desconocida.',
      'ScanPyramids también usó termografía infrarroja y fotogrametría 3D. La termografía reveló zonas en la cara norte de la pirámide con variaciones de calor, sugiriendo espacios no descubiertos.',
    ],
    fact: 'Cada minuto, unos 10,000 muones atraviesan cada metro cuadrado. Los científicos de ScanPyramids colocaron detectores en la pirámide durante meses para contar los muones y crear un mapa interno.',
  },
  {
    id: 'temperatura',
    title: 'La Pirámide Termo',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_m5/btn_temperatura.jpg',
    image: '/assets/egypt/infographic_m5/hero_temperatura.jpg',
    content: [
      'La Gran Pirámide mantiene una temperatura constante de 20°C en su interior. Esto ocurre independientemente de las condiciones climáticas del exterior.',
      'La masa de piedra actúa como amortiguador térmico. Las toneladas de piedra caliza absorben el calor del día lentamente y lo liberan durante la noche.',
      'La temperatura estable preserva objetos antiguos sin secarlos ni generar humedad. Papiros, telas de lino y ofrendas se conservarían en condiciones ideales.',
      'La termografía infrarroja encontró anomalías térmicas en la cara norte. Algunos bloques presentan diferencias de calor, lo que sugiere la existencia de corredores ocultos por donde circula el aire.',
      'La pirámide está situada en el vértice del delta del Nilo. Su ubicación permite observar cómo el río se divide en brazos hacia el mar. Los científicos estudian si esta posición fue intencional.',
    ],
    fact: 'La base de la pirámide cubre 5.3 hectáreas y pesa 6.5 millones de toneladas. La estructura entera emplea millones de bloques de piedra colocados con precisión.',
  },
  {
    id: 'legado-giza',
    title: 'El Legado Eterno',
    color: '#AB47BC',
    btnImage: '/assets/egypt/infographic_m5/btn_legado-giza.jpg',
    image: '/assets/egypt/infographic_m5/hero_legado-giza.jpg',
    content: [
      'La Gran Pirámide fue el edificio más alto del mundo durante 3,800 años, hasta que la catedral de Lincoln la superó en el 1311 d.C.',
      'El conocimiento astronómico egipcio llegó al Mediterráneo a través de comerciantes fenicios. La astronomía antigua se nutrió de la observación y geometría de Guiza.',
      'Las catedrales medievales heredaron la orientación astronómica. Sus rosetones y naves se alinean para dirigir la luz del sol, continuando una tradición originada en Egipto.',
      'La Gran Pirámide es la única de las Siete Maravillas del Mundo Antiguo que sigue en pie. Ha resistido milenios de erosión e historia.',
      'El mensaje de Guiza muestra la unión entre ingeniería y religión. Las alineaciones estelares de las pirámides reflejan el estudio de los astros en la antigüedad.',
    ],
    fact: 'La Gran Pirámide es la maravilla más antigua. El Faro de Alejandría, la segunda más duradera, se derrumbó en el siglo XIV. La pirámide ha sobrevivido 4,500 años y sigue siendo un monumento central en la historia humana.',
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
        ctx.fillStyle = `rgba(240, 165, 0, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Giza Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function GizaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(240,165,0,0.3))' }}>
        {/* Three pyramid silhouettes */}
        <polygon points="200,100 260,35 320,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2" opacity="0.5" />
        <polygon points="260,100 330,20 400,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2.5" />
        <polygon points="340,100 380,50 420,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2" opacity="0.5" />
        {/* Laser beams from pyramid tops */}
        {[{x:260,y:35},{x:330,y:20},{x:380,y:50}].map((p,i) => (
          <g key={i}>
            <motion.line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 15}
              stroke="#F0A500" strokeWidth="1.5" strokeLinecap="round"
              animate={{ opacity: [0.2, 0.8, 0.2], y2: [p.y - 12, p.y - 18, p.y - 12] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle cx={p.x} cy={p.y - 16} r="2.5" fill="#FFD700"
              animate={{ opacity: [0.3, 1, 0.3], r: [2, 3, 2] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}
            />
          </g>
        ))}
        {/* Orion belt stars above */}
        {[{x:270,y:6},{x:330,y:4},{x:390,y:8}].map((s,i) => (
          <motion.circle key={`star${i}`} cx={s.x} cy={s.y} r="3" fill="#F0A500"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #F0A500)' }}
          />
        ))}
        {/* Connection lines: stars to pyramids */}
        <line x1="270" y1="6" x2="260" y2="35" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="330" y1="4" x2="330" y2="20" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="390" y1="8" x2="380" y2="50" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <defs>
          <linearGradient id="gizaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(240,165,0,0.2)" />
            <stop offset="50%" stopColor="rgba(240,165,0,0.9)" />
            <stop offset="100%" stopColor="rgba(240,165,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#F0A500" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LÁSER DE GIZA</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(240,165,0,0.6)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">LA GRAN PIRÁMIDE · CIRCA 2450 A.C.</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(240,165,0,0.2)'}`,
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
        <motion.div layoutId="activeDotM5"
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
        background: 'rgba(15, 12, 5, 0.92)', backdropFilter: 'blur(24px)',
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
      border: '1px solid rgba(240,165,0,0.15)',
    }}>
      <Star size={14} style={{ color: '#F0A500', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4880A, #F0A500)', borderRadius: '3px', boxShadow: '0 0 8px rgba(240,165,0,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F0A500', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,15,5,0.88) 0%, rgba(35,25,10,0.82) 40%, rgba(20,15,5,0.90) 100%), url(/assets/egypt/infographic_giza/bg_giza.png)',
      backgroundSize: 'cover', backgroundPosition: 'center center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(240,165,0,0.12)',
      boxShadow: '0 0 60px rgba(15,10,0,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />
      <GizaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(240,165,0,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(240,165,0,0.08)', borderRadius: '16px',
              border: '1px solid rgba(240,165,0,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#F0A500', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ”º ¡Has descubierto todos los secretos del Láser de Giza!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Constructor Estelar
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