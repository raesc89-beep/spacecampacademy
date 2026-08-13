'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Cosmic / Voyager themed) ────────────────────────
function DecoStar({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Five-pointed star */}
      <path d="M30 5 L35 22 L53 22 L38 33 L43 50 L30 40 L17 50 L22 33 L7 22 L25 22 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      {/* Inner glow */}
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.15" />
      {/* Twinkle rays */}
      <line x1="30" y1="2" x2="30" y2="10" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="50" x2="30" y2="58" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="2" y1="30" x2="10" y2="30" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="50" y1="30" x2="58" y2="30" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoVoyager({ size = 80, color = '#7A5BAF', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Spacecraft body */}
      <rect x="30" y="18" width="20" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Dish antenna */}
      <path d="M25 24 Q15 10 5 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="5" cy="18" r="3" fill={color} opacity="0.3" />
      {/* Boom arm */}
      <line x1="50" y1="24" x2="70" y2="16" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="70" cy="16" r="2.5" fill={color} opacity="0.3" />
      {/* Solar panel wings */}
      <rect x="32" y="6" width="6" height="10" rx="1" fill={color} opacity="0.2" />
      <rect x="42" y="6" width="6" height="10" rx="1" fill={color} opacity="0.2" />
      {/* Signal waves */}
      <path d="M5 14 Q2 10 5 6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M3 16 Q-2 10 3 4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoGoldenRecord({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer disc */}
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Grooves */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      {/* Center hole */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Engraved diagram marks */}
      <line x1="30" y1="4" x2="30" y2="8" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="56" y1="30" x2="52" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="56" x2="30" y2="52" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="4" y1="30" x2="8" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoPlanetOrbit({ size = 70, color = '#9370C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sun */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {/* Orbits */}
      <ellipse cx="30" cy="30" rx="12" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" transform="rotate(-15 30 30)" />
      <ellipse cx="30" cy="30" rx="20" ry="14" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" transform="rotate(-15 30 30)" />
      <ellipse cx="30" cy="30" rx="26" ry="18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" transform="rotate(-15 30 30)" />
      {/* Planets */}
      <circle cx="42" cy="28" r="2" fill={color} opacity="0.5" />
      <circle cx="18" cy="38" r="2.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="22" r="1.5" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoHeliosphere({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Heliosphere bubble */}
      <ellipse cx="26" cy="30" rx="22" ry="24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
      {/* Sun at center */}
      <circle cx="20" cy="30" r="4" fill={color} opacity="0.4" />
      {/* Solar wind lines */}
      <path d="M24 30 Q32 28 40 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M24 26 Q32 24 38 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M24 34 Q32 36 38 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Bow shock */}
      <path d="M48 14 Q55 30 48 46" fill="none" stroke={color} strokeWidth="1" opacity="0.35" strokeDasharray="3 2" />
      {/* Interstellar particles */}
      <circle cx="54" cy="20" r="1" fill={color} opacity="0.4" />
      <circle cx="56" cy="38" r="1" fill={color} opacity="0.4" />
      <circle cx="52" cy="30" r="1.2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoPaleDot({ size = 70, color = '#5B3D8F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Light beam across frame */}
      <rect x="27" y="0" width="6" height="60" fill={color} opacity="0.1" rx="3" />
      {/* The pale dot */}
      <circle cx="30" cy="32" r="1.5" fill={color} opacity="0.8" />
      {/* Scattered light particles */}
      <circle cx="15" cy="12" r="0.8" fill={color} opacity="0.3" />
      <circle cx="45" cy="8" r="0.6" fill={color} opacity="0.25" />
      <circle cx="10" cy="45" r="0.7" fill={color} opacity="0.3" />
      <circle cx="50" cy="50" r="0.9" fill={color} opacity="0.25" />
      <circle cx="38" cy="18" r="0.5" fill={color} opacity="0.2" />
      <circle cx="22" cy="52" r="0.6" fill={color} opacity="0.2" />
      {/* Frame border */}
      <rect x="4" y="4" width="52" height="52" rx="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Camera vignette corners */}
      <path d="M4 12 L4 4 L12 4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <path d="M48 4 L56 4 L56 12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <path d="M56 48 L56 56 L48 56" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <path d="M12 56 L4 56 L4 48" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'foto-lejana': [DecoPaleDot, DecoVoyager, DecoStar],
  'el-discurso': [DecoPaleDot, DecoStar, DecoGoldenRecord],
  'voyager-1-y-2': [DecoVoyager, DecoPlanetOrbit, DecoHeliosphere],
  'disco-de-oro': [DecoGoldenRecord, DecoStar, DecoVoyager],
  'perspectiva-cosmica': [DecoPaleDot, DecoPlanetOrbit, DecoStar],
  'espacio-interestelar': [DecoHeliosphere, DecoVoyager, DecoPlanetOrbit],
  'lugar-en-cosmos': [DecoStar, DecoPaleDot, DecoGoldenRecord],
};

// ─── Content Data ─────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space. Random House.',
  'Sagan, C. & Druyan, A. (1997). Billions & Billions: Thoughts on Life and Death at the Brink of the Millennium. Random House.',
  'Ferris, T. (2012). The Science of Liberty: Democracy, Reason, and the Laws of Nature. Harper Perennial.',
  'NASA Jet Propulsion Laboratory (2024). Voyager Mission Status. California Institute of Technology.',
  'Bell, J. (2015). The Interstellar Age: Inside the Forty-Year Voyager Mission. Dutton.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'foto-lejana',
    title: 'La Foto Más Lejana',
    color: '#5B3D8F',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'El 14 de febrero de 1990, la sonda Voyager 1 se encontraba a 6,054 millones de kilómetros de la Tierra. Carl Sagan había insistido durante meses ante la NASA para que la nave girara su cámara hacia atrás y tomara una última fotografía de nuestro planeta. Muchos ingenieros del Jet Propulsion Laboratory (JPL) en Pasadena, California, consideraban que la imagen no tendría ningún valor científico medible, pero Sagan argumentó que su valor sería filosófico y cultural, algo que cambiaría la forma en que los seres humanos se perciben a sí mismos dentro del cosmos.',
      'La cámara de ángulo estrecho del Voyager 1 capturó la Tierra como un punto de apenas 0.12 píxeles de ancho, suspendido en un rayo de luz solar dispersa. La imagen fue tomada a través de tres filtros de color: azul, verde y violeta. Los rayos de luz que cruzan la fotografía no son un efecto artístico, sino dispersión real de la luz solar dentro de la óptica de la cámara. La Tierra ocupa menos de una centésima de un solo píxel en la imagen original, lo que la convierte en el retrato más lejano jamás tomado de nuestro planeta hasta esa fecha.',
      'El equipo de procesamiento de imágenes del JPL, dirigido por Candy Hansen, trabajó durante semanas para procesar los datos crudos que Voyager 1 transmitió desde esa distancia. Las señales de radio, viajando a la velocidad de la luz (299,792 kilómetros por segundo), tardaron aproximadamente 5 horas y 36 minutos en llegar desde la sonda hasta las antenas de la Red de Espacio Profundo en la Tierra. Cada bit de información recorrió una distancia mayor que la que existe entre el Sol y el planeta Plutón.',
      'Sagan no actuó solo en esta petición. La idea original de tomar un retrato del sistema solar desde fuera surgió de una conversación entre Sagan y el equipo de ciencias de imagen del Voyager en 1981. La propuesta fue rechazada inicialmente porque apuntar la cámara hacia el Sol podía dañar los detectores de luz. Finalmente, después de que Voyager 1 completó sus objetivos científicos principales en Saturno, la NASA aprobó la secuencia fotográfica. Se tomaron 60 imágenes en total, creando un mosaico conocido como el "Retrato de Familia del Sistema Solar".',
      'El "Retrato de Familia" capturó seis de los nueve planetas reconocidos en aquel entonces: Venus, Tierra, Júpiter, Saturno, Urano y Neptuno. Mercurio estaba demasiado cerca del Sol para ser distinguido, Marte no registró suficiente luz en la cámara, y Plutón era demasiado pequeño y tenue. La Tierra, el tercer punto desde el Sol, quedó atrapada en un rayo de luz dispersa, lo que le confirió esa cualidad etérea que hizo de la imagen un símbolo universal de la fragilidad y la pequeñez humanas ante la inmensidad del espacio.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La cámara de Voyager 1 fue apagada permanentemente justo después de tomar la fotografía del Pale Blue Dot. Los ingenieros del JPL desactivaron el sistema de imagen para conservar energía y redirigirla a los instrumentos de detección de partículas y campos magnéticos, que serían necesarios para estudiar los límites del sistema solar. La última orden enviada a la cámara fue el comando de apagado, el 14 de febrero de 1990, exactamente el Día de San Valentín.' },
      { label: 'Dato Científico', icon: 'atom', text: 'A la distancia de 6,054 millones de kilómetros, la Tierra tiene un brillo aparente de magnitud 0.7, comparable al de la estrella Altair vista desde la superficie terrestre. Sin embargo, el campo de visión de la cámara del Voyager es tan estrecho (0.48 grados) que nuestro planeta ocupa solo 0.12 píxeles. Para comparar: la Luna llena vista desde la Tierra ocupa aproximadamente 0.5 grados, lo que significa que desde Voyager 1, la Tierra es más de 4,000 veces más pequeña que la Luna en nuestro cielo nocturno.' },
    ],
    fact: 'En 2020, la NASA publicó una versión reprocesada de la fotografía del Pale Blue Dot con tecnología moderna de procesamiento de imágenes. El equipo del JPL utilizó software actualizado para equilibrar los colores y reducir el ruido digital, manteniendo la integridad científica de los datos originales. La nueva versión muestra con mayor claridad el punto azul y distingue mejor los rayos de luz dispersa. El anuncio se realizó el 12 de febrero de 2020, dos días antes del trigésimo aniversario de la imagen original.',
  },
  {
    id: 'el-discurso',
    title: 'El Discurso',
    color: '#D4A535',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'El 11 de mayo de 1996 es la fecha que suele citarse, pero Carl Sagan presentó su reflexión sobre el Pale Blue Dot por primera vez el 13 de octubre de 1994, durante una conferencia pública en la Universidad de Cornell, en Ithaca, Nueva York, donde fue profesor de astronomía y director del Laboratorio de Estudios Planetarios durante más de tres décadas. El texto formó parte de su libro "Pale Blue Dot: A Vision of the Human Future in Space", publicado por Random House en 1994, y se convirtió en uno de los pasajes más citados de la literatura científica del siglo XX.',
      '"Mira ese punto", escribió Sagan. "Eso es aquí. Eso es nuestro hogar. Eso somos nosotros. En él, todos los que amas, todos los que conoces, todos de los que alguna vez oíste hablar, cada ser humano que ha existido, vivió ahí su vida." Estas palabras no eran una exageración poética sino una descripción literal: cada evento de la historia humana, desde la invención de la agricultura hace 10,000 años hasta las guerras mundiales del siglo XX, ocurrió sobre un punto de 0.12 píxeles fotografiado desde 6,054 millones de kilómetros de distancia.',
      'El discurso continúa con una reflexión sobre la responsabilidad que implica esta perspectiva. Sagan señaló que todos los ríos de sangre derramada por generales y emperadores ocurrieron para que pudieran convertirse en "los amos momentáneos de una fracción de un punto". Mencionó que las innumerables religiones, ideologías y doctrinas económicas habían sido creadas y defendidas en ese pequeño escenario. Su objetivo no era minimizar los logros humanos sino ponerlos en una escala cósmica que invitara a la humildad y la cooperación entre pueblos.',
      'Lo que distingue el texto de Sagan de otros escritos sobre la Tierra es su tono científico combinado con sensibilidad humanista. No recurre a la exageración ni al sentimentalismo vacío: cada frase tiene base observacional. Cuando dice que la Tierra es "una mota de polvo suspendida en un rayo de sol", describe literalmente lo que muestra la fotografía del Voyager 1. Sagan fue un comunicador que utilizaba datos verificables como materia prima para construir argumentos que tocaban la emoción y la razón por igual.',
      'El impacto cultural del discurso se extiende más allá de la ciencia. Ha sido leído en sesiones del Congreso de los Estados Unidos, citado en discursos de las Naciones Unidas, utilizado en ceremonias de graduación de universidades en más de 40 países y adaptado como narración en documentales, álbumes musicales y obras de teatro. La grabación de audio original de Sagan leyendo el texto ha acumulado más de 100 millones de reproducciones en plataformas digitales. Es considerado por historiadores de la ciencia como uno de los textos de divulgación científica más influyentes del siglo XX.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Carl Sagan escribió el borrador inicial de la reflexión sobre el Pale Blue Dot en un solo día, en su oficina del Space Sciences Building de Cornell. Según Ann Druyan, su esposa y colaboradora, Sagan trabajó durante horas sin pausa después de recibir las imágenes procesadas del JPL. Druyan relató que cuando terminó de escribir, tenía lágrimas en los ojos. El texto sufrió pocas modificaciones antes de su publicación final en el libro de 1994.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Universidad de Cornell creó en 2015 el "Carl Sagan Institute" (Instituto Carl Sagan), dedicado a la búsqueda de signos de vida en planetas habitables fuera del sistema solar. Dirigido por la astrónoma Lisa Kaltenegger, el instituto utiliza datos del telescopio espacial James Webb y de observatorios terrestres para analizar las atmósferas de exoplanetas en busca de biofirmas como oxígeno, metano y ozono, continuando el legado directo de la visión de Sagan.' },
    ],
    fact: 'El libro "Pale Blue Dot" fue publicado el 1 de noviembre de 1994 y vendió más de 500,000 copias en su primera edición en inglés. Ha sido traducido a más de 20 idiomas. Carl Sagan dedicó el libro a Ann Druyan con las palabras: "En la vastedad del espacio y la inmensidad del tiempo, es un placer compartir un planeta y una época contigo." Sagan falleció el 20 de diciembre de 1996, a los 62 años, de mielodisplasia, una enfermedad de la sangre, en el Centro Médico Fred Hutchinson de Seattle.',
  },
  {
    id: 'voyager-1-y-2',
    title: 'Voyager 1 y 2',
    color: '#7A5BAF',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'Voyager 2 fue lanzada primero, el 20 de agosto de 1977, desde el Complejo de Lanzamiento 41 en Cabo Cañaveral, Florida, a bordo de un cohete Titan IIIE/Centaur. Voyager 1 despegó el 5 de septiembre de 1977, dieciséis días después, pero en una trayectoria más rápida que le permitió adelantar a su nave hermana. Ambas sondas fueron diseñadas por el Jet Propulsion Laboratory de la NASA y construidas bajo la dirección del ingeniero John Casani. El costo total del programa Voyager fue de aproximadamente 865 millones de dólares de la época.',
      'Las sondas aprovecharon una alineación planetaria que ocurre solo cada 176 años, conocida informalmente como el "Grand Tour". Esta configuración gravitacional permitía que una sola nave visitara los cuatro planetas gigantes exteriores — Júpiter, Saturno, Urano y Neptuno — usando la asistencia gravitacional de cada planeta para impulsarse hacia el siguiente sin necesidad de combustible adicional. El astrofísico Gary Flandro, del JPL, calculó esta oportunidad en 1965 y publicó sus hallazgos, sentando las bases para que la misión Voyager se desarrollara.',
      'Voyager 1 realizó su encuentro con Júpiter el 5 de marzo de 1979, descubriendo volcanes activos en la luna Ío, los primeros volcanes observados fuera de la Tierra. Detectó ocho erupciones simultáneas, algunas proyectando material a más de 300 kilómetros de altura. Luego pasó por Saturno el 12 de noviembre de 1980, revelando la estructura detallada de sus anillos: miles de anillos individuales compuestos de partículas de hielo que van desde el tamaño de granos de arena hasta el de casas, con brechas y ondulaciones causadas por las lunas pastoras del planeta.',
      'Voyager 2 completó el Grand Tour completo. Después de Júpiter (9 de julio de 1979) y Saturno (26 de agosto de 1981), la sonda llegó a Urano el 24 de enero de 1986, siendo la primera y única nave en visitar este planeta. Descubrió 10 nuevas lunas y dos nuevos anillos. Finalmente, el 25 de agosto de 1989, Voyager 2 realizó su sobrevuelo de Neptuno, detectando géiseres de nitrógeno en su luna Tritón que lanzaban material a 8 kilómetros de altura y revelando que Neptuno poseía los vientos más rápidos del sistema solar, con velocidades de hasta 2,100 km/h.',
      'Cada sonda Voyager pesa 825 kilogramos y mide 3.7 metros de ancho con su antena de alta ganancia desplegada. La potencia eléctrica proviene de tres generadores termoeléctricos de radioisótopos (RTG) que convierten el calor de la desintegración del plutonio-238 en electricidad. En 1977, cada RTG producía unos 157 watts; para 2025, la producción ha caído a menos de 65 watts, lo que obliga al equipo del JPL a apagar instrumentos gradualmente. Aun así, cinco instrumentos científicos permanecen operativos en Voyager 1, transmitiendo datos sobre el entorno del espacio interestelar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las computadoras de las sondas Voyager tienen menos memoria que una calculadora moderna. El sistema de comando utiliza tres computadoras redundantes con un total de 69.63 kilobytes de memoria, equivalente a menos de una fotografía de baja resolución en un teléfono actual. Sin embargo, este hardware ha funcionado sin interrupciones durante más de 47 años en las condiciones más hostiles del espacio profundo, un testimonio de la ingeniería robusta del JPL en la década de 1970.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las señales de radio transmitidas por Voyager 1 tienen una potencia de apenas 23 watts, comparable a la de una bombilla de refrigerador. Estas señales tardan más de 22 horas en llegar a la Tierra, viajando a la velocidad de la luz. Para captarlas, la NASA utiliza la Red de Espacio Profundo (DSN), compuesta por tres estaciones con antenas de 70 metros de diámetro ubicadas en Goldstone (California), Madrid (España) y Canberra (Australia), espaciadas 120 grados alrededor del globo.' },
    ],
    fact: 'Voyager 2 sigue siendo la única nave espacial que ha visitado los planetas Urano y Neptuno. No existe ninguna misión aprobada para regresar a estos mundos antes de la década de 2040. Los datos recopilados por Voyager 2 durante sus breves sobrevuelos — apenas 6 horas cerca de cada planeta — constituyen más del 95% de todo el conocimiento científico directo que la humanidad posee sobre estos dos gigantes de hielo, un hecho que subraya lo limitada que es aún nuestra exploración del sistema solar exterior.',
  },
  {
    id: 'disco-de-oro',
    title: 'El Disco de Oro',
    color: '#C49225',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'El Disco de Oro Voyager (Voyager Golden Record) es un disco fonográfico chapado en oro de 12 pulgadas (30 centímetros) de diámetro que viaja a bordo de cada una de las dos sondas Voyager. Fue diseñado para durar miles de millones de años en el vacío del espacio interestelar, protegido dentro de una funda de aluminio chapada en oro. Carl Sagan presidió el comité de selección de contenidos, que trabajó durante seis meses bajo una presión enorme: debían comprimir la esencia de la civilización humana y la diversidad biológica de la Tierra en un solo disco.',
      'El disco contiene 115 imágenes codificadas en formato analógico que muestran la vida en la Tierra. Las imágenes incluyen la estructura del ADN, anatomía humana, una madre amamantando, paisajes de seis continentes, un amanecer sobre el océano, un delfín saltando, las pirámides de Egipto y diagramas del sistema solar. También incluye 55 saludos en idiomas diferentes, desde el antiguo sumerio (una lengua muerta hace más de 4,000 años) hasta el wu, un dialecto chino hablado por 80 millones de personas, pasando por español, inglés, árabe, hindi, swahili y otros.',
      'La selección musical fue responsabilidad de Ann Druyan, quien luego se convertiría en la esposa de Carl Sagan. Druyan eligió 27 piezas musicales de diversas culturas y épocas: el "Concierto de Brandeburgo No. 2" de Johann Sebastian Bach, "El Sacrificio de la Primavera" de Stravinsky, percusiones senegalesas, música de gamelán de Java, cantos navajos, raga indio, una canción de boda peruana, y "Johnny B. Goode" de Chuck Berry. La inclusión de rock and roll generó debate: algunos miembros del comité argumentaron que era "adolescente", pero Sagan respondió que la Tierra tiene muchos adolescentes.',
      'Uno de los elementos más conmovedores del disco es la grabación de las ondas cerebrales de Ann Druyan. El 3 de junio de 1977, Druyan acudió al Hospital Bellevue de Nueva York, donde le conectaron un electroencefalógrafo (EEG) y un equipo que registraba las señales eléctricas de su sistema nervioso durante una hora. Druyan relató que durante la grabación meditó sobre la historia de la Tierra, la evolución de la vida, los conflictos humanos y, especialmente, sobre el hecho de haberse enamorado de Carl Sagan apenas dos días antes. Esas ondas cerebrales, comprimidas en un minuto de audio, viajan a bordo de ambas sondas.',
      'La cubierta del disco incluye instrucciones en un lenguaje simbólico diseñado para ser comprensible por seres inteligentes que no conozcan ningún idioma humano. Los diagramas muestran cómo reproducir el disco (con una aguja fonocaptora incluida), la velocidad de rotación correcta (16⅔ revoluciones por minuto), el tiempo de reproducción total (aproximadamente 2 horas), y la ubicación del Sol respecto a 14 púlsares conocidos, que sirven como una especie de mapa galáctico. La unidad de tiempo utilizada es el período de transición hiperfina del hidrógeno: 0.7 nanosegundos, una constante física universal reconocible por cualquier civilización con conocimientos de física básica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ann Druyan y Carl Sagan se enamoraron durante una llamada telefónica el 1 de junio de 1977, mientras discutían la selección musical para el Disco de Oro. Dos días después, el 3 de junio, Druyan grabó sus ondas cerebrales sabiendo que sus pensamientos de amor hacia Sagan viajarían literalmente hacia las estrellas. Se casaron en 1981 y permanecieron juntos hasta la muerte de Sagan en 1996. Druyan describió el disco como "una historia de amor enviada al cosmos".' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Disco de Oro está fabricado de cobre chapado en oro, un material elegido por su resistencia a la corrosión en el vacío espacial. Los ingenieros del JPL estimaron que el disco permanecerá reproducible durante al menos mil millones de años, siempre que no colisione con un objeto sólido. En comparación, un CD comercial se degrada en 25-100 años y un disco duro moderno falla en 3-5 años. El Disco de Oro es probablemente el medio de almacenamiento más duradero jamás creado por la humanidad.' },
    ],
    fact: 'El Disco de Oro no incluye ninguna imagen de guerra, enfermedad, pobreza o contaminación. El comité de Sagan debatió extensamente si debían mostrar los aspectos negativos de la humanidad, pero decidieron que el disco debía ser un mensaje de bienvenida, no un informe completo. Sagan argumentó que una civilización capaz de interceptar el Voyager ya conocería los conflictos inherentes a las sociedades tecnológicas. Se incluyó, sin embargo, el sonido de un beso, el llanto de un recién nacido y el latido de un corazón humano, sonidos que Sagan consideraba "universales".',
  },
  {
    id: 'perspectiva-cosmica',
    title: 'Perspectiva Cósmica',
    color: '#9370C4',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'La "perspectiva cósmica" es un concepto que Carl Sagan articuló a lo largo de toda su carrera: la idea de que observar la Tierra desde el espacio transforma la relación del ser humano con su propio planeta. Este cambio de percepción tiene un nombre formal en psicología: el "efecto de visión general" (overview effect), término acuñado por el escritor Frank White en su libro de 1987. White entrevistó a más de 30 astronautas y cosmonautas y documentó un patrón recurrente: al ver la Tierra desde el espacio, experimentaban una sensación de conexión con toda la vida terrestre y de insignificancia ante la inmensidad cósmica.',
      'El astronauta Edgar Mitchell, piloto del módulo lunar del Apollo 14 (1971), describió su experiencia al ver la Tierra desde la Luna como "una epifanía instantánea". Mitchell relató que, al regresar a la cápsula después de caminar sobre la superficie lunar, vio la Tierra como una esfera frágil y resplandeciente flotando en la oscuridad total. La experiencia le impactó tan profundamente que, al regresar a la Tierra, fundó el Instituto de Ciencias Noéticas (IONS) para estudiar la relación entre consciencia y realidad física.',
      'El cosmonauta ruso Yuri Gagarin, el primer humano en el espacio (12 de abril de 1961), transmitió por radio: "Veo la Tierra. Es tan hermosa." El astronauta saudí Sultan bin Salman al-Saud, que voló en el transbordador Discovery en 1985, afirmó: "El primer día todos señalábamos nuestros países. El tercer día señalábamos nuestros continentes. El quinto día solo veíamos una Tierra." Estas experiencias coinciden con la visión que Sagan expresó desde la superficie terrestre utilizando datos y fotografías de sondas robóticas.',
      'Sagan vinculó la perspectiva cósmica con la responsabilidad medioambiental. En su libro "Pale Blue Dot" (1994) argumentó que la ausencia de otro mundo habitable accesible en un futuro cercano obliga a la humanidad a proteger el único planeta que tiene. Escribió que "no hay ningún indicio de que la ayuda vaya a venir de otro lugar para salvarnos de nosotros mismos". Esta afirmación se basaba en datos observacionales: hasta 1994, no se había confirmado la existencia de ningún exoplaneta; el primero, 51 Pegasi b, fue descubierto en 1995 por Michel Mayor y Didier Queloz.',
      'La humildad de Sagan no era falsa modestia sino una posición fundamentada en la escala del universo observable. La Tierra tiene un diámetro de 12,742 kilómetros. El Sol tiene un diámetro 109 veces mayor. La estrella más cercana, Próxima Centauri, está a 4.24 años luz (40.14 billones de kilómetros). La Vía Láctea contiene entre 100,000 y 400,000 millones de estrellas distribuidas en un disco de 100,000 años luz de diámetro. Y el universo observable contiene al menos 200,000 millones de galaxias. Sagan utilizaba estas cifras no para abrumar, sino para invitar a un sentido de proporción que, según él, debía guiar tanto la política como la ciencia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta Ron Garan, que pasó 178 días en la Estación Espacial Internacional entre 2008 y 2011, acuñó la expresión "orbital perspective" para describir la transformación emocional que sufrió al observar la Tierra 16 veces al día desde 400 kilómetros de altura. Garan fundó una organización sin fines de lucro dedicada a aplicar esta perspectiva a problemas globales como la pobreza y el cambio climático. Afirmó que desde el espacio, la atmósfera terrestre parece "tan fina como una cáscara de cebolla".' },
      { label: 'Dato Científico', icon: 'atom', text: 'La atmósfera terrestre, que protege toda la vida conocida, tiene un grosor funcional de apenas 100 kilómetros (la línea de Kármán). Si la Tierra fuera una esfera del tamaño de un balón de baloncesto (24 cm de diámetro), la atmósfera sería una capa de menos de 0.2 milímetros de espesor, más delgada que una capa de barniz. Sagan usaba esta comparación para ilustrar lo vulnerable que es nuestro sistema de soporte vital y por qué las emisiones de gases de efecto invernadero representan una amenaza cuantificable.' },
    ],
    fact: 'Carl Sagan testificó ante el Congreso de los Estados Unidos el 10 de diciembre de 1985 sobre los peligros del invierno nuclear, presentando modelos computacionales que él y sus colegas Richard Turco, Owen Toon, Thomas Ackerman y James Pollack (grupo conocido como TTAPS) habían publicado en la revista Science en 1983. El modelo TTAPS predecía que un intercambio nuclear a gran escala inyectaría suficiente hollín en la estratosfera para bloquear la luz solar durante meses, reduciendo las temperaturas globales entre 15 y 25 grados Celsius y destruyendo la agricultura mundial.',
  },
  {
    id: 'espacio-interestelar',
    title: 'El Espacio Interestelar',
    color: '#B88420',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'El 25 de agosto de 2012, Voyager 1 se convirtió en el primer objeto fabricado por humanos en cruzar la heliopausa y entrar en el espacio interestelar. La heliopausa es el límite donde el viento solar — un flujo continuo de partículas cargadas emitidas por el Sol a velocidades de 400 a 800 kilómetros por segundo — pierde su fuerza frente a la presión del medio interestelar. La confirmación oficial de este evento fue publicada el 12 de septiembre de 2013 en la revista Science por el equipo dirigido por Don Gurnett de la Universidad de Iowa, basándose en datos del instrumento de ondas de plasma de la sonda.',
      'La evidencia clave del cruce interestelar provino de una medición indirecta de la densidad del plasma circundante. En abril de 2013, una eyección de masa coronal del Sol alcanzó la posición de Voyager 1 y provocó oscilaciones en el plasma local. El instrumento de ondas de plasma detectó estas oscilaciones a una frecuencia de 2.6 kilohercios, lo que indica una densidad de electrones de 0.08 partículas por centímetro cúbico, unas 40 veces mayor que la densidad dentro de la heliosfera. Este incremento abrupto confirmó que la sonda había abandonado la burbuja protectora del Sol.',
      'La heliosfera es una estructura dinámica que se extiende aproximadamente entre 90 y 120 unidades astronómicas (una unidad astronómica = distancia Tierra-Sol = 149.6 millones de km) en la dirección del movimiento del Sol a través de la galaxia, y se comprime en el lado opuesto. La forma de la heliosfera ha sido debatida: modelos recientes del Southwest Research Institute sugieren que se parece más a un "croissant" asimétrico que a la forma de cometa alargada que se asumía anteriormente. El viento interestelar local fluye a unos 26 kilómetros por segundo y moldea esta burbuja continuamente.',
      'Voyager 2 cruzó la heliopausa el 5 de noviembre de 2018, a una distancia de 119 unidades astronómicas del Sol, entrando también en el espacio interestelar. A diferencia de Voyager 1, el instrumento de ciencia de plasma (PLS) de Voyager 2 seguía operativo, lo que proporcionó las primeras mediciones directas de la temperatura, densidad y velocidad del plasma interestelar. Los datos revelaron que la temperatura del plasma interestelar local es de aproximadamente 30,000-50,000 kelvin, aunque es tan tenue que un humano lo percibiría como vacío y frío extremo.',
      'A pesar de haber alcanzado el espacio interestelar, ninguna de las dos Voyager ha salido del sistema solar en un sentido gravitacional. La influencia gravitatoria del Sol se extiende hasta la Nube de Oort, una esfera hipotética de cometas que podría extenderse hasta 100,000 unidades astronómicas (1.58 años luz). A su velocidad actual de 17 kilómetros por segundo, Voyager 1 necesitaría aproximadamente 30,000 años para alcanzar el borde interior de la Nube de Oort y unos 300,000 años para atravesarla por completo. No pasará cerca de otra estrella hasta dentro de unos 40,000 años, cuando se acerque a 1.6 años luz de la estrella Gliese 445 en la constelación de la Jirafa.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En diciembre de 2023, la NASA resolvió un problema técnico que había dejado a Voyager 1 enviando datos ininteligibles durante varios meses. Un chip de memoria defectuoso en el subsistema de datos de vuelo (FDS) corrompía la telemetría antes de transmitirla. El equipo del JPL envió un comando de reparación que tardó 22.5 horas en llegar a la sonda y otras 22.5 horas en recibir la confirmación. Fue como reparar un ordenador de 1977 a 24,000 millones de kilómetros de distancia, utilizando documentación técnica original en papel.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El espacio interestelar no está vacío: contiene aproximadamente una partícula por centímetro cúbico, principalmente átomos de hidrógeno neutro. También está permeado por rayos cósmicos galácticos — protones y núcleos atómicos acelerados a velocidades cercanas a la de la luz por supernovas y otros eventos energéticos — y por un campo magnético galáctico de unos 0.5 nanoteslas. Los datos de Voyager revelaron que este campo magnético interestelar local tiene una orientación diferente a la esperada, lo que sugiere que la estructura magnética de nuestra vecindad galáctica es más compleja de lo previsto.' },
    ],
    fact: 'Voyager 1 viaja actualmente a 17.05 kilómetros por segundo (61,380 km/h) respecto al Sol y se encuentra a más de 163 unidades astronómicas de la Tierra (datos de 2025). La comunicación con la sonda se realiza mediante señales de radio en banda S y banda X. La potencia de la señal que llega a la Tierra es de aproximadamente 10^(-16) watts, una cantidad de energía tan minúscula que es 20,000 millones de veces más débil que la potencia necesaria para encender un reloj digital. Las antenas de 70 metros de la Red de Espacio Profundo pueden detectar esta señal gracias a receptores criogénicos enfriados a -269°C.',
  },
  {
    id: 'lugar-en-cosmos',
    title: 'Nuestro Lugar en el Cosmos',
    color: '#4A2D6F',
    btnImage: '/assets/sagan/sagan_m3.png',
    image: '/assets/sagan/sagan_m3.png',
    content: [
      'La "dirección cósmica" de la Tierra es un concepto que Sagan utilizaba para situar a nuestro planeta en el contexto del universo observable. Nuestra dirección completa sería: Planeta Tierra, Sistema Solar, Brazo de Orión, Vía Láctea, Grupo Local de Galaxias, Supercúmulo de Virgo, Complejo de Supercúmulos de Laniakea. Laniakea, cuyo nombre significa "cielo inconmensurable" en hawaiano, fue identificado en 2014 por el equipo de R. Brent Tully del Instituto de Astronomía de la Universidad de Hawái, y contiene aproximadamente 100,000 galaxias distribuidas en un volumen de 520 millones de años luz de diámetro.',
      'El universo observable tiene un radio de 46,500 millones de años luz. Aunque el universo tiene una edad de 13,800 millones de años, la expansión del espacio ha estirado las distancias, de modo que los objetos más lejanos que podemos detectar están ahora a distancias mucho mayores que la edad del universo multiplicada por la velocidad de la luz. La radiación cósmica de fondo de microondas (CMB), descubierta accidentalmente en 1965 por Arno Penzias y Robert Wilson en los Laboratorios Bell, es la luz más antigua del universo, emitida apenas 380,000 años después del Big Bang, cuando el cosmos se enfrió lo suficiente para que los átomos se formaran.',
      'Sagan insistía en que la soledad cósmica — real o percibida — debería motivar un sentido de responsabilidad, no de desesperación. En "Pale Blue Dot" escribió: "Se ha dicho que la astronomía es una experiencia de humildad y que forma el carácter. Quizás no hay mejor demostración de la locura de las presunciones humanas que esta imagen distante de nuestro pequeño mundo." Esta posición no era nihilista: Sagan veía la pequeñez de la Tierra como un argumento a favor de la cooperación global y la inversión en ciencia y educación.',
      'La cuestión de si estamos solos tiene implicaciones prácticas que van más allá de la filosofía. Hasta 2025, el telescopio espacial James Webb (lanzado el 25 de diciembre de 2021) ha identificado más de 5,600 exoplanetas confirmados, de los cuales aproximadamente 60 se encuentran en la zona habitable de sus estrellas, la franja orbital donde el agua líquida podría existir en la superficie. Sin embargo, la detección de biofirmas atmosféricas (oxígeno, metano, ozono en combinaciones específicas) requiere instrumentos de próxima generación que aún están en fase de desarrollo.',
      'El legado de Carl Sagan respecto a nuestro lugar en el cosmos se articula en tres principios que él expresó en diferentes obras: primero, que la Tierra es un lugar pequeño en un universo que no fue diseñado para nosotros; segundo, que esta pequeñez nos obliga a cuidar lo que tenemos porque no hay alternativa inmediata; y tercero, que la exploración del cosmos no es un lujo sino una necesidad para la supervivencia a largo plazo de la especie humana. Estos tres principios, formulados entre 1980 (Cosmos) y 1994 (Pale Blue Dot), constituyen el núcleo de lo que hoy se denomina "humanismo cósmico" y continúan guiando programas educativos y políticas espaciales en más de 50 países.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El 13 de septiembre de 2013, la Unión Astronómica Internacional nombró oficialmente el punto exacto donde fue tomada la fotografía del Pale Blue Dot como un hito en la historia de la exploración espacial. En 2014, Bill Nye (presidente de la Planetary Society, organización cofundada por Sagan en 1980) propuso que el 14 de febrero fuera declarado "Día del Pale Blue Dot", una celebración anual de la perspectiva cósmica. Varias universidades y museos de ciencia alrededor del mundo observan esta fecha con eventos educativos y lecturas del texto de Sagan.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Cada átomo de tu cuerpo fue creado en el interior de una estrella que explotó hace miles de millones de años. El carbono de tus músculos, el calcio de tus huesos, el hierro de tu sangre y el oxígeno que respiras fueron forjados por fusión nuclear en estrellas masivas y dispersados por el cosmos cuando esas estrellas murieron como supernovas. Sagan expresó esta idea en su serie "Cosmos" (1980) con la frase: "Somos materia estelar que piensa sobre las estrellas." Este es un hecho verificable de nucleosíntesis estelar, confirmado por espectroscopia de abundancias elementales.' },
    ],
    fact: 'La Planetary Society, cofundada por Carl Sagan, Bruce Murray y Louis Friedman en 1980, es la organización espacial sin fines de lucro más grande del mundo, con más de 100,000 miembros en 100 países. En 2019, la sociedad lanzó exitosamente LightSail 2, una nave impulsada por la presión de la luz solar sobre una vela de 32 metros cuadrados de Mylar reflectante, demostrando que la propulsión fotónica es viable para misiones interplanetarias. Carl Sagan había promovido la idea de las velas solares desde la década de 1970, y LightSail 2 fue dedicada a su memoria.',
  },
];

