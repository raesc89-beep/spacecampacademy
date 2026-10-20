'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Venus: El Infierno de Ácido) ────────────────────
function DecoGreenhouse({ size = 70, color = '#FF595E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 45 Q30 15 45 45 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M22 45 Q30 25 38 45 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="35" r="4" fill={color} />
    </svg>
  );
}

function DecoPressureGauges({ size = 70, color = '#FFCA3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <line x1="30" y1="30" x2="42" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoAcidCloud({ size = 70, color = '#8AC926', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 35 Q10 25 20 20 Q25 12 35 15 Q45 10 50 22 Q55 30 45 38 Q35 45 25 40 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="25" cy="48" r="2" fill={color} opacity="0.7" />
      <circle cx="35" cy="52" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoVolcano({ size = 70, color = '#E07A5F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="10,50 25,25 35,25 50,50" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M28 25 Q30 15 32 25" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="30" y1="15" x2="30" y2="8" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoRetrograde({ size = 70, color = '#1982C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" strokeDasharray="8 4" opacity="0.8" />
      <path d="M15 22 L10 30 L18 30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoEvaporation({ size = 70, color = '#6A4C93', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 45 Q20 30 15 15 M30 45 Q35 30 30 15 M45 45 Q50 30 45 15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoVenera({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="35" r="14" fill="none" stroke={color} strokeWidth="2" />
      <path d="M30 21 L30 10 M20 10 L40 10" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'invernadero-desbocado': [DecoGreenhouse, DecoPressureGauges, DecoAcidCloud],
  'atmosfera-aplastante': [DecoPressureGauges, DecoGreenhouse, DecoVenera],
  'nubes-acido': [DecoAcidCloud, DecoGreenhouse, DecoEvaporation],
  'vulcanismo-venusiano': [DecoVolcano, DecoGreenhouse, DecoRetrograde],
  'rotacion-retrograda': [DecoRetrograde, DecoVolcano, DecoPressureGauges],
  'agua-evaporada': [DecoEvaporation, DecoGreenhouse, DecoAcidCloud],
  'sondas-venera': [DecoVenera, DecoPressureGauges, DecoVolcano],
};

const BIBLIOGRAPHY = [
  'Bullock, M. A., & Grinspoon, D. H. (2001). "The runaway greenhouse on Venus". Scientific American, 280(3), 50-57.',
  'Smrekar, S. E., et al. (2010). "Recent hotspot volcanism on Venus from VIRTIS emissivity data". Science, 328(5978), 605-608.',
  'Way, M. J., et al. (2016). "Was Venus the first habitable world of our solar system?". Geophysical Research Letters, 43(16), 8376-8383.',
  'Krasnopolsky, V. A. (2012). "Chemical composition of Venus\' atmosphere and clouds: Some unsolved problems". Icarus, 218(1), 230-246.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "invernadero-desbocado",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_invernadero-desbocado.webp",
    "title": "Invernadero Desbocado",
    "color": "#FF595E",
    "btnImage": "/assets/rocosos/infographic_m3/btn_invernadero-desbocado.webp",
    "image": "/assets/rocosos/infographic_m3/hero_invernadero-desbocado.webp",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_invernadero-desbocado.webp",
    "diagramCaption": "Efecto invernadero desbocado: absorción infrarroja por dióxido de carbono y 465 °C de temperatura",
    "content": [
      "Venus es considerado con frecuencia el gemelo astronómico de la Tierra debido a su notable similitud en radio ecuatorial (seis mil cincuenta y dos kilómetros frente a seis mil trescientos setenta y ocho), masa gravitatoria (ochenta y uno punto cinco por ciento de la terrestre) y densidad media. Sin embargo, su evolución geofísica divergió hacia una pesadilla climática irreversible regida por el efecto invernadero desbocado más extremo y letal de todo el Sistema Solar.",
      "La atmósfera de Venus está constituida en un noventa y seis punto cinco por ciento por dióxido de carbono molecular puro, complementado por un tres punto cinco por ciento de nitrógeno y trazas de dióxido de azufre, vapor de agua y monóxido de carbono. Esta colosal envoltura gaseosa genera una opacidad óptica casi absoluta en el espectro infrarrojo térmico, impidiendo que la radiación emitida por la corteza superficial caliente pueda escapar hacia el espacio.",
      "Como consecuencia de este confinamiento térmico continuo, la temperatura media superficial se mantiene estancada en setecientos treinta y siete kelvin (aproximadamente cuatrocientos sesenta y cuatro grados Celsius). Este calor infernal es prácticamente uniforme en todo el globo planetario: no varía entre el día y la noche, ni entre el ecuador y los polos, superando con creces la temperatura del plomo fundido, el estaño y el zinc en cualquier punto de su geografía.",
      "En la Tierra, el ciclo geoquímico del carbono regula el clima a largo plazo: las precipitaciones disuelven el dióxido de carbono atmosférico y lo transportan hacia los océanos, donde precipita como roca caliza o carbonatos que luego se subducen en el manto mediante la tectónica de placas. En Venus, al evaporarse los océanos primitivos, este termostato natural colapsó por completo, provocando que todo el inventario de carbono quedara desgasificado en el aire.",
      "Paradójicamente, debido a que su densa capa de nubes refleja al espacio exterior más del setenta y seis por ciento de la luz solar incidente (albedo de Bond de 0.76), la superficie de Venus absorbe en realidad menos energía solar por metro cuadrado que la Tierra. Es la colosal profundidad óptica infrarroja de su atmósfera de dióxido de carbono la que genera este calentamiento sofocante sin necesidad de una mayor absorción de luz directa."
    ],
    "fact": "Venus experimenta un efecto invernadero desbocado extremo impulsado por una atmósfera compuesta en un 96.5% de dióxido de carbono, la cual atrapa la radiación infrarroja y mantiene una temperatura superficial constante de 464 °C en todo el planeta, tanto de día como de noche y del ecuador a los polos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La opacidad óptica infrarroja de la atmósfera venusiana es tan inmensa que la radiación térmica emitida por el suelo rocoso tarda cientos de horas en difundirse gradualmente a través de las capas atmosféricas inferiores mediante transferencia radiativa y convección adiabática antes de alcanzar el tope de las nubes."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A la temperatura superficial de cuatrocientos sesenta y cuatro grados Celsius, las rocas basálticas de Venus emiten un tenue pero visible resplandor térmico rojizo en medio de la densa penumbra de la noche planetaria, iluminando el terreno con una fosforescencia anaranjada similar a las brasas de una fragua volcánica."
      }
    ]
  },
  {
    "id": "atmosfera-aplastante",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_atmosfera-aplastante.webp",
    "title": "Atmósfera Aplastante",
    "color": "#FFCA3A",
    "btnImage": "/assets/rocosos/infographic_m3/btn_atmosfera-aplastante.webp",
    "image": "/assets/rocosos/infographic_m3/hero_atmosfera-aplastante.webp",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_atmosfera-aplastante.webp",
    "diagramCaption": "Perfil barométrico vertical: atmósfera de CO2 en estado supercrítico a 93 bares de presión",
    "content": [
      "La presión atmosférica ejercida sobre la superficie de Venus constituye una de las fuerzas más destructivas y desafiantes de toda la exploración planetaria. Al nivel medio de la llanura basal venusiana, la masa de la columna de gas ejerce una presión estática descomunal de noventa y tres bares (nueve punto tres megapascales), una cifra noventa y tres veces superior a la presión barométrica de la Tierra al nivel medio del mar.",
      "Esta presión atmosférica equivale a la que experimentaría un vehículo sumergido a más de novecientos metros de profundidad en las fosas oceánicas terrestres. La colosal masa de la atmósfera de Venus (unas cuatro punto ocho por diez a la veinte kilogramos) es aproximadamente noventa y tres veces mayor que la masa combinada de toda la atmósfera terrestre, comprimiendo el suelo bajo un peso acumulado de billones de toneladas de gas.",
      "Bajo estas condiciones termodinámicas extremas de temperatura y presión (superiores al punto crítico de 304 kelvin y 73.8 bares), el dióxido de carbono deja de comportarse como un gas molecular ideal y pasa a la fase de fluido supercrítico. En este exótico estado de la materia, el fluido posee la compresibilidad y difusividad de un gas pero ostenta la densidad efectiva de un líquido espeso, alcanzando sesenta y siete kilogramos por metro cúbico.",
      "Esta densidad supercrítica (aproximadamente el seis punto siete por ciento de la densidad del agua líquida y cincuenta veces más densa que el aire terrestre) altera de forma radical la dinámica de fluidos en superficie. Los vientos superficiales registrados por las sondas soviéticas son lentos, de entre cero punto cinco y dos metros por segundo (dos a siete kilómetros por hora), pero su presión dinámica es tan colosal que pueden arrastrar grava volcánica pesada.",
      "Para una persona o vehículo robótico que intentara desplazarse sobre la superficie, caminar a través del dióxido de carbono supercrítico sería semejante a vadear un río turbulento de agua caliente. Esta pesada envoltura amortigua de forma casi total el impacto de meteoritos pequeños y medianos, impidiendo la formación de cráteres de menos de tres kilómetros de diámetro al desintegrar los proyectiles en el aire."
    ],
    "fact": "La atmósfera de Venus ejerce una presión en superficie de 93 bares (equivalente a 900 metros de profundidad marina) donde el dióxido de carbono se convierte en un fluido supercrítico con una densidad de 67 kg/m³, cincuenta veces más densa que el aire terrestre y capaz de desintegrar asteroides pequeños antes de tocar el suelo.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Debido a la densidad supercrítica del dióxido de carbono en la base atmosférica, el índice de refracción óptica de la atmósfera de Venus es tan elevado que desvía fuertemente los rayos de luz horizontalmente, provocando un efecto de curvatura extrema donde el horizonte parece elevarse hacia arriba formando una especie de cuenco cóncavo gigante."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A una altitud de cincuenta a cincuenta y cinco kilómetros sobre la superficie de Venus, la presión atmosférica desciende exactamente a un bar y la temperatura se sitúa entre veinte y treinta grados Celsius, convirtiendo a esa franja aérea en la región extraterrestre con condiciones de presión y temperatura más parecidas a la Tierra."
      }
    ]
  },
  {
    "id": "nubes-acido",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_nubes-acido.webp",
    "title": "Nubes de Ácido Sulfúrico",
    "color": "#8AC926",
    "btnImage": "/assets/rocosos/infographic_m3/btn_nubes-acido.jpg",
    "image": "/assets/rocosos/infographic_m3/hero_nubes-acido.jpg",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_nubes-acido.webp",
    "diagramCaption": "Estructura vertical de las nubes de ácido sulfúrico condensado entre 48 y 70 km de altitud",
    "content": [
      "La brillante silueta amarillenta que hace de Venus el objeto más resplandeciente del firmamento nocturno después de la Luna se debe a una densa y perpetua cubierta nubosa que envuelve el planeta de polo a polo. Lejos de estar compuestas por vapor de agua o cristales de hielo como en la Tierra, las nubes de Venus están formadas por diminutas microgotas de ácido sulfúrico concentrado al setenta y cinco y ochenta y cinco por ciento.",
      "Esta monumental estructura nubosa se extiende verticalmente a lo largo de más de veinte kilómetros de espesor, situada a altitudes comprendidas entre los cuarenta y ocho y los setenta kilómetros sobre el suelo. Se subdivide en tres capas estratificadas: la cubierta superior (de sesenta a setenta kilómetros), la capa media (de cincuenta y dos a sesenta kilómetros) y la densa capa inferior (de cuarenta y ocho a cincuenta y dos kilómetros de altitud).",
      "La síntesis química de estas nubes es el resultado de complejas reacciones fotoquímicas impulsadas por la radiación ultravioleta del Sol sobre la atmósfera alta. El dióxido de azufre liberado por el vulcanismo activo reacciona con el oxígeno atómico foto-disociado para generar trióxido de azufre; este compuesto gaseoso se hidrata rápidamente con las escasas trazas de vapor de agua presentes, condensando en finas gotas de ácido sulfúrico concentrado.",
      "En las capas intermedias de las nubes se producen continuas precipitaciones de lluvia ácida sulfúrica altamente corrosiva. Sin embargo, estas gotas nunca logran precipitar sobre el suelo sólido: al descender por debajo de los treinta y dos kilómetros de altitud, el sofocante gradiente térmico supera los trescientos grados Celsius, evaporando termodinámicamente las gotas en un fenómeno meteorológico conocido como virga.",
      "En el tope de esta capa nubosa reina la superrotación atmosférica: vientos zonales huracanados impulsados por gradientes térmicos y ondas planetarias de marea solar alcanzan velocidades superiores a los cien metros por segundo (trescientos sesenta kilómetros por hora). Estos vientos dan una vuelta completa al globo en solo cuatro días terrestres, circulando sesenta veces más rápido que la propia rotación del suelo sólido subyacente."
    ],
    "fact": "Las nubes perpetuas de Venus, ubicadas entre 48 y 70 kilómetros de altitud, están compuestas por microgotas de ácido sulfúrico concentrado generadas fotoquímicamente; provocan lluvias ácidas que se evaporan por el calor antes de tocar el suelo (virga) y se desplazan a 360 km/h impulsadas por la superrotación atmosférica.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las imágenes ultravioleta capturadas por sondas espaciales como Pioneer Venus, Akatsuki y Venus Express revelan fascinantes patrones oscuros de absorción en las nubes altas causados por un absorbente químico ultravioleta todavía no identificado de forma concluyente, posiblemente disulfuro de azufre (S2O) u óxidos de cloro."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El ácido sulfúrico presente en las nubes venusianas es tan corrosivo que las primeras sondas de descenso debieron fabricar sus ventanas ópticas con zafiro y diamante sintético ultra puro, ya que el vidrio convencional de sílice se opacaba y disolvía químicamente durante los minutos que duraba la travesía aérea."
      }
    ]
  },
  {
    "id": "vulcanismo-venusiano",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_vulcanismo-venusiano.webp",
    "title": "Vulcanismo Global",
    "color": "#E07A5F",
    "btnImage": "/assets/rocosos/infographic_m3/btn_vulcanismo-venusiano.webp",
    "image": "/assets/rocosos/infographic_m3/hero_vulcanismo-venusiano.webp",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_vulcanismo-venusiano.webp",
    "diagramCaption": "Vulcanismo de punto caliente y coronas tectónicas en una litosfera de placa única estancada",
    "content": [
      "La cartografía de radar de apertura sintética obtenida por la nave espacial Magellan de la NASA entre 1990 y 1994 reveló que Venus posee una de las superficies geológicamente más volcánicas de todo el Sistema Solar. Más del ochenta por ciento de la superficie del planeta está pavimentada por extensas llanuras de basalto volcánico, salpicadas por miles de edificios eruptivos y formaciones ígneas de dimensiones colosales.",
      "Venus alberga más de ciento sesenta volcanes gigantescos con diámetros basales superiores a los cien kilómetros, entre los cuales destaca el colosal Maat Mons en la región de Atla Regio, que se eleva más de cinco kilómetros sobre el nivel medio del terreno. A estos colosos se suman cientos de miles de pequeños conos de escoria, domos volcánicos en forma de tortita (pancake domes) creados por lavas de alta viscosidad y extensos campos de lavas fluidas.",
      "Asimismo, la geología venusiana presenta estructuras tectono-magmáticas circulares únicas en el Sistema Solar denominadas coronas. Con diámetros que oscilan entre cien y más de dos mil kilómetros (como la colosal Artemis Corona de dos mil seiscientos kilómetros), estas estructuras se originan cuando poderosos penachos magmáticos ascendentes empujan la litosfera hacia arriba en una cúpula que posteriormente colapsa en su centro al enfriarse.",
      "Un enigma central de la geología de Venus es la escasez y juventud de sus cráteres de impacto: solo se contabilizan unos novecientos cincuenta cráteres en todo el planeta, distribuidos al azar y casi intactos. Esta evidencia demuestra que Venus sufrió un evento de repavimentación catastrófico global hace entre trescientos y setecientos millones de años, donde colosales efusiones volcánicas renovaron y borraron la corteza antigua.",
      "En 2023, análisis comparativos de radar de la misión Magellan demostraron cambios morfológicos directos en un respiradero volcánico en las faldas de Maat Mons entre dos pasadas orbitales separadas por ocho meses, evidenciando una efusión de lava fresca de decenas de kilómetros cuadrados y certificando que Venus continúa geológicamente vivo y volcánicamente activo en la actualidad."
    ],
    "fact": "Más del 80% de la superficie de Venus está cubierta por lavas basálticas y coronas tectono-volcánicas generadas por plumas mantélicas; un evento de repavimentación global renovó la corteza hace 500 millones de años, y análisis recientes de radar de Magellan confirmaron vulcanismo activo en Maat Mons.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En Venus se localizan los canales de flujo de lava fósiles más extensos del Sistema Solar, conocidos como 'canali', destacando Baltis Vallis, un canal fluvial de lava ultrabásica de alta fluidez que serpentea a lo largo de seis mil ochocientos kilómetros a través de las llanuras, superando en longitud al río Nilo de la Tierra."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Al carecer de agua que hidrate y ablande las rocas litosféricas, la corteza de Venus es demasiado rígida para romperse en placas tectónicas móviles; el calor interno del manto se acumula durante cientos de millones de años hasta liberarse en colosales eventos episódicos de vulcanismo global catastrófico."
      }
    ]
  },
  {
    "id": "rotacion-retrograda",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_rotacion-retrograda.webp",
    "title": "Rotación Retrógrada",
    "color": "#1982C4",
    "btnImage": "/assets/rocosos/infographic_m3/btn_rotacion-retrograda.jpg",
    "image": "/assets/rocosos/infographic_m3/hero_rotacion-retrograda.jpg",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_rotacion-retrograda.webp",
    "diagramCaption": "Rotación retrógrada con inclinación de 177.4° y superrotación atmosférica a 360 km/h",
    "content": [
      "La cinemática de rotación de Venus constituye una anomalía mecánica desconcertante dentro de la dinámica planetaria. Mientras que casi todos los planetas del Sistema Solar giran sobre su eje en sentido prógrado (en sentido antihorario visto desde el polo norte celeste, igual a como orbitan al Sol), Venus rota en sentido retrógrado horario, con una inclinación axial o de oblicuidad de ciento setenta y siete punto cuatro grados.",
      "Para un observador situado sobre la superficie de Venus, este giro invertido provocaría que el Sol saliera por el oeste y se pusiera lentamente por el este. Además, la velocidad de rotación es asombrosamente lenta: Venus tarda exactamente doscientos cuarenta y tres punto cero dos días terrestres en completar una sola vuelta sobre su propio eje, lo que convierte su velocidad de rotación ecuatorial en apenas seis punto cinco kilómetros por hora.",
      "Dado que su periodo orbital heliocéntrico de traslación alrededor del Sol dura doscientos veinticuatro punto siete días terrestres, el periodo de rotación sideral de Venus es más largo que su propio año. Sin embargo, la combinación geométrica entre la traslación orbital hacia adelante y la rotación retrógrada hacia atrás genera un día solar aparente (el intervalo entre dos pasos sucesivos del Sol por el meridiano local) de ciento dieciséis punto siete días terrestres.",
      "Para explicar el origen de esta rotación invertida y ultralenta, los astrofísicos manejan dos hipótesis dinámicas complementarias. Por un lado, la acción combinada de las fuerzas de marea gravitacionales inducidas por el Sol y la fricción entre el núcleo fluido y el manto; por otro lado, el poderoso torque generado por las mareas atmosféricas térmicas que el Sol ejerce sobre la pesada atmósfera de noventa y tres bares.",
      "Asimismo, simulaciones numéricas de colisiones en el Sistema Solar primigenio sugieren que Venus pudo haber sufrido un impacto cataclísmico rasante con un protoplaneta masivo durante la fase de acreción tardía, el cual desestabilizó su momento angular primitivo, frenó su rotación original o invirtió físicamente la orientación del eje de rotación planetario en el espacio."
    ],
    "fact": "Venus posee una rotación retrógrada única entre los planetas terrestres con una inclinación axial de 177.4 grados: tarda 243 días terrestres en girar una vez sobre sí mismo (más largo que su año de 225 días), generando un día solar aparente de 116.7 días donde el Sol sale por el oeste y se pone por el este.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los modelos de Dobrovolskis e Ingersoll demostraron que el torque gravitatorio de marea ejercido por el Sol sobre la gigantesca asimetría de masa térmica de la atmósfera de noventa y tres bares de Venus es suficiente para empujar al planeta hacia un estado de equilibrio dinámico de rotación retrógrada lenta y estable."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Debido a que la velocidad de rotación en el ecuador de Venus es de solo seis punto cinco kilómetros por hora, un ser humano en buena forma física trotando a paso moderado podría desplazarse hacia el oeste a la misma velocidad que el giro del planeta, manteniendo el Sol perpetuamente en la misma posición del cielo."
      }
    ]
  },
  {
    "id": "agua-evaporada",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_agua-evaporada.webp",
    "title": "El Agua Evaporada",
    "color": "#6A4C93",
    "btnImage": "/assets/rocosos/infographic_m3/btn_agua-evaporada.jpg",
    "image": "/assets/rocosos/infographic_m3/hero_agua-evaporada.jpg",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_agua-evaporada.webp",
    "diagramCaption": "Desecación atmosférica: fotodisociación solar del agua y escape térmico de hidrógeno ligero",
    "content": [
      "A pesar de su aridez infernal contemporánea, los modelos paleo-climáticos de circulación general (GCM) desarrollados por el Instituto Goddard de Estudios Espaciales de la NASA sugieren que durante los primeros dos mil millones de años del Sistema Solar, Venus pudo haber albergado océanos de agua líquida poco profundos y un clima templado y potencialmente habitable.",
      "En aquella época primigenia, el Sol joven brillaba con un treinta por ciento menos de luminosidad que en la actualidad. Si Venus ya poseía una rotación lenta, los modelos climáticos demuestran que se habría formado un gigantesco banco de nubes reflectantes en el hemisferio diurno, bloqueando la mayor parte de la radiación solar y permitiendo la condensación de agua superficial en mares estables.",
      "Sin embargo, a medida que el Sol envejeció en la secuencia principal y aumentó gradualmente su luminosidad radiativa, el balance de energía planetario cruzó el umbral crítico del efecto invernadero desbocado. Los océanos venusianos comenzaron a evaporarse a tasas aceleradas, inyectando billones de toneladas de vapor de agua (un gas de efecto invernadero sumamente potente) directamente en la troposfera.",
      "El vapor de agua saturó la estratosfera alta, donde la intensa radiación solar ultravioleta rompió los enlaces químicos moleculares mediante fotodisociación, separando los átomos de hidrógeno y oxígeno. El hidrógeno ligero fue barrido y arrancado al espacio interplanetario por el viento solar a través de escape hidrodinámico térmico, mientras que el oxígeno reactivo oxidó los minerales ferrosos de la corteza basáltica.",
      "La prueba forense irrefutable de esta catástrofe hidrológica fue descubierta por la sonda Pioneer Venus en 1978 y confirmada por Venus Express: la atmósfera de Venus presenta una relación isotópica deuterio-hidrógeno (D/H) unas ciento cincuenta veces superior a la de los océanos de la Tierra, evidenciando que el planeta perdió un océano global equivalente a cientos de metros de profundidad."
    ],
    "fact": "La relación isotópica deuterio-hidrógeno (D/H) en la atmósfera de Venus es 150 veces superior a la terrestre, lo que constituye la prueba cosmoquímica concluyente de que el planeta albergó océanos de agua líquida primitivos que se evaporaron y sufrieron fotodisociación y escape hidrodinámico al espacio.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El escape continuado de iones de hidrógeno y oxígeno en una relación estequiométrica precisa de dos a uno detectado por el analizador de plasma ASPERA-4 de la sonda orbital europea Venus Express confirmó que el planeta continúa desangrando químicamente los últimos remanentes de su agua primordial hacia el viento solar."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si toda la minúscula cantidad residual de vapor de agua que sobrevive hoy dispersa en la densa atmósfera de Venus pudiera condensarse de golpe sobre su superficie, apenas formaría una delgada capa líquida superficial microscópica de tres centímetros de espesor medio en todo el planeta, frente a los casi tres kilómetros promedio de los océanos terrestres."
      }
    ]
  },
  {
    "id": "sondas-venera",
    "bannerImage": "/assets/rocosos/infographic_m3/banner_sondas-venera.webp",
    "title": "Sondas Venera y VERITAS",
    "color": "#F4A261",
    "btnImage": "/assets/rocosos/infographic_m3/btn_sondas-venera.webp",
    "image": "/assets/rocosos/infographic_m3/hero_sondas-venera.webp",
    "diagramImage": "/assets/rocosos/infographic_m3/diagram_sondas-venera.webp",
    "diagramCaption": "Ingeniería de aterrizadores Venera y misión orbital VERITAS con radar de apertura sintética",
    "content": [
      "La exploración in situ de la superficie de Venus representa uno de los capítulos más heroicos y técnicamente demandantes de toda la historia espacial. Entre 1961 y 1984, el programa soviético Venera logró una serie de hitos sin precedentes al diseñar sondas de aterrizaje blindadas de titanio capaces de descender en paracaídas y operar en el suelo abrasador de noventa y tres bares y cuatrocientos sesenta y cinco grados Celsius.",
      "El 15 de diciembre de 1970, la nave soviética Venera 7 se convirtió en el primer artefacto construido por la humanidad en aterrizar con éxito sobre la superficie de otro planeta y transmitir telemetría científica directa hacia la Tierra durante veintitrés minutos. En octubre de 1975, Venera 9 y Venera 10 transmitieron las primeras fotografías panorámicas de la historia en blanco y negro desde el suelo de otro mundo, mostrando lajas de basalto fracturado.",
      "La culminación tecnológica del programa se alcanzó en marzo de 1982 con Venera 13 y Venera 14: las naves transmitieron espectaculares panorámicas completas en color de ciento ochenta grados, grabaron el sonido ambiente del viento con micrófonos acústicos y perforaron la roca mediante un taladro mecánico automatizado de alta presión, analizando por fluorescencia de rayos X la composición basáltica alcalina del suelo.",
      "Venera 13 resistió el infernal entorno durante ciento veintisiete minutos antes de que el calor extremo fundiera sus sistemas electrónicos internos, estableciendo un récord de supervivencia en el suelo venusiano que permanece imbatido hasta el día de hoy. Más tarde, en 1985, las misiones soviéticas Vega 1 y Vega 2 desplegaron con éxito globos aerostáticos que flotaron durante cuarenta y seis horas en las nubes templadas a cincuenta y cuatro kilómetros de altitud.",
      "El futuro de la exploración venusiana experimenta un renacimiento global con las misiones orbitales de última generación VERITAS y DAVINCI de la NASA, junto con la misión EnVision de la Agencia Espacial Europea. Equipadas con radares interferométricos de apertura sintética, espectrómetros infrarrojos y sondas de descenso atmosférico, cartografiarán la composición mineralógica y la geodinámica activa para comprender el destino final de los mundos terrestres."
    ],
    "fact": "El programa soviético Venera logró la histórica hazaña de aterrizar en el infierno de Venus; Venera 7 fue la primera sonda en transmitir desde otro planeta en 1970 y Venera 13 envió en 1982 las primeras imágenes en color y sobrevivió 127 minutos a 465 °C, abriendo el camino a las futuras misiones VERITAS y EnVision.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La sonda DAVINCI de la NASA descenderá en paracaídas a través de las nubes de Venus a finales de esta década, tomando miles de mediciones de gases nobles isotópicos de kriptón y xenón e imágenes microscópicas en el infrarrojo cercano de la región montañosa de Alpha Regio con resolución centimétrica."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante la misión Venera 14 en 1982 ocurrió una célebre anécdota de la ingeniería espacial: la tapa protectora de titanio de la lente de la cámara fue expulsada mecánicamente con tal precisión que cayó al suelo exactamente debajo del brazo medidor de compresibilidad del regolito, midiendo la dureza de la propia tapa."
      }
    ]
  }
];

export default function InteractiveInfographic_RocososM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,12,15,0.92) 0%, rgba(35,15,18,0.88) 40%, rgba(18,8,10,0.95) 100%)',
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
      <RockyDustField color1="255, 89, 94" color2="255, 202, 58" />
      <RocososHeader title="VENUS: EL INFIERNO DE ÁCIDO" subtitle="EL GEMELO MALVADO DE LA TIERRA" primaryColor="#FF595E" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF595E, #FFCA3A)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar los misterios de Venus.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #FF595E60' }}>
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

function RockyDustField({ color1 = '255, 89, 94', color2 = '255, 202, 58' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM3)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM3" x1="0" y1="0" x2="1" y2="0">
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
        width: '116px',
        height: '116px',
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
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
        background: 'rgba(25, 12, 16, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
        {node.bannerImage && (
                <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                  <img src={node.bannerImage} alt={node.bannerCaption || ''}
                       style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                  {node.bannerCaption && (
                    <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                                fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {node.bannerCaption}
                    </p>
                  )}

        {/* --- Diagram Image (4ª Imagen: Esquema Técnico) --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

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
