'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya Venus / War themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoVenusStar({ size = 70, color = '#E0E0E0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 2 L34 22 L54 26 L36 34 L40 54 L30 40 L20 54 L24 34 L6 26 L26 22 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <path d="M10 10 L20 20 M50 10 L40 20 M10 50 L20 40 M50 50 L40 40" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoWarShield({ size = 70, color = '#B71C1C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Spears crossed */}
      <line x1="10" y1="10" x2="50" y2="50" stroke={color} strokeWidth="2" opacity="0.7" />
      <line x1="50" y1="10" x2="10" y2="50" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.5" />
      {/* Feathers */}
      <path d="M5 30 Q0 40 10 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M55 30 Q60 40 50 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoFeatheredSerpent({ size = 80, color = '#1B5E20', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M5 20 Q20 5 40 20 T75 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 22 Q25 7 40 22 T70 22" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Feathers along the body */}
      {[15, 30, 45, 60].map((x, i) => (
        <path key={i} d={`M${x} ${20 + (i%2 === 0 ? -5 : 5)} L${x-5} ${10 + (i%2 === 0 ? -5 : 5)}`} stroke={color} strokeWidth="1" opacity="0.6" />
      ))}
      <circle cx="75" cy="18" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoDresdenPage({ size = 60, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="5" width="30" height="50" fill="none" stroke={color} strokeWidth="2" />
      <line x1="20" y1="15" x2="40" y2="15" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="25" x2="35" y2="25" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="35" x2="40" y2="35" stroke={color} strokeWidth="1.5" />
      {/* Maya dot/bar numbers */}
      <circle cx="22" cy="45" r="2" fill={color} />
      <circle cx="28" cy="45" r="2" fill={color} />
      <line x1="20" y1="50" x2="30" y2="50" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoHorizonMarker({ size = 70, color = '#F48FB1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <path d="M10 50 L30 20 L50 50 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 50 L30 35 L40 50 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="12" r="4" fill={color} opacity="0.8" />
      {/* Rays */}
      <line x1="30" y1="4" x2="30" y2="0" stroke={color} strokeWidth="1" />
      <line x1="22" y1="8" x2="18" y2="4" stroke={color} strokeWidth="1" />
      <line x1="38" y1="8" x2="42" y2="4" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'noh-ek': [DecoVenusStar, DecoHorizonMarker, DecoDresdenPage],'ciclo-sinodico': [DecoDresdenPage, DecoVenusStar, DecoFeatheredSerpent],'tabla-dresde': [DecoDresdenPage, DecoVenusStar, DecoHorizonMarker],'guerra-estelar': [DecoWarShield, DecoVenusStar, DecoFeatheredSerpent],'kukulkan-venus': [DecoFeatheredSerpent, DecoVenusStar, DecoWarShield],'observacion-tecnicas': [DecoHorizonMarker, DecoVenusStar, DecoDresdenPage],'legado-venusino': [DecoVenusStar, DecoDresdenPage, DecoFeatheredSerpent], }; const BIBLIOGRAPHY = ['Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Schele, L. & Freidel, D. (1990). A Forest of Kings: The Untold Story of the Ancient Maya, William Morrow',
  'Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "noh-ek",
    "bannerImage": "/assets/maya/infographic_m7/banner_noh-ek.webp",
    "title": "Noh Ek: La Gran Estrella",
    "color": "#E0E0E0",
    "btnImage": "/assets/maya/infographic_m7/btn_noh-ek.jpg",
    "image": "/assets/maya/infographic_m7/hero_noh-ek.jpg",
    "content": [
      "En el panteón celeste de la civilización maya, el planeta Venus ocupaba el lugar más prominente y temido después de las dos luminarias mayores, el Sol y la Luna. Conocido en lengua maya clásica bajo diversos nombres reverenciales como Noh Ek («la Gran Estrella»), Chak Ek («la Estrella Gigante o Roja») o Xux Ek («la Estrella Avispa»), este deslumbrante punto de luz no era considerado un cuerpo inerte, sino una poderosa deidad viva cargada de presagios bélicos y transformaciones cósmicas.",
      "A diferencia de las culturas occidentales que asociaron a Venus con la diosa de la belleza y el amor pacífico, los pueblos mesoamericanos proyectaron sobre este planeta una naturaleza marcial, agresiva y sumamente peligrosa. Venus era concebido como un arquero cósmico armado con dardos de luz letales (conocidos como flechas astrales) que disparaba periódicamente hacia la Tierra al culminar sus periodos de invisibilidad, hiriendo a gobernantes, marchitando sementeras y trayendo plagas a las ciudades.",
      "Los mitógrafos mayas personificaban a Venus a través de varias entidades sobrenaturales complementarias según su posición en el cielo. En su fase de estrella matutina al oriente, era encarnado por dioses coléricos y armados con propulsores atlatl como Lahun Chan o Tlahuizcalpantecuhtli, provisto de garras y rostro esquelético. En su manifestación vespertina al poniente, se vinculaba estrechamente con Kukulcán, la Serpiente Emplumada que descendía al inframundo.",
      "Los sacerdotes astrónomos vigilaban cotidianamente las trayectorias de Venus desde las terrazas de sus observatorios con una mezcla de fascinación científica y pavor religioso. El brillo del planeta en el cielo nocturno y crepuscular es tan intenso que es el único cuerpo celeste, aparte de la Luna y el Sol, capaz de arrojar sombras perceptibles de objetos sobre el suelo terrestre y de permanecer visible a simple vista a pleno mediodía en condiciones atmosféricas favorables.",
      "El estudio sistemático de Noh Ek sentó las bases para el desarrollo de la astronomía observacional cuantitativa en ciudades como Copán, Palenque, Tikal, Uxmal y Chichén Itzá. El seguimiento ininterrumpido de sus ortos y ocasos a lo largo de los siglos permitió a los mayas descubrir las leyes armónicas que rigen su mecánica orbital, convirtiendo a Venus en el metrónomo cósmico sobre el cual se calibraban los grandes ritos de Estado y las alianzas políticas del imperio."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Bajo cielos tropicales completamente oscuros y despejados de contaminación lumínica, el planeta Venus alcanza una magnitud aparente máxima de -4.9. En estas condiciones excepcionales, la luz de Venus es suficiente para permitir a una persona leer un códice jeroglífico en la selva e identificar sombras nítidas sobre muros blancos de cal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La arqueoastrónoma Susan Milbrath comprobó que las representaciones escultóricas de Venus en los frisos del periodo Clásico varían de aspecto según la fase orbital: cuando el planeta es estrella de la mañana luce un tocado de deidad solar guerrera, mientras que como estrella de la tarde porta atuendos asociados a las deidades acuáticas del inframundo."
      }
    ],
    "fact": "Venus, llamado Noh Ek o Chak Ek por los mayas, era la deidad planetaria más reverenciada y temida de Mesoamérica, monitoreada como un arquero cósmico cuyos rayos inaugurales al amanecer definían el inicio de temporadas de guerra, tratados de paz y ritos de coronación real en las cortes del periodo Clásico."
  },
  {
    "id": "ciclo-sinodico",
    "bannerImage": "/assets/maya/infographic_m7/banner_ciclo-sinodico.webp",
    "title": "Ciclo Sinódico: La Danza Cósmica",
    "color": "#FFD600",
    "btnImage": "/assets/maya/infographic_m7/btn_ciclo-sinodico.jpg",
    "image": "/assets/maya/infographic_m7/hero_ciclo-sinodico.jpg",
    "content": [
      "El ciclo sinódico de Venus es el tiempo exacto que tarda el planeta en completar una vuelta completa de fases aparentes y regresar a la misma posición relativa respecto a la Tierra y al disco del Sol. Desde la perspectiva astronómica contemporánea, este intervalo orbital posee una duración media real de 583.92 días terrestres. Los sabios mayas lograron calcular este ciclo con pasmosa exactitud, redondeándolo canónicamente en una cifra entera de 584 días solares.",
      "Los astrónomos de la corte dividieron estos 584 días del ciclo en cuatro fases canónicas perfectamente delimitadas, reflejadas con absoluta fidelidad en los registros glíficos de los códices prehispánicos: la primera fase consistía en 236 días continuos en los que el planeta brillaba como lucero del alba en el horizonte oriental antes del amanecer, acompañando el nacimiento diario del astro solar.",
      "A continuación, el planeta entraba en una segunda etapa de 90 días de invisibilidad total conocida como la conjunción superior, periodo durante el cual Venus pasaba por detrás del Sol desde la perspectiva visual terrestre y quedaba completamente eclipsado por el resplandor diurno. Tras esta ausencia, emergía la tercera fase: 250 días en los que brillaba majestuosamente como lucero vespertino sobre el horizonte poniente justo después del atardecer.",
      "Finalmente, el ciclo culminaba con la cuarta y más crítica etapa: 8 días de invisibilidad absoluta durante la conjunción inferior, cuando el planeta cruzaba el espacio entre la Tierra y el Sol. Tras estos ocho días de reclusión metafórica en las tinieblas de la muerte en el inframundo, Venus reaparecía de forma fulgurante por el oriente en su orto helíaco matutino, acontecimiento que marcaba el renacimiento triunfal del ciclo cósmico ante la mirada atenta de los sacerdotes.",
      "La suma exacta de estas cuatro fases (236 + 90 + 250 + 8 = 584 días) estructuraba una danza geométrica inmutable en la bóveda nocturna. Aunque las duraciones reales de visibilidad varían ligeramente debido a la excentricidad orbital de la Tierra y Venus, los astrónomos mayas idearon este modelo canónico modular para integrar las observaciones empíricas dentro de su sistema de numeración vigesimal y sincronizarlo con el calendario civil Haab'."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los ocho días de desaparición de Venus durante su conjunción inferior fueron interpretados mitológicamente en el Popol Vuh como el descenso y agonía de los Héroes Gemelos Hunahpú e Ixbalanqué en el inframundo de Xibalbá, de donde logran resucitar victoriosos convertidos en el Sol y la Gran Estrella de la mañana."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La duración media de 583.92 días del periodo sinódico de Venus genera que en cinco ciclos completos (2,919.6 días) transcurran prácticamente ocho años trópicos solares exactos (2,921.9 días), creando un ciclo de resonancia orbital casi perfecto de 8:13 entre la Tierra y Venus alrededor de nuestra estrella común."
      }
    ],
    "fact": "El periodo sinódico de Venus de 584 días fue subdividido por los mayas en 4 estaciones exactas: 236 días como estrella matutina oriental, 90 días oculto en conjunción superior, 250 días como estrella vespertina occidental y 8 días de tránsito invisible en conjunción inferior antes de su dramático orto helíaco."
  },
  {
    "id": "tabla-dresde",
    "bannerImage": "/assets/maya/infographic_m7/banner_tabla-dresde.webp",
    "title": "Las Tablas de Venus: El Códice de Dresde",
    "color": "#0288D1",
    "btnImage": "/assets/maya/infographic_m7/btn_tabla-dresde.jpg",
    "image": "/assets/maya/infographic_m7/hero_tabla-dresde.jpg",
    "content": [
      "El documento científico más extraordinario que sobrevive sobre la astronomía prehispánica son las célebres Tablas de Venus, contenidas en las páginas 46 a 50 del Códice de Dresde, un manuscrito jeroglífico maya de papel amate plegado en biombo que data del periodo Posclásico (alrededor del año 1200 d.C.). Estas cinco láminas polícromas componen una sofisticada efeméride astronómica diseñada para predecir las posiciones de Venus a lo largo de siglos enteros.",
      "La base matemática de la tabla descansa en la sincronización de cinco ciclos sinódicos consecutivos de Venus de 584 días cada uno con ocho años solares Haab' de 365 días. La ecuación fundamental labrada por los escribas establece que: 5 × 584 = 2,920 días solares, cifra que coincide exactamente con: 8 × 365 = 2,920 días. Al desplegarse a través de las cinco páginas del códice, la tabla abarca un gran ciclo mayor de 65 revoluciones de Venus (65 × 584 = 37,960 días), equivalentes a dos Ruedas Calendáricas o 104 años solares completos.",
      "Sin embargo, dado que el ciclo sinódico real es de 583.92 días y no de 584 enteros, cada revolución de Venus acumula un desfase de 0.08 días en la realidad astronómica. Al término de los 65 ciclos del códice (104 años solares), el error temporal acumulado asciende a 5.2 días enteros de adelanto frente al firmamento real, una discrepancia inaceptable que habría desfasado por completo las fechas sagradas del orto helíaco.",
      "Para solucionar este problema con genialidad inigualable, los matemáticos mayas introdujeron en la página 24 del códice una tabla de factores de corrección intercalar mediante un mecanismo de reinicio prefijado. Diseñaron una regla que ordenaba restar 4 días al cómputo acumulado al llegar al ciclo sinódico número 61 (unos 97.5 años), y una corrección alternativa que descontaba 8 días tras 301 ciclos sinódicos (unos 481 años solares).",
      "Con la aplicación metódica de este algoritmo correctivo, la desviación matemática de las tablas de Venus del Códice de Dresde se reduce a tan solo un día de error después de transcurrir más de seis milenios de proyección temporal hacia el futuro. Esta proeza de cálculo posicional vigesimal sitúa al Códice de Dresde en la cúspide de los tratados científicos de la historia de la astronomía mundial premoderna."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El Códice de Dresde sobrevivió milagrosamente a los bombardeos que destruyeron la ciudad de Dresde durante la Segunda Guerra Mundial en 1945. Resguardado en una caja de seguridad inundada en los sótanos de la Biblioteca Real de Sajonia, el manuscrito fue restaurado cuidadosamente, preservando sus tablas astronómicas para la ciencia moderna."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El mayista británico J. Eric S. Thompson descifró en 1972 la estructura interna de las páginas 46 a 50 del Códice de Dresde, revelando que cada una de las cinco páginas está dividida en cuatro registros horizontales que enumeran los glifos de los días del Tzolk'in, los dioses patronos y las imágenes del arquero cósmico atacando víctimas terrestres."
      }
    ],
    "fact": "Las Tablas de Venus del Códice de Dresde sincronizan 5 periodos sinódicos de 584 días con 8 años Haab' de 365 días (2,920 días), aplicando factores de corrección intercalar de -4 días cada 61 ciclos que reducen el margen de error a tan solo 1 día en más de 6,000 años de cálculo continuo, superando en precisión matemática a casi todos los modelos astronómicos contemporáneos del continente europeo."
  },
  {
    "id": "guerra-estelar",
    "bannerImage": "/assets/maya/infographic_m7/banner_guerra-estelar.webp",
    "title": "Guerra Estelar: Batallas Celestiales",
    "color": "#B71C1C",
    "btnImage": "/assets/maya/infographic_m7/btn_guerra-estelar.jpg",
    "image": "/assets/maya/infographic_m7/hero_guerra-estelar.jpg",
    "content": [
      "En la historia militar del periodo Clásico maya, la observación astronómica de Venus no era una mera devoción pasiva; era el catalizador estratégico que determinaba el estallido de las guerras más cruentas y decisivas entre las grandes dinastías reales. Los epigrafistas modernos han acuñado el término «guerra estelar» o «guerra venusina» para clasificar una serie de batallas registradas en monumentos asociadas directamente a conjunciones críticas del planeta.",
      "En las inscripciones jeroglíficas labradas en estelas y escalinatas de ciudades como Tikal, Calakmul, Caracol, Naranjo y Dos Pilas, este tipo de conflicto bélico sagrado se identifica mediante un signo distintivo conocido como el «glifo de la concha y la estrella» (Star-Shell glyph). Este jeroglífico muestra una concha marina estilizada coronada por el signo celeste de Venus emitiendo rayos o gotas líquidas de agua o sangre sobre el topónimo de la ciudad derrotada.",
      "Las guerras estelares no eran escaramuzas fronterizas rutinarias, sino operaciones militares a gran escala diseñadas para derrocar linajes gobernantes enteros, decapitar reyes capturados y someter metrópolis rivales al vasallaje perpetuo. Los comandantes militares programaban sus ataques para coincidir con momentos astronómicos de máxima influencia de Venus: principalmente durante su primera aparición en el orto helíaco o en sus puntos de estacionamiento orbital cuando el planeta detenía su movimiento aparente.",
      "Uno de los ejemplos históricos más célebres ocurrió el 16 de enero del año 378 d.C., cuando el general teotihuacano Siyaj K'ak' («Nace el Fuego») arribó a Tikal bajo el auspicio del lucero matutino, deponiendo y ejecutando al rey local Chak Tok Ich'aak I para instaurar una nueva dinastía aliada con el centro de México. Siglos después, en el año 562 d.C., la ciudad de Caracol infligió una devastadora derrota estelar a Tikal que sumió a esta última en un silencio monumental de más de un siglo.",
      "Para los guerreros mayas de élite, combatir bajo el estandarte de Venus significaba actuar como instrumentos físicos de los señores celestiales en la Tierra. Los cautivos capturados en estas campañas estelares eran conducidos en procesión solemne hasta las terrazas de las pirámides, donde eran despojados de sus insignias de jade y ofrendados a los dioses al amanecer en el momento en que Noh Ek se elevaba en el horizonte matutino."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los guerreros mayas que participaban en las guerras de Venus portaban cascos de mosaico de pirita y tocados con forma de serpientes emplumadas o anteojeras de estilo teotihuacano asociadas a Tláloc y al planeta Venus, transformando su apariencia física en la de espíritus marciales temibles para aterrorizar a los ejércitos adversarios."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El arqueólogo David Freidel y la epigrafista Linda Schele correlacionaron matemáticamente decenas de fechas de batallas registradas con el glifo de concha-estrella con los cálculos modernos de efemérides planetarias de la NASA, demostrando que más del 75% de estas ofensivas coincidieron con máximas elongaciones o paradas de Venus."
      }
    ],
    "fact": "Las batallas registradas bajo el glifo de la guerra estelar (concha y estrella de Venus) en ciudades como Tikal, Calakmul y Caracol fueron coordinadas militarmente para coincidir con fases críticas de Noh Ek (como ortos helíacos o estacionamientos orbitales), resultando en el derrocamiento y sacrificio de dinastías enteras."
  },
  {
    "id": "kukulkan-venus",
    "bannerImage": "/assets/maya/infographic_m7/banner_kukulkan-venus.webp",
    "title": "Kukulcán: La Serpiente y Venus",
    "color": "#1B5E20",
    "btnImage": "/assets/maya/infographic_m7/btn_kukulkan-venus.jpg",
    "image": "/assets/maya/infographic_m7/hero_kukulkan-venus.jpg",
    "content": [
      "La figura mitológica de Kukulcán, cuyo nombre en lengua maya yucateca significa literalmente «Serpiente Emplumada» (de k'uk', pluma de quetzal; y kan, serpiente), encarna una de las síntesis teológicas y astronómicas más ricas de la América prehispánica. Equivalente directo del Quetzalcóatl del altiplano central de México, Kukulcán no solo era la deidad tutelar del viento, del aliento vital y del comercio, sino la personificación cósmica viva del planeta Venus.",
      "En el pensamiento religioso maya del periodo Posclásico, el vuelo sinuoso de la serpiente cubierta de plumas de quetzal verde esmeralda simbolizaba el movimiento aparente del planeta Venus ondulando a través de la eclíptica celeste entre las constelaciones. Como deidad del viento o Ehécatl, Kukulcán actuaba como el mensajero divino que barría los caminos del cielo con ráfagas de aire fresco para despejar la atmósfera y anunciar la inminente llegada de las lluvias torrenciales de Chaac.",
      "Esta profunda conexión entre Venus y Kukulcán se materializó de forma grandiosa en la arquitectura monumental de Chichén Itzá y Mayapán. Los templos de planta circular, como El Caracol y los adoratorios redondos de la península, estaban consagrados a esta deidad serpentina debido a que las formas cilíndricas sin esquinas no oponen resistencia al viento y facilitan las líneas de mira panorámicas hacia los puntos extremos de salida y puesta del planeta en el horizonte.",
      "Incluso el famoso descenso de la serpiente de luz y sombra en la escalinata norte de El Castillo durante los equinoccios de primavera y otoño encierra una lectura venusina complementaria. Para los sabios iniciados, la sombra ondulante de siete triángulos no solo representaba el descenso del dios a la tierra agrícola, sino la unión mística entre la energía solar y los ciclos sinódicos del lucero que fecundaban el suelo de la península.",
      "Los soberanos de Chichén Itzá adoptaban el título honorífico de Kukulcán para legitimar su derecho divino a gobernar sobre pueblos diversos. Al presentarse ante la multitud como la encarnación terrestre de la Serpiente Emplumada de Venus, los reyes demostraban su capacidad de intermediación entre las leyes implacables del cosmos y la prosperidad tangible de sus súbditos, asegurando la cohesión social y religiosa del Estado."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En las pinturas murales polícromas del Templo de los Guerreros de Chichén Itzá, Kukulcán aparece retratado emergiendo directamente de las fauces abiertas de una colosal serpiente con plumas verdes de quetzal, sosteniendo en sus manos dardos y escudos redondos con el símbolo de la cruz cósmica de cuatro pétalos de Venus."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los análisis iconográficos en cerámica mayapán confirman que el glifo calendárico 1 Ajaw, asignado en el Códice de Dresde como el día inaugural supremo de la tabla de Venus, era considerado el cumpleaños cósmico y el nombre calendárico sagrado de la deidad Kukulcán en toda la península de Yucatán, asociando el orto helíaco del lucero del alba con la llegada de presagios de combate, renovación política y transformaciones imperiales profundas."
      }
    ],
    "fact": "Kukulcán («Serpiente Emplumada») constituía el avatar mitológico de Venus en la teología maya posclásica, personificando el viento huracanado que precede a las lluvias fértiles y gobernando los templos circulares como El Caracol mediante alineaciones orientadas hacia los extremos orbitales del planeta."
  },
  {
    "id": "observacion-tecnicas",
    "bannerImage": "/assets/maya/infographic_m7/banner_observacion-tecnicas.webp",
    "title": "Técnicas Sin Telescopios",
    "color": "#F48FB1",
    "btnImage": "/assets/maya/infographic_m7/btn_observacion-tecnicas.jpg",
    "image": "/assets/maya/infographic_m7/hero_observacion-tecnicas.jpg",
    "content": [
      "Uno de los aspectos que genera mayor asombro entre los científicos modernos es la capacidad de los astrónomos mayas para obtener mediciones posicionales de extrema precisión sin haber dispuesto jamás de telescopios refractores de lentes ópticas, tubos de aumento ni instrumentos metálicos de medición angular como sextantes o teodolitos. Su ciencia fue una disciplina puramente visual y geométrica basada en el ingenio metódico de la observación horizonaria.",
      "La técnica fundamental desarrollada por los sabios ah k'inob consistía en el uso de mirillas y líneas de colimación fija de piedra caliza. Dentro de las cámaras altas de edificios como El Caracol de Chichén Itzá o las torres del palacio de Palenque, los observadores fijaban ranuras estrechas en muros gruesos de mampostería. En los marcos de estas ventanas instalaban soportes de madera donde colocaban pares de varillas rígidas cruzadas fabricadas de caña o hueso de jaguar.",
      "Al mirar a través del punto exacto donde se cruzaban las varillas y hacerlas coincidir con un rasgo destacado del paisaje distante (como una pirámide lejana, una estela aislada en una loma o un árbol sagrado en el horizonte), los astrónomos creaban un sistema de puntería fija inalterable. Cuando el disco solar o el fulgor puntual de Venus tocaban la intersección en el horizonte al amanecer o atardecer, registraban el día exacto de la efeméride en sus códices.",
      "Para estudiar los astros sin deslumbrarse y sin forzar la vista durante prolongadas vigilias nocturnas, los mayas perfeccionaron el uso de reflectores artificiales planos. Llenaban cuencos de cerámica negra bruñida con agua estancada teñida con carbón vegetal para transformarla en un espejo líquido perfecto donde observaban con nitidez el reflejo de las estrellas y de los planetas brillantes sin interferencia del viento.",
      "Asimismo, empleaban espejos cóncavos y planos elaborados con teselas unidas de pirita de hierro y obsidiana volcánica pulida con arena abrasiva fina. Estos espejos no solo eran insignias de poder sacerdotal portadas sobre el pecho, sino herramientas auxiliares que permitían proyectar haces de luz solar en el interior de recintos oscuros para calibrar gnomones verticales y medir la inclinación exacta de la sombra al mediodía verdadero."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas masticaban hojas medicinales y utilizaban colirios elaborados con extractos de hierbas selváticas para limpiar y humectar sus ojos antes de las guardias nocturnas, logrando dilatar sus pupilas de forma natural para incrementar la sensibilidad visual ante astros tenues en el horizonte, optimizando la agudeza óptica nocturna y la capacidad de registro telescópico a simple vista en condiciones de oscuridad selvática extrema."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Experimentos modernos de arqueología experimental realizados en observatorios mayas confirmaron que el sistema de varillas cruzadas y colimación de mampostería permite alcanzar una resolución angular humana de 0.1 a 0.2 grados de arco, precisión suficiente para detectar las oscilaciones periódicas del ciclo de Venus y los equinoccios."
      }
    ],
    "fact": "La metodología astronómica maya prescindió de lentes mediante el uso de mirillas de mampostería gruesa, varillas de colimación cruzadas, espejos de obsidiana y cuencos reflectores de agua con carbón, logrando una resolución visual angular de hasta 6 minutos de arco en el horizonte despejado de Yucatán."
  },
  {
    "id": "legado-venusino",
    "bannerImage": "/assets/maya/infographic_m7/banner_legado-venusino.webp",
    "title": "El Legado: Maya vs. Europa",
    "color": "#0288D1",
    "btnImage": "/assets/maya/infographic_m7/btn_legado-venusino.jpg",
    "image": "/assets/maya/infographic_m7/hero_legado-venusino.jpg",
    "content": [
      "El balance comparativo entre el conocimiento astronómico desarrollado por los mayas y las ciencias cultivadas en Europa durante el mismo periodo histórico (los siglos del periodo Clásico y Posclásico mesoamericano, contemporáneos a la Alta y Baja Edad Media europea) arroja conclusiones fascinantes que han transformado la historia universal de la ciencia.",
      "Mientras que la Europa medieval se encontraba atada al modelo cosmológico geocéntrico derivado de Claudio Ptolomeo y Aristóteles —que concebía a los planetas incrustados en esferas cristalinas rígidas centradas en una Tierra inmóvil— y empleaba un calendario juliano defectuoso que acumulaba un día completo de error cada 128 años, los astrónomos mayas operaban con modelos matemáticos predictivos cuantitativos de extrema precisión empírica.",
      "En el cálculo específico del ciclo sinódico de Venus, los mayas alcanzaron una exactitud cuantitativa que no fue igualada en Europa sino hasta el siglo XVIII, con las observaciones telescópicas de los tránsitos de Venus realizadas por astrónomos como Edmond Halley y Mijaíl Lomonósov. El factor de corrección del Códice de Dresde, que reduce la desviación a 1 día en más de seis milenios, superó con creces cualquier tabla europea previa a la invención del telescopio.",
      "Esta hazaña intelectual demuestra que el método científico no es patrimonio exclusivo de una sola tradición cultural u occidental. Los astrónomos mayas formularon hipótesis aritméticas rigurosas, llevaron a cabo observaciones sistemáticas estandarizadas a lo largo de decenas de generaciones continuas, registraron anomalías empíricas y diseñaron mecanismos recursivos de autocorrección para mantener la concordancia de sus modelos con la realidad física del cosmos.",
      "El legado de la astronomía venusina maya perdura en nuestros días como un testimonio grandioso de la dignidad y la capacidad intelectual de los pueblos originarios de las Américas. Sus pirámides alineadas con las estrellas, sus códices salvados de las hogueras inquisitoriales y su matemática vigesimal con cero continúan inspirando a las nuevas generaciones de astrónomos y exploradores espaciales en su búsqueda universal por desentrañar los enigmas del firmamento."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cuando el erudito alemán Ernst Förstemann descifró por primera vez las tablas de Venus del Códice de Dresde en 1893 en la Biblioteca Real de Dresde, la comunidad científica europea no podía creer que una civilización indígena americana hubiera alcanzado cálculos aritméticos tan avanzados sin influencia del Viejo Mundo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En el año 2012, astrónomos contemporáneos de todo el mundo apuntaron sus telescopios hacia el tránsito de Venus sobre el disco solar, un evento astronómico extremadamente raro que los mayas habían registrado indirectamente mediante los descensos de luminosidad registrados en sus crónicas de eclipses de la península."
      }
    ],
    "fact": "La astronomía de Venus de los mayas superó en estabilidad matemática al calendario juliano medieval europeo al formular factores de corrección fractal en el Códice de Dresde con un desvío menor a 1 día en 6,000 años, logrando una precisión predictiva que Europa solo igualó con la invención del telescopio en la Edad Moderna."
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      hue: Math.random() > 0.5 ? '224,224,224' : '255,214,0', // Venus white or gold
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

