"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  Sparkles,
  Star,
  ChevronDown,
  Zap,
  Clock,
  Atom,
} from "lucide-react";
import ImageLightbox from "./ImageLightbox";

// ─── SVG Decorative Elements (Maya / Palenque themed) ────────────────────────────
function DecoPalace({ size = 70, color = "#78909C", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <path d="M 5 50 L 55 50 L 55 55 L 5 55 Z" fill={color} />
      <path d="M 10 40 L 50 40 L 50 50 L 10 50 Z" fill={color} opacity="0.8" />
      <path d="M 15 30 L 45 30 L 45 40 L 15 40 Z" fill={color} opacity="0.6" />
      <path d="M 20 20 L 40 20 L 40 30 L 20 30 Z" fill={color} opacity="0.4" />
      <rect x="25" y="40" width="10" height="10" fill="#000" opacity="0.3" />
      <rect x="15" y="40" width="5" height="10" fill="#000" opacity="0.3" />
      <rect x="40" y="40" width="5" height="10" fill="#000" opacity="0.3" />
    </svg>
  );
}

function DecoJadeMask({ size = 70, color = "#009688", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <path
        d="M 20 10 Q 30 5 40 10 Q 45 25 40 45 Q 30 55 20 45 Q 15 25 20 10"
        fill={color}
        opacity="0.5"
      />
      <circle cx="25" cy="25" r="4" fill="#000" opacity="0.4" />
      <circle cx="35" cy="25" r="4" fill="#000" opacity="0.4" />
      <path
        d="M 28 35 Q 30 40 32 35"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        opacity="0.4"
      />
      <path
        d="M 30 15 L 30 30"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        opacity="0.3"
      />
      {/* Mosaic pieces lines */}
      <path
        d="M 20 10 L 25 25 L 15 25"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M 40 10 L 35 25 L 45 25"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function DecoGlyphPanel({ size = 70, color = "#BF360C", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <rect
        x="5"
        y="5"
        width="50"
        height="50"
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
      <rect
        x="10"
        y="10"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      <rect
        x="35"
        y="10"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      <rect
        x="10"
        y="35"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      <rect
        x="35"
        y="35"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      {/* Abstract glyph details */}
      <circle cx="17.5" cy="17.5" r="3" fill="#fff" opacity="0.5" />
      <circle cx="42.5" cy="17.5" r="3" fill="#fff" opacity="0.5" />
      <circle cx="17.5" cy="42.5" r="3" fill="#fff" opacity="0.5" />
      <circle cx="42.5" cy="42.5" r="3" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function DecoTower({ size = 70, color = "#FFC107", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <rect x="20" y="15" width="20" height="40" fill={color} opacity="0.5" />
      <rect x="15" y="10" width="30" height="5" fill={color} opacity="0.7" />
      <rect x="22" y="25" width="16" height="3" fill="#000" opacity="0.3" />
      <rect x="22" y="35" width="16" height="3" fill="#000" opacity="0.3" />
      <rect x="22" y="45" width="16" height="3" fill="#000" opacity="0.3" />
      {/* Windows */}
      <rect x="25" y="28" width="4" height="6" fill="#000" opacity="0.4" />
      <rect x="31" y="28" width="4" height="6" fill="#000" opacity="0.4" />
      <rect x="25" y="38" width="4" height="6" fill="#000" opacity="0.4" />
      <rect x="31" y="38" width="4" height="6" fill="#000" opacity="0.4" />
    </svg>
  );
}

function DecoCeibaTree({ size = 70, color = "#1B5E20", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <path
        d="M 28 60 Q 28 30 15 10 Q 30 15 30 5 Q 30 15 45 10 Q 32 30 32 60 Z"
        fill={color}
        opacity="0.6"
      />
      <circle cx="15" cy="10" r="8" fill={color} opacity="0.4" />
      <circle cx="45" cy="10" r="8" fill={color} opacity="0.4" />
      <circle cx="30" cy="5" r="10" fill={color} opacity="0.4" />
      <path d="M 20 60 L 40 60 L 32 50 L 28 50 Z" fill={color} opacity="0.8" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  "palenque-ciudad": [DecoPalace, DecoCeibaTree, DecoGlyphPanel],
  "pakal-tumba": [DecoJadeMask, DecoGlyphPanel, DecoPalace],
  "tapa-sarcofago": [DecoCeibaTree, DecoJadeMask, DecoGlyphPanel],
  "torre-observatorio": [DecoTower, DecoPalace, DecoCeibaTree],
  "inscripciones-templo": [DecoGlyphPanel, DecoPalace, DecoTower],
  "alineacion-solsticio": [DecoTower, DecoPalace, DecoGlyphPanel],
  "legado-palenque": [DecoJadeMask, DecoCeibaTree, DecoPalace],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Schele, L. & Freidel, D. (1990). A Forest of Kings, William Morrow",
  "Stuart, D. & Stuart, G. (2008). Palenque: Eternal City of the Maya, Thames & Hudson",
  "Ruz Lhuillier, A. (1973). El Templo de las Inscripciones, Palenque, INAH",
  "Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson",
  "Tiesler, V. & Cucina, A. (2006). Janaab Pakal of Palenque, University of Arizona Press",
];

const INFOGRAPHIC_NODES = [
  {
    id: "palenque-ciudad",
    title: "La Ciudad: Lakamha",
    color: "#1B5E20",
    btnImage: "/assets/maya/infographic_m11/btn_palenque-ciudad.jpg",
    image: "/assets/maya/infographic_m11/hero_palenque-ciudad.jpg",
    content: [
      'Imagina una metrópolis brillante escondida bajo un inmenso techo verde de hojas gigantes y árboles milenarios. Así es Palenque hoy en día, ubicada en el majestuoso estado de Chiapas, México. Pero hace más de mil años, durante el Período Clásico (entre los años 226 y 799 después de Cristo), no estaba escondida. Era una ciudad viva, colorida y ruidosa, pintada de un rojo carmesí intenso que brillaba bajo el sol tropical. Los mayas la llamaban "Lakamha", que significa "El Lugar de las Grandes Aguas", por los abundantes arroyos y cascadas cristalinas que cruzaban su territorio, proporcionando vida y energía a sus habitantes.',
      'Piensa en Palenque como si fuera el "Nueva York" de la selva maya antigua. No era la ciudad más grande en tamaño, pero era increíblemente rica en arte, arquitectura y conocimiento. Sus reyes eran como celebridades intelectuales, rodeados de los mejores artistas, arquitectos y astrónomos de su época. A diferencia de otras ciudades mayas que construían pirámides enormes y pesadas, los arquitectos de Palenque inventaron una forma de construir edificios más elegantes y delicados. Crearon paredes más delgadas y habitaciones más amplias, decorando cada rincón con esculturas de estuco (una pasta de cal) tan detalladas que parecían fotografías de piedra de sus gobernantes.',
      "Hoy en día, cuando visitas Palenque, te maravillas con sus impresionantes templos y palacios. Pero lo que ves es como mirar solo la punta de un iceberg colosal. Los arqueólogos calculan que solo hemos descubierto y limpiado el diez por ciento de la ciudad original. ¡El noventa por ciento restante sigue profundamente dormido bajo la espesa selva! Es como si tuvieras un rompecabezas de mil piezas y solo hubieras armado cien. Bajo la tierra y las raíces gigantes de los árboles de ceiba, descansan cientos de edificios, casas, plazas y monumentos esperando pacientemente ser descubiertos por futuros exploradores.",
      "El entorno natural de Palenque es un ecosistema vibrante que envuelve las ruinas de piedra con una sinfonía de vida salvaje. Mientras caminas entre los templos antiguos, puedes escuchar los fuertes rugidos de los monos saraguatos que resuenan en el dosel forestal, anunciando su territorio. Monos araña ágiles saltan entre las ramas altas, mientras coloridos tucanes y guacamayas pintan el cielo con sus vuelos. Jaguares silenciosos aún patrullan la selva profunda por la noche. Esta fusión perfecta entre las asombrosas construcciones humanas y la fuerza imparable de la naturaleza tropical es una de las razones principales por las que la UNESCO declaró a Palenque como Patrimonio de la Humanidad en el año mil novecientos ochenta y siete.",
      'El agua fue el elemento vital y el mayor desafío de ingeniería para los ingenieros mayas de Lakamha. Como construyeron la ciudad en la falda de una montaña muy lluviosa, el agua amenazaba con inundar sus palacios. Para resolver este problema colosal, los constructores mayas diseñaron una red subterránea de acueductos increíblemente avanzada. Crearon canales de piedra techados que dirigían el agua de los ríos por debajo de las plazas principales, ¡como un sistema de tuberías moderno! Uno de estos canales incluso tiene una forma especial que reducía la presión del agua, funcionando como una válvula hidráulica sofisticada. Estos antiguos ingenieros dominaron la fuerza de las "Grandes Aguas" para construir su paraíso terrenal.',
    ],
    expandables: [
      {
        label: "El Verdadero Nombre",
        icon: "zap",
        text: 'El nombre "Palenque" en realidad es una palabra de origen español que significa "estacada" o "valla de madera". Se lo dieron los españoles cientos de años después del abandono de la ciudad, porque había un pequeño pueblo cercano rodeado de una valla. ¡Imagina que miles de años en el futuro llamaran a tu ciudad por el nombre de una cerca! Gracias al desciframiento de los jeroglíficos mayas en las últimas décadas, los arqueólogos finalmente descubrieron su verdadero y poético nombre original: Lakamha, "El Lugar de las Grandes Aguas".',
      },
      {
        label: "Comparación Divertida",
        icon: "clock",
        text: 'Imagina que intentas encontrar una ciudad del tamaño de un municipio moderno, pero alguien le echó encima una cobija gigante de plantas, árboles enormes de 40 metros de altura, enredaderas gruesas como brazos y tierra húmeda durante más de mil años. ¡Ese es el desafío de los arqueólogos en Palenque! Tienen que usar tecnología láser montada en aviones (llamada LiDAR) para "ver" a través de la densa selva y descubrir la verdadera escala gigantesca de esta antigua metrópolis escondida.',
      },
    ],
    fact: "El acueducto del río Otulum en Palenque es una de las obras de ingeniería hidráulica más avanzadas del mundo antiguo en el continente americano. Los mayas no solo lo construyeron para evitar que la ciudad se inundara durante las torrenciales lluvias tropicales, sino que ingeniosamente estrecharon el canal en cierta sección para crear agua presurizada. Algunos científicos creen que esta presión era suficiente para alimentar una fuente de agua decorativa en la plaza, ¡creando un espectáculo visual increíble de agua saltarina hace más de mil doscientos años, mucho antes de que existieran las bombas eléctricas modernas!",
  },
  {
    id: "pakal-tumba",
    title: "La Tumba de Pakal",
    color: "#009688",
    btnImage: "/assets/maya/infographic_m11/btn_pakal-tumba.jpg",
    image: "/assets/maya/infographic_m11/hero_pakal-tumba.jpg",
    content: [
      'Conoce al rey más famoso de toda la historia maya: Kinich Janaab Pakal, también conocido simplemente como "Pakal el Grande". Imagina a un gobernante que asume el trono siendo apenas un niño de doce años. En esa época (el año 615 d.C.), Palenque estaba casi destruida por guerras contra una ciudad rival muy poderosa. Pero este joven rey no se rindió. Pakal reconstruyó la ciudad, lideró a su pueblo hacia una era de paz y prosperidad sin precedentes, y gobernó durante increíbles sesenta y ocho años. ¡Eso es uno de los reinados más largos en la historia de la humanidad, superando incluso a la Reina Victoria de Inglaterra o a Ramsés II de Egipto!',
      "Para honrar su grandeza eterna, antes de morir, Pakal ordenó la construcción de su propio lugar de descanso final: una pirámide inmensa llamada el Templo de las Inscripciones. Durante siglos, exploradores y aventureros caminaron sobre este templo sin tener la más mínima idea de que debajo de sus pies descansaba un rey legendario. Fue como si tuvieran una caja fuerte gigante frente a ellos pero no supieran que contenía el tesoro más grande del mundo maya. La tumba estaba perfectamente escondida, diseñada para proteger el cuerpo del rey por toda la eternidad, rodeada de trampas de piedra y pasillos sellados herméticamente.",
      "Todo cambió en el año mil novecientos cincuenta y dos. Un arqueólogo mexicano muy observador llamado Alberto Ruz Lhuillier notó algo extraño en el suelo del templo en la cima de la pirámide: unas misteriosas losas de piedra que tenían agujeros circulares en los bordes. Como un verdadero detective del pasado, se dio cuenta de que esos agujeros servían para levantar las losas como si fueran las tapas de una alcantarilla secreta. Al levantarlas, descubrió un pasaje secreto lleno de rocas y tierra que descendía en zigzag hacia las profundidades de la pirámide. Le tomó cuatro largos años de trabajo agotador, limpiando piedra por piedra, hasta lograr llegar al fondo.",
      'Al final del oscuro pasaje subterráneo, Ruz Lhuillier y su equipo encontraron una puerta triangular de piedra inmensa. Al abrirla, el espectáculo fue deslumbrante. Encontraron una enorme cámara secreta, intacta desde hacía más de mil doscientos años. Las paredes estaban decoradas con hermosas figuras de los "Nueve Señores de la Noche" esculpidas en estuco. En el centro exacto de la habitación, había un sarcófago gigante de piedra, tan grande y pesado como un camión pequeño. Adentro, descansaban los restos del gran rey Pakal, cubierto de joyas preciosas de un verde intenso, el color sagrado de la vida para los mayas.',
      "El tesoro más espectacular sobre el cuerpo de Pakal era su inigualable máscara mortuoria. Estaba formada por cientos de pequeñas y delicadas piezas de jade, cuidadosamente talladas y unidas como un intrincado rompecabezas verde para recrear el rostro del rey. Sus ojos estaban hechos de concha blanca y obsidiana negra brillante, dándole una mirada penetrante y vívida, como si aún estuviera vivo observando desde el más allá. El jade era más valioso que el oro para los mayas; simbolizaba el agua fértil, el crecimiento de las plantas jóvenes y la vida eterna. Esta máscara aseguraba que Pakal sería reconocido y respetado por los dioses en su viaje por el inframundo.",
    ],
    expandables: [
      {
        label: "Un Rey Insuperable",
        icon: "atom",
        text: 'El reinado de Pakal duró 68 años (desde el 615 hasta el 683 d.C.). Para que te des una idea de cuánto tiempo es eso: un niño que nació el día que Pakal se convirtió en rey, ¡habría sido un abuelito muy anciano cuando el rey finalmente falleció a la edad de 80 años! Su gobierno fue un período de estabilidad y riqueza tan grande que impulsó un "renacimiento" del arte, la escritura y la arquitectura en la región, creando algunas de las obras más hermosas y refinadas de la América antigua.',
      },
      {
        label: "El Descubrimiento del Siglo",
        icon: "zap",
        text: 'El arqueólogo Alberto Ruz Lhuillier describió el momento en que entró a la cámara funeraria de Pakal como si hubiera entrado a una "caverna mágica esculpida en hielo". Esto se debía a que, con el paso de los siglos, la humedad del ambiente tropical había hecho que el agua con minerales goteara del techo de piedra, formando estalactitas y cubriendo las paredes con una fina y brillante capa de sales cristalizadas que destellaban con la luz de sus linternas, creando un escenario verdaderamente místico y asombroso.',
      },
    ],
    fact: "El sarcófago gigante de Pakal, incluyendo su pesada tapa bellamente tallada, pesa más de veinte toneladas. Es tan inmensamente grande y pesado que era absolutamente imposible introducirlo por el estrecho y sinuoso pasadizo secreto que bajaba por la pirámide. Los ingenieros mayas primero tuvieron que construir el sarcófago al nivel del suelo y, posteriormente, construyeron la enorme pirámide de nueve niveles y el templo superior ALREDEDOR y POR ENCIMA de la tumba. ¡La pirámide entera fue concebida y construida como un estuche de piedra monumental para guardar esta joya funeraria inamovible!",
  },
  {
    id: "tapa-sarcofago",
    title: "La Tapa del Sarcófago",
    color: "#BF360C",
    btnImage: "/assets/maya/infographic_m11/btn_tapa-sarcofago.jpg",
    image: "/assets/maya/infographic_m11/hero_tapa-sarcofago.jpg",
    content: [
      "Imagina la portada de un libro mágico que cuenta la historia del viaje del alma de un rey después de su muerte. Eso es exactamente la enorme y pesada tapa del sarcófago del rey Pakal. Es un gigantesco rectángulo de piedra, tallado con tanto detalle que parece un dibujo intrincado y lleno de simbolismos. En el centro de esta monumental obra de arte, vemos a Pakal en el momento exacto de su transición. No está muerto en un ataúd; está recostado, en una posición dinámica, atrapado justo en el instante mágico entre el mundo de los vivos y el misterioso mundo de los muertos.",
      'La escena tallada muestra a Pakal cayendo o descendiendo. Su cuerpo baja hacia las enormes fauces abiertas de un monstruo aterrador hecho de huesos y oscuridad. Este monstruo representa a "Xibalbá", el inframundo maya, un lugar profundo y oscuro en el interior de la tierra donde habitan los dioses de la muerte. Es como si el rey estuviera siendo devorado por la misma tierra al ser sepultado. Pero no es un final triste; es un viaje necesario y sagrado, similar a cómo el sol desciende bajo el horizonte cada atardecer para viajar por la oscuridad y renacer brillante al día siguiente.',
      "Justo detrás y encima de Pakal se levanta algo magnífico: un enorme árbol en forma de cruz. Este es el Wacah Chan, el Árbol Cósmico o Árbol de la Vida maya. Para ellos, el universo tenía la forma de un gigantesco árbol de ceiba. Sus raíces profundas llegaban hasta el oscuro inframundo de Xibalbá, su tronco fuerte y recto representaba nuestro mundo terrestre de los vivos, y sus altas ramas sostenían el cielo estrellado donde vivían los dioses celestiales. Pakal está en el centro, conectando estos tres mundos mágicos con su propio cuerpo real, actuando como el puente eterno entre lo humano y lo divino.",
      "En las ramas superiores de este Árbol Cósmico descansa un pájaro majestuoso llamado Itzam-Ye, el Ave Celestial Principal, que observa desde las alturas celestiales. Todo alrededor de la escena principal, los bordes de la enorme tapa de piedra están decorados con una cinta continua que muestra símbolos astronómicos asombrosos: imágenes que representan el Sol brillando, la Luna menguante y estrellas cintilantes de la Vía Láctea. Estas bandas celestiales nos dicen que el viaje del rey Pakal es un evento cósmico monumental, directamente conectado con el movimiento eterno y perfecto de los astros en el firmamento nocturno.",
      "Durante los años sesenta y setenta, algunas personas con mucha imaginación miraron esta tapa y publicaron libros diciendo que Pakal era un astronauta antiguo. Decían que el Árbol Cósmico era un cohete espacial y que el rey estaba manejando controles de vuelo con fuego saliendo por detrás. ¡Pero eso es pura fantasía y un malentendido de la cultura maya! Hoy sabemos leer los jeroglíficos y entender su arte con precisión. La imagen no muestra tecnología extraterrestre de otro planeta, sino una explicación espiritual profunda, poética y hermosa sobre la muerte, la vida, la resurrección y el orden sagrado del universo maya.",
    ],
    expandables: [
      {
        label: "Un Malentendido Espacial",
        icon: "zap",
        text: 'La teoría del "astronauta de Palenque" se hizo súper famosa en un libro de 1968. El autor argumentaba que Pakal estaba en una cápsula espacial con tubos de respiración y palancas de aceleración. Pero los arqueólogos y epigrafistas han demostrado, sin lugar a dudas, que las supuestas "llamas del cohete" son en realidad raíces del Árbol Cósmico sagrado o las fauces del Monstruo de la Tierra del inframundo. Las "palancas" y "controles" son simplemente gestos rituales que el rey hace con las manos, muy comunes en el arte maya, y representaciones de sangre sagrada y joyas de jade.',
      },
      {
        label: "Símbolos Cósmicos Explicados",
        icon: "clock",
        text: "Si observas detenidamente la intrincada tapa, verás que el rey Pakal lleva puesto un faldellín de cuentas y una joya en el pecho que representa al Dios del Maíz. Para los antiguos mayas, el maíz era la planta sagrada que moría cuando se sembraba la semilla en la oscura tierra, pero renacía mágicamente como una planta alta, fuerte y verde que alimentaba a la humanidad. Al vestirse con los atributos de este dios vital, Pakal está asegurando que, al igual que la semilla de maíz, él también regresará a la vida, garantizando la prosperidad, el alimento y el orden futuro para su amado pueblo de Palenque.",
      },
    ],
    fact: "Los bordes de la colosal tapa del sarcófago (que mide 3.8 metros de largo, 2.2 metros de ancho y pesa unas 5 toneladas) no son solo decorativos; actúan como un texto histórico preciso. Tienen inscripciones jeroglíficas labradas alrededor del perímetro que narran una lista dinástica muy exacta. Registran las fechas de nacimiento y fallecimiento de los seis gobernantes anteriores a Pakal, incluyendo a sus padres, creando así un árbol genealógico en piedra que validaba el derecho sagrado de Pakal al trono y conectaba su reinado con los venerados ancestros del pasado.",
  },
  {
    id: "torre-observatorio",
    title: "La Torre del Palacio",
    color: "#FFC107",
    btnImage: "/assets/maya/infographic_m11/btn_torre-observatorio.jpg",
    image: "/assets/maya/infographic_m11/hero_torre-observatorio.jpg",
    content: [
      "En el mismo centro del Gran Palacio de Palenque, se levanta una estructura verdaderamente única y sorprendente que no verás en ninguna otra ciudad maya clásica: una elegante torre cuadrada de cuatro pisos. Parece una torre de vigilancia de un castillo antiguo o un faro solitario perdido en medio del denso océano verde de la selva. Esta torre es el edificio más icónico del Palacio, un complejo laberíntico de patios, corredores subterráneos oscuros y habitaciones ricamente decoradas donde vivía, gobernaba y celebraba ceremonias la poderosa familia real de Palenque durante generaciones.",
      'Imagina cómo se vería esta torre en sus días de gloria, hace más de mil años. Las escaleras interiores te permiten subir y subir, escalón por escalón. En la cima, un techo estilo "mansarda" cubría la estructura, adornado profusamente con estuco bellamente pintado con colores vivos: rojos, azules y amarillos brillantes. En una ciudad y una civilización donde todos los edificios importantes solían ser anchos, horizontales y parecidos a montañas artificiales (las pirámides), esta torre vertical y esbelta destacaba poderosamente en el horizonte, visible desde casi cualquier punto de la gran metrópolis de Lakamha.',
      "Pero esta torre no era simplemente un lugar alto para disfrutar de la vista panorámica de la ciudad o sentir la brisa fresca que bajaba de las montañas. Los científicos y arqueólogos están convencidos de que tenía una función científica muy importante: era un observatorio astronómico. Los mayas eran astrónomos increíblemente apasionados y dedicados. Seguían los complejos movimientos de las estrellas, registraban cuidadosamente los ciclos de la luna, y calculaban con asombrosa precisión las órbitas y apariciones de planetas como Venus y Marte. Para ellos, el cielo nocturno no era solo hermoso; era un gigantesco reloj cósmico, un calendario divino y una pantalla inmensa donde los dioses escribían sus mensajes para el mundo de los humanos.",
      "Desde el último piso de esta torre alta, los sacerdotes-astrónomos mayas tenían una vista perfecta y despejada, sin árboles bloqueando el horizonte occidental. Podían observar con precisión metódica por dónde se ocultaba el sol cada atardecer a lo largo del año solar. Esto era fundamental, porque marcando estos puntos exactos en el horizonte, podían predecir con total exactitud cuándo llegarían las lluvias esenciales, cuándo debían preparar la tierra para sembrar el maíz vital, y cuándo era el momento correcto para cosechar, garantizando así la supervivencia y la riqueza de toda la ciudad de Palenque.",
      "Existe un detalle arquitectónico que demuestra el profundo simbolismo astronómico de este lugar. Si estás parado en la torre, y observas cuidadosamente la puesta de sol durante el día del solsticio de invierno (el 21 de diciembre, el día más corto y oscuro del año), el sol poniente parece sumergirse exactamente detrás de un edificio muy importante: el Templo de las Inscripciones, que es la inmensa tumba piramidal del Gran Rey Pakal. ¡Este asombroso efecto visual no es una casualidad! Es una alineación intencional y brillante. Demuestra cómo los mayas lograron conectar sus precisos conocimientos de las estrellas y el sol, con su arquitectura monumental y la memoria sagrada de su rey más venerado.",
    ],
    expandables: [
      {
        label: "Un Diseño Único",
        icon: "zap",
        text: 'La Torre del Palacio en Palenque es un misterio arquitectónico. En casi todas las demás ciudades mayas de esa época, construían observatorios circulares especiales, como el famoso "Caracol" en Chichén Itzá, que se parecen asombrosamente a los observatorios astronómicos modernos con cúpulas redondas. Sin embargo, los arquitectos de Palenque decidieron romper completamente las reglas tradicionales y crearon una estructura vertical cuadrada. Algunos expertos sugieren que tal vez fue construida con esta forma inusual para asemejarse visualmente a una gran ceiba, el Árbol Cósmico, elevándose firmemente desde el corazón terrenal del Palacio real hacia los reinos celestiales.',
      },
      {
        label: "El Sofá de los Planetas",
        icon: "clock",
        text: "Dentro de las estrechas habitaciones del segundo piso de la torre, los arqueólogos encontraron un elemento muy peculiar e intrigante: un banco de piedra cuidadosamente tallado y muy bien conservado. Se cree que este asiento fue diseñado específicamente para que los sacerdotes-astrónomos pudieran sentarse cómodamente durante muchas horas en la profunda oscuridad de la noche, observando pacientemente el movimiento de los astros a través de las ventanas alineadas. Además, en las paredes cercanas pintaron un gran símbolo de Venus, lo que nos confirma que ese lugar era un centro avanzado de investigación cósmica y observación planetaria constante.",
      },
    ],
    fact: "El Palacio de Palenque en sí mismo (donde se encuentra la torre) no fue construido de una sola vez por un solo rey. Fue creciendo poco a poco durante más de 400 años de forma continua. Cada nuevo gobernante de la dinastía maya añadía nuevos patios, corredores, habitaciones y edificios al complejo, como si estuvieran ampliando una gigantesca casa familiar generacional. La Torre, que es el punto más alto, fue una de las últimas y más atrevidas adiciones al conjunto, y muy probablemente fue construida por los descendientes directos del gran Pakal, en el siglo ocho de nuestra era.",
  },
  {
    id: "inscripciones-templo",
    title: "El Templo de las Inscripciones",
    color: "#4A148C",
    btnImage: "/assets/maya/infographic_m11/btn_inscripciones-templo.jpg",
    image: "/assets/maya/infographic_m11/hero_inscripciones-templo.jpg",
    content: [
      "Ya sabemos que el majestuoso Templo de las Inscripciones guarda la impresionante tumba del Gran Rey Pakal en sus profundidades subterráneas. Pero este edificio piramidal de nueve niveles esconde mucho más que un sarcófago y joyas de jade. De hecho, recibe su famoso nombre por un tesoro invaluable que se encuentra arriba, a plena luz del día, en las paredes interiores del templo superior. Las paredes están cubiertas por tres gigantescos y magníficos paneles de piedra caliza densamente labrada. Estos paneles son como un inmenso libro de piedra abierto.",
      "Si cuentas todos los intrincados dibujos cuadrados labrados en estos tres grandes paneles, ¡encontrarás 620 bloques de escritura jeroglífica maya! Es un número asombroso. De hecho, es el segundo texto jeroglífico más largo, continuo e importante que se ha encontrado jamás en toda el área maya antigua (solo superado por la famosa Escalinata de los Jeroglíficos en la ciudad de Copán). Es una verdadera obra maestra de la literatura antigua tallada con cincel y martillo. Imagina tratar de escribir un libro entero tallando cuidadosa y artísticamente pequeñas imágenes complejas en roca dura. ¡Tomaría años de trabajo experto!",
      "Entonces, ¿qué historia cuenta este gigantesco libro de piedra antigua? Gracias a brillantes epigrafistas y arqueólogos que lograron descifrar el código maya durante el siglo veinte, hoy podemos leerlo. Es un registro histórico inmensamente detallado que documenta cerca de doscientos años de la historia dinástica de la ciudad de Palenque. Funciona como un árbol genealógico colosal, pero también como un noticiero. Menciona con exactitud cuándo nació cada rey antiguo de la familia, las fechas exactas de su coronación, las guerras heroicas que ganaron, las alianzas políticas importantes y los grandiosos rituales sagrados que realizaron para agradar a los dioses y mantener el orden del cosmos.",
      "Sin embargo, este increíble documento de piedra no solo mira hacia el pasado remoto de sus ancestros; ¡también mira audazmente hacia el futuro lejano! Los hábiles escritores mayas calcularon fechas de eventos cósmicos y calendáricos tan lejanos que proyectaban fechas que, en nuestro calendario gregoriano actual, equivalen a miles de años en el futuro. Querían dejar claro, tallado en piedra permanente, que la gloriosa dinastía del Rey Pakal perduraría para siempre y que las ceremonias sagradas y el poder divino de Palenque continuarían celebrándose en aniversarios que ocurrirían ¡en el año cuatro mil setecientos setenta y dos (4772) de nuestra era!",
      "Para los reyes mayas, escribir su historia con tanto esfuerzo y detalle monumental no era simplemente un acto de ego o presunción vanidosa; era magia poderosa y palpable. Creían fervientemente que al tallar una historia de eventos importantes en piedra dura, esos eventos se volvían permanentes, reales y vivos por toda la eternidad. El Templo de las Inscripciones es el intento supremo y grandioso del rey Pakal (y de su devoto hijo, que terminó la construcción) de asegurarse de que ni el implacable paso del tiempo, ni la profunda y devoradora selva chiapaneca, lograran jamás olvidar la grandeza de su amada ciudad y de su propio nombre imperial.",
    ],
    expandables: [
      {
        label: "Un Texto en Tres Partes",
        icon: "zap",
        text: "Los 620 jeroglíficos están magistralmente divididos en tres enormes tabletas: la Tableta Este, la Tableta Central y la Tableta Oeste. La primera relata la historia mitológica más antigua de los dioses fundadores al inicio de los tiempos. La central se enfoca en los ancestros y predecesores reales de Pakal, trazando la historia humana de la dinastía. Y la última y más importante habla sobre el glorioso reinado del propio Gran Pakal, sus hazañas, y las ceremonias dedicatorias de sus hijos tras su fallecimiento, asegurando así su inmortalidad en la memoria colectiva.",
      },
      {
        label: "El Desciframiento Mágico",
        icon: "clock",
        text: 'Durante más de cien años, los arqueólogos modernos miraron estos paneles con admiración, pero considerándolos simplemente como misteriosos e incomprensibles dibujos artísticos o símbolos decorativos extraños. No fue hasta la década de los años setenta, gracias al brillante e innovador trabajo de pioneros como Linda Schele, David Stuart y Peter Mathews, que se dieron cuenta de que no eran solo dibujos. Eran palabras reales, nombres reales, verbos y fechas exactas. En Palenque, el silencio milenario de la selva finalmente se rompió y las piedras "hablaron" su propia historia por primera vez en siglos.',
      },
    ],
    fact: 'El brillante matemático y arqueólogo aficionado Heinrich Berlin fue el primero en notar algo extraordinario en 1958: en muchos monumentos mayas había un jeroglífico específico que se repetía constantemente, pero que siempre cambiaba un poco dependiendo de la ciudad en la que se encontraba. Lo llamó "Glifo Emblema". Años más tarde, los expertos comprendieron que estos glifos funcionaban exactamente como las banderas modernas o los escudos de armas de los países europeos. Eran el nombre político oficial del reino. El de Palenque muestra una misteriosa "cabeza de hueso", y se lee "Lakamha", el venerado señorío de las Grandes Aguas.',
  },
  {
    id: "alineacion-solsticio",
    title: "Alineación del Solsticio",
    color: "#0288D1",
    btnImage: "/assets/maya/infographic_m11/btn_alineacion-solsticio.jpg",
    image: "/assets/maya/infographic_m11/hero_alineacion-solsticio.jpg",
    content: [
      "Ya sabemos que el Templo de las Inscripciones es asombroso por sus textos jeroglíficos detallados y la tumba real oculta de Pakal. Pero hay un secreto astronómico más, un truco de luz y sombra tan sofisticado que demuestra que los mayas eran auténticos genios de la observación del cielo y la planificación urbana. Todo ocurre un día específico del año: el 21 de diciembre, durante el solsticio de invierno. Este es el día preciso en el que el sol, en su viaje anual por el cielo, alcanza su punto más bajo en el horizonte, creando el día más corto y la noche más larga del año para todo el hemisferio norte.",
      'Si viajas a Palenque en esa fecha especial y te colocas en la gran plaza al atardecer, observarás algo verdaderamente mágico y cuidadosamente coreografiado. El sol poniente rojo fuego comienza a descender lentamente por detrás del gran Templo de las Inscripciones. En el último momento brillante antes de desaparecer por completo, los últimos rayos fuertes de luz del sol logran entrar exactamente a través de la ancha puerta central superior del templo, iluminando brevemente las esculturas interiores. Luego, mientras el sol se pone, la sombra avanza cubriendo el edificio, pero la línea imaginaria de los últimos rayos parece "bajar" velozmente por las escaleras.',
      'Esa línea de luz del ocaso invernal "apunta" directamente hacia abajo, siguiendo el mismo ángulo de la escalinata secreta, hasta llegar a la tumba oculta del rey Pakal en las oscuras profundidades de la pirámide. Para los ingenieros y sacerdotes mayas, este no era un truco visual aleatorio. Era una representación espectacular y visible del evento místico más importante: el rey y el sol eran uno solo. Así como el sol, agotado y viejo, "moría" y bajaba al inframundo en el día más corto y frío del año, también el Gran Pakal había descendido al oscuro mundo de Xibalbá.',
      'Pero en la cosmovisión y religión maya, el descenso a la oscuridad profunda nunca era el final definitivo de la historia. Al día siguiente del solsticio, el sol siempre "renace" victorioso, iniciando su largo camino de regreso para calentar la tierra nuevamente, alargando los días y trayendo vida en primavera. La alineación mágica del edificio garantiza que Pakal, identificado y fusionado con el espíritu del sol invencible, también renacerá eternamente de la fría muerte cada año, garantizando con su ciclo inquebrantable que la vida, el poder y la fertilidad nunca abandonarán a la gran ciudad de Palenque.',
      "Lograr esta sincronización perfecta requirió de matemáticas increíblemente complejas, observaciones celestes sistemáticas durante décadas enteras y una precisión constructiva impecable por parte de los arquitectos. Tuvieron que observar las estrellas y la ruta exacta del sol durante años antes de colocar siquiera la primera piedra. Esto demuestra un nivel de sofisticación científica y simbólica que iguala, o incluso supera, al de los monumentos más famosos y admirados de la antigüedad europea o egipcia, consolidando a los mayas como maestros de la arquitectura sagrada.",
    ],
    expandables: [
      {
        label: "Un Reloj Inmenso",
        icon: "clock",
        text: "Imagina intentar construir un reloj funcional utilizando como material principal montañas de pura piedra maciza, calculando el movimiento exacto del sol gigante que está a millones de kilómetros de distancia. Eso es precisamente lo que lograron los brillantes constructores de Palenque con esta compleja alineación arqueoastronómica. Diseñaron toda la colosal pirámide fúnebre como un sofisticado reloj cósmico y calendario gigante para anunciar y celebrar anualmente la llegada del invierno, conectando la arquitectura con el universo.",
      },
      {
        label: "El Gemelo Divino",
        icon: "atom",
        text: "En la rica mitología sagrada de los mayas, recogida en su famoso libro el Popol Vuh, existía la profunda creencia de que el sol mismo era en realidad un joven héroe divino y muy valiente. Este héroe, que bajaba cada atardecer, tenía que superar increíbles pruebas de ingenio, sortear peligros mortales y derrotar a los monstruos tramposos en la oscuridad de Xibalbá para poder salir triunfante y brillar con fuerza nuevamente a la mañana siguiente. El rey Pakal, al asociarse íntimamente con el sol en el diseño de su tumba, se consideraba a sí mismo como este invencible dios triunfador sobre la muerte.",
      },
    ],
    fact: 'Existen otras alineaciones asombrosas y menos conocidas en la ciudad. Por ejemplo, el magnífico "Templo de la Cruz", ubicado en un alto promontorio, fue meticulosamente diseñado de tal manera que, durante el equinoccio de primavera, una intensa franja de luz solar incide y resalta de manera espectacular el panel principal con un brillante dios del maíz tallado en su santuario interior oscuro, simbolizando visualmente el renacimiento anual de las plantas, la agricultura y la llegada de las primeras lluvias dadoras de vida.',
  },
  {
    id: "legado-palenque",
    title: "El Legado Moderno",
    color: "#78909C",
    btnImage: "/assets/maya/infographic_m11/btn_legado-palenque.jpg",
    image: "/assets/maya/infographic_m11/hero_legado-palenque.jpg",
    content: [
      'Palenque no es solo un museo silencioso con viejas piedras abandonadas; es un lugar vibrante y de intensa actividad científica constante. Hoy en día, cientos de años después de su abandono, el misterio y la maravilla de esta capital continúan desarrollándose de forma sorprendente. Aunque la tumba de Pakal se descubrió en mil novecientos cincuenta y dos, los arqueólogos modernos no se detuvieron allí. En 1994, hicieron otro descubrimiento espectacular muy cerca, en un pequeño edificio vecino llamado misteriosamente "Templo XIII". Fue un hallazgo asombroso y macabro.',
      'Oculta dentro de este edificio encontraron la tumba intacta de una misteriosa mujer. Todo a su alrededor, incluidos sus huesos milenarios, su sarcófago de piedra e incluso los preciosos tesoros de jade de su ajuar funerario, estaban completamente cubiertos de un intenso y brillante polvo de color rojo. Este polvo era cinabrio (un mineral tóxico de mercurio) que los mayas utilizaban generosamente en rituales funerarios muy importantes. Por esto, la bautizaron como "La Reina Roja". Después de años de complejas investigaciones químicas y arqueológicas, hoy sabemos que fue Tzakbu Ajaw, la amada esposa de Pakal y madre poderosa de los dos reyes que gobernaron después de él.',
      "El conocimiento profundo que hoy poseemos sobre los antiguos mayas le debe muchísimo a Palenque. En el año mil novecientos setenta y tres, ocurrió un evento extraordinario. Un grupo de brillantes estudiosos, arqueólogos y artistas de varias partes del mundo se reunieron en la zona arqueológica, sentados literalmente en una mesa redonda de madera bajo los calurosos techos de paja. Su objetivo único era algo que se consideraba casi imposible: intentar leer todos los jeroglíficos del Templo de las Inscripciones juntos y al mismo tiempo. Y milagrosamente, para asombro del mundo académico, lo lograron con gran éxito.",
      'Esta reunión histórica, ahora mundialmente famosa como la "Primera Mesa Redonda de Palenque", fue un punto de quiebre trascendental. Allí se descubrió por primera vez que los misteriosos símbolos artísticos mayas eran, en efecto, un lenguaje fonético real completo (capaz de escribir sílabas y formar palabras completas), tal como el español o el inglés, y no solo dibujos sueltos sobre ideas o calendarios. A partir de esa reunión legendaria, el lento y difícil proceso de desciframiento avanzó a una velocidad increíble. Gracias a este esfuerzo, la civilización maya se convirtió oficialmente en la primera cultura del continente americano con una historia escrita detallada que podemos leer con voz alta.',
      "Hoy, la tecnología más avanzada se une a las antiguas tradiciones para desentrañar nuevos secretos en Palenque. Con el uso revolucionario de satélites espaciales, sistemas de radares láser (LiDAR) que pueden penetrar visualmente el dosel de la selva, y complejos análisis de ADN obtenidos de huesos antiguos, sabemos que los misterios de Lakamha están lejos de terminarse. Cada nueva pequeña excavación debajo de la espesa selva húmeda, cada nuevo texto apenas legible en una estela fracturada, ayuda a armar el maravilloso e interminable rompecabezas de una de las civilizaciones más fascinantes y brillantes que hayan existido en la historia del planeta.",
    ],
    expandables: [
      {
        label: "El Polvo Rojo",
        icon: "zap",
        text: 'El famoso cinabrio utilizado en la tumba de la Reina Roja es un potente mineral que contiene mercurio y tiene un color rojo muy intenso que los mayas asociaban simbólicamente con el vital "este", la dirección por donde nace cada día el sol vivificante, y con el color de la sangre humana. Paradójicamente y de manera peligrosa, es sumamente venenoso. Al excavar la tumba en 1994, los arqueólogos modernos tuvieron que usar estrictas precauciones de bioseguridad, utilizando trajes especiales, máscaras y tubos de oxígeno para protegerse de respirar este tóxico polvo antiguo que permaneció sellado por milenios.',
      },
      {
        label: "Un Idioma Resucitado",
        icon: "clock",
        text: "Durante el emocionante proceso de desciframiento de los complicados jeroglíficos mayas en las décadas posteriores a la Mesa Redonda, los lingüistas descubrieron algo fascinante e inspirador: la antigua lengua hablada por Pakal y su gente en Palenque (conocida como Cholti' Clásico) está directamente emparentada y muy cercana a los idiomas mayas, como el chol y el tzeltal, que todavía hablan con orgullo cientos de miles de personas indígenas que viven en el estado de Chiapas hoy en día. ¡La historia antigua está viva en las palabras actuales!",
      },
    ],
    fact: "El espectacular descubrimiento conjunto del Templo de las Inscripciones con sus textos dinásticos, junto a la increíble tumba rica de la Reina Roja, ha demostrado científicamente a todos los historiadores modernos que en el complejo mundo de Palenque (y en muchas otras ciudades de la región maya), las mujeres nobles tenían un rol activo, poderoso y de altísima influencia política, económica y religiosa, siendo figuras fundamentales e indispensables para mantener las grandes dinastías familiares reinantes que controlaban la sociedad.",
  },
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
function TemporalField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    const w = canvas.width,
      h = canvas.height;
    // Maya themed colors: jade, gold
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.2,
      hue: Math.random() > 0.5 ? "0,150,136" : "255,193,7", // jade or gold
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.1;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
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
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Maya Infographic Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
        marginBottom: "-10px",
      }}
    >
      <svg
        viewBox="0 0 600 130"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          filter: "drop-shadow(0 0 10px rgba(0,150,136,0.3))",
        }}
      >
        {/* Temporal arc */}
        <path
          d="M 50 110 Q 300 -10, 550 110"
          fill="none"
          stroke="url(#mayaGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = [
            "#1B5E20",
            "#009688",
            "#BF360C",
            "#FFC107",
            "#4A148C",
            "#0288D1",
            "#78909C",
          ];
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central glyph icon */}
        <rect
          x="286"
          y="16"
          width="28"
          height="28"
          rx="6"
          fill="none"
          stroke="#009688"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="300" cy="30" r="6" fill="#009688" opacity="0.5" />
        <circle cx="292" cy="22" r="2" fill="#009688" opacity="0.6" />
        <circle cx="308" cy="38" r="2" fill="#009688" opacity="0.6" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,150,136,0.2)" />
            <stop offset="50%" stopColor="rgba(0,150,136,0.9)" />
            <stop offset="100%" stopColor="rgba(0,150,136,0.2)" />
          </linearGradient>
        </defs>
        <text
          x="300"
          y="80"
          textAnchor="middle"
          fill="#009688"
          fontSize="18"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          letterSpacing="3"
        >
          PALENQUE
        </text>
        <text
          x="300"
          y="100"
          textAnchor="middle"
          fill="rgba(0,150,136,0.6)"
          fontSize="11"
          fontFamily="monospace"
          letterSpacing="2"
        >
          EL TEMPLO DE LAS INSCRIPCIONES
        </text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${isActive ? node.color : "rgba(0,150,136,0.2)"}`,
          boxShadow: isActive
            ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
            : "0 4px 15px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.btnImage}
          alt={node.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: `2px solid ${node.color}`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <span
        style={{
          color: isActive ? node.color : "rgba(255,255,255,0.75)",
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.3px",
          textAlign: "center",
          lineHeight: 1.2,
          transition: "color 0.3s",
          maxWidth: "100px",
          textShadow: isActive ? `0 0 8px ${node.color}40` : "none",
        }}
      >
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotMayaM11"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: node.color,
            boxShadow: `0 0 8px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Expandable Section with Random Direction ────────────────────────────────
