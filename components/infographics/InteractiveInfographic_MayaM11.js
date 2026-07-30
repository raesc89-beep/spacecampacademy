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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SVG Decorative Elements (Maya / Palenque themed) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Content Data Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
      'Imagina una metrÃƒÂ³polis brillante escondida bajo un inmenso techo verde de hojas gigantes y ÃƒÂ¡rboles milenarios. AsÃƒÂ­ es Palenque hoy en dÃƒÂ­a, ubicada en el majestuoso estado de Chiapas, MÃƒÂ©xico. Pero hace mÃƒÂ¡s de mil aÃƒÂ±os, durante el PerÃƒÂ­odo ClÃƒÂ¡sico (entre los aÃƒÂ±os 226 y 799 despuÃƒÂ©s de Cristo), no estaba escondida. Era una ciudad viva, colorida y ruidosa, pintada de un rojo carmesÃƒÂ­ intenso que brillaba bajo el sol tropical. Los mayas la llamaban "Lakamha", que significa "El Lugar de las Grandes Aguas", por los abundantes arroyos y cascadas cristalinas que cruzaban su territorio, proporcionando vida y energÃƒÂ­a a sus habitantes.',
      'Piensa en Palenque como si fuera el "Nueva York" de la selva maya antigua. No era la ciudad mÃƒÂ¡s grande en tamaÃƒÂ±o, pero era increÃƒÂ­blemente rica en arte, arquitectura y conocimiento. Sus reyes eran como celebridades intelectuales, rodeados de los mejores artistas, arquitectos y astrÃƒÂ³nomos de su ÃƒÂ©poca. A diferencia de otras ciudades mayas que construÃƒÂ­an pirÃƒÂ¡mides enormes y pesadas, los arquitectos de Palenque inventaron una forma de construir edificios mÃƒÂ¡s elegantes y delicados. Crearon paredes mÃƒÂ¡s delgadas y habitaciones mÃƒÂ¡s amplias, decorando cada rincÃƒÂ³n con esculturas de estuco (una pasta de cal) tan detalladas que parecÃƒÂ­an fotografÃƒÂ­as de piedra de sus gobernantes.',
      "Hoy en dÃƒÂ­a, cuando visitas Palenque, te maravillas con sus impresionantes templos y palacios. Pero lo que ves es como mirar solo la punta de un iceberg colosal. Los arqueÃƒÂ³logos calculan que solo hemos descubierto y limpiado el diez por ciento de la ciudad original. Ã‚Â¡El noventa por ciento restante sigue profundamente dormido bajo la espesa selva! Es como si tuvieras un rompecabezas de mil piezas y solo hubieras armado cien. Bajo la tierra y las raÃƒÂ­ces gigantes de los ÃƒÂ¡rboles de ceiba, descansan cientos de edificios, casas, plazas y monumentos esperando pacientemente ser descubiertos por futuros exploradores.",
      "El entorno natural de Palenque es un ecosistema vibrante que envuelve las ruinas de piedra con una sinfonÃƒÂ­a de vida salvaje. Mientras caminas entre los templos antiguos, puedes escuchar los fuertes rugidos de los monos saraguatos que resuenan en el dosel forestal, anunciando su territorio. Monos araÃƒÂ±a ÃƒÂ¡giles saltan entre las ramas altas, mientras coloridos tucanes y guacamayas pintan el cielo con sus vuelos. Jaguares silenciosos aÃƒÂºn patrullan la selva profunda por la noche. Esta fusiÃƒÂ³n perfecta entre las asombrosas construcciones humanas y la fuerza imparable de la naturaleza tropical es una de las razones principales por las que la UNESCO declarÃƒÂ³ a Palenque como Patrimonio de la Humanidad en el aÃƒÂ±o mil novecientos ochenta y siete.",
      'El agua fue el elemento vital y el mayor desafÃƒÂ­o de ingenierÃƒÂ­a para los ingenieros mayas de Lakamha. Como construyeron la ciudad en la falda de una montaÃƒÂ±a muy lluviosa, el agua amenazaba con inundar sus palacios. Para resolver este problema colosal, los constructores mayas diseÃƒÂ±aron una red subterrÃƒÂ¡nea de acueductos increÃƒÂ­blemente avanzada. Crearon canales de piedra techados que dirigÃƒÂ­an el agua de los rÃƒÂ­os por debajo de las plazas principales, Ã‚Â¡como un sistema de tuberÃƒÂ­as moderno! Uno de estos canales incluso tiene una forma especial que reducÃƒÂ­a la presiÃƒÂ³n del agua, funcionando como una vÃƒÂ¡lvula hidrÃƒÂ¡ulica sofisticada. Estos antiguos ingenieros dominaron la fuerza de las "Grandes Aguas" para construir su paraÃƒÂ­so terrenal.',
    ],
    expandables: [
      {
        label: "El Verdadero Nombre",
        icon: "zap",
        text: 'El nombre "Palenque" en realidad es una palabra de origen espaÃƒÂ±ol que significa "estacada" o "valla de madera". Se lo dieron los espaÃƒÂ±oles cientos de aÃƒÂ±os despuÃƒÂ©s del abandono de la ciudad, porque habÃƒÂ­a un pequeÃƒÂ±o pueblo cercano rodeado de una valla. Ã‚Â¡Imagina que miles de aÃƒÂ±os en el futuro llamaran a tu ciudad por el nombre de una cerca! Gracias al desciframiento de los jeroglÃƒÂ­ficos mayas en las ÃƒÂºltimas dÃƒÂ©cadas, los arqueÃƒÂ³logos finalmente descubrieron su verdadero y poÃƒÂ©tico nombre original: Lakamha, "El Lugar de las Grandes Aguas".',
      },
      {
        label: "ComparaciÃƒÂ³n Divertida",
        icon: "clock",
        text: 'Imagina que intentas encontrar una ciudad del tamaÃƒÂ±o de un municipio moderno, pero alguien le echÃƒÂ³ encima una cobija gigante de plantas, ÃƒÂ¡rboles enormes de 40 metros de altura, enredaderas gruesas como brazos y tierra hÃƒÂºmeda durante mÃƒÂ¡s de mil aÃƒÂ±os. Ã‚Â¡Ese es el desafÃƒÂ­o de los arqueÃƒÂ³logos en Palenque! Tienen que usar tecnologÃƒÂ­a lÃƒÂ¡ser montada en aviones (llamada LiDAR) para "ver" a travÃƒÂ©s de la densa selva y descubrir la verdadera escala gigantesca de esta antigua metrÃƒÂ³polis escondida.',
      },
    ],
    fact: "El acueducto del rÃƒÂ­o Otulum en Palenque es una de las obras de ingenierÃƒÂ­a hidrÃƒÂ¡ulica mÃƒÂ¡s avanzadas del mundo antiguo en el continente americano. Los mayas no solo lo construyeron para evitar que la ciudad se inundara durante las torrenciales lluvias tropicales, sino que ingeniosamente estrecharon el canal en cierta secciÃƒÂ³n para crear agua presurizada. Algunos cientÃƒÂ­ficos creen que esta presiÃƒÂ³n era suficiente para alimentar una fuente de agua decorativa en la plaza, Ã‚Â¡creando un espectÃƒÂ¡culo visual increÃƒÂ­ble de agua saltarina hace mÃƒÂ¡s de mil doscientos aÃƒÂ±os, mucho antes de que existieran las bombas elÃƒÂ©ctricas modernas!",
  },
  {
    id: "pakal-tumba",
    title: "La Tumba de Pakal",
    color: "#009688",
    btnImage: "/assets/maya/infographic_m11/btn_pakal-tumba.jpg",
    image: "/assets/maya/infographic_m11/hero_pakal-tumba.jpg",
    content: [
      'Conoce al rey mÃƒÂ¡s famoso de toda la historia maya: Kinich Janaab Pakal, tambiÃƒÂ©n conocido simplemente como "Pakal el Grande". Imagina a un gobernante que asume el trono siendo apenas un niÃƒÂ±o de doce aÃƒÂ±os. En esa ÃƒÂ©poca (el aÃƒÂ±o 615 d.C.), Palenque estaba casi destruida por guerras contra una ciudad rival muy poderosa. Pero este joven rey no se rindiÃƒÂ³. Pakal reconstruyÃƒÂ³ la ciudad, liderÃƒÂ³ a su pueblo hacia una era de paz y prosperidad sin precedentes, y gobernÃƒÂ³ durante increÃƒÂ­bles sesenta y ocho aÃƒÂ±os. Ã‚Â¡Eso es uno de los reinados mÃƒÂ¡s largos en la historia de la humanidad, superando incluso a la Reina Victoria de Inglaterra o a RamsÃƒÂ©s II de Egipto!',
      "Para honrar su grandeza eterna, antes de morir, Pakal ordenÃƒÂ³ la construcciÃƒÂ³n de su propio lugar de descanso final: una pirÃƒÂ¡mide inmensa llamada el Templo de las Inscripciones. Durante siglos, exploradores y aventureros caminaron sobre este templo sin tener la mÃƒÂ¡s mÃƒÂ­nima idea de que debajo de sus pies descansaba un rey legendario. Fue como si tuvieran una caja fuerte gigante frente a ellos pero no supieran que contenÃƒÂ­a el tesoro mÃƒÂ¡s grande del mundo maya. La tumba estaba perfectamente escondida, diseÃƒÂ±ada para proteger el cuerpo del rey por toda la eternidad, rodeada de trampas de piedra y pasillos sellados hermÃƒÂ©ticamente.",
      "Todo cambiÃƒÂ³ en el aÃƒÂ±o mil novecientos cincuenta y dos. Un arqueÃƒÂ³logo mexicano muy observador llamado Alberto Ruz Lhuillier notÃƒÂ³ algo extraÃƒÂ±o en el suelo del templo en la cima de la pirÃƒÂ¡mide: unas misteriosas losas de piedra que tenÃƒÂ­an agujeros circulares en los bordes. Como un verdadero detective del pasado, se dio cuenta de que esos agujeros servÃƒÂ­an para levantar las losas como si fueran las tapas de una alcantarilla secreta. Al levantarlas, descubriÃƒÂ³ un pasaje secreto lleno de rocas y tierra que descendÃƒÂ­a en zigzag hacia las profundidades de la pirÃƒÂ¡mide. Le tomÃƒÂ³ cuatro largos aÃƒÂ±os de trabajo agotador, limpiando piedra por piedra, hasta lograr llegar al fondo.",
      'Al final del oscuro pasaje subterrÃƒÂ¡neo, Ruz Lhuillier y su equipo encontraron una puerta triangular de piedra inmensa. Al abrirla, el espectÃƒÂ¡culo fue deslumbrante. Encontraron una enorme cÃƒÂ¡mara secreta, intacta desde hacÃƒÂ­a mÃƒÂ¡s de mil doscientos aÃƒÂ±os. Las paredes estaban decoradas con hermosas figuras de los "Nueve SeÃƒÂ±ores de la Noche" esculpidas en estuco. En el centro exacto de la habitaciÃƒÂ³n, habÃƒÂ­a un sarcÃƒÂ³fago gigante de piedra, tan grande y pesado como un camiÃƒÂ³n pequeÃƒÂ±o. Adentro, descansaban los restos del gran rey Pakal, cubierto de joyas preciosas de un verde intenso, el color sagrado de la vida para los mayas.',
      "El tesoro mÃƒÂ¡s espectacular sobre el cuerpo de Pakal era su inigualable mÃƒÂ¡scara mortuoria. Estaba formada por cientos de pequeÃƒÂ±as y delicadas piezas de jade, cuidadosamente talladas y unidas como un intrincado rompecabezas verde para recrear el rostro del rey. Sus ojos estaban hechos de concha blanca y obsidiana negra brillante, dÃƒÂ¡ndole una mirada penetrante y vÃƒÂ­vida, como si aÃƒÂºn estuviera vivo observando desde el mÃƒÂ¡s allÃƒÂ¡. El jade era mÃƒÂ¡s valioso que el oro para los mayas; simbolizaba el agua fÃƒÂ©rtil, el crecimiento de las plantas jÃƒÂ³venes y la vida eterna. Esta mÃƒÂ¡scara aseguraba que Pakal serÃƒÂ­a reconocido y respetado por los dioses en su viaje por el inframundo.",
    ],
    expandables: [
      {
        label: "Un Rey Insuperable",
        icon: "atom",
        text: 'El reinado de Pakal durÃƒÂ³ 68 aÃƒÂ±os (desde el 615 hasta el 683 d.C.). Para que te des una idea de cuÃƒÂ¡nto tiempo es eso: un niÃƒÂ±o que naciÃƒÂ³ el dÃƒÂ­a que Pakal se convirtiÃƒÂ³ en rey, Ã‚Â¡habrÃƒÂ­a sido un abuelito muy anciano cuando el rey finalmente falleciÃƒÂ³ a la edad de 80 aÃƒÂ±os! Su gobierno fue un perÃƒÂ­odo de estabilidad y riqueza tan grande que impulsÃƒÂ³ un "renacimiento" del arte, la escritura y la arquitectura en la regiÃƒÂ³n, creando algunas de las obras mÃƒÂ¡s hermosas y refinadas de la AmÃƒÂ©rica antigua.',
      },
      {
        label: "El Descubrimiento del Siglo",
        icon: "zap",
        text: 'El arqueÃƒÂ³logo Alberto Ruz Lhuillier describiÃƒÂ³ el momento en que entrÃƒÂ³ a la cÃƒÂ¡mara funeraria de Pakal como si hubiera entrado a una "caverna mÃƒÂ¡gica esculpida en hielo". Esto se debÃƒÂ­a a que, con el paso de los siglos, la humedad del ambiente tropical habÃƒÂ­a hecho que el agua con minerales goteara del techo de piedra, formando estalactitas y cubriendo las paredes con una fina y brillante capa de sales cristalizadas que destellaban con la luz de sus linternas, creando un escenario verdaderamente mÃƒÂ­stico y asombroso.',
      },
    ],
    fact: "El sarcÃƒÂ³fago gigante de Pakal, incluyendo su pesada tapa bellamente tallada, pesa mÃƒÂ¡s de veinte toneladas. Es tan inmensamente grande y pesado que era absolutamente imposible introducirlo por el estrecho y sinuoso pasadizo secreto que bajaba por la pirÃƒÂ¡mide. Los ingenieros mayas primero tuvieron que construir el sarcÃƒÂ³fago al nivel del suelo y, posteriormente, construyeron la enorme pirÃƒÂ¡mide de nueve niveles y el templo superior ALREDEDOR y POR ENCIMA de la tumba. Ã‚Â¡La pirÃƒÂ¡mide entera fue concebida y construida como un estuche de piedra monumental para guardar esta joya funeraria inamovible!",
  },
  {
    id: "tapa-sarcofago",
    title: "La Tapa del SarcÃƒÂ³fago",
    color: "#BF360C",
    btnImage: "/assets/maya/infographic_m11/btn_tapa-sarcofago.jpg",
    image: "/assets/maya/infographic_m11/hero_tapa-sarcofago.jpg",
    content: [
      "Imagina la portada de un libro mÃƒÂ¡gico que cuenta la historia del viaje del alma de un rey despuÃƒÂ©s de su muerte. Eso es exactamente la enorme y pesada tapa del sarcÃƒÂ³fago del rey Pakal. Es un gigantesco rectÃƒÂ¡ngulo de piedra, tallado con tanto detalle que parece un dibujo intrincado y lleno de simbolismos. En el centro de esta monumental obra de arte, vemos a Pakal en el momento exacto de su transiciÃƒÂ³n. No estÃƒÂ¡ muerto en un ataÃƒÂºd; estÃƒÂ¡ recostado, en una posiciÃƒÂ³n dinÃƒÂ¡mica, atrapado justo en el instante mÃƒÂ¡gico entre el mundo de los vivos y el misterioso mundo de los muertos.",
      'La escena tallada muestra a Pakal cayendo o descendiendo. Su cuerpo baja hacia las enormes fauces abiertas de un monstruo aterrador hecho de huesos y oscuridad. Este monstruo representa a "XibalbÃƒÂ¡", el inframundo maya, un lugar profundo y oscuro en el interior de la tierra donde habitan los dioses de la muerte. Es como si el rey estuviera siendo devorado por la misma tierra al ser sepultado. Pero no es un final triste; es un viaje necesario y sagrado, similar a cÃƒÂ³mo el sol desciende bajo el horizonte cada atardecer para viajar por la oscuridad y renacer brillante al dÃƒÂ­a siguiente.',
      "Justo detrÃƒÂ¡s y encima de Pakal se levanta algo magnÃƒÂ­fico: un enorme ÃƒÂ¡rbol en forma de cruz. Este es el Wacah Chan, el ÃƒÂrbol CÃƒÂ³smico o ÃƒÂrbol de la Vida maya. Para ellos, el universo tenÃƒÂ­a la forma de un gigantesco ÃƒÂ¡rbol de ceiba. Sus raÃƒÂ­ces profundas llegaban hasta el oscuro inframundo de XibalbÃƒÂ¡, su tronco fuerte y recto representaba nuestro mundo terrestre de los vivos, y sus altas ramas sostenÃƒÂ­an el cielo estrellado donde vivÃƒÂ­an los dioses celestiales. Pakal estÃƒÂ¡ en el centro, conectando estos tres mundos mÃƒÂ¡gicos con su propio cuerpo real, actuando como el puente eterno entre lo humano y lo divino.",
      "En las ramas superiores de este ÃƒÂrbol CÃƒÂ³smico descansa un pÃƒÂ¡jaro majestuoso llamado Itzam-Ye, el Ave Celestial Principal, que observa desde las alturas celestiales. Todo alrededor de la escena principal, los bordes de la enorme tapa de piedra estÃƒÂ¡n decorados con una cinta continua que muestra sÃƒÂ­mbolos astronÃƒÂ³micos asombrosos: imÃƒÂ¡genes que representan el Sol brillando, la Luna menguante y estrellas cintilantes de la VÃƒÂ­a LÃƒÂ¡ctea. Estas bandas celestiales nos dicen que el viaje del rey Pakal es un evento cÃƒÂ³smico monumental, directamente conectado con el movimiento eterno y perfecto de los astros en el firmamento nocturno.",
      "Durante los aÃƒÂ±os sesenta y setenta, algunas personas con mucha imaginaciÃƒÂ³n miraron esta tapa y publicaron libros diciendo que Pakal era un astronauta antiguo. DecÃƒÂ­an que el ÃƒÂrbol CÃƒÂ³smico era un cohete espacial y que el rey estaba manejando controles de vuelo con fuego saliendo por detrÃƒÂ¡s. Ã‚Â¡Pero eso es pura fantasÃƒÂ­a y un malentendido de la cultura maya! Hoy sabemos leer los jeroglÃƒÂ­ficos y entender su arte con precisiÃƒÂ³n. La imagen no muestra tecnologÃƒÂ­a extraterrestre de otro planeta, sino una explicaciÃƒÂ³n espiritual profunda, poÃƒÂ©tica y hermosa sobre la muerte, la vida, la resurrecciÃƒÂ³n y el orden sagrado del universo maya.",
    ],
    expandables: [
      {
        label: "Un Malentendido Espacial",
        icon: "zap",
        text: 'La teorÃƒÂ­a del "astronauta de Palenque" se hizo sÃƒÂºper famosa en un libro de 1968. El autor argumentaba que Pakal estaba en una cÃƒÂ¡psula espacial con tubos de respiraciÃƒÂ³n y palancas de aceleraciÃƒÂ³n. Pero los arqueÃƒÂ³logos y epigrafistas han demostrado, sin lugar a dudas, que las supuestas "llamas del cohete" son en realidad raÃƒÂ­ces del ÃƒÂrbol CÃƒÂ³smico sagrado o las fauces del Monstruo de la Tierra del inframundo. Las "palancas" y "controles" son simplemente gestos rituales que el rey hace con las manos, muy comunes en el arte maya, y representaciones de sangre sagrada y joyas de jade.',
      },
      {
        label: "SÃƒÂ­mbolos CÃƒÂ³smicos Explicados",
        icon: "clock",
        text: "Si observas detenidamente la intrincada tapa, verÃƒÂ¡s que el rey Pakal lleva puesto un faldellÃƒÂ­n de cuentas y una joya en el pecho que representa al Dios del MaÃƒÂ­z. Para los antiguos mayas, el maÃƒÂ­z era la planta sagrada que morÃƒÂ­a cuando se sembraba la semilla en la oscura tierra, pero renacÃƒÂ­a mÃƒÂ¡gicamente como una planta alta, fuerte y verde que alimentaba a la humanidad. Al vestirse con los atributos de este dios vital, Pakal estÃƒÂ¡ asegurando que, al igual que la semilla de maÃƒÂ­z, ÃƒÂ©l tambiÃƒÂ©n regresarÃƒÂ¡ a la vida, garantizando la prosperidad, el alimento y el orden futuro para su amado pueblo de Palenque.",
      },
    ],
    fact: "Los bordes de la colosal tapa del sarcÃƒÂ³fago (que mide 3.8 metros de largo, 2.2 metros de ancho y pesa unas 5 toneladas) no son solo decorativos; actÃƒÂºan como un texto histÃƒÂ³rico preciso. Tienen inscripciones jeroglÃƒÂ­ficas labradas alrededor del perÃƒÂ­metro que narran una lista dinÃƒÂ¡stica muy exacta. Registran las fechas de nacimiento y fallecimiento de los seis gobernantes anteriores a Pakal, incluyendo a sus padres, creando asÃƒÂ­ un ÃƒÂ¡rbol genealÃƒÂ³gico en piedra que validaba el derecho sagrado de Pakal al trono y conectaba su reinado con los venerados ancestros del pasado.",
  },
  {
    id: "torre-observatorio",
    title: "La Torre del Palacio",
    color: "#FFC107",
    btnImage: "/assets/maya/infographic_m11/btn_torre-observatorio.jpg",
    image: "/assets/maya/infographic_m11/hero_torre-observatorio.jpg",
    content: [
      "En el mismo centro del Gran Palacio de Palenque, se levanta una estructura verdaderamente ÃƒÂºnica y sorprendente que no verÃƒÂ¡s en ninguna otra ciudad maya clÃƒÂ¡sica: una elegante torre cuadrada de cuatro pisos. Parece una torre de vigilancia de un castillo antiguo o un faro solitario perdido en medio del denso ocÃƒÂ©ano verde de la selva. Esta torre es el edificio mÃƒÂ¡s icÃƒÂ³nico del Palacio, un complejo laberÃƒÂ­ntico de patios, corredores subterrÃƒÂ¡neos oscuros y habitaciones ricamente decoradas donde vivÃƒÂ­a, gobernaba y celebraba ceremonias la poderosa familia real de Palenque durante generaciones.",
      'Imagina cÃƒÂ³mo se verÃƒÂ­a esta torre en sus dÃƒÂ­as de gloria, hace mÃƒÂ¡s de mil aÃƒÂ±os. Las escaleras interiores te permiten subir y subir, escalÃƒÂ³n por escalÃƒÂ³n. En la cima, un techo estilo "mansarda" cubrÃƒÂ­a la estructura, adornado profusamente con estuco bellamente pintado con colores vivos: rojos, azules y amarillos brillantes. En una ciudad y una civilizaciÃƒÂ³n donde todos los edificios importantes solÃƒÂ­an ser anchos, horizontales y parecidos a montaÃƒÂ±as artificiales (las pirÃƒÂ¡mides), esta torre vertical y esbelta destacaba poderosamente en el horizonte, visible desde casi cualquier punto de la gran metrÃƒÂ³polis de Lakamha.',
      "Pero esta torre no era simplemente un lugar alto para disfrutar de la vista panorÃƒÂ¡mica de la ciudad o sentir la brisa fresca que bajaba de las montaÃƒÂ±as. Los cientÃƒÂ­ficos y arqueÃƒÂ³logos estÃƒÂ¡n convencidos de que tenÃƒÂ­a una funciÃƒÂ³n cientÃƒÂ­fica muy importante: era un observatorio astronÃƒÂ³mico. Los mayas eran astrÃƒÂ³nomos increÃƒÂ­blemente apasionados y dedicados. SeguÃƒÂ­an los complejos movimientos de las estrellas, registraban cuidadosamente los ciclos de la luna, y calculaban con asombrosa precisiÃƒÂ³n las ÃƒÂ³rbitas y apariciones de planetas como Venus y Marte. Para ellos, el cielo nocturno no era solo hermoso; era un gigantesco reloj cÃƒÂ³smico, un calendario divino y una pantalla inmensa donde los dioses escribÃƒÂ­an sus mensajes para el mundo de los humanos.",
      "Desde el ÃƒÂºltimo piso de esta torre alta, los sacerdotes-astrÃƒÂ³nomos mayas tenÃƒÂ­an una vista perfecta y despejada, sin ÃƒÂ¡rboles bloqueando el horizonte occidental. PodÃƒÂ­an observar con precisiÃƒÂ³n metÃƒÂ³dica por dÃƒÂ³nde se ocultaba el sol cada atardecer a lo largo del aÃƒÂ±o solar. Esto era fundamental, porque marcando estos puntos exactos en el horizonte, podÃƒÂ­an predecir con total exactitud cuÃƒÂ¡ndo llegarÃƒÂ­an las lluvias esenciales, cuÃƒÂ¡ndo debÃƒÂ­an preparar la tierra para sembrar el maÃƒÂ­z vital, y cuÃƒÂ¡ndo era el momento correcto para cosechar, garantizando asÃƒÂ­ la supervivencia y la riqueza de toda la ciudad de Palenque.",
      "Existe un detalle arquitectÃƒÂ³nico que demuestra el profundo simbolismo astronÃƒÂ³mico de este lugar. Si estÃƒÂ¡s parado en la torre, y observas cuidadosamente la puesta de sol durante el dÃƒÂ­a del solsticio de invierno (el 21 de diciembre, el dÃƒÂ­a mÃƒÂ¡s corto y oscuro del aÃƒÂ±o), el sol poniente parece sumergirse exactamente detrÃƒÂ¡s de un edificio muy importante: el Templo de las Inscripciones, que es la inmensa tumba piramidal del Gran Rey Pakal. Ã‚Â¡Este asombroso efecto visual no es una casualidad! Es una alineaciÃƒÂ³n intencional y brillante. Demuestra cÃƒÂ³mo los mayas lograron conectar sus precisos conocimientos de las estrellas y el sol, con su arquitectura monumental y la memoria sagrada de su rey mÃƒÂ¡s venerado.",
    ],
    expandables: [
      {
        label: "Un DiseÃƒÂ±o ÃƒÅ¡nico",
        icon: "zap",
        text: 'La Torre del Palacio en Palenque es un misterio arquitectÃƒÂ³nico. En casi todas las demÃƒÂ¡s ciudades mayas de esa ÃƒÂ©poca, construÃƒÂ­an observatorios circulares especiales, como el famoso "Caracol" en ChichÃƒÂ©n ItzÃƒÂ¡, que se parecen asombrosamente a los observatorios astronÃƒÂ³micos modernos con cÃƒÂºpulas redondas. Sin embargo, los arquitectos de Palenque decidieron romper completamente las reglas tradicionales y crearon una estructura vertical cuadrada. Algunos expertos sugieren que tal vez fue construida con esta forma inusual para asemejarse visualmente a una gran ceiba, el ÃƒÂrbol CÃƒÂ³smico, elevÃƒÂ¡ndose firmemente desde el corazÃƒÂ³n terrenal del Palacio real hacia los reinos celestiales.',
      },
      {
        label: "El SofÃƒÂ¡ de los Planetas",
        icon: "clock",
        text: "Dentro de las estrechas habitaciones del segundo piso de la torre, los arqueÃƒÂ³logos encontraron un elemento muy peculiar e intrigante: un banco de piedra cuidadosamente tallado y muy bien conservado. Se cree que este asiento fue diseÃƒÂ±ado especÃƒÂ­ficamente para que los sacerdotes-astrÃƒÂ³nomos pudieran sentarse cÃƒÂ³modamente durante muchas horas en la profunda oscuridad de la noche, observando pacientemente el movimiento de los astros a travÃƒÂ©s de las ventanas alineadas. AdemÃƒÂ¡s, en las paredes cercanas pintaron un gran sÃƒÂ­mbolo de Venus, lo que nos confirma que ese lugar era un centro avanzado de investigaciÃƒÂ³n cÃƒÂ³smica y observaciÃƒÂ³n planetaria constante.",
      },
    ],
    fact: "El Palacio de Palenque en sÃƒÂ­ mismo (donde se encuentra la torre) no fue construido de una sola vez por un solo rey. Fue creciendo poco a poco durante mÃƒÂ¡s de 400 aÃƒÂ±os de forma continua. Cada nuevo gobernante de la dinastÃƒÂ­a maya aÃƒÂ±adÃƒÂ­a nuevos patios, corredores, habitaciones y edificios al complejo, como si estuvieran ampliando una gigantesca casa familiar generacional. La Torre, que es el punto mÃƒÂ¡s alto, fue una de las ÃƒÂºltimas y mÃƒÂ¡s atrevidas adiciones al conjunto, y muy probablemente fue construida por los descendientes directos del gran Pakal, en el siglo ocho de nuestra era.",
  },
  {
    id: "inscripciones-templo",
    title: "El Templo de las Inscripciones",
    color: "#4A148C",
    btnImage: "/assets/maya/infographic_m11/btn_inscripciones-templo.jpg",
    image: "/assets/maya/infographic_m11/hero_inscripciones-templo.jpg",
    content: [
      "Ya sabemos que el majestuoso Templo de las Inscripciones guarda la impresionante tumba del Gran Rey Pakal en sus profundidades subterrÃƒÂ¡neas. Pero este edificio piramidal de nueve niveles esconde mucho mÃƒÂ¡s que un sarcÃƒÂ³fago y joyas de jade. De hecho, recibe su famoso nombre por un tesoro invaluable que se encuentra arriba, a plena luz del dÃƒÂ­a, en las paredes interiores del templo superior. Las paredes estÃƒÂ¡n cubiertas por tres gigantescos y magnÃƒÂ­ficos paneles de piedra caliza densamente labrada. Estos paneles son como un inmenso libro de piedra abierto.",
      "Si cuentas todos los intrincados dibujos cuadrados labrados en estos tres grandes paneles, Ã‚Â¡encontrarÃƒÂ¡s 620 bloques de escritura jeroglÃƒÂ­fica maya! Es un nÃƒÂºmero asombroso. De hecho, es el segundo texto jeroglÃƒÂ­fico mÃƒÂ¡s largo, continuo e importante que se ha encontrado jamÃƒÂ¡s en toda el ÃƒÂ¡rea maya antigua (solo superado por la famosa Escalinata de los JeroglÃƒÂ­ficos en la ciudad de CopÃƒÂ¡n). Es una verdadera obra maestra de la literatura antigua tallada con cincel y martillo. Imagina tratar de escribir un libro entero tallando cuidadosa y artÃƒÂ­sticamente pequeÃƒÂ±as imÃƒÂ¡genes complejas en roca dura. Ã‚Â¡TomarÃƒÂ­a aÃƒÂ±os de trabajo experto!",
      "Entonces, Ã‚Â¿quÃƒÂ© historia cuenta este gigantesco libro de piedra antigua? Gracias a brillantes epigrafistas y arqueÃƒÂ³logos que lograron descifrar el cÃƒÂ³digo maya durante el siglo veinte, hoy podemos leerlo. Es un registro histÃƒÂ³rico inmensamente detallado que documenta cerca de doscientos aÃƒÂ±os de la historia dinÃƒÂ¡stica de la ciudad de Palenque. Funciona como un ÃƒÂ¡rbol genealÃƒÂ³gico colosal, pero tambiÃƒÂ©n como un noticiero. Menciona con exactitud cuÃƒÂ¡ndo naciÃƒÂ³ cada rey antiguo de la familia, las fechas exactas de su coronaciÃƒÂ³n, las guerras heroicas que ganaron, las alianzas polÃƒÂ­ticas importantes y los grandiosos rituales sagrados que realizaron para agradar a los dioses y mantener el orden del cosmos.",
      "Sin embargo, este increÃƒÂ­ble documento de piedra no solo mira hacia el pasado remoto de sus ancestros; Ã‚Â¡tambiÃƒÂ©n mira audazmente hacia el futuro lejano! Los hÃƒÂ¡biles escritores mayas calcularon fechas de eventos cÃƒÂ³smicos y calendÃƒÂ¡ricos tan lejanos que proyectaban fechas que, en nuestro calendario gregoriano actual, equivalen a miles de aÃƒÂ±os en el futuro. QuerÃƒÂ­an dejar claro, tallado en piedra permanente, que la gloriosa dinastÃƒÂ­a del Rey Pakal perdurarÃƒÂ­a para siempre y que las ceremonias sagradas y el poder divino de Palenque continuarÃƒÂ­an celebrÃƒÂ¡ndose en aniversarios que ocurrirÃƒÂ­an Ã‚Â¡en el aÃƒÂ±o cuatro mil setecientos setenta y dos (4772) de nuestra era!",
      "Para los reyes mayas, escribir su historia con tanto esfuerzo y detalle monumental no era simplemente un acto de ego o presunciÃƒÂ³n vanidosa; era magia poderosa y palpable. CreÃƒÂ­an fervientemente que al tallar una historia de eventos importantes en piedra dura, esos eventos se volvÃƒÂ­an permanentes, reales y vivos por toda la eternidad. El Templo de las Inscripciones es el intento supremo y grandioso del rey Pakal (y de su devoto hijo, que terminÃƒÂ³ la construcciÃƒÂ³n) de asegurarse de que ni el implacable paso del tiempo, ni la profunda y devoradora selva chiapaneca, lograran jamÃƒÂ¡s olvidar la grandeza de su amada ciudad y de su propio nombre imperial.",
    ],
    expandables: [
      {
        label: "Un Texto en Tres Partes",
        icon: "zap",
        text: "Los 620 jeroglÃƒÂ­ficos estÃƒÂ¡n magistralmente divididos en tres enormes tabletas: la Tableta Este, la Tableta Central y la Tableta Oeste. La primera relata la historia mitolÃƒÂ³gica mÃƒÂ¡s antigua de los dioses fundadores al inicio de los tiempos. La central se enfoca en los ancestros y predecesores reales de Pakal, trazando la historia humana de la dinastÃƒÂ­a. Y la ÃƒÂºltima y mÃƒÂ¡s importante habla sobre el glorioso reinado del propio Gran Pakal, sus hazaÃƒÂ±as, y las ceremonias dedicatorias de sus hijos tras su fallecimiento, asegurando asÃƒÂ­ su inmortalidad en la memoria colectiva.",
      },
      {
        label: "El Desciframiento MÃƒÂ¡gico",
        icon: "clock",
        text: 'Durante mÃƒÂ¡s de cien aÃƒÂ±os, los arqueÃƒÂ³logos modernos miraron estos paneles con admiraciÃƒÂ³n, pero considerÃƒÂ¡ndolos simplemente como misteriosos e incomprensibles dibujos artÃƒÂ­sticos o sÃƒÂ­mbolos decorativos extraÃƒÂ±os. No fue hasta la dÃƒÂ©cada de los aÃƒÂ±os setenta, gracias al brillante e innovador trabajo de pioneros como Linda Schele, David Stuart y Peter Mathews, que se dieron cuenta de que no eran solo dibujos. Eran palabras reales, nombres reales, verbos y fechas exactas. En Palenque, el silencio milenario de la selva finalmente se rompiÃƒÂ³ y las piedras "hablaron" su propia historia por primera vez en siglos.',
      },
    ],
    fact: 'El brillante matemÃƒÂ¡tico y arqueÃƒÂ³logo aficionado Heinrich Berlin fue el primero en notar algo extraordinario en 1958: en muchos monumentos mayas habÃƒÂ­a un jeroglÃƒÂ­fico especÃƒÂ­fico que se repetÃƒÂ­a constantemente, pero que siempre cambiaba un poco dependiendo de la ciudad en la que se encontraba. Lo llamÃƒÂ³ "Glifo Emblema". AÃƒÂ±os mÃƒÂ¡s tarde, los expertos comprendieron que estos glifos funcionaban exactamente como las banderas modernas o los escudos de armas de los paÃƒÂ­ses europeos. Eran el nombre polÃƒÂ­tico oficial del reino. El de Palenque muestra una misteriosa "cabeza de hueso", y se lee "Lakamha", el venerado seÃƒÂ±orÃƒÂ­o de las Grandes Aguas.',
  },
  {
    id: "alineacion-solsticio",
    title: "AlineaciÃƒÂ³n del Solsticio",
    color: "#0288D1",
    btnImage: "/assets/maya/infographic_m11/btn_alineacion-solsticio.jpg",
    image: "/assets/maya/infographic_m11/hero_alineacion-solsticio.jpg",
    content: [
      "Ya sabemos que el Templo de las Inscripciones es asombroso por sus textos jeroglÃƒÂ­ficos detallados y la tumba real oculta de Pakal. Pero hay un secreto astronÃƒÂ³mico mÃƒÂ¡s, un truco de luz y sombra tan sofisticado que demuestra que los mayas eran autÃƒÂ©nticos genios de la observaciÃƒÂ³n del cielo y la planificaciÃƒÂ³n urbana. Todo ocurre un dÃƒÂ­a especÃƒÂ­fico del aÃƒÂ±o: el 21 de diciembre, durante el solsticio de invierno. Este es el dÃƒÂ­a preciso en el que el sol, en su viaje anual por el cielo, alcanza su punto mÃƒÂ¡s bajo en el horizonte, creando el dÃƒÂ­a mÃƒÂ¡s corto y la noche mÃƒÂ¡s larga del aÃƒÂ±o para todo el hemisferio norte.",
      'Si viajas a Palenque en esa fecha especial y te colocas en la gran plaza al atardecer, observarÃƒÂ¡s algo verdaderamente mÃƒÂ¡gico y cuidadosamente coreografiado. El sol poniente rojo fuego comienza a descender lentamente por detrÃƒÂ¡s del gran Templo de las Inscripciones. En el ÃƒÂºltimo momento brillante antes de desaparecer por completo, los ÃƒÂºltimos rayos fuertes de luz del sol logran entrar exactamente a travÃƒÂ©s de la ancha puerta central superior del templo, iluminando brevemente las esculturas interiores. Luego, mientras el sol se pone, la sombra avanza cubriendo el edificio, pero la lÃƒÂ­nea imaginaria de los ÃƒÂºltimos rayos parece "bajar" velozmente por las escaleras.',
      'Esa lÃƒÂ­nea de luz del ocaso invernal "apunta" directamente hacia abajo, siguiendo el mismo ÃƒÂ¡ngulo de la escalinata secreta, hasta llegar a la tumba oculta del rey Pakal en las oscuras profundidades de la pirÃƒÂ¡mide. Para los ingenieros y sacerdotes mayas, este no era un truco visual aleatorio. Era una representaciÃƒÂ³n espectacular y visible del evento mÃƒÂ­stico mÃƒÂ¡s importante: el rey y el sol eran uno solo. AsÃƒÂ­ como el sol, agotado y viejo, "morÃƒÂ­a" y bajaba al inframundo en el dÃƒÂ­a mÃƒÂ¡s corto y frÃƒÂ­o del aÃƒÂ±o, tambiÃƒÂ©n el Gran Pakal habÃƒÂ­a descendido al oscuro mundo de XibalbÃƒÂ¡.',
      'Pero en la cosmovisiÃƒÂ³n y religiÃƒÂ³n maya, el descenso a la oscuridad profunda nunca era el final definitivo de la historia. Al dÃƒÂ­a siguiente del solsticio, el sol siempre "renace" victorioso, iniciando su largo camino de regreso para calentar la tierra nuevamente, alargando los dÃƒÂ­as y trayendo vida en primavera. La alineaciÃƒÂ³n mÃƒÂ¡gica del edificio garantiza que Pakal, identificado y fusionado con el espÃƒÂ­ritu del sol invencible, tambiÃƒÂ©n renacerÃƒÂ¡ eternamente de la frÃƒÂ­a muerte cada aÃƒÂ±o, garantizando con su ciclo inquebrantable que la vida, el poder y la fertilidad nunca abandonarÃƒÂ¡n a la gran ciudad de Palenque.',
      "Lograr esta sincronizaciÃƒÂ³n perfecta requiriÃƒÂ³ de matemÃƒÂ¡ticas increÃƒÂ­blemente complejas, observaciones celestes sistemÃƒÂ¡ticas durante dÃƒÂ©cadas enteras y una precisiÃƒÂ³n constructiva impecable por parte de los arquitectos. Tuvieron que observar las estrellas y la ruta exacta del sol durante aÃƒÂ±os antes de colocar siquiera la primera piedra. Esto demuestra un nivel de sofisticaciÃƒÂ³n cientÃƒÂ­fica y simbÃƒÂ³lica que iguala, o incluso supera, al de los monumentos mÃƒÂ¡s famosos y admirados de la antigÃƒÂ¼edad europea o egipcia, consolidando a los mayas como maestros de la arquitectura sagrada.",
    ],
    expandables: [
      {
        label: "Un Reloj Inmenso",
        icon: "clock",
        text: "Imagina intentar construir un reloj funcional utilizando como material principal montaÃƒÂ±as de pura piedra maciza, calculando el movimiento exacto del sol gigante que estÃƒÂ¡ a millones de kilÃƒÂ³metros de distancia. Eso es precisamente lo que lograron los brillantes constructores de Palenque con esta compleja alineaciÃƒÂ³n arqueoastronÃƒÂ³mica. DiseÃƒÂ±aron toda la colosal pirÃƒÂ¡mide fÃƒÂºnebre como un sofisticado reloj cÃƒÂ³smico y calendario gigante para anunciar y celebrar anualmente la llegada del invierno, conectando la arquitectura con el universo.",
      },
      {
        label: "El Gemelo Divino",
        icon: "atom",
        text: "En la rica mitologÃƒÂ­a sagrada de los mayas, recogida en su famoso libro el Popol Vuh, existÃƒÂ­a la profunda creencia de que el sol mismo era en realidad un joven hÃƒÂ©roe divino y muy valiente. Este hÃƒÂ©roe, que bajaba cada atardecer, tenÃƒÂ­a que superar increÃƒÂ­bles pruebas de ingenio, sortear peligros mortales y derrotar a los monstruos tramposos en la oscuridad de XibalbÃƒÂ¡ para poder salir triunfante y brillar con fuerza nuevamente a la maÃƒÂ±ana siguiente. El rey Pakal, al asociarse ÃƒÂ­ntimamente con el sol en el diseÃƒÂ±o de su tumba, se consideraba a sÃƒÂ­ mismo como este invencible dios triunfador sobre la muerte.",
      },
    ],
    fact: 'Existen otras alineaciones asombrosas y menos conocidas en la ciudad. Por ejemplo, el magnÃƒÂ­fico "Templo de la Cruz", ubicado en un alto promontorio, fue meticulosamente diseÃƒÂ±ado de tal manera que, durante el equinoccio de primavera, una intensa franja de luz solar incide y resalta de manera espectacular el panel principal con un brillante dios del maÃƒÂ­z tallado en su santuario interior oscuro, simbolizando visualmente el renacimiento anual de las plantas, la agricultura y la llegada de las primeras lluvias dadoras de vida.',
  },
  {
    id: "legado-palenque",
    title: "El Legado Moderno",
    color: "#78909C",
    btnImage: "/assets/maya/infographic_m11/btn_legado-palenque.jpg",
    image: "/assets/maya/infographic_m11/hero_legado-palenque.jpg",
    content: [
      'Palenque no es solo un museo silencioso con viejas piedras abandonadas; es un lugar vibrante y de intensa actividad cientÃƒÂ­fica constante. Hoy en dÃƒÂ­a, cientos de aÃƒÂ±os despuÃƒÂ©s de su abandono, el misterio y la maravilla de esta capital continÃƒÂºan desarrollÃƒÂ¡ndose de forma sorprendente. Aunque la tumba de Pakal se descubriÃƒÂ³ en mil novecientos cincuenta y dos, los arqueÃƒÂ³logos modernos no se detuvieron allÃƒÂ­. En 1994, hicieron otro descubrimiento espectacular muy cerca, en un pequeÃƒÂ±o edificio vecino llamado misteriosamente "Templo XIII". Fue un hallazgo asombroso y macabro.',
      'Oculta dentro de este edificio encontraron la tumba intacta de una misteriosa mujer. Todo a su alrededor, incluidos sus huesos milenarios, su sarcÃƒÂ³fago de piedra e incluso los preciosos tesoros de jade de su ajuar funerario, estaban completamente cubiertos de un intenso y brillante polvo de color rojo. Este polvo era cinabrio (un mineral tÃƒÂ³xico de mercurio) que los mayas utilizaban generosamente en rituales funerarios muy importantes. Por esto, la bautizaron como "La Reina Roja". DespuÃƒÂ©s de aÃƒÂ±os de complejas investigaciones quÃƒÂ­micas y arqueolÃƒÂ³gicas, hoy sabemos que fue Tzakbu Ajaw, la amada esposa de Pakal y madre poderosa de los dos reyes que gobernaron despuÃƒÂ©s de ÃƒÂ©l.',
      "El conocimiento profundo que hoy poseemos sobre los antiguos mayas le debe muchÃƒÂ­simo a Palenque. En el aÃƒÂ±o mil novecientos setenta y tres, ocurriÃƒÂ³ un evento extraordinario. Un grupo de brillantes estudiosos, arqueÃƒÂ³logos y artistas de varias partes del mundo se reunieron en la zona arqueolÃƒÂ³gica, sentados literalmente en una mesa redonda de madera bajo los calurosos techos de paja. Su objetivo ÃƒÂºnico era algo que se consideraba casi imposible: intentar leer todos los jeroglÃƒÂ­ficos del Templo de las Inscripciones juntos y al mismo tiempo. Y milagrosamente, para asombro del mundo acadÃƒÂ©mico, lo lograron con gran ÃƒÂ©xito.",
      'Esta reuniÃƒÂ³n histÃƒÂ³rica, ahora mundialmente famosa como la "Primera Mesa Redonda de Palenque", fue un punto de quiebre trascendental. AllÃƒÂ­ se descubriÃƒÂ³ por primera vez que los misteriosos sÃƒÂ­mbolos artÃƒÂ­sticos mayas eran, en efecto, un lenguaje fonÃƒÂ©tico real completo (capaz de escribir sÃƒÂ­labas y formar palabras completas), tal como el espaÃƒÂ±ol o el inglÃƒÂ©s, y no solo dibujos sueltos sobre ideas o calendarios. A partir de esa reuniÃƒÂ³n legendaria, el lento y difÃƒÂ­cil proceso de desciframiento avanzÃƒÂ³ a una velocidad increÃƒÂ­ble. Gracias a este esfuerzo, la civilizaciÃƒÂ³n maya se convirtiÃƒÂ³ oficialmente en la primera cultura del continente americano con una historia escrita detallada que podemos leer con voz alta.',
      "Hoy, la tecnologÃƒÂ­a mÃƒÂ¡s avanzada se une a las antiguas tradiciones para desentraÃƒÂ±ar nuevos secretos en Palenque. Con el uso revolucionario de satÃƒÂ©lites espaciales, sistemas de radares lÃƒÂ¡ser (LiDAR) que pueden penetrar visualmente el dosel de la selva, y complejos anÃƒÂ¡lisis de ADN obtenidos de huesos antiguos, sabemos que los misterios de Lakamha estÃƒÂ¡n lejos de terminarse. Cada nueva pequeÃƒÂ±a excavaciÃƒÂ³n debajo de la espesa selva hÃƒÂºmeda, cada nuevo texto apenas legible en una estela fracturada, ayuda a armar el maravilloso e interminable rompecabezas de una de las civilizaciones mÃƒÂ¡s fascinantes y brillantes que hayan existido en la historia del planeta.",
    ],
    expandables: [
      {
        label: "El Polvo Rojo",
        icon: "zap",
        text: 'El famoso cinabrio utilizado en la tumba de la Reina Roja es un potente mineral que contiene mercurio y tiene un color rojo muy intenso que los mayas asociaban simbÃƒÂ³licamente con el vital "este", la direcciÃƒÂ³n por donde nace cada dÃƒÂ­a el sol vivificante, y con el color de la sangre humana. ParadÃƒÂ³jicamente y de manera peligrosa, es sumamente venenoso. Al excavar la tumba en 1994, los arqueÃƒÂ³logos modernos tuvieron que usar estrictas precauciones de bioseguridad, utilizando trajes especiales, mÃƒÂ¡scaras y tubos de oxÃƒÂ­geno para protegerse de respirar este tÃƒÂ³xico polvo antiguo que permaneciÃƒÂ³ sellado por milenios.',
      },
      {
        label: "Un Idioma Resucitado",
        icon: "clock",
        text: "Durante el emocionante proceso de desciframiento de los complicados jeroglÃƒÂ­ficos mayas en las dÃƒÂ©cadas posteriores a la Mesa Redonda, los lingÃƒÂ¼istas descubrieron algo fascinante e inspirador: la antigua lengua hablada por Pakal y su gente en Palenque (conocida como Cholti' ClÃƒÂ¡sico) estÃƒÂ¡ directamente emparentada y muy cercana a los idiomas mayas, como el chol y el tzeltal, que todavÃƒÂ­a hablan con orgullo cientos de miles de personas indÃƒÂ­genas que viven en el estado de Chiapas hoy en dÃƒÂ­a. Ã‚Â¡La historia antigua estÃƒÂ¡ viva en las palabras actuales!",
      },
    ],
    fact: "El espectacular descubrimiento conjunto del Templo de las Inscripciones con sus textos dinÃƒÂ¡sticos, junto a la increÃƒÂ­ble tumba rica de la Reina Roja, ha demostrado cientÃƒÂ­ficamente a todos los historiadores modernos que en el complejo mundo de Palenque (y en muchas otras ciudades de la regiÃƒÂ³n maya), las mujeres nobles tenÃƒÂ­an un rol activo, poderoso y de altÃƒÂ­sima influencia polÃƒÂ­tica, econÃƒÂ³mica y religiosa, siendo figuras fundamentales e indispensables para mantener las grandes dinastÃƒÂ­as familiares reinantes que controlaban la sociedad.",
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Temporal Particle Field (Canvas Background) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Maya Infographic Header Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Organic Node Button Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
         loading="lazy" />
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Expandable Section with Random Direction Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Magazine-Style Content Panel Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Two-Column Hero Section Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
               loading="lazy" />
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

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Magazine Body Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
                  {i === 0 ? "Ã¢â€”â€ " : "Ã¢â€”â€¡"}
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

        {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Expandable Interactive Sections Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
              <ChevronRight size={18} /> Explora MÃƒÂ¡s Detalles
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

        {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Fun Fact Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
                Dato CientÃƒÂ­fico
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Progress Bar Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main Infographic Component Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
          "linear-gradient(180deg, rgba(12,16,12,0.85) 0%, rgba(15,20,15,0.8) 40%, rgba(12,16,12,0.88) 100%), ",
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
