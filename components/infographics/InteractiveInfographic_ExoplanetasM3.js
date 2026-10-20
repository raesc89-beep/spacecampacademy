'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Kepler, TESS & JWST Telescopes themed) ────────
function DecoKepler({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="20" y="20" width="20" height="25" rx="3" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="20,20 40,20 35,8 25,8" fill={color} opacity="0.5" />
      <line x1="10" y1="32" x2="20" y2="32" stroke={color} strokeWidth="2" />
      <line x1="40" y1="32" x2="50" y2="32" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="32" r="3" fill="#FFFFFF" />
    </svg>
  );
}

function DecoTess({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="15" y="15" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="31" y="15" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="15" y="31" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="31" y="31" width="14" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="22" r="3" fill={color} />
      <circle cx="38" cy="22" r="3" fill={color} />
      <circle cx="22" cy="38" r="3" fill={color} />
      <circle cx="38" cy="38" r="3" fill={color} />
    </svg>
  );
}

function DecoJwst({ size = 70, color = '#FF9100', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,8 40,14 40,26 30,32 20,26 20,14" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="18,28 28,34 28,46 18,52 8,46 8,34" fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points="42,28 52,34 52,46 42,52 32,46 32,34" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="20" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoTransmission({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="21" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1="5" y1="30" x2="55" y2="30" stroke="#FF5252" strokeWidth="2" opacity="0.8" />
      <circle cx="10" cy="30" r="2" fill="#FF5252" />
      <circle cx="50" cy="30" r="2" fill="#FF5252" />
    </svg>
  );
}

