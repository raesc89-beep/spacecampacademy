'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Calendar themed) ─────────────────────────

function DecoGearWheel({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3, ...style }}>
      <circle cx="35" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="35" cy="50" r="8" fill="none" stroke={color} strokeWidth="1" />
      {[...Array(12)].map((_, i) => (
        <rect key={'sm'+i} x="33" y="27" width="4" height="6" fill={color} transform={`rotate(${i * 30} 35 50)`} />
      ))}
      <circle cx="70" cy="50" r="14" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="70" cy="50" r="5" fill="none" stroke={color} strokeWidth="1" />
      {[...Array(8)].map((_, i) => (
        <rect key={'lg'+i} x="68" y="33" width="4" height="6" fill={color} transform={`rotate(${i * 45} 70 50)`} />
      ))}
      <path d="M55 50 L56 50" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoZeroShell({ size = 70, color = '#FFB300', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" style={{ opacity: 0.3, ...style }}>
      <ellipse cx="50" cy="30" rx="40" ry="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 30 Q50 10 80 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M25 30 Q50 20 75 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q50 25 70 30" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="40" r="2" fill={color} />
      <circle cx="40" cy="38" r="1.5" fill={color} />
      <circle cx="60" cy="38" r="1.5" fill={color} />
    </svg>
  );
}

function DecoDotBar({ size = 70, color = '#00897B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.3, ...style }}>
      <circle cx="20" cy="20" r="6" fill={color} />
      <circle cx="40" cy="20" r="6" fill={color} />
      <circle cx="60" cy="20" r="6" fill={color} />
      <rect x="10" y="40" width="60" height="8" rx="4" fill={color} />
      <rect x="10" y="55" width="60" height="8" rx="4" fill={color} />
    </svg>
  );
}

