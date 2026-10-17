'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Futuro de los Planetas Rocosos) ─────────────────
function DecoRedGiant({ size = 70, color = '#FF0054', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="8" fill={color} />
    </svg>
  );
}

function DecoOceanEvap({ size = 70, color = '#FFBD00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 45 Q20 30 30 45 T50 45" fill="none" stroke={color} strokeWidth="2" />
      <path d="M15 25 L15 10 M30 25 L30 10 M45 25 L45 10" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function DecoThermalVenus({ size = 70, color = '#FF5400', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M15 30 Q30 10 45 30 Q30 50 15 30 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoTerraformDome({ size = 70, color = '#3A86FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 45 A20 20 0 0 1 50 45 Z" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <line x1="10" y1="45" x2="50" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="38" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoTrappistSystem({ size = 70, color = '#8338EC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="6" fill={color} />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="44" cy="30" r="2.5" fill={color} />
    </svg>
  );
}

function DecoAsteroidMining({ size = 70, color = '#00F5D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 45,20 40,42 18,45 12,25" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="30" y1="10" x2="30" y2="45" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoFinalDestiny({ size = 70, color = '#7000FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="30" cy="30" r="3" fill="#FFF" />
      <path d="M10 10 L20 20 M50 10 L40 20 M10 50 L20 40 M50 50 L40 40" stroke={color} strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'gigante-roja': [DecoRedGiant, DecoOceanEvap, DecoThermalVenus],
  'evaporacion-oceanos': [DecoOceanEvap, DecoRedGiant, DecoTerraformDome],
  'descomposicion-venus': [DecoThermalVenus, DecoRedGiant, DecoFinalDestiny],
  'marte-segundo-hogar': [DecoTerraformDome, DecoTrappistSystem, DecoAsteroidMining],
  'exoplanetas-rocosos': [DecoTrappistSystem, DecoTerraformDome, DecoFinalDestiny],
  'recursos-planetarios': [DecoAsteroidMining, DecoTrappistSystem, DecoTerraformDome],
  'destino-final-rocas': [DecoFinalDestiny, DecoRedGiant, DecoTrappistSystem],
};

const BIBLIOGRAPHY = [
  'Scharf, C. A. (2009). "Extrasolar Planets and Astrobiology". University Science Books.',
  'Schroder, K. P., & Smith, R. C. (2008). "Distant future of the Sun and Earth revisited". Monthly Notices of the Royal Astronomical Society, 386(1), 155-163.',
  'Gillon, M., et al. (2017). "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1". Nature, 542(7642), 456-460.',
  'McInnes, C. R. (2002). "Astronomical engineering: a review of concepts for altering planetary orbits". Journal of the British Interplanetary Society, 55, 360-368.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "gigante-roja",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_gigante-roja.webp",
    "title": "El Sol Gigante Roja",
    "color": "#FF0054",
    "btnImage": "/assets/rocosos/infographic_m6/btn_gigante-roja.webp",
    "image": "/assets/rocosos/infographic_m6/hero_gigante-roja.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_gigante-roja.webp",
    "diagramCaption": "Evolución estelar: expansión del Sol en gigante roja y engullimiento de los planetas interiores",
    "content": [
      "Los planetas rocosos no son entidades estables e imperecederas; su ciclo existencial y destino termodinamico estan subordinados de manera ineludible a las fases de evolucion estelar del Sol. Nuestra estrella central es una enana amarilla de la secuencia principal (clasificacion espectral G2V) que funde hidrogeno en helio dentro de su nucleo termonuclear a un ritmo constante, encontrandose actualmente en la mitad de su vida activa de aproximadamente diez mil millones de anos.",
      "Dentro de unos cinco mil millones de anos (5 Ga), el hidrogeno nuclear del nucleo solar se agotara por completo, provocando la perdida del equilibrio hidrostatico interno. Al cesar las reacciones de fusion central, el nucleo de cenizas de helio colapsara bajo su propio peso gravitatorio, elevando su temperatura hasta encender la fusion de hidrogeno en una capa delgada periférica; este incremento radical de la presion de radiacion empujara las capas convectivas exteriores del Sol en una expansion monstruosa hacia el espacio interplanetario.",
      "En esta fase de gigante roja, el radio fotosferico del Sol crecera entre ciento cincuenta y mas de doscientas veces su tamano actual, alcanzando dimensiones comprendidas entre 1.0 y 1.2 unidades astronomicas (mas de ciento cincuenta millones de kilometros de radio). Su temperatura efectiva superficial caera desde los actuales cinco mil setecientos kelvins hasta unos tres mil kelvins adquiriendo un brillo rojizo profundo, pero su luminosidad bolometrica total aumentara mas de dos mil veces respecto a los valores actuales.",
      "Durante esta colosal hinchazon estelar, los mundos rocosos interiores sufriran una transformacion radical. Mercurio y Venus seran inexorablemente engullidos por las capas fotosfericas solares, desintegrandose por friccion de plasma denso. En el caso de la Tierra, aunque el Sol perdera aproximadamente un treinta por ciento de su masa total debido a potentes vientos estelares supermasivos (lo cual expandira ligeramente el semieje mayor de las orbitas planetarias), la interaccion de marea gravitatoria sellara el destino terrestre.",
      "Segun los modelos fisicos mas rigurosos de evolucion estelar y mecanica orbital (como los calculos de Schroder y Smith), las fuerzas de friccion hidrodinámica con la tenue corona solar extendida y la disipacion de mareas frenaran la velocidad orbital de la Tierra. Esto provocara que el planeta espiralice hacia el interior del astro en expansion, siendo engullido y vaporizado completamente justo antes de que el Sol alcance la punta de la rama de gigantes rojas (tip of the red-giant branch)."
    ],
    "fact": "Dentro de 5,000 millones de anos el Sol agotara su hidrogeno y se expandira como gigante roja, multiplicando su radio mas de 200 veces y su luminosidad 2,000 veces; la perdida de masa estelar expandira las orbitas, pero la friccion con el plasma y la disipacion de marea devoraran a Mercurio, Venus y finalmente a la Tierra.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Durante la fase maxima de gigante roja, la zona de habitabilidad circunestelar se desplazara desde la franja actual de 1 UA hacia las 40 a 70 UA, transformando temporalmente los satelites helados Europa, Ganimedes y especialmente Titan en mundos con oceanos templados superficiales durante unos cien millones de anos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El Sol culminara su fase de gigante roja con el encendido explosivo y casi instantaneo de la fusion del helio en su nucleo degenerado, un fenomeno astrofisico denominado flash del helio, en el cual se libera en pocos minutos una energia termica colosal antes de que la estrella recupere una configuracion estable en la rama horizontal."
      }
    ]
  },
  {
    "id": "evaporacion-oceanos",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_evaporacion-oceanos.webp",
    "title": "Evaporación de Océanos",
    "color": "#FFBD00",
    "btnImage": "/assets/rocosos/infographic_m6/btn_evaporacion-oceanos.webp",
    "image": "/assets/rocosos/infographic_m6/hero_evaporacion-oceanos.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_evaporacion-oceanos.webp",
    "diagramCaption": "Evaporación runaway de los océanos terrestres por el aumento secular del brillo solar",
    "content": [
      "La habitabilidad superficial de la Tierra posee una fecha de caducidad geofisica mucho mas proxima en el tiempo que la invasion fisica de la gigante roja. Debido a la fisica de los reactores de fusion estelar, a medida que el Sol transforma nucleos de hidrogeno en helio dentro de su corazon termonuclear, el peso molecular medio del plasma central aumenta; esto obliga al nucleo a contraerse lentamente y a elevar su temperatura, provocando que la luminosidad del Sol aumente de forma inexorable a un ritmo de aproximadamente un diez por ciento cada mil cien millones de anos.",
      "Dentro de aproximadamente mil millones de anos (1.0 a 1.1 Ga en el futuro), la irradiacion solar que incide sobre la parte superior de la atmosfera terrestre se habra incrementado lo suficiente para alterar de forma catastrofica el ciclo geoquimico del carbono y el clima planetario. Las temperaturas medias globales sobrepasaran los sesenta y setenta grados Celsius, provocando una tasa masiva y acelerada de evaporacion de los oceanos mundiales que saturara por completo la columna troposferica de vapor de agua.",
      "El vapor de agua (H2O) gaseoso es un gas de efecto invernadero infrarrojo extraordinariamente eficiente, muy superior al dioxido de carbono. Al acumularse masivamente en el aire, atrapara el calor emitido por la superficie terrestre desatando una retroalimentacion climatica positiva irreversible conocida en planetologia como efecto invernadero humedo (moist greenhouse) y, finalmente, un regimen termodinamico de invernadero desbocado (runaway greenhouse) similar al que asolo a Venus primitivo.",
      "En este estado supercaliente, las moleculas de agua ascenderan libremente hacia la estratosfera y mesosfera terrestre, regiones que actualmente actuan como una trampa fria seca. Alli, la despiadada radiacion ultravioleta solar fotodisociara los enlaces moleculares liberando atomos de oxigeno e hidrogeno; los atomos de hidrogeno, al ser los elementos quimicos mas ligeros del universo, alcanzaran velocidades termicas que exceden la velocidad de escape terrestre, fugandose hacia el espacio interplanetario mediante escape hidrodinamico.",
      "En un lapso estimado de mil quinientos a dos mil millones de anos a partir del presente, la Tierra habra perdido al espacio exterior hasta la ultima gota de sus 1.38 miles de millones de kilometros cubicos de agua oceanica. Desprovisto de agua, el manto superior se secara por completo, deteniendo para siempre la lubricacion de las fallas y poniendo fin al ciclo de tectonica de placas; la biosfera compleja se extinguira por completo, dejando tras de si una litosfera esteril, cuarteada y cubierta por llanuras salinas abrasadoras."
    ],
    "fact": "El aumento gradual del 10% en el brillo solar cada 1,100 millones de anos hara que en unos 1,000 millones de anos los oceanos terrestres entren en ebullicion e invernadero humedo; el vapor de agua sera disociado por radiacion UV y el hidrogeno escapara al espacio, desecando totalmente la Tierra y extinguiendo la vida compleja.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Mucho antes de la evaporacion total del agua (en unos 600 a 800 millones de anos), el aumento de la meteorizacion quimica de silicatos consumira casi todo el CO2 atmosferico, reduciendolo por debajo de 10 partes por millon, un nivel letal que impedira la fotosintesis C3 y C4, provocando la extincion masiva de la vida vegetal."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los ultimos seres vivos que sobreviviran en la Tierra calcinada dentro de 1,500 millones de anos seran comunidades microbianas extremófilas quimiolitotrofas refugiadas en cavidades profundas de la corteza continental y acuiferos salinos subcorticales, replicando las mismas condiciones en las que emergio la vida primigenia."
      }
    ]
  },
  {
    "id": "descomposicion-venus",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_descomposicion-venus.webp",
    "title": "Transformación de Venus",
    "color": "#FF5400",
    "btnImage": "/assets/rocosos/infographic_m6/btn_descomposicion-venus.webp",
    "image": "/assets/rocosos/infographic_m6/hero_descomposicion-venus.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_descomposicion-venus.webp",
    "diagramCaption": "Metamorfismo térmico y fusión cortical de Venus bajo un flujo solar intensificado",
    "content": [
      "Ubicado a tan solo 0.72 unidades astronomicas del Sol, el planeta Venus sera el primer cuerpo planetario de masa terrestre en experimentar de lleno la devastacion termica y estructural provocada por la agonia estelar. Mucho antes de que el Sol alcance su diametro de gigante roja maximo, el incremento sustancial en el flujo radiativo estelar calentara la ya abrasadora superficie venusiana (actualmente a cuatrocientos sesenta y cinco grados Celsius) hasta extremos termodinamicos inauditos.",
      "Cuando la insolacion solar sobrepase con holgura los cinco mil vatios por metro cuadrado, las temperaturas superficiales en Venus ascenderan por encima de los mil quinientos y dos mil grados Celsius (1,800 a 2,300 K). A estas temperaturas infernales, el punto de fusion de los silicatos y basaltos comunes sera rebasado con holgura: la totalidad de la corteza solida y las altiplanicies volcanicas de Ishtar y Aphrodite Terra colapsaran, convirtiendo al planeta entero en un reluciente oceano global de magma incandescente.",
      "Al mismo tiempo, la densa atmosfera de noventa y dos bares de dioxido de carbono experimentara una expansion hidrotermica catastrofica. El viento estelar y la radiacion ultravioleta extrema arrancaran la envoltura gaseosa mediante fotoevaporacion energetica, dispersando miles de millones de toneladas de carbono, oxigeno y derivados de azufre en una densa cola cometaria ionizada que cruzara el Sistema Solar interior.",
      "Cuando el borde fotosferico del Sol gigante finalmente alcance la posicion orbital de Venus (a ciento ocho millones de kilometros del centro estelar), el planeta no colisionara como una roca contra una pared solida, sino que penetrara en las capas de plasma ionizado exterior del astro. El inmenso arrastre aerodinámico y la friccion magnetohidrodinamica disiparan el momento angular orbital del planeta, forzandolo a describir una espiral descendente suicida hacia el interior del Sol.",
      "Al cruzar el limite de marea de Roche fluido, las descomunales fuerzas diferenciales de la gravedad solar desgarraran la esfera magmatica de Venus en jirones de roca fundida y particulas de polvo refractario. Los atomos de hierro, niquel, silicio y magnesio que constituyeron el planeta durante cuatro mil quinientos millones de anos se disolveran y mezclaran intimamente en la masa convectiva del Sol, alterando la composicion quimica y la metalicidad superficial de la estrella."
    ],
    "fact": "Al estar a 0.72 UA del Sol, Venus sera transformado en un oceano de magma incandescente a mas de 1,800 °C mucho antes del engullimiento final; al penetrar en la atmosfera de plasma de la gigante roja, el frenado orbital forzara su caida en espiral hasta ser destrozado por fuerzas de marea y disuelto en el interior solar.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los astronomos han detectado huellas inequivocas de 'canibalismo planetario' en estrellas gigantes rojas reales de la Via Lactea, evidenciadas por picos anómalos de elementos liticos refractarios como el litio-7 y aumentos transitorios en la velocidad de rotacion estelar causados por la absorcion del momento angular de exoplanetas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La completa disolucion de la masa de Venus (casi 5 cuatrillones de kilogramos) dentro de la envoltura solar liberara una cantidad descomunal de energia de enlace gravitatoria, generando un resplandor transitorio que seria visible como una llamarada brillante para observadores situados en sistemas estelares vecinos."
      }
    ]
  },
  {
    "id": "marte-segundo-hogar",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_marte-segundo-hogar.webp",
    "title": "Marte y Terraformación",
    "color": "#3A86FF",
    "btnImage": "/assets/rocosos/infographic_m6/btn_marte-segundo-hogar.webp",
    "image": "/assets/rocosos/infographic_m6/hero_marte-segundo-hogar.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_marte-segundo-hogar.webp",
    "diagramCaption": "Macroingeniería planetaria: dipolo magnético en L1 y liberación de gases para espesar la atmósfera",
    "content": [
      "A medida que la irradiacion solar incremente sus valores y convierta progresivamente a la Tierra en un desierto estéril a lo largo de los proximos dos mil millones de anos, la zona de habitabilidad del Sistema Solar se desplazara hacia el exterior, intersecando de lleno la orbita del planeta Marte (situada a una distancia media de 1.52 unidades astronomicas). Este desplazamiento astrofisico confiere al Planeta Rojo un papel estrategico en la supervivencia a largo plazo de la civilizacion biologica y tecnologica.",
      "En el plano teorico e ingenieril de la planetologia, el concepto de terraformacion persigue transformar deliberadamente el ambiente hiperarido, gelido e hipobarico de Marte en una biosfera abierta con presion atmosferica respirable, temperatura clemente y ciclos hidrologicos superficiales estables. No obstante, los inventarios cuantitativos de volatiles realizados por misiones orbitales modernas han impuesto severas restricciones fisicas a este sueno exploratorio.",
      "Un estudio exhaustivo publicado por Bruce Jakosky y Christopher Edwards en 2018 demostro que si se sublimasen la totalidad de las reservas de dioxido de carbono accesibles en los casquetes polares, regolito adsorbente y minerales carbonatados marcianos, la presion atmosferica superficial apenas aumentaria de 6 a unos 20 o 30 milibares, un valor absolutamente insuficiente para impedir la ebullicion del agua o evitar el colapso pulmonar (se requieren un minimo de trescientos milibares para la supervivencia basica con mascara de oxigeno).",
      "Por consiguiente, una terraformacion efectiva requeriria macroproyectos de astroingenieria radical: la desviacion deliberada de decenas de asteroides y cometas ricos en amoniaco y agua procedentes del cinturon de Kuiper para inyectar nitrogeno molecular (el gas amortiguador indispensable para evitar la hiperoxia inflamable), y la sintesis industrial masiva de supergases de efecto invernadero fluorados artificiales (como clorofluorocarburos, SF6 o octafluoropropano), cuyo potencial de calentamiento radiativo supera diez mil veces al CO2.",
      "Asimismo, para impedir que el viento solar vuelva a despojar los nuevos gases atmosfericos generados artificialmente en un mundo sin geodinamo, los fisicos han propuesto situar una estacion de generacion de campo magnetico dipolar artificial de uno o dos teslas en el punto de libracion gravitatoria de Lagrange L1 entre Marte y el Sol. Esta configuracion crearia una magnetopausa deflector artificial que protegeria la atmosfera restaurada permitiendo que oceanos y bosques prosperen durante siglos."
    ],
    "fact": "La terraformacion de Marte demandaria macroingenieria a escala planetaria: los volatiles marcianos actuales solo alcanzarian unos 20-30 milibares de presion, por lo que se requeriria bombardeo cometario para aportar nitrogeno, produccion industrial de gases fluorados y un escudo dipolar magnetico artificial en el punto L1 Sol-Marte.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La baja gravedad de Marte (0.38 g) implica que para lograr una presion atmosferica equivalente a la terrestre en superficie (1,013 mbar), la masa total de la columna de aire marciana deberia ser 2.6 veces mayor por metro cuadrado que la de la Tierra, lo que exigiría manufacturar billones de toneladas de gases atmosfericos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Incluso sin terraformacion completa, la utilizacion de recursos in situ (ISRU), como demostro el instrumento MOXIE de Perseverance al fabricar oxigeno respirable directamente del CO2 marciano mediante electrolisis de oxido solido, hara posible sostener colonias permanentes bajo biodomos presurizados en tubos de lava naturales."
      }
    ]
  },
  {
    "id": "exoplanetas-rocosos",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_exoplanetas-rocosos.webp",
    "title": "Super-Tierras y TRAPPIST-1",
    "color": "#8338EC",
    "btnImage": "/assets/rocosos/infographic_m6/btn_exoplanetas-rocosos.webp",
    "image": "/assets/rocosos/infographic_m6/hero_exoplanetas-rocosos.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_exoplanetas-rocosos.webp",
    "diagramCaption": "Arquitectura orbital comparada: los 7 exoplanetas rocosos de TRAPPIST-1 en resonancia armónica",
    "content": [
      "La frontera del conocimiento geologico y astrobiologico de los mundos rocosos ha trascendido definitivamente los confines del Sistema Solar. A traves de las observaciones fotometricas de precision de los telescopios espaciales Kepler, TESS y CHEOPS, y la caracterizacion espectroscopica pionera del Telescopio Espacial James Webb (JWST), los astronomos han confirmado la existencia de miles de exoplanetas de naturaleza solida y litosferica en la Via Lactea.",
      "Entre estos hallazgos destaca la ubicua clase de las Super-Tierras: exoplanetas terrestres con masas comprendidas entre una y diez veces la masa terrestre y radios de hasta 1.5 o 1.7 radios terrestres. Las mediciones espectroscopicas de alta resolucion han permitido identificar el denominado valle del radio de Fulton, una profunda division observacional a 1.8 radios terrestres que separa mundos puramente rocosos con nucleos metalicos de sub-Neptunos gaseosos envueltos en densos mantos de hidrogeno primordial.",
      "El laboratorio cosmico mas extraordinario para la investigacion de planetas rocosos compactos es el sistema TRAPPIST-1, una estrella enana roja ultrafría de tipo espectral M8V situada a casi cuarenta anos luz de la Tierra en la constelacion de Acuario. Este astro alberga una familia de siete exoplanetas de tamano y composicion sorprendentemente similares a la Tierra y Venus (TRAPPIST-1b hasta 1h), organizados en una apretada cadena de resonancias orbitales casi matematicamente perfectas.",
      "Tres de estos mundos (TRAPPIST-1e, f y g) orbitan comodamente dentro de la zona de habitabilidad templada de la estrella, donde el agua liquida podria sostenerse sobre sus lechos rocosos. No obstante, al encontrarse muy proximos a su diminuta estrella central, estos planetas sufren un intenso acoplamiento de marea que los fuerza a una rotacion sincronizada, exhibiendo perpetuamente un hemisferio abrasador iluminado y un hemisferio nocturno congelado en tinieblas.",
      "Asimismo, los analisis de transmision infrarroja realizados por los instrumentos MIRI y NIRSpec del JWST estan investigando si estos mundos han logrado retener sus atmosferas ante el persistente bombardeo de fulguraciones ultravioleta extremo y viento estelar de las enanas M; dado que las enanas rojas pueden quemar combustible de hidrogeno de forma estable durante billones de anos (un lapso miles de veces mayor que la vida del Sol), sus planetas rocosos representan los habitats mas longevos del cosmos."
    ],
    "fact": "El sistema TRAPPIST-1 alberga siete exoplanetas rocosos de tamano terrestre orbitando una enana roja ultrafría a 40 anos luz; tres de ellos yacen en la zona de habitabilidad; con estrellas enanas que viven billones de anos, estos mundos rocosos sincronizados por marea representan los refugios mas longevos para la vida en la galaxia.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las observaciones termicas de emision en el canal de 15 micrometros del JWST/MIRI sobre TRAPPIST-1b y 1c han descartado atmosferas densas de CO2 o vapor de agua similares a la de Venus, sugiriendo que la intensa actividad de llamaradas tempranas de la enana roja despojo las envolturas gaseosas de los planetas interiores."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La proximidad fisica mutua entre los planetas del sistema TRAPPIST-1 es tan asombrosa que un hipotetico observador en la superficie de TRAPPIST-1e contemplaria los discos de los planetas vecinos en su cielo con un tamano angular dos o tres veces mayor que el disco de la Luna llena visto desde la Tierra."
      }
    ]
  },
  {
    "id": "recursos-planetarios",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_recursos-planetarios.webp",
    "title": "Minería Espacial",
    "color": "#00F5D4",
    "btnImage": "/assets/rocosos/infographic_m6/btn_recursos-planetarios.webp",
    "image": "/assets/rocosos/infographic_m6/hero_recursos-planetarios.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_recursos-planetarios.webp",
    "diagramCaption": "Utilización de recursos in situ (ISRU): extracción de agua y refinación magnética de metales siderófilos",
    "content": [
      "El devenir evolutivo de la civilizacion industrial humana esta indisolublemente ligado a la explotacion geologica y quimica de los cuerpos rocosos y metalicos menores del Sistema Solar. Los recursos minerales accesibles en la corteza terrestre sufren un continuo agotamiento energetico y ecologico debido a milenios de extraccion minera intensiva; en contraposicion, los asteroides cercanos a la Tierra (NEAs) y el cinturon principal conservan una cornucopia mineral intacta desde la nebulosa protoplanetaria.",
      "Desde la optica de la geoquimica cosmica, los cuerpos rocosos diferenciados del cinturon de asteroides experimentaron procesos de segregacion gravitatoria similares a los planetas terrestres mayores. Los asteroides de tipo espectral M, cuyo maximo exponente es el titan 16 Psyche (un asteroide de mas de doscientos kilometros de diametro que constituye el nucleo metalico expuesto de un protoplaneta destrozado por colisiones catastroficas), estan formados casi integramente por aleaciones puras de hierro, niquel y cobalto nativos.",
      "De manera aun mas prometedora para la alta tecnologia, estos fragmentos de nucleos asteroides albergan concentraciones descomunales de metales del grupo del platino (PGMs: platino, rutenio, rodio, paladio, osmio e iridio), elementos que en la Tierra se hundieron gravitatoriamente hacia el nucleo inaccessible durante la catastrofe del hierro, existiendo en la corteza superficial solo en fracciones de partes por millon; un solo asteroide metalico de quinientos metros puede contener mas reservas de platino que toda la historia minera humana.",
      "Sin embargo, el recurso economico mas valioso en la etapa inicial de expansion orbital no son los metales preciosos, sino el agua ligada quimicamente en los asteroides primitivos de tipo C (condritas carbonaceas como Bennu y Ryugu). Estos cuerpos contienen entre un diez y un quince por ciento de su peso en agua atrapada en filosilicatos y arcillas; su extraccion mediante desgasificacion termica solar directa permite obtener hielo purificado para soporte biologico vital y producir propulsores criogenicos liquidos (hidrogeno y oxigeno liquidificados).",
      "La disponibilidad de propelentes manufacturados in situ en el espacio deep space elimina la abrumadora penalizacion gravitatoria del cohete terrestre (escapar del pozo gravitatorio de la Tierra demanda un cambio de velocidad Delta-v de nueve punto cuatro kilometros por segundo). La mineria de asteroides se erige asi como la columna vertebral de la infraestructura industrial orbital futura, posibilitando la manufactura de gigantescas estaciones espaciales, centrales solares fotovoltaicas orbitales y escudos radiativos de regolito denso."
    ],
    "fact": "La mineria de asteroides ofrece acceso a concentraciones intactas de metales siderofilos y del grupo del platino concentrados en asteroides tipo M como 16 Psyche, asi como a ingentes volumenes de agua en condritas carbonaceas tipo C; el agua procesada in situ como propelente rompera la tirania del pozo gravitatorio terrestre.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los analisis de las muestras pristine recolectadas y retornadas a la Tierra por la mision OSIRIS-REx de la NASA desde el asteroide carbonaceo Bennu revelaron abundante materia organica prebiotica rica en carbono, nitrogeno y fosfatos solubles en agua, confirmando el potencial quimico de estos reservorios espaciales."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Se estima que el valor teorico de los minerales industriales y metales tecnologicos contenidos en el asteroide 16 Psyche supera con creces los diez trillones de dolares en la economia terrestre, una cifra que multiplica por miles el producto interno bruto consolidado de todas las naciones del mundo juntas."
      }
    ]
  },
  {
    "id": "destino-final-rocas",
    "bannerImage": "/assets/rocosos/infographic_m6/banner_destino-final-rocas.webp",
    "title": "El Destino Final",
    "color": "#7000FF",
    "btnImage": "/assets/rocosos/infographic_m6/btn_destino-final-rocas.webp",
    "image": "/assets/rocosos/infographic_m6/hero_destino-final-rocas.webp",
    "diagramImage": "/assets/rocosos/infographic_m6/diagram_destino-final-rocas.webp",
    "diagramCaption": "Destino cósmico final: enana blanca central rodeada por disco de escombros planetarios desintegrados",
    "content": [
      "A escalas de tiempo cosmológicas que superan miles de millones y billones de anos, ¿cual es el destino ultimo que aguarda a toda la materia rocosa del cosmos? Tras concluir su convulsa fase de gigante roja y expeler sus capas fotosfericas externas en una efimera nebulosa planetaria enriquecida de carbono, el Sol colapsara en un nucleo remanente estelar ultra-denso e inerte: una enana blanca de carbono y oxigeno con una masa del cincuenta y cinco por ciento de la solar comprimida en el volumen de la Tierra.",
      "Los planetas y cuerpos rocosos que logren sobrevivir a la era de gigante roja solar (como Marte, los asteroides mayores y las lunas litoesfericas exteriores) continuaran orbitando alrededor de esta estrella enana blanca en enfriamiento durante cientos de miles de millones de anos en la oscuridad perpetua de un universo en expansion termica acelerada. En este gelido escenario, las interacciones gravitatorias seculares entre los cuerpos remanentes alteraran progresivamente las excentricidades e inclinaciones orbitales.",
      "Muchos asteroides y planetesimales seran perturbados hacia trayectorias suicidas que cruzaran el radio de destruccion por marea de Roche de la enana blanca (situado a aproximadamente un millon de kilometros de su superficie). Alli, el inmenso gradiente de gravedad desintegrara las rocas en un anillo circunestelar de polvo caliente que precipitara gradualmente sobre la fotosfera; observaciones telescopicas del Hubble y Gaia han detectado numerosas enanas blancas contaminadas cuyos espectros revelan la digestion activa de corteza y mantos de exoplanetas rocosos.",
      "En la denominada Era Degenerada de la cosmologia (entre diez a la catorce y diez a la cuarenta anos en el futuro: 10^14 a 10^40 anos), las continuas interacciones dinamicas de n-cuerpos con estrellas errantes que atraviesen el halo galactico expulsaran al noventa y nueve por ciento de los planetas rocosos supervivientes hacia el abismo intergalactico como mundos vagabundos huerfanos y gelidos, mientras que la fraccion restante colapsara por emision de ondas gravitacionales hacia la estrella central.",
      "Finalmente, si se verifica la prediccion de las teorias de gran unificacion fisica sobre la desintegracion espontanea de los bariones (decaimiento del proton con una vida media estimada en diez a la treinta y cuatro anos), toda la estructura atomica de las rocas, silicatos y redes metalicas de los planetas se desintegrara gradualmente desde el interior de sus nucleos cristalinos; cada atomo de hierro y silicio decaera en positrones, neutrinos y radiacion de fotones, disolviendo toda huella de materia solida en el cosmos eterno."
    ],
    "fact": "En escalas cosmológicas extremas, el Sol terminara como enana blanca enfriandose eternamente; los planetas sobrevivientes seran perturbados, canibalizados o eyectados hacia el vacio como mundos errantes, hasta que la eventual desintegracion de los protones disuelva toda la materia bariónica de los planetas rocosos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las enanas blancas poseen gravedades superficiales cien mil veces superiores a la terrestre: los elementos pesados como hierro y silicio deberian hundirse en segundos bajo el hidrogeno puro; ver estos minerales en su espectro demuestra que estan engullendo activamente restos de planetas rocosos triturados recientemente."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cada atomo de hierro, calcio y oxigeno que compone hoy las rocas, montanas y nuestros propios esqueletos fue forjado en nucleos estelares primigenios y dispersado por supernovas ancestrales, completando un ciclo cosmico que regresara inexorablemente a la dispersion energetica total en el ocaso del universo."
      }
    ]
  }
];

export default function InteractiveInfographic_RocososM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,10,25,0.92) 0%, rgba(28,12,30,0.88) 40%, rgba(12,8,20,0.95) 100%)',
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
      <RockyDustField color1="255, 0, 84" color2="131, 56, 236" />
      <RocososHeader title="FUTURO DE LOS PLANETAS ROCOSOS" subtitle="EVOLUCIÓN ESTELAR Y EL DESTINO FINAL" primaryColor="#FF0054" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF0054, #8338EC)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar el futuro de los planetas rocosos.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #FF005460' }}>
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

function RockyDustField({ color1 = '255, 0, 84', color2 = '131, 56, 236' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM6)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM6" x1="0" y1="0" x2="1" y2="0">
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
        width: '90px',
        height: '90px',
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '100px',
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
        background: 'rgba(20, 12, 25, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
                📐 ESQUEMA TÉCNICO Y DIAGRAMA
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