function DecoInfrared({ size = 70, color = '#FF80AB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 10 20 Q 20 10, 30 20 T 50 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 10 30 Q 20 20, 30 30 T 50 30" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <path d="M 10 40 Q 20 30, 30 40 T 50 40" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function DecoSpaceArray({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="48" cy="18" r="5" fill={color} />
      <line x1="48" y1="18" x2="54" y2="12" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'mision-kepler': [DecoKepler, DecoTess, DecoSpaceArray],
  'fotometria-espacial': [DecoTess, DecoKepler, DecoTransmission],
  'mision-tess': [DecoTess, DecoKepler, DecoJwst],
  'telescopio-jwst': [DecoJwst, DecoInfrared, DecoTransmission],
  'espectroscopia-transmision': [DecoTransmission, DecoJwst, DecoInfrared],
  'fotometria-eclipse-secundario': [DecoInfrared, DecoTransmission, DecoKepler],
  'futuro-observatorios': [DecoSpaceArray, DecoJwst, DecoTess],
};

const BIBLIOGRAPHY = [
  'Borucki, W. J. et al. (2010). "Kepler Planet-Detection Mission: Introduction and First Results", Science, 327(5968), 977-980.',
  'Ricker, G. R. et al. (2015). "Transiting Exoplanet Survey Satellite (TESS)", Journal of Astronomical Telescopes, Instruments, and Systems, 1(1), 014003.',
  'Gardner, J. P. et al. (2006). "The James Webb Space Telescope", Space Science Reviews, 123(4), 485-606.',
  'Sing, D. K. et al. (2016). "A continuum of planet spectra from warm Neptune to hot Jupiter atmospheres", Nature, 529(7584), 59-62.',
  'Seager, S., & Sasselov, D. D. (2000). "Theoretical Transmission Spectra during Exoplanetary Transit", The Astrophysical Journal, 537(2), 916.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "mision-kepler",
    "title": "El Telescopio Kepler",
    "color": "#FFD740",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_mision-kepler.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_mision-kepler.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_mision-kepler.webp',
    bannerCaption: 'El telescopio espacial Kepler de la NASA: la era dorada de la fotometría exoplanetaria',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_mision-kepler.webp',
    diagramCaption: 'Ingeniería del telescopio espacial Kepler: matriz de 42 detectores CCD y fotometría continua',
    "content": [
      "Lanzado por la NASA en marzo de 2009 hacia una orbita heliocentrica de seguimiento terrestre, el telescopio espacial Kepler transformo de raiz la astronomia observacional al convertirse en el primer instrumento disenado especificamente para determinar la frecuencia estadistica de planetas terrestres en nuestra galaxia. Antes de su despliegue orbital, la humanidad apenas conocia unos pocos cientos de mundos extrasolares masivos; Kepler demostro con rigor empírico que los planetas rocosos son la norma cosmica y no una excepcion biologica.",
      "Para cumplir este colosal reto tecnologico, Kepler monto un fotometro Schmidt de 0.95 metros de apertura con un espejo primario de 1.4 metros y un plano focal gigantesco integrado por cuarenta y dos sensores CCD cientificos que totalizaban noventa y cinco megapixeles. El telescopio apunto de forma ininterrumpida durante cuatro anos hacia un campo visual fijo de ciento quince grados cuadrados ubicado entre las constelaciones de Cygnus y Lyra, monitorizando simultaneamente el brillo de mas de ciento cincuenta mil estrellas cada treinta minutos.",
      "La precision fotometrica de Kepler fue capaz de detectar variaciones infinitesimales en el flujo de luz estelar de apenas veinte partes por millon (0.002%), la sensibilidad exacta requerida para registrar el paso de un planeta del tamano de la Tierra frente a una estrella analoga al Sol. Entre sus descubrimientos mas emblematicos destacan Kepler-186f, el primer mundo de radio casi identico al terrestre validado en la zona habitable de una enana M, y Kepler-452b, un candidato rocoso orbitando una estrella de tipo solar en trescientos ochenta y cinco dias.",
      "En 2013, el fallo mecanico sucesivo de dos de sus cuatro ruedas de reaccion inerciales impidio mantener el apuntamiento tridimensional estable original; sin embargo, el equipo de ingenieros de la NASA rediseno brillantemente el control de actitud en la mision extendida K2. Utilizando la presion de radiacion de los fotones solares sobre los paneles fotovoltaicos como un timon equilibrador pasivo, K2 opero durante cinco anos adicionales explorando nuevos campos en el plano de la ecliptica.",
      "Al agotarse definitivamente su combustible de hidrazina en octubre de 2018, Kepler habia confirmado dos mil seiscientos sesenta y dos exoplanetas validados y catalogado miles de candidatos adicionales que continúan siendo confirmados por telescopios terrestres. Su censo demografico revolucionario demostro que existen estadisticamente mas planetas que estrellas en la Via Lactea, confirmando que practicamente cada estrella del firmamento nocturno alberga su propio sistema de mundos en orbita."
    ],
    "fact": "Durante sus nueve anos y medio de operaciones en el espacio profundo, el telescopio Kepler monitorizo mas de medio millon de estrellas y confirmo mas de 2,600 exoplanetas; sus datos estadisticos demostraron que los planetas pequenos de tipo rocoso son sustancialmente mas numerosos en la galaxia que los gigantes gaseosos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El fotometro de Kepler operaba con una relacion senal-ruido tan rigurosa que podia detectar la disminucion de brillo provocada por un mosquito pasando a traves del haz de un faro de automovil a cientos de kilometros de distancia en la oscuridad, alcanzando una cota fotometrica diferencial de diez millonésimas de magnitud."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La mision K2 demostro el ingenio de la astrodinamica moderna: al orientar el telescopio de modo que la presion ejercida por el viento solar equilibrara simetricamente los pares de torsion de la nave, los ingenieros lograron una estabilidad sub-arcosegundo sin utilizar ruedas giroscopicas activas durante anos."
      }
    ]
  },
  {
    "id": "fotometria-espacial",
    "title": "Fotometría de Alta Precisión",
    "color": "#64FFDA",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_fotometria-espacial.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_fotometria-espacial.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_fotometria-espacial.webp',
    bannerCaption: 'Técnicas de reducción y calibración fotométrica en el espacio profundo',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_fotometria-espacial.webp',
    diagramCaption: 'Fotometría diferencial de alta precisión: supresión de ruido instrumental a nivel de partes por millón',
    "content": [
      "La fotometria diferencial de ultra alta precision constituye el pilar fundamental que posibilita la deteccion de mundos extrasolares mediante el metodo del transito. Desde la superficie de la Tierra, las turbulencias termicas y los gradientes de densidad en las capas troposfericas causan la centelleo o parpadeo atmosferico de las estrellas; estas fluctuaciones opticas introducen un ruido estocastico de varios milimagnitudes que enmascara por completo las diminutas senales de transito generadas por planetas terrestres.",
      "Al situar los detectores fotometricos en plataformas orbitales fuera de la envoltura gaseosa de la Tierra, las estrellas brillan con una constancia fotonica impoluta que solo esta limitada por el ruido de disparo cuantico de Poisson intrinseco de los propios fotones y las pulsaciones estelares naturales. En el vacio espacial, los sensores opticos pueden cuantificar caidas en la emision de luz de apenas diez a cincuenta partes por millon con una estabilidad temporal que abarca meses de observacion continua.",
      "Los instrumentos fotometricos modernos emplean matrices de detectores CCD y sensores CMOS cientificos refrigerados pasiva o activamente a temperaturas criogenicas para suprimir la corriente oscura y el ruido de lectura electronico. La medicion consiste en contabilizar de forma continua el numero de fotoelectrones generados en pozos de potencial de silicio durante intervalos de exposicion precisos, generando curvas de luz estelares que registran la evolucion temporal del flujo con precision milimetrica.",
      "Para extraer la senal genuina del transito planetario de estas series temporales complejas, los astrofisicos aplican algoritmos de reduccion y filtrado matematico como el analisis de componentes principales y modelos de procesos gaussianos. Estas tecnicas corrigen derivas termicas instrumentales, variaciones de apuntamiento del chasis espacial (jitter de apuntamiento) y senales astrofisicas de fondo como las manchas solares y las llamaradas cromosfericas estelares activas.",
      "Asimismo, la fotometria espacial de precision ha permitido el nacimiento de la astrosismologia moderna: al medir las oscilaciones armonicas de brillo causadas por ondas acusticas que reverberan en el interior estelar, los cientificos pueden determinar el radio, la masa y la edad evolutiva de la estrella hospedera con precisiones del uno al dos por ciento, parametros indispensables para cuantificar con exactitud el tamano real del planeta en transito."
    ],
    "fact": "La fotometria espacial elimina el parpadeo atmosferico terrestre y alcanza sensibilidades de partes por millon; esto permite no solo registrar transitos de mundos de radio terrestre, sino tambien medir las oscilaciones sismicas internas de las estrellas para datar con extrema precision su edad y masa fisica.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La mision pionera franco-europea CoRoT (Convection, Rotation and Planetary Transits), lanzada a orbita polar en 2006, fue el primer observatorio espacial en demostrar la viabilidad tecnica de la fotometria de alta precision para cazar exoplanetas, descubriendo CoRoT-7b, el primer mundo rocoso confirmado de la historia con densidad calculada."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Un detector fotometrico en el espacio cuenta paquetes de fotones con tal sensibilidad que si una estrella sufre una mancha solar microscopica que cubra el 0.01% de su disco, la camara registra inmediatamente la anomalia en la curva de luz permitiendo cartografiar el clima magnetico de estrellas distantes."
      }
    ]
  },
  {
    "id": "mision-tess",
    "title": "Misión TESS de la NASA",
    "color": "#00E5FF",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_mision-tess.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_mision-tess.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_mision-tess.webp',
    bannerCaption: 'Misión TESS: cartografía de tránsitos en estrellas brillantes cercanas en todo el cielo',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_mision-tess.webp',
    diagramCaption: 'Misión TESS: cámaras gran angular de cuatro lentes y órbita lunar resonante P/2',
    "content": [
      "Puesto en orbita en abril de 2018 como sucesor tecnologico de la mision Kepler, el Satelite de Sondeo de Exoplanetas en Transito (TESS, Transiting Exoplanet Survey Satellite) de la NASA ejecuto un cambio estrategico radical en la exploracion espacial. Mientras que Kepler concentro su mirada en un cono profundo pero estrecho del cielo lejano, TESS fue disenado como un explorador omnidireccional concebido para cartografiar el ochenta y cinco por ciento de la boveda celeste visible.",
      "El objetivo prioritario de TESS es localizar exoplanetas orbitando las estrellas mas brillantes, templadas y proximas a nuestro Sistema Solar (situadas habitualmente a distancias de entre treinta y trescientos anos luz). Al orbitar estrellas comparativamente cercanas y luminosas, estos mundos recien descubiertos se convierten en los candidatos perfectos para que los grandes observatorios terrestres y el James Webb puedan analizar con exito sus masas y atmosferas.",
      "Para llevar a cabo su sondeo global sistematico, TESS esta equipado con cuatro camaras opticas gran angular identicas construidas por el MIT, cada una provista de lentes de siete elementos con apertura de diez centimetros y matrices de dieciseis megapixeles de bajo ruido. En conjunto, las cuatro camaras abarcan una franja de observacion vertical continua de veinticuatro por noventa y seis grados de extension, monitorizando un sector celeste fijo durante veintisiete dias seguidos antes de reorientarse al siguiente.",
      "La arquitectura de navegacion espacial de TESS es una proeza de la mecanica celeste contemporanea: opera en una orbita de alta excentricidad denominada orbita de resonancia lunar P/2 (con un periodo orbital exacto de 13.7 dias). Esta trayectoria eliptica sincronizada gravitatoriamente con la Luna proporciona una estabilidad pasiva libre de friccion atmosferica y perturbaciones de radiacion termica, evitando el uso continuado de propelente quimico a bordo.",
      "Hasta el presente, TESS ha catalogado mas de siete mil Objetos de Interes (TOIs) y ha certificado cientos de planetas plenamente confirmados, abarcando desde calientes enanos de gas hasta fascinantes sistemas multiplanetarios rocosos en zonas templadas como TOI-700 d y TOI-715 b; asimismo, sus imagenes de cuadro completo capturadas con cadencias ultrarrapidas proveen un archivo cientifico invaluable para la investigacion de supernovas y asteroides."
    ],
    "fact": "TESS monitoriza el 85% del cielo nocturno mediante cuatro camaras gran angular montadas en una innovadora orbita de resonancia lunar P/2 de 13.7 dias; su mision localiza exoplanetas en estrellas brillantes cercanas a la Tierra, proporcionando los objetivos estelares prioritarios para la espectroscopia del James Webb.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La orbita P/2 de TESS alcanza un apogeo a casi cuatrocientos mil kilometros de distancia y un perigeo a cien mil kilometros; durante el paso por el perigeo, la antena de alta ganancia transmite a tierra cientos de gigabits de datos fotometricos brutos en una ventana de enlace de apenas dieciseis horas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las camaras de TESS observan de forma ininterrumpida mas de doscientas mil estrellas brillantes preseleccionadas con una cadencia fotometrica ultrarrapida de dos minutos y veinte segundos, permitiendo a los astrofisicos registrar con extraordinaria definicion temporal la curva de entrada y salida de transitos planetarios de apenas unos minutos de duracion."
      }
    ]
  },
  {
    "id": "telescopio-jwst",
    "title": "Telescopio Espacial JWST",
    "color": "#FF9100",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_telescopio-jwst.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_telescopio-jwst.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_telescopio-jwst.webp',
    bannerCaption: 'El telescopio James Webb: caracterización de atmósferas y química exoplanetaria',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_telescopio-jwst.webp',
    diagramCaption: 'Arquitectura óptica del JWST: espejo segmentado de berilio dorado de 6.5 m y espectrógrafo NIRSpec',
    "content": [
      "Puesto en orbita el 25 de diciembre de 2021 mediante un lanzador Ariane 5, el Telescopio Espacial James Webb (JWST, fruto de la cooperacion entre NASA, ESA y CSA) marco el inicio de una revolucion cientifica sin parangon en la caracterizacion directa de exoplanetas. Si Kepler y TESS consiguieron censar y cuantificar la existencia geometrica de mundos distantes, el JWST fue disenado para descifrar de que estan compuestas quimicamente sus atmosferas y superficies.",
      "El componente optico principal del observatorio es un colosal espejo segmentado de seis metros y medio de diametro efectivo, integrado por dieciocho paneles hexagonales fabricados en berilio ultraligero y recubiertos por una pelicula de vapor de oro puro de cien nanometros de espesor. El oro exhibe una reflectividad optica superior al noventa y ocho por ciento en el espectro infrarrojo cercano y medio, la region electromagnetica donde se localizan las bandas de absorcion molecular diagnosticas de volatiles planetarios.",
      "Ubicado en el punto de libracion gravitatoria Lagrange L2, a un millon y medio de kilometros de la Tierra en direccion opuesta al Sol, el telescopio opera blindado por un descomunal parasol de cinco laminas de Kapton del tamano de una cancha de tenis. Esta pantalla aisla los instrumentos opticos del flujo termico del Sol, la Tierra y la Luna, permitiendo que los detectores NIRSpec, MIRI y NIRCam se enfrien pasivamente por debajo de los cincuenta kelvins (-223 °C) y activamente a siete kelvins mediante un criocooler de helio.",
      "Las capacidades espectroscopicas de alta resolucion del JWST permiten descomponer la luz infrarroja filtrada por la atmosfera de un exoplaneta en miles de canales espectrales estrechos con relaciones de senal-ruido extraordinarias. Esto permite identificar trazas gaseosas en concentraciones de partes por millon, revelando compuestos quimicos fundamentales para la astrobiologia como agua gaseosa, dioxido de carbono, monoxido de carbono, metano y dioxido de azufre fotoquimico.",
      "Entre sus hitos historicos mas relevantes figura la deteccion definitiva de dioxido de carbono en la atmosfera del gigante WASP-39b, el hallazgo de nubes de arena de silicato en VHS 1256 b y la medicion pionera de la temperatura de brillo termica superficial en los mundos rocosos de masa terrestre TRAPPIST-1b y 1c, sentando las bases operativas para la futura busqueda de desequilibrios quimicos biologicos en exoplanetas habitables."
    ],
    "fact": "El telescopio James Webb, emplazado en el punto L2 con un espejo de berilio y oro de 6.5 metros protegido a temperaturas criogenicas extremas, revoluciono la ciencia exoplanetaria al lograr la deteccion quimica definitiva de vapor de agua, CO2 y moleculas fotoquimicas en atmosferas de mundos extrasolares.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Cada uno de los dieciocho segmentos hexagonales del espejo primario del JWST esta controlado por seis actuadores mecanicos piezoelasticos capaces de ajustar la posicion y curvatura del espejo en incrementos microscopicos de apenas siete nanometros, una fraccion diminuta de la longitud de onda de la luz visible."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El parasol de cinco laminas de Kapton del JWST disipa de forma tan colosal la radiacion solar que produce una diferencia de temperatura superior a los trescientos grados Celsius entre la cara frontal expuesta directamente al Sol (que se calienta hasta los 85 °C) y la cara posterior refrigerada donde operan los detectores opticos criogenicos (que permanece congelada a -233 °C)."
      }
    ]
  },
  {
    "id": "espectroscopia-transmision",
    "title": "Espectroscopía Transmisión",
    "color": "#00E5FF",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_espectroscopia-transmision.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_espectroscopia-transmision.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_espectroscopia-transmision.webp',
    bannerCaption: 'Espectroscopía de transmisión atmosférica durante el tránsito astronómico',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_espectroscopia-transmision.webp',
    diagramCaption: 'Espectroscopía de transmisión: filtrado de luz estelar a través del limbo anular atmosférico',
    "content": [
      "La espectroscopia de transmision atmosferica es una de las tecnicas astrofisicas mas elegantes y cuantitativas desarrolladas en la ciencia contemporanea para investigar la composicion quimica de planetas distantes. Durante el transito de un exoplaneta por delante del disco de su estrella anfitriona, el cuerpo planetario solido bloquea opacamente la luz estelar central, pero el anillo exterior correspondiente a su envoltura gaseosa atmosferica permanece semitransparente a los fotones.",
      "A medida que los rayos de luz estelar rasantes atraviesan esta delgada corona atmosferica en su trayectoria hacia los telescopios terrestres o espaciales, las especies atomicas y moleculares suspendidas en el gas absorben y dispersan fotones en longitudes de onda cuantizadas muy especificas, correspondientes a las transiciones electronicas, vibracionales y rotacionales unicas de cada elemento quimico presente en el aire exoplanetario.",
      "Como consecuencia directa de esta absorcion selectiva por resonancia cuantica, el radio aparente efectivo del planeta parece variar ligeramente segun la longitud de onda en la que se efectue la observacion: en las bandas donde un gas especifico como el vapor de agua o el metano es fuertemente opaco, la atmosfera bloquea mas luz y el planeta parece mayor; en las regiones transparentes del espectro, el planeta aparenta ser mas pequeno y la luz estelar pasa sin atenuacion.",
      "La magnitud de esta firma espectral diferencial esta gobernada por la escala de altura atmosferica H (definida por el producto de la constante de Boltzmann y la temperatura, dividido entre el peso molecular medio y la aceleracion gravitatoria local). Por ello, los mundos calientes dotados de atmosferas ricas en hidrogeno ligero exhiben escalas de altura hinchadas de cientos de kilometros, facilitando la deteccion de sus componentes quimicos espectroscopicos.",
      "Mediante la aplicacion rigurosa de esta tecnica, los astronomos han medido con precision la metalicidad atmosferica, la proporcion carbono-oxigeno (relacion C/O, un marcador diagnostico crucial del lugar de nacimiento del planeta en el disco protoplanetario primitivo) y han detectado la presencia de aerosoles minerales de alta temperatura y nubes condensadas de corindon y silicatos suspendidas en atmosferas de Jupíteres calientes."
    ],
    "fact": "La espectroscopia de transmision analiza la luz estelar que se filtra a traves del anillo atmosferico durante un transito; dado que cada molecula de gas absorbe frecuencias infrarrojas diagnosticas especificas, la variacion del radio aparente del planeta revela de manera inequivoca la quimica de su atmosfera.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La relacion entre la concentracion de carbono y oxigeno (C/O) determinada mediante espectros de transmision permite a los astrofisicos deducir si un exoplaneta gigante nacio mas alla de la linea de nieve de agua o del monoxido de carbono en su disco primordial, revelando su ruta historica de migracion orbital."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El espesor efectivo de la atmosfera medido durante un transito representa con frecuencia menos del 0.1% del radio total del planeta: registrar su espectro en una Supertierra equivale a medir la atenuacion optica producida por la capa de pintura de una bola de billar a miles de kilometros de separacion."
      }
    ]
  },
  {
    "id": "fotometria-eclipse-secundario",
    "title": "Eclipse Secundario y Emisión",
    "color": "#FF80AB",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_fotometria-eclipse-secundario.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_fotometria-eclipse-secundario.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_fotometria-eclipse-secundario.webp',
    bannerCaption: 'Eclipses secundarios y mapeo térmico longitudinal del lado diurno',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_fotometria-eclipse-secundario.webp',
    diagramCaption: 'Eclipse secundario y curvas de fase térmica: mapeo longitudinal de emisión del lado diurno',
    "content": [
      "Mientras que el transito primario tiene lugar cuando el planeta cruza por delante de la estrella, exactamente media orbita despues se produce el evento astrofisico complementario: la ocultacion o eclipse secundario. En esta fase geometrica, el exoplaneta se desplaza directamente por detras del disco estelar desde la perspectiva visual terrestre, quedando completamente eclipsado y fuera de la vista de los instrumentos opticos.",
      "Inmediatamente antes de que comience el eclipse secundario, el telescopio recolecta el flujo fotometrico total combinado de ambos cuerpos celestes: la radiacion emitida por la estrella mas la luz termica emitida directamente y la luz estelar reflejada por el hemisferio diurno del exoplaneta. En el momento en que el planeta queda ocultado tras el limbo estelar, el brillo del sistema cae abruptamente; la diferencia exacta entre ambas mediciones corresponde a la senal pura del planeta.",
      "Esta tecnica de espectroscopia y fotometria de emision infrarroja directa permite medir de forma cuantitativa la temperatura de brillo superficial del lado iluminado del exoplaneta sin necesidad de resolver espacialmente la imagen de la estrella. Cuanto mayor sea la energia termica acumulada en la superficie o atmosfera planetaria, mas profunda y pronunciada sera la caida de flujo registrada durante la ocultacion secundaria.",
      "Asimismo, la combinacion del eclipse secundario con la observacion continua de la curva de fase completa a lo largo de toda la orbita permite trazar mapas termicos bidimensionales de la superficie o de la circulacion de vientos en la atmosfera. Mediante estas curvas de fase termicas, los cientificos han demostrado que en muchos mundos con acoplamiento de marea sincrono, los vientos zonales hiperventilados desplazan el punto termico mas caliente decenas de grados al este del punto subestelar.",
      "La fotometria de eclipse secundario tambien suministra mediciones exactas del albedo geometrico del planeta en bandas visibles e infrarrojas, y permite determinar de manera inequivoca la excentricidad orbital del sistema: si la ocultacion no ocurre con simetria exacta a medio camino temporal entre dos transitos consecutivos, la orbita planetaria es obligatoriamente una elipse elongada regulada por perturbaciones gravitatorias seculares."
    ],
    "fact": "El eclipse secundario mide la disminucion de brillo cuando el planeta se oculta detras de la estrella, aislando la emision termica directa de su cara diurna; esta tecnica permite calcular la temperatura superficial, deducir la presencia o ausencia de atmosfera y cartografiar vientos ecuatoriales globales.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El instrumento MIRI del telescopio James Webb utilizo la fotometria de eclipse secundario en quince micrometros para medir la emision termica de TRAPPIST-1 b, demostrando que su cara diurna alcanza los 230 °C, una temperatura consistente con una roca basáltica desnuda carente de redistribucion de calor por una atmosfera espesa."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las curvas de fase orbital completa registradas por el telescopio espacial Spitzer revelaron vientos jet ecuatoriales de mas de siete mil kilometros por hora en Jupíteres calientes, los cuales arrastran el calor del mediodía perpetuo hacia el hemisferio nocturno en tormentas globales supersónicas continuas."
      }
    ]
  },
  {
    "id": "futuro-observatorios",
    "title": "Futuros Cazadores Espaciales",
    "color": "#B388FF",
    "btnImage": "/assets/exoplanetas/infographic_m3/btn_futuro-observatorios.jpg",
    "image": "/assets/exoplanetas/infographic_m3/hero_futuro-observatorios.jpg",
    bannerImage: '/assets/exoplanetas/infographic_m3/banner_futuro-observatorios.webp',
    bannerCaption: 'Futuros observatorios espaciales y coronografía para la búsqueda de Tierras gemelas',
    diagramImage: '/assets/exoplanetas/infographic_m3/diagram_futuro-observatorios.webp',
    diagramCaption: 'Telescopios espaciales de próxima generación: coronografía activa del Roman y Habitable Worlds',
    "content": [
      "La caracterizacion fisica y astrobiologica de los exoplanetas se encuentra en los albores de una era dorada sin precedentes, impulsada por el desarrollo simultaneo de colosales telescopios opticos terrestres y sofisticadas flotas de observatorios espaciales especificamente optimizados para el aislamiento optico de gemelos terrestres y el analisis sistematico de biofirmas gaseosas en la Via Lactea.",
      "En el ambito de la exploracion espacial europea, la Agencia Espacial Europea avanza en la construccion de la mision PLATO (Planetary Transits and Oscillations of stars), cuyo lanzamiento esta previsto para 2026. PLATO desplegara una plataforma con veintiseis camaras opticas simultaneas para detectar y caracterizar exoplanetas rocosos en orbitas de largo periodo en zonas habitables alrededor de estrellas de tipo solar, determinando sus radios y edades evolutivas con precision sismica.",
      "A esta iniciativa se sumara en 2029 el telescopio espacial ARIEL de la ESA, el primer observatorio orbital dedicado en exclusiva al estudio comparativo de la quimica atmosferica de una muestra estadistica de mas de mil exoplanetas en transito. ARIEL analizara sistematicamente la correlacion entre la metalicidad estelar, los procesos de formacion planetaria y la composicion molecular de mundos gaseosos y rocosos templados.",
      "Por su parte, la NASA prepara el lanzamiento a finales de la decada del Telescopio Espacial Nancy Grace Roman, provisto de una camara infrarroja de gran campo y un instrumento de coronografia avanzada con espejos deformables activos, capaz de suprimir la luz estelar en un factor de mil millones para fotografiar de manera directa exoplanetas gigantes frios en orbitas comparables a la de Jupiter.",
      "Finalmente, en la decada de 2030, la confluencia entre los telescopios extremadamente grandes en tierra (como el Extremely Large Telescope de 39 metros de la ESO en el desierto de Atacama) y el futuro Habitable Worlds Observatory (HWO) de la NASA con espejo coronografico ultracongelado de seis metros hara posible la meta definitiva: fotografiar directamente planetas de masa terrestre y analizar sus atmosferas en busca de oxigeno, vapor de agua y vegetacion."
    ],
    "fact": "La proxima generacion de telescopios espaciales y terrestres, incluyendo PLATO, ARIEL, Nancy Grace Roman, el telescopio ELT de 39 metros y el futuro Habitable Worlds Observatory (HWO), permitira el salto historico desde la simple deteccion indirecta hacia la obtencion de imagenes directas y biofirmas de mundos habitables.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El futuro telescopio terrestre ELT en cerro Armazones recolectara cien millones de veces mas luz que el ojo humano y utilizara sistemas de optica adaptativa extrema con seis mil actuadores por espejo para compensar la turbulencia atmosferica en tiempo real, permitiendo aislar espectros de planetas cercanos como Proxima b."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El concepto de coronografo estelar avanzado desarrollado para el telescopio Nancy Grace Roman utiliza tecnicas de supresion optica mediante mascaras de fase de mascara vectorial de vortice que logran oscurecer el deslumbramiento estelar en un factor de mil millones sin reducir la debil luz emitida por el planeta."
      }
    ]
  }
];

