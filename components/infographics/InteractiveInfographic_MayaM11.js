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
  "palenque-ciudad": [DecoPalace, DecoCeibaTree, DecoGlyphPanel],"pakal-tumba": [DecoJadeMask, DecoGlyphPanel, DecoPalace],
  "tapa-sarcofago": [DecoCeibaTree, DecoJadeMask, DecoGlyphPanel],"torre-observatorio": [DecoTower, DecoPalace, DecoCeibaTree],
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
    id: 'palenque-ciudad',
    title: "La Ciudad: Lakamha",
    color: "#1B5E20",
    btnImage: '/assets/maya/infographic_m11/btn_palenque-ciudad.jpg',
    image: '/assets/maya/infographic_m11/hero_palenque-ciudad.jpg',
    content: [
      'Imagina una metrópolis brillante escondida bajo un techo verde de hojas y árboles. Así es Palenque hoy en día, ubicada en el estado de Chiapas, México. Hace más de mil años, durante el Período Clásico, no estaba escondida. Era una ciudad viva, pintada de rojo intenso. Los mayas la llamaban Lakamha, el Lugar de las Grandes Aguas, por los arroyos y cascadas que cruzaban su territorio.',
      'Piensa en Palenque como el centro intelectual de la selva maya. No era la ciudad más grande, pero era rica en arte y arquitectura. Sus reyes estaban rodeados de artistas, arquitectos y astrónomos. Los constructores inventaron una forma de construir edificios más elegantes. Crearon paredes delgadas y habitaciones amplias, decorando cada rincón con esculturas de estuco.',
      'Hoy en día, al visitar Palenque, ves impresionantes templos y palacios. Pero lo que ves es una pequeña parte de la ciudad. Los arqueólogos calculan que solo se ha descubierto el diez por ciento. El noventa por ciento restante sigue bajo la selva. Bajo la tierra y las raíces de ceiba, descansan edificios y plazas.',
      'El entorno de Palenque es un ecosistema vibrante que envuelve las ruinas. Mientras caminas entre los templos, puedes escuchar los rugidos de monos saraguatos en el dosel forestal. Monos araña saltan entre las ramas, mientras tucanes y guacamayas pintan el cielo. Jaguares silenciosos patrullan la selva por la noche. Esta fusión es la razón por la que fue declarada Patrimonio de la Humanidad.',
      'El agua fue el elemento vital y el mayor desafío para los ingenieros. Construyeron la ciudad en la falda de una montaña lluviosa. Para evitar inundaciones, diseñaron una red subterránea de acueductos. Crearon canales de piedra techados que dirigían el agua debajo de las plazas principales. Uno de estos canales funcionaba como una válvula hidráulica que reducía la presión del agua.'
    ],
    expandables: [
      {
        label: "El Verdadero Nombre",
        icon: "zap",
        text: 'El nombre "Palenque"en realidad es una palabra de origen español que significa"estacada" o "valla de madera". Se lo dieron los españoles cientos de años después del abandono de la ciudad, porque había un pequeño pueblo cercano rodeado de una valla. ¡Imagina que miles de años en el futuro llamaran a tu ciudad por el nombre de una cerca! Gracias al desciframiento de los jeroglíficos mayas en las últimas décadas, los arqueólogos finalmente descubrieron su verdadero y poético nombre original: Lakamha,"El Lugar de las Grandes Aguas".',
      },
      {
        label: "Comparación Divertida",
        icon: "clock",
        text: 'Imagina encontrar una ciudad bajo una cobija gigante de plantas y árboles enormes. Es el desafío de los arqueólogos en Palenque. Usan tecnología láser montada en aviones para ver a través de la selva y descubrir la escala de esta metrópolis escondida.',
      },
    ],
    fact: "El acueducto del río Otulum en Palenque es una obra de ingeniería avanzada. Los mayas lo construyeron para evitar inundaciones. Ingeniosamente, estrecharon el canal para crear agua presurizada. Algunos científicos creen que esta presión alimentaba una fuente decorativa, creando un espectáculo visual hace mil años.",
  },
  {
    id: 'pakal-tumba',
    title: "La Tumba de Pakal",
    color: "#009688",
    btnImage: '/assets/maya/infographic_m11/btn_pakal-tumba.jpg',
    image: '/assets/maya/infographic_m11/hero_pakal-tumba.jpg',
    content: [
      'Conoce al rey más famoso de la historia maya: Kinich Janaab Pakal, el Grande. Asumió el trono siendo un niño de doce años en el año 615 d.C. En esa época, Palenque estaba destruida por guerras contra una ciudad rival. El rey joven reconstruyó la ciudad y lideró a su pueblo hacia la paz y prosperidad. Gobernó durante sesenta y ocho años.',
      'Antes de morir, Pakal ordenó la construcción de su lugar de descanso final: el Templo de las Inscripciones. Durante siglos, exploradores caminaron sobre este templo sin tener idea de que debajo descansaba un rey. La tumba estaba escondida, diseñada para proteger el cuerpo por toda la eternidad, rodeada de trampas de piedra y pasillos sellados.',
      'Todo cambió en mil novecientos cincuenta y dos. El arqueólogo Alberto Ruz Lhuillier notó unas losas de piedra en el suelo del templo con agujeros circulares. Se dio cuenta de que servían para levantar las losas. Al hacerlo, descubrió un pasaje secreto lleno de rocas que descendía hacia las profundidades. Le tomó cuatro años llegar al fondo.',
      'Al final del pasaje subterráneo, encontraron una puerta de piedra. Al abrirla, descubrieron una cámara secreta. Las paredes estaban decoradas con figuras de los Nueve Señores de la Noche. En el centro había un sarcófago gigante de piedra. Adentro descansaban los restos de Pakal, cubierto de joyas preciosas de jade verde.',
      'El tesoro más espectacular era su máscara mortuoria. Estaba formada por cientos de piezas de jade, talladas para recrear el rostro del rey. Sus ojos estaban hechos de concha blanca y obsidiana brillante. El jade era muy valioso para los mayas; simbolizaba el agua y la vida eterna. Esta máscara aseguraba el reconocimiento de los dioses.'
    ],
    expandables: [
      {
        label: "Un Rey Insuperable",
        icon: "atom",
        text: 'El reinado de Pakal duró 68 años. Un niño que nació el día que Pakal fue rey habría sido un abuelito cuando el monarca murió a los ochenta años. Su gobierno fue un período de estabilidad y riqueza que impulsó un renacimiento del arte y arquitectura.',
      },
      {
        label: "El Descubrimiento del Siglo",
        icon: "zap",
        text: 'Alberto Ruz Lhuillier describió la cámara como una caverna mágica. La humedad tropical hizo que minerales gotearan del techo de piedra, formando estalactitas. Las paredes tenían una capa brillante de sales que destellaban con linternas, creando un escenario místico.',
      },
    ],
    fact: "El sarcófago gigante de Pakal, con su pesada tapa tallada, pesa más de veinte toneladas. Era imposible introducirlo por el sinuoso pasadizo. Los ingenieros mayas construyeron el sarcófago al suelo y después edificaron la pirámide de nueve niveles encima de la tumba. La pirámide entera fue un estuche monumental.",
  },
  {
    id: 'tapa-sarcofago',
    title: "La Tapa del Sarcófago",
    color: "#BF360C",
    btnImage: '/assets/maya/infographic_m11/btn_tapa-sarcofago.jpg',
    image: '/assets/maya/infographic_m11/hero_tapa-sarcofago.jpg',
    content: [
      'Imagina un libro de piedra que cuenta el viaje del alma de un rey. Esa es la tapa del sarcófago de Pakal. Es un rectángulo de piedra, tallado con detalle. En el centro de esta obra, vemos a Pakal en su transición. Está recostado en una posición dinámica, atrapado entre el mundo de los vivos y el mundo de los muertos.',
      'La escena muestra a Pakal descendiendo hacia las fauces de un monstruo de huesos. Este monstruo representa a Xibalbá, el inframundo maya. Es el lugar profundo donde habitan los dioses de la muerte. Es como si el rey estuviera siendo devorado por la tierra. Es un viaje necesario, similar al sol ocultándose en el atardecer.',
      'Detrás de Pakal se levanta un árbol en forma de cruz. Este es el Wacah Chan, el Árbol Cósmico. Para los mayas, el universo tenía la forma de una ceiba. Sus raíces llegaban a Xibalbá, su tronco representaba la tierra y sus ramas sostenían el cielo. Pakal conecta estos tres mundos con su cuerpo.',
      'En las ramas superiores descansa Itzam-Ye, el Ave Celestial, que observa desde las alturas. Los bordes de la tapa están decorados con una cinta que muestra símbolos astronómicos: el sol, la luna y las estrellas. Estas bandas nos dicen que el viaje de Pakal es un evento cósmico conectado con el movimiento de los astros.',
      'En el pasado, algunas personas publicaron que Pakal era un astronauta antiguo. Decían que el Árbol Cósmico era un cohete espacial y que el rey manejaba controles de vuelo. Esto es pura fantasía. Hoy sabemos leer los jeroglíficos. La imagen muestra una explicación espiritual profunda sobre la vida, la muerte y el orden del universo maya.'
    ],
    expandables: [
      {
        label: "Un Malentendido Espacial",
        icon: "zap",
        text: 'La teoría del "astronauta de Palenque"se hizo súper famosa en un libro de 1968. El autor argumentaba que Pakal estaba en una cápsula espacial con tubos de respiración y palancas de aceleración. Pero los arqueólogos y epigrafistas han demostrado, que las supuestas"llamas del cohete"son en realidad raíces del Ãrbol Cósmico sagrado o las fauces del Monstruo de la Tierra del inframundo. Las"palancas" y "controles" son simplemente gestos rituales que el rey hace con las manos, muy comunes en el arte maya, y representaciones de sangre sagrada y joyas de jade.',
      },
      {
        label: "Símbolos Cósmicos Explicados",
        icon: "clock",
        text: "Si observas detenidamente la intrincada tapa, verás que el rey Pakal lleva puesto un faldellín de cuentas y una joya en el pecho que representa al Dios del Maíz. Para los antiguos mayas, el maíz era la planta sagrada que moría cuando se sembraba la semilla en la oscura tierra, pero renacía mágicamente como una planta alta, fuerte y verde que alimentaba a la humanidad. Al vestirse con los atributos de este dios vital, Pakal está asegurando que, al igual que la semilla de maíz, él también regresará a la vida, garantizando la prosperidad, el alimento. El orden futuro para su amado pueblo de Palenque.",
      },
    ],
    fact: "Los bordes de la colosal tapa del sarcófago (que mide 3.8 metros de largo, 2.2 metros de ancho y pesa unas 5 toneladas) no son solo decorativos; actúan como un texto histórico preciso. Tienen inscripciones jeroglíficas labradas alrededor del perímetro que narran una lista dinástica muy exacta. Registran las fechas de nacimiento y fallecimiento de los seis gobernantes anteriores a Pakal, incluyendo a sus padres, creando así un árbol genealógico en piedra que validaba el derecho sagrado de Pakal al trono y conectaba su reinado con los venerados ancestros del pasado.",
  },
  {
    id: 'torre-observatorio',
    title: "La Torre del Palacio",
    color: "#FFC107",
    btnImage: '/assets/maya/infographic_m11/btn_torre-observatorio.jpg',
    image: '/assets/maya/infographic_m11/hero_torre-observatorio.jpg',
    content: [
      'En el centro del Gran Palacio de Palenque se levanta una estructura inusual: una torre cuadrada de cuatro pisos. Parece una torre de vigilancia perdida en la selva. Esta torre es el edificio más icónico del Palacio, un complejo de patios y habitaciones donde vivía la familia real de Palenque durante generaciones.',
      'Imagina cómo se vería esta torre en sus días de gloria. Las escaleras interiores te permiten subir a la cima. Un techo cubría la estructura, adornado con estuco pintado con colores vivos. En una ciudad donde los edificios importantes eran horizontales, esta torre vertical destacaba en el horizonte.',
      'Los arqueólogos están convencidos de que tenía una función científica: era un observatorio astronómico. Los mayas eran astrónomos apasionados. Registraban los ciclos de la luna y calculaban las órbitas de planetas. Para ellos, el cielo nocturno era un calendario divino y una pantalla inmensa donde los dioses escribían mensajes.',
      'Desde el último piso, los sacerdotes tenían una vista despejada. Podían observar por dónde se ocultaba el sol en el atardecer a lo largo del año. Marcando estos puntos en el horizonte, predecían cuándo llegarían las lluvias esenciales y cuándo preparar la tierra para sembrar.',
      'Un detalle arquitectónico demuestra el simbolismo de este lugar. Durante la puesta de sol en el solsticio de invierno, el sol parece sumergirse detrás del Templo de las Inscripciones, la tumba de Pakal. Esta alineación brillante conecta sus conocimientos de las estrellas con su arquitectura.'
    ],
    expandables: [
      {
        label: "Un Diseño ÃƒÅ¡nico",
        icon: "zap",
        text: 'La Torre del Palacio en Palenque es un misterio arquitectónico. En casi todas las demás ciudades mayas de esa época, construían observatorios circulares especiales, como el famoso "Caracol" en Chichén Itzá, que se parecen asombrosamente a los observatorios astronómicos modernos con cúpulas redondas. Sin embargo, los arquitectos de Palenque decidieron romper las reglas tradicionales y crearon una estructura vertical cuadrada. Algunos expertos sugieren que tal vez fue construida con esta forma inusual para asemejarse visualmente a una gran ceiba, el Ãrbol Cósmico, elevándose firmemente desde el corazón terrenal del Palacio real hacia los reinos celestiales.',
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
    id: 'inscripciones-templo',
    title: "El Templo de las Inscripciones",
    color: "#4A148C",
    btnImage: '/assets/maya/infographic_m11/btn_inscripciones-templo.jpg',
    image: "/assets/maya/infographic_m11/hero_inscripciones-templo.jpg",
    content: [
      'El Templo de las Inscripciones guarda la tumba de Pakal, pero esconde mucho más. Recibe su nombre por los gigantescos paneles de piedra caliza en las paredes interiores del templo superior. Estos paneles son un libro de piedra abierto.',
      'Si cuentas los dibujos labrados, encontrarás más de seiscientos bloques de escritura jeroglífica maya. Es el segundo texto jeroglífico continuo más largo del área maya. Es una obra de la literatura antigua tallada con cincel y martillo. Escribir un libro tallando roca dura requería años de trabajo experto.',
      '¿Qué historia cuenta este libro de piedra? Los arqueólogos lograron descifrar el código maya en el siglo veinte. Es un registro histórico que documenta doscientos años de la dinastía de Palenque. Funciona como un árbol genealógico y un noticiero. Menciona cuándo nació cada rey, sus guerras heroicas y los rituales sagrados.',
      'Este documento de piedra no solo mira hacia el pasado, también mira hacia el futuro. Los escritores mayas calcularon fechas de eventos cósmicos que equivalen a miles de años en el futuro. Querían dejar claro que la dinastía de Pakal perduraría para siempre. Las ceremonias sagradas continuarían en aniversarios remotos.',
      'Para los reyes mayas, escribir su historia en piedra no era un acto de ego, era magia. Creían que al tallar eventos, estos se volvían permanentes por la eternidad. El Templo es el intento de Pakal de asegurarse de que ni el paso del tiempo ni la selva borraran su grandeza.'
    ],
    expandables: [
      {
        label: "Un Texto en Tres Partes",
        icon: "zap",
        text: "Los 620 jeroglíficos están divididos en tres enormes tabletas: la Tableta Este, la Tableta Central y la Tableta Oeste. La primera relata la historia mitológica más antigua de los dioses fundadores al inicio de los tiempos. La central se enfoca en los ancestros y predecesores reales de Pakal, trazando la historia humana de la dinastía. Y la última y más importante habla sobre el glorioso reinado del propio Gran Pakal, sus hazañas, y las ceremonias dedicatorias de sus hijos tras su fallecimiento, asegurando así su inmortalidad en la memoria colectiva.",
      },
      {
        label: "El Desciframiento Mágico",
        icon: "clock",
        text: 'Durante más de cien años, los arqueólogos modernos miraron estos paneles con admiración, pero considerándolos simplemente como misteriosos e incomprensibles dibujos artísticos o símbolos decorativos extraños. No fue hasta la década de los años setenta, gracias al brillante e innovador trabajo de pioneros como Linda Schele, David Stuart y Peter Mathews, que se dieron cuenta de que no eran solo dibujos. Eran palabras reales, nombres reales, verbos y fechas exactas. En Palenque, el silencio milenario de la selva finalmente se rompió y las piedras "hablaron" su propia historia por primera vez en siglos.',
      },
    ],
    fact: 'El brillante matemático y arqueólogo aficionado Heinrich Berlin fue el primero en notar algo extraordinario en 1958: en muchos monumentos mayas había un jeroglífico específico que se repetía constantemente, pero que siempre cambiaba un poco dependiendo de la ciudad en la que se encontraba. Lo llamó "Glifo Emblema". Años más tarde, los expertos comprendieron que estos glifos funcionaban exactamente como las banderas modernas o los escudos de armas de los países europeos. Eran el nombre político oficial del reino. El de Palenque muestra una misteriosa"cabeza de hueso", y se lee "Lakamha", el venerado señorío de las Grandes Aguas.',
  },
  {
    id: 'alineacion-solsticio',
    title: "Alineación del Solsticio",
    color: "#0288D1",
    btnImage: '/assets/maya/infographic_m11/btn_alineacion-solsticio.jpg',
    image: '/assets/maya/infographic_m11/hero_alineacion-solsticio.jpg',
    content: [
      'El Templo de las Inscripciones tiene un secreto astronómico que demuestra que los mayas eran genios de la observación del cielo. Todo ocurre el día del solsticio de invierno, el 21 de diciembre. Este es el día en que el sol alcanza su punto más bajo en el horizonte.',
      'Si visitas Palenque en esa fecha al atardecer, observarás algo mágico. El sol comienza a descender detrás del Templo. En el último momento, los rayos de luz entran por la puerta central superior. Mientras el sol se pone, la línea de los rayos baja velozmente por las escaleras.',
      'Esa línea de luz del ocaso invernal apunta hacia abajo hasta llegar a la tumba de Pakal en las profundidades. Para los mayas, esto era una representación mística: el rey y el sol eran uno solo. Así como el sol moría en el día más corto, Pakal había descendido al inframundo.',
      'En la religión maya, el descenso a la oscuridad no era el final. Al día siguiente del solsticio, el sol renace victorioso, calentando la tierra nuevamente. La alineación asegura que Pakal, fusionado con el sol, también renacerá eternamente de la muerte, garantizando la vida a Palenque.',
      'Lograr esta sincronización requirió de matemáticas complejas y observaciones celestes. Tuvieron que observar las estrellas y la ruta del sol durante años antes de colocar la primera piedra. Esto demuestra un nivel de sofisticación científica que consolida a los mayas como maestros de la arquitectura sagrada.'
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
    fact: 'Existen otras alineaciones asombrosas en la ciudad. El "Templo de la Cruz" fue diseñado de tal manera que, durante el equinoccio de primavera, una franja de luz solar ilumina un dios del maíz tallado en su santuario interior. Esto simboliza el renacimiento de las plantas y la llegada de las lluvias.',
  },
  {
    id: 'legado-palenque',
    title: "El Legado Moderno",
    color: "#78909C",
    btnImage: '/assets/maya/infographic_m11/btn_legado-palenque.jpg',
    image: '/assets/maya/infographic_m11/hero_legado-palenque.jpg',
    content: [
      'Palenque no es solo un museo silencioso; es un lugar de actividad científica. El misterio de esta capital continúa desarrollándose. Aunque la tumba de Pakal se descubrió en mil novecientos cincuenta y dos, los arqueólogos no se detuvieron allí. En 1994, hicieron otro descubrimiento en el Templo XIII.',
      'Oculta dentro de este edificio encontraron la tumba intacta de una mujer. Sus huesos milenarios, su sarcófago de piedra y su ajuar funerario estaban cubiertos de polvo rojo. Este polvo era cinabrio que utilizaban en rituales funerarios. La bautizaron como la Reina Roja y hoy sabemos que fue la esposa de Pakal.',
      'El conocimiento profundo que poseemos sobre los mayas le debe muchísimo a Palenque. En mil novecientos setenta y tres, ocurrió un evento extraordinario. Un grupo de arqueólogos se reunió en la zona arqueológica. Su objetivo era leer los jeroglíficos del Templo juntos. Lo lograron con gran éxito.',
      'Esta reunión histórica fue un punto de quiebre. Se descubrió que los símbolos artísticos mayas eran un lenguaje fonético real completo. No eran dibujos sueltos. El proceso de desciframiento avanzó a gran velocidad. La civilización maya se convirtió en la primera cultura de América con una historia escrita detallada.',
      'Hoy, la tecnología avanzada se une a las tradiciones para desentrañar secretos en Palenque. Con satélites espaciales y sistemas láser que penetran la selva, sabemos que los misterios están lejos de terminarse. Cada texto legible ayuda a armar el rompecabezas de una de las civilizaciones más fascinantes de la historia.'
    ],
    expandables: [
      {
        label: "El Polvo Rojo",
        icon: "zap",
        text: 'El famoso cinabrio utilizado en la tumba de la Reina Roja es un potente mineral que contiene mercurio y tiene un color rojo muy intenso que los mayas asociaban simbólicamente con el vital "este", la dirección por donde nace cada día el sol vivificante. Con el color de la sangre humana. Paradójicamente y de manera peligrosa, es venenoso. Al excavar la tumba en 1994, los arqueólogos modernos tuvieron que usar estrictas precauciones de bioseguridad, utilizando trajes especiales, máscaras y tubos de oxígeno para protegerse de respirar este tóxico polvo antiguo que permaneció sellado por milenios.',
      },
      {
        label: "Un Idioma Resucitado",
        icon: "clock",
        text: "Durante el emocionante proceso de desciframiento de los complicados jeroglíficos mayas en las décadas posteriores a la Mesa Redonda, los lingüistas descubrieron algo fascinante e inspirador: la antigua lengua hablada por Pakal. Su gente en Palenque (conocida como Cholti' Clásico) está directamente emparentada y muy cercana a los idiomas mayas, como el chol y el tzeltal, que todavía hablan con orgullo cientos de miles de personas indígenas que viven en el estado de Chiapas hoy en día. ¡La historia antigua está viva en las palabras actuales!",
      },
    ],
    fact: "El espectacular descubrimiento conjunto del Templo de las Inscripciones con sus textos dinásticos, junto a la increíble tumba rica de la Reina Roja, ha demostrado científicamente a todos los historiadores modernos que en el complejo mundo de Palenque (y en muchas otras ciudades de la región maya), las mujeres nobles tenían un rol activo, poderoso. De altísima influencia política, económica y religiosa, siendo figuras fundamentales e indispensables para mantener las grandes dinastías familiares reinantes que controlaban la sociedad.",
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
        position: "absolute", inset: 0, zIndex: 0, pointerEvents:"none",
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
          fontSize: "0.78rem", fontWeight: 700, letterSpacing:"0.3px",
          textAlign: "center", lineHeight: 1.2, transition:"color 0.3s",
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
            fontSize: "0.85rem", fontWeight: 700, color, letterSpacing:"0.5px",
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
                fontSize: "0.9rem", lineHeight: 1.75, color:"rgba(255,255,255,0.85)",
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
          cursor: "pointer", color: node.color, transition:"all 0.2s",
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
              cursor: "pointer", opacity: 0.9, minHeight:"280px",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height:"60px",
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
              fontSize: "1.5rem", fontWeight: 800, color: node.color, letterSpacing:"-0.02em",
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
                fontSize: "0.95rem", lineHeight: 1.75, color:"rgba(255,255,255,0.85)",
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
                position: "absolute", ...pos, zIndex: 1, pointerEvents:"none",
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
                    left: "12px", background: node.color, color:"#0B0E2D",
                    fontSize: "0.65rem", fontWeight: 800, padding:"2px 8px",
                    borderRadius: "8px",
                    letterSpacing: "1px",
                  }}
                >
                  {i === 0 ? "─â€”â€ " : "─â€”â€¡"}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem", lineHeight: 1.75, color:"rgba(255,255,255,0.85)",
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
                fontSize: "1.1rem", color: node.color, margin:"0 0 1rem",
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
                height: "36px", flexShrink: 0, borderRadius:"50%",
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
                  fontSize: "0.7rem", fontWeight: 800, color: node.color, letterSpacing:"2px",
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
