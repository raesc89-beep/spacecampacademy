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

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      'Imagina que encuentras una piedra brillante y pesada en medio del desierto. No es como las demÃ¡s piedras: es oscura, metÃ¡lica y parece que alguien la dejÃ³ caer del cielo. Los antiguos egipcios encontraban piedras asÃ­ y las llamaban \'ba en pet\', que significa \'Â¡el metal del cielo!\' Y resulta que tenÃ­an toda la razÃ³n: ese metal habÃ­a caÃ­do literalmente del espacio exterior.',
      'Hace 3,300 aÃ±os, los egipcios no conocÃ­an el hierro. Sus espadas, herramientas y joyas eran de bronce (una mezcla de cobre y estaÃ±o). El hierro era tan raro que valÃ­a mÃ¡s que el oro. Solo podÃ­an obtenerlo de una fuente misteriosa: rocas oscuras y pesadas que a veces aparecÃ­an en el desierto del Sahara despuÃ©s de luces brillantes en el cielo nocturno.',
      'Hoy sabemos que esas rocas son meteoritos de hierro: fragmentos de asteroides que viajaron por el espacio durante millones de aÃ±os antes de caer a la Tierra. Cuando un asteroide se forma en el sistema solar, su centro se llena de hierro mezclado con nÃ­quel (entre 5% y 35%) y un poquito de cobalto. Es como el relleno metÃ¡lico de una pelota cÃ³smica gigante.',
      'En 2016, cientÃ­ficos italianos y egipcios usaron una tÃ©cnica llamada fluorescencia de rayos X (imagina una linterna especial que puede ver de quÃ© estÃ¡ hecho algo por dentro sin romperlo) para analizar la daga de TutankamÃ³n. Descubrieron que la hoja contiene 11% de nÃ­quel y 0.6% de cobalto â€” Â¡exactamente la receta de un meteorito!',
      'El desierto del Sahara es uno de los mejores lugares del mundo para encontrar meteoritos, porque son piedras negras sobre arena dorada, como encontrar un botÃ³n oscuro en una sÃ¡bana blanca. Los egipcios los recogÃ­an desde hacÃ­a miles de aÃ±os antes de TutankamÃ³n.',
      'Para los egipcios, un material que caÃ­a como estrellas fugaces era un regalo de los dioses, digno de ser entregado Ãºnicamente al soberano de las Dos Tierras.',
    ],
    fact: 'Â¿SabÃ­as que la palabra "hierro" en muchos idiomas antiguos significa "metal del cielo"? En sumerio es "AN.BAR" (fuego del cielo), en hitita "KU.AN" (metal del cielo), y en copto egipcio "benipe" (maravilla del cielo). Â¡Todas las civilizaciones antiguas sabÃ­an que venÃ­a del espacio!',
  },
  {
    id: 'daga-forja',
    title: 'Forjando Estrellas',
    color: '#FF8C42',
    btnImage: '/assets/egypt/infographic_daga/btn_forja.png',
    image: '/assets/egypt/infographic_daga/hero_forja.png',
    content: [
      'Imagina que intentas moldear una moneda usando solo un martillo y una roca caliente. Ahora imagina que esa moneda estÃ¡ hecha del metal mÃ¡s duro que conoces. Â¡AsÃ­ de difÃ­cil era trabajar el hierro meteorÃ­tico! Los artesanos egipcios lograron algo increÃ­ble: convertir un trozo de roca espacial en una daga elegante y afilada.',
      'El hierro meteorÃ­tico es mucho mÃ¡s duro que el bronce porque contiene cristales de una aleaciÃ³n especial llamada kamacita y taenita (mezclas naturales de hierro y nÃ­quel que solo se forman en el espacio, donde el metal se enfrÃ­a durante millones de aÃ±os). Si lo calientas demasiado, se agrieta. Si lo golpeas muy fuerte, se rompe.',
      'Los artesanos descubrieron una tÃ©cnica genial: el forjado en frÃ­o. En lugar de calentar el metal hasta que estuviera rojo (como hacemos hoy con el acero), lo martillaban a temperatura baja, dÃ¡ndole forma poco a poco con miles de golpes precisos. Es como moldear plastilina frÃ­a: lento pero efectivo.',
      'La hoja resultante tiene 34.2 centÃ­metros de largo y es sorprendentemente delgada y equilibrada. Los anÃ¡lisis con microscopio electrÃ³nico muestran lÃ­neas de WidmanstÃ¤tten: patrones geomÃ©tricos que solo aparecen en el hierro que se enfriÃ³ en el espacio durante millones de aÃ±os. Son como las huellas digitales del meteorito original.',
      'La empuÃ±adura es una obra maestra: oro puro con incrustaciones de granito rojo, cristal de roca y lapislÃ¡zuli azul (traÃ­do desde AfganistÃ¡n, a 5,000 km de distancia). El pomo tiene un diseÃ±o de flores de loto y estrellas. Una sola daga combinaba metal del espacio, oro de Nubia y piedras de Asia Central.',
      'Este forjado en frÃ­o a partir de un fragmento de asteroide requiriÃ³ una paciencia y habilidad que asombra incluso a los herreros modernos.',
    ],
    fact: 'Las lÃ­neas de WidmanstÃ¤tten son tan Ãºnicas que funcionan como "huellas digitales" de cada meteorito. Solo se forman cuando el hierro-nÃ­quel se enfrÃ­a a una velocidad de 1-100 grados cada millÃ³n de aÃ±os â€” algo imposible de replicar en la Tierra. Â¡Es la prueba definitiva de que algo vino del espacio!',
  },
  {
    id: 'tumba-tut',
    title: 'La Tumba del FaraÃ³n NiÃ±o',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_daga/btn_tumba.png',
    image: '/assets/egypt/infographic_daga/hero_tumba.png',
    content: [
      'TutankamÃ³n se convirtiÃ³ en faraÃ³n cuando tenÃ­a solo 9 aÃ±os, Â¡mÃ¡s o menos tu edad! Imagina que un dÃ­a te dicen que eres el rey de todo Egipto. TendrÃ­as tu propio palacio, miles de sirvientes, y la gente te tratarÃ­a como un dios viviente. TutankamÃ³n viviÃ³ eso durante 10 aÃ±os hasta que muriÃ³ misteriosamente a los 19.',
      'Cuando TutankamÃ³n muriÃ³ (alrededor del aÃ±o 1323 a.C.), fue enterrado en el Valle de los Reyes, un lugar secreto en las montaÃ±as de Luxor donde los faraones escondÃ­an sus tumbas para protegerlas de los ladrones. Su tumba era pequeÃ±a comparada con la de otros faraones, pero estaba llena hasta el techo con mÃ¡s de 5,000 objetos.',
      'Durante 3,245 aÃ±os, la tumba permaneciÃ³ escondida bajo toneladas de arena y escombros. Todos los demÃ¡s faraones habÃ­an sido saqueados por ladrones de tumbas. Pero la de TutankamÃ³n sobreviviÃ³ intacta gracias a que otra tumba (la de RamsÃ©s VI) fue construida directamente encima, y los escombros de la construcciÃ³n sellaron la entrada.',
      'El 4 de noviembre de 1922, un niÃ±o que cargaba agua para los arqueÃ³logos tropezÃ³ con un escalÃ³n de piedra. Howard Carter, el arqueÃ³logo britÃ¡nico que llevaba 6 aÃ±os buscando, excavÃ³ y encontrÃ³ una puerta sellada. Cuando hizo un agujero y acercÃ³ una vela, su compaÃ±ero Lord Carnarvon preguntÃ³: \'Â¿Puedes ver algo?\' Carter respondiÃ³: \'SÃ­, cosas maravillosas.\'',
      'Carter tardÃ³ 10 aÃ±os en catalogar los 5,398 objetos de la tumba. La daga meteorÃ­tica estaba envuelta en las vendas de lino de la momia, colocada junto al muslo derecho. Junto a ella habÃ­a otra daga de hoja de oro. Los objetos junto al cuerpo eran los mÃ¡s sagrados: acompaÃ±arÃ­an al faraÃ³n en su viaje por el inframundo.',
      'Entre todos los lujos terrenales y tesoros de oro macizo, esta pequeÃ±a hoja de metal extraterrestre era su posesiÃ³n mÃ¡s rara para el viaje al mÃ¡s allÃ¡.',
    ],
    fact: 'Â¿SabÃ­as que la famosa "MaldiciÃ³n de TutankamÃ³n" nunca existiÃ³? Lord Carnarvon muriÃ³ por una infecciÃ³n de mosquito, no por ninguna maldiciÃ³n. Howard Carter, quien abriÃ³ la tumba y tocÃ³ todos los objetos, viviÃ³ 17 aÃ±os mÃ¡s hasta los 64. Â¡La ciencia siempre derrota a la supersticiÃ³n!',
  },
  {
    id: 'rayos-x',
    title: 'Detectives con Rayos X',
    color: '#00CED1',
    btnImage: '/assets/egypt/infographic_daga/btn_rayosx.png',
    image: '/assets/egypt/infographic_daga/hero_rayosx.png',
    content: [
      'Â¿CÃ³mo puedes saber de quÃ© estÃ¡ hecho algo por dentro sin romperlo? Los doctores usan rayos X para ver tus huesos, Â¿verdad? Los cientÃ­ficos usan algo parecido pero mÃ¡s sofisticado: la fluorescencia de rayos X portÃ¡til (pXRF). Es como una pistola de rayos lÃ¡ser que le dispara rayos X a un objeto y lee los colores de luz que rebotan.',
      'Cada elemento quÃ­mico (hierro, nÃ­quel, cobalto, oro) emite un color de luz diferente cuando los rayos X lo golpean, como si cada Ã¡tomo tuviera su propia melodÃ­a musical. La mÃ¡quina puede escuchar todas esas melodÃ­as al mismo tiempo y decirte exactamente quÃ© ingredientes tiene el objeto. Â¡Y todo sin tocarlo!',
      'En 2016, Daniela Comelli y su equipo del PolitÃ©cnico de MilÃ¡n apuntaron su pXRF a la hoja de la daga. Los resultados: hierro (Fe), 11% de nÃ­quel (Ni) y 0.6% de cobalto (Co). El hierro de la Tierra normalmente tiene menos de 4% de nÃ­quel. Pero el hierro de los meteoritos tiene entre 5% y 35%. Â¡La daga estaba hecha de metal espacial!',
      'En 2022, Takafumi Matsui de la Universidad de Chiba (JapÃ³n) usÃ³ una tÃ©cnica aÃºn mÃ¡s avanzada: mapeo quÃ­mico por microsonda electrÃ³nica. DescubriÃ³ que la distribuciÃ³n del nÃ­quel en la hoja forma bandas, las famosas lÃ­neas de WidmanstÃ¤tten, confirmando que el hierro se cristalizÃ³ en el vacÃ­o del espacio.',
      'Los investigadores incluso pudieron identificar de quÃ© tipo de meteorito vino la daga. Por las proporciones de nÃ­quel y cobalto, coincide con los meteoritos de tipo octaedrita, que son fragmentos del nÃºcleo de asteroides destruidos hace miles de millones de aÃ±os. Â¡La daga de un faraÃ³n de 19 aÃ±os fue forjada con los restos de un mundo destruido!',
      'La tecnologÃ­a de fluorescencia revelÃ³ que la hoja del rey adolescente fue forjada con los restos metÃ¡licos de un cuerpo celeste destruido en los albores del universo.',
    ],
    fact: 'La tÃ©cnica de fluorescencia de rayos X es la misma que usa la NASA en sus rovers marcianos (Curiosity y Perseverance) para analizar las rocas de Marte. Los mismos rayos X que revelaron el secreto de la daga de TutankamÃ³n buscan seÃ±ales de vida en otro planeta.',
  },
  {
    id: 'meteoritos-mundo',
    title: 'Meteoritos del Mundo',
    color: '#9B59B6',
    btnImage: '/assets/egypt/infographic_daga/btn_meteoritos.png',
    image: '/assets/egypt/infographic_daga/hero_meteoritos.png',
    content: [
      'TutankamÃ³n no fue el Ãºnico que usÃ³ metal del espacio. Â¡Los humanos de todo el mundo han recogido y usado meteoritos desde hace miles de aÃ±os! Los inuit del Ãrtico (en Groenlandia y CanadÃ¡) forjaron cuchillos, arpones y puntas de lanza usando fragmentos de un meteorito gigante llamado "Cabo York" que cayÃ³ hace 10,000 aÃ±os.',
      'El explorador Robert Peary encontrÃ³ en 1894 tres enormes trozos del meteorito Cabo York entre los inuit. El mÃ¡s grande, llamado "Ahnighito" (La Tienda), pesa Â¡31 toneladas! Los inuit lo habÃ­an usado durante generaciones golpeÃ¡ndolo con piedras para arrancar pedazos de hierro. Hoy estÃ¡ en el Museo de Historia Natural de Nueva York.',
      'En la antigua Sumeria (actual Irak), los textos cuneiformes de hace 5,000 aÃ±os mencionan el hierro como "AN.BAR" (fuego del cielo). Los hititas de Anatolia (actual TurquÃ­a) tenÃ­an tanto hierro meteorÃ­tico que lo usaban como regalo diplomÃ¡tico. Â¡Una carta del rey hitita al faraÃ³n RamsÃ©s II menciona el envÃ­o de una espada de "hierro del cielo"!',
      'El meteorito de Hoba, en Namibia (Ãfrica del Sur), es el meteorito mÃ¡s grande conocido que sigue donde cayÃ³: pesa Â¡60 toneladas! Es tan grande que nadie ha podido moverlo. Los pueblos locales lo veneraban y las comunidades cercanas aÃºn lo visitan como sitio sagrado.',
      'Cada aÃ±o, unas 48,000 toneladas de material meteorÃ­tico caen a la Tierra, pero la mayorÃ­a son partÃ­culas microscÃ³picas (polvo cÃ³smico). Los meteoritos de hierro grandes (de varios kilos) solo caen unas 5-10 veces por aÃ±o en todo el planeta. Encontrar uno y forjarlo como hicieron los egipcios era un logro extraordinario.',
      'Antes de aprender a extraer mineral de las minas, el cielo fue la Ãºnica mina de hierro que la humanidad conociÃ³ para crear herramientas indestructibles.',
    ],
    fact: 'El meteorito mÃ¡s caro jamÃ¡s vendido fue un trozo del meteorito Fukang (China), una pallasita con cristales de olivino (una gema verde) incrustados en hierro-nÃ­quel. Un trozo se vendiÃ³ por 2 millones de dÃ³lares. Â¡Los meteoritos de hierro son literalmente joyas del espacio!',
  },
  {
    id: 'supernova-origen',
    title: 'Nacidos de Supernovas',
    color: '#E74C3C',
    btnImage: '/assets/egypt/infographic_daga/btn_supernova.png',
    image: '/assets/egypt/infographic_daga/hero_supernova.png',
    content: [
      'Â¿De dÃ³nde viene el hierro del meteorito de TutankamÃ³n? Para responder esto, necesitamos viajar 5 mil millones de aÃ±os atrÃ¡s, antes de que existiera la Tierra, el Sol, o nuestro sistema solar. Todo el hierro del universo fue cocinado dentro de estrellas gigantes, como en una cocina cÃ³smica a millones de grados.',
      'Las estrellas funcionan fusionando Ã¡tomos ligeros para crear Ã¡tomos mÃ¡s pesados. El Sol convierte hidrÃ³geno en helio. Las estrellas mÃ¡s grandes pueden seguir: helio â†’ carbono â†’ oxÃ­geno â†’ neÃ³n â†’ silicio â†’ Â¡hierro! El hierro es el Ãºltimo elemento que una estrella puede crear. Es como el Ãºltimo piso de un edificio: cuando una estrella llena su nÃºcleo de hierro, Â¡ya no puede producir mÃ¡s energÃ­a!',
      'Cuando el nÃºcleo de hierro de una estrella masiva se vuelve demasiado grande, la estrella colapsa sobre sÃ­ misma en menos de un segundo y explota en una supernova, una de las explosiones mÃ¡s grandes del universo. La supernova lanza hierro, nÃ­quel, cobalto y todos los demÃ¡s elementos al espacio a velocidades de miles de kilÃ³metros por segundo.',
      'Ese polvo de supernova se mezclÃ³ con gas y partÃ­culas en una nube cÃ³smica que, hace 4,600 millones de aÃ±os, empezÃ³ a colapsar y girar hasta formar nuestro sistema solar. Los trozos mÃ¡s grandes de hierro y nÃ­quel se juntaron para formar los nÃºcleos de asteroides. Cuando esos asteroides chocaron entre sÃ­, se rompieron, y algunos fragmentos cayeron a la Tierra como meteoritos.',
      'AsÃ­ que el metal de la daga de TutankamÃ³n fue creado en el interior de una estrella que explotÃ³ hace miles de millones de aÃ±os, viajÃ³ por el espacio como parte de un asteroide, cayÃ³ al Sahara como meteorito, fue recogido por egipcios, forjado por artesanos, y colocado junto al cuerpo de un faraÃ³n. Â¡Es una historia de 5 mil millones de aÃ±os resumida en una sola daga!',
      'Saber que un arma egipcia antigua estÃ¡ forjada con la explosiÃ³n final de una estrella moribunda conecta la arqueologÃ­a terrestre con la astrofÃ­sica mÃ¡s extrema.',
    ],
    fact: 'Carl Sagan dijo: "Somos materia estelar." Todo el hierro de tu sangre (la hemoglobina que transporta oxÃ­geno) fue forjado dentro de una estrella que explotÃ³ hace miles de millones de aÃ±os. Â¡TÃº literalmente tienes polvo de estrellas corriendo por tus venas, igual que la daga de TutankamÃ³n!',
  },
  {
    id: 'tesoro-museo',
    title: 'El Tesoro del Museo',
    color: '#F39C12',
    btnImage: '/assets/egypt/infographic_daga/btn_museo.png',
    image: '/assets/egypt/infographic_daga/hero_museo.png',
    content: [
      'Hoy, la daga de TutankamÃ³n descansa en el Gran Museo Egipcio (GEM) de El Cairo, el museo mÃ¡s grande del mundo dedicado a una sola civilizaciÃ³n. Miles de personas la ven cada dÃ­a sin saber que estÃ¡n contemplando metal que viajÃ³ por el espacio durante millones de aÃ±os.',
      'La daga estÃ¡ en una vitrina especial con temperatura y humedad controladas, porque el hierro meteorÃ­tico puede oxidarse (convertirse en herrumbre) si no se conserva correctamente. DespuÃ©s de 3,300 aÃ±os, la hoja sigue en excelentes condiciones gracias al clima seco del desierto egipcio y al sellado hermÃ©tico de la tumba.',
      'En 2022, un estudio publicado en Meteoritics & Planetary Science analizÃ³ 24 objetos de hierro del Antiguo Egipto guardados en museos europeos. Resultado sorprendente: la mayorÃ­a de los objetos de hierro mÃ¡s antiguos (antes de 1200 a.C.) eran de origen meteorÃ­tico. Los egipcios usaban hierro del espacio Â¡mucho antes de aprender a fundir hierro terrestre!',
      'La mÃ¡scara funeraria de TutankamÃ³n (11 kilos de oro macizo) es probablemente el objeto mÃ¡s famoso del Antiguo Egipto, pero la daga meteorÃ­tica es quizÃ¡s el mÃ¡s fascinante cientÃ­ficamente. Es evidencia fÃ­sica de la conexiÃ³n entre el espacio exterior y las civilizaciones humanas mÃ¡s antiguas.',
      'Egipto ha construido el nuevo Gran Museo Egipcio cerca de las pirÃ¡mides de Guiza con un costo de mil millones de dÃ³lares. Es el museo arqueolÃ³gico mÃ¡s grande del mundo, con 480,000 metros cuadrados dedicados a exhibir los tesoros de los faraones. La daga meteorÃ­tica de TutankamÃ³n tendrÃ¡ un lugar de honor en la colecciÃ³n.',
      'Este descubrimiento cientÃ­fico ha transformado una daga ya legendaria en la pieza de arqueoastronomÃ­a mÃ¡s fascinante que sobrevive de la Edad del Bronce.',
    ],
    fact: 'La tumba de TutankamÃ³n contenÃ­a 5,398 objetos, incluyendo 6 carros de guerra, 130 bastones, 46 arcos, un trono de oro, sandalias de oro, ropa interior de lino, juegos de mesa, comida deshidratada, vino (Â¡de 3,300 aÃ±os!), y hasta un mechÃ³n de pelo de su abuela. Â¡Era como empacar para el viaje mÃ¡s largo de la historia!',
  },
  {
    id: 'legado-cosmico',
    title: 'Legado CÃ³smico',
    color: '#1ABC9C',
    btnImage: '/assets/egypt/infographic_daga/btn_legado.png',
    image: '/assets/egypt/infographic_daga/hero_legado.png',
    content: [
      'La daga de TutankamÃ³n nos enseÃ±a algo increÃ­ble: desde los inicios de la civilizaciÃ³n, los humanos hemos sido exploradores del espacio sin saberlo. Cada vez que un antiguo egipcio recogÃ­a un meteorito del desierto, estaba haciendo contacto con el cosmos, recuperando material que habÃ­a viajado millones de kilÃ³metros.',
      'Hoy, la NASA y otras agencias espaciales planean traer muestras de asteroides a la Tierra. La misiÃ³n OSIRIS-REx de la NASA ya trajo 121 gramos del asteroide Bennu en 2023, y la misiÃ³n Hayabusa2 de JapÃ³n trajo muestras del asteroide Ryugu en 2020. Estamos haciendo exactamente lo que los egipcios hicieron hace 3,300 aÃ±os: recoger material del espacio.',
      'Los cientÃ­ficos descubrieron que las muestras de Bennu contienen aminoÃ¡cidos (los bloques de construcciÃ³n de la vida) y agua. Los asteroides podrÃ­an haber sembrado la Tierra con los ingredientes bÃ¡sicos para la vida hace 4,000 millones de aÃ±os. El hierro meteorÃ­tico de la daga es primo hermano de las rocas que quizÃ¡s trajeron la vida a nuestro planeta.',
      'Algunas empresas como Planetary Resources y AstroForge planean minar asteroides en el futuro. Un solo asteroide metÃ¡lico de 1 kilÃ³metro podrÃ­a contener mÃ¡s platino que todo lo que se ha extraÃ­do en la historia de la humanidad. La minerÃ­a espacial convertirÃ­a a los asteroides en la fuente de recursos mÃ¡s valiosa del sistema solar.',
      'La daga de TutankamÃ³n es un puente entre el pasado y el futuro. Un artesano egipcio de hace 3,300 aÃ±os y un ingeniero de la NASA de 2025 comparten el mismo sueÃ±o: usar los materiales del espacio para crear algo extraordinario. El faraÃ³n niÃ±o estarÃ­a orgulloso de saber que su daga inspirÃ³ a generaciones de cientÃ­ficos a mirar hacia las estrellas.',
      'Al estudiar estos meteoritos antiguos, los arqueÃ³logos modernos y los cientÃ­ficos espaciales comparten la misma fascinaciÃ³n por los misterios ocultos en las rocas del cielo.',
    ],
    fact: 'El asteroide 16 Psyche, que la NASA visitarÃ¡ con su sonda del mismo nombre, es un nÃºcleo expuesto de hierro-nÃ­quel de 226 km de diÃ¡metro. Si pudiÃ©ramos traer todo su metal a la Tierra, valdrÃ­a aproximadamente 10 quintillones de dÃ³lares (Â¡10 seguido de 18 ceros!). Â¡Es del mismo tipo de material que la daga de TutankamÃ³n!',
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

// â”€â”€â”€ Dagger Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(176,196,222,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">METAL DEL CIELO EN MANOS DEL FARAÃ“N</text>
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
                Dato CientÃ­fico
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

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM10() {
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
          <ChevronRight size={14} /> Toca cada cÃ­rculo para explorar <ChevronRight size={14} />
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
              background: 'rgba(176,196,222,0.08)', borderRadius: '16px',
              border: '1px solid rgba(176,196,222,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B0C4DE', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ—¡ï¸ Â¡Has explorado todos los secretos de la Daga Espacial!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Herrero de Meteoritos
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
