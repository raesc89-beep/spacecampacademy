'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoSerpentHead({ size = 70, color = '#FF6D00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 30 30 40 Q40 50 50 40 L55 45 L50 55 L10 55 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M10 40 L5 30 L15 25 L30 40" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="35" r="3" fill={color} opacity="0.6" />
      <path d="M40 45 Q45 40 50 45" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Feathers */}
      <path d="M15 25 Q20 15 10 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M20 28 Q30 18 20 15" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStaircase({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 55 L55 55 L55 45 L45 45 L45 35 L35 35 L35 25 L25 25 L25 15 L15 15 L15 5 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="15" y1="55" x2="15" y2="15" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="25" y1="55" x2="25" y2="25" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="35" y1="55" x2="35" y2="35" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="45" y1="55" x2="45" y2="45" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
    </svg>
  );
}

function DecoSunRays({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 15 * Math.cos(rad)} y1={30 + 15 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="2" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

function DecoTriangle({ size = 70, color = '#29B6F6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 10,50 50,50" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <polygon points="30,20 18,45 42,45" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <polygon points="30,30 25,40 35,40" fill={color} opacity="0.4" />
      {/* Light ray intersecting */}
      <line x1="0" y1="20" x2="60" y2="40" stroke={color} strokeWidth="1" opacity="0.7" strokeDasharray="4,2" />
    </svg>
  );
}

function DecoCalendarWheel({ size = 70, color = '#00C853', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner dots */}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
      {/* Divisions */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 18 * Math.cos(rad)} y1={30 + 18 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="1" />
        );
      })}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'piramide-castillo': [DecoStaircase, DecoTriangle, DecoCalendarWheel],'equinoccio-serpiente': [DecoSerpentHead, DecoSunRays, DecoTriangle],'geometria-solar': [DecoSunRays, DecoTriangle, DecoStaircase],
  'calendario-piedra': [DecoCalendarWheel, DecoStaircase, DecoSunRays],'acustica-quetzal': [DecoSerpentHead, DecoTriangle, DecoCalendarWheel],'construccion-capas': [DecoStaircase, DecoTriangle, DecoSerpentHead],'patrimonio-mundial': [DecoCalendarWheel, DecoSunRays, DecoStaircase],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lubman, D. (1998). "An Archaeological Study of Chirped Echo from the Mayan Pyramid at Chichén Itzá", JASA, 104',
  'Carlson, J.B. (1999). "Pilgrimage and the Equinox Serpent of Light and Shadow Phenomenon at the Castillo", Archaeoastronomy, 14',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Ringle, W. et al. (1998). "The Return of Quetzalcoatl: Evidence for the Spread of a World Religion", Ancient Mesoamerica, 9',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "piramide-castillo",
    diagramImage: '/assets/maya/infographic_m2/diagram_piramide-castillo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Castillo',
    "bannerImage": "/assets/maya/infographic_m2/banner_cacao-fermentacion.webp",
    "title": "El Castillo",
    "color": "#FF6D00",
    "btnImage": "/assets/maya/infographic_m2/btn_piramide-castillo.jpg",
    "image": "/assets/maya/infographic_m2/hero_piramide-castillo.jpg",
    "content": [
      "El Castillo de Chichén Itzá, conocido formalmente como el Templo de Kukulcán, es la edificación más emblemática de la civilización maya. Erigida en el corazón de la gran explanada ceremonial de la ciudad hacia el año 1000 d.C., durante el periodo Posclásico Temprano, esta imponente pirámide cuadrangular sintetiza la concepción maya del espacio sagrado y el orden cósmico. Su arquitectura monumental fusiona tradiciones constructivas mayas clásicas con influencias estilísticas procedentes del altiplano central de México.",
      "La base cuadrangular del monumento mide exactamente 55.3 metros de longitud por cada uno de sus cuatro costados. El cuerpo piramidal escalonado asciende a través de nueve plataformas superpuestas hasta alcanzar 24 metros de altura vertical, sobre la cual se asienta el templo superior de 6 metros de elevación. La altura total del conjunto alcanza así los 30 metros exactos desde el piso de la plaza, convirtiéndose en el hito visual dominante en toda la planicie boscosa circundante.",
      "Cada una de las cuatro fachadas de la pirámide cuenta con una monumental escalinata central que asciende con una pendiente promedio de 45 grados de inclinación. La escalinata de la fachada norte es la más elaborada del edificio, pues sus balaustradas o muros laterales culminan al nivel del suelo en dos colosales cabezas de serpiente talladas en piedra caliza maciza. Estas cabezas presentan fauces abiertas, lenguas bífidas salientes y ojos almendrados que originalmente contenían incrustaciones de obsidiana pulida.",
      "El templo superior que corona la cúspide posee una entrada orientada hacia el norte flanqueada por dos enormes columnas serpentinas con forma de cascabel. En su interior, el santuario albergaba un altar ceremonial sostenido por figuras antropomorfas de atlantes y un recinto reservado para ofrendas estatales. Desde esta cima privilegiada, los sacerdotes y gobernantes tenían un campo visual ilimitado para presenciar el movimiento del Sol sobre el horizonte y comunicarse visualmente con otras ciudades del territorio yucateco.",
      "Durante el siglo XVI, los conquistadores españoles comandados por Francisco de Montejo denominaron popularmente a la estructura como «El Castillo» debido a su solidez defensiva y a su semejanza con las fortalezas militares de la península ibérica. Sin embargo, su propósito nunca fue militar, sino puramente astronómico, ritual y cosmológico, funcionando como un eje del mundo o axis mundi que conectaba el cielo diurno con los nueve estratos oscuros del inframundo mesoamericano."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los constructores mayas labraron los peldaños de las cuatro escalinatas con una altura progresiva ligeramente decreciente conforme se asciende hacia la cima. Esta técnica de corrección de perspectiva forzada provoca que la pirámide parezca aún más alta e imponente cuando una persona la observa de pie desde la base de la gran plaza ceremonial, engañando con elegancia a la visión humana."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Estudios geofísicos realizados por investigadores de la Universidad Nacional Autónoma de México (UNAM) mediante tomografía de resistividad eléctrica tridimensional confirmaron en 2015 la existencia de un cenote natural de agua dulce ubicado directamente a 20 metros de profundidad debajo del centro geométrico exacto de la pirámide de Kukulcán."
      }
    ],
    "fact": "La pirámide de Kukulcán posee una base cuadrada de 55.3 metros por lado y una masa pétrea estimada en más de 60,000 toneladas de bloques de caliza y mortero de estuco, estructurada para fungir como el epicentro religioso, astronómico y administrativo de Chichén Itzá durante el colapso del periodo Clásico y el auge del Posclásico mesoamericano."
  },
  {
    "id": "equinoccio-serpiente",
    diagramImage: '/assets/maya/infographic_m2/diagram_equinoccio-serpiente.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Serpiente de Luz',
    "bannerImage": "/assets/maya/infographic_m2/banner_cacao-moneda.webp",
    "title": "La Serpiente de Luz",
    "color": "#8D6E63",
    "btnImage": "/assets/maya/infographic_m2/btn_equinoccio-serpiente.jpg",
    "image": "/assets/maya/infographic_m2/hero_equinoccio-serpiente.jpg",
    "content": [
      "El fenómeno arqueoastronómico más célebre de Chichén Itzá ocurre durante las tardes cercanas a los equinoccios de primavera y otoño, en los meses de marzo y septiembre. Conforme el Sol desciende hacia el horizonte poniente alrededor de las 16:00 horas, las aristas salientes de los nueve cuerpos escalonados de la pirámide proyectan su sombra sobre la balaustrada occidental de la escalinata norte. El contraste entre sombra y luz solar directa genera un efecto óptico verdaderamente asombroso sobre la piedra.",
      "De manera gradual y milimétrica, la sombra de las terrazas recorta sobre el muro inclinado una serie de triángulos luminosos isósceles que se van dibujando en secuencia descendente. A las 16:45 horas aproximadamente, siete triángulos equiláteros de luz solar pura quedan perfectamente perfilados a lo largo de la balaustrada. Esta franja luminosa ondulante se conecta sin fisuras con la colosal cabeza de serpiente tallada en la base, dando la ilusión visual de un cuerpo serpentino gigantesco que se desliza.",
      "Para los campesinos mayas de la península de Yucatán, esta proyección visual representaba el descenso físico de Kukulcán, la Serpiente Emplumada, deidad del viento, del agua y de la fertilidad de la tierra. La serpiente descendía desde los cielos celestiales hacia la tierra para fecundar el suelo e iniciar el ciclo de siembra del maíz. Una vez en el suelo, la figura serpentina parecía ingresar metafóricamente en las entrañas de la tierra kárstica a través de los cenotes sagrados que circundan la gran explanada.",
      "El espectáculo visual alcanza su plenitud durante unos 45 minutos antes de la puesta de Sol, cuando los siete triángulos resplandecen con un tono dorado intenso sobre el estuco calizo. Conforme el disco solar toca la línea del horizonte, la sombra envuelve gradualmente la cabeza de la serpiente en la base y el reptil de luz se desvanece en la penumbra crepuscular. Este suceso congregaba a miles de peregrinos de toda Mesoamérica en una festividad agrícola de renovación comunitaria colectiva.",
      "Lejos de ser un truco místico fortuito, el fenómeno de la serpiente de luz es el resultado directo de una sofisticada aplicación de trigonometría, geometría tridimensional y observación solar continua a lo largo de varias generaciones. Los arquitectos mayas calcularon con exactitud el ángulo de elevación y azimut del astro diurno para diseñar la curvatura, la altura de las terrazas y el grosor de los tableros con el propósito de sincronizar el monumento con el compás de las estaciones terrestres."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Aunque la multitud moderna se reúne en Chichén Itzá principalmente el 21 de marzo para celebrar el equinoccio de primavera, los arqueoastrónomos han demostrado que el juego de los siete triángulos de luz y sombra es visible con igual nitidez y dramatismo durante un periodo de tres días continuos antes y después de la fecha equinoccial astronómica."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El arqueólogo mexicano Luis E. Arochi fue uno de los primeros científicos en documentar fotográficamente de manera sistemática en la década de 1970 el fenómeno del descenso equinoccial de Kukulcán, demostrando que la inclinación de la balaustrada de 45 grados y el corte de los cuerpos piramidales fueron concebidos deliberadamente para actuar como pantalla de proyección solar."
      }
    ],
    "fact": "La formación de los siete triángulos de luz solar que configuran el cuerpo de la serpiente en la escalinata norte de El Castillo requiere una alineación angular exacta de la estructura orientada a 17 grados al este del norte geográfico, una orientación que se vincula matemáticamente con la trayectoria solar del cenit y los equinoccios tropicales."
  },
  {
    "id": "geometria-solar",
    diagramImage: '/assets/maya/infographic_m2/diagram_geometria-solar.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Geometría Solar',
    "bannerImage": "/assets/maya/infographic_m2/banner_cacao-origen.webp",
    "title": "Geometría Solar",
    "color": "#FFD600",
    "btnImage": "/assets/maya/infographic_m2/btn_geometria-solar.jpg",
    "image": "/assets/maya/infographic_m2/hero_geometria-solar.jpg",
    "content": [
      "El Castillo de Chichén Itzá no está alineado con los cuatro puntos cardinales astronómicos exactos, sino que su fachada principal presenta una desviación deliberada de aproximadamente 17 grados hacia el este del norte geográfico. Esta ligera inclinación no fue producto de un error constructivo, sino de una meditada decisión geométrica común a múltiples urbes del área maya y mesoamericana central. Dicha orientación responde a la necesidad de coordinar los rumbos arquitectónicos con ciclos de salida y puesta del Sol.",
      "La orientación de 17 grados permite que el eje perpendicular de la fachada norte apunte directamente hacia la puesta de Sol durante el día del paso cenital solar en mayo, cuando el astro rey alcanza el punto vertical más alto en la bóveda celeste. En esta latitud intertropical (20.68° N), el Sol cruza dos veces al año el cenit absoluto: el 23 de mayo y el 19 de julio. Estas fechas delimitaban de forma invariable las fases críticas de desmonte de selva, quema de milpa y primera siembra de granos de maíz.",
      "Asimismo, en el solsticio de verano (21 de junio), cuando el Sol alcanza su posición más septentrional en el horizonte, la pirámide experimenta un notable fenómeno de bisección lumínica. Al amanecer, las caras norte y este del monumento quedan completamente iluminadas por los rayos solares mientras que las caras sur y oeste permanecen sumergidas en una penumbra uniforme. Esta división perfecta entre luz y sombra parte el edificio diagonalmente en dos mitades simétricas de luz pura.",
      "Durante el solsticio de invierno (21 de diciembre), el proceso se invierte con rigurosa exactitud geométrica, proyectando patrones de iluminación complementarios en las caras sur y oeste de la estructura. La pirámide funcionaba de este modo como un gnomón tridimensional colosal, cuyas sombras arrojadas sobre la explanada servían a los sabios locales para verificar el avance ininterrumpido de las cuatro estaciones del año tropical y detectar cualquier desviación en los cómputos de los sacerdotes.",
      "El control de la luz solar demostraba el dominio tecnológico de la élite de Chichén Itzá sobre el medio ambiente. Al materializar en bloques de piedra caliza los puntos de detención y retorno del Sol a lo largo del año, los reyes sacerdotes personificaban el vínculo indiscutible entre el orden cósmico superior y la vida cotidiana de las aldeas agrícolas, garantizando el suministro oportuno de alimentos y la estabilidad del reino maya."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas no empleaban instrumentos metálicos como compases o teodolitos de bronce. Para trazar ángulos de 17 grados en el terreno selvático, utilizaban largas cuerdas de fibra vegetal tensadas con pesos de plomo o piedra y estacas de madera alineadas visualmente con la estrella polar antigua y con la salida del Sol en fechas calendáricas específicas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La familia de orientaciones mesoamericanas de 17 grados al este del norte, identificada por el arqueoastrónomo Ivan Šprajc, divide el año solar de 365 días en intervalos múltiplos del calendario sagrado Tzolk'in de 260 días y del ciclo agrícola de 105 días, asegurando una correlación matemática perfecta entre agricultura y religión."
      }
    ],
    "fact": "La desviación de 17 grados este de la pirámide de Kukulcán genera que durante el solsticio de verano la luz matutina ilumine con exactitud matemática el 50% de la masa del edificio, dejando en penumbra simétrica el otro 50%, operando como un reloj solar tridimensional que señalaba el punto de retorno máximo del Sol en el hemisferio norte."
  },
  {
    "id": "calendario-piedra",
    diagramImage: '/assets/maya/infographic_m2/diagram_calendario-piedra.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Calendario en Piedra',
    "bannerImage": "/assets/maya/infographic_m2/banner_cacao-salud.webp",
    "title": "Calendario en Piedra",
    "color": "#29B6F6",
    "btnImage": "/assets/maya/infographic_m2/btn_calendario-piedra.jpg",
    "image": "/assets/maya/infographic_m2/hero_calendario-piedra.jpg",
    "content": [
      "El Castillo es a menudo definido por los arqueólogos y matemáticos como un auténtico calendario solar esculpido en piedra caliza. Cada uno de los elementos arquitectónicos que conforman la pirámide posee un significado numérico vinculado a las cuentas calendáricas mayas: el ciclo solar de 365 días (Haab), el ciclo ritual de 260 días (Tzolk'in) y la Rueda Calendárica de 52 años que sincronizaba ambos sistemas temporales mesoamericanos en una sola marcha regular.",
      "El conteo de los escalones de la pirámide constituye la prueba más visible de esta correlación matemática directa. Cada una de las cuatro caras del edificio cuenta con una escalinata de 91 peldaños tallados individualmente. Al multiplicar 91 por las cuatro escalinatas exteriores se obtiene un total de 364 escalones. Al sumar la plataforma superior común que sirve de antesala al templo de la cúspide, el número total de peldaños asciende a 365, coincidiendo con los días del año solar Haab.",
      "Los cuerpos piramidales escalonados también poseen un significado aritmético profundo. La estructura cuenta con 9 terrazas horizontales superpuestas. Sin embargo, cada una de estas terrazas está cortada por la escalinata central que asciende por cada costado, dividiendo el nivel en dos secciones laterales independientes. Esto produce 18 secciones de terrazas por cada fachada, una cifra que equivale exactamente a los 18 meses o uinales de veinte días que integraban el calendario agrícola maya.",
      "En los muros de las terrazas se encuentran dispuestos paneles o tableros de piedra labrada rectangulares. En cada fachada se contabilizan exactamente 52 paneles de mampostería distribuidos ordenadamente entre los nueve cuerpos escalonados. El número 52 corresponde con rigurosa precisión a los 52 años solares que integran la Rueda Calendárica, el gran ciclo tras el cual una fecha del Tzolk'in y una fecha del Haab volvían a coincidir de forma idéntica en la historia maya.",
      "Esta armonía cuantitativa convertía al monumento en una herramienta pedagógica y de propaganda estatal incomparable. Los ciudadanos que se reunían en la plaza ceremonial no requerían saber leer glifos complejos en códices de amate para entender el funcionamiento del tiempo; bastaba con observar la pirámide misma para contemplar el balance ordenado de los días, los meses y los siglos tallados en bloques inmutables de roca."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los 5 días sobrantes del año solar que no formaban parte de los 18 meses regulares de 20 días eran conocidos por los mayas como Wayeb. Eran considerados días de transición delicada y peligro cósmico, representados sutilmente en la pirámide por la plataforma superior que corona y culmina la suma de los 364 escalones de las cuatro caras."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El célebre investigador Michael D. Coe destacó que El Castillo es uno de los pocos ejemplos mundiales de arquitectura icónica donde las cantidades numéricas de elementos constructivos (escalones, terrazas y paneles) corresponden sin excepciones forzadas a constantes astronómicas y ciclos calendáricos documentados en textos contemporáneos."
      }
    ],
    "fact": "La composición aritmética de El Castillo integra 4 escalinatas de 91 peldaños más 1 plataforma superior para sumar 365 días del año Haab, 18 terrazas divididas por fachada para los 18 meses de veinte días, y 52 tableros por cara para los 52 años de la Rueda Calendárica, conformando un monumento matemático integral sin paralelo en la historia."
  },
  {
    "id": "acustica-quetzal",
    diagramImage: '/assets/maya/infographic_m2/diagram_acustica-quetzal.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Acústica del Quetzal',
    "bannerImage": "/assets/maya/infographic_m2/banner_chocolate-europeo.webp",
    "title": "Acústica del Quetzal",
    "color": "#00C853",
    "btnImage": "/assets/maya/infographic_m2/btn_acustica-quetzal.jpg",
    "image": "/assets/maya/infographic_m2/hero_acustica-quetzal.jpg",
    "content": [
      "Además de sus propiedades astronómicas y calendáricas, El Castillo de Chichén Itzá alberga un prodigioso fenómeno acústico que ha maravillado a ingenieros y físicos modernos de todo el mundo. Cuando una persona se posiciona al pie de la escalinata noreste de la pirámide y produce una palmada seca y sonora, el sonido que rebota desde la parte alta de la estructura no regresa como un eco ordinario, sino transformado en un chirrido agudo que reproduce el canto del quetzal (*Pharomachrus mocinno*).",
      "El sonido reflejado posee una frecuencia modulada descendente muy característica que imita de forma casi idéntica el trino vocal de esta ave sagrada centroamericana, asociada en la mitología maya con el dios Kukulcán. Los estudios espectrográficos demuestran que el eco se inicia en una frecuencia de aproximadamente 1,500 hercios y decae rápidamente hacia los 900 hercios en una fracción de segundo, generando un sonido que parece emitido por un animal vivo oculto en el templo superior.",
      "El mecanismo físico detrás de este fenómeno fue explicado formalmente por el ingeniero acústico estadounidense David Lubman en 1998 ante la Sociedad Acústica de América. Lubman demostró que el eco chirriado o chirp es provocado por el fenómeno ondulatorio de difracción e interferencia acústica sobre una rejilla periódica de escalones de piedra. Cada peldaño de la escalinata funciona como un dispersor acústico individual que refleja una porción de la onda sonora original.",
      "Dado que los peldaños inferiores se encuentran más cerca del observador que los peldaños superiores, el sonido reflejado por cada escalón llega al oído con un retardo temporal acumulativo de unos pocos milisegundos. Esta superposición de ecos individuales con desfase progresivo crea una onda compuesta cuya longitud de onda se estira en el tiempo, transformando el impulso seco de la palmada en una nota musical continua con tono descendente de notable belleza física.",
      "Para la liturgia maya prehispánica, este efecto sonoro poseía un tremendo impacto psicológico y espiritual sobre las multitudes congregadas. Cuando el sumo sacerdote aplaudía o golpeaba percutores ceremoniales frente a la multitud reunida en la plaza, la pirámide parecía cobrar vida y responder con la voz sobrenatural del ave divina. La acústica de la arquitectura servía de puente entre el lenguaje humano y el ámbito sagrado de las deidades celestes."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si una persona aplaude de pie desde la base de la pirámide y otra persona se encuentra caminando sobre los escalones más altos de la cúspide, el sonido de los pasos percibido por la multitud en la plaza adquiere una resonancia que imita con fidelidad el repiqueteo de gotas de lluvia torrencial golpeando contra el suelo de piedra."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Simulaciones acústicas computacionales realizadas por físicos de la Universidad de Gante y la Universidad de Lovaina en Bélgica confirmaron que la profundidad de 26 centímetros y la altura de 26 centímetros de cada peldaño de El Castillo son las medidas teóricas idóneas para difractar frecuencias sonoras en el rango auditivo exacto del quetzal."
      }
    ],
    "fact": "El eco chirriado de El Castillo descompone una palmada humana en una serie de reflexiones periódicas de 91 peldaños que descienden de 1,500 Hz a 900 Hz en menos de 200 milisegundos, reproduciendo con exactitud física las frecuencias acústicas fundamentales registradas en el canto territorial del ave sagrada quetzal."
  },
  {
    "id": "construccion-capas",
    diagramImage: '/assets/maya/infographic_m2/diagram_construccion-capas.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Construcción en Capas',
    "bannerImage": "/assets/maya/infographic_m2/banner_industria-chocolate.webp",
    "title": "Construcción en Capas",
    "color": "#D50000",
    "btnImage": "/assets/maya/infographic_m2/btn_construccion-capas.jpg",
    "image": "/assets/maya/infographic_m2/hero_construccion-capas.jpg",
    "content": [
      "A semejanza de una muñeca matrioshka rusa de arquitectura monumental, El Castillo de Chichén Itzá no fue erigido en una sola campaña de construcción, sino que oculta en su interior varias pirámides previas superpuestas. En Mesoamérica, los gobernantes mayas no solían demoler los santuarios de sus predecesores dinásticos; en su lugar, los rellenaban cuidadosamente con toneladas de escombros de caliza y levantaban una nueva pirámide de mayores proporciones encima de la anterior.",
      "Entre 1931 y 1935, el arqueólogo mexicano José Efrén Erosa Peniche dirigió excavaciones pioneras dentro de la masa sólida de la pirámide mediante la apertura de túneles estrechos. Para sorpresa de la comunidad científica internacional, las exploraciones hallaron intacta una estructura piramidal anterior de 33 metros de base y 17 metros de altura, fechada entre los años 600 y 800 d.C., correspondiente al periodo Clásico Tardío de ocupación itzá.",
      "Dentro del templo superior de esta subestructura sepultada se descubrió una cámara secreta que contenía dos de los tesoros arqueológicos más deslumbrantes de América: una escultura de Chac Mool en piedra con ojos de concha nácar y el célebre Trono del Jaguar Rojo. Este trono real fue esculpido en una sola pieza de piedra caliza, pintado con un vivo pigmento de cinabrio rojo brillante e incrustado con 74 discos pulidos de jade verde jadeíta para simular las manchas del felino.",
      "En el año 2016, un equipo multidisciplinario de científicos del Instituto Nacional de Antropología e Historia (INAH) y de la Universidad Nacional Autónoma de México (UNAM) aplicó técnicas de tomografía eléctrica no invasivas. El estudio detectó una tercera pirámide aún más antigua y pequeña en el corazón del monumento, de unos 10 metros de elevación, construida tentativamente entre los años 500 y 550 d.C., en los orígenes mismos del asentamiento urbano.",
      "Esta sucesión de capas constructivas refleja una profunda práctica religiosa de renovación cíclica de la energía vital del sitio sagrado. Cada nueva pirámide que envolvía a la precedente absorbía el prestigio espiritual acumulado por los antepasados y amplificaba el poder ceremonial de los nuevos mandatarios, convirtiendo al edificio definitivo en una síntesis física de más de cinco siglos ininterrumpidos de devoción ritual y maestría arquitectónica."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los colmillos del Trono del Jaguar Rojo hallado en la subestructura interna de El Castillo no fueron tallados en piedra, sino que fueron elaborados con incrustaciones de conchas marinas de caracol blanco pulido, mientras que sus ojos felinos están hechos de esferas de jadeíta pura que aún resplandecen en la oscuridad de la cámara."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La tomografía de resistividad eléctrica tridimensional realizada en 2016 con electrodos planos sobre los escalones exteriores permitió cartografiar el interior de la pirámide sin necesidad de perforar un solo muro, descubriendo una rampa de acceso y el templo superior de la estructura más antigua de época Clásica Temprana."
      }
    ],
    "fact": "Bajo la envoltura exterior de El Castillo descansan al menos dos pirámides previas perfectamente conservadas: una estructura intermedia de 17 metros con el Trono del Jaguar Rojo de 74 jades y el Chac Mool intactos, y una estructura basal más arcaica de 10 metros erigida en los albores del siglo VI d.C."
  },
  {
    "id": "patrimonio-mundial",
    diagramImage: '/assets/maya/infographic_m2/diagram_patrimonio-mundial.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Patrimonio Mundial',
    "bannerImage": "/assets/maya/infographic_m2/banner_xocolatl-bebida.webp",
    "title": "Patrimonio Mundial",
    "color": "#D7CCC8",
    "btnImage": "/assets/maya/infographic_m2/btn_patrimonio-mundial.jpg",
    "image": "/assets/maya/infographic_m2/hero_patrimonio-mundial.jpg",
    "content": [
      "El valor universal excepcional de Chichén Itzá y de la pirámide de Kukulcán fue reconocido solemnemente en 1988, cuando la UNESCO inscribió a la ciudad prehispánica en la prestigiosa Lista del Patrimonio Mundial de la Humanidad. El comité de selección destacó la extraordinaria conservación de sus monumentos, la síntesis artística mesoamericana y el valor incalculable de sus testimonios arqueoastronómicos que ilustran una etapa decisiva en la historia cultural de la civilización.",
      "En julio del año 2007, tras una votación internacional masiva en la que participaron más de cien millones de personas alrededor del planeta, la pirámide de Kukulcán fue electa como una de las Nuevas Siete Maravillas del Mundo Moderno. Este reconocimiento global catapultó el interés turístico y científico por el monumento, atrayendo a más de dos millones y medio de visitantes nacionales y extranjeros cada año a la península de Yucatán para contemplar su esplendor pétreo.",
      "Para salvaguardar la integridad física del edificio ante el desgaste continuo provocado por el tránsito masivo de personas, el Instituto Nacional de Antropología e Historia (INAH) tomó la decisión en el año 2006 de clausurar el ascenso público a las escalinatas y el acceso a la cámara interna del Jaguar Rojo. Esta medida urgente ha permitido frenar la erosión de los peldaños de caliza y conservar la estabilidad estructural de las bóvedas para las generaciones futuras.",
      "Hoy en día, científicos de múltiples instituciones globales aplican tecnologías de vanguardia para estudiar el monumento sin alterarlo, desde modelos tridimensionales fotogramétricos de alta resolución hasta sensores de rayos cósmicos (muones) para radiografiar cavidades subterráneas ocultas. Estos estudios continúan revelando pasajes sellados, ofrendas de cerámica y detalles de ingeniería que permanecieron ignorados durante siglos bajo la selva.",
      "El Castillo de Chichén Itzá permanece como un símbolo indiscutible del orgullo de México y de la herencia originaria de los pueblos mayas contemporáneos que aún habitan las tierras de Yucatán, Campeche, Quintana Roo, Chiapas y Guatemala. Su silueta piramidal coronada por el templo de las serpientes nos recuerda el poder de la inteligencia humana para dialogar armoniosamente con las estrellas y convertir la piedra en un testimonio eterno del orden del cosmos."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante décadas del siglo XX, los turistas tenían permitido subir libremente por los 91 empinados escalones de la pirámide de Kukulcán ayudados por una cuerda gruesa en el centro. Sin embargo, el desgaste visible en las piedras calizas y el riesgo de accidentes obligaron al cierre definitivo del ascenso a visitantes en enero de 2006."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Científicos del Instituto de Física de la UNAM y de los laboratorios Fermilab de Estados Unidos instalaron detectores de muones cósmicos en túneles cercanos a El Castillo para medir la densidad interna del monumento y confirmar la existencia de cámaras ceremoniales no descubiertas dentro de sus núcleos macizos de roca."
      }
    ],
    "fact": "Declarada Patrimonio Cultural de la Humanidad por la UNESCO en 1988 y consagrada como una de las Nuevas Siete Maravillas del Mundo en 2007, la pirámide de Kukulcán recibe actualmente más de 2.5 millones de visitantes al año, consolidándose como uno de los sitios arqueológicos más estudiados y protegidos de todo el continente americano."
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
      hue: Math.random() > 0.5 ? '255,109,0' : '0,200,83', // orange or jade
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