// ─── Cosmic Particle Field (Canvas Background) ─────────────────────────────────
function CosmicField() {
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
      hue: Math.random() > 0.5 ? '91,61,143' : '212,165,53', // purple or gold
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

// ─── Pale Blue Dot Header ────────────────────────────────────────────────────
function PaleDotHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,61,143,0.3))' }}>
        {/* Cosmic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#cosmicGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B3D8F','#D4A535','#7A5BAF','#C49225','#9370C4','#B88420','#4A2D6F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central pale dot icon */}
        <circle cx="300" cy="28" r="3" fill="#6BA3D6" opacity="0.8" />
        <circle cx="300" cy="28" r="8" fill="none" stroke="#6BA3D6" strokeWidth="0.8" opacity="0.3" />
        <circle cx="300" cy="28" r="14" fill="none" stroke="#5B3D8F" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="cosmicGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,61,143,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(91,61,143,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL PALE BLUE DOT</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">CARL SAGAN Y LAS MISIONES VOYAGER</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,61,143,0.2)'}`,
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
          layoutId="activeDotSaganM3"
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

        {/* ─── Conditional Video Render ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
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

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(91,61,143,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B3D8F, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,61,143,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_SaganM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,20,0.88) 0%, rgba(20,12,40,0.82) 40%, rgba(10,10,20,0.9) 100%), url(/assets/sagan/sagan_m3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,61,143,0.12)',
      boxShadow: '0 0 60px rgba(10,10,20,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <CosmicField />

      <PaleDotHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(91,61,143,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado el Pale Blue Dot por completo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Guardián del Punto Azul
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
