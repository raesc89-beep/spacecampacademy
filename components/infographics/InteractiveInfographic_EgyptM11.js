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
}; const BIBLIOGRAPHY = ['Allen, J.P. (2005). The Ancient Egyptian Pyramid Texts, SBL',
  'Krupp, E.C. (1983). Echoes of the Ancient Skies: Astronomy of Lost Civilizations, Harper & Row',
  'Frankfort, H. (1948). Kingship and the Gods, University of Chicago Press',
  'Wells, R.A. (1996). Astronomy in Egypt, Astronomy Before the Telescope, British Museum Press'
];

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INFOGRAPHIC_NODES = [
  {
    "id": "nut",
    "bannerImage": "/assets/egypt/infographic_m11/banner_anubis-juicio.webp",
    "title": "¿Quién es Nut?",
    "color": "#C4A7E7",
    "btnImage": "/assets/egypt/infographic/btn_nut.webp",
    "image": "/assets/egypt/infographic/nut_goddess.webp",
    "content": [
      "En la teología heliopolitana del Antiguo Egipto, Nut era la sublime personificación de la bóveda celeste y madre de los principales dioses de la creación. Hija del dios del aire Shu y de la diosa de la humedad Tefnut, Nut representaba el firmamento estrellado que cubría el mundo ordenado. Su iconografía canónica la muestra como una mujer de proporciones colosales cuyo cuerpo arqueado se apoya sobre las cuatro extremidades en los confines del horizonte terrestre.",
      "Su vientre y sus extremidades arqueadas están enteramente salpicados de estrellas doradas de cinco puntas, mientras que su torso desnudo se curva sobre su hermano y consorte Geb, la personificación física de la tierra fértil. Entre ambos se interpone su padre Shu, quien levanta los brazos hacia arriba con fuerza titánica para sostener el cuerpo celeste de Nut e impedir que las aguas caóticas del océano primordial Nun se desplomen e inunden la creación terrenal.",
      "El ciclo cósmico cotidiano más trascendental de la mitología egipcia residía en el cuerpo de Nut. Cada atardecer, cuando el Sol se ponía por el horizonte occidental, la diosa tragaba al disco solar Ra en su boca; durante las doce horas de la noche, el astro rey recorría las entrañas secretas de su cuerpo divino, regenerando su energía en la oscuridad del inframundo celeste para renacer victorioso de su matriz cada amanecer por el horizonte oriental.",
      "Este drama cósmico está documentado con extraordinario rigor teológico en el «Libro de Nut», un tratado sacerdotal monumental hallado en el Osireion de Abidos y en las tumbas reales del Imperio Nuevo, como la de Ramsés IV y Ramsés VI. El texto describe la anatomía de la diosa como un mapa astronómico viviente donde se detallan las trayectorias de los decanos y las constelaciones imperecederas que jamás abandonan su espalda estelar.",
      "Para los egipcios ordinarios y para la corte de los faraones, Nut era la protectora suprema de los difuntos. Su figura acogedora se pintaba habitualmente en el interior de las tapas de los sarcófagos de madera y piedra, de modo que al cerrarse el ataúd, la momia quedaba envuelta por el abrazo eterno de la diosa del cielo, garantizando al espíritu del difunto la resurrección astral entre las estrellas que nunca mueren."
    ],
    "fact": "El «Libro de Nut», compilado originalmente hacia el año 2000 a.C. y grabado en el Osireion de Abidos bajo Seti I, abarca ciento cuarenta columnas de jeroglíficos continuos que describen las trayectorias estelares a lo largo de los cuarenta y cuatro metros de arco de la diosa, detallando el ciclo diario de puesta y renacimiento de los astros decánicos.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Según el mito narrado por Plutarco, el dios creador Ra prohibió a Nut dar a luz en cualquiera de los trescientos sesenta días del año oficial. Para eludir el decreto, el dios Thoth jugó a los dados con la Luna y ganó una setenta y dosava parte de su luz, creando los cinco días epagómenos en los que nacieron Osiris, Horus, Seth, Isis y Neftis."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El «Libro de Nut» contiene las observaciones más antiguas conocidas sobre la teoría de la refracción atmosférica crepuscular en Egipto. Los escribas registraron que el Sol seguía emitiendo luz difusa sobre el horizonte durante una hora y media tras ocultarse físicamente, interpretándolo como el resplandor residual de la boca de la diosa."
      }
    ]
  },
  {
    "id": "nilo-cielo",
    "bannerImage": "/assets/egypt/infographic_m11/banner_ennead-dioses.webp",
    "title": "El Nilo del Cielo",
    "color": "#7EC8E3",
    "btnImage": "/assets/egypt/infographic/btn_nile.webp",
    "image": "/assets/egypt/infographic/nile_milkyway.webp",
    "content": [
      "Para los observadores del valle del Nilo, la naturaleza ofrecía un espectáculo nocturno sobrecogedor: una banda lechosa y luminosa que cruzaba el firmamento de un extremo a otro, densamente poblada por miríadas de estrellas titilantes y nubes de polvo interestelar. Esta franja etérea, que en la astronomía moderna denominamos Vía Láctea, fue conceptualizada por los sabios egipcios como un curso fluvial celestial: el Nilo del Cielo.",
      "En los Textos de las Pirámides grabados en el Reino Antiguo, este río cósmico recibe el nombre sagrado de «Mr-n-xA» o el Canal Serpenteante. Según las fórmulas funerarias de Saqqara, este canal era la contrapartida celeste directa del río Nilo terrenal. En sus riberas celestiales habitaban los dioses ancestrales y las almas glorificadas de los faraones difuntos, quienes requerían la asistencia de un barquero cósmico llamado Nemty para cruzar sus aguas de luz.",
      "La orientación aparente de la Vía Láctea sobre el horizonte de Egipto cambia de manera continua a lo largo del año debido a la rotación de la Tierra y a su traslación orbital alrededor del Sol. Durante los meses de verano, cuando el río Nilo terrenal experimentaba su crecida estacional vivificante e inundaba las llanuras agrícolas, la Vía Láctea se extendía majestuosamente casi de norte a sur, reflejando el curso geográfico del río.",
      "Esta asombrosa sincronía entre el cauce terrestre desbordado y el cauce estelar iluminado reforzaba la fe de la civilización faraónica en la existencia de un orden cósmico universal unificado. No se trataba de dos mundos separados y hostiles, sino de dos manifestaciones interconectadas de una misma fuerza vital: el agua dulce irrigaba la tierra de los vivos mientras que el río de estrellas nutría la vida espiritual de los antepasados.",
      "Los sacerdotes astrónomos de Heliópolis utilizaban el curso de la Vía Láctea como un sistema de referencia celeste para cartografiar los asterismos meridionales y septentrionales. Reconocían que las regiones más brillantes y abultadas de la banda cósmica coincidían con las constelaciones de Sagitario y Escorpio, donde la densidad estelar parecía acumularse como un delta fluvial celestial rebosante de energía divina."
    ],
    "fact": "La Vía Láctea cruza la bóveda celeste con un ángulo de sesenta y tres grados respecto al plano orbital terrestre, alineándose de norte a sur sobre el horizonte del Nilo durante las noches de verano en el exacto período en que se iniciaba la crecida anual, estableciendo una correspondencia geográfica directa entre el río terrestre y el río celestial.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Reino Antiguo, el barquero divino Nemty exigía a los reyes difuntos responder a complejos acertijos astronómicos y éticos antes de permitirles abordar su barca de papiro para navegar a través del Canal Serpenteante de la Vía Láctea rumbo al reino de Osiris, demostrando el dominio regio de la liturgia celeste y el conocimiento de los puntos cardinales estelares."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La banda brillante de la Vía Láctea está compuesta por la luz combinada de miles de millones de estrellas individuales que no pueden resolverse a simple vista. Su brillo aparente se ve interrumpido por nebulosas oscuras de absorción formadas por granos de polvo de grafito y silicatos que bloquean la luz visible."
      }
    ]
  },
  {
    "id": "arriba-abajo",
    "bannerImage": "/assets/egypt/infographic_m11/banner_horus-halcon.webp",
    "title": "Como es Arriba, es Abajo",
    "color": "#FFD700",
    "btnImage": "/assets/egypt/infographic/btn_above.webp",
    "image": "/assets/egypt/infographic/as_above_below.webp",
    "content": [
      "Uno de los principios filosóficos y cosmológicos más profundos forjados en el Antiguo Egipto es el axioma de la correspondencia cósmica, sintetizado siglos después en la célebre máxima hermética: «Como es arriba, es abajo». Para la mentalidad egipcia, el territorio físico de las Dos Tierras no era un accidente geográfico aislado, sino un reflejo especular exacto del orden cósmico estructurado por los dioses primordiales.",
      "Según este principio de duplicidad sagrada, la orilla oriental del Nilo terrenal correspondía al reino de los vivos, el nacimiento cotidiano del Sol y el mundo de la acción cívica y administrativa. En perfecto contrapunto, la orilla occidental, por donde el astro solar se sumergía en las tinieblas de la noche, constituía el dominio natural de las necrópolis, los templos funerarios y el umbral hacia el inframundo de la Duat.",
      "Los ingenieros y sacerdotes que planificaban la fundación de templos, pirámides y canales agrícolas se esforzaban por alinear cada elemento de la topografía humana con los ejes cardinales del firmamento. El río Nilo dividía a Egipto en dos mitades simétricas del mismo modo que el ecuador celeste o la Vía Láctea dividían la cúpula de la noche, creando un diálogo ininterrumpido entre la geografía de la tierra y la cartografía estelar.",
      "Esta concepción holística del cosmos impedía que la ciencia se divorciara de la ética o la religión. El concepto de Maat, que engloba la verdad, la justicia moral y el equilibrio termodinámico de la naturaleza, se aplicaba por igual al movimiento puntual de los planetas en sus órbitas que a la distribución equitativa de las aguas del Nilo entre los campesinos o al fallo de los tribunales de justicia tebanos.",
      "Cualquier perturbación en el orden terrenal, como una mala cosecha, una guerra civil o una dinastía ilegítima, era percibida como una ruptura de la armonía cósmica que podía provocar eclipses catastróficos, tormentas de arena destructivas o la sequía del río. Por consiguiente, el deber primordial del faraón y de sus sabios era mantener la sincronía perpetua entre el ritmo de la Tierra y el compás de las estrellas."
    ],
    "fact": "La orientación topográfica de más del noventa y dos por ciento de los templos del Imperio Antiguo y Medio sigue un paralelismo estricto con el cauce del Nilo o una perpendicularidad ortogonal exacta a las líneas equinocciales del horizonte astronómico, integrando el paisaje urbano sagrado con la mecánica celeste y el curso de las aguas del río.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La famosa «Tabla de Esmeralda», atribuida a Hermes Trismegisto (fusión sincrética del dios griego Hermes y el dios egipcio Thoth), recoge en su segundo verso la formulación clásica del principio: «Lo que está abajo es como lo que está arriba, y lo que está arriba es como lo que está abajo, para realizar el milagro de una sola cosa»."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La regularidad matemática de los ciclos geofísicos del Nilo dependía de las precipitaciones monzónicas de las tierras altas de Etiopía, las cuales a su vez estaban sincronizadas con las variaciones de insolación estacional del hemisferio norte gobernadas por los parámetros orbitales de Milankovitch."
      }
    ]
  },
  {
    "id": "orion-piramides",
    "bannerImage": "/assets/egypt/infographic_m11/banner_isis-alas.webp",
    "title": "Orión y las Pirámides",
    "color": "#E8C96A",
    "btnImage": "/assets/egypt/infographic/btn_pyramids.webp",
    "image": "/assets/egypt/infographic/pyramids_orion.webp",
    "content": [
      "Ninguna constelación cautivó tanto la imaginación y la liturgia funeraria del Antiguo Egipto como Sah, identificada en la astronomía moderna con la constelación de Orión. En el pensamiento teológico del Reino Antiguo, Sah era la encarnación astral de Osiris, el dios de la regeneración y señor del Más Allá. Su aparición en el firmamento nocturno marcaba el renacimiento perpetuo de la vida tras el frío y la oscuridad invernal.",
      "La fascinación por Orión se refleja de manera monumental en la meseta de Guiza, donde las tres grandes pirámides de Khufu (Keops), Khafre (Kefrén) y Menkaure (Micerino) fueron erigidas durante la Dinastía IV, hacia el año 2500 antes de nuestra era. Su disposición geométrica relativa sobre el terreno calizo ha fascinado a los arqueoastrónomos modernos por su notable similitud visual con las tres estrellas del cinturón de Orión: Alnitak, Alnilam y Mintaka.",
      "Más allá de la controvertida hipótesis de correlación global propuesta por autores populares, los análisis arqueoastronómicos empíricos han verificado la existencia de canales de ventilación o conductos estelares en el interior de la Gran Pirámide de Khufu. Estos estrechos conductos de apenas veinte centímetros de sección cuadrada ascienden desde la Cámara del Rey y la Cámara de la Reina con ángulos de inclinación milimétricos hacia el cielo exterior.",
      "El conducto sur de la Cámara del Rey presenta una inclinación exacta de cuarenta y cinco grados, lo que permitía que hacia el año 2500 antes de Cristo apuntara directamente a la culminación meridiana de la estrella Alnitak, la más brillante del cinturón de Orión. De forma simultánea, el conducto norte de la misma cámara, con un ángulo de treinta y dos grados y medio, apuntaba hacia la estrella Thuban (Alfa Draconis), la estrella polar de la época.",
      "Estos conductos no fueron diseñados para la respiración de obreros vivos, sino como pasajes litúrgicos para el alma inmortal (ba) del faraón difunto. A través de ellos, la energía espiritual de Khufu podía ascender directamente en línea recta hacia el corazón de Osiris en Orión y hacia las estrellas circumpolares del norte, integrándose para siempre en el ciclo eterno de las estrellas imperecederas que jamás se ocultan."
    ],
    "fact": "Los conductos estelares de la Gran Pirámide de Khufu mantienen una rectitud geométrica con desviaciones menores a cinco milímetros a lo largo de más de sesenta y cinco metros de longitud a través de la masa de dos millones trescientos mil bloques de caliza, apuntando con precisión milimétrica hacia la culminación meridiana de Orión y las estrellas circumpolares.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los Textos de las Pirámides de Unas en Saqqara figura el verso canónico: «¡Mira, él ha llegado como Orión, mira, Osiris ha llegado como Orión!... El cielo te concibe con Orión, la luz del amanecer te da a luz con Orión». Esta inscripción, tallada con pigmento verde de malaquita en la antecámara real hacia el 2350 a.C., consagraba la identificación teológica directa del faraón con la constelación de Sah."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La precesión de los equinoccios cambia la altura meridiana de las estrellas a lo largo de un ciclo de veinticinco mil setecientos setenta años. Hacia el 2500 a.C., Alnitak alcanzaba una altitud culminante de exactamente cuarenta y cinco grados sobre el horizonte de Guiza, coincidiendo con el canal sur."
      }
    ]
  },
  {
    "id": "sagitario",
    "bannerImage": "/assets/egypt/infographic_m11/banner_osiris-mito.webp",
    "title": "El Monstruo del Centro",
    "color": "#FF6B6B",
    "btnImage": "/assets/egypt/infographic/btn_blackhole.webp",
    "image": "/assets/egypt/infographic/sagittarius_blackhole.webp",
    "content": [
      "Cuando los sacerdotes y observadores egipcios contemplaban la Vía Láctea desde las llanuras desérticas de Asuán o Tebas, su mirada se detenía inevitablemente en la región más densa y resplandeciente de la franja celeste: la constelación de Sagitario. En esta zona del cielo nocturno, el río cósmico parecía ensancharse en una bahía luminosa de polvo dorado que los textos mitológicos asociaban con el santuario más recóndito y arcano del cosmos.",
      "Lo que aquellos astrónomos de la antigüedad interpretaban como una concentración divina de fuego cósmico es, en la astrofísica moderna, el corazón gravitatorio de nuestra propia galaxia. En dirección a la constelación de Sagitario se oculta el Centro Galáctico, situado a una distancia aproximada de veintiséis mil años luz de la Tierra, un hervidero colosal de millones de estrellas gigantes apiñadas en un espacio relativamente compacto.",
      "En el núcleo exacto de esta aglomeración estelar reside un auténtico gigante cósmico: Sagitario A* (pronunciado Sagitario A estrella), un agujero negro supermasivo con una masa equivalente a cuatro millones cien mil veces la masa de nuestro Sol. Este objeto astronómico extremo curva el espaciotiempo con tal intensidad gravitatoria que nada, ni siquiera la luz electromagnética que viaja a trescientos mil kilómetros por segundo, puede escapar de su horizonte de sucesos.",
      "A pesar de su inmensa masa, Sagitario A* no puede observarse con telescopios ópticos convencionales porque densas nubes de gas molecular y polvo interestelar bloquean la luz visible a lo largo del plano galáctico. Solo mediante radiotelescopios de ondas milimétricas, instrumentos infrarrojos de gran apertura y telescopios espaciales de rayos X ha sido posible descorrer este velo y cartografiar el movimiento vertiginoso de las estrellas que orbitan a su alrededor.",
      "En mayo de 2022, el consorcio internacional del Telescopio del Horizonte de Sucesos (Event Horizon Telescope) presentó al mundo la primera imagen histórica de la silueta de Sagitario A*, mostrando un anillo brillante de plasma incandescente que gira a velocidades relativistas alrededor de una sombra oscura central. Aquella región venerada por los sabios del Nilo resultó albergar el corazón gravitacional definitivo de nuestro hogar cósmico."
    ],
    "fact": "El agujero negro supermasivo Sagitario A* posee una masa confirmada de cuatro coma un millones de masas solares concentrada en una región espacial menor que la órbita del planeta Mercurio alrededor del Sol, a veintiséis mil años luz del valle del Nilo, dominando con su formidable atracción gravitatoria el movimiento de todas las estrellas de la Vía Láctea.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La estrella S2 gira alrededor del agujero negro supermasivo Sagitario A* completando una órbita elíptica cada dieciséis años, alcanzando en su punto de máxima aproximación una velocidad asombrosa de más de veinticinco millones de kilómetros por hora (casi el tres por ciento de la velocidad de la luz)."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El radio de Schwarzschild del agujero negro Sagitario A* es de aproximadamente doce millones de kilómetros, unas diecisiete veces el radio de nuestro Sol. Sin embargo, su horizonte de sucesos efectivo con la sombra aparente magnificada por la lente gravitacional alcanza unos cuarenta y cuatro millones de kilómetros."
      }
    ]
  },
  {
    "id": "viaje-faraon",
    "bannerImage": "/assets/egypt/infographic_m11/banner_ra-solar.webp",
    "title": "El Viaje del Faraón",
    "color": "#F5A623",
    "btnImage": "/assets/egypt/infographic/btn_pharaoh.webp",
    "image": "/assets/egypt/infographic/pharaoh_stars.webp",
    "content": [
      "La muerte física de un faraón en el Antiguo Egipto no era considerada un final trágico, sino el comienzo de la expedición más trascendental y arriesgada de su existencia: el viaje cósmico hacia la inmortalidad. A través de complejos rituales ejecutados por los sacerdotes lectores en el templo funerario, el monarca se despojaba de sus ataduras corporales terrenales para transfigurarse en un akh, un ser luminoso y etéreo dotado de facultades divinas.",
      "Para emprender esta travesía ultramundana, el faraón disponía de barcas solares rituales enterradas junto a su tumba. El descubrimiento arqueológico más espectacular de este tipo de navío tuvo lugar en 1954 al pie de la cara sur de la Gran Pirámide de Guiza, donde el arqueólogo Kamal el-Mallakh halló una fosa sellada con losas de caliza de cuarenta toneladas que contenía desmontada la barca solar de cedro del Líbano de Khufu, de cuarenta y tres metros de eslora.",
      "Una vez transfigurado, el faraón abordaba la barca diurna Mandjet para acompañar al dios Ra durante las doce horas del día a través del cuerpo de Nut. Al caer la tarde, la comitiva celestial cambiaba a la barca nocturna Mesektet para adentrarse en las peligrosas regiones subterráneas de la Duat, navegando a través de doce cavernas infernales custodiadas por puertas de fuego y monstruos demoníacos que intentaban detener el avance de la luz.",
      "El clímax de este periplo nocturno se producía en la sexta hora de la noche, cuando la barca solar alcanzaba el sanctasanctórum del inframundo. Allí, en la oscuridad absoluta, el alma de Ra se fusionaba místicamente con el cuerpo inerte de Osiris. Al unirse la luz solar vivificante con el principio de resurrección terrenal, el cosmos entero experimentaba una revitalización instantánea que dotaba al faraón de energía inagotable para vencer a las tinieblas.",
      "Finalmente, en la duodécima hora, tras derrotar a la serpiente caótica Apofis en el abismo oriental, la barca solar emergía triunfante entre los muslos de Nut convertida en el escarabajo Jepri. El faraón, fundido para siempre con el Sol naciente, comenzaba un nuevo ciclo diario de gobierno sobre el mundo de los vivos y los muertos, garantizando la estabilidad perenne del orden cósmico o Maat."
    ],
    "fact": "La barca solar de Khufu exhibida en el Gran Museo Egipcio pesa veinte toneladas métricas y mide cuarenta y tres coma cuatro metros de longitud por cinco coma nueve metros de manga, requiriendo catorce remos colosales para gobernar simbólicamente las corrientes de la Vía Láctea, siendo la embarcación intacta más antigua y monumental conservada por la arqueología mundial.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La barca solar de Khufu hallada en Guiza fue construida con mil doscientas veinticuatro piezas individuales de madera de cedro unidas exclusivamente mediante cuerdas de esparto y clavijas vegetales, sin utilizar un solo clavo metálico en toda su estructura náutica de cuarenta y tres metros, diseñada para ensamblarse y desensamblarse con asombrosa facilidad en los rituales náuticos reales."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La madera de cedro del Líbano (Cedrus libani) utilizada en las barcas funerarias reales contiene resinas naturales ricas en sesquiterpenos que actúan como potentes bactericidas y fungicidas biológicos, preservando la madera intacta durante más de cuatro mil quinientos años en fosas anaerobias, garantizando que el navío sagrado soportara indemne el paso de milenios de silencio subterráneo."
      }
    ]
  },
  {
    "id": "navegantes",
    "bannerImage": "/assets/egypt/infographic_m11/banner_sincretismo-religioso.webp",
    "title": "¡Navegantes del Nilo Cósmico!",
    "color": "#4ECDC4",
    "btnImage": "/assets/egypt/infographic/btn_ship.webp",
    "image": "/assets/egypt/infographic/celestial_navigation.webp",
    "content": [
      "La navegación por las aguas del río Nilo y por los mares vecinos del Mediterráneo y el Mar Rojo exigía a los marineros del Antiguo Egipto un dominio consumado de la orientación astronómica nocturna. Sin brújulas magnéticas, que no se inventarían hasta dos mil años después en China, ni cartas náuticas impresas, las estrellas fijas y la banda resplandeciente de la Vía Láctea constituían los únicos faros fiables en la inmensidad de las tinieblas.",
      "Los timoneles egipcios memorizaban de memoria las posiciones relativas de las constelaciones boreales y australes a lo largo de las estaciones. Para mantener el rumbo hacia el norte siguiendo la corriente natural del río, bastaba con alinear la proa con la constelación de Meskhetiu (la Osa Mayor) y con la estrella Thuban, que indicaba el polo norte geográfico. Para navegar hacia el sur contra la corriente impulsados por las velas, se guiaban por la constelación de Sah (Orión) y Canopo.",
      "En los viajes marítimos de larga distancia hacia la tierra de Punt, impulsados por la reina Hatshepsut a través del Mar Rojo, los capitanes navales debían afrontar arrecifes de coral mortíferos y corrientes cambiantes. La observación rigurosa del ángulo de elevación de las estrellas sobre el horizonte con instrumentos simples de madera graduada permitía a los marinos calcular si su navío se estaba desplazando demasiado hacia el este o manteniéndose paralelo a la costa africana.",
      "La Vía Láctea funcionaba además como un barómetro celeste y una guía meteorológica estacional. La mayor o menor nitidez de su estructura polvorienta permitía a los vigías predecir cambios en la transparencia atmosférica, advirtiendo sobre la llegada inminente de los vientos abrasadores y secos del desierto conocidos como el Khamsin, que levantaban tormentas de polvo capaces de cegar a tripulaciones enteras durante días.",
      "Esta estrecha comunión práctica entre el arte de la navegación fluvial y la astronomía observacional impregnó todo el lenguaje y la cultura del pueblo egipcio. El acto de timonear una barca por las aguas del Nilo se convirtió en la metáfora universal para describir cómo el alma justa debía gobernar sus pensamientos y pasiones éticas para mantenerse siempre en el cauce correcto de la verdad y el orden cósmico de Maat."
    ],
    "fact": "Las flotas comerciales del Imperio Nuevo navegaban más de mil ochocientos kilómetros a lo largo de las peligrosas aguas del Mar Rojo guiándose exclusivamente por la culminación estelar de Canopo y Sirio con una precisión angular estimada en menos de un grado náutico, transportando mirra, ébano, oro y resinas aromáticas para los templos tebanos de Amón.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los navegantes egipcios utilizaban gaviotas y palomas mensajeras a bordo de sus barcos en el Mar Rojo. Cuando dudaban de su cercanía a la costa durante la noche, soltaban un ave en la alborada: si regresaba al mástil, continuaban mar adentro; si volaba en línea recta, seguían su rumbo hacia tierra firme."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La estrella Canopo (Alfa Carinae), la segunda más brillante del firmamento nocturno con magnitud aparente de menos cero coma setenta y cuatro, se elevaba a escasos grados del horizonte sur de Tebas, sirviendo como una brújula polar meridional natural para los navegantes del Nilo, permitiendo mantener rumbos marítimos certeros en las largas travesías mercantiles hacia la mítica tierra de Punt."
      }
    ]
  },
  {
    "id": "galaxia-numeros",
    "bannerImage": "/assets/egypt/infographic_m11/banner_thoth-escriba.webp",
    "title": "Nuestra Galaxia en Números",
    "color": "#00E4FF",
    "btnImage": "/assets/egypt/infographic/btn_galaxy.webp",
    "image": "/assets/egypt/infographic/galaxy_numbers.webp",
    "content": [
      "El misterioso Nilo Celestial que los antiguos sacerdotes de Heliópolis y Tebas contemplaban con asombro reverente es, en la realidad científica moderna, una colosal metrópolis estelar de dimensiones que desafían la imaginación humana. La Vía Láctea es una galaxia espiral barrada gigantesca clasificada como SBbc, compuesta por una densa barra central de estrellas maduras de la que se desprenden majestuosos brazos espirales cargados de gas y polvo cósmico.",
      "El diámetro del disco estelar de nuestra galaxia abarca aproximadamente cien mil años luz de extremo a extremo, lo que equivale a la pasmosa distancia de casi un trillón de kilómetros (nueve coma cuarenta y seis por diez elevado a diecisiete kilómetros). Para cruzar la galaxia de lado a lado, un haz de luz láser viajando a trescientos mil kilómetros por segundo tardaría cien mil años terrestres en completar su recorrido a través del vacío.",
      "En el interior de este torbellino cósmico habitan entre cien mil millones y cuatrocientos mil millones de estrellas individuales, acompañadas por una cantidad similar o superior de planetas extrasolares. Nuestro propio sistema solar, con su modesto Sol y sus ocho planetas, se ubica en el Brazo de Orión-Cisne, situado a unos veintiséis mil años luz de distancia del turbulento agujero negro supermasivo que reina en el Centro Galáctico de Sagitario.",
      "La Vía Láctea no es una estructura estática, sino un sistema dinámico en rotación continua. Todo nuestro sistema solar viaja en órbita alrededor del centro galáctico a una velocidad vertiginosa de ochocientos veintiocho mil kilómetros por hora (doscientos treinta kilómetros por segundo). A ese ritmo colosal, el Sol tarda unos doscientos treinta millones de años en completar una sola vuelta galáctica, intervalo temporal denominado un año cósmico.",
      "La masa total de la Vía Láctea, sumando sus estrellas luminosas, sus nubes de gas molecular, sus agujeros negros estelares y el gigantesco halo invisible de materia oscura que la envuelve, se estima en aproximadamente uno coma cinco billones de masas solares. Comparada con aquella diosa Nut que los egipcios imaginaban tocando los confines del horizonte, la realidad astronómica resulta ser infinitamente más vasta, misteriosa y sublime."
    ],
    "fact": "La Vía Láctea contiene entre 100.000 y 400.000 millones de estrellas distribuidas en un disco de 100.000 años luz de diámetro con una masa estimada de 1,5 billones de masas solares, orbitando su centro a 230 kilómetros por segundo, dimensiones cósmicas que empequeñecen las mayores construcciones erigidas por la civilización en las orillas del río Nilo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La última vez que nuestro sistema solar estuvo en la misma posición relativa de su órbita alrededor de la Vía Láctea, hace doscientos treinta millones de años (un año cósmico), los primeros dinosaurios del período Triásico apenas comenzaban a poblar la superficie de la Tierra, ilustrando la escala temporal vertiginosa que separa la vida biológica de los ciclos orbitales de nuestra galaxia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Más del ochenta y cinco por ciento de la masa gravitatoria total de la Vía Láctea no emite ninguna radiación electromagnética detectable y está compuesta por materia oscura no bariónica, cuya presencia solo se deduce por sus efectos gravitacionales sobre la curva de rotación de las estrellas periféricas."
      }
    ]
  }
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
                {/* Paragraph number badge */}
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

        {/* â”€â”€â”€ Fact Box (styled as pull-quote) â”€â”€â”€ */}
                      {node.bannerImage && (
                <div className="relative w-full rounded-xl overflow-hidden mb-6" style={{aspectRatio:'16/5'}}>
                  <img
                    src={node.bannerImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium leading-tight">
                    {node.caption}
                  </p>
                </div>
              )}
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
