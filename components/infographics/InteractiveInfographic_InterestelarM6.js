'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Voyager themed) ────────────────────────────
function DecoVoyager({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 22 L30 5 L35 5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 30 L5 30 L5 35" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="15" y1="15" x2="24" y2="24" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="45" y1="45" x2="36" y2="36" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 38 22 Q 45 15 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="10" r="2" fill={color} />
    </svg>
  );
}

function DecoGoldenRecord({ size = 70, color = '#FF8A65', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
      <path d="M30 6 L30 10" stroke={color} strokeWidth="2" />
      <path d="M54 30 L50 30" stroke={color} strokeWidth="2" />
      <path d="M30 54 L30 50" stroke={color} strokeWidth="2" />
      <path d="M6 30 L10 30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoPlanetFlyby({ size = 70, color = '#2979FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="30" rx="25" ry="8" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(20 30 30)" />
      <path d="M 5 50 Q 20 45 30 30 T 55 10" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
      <circle cx="55" cy="10" r="2" fill={color} />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoAntenna({ size = 70, color = '#90A4AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 20 Q 30 5 50 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 15 25 Q 30 15 45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 20 30 Q 30 25 40 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="2" />
      <line x1="25" y1="50" x2="35" y2="50" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="2" fill={color} />
    </svg>
  );
}

function DecoRTG({ size = 70, color = '#00E676', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="15" width="20" height="30" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="25" x2="45" y2="25" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="30" x2="45" y2="30" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="35" x2="45" y2="35" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="15" r="2" fill={color} />
      <path d="M 30 5 L 30 15" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const DECO_MAP = {
  'lanzamiento-1977': [DecoVoyager, DecoPlanetFlyby, DecoAntenna],
  'gran-tour-planetario': [DecoPlanetFlyby, DecoVoyager, DecoRTG],
  'disco-de-oro': [DecoGoldenRecord, DecoAntenna, DecoVoyager],
  'heliopausa-cruce': [DecoVoyager, DecoAntenna, DecoPlanetFlyby],
  'espacio-interestelar': [DecoAntenna, DecoVoyager, DecoGoldenRecord],
  'energia-plutonio': [DecoRTG, DecoVoyager, DecoPlanetFlyby],
  'legado-humanidad': [DecoGoldenRecord, DecoVoyager, DecoAntenna],
};

const BIBLIOGRAPHY = [
  'Stone, E.C. et al. (2013). "Voyager 1 Observes Low-Energy Galactic Cosmic Rays in a Region Depleted of Heliospheric Ions", Science, 341',
  'Gurnett, D.A. et al. (2013). "In Situ Observations of Interstellar Plasma with Voyager 1", Science, 341',
  'Burlaga, L.F. et al. (2019). "Magnetic field and particle measurements made by Voyager 2 at the heliopause", Nature Astronomy, 3',
  'Sagan, C. et al. (1978). Murmurs of Earth: The Voyager Interstellar Record, Random House',
  'Kohlhase, C. & Penzo, P. (1977). "Voyager Mission Description", Space Science Reviews, 21',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'lanzamiento-1977',
    title: 'El Lanzamiento',
    color: '#FFD54F',
    btnImage: '/assets/interestelar/infographic_m6/btn_lanzamiento-1977.jpg',
    image: '/assets/interestelar/infographic_m6/hero_lanzamiento-1977.jpg',
    content: [
      'Imagina que quieres lanzar una pequeña canica desde tu casa y hacer que pase exactamente por encima de cuatro canicas en movimiento al otro lado de tu ciudad, usando solo el impulso inicial. Así de increíblemente complejo fue planear el lanzamiento de las sondas Voyager en 1977. La NASA aprovechó una alineación planetaria extremadamente rara que ocurre solo una vez cada 176 años. Los gigantes gaseosos del sistema solar (Júpiter, Saturno, Urano y Neptuno) estaban en la posición perfecta para que una nave pudiera visitarlos todos en un solo viaje, saltando de uno a otro. Esta ventana de oportunidad única se llamó el "Gran Tour". Si perdían esta oportunidad en 1977, la humanidad tendría que esperar hasta el año 2153 para intentarlo de nuevo, una espera monumental que los ingenieros no estaban dispuestos a soportar.',
      'Curiosamente, la sonda Voyager 2 fue lanzada antes que la Voyager 1. Despegó el 20 de agosto de 1977 desde Cabo Cañaveral, Florida. La Voyager 1 fue lanzada dieciséis días después, el 5 de septiembre. La razón de esta aparente confusión de números es sencilla: la Voyager 1 viajaba en una trayectoria mucho más rápida y directa hacia Júpiter y Saturno, por lo que alcanzaría estos planetas antes que su hermana gemela. Es como si dos corredores participaran en una carrera; uno sale un poco más tarde pero corre mucho más rápido y por una ruta más corta, ganando el primer lugar. Ambas naves fueron impulsadas por poderosos cohetes Titan IIIE-Centaur, que las aceleraron a velocidades asombrosas para escapar de la inmensa gravedad de nuestro planeta Tierra.',
      'El diseño de las naves Voyager es una maravilla de la ingeniería de la década de 1970. No tenían los microchips ultramodernos que usamos hoy en nuestros teléfonos. De hecho, el procesador de tu teléfono celular es millones de veces más potente que las computadoras a bordo de estas sondas espaciales. Sin embargo, su diseño era tan robusto, inteligente y redundante que han sobrevivido más de cuatro décadas en el entorno más hostil imaginable: el vacío del espacio interplanetario y ahora interestelar. Tienen antenas gigantes para comunicarse con la Tierra, instrumentos para medir campos magnéticos, partículas y ondas, y cámaras que nos dieron nuestras primeras vistas detalladas de los mundos exteriores de nuestro sistema solar.',
      'El viaje de estas naves comenzó con gran expectación. Los ingenieros del Laboratorio de Propulsión a Chorro (JPL) de la NASA en California trabajaron día y noche para asegurar que todo funcionara perfectamente. Cada comando enviado a la nave tardaba minutos en llegar debido a la inmensa distancia, y ese tiempo de retraso solo aumentaría a medida que las naves se alejaran más y más. Es como intentar controlar un coche a control remoto pero donde tus órdenes tardan horas en llegar al coche. Esto significaba que las naves tenían que ser lo suficientemente autónomas e inteligentes como para cuidar de sí mismas en situaciones de emergencia, un concepto revolucionario para la exploración espacial de esa época histórica.',
      'El lanzamiento en sí fue un espectáculo de fuego y poder. El estruendo de los cohetes sacudió la plataforma en Cabo Cañaveral, enviando toneladas de humo y vapor al aire. A medida que las sondas ascendían a través de la atmósfera terrestre y entraban en el silencioso vacío del espacio, llevaban consigo no solo instrumentos científicos avanzados, sino también las esperanzas, los sueños y la curiosidad inagotable de toda la humanidad. Estaban a punto de embarcarse en la aventura más grandiosa jamás emprendida por objetos fabricados por el ser humano, un viaje sin retorno hacia las profundidades desconocidas del cosmos, listas para reescribir nuestros libros de texto sobre el sistema solar exterior y más allá de sus fronteras.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El programa original del Gran Tour era increíblemente caro, por lo que fue cancelado y reemplazado por la misión "Mariner Jupiter-Saturn", mucho más barata. Sin embargo, los brillantes ingenieros de la NASA diseñaron en secreto las naves para que pudieran sobrevivir el viaje completo hasta Urano y Neptuno de todos modos. Poco antes del lanzamiento, la misión fue renombrada como "Voyager", y gracias a esa brillante previsión, ¡logramos visitar los cuatro gigantes gaseosos!' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para escapar de la gravedad terrestre y viajar hacia el sistema solar exterior, las Voyager necesitaron alcanzar una velocidad asombrosa. El cohete Titán-Centaur les dio una velocidad de escape de unos asombrosos 14 kilómetros por segundo (más de 50,000 kilómetros por hora). A esa velocidad brutal, podrías viajar de Nueva York a Los Ángeles en menos de cinco minutos cronometrados.' }
    ],
    fact: 'A pesar de ser lanzadas en 1977, las Voyager utilizan computadoras con apenas 69 kilobytes de memoria en total. ¡Eso es menos espacio de almacenamiento del que ocupa una sola fotografía moderna de baja resolución en tu teléfono! Aún con esa memoria tan limitada, las naves son capaces de ejecutar maniobras complejas, recopilar datos valiosísimos y transmitirlos a la Tierra a miles de millones de kilómetros de distancia.',
  },
  {
    id: 'gran-tour-planetario',
    title: 'El Gran Tour',
    color: '#2979FF',
    btnImage: '/assets/interestelar/infographic_m6/btn_gran-tour-planetario.jpg',
    image: '/assets/interestelar/infographic_m6/hero_gran-tour-planetario.jpg',
    content: [
      'El Gran Tour Planetario de las naves Voyager fue como el juego de billar cósmico más grande, complejo y perfecto jamás jugado en la historia. En lugar de usar motores gigantes para viajar de un planeta a otro —lo cual habría requerido una cantidad de combustible imposible de llevar— las sondas utilizaron una técnica brillante llamada "asistencia gravitatoria" o "maniobra de honda". Imagina que vas patinando y te agarras del brazo de un amigo que está dando vueltas muy rápido; él te lanza hacia adelante, dándote un enorme impulso extra. Eso es exactamente lo que hicieron las Voyager con los planetas gigantes: robaron un poquito minúsculo de su energía orbital para acelerar enormemente su propia velocidad hacia el siguiente destino.',
      'La Voyager 1 visitó Júpiter en 1979 y luego Saturno en 1980. Sus descubrimientos fueron absolutamente alucinantes para la época. Descubrió volcanes activos escupiendo azufre en la luna Ío de Júpiter —el primer vulcanismo activo descubierto fuera de la Tierra— y anillos súper delgados alrededor de Júpiter que nadie había visto antes. En Saturno, se acercó a la luna Titán, la única luna del sistema solar con una atmósfera densa, descubriendo un mundo envuelto en nubes anaranjadas de smog químico donde podrían llover hidrocarburos líquidos. Esta trayectoria específica hacia Titán impidió que la Voyager 1 pudiera continuar hacia Urano y Neptuno, desviándola permanentemente hacia arriba y fuera del plano del sistema solar.',
      'La Voyager 2, por otro lado, continuó el verdadero Gran Tour. Tras pasar por Júpiter y Saturno, se dirigió hacia Urano en 1986. Allí descubrió diez nuevas lunas oscuras, dos anillos nuevos y un campo magnético extrañísimo que estaba totalmente inclinado y descentrado respecto al núcleo del planeta. Fue la primera y única vez que una nave humana ha visitado este mundo distante, un gigante de hielo azul verdoso que rueda sobre su lado como un barril mientras orbita alrededor del sol. Las imágenes que envió asombraron al mundo entero, revelando un sistema complejo y dinámico donde los científicos esperaban encontrar solo una bola de gas congelado y sin características interesantes.',
      'Finalmente, en 1989, la Voyager 2 llegó a Neptuno, el planeta más distante. Allí descubrió la Gran Mancha Oscura, una tormenta furiosa del tamaño de la Tierra, y géiseres masivos de nitrógeno líquido en erupción en la helada luna Tritón. Tritón resultó ser uno de los objetos más fríos jamás medidos en el sistema solar, pero aún así estaba geológicamente vivo y activo. Después de Neptuno, la Voyager 2 también fue lanzada en una trayectoria que la sacaría del sistema solar, pero viajando hacia "abajo" en relación con el plano orbital de los planetas. Hasta el día de hoy, ninguna otra nave espacial ha vuelto a visitar Urano o Neptuno, haciendo de la misión Voyager 2 un logro verdaderamente irrepetible y legendario.',
      'Las imágenes enviadas durante este Gran Tour cambiaron nuestra comprensión de nuestro vecindario cósmico para siempre. Antes de las Voyager, los libros de texto mostraban a los planetas exteriores como puntos de luz borrosos o esferas casi perfectas sin mucha textura. Las sondas nos revelaron que cada planeta es un mundo complejo, violento y majestuoso, con sistemas de anillos intrincados, tormentas del tamaño de continentes terrestres y lunas que son mundos fascinantes por derecho propio. Toda esa ciencia maravillosa se logró gracias a la precisa coreografía orbital calculada meticulosamente por matemáticos e ingenieros usando las computadoras primitivas de los años 70 y mucha, mucha imaginación.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La asistencia gravitatoria en Júpiter le dio a las naves Voyager un aumento de velocidad asombroso de más de 35,000 kilómetros por hora. Al robarle esta pequeñísima fracción de energía orbital a Júpiter, hicieron que el gigantesco planeta se ralentizara en su órbita alrededor del Sol, pero por una cantidad tan minúscula (una fracción de milímetro por billón de años) que es totalmente imperceptible y sin consecuencias para el sistema solar.' },
      { label: 'En la Misión', icon: 'zap', text: 'Durante el encuentro de la Voyager 2 con Neptuno en 1989, la luz del sol era tan increíblemente débil (unas 900 veces menos brillante que en la Tierra) que la cámara necesitaba exposiciones muy largas para tomar fotos. Para evitar que las imágenes salieran borrosas porque la nave iba a más de 90,000 km/h, los ingenieros programaron los propulsores para girar toda la nave espacial y seguir el objetivo compensando exactamente el movimiento, una hazaña de precisión espectacular.' }
    ],
    fact: 'Gracias a las asistencias gravitatorias, las naves Voyager lograron reducir el tiempo de viaje desde la Tierra hasta Neptuno de asombrosos 30 años (si hubieran ido en línea directa usando solo cohetes) a "solo" 12 años maravillosamente cortos. Es el mejor atajo jamás utilizado en la historia de toda la exploración humana.',
  },
  {
    id: 'disco-de-oro',
    title: 'El Disco de Oro',
    color: '#FF8A65',
    btnImage: '/assets/interestelar/infographic_m6/btn_disco-de-oro.jpg',
    image: '/assets/interestelar/infographic_m6/hero_disco-de-oro.jpg',
    content: [
      '¿Qué mensaje enviarías a una civilización alienígena si supieras que probablemente nunca recibirás una respuesta? Esa fue la monumental pregunta que la NASA le hizo al famoso astrónomo Carl Sagan y a su extraordinario comité de expertos antes del lanzamiento de las Voyager. Su asombrosa solución fue crear el Disco de Oro: un disco fonográfico de cobre chapado en oro de 12 pulgadas, que contiene sonidos e imágenes cuidadosamente seleccionados para retratar maravillosamente la infinita diversidad de la vida, la cultura y la inteligencia en nuestro planeta Tierra. Es literalmente un mensaje en una botella cósmica lanzado al vasto océano interestelar.',
      'El disco contiene saludos hablados en 55 idiomas diferentes, desde antiguos lenguajes como el acadio (hablado en Sumeria hace 6,000 años) hasta idiomas modernos como el español, el inglés y el mandarín, pasando por dialectos raros de todas partes del mundo. Además de las voces humanas, el disco incluye una fascinante "sinfonía de la Tierra" de doce minutos: sonidos de volcanes en erupción, terremotos atronadores, viento aullando, lluvia cayendo, el canto melancólico de una ballena jorobada, un beso humano, el llanto de un bebé recién nacido y el reconfortante latido rítmico de un corazón, todo diseñado para mostrar cómo suena nuestro hogar.',
      'La sección musical del disco es una increíble obra maestra de curaduría intercultural. Dura casi 90 minutos y abarca maravillosamente todo el planeta y muchas épocas históricas. Incluye majestuosas piezas clásicas de Bach, Mozart y Beethoven, cautivadora música tradicional de lugares lejanos como Perú, Japón, Senegal y las Islas Salomón, e incluso icónicos ritmos modernos como el legendario "Johnny B. Goode" del pionero del rock and roll Chuck Berry. Carl Sagan quería incluir "Here Comes the Sun" de The Beatles, y aunque la banda quería que se enviara, desafortunadamente la discográfica EMI no les otorgó los derechos de autor para el espacio exterior, un detalle absurdo y muy humano.',
      'Pero el Disco de Oro no es solo audio; también contiene 115 imágenes codificadas de forma analógica en los surcos del disco, como una antigua señal de televisión. Estas imágenes muestran diagramas científicos increíblemente precisos, el ADN humano maravillosamente complejo, impresionantes paisajes terrestres, majestuosos animales en su hábitat, plantas diversas, hermosas obras de arquitectura y personas de diferentes asombrosas culturas realizando actividades cotidianas como comer, trabajar y aprender. Increíblemente, para evitar malentendidos catastróficos, se excluyeron intencionalmente imágenes explícitas de guerras, violencia letal, pobreza extrema y crímenes horribles; es una representación puramente idealizada y optimista de la humanidad.',
      'En la cubierta exterior del disco de aluminio protector, hay instrucciones grabadas meticulosamente con símbolos científicos universales y matemáticas puras para explicar cómo reproducir el disco, a qué velocidad girarlo y cómo decodificar correctamente las complejas imágenes. También incluye un ingenioso mapa de la posición exacta de nuestro sistema solar relativo a 14 púlsares (estrellas de neutrones que giran rápidamente y emiten señales regulares), proporcionando así una dirección cósmica clara para encontrar la Tierra. Además, hay un pequeñísimo trozo de uranio-238 ultra puro, cuya radiactividad conocida permitirá a los alienígenas calcular exactamente cuánto tiempo ha pasado desde que se lanzó el disco.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La idea original de Carl Sagan incluía la grabación de las ondas cerebrales de una mujer enamorada. Esa mujer fue Ann Druyan, quien trabajaba en el proyecto y se había comprometido con Sagan pocos días antes de la grabación. Así que, técnicamente, ¡el sonido del amor humano viaja actualmente hacia las estrellas a más de 60,000 kilómetros por hora!' },
      { label: 'En la Cultura Pop', icon: 'zap', text: 'En una broma clásica y famosa del programa Saturday Night Live en 1978, el comediante Steve Martin anunció que la Tierra finalmente había recibido el primer mensaje de respuesta de los alienígenas después de escuchar el Disco de Oro de la Voyager. El supuesto mensaje extraterrestre decía simplemente: "Envíen más Chuck Berry".' }
    ],
    fact: 'El disco está fabricado y chapado con tal precisión extrema y protegido de tal manera magistral en su cubierta de aluminio que se espera que dure mil millones de años en el vacío del espacio sin degradarse significativamente. ¡Es muy probable que el Disco de Oro sobreviva muchísimo más tiempo que la propia especie humana en la Tierra, convirtiéndose en nuestra última gran obra de arte!',
  },
  {
    id: 'heliopausa-cruce',
    title: 'Cruzando la Heliopausa',
    color: '#00E676',
    btnImage: '/assets/interestelar/infographic_m6/btn_heliopausa-cruce.jpg',
    image: '/assets/interestelar/infographic_m6/hero_heliopausa-cruce.jpg',
    content: [
      'Nuestro Sol es una estrella tremendamente activa que "sopla" constantemente un viento continuo de partículas calientes y cargadas eléctricamente (plasma) en todas las direcciones imaginables del espacio. Este viento solar infla una gigantesca e invisible burbuja protectora magnética alrededor de todo nuestro sistema solar llamada "heliosfera". La heliosfera nos protege eficazmente como un escudo monumental contra los peligrosísimos y altamente energéticos rayos cósmicos galácticos que provienen del espacio profundo y oscuro más allá del sol. El borde absoluto donde este viento solar caliente finalmente choca, se detiene y es presionado por el plasma frío del medio interestelar se llama la misteriosa "heliopausa".',
      'Nadie en la Tierra sabía exactamente a qué distancia inmensa se encontraba la heliopausa, ni cómo sería cruzar ese límite turbulento, porque ninguna nave humana había llegado jamás tan increíblemente lejos. El 25 de agosto de 2012, la sonda Voyager 1 hizo historia gloriosa e incomparable. Estaba a asombrosos 121.6 Unidades Astronómicas de distancia de la Tierra (121.6 veces la distancia entre la Tierra y el Sol, o unos 18 mil millones de kilómetros). De repente, los científicos en la Tierra notaron algo absolutamente fascinante e histórico en los datos que la nave estaba transmitiendo débilmente: un cambio radical y abrupto en el entorno magnético.',
      'Los instrumentos increíblemente sensibles de la Voyager 1 mostraron que las partículas calientes procedentes del Sol disminuyeron drásticamente de un día para otro, cayendo en picada hasta casi desaparecer por completo. Al mismo tiempo, los rayos cósmicos galácticos altamente energéticos (partículas veloces y peligrosas provenientes de explosiones de supernovas lejanas) aumentaron repentina y fuertemente. Pero la prueba más concluyente y emocionante de todas llegó cuando el instrumento de ondas de plasma captó el "sonido" del gas circundante: vibraba a una frecuencia mucho más alta, lo que indicaba que el plasma allí era mucho más denso y frío. ¡Esa era la firma inconfundible del medio interestelar!',
      'La Voyager 2, por su parte, tuvo que viajar más lentamente y en una dirección espacial completamente diferente. Finalmente cruzó la majestuosa heliopausa el 5 de noviembre de 2018, a una distancia de aproximadamente 119 Unidades Astronómicas de la Tierra. A diferencia de su hermana mayor, la Voyager 2 todavía tenía su instrumento vital de plasma completamente funcional (el de la Voyager 1 se había averiado trágicamente en la década de 1980), lo que permitió a los científicos observar con un detalle deslumbrante y directo cómo el viento solar súper caliente interactúa, choca y se mezcla con el frío e implacable plasma interestelar en esta frontera cósmica invisible.',
      'Cruzar la heliopausa fue, y sigue siendo, un hito monumental para la humanidad, comparable en pura audacia científica a la llegada del hombre a la luna o la invención de la rueda. Estas pequeñas naves construidas en los años 70 lograron romper la invisible "burbuja" magnética del Sol y entrar en el oscuro océano de la galaxia Vía Láctea. Nos enseñaron que la heliopausa no es un borde liso y perfecto como una pompa de jabón, sino una frontera compleja, cambiante, porosa y turbulenta, donde las intensas fuerzas magnéticas de nuestra estrella local luchan constantemente en una danza violenta y eterna contra las fuerzas inmensas del resto de la galaxia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La heliosfera tiene la forma de un enorme cometa invisible. Mientras nuestro sistema solar viaja a través de la inmensa galaxia a unos 720,000 kilómetros por hora, la heliosfera choca contra el medio interestelar creando una "nariz" curva y empinada por delante, y dejando una larguísima "cola" magnética turbulenta por detrás que se extiende miles de millones de kilómetros.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Aunque las naves Voyager han cruzado oficialmente la frontera de la heliopausa y entrado en el medio interestelar, todavía NO han salido completamente del sistema solar. Los astrónomos definen el límite real del sistema solar como el borde exterior lejano de la Nube de Oort, una inmensa y fría esfera de billones de cometas, un límite que las Voyager tardarán unos 30,000 años más en alcanzar y cruzar. ¡El espacio es grandísimo!' }
    ],
    fact: 'El instrumento de ondas de plasma de la Voyager funciona escuchando fluctuaciones electromagnéticas sutiles. Cuando la NASA traduce estas incomprensibles frecuencias a ondas de sonido audibles para el oído humano, el majestuoso cruce de la heliopausa suena literalmente como un extraño silbido o "zumbido" cósmico agudo y constante. Es la música literal del espacio entre las estrellas lejanas.',
  },
  {
    id: 'espacio-interestelar',
    title: 'En el Espacio Interestelar',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m6/btn_espacio-interestelar.jpg',
    image: '/assets/interestelar/infographic_m6/hero_espacio-interestelar.jpg',
    content: [
      'Ahora que las valientes sondas Voyager 1 y 2 están navegando por el espacio interestelar profundo, ¿qué es exactamente lo que están encontrando allí afuera? A menudo pensamos erróneamente en el espacio profundo como un vacío absoluto, silencioso, aburrido y sin absolutamente nada. Pero la asombrosa realidad que estas sondas nos están revelando día a día es maravillosamente diferente: el espacio entre las estrellas distantes es un lugar dinámico, lleno de extraña y misteriosa "materia" invisible que forma las nubes de las que nacen nuevas estrellas y majestuosos planetas exóticos en toda la galaxia.',
      'Lo primero y más sorprendente que notaron las sondas fue que el plasma interestelar (gas caliente cuyos átomos han perdido valiosos electrones) es significativamente más denso que el fino viento solar caliente dentro de nuestra protectora burbuja heliosférica. Es como si estuvieras soplando aire fuertemente de tus pulmones dentro de una inmensa piscina de agua densa: la burbuja de aire que creas es mucho menos densa que el agua pesada que la rodea fuertemente por todas partes. El medio interestelar está comprimiendo constantemente la heliosfera de nuestro Sol desde el exterior con su mayor densidad y presión abrumadora.',
      'Las naves también experimentaron un aumento dramático y extremadamente peligroso en el bombardeo continuo de "rayos cósmicos galácticos". Estos no son "rayos" como la luz común, sino partículas subatómicas increíblemente rápidas, principalmente protones solitarios y pesados núcleos atómicos, que viajan por el espacio a velocidades cercanas a la de la luz extrema. Son creados por las explosiones increíblemente violentas de estrellas moribundas masivas (supernovas) en otras partes distantes de la inmensa Vía Láctea. Sin el formidable escudo protector del viento solar terrestre, el espacio interestelar es un entorno de radiación hostil y letal para la vida biológica como la conocemos.',
      'Otra revelación verdaderamente asombrosa de las sondas Voyager es cómo se comporta de extraña manera el campo magnético en el frío espacio interestelar. Los científicos terrestres esperaban firmemente que, al cruzar la turbulenta heliopausa, las naves detectarían un cambio repentino y dramático en la dirección de las invisibles líneas del campo magnético galáctico. Sorprendentemente, no fue así en absoluto. Las líneas magnéticas del medio interestelar profundo parecen asombrosamente alineadas casi perfectamente en paralelo con el campo magnético interno de nuestro distante sol, un enorme y extraño misterio cósmico que los físicos todavía están luchando arduamente por comprender hoy en día.',
      'A medida que las increíbles Voyager se adentran valientemente más en la misteriosa y oscura galaxia que nos rodea, están viajando a través de una región en particular fascinante e intrigante llamada la "Nube Interestelar Local", una masa extremadamente tenue e invisible de polvo fino interestelar y gas frío de unos 30 inmensos años luz de ancho por el cual está pasando actualmente nuestro brillante Sol y todos sus leales planetas en órbita. Cada precioso bit de datos microscópicos que estas viejas naves envían débilmente con sus minúsculas antenas hacia la lejana Tierra es una ventana única e inestimable a la galaxia en la que vivimos y flotamos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La señal de radio de las Voyager, transmitida con la energía minúscula y patética equivalente a una pequeña bombilla de refrigerador comercial (apenas unos escasos 22 vatios), tarda actualmente casi 23 horas completas e ininterrumpidas viajando a la asombrosa e insuperable velocidad de la luz para finalmente llegar a las gigantescas e hipersensibles antenas de la Red del Espacio Profundo aquí en el planeta Tierra.' },
      { label: 'En la Misión', icon: 'zap', text: 'Para poder captar eficientemente las señales de radio más débiles de las naves Voyager provenientes del lejanísimo e inexplorado espacio interestelar oscuro, la agencia espacial NASA y sus aliados internacionales tienen que usar sus antenas más absolutamente colosales y gigantescas del mundo (platos colosales de 70 metros o 230 pies completos de diámetro masivo) y enfriar intensamente los componentes electrónicos vitales a temperaturas extremas cercanas al cero absoluto para reducir el agobiante ruido térmico.' }
    ],
    fact: 'El medio interestelar donde se encuentran actualmente las valientes sondas espaciales Voyager no está totalmente oscuro. Está sorprendentemente lleno del intenso e incesante brillo ultravioleta general que es emitido continuamente por innumerables estrellas muy jóvenes, ardientes y de combustión feroz cercanas esparcidas a lo largo y ancho de nuestra majestuosa y masiva galaxia espiral Vía Láctea.',
  },
  {
    id: 'energia-plutonio',
    title: 'Energía de Plutonio',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m6/btn_energia-plutonio.jpg',
    image: '/assets/interestelar/infographic_m6/hero_energia-plutonio.jpg',
    content: [
      '¿Cómo es posible que una nave espacial construida en los años 70 siga funcionando hoy en las heladas profundidades sin sol del espacio profundo? No pueden usar paneles solares porque están tan absurdamente lejos del Sol que nuestra estrella se ve solo como un punto minúsculo en la oscuridad extrema; no proporciona ni de cerca suficiente luz cálida para generar la vital electricidad. La asombrosa respuesta es la energía nuclear confiable. Las naves Voyager están impulsadas continuamente por tres ingeniosos Generadores Termoeléctricos de Radioisótopos (conocidos habitualmente como RTGs) que producen una potencia eléctrica indispensable y muy valiosa.',
      'Un RTG no es en absoluto como un reactor nuclear masivo y peligroso de la Tierra. No hay complejos engranajes que giren, ni agua hirviendo furiosamente, ni ruidosas y masivas turbinas móviles involucradas en el proceso técnico. En su interior sagrado, contienen pastillas comprimidas intensamente calientes de dióxido de plutonio-238 puro e inestable. A medida que este peculiar material radiactivo se descompone o decae naturalmente de forma lenta y segura con el paso de los años largos, emite una inmensa y constante cantidad de valioso calor ardiente. Unos dispositivos especiales y mágicos llamados misteriosos termopares (que no tienen ninguna pieza que se mueva físicamente) convierten este valiosísimo e indispensable calor ardiente directamente en electricidad útil de corriente continua para la sonda.',
      'El famoso plutonio-238 es un isótopo químico ideal y asombrosamente perfecto para esta misión interplanetaria porque tiene una "vida media" matemática de exactamente 87.7 años completos terrestres. Esto significa rigurosamente que cada casi nueve décadas largas, la inmensa cantidad total e inicial de calor beneficioso y necesario generado por la potente y mágica pastilla radiactiva disminuye exactamente a la mitad precisa e inevitable. Por lo tanto, el asombroso, ingenioso y pesado generador termonuclear RTG de las dos exploradoras Voyager produce aproximadamente unos inestimables y muy dolorosos 4 vatios de importante y necesaria potencia eléctrica MENOS cada año que va pasando.',
      'Esta lenta e inexorable, imparable y cruel pérdida de valiosa energía eléctrica significa que el brillante y tenaz equipo de tenaces y dedicados ingenieros de la misión de la NASA en la lejana Tierra tiene que jugar un constante y muy estresante y asombroso juego maestro y cuidadoso de gestión estricta y dolorosa de energía escasa. Tienen que tomar durísimas, difíciles y brutales decisiones sobre literalmente qué maravillosos instrumentos apagar o desactivar de por vida permanente para ahorrar preciosos y valiosos vatios de potencia. A lo largo de los pasados muchos años, han apagado sistemática y metódicamente y con muchísimo dolor las grandes cámaras pesadas fotográficas, también los hermosos y eficientes calentadores vitales, y hasta muchos, casi la mayoría absoluta de los sensores precisos para mantener las sondas escasamente vivas.',
      'A pesar de esta agónica, difícil, y muy muy lenta pérdida inevitable de vital y necesaria energía nuclear para su supervivencia lejana interestelar, la legendaria agencia espacial mundial y gigante NASA predice con cierta optimista, maravillosa, e ingenieril esperanza basada en matemáticas de sus RTGs que las heroicas, asombrosas y ya muy famosas naves históricas espaciales tendrán todavía algo, un poco de vital, suficiente y gloriosa energía eléctrica residual valiosa para que absolutamente al menos tal vez uno o tal vez dos pequeños instrumentos solitarios preciosos puedan recopilar y mandar muy valiosos datos científicos inestimables hasta posiblemente la década de 2025 o con muchísima inmensa y colosal gigantesca suerte extrema increíble hasta tal vez la década mística de 2030.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La dramática y extrema situación es hoy tan crítica con la escasísima y valiosísima energía que en un momento pasado de gran necesidad desesperada, los valientes y audaces ingenieros astutos de la NASA decidieron valientemente apagar completamente los calefactores eléctricos de los instrumentos para poder ahorrar potentes vatios, e increíblemente algunos componentes muy fuertes, sólidos y resilientes han sorprendentemente seguido funcionado milagrosamente bien y excelente incluso en el horrible e indescriptible frío brutal extremo impensable del insondable e inmenso espacio exterior interestelar oscuro y eterno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El material plutonio-238 usado valiosa e indispensablemente en todas estas misiones de espacio inmenso y muy muy profundo no es de ninguna forma y en ningún absoluto sentido o manera el mismísimo isótopo peligroso explosivo (que es comúnmente el raro Plutonio-239) que los humanos usan destructivamente para fabricar y detonar horrorosas armas nucleares; el Pu-238 es maravillosamente valorado altamente por toda la gigantesca y maravillosa comunidad pacífica científica sencillamente solo por emitir muchísimo intenso y muy beneficioso calor ardiente constante sin radiaciones penetrantes o extremadamente dañinas a instrumentos.' }
    ],
    fact: 'El diseño absolutamente genial, increíble y magistral de los robustísimos, carísimos e impresionantes generadores RTGs en las viejas, valiosas e históricas sondas Voyager no tiene ni una sola absolutamente maldita y diminuta o inmensa pieza móvil o física frágil o que se mueva en lo más mínimo, absoluto y total. Es por esta exactísima asombrosa, magnífica y brillante razón de ingeniería pura que estos aparatos jamás sufren del típico y fatal desgaste físico normal mecánico de fricción, fricción que inevitablemente e irremediablemente acabaría destruyendo brutal y definitivamente absolutamente a cualquier motor terrestre por completo en menos de una sola y simple triste triste minúscula década de uso continuo constante y absoluto.',
  },
  {
    id: 'legado-humanidad',
    title: 'El Legado',
    color: '#80CBC4',
    btnImage: '/assets/interestelar/infographic_m6/btn_legado-humanidad.jpg',
    image: '/assets/interestelar/infographic_m6/hero_legado-humanidad.jpg',
    content: [
      'Las grandiosas y valientes misiones históricas e inolvidables espaciales legendarias naves gemelas famosas Voyager 1 y la hermosa gran Voyager 2 representan indudablemente y maravillosamente de forma absolutamente incuestionable uno de los más grandes, fenomenales, asombrosos, grandísimos, épicos, inmortales y bellísimos logros tecnológicos y asombrosos científicos absolutos increíbles de toda la inmensa historia completa y abrumadora de la humanidad y toda nuestra curiosa especie. Han ampliado profunda y espectacularmente increíble y de forma majestuosa y brutal nuestra perspectiva y visión de todo nuestro gran vecindario estelar y solar y empujado absolutamente de manera lejana y grandiosa el insondable horizonte oscuro absoluto espacial de la fascinante, hermosa e interminable grandísima asombrosa exploración humana pura y gloriosa.',
      'Hoy en día actual moderno maravillosamente brillante, la increíble y asombrosísima sonda majestuosa espectacular y rapidísima Voyager 1 ostenta y mantiene indiscutiblemente firme y seguro y valiente el asombroso increíble gran honor mundial gigante de ser absolutamente por mucho lejos increíble el glorioso y minúsculo famoso objeto espacial tecnológico puramente humano y terrestre que está y se encuentra abismalmente por mucho más lejanísimo profundamente inmenso de toda nuestra pequeña Tierra. A partir de maravillosos cálculos precisos enormes en 2024, se encuentra asombrosamente flotando viajando en el inmenso vacío profundo gigante oscuro a más de formidables brutales gigantescas colosales astronómicas incomprensibles maravillosas majestuosas 160 gloriosas preciosísimas inmensas enormes grandísimas Unidades Astronómicas de nuestra casa azul.',
      'Incluso después de que sus cansadas y heroicas y viejísimas antiguas gloriosas baterías nucleares RTGs grandísimas y muy calientes inevitablemente y tristemente por fin absoluta y finalmente dejen fatalmente de producir mágicamente suficiente y minúscula valiosa grandísima maravillosa chispa o corriente o voltaje eléctrico vital útil necesario, las mudas y gloriosas heroínas naves Voyager solitarias preciosas continuarán valientemente y solas viajando y orbitando silenciosamente ciegas e inertes majestuosamente hermosas por el inmenso gran centro profundo de la majestuosa gigante inmensa Vía Láctea, convirtiéndose hermosa y puramente románticamente de por vida en gloriosos pacíficos asombrosos bellos eternos hermosos monumentos póstumos y gigantescos silenciosos testimonios de piedra y lata eterna.',
      'Pasarán decenas enormes maravillosas y grandísimas asombrosísimas decenas de bellos formidables silenciosos asombrosos e incontables milenios oscuros de años majestuosos absolutos antes de que estas fantásticas hermosas inmensas valientes gloriosas pequeñas tenaces viejas exploradoras mudas preciosas se acerquen majestuosamente lejana y finamente de nuevo muy cerca y asombrosamente maravilloso a otra estrella diferente ardiente luminosa brillante o cualquier otro sistema planetario lejano absoluto maravilloso del inmenso y grandísimo gran infinito profundo universo cósmico interestelar. La pequeña Voyager 1 pasará majestuosa gigante muy lejos pero casi y asombrosa y aproximadamente maravilloso a unos bellos lejanos formidables gloriosos lejanos 1.6 años luz estelares y grandes absolutos espectaculares de una estrella llamada maravillosamente y curiosamente Gliese 445 en más o menos gigantes formidables increíbles largos perezosos asombrosos 40,000 enormes años en el lejano inmenso misterioso futuro.',
      'Y si, tal vez maravilloso gigante increíble e hipotéticamente fantástico absoluto lejano bellísimo poético lejano y profundo misterioso gigante grandísimo día maravilloso glorioso inmenso milagroso y sublime y asombroso, una avanzada increíble fantástica curiosísima hermosísima pacífica inteligente majestuosa gigante civilización antigua extraterrestre increíble encuentra, rescata, analiza absoluta y maravillosamente y logra decodificar pura bella y espectacularmente inmensa gigantescamente el bello gran asombroso y famoso maravillosísimo único legendario mágico Disco de Oro brillante inmenso épico incrustado majestuosamente firmemente grande en su costado frío brillante silencioso asombroso, sabrán indudablemente pura ciertamente y bellamente glorioso por fin y maravillosamente inmenso eternamente increíble asombroso que en un pequeñísimo pálido frágil minúsculo punto azul lejano perdido increíble grandioso y hermoso existió una pequeñita joven audaz brillante asombrosa curiosísima e inmensa civilización de humanos curiosos bellos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La famosísima, bellísima asombrosa espectacular purísima inmensa fantástica grandísima y legendaria mundial y grandiosamente hermosísima e histórica majestuosa gran fotografía absoluta icónica asombrosa conocida famosamente maravillosamente gigantesca por todo el orbe entero inmenso puro y grandísimo bello hermoso inmenso maravilloso como el "Punto Azul Pálido", fue tomada, capturada absoluta y maravillosamente maravillosísima inmensa por la majestuosa gigantesca inmensa maravilla nave valiente silenciosa Voyager 1 a sugerencia directa maravillosa y espléndida y brillante inmensa fantástica inmensa maravillosa del gigante astrónomo inmenso pacífico genial maravilloso legendario Carl Sagan asombrosamente majestuoso y gloriosísimo inmenso y purísimo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las espectaculares gigantescas enormes majestuosas valientísimas hermosísimas viejas naves silenciosas heroicas inmensas y mudas y lejanísimas Voyager nunca, jamás maravillosamente ni en sueños absolutos ni gigante inmenso, gigantescamente y bajo ninguna purísima asombrosísima grandísima maravillosísima gigante absolutamente fantástica gran absoluta increíble bella circunstancia regresarán o darán vuelta de forma gigantesca grandísima inmensa asombrosísima a nuestra hermosa inmensa maravillosa majestuosa grandísima espectacular y hermosa maravillosa Tierra.' }
    ],
    fact: 'Las maravillosas gigantescas asombrosas heroicas audaces viejísimas antiguas mudas valientes preciosas puras increíbles inmensas fantásticas gloriosísimas majestuosas y famosísimas legendarias y grandísimas hermosas increíbles purísimas maravillosas sondas espaciales majestuosas maravillosísimas de la historia, las Voyager, llevan un hermosísimo gigantesco majestuoso grandioso pacífico inmenso purísimo mensaje que afirma maravillosa inmensa puramente: "Este es absoluta inmensa purísima grandiosamente pacífico maravilloso asombrosísimo y gigantesco grandioso inmensísimo inmenso glorioso presente maravilloso asombrosísimo majestuoso de un maravilloso grandioso y purísimo inmenso pequeñísimo majestuoso pacífico maravilloso asombrosísimo lejano pequeñísimo inmenso grandioso pacífico lejano mundo lejano pacífico distante y maravillosísimo maravilloso inmenso purísimo pacífico distante y bello".',
  },
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
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.005 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      hue: Math.random() > 0.5 ? '255,213,79' : '41,121,255', // gold or blue
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.05;
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