// â”€â”€â”€ Header Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaVenusHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(224,224,224,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E0E0E0','#FFD600','#0288D1','#B71C1C','#1B5E20','#F48FB1','#0288D1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#E0E0E0" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#E0E0E0" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,224,224,0.2)" />
            <stop offset="50%" stopColor="rgba(255,214,0,0.9)" />
            <stop offset="100%" stopColor="rgba(224,224,224,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0E0E0" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">VENUS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(224,224,224,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">EL PLANETA GUERRERO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(224,224,224,0.2)'}`,
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
          layoutId="activeDotMayaM7"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'rgba(10, 12, 30, 0.92)',
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        {/* Left: Hero Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
          }} />
        </div>

        {/* Right: Title + first 2 paragraphs */}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
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
                </div>
              )}
              {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{ color: node.color, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={16} /> Para Exploradores Avanzados
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fact Highlight â”€â”€â”€ */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(45deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}40`,
            borderRadius: '16px',
            position: 'relative',
            zIndex: 2,
            display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
          }}
        >
          <div style={{
            background: `${node.color}25`,
            padding: '1rem', borderRadius: '50%',
            color: node.color,
            boxShadow: `0 0 15px ${node.color}30`,
          }}>
            <Zap size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
              Dato Sorprendente
            </h4>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>
              {node.fact}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      margin: '2rem auto 0', maxWidth: '800px',
      background: 'rgba(0,0,0,0.5)', padding: '1rem 2rem',
      borderRadius: '20px', border: '1px solid rgba(224,224,224,0.1)',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888' }}>
        <span>Progreso del Explorador Astronómico</span>
        <span>{exploredIds.length} / {nodes.length} Nodos</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, background:'linear-gradient(90deg, #E0E0E0, #FFD600, #B71C1C)',
            boxShadow: '0 0 10px rgba(255,214,0,0.5)',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem' }}>
        {nodes.map((n) => {
          const isExplored = exploredIds.includes(n.id);
          return (
            <button
              key={n.id}
              onClick={() => onSelect(n.id)}
              title={n.title}
              style={{
                width: '24px', height: '24px', borderRadius: '50%', background: isExplored ? n.color :'rgba(255,255,255,0.1)',
                border: `2px solid ${isExplored ? '#fff' : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: isExplored ? `0 0 8px ${n.color}` : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM7() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    setActiveNodeId(id === activeNodeId ? null : id);
    if (!exploredIds.includes(id)) {
      setExploredIds((prev) => [...prev, id]);
    }
  };

  const activeNode = INFOGRAPHIC_NODES.find((n) => n.id === activeNodeId);

  return (
    <div style={{
      width: '100%',
      minHeight: '800px',
      background: 'radial-gradient(ellipse at top, #11152c 0%, #05060f 100%)',
      padding: '2rem 1rem',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <TemporalField />

      <MayaVenusHeader />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        marginTop: '2rem',
        position: 'relative',
        zIndex: 2,
      }}>
        {INFOGRAPHIC_NODES.map((node, i) => (
          <NodeButton
            key={node.id}
            node={node}
            index={i}
            isActive={activeNodeId === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeNode && (
          <ContentPanel
            key={activeNode.id}
            node={activeNode}
            onClose={() => setActiveNodeId(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onSelect={handleNodeClick} />

      {/* â”€â”€â”€ Bibliography â”€â”€â”€ */}
      <div style={{
        marginTop: '4rem', padding: '2rem',
        background: 'rgba(0,0,0,0.4)', borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', zIndex: 2,
      }}>
        <h5 style={{ color: '#888', margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Fuentes y Bibliografía
        </h5>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.8rem', fontSize: '0.85rem', color: '#999' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <ChevronRight size={14} style={{ color: '#E0E0E0', flexShrink: 0, marginTop: '3px' }} />
              <span style={{ lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen Ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
