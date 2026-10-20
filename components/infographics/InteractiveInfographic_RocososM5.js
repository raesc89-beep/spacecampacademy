'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Marte: El Gigante Oxidado) ──────────────────────
function DecoIronOxide({ size = 70, color = '#E63946', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="24" cy="24" r="3" fill={color} opacity="0.9" />
      <circle cx="36" cy="34" r="4" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoOlympusVolcano({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="40" rx="22" ry="10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M12 40 L26 20 L34 20 L48 40" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="20" rx="4" ry="2" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoVallesCanyon({ size = 70, color = '#D62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 20 L25 35 L35 25 L50 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M10 28 L25 43 L35 33 L50 48" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoAncientRiver({ size = 70, color = '#48CAE4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 15 Q25 30 20 45 T50 50" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M25 30 Q35 38 45 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoAtmosphericSolarWind({ size = 70, color = '#A8DADC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="30" r="14" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M38 15 Q48 30 38 45" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <line x1="2" y1="30" x2="6" y2="30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoPolarIce({ size = 70, color = '#F1FAEE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 36,24 50,30 36,36 30,50 24,36 10,30 24,24" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoRover({ size = 70, color = '#FFB703', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="25" width="20" height="12" rx="2" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="18" cy="42" r="4" fill={color} />
      <circle cx="30" cy="42" r="4" fill={color} />
      <circle cx="42" cy="42" r="4" fill={color} />
      <line x1="30" y1="25" x2="30" y2="12" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'polvo-de-oxido': [DecoIronOxide, DecoOlympusVolcano, DecoVallesCanyon],
  'volcanes-gigantes': [DecoOlympusVolcano, DecoVallesCanyon, DecoRover],
  'valles-marineris': [DecoVallesCanyon, DecoAncientRiver, DecoOlympusVolcano],
  'agua-ancestral': [DecoAncientRiver, DecoAtmosphericSolarWind, DecoPolarIce],
  'colapso-atmosferico': [DecoAtmosphericSolarWind, DecoIronOxide, DecoAncientRiver],
  'casquetes-polares': [DecoPolarIce, DecoAncientRiver, DecoRover],
  'caza-de-biofirmas': [DecoRover, DecoAncientRiver, DecoIronOxide],
};

const BIBLIOGRAPHY = [
  'Carr, M. H., & Head, J. W. (2010). "Geologic history of Mars". Earth and Planetary Science Letters, 294(3-4), 185-203.',
  'Jakosky, B. M., et al. (2018). "Loss of the Martian atmosphere to space: MAVEN observations". Science, 359(6381), 1260-1262.',
  'Grotzinger, J. P., et al. (2014). "A habitable fluvio-lacustrine environment at Yellowknife Bay, Gale Crater, Mars". Science, 343(6169), 1242777.',
  'Ehlmann, B. L., & Edwards, C. S. (2014). "Mineralogy of the Martian surface". Annual Review of Earth and Planetary Sciences, 42, 291-315.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "polvo-de-oxido",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_polvo-de-oxido.webp",
    "title": "El Polvo Oxidado",
    "color": "#E63946",
    "btnImage": "/assets/rocosos/infographic_m5/btn_polvo-de-oxido.webp",
    "image": "/assets/rocosos/infographic_m5/hero_polvo-de-oxido.webp",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_polvo-de-oxido.webp",
    "diagramCaption": "Corte transversal del regolito marciano: micropartículas de hematita férrica y saltación de polvo",
    "content": [
      "El caracteristico tono rojizo que confiere a Marte el sobrenombre de Planeta Rojo no procede de rocas incandescentes ni de pigmentos biologicos, sino de una fina pelicula de regolito superficial profundamente oxidado. Esta capa, cuyo espesor oscila entre escasos milimetros y unos pocos metros segun la region topografica, esta compuesta mayoritariamente por nanominerales de oxido de hierro, destacando la hematita cristalina (Fe2O3), la maghemita ferromagnetica y fases amorfas de ferrihidrita dispersas de forma omnipresente.",
      "El origen petrologico de esta herrumbre global radica en la meteorizacion quimica de las rocas igneas primigenias del planeta, compuestas predominantemente por basaltos toleiticos ricos en olivino y piroxeno ferromagnesianos. Durante eones, trazas ancestrales de vapor de agua y moleculas de dioxido de carbono, fotoionizadas por la implacable radiacion ultravioleta solar en una atmosfera desprovista de capa de ozono, oxidaron sistematicamente el hierro bivalente ferroso (Fe2+) de los silicatos primitivos a hierro trivalente ferrico (Fe3+).",
      "La granulometria media de este polvo marciano es extraordinariamente reducida, con diametros efectivos de particula comprendidos entre uno y tres micrometros, una finura mecanica comparable al talco sintetico o a las particulas del humo de combustion. Esta extrema ligereza permite que los vientos termicos estacionales levanten gigantescas columnas de polvo que se coalescen periodicamente en tormentas globales circunplanetarias, capaces de envolver el globo entero durante meses y alterar el albedo de todo el planeta.",
      "Desde la perspectiva de la exploracion humana e ingenieril, este regolito pulverulento representa una de las amenazas tecnicas mas complejas de gestionar. La sequedad extrema y la radiacion ionizante inducen una elevada carga electrostatica en los granos minerales, facilitando que se adhieran tenazmente a los trajes de actividad extravehicular, sellos hermeticos mecánicos y sensores opticos, actuando como un microabrasivo corrosivo capaz de degradar rodamientos y juntas de teflon en pocas semanas.",
      "Asimismo, los analisis quimicos de superficie realizados por las sondas lander Phoenix y el laboratorio rodante Curiosity han evidenciado concentraciones significativas de sales de perclorato (ClO4-) en el suelo marciano, en proporciones que oscilan entre el 0.5% y el 1.0% en masa. Estas sales actuan como oxidantes altamente toxicos para la biologia celular humana y tiroidea, aunque paradogicamente poseen un punto eutectico que permite a ciertas salmueras acuosas permanecer liquidas a temperaturas de hasta setenta grados Celsius bajo cero."
    ],
    "fact": "El color rojizo de Marte procede de una delgada capa de herrumbre ferrica (Fe2O3) de apenas unos micrometros de tamano de grano, originada por la fotooxidacion ultravioleta de basaltos volcanicos antiguos; el suelo contiene ademas percloratos toxicos que imponen desafios biometricos severos para la futura exploracion tripulada.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los espectrometros de emision termica (TES) y Mossbauer a bordo de los orbitadores y rovers de la NASA demostraron que bajo la pelicula milimetrica de polvo oxidado rojo, la corteza profunda de Marte esta compuesta por rocas volcanicas basalticas inalteradas de color gris pizarra oscuro, dominadas por plagioclasas calcicas y piroxenos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Debido al tamano microscopico de las particulas de hematita suspendidas en el aire marciano, el cielo diurno adquiere un tono amarillento o salmon claro por dispersion de Mie, mientras que las puestas de sol en Marte son de un azul frio espectral porque el polvo dispersa la luz azul hacia adelante con mayor eficiencia que la roja."
      }
    ]
  },
  {
    "id": "volcanes-gigantes",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_volcanes-gigantes.webp",
    "title": "Monte Olimpo",
    "color": "#F4A261",
    "btnImage": "/assets/rocosos/infographic_m5/btn_volcanes-gigantes.jpg",
    "image": "/assets/rocosos/infographic_m5/hero_volcanes-gigantes.jpg",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_volcanes-gigantes.webp",
    "diagramCaption": "Estructura volcánica del Monte Olimpo: 21.9 km de altura y apilamiento sobre un punto caliente estático",
    "content": [
      "Marte ostenta el edificio volcanico mas colosal y masivo de todo el Sistema Solar: el Monte Olimpo (Olympus Mons). Emplazado en el borde noroccidental del gigantesco abultamiento volcano-tectonico de Tarsis, este titan en escudo se eleva veintiun kilometros y novecientos metros sobre el datum altimetrico de referencia global, superando con holgura el doble y medio de la altitud del Monte Everest y triplicando la altura del Mauna Kea medido desde su fosa oceanica abisal.",
      "La planta basal del Monte Olimpo abarca un diametro medio superior a los seiscientos kilometros, una huella superficial comparable a la superficie territorial total de paises enteros como Polonia o el estado de Arizona. El perimetro exterior del volcan no desciende suavemente hacia el terreno colindante, sino que esta delimitado abruptamente por un imponente escarpe o acantilado basal continuo que en varios sectores alcanza desniveles verticales de seis a ocho kilometros de caida libre.",
      "La razon geofisica fundamental por la cual Marte desarrollo estructuras volcanicas tan descomunales radica en la ausencia total de un ciclo de tectonica de placas litosfericas. Mientras que en la Tierra las placas litosfericas se desplazan continuamente sobre plumas mantelicas profundas creando cadenas de volcanes menores y aislados (como el archipielago hawaiano), en Marte la litosfera rigida permanecio estacionaria durante cientos de millones de anos exactamente sobre la misma fuente termica magmatica.",
      "Como consecuencia de esta estabilidad litosferica, innumerables episodios efusivos de lavas basalticas fluidas de bajisima viscosidad se sobreimpusieron capa sobre capa en el mismo punto geografico durante la epoca Hesperiana y Amazonica. Asimismo, la aceleracion de la gravedad marciana en superficie (3.72 metros por segundo al cuadrado, equivalente a un 38% de la terrestre) permitio a la corteza soportar cargas de masa litostatica tres veces mayores antes de experimentar una subsidencia elastica catastrofica.",
      "La cumbre del Monte Olimpo esta coronada por un complejo calderico de ochenta kilometros de longitud por sesenta de anchura y hasta tres kilometros de profundidad, integrado por al menos seis calderas de colapso superpuestas generadas por el vaciado intermitente de las camaras magmaticas subyacentes. El volcan forma parte del cinturon de colosos de Tarsis, junto con Ascraeus Mons (18 km), Pavonis Mons (14 km) y Arsia Mons (16 km), que alteraron decisivamente el momento de inercia planetario."
    ],
    "fact": "El Monte Olimpo alcanza una altitud de 21.9 kilometros y 600 kilometros de diametro basal; su colosal envergadura fue posible gracias a la quietud litosferica marciana, que mantuvo la corteza fija sobre una pluma mantelica estacionaria durante mas de cien millones de anos bajo un regimen gravitatorio de solo 0.38 g.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La cumbre del Monte Olimpo sobrepasa con creces la troposfera densa marciana, elevandose por encima del noventa por ciento de la masa de la tenue atmosfera; la presion de gas en su caldera apenas roza los 0.5 milibares, lo que aproxima el ambiente de su cima a las condiciones de vacio orbital interplanetario."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A pesar de su altitud hiperbolica, la pendiente media de las laderas del Monte Olimpo es de apenas cinco grados: si un astronauta caminase por sus flancos no percibiria sensacion de acantilado abrupto, pues el horizonte planetario quedaria oculto bajo la curvatura de la propia montana antes de divisar la base."
      }
    ]
  },
  {
    "id": "valles-marineris",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_valles-marineris.webp",
    "title": "Valles Marineris",
    "color": "#D62828",
    "btnImage": "/assets/rocosos/infographic_m5/btn_valles-marineris.jpg",
    "image": "/assets/rocosos/infographic_m5/hero_valles-marineris.jpg",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_valles-marineris.webp",
    "diagramCaption": "Falla tectónica de Valles Marineris: 4,000 km de longitud y 11 km de profundidad vertical",
    "content": [
      "Extendiendose a lo largo de mas de cuatro mil kilometros en sentido este-oeste sobre la banda ecuatorial de Marte, el colosal sistema de fracturas de Valles Marineris constituye el canion tectonico mas extenso y profundo del Sistema Solar interior. Su longitud longitudinal cubre practicamente una cuarta parte de la circunferencia entera del planeta, con anchuras que superan los doscientos kilometros en sus fosas centrales y abismos que descienden verticalmente hasta diez u once kilometros de profundidad.",
      "A diferencia del celebre Gran Canion del rio Colorado en la Tierra, cuya genesis responde preponderantemente a la abrasion fluvial continua del agua a traves de estratos horizontales, Valles Marineris es un megasistema de fisuras de origen primordialmente tectonico y estructural. Corresponde a una descomunal fosa tectonica de tipo rift continental generada por los esfuerzos de extension y cizalla que desgarraron la corteza marciana durante el levantamiento del domo magmatico de Tarsis hace tres mil quinientos millones de anos.",
      "A medida que la masa volcanica de Tarsis abombo la litosfera circundante, las tensiones litostaticas provocaron la rotura fragil de la corteza superior en un sistema masivo de fallas normales escalonadas. El sector occidental del complejo se ramifica en una intrincada red ortogonal de fracturas intersectadas denominada Noctis Labyrinthus, la cual transiciona hacia el este en imponentes fosas paralelas conocidas como Ius Chasma, Tithonium Chasma, Melas Chasma, Candor Chasma y Coprates Chasma.",
      "Tras el colapso tectonico original, la geomorfologia de los caniones fue remodelada intensamente por megadeslizamientos de tierras de proporciones planetarias, donde inmensos bloques liticos de varios kilometros colapsaron hacia el fondo del valle moviendose a gran velocidad sobre colchones de polvo y permafrost. Asimismo, en los sectores centrales existen espesas formaciones de depositos estratificados interiores (ILDS) ricos en sulfatos polihidratados como kieserita y yeso sedimentados en antiguos lagos estacionales.",
      "En el extremo oriental, Valles Marineris enlaza con gigantescos canales de desbordamiento catastrofico (outflow channels) como Eos Chasma y Capri Chasma, que desembocan en las tierras bajas de Chryse Planitia. Estos canales de escape muestran evidencias inconfundibles de que colosales reservas de agua y salmueras subcorticales, liberadas termicamente por calor hidrotermal o colapso elastico del permafrost, drenaron abruptamente tallando cañones hidraulicos con caudales de millones de metros cubicos por segundo."
    ],
    "fact": "Con mas de 4,000 kilometros de longitud, 200 de anchura y hasta 11 kilometros de profundidad vertical, Valles Marineris es diez veces mas largo y cuatro veces mas profundo que el Gran Canion de Norteamerica; nacio como un rift tectonico provocado por el abombamiento magmatico de la contigua provincia de Tarsis.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los datos del espectrometro orbital CRISM han detectado en los estratos basales de Melas Chasma y Candor Chasma gruesas secuencias de minerales sulfatados y filosilicatos hidratados, demostrando que los caniones albergaron cuencas lacustres cerradas de aguas mineralizadas acidas durante la transicion Noequiano-Hesperiana."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El sistema recibio su nombre formal en honor a la nave automatica de la NASA Mariner 9, que en 1971 logro ser la primera sonda orbital terrestre en cartografiar Marte; al disiparse una colosal tormenta global de polvo, la camara revelo por vez primera esta descomunal cicatriz en la corteza ecuatorial marciana."
      }
    ]
  },
  {
    "id": "agua-ancestral",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_agua-ancestral.webp",
    "title": "El Pasado Acuático",
    "color": "#48CAE4",
    "btnImage": "/assets/rocosos/infographic_m5/btn_agua-ancestral.webp",
    "image": "/assets/rocosos/infographic_m5/hero_agua-ancestral.webp",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_agua-ancestral.webp",
    "diagramCaption": "Paleohidrología marciana: delta fluvial dendrítico y sedimentación lacustre en el Noeico",
    "content": [
      "A pesar de que Marte se manifiesta en la actualidad como un hiperarido desierto helado dominado por una atmosfera hipertenue, las evidencias geologicas, mineralogicas y geomorfologicas acumuladas confirman sin ambiguedades que el planeta albergo ingentes volumenes de agua liquida estable en su superficie durante la epoca Noequiana temprana, comprendida entre 4.1 y 3.7 miles de millones de anos atras, en una fase climatica templada diametralmente opuesta a la actual.",
      "A lo largo de las antiguas tierras altas del hemisferio sur marciano se conservan miles de redes dendriticas de valles fluviales ramificados, cuya jerarquia de orden hidrologico y patrones de meandros solo pueden ser modelados mediante la precipitacion sostenida de lluvia o nieve y escorrentia superficial duradera. Multiples modelos paleoclimaticos sugieren que las planicies del norte alojaron un oceano primordial circumpolar (Oceanus Borealis) que llego a cubrir un tercio del area planetaria.",
      "Las misiones in situ de los rovers Curiosity y Perseverance han aportado pruebas concluyentes de este pasado hidrologico. En la bahia de Yellowknife dentro del crater Gale, Curiosity descubrio lutitas lacustres de grano fino depositadas en el fondo de un lago de agua dulce de pH practicamente neutro, baja salinidad y con todos los bioelementos clave (carbono, hidrogeno, oxigeno, nitrogeno, fosforo y azufre), confirmando un entorno rigurosamente habitable para organismos microbianos.",
      "Por su parte, en el crater Jezero, el rover Perseverance aterrizó en 2021 sobre un abanico deltaico fosilizado de sobresaliente preservacion estratigrafica. Alli ha documentado cantos rodados redondeados de basalto y cuarcita arrastrados por corrientes fluviales energeticas a lo largo del rio Neretva Vallis, intercalados con estratos de lodolitas y carbonatos precipitados en aguas tranquilas que retuvieron particulas en suspension durante cientos de miles de anos.",
      "El archivo mineralogico analizado por sensores orbitales de infrarrojo cercano como OMEGA y CRISM ratifica esta historia: los terrenos noequianos mas antiguos estan dominados por esmectitas y filosilicatos ricos en hierro y magnesio formados en regimenes de meteorizacion hidrotermal neutra y abundante agua, mientras que las epocas posteriores viraron hacia sulfatos acidos (Hesperiano) y finalmente hacia oxidos ferricos anhidros (Amazonico) conforme el agua libre desaparecia."
    ],
    "fact": "Marte disfruto hace unos 4,000 millones de anos de una hidrosfera activa caracterizada por redes fluviales dendriticas, deltas fosilizados y cuencas lacustres de agua dulce con pH neutro, como las confirmadas en los crateres Gale y Jezero, antes de sufrir una desecacion progresiva que concluyo en su esteril fisonomia actual.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los analisis isotopicos de la relacion deuterio-hidrogeno (D/H) en la atmosfera y arcillas marcianas muestran un enriquecimiento en deuterio de cinco a siete veces superior al estandar oceanico terrestre (VSMOW), demostrando que Marte perdio al espacio el equivalente a una capa global de agua de cientos de metros de espesor."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si se condensase y derritiese de forma instantanea todo el hielo de agua detectado en los casquetes polares y en los depositos glaciares subcorticales enterrados en las latitudes medias, habria volumen hidrico suficiente para inundar la totalidad de la superficie de Marte bajo una capa liquida de mas de treinta metros de profundidad."
      }
    ]
  },
  {
    "id": "colapso-atmosferico",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_colapso-atmosferico.webp",
    "title": "Pérdida de la Magnetosfera",
    "color": "#A8DADC",
    "btnImage": "/assets/rocosos/infographic_m5/btn_colapso-atmosferico.webp",
    "image": "/assets/rocosos/infographic_m5/hero_colapso-atmosferico.webp",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_colapso-atmosferico.webp",
    "diagramCaption": "Despojo atmosférico por el viento solar tras el apagado del geodinamo marciano (misión MAVEN)",
    "content": [
      "El colapso ambiental que transformo a Marte de un planeta templado con rios superficiales en un desierto gelido e inhospito fue desencadenado primordialmente por el cese definitivo de su geodinamo interna. Al poseer un radio de tan solo tres mil trescientos noventa kilometros y una masa equivalente al 10.7% de la terrestre, Marte presento una relacion area-volumen significativamente mayor que la de la Tierra, acelerando la perdida radiativa de su calor termodinamico primordial.",
      "Aproximadamente hace cuatro mil millones de anos (casi coincidiendo con la transicion entre el Noequiano y el Hesperiano temprano), la conveccion en el nucleo exterior metalico de hierro y azufre se debilito por enfriamiento conductivo o estratificacion quimica, colapsando irreversiblemente el dipolo magnetico global que hasta entonces blindaba al planeta frente al plasma interplanetario. Desde ese instante, la alta atmosfera marciana quedo expuesta de lleno al impacto sin frenos del viento solar.",
      "Las mediciones directas y continuadas del orbitador MAVEN (Mars Atmosphere and Volatile EvolutioN) de la NASA, complementadas por las sondas Mars Express y Hope, han desvelado con precision cuantitativa los mecanismos fisicos del despojo atmosferico. El viento solar magnetizado arrastra el gas ionizado mediante procesos de pulverizacion ionica (sputtering), escape fotoquimico exobasico de atomos neutros termicos y arrastre por ondas de choque magnetohidrodinamicas en la magnetopausa inducida.",
      "Durante las eyecciones de masa coronal y tormentas solares severas, la tasa de decapado atmosferico se incrementa en mas de un orden de magnitud, arrancando kilogramos de iones de dioxido de carbono, oxigeno y atomos de hidrogeno cada segundo hacia el espacio interplanetario. Este implacable bombardeo continuo provoco la fuga irreversible de mas del noventa por ciento de la masa de la protoatmosfera marciana a lo largo de eones de historia geologica.",
      "Como resultado de esta erosion hidrodinamica sostenida, la presion atmosferica media en la superficie marciana cayo hasta los 6.1 milibares actuales (alrededor de 0.006 atmosferas terrestres), un valor que coincide criticamente con el punto triple termodinamico del agua (6.11 milibares a 0.01 °C). En este regimen de bajisima densidad barometrica, el agua pura no puede persistir en estado liquido: o bien se sublima instantaneamente en vapor o se congela en hielo cristalino."
    ],
    "fact": "La extincion temprana de la geodinamo marciana hace unos 4,000 millones de anos dejo la atmosfera desprotegida ante el viento solar; la mision MAVEN demostro que este arrastre continuo despojo mas del 90% de la densidad atmosferica original, desplomando la presion en superficie hasta apenas 6.1 milibares.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El espectrometro de masas NGIMS de MAVEN confirmo un pronunciado fraccionamiento de isotopos nobles estables de argon (38Ar/36Ar) y carbono (13C/12C) en la exobase marciana: el viento solar expulsa preferentemente los isotopos ligeros, dejando un registro geofisico inequivoco del volumen de gas fugado."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Aunque Marte carece hoy de dipolo magnetico global, conserva intensas anomalias magneticas corticales fosilizadas en las rocas basalticas de su hemisferio sur: mini-escudos magneticos locales en forma de arcos con intensidades superiores a los 1,500 nanoteslas, testigos mudos del antiguo campo planetario extinto."
      }
    ]
  },
  {
    "id": "casquetes-polares",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_casquetes-polares.webp",
    "title": "Casquetes Polares",
    "color": "#F1FAEE",
    "btnImage": "/assets/rocosos/infographic_m5/btn_casquetes-polares.jpg",
    "image": "/assets/rocosos/infographic_m5/hero_casquetes-polares.jpg",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_casquetes-polares.webp",
    "diagramCaption": "Estratigrafía polar de Marte: núcleo de hielo de agua permanente y cubierta estacional de hielo seco",
    "content": [
      "En las regiones boreales y australes de Marte se asientan dos espectaculares formaciones glaciares permanentes: Planum Boreum en el polo norte y Planum Australe en el polo sur. A diferencia de las masas de hielo de la Tierra compuestas exclusivamente por agua mineralizada, los casquetes marcianos presentan una singular arquitectura hibrida de dos componentes termodinamicos: un nucleo perenne de hielo de agua (H2O) cubierto estacionalmente por un estrato dinamico de dioxido de carbono congelado (CO2) o hielo seco.",
      "El casquete boreal permanente es la reserva mas voluminosa de agua superficial del planeta: se extiende sobre un diametro circular de mil kilometros con espesores centrales que superan los tres kilometros, albergando aproximadamente 1.6 millones de kilometros cubicos de hielo de agua cristalina de alta pureza. En cambio, el polo sur exhibe un casquete residual permanente mucho menor, pero recubierto de forma continua por una capa de hielo seco de dioxido de carbono de varios metros de grosor que nunca llega a sublimar del todo.",
      "Durante los rigorosos inviernos polares marcianos, cuando la insolacion solar se anula y las temperaturas descienden por debajo de los ciento veinticinco grados Celsius bajo cero (-125 °C), el dioxido de carbono de la atmosfera se condensa de manera directa sobre la superficie en un manto estacional de nieve carbonica de uno a dos metros de espesor. Este ciclo anual es tan descomunal que hasta un tercio de la masa total de la atmosfera del planeta se congela y deposita en los polos, provocando fluctuaciones ciclicas de la presion atmosferica global.",
      "Al advenir la primavera polar, la radiacion solar penetra las placas semitranslucidas de hielo seco estacional, calentando el regolito oscuro subyacente. Esto provoca una sublimacion basal explosiva a alta presion: el gas de dioxido de carbono confinado revienta las losas de hielo superiores liberando violentos geiseres hidrocarburicos que expulsan arena oscura a gran altitud, esculpiendo en la superficie fascinantes estructuras radiales conocidas como terrenos aracnidos o araneiformes.",
      "Mediante el radar de apertura sintetica SHARAD a bordo del Mars Reconnaissance Orbiter, los cientificos han cartografiado el interior profundo de los polos, descubriendo cientos de estratos finos alternados de hielo y polvo volcanico (Planum Boreum Layered Deposits). Estas capas laminadas constituyen el registro paleoclimatico mas detallado de Marte, documentando con precision milimetrica las oscilaciones ciclicas de la oblicuidad y excentricidad orbital del planeta a lo largo de los ultimos cinco millones de anos."
    ],
    "fact": "Los casquetes polares de Marte combinan nucleos permanentes de hielo de agua de hasta 3 kilometros de grosor con cubiertas estacionales de hielo seco (CO2); en cada invierno polar, un tercio de la masa atmosferica total del planeta se congela directamente sobre ellos, regulando los patrones barometricos marcianos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El radar de penetracion SHARAD y sondas orbitales han localizado extensos glaciares de agua pura amortiguados bajo mantos de regolito de escombros (lobate debris aprons) en latitudes medias templadas de Marte, protegiendo depositos glaciares milenarios de la sublimacion directa en la tenue atmosfera actual."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el casquete polar norte, una descomunal sima espiralada denominada Chasma Boreale de quinientos kilometros de longitud penetra hasta la base del hielo; se cree que fue excavada por vientos catabaticos huracanados modulados por el efecto Coriolis combinados con antiguos drenajes subglaciares hidrotermales."
      }
    ]
  },
  {
    "id": "caza-de-biofirmas",
    "bannerImage": "/assets/rocosos/infographic_m5/banner_caza-de-biofirmas.webp",
    "title": "Caza de Biofirmas",
    "color": "#FFB703",
    "btnImage": "/assets/rocosos/infographic_m5/btn_caza-de-biofirmas.webp",
    "image": "/assets/rocosos/infographic_m5/hero_caza-de-biofirmas.webp",
    "diagramImage": "/assets/rocosos/infographic_m5/diagram_caza-de-biofirmas.webp",
    "diagramCaption": "Perforación robótica de testigos sedimentarios para la detección de biofirmas en el cráter Jezero",
    "content": [
      "La busqueda de biofirmas (evidencias quimicas, texturales, mineralogicas o isotopicas de vida microbiana preterita) constituye la piedra angular de la exploracion contemporanea de Marte. Aunque la superficie presente es esteril e inhospita debido a la combinacion letal de radiacion cosmica galactica, flujo ultravioleta y la accion lixiviante de sales percloradas oxidantes, las rocas sedimentarias de cuatro mil millones de anos preservan entornos donde la quimica prebiotica pudo evolucionar.",
      "La investigacion comenzo historicamente en 1976 con los experimentos metabolicos de biologia a bordo de las sondas Viking 1 y 2 (Liberacion Etiquetada, Liberacion Pirolitica e Intercambio de Gases). Aunque se registraron reacciones cineticas positivas inmediatas, el consenso cientifico moderno determino que los resultados fueron producto de la extrema reactividad quimica abiotica de los peroxidos y percloratos del regolito catalizados por radiacion UV, y no de metabolismo celular.",
      "El cambio de paradigma moderno se materializo con el rover Curiosity en el crater Gale mediante el conjunto instrumental SAM (Sample Analysis at Mars). Utilizando pirolisis y cromatografia de gases acoplada a espectrometria de masas, Curiosity extrajo de lutitas de 3.5 miles de millones de anos una variada gama de moleculas organicas complejas, incluyendo tiofenos, benceno, tolueno y cadenas alifaticas de hidrocarburos, demostrando que la materia organica carbonacea logra sobrevivir eones encapsulada en minerales de azufre.",
      "Desde su amerizaje en 2021 en el delta del crater Jezero, el rover Perseverance de la NASA lidera la prospeccion astrobiologica mas sofisticada jamas concebida. Sus instrumentos de microespectroscopia SHERLOC (Raman y fluorescencia UV profunda) y PIXL (fluorescencia de rayos X a escala microscopica) permiten cartografiar la correlacion espacial exacta entre compuestos aromaticos carbonaceos y minerales alterados hidrotermalmente en vetas de silice y carbonatos.",
      "Perseverance ha perforado decenas de testigos liticos cilindricos milimetricamente sellados en tubos hermeticos de titanio ultralimpio, depositandolos estrategicamente en depositos de superficie y en su chasis. Estos tubos constituyen el cargamento central de la ambiciosa campana multinacional Mars Sample Return (NASA/ESA), concebida para trasladar estas muestras virgenes a laboratorios terrestres ultraseguros a fin de evaluar relaciones isotopicas 12C/13C, quiralidad molecular y posibles microfosiles."
    ],
    "fact": "La busqueda de biofirmas en Marte, liderada por el rover Perseverance en el crater Jezero, recolecta testigos de rocas lacustres en tubos hermeticos de titanio para la mision Mars Sample Return, buscando firmas isotopicas de carbono y microestructuras fosiles que revelen si la vida llego a emerger en el pasado acuatico marciano.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las detecciones recurrentes de plumas estacionales de gas metano (CH4) en concentraciones de partes por billon, detectadas in situ por Curiosity y respaldadas por la sonda Trace Gas Orbiter (TGO), siguen en intenso debate: podrian derivar de serpentinizacion abiotica subterranea de olivino o de microorganismos metanogenos del subsuelo profundo."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los tubos de titanio donde Perseverance almacena los testigos de roca marciana son los objetos mas limpios jamas fabricados por la humanidad: fueron horneados y purgados en salas esteriles con niveles de contaminacion biologica terrestre practicamente nulos para evitar cualquier resultado falso positivo al analizarlos en la Tierra."
      }
    ]
  }
];

export default function InteractiveInfographic_RocososM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,10,12,0.92) 0%, rgba(35,15,18,0.88) 40%, rgba(18,8,10,0.95) 100%)',
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
      <RockyDustField color1="230, 57, 70" color2="244, 162, 97" />
      <RocososHeader title="MARTE: EL GIGANTE OXIDADO" subtitle="EL PLANETA ROJO Y LA BÚSQUEDA DE VIDA" primaryColor="#E63946" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #E63946, #F4A261)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar las maravillas de Marte.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #E6394660' }}>
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

function RockyDustField({ color1 = '230, 57, 70', color2 = '244, 162, 97' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM5)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM5" x1="0" y1="0" x2="1" y2="0">
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
        background: 'rgba(25, 12, 14, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
