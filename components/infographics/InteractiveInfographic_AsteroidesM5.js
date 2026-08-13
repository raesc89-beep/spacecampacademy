'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Asteroides M5 themed: Apophis y Defensa Planetaria) ──
function DecoApophisOrbit({ size = 70, color = '#FF3D00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="30" r="5" fill={color} />
      <ellipse cx="38" cy="22" rx="4" ry="2" fill={color} />
    </svg>
  );
}

function DecoKeyhole({ size = 70, color = '#FFEA00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M30 12 A10 10 0 0 0 24 28 L20 48 L40 48 L36 28 A10 10 0 0 0 30 12 Z" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoGravTractor({ size = 70, color = '#00E676', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="20" cy="30" r="8" fill={color} opacity="0.6" />
      <rect x="36" y="22" width="16" height="16" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="1.5" />
      <path d="M28 30 L36 30" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
      <path d="M22 18 C28 24 28 36 22 42" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
    </svg>
  );
}

function DecoLaserDeflector({ size = 70, color = '#00B0FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <line x1="8" y1="52" x2="40" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="18" r="8" fill={color} opacity="0.4" />
      <path d="M42 10 L42 26 M34 18 L50 18" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoRadarDish({ size = 70, color = '#D500F9', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M12 38 C18 20 42 20 48 38 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <line x1="30" y1="38" x2="30" y2="52" stroke={color} strokeWidth="2" />
      <line x1="20" y1="52" x2="40" y2="52" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="24" r="3" fill={color} />
    </svg>
  );
}

function DecoEarthShield({ size = 70, color = '#1DE9B6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="14" fill={color} opacity="0.4" />
      <path d="M30 8 C44 8 50 18 50 32 C50 44 30 52 30 52 C30 52 10 44 10 32 C10 18 16 8 30 8 Z" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-apophis': [DecoApophisOrbit, DecoKeyhole, DecoRadarDish],
  'encuentro-2029': [DecoEarthShield, DecoApophisOrbit, DecoKeyhole],
  'cerradura-gravitacional': [DecoKeyhole, DecoApophisOrbit, DecoLaserDeflector],
  'efecto-yarkovsky': [DecoLaserDeflector, DecoGravTractor, DecoApophisOrbit],
  'tecnicas-defensa': [DecoGravTractor, DecoLaserDeflector, DecoEarthShield],
  'redes-vigilancia': [DecoRadarDish, DecoEarthShield, DecoKeyhole],
  'protocolos-respuesta': [DecoEarthShield, DecoRadarDish, DecoGravTractor],
};

const BIBLIOGRAPHY = [
  'Farnocchia, D. et al. (2021). "Yarkovsky acceleration of (99942) Apophis", The Planetary Science Journal, 2(1), 23.',
  'Giorgini, J. D. et al. (2008). "Predicting the Earth encounters of (99942) Apophis", Icarus, 193(1), 1-19.',
  'National Research Council (2010). "Defending Planet Earth: Near-Earth Object Surveys and Hazard Mitigation Strategies", National Academies Press.',
  'Ahrens, R. E. et al. (2022). "Planetary Defense Decision Support: Frameworks for Action", Acta Astronautica, 198, 312-325.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'descubrimiento-apophis',
    title: 'Descubrimiento de Apophis',
    color: '#FF3D00',
    btnImage: '/assets/asteroides/infographic_m5/btn_descubrimiento-apophis.jpg',
    image: '/assets/asteroides/infographic_m5/hero_descubrimiento-apophis.jpg',
    content: [
      'El 19 de junio de 2004, los astrónomos Roy Tucker, David Tholen y Fabrizio Bernardi descubrieron un nuevo asteroide cercano a la Tierra desde el Observatorio Nacional de Kitt Peak en Arizona. Recibió la designación provisional 2004 MN4 y más tarde el nombre definitivo de 99942 Apophis, el dios egipcio del caos y la oscuridad.',
      'Apophis es un asteroide tipo S de unos 340 metros de ancho, con una forma de cacahuate alargado y una masa estimada en 61 millones de toneladas. En diciembre de 2004, los primeros cálculos orbitales preliminares desataron una alarma científica sin precedentes en la historia de la astronomía moderna.',
      'Las computadoras indicaron que el asteroide tenía una probabilidad del 2.7% de impactar directamente contra la Tierra el viernes 13 de abril de 2029. Esta cifra aterradora hizo que Apophis alcanzara el nivel 4 en la Escala de Torino de riesgo de impacto, el nivel más alto jamás registrado desde que existen los sistemas de vigilancia espacial.',
      'Un impacto de una roca de 340 metros liberaría una energía equivalente a 1,200 megatones de TNT, miles de veces más potente que las bombas nucleares de la Segunda Guerra Mundial. Devastaría miles de kilómetros cuadrados y causaría mega-tsunamis si cayera en el océano.',
      'Afortunadamente, observaciones de seguimiento con radar telescópico permitieron precisar la órbita de Apophis y descartar por completo cualquier posibilidad de impacto para el año 2029 y durante al menos los próximos 100 años.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Escala de Torino mide el riesgo de impacto de los asteroides del 0 al 10. El nivel 0 significa ningún riesgo, mientras que el nivel 10 indica una colisión segura capaz de causar una catástrofe climática global.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Apophis pertenece al grupo de asteroides Atón, cuyas órbitas cruzan la trayectoria de la Tierra pero pasan la mayor parte de su periodo orbital dentro del espacio interior de la órbita terrestre.' }
    ],
    fact: 'El asteroide 99942 Apophis tarda 323 días en completar una órbita alrededor del Sol. Su velocidad orbital promedio es de 30.7 kilómetros por segundo.',
  },
  {
    id: 'encuentro-2029',
    title: 'El Cercano Encuentro de 2029',
    color: '#FFEA00',
    btnImage: '/assets/asteroides/infographic_m5/btn_encuentro-2029.jpg',
    image: '/assets/asteroides/infographic_m5/hero_encuentro-2029.jpg',
    content: [
      'Aunque sabemos que Apophis no chocará contra la Tierra en 2029, su aproximación será uno de los eventos astronómicos más espectaculares e históricos presenciados por la humanidad. El viernes 13 de abril de 2029, Apophis pasará a solo 31,600 kilómetros de la superficie de nuestro planeta.',
      'Para dimensionar esta cercanía increíble: Apophis volará más cerca de la Tierra que los satélites geoestacionarios de televisión y meteorología que orbitan a 35,786 kilómetros de altura. Pasará diez veces más cerca de nosotros que la propia Luna.',
      'Durante el punto de máxima aproximación sobre el Océano Atlántico y Europa, Apophis será visible a simple vista sin necesidad de telescopios ni binoculares. Se verá como un punto de luz de tercera magnitud que cruzará el cielo nocturno rápidamente a 42,000 kilómetros por hora.',
      'Este encuentro histórico representa una oportunidad científica irrepetible. La intensa fuerza de gravedad de la Tierra tirará de Apophis de forma tan violenta durante su sobrevuelo que alterará drásticamente la velocidad de rotación de la roca y provocará derrumbes y terremotos en su superficie.',
      'Además, la gravedad terrestre cambiará la órbita de Apophis para siempre. Dejará de pertenecer al grupo de asteroides Atón y se transformará en un asteroide del grupo Apolo, aumentando su periodo orbital alrededor del Sol de 323 a 440 días.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Rocas de 300 metros como Apophis pasan tan cerca de la Tierra solo una vez cada 1,000 años. El evento de 2029 será la primera vez en la historia humana moderna en que se pueda ver un sobrevuelo tan cercano a simple vista.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La nave espacial OSIRIS-APEX de la NASA interceptará a Apophis justo después de su sobrevuelo de la Tierra en 2029. Se acoplará a su órbita durante 18 meses para filmar los cambios geológicos sufridos por las mareas terrestres.' }
    ],
    fact: 'Durante su punto máximo de acercamiento el 13 de abril de 2029, Apophis cruzará el cielo europeo de este a oeste en cuestión de pocas horas, desplazándose a un ancho equivalente al de la Luna llena cada minuto.',
  },
  {
    id: 'cerradura-gravitacional',
    title: 'La Cerradura Gravitacional',
    color: '#00E676',
    btnImage: '/assets/asteroides/infographic_m5/btn_cerradura-gravitacional.jpg',
    image: '/assets/asteroides/infographic_m5/hero_cerradura-gravitacional.jpg',
    content: [
      'Durante los primeros años tras el descubrimiento de Apophis, los astrónomos estaban preocupados por un concepto matemático de la mecánica celeste conocido como la Cerradura Gravitacional (Gravitational Keyhole).',
      'Una cerradura gravitacional es una región diminuta del espacio de apenas unos cientos de metros de ancho cerca de la Tierra. Si un asteroide pasa exactamente por el centro de ese pequeño corredor durante un encuentro cercano, la gravedad terrestre desvía su órbita con la precisión exacta para hacer que choque contra la Tierra en su siguiente retorno.',
      'En el caso de Apophis, los modelos iniciales calculaban que si el asteroide pasaba por una cerradura gravitacional de 800 metros de ancho en abril de 2029, la Tierra lo desviaría de tal forma que impactaría de lleno contra nuestro planeta siete años después, el 13 de abril de 2036.',
      'Determinar si un asteroide pasará o no por una cerradura requiere medir su posición espacial con una precisión absoluta de metros. Una incertidumbre minúscula en las observaciones astronómicas puede marcar la diferencia entre pasar por la cerradura o esquivarla por miles de kilómetros.',
      'Gracias a las mediciones con el telescopio radar de Goldstone en marzo de 2021, los científicos lograron afinar la trayectoria de Apophis con un margen de error menor a unos pocos metros, confirmando que esquivará la cerradura gravitacional de 2029 por una distancia muy segura.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El concepto de cerradura gravitacional fue descubierto por el astrónomo Andrea Milani. Demostró que los sobrevuelos cercanos actúan como lentes gravitacionales que amplifican las pequeñas incertidumbres orbitales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ventana espacial de la cerradura de Apophis para el impacto de 2036 medía solo 600 metros de diámetro. Encontrar un objeto tan pequeño a 30,000 km de distancia equivale a encestar un grano de arroz desde varios kilómetros.' }
    ],
    fact: 'Las observaciones de radar de 2021 permitieron eliminar formalmente a Apophis de la Lista de Riesgo de Impacto de la ESA y de la NASA durante más de un siglo entero.',
  },
  {
    id: 'efecto-yarkovsky',
    title: 'Efecto Yarkovsky en Apophis',
    color: '#00B0FF',
    btnImage: '/assets/asteroides/infographic_m5/btn_efecto-yarkovsky.jpg',
    image: '/assets/asteroides/infographic_m5/hero_efecto-yarkovsky.jpg',
    content: [
      'Al calcular la trayectoria futura de un asteroide peligroso a lo largo de décadas, la gravedad de los planetas y del Sol no es la única fuerza en juego. Existe un fenómeno térmico sutil pero acumulativo llamado Efecto Yarkovsky que puede alterar el destino de una roca espacial.',
      'El Efecto Yarkovsky ocurre cuando el asteroide gira sobre su eje mientras es calentado por la luz del Sol. El lado diurno se calienta y al rotar hacia el lado nocturno emite esa radiación en forma de calor infrarrojo. Esta emisión de calor genera una diminuta fuerza de empuje como el escape de un pequeño motor.',
      'Dependiendo de si el asteroide gira en el mismo sentido de su órbita (progrado) o en sentido contrario (retrógrado), el Efecto Yarkovsky acelera o frena a la roca de forma ininterrumpida. Esto hace que su órbita se expanda o se contraiga lentamente varios metros cada año.',
      'En el caso de Apophis, las observaciones ópticas de alta precisión mostraron que el Efecto Yarkovsky lo desplaza de su trayectoria puramente gravitacional unos 170 metros por año. Aunque parece una distancia pequeña, acumulada durante décadas es suficiente para modificar si el asteroide toca o no una cerradura gravitacional.',
      'Medir la aceleración Yarkovsky en Apophis requirió combinar observaciones telescópicas extremadamente precisas con modelos térmicos 3D de la forma del asteroide. Esto demostró que la física de la radiación térmica es crucial para la defensa planetaria del siglo XXI.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El ingeniero ruso Ivan Yarkovsky formuló esta teoría en el año 1900 en un folleto científico escrito en sus tiempos libres. Su trabajo permaneció olvidado hasta que Ernst Öpik lo rescató 50 años después.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fuerza de empuje fotónico del efecto Yarkovsky sobre Apophis es minúscula, equivalente al peso de una moneda de un centavo sobre la palma de una mano. Pero actuando durante 30 años desplaza al asteroide más de 5 kilómetros.' }
    ],
    fact: 'El asteroide Bennu sufre una deriva por Efecto Yarkovsky de casi 280 metros por año debido a su superficie oscura y alta porosidad térmica, siendo el asteroide donde mejor se ha medido esta fuerza.',
  },
  {
    id: 'tecnicas-defensa',
    title: 'Técnicas de Deflexión',
    color: '#D500F9',
    btnImage: '/assets/asteroides/infographic_m5/btn_tecnicas-defensa.jpg',
    image: '/assets/asteroides/infographic_m5/hero_tecnicas-defensa.jpg',
    content: [
      '¿Qué haríamos si los telescopios descubrieran un asteroide peligroso con rumbo de colisión seguro hacia la Tierra dentro de 20 años? La ciencia espacial ha desarrollado y simulado diversos métodos de Deflexión Planetaria para desviar a la roca antes de que sea demasiado tarde.',
      'El primer método es el Impactador Cinético, probado con éxito por la misión DART. Consiste en estrellar una nave pesada a máxima velocidad contra el asteroide para transferirle momento y cambiar levemente su velocidad. Es ideal para rocas pequeñas y medias descubiertas con décadas de anticipación.',
      'El segundo método es el Tractor Gravitacional. Consiste en enviar una nave masiva para colocarse a volar al lado del asteroide durante meses o años sin tocarlo. La diminuta atracción gravitatoria entre la nave y la roca actúa como un remolcador invisible que tira suavemente del asteroide desviando su rumbo.',
      'El tercer método es la Ablación Láser o Tren Solar. Involucra una flota de naves equipadas con potentes láseres solares que concentran su luz en un punto de la superficie del asteroide. El calor extremo vaporiza la roca creando chorros de gas que actúan como propulsores naturales para empujar al asteroide.',
      'Como último recurso ante asteroides gigantes de más de un kilómetro o con poco tiempo de aviso (menos de 5 años), se considera la Deflexión Nuclear Preventiva. Consiste en hacer detonar una cabeza nuclear en el espacio cerca de la superficie para que la radiación desprenda la capa externa y empuje a la roca por reacción.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las películas de Hollywood suelen mostrar bombas nucleares colocadas dentro del asteroide para volar la roca en pedazos. En la realidad científica esto es peligroso porque crearía miles de fragmentos radiactivos cayendo sobre la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La clave de la defensa planetaria no es la fuerza bruta, sino el tiempo. Desviar un asteroide 10 años antes del impacto requiere apenas un empuje de un milímetro por segundo en su velocidad orbital.' }
    ],
    fact: 'Un cambio de velocidad de apenas 1 centímetro por segundo en la trayectoria de un asteroide peligroso, aplicado 20 años antes de la colisión planeada, desplaza a la roca espacial más de 6,000 kilómetros al momento de cruzar la Tierra, evitando el impacto por completo.',
  },
  {
    id: 'redes-vigilancia',
    title: 'Redes de Vigilancia',
    color: '#1DE9B6',
    btnImage: '/assets/asteroides/infographic_m5/btn_redes-vigilancia.jpg',
    image: '/assets/asteroides/infographic_m5/hero_redes-vigilancia.jpg',
    content: [
      'Para desviar un asteroide peligroso, el requisito fundamental e indispensable es descubrirlo con la mayor antelación posible. Con este objetivo, la comunidad astronómica mundial ha construido una red de vigilancia cósmica permanente dedicada a rastrear el cielo nocturno.',
      'Los telescopios robóticos de rastreo automatizado como Pan-STARRS en Hawái y ATLAS (Sistema de Ultima Alerta de Impacto Terrestre) observan millones de estrellas cada noche. Utilizan algoritmos de inteligencia artificial para detectar cualquier punto de luz que cambie de posición entre varias tomas consecutivas.',
      'En Chile, el nuevo Observatorio Vera C. Rubin promete revolucionar la detección de Objetos Cercanos a la Tierra (NEOs). Con su cámara de 3,200 megapíxeles, cartografiará todo el cielo del hemisferio sur cada tres noches, catalogando miles de asteroides desconocidos.',
      'Además de los telescopios ópticos, las estaciones de radar astronómico como Goldstone en California envían potentes señales de microondas hacia los asteroides que pasan cerca de la Tierra. El eco de radar recibido permite reconstruir la forma en 3D, el tamaño y la velocidad del asteroide con precisión de metros.',
      'En el espacio, el telescopio espacial infrarrojo NEOWISE de la NASA ha detectado miles de rocas oscuras midiendo el calor que emiten. En los próximos años se lanzará el telescopio NEO Surveyor, diseñado específicamente para descubrir el 90% de los asteroides peligrosos mayores a 140 metros.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema ATLAS es capaz de dar una alerta de impacto con una semana de anticipación para un asteroide pequeño de 20 metros, y de tres semanas para un cuerpo medio de 100 metros.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La NASA tiene el mandato del Congreso de EE.UU. de descubrir y catalogar al menos el 90% de todos los Objetos Cercanos a la Tierra mayores a 140 metros de diámetro, considerados capaces de devastar una región continental.' }
    ],
    fact: 'Hasta la fecha se han descubierto y catalogado más de 34,000 Asteroides Cercanos a la Tierra (NEOs), de los cuales más de 2,300 están clasificados formalmente como Asteroides Potencialmente Peligrosos (PHAs).',
  },
  {
    id: 'protocolos-respuesta',
    title: 'Protocolos de Respuesta',
    color: '#FF3D00',
    btnImage: '/assets/asteroides/infographic_m5/btn_protocolos-respuesta.jpg',
    image: '/assets/asteroides/infographic_m5/hero_protocolos-respuesta.jpg',
    content: [
      '¿Qué ocurre cuando un observatorio astronómico descubre un asteroide con probabilidad real de chocar contra la Tierra? La respuesta no se deja a la improvisación; existen protocolos de coordinación internacional avalados por la Organización de las Naciones Unidas (ONU).',
      'La primera entidad en actuar es la Red Internacional de Alerta de Asteroides (IAWN). Esta red mundial de astrónomos verifique de inmediato las observaciones telescópicas, recalcula la órbita con múltiples centros de datos independientes y confirma si el riesgo de impacto es auténtico.',
      'Si se confirma que la probabilidad de impacto supera el 1% para un asteroide mayor a 50 metros, IAWN emite una alerta oficial a los gobiernos del mundo y a la Oficina de Asuntos del Espacio Exterior de la ONU (UNOOSA) para iniciar los preparativos de seguridad.',
      'En paralelo se activa el Grupo Asesor de Planificación de Misiones Espaciales (SMPAG). Este grupo está integrado por representantes de las principales agencias espaciales (NASA, ESA, JAXA, CNSA) para evaluar qué tecnología de deflexión es la más adecuada y coordinar el lanzamiento de la nave de intercepción.',
      'La defensa planetaria demuestra que, a diferencia de los dinosaurios que no tenían ciencia ni telescopios, la especie humana posee el conocimiento y la capacidad tecnológica para prevenir una extinción masiva y proteger la vida en la Tierra.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cada dos años, los expertos mundiales en defensa planetaria celebran la Conferencia de Defensa Planetaria, donde simulan un ejercicio ficticio de impacto de un asteroide desconocido para poner a prueba los protocolos de toma de decisiones de los gobiernos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Oficina de Coordinación de Defensa Planetaria (PDCO) de la NASA fue creada formalmente en 2016 para liderar la respuesta nacional de EE.UU. e interconectar a la agencias de emergencia como FEMA.' }
    ],
    fact: 'El asteroide 2024 BX1 fue descubierto apenas tres horas antes de chocar contra la atmósfera sobre Berlín, Alemania, en enero de 2024, permitiendo a los científicos avisar con precisión el área de caída para recuperar sus meteoritos.',
  },
];

export default function InteractiveInfographic_AsteroidesM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,10,15,0.92) 0%, rgba(20,10,30,0.88) 50%, rgba(12,10,25,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <AsteroidesM5Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF3D00, #FFEA00)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
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
                Selecciona uno de los módulos superiores para explorar la historia de Apophis y la defensa planetaria.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,61,0,0.4)' }}>
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

function CosmicDustField() {
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
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '255, 61, 0' : '255, 234, 0',
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
    return () => cancelAnimationFrame(draw);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function AsteroidesM5Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,61,0,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM5)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FF3D00','#FFEA00','#00E676','#00B0FF','#D500F9','#1DE9B6','#FF3D00'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FF3D00" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FF3D00" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FF3D00" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,61,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,61,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,61,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FF3D00" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">APOPHIS Y DEFENSA PLANETARIA</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,61,0,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">PROTEGIENDO LA TIERRA DE IMPACTOS</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,61,0,0.2)'}`,
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
          layoutId="activeDotAsteroidesM5"
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
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
                  {i === 0 ? 'SECCIÓN 1' : 'SECCIÓN 2'}
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
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
