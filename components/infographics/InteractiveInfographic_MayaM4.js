'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

function DecoTzolkinWheel({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a,i) => (
        <line key={i} x1="30" y1="25" x2="30" y2="15" stroke={color} strokeWidth="1.5" transform={`rotate(${a} 30 30)`} />
      ))}
    </svg>
  );
}

function DecoNumberSpiral({ size = 70, color = '#FFC107', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 30 Q35 25 40 30 T30 45 T15 30 T30 10 T50 30 T30 55 T5 30" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2" fill={color} />
      <circle cx="40" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="45" r="1.5" fill={color} />
    </svg>
  );
}

function DecoDayGlyph({ size = 70, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="15" width="30" height="30" rx="8" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="25" r="3" fill={color} />
      <circle cx="38" cy="25" r="3" fill={color} />
      <path d="M25 40 Q30 45 35 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 15 v10" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoStar13({ size = 70, color = '#00838F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,5 35,25 55,25 40,35 45,55 30,40 15,55 20,35 5,25 25,25" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <circle cx="30" cy="15" r="1.5" fill={color} />
      <circle cx="15" cy="30" r="1.5" fill={color} />
      <circle cx="45" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="45" r="1.5" fill={color} />
    </svg>
  );
}

function DecoCornStalk({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 60 Q30 30 30 5" fill="none" stroke={color} strokeWidth="2" />
      <path d="M30 40 Q20 30 15 45" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q40 20 45 35" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 20 Q20 10 15 25" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="10" r="2" fill={color} />
      <circle cx="32" cy="12" r="2" fill={color} />
      <circle cx="28" cy="14" r="2" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'tzolkin-estructura': [DecoTzolkinWheel, DecoNumberSpiral, DecoDayGlyph],'veinte-dias': [DecoDayGlyph, DecoCornStalk, DecoStar13],
  'trece-numeros': [DecoNumberSpiral, DecoStar13, DecoTzolkinWheel],'destino-nacimiento': [DecoStar13, DecoDayGlyph, DecoNumberSpiral],'ciclo-agricola-ritual': [DecoCornStalk, DecoTzolkinWheel, DecoDayGlyph],'sacerdotes-contadores': [DecoNumberSpiral, DecoStar13, DecoCornStalk],'mesoamerica-universal': [DecoTzolkinWheel, DecoDayGlyph, DecoNumberSpiral],
}; const BIBLIOGRAPHY = ['Coe, M.D. (2011). The Maya, Thames & Hudson',
  'Tedlock, B. (1992). Time and the Highland Maya, University of New Mexico Press',
  'Rice, P.M. (2007). Maya Calendar Origins, University of Texas Press',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  "Freidel, D., Schele, L. & Parker, J. (1993). Maya Cosmos: Three Thousand Years on the Shaman's Path, William Morrow"
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tzolkin-estructura',
    title: 'Estructura',
    color: '#7B1FA2',
    btnImage: '/assets/maya/infographic_m4/btn_tzolkin-estructura.jpg',
    image: '/assets/maya/infographic_m4/hero_tzolkin-estructura.jpg',
    content: [
      'El calendario sagrado maya se llama Tzolkin. Funciona con dos ruedas giratorias en lugar de meses largos. Una rueda muestra números del uno al trece, y la otra tiene veinte nombres de días. Cada mañana, ambas avanzan un paso simultáneo, creando combinaciones únicas.',
      'El ciclo dura exactamente 260 días porque es el resultado de multiplicar trece por veinte. Esta cantidad no coincide con el año solar, pero se aproxima al periodo de gestación humana en el vientre materno. Los mayas combinaron este ciclo biológico con sus observaciones astronómicas.',
      'El Tzolkin no tiene un día de año nuevo fijo. Actúa como un ciclo continuo que se reinicia al llegar a la última combinación. Funciona como una bicicleta, donde cada impulso hace girar simultáneamente el engranaje de números y la rueda de días.',
      'Para documentar las fechas, los escribanos mayas usaban un sistema numérico de puntos y barras. Un punto valía uno y una barra valía cinco. Junto al número, dibujaban el símbolo del día correspondiente. Dominar este método de escritura requería extensa preparación.',
      'Los arqueólogos han descubierto fechas talladas en monumentos de piedra antigua. Aunque imperios enteros cayeron, varias comunidades indígenas mantienen la cuenta ininterrumpida desde hace milenios.'
    ],
    expandables: [
      { label: 'Un Ciclo Sin Fin', icon: 'clock', text: 'El ciclo de 260 días se repite sin interrupciones ni días compensatorios. Funciona como un eslabón continuo de registro temporal a través de los siglos.' },
      { label: 'Matemática Maya', icon: 'atom', text: 'El sistema vigesimal maya (base 20) se derivaba del conteo con los dedos de manos y pies. Multiplicar trece por veinte genera el periodo exacto de 260 días.' }
    ],
    fact: 'El término Tzolkin es una invención arqueológica moderna que significa "cuenta de días" en maya yucateco. El vocablo original utilizado por los antiguos mayas aún es objeto de debate.'
  },
  {
    id: 'veinte-dias',
    title: 'Los 20 Días',
    color: '#FFC107',
    btnImage: '/assets/maya/infographic_m4/btn_veinte-dias.jpg',
    image: '/assets/maya/infographic_m4/hero_veinte-dias.jpg',
    content: [
      'El ciclo sagrado posee veinte días únicos. Cada jornada tiene un nombre y un símbolo distintivo. El recorrido comienza con Imix, representado como un lirio acuático o un cocodrilo en aguas primordiales. Simboliza la tierra fértil flotando sobre el océano.',
      'El segundo día, Ik, representa el viento y el aliento vital. Su símbolo tiene forma de "T", evocando la entrada de los templos y el viento que mantiene el fuego y la voz. Tras la tierra primordial de Imix, Ik trae vida dinámica.',
      'El tercer día es Akbal, la oscuridad nocturna. Su ícono gráfico es la cabeza de un murciélago o las manchas del jaguar. Recuerda que las semillas germinan en la oscuridad. El cuarto día, Kan, simboliza la semilla madura de maíz.',
      'El quinto glifo es Chicchan, la serpiente celestial portadora de lluvias. En la visión maya, representaba la energía del agua. Los demás días recorren elementos como el pedernal, el perro guía, el mono, la muerte y el sol.',
      'Cada día encierra un presagio que dictaba las acciones recomendadas para la comunidad. Algunos días eran propicios para arrancar labores o viajar, y otros para honrar a los ancestros. Este vocabulario cósmico estructuraba la vida y el orden social.'
    ],
    expandables: [
      { label: 'Secuencia Natural', icon: 'clock', text: 'La secuencia de días refleja una narrativa cronológica. Inicia con agua, sigue con el viento dador de vida, luego la noche que cobija la germinación y finaliza con el sol.' },
      { label: 'El Mono Artesano', icon: 'clock', text: 'El día once, Chuwen, muestra el rostro de un mono. Los monos eran patronos de artistas y artesanos. Se creía que los nacidos en este día poseían grandes dotes creativas.' }
    ],
    fact: 'Muchos de los glifos de los 20 días incorporan elementos de la flora y fauna mesoamericana. Por ejemplo, el glifo Ix muestra tres manchas negras que imitan el pelaje del jaguar.'
  },
  {
    id: 'trece-numeros',
    title: 'Los 13 Números',
    color: '#C62828',
    btnImage: '/assets/maya/infographic_m4/btn_trece-numeros.jpg',
    image: '/assets/maya/infographic_m4/hero_trece-numeros.jpg',
    content: [
      'El número trece ocupa un lugar sagrado en la cosmovisión mesoamericana. Según los mitos de creación, existían trece niveles celestiales escalonados superiores a la tierra, contrastando con los nueve planos del inframundo.',
      'El calendario Tzolkin combina este número trece (asociado al firmamento) con el veinte (asociado a la base biológica humana). La cuenta va del uno al trece y salta de nuevo al uno, continuando su combinación infinita con la rueda de los días.',
      'Esta estructura cíclica agrupa los días en bloques conocidos como "trecenas", periodos de trece jornadas continuas que funcionaban como las semanas actuales. Cada trecena está presidida por la influencia o deidad del día número uno que la encabeza.',
      'Los chamanes mayas relacionaron el número trece con el cuerpo humano al contabilizar trece articulaciones mayores (cuello, hombros, codos, muñecas, caderas, rodillas y tobillos). Consideraban que el humano reproducía la geometría del cielo estrellado.',
      'La cuenta giratoria del uno al trece formaba un ciclo de energía rítmica. El primer día de trecena representaba el arranque; los días intermedios marcaban el desarrollo, y el trece significaba la conclusión madura.'
    ],
    expandables: [
      { label: 'Anatomía y Cosmos', icon: 'clock', text: 'La conexión de las trece articulaciones humanas simbolizaba cómo el orden del universo se repetía en el cuerpo físico del individuo.' },
      { label: 'Las 20 Trecenas', icon: 'atom', text: 'El ciclo sagrado de 260 días se organiza en 20 trecenas (bloques de 13 días). Toda la aritmética maya refleja simetría y ritmos cósmicos.' }
    ],
    fact: 'El trece era tan importante que el panteón de los dioses celestiales principales se organizaba en una asamblea de exactamente trece divinidades conocidas como Oxlahuntiku.'
  },
  {
    id: 'destino-nacimiento',
    title: 'Destino al Nacer',
    color: '#00838F',
    btnImage: '/assets/maya/infographic_m4/btn_destino-nacimiento.jpg',
    image: '/assets/maya/infographic_m4/hero_destino-nacimiento.jpg',
    content: [
      'Al momento de nacer, tu coordenada calendárica en el Tzolkin determinaba tu carácter y tu vocación, formando parte de tu nombre. La comunidad entera trataba esta lectura como un indicador vital del destino individual.',
      'Por ejemplo, nacer en un día "8 Batz" (ocho mono) era señal de destreza manual y talento creativo. Un niño nacido en esa fecha estaba destinado a ser artesano o tejedor, y la profesión se asumía como una misión dictada por el calendario.',
      'Este destino calendárico orientaba la educación de los niños. A los nacidos bajo el signo de la guerra o el pedernal se les entrenaba como guerreros y se les enseñaba a dominar su propensión natural al conflicto o el enojo repentino.',
      'Antes del matrimonio, especialistas consultaban el calendario para comparar las energías de ambos contrayentes. Buscaban verificar si la pareja compartía presagios compatibles antes de unir sus vidas.',
      'Actualmente, en las comunidades de Guatemala, muchas familias kiche mantienen esta tradición y determinan la personalidad y vocación de los niños analizando el calendario sagrado de 260 días.'
    ],
    expandables: [
      { label: 'Un Nombre, Una Misión', icon: 'clock', text: 'Personajes históricos como el gobernante "Ocho Venado" llevaban su fecha de nacimiento como nombre propio principal e indicativo de su naturaleza.' },
      { label: 'Fechas Temibles', icon: 'atom', text: 'Las configuraciones calendáricas desafortunadas, como los últimos cinco días del ciclo solar Haab, requerían rituales de compensación al momento de nacer.' }
    ],
    fact: 'En las tierras altas de Guatemala, la población indígena aún celebra el cumpleaños Tzolkin de las personas (que ocurre cada 260 días) con ceremonias tradicionales.'
  },
  {
    id: 'ciclo-agricola-ritual',
    title: 'Ciclo Ritual',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m4/btn_ciclo-agricola-ritual.jpg',
    image: '/assets/maya/infographic_m4/hero_ciclo-agricola-ritual.jpg',
    content: [
      'El Tzolkin era una herramienta práctica para las actividades cotidianas y agrarias. Sus ciclos conectaban la matemática astronómica con el ritmo biológico y agrícola de las poblaciones mayas en Mesoamérica.',
      'La similitud entre los 260 días del ciclo y el periodo promedio de gestación humana fortaleció la idea de interdependencia entre los astros lejanos y la biología corporal terrestre.',
      'En algunas latitudes geográficas del sur, los 260 días marcan la distancia entre los dos pasos del sol por el cénit anual (cuando no proyecta sombra). Este marcador solar determinaba los ritmos agrícolas.',
      'La agenda ritual empataba las fechas del Tzolkin con el ciclo de cultivo del maíz. Fallar en la sincronización de siembra y ofrendas se consideraba un riesgo para la alimentación comunitaria.',
      'Los astrónomos utilizaban el ciclo de 260 jornadas junto a observaciones de planetas como Venus, creando mecanismos que les permitían sincronizar eclipses y eventos orbitales clave en un solo reloj calendárico.'
    ],
    expandables: [
      { label: 'El Paso Cenital', icon: 'atom', text: 'En regiones como Copán, el intervalo de 260 días exactos entre los pasos del sol cenital probablemente inspiró el nacimiento de este calendario en la antigüedad.' },
      { label: 'Venus y la Guerra', icon: 'atom', text: 'Los astrónomos sincronizaban el Tzolkin con las órbitas de Venus. Este planeta se asociaba con la guerra, dictando momentos precisos para campañas militares.' }
    ],
    fact: 'Las comunidades mayas actuales siguen empleando el ciclo adivinatorio agrario de 260 días para guiar las fechas de siembra y planificar fiestas patronales.'
  },
  {
    id: 'sacerdotes-contadores',
    title: 'Los Sacerdotes Contadores',
    color: '#263238',
    btnImage: '/assets/maya/infographic_m4/btn_sacerdotes-contadores.jpg',
    image: '/assets/maya/infographic_m4/hero_sacerdotes-contadores.jpg',
    content: [
      'El mantenimiento de este sistema matemático requería especialistas entrenados. Existía una jerarquía dedicada a la observación astronómica y calendárica. Aún se conocen en Guatemala como "aj qij" o Contadores de los Días.',
      'Estos chamanes utilizaban cristales de cuarzo y semillas de colorín en pequeños envoltorios de tela. Al esparcir y organizar las semillas sobre un altar, calculaban fechas en un proceso místico y matemático.',
      'El conocimiento profundo del calendario no era público, sino un saber esotérico y protegido. Se transmitía a aprendices solo después de rigurosas iniciaciones y extensa disciplina preparatoria.',
      'Su rol era central para la sociedad. Además de marcar tiempos de siembra o matrimonio, actuaban como asesores y orientadores de la comunidad, indicando los ritos necesarios para afrontar problemas cotidianos.',
      'La supervivencia de la cuenta ininterrumpida de días hasta hoy es mérito de estos sabios. Durante siglos defendieron su matemática del acecho colonial e inquisitorial y mantuvieron viva esta reliquia cronológica cultural.'
    ],
    expandables: [
      { label: 'La Resistencia Viva', icon: 'clock', text: 'El calendario adivinatorio jamás perdió un solo día durante la conquista y colonización, logrando sostenerse intacto gracias a la resistencia pacífica en la clandestinidad.' },
      { label: 'Iniciación Chamánica', icon: 'clock', text: 'El aprendizaje iniciático incluye años de entrenamiento riguroso. Los aprendices recogen ceremoniales en las montañas sagradas antes de ser reconocidos.' }
    ],
    fact: 'El vocablo quiché "aj qij" se traduce como "Aquel del sol o Aquel del día". Su función es ser el mediador interpretativo entre las deidades calendáricas y las personas.'
  },
  {
    id: 'mesoamerica-universal',
    title: 'Calendario Universal',
    color: '#FF5722',
    btnImage: '/assets/maya/infographic_m4/btn_mesoamerica-universal.jpg',
    image: '/assets/maya/infographic_m4/hero_mesoamerica-universal.jpg',
    content: [
      'El ciclo ritual de los 260 días no fue exclusivo de los mayas. Operó como un calendario estándar en todo el territorio mesoamericano y sus diversas culturas, conectando el norte, el altiplano y la costa.',
      'La cultura azteca conocía esta misma cuenta bajo el nombre náhuatl "Tonalpohualli", y mantenía la estructura de trece números combinados con veinte signos patronímicos.',
      'Civilizaciones más distantes, como los zapotecas y mixtecos en Oaxaca, emplearon el mismo sistema temporal cíclico, utilizando nombres y glifos pictográficos propios pero manteniendo el reloj idéntico.',
      'Esta universalidad sugiere que el ciclo fue concebido en el albor de la historia formativa de la región, probablemente por la civilización matriz olmeca de la costa del Golfo.',
      'Esta herramienta interconectada permitía a reinos enemigos calibrar sus augurios en el mismo formato matemático, proveyendo a toda Mesoamérica de un marco cósmico y de convivencia unificado.'
    ],
    expandables: [
      { label: 'El Origen Olmeca', icon: 'atom', text: 'Se sospecha que la matriz originaria de este ciclo calendario de 260 días nació entre los olmecas costeros y se dispersó al resto de las culturas vecinas.' },
      { label: 'Un Interlingua', icon: 'atom', text: 'Aunque culturas distintas hablaran idiomas irreconocibles entre sí, el calendario funcionaba como un lenguaje matemático cósmico que todo mesoamericano comprendía.' }
    ],
    fact: 'El Códice Borgia de origen mixteco-puebla es hoy en día uno de los manuales adivinatorios precolombinos mejor preservados de este ciclo análogo de 260 días.'
  }
];

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
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      hue: Math.random() > 0.5 ? '200, 150, 50' : '50, 150, 100',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.05;
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

function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(123,31,162,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#7B1FA2', '#FFC107', '#C62828', '#00838F', '#2E7D32', '#263238', '#FF5722'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFC107" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FFC107" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FFC107" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(123,31,162,0.2)" />
            <stop offset="50%" stopColor="rgba(255,193,7,0.9)" />
            <stop offset="100%" stopColor="rgba(123,31,162,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFC107" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL Tzolkin</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SAGRADO DE 260 DÍAS</text>
      </svg>
    </div>
  );
}

function ProgressBar({ explored, total, color }) {
  const progress = (explored / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem', textAlign: 'center', zIndex: 2, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
        <span>PROGRESO DEL CONOCIMIENTO</span>
        <span>{explored} / {total} NODOS</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.2)'}`,
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
          layoutId="activeDotMayaM4"
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
          padding: '0.8rem 1rem', background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
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
            initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem',
            }}>
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 15, 25, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px', position: 'relative', zIndex: 3,
        marginTop: '1rem', overflow: 'hidden',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
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
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
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
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D', fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{
            marginTop: '1.5rem', padding: '1.2rem', borderRadius: '12px',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px dashed ${node.color}40`, display: 'flex', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: `${node.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Star size={20} color={node.color} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '0.9rem', letterSpacing: '0.5px' }}>DATO CIENTÍFICO</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function InteractiveInfographic_MayaM4() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const scrollRef = useRef(null);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!exploredNodes.has(id)) {
      setExploredNodes(new Set(exploredNodes).add(id));
    }
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem',
      background: 'linear-gradient(to bottom, #0A0C16, #121525)',
      borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden', minHeight: '800px',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <MayaHeader />
        
        <div style={{ marginTop: '3rem' }}>
          <ProgressBar explored={exploredNodes.size} total={INFOGRAPHIC_NODES.length} color="#FFC107" />
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem',
          margin: '2rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)',
          borderRadius: '20px', backdropFilter: 'blur(10px)',
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

        <div ref={scrollRef}>
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
        </div>

        <div style={{
          marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center', position: 'relative', zIndex: 2,
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '1rem' }}>
            FUENTES Y BIBLIOGRAFÍA
          </h4>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '600px' }}>
                {bib}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
