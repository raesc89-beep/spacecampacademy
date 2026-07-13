'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronLeft } from 'lucide-react';

// ─── Content: 8 interactive nodes, expanded with scientific facts & images ────
const INFOGRAPHIC_NODES = [
  {
    id: 'nut',
    emoji: '🌙',
    title: '¿Quién es Nut?',
    color: '#C4A7E7',
    icon: '𓇯',
    image: '/assets/egypt/infographic/nut_goddess.png',
    content: [
      'Imagina que pudieras ver a una persona gigante estirándose de un lado al otro del cielo. ¡Así veían los antiguos egipcios a Nut (se pronuncia "Nut"), la diosa del cielo! En la cosmología egipcia, Nut era una de las deidades más antiguas, hija de Shu (dios del aire) y Tefnut (diosa de la humedad).',
      'Los egipcios imaginaban a Nut como una mujer enorme que se arqueaba sobre la Tierra con la espalda formando la bóveda celeste. Sus dedos de los pies tocaban el horizonte oriental y sus manos el horizonte occidental. Debajo de ella estaba Geb, el dios de la Tierra, su esposo, tendido boca arriba. Entre ambos, Shu sostenía a Nut para mantener el cielo separado de la Tierra.',
      'Las estrellas eran joyas brillantes pintadas en su piel. Cada noche, Nut se tragaba al Sol (Ra) por el oeste al atardecer. Ra viajaba dentro de su cuerpo durante toda la noche, navegando por un río subterráneo, y al amanecer Nut lo daba a luz de nuevo por el este. ¡Era como si el ciclo día-noche fuera el embarazo y parto diario de una diosa!',
      'El Libro de Nut, un texto astronómico egipcio del siglo XIII a.C., describe cómo las estrellas también eran tragadas por Nut al amanecer y renacían al anochecer. Los astrónomos egipcios llamaron "estrellas imperecederas" a las circumpolares (que nunca se ocultan) y "estrellas infatigables" a los planetas.',
      'Los techos de las tumbas reales en el Valle de los Reyes están decorados con el cuerpo azul de Nut cubierto de estrellas doradas. El sarcófago de Ramsés VI (KV9) tiene una de las representaciones más completas de Nut, mostrando 36 estrellas decanales que los egipcios usaban como reloj nocturno.',
    ],
    fact: '¿Sabías que...? Los egipcios dividieron la noche en 12 horas usando 36 "decanes" — grupos de estrellas que se levantaban en el horizonte cada 10 días. Este sistema decanal, pintado en el cuerpo de Nut, es el origen de nuestra semana de 7 días y la división de las horas.',
  },
  {
    id: 'nilo-cielo',
    emoji: '🌊',
    title: 'El Nilo del Cielo',
    color: '#7EC8E3',
    icon: '𓈖',
    image: '/assets/egypt/infographic/nile_milkyway.png',
    content: [
      '¿Has visto alguna vez la Vía Láctea en una noche sin luces de ciudad? Es una franja de luz blanquecina que cruza todo el cielo, compuesta por cientos de miles de millones de estrellas tan lejanas que su luz se funde en un río luminoso.',
      'Los egipcios la veían con una claridad impresionante porque vivían en el desierto del Sahara, donde la contaminación lumínica era inexistente. En las noches despejadas de verano, la Vía Láctea se extendía de horizonte a horizonte como una cinta de plata celeste. Para ellos, esa franja brillante era un río cósmico: ¡el reflejo del Nilo en el cielo!',
      'El Nilo era literalmente la arteria vital de Egipto. Sin él, toda la civilización habría sido imposible: proporcionaba agua potable, irrigación para los cultivos, transporte, y sus inundaciones anuales depositaban limo fértil que convertía el desierto en tierra cultivable. Imaginar otro Nilo allá arriba, hecho de estrellas, era conectar lo sagrado con lo vital.',
      'Los astrónomos modernos han descubierto algo fascinante: la orientación de la Vía Láctea en el cielo egipcio durante el solsticio de verano (junio-julio) corría casi paralela al curso del Nilo. Investigaciones de Or Graur (2022, publicadas en el Journal of Astronomical History and Heritage) sugieren que los egipcios pudieron haber establecido esta conexión conscientemente.',
      'Además, la crecida anual del Nilo (la "inundación" o Akhet) comenzaba en julio, justo cuando Sirio — la estrella más brillante del cielo — aparecía por primera vez antes del amanecer (orto helíaco). Los egipcios veían este evento como la señal cósmica de que el Nilo celestial estaba derramando sus aguas sobre Egipto.',
    ],
    fact: 'Dato fascinante: Los astrónomos del antiguo Egipto crearon el primer calendario solar de 365 días basándose en el orto helíaco de Sirio (Sopdet). Este calendario fue tan preciso que Julio César lo adoptó como base para el calendario juliano en el 46 a.C., ¡y es el ancestro directo de nuestro calendario actual!',
  },
  {
    id: 'arriba-abajo',
    emoji: '✨',
    title: 'Como es Arriba, es Abajo',
    color: '#FFD700',
    icon: '𓂀',
    image: '/assets/egypt/infographic/as_above_below.png',
    content: [
      'Los egipcios tenían un principio filosófico profundo que ha influido en el pensamiento humano durante más de 4,000 años: lo que ocurre en el cielo es un reflejo de lo que sucede en la Tierra. El cosmos y la Tierra son espejos el uno del otro.',
      'Este concepto, conocido más tarde como el principio hermético "Como es arriba, es abajo" (atribuido a Hermes Trismegisto, una fusión del dios egipcio Thot con el griego Hermes), establecía que el macrocosmos (universo) y el microcosmos (ser humano, Tierra) están conectados por las mismas leyes.',
      'En la práctica, esto significaba que los egipcios construían sus templos y monumentos alineados con precisión astronómica. El templo de Karnak en Luxor está orientado para que la luz del Sol en el solsticio de invierno ilumine directamente el santuario interior. El templo de Abu Simbel está diseñado para que los rayos del Sol penetren hasta el fondo del templo solo dos veces al año: el 22 de febrero y el 22 de octubre.',
      'Los astrónomos modernos han confirmado con GPS y LiDAR que la alineación astronómica de los templos egipcios es extraordinariamente precisa — con errores de menos de 0.5 grados. Esto demuestra que los egipcios tenían conocimientos astronómicos sofisticados que aplicaban sistemáticamente a su arquitectura.',
      'En la ciencia moderna, este concepto tiene un eco sorprendente: la física cuántica muestra que las mismas leyes fundamentales gobiernan tanto las partículas subatómicas como las estructuras cósmicas. Los mismos elementos que forman nuestro cuerpo (carbono, oxígeno, hierro) fueron forjados en el interior de estrellas hace miles de millones de años. Como dijo Carl Sagan: "Somos materia estelar que reflexiona sobre las estrellas."',
    ],
    fact: 'Ejemplo fascinante: El Gran Templo de Abu Simbel fue construido con tal precisión que los rayos del Sol iluminan las estatuas interiores del santuario (a 60 metros de profundidad) exactamente los días 22 de febrero y 22 de octubre — posiblemente el cumpleaños y la coronación de Ramsés II. Cuando el templo fue reubicado en 1968 por la presa de Asuán, los ingenieros lograron mantener esta alineación con un día de diferencia.',
  },
  {
    id: 'orion-piramides',
    emoji: '🔺',
    title: 'Orión y las Pirámides',
    color: '#E8C96A',
    icon: '𓉔',
    image: '/assets/egypt/infographic/pyramids_orion.png',
    content: [
      'Las tres grandes pirámides de la meseta de Guiza — Keops (la más grande, con 146 metros originales), Kefrén (143 m) y Micerinos (65 m) — fueron construidas durante la IV Dinastía (c. 2580-2510 a.C.) y son las únicas de las Siete Maravillas del Mundo Antiguo que sobreviven.',
      'En 1994, el ingeniero belga-egipcio Robert Bauval publicó su "Teoría de la Correlación de Orión" en el libro "The Orion Mystery". Bauval observó que las tres pirámides de Guiza están dispuestas de forma similar a las tres estrellas del Cinturón de Orión: Alnitak, Alnilam y Mintaka. Incluso la ligera desviación de la pirámide más pequeña (Micerinos) corresponde al desplazamiento de Mintaka respecto a las otras dos estrellas.',
      'Además, así como las tres estrellas del cinturón de Orión se encuentran junto a la Vía Láctea, las pirámides están situadas en la ribera occidental del Nilo. Bauval argumentó que esto no era coincidencia, sino un diseño deliberado para reflejar el cielo en la Tierra.',
      'Es importante mantener el pensamiento crítico: esta hipótesis es debatida por la comunidad científica. Astrónomos como Ed Krupp (director del Observatorio Griffith) y el arqueólogo Mark Lehner han señalado que la correlación no es perfecta y que hay otras explicaciones para la disposición de las pirámides, como factores geológicos y logísticos del terreno.',
      'Lo que SÍ sabemos con certeza es que los egipcios conocían perfectamente la constelación de Orión. La llamaban "Sah" y la asociaban con Osiris, el dios de la resurrección y la vida después de la muerte. Los "conductos estelares" de la Gran Pirámide (shafts de ventilación) apuntaban hacia Orión y hacia la estrella polar de aquella época (Thuban, en la constelación de Draco), según mediciones de los astrónomos Alexander Badawy y Virginia Trimble (1964).',
    ],
    fact: '¡Dato verificado! Los shafts (conductos) de la Gran Pirámide no eran para ventilación: el shaft sur de la Cámara del Rey apuntaba a Alnitak (cinturón de Orión/Osiris) y el shaft norte a Thuban (la estrella polar del 2500 a.C.). Virginia Trimble, astrónoma de la UCI, calculó estas alineaciones con precisión en su estudio de 1964 publicado en Mitteilungen des Instituts für Orientforschung.',
  },
  {
    id: 'sagitario',
    emoji: '🕳️',
    title: 'El Monstruo del Centro',
    color: '#FF6B6B',
    icon: '𓆣',
    image: '/assets/egypt/infographic/sagittarius_blackhole.png',
    content: [
      '¿Ves la parte más brillante y densa de la Vía Láctea? Está en la dirección de la constelación de Sagitario. Ahí se esconde algo verdaderamente monstruoso: un agujero negro supermasivo llamado Sagitario A* (pronunciado "Sagitario A-estrella").',
      'Sagitario A* tiene la masa de 4.15 millones de soles comprimida en un espacio más pequeño que la órbita de Mercurio. Es tan masivo que deforma el espacio-tiempo a su alrededor, y ni siquiera la luz puede escapar de su interior. El "horizonte de eventos" — el punto de no retorno — tiene un radio de 12 millones de kilómetros.',
      'En 2020, los astrónomos Reinhard Genzel (Max Planck Institute) y Andrea Ghez (UCLA) ganaron el Premio Nobel de Física por demostrar la existencia de este agujero negro. Durante más de 20 años, rastrearon las órbitas de estrellas cercanas al centro galáctico. La estrella S2 orbita Sagitario A* en solo 16 años a velocidades de hasta 25,000 km/s (¡8% de la velocidad de la luz!).',
      'En mayo de 2022, el proyecto Event Horizon Telescope (EHT) reveló la primera imagen directa de Sagitario A*: un anillo de gas caliente brillante rodeando una sombra oscura central. Esta imagen requirió sincronizar 8 radiotelescopios alrededor del mundo para crear un telescopio virtual del tamaño de la Tierra.',
      'Los egipcios no sabían de agujeros negros, pero su mitología contenía una metáfora increíble: Apofis (Apep), la serpiente del caos, habitaba en las tinieblas del inframundo y cada noche intentaba devorar al dios Sol Ra durante su viaje nocturno. Si un agujero negro "devora" la luz, ¿no es Apofis la metáfora perfecta de Sagitario A*? La ciencia moderna a veces confirma las intuiciones de las antiguas culturas de maneras inesperadas.',
    ],
    fact: 'Dato Nobel: Andrea Ghez (Nobel 2020) es solo la cuarta mujer en ganar el Nobel de Física en toda la historia. Su equipo rastreó la estrella S2 durante 20 años y demostró que orbita un objeto invisible de 4 millones de masas solares en el centro de la Vía Láctea. La órbita de S2 también confirmó la teoría de la relatividad general de Einstein al detectar el corrimiento al rojo gravitacional predicho.',
  },
  {
    id: 'viaje-faraon',
    emoji: '👑',
    title: 'El Viaje del Faraón',
    color: '#F5A623',
    icon: '𓋹',
    image: '/assets/egypt/infographic/pharaoh_stars.png',
    content: [
      'Los "Textos de las Pirámides" son los escritos religiosos más antiguos del mundo. Fueron grabados por primera vez en la pirámide del faraón Unas (c. 2345 a.C.), último rey de la V Dinastía, en Saqqara. Contienen más de 800 declaraciones mágicas (Utterances) que describen el viaje del alma del faraón hacia las estrellas.',
      'Estos textos describen un viaje épico: cuando el faraón moría, su ba (alma) ascendía al cielo para reunirse con Osiris en la constelación de Orión (Sah). Las declaraciones son instrucciones de navegación cósmica: "Oh Rey, eres esta gran estrella, compañera de Orión, que atraviesa el cielo con Orión, que navega el Duat con Osiris" (Utterance 466).',
      'El Duat era el inframundo egipcio, pero no era subterráneo en el sentido que pensamos: era una región del cielo nocturno. Los textos sitúan el Duat en la zona de Orión y Sirio, y el faraón debía cruzar el "Campo de Juncos" (Sekhet-Aaru), una versión celestial de los fértiles campos del delta del Nilo.',
      'La reina era identificada con la diosa Isis, cuya forma estelar era Sirio (Sopdet) — la estrella más brillante del cielo nocturno. Sirio aparece justo al lado de Orión, y los egipcios interpretaban esta proximidad como el amor eterno entre Osiris e Isis, reunidos para siempre entre las estrellas.',
      'Los astrónomos Samuel Mercer (1952), Raymond Faulkner (1969) y James Allen (2005) tradujeron los Textos de las Pirámides, revelando un sofisticado mapa estelar codificado en lenguaje religioso. El faraón viajaba en la "Barca de Millones de Años" (la Vía Láctea) y se convertía en un akh — un ser luminoso, literalmente una estrella.',
    ],
    fact: 'Los techos de las tumbas reales del Valle de los Reyes se pintaban con estrellas de cinco puntas doradas sobre fondo azul lapislázuli. El difunto descansaba literalmente "dentro del vientre de Nut". En la tumba de Seti I (KV17), el techo astronómico muestra constelaciones egipcias completas que los astrónomos modernos están aún descifrando.',
  },
  {
    id: 'navegantes',
    emoji: '⛵',
    title: '¡Navegantes del Nilo Cósmico!',
    color: '#4ECDC4',
    icon: '𓊝',
    image: '/assets/egypt/infographic/celestial_navigation.png',
    content: [
      'La Vía Láctea no solo era un concepto religioso: ¡era una herramienta de navegación práctica! Los marineros egipcios usaban la franja de la Vía Láctea junto con estrellas específicas para orientarse en sus viajes nocturnos por el Nilo y el Mediterráneo oriental.',
      'Los egipcios fueron grandes navegantes. Sus barcos comerciales llegaban hasta Biblos (Líbano) para importar madera de cedro, hasta Punt (probablemente Somalia o Eritrea) para incienso y mirra, y hasta Creta para comerciar con la civilización minoica. La reina Hatshepsut (c. 1470 a.C.) envió una famosa expedición naval a Punt, documentada en relieves de su templo en Deir el-Bahari.',
      'Para la navegación nocturna, combinaban la posición de la Vía Láctea con estrellas de referencia. Los "relojes estelares" encontrados en techos de tumbas (como el de Senenmut, arquitecto de Hatshepsut) muestran tablas de estrellas decanales que indicaban la hora de la noche y la dirección cardinal según qué estrellas eran visibles.',
      'En el desierto del Sahara occidental, la Vía Láctea es tan brillante que proyecta una sombra tenue pero mensurable sobre la arena. Los astrónomos modernos han verificado este fenómeno: con una magnitud visual combinada de aproximadamente -6.5, la Vía Láctea en condiciones ideales produce sombras con una iluminancia de 0.002 lux.',
      'Los astrónomos modernos instalan sus mejores telescopios en lugares similares al desierto egipcio: el Observatorio Paranal (Chile) y el Observatorio de Mauna Kea (Hawái) se eligieron por su cielo oscuro, aire seco y altitud — las mismas condiciones que los egipcios disfrutaban naturalmente hace 5,000 años.',
    ],
    fact: 'Dato increíble: El "Papiro de Turín" (c. 1150 a.C.) contiene el primer mapa geológico conocido de la historia, y los "relojes estelares" de Senenmut son el atlas estelar más antiguo conocido. Los egipcios no solo navegaban por el Nilo físico, sino que cartografiaron sistemáticamente el Nilo de las estrellas.',
  },
  {
    id: 'galaxia-numeros',
    emoji: '🔢',
    title: 'Nuestra Galaxia en Números',
    color: '#00E4FF',
    icon: '𓊹',
    image: '/assets/egypt/infographic/galaxy_numbers.png',
    content: [
      'La Vía Láctea tiene un diámetro de aproximadamente 100,000 a 180,000 años luz. La luz (que viaja a 300,000 km/s) tarda 100,000 años en cruzar nuestra galaxia de lado a lado. Para ponerlo en perspectiva: si la Vía Láctea fuera del tamaño de España, nuestro Sistema Solar sería más pequeño que un grano de arena.',
      'Contiene entre 100,000 millones y 400,000 millones de estrellas (las estimaciones varían según los modelos). Nuestro Sol es solo UNA de ellas, una estrella amarilla de tipo espectral G2V, bastante común y ubicada a unos 26,000 años luz del centro galáctico, en un brazo espiral menor llamado el "Brazo de Orión".',
      'El Sol tarda 225-250 millones de años en completar una órbita alrededor del centro galáctico — este período se llama "año galáctico". Desde que existen los dinosaurios T-Rex (hace 68 millones de años), el Sol apenas ha completado un cuarto de órbita. ¡Los egipcios existieron durante menos de 0.00002 grados de rotación galáctica!',
      'Además de estrellas, la Vía Láctea contiene nubes moleculares gigantes (donde nacen nuevas estrellas), nebulosas planetarias (estrellas moribundas), púlsares, sistemas binarios, y al menos 100 mil millones de planetas — según el telescopio espacial Kepler de la NASA. La probabilidad de que exista vida en alguno de ellos es, estadísticamente, muy alta.',
      'La galaxia más cercana comparable a la nuestra es Andrómeda (M31), a 2.5 millones de años luz. La NASA y el ESA confirmaron en 2012 que Andrómeda y la Vía Láctea colisionarán en aproximadamente 4,500 millones de años, fusionándose en una galaxia elíptica gigante que los astrónomos ya han bautizado como "Milkomeda". No te preocupes: las distancias entre estrellas son tan enormes que las colisiones individuales serán extremadamente raras.',
    ],
    fact: '¿Sabías que...? La palabra "galaxia" viene del griego "galaxías kýklos" (γαλαξίας κύκλος) que significa "círculo lechoso", porque los griegos imaginaban que la Vía Láctea era leche derramada por la diosa Hera. Los egipcios, más poéticamente, la llamaban el Nilo del cielo. Y la ciencia moderna ha revelado que ambos tenían razón en algo: es un río — un río de 200 mil millones de soles. 🌌',
  },
];

