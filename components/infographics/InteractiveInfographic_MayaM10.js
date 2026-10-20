'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Astronomy themed) ─────────────────────────

function DecoPleiades({ size = 70, color = '#E8EAF6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {[
        {x: 30, y: 15, r: 2.5}, {x: 45, y: 22, r: 3}, {x: 20, y: 25, r: 2},
        {x: 35, y: 35, r: 3.5}, {x: 15, y: 40, r: 2.5}, {x: 28, y: 48, r: 2}, {x: 48, y: 45, r: 2.5}
      ].map((star, i) => (
        <g key={i}>
          <circle cx={star.x} cy={star.y} r={star.r} fill={color} opacity="0.8" />
          <path d={`M${star.x} ${star.y - star.r - 2} L${star.x} ${star.y + star.r + 2} M${star.x - star.r - 2} ${star.y} L${star.x + star.r + 2} ${star.y}`} stroke={color} strokeWidth="1" opacity="0.5" />
        </g>
      ))}
      <path d="M 30 15 Q 45 22 35 35 Q 28 48 15 40 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />
    </svg>
  );
}

function DecoRattlesnake({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 45 Q 25 35 35 45 Q 45 55 55 45" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {[35, 42, 49, 56].map((x, i) => (
        <rect key={i} x={x} y="41" width="4" height="8" rx="1" fill={color} opacity="0.8" transform={`rotate(${i*5} ${x} 45)`} />
      ))}
      <path d="M 5 25 Q 15 15 25 25 L 15 45 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="15" cy="22" r="1.5" fill={color} />
      <path d="M 5 25 Q -5 25 -5 15" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoRainCloud({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 15 30 Q 15 20 25 20 Q 30 10 40 15 Q 50 15 50 25 Q 55 25 55 35 Q 55 40 45 40 L 15 40 Q 5 40 5 30 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      {[
        {x: 15, y: 45}, {x: 25, y: 42}, {x: 35, y: 46}, {x: 45, y: 43}
      ].map((drop, i) => (
        <line key={i} x1={drop.x} y1={drop.y} x2={drop.x - 3} y2={drop.y + 6} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      ))}
    </svg>
  );
}

function DecoCornField({ size = 70, color = '#F9A825', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <line x1="30" y1="55" x2="30" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M 30 45 Q 20 40 15 30 Q 25 35 30 45" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M 30 35 Q 40 30 45 20 Q 35 25 30 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="25" cy="25" rx="3" ry="8" fill={color} opacity="0.5" transform="rotate(-15 25 25)" />
      <ellipse cx="35" cy="15" rx="3" ry="8" fill={color} opacity="0.5" transform="rotate(15 35 15)" />
    </svg>
  );
}

