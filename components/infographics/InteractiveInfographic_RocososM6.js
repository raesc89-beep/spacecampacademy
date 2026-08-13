'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Futuro de los Planetas Rocosos) ─────────────────
function DecoRedGiant({ size = 70, color = '#FF0054', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="8" fill={color} />
    </svg>
  );
}

function DecoOceanEvap({ size = 70, color = '#FFBD00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 45 Q20 30 30 45 T50 45" fill="none" stroke={color} strokeWidth="2" />
      <path d="M15 25 L15 10 M30 25 L30 10 M45 25 L45 10" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function DecoThermalVenus({ size = 70, color = '#FF5400', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M15 30 Q30 10 45 30 Q30 50 15 30 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoTerraformDome({ size = 70, color = '#3A86FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 45 A20 20 0 0 1 50 45 Z" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <line x1="10" y1="45" x2="50" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="38" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoTrappistSystem({ size = 70, color = '#8338EC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="6" fill={color} />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="44" cy="30" r="2.5" fill={color} />
    </svg>
  );
}

function DecoAsteroidMining({ size = 70, color = '#00F5D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 45,20 40,42 18,45 12,25" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="30" y1="10" x2="30" y2="45" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoFinalDestiny({ size = 70, color = '#7000FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="30" cy="30" r="3" fill="#FFF" />
      <path d="M10 10 L20 20 M50 10 L40 20 M10 50 L20 40 M50 50 L40 40" stroke={color} strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'gigante-roja': [DecoRedGiant, DecoOceanEvap, DecoThermalVenus],
  'evaporacion-oceanos': [DecoOceanEvap, DecoRedGiant, DecoTerraformDome],
  'descomposicion-venus': [DecoThermalVenus, DecoRedGiant, DecoFinalDestiny],
  'marte-segundo-hogar': [DecoTerraformDome, DecoTrappistSystem, DecoAsteroidMining],
  'exoplanetas-rocosos': [DecoTrappistSystem, DecoTerraformDome, DecoFinalDestiny],
  'recursos-planetarios': [DecoAsteroidMining, DecoTrappistSystem, DecoTerraformDome],
  'destino-final-rocas': [DecoFinalDestiny, DecoRedGiant, DecoTrappistSystem],
};

const BIBLIOGRAPHY = [
  'Scharf, C. A. (2009). "Extrasolar Planets and Astrobiology". University Science Books.',
  'Schroder, K. P., & Smith, R. C. (2008). "Distant future of the Sun and Earth revisited". Monthly Notices of the Royal Astronomical Society, 386(1), 155-163.',
  'Gillon, M., et al. (2017). "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1". Nature, 542(7642), 456-460.',
  'McInnes, C. R. (2002). "Astronomical engineering: a review of concepts for altering planetary orbits". Journal of the British Interplanetary Society, 55, 360-368.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'gigante-roja',
    title: 'El Sol Gigante Roja',
    color: '#FF0054',
    btnImage: '/assets/rocosos/infographic_m6/btn_gigante-roja.jpg',
    image: '/assets/rocosos/infographic_m6/hero_gigante-roja.jpg',
    content: [
      'Los planetas rocosos no son estructuras eternas e inmutables. Su destino final está ligado de forma indisoluble a la evolución de nuestra estrella central, el Sol. Actualmente, el Sol se encuentra a la mitad de su vida útil de diez mil millones de años, quemando hidrógeno de forma estable en su núcleo.',
      'Sin embargo, dentro de unos cinco mil millones de años, el Sol agotará todo el hidrógeno de su corazón. Al quedarse sin combustible nuclear, el núcleo se contraerá bajo su propio peso, aumentando su temperatura hasta comenzar a fusionar helio. Esta inmensa energía hará que las capas exteriores del Sol se expandan monstruosamente hacia afuera.',
      'Al expandirse, nuestra estrella se transformará en una estrella gigante roja. Su diámetro crecerá más de doscientas veces su tamaño actual, hinchándose hasta tragar y engullir completamente a los planetas interiores Mercurio y Venus dentro de su atmósfera estelar ardiente.',
      'El cielo de la Tierra se volverá de un color rojo brillante a medida que el disco solar ocupe casi todo el horizonte. La radiación extrema evaporará la atmósfera terrestre y derretirá la superficie del planeta en un nuevo océano de magma hirviente.',
      'Esta fase de gigante roja durará unos mil millones de años, marcando el capítulo final para los mundos rocosos interiores que nacieron juntos en la infancia del Sistema Solar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando el Sol se convierta en una gigante roja, la zona de habitabilidad del Sistema Solar se desplazará hacia afuera, convirtiendo a las lunas heladas de Júpiter y Saturno como Europa y Titán en mundos templados con océanos superficiales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Durante su fase de gigante roja, el Sol perderá aproximadamente un 30% de su masa total debido a vientos estelares intensos, haciendo que las órbitas de los planetas sobrevivientes se expandan ligeramente hacia afuera.' }
    ],
    fact: 'El radio del Sol como gigante roja alcanzará más de 150 millones de kilómetros, rozando la órbita actual de la Tierra.',
  },
  {
    id: 'evaporacion-oceanos',
    title: 'Evaporación de Océanos',
    color: '#FFBD00',
    btnImage: '/assets/rocosos/infographic_m6/btn_evaporacion-oceanos.jpg',
    image: '/assets/rocosos/infographic_m6/hero_evaporacion-oceanos.jpg',
    content: [
      'Mucho antes de que el Sol se expanda hasta convertirse en una gigante roja, la Tierra sufrirá un cambio climático inevitable. A medida que el Sol quema hidrógeno en su núcleo, se vuelve gradualmente un diez por ciento más brillante y caliente cada mil millones de años.',
      'Dentro de aproximadamente mil millones de años, este aumento progresivo del brillo solar sobrecalentará la superficie de la Tierra. La temperatura media global superará los sesenta grados Celsius, desencadenando una evaporación masiva y acelerada de todos los océanos del planeta.',
      'El vapor de agua resultante llenará la atmósfera, actuando como un potente gas de efecto invernadero que atrapará aún más calor. En las capas altas del aire, la radiación ultravioleta del Sol romperá las moléculas de agua, haciendo que el hidrógeno escape para siempre hacia el espacio profundo.',
      'En unos mil quinientos millones de años, la Tierra habrá perdido hasta la última gota de sus océanos azules, transformándose en un desierto estéril y polvoriento sin agua líquida, similar a la superficie abrasadora de Venus hoy en día.',
      'Este destino marca el límite temporal para la biosfera terrestre. La vida compleja sobre los continentes desaparecerá, dejando únicamente a microorganismos extremófilos subterráneos como los últimos sobrevivientes del planeta azul.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La pérdida de los océanos detendrá por completo la tectónica de placas en la Tierra, ya que se requiere agua en los minerales del manto para lubricar el movimiento de los continentes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El escape hidrodinámico de hidrógeno provocado por la radiación solar extrema reducirá la masa de la atmósfera terrestre de forma continua a lo largo de los próximos 2,000 millones de años.' }
    ],
    fact: 'La ventana de tiempo restante para la existencia de vida compleja en la Tierra es de aproximadamente 1,000 millones de años debido al aumento natural del brillo solar.',
  },
  {
    id: 'descomposicion-venus',
    title: 'Transformación de Venus',
    color: '#FF5400',
    btnImage: '/assets/rocosos/infographic_m6/btn_descomposicion-venus.jpg',
    image: '/assets/rocosos/infographic_m6/hero_descomposicion-venus.jpg',
    content: [
      'A medida que el Sol evolucione hacia su fase final, Venus sufrirá una transformación física radical. Al estar ubicado más cerca del Sol que la Tierra, Venus absorberá una cantidad descomunal de radiación solar durante la expansión estelar.',
      'Las temperaturas en la superficie de Venus subirán por encima de los dos mil grados Celsius. Este calor formidable derretirá por completo las rocas de basalto y los silicatos de la corteza, convirtiendo al planeta entero en una esfera brillante de lava líquida desprovista de suelo firme.',
      'La densa atmósfera de dióxido de carbono que caracteriza a Venus en la actualidad será arrancada y dispersada hacia el espacio interplanetario por las ráfagas violentas de los vientos estelares de la gigante roja.',
      'Finalmente, cuando el radio del Sol gigante alcance la posición orbital de Venus, el planeta será tragado entero por la atmósfera solar exterior. La inmensa fricción con el gas estelar frenará la órbita de Venus, haciendo que el planeta se espiralice hacia el centro del Sol donde será evaporado y desintegrado por completo.',
      'Los átomos que alguna vez formaron los volcanes, las llanuras de basalto y la atmósfera ácida de Venus se mezclarán con el plasma solar, destruyendo la identidad del planeta después de cinco mil millones de años de existencia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La destrucción de Venus dentro del Sol liberará suficiente energía en la atmósfera estelar para causar un breve destello brillante visible desde las estrellas cercanas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evaporación de un planeta rocoso dentro de una gigante roja altera la abundancia química de la estrella, aumentando la presencia de elementos pesados en su espectro luminoso.' }
    ],
    fact: 'Mercurio y Venus están destinados a ser absorbidos y destruidos totalmente por el Sol durante su fase de gigante roja.',
  },
  {
    id: 'marte-segundo-hogar',
    title: 'Marte y Terraformación',
    color: '#3A86FF',
    btnImage: '/assets/rocosos/infographic_m6/btn_marte-segundo-hogar.jpg',
    image: '/assets/rocosos/infographic_m6/hero_marte-segundo-hogar.jpg',
    content: [
      'A medida que la Tierra se vuelva inhabitable en los próximos siglos y milenios, el planeta Marte se presenta como el destino más prometedor para la expansión de la civilización humana y la preservación del conocimiento científico.',
      'Aunque Marte es hoy un mundo helado, contiene gigantescas reservas de hielo de agua subterráneo y dióxido de carbono congelado en sus casquetes polares que podrían utilizarse para transformar el planeta mediante la ingeniería planetaria o terraformación.',
      'El concepto de terraformación busca alterar deliberadamente el clima marciano. Liberando gases de efecto invernadero para espesar la atmósfera, se podría elevar la temperatura global hasta derretir el hielo subterráneo y crear de nuevo océanos y ríos de agua líquida en la superficie.',
      'Con una atmósfera más densa y agua corriendo por las llanuras de Jezero y Gale, los humanos podrían introducir plantas genéticamente modificadas para iniciar la fotosíntesis masiva, produciendo oxígeno respirable a lo largo de siglos de trabajo sostenido.',
      'Marte podría convertirse en nuestro segundo hogar en el cosmos, sirviendo como un refugio de la humanidad y un puente para la exploración de los exoplanetas rocosos que orbitan alrededor de otras estrellas de la galaxia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La baja gravedad de Marte (un 38% de la terrestre) permitiría a los humanos construir estructuras gigantescas y ciudades bajo domos transparentes con materiales mucho más ligeros que en la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para proteger a Marte terraformado de la radiación solar sin un campo magnético propio, los científicos proponen colocar un escudo magnético artificial en el punto de Lagrange L1 entre Marte y el Sol.' }
    ],
    fact: 'Se estima que un proceso completo de terraformación marciana requeriría entre varios siglos y mil años de desarrollo tecnológico continuo.',
  },
  {
    id: 'exoplanetas-rocosos',
    title: 'Super-Tierras y TRAPPIST-1',
    color: '#8338EC',
    btnImage: '/assets/rocosos/infographic_m6/btn_exoplanetas-rocosos.jpg',
    image: '/assets/rocosos/infographic_m6/hero_exoplanetas-rocosos.jpg',
    content: [
      'La búsqueda de planetas rocosos ya no se limita a nuestro Sistema Solar. Gracias a observatorios espaciales avanzados como Kepler, TESS y el Telescopio Espacial James Webb, los astrónomos han descubierto miles de exoplanetas rocosos orbitando otras estrellas en la Vía Láctea.',
      'Entre los hallazgos más extraordinarios destacan las Super-Tierras, mundos rocosos con una masa entre dos y diez veces superior a la de la Tierra. Estos planetas poseen campos gravitatorios potentes y atmósferas densas capaces de albergar enormes océanos globales sin continentes.',
      'Uno de los sistemas más fascinantes es TRAPPIST-1, una estrella enana roja ultrafría situada a cuarenta años luz de la Tierra que alberga siete planetas rocosos de tamaño similar al nuestro. Tres de estos planetas orbitan dentro de la zona de habitabilidad donde el agua líquida puede existir.',
      'Estudiar la atmósfera de estos exoplanetas rocosos mediante espectroscopia permite a los astrofísicos buscar biofirmas como oxígeno, ozono, metano y vapor de agua, tratando de descubrir si la vida ha florecido en otros rincones de la galaxia.',
      'Los planetas rocosos enanos alrededor de estrellas enanas rojas pueden mantener condiciones habitables durante billones de años, ofreciendo un refugio para la vida mucho más duradero que la vida de nuestro propio Sol.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los siete planetas del sistema TRAPPIST-1 están tan cerca entre sí que si estuvieras en la superficie de uno de ellos, verías a los planetas vecinos en el cielo más grandes que la Luna llena vista desde la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El telescopio espacial James Webb analiza la luz de la estrella TRAPPIST-1 al pasar a través de las atmósferas de sus planetas para determinar su composición química mediante espectroscopia de transmisión.' }
    ],
    fact: 'Las estrellas enanas rojas viven hasta billones de años, ofreciendo a sus exoplanetas rocosos una estabilidad climática miles de veces mayor que la del Sol.',
  },
  {
    id: 'recursos-planetarios',
    title: 'Minería Espacial',
    color: '#00F5D4',
    btnImage: '/assets/rocosos/infographic_m6/btn_recursos-planetarios.jpg',
    image: '/assets/rocosos/infographic_m6/hero_recursos-planetarios.jpg',
    content: [
      'El futuro de los planetas rocosos y pequeños asteroides está estrechamente ligado al desarrollo de la economía espacial humana. Los cuerpos rocosos de nuestro sistema albergan reservas inestimables de metales raros, minerales industriales y recursos energéticos fundamentales.',
      'Asteroides rocosos del tipo M y planetesimales metálicos contienen concentraciones gigantescas de hierro, níquel, cobalto, oro y metales del grupo del platino que superan por completo todas las reservas mineras conocidas en la corteza terrestre.',
      'La minería de asteroides y la extracción de recursos en la Luna o Marte permitirán construir estructuras gigantescas en el espacio, como astilleros orbitales, paneles solares espaciales y hábitats cósmicos sin tener que transportar los materiales pesados desde la Tierra.',
      'Además de metales, el hielo de agua atrapado en los polos de la Luna y Marte puede descomponerse mediante electrólisis en hidrógeno y oxígeno líquidos, produciendo combustible para cohetes y agua potable para las estaciones espaciales del futuro.',
      'Esta era de minería geológica interplanetaria transformará la relación de la humanidad con los cuerpos rocosos, convirtiendo los asteroides y lunas en los cimientos industriales para la exploración de todo el Sistema Solar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El asteroide metálico 16 Psyche, ubicado en el cinturón de asteroides, contiene suficiente hierro y níquel como para superar el valor económico de toda la economía global de la Tierra multiplicada por miles de veces.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La extracción de recursos in situ (ISRU) es la tecnología desarrollada por la NASA para producir oxígeno y agua directamente a partir del regolito marciano y lunar durante misiones de larga duración.' }
    ],
    fact: 'Un solo asteroide rocoso de 500 metros rico en platino puede contener más metales del grupo del platino que todos los extraídos en la historia de la humanidad.',
  },
  {
    id: 'destino-final-rocas',
    title: 'El Destino Final',
    color: '#7000FF',
    btnImage: '/assets/rocosos/infographic_m6/btn_destino-final-rocas.jpg',
    image: '/assets/rocosos/infographic_m6/hero_destino-final-rocas.jpg',
    content: [
      '¿Cuál es el destino final de todas las rocas y planetas del universo a escalas de tiempo cosmológicas? Después de que el Sol expulse sus capas exteriores como una gigante roja, dejará tras de sí un remanente estelar pequeño, denso y caliente llamado enana blanca.',
      'Los planetas sobrevivientes que no fueron devorados, como Marte, Júpiter y Saturno, continuarán orbitando alrededor de la fría enana blanca durante miles de millones de años en la oscuridad del espacio en enfriamiento.',
      'Con el paso de billones de años, las interacciones gravitatorias entre los planetas restantes y las estrellas que pasen cerca desestabilizarán lentamente sus órbitas. Algunos planetas rocosos serán expulsados hacia el vacío del espacio interplanetario como mundos vagabundos.',
      'Otros planetas rocosos serán arrastrados por la gravedad hacia la enana blanca central, donde las fuerzas de marea destruirán el planeta en un anillo de polvo rocoso que terminará cayendo sobre la estrella muerta.',
      'En escalas de tiempo casi infinitas de miles de billones de años, toda la materia sólida de los planetas rocosos se desintegrará gradualmente por la desintegración de los protones, completando el ciclo cósmico de la materia que comenzó en la nebulosa solar primigenia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astrónomos han descubierto muchas enanas blancas "contaminadas" cuyos espectros muestran rastros de hierro, magnesio y silicio procedentes de planetas rocosos que fueron destruidos y devorados por la estrella.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Una enana blanca tiene la masa del Sol apretada en el volumen de la Tierra, generando un campo gravitatorio superficial 100,000 veces más fuerte que el terrestre.' }
    ],
    fact: 'Toda la materia de los planetas rocosos está compuesta por átomos sintetizados en el corazón de antiguas estrellas que murieron antes del nacimiento del Sol.',
  },
];

export default function InteractiveInfographic_RocososM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,10,25,0.92) 0%, rgba(28,12,30,0.88) 40%, rgba(12,8,20,0.95) 100%)',
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
      <RockyDustField color1="255, 0, 84" color2="131, 56, 236" />
      <RocososHeader title="FUTURO DE LOS PLANETAS ROCOSOS" subtitle="EVOLUCIÓN ESTELAR Y EL DESTINO FINAL" primaryColor="#FF0054" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF0054, #8338EC)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar el futuro de los planetas rocosos.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #FF005460' }}>
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

function RockyDustField({ color1 = '255, 0, 84', color2 = '131, 56, 236' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM6)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM6" x1="0" y1="0" x2="1" y2="0">
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
        background: 'rgba(20, 12, 25, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
