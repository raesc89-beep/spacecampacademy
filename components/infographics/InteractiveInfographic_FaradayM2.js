'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
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
  "Faraday, M. (1832). Experimental Researches in Electricity (First Series). Philosophical Transactions of the Royal Society of London, 122, 125-162.",
  "Maxwell, J. C. (1865). A Dynamical Theory of the Electromagnetic Field. Philosophical Transactions of the Royal Society of London, 155, 459-512.",
  "Forbes, N. y Mahon, B. (2014). Faraday, Maxwell, and the Electromagnetic Field: How Two Men Revolutionized Physics. Amherst: Prometheus Books.",
  "Griffiths, D. J. (2017). Introduction to Electrodynamics (4.ª ed.). Cambridge University Press.",
  "Hamilton, J. (2002). Faraday: The Life. Londres: HarperCollins.",
  "NASA. STS-75 Mission Archive: Tethered Satellite System Reflight (TSS-1R), 1996. https://www.nasa.gov"
];

const INFOGRAPHIC_NODES = [
  {
    id: "la-pista-de-oersted",
    bannerImage: '/assets/faraday/infographic_m2/banner_la-pista-de-oersted.webp',
    bannerCaption: "En 1820 Hans Christian Ørsted observó que una corriente eléctrica desvía la aguja de una brújula.",
    title: "La pista de Ørsted (1820)",
    color: '#5F7488',
    btnImage: '/assets/faraday/infographic_m2/btn_la-pista-de-oersted.webp',
    image: '/assets/faraday/infographic_m2/hero_la-pista-de-oersted.webp',
    content: [
      "Hasta principios del siglo XIX, la electricidad y el magnetismo parecían fenómenos sin relación. La electricidad se asociaba a chispas, rayos y pilas; el magnetismo, a imanes y brújulas. En abril de 1820, el físico danés Hans Christian Ørsted notó, durante una clase en Copenhague, que la aguja de una brújula se movía cuando por un cable cercano circulaba corriente eléctrica. Publicó su descubrimiento en julio de 1820 y causó sensación en toda Europa: una corriente eléctrica producía efectos magnéticos.",
      "Los científicos se lanzaron a estudiar el fenómeno. En París, André-Marie Ampère demostró en pocas semanas que dos cables con corriente se atraen o se repelen según la dirección de la corriente, como si fueran imanes. Poco después se comprobó que un cable enrollado en forma de bobina se comporta igual que una barra imantada. En 1825 el inglés William Sturgeon fabricó el primer electroimán práctico, una barra de hierro rodeada de alambre que se convertía en un imán potente al conectarla a una pila.",
      "En 1821 Faraday aplicó estas ideas y logró algo nuevo: un alambre con corriente que giraba de forma continua alrededor de un imán, sumergido en parte en un recipiente con mercurio. Era la primera rotación electromagnética, el principio del motor eléctrico, que convierte electricidad en movimiento. Pero Faraday se hacía una pregunta inversa. Si la electricidad podía crear magnetismo y movimiento, ¿podía el magnetismo crear electricidad? La naturaleza, pensaba, debía ser simétrica.",
      "En su cuaderno de notas de 1822 escribió una frase que se ha hecho famosa: convertir el magnetismo en electricidad. Era su objetivo. Durante los años siguientes lo intentó varias veces, colocando imanes potentes junto a cables y bobinas, y midiendo con un galvanómetro, un instrumento que detecta corrientes muy débiles. Pero la aguja del galvanómetro no se movía. Los imanes quietos junto a cables quietos no producían nada. Faraday tuvo que esperar casi diez años para encontrar la clave del misterio.",
      "El problema era sutil. Faraday y otros investigadores esperaban que un imán produjera una corriente constante, del mismo modo que una corriente constante produce un campo magnético constante. Pero la naturaleza funciona de otra manera: lo que genera electricidad no es el magnetismo en sí, sino el cambio del magnetismo. Mientras nada cambiara, no aparecería ninguna corriente. Esta idea, que hoy parece sencilla, fue una de las más difíciles de descubrir en la historia de la física, y Faraday la encontró en 1831."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En honor de Ørsted, la unidad de intensidad de campo magnético en el antiguo sistema de unidades cegesimal se llamó oersted. En Dinamarca su nombre aparece en calles, parques y en el satélite Ørsted, el primer satélite danés, lanzado en 1999 para medir con gran precisión el campo magnético de la Tierra. Así, el científico que descubrió que la electricidad mueve las brújulas terminó dando nombre a un aparato espacial que vigila el magnetismo de todo nuestro planeta." },
      { label: "Dato Científico", icon: "atom", text: "Una corriente eléctrica en un cable recto crea a su alrededor un campo magnético con forma de círculos concéntricos. Puedes recordar su dirección con la regla de la mano derecha: si el pulgar apunta en la dirección de la corriente, los demás dedos, al cerrarse, indican el sentido del campo. Por eso la brújula de Ørsted se colocaba perpendicular al cable. Al enrollar el cable en una bobina, todos esos círculos se suman y el campo se concentra en el interior, como en un imán de barra." }
    ],
    fact: "El galvanómetro, el instrumento con el que Faraday buscaba corrientes, se basa precisamente en el descubrimiento de Ørsted. Consiste en una aguja imantada rodeada de una bobina de alambre: cuando pasa corriente por la bobina, la aguja se desvía, y cuanto mayor es la corriente, mayor es la desviación. Recibió su nombre en honor del italiano Luigi Galvani, que en el siglo XVIII estudió la electricidad en las patas de las ranas. Sin este aparato tan sensible, Faraday nunca habría detectado la inducción.",
  },
  {
    id: "el-anillo-de-induccion",
    bannerImage: '/assets/faraday/infographic_m2/banner_el-anillo-de-induccion.webp',
    bannerCaption: "El 29 de agosto de 1831 Faraday usó un anillo de hierro con dos bobinas y detectó por primera vez una corriente inducida.",
    title: "El anillo de hierro (29 de agosto de 1831)",
    color: '#8A6D4F',
    btnImage: '/assets/faraday/infographic_m2/btn_el-anillo-de-induccion.webp',
    image: '/assets/faraday/infographic_m2/hero_el-anillo-de-induccion.webp',
    content: [
      "El 29 de agosto de 1831, Faraday preparó un experimento con un anillo de hierro dulce de unos 15 centímetros de diámetro. Alrededor de un lado del anillo enrolló una bobina de alambre de cobre, que llamó A, y alrededor del lado opuesto otra bobina, llamada B. En aquella época no existían los cables con plástico, así que aisló el alambre con cordel y tela de algodón para que las vueltas no se tocaran. La bobina A se conectaba a una pila, y la bobina B a un galvanómetro colocado a cierta distancia.",
      "Cuando Faraday conectó la pila a la bobina A, la aguja del galvanómetro conectado a la bobina B dio un salto y luego volvió a su posición inicial. Mientras la corriente seguía circulando por A, la aguja permanecía quieta. Pero al desconectar la pila, la aguja volvió a moverse, esta vez en sentido contrario. ¡Había corriente en la bobina B, aunque las dos bobinas no estaban conectadas por ningún cable! Faraday anotó cuidadosamente el resultado en su diario de laboratorio, con un dibujo del anillo.",
      "La explicación es que la corriente en la bobina A convierte al anillo de hierro en un imán. Al conectar la pila, el magnetismo del anillo aparece de golpe; al desconectarla, desaparece. Esos cambios son los que producen la corriente en la bobina B. Mientras el magnetismo se mantiene constante, no hay corriente. Este fenómeno, en el que una corriente que cambia en una bobina induce una corriente en otra bobina cercana, se llama inducción mutua, y el aparato de Faraday fue, en esencia, el primer transformador.",
      "Faraday entendió que había encontrado lo que buscaba desde hacía años, pero no lo anunció de inmediato. Durante las semanas siguientes repitió el experimento de muchas formas: cambió el número de vueltas de alambre, sustituyó el anillo de hierro por otros materiales y probó diferentes pilas. Comprobó que con un núcleo de hierro el efecto era mucho más fuerte que sin él. Faraday trabajaba así: antes de publicar, quería entender el fenómeno a fondo y descartar cualquier error o explicación alternativa.",
      "Hoy los transformadores basados en ese principio están en todas partes. En las redes eléctricas, enormes transformadores elevan el voltaje a cientos de miles de voltios para transportar la electricidad a grandes distancias con pocas pérdidas, y otros lo reducen antes de que llegue a las casas. Dentro del cargador de muchos aparatos, transformadores pequeños bajan el voltaje de la red a unos pocos voltios. La relación entre los voltajes depende del número de vueltas de cada bobina, igual que en el anillo de Faraday."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El anillo de inducción original que Faraday usó el 29 de agosto de 1831 todavía existe. Se conserva en el museo de la Royal Institution de Londres, con su alambre cubierto de tela y cordel. Es uno de los objetos más importantes de la historia de la tecnología: a partir de ese sencillo anillo de hierro se desarrollaron los transformadores que hoy forman parte de las redes eléctricas de todo el mundo. Cualquier visitante del museo puede verlo de cerca." },
      { label: "Dato Científico", icon: "atom", text: "Un transformador ideal cumple una regla sencilla: la relación entre el voltaje de salida y el de entrada es igual a la relación entre las vueltas de las bobinas. Si la bobina primaria tiene 1,000 vueltas y la secundaria 100, el voltaje se reduce diez veces, por ejemplo de 120 a 12 voltios. Los transformadores solo funcionan con corriente alterna, que cambia de sentido continuamente, porque necesitan un campo magnético que cambie todo el tiempo para inducir corriente." }
    ],
    fact: "Elevar el voltaje para transportar electricidad ahorra muchísima energía. Las pérdidas en un cable dependen del cuadrado de la corriente que circula por él. Si un transformador multiplica el voltaje por diez, la corriente necesaria para transmitir la misma potencia se divide entre diez, y las pérdidas se reducen cien veces. Por eso las líneas de alta tensión de países como México y España funcionan a cientos de miles de voltios, entre ellos tensiones de 400,000 voltios.",
  },
  {
    id: "iman-en-movimiento",
    bannerImage: '/assets/faraday/infographic_m2/banner_iman-en-movimiento.webp',
    bannerCaption: "El 17 de octubre de 1831 Faraday produjo corriente simplemente metiendo y sacando un imán de una bobina de alambre.",
    title: "Un imán que entra y sale de una bobina",
    color: '#6D7F5E',
    btnImage: '/assets/faraday/infographic_m2/btn_iman-en-movimiento.webp',
    image: '/assets/faraday/infographic_m2/hero_iman-en-movimiento.webp',
    content: [
      "Faraday quiso comprobar si podía obtener corriente sin pila, usando solo un imán permanente. El 17 de octubre de 1831 preparó una bobina formada por un largo alambre de cobre enrollado en forma de cilindro hueco, conectada a un galvanómetro. Luego introdujo rápidamente una barra imantada en el interior de la bobina. La aguja del galvanómetro se movió. Al sacar el imán, la aguja se movió en sentido contrario. Pero si dejaba el imán quieto dentro de la bobina, la aguja no se movía en absoluto.",
      "El experimento confirmaba la gran lección del anillo: lo importante es el cambio. Una bobina quieta junto a un imán quieto no produce nada. Pero si el imán se acerca o se aleja, el magnetismo que atraviesa la bobina cambia y aparece una corriente. Además, Faraday comprobó que daba lo mismo mover el imán o mover la bobina: lo único que importa es el movimiento relativo entre ambos. Cuanto más rápido era el movimiento, mayor era la desviación de la aguja, es decir, más intensa era la corriente producida.",
      "Faraday llamó a este fenómeno inducción magnetoeléctrica, y hoy lo conocemos como inducción electromagnética: la generación de una corriente eléctrica mediante un campo magnético que cambia. Es justamente la definición que se usa en los libros de física. El 24 de noviembre de 1831 presentó sus resultados ante la Royal Society de Londres, y al año siguiente los publicó en la revista Philosophical Transactions, como la primera serie de sus Investigaciones experimentales en electricidad.",
      "Para explicar por qué el cambio era tan importante, Faraday usó su idea de las líneas de fuerza. Imaginaba que de cada imán salían líneas invisibles que llenaban el espacio y que podían hacerse visibles espolvoreando limaduras de hierro sobre un papel colocado encima del imán. Según Faraday, cuando un alambre corta esas líneas, o cuando el número de líneas que atraviesan una bobina aumenta o disminuye, se produce corriente. Era una explicación visual, sin ecuaciones, pero resultó ser correcta.",
      "Este sencillo experimento está detrás de muchos aparatos cotidianos. Las pastillas de una guitarra eléctrica son pequeños imanes rodeados por bobinas con miles de vueltas de alambre finísimo: cuando una cuerda de acero vibra sobre ellas, cambia el campo magnético y se induce una corriente que reproduce la vibración, que luego se amplifica. Los antiguos micrófonos dinámicos y algunos sismómetros funcionan de forma parecida, convirtiendo un movimiento en una señal eléctrica gracias a la inducción."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En Estados Unidos, el físico Joseph Henry descubrió la inducción electromagnética de forma independiente, más o menos en la misma época que Faraday, pero publicó sus resultados después, en 1832. Henry estudió también la autoinducción, el efecto por el que una corriente que cambia en una bobina induce un voltaje en esa misma bobina. En su honor, la unidad de inductancia del Sistema Internacional se llama henrio. La ciencia avanza muchas veces así: varias personas llegan a la misma idea casi a la vez." },
      { label: "Dato Científico", icon: "atom", text: "Un experimento clásico muestra la inducción de forma sorprendente: si dejas caer un imán potente por dentro de un tubo vertical de cobre o aluminio, cae muy despacio, como si flotara. El cobre no es magnético, pero el imán al caer induce corrientes eléctricas circulares en las paredes del tubo, llamadas corrientes de Foucault. Esas corrientes crean su propio campo magnético, que se opone al movimiento del imán y lo frena. Una canica de acero no imantada, en cambio, cae a toda velocidad." }
    ],
    fact: "Las limaduras de hierro que Faraday usaba para visualizar las líneas de fuerza se siguen empleando hoy en las aulas de todo el mundo. Cada pequeña partícula de hierro se convierte en un diminuto imán y se orienta siguiendo el campo, formando curvas que van de un polo a otro. Los científicos actuales ven campos magnéticos de manera parecida en el espacio: las espectaculares imágenes del Sol tomadas por observatorios espaciales muestran arcos de gas brillante que siguen las líneas del campo magnético solar.",
  },
  {
    id: "disco-de-faraday-primer-generador",
    bannerImage: '/assets/faraday/infographic_m2/banner_disco-de-faraday-primer-generador.webp',
    bannerCaption: "El 28 de octubre de 1831 Faraday hizo girar un disco de cobre entre los polos de un imán y obtuvo corriente continua.",
    title: "El disco de Faraday: el primer generador",
    color: '#7A5C6E',
    btnImage: '/assets/faraday/infographic_m2/btn_disco-de-faraday-primer-generador.webp',
    image: '/assets/faraday/infographic_m2/hero_disco-de-faraday-primer-generador.webp',
    content: [
      "Los experimentos anteriores producían solo destellos breves de corriente, cada vez que algo cambiaba. Faraday quería una corriente continua, que no se detuviera. El 28 de octubre de 1831 colocó un disco de cobre de unos 30 centímetros de diámetro entre los polos del gran imán en forma de herradura de la Royal Society. Conectó un cable al eje del disco y otro a un contacto deslizante que rozaba su borde. Al hacer girar el disco con una manivela, el galvanómetro marcó una corriente constante mientras durara el giro.",
      "Al girar, cada parte del disco de cobre cortaba continuamente las líneas de fuerza del imán, y esto producía un voltaje entre el centro y el borde del disco. Mientras el disco giraba, la corriente fluía sin interrupción. Era la primera vez en la historia que alguien convertía movimiento mecánico en electricidad de forma continua. El aparato, conocido como disco de Faraday, fue el primer generador eléctrico, o dinamo. Producía muy poca electricidad, pero demostraba que era posible fabricar electricidad girando algo.",
      "Faraday reunió así en un mismo año dos logros decisivos. Ya en 1821 había demostrado el principio del motor eléctrico, que transforma electricidad en movimiento. En 1831 descubrió el proceso inverso, la inducción, y construyó el primer generador, que transforma movimiento en electricidad. Motor y generador son, en el fondo, la misma máquina funcionando en sentidos opuestos. Por eso los coches eléctricos actuales pueden usar su motor como generador al frenar y recuperar parte de la energía en la batería.",
      "Otros inventores mejoraron rápidamente la idea. En 1832, apenas un año después, el francés Hippolyte Pixii construyó en París un generador de manivela en el que un imán giraba frente a dos bobinas, produciendo corriente alterna. En las décadas siguientes, ingenieros como el alemán Werner von Siemens y el belga Zénobe Gramme diseñaron dinamos cada vez más potentes. Hacia 1880 ya existían las primeras centrales eléctricas comerciales, como la de Thomas Edison en Nueva York, inaugurada en 1882.",
      "Hoy casi toda la electricidad del mundo se produce con el principio que Faraday descubrió. En una central hidroeléctrica, el agua hace girar una turbina; en una central nuclear, de carbón o de gas, lo hace el vapor; en un aerogenerador, el viento. Todas esas turbinas mueven un generador en el que imanes o electroimanes giran frente a bobinas de cobre. La gran excepción son los paneles solares, que convierten directamente la luz en electricidad sin usar la inducción. Todo lo demás es, en esencia, un disco de Faraday gigante."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una anécdota muy famosa cuenta que un político británico, a menudo identificado como William Gladstone, le preguntó a Faraday para qué servía la electricidad, y que él respondió que algún día el gobierno podría cobrar impuestos por ella. Los historiadores no han encontrado ninguna prueba de que esa conversación ocurriera, y probablemente es una leyenda. Pero resulta irónica: hoy la electricidad es uno de los servicios por los que más se paga en el mundo." },
      { label: "Dato Científico", icon: "atom", text: "Los generadores de las centrales están sincronizados con la frecuencia de la red. En México, Estados Unidos y gran parte de América la corriente alterna cambia de sentido 60 veces por segundo, es decir, 60 hercios; en España y la mayor parte de Europa, 50 hercios. Un generador sencillo de dos polos debe girar a 3,600 vueltas por minuto para producir 60 hercios, y a 3,000 para producir 50. Los generadores con más polos, como los de las presas, pueden girar mucho más despacio." }
    ],
    fact: "La central hidroeléctrica de las Tres Gargantas, en China, es la mayor del mundo por potencia instalada: unos 22,500 megavatios repartidos en 34 generadores. En América, la presa de Itaipú, en la frontera entre Brasil y Paraguay, supera los 14,000 megavatios. Cada uno de esos generadores gigantes funciona con el mismo principio que el pequeño disco de cobre que Faraday hizo girar con una manivela en octubre de 1831: movimiento relativo entre un conductor y un campo magnético.",
  },
  {
    id: "ley-de-faraday-y-lenz",
    bannerImage: '/assets/faraday/infographic_m2/banner_ley-de-faraday-y-lenz.webp',
    bannerCaption: "La ley de Faraday dice que el voltaje inducido es proporcional a la rapidez con que cambia el flujo magnético.",
    title: "La ley de Faraday y la regla de Lenz",
    color: '#557A80',
    btnImage: '/assets/faraday/infographic_m2/btn_ley-de-faraday-y-lenz.webp',
    image: '/assets/faraday/infographic_m2/hero_ley-de-faraday-y-lenz.webp',
    content: [
      "Los físicos resumen hoy los descubrimientos de Faraday en una ley que lleva su nombre. Para entenderla hay que conocer el concepto de flujo magnético: una medida de cuántas líneas de campo magnético atraviesan una superficie, como el interior de una espira de alambre. El flujo es mayor cuando el campo es más intenso, cuando la espira es más grande y cuando la espira está colocada de frente al campo. Si la espira se inclina, la atraviesan menos líneas y el flujo disminuye. Su unidad es el weber.",
      "La ley de Faraday dice que el voltaje inducido en una bobina es proporcional a la rapidez con que cambia el flujo magnético que la atraviesa y al número de vueltas de la bobina. Por ejemplo, si en una bobina de 100 vueltas el flujo cambia 0.01 weber en una décima de segundo, el voltaje inducido es de 10 voltios. Si el cambio ocurre el doble de rápido, el voltaje se duplica. Y si el flujo no cambia, no hay voltaje, por muy intenso que sea el campo. Esto explica todos los experimentos de 1831.",
      "Faltaba saber en qué sentido circula la corriente inducida. En 1834 el físico Heinrich Lenz, nacido en la actual Estonia y que trabajaba en San Petersburgo, encontró la respuesta: la corriente inducida circula siempre en el sentido que se opone al cambio que la produce. Si acercas el polo norte de un imán a una bobina, la corriente inducida convierte la bobina en un imán que presenta también un polo norte hacia el imán, de modo que lo repele. Si lo alejas, la bobina lo atrae. Por eso en las fórmulas aparece un signo menos.",
      "La regla de Lenz es una consecuencia de la conservación de la energía, uno de los principios más fundamentales de la física. Si la corriente inducida ayudara al movimiento en lugar de oponerse, el imán se aceleraría solo, produciría más corriente, se aceleraría todavía más, y obtendríamos energía de la nada. Eso es imposible. Por eso, para mover un generador hay que hacer fuerza: la energía eléctrica que produce sale del trabajo mecánico de la turbina, del agua, del vapor o del viento que lo hace girar.",
      "Puedes sentir la regla de Lenz con una bicicleta que tenga dinamo. Al encender la luz, pedalear se vuelve un poco más difícil, porque la corriente que alimenta la lámpara crea un campo que frena el giro de la dinamo. Lo mismo ocurre a gran escala con los frenos electromagnéticos de algunos trenes y camiones, y con las atracciones de caída libre de los parques de diversiones, que frenan a los pasajeros sin contacto, usando imanes y placas metálicas en las que se inducen corrientes que se oponen al movimiento."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Tierra tiene su propio generador gigante. Su núcleo externo, una capa de hierro y níquel fundidos de unos 2,200 kilómetros de espesor, está en movimiento constante por el calor del interior y la rotación del planeta. Ese metal líquido en movimiento, conductor de la electricidad, genera corrientes eléctricas que a su vez producen el campo magnético terrestre, en un proceso que se mantiene a sí mismo llamado geodinamo. Ese campo nos protege de muchas partículas del viento solar." },
      { label: "Dato Científico", icon: "atom", text: "En el lenguaje matemático de la física, la ley de Faraday se escribe como ε = −N · ΔΦ/Δt, donde ε es el voltaje inducido, N el número de vueltas, ΔΦ el cambio de flujo magnético y Δt el tiempo en que ocurre ese cambio. El signo menos representa la regla de Lenz. Más tarde, James Clerk Maxwell expresó esta misma ley de forma más general, como una de sus cuatro ecuaciones del electromagnetismo, válida en cualquier punto del espacio." }
    ],
    fact: "En febrero de 1996, durante la misión STS-75 del transbordador Columbia, la NASA y la agencia espacial italiana desplegaron un satélite atado a la nave por un cable conductor de casi 20 kilómetros. Al moverse a gran velocidad a través del campo magnético terrestre, el cable generó por inducción un voltaje de hasta unos 3,500 voltios. El cable terminó rompiéndose, pero el experimento demostró que la ley de Faraday puede producir electricidad incluso en órbita alrededor de la Tierra.",
  },
  {
    id: "maxwell-y-las-ondas",
    bannerImage: '/assets/faraday/infographic_m2/banner_maxwell-y-las-ondas.webp',
    bannerCaption: "James Clerk Maxwell, nacido en 1831, convirtió las ideas de Faraday en ecuaciones y demostró que la luz es una onda electromagnética.",
    title: "De las líneas de fuerza a las ecuaciones de Maxwell",
    color: '#6B6385',
    btnImage: '/assets/faraday/infographic_m2/btn_maxwell-y-las-ondas.webp',
    image: '/assets/faraday/infographic_m2/hero_maxwell-y-las-ondas.webp',
    content: [
      "Faraday tenía una intuición física extraordinaria, pero no dominaba las matemáticas avanzadas, y muchos científicos de su época miraban con desconfianza sus líneas de fuerza. La persona que tradujo esas ideas al lenguaje matemático fue el escocés James Clerk Maxwell, nacido en Edimburgo el 13 de junio de 1831, justo el año en que Faraday descubrió la inducción. Maxwell estudió en Edimburgo y Cambridge, y desde joven quedó fascinado por las Investigaciones experimentales en electricidad de Faraday.",
      "En 1855 y 1856 Maxwell publicó un artículo titulado Sobre las líneas de fuerza de Faraday, en el que describía matemáticamente esas líneas como si fueran el flujo de un fluido. Le envió una copia a Faraday, que tenía entonces 65 años. Faraday le respondió en 1857 con una carta famosa en la que confesaba que al principio casi se había asustado al ver tanta fuerza matemática aplicada al tema, pero que luego se maravilló de lo bien que el tema la soportaba. Era el comienzo de una gran amistad científica.",
      "En 1865 Maxwell publicó Una teoría dinámica del campo electromagnético, donde reunió todo lo que se sabía sobre electricidad y magnetismo en un conjunto de ecuaciones. Hoy se resumen en cuatro, conocidas como ecuaciones de Maxwell. Una de ellas es la ley de inducción de Faraday. Maxwell añadió una pieza nueva: un campo eléctrico que cambia también produce un campo magnético. Con eso, electricidad y magnetismo quedaban unidos en una sola fuerza: el electromagnetismo.",
      "Las ecuaciones de Maxwell hicieron una predicción asombrosa: campos eléctricos y magnéticos que cambian pueden alimentarse mutuamente y viajar por el espacio como una onda. Al calcular la velocidad de esas ondas con datos medidos en el laboratorio, Maxwell obtuvo un valor muy cercano a la velocidad de la luz, unos 300,000 kilómetros por segundo. Concluyó que la luz es una onda electromagnética. Faraday ya lo había intuido en 1846, sin matemáticas, en un breve texto sobre las vibraciones de los rayos.",
      "Maxwell murió en 1879 sin ver confirmada su predicción. Entre 1886 y 1889 el físico alemán Heinrich Hertz generó y detectó en su laboratorio de Karlsruhe ondas electromagnéticas invisibles, las ondas de radio, y demostró que se reflejaban y viajaban como la luz. En su honor, la unidad de frecuencia se llama hercio. Pocos años después, Guglielmo Marconi usó esas ondas para enviar mensajes sin cables. La radio, la televisión, el wifi, los teléfonos móviles y el GPS nacen de esta cadena: Faraday, Maxwell, Hertz."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Maxwell también hizo grandes aportaciones a otros campos. En 1861 presentó en la Royal Institution, donde trabajaba Faraday, la primera fotografía en color de la historia: la imagen de una cinta de tela escocesa, obtenida combinando tres fotografías tomadas con filtros rojo, verde y azul. Ese mismo principio de combinar tres colores básicos se usa hoy en las pantallas de los teléfonos, las computadoras y los televisores, que forman todos los colores con diminutos puntos rojos, verdes y azules." },
      { label: "Dato Científico", icon: "atom", text: "La luz visible es solo una pequeña parte del espectro electromagnético que predijeron las ecuaciones de Maxwell. Todas sus ondas viajan a la misma velocidad en el vacío, unos 300,000 kilómetros por segundo, y solo se diferencian en su longitud de onda. Las ondas de radio pueden medir desde milímetros hasta kilómetros; la luz visible, entre unos 400 y 700 nanómetros; y los rayos X y gamma son todavía más cortos. Los telescopios espaciales observan el universo en muchas de estas longitudes de onda." }
    ],
    fact: "Las ecuaciones de Maxwell inspiraron directamente a Albert Einstein. Al preguntarse cómo se vería una onda de luz si alguien viajara a su lado a la misma velocidad, Einstein encontró contradicciones con la física de Newton, y eso lo llevó en 1905 a la teoría de la relatividad especial. Su famoso artículo de ese año, Sobre la electrodinámica de los cuerpos en movimiento, empieza precisamente analizando un caso de inducción: un imán y un conductor que se mueven uno respecto al otro.",
  },
  {
    id: "induccion-en-la-vida-diaria",
    bannerImage: '/assets/faraday/infographic_m2/banner_induccion-en-la-vida-diaria.webp',
    bannerCaption: "Cocinas de inducción, cargadores inalámbricos y tarjetas sin contacto funcionan con el principio que Faraday descubrió en 1831.",
    title: "La inducción en casa y en el espacio",
    color: '#7E7458',
    btnImage: '/assets/faraday/infographic_m2/btn_induccion-en-la-vida-diaria.webp',
    image: '/assets/faraday/infographic_m2/hero_induccion-en-la-vida-diaria.webp',
    content: [
      "La inducción está en muchos objetos de tu casa. Una cocina de inducción tiene bajo su superficie de vidrio una bobina por la que circula corriente alterna de alta frecuencia, de decenas de miles de ciclos por segundo. Esa corriente crea un campo magnético que cambia muy rápido. Cuando colocas encima una olla con base de hierro o acero, el campo induce corrientes eléctricas dentro del metal de la olla, que se calienta directamente. El vidrio solo se calienta por contacto con la olla, y con una olla de vidrio no pasaría nada.",
      "Los cargadores inalámbricos de los teléfonos funcionan como un transformador separado en dos partes. La base de carga contiene una bobina por la que circula corriente alterna, y el teléfono tiene otra bobina en su interior. Cuando colocas el teléfono sobre la base, el campo magnético cambiante de la primera bobina induce corriente en la segunda, que recarga la batería sin necesidad de cable. El estándar más extendido, llamado Qi, fue presentado en 2010 y lo usan teléfonos, relojes inteligentes y auriculares de muchas marcas.",
      "Las tarjetas de transporte, las tarjetas bancarias sin contacto y los pagos con el teléfono usan una tecnología llamada NFC, que significa comunicación de campo cercano. La tarjeta no tiene batería: dentro lleva una antena en forma de bobina plana y un pequeño chip. Cuando la acercas al lector, el campo magnético que cambia unos 13.56 millones de veces por segundo induce en la bobina la corriente justa para que el chip funcione y envíe su información. Por eso solo funciona a unos pocos centímetros de distancia.",
      "La inducción también mueve trenes. Los coches eléctricos y muchos trenes modernos usan el frenado regenerativo: al frenar, el motor funciona como generador y convierte el movimiento en electricidad que se aprovecha de nuevo. Los trenes de levitación magnética llevan esta idea más lejos. El tren experimental japonés SCMaglev usa imanes superconductores que inducen corrientes en bobinas colocadas en la vía; esas corrientes lo hacen levitar y lo guían. En 2015 alcanzó un récord mundial de 603 kilómetros por hora.",
      "En el espacio, la inducción actúa a escala planetaria. Ío, una de las lunas de Júpiter descubiertas por Galileo, se mueve a través del enorme campo magnético del planeta. Como Ío es conductora, ese movimiento genera por inducción una diferencia de potencial de cientos de miles de voltios y corrientes eléctricas gigantescas que viajan por las líneas del campo hasta los polos de Júpiter, donde producen una mancha brillante en sus auroras. Es el principio del disco de Faraday, pero del tamaño de un sistema de lunas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los detectores de metales que se usan en los aeropuertos y en las playas también funcionan por inducción. Una bobina emisora crea un campo magnético que cambia rápidamente. Si hay un objeto metálico cerca, el campo induce en él pequeñas corrientes de Foucault, y esas corrientes generan a su vez un campo magnético propio que detecta una bobina receptora. Así, el aparato sabe que hay metal sin tocarlo. Los arqueólogos lo usan para encontrar monedas y objetos antiguos enterrados." },
      { label: "Dato Científico", icon: "atom", text: "Los aparatos de resonancia magnética de los hospitales también dependen de la inducción. Un imán muy potente orienta los núcleos de hidrógeno del agua del cuerpo; luego, pulsos de ondas de radio los hacen girar ligeramente. Al volver a su posición, esos núcleos, que se comportan como diminutos imanes, inducen señales eléctricas débiles en unas bobinas receptoras colocadas cerca del paciente. Una computadora transforma esas señales en imágenes detalladas del interior del cuerpo sin usar rayos X." }
    ],
    fact: "La sonda Juno de la NASA, que orbita Júpiter desde 2016, ha estudiado con detalle la huella que dejan en las auroras del planeta sus lunas Ío, Europa y Ganímedes. Esas manchas brillantes son la prueba visible de las corrientes eléctricas inducidas por el movimiento de las lunas dentro del campo magnético joviano. Casi dos siglos después del anillo de hierro de 1831, la ley de Faraday ayuda a los científicos a entender lo que ocurre a más de 600 millones de kilómetros de la Tierra.",
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
      hue: Math.random() > 0.5 ? '184,125,94' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(184,125,94,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradFaradayM2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5F7488", "#8A6D4F", "#6D7F5E", "#7A5C6E", "#557A80", "#6B6385", "#7E7458"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#B87D5E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#B87D5E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradFaradayM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CÓMO EL MAGNETISMO CREA ELECTRICIDAD</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(184,125,94,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MICHAEL FARADAY</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(184,125,94,0.2)'}`,
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
          layoutId="activeDotFaradayM2"
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
      border: '1px solid rgba(184,125,94,0.15)',
    }}>
      <Star size={14} style={{ color: '#B87D5E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #B87D5E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(184,125,94,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#B87D5E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_FaradayM2() {
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
      border: '1px solid rgba(184,125,94,0.12)',
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
            textAlign: 'center', color: 'rgba(184,125,94,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(184,125,94,0.08)', borderRadius: '16px',
              border: '1px solid rgba(184,125,94,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B87D5E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 1831: el hallazgo de Faraday que hoy produce casi toda la electricidad
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
