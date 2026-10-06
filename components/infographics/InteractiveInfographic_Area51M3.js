'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9C8F5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Weaver, R. L. y McAndrew, J. (1995). The Roswell Report: Fact vs. Fiction in the New Mexico Desert. Washington D. C.: Headquarters United States Air Force / Government Printing Office.",
  "McAndrew, J. (1997). The Roswell Report: Case Closed. Washington D. C.: Headquarters United States Air Force.",
  "U.S. General Accounting Office (1995). Government Records: Results of a Search for Records Concerning the 1947 Crash Near Roswell, New Mexico (GAO/NSIAD-95-187).",
  "Haines, G. K. (1997). CIA's Role in the Study of UFOs, 1947-90. Studies in Intelligence, 1(1), 67-84.",
  "Sagan, C. (1995). The Demon-Haunted World: Science as a Candle in the Dark. Nueva York: Random House. (En español: El mundo y sus demonios.)",
  "Popper, K. R. (1959). The Logic of Scientific Discovery. Londres: Hutchinson. (Original en alemán: Logik der Forschung, 1934.)",
  "Douglas, K. M., Sutton, R. M. y Cichocka, A. (2017). The Psychology of Conspiracy Theories. Current Directions in Psychological Science, 26(6), 538-542.",
  "van Prooijen, J.-W., Douglas, K. M. y De Inocencio, C. (2018). Connecting the dots: Illusory pattern perception predicts belief in conspiracies and the supernatural. European Journal of Social Psychology, 48(3), 320-335.",
  "Vosoughi, S., Roy, D. y Aral, S. (2018). The spread of true and false news online. Science, 359(6380), 1146-1151.",
  "Office of the Director of National Intelligence (2021). Preliminary Assessment: Unidentified Aerial Phenomena. Washington D. C.",
  "All-domain Anomaly Resolution Office, U.S. Department of Defense (2024). Report on the Historical Record of U.S. Government Involvement with Unidentified Anomalous Phenomena, Volume 1.",
  "Oganessian, Yu. Ts. et al. (2004). Experiments on the synthesis of element 115 in the reaction 243Am(48Ca,xn)291-x115. Physical Review C, 69, 021601."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a51m3-verano-de-los-platillos",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-verano-de-los-platillos.webp',
    bannerCaption: "El 24 de junio de 1947 el piloto Kenneth Arnold reportó nueve objetos cerca del monte Rainier; la prensa habló de «platillos voladores».",
    title: "1947: el verano de los platillos voladores",
    color: '#6E7466',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-verano-de-los-platillos.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-verano-de-los-platillos.webp',
    content: [
      "Para entender los rumores sobre el Área 51 hay que retroceder a una época anterior a la propia base. El 24 de junio de 1947, un piloto civil y empresario llamado Kenneth Arnold volaba su avioneta cerca del monte Rainier, en el estado de Washington, cuando vio nueve objetos brillantes que se movían a gran velocidad en formación. Al aterrizar contó lo que había visto a otros pilotos y a periodistas, y su relato se publicó en periódicos de todo Estados Unidos.",
      "Arnold explicó que los objetos se movían «como un platillo si lo lanzas rebotando sobre el agua». Se refería al movimiento, no necesariamente a la forma, pero los periodistas crearon la expresión «platillo volador» y la idea de naves con forma de disco se extendió rapidísimo. Este detalle es muy interesante para un científico: muestra cómo una palabra elegida por la prensa puede cambiar lo que miles de personas esperan ver en el cielo a partir de ese momento.",
      "Durante las semanas siguientes, cientos de personas de todo el país reportaron haber visto platillos voladores. Muchos de esos reportes eran sinceros: la gente veía realmente algo en el cielo, como aviones reflejando el sol, globos, planetas brillantes o meteoros. Pero, después de leer las noticias, interpretaba esas luces como discos misteriosos. Los psicólogos llaman a esto contagio social: cuando un tema domina las conversaciones, más gente lo busca y, de algún modo, lo «encuentra».",
      "El contexto ayudaba. En 1947 la Guerra Fría acababa de comenzar, las bombas atómicas lanzadas sobre Japón dos años antes estaban en la memoria de todos y los cohetes alemanes V-2 capturados se probaban en el desierto de Nuevo México. La gente sabía que existían armas nuevas y secretas, y era razonable preguntarse si los objetos eran aviones soviéticos. La idea de visitantes de otros planetas cobró fuerza un poco después, alimentada por revistas, libros y películas de ciencia ficción.",
      "Hoy nadie sabe con certeza qué vio Kenneth Arnold. Algunos investigadores han propuesto que fueron aves, como pelícanos que reflejaban el sol, otros que fueron meteoros o aviones lejanos, y ninguna explicación ha quedado demostrada. Esa respuesta honesta, «no sabemos exactamente qué fue», es más científica que inventar una conclusión. Lo que sí sabemos es que su relato inauguró la era moderna de los OVNIs, apenas unos días antes de que empezara la historia de Roswell."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La sigla OVNI significa Objeto Volador No Identificado, una traducción del término inglés UFO que la Fuerza Aérea de Estados Unidos empezó a usar a comienzos de los años cincuenta para evitar la expresión «platillo volador». La palabra clave es «no identificado»: un OVNI no es una nave extraterrestre, sino cualquier cosa en el cielo que el observador no logra reconocer. Por eso, técnicamente, un globo o un avión que alguien no supo identificar también cuenta como OVNI." },
      { label: "Dato Científico", icon: "atom", text: "Calcular el tamaño y la velocidad de un objeto en el cielo es casi imposible a simple vista. Nuestro cerebro estima la distancia usando pistas como el tamaño conocido de las cosas o la presencia de otros objetos cerca. En el cielo abierto esas pistas no existen: una luz pequeña y cercana puede parecer idéntica a una enorme y lejana. Por eso los testigos, aun siendo honestos, suelen cometer grandes errores al describir la velocidad de un OVNI, ya que esa velocidad depende de la distancia que suponen." }
    ],
    fact: "Dato verificable: el avistamiento de Kenneth Arnold fue publicado al día siguiente por el periódico East Oregonian, de Pendleton, Oregón, y la agencia Associated Press difundió la historia por todo el país. En pocas semanas aparecieron cientos de reportes similares: el investigador Ted Bloecher contó más de 800 noticias de platillos voladores publicadas en la prensa estadounidense sólo durante el verano de 1947, en lo que se conoce como la primera gran «oleada» de OVNIs.",
  },
  {
    id: "a51m3-roswell-y-proyecto-mogul",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-roswell-y-proyecto-mogul.webp',
    bannerCaption: "En julio de 1947 el ejército anunció haber recuperado un «disco volador» cerca de Roswell; luego habló de un globo. Era Mogul.",
    title: "Roswell 1947: del «disco volador» al Proyecto Mogul",
    color: '#7C6B5D',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-roswell-y-proyecto-mogul.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-roswell-y-proyecto-mogul.webp',
    content: [
      "A mediados de junio de 1947, un capataz de rancho llamado William «Mac» Brazel encontró restos extraños esparcidos por un campo, a más de cien kilómetros de la ciudad de Roswell, en Nuevo México. Eran trozos de goma, papel de aluminio, papel resistente, cinta adhesiva y varillas ligeras de madera. A principios de julio, después de escuchar las noticias sobre los platillos voladores, Brazel informó del hallazgo al sheriff, que a su vez avisó a la base aérea del ejército en Roswell.",
      "El 8 de julio de 1947, la oficina de prensa de la base publicó un comunicado sorprendente: el ejército había recuperado un «disco volador». La noticia dio la vuelta al mundo en pocas horas. Pero ese mismo día el general Roger Ramey, en Fort Worth, Texas, mostró los restos a los periodistas y explicó que se trataba de un globo meteorológico con un reflector de radar. Los fotógrafos retrataron los materiales, la noticia se desinfló y el caso quedó prácticamente olvidado durante unos treinta años.",
      "La explicación del globo meteorológico era sólo parcialmente cierta. En 1994, la Fuerza Aérea publicó un informe que identificaba los restos como parte del Proyecto Mogul, un programa secreto en el que participaban la Universidad de Nueva York y el ejército. Mogul lanzaba largas cadenas de globos con micrófonos muy sensibles para intentar detectar, desde la atmósfera alta, las ondas sonoras de posibles pruebas nucleares soviéticas. Uno de esos trenes de globos, lanzado desde Alamogordo en junio de 1947, se perdió.",
      "Los materiales de Mogul encajan con lo que describió Brazel: los globos eran de neopreno, una goma que se oscurece y se vuelve quebradiza con el sol, y los reflectores de radar estaban hechos de varillas de balsa, papel de aluminio y cinta adhesiva con un estampado de flores, porque los fabricaban empresas de juguetes y novedades. Participantes del proyecto, como el ingeniero Charles B. Moore, confirmaron después esos detalles. El secreto del programa explica por qué en 1947 nadie dio la explicación completa.",
      "La historia de los extraterrestres de Roswell resurgió a finales de los años setenta, cuando investigadores de OVNIs entrevistaron a testigos más de treinta años después de los hechos y publicaron libros con relatos de naves estrelladas y cuerpos alienígenas. En 1997 la Fuerza Aérea publicó un segundo informe, «Caso cerrado», que proponía que muchos de esos recuerdos mezclaban sucesos posteriores, como pruebas de los años cincuenta con maniquíes lanzados en paracaídas desde globos, que algunas personas confundieron con cuerpos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hoy Roswell ha convertido su fama en una atracción. Desde comienzos de los años noventa funciona en la ciudad el Museo Internacional de OVNIs y Centro de Investigación, y cada mes de julio se celebra un festival con disfraces, conferencias y desfiles. Algunas farolas del centro tienen pintados ojos de extraterrestre. Para los habitantes es una fuente importante de turismo, aunque la evidencia histórica indica que lo que cayó en 1947 fue un tren de globos de un proyecto secreto." },
      { label: "Dato Científico", icon: "atom", text: "La idea científica detrás de Mogul era real e ingeniosa. En la atmósfera alta existe una capa en la que la temperatura y el viento hacen que el sonido quede atrapado y pueda viajar distancias enormes perdiendo poca energía, de manera parecida a como la luz viaja dentro de una fibra óptica. El geofísico Maurice Ewing propuso usar ese «canal de sonido» para escuchar explosiones lejanas. Aunque Mogul se canceló, los globos de gran altitud que desarrolló se usaron después en investigación científica." }
    ],
    fact: "Dato verificable: en 1995 la Oficina General de Contabilidad del gobierno de Estados Unidos (GAO), a petición del congresista Steven Schiff, de Nuevo México, publicó un informe sobre los documentos de Roswell. Encontró que algunos registros administrativos de la base de aquella época habían sido destruidos años antes, sin que quedara claro bajo qué autorización, algo que alimentó sospechas; pero no halló ningún documento que apoyara la historia de una nave extraterrestre.",
  },
  {
    id: "a51m3-silencio-oficial-y-avistamientos",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-silencio-oficial-y-avistamientos.webp',
    bannerCaption: "El Proyecto Libro Azul analizó 12,618 reportes de OVNIs entre 1952 y 1969; 701 quedaron como «no identificados».",
    title: "El silencio oficial y los cielos de Nevada",
    color: '#5D6C7A',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-silencio-oficial-y-avistamientos.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-silencio-oficial-y-avistamientos.webp',
    content: [
      "Cuando el Área 51 empezó a funcionar en 1955, ya existía en Estados Unidos una enorme curiosidad por los OVNIs. Y justo entonces comenzaron a volar en el desierto aviones que no se parecían a nada conocido. El U-2 volaba a alturas que casi nadie creía posibles; años después, el A-12 cruzaba el cielo a más de tres veces la velocidad del sonido, y más tarde los aviones furtivos volaban de noche con formas angulosas. Para un observador en tierra, todo eso era desconcertante y difícil de explicar.",
      "La Fuerza Aérea tenía un programa oficial para investigar los reportes de OVNIs, el Proyecto Libro Azul, que funcionó entre 1952 y 1969. En total analizó 12,618 reportes. La gran mayoría se explicó como aviones, globos, estrellas, planetas, satélites, meteoros, nubes o engaños. Sólo 701 casos quedaron clasificados como «no identificados», en general porque la información disponible era insuficiente. El programa concluyó que no había evidencia de amenazas ni de naves extraterrestres.",
      "Aquí aparece el gran problema del secreto. Según la historia desclasificada de la CIA, los investigadores del Libro Azul consultaban al personal del programa U-2 y comparaban los reportes con los registros de vuelo, y así podían explicar muchos avistamientos. Pero no podían contarle al público que aquella luz brillante del atardecer era un avión espía a 20 kilómetros de altura, porque eso habría revelado un programa secreto. La explicación existía, pero se quedaba guardada en un cajón.",
      "En 1997 el historiador de la CIA Gerald Haines publicó un artículo en la revista interna de la agencia en el que afirmaba que más de la mitad de los reportes de OVNIs desde finales de los años cincuenta y durante los sesenta se debían a vuelos de reconocimiento tripulados, como los del U-2 y el A-12. Algunos investigadores consideran exagerada esa cifra, pero coinciden en lo esencial: los vuelos secretos provocaron muchos avistamientos que el gobierno no podía explicar abiertamente.",
      "Este caso enseña una lección importante sobre cómo nacen los rumores. Cuando hay un hecho real sin explicar, como luces extrañas en el cielo, y una autoridad que guarda silencio, las personas buscan sus propias explicaciones. Algunas eligen la más emocionante o la que encaja con lo que ya creían. El silencio oficial no prueba que se oculte algo extraordinario: en el caso del Área 51, lo que se ocultaba eran aviones. Pero la falta de información deja un vacío que la imaginación llena con facilidad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1966 la Fuerza Aérea encargó a la Universidad de Colorado un estudio independiente sobre los OVNIs, dirigido por el físico Edward Condon. Su informe final, terminado a finales de 1968 y publicado a comienzos de 1969, analizó decenas de casos y concluyó que estudiar los OVNIs no había aportado nada nuevo al conocimiento científico y que no se justificaba un programa especial. En diciembre de 1969 la Fuerza Aérea cerró el Proyecto Libro Azul, y sus archivos acabaron en los Archivos Nacionales." },
      { label: "Dato Científico", icon: "atom", text: "Al atardecer, el sol ya se ha ocultado para una persona en el suelo, pero sigue iluminando objetos que están muy altos. Un avión a 20 kilómetros de altura puede recibir luz solar bastante tiempo después de la puesta de sol, porque desde esa altura el horizonte está mucho más lejos. Sus superficies metálicas reflejan la luz rojiza y anaranjada del sol bajo y, vistas desde el suelo ya oscuro, parecen objetos ardientes o luminosos. Lo mismo ocurre hoy con los satélites que brillan poco después del anochecer." }
    ],
    fact: "Dato verificable: los archivos del Proyecto Libro Azul se conservan en los Archivos Nacionales de Estados Unidos, y gran parte de ellos se ha digitalizado y puede consultarse en línea. El astrónomo J. Allen Hynek, que fue asesor científico del proyecto durante años, comenzó siendo escéptico y terminó defendiendo que algunos casos merecían un estudio científico más serio. Su trayectoria muestra que el debate también ocurrió entre científicos, no sólo entre creyentes e incrédulos.",
  },
  {
    id: "a51m3-bob-lazar-y-la-evidencia",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-bob-lazar-y-la-evidencia.webp',
    bannerCaption: "En 1989 Bob Lazar dijo en televisión haber trabajado con naves alienígenas cerca del Área 51; sus afirmaciones nunca se verificaron.",
    title: "Bob Lazar: cómo poner a prueba un testimonio",
    color: '#74687A',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-bob-lazar-y-la-evidencia.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-bob-lazar-y-la-evidencia.webp',
    content: [
      "En 1989, un hombre llamado Bob Lazar apareció en una cadena de televisión de Las Vegas, primero de forma anónima y luego con su nombre. Afirmó haber trabajado en un lugar llamado S-4, cerca del Área 51, donde supuestamente se estudiaban nueve naves extraterrestres. Dijo que esas naves se impulsaban con un elemento químico entonces desconocido, el número 115, que generaba ondas de gravedad. Su relato era detallado y seguro, y se convirtió en la base de muchísimas teorías posteriores.",
      "Un testimonio, por convincente que parezca, es una afirmación que hay que comprobar. Varios investigadores y periodistas revisaron las credenciales que Lazar decía tener. Él afirmaba poseer títulos de maestría del Instituto Tecnológico de Massachusetts (MIT) y del Instituto Tecnológico de California (Caltech), pero no se encontraron registros de que hubiera estudiado en esas universidades. Sí hay constancia de que asistió a una escuela universitaria comunitaria en California, lo que no encaja con su historia.",
      "Lazar y sus seguidores responden que el gobierno borró sus registros para desacreditarlo. Esta respuesta es un ejemplo de algo que veremos más adelante: cuando la falta de pruebas se presenta como prueba de que existe una conspiración, la idea se vuelve imposible de comprobar. Además, nunca ha aparecido otro trabajador que confirme haber visto esas naves, ni documentos, fotografías o materiales que respalden su relato. Toda la evidencia depende únicamente de su palabra.",
      "Hay un detalle fascinante que permite poner la historia a prueba con química. En 2003, científicos de Rusia y Estados Unidos sintetizaron por primera vez el elemento 115 en el laboratorio de Dubna, y en 2016 recibió el nombre de moscovio. Pero el moscovio real es extremadamente inestable: sus átomos se desintegran en menos de un segundo. No se ha encontrado ninguna forma estable que pudiera usarse como combustible, como afirmaba Lazar. Su afirmación era comprobable, y por ahora la evidencia la contradice.",
      "Analizar el caso Lazar no significa burlarse de nadie, sino aplicar las mismas reglas a todas las afirmaciones. Las preguntas son siempre parecidas: ¿se pueden verificar los datos de la persona?, ¿hay otros testigos independientes?, ¿existe evidencia física?, ¿lo que dice coincide con lo que sabemos de física y química? Cuando las respuestas son negativas, lo razonable no es afirmar con certeza que miente, sino concluir que su historia no está respaldada por evidencia y no puede aceptarse como un hecho."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los científicos que crean elementos superpesados lo hacen disparando núcleos ligeros contra núcleos pesados en un acelerador de partículas. Para obtener moscovio, el equipo de Dubna bombardeó durante semanas un blanco de americio-243 con iones de calcio-48 y sólo consiguió producir unos pocos átomos. Cada átomo se identifica por la cadena de partículas que emite al desintegrarse. Es un trabajo tan difícil que los resultados deben ser confirmados por otros laboratorios antes de ser aceptados oficialmente." },
      { label: "Dato Científico", icon: "atom", text: "Algunos físicos han propuesto que podría existir una «isla de estabilidad», un grupo de elementos superpesados con ciertas combinaciones de protones y neutrones que serían mucho más duraderos que sus vecinos. Es una hipótesis científica seria, basada en el modelo de capas del núcleo atómico, pero hasta ahora no se ha encontrado ningún elemento superpesado estable. Una hipótesis puede ser interesante y razonable, pero sólo se acepta cuando los experimentos la confirman, y eso todavía no ha ocurrido." }
    ],
    fact: "Dato verificable: el moscovio (símbolo Mc, número atómico 115) fue reconocido oficialmente por la Unión Internacional de Química Pura y Aplicada (IUPAC) en diciembre de 2015 y recibió su nombre en noviembre de 2016, en honor a la región de Moscú, donde se encuentra el Instituto Conjunto de Investigación Nuclear de Dubna. Su isótopo más duradero conocido tiene una vida media de alrededor de 0.65 segundos: nada parecido a un combustible estable.",
  },
  {
    id: "a51m3-de-la-pantalla-a-storm-area-51",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-de-la-pantalla-a-storm-area-51.webp',
    bannerCaption: "En 2019 más de dos millones de personas se apuntaron en Facebook a «asaltar» el Área 51; el 20 de septiembre nadie entró.",
    title: "De la pantalla a internet: Storm Area 51",
    color: '#6A7A72',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-de-la-pantalla-a-storm-area-51.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-de-la-pantalla-a-storm-area-51.webp',
    content: [
      "A partir de los años noventa, el Área 51 se convirtió en una estrella de la cultura popular. La serie de televisión «Expediente X», estrenada en 1993, popularizó la idea de un gobierno que esconde la verdad sobre los extraterrestres, y la película «Día de la Independencia», de 1996, mostró naves alienígenas guardadas en hangares de la base. Estas historias eran ficción y sus creadores lo sabían, pero millones de personas asociaron para siempre el nombre de la base con alienígenas.",
      "En 1995 se emitió por televisión en muchos países una película en blanco y negro que supuestamente mostraba la autopsia de un extraterrestre recuperado en Roswell. Durante años se discutió su autenticidad. Finalmente, en 2006, el productor británico Ray Santilli admitió que se trataba de una recreación filmada en un apartamento de Londres con un muñeco, aunque aseguró que se basaba en una película original que él había visto. Nunca presentó esa supuesta película original.",
      "En junio de 2019, un joven estadounidense llamado Matty Roberts creó como broma un evento en Facebook titulado «Storm Area 51, They Can't Stop All of Us» (Asaltemos el Área 51, no pueden detenernos a todos). En pocas semanas, más de dos millones de personas marcaron que asistirían el 20 de septiembre y alrededor de un millón y medio más mostró interés. El evento se volvió viral con memes y videos, y la Fuerza Aérea advirtió públicamente que defendería la instalación.",
      "Al llegar la fecha, la realidad fue muy distinta de lo que sugería internet. Roberts se desligó del asalto y promovió un festival en el pueblo de Rachel. Unos pocos miles de personas acudieron a festivales en Rachel y Hiko, y apenas unos cientos se acercaron a las entradas de la base, donde se tomaron fotos, bailaron y bromearon. Hubo unas pocas detenciones por infracciones menores y nadie entró. Aunque todo empezó como una broma, las autoridades locales tuvieron que prepararse para una emergencia.",
      "El caso Storm Area 51 muestra cómo funcionan los rumores en la era digital. Una idea llamativa se comparte millones de veces en horas sin que nadie la compruebe, porque compartirla es fácil y divertido. Marcar «asistiré» en una red social no es lo mismo que viajar al desierto, del mismo modo que compartir una afirmación no es lo mismo que haberla verificado. Antes de difundir algo, un buen investigador se pregunta de dónde viene la información y si alguien la ha confirmado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La broma de 2019 tuvo efectos reales en el desierto. El condado de Lincoln, en Nevada, donde se encuentra gran parte de la base, declaró un estado de emergencia preventivo por temor a que llegaran decenas de miles de personas a una zona con muy pocos servicios y lejos de los hospitales. Se instalaron baños portátiles, puestos médicos y patrullas adicionales. Para algunos residentes fue una oportunidad de negocio, y para todos, un recordatorio de lo frágil que es la infraestructura en una región tan aislada." },
      { label: "Dato Científico", icon: "atom", text: "Los estudios sobre redes sociales muestran que las noticias falsas suelen difundirse más rápido que las verdaderas. En 2018, investigadores del Instituto Tecnológico de Massachusetts publicaron en la revista Science un análisis de unas 126,000 historias compartidas en Twitter entre 2006 y 2017. Encontraron que las falsas tenían un 70 % más de probabilidades de ser compartidas que las verdaderas, en gran parte porque resultaban más novedosas y provocaban emociones fuertes, como sorpresa o asombro." }
    ],
    fact: "Dato verificable: en julio de 2019, la portavoz de la Fuerza Aérea de Estados Unidos Laura McAndrews declaró al diario The Washington Post que el Área 51 es «un campo de entrenamiento abierto para la Fuerza Aérea de EE. UU.» y que desaconsejaban a cualquiera intentar entrar en la zona donde se entrenan las fuerzas armadas, añadiendo que la Fuerza Aérea siempre está lista para proteger a Estados Unidos y sus bienes. Fue una declaración pública poco habitual sobre la base.",
  },
  {
    id: "a51m3-la-mente-que-busca-patrones",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-la-mente-que-busca-patrones.webp',
    bannerCaption: "Nuestro cerebro detecta patrones incluso en el azar; esa habilidad útil también puede llevarnos al pensamiento conspirativo.",
    title: "La mente que busca patrones",
    color: '#806E62',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-la-mente-que-busca-patrones.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-la-mente-que-busca-patrones.webp',
    content: [
      "El cerebro humano es una máquina extraordinaria para detectar patrones. Gracias a esa capacidad, nuestros antepasados reconocían rostros, anticipaban el cambio de las estaciones o detectaban a un depredador escondido entre la hierba. Pero esa habilidad tiene un costo: a veces vemos patrones donde no los hay. Cuando miramos las nubes y vemos un dragón, o un enchufe que parece una cara sorprendida, experimentamos pareidolia, la tendencia a percibir formas conocidas en estímulos al azar.",
      "Un fenómeno más amplio es la apofenia, término propuesto por el psiquiatra alemán Klaus Conrad en 1958: la tendencia a ver conexiones significativas entre cosas que no están relacionadas. Un estudio publicado en 2018 por investigadores de Países Bajos y Reino Unido encontró que las personas que más creían en teorías conspirativas también tendían a ver patrones en secuencias aleatorias, como los resultados de lanzar una moneda. Ver conexiones ocultas en todas partes es una pista de este tipo de pensamiento.",
      "Otro mecanismo es el sesgo de confirmación: tendemos a buscar, recordar y creer la información que confirma lo que ya pensamos, e ignorar la que lo contradice. Si alguien está convencido de que el Área 51 esconde extraterrestres, cada luz extraña en el cielo le parecerá una prueba, mientras que los documentos sobre aviones espía le parecerán sospechosos. Este sesgo afecta a todas las personas, también a los científicos, y por eso la ciencia usa métodos como la revisión por pares para compensarlo.",
      "Los psicólogos llaman pensamiento conspirativo a la tendencia a explicar sucesos importantes o secretos como resultado de planes ocultos de grupos poderosos. Según una revisión de los psicólogos Karen Douglas, Robbie Sutton y Aleksandra Cichocka publicada en 2017, estas creencias atraen porque prometen satisfacer necesidades humanas: entender lo que pasa, sentirse seguro y con control, y sentirse parte de un grupo especial que «sabe la verdad». Paradójicamente, no parecen lograr que las personas se sientan mejor.",
      "Un rasgo típico del pensamiento conspirativo es el razonamiento circular: toda prueba en contra se interpreta como parte de la conspiración. Si la CIA publica documentos sobre aviones espía, es porque quiere distraer; si no publica nada, es porque oculta algo. Así, ninguna evidencia puede cambiar la creencia. Reconocer este patrón no nos convierte en personas que no creen nada, sino en pensadores que exigen que las ideas puedan ponerse a prueba. Hay secretos reales, pero se descubren con evidencia, no con suposiciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Existen conspiraciones reales que fueron descubiertas, y es importante reconocerlo. El propio programa del U-2 fue un secreto gubernamental durante años, y el caso Watergate demostró en los años setenta que un gobierno podía ocultar actividades ilegales. Pero esos secretos salieron a la luz gracias a documentos, testigos verificables, periodistas e investigaciones oficiales, es decir, gracias a evidencia. La diferencia entre una conspiración real y una teoría conspirativa sin fundamento está en las pruebas que la sostienen." },
      { label: "Dato Científico", icon: "atom", text: "La pareidolia facial tiene una base en el cerebro. En la parte inferior del lóbulo temporal existe una región llamada área fusiforme de la cara, que se activa con fuerza cuando vemos rostros. Estudios con resonancia magnética funcional han mostrado que también responde, aunque menos, ante objetos que sólo se parecen a una cara, como el frente de un automóvil. Detectar caras muy rápido era tan importante para sobrevivir que el cerebro prefiere equivocarse viendo caras de más que pasar por alto una real." }
    ],
    fact: "Dato verificable: en 1976 la sonda Viking 1 de la NASA fotografió en la región de Cydonia, en Marte, una colina que, con la iluminación de ese momento y la baja resolución de la imagen, parecía un rostro humano. Muchas personas la interpretaron como una construcción artificial. En 1998 y 2001, la sonda Mars Global Surveyor tomó imágenes mucho más detalladas que mostraron que se trata de una meseta natural erosionada. Es un ejemplo clásico de pareidolia.",
  },
  {
    id: "a51m3-herramientas-del-cazador-de-mitos",
    bannerImage: '/assets/area51/infographic_m3/banner_a51m3-herramientas-del-cazador-de-mitos.webp',
    bannerCaption: "Falsabilidad, navaja de Ockham y la regla de Sagan: «afirmaciones extraordinarias requieren evidencias extraordinarias».",
    title: "Las herramientas del cazador de mitos",
    color: '#5C6F6A',
    btnImage: '/assets/area51/infographic_m3/btn_a51m3-herramientas-del-cazador-de-mitos.webp',
    image: '/assets/area51/infographic_m3/hero_a51m3-herramientas-del-cazador-de-mitos.webp',
    content: [
      "La ciencia ofrece herramientas sencillas para protegernos de los rumores. La primera es la falsabilidad, propuesta por el filósofo Karl Popper en 1934: una afirmación científica debe poder ponerse a prueba, es decir, debe existir alguna observación que, si ocurriera, demostraría que es falsa. «El Área 51 se creó para probar aviones espía» es comprobable con documentos, fotos y testigos. «Hay extraterrestres ocultos y toda prueba en contra es un engaño» no puede comprobarse, y por eso no es científica.",
      "La segunda herramienta es la navaja de Ockham, un principio atribuido al filósofo inglés Guillermo de Ockham, del siglo XIV. Dice, de forma simplificada, que entre varias explicaciones que encajan igual de bien con los hechos conviene preferir la que necesita menos suposiciones. Para explicar luces extrañas sobre Nevada podemos suponer aviones secretos, algo que sabemos que existió, o naves de otra estrella, algo de lo que no hay ninguna prueba. La primera opción requiere muchas menos suposiciones nuevas.",
      "La tercera herramienta la popularizó el astrónomo Carl Sagan en su serie «Cosmos», de 1980: «las afirmaciones extraordinarias requieren evidencias extraordinarias». Si alguien dice que tiene un perro, le creemos sin problema; si dice que tiene un dragón en el garaje, necesitamos muchas más pruebas. En su libro «El mundo y sus demonios», de 1995, Sagan propuso un «kit para detectar camelos», con consejos como buscar confirmación independiente de los hechos y no confiar sólo en la autoridad de alguien.",
      "¿Significa esto que todos los objetos del cielo están explicados? No. En 2021, la Oficina del Director de Inteligencia Nacional de Estados Unidos publicó un informe sobre 144 reportes de militares acerca de fenómenos aéreos no identificados, hoy llamados UAP; sólo uno quedó explicado con certeza, como un globo grande que se desinflaba. Pero «no identificado» significa que faltan datos, no que sea extraterrestre. Muchos casos tenían información insuficiente o podían deberse a globos, drones o efectos de los sensores.",
      "En 2022 el Departamento de Defensa creó una oficina especial, llamada AARO, para estudiar estos fenómenos. En 2024 publicó un informe histórico que revisó décadas de programas del gobierno y concluyó que no había encontrado ninguna evidencia de tecnología extraterrestre ni de naves recuperadas, y que muchas historias se originaban en programas secretos reales mal interpretados. Ser un buen científico significa sentirse cómodo diciendo «todavía no lo sé» y seguir investigando con las mejores herramientas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2023 la NASA publicó el informe de un equipo independiente de científicos que estudió cómo investigar los fenómenos aéreos no identificados. El equipo concluyó que no había evidencia de que tuvieran un origen extraterrestre, pero recomendó usar mejores datos: sensores calibrados, satélites, inteligencia artificial y herramientas para que los ciudadanos puedan enviar reportes con información útil. Su mensaje principal fue que el problema se resuelve con más ciencia y con datos de mejor calidad, no con menos." },
      { label: "Dato Científico", icon: "atom", text: "Una forma científica de pensar en la evidencia es el razonamiento probabilístico. Antes de ver una prueba, cada explicación tiene cierta probabilidad según lo que ya sabemos. Que existieran aviones secretos en Nevada era muy probable, porque hay documentos que lo confirman; que llegaran naves de otra estrella era muy improbable, porque nunca se ha confirmado algo así. Una luz en el cielo encaja con ambas ideas, así que por sí sola no cambia mucho la balanza. Sólo una prueba muy fuerte podría hacerlo." }
    ],
    fact: "Dato verificable: en marzo de 2024 la Oficina de Resolución de Anomalías en Todos los Dominios (AARO) del Departamento de Defensa de Estados Unidos publicó el primer volumen de su informe sobre el registro histórico de la participación del gobierno estadounidense en el estudio de los fenómenos anómalos no identificados. El informe afirma no haber encontrado evidencia verificable de que alguna observación de UAP represente tecnología extraterrestre.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '156,143,90' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(156,143,90,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradArea51M3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6E7466", "#7C6B5D", "#5D6C7A", "#74687A", "#6A7A72", "#806E62", "#5C6F6A"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9C8F5A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9C8F5A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradArea51M3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(156,143,90,0.2)" />
            <stop offset="50%" stopColor="rgba(156,143,90,0.9)" />
            <stop offset="100%" stopColor="rgba(156,143,90,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9C8F5A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CÓMO NACEN LOS RUMORES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(156,143,90,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ÁREA 51 · PENSAMIENTO CRÍTICO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(156,143,90,0.2)'}`,
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
          layoutId="activeDotArea51M3"
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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

      {/* ─── Two-Column Hero Section ─── */}
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

      {/* ─── Magazine Body ─── */}
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
                  {i === 0 ? '◆' : '◇'}
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
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
              {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`,
            borderRadius: '16px',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0,
              width: '36px', height: '36px',
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
                Dato Científico
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
      border: '1px solid rgba(156,143,90,0.15)',
    }}>
      <Star size={14} style={{ color: '#9C8F5A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9C8F5A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(156,143,90,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9C8F5A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Area51M3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(156,143,90,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(156,143,90,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem 1.2rem',
        position: 'relative',
        zIndex: 2,
        marginBottom: '1rem',
        padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton
            key={node.id}
            node={node}
            index={index}
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

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(156,143,90,0.08)', borderRadius: '16px',
              border: '1px solid rgba(156,143,90,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9C8F5A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Cazador de Mitos: de Roswell a internet, aprende a poner a prueba las historias
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ─── Bibliografía ─── */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📚 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
