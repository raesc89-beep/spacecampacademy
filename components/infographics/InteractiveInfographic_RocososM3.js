'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Venus: El Infierno de Ácido) ────────────────────
function DecoGreenhouse({ size = 70, color = '#FF595E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 45 Q30 15 45 45 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M22 45 Q30 25 38 45 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="35" r="4" fill={color} />
    </svg>
  );
}

function DecoPressureGauges({ size = 70, color = '#FFCA3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <line x1="30" y1="30" x2="42" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoAcidCloud({ size = 70, color = '#8AC926', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 35 Q10 25 20 20 Q25 12 35 15 Q45 10 50 22 Q55 30 45 38 Q35 45 25 40 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="25" cy="48" r="2" fill={color} opacity="0.7" />
      <circle cx="35" cy="52" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoVolcano({ size = 70, color = '#E07A5F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="10,50 25,25 35,25 50,50" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M28 25 Q30 15 32 25" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="30" y1="15" x2="30" y2="8" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoRetrograde({ size = 70, color = '#1982C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" strokeDasharray="8 4" opacity="0.8" />
      <path d="M15 22 L10 30 L18 30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoEvaporation({ size = 70, color = '#6A4C93', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 45 Q20 30 15 15 M30 45 Q35 30 30 15 M45 45 Q50 30 45 15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoVenera({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="35" r="14" fill="none" stroke={color} strokeWidth="2" />
      <path d="M30 21 L30 10 M20 10 L40 10" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'invernadero-desbocado': [DecoGreenhouse, DecoPressureGauges, DecoAcidCloud],
  'atmosfera-aplastante': [DecoPressureGauges, DecoGreenhouse, DecoVenera],
  'nubes-acido': [DecoAcidCloud, DecoGreenhouse, DecoEvaporation],
  'vulcanismo-venusiano': [DecoVolcano, DecoGreenhouse, DecoRetrograde],
  'rotacion-retrograda': [DecoRetrograde, DecoVolcano, DecoPressureGauges],
  'agua-evaporada': [DecoEvaporation, DecoGreenhouse, DecoAcidCloud],
  'sondas-venera': [DecoVenera, DecoPressureGauges, DecoVolcano],
};

const BIBLIOGRAPHY = [
  'Bullock, M. A., & Grinspoon, D. H. (2001). "The runaway greenhouse on Venus". Scientific American, 280(3), 50-57.',
  'Smrekar, S. E., et al. (2010). "Recent hotspot volcanism on Venus from VIRTIS emissivity data". Science, 328(5978), 605-608.',
  'Way, M. J., et al. (2016). "Was Venus the first habitable world of our solar system?". Geophysical Research Letters, 43(16), 8376-8383.',
  'Krasnopolsky, V. A. (2012). "Chemical composition of Venus\' atmosphere and clouds: Some unsolved problems". Icarus, 218(1), 230-246.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'invernadero-desbocado',
    title: 'Invernadero Desbocado',
    color: '#FF595E',
    btnImage: '/assets/venus_sulfuric_clouds_thick.png',
    image: '/assets/venus_sulfuric_clouds_thick.png',
    content: [
      'Venus es a menudo llamado el gemelo de la Tierra porque tiene casi el mismo tamaño, masa y composición rocosa que nuestro planeta. Sin embargo, su clima se desvió hacia una pesadilla aterradora. En lugar de océanos azules y brisas frescas, Venus sufre el efecto invernadero desbocado más extremo de todo el Sistema Solar, convirtiéndose en un infierno sin retorno.',
      'Imagínate dejar un automóvil cerrado con las ventanas subidas bajo el Sol ardiente durante el verano. El calor entra a través de los cristales pero no puede salir, atrapando la temperatura en el interior hasta volverlo insoportable. En Venus, la gruesa atmósfera de dióxido de carbono actúa como un cristal gigante insuperable que atrapa casi todo el calor recibido del Sol.',
      'La temperatura media en la superficie de Venus supera los cuatrocientos sesenta y cinco grados Celsius tanto de día como de noche. Este calor es tan intenso que supera con creces la temperatura dentro de un horno de pizza industrial y es más que suficiente para derretir metales como el plomo, el estaño y el aluminio en cuestión de segundos.',
      'A diferencia de la Tierra, donde las plantas, los océanos y las rocas absorben el dióxido de carbono manteniéndolo en equilibrio, Venus perdió su capacidad de autorregulación climática hace miles de millones de años. Todo el carbono que pudo haber estado atrapado en la corteza fue expulsado hacia la atmósfera en forma de gas invencible.',
      'El efecto invernadero de Venus demuestra cómo un pequeño cambio en el balance energético de un planeta puede desencadenar una espiral de calentamiento global irreversible. Es una lección fundamental para la astrofísica sobre los límites de la habitabilidad planetaria.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En la superficie de Venus hace tanto calor que el suelo rocoso emite un leve resplandor rojizo en medio de la penumbra nocturna, similar a las brasas de un fogón recién apagado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El noventa y seis por ciento de la atmósfera de Venus es dióxido de carbono puro, reteniendo la radiación infrarroja emitida por la corteza caliente y evitando que escape al espacio exterior.' }
    ],
    fact: 'Venus es el planeta más caliente de todo el Sistema Solar, superando incluso a Mercurio, a pesar de estar al doble de distancia del Sol que este último.',
  },
  {
    id: 'atmosfera-aplastante',
    title: 'Atmósfera Aplastante',
    color: '#FFCA3A',
    btnImage: '/assets/planet_venus.png',
    image: '/assets/planet_venus.png',
    content: [
      'Caminar sobre la superficie de Venus sería imposible para un ser humano, no solo por el calor infernal, sino por la descomunal presión atmosférica. La capa de gases envuelta alrededor de Venus es tan gruesa y pesada que la presión en el suelo es noventa y dos veces mayor que la presión atmosférica de la Tierra al nivel del mar.',
      'Para imaginar esta presión aplastante, piensa en sumergirte casi un kilómetro bajo la superficie del océano terrestre. La columna de agua sobre ti ejercería la misma fuerza destructiva que la columna de aire comprimido en la superficie venusiana, capaz de aplastar el casco de un submarino común como si fuera una lata de refresco vacía.',
      'La atmósfera es tan densa que el gas dióxido de carbono cerca del suelo deja de comportarse como un gas normal y se convierte en un fluido supercrítico. Es un estado raro de la materia donde el gas adquiere la densidad de un líquido viscoso, haciendo que el aire en Venus se mueva más como un océano caliente que como una brisa marina.',
      'Los vientos en la superficie parecen moverse despacio, a solo unos pocos kilómetros por hora. Sin embargo, debido a la inmensa densidad del aire supercrítico, ese movimiento suave empuja las cosas con la misma fuerza devastadora que un muro de agua en una inundación marina.',
      'Esta atmósfera colosal refleja tanta luz solar hacia el espacio que convierte a Venus en el objeto más brillante del cielo nocturno terrestre después de la Luna, fascinando a los observadores humanos desde la antigüedad bajo el nombre de la estrella del alba.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En las capas altas de la atmósfera venusiana, a unos 50 kilómetros de altitud, la temperatura y la presión son casi idénticas a las de la superficie de la Tierra, lo que ha llevado a diseñar misiones conceptuales con ciudades flotantes en zeppelines.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La masa total de la atmósfera de Venus es noventa y tres veces superior a la masa de toda la atmósfera terrestre entera, ejerciendo una masa de miles de billones de toneladas sobre la corteza.' }
    ],
    fact: 'El dióxido de carbono supercrítico en la superficie de Venus tiene una densidad de unos 67 kilogramos por metro cúbico, un 6.5% de la densidad del agua líquida.',
  },
  {
    id: 'nubes-acido',
    title: 'Nubes de Ácido Sulfúrico',
    color: '#8AC926',
    btnImage: '/assets/rocosos/infographic_m3/btn_nubes-acido.jpg',
    image: '/assets/rocosos/infographic_m3/hero_nubes-acido.jpg',
    content: [
      'Si miras a Venus desde el espacio con un telescopio, no verás continentes ni mares, sino una capa lisa y amarilla de nubes impenetrables. Estas nubes completas no están hechas de vapor de agua como en la Tierra, sino de gotas microscópicas de ácido sulfúrico concentrado, un compuesto químico corrosivo capaz de disolver metal y piel al contacto.',
      'Imagínate un cielo donde la lluvia no trae agua fresca para las plantas, sino ácido puro extremadamente fuerte. Las nubes se ubican a una altitud de entre cuarenta y ocho y setenta kilómetros sobre la superficie, formando un manto continuo que envuelve todo el planeta sin dejar una sola brecha abierta.',
      'En estas capas altas ocurren lluvias ácidas constantes. Sin embargo, las gotas de ácido sulfúrico nunca llegan a tocar el suelo firme. A medida que caen hacia la superficie, el calor sofocante de las capas inferiores las evapora por completo antes de llegar al suelo en un fenómeno meteorológico llamado virga.',
      'Por encima de la capa de nubes soplan vientos huracanados a velocidades superiores a los trescientos cincuenta kilómetros por hora. Esta corriente lleva a las nubes a dar una vuelta completa alrededor del planeta en solo cuatro días terrestres, un fenómeno conocido como superrotación atmosférica.',
      'La combinación de vientos huracanados en las alturas y gotas corrosivas convierte a la atmósfera venusiana en uno de los entornos más hostiles del Sistema Solar, desafiando el diseño de cualquier instrumento científico enviado a explorarla.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El color amarillento característico de las nubes de Venus se debe a la presencia de cristales de azufre elemental y compuestos de cloro disueltos en las microgotas de ácido sulfúrico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La superrotación atmosférica de Venus hace que los vientos de las capas altas se muevan 60 veces más rápido que la lenta rotación del planeta sólido bajo ellas.' }
    ],
    fact: 'El ácido sulfúrico en Venus se forma cuando el dióxido de azufre liberado por volcanes reacciona con trazas de vapor de agua bajo la radiación ultravioleta del Sol.',
  },
  {
    id: 'vulcanismo-venusiano',
    title: 'Vulcanismo Global',
    color: '#E07A5F',
    btnImage: '/assets/venus_volcanoes.png',
    image: '/assets/venus_volcanoes.png',
    content: [
      'La superficie de Venus es una vasta extensión de llanuras de basalto modeladas por el calor interno. Más del ochenta por ciento del suelo venusiano está cubierto por coladas de lava volcánica solidificada, salpicado por miles de volcanes gigantescos y estructuras geológicas únicas que no existen en ningún otro mundo.',
      'Entre estas formaciones destacan las coronas, estructuras circulares gigantescas de cientos de kilómetros de ancho rodeadas por fracturas radiales. Se forman cuando plumas de magma hirviente suben desde el manto profundo y empujan la corteza hacia arriba como un gran chichón antes de colapsar en el centro.',
      'Venus cuenta con más de seiscientos volcanes gigantes de más de cien kilómetros de diámetro y cientos de miles de pequeños conos volcánicos. El volcán más alto del planeta es Maat Mons, que se eleva cinco kilómetros sobre las llanuras circundantes y muestra evidencias de erupciones recientes.',
      'Los astrofísicos creen que hace unos quinientos millones de años, Venus sufrió un evento de resurfacimiento volcánico global. El calor atrapado bajo la corteza acumuló tanta energía que la corteza entera se derritió y fue sustituida por coladas de lava fresca en un evento catastrófico planetario.',
      'Datos recientes recopilados por sondas espaciales han detectado anomalías térmicas y cambios en los gases de la atmósfera que confirman que algunos volcanes venusianos continúan activos en la actualidad, expulsando lava y gases hacia el abrasador cielo amarillo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En Venus existen canales de lava fósil llamados baltis vallis que miden más de 6,800 kilómetros de longitud, siendo más largos que el río Amazonas en la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ausencia de tectónica de placas en Venus impide que el planeta libere calor interno de forma continua, obligándolo a acumular energía hasta estallar en episodios de vulcanismo global masivo.' }
    ],
    fact: 'Venus posee menos cráteres de impacto que Mercurio o la Luna porque la lava volcánica borró casi todas las cicatrices antiguas de su superficie hace 500 millones de años.',
  },
  {
    id: 'rotacion-retrograda',
    title: 'Rotación Retrógrada',
    color: '#1982C4',
    btnImage: '/assets/rocosos/infographic_m3/btn_rotacion-retrograda.jpg',
    image: '/assets/rocosos/infographic_m3/hero_rotacion-retrograda.jpg',
    content: [
      'Venus baila al ritmo de un compás único en el Sistema Solar. Mientras que casi todos los planetas giran sobre su propio eje en sentido contrario a las agujas del reloj, exactamente igual a como orbitan alrededor del Sol, Venus gira en sentido retrógrado, es decir, en la dirección opuesta.',
      'Si estuvieras en la superficie de Venus, verías salir al Sol por el oeste y ponerse por el este. Este comportamiento insólito es único entre los planetas rocosos y sugiere que el planeta sufrió un evento catastrófico en el pasado que alteró su movimiento por completo.',
      'Además de girar al revés, Venus es increíblemente perezoso para rotar. Tarda doscientos cuarenta y tres días terrestres en dar una sola vuelta sobre sí mismo. Sin embargo, su viaje alrededor del Sol tarda solo doscientos veinticinco días. ¡Un solo día en Venus dura más tiempo que un año entero en ese planeta!',
      '¿Qué pudo causar esta rotación retrógrada tan extraña? La teoría principal sugiere que durante la juventud del Sistema Solar, un embrión planetario masivo chocó contra Venus, volcando su eje de rotación ciento setenta y siete grados hacia abajo o frenando su giro hasta hacer que comenzara a girar al revés.',
      'Las intensas mareas atmosféricas generadas por el calor solar sobre su densa atmósfera de dióxido de carbono también han actuado como un freno continuo a lo largo de miles de millones de años, estabilizando esta lenta rotación retrógrada.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Debido a la combinación de su rotación retrógrada y su órbita alrededor del Sol, el tiempo entre un amanecer y el siguiente en Venus es de 116.7 días terrestres.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La inclinación axial de Venus es de 177.3 grados, lo que significa que el planeta está prácticamente patas arriba en comparación con los demás mundos del vecindario estelar.' }
    ],
    fact: 'Venus gira tan despacio sobre su eje que una persona caminando a paso ligero podría ir más rápido que la propia velocidad de rotación del planeta en su ecuador (6.5 km/h).',
  },
  {
    id: 'agua-evaporada',
    title: 'El Agua Evaporada',
    color: '#6A4C93',
    btnImage: '/assets/rocosos/infographic_m3/btn_agua-evaporada.jpg',
    image: '/assets/rocosos/infographic_m3/hero_agua-evaporada.jpg',
    content: [
      'Aunque hoy es un desierto ardiente e inhabitable, las pruebas científicas sugieren que Venus tuvo un pasado deslumbrante. Durante sus primeros dos mil millones de años de historia, Venus pudo haber sido un mundo azul y templado con océanos de agua líquida y un clima habitable muy similar al de la joven Tierra.',
      'En aquella época lejana, el Sol era un treinta por ciento menos brillante que en la actualidad. Esto permitió que Venus mantuviera temperaturas suaves y agua líquida en su superficie antes de que el aumento progresivo del calor estelar iniciara el efecto invernadero desbocado.',
      'A medida que el joven Sol se volvió más caliente, los océanos de Venus comenzaron a hervir y evaporarse. El vapor de agua subió hacia las capas altas de la atmósfera, donde la intensa luz ultravioleta solar rompió las moléculas de agua en átomos separados de hidrógeno y oxígeno.',
      'El hidrógeno, al ser el elemento más ligero del universo, se escapó hacia el espacio profundo arrastrado por el viento solar. El oxígeno restante reaccionó con las rocas de la corteza y el carbono liberado por los volcanes, formando la densa sábana de dióxido de carbono que asfixia al planeta hoy en día.',
      'La pérdida trágica del agua de Venus es la prueba definitiva de cómo la posición orbital y la evolución de una estrella definen el destino final de un planeta rocoso a lo largo del tiempo cósmico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La sonda espacial Pioneer Venus detectó en 1978 una proporción inusualmente alta de deuterio (hidrógeno pesado) en la atmósfera, prueba irrefutable de que Venus perdió gigantescas masas de agua en el pasado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Si todo el vapor de agua que alguna vez tuvo Venus se condensara hoy en su superficie, habría formado un océano global de más de 500 metros de profundidad.' }
    ],
    fact: 'Modelos climáticos del Instituto Goddard de la NASA sugieren que Venus pudo haber mantenido agua líquida y temperaturas habitables hasta hace solo 700 millones de años.',
  },
  {
    id: 'sondas-venera',
    title: 'Sondas Venera y VERITAS',
    color: '#F4A261',
    btnImage: '/assets/venera_probe_venus.png',
    image: '/assets/venera_probe_venus.png',
    content: [
      'Explorar la superficie de Venus representa una verdadera hazaña para la ingeniería humana. En la década de 1970 y 1980, la Unión Soviética logró una proeza histórica al aterrizar con éxito una serie de sondas blindadas llamadas Venera en medio del infierno venusiano.',
      'Las sondas Venera estaban diseñadas como auténticos tanques de titanio herméticos preparados para soportar presiones y temperaturas brutales. Venera 9 transmitió en 1975 las primeras fotografías en blanco y negro de la historia desde la superficie de otro planeta, mostrando un suelo rocoso de placas basálticas oscuras.',
      'Posteriormente, Venera 13 sobrevivió durante ciento veintisiete minutos en la superficie en 1982, enviando las primeras imágenes a color y analizando químicamente el suelo. Ninguna nave construida por la humanidad ha logrado sobrevivir más de dos horas bajo el aplastante ambiente de Venus.',
      'En la actualidad, una nueva era de exploración se prepara para despegar. Las agencias espaciales NASA y ESA han aprobado misiones de vanguardia como VERITAS y EnVision, equipadas con radares de apertura sintética capaces de atravesar las nubes densas y mapear la superficie con precisión milimétrica.',
      'Estas futuras misiones buscarán determinar si los volcanes de Venus siguen activos hoy en día, medirán la estructura interna del planeta y responderán a la gran pregunta de cómo un mundo tan parecido a la Tierra terminó transformándose en el infierno más despiadado del vecindario estelar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La cámara de la sonda Venera 13 tenía tapas protectoras para las lentes que debían salir volando al aterrizar. En una divertida ironía científica, una de las tapas cayó al suelo justo donde el brazo mecánico de la sonda debía medir la dureza de la roca, midiendo en su lugar la tapa de metal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La misión Magellan de la NASA en 1990 utilizó radar para mapear el 98% de la superficie de Venus, revelando por primera vez sus volcanes, coronas y complejas coladas de lava.' }
    ],
    fact: 'La sonda Venera 7 fue el primer artefacto humano en transmitir datos con éxito desde la superficie de otro planeta en diciembre de 1970.',
  },
];

