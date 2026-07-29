'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Alert/Surveillance themed) ────────────────────────────
function DecoRadar({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
      <line x1="30" y1="30" x2="30" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M 30 30 L 47 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 30 30 L 13 47" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Radar sweep wedge */}
      <path d="M 30 30 L 30 6 A 24 24 0 0 1 47 13 Z" fill={color} opacity="0.15" />
      <circle cx="20" cy="15" r="2" fill={color} opacity="0.9" />
      <circle cx="45" cy="40" r="1.5" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoAlert({ size = 70, color = '#F44336', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 5 L 5 50 L 55 50 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      <path d="M 30 15 L 12 47 L 48 47 Z" fill={color} opacity="0.1" />
      <line x1="30" y1="22" x2="30" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <circle cx="30" cy="44" r="2.5" fill={color} opacity="0.9" />
      {/* Pulse rings */}
      <path d="M 30 2 L 2 52 L 58 52 Z" fill="none" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.3" />
      <path d="M 30 -1 L -1 54 L 61 54 Z" fill="none" stroke={color} strokeWidth="0.5" strokeLinejoin="round" opacity="0.1" />
    </svg>
  );
}

function DecoSatellite({ size = 70, color = '#2196F3', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Solar panels */}
      <rect x="5" y="25" width="15" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <rect x="40" y="25" width="15" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      {/* Panel grids */}
      <line x1="10" y1="25" x2="10" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="25" x2="15" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="25" x2="45" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="50" y1="25" x2="50" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Central body */}
      <rect x="22" y="20" width="16" height="20" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
      <rect x="24" y="22" width="12" height="16" fill={color} opacity="0.2" />
      {/* Antenna */}
      <path d="M 30 20 L 30 5 L 25 5 L 35 5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" strokeLinejoin="round" />
      {/* Signal waves */}
      <path d="M 20 8 A 12 12 0 0 1 40 8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M 15 3 A 18 18 0 0 1 45 3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function DecoDataStream({ size = 70, color = '#00ACC1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <line x1="10" y1="5" x2="10" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" strokeDasharray="4 4" />
      <line x1="10" y1="35" x2="10" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" strokeDasharray="2 6" />
      
      <line x1="25" y1="15" x2="25" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" strokeDasharray="8 4 2 4" />
      
      <line x1="40" y1="5" x2="40" y2="45" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" strokeDasharray="6 2 2 2" />
      
      <line x1="55" y1="20" x2="55" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" strokeDasharray="3 3" />
      
      {/* Data nodes */}
      <rect x="8" y="28" width="4" height="4" fill={color} opacity="0.8" />
      <rect x="23" y="8" width="4" height="4" fill={color} opacity="0.9" />
      <rect x="38" y="50" width="4" height="4" fill={color} opacity="0.7" />
      <rect x="53" y="12" width="4" height="4" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoLens({ size = 70, color = '#9C27B0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer rim */}
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
      {/* Lens reflection/curvature */}
      <path d="M 12 18 A 20 20 0 0 1 42 18" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M 15 24 A 15 15 0 0 1 35 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.2" />
      {/* Crosshairs */}
      <line x1="30" y1="4" x2="30" y2="15" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <line x1="30" y1="45" x2="30" y2="56" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <line x1="4" y1="30" x2="15" y2="30" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <line x1="45" y1="30" x2="56" y2="30" stroke={color} strokeWidth="1.5" opacity="0.8" />
      {/* Central focus */}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.9" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'sistema-atlas': [DecoRadar, DecoSatellite, DecoDataStream],
  'deteccion-automatica': [DecoDataStream, DecoAlert, DecoLens],
  'candidatos-interestelares': [DecoRadar, DecoLens, DecoAlert],
  'falsos-positivos': [DecoAlert, DecoDataStream, DecoLens],
  'velocidad-deteccion': [DecoRadar, DecoAlert, DecoDataStream],
  'lsst-vera-rubin': [DecoLens, DecoSatellite, DecoRadar],
  'red-global-vigilancia': [DecoSatellite, DecoDataStream, DecoAlert],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Tonry, J.L. et al. (2018). "ATLAS: A High-Cadence All-Sky Survey System", PASP, 130',
  'Ivezić, Ž. et al. (2019). "LSST: From Science Drivers to Reference Design", ApJ, 873',
  'Engelhardt, T. et al. (2017). "An Observational Upper Limit on the Interstellar Number Density of Asteroids and Comets", AJ, 153',
  'Trilling, D. et al. (2017). "Implications for Planetary System Formation from Interstellar Object 1I/2017 U1", ApJ Letters, 850',
  'Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'sistema-atlas',
    title: 'El Sistema ATLAS',
    color: '#66BB6A',
    btnImage: '/assets/interestelar/infographic_m4/btn_sistema-atlas.jpg',
    image: '/assets/interestelar/infographic_m4/hero_sistema-atlas.jpg',
    content: [
      'Imagina que tienes la tarea de vigilar todo el cielo nocturno en busca de intrusos diminutos. Eso es exactamente lo que hace el Sistema de Última Alerta de Impacto Terrestre de Asteroides (ATLAS). Financiado por la NASA y operado por la Universidad de Hawái, actúa como una patrulla fronteriza cósmica incansable. Originalmente fue diseñado para advertirnos sobre asteroides que se dirigen hacia la Tierra, dándonos tiempo para prepararnos, pero se ha convertido en una herramienta invaluable para detectar visitantes de otros sistemas estelares.',
      'El sistema está compuesto por cuatro telescopios estratégicamente ubicados alrededor del mundo: dos en las islas de Hawái (Haleakalā y Maunaloa), uno en el Observatorio de El Sauce en Chile y uno más en la Estación de Observación de Sutherland en Sudáfrica. Esta distribución global no es accidental. Al tener telescopios en ambos hemisferios y en diferentes husos horarios, ATLAS puede vigilar el cielo casi continuamente, reduciendo los puntos ciegos donde un objeto rápido podría esconderse de nuestra vista.',
      'A diferencia de los grandes telescopios que hacen un zoom profundo en una pequeña porción del espacio —como mirar por el ojo de una cerradura—, ATLAS tiene una vista panorámica extrema. Utiliza lentes especiales gran angular y sensores de imagen masivos de 100 megapíxeles. Cada exposición captura una porción del cielo unas 100 veces más grande que la luna llena. Gracias a este inmenso campo de visión, todo el sistema puede escanear la totalidad del cielo nocturno visible cada 24 horas, no se le escapa casi nada.',
      'El secreto de su éxito es la cadencia: la rapidez con la que vuelve a observar la misma región del espacio. ATLAS toma cuatro exposiciones de cada zona del cielo en una noche, separadas por unos minutos. Esto es fundamental porque las estrellas lejanas se ven fijas, pero los objetos cercanos en el sistema solar (o los interestelares) se moverán entre una foto y otra. Es como tomar fotografías en ráfaga; si algo se mueve de un cuadro al siguiente, el sistema sabe de inmediato que es algo local o un visitante veloz.',
      'Esta increíble capacidad de escaneo constante significa que ATLAS genera cantidades masivas de datos cada noche. Los observatorios envían terabytes de imágenes a los centros de procesamiento. Hasta la fecha, ATLAS ha descubierto cientos de cometas y miles de asteroides cercanos a la Tierra, pero su joya de la corona es ser uno de los sistemas con mayor probabilidad de interceptar el fugaz paso de objetos que viajan a velocidades de escape solar, es decir, objetos interestelares.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema ATLAS no solo busca asteroides. Su vigilancia constante del cielo le permite detectar otros eventos transitorios asombrosos, como explosiones de supernovas en galaxias lejanas, estrellas variables que cambian su brillo de repente, e incluso destellos ópticos asociados a colisiones de estrellas de neutrones. ¡Es verdaderamente una cámara de seguridad para todo el universo visible desde la Tierra!' },
      { label: 'Ingeniería Asombrosa', icon: 'zap', text: 'Cada uno de los cuatro telescopios de ATLAS tiene un espejo primario de solo 50 centímetros de diámetro. Para los estándares astronómicos modernos, esto es pequeñísimo (el telescopio espacial Hubble mide 2.4 metros). Sin embargo, su diseño óptico único y sus gigantescos sensores CCD permiten que estos pequeños telescopios superen en rendimiento a máquinas mucho más grandes cuando se trata de escanear áreas masivas del cielo rápidamente.' }
    ],
    fact: 'El sistema ATLAS fue el responsable de descubrir el asombroso cometa C/2019 Y4 (ATLAS), que prometía ser un espectáculo brillante en 2020 antes de fragmentarse, y ha demostrado repetidamente su capacidad al detectar pequeños asteroides (como 2019 MO) ¡apenas horas antes de que impactaran inofensivamente en la atmósfera terrestre!',
  },
  {
    id: 'deteccion-automatica',
    title: 'Detección Automática',
    color: '#F44336',
    btnImage: '/assets/interestelar/infographic_m4/btn_deteccion-automatica.jpg',
    image: '/assets/interestelar/infographic_m4/hero_deteccion-automatica.jpg',
    content: [
      'Capturar millones de imágenes del cielo nocturno es solo la mitad del trabajo; la verdadera magia ocurre en el procesamiento de esos datos. Antiguamente, los astrónomos tenían que usar un "microscopio de parpadeo" (blink comparator) para mirar alternadamente dos fotos del mismo pedazo de cielo e intentar notar si algún puntito cambiaba de posición, un trabajo increíblemente tedioso y lento. Hoy, las computadoras hacen este trabajo, pero el desafío es hercúleo debido a la inmensa cantidad de información.',
      'El software de ATLAS actúa como un tamiz ultra eficiente. Primero, alinea las imágenes de la misma zona tomadas con minutos de diferencia y resta matemáticamente la primera de la segunda. Las estrellas estáticas desaparecen de la imagen resultante, pero cualquier cosa que se haya movido o cambiado de brillo deja una marca. A esto se le llama "sustracción de imágenes", y es el paso fundamental para encontrar agujas (asteroides) en un pajar cósmico lleno de miles de millones de estrellas.',
      'Sin embargo, esta resta matemática no es perfecta. El ruido del sensor de la cámara, los rayos cósmicos (partículas subatómicas que golpean la lente), los satélites de Starlink y los reflejos de luz pueden crear "falsas alarmas" que parecen objetos en movimiento. Cada noche, los telescopios ATLAS generan entre 10 y 100 millones de detecciones, de las cuales el 99.9% son basura cósmica digital. Aquí es donde entra en juego la inteligencia artificial para salvar la noche y evitar que los humanos se vuelvan locos revisando fotos.',
      'Los algoritmos de aprendizaje automático (Machine Learning) de ATLAS han sido entrenados con millones de ejemplos de asteroides reales y artefactos falsos. Estos programas evalúan docenas de parámetros en microsegundos: la forma del punto de luz, cómo varía su brillo, su velocidad aparente y su trayectoria. Actúan como un portero de discoteca implacable, filtrando millones de señales dudosas y dejando pasar solo unos pocos miles de candidatos genuinos que merecen la atención de un astrónomo humano.',
      'Cuando el software detecta un objeto que se mueve a una velocidad inusualmente alta o en una trayectoria extraña —como cayendo desde arriba o abajo del plano del sistema solar—, hace saltar las alarmas de inmediato. Los objetos interestelares como \'Oumuamua se mueven tan rápido que a veces no dejan un simple punto en la imagen, sino una raya alargada. El software moderno está diseñado específicamente para detectar estos trazos rápidos antes de que el objeto desaparezca para siempre en la oscuridad.'
    ],
    expandables: [
      { label: 'El Desafío de Starlink', icon: 'zap', text: 'Con el lanzamiento masivo de megaconstelaciones de satélites como Starlink, la astronomía de sondeo enfrenta un problema enorme. Estos satélites dejan brillantes rayas blancas que arruinan las exposiciones y confunden a los algoritmos antiguos. Los sistemas como ATLAS han tenido que actualizar urgentemente sus algoritmos de Machine Learning para reconocer y borrar específicamente los rastros de estos satélites de las imágenes científicas.' },
      { label: '¿Qué es el Streak Detection?', icon: 'atom', text: 'El "Streak Detection" (detección de trazos) es una técnica matemática especializada. Mientras los asteroides lentos se ven como puntos que saltan, los objetos muy cercanos o los interestelares súper veloces cruzan el campo de visión de la cámara durante los 30 segundos de exposición. En la foto no sale un punto, sale una línea. Los nuevos algoritmos buscan líneas que no coincidan con las trayectorias conocidas de satélites o meteoros terrestres.' }
    ],
    fact: 'El astrónomo Clyde Tombaugh descubrió Plutón en 1930 usando un microscopio de parpadeo manual, pasando casi un año entero de su vida revisando placas fotográficas una por una. Hoy en día, los algoritmos de Machine Learning de ATLAS procesan una cantidad de datos equivalente a la búsqueda de Tombaugh... ¡cada 5 minutos de funcionamiento normal!',
  },
  {
    id: 'candidatos-interestelares',
    title: 'Candidatos a 3I',
    color: '#FF9800',
    btnImage: '/assets/interestelar/infographic_m4/btn_candidatos-interestelares.jpg',
    image: '/assets/interestelar/infographic_m4/hero_candidatos-interestelares.jpg',
    content: [
      'Desde la visita confirmada de \'Oumuamua (1I) y el cometa Borisov (2I), la caza del tercer objeto interestelar (3I) se ha convertido en una de las prioridades más candentes de la astronomía moderna. Cada mes, los sistemas de vigilancia como ATLAS marcan varios "candidatos" iniciales. Un candidato a interestelar es simplemente cualquier roca espacial recién detectada cuya órbita parece no estar atada a la gravedad de nuestro sol. Pero proclamar que algo es "extraterrestre" requiere pruebas irrefutables.',
      'La clave matemática para confirmar el origen interestelar es la excentricidad de la órbita (e). Las órbitas de los planetas son casi circulares (e cerca de 0). Los cometas tienen órbitas muy estiradas, elípticas (e entre 0.5 y 0.99), pero siguen atrapados por el Sol. Si un objeto tiene una excentricidad mayor a 1 (e > 1), significa que su trayectoria es una hipérbola abierta. Viene desde el espacio profundo, da un giro rápido alrededor del Sol, y sale disparado para no volver jamás.',
      'El problema es que calcular la órbita exacta de un objeto recién descubierto, basándose solo en unos pocos puntos de luz difusos tomados durante un par de noches, tiene un margen de error enorme. Es como intentar adivinar la trayectoria completa de un avión viéndolo solo durante una fracción de segundo a través de una ventana empañada. Al principio, un asteroide normal de nuestro sistema solar puede parecer que tiene una trayectoria hiperbólica (e > 1) simplemente por el error de medición en las imágenes.',
      'Por esta razón, la comunidad astronómica mantiene una estricta cautela. Cuando se anuncia un candidato con órbita hiperbólica en la página del Minor Planet Center, los telescopios de todo el mundo entran en un frenesí para obtener más observaciones. Se necesitan semanas de seguimiento preciso para refinar el cálculo orbital. En la inmensa mayoría de los casos, a medida que llegan más datos, la órbita estimada se "relaja" y resulta ser un simple cometa del sistema solar con una excentricidad de 0.99 (casi hiperbólica, pero aún elíptica).',
      'Confirmar al esquivo 3I es crucial porque cada objeto interestelar es una cápsula del tiempo intacta de otro sistema planetario. Estudiar su composición química y su forma nos diría cómo se forman los planetas alrededor de otras estrellas. Sabemos estadísticamente que nuestro sistema solar debe estar atravesado por miles de estos objetos diminutos en todo momento; el reto monumental es encontrarlos, medir su órbita con precisión absoluta y apuntar nuestros grandes telescopios antes de que se alejen.'
    ],
    expandables: [
      { label: 'El Cementerio de Candidatos', icon: 'clock', text: 'Existe un "cementerio" no oficial de candidatos a objetos interestelares. Ejemplos famosos como A/2017 U7 o el cometa C/2018 C2 fueron inicialmente anunciados con gran emoción por tener trayectorias fuertemente hiperbólicas (e > 1.01). Sin embargo, tras semanas de cuidadosas observaciones de seguimiento, se demostró que eran objetos de nuestra propia Nube de Oort en órbitas extremadamente alargadas (e = 0.999).' },
      { label: 'Más Allá de la Gravedad', icon: 'atom', text: 'A veces, la gravedad no es lo único que empuja a estos objetos. Cuando un cometa se acerca al sol, el hielo se evapora y crea chorros de gas que actúan como pequeños motores de cohete. Este efecto, llamado "aceleración no gravitacional", altera la órbita. Los astrónomos deben tener un cuidado extremo para no confundir la desviación causada por estos gases con una verdadera órbita hiperbólica interestelar.' }
    ],
    fact: 'El cometa 2I/Borisov fue confirmado como el segundo objeto interestelar porque su excentricidad era innegable. Mientras que los falsos positivos suelen tener excentricidades de 1.001 a 1.05 (que luego se corrigen a menos de 1), Borisov tenía una asombrosa excentricidad de 3.3. ¡Era matemáticamente imposible que perteneciera a nuestro sol!',
  },
  {
    id: 'falsos-positivos',
    title: 'Falsos Positivos: Las Trampas de Júpiter',
    color: '#00ACC1',
    btnImage: '/assets/interestelar/infographic_m4/btn_falsos-positivos.jpg',
    image: '/assets/interestelar/infographic_m4/hero_falsos-positivos.jpg',
    content: [
      'No todo lo que tiene una trayectoria de escape viene de las estrellas lejanas. Existe un fenómeno engañoso en el sistema solar que puede disfrazar a un cometa local como un visitante interestelar. La principal causa de estos engaños cósmicos es el gigante gaseoso Júpiter. Su gravedad es tan colosal que actúa como un inmenso trampolín gravitacional para las rocas de hielo que se acercan demasiado, arruinando los cálculos iniciales de los astrónomos.',
      'La Nube de Oort es una enorme esfera de cometas helados que rodea nuestro sistema solar a billones de kilómetros de distancia. Cuando uno de estos cometas es empujado hacia el sol, viaja en una órbita extremadamente larga pero cerrada (elíptica). Sin embargo, si durante su viaje hacia nosotros pasa relativamente cerca de Júpiter o Saturno, la gravedad de estos planetas gigantes puede acelerarlo como una honda (asistencia gravitatoria).',
      'Si el cometa gana suficiente velocidad extra durante este encuentro planetario, su velocidad total puede superar la velocidad de escape del sol. Su órbita original cerrada se rompe y se convierte en una hipérbola abierta. A partir de ese momento, el objeto abandonará el sistema solar para siempre. Si los telescopios de la Tierra lo descubren DESPUÉS de ese encuentro gravitacional, su órbita parece interestelar, aunque en realidad nació en nuestro propio patio trasero.',
      'A estos objetos se les llama "falsos positivos dinámicos". Para desenmascararlos, los astrónomos tienen que usar supercomputadoras para rebobinar el tiempo. Calculan la trayectoria del objeto hacia atrás, mes a mes, año a año, teniendo en cuenta la posición de todos los planetas del sistema solar en el pasado. Si la simulación muestra que el objeto pasó peligrosamente cerca de Júpiter hace unos años, se confirma que fue acelerado localmente y pierde su estatus de interestelar.',
      'Un ejemplo de órbitas extremas que retan nuestra comprensión son los objetos transneptunianos como Sedna. Sedna tiene una órbita tan estirada que tarda 11,400 años en dar una vuelta al sol, llevándolo mucho más lejos que Plutón. Su órbita es un misterio porque no se acerca lo suficiente a Neptuno para ser perturbado. Algunos astrónomos especulan que su extraña trayectoria podría ser el resultado del paso cercano de una estrella alienígena hace miles de millones de años, un recordatorio de que nuestro vecindario galáctico es un lugar muy interactivo.'
    ],
    expandables: [
      { label: 'El Efecto Honda', icon: 'zap', text: 'Las agencias espaciales usan intencionalmente la asistencia gravitacional de Júpiter para lanzar sondas como las Voyager o New Horizons fuera del sistema solar sin gastar combustible extra. ¡El universo hace lo mismo con los cometas de forma natural! Un encuentro cercano con Júpiter puede inyectar tanta energía en un cometa de la Nube de Oort que lo expulsa para siempre a vagar por la Vía Láctea.' },
      { label: 'Rebobinando el Reloj', icon: 'clock', text: 'El software que rebobina las trayectorias se conoce como "integrador de N-cuerpos". Las matemáticas involucradas son caóticas; un minúsculo error en la medición de la posición actual del asteroide se magnifica exponencialmente al simular millones de años hacia el pasado. Por eso, determinar el verdadero origen a largo plazo de un objeto requiere meses de las observaciones más precisas posibles.' }
    ],
    fact: 'El cometa C/1980 E1 (Bowell) es el ejemplo perfecto de un falso positivo. Actualmente está escapando del sistema solar en una trayectoria hiperbólica con una excentricidad de 1.05. Pero no es interestelar: rebobinando su órbita, los científicos descubrieron que en diciembre de 1980 pasó a solo 34 millones de kilómetros de Júpiter, quien lo expulsó violentamente como una resortera.',
  },
  {
    id: 'velocidad-deteccion',
    title: 'La Necesidad de Velocidad',
    color: '#9C27B0',
    btnImage: '/assets/interestelar/infographic_m4/btn_velocidad-deteccion.jpg',
    image: '/assets/interestelar/infographic_m4/hero_velocidad-deteccion.jpg',
    content: [
      'En el estudio de los objetos interestelares, el tiempo es el recurso más escaso y valioso. Estos visitantes cósmicos viajan a velocidades demenciales. \'Oumuamua, por ejemplo, entró al sistema solar a 26 kilómetros por segundo (93,600 km/h) e incrementó su velocidad masivamente a medida que caía hacia el pozo gravitacional del Sol, alcanzando los impresionantes 87.7 kilómetros por segundo en su máxima aproximación.',
      'Debido a esta velocidad vertiginosa, no se quedan mucho tiempo. Cruzan la región interior del sistema solar —la zona donde los telescopios terrestres tienen oportunidad de verlos porque están lo suficientemente cerca y cálidos para brillar— en cuestión de semanas o unos pocos meses. Si un telescopio de rastreo no escanea el cielo exacto en el momento justo, el objeto se desvanecerá en la negrura del espacio profundo antes de que sepamos que estuvo aquí.',
      'El desafío no termina con la detección; en realidad, apenas comienza. Una vez que un sistema como ATLAS detecta un posible candidato hiperbólico, debe alertar inmediatamente a la comunidad astronómica mundial. Los astrónomos tienen solo días, a veces horas, para interrumpir las agendas programadas de los telescopios gigantes más potentes del mundo, como el Keck en Hawái o el Very Large Telescope (VLT) en Chile, y apuntarlos hacia el fugitivo visitante.',
      'Es una carrera frenética contra la geometría y la física. A medida que el objeto se aleja del Sol y de la Tierra, se vuelve exponencialmente más tenue. Un objeto que hoy requiere un telescopio mediano para ser visto, mañana requerirá un telescopio gigante, y la semana que viene será invisible incluso para el Telescopio Espacial James Webb. Si no logramos tomar su espectro de luz (su huella dactilar química) en esa ventana crítica, perderemos para siempre la oportunidad de saber de qué estaba hecho.',
      'Esta necesidad de respuesta rápida ha impulsado la creación de protocolos de "Objetivos de Oportunidad" (ToO, por sus siglas en inglés) en los grandes observatorios. Los científicos que cazan objetos interestelares tienen permisos especiales para "secuestrar" tiempo de telescopio en medio de la noche. Cuando llega la alerta de un candidato creíble a 3I, pueden cancelar la observación de galaxias lejanas de otro investigador y apuntar el espejo gigante para captar al visitante antes de que cruce la frontera solar.'
    ],
    expandables: [
      { label: 'El Descubrimiento Tardío de \'Oumuamua', icon: 'clock', text: '\'Oumuamua fue descubierto el 19 de octubre de 2017 por el sistema Pan-STARRS. Sin embargo, los astrónomos se dieron cuenta con horror de que el objeto ya había pasado por su punto más cercano al Sol (el perihelio) 40 días antes, el 9 de septiembre, y ya estaba alejándose de la Tierra a toda velocidad. Tuvieron menos de tres semanas para estudiarlo antes de que fuera demasiado oscuro para detectarlo, perdiendo datos invaluables.' },
      { label: '¿Qué es la Espectroscopía?', icon: 'atom', text: 'Fotografiar el objeto no es suficiente; los científicos necesitan su espectro. Al pasar la débil luz del objeto a través de un prisma o rejilla (espectrógrafo), la luz se descompone en un arcoíris con líneas oscuras. Estas líneas actúan como un código de barras cuántico, revelando exactamente de qué elementos químicos y minerales está compuesto el objeto. Pero la espectroscopía requiere mucha más luz que una simple foto, por lo que el objeto debe estar muy cerca.' }
    ],
    fact: 'Si quisiéramos enviar una sonda espacial robótica para interceptar y estudiar de cerca al próximo objeto interestelar, tendríamos que diseñarla, construirla y tenerla esperando en el espacio, estacionada en órbita. Cuando se detecte 3I, el cohete interceptor tendría que encender sus motores en menos de 48 horas. Ese es el concepto detrás de la misión "Comet Interceptor" de la Agencia Espacial Europea.',
  },
  {
    id: 'lsst-vera-rubin',
    title: 'El Telescopio Vera Rubin',
    color: '#2196F3',
    btnImage: '/assets/interestelar/infographic_m4/btn_lsst-vera-rubin.jpg',
    image: '/assets/interestelar/infographic_m4/hero_lsst-vera-rubin.jpg',
    content: [
      'Si el sistema ATLAS es una eficiente cámara de seguridad, el Observatorio Vera C. Rubin, actualmente en construcción en el Cerro Pachón, Chile, será como tener el ojo omnisciente de un dios astronómico. Este colosal proyecto, que albergará la Investigación del Espacio y el Tiempo como Legado (LSST por sus siglas en inglés), está a punto de revolucionar completamente la forma en que detectamos objetos en movimiento, incluidos los visitantes interestelares.',
      'El corazón de este gigante es un asombroso espejo primario de 8.4 metros de diámetro. Para poner esto en perspectiva, es casi 17 veces más ancho que los espejos de ATLAS, lo que le permite recolectar mucha más luz y ver objetos increíblemente tenues. Pero lo que lo hace revolucionario no es solo su tamaño, sino su capacidad de observar grandes extensiones del cielo simultáneamente. Es el primer telescopio de clase mundial que combina una apertura gigante con un campo de visión masivo.',
      'La cámara del LSST es una obra maestra de la ingeniería humana. Con 3,200 megapíxeles (3.2 gigapíxeles), tiene aproximadamente el tamaño de un automóvil pequeño y es la cámara digital más grande jamás construida para la astronomía. Podrá fotografiar un área del cielo equivalente a 40 lunas llenas en una sola toma. Comenzando alrededor de 2025, el telescopio utilizará esta cámara para escanear todo el cielo visible del hemisferio sur cada tres o cuatro noches.',
      'Cada fotografía expondrá objetos un millón de veces más débiles que los que el ojo humano puede ver. El volumen de datos que generará es abrumador: 20 terabytes cada noche, sumando decenas de petabytes a lo largo de su misión de 10 años. Este diluvio de información será analizado en tiempo real por supercomputadoras. Si algo se mueve o cambia de brillo, el sistema LSST emitirá una alerta a la comunidad astronómica mundial en tan solo 60 segundos.',
      'Las predicciones teóricas son asombrosas. Basados en las detecciones de \'Oumuamua y Borisov, los astrónomos calculan que la inmensa sensibilidad y cobertura del Telescopio Vera Rubin debería permitir el descubrimiento de al menos un nuevo objeto interestelar cada año. El LSST no solo encontrará a 3I, sino a 4I, 5I y docenas más, pasando de avistamientos anecdóticos a un estudio estadístico robusto de la población interestelar que cruza nuestro sistema solar.'
    ],
    expandables: [
      { label: 'Un Espejo Extraño', icon: 'zap', text: 'El espejo de 8.4 metros del telescopio Rubin tiene un diseño sumamente inusual. No es un simple plato cóncavo; en realidad, los espejos primario y terciario están tallados en la misma y gigantesca pieza de vidrio fundido. Este diseño hiper-compacto permite que el telescopio sea más corto y rígido, lo que le ayuda a girar rápidamente de un lado a otro del cielo en solo 5 segundos para tomar la siguiente fotografía.' },
      { label: 'El Problema de los Datos', icon: 'atom', text: 'Procesar los datos del LSST es un desafío informático de escala global. El observatorio enviará su torrente de datos a través de cables de fibra óptica dedicados desde la cima de la montaña en Chile directamente a centros de supercomputación en Estados Unidos y Europa. Las alertas de 60 segundos permitirán que telescopios automatizados en todo el mundo apunten al instante hacia fenómenos de corta duración, como la aparición de un cometa interestelar rápido.' }
    ],
    fact: 'El observatorio lleva el nombre de Vera C. Rubin, la brillante astrónoma estadounidense que proporcionó la primera evidencia fuerte sobre la existencia de la materia oscura estudiando la rotación de las galaxias espirales. Es un homenaje apropiado para un telescopio que también estará dedicado a mapear la invisible red de materia oscura a través del universo profundo.',
  },
  {
    id: 'red-global-vigilancia',
    title: 'La Red Global de Vigilancia',
    color: '#FDD835',
    btnImage: '/assets/interestelar/infographic_m4/btn_red-global-vigilancia.jpg',
    image: '/assets/interestelar/infographic_m4/hero_red-global-vigilancia.jpg',
    content: [
      'Descubrir y confirmar objetos interestelares no es el trabajo de un solo genio solitario, es un triunfo de la colaboración internacional masiva. Cuando un sistema de rastreo como ATLAS o Pan-STARRS detecta algo extraño en el cielo, esa detección no se guarda en secreto, sino que se lanza inmediatamente a una vasta red de vigilancia cósmica interconectada. En el centro de esta red araña mundial se encuentra una institución histórica: el Centro de Planetas Menores (MPC).',
      'El Minor Planet Center, con sede en Massachusetts y operado bajo el auspicio de la Unión Astronómica Internacional (IAU), es la cámara de compensación oficial y el nodo central para todas las observaciones de asteroides y cometas del mundo. Cuando se detecta un posible nuevo objeto, el MPC publica sus coordenadas en la "Página de Confirmación de Objetos Cercanos a la Tierra" (NEOCP). Esta página pública es monitoreada compulsivamente por observatorios de todo el planeta, esperando la orden para entrar en acción.',
      'Al aparecer un candidato a interestelar en la NEOCP, ocurre un fascinante juego de relevos global. A medida que la Tierra gira y el objeto se oculta para los telescopios de Hawái, los observatorios de Australia o Japón toman el control para seguir rastreándolo. Luego, horas más tarde, los telescopios en Europa o Sudáfrica asumen la tarea. Esta cobertura de 24 horas y sin interrupciones geográficas es vital para calcular rápidamente una órbita precisa y descartar falsos positivos.',
      'Lo más hermoso de esta red es la democratización de la astronomía. No solo participan observatorios multimillonarios; la contribución de la "ciencia ciudadana" y los astrónomos aficionados avanzados es crucial. Personas con telescopios en sus patios traseros, equipados con cámaras CCD de alta precisión, contribuyen con miles de mediciones de posición al MPC cada año. De hecho, fue el astrónomo aficionado Gennadiy Borisov quien, con un telescopio construido por él mismo en Crimea, descubrió el segundo objeto interestelar.',
      'Esta sincronización global es lo que finalmente nos permitirá atrapar y estudiar a 3I. El futuro de la defensa planetaria y la exploración interestelar depende completamente de que las naciones y los científicos compartan sus datos de manera abierta e instantánea. La red de vigilancia nos recuerda que el cielo nocturno no tiene fronteras políticas, y que la búsqueda de nuestros orígenes cósmicos es un esfuerzo unificado de toda la especie humana.'
    ],
    expandables: [
      { label: 'El Papel de la Inteligencia Artificial', icon: 'zap', text: 'Para procesar las observaciones enviadas por observatorios de todo el mundo en tiempo real, el Minor Planet Center utiliza algoritmos de IA especializados. El software debe descartar rápidamente observaciones erróneas o "ruidosas", enlazar matemáticamente puntos de luz dispares tomados por diferentes telescopios y calcular una órbita unificada coherente. Este proceso de "vinculación orbital" computacional es una de las tareas matemáticas más pesadas de la astronomía.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cualquier persona puede revisar los datos del Centro de Planetas Menores. Las efemérides (las tablas que predicen dónde estará un objeto en el cielo en cualquier momento) son públicas y gratuitas. Muchas escuelas y programas educativos universitarios utilizan los datos en vivo del MPC para enseñar a los estudiantes cómo calcular órbitas usando las mismas matemáticas que formuló Isaac Newton hace siglos.' }
    ],
    fact: 'El astrónomo aficionado Gennadiy Borisov, descubridor del cometa interestelar 2I/Borisov, es un ingeniero óptico que diseña y pule sus propios espejos de telescopio de 65 centímetros a mano. Su descubrimiento en 2019 superó a todos los sistemas automatizados financiados con millones de dólares, demostrando que la dedicación humana y la pasión por observar el cielo siguen siendo irremplazables en la era de la IA.',
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '244,67,54' : '33,150,243', // red or blue
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

// ─── Themed Header ──────────────────────────────────────────────────────
function SurveillanceHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(244,67,54,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#alertGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 network markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#66BB6A','#F44336','#FF9800','#00ACC1','#9C27B0','#2196F3','#FDD835'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central radar icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F44336" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#F44336" opacity="0.5" />
        <path d="M 300 30 L 310 20" stroke="#F44336" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 300 30 L 300 16 A 14 14 0 0 1 310 20 Z" fill="#F44336" opacity="0.2" />
        <defs>
          <linearGradient id="alertGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(244,67,54,0.2)" />
            <stop offset="50%" stopColor="rgba(244,67,54,0.9)" />
            <stop offset="100%" stopColor="rgba(244,67,54,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F44336" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ATLAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(244,67,54,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA RED DE VIGILANCIA CÓSMICA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ──────────────────────────────────────────────────
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
          layoutId="activeDotInterestelarM4"
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

// ─── Expandable Section ────────────────────────────────────────────────────
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

// ─── Content Panel ────────────────────────────────────────────────────────
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

      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
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

      {/* Body */}
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

        {/* Expandables */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>
              <Star size={16} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* Fact Block */}
        {node.fact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: `linear-gradient(135deg, ${node.color}15, ${node.color}05)`,
              borderRadius: '16px',
              border: `1px solid ${node.color}40`,
              display: 'flex',
              gap: '1.2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: `0 0 15px ${node.color}50`,
            }}>
              <Sparkles size={20} color="#0B0E2D" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem', fontWeight: 800 }}>Dato Curioso</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographic_InterestelarM4() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!explored.has(id)) {
      setExplored(new Set(explored).add(id));
    }
  };

  const progress = Math.round((explored.size / INFOGRAPHIC_NODES.length) * 100);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      background: '#050714',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <TemporalField />
      
      <SurveillanceHeader />

      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '100px',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)',
      }}>
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

      <div style={{
        position: 'relative', zIndex: 2,
        height: '4px', background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px', overflow: 'hidden',
        marginBottom: '1rem',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `\${progress}%` }}
          style={{ height: '100%', background: '#F44336', boxShadow: '0 0 10px #F44336' }}
        />
      </div>
      <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
        Progreso de la misión: {progress}%
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

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        position: 'relative',
        zIndex: 2,
      }}>
        <h5 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.7)' }}>REFERENCIAS CIENTÍFICAS (MÓDULO 4)</h5>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i}>{ref}</li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