// ─── Star Field Background ──────────────────────────────────────────────────
function StarField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.parentElement.offsetWidth;
    const h = canvas.height = canvas.parentElement.offsetHeight;
    const stars = Array.from({ length: 80 }, () => ({
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
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, opacity * 0.15)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

// ─── Nut Silhouette SVG Header ───────────────────────────────────────────────
function NutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(232,201,106,0.3))' }}>
        {/* Nut arching body */}
        <path
          d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110"
          fill="none"
          stroke="url(#nutGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Stars along Nut's body */}
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.15;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy + 15}
              r="3"
              fill="#FFD700"
              animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
            />
          );
        })}
        {/* Hands and feet */}
        <circle cx="30" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="570" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        {/* Head */}
        <circle cx="300" cy="8" r="7" fill="rgba(232,201,106,0.8)" style={{ filter: 'drop-shadow(0 0 8px rgba(232,201,106,0.5))' }} />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="nutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(232,201,106,0.3)" />
            <stop offset="50%" stopColor="rgba(232,201,106,0.9)" />
            <stop offset="100%" stopColor="rgba(232,201,106,0.3)" />
          </linearGradient>
        </defs>
        {/* Title text */}
        <text x="300" y="80" textAnchor="middle" fill="#E8C96A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">
          EL NILO DE NUT
        </text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(232,201,106,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">
          LA VÍA LÁCTEA EN EL ANTIGUO EGIPTO
        </text>
      </svg>
    </div>
  );
}

