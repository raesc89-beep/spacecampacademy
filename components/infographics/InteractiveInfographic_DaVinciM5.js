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
  "Isaacson, W. (2017). Leonardo da Vinci. Simon & Schuster.",
  "Nicholl, C. (2004). Leonardo da Vinci: The Flights of the Mind. Allen Lane.",
  "Vasari, G. (1568). Le vite de' più eccellenti pittori, scultori e architettori (2.ª ed.; 1.ª ed. 1550, Torrentino). Giunti.",
  "Kemp, M. (2006). Leonardo da Vinci: The Marvellous Works of Nature and Man (ed. revisada). Oxford University Press.",
  "Pedretti, C. (1978). The Codex Atlanticus of Leonardo da Vinci: A Catalogue of Its Newly Restored Sheets. Johnson Reprint Corporation.",
  "Clark, K. (1939). Leonardo da Vinci: An Account of His Development as an Artist. Cambridge University Press."
];

const INFOGRAPHIC_NODES = [
  {
    id: "cuadernos-secretos",
    bannerImage: '/assets/davinci/infographic_m5/banner_cuadernos-secretos.webp',
    bannerCaption: "Leonardo llenó miles de páginas con dibujos, preguntas y experimentos; hoy sobreviven unas 7,000.",
    title: "Los cuadernos secretos",
    color: '#D4A843',
    btnImage: '/assets/davinci/infographic_m5/btn_cuadernos-secretos.webp',
    image: '/assets/davinci/infographic_m5/hero_cuadernos-secretos.webp',
    content: [
      "Leonardo da Vinci nació el 15 de abril de 1452 en Anchiano, una aldea cercana al pueblo de Vinci, en la Toscana. Su abuelo Antonio anotó el nacimiento en un registro familiar, con la hora y los nombres de quienes asistieron al bautizo. Era hijo de Ser Piero, un notario, y de una joven llamada Caterina, con quien su padre no estaba casado. Por ser hijo ilegítimo no pudo ir a la universidad ni seguir la profesión de notario. Esa desventaja tuvo un efecto inesperado: Leonardo aprendió observando el mundo directamente, en lugar de repetir lo que decían los libros antiguos.",
      "Desde joven llevó cuadernos a todas partes. Algunos eran pequeños y colgaban de su cinturón, para poder dibujar en la calle lo que veía: rostros, gestos, nubes o el movimiento del agua. Hoy se conservan unas 7,000 páginas, y los historiadores calculan que podrían ser solo una cuarta parte de lo que escribió. En una misma hoja aparecen cálculos de geometría, bocetos de máquinas, recetas de pintura y listas de compras. Para él no existían fronteras entre el arte y la ciencia: ambas eran maneras de entender cómo funciona la naturaleza.",
      "Sus cuadernos incluyen listas de tareas que revelan su curiosidad. En una de ellas se propuso «describir la lengua del pájaro carpintero», una pregunta que nadie le había encargado. En otras anotó que debía pedir a un maestro de aritmética que le enseñara a cuadrar un triángulo, preguntar a un experto en hidráulica cómo reparar una esclusa o un molino, y medir la ciudad de Milán. Ese hábito de hacerse preguntas concretas y buscar la respuesta con experimentos es la base de lo que hoy llamamos método científico, aunque en su época ese término aún no existía.",
      "Leonardo se llamaba a sí mismo «omo sanza lettere», un hombre sin letras, porque no dominaba el latín, el idioma de los sabios de su tiempo. En el Códice Trivulziano, que se conserva en el Castillo Sforzesco de Milán, se ven largas listas de palabras que copió para ampliar su vocabulario. Lejos de avergonzarse, defendía que la experiencia era mejor maestra que la autoridad de los libros. Escribió que quien discute citando a otros usa la memoria, no el ingenio. Esa confianza en la observación directa lo distinguió de muchos eruditos de su época.",
      "Los cuadernos nunca se publicaron mientras Leonardo vivía. Planeaba escribir tratados sobre pintura, anatomía, agua y vuelo, pero casi ninguno quedó terminado. Tras su muerte, las páginas se dispersaron, y hoy están repartidas en colecciones de Italia, Francia, Inglaterra, España y Estados Unidos. Gracias a ellas sabemos cómo pensaba: vemos sus errores, sus correcciones y las ideas que abandonó. Son como un laboratorio en papel que nos permite seguir, paso a paso, la mente de una de las personas más curiosas de la historia."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los dos Códices de Madrid estuvieron perdidos durante más de un siglo. Se guardaban en la Biblioteca Nacional de España, pero un error de catalogación hizo que nadie los localizara. En 1967 fueron redescubiertos y causaron sensación en todo el mundo, porque contenían estudios de mecánica, engranajes y relojería, además de notas sobre cómo fundir el gran caballo de bronce que Leonardo proyectó en Milán. Es un recordatorio de que en los archivos todavía pueden aparecer documentos importantes." },
      { label: "Dato Científico", icon: "atom", text: "Leonardo escribía con tinta ferrogálica, preparada con agallas de roble, sulfato de hierro y goma arábiga. Era la tinta más usada en Europa desde la Edad Media. Al secarse, el hierro reacciona con el oxígeno del aire y deja un trazo oscuro y duradero, pero con los siglos la tinta puede volverse ácida y corroer el papel. Por eso los conservadores controlan la humedad, la temperatura y la luz de las salas donde se guardan sus manuscritos, y solo los exhiben durante periodos breves." }
    ],
    fact: "Su abuelo Antonio da Vinci registró el nacimiento con una precisión notable para la época: anotó que el niño nació un sábado, a la tercera hora de la noche, y mencionó a las personas presentes en el bautizo. Gracias a esa nota familiar conocemos la fecha exacta, el 15 de abril de 1452. De muchas personas de aquel tiempo no se conoce la fecha de nacimiento, de modo que este pequeño documento es una pieza valiosa para los historiadores.",
  },
  {
    id: "zurdismo-espejo",
    bannerImage: '/assets/davinci/infographic_m5/banner_zurdismo-espejo.webp',
    bannerCaption: "Leonardo era zurdo y escribía de derecha a izquierda; para leer sus notas con facilidad hace falta un espejo.",
    title: "Zurdo y en espejo",
    color: '#B08D57',
    btnImage: '/assets/davinci/infographic_m5/btn_zurdismo-espejo.webp',
    image: '/assets/davinci/infographic_m5/hero_zurdismo-espejo.webp',
    content: [
      "Si abres uno de los cuadernos de Leonardo, al principio parece escrito en un idioma desconocido. En realidad es italiano, pero las letras van de derecha a izquierda y aparecen invertidas, como si se reflejaran en un espejo. Esta técnica se llama escritura especular. Al poner la página frente a un espejo, el texto se puede leer en la dirección habitual. Leonardo la usó durante casi toda su vida en sus notas personales, y por eso transcribir sus manuscritos ha requerido siglos de trabajo paciente por parte de especialistas.",
      "Leonardo era zurdo, y varios testimonios lo confirman. Su amigo, el matemático Luca Pacioli, elogió los dibujos hechos por su «inefable mano izquierda». Además, en sus dibujos el sombreado, es decir, las líneas paralelas que crean sombras, baja desde la esquina superior izquierda hacia la inferior derecha. Ese es el trazo natural de una persona zurda. Los expertos usan esta pista para distinguir los dibujos auténticos de Leonardo de las copias hechas por sus alumnos diestros, que trazaban las líneas en la dirección opuesta.",
      "¿Por qué escribía al revés? La explicación más aceptada es práctica. Con pluma y tinta, un zurdo que escribe de izquierda a derecha arrastra la mano sobre lo que acaba de escribir y mancha la página. Escribiendo de derecha a izquierda, la mano avanza delante de la tinta fresca. Además, como Leonardo no asistió a una escuela de latín, probablemente nadie le obligó a usar la mano derecha, algo frecuente en la enseñanza de la época. Al crecer sin esa corrección, pudo desarrollar un estilo propio, cómodo y rápido para él.",
      "Durante mucho tiempo se dijo que Leonardo escribía así para ocultar sus ideas a posibles espías. Hoy la mayoría de los historiadores considera poco probable esa teoría. Un espejo basta para descifrar el texto, de modo que no protegía ningún secreto. Además, cuando escribía algo destinado a otras personas, como cartas o documentos oficiales, Leonardo solía usar la escritura de izquierda a derecha. Lo que sí dificulta la lectura es su ortografía irregular, sus abreviaturas y su costumbre de unir o separar palabras de forma poco habitual.",
      "La escritura especular no es exclusiva de Leonardo. Algunos niños la producen de forma espontánea cuando aprenden a escribir, sobre todo los zurdos, y suele desaparecer con la práctica. Los neurocientíficos estudian este fenómeno para entender cómo el cerebro controla la dirección de los movimientos de la mano. Leonardo, en cambio, convirtió esa tendencia en una habilidad estable durante décadas. Sus páginas muestran una letra fluida, sin vacilaciones, lo que indica que para él escribir al revés era tan natural como para nosotros escribir hacia la derecha."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Códice sobre el vuelo de los pájaros, que Leonardo escribió hacia 1505 y que hoy guarda la Biblioteca Real de Turín, es un cuaderno pequeño de apenas 18 hojas escrito por completo con su característica letra especular. En él analiza cómo las aves aprovechan el viento, cómo influye el centro de gravedad y para qué sirven los movimientos de la cola. En 2013 se exhibió en el Museo Nacional del Aire y el Espacio de Washington, junto a aviones y naves que hicieron realidad su sueño de volar." },
      { label: "Dato Científico", icon: "atom", text: "Alrededor del 10 % de las personas son zurdas, una proporción que parece haberse mantenido bastante estable a lo largo de la historia. La preferencia por una mano depende de una combinación de factores genéticos y ambientales, y está relacionada con la forma en que se reparten las funciones entre los dos hemisferios del cerebro. No existe un único gen del zurdismo: los investigadores han identificado muchas variantes genéticas, y cada una de ellas influye solo un poco en el resultado final." }
    ],
    fact: "Para leer un cuaderno de Leonardo, los especialistas no solo necesitan un espejo. También deben conocer el italiano toscano del siglo XV, sus abreviaturas y las unidades de medida de la época, como el braccio, que en Florencia equivalía a unos 58 centímetros. Por eso existen transcripciones diplomáticas, que copian el texto letra por letra tal como aparece, y transcripciones críticas, que lo adaptan con ortografía moderna para que cualquier lector pueda entenderlo.",
  },
  {
    id: "aprendiz-verrocchio",
    bannerImage: '/assets/davinci/infographic_m5/banner_aprendiz-verrocchio.webp',
    bannerCaption: "Hacia 1466-1469 Leonardo entró en el taller de Andrea del Verrocchio en Florencia, donde aprendió arte y técnica.",
    title: "Aprendiz de Verrocchio",
    color: '#8C6B4F',
    btnImage: '/assets/davinci/infographic_m5/btn_aprendiz-verrocchio.webp',
    image: '/assets/davinci/infographic_m5/hero_aprendiz-verrocchio.webp',
    content: [
      "Cuando Leonardo era adolescente, su padre trabajaba como notario en Florencia. La ciudad era entonces una de las más ricas de Europa, gobernada en la práctica por la familia Médici. Según el biógrafo Giorgio Vasari, Ser Piero mostró algunos dibujos de su hijo a Andrea del Verrocchio, un artista muy respetado, que aceptó al muchacho como aprendiz. La fecha exacta no se conoce, pero los historiadores la sitúan entre 1466 y 1469, cuando Leonardo tenía entre catorce y diecisiete años. Allí pasaría más de una década de formación.",
      "Un taller del Renacimiento era muy distinto del estudio de un artista moderno. Era una empresa donde se fabricaban pinturas, esculturas en bronce y mármol, joyas, armaduras y decoraciones para fiestas. Los aprendices empezaban barriendo el suelo, moliendo pigmentos y preparando tablas de madera con yeso. Poco a poco aprendían a dibujar, a modelar en arcilla y a pintar partes de las obras del maestro. Verrocchio dominaba muchas técnicas, y Leonardo absorbió la idea de que un artista debía conocer también la geometría, la mecánica y los materiales.",
      "En 1471 el taller de Verrocchio terminó un encargo extraordinario: colocar una gran esfera de cobre dorado en la punta de la cúpula de la catedral de Florencia, diseñada décadas antes por Filippo Brunelleschi. Subir y fijar aquella bola a más de cien metros de altura exigía grúas y poleas ingeniosas. Leonardo presenció el trabajo, y años después recordó en sus cuadernos cómo se soldaron las piezas de la esfera usando espejos que concentraban la luz del sol. Varias máquinas de elevación de Brunelleschi aparecen dibujadas en sus páginas.",
      "La obra más famosa de esta etapa es el «Bautismo de Cristo», pintado hacia 1475 y conservado hoy en la Galería de los Uffizi de Florencia. Verrocchio encargó a Leonardo el ángel situado más a la izquierda. Ese ángel destaca por la suavidad del rostro, el brillo del cabello y el giro natural del cuerpo. Los análisis técnicos indican que Leonardo usó pintura al óleo, entonces una novedad en Florencia, mientras que gran parte del cuadro se hizo con temple de huevo. Vasari contó que Verrocchio dejó de pintar al ver ese ángel, aunque probablemente sea una leyenda.",
      "En 1472 Leonardo fue inscrito en la Compañía de San Lucas, la cofradía de los pintores de Florencia. Esto le permitía trabajar como maestro independiente, aunque siguió colaborando con Verrocchio algunos años más. De esta época son la «Anunciación», también en los Uffizi, y su primer dibujo fechado: un paisaje del valle del Arno con la fecha del 5 de agosto de 1473. En ese dibujo ya se nota su interés por la atmósfera, la luz y la forma del terreno, temas que estudiaría durante toda su vida."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Vasari cuenta que, siendo muy joven, Leonardo pintó un escudo de madera con una criatura monstruosa inventada a partir de lagartos, grillos, serpientes, mariposas y murciélagos que había reunido en su habitación. Según el relato, el resultado era tan realista que asustó a su propio padre. No sabemos si la historia es exacta, porque Vasari escribió décadas después y le gustaban las anécdotas llamativas, pero refleja la fama de Leonardo como observador minucioso de los animales." },
      { label: "Dato Científico", icon: "atom", text: "La pintura al óleo usa pigmentos mezclados con aceites secantes, como el de linaza o el de nuez. A diferencia del temple de huevo, que seca en minutos, el óleo tarda días en endurecerse porque el aceite reacciona con el oxígeno del aire, un proceso llamado polimerización oxidativa. Esa lentitud permitía a Leonardo aplicar capas muy finas y transparentes, llamadas veladuras, para crear transiciones suaves entre luz y sombra. Esta técnica de contornos difuminados se conoce como sfumato." }
    ],
    fact: "Andrea del Verrocchio no fue solo pintor. Su obra más célebre es una escultura: la estatua ecuestre en bronce del condotiero Bartolomeo Colleoni, en Venecia, que se terminó después de la muerte del maestro en 1488. También creó un David de bronce que algunos historiadores creen inspirado en el aspecto del joven Leonardo, aunque no hay pruebas definitivas. En su taller se formaron o colaboraron otros artistas importantes, como Perugino y Lorenzo di Credi.",
  },
  {
    id: "mecenazgo-sforza",
    bannerImage: '/assets/davinci/infographic_m5/banner_mecenazgo-sforza.webp',
    bannerCaption: "De 1482 a 1499 Leonardo trabajó en Milán para Ludovico Sforza como ingeniero, escultor, pintor y escenógrafo.",
    title: "Al servicio de los Sforza",
    color: '#C9A24B',
    btnImage: '/assets/davinci/infographic_m5/btn_mecenazgo-sforza.webp',
    image: '/assets/davinci/infographic_m5/hero_mecenazgo-sforza.webp',
    content: [
      "Hacia 1482, con unos treinta años, Leonardo se trasladó a Milán. Se conserva el borrador de una carta dirigida al gobernante de la ciudad, Ludovico Sforza, llamado «il Moro», en la que ofrecía sus servicios. Lo curioso es lo que destacó: en diez puntos describió puentes portátiles, métodos para vaciar fosos, cañones, carros blindados y catapultas. Solo al final mencionó que también sabía pintar y esculpir. Milán vivía rodeada de amenazas militares, y Leonardo sabía que un ingeniero resultaba más atractivo para un gobernante que un pintor.",
      "En la corte de los Sforza, Leonardo hizo un poco de todo. Diseñó escenografías y vestuario para fiestas, como la «Fiesta del Paraíso» de 1490, en la que actores vestidos de dioses representaban a los planetas en movimiento. También estudió canales y esclusas para la red de navegación de Milán, proyectó ciudades ideales con calles a dos niveles para separar a peatones y carros, y retrató a personas de la corte. Uno de esos retratos es la «Dama del armiño», que muestra a Cecilia Gallerani y se conserva en Cracovia, Polonia.",
      "El encargo más ambicioso fue un monumento ecuestre en honor de Francesco Sforza, padre de Ludovico. Leonardo quería que fuera el caballo de bronce más grande jamás fundido. Estudió durante años la anatomía de los caballos de los establos ducales, y en 1493 presentó un modelo de arcilla de unos siete metros de altura que asombró a la ciudad. Para fundirlo calculó que necesitaría decenas de toneladas de bronce, y diseñó un método para hacerlo de una sola vez, enterrando el molde boca abajo en un foso.",
      "El caballo nunca se fundió. En 1494, ante la amenaza de una invasión francesa, el bronce reunido para la estatua se envió a Ferrara para fabricar cañones. En 1499 las tropas del rey Luis XII de Francia ocuparon Milán y Ludovico huyó. Según los cronistas, los arqueros franceses usaron el modelo de arcilla como blanco de prácticas y lo destrozaron. Cinco siglos después, en 1999, se inauguró en Milán una gran estatua de bronce inspirada en los dibujos de Leonardo, gracias a un proyecto iniciado por el estadounidense Charles Dent.",
      "En Milán pintó también «La Última Cena», en el refectorio del convento de Santa Maria delle Grazie, entre 1495 y 1498. En lugar de usar el fresco, que obliga a pintar rápido sobre yeso húmedo, Leonardo experimentó con temple y óleo sobre la pared seca para trabajar despacio y corregir. El resultado fue magnífico, pero en pocas décadas la pintura ya mostraba daños graves. Una restauración que duró de 1978 a 1999 recuperó lo que quedaba del original. La escena capta el instante en que Jesús anuncia que uno de los apóstoles lo traicionará."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El «Hombre de Vitruvio», uno de los dibujos más reproducidos del mundo, también nació en Milán, hacia 1490. Ilustra las proporciones del cuerpo humano descritas por Vitruvio, un arquitecto romano del siglo I a. C.: un hombre con brazos y piernas extendidos que encaja a la vez en un círculo y en un cuadrado. El original es frágil y se guarda en las Galerías de la Academia de Venecia, donde solo se exhibe en ocasiones especiales para protegerlo de la luz." },
      { label: "Dato Científico", icon: "atom", text: "En la Última Cena, Leonardo aplicó la perspectiva lineal: todas las líneas del techo y de las paredes convergen en un único punto de fuga, situado junto a la cabeza de Jesús. Este recurso geométrico dirige la mirada del espectador hacia el centro de la escena. Los restauradores encontraron en el yeso un pequeño agujero justo en ese punto, donde probablemente Leonardo clavó un clavo y ató cuerdas para trazar con exactitud las líneas de la perspectiva." }
    ],
    fact: "En Milán, Leonardo conoció al matemático Luca Pacioli, con quien estudió geometría y proporciones. Para el libro de Pacioli «De divina proportione», publicado en Venecia en 1509, Leonardo dibujó unas sesenta ilustraciones de sólidos geométricos, mostrados como estructuras huecas para que se vieran todas sus aristas. Fueron las únicas ilustraciones suyas que se imprimieron mientras vivía, y ayudaron a difundir el estudio de los poliedros entre artistas y científicos.",
  },
  {
    id: "exilio-final",
    bannerImage: '/assets/davinci/infographic_m5/banner_exilio-final.webp',
    bannerCaption: "Tras dejar Milán, Leonardo vivió en Venecia, Florencia y Roma, y pasó sus últimos años en Clos Lucé, Amboise.",
    title: "Viajes y exilio final",
    color: '#9C7E5A',
    btnImage: '/assets/davinci/infographic_m5/btn_exilio-final.webp',
    image: '/assets/davinci/infographic_m5/hero_exilio-final.webp',
    content: [
      "Cuando los franceses tomaron Milán en 1499, Leonardo comenzó una etapa de viajes. Primero pasó por Mantua, donde dibujó un retrato de la marquesa Isabella d'Este, y en 1500 llegó a Venecia. La República temía un ataque del Imperio otomano, y Leonardo estudió cómo defender su frontera oriental: propuso construir una presa móvil en el río Isonzo para inundar la zona ante los invasores. También dibujó un traje de buceo con un tubo para respirar, pensado para atacar barcos enemigos desde debajo del agua.",
      "De vuelta en Florencia, en 1502 trabajó durante unos meses como ingeniero militar para Cesare Borgia, hijo del papa Alejandro VI. Para él trazó un mapa de la ciudad de Imola tan exacto que parece visto desde el aire, algo extraordinario para la época. Midió las calles con instrumentos y brújula, y dibujó el plano en vista cenital. En 1503 el gobierno florentino le encargó un gran mural sobre la batalla de Anghiari para el Palazzo Vecchio, mientras Miguel Ángel debía pintar otro en la misma sala. Ninguno de los dos llegó a terminarlo.",
      "Hacia 1503 Leonardo empezó el retrato de Lisa Gherardini, esposa del comerciante florentino Francesco del Giocondo, de donde vienen los nombres «Mona Lisa» y «La Gioconda». Nunca lo entregó: lo llevó consigo durante años y siguió retocándolo casi hasta el final de su vida. Entre 1506 y 1513 volvió a Milán, ahora al servicio de los gobernantes franceses, y allí avanzó en sus estudios de anatomía, geología e hidráulica. Según escribió, llegó a diseccionar unos treinta cadáveres para entender músculos, huesos y órganos.",
      "En 1513 se trasladó a Roma bajo la protección de Giuliano de Médici, hermano del papa León X. Vivió en el Belvedere, dentro del Vaticano, donde estudió espejos, óptica y botánica, pero recibió pocos encargos importantes. En 1516 aceptó la invitación del joven rey Francisco I de Francia, gran admirador suyo. Cruzó los Alpes con sus cuadernos y algunas pinturas, entre ellas la Mona Lisa, y se instaló en el Clos Lucé, una mansión junto al castillo real de Amboise. El rey le concedió una pensión y el título de primer pintor, ingeniero y arquitecto del rey.",
      "En Francia, Leonardo diseñó un palacio para la ciudad de Romorantin, con canales para controlar el agua, y organizó fiestas para la corte. Murió en Amboise el 2 de mayo de 1519, a los 67 años. Vasari contó que falleció en brazos del rey, pero los documentos sugieren que ese día Francisco I estaba en otro lugar, así que la escena se considera una leyenda. En su testamento dejó sus cuadernos, dibujos e instrumentos a Francesco Melzi, su fiel discípulo. Una lápida en la capilla de Saint-Hubert del castillo de Amboise señala dónde se cree que reposan sus restos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En octubre de 1517, Antonio de Beatis, secretario del cardenal Luis de Aragón, visitó a Leonardo en Clos Lucé y dejó un relato valioso. Escribió que el maestro les mostró tres pinturas, entre ellas el retrato de una dama florentina, y una gran cantidad de cuadernos sobre anatomía, agua y máquinas. También anotó que Leonardo tenía la mano derecha paralizada; como era zurdo, aún podía dibujar y seguía enseñando a sus alumnos, aunque ya no pintaba con la delicadeza de antes." },
      { label: "Dato Científico", icon: "atom", text: "La Mona Lisa está pintada sobre una tabla de álamo de unos 77 por 53 centímetros. Los análisis con fluorescencia de rayos X han mostrado que Leonardo aplicó veladuras extremadamente finas, algunas de apenas uno o dos micrómetros, con muy poco pigmento. Superponiendo muchas capas logró sombras suaves sin pinceladas visibles. La neurocientífica Margaret Livingstone explicó que esas sombras difusas hacen que la sonrisa parezca cambiar según la miremos de frente o con la visión periférica." }
    ],
    fact: "La Mona Lisa fue robada del Museo del Louvre en 1911 por Vincenzo Peruggia, un trabajador italiano que se escondió en el museo y salió con la tabla oculta bajo su ropa. Estuvo desaparecida más de dos años, hasta que Peruggia intentó venderla en Florencia en 1913 y fue detenido. El robo ocupó las portadas de los periódicos durante meses y contribuyó a que se convirtiera en la pintura más famosa del mundo.",
  },
  {
    id: "codex-atlanticus",
    bannerImage: '/assets/davinci/infographic_m5/banner_codex-atlanticus.webp',
    bannerCaption: "El Códice Atlántico reúne 1,119 folios de Leonardo; lo compiló Pompeo Leoni y se guarda en la Ambrosiana de Milán.",
    title: "El Códice Atlántico",
    color: '#A88B5E',
    btnImage: '/assets/davinci/infographic_m5/btn_codex-atlanticus.webp',
    image: '/assets/davinci/infographic_m5/hero_codex-atlanticus.webp',
    content: [
      "Francesco Melzi, un joven aristócrata de Lombardía, entró al servicio de Leonardo hacia 1506 y lo acompañó hasta su muerte. Al heredar los manuscritos, los llevó a su villa de Vaprio d'Adda, cerca de Milán, y los cuidó durante unos cincuenta años. Con ellos preparó una recopilación de textos sobre pintura, conocida como «Tratado de la pintura», que circuló en copias manuscritas y se imprimió en París en 1651. Melzi mostraba los cuadernos a los visitantes interesados, pero nunca logró publicar el resto del material.",
      "Tras la muerte de Melzi, hacia 1570, sus herederos no valoraron aquellos papeles, y según las crónicas quedaron guardados sin cuidado en la villa. Varias personas se llevaron hojas, y muchas terminaron en manos del escultor Pompeo Leoni, que trabajaba para el rey Felipe II de España. A finales del siglo XVI, Leoni recortó y pegó cientos de hojas sueltas en grandes álbumes. Uno de ellos recibió el nombre de Códice Atlántico porque sus páginas tenían el tamaño de las usadas en los atlas geográficos. Otro álbum acabó en la colección real británica del castillo de Windsor.",
      "El Códice Atlántico tiene 1,119 folios y es la mayor colección de papeles de Leonardo que existe. Abarca casi toda su vida adulta, aproximadamente desde 1478 hasta 1519. En 1637 el noble Galeazzo Arconati lo donó a la Biblioteca Ambrosiana de Milán, fundada pocas décadas antes por el cardenal Federico Borromeo. En 1796 las tropas de Napoleón se lo llevaron a París junto con otros manuscritos. Tras la caída de Napoleón, en 1815, el Códice Atlántico regresó a Milán, pero otros doce cuadernos se quedaron en el Instituto de Francia, donde siguen hoy.",
      "En la década de 1960 se decidió restaurar el códice, porque el pegamento y el papel de los álbumes estaban dañando las hojas. Los restauradores despegaron cada folio y lo montaron por separado, lo que permitió ver dibujos y notas ocultos en el reverso. El historiador Carlo Pedretti publicó en 1978 un catálogo detallado de las hojas restauradas. En el códice aparecen máquinas voladoras, armas, sistemas hidráulicos, estudios de geometría, mecanismos de relojería, borradores de cartas y listas de los libros que Leonardo poseía.",
      "Entre los diseños más conocidos del Códice Atlántico está un paracaídas con forma de pirámide, de tela de lino sobre un armazón de madera, de unos siete metros de lado. Leonardo anotó que con él una persona podría lanzarse desde cualquier altura sin hacerse daño. En el año 2000, el paracaidista británico Adrian Nicholas construyó una réplica con materiales disponibles en el Renacimiento y saltó desde un globo sobre Sudáfrica. El paracaídas funcionó; por seguridad, Nicholas se separó de él cerca del suelo y aterrizó con uno moderno."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Códice Leicester es el único gran manuscrito científico de Leonardo en manos privadas. Tiene 72 páginas escritas hacia 1506-1510 y trata sobre el agua, los fósiles y la astronomía. Debe su nombre a Thomas Coke, que lo compró en 1719 y más tarde fue nombrado conde de Leicester. En 1980 lo adquirió el empresario Armand Hammer, y en 1994 Bill Gates lo compró en una subasta por 30.8 millones de dólares. Gates lo presta con regularidad a museos de distintos países para que el público pueda verlo." },
      { label: "Dato Científico", icon: "atom", text: "En el Códice Leicester, Leonardo explicó la luz cenicienta de la Luna: el brillo tenue que permite ver la parte oscura del disco lunar cuando solo se ilumina un delgado creciente. Propuso que esa luz era luz solar reflejada primero por la Tierra y después por la Luna. La idea del reflejo terrestre es correcta, aunque él pensaba que los océanos eran los principales reflectores, y hoy sabemos que las nubes reflejan mucha más luz. Michael Maestlin y Johannes Kepler difundieron esa explicación casi un siglo después." }
    ],
    fact: "Leonardo dibujó en el Códice Atlántico un carro que se movía solo gracias a resortes enrollados, parecidos a los de un reloj. Durante siglos nadie entendió bien cómo funcionaba. En 2004, un equipo del Museo de Historia de la Ciencia de Florencia, dirigido por Paolo Galluzzi, construyó un modelo que funcionó: el carro avanzaba y podía programarse para girar siguiendo una ruta fijada de antemano. Por eso algunos lo consideran un antepasado lejano de los robots.",
  },
  {
    id: "legado-universal",
    bannerImage: '/assets/davinci/infographic_m5/banner_legado-universal.webp',
    bannerCaption: "Más de 500 años después, Leonardo inspira a científicos e ingenieros; su nombre está en la Luna y en el espacio.",
    title: "Un legado universal",
    color: '#E0B860',
    btnImage: '/assets/davinci/infographic_m5/btn_legado-universal.webp',
    image: '/assets/davinci/infographic_m5/hero_legado-universal.webp',
    content: [
      "Muchas ideas de Leonardo no se conocieron hasta siglos después, porque sus cuadernos permanecieron ocultos. Sus dibujos anatómicos, conservados en la Colección Real de Windsor, son un ejemplo. Dibujó la columna vertebral con sus curvaturas correctas y representó el corazón con cuatro cavidades. Vertió cera en los ventrículos del cerebro de un buey para obtener un molde, y construyó un modelo de vidrio para estudiar el paso del agua por la válvula aórtica. En el siglo XXI, cirujanos cardíacos comprobaron que su descripción de los remolinos de sangre en esa válvula era acertada.",
      "Leonardo también fue un precursor de la ingeniería moderna. Estudió la fricción y anotó que depende del peso y del tipo de superficie, pero no del área de contacto, una ley que el francés Guillaume Amontons volvió a descubrir en 1699. Diseñó rodamientos de bolas para reducir el rozamiento, engranajes, bombas y máquinas para excavar canales. No todos sus inventos habrían funcionado tal como los dibujó, y muchos nunca se construyeron. Aun así, su forma de descomponer las máquinas en piezas básicas, como palancas, poleas y tornillos, anticipó el enfoque de los ingenieros actuales.",
      "El vuelo fue una de sus grandes obsesiones. Observó cómo los pájaros aprovechan el viento y cambian la posición de las alas y la cola para mantener el equilibrio. Dibujó ornitópteros, máquinas en las que una persona movería unas alas con la fuerza de sus músculos, y una hélice aérea parecida a un tornillo gigante, a menudo considerada antecesora del helicóptero. Hoy sabemos que los músculos humanos no tienen fuerza suficiente para volar batiendo alas. Pero su idea de estudiar la naturaleza para resolver problemas técnicos es lo que hoy llamamos biomimética.",
      "El nombre de Leonardo ha llegado hasta el espacio. Un cráter de la Luna se llama Da Vinci, y el asteroide 3000 Leonardo, que orbita alrededor del Sol entre Marte y Júpiter, también lo honra. En la Estación Espacial Internacional hay un módulo construido en Italia llamado Leonardo, que primero transportó carga en los transbordadores de la NASA y desde 2011 está acoplado de forma permanente como almacén. Que un cráter, un asteroide y un módulo espacial lleven su nombre muestra que se le reconoce como símbolo de la curiosidad científica.",
      "El legado más importante de Leonardo quizá no sea una pintura ni una máquina, sino su manera de pensar. Observaba con paciencia, hacía preguntas concretas, dibujaba para entender y aceptaba que podía equivocarse. Dejó muchos proyectos sin terminar, pero cada intento le enseñaba algo nuevo. Hoy se le atribuyen menos de veinte pinturas, frente a miles de páginas de notas. Esa proporción revela lo que más le importaba: no el resultado final, sino el proceso de descubrir cómo funciona el mundo. Y esa curiosidad es algo que cualquiera puede practicar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hacia 1502, Leonardo propuso al sultán otomano Bayezid II un puente de un solo arco, de unos 240 metros, para cruzar el Cuerno de Oro en Estambul. Nunca se construyó, pero en 2001 el artista noruego Vebjørn Sand inauguró en Ås, Noruega, un puente peatonal más pequeño basado en ese diseño. En 2019, ingenieros del MIT demostraron con un modelo a escala que el puente original se habría sostenido por sí solo, gracias únicamente a la geometría de sus bloques." },
      { label: "Dato Científico", icon: "atom", text: "Leonardo dibujó con gran detalle los remolinos del agua. Observó que el agua turbulenta forma vórtices grandes y pequeños que se mezclan entre sí. Este fenómeno, llamado turbulencia, sigue siendo uno de los grandes problemas abiertos de la física. Los científicos actuales, que lo estudian con superordenadores, señalan que sus dibujos anticipaban la idea de que la energía pasa de los remolinos grandes a otros cada vez más pequeños, una teoría que el matemático Andréi Kolmogórov formalizó en 1941." }
    ],
    fact: "En el Códice Leicester, Leonardo razonó que las conchas marinas fósiles encontradas en las montañas de Italia no podían haber llegado allí por el diluvio bíblico. Observó que aparecían en capas distintas, que algunas conservaban ambas valvas unidas y que había rastros de gusanos que se movieron por el barro. Concluyó que esas tierras habían estado bajo el mar. Por estas observaciones se le considera un pionero de la paleontología y de la icnología, el estudio de las huellas fósiles.",
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
          const colors = ["#D4A843", "#B08D57", "#8C6B4F", "#C9A24B", "#9C7E5A", "#A88B5E", "#E0B860"];
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
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL GENIO ETERNO</text>
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
          layoutId="activeDotDaVinciM5"
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
export default function InteractiveInfographic_DaVinciM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/davinci/davinci_m5.webp)',
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
              🏆 ¡Has completado El Genio Eterno!
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
