'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (inline, no external images needed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.25, ...style }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#7EC8E3', style = {} }) {
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

function DecoScarab({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="14" r="10" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="36" rx="12" ry="16" fill={color} opacity="0.3" />
      <path d="M18 30 Q2 18 6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 30 Q58 18 54 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="36" x2="6" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="54" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="42" x2="8" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="42" x2="52" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style }}>
      <polygon points="40,4 72,52 8,52" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="56,8 80,52 40,52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="2" r="2" fill={color} opacity="0.8" />
      <circle cx="56" cy="6" r="1.5" fill={color} opacity="0.6" />
      <circle cx="48" cy="0" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSerpent({ size = 80, color = '#FF6B6B', style = {} }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 80 64" style={{ opacity: 0.2, ...style }}>
      <path d="M12 56 Q12 30 24 20 Q36 10 40 16 Q44 22 36 28 Q28 34 32 44 Q36 54 48 48 Q60 42 56 28 Q52 14 64 8" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="66" cy="6" r="4" fill={color} opacity="0.4" />
      <circle cx="68" cy="4" r="1.5" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoStarCluster({ size = 60, color = '#C4A7E7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {[{x:30,y:10,r:3},{x:15,y:25,r:2},{x:45,y:20,r:2.5},{x:20,y:45,r:2},{x:40,y:42,r:3},{x:30,y:30,r:4},{x:10,y:12,r:1.5},{x:50,y:48,r:1.5}].map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill={color} opacity={0.6} />
          <circle cx={s.x} cy={s.y} r={s.r * 2.5} fill={color} opacity={0.1} />
        </g>
      ))}
    </svg>
  );
}

function DecoShip({ size = 80, color = '#4ECDC4', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      <path d="M10 32 Q40 20 70 32 L64 40 L16 40 Z" fill={color} opacity="0.3" />
      <line x1="40" y1="8" x2="40" y2="32" stroke={color} strokeWidth="2" />
      <path d="M40 10 Q55 18 40 28" fill={color} opacity="0.4" />
      <path d="M4 42 L76 42" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M0 46 Q20 42 40 46 Q60 42 80 46" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoSpiral({ size = 70, color = '#00E4FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <path d="M30 30 Q30 20 35 18 Q42 16 44 22 Q46 30 38 34 Q28 38 24 28 Q20 16 32 12 Q46 8 50 24 Q54 42 34 48 Q16 54 10 34 Q4 12 22 4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs for floating decorations
const DECO_MAP = {
  'nut': [DecoStarCluster, DecoAnkh, DecoEye],
  'nilo-cielo': [DecoShip, DecoStarCluster, DecoEye],
  'arriba-abajo': [DecoAnkh, DecoPyramid, DecoEye],
  'orion-piramides': [DecoPyramid, DecoStarCluster, DecoScarab],
  'sagitario': [DecoSerpent, DecoSpiral, DecoStarCluster],
  'viaje-faraon': [DecoScarab, DecoAnkh, DecoStarCluster],
  'navegantes': [DecoShip, DecoEye, DecoStarCluster],
  'galaxia-numeros': [DecoSpiral, DecoStarCluster, DecoPyramid],
};

const BIBLIOGRAPHY = [
  'Allen, J.P. (2005). The Ancient Egyptian Pyramid Texts, SBL',
  'Krupp, E.C. (1983). Echoes of the Ancient Skies: Astronomy of Lost Civilizations, Harper & Row',
  'Frankfort, H. (1948). Kingship and the Gods, University of Chicago Press',
  'Wells, R.A. (1996). Astronomy in Egypt, Astronomy Before the Telescope, British Museum Press'
];

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INFOGRAPHIC_NODES = [
  {
    id: 'nut',
    title: '¿Quién es Nut?',
    color: '#C4A7E7',
    btnImage: '/assets/egypt/infographic/btn_nut.png',
    image: '/assets/egypt/infographic/nut_goddess.png',
    content: [
      'Imagina que pudieras ver a una persona gigante estirándose de un lado al otro del cielo. ¡Así veían los antiguos egipcios a Nut (se pronuncia "Nut"), la diosa del cielo! En la cosmología egipcia, Nut era una de las deidades más antiguas, hija de Shu (dios del aire) y Tefnut (diosa de la humedad).',
      'Los egipcios imaginaban a Nut como una mujer enorme que se arqueaba sobre la Tierra con la espalda formando la bóveda celeste. Sus dedos de los pies tocaban el horizonte oriental y sus manos el horizonte occidental. Debajo de ella estaba Geb, el dios de la Tierra, su esposo, tendido boca arriba.',
      'Las estrellas eran joyas brillantes pintadas en su piel. Cada noche, Nut se tragaba al Sol (Ra) por el oeste al atardecer. Ra viajaba dentro de su cuerpo durante toda la noche, navegando por un río subterráneo, y al amanecer Nut lo daba a luz de nuevo por el este.',
      'El Libro de Nut, un texto astronómico egipcio del siglo XIII a.C., describe cómo las estrellas también eran tragadas por Nut al amanecer y renacían al anochecer. Los astrónomos egipcios llamaron "estrellas imperecederas" a las circumpolares (que nunca se ocultan) y "estrellas infatigables" a los planetas.',
      'Los techos de las tumbas reales en el Valle de los Reyes están decorados con el cuerpo azul de Nut cubierto de estrellas doradas. El sarcófago de Ramsés VI (KV9) tiene una de las representaciones más completas.',
      'Además, los arqueoastrónomos como J.P. Allen han estudiado a fondo los Textos de las Pirámides, donde Nut no es solo una figura poética, sino un mapa celeste codificado. Su cuerpo delimitaba las trayectorias de los astros que los sacerdotes egipcios observaban noche tras noche desde los techos de sus templos, utilizándola como la primera cuadrícula de coordenadas astronómicas de la historia.',
      'En la fascinante cosmovisión egipcia, el cielo nocturno y el cuerpo de Nut eran uno solo. Según el investigador E.C. Krupp, los sacerdotes usaban instrumentos como el "merkhet" (una antigua herramienta de observación) para medir el tránsito de las estrellas a lo largo de la "espalda" de la diosa, permitiéndoles marcar con precisión las horas de la noche y planificar rituales importantes en completa sincronía con el cosmos.',
    ],
    fact: '¿Sabías que...? Los egipcios dividieron la noche en 12 horas usando 36 "decanes" â€” grupos de estrellas que se levantaban en el horizonte cada 10 días. Este sistema decanal es el origen de nuestra semana de 7 días.',
  },
  {
    id: 'nilo-cielo',
    title: 'El Nilo del Cielo',
    color: '#7EC8E3',
    btnImage: '/assets/egypt/infographic/btn_nile.png',
    image: '/assets/egypt/infographic/nile_milkyway.png',
    content: [
      '¿Has visto alguna vez la Vía Láctea en una noche sin luces de ciudad? Es una franja de luz blanquecina que cruza todo el cielo, compuesta por cientos de miles de millones de estrellas tan lejanas que su luz se funde en un río luminoso.',
      'Los egipcios la veían con una claridad impresionante porque vivían en el desierto del Sahara, donde la contaminación lumínica era inexistente. Para ellos, esa franja brillante era un río cósmico: ¡el reflejo del Nilo en el cielo!',
      'El Nilo era literalmente la arteria vital de Egipto. Sin él, toda la civilización habría sido imposible: proporcionaba agua potable, irrigación para los cultivos, transporte, y sus inundaciones anuales depositaban limo fértil.',
      'Investigaciones de Or Graur (2022, Journal of Astronomical History and Heritage) sugieren que los egipcios establecieron esta conexión conscientemente: la Vía Láctea en el solsticio de verano corría casi paralela al Nilo.',
      'La crecida anual del Nilo comenzaba en julio, justo cuando Sirio â€” la estrella más brillante del cielo â€” aparecía por primera vez antes del amanecer (orto helíaco). Los egipcios veían este evento como la señal cósmica de que el Nilo celestial derramaba sus aguas.',
      'Al observar este resplandeciente Nilo cósmico, los antiguos egipcios creían fervientemente que su Nilo terrenal nacía directamente de sus aguas estelares. Estudios arqueoastronómicos liderados por el Dr. R.A. Wells indican que la orientación de muchos canales de irrigación antiguos y monumentos menores seguía la inclinación de la Vía Láctea durante la temporada de siembra, buscando bendecir sus cultivos.',
      'Esta conexión era tan profunda que los faraones construían barcos solares, como el impresionante barco de Keops encontrado junto a la Gran Pirámide, diseñados específicamente para navegar por estas aguas celestiales después de la vida. Para la mentalidad de la época, el cielo no era un lugar vacío y abstracto, sino un paisaje físico, húmedo y navegable donde las estrellas eran islas de luz y la Vía Láctea la corriente principal.',
    ],
    fact: 'Los astrónomos del antiguo Egipto crearon el primer calendario solar de 365 días basándose en el orto helíaco de Sirio. Julio César lo adoptó como base para el calendario juliano en el 46 a.C., ¡y es el ancestro de nuestro calendario actual!',
  },
  {
    id: 'arriba-abajo',
    title: 'Como es Arriba, es Abajo',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic/btn_above.png',
    image: '/assets/egypt/infographic/as_above_below.png',
    content: [
      'Los egipcios tenían un principio filosófico profundo: lo que ocurre en el cielo es un reflejo de lo que sucede en la Tierra. El cosmos y la Tierra son espejos el uno del otro.',
      'Este concepto, conocido como el principio hermético "Como es arriba, es abajo" (atribuido a Hermes Trismegisto, fusión del dios egipcio Thot con Hermes griego), establecía que el macrocosmos y el microcosmos están conectados por las mismas leyes.',
      'En la práctica, los egipcios construían templos alineados con precisión astronómica. El templo de Abu Simbel está diseñado para que los rayos del Sol penetren hasta el fondo solo dos veces al año: el 22 de febrero y el 22 de octubre.',
      'Los astrónomos modernos han confirmado con GPS y LiDAR que la alineación astronómica de los templos egipcios es extraordinariamente precisa â€” con errores de menos de 0.5 grados.',
      'En la ciencia moderna, este concepto tiene un eco sorprendente: los mismos elementos que forman nuestro cuerpo fueron forjados en el interior de estrellas hace miles de millones de años. Como dijo Carl Sagan: "Somos materia estelar."',
      'Esta idea de reflejar el cielo en la Tierra no era solo poesía, ¡era alta ingeniería! El profesor H. Frankfort en su obra "Kingship and the Gods" explica cómo la fundación de cualquier templo egipcio comenzaba con el ritual de "tensar la cuerda". En esta ceremonia, el faraón, con la ayuda de la diosa del cielo estrellado Seshat, alineaba los cimientos del templo con estrellas específicas de la constelación de la Osa Mayor, a la que llamaban la "Pierna de Toro".',
      'Esta búsqueda incansable por armonizar las construcciones humanas con el universo visible demuestra que los egipcios poseían conocimientos matemáticos y astronómicos sumamente avanzados. Hoy en día, la física cuántica y la astrofísica también nos enseñan que las leyes fundamentales que rigen el comportamiento de las partículas diminutas en nuestro cuerpo son exactamente las mismas que dictan la danza de las galaxias gigantescas en el universo.',
    ],
    fact: 'El Gran Templo de Abu Simbel ilumina las estatuas interiores (a 60m de profundidad) exactamente los días 22 de febrero y 22 de octubre. Cuando fue reubicado en 1968 por la presa de Asuán, los ingenieros lograron mantener esta alineación con solo un día de diferencia.',
  },
  {
    id: 'orion-piramides',
    title: 'Orión y las Pirámides',
    color: '#E8C96A',
    btnImage: '/assets/egypt/infographic/btn_pyramids.png',
    image: '/assets/egypt/infographic/pyramids_orion.png',
    content: [
      'Las tres grandes pirámides de Guiza â€” Keops (146m), Kefrén (143m) y Micerinos (65m) â€” fueron construidas durante la IV Dinastía (c. 2580-2510 a.C.) y son las únicas de las Siete Maravillas del Mundo Antiguo que sobreviven.',
      'Robert Bauval (1994) observó que las tres pirámides están dispuestas de forma similar a las tres estrellas del Cinturón de Orión: Alnitak, Alnilam y Mintaka. Incluso la ligera desviación de Micerinos corresponde al desplazamiento de Mintaka.',
      'Es importante el pensamiento crítico: astrónomos como Ed Krupp (Observatorio Griffith) han señalado que la correlación no es perfecta y hay otras explicaciones para la disposición.',
      'Lo que SÍ sabemos con certeza es que los egipcios conocían Orión. La llamaban "Sah" y la asociaban con Osiris. Los conductos de la Gran Pirámide apuntaban hacia Orión y hacia Thuban (estrella polar del 2500 a.C.).',
      'Virginia Trimble (1964, Mitteilungen des Instituts für Orientforschung) calculó estas alineaciones con precisión, demostrando la intencionalidad astronómica de los constructores.',
      'Las investigaciones arqueoastronómicas han desatado debates apasionantes sobre cuánto sabían los egipcios de las constelaciones modernas. Mientras que la teoría de la correlación de Orión sigue siendo popular, el experto J.P. Allen sugiere que la alineación de las pirámides podría reflejar el viaje de las almas hacia el norte polar, en lugar de una constelación del sur, destacando la inmensa complejidad de su astronomía observacional.',
      'Independientemente de la interpretación exacta, la precisión monumental de Guiza sigue asombrando al mundo. Los constructores lograron nivelar la base de la Gran Pirámide con un margen de error menor a 2 centímetros. Esta obsesión por la exactitud milimétrica no era solo para demostrar poder arquitectónico, sino para asegurar que el faraón pudiera ser catapultado hacia el reino estelar de Sah con precisión matemática garantizada.',
    ],
    fact: 'Los shafts de la Gran Pirámide no eran para ventilación: el shaft sur de la Cámara del Rey apuntaba a Alnitak (Orión/Osiris) y el shaft norte a Thuban (la estrella polar del 2500 a.C.).',
  },
  {
    id: 'sagitario',
    title: 'El Monstruo del Centro',
    color: '#FF6B6B',
    btnImage: '/assets/egypt/infographic/btn_blackhole.png',
    image: '/assets/egypt/infographic/sagittarius_blackhole.png',
    content: [
      'En la dirección de la constelación de Sagitario se esconde algo verdaderamente monstruoso: un agujero negro supermasivo llamado Sagitario A* â€” con la masa de 4.15 millones de soles comprimida en un espacio más pequeño que la órbita de Mercurio.',
      'En 2020, Reinhard Genzel y Andrea Ghez ganaron el Premio Nobel de Física por demostrar su existencia. Durante más de 20 años, rastrearon la estrella S2, que orbita Sagitario A* a velocidades de hasta 25,000 km/s (¡8% de la velocidad de la luz!).',
      'En mayo de 2022, el proyecto Event Horizon Telescope reveló la primera imagen directa de Sagitario A*: un anillo de gas caliente brillante rodeando una sombra oscura. Se sincronizaron 8 radiotelescopios alrededor del mundo.',
      'Los egipcios no sabían de agujeros negros, pero su mitología contenía una metáfora increíble: Apofis, la serpiente del caos, habitaba en las tinieblas e intentaba devorar al Sol cada noche.',
      'Si un agujero negro "devora" la luz, ¿no es Apofis la metáfora perfecta de Sagitario A*? La ciencia moderna a veces confirma las intuiciones de las antiguas culturas de maneras inesperadas.',
      'Lo fascinante es cómo la mitología de Apofis coincide temáticamente con lo que hoy sabemos de los agujeros negros. Apofis era la nada, el vacío primordial que amenazaba con devorar la luz, la materia y el orden del universo (el "Maat" egipcio). De manera sorprendentemente similar, el agujero negro de nuestra galaxia, Sagitario A*, ejerce una gravedad tan monstruosa que nada, ni siquiera la luz, puede escapar si cruza su horizonte de eventos.',
      'Los científicos modernos, utilizando interferometría de muy larga base que conecta radiotelescopios en toda la Tierra, han mapeado los turbulentos vientos magnéticos y las voraces corrientes de gas supercalentado que caen en espiral hacia Sagitario A*. Es como si la astronomía moderna hubiera fotografiado al monstruo cósmico que los sacerdotes egipcios imaginaban escondido en la oscuridad, acechando la frágil luz de las estrellas.',
    ],
    fact: 'Andrea Ghez (Nobel 2020) es solo la cuarta mujer en ganar el Nobel de Física en toda la historia. La órbita de S2 también confirmó la relatividad general de Einstein al detectar el corrimiento al rojo gravitacional.',
  },
  {
    id: 'viaje-faraon',
    title: 'El Viaje del Faraón',
    color: '#F5A623',
    btnImage: '/assets/egypt/infographic/btn_pharaoh.png',
    image: '/assets/egypt/infographic/pharaoh_stars.png',
    content: [
      'Los "Textos de las Pirámides" son los escritos religiosos más antiguos del mundo, grabados en la pirámide de Unas (c. 2345 a.C.) con más de 800 declaraciones mágicas que describen el viaje del alma del faraón hacia las estrellas.',
      '"Oh Rey, eres esta gran estrella, compañera de Orión, que atraviesa el cielo con Orión, que navega el Duat con Osiris" (Utterance 466). Las declaraciones son instrucciones de navegación cósmica.',
      'El Duat era el inframundo egipcio situado en la zona de Orión y Sirio. El faraón cruzaba el "Campo de Juncos" (Sekhet-Aaru), una versión celestial de los fértiles campos del delta del Nilo.',
      'La reina era identificada con Isis, cuya forma estelar era Sirio â€” la estrella más brillante. Sirio aparece junto a Orión: el amor eterno entre Osiris e Isis reunidos entre las estrellas.',
      'El faraón viajaba en la "Barca de Millones de Años" (la Vía Láctea) y se convertía en un akh â€” un ser luminoso, literalmente una estrella.',
      'La meticulosa atención de los antiguos egipcios a las estrellas se basaba en la creencia de que el cosmos era una máquina viviente y divina. Según el célebre egiptólogo H. Frankfort, el faraón no solo viajaba hacia las estrellas, sino que se convertía en el motor cósmico que mantenía el universo en movimiento. Los jeroglíficos detallan encantamientos precisos que el rey debía pronunciar para abrir los "portales del cielo" guardados por guardianes estelares.',
      'Para orientarse en esta geografía celestial, los sacerdotes crearon sofisticados mapas estelares que plasmaban en el interior de los sarcófagos de madera del Imperio Medio. Estos mapas, conocidos como relojes estelares diagonales, son de los diagramas celestes más antiguos de la humanidad. Combinaban la función de reloj nocturno con una guía espiritual, asegurando que el alma no se perdiera en la inmensidad del Duat y alcanzara el cinturón de Orión.',
    ],
    fact: 'Los techos de las tumbas del Valle de los Reyes tienen estrellas de cinco puntas doradas sobre fondo azul lapislázuli. En la tumba de Seti I (KV17), el techo astronómico muestra constelaciones que los astrónomos aún están descifrando.',
  },
  {
    id: 'navegantes',
    title: '¡Navegantes del Nilo Cósmico!',
    color: '#4ECDC4',
    btnImage: '/assets/egypt/infographic/btn_ship.png',
    image: '/assets/egypt/infographic/celestial_navigation.png',
    content: [
      'La Vía Láctea no solo era un concepto religioso: ¡era una herramienta de navegación práctica! Los marineros usaban la franja de la Vía Láctea junto con estrellas específicas para orientarse en viajes nocturnos.',
      'Los egipcios fueron grandes navegantes. Sus barcos llegaban hasta Biblos (Líbano), Punt (probablemente Somalia), y Creta. La reina Hatshepsut (c. 1470 a.C.) envió una famosa expedición naval documentada en su templo.',
      'Los "relojes estelares" encontrados en techos de tumbas (como el de Senenmut, arquitecto de Hatshepsut) muestran tablas de estrellas decanales que indicaban la hora y la dirección cardinal.',
      'En el desierto del Sahara, la Vía Láctea es tan brillante que proyecta una sombra tenue â€” con una iluminancia de 0.002 lux verificada por astrónomos modernos.',
      'Los mejores observatorios modernos (Paranal en Chile, Mauna Kea en Hawái) se eligen por condiciones similares al desierto egipcio: cielo oscuro, aire seco y altitud.',
      'La experiencia de navegar utilizando las estrellas forjó una conexión inquebrantable entre el cielo y los egipcios cotidianos, no solo los faraones. Investigaciones recientes han revelado que incluso en el puerto de Wadi al-Jarf, el puerto más antiguo conocido del mundo ubicado en el Mar Rojo, los barcos egipcios se alineaban cuidadosamente utilizando las posiciones de Canopus y Sirio para trazar rutas comerciales seguras hacia la legendaria tierra de Punt.',
      'A pesar de que no poseían brújulas magnéticas ni astrolabios complejos, los astrónomos egipcios lograron medir la altitud de las estrellas usando plomadas y la apertura de una rama de palma. Esta instrumentación rudimentaria, pero extremadamente efectiva, fue el pilar fundamental que permitió a las expediciones cruzar el mar abierto en la oscuridad total. Fueron los pioneros absolutos de la navegación astronómica milenios antes de que los europeos cruzaran el Atlántico.',
    ],
    fact: 'El "Papiro de Turín" (c. 1150 a.C.) contiene el primer mapa geológico conocido, y los relojes estelares de Senenmut son el atlas estelar más antiguo del mundo.',
  },
  {
    id: 'galaxia-numeros',
    title: 'Nuestra Galaxia en Números',
    color: '#00E4FF',
    btnImage: '/assets/egypt/infographic/btn_galaxy.png',
    image: '/assets/egypt/infographic/galaxy_numbers.png',
    content: [
      'La Vía Láctea tiene un diámetro de 100,000 a 180,000 años luz. Si fuera del tamaño de España, nuestro Sistema Solar sería más pequeño que un grano de arena.',
      'Contiene entre 100,000 y 400,000 millones de estrellas. Nuestro Sol está a 26,000 años luz del centro, en el "Brazo de Orión". Tarda 225-250 millones de años en completar una órbita galáctica.',
      'Desde los dinosaurios T-Rex (hace 68 millones de años), el Sol apenas completó un cuarto de órbita. ¡Los egipcios existieron durante menos de 0.00002 grados de rotación galáctica!',
      'Según el telescopio Kepler de la NASA, hay al menos 100 mil millones de planetas en nuestra galaxia. La probabilidad de vida en alguno es estadísticamente muy alta.',
      'La Vía Láctea y Andrómeda colisionarán en 4,500 millones de años, creando "Milkomeda". Las distancias entre estrellas son tan enormes que las colisiones individuales serán extremadamente raras.',
      'Pensar en la escala del universo nos llena de asombro. La Vía Láctea forma parte del llamado Grupo Local, un vecindario cósmico con unas 54 galaxias. Y nuestro Sistema Solar viaja a la increíble velocidad de unos 828,000 km/h alrededor del centro galáctico. A pesar de esta velocidad vertiginosa, los antiguos egipcios observaron exactamente las mismas constelaciones que nosotros, porque las distancias son tan vastas que los cambios toman decenas de miles de años.',
      'Los astrónomos modernos usan telescopios espaciales como el James Webb para observar el polvo galáctico iluminado por la luz infrarroja, descubriendo estrellas naciendo en guarderías estelares que se ocultan dentro de nuestro propio "Nilo celeste". Así que, al igual que los egipcios creían en el ciclo de nacimiento, muerte y renacimiento de Ra a través del cuerpo estrellado de Nut, la astrofísica moderna confirma que la Vía Láctea es un colosal y vibrante ciclo de reciclaje cósmico.',
    ],
    fact: '"Galaxia" viene del griego "galaxías kýklos" (círculo lechoso). Los egipcios la llamaban el Nilo del cielo. La ciencia reveló que ambos tenían razón: es un río de 200 mil millones de soles. ðŸŒŒ',
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
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Nut Silhouette SVG Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(232,201,106,0.3))' }}>
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#nutGrad)" strokeWidth="3" strokeLinecap="round" />
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => (
          <motion.circle key={i} cx={cx} cy={10 + Math.abs(cx - 300) * 0.15 + 15} r="3" fill="#FFD700"
            animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
          />
        ))}
        <circle cx="30" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="570" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="300" cy="8" r="7" fill="rgba(232,201,106,0.8)" style={{ filter: 'drop-shadow(0 0 8px rgba(232,201,106,0.5))' }} />
        <defs>
          <linearGradient id="nutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(232,201,106,0.3)" />
            <stop offset="50%" stopColor="rgba(232,201,106,0.9)" />
            <stop offset="100%" stopColor="rgba(232,201,106,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E8C96A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL NILO DE NUT</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(232,201,106,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA VÍA LÁCTEA EN EL ANTIGUO EGIPTO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (circular image-based) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      {/* Circular image container */}
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(232,201,106,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.btnImage}
          alt={node.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}
         loading="lazy" />
        {/* Glow ring when active */}
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

      {/* Label */}
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '100px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {/* Active dot */}
      {isActive && (
        <motion.div
          layoutId="activeDot"
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  
  // Positions for floating decorative elements
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
        background: 'rgba(12, 12, 35, 0.9)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      {/* Close button */}
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
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>

        {/* Right: Title + first 2 paragraphs */}
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {/* Floating deco top-right */}
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
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

      {/* â”€â”€â”€ Magazine Body: Alternating text + decorations â”€â”€â”€ */}
      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {/* Floating decorative elements */}
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        {/* Remaining paragraphs in magazine layout */}
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
                  background: `rgba(255,255,255,0.02)`,
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                {/* Paragraph number badge */}
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
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

        {/* â”€â”€â”€ Fact Box (styled as pull-quote) â”€â”€â”€ */}
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #E8C96A, #FFD700)', borderRadius: '3px', boxShadow: '0 0 8px rgba(232,201,106,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E8C96A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM11() {
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
      background: 'linear-gradient(180deg, #0B0E2D 0%, #1A1040 40%, #0B0E2D 100%)',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
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
            textAlign: 'center', color: 'rgba(232,201,106,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* â”€â”€â”€ Organic Circular Nodes Grid â”€â”€â”€ */}
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

      {/* Expanded Content Panel */}
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

      {/* Completion message */}
      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(232,201,106,0.08)', borderRadius: '16px',
              border: '1px solid rgba(232,201,106,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ† ¡Has explorado todos los secretos del Nilo de Nut!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Navegante Galáctico
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