export default function InteractiveInfographic_ExoplanetasM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(8,18,30,0.92) 0%, rgba(10,24,40,0.88) 40%, rgba(6,12,24,0.95) 100%)',
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
      <TemporalFieldCanvas />
      <ExoplanetasHeaderM3 />
      
      {/* Progress Bar */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '1.5rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FFD740, #00E5FF)',
              borderRadius: '3px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Módulos explorados: {explored.size}/{INFOGRAPHIC_NODES.length}
          </span>
        </div>
      </div>

      {/* Top Node Selector Carousel */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1rem', marginTop: '0.5rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,215,64,0.2)',
        backdropFilter: 'blur(10px)'
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

      {/* Content Panel Area */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '320px',
                color: 'rgba(255,255,255,0.5)', textAlign: 'center', gap: '1rem',
                padding: '2rem'
              }}
            >
              <Sparkles size={36} style={{ color: '#FFD740', opacity: 0.6 }} />
              <h3 style={{ margin: 0, color: '#FFD740', fontSize: '1.2rem', fontWeight: 700 }}>
                Explora los Telescopios Kepler, TESS y JWST
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                Haz clic en cualquiera de los 7 módulos superiores para descubrir la tecnología de los observatorios espaciales y la espectroscopía de transmisión atmosférica.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Bibliography */}
      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,215,64,0.25)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: '#FFD740', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
          Referencias y Fuentes Académicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', borderLeft: '3px solid #FFD740' }}>
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

