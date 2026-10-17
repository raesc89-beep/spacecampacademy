'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Mercurio: El Horno de Hierro) ───────────────────
function DecoIronCore({ size = 70, color = '#E63946', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <circle cx="30" cy="30" r="18" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="8" fill="#FFF" opacity="0.4" />
    </svg>
  );
}

function DecoThermalSun({ size = 70, color = '#FF9F1C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.8" />
      <path d="M30 5 L30 14 M30 46 L30 55 M5 30 L14 30 M46 30 L55 30 M12 12 L19 19 M41 41 L48 48 M12 48 L19 41 M41 19 L48 12" stroke={color} strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function DecoFaultScarp({ size = 70, color = '#CB997E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 45 L25 35 L35 25 L50 15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M15 50 L30 40 L40 30 L55 20" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoShadowCrater({ size = 70, color = '#00B4D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="22" ry="14" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M15 30 A15 8 0 0 0 45 30" fill={color} opacity="0.4" />
      <circle cx="25" cy="26" r="3" fill="#FFF" opacity="0.6" />
    </svg>
  );
}

function DecoMagneticField({ size = 70, color = '#9D4EDD', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 Q10 30 30 50 Q50 30 30 10 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M30 18 Q18 30 30 42 Q42 30 30 18 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="5" x2="30" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
    </svg>
  );
}

function DecoImpact({ size = 70, color = '#F15BB5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <line x1="30" y1="10" x2="30" y2="2" stroke={color} strokeWidth="2" />
      <line x1="30" y1="50" x2="30" y2="58" stroke={color} strokeWidth="2" />
      <line x1="10" y1="30" x2="2" y2="30" stroke={color} strokeWidth="2" />
      <line x1="50" y1="30" x2="58" y2="30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoProbe({ size = 70, color = '#00F5D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="22" y="22" width="16" height="16" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="6" y1="30" x2="22" y2="30" stroke={color} strokeWidth="2" />
      <line x1="38" y1="30" x2="54" y2="30" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

const DECO_MAP = {
  'nucleo-gigante': [DecoIronCore, DecoThermalSun, DecoImpact],
  'temperaturas-extremas': [DecoThermalSun, DecoShadowCrater, DecoIronCore],
  'escarpas-tectonicas': [DecoFaultScarp, DecoIronCore, DecoProbe],
  'crateres-y-hielo': [DecoShadowCrater, DecoThermalSun, DecoProbe],
  'campo-magnetico': [DecoMagneticField, DecoIronCore, DecoProbe],
  'gran-impacto': [DecoImpact, DecoIronCore, DecoFaultScarp],
  'exploracion-bepicolombo': [DecoProbe, DecoMagneticField, DecoShadowCrater],
};

const BIBLIOGRAPHY = [
  'Solomon, S. C., Nittler, L. R., & Anderson, B. J. (2018). "Mercury: The View after MESSENGER". Cambridge University Press.',
  'Hauck, S. A., et al. (2013). "The gravity field, orientation, and interior structure of Mercury". Journal of Geophysical Research: Planets, 118(6), 1204-1220.',
  'Lawrence, D. J., et al. (2013). "Evidence for water ice near Mercury\'s poles from MESSENGER neutron spectrometer data". Science, 339(6117), 292-296.',
  'Benz, W., et al. (2007). "Origin of Mercury". Space Science Reviews, 132(2-4), 189-202.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "nucleo-gigante",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_nucleo-gigante.webp",
    "title": "El Núcleo Gigante",
    "color": "#E63946",
    "btnImage": "/assets/rocosos/infographic_m2/btn_nucleo-gigante.webp",
    "image": "/assets/rocosos/infographic_m2/hero_nucleo-gigante.webp",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_nucleo-gigante.webp",
    "diagramCaption": "Estructura interna de Mercurio: núcleo metálico de hierro ocupando el 85% del radio planetario",
    "content": [
      "Mercurio es el planeta más pequeño del Sistema Solar, con un radio ecuatorial de dos mil cuatrocientos treinta y nueve kilómetros, pero oculta una anomalía geofísica sin parangón en su interior. Mientras que en la Tierra el núcleo metálico representa apenas el diecisiete por ciento del volumen global, en Mercurio el núcleo de hierro y níquel abarca más del ochenta y cinco por ciento de su radio y un impresionante cincuenta y siete por ciento de todo su volumen volumétrico total.",
      "Esta extraordinaria desproporción anatómica significa que el manto rocoso de silicatos y la corteza superficial exterior constituyen una delgadísima cáscara envolvente de apenas cuatrocientos kilómetros de espesor total. En términos mecánicos y gravitatorios, Mercurio se comporta prácticamente como una gigantesca bola metálica de aleación de hierro y níquel apenas recubierta por un fino barniz de roca basáltica oscura y pulverizada.",
      "Debido a esta gigantesca concentración metálica central, Mercurio ostenta una densidad media de cinco mil cuatrocientos veintisiete kilogramos por metro cúbico, la segunda más alta del Sistema Solar después de la Tierra. Sin embargo, dado que la masa de la Tierra es dieciocho veces superior y su densidad está fuertemente incrementada por auto-compresión gravitacional interna, la densidad descomprimida de Mercurio (cinco punto tres gramos por centímetro cúbico) es indiscutiblemente la mayor de todos los planetas.",
      "Las mediciones geofísicas de precisión orbital efectuadas por la sonda MESSENGER de la NASA entre 2011 y 2015 confirmaron que este corazón metálico no se encuentra enteramente congelado. El análisis de las libraciones longitudinales forzadas en la rotación planetaria y los armónicos del campo de gravedad demostraron que Mercurio alberga una capa externa de núcleo líquido fundido enriquecida en azufre y silicio que mantiene temperaturas de fusión reducidas.",
      "La existencia de este colosal núcleo ferroso desafía directamente los modelos convencionales de acreción nebular solar. Para explicar cómo un cuerpo tan pequeño retuvo semejante fracción de hierro en relación con su cubierta de silicatos, los astrofísicos han formulado complejos modelos de diferenciación magmática a bajas fugacidades de oxígeno y colisiones cataclísmicas despojadoras en los albores del Sistema Solar."
    ],
    "fact": "El núcleo metálico de Mercurio abarca el 85% de su radio y el 57% de su volumen planetario total, confiriéndole la densidad descomprimida más elevada del Sistema Solar (5.3 g/cm³) y manteniendo una capa externa de hierro líquido fundido confirmada por las mediciones gravitatorias de la sonda MESSENGER.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El momento de inercia normalizado de Mercurio (C/MR² = 0.346) medido por la nave espacial MESSENGER demostró de forma concluyente que el núcleo metálico mide aproximadamente cuatro mil cuarenta kilómetros de diámetro, dejando una envoltura de manto y corteza de silicatos de poco más de cuatrocientos kilómetros de espesor."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si Mercurio tuviera exactamente el mismo diámetro físico que la Luna de la Tierra, pesaría más del doble que nuestro satélite natural debido a la extraordinaria densidad y peso específico del hierro y níquel metálicos que saturan casi las tres cuartas partes de toda la masa sólida de su interior planetario profundo."
      }
    ]
  },
  {
    "id": "temperaturas-extremas",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_temperaturas-extremas.webp",
    "title": "Contrastes Térmicos",
    "color": "#FF9F1C",
    "btnImage": "/assets/rocosos/infographic_m2/btn_temperaturas-extremas.webp",
    "image": "/assets/rocosos/infographic_m2/hero_temperaturas-extremas.webp",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_temperaturas-extremas.webp",
    "diagramCaption": "Oscilación térmica extrema: contraste entre 430 °C diurnos y -180 °C nocturnos sin atmósfera",
    "content": [
      "Mercurio presenta la oscilación térmica diurna más extrema y violenta de todo el Sistema Solar. Al orbitar a una distancia heliocéntrica promedio de solo cincuenta y siete punto nueve millones de kilómetros (alcanzando cuarenta y seis millones de kilómetros en su perihelio), la cara iluminada por el Sol recibe una irradiancia solar descomunal de hasta catorce mil cuatrocientos noventa vatios por metro cuadrado, diez veces superior a la que alcanza la órbita de la Tierra.",
      "Bajo este bombardeo incesante de fotones y radiación térmica, la temperatura del suelo rocoso en el punto subsolar diurno se eleva hasta los setecientos kelvin (aproximadamente cuatrocientos veintisiete grados Celsius). Este calor infernal es suficiente para fundir metales como el plomo, el estaño y el zinc en cuestión de minutos, transformando la superficie rocosa expuesta en un páramo abrasador de radiación infrarroja incandescente.",
      "Sin embargo, debido a la ausencia casi absoluta de una atmósfera densa que actúe como colchón térmico regulador o manta de retención, el calor acumulado en la superficie se irradia instantáneamente hacia la negrura gélida del espacio exterior en cuanto el terreno entra en el cono de sombra nocturno. En la cara oculta, la temperatura cae en picado hasta los cien kelvin (ciento setenta y tres grados Celsius bajo cero).",
      "Esta variación térmica de seiscientos grados Celsius entre el día y la noche se ve exacerbada por la singular dinámica orbital del planeta. Mercurio está atrapado en una resonancia espín-órbita de tres a dos: gira exactamente tres veces sobre su propio eje de rotación sideral por cada dos revoluciones completas que efectúa alrededor del Sol, lo que genera un día solar (el intervalo entre dos mediodías consecutivos) de ciento setenta y seis días terrestres.",
      "Debido a esta lentitud extrema y a la alta excentricidad orbital (e = 0.2056), un astronauta situado en ciertas longitudes de Mercurio presenciaría un fenómeno óptico insólito: el Sol saldría en el este, se detendría en el firmamento al coincidir la velocidad angular orbital con la rotación, retrocedería brevemente hacia el horizonte durante varios días y luego reanudaría su avance hacia el oeste, prolongando el calentamiento focalizado."
    ],
    "fact": "Mercurio experimenta la mayor oscilación térmica diurna del Sistema Solar, variando desde 427 °C en el mediodía subsolar hasta -173 °C en la noche profunda; esta diferencia de 600 grados se debe a la ausencia de atmósfera y a su resonancia espín-órbita de 3:2, donde un solo día solar dura 176 días terrestres.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La tenue envoltura gaseosa de Mercurio posee una presión en superficie inferior a diez elevado a la menos catorce bares, catalogándose técnicamente como una exosfera de colisión nula donde los átomos de sodio, potasio, calcio y helio rebotan libremente sobre las rocas impulsados por el viento solar y la fotodesorción."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A pesar de orbitar más próximo al Sol que ningún otro mundo, Mercurio no es el planeta más caliente del Sistema Solar; ese récord térmico absoluto pertenece a Venus, cuya densa atmósfera de dióxido de carbono atrapa la radiación infrarroja mediante un feroz efecto invernadero global que mantiene 465 °C día y noche de forma constante."
      }
    ]
  },
  {
    "id": "escarpas-tectonicas",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_escarpas-tectonicas.webp",
    "title": "Escarpas de Contracción",
    "color": "#CB997E",
    "btnImage": "/assets/rocosos/infographic_m2/btn_escarpas-tectonicas.jpg",
    "image": "/assets/rocosos/infographic_m2/hero_escarpas-tectonicas.jpg",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_escarpas-tectonicas.webp",
    "diagramCaption": "Escarpas lobuladas de contracción: acortamiento cortical de 7 km por enfriamiento del núcleo",
    "content": [
      "A diferencia de la Tierra, cuya dinámica superficial está regida por la tectónica de placas con bordes divergentes, convergentes y transformantes, Mercurio es un planeta geológicamente de una sola placa litosférica rígida global. Sin embargo, su relieve exhibe impresionantes deformaciones tectónicas compresivas que recorren miles de kilómetros en forma de acantilados lobulados denominados escarpas de contracción o rupes.",
      "Estas majestuosas estructuras geológicas surgieron como consecuencia directa del enfriamiento secular y la cristalización progresiva de su gigantesco núcleo metálico de hierro a lo largo de los últimos cuatro mil millones de años. Al perder calor interno hacia el espacio, el núcleo metálico redujo su volumen físico; al contraerse el corazón del planeta, la corteza rocosa sólida exterior fue sometida a enormes esfuerzos compresivos horizontales.",
      "Incapaz de encogerse plásticamente al mismo ritmo, la litosfera rocosa se fracturó a lo largo de fallas inversas de ángulo bajo, empujando colosales bloques de corteza sobre las placas adyacentes. Este proceso esculpió murallas escarpadas que alcanzan hasta tres mil metros de altura vertical y se extienden linealmente a través de cuencas y cráteres por más de mil kilómetros de longitud, deformando la fisonomía del planeta entero.",
      "Los modelos geofísicos basados en el mapeo fotogramétrico tridimensional y la altimetría láser de la sonda MESSENGER estiman que la contracción térmica global redujo el radio de Mercurio entre cinco y siete kilómetros (lo que equivale a una contracción en su circunferencia de más de treinta y cinco kilómetros), una disminución dimensional significativamente superior a la estimada en décadas pasadas.",
      "Además, las imágenes de ultra alta resolución captadas por MESSENGER revelaron la presencia de pequeñas escarpas tectónicas muy jóvenes y frescas que cortan cráteres de impacto de apenas cincuenta millones de años de antigüedad. Este hallazgo fundamental demuestra que Mercurio no es un cadáver geológico inerte, sino un mundo dinámico que continúa enfriándose, contrayéndose y experimentando sismos tectónicos en la actualidad."
    ],
    "fact": "Al enfriarse secularmente su descomunal núcleo metálico, Mercurio se contrajo entre 5 y 7 kilómetros de radio a lo largo de su evolución geológica, fracturando su corteza rígida mediante fallas inversas de empuje que crearon majestuosas escarpas lobuladas de hasta tres mil metros de altura vertical como Enterprise Rupes y Discovery Rupes.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La escarpa más colosal de Mercurio, Enterprise Rupes, posee una longitud superior a los mil kilómetros y supera los tres mil metros de desnivel vertical; los análisis geomorfológicos revelan que se formó mediante cabalgamientos tectónicos profundos que penetraron varias decenas de kilómetros en la litosfera planetaria."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Siguiendo la convención de la Unión Astronómica Internacional, las escarpas de contracción de Mercurio llevan los nombres de célebres barcos de exploración histórica de la humanidad, tales como el HMS Beagle de Charles Darwin, el HMS Discovery del capitán Cook y el histórico navío Victoria de la expedición de Magallanes."
      }
    ]
  },
  {
    "id": "crateres-y-hielo",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_crateres-y-hielo.webp",
    "title": "Hielo Polar Sombrío",
    "color": "#00B4D8",
    "btnImage": "/assets/rocosos/infographic_m2/btn_crateres-y-hielo.webp",
    "image": "/assets/rocosos/infographic_m2/hero_crateres-y-hielo.webp",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_crateres-y-hielo.webp",
    "diagramCaption": "Trampas frías polares en sombra perpetua con depósitos de hielo de agua a -170 °C",
    "content": [
      "La coexistencia de hielo de agua estable en el planeta más cercano al ardiente horno solar representa uno de los hallazgos más asombrosos y paradójicos de toda la planetología moderna. Este fenómeno es físicamente posible gracias a una particularidad geométrica crítica: la oblicuidad axial de Mercurio respecto al plano de su órbita es de apenas cero punto cero tres grados (prácticamente perpendicular).",
      "Debido a esta inclinación axial casi nula, Mercurio carece de estaciones térmicas y el Sol se desplaza eternamente rozando el horizonte en los polos norte y sur. En consecuencia, el interior de los cráteres de impacto profundos situados en latitudes polares elevadas (como Prokofiev, Kandinsky, Tolkien y Chesterton) jamás recibe la luz directa del disco solar, permaneciendo en un régimen de oscuridad absoluta perpetua.",
      "En estas Regiones en Sombra Permanente (PSRs), la ausencia de atmósfera impide la transferencia de calor por convección, manteniendo las temperaturas de equilibrio térmico congeladas de forma estable por debajo de los cien kelvin (ciento setenta y tres grados Celsius bajo cero). Estas cuencas actúan como criotrampas termodinámicas infranqueables donde cualquier molécula volátil queda atrapada indefinidamente.",
      "A lo largo de miles de millones de años, el continuo impacto de cometas helados y asteroides carbonáceos desgasificó enormes cantidades de agua hacia la tenue exosfera mercuriana. Mientras que las moléculas de agua expuestas al Sol fueron rápidamente fotodisociadas por los rayos ultravioleta, aquellas que migraron por saltos balísticos hasta caer en los cráteres oscuros se congelaron instantáneamente sobre el regolito.",
      "En 2012, el Espectrómetro de Neutrones y el Altímetro Láser (MLA) de la sonda MESSENGER confirmaron la presencia de depósitos de hielo de agua casi pura con espesores de varios metros, cubiertos por una delgada capa de material oscuro rico en compuestos orgánicos de carbono refractario entregados por los mismos cometas, sumando reservas estimadas en hasta un billón de toneladas de hielo."
    ],
    "fact": "Debido a una inclinación axial casi perpendicular de apenas 0.03 grados, los cráteres polares profundos de Mercurio albergan zonas de sombra perpetua a menos de cien kelvin donde la sonda MESSENGER confirmó de forma concluyente la existencia de hasta un billón de toneladas de hielo de agua protegidas bajo un manto orgánico oscuro.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los ecos de radar astronómico captados por el radiotelescopio de Arecibo y Goldstone en 1991 exhibieron coeficientes de retrodispersión y polarización circular anómalos (mu_c > 1) característicos del hielo de agua dieléctrico transparente, coincidiendo exactamente con la ubicación de los cráteres polares catalogados por MESSENGER."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El volumen de hielo de agua atrapado en las sombras eternas de Mercurio es tan colosal que superaría todas las reservas de hielo glaciar existentes en los Alpes europeos combinados, ofreciendo un recurso hídrico incalculable para el futuro suministro de misiones de exploración interplanetaria tripulada."
      }
    ]
  },
  {
    "id": "campo-magnetico",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_campo-magnetico.webp",
    "title": "El Campo Magnético",
    "color": "#9D4EDD",
    "btnImage": "/assets/rocosos/infographic_m2/btn_campo-magnetico.jpg",
    "image": "/assets/rocosos/infographic_m2/hero_campo-magnetico.jpg",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_campo-magnetico.webp",
    "diagramCaption": "Geodinamo activa en el núcleo líquido externo y formación de magnetosfera dipolar",
    "content": [
      "Antes de la era de la exploración interplanetaria in situ, los modelos geofísicos clásicos predecían que Mercurio carecía de campo magnético global. La teoría de la geodínamo estipulaba que para generar un escudo dipolar activo un planeta requería un núcleo metálico fluido con vigorosa convección térmica y una rápida rotación sobre su eje; al ser Mercurio un cuerpo pequeño de rotación lenta, se asumía que su interior estaba rígidamente enfriado.",
      "Para asombro de la comunidad científica mundial, en marzo de 1974 la sonda Mariner 10 de la NASA detectó un campo magnético intrínseco activo durante su primer sobrevuelo rasante. Aunque su intensidad ecuatorial en superficie es modesta (aproximadamente trescientos nanoteslas, equivalente al uno punto uno por ciento del campo magnético terrestre), demostró de manera incontrovertible que el corazón de Mercurio alberga una dínamo magnetohidrodinámica activa.",
      "Los instrumentos magnetométricos de la sonda MESSENGER desvelaron una configuración geométrica desconcertante: el eje dipolar magnético está prácticamente alineado con el eje de rotación del planeta (con una inclinación inferior a tres grados), pero se encuentra desplazado hacia el norte geográfico en unos cuatrocientos ochenta y cuatro kilómetros, equivalente al veinte por ciento de todo el radio planetario.",
      "Esta asimetría dipolar norte-sur provoca que las líneas del campo magnético en el hemisferio sur emerjan con una configuración mucho más abierta y vulnerable, permitiendo que el viento solar bombardee la superficie austral con una intensidad significativamente superior a la del polo norte. Esta radiación ionizante erosiona el regolito y arranca iones mediante bombardeo catódico (sputtering), alimentando la exosfera circumplanetaria.",
      "A pesar de su debilidad intrínseca, la magnetosfera de Mercurio forma una cavidad protectora dinámica frente al viento solar. En este entorno se desencadenan violentos eventos de reconexión magnética (eventos de transferencia de flujo o FTEs) a una tasa diez veces más rápida que en la Tierra, canalizando plasma solar directamente hacia la superficie a través de torbellinos magnéticos gigantescos."
    ],
    "fact": "Mercurio y la Tierra son los únicos planetas rocosos del Sistema Solar con campos magnéticos dipolares intrínsecos activos generados por dínamo nuclear; el campo de Mercurio está desplazado 484 kilómetros al norte de su centro geográfico, exponiendo su hemisferio sur al bombardeo directo del viento solar.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La dínamo de Mercurio opera mediante un régimen de flotabilidad inducido por la precipitación de 'nieve de hierro' en el núcleo externo fluido, donde los cristales de hierro sólido precipitan hacia el núcleo interno mientras el líquido residual rico en azufre y silicio asciende convectivamente generando corrientes eléctricas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Debido a la cercanía del Sol, las erupciones solares y las eyecciones de masa coronal comprimen con frecuencia la magnetosfera de Mercurio hasta colapsar su escudo magnético contra el suelo, provocando que las partículas energéticas del plasma solar impacten sin amortiguación sobre la superficie sólida del planeta."
      }
    ]
  },
  {
    "id": "gran-impacto",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_gran-impacto.webp",
    "title": "La Colisión Despojadora",
    "color": "#F15BB5",
    "btnImage": "/assets/rocosos/infographic_m2/btn_gran-impacto.jpg",
    "image": "/assets/rocosos/infographic_m2/hero_gran-impacto.jpg",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_gran-impacto.webp",
    "diagramCaption": "Hipótesis del gran impacto rasante: eyección catastrófica del manto primitivo de silicatos",
    "content": [
      "El enigma fundamental de por qué Mercurio posee un núcleo metálico tan desproporcionadamente masivo en relación con su escaso manto de silicatos ha sido objeto de intensos debates en la cosmogeoquímica planetaria. La explicación más sólida y ampliamente modelada numéricamente es la Teoría del Gran Impacto Despojador (Giant Impact Hypothesis), un evento cataclísmico acontecido durante la fase terminal de acreción planetaria.",
      "Hace aproximadamente cuatro mil cuatrocientos millones de años, el proto-Mercurio era un embrión planetario con una masa equivalente al doble de la actual y una proporción roca-metal similar a la de la Tierra primitiva o Marte. Sin embargo, en medio del caos gravitacional primigenio, un protoplaneta intruso del tamaño aproximado de Marte impactó de forma oblicua y rasante contra Mercurio a una velocidad de colisión de veinte a treinta kilómetros por segundo.",
      "La tremenda energía cinética liberada en la colisión pulverizó e hidrodinámicamente vaporizó la mayor parte del manto exterior silicatado de proto-Mercurio, expulsándolo en forma de un colosal disco circunestelar de escombros de roca fundida. Mientras tanto, el denso núcleo metálico de hierro del proyectil y el de Mercurio se fusionaron casi intactos debido a su inmensa inercia y viscosidad interna, preservando el metal pesado.",
      "La mayor parte de los escombros rocosos silicatados eyectados al espacio interplanetario fueron rápidamente dispersados por la presión de radiación solar y la intensa fuerza gravitatoria del joven Sol, o barrieron órbitas excéntricas hasta perderse en el espacio exterior. Solo una pequeña fracción del material silicatado volvió a caer sobre el núcleo metálico sobreviviente, solidificándose en el delgado manto actual.",
      "No obstante, los datos geoquímicos recopilados por la sonda MESSENGER introdujeron una fascinante complejidad al detectar concentraciones relativamente elevadas de elementos moderadamente volátiles como sodio, potasio y azufre (hasta un cuatro por ciento de azufre en superficie). Esto sugiere que el impacto debió ser un choque rasante de tipo 'golpe y fuga' (hit-and-run) que preservó volátiles o que Mercurio condensó en condiciones de reducción química extrema."
    ],
    "fact": "La Teoría del Gran Impacto postula que un colosal choque rasante hace 4,400 millones de años arrancó la mayor parte del manto rocoso primitivo de Mercurio y dispersó los silicatos al espacio, dejando un núcleo de hierro casi intacto recubierto por una delgada corteza que aún conserva volátiles según MESSENGER.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las simulaciones hidrodinámicas de partículas suavizadas (SPH) desarrolladas por Willy Benz y Erik Asphaug demuestran que un choque de tipo 'hit-and-run' a veinticinco kilómetros por segundo permite despojar el sesenta por ciento del manto sin volatilizar enteramente el inventario de elementos moderadamente volátiles como el potasio."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La colosal Cuenca de Caloris, de mil quinientos cincuenta kilómetros de diámetro, es la mayor cicatriz de impacto de Mercurio; la onda de choque atravesó el planeta entero y focalizó su energía sísmica en las antípodas exactas, creando un caótico laberinto de colinas fracturadas conocido como el 'terreno extraño'."
      }
    ]
  },
  {
    "id": "exploracion-bepicolombo",
    "bannerImage": "/assets/rocosos/infographic_m2/banner_exploracion-bepicolombo.webp",
    "title": "MESSENGER y BepiColombo",
    "color": "#00F5D4",
    "btnImage": "/assets/rocosos/infographic_m2/btn_exploracion-bepicolombo.webp",
    "image": "/assets/rocosos/infographic_m2/hero_exploracion-bepicolombo.webp",
    "diagramImage": "/assets/rocosos/infographic_m2/diagram_exploracion-bepicolombo.webp",
    "diagramCaption": "Misiones orbitales MESSENGER y BepiColombo: asistencias gravitatorias y cartografía global",
    "content": [
      "Enviar una nave espacial a Mercurio constituye una de las mayores hazañas y proezas de la ingeniería astronáutica. Debido a la colosal atracción gravitacional del Sol, cualquier sonda que viaje hacia el interior del Sistema Solar acelera vertiginosamente, requiriendo un cambio acumulado de velocidad (delta-V) mayor incluso que el necesario para enviar una misión interplanetaria hacia Plutón en los confines exteriores.",
      "La era de la exploración in situ fue inaugurada por la misión Mariner 10 de la NASA, que entre 1974 y 1975 realizó tres sobrevuelos rasantes gracias a la asistencia gravitatoria de Venus calculada por el matemático italiano Giuseppe 'Bepi' Colombo, cartografiando por primera vez el cuarenta y cinco por ciento de su superficie craterizada y descubriendo su insospechado campo magnético intrínseco.",
      "Tres décadas después, la NASA lanzó la misión MESSENGER (MErcury Surface, Space ENvironment, GEochemistry, and Ranging). Tras una compleja trayectoria orbital de seis punto seis años que requirió seis asistencias gravitatorias intermedias, MESSENGER se convirtió en marzo de 2011 en la primera nave espacial en entrar en órbita de Mercurio, operando durante cuatro años y cartografiando el cien por ciento del planeta con resolución métrica.",
      "MESSENGER desveló la presencia de hielo polar en sombra permanente, identificó actividad piroclástica volcánica explosiva en la cuenca Caloris, descubrió misteriosas depresiones brillantes sin impacto llamadas 'huecos' (hollows) donde minerales volátiles se sublimaron al espacio, y midió con altimetría láser las escarpas de contracción que testimonian el enfriamiento global.",
      "El relevo científico internacional está liderado por la misión conjunta BepiColombo de la Agencia Espacial Europea (ESA) y la Agencia de Exploración Aeroespacial de Japón (JAXA), lanzada en octubre de 2018. BepiColombo transporta dos orbitadores avanzados complementarios (el MPO europeo para teledetección superficial y el MMO/Mio japonés para magnetosfera) que operarán simultáneamente para desentrañar los enigmas definitivos de este mundo extremo."
    ],
    "fact": "La exploración de Mercurio comprende a la pionera Mariner 10 (1974), a la sonda orbital MESSENGER de la NASA (2011-2015) que cartografió el planeta y confirmó el hielo polar y los enigmáticos hollows, y a la misión BepiColombo de ESA/JAXA provista de dos orbitadores para desvelar su estructura interna y magnetosfera.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para sobrevivir a temperaturas de más de trescientos cincuenta grados Celsius y flujos solares de diez soles combinados, la nave BepiColombo incorpora pantallas térmicas cerámicas de múltiples capas (MLI), células solares con espejos ópticos intercalados al 75% y radiadores térmicos con aletas reflectoras de titanio."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Al agotar todo su combustible de control orbital en abril de 2015 tras completar cuatro mil ciento cuatro órbitas científicas exitosas, la sonda MESSENGER concluyó su histórica misión estrellándose deliberadamente contra la superficie de Mercurio a catorce mil kilómetros por hora, excavando un nuevo cráter de dieciséis metros."
      }
    ]
  }
];

export default function InteractiveInfographic_RocososM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,10,15,0.92) 0%, rgba(30,15,20,0.88) 40%, rgba(15,8,12,0.95) 100%)',
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
      <RockyDustField color1="230, 57, 70" color2="255, 159, 28" />
      <RocososHeader title="MERCURIO: EL HORNO DE HIERRO" subtitle="EL PLANETA MÁS CERCANO AL SOL" primaryColor="#E63946" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #E63946, #FF9F1C)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar los secretos de Mercurio.
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

function RockyDustField({ color1 = '230, 57, 70', color2 = '255, 159, 28' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM2)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM2" x1="0" y1="0" x2="1" y2="0">
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
        background: 'rgba(20, 12, 18, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
