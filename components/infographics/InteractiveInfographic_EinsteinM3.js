'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (General Relativity themed) ————————————————————
function DecoCurvatureGrid({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Curved spacetime grid */}
      <path d="M5 15 Q30 25 55 15" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M5 25 Q30 40 55 25" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M5 35 Q30 50 55 35" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M15 5 Q25 30 15 55" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 5 Q40 30 30 55" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M45 5 Q35 30 45 55" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Mass causing depression */}
      <circle cx="30" cy="32" r="5" fill={color} opacity="0.3" />
      <circle cx="30" cy="32" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoEclipse({ size = 70, color = '#C4922E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sun corona */}
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Moon disc */}
      <circle cx="30" cy="30" r="12" fill="#0a0a1a" opacity="0.8" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Corona rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 14 * Math.cos(rad)} y1={30 + 14 * Math.sin(rad)} x2={30 + 22 * Math.cos(rad)} y2={30 + 22 * Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />;
      })}
      {/* Deflected starlight */}
      <path d="M8 12 Q20 20 26 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoGravWave({ size = 80, color = '#3A5280', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.22, ...style }}>
      {/* Gravitational wave ripples */}
      <path d="M5 20 Q15 8 25 20 Q35 32 45 20 Q55 8 65 20 Q75 32 80 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M5 20 Q15 12 25 20 Q35 28 45 20 Q55 12 65 20 Q75 28 80 20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Merging bodies */}
      <circle cx="40" cy="17" r="2.5" fill={color} opacity="0.6" />
      <circle cx="40" cy="23" r="2.5" fill={color} opacity="0.6" />
      {/* Spiral path */}
      <path d="M36 14 Q40 12 44 14" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M36 26 Q40 28 44 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoBlackHole({ size = 70, color = '#1E2D52', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Accretion disc */}
      <ellipse cx="30" cy="30" rx="24" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="30" cy="30" rx="20" ry="6" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Event horizon */}
      <circle cx="30" cy="30" r="8" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.7" />
      {/* Photon ring */}
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Jet */}
      <line x1="30" y1="18" x2="30" y2="4" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="30" y1="42" x2="30" y2="56" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function DecoSatellite({ size = 70, color = '#4A6694', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Satellite body */}
      <rect x="24" y="24" width="12" height="12" rx="2" fill={color} opacity="0.4" />
      {/* Solar panels */}
      <rect x="6" y="26" width="16" height="8" rx="1" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <rect x="38" y="26" width="16" height="8" rx="1" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Panel lines */}
      <line x1="10" y1="26" x2="10" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="14" y1="26" x2="14" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="18" y1="26" x2="18" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="42" y1="26" x2="42" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="46" y1="26" x2="46" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="50" y1="26" x2="50" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Antenna */}
      <line x1="30" y1="24" x2="30" y2="14" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="12" r="2" fill={color} opacity="0.4" />
      {/* Signal waves */}
      <path d="M26 10 Q30 6 34 10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoTensor({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* Gμν stylized */}
      <text x="8" y="28" fill={color} fontSize="18" fontWeight="bold" fontFamily="serif" opacity="0.4">Gμν</text>
      {/* Equals and tensor */}
      <text x="42" y="28" fill={color} fontSize="14" fontFamily="serif" opacity="0.35">= 8πT</text>
      {/* Floating indices */}
      <circle cx="60" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="64" cy="18" r="1" fill={color} opacity="0.4" />
      <circle cx="5" cy="8" r="1" fill={color} opacity="0.3" />
      {/* Curved spacetime hint */}
      <path d="M5 38 Q20 32 35 38 Q50 44 65 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'pensamiento-feliz': [DecoCurvatureGrid, DecoTensor, DecoEclipse],
  'gravedad-geometria': [DecoCurvatureGrid, DecoBlackHole, DecoGravWave],
  'ecuaciones-campo': [DecoTensor, DecoCurvatureGrid, DecoEclipse],
  'eclipse-1919': [DecoEclipse, DecoCurvatureGrid, DecoTensor],
  'ondas-gravitacionales': [DecoGravWave, DecoBlackHole, DecoCurvatureGrid],
  'agujeros-negros': [DecoBlackHole, DecoGravWave, DecoEclipse],
  'gps-vida-cotidiana': [DecoSatellite, DecoCurvatureGrid, DecoTensor],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Isaacson, W. (2007). Einstein: His Life and Universe, Simon & Schuster',
  'Misner, C.W., Thorne, K.S. & Wheeler, J.A. (1973). Gravitation, W.H. Freeman',
  'Abbott, B.P. et al. (2016). Observation of Gravitational Waves from a Binary Black Hole Merger, Physical Review Letters, 116(6)',
  'Kennefick, D. (2019). No Shadow of a Doubt: The 1919 Eclipse That Confirmed Einstein\'s Theory of Relativity, Princeton University Press',
  'Schwarzschild, K. (1916). Über das Gravitationsfeld eines Massenpunktes nach der Einsteinschen Theorie, Sitzungsberichte der Königlich Preußischen Akademie der Wissenschaften',
  'The Event Horizon Telescope Collaboration (2019). First M87 Event Horizon Telescope Results, The Astrophysical Journal Letters, 875(1)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'pensamiento-feliz',
    title: 'El Pensamiento Más Feliz',
    color: '#2C3E6B',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_pensamiento-feliz.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_pensamiento-feliz.jpg',
    content: [
      'En 1907, Albert Einstein trabajaba en la Oficina de Patentes de Berna, Suiza, cuando tuvo lo que él mismo describió como "la idea más feliz de mi vida". Imaginó a una persona cayendo libremente desde el techo de un edificio. Durante la caída, esa persona no sentiría su propio peso: los objetos que soltara flotarían a su lado, como si la gravedad hubiera desaparecido. Esta observación mental aparentemente simple contenía la semilla de una revolución científica que tardaría ocho años más en madurar, pero que cambiaría para siempre nuestra comprensión del universo y de la fuerza que nos mantiene en la Tierra.',
      'Lo que Einstein comprendió fue el Principio de Equivalencia: no hay forma experimental de distinguir entre estar en caída libre en un campo gravitatorio y flotar en el espacio exterior, lejos de cualquier masa. De la misma manera, no hay diferencia física entre estar de pie en la superficie de la Tierra y estar dentro de un cohete que acelera a 9.8 metros por segundo al cuadrado en el espacio profundo. La gravedad y la aceleración producen efectos idénticos. Este principio se ha verificado con una precisión de una parte en diez billones mediante experimentos como el satélite MICROSCOPE de la Agencia Espacial Europea, lanzado en 2016.',
      'Isaac Newton había descrito la gravedad en 1687 como una fuerza que actúa instantáneamente a distancia entre dos masas. Pero esta descripción tenía un problema que el propio Newton reconoció: ¿cómo puede una fuerza actuar a través del espacio vacío sin ningún medio que la transmita? Newton nunca pudo resolver esta pregunta y la llamó su "gran vergüenza". Einstein se propuso encontrar una respuesta diferente, no como una fuerza misteriosa, sino como una propiedad de la geometría del espacio y el tiempo que rodea a los objetos masivos.',
      'Para desarrollar su nueva teoría de la gravedad, Einstein necesitó herramientas matemáticas que no conocía. Recurrió a su antiguo compañero de la ETH Zúrich, el matemático Marcel Grossmann, quien le introdujo al cálculo tensorial y la geometría diferencial de Bernhard Riemann. Estas matemáticas, desarrolladas en el siglo XIX, describían la curvatura de superficies y espacios de cualquier número de dimensiones. Grossmann y Einstein publicaron un artículo conjunto en 1913 que sentó las bases formales de la relatividad general.',
      'El Principio de Equivalencia tiene consecuencias que se pueden observar directamente. Si la gravedad y la aceleración son indistinguibles, entonces un rayo de luz en un campo gravitatorio debería curvarse, exactamente como se curvaría dentro de un ascensor acelerado. Del mismo modo, el tiempo debería transcurrir más lentamente cerca de objetos masivos. Estas predicciones, derivadas de un simple experimento mental sobre un hombre en caída libre, fueron confirmadas experimentalmente y constituyen la base de tecnologías que usamos a diario, incluyendo el sistema de posicionamiento global por satélite.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astronautas a bordo de la Estación Espacial Internacional experimentan lo que Einstein imaginó en 1907: están en caída libre continua alrededor de la Tierra. No flotan porque estén "lejos de la gravedad" (a 400 km de altitud, la gravedad es todavía el 89% de la que sentimos en la superficie). Flotan porque están cayendo permanentemente, pero su velocidad lateral de 27,600 km/h hace que "fallen alrededor" de la Tierra sin chocar con ella. Es exactamente el pensamiento de Einstein hecho realidad a escala orbital.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El satélite MICROSCOPE de la ESA verificó el Principio de Equivalencia con una precisión de 10⁻¹⁵ entre 2016 y 2018, midiendo si dos cilindros de materiales diferentes (titanio y platino-rodio) caían a la misma velocidad en órbita. La diferencia medida fue compatible con cero. Esto confirma que la masa inercial y la masa gravitatoria son idénticas con una precisión quince veces superior a cualquier experimento terrestre anterior, como los de Eötvös realizados en Budapest en 1922.' },
    ],
    fact: 'Galileo Galilei realizó experimentos sobre caída libre en la Torre de Pisa hacia 1589, demostrando que objetos de diferente peso caen a la misma velocidad en ausencia de resistencia del aire. En 1971, el astronauta David Scott repitió este experimento en la Luna durante la misión Apollo 15, soltando simultáneamente un martillo de 1.32 kg y una pluma de halcón de 0.03 kg. Sin atmósfera lunar, ambos llegaron al suelo al mismo tiempo, confirmando ante las cámaras de televisión el principio que conecta a Galileo con Einstein a través de cuatro siglos de física.',
  },
  {
    id: 'gravedad-geometria',
    title: 'La Gravedad como Geometría',
    color: '#D4A03C',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_gravedad-geometria.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_gravedad-geometria.jpg',
    content: [
      'La idea central de la relatividad general es que la gravedad no es una fuerza en el sentido tradicional, sino una consecuencia de la curvatura del espacio-tiempo. Imagina una cama elástica estirada y tensa. Si colocas una bola de boliche en el centro, la tela se hunde y se curva. Si luego lanzas una canica sobre la superficie, esta no viajará en línea recta: seguirá la curvatura creada por la bola pesada y parecerá ser "atraída" hacia ella. Según Einstein, esto es exactamente lo que hacen los planetas alrededor del Sol: siguen la curvatura del espacio-tiempo que la masa solar genera a su alrededor.',
      'En la física de Einstein, los objetos que se mueven libremente en un espacio-tiempo curvado siguen trayectorias llamadas geodésicas. Una geodésica es el camino más corto entre dos puntos en un espacio curvo, como un avión que vuela en un "gran círculo" sobre la superficie esférica de la Tierra. Los planetas no orbitan el Sol porque una fuerza misteriosa tire de ellos: orbitan porque el espacio-tiempo curvado por la masa del Sol les dicta esas trayectorias como los caminos más naturales. La Tierra orbita el Sol siguiendo una geodésica en el espacio-tiempo de cuatro dimensiones curvado por 1.989 × 10³⁰ kilogramos de masa solar.',
      'La curvatura del espacio-tiempo afecta no solo al espacio sino también al tiempo. Cerca de un objeto masivo, el tiempo transcurre más lentamente que lejos de él: un fenómeno llamado dilatación temporal gravitatoria. En 2010, investigadores del NIST (Instituto Nacional de Estándares y Tecnología de Estados Unidos) demostraron que un reloj atómico de aluminio colocado solo 33 centímetros más arriba que otro reloj idéntico corre de forma medible más rápido. La diferencia es de aproximadamente 4 × 10⁻¹⁷ por centímetro de altitud, pero es real y verificable con relojes ópticos de alta precisión.',
      'La analogía de la sábana elástica, aunque útil, tiene limitaciones. La sábana solo muestra dos dimensiones de espacio curvándose, mientras que el espacio-tiempo real tiene cuatro dimensiones (tres de espacio y una de tiempo) que se curvan simultáneamente. Además, la sábana necesita gravedad terrestre para hundirse, lo que crea una explicación circular. La descripción matemática correcta utiliza la métrica del espacio-tiempo, un objeto matemático llamado tensor métrico que codifica las distancias y ángulos en cada punto del espacio-tiempo curvado.',
      'La curvatura del espacio-tiempo produce efectos que se pueden observar directamente. Uno de los más llamativos es el efecto de lente gravitacional: la luz de galaxias y estrellas lejanas se curva al pasar cerca de objetos masivos intermedios. El Telescopio Espacial Hubble y el James Webb han fotografiado numerosos ejemplos de este efecto, incluyendo arcos y anillos de Einstein, donde la imagen de una galaxia lejana se distorsiona en un anillo completo alrededor de una galaxia intermedia. Fritz Zwicky predijo este efecto en 1937, y fue observado por primera vez en 1979 con el cuásar doble Q0957+561.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El efecto de lente gravitacional no solo distorsiona imágenes: también amplifica la luz de objetos lejanos, funcionando como un telescopio natural. En 2018, el Hubble observó la estrella individual más lejana jamás vista, llamada Icarus (MACS J1149 Lensed Star 1), a 9,000 millones de años luz de distancia, solo visible porque una galaxia intermedia amplificó su brillo unas 2,000 veces. Sin la lente gravitacional predicha por la relatividad general, esta estrella habría sido invisible para cualquier telescopio existente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La geometría del espacio-tiempo se describe mediante el tensor de Riemann, un objeto matemático con 20 componentes independientes en cuatro dimensiones. Este tensor captura toda la información sobre la curvatura intrínseca del espacio-tiempo en cada punto. Cuando el tensor de Riemann es cero en todas sus componentes, el espacio-tiempo es plano (sin gravedad). La contracción del tensor de Riemann produce el tensor de Ricci, que aparece directamente en las ecuaciones de campo de Einstein y conecta la geometría con la distribución de materia y energía.' },
    ],
    fact: 'En 1859, el astrónomo Urbain Le Verrier descubrió que la órbita de Mercurio rotaba 43 segundos de arco por siglo más de lo que las leyes de Newton podían explicar. Los astrónomos propusieron la existencia de un planeta oculto llamado Vulcano entre Mercurio y el Sol. Se organizaron expediciones durante eclipses solares para encontrarlo, sin éxito. En noviembre de 1915, Einstein aplicó sus nuevas ecuaciones de campo al problema y calculó una precesión adicional de exactamente 43 segundos de arco por siglo, eliminando la necesidad de Vulcano. Einstein reportó haber tenido palpitaciones al obtener este resultado.',
  },
  {
    id: 'ecuaciones-campo',
    title: 'Las Ecuaciones de Campo',
    color: '#3A5280',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_ecuaciones-campo.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_ecuaciones-campo.jpg',
    content: [
      'Las ecuaciones de campo de Einstein, escritas en notación compacta como Gμν + Λgμν = (8πG/c⁴)Tμν, son el corazón matemático de la relatividad general. En el lado izquierdo, Gμν (el tensor de Einstein) describe la curvatura del espacio-tiempo. En el lado derecho, Tμν (el tensor de energía-impulso) describe la distribución de masa, energía y presión. La ecuación dice, en esencia: la materia y la energía le dicen al espacio-tiempo cómo curvarse, y el espacio-tiempo curvado le dice a la materia cómo moverse. El físico John Archibald Wheeler resumió esta idea en una frase que se ha convertido en un lema de la física moderna.',
      'Einstein tardó una década completa en llegar a estas ecuaciones. Desde su primer artículo sobre el principio de equivalencia en 1907 hasta la presentación final en noviembre de 1915, el camino estuvo lleno de callejones sin salida, errores y frustraciones. En 1913, Einstein y Marcel Grossmann publicaron una versión preliminar (el "Entwurf" o borrador) que contenía errores en las ecuaciones. Einstein pasó dos años convencido de que eran correctas antes de descubrir los fallos en octubre de 1915, lo que desencadenó un mes frenético de correcciones y refinamientos.',
      'En noviembre de 1915, Einstein presentó su teoría completa en cuatro conferencias consecutivas ante la Academia Prusiana de Ciencias en Berlín, los días 4, 11, 18 y 25 de noviembre. La versión final de las ecuaciones fue presentada el 25 de noviembre de 1915. Pero cinco días antes, el 20 de noviembre, el matemático David Hilbert había presentado de forma independiente ecuaciones equivalentes ante la Sociedad Real de Ciencias de Gotinga. La cuestión de prioridad ha sido debatida por historiadores, aunque ambos científicos se reconocieron mutuamente el mérito y la controversia no dañó su amistad.',
      'La complejidad matemática de las ecuaciones de campo es notable. Lo que parece una sola ecuación en notación tensorial es en realidad un sistema de diez ecuaciones diferenciales parciales no lineales acopladas. No existe una solución general; cada problema físico requiere condiciones específicas. Karl Schwarzschild encontró la primera solución exacta en diciembre de 1915, apenas un mes después de la publicación, mientras servía como soldado en el frente ruso durante la Primera Guerra Mundial. Schwarzschild envió su solución a Einstein por correo desde las trincheras y falleció de una enfermedad autoinmune cinco meses después, en mayo de 1916.',
      'La constante cosmológica Λ tiene una historia singular. Einstein la añadió en 1917 para permitir un universo estático, porque creía que el cosmos no podía estar expandiéndose ni contrayéndose. Cuando Edwin Hubble demostró en 1929 que las galaxias se alejan entre sí, Einstein eliminó Λ y la llamó "el mayor error de mi vida". Sin embargo, en 1998 los equipos de Saul Perlmutter, Brian Schmidt y Adam Riess descubrieron que la expansión del universo se está acelerando, lo que requiere una constante cosmológica positiva. Este descubrimiento les valió el Premio Nobel de Física en 2011 y vindicó, de forma inesperada, el "error" de Einstein.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Karl Schwarzschild resolvió las ecuaciones de Einstein en condiciones difíciles de imaginar. En diciembre de 1915, estaba en el frente ruso de la Primera Guerra Mundial, calculando trayectorias de proyectiles de artillería para el ejército alemán, cuando leyó el artículo de Einstein. En pocas semanas, encontró la primera solución exacta, que describe el espacio-tiempo alrededor de una masa esférica no rotante. Esta solución predice un radio crítico (el radio de Schwarzschild) dentro del cual nada puede escapar, anticipando el concepto de agujero negro medio siglo antes de que se acuñara el término.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ecuaciones de campo contienen la constante gravitacional de Newton G = 6.674 × 10⁻¹¹ N·m²/kg² y la velocidad de la luz c = 299,792,458 m/s. El factor 8πG/c⁴ que aparece en las ecuaciones tiene un valor de aproximadamente 2.077 × 10⁻⁴³ s²/(kg·m), un número diminuto que explica por qué necesitas masas enormes (estrellas, planetas) para producir curvatura detectable en el espacio-tiempo. La masa de una persona curva el espacio-tiempo de forma técnicamente real pero tan pequeña que ningún instrumento actual puede medirla.' },
    ],
    fact: 'El manuscrito original de la relatividad general de 1915 fue subastado por Sotheby\'s en 1987 y permaneció en manos privadas durante años. En 2021, un manuscrito de trabajo de 54 páginas escrito a mano por Einstein y Grossmann entre 1913 y 1914, que contiene cálculos preparatorios para las ecuaciones de campo, fue subastado por Christie\'s en París por 11.6 millones de euros, convirtiéndose en el manuscrito científico más caro jamás vendido. El documento muestra tachones, errores corregidos y notas marginales que revelan el proceso mental de Einstein durante los años más difíciles del desarrollo de la teoría.',
  },
  {
    id: 'eclipse-1919',
    title: 'El Eclipse de 1919',
    color: '#C4922E',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_eclipse-1919.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_eclipse-1919.jpg',
    content: [
      'El 29 de mayo de 1919, durante un eclipse solar total, dos expediciones científicas británicas se propusieron verificar la predicción más audaz de la relatividad general: que la luz de las estrellas se curva al pasar cerca del Sol. Una expedición, dirigida por Arthur Stanley Eddington, viajó a la isla de Príncipe, frente a la costa occidental de África. La otra, dirigida por Andrew Crommelin, se instaló en Sobral, Brasil. Su objetivo era fotografiar las posiciones de las estrellas visibles cerca del disco solar durante la totalidad del eclipse y compararlas con sus posiciones normales sin la presencia del Sol.',
      'La relatividad general predecía una desviación de 1.75 segundos de arco para la luz que roza el borde del Sol, exactamente el doble de lo que predecía la teoría newtoniana (0.87 segundos de arco). Un segundo de arco es un ángulo minúsculo: equivale al diámetro aparente de una moneda de un centímetro vista desde una distancia de 4.1 kilómetros. Medir esta desviación requería comparar placas fotográficas tomadas durante el eclipse con placas del mismo campo estelar tomadas meses antes, cuando el Sol estaba en otra parte del cielo, utilizando micrómetros de alta precisión para medir las posiciones estelares.',
      'Las condiciones no fueron ideales. En la isla de Príncipe, nubes cubrieron el cielo durante gran parte del eclipse, y Eddington solo pudo obtener unas pocas placas fotográficas utilizables. En Sobral, las condiciones meteorológicas fueron mejores, pero el telescopio principal sufrió problemas de enfoque por la dilatación térmica. A pesar de estas dificultades, los resultados combinados mostraron una desviación de la luz consistente con la predicción de Einstein: 1.61 ± 0.30 segundos de arco en Príncipe y 1.98 ± 0.12 segundos de arco con el telescopio auxiliar de Sobral.',
      'El 6 de noviembre de 1919, los resultados fueron anunciados en una reunión conjunta de la Royal Society y la Royal Astronomical Society en Londres. El astrónomo Frank Dyson declaró que las observaciones confirmaban la predicción de Einstein y refutaban a Newton en este punto específico. Al día siguiente, el periódico The Times de Londres publicó el titular "Revolution in Science — New Theory of the Universe — Newtonian Ideas Overthrown". En cuestión de días, Einstein pasó de ser un físico conocido solo en círculos académicos a convertirse en la persona más reconocida del planeta.',
      'La verificación del eclipse de 1919 ha sido objeto de debate historiográfico. Algunos historiadores, como John Earman y Clark Glymour en 1980, cuestionaron si Eddington descartó selectivamente datos que no favorecían a Einstein. Sin embargo, el análisis detallado de Daniel Kennefick en su libro de 2019 "No Shadow of a Doubt" demostró que las decisiones de Eddington sobre qué placas utilizar fueron técnicamente justificadas. Además, mediciones modernas durante eclipses posteriores y con radiotelescopios han confirmado la predicción de Einstein con una precisión superior al 0.01%, eliminando cualquier duda residual sobre los resultados de 1919.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La organización del eclipse de 1919 fue notable porque ocurrió justo después de la Primera Guerra Mundial, en la que Gran Bretaña y Alemania habían sido enemigos. Eddington, un cuáquero pacifista británico, arriesgó su carrera para verificar la teoría de un físico alemán en un momento de profundo sentimiento anti-alemán. El Astrónomo Real Frank Dyson ayudó a Eddington a evitar el servicio militar obligatorio argumentando que su trabajo científico era de importancia nacional. La confirmación fue vista como un símbolo de reconciliación internacional a través de la ciencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La desviación gravitacional de la luz ha sido medida con precisión creciente desde 1919. En 1995, el satélite Hipparcos de la ESA midió la deflexión de la luz estelar por el Sol y confirmó la predicción de Einstein con un error menor al 0.1%. La misión Cassini de la NASA, en su camino a Saturno en 2003, midió el retardo temporal de señales de radio pasando cerca del Sol (efecto Shapiro) y verificó la relatividad general con una precisión del 0.002%. Cada nueva medición confirma las ecuaciones de Einstein con mayor exactitud.' },
    ],
    fact: 'Cuando le preguntaron a Einstein qué habría sentido si las observaciones del eclipse hubieran contradicho su teoría, respondió: "Entonces habría sentido lástima por el buen Dios. La teoría es correcta." Esta respuesta refleja la profunda confianza que Einstein tenía en la consistencia lógica y la belleza matemática de la relatividad general. El telegrama que Einstein recibió de Hendrik Lorentz el 22 de septiembre de 1919, informándole de los resultados preliminares favorables, lo compartió con su madre Pauline, quien estaba gravemente enferma. Pauline Einstein falleció en febrero de 1920, habiendo sabido que la teoría de su hijo había sido confirmada.',
  },
  {
    id: 'ondas-gravitacionales',
    title: 'Ondas Gravitacionales',
    color: '#4A6694',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_ondas-gravitacionales.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_ondas-gravitacionales.jpg',
    content: [
      'En 1916, un año después de publicar la relatividad general, Einstein predijo la existencia de ondas gravitacionales: ondulaciones en el tejido del espacio-tiempo que se propagan a la velocidad de la luz, generadas cuando masas aceleran de forma asimétrica. Imaginemos dos agujeros negros orbitando uno alrededor del otro: a medida que se acercan en espiral, emiten ondas que estiran y comprimen el espacio-tiempo a su paso, como ondas en la superficie de un estanque. Sin embargo, el propio Einstein dudó de su existencia real durante décadas, y en 1936 envió un artículo al Physical Review argumentando que las ondas gravitacionales no existían, antes de corregir su propio error.',
      'La detección de ondas gravitacionales parecía técnicamente imposible durante la mayor parte del siglo XX. La razón es que las ondas producidas incluso por eventos cataclísmicos son extraordinariamente débiles cuando llegan a la Tierra. Una onda gravitacional típica cambia las distancias en una parte en 10²¹: para un detector de 4 kilómetros de largo, eso equivale a medir un cambio de longitud de una milésima del diámetro de un protón. Joseph Weber construyó los primeros detectores en la década de 1960 usando cilindros de aluminio de 1.5 toneladas, pero sus afirmaciones de detección no pudieron ser replicadas por otros laboratorios.',
      'El proyecto LIGO (Laser Interferometer Gravitational-Wave Observatory) comenzó a construirse en 1994 bajo la dirección de Kip Thorne, Rainer Weiss y Barry Barish. Consiste en dos interferómetros láser en forma de L con brazos de 4 kilómetros de largo, uno en Hanford, Washington, y otro en Livingston, Louisiana, separados por 3,002 kilómetros. Un láser se divide en dos haces que viajan por los brazos perpendiculares y regresan para recombinarse. Si una onda gravitacional pasa, un brazo se estira mientras el otro se comprime, alterando el patrón de interferencia de la luz.',
      'El 14 de septiembre de 2015 a las 09:50:45 UTC, ambos detectores de LIGO registraron una señal simultánea denominada GW150914. El análisis reveló que provenía de la fusión de dos agujeros negros de 36 y 29 masas solares a 1,300 millones de años luz de distancia. En los últimos 0.2 segundos antes de la fusión, los agujeros negros giraban uno alrededor del otro 250 veces por segundo. El agujero negro resultante tenía 62 masas solares, lo que significa que 3 masas solares de materia se convirtieron en energía de ondas gravitacionales en una fracción de segundo, siguiendo la ecuación E=mc² de Einstein.',
      'El descubrimiento fue anunciado el 11 de febrero de 2016 y los líderes del proyecto LIGO, Rainer Weiss, Barry Barish y Kip Thorne, recibieron el Premio Nobel de Física en 2017. Desde entonces, LIGO y su contraparte europea Virgo (ubicada cerca de Pisa, Italia) han detectado más de 90 eventos de ondas gravitacionales, incluyendo fusiones de estrellas de neutrones. El 17 de agosto de 2017, la detección de la fusión de dos estrellas de neutrones (GW170817) fue acompañada por una señal electromagnética visible, confirmando que las ondas gravitacionales viajan a la velocidad de la luz con una precisión de una parte en 10¹⁵.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La señal GW150914 duró apenas 0.2 segundos en el rango audible de LIGO y fue detectada primero por un algoritmo automático, pero también fue visible a simple vista en los datos en bruto. Marco Drago, un postdoctorado italiano trabajando en Alemania, fue la primera persona en ver la señal en su pantalla a las 11:50 de la mañana (hora de Europa). Al principio pensó que era una inyección de prueba (señales falsas que los ingenieros insertan para calibrar el sistema), pero confirmó que no había ninguna prueba programada. La señal era real.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La potencia emitida durante los últimos instantes de la fusión GW150914 fue de aproximadamente 3.6 × 10⁴⁹ watts, equivalente a 50 veces la potencia luminosa combinada de todas las estrellas del universo observable. A pesar de esta potencia, la señal que llegó a la Tierra estiró los brazos del detector LIGO en apenas 4 × 10⁻¹⁸ metros, menos de la milésima parte del diámetro de un protón. Para lograr esta sensibilidad, los espejos de LIGO pesan 40 kg cada uno, están suspendidos por fibras de vidrio de 0.4 mm de diámetro, y el láser tiene una potencia efectiva de 750 kilowatts dentro de la cavidad óptica.' },
    ],
    fact: 'Russell Hulse y Joseph Taylor descubrieron en 1974 el púlsar binario PSR B1913+16, un sistema de dos estrellas de neutrones orbitando una alrededor de la otra. Durante las tres décadas siguientes, midieron cómo la órbita se acortaba gradualmente: las estrellas se acercan 3.5 metros por año porque pierden energía emitiendo ondas gravitacionales. La tasa de decaimiento orbital coincide con la predicción de la relatividad general con una precisión del 0.2%. Hulse y Taylor recibieron el Premio Nobel de Física en 1993 por esta primera evidencia indirecta de las ondas gravitacionales, veintidós años antes de la detección directa de LIGO.',
  },
  {
    id: 'agujeros-negros',
    title: 'Agujeros Negros',
    color: '#B88420',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_agujeros-negros.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_agujeros-negros.jpg',
    content: [
      'Los agujeros negros son una predicción directa de las ecuaciones de la relatividad general. La solución de Schwarzschild de 1916 mostró que cuando una masa se concentra dentro de un radio crítico, llamado radio de Schwarzschild, la curvatura del espacio-tiempo se vuelve tan extrema que nada puede escapar, ni siquiera la luz. Para el Sol, este radio sería de 2.95 kilómetros; para la Tierra, apenas 8.87 milímetros. El límite más allá del cual nada regresa se denomina horizonte de eventos. El propio Einstein nunca creyó que estos objetos pudieran existir en la naturaleza y publicó un artículo en 1939 argumentando que ningún proceso físico podría producirlos.',
      'El término "agujero negro" fue popularizado por el físico John Archibald Wheeler en 1967, aunque la periodista Ann Ewing lo había utilizado en un artículo de 1964. Antes se les llamaba "estrellas oscuras" o "estrellas congeladas". La solución de Kerr, encontrada por el matemático neozelandés Roy Kerr en 1963, describe agujeros negros en rotación, que es el caso general en la naturaleza. Un agujero negro de Kerr arrastra el espacio-tiempo a su alrededor en un fenómeno llamado "arrastre de marco" (frame dragging), predicho por los físicos Josef Lense y Hans Thirring en 1918.',
      'La primera evidencia observacional sólida de un agujero negro fue Cygnus X-1, una fuente de rayos X descubierta en 1964. En 1972, Charles Thomas Bolton y Louise Webster determinaron que la fuente de rayos X orbitaba una estrella visible con un período de 5.6 días, y que el objeto compacto invisible tenía una masa de al menos 6 masas solares, muy por encima del límite de 3 masas solares para una estrella de neutrones. Stephen Hawking y Kip Thorne hicieron una famosa apuesta en 1974 sobre si Cygnus X-1 era realmente un agujero negro; Hawking concedió la apuesta en 1990 cuando la evidencia se volvió concluyente.',
      'El centro de nuestra galaxia, la Vía Láctea, alberga un agujero negro supermasivo llamado Sagittarius A* (Sgr A*), con una masa de 4.15 millones de masas solares. Andrea Ghez y Reinhard Genzel recibieron el Premio Nobel de Física en 2020 por sus observaciones de estrellas orbitando Sgr A* durante más de 20 años. La estrella S2 completa una órbita completa en solo 16 años, alcanzando velocidades de 7,650 km/s (2.5% de la velocidad de la luz) en su punto más cercano al agujero negro, a apenas 17 horas luz del horizonte de eventos.',
      'El 10 de abril de 2019, el proyecto Event Horizon Telescope (EHT) publicó la primera imagen directa de un agujero negro: el agujero negro supermasivo en el centro de la galaxia M87, con 6,500 millones de masas solares, a 55 millones de años luz de distancia. La imagen muestra un anillo brillante de gas caliente orbitando el agujero negro y una sombra oscura central causada por el horizonte de eventos. Para crear esta imagen, ocho radiotelescopios distribuidos por todo el planeta fueron sincronizados para funcionar como un telescopio virtual del tamaño de la Tierra. En mayo de 2022, el EHT publicó también la imagen de Sagittarius A*, el agujero negro en el centro de nuestra propia galaxia.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Stephen Hawking demostró en 1974 que los agujeros negros no son completamente negros. Debido a efectos cuánticos cerca del horizonte de eventos, emiten una radiación térmica muy tenue, conocida como radiación de Hawking. Para un agujero negro de masa estelar, esta radiación es miles de millones de veces más fría que la radiación cósmica de fondo (2.7 kelvin), haciéndola prácticamente indetectable. Sin embargo, agujeros negros muy pequeños emitirían radiación intensa y eventualmente se evaporarían. Ningún agujero negro observable se evaporará antes de que el universo tenga una edad de 10⁶⁷ años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La imagen del EHT del agujero negro de M87 requirió procesar 5 petabytes de datos (5 millones de gigabytes), almacenados en 1,024 discos duros que fueron enviados físicamente por correo aéreo porque transmitirlos por internet habría tardado meses. La resolución angular alcanzada fue de 20 microsegundos de arco, equivalente a leer un periódico en Nueva York desde un café en París. Katie Bouman, una científica informática del MIT de 29 años, desarrolló uno de los algoritmos clave (CHIRP) para reconstruir la imagen a partir de los datos dispersos de los ocho telescopios.' },
    ],
    fact: 'Si pudieras acercarte al horizonte de eventos de un agujero negro, experimentarías un fenómeno llamado "espaguetificación": la diferencia de gravedad entre tus pies (más cerca del agujero negro) y tu cabeza (más lejos) sería tan grande que te estiraría como un espagueti. Para un agujero negro de masa estelar, esto ocurriría antes de cruzar el horizonte. Sin embargo, para un agujero negro supermasivo como el de M87, con 6,500 millones de masas solares, las fuerzas de marea en el horizonte serían sorprendentemente suaves porque el horizonte está a 19,000 millones de kilómetros del centro. Un astronauta podría cruzar el horizonte de eventos sin notar nada inusual, aunque jamás podría regresar para contarlo.',
  },
  {
    id: 'gps-vida-cotidiana',
    title: 'GPS y Vida Cotidiana',
    color: '#1E2D52',
    btnImage: '/assets/albert_einstein/infographic_m3/btn_gps-vida-cotidiana.jpg',
    image: '/assets/albert_einstein/infographic_m3/hero_gps-vida-cotidiana.jpg',
    content: [
      'La relatividad general no es solo una teoría abstracta sobre el cosmos: afecta a la tecnología que utilizamos todos los días. El Sistema de Posicionamiento Global (GPS) depende de una constelación de 24 a 32 satélites que orbitan la Tierra a una altitud de 20,200 kilómetros, completando dos órbitas cada día sidéreo (23 horas y 56 minutos). Cada satélite lleva relojes atómicos de cesio y rubidio con una precisión de un nanosegundo, y transmite continuamente su posición y la hora exacta. Tu receptor GPS calcula tu ubicación midiendo la diferencia de tiempo entre las señales de al menos cuatro satélites.',
      'La relatividad general entra en juego porque los relojes en los satélites GPS experimentan dos efectos opuestos. Primero, por la relatividad especial, los relojes se atrasan 7 microsegundos al día debido a su velocidad orbital de 14,000 km/h. Segundo, por la relatividad general, los relojes se adelantan 45 microsegundos al día porque la gravedad es más débil a 20,200 km de altitud (el espacio-tiempo está menos curvado allí). El efecto neto es un adelanto de 38 microsegundos diarios. Si no se corrigiera, los errores de posición se acumularían a un ritmo de aproximadamente 10 kilómetros por día, haciendo el sistema completamente inútil.',
      'La corrección relativista se implementa de dos maneras. Antes del lanzamiento, la frecuencia fundamental de los relojes atómicos de los satélites se ajusta de 10.23 MHz a 10.22999999543 MHz, compensando el efecto relativista constante. Además, el software de los receptores GPS aplica correcciones adicionales en tiempo real para efectos relativistas variables, como el cambio de altitud a lo largo de la órbita ligeramente elíptica de cada satélite. Estas correcciones se basan directamente en las ecuaciones de la relatividad general que Einstein publicó en 1915.',
      'El GPS no es la única tecnología cotidiana que depende de la relatividad. Las redes de telecomunicaciones por satélite, los sistemas de navegación aérea, la sincronización de redes eléctricas y los mercados financieros globales (donde operaciones se ejecutan en microsegundos) requieren sincronización temporal precisa que incorpora correcciones relativistas. Los relojes atómicos del futuro, basados en transiciones ópticas de átomos de estroncio o iterbio, serán tan precisos que podrán medir la diferencia de flujo temporal causada por una diferencia de altitud de un solo centímetro.',
      'La dilatación temporal gravitatoria también tiene implicaciones para la exploración espacial. Un reloj en la superficie de Marte corre 18 microsegundos más rápido al día que uno en la Tierra debido a la menor gravedad marciana. En la superficie de Júpiter, un reloj correría 200 microsegundos más lento al día. Y cerca del horizonte de eventos de un agujero negro, el tiempo prácticamente se detiene desde la perspectiva de un observador lejano. La película "Interstellar" (2014), asesorada científicamente por Kip Thorne, ilustró este efecto cuando una hora en el planeta Miller equivalía a siete años en la nave que orbitaba a distancia segura.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema GPS fue desarrollado por el Departamento de Defensa de Estados Unidos a partir de 1973 y alcanzó plena capacidad operacional el 17 de julio de 1995 con 24 satélites. Originalmente, la señal civil tenía una degradación intencional llamada "Disponibilidad Selectiva" que limitaba la precisión a 100 metros. El presidente Bill Clinton ordenó desactivarla el 1 de mayo de 2000, mejorando la precisión civil a 10-15 metros. Los sistemas modernos con correcciones diferenciales alcanzan precisiones de centímetros, esenciales para la agricultura de precisión, los vehículos autónomos y la topografía.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 1976, la NASA lanzó el cohete Gravity Probe A con un reloj de hidrógeno atómico a 10,000 km de altitud. El reloj del cohete se adelantó 4.5 partes en 10¹⁰ respecto a un reloj idéntico en tierra, exactamente como predecía la relatividad general, con una precisión del 0.007%. Fue la primera verificación directa de la dilatación temporal gravitatoria en el espacio. La misión duró solo 1 hora y 55 minutos (era un vuelo suborbital), pero sus datos confirmaron que Einstein tenía razón sobre cómo la gravedad afecta al flujo del tiempo.' },
    ],
    fact: 'Neil Ashby, físico de la Universidad de Colorado, calculó en 2003 que si los ingenieros del GPS hubieran ignorado la relatividad general y solo considerado la mecánica newtoniana, el sistema habría sido inutilizable en menos de dos minutos después de la activación, porque los errores se acumulan cuadráticamente. En un día, la posición indicada diferiría de la real en más de 10 kilómetros, y en una semana, en más de 70 kilómetros. Cada vez que usas Google Maps, pides un taxi por aplicación o sigues la ruta de un paquete de envío, estás dependiendo de una corrección basada en las ecuaciones que Einstein escribió a mano en Berlín hace más de un siglo.',
  },
];