function TemporalFieldCanvas() {
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
      hue: Math.random() > 0.5 ? '255, 215, 64' : '0, 229, 255',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.35;
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

function ExoplanetasHeaderM3() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(255,215,64,0.4))' }}>
        <path d="M 40 100 Q 300 15, 560 100" fill="none" stroke="url(#exoGrad3)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 40 + t * 520;
          const cy = 100 - Math.sin(t * Math.PI) * 85;
          const colors = ['#FFD740','#64FFDA','#00E5FF','#FF9100','#FF80AB','#B388FF','#448AFF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5.5, 3] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="18" r="12" fill="none" stroke="#FFD740" strokeWidth="1.5" opacity="0.7" />
        <circle cx="300" cy="18" r="3" fill="#00E5FF" opacity="0.9" />
        <defs>
          <linearGradient id="exoGrad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,215,64,0.15)" />
            <stop offset="50%" stopColor="rgba(255,215,64,0.95)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="68" textAnchor="middle" fill="#FFD740" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TELESCOPIOS KEPLER, TESS Y JWST</text>
        <text x="300" y="88" textAnchor="middle" fill="rgba(0,229,255,0.85)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">FOTOMETRÍA ESPACIAL Y ESPECTROSCOPÍA</text>
      </svg>
    </div>
  );
}