const DIRECTIONS = ["up", "down", "left", "right"];
const dirVariants = {
  up: { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left: { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
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
    <div
      style={{
        marginTop: "0.8rem",
        borderRadius: "14px",
        border: `1px solid ${color}25`,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${color}08, transparent)`,
      }}
    >
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}12` }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          padding: "0.8rem 1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: `${color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconComp size={14} style={{ color }} />
        </motion.div>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            color,
            letterSpacing: "0.5px",
            flex: 1,
            textAlign: "left",
          }}
        >
          {item.label}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ padding: "0 1rem 1rem 1rem" }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.85)",
                borderLeft: `3px solid ${color}30`,
                paddingLeft: "0.8rem",
              }}
            >
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];

  const decoPositions = [
    { top: "8%", right: "-10px", rotate: 15 },
    { top: "45%", left: "-15px", rotate: -10 },
    { bottom: "12%", right: "5px", rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      style={{
        background: "rgba(12, 16, 12, 0.92)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${node.color}30`,
        borderRadius: "24px",
        position: "relative",
        zIndex: 3,
        marginTop: "1rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 10,
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${node.color}40`,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: node.color,
          transition: "all 0.2s",
        }}
      >
        <X size={18} />
      </button>

      {/* ─── Two-Column Hero Section ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          minHeight: "280px",
        }}
      >
        {/* Left: Hero Image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100%",
            background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
              opacity: 0.9,
              minHeight: "280px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: `linear-gradient(transparent, ${node.color}15)`,
            }}
          />
        </div>

        {/* Right: Title + first 2 paragraphs */}
        <div
          style={{ padding: "2rem 2rem 1.5rem 1.5rem", position: "relative" }}
        >
          {decoComponents[0] && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "50px",
                transform: "rotate(15deg)",
                pointerEvents: "none",
              }}
            >
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3
            style={{
              margin: "0 0 0.8rem",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: node.color,
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                border: `2px solid ${node.color}40`,
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.btnImage}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p
              key={i}
              style={{
                margin: "0 0 0.8rem",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* ─── Magazine Body ─── */}
      <div
        style={{
          padding: "1.5rem 2rem 2rem",
          position: "relative",
        }}
      >
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                rotate: [
                  pos.rotate || 0,
                  (pos.rotate || 0) + 5,
                  pos.rotate || 0,
                ],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                ...pos,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem 2rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {node.content.slice(2).map((para, i) => {
            const isWide =
              i === node.content.slice(2).length - 1 &&
              node.content.slice(2).length % 2 !== 0;
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? "1 / -1" : "auto",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  padding: "1.2rem",
                  borderLeft: `3px solid ${node.color}30`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "12px",
                    background: node.color,
                    color: "#0B0E2D",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "8px",
                    letterSpacing: "1px",
                  }}
                >
                  {i === 0 ? "◆" : "◇"}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: "2rem", position: "relative", zIndex: 2 }}>
            <h4
              style={{
                fontSize: "1.1rem",
                color: node.color,
                margin: "0 0 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ChevronRight size={18} /> Explora Más Detalles
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fun Fact ─── */}
        {node.fact && (
          <div
            style={{
              marginTop: "2rem",
              background: `linear-gradient(90deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              padding: "1.5rem",
              borderRadius: "0 16px 16px 0",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                flexShrink: 0,
                borderRadius: "50%",
                background: `${node.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: node.color,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                Dato Científico
              </span>
              <p
                style={{
                  margin: "0.3rem 0 0",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                }}
              >
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        padding: "0.6rem 1rem",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "30px",
        border: "1px solid rgba(0,150,136,0.15)",
      }}
    >
      <Star size={14} style={{ color: "#009688", flexShrink: 0 }} />
      <div
        style={{
          flex: 1,
          height: "6px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #1B5E20, #009688)",
            borderRadius: "3px",
            boxShadow: "0 0 8px rgba(0,150,136,0.4)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          color: "#009688",
          fontFamily: "monospace",
          fontWeight: "bold",
          minWidth: "45px",
          textAlign: "right",
        }}
      >
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM11() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
      setExplored((prev) => new Set([...prev, nodeId]));
    }
  };

  const activeData = INFOGRAPHIC_NODES.find((n) => n.id === activeNode);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(12,16,12,0.85) 0%, rgba(15,20,15,0.8) 40%, rgba(12,16,12,0.88) 100%), url(/assets/maya/infographic_m11/bg_palenque.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        borderRadius: "24px",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <TemporalField />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
        }}
      >
        <div style={{ flex: 1 }} />
        <div style={{ flex: 2 }}>
          <MayaHeader />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1rem",
          }}
        >
          <ProgressBar
            explored={explored.size}
            total={INFOGRAPHIC_NODES.length}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          position: "relative",
          zIndex: 2,
          padding: "0 1rem",
        }}
      >
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
        {activeData && (
          <ContentPanel
            key={activeData.id}
            node={activeData}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h4
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Fuentes y Referencias
        </h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {BIBLIOGRAPHY.map((bib, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.03)",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
              }}
            >
              {bib}
            </span>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
