'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (La Tierra: El Oasis Tectónico) ───────────────────
function DecoTectonicPlate({ size = 70, color = '#2A9D8F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 35 L25 25 L35 35 L50 20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M10 42 L25 32 L35 42 L50 27" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoGeodynamo({ size = 70, color = '#48CAE4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M30 10 Q15 30 30 50 Q45 30 30 10 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill={color} />
    </svg>
  );
}

function DecoCarbonCycle({ size = 70, color = '#52B788', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
      <path d="M48 30 L42 24 M48 30 L42 36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoOceanWave({ size = 70, color = '#0077B6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 25 Q20 15 30 25 T50 25" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <path d="M10 38 Q20 28 30 38 T50 38" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

function DecoLunarOrbit({ size = 70, color = '#E9C46A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="25" cy="30" r="14" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="45" cy="20" r="5" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoOxygenMolecule({ size = 70, color = '#70E000', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="40" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <line x1="20" y1="26" x2="40" y2="26" stroke={color} strokeWidth="2" />
      <line x1="20" y1="34" x2="40" y2="34" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoOasis({ size = 70, color = '#9B5DE5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="30,12 35,24 48,24 38,32 42,45 30,36 18,45 22,32 12,24 25,24" fill={color} opacity="0.4" />
    </svg>
  );
}

const DECO_MAP = {
  'tectonica-de-placas': [DecoTectonicPlate, DecoGeodynamo, DecoCarbonCycle],
  'escudo-magnetico': [DecoGeodynamo, DecoOceanWave, DecoLunarOrbit],
  'termostato-carbono': [DecoCarbonCycle, DecoTectonicPlate, DecoOxygenMolecule],
  'oceanos-y-agua': [DecoOceanWave, DecoCarbonCycle, DecoOasis],
  'la-luna-estabilizadora': [DecoLunarOrbit, DecoTectonicPlate, DecoOceanWave],
  'oxigenacion-biosfera': [DecoOxygenMolecule, DecoCarbonCycle, DecoOasis],
  'oasis-habitabilidad': [DecoOasis, DecoOceanWave, DecoGeodynamo],
};

const BIBLIOGRAPHY = [
  'Stern, R. J. (2002). "Subduction zones". Reviews of Geophysics, 40(4), 3-1-3-38.',
  'Tarduno, J. A., et al. (2010). "Geodynamo, paleointensity, and the Hadean to Archean Earth\'s magnetic field". Science, 327(5970), 1238-1240.',
  'Walker, J. C., Hays, P. B., & Kasting, J. F. (1981). "A negative feedback mechanism for the long-term stabilization of Earth\'s surface temperature". Journal of Geophysical Research: Oceans, 86(C10), 9776-9782.',
  'Laskar, J., Joutel, F., & Robutel, P. (1993). "Stabilization of the Earth\'s obliquity by the Moon". Nature, 361(6413), 615-617.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tectonica-de-placas',
    title: 'Tectónica de Placas',
    color: '#2A9D8F',
    btnImage: '/assets/rocosos/infographic_m4/btn_tectonica-de-placas.jpg',
    image: '/assets/rocosos/infographic_m4/hero_tectonica-de-placas.jpg',
    content: [
      'La Tierra es el único planeta conocido en todo el universo que posee una tectónica de placas activa y continua. Su corteza exterior no es una cáscara rígida de una sola pieza como en Mercurio o Marte, sino un rompecabezas gigante compuesto por una docena de placas litosféricas rígidas que flotan y se deslizan lentamente sobre el manto caliente y viscoso.',
      'Imagínate las placas tectónicas como los bloques de hielo flotando en la superficie de un lago en deshielo. Donde dos placas se separan, el magma sube desde las profundidades para crear nueva corteza oceánica; donde dos placas chocan, una se hunde por debajo de la otra hacia el manto en un proceso llamado subducción, reciclando la rocas viejas.',
      'Este reciclaje continuo de corteza es vital para la salud del planeta. Actúa como una cinta transportadora gigante que arrastra minerales, agua y compuestos de carbono desde la superficie hacia el interior de la Tierra, devolviéndolos más tarde a través de erupciones volcánicas controladas.',
      'Gracias a la tectónica de placas, la Tierra ha construido continentes elevados, profundas fosas marinas y majestuosas cadenas montañosas como los Himalayas y los Andes. El movimiento constante de las placas renueva continuamente los nutrientes minerales en el suelo, permitiendo la fertilidad de los ecosistemas.',
      'Sin tectónica de placas, la Tierra habría quedado congelada geológicamente hace miles de millones de años, convirtiéndose en un mundo plano y estéril sin montañas, sin ciclo de nutrientes y sin la capacidad de regular su clima a largo plazo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las placas tectónicas de la Tierra se mueven a una velocidad media de entre dos y diez centímetros por año, exactamente la misma velocidad a la que crecen las uñas de tus manos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La presencia de agua líquida en los minerales del manto actúa como un lubricante esencial que permite que las placas se deslicen suavemente sobre el astenosfera sin atancarse permanentemente.' }
    ],
    fact: 'Toda la corteza oceánica de la Tierra es extremadamente joven en términos geológicos; se renueva por completo cada 200 millones de años gracias al proceso de subducción.',
  },
  {
    id: 'escudo-magnetico',
    title: 'Escudo Magnético',
    color: '#48CAE4',
    btnImage: '/assets/rocosos/infographic_m4/btn_escudo-magnetico.jpg',
    image: '/assets/rocosos/infographic_m4/hero_escudo-magnetico.jpg',
    content: [
      'En el corazón profundo de la Tierra gira un motor colosal e invisible llamado la geodinamo. Este motor se ubica en el núcleo externo, una capa de hierro y níquel líquidos de dos mil doscientos kilómetros de grosor que gira continuadamente debido a la rotación del planeta y al calor que asciende desde el centro sólido.',
      'El movimiento fluido del hierro metálico conductor genera corrientes eléctricas gigantescas que producen un potente campo magnético dipolar rodeando la Tierra. Este campo magnético se extiende decenas de miles de kilómetros hacia el espacio exterior, creando un escudo protector conocido como la magnetosfera.',
      'Imagina la magnetosfera como un campo de fuerza invisible rodeando una nave espacial. Su función principal es desviar el viento solar, un flujo constante de partículas subatómicas de alta energía expulsadas por el Sol a más de un millón de kilómetros por hora que arrasaría cualquier atmósfera indefensa.',
      'Sin nuestro escudo magnético, el viento solar habría arrancado la atmósfera terrestre poco a poco, exactamente igual a como le sucedió a Marte en el pasado. El agua de los océanos se habría evaporado y la superficie estaría expuesta a una radiación cósmica letal para la vida.',
      'A veces, las partículas solares atrapadas en los bordes del campo magnético son canalizadas hacia los polos magnéticos del planeta. Al chocar contra los gases de la alta atmósfera, estas partículas emiten luces brillantes y coloridas de tonos verdes, violetas y azules conocidas como las hermosas auroras boreales y australes.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El campo magnético de la Tierra no es fijo; invierte su polaridad magnética cada pocos cientos de miles de años, haciendo que el polo norte magnético pase a estar en el sur y viceversa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Muchos animales migratorios como las aves, las tortugas marinas y las ballenas poseen diminutos cristales de magnetita en sus cerebros que les permiten navegar guiándose por las líneas invisibles del campo magnético terrestre.' }
    ],
    fact: 'El campo magnético de la Tierra se extiende hasta unos 65,000 kilómetros en la cara diurna encarada al Sol y más de 600,000 kilómetros en la cola nocturna.',
  },
  {
    id: 'termostato-carbono',
    title: 'Termostato Global',
    color: '#52B788',
    btnImage: '/assets/rocosos/infographic_m4/btn_termostato-carbono.jpg',
    image: '/assets/rocosos/infographic_m4/hero_termostato-carbono.jpg',
    content: [
      '¿Cómo ha logrado la Tierra mantener una temperatura habitable y océanos líquidos durante más de cuatro mil millones de años a pesar de que el Sol se ha vuelto un treinta por ciento más brillante desde su nacimiento? La respuesta radica en el ciclo del carbono-silicato, el termostato natural del planeta.',
      'Este termostato funciona mediante un bucle de retroalimentación negativa perfecto. Cuando el planeta se calienta demasiado, la evaporación del agua aumenta y se producen más lluvias. El agua de lluvia disuelve el dióxido de carbono del aire, formando un ácido débil que desgasta las rocas de silicato en los continentes.',
      'Los ríos transportan los minerales disueltos y el carbono atrapado hacia los océanos, donde los organismos marinos los utilizan para construir conchas de carbonato de calcio. Al morir estos organismos, sus conchas se acumulan en el fondo del mar, convirtiéndose en rocas calizas y atrapando el carbono de forma permanente.',
      'Por el contrario, si el planeta se enfría demasiado, la lluvia disminuye y el desgaste de las rocas se frena. Sin embargo, los volcanes continúan expulsando dióxido de carbono a la atmósfera de forma constante. La acumulación gradual del gas aumenta el efecto invernadero, calentando nuevamente el planeta.',
      'Este mecanismo autorregulador ha salvado a la Tierra de congelaciones eternas y de incendios globales insostenibles, manteniendo la temperatura media del planeta en unos confortables quince grados Celsius aptos para la prosperidad de la vida.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El ciclo del carbono a largo plazo tarda unos 500,000 años en completar una vuelta entera, moviendo miles de billones de toneladas de carbono entre la atmósfera, las rocas y los océanos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las rocas calizas y sedimentarias de la corteza terrestre contienen atrapado más del 99.9% de todo el carbono de la Tierra, evitando que pase a la atmósfera en forma de gas invernadero.' }
    ],
    fact: 'El ciclo del carbono-silicato fue propuesto en 1981 por los científicos James Kasting, James Walker y Paul Hays como el mecanismo clave de autorregulación climática terrestre.',
  },
  {
    id: 'oceanos-y-agua',
    title: 'Océanos Líquidos',
    color: '#0077B6',
    btnImage: '/assets/rocosos/infographic_m4/btn_oceanos-y-agua.jpg',
    image: '/assets/rocosos/infographic_m4/hero_oceanos-y-agua.jpg',
    content: [
      'Visto desde el espacio profundo, nuestro hogar es un deslumbrante punto azul. La Tierra es el único planeta conocido del Sistema Solar donde el agua existe de forma estable en sus tres estados físicos simultáneamente: hielo sólido en los polos, vapor gaseoso en las nubes y agua líquida en los océanos.',
      'Los océanos cubren más del setenta y uno por ciento de la superficie terrestre y contienen más de mil trescientos cincuenta millones de kilómetros cúbicos de agua. Esta masa líquida actúa como un gigantesco acumulador térmico que absorbe el calor del Sol en el ecuador y lo distribuye hacia los polos mediante corrientes marinas.',
      'El agua líquida posee propiedades químicas extraordinarias que la convierten en el solvente universal perfecto para la biología. Permite que las moléculas orgánicas se disuelvan, reaccionen entre sí y formen las estructuras complejas necesarias para la vida celular.',
      'La posición orbital de la Tierra, ubicada en el centro exacto de la zona de habitabilidad estelar del Sol, junto con la presión atmosférica adecuada al nivel del mar, permite que el agua permanezca en su punto triple perfecto sin hervir como en Venus ni congelarse eternamente como en Marte.',
      'Además de sustentar la biosfera, los océanos participan activamente en la regulación del clima global y en la meteorología continental, generando el ciclo hidrológico de lluvias que alimenta los ríos y lagos de todos los continentes.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Si la superficie de la Tierra fuera perfectamente lisa sin montañas ni fosas oceánicas, los océanos cubrirían todo el planeta entero con una capa de agua de 2.7 kilómetros de profundidad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El agua marina posee un calor específico excepcionalmente alto, lo que significa que requiere enormes cantidades de energía para cambiar de temperatura, estabilizando el clima del planeta.' }
    ],
    fact: 'Gran parte del agua de los océanos terrestres llegó durante la infancia del planeta mediante el impacto de condritas carbonáceas procedente del cinturón de asteroides exterior.',
  },
  {
    id: 'la-luna-estabilizadora',
    title: 'La Luna Estabilizadora',
    color: '#E9C46A',
    btnImage: '/assets/rocosos/infographic_m4/btn_la-luna-estabilizadora.jpg',
    image: '/assets/rocosos/infographic_m4/hero_la-luna-estabilizadora.jpg',
    content: [
      'La Tierra posee una compañera espacial extraordinariamente grande para ser un planeta rocoso. Nuestra Luna tiene más de un cuarto del diámetro terrestre, una proporción de tamaño entre satélite y planeta mayor que la de cualquier otro sistema conocido en el Sistema Solar.',
      'Esta gran masa lunar no es solo un adorno en el cielo nocturno; actúa como un ancla gravitatoria esencial para la estabilidad climática de la Tierra. La atracción gravitatoria de la Luna evita que el eje de rotación de nuestro planeta tambalee de forma caótica a lo largo del tiempo.',
      'Actualmente, el eje de la Tierra está inclinado veintitrés grados y medio respecto a su órbita, lo que produce la sucesión suave de las cuatro estaciones del año. Gracias a la presencia amortiguadora de la Luna, esta inclinación se mantiene estable variando apenas un grado durante cientos de miles de años.',
      'En cambio, planetas sin una luna grande como Marte sufren variaciones brutales en su inclinación axial, pasando de cero a más de sesenta grados. Estas oscilaciones caóticas provocan cambios climáticos catastróficos que congelan y descongelan los polos de forma destructiva.',
      'Adicionalmente, la atracción gravitatoria lunar produce las mareas oceánicas diarias, que mezclan los nutrientes en las zonas costeras y ayudaron en el pasado a que los primeros organismos marinos colonizaran el suelo firme.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Luna se formó hace 4,500 millones de años cuando un protoplaneta del tamaño de Marte llamado Theia chocó de lado contra la joven Tierra, lanzando escombros que se unieron en órbita.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fricción de las mareas generadas por la Luna frena gradualmente la rotación de la Tierra, haciendo que nuestros días sean unos milisegundos más largos cada siglo.' }
    ],
    fact: 'La Luna se está alejando lentamente de la Tierra a una velocidad de 3.8 centímetros por año debido a la transferencia de momento angular por las mareas.',
  },
  {
    id: 'oxigenacion-biosfera',
    title: 'La Gran Oxidación',
    color: '#70E000',
    btnImage: '/assets/rocosos/infographic_m4/btn_oxigenacion-biosfera.jpg',
    image: '/assets/rocosos/infographic_m4/hero_oxigenacion-biosfera.jpg',
    content: [
      'En sus primeros mil quinientos millones de años, la Tierra era un mundo sin oxígeno libre en el aire. La atmósfera primitiva estaba compuesta de nitrógeno, dióxido de carbono, metano y vapor de agua, y los océanos estaban poblados únicamente por bacterias anaeróbicas primitivas.',
      'Todo cambió hace unos dos mil cuatrocientos millones de años con la aparición de las cianobacterias, diminutos microorganismos fotosintéticos que aprendieron a utilizar la luz del Sol y el agua para producir energía, liberando oxígeno molecular como residuo metabólico.',
      'Este evento revolucionario se conoce como la Gran Oxidación. Al principio, el oxígeno producido reaccionó con el hierro disuelto en los océanos, formando gigantescos depósitos de óxido de hierro que hoy minamos como vetas de mineral. Una vez oxidados los mares, el gas comenzó a acumularse masivamente en la atmósfera.',
      'La acumulación de oxígeno cambió la química planetaria por completo. Formó la capa de ozono en la estratosfera, un escudo ultravioleta esencial que protegió la superficie del planeta contra la radiación solar dañina, permitiendo que la vida saliera del mar a la tierra firme.',
      'La biosfera terrestre transformó la composición misma de la atmósfera y la geología del planeta, demostrando que la vida no es solo una pasajera en la Tierra, sino una fuerza geofísica capaz de moldear el destino de un mundo rocoso.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Gran Oxidación causó la primera gran extinción masiva de la historia, ya que el oxígeno resultante era tóxico para la mayoría de las bacterias anaeróbicas primitivas de la época.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las formaciones de hierro bandeado que se encuentran en Australia y Canadá son capas de roca sedimentaria creadas durante la Gran Oxidación al precipitar el hierro de los océanos antiguos.' }
    ],
    fact: 'El oxígeno representa el 21% del volumen de la atmósfera terrestre actual, un nivel sostenido activamente por la fotosíntesis de bosques y fitoplancton marino.',
  },
  {
    id: 'oasis-habitabilidad',
    title: 'Ecuación de Habitabilidad',
    color: '#9B5DE5',
    btnImage: '/assets/rocosos/infographic_m4/btn_oasis-habitabilidad.jpg',
    image: '/assets/rocosos/infographic_m4/hero_oasis-habitabilidad.jpg',
    content: [
      'La Tierra es el resultado final de una cadena de coincidencias cósmicas extraordinarias. No es solo la distancia al Sol lo que la hace habitable, sino la combinación perfecta de múltiples factores geológicos, astronómicos y biológicos operando en armonía.',
      'Tener el tamaño adecuado permitió a la Tierra retener una atmósfera densa sin atrapar demasiado calor como Venus ni perderla en el espacio como Marte. Su núcleo de hierro líquido generó un escudo magnético protector, mientras que la tectónica de placas mantuvo activo el reciclaje de carbono.',
      'La presencia de una luna grande estabilizó la inclinación de su eje, garantizando estaciones climáticas predecibles, y la Gran Oxidación impulsada por la biosfera creó una capa de ozono protectora y un aire rico en oxígeno para organismos complejos.',
      'Todos estos elementos interconectados convierten a la Tierra en un oasis de vida flotando en la inmensidad del espacio profundo. Es un sistema autorregulado complejo donde la geología, el clima y la biología se alimentan mutuamente en equilibrio dinámico.',
      'Comprender la ecuación perfecta de la habitabilidad terrestre es la clave para que los astrónomos busquen exoplanetas rocosos habitables alrededor de otras estrellas en la galaxia, buscando pistas de mundos que hayan logrado este mismo milagro geológico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La hipótesis Gaia, propuesta por James Lovelock en la década de 1970, sugiere que la Tierra funciona como un único sistema vivo autorregulado que ajusta activamente su clima y química para favorecer la vida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Índice de Similitud con la Tierra (ESI) es una escala utilizada por los astrofísicos para comparar exoplanetas con la Tierra en función de su radio, densidad, velocidad de escape y temperatura de superficie.' }
    ],
    fact: 'La Tierra es el único cuerpo planetario conocido en el universo donde está confirmada científicamente la existencia de vida en cualquiera de sus formas.',
  },
];

export default function InteractiveInfographic_RocososM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,20,25,0.92) 0%, rgba(12,28,30,0.88) 40%, rgba(8,15,20,0.95) 100%)',
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
      <RockyDustField color1="42, 157, 143" color2="72, 202, 228" />
      <RocososHeader title="LA TIERRA: EL OASIS TECTÓNICO" subtitle="EL PLANETA AZUL Y HABITABLE" primaryColor="#2A9D8F" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #2A9D8F, #48CAE4)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar las maravillas de la Tierra.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #2A9D8F60' }}>
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

function RockyDustField({ color1 = '42, 157, 143', color2 = '72, 202, 228' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM4)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM4" x1="0" y1="0" x2="1" y2="0">
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
        background: 'rgba(12, 22, 25, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
