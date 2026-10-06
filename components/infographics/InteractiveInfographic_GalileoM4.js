'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#E0A27A', style = {} }) {
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
  "Galilei, G. (1914). Dialogues Concerning Two New Sciences (H. Crew y A. de Salvio, trad.). Macmillan. (Obra original publicada en 1638).",
  "Galilei, G. (1967). Dialogue Concerning the Two Chief World Systems (S. Drake, trad.). University of California Press. (Obra original publicada en 1632).",
  "Drake, S. (1978). Galileo at Work: His Scientific Biography. University of Chicago Press.",
  "Drake, S. (1973). Galileo's Experimental Confirmation of Horizontal Inertia: Unpublished Manuscripts. Isis, 64(3), 290-305.",
  "Settle, T. B. (1961). An Experiment in the History of Science. Science, 133(3445), 19-23.",
  "Newton, I. (1999). The Principia: Mathematical Principles of Natural Philosophy (I. B. Cohen y A. Whitman, trad.). University of California Press.",
  "Jones, E. M. (ed.). Apollo 15 Lunar Surface Journal: The Hammer and the Feather. NASA History Office.",
  "Touboul, P. et al. (2022). MICROSCOPE Mission: Final Results of the Test of the Equivalence Principle. Physical Review Letters, 129, 121102."
];

