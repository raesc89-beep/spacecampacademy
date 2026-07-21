'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

// ─── SVG Decorative Elements ─────────────────────────────────────────────────
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

function DecoStoneCircle({ size = 80, color = '#D4A843', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 40 + 30 * Math.cos(rad);
        const y = 40 + 30 * Math.sin(rad);
        return <rect key={i} x={x-3} y={y-5} width="6" height="10" rx="1" fill={color} opacity="0.5" transform={`rotate(${angle}, ${x}, ${y})`} />;
      })}
      <circle cx="40" cy="40" r="4" fill={color} opacity="0.4" />
      <circle cx="36" cy="38" r="2" fill={color} opacity="0.3" />
      <circle cx="44" cy="42" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoSolstice({ size = 80, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.2, ...style }}>
      <circle cx="40" cy="40" r="12" fill={color} opacity="0.4" />
      <circle cx="40" cy="40" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 40 + 22 * Math.cos(rad);
        const y1 = 40 + 22 * Math.sin(rad);
        const x2 = 40 + 32 * Math.cos(rad);
        const y2 = 40 + 32 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? 2.5 : 1} strokeLinecap="round" opacity="0.5" />;
      })}
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

// Map node IDs to decorative SVGs for floating decorations
const DECO_MAP = {
  'observatorio': [DecoStoneCircle, DecoStarCluster, DecoPyramid],
  'sahara-verde': [DecoSerpent, DecoAnkh, DecoSolstice],
  'megalitos': [DecoStoneCircle, DecoPyramid, DecoStarCluster],
  'solsticio': [DecoSolstice, DecoStarCluster, DecoEye],
  'orion-map': [DecoStarCluster, DecoPyramid, DecoStoneCircle],
  'tribus': [DecoAnkh, DecoScarab, DecoSerpent],
  'stonehenge': [DecoStoneCircle, DecoSolstice, DecoPyramid],
  'legado-nilo': [DecoAnkh, DecoStarCluster, DecoScarab],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Malville, J.M. et al. (1998). Megaliths and Neolithic astronomy in southern Egypt, Nature, 392',
  'Wendorf, F. & Schild, R. (2001). Holocene Settlement of the Egyptian Sahara, Springer',
  'Brophy, T.G. (2002). The Origin Map, Writers Club Press',
  'Malville, J.M. (2015). Astronomy at Nabta Playa, Handbook of Archaeoastronomy',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'observatorio',
    title: 'El Primer Observatorio',
    color: '#D4A843',
    btnImage: '/assets/egypt/infographic_nabta/btn_observatorio.png',
    image: '/assets/egypt/infographic_nabta/hero_observatorio.png',
    content: [
      'Imagina que estás acampando en el desierto, sin teléfono, sin reloj, sin calendario... ¿Cómo sabrías en qué día del año estás? Hace más de 7,000 años, unas tribus muy ingeniosas resolvieron este problema de una manera brillante: construyeron un círculo de piedras gigantes que funcionaba como un reloj y calendario cósmico. Ese lugar se llama Nabta Playa, y está en el desierto del Sahara, en el sur de Egipto.',
      'El círculo de Nabta Playa es considerado el observatorio astronómico más antiguo de toda la Tierra, construido entre el 4800 y el 4000 a.C. Para que te hagas una idea: es aproximadamente 1,000 años más antiguo que Stonehenge en Inglaterra y 2,000 años más antiguo que las Pirámides de Guiza. ¡Estos constructores eran los primeros científicos del cielo!',
      'El "crómlech" (círculo de piedras) consta de 30 piedras dispuestas en círculo, con 6 piedras centrales más pequeñas colocadas en posiciones muy específicas. No están puestas al azar: cada piedra señala hacia una dirección astronómica importante, como la salida del Sol en el solsticio de verano o la posición de ciertas estrellas.',
      'Los arqueólogos Fred Wendorf y Romuald Schild descubrieron este sitio en los años 1990 durante expediciones financiadas por la National Geographic Society. Encontraron no solo el círculo de piedras, sino también cinco alineamientos megalíticos que se extienden desde un conjunto central, como rayos de una rueda gigante apuntando al cielo.',
      'Hoy, Nabta Playa se encuentra a unos 800 km al sur de El Cairo y 100 km al oeste de Abu Simbel, en coordenadas 22°32\' Norte, 30°42\' Este. Es uno de los lugares más remotos y áridos del planeta, pero su importancia científica es enorme: nos muestra que la astronomía nació mucho antes de lo que pensábamos.',
    ],
    fact: '¿Sabías que Nabta Playa es tan antiguo que cuando se construyó, el Sahara no era un desierto? Era una sabana verde con lagos, gacelas y jirafas. El observatorio fue construido junto a un lago que hoy es solo arena seca.',
  },
  {
    id: 'sahara-verde',
    title: 'El Sahara Verde',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_nabta/btn_sahara.png',
    image: '/assets/egypt/infographic_nabta/hero_sahara.png',
    content: [
      '¿Te imaginas el desierto del Sahara con ríos, lagos y bosques? Parece ciencia ficción, pero hace entre 11,000 y 5,000 años era exactamente así. Los científicos llaman a este periodo el "Sahara Verde" o "Periodo Húmedo Africano". La Tierra se inclinó ligeramente diferente hacia el Sol, y eso cambió los patrones de lluvia sobre todo el norte de África.',
      'En Nabta Playa, los arqueólogos encontraron huesos de peces de agua dulce, conchas de moluscos, y restos de plantas que solo crecen cerca del agua. Había una gran cuenca endorreica (un lago que no tiene salida al mar) donde las tribus se reunían durante la temporada de lluvias del monzón. Era como un oasis gigante en medio de lo que hoy es puro desierto.',
      'Las tribus que vivían aquí eran pastores seminómadas que criaban ganado vacuno. Seguían las lluvias estacionales: cuando llovía (verano), se reunían cerca del lago de Nabta Playa. Cuando llegaba la estación seca (invierno), se movían hacia el sur buscando pastos. Necesitaban saber exactamente cuándo iba a llover para sobrevivir, y por eso empezaron a estudiar las estrellas.',
      'El cambio climático que convirtió el Sahara en un desierto fue gradual. Entre el 5500 y el 3500 a.C., las lluvias fueron disminuyendo poco a poco. Las tribus se vieron obligadas a migrar hacia la única fuente de agua permanente de la región: el río Nilo. Esta migración es una de las teorías más aceptadas sobre el origen de la civilización egipcia.',
      'Los sedimentos del lago de Nabta Playa cuentan esta historia como capas de un pastel: las capas más profundas tienen arcilla húmeda y restos orgánicos (cuando había agua), y las capas superiores son arena seca (cuando el desierto tomó control). Es como leer un libro de historia escrito por la propia Tierra.',
    ],
    fact: 'El "Sahara Verde" fue tan húmedo que tenía ríos más grandes que el Mississippi. Los científicos han encontrado pinturas rupestres en el Sahara mostrando hipopótamos, cocodrilos y elefantes nadando. ¡Hoy esos mismos lugares tienen las temperaturas más altas del planeta!',
  },
  {
    id: 'megalitos',
    title: 'Las Piedras Gigantes',
    color: '#A0522D',
    btnImage: '/assets/egypt/infographic_nabta/btn_megalitos.png',
    image: '/assets/egypt/infographic_nabta/hero_megalitos.png',
    content: [
      'Las piedras de Nabta Playa no son piedras cualquiera: son megalitos, palabra que viene del griego "mega" (grande) y "lithos" (piedra). Algunas pesan varias toneladas y fueron traídas desde canteras a kilómetros de distancia. ¿Cómo las transportaron sin ruedas, sin animales de carga entrenados y sin herramientas de metal? ¡Solo con ingenio humano y trabajo en equipo!',
      'El círculo principal tiene un diámetro de aproximadamente 4 metros y está formado por 30 piedras relativamente pequeñas. Pero lo más interesante son las 6 piedras centrales: están colocadas en dos líneas de 3, y cada línea tiene una inclinación diferente. El astrofísico Thomas G. Brophy propuso que estas piedras representan estrellas específicas del cielo.',
      'Además del círculo, hay cinco alineamientos megalíticos que se extienden como los radios de una bicicleta desde un punto central. Cada alineamiento apunta hacia una dirección astronómicamente significativa. Es como si hubieran dibujado flechas gigantes en el suelo diciendo: "¡Mira hacia allá para ver algo importante en el cielo!"',
      'Algunos de los megalitos enterrados son verdaderamente impresionantes. Los arqueólogos encontraron piedras esculpidas de hasta 2.5 metros de alto enterradas bajo la superficie, con formas que parecen representar figuras o símbolos. Uno de los hallazgos más sorprendentes fue una roca esculpida que algunos investigadores interpretan como un intento temprano de escultura monumental egipcia.',
      'Las excavaciones también revelaron complejos subterráneos: cámaras de piedra con techos forrados de arcilla donde se realizaban ceremonias. En estas cámaras se encontraron esqueletos completos de ganado vacuno, cuidadosamente enterrados como ofrendas rituales. Cada piedra, cada alineamiento, cada cámara tenía un propósito preciso conectado con el cielo.',
    ],
    fact: 'Los constructores de Nabta Playa no tenían ninguna herramienta de metal. Todo lo hicieron con piedra contra piedra, cuerdas de fibra vegetal y palancas de madera. Mover una piedra de 2 toneladas requería al menos 20 personas tirando coordinadamente. ¡Era un proyecto comunitario de toda la tribu!',
  },
  {
    id: 'solsticio',
    title: 'El Reloj del Solsticio',
    color: '#FFB347',
    btnImage: '/assets/egypt/infographic_nabta/btn_solsticio.png',
    image: '/assets/egypt/infographic_nabta/hero_solsticio.png',
    content: [
      '¿Sabes qué es el solsticio de verano? Es el día más largo del año, cuando el Sol alcanza su punto más alto en el cielo. En el hemisferio norte ocurre alrededor del 21 de junio. Para las tribus de Nabta Playa, este día era crucial: marcaba el inicio de la temporada de lluvias del monzón africano, lo que significaba ¡agua, comida y vida!',
      'El círculo de piedras tiene cuatro pares de piedras a modo de "puertas" enfrentadas dos a dos. Una pareja está orientada perfectamente en dirección norte-sur (como una brújula). La segunda pareja apunta en dirección nordeste-suroeste, señalando exactamente el punto del horizonte donde sale el Sol durante el solsticio de verano.',
      'Imagina que estás parado en el centro del círculo hace 7,000 años. Miras a través de una de las "puertas" de piedra y ves el Sol saliendo exactamente entre las dos piedras. ¡Ese es el día del solsticio! Es como tener un calendario de piedra gigante: cuando el Sol se asoma por la puerta correcta, sabes que las lluvias llegarán pronto.',
      'Lo más asombroso es la precisión. Los científicos modernos han verificado con GPS y software astronómico que las alineaciones siguen siendo precisas después de 7,000 años. La inclinación del eje terrestre ha cambiado ligeramente desde entonces (un efecto llamado precesión), pero los constructores originales acertaron con una precisión de menos de 1 grado.',
      'Este "reloj de piedra" no solo marcaba el solsticio. Combinando las diferentes puertas y alineamientos, las tribus podían predecir las estaciones completas: cuándo sembrar, cuándo mover el ganado, cuándo preparar los campamentos de verano. Era una computadora astronómica hecha de roca, ¡miles de años antes de que existieran los números escritos!',
    ],
    fact: 'En Nabta Playa, el solsticio de verano era tan importante que lo celebraban con grandes festines. Los arqueólogos encontraron miles de huesos de animales concentrados en capas que corresponden a las temporadas de lluvia: evidencia de banquetes comunitarios que duraban días.',
  },
  {
    id: 'orion-map',
    title: 'El Mapa de Orión',
    color: '#7EC8E3',
    btnImage: '/assets/egypt/infographic_nabta/btn_orion.png',
    image: '/assets/egypt/infographic_nabta/hero_orion.png',
    content: [
      '¿Conoces el cinturón de Orión? Son tres estrellas brillantes en línea recta (Alnitak, Alnilam y Mintaka) que puedes ver fácilmente en el cielo nocturno de invierno. Son tan reconocibles que casi todas las civilizaciones antiguas las identificaron. ¡Y las tribus de Nabta Playa las mapearon en piedra hace 7,000 años!',
      'El astrofísico Thomas G. Brophy, en su libro "The Origin Map" (2002), propuso algo fascinante: las 6 piedras centrales del círculo representan estrellas de la constelación de Orión. Tres piedras corresponden al cinturón de Orión, y las otras tres al "hombro" de Orión (las estrellas Betelgeuse, Bellatrix y la estrella principal). Las piedras con mayor inclinación representan estrellas más lejanas.',
      'Si Brophy tiene razón, Nabta Playa no era solo un calendario solar, sino también un mapa estelar tridimensional. Los constructores no solo señalaron dónde están las estrellas en el cielo (posición angular), sino que también codificaron su distancia relativa usando la inclinación de las piedras. ¡Eso sería extraordinariamente avanzado para su época!',
      'Esta teoría es debatida entre los científicos. Algunos arqueólogos como Mark Lehner reconocen la importancia del sitio pero son cautelosos sobre interpretaciones demasiado ambiciosas. Lo que sí es indiscutible es que los alineamientos megalíticos apuntan hacia estrellas importantes del cielo antiguo, incluyendo las del cinturón de Orión y Sirio, la estrella más brillante del cielo nocturno.',
      'La conexión Orión-Egipto es profundísima. Los antiguos egipcios llamaban al cinturón de Orión "Sah" y lo asociaban con Osiris, el dios del inframundo. Si Nabta Playa ya mapeaba a Orión miles de años antes de los faraones, significaría que la obsesión egipcia con esta constelación tiene raíces mucho más antiguas de lo que imaginamos.',
    ],
    fact: 'Las tres estrellas del cinturón de Orión están a distancias muy diferentes de nosotros: Alnitak está a 1,200 años luz, Alnilam a 2,000 años luz, y Mintaka a 1,200 años luz. Parecen estar juntas, pero en realidad están separadas por cientos de años luz. ¡La luz que ves hoy de Alnilam salió de esa estrella cuando los romanos aún no existían!',
  },
  {
    id: 'tribus',
    title: 'Los Primeros Científicos',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_nabta/btn_tribus.png',
    image: '/assets/egypt/infographic_nabta/hero_tribus.png',
    content: [
      'Las tribus que construyeron Nabta Playa no tenían escritura, ni metal, ni ruedas. Pero tenían algo más poderoso: curiosidad y capacidad de observación. Durante generaciones, padres e hijos se sentaron bajo el cielo estrellado y fueron aprendiendo los patrones: qué estrellas aparecían en qué época, cuándo salía el Sol en cada punto del horizonte.',
      'Eran pastores seminómadas que criaban ganado vacuno, cabras y ovejas. Su vida dependía de encontrar agua y pastizales, y el cielo era su guía. Desarrollaron un conocimiento astronómico práctico: no era filosofía abstracta, era supervivencia pura. Si no podías predecir las lluvias, tu ganado moría de sed y tu familia pasaba hambre.',
      'Los enterramientos de ganado en cámaras de piedra revelan algo fascinante: estas tribus tenían una religión organizada centrada en el cielo y los animales. Los profesores Wendorf y Schild sugieren que el culto al ganado vacuno de Nabta Playa es un ancestro directo del culto a Hathor, la diosa vaca del Antiguo Egipto. El cielo y los animales eran sagrados.',
      'La organización social necesaria para construir Nabta Playa era impresionante. Mover megalitos de toneladas requiere planificación, liderazgo, y cooperación entre cientos de personas. Estas tribus no eran "primitivas": tenían jerarquías sociales, ceremonias complejas y un sistema de conocimiento astronómico que se transmitía de generación en generación.',
      'Piensa en esto: sin papel, sin computadoras, sin escuelas... todo el conocimiento astronómico se guardaba en la memoria humana y se transmitía oralmente. Los ancianos eran las "bibliotecas vivientes" de la tribu. Cuando un anciano moría, era como perder un disco duro lleno de datos. Por eso construyeron las piedras: para que el conocimiento sobreviviera a las personas.',
    ],
    fact: 'Los huesos encontrados en Nabta Playa revelan que estas tribus eran sorprendentemente saludables. Medían en promedio 1.75 metros (altos para su época), tenían huesos fuertes y dientes sanos. Su dieta de leche, carne, pescado del lago y plantas silvestres era más nutritiva que la de muchos agricultores posteriores.',
  },
  {
    id: 'stonehenge',
    title: 'Más Antiguo que Stonehenge',
    color: '#9E9E9E',
    btnImage: '/assets/egypt/infographic_nabta/btn_stonehenge.png',
    image: '/assets/egypt/infographic_nabta/hero_stonehenge.png',
    content: [
      'Cuando alguien dice "antiguo observatorio de piedra", la mayoría piensa en Stonehenge, en Inglaterra. Pero Nabta Playa se construyó entre el 4800 y el 4000 a.C., mientras que Stonehenge se empezó alrededor del 3000 a.C. ¡Nabta Playa es entre 1,000 y 2,000 años más antiguo! Cuando los británicos empezaron a poner la primera piedra de Stonehenge, Nabta Playa ya llevaba milenios funcionando.',
      'Las diferencias no son solo de edad. Stonehenge pesa unas 4,000 toneladas y sus piedras más grandes pesan 25 toneladas cada una. Nabta Playa es mucho más modesto en tamaño, pero su propósito astronómico es igual de sofisticado. Es como comparar un reloj de pulsera con un reloj de pared: ambos dan la hora, pero uno es más portátil.',
      'Hay otros observatorios antiguos en el mundo: Göbekli Tepe en Turquía (9500 a.C.) es más antiguo, pero su función astronómica es debatida. Los templos de Malta (3600 a.C.) tienen alineaciones solares. Carnac en Francia (4500 a.C.) tiene miles de menhires. Nabta Playa destaca porque combina calendario solar + mapa estelar + rituales en un solo complejo.',
      'La gran pregunta es: ¿las ideas viajaron de un lugar a otro, o diferentes pueblos inventaron la astronomía de manera independiente? La mayoría de los científicos cree que la astronomía megalítica se inventó múltiples veces en diferentes lugares. Cuando miras el cielo todas las noches durante generaciones, eventualmente descubres sus patrones. Es como si las estrellas enseñaran astronomía a cualquiera que tuviera paciencia para escuchar.',
      'Lo que hace único a Nabta Playa es su ubicación en África. Durante mucho tiempo, los europeos creyeron que la astronomía antigua era "su" invento (Stonehenge, los griegos). Nabta Playa demuestra que África tuvo los primeros astrónomos del mundo, mil años antes que Europa. La ciencia no tiene nacionalidad: pertenece a toda la humanidad.',
    ],
    fact: 'Stonehenge tardó 1,500 años en completarse (del 3000 al 1500 a.C.). En cambio, Nabta Playa fue construido y modificado durante más de 2,000 años. Si contamos toda la actividad humana en el sitio, Nabta Playa estuvo en uso durante más de 5,000 años: más tiempo del que ha existido la escritura.',
  },
  {
    id: 'legado-nilo',
    title: 'El Camino al Nilo',
    color: '#1ABC9C',
    btnImage: '/assets/egypt/infographic_nabta/btn_legado.png',
    image: '/assets/egypt/infographic_nabta/hero_legado.png',
    content: [
      'Cuando el Sahara se secó, las tribus de Nabta Playa no desaparecieron: migraron hacia el este, hacia la única fuente de agua que nunca se secaba: el río Nilo. Se llevaron con ellas algo más valioso que cualquier tesoro material: miles de años de conocimiento astronómico guardado en sus mentes y en sus tradiciones orales.',
      'Esta migración, que ocurrió entre el 3500 y el 3000 a.C., coincide exactamente con el periodo en que la civilización egipcia empezó a formarse a orillas del Nilo. Los primeros asentamientos predinásticos del Valle del Nilo muestran prácticas culturales sorprendentemente similares a las de Nabta Playa: culto al ganado, enterramientos rituales y orientación astronómica de estructuras.',
      'El egiptólogo Mark Lehner, aunque cauteloso, admite: "Tiene sentido, pero no de un modo directo. No se puede ir directamente de estos megalitos a la pirámide de Dyeser." Es decir, Nabta Playa no inventó las pirámides, pero plantó las semillas del conocimiento que eventualmente floreció en la gran civilización egipcia.',
      'Las conexiones son fascinantes: el culto al ganado de Nabta Playa se transformó en el culto a Hathor (la diosa vaca). La obsesión con Orión se convirtió en el culto a Osiris-Sah. La orientación astronómica de las piedras se refinó hasta crear las pirámides alineadas con las estrellas. Es como una semilla que crece hasta convertirse en un árbol gigante.',
      'Hoy, la NASA y agencias espaciales de todo el mundo estudian Nabta Playa como ejemplo de cómo los humanos pueden usar la astronomía con tecnología mínima. Si algún día colonizamos Marte y perdemos la tecnología, necesitaremos saber hacer lo que hicieron las tribus de Nabta Playa: mirar el cielo con ojos inteligentes y construir herramientas con las piedras del suelo.',
    ],
    fact: 'La distancia de Nabta Playa al Nilo es de unos 400 km caminando. Con ganado y niños, el viaje habría tomado entre 2 y 4 semanas. Los arqueólogos han encontrado "estaciones de camino" (sitios con restos de campamentos temporales) que marcan la ruta de migración. ¡Era como una autopista neolítica a través del desierto!',
  },
];

