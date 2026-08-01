'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Machine themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      {/* Concentric spiraling rings */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
      {/* Distortion streaks */}
      <path d="M30 6 Q35 15 30 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M54 30 Q45 35 42 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 54 Q25 45 30 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M6 30 Q15 25 18 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFluxCapacitor({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Y-shape */}
      <path d="M30 30 L15 15 M30 30 L45 15 M30 30 L30 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Glowing centers */}
      <circle cx="30" cy="30" r="3" fill={color} />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="45" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="48" r="2" fill={color} opacity="0.8" />
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
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
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
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

const DECO_MAP = {
  'metodo-cientifico': [DecoGear, DecoClockFace, DecoTimeline],
  'electricidad': [DecoBolt, DecoAtomSvg, DecoGear],
  'guerra-corrientes': [DecoGear, DecoTimeline, DecoBolt],
  'semiconductores': [DecoAtomSvg, DecoBolt, DecoClockFace],
  'biotecnologia': [DecoWormhole, DecoAtomSvg, DecoTimeline],
  'espacio-futuro': [DecoTimeline, DecoClockFace, DecoWormhole],
  'sostenibilidad': [DecoGear, DecoAtomSvg, DecoFluxCapacitor],
}; const BIBLIOGRAPHY = ['Doudna, J.A. & Sternberg, S.H. (2017). A Crack in Creation: Gene Editing and the Power to Control Evolution, Houghton Mifflin',
  'Tesla, N. (1905). "The Transmission of Electrical Energy Without Wires", Electrical World and Engineer',
  'Isaacson, W. (2011). Steve Jobs, Simon & Schuster',
  'Musk, E. & SpaceX Team (2017). "Making Humans a Multi-Planetary Species", New Space, 5(2)',
  'Shockley, W. (1950). Electrons and Holes in Semiconductors, Van Nostrand',
  'IPCC (2021). Climate Change 2021: The Physical Science Basis, Cambridge University Press'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'metodo-cientifico',
    title: 'El Método Científico',
    color: '#6EC6FF',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_metodo.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_metodo.png',
    content: [
      'El Método Científico es un proceso sistemático para realizar descubrimientos. Es una serie de pasos que asegura que los resultados sean comprobables y precisos.',
      'El proceso comienza con una observación y la formulación de una hipótesis (una posible explicación). Luego, se diseña un experimento para probar esta hipótesis, durante el cual se recopilan datos y medidas.',
      'Después se analizan los datos recopilados para determinar si apoyan o contradicen la hipótesis original, permitiendo formular una conclusión. Los experimentos fallidos también aportan información útil para ajustar teorías.',
      'El último paso es la verificación. Un experimento debe ser reproducible por otros investigadores para confirmar su validez. Así se construye el conocimiento científico.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En "Regreso al Futuro", Doc Brown encarna el método científico a la perfección. Cuando prueba el DeLorean por primera vez en el centro comercial Twin Pines, graba todo el experimento, usa a Einstein (su perro) para la primera prueba con un reloj sincronizado, observa los resultados (el reloj de Einstein está atrasado 1 minuto), analiza los datos y concluye que el viaje en el tiempo es posible.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El filósofo y científico Alhacén (Ibn al-Haytham), en el siglo XI, fue uno de los primeros en usar un método experimental para comprobar teorías. Usó experimentos controlados para demostrar que la luz viaja en línea recta y entra a nuestros ojos, cambiando para siempre la forma en que entendemos la óptica.' }
    ],
    fact: 'El método científico no es solo para laboratorios; ¡lo usas todos los días! Cuando intentas encender una lámpara y no funciona (observación), piensas que el foco está fundido (hipótesis), cambias el foco por uno nuevo (experimento), y si la luz enciende, tu conclusión es que tenías razón.'
  },
  {
    id: 'electricidad',
    title: 'Electricidad y Rayos',
    color: '#FFD740',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_electricidad.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_electricidad.png',
    content: [
      'Un rayo es una descarga de electricidad estática. Durante una tormenta, las partículas en las nubes chocan, creando una carga eléctrica. Cuando la carga es suficiente, busca el camino más corto hacia el suelo.',
      'La energía de un rayo transporta millones de voltios y alcanza temperaturas de hasta 30,000 grados Celsius. Este calor expande el aire de golpe, generando el sonido del trueno.',
      'En 1752, el experimento de la cometa de Benjamin Franklin demostró que los rayos comparten la misma naturaleza que la electricidad estática.',
      'Aunque la electricidad alimenta el mundo moderno, capturar la energía de un rayo natural sigue siendo ineficiente con la tecnología actual debido a su imprevisibilidad.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para viajar en el tiempo, el condensador de flujo necesita 1.21 gigawatts de potencia. Al no poder conseguir plutonio en 1955, Doc Brown canaliza la energía del rayo que cae en la torre del reloj directamente al DeLorean. Esta es una representación brillante, aunque exagerada, de intentar aprovechar la inmensa energía de la naturaleza.' },
      { label: 'Dato Científico', icon: 'atom', text: '1.21 Gigawatts es una cantidad colosal de energía. Para generar tanta electricidad de forma continua, necesitarías aproximadamente 3.1 millones de paneles solares funcionando a pleno rendimiento, o la producción combinada de varios reactores nucleares comerciales. ¡Y un solo relámpago lo hace en fracciones de segundo!' }
    ],
    fact: 'Existen relámpagos que no van hacia el suelo, sino hacia arriba. Conocidos como "Duendes Rojos" (Red Sprites) y "Chorros Azules" (Blue Jets), estas misteriosas descargas eléctricas ocurren muy por encima de las nubes de tormenta, alcanzando hasta el borde del espacio.'
  },
  {
    id: 'guerra-corrientes',
    title: 'La Guerra de Corrientes',
    color: '#FF8A80',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_corrientes.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_corrientes.png',
    content: [
      'A finales del siglo XIX, Thomas Edison y Nikola Tesla compitieron en la "Guerra de las Corrientes" para establecer el estándar del sistema de transmisión eléctrica comercial.',
      'Thomas Edison defendía la Corriente Continua (DC), un sistema donde la electricidad fluye en una sola dirección. Su principal limitación era la pérdida de energía al transmitirse a largas distancias.',
      'Nikola Tesla propuso la Corriente Alterna (AC), que invierte su dirección continuamente. Este sistema permitía usar transformadores para elevar el voltaje y transmitir la energía a grandes distancias con eficiencia.',
      'El sistema de Corriente Alterna triunfó para la distribución eléctrica a gran escala. En la actualidad, usamos AC en la red eléctrica y DC en baterías y dispositivos electrónicos.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown tiene mucho en común con Nikola Tesla. Ambos son genios excéntricos, inventores solitarios y algo incomprendidos por la sociedad de su tiempo, obsesionados con controlar grandes cantidades de energía. El enorme amplificador de guitarra en la casa de Doc y sus experimentos salvajes recuerdan el famoso laboratorio de Tesla en Colorado Springs.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante la Guerra de las Corrientes, Edison organizó demostraciones públicas donde electrocutaba animales usando corriente alterna para intentar asustar a la gente y convencerlos de que el sistema de Tesla era peligroso. A pesar de estas tácticas sucias, la eficiencia matemática y física del sistema de Tesla finalmente prevaleció.' }
    ],
    fact: 'Nikola Tesla soñaba con transmitir electricidad de forma inalámbrica a todo el planeta a través del aire y la tierra. Construyó la enorme Torre Wardenclyffe en Nueva York para probar esto, pero el proyecto se quedó sin fondos antes de completarse.'
  },
  {
    id: 'semiconductores',
    title: 'Revolución Digital',
    color: '#B388FF',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_semiconductores.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_semiconductores.png',
    content: [
      'El transistor, inventado en 1947, reemplazó a los frágiles tubos de vacío en las computadoras. Cumplía la misma función siendo más pequeño y emitiendo menos calor.',
      'Un transistor funciona como un interruptor que controla el flujo de electricidad (representando un "1" o un "0"). Están fabricados con materiales semiconductores como el silicio.',
      'La integración de múltiples transistores en un solo bloque de silicio dio origen al microchip. La "Ley de Moore" predijo que la cantidad de transistores en un circuito integrado se duplicaría aproximadamente cada dos años.',
      'Esta reducción de tamaño permitió el desarrollo de los dispositivos electrónicos modernos, desde computadoras personales hasta teléfonos móviles.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando el Doc de 1955 ve la videocámara JVC portátil de Marty, se sorprende por su tamaño y capacidad. En 1955, el transistor apenas comenzaba a usarse, y las cámaras de televisión eran enormes equipos de estudio que dependían de pesados tubos de vacío. ¡La videocámara de Marty era verdadera magia del futuro!' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los transistores modernos son tan pequeños que su tamaño se mide en nanómetros. Para que te hagas una idea, un cabello humano tiene un grosor de unos 80,000 nanómetros. Los transistores en los chips actuales pueden medir apenas 3 nanómetros de ancho. ¡Son casi a escala atómica!' }
    ],
    fact: 'El silicio es el material estrella para los semiconductores, ¡y es sorprendentemente común! Es el segundo elemento más abundante en la corteza terrestre, después del oxígeno. La arena normal de la playa está hecha principalmente de dióxido de silicio.'
  },
  {
    id: 'biotecnologia',
    title: 'CRISPR y Biotecnología',
    color: '#00E5FF',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_biotec.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_biotec.png',
    content: [
      'En 2012, Jennifer Doudna y Emmanuelle Charpentier desarrollaron la herramienta CRISPR-Cas9, un método para editar secuencias de ADN de manera precisa.',
      'Antes de CRISPR, la modificación genética era un proceso complejo. Esta tecnología permite identificar una secuencia específica de ADN, cortarla y reemplazarla, facilitando el tratamiento de enfermedades de origen genético.',
      'El sistema CRISPR fue adaptado de un mecanismo de defensa bacteriano. Las bacterias utilizan fragmentos de ADN viral para reconocer y destruir virus recurrentes mediante la enzima Cas9.',
      'La biotecnología tiene aplicaciones en la medicina y en la agricultura, permitiendo el desarrollo de cultivos resistentes. Su uso plantea debates éticos sobre los límites de la edición genética.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando Doc viaja al futuro (año 2015), visita una clínica de rejuvenecimiento que le añade décadas a su vida. Le cambian la sangre, el bazo y el colon, y le reducen las arrugas. Hoy, la ciencia médica moderna con CRISPR y terapias génicas busca algo similar: entender y eventualmente ralentizar el envejecimiento celular real de nuestro cuerpo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Por su desarrollo de CRISPR-Cas9, Emmanuelle Charpentier y Jennifer Doudna ganaron el Premio Nobel de Química en 2020. Fue la primera vez en la historia que un Premio Nobel de ciencias fue otorgado a dos mujeres, marcando un hito inspirador para la ciencia y la igualdad.' }
    ],
    fact: 'La biotecnología no solo se aplica a humanos. Se está utilizando tecnología genética para intentar "resucitar" o proteger especies en peligro. Existen proyectos en marcha que buscan traer de vuelta al mamut lanudo alterando genéticamente el ADN de sus parientes vivos más cercanos, los elefantes asiáticos.'
  },
  {
    id: 'espacio-futuro',
    title: 'Exploración Espacial',
    color: '#CE93D8',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_espacio.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_espacio.png',
    content: [
      'La industria espacial ha logrado avances mediante el desarrollo de cohetes reutilizables. Anteriormente, los cohetes se descartaban tras un solo uso. Ahora, algunas etapas pueden aterrizar y utilizarse nuevamente.',
      'El programa Artemis de la NASA tiene como objetivo el retorno humano a la Luna, incluyendo la construcción de una estación en órbita lunar y bases de superficie como preparación para misiones a Marte.',
      'El Telescopio Espacial James Webb permite analizar las atmósferas de exoplanetas y observar galaxias formadas en las etapas tempranas del universo.',
      'El desarrollo tecnológico espacial también ha impulsado iniciativas comerciales y proyectos a largo plazo sobre el uso de recursos extraterrestres.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En BTTF, el 2015 está lleno de autos voladores usando "aeroconversión". Aunque todavía no tenemos autos voladores diarios por razones de seguridad, las tecnologías de propulsión están avanzando. La visión de la película sobre la gravedad controlada y el transporte futurista se refleja hoy en los avances de la aeronáutica, cohetes de despegue vertical e investigaciones en levitación magnética.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El viaje a Marte toma alrededor de 7 a 9 meses usando la tecnología de propulsión química actual, y las oportunidades de lanzamiento ocurren solo cada 26 meses cuando la Tierra y Marte están alineados. ¡Es un viaje largo y sin paradas de descanso!' }
    ],
    fact: 'El Telescopio Espacial James Webb usa un espejo recubierto de oro. La capa de oro es tan fina que, a pesar de que el espejo mide 6.5 metros de ancho, ¡solo se usaron aproximadamente 48 gramos de oro para cubrirlo todo (el tamaño de una pelota de golf)!'
  },
  {
    id: 'sostenibilidad',
    title: 'Futuro Sostenible',
    color: '#66BB6A',
    btnImage: '/assets/bttf/infographic_biotecnologia/btn_sostenible.png',
    image: '/assets/bttf/infographic_biotecnologia/hero_sostenible.png',
    content: [
      'La sostenibilidad busca satisfacer las necesidades actuales sin comprometer los recursos de las generaciones futuras. Un desafío principal es mitigar el cambio climático asociado a los gases de efecto invernadero.',
      'La transición energética implica reducir la dependencia de los combustibles fósiles a favor de fuentes renovables como la energía solar, eólica y geotérmica, junto con métodos eficientes de almacenamiento.',
      'El modelo de economía circular promueve la reducción de residuos mediante el diseño de productos orientados a la reutilización y el reciclaje.',
      'La implementación de prácticas sostenibles depende de la adopción de tecnologías limpias y de políticas ambientales a largo plazo.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Al final de la película, el Doc de 2015 usa el "Mr. Fusion", un dispositivo en el DeLorean que convierte restos de basura (cáscaras de plátano, cerveza sobrante) en energía masiva y limpia. ¡Ese es el sueño absoluto de la sostenibilidad y la economía circular! Transformar los desechos directamente en energía usable sin contaminación.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El 100% de la energía que usa el país de Islandia proviene de fuentes renovables. Debido a su geografía volcánica única, utilizan casi exclusivamente energía geotérmica e hidroeléctrica, demostrando que es posible operar una sociedad moderna completa sin depender de combustibles fósiles.' }
    ],
    fact: 'Existen bacterias descubiertas recientemente, como la "Ideonella sakaiensis", que han evolucionado naturalmente para alimentarse de plástico PET. Los científicos están usando biotecnología para estudiar sus enzimas e intentar crear súper-bacterias que nos ayuden a reciclar las montañas de plástico que hemos creado.'
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
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '0, 229, 255' : '255, 167, 38',
      gearSize: Math.random() * 3 + 1,
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
        // Gear-like particle
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3 + t * p.speed;
          const outerR = p.r * p.gearSize;
          ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
          ctx.lineTo(p.x + Math.cos(a + 0.3) * p.r, p.y + Math.sin(a + 0.3) * p.r);
        }
        ctx.closePath();
        
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

