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
  'Johnson, D. Et al. (2013). Analysis of a prehistoric Egyptian iron bead, Meteoritics & Planetary Science, 48',
  'Carter, H. & Mace, A.C. (1923). The Tomb of Tut-Ankh-Amen, Cassell & Co.',
  'Rehren, T. & Pusch, E. (2005). Late Bronze Age glass production at Qantir, Science, 308',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "metal-cielo",
    "bannerImage": "/assets/egypt/infographic_m10/banner_alineacion-astronomica.webp",
    "title": "El Metal del Cielo",
    "color": "#B0C4DE",
    "btnImage": "/assets/egypt/infographic_daga/btn_metal.webp",
    "image": "/assets/egypt/infographic_daga/hero_metal.webp",
    "content": [
      "Muchos siglos antes de que la civilización del Nilo dominara la metalurgia de fundición del hierro terrestre a partir de minerales como la hematita y la magnetita, los artesanos egipcios ya utilizaban un tipo de hierro sumamente raro y enigmático. Este material no procedía de minas excavadas en la tierra, sino de fragmentos incandescentes que caían directamente del firmamento estrellado durante el impacto de lluvias de meteoritos sobre el desierto.",
      "En la lengua jeroglífica del Reino Nuevo, este metal milagroso recibió la denominación explícita de «biA n pt», que se traduce literalmente como «hierro del cielo». Esta designación demuestra de forma inequívoca que los sacerdotes y sabios egipcios eran plenamente conscientes del origen extraterrestre de estos fragmentos pétreo-metálicos, reconociendo que los bólidos luminosos que surcaban la noche dejaban caer piedras preñadas de metal incorruptible.",
      "El testimonio arqueológico más antiguo de este fenómeno en Egipto data de la época predinástica, hacia el año 3200 antes de nuestra era. En la necrópolis de El-Gerzeh, unos setenta kilómetros al sur de El Cairo, el arqueólogo Flinders Petrie desenterró collares funerarios con pequeñas cuentas tubulares ensartadas con oro, lapislázuli y cornalina. Los análisis químicos modernos confirmaron que las cuentas metálicas fueron fabricadas martillando láminas finas de hierro meteorítico.",
      "Para los egipcios, el hierro del cielo no era simplemente una materia prima útil para fabricar armas ordinarias, sino una sustancia sagrada cargada de poder divino. Al haber tocado la carne intangible de la diosa Nut (la personificación de la bóveda celeste), se consideraba que el metal cósmico poseía la energía vital de las estrellas imperecederas. Solo los dioses supremos y los faraones tenían el privilegio espiritual de poseer y portar objetos modelados con este material estelar.",
      "La rareza extrema del hierro meteorítico lo convertía en un tesoro mucho más valioso y codiciado que el propio oro o la plata. Durante la Edad del Bronce, poseer una pequeña hoja o un amuleto forjado con este metal procedente del espacio exterior era un símbolo de estatus cósmico supremo, reservado exclusivamente para ajuares funerarios reales capaces de abrir las puertas de la inmortalidad en el Más Allá."
    ],
    "fact": "El término jeroglífico «biA n pt» (hierro del cielo) fue acuñado oficialmente en la Dinastía XIX, pero los análisis arqueometalúrgicos demuestran que Egipto ya forjaba cuentas tubulares de meteorito en el 3200 a.C., dos milenios antes de dominar la reducción de mineral de hierro terrestre, como lo prueban los ajuares predinásticos hallados en las necrópolis de El Gerzeh.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las cuentas de collar halladas en El-Gerzeh tienen más de cinco mil años de antigüedad y demuestran que los artesanos predinásticos sabían doblar y enrollar láminas metálicas de origen espacial alrededor de cañas vegetales con una delicadeza técnica extraordinaria, mucho antes de la invención de los fuelles de fundición."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El hierro de origen meteorítico se distingue del hierro fundido terrestre por su concentración anómala de níquel (generalmente superior al cuatro por ciento en masa) y proporciones diagnósticas de cobalto, galio y germanio, elementos siderófilos que se concentraron en los núcleos de asteroides protoplanetarios diferenciados."
      }
    ]
  },
  {
    "id": "daga-forja",
    "bannerImage": "/assets/egypt/infographic_m10/banner_esfinge-giza.webp",
    "title": "Forjando Estrellas",
    "color": "#FF8C42",
    "btnImage": "/assets/egypt/infographic_daga/btn_forja.webp",
    "image": "/assets/egypt/infographic_daga/hero_forja.webp",
    "content": [
      "La forja de una hoja a partir de un fragmento de meteorito metálico representaba una proeza metalúrgica casi imposible para los herreros de la Edad del Bronce. El hierro meteorítico natural es extraordinariamente duro, tenaz y quebradizo debido a su alto contenido en níquel y a su compleja estructura cristalina interna. Intentar moldearlo en frío mediante martilleo directo suele provocar fracturas catastróficas a lo largo de los planos de exfoliación cristalina.",
      "Para fabricar la célebre daga de hierro de Tutankhamun, los maestros armeros debieron aplicar un calentamiento térmico rigurosamente controlado a temperaturas intermedias, estimadas por los metalúrgicos modernos entre setecientos y ochocientos grados Celsius. A estas temperaturas de trabajo, el metal adquiere plasticidad suficiente para ser forjado mediante golpes rítmicos de percutores de piedra pulida, sin llegar a fundir la masa ni borrar por completo su microestructura cósmica.",
      "La hoja resultante mide treinta y cuatro coma dos centímetros de longitud total y presenta un pulido superficial impecable, con dos filos perfectamente aguzados y un nervio central que le otorga una rigidez geométrica asombrosa. A diferencia de las armas de bronce de la época, que sufrían melladuras continuas durante el combate y requerían afilados constantes, el hierro enriquecido con níquel ofrecía una tenacidad mecánica y un filo incomparablemente superiores.",
      "La empuñadura de la daga es otra cumbre de la orfebrería antigua: está elaborada en oro macizo repujado con incrustaciones de pasta de vidrio azul, cornalina y cristal de roca natural, culminando en un pomo de cristal de roca tallado con facetas octogonales. La vaina protectora, también de oro puro, está cincelada en su anverso con un elegante motivo floral de lirios entrelazados y en su reverso con una escena de caza protagonizada por cabras montesas.",
      "Estudios recientes de microscopía electrónica realizados en 2022 por científicos japoneses e italianos revelaron inclusiones microscópicas de sulfuro de hierro (troilita) distribuidas en patrones lineales dentro de la hoja. Este hallazgo confirmó que la daga fue forjada mediante un proceso de calentamiento a baja temperatura y doblado sucesivo, una técnica artesanal sofisticada que anticipó en casi tres milenios los métodos de forja del acero de Damasco."
    ],
    "fact": "La hoja de la daga meteorítica de Tutankhamun presenta una longitud de veinte coma dos centímetros y un peso de doscientos ochenta gramos, manteniendo una concentración media de níquel del diez coma ocho por ciento y de cobalto del cero coma cincuenta y ocho por ciento en toda su superficie, acompañada por una empuñadura de oro labrado decorada con motivos de flores de loto.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En las Cartas de Amarna, tablillas cuneiformes que registran la correspondencia diplomática de la corte tebana, se documenta que Tushratta, rey de Mitanni en el norte de Mesopotamia, envió a Amenhotep III (abuelo de Tutankhamun) varias dagas con hojas de hierro estelar y empuñaduras de oro como presentes nupciales."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La troilita (FeS) identificada en la hoja de Tutankhamun es un mineral no magnético característico de los meteoritos metálicos. Al calentarse durante la forja por debajo de los novecientos cincuenta grados Celsius, sus nódulos se deforman plásticamente alargándose en bandas microscópicas sin llegar a disolverse en la matriz de hierro."
      }
    ]
  },
  {
    "id": "tumba-tut",
    "bannerImage": "/assets/egypt/infographic_m10/banner_kheops-construction.webp",
    "title": "La Tumba del Faraón Niño",
    "color": "#FFD700",
    "btnImage": "/assets/egypt/infographic_daga/btn_tumba.webp",
    "image": "/assets/egypt/infographic_daga/hero_tumba.webp",
    "content": [
      "El cuatro de noviembre de 1922, el arqueólogo británico Howard Carter y su mecenas Lord Carnarvon descubrieron el primer escalón de la tumba KV62 en el corazón del Valle de los Reyes, iniciando el hallazgo arqueológico más deslumbrante del siglo veinte. A diferencia de las grandes sepulturas reales saqueadas desde la antigüedad, la tumba del joven faraón Tutankhamun, perteneciente a la Dinastía XVIII, conservaba más de cinco mil objetos de ajuar funerario casi intactos.",
      "Durante el minucioso proceso de desenvolvimiento de las múltiples capas de vendas de lino empapadas en resinas aromáticas que cubrían la momia real, Carter realizó un descubrimiento fascinante en octubre de 1925. Sobre el muslo derecho del cuerpo momificado del faraón, sujeta mediante un ceñidor de cuentas de oro y fayenza, descansaba una elegante daga enfundada en una vaina dorada: su hoja de hierro grisáceo brillaba con un resplandor metálico misterioso.",
      "La presencia de una hoja de hierro en una tumba sellada en el año 1323 antes de nuestra era dejó perplejos a los egiptólogos de la época. En aquel entonces, la cronología histórica convencional sostenía que la Edad del Hierro no se había consolidado en el Mediterráneo oriental hasta al menos dos siglos después de la muerte de Tutankhamun. ¿Cómo era posible que un monarca de la Dinastía XVIII descansara con una daga de hierro perfectamente forjada y libre de óxido?",
      "El propio Carter anotó en sus diarios de campo su asombro ante el estado prístino del metal, destacando que mientras otros objetos de hierro menores de la tumba mostraban signos de corrosión superficial, la daga del muslo derecho mantenía una superficie pulida con apenas unas diminutas manchas de orín. Este enigma alimentó durante décadas especulaciones sobre civilizaciones perdidas o contactos comerciales con reinos desconocidos de Anatolia.",
      "La colocación de la daga estelar sobre el cuerpo del difunto obedecía a un mandato ritual de máxima protección mágica. Según las fórmulas del Libro de los Muertos, el faraón debía cruzar las puertas del inframundo armado con el metal del cielo para repeler a la serpiente Apofis y a los demonios del caos. Portar una estrella caída atada a su pierna convertía a Tutankhamun en un guerrero cósmico invulnerable en su travesía hacia la resurrección eterna."
    ],
    "fact": "La tumba KV62 de Tutankhamun albergaba más de cinco mil trescientos artefactos catalogados, pero solo diecinueve piezas contenían hierro; de todas ellas, la daga del muslo derecho era la única arma blanca completa forjada íntegramente con metal sideral extraterrestre, considerada la joya de mayor valor ritual y tecnológico de todo el tesoro faraónico.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Además de la célebre daga, la tumba de Tutankhamun albergaba otros dieciocho pequeños artefactos de hierro meteorítico, incluyendo un reposacabezas ritual con soporte de hierro, un amuleto con forma de ojo Udyat y dieciséis pequeñas cuchillas litúrgicas para la ceremonia de Apertura de la Boca, instrumentos destinados a asegurar la respiración y visión eternas del rey en el Más Allá."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La excepcional conservación de la hoja de la daga sin corrosión severa se debe a dos factores fisicoquímicos: la humedad relativa extremadamente baja del microclima sellado de KV62 (inferior al veinticinco por ciento) y el elevado porcentaje de níquel, que forma una película pasivante de óxido protector sobre el hierro."
      }
    ]
  },
  {
    "id": "rayos-x",
    "bannerImage": "/assets/egypt/infographic_m10/banner_legado-piramidal.webp",
    "title": "Detectives con Rayos X",
    "color": "#00CED1",
    "btnImage": "/assets/egypt/infographic_daga/btn_rayosx.webp",
    "image": "/assets/egypt/infographic_daga/hero_rayosx.webp",
    "content": [
      "Durante casi un siglo tras el descubrimiento de la tumba de Tutankhamun, el origen exacto del metal de la daga fue objeto de encendidas disputas académicas. Algunos historiadores sostenían que se trataba de un hierro de fundición terrestre pionero procedente del reino hitita, mientras que otros defendían la hipótesis meteorítica sin poder demostrarla empíricamente debido a la estricta prohibición de extraer muestras físicas o dañar la superficie de la valiosa reliquia.",
      "El misterio quedó resuelto de manera definitiva en el año 2016 gracias a un equipo internacional de científicos del Politécnico de Milán, la Universidad de Pisa, el Consejo Nacional de Investigación de Italia y el Museo Egipcio de El Cairo. Los investigadores emplearon una técnica analítica de vanguardia no invasiva: la espectrometría de fluorescencia de rayos X portátil (pXRF), que permite determinar la composición química elemental de un material sin alterar ni un solo átomo de la pieza.",
      "El instrumento proyectó un haz de rayos X de alta energía sobre distintos puntos de la hoja metálica. Al recibir esta radiación, los electrones de las capas atómicas profundas del metal fueron expulsados, haciendo que los electrones de niveles superiores descendieran para ocupar las vacantes emitiendo fotones secundarios característicos. Al medir con precisión la energía de estos fotones fluorescentes, los detectores revelaron la huella dactilar atómica de la daga.",
      "Los resultados de fluorescencia fueron categóricos: la hoja contiene una media de diez coma ocho por ciento en peso de níquel y un cero coma cincuenta y ocho por ciento de cobalto. En la metalurgia terrestre ordinaria, el hierro fundido rara vez contiene más de un cero coma uno por ciento de níquel. La proporción estequiométrica entre níquel y cobalto observada en la daga encajó matemáticamente con los valores típicos de los meteoritos metálicos del grupo de las octaedritas.",
      "Posteriormente, en 2022, un equipo de astrofísicos del Instituto Tecnológico de Chiba utilizó cartografía elemental bidimensional de rayos X de alta resolución para analizar las microestructuras de la hoja. Detectaron patrones microscópicos cruzados conocidos como bandas de Widmanstätten, confirmando al cien por cien la naturaleza extraterrestre del hierro y desvelando los secretos de su manufactura térmica."
    ],
    "fact": "El análisis de fluorescencia de rayos X de 2016 detectó una concentración media del 10,8 % de níquel y 0,58 % de cobalto en la hoja de la daga, una firma química sideral incompatible con la metalurgia terrestre pero idéntica a los meteoritos del grupo IVA de las octaedritas, confirmando su indiscutible origen extraterrestre de forma analíticamente concluyente.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los análisis por fluorescencia de rayos X realizados en el Museo de El Cairo se ejecutaron de noche, en una sala hermética con temperatura y humedad estabilizadas para evitar cualquier vibración mecánica o interferencia atmosférica durante las lecturas espectrométricas del detector de silicio, garantizando una precisión espectrográfica absoluta sin alterar ni un ápice la superficie milenaria de la reliquia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La relación Ni/Co en la daga de Tutankhamun es de aproximadamente dieciocho coma seis. Esta razón cuantitativa es un criterio geoquímico universal e infalible para diferenciar el hierro meteorítico primitivo de cualquier producto de reducción pirometalúrgica de minerales de hierro de la corteza terrestre."
      }
    ]
  },
  {
    "id": "meteoritos-mundo",
    "bannerImage": "/assets/egypt/infographic_m10/banner_materiales-piramide.webp",
    "title": "Meteoritos del Mundo",
    "color": "#9B59B6",
    "btnImage": "/assets/egypt/infographic_daga/btn_meteoritos.webp",
    "image": "/assets/egypt/infographic_daga/hero_meteoritos.webp",
    "content": [
      "Una vez comprobado que la daga de Tutankhamun estaba forjada con un meteorito metálico, el equipo de científicos internacionales se propuso un desafío aún más ambicioso: identificar el meteorito exacto del que procedía el metal entre todos los bólidos celestes catalogados en las regiones circundantes del desierto del Sáhara, el valle del Nilo y el mar Rojo.",
      "Los investigadores consultaron la base de datos oficial de la Meteoritical Society, que recopila los análisis de miles de meteoritos caídos en la Tierra. Tras delimitar una zona geográfica de dos mil kilómetros alrededor de Egipto y filtrar los bólidos metálicos de tipo octaedrita con contenidos de níquel y cobalto compatibles con la firma de la daga, la lista se redujo a veinte candidatos geológicos concretos.",
      "Entre todos ellos, un meteorito destacó con una correlación química y mineralógica asombrosa: el meteorito Kharga. Este fragmento extraterrestre fue localizado en el año 2000 en una meseta caliza a unos doscientos cuarenta kilómetros al oeste de la ciudad portuaria de Marsa Matruh, en la costa mediterránea de Egipto, una región costera conocida en la antigüedad por los pescadores y mercaderes que abastecían a la corte faraónica.",
      "Los meteoritos metálicos como el de Kharga son especímenes extremadamente raros en nuestro planeta. Aunque representan menos del seis por ciento de todos los meteoritos que impactan contra la atmósfera terrestre, su extraordinaria resistencia mecánica a la erosión eólica e hídrica les permite sobrevivir sobre la superficie durante cientos de miles de años, conservándose como bloques de hierro puro en las extensiones hiperáridas del desierto.",
      "La identificación de la cantera cósmica de Kharga arrojó luz sobre las rutas comerciales del Imperio Nuevo. Los nómadas beduinos que cruzaban las caravanas saharianas debieron localizar el bólido caído, reconociendo de inmediato su brillo metálico inusual y su peso anormal frente a las piedras calizas ordinarias, transportándolo como un tributo sagrado de incalculable valor hasta los talleres reales de Tebas o Pi-Ramsés."
    ],
    "fact": "De los más de setenta mil meteoritos clasificados oficialmente en el mundo, solo un cinco coma siete por ciento son sideritos metálicos puros de hierro-níquel; el meteorito Kharga de Egipto, candidato de la daga, contenía un diez coma siete por ciento de níquel, coincidiendo de manera asombrosa con las mediciones espectroscópicas de la daga faraónica.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el año 2008, investigadores egipcios e italianos descubrieron en el suroeste de Egipto el cráter Kamil, de cuarenta y cinco metros de diámetro, formado por el impacto reciente de un meteorito metálico de hierro llamado Gebel Kamil, que dispersó miles de fragmentos de metralla sideral por el desierto de Gilf Kebir."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las octaedritas metálicas deben su nombre a la formación de octaedros cristalinos regulares de dos fases de aleación hierro-níquel: camacita (baja en níquel, estructura cúbica centrada en el cuerpo) y taenita (alta en níquel, estructura cúbica centrada en las caras), interconectadas en redes continuas."
      }
    ]
  },
  {
    "id": "supernova-origen",
    "bannerImage": "/assets/egypt/infographic_m10/banner_piramide-interior.webp",
    "title": "Nacidos de Supernovas",
    "color": "#E74C3C",
    "btnImage": "/assets/egypt/infographic_daga/btn_supernova.webp",
    "image": "/assets/egypt/infographic_daga/hero_supernova.webp",
    "content": [
      "Para comprender la auténtica historia de la daga de Tutankhamun es necesario remontarse no tres mil años atrás en el tiempo de los faraones, sino a más de cuatro mil quinientos millones de años en el pasado cósmico, cuando nuestro sistema solar era una nube arremolinada de gas y polvo molecular que colapsaba bajo su propia atracción gravitatoria y comenzaba a formar los primeros embriones planetarios en el disco protoplanetario primitivo.",
      "El hierro que compone la hoja del faraón niño no fue creado en la Tierra ni en el Sol. Cada núcleo atómico de hierro-56 se forjó en el corazón incandescente de estrellas masivas gigantescas mediante procesos sucesivos de fusión nuclear por combustión de silicio a temperaturas superiores a tres mil millones de grados. Al agotar su combustible nuclear, estas estrellas colosales estallaron en catastróficas explosiones de supernova.",
      "La onda de choque de aquellas supernovas primordiales dispersó el hierro recién forjado a través del espacio interestelar, enriqueciendo la nebulosa protosolar que más tarde daría origen a la Tierra y al resto de planetas. En los albores del sistema solar, este polvo metálico se condensó formando asteroides protoplanetarios gigantescos de cientos de kilómetros de diámetro, cuyo interior se calentó por la desintegración radiactiva del aluminio-26.",
      "En el interior de estos protoplanetas fundidos ocurrió un fenómeno geológico llamado diferenciación planetaria: el hierro y el níquel pesados se hundieron hacia el centro por gravedad, conformando un núcleo metálico incandescente similar al núcleo de la Tierra moderna. Este núcleo tardó millones de años en enfriarse a un ritmo lentísimo de apenas uno a diez grados Celsius por cada millón de años, permitiendo que los cristales de hierro crecieran en dimensiones colosales.",
      "Posteriormente, colisiones catastróficas entre asteroides despedazaron aquel protoplaneta primordial, arrojando sus fragmentos de núcleo al espacio profundo. Uno de esos fragmentos vagó por el sistema solar durante eones hasta cruzarse con la órbita de nuestro planeta y precipitarse como una estrella fugaz sobre las arenas doradas de Egipto, listo para ser forjado por las manos de un artesano faraónico."
    ],
    "fact": "El hierro de la daga de Tutankhamun se formó en una supernova hace más de cuatro mil seiscientos millones de años y cristalizó en el núcleo metálico de un protoplaneta asteroidal a una tasa de enfriamiento geológico de apenas cinco grados Celsius por millón de años, antes de ser fragmentado por un cataclismo orbital que lo precipitó hacia nuestro planeta.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los patrones de Widmanstätten presentes en el hierro meteorítico no pueden recrearse artificialmente en ningún laboratorio moderno. Requieren un ritmo de enfriamiento termodinámico de uno a diez grados Celsius cada millón de años en el vacío espacial, algo imposible de simular en una vida humana, lo que constituye un certificado de autenticidad cósmica inimitable por ninguna tecnología forjada en la Tierra."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El hierro-56 es el nucleótido más estable del universo físico por su máxima energía de ligadura nuclear por nucleón (8,79 MeV). Por encima de él, la fusión nuclear deja de ser exotérmica, por lo que el núcleo de una estrella de gran masa colapsa inexorablemente en supernova en cuanto empieza a acumular hierro."
      }
    ]
  },
  {
    "id": "tesoro-museo",
    "bannerImage": "/assets/egypt/infographic_m10/banner_piramides-menores.webp",
    "title": "El Tesoro del Museo",
    "color": "#F39C12",
    "btnImage": "/assets/egypt/infographic_daga/btn_museo.webp",
    "image": "/assets/egypt/infographic_daga/hero_museo.webp",
    "content": [
      "Durante casi un siglo, la daga meteorítica de Tutankhamun fue uno de los tesoros más admirados y fotografiados de la sala de joyas del legendario Museo Egipcio de la Plaza Tahrir en el centro de El Cairo. Exhibida en una vitrina de cristal blindado junto a la célebre máscara de oro macizo y los pectorales de fayenza del faraón, la pequeña arma de hoja cenicienta contrastaba poderosamente con el brillo deslumbrante del oro circundante.",
      "En la actualidad, la daga ha sido trasladada a su sede definitiva: el Gran Museo Egipcio (GEM), un monumental complejo museístico de medio millón de metros cuadrados construido junto a la meseta de las pirámides de Guiza. Por primera vez en la historia de la museografía moderna, la totalidad de los más de cinco mil objetos que componían el ajuar funerario de Tutankhamun se exhiben reunidos en un único espacio expositivo continuo.",
      "La vitrina que custodia la daga en el Gran Museo Egipcio es un prodigio de la ingeniería de conservación preventiva contemporánea. Cuenta con un sistema interno de microclima automatizado que mantiene una atmósfera inerte enriquecida con nitrógeno de alta pureza, con una humedad relativa constante del veintidós por ciento y filtros de carbón activo que neutralizan cualquier compuesto orgánico volátil o contaminante sulfuroso.",
      "Los visitantes que contemplan la daga a través del cristal antirreflectante multicapa pueden apreciar no solo la perfección geométrica de los filos forjados por los artesanos del siglo catorce antes de Cristo, sino también los detalles policromos de la empuñadura de oro y el pomo de cristal de roca que el propio faraón empuñó hace más de tres mil trescientos años en las orillas del río sagrado.",
      "La exhibición museográfica incluye además paneles interactivos tridimensionales y pantallas de microscopía digital que permiten a estudiantes y científicos explorar las bandas de Widmanstätten y los espectros de rayos X de la hoja. Esta combinación de arqueología tradicional y divulgación tecnológica de vanguardia convierte a la daga en un icono universal del diálogo entre civilizaciones y ciencia moderna."
    ],
    "fact": "La daga meteorítica de Tutankhamun se expone en la galería dedicada de Tutankhamun en el Gran Museo Egipcio de Guiza, dentro de una vitrina con atmósfera inerte de nitrógeno al 99,9 % que preserva sus doscientos ochenta gramos de aleación sideral intactos para las futuras generaciones, protegida contra cualquier tipo de corrosión u oxidación provocada por la humedad atmosférica.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El traslado de las joyas y armas de Tutankhamun desde el Museo de Tahrir hasta el Gran Museo Egipcio de Guiza se realizó mediante convoyes militares blindados nocturnos dotados de cápsulas isotérmicas con amortiguación neumática especial para evitar cualquier microvibración en el metal cósmico, escoltados por científicos del ministerio y fuerzas de seguridad a lo largo de veinte kilómetros de trayecto."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cristal de roca utilizado en el pomo de la daga es cuarzo alfa trigonal de pureza óptica excepcional. Su dureza de siete en la escala de Mohs requirió que los artesanos de la Dinastía XVIII lo tallaran y pulieran utilizando polvo de esmeril o corindón humedecido con aceites minerales, logrando una transparencia cristalina perfecta que resalta el resplandor solar de la empuñadura de oro."
      }
    ]
  },
  {
    "id": "legado-cosmico",
    "bannerImage": "/assets/egypt/infographic_m10/banner_trabajadores-piramide.webp",
    "title": "Legado Cósmico",
    "color": "#1ABC9C",
    "btnImage": "/assets/egypt/infographic_daga/btn_legado.webp",
    "image": "/assets/egypt/infographic_daga/hero_legado.webp",
    "content": [
      "La daga meteorítica de Tutankhamun representa mucho más que una simple arma ceremonial de lujo; es el símbolo perfecto de la fascinación perenne de la humanidad por los misterios del universo exterior. En una época en que el ser humano no disponía de telescopios espaciales ni naves de exploración interplanetaria, los antiguos egipcios supieron reconocer que el firmamento nocturno enviaba dones materiales a la Tierra en forma de estrellas caídas.",
      "Para la historia de la ciencia y la tecnología, la daga marca un hito fundamental en la evolución de la metalurgia. Atestigua que la curiosidad empírica de los artesanos de la Edad del Bronce los llevó a experimentar con materias primas extraordinarias, desarrollando técnicas de forja térmica y control de temperatura que se adelantaron en milenios a la comprensión teórica de la termodinámica y la cristalografía de aleaciones.",
      "Asimismo, el estudio de este artefacto en el siglo veintiuno demostró el poder transformador de la ciencia interdisciplinaria. La colaboración estrecha entre egiptólogos, arqueólogos, físicos de partículas, ingenieros de materiales y astrofísicos ha permitido descifrar enigmas históricos sin destruir el patrimonio histórico, estableciendo nuevos estándares mundiales para la conservación y el análisis no invasivo de reliquias culturales.",
      "En el plano educativo y vocacional para las nuevas generaciones, la daga de Tutankhamun es una fuente inagotable de inspiración científica. Enseña a niños y jóvenes que la historia antigua y la astrofísica no son disciplinas aisladas, sino ramas complementarias del conocimiento humano dedicadas a explorar nuestros orígenes: desde la nucleosíntesis estelar en el corazón de las supernovas hasta las civilizaciones que florecieron a orillas del Nilo.",
      "Al mirar hoy la hoja pulida de la daga de hierro del faraón, estamos contemplando literalmente un trozo del corazón de un mundo extinto que surcó el cosmos durante millones de años antes de ser moldeado por el ingenio humano. Es un recordatorio elocuente de que, tal como afirmó el astrónomo Carl Sagan, estamos hechos de la misma materia que las estrellas y compartimos un destino común con el universo infinito."
    ],
    "fact": "La investigación interdisciplinaria sobre la daga de Tutankhamun reunió a científicos de cuatro instituciones de prestigio internacional, demostrando que un objeto de tres mil trescientos años puede actuar como laboratorio vivo para la astrofísica moderna y la ciencia de materiales espaciales, tendiendo un puente fascinante entre la arqueología faraónica y la exploración cósmica contemporánea.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Varias culturas antiguas veneraban fragmentos de meteoritos metálicos como objetos celestiales sagrados: los antiguos griegos rendían culto al betilo de Delfos, los romanos custodiaban la roca negra de Cibeles traída de Pesinunte y en la Kaaba de La Meca se preserva la venerada Piedra Negra de probable origen meteórico."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La misión espacial Psyche de la NASA, lanzada en octubre de 2023, viaja rumbo a un asteroide metálico del mismo nombre compuesto por hierro y níquel para estudiar de cerca el núcleo desnudo de un protoplaneta, el mismo tipo de cuerpo celeste primordial del que nació la daga de Tutankhamun, permitiendo desentrañar por primera vez los secretos geofísicos de los núcleos planetarios metálicos."
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(176,196,222,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">METAL DEL CIELO EN MANOS DEL FARAÓN</text>
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
              background: 'rgba(176,196,222,0.08)', borderRadius: '16px',
              border: '1px solid rgba(176,196,222,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B0C4DE', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ—¡ï¸ ¡Has explorado todos los secretos de la Daga Espacial!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Herrero de Meteoritos
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
