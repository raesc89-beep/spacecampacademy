'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  'observatorio': [DecoStoneCircle, DecoStarCluster, DecoPyramid],'sahara-verde': [DecoSerpent, DecoAnkh, DecoSolstice],
  'megalitos': [DecoStoneCircle, DecoPyramid, DecoStarCluster],'solsticio': [DecoSolstice, DecoStarCluster, DecoEye],
  'orion-map': [DecoStarCluster, DecoPyramid, DecoStoneCircle],'tribus': [DecoAnkh, DecoScarab, DecoSerpent],
  'stonehenge': [DecoStoneCircle, DecoSolstice, DecoPyramid],'legado-nilo': [DecoAnkh, DecoStarCluster, DecoScarab],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      'Imagina vivir en el desierto hace 7,000 años, sin reloj, sin calendario y sin escritura. ¿Cómo sabrías cuándo van a llegar las lluvias? ¿Cuándo mover el ganado? Las tribus que habitaron Nabta Playa, en el sur de Egipto, resolvieron este problema de una manera extraordinaria: construyeron un círculo de piedras que funciona como reloj solar y calendario estelar permanente.',
      'El círculo de Nabta Playa es considerado el observatorio astronómico más antiguo conocido de la Tierra. Fue construido entre el 4800 y el 4000 a.C., lo que lo hace aproximadamente 1,000 años más antiguo que Stonehenge (que data de ~3000 a.C.) y unos 2,000 años más antiguo que las Pirámides de Guiza (~2500 a.C.). Esta fecha lo coloca en el Período Neolítico, cuando los humanos apenas comenzaban a desarrollar la agricultura.',
      'La estructura principal, conocida como un crómlech, consta de 30 piedras dispuestas en círculo. Las 6 piedras centrales están colocadas en posiciones muy específicas: forman dos líneas de tres piedras cada una, con ángulos distintos que apuntan a puntos específicos del horizonte. El astrofísico Thomas G. Brophy propuso en 2002 que estas 6 piedras representan estrellas de la constelación de Orión. Además del círculo, existen cinco alineamientos megalíticos que se extienden desde el centro del sitio.',
      'Los arqueólogos Fred Wendorf y Romuald Schild descubrieron y excavaron este sitio a partir de los años 1970 y publicaron sus hallazgos extensamente en la década de 1990. Sus excavaciones revelaron no solo el círculo de piedras, sino también cámaras subterráneas y estructuras de piedra enterradas que sugieren un uso ritual prolongado del sitio durante milenios.',
      'Hoy, Nabta Playa se encuentra a unos 800 km al sur de El Cairo y es uno de los sitios arqueológicos más remotos de África. La importancia científica de este lugar desafía la visión tradicional de que la astronomía organizada comenzó en Mesopotamia o Grecia. Demuestra que el conocimiento del cielo, aplicado a necesidades prácticas de supervivencia, tiene raíces mucho más profundas en África.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'El sitio de Nabta Playa fue identificado por primera vez en 1974 durante una expedición arqueológica liderada por Fred Wendorf de la Universidad Metodista del Sur de Texas. Sin embargo, durante los primeros años fue subestimado. Fue solo en la década de 1990, tras excavaciones más profundas, que los investigadores comprendieron la escala completa del complejo: no solo el círculo de piedras, sino también alineamientos megalíticos, estructuras enterradas y evidencia de un uso ceremonial que se extendía por miles de años.' },
      { label: 'Dato Científico', icon: 'atom',
        text: 'Para verificar que las alineaciones de Nabta Playa son astronómicamente precisas, los investigadores usaron software de simulación que reconstruye el cielo tal como se veía hace 7,000 años. Esto es necesario porque la Tierra tiene un movimiento de precesión: su eje gira lentamente como un trompo con un período de aproximadamente 26,000 años. Al aplicar la corrección de precesión, las alineaciones del círculo coinciden con puntos astronómicos clave, incluyendo la salida del Sol en el solsticio de verano y posiciones de estrellas brillantes visibles en esa época.' },
    ],
    fact: 'Nabta Playa es tan antiguo que cuando se construyó, el Sahara era una sabana verde con lagos, ríos y fauna diversa: gacelas, jirafas, hipopótamos e incluso cocodrilos. Los arqueólogos han encontrado pinturas rupestres en las rocas del Sahara que muestran estos animales. El observatorio de piedra se construyó junto a una cuenca lacustre que hoy es completamente arena seca, transformada por el mismo cambio climático que empujó a sus constructores a migrar hacia el Nilo.',
  },
  {
    id: 'sahara-verde',
    title: 'El Sahara Verde',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_nabta/btn_sahara.png',
    image: '/assets/egypt/infographic_nabta/hero_sahara.png',
    content: [
      'Hace entre 11,000 y 5,000 años, el desierto del Sahara no era un desierto en absoluto. Los científicos llaman a este período el "Período Húmedo Africano" o popularmente el "Sahara Verde". La causa principal fue un cambio en la órbita de la Tierra: el planeta se inclinó ligeramente más hacia el Sol durante el verano del hemisferio norte, lo que intensificó el monzón africano y trajo lluvias regulares al norte de África durante miles de años.',
      'En Nabta Playa, los arqueólogos encontraron evidencia directa de este paisaje radicalmente diferente: huesos de peces del Nilo, conchas de moluscos de agua dulce, restos de plantas acuáticas y semillas de cereales silvestres. Existía una gran cuenca endorreica — un lago sin salida al mar — donde el agua de lluvia se acumulaba. Las tribus se reunían aquí durante la temporada de monzones, convirtiéndolo en un punto de encuentro social y ceremonial.',
      'Las tribus que habitaron Nabta Playa eran pastores seminómadas que criaban ganado vacuno. Su forma de vida los obligaba a seguir los patrones de lluvia estacionales. Durante las lluvias, el lago se llenaba y la sabana producía pasto abundante para el ganado. En la estación seca, las tribus se dispersaban hacia zonas con pozos permanentes. Necesitar predecir con precisión el inicio del monzón fue probablemente la motivación práctica detrás de sus observaciones astronómicas.',
      'El cambio climático que convirtió el Sahara en desierto fue gradual, no repentino. Entre el 5500 y el 3500 a.C., las lluvias disminuyeron progresivamente a medida que la órbita terrestre volvía a su posición anterior. Los sedimentos del lago de Nabta Playa registran este proceso: las capas más profundas contienen arcilla húmeda y materia orgánica abundante, mientras que las capas superiores son progresivamente más áridas, hasta llegar a la arena seca actual.',
      'A medida que el Sahara se secó, las tribus migraron hacia el este, hacia el río Nilo. Este movimiento masivo de población, que ocurrió entre el 3500 y el 3000 a.C., es una teoría respaldada por evidencia arqueológica: los asentamientos predinásticos del Alto Egipto muestran una repentina explosión demográfica exactamente cuando Nabta Playa fue abandonada. Muchos investigadores creen que estas migraciones aportaron el capital humano, las tradiciones y el conocimiento que permitió el nacimiento de la civilización egipcia.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom',
        text: 'El "Período Húmedo Africano" que creó el Sahara Verde fue causado por variaciones en los parámetros orbitales de la Tierra, descritas por la Teoría de Milankovitch. Específicamente, la precesión del eje terrestre modificó la cantidad de radiación solar que llegaba al hemisferio norte durante el verano, amplificando el ciclo monzónico. Los modelos climáticos muestran que en ese período, el norte de África recibía entre 2 y 4 veces más precipitaciones que hoy. Los sedimentos marinos del Atlántico preservan granos de polen y esporas de plantas que confirman la presencia de vegetación densa hasta latitudes hoy completamente desérticas.' },
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'Las pinturas rupestres del Tassili n\'Ajjer, en Argelia, documentan visualmente el Sahara Verde con una precisión excepcional. Estas pinturas, que datan de entre el 10,000 y el 4,000 a.C., muestran escenas de pastoreo de ganado, caza de hipopótamos en ríos, y personas nadando. En los mismos lugares donde hoy la temperatura supera los 50°C y no hay agua a la vista, los artistas del Neolítico pintaron escenas de agua y vida. El Tassili n\'Ajjer es Patrimonio de la Humanidad de la UNESCO precisamente por esta documentación única del cambio climático prehistórico.' },
    ],
    fact: 'El Sahara Verde tenía sistemas fluviales tan grandes como el actual río Congo. En imágenes de radar de satélite, los científicos han descubierto "ríos fantasma" bajo la arena: antiguos cauces de ríos secos que corrieron durante el Período Húmedo Africano. Uno de estos sistemas, el río Ahnet-Mouydir, fluía hacia el norte de Mali y conectaba múltiples cuencas lacustres. Las pinturas rupestres del Sahara muestran animales que hoy solo viven en África subsahariana: hipopótamos, cocodrilos, jirafas y elefantes, en lugares donde hoy hay solo arena y roca árida.',
  },
  {
    id: 'megalitos',
    title: 'Las Piedras Gigantes',
    color: '#A0522D',
    btnImage: '/assets/egypt/infographic_nabta/btn_megalitos.png',
    image: '/assets/egypt/infographic_nabta/hero_megalitos.png',
    content: [
      'Las piedras de Nabta Playa son megalitos, del griego "mega" (grande) y "lithos" (piedra). Algunas de estas rocas pesan varias toneladas y fueron extraídas de canteras ubicadas a kilómetros del sitio. Las transportaron sin ruedas, sin animales de carga pesada y sin herramientas de metal — solo con cuerdas de fibra vegetal, palancas de madera, rodillos de troncos y la coordinación de decenas de personas trabajando juntas durante días o semanas.',
      'El círculo principal tiene un diámetro de aproximadamente 4 metros y está formado por 30 piedras. Las 6 piedras centrales son particularmente importantes: están colocadas en dos grupos de 3 piedras cada uno, con orientaciones que difieren entre sí. El astrofísico Thomas G. Brophy, del Instituto de Ciencias de la Mente de Arizona, publicó en 2002 una hipótesis detallada según la cual estas 6 piedras representan estrellas específicas de la constelación de Orión, con la inclinación de cada piedra codificando la distancia de la estrella correspondiente.',
      'Además del círculo central, el sitio incluye cinco grandes alineamientos megalíticos que se extienden desde un punto central hacia diferentes direcciones del horizonte. Estos alineamientos están formados por rocas de gran tamaño colocadas en líneas rectas de decenas de metros de longitud. Cada alineamiento apunta hacia un punto astronómicamente significativo, incluyendo la salida del Sol en el solsticio de verano y las posiciones de estrellas brillantes como Sirio, Alfa Centauri y las estrellas del cinturón de Orión.',
      'Las excavaciones realizadas por Wendorf y Schild revelaron también estructuras enterradas: algunas piedras de hasta 2.5 metros de alto que fueron deliberadamente hundidas en el suelo, dejando solo su parte superior visible. Una de estas piedras tiene una forma esculpida que algunos investigadores interpretan como una representación animal, lo que la convertiría en uno de los primeros intentos de escultura monumental en África. La función de estas estructuras enterradas no se comprende completamente aún.',
      'Las excavaciones más profundas del sitio revelaron cámaras subterráneas construidas con lajas de piedra, donde se encontraron restos de rituales. En estas cámaras y en el entorno del círculo se hallaron esqueletos de ganado vacuno enterrados de forma deliberada, con las patas dobladas en posición de reposo, similares a enterramientos rituales de ganado encontrados en sitios predinásticos del Alto Egipto. Este hallazgo sugiere que el culto al ganado, tan importante en la religión egipcia posterior, tuvo sus raíces en estas tradiciones pastorales del Sahara.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom',
        text: 'La arqueología experimental ha intentado replicar el transporte de megalitos usando solo herramientas disponibles en el Neolítico. Los experimentos han demostrado que un grupo de 20-40 personas puede mover una piedra de 2 toneladas sobre rollos de madera a una velocidad de entre 1 y 3 kilómetros por día en terreno plano. Para las piedras más grandes de Nabta Playa, los investigadores estiman que el transporte desde las canteras más cercanas, ubicadas a unos 2-3 km, habría requerido varios días de trabajo coordinado. Esto implica una organización social avanzada: liderazgo, planificación y cooperación voluntaria o dirigida.' },
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'La hipótesis del astrofísico Thomas G. Brophy sobre las piedras centrales de Nabta Playa como mapa de Orión ha generado debate académico. Brophy calculó que las inclinaciones específicas de las seis piedras centrales podrían representar las distancias reales de las estrellas de Orión, codificadas en la proporción de la inclinación. Si esto es correcto, significaría que los constructores de Nabta Playa tenían un conocimiento de las distancias estelares sin telescopios — algo que muchos arqueólogos consideran improbable. La hipótesis, publicada en su libro "The Origin Map" (2002), sigue sin consenso científico definitivo pero es consistentemente citada en debates sobre arqueoastronomía africana.' },
    ],
    fact: 'Los constructores de Nabta Playa no tenían herramientas de metal — el Egipto de la Edad del Bronce no existiría por otros 3,000 años. Trabajaron con herramientas de piedra, cuerdas trenzadas de fibra vegetal y palancas de madera. Los investigadores calculan que mover una de las piedras más grandes del sitio, de aproximadamente 2 toneladas, requería el esfuerzo coordinado de al menos 20 personas durante varios días. La logística de esta tarea — conseguir suficientes personas, alimentarlas, coordinar su trabajo — requería una estructura social compleja que no asociamos normalmente con grupos seminómadas del Neolítico.',
  },
  {
    id: 'solsticio',
    title: 'El Reloj del Solsticio',
    color: '#FFB347',
    btnImage: '/assets/egypt/infographic_nabta/btn_solsticio.png',
    image: '/assets/egypt/infographic_nabta/hero_solsticio.png',
    content: [
      'El solsticio de verano es el día del año en que el Sol alcanza su punto más alto en el cielo y el período de luz diurna es máximo. Para las tribus de Nabta Playa, que vivían en el borde del desierto africano, este día tenía una importancia práctica crucial: marcaba aproximadamente el inicio de las lluvias del monzón africano, el evento más importante de su año porque determinaba si habría agua para el ganado y los humanos durante los meses siguientes.',
      'El círculo de piedras de Nabta Playa tiene cuatro pares de "puertas" — aperturas entre las piedras del borde del círculo que permiten ver a través de ellas hacia el horizonte. Un par de puertas está orientado en dirección norte-sur. El par más importante está orientado en dirección nordeste-suroeste, señalando con precisión el punto del horizonte donde sale el Sol exactamente en el solsticio de verano. Esta orientación no es accidental: requirió años de observación sistemática del movimiento solar a lo largo del horizonte.',
      'El principio es simple pero ingenioso: al pararse en el centro del círculo y mirar a través del par de puertas orientado al nordeste, un observador puede ver el Sol salir entre las rocas en el amanecer del solsticio de verano. Este evento visual, que solo ocurre una vez al año, era la señal inequívoca de que las lluvias del monzón llegarían pronto. No era solo un evento astronómico — era el evento más importante del calendario práctico de supervivencia de las tribus.',
      'Los investigadores han verificado las alineaciones de Nabta Playa usando software de planetarium que simula el cielo tal como se veía hace 6,000-7,000 años, aplicando la corrección necesaria por la precesión terrestre. Los resultados muestran que las alineaciones principales son astronómicamente precisas con un margen de error menor a 1 grado angular. Esta precisión es notable dado que fue lograda sin instrumentos de medición tecnológicos, solo mediante la observación sistemática del cielo a lo largo de múltiples generaciones.',
      'La combinación de las puertas y los cinco alineamientos megalíticos del sitio creaba un sistema completo de predicción estacional. Las diferentes orientaciones permitían a los observadores rastrear no solo el solsticio de verano, sino también el movimiento de estrellas clave durante el año. Era un reloj astronómico de piedra, construido para durar milenios, creado aproximadamente 3,000 años antes de que los egipcios inventaran su primer sistema de escritura y más de 5,000 años antes de la primera brújula magnética china.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom',
        text: 'La precesión axial de la Tierra completa un ciclo cada aproximadamente 25,772 años. Esto significa que el punto del horizonte donde sale el Sol en el solsticio de verano se desplaza lentamente a lo largo de los milenios. Los constructores de Nabta Playa alinearon su círculo con el solsticio de verano tal como ocurría hace 6,000-7,000 años. Hoy, ese punto ha cambiado ligeramente. Para verificar que la alineación original fue intencional y precisa, los investigadores usan programas como Stellarium o CAPA (Computer Aided Paleoastronomy) para retroceder el cielo simulado hasta la época de construcción y confirmar que las orientaciones coinciden.' },
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'El monzón africano que las tribus de Nabta Playa observaban para predecir es el mismo sistema meteorológico que hoy provee la mayor parte del agua dulce a países como Etiopía, Sudán, Chad y Nigeria. En la época del Sahara Verde, este monzón era significativamente más intenso y penetraba mucho más hacia el norte de lo que lo hace hoy, alcanzando latitudes que ahora son completamente desérticas. El colapso de este monzón intensificado, causado por cambios orbitales graduales, fue lo que terminó con el Sahara Verde y obligó a las poblaciones a migrar hacia el Nilo.' },
    ],
    fact: 'Los arqueólogos hallaron en Nabta Playa huesos de animales silvestres y domésticos concentrados en capas que corresponden exactamente a las temporadas de lluvia del monzón, evidenciando banquetes comunitarios que coincidían con el solsticio de verano. Esta evidencia de festividades colectivas — probablemente el equivalente prehistórico de una gran reunión social o ritual — sugiere que Nabta Playa era un punto de encuentro regional: diferentes grupos tribales nómadas convergían aquí para celebrar el solsticio, compartir recursos, intercambiar información y posiblemente establecer alianzas sociales. El sitio era simultáneamente observatorio, calendario y centro social.',
  },
  {
    id: 'orion-map',
    title: 'El Mapa de Orión',
    color: '#7EC8E3',
    btnImage: '/assets/egypt/infographic_nabta/btn_orion.png',
    image: '/assets/egypt/infographic_nabta/hero_orion.png',
    content: [
      'El cinturón de Orión es una de las formaciones estelares más fácilmente reconocibles en el cielo nocturno: tres estrellas brillantes — Alnitak, Alnilam y Mintaka — alineadas casi perfectamente en una línea recta. Esta constelación fue importante para múltiples culturas antiguas en todo el mundo, y las tribus de Nabta Playa la conocían y probablemente la veneraban hace más de 7,000 años. La hipótesis de Thomas G. Brophy propone que mapearon estas estrellas literalmente en piedra, a escala, en el círculo central del sitio.',
      'Thomas G. Brophy, astrofísico especializado en astrofísica de plasmas, publicó en 2002 su análisis detallado de las 6 piedras centrales de Nabta Playa. Su hipótesis establece que tres de esas piedras representan el cinturón de Orión, y las otras tres representan la cabeza de la constelación, específicamente las estrellas Betelgeuse, Bellatrix y Meissa. Más audazmente, propone que la inclinación específica de cada piedra del suelo codifica la distancia real de la estrella correspondiente, utilizando una escala proporcional.',
      'Si la hipótesis de Brophy es correcta, Nabta Playa sería no solo un mapa bidimensional del cielo, sino un mapa tridimensional del espacio: las posiciones horizontales de las piedras indicarían dónde están las estrellas en el cielo, y las inclinaciones codificarían a qué distancia están en el espacio real. Esto implicaría un conocimiento de las distancias estelares que, según la ciencia convencional, no fue posible medir hasta el siglo XIX con la invención de la paralaje estelar.',
      'La hipótesis es debatida, pero los alineamientos megalíticos más grandes del sitio sí apuntan hacia estrellas significativas con una precisión verificable. Investigadores independientes han confirmado que varios de los alineamientos apuntan hacia las estrellas del cinturón de Orión, hacia Sirio (la estrella más brillante del cielo nocturno) y hacia otras estrellas que habrían sido visibles en esa latitud hace 6,000-7,000 años, corregidas por la precesión axial.',
      'La conexión entre Nabta Playa y el Egipto faraónico es sugerente. En la religión egipcia, el cinturón de Orión era conocido como "Sah" y estaba asociado directamente con Osiris, dios de la muerte y la resurrección. El astrónomo Robert Bauval propuso que las tres Pirámides de Guiza fueron diseñadas para replicar el patrón del cinturón de Orión en tierra — hipótesis conocida como la Teoría de la Correlación de Orión. Si los constructores de Nabta Playa ya habían establecido una conexión cultural profunda con Orión milenios antes, esta podría ser una tradición astronómica y religiosa que sobrevivió la migración al Nilo.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom',
        text: 'Las tres estrellas del cinturón de Orión están a distancias significativamente diferentes de la Tierra, aunque visualmente parecen estar juntas. Mintaka (Delta Orionis) está a unos 900 años luz. Alnilam (Épsilon Orionis) está a aproximadamente 2,000 años luz. Alnitak (Zeta Orionis) está a unos 1,200 años luz. Si la hipótesis de Brophy sobre el mapa de distancias de Nabta Playa fuera correcta, implicaría que sus constructores de alguna manera conocían estas diferencias de distancia — algo que la ciencia convencional considera imposible sin telescopios modernos. La comunidad científica mayoritariamente considera la hipótesis especulativa, aunque reconoce que las alineaciones astronómicas básicas del sitio son reales.' },
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'La Teoría de la Correlación de Orión, propuesta por Robert Bauval en su libro "El Misterio de Orión" (1994), sostiene que las tres Grandes Pirámides de Guiza están dispuestas en tierra de forma que replican exactamente el patrón del cinturón de Orión en el cielo. La pirámide de Keops corresponde a Alnitak, la de Kefrén a Alnilam, y la de Micerinos a Mintaka. Bauval calculó que esta correspondencia era más perfecta alrededor del 10,500 a.C., lo que generó especulaciones sobre el origen del diseño. La teoría ha sido criticada por muchos arqueólogos, pero destaca la importancia cultural de Orión en la cosmología egipcia.' },
    ],
    fact: 'Las tres estrellas del cinturón de Orión están a distancias muy diferentes: Mintaka a ~900 años luz, Alnitak a ~1,200 años luz y Alnilam a ~2,000 años luz. Aunque visualmente parecen tres puntos casi idénticos en una línea, en realidad si pudieras moverte en el espacio entre ellas, verías que están separadas por distancias enormes. Alnitak, la más lejana, emite tanta luz que si estuviera en el lugar del Sol, sería tan brillante que haría imposible observar las estrellas durante el día.',
  },
  {
    id: 'tribus',
    title: 'Los Primeros Científicos',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_nabta/btn_tribus.png',
    image: '/assets/egypt/infographic_nabta/hero_tribus.png',
    content: [
      'Las tribus de Nabta Playa carecían de escritura, herramientas de metal y ruedas, pero tenían algo igualmente poderoso: la capacidad de observación sistemática y la tradición oral para transmitir ese conocimiento. Durante generaciones que abarcaron siglos y milenios, observaron el cielo cada noche, aprendiendo los patrones del Sol, la Luna y las estrellas. Esta ciencia sin laboratorios produjo un observatorio que sigue siendo astronómicamente válido después de 7,000 años.',
      'Eran pastores seminómadas que criaban ganado vacuno, una actividad que requería un conocimiento preciso de las estaciones. Su supervivencia dependía directamente de su capacidad para encontrar agua y pasto en el momento correcto. Predecir el inicio de las lluvias del monzón con semanas de anticipación era la diferencia entre sobrevivir y perder el ganado por deshidratación. Esta necesidad práctica fue probablemente el motor que impulsó el desarrollo de su sofisticado conocimiento astronómico.',
      'Los enterramientos rituales de ganado encontrados en Nabta Playa revelan una dimensión religiosa profunda: el ganado no era solo alimento, era sagrado. Los arqueólogos Fred Wendorf y Romuald Schild sugieren que este culto al ganado en Nabta Playa es el precursor directo del culto a Hathor en el Egipto faraónico — la diosa con cabeza de vaca o con cuernos de vaca que representaba la fertilidad, el cielo y la maternidad. Si esta conexión es correcta, algunas de las tradiciones religiosas más antiguas del Antiguo Egipto habrían nacido en el Sahara miles de años antes de las pirámides.',
      'La construcción del complejo de Nabta Playa requirió un nivel de planificación y cooperación social que sorprende para grupos que imaginamos primitivos. Mover megalitos de varias toneladas, mantener la precisión de las alineaciones astronómicas a lo largo de siglos de modificaciones, y organizar el trabajo de decenas de personas sin herramientas de metal ni escritura: todo esto exigía líderes capaces, conocimiento técnico especializado y mecanismos para transmitir ese conocimiento entre generaciones.',
      'Sin escritura, el conocimiento astronómico se preservaba de dos maneras: en la memoria de los ancianos a través de la tradición oral, y en las piedras mismas. Las piedras eran, en cierto sentido, libros de piedra: cada alineamiento era una instrucción permanente sobre cómo y cuándo observar el cielo. Una vez construido el círculo y los alineamientos, cualquier persona con entrenamiento podía leerlos. Era una tecnología de transmisión del conocimiento que no requería ni papel ni tinta — solo piedra y cielo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'El análisis genético de restos humanos encontrados en sitios arqueológicos del Sahara durante el Período Húmedo Africano ha comenzado a revelar la historia de estas poblaciones. Estudios publicados entre 2018 y 2023 en revistas como Nature y Science muestran que las poblaciones del norte de África durante este período eran genéticamente diversas, con mezclas de linajes del norte y del sur del continente. Cuando el Sahara se desecó y estas poblaciones migraron al Nilo, llevaron consigo sus genes y sus tradiciones culturales, contribuyendo a la mezcla genética y cultural que caracterizó el Egipto predinástico.' },
      { label: 'Dato Científico', icon: 'atom',
        text: 'Los análisis osteológicos (estudio de huesos) de los restos humanos encontrados en Nabta Playa muestran que estas tribus tenían una salud relativamente buena para su época: estatura promedio de aproximadamente 1.70-1.75 metros para los hombres y una dieta variada basada en leche de vaca, carne, pescado de los lagos, plantas silvestres y cereales como el sorgo silvestre. Sin embargo, también muestran evidencia de períodos de estrés nutricional durante las estaciones secas, confirmando la vida difícil y estacional de estos pastores del Sahara.' },
    ],
    fact: 'Los análisis de los restos óseos hallados en Nabta Playa muestran que estas personas tenían una estatura promedio de alrededor de 1.70-1.75 metros para los hombres — comparable a la altura promedio de muchas poblaciones europeas actuales. Su dieta era variada: leche, carne de vaca, pescado del lago estacional, cereales silvestres y plantas de la sabana. Sin embargo, los mismos huesos muestran marcas de períodos de escasez estacional, cuando el lago se secaba y el ganado escaseaba. Su vida era un ciclo constante de abundancia en la estación húmeda y escasez en la estación seca.',
  },
  {
    id: 'stonehenge',
    title: 'Más Antiguo que Stonehenge',
    color: '#9E9E9E',
    btnImage: '/assets/egypt/infographic_nabta/btn_stonehenge.png',
    image: '/assets/egypt/infographic_nabta/hero_stonehenge.png',
    content: [
      'Nabta Playa fue construido entre el 4800 y el 4000 a.C., mientras que Stonehenge comenzó a construirse alrededor del 3000 a.C. Esto significa que cuando los constructores de Stonehenge colocaron su primera piedra en la llanura de Salisbury, en el sur de Inglaterra, el observatorio de Nabta Playa ya llevaba entre 1,000 y 1,800 años en uso. En términos de tiempo histórico, esta diferencia es enorme: equivale a más que toda la historia del Imperio Romano desde su fundación hasta su caída.',
      'Stonehenge, en el sur de Inglaterra, es el megalito más famoso del mundo. Su construcción involucró el transporte de piedras de hasta 25 toneladas desde canteras en Gales, a más de 200 km de distancia. El conjunto pesa aproximadamente 4,000 toneladas. Nabta Playa es más modesto en escala, pero no en complejidad astronómica: ambos sitios sirvieron como observatorios precisos, y ambos integran alineaciones solares y estelares en su diseño.',
      'Nabta Playa no es el único observatorio astronómico antiguo conocido. Göbekli Tepe, en Turquía, data de aproximadamente el 9500 a.C. y es el templo conocido más antiguo del mundo. Carnac, en la Bretaña francesa, tiene alineamientos de miles de menhires que datan del 4500-3300 a.C. Sin embargo, Nabta Playa destaca porque integra en un único complejo un calendario solar, un posible mapa estelar y un centro ritual — una combinación de funciones que lo hace especialmente notable.',
      'Los científicos de la arqueoastronomía (el estudio de cómo las culturas antiguas entendían y usaban la astronomía) creen que el conocimiento astronómico megalítico se desarrolló de forma independiente en múltiples regiones del mundo. Las similitudes entre sitios como Nabta Playa, Stonehenge, Carnac y los calendarios astronómicos de las culturas mesoamericanas no indican contacto entre estas culturas — indican que, cuando los humanos observan el cielo durante generaciones, inevitablemente descubren los mismos patrones.',
      'Nabta Playa es un recordatorio de que África no fue un continente pasivo en el desarrollo de la ciencia antigua. Las culturas del norte de África tuvieron observatorios astronómicos organizados al menos 1,000 años antes que cualquier estructura comparable conocida en Europa, y posiblemente mucho más. La historia convencional de la ciencia frecuentemente se narra como si comenzara en Mesopotamia y Grecia, ignorando contribuciones africanas que preceden a ambas civilizaciones.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom',
        text: 'La comparación entre Nabta Playa y Stonehenge va más allá de la antigüedad. Ambos sitios comparten características arquitectónicas y astronómicas llamativas: círculos de piedras, alineaciones solsticiales, orientación hacia el norte astronómico y posibles orientaciones estelares. Pero hay diferencias importantes: Stonehenge tiene una ingeniería más compleja con piedras mucho más grandes trabajadas con precisión, mientras que Nabta Playa es más modesto en construcción pero potencialmente más sofisticado en su contenido astronómico, si la hipótesis del mapa de Orión de Brophy resulta ser correcta.' },
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'Göbekli Tepe, descubierto en Turquía en 1994 y publicado ampliamente desde los 2000s, es el templo o lugar de culto organizado más antiguo conocido, datado en aproximadamente el 9500-7500 a.C. Su existencia revolucionó la comprensión del desarrollo humano: fue construido por cazadores-recolectores del Neolítico, mucho antes de que el ser humano desarrollara la agricultura de forma generalizada. Tanto Göbekli Tepe como Nabta Playa sugieren que el impulso humano hacia la religión organizada, la astronomía y la construcción monumental es mucho más antiguo de lo que se creía hace apenas 50 años.' },
    ],
    fact: 'Stonehenge tardó aproximadamente 1,500 años en completarse, construyéndose en varias fases entre el 3000 y el 1500 a.C. Nabta Playa, en cambio, estuvo en uso activo y fue modificado y expandido durante más de 5,000 años — desde aproximadamente el 7000 hasta el 2000 a.C. Este período es más largo que toda la historia registrada de la escritura humana. Que un sitio sin escritura, sin metal y sin ruedas haya mantenido su relevancia y uso durante cinco milenios habla de la profundidad de la tradición astronómica y cultural que representaba.',
  },
  {
    id: 'legado-nilo',
    title: 'El Camino al Nilo',
    color: '#1ABC9C',
    btnImage: '/assets/egypt/infographic_nabta/btn_legado.png',
    image: '/assets/egypt/infographic_nabta/hero_legado.png',
    content: [
      'Al secarse el Sahara entre el 3500 y el 3000 a.C., las tribus de Nabta Playa y de toda la región saháriana migraron hacia el este en busca del agua que ya no podían encontrar en la sabana que se desecaba. Su destino fue el río Nilo, el único río permanente del norte de África. Llegaron cargando miles de años de conocimiento astronómico preservado en tradición oral, y con ellos llevaron también sus creencias, sus rituales y su cosmovisión centrada en el cielo y el ganado.',
      'Esta migración coincide cronológicamente con la aparición de la civilización predinástica de Egipto, el período inmediatamente anterior a los faraones. Los asentamientos predinásticos del Alto Nilo, como Nagada y Hierakómpolis, muestran prácticas culturales que los arqueólogos reconocen como relacionadas con las de Nabta Playa: enterramientos rituales de ganado, orientaciones astronómicas en estructuras funerarias, y representaciones de bovinos en el arte.',
      'El arquéologo Mark Lehner, director del Instituto de Investigación de las Pirámides de Guiza, ha señalado que Nabta Playa representa un eslabón importante en la cadena que va desde el pastoreo seminómada del Sahara hasta la civilización faraónica. No se trata de que los constructores de Nabta Playa "inventaran las pirámides", sino de que aportaron conocimientos de orientación astronómica, tradiciones rituales centradas en el ganado y prácticas de organización social que fueron ingredientes fundamentales del caldo cultural que produjo el Antiguo Egipto.',
      'Las conexiones específicas son persuasivas: el culto al ganado de Nabta Playa derivó en el culto a Hathor, una de las diosas más antiguas y veneradas del panteón egipcio, representada con cuernos de vaca o con cabeza de vaca. La centralidad de Orión en el sistema astronómico de Nabta Playa encuentra eco en el culto a Osiris, cuya alma se creía residía en las estrellas de Orión. La tradición de alinear estructuras con puntos astronómicos específicos — practicada durante milenios en Nabta Playa — culminó en el alineamiento astronómico de templos y pirámides que es una de las características más asombrosas de la arquitectura faraónica.',
      'El legado de Nabta Playa es, por tanto, doble: es evidencia de que la ciencia y la organización social complejas tienen raíces más profundas y más africanas de lo que la historia convencional ha reconocido, y es un recordatorio de cómo las poblaciones humanas llevan consigo su conocimiento cuando migran, sembrando en nuevas tierras las semillas de civilizaciones futuras. Las piedras de Nabta Playa siguen en el desierto, y el conocimiento que representaban vive en las pirámides del Nilo.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom',
        text: 'Los estudios de ADN antiguo de restos humanos predinásticos del Alto Egipto (publicados en revistas como Nature Communications y Current Biology entre 2017 y 2023) han mostrado que las poblaciones que fundaron la civilización egipcia tenían mezclas genéticas de diferentes regiones africanas, consistente con una migración de poblaciones del Sahara hacia el Nilo. Estas poblaciones predinásticas aportaron linajes genéticos del norte de África y del noreste del continente, creando la mezcla que caracteriza a las poblaciones del antiguo Egipto. La genética, combinada con la arqueología, construye un cuadro consistente de migración y mezcla cultural.' },
      { label: '¿Sabías que...?', icon: 'sparkles',
        text: 'El alineamiento astronómico de los templos egipcios no fue solo una práctica simbólica — tenía funciones calendáricas precisas. El Gran Templo de Abu Simbel, construido por Ramsés II alrededor del 1265 a.C., está orientado de tal manera que dos veces al año — el 22 de febrero y el 22 de octubre, fechas que coinciden con el cumpleaños y la coronación de Ramsés II según algunos investigadores — la luz del Sol penetra 60 metros hasta el santuario más interno e ilumina las estatuas de los dioses. Esta tradición de usar la orientación solar con precisión extrema tiene antecedentes directos en sitios como Nabta Playa, construido 3,000 años antes.' },
    ],
    fact: 'Nabta Playa está a unos 400 km del Nilo, una distancia que con ganado y carga, a través del desierto, habría tomado semanas de viaje. Los arqueólogos han identificado campamentos temporales a lo largo de la ruta entre el lago de Nabta Playa y el Nilo — puntos donde estas tribus descansaban y encontraban agua subterránea durante la migración. Estas rutas de migración, usadas durante siglos, se convirtieron en caminos comerciales del Antiguo Egipto. Las mismas rutas que llevaron a los primeros egipcios al Nilo fueron usadas después por caravanas comerciales que conectaban el corazón de África con el mundo mediterráneo.',
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

// â”€â”€â”€ Nabta Playa Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none',
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
                  gridColumn: isWide ? '1 / -1' : 'auto', background: `rgba(255,255,255,0.02)`, borderRadius:'12px',
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

        {/* â”€â”€â”€ Fact Box â”€â”€â”€ */}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM1() {
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
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸª¨ ¡Has explorado todos los secretos de Nabta Playa!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrónomo Ancestral
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