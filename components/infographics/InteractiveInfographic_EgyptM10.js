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

function DecoMeteor({ size = 80, color = '#B0C4DE', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="62" cy="34" rx="10" ry="8" fill={color} opacity="0.5" />
      <path d="M52 34 L8 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M50 30 L14 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M54 38 L18 18" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <circle cx="8" cy="10" r="2" fill={color} opacity="0.4" />
      <circle cx="20" cy="16" r="1.5" fill={color} opacity="0.3" />
      <circle cx="35" cy="8" r="1" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoDagger({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 24 70" style={{ opacity: 0.2, ...style }}>
      <path d="M12 2 L16 24 L14 48 L12 52 L10 48 L8 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      <rect x="8" y="52" width="8" height="4" rx="1" fill={color} opacity="0.5" />
      <rect x="6" y="56" width="12" height="3" rx="1.5" fill={color} opacity="0.4" />
      <line x1="2" y1="57" x2="22" y2="57" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <circle cx="12" cy="64" r="3" fill={color} opacity="0.4" />
      <circle cx="12" cy="14" r="2" fill={color} opacity="0.5" />
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
  'metal-cielo': [DecoMeteor, DecoStarCluster, DecoDagger],
  'daga-forja': [DecoDagger, DecoAnkh, DecoScarab],
  'tumba-tut': [DecoScarab, DecoPyramid, DecoAnkh],
  'rayos-x': [DecoStarCluster, DecoEye, DecoMeteor],
  'meteoritos-mundo': [DecoMeteor, DecoPyramid, DecoStarCluster],
  'supernova-origen': [DecoStarCluster, DecoMeteor, DecoSerpent],
  'tesoro-museo': [DecoScarab, DecoDagger, DecoEye],
  'legado-cosmico': [DecoMeteor, DecoStarCluster, DecoDagger],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Comelli, D. et al. (2016). The meteoritic origin of Tutankhamun\'s iron dagger blade, Meteoritics & Planetary Science, 51',
  'Johnson, D. et al. (2013). Analysis of a prehistoric Egyptian iron bead, Meteoritics & Planetary Science, 48',
  'Carter, H. & Mace, A.C. (1923). The Tomb of Tut-Ankh-Amen, Cassell & Co.',
  'Rehren, T. & Pusch, E. (2005). Late Bronze Age glass production at Qantir, Science, 308',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'metal-cielo',
    title: 'El Metal del Cielo',
    color: '#B0C4DE',
    btnImage: '/assets/egypt/infographic_daga/btn_metal.png',
    image: '/assets/egypt/infographic_daga/hero_metal.png',
    content: [
      'Imagina que encuentras una piedra brillante y pesada en medio del desierto. No es como las demás piedras: es oscura, metálica y parece que alguien la dejó caer del cielo. Los antiguos egipcios encontraban piedras así y las llamaban \'ba en pet\', que significa \'¡el metal del cielo!\' Y resulta que tenían toda la razón: ese metal había caído literalmente del espacio exterior.',
      'Hace 3,300 años, los egipcios no conocían el hierro. Sus espadas, herramientas y joyas eran de bronce (una mezcla de cobre y estaño). El hierro era tan raro que valía más que el oro. Solo podían obtenerlo de una fuente misteriosa: rocas oscuras y pesadas que a veces aparecían en el desierto del Sahara después de luces brillantes en el cielo nocturno.',
      'Hoy sabemos que esas rocas son meteoritos de hierro: fragmentos de asteroides que viajaron por el espacio durante millones de años antes de caer a la Tierra. Cuando un asteroide se forma en el sistema solar, su centro se llena de hierro mezclado con níquel (entre 5% y 35%) y un poquito de cobalto. Es como el relleno metálico de una pelota cósmica gigante.',
      'En 2016, científicos italianos y egipcios usaron una técnica llamada fluorescencia de rayos X (imagina una linterna especial que puede ver de qué está hecho algo por dentro sin romperlo) para analizar la daga de Tutankamón. Descubrieron que la hoja contiene 11% de níquel y 0.6% de cobalto — ¡exactamente la receta de un meteorito!',
      'El desierto del Sahara es uno de los mejores lugares del mundo para encontrar meteoritos, porque son piedras negras sobre arena dorada, como encontrar un botón oscuro en una sábana blanca. Los egipcios los recogían desde hacía miles de años antes de Tutankamón.',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: '¿Sabías que la palabra "hierro" en muchos idiomas antiguos significa "metal del cielo"? En sumerio es "AN.BAR" (fuego del cielo), en hitita "KU.AN" (metal del cielo), y en copto egipcio "benipe" (maravilla del cielo). ¡Todas las civilizaciones antiguas sabían que venía del espacio!',
  },
  {
    id: 'daga-forja',
    title: 'Forjando Estrellas',
    color: '#FF8C42',
    btnImage: '/assets/egypt/infographic_daga/btn_forja.png',
    image: '/assets/egypt/infographic_daga/hero_forja.png',
    content: [
      'Imagina que intentas moldear una moneda usando solo un martillo y una roca caliente. Ahora imagina que esa moneda está hecha del metal más duro que conoces. ¡Así de difícil era trabajar el hierro meteorítico! Los artesanos egipcios lograron algo increíble: convertir un trozo de roca espacial en una daga elegante y afilada.',
      'El hierro meteorítico es mucho más duro que el bronce porque contiene cristales de una aleación especial llamada kamacita y taenita (mezclas naturales de hierro y níquel que solo se forman en el espacio, donde el metal se enfría durante millones de años). Si lo calientas demasiado, se agrieta. Si lo golpeas muy fuerte, se rompe.',
      'Los artesanos descubrieron una técnica genial: el forjado en frío. En lugar de calentar el metal hasta que estuviera rojo (como hacemos hoy con el acero), lo martillaban a temperatura baja, dándole forma poco a poco con miles de golpes precisos. Es como moldear plastilina fría: lento pero efectivo.',
      'La hoja resultante tiene 34.2 centímetros de largo y es sorprendentemente delgada y equilibrada. Los análisis con microscopio electrónico muestran líneas de Widmanstätten: patrones geométricos que solo aparecen en el hierro que se enfrió en el espacio durante millones de años. Son como las huellas digitales del meteorito original.',
      'La empuñadura es una obra maestra: oro puro con incrustaciones de granito rojo, cristal de roca y lapislázuli azul (traído desde Afganistán, a 5,000 km de distancia). El pomo tiene un diseño de flores de loto y estrellas. Una sola daga combinaba metal del espacio, oro de Nubia y piedras de Asia Central.',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: 'Las líneas de Widmanstätten son tan únicas que funcionan como "huellas digitales" de cada meteorito. Solo se forman cuando el hierro-níquel se enfría a una velocidad de 1-100 grados cada millón de años — algo imposible de replicar en la Tierra. ¡Es la prueba definitiva de que algo vino del espacio!',
  },
  {
    id: 'tumba-tut',
    title: 'La Tumba del Faraón Niño',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_daga/btn_tumba.png',
    image: '/assets/egypt/infographic_daga/hero_tumba.png',
    content: [
      'Tutankamón se convirtió en faraón cuando tenía solo 9 años, ¡más o menos tu edad! Imagina que un día te dicen que eres el rey de todo Egipto. Tendrías tu propio palacio, miles de sirvientes, y la gente te trataría como un dios viviente. Tutankamón vivió eso durante 10 años hasta que murió misteriosamente a los 19.',
      'Cuando Tutankamón murió (alrededor del año 1323 a.C.), fue enterrado en el Valle de los Reyes, un lugar secreto en las montañas de Luxor donde los faraones escondían sus tumbas para protegerlas de los ladrones. Su tumba era pequeña comparada con la de otros faraones, pero estaba llena hasta el techo con más de 5,000 objetos.',
      'Durante 3,245 años, la tumba permaneció escondida bajo toneladas de arena y escombros. Todos los demás faraones habían sido saqueados por ladrones de tumbas. Pero la de Tutankamón sobrevivió intacta gracias a que otra tumba (la de Ramsés VI) fue construida directamente encima, y los escombros de la construcción sellaron la entrada.',
      'El 4 de noviembre de 1922, un niño que cargaba agua para los arqueólogos tropezó con un escalón de piedra. Howard Carter, el arqueólogo británico que llevaba 6 años buscando, excavó y encontró una puerta sellada. Cuando hizo un agujero y acercó una vela, su compañero Lord Carnarvon preguntó: \'¿Puedes ver algo?\' Carter respondió: \'Sí, cosas maravillosas.\'',
      'Carter tardó 10 años en catalogar los 5,398 objetos de la tumba. La daga meteorítica estaba envuelta en las vendas de lino de la momia, colocada junto al muslo derecho. Junto a ella había otra daga de hoja de oro. Los objetos junto al cuerpo eran los más sagrados: acompañarían al faraón en su viaje por el inframundo.',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: '¿Sabías que la famosa "Maldición de Tutankamón" nunca existió? Lord Carnarvon murió por una infección de mosquito, no por ninguna maldición. Howard Carter, quien abrió la tumba y tocó todos los objetos, vivió 17 años más hasta los 64. ¡La ciencia siempre derrota a la superstición!',
  },
  {
    id: 'rayos-x',
    title: 'Detectives con Rayos X',
    color: '#00CED1',
    btnImage: '/assets/egypt/infographic_daga/btn_rayosx.png',
    image: '/assets/egypt/infographic_daga/hero_rayosx.png',
    content: [
      '¿Cómo puedes saber de qué está hecho algo por dentro sin romperlo? Los doctores usan rayos X para ver tus huesos, ¿verdad? Los científicos usan algo parecido pero más sofisticado: la fluorescencia de rayos X portátil (pXRF). Es como una pistola de rayos láser que le dispara rayos X a un objeto y lee los colores de luz que rebotan.',
      'Cada elemento químico (hierro, níquel, cobalto, oro) emite un color de luz diferente cuando los rayos X lo golpean, como si cada átomo tuviera su propia melodía musical. La máquina puede escuchar todas esas melodías al mismo tiempo y decirte exactamente qué ingredientes tiene el objeto. ¡Y todo sin tocarlo!',
      'En 2016, Daniela Comelli y su equipo del Politécnico de Milán apuntaron su pXRF a la hoja de la daga. Los resultados: hierro (Fe), 11% de níquel (Ni) y 0.6% de cobalto (Co). El hierro de la Tierra normalmente tiene menos de 4% de níquel. Pero el hierro de los meteoritos tiene entre 5% y 35%. ¡La daga estaba hecha de metal espacial!',
      'En 2022, Takafumi Matsui de la Universidad de Chiba (Japón) usó una técnica aún más avanzada: mapeo químico por microsonda electrónica. Descubrió que la distribución del níquel en la hoja forma bandas, las famosas líneas de Widmanstätten, confirmando que el hierro se cristalizó en el vacío del espacio.',
      'Los investigadores incluso pudieron identificar de qué tipo de meteorito vino la daga. Por las proporciones de níquel y cobalto, coincide con los meteoritos de tipo octaedrita, que son fragmentos del núcleo de asteroides destruidos hace miles de millones de años. ¡La daga de un faraón de 19 años fue forjada con los restos de un mundo destruido!',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: 'La técnica de fluorescencia de rayos X es la misma que usa la NASA en sus rovers marcianos (Curiosity y Perseverance) para analizar las rocas de Marte. Los mismos rayos X que revelaron el secreto de la daga de Tutankamón buscan señales de vida en otro planeta.',
  },
  {
    id: 'meteoritos-mundo',
    title: 'Meteoritos del Mundo',
    color: '#9B59B6',
    btnImage: '/assets/egypt/infographic_daga/btn_meteoritos.png',
    image: '/assets/egypt/infographic_daga/hero_meteoritos.png',
    content: [
      'Tutankamón no fue el único que usó metal del espacio. ¡Los humanos de todo el mundo han recogido y usado meteoritos desde hace miles de años! Los inuit del Ártico (en Groenlandia y Canadá) forjaron cuchillos, arpones y puntas de lanza usando fragmentos de un meteorito gigante llamado "Cabo York" que cayó hace 10,000 años.',
      'El explorador Robert Peary encontró en 1894 tres enormes trozos del meteorito Cabo York entre los inuit. El más grande, llamado "Ahnighito" (La Tienda), pesa ¡31 toneladas! Los inuit lo habían usado durante generaciones golpeándolo con piedras para arrancar pedazos de hierro. Hoy está en el Museo de Historia Natural de Nueva York.',
      'En la antigua Sumeria (actual Irak), los textos cuneiformes de hace 5,000 años mencionan el hierro como "AN.BAR" (fuego del cielo). Los hititas de Anatolia (actual Turquía) tenían tanto hierro meteorítico que lo usaban como regalo diplomático. ¡Una carta del rey hitita al faraón Ramsés II menciona el envío de una espada de "hierro del cielo"!',
      'El meteorito de Hoba, en Namibia (África del Sur), es el meteorito más grande conocido que sigue donde cayó: pesa ¡60 toneladas! Es tan grande que nadie ha podido moverlo. Los pueblos locales lo veneraban y las comunidades cercanas aún lo visitan como sitio sagrado.',
      'Cada año, unas 48,000 toneladas de material meteorítico caen a la Tierra, pero la mayoría son partículas microscópicas (polvo cósmico). Los meteoritos de hierro grandes (de varios kilos) solo caen unas 5-10 veces por año en todo el planeta. Encontrar uno y forjarlo como hicieron los egipcios era un logro extraordinario.',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: 'El meteorito más caro jamás vendido fue un trozo del meteorito Fukang (China), una pallasita con cristales de olivino (una gema verde) incrustados en hierro-níquel. Un trozo se vendió por 2 millones de dólares. ¡Los meteoritos de hierro son literalmente joyas del espacio!',
  },
  {
    id: 'supernova-origen',
    title: 'Nacidos de Supernovas',
    color: '#E74C3C',
    btnImage: '/assets/egypt/infographic_daga/btn_supernova.png',
    image: '/assets/egypt/infographic_daga/hero_supernova.png',
    content: [
      '¿De dónde viene el hierro del meteorito de Tutankamón? Para responder esto, necesitamos viajar 5 mil millones de años atrás, antes de que existiera la Tierra, el Sol, o nuestro sistema solar. Todo el hierro del universo fue cocinado dentro de estrellas gigantes, como en una cocina cósmica a millones de grados.',
      'Las estrellas funcionan fusionando átomos ligeros para crear átomos más pesados. El Sol convierte hidrógeno en helio. Las estrellas más grandes pueden seguir: helio → carbono → oxígeno → neón → silicio → ¡hierro! El hierro es el último elemento que una estrella puede crear. Es como el último piso de un edificio: cuando una estrella llena su núcleo de hierro, ¡ya no puede producir más energía!',
      'Cuando el núcleo de hierro de una estrella masiva se vuelve demasiado grande, la estrella colapsa sobre sí misma en menos de un segundo y explota en una supernova, una de las explosiones más grandes del universo. La supernova lanza hierro, níquel, cobalto y todos los demás elementos al espacio a velocidades de miles de kilómetros por segundo.',
      'Ese polvo de supernova se mezcló con gas y partículas en una nube cósmica que, hace 4,600 millones de años, empezó a colapsar y girar hasta formar nuestro sistema solar. Los trozos más grandes de hierro y níquel se juntaron para formar los núcleos de asteroides. Cuando esos asteroides chocaron entre sí, se rompieron, y algunos fragmentos cayeron a la Tierra como meteoritos.',
      'Así que el metal de la daga de Tutankamón fue creado en el interior de una estrella que explotó hace miles de millones de años, viajó por el espacio como parte de un asteroide, cayó al Sahara como meteorito, fue recogido por egipcios, forjado por artesanos, y colocado junto al cuerpo de un faraón. ¡Es una historia de 5 mil millones de años resumida en una sola daga!',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: 'Carl Sagan dijo: "Somos materia estelar." Todo el hierro de tu sangre (la hemoglobina que transporta oxígeno) fue forjado dentro de una estrella que explotó hace miles de millones de años. ¡Tú literalmente tienes polvo de estrellas corriendo por tus venas, igual que la daga de Tutankamón!',
  },
  {
    id: 'tesoro-museo',
    title: 'El Tesoro del Museo',
    color: '#F39C12',
    btnImage: '/assets/egypt/infographic_daga/btn_museo.png',
    image: '/assets/egypt/infographic_daga/hero_museo.png',
    content: [
      'Hoy, la daga de Tutankamón descansa en el Gran Museo Egipcio (GEM) de El Cairo, el museo más grande del mundo dedicado a una sola civilización. Miles de personas la ven cada día sin saber que están contemplando metal que viajó por el espacio durante millones de años.',
      'La daga está en una vitrina especial con temperatura y humedad controladas, porque el hierro meteorítico puede oxidarse (convertirse en herrumbre) si no se conserva correctamente. Después de 3,300 años, la hoja sigue en excelentes condiciones gracias al clima seco del desierto egipcio y al sellado hermético de la tumba.',
      'En 2022, un estudio publicado en Meteoritics & Planetary Science analizó 24 objetos de hierro del Antiguo Egipto guardados en museos europeos. Resultado sorprendente: la mayoría de los objetos de hierro más antiguos (antes de 1200 a.C.) eran de origen meteorítico. Los egipcios usaban hierro del espacio ¡mucho antes de aprender a fundir hierro terrestre!',
      'La máscara funeraria de Tutankamón (11 kilos de oro macizo) es probablemente el objeto más famoso del Antiguo Egipto, pero la daga meteorítica es quizás el más fascinante científicamente. Es evidencia física de la conexión entre el espacio exterior y las civilizaciones humanas más antiguas.',
      'Egipto ha construido el nuevo Gran Museo Egipcio cerca de las pirámides de Guiza con un costo de mil millones de dólares. Es el museo arqueológico más grande del mundo, con 480,000 metros cuadrados dedicados a exhibir los tesoros de los faraones. La daga meteorítica de Tutankamón tendrá un lugar de honor en la colección.',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: 'La tumba de Tutankamón contenía 5,398 objetos, incluyendo 6 carros de guerra, 130 bastones, 46 arcos, un trono de oro, sandalias de oro, ropa interior de lino, juegos de mesa, comida deshidratada, vino (¡de 3,300 años!), y hasta un mechón de pelo de su abuela. ¡Era como empacar para el viaje más largo de la historia!',
  },
  {
    id: 'legado-cosmico',
    title: 'Legado Cósmico',
    color: '#1ABC9C',
    btnImage: '/assets/egypt/infographic_daga/btn_legado.png',
    image: '/assets/egypt/infographic_daga/hero_legado.png',
    content: [
      'La daga de Tutankamón nos enseña algo increíble: desde los inicios de la civilización, los humanos hemos sido exploradores del espacio sin saberlo. Cada vez que un antiguo egipcio recogía un meteorito del desierto, estaba haciendo contacto con el cosmos, recuperando material que había viajado millones de kilómetros.',
      'Hoy, la NASA y otras agencias espaciales planean traer muestras de asteroides a la Tierra. La misión OSIRIS-REx de la NASA ya trajo 121 gramos del asteroide Bennu en 2023, y la misión Hayabusa2 de Japón trajo muestras del asteroide Ryugu en 2020. Estamos haciendo exactamente lo que los egipcios hicieron hace 3,300 años: recoger material del espacio.',
      'Los científicos descubrieron que las muestras de Bennu contienen aminoácidos (los bloques de construcción de la vida) y agua. Los asteroides podrían haber sembrado la Tierra con los ingredientes básicos para la vida hace 4,000 millones de años. El hierro meteorítico de la daga es primo hermano de las rocas que quizás trajeron la vida a nuestro planeta.',
      'Algunas empresas como Planetary Resources y AstroForge planean minar asteroides en el futuro. Un solo asteroide metálico de 1 kilómetro podría contener más platino que todo lo que se ha extraído en la historia de la humanidad. La minería espacial convertiría a los asteroides en la fuente de recursos más valiosa del sistema solar.',
      'La daga de Tutankamón es un puente entre el pasado y el futuro. Un artesano egipcio de hace 3,300 años y un ingeniero de la NASA de 2025 comparten el mismo sueño: usar los materiales del espacio para crear algo extraordinario. El faraón niño estaría orgulloso de saber que su daga inspiró a generaciones de científicos a mirar hacia las estrellas.',
      'Estos descubrimientos asombrosos confirman que los artesanos de la corte de Tutankhamón poseían técnicas metalúrgicas altamente avanzadas, capaces de moldear materiales caídos directamente del espacio exterior para forjar objetos dignos de la realeza divina.',
    ],
    fact: 'El asteroide 16 Psyche, que la NASA visitará con su sonda del mismo nombre, es un núcleo expuesto de hierro-níquel de 226 km de diámetro. Si pudiéramos traer todo su metal a la Tierra, valdría aproximadamente 10 quintillones de dólares (¡10 seguido de 18 ceros!). ¡Es del mismo tipo de material que la daga de Tutankamón!',
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

// ─── Dagger Header SVG ──────────────────────────────────────────────────────
function DaggerHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(176,196,222,0.3))' }}>
        {/* Dagger blade silhouette as the arch */}
        <path d="M 300 8 L 310 50 L 306 100 L 300 108 L 294 100 L 290 50 Z" fill="none" stroke="url(#daggerGrad)" strokeWidth="1.5" opacity="0.4" />
        {/* Guard line */}
        <line x1="270" y1="100" x2="330" y2="100" stroke="url(#daggerGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* Arch connector */}
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#daggerGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Stars along the arch */}
        {[80, 150, 220, 380, 450, 520].map((cx, i) => (
          <motion.circle key={i} cx={cx} cy={10 + Math.abs(cx - 300) * 0.15 + 15} r="3" fill="#B0C4DE"
            animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #B0C4DE)' }}
          />
        ))}
        <circle cx="30" cy="110" r="5" fill="rgba(176,196,222,0.6)" />
        <circle cx="570" cy="110" r="5" fill="rgba(176,196,222,0.6)" />
        <circle cx="300" cy="8" r="7" fill="rgba(176,196,222,0.8)" style={{ filter: 'drop-shadow(0 0 8px rgba(176,196,222,0.5))' }} />
        <defs>
          <linearGradient id="daggerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(176,196,222,0.3)" />
            <stop offset="50%" stopColor="rgba(176,196,222,0.9)" />
            <stop offset="100%" stopColor="rgba(176,196,222,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B0C4DE" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA DAGA ESPACIAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(176,196,222,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">METAL DEL CIELO EN MANOS DEL FARAÓN</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(176,196,222,0.2)'}`,
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
          layoutId="activeDotM10"
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
          {/* Floating deco top-right */}
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
                {/* Paragraph number badge */}
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

        {/* ─── Fact Box (styled as pull-quote) ─── */}
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
      border: '1px solid rgba(176,196,222,0.15)',
    }}>
      <Star size={14} style={{ color: '#B0C4DE', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #8BA8C4, #B0C4DE)', borderRadius: '3px', boxShadow: '0 0 8px rgba(176,196,222,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#B0C4DE', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_EgyptM10() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(18,14,26,0.82) 0%, rgba(26,16,40,0.78) 40%, rgba(18,14,26,0.85) 100%), url(/assets/egypt/infographic_daga/bg_daga.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(176,196,222,0.12)',
      boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarField />

      {/* Dagger header */}
      <DaggerHeader />

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
            textAlign: 'center', color: 'rgba(176,196,222,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(176,196,222,0.08)', borderRadius: '16px',
              border: '1px solid rgba(176,196,222,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B0C4DE', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🗡️ ¡Has explorado todos los secretos de la Daga Espacial!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Herrero de Meteoritos
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
