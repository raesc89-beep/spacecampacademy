'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// ─── SVG Decorative Elements ─────────────────────────────────────────────────
function DecoPyramidBeam({ size = 80, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      <polygon points="40,4 70,72 10,72" fill="none" stroke={color} strokeWidth="2" />
      {/* Beam of light from apex */}
      <line x1="40" y1="4" x2="40" y2="-10" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="40" y1="4" x2="30" y2="-8" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="4" x2="50" y2="-8" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star at top */}
      <circle cx="40" cy="0" r="3" fill={color} opacity="0.5" />
      {/* Internal chamber */}
      <rect x="34" y="40" width="12" height="8" rx="1" fill={color} opacity="0.15" />
      <line x1="40" y1="48" x2="40" y2="72" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Shaft lines */}
      <line x1="37" y1="44" x2="20" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
      <line x1="43" y1="44" x2="60" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function DecoOrionBelt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" style={{ opacity: 0.2, ...style }}>
      {/* Three belt stars */}
      <circle cx="15" cy="30" r="4" fill={color} opacity="0.7" />
      <circle cx="35" cy="28" r="5" fill={color} opacity="0.8" />
      <circle cx="55" cy="32" r="4" fill={color} opacity="0.7" />
      {/* Belt line */}
      <line x1="15" y1="30" x2="55" y2="32" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Orion body outline */}
      <circle cx="35" cy="12" r="3" fill={color} opacity="0.4" />
      <line x1="35" y1="15" x2="35" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="18" x2="20" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="18" x2="50" y2="14" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="22" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="35" x2="48" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Glow halos */}
      {[{x:15,y:30},{x:35,y:28},{x:55,y:32}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="8" fill={color} opacity="0.08" />
      ))}
    </svg>
  );
}

function DecoCompass({ size = 60, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Cardinal points */}
      <text x="30" y="10" textAnchor="middle" fill={color} fontSize="8" fontWeight="bold" opacity="0.6">N</text>
      <text x="30" y="56" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">S</text>
      <text x="5" y="33" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">W</text>
      <text x="55" y="33" textAnchor="middle" fill={color} fontSize="7" opacity="0.4">E</text>
      {/* Needle */}
      <polygon points="30,12 27,30 30,28 33,30" fill={color} opacity="0.5" />
      <polygon points="30,48 27,30 30,32 33,30" fill={color} opacity="0.2" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarShaft({ size = 70, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 60 72" style={{ opacity: 0.2, ...style }}>
      {/* Shaft / corridor */}
      <rect x="24" y="8" width="12" height="56" rx="2" fill={color} opacity="0.1" stroke={color} strokeWidth="1" />
      {/* Star at top */}
      <circle cx="30" cy="4" r="4" fill={color} opacity="0.6" />
      <circle cx="30" cy="4" r="7" fill={color} opacity="0.15" />
      {/* Light rays going down */}
      <line x1="30" y1="8" x2="30" y2="64" stroke={color} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.3" />
      <line x1="27" y1="10" x2="27" y2="60" stroke={color} strokeWidth="0.3" opacity="0.15" />
      <line x1="33" y1="10" x2="33" y2="60" stroke={color} strokeWidth="0.3" opacity="0.15" />
      {/* Observer eye at bottom */}
      <ellipse cx="30" cy="66" rx="6" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="66" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoMuon({ size = 60, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Particle tracks */}
      <line x1="10" y1="5" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="8" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="30" x2="15" y2="55" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="30" x2="48" y2="50" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Interaction point */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Particle dots */}
      {[{x:10,y:5},{x:50,y:8},{x:15,y:55},{x:48,y:50}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} opacity="0.5" />
      ))}
    </svg>
  );
}

function DecoStoneBlocks({ size = 80, color = '#D4A843', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.18, ...style }}>
      {/* Stone block rows */}
      <rect x="2" y="36" width="24" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="28" y="36" width="20" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="50" y="36" width="28" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="5" y="25" width="22" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="29" y="25" width="26" height="10" rx="1" fill={color} opacity="0.3" stroke={color} strokeWidth="0.5" />
      <rect x="57" y="25" width="18" height="10" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      <rect x="14" y="14" width="20" height="10" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
      <rect x="36" y="14" width="18" height="10" rx="1" fill={color} opacity="0.25" stroke={color} strokeWidth="0.5" />
      <rect x="28" y="4" width="18" height="9" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