function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(255,215,64,0.25)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}60, 0 0 35px ${node.color}25, inset 0 0 12px ${node.color}40`
          : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
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
        color: isActive ? node.color : 'rgba(255,255,255,0.8)',
        fontSize: '0.76rem', fontWeight: 700, letterSpacing:'0.2px',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.3s',
        maxWidth: '95px',
        textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeDotExoM3"
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
  up:    { hidden: { y: -25, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 25, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -25, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 25, opacity: 0 },  visible: { x: 0, opacity: 1 } },
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
      border: `1px solid ${color}30`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}10, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}18` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <IconComp size={15} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.8 }} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 28 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', borderLeft: `3px solid ${color}40`, paddingLeft: '0.8rem' }}>
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
    { top: '6%', right: '-5px', rotate: 12 },
    { top: '48%', left: '-12px', rotate: -12 },
    { bottom: '10%', right: '10px', rotate: 18 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        background: 'rgba(10, 20, 34, 0.94)', backdropFilter: 'blur(20px)', border: `1px solid ${node.color}40`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${node.color}15`
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', border: `1px solid ${node.color}50`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Hero Grid 1fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}20, rgba(0,0,0,0.5))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}20)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '12px', right: '55px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 52, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.45rem', fontWeight: 800, color: node.color, letterSpacing:'-0.01em', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}60`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.9rem', fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -7, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 4, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 8} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.025)', borderRadius: '14px', padding: '1.25rem', borderLeft: `3px solid ${node.color}40`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-9px', left: '14px', background: node.color, color: '#060E18', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'CONCEPTO FEYNMAN' : i === 1 ? 'TECNOLOGÍA INSTRUMENTAL' : 'IMPACTO CIENTÍFICO'}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 2 }}>
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

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.4rem', background: `linear-gradient(90deg, ${node.color}18, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}35`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `${node.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={19} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico Clave
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', fontSize: '0.92rem', lineHeight: 1.68 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
