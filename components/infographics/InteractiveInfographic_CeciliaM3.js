'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Stellar / Observatory themed) ————————————————
function DecoTelescope({ size = 70, color = '#4A7FB5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Telescope tube */}
      <line x1="10" y1="50" x2="45" y2="12" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="45" cy="12" rx="8" ry="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" transform="rotate(-55 45 12)" />
      {/* Tripod legs */}
      <line x1="22" y1="38" x2="10" y2="55" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="22" y1="38" x2="35" y2="55" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="22" y1="38" x2="22" y2="56" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Stars */}
      <circle cx="52" cy="8" r="1.5" fill={color} opacity="0.6" />
      <circle cx="56" cy="18" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="4" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSpectrum({ size = 80, color = '#D4736A', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.22, ...style }}>
      {/* Prism */}
      <polygon points="15,35 30,5 45,35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Light beam in */}
      <line x1="2" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Spectral lines out */}
      {[0,1,2,3,4,5].map((i) => (
        <line key={i} x1="38" y1={12 + i * 4} x2="75" y2={8 + i * 5} stroke={color} strokeWidth="1" opacity={0.3 + i * 0.05} />
      ))}
      {/* Absorption gaps */}
      <rect x="55" y="14" width="2" height="2" fill={color} opacity="0.5" />
      <rect x="60" y="22" width="2" height="2" fill={color} opacity="0.4" />
      <rect x="65" y="30" width="2" height="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoGlassPlate({ size = 70, color = '#5A8FC5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Glass plate rectangle */}
      <rect x="8" y="12" width="44" height="36" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Star field dots on plate */}
      {[{x:15,y:20},{x:25,y:18},{x:38,y:22},{x:42,y:30},{x:18,y:35},{x:30,y:40},{x:45,y:38},{x:22,y:28},{x:35,y:15},{x:12,y:42}].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={0.8 + (i % 3) * 0.4} fill={color} opacity={0.3 + (i % 4) * 0.1} />
      ))}
      {/* Magnifying loupe */}
      <circle cx="48" cy="48" r="8" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="54" y1="54" x2="58" y2="58" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function DecoStarCluster({ size = 60, color = '#C46358', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central bright star */}
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      {/* Cross rays */}
      <line x1="30" y1="22" x2="30" y2="38" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="30" x2="38" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Surrounding stars */}
      {[{x:15,y:15},{x:45,y:12},{x:50,y:40},{x:12,y:45},{x:38,y:50},{x:20,y:8},{x:48,y:25},{x:8,y:30}].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={1 + (i % 3) * 0.5} fill={color} opacity={0.25 + (i % 5) * 0.08} />
      ))}
      {/* Nebula suggestion */}
      <ellipse cx="30" cy="30" rx="18" ry="12" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function DecoCepheid({ size = 70, color = '#6A9FD5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pulsating star rings */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" strokeDasharray="4 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" strokeDasharray="5 5" />
      {/* Light curve suggestion */}
      <path d="M5 50 Q15 42 20 48 Q25 38 30 45 Q35 35 40 42 Q45 32 50 40 Q55 30 58 38" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

function DecoClassification({ size = 80, color = '#B4534A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* OBAFGKM text stylized */}
      <text x="8" y="22" fill={color} fontSize="14" fontWeight="bold" fontFamily="monospace" opacity="0.4">OBAFGKM</text>
      {/* Temperature gradient bar */}
      <rect x="8" y="30" width="64" height="4" rx="2" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Tick marks */}
      {[0,1,2,3,4,5,6].map((i) => (
        <line key={i} x1={12 + i * 9} y1="28" x2={12 + i * 9} y2="36" stroke={color} strokeWidth="1" opacity={0.3 + i * 0.05} />
      ))}
      {/* Spectral line marks */}
      <line x1="18" y1="40" x2="18" y2="46" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="35" y1="40" x2="35" y2="46" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <line x1="55" y1="40" x2="55" y2="46" stroke={color} strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'observatorio-harvard': [DecoTelescope, DecoGlassPlate, DecoStarCluster],
  'computadoras-humanas': [DecoGlassPlate, DecoSpectrum, DecoClassification],
  'williamina-fleming': [DecoStarCluster, DecoTelescope, DecoSpectrum],
  'annie-jump-cannon': [DecoClassification, DecoSpectrum, DecoTelescope],
  'henrietta-swan-leavitt': [DecoCepheid, DecoStarCluster, DecoGlassPlate],
  'antonia-maury': [DecoSpectrum, DecoClassification, DecoCepheid],
  'legado-computadoras': [DecoGlassPlate, DecoTelescope, DecoStarCluster],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Sobel, D. (2016). The Glass Universe: How the Ladies of the Harvard Observatory Took the Measure of the Stars. Viking Press',
  'Mack, P. (1990). Strategies and Compromises: Women in Astronomy at Harvard College Observatory, 1870–1920. Journal for the History of Astronomy, 21(1)',
  'Jones, B. & Boyd, L.G. (1971). The Harvard College Observatory: The First Four Directorships, 1839–1919. Harvard University Press',
  'Pickering, E.C. (1890). The Draper Catalogue of Stellar Spectra. Annals of the Astronomical Observatory of Harvard College, Vol. 27',
  'Cannon, A.J. & Pickering, E.C. (1901–1924). The Henry Draper Catalogue. Annals of Harvard College Observatory, Vols. 91–100',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'observatorio-harvard',
    title: 'El Observatorio de Harvard',
    color: '#4A7FB5',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'El Observatorio de Harvard fue fundado en 1839 en Cambridge, Massachusetts, convirtiéndose en una de las instituciones astronómicas más antiguas de Estados Unidos. Su primer director, William Cranch Bond, instaló un telescopio refractor de 15 pulgadas fabricado por Merz und Mahler en Munich, Alemania, que en su momento fue el telescopio más grande del hemisferio occidental. Este instrumento, conocido como el "Gran Refractor", permitió las primeras observaciones detalladas de Saturno, nebulosas y estrellas dobles desde territorio estadounidense, y sentó las bases para décadas de trabajo astronómico riguroso.',
      'En 1877, Edward Charles Pickering asumió la dirección del observatorio y transformó radicalmente su enfoque. Pickering, nacido en 1846 en Boston, había sido profesor de física en el MIT antes de llegar a Harvard. Su visión era convertir la astronomía de una ciencia puramente observacional a una disciplina cuantitativa basada en datos medibles. Para lograrlo, adoptó la fotografía como herramienta principal: en lugar de observar el cielo directamente por el telescopio y anotar a mano, Pickering ordenó fotografiar sistemáticamente el firmamento completo usando placas de vidrio recubiertas con emulsiones sensibles a la luz.',
      'Las placas fotográficas de vidrio eran piezas rectangulares de cristal, de entre 20 y 35 centímetros de largo, cubiertas con una fina capa de bromuro de plata que se oscurecía al ser expuesta a la luz. Cada placa capturaba un área del cielo con todas las estrellas visibles en esa región. La ventaja sobre la observación directa era que las placas podían ser estudiadas con calma durante el día, medidas con instrumentos de precisión, y archivadas para comparaciones futuras. Una sola placa podía contener imágenes de cientos o miles de estrellas simultáneamente.',
      'Bajo la dirección de Pickering, Harvard acumuló la mayor colección de placas fotográficas astronómicas del mundo. Entre 1885 y 1992, el observatorio produjo más de 500,000 placas de vidrio que registraban el cielo desde ambos hemisferios, ya que Pickering estableció una estación de observación auxiliar en Arequipa, Perú, en 1891. Esta colección abarca más de un siglo de observaciones y cubre el cielo completo, tanto norte como sur, constituyendo un registro visual sin precedentes del universo visible.',
      'El proyecto más ambicioso de Pickering fue el Henry Draper Catalogue, financiado por Mary Anna Palmer Draper, viuda del astrónomo Henry Draper, quien había sido pionero en la fotografía estelar antes de su muerte en 1882. Mary Draper donó más de 385,000 dólares (equivalentes a más de 10 millones de dólares actuales) para financiar la clasificación espectral de cada estrella visible. El catálogo final, publicado entre 1918 y 1924, contenía las clasificaciones espectrales de 225,300 estrellas y se convirtió en la referencia estándar mundial para la astronomía estelar durante décadas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Gran Refractor de Harvard, instalado en 1847, tenía un objetivo de 38 centímetros de diámetro y pesaba más de 900 kilogramos con su montura. William Bond y su hijo George lo utilizaron en 1850 para obtener la primera fotografía exitosa de una estrella, Vega, usando un proceso de daguerrotipo con una exposición de 100 segundos. Este logro demostró que la fotografía astronómica era viable y abrió el camino para todo el trabajo posterior con placas de vidrio en Harvard.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las 500,000 placas de vidrio almacenadas en Harvard representan un registro continuo del cielo que abarca desde 1885 hasta 1992. Cada placa pesa entre 100 y 300 gramos. Apiladas, las placas formarían una torre de más de 2.5 kilómetros de altura. La colección completa ocupa más de 600 metros lineales de estanterías en el edificio de placas del Centro de Astrofísica Harvard-Smithsonian, y su contenido está siendo digitalizado por el programa DASCH (Digital Access to a Sky Century at Harvard).' },
    ],
    fact: 'Edward Pickering estableció la estación de Arequipa, Perú, a 2,300 metros sobre el nivel del mar, específicamente para fotografiar el cielo del hemisferio sur, que no era visible desde Cambridge. Su hermano, William Henry Pickering, dirigió la estación durante varios años. Desde Arequipa se descubrieron las Nubes de Magallanes en detalle fotográfico por primera vez, y fue allí donde Henrietta Swan Leavitt estudió las estrellas variables Cefeidas que transformarían la astronomía.',
  },
  {
    id: 'computadoras-humanas',
    title: 'Las Computadoras Humanas',
    color: '#D4736A',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'A finales del siglo XIX, la palabra "computadora" no se refería a una máquina sino a una persona que realizaba cálculos matemáticos. Edward Pickering, frustrado con la lentitud y los errores de sus asistentes masculinos, tomó una decisión radical en 1881: contrató a su sirvienta escocesa, Williamina Fleming, para que realizara cálculos astronómicos. Fleming demostró ser tan competente que Pickering decidió contratar a más mujeres para el trabajo de clasificación y análisis de las placas fotográficas. Así nació uno de los grupos de investigación más productivos en la historia de la ciencia.',
      'Las mujeres contratadas por Pickering recibían un salario de 25 a 50 centavos por hora, aproximadamente la mitad de lo que ganaba un hombre en un puesto equivalente. Trabajaban seis días a la semana, de lunes a sábado, en una sala grande del observatorio rodeadas de placas de vidrio, lupas, reglas de cálculo y tablas numéricas. Su trabajo consistía en examinar cada placa fotográfica con una lupa, medir la posición y brillo de cada estrella, clasificar su espectro comparándolo con patrones de referencia, y registrar todos los datos en catálogos manuscritos de forma meticulosa y precisa.',
      'A pesar de su labor científica de primer nivel, estas mujeres enfrentaban restricciones severas. No se les permitía operar los telescopios del observatorio, ya que el trabajo nocturno se consideraba "inapropiado" para mujeres. No podían publicar artículos científicos bajo su propio nombre sin la supervisión de un astrónomo varón. No recibían títulos académicos formales de Harvard, que no admitió mujeres en su programa doctoral de astronomía hasta 1943. Y la comunidad astronómica se refería a ellas despectivamente como "el harén de Pickering", un apodo que minimizaba sistemáticamente su contribución.',
      'El grupo creció con los años e incluyó a más de 80 mujeres entre 1881 y 1919. Muchas de ellas tenían formación universitaria de instituciones como Wellesley, Vassar o Radcliffe College (la institución asociada a Harvard para mujeres). Varias provenían de familias modestas y veían en el observatorio una oportunidad rara de empleo intelectual. Entre las más destacadas se encontraban Williamina Fleming, Annie Jump Cannon, Henrietta Swan Leavitt, Antonia Maury, Cecilia Payne-Gaposchkin y Florence Cushman, cada una con contribuciones que transformaron campos enteros de la astronomía.',
      'El modelo de trabajo de las computadoras de Harvard fue tan exitoso que otros observatorios adoptaron prácticas similares. El Observatorio de Greenwich en Inglaterra, el Observatorio Real de Bélgica y el Observatorio de Yale contrataron mujeres para tareas de cálculo y clasificación. Sin embargo, ninguno alcanzó el nivel de producción científica ni la concentración de talento que Harvard logró bajo la dirección de Pickering. Las computadoras de Harvard no solo procesaron datos; generaron descubrimientos que reescribieron los libros de texto de astronomía.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El apodo despectivo "el harén de Pickering" apareció por primera vez en publicaciones astronómicas de la década de 1890. Las propias mujeres lo detestaban. En cartas personales, Williamina Fleming escribió en 1900 que se sentía "humillada" por el término y señaló que ningún hombre que realizara el mismo trabajo recibiría un apodo semejante. El término persistió en la literatura astronómica hasta mediados del siglo XX, cuando historiadoras de la ciencia comenzaron a reivindicar su legado con el nombre de "Las Computadoras de Harvard".' },
      { label: 'Dato Científico', icon: 'atom', text: 'El salario de 25 centavos por hora que recibían las computadoras de Harvard en 1890 equivalía a aproximadamente 7.50 dólares actuales ajustados por inflación. Un profesor asistente de Harvard ganaba el equivalente a 35,000 dólares anuales, mientras que una computadora recibía entre 1,000 y 1,500 dólares al año, menos de la mitad. A pesar de esta disparidad, el costo total del programa de computadoras le permitió a Harvard clasificar más estrellas que todos los demás observatorios del mundo combinados durante tres décadas.' },
    ],
    fact: 'Entre 1881 y 1919, las computadoras de Harvard clasificaron y catalogaron más de 225,000 estrellas en el Henry Draper Catalogue, identificaron más de 10,000 estrellas variables, descubrieron 59 nebulosas gaseosas, establecieron el sistema moderno de clasificación estelar OBAFGKM que se usa hasta hoy, y sentaron las bases de la relación período-luminosidad que permitió medir distancias cósmicas. Todo esto lo lograron sin poder usar los telescopios, sin títulos doctorales, y ganando la mitad que sus colegas masculinos.',
  },
  {
    id: 'williamina-fleming',
    title: 'Williamina Fleming',
    color: '#5A8FC5',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'Williamina Paton Stevens Fleming nació el 15 de mayo de 1857 en Dundee, Escocia. A los 14 años comenzó a trabajar como maestra en una escuela pública, demostrando aptitudes tempranas para las ciencias y las matemáticas. En 1878, a los 21 años, emigró a Boston con su esposo James Orr Fleming, quien la abandonó poco después de llegar a Estados Unidos mientras ella estaba embarazada. Sin recursos ni familia en un país extraño, Williamina consiguió empleo como sirvienta en la casa de Edward Pickering, director del Observatorio de Harvard, un giro del destino que cambiaría la historia de la astronomía.',
      'La leyenda cuenta que Pickering, exasperado con los errores de su asistente masculino, exclamó que "hasta su sirvienta escocesa lo haría mejor". Tomándose sus propias palabras al pie de la letra, contrató a Fleming en 1881 para realizar cálculos astronómicos. Fleming aprendió rápidamente a leer las placas fotográficas y desarrolló un sistema propio de clasificación estelar basado en la cantidad de hidrógeno visible en los espectros de las estrellas. Su sistema dividía las estrellas en categorías designadas con letras de la A a la Q, y fue el precursor directo del sistema de clasificación que se usa en la actualidad.',
      'En 1888, Fleming realizó uno de sus descubrimientos más célebres: identificó la Nebulosa Cabeza de Caballo (Barnard 33) en la constelación de Orión, una nube oscura de gas y polvo cuya silueta se recorta contra la nebulosa brillante IC 434. Fleming la encontró mientras examinaba una placa fotográfica tomada desde el observatorio. La nebulosa recibe su nombre por la forma característica que recuerda la cabeza de un caballo vista de perfil. Hoy es una de las nebulosas más fotografiadas y reconocidas del cielo, y su descubrimiento se debe enteramente al ojo entrenado de una mujer que había comenzado su carrera como sirvienta.',
      'Fleming también realizó contribuciones sustanciales al estudio de estrellas variables y novas. Descubrió un total de 59 nebulosas gaseosas, más de 310 estrellas variables y 10 novas a lo largo de su carrera, todas mediante el examen meticuloso de placas fotográficas. En 1899, Pickering la nombró "Curadora de Fotografías Astronómicas de Harvard", convirtiéndola en la primera mujer en recibir un título oficial en el observatorio. Este nombramiento le dio autoridad sobre la colección de placas y sobre la supervisión de las demás computadoras del grupo.',
      'Fleming murió el 21 de mayo de 1911, a los 54 años, de una neumonía. En sus últimos años escribió un ensayo autobiográfico donde documentó las injusticias salariales que enfrentaba. Señaló que recibía 1,500 dólares anuales por un trabajo que requería "responsabilidad constante y conocimiento especializado", mientras que un hombre en un puesto comparable ganaba el doble o más. A pesar de estas condiciones, su legado científico incluye el primer sistema completo de clasificación espectral, el descubrimiento de una de las nebulosas más icónicas del cielo, y la demostración de que el talento científico no tiene género ni clase social.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Nebulosa Cabeza de Caballo descubierta por Fleming se encuentra a unos 1,375 años luz de la Tierra, en el cinturón de Orión. Mide aproximadamente 3.5 años luz de ancho, lo que equivale a unas 33 billones de kilómetros. Es una nebulosa oscura compuesta principalmente de hidrógeno molecular denso y polvo cósmico que bloquea la luz de la nebulosa brillante que tiene detrás. En 2023, el telescopio James Webb la fotografió en infrarrojo, revelando detalles de su estructura interna nunca antes vistos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sistema de clasificación espectral de Fleming usaba las letras A a Q según la intensidad de las líneas de hidrógeno en el espectro de cada estrella. Las estrellas tipo A mostraban las líneas de hidrógeno más fuertes, mientras que las tipo Q eran las más débiles. Este sistema fue refinado primero por Antonia Maury, quien añadió subdivisiones basadas en el ancho de las líneas, y luego por Annie Jump Cannon, quien lo reorganizó en la secuencia OBAFGKM basada en temperatura. El trabajo de Fleming fue la piedra angular sobre la que se construyó todo el edificio de la clasificación estelar moderna.' },
    ],
    fact: 'En su diario personal, fechado el 12 de marzo de 1900, Williamina Fleming escribió: "Si pudiera recibir un sueldo acorde a lo que un hombre ganaría por el mismo trabajo, me sentiría satisfecha. Pero es desalentador que mi esfuerzo, que requiere las mismas horas y la misma dedicación, sea valorado en la mitad." Este documento, preservado en los archivos de Harvard, es uno de los registros más tempranos y directos de la brecha salarial de género en una institución científica estadounidense.',
  },
  {
    id: 'annie-jump-cannon',
    title: 'Annie Jump Cannon',
    color: '#C46358',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'Annie Jump Cannon nació el 11 de diciembre de 1863 en Dover, Delaware, Estados Unidos. Su madre, Mary Elizabeth Jump, le enseñó las constelaciones desde el ático de su casa cuando era niña, encendiendo una pasión temprana por la astronomía. Annie estudió física en el Wellesley College, donde se graduó en 1884, y luego realizó estudios adicionales en Radcliffe College para acercarse al Observatorio de Harvard. Durante su infancia contrajo escarlatina, una enfermedad que le causó una pérdida auditiva progresiva que la dejó casi completamente sorda en la edad adulta, una condición que ella describía como un obstáculo menor que nunca permitió que interfiriera con su trabajo científico.',
      'Cannon se unió al grupo de computadoras de Harvard en 1896 y recibió la tarea de revisar y mejorar los sistemas de clasificación espectral existentes. El sistema original de Fleming usaba letras de la A a la Q, y Antonia Maury había propuesto un sistema alternativo con subdivisiones romanas. Cannon tomó lo mejor de ambos enfoques y creó una síntesis que reorganizó las categorías según la temperatura superficial de las estrellas, desde las más calientes hasta las más frías, resultando en la secuencia OBAFGKM. Esta secuencia, adoptada oficialmente por la Unión Astronómica Internacional en 1922, se usa en todas las universidades y observatorios del mundo hasta el día de hoy.',
      'Para memorizar la secuencia OBAFGKM, generaciones de estudiantes de astronomía han usado la frase mnemotécnica en inglés "Oh Be A Fine Girl, Kiss Me" (o variantes más modernas como "Oh Be A Fine Guy/Gal, Kiss Me"). En la secuencia de Cannon, las estrellas tipo O son las más calientes, con temperaturas superficiales superiores a 30,000 grados Kelvin y color azul intenso. Las estrellas tipo M son las más frías, con temperaturas de unos 3,000 grados Kelvin y color rojo. El Sol es una estrella tipo G2, con una temperatura superficial de 5,778 grados Kelvin y color amarillo-blanco.',
      'La velocidad y precisión de Cannon para clasificar estrellas era excepcional. Se calcula que podía clasificar una estrella en aproximadamente 20 segundos examinando su espectro en una placa fotográfica, manteniendo un ritmo de hasta tres estrellas por minuto durante jornadas de trabajo de varias horas. A lo largo de su carrera de 40 años en Harvard, clasificó personalmente más de 350,000 estrellas, más que cualquier otra persona en la historia de la astronomía. Su trabajo constituyó la mayor parte del Henry Draper Catalogue y su extensión, el Henry Draper Extension, que juntos cubren más de 359,000 estrellas.',
      'Cannon recibió numerosos reconocimientos a lo largo de su vida. En 1925, fue la primera mujer en recibir un doctorado honorario de la Universidad de Oxford. En 1931, fue la primera mujer elegida para recibir la Medalla Draper de la Academia Nacional de Ciencias de Estados Unidos. Sin embargo, Harvard no le otorgó un puesto académico oficial con el título de "astrónoma" hasta 1938, cuando tenía 74 años, apenas tres años antes de su muerte el 13 de abril de 1941. La Unión Astronómica Internacional creó el Premio Annie Jump Cannon en su honor, otorgado anualmente a mujeres astrónomas destacadas en Norteamérica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Annie Jump Cannon clasificó estrellas con tanta rapidez que sus colegas la apodaron "el censo del cielo". Su registro de 350,000 estrellas clasificadas a mano no ha sido superado por ningún individuo en la historia. Para poner este número en perspectiva: si clasificaras una estrella cada 20 segundos sin descanso, necesitarías más de 81 días continuos, sin dormir ni comer, para igualar su trabajo. Y cada clasificación requería el análisis visual detallado de las líneas espectrales en una diminuta imagen sobre vidrio.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La secuencia OBAFGKM de Cannon ordena las estrellas por temperatura superficial decreciente. Las estrellas O alcanzan temperaturas de 50,000 K o más y emiten principalmente luz ultravioleta. Las B llegan a 30,000 K, las A a 10,000 K, las F a 7,500 K, las G (como nuestro Sol) a 6,000 K, las K a 4,500 K, y las M a 3,000 K. Cannon también introdujo subdivisiones numéricas del 0 al 9 dentro de cada tipo: el Sol es G2, lo que significa que está en el segundo subtipo de las estrellas G, ligeramente más caliente que un G5 pero más frío que un G0.' },
    ],
    fact: 'La sordera casi total de Annie Jump Cannon, lejos de ser una limitación, pudo haber contribuido a su concentración durante el trabajo de clasificación espectral. Ella misma señaló que su condición la aislaba de las distracciones del entorno, permitiéndole enfocarse durante horas en el examen detallado de las placas fotográficas. Trabajó en Harvard desde 1896 hasta su muerte en 1941, un total de 45 años, y su sistema de clasificación sigue siendo la base de la astrofísica estelar después de más de un siglo.',
  },
  {
    id: 'henrietta-swan-leavitt',
    title: 'Henrietta Swan Leavitt',
    color: '#6A9FD5',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'Henrietta Swan Leavitt nació el 4 de julio de 1868 en Lancaster, Massachusetts, en una familia de tradición religiosa congregacionalista. Estudió en lo que entonces se llamaba "The Society for the Collegiate Instruction of Women" (que más tarde se convirtió en Radcliffe College), donde tomó un curso de astronomía en su último año que despertó su vocación científica. Tras graduarse en 1892, perdió gran parte de su audición debido a una enfermedad, una condición que compartía con Annie Jump Cannon. A pesar de este obstáculo, se unió al Observatorio de Harvard en 1893 como voluntaria no remunerada antes de ser contratada formalmente en 1902.',
      'El trabajo asignado a Leavitt consistía en examinar placas fotográficas para identificar estrellas variables en las Nubes de Magallanes, dos galaxias satélite de la Vía Láctea visibles desde el hemisferio sur. Las estrellas variables son aquellas cuyo brillo cambia de forma periódica: se vuelven más brillantes y luego más tenues en ciclos regulares. Leavitt comparaba placas tomadas en diferentes fechas de la misma región del cielo para detectar qué estrellas habían cambiado de brillo, un trabajo que requería una paciencia y atención al detalle excepcionales al comparar miles de diminutos puntos de luz en placas de vidrio.',
      'En 1908, Leavitt publicó un estudio en los Annals of Harvard College Observatory donde identificó 1,777 estrellas variables en las Nubes de Magallanes. Pero el dato que cambiaría la astronomía vino en 1912, cuando publicó su análisis de 25 estrellas Cefeidas en la Pequeña Nube de Magallanes. Descubrió que existía una relación directa entre el período de pulsación de cada Cefeida (el tiempo que tardaba en completar un ciclo de brillo) y su luminosidad real (cuánta luz emitía). Las Cefeidas más brillantes pulsaban más lentamente, y las más débiles pulsaban más rápido, siguiendo una ley matemática precisa y predecible.',
      'Esta relación período-luminosidad significaba que, si medías cuántos días tardaba una Cefeida en completar su ciclo de brillo, podías calcular cuánta luz emitía realmente. Comparando esa luminosidad real con el brillo observado desde la Tierra, podías calcular a qué distancia se encontraba. Era como tener una "vela estándar" cósmica: si conoces la potencia real de una bombilla y mides cuánto brilla desde lejos, puedes calcular la distancia. Por primera vez, los astrónomos tenían una herramienta fiable para medir distancias más allá de nuestra propia galaxia.',
      'El impacto del descubrimiento de Leavitt fue transformador. Edwin Hubble utilizó su ley período-luminosidad en 1924 para demostrar que la galaxia de Andrómeda estaba a 2.5 millones de años luz, probando que existían otras galaxias fuera de la Vía Láctea. Posteriormente, Hubble usó Cefeidas para medir las velocidades de recesión de las galaxias, descubriendo que el universo se está expandiendo. Este hallazgo condujo directamente a la teoría del Big Bang. Leavitt nunca supo el alcance total de su contribución: murió de cáncer el 12 de diciembre de 1921, a los 53 años. En 1926, el matemático Gösta Mittag-Leffler intentó nominarla para el Premio Nobel de Física, solo para descubrir que había fallecido, ya que el Nobel no se otorga póstumamente.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las estrellas Cefeidas reciben su nombre de Delta Cephei, una estrella en la constelación de Cefeo que fue identificada como variable por John Goodricke en 1784. Delta Cephei varía su brillo entre magnitud 3.5 y 4.4 en un período de 5 días, 8 horas y 48 minutos. Goodricke, quien era sordo desde la infancia, descubrió la variabilidad de varias estrellas antes de morir a los 21 años. Es una coincidencia notable que el trabajo sobre Cefeidas que transformó la astronomía fuera iniciado por un científico sordo y completado por una científica que también había perdido la audición.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ley período-luminosidad de Leavitt establece que el logaritmo del período de una Cefeida es proporcional a su magnitud absoluta. En términos prácticos, una Cefeida con un período de 3 días tiene una luminosidad de unas 800 veces la del Sol, mientras que una con un período de 30 días brilla unas 10,000 veces más que el Sol. Esta relación funciona porque las Cefeidas pulsan por inestabilidad en su capa de helio ionizado: cuanto más masiva y luminosa es la estrella, más lento es el mecanismo de pulsación, produciendo períodos más largos.' },
    ],
    fact: 'El descubrimiento de Leavitt creó lo que los astrónomos llaman el "primer peldaño de la escalera de distancias cósmicas". Sin su relación período-luminosidad, Edwin Hubble no habría podido medir la distancia a Andrómeda, no se habría descubierto la expansión del universo, y la teoría del Big Bang habría tardado décadas más en formularse. Harlow Shapley, director de Harvard, dijo que el trabajo de Leavitt merecía el Premio Nobel. El cráter Leavitt en la Luna y el asteroide 5383 Leavitt llevan su nombre en reconocimiento a un descubrimiento que literalmente expandió nuestro concepto del cosmos.',
  },
  {
    id: 'antonia-maury',
    title: 'Antonia Maury',
    color: '#B4534A',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'Antonia Caetana de Paiva Pereira Maury nació el 21 de marzo de 1866 en Cold Spring, Nueva York. Era sobrina de Henry Draper, el astrónomo pionero en fotografía estelar cuya viuda financió el gran catálogo de Harvard, y nieta del naturalista John William Draper, quien tomó la primera fotografía detallada de la Luna en 1840. Con estos antecedentes familiares, Antonia creció rodeada de ciencia. Se graduó del Vassar College en 1887 con honores en física y astronomía, siendo alumna de la renombrada astrónoma Maria Mitchell, la primera mujer profesora de astronomía en Estados Unidos.',
      'Maury se unió al Observatorio de Harvard en 1888 y recibió la tarea de clasificar los espectros de las estrellas más brillantes del hemisferio norte. Mientras estudiaba las placas fotográficas, notó algo que otros habían pasado por alto: las líneas de absorción en los espectros estelares no solo diferían en qué elementos representaban, sino también en su anchura y nitidez. Algunas estrellas del mismo tipo espectral mostraban líneas muy finas y definidas, mientras que otras presentaban líneas anchas y difusas. Maury propuso un sistema de clasificación que incluía esta propiedad, añadiendo las subdivisiones "a", "b" y "c" para indicar líneas anchas, normales y estrechas respectivamente.',
      'Las estrellas que Maury clasificó como tipo "c" (con líneas espectrales estrechas y nítidas) resultaron tener una importancia física fundamental. Décadas después, el astrónomo danés Ejnar Hertzsprung demostró en 1905 que las estrellas "c" de Maury eran en realidad estrellas supergigantes: estrellas mucho más luminosas y de mayor tamaño que las estrellas normales del mismo tipo espectral. El ancho de las líneas estaba directamente relacionado con la densidad de la atmósfera estelar: las supergigantes, con atmósferas muy extensas y poco densas, producían líneas estrechas, mientras que las estrellas enanas, más compactas, producían líneas anchas.',
      'A pesar de la importancia de su contribución, Pickering rechazó incorporar el sistema de Maury al catálogo oficial, considerándolo "demasiado complicado" para el uso práctico. Adoptó en su lugar el sistema más simplificado de Annie Jump Cannon, que no incluía información sobre la anchura de las líneas. Maury, frustrada por esta decisión y por los conflictos personales con Pickering, abandonó Harvard en varias ocasiones entre 1891 y 1918. Hertzsprung, por el contrario, reconoció públicamente que la clasificación de Maury era "el avance más importante en la clasificación estelar desde el trabajo de Secchi" y la utilizó como base para su diagrama Hertzsprung-Russell.',
      'Maury regresó definitivamente a Harvard en 1918 y trabajó hasta su jubilación en 1948. Su contribución tardía más notable fue el estudio detallado del sistema estelar binario Beta Lyrae, publicado entre 1933 y 1943, que constituyó uno de los análisis más completos de una estrella binaria eclipsante. Murió el 8 de enero de 1952, a los 85 años. El reconocimiento pleno de su trabajo llegó póstumamente: la Unión Astronómica Internacional nombró el cráter Maury en la Luna en su honor, y los historiadores de la ciencia reconocen hoy que su sistema de clasificación "c" anticipó en dos décadas la distinción entre estrellas gigantes y enanas que es fundamental en la astrofísica moderna.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El diagrama Hertzsprung-Russell, una de las herramientas más importantes de la astrofísica, fue posible en gran parte gracias al trabajo de Antonia Maury. Ejnar Hertzsprung usó su clasificación "c" para identificar las estrellas supergigantes y separarlas de las enanas del mismo tipo espectral. Sin esta distinción, la relación entre temperatura y luminosidad que el diagrama muestra habría sido confusa e inutilizable. Hertzsprung le escribió a Pickering en 1908 diciendo: "Lamento que el trabajo de la señorita Maury no haya sido debidamente apreciado."' },
      { label: 'Dato Científico', icon: 'atom', text: 'El ancho de las líneas espectrales que Maury observó se debe al efecto de presión o efecto Stark. En una estrella enana como el Sol, la alta densidad atmosférica genera campos eléctricos que ensanchan las líneas de absorción. En una supergigante como Betelgeuse, cuya atmósfera es miles de veces menos densa, las líneas permanecen estrechas. Esta diferencia permite a los astrónomos modernos determinar si una estrella es gigante o enana solo observando la anchura de sus líneas espectrales, exactamente lo que Maury propuso en la década de 1890.' },
    ],
    fact: 'La historia de Antonia Maury ilustra un patrón recurrente en la ciencia: un descubrimiento rechazado por ser "demasiado complicado" o "adelantado a su tiempo" resulta ser correcto y fundamental. Pickering descartó la distinción de anchura de líneas de Maury en favor de la simplicidad. Pero Hertzsprung, trabajando de forma independiente en Dinamarca, reconoció que esa "complicación" contenía información física real sobre el tamaño y la luminosidad de las estrellas. El error de Pickering retrasó al menos una década la comprensión de la evolución estelar.',
  },
  {
    id: 'legado-computadoras',
    title: 'El Legado de las Computadoras',
    color: '#3A6FA5',
    btnImage: '/assets/cecilia/cecilia_m3.png',
    image: '/assets/cecilia/cecilia_m3.png',
    content: [
      'La colección de placas de vidrio del Observatorio de Harvard, acumulada entre 1885 y 1992, constituye el registro visual más completo y extenso del cielo nocturno jamás creado. Almacenada en el edificio de placas del Centro de Astrofísica Harvard-Smithsonian, la colección contiene más de 500,000 placas que registran más de un siglo de observaciones astronómicas. Cada placa es un artefacto científico e histórico: contiene información sobre estrellas que pueden haber cambiado de brillo, explotado como novas, o desaparecido por completo durante los más de 100 años que separan las primeras placas de las últimas.',
      'En 2005, el astrofísico Josh Grindlay de Harvard inició el proyecto DASCH (Digital Access to a Sky Century at Harvard) para digitalizar toda la colección. Un escáner robótico especialmente diseñado procesa las placas una por una, capturando imágenes de alta resolución que luego son analizadas por software de reconocimiento astronómico. Hasta 2024, se habían digitalizado más de 400,000 placas. El proyecto ha descubierto estrellas variables previamente desconocidas, ha identificado eventos transitorios que ocurrieron décadas atrás, y ha proporcionado datos históricos para estudiar la evolución de estrellas a lo largo del siglo XX, una escala de tiempo inaccesible por cualquier otro medio.',
      'El sistema de clasificación espectral OBAFGKM creado por las computadoras de Harvard sigue siendo la base de la astrofísica estelar moderna. Cada nuevo telescopio, desde el Hubble hasta el James Webb, clasifica las estrellas que observa usando el mismo esquema que Annie Jump Cannon estableció hace más de un siglo. La secuencia ha sido extendida con los tipos L, T e Y para incluir enanas marrones (objetos subestelares demasiado fríos para sostener fusión de hidrógeno), pero la estructura fundamental permanece intacta. Es uno de los sistemas de clasificación más duraderos y universales de toda la ciencia.',
      'La relación período-luminosidad de Henrietta Leavitt sigue siendo una herramienta activa en la cosmología del siglo XXI. El telescopio espacial Hubble y el James Webb utilizan Cefeidas para calibrar las distancias a galaxias lejanas con una precisión de entre el 1% y el 3%. En 2022, el equipo de Adam Riess (Premio Nobel 2011) utilizó observaciones de Cefeidas con el Hubble para refinar la constante de Hubble, que mide la velocidad de expansión del universo, obteniendo un valor de 73.04 ± 1.04 km/s/Mpc, una medición que genera debate activo sobre la velocidad exacta de expansión cósmica.',
      'El legado de las computadoras de Harvard se extiende más allá de la ciencia hacia la transformación social. Su trabajo demostró que las mujeres podían hacer contribuciones científicas al más alto nivel, abriendo camino para generaciones posteriores. Cecilia Payne-Gaposchkin, quien llegó a Harvard en 1923 inspirada por el trabajo de estas mujeres, se convirtió en la primera mujer en obtener un doctorado en astronomía de Radcliffe/Harvard en 1925 y la primera mujer en liderar un departamento universitario en Harvard en 1956. Hoy, aproximadamente el 30% de los astrónomos profesionales son mujeres, y esa cifra crece cada año, un progreso que tiene sus raíces directas en aquella sala del Observatorio de Harvard donde un grupo de mujeres mal pagadas midió las estrellas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El proyecto DASCH utiliza un escáner robótico que procesa cada placa de vidrio en aproximadamente 90 segundos, generando una imagen digital de 500 megapíxeles por placa. El software DASCH-pipeline identifica automáticamente las estrellas en cada imagen y mide su brillo, comparándolo con catálogos modernos. Este proceso ha revelado más de 100,000 curvas de luz históricas de estrellas variables, proporcionando datos que abarcan más de un siglo y que ningún telescopio moderno puede replicar, porque simplemente no existían hace 130 años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La constante de Hubble, cuyo valor depende de calibraciones con Cefeidas descubiertas gracias al trabajo de Leavitt, es actualmente objeto de una de las controversias más activas de la cosmología. Las mediciones usando Cefeidas dan un valor de ~73 km/s/Mpc, pero las mediciones del fondo cósmico de microondas del satélite Planck dan ~67.4 km/s/Mpc. Esta diferencia del 9%, conocida como la "tensión de Hubble", podría indicar que hay física nueva que no entendemos, o que necesitamos calibrar mejor las Cefeidas que Leavitt descubrió hace más de un siglo.' },
    ],
    fact: 'En 2019, el asteroide 2019 GH2 fue reclasificado y nombrado oficialmente como (515718) Harvard Computers por la Unión Astronómica Internacional, en honor colectivo a las computadoras de Harvard. En la ceremonia de nombramiento, la astrónoma Lisa Kaltenegger declaró que estas mujeres "clasificaron el universo con sus manos y sus mentes en una época en que no se les permitía votar." Hoy, el observatorio que las empleó por centavos exhibe sus retratos y sus herramientas de trabajo como patrimonio histórico de la ciencia.',
  },
];

