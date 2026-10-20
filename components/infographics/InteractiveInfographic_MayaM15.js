'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Codex themed) ────────────────────────────
function DecoCodexFold({ size = 70, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 10 L25 5 L40 10 L55 5 L55 50 L40 55 L25 50 L10 55 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="25" y1="5" x2="25" y2="50" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="40" y1="10" x2="40" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <rect x="15" y="15" width="6" height="6" fill={color} opacity="0.4" />
      <rect x="45" y="15" width="6" height="6" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoVenusTable({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 17 * Math.cos(rad)} cy={30 + 17 * Math.sin(rad)} r="3" fill={color} opacity="0.7" />;
      })}
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoEclipseRing({ size = 70, color = '#212121', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 A20 20 0 1 1 10 30" fill="none" stroke={color} strokeWidth="3" />
      <path d="M10 30 A20 20 0 0 1 30 10" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFF8E1" stroke={color} strokeWidth="1" />
      <path d="M20 40 L15 45 M40 40 L45 45 M20 20 L15 15" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoQuill({ size = 70, color = '#00695C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M50 10 C40 10 30 20 20 40 C18 45 15 50 10 50 C15 45 20 40 25 35 C35 25 45 15 50 10 Z" fill={color} opacity="0.5" stroke={color} strokeWidth="1" />
      <line x1="50" y1="10" x2="20" y2="40" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="48" r="2" fill={color} />
      <path d="M10 50 Q15 55 20 52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoGlyphColumn({ size = 70, color = '#5D4037', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="5" width="20" height="50" fill="none" stroke={color} strokeWidth="1.5" rx="3" />
      <rect x="23" y="8" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <rect x="23" y="24" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <rect x="23" y="40" width="14" height="12" fill={color} opacity="0.4" rx="2" />
      <circle cx="15" cy="14" r="2" fill={color} opacity="0.6" />
      <circle cx="15" cy="30" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'codice-descubrimiento': [DecoCodexFold, DecoQuill, DecoGlyphColumn],
  'estructura-fisica': [DecoCodexFold, DecoGlyphColumn, DecoQuill],
  'tablas-venus': [DecoVenusTable, DecoGlyphColumn, DecoCodexFold],'tablas-eclipses': [DecoEclipseRing, DecoVenusTable, DecoCodexFold],'tablas-lluvia': [DecoQuill, DecoEclipseRing, DecoGlyphColumn],'matematica-codice': [DecoGlyphColumn, DecoVenusTable, DecoCodexFold],'supervivencia-codice': [DecoCodexFold, DecoQuill, DecoEclipseRing],
}; const BIBLIOGRAPHY = ['Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
  'Coe, M.D. & Van Stone, M. (2005). Reading the Maya Glyphs, Thames & Hudson',
  'Thompson, J.E.S. (1972). A Commentary on the Dresden Codex, American Philosophical Society',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Love, B. (1994). The Paris Codex: Handbook for a Maya Priest, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "codice-descubrimiento",
    diagramImage: '/assets/maya/infographic_m15/diagram_codice-descubrimiento.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Descubrimiento',
    "bannerImage": "/assets/maya/infographic_m15/banner_codice-descubrimiento.webp",
    "title": "El Descubrimiento",
    "color": "#C62828",
    "btnImage": "/assets/maya/infographic_m15/btn_codice-descubrimiento.jpg",
    "image": "/assets/maya/infographic_m15/hero_codice-descubrimiento.jpg",
    "content": [
      "El Códice de Dresde (Codex Dresdensis) es unánimemente reconocido como el manuscrito prehispánico más complejo, refinado y trascendental de la América indígena. Su historia documentada en Europa comenzó en el año 1739, cuando Johann Christian Götze, director de la Biblioteca Real de Sajonia en Dresde, lo adquirió de un coleccionista privado durante un viaje oficial a la ciudad de Viena, incorporándolo a los fondos de la corte real.",
      "Durante casi un siglo, el manuscrito permaneció como una curiosidad exótica incomprensible en los anaqueles alemanes. Fue el sabio naturalista Alexander von Humboldt quien publicó en 1810 las primeras cinco páginas reproducidas en su obra Vistas de las cordilleras y monumentos de los pueblos indígenas de América, atrayendo la atención de los filólogos europeos hacia la intrincada belleza visual de los jeroglíficos mesoamericanos.",
      "El verdadero punto de inflexión científico llegó en la década de 1880 de la mano del matemático y bibliotecario Ernst Förstemann. Con una paciencia metódica ejemplar, Förstemann descubrió que los puntos y barras combinados con símbolos de conchas marinas conformaban un sistema de numeración vigesimal posicional con valor de cero, descifrando por primera vez el mecanismo astronómico de la Cuenta Larga y la Rueda Calendárica.",
      "Förstemann identificó además las célebres tablas astronómicas de Venus y los cómputos de eclipses en las páginas del códice, demostrando que el texto no contenía fábulas astrológicas arbitrarias, sino efemérides científicas de exactitud matemática insospechada. Este hallazgo revolucionario situó a los antiguos mayas al mismo nivel intelectual de las civilizaciones clásicas de Babilonia, Grecia, la India y la China antigua.",
      "Los estudios filológicos y paleográficos contemporáneos estiman que el códice fue copiado por escribas de élite en el norte de Yucatán —posiblemente en Chichén Itzá o Mayapán— entre los años 1200 y 1250 d.C., en el periodo Posclásico Temprano. El manuscrito sintetiza conocimientos observacionales acumulados durante más de seis siglos en las metrópolis del Clásico, consolidándose como la cumbre del saber mesoamericano."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Johann Christian Götze obtuvo el códice en Viena de forma gratuita como un regalo diplomático de un noble austriaco, quien lo guardaba sin conocer su origen ni contenido. Götze escribió en sus memorias que lo aceptó considerando que se trataba de un «libro mexicano invaluable y curioso escrito en caracteres jeroglíficos desconocidos»."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Ernst Förstemann logró descifrar el calendario maya sin haber viajado jamás a México ni haber visto un monumento arqueológico en persona. Su método deductivo se basó exclusivamente en el análisis aritmético interno de las sumas de intervalos en las páginas del códice de Dresde y en el cotejo de las fechas de la Relación de fray Diego de Landa de 1566."
      }
    ],
    "fact": "El Códice de Dresde contiene más de setecientos cartuchos jeroglíficos individuales y cientos de números calendáricos pintados con tintas indelebles. Su desciframiento a finales del siglo XIX proporcionó la clave maestra matemática que permitió a los arqueólogos de todo el mundo fechar con precisión absoluta las estelas monolíticas de Tikal, Palenque y Copán."
  },
  {
    "id": "estructura-fisica",
    diagramImage: '/assets/maya/infographic_m15/diagram_estructura-fisica.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Estructura Física',
    "bannerImage": "/assets/maya/infographic_m15/banner_estructura-fisica.webp",
    "title": "Estructura Física",
    "color": "#5D4037",
    "btnImage": "/assets/maya/infographic_m15/btn_estructura-fisica.jpg",
    "image": "/assets/maya/infographic_m15/hero_estructura-fisica.jpg",
    "content": [
      "La manufactura material del Códice de Dresde revela un dominio tecnológico asombroso en la elaboración de soportes orgánicos de escritura. El libro no está encuadernado al estilo europeo, sino confeccionado como una tira continua de papel doblada en forma de biombo o acordeón. Esta estructura plegable permitía a los sacerdotes desplegar secciones específicas sobre esteras ceremoniales para consultar tablas numéricas complejas.",
      "El soporte del manuscrito es papel de amate, obtenido a partir de la corteza interna fibrosa de higueras silvestres tropicales (Ficus cotinifolia y Ficus padifolia). Los artesanos mayas desprendían las tiras de corteza, las hervían en agua con cal para ablandar las fibras leñosas y luego las maceraban con batidores de piedra estriada sobre tablas planas hasta entrelazar las fibras en láminas continuas de espesor homogéneo.",
      "Una vez seca la tira de amate, ambas caras eran recubiertas con una imprimatura milimétrica de carbonato de calcio finamente pulverizado mezclado con gomas vegetales. Esta capa de estuco de cal blanca creaba una superficie lisa, impermeable y luminosa de extraordinaria blancura, idéntica al yeso de los murales al fresco, proporcionando el fondo neutro ideal para la aplicación de tintas fluidas con pinceles de pelo fino de animal.",
      "La paleta cromática del códice incluye pigmentos minerales y vegetales de alta estabilidad química. El negro intenso se obtenía de hollín o carbón vegetal micronizado; el rojo y el marrón procedían de óxidos de hierro y sulfuro de mercurio (cinabrio); y el célebre azul maya se elaboraba fijando químicamente el colorante del índigo (añil) en la matriz cristalina de una arcilla laminar llamada paligorskita mediante calentamiento.",
      "El manuscrito original consta de treinta y nueve hojas pintadas por ambos lados, totalizando setenta y ocho páginas de las cuales setenta y cuatro contienen ilustraciones y textos jeroglíficos. Con una longitud total desplegada de 3.56 metros y una altura de 20.5 centímetros, el códice fue concebido como un manual portátil de alta jerarquía, diseñado para resistir el uso continuo en ceremonias y consultas palaciegas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El azul maya utilizado en las ilustraciones del dios Chaac en el Códice de Dresde es un pigmento híbrido organo-arcilloso prácticamente indestructible. Resiste la acción de ácidos corrosivos, solventes orgánicos y la radiación solar directa, habiendo conservado su brillantez turquesa original durante más de ochocientos años de historia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El análisis espectroscópico de las hojas del códice demostró que el grosor de la capa de carbonato de calcio oscila entre 20 y 50 micrómetros. Esta imprimatura no solo aportaba blancura visual, sino que actuaba como un amortiguador químico alcalino natural que neutralizó los ácidos del ambiente impidiendo la degradación celular de las fibras de celulosa del papel."
      }
    ],
    "fact": "El Códice de Dresde estuvo originalmente dividido en dos secciones independientes que sumaban 39 hojas de doble cara. Cada pliegue de biombo mide aproximadamente 8.5 centímetros de ancho por 20.5 centímetros de alto, formando un volumen compacto que un sacerdote astrónomo podía transportar cómodamente bajo el brazo envuelto en una funda protectora de piel de jaguar."
  },
  {
    "id": "tablas-venus",
    diagramImage: '/assets/maya/infographic_m15/diagram_tablas-venus.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Tablas de Venus',
    "bannerImage": "/assets/maya/infographic_m15/banner_tablas-venus.webp",
    "title": "Tablas de Venus",
    "color": "#1565C0",
    "btnImage": "/assets/maya/infographic_m15/btn_tablas-venus.jpg",
    "image": "/assets/maya/infographic_m15/hero_tablas-venus.jpg",
    "content": [
      "Las páginas 46 a 50 del Códice de Dresde albergan uno de los monumentos científicos más deslumbrantes de la humanidad: las Tablas de Venus. En este apartado epigráfico, los astrónomos mayas compilaron con precisión matemática los movimientos orbitales aparentes del planeta Venus (Noh Ek'), concebido como una deidad dual que encarnaba tanto al temible lucero matutino (Tlahuizcalpantecuhtli) como a la deidad del crepúsculo.",
      "Los sabios mayas calcularon que el periodo sinódico de Venus —el intervalo exacto que tarda el planeta en repetir su misma posición visual respecto al Sol visto desde la Tierra— dura un promedio de 584 días. En el códice, este ciclo completo aparece desglosado con exactitud en sus cuatro fases observables: 236 días como lucero matutino, 90 días de ocultamiento tras el Sol, 250 días como lucero vespertino y 8 días de tránsito oscuro inferior.",
      "La genialidad de la tabla reside en su capacidad para conciliar el ciclo de Venus con el calendario solar de 365 días. Cinco ciclos de Venus de 584 días equivalen con exactitud a ocho años solares de 365 días: 5 × 584 = 8 × 365 = 2,920 días. Al multiplicar este ciclo base por trece, los astrónomos crearon una gran rueda venusina de 37,960 días (104 años solares), equivalente a dos periodos de 52 años de la Rueda Calendárica.",
      "Conscientes de que el periodo sinódico real de Venus es de 583.92 días y no de 584 días cerrados, los matemáticos mayas introdujeron una ingeniosa tabla de factores de corrección en el prefacio de la página 46. Mediante la sustracción periódica de cuatro días al cabo de sesenta y un ciclos sinódicos, lograron reducir el error acumulado a tan solo un día solar cada quinientos años, superando la precisión de la astronomía europea coetánea.",
      "Esta tabla astronómica cumplía una trascendental función militar y adivinatoria. La primera reaparición de Venus en el horizonte oriental al amanecer tras los ocho días de invisibilidad en conjunción inferior era considerada un momento de máximo peligro cósmico, señalando la fecha propicia para que los gobernantes desataran la «guerra estelar» contra ciudades rivales, capturando prisioneros para los sacrificios de Estado."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En las Tablas de Venus, el planeta aparece ilustrado como un dios guerrero armado con lanza dardos (átlatl) y flechas ceremoniales. En cada una de las páginas, la deidad dispara sus dardos celestes contra diversas víctimas terrenales: reyes, deidades del maíz o símbolos del agua, advirtiendo los desastres que ocurrirían según el signo del día de su orto."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El periodo sinódico moderno de Venus determinado por la NASA mediante radares satelitales es de 583.92 días solares medios. El ajuste maya de restar cuatro días en la posición de 61 ciclos de Venus arroja una duración promedio estimada de 583.93 días, lo que representa una exactitud superior al 99.98% conseguida únicamente con la vista humana sin lentes telescópicos."
      }
    ],
    "fact": "La Tabla de Venus del Códice de Dresde abarca una proyección calendárica continua de 37,960 días solares, equivalente exactamente a 65 ciclos sinódicos de Venus, 104 años civiles Haab' de 365 días y 146 almanaques sagrados Tzolk'in de 260 días. Esta sincronización perfecta entre tres astros y calendarios distintos representa una de las cumbres intelectuales de la matemática mundial."
  },
  {
    "id": "tablas-eclipses",
    diagramImage: '/assets/maya/infographic_m15/diagram_tablas-eclipses.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Tablas de Eclipses',
    "bannerImage": "/assets/maya/infographic_m15/banner_tablas-eclipses.webp",
    "title": "Tablas de Eclipses",
    "color": "#212121",
    "btnImage": "/assets/maya/infographic_m15/btn_tablas-eclipses.jpg",
    "image": "/assets/maya/infographic_m15/hero_tablas-eclipses.jpg",
    "content": [
      "Las páginas 51 a 58 del Códice de Dresde contienen una de las obras cumbres de la astronomía observacional prehispánica: la Tabla de Eclipses. A lo largo de ocho páginas continuas, los sabios mayas estructuraron un almanaque adivinatorio y científico diseñado para predecir las temporadas de peligro en que podían producirse eclipses de Sol o de Luna, fenómenos temidos que amenazaban la luz vital de las deidades rectoras.",
      "Los astrónomos mayas comprendieron empíricamente que los eclipses no ocurren de forma caótica, sino en intervalos regulares regulados por los nodos lunares, los puntos donde la órbita de la Luna corta el plano orbital de la Tierra alrededor del Sol. Al carecer de telescopios, registraron durante siglos las fechas de lunaciones completas, descubriendo que los eclipses se concentran en ventanas temporales separadas por seis o cinco meses lunares.",
      "La tabla de Dresde está estructurada en una secuencia de sesenta y nueve intervalos lunares que totalizan cuatrocientas cinco lunas llenas continuas, equivalentes a 11,960 días solares (casi treinta y tres años terrestres). La inmensa mayoría de estos intervalos abarcan seis meses lunares (177 o 178 días), pero en puntos matemáticos estratégicos se intercalan intervalos cortos de cinco meses lunares (148 días) para reajustar el cómputo.",
      "Cada una de las divisiones de la tabla está acompañada por pinturas fascinantes que ilustran los mitos asociados a los eclipses. El disco solar o lunar aparece suspendido de una banda celeste tachonada de estrellas, aprisionado entre las mandíbulas abiertas de una gigantesca serpiente cósmica del cielo o devorado por un monstruo descarnado de la muerte, reflejando el combate cósmico por la preservación de la claridad diurna.",
      "Esta tabla astronómica posee una precisión asombrosa: el ciclo de 11,960 días mayas difiere en apenas unas pocas horas respecto a cuatrocientas cinco lunaciones reales (11,959.89 días). Gracias a este instrumento de cálculo, los sacerdotes anunciaban a la población la llegada inminente de un eclipse con semanas de anticipación, organizando rezos y percusiones ceremoniales de tambores para ayudar al Sol a vencer la oscuridad."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante los eclipses solares, los mayas creían que el Sol estaba siendo devorado por hormigas gigantes celestiales o por el monstruo de la tierra. Para ahuyentar a estos demonios cósmicos y despertar al Sol desmayado, la población entera golpeaba vasijas de barro, hacía sonar caracoles marinos y gritaba al unísono hacia el firmamento oscurecido."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El ciclo de 11,960 días del Códice de Dresde se aproxima de forma asombrosa al período astronómico conocido en la actualidad como «Saros doble» o ciclo de nodos. Cuatrocientas cinco lunaciones sinódicas (29.53059 días × 405 = 11,959.89 días) coinciden casi con 46 semiannos de eclipse (242 revoluciones dracónicas), probando un dominio empírico de la mecánica de los nodos."
      }
    ],
    "fact": "La Tabla de Eclipses de Dresde registra 405 lunas consecutivas distribuidas en 69 grupos de lunaciones. Los mayas calcularon que 405 meses lunares equivalían a 11,960 días solares, lo que otorga una duración del mes lunar de 29.53086 días: ¡una desviación de menos de un minuto respecto a las mediciones atómicas contemporáneas más avanzadas!"
  },
  {
    "id": "tablas-lluvia",
    diagramImage: '/assets/maya/infographic_m15/diagram_tablas-lluvia.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Tablas de Lluvia y Marte',
    "bannerImage": "/assets/maya/infographic_m15/banner_tablas-lluvia.webp",
    "title": "Tablas de Lluvia y Marte",
    "color": "#00695C",
    "btnImage": "/assets/maya/infographic_m15/btn_tablas-lluvia.jpg",
    "image": "/assets/maya/infographic_m15/hero_tablas-lluvia.jpg",
    "content": [
      "Además de las efemérides de Venus y la Luna, el Códice de Dresde dedica extensas secciones a la predicción meteorológica y al seguimiento de los planetas exteriores. En las páginas 43 a 45 se encuentra la enigmática Tabla de Marte, donde los astrónomos mayas compilaron el ciclo sinódico del planeta rojo (780 días), vinculándolo estrechamente con la figura mítica de una criatura zoomorfa conocida como la «Bestia de Marte».",
      "La Bestia de Marte aparece pintada colgando de las patas de una banda celeste adornada con glifos de estrellas y constelaciones, mostrando un cuerpo escamoso con pezuñas de venado y trompa alargada. Los sacerdotes identificaron que tres periodos del calendario sagrado Tzolk'in de 260 días sumaban exactamente setecientos ochenta días solares (3 × 260 = 780), coincidiendo con la duración del ciclo orbital sinódico de Marte en el firmamento.",
      "Las secciones consagradas a las lluvias y la agricultura abarcan las páginas 29 a 42 y 65 a 73 del manuscrito, dominadas por la omnipresente figura de Chaac, la deidad benéfica del agua celeste y las tormentas. Chaac aparece retratado en decenas de advocaciones rituales: empuñando hachas de rayo para quebrar las nubes, remando en canoas cósmicas sobre el mar primordial y plantando semillas de maíz en campos fertilizados.",
      "Estas tablas de lluvia asociaban las fechas de precipitación con los cuatro rumbos cardinales del mundo mesoamericano, asignando colores sagrados a cada punto: rojo para el este fértil, blanco para el norte frío, negro para el oeste del atardecer y amarillo para el sur. Al correlacionar los días del Tzolk'in con estos rumbos, los sabios dictaminaban qué regiones gozarían de cosechas abundantes o padecerían sequías y plagas.",
      "La culminación pictórica del códice se encuentra en la célebre página 74, conocida como la escena del Gran Diluvio Cósmico. En ella, un colosal cocodrilo celeste derrama torrentes infinitos de agua sobre la tierra a través de sus fauces abiertas, mientras una anciana deidad destructora vuelca una vasija de agua invertida, escenificando el mito del fin catastrófico de una era cósmica previo a la regeneración universal."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En varias páginas del códice, el dios Chaac aparece montado sobre el lomo de un ciervo, sumergido en un cenote subterráneo o sentado en la copa de un árbol cósmico de ceiba. Cada una de estas posturas representaba un tipo diferente de fenómeno meteorológico: brumas matinales, lloviznas suaves o huracanes devastadores con truenos destructivos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El periodo sinódico medio de Marte respecto a la Tierra es de 779.94 días solares. La tabla del Códice de Dresde redondeó este valor a 780 días exactos, lo que representa un error relativo minúsculo de apenas 0.008%. Esta concordancia matemática permitió a los mayas integrar el planeta Marte en su calendario ritual de 260 días de manera armónica."
      }
    ],
    "fact": "La página 74 del Códice de Dresde es una de las composiciones visuales más dramáticas del arte maya prehispánico. Pintada con fondo negro y tonalidades verdosas de azul maya, muestra al Monstruo Celestial vomitando un río continuo de agua con glifos de eclipses solares y lunares, advirtiendo sobre el poder colosal del agua en el destino de Mesoamérica."
  },
  {
    "id": "matematica-codice",
    diagramImage: '/assets/maya/infographic_m15/diagram_matematica-codice.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Matemática',
    "bannerImage": "/assets/maya/infographic_m15/banner_matematica-codice.webp",
    "title": "La Matemática",
    "color": "#F9A825",
    "btnImage": "/assets/maya/infographic_m15/btn_matematica-codice.jpg",
    "image": "/assets/maya/infographic_m15/hero_matematica-codice.jpg",
    "content": [
      "La base intelectual que sostiene todo el aparato astronómico del Códice de Dresde es un sofisticado sistema matemático posicional vigesimal (base 20) que constituye uno de los pináculos del pensamiento abstracto de la antigüedad. Mientras que las matemáticas romanas eran incapaces de realizar multiplicaciones o divisiones complejas, los matemáticos mayas operaban con soltura aritmética manejando magnitudes astronómicas millonarias.",
      "El sistema notacional maya requería únicamente de tres símbolos gráficos elementales: un punto para el valor unitario de uno, una barra horizontal para el valor de cinco y una estilizada concha marina o flor de cuatro pétalos para representar el cero posicional. Con estos tres signos sencillos, dispuestos verticalmente en niveles superpuestos de valor creciente (1, 20, 400, 8,000, 160,000), podían escribir cualquier número imaginable.",
      "En el Códice de Dresde, los escribas emplearon una variante adaptada a la cronología astronómica, donde el tercer nivel numérico se multiplicaba por 18 en lugar de 20 para acercarse al año solar: 20 × 18 = 360 días (un Tun). Los niveles superiores continuaban multiplicándose por 20: el K'atun de 7,200 días y el B'ak'tun de 144,000 días, permitiendo registrar ciclos históricos continuos a lo largo de decenas de siglos sin error.",
      "Un elemento matemático asombroso en el manuscrito son los llamados «Números de Serpiente», que aparecen en las páginas 61 a 69. Estos números consisten en colosales columnas de cifras vigesimales inscritas dentro de las ondulaciones del cuerpo de serpientes emplumadas gigantescas. Estas cuentas registran intervalos temporales colosales de más de doce millones de días que proyectan fechas míticas al origen de la creación cósmica.",
      "Asimismo, el códice utiliza ingeniosos factores multiplicadores llamados «números de anillo», que permitían a los astrónomos calcular hacia atrás en el tiempo para fijar eventos celestes antiguos que sirvieran como puntos de calibración o fecha cero para las tablas de efemérides. Esta disciplina combinatoria confirma que los mayas trataban al tiempo no como una abstracción poética, sino como una ciencia métrica exacta."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El concepto matemático del cero como marcador de posición vacía y valor nulo fue inventado por los astrónomos mayas en el periodo Preclásico Tardío (alrededor del 36 a.C.), varios siglos antes de que los matemáticos de la India desarrollaran el cero de forma independiente en el siglo V d.C. y más de un milenio antes de su adopción en Europa."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La base vigesimal (base 20) utilizada por los mayas tiene su origen fisiológico en el conteo humano con los diez dedos de las manos y los diez dedos de los pies. En las lenguas mayenses, la palabra que designa al número veinte (Uinik o Winik) es la misma palabra que traduce «persona completa» o «ser humano entero», reflejando una matemática encarnada."
      }
    ],
    "fact": "En las páginas 61 y 62 del Códice de Dresde, los Números de Serpiente registran una cifra calendárica equivalente a más de 34,000 años solares continuos proyectados hacia el pasado primordial. Ningún otro documento manuscrito conservado en todo el continente americano maneja intervalos de tiempo tan inmensos con tanta rigurosidad posicional."
  },
  {
    "id": "supervivencia-codice",
    diagramImage: '/assets/maya/infographic_m15/diagram_supervivencia-codice.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Supervivencia',
    "bannerImage": "/assets/maya/infographic_m15/banner_supervivencia-codice.webp",
    "title": "Supervivencia",
    "color": "#FFF8E1",
    "btnImage": "/assets/maya/infographic_m15/btn_supervivencia-codice.jpg",
    "image": "/assets/maya/infographic_m15/hero_supervivencia-codice.jpg",
    "content": [
      "La existencia contemporánea del Códice de Dresde es un auténtico milagro de la historia de la conservación del patrimonio cultural de la humanidad. Durante la conquista y colonización española de Yucatán en el siglo XVI, cientos de manuscritos jeroglíficos mayas fueron confiscados y destruidos sistemáticamente en hogueras inquisitoriales, entre las cuales destaca el infame Auto de Fe de Maní perpetrado por fray Diego de Landa en 1562.",
      "De las decenas de miles de libros científicos y religiosos que resguardaban el saber de las cortes mayas, únicamente sobrevivieron cuatro manuscritos auténticos reconocidos por la comunidad internacional: el Códice de Dresde en Alemania, el Códice de París en Francia, el Códice de Madrid en España y el Códice Maya de México (antes conocido como Códice Grolier). De todos ellos, el de Dresde es el más extenso, bello y científico.",
      "Sin embargo, las amenazas contra el códice continuaron en el siglo XX en suelo europeo. Durante la Segunda Guerra Mundial, en la noche del 13 al 14 de febrero de 1945, la ciudad de Dresde fue sometida a un devastador bombardeo aéreo aliado que destruyó la mayor parte del centro histórico y el edificio barroco de la Biblioteca Real Japonesa donde se resguardaban las colecciones bibliográficas más preciadas de Sajonia.",
      "Afortunadamente, el códice había sido evacuado y almacenado preventivamente dentro de una caja metálica estanca en las bodegas subterráneas de un castillo cercano. No obstante, la rotura de tuberías y las filtraciones masivas de agua durante los ataques provocaron daños por humedad que afectaron los bordes superiores de varias láminas, desvaneciendo parcialmente algunas líneas glíficas y pigmentos de caliza.",
      "Hoy en día, el manuscrito se preserva bajo condiciones atmosféricas de temperatura y humedad estrictamente controladas en una bóveda de alta seguridad de la Biblioteca Estatal y Universitaria de Sajonia (SLUB) en Dresde. Totalmente digitalizado en resolución milimétrica de ultra alta definición, el Códice de Dresde continúa siendo descifrado por epigrafistas globales como un testimonio eterno del genio cósmico maya."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Antes de los bombardeos de la Segunda Guerra Mundial, el erudito Ernst Förstemann había publicado en 1880 y 1892 una edición facsimilar litográfica de extraordinaria fidelidad fotográfica en color del Códice de Dresde. Estas copias facsimilares tempranas permitieron a los arqueólogos reconstruir los fragmentos dañados por el agua en 1945."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las técnicas modernas de imagen multiespectral (MSI) y fluorescencia de rayos X (XRF) aplicadas al Códice de Dresde han permitido leer trazos de pintura y glifos subyacentes borrados por el agua en 1945. Al iluminar el documento con distintas longitudes de onda, desde el ultravioleta hasta el infrarrojo, los pigmentos antiguos vuelven a revelarse."
      }
    ],
    "fact": "El Códice de Dresde fue inscrito en el Registro de la Memoria del Mundo de la UNESCO como Patrimonio Documental de la Humanidad. Es considerado el tratado astronómico más antiguo y sofisticado producido en el continente americano antes de la llegada de los europeos, constituyendo un puente invaluable entre el conocimiento antiguo y la ciencia contemporánea."
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
      hue: Math.random() > 0.5 ? '198,40,40' : '21,101,192', // Red or Blue (codex colors)
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

