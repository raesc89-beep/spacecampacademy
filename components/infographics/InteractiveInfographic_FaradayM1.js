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
  "Hamilton, J. (2002). Faraday: The Life. Londres: HarperCollins.",
  "Thomas, J. M. (1991). Michael Faraday and the Royal Institution: The Genius of Man and Place. Bristol: Adam Hilger.",
  "Forbes, N. y Mahon, B. (2014). Faraday, Maxwell, and the Electromagnetic Field: How Two Men Revolutionized Physics. Amherst: Prometheus Books.",
  "Faraday, M. (1861). A Course of Six Lectures on the Chemical History of a Candle. Londres: Griffin, Bohn & Co.",
  "Marcet, J. (1805). Conversations on Chemistry. Londres: Longman, Hurst, Rees & Orme.",
  "Royal Institution of Great Britain. Faraday Museum y archivos históricos. https://www.rigb.org"
];

const INFOGRAPHIC_NODES = [
  {
    id: "infancia-humilde-en-londres",
    bannerImage: '/assets/faraday/infographic_m1/banner_infancia-humilde-en-londres.webp',
    bannerCaption: "Michael Faraday nació el 22 de septiembre de 1791 en Newington Butts, al sur de Londres, en una familia muy pobre.",
    title: "Una infancia humilde en Londres",
    color: '#6A7F94',
    btnImage: '/assets/faraday/infographic_m1/btn_infancia-humilde-en-londres.webp',
    image: '/assets/faraday/infographic_m1/hero_infancia-humilde-en-londres.webp',
    content: [
      "Michael Faraday nació el 22 de septiembre de 1791 en Newington Butts, entonces un pueblo al sur de Londres y hoy parte de la ciudad. Su familia acababa de llegar desde Westmorland, una región rural del norte de Inglaterra, buscando trabajo. Su padre, James, era herrero, pero tenía mala salud y a menudo no podía trabajar. Michael fue el tercero de cuatro hermanos. Poco después la familia se mudó a unas habitaciones sobre una cochera cerca de Manchester Square, en el centro de Londres, donde vivieron con muy poco dinero.",
      "La pobreza marcó su niñez. En los años de malas cosechas, alrededor de 1801, los alimentos se encarecieron mucho y la familia tuvo que recibir ayuda pública. Faraday recordaba de adulto que, en esa época, a él le daban una sola hogaza de pan que debía durarle toda una semana. A pesar de esas dificultades, sus padres le inculcaron valores que conservó toda la vida: honestidad, sencillez y respeto por los demás. Nunca olvidó de dónde venía, ni siquiera cuando se convirtió en uno de los científicos más famosos del mundo.",
      "Su educación escolar fue muy breve. Asistió a una escuela diurna sencilla donde aprendió lo básico: leer, escribir y hacer cuentas. No estudió latín, griego ni matemáticas avanzadas, que eran las materias de los niños ricos. Esta falta de formación matemática lo acompañó siempre: sus grandes trabajos científicos casi no contienen ecuaciones. Sin embargo, compensó esa carencia con una capacidad extraordinaria para observar, imaginar y diseñar experimentos, algo que ninguna escuela le había enseñado directamente.",
      "La familia Faraday pertenecía a los sandemanianos, un pequeño grupo cristiano que valoraba la humildad, la ayuda mutua y la vida sencilla. Michael se unió formalmente a la congregación en 1821 y más tarde fue uno de sus ancianos, encargado de predicar. Para él, estudiar la naturaleza era una forma de comprender el orden del mundo, y no veía contradicción entre su fe y la ciencia. Esta actitud humilde explica en parte por qué rechazó honores y títulos a lo largo de su vida.",
      "A los 13 años, en 1804, Michael tuvo que empezar a trabajar para ayudar a su familia. Era lo habitual para los niños pobres de la época: no había escuela obligatoria y cada moneda contaba en casa. Su primer empleo fue como chico de los recados en una tienda cercana, donde repartía periódicos a los clientes y luego pasaba a recogerlos, porque en aquella época muchos lectores alquilaban los diarios en lugar de comprarlos. Ese trabajo modesto lo llevaría, sin saberlo, directamente hacia la ciencia."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Según los biógrafos de Faraday, de niño pronunciaba mal la letra r, y una de sus maestras lo trató con tanta dureza por ello que su madre decidió sacarlo de esa escuela. Años después, cuando ya era un conferenciante famoso, tomó clases de oratoria y practicaba con cuidado su forma de hablar en público. Llegó a ser uno de los mejores comunicadores científicos de su siglo, lo que demuestra que una dificultad en la infancia no determina lo que una persona puede lograr." },
      { label: "Dato Científico", icon: "atom", text: "El oficio de su padre, la herrería, está lleno de física y química sin que el herrero lo sepa. Al calentar el hierro, el metal brilla primero rojo oscuro, luego naranja y después amarillo, porque los objetos calientes emiten luz cuyo color depende de su temperatura. Los herreros usaban ese color como termómetro. Muchas décadas después, el estudio de esa luz emitida por los cuerpos calientes llevó a Max Planck, en 1900, a dar el primer paso de la física cuántica." }
    ],
    fact: "La Londres en la que creció Faraday tenía alrededor de un millón de habitantes según el censo de 1801, lo que la convertía en una de las ciudades más grandes del mundo. Por las noches las calles se iluminaban con lámparas de aceite, y el alumbrado de gas apenas comenzaba a instalarse en la década de 1810. Nadie imaginaba entonces que aquel niño pobre descubriría los principios que hoy permiten generar la electricidad que ilumina las ciudades de todo el planeta.",
  },
  {
    id: "aprendiz-de-encuadernador",
    bannerImage: '/assets/faraday/infographic_m1/banner_aprendiz-de-encuadernador.webp',
    bannerCaption: "En 1805, con 14 años, Faraday empezó un aprendizaje de siete años como encuadernador con el librero George Riebau.",
    title: "Aprendiz en una librería",
    color: '#8B6F4E',
    btnImage: '/assets/faraday/infographic_m1/btn_aprendiz-de-encuadernador.webp',
    image: '/assets/faraday/infographic_m1/hero_aprendiz-de-encuadernador.webp',
    content: [
      "La tienda donde Faraday hacía recados pertenecía a George Riebau, un librero y encuadernador de origen francés que tenía su negocio en Blandford Street, en Londres. Riebau quedó tan contento con el muchacho que, en octubre de 1805, cuando Michael tenía 14 años, lo aceptó como aprendiz de encuadernador durante siete años. Lo más llamativo es que no le cobró la cuota que normalmente pagaban las familias por un aprendizaje, en reconocimiento a lo bien que había trabajado. Para los Faraday fue una gran oportunidad.",
      "Encuadernar libros era un oficio artesanal que exigía precisión: había que doblar y coser los pliegos de papel, pegarlos, prensarlos y cubrirlos con cartón y cuero. Faraday aprendió a trabajar con las manos de forma cuidadosa y ordenada, una habilidad que más tarde le resultaría muy útil para construir sus propios aparatos científicos. En el laboratorio sería famoso por su destreza para fabricar instrumentos con materiales sencillos, como alambres, corchos, vidrio y papel, algo que aprendió en buena parte en el taller.",
      "Pero el verdadero tesoro de la librería eran los libros. Mientras los encuadernaba, Faraday los leía. Riebau le permitía hacerlo, e incluso lo animaba. Así, un aprendiz sin estudios tuvo acceso a obras que pocos jóvenes pobres podían leer. Faraday no leía por pasar el rato: tomaba notas, copiaba dibujos y escribía sus propias ideas en cuadernos. Un libro que lo marcó fue La mejora de la mente, del pastor inglés Isaac Watts, que recomendaba llevar un cuaderno de notas, asistir a conferencias y discutir las ideas con otros.",
      "Entre los libros que pasaron por sus manos estaba la Enciclopedia Británica. Faraday leyó con especial interés el artículo sobre la electricidad, que describía experimentos con máquinas que producían chispas y con frascos que almacenaban carga eléctrica. No se conformó con leer: quiso comprobarlo por sí mismo. Con su escaso dinero compró materiales baratos y construyó en casa una máquina electrostática usando una botella de vidrio. También fabricó una pequeña pila eléctrica con monedas de cobre y discos de zinc separados por papel húmedo.",
      "En la casa de Riebau se alojaba un pintor francés llamado Jean-Jacques Masquerier, que enseñó a Faraday a dibujar con perspectiva. Esta habilidad le permitió ilustrar con claridad sus notas y, más tarde, sus experimentos. Además, el joven aprendiz mantenía correspondencia con un amigo, Benjamin Abbott, con quien discutía de ciencia por carta. En esas cartas se nota a un muchacho curioso que ya pensaba como científico: hacía preguntas, proponía pruebas y reconocía cuando no sabía algo. El taller se había convertido en su universidad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La pila que Faraday construyó de joven imitaba la inventada por el italiano Alessandro Volta en 1800, apenas unos años antes. Volta apilaba discos de dos metales distintos separados por cartón empapado en agua salada, y así obtuvo por primera vez una corriente eléctrica continua. Años más tarde, en 1814, durante un viaje por Europa, Faraday conoció en persona a Volta en Milán. El aprendiz que había copiado su pila con monedas estrechó la mano de su inventor." },
      { label: "Dato Científico", icon: "atom", text: "Una pila funciona gracias a una reacción química. En la pila de monedas de Faraday, el zinc tiende a perder electrones con más facilidad que el cobre. Cuando ambos metales se conectan a través de un líquido salado o ácido y de un cable, los electrones viajan por el cable desde el zinc hacia el cobre, produciendo una corriente eléctrica. Cada par de discos aporta un voltaje pequeño, cercano a un voltio, y por eso hay que apilar muchos pares para obtener más energía." }
    ],
    fact: "Faraday conservó durante toda su vida el cariño por los libros bien hechos. Sus propias notas de laboratorio, que llevó durante más de cuarenta años, están encuadernadas en grandes volúmenes y sus párrafos van numerados de manera continua, lo que le permitía citar experimentos antiguos con precisión. Ese diario de laboratorio se conserva en la Royal Institution de Londres y es una de las fuentes más valiosas para entender cómo trabajaba un gran científico experimental.",
  },
  {
    id: "conversaciones-sobre-quimica",
    bannerImage: '/assets/faraday/infographic_m1/banner_conversaciones-sobre-quimica.webp',
    bannerCaption: "Conversaciones sobre Química, de Jane Marcet (1805), fue el libro que inspiró a Faraday a dedicarse a la ciencia.",
    title: "El libro que lo cambió todo",
    color: '#7F8A5C',
    btnImage: '/assets/faraday/infographic_m1/btn_conversaciones-sobre-quimica.webp',
    image: '/assets/faraday/infographic_m1/hero_conversaciones-sobre-quimica.webp',
    content: [
      "Entre todos los libros que encuadernó, uno cambió su vida: Conversaciones sobre Química, publicado en 1805 por la escritora británica Jane Marcet. El libro explicaba la química a través de diálogos entre una profesora, la señora B, y dos alumnas jóvenes, Emily y Caroline. Las explicaciones eran claras, con ejemplos de la vida cotidiana y descripciones de experimentos. Para Faraday fue una revelación: la ciencia no era algo reservado a los sabios de las universidades, sino algo que cualquiera podía entender y practicar.",
      "Jane Marcet se había basado en lo que aprendió asistiendo a las conferencias del químico Humphry Davy en la Royal Institution, y en conversaciones con su esposo, el médico Alexander Marcet. Su obra tuvo un enorme éxito y se reeditó muchas veces a ambos lados del Atlántico. En una época en que las mujeres casi no podían acceder a la universidad, Marcet escribió uno de los libros de divulgación científica más influyentes del siglo XIX. Sin saberlo, formó al que se convertiría en el mayor científico experimental de su tiempo.",
      "Lo que más le gustó a Faraday fue que el libro le permitía comprobar las afirmaciones por sí mismo. Repetía en casa los experimentos que podía pagar y anotaba los resultados. Así desarrolló un hábito que marcaría toda su carrera: no aceptar una idea solo porque estuviera escrita, sino verificarla con experimentos. Años después escribió que Conversaciones sobre Química le había dado una base sólida en esa ciencia, y que sentía que en Jane Marcet había encontrado una buena maestra.",
      "En 1810, con 18 años, Faraday empezó a asistir a las conferencias de John Tatum, un platero que organizaba charlas científicas en su casa, dentro de un grupo llamado la Sociedad Filosófica de la Ciudad. Cada conferencia costaba un chelín, y era su hermano mayor Robert, también herrero, quien le daba el dinero. Allí escuchó explicaciones sobre electricidad, química, mecánica y astronomía, conoció a otros jóvenes interesados en la ciencia y aprendió a debatir ideas con respeto y argumentos.",
      "Faraday tomaba notas detalladas de cada conferencia de Tatum, las pasaba en limpio en casa, añadía dibujos de los aparatos y finalmente las encuadernaba. Esta costumbre de escuchar, anotar, reescribir y ordenar lo ayudó a comprender temas difíciles y a recordar lo aprendido. Los psicólogos que estudian el aprendizaje confirman hoy que reescribir y explicar con palabras propias lo que se ha escuchado mejora mucho la comprensión. Faraday, sin conocer esas investigaciones, había descubierto uno de los mejores métodos de estudio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Faraday nunca olvidó lo que le debía a Jane Marcet. Años más tarde, cuando ya era un científico famoso, se conocieron en persona y mantuvieron una relación de amistad y respeto. Faraday le envió copias de algunos de sus trabajos y ella actualizó ediciones posteriores de su libro con nuevos descubrimientos, incluidos algunos del propio Faraday. Fue un círculo perfecto: la autora que inspiró al aprendiz terminó enseñando a nuevos lectores lo que ese aprendiz había descubierto." },
      { label: "Dato Científico", icon: "atom", text: "Cuando Jane Marcet publicó su libro en 1805, la química moderna era muy joven. Apenas en 1789 el francés Antoine Lavoisier había publicado su Tratado elemental de química, con una lista de sustancias simples que no podían descomponerse, el origen de nuestra idea de elemento químico. En 1803 el inglés John Dalton había propuesto que la materia está formada por átomos de distintos tipos y masas. Faraday aprendió química justo cuando esta ciencia estaba naciendo." }
    ],
    fact: "Conversaciones sobre Química tuvo un éxito enorme: se publicaron numerosas ediciones en Gran Bretaña y en Estados Unidos, y se tradujo a otros idiomas. En Estados Unidos se usó como libro de texto en escuelas durante décadas. Jane Marcet escribió después otros libros de divulgación en forma de diálogo, sobre economía política, física y botánica. Su historia demuestra que un buen libro de divulgación puede cambiar el destino de una persona y, a través de ella, el de toda la humanidad.",
  },
  {
    id: "cuaderno-para-davy",
    bannerImage: '/assets/faraday/infographic_m1/banner_cuaderno-para-davy.webp',
    bannerCaption: "En 1812 Faraday asistió a cuatro conferencias de Humphry Davy y le envió sus notas encuadernadas, de más de 300 páginas.",
    title: "Un cuaderno para Humphry Davy",
    color: '#6E5F7E',
    btnImage: '/assets/faraday/infographic_m1/btn_cuaderno-para-davy.webp',
    image: '/assets/faraday/infographic_m1/hero_cuaderno-para-davy.webp',
    content: [
      "En 1812 ocurrió algo decisivo. William Dance, un cliente de la librería y miembro de la Royal Institution, le regaló a Faraday entradas para las últimas cuatro conferencias que daría Humphry Davy, el químico más famoso de Inglaterra. Davy había descubierto el potasio y el sodio en 1807 usando la electricidad de grandes pilas, y sus conferencias eran espectáculos llenos de experimentos que atraían a cientos de personas. Para un aprendiz de encuadernador, sentarse en aquella sala era casi como entrar en otro mundo.",
      "Faraday se sentó en la galería, cerca del reloj, y escuchó con atención total. Tomó notas rápidas durante cada conferencia y luego, en casa, las reescribió con todo detalle, añadiendo dibujos precisos de los aparatos y experimentos. El resultado fue un manuscrito de más de 300 páginas que él mismo encuadernó con todo el cuidado que había aprendido en el taller. Era a la vez un trabajo de estudiante aplicado y una muestra de su oficio: el mejor currículum que un joven sin estudios podía presentar.",
      "Mientras tanto, su aprendizaje terminó en octubre de 1812 y empezó a trabajar como encuadernador para otro patrón, Henri De La Roche, con quien no se sentía feliz. Faraday deseaba dejar el comercio y dedicarse a la ciencia, que según él volvía a sus seguidores más amables y generosos. Escribió al presidente de la Royal Society, Joseph Banks, pidiendo cualquier trabajo científico, pero no recibió respuesta. Lejos de rendirse, decidió dirigirse directamente a Davy y le envió el cuaderno con sus notas.",
      "Por casualidad, a finales de 1812 Davy había sufrido una lesión en un ojo por una explosión durante un experimento con tricloruro de nitrógeno, una sustancia muy inestable. Durante unos días necesitó ayuda para escribir, y empleó temporalmente a Faraday como secretario. Davy respondió además a la carta del joven con amabilidad, elogiando el cuaderno, aunque le advirtió que la ciencia era una carrera difícil y mal pagada, y le aconsejó seguir en su oficio. Faraday no se desanimó: ya había puesto un pie en la puerta.",
      "La oportunidad llegó pocas semanas después. En febrero de 1813, el ayudante del laboratorio de la Royal Institution, William Payne, fue despedido por pelearse con un fabricante de instrumentos. Davy se acordó de aquel joven del cuaderno encuadernado y lo recomendó. El 1 de marzo de 1813 Faraday fue contratado como asistente químico, con un sueldo de 25 chelines a la semana, alojamiento en dos habitaciones del edificio, combustible y velas. Tenía 21 años y comenzaba la aventura científica de su vida."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El cuaderno con las notas de las conferencias de Davy se conserva todavía en la Royal Institution de Londres. Sus páginas muestran la letra cuidadosa de Faraday y dibujos detallados de los aparatos utilizados. A menudo se repite que Davy habría dicho que su mayor descubrimiento fue Michael Faraday; no hay pruebas firmes de que pronunciara esa frase, pero refleja bien lo que muchos historiadores piensan: entre todos sus logros, haber dado esa oportunidad fue uno de los más importantes." },
      { label: "Dato Científico", icon: "atom", text: "Davy descubrió el potasio y el sodio en 1807 mediante electrólisis: hizo pasar una corriente eléctrica intensa a través de potasa y de sosa fundidas, y en el polo negativo aparecieron pequeños glóbulos metálicos brillantes que ardían al tocar el agua. Al año siguiente aisló también el calcio, el magnesio, el bario y el estroncio. Fue una demostración de que la electricidad podía separar compuestos químicos, un tema que Faraday llevaría mucho más lejos con sus leyes de la electrólisis." }
    ],
    fact: "La Royal Institution, donde Faraday entró a trabajar, había sido fundada en 1799 en Londres para difundir el conocimiento científico y aplicarlo a la vida diaria. Su edificio de Albemarle Street sigue funcionando hoy como centro de investigación y divulgación. En su sótano se conserva el laboratorio magnético de Faraday, reconstruido tal como estaba en la década de 1850, y un museo con muchos de sus aparatos originales, que cualquier visitante puede ver.",
  },
  {
    id: "asistente-en-la-royal-institution",
    bannerImage: '/assets/faraday/infographic_m1/banner_asistente-en-la-royal-institution.webp',
    bannerCaption: "Entre 1813 y 1815 Faraday viajó por Europa con Davy y conoció a científicos como Ampère y Volta.",
    title: "Asistente y viajero por Europa",
    color: '#5E7C78',
    btnImage: '/assets/faraday/infographic_m1/btn_asistente-en-la-royal-institution.webp',
    image: '/assets/faraday/infographic_m1/hero_asistente-en-la-royal-institution.webp',
    content: [
      "Los primeros trabajos de Faraday en la Royal Institution fueron modestos: lavar recipientes de vidrio, preparar sustancias químicas, cuidar los aparatos y ayudar a Davy y a otros profesores durante las conferencias. Pero Faraday observaba cada detalle y hacía preguntas. Muy pronto demostró ser un ayudante excepcional, ordenado y hábil con las manos. Aprendió técnicas de análisis químico y a manejar sustancias peligrosas. Algunas explotaron; en uno de esos accidentes resultó herido, una muestra de lo arriesgada que era la química de entonces.",
      "En octubre de 1813, apenas siete meses después de ser contratado, Davy lo invitó a acompañarlo en un largo viaje por Europa junto con su esposa. Gran Bretaña y Francia estaban en guerra, pero Napoleón concedió a Davy un permiso especial para visitar Francia por su prestigio científico. Durante año y medio recorrieron Francia, Italia, Suiza y parte de Alemania. Para Faraday, que nunca había salido de los alrededores de Londres, fue como una universidad itinerante en la que conoció a los mejores científicos del continente.",
      "En París conocieron al físico André-Marie Ampère y al químico Joseph Louis Gay-Lussac. Allí Davy estudió una sustancia violeta recién descubierta que resultó ser un nuevo elemento: el yodo. En Florencia, utilizando una enorme lente de la Accademia del Cimento para concentrar la luz solar, Davy y Faraday quemaron un diamante y comprobaron que solo producía dióxido de carbono, lo que confirmaba que el diamante es carbono puro. En Milán, Faraday conoció a Alessandro Volta, el inventor de la pila eléctrica.",
      "El viaje también tuvo momentos difíciles. El ayudante personal de Davy se negó a viajar, y Faraday tuvo que hacer también tareas de sirviente. La esposa de Davy, Jane Apreece, lo trataba con desprecio y lo hacía comer con los criados. Faraday escribió cartas a su amigo Benjamin Abbott contando que estaba tentado de abandonar y volver a casa. Pero aguantó, porque sabía que lo que estaba aprendiendo valía mucho. Regresó a Londres en abril de 1815 con un conocimiento científico que ningún libro le habría dado.",
      "De vuelta en la Royal Institution, Faraday fue recontratado con un puesto mejor. En 1816 publicó su primer artículo científico, un análisis de una muestra de cal procedente de la Toscana. A partir de entonces sus investigaciones fueron cada vez más importantes: estudió aleaciones de acero, gases y nuevos compuestos de carbono y cloro. En 1821 se casó con Sarah Barnard, hija de una familia de su misma congregación, con quien compartió el resto de su vida en las habitaciones de la Royal Institution. No tuvieron hijos, pero criaron a una sobrina."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante el viaje por Europa, Faraday llevó un diario en el que anotaba todo lo que le sorprendía: los paisajes de los Alpes, las luciérnagas de Italia, las costumbres de cada país y, por supuesto, los experimentos que presenciaba. Era la primera vez que veía montañas, el mar Mediterráneo y ciudades como París o Roma. Ese diario se ha publicado y muestra a un joven de poco más de 20 años con una curiosidad inagotable por absolutamente todo lo que veía." },
      { label: "Dato Científico", icon: "atom", text: "El experimento del diamante en Florencia, en 1814, fue una prueba química muy elegante. El diamante y el grafito de los lápices parecen totalmente distintos: uno es transparente y durísimo, y el otro es negro y blando. Pero al quemarlos ambos producen solo dióxido de carbono, porque los dos están formados únicamente por átomos de carbono. La diferencia está en cómo se ordenan esos átomos: en el diamante forman una red tridimensional muy rígida y en el grafito forman capas que se deslizan." }
    ],
    fact: "André-Marie Ampère, a quien Faraday conoció en París en 1813, se convertiría años después en uno de los fundadores del electromagnetismo. En 1820, al conocer el experimento del danés Hans Christian Ørsted, que mostró que una corriente eléctrica desvía una brújula, Ampère estudió las fuerzas entre corrientes eléctricas. Hoy la unidad de corriente eléctrica del Sistema Internacional, el amperio, lleva su nombre, y Faraday mantuvo correspondencia científica con él durante años.",
  },
  {
    id: "primeros-grandes-descubrimientos",
    bannerImage: '/assets/faraday/infographic_m1/banner_primeros-grandes-descubrimientos.webp',
    bannerCaption: "En 1821 Faraday logró la primera rotación electromagnética, el principio del motor eléctrico.",
    title: "De ayudante a gran descubridor",
    color: '#8A6060',
    btnImage: '/assets/faraday/infographic_m1/btn_primeros-grandes-descubrimientos.webp',
    image: '/assets/faraday/infographic_m1/hero_primeros-grandes-descubrimientos.webp',
    content: [
      "En 1820 Hans Christian Ørsted descubrió que una corriente eléctrica desvía la aguja de una brújula: electricidad y magnetismo estaban conectados. En 1821 un editor le pidió a Faraday que escribiera un resumen de lo que se sabía sobre el tema. Para entenderlo bien, repitió todos los experimentos conocidos. El 3 y 4 de septiembre de 1821 diseñó un aparato en el que un alambre con corriente, colgado sobre un recipiente con mercurio y un imán en el centro, giraba continuamente alrededor del imán. Era el primer motor eléctrico.",
      "Ese motor era muy simple y no servía para mover máquinas, pero demostraba algo fundamental: la electricidad y el magnetismo pueden combinarse para producir movimiento continuo. Todos los motores eléctricos actuales, desde los de un ventilador hasta los de un coche eléctrico o un tren de alta velocidad, se basan en esa interacción entre corrientes eléctricas y campos magnéticos. El descubrimiento hizo famoso a Faraday en toda Europa, aunque también le causó un disgusto por una acusación injusta de haber usado ideas de otro científico sin citarlo.",
      "En 1823 Faraday consiguió licuar el cloro, es decir, convertir ese gas en líquido aplicando presión y frío dentro de un tubo de vidrio sellado. Luego hizo lo mismo con otros gases. Estos experimentos ayudaron a comprender que los gases pueden convertirse en líquidos, la base de la refrigeración moderna. En 1824 fue elegido miembro de la Royal Society, la sociedad científica más prestigiosa de Gran Bretaña. Y en 1825 descubrió el benceno, una sustancia hoy fundamental en la industria química para fabricar plásticos, tintes y medicamentos.",
      "En 1825 fue nombrado director del laboratorio de la Royal Institution, y en 1833 se convirtió en el primer profesor Fulleriano de Química, un puesto creado para él que mantuvo de por vida. Pero su descubrimiento más importante llegó el 29 de agosto de 1831: la inducción electromagnética. Faraday demostró que un campo magnético que cambia puede producir una corriente eléctrica. Ese mismo año construyó un disco de cobre que giraba entre los polos de un imán y producía corriente continua: el primer generador eléctrico.",
      "Faraday también formuló las leyes de la electrólisis, que relacionan la cantidad de electricidad que pasa por una sustancia con la cantidad de materia que se descompone, e inventó palabras que todavía usamos, como electrodo, ánodo, cátodo, ion y electrolito, con ayuda del erudito William Whewell. Además imaginó que alrededor de imanes y cargas existían líneas de fuerza que llenaban el espacio. Esa idea del campo, que James Clerk Maxwell convirtió en ecuaciones, es uno de los conceptos más importantes de toda la física moderna."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Cuando Faraday fue propuesto para la Royal Society en 1824, su antiguo jefe Humphry Davy, que entonces presidía la sociedad, se opuso a su elección. Al parecer Davy sentía celos del éxito de su antiguo ayudante y estaba molesto por la polémica en torno al motor eléctrico. Aun así, Faraday fue elegido casi por unanimidad, con un solo voto en contra en la votación secreta. A pesar del conflicto, Faraday siempre habló de Davy con respeto y gratitud." },
      { label: "Dato Científico", icon: "atom", text: "Hoy dos conceptos de la física y la química llevan el nombre de Faraday. El faradio es la unidad de capacidad eléctrica, que mide cuánta carga puede almacenar un condensador, un componente presente en casi todos los aparatos electrónicos. Y la constante de Faraday, de aproximadamente 96,485 culombios por mol, indica cuánta carga eléctrica transporta un mol de electrones; se usa para calcular, por ejemplo, cuánto metal se deposita al recubrir un objeto mediante electrólisis." }
    ],
    fact: "Faraday descubrió el benceno en 1825 en un residuo aceitoso que se acumulaba en los depósitos del gas que se usaba entonces para el alumbrado de Londres, y lo llamó bicarburo de hidrógeno. Décadas después, en 1865, el químico alemán August Kekulé propuso que sus seis átomos de carbono forman un anillo. Hoy sabemos que el benceno es tóxico y se maneja con cuidado, pero sus derivados son la base de miles de productos, desde medicinas hasta fibras textiles.",
  },
  {
    id: "legado-de-un-autodidacta",
    bannerImage: '/assets/faraday/infographic_m1/banner_legado-de-un-autodidacta.webp',
    bannerCaption: "Faraday impartió 19 series de Conferencias de Navidad para jóvenes; la de 1860 se publicó como La historia química de una vela.",
    title: "El legado de un autodidacta",
    color: '#77706A',
    btnImage: '/assets/faraday/infographic_m1/btn_legado-de-un-autodidacta.webp',
    image: '/assets/faraday/infographic_m1/hero_legado-de-un-autodidacta.webp',
    content: [
      "Faraday creía que la ciencia debía compartirse con todo el mundo, especialmente con los jóvenes. En 1825 impulsó en la Royal Institution las Conferencias de Navidad, charlas científicas para niños y adolescentes, y en 1826 las Conferencias de los Viernes por la noche para el público adulto. Él mismo dio 19 series de Conferencias de Navidad entre 1827 y 1860. Explicaba con experimentos espectaculares, lenguaje sencillo y mucho entusiasmo. Las Conferencias de Navidad siguen celebrándose cada año y hoy se transmiten por televisión.",
      "Su serie más famosa fue La historia química de una vela, impartida en las Navidades de 1860 y 1861 y publicada como libro en 1861. A partir de algo tan cotidiano como una vela encendida, Faraday explicó la combustión, el papel del oxígeno, la formación de agua y dióxido de carbono, y hasta la respiración de los seres vivos. El libro se ha traducido a muchos idiomas y se sigue editando hoy. Es un modelo de divulgación: partir de lo conocido para llegar a ideas profundas.",
      "A pesar de su fama, Faraday fue siempre humilde. Rechazó el título de caballero, porque quería seguir siendo simplemente Michael Faraday, y rechazó dos veces la presidencia de la Royal Society. También se negó a ayudar al gobierno británico a fabricar armas químicas para la guerra de Crimea, por motivos éticos. En 1858 la reina Victoria le ofreció una casa en Hampton Court, cerca de Londres, donde pasó sus últimos años. Se dice que aconsejaba a los jóvenes científicos resumir su método en tres palabras: trabajar, terminar y publicar.",
      "Desde alrededor de 1840 Faraday sufrió problemas de memoria, mareos y agotamiento que le obligaron a interrumpir varias veces su trabajo. Algunos historiadores piensan que pudieron deberse en parte al contacto prolongado con mercurio y otras sustancias tóxicas en el laboratorio, aunque la causa exacta no se conoce con certeza. Aun así, siguió investigando durante años y en 1845 descubrió que un campo magnético puede alterar la luz, un fenómeno hoy llamado efecto Faraday. Murió el 25 de agosto de 1867, a los 75 años.",
      "El legado de Faraday está en cada enchufe. La electricidad que llega a nuestras casas se produce en generadores basados en la inducción que él descubrió, y se distribuye mediante transformadores que usan el mismo principio. Albert Einstein tenía en su estudio de Berlín retratos de tres científicos: Isaac Newton, James Clerk Maxwell y Michael Faraday. Que un niño pobre, que dejó la escuela a los 13 años y aprendió ciencia leyendo los libros que encuadernaba, esté en esa lista demuestra que la curiosidad y el trabajo pueden superar la falta de recursos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Entre 1991 y 2001 el retrato de Michael Faraday apareció en los billetes de 20 libras del Banco de Inglaterra. En el reverso se veía a Faraday dando una de sus Conferencias de Navidad ante un público de jóvenes en la Royal Institution. Fue una forma de honrar no solo al científico, sino también al divulgador. Faraday fue enterrado de forma sencilla en el cementerio de Highgate, en Londres, aunque hay una placa en su memoria en la Abadía de Westminster." },
      { label: "Dato Científico", icon: "atom", text: "El efecto Faraday, descubierto en 1845, demuestra que la luz y el magnetismo están relacionados. Faraday hizo pasar un haz de luz polarizada, cuyas ondas vibran en un solo plano, a través de un bloque de vidrio muy denso colocado junto a un electroimán potente, y observó que el plano de vibración giraba. Hoy los astrónomos usan este efecto para medir campos magnéticos en nubes de gas de nuestra galaxia, y los ingenieros lo aprovechan en dispositivos de fibra óptica." }
    ],
    fact: "En 1846 Faraday publicó un breve texto titulado Pensamientos sobre las vibraciones de los rayos, en el que sugirió que la luz podría ser una vibración de las líneas de fuerza eléctricas y magnéticas. Era una idea intuitiva, sin matemáticas. Casi veinte años después, en 1865, James Clerk Maxwell demostró con ecuaciones que la luz es una onda electromagnética. El autodidacta sin formación matemática había intuido una de las grandes verdades de la física.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradFaradayM1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6A7F94", "#8B6F4E", "#7F8A5C", "#6E5F7E", "#5E7C78", "#8A6060", "#77706A"];
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
          <linearGradient id="gradFaradayM1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE APRENDIZ A GENIO DE LA CIENCIA</text>
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
          layoutId="activeDotFaradayM1"
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
export default function InteractiveInfographic_FaradayM1() {
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
              🏆 La historia real de Michael Faraday: libros prestados, curiosidad y trabajo duro
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
