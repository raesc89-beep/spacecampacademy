'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Asteroides M1 themed) ───────────────────────────
function DecoAsteroidCore({ size = 70, color = '#FF6B6B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M25 8 L42 12 L52 28 L46 48 L26 54 L10 40 L12 20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" fill={color} opacity="0.4" />
      <circle cx="38" cy="36" r="5" fill={color} opacity="0.5" />
      <circle cx="22" cy="42" r="3" fill={color} opacity="0.3" />
      <path d="M25 8 L42 12 L52 28 L46 48 L26 54 L10 40 L12 20 Z" fill={color} opacity="0.15" />
    </svg>
  );
}

function DecoProtoplanet({ size = 70, color = '#4D96FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="26" ry="8" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.3" />
      <circle cx="20" cy="26" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoJupiterGrav({ size = 70, color = '#FFD93D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="2" />
      <path d="M10 24 Q30 20 50 24" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M8 32 Q30 36 52 32" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <circle cx="38" cy="34" r="4" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoKirkwoodGap({ size = 70, color = '#6BCB77', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M15 15 L45 45 M45 15 L15 45" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCollision({ size = 70, color = '#9B51E0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M30 10 L34 24 L48 26 L36 34 L40 48 L30 38 L20 48 L24 34 L12 26 L26 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.8" />
      <line x1="10" y1="10" x2="22" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="10" x2="38" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoYarkovsky({ size = 70, color = '#FF884B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="26" cy="30" r="14" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <path d="M40 18 C48 24 48 36 40 42" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M44 12 C54 22 54 38 44 48" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
      <line x1="10" y1="30" x2="20" y2="30" stroke={color} strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'que-es-asteroide': [DecoAsteroidCore, DecoProtoplanet, DecoCollision],
  'origen-cinturon': [DecoProtoplanet, DecoJupiterGrav, DecoAsteroidCore],
  'efecto-jupiter': [DecoJupiterGrav, DecoKirkwoodGap, DecoCollision],
  'resonancias-kirkwood': [DecoKirkwoodGap, DecoAsteroidCore, DecoYarkovsky],
  'tipos-espectrales': [DecoAsteroidCore, DecoCollision, DecoProtoplanet],
  'colisiones-familias': [DecoCollision, DecoJupiterGrav, DecoYarkovsky],
  'futuro-cinturon': [DecoYarkovsky, DecoKirkwoodGap, DecoAsteroidCore],
};

const BIBLIOGRAPHY = [
  'Gradie, J. & Tedesco, E. (1982). "Compositional structure of the asteroid belt", Science, 216(4553), 1405-1407.',
  'Morbidelli, A. et al. (2005). "Chaotic capture of Trojan asteroids in the Early Solar System", Nature, 437, 495-497.',
  'DeMeo, F. E. & Carry, B. (2014). "Solar System evolution from compositional mapping of the asteroid belt", Nature, 505, 329-334.',
  'Bottke, W. F. et al. (2006). "The Collisional Evolution of Small Solar System Bodies", Asteroids III, University of Arizona Press.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "que-es-asteroide",
    "title": "¿Qué es un Asteroide?",
    "color": "#FF6B6B",
    "btnImage": "/assets/asteroides/infographic_m1/btn_que-es-asteroide.webp",
    "image": "/assets/asteroides/infographic_m1/hero_que-es-asteroide.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_que-es-asteroide.webp',
    bannerCaption: 'Panorama del Cinturón Principal entre las órbitas de Marte y Júpiter',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_que-es-asteroide.webp',
    diagramCaption: 'Estructura interna diferenciada de Ceres: núcleo rocoso, manto de hielo de agua y corteza mineral',
    "video": {
      "src": "https://drive.usercontent.google.com/download?id=1CxnhsejhTecAqbY0ltW5juW8-w3l61Ur&export=download&authuser=0",
      "title": "Introducción: Asteroides y Cometas"
    },
    "content": [
      "De acuerdo con la definición oficial de la Unión Astronómica Internacional (IAU), los asteroides son cuerpos menores del Sistema Solar compuestos predominantemente de roca y metal que orbitan alrededor del Sol. A diferencia de los cometas, no poseen una cabellera gaseosa apreciable ni una cola luminosa al aproximarse al perihelio. Se formaron hace cuatro mil seiscientos millones de años durante las fases tempranas de la nebulosa protoplanetaria, constituyendo restos fósiles de los primeros bloques de construcción mineral.",
      "La mayoría de los asteroides conocidos se encuentran confinados en el denominado Cinturón Principal, una extensa región toroidal comprendida entre las órbitas de Marte y Júpiter, aproximadamente entre dos punto una y tres punto tres Unidades Astronómicas de distancia del Sol. Aunque las obras de ciencia ficción suelen retratar campos densos de rocas flotantes donde las colisiones son continuas, la distancia media real entre dos cuerpos asteroidales de gran tamaño supera habitualmente el millón de kilómetros de espacio vacío.",
      "La distribución de masa entre los asteroides es extremadamente asimétrica. El planeta enano Ceres, que posee un diámetro ecuatorial aproximado de novecientos cuarenta kilómetros, concentra por sí solo más del treinta por ciento de toda la masa del Cinturón Principal. Otros cuerpos masivos como Vesta, Pallas e Higía completan más del cincuenta por ciento de la masa total, mientras que los millones de fragmentos restantes consisten en pequeños bloques rocosos, escombros porosos y partículas de polvo interplanetario.",
      "A pesar de su abundancia numérica en los catálogos astronómicos, la masa combinada de todos los asteroides del Cinturón Principal equivale a solo un cuatro por ciento de la masa de la Luna terrestre, o aproximadamente un milésimo de la masa total de la Tierra. Esta escasez de materia es la prueba directa de que las perturbaciones gravitacionales ejercidas por el gigante gaseoso Júpiter impidieron que estos fragmentos primordiales se unieran mediante acreción suave para constituir un quinto planeta rocoso.",
      "El estudio de los asteroides es crucial para las ciencias planetarias porque conservan las firmas químicas, isotópicas y mineralógicas de la nube molecular precursora del Sol sin haber sufrido el metamorfismo, vulcanismo o tectónica de placas que borraron el registro geológico primigenio de mundos como la Tierra o Venus. Al analizarlos con telescopios terrestres y naves interplanetarias, los astrónomos descifran las condiciones termodinámicas originales del Sistema Solar."
    ],
    "fact": "Ceres fue el primer asteroide descubierto en la historia de la astronomía moderna, avistado en la noche del 1 de enero de 1801 por el monje y matemático Giuseppe Piazzi desde el Observatorio de Palermo; en 2006 la Unión Astronómica Internacional lo reclasificó formalmente como planeta enano debido a su esfericidad en equilibrio hidrostático y su diferenciación geológica interna.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La masa estimada del Cinturón Principal de Asteroides es de aproximadamente 2.4 x 10^21 kilogramos, lo que representa una densidad de materia espacial sumamente dispersa donde las naves robóticas interplanetarias como Voyager, Pioneer o New Horizons atravesaron el cinturón sin requerir desvíos de trayectoria para evitar choques fortuitos."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante más de medio siglo posterior a su descubrimiento en 1801, Ceres, Pallas, Juno y Vesta figuraron catalogados formalmente como planetas de pleno derecho en los libros de texto de astronomía, hasta que la avalancha de descubrimientos de rocas similares llevó a los científicos a acuñar el término asteroide para agruparlos."
      }
    ]
  },
  {
    "id": "origen-cinturon",
    "title": "Nacimiento del Cinturón",
    "color": "#4D96FF",
    "btnImage": "/assets/asteroides/infographic_m1/btn_origen-cinturon.webp",
    "image": "/assets/asteroides/infographic_m1/hero_origen-cinturon.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_origen-cinturon.webp',
    bannerCaption: 'Acreción planetesimal y perturbaciones orbitales en el Sistema Solar primitivo',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_origen-cinturon.webp',
    diagramCaption: 'Arquitectura orbital primordial: la línea de hielo a 2.7 UA y la fragmentación por acreción fallida',
    "content": [
      "En las etapas iniciales de la formación del Sistema Solar, hace aproximadamente cuatro mil seiscientos millones de años, el disco protoplanetario de gas y polvo circunestelar comenzó a enfriarse gradualmente. A través de fuerzas electrostáticas y colisiones a velocidades relativas muy bajas de pocos centímetros por segundo, los granos microscópicos de minerales refractarios se adhirieron mutuamente hasta formar agregados milimétricos y posteriormente planetesimales de varios kilómetros.",
      "En la zona interior del disco, la temperatura solar permitía únicamente la condensación de silicatos de alta densidad y metales pesados como hierro y níquel, mientras que más allá de la llamada 'línea de hielo' o línea de congelamiento (situada cerca de dos punto siete Unidades Astronómicas), las bajas temperaturas posibilitaron la condensación masiva de hielo de agua, monóxido de carbono y metano, sentando las bases de una marcada dicotomía composicional.",
      "Los modelos astrofísicos modernos sugieren que en la región donde hoy se ubica el cinturón existía originalmente suficiente material condensable para ensamblar entre dos y tres planetas del tamaño de la Tierra. La acreción desbocada permitió el surgimiento de decenas de embriones planetarios con dimensiones comparables a las de la Luna o Marte, los cuales comenzaron a diferenciarse internamente en núcleos de hierro fundido y mantos de silicatos ultrabásicos.",
      "Sin embargo, el vertiginoso crecimiento del planeta Júpiter, que acumuló más de trescientas veces la masa terrestre al capturar grandes cantidades de gas hidrógeno y helio antes de que se disipara la nebulosa, alteró drásticamente el equilibrio dinámico. La formidable atracción gravitacional del planeta gigante desestabilizó las órbitas coplanares circulares de los planetesimales vecinos, incrementando sus excentricidades e inclinaciones orbitales de forma caótica.",
      "Al aumentar las velocidades orbitales relativas de choque a más de cinco kilómetros por segundo, las colisiones entre los cuerpos dejaron de ser acumulativas y se convirtieron en eventos hipercatastróficos de pulverización mecánica. Más del noventa y nueve por ciento de la masa primordial fue expulsada hacia los confines del espacio exterior mediante eyección hiperbólica o precipitó hacia el Sol interior, dejando únicamente un residuo disperso de fragmentos sobrevivientes."
    ],
    "fact": "La formación del cinturón de asteroides quedó truncada cuando Júpiter alcanzó su masa crítica antes que los demás planetas, convirtiendo los choques suaves de acreción constructiva en impactos catastróficos a velocidades hiperbólicas que destrozaron los embriones planetarios en formación hace 4,600 millones de años.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El modelo del 'Gran Viraje' (Grand Tack) postula que una temprana migración radial de Júpiter hacia el interior del Sistema Solar hasta 1.5 UA, seguida por su retroceso forzado por la formación de Saturno, barrió y despojó al cinturón de asteroides de más del 99.9% de su masa original debido a perturbaciones resonantes extremas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los meteoritos condríticos primitivos recolectados en las capas de hielo de la Antártida contienen diminutos granos presolares de carburo de silicio y diamante más antiguos que el propio Sol, forjados en las atmósferas de estrellas gigantes rojas y explosiones de supernovas que precedieron a la formación de nuestra nebulosa planetaria."
      }
    ]
  },
  {
    "id": "efecto-jupiter",
    "title": "La Gravedad de Júpiter",
    "color": "#FFD93D",
    "btnImage": "/assets/asteroides/infographic_m1/btn_efecto-jupiter.webp",
    "image": "/assets/asteroides/infographic_m1/hero_efecto-jupiter.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_efecto-jupiter.webp',
    bannerCaption: 'Resonancias gravitatorias y perturbaciones de Júpiter sobre los asteroides',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_efecto-jupiter.webp',
    diagramCaption: 'Dinámica de resonancia orbital: perturbaciones periódicas de Júpiter sobre el Cinturón',
    "content": [
      "Júpiter es el objeto dominante del Sistema Solar después del Sol, albergando más de dos veces y media la masa combinada de todos los demás planetas, satélites y asteroides juntos. Su potente pozo gravitatorio ejerce una influencia dominante sobre la dinámica orbital de cualquier cuerpo que se desplace en sus inmediaciones, funcionando como un colosal escultor celeste que define la arquitectura y estabilidad del Cinturón Principal.",
      "A medida que los asteroides giran alrededor del Sol con periodos orbitales que van de tres a seis años terrestres, experimentan tirones gravitacionales periódicos cada vez que alcanzan su máxima aproximación con Júpiter. Cuando la relación entre el periodo de traslación del asteroide y el del planeta gigante corresponde a una fracción exacta de números enteros pequeños, se produce un fenómeno dinámico conocido como resonancia orbital de movimiento medio.",
      "En estas configuraciones resonantes, las perturbaciones gravitacionales no se compensan ni se promedian en el tiempo, sino que se acumulan de manera coherente en el mismo punto de la elipse orbital en cada ciclo. Esta acumulación rítmica de energía cinética incrementa exponencialmente la excentricidad orbital del asteroide, transformando órbitas casi circulares en trayectorias alargadas y cruzadoras de planetas.",
      "La gravedad de Júpiter también es responsable de confinar poblaciones asteroidales singulares en regiones de equilibrio dinámico estable. En los puntos lagrangianos L4 y L5 de la órbita de Júpiter, situados sesenta grados por delante y por detrás del gigante en su trayectoria heliocéntrica, residen miles de asteroides capturados conocidos como 'Troyanos de Júpiter', divididos en los campamentos de Grecia y Troya.",
      "Asimismo, la interacción gravitacional entre Júpiter y Saturno durante la infancia del sistema planetario produjo resonancias seculares que barrieron grandes extensiones del cinturón, eyectando asteroides masivos y desencadenando el denominado Bombardeo Intenso Tardío hace tres mil novecientos millones de años, un cataclismo que cubrió de gigantescos cráteres de impacto la corteza de la Luna, Mercurio y Marte."
    ],
    "fact": "Júpiter posee más de dos veces y media la masa de todos los demás planetas del Sistema Solar combinados, ejerciendo una atracción gravitatoria implacable que controla de forma permanente el destino orbital, las inclinaciones y las colisiones mutuas de cada asteroide que orbita en el Cinturón Principal.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los asteroides Troyanos en los puntos de equilibrio de Lagrange L4 y L5 se mantienen en órbitas sumamente estables debido a que la combinación vectorial de la fuerza gravitatoria del Sol y de Júpiter con la fuerza centrífuga genera un pozo de potencial gravitatorio efectivo cerrado donde los objetos quedan atrapados durante eones."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La misión espacial Lucy de la NASA, lanzada en octubre de 2021, está programada para sobrevolar ocho asteroides troyanos distintos entre 2027 y 2033, estudiando por primera vez de cerca estos fósiles helados congelados desde la infancia planetaria para revelar la historia de las migraciones de los gigantes gaseosos."
      }
    ]
  },
  {
    "id": "resonancias-kirkwood",
    "title": "Huecos de Kirkwood",
    "color": "#6BCB77",
    "btnImage": "/assets/asteroides/infographic_m1/btn_resonancias-kirkwood.webp",
    "image": "/assets/asteroides/infographic_m1/hero_resonancias-kirkwood.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_resonancias-kirkwood.webp',
    bannerCaption: 'Brechas orbitales de Kirkwood causadas por resonancias de movimiento medio',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_resonancias-kirkwood.webp',
    diagramCaption: 'Esquema de las Lagunas de Kirkwood: valles de vaciamiento por resonancias gravitatorias',
    "content": [
      "En el año 1866, el astrónomo y matemático estadounidense Daniel Kirkwood presentó un análisis estadístico pionero de las distancias medias al Sol de todos los asteroides catalogados hasta esa época. Al graficar el número de asteroides en función de su semieje mayor, descubrió notables valles y zonas casi desprovistas de cuerpos rocosos, interrupciones bruscas que hoy se conocen internacionalmente como los 'Huecos de Kirkwood'.",
      "Kirkwood demostró que estos huecos coinciden de forma matemáticamente exacta con ubicaciones orbitales donde el periodo de revolución del asteroide es una fracción simple del periodo orbital de Júpiter (que dura once punto ochenta y seis años terrestres). Las resonancias más prominentes se encuentran en las proporciones 3:1 (a dos punto cincuenta UA), 5:2 (a dos punto ochenta y dos UA), 7:3 (a dos punto noventa y cinco UA) y 2:1 (a tres punto veintisiete UA).",
      "Un asteroide situado en la resonancia 3:1 completa exactamente tres vueltas alrededor del Sol por cada una que efectúa Júpiter. En consecuencia, cada tres órbitas el asteroide se alinea en conjunción directa con Júpiter en el mismo punto del espacio, recibiendo un impulso gravitatorio idéntico y acumulativo que deforma progresivamente su trayectoria elíptica en una escala de cientos de miles de años.",
      "Este incremento forzado de la excentricidad estira la órbita del cuerpo hasta que su perihelio penetra en el Sistema Solar interior, intersectando las trayectorias de Marte, la Tierra e incluso Venus. Cuando el asteroide experimenta un encuentro cercano con alguno de estos mundos rocosos, el tirón gravitacional del planeta lo extrae definitivamente de la resonancia, eyectándolo fuera del hueco.",
      "Por esta razón, los Huecos de Kirkwood no representan barreras físicas impenetrables, sino dinámicas compuertas de escape cósmicas. Funcionan como los principales canales de transporte que canalizan fragmentos y rocas del Cinturón Principal hacia las órbitas de los asteroides cercanos a la Tierra (NEAs), suministrando de manera ininterrumpida la gran mayoría de los meteoritos que impactan en nuestro planeta."
    ],
    "fact": "Los Huecos de Kirkwood son zonas vacías y despobladas del Cinturón Principal provocadas por intensas resonancias gravitacionales periódicas de movimiento medio con Júpiter, descubiertas empíricamente en 1866 por el matemático Daniel Kirkwood y responsables directas de desviar meteoritos y asteroides fragmentados en órbitas caóticas de colisión hacia la Tierra.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La resonancia orbital de movimiento medio 3:1 situada a exactamente 2.50 UA de distancia heliocéntrica eleva la excentricidad orbital de un asteroide desde 0.1 hasta más de 0.6 en menos de un millón de años debido a la acción del caos hamiltoniano, forzándolo a cruzar inevitablemente la órbita de Marte y la Tierra."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "A diferencia de los huecos vacíos despoblados por resonancias destructivas, la resonancia orbital 3:2 situada a 3.97 UA alberga una densa y estable concentración de asteroides conocida como la familia Hilda, cuyas órbitas elípticas sincronizadas evitan sistemáticamente los encuentros cercanos destructivos con Júpiter."
      }
    ]
  },
  {
    "id": "tipos-espectrales",
    "title": "Tipos C, S y M",
    "color": "#9B51E0",
    "btnImage": "/assets/asteroides/infographic_m1/btn_tipos-espectrales.webp",
    "image": "/assets/asteroides/infographic_m1/hero_tipos-espectrales.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_tipos-espectrales.webp',
    bannerCaption: 'Diferenciación espectral y mineralógica: clases C, S y M',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_tipos-espectrales.webp',
    diagramCaption: 'Taxonomía espectral comparativa: composición interna de asteroides tipos C, S y M',
    "content": [
      "La composición mineralógica de los asteroides no es homogénea, sino que refleja las condiciones térmicas y químicas de las zonas del disco protosolar donde se originaron. Para clasificarlos, los astrónomos utilizan la espectroscopía de reflectancia óptica e infrarroja, una técnica que analiza las firmas de absorción de la luz solar reflejada por la superficie de la roca, clasificándolos en los sistemas taxonómicos de Tholen y Bus-DeMeo.",
      "Los asteroides de Tipo C (carbonáceos) son los más abundantes, representando más del setenta y cinco por ciento de todos los cuerpos del Cinturón Principal. Se caracterizan por un albedo extremadamente oscuro, reflejando menos del cinco por ciento de la luz incidente. Su composición incluye grandes concentraciones de compuestos de carbono amorfo, filosilicatos hidratados y minerales de arcilla, predominando en las regiones exteriores del cinturón más allá de dos punto siete UA.",
      "Los asteroides de Tipo S (silicáceos o rocosos) constituyen aproximadamente el diecisiete por ciento de la población y predominan en la zona interior del cinturón, más cercana a Marte. Poseen un albedo intermedio entre cero punto diez y cero punto veinticinco y sus espectros revelan la presencia predominante de silicatos ricos en magnesio y hierro, tales como el piroxeno y el olivino, similares a los meteoritos pétreos comunes.",
      "Los asteroides de Tipo M (metálicos) son menos frecuentes pero de extraordinario interés geofísico y económico. Están compuestos casi en su totalidad por aleaciones metálicas de hierro y níquel de alta pureza, acompañadas de trazas de metales del grupo del platino como rodio, rutenio y osmio. Presentan un albedo reflectivo moderado y espectros planos sin las bandas de absorción típicas de los silicatos hidratados.",
      "La existencia de asteroides puramente metálicos como el gigante 16 Psyche (de doscientos veinte kilómetros de diámetro) demuestra que en los primeros diez millones de años del Sistema Solar se formaron protoplanetas de gran envergadura que llegaron a fundirse y desarrollar un núcleo metálico denso, el cual quedó expuesto al vacío tras ser violentamente despojado de su corteza rocosa por impactos devastadores."
    ],
    "fact": "Los asteroides se dividen taxonómicamente en tipos C (carbonáceos oscuros ricos en minerales hidratados y carbono orgánico), S (silicatos rocosos compuestos de olivino y piroxeno) y M (núcleos metálicos masivos expuestos de hierro y níquel de alta pureza), reflejando la compleja gradación térmica y química que imperaba en el disco circunestelar del Sistema Solar primitivo.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La misión Psyche de la NASA, lanzada en octubre de 2023 impulsada por propulsores iónicos Hall, viaja hacia el asteroide metálico 16 Psyche para examinar in situ el primer núcleo protoplanetario metálico accesible a la instrumentación científica humana, evaluando su magnetometría y topografía de cráteres de impacto."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El asteroide carbonáceo Ryugu, explorado y muestreado por la sonda japonesa Hayabusa2, es un cuerpo tipo 'pila de escombros' tan oscuro y poroso que refleja menos del cuatro por ciento de la luz solar incidente, absorbiendo radiación casi con la misma eficiencia que el carbón vegetal puro flotando en el espacio."
      }
    ]
  },
  {
    "id": "colisiones-familias",
    "title": "Colisiones y Familias",
    "color": "#FF884B",
    "btnImage": "/assets/asteroides/infographic_m1/btn_colisiones-familias.webp",
    "image": "/assets/asteroides/infographic_m1/hero_colisiones-familias.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_colisiones-familias.webp',
    bannerCaption: 'Familias colisionales de fragmentación catastrófica en el Cinturón',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_colisiones-familias.webp',
    diagramCaption: 'Fragmentación colisional hipercatastrófica y dispersión vectorial de familias de asteroides',
    "content": [
      "A lo largo de los cuatro mil seiscientos millones de años de historia del Cinturón Principal, las colisiones mutuas a velocidades hiperbólicas han remodelado continuamente la población de asteroides. En el año 1918, el astrónomo japonés Kiyotsugu Hirayama descubrió que numerosos asteroides que orbitan a distancias aparentemente no relacionadas comparten parámetros orbitales fundamentales idénticos: el semieje mayor, la excentricidad y la inclinación orbital propia.",
      "Hirayama propuso la brillante hipótesis de que estos grupos dinámicos, bautizados formalmente como 'Familias de Hirayama' o familias asteroidales colisionales, son los fragmentos dispersos resultantes de la fragmentación catastrófica de un único cuerpo progenitor de gran tamaño. Cuando dos asteroides chocan a varios kilómetros por segundo, la energía cinética pulveriza el objeto menor y desintegra al mayor en miles de piezas que heredan la velocidad orbital orbital del progenitor.",
      "Entre las familias más destacadas identificadas por la astronomía contemporánea se encuentran la familia Koronis, la familia Eos y la familia Themis. En particular, la familia Themis es objeto de intensa investigación porque sus miembros conservan agua congelada en forma de escarcha en sus superficies y minerales hidratados, lo que demuestra que los impactos progenitores no siempre evaporaron los volátiles en las regiones exteriores.",
      "Otra familia de gran relevancia es la familia de Vesta, originada hace unos mil millones de años tras un gigantesco impacto que excavó la colosal cuenca Rheasilvia de quinientos kilómetros de diámetro en el polo sur del protoplaneta Vesta. Los fragmentos eyectados, conocidos como 'vestoides', comparten la misma firma espectral de basaltos ígneos y son la fuente confirmada de los meteoritos terrestres del grupo HED (howarditas, eucritas y diogenitas).",
      "La continua trituración mecánica entre miembros de familias asteroidales produce millones de toneladas de micrometeoroides y polvo cósmico cada siglo. Esta nube de partículas microscópicas se esparce gradualmente por el plano de la eclíptica hacia el interior del Sistema Solar, creando el resplandor difuso nocturno observable en cielos prístinos que los astrónomos conocen como la Luz Zodiacal."
    ],
    "fact": "Las familias de asteroides fueron identificadas formalmente en 1918 por el astrónomo japonés Kiyotsugu Hirayama al descubrir cúmulos de rocas que comparten la misma inclinación, excentricidad y semieje orbital heliocéntrico, procedentes de la destrucción catastrófica por impacto violento de un gran cuerpo progenitor común hace decenas o cientos de millones de años.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La cuenca de impacto Rheasilvia en el polo sur del protoplaneta Vesta tiene un diámetro de quinientos cinco kilómetros y una montaña central que se eleva más de veintidós kilómetros sobre el fondo del cráter, habiendo eyectado el uno por ciento de la masa total de Vesta al espacio en forma de fragmentos vestoides."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Más de mil doscientos meteoritos catalogados en museos de geología de todo el mundo provienen químicamente del mismo asteroide Vesta (el grupo HED: howarditas, eucritas y diogenitas), habiendo viajado millones de años por el espacio interplanetario antes de precipitar finalmente sobre la superficie de la Tierra."
      }
    ]
  },
  {
    "id": "futuro-cinturon",
    "title": "Evolución y Efecto Yarkovsky",
    "color": "#00E4FF",
    "btnImage": "/assets/asteroides/infographic_m1/btn_futuro-cinturon.webp",
    "image": "/assets/asteroides/infographic_m1/hero_futuro-cinturon.webp",
    bannerImage: '/assets/asteroides/infographic_m1/banner_futuro-cinturon.webp',
    bannerCaption: 'Evolución dinámica a largo plazo y destino de los cuerpos asteroidales',
    diagramImage: '/assets/asteroides/infographic_m1/diagram_futuro-cinturon.webp',
    diagramCaption: 'Mecanismo del Efecto Yarkovsky: radiación térmica asimétrica y deriva orbital secular',
    "content": [
      "Lejos de ser un entorno estático y petrificado, el Cinturón de Asteroides experimenta una sutil pero continua evolución física y orbital impulsada por la interacción de la materia con la radiación del Sol. Durante décadas, los astrónomos no podían explicar por qué ciertos asteroides de tamaño intermedio abandonaban sus órbitas estables más rápido de lo que predecía la mecánica newtoniana gravitatoria estándar.",
      "La respuesta reside en el Efecto Yarkovsky, un mecanismo térmico propuesto por el ingeniero civil ruso Ivan Yarkovsky en 1900 y confirmado empíricamente por telescopios espaciales en 2003. Cuando un asteroide en rotación absorbe la radiación solar en su hemisferio diurno, su superficie rocosa se calienta. Al girar, ese calor no se irradia inmediatamente, sino que es reemitido en el espectro infrarrojo con cierto retardo durante el hemisferio nocturno del cuerpo.",
      "La emisión asimétrica de fotones térmicos actúa como un diminuto motor de empuje fotónico continuo. Debido al principio de acción y reacción, los fotones infrarrojos expulsados transmiten un momento lineal infinitesimal a la roca. En asteroides con rotación prograda (en el mismo sentido que su órbita), este empuje acelera el asteroide y expande lentamente su órbita hacia afuera; en rotación retrógrada, frena al cuerpo y reduce su semieje orbital.",
      "Complementariamente, el Efecto YORP (Yarkovsky-O'Keefe-Radzievskii-Paddack) modifica la velocidad de giro y la inclinación del eje de rotación de asteroides con formas asimétricas e irregulares debido a la presión de radiación solar. Con el transcurso de los millones de años, el efecto YORP puede acelerar la rotación de un asteroide hasta superar su límite de cohesión estructural centrífuga, provocando su fractura en dos o más componentes y creando asteroides binarios.",
      "En el futuro lejano, dentro de unos cinco mil millones de años, la evolución estelar del Sol alterará drásticamente el cinturón. Cuando el Sol se transforme en una gigante roja y posteriormente colapse en una enana blanca tras expulsar sus capas exteriores, la intensa pérdida de masa estelar expandirá las órbitas de los asteroides sobrevivientes, reconfigurando por completo el paisaje rocoso de nuestro vecindario cósmico."
    ],
    "fact": "El Efecto Yarkovsky es una fuerza térmica no gravitacional provocada por la absorción diurna y la reemisión asimétrica de radiación infrarroja en el hemisferio nocturno de asteroides en rotación continua, empujando lentamente sus trayectorias orbitales a lo largo de millones de años hacia zonas de resonancia caóticas que los arrojan hacia los planetas interiores.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El empuje térmico del efecto Yarkovsky sobre un asteroide de quinientos metros de diámetro equivale a una fuerza infinitesimal comparable al peso de una moneda sobre la palma de una mano, pero al actuar de forma continua durante decenas de millones de años es capaz de desplazar su órbita en cientos de miles de kilómetros."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El radar planetario de alta resolución de los radiotelescopios de Arecibo y Goldstone confirmó de manera directa y observacional el efecto YORP en 2007 al medir con precisión nanométrica una aceleración continua en la velocidad de rotación del asteroide cercano a la Tierra catalogado oficialmente como (54509) YORP."
      }
    ]
  }
];

export default function InteractiveInfographic_AsteroidesM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(12,14,35,0.92) 0%, rgba(20,10,30,0.88) 50%, rgba(10,12,32,0.95) 100%)',
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
      <AsteroidesM1Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B6B, #4D96FF)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los módulos superiores para explorar los orígenes primitivos del Cinturón Principal.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,107,107,0.4)' }}>
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
      hue: Math.random() > 0.5 ? '255, 107, 107' : '77, 150, 255',
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

function AsteroidesM1Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,107,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM1)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FF6B6B','#4D96FF','#FFD93D','#6BCB77','#9B51E0','#FF884B','#00E5FF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FF6B6B" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FF6B6B" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,107,107,0.2)" />
            <stop offset="50%" stopColor="rgba(255,107,107,0.9)" />
            <stop offset="100%" stopColor="rgba(255,107,107,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FF6B6B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CINTURÓN PRINCIPAL</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,107,107,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">ORÍGENES DE LOS ASTEROIDES</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,107,107,0.2)'}`,
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
          layoutId="activeDotAsteroidesM1"
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
