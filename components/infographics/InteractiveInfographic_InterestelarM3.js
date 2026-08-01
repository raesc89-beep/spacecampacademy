'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Comet themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoComet({ size = 70, color = '#81D4FA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="40" r="8" fill={color} opacity="0.8" />
      <circle cx="20" cy="40" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M 24 36 L 50 10 L 55 15 L 28 42 Z" fill={color} opacity="0.3" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="48" cy="28" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCometTail({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 50 Q 30 40 50 10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round" />
      <path d="M 15 55 Q 35 45 55 15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M 5 45 Q 25 35 45 5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <circle cx="10" cy="50" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoOrbit({ size = 80, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="4 4" />
      <path d="M 5 20 Q 40 -10 75 20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFB300" opacity="0.7" />
      <circle cx="75" cy="20" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoMolecule({ size = 60, color = '#7E57C2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.8" />
      <circle cx="15" cy="15" r="5" fill={color} opacity="0.6" />
      <circle cx="45" cy="45" r="5" fill={color} opacity="0.6" />
      <line x1="19" y1="19" x2="26" y2="26" stroke={color} strokeWidth="2" />
      <line x1="34" y1="34" x2="41" y2="41" stroke={color} strokeWidth="2" />
      <line x1="21" y1="17" x2="28" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStarMap({ size = 70, color = '#FFB300', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
      <line x1="15" y1="20" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="40" x2="35" y2="50" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="40" x2="50" y2="25" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="15" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="45" cy="40" r="4" fill={color} opacity="0.9" />
      <circle cx="35" cy="50" r="2" fill={color} opacity="0.6" />
      <circle cx="50" cy="25" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-borisov': [DecoComet, DecoStarMap, DecoOrbit],
  'confirmacion-interestelar': [DecoOrbit, DecoCometTail, DecoStarMap],
  'primer-cometa-alien': [DecoCometTail, DecoMolecule, DecoComet],
  'composicion-molecular': [DecoMolecule, DecoOrbit, DecoCometTail],
  'nucleo-fragmentacion': [DecoComet, DecoMolecule, DecoStarMap],
  'sistema-origen': [DecoStarMap, DecoOrbit, DecoCometTail],
  'comparacion-oumuamua': [DecoOrbit, DecoComet, DecoMolecule],
}; const BIBLIOGRAPHY = ['Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", ApJ Letters, 886',
  'Bodewits, D. et al. (2020). "The carbon monoxide-rich interstellar comet 2I/Borisov", Nature Astronomy, 4',
  'Cordiner, M. et al. (2020). "Unusually high CO abundance of the first unambiguously identified interstellar comet", Nature Astronomy, 4',
  'Guzik, P. et al. (2020). "Initial characterization of interstellar comet 2I/Borisov", Nature Astronomy, 4',
  'Bailer-Jones, C.A.L. et al. (2020). "A search for the origin of the interstellar comet 2I/Borisov", A&A, 634'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'descubrimiento-borisov',
    title: 'El Descubrimiento',
    color: '#81D4FA',
    btnImage: '/assets/interestelar/infographic_m3/btn_descubrimiento-borisov.jpg',
    image: '/assets/interestelar/infographic_m3/hero_descubrimiento-borisov.jpg',
    content: [
      'El 30 de agosto de 2019, el astrónomo aficionado Gennady Borisov descubrió un objeto desde su observatorio en Crimea. Utilizó un telescopio de 0.65 metros que él mismo había construido. No dependía de agencias espaciales con grandes presupuestos, solo de su conocimiento y paciencia.',
      'El telescopio MARGO es una máquina de precisión con una relación focal rápida para captar objetos difusos. Esa madrugada, Borisov notó una pequeña mancha borrosa moviéndose en la constelación de Casiopea. Al principio, parecía un cometa ordinario, pero su trayectoria revelaría un secreto.',
      'Descubrir un cometa requiere tomar múltiples fotografías para detectar su movimiento. Borisov envió sus observaciones al Minor Planet Center, la organización responsable de catalogar objetos del sistema solar. El objeto recibió la designación temporal gb00234 mientras se confirmaba su identidad.',
      'Este hallazgo demuestra que el cielo nocturno todavía guarda secretos para quienes observan. Mientras los telescopios espaciales estudian galaxias lejanas, el espacio cercano nos sigue sorprendiendo. Borisov ya había descubierto otros cometas, pero atrapar a un visitante interestelar demostró el valor de la astronomía amateur.',
      'La noticia se propagó por observatorios de todo el mundo. Los astrónomos notaron que la trayectoria y la velocidad no correspondían a un cometa local. Comenzó una carrera contrarreloj para usar los grandes telescopios y confirmar si se trataba del segundo visitante interestelar detectado.'
    ],
    expandables: [
      { label: 'El Astrónomo y su Máquina', icon: 'zap', text: 'Gennady Borisov es un ingeniero y fabricante de telescopios. Construyó el instrumento MARGO para tener un campo de visión amplio y detectar cometas. Su éxito demuestra que la innovación individual puede competir con los presupuestos de las grandes agencias espaciales.' },
      { label: '¿Cómo se nombran los cometas?', icon: 'clock', text: 'Los cometas suelen llevar el nombre de sus descubridores. La Unión Astronómica Internacional rompió sus reglas y bautizó a este objeto como 2I/Borisov. El "2I" significa que es el segundo objeto interestelar confirmado (después de 1I/Oumuamua).' }
    ],
    fact: 'El cometa se descubrió a unas 3 unidades astronómicas del Sol, más allá de Marte. Aunque la temperatura era baja, fue suficiente para que los hielos de su superficie comenzaran a sublimarse. Esto formó la coma brillante que permitió a Borisov detectarlo.'
  },
  {
    id: 'confirmacion-interestelar',
    title: 'Confirmación Interestelar',
    color: '#1565C0',
    btnImage: '/assets/interestelar/infographic_m3/btn_confirmacion-interestelar.jpg',
    image: '/assets/interestelar/infographic_m3/hero_confirmacion-interestelar.jpg',
    content: [
      'La órbita de un objeto indica su origen. Los objetos de nuestro sistema solar viajan en órbitas elípticas. La excentricidad mide cuán alargado es ese óvalo, y para los objetos locales es menor a 1. Una excentricidad de 1 representa el límite para escapar de la gravedad.',
      'Los cálculos mostraron que la órbita de Borisov tenía una excentricidad de 3.36. Una cifra mayor a 1 indica una órbita hiperbólica y abierta. El número era tan alto que confirmaba que este cometa venía del espacio profundo y no volvería jamás.',
      'Borisov entró al sistema solar a 32.2 kilómetros por segundo (116,000 kilómetros por hora). A esa velocidad, la gravedad del Sol no era lo suficientemente fuerte para capturarlo. Solo logró desviar ligeramente su trayectoria antes de que el cometa regresara al espacio interestelar.',
      'La confirmación oficial llegó mediante el Minor Planet Center y la NASA. La Unión Astronómica Internacional creó una nueva clasificación y lo rebautizó como 2I/Borisov. Esto abrió la puerta al estudio de objetos de otras estrellas.',
      'A diferencia de Oumuamua (descubierto en 2017), Borisov fue encontrado meses antes de alcanzar su perihelio. Oumuamua nos sorprendió cuando ya se alejaba, mientras que Borisov nos dio tiempo para planificar observaciones. Así, los astrónomos pudieron usar el Telescopio Hubble para estudiarlo detalladamente.'
    ],
    expandables: [
      { label: 'Matemáticas del Infinito', icon: 'atom', text: 'Un círculo perfecto tiene excentricidad 0, y la Tierra tiene 0.016. Los cometas locales típicos tienen entre 0.9 y 0.99. Una excentricidad de 3.36 significa que la energía cinética del cometa era superior a la energía potencial gravitatoria del Sol.' },
      { label: 'La Velocidad de Escape', icon: 'zap', text: 'Para capturar un objeto, este debe moverse por debajo de la velocidad de escape, que es unos 24 km/s. Borisov viajaba a más de 30 km/s. Ningún cuerpo del sistema solar podía frenarlo lo suficiente para retenerlo.' }
    ],
    fact: 'El Telescopio Espacial Hubble capturó imágenes de 2I/Borisov a 300 millones de kilómetros de la Tierra. Fue la primera vez que se observó en detalle el núcleo brillante y la atmósfera de un cometa de otro sistema planetario.'
  },
  {
    id: 'primer-cometa-alien',
    title: 'Primer Cometa de Otro Sistema',
    color: '#00BCD4',
    btnImage: '/assets/interestelar/infographic_m3/btn_primer-cometa-alien.jpg',
    image: '/assets/interestelar/infographic_m3/hero_primer-cometa-alien.jpg',
    content: [
      'Oumuamua nos sorprendió porque no tenía coma ni cola. Sin embargo, Borisov se comportó como un cometa clásico. Presentaba una nube brillante de gas y una cola de polvo que apuntaba lejos del Sol. Era un visitante interestelar pero con características muy familiares.',
      'Un cometa es una "bola de nieve sucia" compuesta de hielos, polvo y rocas. Cuando se acerca al Sol, el hielo pasa directamente de sólido a gas mediante sublimación. El gas arrastra partículas de polvo y forma la coma y la cola.',
      'Borisov demostró que el proceso de formación de cometas no es exclusivo de nuestro sistema solar. El hecho de que se comporte como un cometa local indica que hay física y química similares en otras estrellas. Existen nubes de asteroides en exoplanetas esperando ser expulsadas.',
      'Los análisis mostraron que Borisov expulsaba gas y polvo a tasas similares a los cometas locales. Se detectó cianógeno y carbono diatómico, componentes que dan el tono verdoso a los cometas de nuestro sistema solar. Parecía un residente temporal de nuestro vecindario estelar.',
      'Este objeto era una reliquia inestimable. Había viajado a temperaturas cercanas al cero absoluto durante miles de millones de años. Al calentarse bajo nuestro Sol, liberó gases sellados en otro sistema estelar. Su coma era una muestra primordial de un mundo lejano.'
    ],
    expandables: [
      { label: 'El Verdadero Oumuamua', icon: 'zap', text: 'Oumuamua se comportó como un asteroide seco, lo que indica que los sistemas estelares expulsan diversos escombros. Pueden ser rocosos o helados, dependiendo de la región de origen. Borisov representa a los objetos helados de los confines de su sistema.' },
      { label: 'La Coma y el Viento Solar', icon: 'atom', text: 'La coma puede ser más grande que Júpiter, aunque el núcleo mida pocos kilómetros. La cola apunta lejos del Sol debido a que el viento solar y la presión de radiación empujan el gas y el polvo hacia atrás.' }
    ],
    fact: 'Las observaciones del Hubble indicaron que el tamaño de la coma era enorme. Las partículas de polvo tenían propiedades de dispersión de luz casi idénticas a las del cometa Hale-Bopp, lo que sugiere procesos de formación similares.'
  },
  {
    id: 'composicion-molecular',
    title: 'Composición Molecular',
    color: '#7E57C2',
    btnImage: '/assets/interestelar/infographic_m3/btn_composicion-molecular.jpg',
    image: '/assets/interestelar/infographic_m3/hero_composicion-molecular.jpg',
    content: [
      'Aunque Borisov parecía un cometa local, los astrónomos descubrieron que su química era inusual. Utilizaron la espectroscopia para descomponer su luz y encontrar componentes químicos específicos. Al leer este código de luz, detectaron una composición extraordinaria.',
      'El hallazgo más sorprendente fue la enorme cantidad de monóxido de carbono (CO). En nuestros cometas, el agua es más abundante y el CO es bajo. Sin embargo, ALMA y el Hubble detectaron que el gas CO en Borisov era entre 9 y 26 veces más abundante que en los cometas locales.',
      'El monóxido de carbono necesita temperaturas por debajo de los -250 grados Celsius (20 Kelvin) para congelarse. Si Borisov está lleno de hielo de CO, se formó en un entorno muy frío. Debió nacer en los confines más alejados de su sistema estelar nativo.',
      'Además del monóxido de carbono, detectaron cianuro de hidrógeno e isótopos poco comunes. El hielo de agua sugirió que había estado expuesto a la radiación cósmica interestelar. El cometa es una cápsula del tiempo que muestra el impacto del espacio profundo durante su viaje.',
      'Esta química sugiere que Borisov podría haberse formado alrededor de una estrella enana roja, donde las temperaturas son menores. También podría provenir de un disco protoplanetario rico en carbono. Esto demuestra que los ingredientes de los sistemas planetarios varían en la Vía Láctea.'
    ],
    expandables: [
      { label: 'El Observatorio ALMA', icon: 'zap', text: 'El Atacama Large Millimeter/submillimeter Array (ALMA) es un conjunto de antenas de radio en Chile. Fue clave para detectar CO en Borisov porque este gas emite ondas de radio específicas al rotar en el frío del espacio, imposibles de ver con telescopios ópticos.' },
      { label: 'Veneno Interestelar', icon: 'atom', text: 'El monóxido de carbono y el cianuro de hidrógeno son comunes en las frías nubes moleculares del espacio interestelar. Aunque son tóxicos en la Tierra, en la astroquímica su presencia indica condiciones de baja temperatura de formación.' }
    ],
    fact: 'Borisov expulsaba varios kilogramos de monóxido de carbono por segundo. Emitía tanto gas como varios automóviles acelerando al máximo, proveniente de un núcleo de hielo de menos de un kilómetro de diámetro calentándose.'
  },
  {
    id: 'nucleo-fragmentacion',
    title: 'El Núcleo y la Fragmentación',
    color: '#69F0AE',
    btnImage: '/assets/interestelar/infographic_m3/btn_nucleo-fragmentacion.jpg',
    image: '/assets/interestelar/infographic_m3/hero_nucleo-fragmentacion.jpg',
    content: [
      'En el centro de cada cometa hay un núcleo sólido. Como están rodeados por la coma brillante, observarlo es difícil. Los astrónomos usaron el Hubble para medir su luz central y estimaron que el radio de Borisov era entre 400 y 1000 metros.',
      'El núcleo era una pequeña montaña de hielo frágil que había sobrevivido un largo viaje espacial. En diciembre de 2019, alcanzó su perihelio a 300 millones de kilómetros del Sol. Esa distancia generó una ola de calor catastrófica para el cometa helado.',
      'El hielo comenzó a hervir, fisurando la estructura del cometa. Los cometas son objetos porosos y frágiles, unidos débilmente. Los gases volátiles, como el monóxido de carbono, explotaron hacia el exterior y ejercieron presiones extremas sobre el núcleo.',
      'En marzo de 2020, el cometa se rompió. Los telescopios detectaron múltiples fragmentos dentro de la coma de Borisov. Un trozo importante del núcleo se desprendió debido a los estallidos de gas. Ocurrió a 100,000 kilómetros por hora en el vacío del espacio.',
      'Afortunadamente, el núcleo principal no se desintegró por completo. El fragmento más pequeño se desvaneció, pero Borisov continuó su viaje. Llevando cicatrices del encuentro con nuestra estrella, se alejó a gran velocidad para nunca volver a nuestro sistema solar.'
    ],
    expandables: [
      { label: 'El Efecto Cohete', icon: 'zap', text: 'Los chorros de gas de los cometas actúan como diminutos motores. Empujan físicamente al núcleo y causan aceleración no gravitacional. Esto altera ligeramente la trayectoria del cometa y es un factor que los astrónomos consideran al calcular órbitas.' },
      { label: 'Como un Azucarillo', icon: 'atom', text: 'Se estima que la densidad típica del núcleo de un cometa es menor a 0.5 g/cm³. Si hubiera un océano lo suficientemente grande, flotarían. Son muy porosos, a diferencia de las rocas sólidas de los asteroides.' }
    ],
    fact: 'El evento de fragmentación en marzo de 2020 aumentó el brillo del cometa. El nuevo material helado en las fracturas del núcleo se sublimó furiosamente, arrojando nubes de polvo reflectante que fueron observadas desde la Tierra.'
  },
  {
    id: 'sistema-origen',
    title: '¿De Dónde Vino?',
    color: '#FFB300',
    btnImage: '/assets/interestelar/infographic_m3/btn_sistema-origen.jpg',
    image: '/assets/interestelar/infographic_m3/hero_sistema-origen.jpg',
    content: [
      'La principal duda era identificar la estrella de origen de Borisov. La misión Gaia de la Agencia Espacial Europea mapeó más de mil millones de estrellas en nuestra galaxia. Conociendo la trayectoria del cometa, los astrónomos pudieron rastrear posibles orígenes en el espacio profundo.',
      'Un equipo trazó la ruta millones de años hacia el pasado. Encontraron como candidato al sistema estelar Kruger 60, a unos 13 años luz de distancia. Hace un millón de años, Borisov pasó a poca distancia y velocidad cerca de este sistema.',
      'Kruger 60 es un par de estrellas enanas rojas frías y pequeñas. Borisov podría haber sido expulsado desde los bordes de este sistema por planetas gigantes en migración. La gravedad de esos planetas actuaría como una catapulta para lanzar cometas al espacio.',
      'Sin embargo, las incertidumbres crecen al retroceder tanto en el tiempo. Kruger 60 es una opción, pero también se cree que Borisov pudo nacer en un entorno rico en carbono. Podría haber sido expulsado de su órbita debido a la interacción violenta de estrellas vecinas.',
      'El descubrimiento de Borisov confirma que el espacio interestelar está lleno de cometas y asteroides expulsados. Estos objetos flotan solitarios en la galaxia. Solo podemos observar aquellos que pasan por nuestro sistema solar interior y son iluminados por el Sol.'
    ],
    expandables: [
      { label: 'La Misión Gaia', icon: 'zap', text: 'El satélite Gaia mide la posición y el movimiento de más de mil millones de estrellas con extrema precisión. Sin este mapa tridimensional, sería imposible rastrear el origen de Borisov, ya que desconoceríamos las posiciones estelares del pasado.' },
      { label: 'El Tirachinas Gravitacional', icon: 'clock', text: 'Los planetas gigantes expulsan material cósmico durante la formación planetaria. En nuestro sistema solar, Júpiter y Neptuno arrojaron billones de rocas y cometas al espacio profundo. Probablemente, otros sistemas planetarios dispersen objetos de manera similar.' }
    ],
    fact: 'La probabilidad de que un cometa interestelar choque con la Tierra es cercana a cero. No obstante, los astrónomos calculan que miles de estos objetos viajan silenciosamente por los límites de nuestro sistema solar en un momento dado.'
  },
  {
    id: 'comparacion-oumuamua',
    title: 'Borisov vs Oumuamua',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m3/btn_comparacion-oumuamua.jpg',
    image: '/assets/interestelar/infographic_m3/hero_comparacion-oumuamua.jpg',
    content: [
      'Borisov y Oumuamua presentaron contrastes enormes que muestran la diversidad cósmica. Oumuamua era alargado, inactivo, no tenía polvo y lucía un tono rojizo. Parecía un fragmento de roca de un planeta destruido y sus movimientos inusuales provocaron muchas especulaciones.',
      'En cambio, Borisov se comportó como un cometa tradicional. Presentaba una coma brillante y una cola de polvo. Esta normalidad indicó que los procesos de formación de la Nube de Oort ocurren de manera similar en otros sistemas planetarios de la Vía Láctea.',
      'Ambos objetos compartían su alta velocidad. Oumuamua viajaba a 26 kilómetros por segundo, mientras que Borisov lo hacía a 32. Estas trayectorias hiperbólicas confirmaron su origen extrasolar. Los dos cruzaron nuestro sistema solar y regresaron rápidamente al espacio profundo.',
      'La química reveló sus orígenes distintos. Oumuamua estaba seco, quizás tostado por una estrella o proveniente de un sistema interno caliente. Borisov estaba repleto de monóxido de carbono, lo que indica un origen en la periferia helada de su sistema estelar original.',
      'Estos descubrimientos inauguraron un nuevo campo científico para estudiar visitantes interestelares. Astrónomos preparan el Observatorio Vera C. Rubin, que escaneará el cielo continuamente. Su objetivo es descubrir muchos más de estos objetos cada año para estudiar sistemas distantes.'
    ],
    expandables: [
      { label: 'El Misterio de la Forma', icon: 'zap', text: 'Las fluctuaciones de brillo de Oumuamua sugerían una forma alargada y giros caóticos. Borisov no mostró estas variaciones drásticas, indicando un núcleo más redondo y simétrico, similar a cometas conocidos como Halley.' },
      { label: 'El Telescopio Vera Rubin', icon: 'atom', text: 'El Observatorio Vera C. Rubin tiene una cámara de 3200 megapíxeles. Fotografiará el cielo visible repetidamente y detectará objetos de movimiento rápido en órbitas inusuales. Avisará a los astrónomos con meses de antelación.' }
    ],
    fact: 'Oumuamua y Borisov ya han cruzado la órbita de Júpiter y se adentran en el espacio profundo. Viajan a tal velocidad que nuestras sondas espaciales actuales no pueden alcanzarlos. Continuarán su viaje por la Vía Láctea para siempre.'
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
      hue: Math.random() > 0.5 ? '129,212,250' : '21,101,192', // ice blue or deep blue
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

// â”€â”€â”€ Comet Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CometHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(129,212,250,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#cometGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#81D4FA','#1565C0','#00BCD4','#7E57C2','#69F0AE','#FFB300','#B3E5FC'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Comet icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#81D4FA" strokeWidth="1.5" opacity="0.6" />
        <circle cx="296" cy="34" r="4" fill="#81D4FA" opacity="0.8" />
        <path d="M 300 30 Q 315 15 325 5" fill="none" stroke="#81D4FA" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="cometGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(129,212,250,0.2)" />
            <stop offset="50%" stopColor="rgba(129,212,250,0.9)" />
            <stop offset="100%" stopColor="rgba(129,212,250,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#81D4FA" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">2I/BORISOV</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(129,212,250,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">EL COMETA ERRANTE</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(129,212,250,0.2)'}`,
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
          layoutId="activeDotComet"
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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Body Grid â”€â”€â”€ */}
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

        {/* â”€â”€â”€ Expandable Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            marginTop: '1.5rem', position: 'relative', zIndex: 2,
          }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
            ))}
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem', padding: '1.2rem',
          background: `linear-gradient(90deg, ${node.color}20, transparent)`,
          borderLeft: `4px solid ${node.color}`, borderRadius: '0 12px 12px 0',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          position: 'relative', zIndex: 2,
        }}>
          <Star size={24} style={{ color: node.color, flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
            {node.fact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, activeId, explored }) {
  const progress = (explored.size / nodes.length) * 100;
  return (
    <div style={{ marginTop: '2rem', padding: '0 1rem', maxWidth: '400px', margin: '2rem auto 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Exploración del Cometa</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #81D4FA, #00BCD4)',
            boxShadow: '0 0 10px rgba(129,212,250,0.5)',
          }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM3() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      setExplored(prev => new Set(prev).add(id));
    }
  };

  const activeNodeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(to bottom, #050814, #0a1128)',
      borderRadius: '24px',
      padding: '2rem',
      color: 'white',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(129,212,250,0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '800px',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CometHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          margin: '2rem 0',
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

        {/* Active Content Panel */}
        <AnimatePresence mode="wait">
          {activeNodeData && (
            <ContentPanel
              key={activeNodeData.id}
              node={activeNodeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        <ProgressBar nodes={INFOGRAPHIC_NODES} activeId={activeNode} explored={explored} />

        {/* Bibliography */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '16px',
          border: '1px solid rgba(129,212,250,0.15)',
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'rgba(129,212,250,0.8)', letterSpacing: '1px' }}>
            REFERENCIAS Y FUENTES
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
