'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Asteroides M5 themed: Apophis y Defensa Planetaria) ──
function DecoApophisOrbit({ size = 70, color = '#FF3D00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="30" r="5" fill={color} />
      <ellipse cx="38" cy="22" rx="4" ry="2" fill={color} />
    </svg>
  );
}

function DecoKeyhole({ size = 70, color = '#FFEA00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M30 12 A10 10 0 0 0 24 28 L20 48 L40 48 L36 28 A10 10 0 0 0 30 12 Z" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="20" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoGravTractor({ size = 70, color = '#00E676', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="20" cy="30" r="8" fill={color} opacity="0.6" />
      <rect x="36" y="22" width="16" height="16" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="1.5" />
      <path d="M28 30 L36 30" stroke={color} strokeWidth="2" strokeDasharray="2 2" />
      <path d="M22 18 C28 24 28 36 22 42" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
    </svg>
  );
}

function DecoLaserDeflector({ size = 70, color = '#00B0FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <line x1="8" y1="52" x2="40" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="18" r="8" fill={color} opacity="0.4" />
      <path d="M42 10 L42 26 M34 18 L50 18" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoRadarDish({ size = 70, color = '#D500F9', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M12 38 C18 20 42 20 48 38 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <line x1="30" y1="38" x2="30" y2="52" stroke={color} strokeWidth="2" />
      <line x1="20" y1="52" x2="40" y2="52" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="24" r="3" fill={color} />
    </svg>
  );
}

function DecoEarthShield({ size = 70, color = '#1DE9B6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="14" fill={color} opacity="0.4" />
      <path d="M30 8 C44 8 50 18 50 32 C50 44 30 52 30 52 C30 52 10 44 10 32 C10 18 16 8 30 8 Z" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-apophis': [DecoApophisOrbit, DecoKeyhole, DecoRadarDish],
  'encuentro-2029': [DecoEarthShield, DecoApophisOrbit, DecoKeyhole],
  'cerradura-gravitacional': [DecoKeyhole, DecoApophisOrbit, DecoLaserDeflector],
  'efecto-yarkovsky': [DecoLaserDeflector, DecoGravTractor, DecoApophisOrbit],
  'tecnicas-defensa': [DecoGravTractor, DecoLaserDeflector, DecoEarthShield],
  'redes-vigilancia': [DecoRadarDish, DecoEarthShield, DecoKeyhole],
  'protocolos-respuesta': [DecoEarthShield, DecoRadarDish, DecoGravTractor],
};

const BIBLIOGRAPHY = [
  'Farnocchia, D. et al. (2021). "Yarkovsky acceleration of (99942) Apophis", The Planetary Science Journal, 2(1), 23.',
  'Giorgini, J. D. et al. (2008). "Predicting the Earth encounters of (99942) Apophis", Icarus, 193(1), 1-19.',
  'National Research Council (2010). "Defending Planet Earth: Near-Earth Object Surveys and Hazard Mitigation Strategies", National Academies Press.',
  'Ahrens, R. E. et al. (2022). "Planetary Defense Decision Support: Frameworks for Action", Acta Astronautica, 198, 312-325.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "descubrimiento-apophis",
    "title": "Descubrimiento de Apophis",
    "color": "#FF3D00",
    "btnImage": "/assets/asteroides/infographic_m5/btn_descubrimiento-apophis.webp",
    "image": "/assets/asteroides/infographic_m5/hero_descubrimiento-apophis.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_descubrimiento-apophis.webp',
    bannerCaption: 'Detección y primer cálculo orbital del asteroide 99942 Apophis en 2004',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_descubrimiento-apophis.webp',
    diagramCaption: 'Cartografía por radar astronómico delay-Doppler y elipsoides de incertidumbre orbital de Apophis',
    "content": [
      "El 19 de junio de 2004, los astrónomos Roy Tucker, David Tholen y Fabrizio Bernardi descubrieron un nuevo asteroide potencialmente peligroso desde el Observatorio Nacional de Kitt Peak en Arizona, empleando el telescopio Bok de dos punto tres metros. El objeto recibió la designación astronómica provisional 2004 MN4 y, tras confirmarse su órbita periódica alrededor del Sol, fue nombrado formalmente como 99942 Apophis, en honor a la deidad egipcia del caos, la oscuridad y la destrucción.",
      "Apophis es un asteroide rocoso clasificado espectralmente dentro del Tipo Sq (rico en silicatos, piroxenos y olivino), con una morfología alargada y asimétrica con forma de cacahuate o peonza. Posee un diámetro medio equivalente de trescientos cuarenta metros, un volumen aproximado de dos punto dos millones de metros cúbicos y una masa estimada en sesenta y un millones de toneladas métricas, con una densidad media de tres punto dos gramos por centímetro cúbico.",
      "En diciembre del año 2004, los primeros cálculos orbitales refinados desataron una alarma científica sin precedentes en la historia de la astrofísica planetaria. Los modelos matemáticos del sistema automatizado Sentry del Laboratorio de Propulsión a Chorro (JPL) indicaron que Apophis poseía una aterradora probabilidad de impacto del dos punto siete por ciento (una posibilidad entre treinta y siete) contra la Tierra el viernes 13 de abril de 2029.",
      "Esta probabilidad estadística inédita provocó que Apophis fuera el primer objeto astronómico de la historia en alcanzar el Nivel 4 en la Escala de Torino de riesgo de impacto planetario. Un hipotético impacto directo de una roca de trescientos cuarenta metros liberaría una energía cinética instantánea superior a mil doscientos megatones de TNT (unas cien mil veces la energía de la bomba de Hiroshima), desatando una devastación regional total sobre decenas de miles de kilómetros cuadrados.",
      "Afortunadamente, intensas campañas de observación óptica retrospectiva y mediciones astrométricas de seguimiento permitieron reconstruir el arco orbital histórico de Apophis con precisión milimétrica. Apenas unos meses después de la alarma inicial, las nuevas observaciones refinadas descartaron de manera definitiva la posibilidad de un impacto catastrófico para la fecha del encuentro cercano de abril de 2029, transformando el pánico en una oportunidad científica sin parangón."
    ],
    "fact": "El asteroide 99942 Apophis, descubierto en junio de 2004, alcanzó en diciembre de ese mismo año el histórico Nivel 4 en la Escala de Torino al calcularse una probabilidad de impacto del dos punto siete por ciento para el año 2029, un récord de alerta orbital jamás repetido por ningún otro objeto celeste en la historia astronómica.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La energía de impacto liberada por un cuerpo con las dimensiones de Apophis (340 metros y 61 millones de toneladas métricas a una velocidad de entrada de doce punto seis kilómetros por segundo) excavaría un cráter de cinco kilómetros de diámetro y cuatrocientos metros de profundidad, generando ondas de choque supersónicas en la atmósfera."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El nombre del asteroide fue propuesto por David Tholen y Tucker en homenaje al dios egipcio Apep o Apophis, pero también inspirados en el villano extraterrestre de la serie de ciencia ficción Stargate SG-1, del cual los científicos descubridores eran apasionados seguidores durante las largas noches de guardia telescópica."
      }
    ]
  },
  {
    "id": "encuentro-2029",
    "title": "El Encuentro Cercano de 2029",
    "color": "#D4A843",
    "btnImage": "/assets/asteroides/infographic_m5/btn_encuentro-2029.webp",
    "image": "/assets/asteroides/infographic_m5/hero_encuentro-2029.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_encuentro-2029.webp',
    bannerCaption: 'Aproximación cercana récord a 32,000 km de la superficie terrestre en abril de 2029',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_encuentro-2029.webp',
    diagramCaption: 'Geometría del sobrevuelo del 13 de abril de 2029: trayectoria dentro del anillo geoestacionario',
    "content": [
      "El viernes 13 de abril de 2029, la humanidad será testigo de uno de los fenómenos astrodinámicos más extraordinarios y cercanos jamás registrados en los anales de la ciencia planetaria. El asteroide 99942 Apophis cruzará el espacio próximo a la Tierra a una velocidad relativa de siete punto cuatro kilómetros por segundo, rozando nuestro planeta a una distancia mínima de tan solo treinta y un mil seiscientos kilómetros sobre la superficie terrestre.",
      "Esta distancia es astronómicamente ínfima: el asteroide pasará por debajo del cinturón orbital de los satélites geoestacionarios de telecomunicaciones y meteorología (situados a treinta y cinco mil setecientos ochenta y seis kilómetros de altitud) y a apenas una décima parte de la distancia media entre la Tierra y la Luna. Estadísticamente, un encuentro tan cercano de un objeto rocoso de más de trescientos metros ocurre en promedio una vez cada cinco mil años.",
      "Durante el pico de máxima aproximación, Apophis será plenamente visible a simple vista sin necesidad de telescopios ni prismáticos ópticos para más de dos mil millones de habitantes en Europa, África y el oeste de Asia. El asteroide brillará en el firmamento nocturno como una estrella móvil de magnitud aparente 3.1, cruzando la constelación de Cáncer a una velocidad angular de cuarenta y dos grados por hora a través del cielo.",
      "El inmenso campo gravitatorio terrestre ejercerá un efecto de marea diferencial colosal sobre el cuerpo de Apophis al atravesar su punto de perihelio geocéntrico. Las tensiones de marea deformarán mecánicamente la débil estructura rocosa del asteroide, provocando corrimientos de tierra superficiales, avalanchas de cantos rodados, fisuras en el regolito y una alteración drástica en su estado de rotación compleja o 'tumbling', cuyo periodo actual es de treinta punto seis horas.",
      "Para aprovechar esta oportunidad irrepetible, la NASA ya ha redirigido la sonda espacial OSIRIS-APEX (anteriormente OSIRIS-REx) para interceptar a Apophis inmediatamente después de su sobrevuelo terrestre. La nave entrará en órbita alrededor de la roca cósmica durante dieciocho meses ininterrumpidos, disparando sus propulsores de gas para erosionar el regolito y observar cómo la gravedad de la Tierra desnudó las capas subsuperficiales vírgenes del asteroide."
    ],
    "fact": "El 13 de abril de 2029 el asteroide Apophis pasará a solo treinta y un mil seiscientos kilómetros de la Tierra, más cerca que los satélites geoestacionarios, siendo visible a simple vista para dos mil millones de personas y permitiendo que la gravedad terrestre altere su rotación y remueva su regolito.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los modelos de simulación geofísica revelan que las fuerzas de marea gravitatoria de la Tierra desatarán micro-seísmos en Apophis durante el sobrevuelo de 2029, removiendo la capa superior de regolito oscurecida por el viento solar y exponiendo silicatos prístinos que modificarán de forma mensurable su curva de luz y su espectro térmico."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A pesar de pasar por debajo de la órbita de los satélites geoestacionarios, la probabilidad de que Apophis colisione con algún satélite artificial activo o pieza de basura espacial es infinitesimal, calculada en menos de una entre diez millones debido a la inmensa amplitud del volumen orbital tridimensional."
      }
    ]
  },
  {
    "id": "cerradura-gravitacional",
    "title": "Cerraduras Gravitacionales",
    "color": "#80DEEA",
    "btnImage": "/assets/asteroides/infographic_m5/btn_cerradura-gravitacional.webp",
    "image": "/assets/asteroides/infographic_m5/hero_cerradura-gravitacional.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_cerradura-gravitacional.webp',
    bannerCaption: 'Keyholes orbitales y análisis determinista de trayectorias futuras',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_cerradura-gravitacional.webp',
    diagramCaption: 'Concepto de Cerradura Gravitacional: plano b y ventanas resonantes de retorno orbital',
    "content": [
      "En mecánica celeste y dinámica de defensa planetaria, una 'cerradura gravitacional' (en inglés, gravitational keyhole) representa una región espacial de precisión geométrica crítica, a menudo de apenas unos pocos cientos de metros a escasos kilómetros de ancho, a través de la cual el paso de un asteroide puede sellar su destino fatal con nuestro planeta en un retorno futuro.",
      "Cuando un objeto cercano a la Tierra realiza un sobrevuelo a escasa altitud, el pozo gravitatorio de nuestro planeta deforma drásticamente su trayectoria hiperbólica, modificando de forma irreversible su semieje mayor, excentricidad e inclinación orbital. Si el asteroide cruza exactamente a través de una de estas cerraduras microscópicas en el espacio, la desviación angular precisa ajustará su periodo orbital en una resonancia exacta con la órbita terrestre.",
      "En el caso histórico de Apophis, los astrónomos identificaron una cerradura gravitacional crítica de aproximadamente seiscientos metros de anchura durante el sobrevuelo de 2029. Si el centro de masa del asteroide cruzaba esa diminuta ventana espacial de seiscientos metros, la Tierra habría alterado su periodo orbital para sincronizarlo exactamente en una resonancia de siete octavos, provocando una colisión directa e inevitable siete años más tarde, el 13 de abril de 2036.",
      "La determinación precisa de si un asteroide cruzará o evitará una cerradura gravitacional exige un nivel de exactitud milimétrica en la astrometría orbital que las observaciones ópticas convencionales difícilmente pueden alcanzar debido a la refracción atmosférica terrestre y la dispersión angular de las cámaras de los telescopios de rastreo en superficie.",
      "En marzo de 2021, una histórica campaña de radar bistático entre la antena de radar de setenta metros de la Red de Espacio Profundo de la NASA en Goldstone (California) y el radiotelescopio Green Bank (Virginia Occidental) midió la distancia a Apophis con un margen de incertidumbre inferior a ciento cincuenta metros, confirmando que el asteroide pasará a miles de kilómetros de cualquier cerradura y descartando impactos durante los próximos cien años."
    ],
    "fact": "Una cerradura gravitacional es un estrecho corredor espacial donde la gravedad terrestre desvía un asteroide hacia una resonancia orbital que garantiza un impacto futuro; en 2021 observaciones de radar demostraron que Apophis esquivará por completo todas las cerraduras resonantes en su sobrevuelo de 2029.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El radiotelescopio de Goldstone emitió pulsos de microondas de alta potencia en banda X (8.56 GHz) hacia Apophis en marzo de 2021 a diecisiete millones de kilómetros de distancia, permitiendo al telescopio Green Bank captar ecos débiles que redujeron la incertidumbre de la posición orbital de decenas de kilómetros a solo ciento cincuenta metros."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El concepto teórico de la cerradura gravitacional fue formalizado matemáticamente por los investigadores Steven Chesley y Paul Chodas del Laboratorio de Propulsión a Chorro (JPL) de la NASA a principios de la década de 2000, revolucionando la manera en que los científicos evalúan las trayectorias de riesgo de impacto planetario."
      }
    ]
  },
  {
    "id": "efecto-yarkovsky",
    "title": "El Efecto Yarkovsky y la Órbita",
    "color": "#BA68C8",
    "btnImage": "/assets/asteroides/infographic_m5/btn_efecto-yarkovsky.webp",
    "image": "/assets/asteroides/infographic_m5/hero_efecto-yarkovsky.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_efecto-yarkovsky.webp',
    bannerCaption: 'Fuerza de empuje térmico asimétrico y desvío de órbitas a escala secular',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_efecto-yarkovsky.webp',
    diagramCaption: 'Física del empuje fotónico: inercia térmica diurna y variación continua del semieje mayor',
    "content": [
      "Durante más de una década posterior a su descubrimiento, el cálculo orbital definitivo de Apophis se enfrentó a una sutil pero crucial fuerza no gravitatoria que amenazaba con alterar las predicciones matemáticas a largo plazo: el Efecto Yarkovsky. Esta sutil aceleración física térmica actúa de forma silenciosa e ininterrumpida sobre todos los asteroides de tamaño pequeño y mediano que orbitan en el Sistema Solar interior.",
      "Postulado teóricamente en 1901 por el ingeniero civil polaco-ruso Ivan Osipovich Yarkovsky, el efecto surge de la absorción y reemisión anisotrópica de la radiación electromagnética solar. A medida que un asteroide gira sobre su eje de rotación, la superficie expuesta al Sol absorbe fotones y eleva su temperatura, pero debido a la inercia térmica de los minerales rocosos, el punto de máxima emisión infrarroja se desplaza hacia la tarde local del asteroide.",
      "Esta reemisión asimétrica de fotones térmicos ejerce una diminuta fuerza de reacción por presión de radiación, análoga al empuje de un microcohete de escape ininterrumpido. Si el asteroide posee rotación retrógrada (en sentido opuesto a su movimiento orbital), el empuje térmico frena su velocidad lineal y provoca que la órbita decaiga en espiral hacia el Sol; si su rotación es prograda, el asteroide se acelera y se aleja lentamente del astro rey.",
      "En el caso de Apophis, los astrofísicos Davide Farnocchia y David Tholen detectaron en 2020 mediante observaciones ópticas de ultra precisión con el telescopio Subaru en Hawái que el asteroide experimenta una deriva orbital constante por Efecto Yarkovsky de aproximadamente ciento setenta metros por año, suficiente para desplazar su trayectoria miles de kilómetros a lo largo de décadas.",
      "Esta aceleración térmica representaba la última gran incógnita que impedía a la comunidad científica descartar por completo un posible impacto catastrófico en el lejano retorno orbital del año 2068. Al integrar con exactitud el vector de empuje Yarkovsky con las mediciones de radar de 2021, los astrónomos pudieron certificar que Apophis no impactará contra la Tierra ni en 2068 ni en ningún momento durante el próximo siglo."
    ],
    "fact": "El Efecto Yarkovsky es una sutil fuerza térmica generada por la reemisión asimétrica de luz solar infrarroja que empuja a Apophis ciento setenta metros por año fuera de su órbita gravitatoria pura, habiendo sido el factor decisivo para calcular con certeza su trayectoria de seguridad hasta el siglo XXII.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La fuerza total que el Efecto Yarkovsky ejerce sobre las sesenta y un millones de toneladas métricas de Apophis equivale a apenas medio newton de empuje continuo (aproximadamente el peso de una pequeña manzana en la Tierra), pero sostenida a lo largo de décadas acumula miles de kilómetros de desviación posicional orbital."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Ivan Yarkovsky publicó su teoría en un modesto panfleto científico en San Petersburgo alrededor del año 1901 sin recibir apenas reconocimiento en vida, y tuvieron que pasar más de cien años hasta que la NASA confirmó experimentalmente su efecto midiendo con radar la órbita del asteroide 6489 Golevka en 2003."
      }
    ]
  },
  {
    "id": "tecnicas-defensa",
    "title": "Técnicas de Defensa Planetaria",
    "color": "#FF884B",
    "btnImage": "/assets/asteroides/infographic_m5/btn_tecnicas-defensa.webp",
    "image": "/assets/asteroides/infographic_m5/hero_tecnicas-defensa.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_tecnicas-defensa.webp',
    bannerCaption: 'Métodos de mitigación: impacto cinético, tractor gravitatorio y ablación láser',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_tecnicas-defensa.webp',
    diagramCaption: 'Técnicas comparadas de mitigación: impacto cinético, tractor gravitatorio y ablación láser',
    "content": [
      "La defensa planetaria constituye la única rama de la ciencia aplicada donde la humanidad posee la capacidad técnica potencial de prevenir por completo un desastre natural de magnitudes globales. Frente a terremotos, huracanes o erupciones volcánicas donde solo cabe la evacuación y la resiliencia pasiva, los impactos de asteroides pueden anticiparse y neutralizarse con décadas de antelación en el espacio.",
      "La técnica de mitigación más madura y probada empíricamente es el impacto cinético a hipervelocidad, validado con éxito absoluto por la misión DART de la NASA en 2022. Esta técnica consiste en estrellar una o varias naves robóticas masivas a velocidades de entre seis y diez kilómetros por segundo contra el asteroide; aunque la nave apenas altera la velocidad del objetivo en milímetros por segundo, con suficiente tiempo de preaviso esa minúscula variación angular desvía la trayectoria miles de kilómetros.",
      "Para situaciones donde se requiere una precisión quirúrgica extrema sin riesgo de fragmentar el asteroide, los astronautas Edward Lu y Stanley Love concibieron en 2005 la técnica del 'Tractor Gravitacional'. Consiste en estacionar una nave espacial pesada (de una a dos toneladas) a escasas decenas de metros del cuerpo cósmico mediante propulsión iónica continua, empleando la atracción gravitatoria mutua entre la sonda y la roca como un invisible cable de remolque para alterar su órbita.",
      "En escenarios de emergencia crítica donde el tiempo de advertencia sea inferior a una década o el asteroide supere el kilómetro de diámetro, la opción más viable es la detonación nuclear a distancia ('nuclear standoff detonation'). Detonar un dispositivo termonuclear a cien metros de la superficie sin impactar directamente evita la fragmentación incontrolada; los intensos pulsos de rayos X y neutrones vaporizan una delgada capa rocosa superficial, cuyo retroceso por ablación empuja al asteroide.",
      "Otras alternativas teóricas en estudio incluyen la ablación superficial sostenida mediante láseres espaciales montados en constelaciones satelitales, el uso de cohetes de plasma fijados a la superficie y la modificación del albedo del asteroide cubriéndolo de polvo reflectante de dióxido de titanio para maximizar el Efecto Yarkovsky y desviar su rumbo a lo largo de décadas."
    ],
    "fact": "Las técnicas de defensa planetaria incluyen el impacto cinético a hipervelocidad validado por DART, el tractor gravitacional para remolque sin contacto mediante atracción gravitatoria mutua, y la detonación nuclear a distancia para vaporizar una capa rocosa superficial y desviar asteroides masivos de gran tamaño.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para evitar que un asteroide de cien metros colisione contra la Tierra con un preaviso de diez años de anticipación, solo se necesita impartir una alteración de velocidad (delta-V) de apenas uno punto tres centímetros por segundo en el momento oportuno, suficiente para que la roca pase de largo por el diámetro de la Tierra."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La famosa técnica de aterrizar en un asteroide para perforar su interior y detonar una bomba nuclear como en la película Armageddon de 1998 es rechazada por los expertos en defensa planetaria, ya que fracturaría el asteroide en decenas de fragmentos radiactivos gigantescos igualmente letales para nuestro planeta."
      }
    ]
  },
  {
    "id": "redes-vigilancia",
    "title": "Redes de Vigilancia y Detección",
    "color": "#E57373",
    "btnImage": "/assets/asteroides/infographic_m5/btn_redes-vigilancia.webp",
    "image": "/assets/asteroides/infographic_m5/hero_redes-vigilancia.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_redes-vigilancia.webp',
    bannerCaption: 'Redes telescópicas globales: Pan-STARRS, ATLAS, Catalina y NEO Surveyor',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_redes-vigilancia.webp',
    diagramCaption: 'Red global de vigilancia y alerta temprana: integración de sensores infrarrojos espaciales y terrestres',
    "content": [
      "Cualquier estrategia de defensa planetaria o desvío espacial resulta completamente estéril sin un sistema previo de alerta temprana capaz de descubrir y rastrear objetos peligrosos con años o décadas de anticipación. Por ello, las principales agencias espaciales han estructurado una densa red de vigilancia astronómica óptica, infrarroja y de radar que barre el firmamento los trescientos sesenta y cinco días del año.",
      "El pilar de esta vigilancia recae en los sondeos terrestres automatizados de gran campo visual, como el Catalina Sky Survey en Arizona, el telescopio Pan-STARRS en la cumbre del Haleakala en Hawái y el sistema ATLAS (Asteroid Terrestrial-impact Last Alert System), que opera cuatro telescopios robotizados en Hawái, Chile y Sudáfrica capaces de escanear la totalidad del cielo nocturno accesible cada veinticuatro horas en busca de bólidos de aproximación rápida.",
      "A este esfuerzo se incorpora el Observatorio Vera C. Rubin en el Cerro Pachón de Chile con su colosal telescopio de ocho punto cuatro metros y la cámara digital más potente del mundo (de tres mil doscientos megapíxeles). Su sondeo sistemático LSST (Legacy Survey of Space and Time) descubrirá decenas de miles de nuevos asteroides cercanos a la Tierra cada año, ampliando drásticamente el censo de objetos potencialmente peligrosos en el Sistema Solar interior.",
      "Sin embargo, los telescopios terrestres tienen un punto ciego insalvable: no pueden observar en dirección al Sol durante el día, dejando un cono de sombra por donde los asteroides pueden acercarse sin ser detectados, tal como ocurrió trágicamente con el meteoro de Cheliábinsk en febrero de 2013, que hirió a más de mil quinientas personas tras estallar a treinta kilómetros de altura sobre Rusia.",
      "Para eliminar este punto ciego solar, la NASA lanzará la misión espacial NEO Surveyor a finales de esta década. Consiste en un telescopio espacial de cincuenta centímetros optimizado en el espectro infrarrojo térmico situado en el punto de Lagrange L1 Sol-Tierra; desde allí, NEO Surveyor podrá detectar el calor residual emitido por los asteroides más oscuros y cumplir el mandato del Congreso de catalogar el noventa por ciento de los asteroides mayores de ciento cuarenta metros."
    ],
    "fact": "La vigilancia global de asteroides combina sondeos ópticos robotizados terrestres como Pan-STARRS, ATLAS y el Observatorio Vera C. Rubin con el telescopio espacial infrarrojo NEO Surveyor de la NASA, concebido específicamente para cartografiar asteroides oscuros y bólidos ocultos en el resplandor diurno del Sol.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El censo actual de la NASA ha identificado con éxito a más del noventa y cinco por ciento de todos los asteroides cercanos a la Tierra mayores a un kilómetro de diámetro (capaces de causar una extinción global), confirmando que ninguno de ellos colisionará con nuestro planeta durante al menos los próximos doscientos años."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El sistema automatizado Scout del Laboratorio de Propulsión a Chorro procesa continuamente las nuevas detecciones de asteroides en cuestión de diez minutos tras su publicación por el Minor Planet Center, calculando de inmediato si existe alguna posibilidad de impacto atmosférico inminente en las siguientes horas."
      }
    ]
  },
  {
    "id": "protocolos-respuesta",
    "title": "Protocolos Globales de Respuesta",
    "color": "#00E4FF",
    "btnImage": "/assets/asteroides/infographic_m5/btn_protocolos-respuesta.webp",
    "image": "/assets/asteroides/infographic_m5/hero_protocolos-respuesta.webp",
    bannerImage: '/assets/asteroides/infographic_m5/banner_protocolos-respuesta.webp',
    bannerCaption: 'Cooperación científica internacional y directrices de IAWN y SMPAG',
    diagramImage: '/assets/asteroides/infographic_m5/diagram_protocolos-respuesta.webp',
    diagramCaption: 'Protocolo internacional de respuesta: flujo de decisión IAWN, comités SMPAG de la ONU y mitigación',
    "content": [
      "El descubrimiento de un asteroide en rumbo inequívoco de colisión contra la Tierra desencadenaría un desafío geopolítico, científico y humanitario sin precedentes históricos. Para evitar la improvisación, el pánico social o conflictos internacionales sobre el uso de tecnologías de desvío, la comunidad internacional ha establecido estrictos protocolos estandarizados de notificación, toma de decisiones y acción coordinada.",
      "Bajo los auspicios de la Oficina de Asuntos del Espacio Ultraterrestre de las Naciones Unidas (UNOOSA) y el Comité COPUOS, se crearon en 2014 dos entidades técnicas globales independientes: la Red Internacional de Alerta de Asteroides (IAWN) y el Grupo Asesor de Planificación de Misiones Espaciales (SMPAG), que agrupan a agencias como la NASA, ESA, JAXA, Roscosmos, CNSA y docenas de institutos de investigación.",
      "La IAWN se encarga de recopilar, certificar y verificar toda la información astrométrica de potenciales objetos de impacto mediante el Minor Planet Center. Si los modelos confirman que la probabilidad de impacto de un asteroide superior a cincuenta metros de diámetro supera el uno por ciento en un horizonte de cincuenta años, IAWN emite una alerta oficial prioritaria a las Naciones Unidas y a los gobiernos de las naciones potencialmente afectadas.",
      "De forma complementaria, el grupo SMPAG (presidido por agencias con capacidad de lanzamiento interplanetario) asume la responsabilidad operativa de diseñar las misiones espaciales de reconocimiento, caracterización in situ y deflexión activa, estableciendo qué combinación de impactos cinéticos, tractores gravitatorios o cabezas explosivas debe desplegarse y bajo qué marcos de financiamiento internacional multilateral.",
      "Asimismo, la NASA y la Agencia Federal para el Manejo de Emergencias de Estados Unidos (FEMA) organizan ejercicios periódicos de simulación de impacto en las Conferencias de Defensa Planetaria. Estos simulacros evalúan la coordinación civil, los planes de evacuación masiva, el manejo de la desinformación en redes de comunicación y la toma de decisiones críticas bajo escenarios simulados de amenaza cósmica inminente."
    ],
    "fact": "La respuesta internacional ante impactos de asteroides está coordinada por las Naciones Unidas mediante la Red Internacional de Alerta de Asteroides (IAWN) para certificación astrométrica y el Grupo Asesor SMPAG para el diseño multilateral de misiones espaciales de deflexión activa y protocolos de protección civil.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La Escala de Impacto Técnico de Palermo utiliza una función logarítmica para comparar el riesgo potencial de un asteroide específico con el fondo natural de impacto aleatorio promedio del Sistema Solar, permitiendo a los científicos priorizar los recursos de observación telescópica hacia los objetos verdaderamente preocupantes."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los ejercicios de mesa bianuales organizados por NASA y FEMA, diplomáticos y científicos simulan escenarios donde desviar un asteroide podría inadvertidamente desplazar el corredor de impacto de un país a otro, debatiendo complejos dilemas de responsabilidad legal y soberanía territorial bajo el Tratado del Espacio Ultraterrestre de 1967."
      }
    ]
  }
];

export default function InteractiveInfographic_AsteroidesM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,10,15,0.92) 0%, rgba(20,10,30,0.88) 50%, rgba(12,10,25,0.95) 100%)',
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
      <AsteroidesM5Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF3D00, #FFEA00)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los módulos superiores para explorar la historia de Apophis y la defensa planetaria.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,61,0,0.4)' }}>
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
      hue: Math.random() > 0.5 ? '255, 61, 0' : '255, 234, 0',
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
    return () => cancelAnimationFrame(draw);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function AsteroidesM5Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,61,0,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM5)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FF3D00','#FFEA00','#00E676','#00B0FF','#D500F9','#1DE9B6','#FF3D00'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FF3D00" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FF3D00" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FF3D00" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,61,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,61,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,61,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FF3D00" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">APOPHIS Y DEFENSA PLANETARIA</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,61,0,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">PROTEGIENDO LA TIERRA DE IMPACTOS</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,61,0,0.2)'}`,
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
          layoutId="activeDotAsteroidesM5"
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