// ─── Star Field Background ──────────────────────────────────────────────────
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
        ctx.fillStyle = `rgba(212, 168, 67, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Nabta Playa Header SVG ─────────────────────────────────────────────────
function NabtaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.3))' }}>
        {/* Stone circle arch */}
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#nabtaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Megalith stones along the arch */}
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.15 + 15;
          return (
            <g key={i}>
              <rect x={cx-5} y={cy-8} width="10" height="16" rx="2" fill="rgba(212,168,67,0.4)" stroke="rgba(212,168,67,0.6)" strokeWidth="1" />
              <motion.circle cx={cx} cy={cy-12} r="2.5" fill="#D4A843"
                animate={{ opacity: [0.3, 1, 0.3], r: [1.5, 3, 1.5] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                style={{ filter: 'drop-shadow(0 0 4px #D4A843)' }}
              />
            </g>
          );
        })}
        {/* Center sun disk */}
        <circle cx="300" cy="8" r="8" fill="rgba(212,168,67,0.6)" style={{ filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.5))' }} />
        <circle cx="300" cy="8" r="12" fill="none" stroke="rgba(212,168,67,0.3)" strokeWidth="1" />
        <circle cx="30" cy="110" r="5" fill="rgba(212,168,67,0.5)" />
        <circle cx="570" cy="110" r="5" fill="rgba(212,168,67,0.5)" />
        <defs>
          <linearGradient id="nabtaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.3)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="78" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">NABTA PLAYA</text>
        <text x="300" y="98" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER OBSERVATORIO DE LA HUMANIDAD</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (circular image-based) ─────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,168,67,0.2)'}`,
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
        />
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
          layoutId="activeDotM1"
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
function ContentPanel({ node, onClose }) {
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

      {/* ─── Two-Column Hero Section ─── */}
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
          <img src={node.image} alt={node.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9,
            minHeight: '280px',
          }} />
          {/* Bottom gradient */}
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* ─── Magazine Body: Alternating text + decorations ─── */}
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
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '◆' : i === 1 ? '◇' : '★'}
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

        {/* ─── Fact Box ─── */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A843', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #A0865A, #D4A843)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A843', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_EgyptM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,26,0.82) 0%, rgba(30,22,12,0.78) 40%, rgba(18,14,26,0.85) 100%), url(/assets/egypt/infographic_nabta/bg_nabta.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,168,67,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />

      {/* Nabta header */}
      <NabtaHeader />

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
            textAlign: 'center', color: 'rgba(212,168,67,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* ─── Organic Circular Nodes Grid ─── */}
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
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🪨 ¡Has explorado todos los secretos de Nabta Playa!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrónomo Ancestral
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ─── Bibliografía ─── */}
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
    </div>
  );
}