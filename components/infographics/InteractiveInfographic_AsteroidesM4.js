'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Asteroides M4 themed: DART, Hayabusa2 y OSIRIS-REx) ──
function DecoProbe({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="22" y="22" width="16" height="16" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      <line x1="6" y1="30" x2="22" y2="30" stroke={color} strokeWidth="2" />
      <line x1="38" y1="30" x2="54" y2="30" stroke={color} strokeWidth="2" />
      <rect x="6" y="24" width="8" height="12" fill={color} opacity="0.6" />
      <rect x="46" y="24" width="8" height="12" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoSampleCapsule({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M15 20 L45 20 L38 45 L22 45 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="30" y1="35" x2="30" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="32" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoKineticImpact({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="38" cy="38" r="14" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <line x1="8" y1="8" x2="28" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <polygon points="28,28 18,24 24,18" fill={color} />
      <path d="M25 20 L35 15 M20 25 L15 35" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoIonThruster({ size = 70, color = '#18FFFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M15 20 L30 15 L45 20 L40 40 L20 40 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 40 L15 52 M25 40 L22 55 M35 40 L38 55 M40 40 L45 52" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="30" cy="28" r="4" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoLidarScanner({ size = 70, color = '#E040FB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,10 50,50 10,50" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="4" fill={color} />
      <path d="M18 36 Q30 30 42 36" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function DecoAsteroidRyugu({ size = 70, color = '#FFAB40', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,8 48,22 44,46 30,54 14,44 12,22" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="28" cy="28" r="4" fill={color} opacity="0.6" />
      <line x1="14" y1="22" x2="44" y2="46" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

const DECO_MAP = {
  'era-exploracion': [DecoProbe, DecoIonThruster, DecoLidarScanner],
  'mision-dart': [DecoKineticImpact, DecoProbe, DecoAsteroidRyugu],
  'mision-hayabusa2': [DecoAsteroidRyugu, DecoSampleCapsule, DecoIonThruster],
  'mision-osiris-rex': [DecoSampleCapsule, DecoLidarScanner, DecoProbe],
  'analisis-laboratorio': [DecoSampleCapsule, DecoAsteroidRyugu, DecoKineticImpact],
  'tecnologia-navegacion': [DecoLidarScanner, DecoIonThruster, DecoProbe],
  'futuras-misiones': [DecoKineticImpact, DecoIonThruster, DecoSampleCapsule],
};

const BIBLIOGRAPHY = [
  'Cheng, A. F. et al. (2023). "A momentum transfer experiment via kinetic impact on Asteroid Dimorphos", Nature, 616, 457-460.',
  'Watanabe, S. et al. (2019). "Hayabusa2 arrives at C-type asteroid 162173 Ryugu: Big surprise in a small body", Science, 364(6437), 268-272.',
  'Lauretta, D. S. et al. (2019). "The unexpected surface of asteroid (101955) Bennu", Nature, 568, 55-60.',
  'Naraoka, H. et al. (2023). "Soluble organic molecules in samples of the carbonaceous asteroid (162173) Ryugu", Science, 379(6634), eabn9033.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "era-exploracion",
    "title": "La Era de la Exploración Robótica",
    "color": "#4FA3B5",
    "btnImage": "/assets/asteroides/infographic_m4/btn_era-exploracion.webp",
    "image": "/assets/asteroides/infographic_m4/hero_era-exploracion.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_era-exploracion.webp',
    bannerCaption: 'Revolución de las misiones espaciales dedicadas a cuerpos menores',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_era-exploracion.webp',
    diagramCaption: 'Cronología y vectores orbitales de las misiones pioneras de exploración de asteroides',
    "content": [
      "Durante siglos, el conocimiento humano sobre los asteroides estuvo estrictamente limitado a pequeños puntos de luz titilantes observados a través de los telescopios ópticos terrestres. Esta barrera observacional comenzó a derribarse en octubre de 1991, cuando la sonda espacial Galileo de la NASA, en su prolongada trayectoria de asistencia gravitatoria rumbo a Júpiter, realizó el primer sobrevuelo cercano de la historia a solo mil seiscientos kilómetros del asteroide 951 Gaspra, revelando su forma irregular y su manto de cráteres de impacto.",
      "Dos años más tarde, en agosto de 1993, Galileo sobrevoló el asteroide 243 Ida y realizó un descubrimiento revolucionario que transformó la dinámica planetaria moderna: fotografió por primera vez una diminuta luna de uno punto cuatro kilómetros de diámetro orbitando a cien kilómetros de Ida, bautizada formalmente como Dáctilo. Este hallazgo demostró empíricamente la existencia de sistemas asteroidales binarios y permitió a los astrofísicos calcular de forma directa la masa y densidad del asteroide principal mediante las leyes de Kepler.",
      "En febrero del año 2000, la misión NEAR Shoemaker de la NASA inauguró la era de la inserción orbital sostenida al entrar en órbita alrededor del asteroide cercano a la Tierra 433 Eros durante más de un año completo de operaciones científicas. La nave cartografió la superficie con altimetría láser y espectrómetros de rayos X y rayos gamma, culminando su histórica misión el 12 de febrero de 2001 con un audaz y controlado descenso suave sobre el suelo rocoso de Eros, transmitiendo datos científicos hasta el momento mismo del contacto físico.",
      "Posteriormente, la sonda Dawn de la NASA (impulsada por revolucionarios propulsores iónicos de xenón) logró la proeza técnica sin precedentes de orbitar sucesivamente dos mundos protoplanetarios distintos en el Cinturón Principal: el asteroide ígneo diferenciado 4 Vesta entre 2011 y 2012, y el planeta enano Ceres entre 2015 y 2018. Dawn descubrió que Ceres alberga un criomanto rico en sales de carbonato de sodio, depósitos de salmueras líquidas subterráneas activas y el colosal domo criovolcánico Ahuna Mons de cuatro kilómetros de altura.",
      "Estas misiones pioneras transformaron radicalmente la concepción científica de los asteroides, pasando de considerarlos meros 'escombros inertes' a reconocerlos como mundos geológicamente complejos y dinámicos. La exploración robótica demostró que los asteroides albergan criovulcanismo, diferenciación magmática temprana, hielo de agua protegido bajo regolito y complejas interacciones mecánicas inducidas por la radiación solar y la microgravedad superficial."
    ],
    "fact": "La sonda Galileo inauguró la exploración in situ en 1991 al sobrevolar Gaspra y descubrió en 1993 la primera luna en un asteroide (Dáctilo orbitando a Ida), mientras que la misión NEAR Shoemaker completó en 2001 el primer aterrizaje controlado sobre el asteroide 433 Eros transmitiendo telemetría continua desde su superficie.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La sonda Dawn de la NASA utilizó tres motores iónicos electrostáticos de xenón NSTAR que operaron durante casi sesenta mil horas a lo largo de su misión, logrando una aceleración acumulada delta-V de once kilómetros por segundo, la mayor maniobrabilidad propulsiva alcanzada por una nave espacial fuera del sistema Tierra-Luna utilizando apenas cuatrocientos kilogramos de propelente gaseoso."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El asteroide 433 Eros explorado por la misión NEAR Shoemaker es una gigantesca roca alargada con forma de cacahuate de treinta y cuatro kilómetros de longitud, cuya masa estimada contiene miles de millones de toneladas de hierro, níquel y metales del grupo del platino, superando todas las reservas minerales extraídas por la civilización humana a lo largo de su historia conocida."
      }
    ]
  },
  {
    "id": "mision-dart",
    "title": "Misión DART de la NASA",
    "color": "#D4A843",
    "btnImage": "/assets/asteroides/infographic_m4/btn_mision-dart.webp",
    "image": "/assets/asteroides/infographic_m4/hero_mision-dart.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_mision-dart-nasa.png',
    bannerCaption: 'Impacto cinético orbital de DART contra Dimorphos en septiembre de 2022',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_mision-dart.webp',
    diagramCaption: 'Física de deflexión por impacto cinético: momento transferido por DART sobre Dimorphos',
    "content": [
      "El 26 de septiembre de 2022, la humanidad ejecutó por primera vez en su historia una prueba activa de defensa planetaria a gran escala con la misión DART (Double Asteroid Redirection Test) de la NASA y el Laboratorio de Física Aplicada Johns Hopkins. El objetivo era evaluar si el impacto cinético de un proyectil robótico a hipervelocidad era capaz de alterar de forma cuantificable la órbita de un asteroide en el espacio interplanetario sin requerir el empleo de peligrosas cargas explosivas nucleares.",
      "El blanco seleccionado fue el asteroide Dimorphos, una luna rocosa de ciento sesenta metros de diámetro que orbita alrededor del asteroide primario Didymos (de setecientos ochenta metros). Al no hallarse en rumbo de colisión con la Tierra, el sistema binario representaba el laboratorio cósmico perfecto: cualquier alteración en el periodo orbital de Dimorphos alrededor de Didymos podía medirse con precisión milimétrica desde telescopios ópticos y radares astronómicos terrestres.",
      "La nave DART, con una masa de seiscientos diez kilogramos, impactó de forma frontal contra Dimorphos a una velocidad relativa de seis punto catorce kilómetros por segundo (más de veintidós mil kilómetros por hora). En los últimos minutos antes de la colisión, el sistema de navegación óptica autónoma SMART Nav guio a la nave hacia el centro de la roca, transmitiendo imágenes de alta resolución de cantos rodados y rocas antes de la destrucción del vehículo.",
      "El impacto cinético no solo transfirió el momento lineal directo de la masa de la nave, sino que la violenta eyección de más de un millón de kilogramos de escombros y polvo disparados en dirección opuesta actuó como un potente cohete de retropropulsión adicional (efecto de retroceso del eyecta). Este factor de multiplicación del momento (denominado parámetro beta) multiplicó por más de tres veces el empuje efectivo impartido al asteroide.",
      "Las observaciones de radar y telescopios terrestres confirmaron un éxito rotundo: el impacto redujo el periodo orbital de Dimorphos alrededor de Didymos en exactamente treinta y tres minutos (pasando de once horas y cincuenta y cinco minutos a once horas y veintidós minutos), superando en más de veinticinco veces el objetivo mínimo de la misión fijado por la NASA y validando el impacto cinético como un escudo planetario funcional."
    ],
    "fact": "La misión DART de la NASA demostró con éxito la técnica del impacto cinético el 26 de septiembre de 2022 al colisionar a veintidós mil kilómetros por hora contra Dimorphos, acortando su periodo orbital en treinta y tres minutos y expulsando más de mil toneladas de roca y polvo hacia el espacio interplanetario.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El parámetro de transferencia de momento beta medido por la colisión de DART se situó entre 2.2 y 3.6, lo que confirmó que el retroceso gravitatorio del eyecta expulsado a hipervelocidad multiplicó con creces el empuje del impacto físico directo de la nave, un comportamiento mecánico característico de los asteroides del tipo pila de escombros de baja cohesión interna."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El nanosatélite italiano LICIACube, expulsado por DART quince días antes del impacto, sobrevoló Dimorphos a apenas cincuenta y cinco kilómetros de altitud solo tres minutos después de la colisión, capturando imágenes fotográficas de alta resolución de las plumas de eyección de escombros y los filamentos de polvo eyectados al espacio profundo."
      }
    ]
  },
  {
    "id": "mision-hayabusa2",
    "title": "Hayabusa2 de JAXA: Hito en Ryugu",
    "color": "#80DEEA",
    "btnImage": "/assets/asteroides/infographic_m4/btn_mision-hayabusa2.webp",
    "image": "/assets/asteroides/infographic_m4/hero_mision-hayabusa2.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_mision-hayabusa2.webp',
    bannerCaption: 'Muestreo de superficie y retorno exitoso del asteroide carbónico Ryugu',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_mision-hayabusa2.webp',
    diagramCaption: 'Esquema del penetrador cinético y toma de muestras de superficie de Hayabusa2 en Ryugu',
    "content": [
      "La Agencia de Exploración Aeroespacial de Japón (JAXA) consolidó una de las mayores proezas científicas del siglo XXI con la misión Hayabusa2, lanzada en diciembre de 2014 con destino al asteroide cercano a la Tierra de Tipo C (carbonáceo) denominado 162173 Ryugu. La misión tenía como objetivo prioritario estudiar la morfología de un asteroide primitivo y recolectar muestras prístinas de regolito superficial y subsuperficial para retornarlas intactas a la Tierra.",
      "Al llegar a Ryugu en junio de 2018, Hayabusa2 descubrió un mundo oscuro con forma de diamante o peonza de novecientos metros de diámetro, cubierto por completo de miles de bloques rocosos gigantescos sin zonas llanas evidentes. La nave desplegó con éxito varios microrrovers saltadores MINERVA-II y el módulo de aterrizaje germano-francés MASCOT, que operó durante diecisiete horas sobre la superficie midiendo campos magnéticos y temperaturas in situ.",
      "En febrero de 2019, Hayabusa2 ejecutó un delicado descenso táctil sobre la roca, disparando un proyectil de tántalo de cinco gramos a trescientos metros por segundo para fragmentar el terreno y capturar partículas flotantes en su bocina de muestreo. Meses más tarde, en abril de 2019, la nave ejecutó una maniobra aún más audaz: disparó un impactador cinético de cobre puro de dos kilogramos (el dispositivo SCI) que excavó un cráter artificial de diez metros de diámetro.",
      "En julio de 2019, la nave descendió por segunda vez y aterrizó en el borde del cráter artificial recién creado, recolectando por primera vez en la historia de la humanidad muestras geológicas subsuperficiales protegidas de la radiación solar cósmica durante miles de millones de años. Con las cámaras de recolección selladas herméticamente, Hayabusa2 emprendió el viaje de retorno hacia nuestro planeta mediante propulsión iónica de xenón.",
      "El 6 de diciembre de 2020, la cápsula de reingreso se desprendió de la nave nodriza y descendió suavemente en paracaídas sobre el desierto militar de Woomera, en el sur de Australia. Los científicos japoneses recuperaron cinco punto cuatro gramos de material negro prístino (más de cincuenta veces la cantidad mínima esperada), suministrando a la comunidad científica internacional un tesoro mineralógico que continúa revolucionando la cosmoquímica moderna."
    ],
    "fact": "La sonda japonesa Hayabusa2 excavó en 2019 un cráter artificial de diez metros en el asteroide carbonáceo Ryugu mediante un proyectil de cobre y trajo a la Tierra en diciembre de 2020 cinco punto cuatro gramos de regolito prístino que contenía aminoácidos orgánicos y uracilo de origen extraterrestre.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los análisis espectroscópicos y de cromatografía líquida de las muestras de Ryugu publicados entre 2022 y 2023 revelaron más de veinte aminoácidos diferentes (incluyendo alanina, glicina y valina), hidrocarburos aromáticos policíclicos y uracilo, demostrando de forma incontrovertible que los bloques químicos esenciales para la vida se formaron en el medio interestelar."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Tras desprender la cápsula de muestras en la Tierra en diciembre de 2020, la nave nodriza Hayabusa2 conservó más de la mitad de su propelente de xenón y emprendió una ambiciosa misión extendida que incluye el sobrevuelo del asteroide 2001 CC21 en 2026 y el encuentro orbital con el asteroide de rotación ultrarrápida 1998 KY26 en 2031."
      }
    ]
  },
  {
    "id": "mision-osiris-rex",
    "title": "OSIRIS-REx de la NASA: Tesoro en Bennu",
    "color": "#BA68C8",
    "btnImage": "/assets/asteroides/infographic_m4/btn_mision-osiris-rex.webp",
    "image": "/assets/asteroides/infographic_m4/hero_mision-osiris-rex.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_mision-osiris-rex.webp',
    bannerCaption: 'Recolección del regolito virgen del asteroide carbonáceo Bennu',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_mision-osiris-rex.webp',
    diagramCaption: 'Mecanismo TAGSAM de OSIRIS-REx: inyección de nitrógeno y recolección de regolito en Bennu',
    "content": [
      "La misión OSIRIS-REx (Origins, Spectral Interpretation, Resource Identification, Security, Regolith Explorer) de la NASA fue diseñada para estudiar en detalle al asteroide cercano a la Tierra 101955 Bennu, un asteroide de Tipo B rico en carbono de quinientos metros de diámetro que posee una probabilidad acumulada de impacto con la Tierra en el siglo XXII de una entre mil setecientos cincuenta.",
      "Al arribar a Bennu en diciembre de 2018, la nave confirmó que el asteroide es una frágil 'pila de escombros' con una densidad extraordinariamente baja de uno punto diecinueve gramos por centímetro cúbico, lo que significa que el cincuenta por ciento de su volumen interno está vacío. Para sorpresa de los científicos, Bennu demostró ser un asteroide activo que eyectaba continuamente pequeñas piedrecillas y fragmentos rocosos hacia el espacio.",
      "El 20 de octubre de 2020, OSIRIS-REx ejecutó la histórica maniobra Touch-And-Go (TAG) en el cráter Nightingale. El brazo robótico TAGSAM de tres metros de longitud contactó el suelo mientras liberaba un chorro de gas nitrógeno ultra puro a alta presión para fluidizar y levantar el regolito hacia la cámara del colector. La superficie ofreció tan poca resistencia mecánica que el cabezal del brazo se hundió medio metro en el terreno como si fuera una piscina de plástico.",
      "La maniobra fue tan abundante que las piedras recolectadas mantuvieron entreabierta la tapa de la válvula de retención, obligando a los ingenieros a acelerar el guardado y sellado de emergencia del colector dentro de la cápsula de retorno para evitar fugas de material. La nave inició su crucero de regreso a la Tierra impulsada por maniobras de trayectoria en el espacio profundo en mayo de 2021.",
      "El 24 de septiembre de 2023, la cápsula de muestras de OSIRIS-REx aterrizó de forma impecable en el campo de pruebas y entrenamiento del Departamento de Defensa de Utah. Los análisis preliminares en el Centro Espacial Johnson revelaron una masa total recolectada de ciento veintiún punto seis gramos (el doble de la meta oficial), confirmando la presencia de abundante agua encerrada en minerales de arcilla, carbono orgánico y fosfatos de magnesio hidratados."
    ],
    "fact": "La nave espacial OSIRIS-REx de la NASA recolectó ciento veintiún punto seis gramos de material intacto del asteroide Bennu en 2020 y lo trajo con éxito a la Tierra el 24 de septiembre de 2023, descubriendo altas proporciones de agua molecular ligada a filosilicatos, sales hidratadas y compuestos orgánicos ricos en nitrógeno.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El análisis mineralógico de las muestras de Bennu mediante difracción de rayos X y resonancia magnética en el Centro Espacial Johnson descubrió una abundante presencia de fosfato de magnesio y sodio hidratado, una sal soluble que sugiere que el cuerpo progenitor de Bennu albergó salmueras líquidas activas similares a las cuencas evaporíticas primitivas de la Tierra."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Tras desprender su cápsula sobre el desierto de Utah en septiembre de 2023, la nave nodriza encendió sus motores para desviarse de la atmósfera terrestre y fue rebautizada como OSIRIS-APEX, iniciando una misión orbital extendida para interceptar y cartografiar al célebre asteroide potencialmente peligroso Apophis durante su sobrevuelo cercano a la Tierra en abril de 2029."
      }
    ]
  },
  {
    "id": "analisis-laboratorio",
    "title": "Análisis en Laboratorios Terrestres",
    "color": "#FF884B",
    "btnImage": "/assets/asteroides/infographic_m4/btn_analisis-laboratorio.webp",
    "image": "/assets/asteroides/infographic_m4/hero_analisis-laboratorio.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_analisis-laboratorio.webp',
    bannerCaption: 'Espectrometría de masas y análisis mineral de muestras prístinas devueltas',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_analisis-laboratorio.webp',
    diagramCaption: 'Cadena de custodia y análisis analítico en sala limpia: difracción de rayos X y espectrometría',
    "content": [
      "La recolección directa de muestras extraterrestres mediante sondas robóticas representa un avance científico exponencialmente superior al estudio de meteoritos caídos al azar en la Tierra. Aunque un meteorito es una muestra geológica valiosa, sufre una severa contaminación biológica, química y atmosférica desde el instante en que atraviesa el aire terrestre, se oxida con el oxígeno atmosférico y se empapa de humedad y bacterias microbianas presentes en el suelo.",
      "En contraste, las muestras recuperadas por naves espaciales como Stardust, Hayabusa2 y OSIRIS-REx son aisladas al vacío en cápsulas herméticas antes del reingreso atmosférico, llegando a los laboratorios de ultra alta pureza en cuartos limpios de Clase 10 o Clase 100 donde no existe contacto con el aire terrestre. Esto garantiza que cualquier molécula de agua, aminoácido o compuesto de carbono detectado sea cien por ciento de origen extraterrestre.",
      "Una vez en los laboratorios especializados (como la Instalación de Curación de Astromateriales de la NASA en Houston o el Instituto de Ciencia Espacial de JAXA en Sagamihara), los granos milimétricos se analizan con un arsenal de instrumentos que jamás podrían miniaturizarse para volar a bordo de una nave espacial: microscopios electrónicos de transmisión de aberración corregida, sondas iónicas NanoSIMS y sincrotrones de radiación de partículas.",
      "La espectrometría de masas con resolución atómica permite datar isótopos radiactivos de aluminio-26, hafnio-tungsteno y cromo-53 con márgenes de error inferiores a cien mil años en eventos geológicos que ocurrieron hace más de cuatro mil quinientos millones de años. Gracias a estas técnicas, los científicos pueden reconstruir minuto a minuto los primeros cinco millones de años de vida del Sistema Solar primigenio.",
      "Además, la mayor parte de las muestras de asteroides recolectadas se preservan en bóvedas de gas nitrógeno ultra puro para las futuras generaciones de investigadores. Siguiendo el exitoso precedente de las muestras lunares del programa Apolo, se estima que las herramientas analíticas que se desarrollen dentro de cincuenta años permitirán descubrir secretos de la materia cósmica que hoy escapan por completo a nuestra tecnología."
    ],
    "fact": "Los astromateriales recuperados directamente por sondas espaciales se procesan en salas limpias con atmósfera presurizada de gas nitrógeno puro mediante microscopía electrónica atómica de transmisión y sincrotrones de partículas, eliminando cualquier riesgo de contaminación orgánica, química o microbiológica terrestre.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las microsondas iónicas de última generación NanoSIMS permiten cuantificar las relaciones isotópicas estables de hidrógeno, deuterio, carbono y nitrógeno en granos presolares de apenas cincuenta nanómetros de tamaño, demostrando que algunos minerales de los asteroides carbonáceos son más antiguos que el propio Sol y nacieron en vientos estelares de supernovas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Siguiendo estrictos protocolos científicos internacionales, la NASA y la agencia japonesa JAXA reservaron más del setenta por ciento del regolito recolectado de Bennu y Ryugu en bóvedas acorazadas selladas para que científicos de futuras generaciones puedan analizarlos con tecnologías e instrumentos que todavía no han sido inventados."
      }
    ]
  },
  {
    "id": "tecnologia-navegacion",
    "title": "Navegación Cercana en Microgravedad",
    "color": "#E57373",
    "btnImage": "/assets/asteroides/infographic_m4/btn_tecnologia-navegacion.webp",
    "image": "/assets/asteroides/infographic_m4/hero_tecnologia-navegacion.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_tecnologia-navegacion.webp',
    bannerCaption: 'Sistemas de proximidad óptica y navegación autónoma en microgravedad',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_tecnologia-navegacion.webp',
    diagramCaption: 'Sistemas de navegación autónoma y cartografía LIDAR en campos de microgravedad irregular',
    "content": [
      "Operar una nave espacial en las inmediaciones de un asteroide pequeño representa uno de los desafíos más complejos y contraintuitivos de toda la astrodinámica orbital. En cuerpos menores de un kilómetro de diámetro, la gravedad superficial es de apenas unas pocas millonésimas o cienmilésimas de la gravedad terrestre (del orden de micro-G), lo que altera por completo las leyes de navegación convencionales aplicables a planetas masivos.",
      "En un entorno de microgravedad tan débil, las fuerzas perturbadoras secundarias que normalmente son despreciables en la Tierra o en la Luna adquieren un protagonismo dominante. La presión de radiación solar ejercida sobre los paneles solares de la nave puede ser superior a la atracción gravitatoria del propio asteroide, empujando a la sonda fuera de órbita si no se ejecutan continuas correcciones de propulsión de milímetros por segundo.",
      "Asimismo, la forma sumamente irregular y asimétrica de los asteroides genera un campo gravitatorio no esférico extremadamente caótico y variable. Los modelos armónicos esféricos tradicionales no funcionan; los ingenieros deben utilizar modelos de campo de poliedros 3D de alta resolución basados en mapas de relieve topográfico generados por sensores LIDAR ópticos y cámaras estereoscópicas de navegación.",
      "Debido al retardo temporal de las señales de radio entre la Tierra y el asteroide (que suele oscilar entre diez y treinta minutos en cada sentido), es físicamente imposible pilotar la nave por control remoto desde una consola en tierra durante las maniobras críticas de aproximación y contacto con el suelo. Por ello, naves como OSIRIS-REx y Hayabusa2 dependen de sistemas de navegación autónoma basados en visión por computadora (Natural Feature Tracking).",
      "El software de vuelo compara en tiempo real las imágenes de alta velocidad capturadas por las cámaras de abordo con un catálogo tridimensional de miles de rocas y cráteres almacenado en la memoria de la nave. Si el sistema detecta una desviación de apenas unos centímetros respecto al corredor de descenso seguro, la computadora de a bordo aborta automáticamente la aproximación e inicia un encendido de escape sin intervención humana."
    ],
    "fact": "La navegación espacial en microgravedad alrededor de un asteroide requiere sistemas autónomos de visión óptica artificial en tiempo real (Natural Feature Tracking), ya que el retardo de radio con la Tierra de hasta treinta minutos impide el pilotaje remoto durante las maniobras críticas de contacto superficial.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad de escape de la superficie del asteroide Bennu es de apenas veinte centímetros por segundo (menos de un kilómetro por hora), lo que significa que un astronauta humano que se impulsara ligeramente con las piernas sobre su suelo rocoso entraría de forma irreversible en una trayectoria hiperbólica de escape hacia el espacio interplanetario."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante la aproximación final de la nave OSIRIS-REx a la superficie rocosa de Bennu en octubre de 2020, su sistema de navegación óptica procesaba y cruzaba más de cien referencias topográficas por segundo, garantizando una precisión de posicionado en el cráter Nightingale inferior a tres metros de margen de error transversal."
      }
    ]
  },
  {
    "id": "futuras-misiones",
    "title": "Futuras Misiones: De Hera a Psyche",
    "color": "#00E4FF",
    "btnImage": "/assets/asteroides/infographic_m4/btn_futuras-misiones.webp",
    "image": "/assets/asteroides/infographic_m4/hero_futuras-misiones.webp",
    bannerImage: '/assets/asteroides/infographic_m4/banner_futuras-misiones.webp',
    bannerCaption: 'Próxima generación de exploradores: Hera, Psyche y Lucy de la NASA/ESA',
    diagramImage: '/assets/asteroides/infographic_m4/diagram_futuras-misiones.webp',
    diagramCaption: 'Próxima generación de exploradores: arquitecturas de misión para Hera, Psyche y Lucy',
    "content": [
      "La década de 2020 marca la verdadera edad de oro de la exploración internacional de asteroides, con una ambiciosa flota de misiones interplanetarias en desarrollo activo y crucero que expandirán radicalmente nuestra comprensión de la formación del Sistema Solar y consolidarán las capacidades técnicas globales de defensa planetaria ante posibles impactos cósmicos.",
      "La misión Hera de la Agencia Espacial Europea (ESA), lanzada con éxito en octubre de 2024, tiene como meta llegar al sistema Didymos-Dimorphos a finales de 2026. Hera actuará como un detective forense espacial: examinará de cerca el cráter de impacto excavado por la sonda DART en Dimorphos, medirá por primera vez la masa y densidad exacta del asteroide mediante dos CubeSats complementarios (Milani y Juventas) y cartografiará su estructura interna con radar de baja frecuencia.",
      "Por su parte, la misión Lucy de la NASA continúa su épica odisea de doce años impulsada por asistencia gravitatoria. En noviembre de 2023 sobrevoló el asteroide del Cinturón Principal Dinkinesh, descubriendo inesperadamente que posee una luna de contacto binaria bautizada como Selam. Entre 2027 y 2033, Lucy sobrevolará ocho asteroides troyanos distintos en los puntos L4 y L5 de Júpiter, explorando los mundos fósiles más primitivos del Sistema Solar exterior.",
      "Simultáneamente, la sonda Psyche de la NASA viaja hacia el Cinturón Principal exterior para insertarse en órbita alrededor del enigmático asteroide metálico 16 Psyche en el año 2029. Los científicos esperan examinar por primera vez un objeto compuesto casi enteramente de hierro y níquel, revelando si se trata del núcleo desnudo de un protoplaneta que fue despojado de sus capas rocosas durante los violentos choques de la era primigenia.",
      "A este esfuerzo multinacional se suman la misión china Tianwen-2 (programada para recolectar muestras del asteroide cuasisatélite 469219 Kamoʻoalewa y del cometa del cinturón principal 311P/PANSTARRS) y la misión de los Emiratos Árabes Unidos a siete asteroides del cinturón. Esta convergencia tecnológica global sentará las bases científicas para la futura minería espacial de recursos y la protección permanente de la biosfera terrestre."
    ],
    "fact": "La flota internacional de exploración espacial desplegada para la década de 2020 incluye a la misión europea Hera que inspeccionará el cráter de DART en Dimorphos en 2026, la sonda Lucy que visitará los asteroides troyanos de Júpiter y la misión Psyche que analizará un colosal núcleo planetario metálico expuesto en 2029.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El CubeSat Juventas a bordo de la misión europea Hera desplegará el primer radar de penetración profunda de baja frecuencia (60 MHz) operado en el interior de un asteroide, emitiendo ondas electromagnéticas que atravesarán Dimorphos de lado a lado para revelar su estratigrafía interna y su grado de fracturación mecánica tridimensional."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El asteroide 469219 Kamoʻoalewa, objetivo de la futura misión china de retorno de muestras Tianwen-2, es un cuasisatélite de la Tierra cuyo espectro óptico es prácticamente idéntico al de los basaltos de los mares lunares recolectados por Apolo 14, lo que sugiere con fuerza que se trata de un fragmento expulsado de la Luna por un antiguo impacto meteorítico."
      }
    ]
  }
];

