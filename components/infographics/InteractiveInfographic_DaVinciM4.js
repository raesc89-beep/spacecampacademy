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
  "Isaacson, W. (2017). Leonardo da Vinci. Simon & Schuster.",
  "Zöllner, F. (2003). Leonardo da Vinci, 1452-1519: The Complete Paintings and Drawings. Taschen.",
  "Nicholl, C. (2004). Leonardo da Vinci: Flights of the Mind. Allen Lane.",
  "Leonardo da Vinci (1651). Trattato della pittura (compilado a partir de la selección de Francesco Melzi, Codex Urbinas Latinus 1270). París: Giacomo Langlois.",
  "de Viguerie, L., Walter, P., Laval, E., Mottin, B. y Solé, V. A. (2010). Revealing the sfumato technique of Leonardo da Vinci by X-ray fluorescence spectroscopy. Angewandte Chemie International Edition, 49(35), 6125-6128.",
  "Livingstone, M. S. (2000). Is it warm? Is it real? Or just low spatial frequency? Science, 290(5495), 1299.",
  "Brambilla Barcilon, P. y Marani, P. C. (2001). Leonardo: The Last Supper. University of Chicago Press.",
  "Eloy, C. (2011). Leonardo's rule, self-similarity, and wind-induced stresses in trees. Physical Review Letters, 107(25), 258101."
];