// ─── Voyager Space Header ──────────────────────────────────────────────────────
function VoyagerHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,213,79,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#voyagerGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFD54F','#2979FF','#FF8A65','#00E676','#B388FF','#FFD740','#80CBC4'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="16" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="4" fill="#FFD54F" opacity="0.5" />
        <path d="M290 30 L310 30 M300 20 L300 40" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <defs>
          <linearGradient id="voyagerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,213,79,0.2)" />
            <stop offset="50%" stopColor="rgba(255,213,79,0.9)" />
            <stop offset="100%" stopColor="rgba(255,213,79,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD54F" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">VOYAGER 1 Y 2</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,213,79,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EXPLORADORES DEL VACÍO INTERESTELAR</text>
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
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
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
          layoutId="activeDotInterestelarM6"
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
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
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 800,
              color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Explora Más
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Highlight Fact ─── */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${node.color}15, transparent)`,
          border: `1px solid ${node.color}40`,
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', top: '-15px', left: '1.5rem',
            background: '#0B0E2D', padding: '0 10px',
            color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px',
          }}>
            <Sparkles size={16} /> DATO CIENTÍFICO
          </div>
          <p style={{
            margin: 0, fontSize: '1.05rem', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.95)', fontStyle: 'italic',
            textAlign: 'center',
          }}>
            "{node.fact}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function InteractiveInfographic_InterestelarM6() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      setExploredNodes(prev => new Set(prev).add(id));
    }
  };

  const progress = Math.round((exploredNodes.size / INFOGRAPHIC_NODES.length) * 100);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      background: '#050714',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#E2E8F0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <VoyagerHeader />

      {/* ProgressBar tracking explored nodes */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', background: '#FFD54F' }}
          />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFD54F' }}>
          {progress}% EXPLORADO
        </span>
      </div>

      {/* Nodes Map */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 2,
        padding: '1rem 0',
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
        {activeNode && (
          <ContentPanel
            key={activeNode}
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      {/* Bibliography */}
      <div style={{
        marginTop: '4rem',
        padding: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        zIndex: 2,
      }}>
        <h5 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Referencias Científicas
        </h5>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
          {BIBLIOGRAPHY.map((bib, i) => (
            <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#FFD54F' }}>•</span> {bib}
            </li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Vista Detallada"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