function DecoAnkh({ size = 60, color = '#F0A500', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#F0A500', style = {} }) {
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

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'conductos': [DecoPyramidBeam, DecoStarShaft, DecoOrionBelt],
  'estrellas-laser': [DecoStarShaft, DecoOrionBelt, DecoPyramidBeam],
  'precision': [DecoCompass, DecoPyramidBeam, DecoStarShaft],
  'orion-piramides': [DecoOrionBelt, DecoPyramidBeam, DecoCompass],
  'constructores': [DecoStoneBlocks, DecoAnkh, DecoCompass],
  'scan-pyramids': [DecoMuon, DecoPyramidBeam, DecoStarShaft],
  'temperatura': [DecoPyramidBeam, DecoStoneBlocks, DecoEye],
  'legado-giza': [DecoOrionBelt, DecoAnkh, DecoCompass],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Lehner, M. (1997). The Complete Pyramids, Thames & Hudson',
  'Bauval, R. & Gilbert, A. (1994). The Orion Mystery, Crown',
  'Morishima, K. et al. (2017). Discovery of a big void in Khufu\'s Pyramid by muon tomography, Nature, 552',
  'Dash, G. (2018). New angles on the Great Pyramid, AERA',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'conductos',
    title: 'Los Conductos Secretos',
    color: '#F0A500',
    btnImage: '/assets/egypt/infographic_giza/btn_conductos.png',
    image: '/assets/egypt/infographic_giza/hero_conductos.png',
    content: [
      'Imagina que estás dentro de la pirámide más grande del mundo, en una habitación de piedra oscura y silenciosa. Si levantas la vista, ves cuatro túneles estrechos que salen de las paredes y se pierden en la oscuridad. Durante más de cien años, todo el mundo pensó que eran simples "conductos de ventilación" para que entrara aire fresco. ¡Pero resulta que eran algo mucho más increíble!',
      'La Gran Pirámide de Guiza tiene cuatro de estos túneles angostos (de apenas 20 cm de ancho) que salen de la Cámara del Rey y de la Cámara de la Reina. Son como tubos largos que atraviesan decenas de metros de piedra maciza hasta llegar al exterior. Imagina un tubo de cartón largo y estrecho: si miras por un extremo, solo ves un pedacito de cielo. Eso es exactamente lo que hacen estos conductos.',
      'Cuando los astrónomos Kate Spence y Robert Bauval calcularon las posiciones de las estrellas en el año 2450 a.C. (¡cuando se construyó la pirámide!), descubrieron algo asombroso: ¡cada conducto apuntaba directamente a una estrella importante! No eran conductos de aire... ¡eran telescopios de piedra apuntando al cosmos!',
      'Los constructores de la pirámide diseñaron cada conducto con un ángulo preciso para que, desde la cámara interior, una persona pudiera ver exactamente una estrella específica a través del túnel. Es como cuando miras por el tubo de un telescopio y ves exactamente un puntito de luz: estos túneles hacían lo mismo, pero estaban hechos de millones de bloques de piedra.',
      'Los científicos modernos han verificado estas alineaciones usando software de simulación astronómica que puede "rebobinar" el cielo 4,500 años. Las posiciones coinciden con una precisión sorprendente. Estos conductos eran, literalmente, canales de comunicación cósmica entre el faraón en el interior de la pirámide y los dioses que vivían en las estrellas.',
    ],
    fact: 'Los conductos miden apenas 20 × 20 cm, el tamaño de una caja de zapatos. A pesar de ser tan pequeños, atraviesan más de 60 metros de piedra maciza con un ángulo constante. Si el ángulo variara solo 1 grado, ¡la estrella objetivo se perdería por completo! Los ingenieros egipcios mantuvieron la precisión metro tras metro durante toda la construcción.',
  },
  {
    id: 'estrellas-laser',
    title: 'El Láser Estelar',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_giza/btn_laser.png',
    image: '/assets/egypt/infographic_giza/hero_laser.png',
    content: [
      '¿Hacia qué estrellas apuntaban estos "láseres de piedra"? Cada conducto tenía un destino celestial diferente, y cada uno contaba una historia sobre la vida después de la muerte del faraón. Para los egipcios, morir no era el final: era el comienzo de un viaje a las estrellas.',
      'El conducto norte de la Cámara del Rey apuntaba hacia Thuban, que en el año 2450 a.C. era la Estrella Polar. Hoy esa posición la ocupa Polaris, pero hace 4,500 años, Thuban (en la constelación de Draco) era el punto fijo alrededor del cual giraba todo el cielo nocturno. Apuntar hacia ella significaba señalar el centro del universo.',
      'El conducto sur de la Cámara del Rey apuntaba hacia Alnitak (Zeta Orionis), la estrella más baja del Cinturón de Orión. Para los egipcios, Orión era la constelación sagrada de Osiris, el dios de la muerte y la resurrección. Este conducto era el camino por donde el alma del faraón viajaba para reunirse con Osiris en el cielo.',
      'El conducto sur de la Cámara de la Reina apuntaba directamente a Sirio, la estrella más brillante del cielo nocturno. Sirio era la estrella de la diosa Isis (esposa de Osiris), y su primera aparición cada año marcaba el comienzo de la inundación del Nilo y el Año Nuevo egipcio. ¡Una estrella que les avisaba de que el río iba a crecer!',
      'El conducto norte de la Cámara de la Reina apuntaba a Kochab, una estrella en la Osa Menor. La combinación de los cuatro conductos creaba un mapa cósmico completo: norte y sur, masculino y femenino, vida y muerte, Osiris e Isis. Era como tener cuatro flechas que apuntaban a los cuatro pilares del universo egipcio.',
    ],
    fact: 'Thuban fue la estrella polar durante más de 2,000 años. Debido a un fenómeno llamado "precesión", el eje de la Tierra se mueve como un trompo lento, completando un giro cada 26,000 años. Esto significa que diferentes estrellas "toman el turno" de ser la estrella polar. ¡En el año 14,000 d.C., será Vega la estrella polar!',
  },
  {
    id: 'precision',
    title: 'Precisión Imposible',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_giza/btn_precision.png',
    image: '/assets/egypt/infographic_giza/hero_precision.png',
    content: [
      'Aquí viene lo que deja a los científicos con la boca abierta: ¿cómo lograron semejante precisión sin computadoras, sin telescopios modernos y sin GPS? La respuesta es tan simple como genial: usaban dos estrellas y una cuerda con un peso.',
      'El método, reconstruido por la astrónoma Kate Spence de la Universidad de Cambridge, funcionaba así: los astrónomos egipcios observaban dos estrellas circumpolares específicas (Mizar y Kochab). En un momento preciso de cada noche, estas dos estrellas se alinean perfectamente en vertical. Cuando eso ocurría, ¡marcaban el Norte verdadero con error de solo 2 minutos de arco!',
      'Para que entiendas lo preciso que es: 2 minutos de arco es aproximadamente 1/15 del ancho de la Luna llena vista desde la Tierra. Los egipcios podían apuntar a una dirección del cielo con un error menor que una moneda vista desde 50 metros de distancia. Todo esto con un palo, una cuerda y sus propios ojos.',
      'El instrumento se llamaba "merkhet" (que significa "instrumento de conocimiento"). Era simplemente una plomada: una cuerda con un peso que cuelga perfectamente vertical por la gravedad. Alineando dos merkhets con una estrella, determinaban el meridiano exacto (la línea norte-sur). Otro instrumento, el "bay" (una palma de palmera con una ranura en V), servía para apuntar.',
      'La base de la Gran Pirámide mide 230.4 metros de lado, y la diferencia entre el lado más largo y el más corto es de solo 4.4 centímetros. Eso es un error de apenas 0.02%, menos que el grosor de tu dedo meñique. Para lograr esa precisión en un edificio de 147 metros de alto y 2.3 millones de bloques de piedra se necesita una maestría matemática que todavía asombra a los ingenieros modernos.',
    ],
    fact: 'Los cuatro lados de la Gran Pirámide están orientados casi perfectamente hacia los cuatro puntos cardinales, con un error de solo 3 minutos y 6 segundos de arco respecto al Norte verdadero. Cuando la pirámide se terminó de construir (ca. 2450 a.C.), ese error era probablemente de cero: la pequeña desviación se debe a la precesión terrestre acumulada durante 4,500 años.',
  },
  {
    id: 'orion-piramides',
    title: 'Orión en la Tierra',
    color: '#9B6BFF',
    btnImage: '/assets/egypt/infographic_giza/btn_orion.png',
    image: '/assets/egypt/infographic_giza/hero_orion.png',
    content: [
      'Si pudieras flotar sobre la meseta de Guiza y mirar hacia abajo, verías algo curioso: las tres pirámides no están en línea recta. Dos de ellas (Keops y Kefrén) están casi perfectamente alineadas, pero la tercera (Micerinos) está ligeramente desplazada hacia un lado. ¿Error de construcción? ¡Para nada!',
      'El ingeniero Robert Bauval propuso en 1994 la "Teoría de la Correlación de Orión": las tres pirámides de Guiza imitan la disposición de las tres estrellas del Cinturón de Orión (Alnitak, Alnilam y Mintaka). Dos estrellas del cinturón están alineadas, y la tercera está ligeramente desplazada, exactamente como las pirámides.',
      'La teoría dice que los egipcios construyeron una copia del cielo en la tierra. Orión representaba a Osiris, dios de la muerte y la resurrección, y la Vía Láctea representaba el Nilo celestial. Las pirámides serían "espejos" de las estrellas, conectando la tierra con el cielo para que el faraón pudiera ascender fácilmente al reino de los dioses.',
      'Esta teoría es debatida entre los científicos: algunos la apoyan con entusiasmo y otros señalan que la correlación no es perfecta si se analiza con detalle. Lo que sí es un hecho comprobado es que el conducto sur de la Cámara del Rey apunta directamente a Alnitak (la estrella inferior del Cinturón de Orión), lo cual confirma la importancia de Orión para los constructores.',
      'Ya sea que la correlación completa sea intencional o coincidencia, un hecho es innegable: los constructores de Guiza tenían un conocimiento astronómico profundo y lo integraron deliberadamente en la arquitectura de sus monumentos. Las pirámides no eran simples tumbas; eran máquinas cósmicas diseñadas para conectar la tierra con las estrellas.',
    ],
    fact: 'El nombre egipcio de Orión era "Sah", y era considerado la manifestación celestial de Osiris. Cada año, cuando Orión "resucitaba" (aparecía por primera vez después de 70 días de invisibilidad), los sacerdotes celebraban el renacimiento de Osiris. Los 70 días de invisibilidad de Orión corresponden casi exactamente con los 70 días del proceso de momificación. ¡No es coincidencia!',
  },
  {
    id: 'constructores',
    title: 'Los Constructores',
    color: '#FF7043',
    btnImage: '/assets/egypt/infographic_giza/btn_constructores.png',
    image: '/assets/egypt/infographic_giza/hero_constructores.png',
    content: [
      'Hay un mito que necesitamos destruir ahora mismo: ¡los constructores de las pirámides NO eran esclavos! Durante siglos se creyó la historia de que miles de esclavos fueron obligados a arrastrar piedras bajo el sol ardiente. Pero la evidencia arqueológica moderna cuenta una historia completamente diferente.',
      'Los papiros y las marcas en los bloques de piedra revelan que los constructores eran obreros asalariados, organizados en equipos con nombres geniales como "Los Amigos de Keops" o "Los Borrachos de Micerinos" (¡sí, de verdad se llamaban así!). Trabajaban por turnos, tenían días de descanso, buena alimentación y hasta seguro médico.',
      'Los esqueletos encontrados en el cementerio de los trabajadores cerca de las pirámides muestran huesos que se rompieron y sanaron correctamente gracias a cirugía. Los doctores egipcios les ponían férulas y los cuidaban hasta que se recuperaban. Un esclavo no recibiría esa atención. Estos trabajadores eran valorados y respetados.',
      'El arquitecto jefe fue muy probablemente Hemiunu, sobrino del faraón Keops. Su estatua, descubierta en Guiza, lo muestra como un hombre corpulento y seguro de sí mismo. Coordinaba miles de trabajadores, decenas de ingenieros y el suministro de materiales durante décadas. Era el equivalente antiguo al director de la NASA.',
      'El papiro de Wadi el-Jarf, descubierto en 2013, es el diario real de un supervisor llamado Merer que dirigía un equipo de transportistas. Describe en detalle cómo transportaban los enormes bloques de granito desde Asuán (¡a 800 km de distancia!) usando barcazas en el Nilo capaces de cargar 60 toneladas. Es el "registro de vuelo" más antiguo del mundo.',
    ],
    fact: 'La Gran Pirámide tiene 2.3 millones de bloques de piedra caliza, con un peso promedio de 2.5 toneladas cada uno. Si los apilases uno encima de otro, llegarían a una altura de 4,600 km, ¡más de la mitad de la distancia a la Luna! Los bloques de granito de las cámaras internas pesan hasta 80 toneladas y fueron transportados desde canteras a 800 km de distancia.',
  },
  {
    id: 'scan-pyramids',
    title: 'Muones Cósmicos',
    color: '#4FC3F7',
    btnImage: '/assets/egypt/infographic_giza/btn_muones.png',
    image: '/assets/egypt/infographic_giza/hero_muones.png',
    content: [
      'En 2015, un equipo internacional de científicos empezó a "radiografiar" las pirámides de Guiza usando una tecnología que parece ciencia ficción: ¡partículas subatómicas que llueven desde el espacio! El proyecto se llamó ScanPyramids, y usó los muones cósmicos para ver dentro de la pirámide sin tocar una sola piedra.',
      'Los muones son partículas que se crean cuando los rayos cósmicos (partículas de alta energía que viajan por el universo) chocan contra la atmósfera terrestre. Estos muones atraviesan casi todo: edificios, montañas, pirámides... Pero cuando encuentran piedra densa, algunos se frenan y desaparecen. Si hay una cavidad vacía, más muones la atraviesan.',
      'Es como hacer una radiografía gigante: así como los rayos X atraviesan tu cuerpo pero se detienen en los huesos (por eso ves los huesos blancos en la imagen), los muones atraviesan la pirámide pero se frenan en la piedra. Si un detector dentro de la pirámide recibe más muones de lo esperado en cierta dirección, ¡significa que hay un espacio vacío por ahí!',
      'En 2017, los científicos anunciaron un descubrimiento sensacional: una cavidad oculta de al menos 30 metros de largo encima de la Gran Galería. Nadie sabía que existía esta "habitación secreta". Es tan grande como un avión de pasajeros y ha estado oculta durante 4,500 años. Todavía no sabemos qué hay dentro ni para qué servía.',
      'Además de los muones, ScanPyramids usó termografía infrarroja (que detecta diferencias de temperatura en la superficie) y fotogrametría 3D. La termografía reveló que hay zonas en la cara norte de la pirámide que están más calientes que las demás, lo que sugiere que hay cámaras o corredores detrás de la piedra que aún no hemos encontrado. ¡La pirámide sigue guardando secretos!',
    ],
    fact: 'Cada minuto, unos 10,000 muones atraviesan cada metro cuadrado de tu cuerpo. ¡Ahora mismo, mientras lees esto, millones de muones están pasando a través de ti! Son completamente inofensivos. Los científicos de ScanPyramids colocaron detectores especiales dentro de la pirámide durante meses para contar los muones y crear un "mapa de vacíos" del interior.',
  },
  {
    id: 'temperatura',
    title: 'La Pirámide Termo',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_giza/btn_temperatura.png',
    image: '/assets/egypt/infographic_giza/hero_temperatura.png',
    content: [
      '¿Sabías que la Gran Pirámide es como un termo gigante? La temperatura en su interior se mantiene constante a 20°C durante todo el año, sin importar si afuera hace 40°C de calor en verano o baja a 5°C en las noches de invierno. ¡Es como tener aire acondicionado natural desde hace 4,500 años!',
      'Esto funciona por el mismo principio que mantiene las cuevas frescas en verano y tibias en invierno: la enorme masa de piedra actúa como un "amortiguador térmico". Los 6.5 millones de toneladas de piedra caliza absorben el calor del día muy lentamente y lo liberan por la noche. Para cuando el calor del exterior llega al centro, la noche ya enfrió la superficie y el ciclo se repite.',
      'Los egipcios probablemente conocían y aprovechaban esta propiedad térmica. La temperatura estable de 20°C es perfecta para preservar objetos: ni tan caliente como para secar y agrietar los materiales, ni tan fría como para generar humedad. Los papiros, las telas de lino y los alimentos sagrados depositados con el faraón se conservarían en condiciones ideales.',
      'Pero hay algo más misterioso: la termografía infrarroja de ScanPyramids encontró anomalías térmicas en la base de la pirámide y en su cara norte. Algunos bloques de piedra están más calientes que otros, lo que sugiere que detrás hay espacios vacíos o corredores ocultos por donde circula aire a diferente temperatura. Es como detectar una habitación secreta mirando la temperatura de las paredes.',
      'La posición geográfica de la pirámide también es notable. Está en el vértice exacto del delta del Nilo, donde el río se divide en sus múltiples brazos hacia el mar. Desde el espacio, esta posición parece perfecta, como si los arquitectos hubieran tenido una vista aérea de todo Egipto. Los científicos debaten si esto fue calculado o es una coincidencia extraordinaria.',
    ],
    fact: 'Si pudieras poner toda la piedra de la Gran Pirámide en fila, harías un muro de 1 metro de alto que le daría la vuelta a toda Francia. La base de la pirámide cubre un área de 5.3 hectáreas, ¡suficiente para estacionar 2,000 autobuses escolares! Y pesa 6.5 millones de toneladas, más que todos los edificios del centro de Londres juntos.',
  },
  {
    id: 'legado-giza',
    title: 'El Legado Eterno',
    color: '#AB47BC',
    btnImage: '/assets/egypt/infographic_giza/btn_legado.png',
    image: '/assets/egypt/infographic_giza/hero_legado.png',
    content: [
      'La Gran Pirámide fue el edificio más alto del mundo durante 3,871 años, desde que se terminó en el 2450 a.C. hasta que la catedral de Lincoln, en Inglaterra, la superó en 1311 d.C. ¡Ninguna otra estructura humana ha mantenido un récord durante tanto tiempo! Y todavía sigue siendo el edificio antiguo más grande del mundo.',
      'El legado de las alineaciones astronómicas de Guiza viajó por todo el mundo antiguo. Los comerciantes fenicios llevaron conocimientos egipcios al Mediterráneo. Los griegos como Tales, Pitágoras y Platón estudiaron en las escuelas sacerdotales de Egipto. Y cuando Alejandro Magno fundó Alejandría, la fusión de pensamiento egipcio, griego y babilónico creó la astronomía científica.',
      'Las catedrales góticas de la Europa medieval heredaron la tradición egipcia sin saberlo. Sus naves largas actúan como los corredores egipcios, dirigiendo la luz del sol hacia el altar en fechas específicas. Sus rosetones (ventanas circulares) están orientados astronómicamente. Los constructores medievales continuaron una tradición que comenzó en Guiza hace 4,500 años.',
      'Hoy, la Gran Pirámide es Patrimonio de la Humanidad y la última de las Siete Maravillas del Mundo Antiguo que sigue en pie. Las otras seis (los Jardines de Babilonia, el Coloso de Rodas, el Faro de Alejandría, el Templo de Artemisa, la Estatua de Zeus y el Mausoleo de Halicarnaso) desaparecieron hace siglos. Solo la pirámide resistió al tiempo.',
      'El gran mensaje de Guiza es que la ciencia y el arte siempre han estado unidos. Los egipcios no separaban la ingeniería de la religión, ni la matemática de la poesía. Todo era parte de un solo esfuerzo por entender y celebrar el universo. Cuando miramos esas alineaciones estelares perfectas, no vemos solo técnica: vemos el amor de una civilización por las estrellas.',
    ],
    fact: 'De las Siete Maravillas del Mundo Antiguo, la Gran Pirámide es la más antigua (construida ca. 2560 a.C.) y la única que sigue existiendo. El Faro de Alejandría, la segunda maravilla más duradera, se derrumbó por terremotos en el siglo XIV. La pirámide ha sobrevivido 4,500 años de terremotos, invasiones, tormentas de arena y erosión. A este ritmo, seguirá ahí cuando nuestros tátara-tátara-tataranietos la visiten.',
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
    const stars = Array.from({ length: 90 }, () => ({
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
        ctx.fillStyle = `rgba(240, 165, 0, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Giza Header SVG ────────────────────────────────────────────────────────
function GizaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(240,165,0,0.3))' }}>
        {/* Three pyramid silhouettes */}
        <polygon points="200,100 260,35 320,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2" opacity="0.5" />
        <polygon points="260,100 330,20 400,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2.5" />
        <polygon points="340,100 380,50 420,100" fill="none" stroke="url(#gizaGrad)" strokeWidth="2" opacity="0.5" />
        {/* Laser beams from pyramid tops */}
        {[{x:260,y:35},{x:330,y:20},{x:380,y:50}].map((p,i) => (
          <g key={i}>
            <motion.line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 15}
              stroke="#F0A500" strokeWidth="1.5" strokeLinecap="round"
              animate={{ opacity: [0.2, 0.8, 0.2], y2: [p.y - 12, p.y - 18, p.y - 12] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle cx={p.x} cy={p.y - 16} r="2.5" fill="#FFD700"
              animate={{ opacity: [0.3, 1, 0.3], r: [2, 3, 2] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}
            />
          </g>
        ))}
        {/* Orion belt stars above */}
        {[{x:270,y:6},{x:330,y:4},{x:390,y:8}].map((s,i) => (
          <motion.circle key={`star${i}`} cx={s.x} cy={s.y} r="3" fill="#F0A500"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #F0A500)' }}
          />
        ))}
        {/* Connection lines: stars to pyramids */}
        <line x1="270" y1="6" x2="260" y2="35" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="330" y1="4" x2="330" y2="20" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="390" y1="8" x2="380" y2="50" stroke="rgba(240,165,0,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <defs>
          <linearGradient id="gizaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(240,165,0,0.2)" />
            <stop offset="50%" stopColor="rgba(240,165,0,0.9)" />
            <stop offset="100%" stopColor="rgba(240,165,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#F0A500" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LÁSER DE GIZA</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(240,165,0,0.6)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">LA GRAN PIRÁMIDE · CIRCA 2450 A.C.</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(240,165,0,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.3s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }} />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: '-4px', borderRadius: '50%',
              border: `2px solid ${node.color}`, pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotM5"
          style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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
        background: 'rgba(15, 12, 5, 0.92)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
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

      {/* Two-Column Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>
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
              borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0,
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

      {/* Magazine Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem',
          position: 'relative', zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
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

        {/* Fact Box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px',
            padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'flex-start',
            gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
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
                color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7,
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
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(240,165,0,0.15)',
    }}>
      <Star size={14} style={{ color: '#F0A500', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4880A, #F0A500)', borderRadius: '3px', boxShadow: '0 0 8px rgba(240,165,0,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F0A500', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_EgyptM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,15,5,0.88) 0%, rgba(35,25,10,0.82) 40%, rgba(20,15,5,0.90) 100%), url(/assets/egypt/infographic_giza/bg_giza.png)',
      backgroundSize: 'cover', backgroundPosition: 'center center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(240,165,0,0.12)',
      boxShadow: '0 0 60px rgba(15,10,0,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />
      <GizaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(240,165,0,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2,
        marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(240,165,0,0.08)', borderRadius: '16px',
              border: '1px solid rgba(240,165,0,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#F0A500', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔺 ¡Has descubierto todos los secretos del Láser de Giza!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Constructor Estelar
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}