function DecoFireCeremony({ size = 70, color = '#6D4C41', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 45 L 30 15" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M 15 45 Q 30 55 45 45" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M 25 35 Q 30 25 25 15 Q 35 25 35 35 Z" fill={color} opacity="0.5" />
      <circle cx="25" cy="20" r="1" fill={color} opacity="0.8" />
      <circle cx="35" cy="18" r="1.5" fill={color} opacity="0.8" />
      <circle cx="32" cy="10" r="1" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'tzab-ek-nombre': [DecoPleiades, DecoRattlesnake, DecoCornField],'paso-cenital': [DecoRainCloud, DecoPleiades, DecoRattlesnake],'calendario-agricola': [DecoCornField, DecoRainCloud, DecoPleiades],'nueva-cuenta-fuego': [DecoFireCeremony, DecoPleiades, DecoRattlesnake],'astronomia-precisa': [DecoPleiades, DecoCornField, DecoRattlesnake],'cascabel-cosmico': [DecoRattlesnake, DecoRainCloud, DecoPleiades],'culturas-comparadas': [DecoCornField, DecoFireCeremony, DecoPleiades],
}; const BIBLIOGRAPHY = ['Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Tedlock, D. (1996). Popol Vuh: The Definitive Edition of The Mayan Book of the Dawn of Life, Simon & Schuster',
  'Malmström, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press',
  'Šprajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica del Centro de México, INAH',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "tzab-ek-nombre",
    diagramImage: '/assets/maya/infographic_m10/diagram_tzab-ek-nombre.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Tzab-ek: La Serpiente',
    "bannerImage": "/assets/maya/infographic_m10/banner_tzab-ek-nombre.webp",
    "title": "Tzab-ek: La Serpiente",
    "color": "#E8EAF6",
    "btnImage": "/assets/maya/infographic_m10/btn_tzab-ek-nombre.jpg",
    "image": "/assets/maya/infographic_m10/hero_tzab-ek-nombre.jpg",
    "content": [
      "En la astronomía maya clásica, el cúmulo estelar abierto de las Pléyades recibía el nombre jeroglífico de Tzab o Tzab-ek, término que en maya yucateco traduce literalmente «los cascabeles» de la serpiente de cascabel (Crotalus durissus durissus). Este grupo estelar compacto, situado en la constelación moderna de Tauro, no era contemplado como un conjunto de ninfas o hermanas mitológicas, sino como el apéndice córneo y vibrante de un reptil celeste protector.",
      "Los sacerdotes observadores asociaron la apariencia visual granulada y centelleante del cúmulo con los segmentos de queratina que forman el cascabel articulado de estos ofidios venenosos. Al igual que el sonido del cascabel en la selva advierte a los caminantes sobre un peligro inminente o anuncia un cambio brusco, la aparición de Tzab-ek en el horizonte oriental alertaba a las poblaciones sobre transformaciones meteorológicas y temporales vitales.",
      "En las inscripciones del Clásico Tardío halladas en sitios como Toniná y Cobá, el glifo de Tzab aparece formado por un signo que simula tres círculos entrelazados o un racimo de elementos globulares, reflejando fielmente la silueta telescópica y a simple vista de las estrellas más brillantes del grupo. Esta convención iconográfica perduró durante más de un milenio, consolidando una tradición observacional uniforme en toda la región maya.",
      "La serpiente en Mesoamérica representaba el agua terrestre, la fertilidad de los campos de cultivo y la bóveda celeste en movimiento continuo. Al adjudicarle un cascabel estelar en la figura de Tzab-ek, los sabios mayas unieron orgánicamente la zoología de la selva tropical con la mecánica del cielo nocturno, otorgando a este pequeño grupo de estrellas un rol fundamental en la estructura simbólica y ritual de la sociedad.",
      "Diversos estudios arqueológicos en la región del Puuc yucateco han revelado cómo las fachadas de palacios y pirámides, como el Cuadrángulo de las Monjas en Uxmal, integran serpientes ondulantes de piedra tallada cuyos extremos convergen hacia puntos astronómicos clave. En estos frisos de caliza, el cascabel terminal apunta con frecuencia hacia las direcciones por donde emergen las Pléyades durante fechas señaladas del calendario ritual."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La serpiente de cascabel de las tierras bajas mayas añade un nuevo segmento a su cascabel cada vez que muda de piel, proceso que suele ocurrir entre dos y cuatro veces al año. Los sacerdotes mayas consideraron esta renovación periódica como una prueba biológica de la naturaleza cíclica del tiempo, análoga a la reaparición anual de Tzab-ek en el firmamento nocturno."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cúmulo abierto de las Pléyades (Messier 45) se ubica a una distancia aproximada de 444 años luz del sistema solar y contiene más de 1,000 estrellas ligadas gravitacionalmente, aunque solo seis o siete son visibles a simple vista bajo condiciones atmosféricas óptimas. Su edad estimada es de apenas 100 millones de años, tratándose de estrellas azules extraordinariamente jóvenes y luminosas."
      }
    ],
    "fact": "El término maya «Tzab» no solo designaba al cúmulo de las Pléyades y al cascabel ofídico, sino que se utilizaba como unidad de medida numérica y geométrica para describir conjuntos agrupados de objetos homogéneos, como manojos de plumas preciosas, granos de cacao o mazorcas de maíz seleccionadas para las ofrendas ceremoniales en los templos."
  },
  {
    "id": "paso-cenital",
    diagramImage: '/assets/maya/infographic_m10/diagram_paso-cenital.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Paso Cenital',
    "bannerImage": "/assets/maya/infographic_m10/banner_paso-cenital.webp",
    "title": "El Paso Cenital",
    "color": "#1565C0",
    "btnImage": "/assets/maya/infographic_m10/btn_paso-cenital.jpg",
    "image": "/assets/maya/infographic_m10/hero_paso-cenital.jpg",
    "content": [
      "El concepto de paso cenital constituía uno de los pilares de la astronomía en la zona intertropical mesoamericana. Ocurre cuando un cuerpo celeste cruza exactamente el punto más alto de la bóveda celeste (el cenit, a 90 grados sobre el horizonte), de tal forma que los objetos verticales dejan de proyectar sombras laterales al mediodía si se trata del Sol, o culminan en la vertical perfecta del observador durante la noche si se trata de estrellas.",
      "En la franja geográfica del mundo maya, situada aproximadamente entre los 14° y los 21° de latitud norte, las Pléyades gozaban de una particularidad geométrica extraordinaria: su declinación en la época prehispánica coincidía casi milimétricamente con el cenit local. Esto provocaba que, una vez al año, Tzab-ek pasara exactamente por la vertical absoluta del cielo a la medianoche, dividiendo la bóveda en dos mitades perfectas.",
      "Las investigaciones arqueoastronómicas han demostrado que este cenit estelar nocturno de las Pléyades se producía a mediados de noviembre. Para los mayas, esta fecha marcaba la culminación de la época de lluvias y el arranque formal de la temporada de secas o de recolección de granos, funcionando como un punto de equilibrio celeste que contrastaba simétricamente con el primer paso cenital del Sol a comienzos de mayo.",
      "Para constatar con exactitud el tránsito cenital, los constructores mayas perforaban chimeneas cenitales en cámaras subterráneas y templos de piedra. Ejemplos de estos pozos de luz existen en Monte Albán, Xochicalco y en cavernas modificadas del área maya, donde la luz estelar o solar descendía verticalmente iluminando marcadores glíficos tallados en el suelo rocoso únicamente cuando el astro alcanzaba el cenit geométrico.",
      "La simetría entre el paso cenital diurno del Sol y el paso cenital nocturno de las Pléyades permitió a los astrónomos establecer un eje ordenador del año trópico. Esta correlación matemática entre el día y la noche ofrecía una herramienta científica confiable para sincronizar el calendario civil con los ritmos biológicos de los cultivos y las oscilaciones térmicas características del entorno selvático centroamericano."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Debido al movimiento de precesión de los equinoccios, las coordenadas celestes de las estrellas varían lentamente con los siglos. En el periodo Clásico maya (hacia el 600 d.C.), las Pléyades poseían una declinación de aproximadamente +18° a +19°, lo que hacía que pasaran casi exactamente por el cenit sobre ciudades mayas como Tikal, Uaxactún, Yaxchilán y Edzná."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El paso cenital solar es un fenómeno exclusivo de la región intertropical, comprendida entre el trópico de Cáncer (23.4° N) y el trópico de Capricornio (23.4° S). En latitudes superiores, como en Europa o el norte de América, el Sol jamás alcanza los 90 grados de altitud sobre el horizonte, razón por la cual los astrónomos europeos antiguos no utilizaban este marcador geométrico."
      }
    ],
    "fact": "En las latitudes mayas centrales, como la de Tikal a 17° 13' N, el Sol cruza el cenit en dos fechas separadas: la primera ocurre alrededor del 9 de mayo y la segunda cerca del 3 de agosto. La distancia temporal entre ambos tránsitos cenitales solares (aproximadamente 260 días) coincide de forma asombrosa con la duración exacta del calendario sagrado Tzolk'in."
  },
  {
    "id": "calendario-agricola",
    diagramImage: '/assets/maya/infographic_m10/diagram_calendario-agricola.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Calendario Agrícola',
    "bannerImage": "/assets/maya/infographic_m10/banner_calendario-agricola.webp",
    "title": "Calendario Agrícola",
    "color": "#F9A825",
    "btnImage": "/assets/maya/infographic_m10/btn_calendario-agricola.jpg",
    "image": "/assets/maya/infographic_m10/hero_calendario-agricola.jpg",
    "content": [
      "La subsistencia de millones de habitantes en las ciudades-estado mayas dependía de cosechas exitosas de maíz, frijol, calabaza y chile cultivados bajo el sistema de milpa en suelos delgados y kársticos. En este entorno ecológico frágil, carente de sistemas masivos de irrigación artificial en el norte peninsular, sembrar en la fecha incorrecta antes de las lluvias acarreaba la pérdida total de las semillas por desecación o plagas.",
      "El cúmulo estelar de Tzab-ek funcionaba como el marcador calendárico agrícola por excelencia. A principios de mayo, tras haber permanecido ocultas detrás del brillo solar durante varias semanas, las Pléyades reaparecían sobre el horizonte oriental justo antes de la salida del Sol, un evento astronómico denominado orto helíaco. Esta señal celeste indicaba sin margen de error la llegada inminente de las primeras lluvias torrenciales.",
      "Al observar el orto helíaco de Tzab-ek, los campesinos mayas sabían que disponían de escasos días para finalizar la quema controlada del monte seco y depositar los granos de maíz en los hoyos abiertos con el bastón sembrador o espeque. El fósforo y potasio de las cenizas fertilizaban el suelo, mientras que las lluvias de mayo, previstas por la posición estelar, hidrataban los granos iniciando el ciclo biológico de germinación.",
      "Medio año más tarde, en el mes de noviembre, se producía el ocaso helíaco de las Pléyades o su culminación a la medianoche. Este momento marcaba el fin de las lluvias y la desecación de las mazorcas en los tallos doblados de las milpas. Las familias campesinas iniciaban entonces la cosecha masiva y el almacenamiento de granos en chultunes o silos subterráneos de caliza protegidos contra la humedad y los roedores selváticos.",
      "De este modo, la observación de las Pléyades dotaba a las comunidades mayas de una brújula cronológica independiente de las variaciones climáticas locales fortuitas. Mientras que una lluvia aislada en abril podía engañar a un sembrador inexperto, el reloj astronómico de Tzab-ek confirmaba si las condiciones estacionales a gran escala estaban verdaderamente listas para asegurar la cosecha comunal."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La técnica agrícola tradicional de doblar la caña del maíz («dobla de la milpa») se realiza cuando el grano ya maduró para evitar que el agua de las últimas lluvias penetre en la mazorca e incube hongos destructivos. Esta labor se programaba rigurosamente observando la elevación de las Pléyades durante las primeras horas del anochecer otoñal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El orto helíaco de un cuerpo celeste ocurre el primer día del año en que el astro se hace visible por el horizonte este al amanecer, breves minutos antes de que el resplandor solar opaque su luz. Para las Pléyades en Centroamérica durante el siglo VII d.C., este evento ocurría con precisión milimétrica durante los primeros días de mayo, anunciando el monzón mesoamericano."
      }
    ],
    "fact": "Un chultún maya típico, excavado en la roca caliza impermeable bajo las viviendas y sellado con estuco de cal, podía almacenar entre 2,000 y 8,000 litros de grano seco de maíz. Este sistema de acopio alimentario, regulado anualmente por las observaciones estelares de Tzab-ek, permitía alimentar a una familia campesina numerosa durante periodos de sequía prolongada."
  },
  {
    "id": "nueva-cuenta-fuego",
    diagramImage: '/assets/maya/infographic_m10/diagram_nueva-cuenta-fuego.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Cuenta del Fuego',
    "bannerImage": "/assets/maya/infographic_m10/banner_nueva-cuenta-fuego.webp",
    "title": "Cuenta del Fuego",
    "color": "#6D4C41",
    "btnImage": "/assets/maya/infographic_m10/btn_nueva-cuenta-fuego.jpg",
    "image": "/assets/maya/infographic_m10/hero_nueva-cuenta-fuego.jpg",
    "content": [
      "En la cosmovisión mesoamericana compartida por mayas, mexicas y zapotecos, el transcurso del tiempo no era lineal e infinito, sino una sucesión de ciclos periódicos que debían ser renovados mediante ceremonias solemnes de fuego sagrado. La coincidencia del calendario ritual de 260 días con el calendario solar de 365 días generaba un ciclo mayor de 52 años civiles, conocido modernamente como la Rueda Calendárica o atado de años.",
      "Al concluir cada periodo de 52 años, existía la angustia colectiva de que el Sol pudiera no volver a salir y que los demonios de la oscuridad descendieran para aniquilar a la humanidad. Para conjurar este peligro cósmico, los sacerdotes realizaban la ceremonia del Fuego Nuevo, apagando absolutamente todas las fogatas domésticas y de templos en la ciudad para aguardar en tinieblas totales el dictamen del firmamento nocturno.",
      "El indicador astronómico supremo que decidía si el mundo continuaría existiendo durante otros 52 años era el tránsito a medianoche del cúmulo estelar de las Pléyades por el cenit del cielo. Los sacerdotes astrónomos subían a la cima de pirámides aisladas o templos de observación, siguiendo segundo a segundo el ascenso pausado de Tzab-ek a través del meridiano local mediante gnomones y cuadrantes fijos de piedra.",
      "Si las Pléyades cruzaban sin tropiezo la cúspide cenital a la medianoche, se confirmaba que el cosmos mantenía su estabilidad matemática y que la vida humana continuaría. En ese instante de euforia ritual, los sacerdotes taladraban dos maderas sagradas mediante fricción sobre el pecho de una ofrenda ceremonial, generando una chispa viva que encendía una hoguera colosal visible desde decenas de kilómetros a la redonda.",
      "Corredores veloces armados con antorchas de pino encendidas transportaban el fuego nuevo desde el templo central hacia cada barrio, palacio y hogar campesino de la región. El renacimiento del fuego simbolizaba la renovación de la energía universal, la reconciliación entre deidades y mortales, y la sustitución de utensilios cerámicos rotos y ropas viejas por objetos flamantes para inaugurar una era próspera."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante la noche del Fuego Nuevo, las familias quebraban platos, vasijas de barro y manos de metate viejas, arrojándolos a basureros rituales, mientras las mujeres embarazadas eran encerradas en cuartos cerrados con máscaras de corteza de maguey por temor a que la oscuridad las transformara en monstruos feroces llamados Tzitzimime."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La Rueda Calendárica de 52 años equivale al mínimo común múltiplo entre el Tzolk'in de 260 días y el Haab' de 365 días: exactamente 18,980 días solares, lo que corresponde a 73 ciclos sagrados de 260 días y 52 años de 365 días. Esta concordancia matemática perfecta aseguraba que una combinación específica de fecha se repitiera solo una vez cada medio siglo."
      }
    ],
    "fact": "La excavación arqueológica de templos piramidales en Mesoamérica ha revelado superposiciones arquitectónicas sucesivas donde una nueva pirámide se construía cubriendo por completo a la anterior. Muchas de estas ampliaciones monumentales coinciden cronológicamente con los periodos de 52 años marcados por la ceremonia de renovación del Fuego Nuevo."
  },
  {
    "id": "astronomia-precisa",
    diagramImage: '/assets/maya/infographic_m10/diagram_astronomia-precisa.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Astronomía Precisa',
    "bannerImage": "/assets/maya/infographic_m10/banner_astronomia-precisa.webp",
    "title": "Astronomía Precisa",
    "color": "#2E7D32",
    "btnImage": "/assets/maya/infographic_m10/btn_astronomia-precisa.jpg",
    "image": "/assets/maya/infographic_m10/hero_astronomia-precisa.jpg",
    "content": [
      "La capacidad de los astrónomos mayas para medir y predecir los movimientos de las Pléyades sin lentes ópticos ni relojes mecánicos representa uno de los logros científicos más notables de la antigüedad. En lugar de instrumental complejo, desarrollaron una rigurosa metodología empírica basada en horizontes artificiales, mirillas de observación fija y una disciplina de registro gráfico transmitida ininterrumpidamente por generaciones.",
      "Los observatorios mayas no poseían cúpulas esféricas modernas, sino vanos arquitectónicos estrechos, jambas de puertas monolíticas y estelas alineadas en crestas de colinas distantes. Al sentarse en un punto fijo marcado en el suelo de una cámara sagrada y mirar a través de un par de varas cruzadas colocadas en el quicio de una ventana, el sabio maya creaba una línea de puntería que interceptaba el orto estelar en el horizonte.",
      "Mediante este método de retícula visual fija, los astrónomos lograron calcular las fechas exactas del orto matutino, la culminación cenital y el ocaso vespertino de Tzab-ek con un margen de error menor a un día solar. La constancia de sus observaciones les permitió percatarse de que las estrellas fijas adelantan su aparición cuatro minutos cada noche respecto al tiempo solar, descubriendo de facto la duración del día sidéreo.",
      "Este rigor cuantitativo se integró de manera magistral en las tablas matemáticas de códices como el de Dresde, París y Madrid. Aunque estos libros plegados contienen principalmente efemérides de Venus, Marte y la Luna, los cómputos calendáricos subyacentes incorporan factores de ajuste estelar que sincronizaban los periodos sinódicos planetarios con el fondo estelar inmóvil personificado por las Pléyades y Orión.",
      "La arqueología moderna ha corroborado la exactitud de estos alineamientos estelares utilizando teodolitos láser y software de reconstrucción arqueoastronómica tridimensional. Los resultados confirman que los constructores mayas orientaban muros monumentales y ejes procesionales con desviaciones inferiores a medio grado de arco respecto a las posiciones reales que ocupaba Tzab-ek en los siglos VI y VII de nuestra era."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el sitio arqueológico de Copán, la orientación visual entre la Estela 12 y la Estela 10, emplazadas sobre colinas opuestas que dominan el valle a una distancia de siete kilómetros, formaba una gigantesca línea de mira solar y estelar utilizada por los sabios reales para calibrar las fechas críticas del calendario agrícola y ritual."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un día sidéreo es el tiempo que tarda la Tierra en completar un giro sobre su propio eje respecto a las estrellas lejanas: 23 horas, 56 minutos y 4.09 segundos. Es aproximadamente 3 minutos y 56 segundos más corto que el día solar medio de 24 horas, una discrepancia sutil que los astrónomos mayas compensaban acumulando días bisiestos implícitos en su Cuenta Larga."
      }
    ],
    "fact": "La precisión con la que los astrónomos mayas determinaron los ciclos lunares y sinódicos superaba a la de sus contemporáneos en la Europa medieval. En Copán, calcularon que 149 lunas nuevas equivalían exactamente a 4,400 días, lo que arroja una duración del mes lunar de 29.53020 días, frente al valor moderno medido por satélites de 29.53059 días: ¡un error minúsculo de escasos segundos!"
  },
  {
    "id": "cascabel-cosmico",
    diagramImage: '/assets/maya/infographic_m10/diagram_cascabel-cosmico.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Cascabel Cósmico',
    "bannerImage": "/assets/maya/infographic_m10/banner_cascabel-cosmico.webp",
    "title": "Cascabel Cósmico",
    "color": "#311B92",
    "btnImage": "/assets/maya/infographic_m10/btn_cascabel-cosmico.jpg",
    "image": "/assets/maya/infographic_m10/hero_cascabel-cosmico.jpg",
    "content": [
      "La asociación entre las Pléyades y el cascabel de la víbora trasciende la mera denominación léxica para convertirse en uno de los motivos centrales de la iconografía monumental mesoamericana. En estelas, dinteles de madera de chicozapote, vasijas de ofrenda y murales al fresco, el cascabel articulado de la serpiente aparece recurrentemente coronando estandartes celestes y cetros de mando empuñados por gobernantes supremos.",
      "Los epigrafistas han descubierto que el glifo de Tzab-ek no solo señalaba al cúmulo astronómico, sino que funcionaba como un título honorífico asumido por reyes y reinas guerreras. Al portar insignias ofídicas con cascabeles estelares, el soberano manifestaba ante su pueblo que poseía el poder de conjurar la lluvia, comunicarse con las fuerzas celestiales y controlar los ritmos agrícolas que garantizaban la supervivencia.",
      "En el Templo de las Pinturas de Bonampak, Chiapas, los murales pintados hacia el año 790 d.C. representan escenas bélicas y rituales donde los dignatarios visten pieles de jaguar adornadas con cascabeles de bronce y oro, así como fajas ceremoniales que rematan en cabezas de serpiente bicéfala cuyos extremos reproducen fielmente los segmentos de queratina del cascabel estelar observado en las noches claras de la selva.",
      "Asimismo, en las inscripciones de Chichén Itzá correspondientes al periodo Posclásico Temprano, la serpiente emplumada Kukulcán exhibe en el remate de su cola de plumas de quetzal un sonoro cascabel de reptil. La integración de plumas celestiales de ave y cascabeles estelares de reptil terrestre sintetizaba la unión mística del aire, el viento fertilizador, el cielo estrellado y la tierra nutricia sobre la que germinaba el maíz.",
      "Esta iconografía del cascabel cósmico cumplía además una función acústica durante las grandes fiestas públicas. Los danzantes reales ataban sartales de conchas marinas y cascabeles secos a sus tobillos y muñecas. Al ejecutar sus danzas rítmicas sobre las plazas de estuco blanco, el sonido crepitante imitaba simultáneamente el aviso sonoro de la víbora de cascabel y el rumor de las gotas de lluvia que caían desde el cielo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Altar 41 de Copán, los escultores tallaron una descomunal serpiente de cascabel enroscada sobre sí misma. En la base de su cola esculpieron minuciosamente seis anillos de cascabel, número que coincide de forma deliberada con la cantidad de estrellas principales que el ojo humano distingue a simple vista dentro del cúmulo de las Pléyades."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las serpientes de cascabel generan su sonido característico haciendo vibrar los segmentos huecos de queratina de su cola a una frecuencia de entre 50 y 100 hercios mediante músculos de contracción ultrarrápida. Los sacerdotes mayas consideraban este sonido una manifestación terrenal del trueno sordo que acompaña a las tempestades nocturnas tropicales."
      }
    ],
    "fact": "En las ofrendas ceremoniales del Cenote Sagrado de Chichén Itzá, los arqueólogos subacuáticos han rescatado más de 300 cascabeles de cobre, oro y aleaciones metálicas (tumbaga), muchos de ellos grabados con diseños ofídicos y símbolos de estrellas centelleantes, arrojados a las aguas subterráneas como tributo a las Pléyades y al dios de la lluvia Chaac."
  },
  {
    "id": "culturas-comparadas",
    diagramImage: '/assets/maya/infographic_m10/diagram_culturas-comparadas.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Culturas Comparadas',
    "bannerImage": "/assets/maya/infographic_m10/banner_culturas-comparadas.webp",
    "title": "Culturas Comparadas",
    "color": "#FFEE58",
    "btnImage": "/assets/maya/infographic_m10/btn_culturas-comparadas.jpg",
    "image": "/assets/maya/infographic_m10/hero_culturas-comparadas.jpg",
    "content": [
      "El cúmulo abierto de las Pléyades ha cautivado a casi todas las civilizaciones del planeta, ocupando un papel estelar en sus mitologías y calendarios. Comparar la visión maya de Tzab-ek con las concepciones desarrolladas en la Grecia clásica, los Andes sudamericanos, la Polinesia y la antigua China revela cómo diferentes pueblos del mundo interpretaron el mismo fenómeno óptico celeste para resolver problemas humanos idénticos.",
      "En la mitología de la Grecia arcaica, descrita por poetas como Homero y Hesíodo hacia el siglo VIII a.C., las Pléyades eran las siete hijas del titán Atlas y de la ninfa Pléyone, perseguidas por el cazador Orión hasta ser transformadas en palomas estelares por Zeus. Para los marinos griegos del mar Egeo, el orto helíaco de las Pléyades marcaba el inicio de la temporada segura para la navegación comercial tras las tormentas invernales.",
      "En el extremo opuesto del continente americano, la civilización inca de los Andes veneraba a este cúmulo bajo el nombre quechua de Qollqa o «el almacén de granos». Los astrónomos del Imperio Inca observaban con minuciosidad la claridad y nitidez de las Pléyades en las madrugadas de junio: si aparecían brillantes y nítidas pronosticaban abundancia agrícola, pero si se veían borrosas predecían sequías provocadas por el fenómeno de El Niño.",
      "Para los navegantes polinesios que colonizaron los archipiélagos del océano Pacífico en canoas dobles de madera, las Pléyades recibían el nombre de Matariki («los ojos del dios»). Su primera aparición matutina sobre las olas oceánicas a finales de mayo inauguraba el Año Nuevo tradicional Maorí, señalando el periodo sagrado de tregua bélica, agradecimiento por las cosechas y descanso para las cuadrillas de exploradores marinos.",
      "Mientras que griegos y polinesios asociaron las Pléyades con doncellas u ojos luminosos, los sabios mayas coincidieron con varias etnias aborígenes de Norteamérica al ver en ellas un cascabel de ofidio o una reunión de ancianos. Esta asombrosa convergencia intercultural confirma que el cúmulo M45 funcionó como el reloj astronómico de la humanidad entera, guiando la agricultura y la navegación en todas las latitudes terrestres."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En Japón, el cúmulo de las Pléyades es conocido desde hace más de mil años con el nombre de Subaru, que significa «unión» o «reunirse en un racimo». La famosa corporación automotriz japonesa adoptó este nombre tradicional y luce con orgullo seis estrellas brillantes del cúmulo estelar en su emblemático logotipo metálico ovalado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las investigaciones meteorológicas modernas han confirmado la validez del método de pronóstico inca sobre las Pléyades: en los años en que el fenómeno de El Niño calienta las aguas del Pacífico, se forman nubes cirros tenues a gran altitud sobre los Andes que vuelven borrosas las estrellas del cúmulo, avisando con meses de antelación sobre sequías agrícolas inminentes."
      }
    ],
    "fact": "Existen registros gráficos del cúmulo de las Pléyades que se remontan a la Edad del Bronce europea, como el célebre Disco Celeste de Nebra hallado en Alemania y fechado hacia el 1600 a.C. En este artefacto de bronce e incrustaciones de oro, las Pléyades aparecen plasmadas con siete puntos dorados agrupados, demostrando la fascinación global de la humanidad por este cúmulo estelar."
  }
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
function TemporalField() {
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '232,234,246' : '249,168,37', // Star white or harvest gold
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Header ──────────────────────────────────────────────────────────────────
function MayaAstronomyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(249,168,37,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E8EAF6','#1565C0','#F9A825','#6D4C41','#2E7D32','#311B92','#FFEE58'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F9A825" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#F9A825" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#F9A825" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#F9A825" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,168,37,0.2)" />
            <stop offset="50%" stopColor="rgba(249,168,37,0.9)" />
            <stop offset="100%" stopColor="rgba(249,168,37,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F9A825" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TZAB-EK</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(249,168,37,0.8)" fontSize="12" fontFamily="monospace" letterSpacing="2">LA COLA DE SERPIENTE ESTELAR</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(232,234,246,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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
          layoutId="activeDotMayaM10"
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

// ─── Expandable Section ──────────────────────────────────────────────────────
const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};
const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

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
          padding: '0.8rem 1rem', background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
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
          <motion.div
            variants={dirVariants[dir]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`,
              paddingLeft: '0.8rem',
            }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Content Panel ───────────────────────────────────────────────────────────
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
        background: 'rgba(10, 15, 25, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}>
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
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>
        {(node.expandables && node.expandables.length > 0) && (
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explorar más</h4>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
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

        {/* --- Ilustración Científica Temática --- */}
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
          <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '16px', background: `linear-gradient(45deg, ${node.color}15, transparent)`, border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>Dato Científico</span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>{node.fact}</p>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(249,168,37,0.15)' }}>
      <Star size={14} style={{ color: '#F9A825', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} style={{ height: '100%', background: 'linear-gradient(90deg, #F9A825, #6D4C41)', borderRadius: '3px', boxShadow: '0 0 8px rgba(249,168,37,0.4)' }} />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F9A825', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>{explored}/{total}</span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM10() {
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
    <div style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,25,0.85) 0%, rgba(15,20,30,0.8) 40%, rgba(10,15,25,0.88) 100%), ', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <TemporalField />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2, marginBottom: '2rem' }}>
        <MayaAstronomyHeader />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
        {INFOGRAPHIC_NODES.map((node, i) => (
          <NodeButton key={node.id} node={node} index={i} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>
      <div style={{ maxWidth: '300px', margin: '0 auto 1rem', position: 'relative', zIndex: 2 }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>
      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>
      <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', position: 'relative', zIndex: 2 }}>
        <h4 style={{ margin: '0 0 1rem', color: '#F9A825', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={16} /> Fuentes y Bibliografía
        </h4>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((bib, i) => (
            <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <ChevronRight size={12} style={{ color: '#F9A825', marginTop: '4px', flexShrink: 0 }} /> {bib}
            </li>
          ))}
        </ul>
      </div>
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
