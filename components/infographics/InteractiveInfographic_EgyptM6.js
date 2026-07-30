'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#9B6BFF', style = {} }) {
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

function DecoCelestialMap({ size = 80, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.22, ...style }}>
      {/* Outer ring - celestial dome */}
      <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="40" cy="40" r="28" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Dividing line - north/south */}
      <line x1="6" y1="40" x2="74" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Constellation dots */}
      {[{x:25,y:20},{x:35,y:15},{x:45,y:18},{x:55,y:22},{x:30,y:28},{x:50,y:30}].map((p,i) => (
        <circle key={`n${i}`} cx={p.x} cy={p.y} r="2" fill={color} opacity="0.6" />
      ))}
      {/* Constellation lines */}
      <polyline points="25,20 35,15 45,18 55,22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <polyline points="30,28 35,15" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Planet boats in south */}
      {[20, 35, 50, 62].map((x, i) => (
        <g key={`p${i}`}>
          <path d={`M${x-5},55 Q${x},50 ${x+5},55`} fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <circle cx={x} cy={52} r="1.5" fill={color} opacity="0.5" />
        </g>
      ))}
      {/* Decan markers in south */}
      {[15, 25, 35, 45, 55, 65].map((x, i) => (
        <rect key={`d${i}`} x={x-1} y={64} width="2" height="5" rx="0.5" fill={color} opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoSolarBoat({ size = 80, color = '#FFB347', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Boat hull */}
      <path d="M10 30 Q15 18 40 16 Q65 18 70 30 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Curved prow */}
      <path d="M10 30 Q5 25 8 18 Q10 14 14 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Curved stern */}
      <path d="M70 30 Q75 25 72 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sun disk on the boat */}
      <circle cx="40" cy="10" r="7" fill={color} opacity="0.4" />
      <circle cx="40" cy="10" r="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 40 + 11 * Math.cos(rad);
        const y1 = 10 + 11 * Math.sin(rad);
        const x2 = 40 + 14 * Math.cos(rad);
        const y2 = 10 + 14 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoHieroglyphColumn({ size = 40, color = '#9B6BFF', style = {} }) {
  return (
    <svg width={size} height={size * 3} viewBox="0 0 30 90" style={{ opacity: 0.15, ...style }}>
      {/* Cartouche border */}
      <rect x="4" y="2" width="22" height="86" rx="11" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Abstract glyphs */}
      <circle cx="15" cy="14" r="5" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="15" cy="14" r="2" fill={color} opacity="0.4" />
      <path d="M10 28 L20 28 L15 22 Z" fill={color} opacity="0.3" />
      <line x1="10" y1="36" x2="20" y2="36" stroke={color} strokeWidth="1" />
      <path d="M10 44 Q15 38 20 44 Q15 50 10 44Z" fill="none" stroke={color} strokeWidth="1" />
      <rect x="10" y="56" width="10" height="6" rx="1" fill={color} opacity="0.3" />
      <path d="M12 68 L18 68 L18 76 L12 76 Z" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="15" cy="72" r="2" fill={color} opacity="0.3" />
      <line x1="10" y1="82" x2="20" y2="82" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'senenmut': [DecoCelestialMap, DecoAnkh, DecoPyramid],
  'techo-astronomico': [DecoCelestialMap, DecoStarCluster, DecoSolarBoat],
  'planetas-barcas': [DecoSolarBoat, DecoCelestialMap, DecoStarCluster],
  'constelaciones': [DecoStarCluster, DecoEye, DecoCelestialMap],
  'decanos': [DecoStarCluster, DecoScarab, DecoAnkh],
  'hatshepsut': [DecoAnkh, DecoPyramid, DecoHieroglyphColumn],
  'ciencia-moderna': [DecoCelestialMap, DecoEye, DecoStarCluster],
  'legado-cosmos': [DecoStarCluster, DecoAnkh, DecoCelestialMap],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Lull, J. & Belmonte, J.A. (2006). A firmament above Thebes, Journal for the History of Astronomy, 37',
  'Dorman, P.F. (1988). The Monuments of Senenmut, Kegan Paul',
  'Neugebauer, O. & Parker, R. (1969). Egyptian Astronomical Texts, Brown University Press',
  'Clagett, M. (1995). Ancient Egyptian Science, Vol. 2: Calendars, Clocks, and Astronomy',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'senenmut',
    title: 'Senenmut: El Genio',
    color: '#9B6BFF',
    btnImage: '/assets/egypt/infographic_senenmut/btn_senenmut.png',
    image: '/assets/egypt/infographic_senenmut/hero_senenmut.png',
    content: [
      'Imagina que eres el hombre mÃ¡s inteligente de todo Egipto, el favorito de la reina mÃ¡s poderosa de la historia. Ese hombre se llamaba Senenmut, y viviÃ³ hace unos 3,500 aÃ±os, durante la dinastÃ­a XVIII. No era faraÃ³n, ni prÃ­ncipe, ni guerrero... era algo mucho mÃ¡s interesante: Â¡un arquitecto-cientÃ­fico que sabÃ­a de todo!',
      'Senenmut era el arquitecto personal de Hatshepsut, la Ãºnica mujer que gobernÃ³ Egipto como faraÃ³n con poder completo. Ã‰l diseÃ±Ã³ su obra maestra: el templo de Deir el-Bahari, un edificio tan hermoso que hoy sigue siendo considerado una de las maravillas de la arquitectura antigua. Pero su tumba escondÃ­a un secreto aÃºn mÃ¡s impresionante que el templo.',
      'En las inscripciones de su tumba, Senenmut se describe como "maestro de todas las ciencias y artes conocidas". En el Antiguo Egipto no existÃ­a la separaciÃ³n entre disciplinas que tenemos hoy. El mismo hombre que diseÃ±aba templos tambiÃ©n calculaba posiciones de estrellas, supervisaba el tejido de telas de lino, coordinaba expediciones comerciales y escribÃ­a poesÃ­a. Era como mezclar a un ingeniero, un astrÃ³nomo, un artista y un empresario en una sola persona.',
      'Su relaciÃ³n con Hatshepsut es uno de los grandes misterios de la historia. Algunos historiadores creen que eran pareja; otros piensan que era una relaciÃ³n estrictamente profesional. Lo cierto es que Hatshepsut le dio un privilegio que ningÃºn otro no-real habÃ­a recibido en toda la historia egipcia: Â¡el permiso de tener su tumba en el Valle de los Reyes, un lugar reservado exclusivamente para faraones!',
      'Su tumba secreta fue descubierta en 1925 por el arqueÃ³logo Herbert Winlock del Museo Metropolitano de Nueva York. Estaba esculpida en la roca viva de la colina de Deir el-Bahari, escondida detrÃ¡s de la tumba principal que Senenmut nunca llegÃ³ a usar. Cuando los arqueÃ³logos entraron por primera vez y alumbraron el techo con sus linternas, descubrieron algo que los dejÃ³ sin palabras.',
    ],
    fact: 'Senenmut tenÃ­a mÃ¡s de 80 tÃ­tulos oficiales, mÃ¡s que cualquier otro funcionario en la historia de Egipto. Entre ellos: "Supervisor de los graneros de AmÃ³n", "Jefe de los trabajos del rey", "Tutor de la princesa Neferura" y "GuardiÃ¡n de los sellos reales". Â¡Era bÃ¡sicamente el hombre que hacÃ­a funcionar todo el paÃ­s!',
  },
  {
    id: 'techo-astronomico',
    title: 'El Techo del Cielo',
    color: '#4A90D9',
    btnImage: '/assets/egypt/infographic_senenmut/btn_techo.png',
    image: '/assets/egypt/infographic_senenmut/hero_techo.png',
    content: [
      'Â¿QuÃ© pasarÃ­a si pudieras tomar una foto del cielo entero por la noche y pegarla en el techo de tu habitaciÃ³n? Eso es exactamente lo que hizo Senenmut hace 3,500 aÃ±os, pero en vez de usar una cÃ¡mara, usÃ³ a los mejores artistas de Egipto y pigmentos minerales que todavÃ­a brillan hoy.',
      'El techo astronÃ³mico de su tumba es el primer mapa celeste completo que conocemos. Tiene dos mitades perfectamente diferenciadas: la mitad norte muestra las constelaciones circumpolares (las que nunca se ponen, como la Osa Mayor), y la mitad sur muestra los 36 grupos de estrellas llamados "Decanos" que los egipcios usaban como reloj nocturno.',
      'Los artistas usaron pigmentos minerales de altÃ­sima calidad: lapislÃ¡zuli molido para el azul profundo del cielo nocturno, ocre para el amarillo dorado de las estrellas, y carbÃ³n vegetal para el negro del espacio. Estos colores son tan estables quÃ­micamente que, despuÃ©s de 3,500 aÃ±os en la oscuridad total de la tumba, Â¡todavÃ­a brillan como si los hubieran pintado ayer!',
      'Lo que hace Ãºnico a este techo es que combina AMBAS zonas del cielo en una sola imagen. Antes de Senenmut, los egipcios representaban el cielo norte o el cielo sur por separado. Ã‰l fue el primero en juntar todo en un solo mapa, creando lo que podemos considerar el primer "atlas celeste" de la historia.',
      'La orientaciÃ³n de la tumba tambiÃ©n tiene significado astronÃ³mico. La entrada estÃ¡ colocada de tal forma que, en ciertos dÃ­as del aÃ±o, la luz del Sol penetra hasta las pinturas del techo, iluminando momentÃ¡neamente el mapa celeste. Es como si Senenmut hubiera diseÃ±ado un efecto especial donde el Sol real "visitara" su cielo pintado.',
    ],
    fact: 'Hoy, equipos cientÃ­ficos documentan el techo de Senenmut con fotogrametrÃ­a de alta resoluciÃ³n, escaneo lÃ¡ser 3D y anÃ¡lisis multiespectral. Han descubierto capas de pigmento invisibles a simple vista que revelan correcciones y cambios que los artistas hicieron durante la creaciÃ³n del mapa. Â¡Hasta los antiguos egipcios borraban y volvÃ­an a dibujar!',
  },
  {
    id: 'planetas-barcas',
    title: 'Planetas en Barcas',
    color: '#FFB347',
    btnImage: '/assets/egypt/infographic_senenmut/btn_planetas.png',
    image: '/assets/egypt/infographic_senenmut/hero_planetas.png',
    content: [
      'Si miras el cielo por la noche, verÃ¡s miles de estrellas que parecen moverse todas juntas, como si estuvieran pegadas a una gran bola que gira lentamente. Pero hay cinco "estrellas" que hacen trampas: se mueven por su cuenta, van mÃ¡s rÃ¡pido o mÃ¡s lento, Â¡e incluso a veces parecen ir hacia atrÃ¡s! Esas son los planetas, y los egipcios los descubrieron hace miles de aÃ±os.',
      'El mapa de Senenmut incluye los cinco planetas visibles a simple vista: Mercurio, Venus, Marte, JÃºpiter y Saturno. Pero no los dibujÃ³ como puntos de luz: los representÃ³ como barcas divinas navegando por el cielo. Para los egipcios, si algo se movÃ­a de forma diferente al resto, era porque tenÃ­a "voluntad propia", Â¡como un barco con su propio capitÃ¡n!',
      'Cada planeta-barca tenÃ­a su propia identidad divina. Los egipcios llamaban a JÃºpiter "Hor-tash-tawy" (Horus que ilumina las dos tierras) y a Saturno "Hor-ka-pet" (Horus toro del cielo). Venus era "la estrella de la maÃ±ana" o "la estrella de la tarde" dependiendo de cuÃ¡ndo aparecÃ­a. Marte, con su brillo rojizo, estaba asociado con Horus el Rojo.',
      'Los cientÃ­ficos modernos han verificado con software de simulaciÃ³n astronÃ³mica que las posiciones de los planetas en el mapa de Senenmut corresponden a alineaciones reales que ocurrieron en fechas especÃ­ficas durante los siglos XV y XVI a.C. Esto significa que el mapa no es pura fantasÃ­a religiosa: Â¡es una representaciÃ³n astronÃ³mica real de un cielo observable en una fecha concreta!',
      'Este es un dato increÃ­ble: el mapa de Senenmut es la primera representaciÃ³n conocida en la historia donde los planetas se muestran como objetos distintos de las estrellas fijas. Los egipcios entendieron, 2,000 aÃ±os antes que los griegos, que habÃ­a dos tipos de objetos en el cielo: los que estÃ¡n "fijos" y los que "viajan". La palabra griega "planetes" (errantes) vino despuÃ©s, pero la idea ya estaba aquÃ­.',
    ],
    fact: 'Venus puede ser tanto "estrella de la maÃ±ana" como "estrella de la tarde" porque su Ã³rbita estÃ¡ mÃ¡s cerca del Sol que la Tierra. Dependiendo de dÃ³nde estÃ© en su Ã³rbita, la vemos justo antes del amanecer o justo despuÃ©s del atardecer. Â¡Los egipcios tardaron siglos en darse cuenta de que eran el mismo objeto!',
  },
  {
    id: 'constelaciones',
    title: 'Monstruos del Cielo',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_senenmut/btn_constelaciones.png',
    image: '/assets/egypt/infographic_senenmut/hero_constelaciones.png',
    content: [
      'Â¿SabÃ­as que los egipcios veÃ­an animales completamente diferentes a nosotros cuando miraban las estrellas? Donde nosotros vemos la Osa Mayor (un oso o un carro), ellos veÃ­an a "Mesjetiu", Â¡la pata delantera de un toro! Y donde nosotros vemos a Draco (el dragÃ³n), ellos veÃ­an un cocodrilo y un hipopÃ³tamo cÃ³smicos.',
      'La mitad norte del techo de Senenmut muestra las constelaciones circumpolares, que son las que nunca se ponen: estÃ¡n tan cerca del Polo Norte celeste que dan vueltas alrededor de Ã©l toda la noche sin tocar el horizonte. Para los egipcios, estas constelaciones eran "inmortales" porque nunca "morÃ­an" (nunca desaparecÃ­an bajo el horizonte).',
      'La constelaciÃ³n mÃ¡s importante era Mesjetiu (nuestra Osa Mayor). Los egipcios la representaban como la pata delantera de un toro sagrado que habÃ­a sido cortada por Horus para evitar que Seth causara caos en el cielo. El HipopÃ³tamo celestial (la constelaciÃ³n que incluye nuestra Draco) era Taweret, la diosa protectora de los partos, que sujetaba la pata del toro con una cadena invisible de estrellas.',
      'El Cocodrilo celestial estaba asociado con Sobek, el dios del agua y la fertilidad. AparecÃ­a cerca del HipopÃ³tamo en las representaciones egipcias, y los sacerdotes-astrÃ³nomos enseÃ±aban que estos tres "monstruos del cielo" (Toro, HipopÃ³tamo y Cocodrilo) mantenÃ­an el orden del universo girando eternamente alrededor del punto central del cielo.',
      'Los nombres egipcios de las constelaciones nos enseÃ±an algo importante: cada cultura ve el cielo a travÃ©s de sus propios ojos. Un pastor griego veÃ­a osos y cazadores; un navegante polinesio veÃ­a canoas y anzuelos; un nÃ³mada egipcio veÃ­a los animales del Nilo. Las mismas estrellas, contando historias completamente diferentes. Â¡El cielo es el primer libro de la humanidad, y cada pueblo lo leyÃ³ en su propio idioma!',
    ],
    fact: 'La Osa Mayor (Mesjetiu para los egipcios) es tan importante astronÃ³micamente que aparece en las tapas de ataÃºdes egipcios, en techos de templos y en papiros funerarios. Era considerada la "brÃºjula del cielo" porque sus estrellas apuntan al Polo Norte celeste. Los constructores de las pirÃ¡mides la usaban para alinear sus monumentos con el norte verdadero.',
  },
  {
    id: 'decanos',
    title: 'El Reloj de Estrellas',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_senenmut/btn_decanos.png',
    image: '/assets/egypt/infographic_senenmut/hero_decanos.png',
    content: [
      'Antes de que existieran los relojes, Â¿cÃ³mo sabÃ­as quÃ© hora era por la noche? Los egipcios inventaron algo genial: dividieron el cielo en 36 grupos de estrellas llamados "Decanos" (del griego "dekanoi", porque cada uno gobernaba 10 dÃ­as del aÃ±o). Cada hora de la noche, un nuevo Decano aparecÃ­a por el horizonte este, como un reloj de estrellas.',
      'El sistema funcionaba asÃ­: los sacerdotes-astrÃ³nomos, llamados "Observadores de la Hora", se sentaban en los techos de los templos y miraban hacia el este. Cuando un grupo especÃ­fico de estrellas (un Decano) aparecÃ­a sobre el horizonte, marcaba el inicio de una nueva hora. La noche se dividÃ­a en 12 horas, cada una seÃ±alada por la apariciÃ³n de un Decano diferente.',
      'El techo de Senenmut muestra los 36 Decanos de forma clara y ordenada en la mitad sur del mapa. Cada Decano estÃ¡ representado por un sÃ­mbolo especÃ­fico que los astrÃ³nomos podÃ­an identificar rÃ¡pidamente. Combinados con las 12 horas del dÃ­a (medidas con relojes de sol), los Decanos creaban el dÃ­a de 24 horas que seguimos usando hoy.',
      'Este es un dato que casi nadie sabe: Â¡la razÃ³n por la que nuestro dÃ­a tiene 24 horas viene directamente de los Decanos egipcios! Los griegos adoptaron el sistema de 12 horas nocturnas + 12 horas diurnas de los egipcios, los romanos lo heredaron de los griegos, y nosotros lo heredamos de los romanos. Cada vez que miras un reloj, estÃ¡s usando un invento egipcio de hace 4,000 aÃ±os.',
      'Los Decanos tambiÃ©n servÃ­an para el calendario. Como cada Decano "reinaba" durante 10 dÃ­as (una "dÃ©cada" egipcia), 36 Decanos Ã— 10 dÃ­as = 360 dÃ­as. Los egipcios aÃ±adÃ­an 5 dÃ­as extra al final del aÃ±o (llamados "epagÃ³menos" o dÃ­as "sobre el aÃ±o") para completar los 365 dÃ­as del aÃ±o solar. Â¡Su calendario era tan preciso que solo se equivocaba un dÃ­a cada cuatro aÃ±os!',
    ],
    fact: 'La estrella Sirio (llamada "Sopdet" por los egipcios) era el Decano mÃ¡s importante de todos. Su primera apariciÃ³n en el horizonte despuÃ©s de 70 dÃ­as de invisibilidad (el "orto helÃ­aco") marcaba el inicio del aÃ±o nuevo egipcio y coincidÃ­a casi exactamente con el inicio de la inundaciÃ³n anual del Nilo. Â¡Una estrella les avisaba de que el rÃ­o iba a crecer!',
  },
  {
    id: 'hatshepsut',
    title: 'La Reina FaraÃ³n',
    color: '#E91E63',
    btnImage: '/assets/egypt/infographic_senenmut/btn_hatshepsut.png',
    image: '/assets/egypt/infographic_senenmut/hero_hatshepsut.png',
    content: [
      'Para entender la tumba de Senenmut, hay que conocer a la mujer que hizo posible todo: Hatshepsut, la reina que se convirtiÃ³ en faraÃ³n. En el Antiguo Egipto, las mujeres tenÃ­an mÃ¡s derechos que en casi cualquier otra civilizaciÃ³n antigua: podÃ­an heredar propiedades, divorciarse y hacer negocios. Pero gobernar como faraÃ³n... eso no se habÃ­a visto nunca.',
      'Hatshepsut no era una guerrera; era una lÃ­der estratÃ©gica. En vez de conquistar territorios con ejÃ©rcitos, expandiÃ³ el comercio. OrganizÃ³ la famosa expediciÃ³n al PaÃ­s de Punt (probablemente la actual Somalia o Eritrea), donde trajo Ã¡rboles de incienso, oro, marfil, pieles de leopardo y monos vivos. Fue una de las expediciones comerciales mÃ¡s ambiciosas de la antigÃ¼edad.',
      'Para legitimarse como faraÃ³n, Hatshepsut se hacÃ­a representar con barba postiza, el nemes (tocado real) y todos los sÃ­mbolos del poder faraÃ³nico. No era que quisiera "hacerse pasar por hombre": era que el cargo de faraÃ³n estaba tan asociado con esos sÃ­mbolos que necesitaba usarlos para que la gente la reconociera como gobernante legÃ­tima. Es como si un presidente moderno usara traje y corbata aunque no le gustaran.',
      'El templo de Deir el-Bahari, diseÃ±ado por Senenmut para Hatshepsut, es una obra maestra de tres terrazas escalonadas construidas contra el acantilado de la montaÃ±a. Sus proporciones matemÃ¡ticas usan la proporciÃ³n Ã¡urea (1.618...), el mismo nÃºmero que aparece en los pÃ©talos de las flores y en las espirales de los caracoles. Es uno de los edificios mÃ¡s elegantes jamÃ¡s construidos.',
      'DespuÃ©s de la muerte de Hatshepsut, su sucesor Tutmosis III ordenÃ³ borrar su nombre y sus imÃ¡genes de todos los monumentos. Pero la tumba secreta de Senenmut, oculta bajo la roca, escapÃ³ a la destrucciÃ³n. IrÃ³nicamente, el mapa celeste que Senenmut pintÃ³ para honrar a su reina sobreviviÃ³ intacto durante 3,500 aÃ±os, convirtiÃ©ndose en uno de los legados cientÃ­ficos mÃ¡s importantes de la era de Hatshepsut.',
    ],
    fact: 'Hatshepsut fue tan exitosa que Egipto viviÃ³ uno de sus periodos de mayor prosperidad durante su reinado de 22 aÃ±os. ConstruyÃ³ mÃ¡s monumentos que cualquier otro faraÃ³n anterior. Cuando Tutmosis III borrÃ³ su nombre, no fue por odio personal: fue porque necesitaba justificar su propia legitimidad como heredero directo de Tutmosis II, saltÃ¡ndose el reinado de Hatshepsut.',
  },
  {
    id: 'ciencia-moderna',
    title: 'Descifrando el Mapa',
    color: '#00BCD4',
    btnImage: '/assets/egypt/infographic_senenmut/btn_ciencia.png',
    image: '/assets/egypt/infographic_senenmut/hero_ciencia.png',
    content: [
      'Durante siglos, el mapa de Senenmut fue un enigma. Los cientÃ­ficos sabÃ­an que representaba el cielo, pero no podÃ­an descifrar todos los sÃ­mbolos. Â¿Ese cÃ­rculo era JÃºpiter o Saturno? Â¿Esa barca era Venus o Mercurio? Fue como tener un mapa del tesoro sin saber quÃ© significaban los sÃ­mbolos.',
      'El gran avance llegÃ³ cuando los astrÃ³nomos empezaron a usar software de simulaciÃ³n astronÃ³mica (como Stellarium o programas de la NASA) para "rebobinar" el cielo y ver exactamente cÃ³mo se veÃ­a desde Luxor hace 3,500 aÃ±os. Compararon las posiciones simuladas de los planetas con las posiciones en el mapa y descubrieron correspondencias sorprendentes.',
      'Los resultados sugieren que el mapa no es genÃ©rico o simbÃ³lico: representa una fecha real. Las posiciones relativas de los planetas en el mapa coinciden con alineaciones que ocurrieron en momentos especÃ­ficos del reinado de Hatshepsut. Es como si Senenmut hubiera "tomado una foto" del cielo de una noche particular y la hubiera pintado en su techo.',
      'El famoso Techo AstronÃ³mico de Seti I, pintado unos 200 aÃ±os despuÃ©s en el Valle de los Reyes, es claramente una versiÃ³n expandida y refinada del mapa de Senenmut. Esto demuestra que el conocimiento astronÃ³mico egipcio se transmitÃ­a de generaciÃ³n en generaciÃ³n, con cada nueva versiÃ³n mÃ¡s completa y precisa. Exactamente como funciona la ciencia hoy: cada generaciÃ³n mejora lo que heredÃ³.',
      'Hoy, la identificaciÃ³n precisa de todos los sÃ­mbolos del mapa sigue siendo un Ã¡rea activa de investigaciÃ³n. Cada pocos aÃ±os se publican nuevas interpretaciones en revistas cientÃ­ficas. Un sÃ­mbolo que muestra un hombre con una estrella sobre la cabeza podrÃ­a ser la representaciÃ³n mÃ¡s antigua del planeta JÃºpiter. Otro sÃ­mbolo podrÃ­a ser Venus en su fase de lucero matutino. El mapa de Senenmut sigue revelando secretos 3,500 aÃ±os despuÃ©s.',
    ],
    fact: 'El "orto helÃ­aco" de Sirio (cuando aparece por primera vez justo antes del amanecer despuÃ©s de 70 dÃ­as de invisibilidad) era la observaciÃ³n astronÃ³mica mÃ¡s importante del aÃ±o egipcio. Los cientÃ­ficos modernos han calculado que en la Ã©poca de Senenmut, este evento ocurrÃ­a alrededor del 17 de julio en nuestro calendario. Â¡Los sacerdotes esperaban ese dÃ­a como nosotros esperamos la Navidad!',
  },
  {
    id: 'legado-cosmos',
    title: 'El Legado CÃ³smico',
    color: '#AB47BC',
    btnImage: '/assets/egypt/infographic_senenmut/btn_legado.png',
    image: '/assets/egypt/infographic_senenmut/hero_legado.png',
    content: [
      'El mapa de Senenmut no se quedÃ³ solo en una tumba. Su influencia se extendiÃ³ como ondas en un lago. Los sacerdotes de las generaciones siguientes lo copiaron, lo mejoraron y lo expandieron en los techos de los templos y tumbas reales mÃ¡s importantes de Egipto. Es como una cadena de conocimiento que conecta el pasado con el presente.',
      'Los comerciantes fenicios llevaron conocimientos astronÃ³micos egipcios por todo el MediterrÃ¡neo. Los filÃ³sofos griegos como Tales de Mileto, PitÃ¡goras y PlatÃ³n viajaron a Egipto y estudiaron en las escuelas sacerdotales. Cuando Alejandro Magno fundÃ³ AlejandrÃ­a en 332 a.C., la fusiÃ³n del pensamiento egipcio, griego y babilÃ³nico creÃ³ la astronomÃ­a cientÃ­fica que Ptolomeo sistematizÃ³ en su "Almagesto".',
      'La idea de dividir la noche en 12 horas usando los Decanos viajÃ³ de Egipto a Grecia, de Grecia a Roma, y de Roma a todo el mundo occidental. El concepto de un calendario de 365 dÃ­as con ajustes periÃ³dicos tambiÃ©n es de origen egipcio. Julio CÃ©sar consultÃ³ al astrÃ³nomo egipcio SosÃ­genes para crear el calendario Juliano en el 46 a.C., que con ligeras modificaciones del papa Gregorio XIII se convirtiÃ³ en el calendario que usamos hoy.',
      'Piensa en esto: cada vez que miras un reloj de 24 horas, cada vez que consultas el calendario, cada vez que alguien dice "son las 3 de la maÃ±ana"... estÃ¡s usando inventos que tienen raÃ­ces en las noches estrelladas del Antiguo Egipto. Los sacerdotes que observaban los Decanos desde los techos de los templos no podÃ­an imaginar que su sistema de medir el tiempo seguirÃ­a usÃ¡ndose 4,000 aÃ±os despuÃ©s.',
      'El gran mensaje del mapa de Senenmut es que los humanos siempre hemos querido representar y entender el universo. Desde las pinturas en cuevas hasta los telescopios espaciales como el James Webb, pasando por los techos pintados de una tumba en Luxor, la curiosidad humana por el cosmos ha sido constante. Senenmut nos dejÃ³ un mensaje que sigue brillando: mira hacia arriba, aprende los patrones del cielo, y Ãºsalos para vivir mejor.',
    ],
    fact: 'El calendario egipcio de 365 dÃ­as fue tan preciso que los romanos lo adoptaron y lo usaron durante 1,600 aÃ±os. El "error" del calendario egipcio era de solo un dÃ­a cada 4 aÃ±os (porque el aÃ±o real tiene 365.25 dÃ­as). Julio CÃ©sar arreglÃ³ esto aÃ±adiendo un dÃ­a extra cada 4 aÃ±os: el aÃ±o bisiesto. Â¡Gracias, Senenmut, por darnos el 29 de febrero!',
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
        ctx.fillStyle = `rgba(155, 107, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Senenmut Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SenenmutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(155,107,255,0.3))' }}>
        {/* Celestial dome arch */}
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#senenmutGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Constellation dots along the arch */}
        {[80, 130, 185, 240, 300, 360, 415, 470, 520].map((cx, i) => {
          const cy = 10 + Math.abs(cx - 300) * 0.14 + 12;
          return (
            <g key={i}>
              <motion.circle cx={cx} cy={cy} r="3" fill="#9B6BFF"
                animate={{ opacity: [0.3, 1, 0.3], r: [2, 3.5, 2] }}
                transition={{ duration: 2 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                style={{ filter: 'drop-shadow(0 0 5px #9B6BFF)' }}
              />
              {/* Constellation lines between some dots */}
              {i > 0 && i % 2 === 0 && (
                <line
                  x1={[80, 130, 185, 240, 300, 360, 415, 470, 520][i-1]}
                  y1={10 + Math.abs([80, 130, 185, 240, 300, 360, 415, 470, 520][i-1] - 300) * 0.14 + 12}
                  x2={cx} y2={cy}
                  stroke="rgba(155,107,255,0.3)" strokeWidth="1"
                />
              )}
            </g>
          );
        })}
        {/* Center celestial disk */}
        <circle cx="300" cy="8" r="10" fill="rgba(155,107,255,0.5)" style={{ filter: 'drop-shadow(0 0 12px rgba(155,107,255,0.5))' }} />
        <circle cx="300" cy="8" r="14" fill="none" stroke="rgba(155,107,255,0.3)" strokeWidth="1" />
        <circle cx="300" cy="8" r="5" fill="rgba(155,107,255,0.8)" />
        <circle cx="30" cy="110" r="5" fill="rgba(155,107,255,0.4)" />
        <circle cx="570" cy="110" r="5" fill="rgba(155,107,255,0.4)" />
        <defs>
          <linearGradient id="senenmutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(155,107,255,0.2)" />
            <stop offset="50%" stopColor="rgba(155,107,255,0.9)" />
            <stop offset="100%" stopColor="rgba(155,107,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="70" textAnchor="middle" fill="#9B6BFF" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MAPA DEL UNIVERSO</text>
        <text x="300" y="90" textAnchor="middle" fill="rgba(155,107,255,0.6)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">LA TUMBA DE SENENMUT Â· CIRCA 1473 A.C.</text>
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(155,107,255,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.3s ease', transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}  loading="lazy" />
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
        <motion.div layoutId="activeDotM6"
          style={{ width: '6px', height: '6px', borderRadius: '50%',
            background: node.color, boxShadow: `0 0 8px ${node.color}` }}
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
        background: 'rgba(12, 12, 35, 0.9)', backdropFilter: 'blur(24px)',
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
                Dato CientÃ­fico
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(155,107,255,0.15)',
    }}>
      <Star size={14} style={{ color: '#9B6BFF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #7B4FD4, #9B6BFF)', borderRadius: '3px', boxShadow: '0 0 8px rgba(155,107,255,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9B6BFF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,36,0.85) 0%, rgba(30,18,50,0.80) 40%, rgba(18,14,36,0.88) 100%), url(/assets/egypt/infographic_senenmut/bg_senenmut.png)',
      backgroundSize: 'cover', backgroundPosition: 'center center',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(155,107,255,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />
      <SenenmutHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(155,107,255,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada cÃ­rculo para explorar <ChevronRight size={14} />
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
              background: 'rgba(155,107,255,0.08)', borderRadius: '16px',
              border: '1px solid rgba(155,107,255,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9B6BFF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ—ºï¸ Â¡Has descifrado todos los secretos del Mapa del Universo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de CartÃ³grafo Estelar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ BibliografÃ­a â”€â”€â”€ */}
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
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>â€¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}