// ─── Node Button ─────────────────────────────────────────────────────────────
function NodeButton({ node, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97 }}
      animate={isActive ? { scale: 1.05, boxShadow: `0 0 25px ${node.color}60, 0 4px 20px rgba(0,0,0,0.4)` } : {}}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${node.color}25, ${node.color}10)`
          : 'rgba(255,255,255,0.03)',
        border: `2px solid ${isActive ? node.color : 'rgba(232,201,106,0.25)'}`,
        borderRadius: '16px',
        padding: '1.2rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        transition: 'border-color 0.3s, background 0.3s',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hieroglyphic watermark */}
      <span style={{
        position: 'absolute',
        top: '5px',
        right: '8px',
        fontSize: '1.4rem',
        opacity: 0.08,
        color: node.color,
        fontFamily: 'serif',
        pointerEvents: 'none',
      }}>
        {node.icon}
      </span>

      {/* Emoji icon with glow */}
      <motion.span
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: '2rem',
          filter: isActive ? `drop-shadow(0 0 8px ${node.color})` : 'none',
          lineHeight: 1,
        }}
      >
        {node.emoji}
      </motion.span>

      {/* Title */}
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.5px',
        textAlign: 'center',
        lineHeight: 1.3,
        transition: 'color 0.3s',
      }}>
        {node.title}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '20%',
            right: '20%',
            height: '3px',
            background: node.color,
            borderRadius: '3px 3px 0 0',
            boxShadow: `0 0 10px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Content Panel (with image) ──────────────────────────────────────────────
