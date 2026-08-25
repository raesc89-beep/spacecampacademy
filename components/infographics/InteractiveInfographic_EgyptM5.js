'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
  'conductos': [DecoPyramidBeam, DecoStarShaft, DecoOrionBelt],'estrellas-laser': [DecoStarShaft, DecoOrionBelt, DecoPyramidBeam],'precision': [DecoCompass, DecoPyramidBeam, DecoStarShaft],'orion-piramides': [DecoOrionBelt, DecoPyramidBeam, DecoCompass],'constructores': [DecoStoneBlocks, DecoAnkh, DecoCompass],
  'scan-pyramids': [DecoMuon, DecoPyramidBeam, DecoStarShaft],
  'temperatura': [DecoPyramidBeam, DecoStoneBlocks, DecoEye],
  'legado-giza': [DecoOrionBelt, DecoAnkh, DecoCompass],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Lehner, M. (1997). The Complete Pyramids, Thames & Hudson',
  'Bauval, R. & Gilbert, A. (1994). The Orion Mystery, Crown',
  'Morishima, K. Et al. (2017). Discovery of a big void in Khufu\'s Pyramid by muon tomography, Nature, 552',
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
      'Dentro de la Gran Pirámide de Keops existen cuatro túneles estrechos que conectan las dos cámaras interiores con el exterior de la pirámide. Durante mucho tiempo se los llamó "conductos de ventilación", pero esta interpretación fue cuestionada cuando los arqueólogos descubrieron que no llegan directamente a la superficie — terminan justo antes de la cara exterior de la pirámide, lo que hace improbable que su función principal fuera ventilar las cámaras.',
      'Estos túneles tienen apenas 20-25 cm de ancho y entre 60 y 80 metros de largo, atravesando decenas de metros de piedra maciza con un ángulo constante. El análisis astronómico publicado en la década de 1990 por los investigadores Robert Bauval y Kate Spence indicó que cada conducto apunta hacia una estrella específica del cielo tal como se veía aproximadamente en el 2500 a.C., corregida por la precesión axial de la Tierra.',
      'El conducto sur de la Cámara del Rey apunta hacia Alnitak, la estrella más oriental del Cinturón de Orión — constelación asociada al dios Osiris. El conducto norte de la misma cámara apunta hacia la estrella Thuban, que en el 2500 a.C. era la estrella polar — el punto fijo alrededor del cual giraba todo el cielo nocturno. Para los egipcios, las estrellas circumpolares eran las almas de los faraones fallecidos, que nunca mueren porque nunca se ponen.',
      'Los constructores diseñaron cada conducto con un ángulo preciso que requirió cálculos astronómicos y geométricos previos a la construcción. Durante el proceso de excavación de decenas de metros de piedra caliza y granito, los trabajadores tuvieron que mantener ese ángulo con una desviación mínima. Esta precisión habría sido difícil incluso con herramientas modernas, y fue lograda con cuerdas, plomadas y marcas en la roca.',
      'En 2002 y 2010, el robot explorador Upuaut II y posteriormente el robot Djedi exploraron los conductos de la Cámara de la Reina, que no llegaban directamente a la superficie. El robot encontró, al fondo de uno de los conductos, una pequeña puerta de caliza con aldabas de cobre y marcas pintadas en rojo. Esta puerta, aún sin abrir en su totalidad, sigue siendo uno de los mayores misterios no resueltos de la pirámide.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'La astrónoma Kate Spence de la Universidad de Cambridge usó los ángulos de los conductos de la pirámide para calcular la fecha de inicio de su construcción. Su método se basa en la precesión axial de la Tierra: el eje terrestre gira lentamente con un período de 25,772 años, lo que hace que las estrellas ocupen posiciones diferentes con el tiempo. Calculando qué estrellas habrían estado en los ángulos exactos de los conductos, Spence propuso en el año 2000 una fecha de inicio de construcción de aproximadamente el 2478 a.C., con un margen de error de solo 5 años.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'En 1993, el robot Upuaut II, diseñado por el ingeniero alemán Rudolf Gantenbrink, fue enviado a explorar el conducto sur de la Cámara de la Reina, que mide apenas 20 cm de ancho — demasiado estrecho para que una persona lo recorra. Después de recorrer 63 metros de túnel, el robot encontró una pequeña puerta de caliza con dos asas de cobre. Esta puerta permaneció sin abrir casi 10 años, hasta que en 2002 otro robot perforó un pequeño orificio y filmó lo que hay detrás: otra pequeña cámara y otra puerta. El misterio sigue sin resolverse.' }
    ],
    fact: 'Los conductos miden 20 × 20 cm y atraviesan más de 60 metros de piedra manteniendo un ángulo constante. Una desviación de 1 grado habría impedido apuntar a la estrella objetivo. Los ingenieros egipcios mantuvieron esta precisión durante la construcción.',
  },
  {
    id: 'estrellas-laser',
    title: 'El Láser Estelar',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_giza/btn_laser.png',
    image: '/assets/egypt/infographic_giza/hero_laser.png',
    content: [
      'Para los antiguos egipcios, el cielo nocturno no era solo un espectáculo visual — era el destino del alma del faraón fallecido. Su religión establecía que el ka (alma espiritual) del faraón viajaba después de la muerte hacia las estrellas. Los cuatro conductos de la Gran Pirámide, según la hipótesis de Robert Bauval, actuaban como "caminos del alma" apuntando cada uno hacia la estrella destino correspondiente a la divinidad protectora de esa cámara.',
      'El conducto norte de la Cámara del Rey apuntaba hacia Thuban (Alpha Draconis), que en el 2500 a.C. era la estrella polar — el centro inmóvil alrededor del cual giraba todo el firmamento nocturno. En la teología egipcia, las estrellas circumpolares que nunca se ponen sobre el horizonte eran las almas inmortales de los reyes fallecidos. El conducto norte era literalmente un camino hacia la inmortalidad estelar.',
      'El conducto sur de la Cámara del Rey apuntaba hacia Alnitak (Zeta Orionis), la estrella más oriental del Cinturón de Orión. En la religión del Antiguo Egipto, la constelación de Orión era conocida como "Sah", la manifestación celestial del dios Osiris, gobernante del inframundo y dios de la resurrección. El alma del faraón debía unirse con Osiris para renacer. El conducto sur apuntaba directamente hacia esa reunión cósmica.',
      'El conducto sur de la Cámara de la Reina apuntaba hacia Sirio (Alpha Canis Majoris), la estrella más brillante del cielo nocturno. Sirio era para los egipcios la manifestación de la diosa Isis, esposa de Osiris y madre de Horus. La reaparición anual de Sirio en el horizonte oriental, tras 70 días de invisibilidad, marcaba el inicio del año nuevo egipcio y coincidía con el comienzo de las inundaciones del Nilo. Este evento era el más importante del calendario religioso.',
      'El conducto norte de la Cámara de la Reina apuntaba hacia Kochab (Beta Ursae Minoris), estrella de la Osa Menor que en el 2500 a.C. era la segunda estrella más cercana al polo norte celestial, alternando con Thuban. Juntos, los cuatro conductos formaban un mapa cósmico completo de la cosmología funeraria egipcia: norte para la inmortalidad polar, sur para Osiris e Isis, el horizonte celestial hacia el que viajaba el alma del faraón.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'Thuban, la estrella hacia la que apunta el conducto norte de la Cámara del Rey, fue la estrella polar de la Tierra durante más de 2,000 años, aproximadamente entre el 3942 a.C. y el 1793 a.C. En la actualidad, la estrella polar es Polaris (Alpha Ursae Minoris). Este cambio se debe a la precesión axial de la Tierra: el eje terrestre gira lentamente con un período de unos 25,772 años, haciendo que el polo norte celeste apunte hacia diferentes estrellas a lo largo del tiempo. Dentro de aproximadamente 12,000 años, Vega será la estrella polar.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La reaparición de Sirio en el horizonte oriental tras 70 días de invisibilidad (el período en que está demasiado cerca del Sol para verse) era tan importante para los egipcios que organizaron todo su calendario lunar y civil en torno a este evento. La coincidencia entre la reaparición de Sirio y el inicio de las inundaciones del Nilo hizo que los egipcios creyeran que Sirio causaba las inundaciones. Este evento, llamado "helíaco de Sirio", sigue calculándose con precisión y ocurre aproximadamente el 19 de julio del calendario gregoriano, ajustado por la latitud de Giza.' }
    ],
    fact: 'Thuban fue la estrella polar durante más de 2,000 años. Debido al fenómeno de precesión, el eje de la Tierra gira lentamente. Esto causa que distintas estrellas ocupen la posición de estrella polar con el tiempo.',
  },
  {
    id: 'precision',
    title: 'Precisión Imposible',
    color: '#4CAF50',
    btnImage: '/assets/egypt/infographic_giza/btn_precision.png',
    image: '/assets/egypt/infographic_giza/hero_precision.png',
    content: [
      'Los egipcios lograron la precisión astronómica de las pirámides sin instrumentos modernos, usando métodos que los arqueólogos han reconstruido a partir de evidencia textual e iconográfica. El método más documentado para determinar el norte verdadero requería observar dos estrellas circumpolares — estrellas que nunca se ponen bajo el horizonte — y marcar su posición cuando estaban alineadas verticalmente sobre el horizonte sur.',
      'La astrónoma Kate Spence de la Universidad de Cambridge propuso en el año 2000 que los constructores usaron específicamente las estrellas Mizar (Eta Ursae Maioris) y Kochab (Beta Ursae Minoris). Estas dos estrellas, pertenecientes a la Osa Mayor y la Osa Menor respectivamente, estaban alineadas verticalmente y cruzaban el meridiano (la línea norte-sur ideal) en ciertos momentos de la noche alrededor del 2500 a.C. Este método proporcionaba un error de solo 2 minutos de arco en la orientación norte-sur.',
      'Dos minutos de arco equivalen a aproximadamente una quinceava parte del diámetro angular de la Luna llena — un margen de error extraordinariamente pequeño para la época. La base de la Gran Pirámide de Keops, que mide 230.4 metros de lado, tiene sus cuatro lados orientados hacia los puntos cardinales con un error de solo 3 minutos de arco. Esto significa que la pirámide entera, construida con 2.3 millones de bloques, está girada solo una fracción de grado respecto al norte astronómico.',
      'El instrumento principal usado para los trabajos astronómicos de los egipcios era el merkhet, un tipo de plomada formada por un hilo con un peso colgante. Al alinear dos merkhets con una estrella en el horizonte, los sacerdotes astrónomos podían determinar la dirección del meridiano. Otro instrumento, el bay, era una rama de palma con una pequeña ranura usada para apuntar con precisión hacia estrellas específicas en el horizonte.',
      'La precisión de la base de la Gran Pirámide es aún más notable cuando se considera el desafío de nivelar una superficie de 5.3 hectáreas — más de 9 canchas de fútbol — con una variación de nivel de menos de 2 cm entre las esquinas más alta y más baja. Esto fue logrado usando canales de agua para crear una superficie de referencia horizontal perfecta antes de colocar el primer bloque. La diferencia entre el lado más largo y el más corto es de solo 4.4 centímetros en 230 metros — un error de 0.019%.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'El error de orientación de 3 minutos de arco que se mide actualmente en la Gran Pirámide probablemente no existía cuando se terminó de construir, alrededor del 2560 a.C. La causa del error actual es la precesión axial de la Tierra: el eje terrestre se ha movido ligeramente desde entonces, lo que significa que "el norte" astronómico ha cambiado. Si se corrige este efecto, el error de orientación original de los constructores podría haber sido de cero. La pirámide podría haber sido perfectamente orientada al norte magnético de su época.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La empresa de ingeniería ARUP, reconocida por diseñar el Estadio Nacional de China (el Nido de Pájaro) para los Juegos Olímpicos de 2008, realizó un análisis estructural de la Gran Pirámide en 2009. Sus ingenieros concluyeron que la pirámide es tan eficiente estructuralmente que, si se construyera hoy con los mismos materiales pero usando técnicas de ingeniería moderna, el resultado sería prácticamente idéntico. Los arquitectos egipcios alcanzaron el diseño estructuralmente óptimo hace 4,500 años.' }
    ],
    fact: 'Los cuatro lados de la Gran Pirámide están orientados hacia los puntos cardinales con un error de 3 minutos de arco. Al terminar la construcción (ca. 2450 a.C.), ese error probablemente era cero. La pequeña desviación se debe a la precesión terrestre.',
  },
  {
    id: 'orion-piramides',
    title: 'Orión en la Tierra',
    color: '#9B6BFF',
    btnImage: '/assets/egypt/infographic_giza/btn_orion.png',
    image: '/assets/egypt/infographic_giza/hero_orion.png',
    content: [
      'Las tres grandes pirámides de Guiza no están perfectamente alineadas entre sí. Las pirámides de Keops y Kefrén siguen una línea casi recta, pero la pirámide de Micerinos (la más pequeña de las tres) está desplazada hacia el este respecto a esa línea. Este desplazamiento, que ha intrigado a arqueólogos durante décadas, fue el punto de partida de una de las teorías más debatidas de la arqueología moderna.',
      'En 1994, el ingeniero Robert Bauval publicó su Teoría de la Correlación de Orión, que propone que las tres pirámides de Guiza fueron diseñadas para replicar en tierra la disposición de las tres estrellas del Cinturón de Orión. Alnitak corresponde a Keops, Alnilam a Kefrén y Mintaka a Micerinos. Las dos primeras están aproximadamente alineadas, y la tercera está ligeramente desplazada hacia la izquierda — exactamente como Mintaka respecto a Alnitak y Alnilam.',
      'La teoría de Bauval también propone que la orientación del complejo de Guiza — el eje norte-sur del conjunto — corresponde al flujo de la Vía Láctea tal como se veía desde Egipto hace 4,500 años, representando el Nilo celestial que los egipcios llamaban el "Nilo del cielo". El río Nilo en tierra correría paralelo a este Nilo celestial, con las pirámides formando el equivalente terrestre de las estrellas más brillantes de Orión.',
      'La Teoría de la Correlación de Orión es debatida entre arqueólogos y astrónomos. Los críticos señalan que la correspondencia entre las posiciones de las pirámides y las de las estrellas no es perfecta — hay diferencias angulares significativas — y que los tres campos de pirámides del Período Faraónico temprano en el sitio de Abusir también tienen disposiciones similares sin ninguna correlación estelar propuesta. Otros señalan que los textos egipcios mencionan explícitamente a Orión en contextos funerarios pero no en conexión con la disposición de las pirámides.',
      'Lo que sí es indiscutible es la importancia astronómica del sitio de Guiza. El conducto sur de la Cámara del Rey apunta directamente hacia Alnitak en el Cinturón de Orión, y el complejo completo, incluyendo la Esfinge, muestra una orientación precisa hacia el este — el punto donde sale el Sol en los equinoccios. Los constructores integraron el conocimiento astronómico en la arquitectura de Guiza de formas múltiples y verificables.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'El nombre egipcio de la constelación de Orión era "Sah", la manifestación celestial de Osiris. Los Textos de las Pirámides, inscripciones funerarias del Período Antiguo (ca. 2350-2170 a.C.), incluyen pasajes que describen el alma del faraón subiendo al cielo para unirse con Osiris en Orión. Estos textos son los textos religiosos escritos más antiguos que se conocen. La conexión entre Orión, Osiris y el destino del alma real está bien documentada — lo que sigue siendo debatido es si esta conexión influyó en la disposición física de las pirámides o solo en la orientación de los conductos.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La Teoría de la Correlación de Orión fue popularizada por el libro El Misterio de Orión (1994) de Robert Bauval y Adrian Gilbert, que vendió millones de ejemplares. Bauval calculó que la correspondencia angular entre las pirámides y las estrellas de Orión era más perfecta alrededor del 10,500 a.C., lo que generó especulaciones sobre ese período. Sin embargo, la mayoría de los arqueólogos señalan que todas las evidencias disponibles — incluyendo el papiro de Wadi el-Jarf y el cementerio de trabajadores — datan claramente las pirámides en el período 2600-2500 a.C.' }
    ],
    fact: 'El nombre egipcio de Orión era "Sah", manifestación celestial de Osiris. Cuando Orión reaparecía tras 70 días de invisibilidad, los sacerdotes celebraban su renacimiento. Este periodo coincide con los 70 días del proceso de momificación.',
  },
  {
    id: 'constructores',
    title: 'Los Constructores',
    color: '#FF7043',
    btnImage: '/assets/egypt/infographic_giza/btn_constructores.png',
    image: '/assets/egypt/infographic_giza/hero_constructores.png',
    content: [
      'La evidencia arqueológica indica con certeza que los constructores de las pirámides no eran esclavos. El hallazgo del cementerio de trabajadores de Guiza en 1990 por el equipo de Zahi Hawass y Mark Lehner, y el descubrimiento del papiro de Wadi el-Jarf en 2013 por Pierre Tallet, han proporcionado información directa sobre quiénes eran estas personas y cómo vivían.',
      'El papiro de Wadi el-Jarf es el documento escrito más antiguo hallado en Egipto — data de aproximadamente el 2560 a.C., el reinado del faraón Keops. Es el diario de un inspector llamado Merer, que supervisaba equipos de trabajadores que transportaban bloques de caliza desde las canteras de Tura, a unos 12 km de Guiza, usando barcazas en el Nilo. El papiro detalla las rutas, los tiempos de transporte, las raciones de comida y los nombres de los trabajadores.',
      'Los esqueletos hallados en el cementerio de trabajadores cuentan otra historia importante: muestran huesos con fracturas bien soldadas, lo que indica que los trabajadores recibían atención médica. También muestran artritis avanzada en rodillas, caderas y columna — evidencia de trabajo físico muy duro durante muchos años. Algunos esqueletos tienen amputaciones quirúrgicas que sobrevivieron semanas o meses, lo que significa que los médicos egipcios realizaban operaciones exitosas en ese período.',
      'Los trabajadores estaban organizados en equipos con nombres propios. Las marcas encontradas en bloques de piedra revelan nombres como "Los Amigos de Keops", "Los Borrachos de Micerinos" o "Los Que Conocen a Kefrén". Estos nombres sugieren orgullo de equipo y una identidad laboral colectiva. El arquitecto jefe, Hemiunu (sobrino del faraón Keops), supervisaba toda la operación desde su sede administrativa en Guiza.',
      'La logística del proyecto era extraordinaria. Se necesitaban aproximadamente 10,000 trabajadores permanentes en el sitio, más decenas de miles de trabajadores temporales que rotaban durante las temporadas de inundación del Nilo, cuando la agricultura era imposible y la mano de obra estaba disponible. Estos trabajadores recibían salario en especie: comida, cerveza, ropa y atención médica. Las excavaciones han encontrado los restos de las panaderías, cervecerías y almacenes de alimentos que los abastecían.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'El papiro de Wadi el-Jarf, fechado alrededor del año 2560 a.C. y descubierto en 2013 por el equipo del arqueólogo francés Pierre Tallet, es el documento escrito más antiguo conocido de Egipto. Es el diario personal del inspector Merer, quien supervisaba el transporte de bloques de caliza desde las canteras de Tura hasta Guiza usando barcazas en el Nilo. El papiro menciona explícitamente la "Casa del Horizonte de Keops", nombre dado a la Gran Pirámide en construcción, y detalla operaciones logísticas con una precisión sorprendente para un documento de 4,500 años de antigüedad.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'El cementerio de trabajadores de Guiza, descubierto accidentalmente en 1990 cuando un caballo de turistas tropezó con un muro enterrado, ha sido excavado durante décadas por el equipo de Zahi Hawass. Contiene las tumbas de supervisores de mayor rango y referencias a tumbas de trabajadores menos especializados. Las tumbas de los supervisores tienen inscripciones y relieves que mencionan sus cargos — inspectores, controladores de equipos, médicos — lo que permite reconstruir la jerarquía administrativa del proyecto de construcción más grande del mundo antiguo.' }
    ],
    fact: 'La Gran Pirámide tiene 2.3 millones de bloques de piedra caliza, con un peso promedio de 2.5 toneladas cada uno. Los bloques de granito de las cámaras internas pesan hasta 80 toneladas.',
  },
  {
    id: 'scan-pyramids',
    title: 'Muones Cósmicos',
    color: '#4FC3F7',
    btnImage: '/assets/egypt/infographic_giza/btn_muones.png',
    image: '/assets/egypt/infographic_giza/hero_muones.png',
    content: [
      'En 2015, el proyecto ScanPyramids reunió a científicos de Francia, Japón, Canadá y Egipto para aplicar técnicas no invasivas al estudio del interior de las pirámides de Guiza. Sin perforar un solo bloque de piedra, los investigadores usaron tres tecnologías distintas: tomografía de muones cósmicos, termografía infrarroja y fotogrametría tridimensional, cada una revelando aspectos diferentes de la estructura interna.',
      'Los muones son partículas subatómicas similares a los electrones pero 207 veces más masivas. Se producen de forma natural cuando los rayos cósmicos — partículas de alta energía procedentes del espacio — chocan con los átomos de la atmósfera terrestre. Estos muones viajan a velocidades cercanas a la de la luz y pueden atravesar hasta 1,000 metros de roca, pero son absorbidos gradualmente por la materia. Cuanta más piedra atraviesan, más se atenúan.',
      'El principio de detección es similar al de una radiografía médica. Los detectores de muones colocados dentro de la pirámide cuentan las partículas que llegan desde cada dirección. Si un área contiene más muones de lo esperado para ese espesor de piedra, significa que hay un espacio vacío — una cámara no descubierta, un corredor o un hueco entre bloques. La densidad de muones crea un "mapa de densidad" del interior de la pirámide.',
      'En 2017, los científicos de ScanPyramids publicaron en la revista Nature el descubrimiento de una cavidad de al menos 30 metros de largo ubicada por encima de la Gran Galería, la impresionante rampa interior de 47 metros de longitud que conduce a la Cámara del Rey. Esta cavidad, llamada "La Gran Cavidad", había estado oculta durante 4,500 años. Su función es desconocida: podría ser una cámara de descompresión estructural, un espacio de construcción abandonado, o una cámara funeraria aún sin explorar.',
      'La termografía infrarroja de ScanPyramids reveló anomalías térmicas en las paredes de la pirámide. Algunos bloques de la cara norte muestran temperaturas ligeramente más altas que los bloques circundantes durante el amanecer. Esto podría indicar la presencia de corrientes de aire, materiales con diferente conductividad térmica o espacios vacíos detrás de los bloques. La fotogrametría 3D, por su parte, creó un modelo digital de precisión milimétrica de toda la pirámide, permitiendo análisis arquitectónicos imposibles con métodos tradicionales.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'Cada minuto, aproximadamente 10,000 muones cósmicos atraviesan cada metro cuadrado de cualquier superficie horizontal en la Tierra — incluyendo tu cabeza mientras lees esto. Estos muones son inofensivos para los seres vivos, pero son herramientas útiles para los científicos: atraviesan la roca casi como si no existiera, aunque son ligeramente absorbidos por ella. Los detectores de ScanPyramids, basados en emulsiones fotográficas especiales similares a las de las viejas cámaras de película, registraron la huella de estos muones durante meses para construir el mapa de densidades del interior de la pirámide.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La técnica de tomografía de muones fue usada por primera vez en una pirámide en 1970, cuando el físico Luis Álvarez (Premio Nobel de Física 1968) colocó detectores en la Cámara del Aire de la pirámide de Kefrén para buscar cámaras ocultas. No encontró nada, pero demostró que el método era viable. Los detectores modernos de ScanPyramids son miles de veces más sensibles que los de Álvarez, lo que permitió detectar la Gran Cavidad que pasó inadvertida en el experimento de 1970.' }
    ],
    fact: 'Cada minuto, unos 10,000 muones atraviesan cada metro cuadrado. Los científicos de ScanPyramids colocaron detectores en la pirámide durante meses para contar los muones y crear un mapa interno.',
  },
  {
    id: 'temperatura',
    title: 'La Pirámide Termo',
    color: '#E57373',
    btnImage: '/assets/egypt/infographic_giza/btn_temperatura.png',
    image: '/assets/egypt/infographic_giza/hero_temperatura.png',
    content: [
      'Una de las propiedades más sorprendentes de la Gran Pirámide es que su interior mantiene una temperatura notablemente estable de alrededor de 20 grados Celsius, independientemente de si afuera son 45 grados bajo el sol abrasador del mediodía o 5 grados en la fría madrugada del desierto. Esta estabilidad térmica no es un diseño intencional de los constructores — es una consecuencia física de la enorme masa de piedra que conforma la pirámide.',
      'La explicación física se llama inercia térmica. Los materiales densos y masivos, como la piedra caliza, tienen una gran capacidad de absorber calor sin cambiar apreciablemente de temperatura. La masa total de la pirámide, de aproximadamente 6.5 millones de toneladas de piedra, actúa como un inmenso depósito de calor que absorbe la radiación solar durante el día muy lentamente y la libera igualmente despacio durante la noche. El resultado es una temperatura interior que se mantiene casi constante todo el año.',
      'Esta estabilidad térmica tiene implicaciones prácticas para la conservación de los objetos que alguna vez se guardaron en las cámaras internas. Los papiros, telas de lino, ofrendas de comida y joyas de valor ritual habrían sobrevivido mucho mejor en ese ambiente de temperatura y humedad estables que en el exterior del desierto, donde las fluctuaciones extremas de temperatura y humedad deterioran rápidamente los materiales orgánicos.',
      'La termografía infrarroja del proyecto ScanPyramids reveló algo inesperado: la cara norte de la pirámide muestra anomalías térmicas en ciertos bloques durante el amanecer. Algunos bloques se calientan más rápido que los bloques circundantes, lo que podría indicar que contienen materiales con diferente conductividad térmica, que tienen espacios de aire detrás de ellos, o que forman parte de estructuras internas no descubiertas. Estos "puntos calientes" son uno de los principales objetivos de las fases futuras de exploración.',
      'La ubicación de Guiza no es solo geográficamente conveniente. El sitio está situado en el vértice occidental del delta del Nilo, el punto donde el río comienza a dividirse en sus múltiples brazos que llevan agua al mar Mediterráneo. Desde la cima de la Gran Pirámide, los constructores podían ver simultáneamente el desierto al oeste y las tierras fértiles del delta al este. Algunos investigadores proponen que esta posición simbólica, en el límite entre el mundo de los vivos (el este, donde sale el Sol) y el mundo de los muertos (el oeste, donde se pone), fue deliberadamente elegida por razones religiosas.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'La inercia térmica de un material se calcula como la raíz cuadrada del producto de su conductividad térmica, su densidad y su calor específico. La piedra caliza tiene una inercia térmica alta comparada con materiales porosos como la arena o la madera, lo que explica por qué la temperatura interior de la pirámide varía tan poco. En ingeniería de edificios modernos, este principio se aplica deliberadamente en el diseño de muros de carga de gran masa en climas con grandes diferencias de temperatura entre el día y la noche, como el desierto o los climas continentales.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'Las pirámides egipcias no son las únicas estructuras antiguas con propiedades térmicas notables. Los oppida celtas, las casas de piedra de Çatalhöyük (Turquía, ca. 7500 a.C.) y los pueblos de los Ancestros Puebloanos del suroeste de Norteamérica fueron construidos con muros gruesos de piedra o adobe que aprovechan exactamente el mismo principio de inercia térmica. En todos estos casos, los constructores aprendieron empíricamente que más masa significa temperatura más estable — un principio que los físicos no formalizarían matemáticamente hasta el siglo XIX.' }
    ],
    fact: 'La base de la pirámide cubre 5.3 hectáreas y pesa 6.5 millones de toneladas. La estructura entera emplea millones de bloques de piedra colocados con precisión.',
  },
  {
    id: 'legado-giza',
    title: 'El Legado Eterno',
    color: '#AB47BC',
    btnImage: '/assets/egypt/infographic_giza/btn_legado.png',
    image: '/assets/egypt/infographic_giza/hero_legado.png',
    content: [
      'La Gran Pirámide de Keops fue el edificio más alto del mundo durante aproximadamente 3,800 años, desde su construcción alrededor del 2560 a.C. hasta que la Catedral de Lincoln en Inglaterra la superó en 1311 d.C. con una aguja que alcanzaba los 160 metros. En su momento de construcción, la pirámide tenía 146.5 metros de alto con la cúspide intacta, cubierta de piedra caliza blanca pulida que reflejaba el sol como un espejo gigante visible desde decenas de kilómetros de distancia.',
      'El conocimiento astronómico y matemático desarrollado en el Antiguo Egipto influyó en todas las civilizaciones mediterráneas posteriores. Los filósofos y matemáticos griegos, incluyendo Tales de Mileto, Pitágoras y Platón, viajaron a Egipto para estudiar con sus sacerdotes. Tales usó los métodos de medición angular egipcios para calcular la altura de la Gran Pirámide usando la sombra que proyectaba — el primer uso documentado de la trigonometría. Estos conocimientos egipcios, reelaborados por los griegos, llegaron después a Roma, el mundo árabe medieval y finalmente a Europa occidental.',
      'El legado de la arquitectura funeraria egipcia se extiende más allá de Egipto. Las pirámides maya de Chichén Itzá, Teotihuacán y Tikal, construidas independientemente en América Central entre el siglo II a.C. y el siglo IX d.C., comparten la forma piramidal escalonada con base cuadrada — aunque esto es un caso de convergencia arquitectónica independiente, no de contacto entre culturas. Ambas tradiciones llegaron a la pirámide como la forma más eficiente de construir estructuras elevadas con piedra y mano de obra no mecanizada.',
      'Las catedrales medievales de Europa heredaron indirectamente la tradición de la orientación astronómica. Sus naves principales están orientadas de este a oeste, con el ábside al este — hacia donde sale el Sol y, en la tradición cristiana, hacia Jerusalén. Los rosetones al oeste capturan la luz del atardecer. Esta práctica de orientar edificios religiosos hacia puntos astronómicamente significativos tiene antecedentes en los templos egipcios, como Abu Simbel, diseñado para que la luz del amanecer ilumine el santuario interior exactamente en el cumpleaños del faraón.',
      'La Gran Pirámide es la única de las Siete Maravillas del Mundo Antiguo que sigue en pie. El Faro de Alejandría se derrumbó por terremotos. El Coloso de Rodas fue destruido por un terremoto en 226 a.C. Los Jardines Colgantes de Babilonia solo existen en textos. La Estatua de Zeus en Olimpia, el Mausoleo de Halicarnaso y el Templo de Artemisa en Éfeso fueron destruidos por incendios, guerras o terremotos medievales. Solo la pirámide de Keops permanece, visible desde el espacio, después de 4,500 años.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'La piedra caliza blanca que cubría originalmente la Gran Pirámide no fue retirada intencionalmente por arqueólogos — fue usada como material de construcción por los habitantes medievales y otomanos del Cairo. Las excavaciones en la base de la pirámide han encontrado fragmentos de esta piedra caliza pulida, que tenía una reflectancia solar de hasta el 90%, convirtiendo la pirámide en una referencia visual brillante visible desde decenas de kilómetros. El Gran Templo de Luxor, construido 1,300 años después de la pirámide, también estaba cubierto de pintura blanca brillante por las mismas razones simbólicas.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'El matemático griego Tales de Mileto (ca. 624-546 a.C.) calculó la altura de la Gran Pirámide usando la longitud de su sombra en el momento preciso del día en que la sombra de cualquier objeto vertical es igual a su propia altura. Según Diógenes Laercio, Tales demostró este método en presencia del faraón Amasis II, quien quedó impresionado. Esta es la primera aplicación documentada de la semejanza de triángulos para resolver problemas de medición — el antecedente directo de la trigonometría moderna.' }
    ],
    fact: 'La Gran Pirámide es la maravilla más antigua. El Faro de Alejandría, la segunda más duradera, se derrumbó en el siglo XIV. La pirámide ha sobrevivido 4,500 años y sigue siendo un monumento central en la historia humana.',
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

// â”€â”€â”€ Giza Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        <motion.div layoutId="activeDotM5"
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase',
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
              ðŸ”º ¡Has descubierto todos los secretos del Láser de Giza!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Constructor Estelar
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}