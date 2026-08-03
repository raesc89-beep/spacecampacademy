'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Asteroides M4 themed: DART, Hayabusa2 y OSIRIS-REx) ──
function DecoProbe({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="22" y="22" width="16" height="16" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      <line x1="6" y1="30" x2="22" y2="30" stroke={color} strokeWidth="2" />
      <line x1="38" y1="30" x2="54" y2="30" stroke={color} strokeWidth="2" />
      <rect x="6" y="24" width="8" height="12" fill={color} opacity="0.6" />
      <rect x="46" y="24" width="8" height="12" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoSampleCapsule({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M15 20 L45 20 L38 45 L22 45 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="30" y1="35" x2="30" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="32" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoKineticImpact({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="38" cy="38" r="14" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <line x1="8" y1="8" x2="28" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polygon points="28,28 18,24 24,18" fill={color} />
      <path d="M25 20 L35 15 M20 25 L15 35" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoIonThruster({ size = 70, color = '#18FFFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M15 20 L30 15 L45 20 L40 40 L20 40 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 40 L15 52 M25 40 L22 55 M35 40 L38 55 M40 40 L45 52" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="30" cy="28" r="4" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoLidarScanner({ size = 70, color = '#E040FB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,10 50,50 10,50" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="4" fill={color} />
      <path d="M18 36 Q30 30 42 36" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function DecoAsteroidRyugu({ size = 70, color = '#FFAB40', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,8 48,22 44,46 30,54 14,44 12,22" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="28" cy="28" r="4" fill={color} opacity="0.6" />
      <line x1="14" y1="22" x2="44" y2="46" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

const DECO_MAP = {
  'era-exploracion': [DecoProbe, DecoIonThruster, DecoLidarScanner],
  'mision-dart': [DecoKineticImpact, DecoProbe, DecoAsteroidRyugu],
  'mision-hayabusa2': [DecoAsteroidRyugu, DecoSampleCapsule, DecoIonThruster],
  'mision-osiris-rex': [DecoSampleCapsule, DecoLidarScanner, DecoProbe],
  'analisis-laboratorio': [DecoSampleCapsule, DecoAsteroidRyugu, DecoKineticImpact],
  'tecnologia-navegacion': [DecoLidarScanner, DecoIonThruster, DecoProbe],
  'futuras-misiones': [DecoKineticImpact, DecoIonThruster, DecoSampleCapsule],
};

const BIBLIOGRAPHY = [
  'Cheng, A. F. et al. (2023). "A momentum transfer experiment via kinetic impact on Asteroid Dimorphos", Nature, 616, 457-460.',
  'Watanabe, S. et al. (2019). "Hayabusa2 arrives at C-type asteroid 162173 Ryugu: Big surprise in a small body", Science, 364(6437), 268-272.',
  'Lauretta, D. S. et al. (2019). "The unexpected surface of asteroid (101955) Bennu", Nature, 568, 55-60.',
  'Naraoka, H. et al. (2023). "Soluble organic molecules in samples of the carbonaceous asteroid (162173) Ryugu", Science, 379(6634), eabn9033.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'era-exploracion',
    title: 'La Era de las Misiones',
    color: '#FFD54F',
    btnImage: '/assets/asteroides/Osiris Rex.png',
    image: '/assets/asteroides/Osiris Rex.png',
    content: [
      'Durante siglos, los astrónomos observaron los asteroides como simples puntos de luz que se movían lentamente contra el fondo de estrellas fijas. No fue sino hasta finales del siglo XX cuando la humanidad adquirió la capacidad de enviar naves espaciales robóticas para ver la verdadera cara de estos fósiles planetarios.',
      'Las primeras exploraciones consistieron en sobrevuelos veloces. En 1991, la sonda Galileo de la NASA pasó cerca del asteroide Gaspra, obteniendo las primeras fotografías en alta resolución de la superficie llena de cráteres de un asteroide. Más tarde visitó a Ida y descubrió su diminuta luna Dactyl.',
      'El gran salto cualitativo ocurrió en el año 2001 con la misión NEAR Shoemaker. Tras orbitar el asteroide cercano a la Tierra 433 Eros durante un año completo, los ingenieros lograron aterrizar suavemente la nave sobre su superficie rocosa. Fue el primer posado controlado en la historia de la exploración asteroidea.',
      'Posteriormente, la misión Dawn de la NASA marcó otro hito espacial. Fue la primera nave en entrar en órbita alrededor de dos cuerpos celestes distintos en una sola misión: exploró el gigantesco Vesta entre 2011 y 2012 y luego viajó hacia el planeta enano Ceres entre 2015 y 2018.',
      'Hoy nos encontramos en la era dorada de las misiones de retorno de muestras y de defensa planetaria activa. Las agencias espaciales ya no se conforman con tomar fotos desde lejos; ahora tocan la superficie de las rocas espaciales, recogen su material y lo traen de vuelta a los laboratorios de la Tierra.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La sonda Galileo descubrió la primera luna asteroidal conocida, Dactyl, orbitando alrededor del asteroide 243 Ida. Mide apenas 1.4 kilómetros de ancho y demostró que los asteroides pequeños también pueden tener satélites.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La misión Dawn utilizó motores de propulsión iónica alimentados por gas xenón y paneles solares. Esta tecnología le permitió maniobrar eficientemente en el espacio profundo para cambiar de órbita entre Vesta y Ceres.' }
    ],
    fact: 'El asteroide 433 Eros fue el primer asteroide donde aterrizó una nave espacial humana. La sonda NEAR Shoemaker transmitió datos científicos durante dos semanas desde la superficie antes de apagarse.',
  },
  {
    id: 'mision-dart',
    title: 'Misión DART de la NASA',
    color: '#FF5252',
    btnImage: '/assets/asteroides/hub_sondas.png',
    image: '/assets/asteroides/hub_sondas.png',
    content: [
      'El 26 de septiembre de 2022 a las 23:14 UTC, la humanidad llevó a cabo su primer ensayo real de defensa planetaria activa en la historia. La nave DART (Prueba de Redirección de Asteroide Doble) de la NASA se estrelló intencionalmente contra el asteroide Dimorphos a 22,500 kilómetros por hora.',
      'El objetivo de la misión DART no era destruir el asteroide, sino demostrar la técnica de Impacto Cinético. Es la idea de golpear una roca peligrosa con una masa pesada a gran velocidad para alterar levemente su curso, desviándola de una hipotética trayectoria de colisión contra la Tierra.',
      'Dimorphos es una pequeña luna de 160 metros que orbita alrededor de un asteroide más grande llamado Didymos de 780 metros. Este sistema binario fue elegido porque no representaba ningún peligro para la Tierra, permitiendo medir los cambios en el periodo orbital con telescopios terrestres.',
      'El impacto de la sonda de 570 kilos liberó la energía equivalente a tres toneladas de TNT. Excavó un enorme cráter en Dimorphos y arrojó más de 1,000 toneladas de escombros y polvo al espacio en una majestuosa cola que se desplegó a lo largo de miles de kilómetros.',
      'La prueba fue un éxito total que superó todas las expectativas. Antes del choque, Dimorphos tardaba 11 horas y 55 minutos en orbitar a Didymos. El impacto acortó ese tiempo en 33 minutos completos, demostrando que la humanidad posee la tecnología para desviar asteroides peligrosos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un pequeño satélite italiano llamado LICIACube viajó adosado a la nave DART. Se desprendió diez días antes del choque para tomar fotos cercanas de la colisión y de la nube de escombros expulsada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El éxito de la deflexión por impacto cinético se multiplicó gracias al impulso de reacción generado por las toneladas de materia expulsada (recuperación de momento), actuando como un cohete natural.' }
    ],
    fact: 'La nave DART utilizó un sistema autónomo de navegación óptica llamado SMARTNav en tiempo real durante sus últimas cuatro horas de vuelo para fijar blanco en la luna Dimorphos sin intervención humana.',
  },
  {
    id: 'mision-hayabusa2',
    title: 'Hayabusa2 de JAXA',
    color: '#FFAB40',
    btnImage: '/assets/asteroides/hub_sondas_vector.png',
    image: '/assets/asteroides/hub_sondas_vector.png',
    content: [
      'En junio de 2018, la nave espacial Hayabusa2 de la Agencia de Exploración Aeroespacial de Japón (JAXA) llegó a las inmediaciones del asteroide tipo C Ryugu, una roca diamante con forma de pirinola de 900 metros de ancho rica en carbono y materia orgánica primordial.',
      'A diferencia de las misiones tradicionales, Hayabusa2 llevó a cabo un despliegue sin precedentes de robots exploradores. Liberó sobre la superficie del asteroide tres diminutos rovers saltarines MINERVA-II y el módulo lander europeo MASCOT, que operó en la superficie midiendo su magnetismo y temperatura.',
      'Para recolectar las muestras de la superficie, la nave descendió hasta tocar la roca durante apenas unos segundos. Disparó una pequeña bala de tantalio contra el suelo para levantar polvo que fue canalizado por una trompa colectora directamente hacia la cápsula de almacenamiento hermética.',
      'Pero JAXA quería obtener muestras del subsuelo no alteradas por la radiación solar. Para ello, Hayabusa2 desplegó un impactador cargado con explosivo plástico HMX que disparó un proyectil de cobre de 2.5 kilos contra el asteroide, excavando un cráter artificial de 10 metros de ancho.',
      'En diciembre de 2020, la cápsula de retorno de Hayabusa2 aterrizó en el desierto de Woomera en Australia. Trajo a la Tierra 5.4 gramos de polvo y rocas intactas del asteroide Ryugu, superando por 50 veces el objetivo mínimo trazado por los científicos de la misión.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los diminutos rovers MINERVA-II no usaban ruedas para desplazarse porque la gravedad en Ryugu es tan débil que una rueda patinaría. En su lugar, usaban motores internos que los hacían dar saltos flotantes sobre las rocas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La masa de Ryugu es tan baja y su porosidad tan alta (más del 50%) que los astrónomos lo clasifican como un "cúmulo de escombros", un montón de rocas unidas débilmente por su propia gravedad.' }
    ],
    fact: 'El nombre "Ryugu" proviene de una leyenda del folclore japonés y significa "El Palacio del Dragón", un palacio mágico bajo el mar de donde un pescador trajo una caja misteriosa con secretos.',
  },
  {
    id: 'mision-osiris-rex',
    title: 'OSIRIS-REx de la NASA',
    color: '#64FFDA',
    btnImage: '/assets/asteroides/Osiris Rex 2.png',
    image: '/assets/asteroides/Osiris Rex 2.png',
    content: [
      'En diciembre de 2018, la sonda espacial OSIRIS-REx de la NASA llegó al asteroide cercano a la Tierra (101955) Bennu, una roca potencialmente peligrosa de 500 metros de ancho compuesta por materiales hidratados y cargada de compuestos de carbono de la infancia del Sistema Solar.',
      'Durante más de un año, la nave mapeó la superficie de Bennu con precisión milimétrica usando escáneres láser LIDAR. Los científicos se sorprendieron al descubrir que la superficie no tenía playas de arena suave como esperaban, sino que estaba repleta de rocas gigantescas y afiladas.',
      'El 20 de octubre de 2020, la nave ejecutó la arriesgada maniobra TAG (Tocar y Llevarse). Descendió lentamente hasta extender un brazo robótico de tres metros. Al tocar la superficie, inyectó un chorro de gas nitrógeno a presión para levantar el regolito suelto y aspirarlo hacia el contenedor.',
      'La fuerza de succión fue tan potente que el brazo de la nave se hundió medio metro en el suelo de Bennu, demostrando que el asteroide ofreció casi la misma resistencia que una alberca llena de pelotas de plástico. El contenedor quedó tan lleno de rocas que no podía cerrar la tapa por completo.',
      'El 24 de septiembre de 2023, la cápsula de muestras se desprendió de la nave y descendió en paracaídas sobre el desierto de Utah en Estados Unidos. Entregó más de 120 gramos de material asteroidal intacto, la muestra más grande jamás recolectada por una nave espacial en el espacio profundo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tras entregar con éxito su cápsula de muestras en la Tierra, la nave espacial nodriza no se apagó. Fue rebautizada como OSIRIS-APEX y se envió en una nueva misión para estudiar al asteroide Apophis en 2029.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El asteroide Bennu es considerado una roca activa. OSIRIS-REx fotografió pequeños eventos de eyección de partículas donde el asteroide lanza continuamente piedras del tamaño de canicas al espacio.' }
    ],
    fact: 'El análisis inicial de las muestras de Bennu reveló la presencia de abundantes minerales de fosfato de sodio hidratado, sugiriendo que el asteroide proviene de un antiguo cuerpo padre helado con agua líquida.',
  },
  {
    id: 'analisis-laboratorio',
    title: 'Análisis en la Tierra',
    color: '#E040FB',
    btnImage: '/assets/asteroides/Osiris rex 3.png',
    image: '/assets/asteroides/Osiris rex 3.png',
    content: [
      '¿Por qué gastar cientos de millones de dólares en traer unos pocos gramos de polvo espacial a la Tierra en lugar de analizarlos con instrumentos instalados a bordo de la propia nave? La respuesta radica en la inmensa potencia de los laboratorios científicos terrestres.',
      'Los instrumentos instalados en sondas espaciales deben ser miniaturizados, ligeros y consumir poca energía. En cambio, en la Tierra los científicos pueden usar microscopios electrónicos de barrido, aceleradores de partículas de radiación sincrotrón y espectrómetros de masa de alta resolución que ocupan edificios enteros.',
      'Además, los meteoritos que caen naturalmente en la Tierra se contaminan al instante al entrar en contacto con el aire húmedo, el agua de lluvia y la bacteria de nuestro suelo. Las muestras traídas por Hayabusa2 y OSIRIS-REx llegaron selladas en cámaras de nitrógeno puro al vacío totalmente incontaminadas.',
      'Al analizar los granos del asteroide Ryugu, los científicos japoneses e internacionales hicieron descubrimientos asombrosos. Encontraron más de 20 tipos de aminoácidos diferentes (los bloques de construcción del ADN y proteínas) y la base nitrogenada uracilo, esencial para el ARN.',
      'Estos resultados confirman la hipótesis de que las moléculas fundamentales para el origen de la vida no se formaron únicamente en la Tierra, sino que fueron sintetizadas en el espacio profundo y sembradas en nuestro planeta por los impactos de asteroides y cometas primordiales.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las muestras de los asteroides Ryugu y Bennu se conservan en salas limpias especiales en Japón y Estados Unidos. Partes de las muestras se guardan congeladas bajo nitrógeno para ser analizadas por futuros científicos dentro de 50 años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los análisis de isótopos de cromo y titanio en los granos de Ryugu demostraron una afinidad química perfecta con las condritas carbonáceas de tipo CI, las rocas más primitivas conocidas en la ciencia planetaria.' }
    ],
    fact: 'En las muestras del asteroide Ryugu se identificó agua líquida atrapada en forma de inclusiones microscópicas dentro de cristales de carbonato, revelando la composición del agua primordial del disco solar.',
  },
  {
    id: 'tecnologia-navegacion',
    title: 'Navegación Cercana',
    color: '#18FFFF',
    btnImage: '/assets/asteroides/hub_sondas.png',
    image: '/assets/asteroides/hub_sondas.png',
    content: [
      'Maniobrar una nave espacial robótica a cientos de millones de kilómetros de la Tierra alrededor de un asteroide de apenas unos cientos de metros es uno de los desafíos más complejos de la ingeniería aeroespacial moderna.',
      'La primera gran dificultad es el retraso en las comunicaciones radiotelegráficas. Como la señal tarda entre 10 y 30 minutos en ir y volver desde la Tierra hasta la sonda, es absolutamente imposible pilotar la nave en tiempo real usando un joystick desde el centro de control.',
      'La nave debe ser completamente autónoma. Para lograrlo, utiliza algoritmos de visión por computadora basados en Navegación Relativa por Imágenes (Optical Navigation). La sonda toma fotografías constantes de la superficie del asteroide, reconoce rocas de referencia y calcula su propia posición y velocidad.',
      'La segunda dificultad es el entorno de gravedad extremadamente débil del asteroide. En cuerpos pequeños como Bennu o Ryugu, la atracción gravitatoria es cien mil veces menor que la de la Tierra. Las herramientas de la nave, la presión de la luz solar e incluso la fuga de un gas pueden alterar el vuelo.',
      'Para medir las distancias al suelo con precisión de centímetros sin chocar, las naves emplean altímetros láser LIDAR que disparan miles de pulsos por segundo. Esta información se procesa al instante a bordo para corregir el rumbo con micro-propulsores de gas frío de forma ultraprecisa.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La atracción gravitatoria en la superficie del asteroide Bennu es tan diminuta que si saltaras con tus piernas a velocidad normal saldrías disparado hacia el espacio profundo sin poder regresar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para simular la gravedad débil de los asteroides antes del lanzamiento, los ingenieros espaciales prueban las maniobras de brazo robótico en torres de caída libre al vacío y en aviones de vuelos parabólicos de gravedad cero.' }
    ],
    fact: 'El mapa topográfico 3D generado por el instrumento OLA de la NASA a bordo de OSIRIS-REx es el modelo numérico de elevación más detallado jamás construido para cualquier cuerpo celestiales del Sistema Solar.',
  },
  {
    id: 'futuras-misiones',
    title: 'Misiones del Futuro',
    color: '#FF5252',
    btnImage: '/assets/asteroides/hub_sondas_vector.png',
    image: '/assets/asteroides/hub_sondas_vector.png',
    content: [
      'El éxito rotundo de las misiones DART, Hayabusa2 y OSIRIS-REx ha marcado el comienzo de una audaz nueva era en la exploración robótica de los asteroides del Sistema Solar.',
      'En octubre de 2023, la NASA lanzó la misión Psyche rumbo al asteroide 16 Psyche en el Cinturón Principal. Llegará en 2029 para explorar por primera vez un mundo metálico hecho de hierro y níquel, ofreciendo una ventana directa para entender los núcleos ocultos de planetas como la Tierra.',
      'En octubre de 2024, la Agencia Espacial Europea (ESA) lanzó la misión Hera. Viajará hacia el sistema binario Didymos para llegar en 2026 y realizar una inspección detallada de las secuelas del impacto de DART, midiendo la masa exacta y la forma del cráter excavado en Dimorphos.',
      'Por su parte, China prepara la misión Tianwen-2 para despegar en 2025. Su objetivo será recolectar muestras del asteroide cercano a la Tierra 469219 Kamoʻoalewa (un cuasisatélite terrestre) y luego continuar viaje hacia el cometa de cinturón principal 311P/PANSTARRS.',
      'A largo plazo, las empresas privadas y agencias espaciales planean desarrollar misiones de Minería Espacial. Buscarán extraer agua de los asteroides tipo C para convertirla en combustible de hidrógeno en el espacio, e industrializar metales raros de asteroides tipo M para la construcción en órbita.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El asteroide Kamoʻoalewa, objetivo de la misión Tianwen-2, tiene una composición mineral idéntica a las rocas lunares recopiladas por las misiones Apolo, sugiriendo que es un fragmento expulsado de la Luna por un impacto gigante.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Convertir el agua de hielo de un asteroide en combustible espacial requiere un proceso químico de electrólisis solar que separa las moléculas de H2O en gases de hidrógeno (H2) y oxígeno (O2) líquidos.' }
    ],
    fact: 'La misión Hera lleva a bordo dos micro-satélites de formato CubeSat llamados Juventas y Milani. Juventas utilizará por primera vez un radar de baja frecuencia para examinar la estructura interna oculta de Dimorphos.',
  },
];

export default function InteractiveInfographic_AsteroidesM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(15,20,30,0.92) 0%, rgba(20,15,35,0.88) 50%, rgba(10,12,32,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <AsteroidesM4Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FFD54F, #FF5252)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
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

      <div style={{ position: 'relative', zIndex: 3, flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '300px',
                color: 'rgba(255,255,255,0.4)', textAlign: 'center', gap: '1rem',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
                Selecciona uno de los módulos superiores para explorar las misiones espaciales DART, Hayabusa2 y OSIRIS-REx.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' }}>
          Referencias Científicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,213,79,0.4)' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function CosmicDustField() {
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
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '255, 213, 79' : '255, 82, 82',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.driftX;
        p.y += p.driftY;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
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

function AsteroidesM4Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,213,79,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM4)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FFD54F','#FF5252','#FFAB40','#64FFDA','#E040FB','#18FFFF','#FF5252'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FFD54F" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FFD54F" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,213,79,0.2)" />
            <stop offset="50%" stopColor="rgba(255,213,79,0.9)" />
            <stop offset="100%" stopColor="rgba(255,213,79,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FFD54F" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">SONDAS Y MUESTRAS</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,213,79,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">DART, HAYABUSA2 Y OSIRIS-REX</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,213,79,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotAsteroidesM4"
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
              {item.text}
            </p>
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
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
                  {i === 0 ? 'SECCIÓN 1' : 'SECCIÓN 2'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}
        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