const INFOGRAPHIC_NODES = [
  {
    id: "fisica-de-aristoteles",
    bannerImage: '/assets/galileo/infographic_m4/banner_fisica-de-aristoteles.webp',
    bannerCaption: "Aristóteles (384-322 a. C.) pensaba que los cuerpos pesados caen más rápido; su idea dominó casi dos mil años.",
    title: "El mundo según Aristóteles",
    color: '#8C7A5B',
    btnImage: '/assets/galileo/infographic_m4/btn_fisica-de-aristoteles.webp',
    image: '/assets/galileo/infographic_m4/hero_fisica-de-aristoteles.webp',
    content: [
      "Durante casi dos mil años, la forma de explicar el movimiento en Europa y en el mundo islámico se basó en las ideas de Aristóteles, un filósofo griego que vivió entre los años 384 y 322 antes de Cristo. Para él, cada cosa tenía un «lugar natural»: la tierra y el agua tendían a bajar hacia el centro del universo, mientras que el aire y el fuego tendían a subir. Una piedra caía porque buscaba regresar a su lugar, igual que un caballo cansado vuelve a su establo.",
      "Aristóteles también separaba dos tipos de movimiento. El «natural», como la caída de una piedra, no necesitaba ninguna explicación extra. El «violento», como lanzar una flecha, sí necesitaba una causa constante que lo empujara. Si el empuje desaparecía, el objeto debía detenerse. Por eso, para explicar por qué una flecha sigue volando después de salir del arco, sus seguidores inventaron ideas complicadas, como que el aire se cerraba detrás de ella y la empujaba hacia adelante.",
      "La regla más famosa de Aristóteles decía que un cuerpo cae más rápido cuanto más pesado es. Según su razonamiento, una piedra diez veces más pesada que otra debería caer diez veces más rápido. Esta idea parecía confirmada por la vida diaria: una hoja seca baja planeando lentamente, mientras que una piedra se precipita en un instante. Casi nadie dudaba de lo que veía con sus propios ojos, y casi nadie se tomó la molestia de medirlo con cuidado.",
      "No todos estaban de acuerdo. En el siglo VI, el filósofo Juan Filópono de Alejandría escribió que si se sueltan dos pesos muy distintos desde la misma altura, la diferencia en sus tiempos de caída es muy pequeña. Siglos después, pensadores medievales como Jean Buridan propusieron la idea del «ímpetu», una especie de fuerza guardada dentro del objeto lanzado. Estas críticas prepararon el terreno, pero todavía faltaba alguien que convirtiera las dudas en mediciones y en números.",
      "Ese alguien fue Galileo Galilei, nacido en Pisa el 15 de febrero de 1564. Empezó a estudiar medicina por deseo de su padre, pero se enamoró de las matemáticas. En 1589 se convirtió en profesor de matemáticas en la Universidad de Pisa y, en 1592, se trasladó a la Universidad de Padua, donde enseñó durante dieciocho años. En esa época escribió borradores sobre el movimiento y empezó a sospechar que Aristóteles se había equivocado en algo tan cotidiano como la caída de una piedra."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Aristóteles no solo escribió sobre física: también estudió animales, plantas, política, poesía y lógica. Fue maestro de Alejandro Magno cuando este era adolescente. Sus libros se tradujeron al árabe y luego al latín, y se enseñaron en las universidades europeas durante toda la Edad Media. Por eso, contradecirlo no era solo un debate científico: era desafiar a la autoridad más respetada de las escuelas de la época." },
      { label: "Dato Científico", icon: "atom", text: "Hoy sabemos que el error de Aristóteles venía de no separar dos efectos distintos: la gravedad, que atrae a todos los cuerpos con la misma aceleración, y la resistencia del aire, que frena más a los objetos ligeros y extendidos. Una hoja de papel extendida cae lentamente, pero si la arrugas en una bolita cae casi tan rápido como una piedra. Su masa no cambió; solo cambió cuánto aire tiene que empujar al bajar." }
    ],
    fact: "Juan Filópono, que criticó a Aristóteles en el siglo VI, fue leído siglos después por eruditos del mundo islámico y del Renacimiento europeo. El propio Galileo lo menciona en sus primeros escritos sobre el movimiento. Esto muestra que la ciencia rara vez nace de un genio aislado: las ideas viajan de una generación a otra, a veces durante mil años, hasta que alguien encuentra la manera de comprobarlas con experimentos.",
  },
  {
    id: "torre-de-pisa-y-experimento-mental",
    bannerImage: '/assets/galileo/infographic_m4/banner_torre-de-pisa-y-experimento-mental.webp',
    bannerCaption: "La caída de bolas desde la Torre de Pisa la narró Viviani años después; Galileo nunca la describió en sus libros.",
    title: "La Torre de Pisa: leyenda y razonamiento",
    color: '#6B7F8E',
    btnImage: '/assets/galileo/infographic_m4/btn_torre-de-pisa-y-experimento-mental.webp',
    image: '/assets/galileo/infographic_m4/hero_torre-de-pisa-y-experimento-mental.webp',
    content: [
      "Seguramente has escuchado la historia: un joven Galileo sube a la Torre Inclinada de Pisa, suelta dos bolas de distinto peso frente a una multitud de profesores y ambas llegan al suelo al mismo tiempo. Es una escena emocionante, pero los historiadores creen que probablemente nunca ocurrió así. Galileo, que solía describir con detalle sus experimentos, no la menciona en ninguno de sus libros ni en las cartas suyas que conocemos.",
      "El relato proviene de Vincenzo Viviani, el último alumno de Galileo, que lo acompañó durante sus años finales. Viviani escribió una biografía de su maestro en 1654, más de diez años después de su muerte, y allí contó la demostración en la torre. Como Viviani admiraba profundamente a Galileo y escribió de memoria lo que había oído, muchos expertos piensan que adornó la historia o la confundió con otras pruebas de caída.",
      "Lo curioso es que sí existió un experimento parecido, aunque no lo hizo Galileo. En 1586, el ingeniero flamenco Simon Stevin y su colega Jan Cornets de Groot soltaron dos esferas de plomo, una diez veces más pesada que la otra, desde la torre de una iglesia en Delft, en los Países Bajos, a unos diez metros de altura. Escucharon que ambas golpeaban una tabla de madera al mismo tiempo, como un solo sonido. Stevin publicó el resultado ese mismo año.",
      "Galileo tenía además un argumento brillante que no necesitaba ninguna torre: un experimento mental. Imagina una piedra pesada y una ligera. Si Aristóteles tuviera razón, la ligera caería más lento. Ahora átalas con una cuerda. La ligera debería frenar a la pesada, así que el conjunto caería más despacio que la piedra pesada sola. Pero el conjunto pesa más que la piedra pesada, así que debería caer más rápido. ¡Las dos conclusiones se contradicen!",
      "La única forma de salir de esa trampa lógica es aceptar que el peso no cambia la velocidad de caída: la piedra pesada, la ligera y las dos atadas deben caer juntas. Galileo publicó este razonamiento en 1638, en su libro «Discursos y demostraciones matemáticas en torno a dos nuevas ciencias». Así demostró que una buena pregunta y un razonamiento lógico pueden derrumbar una idea aceptada durante siglos, incluso antes de hacer mediciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Torre de Pisa empezó a construirse en 1173 como campanario de la catedral, y comenzó a inclinarse pocos años después porque el suelo bajo ella es blando. Entre 1990 y 2001 estuvo cerrada al público mientras los ingenieros retiraban tierra con mucho cuidado bajo uno de sus lados. Así lograron reducir su inclinación unos cuarenta centímetros y asegurar que siga de pie durante siglos." },
      { label: "Dato Científico", icon: "atom", text: "Un experimento mental es una prueba que se hace con la imaginación siguiendo reglas lógicas estrictas. No reemplaza a los experimentos reales, pero puede revelar contradicciones escondidas dentro de una teoría. Siglos después de Galileo, Albert Einstein usó experimentos mentales famosos, como imaginar que viajaba junto a un rayo de luz, para construir su teoría de la relatividad. Galileo fue uno de los primeros grandes maestros de esta herramienta." }
    ],
    fact: "En su libro de 1638, Galileo escribió sus ideas como una conversación entre tres personajes: Salviati, que defiende las ideas nuevas; Sagredo, un hombre curioso e inteligente; y Simplicio, que defiende a Aristóteles. Usar un diálogo le permitía explicar la física como una charla entre amigos, en italiano y no solo en latín, para que más personas fuera de las universidades pudieran entenderla y discutirla.",
  },
  {
    id: "planos-inclinados-y-relojes-de-agua",
    bannerImage: '/assets/galileo/infographic_m4/banner_planos-inclinados-y-relojes-de-agua.webp',
    bannerCaption: "Galileo hizo rodar bolas de bronce por una rampa de madera pulida y midió el tiempo pesando agua.",
    title: "Planos inclinados y relojes de agua",
    color: '#5E7D6A',
    btnImage: '/assets/galileo/infographic_m4/btn_planos-inclinados-y-relojes-de-agua.webp',
    image: '/assets/galileo/infographic_m4/hero_planos-inclinados-y-relojes-de-agua.webp',
    content: [
      "Medir una caída libre en tiempos de Galileo era casi imposible: una bola soltada desde unos metros tarda menos de un segundo en llegar al suelo, y no existían cronómetros. La solución de Galileo fue genial: «diluir» la gravedad. Si una bola rueda por una rampa poco inclinada, sigue acelerando por la misma causa que la hace caer, pero mucho más despacio. Así los tiempos se alargan lo suficiente para poder medirlos con cuidado.",
      "En su libro de 1638, Galileo describe el aparato: una viga de madera de unos doce codos de largo, es decir, de varios metros, con un canal recto y muy pulido forrado de pergamino. Por ese canal hacía rodar una bola de bronce dura, lisa y bien redonda. Inclinaba la viga levantando uno de sus extremos y repetía cada recorrido muchas veces, comprobando que las diferencias entre una medición y otra eran muy pequeñas.",
      "Para medir el tiempo usó un reloj de agua. Colocaba en alto un gran recipiente con agua, con un tubito delgado en el fondo. Cuando la bola empezaba a rodar, dejaba salir el chorro hacia un vaso, y lo cerraba al terminar el recorrido. Después pesaba el agua recogida en una balanza muy precisa: más agua significaba más tiempo. Galileo cuenta que repitió las pruebas unas cien veces y que los resultados siempre coincidían.",
      "Lo que descubrió fue un patrón sorprendente. Si en el primer intervalo de tiempo la bola recorría una unidad de distancia, en el segundo recorría tres, en el tercero cinco y en el cuarto siete: los números impares. Sumándolos, las distancias totales eran 1, 4, 9 y 16, es decir, los cuadrados de 1, 2, 3 y 4. La distancia recorrida crece con el cuadrado del tiempo, y eso se cumplía con cualquier inclinación de la rampa.",
      "Este resultado se llama movimiento uniformemente acelerado: la velocidad aumenta la misma cantidad en cada segundo. Galileo razonó que una caída vertical es simplemente el caso extremo de una rampa totalmente empinada, así que la misma ley debía valer para la caída libre. Por eso, si te preguntan con qué herramienta estudió Galileo la aceleración de los cuerpos, la respuesta son los planos inclinados, no su famoso telescopio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1961, el historiador Thomas Settle reconstruyó el experimento del plano inclinado usando materiales parecidos a los que describió Galileo, incluido un reloj de agua. Publicó sus resultados en la revista Science y demostró que con ese equipo sencillo se podían obtener mediciones bastante precisas. Así quedó claro que Galileo no exageró: su experimento funcionaba de verdad, y cualquier escuela puede repetirlo hoy." },
      { label: "Dato Científico", icon: "atom", text: "Hay un detalle que Galileo no podía conocer del todo: una bola que rueda no solo baja, también gira, y parte de su energía se usa en ese giro. Por eso una bola maciza acelera por una rampa más despacio de lo que lo haría deslizándose sin fricción. Sin embargo, esa reducción es siempre la misma proporción para una inclinación dada, así que la ley del cuadrado del tiempo se mantiene intacta." }
    ],
    fact: "Algunos historiadores creen que Galileo, además del reloj de agua, aprovechó su sentido del ritmo. Su padre, Vincenzo Galilei, era músico y teórico de la música, y Galileo tocaba el laúd. El historiador Stillman Drake propuso que pudo colocar pequeñas marcas o cuerdas a lo largo de la rampa y moverlas hasta que la bola las golpeara siguiendo un ritmo regular, como las notas de una canción.",
  },
  {
    id: "caida-libre-y-el-martillo-lunar",
    bannerImage: '/assets/galileo/infographic_m4/banner_caida-libre-y-el-martillo-lunar.webp',
    bannerCaption: "En 1971, el astronauta David Scott soltó un martillo y una pluma en la Luna: tocaron el suelo al mismo tiempo.",
    title: "Caída libre: de Padua a la Luna",
    color: '#5B7189',
    btnImage: '/assets/galileo/infographic_m4/btn_caida-libre-y-el-martillo-lunar.webp',
    image: '/assets/galileo/infographic_m4/hero_caida-libre-y-el-martillo-lunar.webp',
    content: [
      "La conclusión de Galileo fue clara: en ausencia de aire, todos los cuerpos caen con la misma aceleración, sin importar su masa. Una bola de hierro y una canica de vidrio soltadas juntas llegan juntas. Hoy medimos esa aceleración cerca de la superficie terrestre en unos 9.8 metros por segundo cada segundo. Eso significa que un objeto que cae libremente aumenta su velocidad unos 35 kilómetros por hora en cada segundo de caída.",
      "Gracias a la ley del cuadrado del tiempo podemos calcular cuánto cae un objeto. En el primer segundo baja unos 4.9 metros; al terminar el segundo segundo lleva unos 19.6 metros, cuatro veces más; y al tercer segundo, unos 44 metros, nueve veces más. Estos números son ideales, sin contar el aire. En la vida real, el aire frena cada vez más al objeto conforme gana velocidad, hasta que la caída deja de acelerar.",
      "Esa velocidad máxima se llama velocidad terminal, y explica por qué Aristóteles se confundió. Una pluma alcanza su velocidad terminal casi de inmediato porque es muy ligera y tiene mucha superficie, mientras que una piedra puede seguir acelerando durante mucho más tiempo. Una persona en caída libre con los brazos abiertos llega a unos 200 kilómetros por hora; al abrir el paracaídas, la gran superficie de tela reduce esa velocidad a unos pocos metros por segundo.",
      "La prueba más famosa de la idea de Galileo ocurrió lejos de la Tierra. El 2 de agosto de 1971, durante la misión Apolo 15, el comandante David Scott se paró frente a la cámara en la superficie de la Luna, donde no hay aire. Sostenía en una mano un martillo geológico de aluminio y en la otra una pluma de halcón. Los soltó al mismo tiempo, y ambos cayeron lado a lado hasta tocar el polvo lunar en el mismo instante.",
      "Antes de soltarlos, Scott explicó que estaban allí en parte gracias a Galileo, y al terminar exclamó que el señor Galileo tenía razón en sus hallazgos. La caída fue más lenta que en la Tierra porque la gravedad lunar es de unos 1.62 metros por segundo cada segundo, cerca de la sexta parte de la terrestre. Pero lo importante no era la rapidez, sino que los dos objetos, uno pesado y otro ligerísimo, cayeron exactamente igual."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La pluma que usó David Scott era de halcón, y no fue casualidad: el módulo lunar de Apolo 15 se llamaba Falcon, que en inglés significa halcón. El video del experimento dura apenas unos segundos, pero se convirtió en una de las demostraciones de física más vistas de la historia. Hoy se proyecta en escuelas de todo el mundo para mostrar, en un solo vistazo, lo que Galileo dedujo con rampas y relojes de agua." },
      { label: "Dato Científico", icon: "atom", text: "Los científicos siguen poniendo a prueba la idea de Galileo con una precisión asombrosa. El satélite francés MICROSCOPE, que funcionó entre 2016 y 2018, comparó la caída de dos cilindros de materiales distintos, platino y titanio, mientras orbitaban la Tierra. Los resultados finales, publicados en 2022, mostraron que ambos caían igual con una precisión de alrededor de una parte en mil billones. Galileo sigue teniendo razón." }
    ],
    fact: "Los astronautas de la Estación Espacial Internacional flotan, pero no porque allí no haya gravedad. A unos 400 kilómetros de altura, la gravedad terrestre todavía es cerca del 90 % de la que sentimos en el suelo. Flotan porque la estación y todo lo que hay dentro caen juntos alrededor de la Tierra con la misma aceleración, exactamente como predijo Galileo para todos los cuerpos que caen libremente.",
  },
  {
    id: "la-parabola-de-los-proyectiles",
    bannerImage: '/assets/galileo/infographic_m4/banner_la-parabola-de-los-proyectiles.webp',
    bannerCaption: "Galileo demostró que un proyectil sigue una parábola: avanza a velocidad constante mientras cae acelerando.",
    title: "La parábola de los proyectiles",
    color: '#8E6B5E',
    btnImage: '/assets/galileo/infographic_m4/btn_la-parabola-de-los-proyectiles.webp',
    image: '/assets/galileo/infographic_m4/hero_la-parabola-de-los-proyectiles.webp',
    content: [
      "Después de la caída, Galileo se preguntó qué pasa con los objetos lanzados hacia adelante, como una bala de cañón o una pelota. En su tiempo, muchos artilleros creían que una bala viajaba en línea recta hasta perder su ímpetu y luego caía de golpe, dibujando en el aire una especie de escuadra. Galileo sospechó que la realidad era más sencilla y más elegante, y la descubrió combinando dos movimientos que ya conocía muy bien.",
      "Su idea clave fue que el movimiento horizontal y el vertical son independientes. Hacia adelante, si no hay aire que frene, el proyectil avanza la misma distancia en cada segundo. Hacia abajo, cae exactamente como cualquier objeto soltado, cada vez más rápido. Si disparas una bala horizontalmente y al mismo tiempo dejas caer otra desde la misma altura, las dos tocan el suelo a la vez, aunque una haya viajado muy lejos.",
      "Al juntar un avance constante con una caída que crece según el cuadrado del tiempo, aparece una curva muy especial: la parábola, una figura que los matemáticos griegos ya habían estudiado siglos antes. Galileo lo comprobó alrededor de 1608 haciendo rodar bolas por una rampa que terminaba sobre una mesa: la bola salía disparada horizontalmente y él marcaba dónde caía al suelo. Las distancias coincidían con la parábola calculada.",
      "En su libro de 1638, Galileo publicó tablas útiles para artilleros y demostró otro resultado importante: sin aire, el alcance máximo se consigue lanzando con un ángulo de 45 grados. Además, dos ángulos que se separan lo mismo de 45 grados, como 30 y 60, logran el mismo alcance. Hoy sabemos que el aire acorta y deforma la trayectoria real, sobre todo a grandes velocidades, pero la parábola sigue siendo el punto de partida de los cálculos.",
      "La parábola de Galileo también sirve para entrenar astronautas. Las agencias espaciales usan aviones que suben con fuerza y luego reducen el empuje lo justo para compensar el aire, siguiendo una trayectoria parabólica. Durante unos veinte segundos, el avión y sus pasajeros caen juntos, como un proyectil, y todos flotan dentro de la cabina. Repitiendo la maniobra decenas de veces en un solo vuelo, los científicos hacen experimentos y los astronautas practican."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los aviones de vuelos parabólicos tienen apodos curiosos. En la NASA, el avión KC-135 usado durante décadas se ganó el sobrenombre de «Vomit Comet», el cometa del vómito, porque muchas personas se marean con tantas subidas y bajadas. Para sus campañas europeas se usa un Airbus A310 llamado Zero-G. En cada vuelo se hacen alrededor de treinta parábolas, y cada una regala unos veinte segundos de ingravidez." },
      { label: "Dato Científico", icon: "atom", text: "En una parábola ideal, sin aire, un proyectil tarda lo mismo en subir que en bajar, y si cae a la misma altura desde la que salió, llega con la misma rapidez con que fue lanzado. Los chorros de una fuente, una pelota de básquetbol y un salto de longitud siguen curvas muy parecidas. La resistencia del aire hace que un gallito de bádminton suba con fuerza y luego caiga casi en vertical, lejos de la parábola perfecta." }
    ],
    fact: "Galileo pensaba que sus resultados servirían a la artillería, que en su época era una ciencia de enorme interés militar. Pero el mismo método de separar un movimiento en partes independientes se usa hoy para calcular la trayectoria de cohetes, satélites y sondas espaciales. Las computadoras de vuelo resuelven, muchas veces por segundo, versiones mucho más complejas de las ideas que Galileo dibujó con pluma y papel.",
  },
  {
    id: "el-pendulo-isocrono",
    bannerImage: '/assets/galileo/infographic_m4/banner_el-pendulo-isocrono.webp',
    bannerCaption: "Galileo notó que un péndulo tarda casi lo mismo en cada vaivén, amplio o corto; su periodo depende de su longitud.",
    title: "El péndulo y el ritmo del tiempo",
    color: '#7A6A8C',
    btnImage: '/assets/galileo/infographic_m4/btn_el-pendulo-isocrono.webp',
    image: '/assets/galileo/infographic_m4/hero_el-pendulo-isocrono.webp',
    content: [
      "Cuenta Viviani que en 1583, con unos diecinueve años, Galileo observó una lámpara que se balanceaba en la catedral de Pisa. Usando su pulso como reloj, notó que la lámpara tardaba lo mismo en cada vaivén, tanto cuando se movía mucho como cuando apenas oscilaba. Igual que con la torre, los historiadores dudan de algunos detalles de esta anécdota, pero sabemos con certeza que Galileo estudió los péndulos durante buena parte de su vida.",
      "A esta propiedad se le llama isocronismo, que significa «mismo tiempo». El tiempo que tarda un péndulo en ir y volver se llama periodo. Galileo descubrió que el periodo casi no cambia si el balanceo es más amplio o más corto, y que tampoco depende de la masa que cuelga: una bola de plomo y una de corcho atadas a hilos iguales oscilan con el mismo ritmo, aunque la de corcho se frene antes por culpa del aire.",
      "Lo que sí cambia el periodo es la longitud del hilo. Galileo encontró que, para que un péndulo tarde el doble en cada vaivén, su hilo debe ser cuatro veces más largo. Un péndulo de casi un metro tarda unos dos segundos en ir y volver, de modo que cada balanceo de un lado al otro dura un segundo. Por eso se le llama «péndulo de segundos», y durante siglos sirvió para regular relojes de gran precisión.",
      "En 1602, Galileo describió sus experimentos con péndulos en una carta a su amigo, el matemático Guidobaldo del Monte. Por esos años, el médico Santorio Santorio, colega suyo en Padua, usó un péndulo ajustable para medir el pulso de sus pacientes, un aparato llamado pulsilogio. Ya anciano y ciego, en 1641, Galileo diseñó un reloj controlado por un péndulo. Su hijo Vincenzo empezó a construirlo, pero no logró terminarlo.",
      "El primer reloj de péndulo que funcionó lo construyó el científico neerlandés Christiaan Huygens en 1656. Huygens también descubrió que el isocronismo de Galileo no es perfecto: en balanceos muy amplios, el periodo se alarga un poco. Aun así, los relojes de péndulo redujeron el error de los relojes de unos quince minutos al día a menos de un minuto. Así, una observación de Galileo cambió la manera en que la humanidad mide el tiempo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1851, el físico francés Léon Foucault colgó un péndulo enorme de la cúpula del Panteón de París, con una bola de 28 kilos y un cable de 67 metros. Con el paso de las horas, el plano en que oscilaba parecía girar lentamente. En realidad, era el suelo el que giraba debajo: el péndulo demostraba de forma visible que la Tierra rota, algo que Galileo defendió durante toda su vida." },
      { label: "Dato Científico", icon: "atom", text: "La fórmula moderna del periodo de un péndulo simple es T = 2π√(L/g), donde L es la longitud del hilo y g la aceleración de la gravedad. Por eso, un mismo péndulo oscilaría más lento en la Luna, donde g es unas seis veces menor: allí tardaría unas 2.4 veces más en cada vaivén. Midiendo el periodo de péndulos, los científicos de los siglos XVII y XVIII lograron medir la gravedad en distintos lugares de la Tierra." }
    ],
    fact: "El dedo medio de la mano derecha de Galileo se conserva en el Museo Galileo de Florencia, dentro de un recipiente de cristal y apuntando hacia arriba. Fue separado de su cuerpo en 1737, cuando sus restos se trasladaron a una tumba monumental en la Basílica de la Santa Cruz. En el mismo museo se exhibe un modelo del reloj de péndulo que Galileo diseñó, construido en el siglo XIX siguiendo sus dibujos.",
  },
  {
    id: "inercia-relatividad-y-newton",
    bannerImage: '/assets/galileo/infographic_m4/banner_inercia-relatividad-y-newton.webp',
    bannerCaption: "Galileo intuyó la inercia y la relatividad del movimiento; Newton construyó sus leyes sobre esos cimientos en 1687.",
    title: "Inercia, el barco y los hombros de Newton",
    color: '#7D7A5E',
    btnImage: '/assets/galileo/infographic_m4/btn_inercia-relatividad-y-newton.webp',
    image: '/assets/galileo/infographic_m4/hero_inercia-relatividad-y-newton.webp',
    content: [
      "Uno de los hallazgos más profundos de Galileo salió de un experimento mental con rampas. Una bola que baja por una rampa acelera; una que sube por otra rampa se frena. ¿Qué pasaría en una superficie perfectamente horizontal y sin fricción? No habría razón para acelerar ni para frenar, así que la bola seguiría rodando para siempre a la misma velocidad. Moverse no necesita una fuerza; lo que necesita una fuerza es cambiar el movimiento.",
      "Esta idea, llamada inercia, contradecía directamente a Aristóteles. Galileo la pensaba sobre todo para movimientos sobre la superficie de la Tierra, que es curva, y por eso algunos historiadores hablan de su «inercia circular». Fue el filósofo francés René Descartes quien, en 1644, la expresó como un movimiento en línea recta. Después, Isaac Newton la convirtió en su Primera Ley: todo cuerpo sigue en reposo o en línea recta a velocidad constante si nada lo obliga a cambiar.",
      "En 1632, en su «Diálogo sobre los dos máximos sistemas del mundo», Galileo propuso otro experimento mental famoso. Imagina que estás encerrado en el camarote de un barco, con mariposas volando y un cuenco con peces. Si el barco navega suavemente y sin sacudidas, las mariposas, los peces y las gotas que caen se comportan exactamente igual que con el barco quieto. Desde dentro no hay manera de saber si te estás moviendo.",
      "Esto se conoce como principio de relatividad de Galileo: las leyes del movimiento son las mismas para cualquiera que se mueva a velocidad constante. Con esta idea respondía a quienes decían que la Tierra no podía moverse porque lo notaríamos. Casi trescientos años después, en 1905, Albert Einstein partió de este principio y le añadió que la velocidad de la luz es la misma para todos los observadores, creando su teoría especial de la relatividad.",
      "Galileo murió el 8 de enero de 1642 en Arcetri, cerca de Florencia. Isaac Newton nació en Inglaterra el día de Navidad de ese mismo año, según el calendario que se usaba allí. En 1687, Newton publicó sus «Principia» y reconoció que Galileo ya había descubierto que la caída depende del cuadrado del tiempo y que los proyectiles siguen parábolas. Sus tres leyes del movimiento se levantaron sobre los cimientos que Galileo había puesto."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En una carta de 1676 al científico Robert Hooke, Newton escribió una frase célebre: «Si he visto más lejos, es porque estoy sentado sobre los hombros de gigantes». La imagen no era nueva, pues ya la usaban sabios medievales, pero resume muy bien cómo avanza la ciencia: Newton se apoyó en Galileo, en Kepler y en muchos otros, y hoy los científicos de todo el mundo se apoyan en Newton." },
      { label: "Dato Científico", icon: "atom", text: "La Segunda Ley de Newton dice que la fuerza es igual a la masa por la aceleración. Cuando un objeto cae, la fuerza de gravedad sobre él es mayor si su masa es mayor, pero también cuesta más acelerar una masa grande. Los dos efectos se cancelan exactamente, y por eso todos los cuerpos caen con la misma aceleración. Así explicó Newton, con su ley, el resultado que Galileo había medido en sus rampas." }
    ],
    fact: "Los ingenieros espaciales aprovechan la inercia todos los días. Las sondas Voyager 1 y 2, lanzadas en 1977, no usan motores para avanzar desde hace décadas y aun así siguen alejándose del Sol a más de quince kilómetros por segundo. En el espacio casi vacío casi nada las frena, así que continúan su viaje, tal como Galileo imaginó con su bola rodando sobre un plano horizontal infinito.",
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
      hue: Math.random() > 0.5 ? '224,162,122' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(224,162,122,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradGalileoM4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#8C7A5B", "#6B7F8E", "#5E7D6A", "#5B7189", "#8E6B5E", "#7A6A8C", "#7D7A5E"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#E0A27A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#E0A27A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradGalileoM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,162,122,0.2)" />
            <stop offset="50%" stopColor="rgba(224,162,122,0.9)" />
            <stop offset="100%" stopColor="rgba(224,162,122,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0A27A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CAÍDA, PÉNDULOS Y PROYECTILES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(224,162,122,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GALILEO GALILEI</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(224,162,122,0.2)'}`,
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
          layoutId="activeDotGalileoM4"
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
      border: '1px solid rgba(224,162,122,0.15)',
    }}>
      <Star size={14} style={{ color: '#E0A27A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #E0A27A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(224,162,122,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E0A27A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_GalileoM4() {
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
      border: '1px solid rgba(224,162,122,0.12)',
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
            textAlign: 'center', color: 'rgba(224,162,122,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(224,162,122,0.08)', borderRadius: '16px',
              border: '1px solid rgba(224,162,122,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#E0A27A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Pionero de la Física: mide el movimiento como lo hizo Galileo
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
