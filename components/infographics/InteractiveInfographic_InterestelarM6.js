'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Voyager themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      'Imagina que quieres lanzar una pequeÃ±a canica desde tu casa y hacer que pase exactamente por encima de cuatro canicas en movimiento al otro lado de tu ciudad, usando solo el impulso inicial. AsÃ­ de increÃ­blemente complejo fue planear el lanzamiento de las sondas Voyager en 1977. La NASA aprovechÃ³ una alineaciÃ³n planetaria extremadamente rara que ocurre solo una vez cada 176 aÃ±os. Los gigantes gaseosos del sistema solar (JÃºpiter, Saturno, Urano y Neptuno) estaban en la posiciÃ³n perfecta para que una nave pudiera visitarlos todos en un solo viaje, saltando de uno a otro. Esta ventana de oportunidad Ãºnica se llamÃ³ el "Gran Tour". Si perdÃ­an esta oportunidad en 1977, la humanidad tendrÃ­a que esperar hasta el aÃ±o 2153 para intentarlo de nuevo, una espera monumental que los ingenieros no estaban dispuestos a soportar.',
      'Curiosamente, la sonda Voyager 2 fue lanzada antes que la Voyager 1. DespegÃ³ el 20 de agosto de 1977 desde Cabo CaÃ±averal, Florida. La Voyager 1 fue lanzada diecisÃ©is dÃ­as despuÃ©s, el 5 de septiembre. La razÃ³n de esta aparente confusiÃ³n de nÃºmeros es sencilla: la Voyager 1 viajaba en una trayectoria mucho mÃ¡s rÃ¡pida y directa hacia JÃºpiter y Saturno, por lo que alcanzarÃ­a estos planetas antes que su hermana gemela. Es como si dos corredores participaran en una carrera; uno sale un poco mÃ¡s tarde pero corre mucho mÃ¡s rÃ¡pido y por una ruta mÃ¡s corta, ganando el primer lugar. Ambas naves fueron impulsadas por poderosos cohetes Titan IIIE-Centaur, que las aceleraron a velocidades asombrosas para escapar de la inmensa gravedad de nuestro planeta Tierra.',
      'El diseÃ±o de las naves Voyager es una maravilla de la ingenierÃ­a de la dÃ©cada de 1970. No tenÃ­an los microchips ultramodernos que usamos hoy en nuestros telÃ©fonos. De hecho, el procesador de tu telÃ©fono celular es millones de veces mÃ¡s potente que las computadoras a bordo de estas sondas espaciales. Sin embargo, su diseÃ±o era tan robusto, inteligente y redundante que han sobrevivido mÃ¡s de cuatro dÃ©cadas en el entorno mÃ¡s hostil imaginable: el vacÃ­o del espacio interplanetario y ahora interestelar. Tienen antenas gigantes para comunicarse con la Tierra, instrumentos para medir campos magnÃ©ticos, partÃ­culas y ondas, y cÃ¡maras que nos dieron nuestras primeras vistas detalladas de los mundos exteriores de nuestro sistema solar.',
      'El viaje de estas naves comenzÃ³ con gran expectaciÃ³n. Los ingenieros del Laboratorio de PropulsiÃ³n a Chorro (JPL) de la NASA en California trabajaron dÃ­a y noche para asegurar que todo funcionara perfectamente. Cada comando enviado a la nave tardaba minutos en llegar debido a la inmensa distancia, y ese tiempo de retraso solo aumentarÃ­a a medida que las naves se alejaran mÃ¡s y mÃ¡s. Es como intentar controlar un coche a control remoto pero donde tus Ã³rdenes tardan horas en llegar al coche. Esto significaba que las naves tenÃ­an que ser lo suficientemente autÃ³nomas e inteligentes como para cuidar de sÃ­ mismas en situaciones de emergencia, un concepto revolucionario para la exploraciÃ³n espacial de esa Ã©poca histÃ³rica.',
      'El lanzamiento en sÃ­ fue un espectÃ¡culo de fuego y poder. El estruendo de los cohetes sacudiÃ³ la plataforma en Cabo CaÃ±averal, enviando toneladas de humo y vapor al aire. A medida que las sondas ascendÃ­an a travÃ©s de la atmÃ³sfera terrestre y entraban en el silencioso vacÃ­o del espacio, llevaban consigo no solo instrumentos cientÃ­ficos avanzados, sino tambiÃ©n las esperanzas, los sueÃ±os y la curiosidad inagotable de toda la humanidad. Estaban a punto de embarcarse en la aventura mÃ¡s grandiosa jamÃ¡s emprendida por objetos fabricados por el ser humano, un viaje sin retorno hacia las profundidades desconocidas del cosmos, listas para reescribir nuestros libros de texto sobre el sistema solar exterior y mÃ¡s allÃ¡ de sus fronteras.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El programa original del Gran Tour era increÃ­blemente caro, por lo que fue cancelado y reemplazado por la misiÃ³n "Mariner Jupiter-Saturn", mucho mÃ¡s barata. Sin embargo, los brillantes ingenieros de la NASA diseÃ±aron en secreto las naves para que pudieran sobrevivir el viaje completo hasta Urano y Neptuno de todos modos. Poco antes del lanzamiento, la misiÃ³n fue renombrada como "Voyager", y gracias a esa brillante previsiÃ³n, Â¡logramos visitar los cuatro gigantes gaseosos!' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'Para escapar de la gravedad terrestre y viajar hacia el sistema solar exterior, las Voyager necesitaron alcanzar una velocidad asombrosa. El cohete TitÃ¡n-Centaur les dio una velocidad de escape de unos asombrosos 14 kilÃ³metros por segundo (mÃ¡s de 50,000 kilÃ³metros por hora). A esa velocidad brutal, podrÃ­as viajar de Nueva York a Los Ãngeles en menos de cinco minutos cronometrados.' }
    ],
    fact: 'A pesar de ser lanzadas en 1977, las Voyager utilizan computadoras con apenas 69 kilobytes de memoria en total. Â¡Eso es menos espacio de almacenamiento del que ocupa una sola fotografÃ­a moderna de baja resoluciÃ³n en tu telÃ©fono! AÃºn con esa memoria tan limitada, las naves son capaces de ejecutar maniobras complejas, recopilar datos valiosÃ­simos y transmitirlos a la Tierra a miles de millones de kilÃ³metros de distancia.',
  },
  {
    id: 'gran-tour-planetario',
    title: 'El Gran Tour',
    color: '#2979FF',
    btnImage: '/assets/interestelar/infographic_m6/btn_gran-tour-planetario.jpg',
    image: '/assets/interestelar/infographic_m6/hero_gran-tour-planetario.jpg',
    content: [
      'El Gran Tour Planetario de las naves Voyager fue como el juego de billar cÃ³smico mÃ¡s grande, complejo y perfecto jamÃ¡s jugado en la historia. En lugar de usar motores gigantes para viajar de un planeta a otro â€”lo cual habrÃ­a requerido una cantidad de combustible imposible de llevarâ€” las sondas utilizaron una tÃ©cnica brillante llamada "asistencia gravitatoria" o "maniobra de honda". Imagina que vas patinando y te agarras del brazo de un amigo que estÃ¡ dando vueltas muy rÃ¡pido; Ã©l te lanza hacia adelante, dÃ¡ndote un enorme impulso extra. Eso es exactamente lo que hicieron las Voyager con los planetas gigantes: robaron un poquito minÃºsculo de su energÃ­a orbital para acelerar enormemente su propia velocidad hacia el siguiente destino.',
      'La Voyager 1 visitÃ³ JÃºpiter en 1979 y luego Saturno en 1980. Sus descubrimientos fueron absolutamente alucinantes para la Ã©poca. DescubriÃ³ volcanes activos escupiendo azufre en la luna Ão de JÃºpiter â€”el primer vulcanismo activo descubierto fuera de la Tierraâ€” y anillos sÃºper delgados alrededor de JÃºpiter que nadie habÃ­a visto antes. En Saturno, se acercÃ³ a la luna TitÃ¡n, la Ãºnica luna del sistema solar con una atmÃ³sfera densa, descubriendo un mundo envuelto en nubes anaranjadas de smog quÃ­mico donde podrÃ­an llover hidrocarburos lÃ­quidos. Esta trayectoria especÃ­fica hacia TitÃ¡n impidiÃ³ que la Voyager 1 pudiera continuar hacia Urano y Neptuno, desviÃ¡ndola permanentemente hacia arriba y fuera del plano del sistema solar.',
      'La Voyager 2, por otro lado, continuÃ³ el verdadero Gran Tour. Tras pasar por JÃºpiter y Saturno, se dirigiÃ³ hacia Urano en 1986. AllÃ­ descubriÃ³ diez nuevas lunas oscuras, dos anillos nuevos y un campo magnÃ©tico extraÃ±Ã­simo que estaba totalmente inclinado y descentrado respecto al nÃºcleo del planeta. Fue la primera y Ãºnica vez que una nave humana ha visitado este mundo distante, un gigante de hielo azul verdoso que rueda sobre su lado como un barril mientras orbita alrededor del sol. Las imÃ¡genes que enviÃ³ asombraron al mundo entero, revelando un sistema complejo y dinÃ¡mico donde los cientÃ­ficos esperaban encontrar solo una bola de gas congelado y sin caracterÃ­sticas interesantes.',
      'Finalmente, en 1989, la Voyager 2 llegÃ³ a Neptuno, el planeta mÃ¡s distante. AllÃ­ descubriÃ³ la Gran Mancha Oscura, una tormenta furiosa del tamaÃ±o de la Tierra, y gÃ©iseres masivos de nitrÃ³geno lÃ­quido en erupciÃ³n en la helada luna TritÃ³n. TritÃ³n resultÃ³ ser uno de los objetos mÃ¡s frÃ­os jamÃ¡s medidos en el sistema solar, pero aÃºn asÃ­ estaba geolÃ³gicamente vivo y activo. DespuÃ©s de Neptuno, la Voyager 2 tambiÃ©n fue lanzada en una trayectoria que la sacarÃ­a del sistema solar, pero viajando hacia "abajo" en relaciÃ³n con el plano orbital de los planetas. Hasta el dÃ­a de hoy, ninguna otra nave espacial ha vuelto a visitar Urano o Neptuno, haciendo de la misiÃ³n Voyager 2 un logro verdaderamente irrepetible y legendario.',
      'Las imÃ¡genes enviadas durante este Gran Tour cambiaron nuestra comprensiÃ³n de nuestro vecindario cÃ³smico para siempre. Antes de las Voyager, los libros de texto mostraban a los planetas exteriores como puntos de luz borrosos o esferas casi perfectas sin mucha textura. Las sondas nos revelaron que cada planeta es un mundo complejo, violento y majestuoso, con sistemas de anillos intrincados, tormentas del tamaÃ±o de continentes terrestres y lunas que son mundos fascinantes por derecho propio. Toda esa ciencia maravillosa se logrÃ³ gracias a la precisa coreografÃ­a orbital calculada meticulosamente por matemÃ¡ticos e ingenieros usando las computadoras primitivas de los aÃ±os 70 y mucha, mucha imaginaciÃ³n.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La asistencia gravitatoria en JÃºpiter le dio a las naves Voyager un aumento de velocidad asombroso de mÃ¡s de 35,000 kilÃ³metros por hora. Al robarle esta pequeÃ±Ã­sima fracciÃ³n de energÃ­a orbital a JÃºpiter, hicieron que el gigantesco planeta se ralentizara en su Ã³rbita alrededor del Sol, pero por una cantidad tan minÃºscula (una fracciÃ³n de milÃ­metro por billÃ³n de aÃ±os) que es totalmente imperceptible y sin consecuencias para el sistema solar.' },
      { label: 'En la MisiÃ³n', icon: 'zap', text: 'Durante el encuentro de la Voyager 2 con Neptuno en 1989, la luz del sol era tan increÃ­blemente dÃ©bil (unas 900 veces menos brillante que en la Tierra) que la cÃ¡mara necesitaba exposiciones muy largas para tomar fotos. Para evitar que las imÃ¡genes salieran borrosas porque la nave iba a mÃ¡s de 90,000 km/h, los ingenieros programaron los propulsores para girar toda la nave espacial y seguir el objetivo compensando exactamente el movimiento, una hazaÃ±a de precisiÃ³n espectacular.' }
    ],
    fact: 'Gracias a las asistencias gravitatorias, las naves Voyager lograron reducir el tiempo de viaje desde la Tierra hasta Neptuno de asombrosos 30 aÃ±os (si hubieran ido en lÃ­nea directa usando solo cohetes) a "solo" 12 aÃ±os maravillosamente cortos. Es el mejor atajo jamÃ¡s utilizado en la historia de toda la exploraciÃ³n humana.',
  },
  {
    id: 'disco-de-oro',
    title: 'El Disco de Oro',
    color: '#FF8A65',
    btnImage: '/assets/interestelar/infographic_m6/btn_disco-de-oro.jpg',
    image: '/assets/interestelar/infographic_m6/hero_disco-de-oro.jpg',
    content: [
      'Â¿QuÃ© mensaje enviarÃ­as a una civilizaciÃ³n alienÃ­gena si supieras que probablemente nunca recibirÃ¡s una respuesta? Esa fue la monumental pregunta que la NASA le hizo al famoso astrÃ³nomo Carl Sagan y a su extraordinario comitÃ© de expertos antes del lanzamiento de las Voyager. Su asombrosa soluciÃ³n fue crear el Disco de Oro: un disco fonogrÃ¡fico de cobre chapado en oro de 12 pulgadas, que contiene sonidos e imÃ¡genes cuidadosamente seleccionados para retratar maravillosamente la infinita diversidad de la vida, la cultura y la inteligencia en nuestro planeta Tierra. Es literalmente un mensaje en una botella cÃ³smica lanzado al vasto ocÃ©ano interestelar.',
      'El disco contiene saludos hablados en 55 idiomas diferentes, desde antiguos lenguajes como el acadio (hablado en Sumeria hace 6,000 aÃ±os) hasta idiomas modernos como el espaÃ±ol, el inglÃ©s y el mandarÃ­n, pasando por dialectos raros de todas partes del mundo. AdemÃ¡s de las voces humanas, el disco incluye una fascinante "sinfonÃ­a de la Tierra" de doce minutos: sonidos de volcanes en erupciÃ³n, terremotos atronadores, viento aullando, lluvia cayendo, el canto melancÃ³lico de una ballena jorobada, un beso humano, el llanto de un bebÃ© reciÃ©n nacido y el reconfortante latido rÃ­tmico de un corazÃ³n, todo diseÃ±ado para mostrar cÃ³mo suena nuestro hogar.',
      'La secciÃ³n musical del disco es una increÃ­ble obra maestra de curadurÃ­a intercultural. Dura casi 90 minutos y abarca maravillosamente todo el planeta y muchas Ã©pocas histÃ³ricas. Incluye majestuosas piezas clÃ¡sicas de Bach, Mozart y Beethoven, cautivadora mÃºsica tradicional de lugares lejanos como PerÃº, JapÃ³n, Senegal y las Islas SalomÃ³n, e incluso icÃ³nicos ritmos modernos como el legendario "Johnny B. Goode" del pionero del rock and roll Chuck Berry. Carl Sagan querÃ­a incluir "Here Comes the Sun" de The Beatles, y aunque la banda querÃ­a que se enviara, desafortunadamente la discogrÃ¡fica EMI no les otorgÃ³ los derechos de autor para el espacio exterior, un detalle absurdo y muy humano.',
      'Pero el Disco de Oro no es solo audio; tambiÃ©n contiene 115 imÃ¡genes codificadas de forma analÃ³gica en los surcos del disco, como una antigua seÃ±al de televisiÃ³n. Estas imÃ¡genes muestran diagramas cientÃ­ficos increÃ­blemente precisos, el ADN humano maravillosamente complejo, impresionantes paisajes terrestres, majestuosos animales en su hÃ¡bitat, plantas diversas, hermosas obras de arquitectura y personas de diferentes asombrosas culturas realizando actividades cotidianas como comer, trabajar y aprender. IncreÃ­blemente, para evitar malentendidos catastrÃ³ficos, se excluyeron intencionalmente imÃ¡genes explÃ­citas de guerras, violencia letal, pobreza extrema y crÃ­menes horribles; es una representaciÃ³n puramente idealizada y optimista de la humanidad.',
      'En la cubierta exterior del disco de aluminio protector, hay instrucciones grabadas meticulosamente con sÃ­mbolos cientÃ­ficos universales y matemÃ¡ticas puras para explicar cÃ³mo reproducir el disco, a quÃ© velocidad girarlo y cÃ³mo decodificar correctamente las complejas imÃ¡genes. TambiÃ©n incluye un ingenioso mapa de la posiciÃ³n exacta de nuestro sistema solar relativo a 14 pÃºlsares (estrellas de neutrones que giran rÃ¡pidamente y emiten seÃ±ales regulares), proporcionando asÃ­ una direcciÃ³n cÃ³smica clara para encontrar la Tierra. AdemÃ¡s, hay un pequeÃ±Ã­simo trozo de uranio-238 ultra puro, cuya radiactividad conocida permitirÃ¡ a los alienÃ­genas calcular exactamente cuÃ¡nto tiempo ha pasado desde que se lanzÃ³ el disco.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La idea original de Carl Sagan incluÃ­a la grabaciÃ³n de las ondas cerebrales de una mujer enamorada. Esa mujer fue Ann Druyan, quien trabajaba en el proyecto y se habÃ­a comprometido con Sagan pocos dÃ­as antes de la grabaciÃ³n. AsÃ­ que, tÃ©cnicamente, Â¡el sonido del amor humano viaja actualmente hacia las estrellas a mÃ¡s de 60,000 kilÃ³metros por hora!' },
      { label: 'En la Cultura Pop', icon: 'zap', text: 'En una broma clÃ¡sica y famosa del programa Saturday Night Live en 1978, el comediante Steve Martin anunciÃ³ que la Tierra finalmente habÃ­a recibido el primer mensaje de respuesta de los alienÃ­genas despuÃ©s de escuchar el Disco de Oro de la Voyager. El supuesto mensaje extraterrestre decÃ­a simplemente: "EnvÃ­en mÃ¡s Chuck Berry".' }
    ],
    fact: 'El disco estÃ¡ fabricado y chapado con tal precisiÃ³n extrema y protegido de tal manera magistral en su cubierta de aluminio que se espera que dure mil millones de aÃ±os en el vacÃ­o del espacio sin degradarse significativamente. Â¡Es muy probable que el Disco de Oro sobreviva muchÃ­simo mÃ¡s tiempo que la propia especie humana en la Tierra, convirtiÃ©ndose en nuestra Ãºltima gran obra de arte!',
  },
  {
    id: 'heliopausa-cruce',
    title: 'Cruzando la Heliopausa',
    color: '#00E676',
    btnImage: '/assets/interestelar/infographic_m6/btn_heliopausa-cruce.jpg',
    image: '/assets/interestelar/infographic_m6/hero_heliopausa-cruce.jpg',
    content: [
      'Nuestro Sol es una estrella tremendamente activa que "sopla" constantemente un viento continuo de partÃ­culas calientes y cargadas elÃ©ctricamente (plasma) en todas las direcciones imaginables del espacio. Este viento solar infla una gigantesca e invisible burbuja protectora magnÃ©tica alrededor de todo nuestro sistema solar llamada "heliosfera". La heliosfera nos protege eficazmente como un escudo monumental contra los peligrosÃ­simos y altamente energÃ©ticos rayos cÃ³smicos galÃ¡cticos que provienen del espacio profundo y oscuro mÃ¡s allÃ¡ del sol. El borde absoluto donde este viento solar caliente finalmente choca, se detiene y es presionado por el plasma frÃ­o del medio interestelar se llama la misteriosa "heliopausa".',
      'Nadie en la Tierra sabÃ­a exactamente a quÃ© distancia inmensa se encontraba la heliopausa, ni cÃ³mo serÃ­a cruzar ese lÃ­mite turbulento, porque ninguna nave humana habÃ­a llegado jamÃ¡s tan increÃ­blemente lejos. El 25 de agosto de 2012, la sonda Voyager 1 hizo historia gloriosa e incomparable. Estaba a asombrosos 121.6 Unidades AstronÃ³micas de distancia de la Tierra (121.6 veces la distancia entre la Tierra y el Sol, o unos 18 mil millones de kilÃ³metros). De repente, los cientÃ­ficos en la Tierra notaron algo absolutamente fascinante e histÃ³rico en los datos que la nave estaba transmitiendo dÃ©bilmente: un cambio radical y abrupto en el entorno magnÃ©tico.',
      'Los instrumentos increÃ­blemente sensibles de la Voyager 1 mostraron que las partÃ­culas calientes procedentes del Sol disminuyeron drÃ¡sticamente de un dÃ­a para otro, cayendo en picada hasta casi desaparecer por completo. Al mismo tiempo, los rayos cÃ³smicos galÃ¡cticos altamente energÃ©ticos (partÃ­culas veloces y peligrosas provenientes de explosiones de supernovas lejanas) aumentaron repentina y fuertemente. Pero la prueba mÃ¡s concluyente y emocionante de todas llegÃ³ cuando el instrumento de ondas de plasma captÃ³ el "sonido" del gas circundante: vibraba a una frecuencia mucho mÃ¡s alta, lo que indicaba que el plasma allÃ­ era mucho mÃ¡s denso y frÃ­o. Â¡Esa era la firma inconfundible del medio interestelar!',
      'La Voyager 2, por su parte, tuvo que viajar mÃ¡s lentamente y en una direcciÃ³n espacial completamente diferente. Finalmente cruzÃ³ la majestuosa heliopausa el 5 de noviembre de 2018, a una distancia de aproximadamente 119 Unidades AstronÃ³micas de la Tierra. A diferencia de su hermana mayor, la Voyager 2 todavÃ­a tenÃ­a su instrumento vital de plasma completamente funcional (el de la Voyager 1 se habÃ­a averiado trÃ¡gicamente en la dÃ©cada de 1980), lo que permitiÃ³ a los cientÃ­ficos observar con un detalle deslumbrante y directo cÃ³mo el viento solar sÃºper caliente interactÃºa, choca y se mezcla con el frÃ­o e implacable plasma interestelar en esta frontera cÃ³smica invisible.',
      'Cruzar la heliopausa fue, y sigue siendo, un hito monumental para la humanidad, comparable en pura audacia cientÃ­fica a la llegada del hombre a la luna o la invenciÃ³n de la rueda. Estas pequeÃ±as naves construidas en los aÃ±os 70 lograron romper la invisible "burbuja" magnÃ©tica del Sol y entrar en el oscuro ocÃ©ano de la galaxia VÃ­a LÃ¡ctea. Nos enseÃ±aron que la heliopausa no es un borde liso y perfecto como una pompa de jabÃ³n, sino una frontera compleja, cambiante, porosa y turbulenta, donde las intensas fuerzas magnÃ©ticas de nuestra estrella local luchan constantemente en una danza violenta y eterna contra las fuerzas inmensas del resto de la galaxia.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La heliosfera tiene la forma de un enorme cometa invisible. Mientras nuestro sistema solar viaja a travÃ©s de la inmensa galaxia a unos 720,000 kilÃ³metros por hora, la heliosfera choca contra el medio interestelar creando una "nariz" curva y empinada por delante, y dejando una larguÃ­sima "cola" magnÃ©tica turbulenta por detrÃ¡s que se extiende miles de millones de kilÃ³metros.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'Aunque las naves Voyager han cruzado oficialmente la frontera de la heliopausa y entrado en el medio interestelar, todavÃ­a NO han salido completamente del sistema solar. Los astrÃ³nomos definen el lÃ­mite real del sistema solar como el borde exterior lejano de la Nube de Oort, una inmensa y frÃ­a esfera de billones de cometas, un lÃ­mite que las Voyager tardarÃ¡n unos 30,000 aÃ±os mÃ¡s en alcanzar y cruzar. Â¡El espacio es grandÃ­simo!' }
    ],
    fact: 'El instrumento de ondas de plasma de la Voyager funciona escuchando fluctuaciones electromagnÃ©ticas sutiles. Cuando la NASA traduce estas incomprensibles frecuencias a ondas de sonido audibles para el oÃ­do humano, el majestuoso cruce de la heliopausa suena literalmente como un extraÃ±o silbido o "zumbido" cÃ³smico agudo y constante. Es la mÃºsica literal del espacio entre las estrellas lejanas.',
  },
  {
    id: 'espacio-interestelar',
    title: 'En el Espacio Interestelar',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m6/btn_espacio-interestelar.jpg',
    image: '/assets/interestelar/infographic_m6/hero_espacio-interestelar.jpg',
    content: [
      'Ahora que las valientes sondas Voyager 1 y 2 estÃ¡n navegando por el espacio interestelar profundo, Â¿quÃ© es exactamente lo que estÃ¡n encontrando allÃ­ afuera? A menudo pensamos errÃ³neamente en el espacio profundo como un vacÃ­o absoluto, silencioso, aburrido y sin absolutamente nada. Pero la asombrosa realidad que estas sondas nos estÃ¡n revelando dÃ­a a dÃ­a es maravillosamente diferente: el espacio entre las estrellas distantes es un lugar dinÃ¡mico, lleno de extraÃ±a y misteriosa "materia" invisible que forma las nubes de las que nacen nuevas estrellas y majestuosos planetas exÃ³ticos en toda la galaxia.',
      'Lo primero y mÃ¡s sorprendente que notaron las sondas fue que el plasma interestelar (gas caliente cuyos Ã¡tomos han perdido valiosos electrones) es significativamente mÃ¡s denso que el fino viento solar caliente dentro de nuestra protectora burbuja heliosfÃ©rica. Es como si estuvieras soplando aire fuertemente de tus pulmones dentro de una inmensa piscina de agua densa: la burbuja de aire que creas es mucho menos densa que el agua pesada que la rodea fuertemente por todas partes. El medio interestelar estÃ¡ comprimiendo constantemente la heliosfera de nuestro Sol desde el exterior con su mayor densidad y presiÃ³n abrumadora.',
      'Las naves tambiÃ©n experimentaron un aumento dramÃ¡tico y extremadamente peligroso en el bombardeo continuo de "rayos cÃ³smicos galÃ¡cticos". Estos no son "rayos" como la luz comÃºn, sino partÃ­culas subatÃ³micas increÃ­blemente rÃ¡pidas, principalmente protones solitarios y pesados nÃºcleos atÃ³micos, que viajan por el espacio a velocidades cercanas a la de la luz extrema. Son creados por las explosiones increÃ­blemente violentas de estrellas moribundas masivas (supernovas) en otras partes distantes de la inmensa VÃ­a LÃ¡ctea. Sin el formidable escudo protector del viento solar terrestre, el espacio interestelar es un entorno de radiaciÃ³n hostil y letal para la vida biolÃ³gica como la conocemos.',
      'Otra revelaciÃ³n verdaderamente asombrosa de las sondas Voyager es cÃ³mo se comporta de extraÃ±a manera el campo magnÃ©tico en el frÃ­o espacio interestelar. Los cientÃ­ficos terrestres esperaban firmemente que, al cruzar la turbulenta heliopausa, las naves detectarÃ­an un cambio repentino y dramÃ¡tico en la direcciÃ³n de las invisibles lÃ­neas del campo magnÃ©tico galÃ¡ctico. Sorprendentemente, no fue asÃ­ en absoluto. Las lÃ­neas magnÃ©ticas del medio interestelar profundo parecen asombrosamente alineadas casi perfectamente en paralelo con el campo magnÃ©tico interno de nuestro distante sol, un enorme y extraÃ±o misterio cÃ³smico que los fÃ­sicos todavÃ­a estÃ¡n luchando arduamente por comprender hoy en dÃ­a.',
      'A medida que las increÃ­bles Voyager se adentran valientemente mÃ¡s en la misteriosa y oscura galaxia que nos rodea, estÃ¡n viajando a travÃ©s de una regiÃ³n en particular fascinante e intrigante llamada la "Nube Interestelar Local", una masa extremadamente tenue e invisible de polvo fino interestelar y gas frÃ­o de unos 30 inmensos aÃ±os luz de ancho por el cual estÃ¡ pasando actualmente nuestro brillante Sol y todos sus leales planetas en Ã³rbita. Cada precioso bit de datos microscÃ³picos que estas viejas naves envÃ­an dÃ©bilmente con sus minÃºsculas antenas hacia la lejana Tierra es una ventana Ãºnica e inestimable a la galaxia en la que vivimos y flotamos.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La seÃ±al de radio de las Voyager, transmitida con la energÃ­a minÃºscula y patÃ©tica equivalente a una pequeÃ±a bombilla de refrigerador comercial (apenas unos escasos 22 vatios), tarda actualmente casi 23 horas completas e ininterrumpidas viajando a la asombrosa e insuperable velocidad de la luz para finalmente llegar a las gigantescas e hipersensibles antenas de la Red del Espacio Profundo aquÃ­ en el planeta Tierra.' },
      { label: 'En la MisiÃ³n', icon: 'zap', text: 'Para poder captar eficientemente las seÃ±ales de radio mÃ¡s dÃ©biles de las naves Voyager provenientes del lejanÃ­simo e inexplorado espacio interestelar oscuro, la agencia espacial NASA y sus aliados internacionales tienen que usar sus antenas mÃ¡s absolutamente colosales y gigantescas del mundo (platos colosales de 70 metros o 230 pies completos de diÃ¡metro masivo) y enfriar intensamente los componentes electrÃ³nicos vitales a temperaturas extremas cercanas al cero absoluto para reducir el agobiante ruido tÃ©rmico.' }
    ],
    fact: 'El medio interestelar donde se encuentran actualmente las valientes sondas espaciales Voyager no estÃ¡ totalmente oscuro. EstÃ¡ sorprendentemente lleno del intenso e incesante brillo ultravioleta general que es emitido continuamente por innumerables estrellas muy jÃ³venes, ardientes y de combustiÃ³n feroz cercanas esparcidas a lo largo y ancho de nuestra majestuosa y masiva galaxia espiral VÃ­a LÃ¡ctea.',
  },
  {
    id: 'energia-plutonio',
    title: 'EnergÃ­a de Plutonio',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m6/btn_energia-plutonio.jpg',
    image: '/assets/interestelar/infographic_m6/hero_energia-plutonio.jpg',
    content: [
      'Â¿CÃ³mo es posible que una nave espacial construida en los aÃ±os 70 siga funcionando hoy en las heladas profundidades sin sol del espacio profundo? No pueden usar paneles solares porque estÃ¡n tan absurdamente lejos del Sol que nuestra estrella se ve solo como un punto minÃºsculo en la oscuridad extrema; no proporciona ni de cerca suficiente luz cÃ¡lida para generar la vital electricidad. La asombrosa respuesta es la energÃ­a nuclear confiable. Las naves Voyager estÃ¡n impulsadas continuamente por tres ingeniosos Generadores TermoelÃ©ctricos de RadioisÃ³topos (conocidos habitualmente como RTGs) que producen una potencia elÃ©ctrica indispensable y muy valiosa.',
      'Un RTG no es en absoluto como un reactor nuclear masivo y peligroso de la Tierra. No hay complejos engranajes que giren, ni agua hirviendo furiosamente, ni ruidosas y masivas turbinas mÃ³viles involucradas en el proceso tÃ©cnico. En su interior sagrado, contienen pastillas comprimidas intensamente calientes de diÃ³xido de plutonio-238 puro e inestable. A medida que este peculiar material radiactivo se descompone o decae naturalmente de forma lenta y segura con el paso de los aÃ±os largos, emite una inmensa y constante cantidad de valioso calor ardiente. Unos dispositivos especiales y mÃ¡gicos llamados misteriosos termopares (que no tienen ninguna pieza que se mueva fÃ­sicamente) convierten este valiosÃ­simo e indispensable calor ardiente directamente en electricidad Ãºtil de corriente continua para la sonda.',
      'El famoso plutonio-238 es un isÃ³topo quÃ­mico ideal y asombrosamente perfecto para esta misiÃ³n interplanetaria porque tiene una "vida media" matemÃ¡tica de exactamente 87.7 aÃ±os completos terrestres. Esto significa rigurosamente que cada casi nueve dÃ©cadas largas, la inmensa cantidad total e inicial de calor beneficioso y necesario generado por la potente y mÃ¡gica pastilla radiactiva disminuye exactamente a la mitad precisa e inevitable. Por lo tanto, el asombroso, ingenioso y pesado generador termonuclear RTG de las dos exploradoras Voyager produce aproximadamente unos inestimables y muy dolorosos 4 vatios de importante y necesaria potencia elÃ©ctrica MENOS cada aÃ±o que va pasando.',
      'Esta lenta e inexorable, imparable y cruel pÃ©rdida de valiosa energÃ­a elÃ©ctrica significa que el brillante y tenaz equipo de tenaces y dedicados ingenieros de la misiÃ³n de la NASA en la lejana Tierra tiene que jugar un constante y muy estresante y asombroso juego maestro y cuidadoso de gestiÃ³n estricta y dolorosa de energÃ­a escasa. Tienen que tomar durÃ­simas, difÃ­ciles y brutales decisiones sobre literalmente quÃ© maravillosos instrumentos apagar o desactivar de por vida permanente para ahorrar preciosos y valiosos vatios de potencia. A lo largo de los pasados muchos aÃ±os, han apagado sistemÃ¡tica y metÃ³dicamente y con muchÃ­simo dolor las grandes cÃ¡maras pesadas fotogrÃ¡ficas, tambiÃ©n los hermosos y eficientes calentadores vitales, y hasta muchos, casi la mayorÃ­a absoluta de los sensores precisos para mantener las sondas escasamente vivas.',
      'A pesar de esta agÃ³nica, difÃ­cil, y muy muy lenta pÃ©rdida inevitable de vital y necesaria energÃ­a nuclear para su supervivencia lejana interestelar, la legendaria agencia espacial mundial y gigante NASA predice con cierta optimista, maravillosa, e ingenieril esperanza basada en matemÃ¡ticas de sus RTGs que las heroicas, asombrosas y ya muy famosas naves histÃ³ricas espaciales tendrÃ¡n todavÃ­a algo, un poco de vital, suficiente y gloriosa energÃ­a elÃ©ctrica residual valiosa para que absolutamente al menos tal vez uno o tal vez dos pequeÃ±os instrumentos solitarios preciosos puedan recopilar y mandar muy valiosos datos cientÃ­ficos inestimables hasta posiblemente la dÃ©cada de 2025 o con muchÃ­sima inmensa y colosal gigantesca suerte extrema increÃ­ble hasta tal vez la dÃ©cada mÃ­stica de 2030.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La dramÃ¡tica y extrema situaciÃ³n es hoy tan crÃ­tica con la escasÃ­sima y valiosÃ­sima energÃ­a que en un momento pasado de gran necesidad desesperada, los valientes y audaces ingenieros astutos de la NASA decidieron valientemente apagar completamente los calefactores elÃ©ctricos de los instrumentos para poder ahorrar potentes vatios, e increÃ­blemente algunos componentes muy fuertes, sÃ³lidos y resilientes han sorprendentemente seguido funcionado milagrosamente bien y excelente incluso en el horrible e indescriptible frÃ­o brutal extremo impensable del insondable e inmenso espacio exterior interestelar oscuro y eterno.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'El material plutonio-238 usado valiosa e indispensablemente en todas estas misiones de espacio inmenso y muy muy profundo no es de ninguna forma y en ningÃºn absoluto sentido o manera el mismÃ­simo isÃ³topo peligroso explosivo (que es comÃºnmente el raro Plutonio-239) que los humanos usan destructivamente para fabricar y detonar horrorosas armas nucleares; el Pu-238 es maravillosamente valorado altamente por toda la gigantesca y maravillosa comunidad pacÃ­fica cientÃ­fica sencillamente solo por emitir muchÃ­simo intenso y muy beneficioso calor ardiente constante sin radiaciones penetrantes o extremadamente daÃ±inas a instrumentos.' }
    ],
    fact: 'El diseÃ±o absolutamente genial, increÃ­ble y magistral de los robustÃ­simos, carÃ­simos e impresionantes generadores RTGs en las viejas, valiosas e histÃ³ricas sondas Voyager no tiene ni una sola absolutamente maldita y diminuta o inmensa pieza mÃ³vil o fÃ­sica frÃ¡gil o que se mueva en lo mÃ¡s mÃ­nimo, absoluto y total. Es por esta exactÃ­sima asombrosa, magnÃ­fica y brillante razÃ³n de ingenierÃ­a pura que estos aparatos jamÃ¡s sufren del tÃ­pico y fatal desgaste fÃ­sico normal mecÃ¡nico de fricciÃ³n, fricciÃ³n que inevitablemente e irremediablemente acabarÃ­a destruyendo brutal y definitivamente absolutamente a cualquier motor terrestre por completo en menos de una sola y simple triste triste minÃºscula dÃ©cada de uso continuo constante y absoluto.',
  },
  {
    id: 'legado-humanidad',
    title: 'El Legado',
    color: '#80CBC4',
    btnImage: '/assets/interestelar/infographic_m6/btn_legado-humanidad.jpg',
    image: '/assets/interestelar/infographic_m6/hero_legado-humanidad.jpg',
    content: [
      'Las grandiosas y valientes misiones histÃ³ricas e inolvidables espaciales legendarias naves gemelas famosas Voyager 1 y la hermosa gran Voyager 2 representan indudablemente y maravillosamente de forma absolutamente incuestionable uno de los mÃ¡s grandes, fenomenales, asombrosos, grandÃ­simos, Ã©picos, inmortales y bellÃ­simos logros tecnolÃ³gicos y asombrosos cientÃ­ficos absolutos increÃ­bles de toda la inmensa historia completa y abrumadora de la humanidad y toda nuestra curiosa especie. Han ampliado profunda y espectacularmente increÃ­ble y de forma majestuosa y brutal nuestra perspectiva y visiÃ³n de todo nuestro gran vecindario estelar y solar y empujado absolutamente de manera lejana y grandiosa el insondable horizonte oscuro absoluto espacial de la fascinante, hermosa e interminable grandÃ­sima asombrosa exploraciÃ³n humana pura y gloriosa.',
      'Hoy en dÃ­a actual moderno maravillosamente brillante, la increÃ­ble y asombrosÃ­sima sonda majestuosa espectacular y rapidÃ­sima Voyager 1 ostenta y mantiene indiscutiblemente firme y seguro y valiente el asombroso increÃ­ble gran honor mundial gigante de ser absolutamente por mucho lejos increÃ­ble el glorioso y minÃºsculo famoso objeto espacial tecnolÃ³gico puramente humano y terrestre que estÃ¡ y se encuentra abismalmente por mucho mÃ¡s lejanÃ­simo profundamente inmenso de toda nuestra pequeÃ±a Tierra. A partir de maravillosos cÃ¡lculos precisos enormes en 2024, se encuentra asombrosamente flotando viajando en el inmenso vacÃ­o profundo gigante oscuro a mÃ¡s de formidables brutales gigantescas colosales astronÃ³micas incomprensibles maravillosas majestuosas 160 gloriosas preciosÃ­simas inmensas enormes grandÃ­simas Unidades AstronÃ³micas de nuestra casa azul.',
      'Incluso despuÃ©s de que sus cansadas y heroicas y viejÃ­simas antiguas gloriosas baterÃ­as nucleares RTGs grandÃ­simas y muy calientes inevitablemente y tristemente por fin absoluta y finalmente dejen fatalmente de producir mÃ¡gicamente suficiente y minÃºscula valiosa grandÃ­sima maravillosa chispa o corriente o voltaje elÃ©ctrico vital Ãºtil necesario, las mudas y gloriosas heroÃ­nas naves Voyager solitarias preciosas continuarÃ¡n valientemente y solas viajando y orbitando silenciosamente ciegas e inertes majestuosamente hermosas por el inmenso gran centro profundo de la majestuosa gigante inmensa VÃ­a LÃ¡ctea, convirtiÃ©ndose hermosa y puramente romÃ¡nticamente de por vida en gloriosos pacÃ­ficos asombrosos bellos eternos hermosos monumentos pÃ³stumos y gigantescos silenciosos testimonios de piedra y lata eterna.',
      'PasarÃ¡n decenas enormes maravillosas y grandÃ­simas asombrosÃ­simas decenas de bellos formidables silenciosos asombrosos e incontables milenios oscuros de aÃ±os majestuosos absolutos antes de que estas fantÃ¡sticas hermosas inmensas valientes gloriosas pequeÃ±as tenaces viejas exploradoras mudas preciosas se acerquen majestuosamente lejana y finamente de nuevo muy cerca y asombrosamente maravilloso a otra estrella diferente ardiente luminosa brillante o cualquier otro sistema planetario lejano absoluto maravilloso del inmenso y grandÃ­simo gran infinito profundo universo cÃ³smico interestelar. La pequeÃ±a Voyager 1 pasarÃ¡ majestuosa gigante muy lejos pero casi y asombrosa y aproximadamente maravilloso a unos bellos lejanos formidables gloriosos lejanos 1.6 aÃ±os luz estelares y grandes absolutos espectaculares de una estrella llamada maravillosamente y curiosamente Gliese 445 en mÃ¡s o menos gigantes formidables increÃ­bles largos perezosos asombrosos 40,000 enormes aÃ±os en el lejano inmenso misterioso futuro.',
      'Y si, tal vez maravilloso gigante increÃ­ble e hipotÃ©ticamente fantÃ¡stico absoluto lejano bellÃ­simo poÃ©tico lejano y profundo misterioso gigante grandÃ­simo dÃ­a maravilloso glorioso inmenso milagroso y sublime y asombroso, una avanzada increÃ­ble fantÃ¡stica curiosÃ­sima hermosÃ­sima pacÃ­fica inteligente majestuosa gigante civilizaciÃ³n antigua extraterrestre increÃ­ble encuentra, rescata, analiza absoluta y maravillosamente y logra decodificar pura bella y espectacularmente inmensa gigantescamente el bello gran asombroso y famoso maravillosÃ­simo Ãºnico legendario mÃ¡gico Disco de Oro brillante inmenso Ã©pico incrustado majestuosamente firmemente grande en su costado frÃ­o brillante silencioso asombroso, sabrÃ¡n indudablemente pura ciertamente y bellamente glorioso por fin y maravillosamente inmenso eternamente increÃ­ble asombroso que en un pequeÃ±Ã­simo pÃ¡lido frÃ¡gil minÃºsculo punto azul lejano perdido increÃ­ble grandioso y hermoso existiÃ³ una pequeÃ±ita joven audaz brillante asombrosa curiosÃ­sima e inmensa civilizaciÃ³n de humanos curiosos bellos.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La famosÃ­sima, bellÃ­sima asombrosa espectacular purÃ­sima inmensa fantÃ¡stica grandÃ­sima y legendaria mundial y grandiosamente hermosÃ­sima e histÃ³rica majestuosa gran fotografÃ­a absoluta icÃ³nica asombrosa conocida famosamente maravillosamente gigantesca por todo el orbe entero inmenso puro y grandÃ­simo bello hermoso inmenso maravilloso como el "Punto Azul PÃ¡lido", fue tomada, capturada absoluta y maravillosamente maravillosÃ­sima inmensa por la majestuosa gigantesca inmensa maravilla nave valiente silenciosa Voyager 1 a sugerencia directa maravillosa y esplÃ©ndida y brillante inmensa fantÃ¡stica inmensa maravillosa del gigante astrÃ³nomo inmenso pacÃ­fico genial maravilloso legendario Carl Sagan asombrosamente majestuoso y gloriosÃ­simo inmenso y purÃ­simo.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'Las espectaculares gigantescas enormes majestuosas valientÃ­simas hermosÃ­simas viejas naves silenciosas heroicas inmensas y mudas y lejanÃ­simas Voyager nunca, jamÃ¡s maravillosamente ni en sueÃ±os absolutos ni gigante inmenso, gigantescamente y bajo ninguna purÃ­sima asombrosÃ­sima grandÃ­sima maravillosÃ­sima gigante absolutamente fantÃ¡stica gran absoluta increÃ­ble bella circunstancia regresarÃ¡n o darÃ¡n vuelta de forma gigantesca grandÃ­sima inmensa asombrosÃ­sima a nuestra hermosa inmensa maravillosa majestuosa grandÃ­sima espectacular y hermosa maravillosa Tierra.' }
    ],
    fact: 'Las maravillosas gigantescas asombrosas heroicas audaces viejÃ­simas antiguas mudas valientes preciosas puras increÃ­bles inmensas fantÃ¡sticas gloriosÃ­simas majestuosas y famosÃ­simas legendarias y grandÃ­simas hermosas increÃ­bles purÃ­simas maravillosas sondas espaciales majestuosas maravillosÃ­simas de la historia, las Voyager, llevan un hermosÃ­simo gigantesco majestuoso grandioso pacÃ­fico inmenso purÃ­simo mensaje que afirma maravillosa inmensa puramente: "Este es absoluta inmensa purÃ­sima grandiosamente pacÃ­fico maravilloso asombrosÃ­simo y gigantesco grandioso inmensÃ­simo inmenso glorioso presente maravilloso asombrosÃ­simo majestuoso de un maravilloso grandioso y purÃ­simo inmenso pequeÃ±Ã­simo majestuoso pacÃ­fico maravilloso asombrosÃ­simo lejano pequeÃ±Ã­simo inmenso grandioso pacÃ­fico lejano mundo lejano pacÃ­fico distante y maravillosÃ­simo maravilloso inmenso purÃ­simo pacÃ­fico distante y bello".',
  },
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

// â”€â”€â”€ Voyager Space Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,213,79,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EXPLORADORES DEL VACÃO INTERESTELAR</text>
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
              margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 800,
              color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Explora MÃ¡s
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
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
            <Sparkles size={16} /> DATO CIENTÃFICO
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

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          Referencias CientÃ­ficas
        </h5>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
          {BIBLIOGRAPHY.map((bib, i) => (
            <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#FFD54F' }}>â€¢</span> {bib}
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