export default function InteractiveInfographic_AsteroidesM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(15,20,30,0.92) 0%, rgba(20,15,35,0.88) 50%, rgba(10,12,32,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <AsteroidesM4Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FFD54F, #FF5252)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
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
                Selecciona uno de los módulos superiores para explorar las misiones espaciales DART, Hayabusa2 y OSIRIS-REx.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,213,79,0.4)' }}>
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

function CosmicDustField() {
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
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '255, 213, 79' : '255, 82, 82',
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
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function AsteroidesM4Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,213,79,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM4)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FFD54F','#FF5252','#FFAB40','#64FFDA','#E040FB','#18FFFF','#FF5252'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FFD54F" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FFD54F" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,213,79,0.2)" />
            <stop offset="50%" stopColor="rgba(255,213,79,0.9)" />
            <stop offset="100%" stopColor="rgba(255,213,79,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FFD54F" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">SONDAS Y MUESTRAS</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,213,79,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">DART, HAYABUSA2 Y OSIRIS-REX</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,213,79,0.2)'}`,
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
          layoutId="activeDotAsteroidesM4"
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
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
                  {i === 0 ? 'SECCIÓN 1' : 'SECCIÓN 2'}
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
        {/* Video Section */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
          </div>
        )}
        {/* --- Banner Image --- */}
        {node.bannerImage && (
          <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src={node.bannerImage}
              alt={node.bannerCaption || node.title}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              loading="lazy"
            />
            {node.bannerCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
                {node.bannerCaption}
              </p>
            )}
          </div>
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
              <p style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
