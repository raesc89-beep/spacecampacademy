'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Asteroides M3 themed: Cometas y Hielo Profundo) ──
function DecoCometTail({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M45 15 Q25 25 10 45 Q20 30 45 15 Z" fill={color} opacity="0.4" />
      <path d="M45 15 Q30 35 15 55 Q25 40 45 15 Z" fill={color} opacity="0.2" />
      <circle cx="45" cy="15" r="6" fill={color} opacity="0.9" />
      <line x1="45" y1="15" x2="5" y2="35" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function DecoOortCloud({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 22 * Math.cos(rad)} cy={30 + 22 * Math.sin(rad)} r="1.5" fill={color} opacity="0.8" />;
      })}
    </svg>
  );
}

function DecoSublimation({ size = 70, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="18" y="28" width="24" height="24" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <path d="M22 24 C22 18 26 18 26 12 M30 24 C30 18 34 18 34 12 M38 24 C38 18 42 18 42 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

function DecoSolarWind({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 15 C20 15 30 25 55 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M5 30 C25 30 35 35 55 35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M5 45 C15 45 30 40 55 45" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="50" cy="25" r="3" fill={color} />
    </svg>
  );
}

function DecoSubSurfaceIce({ size = 70, color = '#81D4FA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M12 25 Q30 35 48 25" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <polygon points="30,16 35,26 25,26" fill={color} opacity="0.7" />
      <polygon points="30,44 35,34 25,34" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoNucleus67P({ size = 70, color = '#FF8A65', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="22" cy="32" r="14" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="38" cy="24" r="10" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      <path d="M28 24 Q32 28 32 34" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
    </svg>
  );
}

const DECO_MAP = {
  'anatomia-cometa': [DecoCometTail, DecoSublimation, DecoSolarWind],
  'origen-nube-oort': [DecoOortCloud, DecoCometTail, DecoSubSurfaceIce],
  'sublimacion-hielo': [DecoSublimation, DecoSubSurfaceIce, DecoSolarWind],
  'viento-solar-colas': [DecoSolarWind, DecoCometTail, DecoNucleus67P],
  'cometas-agua-tierra': [DecoSubSurfaceIce, DecoOortCloud, DecoSublimation],
  'misiones-cometarias': [DecoNucleus67P, DecoCometTail, DecoSublimation],
  'destino-cometas': [DecoCometTail, DecoOortCloud, DecoSolarWind],
};

const BIBLIOGRAPHY = [
  'Whipple, F. L. (1950). "A comet model. I. The acceleration of Comet Encke", The Astrophysical Journal, 111, 375-394.',
  'Oort, J. H. (1950). "The structure of the cloud of comets surrounding the Solar System", Bulletin of the Astronomical Institutes of the Netherlands, 11, 91-110.',
  'Altwegg, K. et al. (2015). "67P/Churyumov-Gerasimenko, a Jupiter-family comet with a high D/H ratio", Science, 347(6220), 1261952.',
  'Festou, M. C. et al. (2004). "Comets II", University of Arizona Press.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "anatomia-cometa",
    "title": "Anatomía de un Cometa",
    "color": "#4FA3B5",
    "btnImage": "/assets/asteroides/infographic_m3/btn_anatomia-cometa.webp",
    "image": "/assets/asteroides/infographic_m3/hero_anatomia-cometa.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_anatomia-cometa.webp',
    bannerCaption: 'Estructura física: núcleo de hielo sucio, coma activa y envoltura de hidrógeno',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_anatomia-cometa.webp',
    diagramCaption: 'Anatomía de un cometa: núcleo de hielo poroso, respiraderos activos y coma de gas en expansión',
    "content": [
      "Los cometas son algunos de los cuerpos celestes más espectaculares y primitivos del Sistema Solar. En el año 1950, el astrónomo estadounidense Fred Whipple formuló el célebre modelo de la 'bola de nieve sucia', describiendo el núcleo cometario como un conglomerado poroso de hielos volátiles (principalmente agua, monóxido de carbono, dióxido de carbono y metano) íntimamente mezclados con polvo de silicatos, sulfuros y compuestos orgánicos refractarios de carbono complejo.",
      "El núcleo sólido es un objeto relativamente pequeño, con diámetros típicos que varían entre uno y cincuenta kilómetros. A pesar de contener enormes cantidades de hielo puro en su interior, la superficie exterior de un cometa es sorprendentemente negra y oscura, con un albedo reflectivo de apenas un dos a cuatro por ciento. Esta corteza externa está formada por una costra desvolatilizada de alquitranes de carbono y polvo que aísla térmicamente el interior helado del calor del espacio.",
      "Cuando el cometa en su órbita elíptica se aproxima al Sol y cruza la órbita de Marte (alrededor de tres Unidades Astronómicas de distancia heliocéntrica), la radiación solar calienta la corteza. Los hielos subsuperficiales comienzan a sublimarse a través de grietas y fracturas, expandiéndose violentamente hacia el vacío para formar una inmensa envoltura esférica y difusa de gas y polvo que los astrónomos denominan la 'coma' o cabellera cometaria.",
      "La coma puede alcanzar dimensiones astronómicas verdaderamente monumentales, llegando a medir cientos de miles de kilómetros de diámetro, superando con holgura el tamaño del planeta Júpiter. Rodeando a la coma visible, existe una gigantesca envoltura invisible de átomos de hidrógeno neutro producida por la disociación ultravioleta de las moléculas de vapor de agua, la cual puede extenderse a lo largo de varios millones de kilómetros en el espacio interplanetario.",
      "La gravedad del diminuto núcleo sólido es sumamente débil, apenas una diezmilésima parte de la gravedad de la Tierra. Debido a este débil pozo gravitacional, el cometa es incapaz de retener su atmósfera temporalmente generada, permitiendo que el viento solar y la presión de radiación solar barran continuamente el gas y el polvo de la coma hacia el espacio exterior, moldeando las colas luminosas que se extienden a lo largo de cientos de millones de kilómetros."
    ],
    "fact": "El núcleo de un cometa es un fósil helado ultranegro y poroso que refleja menos luz que el carbón vegetal terrestre; al aproximarse al Sol a menos de tres Unidades Astronómicas, sus hielos subsuperficiales subliman violentamente formando una coma brillante que puede superar en diámetro al gigantesco planeta Júpiter.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La densidad media medida por la sonda Rosetta en el núcleo del cometa 67P es de tan solo 0.533 gramos por centímetro cúbico, lo que confirma de manera irrefutable que se trata de un cuerpo extraordinariamente poroso con una fracción de huecos y cavidades internas superior al setenta y cinco por ciento de su volumen total."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los instrumentos espectrométricos de la sonda europea Giotto detectaron en 1986 que el núcleo del legendario cometa 1P/Halley eyectaba más de treinta toneladas métricas de vapor de agua por segundo durante su aproximación al perihelio, formando géiseres de gas y polvo que desestabilizaban de forma continua su rotación."
      }
    ]
  },
  {
    "id": "origen-nube-oort",
    "title": "La Nube de Oort y el Cinturón de Kuiper",
    "color": "#80DEEA",
    "btnImage": "/assets/asteroides/infographic_m3/btn_origen-nube-oort.webp",
    "image": "/assets/asteroides/infographic_m3/hero_origen-nube-oort.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_origen-nube-oort.webp',
    bannerCaption: 'Depósitos cometarios distantes: Cinturón de Kuiper y Nube de Oort exterior',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_origen-nube-oort.webp',
    diagramCaption: 'Escala de los reservorios cometarios: el Cinturón de Kuiper toroidal y la Nube de Oort esférica',
    "content": [
      "Los cometas que visitan el Sistema Solar interior provienen de dos inmensos reservorios helados situados en los confines más remotos de nuestro sistema planetario: el Cinturón de Kuiper y la hipotética pero matemáticamente fundamentada Nube de Oort. La distinción entre ambas regiones define la periodicidad, las inclinaciones orbitales y la procedencia dinámica de cada objeto que surca el firmamento.",
      "El Cinturón de Kuiper es una estructura toroidal aplanada en el plano de la eclíptica que se extiende entre treinta y cincuenta y cinco Unidades Astronómicas del Sol, inmediatamente más allá de la órbita de Neptuno. Es el hogar de los cometas de periodo corto (que tardan menos de doscientos años en completar una órbita heliocéntrica), como el célebre cometa Halley. Estos mundos helados conservan órbitas con inclinaciones bajas similares a las de los planetas mayores.",
      "En marcado contraste, los cometas de periodo largo (cuyas órbitas elípticas u oscilantes abarcan miles o incluso millones de años) proceden de la Nube de Oort, una colosal envoltura esférica postulada por el astrónomo holandés Jan Oort en el año 1950. Esta estructura envuelve por completo al Sistema Solar y se extiende desde unas dos mil Unidades Astronómicas hasta más de cien mil UA, rozando la mitad de la distancia hacia la estrella más cercana, Próxima Centauri.",
      "La Nube de Oort se originó durante la infancia violenta del Sistema Solar, cuando las intensas interacciones gravitacionales con los recién formados planetas gigantes gaseosos (Júpiter, Saturno, Urano y Neptuno) dispersaron miles de millones de planetesimales helados hacia órbitas sumamente lejanas. Una vez allí, las fuerzas de marea de la Vía Láctea y los tirones gravitatorios de estrellas cercanas circularizaron e isotropizaron sus órbitas en una esfera perfecta.",
      "De manera ocasional, el paso cercano de una estrella errante, una nube molecular gigante o las fluctuaciones de las mareas galácticas perturban gravitatoriamente el delicado equilibrio de la Nube de Oort. Estas sutiles perturbaciones empujan a billones de cometas durmientes hacia el pozo de gravedad del Sol, iniciando una lenta caída balística que tardará millones de años en conducirlos hacia el Sistema Solar interior."
    ],
    "fact": "La Nube de Oort es una gigantesca e invisible burbuja esférica que envuelve por completo al Sistema Solar y alberga billones de cometas primordiales congelados, extendiéndose hasta cien mil Unidades Astronómicas de distancia heliocéntrica, casi a mitad de camino hacia el sistema estelar vecino de Próxima Centauri.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La masa total combinada de la Nube de Oort se estima en aproximadamente cinco a treinta masas terrestres completas de hielos volátiles primordiales, albergando en su seno más de un billón de cuerpos cometarios con diámetros superiores a un kilómetro esperando perturbaciones estelares de marea para precipitar al interior."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El cometa C/2013 A1 (Siding Spring), procedente directamente de la Nube de Oort, realizó en octubre de 2014 un vuelo rasante histórico a solo 139,500 kilómetros del planeta Marte (un tercio de la distancia Tierra-Luna), inundando la atmósfera marciana con toneladas de iones de magnesio y hierro cometarios."
      }
    ]
  },
  {
    "id": "sublimacion-hielo",
    "title": "El Proceso de Sublimación",
    "color": "#E57373",
    "btnImage": "/assets/asteroides/infographic_m3/btn_sublimacion-hielo.webp",
    "image": "/assets/asteroides/infographic_m3/hero_sublimacion-hielo.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_sublimacion-hielo.webp',
    bannerCaption: 'Desgasificación térmica y eyección de compuestos volátiles al perihelio',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_sublimacion-hielo.webp',
    diagramCaption: 'Termodinámica de sublimación en el perihelio: desgasificación de volátiles y chorros supersónicos',
    "content": [
      "En las condiciones de vacío absoluto del espacio interplanetario, el agua líquida no puede existir de forma termodinámicamente estable sobre la superficie de un cuerpo celeste debido a que la presión ambiental es nula, muy por debajo del punto triple del agua (seis punto once milibares). Por lo tanto, cuando un cometa se calienta por la radiación solar, experimenta el fenómeno físico de la sublimación: el paso directo de hielo sólido a vapor gaseoso.",
      "La tasa de sublimación de los diferentes hielos varía en función de su temperatura de equilibrio volátil. Los hielos súper volátiles como el nitrógeno molecular, el monóxido de carbono y el metano comienzan a sublimarse a temperaturas sumamente bajas (menos de setenta Kelvin), liberando tenues penachos de gas a distancias heliocéntricas superiores a cinco UA, mucho antes de que el hielo de agua convencional despierte.",
      "Cuando el cometa penetra la línea de sublimación del agua alrededor de dos punto ocho a tres UA del Sol, la energía térmica recibida por metro cuadrado es suficiente para fundir los enlaces intermoleculares de los cristales de hielo de agua. La presión de vapor acumulada bajo la corteza orgánica deshidratada genera microestallidos y fracturas mecánicas, eyectando potentes chorros o géiseres colimados de gas y partículas de polvo mineral hacia el espacio.",
      "Estos chorros de sublimación actúan físicamente como diminutos motores cohete naturales no controlados adosados al núcleo. Al expulsar gas a velocidades de varios cientos de metros por segundo, ejercen fuerzas no gravitacionales que modifican continuamente el periodo de rotación, la orientación del eje de giro e incluso el semieje mayor de la elipse orbital del cometa, un factor crítico que los astrónomos deben modelar para predecir efemérides exactas.",
      "Durante cada paso por el perihelio, un cometa típico pierde decenas de millones de toneladas de materia volátil y polvo. A medida que los hielos superficiales se agotan, la capa residual de polvo refractario se engrosa, reduciendo gradualmente la eficiencia de la sublimación térmica y preparando al cuerpo para su eventual letargo como un cometa inactivo o remanente rocoso."
    ],
    "fact": "En el vacío del espacio interplanetario el hielo nunca se funde en agua líquida sino que se sublima directamente en vapor gaseoso; estos potentes chorros de gas a presión actúan mecánicamente como motores de cohete naturales no tripulados que desvían de forma continua la trayectoria y rotación orbital del cometa.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad de expansión del vapor de agua sublimado en la coma cometaria es de aproximadamente 0.6 a 0.8 kilómetros por segundo a una Unidad Astronómica del Sol, empujando y arrastrando partículas minerales de silicatos de hasta varios centímetros de diámetro hacia el vacío circundante mediante arrastre viscoso."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La cámara de alta resolución OSIRIS de la sonda Rosetta fotografió cientos de derrumbes de acantilados en el cometa 67P provocados por la sobrepresión de gases sublimados bajo la superficie rocosa, demostrando que los cometas cambian de topografía activa en cada perihelio remodelando sus escarpadas paredes."
      }
    ]
  },
  {
    "id": "viento-solar-colas",
    "title": "El Viento Solar y las Colas",
    "color": "#FFD54F",
    "btnImage": "/assets/asteroides/infographic_m3/btn_viento-solar-colas.webp",
    "image": "/assets/asteroides/infographic_m3/hero_viento-solar-colas.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_viento-solar-colas.webp',
    bannerCaption: 'Doble cola cometaria: plasma ionizado azul y polvo curvado reflejante',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_viento-solar-colas.webp',
    diagramCaption: 'Dinámica de la doble cola: cola de iones recta por viento solar y cola de polvo curvada por radiación',
    "content": [
      "Uno de los rasgos más distintivos y emblemáticos de un cometa activo es el desarrollo de sus dos colas claramente diferenciadas: la cola de gas ionizado (o cola de plasma) y la cola de polvo. Aunque a simple vista ambas parecen extenderse juntas detrás del núcleo, están gobernadas por fuerzas físicas completamente independientes y presentan morfologías, composiciones y colores marcadamente distintos.",
      "La cola de polvo está formada por los diminutos granos microscópicos de silicatos y carbono arrastrados por los chorros de gas de la coma. Sobre estas partículas de polvo actúa la presión de radiación solar, es decir, el empuje mecánico ejercido por los fotones de luz solar al rebotar y ser absorbidos por el grano. Como el polvo viaja a velocidades orbitales, la cola de polvo adopta una forma curvada y ancha, brillando con un color blanquecino o amarillento al reflejar la luz solar directa.",
      "En contraste, la cola de gas ionizado o cola de plasma está constituida por moléculas gaseosas (tales como monóxido de carbono ionizado CO+, vapor de agua H2O+ y cianógeno CN) que han sido ionizadas por los fotones ultravioleta del Sol. Estos iones cargados eléctricamente quedan atrapados en las líneas del campo magnético interplanetario transportado por el viento solar, una corriente constante de protones y electrones que fluye desde la corona solar a velocidades de cuatrocientos a ochocientos kilómetros por segundo.",
      "Debido a la formidable velocidad del viento solar, la cola de iones es barrida casi instantáneamente en línea recta diametralmente opuesta al Sol, sin importar en qué dirección se esté desplazando el cometa en su órbita. Por esta razón, cuando un cometa se aleja del perihelio hacia el Sistema Solar exterior, viaja con sus colas apuntando por delante de él en su trayectoria, siendo empujado desde atrás por el flujo solar.",
      "La cola de iones brilla con una característica luz azulada debida a la emisión por fluorescencia del catión monóxido de carbono (CO+). Cuando el cometa cruza una región donde el campo magnético del viento solar invierte su polaridad (la llamada lámina de corriente heliosférica), la cola de iones puede sufrir un espectacular fenómeno de reconexión magnética conocido como 'evento de desconexión', desprendiéndose por completo y regenerándose en pocas horas."
    ],
    "fact": "Un cometa desarrolla siempre dos colas distintas: una cola de polvo amarillenta curvada empujada por la presión de radiación de la luz solar, y una cola recta de gas ionizado de color azul resplandeciente empujada por el viento solar a 800 km/s, la cual apunta invariablemente en dirección diametralmente opuesta al Sol.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La existencia del viento solar interplanetario fue deducida teóricamente en 1951 por el astrofísico alemán Ludwig Biermann precisamente al observar que las colas de iones de los cometas apuntaban siempre en dirección exactamente opuesta al Sol a velocidades hipersónicas incompatibles con la simple presión fotónica."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La cola del Gran Cometa de 1843 alcanzó una longitud récord medida de más de trescientos treinta millones de kilómetros en el espacio, superando holgadamente la distancia completa que separa a la Tierra del Sol (que es de ciento cincuenta millones de kilómetros) y desplegando un abanico fosforescente en el cielo nocturno."
      }
    ]
  },
  {
    "id": "cometas-agua-tierra",
    "title": "¿Trajeron los Cometas el Agua?",
    "color": "#BA68C8",
    "btnImage": "/assets/asteroides/infographic_m3/btn_cometas-agua-tierra.webp",
    "image": "/assets/asteroides/infographic_m3/hero_cometas-agua-tierra.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_cometas-agua-tierra.webp',
    bannerCaption: 'Entrega de agua e hidrocarburos volátiles a la Tierra primigenia',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_cometas-agua-tierra.webp',
    diagramCaption: 'Comparativa isotópica D/H: firmas moleculares de cometas y origen del agua terrestre',
    "content": [
      "Uno de los misterios más profundos y debatidos de las ciencias de la Tierra y la astrobiología es el origen de los vastos océanos que cubren el setenta y un por ciento de nuestro planeta. Dado que la Tierra se formó en la región interna y cálida del disco protoplanetario (muy dentro de la línea de congelamiento), las altas temperaturas debieron evaporar la mayor parte del agua original, lo que sugiere que los océanos fueron entregados posteriormente por impactos cósmicos.",
      "Durante décadas, la hipótesis dominante sostuvo que los cometas, al ser ricos en agua congelada (hasta un cincuenta por ciento de su masa total), bombardearon la Tierra durante el Bombardeo Intenso Tardío hace tres mil novecientos millones de años, llenando las cuencas oceánicas y aportando moléculas orgánicas precursoras para la abiogénesis y el surgimiento de la vida celular.",
      "Para someter a prueba rigurosa esta teoría, los cosmoquímicos analizan la 'firma isotópica' del agua, específicamente la relación entre el deuterio (un isótopo pesado del hidrógeno que posee un protón y un neutrón en su núcleo) y el hidrógeno ordinario (relación D/H). El agua de los océanos terrestres posee una relación D/H muy bien calibrada conocida como VSMOW (Vienna Standard Mean Ocean Water), fijada en ciento cincuenta y seis partes por millón.",
      "Sin embargo, las mediciones espectrométricas in situ realizadas por la sonda espacial europea Rosetta en el cometa 67P/Churyumov-Gerasimenko en 2014 revolucionaron este paradigma científico: la relación D/H del agua cometaria de 67P resultó ser más de tres veces superior a la de los océanos de la Tierra, descartando que cometas de la familia de Júpiter fueran la fuente principal del agua terrestre.",
      "En la actualidad, el consenso geoquímico dominante se inclina hacia los asteroides carbonáceos del Cinturón Principal exterior como los verdaderos abastecedores de agua de nuestro planeta. Las muestras recuperadas por las misiones Hayabusa2 (de Ryugu) y OSIRIS-REx (de Bennu) revelan relaciones isotópicas D/H y de cromo que coinciden de forma asombrosamente precisa con la composición exacta de los océanos terrestres."
    ],
    "fact": "El espectrómetro ROSINA de la sonda espacial europea Rosetta demostró de forma concluyente en 2014 que el agua del cometa 67P tiene una huella isotópica de deuterio tres veces superior a la de los océanos terrestres, revelando que el agua de nuestros mares fue suministrada primordialmente por asteroides carbonáceos primitivos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El espectrómetro de masas ROSINA a bordo de Rosetta midió una relación D/H de (5.3 ± 0.7) x 10^-4 en el vapor de agua del cometa 67P, uno de los valores más elevados jamás registrados en el Sistema Solar, lo que demuestra un enriquecimiento químico en frío en la nebulosa presolar antes de la acreción cometaria."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Aunque los cometas no hayan aportado la mayoría del agua, la sonda Rosetta descubrió en la coma de 67P glicina (un aminoácido fundamental para las proteínas celulares) y fósforo, confirmando que los cometas sembraron la Tierra primordial de los bloques químicos orgánicos esenciales para el origen de la vida biológica."
      }
    ]
  },
  {
    "id": "misiones-cometarias",
    "title": "Misiones Históricas: De Giotto a Rosetta",
    "color": "#FFB74D",
    "btnImage": "/assets/asteroides/infographic_m3/btn_misiones-cometarias.webp",
    "image": "/assets/asteroides/infographic_m3/hero_misiones-cometarias.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_misiones-cometarias.webp',
    bannerCaption: 'Exploración in situ: Giotto, Stardust, Deep Impact y Rosetta',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_misiones-cometarias.webp',
    diagramCaption: 'Trayectoria operativa de Rosetta: inserción orbital y descenso de Philae en el cometa 67P',
    "content": [
      "La exploración espacial de los cometas representa una de las mayores hazañas tecnológicas de la ingeniería interplanetaria, ya que interceptar un proyectil que se desplaza a decenas de kilómetros por segundo rodeado de una atmósfera cegadora de gas abrasador y polvo afilado desafía los límites de los sistemas de navegación autónoma y blindaje de naves.",
      "La era de la exploración in situ comenzó formalmente en marzo de 1986 con la célebre 'Armada a Halley', una flota coordinada de sondas internacionales enviadas por Europa, la Unión Soviética y Japón para estudiar al cometa 1P/Halley. La sonda Giotto de la Agencia Espacial Europea (ESA) realizó una audaz aproximación a tan solo quinientos noventa y seis kilómetros del núcleo activo, capturando las primeras imágenes cercanas de la historia que confirmaron el modelo de Whipple.",
      "En el siglo XXI, las misiones adquirieron una ambición sin precedentes. En 2004, la sonda Stardust de la NASA atravesó la coma del cometa 81P/Wild 2 a seis kilómetros por segundo utilizando bloques de aerogel de silicio (el sólido menos denso del mundo) para capturar granos de polvo cósmico intactos sin fundirlos, devolviendo exitosamente las muestras a la Tierra en paracaídas en 2006.",
      "Al año siguiente, en julio de 2005, la misión Deep Impact de la NASA disparó un proyectil de cobre puro de trescientos setenta kilogramos contra el núcleo del cometa 9P/Tempel 1 a diez kilómetros por segundo. La colisión hiperveloz excavó un cráter de impacto artificial y eyectó miles de toneladas de material prístino del interior subsuperficial, permitiendo analizar por primera vez la química de las capas interiores protegidas de la radiación.",
      "La cumbre de la exploración cometaria se alcanzó entre 2014 y 2016 con la monumental misión Rosetta de la ESA. Rosetta no se limitó a un sobrevuelo fugaz: orbitó al cometa 67P durante más de dos años acompañándolo en su viaje a través del perihelio, y el 12 de noviembre de 2014 liberó al módulo Philae, logrando el primer aterrizaje suave de la historia de la humanidad sobre la superficie rocosa de un cometa."
    ],
    "fact": "La histórica misión Rosetta de la Agencia Espacial Europea orbitó durante más de dos años al cometa 67P/Churyumov-Gerasimenko y logró el 12 de noviembre de 2014 el primer aterrizaje suave de la humanidad sobre un cometa con el módulo robótico Philae, transmitiendo fotografías e información química sin precedentes desde su superficie.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El módulo de aterrizaje Philae rebotó dos veces sobre la superficie de 67P debido a que los arpones de sujeción pirotécnicos no dispararon en la microgravedad, elevándose a un kilómetro de altura durante casi dos horas antes de descansar bajo una sombra rocosa en la escarpada región denominada Abydos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La monumental misión Rosetta concluyó formalmente el 30 de septiembre de 2016 con un impacto controlado deliberado contra la región Ma'at del cometa 67P, transmitiendo datos científicos de altísima resolución, temperaturas superficiales y primeros planos de pozos activos hasta el último segundo de contacto mecánico con el suelo del núcleo."
      }
    ]
  },
  {
    "id": "destino-cometas",
    "title": "El Destino Final de los Cometas",
    "color": "#00E4FF",
    "btnImage": "/assets/asteroides/infographic_m3/btn_destino-cometas.webp",
    "image": "/assets/asteroides/infographic_m3/hero_destino-cometas.webp",
    bannerImage: '/assets/asteroides/infographic_m3/banner_destino-cometas.webp',
    bannerCaption: 'Ciclos orbitales: sublimación completa, colisión planetaria o eyección solar',
    diagramImage: '/assets/asteroides/infographic_m3/diagram_destino-cometas.webp',
    diagramCaption: 'Destinos evolutivos de los cometas: desgasificación total, eyección hiperbólica o colisión solar',
    "content": [
      "La vida activa de un cometa en el Sistema Solar interior es un episodio geológicamente efímero que no puede prolongarse indefinidamente. En cada aproximación al perihelio, la intensa radiación solar y la pérdida de masa volátil erosionan físicamente el núcleo rocoso-helado, empujándolo inexorablemente hacia uno de varios desenlaces catastróficos o degenerativos definitivos.",
      "El primer destino es la extinción o agotamiento volátil. Con el paso de cientos o miles de órbitas, los hielos accesibles en las capas superiores se subliman por completo, dejando tras de sí una corteza gruesa y continua de escombros de silicatos y alquitranes orgánicos pesados que sella herméticamente cualquier hielo interior residual. El cuerpo cesa de emitir una coma y se convierte en un 'cometa extinto' o 'asteroide durmiente', indistinguible de un asteroide común de Tipo C o D.",
      "El segundo destino es la fragmentación catastrófica por fuerzas de marea gravitacional. Cuando un cometa de baja resistencia estructural interna pasa excesivamente cerca de un planeta masivo como Júpiter o del propio Sol, cruzando el denominado límite de Roche, las fuerzas de marea diferencial desgarran la frágil estructura porosa del cometa en una procesión de fragmentos individuales alineados.",
      "El ejemplo histórico más emblemático ocurrió en julio de 1994 con el cometa Shoemaker-Levy 9, el cual fue desintegrado por la gravedad de Júpiter en una veintena de fragmentos en hilera que impactaron consecutivamente contra la atmósfera del gigante gaseoso a sesenta kilómetros por segundo. Los impactos generaron gigantescas bolas de fuego de miles de kilómetros y dejaron cicatrices oscuras en las nubes de Júpiter más grandes que el diámetro completo del planeta Tierra.",
      "Finalmente, muchos cometas sufren un destino fatal al precipitarse directamente contra la fotosfera del Sol. Estos cuerpos se conocen astronómicamente como cometas rasantes o 'sungrazers', destacando la familia Kreutz de cometas rasantes. El observatorio espacial solar SOHO de la NASA y la ESA ha descubierto más de cuatro mil quinientos de estos pequeños cometas kamikazes evaporándose por completo en el abrasador horno de la corona solar."
    ],
    "fact": "Todos los cometas enfrentan destinos finales irreversibles: agotar gradualmente sus volátiles hasta transformarse en asteroides durmientes petrificados, desintegrarse catastróficamente por mareas gravitacionales como el cometa Shoemaker-Levy 9 en Júpiter en 1994, o vaporizarse en la fotosfera del Sol como cometas rasantes suicidas.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El impacto del fragmento G de Shoemaker-Levy 9 en Júpiter el 18 de julio de 1994 liberó una energía explosiva estimada en seis millones de megatones de TNT (seiscientas veces todo el arsenal nuclear de la Tierra), elevando una pluma de plasma incandescente a más de tres mil kilómetros sobre las nubes jovianas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El telescopio espacial solar SOHO, diseñado originalmente para estudiar el interior del Sol, se ha convertido accidentalmente en el mayor cazador de cometas de la historia humana, descubriendo más de 5,000 cometas rasantes suicidas en sus casi treinta años ininterrumpidos de operación orbital continua."
      }
    ]
  }
];

export default function InteractiveInfographic_AsteroidesM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,20,35,0.92) 0%, rgba(12,15,32,0.88) 50%, rgba(10,12,30,0.95) 100%)',
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
      <AsteroidesM3Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00E5FF, #B388FF)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los módulos superiores para explorar los secretos helados de los cometas y el espacio profundo.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(0,229,255,0.4)' }}>
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
      hue: Math.random() > 0.5 ? '0, 229, 255' : '179, 136, 255',
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

function AsteroidesM3Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM3)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#00E5FF','#B388FF','#80DEEA','#FFD54F','#81D4FA','#FF8A65','#00E5FF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#00E5FF" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COMETAS Y HIELO PROFUNDO</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(0,229,255,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA NUBE DE OORT Y LAS COLAS HELADAS</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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
          layoutId="activeDotAsteroidesM3"
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