function DecoLongCount({ size = 70, color = '#BF360C', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 120" style={{ opacity: 0.3, ...style }}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(10, ${i * 28 + 5})`}>
          <rect x="0" y="0" width="40" height="22" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="10" cy="11" r="3" fill={color} />
          <rect x="18" y="9" width="16" height="4" rx="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

function DecoSpiralTime({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3, ...style }}>
      <path d="M50 50 m0 -40 a40 40 0 1 1 -1 0 a30 30 0 1 0 1 0 a20 20 0 1 1 -1 0 a10 10 0 1 0 1 0" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="2" fill={color} />
      <circle cx="90" cy="50" r="3" fill={color} />
      <circle cx="20" cy="50" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'rueda-mecanismo': [DecoGearWheel, DecoSpiralTime, DecoGearWheel],'fecha-completa': [DecoDotBar, DecoGearWheel, DecoZeroShell],
  'ciclo-52-anos': [DecoSpiralTime, DecoGearWheel, DecoDotBar],'cuenta-larga': [DecoLongCount, DecoZeroShell, DecoDotBar],
  'matematica-base-20': [DecoZeroShell, DecoDotBar, DecoLongCount],
  'engranajes-cosmicos': [DecoGearWheel, DecoSpiralTime, DecoLongCount],'precision-astronomica': [DecoSpiralTime, DecoZeroShell, DecoGearWheel], }; const BIBLIOGRAPHY = ['Coe, M.D. (2011). The Maya, Thames & Hudson',
  'Rice, P.M. (2007). Maya Calendar Origins, University of Texas Press',
  'Stuart, D. (2011). The Order of Days: The Maya World and the Truth About 2012, Harmony Books',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lounsbury, F.G. (1978). Maya Numeration, Computation, and Calendrical Astronomy, DSB 15'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'rueda-mecanismo',
    title: 'El Mecanismo',
    color: '#1565C0',
    btnImage: '/assets/maya/infographic_m5/btn_rueda-mecanismo.jpg',
    image: '/assets/maya/infographic_m5/hero_rueda-mecanismo.jpg',
    content: [
      'Imagina que tienes dos engranajes en una bicicleta que giran juntos al pedalear. Los antiguos mayas hicieron esto con el tiempo. Inventaron la Rueda Calendárica, un sistema que unía dos calendarios. El Tzolkin duraba 260 días y era un calendario sagrado con fines rituales. El Haab era un calendario solar de 365 días, usado para saber cuándo sembrar y cosechar.',
      'Cuando estos engranajes giraban juntos, cada día recibía un nombre del Tzolkin y otro del Haab. Como los engranajes tienen diferentes tamaños, las combinaciones tardaban mucho tiempo en repetirse. Es como alinear una marca en la rueda delantera de una bicicleta con otra en la trasera. A los mayas les tomaba 18,980 días (aproximadamente 52 años) para que la Rueda Calendárica diera una vuelta completa.',
      'Este sistema de medir el tiempo también fue utilizado por otras civilizaciones en Mesoamérica, como los olmecas y los aztecas. Era una herramienta esencial para organizar la agricultura, las ceremonias y las guerras. Los astrónomos mayas lograron entender los ritmos del sol y la luna para crear esta rueda sin usar telescopios modernos.',
      'El Tzolkin estaba formado por los números del 1 al 13 combinados con 20 nombres de días (como Imix, Ik y Akbal). Al multiplicar 13 por 20, obtenemos los 260 días. Se cree que este ciclo estaba relacionado con la duración del embarazo humano. Por otro lado, el Haab tenía 18 meses, y cada mes duraba 20 días.',
      'Al multiplicar los 18 meses por los 20 días del Haab, obtienes 360 días. Para completar el ciclo solar, los mayas añadían un mes final llamado Wayeb que duraba 5 días. Estos días eran considerados de mala suerte, por lo que la gente evitaba actividades importantes. Después del Wayeb, el ciclo de 365 días volvía a empezar.'
    ],
    expandables: [
      { label: 'Engranajes Maestros', icon: 'clock', text: 'Imagina un gran reloj que en lugar de horas y minutos tiene animales, dioses y números. Los mayas no construyeron un mecanismo de metal, pero llevaban este registro mental con precisión. Anotaban cada ciclo en libros de corteza llamados códices y en monumentos de piedra llamados estelas.' },
      { label: 'Un Ciclo Interminable', icon: 'clock', text: 'El número 18,980 no es casualidad. Es el Mínimo Común Múltiplo entre 260 y 365. Representa la menor cantidad de días necesarios para que ambos calendarios regresen juntos a su punto de partida. Esto demuestra que los mayas entendían conceptos de aritmética avanzada.' }
    ],
    fact: 'El sistema de la Rueda Calendárica sobrevivió a la caída de las ciudades mayas y a la llegada de los españoles. Hoy en día, en algunas comunidades de Guatemala, los guías espirituales llamados "Ajq\'ijab" siguen llevando la cuenta exacta del Tzolkin de 260 días.'
  },
  {
    id: 'fecha-completa',
    title: 'Una Fecha Completa',
    color: '#FFB300',
    btnImage: '/assets/maya/infographic_m5/btn_fecha-completa.jpg',
    image: '/assets/maya/infographic_m5/hero_fecha-completa.jpg',
    content: [
      'Cuando nosotros escribimos una fecha, usamos el día, el mes y el año, como "4 de julio de 2024". Para los mayas, una fecha completa incluía la posición del día en ambos calendarios al mismo tiempo. Es decir, incluía el número y el nombre del día en el Tzolkin, seguido por los del Haab.',
      'Un ejemplo de fecha maya es "4 Ahau 8 Kumku". En esta fecha, "4 Ahau"pertenece al Tzolkin e indica el número 4 combinado con el día Ahau."8 Kumku" pertenece al Haab y representa el octavo día del mes Kumku. Cuando los mayas tallaban estas fechas en estelas, dibujaban glifos para representar los números y nombres.',
      'En total, existen 18,980 combinaciones posibles de fechas entre estos dos calendarios. Es como tener una caja fuerte con dos diales giratorios que deben alinearse. Cada día, ambos diales avanzaban una posición. Por eso, cualquier fecha específica solo ocurría una vez cada 52 años solares.',
      'Aprender a leer y escribir estas fechas requería años de estudio bajo la guía de astrónomos. Quienes dominaban la cuenta del tiempo eran muy respetados. Se creía que las fechas ayudaban a predecir eventos, guiar las cosechas y conocer el destino de los recién nacidos.',
      'Cuando los arqueólogos descubren estelas mayas en la selva, estudian las fechas de la Rueda Calendárica. Al leer estos glifos, pueden determinar cuándo un gobernante subió al trono, cuándo ocurrió una batalla o cuándo se construyó un templo. Es una forma de reconstruir la historia de esta civilización.'
    ],
    expandables: [
      { label: 'Un Puzzle Gigante', icon: 'atom', text: 'Para calcular una fecha específica, los escribas mayas usaban patrones cíclicos. A menudo utilizaban cuentas de jade, granos de cacao o conchas para realizar cálculos matemáticos antes de tallar el resultado en bloques de piedra caliza.' },
      { label: 'El Significado Oculto', icon: 'atom', text: 'Cada fecha de la Rueda Calendárica tenía un significado astrológico. Algunos días se consideraban propicios para casarse o iniciar construcciones, mientras que otros se veían como peligrosos para realizar actividades.' }
    ],
    fact: 'El estudio de las fechas mayas ha permitido a los epigrafistas reconstruir la historia de varias dinastías. En la ciudad de Yaxchilán, las fechas talladas en los dinteles de piedra nos dan detalles sobre reyes como Pájaro Jaguar IV, incluyendo el día de su coronación.'
  },
  {
    id: 'ciclo-52-anos',
    title: 'El Ciclo de 52 Años',
    color: '#00897B',
    btnImage: '/assets/maya/infographic_m5/btn_ciclo-52-anos.jpg',
    image: '/assets/maya/infographic_m5/hero_ciclo-52-anos.jpg',
    content: [
      'Así como nosotros celebramos el Año Nuevo, los antiguos mesoamericanos tenían una celebración que ocurría una vez cada 52 años. Este momento marcaba el instante en que el Tzolkin y el Haab completaban sus 18,980 días y regresaban a su punto de partida.',
      'Dado que 52 años era casi la esperanza de vida en esa época, la mayoría de las personas solo vivía esta celebración una vez. El final del ciclo generaba temor en la población. Temían que el sol no volviera a salir y que el mundo llegara a su fin.',
      'Para evitar el fin del mundo, realizaban el ritual del Fuego Nuevo. Durante los últimos días del ciclo, la gente rompía sus vasijas, apagaba todas las fogatas y limpiaba sus casas. Las ciudades permanecían a oscuras mientras esperaban las señales astronómicas.',
      'En la noche, los sacerdotes subían a las pirámides para observar el cielo. Cuando las estrellas de las Pléyades cruzaban el centro del cielo nocturno, encendían un fuego nuevo frotando palos de madera. Al aparecer la llama, celebraban que el mundo tenía otros 52 años de vida.',
      'A partir de ese fuego original, mensajeros llevaban antorchas para encender hogueras en cada templo y hogar. Las personas estrenaban ropa y celebraban con música y comida. Para ellos, el ciclo de 52 años significaba la renovación de la existencia.'
    ],
    expandables: [
      { label: 'Un Silencio Aterrador', icon: 'clock', text: 'Antes de encender el Fuego Nuevo, la gente seguía estrictas medidas. Se pedía a las mujeres embarazadas que se quedaran en casa, y se mantenía despiertos a los niños bajo la creencia de que podrían transformarse en animales si se dormían durante el cambio de era.' },
      { label: 'Celebración Azteca', icon: 'atom', text: 'Tenemos descripciones detalladas del ritual del Fuego Nuevo gracias a los aztecas. Ellos realizaban esta ceremonia en el Cerro de la Estrella en el Valle de México, donde las personas observaban la hoguera principal desde sus comunidades.' }
    ],
    fact: 'El ciclo de 52 años influyó en la arquitectura mesoamericana. Frecuentemente, los gobernantes ordenaban construir nuevas pirámides directamente sobre las antiguas para marcar el inicio de un nuevo ciclo, renovando así los edificios religiosos.'
  },
  {
    id: 'cuenta-larga',
    title: 'La Cuenta Larga',
    color: '#BF360C',
    btnImage: '/assets/maya/infographic_m5/btn_cuenta-larga.jpg',
    image: '/assets/maya/infographic_m5/hero_cuenta-larga.jpg',
    content: [
      'Como el ciclo de la Rueda Calendárica se reiniciaba cada 52 años, era difícil registrar eventos muy antiguos. Para solucionar esto, los mayas inventaron un sistema lineal llamado la Cuenta Larga. Este sistema permitía registrar millones de días sin repetirse.',
      'A diferencia de nuestro calendario, que suma un año por cada vuelta al sol, la Cuenta Larga registraba los días continuos desde un "Día Cero". Los cálculos modernos indican que este Día Cero corresponde al 11 de agosto de 3114 a.C. No se sabe con certeza por qué eligieron esta fecha.',
      'La Cuenta Larga agrupaba el tiempo usando un sistema de base 20. El Kin representaba 1 día. Veinte días formaban un Uinal. Dieciocho uinales formaban un Tun (360 días). Veinte tuns hacían un K\'atun (casi 20 años). Y veinte katunes formaban un B\'ak\'tun (cerca de 394 años).',
      'Cuando un gobernante maya ordenaba tallar una estela, la fecha se escribía detallando todos estos períodos. Por ejemplo, 9 baktunes, 15 katunes, 0 tuns, 0 uinales y 0 k\'ines. Esto permite a los arqueólogos modernos calcular los días transcurridos desde el 3114 a.C. y encontrar la fecha exacta de los eventos.',
      'El final de un ciclo de 13 B\'ak\'tunes ocurrió el 21 de diciembre de 2012. Para los antiguos mayas, esto no significaba el fin del mundo. Era similar a pasar del 31 de diciembre al 1 de enero en nuestro calendario; simplemente iniciaba un nuevo ciclo.'
    ],
    expandables: [
      { label: 'El Primer Día', icon: 'atom', text: 'El 11 de agosto de 3114 a.C. Es una fecha anterior al desarrollo de la civilización maya. Los expertos creen que este Día Cero marcaba un evento mitológico en el que los dioses ordenaron el universo y colocaron las tres piedras fundamentales de la creación.' },
      { label: 'Tiempo Infinito', icon: 'clock', text: 'Los matemáticos mayas calculaban ciclos de tiempo aún mayores que el B\'ak\'tun. Utilizaban el Piktun (8,000 años), el Kalabtun (158,000 años) y el Kinchiltun (3 millones de años). Su concepción del tiempo abarcaba períodos muy extensos.' }
    ],
    fact: 'En la estela 1 de la ciudad de Cobá, hay inscripciones que mencionan fechas equivalentes a trillones de años en el pasado. Esto demuestra que los mayas podían conceptualizar escalas de tiempo enormes en sus cálculos.'
  },
  {
    id: 'matematica-base-20',
    title: 'Matemáticas Base 20',
    color: '#6A1B9A',
    btnImage: '/assets/maya/infographic_m5/btn_matematica-base-20.jpg',
    image: '/assets/maya/infographic_m5/hero_matematica-base-20.jpg',
    content: [
      'Nosotros usamos un sistema de base 10 con diez símbolos (del 0 al 9). Los mayas desarrollaron un sistema vigesimal o de "base 20", agrupando las cantidades de veinte en veinte. Esto les permitía hacer cálculos grandes de forma eficiente para estudiar los ciclos celestes.',
      'Para escribir los números, los mayas utilizaban solo tres símbolos: un punto, una raya y un caparazón. Un punto valía 1, por lo que dos puntos eran 2. Una raya horizontal representaba 5. Al combinar rayas y puntos, formaban los números del 1 al 19.',
      'El tercer símbolo, que tenía la forma de un caparazón de caracol, representaba el número cero. Los mayas utilizaron el cero mucho antes de que se empleara en Europa. Este concepto de un valor nulo era esencial para realizar operaciones matemáticas avanzadas.',
      'A diferencia de nuestro sistema horizontal, los mayas escribían sus números verticalmente de abajo hacia arriba. En el primer nivel, contaban las unidades del 1 al 19. En el segundo nivel, cada valor se multiplicaba por 20. En el tercer nivel, se multiplicaba por 400 (20 x 20).',
      'Este sistema posicional vertical resultaba práctico y rápido. Los comerciantes y astrónomos mayas podían sumar o restar grandes cifras de forma visual. Para facilitar las operaciones, deslizaban semillas de cacao o palos de madera sobre una superficie plana.'
    ],
    expandables: [
      { label: 'El Genio del Cero', icon: 'clock', text: 'Escribir grandes cifras sin el número cero es difícil, como ocurre con los números romanos. El símbolo del caparazón maya indicaba "completamiento". Señalaba que una posición en la columna vigesimal estaba vacía y lista para el siguiente orden.' },
      { label: 'Matemáticas Cósmicas', icon: 'clock', text: 'Las matemáticas mayas no solo se utilizaban en el comercio. Los sacerdotes aplicaban estos cálculos para predecir eclipses solares y lunares con gran precisión. Sus tablas astronómicas muestran un profundo conocimiento del movimiento de los astros.' }
    ],
    fact: 'El Códice de Dresde, uno de los pocos libros mayas de corteza que sobrevivieron a la colonización, contiene tablas matemáticas complejas. En él se registran cálculos astronómicos en base 20 que predicen ciclos planetarios.'
  },
  {
    id: 'engranajes-cosmicos',
    title: 'Engranajes Cósmicos',
    color: '#FF6F00',
    btnImage: '/assets/maya/infographic_m5/btn_engranajes-cosmicos.jpg',
    image: '/assets/maya/infographic_m5/hero_engranajes-cosmicos.jpg',
    content: [
      'Además del Tzolkin y el Haab, los astrónomos mayas coordinaban otros ciclos astronómicos. Estudiaban el movimiento de los planetas y los enlazaban en un modelo matemático. Este sistema les permitía predecir posiciones celestes y eventos importantes.',
      'Uno de los ciclos más observados era el de Venus, conocido como Chak Ek\'. Como estrella de la mañana o de la tarde, Venus tarda 584 días en completar su órbita aparente y regresar a la misma posición en el cielo.',
      'Los matemáticos mayas notaron una coincidencia clave: si se multiplican cinco ciclos de Venus (584 días cada uno), el resultado es de 2,920 días. Esto les permitió sincronizar el ciclo del planeta con otros calendarios.',
      'Esta cantidad de 2,920 días es significativa porque equivale exactamente a ocho años solares del calendario Haab. De este modo, los mayas podían alinear el movimiento de Venus con los ciclos anuales del sol.',
      'Los gobernantes mayas programaban actividades militares, conocidas como "Guerras de las Estrellas", basándose en estos cálculos. Sincronizaban los combates con posiciones específicas del planeta Venus, dándole un peso ritual a las batallas.'
    ],
    expandables: [
      { label: 'El Planeta Rojo', icon: 'atom', text: 'Además de Venus, los astrónomos mayas estudiaron los movimientos de Marte. Calcularon su ciclo orbital en 780 días, demostrando una gran capacidad para registrar trayectorias planetarias a lo largo de décadas.' },
      { label: 'Eclipses y Dragones', icon: 'clock', text: 'Los mayas identificaron los patrones repetitivos de los eclipses. Crearon tablas para predecir cuándo ocurrirían, permitiéndoles anticipar estos fenómenos astronómicos con precisión.' }
    ],
    fact: 'El edificio "El Caracol" en Chichén Itzá funcionaba como un observatorio astronómico. Su estructura cilíndrica cuenta con ventanas diseñadas específicamente para alinearse con los eventos celestes de Venus.'
  },
  {
    id: 'precision-astronomica',
    title: 'Precisión Astronómica',
    color: '#A1887F',
    btnImage: '/assets/maya/infographic_m5/btn_precision-astronomica.jpg',
    image: '/assets/maya/infographic_m5/hero_precision-astronomica.jpg',
    content: [
      'Una de las características de la astronomía maya es la exactitud de sus observaciones. A través del seguimiento de los astros, calcularon la duración del año solar y de otros ciclos con un margen de error mínimo.',
      'En Europa, durante muchos siglos, se utilizó el Calendario Juliano, establecido por Julio César. Este calendario calculaba la duración de un año en 365.25 días, basándose en el ciclo estacional.',
      'Sin embargo, el tiempo que tarda la Tierra en dar una vuelta completa alrededor del sol es de aproximadamente 365.2422 días. Esta pequeña diferencia decimal generaba desfases a lo largo de los siglos.',
      'Por su imprecisión, el Calendario Juliano se atrasaba un día cada 128 años. En contraste, los mayas lograron una medida más exacta del año solar sin emplear instrumentos ópticos ni tecnología moderna.',
      'Los astrónomos mayas calcularon el año solar en 365.2420 días. Esta cifra se acerca más al valor real moderno que la utilizada por el calendario europeo de esa misma época.'
    ],
    expandables: [
      { label: 'A Ojo Desnudo', icon: 'clock', text: 'Los mayas lograron esta precisión astronómica mediante observaciones directas. Construyeron edificios y marcadores de piedra que les ayudaban a rastrear la posición del sol en el horizonte durante los amaneceres y atardeceres.' },
      { label: 'Un Gran Legado', icon: 'clock', text: 'La Rueda Calendárica y los registros astronómicos mayas son un testimonio de su conocimiento matemático. Reflejan el desarrollo científico de una sociedad que dedicó siglos al estudio sistemático del tiempo.' }
    ],
    fact: 'Debido a la precisión de sus cálculos solares y planetarios, la astronomía maya es reconocida por los científicos modernos como una de las más avanzadas del mundo antiguo.'
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '255,179,0' : '21,101,192', // gold or royal blue
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

function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,179,0,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#1565C0','#FFB300','#00897B','#BF360C','#6A1B9A','#FF6F00','#A1887F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFB300" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FFB300" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FFB300" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FFB300" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,179,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,179,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,179,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFB300" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA RUEDA CALENDÃRICA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,179,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL ENGRANAJE DE DOS CICLOS</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,179,0,0.2)'}`,
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
          layoutId="activeDotMayaM5"
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
const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
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
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

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

function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(255,179,0,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFB300', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FFB300, #00897B)', borderRadius: '3px', boxShadow: '0 0 8px rgba(255,179,0,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FFB300', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

export default function InteractiveInfographic_MayaM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,179,0,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <MayaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(255,179,0,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(255,179,0,0.08)', borderRadius: '16px',
              border: '1px solid rgba(255,179,0,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FFB300', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔬  ¡Has dominado los secretos de la Rueda Calendárica!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes continuar tu entrenamiento en Arqueoastronomía
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          🔬 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>"Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
