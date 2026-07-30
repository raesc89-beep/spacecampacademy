'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
      'Imagina que estÃ¡s en la playa observando las olas del mar, cuando de repente ves un barco de papel brillante pasar a toda velocidad. Sabes que todos los barcos en tu playa fueron hechos por los niÃ±os locales con papel periÃ³dico, pero este barco estÃ¡ hecho de un papel extraÃ±o y reluciente que nunca has visto. Esa fue exactamente la sensaciÃ³n que tuvieron los astrÃ³nomos el 19 de octubre de 2017, cuando el investigador Robert Weryk revisÃ³ las imÃ¡genes del telescopio.',
      'Weryk estaba trabajando con el observatorio Pan-STARRS1, que se encuentra en la cima del volcÃ¡n Haleakala en la hermosa isla de HawÃ¡i. Este telescopio es como un vigilante gigante que escanea el cielo nocturno buscando rocas espaciales que se acerquen a la Tierra. Pero lo que Weryk encontrÃ³ ese dÃ­a no era una roca normal. Al principio, pensaron que era un cometa ordinario o un asteroide de nuestro propio sistema solar, de esos que dan vueltas alrededor de nuestro Sol.',
      'Sin embargo, cuando calcularon su trayectoria, se dieron cuenta de algo asombroso y sin precedentes. Piensa en lanzar una pelota de bÃ©isbol al aire: la gravedad de la Tierra siempre la hace caer de vuelta formando una curva cerrada. Los objetos de nuestro sistema solar hacen lo mismo alrededor del Sol en Ã³rbitas cerradas. Pero este objeto venÃ­a cayendo desde el espacio profundo a una velocidad increÃ­ble de 87 kilÃ³metros por segundo, formando una trayectoria abierta llamada hipÃ©rbola.',
      'Esto significaba que el objeto viajaba tan rÃ¡pido que la gravedad de nuestro inmenso Sol no era lo suficientemente fuerte como para atraparlo. Era un visitante fugaz que simplemente estaba pasando de largo por nuestro vecindario cÃ³smico. Se habÃ­a originado en algÃºn lugar desconocido de la vasta galaxia, viajando a travÃ©s de la oscuridad interestelar durante millones, tal vez miles de millones de aÃ±os, antes de cruzar fugazmente nuestro pequeÃ±o sistema solar.',
      'El descubrimiento de este objeto fue un momento histÃ³rico que cambiÃ³ la astronomÃ­a para siempre. Por primera vez en la historia de la humanidad, tenÃ­amos pruebas directas de que existen objetos rocosos vagando entre las estrellas, desconectados de cualquier estrella madre. Fue como encontrar un mensaje embotellado que habÃ­a flotado a travÃ©s del inmenso ocÃ©ano cÃ³smico para llegar a nuestras costas por casualidad, abriendo una nueva era de exploraciÃ³n interestelar.'
    ],
    expandables: [
      { label: 'El Telescopio Pan-STARRS', icon: 'zap', text: 'El telescopio Pan-STARRS1 en HawÃ¡i tiene la cÃ¡mara digital mÃ¡s grande del mundo, con 1.400 millones de pÃ­xeles. Es como si tuvieras 100 cÃ¡maras de telÃ©fono inteligente combinadas en un solo lente gigante, diseÃ±ado especÃ­ficamente para detectar objetos pequeÃ±os y rÃ¡pidos que se mueven a travÃ©s del cielo nocturno estrellado.' },
      { label: 'Velocidad IncreÃ­ble', icon: 'clock', text: 'Para escapar de la gravedad del Sol, un objeto necesita viajar a una velocidad vertiginosa. Oumuamua pasÃ³ por el Sol a casi 315.000 kilÃ³metros por hora. A esa velocidad, podrÃ­as viajar de la Tierra a la Luna en poco mÃ¡s de una hora, un viaje que a las naves espaciales Apolo les tomaba unos tres dÃ­as completos.' }
    ],
    fact: 'El objeto fue descubierto en realidad 40 dÃ­as DESPUÃ‰S de haber pasado por su punto mÃ¡s cercano al Sol. Ya se estaba alejando de nosotros hacia las frÃ­as profundidades del espacio, lo que significÃ³ que los astrÃ³nomos tuvieron muy poco tiempo, solo unas pocas semanas, para apuntar todos los telescopios de la Tierra hacia Ã©l antes de que se volviera demasiado tenue y pequeÃ±o para ser visto jamÃ¡s.'
  },
  {
    id: 'nombre-hawaiano',
    title: 'El Nombre Hawaiano',
    color: '#EF5350',
    btnImage: '/assets/interestelar/infographic_m2/btn_nombre-hawaiano.jpg',
    image: '/assets/interestelar/infographic_m2/hero_nombre-hawaiano.jpg',
    content: [
      'Cuando descubres algo nuevo en el espacio, tienes el honor y la responsabilidad de ponerle un nombre. Al principio, los cientÃ­ficos estaban muy confundidos sobre cÃ³mo clasificar a este extraÃ±o visitante. Le pusieron la etiqueta temporal C/2017 U1 pensando que era un cometa, pero como no tenÃ­a cola de polvo ni gas, lo cambiaron rÃ¡pidamente a A/2017 U1 para indicar que era un asteroide seco y rocoso. Sin embargo, ni siquiera eso era correcto.',
      'Al darse cuenta de que este no era un asteroide normal de nuestro sistema solar, la UniÃ³n AstronÃ³mica Internacional (el grupo oficial que nombra las cosas en el espacio) tuvo que inventar una categorÃ­a completamente nueva. Crearon la designaciÃ³n "I" para "Interestelar". AsÃ­, el objeto fue nombrado oficialmente 1I/2017 U1. El "1I" significa que es el primer objeto interestelar jamÃ¡s descubierto, marcando el inicio de una nueva lista en los libros de ciencia.',
      'Pero los nÃºmeros y letras son aburridos, asÃ­ que el equipo que lo descubriÃ³ en HawÃ¡i querÃ­a un nombre especial que reflejara su origen extraordinario. Consultaron con expertos en lengua y cultura hawaiana y eligieron la palabra "Oumuamua" (se pronuncia oh-moo-ah-moo-ah). Este hermoso nombre tiene un significado muy profundo: "Ou" significa "alcanzar" y "mua" significa "primero" o "por adelantado".',
      'Juntos, se traduce libremente como "el primer mensajero que llega de lejos". Es una analogÃ­a poÃ©tica y perfecta. Imagina a un explorador valiente que es enviado como avanzadilla por un ejÃ©rcito antiguo, corriendo por delante para entregar noticias importantes. Oumuamua es exactamente eso: un emisario silencioso enviado desde las profundidades inexploradas de la galaxia para saludarnos en nombre de un sistema estelar desconocido.',
      'El nombre tambiÃ©n refleja el profundo respeto por la cultura hawaiana y la ubicaciÃ³n de los observatorios en montaÃ±as sagradas como Haleakala y Mauna Kea. AsÃ­ como los antiguos navegantes polinesios leÃ­an las estrellas para cruzar el vasto OcÃ©ano PacÃ­fico, hoy los astrÃ³nomos en HawÃ¡i usan esas mismas montaÃ±as para navegar por el inmenso ocÃ©ano cÃ³smico, conectando la antigua sabidurÃ­a con la astronomÃ­a moderna de manera poÃ©tica.'
    ],
    expandables: [
      { label: 'Un Nombre, Muchas Pronunciaciones', icon: 'zap', text: 'La pronunciaciÃ³n correcta de Oumuamua incluye algo llamado "okina", que es una parada glotal (como la pequeÃ±a pausa en la palabra "uh-oh" en inglÃ©s). Se escribe con un apÃ³strofe al principio: \'Oumuamua. Muchos presentadores de noticias alrededor del mundo sufrieron y se trabaron la lengua tratando de pronunciarlo correctamente en 2017.' },
      { label: 'La Nueva Regla de Nombres', icon: 'atom', text: 'Gracias a Oumuamua, ahora existe una regla oficial para nombrar objetos interestelares. El segundo objeto de este tipo jamÃ¡s descubierto, un cometa interestelar hallado en 2019, recibiÃ³ la designaciÃ³n 2I/Borisov (por su descubridor). Ahora estamos esperando ansiosamente encontrar el 3I, el 4I y muchos mÃ¡s en los prÃ³ximos aÃ±os.' }
    ],
    fact: 'Antes de decidirse por el nombre hawaiano, el equipo de descubrimiento considerÃ³ llamar al objeto "Rama", en honor a una famosa novela de ciencia ficciÃ³n del escritor Arthur C. Clarke llamada "Cita con Rama". En ese libro, un enorme objeto cilÃ­ndrico de origen alienÃ­gena entra en nuestro sistema solar. Al final, prefirieron un nombre que honrara a HawÃ¡i.'
  },
  {
    id: 'forma-enigmatica',
    title: 'La Forma EnigmÃ¡tica',
    color: '#AB47BC',
    btnImage: '/assets/interestelar/infographic_m2/btn_forma-enigmatica.jpg',
    image: '/assets/interestelar/infographic_m2/hero_forma-enigmatica.jpg',
    content: [
      'Si le pides a un niÃ±o que dibuje un asteroide, probablemente dibujarÃ¡ una roca redonda y grumosa, como una patata gigante o un trozo de carbÃ³n deforme. Eso es porque casi todos los asteroides en nuestro sistema solar se ven mÃ¡s o menos asÃ­. Pero cuando los astrÃ³nomos midieron la luz que reflejaba Oumuamua mientras giraba en el espacio, descubrieron que este visitante tenÃ­a una forma verdaderamente alucinante y extraÃ±a.',
      'Imagina tomar un faro de luz y apuntarlo a un objeto que da vueltas en la oscuridad. Si el objeto es redondo como una pelota, la cantidad de luz que refleja hacia ti se mantendrÃ¡ mÃ¡s o menos constante. Pero la luz de Oumuamua parpadeaba dramÃ¡ticamente, volviÃ©ndose 10 veces mÃ¡s brillante y luego muy tenue cada 7.3 horas. Esto solo podÃ­a significar una cosa: el objeto era extremadamente largo y delgado, girando de punta a punta como un bastÃ³n lanzado al aire.',
      'Los cÃ¡lculos sugieren que Oumuamua es hasta diez veces mÃ¡s largo que ancho. Piensa en las proporciones de un pepino gigante, o mÃ¡s bien, en un puro cÃ³smico o un enorme rascacielos flotando en el espacio vacÃ­o. Se estima que mide unos 230 metros de largo pero solo unos 35 metros de ancho y grosor. NingÃºn asteroide o cometa conocido en nuestro propio sistema solar tiene una forma tan radical y estirada.',
      'Â¿CÃ³mo se formÃ³ algo tan extraÃ±o? Los cientÃ­ficos creen que Oumuamua podrÃ­a haber nacido en un evento de destrucciÃ³n cataclÃ­smica. Imagina dos planetas rocosos chocando violentamente, o un planeta pequeÃ±o pasando demasiado cerca de su estrella, donde la intensa gravedad lo estirÃ³ y lo partiÃ³ en pedazos como si fuera plastilina. Los fragmentos resultantes serÃ­an lanzados al espacio profundo a velocidades asombrosas, congelÃ¡ndose en formas alargadas para siempre.',
      'Otra teorÃ­a fascinante sugiere que Oumuamua no es como un cigarro, sino mÃ¡s bien como un panqueque cÃ³smico o una moneda gigante. Los datos de luz tambiÃ©n coinciden con un objeto muy plano y ovalado. Sea un cigarro o un panqueque, su forma extrema nos dice que las condiciones de su nacimiento en su sistema solar distante debieron ser increÃ­blemente caÃ³ticas y violentas, muy diferentes a la forma tranquila en que se formaron nuestras rocas locales.'
    ],
    expandables: [
      { label: 'RotaciÃ³n CaÃ³tica', icon: 'zap', text: 'Oumuamua no gira suavemente como un trompo bien equilibrado. En lugar de eso, estÃ¡ "dando volteretas" o cayendo de manera caÃ³tica (lo que en fÃ­sica se llama rotaciÃ³n no principal). Imagina lanzar un martillo por el aire; no gira solo en un eje, sino que se tambalea de manera compleja. Esto sugiere que sufriÃ³ un fuerte golpe en el pasado.' },
      { label: 'El DesafÃ­o de Verlo', icon: 'clock', text: 'Es importante entender que ningÃºn telescopio logrÃ³ tomar una fotografÃ­a real de la forma de Oumuamua. Era tan pequeÃ±o y estaba tan lejos que solo aparecÃ­a como un Ãºnico punto de luz en las imÃ¡genes, un mero pÃ­xel. Toda su asombrosa forma alargada se dedujo como si fuÃ©ramos detectives, observando meticulosamente cÃ³mo cambiaba su brillo con el tiempo.' }
    ],
    fact: 'La forma de Oumuamua es tan inusual que supera los lÃ­mites de lo que las rocas espaciales pueden soportar antes de romperse. Para evitar partirse en pedazos mientras da volteretas, la roca debe tener mucha cohesiÃ³n estructural. Los cientÃ­ficos creen que debe ser bastante denso, posiblemente compuesto en gran parte por metales en lugar de hielo suave o polvo suelto.'
  },
  {
    id: 'aceleracion-misteriosa',
    title: 'AceleraciÃ³n Misteriosa',
    color: '#26A69A',
    btnImage: '/assets/interestelar/infographic_m2/btn_aceleracion-misteriosa.jpg',
    image: '/assets/interestelar/infographic_m2/hero_aceleracion-misteriosa.jpg',
    content: [
      'Justo cuando los astrÃ³nomos pensaban que habÃ­an entendido a Oumuamua, el misterioso visitante lanzÃ³ la mayor sorpresa de todas. Imagina que lanzas una bola de boliche por el pasillo: la bola rodarÃ¡ y poco a poco irÃ¡ frenando, siguiendo exactamente las leyes matemÃ¡ticas del movimiento. Los planetas y asteroides hacen lo mismo en el espacio, moviÃ©ndose obedientemente segÃºn los tirones de la gravedad del Sol y los planetas.',
      'Pero Oumuamua no se comportÃ³ como una bola de boliche normal. Mientras se alejaba del Sol, los telescopios notaron que estaba acelerando, como si alguien hubiera pisado el acelerador en el espacio. No era un empujÃ³n enorme, sino una fuerza extra sutil y continua que empujaba al objeto, haciendo que se desviara ligeramente de la ruta que la gravedad dictaba. Este fenÃ³meno se conoce como "aceleraciÃ³n no gravitacional".',
      'Normalmente, los cometas hacen esto todo el tiempo. Cuando un cometa se acerca al calor del Sol, el hielo en su interior se derrite y se convierte en gas. El gas sale disparado como el vapor de una tetera hirviendo, creando diminutos cohetes naturales que empujan al cometa y forman la hermosa cola brillante. A esto se le llama "desgasificaciÃ³n", y es la explicaciÃ³n estÃ¡ndar para las rocas espaciales que se desvÃ­an.',
      'Â¡Pero aquÃ­ estÃ¡ el misterio! Oumuamua no tenÃ­a absolutamente ninguna cola. Telescopios muy potentes como el Spitzer miraron con cuidado buscando cualquier rastro de gas, polvo o agua saliendo del objeto, y no encontraron nada. Era completamente invisible e indetectable. Â¿CÃ³mo podÃ­a algo estar actuando como un cohete sin tener fuego ni humo visible en el escape? Esto dejÃ³ a la comunidad cientÃ­fica rascÃ¡ndose la cabeza con total asombro.',
      'La misteriosa aceleraciÃ³n desatÃ³ una tormenta de debates y teorÃ­as salvajes. Si no era un cometa normal soltando gas, Â¿quÃ© fuerza invisible lo estaba empujando hacia las estrellas? Las posibles respuestas iban desde efectos extraÃ±os de la radiaciÃ³n solar empujando contra su superficie inusual, hasta exÃ³ticos tipos de hielo que nuestros telescopios no pueden ver. Â¡Fue este enigma el que hizo que Oumuamua fuera verdaderamente famoso mundialmente!'
    ],
    expandables: [
      { label: 'La Fuerza de la Luz', icon: 'zap', text: 'La luz del sol en realidad tiene fuerza fÃ­sica. Las partÃ­culas de luz (fotones) pueden empujar objetos como el viento empuja una cometa, un efecto llamado "presiÃ³n de radiaciÃ³n". Algunos cientÃ­ficos sugirieron que Oumuamua era tan liviano y poroso (quizÃ¡s como un copo de nieve gigante de polvo) que la simple luz solar era suficiente para empujarlo.' },
      { label: 'El Telescopio Infrarrojo Spitzer', icon: 'atom', text: 'El telescopio espacial Spitzer fue crucial en este misterio. Spitzer mira el universo en luz infrarroja (calor). Es perfecto para detectar gas y polvo cÃ¡lido alrededor de los cometas. El hecho de que Spitzer observara a Oumuamua y no viera NADA fue la prueba definitiva de que este objeto no era un cometa tÃ­pico de nuestro vecindario.' }
    ],
    fact: 'El cambio de velocidad de Oumuamua fue minÃºsculo en tÃ©rminos humanos: un aumento de apenas unas pocas milÃ©simas de milÃ­metro por segundo al cuadrado. Pero en la frÃ­a y precisa danza de la mecÃ¡nica celeste a lo largo de millones de kilÃ³metros, este pequeÃ±o empujÃ³n fue suficiente para desviar al objeto miles de kilÃ³metros de la trayectoria gravitacional esperada, desatando el pÃ¡nico calculador en los astrÃ³nomos.'
  },
  {
    id: 'hipotesis-cientificas',
    title: 'Las HipÃ³tesis',
    color: '#42A5F5',
    btnImage: '/assets/interestelar/infographic_m2/btn_hipotesis-cientificas.jpg',
    image: '/assets/interestelar/infographic_m2/hero_hipotesis-cientificas.jpg',
    content: [
      'La extraÃ±a forma, la ausencia de cola y la misteriosa aceleraciÃ³n de Oumuamua crearon el escenario perfecto para un intenso debate cientÃ­fico. Piensa en los cientÃ­ficos como en un grupo de detectives de la policÃ­a intentando resolver el misterio del robo perfecto, donde no hay huellas ni cÃ¡maras de seguridad. Cada detective comenzÃ³ a presentar su propia teorÃ­a para explicar cÃ³mo sucedieron las cosas con nuestro visitante interestelar.',
      'La hipÃ³tesis mÃ¡s famosa y controvertida vino de Avi Loeb, un destacado profesor de astronomÃ­a en la Universidad de Harvard. Loeb sugiriÃ³ algo sacado directamente de la ciencia ficciÃ³n: Â¿quÃ© tal si Oumuamua es una nave espacial artificial? ArgumentÃ³ que su forma plana y brillante y su aceleraciÃ³n sin gas podrÃ­an explicarse si fuera una "vela solar" muy delgada, construida por una civilizaciÃ³n alienÃ­gena avanzada para navegar por la galaxia usando la luz estelar.',
      'Aunque la teorÃ­a alienÃ­gena cautivÃ³ al pÃºblico y a los periÃ³dicos, la gran mayorÃ­a de la comunidad cientÃ­fica buscÃ³ respuestas naturales menos extremas. En 2021, los cientÃ­ficos Steven Desch y Alan Jackson propusieron una idea brillante: tal vez Oumuamua era un trozo de un planeta similar a PlutÃ³n en otro sistema estelar. Si el objeto estuviera hecho de nitrÃ³geno sÃ³lido congelado, el calor del Sol derretirÃ­a el nitrÃ³geno en un gas completamente transparente e invisible para los telescopios.',
      'Otra hipÃ³tesis popular sugiere que Oumuamua es un "iceberg de hidrÃ³geno molecular". El hidrÃ³geno puro y congelado solo existe en las regiones mÃ¡s frÃ­as y profundas de las nubes estelares en el espacio oscuro. Si un enorme bloque de hielo de hidrÃ³geno fuera expulsado hacia nuestro sistema solar, tambiÃ©n sublimarÃ­a gas invisible, dÃ¡ndole el empuje extra sin dejar rastro de polvo o agua. Sin embargo, algunos crÃ­ticos dicen que un iceberg de hidrÃ³geno se habrÃ­a derretido mucho antes de llegar a nosotros.',
      'En 2023, otro equipo sugiriÃ³ que Oumuamua era simplemente un cometa rico en agua, pero con un giro especial: los rayos cÃ³smicos durante su largo viaje habÃ­an atrapado molÃ©culas de gas hidrÃ³geno dentro del hielo de agua. Al acercarse al Sol, este gas atrapado escaparÃ­a violentamente, dando el empuje mÃ¡gico sin necesidad de vaporizar polvo visible. Como los grandes misterios, la ciencia avanza enfrentando estas diferentes hipÃ³tesis hasta encontrar la verdad.'
    ],
    expandables: [
      { label: 'La Navaja de Ockham', icon: 'zap', text: 'En la ciencia, se usa un principio llamado "La Navaja de Ockham", que dice que la explicaciÃ³n mÃ¡s simple suele ser la correcta. Mientras que la teorÃ­a de la nave espacial alienÃ­gena es emocionante, requiere suposiciones enormes y no probadas. Las teorÃ­as sobre hielos invisibles (nitrÃ³geno o hidrÃ³geno) son preferidas porque usan leyes de la fÃ­sica y quÃ­mica que ya conocemos.' },
      { label: 'El Efecto Yarkovsky', icon: 'atom', text: 'Los asteroides en nuestro propio sistema solar experimentan pequeÃ±as aceleraciones debido al calor. Cuando un asteroide gira, absorbe luz solar en un lado y luego irradia ese calor al espacio a medida que gira. Esta pequeÃ±a emisiÃ³n de calor actÃºa como un mini motor tÃ©rmico (Efecto Yarkovsky). Pero los cÃ¡lculos mostraron que este efecto no era lo suficientemente fuerte para explicar la alta aceleraciÃ³n de Oumuamua.' }
    ],
    fact: 'El profesor Avi Loeb estaba tan convencido de sus ideas sobre reliquias alienÃ­genas interestelares que fundÃ³ el "Proyecto Galileo". Esta nueva iniciativa cientÃ­fica busca utilizar tecnologÃ­a de inteligencia artificial de vanguardia y redes de telescopios globales para buscar sistemÃ¡ticamente en nuestros cielos otros objetos que puedan ser tecnologÃ­a construida por civilizaciones extraterrestres. El misterio continÃºa vivo.'
  },
  {
    id: 'composicion-superficie',
    title: 'Superficie y ComposiciÃ³n',
    color: '#FF7043',
    btnImage: '/assets/interestelar/infographic_m2/btn_composicion-superficie.jpg',
    image: '/assets/interestelar/infographic_m2/hero_composicion-superficie.jpg',
    content: [
      'Si pudieras subirte a una nave espacial y aterrizar en la superficie de Oumuamua, Â¿quÃ© verÃ­as y tocarÃ­as? Como el objeto nunca emitiÃ³ gas ni polvo que pudiÃ©ramos recolectar, los astrÃ³nomos tuvieron que usar una tÃ©cnica llamada espectroscopia. Esto es como separar la luz del Sol en un arcoÃ­ris usando un prisma de cristal. Observando exactamente quÃ© colores de luz absorbÃ­a y reflejaba la roca, pudieron intentar adivinar los materiales que la cubrÃ­an.',
      'La primera gran pista fue su color. Los datos revelaron que Oumuamua era de un color rojizo oscuro, muy parecido al barro seco o a un ladrillo viejo. Este color rojizo no fue una sorpresa total para los astrÃ³nomos. En nuestro propio sistema solar, los objetos muy frÃ­os que orbitan lejos del Sol, mÃ¡s allÃ¡ del planeta Neptuno (llamados Objetos Transneptunianos), tambiÃ©n tienen este mismo tono rojizo caracterÃ­stico en sus superficies congeladas y rocosas.',
      'Este color rojo espacial tiene un origen fascinante. Se crea cuando la materia orgÃ¡nica rica en carbono (como las molÃ©culas que componen los seres vivos, pero no vivas) es horneada implacablemente por fuertes rayos cÃ³smicos y radiaciÃ³n ultravioleta durante millones de aÃ±os en el vacÃ­o espacial. Imagina dejar una rebanada de pan en una tostadora muy lenta durante miles de siglos: la costra exterior se quema y se vuelve oscura, formando una capa gruesa y protectora llamada "tolinas".',
      'Esta costra oscura de tolinas es como un escudo tÃ©rmico natural. Los cientÃ­ficos creen que Oumuamua podrÃ­a tener un nÃºcleo frÃ­o y rico en hielos cÃ³smicos, pero su gruesa costra orgÃ¡nica quemada era un excelente aislante. Cuando se acercÃ³ peligrosamente al ardiente calor de nuestro Sol, el escudo tÃ©rmico rojizo protegiÃ³ el interior helado, evitando que el hielo profundo se evaporara rÃ¡pidamente, lo que explica por quÃ© no vimos la gigantesca cola de un cometa normal.',
      'El anÃ¡lisis tambiÃ©n confirmÃ³ lo que NO habÃ­a en la superficie: los astrÃ³nomos no encontraron ninguna evidencia de hielo de agua, ni minerales silicatos comunes como los que forman la arena y las rocas en la Tierra. Todo lo que sabemos es que es un objeto envuelto en una coraza orgÃ¡nica oscura, forjada en el fuego de la radiaciÃ³n interestelar, ofreciendo pistas invaluables sobre los materiales de construcciÃ³n que abundan en las guarderÃ­as planetarias lejanas.'
    ],
    expandables: [
      { label: 'EspectroscopÃ­a', icon: 'zap', text: 'Cada material en el universo tiene una "huella digital" de luz Ãºnica. Por ejemplo, el hierro refleja ciertas longitudes de onda, y el hielo refleja otras. Al estudiar el arcoÃ­ris de luz reflejada (el espectro), los astrÃ³nomos pueden saber de quÃ© estÃ¡ hecha una estrella o un asteroide sin tener que viajar millones de kilÃ³metros para tocarlo.' },
      { label: 'Un Viaje Violento', icon: 'clock', text: 'El color oscuro tambiÃ©n indica que Oumuamua ha tenido un viaje extremadamente largo y duro. Se estima que ha estado viajando por la VÃ­a LÃ¡ctea, baÃ±ado en radiaciÃ³n cÃ³smica letal, durante al menos decenas de millones de aÃ±os, tal vez incluso miles de millones, sin ver de cerca una estrella caliente hasta que encontrÃ³ nuestro Sol.' }
    ],
    fact: 'El albedo de Oumuamua (una medida de cuÃ¡n brillante y reflectante es una superficie) es muy bajo. Refleja aproximadamente el mismo porcentaje de luz que un trozo de carbÃ³n muy oscuro reciÃ©n extraÃ­do de la mina. Esto hizo que fuera aÃºn mÃ¡s difÃ­cil de detectar contra la inmensa oscuridad del cielo nocturno, probando lo afortunados que fuimos de verlo.'
  },
  {
    id: 'legado-cientifico',
    title: 'El Legado CientÃ­fico',
    color: '#FFC107',
    btnImage: '/assets/interestelar/infographic_m2/btn_legado-cientifico.jpg',
    image: '/assets/interestelar/infographic_m2/hero_legado-cientifico.jpg',
    content: [
      'La breve pero espectacular visita de Oumuamua durÃ³ solo unos pocos meses, pero las ondas de su descubrimiento cambiarÃ¡n la ciencia para siempre. Imagina vivir toda tu vida creyendo que tu ciudad es la Ãºnica en el mundo, y de repente, encuentras un billete de tren de un lugar desconocido con un idioma extraÃ±o tirado en la calle. Eso es lo que significÃ³ Oumuamua: una prueba tangible, dura y rocosa de que nuestro pequeÃ±o sistema solar estÃ¡ conectado con un vecindario galÃ¡ctico mucho mÃ¡s grande.',
      'Antes de 2017, los cientÃ­ficos solo podÃ­an hacer teorÃ­as matemÃ¡ticas y simulaciones en computadora sobre cÃ³mo los planetas en otras estrellas expulsaban restos rocosos al espacio. Calculaban que la galaxia debÃ­a estar llena de estos fragmentos errantes, pero nadie habÃ­a visto uno. Oumuamua convirtiÃ³ la teorÃ­a abstracta en una realidad fÃ­sica medible, dÃ¡ndonos un asiento de primera fila para estudiar los escombros de otros mundos lejanos.',
      'El mayor legado de Oumuamua fue enseÃ±arnos cuÃ¡n violentos son los nacimientos de los sistemas planetarios. Cuando planetas gigantes como JÃºpiter se forman alrededor de una estrella joven, su poderosa gravedad actÃºa como una honda titÃ¡nica, lanzando miles de millones de cometas, rocas heladas y asteroides inadaptados al vacÃ­o interestelar para siempre. Oumuamua es uno de esos mundos huÃ©rfanos y perdidos, y nos muestra que este violento proceso de expulsiÃ³n es comÃºn en toda la inmensa VÃ­a LÃ¡ctea.',
      'Este visitante tambiÃ©n obligÃ³ a los astrÃ³nomos a mejorar drÃ¡sticamente sus herramientas y estrategias. InspirÃ³ la creaciÃ³n de nuevos telescopios gigantes, como el Observatorio Vera C. Rubin que se estÃ¡ construyendo actualmente en las montaÃ±as de Chile, el cual estÃ¡ diseÃ±ado especÃ­ficamente para atrapar a los prÃ³ximos visitantes interestelares mucho antes. Ya no estamos esperando con los ojos cerrados; ahora estamos buscando activamente.',
      'Finalmente, Oumuamua abriÃ³ una puerta de inspiraciÃ³n salvaje para las misiones espaciales del futuro. Grupos como el "Proyecto Lyra" ahora estÃ¡n trabajando seriamente en diseÃ±ar sondas sÃºper rÃ¡pidas que podrÃ­an perseguir e interceptar al prÃ³ximo objeto interestelar que pase por aquÃ­. Gracias al primer mensajero lejano, la humanidad ahora sueÃ±a audazmente con el dÃ­a en que enviaremos nuestras propias naves espaciales para tocar una roca de las estrellas, completando el saludo cÃ³smico.'
    ],
    expandables: [
      { label: 'El Segundo Visitante', icon: 'zap', text: 'Solo dos aÃ±os despuÃ©s de Oumuamua, en 2019, un astrÃ³nomo aficionado llamado Gennadiy Borisov descubriÃ³ un SEGUNDO visitante interestelar. Esta vez, era claramente un cometa con una gran cola de gas y polvo, y lo llamaron 2I/Borisov. Esto probÃ³ definitivamente que Oumuamua no fue solo un milagro Ãºnico e irrepetible.' },
      { label: 'Misiones de IntercepciÃ³n', icon: 'atom', text: 'La Agencia Espacial Europea (ESA) ha aprobado una misiÃ³n llamada "Comet Interceptor". Esta sonda espacial serÃ¡ lanzada y se "estacionarÃ¡" en el espacio, esperando pacientemente como una araÃ±a en su tela. Si los telescopios detectan un nuevo objeto interestelar o un cometa prÃ­stino acercÃ¡ndose a la Tierra, la sonda se despertarÃ¡ para ir a su encuentro y tomar las primeras fotografÃ­as de cerca.' }
    ],
    fact: 'Se estima estadÃ­sticamente que en cualquier momento dado, hay alrededor de 10,000 objetos del tamaÃ±o de Oumuamua pasando invisiblemente dentro de la Ã³rbita del planeta Neptuno. Simplemente nunca los vemos porque son increÃ­blemente oscuros, silenciosos y viajan a velocidades vertiginosamente rÃ¡pidas a travÃ©s de un espacio inmenso y vacÃ­o. El cielo estÃ¡ lleno de fantasmas estelares.'
  }
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

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,183,77,0.2)'}`,
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
            <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Explora MÃ¡s Detalles
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fun Fact â”€â”€â”€ */}
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

// â”€â”€â”€ Progress Bar Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onNodeClick }) {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Progreso de la MisiÃ³n
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

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            Fuentes CientÃ­ficas y BibliografÃ­a
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#FFB74D', opacity: 0.7 }}>â€¢</span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen a tamaÃ±o completo" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