export default function InteractiveInfographic_RocososM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,12,15,0.92) 0%, rgba(35,15,18,0.88) 40%, rgba(18,8,10,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <RockyDustField color1="255, 89, 94" color2="255, 202, 58" />
      <RocososHeader title="VENUS: EL INFIERNO DE ÁCIDO" subtitle="EL GEMELO MALVADO DE LA TIERRA" primaryColor="#FF595E" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF595E, #FFCA3A)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
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
                Selecciona uno de los 7 módulos superiores para explorar los misterios de Venus.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #FF595E60' }}>
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

function RockyDustField({ color1 = '255, 89, 94', color2 = '255, 202, 58' }) {
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
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? color1 : color2,
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
  }, [color1, color2]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function RocososHeader({ title, subtitle, primaryColor }) {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: `drop-shadow(0 0 12px ${primaryColor}40)` }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM3)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={primaryColor}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill={primaryColor} opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="hdrGradM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
            <stop offset="50%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill={primaryColor} fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">{title}</text>
        <text x="300" y="95" textAnchor="middle" fill={primaryColor} opacity="0.7" fontSize="11" fontFamily="monospace" letterSpacing="2">{subtitle}</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.15)'}`,
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
          layoutId={`activeDot_${node.id}`}
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
        background: 'rgba(25, 12, 16, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
                  {i === 0 ? 'Fase A' : i === 1 ? 'Fase B' : 'Fase C'}
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
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
