'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoMayaPyramid({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L45 50 L15 50 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M25 10 L35 10 L35 20 L40 20 L40 30 L45 30 L45 40 L50 40 L50 50 L10 50 L10 40 L15 40 L15 30 L20 30 L20 20 L25 20 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <rect x="25" y="40" width="10" height="10" fill={color} opacity="0.5" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="30" x2="40" y2="30" stroke={color} strokeWidth="1.5" />
      <line x1="25" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoVenusStar({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 15 L33 27 L45 30 L33 33 L30 45 L27 33 L15 30 L27 27 Z" fill={color} opacity="0.5" />
      <circle cx="18" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="42" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="18" cy="42" r="3" fill={color} opacity="0.6" />
      <circle cx="42" cy="42" r="3" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoSerpent({ size = 70, color = '#26C6DA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 20 30 40 T50 20" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M10 40 Q20 20 30 40 T50 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="35" r="2" fill={color} />
      {/* Plumes */}
      <path d="M25 35 Q20 25 28 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M35 30 Q40 20 45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M45 25 Q50 15 55 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoGlyph({ size = 70, color = '#3F51B5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="15" width="30" height="30" rx="6" fill="none" stroke={color} strokeWidth="2" />
      <rect x="19" y="19" width="22" height="22" rx="4" fill={color} opacity="0.2" />
      {/* Internal details mimicking Maya numbers/bars */}
      <line x1="22" y1="25" x2="38" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="31" x2="38" y2="31" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="38" r="1.5" fill={color} />
      <circle cx="34" cy="38" r="1.5" fill={color} />
    </svg>
  );
}

function DecoObservatory({ size = 70, color = '#FF7043', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="45" width="40" height="5" fill={color} opacity="0.4" />
      <rect x="15" y="40" width="30" height="5" fill={color} opacity="0.4" />
      <rect x="20" y="25" width="20" height="15" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 25 Q30 15 40 25" fill="none" stroke={color} strokeWidth="2" />
      <rect x="26" y="28" width="3" height="4" fill={color} opacity="0.7" />
      <rect x="31" y="27" width="3" height="4" fill={color} opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'caracol-estructura': [DecoObservatory, DecoGlyph, DecoMayaPyramid],'ventanas-astronomicas': [DecoVenusStar, DecoObservatory, DecoSerpent],'venus-ciclo': [DecoVenusStar, DecoGlyph, DecoObservatory],'precision-matematica': [DecoGlyph, DecoMayaPyramid, DecoVenusStar],'astronomos-mayas': [DecoSerpent, DecoGlyph, DecoObservatory],
  'orientacion-cardinal': [DecoMayaPyramid, DecoVenusStar, DecoObservatory],'legado-observatorio': [DecoObservatory, DecoSerpent, DecoGlyph], }; const BIBLIOGRAPHY = ['Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Milbrath, S. (1999). Star Gods of the Maya: Astronomy in Art, Folklore, and Calendars, University of Texas Press',
  'Galindo Trejo, J. (2009). "Arqueoastronomía en la América Antigua", UNAM',
  'Ruggles, C. (2005). Ancient Astronomy: An Encyclopedia of Cosmologies and Myth, ABC-CLIO',
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'caracol-estructura',
    title: 'La Estructura',
    color: '#4CAF50',
    btnImage: '/assets/maya/infographic_m1/btn_caracol-estructura.jpg',
    image: '/assets/maya/infographic_m1/hero_caracol-estructura.jpg',
    content: [
      'Imagina una torre de piedra con forma de caracol. En el centro de Chichén Itzá, los mayas construyeron esto hace más de mil años. Esta torre circular mide trece metros de altura y descansa sobre dos plataformas rectangulares. A diferencia de las pirámides cuadradas, este edificio tiene una forma cilíndrica similar a los observatorios modernos.',
      'El nombre "El Caracol" se lo dieron los exploradores españoles, no los arquitectos mayas. Lo llamaron así porque dentro de la torre existe una escalera que sube dando vueltas, como la espiral de un caracol. Esta escalera permitía a los astrónomos subir hasta la cámara superior. Era su cuarto de observación.',
      'La construcción del Caracol fue un proyecto que se realizó en varias etapas. Imagina que construyes un castillo de bloques y le agregas torres encima. Los constructores mayas modificaron la torre durante décadas. Añadieron plataformas y cambiaron su forma externa para perfeccionar su función astronómica. Esto demuestra lo importante que era este edificio.',
      'En la parte alta de la torre, la cúpula original ya no existe, pero quedan partes de los muros con ventanas. El diseño circular de la torre es ideal para un observatorio porque permite mirar libremente hacia cualquier dirección del horizonte abierto. En un edificio cuadrado, las esquinas bloquearían la vista.',
      'El edificio es una maravilla de la ingeniería antigua. Para sostener el peso de la torre, los arquitectos mayas inventaron un sistema de anillos concéntricos en el interior, creando pasillos circulares que soportan la estructura superior. Usaron un mortero de cal y piedras talladas con una precisión increíble.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El interior del edificio tiene un pasillo circular que crea un efecto acústico notable. Si hablas en voz baja en un lado del pasillo, la pared refleja el sonido hasta el lado opuesto. Los arqueólogos creen que era el lugar perfecto para que los sacerdotes se comunicaran en secreto.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La piedra caliza que usaron los trabajadores para construir El Caracol es absorbente y retiene humedad. Para proteger las paredes, los mayas cubrieron el edificio con un estuco liso pintado de color rojo intenso. Así resplandecía bajo el sol de la península yucateca.' },
    ],
    fact: 'Aunque parece una torre solitaria hoy en día, El Caracol originalmente estaba rodeado por incensarios y estelas talladas. Los arqueólogos encontraron evidencias de que aquí se realizaban ceremonias bajo la luz de las estrellas.',
  },
  {
    id: 'ventanas-astronomicas',
    title: 'Las Ventanas',
    color: '#FFD54F',
    btnImage: '/assets/maya/infographic_m1/btn_ventanas-astronomicas.jpg',
    image: '/assets/maya/infographic_m1/hero_ventanas-astronomicas.jpg',
    content: [
      'En la parte superior de la torre queda una cámara de observación que guarda el secreto científico del edificio. Las paredes de esta habitación tienen ventanas estrechas que apuntan hacia direcciones geográficas específicas. Estas ventanas funcionaban como unos tubos de mira gigantescos y precisos.',
      'La ventana más estudiada del Caracol está alineada con el punto del horizonte donde el planeta Venus se oculta durante su posición norte. Imagina que tomas un tubo de cartón y lo fijas a la ventana para ver una farola; los mayas hicieron esto para capturar la luz de Venus.',
      'Otra de las aberturas importantes apunta hacia la posición del sol en el día del equinoccio. Durante los equinoccios de primavera y otoño, el día y la noche tienen la misma duración en todo el mundo. Los mayas usaban esta ventana solar para calibrar su calendario agrícola, sabiendo cuándo sembrar el maíz.',
      'Además de rastrear a Venus y al Sol, existe evidencia de que otras líneas visuales creadas dentro de la estructura marcaban la trayectoria de la Luna. La Luna sigue un ciclo de movimiento más complejo que el del Sol. Sube y baja en el horizonte a lo largo de un período de dieciocho años.',
      'Lo más increíble de estas ventanas es su estrechez diseñada intencionalmente por los constructores. Las aberturas son anchas por dentro pero se vuelven angostas hacia el exterior, creando una línea visual restringida. Al hacerla estrecha, el observador solo podía ver el astro deseado, reduciendo el margen de error.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'De las varias aberturas originales que tenía la cámara de observación superior, hoy solo sobreviven tres ventanas intactas. Esto se debe a que el techo abovedado de la torre colapsó hace siglos, aplastando los muros superiores.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ventana número uno del Caracol posee un error de alineación con respecto a la puesta de Venus de apenas una fracción de grado. Lograr ese nivel de exactitud astronómica sin usar telescopios ni instrumentos modernos es considerado un triunfo intelectual.' },
    ],
    fact: 'El uso de aberturas arquitectónicas para medir el paso del tiempo celeste se conoce como "astronomía de horizonte". Los mayas nunca dependieron de instrumentos portátiles de metal. Su instrumento de medición principal era el horizonte geográfico y los edificios gigantescos que diseñaban.',
  },
  {
    id: 'venus-ciclo',
    title: 'El Ciclo de Venus',
    color: '#37474F',
    btnImage: '/assets/maya/infographic_m1/btn_venus-ciclo.jpg',
    image: '/assets/maya/infographic_m1/hero_venus-ciclo.jpg',
    content: [
      'Para los mayas, el planeta Venus era el objeto celeste más importante del cielo nocturno. Superaba al Sol y a la Luna en su significado espiritual. Ellos conocían a Venus bajo el nombre de "Noh Ek", que significa "La Gran Estrella". Es el objeto estelar más brillante de la noche.',
      'El ciclo visible de Venus es un patrón que dura casi quinientos ochenta y cuatro días terrestres. A este tiempo los astrónomos le llaman el "período sinódico". Es el tiempo que tarda el planeta en volver a la misma posición en el cielo en relación con nuestro Sol.',
      'Los sacerdotes y astrónomos de Chichén Itzá dedicaron un gran esfuerzo a registrar cada aparición y desaparición de Venus a lo largo de muchos años. Imagina tener que salir cada madrugada antes del amanecer para anotar en qué parte del horizonte aparece un punto de luz.',
      'El movimiento cíclico de Venus estaba conectado con las decisiones políticas y militares de los gobernantes mayas. Ellos creían que algunas fases del ciclo irradiaban una energía peligrosa hacia el mundo. Por esta razón, los reyes organizaban sus batallas cuidadosamente.',
      'El conocimiento astronómico sobre Venus estaba ligado al desarrollo matemático de su calendario. El ciclo de quinientos ochenta y cuatro días de Venus se sincronizaba con su calendario sagrado de doscientos sesenta días. Al mismo tiempo, también se sincronizaba con su calendario solar de trescientos sesenta y cinco días.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Debido a que la trayectoria de Venus está más cerca del Sol que la órbita de nuestra Tierra, Venus tiene fases visibles que cambian paulatinamente. Ocurre exactamente igual que los cuartos menguantes y crecientes de nuestra Luna. A veces es un hilo de luz y otras veces parece un disco pleno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El ciclo verdadero de Venus no dura exactamente 584 días cerrados, sino que dura unos 583.92 días terrestres. Esta diferencia decimal de mínimas fracciones de día parecería no tener importancia, pero a la larga desajusta el calendario drásticamente.' },
    ],
    fact: 'En la mitología de los pueblos mesoamericanos, el planeta Venus estaba asociado con la deidad de la serpiente emplumada. Era venerada y conocida como Kukulcán por los mayas yucatecos y Quetzalcóatl por los aztecas.',
  },
  {
    id: 'precision-matematica',
    title: 'Precisión Matemática',
    color: '#26C6DA',
    btnImage: '/assets/maya/infographic_m1/btn_precision-matematica.jpg',
    image: '/assets/maya/infographic_m1/hero_precision-matematica.jpg',
    content: [
      'La habilidad más asombrosa de los científicos mayas fue su capacidad para calcular números astronómicos con una precisión casi perfecta. Utilizaban un sistema numérico escrito e ingenioso. A diferencia de nosotros, que hoy usamos diez números, ellos usaban un sistema vigesimal.',
      'Con tres símbolos sencillos, los matemáticos mayas podían sumar y multiplicar cifras inmensas que llegaban a los millones. El descubrimiento del número cero fue un avance intelectual que los mayas lograron desarrollar muchos siglos antes que los europeos.',
      'El gran reto matemático era calcular el ciclo orbital del planeta Venus sin cometer errores a lo largo de los siglos. El ciclo moderno de Venus es de exactamente 583.92 días. Los mayas redondearon inicialmente el ciclo a quinientos ochenta y cuatro.',
      'Para solucionar este problema de fracciones, los matemáticos antiguos inventaron un sistema de correcciones periódicas. Este sistema es similar a cómo nosotros empleamos los años bisiestos. Simplemente agregamos un día extra en febrero cada cuatro años para arreglar nuestro calendario.',
      'Gracias a esta corrección matemática, el margen de error del calendario de Venus creado por los mayas era de apenas dos horas por cada cuatrocientos ochenta y un años. Imagina tener un reloj fabricado con bloques de piedra que se atrasa tan poco tiempo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el Códice de Dresde, que es uno de los pocos libros mayas originales que lograron sobrevivir, hay múltiples páginas llenas de tablas. Estos números trazados y puntos pintados predicen la aparición del planeta Venus.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sistema maya de números se escribía tradicionalmente de manera vertical, desde el fondo hacia arriba. La primera posición valía por unidades simples, la segunda línea hacia arriba valía por veintenas y la tercera por cuatrocientos.' },
    ],
    fact: 'La introducción matemática del concepto de número cero no fue solo un triunfo para contar elementos. Fue una necesidad puramente filosófica y científica para indagar sobre el origen remoto del universo observable.',
  },
  {
    id: 'astronomos-mayas',
    title: 'Los Astrónomos',
    color: '#FF7043',
    btnImage: '/assets/maya/infographic_m1/btn_astronomos-mayas.jpg',
    image: '/assets/maya/infographic_m1/hero_astronomos-mayas.jpg',
    content: [
      'Los astrónomos mayas no eran científicos encerrados en un laboratorio. Eran sacerdotes importantes conocidos como "ah kin", que significa "el guardián de los días". Estos especialistas pertenecían a la nobleza.',
      'Convertirse en un astrónomo maya requería décadas de un estudio académico riguroso. Los aprendices pasaban años memorizando los ciclos de los astros y aprendiendo a leer y pintar los jeroglíficos de sus antepasados.',
      'La información recolectada por los astrónomos era considerada el recurso intelectual más valioso del imperio, siendo más importante que el oro. Los reyes dependían del consejo de estos sacerdotes.',
      'Todo este conocimiento científico se registraba en hermosos libros llamados códices. Estos libros plegables estaban hechos de tiras continuas de corteza extraída del árbol de amate. Después se aplanaban y se cubrían con una capa de estuco.',
      'La mayoría de esta biblioteca astronómica se perdió para siempre. Durante la conquista española en el siglo dieciséis, muchos de estos libros valiosos fueron quemados arrojándolos al fuego, porque los exploradores no comprendieron su valor.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astrónomos mayas usaban una herramienta observacional simple pero efectiva: consistía en un par de varas rectas de madera firmemente cruzadas que miraban desde el umbral de una puerta en la madrugada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La astronomía observacional maya es un tipo de "astronomía posicional". Mientras los científicos modernos intentan entender de qué materia están hechas las estrellas, los antiguos sabios se enfocaban solo en la posición exacta.' },
    ],
    fact: 'En las pinturas de los murales mayas antiguos, a los astrónomos siempre se les reconoce fácilmente porque llevan sus herramientas de escriba apretadas fuertemente en sus manos.',
  },
  {
    id: 'orientacion-cardinal',
    title: 'Orientación',
    color: '#3F51B5',
    btnImage: '/assets/maya/infographic_m1/btn_orientacion-cardinal.jpg',
    image: '/assets/maya/infographic_m1/hero_orientacion-cardinal.jpg',
    content: [
      'Una de las características más sorprendentes de la torre del Caracol es su posición asimétrica con respecto al resto de la ciudad antigua. Si miras un mapa aéreo de la zona, notarás esta diferencia.',
      'Este giro inusual no fue un error de los constructores mayas. Tampoco fue provocado por la irregular topografía del terreno rocoso yucateco. Los ingenieros alinearon la estructura del edificio circular para alinearla matemáticamente a las estrellas.',
      'Construir un edificio gigantesco siguiendo el movimiento de un planeta lejano es una tarea titánica y desafiante. Esto significa que antes de mover la roca inicial, debieron investigar el sitio elegido para ello.',
      'Esta peculiar orientación rotada demuestra que para los habitantes de Chichén Itzá, el cielo y la tierra se encontraban íntimamente unidos, fundiéndose en uno solo sin separación de la experiencia humana.',
      'Además de rastrear esta línea recta dirigida a Venus, las diagonales geométricas de la plataforma inferior apuntan hacia otras posiciones astronómicas de gran importancia ritual y práctica. Por ejemplo, marcan las salidas del sol en los solsticios de verano.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La desviación rotatoria de veintisiete grados del Caracol contrasta con el otro edificio central de Chichén Itzá: la pirámide de Kukulkán. Esa pirámide imponente tiene una rotación diferente orientada para la sombra equinoccial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para lograr localizar con exactitud astronómica el "norte verdadero" inamovible de la tierra sin disponer de brújulas metálicas, los observadores dependían estrictamente del sol incesante.' },
    ],
    fact: 'Muchos de los observatorios y herramientas megalíticas del mundo antiguo civilizado comparten este rasgo asimétrico de estar alineados con un orden invisible, a diferencia de nuestras cuadrículas estrictas modernas.',
  },
  {
    id: 'legado-observatorio',
    title: 'El Legado',
    color: '#FFC107',
    btnImage: '/assets/maya/infographic_m1/btn_legado-observatorio.jpg',
    image: '/assets/maya/infographic_m1/hero_legado-observatorio.jpg',
    content: [
      'El observatorio del Caracol erigido en la ciudad maya de Chichén Itzá no es simplemente una ruina turística cubierta de polvo. Es uno de los monumentos científicos más impresionantes construidos en el mundo entero.',
      'A pesar de que estas civilizaciones antiguas estaban separadas por vastos océanos, todas compartían un constante deseo humano. Querían entender los patrones celestes de forma persistente.',
      'Hoy en día, la torre del Caracol se encuentra resguardada en el centro espiritual de la ciudad de Chichén Itzá. Representa la sabiduría de esta metrópoli cosmopolita maya precolombina de imponentes dimensiones.',
      'El legado intelectual heredado de la observación efectuada desde El Caracol nos enseña una lección valiosa acerca de la importancia de observar la bóveda estelar. Demuestra cómo la paciencia de piedra es capaz de sobreponerse al paso del tiempo.',
      'Cada vez que un científico contemporáneo usa su telescopio espacial para observar los cielos, su esfuerzo se equipara a los mayas astronómicos de Mesoamérica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A finales del siglo diecinueve, una expedición de arqueólogos tuvo que limpiar manualmente y con gran cuidado toda la vegetación tropical asfixiante que cubría las ruinas usando machetes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La arqueoastronomía es una rama académica de investigación científica que estudia cómo las civilizaciones antiguas entendían su cosmos estrellado y los ciclos celestes.' },
    ],
    fact: 'El reconocimiento público mundial de la avanzada ciencia astronómica precolombina y de su indiscutible precisión matemática ha contribuido a erradicar prejuicios históricos sobre el imperio maya.',
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
      hue: Math.random() > 0.5 ? '76,175,80' : '255,213,79', // jade or gold
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Maya stepped arch */}
        <path d="M 50 110 L 100 110 L 100 80 L 150 80 L 150 50 L 450 50 L 450 80 L 500 80 L 500 110 L 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const positions = [
            {cx: 50, cy: 110}, {cx: 100, cy: 80}, {cx: 150, cy: 50}, 
            {cx: 300, cy: 50}, 
            {cx: 450, cy: 50}, {cx: 500, cy: 80}, {cx: 550, cy: 110}
          ];
          const colors = ['#4CAF50','#FFD54F','#37474F','#26C6DA','#FF7043','#3F51B5','#FFC107'];
          const pos = positions[i];
          return (
            <motion.circle key={i} cx={pos.cx} cy={pos.cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <path d="M300 20 L303 27 L310 30 L303 33 L300 40 L297 33 L290 30 L297 27 Z" fill="#4CAF50" opacity="0.5" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">EL CARACOL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBSERVATORIO DE VENUS EN CHICHÉN ITZÁ</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(76,175,80,0.2)'}`,
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
          layoutId="activeDotMayaM1"
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
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              fontSize: '1rem', color: '#FFF', margin: '0 0 1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} style={{ color: node.color }} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Did You Know Footer â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(90deg, ${node.color}15, transparent)`,
          border: `1px solid ${node.color}25`,
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            background: node.color, borderRadius: '50%', padding: '0.6rem',
            boxShadow: `0 0 15px ${node.color}40`, flexShrink: 0,
          }}>
            <Sparkles size={20} color="#0B0E2D" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem', fontWeight: 700 }}>El Dato Extraordinario</h4>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {node.fact}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      marginTop: '3rem',
      background: 'rgba(10, 12, 30, 0.6)',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '1.5rem 2rem',
      border: '1px solid rgba(76,175,80,0.2)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#4CAF50" /> Progreso de Exploración
        </h4>
        <div style={{
          background: 'rgba(76,175,80,0.15)', padding: '0.3rem 0.8rem',
          borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
          color: '#4CAF50', border: '1px solid rgba(76,175,80,0.3)',
        }}>
          {exploredIds.length} / {nodes.length} Nodos
        </div>
      </div>

      <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'visible' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4CAF50, #FFD54F)',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(76,175,80,0.5)',
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', left: 0, width: '100%',
          display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          {nodes.map((n, i) => {
            const isExplored = exploredIds.includes(n.id);
            return (
              <motion.button
                key={n.id}
                onClick={() => onSelect(n)}
                whileHover={{ scale: 1.2 }}
                style={{
                  width: '18px', height: '18px', borderRadius: '50%', background: isExplored ? n.color :'#1A1D36',
                  border: `2px solid ${isExplored ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                  cursor: 'pointer', pointerEvents: 'auto',
                  boxShadow: isExplored ? `0 0 10px ${n.color}` : 'none',
                  transition: 'all 0.3s',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM1() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (node) => {
    setActiveNodeId(activeNodeId === node.id ? null : node.id);
    if (!exploredIds.includes(node.id)) setExploredIds(prev => [...prev, node.id]);
  };

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#04050A',
      color: '#fff',
      padding: '2rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TemporalField />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <MayaHeader />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
          padding: '2rem 0',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              index={idx}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

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

        <ProgressBar
          nodes={INFOGRAPHIC_NODES}
          exploredIds={exploredIds}
          onSelect={(n) => {
            setActiveNodeId(n.id);
            if (!exploredIds.includes(n.id)) setExploredIds(prev => [...prev, n.id]);
          }}
        />

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Fuentes Científicas y Bibliografía
          </h4>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox
        src={lightboxSrc}
        alt="Maya Infographic Visual"
        onClose={() => setLightboxSrc(null)}
      />
    </div>
  );
}