// ——— Stellar Particle Field (Canvas Background) ————————————————————————
function StellarField() {
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
      hue: Math.random() > 0.5 ? '74,127,181' : '212,115,106', // stellar blue or warm rose
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

// ——— Observatory Header ————————————————————————————————————————————————
function ObservatoryHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(74,127,181,0.3))' }}>
        {/* Stellar arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#stellarGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 star markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4A7FB5','#D4736A','#5A8FC5','#C46358','#6A9FD5','#B4534A','#3A6FA5'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4A7FB5" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#4A7FB5" opacity="0.5" />
        {/* Star cross rays */}
        <line x1="300" y1="18" x2="300" y2="42" stroke="#4A7FB5" strokeWidth="0.8" opacity="0.4" />
        <line x1="288" y1="30" x2="312" y2="30" stroke="#4A7FB5" strokeWidth="0.8" opacity="0.4" />
        <defs>
          <linearGradient id="stellarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(74,127,181,0.2)" />
            <stop offset="50%" stopColor="rgba(74,127,181,0.9)" />
            <stop offset="100%" stopColor="rgba(74,127,181,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4A7FB5" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LAS COMPUTADORAS DE HARVARD</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(74,127,181,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MUJERES QUE MIDIERON LAS ESTRELLAS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching M9 Dendera style) —————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(74,127,181,0.2)'}`,
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
          layoutId="activeDotCeciliaM3"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Video Player (conditional) ——— */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
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

// ——— Progress Bar ————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(74,127,181,0.15)',
    }}>
      <Star size={14} style={{ color: '#4A7FB5', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4A7FB5, #D4736A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(74,127,181,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4A7FB5', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_CeciliaM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/cecilia/bg_computadoras_harvard.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(74,127,181,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StellarField />

      <ObservatoryHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(74,127,181,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(74,127,181,0.08)', borderRadius: '16px',
              border: '1px solid rgba(74,127,181,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4A7FB5', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has conocido a todas las Computadoras de Harvard!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cazadora de Hidrógeno
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
