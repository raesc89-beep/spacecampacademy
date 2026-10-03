'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#D4A843', style = {} }) {
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
  "Kemp, M. (2006). Leonardo da Vinci: The Marvellous Works of Nature and Man (ed. revisada). Oxford University Press.",
  "Capra, F. (2007). The Science of Leonardo: Inside the Mind of the Great Genius of the Renaissance. Doubleday.",
  "Isaacson, W. (2017). Leonardo da Vinci. Simon & Schuster.",
  "Galluzzi, P. (1996). Gli ingegneri del Rinascimento: da Brunelleschi a Leonardo da Vinci. Giunti.",
  "Nicholl, C. (2004). Leonardo da Vinci: The Flights of the Mind. Allen Lane (Penguin).",
  "Laurenza, D., Taddei, M. y Zanon, E. (2006). Le macchine di Leonardo. Giunti."
];

const INFOGRAPHIC_NODES = [
  {
    id: "puentes-rotatorios",
    bannerImage: '/assets/davinci/infographic_m3/banner_puentes-rotatorios.webp',
    bannerCaption: "Leonardo diseñó puentes giratorios y autoportantes para cruzar ríos con rapidez, usando contrapesos, rodillos y piezas encajadas.",
    title: "Puentes giratorios y autoportantes",
    color: '#4FA3B5',
    btnImage: '/assets/davinci/infographic_m3/btn_puentes-rotatorios.webp',
    image: '/assets/davinci/infographic_m3/hero_puentes-rotatorios.webp',
    content: [
      "En la carta que Leonardo da Vinci preparó hacia 1482 para presentarse ante Ludovico Sforza, duque de Milán, el primer servicio que ofrecía no era pintar, sino construir puentes. Explicaba que conocía modos de hacer puentes «ligerísimos y fuertes», fáciles de transportar, con los que perseguir al enemigo o escapar de él. Para un ejército del siglo XV, cruzar un río era uno de los momentos más peligrosos de una campaña, y quien dominaba esa técnica ganaba tiempo y seguridad.",
      "Uno de sus diseños más conocidos es el puente giratorio, dibujado en el Códice Atlántico (fol. 855r). Se trataba de un tablero de madera apoyado sobre un eje vertical en una de las orillas. En el extremo situado en tierra colocó una caja de contrapeso que equilibraba el peso del tramo que volaba sobre el agua. Unos rodillos y un sistema de cuerdas y torno permitían girar la estructura entera para abrir o cerrar el paso, de modo que un grupo pequeño de soldados podía retirarla con poco esfuerzo.",
      "Otro diseño famoso es el puente autoportante, formado por troncos entrelazados que se sostienen unos a otros sin clavos, cuerdas ni pegamento. Cada tronco pasa por encima de uno y por debajo de otro, y el propio peso de la estructura la mantiene unida: cuanto más carga recibe, más se aprietan las piezas. Los ingenieros llaman hoy a este principio «marco recíproco». La ventaja militar era clara, porque bastaba con cortar árboles cerca del río para montarlo y desmontarlo.",
      "Detrás de estos inventos hay física sencilla. El contrapeso del puente giratorio aplica la ley de la palanca, que Arquímedes describió en el siglo III a. C.: un peso cerca del eje puede equilibrar otro más lejano si se combinan correctamente masa y distancia. En el puente de troncos actúan la fricción entre las piezas y la compresión, la misma fuerza que mantiene en pie los arcos de piedra. Leonardo anotaba estas ideas en sus cuadernos con dibujos detallados y textos escritos de derecha a izquierda, en escritura especular.",
      "No existen documentos que prueben que estos puentes se construyeran en vida de Leonardo. Sin embargo, en las últimas décadas museos, universidades y escuelas han fabricado maquetas y versiones a tamaño real para comprobar si funcionaban. El puente de troncos entrelazados se ha montado muchas veces en talleres educativos con simples palos de madera, y sigue siendo un ejercicio práctico para entender cómo se reparten las fuerzas en una estructura sin uniones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Leonardo también propuso un puente gigantesco sobre el Cuerno de Oro, en Estambul, para el sultán Bayezid II en 1502. Habría medido unos 240 metros de largo, más que cualquier puente de su época. El proyecto no se construyó, pero en 2001 el artista Vebjørn Sand inauguró en Ås (Noruega) una versión peatonal de madera inspirada en ese diseño." },
      { label: "Dato Científico", icon: "atom", text: "Un contrapeso funciona por el equilibrio de momentos: el momento de una fuerza es su valor multiplicado por la distancia al eje de giro. Si el tramo sobre el río pesa 100 kilos y su centro está a 6 metros del eje, un contrapeso de 300 kilos situado a 2 metros lo equilibra, porque 100 × 6 = 300 × 2. Así, girar el puente requiere muy poca fuerza adicional." }
    ],
    fact: "En la carta a Ludovico Sforza, Leonardo enumeró unos diez apartados de ingeniería militar: puentes portátiles, métodos para vaciar el agua de los fosos, formas de destruir fortalezas o carros cubiertos. Solo al final mencionaba la arquitectura en tiempos de paz, la escultura y la pintura. El borrador se conserva en el Códice Atlántico, en la Biblioteca Ambrosiana de Milán, y no parece escrito de su puño y letra, sino copiado por otra mano.",
  },
  {
    id: "maquinas-guerra-leonardo",
    bannerImage: '/assets/davinci/infographic_m3/banner_maquinas-guerra-leonardo.webp',
    bannerCaption: "Ballestas gigantes, cañones de varios tubos y carros con guadañas: los diseños militares que Leonardo dibujó para sus mecenas.",
    title: "Las máquinas de guerra de Leonardo",
    color: '#C9A24B',
    btnImage: '/assets/davinci/infographic_m3/btn_maquinas-guerra-leonardo.webp',
    image: '/assets/davinci/infographic_m3/hero_maquinas-guerra-leonardo.webp',
    content: [
      "Leonardo vivió en una Italia dividida en estados rivales: el ducado de Milán, la república de Florencia, Venecia, los Estados Pontificios y el reino de Nápoles. Las guerras eran frecuentes y los gobernantes pagaban bien a quien pudiera mejorar sus defensas. Por eso, durante su estancia en Milán (1482-1499) y más tarde al servicio de César Borgia (1502-1503), Leonardo dedicó muchas páginas de sus cuadernos a armas, fortificaciones y máquinas de asedio.",
      "Uno de sus dibujos más espectaculares es la ballesta gigante, fechada hacia 1485-1488 y conservada en el Códice Atlántico. Según sus anotaciones, el arco debía medir 42 braccia, la unidad de longitud de la época, equivalente a unos 58 centímetros; en total, unos 24 metros de envergadura. Estaría montada sobre seis ruedas inclinadas para ganar estabilidad, y la cuerda se tensaba con engranajes y un tornillo sin fin. Algunos historiadores piensan que su función principal era intimidar al enemigo con su tamaño.",
      "Leonardo también ideó armas de fuego de repetición. Su «órgano» de 33 cañones reunía tres filas de once tubos sobre una plataforma giratoria: mientras una fila disparaba, otra se enfriaba y la tercera se recargaba. La idea anticipa el principio de las ametralladoras, que no aparecieron hasta el siglo XIX. Dibujó además bombardas que lanzaban proyectiles cargados de fragmentos y estudió con cuidado las trayectorias curvas que seguían las balas de cañón al salir disparadas.",
      "Entre sus diseños más inquietantes está el carro falcado, un vehículo con guadañas giratorias movidas por las ruedas mediante engranajes. Leonardo anotó que estos carros a menudo hacían tanto daño a los amigos como a los enemigos, una advertencia poco común en un catálogo de armas. También describió el «arquitronito», un cañón que disparaba gracias al vapor producido al echar agua sobre metal al rojo. Él mismo atribuyó la idea a Arquímedes y la dibujó en el Manuscrito B, hoy en el Instituto de Francia, en París.",
      "Resulta paradójico que el mismo hombre que diseñaba armas llamara a la guerra «pazzia bestialissima», es decir, una locura de lo más bestial. En el Códice Leicester explicó que no revelaría su método para permanecer bajo el agua por la «naturaleza malvada de los hombres», que podrían usarlo para hundir barcos y matar a sus tripulantes. Esta tensión entre ingenio y responsabilidad es uno de los temas más actuales de su obra y sigue presente en los debates sobre ciencia y tecnología."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Muchas de las máquinas militares de Leonardo nunca salieron del papel. Varios historiadores creen que algunos dibujos funcionaban, en parte, como carta de presentación ante mecenas como Ludovico Sforza. Aun así, en 1502 César Borgia le entregó un salvoconducto que lo nombraba arquitecto e ingeniero general y le permitía inspeccionar las fortalezas de sus territorios en la Romaña." },
      { label: "Dato Científico", icon: "atom", text: "La ballesta almacena energía elástica: al tensar la cuerda, el arco se deforma y guarda energía que luego se transforma en energía cinética del proyectil. Cuanto más grande y rígido es el arco, más energía puede acumular. Pero un arco de madera de 24 metros tendría problemas de resistencia, porque al aumentar el tamaño el peso crece más deprisa que la resistencia de los materiales." }
    ],
    fact: "Leonardo estudió la balística, es decir, el movimiento de los proyectiles. En sus dibujos de morteros representó las trayectorias como curvas continuas que suben y bajan. En 1537 Niccolò Tartaglia publicó el primer tratado de balística, y fue Galileo Galilei, ya en el siglo XVII, quien demostró matemáticamente que, sin contar el rozamiento del aire, esas trayectorias son parábolas.",
  },
  {
    id: "tanque-guerra",
    bannerImage: '/assets/davinci/infographic_m3/banner_tanque-guerra.webp',
    bannerCaption: "Hacia 1487 Leonardo dibujó un carro armado cubierto, con cañones en todo su contorno, movido por la fuerza de ocho hombres.",
    title: "El carro armado",
    color: '#8C6B4F',
    btnImage: '/assets/davinci/infographic_m3/btn_tanque-guerra.webp',
    image: '/assets/davinci/infographic_m3/hero_tanque-guerra.webp',
    content: [
      "Entre los puntos de su carta a Ludovico Sforza, Leonardo prometía construir «carros cubiertos, seguros e inatacables» capaces de entrar entre las filas enemigas con su artillería. Hacia 1487 plasmó esa idea en un dibujo que hoy se conserva en el British Museum de Londres. Muestra un vehículo con forma de cono aplanado, parecido al caparazón de una tortuga, que muchos consideran el antecedente más famoso del tanque moderno, aunque nunca llegó a construirse.",
      "La coraza era de madera reforzada con placas metálicas e inclinada hacia los lados. Esa inclinación tenía una razón física: un proyectil que golpea una superficie oblicua tiende a desviarse en vez de atravesarla, un principio que los blindados del siglo XX aprovecharon con sus planchas en ángulo. En lo alto, una torreta permitía a un observador vigilar el campo de batalla, y alrededor de la base se distribuían cañones ligeros que podían disparar en todas direcciones.",
      "El carro no tenía motor, porque en el siglo XV no existía ninguno capaz de moverlo. Leonardo propuso que ocho hombres situados en el interior hicieran girar unas manivelas conectadas mediante engranajes a cuatro ruedas. El peso total habría sido enorme, y desplazarlo sobre terreno embarrado o irregular habría exigido un esfuerzo agotador para la tripulación. Además, dentro del caparazón el calor, el humo de la pólvora y el ruido habrían hecho muy difícil trabajar durante mucho tiempo.",
      "El detalle más curioso está en la transmisión. Tal como aparece dibujado, el sistema de engranajes haría que las ruedas delanteras y las traseras giraran en sentidos opuestos, de modo que el carro no podría avanzar. Algunos historiadores creen que fue un simple error; otros sugieren que Leonardo lo introdujo a propósito para que nadie pudiera construir el vehículo copiando el dibujo sin su ayuda. No hay pruebas definitivas de ninguna de las dos hipótesis.",
      "Cuando se construyen maquetas del carro, los modelistas corrigen la transmisión para que pueda moverse. El tanque real no llegó hasta el 15 de septiembre de 1916, cuando el ejército británico usó el Mark I durante la batalla del Somme, en la Primera Guerra Mundial. Para entonces existían los motores de combustión y las orugas, dos tecnologías que resolvían los problemas de potencia y de terreno que Leonardo no pudo superar con la fuerza humana."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los tanques recibieron ese nombre casi por casualidad. En 1915 y 1916 los británicos los fabricaban en secreto y, para disimular, se decía que eran depósitos de agua. En inglés, depósito se dice «tank», y la palabra se quedó para siempre. Cuatro siglos antes, Leonardo había hablado simplemente de «carri coperti», es decir, carros cubiertos." },
      { label: "Dato Científico", icon: "atom", text: "Los engranajes transmiten el giro de un eje a otro. Cuando dos ruedas dentadas engranan directamente, giran en sentidos contrarios. Para que dos ejes giren en el mismo sentido hace falta una rueda intermedia, llamada rueda loca. En el carro de Leonardo bastaría con reorganizar los engranajes de un par de ruedas para que todas empujaran hacia el mismo lado." }
    ],
    fact: "Según la anotación que acompaña al dibujo, el carro debía ser manejado por ocho hombres, que al mismo tiempo lo moverían y dispararían su artillería, y detrás de él la infantería podría avanzar protegida. La idea de combinar protección, movilidad y potencia de fuego en un solo vehículo es la misma que siguen los blindados actuales, aunque sus soluciones técnicas sean muy distintas.",
  },
  {
    id: "canal-navegacion",
    bannerImage: '/assets/davinci/infographic_m3/banner_canal-navegacion.webp',
    bannerCaption: "Leonardo estudió los canales de Milán, diseñó esclusas de compuertas en ángulo y planeó desviar el río Arno en la guerra contra Pisa.",
    title: "Canales y navegación",
    color: '#5E8CA0',
    btnImage: '/assets/davinci/infographic_m3/btn_canal-navegacion.webp',
    image: '/assets/davinci/infographic_m3/hero_canal-navegacion.webp',
    content: [
      "Milán no tiene mar ni un gran río navegable que la atraviese, pero en el siglo XV estaba conectada con los ríos Ticino y Adda mediante canales artificiales llamados navigli. El Naviglio Grande llevaba siglos en uso y transportaba, entre otras cargas, el mármol para la catedral. El Naviglio della Martesana, construido en la segunda mitad del siglo XV, unía la ciudad con el Adda. Leonardo llegó a Milán en 1482 y pronto se interesó por mejorar esa red de agua.",
      "Para que un barco suba o baje entre dos tramos de canal con distinto nivel se usa una esclusa: una cámara cerrada por dos compuertas en la que se llena o vacía el agua. Leonardo dibujó en el Códice Atlántico compuertas de dos hojas que se cierran formando una V que apunta contra la corriente, llamadas en inglés «mitre gates». La presión del agua empuja las hojas una contra otra y las mantiene selladas sin necesidad de cerrojos ni barras.",
      "Además, añadió a cada hoja una pequeña ventana con bisagra que se abría para igualar el nivel del agua a ambos lados antes de mover la compuerta, lo que reducía mucho el esfuerzo necesario. Este sistema se sigue usando en canales de todo el mundo: el canal de Panamá, inaugurado en 1914, emplea compuertas de este tipo. Algunas esclusas milanesas, como la de San Marco, se han relacionado con sus diseños, aunque los historiadores discuten hasta qué punto intervino directamente.",
      "Leonardo también pensó en hacer navegable el Adda entre el lago de Como y Milán, salvando los rápidos cercanos a Paderno. Años después, ya en Florencia, participó en un proyecto más ambicioso. En 1503-1504, durante la guerra entre Florencia y Pisa, se planeó desviar el curso del Arno para dejar a Pisa sin salida al mar y sin agua. Nicolás Maquiavelo, entonces secretario de la república florentina, apoyó la idea, y Leonardo realizó mapas y cálculos del terreno.",
      "Las obras comenzaron en agosto de 1504 con la excavación de dos grandes zanjas. Sin embargo, el responsable de los trabajos redujo la profundidad prevista, las lluvias de otoño provocaron derrumbes y el agua volvió a su cauce natural. En octubre el proyecto se abandonó tras un gasto considerable. Leonardo soñaba además con un canal navegable que uniera Florencia con el mar evitando los meandros del Arno, una idea que dejó en mapas conservados hoy en la Royal Collection de Windsor."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Para el desvío del Arno había que mover enormes cantidades de tierra. Leonardo calculó cuánta tierra podía excavar y transportar un obrero en una jornada, y diseñó máquinas excavadoras con grúas giratorias que levantaban cubos llenos. Esas cuentas muestran cómo trataba una obra pública como un problema de cálculo, y no solo de fuerza bruta." },
      { label: "Dato Científico", icon: "atom", text: "La presión del agua aumenta con la profundidad: cada 10 metros de agua añaden aproximadamente una atmósfera de presión. En una esclusa, esa presión empuja sobre toda la superficie de la compuerta. En las compuertas en ángulo, la fuerza se transmite a lo largo de las hojas hacia los muros laterales, igual que en un arco, y por eso aguantan grandes cargas siendo relativamente ligeras." }
    ],
    fact: "Las esclusas de cámara no las inventó Leonardo: en China ya se usaban en el siglo X, y en Lombardía ingenieros como Bertola da Novate habían construido esclusas en los navigli décadas antes de su llegada. Lo que aportó Leonardo fue un diseño de compuertas más eficaz y fácil de manejar. Mejorar lo que ya existe, en lugar de partir de cero, es una de las formas más habituales de avanzar en la ingeniería real.",
  },
  {
    id: "ciudad-ideal",
    bannerImage: '/assets/davinci/infographic_m3/banner_ciudad-ideal.webp',
    bannerCaption: "Tras la peste de 1484-1485 en Milán, Leonardo proyectó una ciudad en dos niveles con calles anchas, canales y servicios separados.",
    title: "La ciudad ideal",
    color: '#B08D57',
    btnImage: '/assets/davinci/infographic_m3/btn_ciudad-ideal.webp',
    image: '/assets/davinci/infographic_m3/hero_ciudad-ideal.webp',
    content: [
      "Entre 1484 y 1485, una epidemia de peste azotó Milán y causó miles de muertos. En aquella época nadie sabía que la enfermedad la provoca una bacteria, Yersinia pestis, transmitida sobre todo por las pulgas de las ratas, pero sí se observaba que golpeaba con más fuerza los barrios sucios y abarrotados. Leonardo, que vivía entonces en la ciudad, reflexionó sobre cómo debía organizarse una urbe para que sus habitantes estuvieran más sanos y protegidos.",
      "Sus ideas aparecen sobre todo en el Manuscrito B, uno de los cuadernos que se conservan en el Instituto de Francia, en París, fechado a finales de la década de 1480. Allí dibujó una ciudad organizada en dos niveles. El nivel superior estaba reservado a los peatones, con calles amplias, pórticos y edificios nobles. El nivel inferior, conectado con canales, servía para el tráfico de carros, el transporte de mercancías y la circulación de las aguas residuales.",
      "Leonardo propuso que la anchura de las calles fuera igual a la altura de las casas, para que la luz del sol y el aire llegaran hasta abajo. Las escaleras, según escribió, debían ser de caracol, porque en los rincones de las escaleras rectas la gente solía ensuciar. También pensó en un sistema de canales con compuertas para limpiar las calles con agua y en letrinas conectadas a conductos que llevaran los desechos lejos de las viviendas.",
      "Para descongestionar Milán, Leonardo sugirió a Ludovico Sforza fundar diez nuevas ciudades de 5.000 casas cada una, con 30.000 habitantes por ciudad, situadas junto a ríos y canales. Así se repartiría una población que, según escribió, vivía amontonada «como cabras», unos encima de otros, llenando todo de hedor y sembrando semillas de peste y de muerte. El proyecto nunca se llevó a cabo, porque su coste era enorme y el ducado tenía otras prioridades.",
      "Aunque la ciudad ideal de Leonardo se quedó en el papel, muchas de sus intuiciones se convirtieron en norma siglos después. Separar el tráfico de peatones y vehículos, construir redes de alcantarillado y asegurar luz y ventilación en las calles son principios básicos del urbanismo moderno. Las grandes reformas sanitarias de Londres y París en el siglo XIX, impulsadas en parte por las epidemias de cólera, aplicaron ideas parecidas con tecnología industrial."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Manuscrito B forma parte de los doce cuadernos de Leonardo que las tropas de Napoleón se llevaron de la Biblioteca Ambrosiana de Milán en 1796. Tras la caída de Napoleón, en 1815, solo regresó a Milán el Códice Atlántico; los cuadernos pequeños se quedaron en París, donde se identifican con letras de la A a la M." },
      { label: "Dato Científico", icon: "atom", text: "La peste la causa la bacteria Yersinia pestis, identificada en 1894 por Alexandre Yersin en Hong Kong. Se transmite principalmente por la picadura de pulgas que viven en roedores. Por eso las ciudades con basura acumulada, muchas ratas y casas apiñadas eran más vulnerables. Las medidas de limpieza que proponía Leonardo habrían reducido, sin que él lo supiera, el contacto entre personas, ratas y pulgas." }
    ],
    fact: "Leonardo detalló hasta el drenaje de su ciudad. En el Manuscrito B indicó que cada calle del nivel superior debía medir 20 braccia de ancho (unos 12 metros) y tener una pendiente de medio braccio desde los bordes hacia el centro. En el centro habría ranuras del ancho de un dedo por las que el agua de lluvia caería al nivel inferior. Era un sistema sencillo para evitar charcos y barro, uno de los grandes problemas de las ciudades de su tiempo.",
  },
  {
    id: "energia-hidraulica",
    bannerImage: '/assets/davinci/infographic_m3/banner_energia-hidraulica.webp',
    bannerCaption: "Leonardo estudió ruedas hidráulicas, tornillos de Arquímedes y remolinos para entender cómo aprovechar la fuerza del agua.",
    title: "La energía del agua",
    color: '#6F9C8F',
    btnImage: '/assets/davinci/infographic_m3/btn_energia-hidraulica.webp',
    image: '/assets/davinci/infographic_m3/hero_energia-hidraulica.webp',
    content: [
      "En el Renacimiento, el agua era una de las principales fuentes de energía mecánica, junto con la fuerza de personas, animales y viento. Los molinos hidráulicos movían piedras de moler grano, sierras, martillos de herrería y fuelles. Leonardo dedicó una parte muy grande de sus cuadernos a este tema. Llegó a describir el agua como el «vetturale della natura», el arriero o transportista de la naturaleza, porque la veía mover y transformar el paisaje sin descanso.",
      "Leonardo comparó distintos tipos de ruedas hidráulicas. En las de corriente inferior, el agua empuja las paletas desde abajo; en las de corriente superior, cae sobre cangilones desde arriba y aprovecha también su peso. Estudió cómo influían la altura de la caída, la cantidad de agua y la forma de las paletas en la potencia obtenida. También analizó ruedas horizontales que recuerdan, de forma lejana, a las turbinas que se desarrollarían en el siglo XIX.",
      "Otra herramienta que estudió fue el tornillo de Arquímedes, un cilindro con una hélice interior que, al girar inclinado, eleva el agua de un nivel bajo a otro más alto. Leonardo dibujó varias versiones para regar campos o vaciar zonas inundadas, y lo combinó con ruedas hidráulicas. En algunos esquemas imaginó que el agua elevada por el tornillo moviera después la rueda que hacía girar el propio tornillo, en un intento de lograr el movimiento perpetuo.",
      "Tras analizar estos y otros mecanismos, Leonardo llegó a una conclusión firme: una máquina no puede moverse para siempre sin recibir energía del exterior. Escribió una crítica dirigida a quienes buscaban el movimiento perpetuo, comparándolos con los alquimistas que intentaban fabricar oro. Tenía razón: en el siglo XIX, la ley de conservación de la energía explicó por qué en cada giro se pierde energía por rozamiento y nunca se recupera toda la que se invirtió.",
      "Leonardo no solo quería usar el agua, también quería entenderla. Observó y dibujó remolinos, olas y cascadas con gran precisión, y comparó los vórtices del agua con los rizos del cabello. En el Códice Leicester, escrito hacia 1506-1510, reunió observaciones sobre ríos, mareas, erosión y la presencia de fósiles marinos en las montañas. Hoy los especialistas en dinámica de fluidos reconocen en sus dibujos rasgos reales de la turbulencia."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Códice Leicester tiene 72 páginas, escritas en 18 hojas dobladas. Debe su nombre a Thomas Coke, más tarde conde de Leicester, que lo compró en 1719. En 1994 lo adquirió Bill Gates en una subasta por unos 30,8 millones de dólares, lo que lo convirtió en uno de los libros más caros jamás vendidos. Gran parte de sus páginas trata sobre el agua: corrientes, remolinos y erosión." },
      { label: "Dato Científico", icon: "atom", text: "Una rueda hidráulica transforma la energía potencial del agua, debida a su altura, en energía de rotación. La potencia depende de la altura de caída y del caudal, es decir, de cuántos litros pasan por segundo. Un litro de agua que cae un metro aporta unos 9,8 julios; mil litros por segundo cayendo tres metros suministran en teoría unos 29.000 vatios." }
    ],
    fact: "Leonardo dibujó una sierra hidráulica en la que una rueda movida por el agua hacía subir y bajar la hoja y, al mismo tiempo, empujaba el tronco hacia adelante. Así, la máquina cortaba madera de forma automática y continua. Los aserraderos hidráulicos ya existían en Europa desde la Edad Media, pero sus dibujos muestran cómo buscaba perfeccionar cada pieza del mecanismo.",
  },
  {
    id: "legado-ingenieria",
    bannerImage: '/assets/davinci/infographic_m3/banner_legado-ingenieria.webp',
    bannerCaption: "De sus cuadernos dispersos a las réplicas modernas, como el puente de Ås en Noruega, la ingeniería de Leonardo sigue inspirando.",
    title: "El legado del ingeniero",
    color: '#D4A843',
    btnImage: '/assets/davinci/infographic_m3/btn_legado-ingenieria.webp',
    image: '/assets/davinci/infographic_m3/hero_legado-ingenieria.webp',
    content: [
      "En 1502, Leonardo escribió al sultán otomano Bayezid II ofreciéndole construir un puente sobre el Cuerno de Oro, el estuario que separa dos partes de Estambul. Una traducción turca de esa carta se encontró en 1952 en los archivos del palacio de Topkapi. El diseño medía unos 240 metros, una longitud sin precedentes para la época, y se apoyaba en un único arco aplanado con estribos que se abrían en los extremos como la cola de una golondrina.",
      "El sultán no aceptó el proyecto, pero en 2001 el artista noruego Vebjørn Sand impulsó la construcción en Ås, al sur de Oslo, de un puente peatonal inspirado en ese dibujo. Mide unos 100 metros, está hecho de madera laminada y cruza sobre una autopista. En 2019, investigadores del Instituto Tecnológico de Massachusetts (MIT) construyeron una maqueta a escala con 126 piezas impresas en 3D, sin uniones ni argamasa, y comprobaron que el arco se sostenía por sí mismo.",
      "Leonardo murió el 2 de mayo de 1519 en Amboise, Francia, y legó sus manuscritos a su discípulo Francesco Melzi. Tras la muerte de Melzi, hacia 1570, sus herederos vendieron y regalaron los cuadernos, que acabaron repartidos por Europa. El escultor Pompeo Leoni reunió muchas hojas sueltas a finales del siglo XVI en un gran volumen, el Códice Atlántico, que hoy reúne 1.119 hojas en la Biblioteca Ambrosiana de Milán. Se estima que se conservan algo más de 7.000 páginas.",
      "Como sus cuadernos no se publicaron, muchas de sus ideas no influyeron directamente en los ingenieros de los siglos siguientes, que tuvieron que redescubrirlas por su cuenta. La investigación sobre su obra sigue abierta: en 1966 aparecieron en la Biblioteca Nacional de España, en Madrid, dos códices que se daban por perdidos, llenos de estudios de mecánica, engranajes, fortificaciones y mapas del Arno. Desde entonces se conocen como Códices de Madrid I y II.",
      "Leonardo no trabajó solo ni partió de cero. De joven, en el taller de Andrea del Verrocchio, presenció la fabricación y colocación de la esfera de cobre que corona la cúpula de la catedral de Florencia, en 1471, y dibujó las grúas que Filippo Brunelleschi había ideado para levantar esa cúpula. También leyó y anotó tratados de ingenieros como Francesco di Giorgio Martini. Su gran aportación fue un método: observar, dibujar con precisión, medir y poner a prueba cada idea."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Al final de su vida, Leonardo trabajó para el rey Francisco I de Francia, que le ofreció la mansión de Clos Lucé, junto al castillo de Amboise. Allí proyectó una nueva residencia real y una ciudad en Romorantin, con canales que la conectarían con los ríos de la región. Las obras apenas llegaron a empezar, pero el proyecto muestra que nunca dejó de pensar como urbanista e ingeniero." },
      { label: "Dato Científico", icon: "atom", text: "Un arco trabaja casi solo a compresión: cada pieza empuja contra sus vecinas y la carga se transmite hacia los apoyos. La piedra resiste muy bien la compresión pero mal la tracción, por eso los arcos de piedra duran siglos. Según el estudio del MIT, los estribos abiertos del puente del Cuerno de Oro aportaban estabilidad frente a los movimientos laterales, un problema real en una zona sísmica como Estambul." }
    ],
    fact: "Leonardo escribía con la mano izquierda y de derecha a izquierda, de forma que sus textos se leen con facilidad en un espejo. No se sabe con certeza por qué lo hacía: una explicación habitual es que, al ser zurdo, así evitaba emborronar la tinta fresca. Lo que sí sabemos es que llenó miles de páginas con preguntas, cálculos y dibujos, y que muchas de ellas siguen estudiándose hoy en universidades de todo el mundo.",
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
      hue: Math.random() > 0.5 ? '212,168,67' : '140,107,79', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#davinciGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#4FA3B5", "#C9A24B", "#8C6B4F", "#5E8CA0", "#B08D57", "#6F9C8F", "#D4A843"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#D4A843" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="davinciGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">INGENIERÍA DEL RENACIMIENTO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LEONARDO DA VINCI · RENACIMIENTO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,168,67,0.2)'}`,
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
          layoutId="activeDotDaVinciM3"
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
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A843', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A843, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A843', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_DaVinciM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/davinci/davinci_m3.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,168,67,0.12)',
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
            textAlign: 'center', color: 'rgba(212,168,67,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has completado Ingeniería del Renacimiento!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia del Renacimiento
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