function ContentPanel({ node, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{
        background: 'rgba(15, 15, 40, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${node.color}40`,
        borderRadius: '20px',
        padding: '0',
        position: 'relative',
        zIndex: 3,
        marginTop: '0.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1rem', right: '1rem', zIndex: 5,
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%', width: '36px', height: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
          transition: 'all 0.2s',
        }}
      >
        <X size={18} />
      </button>

      {/* Hero Image */}
      {node.image && (
        <div style={{
          width: '100%', height: '220px', overflow: 'hidden',
          position: 'relative',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.3))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: 0.9,
            }}
          />
          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
            background: 'linear-gradient(transparent, rgba(15,15,40,0.95))',
          }} />
          {/* Title overlay */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <span style={{ fontSize: '2rem', filter: `drop-shadow(0 0 8px ${node.color})` }}>{node.emoji}</span>
            <div>
              <h3 style={{
                margin: 0, fontSize: '1.4rem', fontWeight: 800,
                color: node.color, letterSpacing: '-0.02em',
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }}>
                {node.title}
              </h3>
              <span style={{
                fontSize: '1.2rem', opacity: 0.15, fontFamily: 'serif', color: node.color,
              }}>
                {node.icon} {node.icon} {node.icon}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '1.5rem 2rem 2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {node.content.map((para, i) => (
            <p
              key={i}
              style={{
                margin: 0, fontSize: '1rem', lineHeight: 1.8,
                color: 'rgba(255,255,255,0.85)',
                paddingLeft: i > 0 ? '0.5rem' : 0,
                borderLeft: i > 0 ? `2px solid ${node.color}20` : 'none',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Fact box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `${node.color}10`,
            border: `1px solid ${node.color}30`,
            borderRadius: '12px',
            padding: '1rem 1.2rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
          }}>
            <Sparkles size={18} style={{ flexShrink: 0, marginTop: '2px', color: node.color }} />
            <p style={{
              margin: 0, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.95rem', lineHeight: 1.7,
            }}>
              {node.fact}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(232,201,106,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFD700', flexShrink: 0 }} />
      <div style={{
        flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)',
        borderRadius: '3px', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #E8C96A, #FFD700)',
            borderRadius: '3px',
            boxShadow: '0 0 8px rgba(232,201,106,0.4)',
          }}
        />
      </div>
      <span style={{
        fontSize: '0.75rem',
        color: '#E8C96A',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        minWidth: '45px',
        textAlign: 'right',
      }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_EgyptM11() {
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
      background: 'linear-gradient(180deg, #0B0E2D 0%, #1A1040 40%, #0B0E2D 100%)',
      borderRadius: '24px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(232,201,106,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />

      {/* Nut header */}
      <NutHeader />

      {/* Progress */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {/* Instruction */}
      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center',
            color: 'rgba(232,201,106,0.7)',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Haz clic en cada tema para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* Nodes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '0.8rem',
        position: 'relative',
        zIndex: 2,
        marginBottom: '1.5rem',
      }}>
        {INFOGRAPHIC_NODES.map(node => (
          <NodeButton
            key={node.id}
            node={node}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      {/* Expanded Content Panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel
            key={activeData.id}
            node={activeData}
            onClose={() => setActiveNode(null)}
          />
        )}
      </AnimatePresence>

      {/* Completion message */}
      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(232,201,106,0.08)',
              borderRadius: '16px',
              border: '1px solid rgba(232,201,106,0.25)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todos los secretos del Nilo de Nut!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Navegante Galáctico
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