// â”€â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,109,0,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FF6D00','#8D6E63','#FFD600','#29B6F6','#00C853','#D50000','#D7CCC8'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central icon */}
        <path d="M 285 30 L 315 30 L 300 10 Z" fill="none" stroke="#FF6D00" strokeWidth="1.5" opacity="0.6" />
        <path d="M 290 35 L 310 35 L 300 15 Z" fill="none" stroke="#FF6D00" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,109,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,109,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,109,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD600" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">KUKULCÁN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,109,0,0.8)" fontSize="12" fontFamily="monospace" letterSpacing="3">LA SERPIENTE DE LUZ</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,109,0,0.2)'}`,
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
          layoutId="activeDotMayaM2"
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
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              color: node.color, fontSize: '1.1rem', margin: '0 0 1rem 0',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={18} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fun Fact Footer â”€â”€â”€ */}
                      {node.bannerImage && (
                <div className="relative w-full rounded-xl overflow-hidden mb-6" style={{aspectRatio:'16/5'}}>
                  <img
                    src={node.bannerImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium leading-tight">
                    {node.caption}
                  </p>
                </div>
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

              {node.fact && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}30`,
            borderRadius: '16px',
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '45px', height: '45px', borderRadius: '50%',
              background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, border: `1px solid ${node.color}40`,
            }}>
              <Star size={22} color={node.color} />
            </div>
            <div>
              <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '1rem' }}>Hecho Asombroso</h5>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const percent = Math.round((exploredIds.size / nodes.length) * 100);
  return (
    <div style={{
      width: '100%', maxWidth: '800px', margin: '0 auto 2rem',
      background: 'rgba(10,12,30,0.6)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px',
      padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
      position: 'relative', zIndex: 2,
    }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFD600', width: '45px' }}>{percent}%</span>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: '#FFD600', borderRadius: '3px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {nodes.map((n, i) => (
          <button
            key={i}
            onClick={() => onSelect(n.id)}
            style={{
              width: '12px', height: '12px', borderRadius: '50%',
              border: 'none', cursor: 'pointer', background: exploredIds.has(n.id) ? n.color :'rgba(255,255,255,0.2)',
              boxShadow: exploredIds.has(n.id) ? `0 0 5px ${n.color}` : 'none',
              transition: 'all 0.3s',
            }}
            title={n.title}
          />
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  const handleNodeClick = (id) => {
    setActiveNodeId(id);
    setExploredIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#050714',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <TimeTravelHeader />
        
        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onSelect={handleNodeClick} />

        {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
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

        {/* Content Panel */}
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

        {/* Bibliography Section */}
        {!activeNode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h4 style={{ color: '#FFD600', margin: '0 0 1rem', fontSize: '1rem', letterSpacing: '1px' }}>FUENTES Y BIBLIOGRAFÍA</h4>
            <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              {BIBLIOGRAPHY.map((bib, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{bib}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