// ─── Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(198,40,40,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C62828','#5D4037','#1565C0','#212121','#00695C','#F9A825','#FFF8E1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <rect x="290" y="20" width="20" height="20" fill="none" stroke="#C62828" strokeWidth="1.5" opacity="0.6" rx="3" />
        <circle cx="300" cy="30" r="4" fill="#C62828" opacity="0.5" />
        <line x1="285" y1="30" x2="315" y2="30" stroke="#C62828" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(198,40,40,0.2)" />
            <stop offset="50%" stopColor="rgba(198,40,40,0.9)" />
            <stop offset="100%" stopColor="rgba(198,40,40,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C62828" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CÃƒ"DICE DE DRESDE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(198,40,40,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL LIBRO ASTRONÃƒ"MICO DE LOS MAYAS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,248,225,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
          layoutId="activeDotMaya"
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

// ─── Expandable Section with Random Direction ────────────────────────────────
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
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.8rem 1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
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

// ─── Content Panel ────────────────────────────────────────────
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
        background: 'rgba(25, 20, 15, 0.92)',
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
          }} />
        </div>

        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{
              margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none',
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#000',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{
                  margin: 0, fontSize: '0.95rem', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
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
          <div style={{
            marginTop: '2rem', padding: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}40`,
            borderRadius: '16px',
            display: 'flex', gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
              borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase',
              }}>
                Sabiduría Códice
              </span>
              <p style={{
                margin: '0.3rem 0 0', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.92rem', lineHeight: 1.7,
              }}>
                {node.fact}
              </p>
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
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(198,40,40,0.15)',
    }}>
      <Star size={14} style={{ color: '#C62828', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C62828, #F9A825)', borderRadius: '3px', boxShadow: '0 0 8px rgba(198,40,40,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C62828', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM15() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(15,10,10,0.85) 0%, rgba(20,15,10,0.8) 40%, rgba(15,10,10,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <MayaHeader />
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '1rem',
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

        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel
              key={activeData.id}
              node={activeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', padding: '3rem',
                color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: '16px',
                marginTop: '1rem',
              }}
            >
              <Sparkles size={32} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Selecciona un nodo interactivo para explorar los misterios astronómicos y matemáticos del Códice de Dresde.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Bibliografía y Fuentes del Módulo
          </h4>
          <ul style={{
            margin: 0, padding: 0, listStyle: 'none',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                lineHeight: 1.4,
              }}>
                <span style={{ color: '#C62828' }}>─â€“Â </span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox src={lightboxSrc} alt="Codex detailed view" onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