const INFOGRAPHIC_NODES = [
  {
    id: "sfumato-tecnica",
    bannerImage: '/assets/davinci/infographic_m4/banner_sfumato-tecnica.webp',
    bannerCaption: "El sfumato funde luces y sombras sin contornos duros mediante capas de veladura finísimas.",
    title: "El Sfumato: pintar con humo",
    color: '#8FAF7A',
    btnImage: '/assets/davinci/infographic_m4/btn_sfumato-tecnica.webp',
    image: '/assets/davinci/infographic_m4/hero_sfumato-tecnica.webp',
    content: [
      "La palabra sfumato viene del italiano fumo, que significa humo. Describe una manera de pintar en la que los contornos no se marcan con una línea, sino que la luz pasa a la sombra de forma gradual, como si una neblina envolviera las figuras. Leonardo da Vinci, nacido en Vinci en 1452, llevó esta técnica más lejos que ningún pintor de su tiempo. En sus notas defendía que en la naturaleza no existen líneas negras alrededor de los objetos: lo que vemos son cambios de luz y de color.",
      "Para lograr ese efecto, Leonardo trabajaba con pintura al óleo, una técnica que los pintores flamencos habían perfeccionado en el siglo XV. El óleo seca despacio, lo que permite corregir y superponer capas durante semanas. Sobre una base clara aplicaba veladuras: capas muy diluidas y casi transparentes de pigmento mezclado con aceite. Cada veladura oscurecía un poco la anterior, de modo que la sombra se construía poco a poco, igual que cuando colocas varias hojas de papel de seda una encima de otra.",
      "En 2010, un equipo del Centro de Investigación y Restauración de los Museos de Francia (C2RMF), con el químico Philippe Walter y la investigadora Laurence de Viguerie, analizó varios rostros pintados por Leonardo y conservados en el Louvre, entre ellos el de la Gioconda. Utilizaron fluorescencia de rayos X, una técnica que identifica los elementos químicos de la pintura sin tocar ni dañar la obra. Así pudieron calcular el grosor de cada capa sin tomar una sola muestra del cuadro.",
      "Los resultados fueron sorprendentes. Algunas veladuras medían solo uno o dos micrómetros, es decir, una o dos milésimas de milímetro. En ciertas zonas de sombra se superponían hasta una treintena de capas, y aun así el grosor total era menor de cuarenta micrómetros, menos que el diámetro de un cabello. El estudio comprobó además que la cantidad de pigmento oscuro aumenta de forma gradual desde las zonas iluminadas hacia las sombras. Aplicar y dejar secar tantas capas requería mucho tiempo.",
      "El sfumato tiene también una explicación desde la ciencia de la visión. Nuestro ojo solo enfoca con nitidez en una zona pequeña del centro de la retina, llamada fóvea; el resto del campo visual se percibe más borroso. En el año 2000, la neurocientífica Margaret Livingstone, de la Universidad de Harvard, propuso que la sonrisa de la Gioconda parece más evidente cuando miramos sus ojos, porque la visión periférica capta mejor las sombras difuminadas de la boca. Leonardo pintaba lo que el ojo realmente percibe."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Leonardo se formó en Florencia en el taller de Andrea del Verrocchio, donde los aprendices molían pigmentos, preparaban tablas y copiaban modelos. Según Giorgio Vasari, autor de las Vidas de los artistas (1550), en el Bautismo de Cristo de Verrocchio el joven Leonardo pintó uno de los ángeles arrodillados. Ese ángel, conservado hoy en la Galería Uffizi, ya muestra un modelado suave del rostro que anticipa el sfumato de sus obras maduras." },
      { label: "Dato Científico", icon: "atom", text: "La fluorescencia de rayos X funciona así: un haz de rayos X golpea la superficie del cuadro y excita los átomos de los pigmentos. Al volver a su estado normal, cada átomo emite rayos X con una energía característica, como si fuera su huella dactilar. Midiendo esas energías, los científicos saben qué elementos hay (hierro, plomo, cobre, manganeso) y en qué cantidad. Combinando estos datos con modelos matemáticos se calcula el grosor de las capas sin tocar la pintura." }
    ],
    fact: "El sfumato no es solo un truco artístico, sino un experimento óptico. Leonardo observó que, a medida que un objeto se aleja o que la luz disminuye, sus bordes se vuelven menos definidos. Reproducir ese efecto exigía controlar el grosor de capas invisibles a simple vista. Más de quinientos años después, los laboratorios necesitan instrumentos de física atómica para medir lo que él lograba con un pincel, aceite y una enorme paciencia.",
  },
  {
    id: "la-gioconda",
    bannerImage: '/assets/davinci/infographic_m4/banner_la-gioconda.webp',
    bannerCaption: "La Gioconda: óleo sobre tabla de álamo de 77 x 53 cm, pintado hacia 1503-1519 y conservado en el Louvre.",
    title: "La Gioconda: un retrato bajo el microscopio",
    color: '#C9A24B',
    btnImage: '/assets/davinci/infographic_m4/btn_la-gioconda.webp',
    image: '/assets/davinci/infographic_m4/hero_la-gioconda.webp',
    content: [
      "La Gioconda, también llamada Mona Lisa, es probablemente el cuadro más famoso del mundo. Leonardo empezó a pintarla en Florencia hacia 1503 y siguió retocándola durante años, posiblemente hasta poco antes de su muerte en 1519. Es un óleo sobre una tabla de madera de álamo que mide 77 por 53 centímetros, un tamaño bastante más pequeño de lo que muchos visitantes imaginan. Se conserva en el Museo del Louvre, en París, protegida tras un cristal y en condiciones de temperatura y humedad controladas.",
      "La mayoría de los historiadores identifica a la retratada con Lisa Gherardini, esposa del comerciante florentino de seda Francesco del Giocondo. De ese apellido procede el nombre de Gioconda, y Mona es una contracción de madonna, que significa señora. Leonardo nunca entregó el retrato al cliente: lo llevó consigo cuando se trasladó a Francia en 1516, invitado por el rey Francisco I. Tras la muerte del artista, la obra pasó a la colección real francesa y, después de la Revolución, al Louvre.",
      "La tabla es casi tan interesante como la pintura. El álamo era una madera habitual en Italia para pintar, pero reacciona a los cambios de humedad: se hincha y se contrae. Con los siglos, la tabla de la Gioconda se ha curvado ligeramente y presenta una grieta en la parte superior que los conservadores vigilan con atención. Por eso el cuadro descansa en un marco que permite el movimiento natural de la madera, y su vitrina mantiene un clima estable para evitar nuevas tensiones.",
      "El 21 de agosto de 1911, la Gioconda desapareció del Louvre. El ladrón era Vincenzo Peruggia, un vidriero italiano que había trabajado en el museo. Se escondió en el edificio, descolgó el cuadro y salió con él bajo su ropa de trabajo. Durante más de dos años nadie supo dónde estaba. En diciembre de 1913, Peruggia intentó venderlo a un anticuario de Florencia, que avisó a las autoridades. El robo y la recuperación llenaron las portadas de los periódicos y convirtieron el retrato en un icono mundial.",
      "Desde el punto de vista técnico, la Gioconda resume muchas investigaciones de Leonardo. El rostro y las manos están modelados con sfumato, sin contornos marcados. El paisaje del fondo se vuelve más azulado y difuso a medida que se aleja, un ejemplo de perspectiva aérea. Además, el horizonte de la izquierda parece situado a distinta altura que el de la derecha, un detalle que hace que la figura parezca cambiar ligeramente según dónde miremos. Cada elemento del cuadro funciona como una lección de óptica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2005, un investigador de la Biblioteca de la Universidad de Heidelberg encontró una nota escrita en 1503 por Agostino Vespucci, funcionario florentino, en el margen de un libro de Cicerón. En ella comparaba a Leonardo con el pintor griego Apeles y mencionaba que estaba trabajando en una cabeza de Lisa del Giocondo. Este documento ayudó a confirmar la identidad de la retratada y la fecha en que se empezó el cuadro." },
      { label: "Dato Científico", icon: "atom", text: "Para estudiar la Gioconda sin dañarla, los científicos usan reflectografía infrarroja, que atraviesa las capas de pintura y revela el dibujo preparatorio y los cambios de composición, llamados pentimenti. En 2006 se presentaron los resultados de un escaneo de alta resolución realizado con científicos canadienses: la retratada lleva un velo transparente muy fino sobre el cabello y los hombros. El barniz ha amarilleado con el tiempo, así que los colores originales eran más frescos." }
    ],
    fact: "Desde 2005, la Gioconda se expone en la Sala de los Estados del Louvre, una de las salas más grandes del museo, y recibe la visita de millones de personas cada año. Su fama no se debe a un solo motivo: combina una técnica pictórica innovadora, un misterio sobre la identidad de la modelo, un robo espectacular en 1911 y siglos de estudios científicos. Es un buen ejemplo de cómo una obra de arte puede convertirse también en un objeto de investigación.",
  },
  {
    id: "perspectiva-matematica",
    bannerImage: '/assets/davinci/infographic_m4/banner_perspectiva-matematica.webp',
    bannerCaption: "La perspectiva lineal usa la geometría para que líneas paralelas converjan en un punto de fuga y creen profundidad.",
    title: "Perspectiva: la geometría de la mirada",
    color: '#6E8B6A',
    btnImage: '/assets/davinci/infographic_m4/btn_perspectiva-matematica.webp',
    image: '/assets/davinci/infographic_m4/hero_perspectiva-matematica.webp',
    content: [
      "Antes del Renacimiento, muchos pintores representaban el espacio de manera intuitiva: las figuras importantes eran más grandes y los edificios no seguían reglas fijas. A comienzos del siglo XV, el arquitecto florentino Filippo Brunelleschi realizó un experimento famoso. Pintó una vista del Baptisterio de Florencia en una tabla, le hizo un pequeño agujero y pidió a los observadores que miraran a través de él hacia un espejo. La imagen reflejada coincidía con el edificio real. Había encontrado un método geométrico para representar la profundidad.",
      "En 1435, el humanista Leon Battista Alberti explicó ese método por escrito en su tratado De pictura, que al año siguiente tradujo al italiano. Alberti proponía imaginar el cuadro como una ventana abierta a través de la cual se ve la escena. Las líneas paralelas que se alejan del espectador, como los bordes de un suelo de baldosas, deben converger en un único punto situado a la altura de los ojos: el punto de fuga. Así, un problema artístico se convertía en un problema de geometría.",
      "Leonardo conocía bien estas ideas y las llevó más allá. En sus cuadernos escribió que la perspectiva es la brida y el timón de la pintura, es decir, lo que la guía y la controla. Estudió cómo disminuye el tamaño aparente de un objeto con la distancia y distinguió tres tipos de perspectiva: la lineal, que reduce el tamaño de las cosas; la del color, que cambia los tonos con la distancia; y la de la pérdida de nitidez, que difumina los contornos de lo que está lejos.",
      "Uno de sus estudios más conocidos es el dibujo preparatorio para la Adoración de los Magos, conservado en la Galería Uffizi de Florencia. En él trazó una cuadrícula en perspectiva sobre la que colocó escaleras, arcos, caballos y personas. Las líneas convergen con precisión hacia el fondo, como un esqueleto geométrico que sostiene toda la escena. Este tipo de dibujo muestra que, para Leonardo, una pintura empezaba por un cálculo cuidadoso antes de añadir un solo color.",
      "En Milán, Leonardo trabó amistad con el matemático Luca Pacioli, que le ayudó a profundizar en la geometría de Euclides. Pacioli escribió el tratado De divina proportione, dedicado a la proporción que hoy llamamos áurea, y Leonardo dibujó para él unas sesenta ilustraciones de poliedros, cuerpos geométricos con caras planas. El libro se imprimió en Venecia en 1509. Leonardo representó cada sólido de dos formas: macizo y hueco, mostrando solo sus aristas como si fueran varillas, lo que permitía ver su estructura interior."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Hombre de Vitruvio, dibujado hacia 1490, se basa en las proporciones del cuerpo humano descritas por el arquitecto romano Vitruvio en su obra De architectura. Leonardo situó una figura masculina dentro de un círculo y de un cuadrado a la vez, y anotó medidas como que la envergadura de los brazos abiertos equivale a la altura de una persona. El original, a pluma y tinta, se conserva en las Gallerie dell'Accademia de Venecia y se expone muy pocas veces para protegerlo de la luz." },
      { label: "Dato Científico", icon: "atom", text: "La perspectiva lineal se basa en una idea geométrica sencilla: el tamaño aparente de un objeto es inversamente proporcional a su distancia. Si una persona se aleja al doble de distancia, en el cuadro debe dibujarse aproximadamente a la mitad de altura. Este principio, que los pintores aplicaban con regla y compás, es el mismo que usan hoy los programas de gráficos 3D de los videojuegos para proyectar un mundo tridimensional sobre una pantalla plana." }
    ],
    fact: "La Trinidad de Masaccio, pintada hacia 1427 en la iglesia de Santa Maria Novella de Florencia, se considera uno de los primeros usos rigurosos de la perspectiva lineal en una gran obra: la bóveda pintada parece hundirse en la pared. Leonardo, nacido unas décadas después, heredó esta tradición florentina y la combinó con sus propias observaciones sobre la luz y el color, convirtiendo la perspectiva en una auténtica ciencia de la mirada.",
  },
  {
    id: "ultima-cena",
    bannerImage: '/assets/davinci/infographic_m4/banner_ultima-cena.webp',
    bannerCaption: "La Última Cena (1495-1498), pintada en el refectorio de Santa Maria delle Grazie de Milán con temple y óleo sobre yeso seco.",
    title: "La Última Cena: geometría en un muro",
    color: '#B08D57',
    btnImage: '/assets/davinci/infographic_m4/btn_ultima-cena.webp',
    image: '/assets/davinci/infographic_m4/hero_ultima-cena.webp',
    content: [
      "Entre 1495 y 1498, Leonardo pintó la Última Cena en la pared del refectorio, el comedor de los frailes, del convento dominico de Santa Maria delle Grazie, en Milán. El encargo procedía de Ludovico Sforza, llamado el Moro, duque de Milán y principal mecenas del artista en esa época. La pintura mide unos 4,6 metros de alto por 8,8 de ancho, y representa a Jesús y sus doce apóstoles sentados a una larga mesa, en una escena que los frailes veían cada día mientras comían.",
      "La obra capta el instante en que Jesús anuncia que uno de sus discípulos lo va a traicionar. Leonardo agrupó a los apóstoles de tres en tres, y cada grupo reacciona con gestos distintos: sorpresa, indignación, duda o tristeza. Jesús, en el centro, permanece sereno y forma con sus brazos un triángulo estable. Judas aparece en el mismo lado de la mesa que los demás, algo poco habitual en su época, inclinado hacia atrás y sujetando una pequeña bolsa.",
      "La composición se apoya en una perspectiva lineal muy precisa. Las líneas del techo, de las paredes laterales y de los tapices convergen en un único punto de fuga situado en la sien derecha de Cristo. Durante los estudios de la pintura se encontró en ese lugar un pequeño orificio, probablemente dejado por un clavo del que Leonardo ataba cuerdas para trazar las líneas de fuga. De este modo, la geometría dirige la mirada del espectador hacia la figura central sin que se dé cuenta.",
      "Leonardo no utilizó la técnica del fresco, que consiste en pintar sobre yeso húmedo para que el color quede integrado en el muro. El fresco obliga a trabajar rápido, y él prefería pintar despacio y retocar. Por eso aplicó temple y óleo sobre yeso seco. El método le permitió lograr detalles y transiciones de color muy finos, pero la pintura no se adhirió bien a la pared. A mediados del siglo XVI ya se describía muy deteriorada, y la humedad del muro aceleró el desprendimiento de la capa pictórica.",
      "A lo largo de los siglos sufrió repintes, limpiezas agresivas y daños. En 1652 se abrió una puerta en la pared que eliminó la zona de los pies de Jesús, y en agosto de 1943 un bombardeo destruyó parte del refectorio, aunque el muro de la pintura resistió protegido con sacos de arena. Entre 1978 y 1999, la restauradora Pinin Brambilla Barcilon dirigió una restauración de veintiún años que retiró capas añadidas por restauradores anteriores y recuperó lo que quedaba del trabajo original de Leonardo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Para proteger la Última Cena, hoy los visitantes entran en grupos reducidos y durante un tiempo limitado, después de pasar por varias cámaras que filtran el polvo y estabilizan la humedad. El aliento, el calor corporal y la contaminación del aire pueden dañar una pintura tan frágil. Desde 1980, la iglesia y el convento de Santa Maria delle Grazie con la Última Cena forman parte del Patrimonio Mundial de la UNESCO." },
      { label: "Dato Científico", icon: "atom", text: "La diferencia entre fresco y pintura sobre seco es química. En el fresco, el pigmento se aplica sobre cal húmeda; al secarse, la cal reacciona con el dióxido de carbono del aire y forma carbonato de calcio, que atrapa el color dentro del muro. En la pintura sobre seco, el color queda como una película encima de la superficie. Si la pared acumula humedad o sales, esa película se levanta en pequeñas escamas, que es justo lo que le ocurrió a la obra de Leonardo." }
    ],
    fact: "La restauración de 1978-1999 fue una de las más largas y estudiadas de la historia del arte. Antes de intervenir, el equipo documentó la pintura con fotografías, análisis de materiales y estudios del muro. Trabajando con microscopio, se retiraban suciedad y repintes centímetro a centímetro. Las zonas donde el original se había perdido se rellenaron con acuarela en tonos neutros, de modo que se distinguen de la pintura de Leonardo si se observan de cerca.",
  },
  {
    id: "luz-sombra",
    bannerImage: '/assets/davinci/infographic_m4/banner_luz-sombra.webp',
    bannerCaption: "Leonardo estudió cómo la luz crea sombras, por qué el cielo es azul y por qué la Luna creciente muestra un brillo ceniciento.",
    title: "Luz y sombra: el pintor que estudiaba el cielo",
    color: '#9C7E5A',
    btnImage: '/assets/davinci/infographic_m4/btn_luz-sombra.webp',
    image: '/assets/davinci/infographic_m4/hero_luz-sombra.webp',
    content: [
      "Para Leonardo, la luz y la sombra eran la base de la pintura. En sus cuadernos dedicó cientos de notas y dibujos a observar cómo la luz incide sobre una esfera, un rostro o una tela. Distinguió entre la sombra propia, que aparece en la parte del objeto que no recibe luz, y la sombra proyectada, que el objeto arroja sobre otra superficie. También observó la penumbra, la zona de transición que surge cuando la fuente de luz no es un punto sino una superficie, como una ventana.",
      "Muchas de estas observaciones se reunieron en el Tratado de la pintura. Leonardo nunca publicó sus notas, pero su discípulo Francesco Melzi, que heredó sus manuscritos, seleccionó y copió los pasajes sobre pintura en un volumen conocido hoy como Códice Urbinate, conservado en la Biblioteca Vaticana. Una versión abreviada se imprimió por primera vez en París en 1651. Gracias a ese trabajo, generaciones de artistas aprendieron las reglas de luz y sombra que Leonardo había observado.",
      "Leonardo también se preguntó por qué los objetos lejanos parecen azulados y menos contrastados. Llamó a este efecto perspectiva aérea: el aire entre el ojo y una montaña lejana no es completamente transparente, así que cuanto más aire hay en medio, más se suaviza el color del objeto y más se acerca al tono del cielo. Por eso, en los fondos de la Gioconda y de la Virgen de las Rocas, las montañas aparecen en tonos azules y grises cada vez más pálidos.",
      "En el Códice Leicester, un cuaderno escrito hacia 1506-1510, Leonardo intentó explicar por qué el cielo es azul. Propuso que la luz del Sol ilumina pequeñas partículas de humedad del aire, que se ven sobre la oscuridad del espacio. Hoy sabemos, gracias al físico británico Lord Rayleigh en el siglo XIX, que el color se debe a que las moléculas del aire dispersan mucho más la luz azul que la roja. La explicación de Leonardo no era completa, pero acertó al relacionar el azul con la luz dispersada por la atmósfera.",
      "En el mismo códice, Leonardo resolvió otro enigma: la luz cenicienta de la Luna. Cuando la Luna aparece como un fino creciente, a veces se distingue débilmente el resto de su disco. Leonardo explicó que esa parte oscura recibe luz del Sol reflejada por la Tierra, que vuelve a reflejarse hacia nosotros. Pensaba que los océanos actuaban como espejo; hoy sabemos que las nubes también contribuyen mucho. Su explicación básica, sin embargo, era correcta y se adelantó casi un siglo a la de otros astrónomos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Códice Leicester toma su nombre de Thomas Coke, que lo compró en 1719 y más tarde sería conde de Leicester. Tiene 72 páginas escritas con la escritura especular de Leonardo, que se lee con ayuda de un espejo. En 1994 lo adquirió Bill Gates, cofundador de Microsoft, por unos 30,8 millones de dólares. Es uno de los pocos manuscritos de Leonardo en manos privadas y se presta de vez en cuando a museos de distintos países." },
      { label: "Dato Científico", icon: "atom", text: "Según la dispersión de Rayleigh, la luz dispersada por las moléculas del aire depende de la longitud de onda: la luz azul, de onda más corta, se dispersa entre cinco y seis veces más que la roja. Por eso el cielo diurno es azul y los atardeceres son rojizos, pues la luz atraviesa más atmósfera y el azul se pierde por el camino. La luz cenicienta se usa hoy para medir cuánta luz refleja la Tierra, un dato importante para estudiar el clima." }
    ],
    fact: "Leonardo creía que pintar bien exigía entender cómo funciona la luz, y que entender la luz exigía observar con método. Por eso sus cuadernos mezclan bocetos de rostros con diagramas de rayos que salen del Sol, rebotan en la Tierra y llegan a la Luna. En su obra, la frontera entre pintor y científico desaparece: el mismo razonamiento que le sirve para dar volumen a una mejilla le permite explicar un fenómeno astronómico.",
  },
  {
    id: "botanica-zoologia",
    bannerImage: '/assets/davinci/infographic_m4/banner_botanica-zoologia.webp',
    bannerCaption: "Leonardo dibujó plantas y animales con rigor científico y notó patrones como la disposición de las hojas en espiral.",
    title: "Botánica y zoología: la naturaleza como maestra",
    color: '#7FA38A',
    btnImage: '/assets/davinci/infographic_m4/btn_botanica-zoologia.webp',
    image: '/assets/davinci/infographic_m4/hero_botanica-zoologia.webp',
    content: [
      "Leonardo observaba la naturaleza con la misma atención que un científico de campo. Uno de sus dibujos botánicos más conocidos es el estudio de la Estrella de Belén (Ornithogalum umbellatum), realizado hacia 1505-1510 con sanguina, pluma y tinta. En la misma hoja aparecen otras plantas, como la anémona de bosque y una euforbia. Las hojas de la estrella de Belén se arremolinan alrededor del tallo formando una espiral. La obra forma parte de la Royal Collection británica, en el castillo de Windsor.",
      "Muchos de estos estudios estaban relacionados con un cuadro perdido, Leda y el cisne, en el que Leonardo quería rodear a las figuras de plantas pintadas con precisión. Pero su interés iba más allá de la pintura. Observó que las hojas de muchas plantas se colocan alrededor del tallo de forma que no se tapan unas a otras y así reciben más luz y más lluvia. Hoy esta disposición se estudia con el nombre de filotaxis, y los botánicos han comprobado que a menudo sigue patrones relacionados con la sucesión de Fibonacci.",
      "Leonardo también estudió los árboles. Anotó que los anillos que se ven al cortar un tronco indican su edad, y que su grosor revela si el año fue seco o húmedo, una idea precursora de la dendrocronología. Además, formuló una regla: si se suman las secciones de todas las ramas a una misma altura, el resultado es aproximadamente igual a la sección del tronco. En 2011, el físico Christophe Eloy propuso que esta regla ayuda a los árboles a resistir la fuerza del viento.",
      "En zoología, Leonardo dedicó años a estudiar caballos para un monumento ecuestre en honor a Francesco Sforza, padre de Ludovico. Midió las proporciones de los animales y dibujó músculos, patas y cabezas desde distintos ángulos. Llegó a modelar en arcilla un caballo de unos siete metros, pero el bronce reservado para fundirlo se destinó a fabricar cañones ante la amenaza de guerra, y el modelo fue dañado por soldados franceses tras la ocupación de Milán en 1499.",
      "El vuelo de las aves le fascinaba. Hacia 1505 escribió el Códice sobre el vuelo de los pájaros, conservado en la Biblioteca Real de Turín, donde analizó cómo las aves aprovechan las corrientes de aire, cómo mueven las alas y cómo mantienen el equilibrio. Quería aplicar esos conocimientos al diseño de máquinas voladoras. También estudió la anatomía humana mediante disecciones, y sus dibujos del corazón, los músculos y los huesos son tan precisos que todavía hoy sorprenden a los médicos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1999, cinco siglos después del proyecto original, se inauguró en Milán una gran escultura de bronce basada en los estudios del caballo de Leonardo. La realizó la escultora estadounidense Nina Akamu, a partir de una iniciativa del piloto estadounidense Charles Dent. Mide más de siete metros de altura y se encuentra en el hipódromo de San Siro. Existe una copia en la ciudad de Grand Rapids, en Estados Unidos." },
      { label: "Dato Científico", icon: "atom", text: "Leonardo estudió el corazón de buey y describió cómo la sangre forma remolinos al salir hacia la aorta. Propuso que esos remolinos ayudan a cerrar la válvula aórtica. En el siglo XX, investigadores de la Universidad de Oxford confirmaron experimentalmente ese mecanismo con modelos de flujo, y estudios posteriores con resonancia magnética lo han observado en corazones humanos. Leonardo lo dedujo observando el corazón y el movimiento del agua." }
    ],
    fact: "La sucesión de Fibonacci (1, 1, 2, 3, 5, 8, 13, 21...) aparece en muchas plantas: en las espirales de las piñas, en las semillas del girasol o en la disposición de las hojas. Cada número es la suma de los dos anteriores. Esta organización permite empaquetar semillas de forma eficiente y que las hojas reciban luz sin taparse. Leonardo no conoció esta relación matemática aplicada a las plantas, pero su observación de la disposición de las hojas apuntaba en esa dirección.",
  },
  {
    id: "legado-arte-ciencia",
    bannerImage: '/assets/davinci/infographic_m4/banner_legado-arte-ciencia.webp',
    bannerCaption: "Los cuadernos de Leonardo muestran que arte y ciencia comparten método: observar, medir, experimentar y representar.",
    title: "El legado: arte y ciencia unidos",
    color: '#D4A843',
    btnImage: '/assets/davinci/infographic_m4/btn_legado-arte-ciencia.webp',
    image: '/assets/davinci/infographic_m4/hero_legado-arte-ciencia.webp',
    content: [
      "Leonardo murió el 2 de mayo de 1519 en el castillo de Clos Lucé, en Amboise, Francia. Dejó pocas pinturas terminadas, menos de veinte atribuidas con amplio consenso, pero miles de páginas de notas. Se calcula que se conservan unas siete mil, repartidas hoy entre bibliotecas y museos de varios países. Era zurdo y escribía casi siempre de derecha a izquierda, con escritura especular. Sus cuadernos mezclan listas de la compra, chistes, dibujos anatómicos, diseños de máquinas y cálculos.",
      "Tras su muerte, Francesco Melzi heredó los manuscritos y los guardó en su villa de Vaprio d'Adda, cerca de Milán. Después de la muerte de Melzi, hacia 1570, sus herederos los vendieron o regalaron por partes, y los cuadernos se dispersaron. Una parte se reunió en el Códice Atlántico, conservado en la Biblioteca Ambrosiana de Milán, con más de mil cien hojas. Otros manuscritos están en el Instituto de Francia en París, en la Biblioteca Británica de Londres y en la Royal Collection de Windsor.",
      "Para Leonardo, pintar era una forma de conocer. Creía que la experiencia directa valía más que repetir lo escrito por autoridades antiguas, y se describía a sí mismo como un hombre sin letras porque no dominaba el latín de los eruditos. Ese método, basado en observar, dibujar, comparar y volver a observar, anticipó el espíritu de la ciencia experimental que se desarrollaría en el siglo XVII con figuras como Galileo Galilei.",
      "Muchas de sus ideas no se publicaron en vida, de modo que su influencia directa en la ciencia fue limitada. Sus estudios de anatomía, por ejemplo, permanecieron casi desconocidos durante siglos. Sin embargo, su manera de unir arte y ciencia sí influyó en los pintores a través del Tratado de la pintura y de obras como la Gioconda o la Última Cena, copiadas y estudiadas por artistas como Rafael. Hoy los historiadores valoran sus cuadernos como un ejemplo único de pensamiento visual.",
      "El legado de Leonardo sigue vivo en la educación STEAM, que une ciencia, tecnología, ingeniería, arte y matemáticas. Sus dibujos demuestran que un boceto puede ser una herramienta para pensar, que la curiosidad no entiende de asignaturas y que una pregunta sencilla, como por qué el cielo es azul, puede conducir a la física de la luz. Cuando un ingeniero dibuja un prototipo o un científico representa datos en un gráfico, practica el mismo diálogo entre ver y comprender que Leonardo cultivó."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En los cuadernos de Leonardo aparecen diseños de máquinas voladoras, un vehículo blindado, puentes desmontables, bombas de agua y un tornillo aéreo que a veces se compara con el helicóptero. La mayoría nunca se construyó en su época, y algunos no habrían funcionado con los materiales disponibles. En las últimas décadas, ingenieros y museos han fabricado maquetas a partir de sus dibujos para comprobar qué ideas eran viables y cuáles eran ejercicios de imaginación." },
      { label: "Dato Científico", icon: "atom", text: "La escritura especular de Leonardo se lee fácilmente con un espejo. Los historiadores no saben con certeza por qué escribía así. Una explicación frecuente es que, al ser zurdo y usar pluma y tinta, escribir de derecha a izquierda le evitaba emborronar lo que acababa de escribir. Otra hipótesis es que simplemente le resultaba más natural. Cuando escribía para otras personas, como en algunas cartas, podía hacerlo en la dirección habitual." }
    ],
    fact: "Leonardo da Vinci nunca separó el arte de la ciencia porque, para él, ambos partían de la misma pregunta: cómo funciona el mundo que vemos. El sfumato nace de entender la visión; la perspectiva, de la geometría; la luz de sus cuadros, de la óptica; y sus plantas y animales, de la observación paciente. Más de quinientos años después, su obra recuerda que mirar con atención es el primer paso de cualquier descubrimiento.",
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
          const colors = ["#8FAF7A", "#C9A24B", "#6E8B6A", "#B08D57", "#9C7E5A", "#7FA38A", "#D4A843"];
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
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ARTE Y CIENCIA UNIDOS</text>
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
          layoutId="activeDotDaVinciM4"
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
export default function InteractiveInfographic_DaVinciM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/davinci/davinci_m4.webp)',
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
              🏆 ¡Has completado Arte y Ciencia Unidos!
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