// â”€â”€â”€ Time Machine Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6EC6FF','#FFD740','#FF8A80','#B388FF','#00E5FF','#CE93D8','#66BB6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central gear icon */}
        <path d="M300 22 l1 2 a10 10 0 0 1 2 1 l2 -1 l2 2 l-1 2 a10 10 0 0 1 1 2 l2 1 l-2 2 l-1 2 a10 10 0 0 1 -2 1 l-2 1 l-2 -2 l-1 -2 a10 10 0 0 1 -1 -2 l-2 -1 l2 -2 z" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="10" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#00E5FF" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">BIOTECNOLOGÍA DEL FUTURO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA QUE TRANSFORMARÁ EL MAÃ‘ANA</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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
          layoutId="activeDotBttfM7"
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
            background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none'
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
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fact Box â”€â”€â”€ */}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #00E5FF, #FF6B35)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM7() {
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
      background: 'url(/assets/bttf/infographic_biotecnologia/bg_biotecnologia.png) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(0,229,255,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,229,255,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        {!activeNode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}
          >
            Toca cada círculo para explorar
          </motion.p>
        )}

        {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Content Area */}
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

        {/* Completion Message */}
        <AnimatePresence>
          {allCompleted && !activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem', padding: '2rem',
                background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,107,53,0.1))',
                borderRadius: '16px', border: '1px solid rgba(0,229,255,0.2)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#00E5FF', margin: '0 0 1rem', fontSize: '1.5rem' }}>
                ðŸ† ¡Has completado la Misión Científica!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado los increíbles avances científicos que transformarán nuestro futuro. ¿Estás listo para poner a prueba tus conocimientos?
              </p>
              <button style={{
                padding: '0.8rem 2rem', background: '#00E5FF', color: '#0B0E2D',
                border: 'none', borderRadius: '30px', fontWeight: 'bold',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 15px rgba(0,229,255,0.4)'
              }}>
                Ir al Quiz Final <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h5 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#00E5FF', opacity: 0.5 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