// ——— Spacetime Curvature Particle Field (Canvas Background) ——————————————————
function SpacetimeField() {
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
      hue: Math.random() > 0.5 ? '44,62,107' : '212,160,60', // navy or amber
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

// ——— General Relativity Header ————————————————————————————————————
function RelativityHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,160,60,0.3))' }}>
        {/* Curved spacetime arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#grGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#2C3E6B','#D4A03C','#3A5280','#C4922E','#4A6694','#B88420','#1E2D52'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central mass icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#D4A03C" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="6" fill="#D4A03C" opacity="0.3" />
        <circle cx="300" cy="30" r="3" fill="#D4A03C" opacity="0.5" />
        {/* Curvature lines */}
        <path d="M280 38 Q300 48 320 38" fill="none" stroke="#D4A03C" strokeWidth="1" opacity="0.4" />
        <path d="M275 44 Q300 56 325 44" fill="none" stroke="#D4A03C" strokeWidth="0.8" opacity="0.3" />
        <defs>
          <linearGradient id="grGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(44,62,107,0.2)" />
            <stop offset="50%" stopColor="rgba(212,160,60,0.9)" />
            <stop offset="100%" stopColor="rgba(44,62,107,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A03C" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA RELATIVIDAD GENERAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,160,60,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GRAVEDAD, GEOMETRÍA Y ESPACIO-TIEMPO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ——————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,160,60,0.2)'}`,
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
          layoutId="activeDotEinsteinM3"
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

// ——— Expandable Section with Random Direction ——————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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
                  {i === 0 ? '◆' : '◇'}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
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

// ——— Progress Bar ————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,160,60,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A03C', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #2C3E6B, #D4A03C)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,160,60,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A03C', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_EinsteinM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/einstein/einstein_m3_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,160,60,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <SpacetimeField />

      <RelativityHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,160,60,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

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

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(212,160,60,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,160,60,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A03C', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de la Relatividad General!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Tejedor del Espacio-Tiempo
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📚 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
