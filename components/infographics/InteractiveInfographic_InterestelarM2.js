'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────

function DecoOumuamua({ size = 70, color = '#FFB74D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="5" fill="none" stroke={color} strokeWidth="2" transform="rotate(45 30 30)" />
      <path d="M15 15 Q25 10 45 45 Q35 50 15 15" fill={color} opacity="0.3" />
      <circle cx="25" cy="25" r="1.5" fill={color} opacity="0.6" />
      <circle cx="35" cy="35" r="2" fill={color} opacity="0.5" />
      <circle cx="30" cy="30" r="1" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#26A69A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="10,50 20,20 45,10 35,40" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="20" x2="15" y2="10" stroke={color} strokeWidth="1.5" />
      <line x1="45" y1="10" x2="55" y2="5" stroke={color} strokeWidth="1.5" />
      <circle cx="27" cy="30" r="4" fill={color} opacity="0.4" />
      <path d="M10 50 L5 60 M35 40 L40 60" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoOrbitPath({ size = 70, color = '#42A5F5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 5 55 Q 30 5 55 55" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="30" cy="18" r="3" fill={color} opacity="0.5" />
      <circle cx="15" cy="40" r="2" fill={color} opacity="0.7" />
      <circle cx="45" cy="40" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoStarField({ size = 70, color = '#FFC107', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {[...Array(8)].map((_, i) => (
        <circle key={i} cx={Math.random() * 60} cy={Math.random() * 60} r={Math.random() * 1.5 + 0.5} fill={color} opacity={Math.random() * 0.5 + 0.3} />
      ))}
      <path d="M30 10 L32 28 L50 30 L32 32 L30 50 L28 32 L10 30 L28 28 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSpectrum({ size = 70, color = '#AB47BC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 30 Q 15 10, 25 30 T 45 30 T 65 30" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M5 40 Q 15 20, 25 40 T 45 40 T 65 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="25" y1="10" x2="25" y2="50" stroke={color} strokeDasharray="2 2" />
      <line x1="45" y1="10" x2="45" y2="50" stroke={color} strokeDasharray="2 2" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-2017': [DecoTelescope, DecoStarField, DecoOrbitPath],
  'nombre-hawaiano': [DecoOumuamua, DecoStarField, DecoSpectrum],
  'forma-enigmatica': [DecoOumuamua, DecoSpectrum, DecoOrbitPath],
  'aceleracion-misteriosa': [DecoOrbitPath, DecoOumuamua, DecoStarField],
  'hipotesis-cientificas': [DecoSpectrum, DecoTelescope, DecoOumuamua],
  'composicion-superficie': [DecoSpectrum, DecoStarField, DecoOrbitPath],
  'legado-cientifico': [DecoTelescope, DecoOrbitPath, DecoStarField],
};

const BIBLIOGRAPHY = [
  'Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  'Loeb, A. (2021). Extraterrestrial: The First Sign of Intelligent Life Beyond Earth, Houghton Mifflin',
  'Desch, S. & Jackson, A. (2021). "1I/\'Oumuamua as an N2 ice fragment", Journal of Geophysical Research: Planets, 126',
  'Bannister, M. et al. (2017). "Col-OSSOS: Colors of the Interstellar Planetesimal 1I/\'Oumuamua", The Astrophysical Journal Letters, 851',
  'Seligman, D. et al. (2019). "On the anomalous acceleration of 1I/2017 U1 \'Oumuamua", The Astrophysical Journal Letters, 876'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'descubrimiento-2017',
    title: 'El Descubrimiento',
    color: '#FFB74D',
    btnImage: '/assets/interestelar/infographic_m2/btn_descubrimiento-2017.jpg',
    image: '/assets/interestelar/infographic_m2/hero_descubrimiento-2017.jpg',
    content: [
      'Imagina que estás en la playa observando las olas del mar, cuando de repente ves un barco de papel brillante pasar a toda velocidad. Sabes que todos los barcos en tu playa fueron hechos por los niños locales con papel periódico, pero este barco está hecho de un papel extraño y reluciente que nunca has visto. Esa fue exactamente la sensación que tuvieron los astrónomos el 19 de octubre de 2017, cuando el investigador Robert Weryk revisó las imágenes del telescopio.',
      'Weryk estaba trabajando con el observatorio Pan-STARRS1, que se encuentra en la cima del volcán Haleakala en la hermosa isla de Hawái. Este telescopio es como un vigilante gigante que escanea el cielo nocturno buscando rocas espaciales que se acerquen a la Tierra. Pero lo que Weryk encontró ese día no era una roca normal. Al principio, pensaron que era un cometa ordinario o un asteroide de nuestro propio sistema solar, de esos que dan vueltas alrededor de nuestro Sol.',
      'Sin embargo, cuando calcularon su trayectoria, se dieron cuenta de algo asombroso y sin precedentes. Piensa en lanzar una pelota de béisbol al aire: la gravedad de la Tierra siempre la hace caer de vuelta formando una curva cerrada. Los objetos de nuestro sistema solar hacen lo mismo alrededor del Sol en órbitas cerradas. Pero este objeto venía cayendo desde el espacio profundo a una velocidad increíble de 87 kilómetros por segundo, formando una trayectoria abierta llamada hipérbola.',
      'Esto significaba que el objeto viajaba tan rápido que la gravedad de nuestro inmenso Sol no era lo suficientemente fuerte como para atraparlo. Era un visitante fugaz que simplemente estaba pasando de largo por nuestro vecindario cósmico. Se había originado en algún lugar desconocido de la vasta galaxia, viajando a través de la oscuridad interestelar durante millones, tal vez miles de millones de años, antes de cruzar fugazmente nuestro pequeño sistema solar.',
      'El descubrimiento de este objeto fue un momento histórico que cambió la astronomía para siempre. Por primera vez en la historia de la humanidad, teníamos pruebas directas de que existen objetos rocosos vagando entre las estrellas, desconectados de cualquier estrella madre. Fue como encontrar un mensaje embotellado que había flotado a través del inmenso océano cósmico para llegar a nuestras costas por casualidad, abriendo una nueva era de exploración interestelar.'
    ],
    expandables: [
      { label: 'El Telescopio Pan-STARRS', icon: 'zap', text: 'El telescopio Pan-STARRS1 en Hawái tiene la cámara digital más grande del mundo, con 1.400 millones de píxeles. Es como si tuvieras 100 cámaras de teléfono inteligente combinadas en un solo lente gigante, diseñado específicamente para detectar objetos pequeños y rápidos que se mueven a través del cielo nocturno estrellado.' },
      { label: 'Velocidad Increíble', icon: 'clock', text: 'Para escapar de la gravedad del Sol, un objeto necesita viajar a una velocidad vertiginosa. Oumuamua pasó por el Sol a casi 315.000 kilómetros por hora. A esa velocidad, podrías viajar de la Tierra a la Luna en poco más de una hora, un viaje que a las naves espaciales Apolo les tomaba unos tres días completos.' }
    ],
    fact: 'El objeto fue descubierto en realidad 40 días DESPUÉS de haber pasado por su punto más cercano al Sol. Ya se estaba alejando de nosotros hacia las frías profundidades del espacio, lo que significó que los astrónomos tuvieron muy poco tiempo, solo unas pocas semanas, para apuntar todos los telescopios de la Tierra hacia él antes de que se volviera demasiado tenue y pequeño para ser visto jamás.'
  },
  {
    id: 'nombre-hawaiano',
    title: 'El Nombre Hawaiano',
    color: '#EF5350',
    btnImage: '/assets/interestelar/infographic_m2/btn_nombre-hawaiano.jpg',
    image: '/assets/interestelar/infographic_m2/hero_nombre-hawaiano.jpg',
    content: [
      'Cuando descubres algo nuevo en el espacio, tienes el honor y la responsabilidad de ponerle un nombre. Al principio, los científicos estaban muy confundidos sobre cómo clasificar a este extraño visitante. Le pusieron la etiqueta temporal C/2017 U1 pensando que era un cometa, pero como no tenía cola de polvo ni gas, lo cambiaron rápidamente a A/2017 U1 para indicar que era un asteroide seco y rocoso. Sin embargo, ni siquiera eso era correcto.',
      'Al darse cuenta de que este no era un asteroide normal de nuestro sistema solar, la Unión Astronómica Internacional (el grupo oficial que nombra las cosas en el espacio) tuvo que inventar una categoría completamente nueva. Crearon la designación "I" para "Interestelar". Así, el objeto fue nombrado oficialmente 1I/2017 U1. El "1I" significa que es el primer objeto interestelar jamás descubierto, marcando el inicio de una nueva lista en los libros de ciencia.',
      'Pero los números y letras son aburridos, así que el equipo que lo descubrió en Hawái quería un nombre especial que reflejara su origen extraordinario. Consultaron con expertos en lengua y cultura hawaiana y eligieron la palabra "Oumuamua" (se pronuncia oh-moo-ah-moo-ah). Este hermoso nombre tiene un significado muy profundo: "Ou" significa "alcanzar" y "mua" significa "primero" o "por adelantado".',
      'Juntos, se traduce libremente como "el primer mensajero que llega de lejos". Es una analogía poética y perfecta. Imagina a un explorador valiente que es enviado como avanzadilla por un ejército antiguo, corriendo por delante para entregar noticias importantes. Oumuamua es exactamente eso: un emisario silencioso enviado desde las profundidades inexploradas de la galaxia para saludarnos en nombre de un sistema estelar desconocido.',
      'El nombre también refleja el profundo respeto por la cultura hawaiana y la ubicación de los observatorios en montañas sagradas como Haleakala y Mauna Kea. Así como los antiguos navegantes polinesios leían las estrellas para cruzar el vasto Océano Pacífico, hoy los astrónomos en Hawái usan esas mismas montañas para navegar por el inmenso océano cósmico, conectando la antigua sabiduría con la astronomía moderna de manera poética.'
    ],
    expandables: [
      { label: 'Un Nombre, Muchas Pronunciaciones', icon: 'zap', text: 'La pronunciación correcta de Oumuamua incluye algo llamado "okina", que es una parada glotal (como la pequeña pausa en la palabra "uh-oh" en inglés). Se escribe con un apóstrofe al principio: \'Oumuamua. Muchos presentadores de noticias alrededor del mundo sufrieron y se trabaron la lengua tratando de pronunciarlo correctamente en 2017.' },
      { label: 'La Nueva Regla de Nombres', icon: 'atom', text: 'Gracias a Oumuamua, ahora existe una regla oficial para nombrar objetos interestelares. El segundo objeto de este tipo jamás descubierto, un cometa interestelar hallado en 2019, recibió la designación 2I/Borisov (por su descubridor). Ahora estamos esperando ansiosamente encontrar el 3I, el 4I y muchos más en los próximos años.' }
    ],
    fact: 'Antes de decidirse por el nombre hawaiano, el equipo de descubrimiento consideró llamar al objeto "Rama", en honor a una famosa novela de ciencia ficción del escritor Arthur C. Clarke llamada "Cita con Rama". En ese libro, un enorme objeto cilíndrico de origen alienígena entra en nuestro sistema solar. Al final, prefirieron un nombre que honrara a Hawái.'
  },
  {
    id: 'forma-enigmatica',
    title: 'La Forma Enigmática',
    color: '#AB47BC',
    btnImage: '/assets/interestelar/infographic_m2/btn_forma-enigmatica.jpg',
    image: '/assets/interestelar/infographic_m2/hero_forma-enigmatica.jpg',
    content: [
      'Si le pides a un niño que dibuje un asteroide, probablemente dibujará una roca redonda y grumosa, como una patata gigante o un trozo de carbón deforme. Eso es porque casi todos los asteroides en nuestro sistema solar se ven más o menos así. Pero cuando los astrónomos midieron la luz que reflejaba Oumuamua mientras giraba en el espacio, descubrieron que este visitante tenía una forma verdaderamente alucinante y extraña.',
      'Imagina tomar un faro de luz y apuntarlo a un objeto que da vueltas en la oscuridad. Si el objeto es redondo como una pelota, la cantidad de luz que refleja hacia ti se mantendrá más o menos constante. Pero la luz de Oumuamua parpadeaba dramáticamente, volviéndose 10 veces más brillante y luego muy tenue cada 7.3 horas. Esto solo podía significar una cosa: el objeto era extremadamente largo y delgado, girando de punta a punta como un bastón lanzado al aire.',
      'Los cálculos sugieren que Oumuamua es hasta diez veces más largo que ancho. Piensa en las proporciones de un pepino gigante, o más bien, en un puro cósmico o un enorme rascacielos flotando en el espacio vacío. Se estima que mide unos 230 metros de largo pero solo unos 35 metros de ancho y grosor. Ningún asteroide o cometa conocido en nuestro propio sistema solar tiene una forma tan radical y estirada.',
      '¿Cómo se formó algo tan extraño? Los científicos creen que Oumuamua podría haber nacido en un evento de destrucción cataclísmica. Imagina dos planetas rocosos chocando violentamente, o un planeta pequeño pasando demasiado cerca de su estrella, donde la intensa gravedad lo estiró y lo partió en pedazos como si fuera plastilina. Los fragmentos resultantes serían lanzados al espacio profundo a velocidades asombrosas, congelándose en formas alargadas para siempre.',
      'Otra teoría fascinante sugiere que Oumuamua no es como un cigarro, sino más bien como un panqueque cósmico o una moneda gigante. Los datos de luz también coinciden con un objeto muy plano y ovalado. Sea un cigarro o un panqueque, su forma extrema nos dice que las condiciones de su nacimiento en su sistema solar distante debieron ser increíblemente caóticas y violentas, muy diferentes a la forma tranquila en que se formaron nuestras rocas locales.'
    ],
    expandables: [
      { label: 'Rotación Caótica', icon: 'zap', text: 'Oumuamua no gira suavemente como un trompo bien equilibrado. En lugar de eso, está "dando volteretas" o cayendo de manera caótica (lo que en física se llama rotación no principal). Imagina lanzar un martillo por el aire; no gira solo en un eje, sino que se tambalea de manera compleja. Esto sugiere que sufrió un fuerte golpe en el pasado.' },
      { label: 'El Desafío de Verlo', icon: 'clock', text: 'Es importante entender que ningún telescopio logró tomar una fotografía real de la forma de Oumuamua. Era tan pequeño y estaba tan lejos que solo aparecía como un único punto de luz en las imágenes, un mero píxel. Toda su asombrosa forma alargada se dedujo como si fuéramos detectives, observando meticulosamente cómo cambiaba su brillo con el tiempo.' }
    ],
    fact: 'La forma de Oumuamua es tan inusual que supera los límites de lo que las rocas espaciales pueden soportar antes de romperse. Para evitar partirse en pedazos mientras da volteretas, la roca debe tener mucha cohesión estructural. Los científicos creen que debe ser bastante denso, posiblemente compuesto en gran parte por metales en lugar de hielo suave o polvo suelto.'
  },
  {
    id: 'aceleracion-misteriosa',
    title: 'Aceleración Misteriosa',
    color: '#26A69A',
    btnImage: '/assets/interestelar/infographic_m2/btn_aceleracion-misteriosa.jpg',
    image: '/assets/interestelar/infographic_m2/hero_aceleracion-misteriosa.jpg',
    content: [
      'Justo cuando los astrónomos pensaban que habían entendido a Oumuamua, el misterioso visitante lanzó la mayor sorpresa de todas. Imagina que lanzas una bola de boliche por el pasillo: la bola rodará y poco a poco irá frenando, siguiendo exactamente las leyes matemáticas del movimiento. Los planetas y asteroides hacen lo mismo en el espacio, moviéndose obedientemente según los tirones de la gravedad del Sol y los planetas.',
      'Pero Oumuamua no se comportó como una bola de boliche normal. Mientras se alejaba del Sol, los telescopios notaron que estaba acelerando, como si alguien hubiera pisado el acelerador en el espacio. No era un empujón enorme, sino una fuerza extra sutil y continua que empujaba al objeto, haciendo que se desviara ligeramente de la ruta que la gravedad dictaba. Este fenómeno se conoce como "aceleración no gravitacional".',
      'Normalmente, los cometas hacen esto todo el tiempo. Cuando un cometa se acerca al calor del Sol, el hielo en su interior se derrite y se convierte en gas. El gas sale disparado como el vapor de una tetera hirviendo, creando diminutos cohetes naturales que empujan al cometa y forman la hermosa cola brillante. A esto se le llama "desgasificación", y es la explicación estándar para las rocas espaciales que se desvían.',
      '¡Pero aquí está el misterio! Oumuamua no tenía absolutamente ninguna cola. Telescopios muy potentes como el Spitzer miraron con cuidado buscando cualquier rastro de gas, polvo o agua saliendo del objeto, y no encontraron nada. Era completamente invisible e indetectable. ¿Cómo podía algo estar actuando como un cohete sin tener fuego ni humo visible en el escape? Esto dejó a la comunidad científica rascándose la cabeza con total asombro.',
      'La misteriosa aceleración desató una tormenta de debates y teorías salvajes. Si no era un cometa normal soltando gas, ¿qué fuerza invisible lo estaba empujando hacia las estrellas? Las posibles respuestas iban desde efectos extraños de la radiación solar empujando contra su superficie inusual, hasta exóticos tipos de hielo que nuestros telescopios no pueden ver. ¡Fue este enigma el que hizo que Oumuamua fuera verdaderamente famoso mundialmente!'
    ],
    expandables: [
      { label: 'La Fuerza de la Luz', icon: 'zap', text: 'La luz del sol en realidad tiene fuerza física. Las partículas de luz (fotones) pueden empujar objetos como el viento empuja una cometa, un efecto llamado "presión de radiación". Algunos científicos sugirieron que Oumuamua era tan liviano y poroso (quizás como un copo de nieve gigante de polvo) que la simple luz solar era suficiente para empujarlo.' },
      { label: 'El Telescopio Infrarrojo Spitzer', icon: 'atom', text: 'El telescopio espacial Spitzer fue crucial en este misterio. Spitzer mira el universo en luz infrarroja (calor). Es perfecto para detectar gas y polvo cálido alrededor de los cometas. El hecho de que Spitzer observara a Oumuamua y no viera NADA fue la prueba definitiva de que este objeto no era un cometa típico de nuestro vecindario.' }
    ],
    fact: 'El cambio de velocidad de Oumuamua fue minúsculo en términos humanos: un aumento de apenas unas pocas milésimas de milímetro por segundo al cuadrado. Pero en la fría y precisa danza de la mecánica celeste a lo largo de millones de kilómetros, este pequeño empujón fue suficiente para desviar al objeto miles de kilómetros de la trayectoria gravitacional esperada, desatando el pánico calculador en los astrónomos.'
  },
  {
    id: 'hipotesis-cientificas',
    title: 'Las Hipótesis',
    color: '#42A5F5',
    btnImage: '/assets/interestelar/infographic_m2/btn_hipotesis-cientificas.jpg',
    image: '/assets/interestelar/infographic_m2/hero_hipotesis-cientificas.jpg',
    content: [
      'La extraña forma, la ausencia de cola y la misteriosa aceleración de Oumuamua crearon el escenario perfecto para un intenso debate científico. Piensa en los científicos como en un grupo de detectives de la policía intentando resolver el misterio del robo perfecto, donde no hay huellas ni cámaras de seguridad. Cada detective comenzó a presentar su propia teoría para explicar cómo sucedieron las cosas con nuestro visitante interestelar.',
      'La hipótesis más famosa y controvertida vino de Avi Loeb, un destacado profesor de astronomía en la Universidad de Harvard. Loeb sugirió algo sacado directamente de la ciencia ficción: ¿qué tal si Oumuamua es una nave espacial artificial? Argumentó que su forma plana y brillante y su aceleración sin gas podrían explicarse si fuera una "vela solar" muy delgada, construida por una civilización alienígena avanzada para navegar por la galaxia usando la luz estelar.',
      'Aunque la teoría alienígena cautivó al público y a los periódicos, la gran mayoría de la comunidad científica buscó respuestas naturales menos extremas. En 2021, los científicos Steven Desch y Alan Jackson propusieron una idea brillante: tal vez Oumuamua era un trozo de un planeta similar a Plutón en otro sistema estelar. Si el objeto estuviera hecho de nitrógeno sólido congelado, el calor del Sol derretiría el nitrógeno en un gas completamente transparente e invisible para los telescopios.',
      'Otra hipótesis popular sugiere que Oumuamua es un "iceberg de hidrógeno molecular". El hidrógeno puro y congelado solo existe en las regiones más frías y profundas de las nubes estelares en el espacio oscuro. Si un enorme bloque de hielo de hidrógeno fuera expulsado hacia nuestro sistema solar, también sublimaría gas invisible, dándole el empuje extra sin dejar rastro de polvo o agua. Sin embargo, algunos críticos dicen que un iceberg de hidrógeno se habría derretido mucho antes de llegar a nosotros.',
      'En 2023, otro equipo sugirió que Oumuamua era simplemente un cometa rico en agua, pero con un giro especial: los rayos cósmicos durante su largo viaje habían atrapado moléculas de gas hidrógeno dentro del hielo de agua. Al acercarse al Sol, este gas atrapado escaparía violentamente, dando el empuje mágico sin necesidad de vaporizar polvo visible. Como los grandes misterios, la ciencia avanza enfrentando estas diferentes hipótesis hasta encontrar la verdad.'
    ],
    expandables: [
      { label: 'La Navaja de Ockham', icon: 'zap', text: 'En la ciencia, se usa un principio llamado "La Navaja de Ockham", que dice que la explicación más simple suele ser la correcta. Mientras que la teoría de la nave espacial alienígena es emocionante, requiere suposiciones enormes y no probadas. Las teorías sobre hielos invisibles (nitrógeno o hidrógeno) son preferidas porque usan leyes de la física y química que ya conocemos.' },
      { label: 'El Efecto Yarkovsky', icon: 'atom', text: 'Los asteroides en nuestro propio sistema solar experimentan pequeñas aceleraciones debido al calor. Cuando un asteroide gira, absorbe luz solar en un lado y luego irradia ese calor al espacio a medida que gira. Esta pequeña emisión de calor actúa como un mini motor térmico (Efecto Yarkovsky). Pero los cálculos mostraron que este efecto no era lo suficientemente fuerte para explicar la alta aceleración de Oumuamua.' }
    ],
    fact: 'El profesor Avi Loeb estaba tan convencido de sus ideas sobre reliquias alienígenas interestelares que fundó el "Proyecto Galileo". Esta nueva iniciativa científica busca utilizar tecnología de inteligencia artificial de vanguardia y redes de telescopios globales para buscar sistemáticamente en nuestros cielos otros objetos que puedan ser tecnología construida por civilizaciones extraterrestres. El misterio continúa vivo.'
  },
  {
    id: 'composicion-superficie',
    title: 'Superficie y Composición',
    color: '#FF7043',
    btnImage: '/assets/interestelar/infographic_m2/btn_composicion-superficie.jpg',
    image: '/assets/interestelar/infographic_m2/hero_composicion-superficie.jpg',
    content: [
      'Si pudieras subirte a una nave espacial y aterrizar en la superficie de Oumuamua, ¿qué verías y tocarías? Como el objeto nunca emitió gas ni polvo que pudiéramos recolectar, los astrónomos tuvieron que usar una técnica llamada espectroscopia. Esto es como separar la luz del Sol en un arcoíris usando un prisma de cristal. Observando exactamente qué colores de luz absorbía y reflejaba la roca, pudieron intentar adivinar los materiales que la cubrían.',
      'La primera gran pista fue su color. Los datos revelaron que Oumuamua era de un color rojizo oscuro, muy parecido al barro seco o a un ladrillo viejo. Este color rojizo no fue una sorpresa total para los astrónomos. En nuestro propio sistema solar, los objetos muy fríos que orbitan lejos del Sol, más allá del planeta Neptuno (llamados Objetos Transneptunianos), también tienen este mismo tono rojizo característico en sus superficies congeladas y rocosas.',
      'Este color rojo espacial tiene un origen fascinante. Se crea cuando la materia orgánica rica en carbono (como las moléculas que componen los seres vivos, pero no vivas) es horneada implacablemente por fuertes rayos cósmicos y radiación ultravioleta durante millones de años en el vacío espacial. Imagina dejar una rebanada de pan en una tostadora muy lenta durante miles de siglos: la costra exterior se quema y se vuelve oscura, formando una capa gruesa y protectora llamada "tolinas".',
      'Esta costra oscura de tolinas es como un escudo térmico natural. Los científicos creen que Oumuamua podría tener un núcleo frío y rico en hielos cósmicos, pero su gruesa costra orgánica quemada era un excelente aislante. Cuando se acercó peligrosamente al ardiente calor de nuestro Sol, el escudo térmico rojizo protegió el interior helado, evitando que el hielo profundo se evaporara rápidamente, lo que explica por qué no vimos la gigantesca cola de un cometa normal.',
      'El análisis también confirmó lo que NO había en la superficie: los astrónomos no encontraron ninguna evidencia de hielo de agua, ni minerales silicatos comunes como los que forman la arena y las rocas en la Tierra. Todo lo que sabemos es que es un objeto envuelto en una coraza orgánica oscura, forjada en el fuego de la radiación interestelar, ofreciendo pistas invaluables sobre los materiales de construcción que abundan en las guarderías planetarias lejanas.'
    ],
    expandables: [
      { label: 'Espectroscopía', icon: 'zap', text: 'Cada material en el universo tiene una "huella digital" de luz única. Por ejemplo, el hierro refleja ciertas longitudes de onda, y el hielo refleja otras. Al estudiar el arcoíris de luz reflejada (el espectro), los astrónomos pueden saber de qué está hecha una estrella o un asteroide sin tener que viajar millones de kilómetros para tocarlo.' },
      { label: 'Un Viaje Violento', icon: 'clock', text: 'El color oscuro también indica que Oumuamua ha tenido un viaje extremadamente largo y duro. Se estima que ha estado viajando por la Vía Láctea, bañado en radiación cósmica letal, durante al menos decenas de millones de años, tal vez incluso miles de millones, sin ver de cerca una estrella caliente hasta que encontró nuestro Sol.' }
    ],
    fact: 'El albedo de Oumuamua (una medida de cuán brillante y reflectante es una superficie) es muy bajo. Refleja aproximadamente el mismo porcentaje de luz que un trozo de carbón muy oscuro recién extraído de la mina. Esto hizo que fuera aún más difícil de detectar contra la inmensa oscuridad del cielo nocturno, probando lo afortunados que fuimos de verlo.'
  },
  {
    id: 'legado-cientifico',
    title: 'El Legado Científico',
    color: '#FFC107',
    btnImage: '/assets/interestelar/infographic_m2/btn_legado-cientifico.jpg',
    image: '/assets/interestelar/infographic_m2/hero_legado-cientifico.jpg',
    content: [
      'La breve pero espectacular visita de Oumuamua duró solo unos pocos meses, pero las ondas de su descubrimiento cambiarán la ciencia para siempre. Imagina vivir toda tu vida creyendo que tu ciudad es la única en el mundo, y de repente, encuentras un billete de tren de un lugar desconocido con un idioma extraño tirado en la calle. Eso es lo que significó Oumuamua: una prueba tangible, dura y rocosa de que nuestro pequeño sistema solar está conectado con un vecindario galáctico mucho más grande.',
      'Antes de 2017, los científicos solo podían hacer teorías matemáticas y simulaciones en computadora sobre cómo los planetas en otras estrellas expulsaban restos rocosos al espacio. Calculaban que la galaxia debía estar llena de estos fragmentos errantes, pero nadie había visto uno. Oumuamua convirtió la teoría abstracta en una realidad física medible, dándonos un asiento de primera fila para estudiar los escombros de otros mundos lejanos.',
      'El mayor legado de Oumuamua fue enseñarnos cuán violentos son los nacimientos de los sistemas planetarios. Cuando planetas gigantes como Júpiter se forman alrededor de una estrella joven, su poderosa gravedad actúa como una honda titánica, lanzando miles de millones de cometas, rocas heladas y asteroides inadaptados al vacío interestelar para siempre. Oumuamua es uno de esos mundos huérfanos y perdidos, y nos muestra que este violento proceso de expulsión es común en toda la inmensa Vía Láctea.',
      'Este visitante también obligó a los astrónomos a mejorar drásticamente sus herramientas y estrategias. Inspiró la creación de nuevos telescopios gigantes, como el Observatorio Vera C. Rubin que se está construyendo actualmente en las montañas de Chile, el cual está diseñado específicamente para atrapar a los próximos visitantes interestelares mucho antes. Ya no estamos esperando con los ojos cerrados; ahora estamos buscando activamente.',
      'Finalmente, Oumuamua abrió una puerta de inspiración salvaje para las misiones espaciales del futuro. Grupos como el "Proyecto Lyra" ahora están trabajando seriamente en diseñar sondas súper rápidas que podrían perseguir e interceptar al próximo objeto interestelar que pase por aquí. Gracias al primer mensajero lejano, la humanidad ahora sueña audazmente con el día en que enviaremos nuestras propias naves espaciales para tocar una roca de las estrellas, completando el saludo cósmico.'
    ],
    expandables: [
      { label: 'El Segundo Visitante', icon: 'zap', text: 'Solo dos años después de Oumuamua, en 2019, un astrónomo aficionado llamado Gennadiy Borisov descubrió un SEGUNDO visitante interestelar. Esta vez, era claramente un cometa con una gran cola de gas y polvo, y lo llamaron 2I/Borisov. Esto probó definitivamente que Oumuamua no fue solo un milagro único e irrepetible.' },
      { label: 'Misiones de Intercepción', icon: 'atom', text: 'La Agencia Espacial Europea (ESA) ha aprobado una misión llamada "Comet Interceptor". Esta sonda espacial será lanzada y se "estacionará" en el espacio, esperando pacientemente como una araña en su tela. Si los telescopios detectan un nuevo objeto interestelar o un cometa prístino acercándose a la Tierra, la sonda se despertará para ir a su encuentro y tomar las primeras fotografías de cerca.' }
    ],
    fact: 'Se estima estadísticamente que en cualquier momento dado, hay alrededor de 10,000 objetos del tamaño de Oumuamua pasando invisiblemente dentro de la órbita del planeta Neptuno. Simplemente nunca los vemos porque son increíblemente oscuros, silenciosos y viajan a velocidades vertiginosamente rápidas a través de un espacio inmenso y vacío. El cielo está lleno de fantasmas estelares.'
  }
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
      hue: Math.random() > 0.5 ? '255,183,77' : '239,83,80', // amber or red
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

// ─── Interstellar Header ──────────────────────────────────────────────────────
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,183,77,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFB74D','#EF5350','#AB47BC','#26A69A','#42A5F5','#FF7043','#FFC107'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <path d="M 300 20 L 303 27 L 310 30 L 303 33 L 300 40 L 297 33 L 290 30 L 297 27 Z" fill="none" stroke="#FFB74D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="300" cy="30" r="2" fill="#FFB74D" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,183,77,0.2)" />
            <stop offset="50%" stopColor="rgba(255,183,77,0.9)" />
            <stop offset="100%" stopColor="rgba(255,183,77,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFB74D" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">OUMUAMUA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,183,77,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER MENSAJERO INTERESTELAR</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,183,77,0.2)'}`,
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
          layoutId="activeDotOumuamua"
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
            <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Explora Más Detalles
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fun Fact ─── */}
        {node.fact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              background: `linear-gradient(90deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              padding: '1.2rem 1.5rem',
              borderRadius: '0 12px 12px 0',
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
            }}
          >
            <Star style={{ color: node.color, flexShrink: 0, marginTop: '2px' }} size={24} />
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: node.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                Dato Curioso
              </span>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Progress Bar Component ────────────────────────────────────────────────
function ProgressBar({ nodes, exploredIds, onNodeClick }) {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Progreso de la Misión
        </h4>
        <div style={{ color: '#FFB74D', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {Math.round((exploredIds.size / nodes.length) * 100)}%
        </div>
      </div>
      <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {nodes.map((node, i) => {
          const isExplored = exploredIds.has(node.id);
          return (
            <button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              style={{
                position: 'absolute',
                left: `${(i / (nodes.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                width: '12px', height: '12px',
                borderRadius: '50%',
                background: isExplored ? node.color : 'rgba(255,255,255,0.2)',
                border: `2px solid ${isExplored ? '#0B0E2D' : 'transparent'}`,
                boxShadow: isExplored ? `0 0 10px ${node.color}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              title={node.title}
            />
          );
        })}
        {/* Fill bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          background: 'linear-gradient(90deg, #FFB74D, #EF5350, #AB47BC, #26A69A, #42A5F5, #FF7043, #FFC107)',
          width: `${((exploredIds.size === 0 ? 0 : Array.from(exploredIds).map(id => nodes.findIndex(n => n.id === id)).sort((a,b)=>b-a)[0]) / (nodes.length - 1)) * 100}%`,
          borderRadius: '2px',
          transition: 'width 0.5s ease',
          zIndex: 1,
        }} />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographic_InterestelarM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const containerRef = useRef(null);

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  const handleNodeClick = (id) => {
    setActiveNodeId((prev) => (prev === id ? null : id));
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#0B0E2D', // Deep space background
      color: 'white',
      padding: '3rem 1rem',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }} ref={containerRef}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
        <InterstellarHeader />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '3rem',
          padding: '0 1rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              index={idx}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onNodeClick={handleNodeClick} />

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
        <div style={{
          marginTop: '5rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes Científicas y Bibliografía
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#FFB74D', opacity: 0.7 }}>•</span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen a tamaño completo" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
