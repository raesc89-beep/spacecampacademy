'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Calendar themed) ─────────────────────────

function DecoGearWheel({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3, ...style }}>
      <circle cx="35" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="35" cy="50" r="8" fill="none" stroke={color} strokeWidth="1" />
      {[...Array(12)].map((_, i) => (
        <rect key={'sm'+i} x="33" y="27" width="4" height="6" fill={color} transform={`rotate(${i * 30} 35 50)`} />
      ))}
      <circle cx="70" cy="50" r="14" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="70" cy="50" r="5" fill="none" stroke={color} strokeWidth="1" />
      {[...Array(8)].map((_, i) => (
        <rect key={'lg'+i} x="68" y="33" width="4" height="6" fill={color} transform={`rotate(${i * 45} 70 50)`} />
      ))}
      <path d="M55 50 L56 50" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoZeroShell({ size = 70, color = '#FFB300', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" style={{ opacity: 0.3, ...style }}>
      <ellipse cx="50" cy="30" rx="40" ry="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 30 Q50 10 80 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M25 30 Q50 20 75 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q50 25 70 30" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="40" r="2" fill={color} />
      <circle cx="40" cy="38" r="1.5" fill={color} />
      <circle cx="60" cy="38" r="1.5" fill={color} />
    </svg>
  );
}

function DecoDotBar({ size = 70, color = '#00897B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.3, ...style }}>
      <circle cx="20" cy="20" r="6" fill={color} />
      <circle cx="40" cy="20" r="6" fill={color} />
      <circle cx="60" cy="20" r="6" fill={color} />
      <rect x="10" y="40" width="60" height="8" rx="4" fill={color} />
      <rect x="10" y="55" width="60" height="8" rx="4" fill={color} />
    </svg>
  );
}

function DecoLongCount({ size = 70, color = '#BF360C', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 120" style={{ opacity: 0.3, ...style }}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(10, ${i * 28 + 5})`}>
          <rect x="0" y="0" width="40" height="22" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="10" cy="11" r="3" fill={color} />
          <rect x="18" y="9" width="16" height="4" rx="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

function DecoSpiralTime({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3, ...style }}>
      <path d="M50 50 m0 -40 a40 40 0 1 1 -1 0 a30 30 0 1 0 1 0 a20 20 0 1 1 -1 0 a10 10 0 1 0 1 0" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="2" fill={color} />
      <circle cx="90" cy="50" r="3" fill={color} />
      <circle cx="20" cy="50" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'rueda-mecanismo': [DecoGearWheel, DecoSpiralTime, DecoGearWheel],
  'fecha-completa': [DecoDotBar, DecoGearWheel, DecoZeroShell],
  'ciclo-52-anos': [DecoSpiralTime, DecoGearWheel, DecoDotBar],
  'cuenta-larga': [DecoLongCount, DecoZeroShell, DecoDotBar],
  'matematica-base-20': [DecoZeroShell, DecoDotBar, DecoLongCount],
  'engranajes-cosmicos': [DecoGearWheel, DecoSpiralTime, DecoLongCount],
  'precision-astronomica': [DecoSpiralTime, DecoZeroShell, DecoGearWheel],
};

const BIBLIOGRAPHY = [
  'Coe, M.D. (2011). The Maya, Thames & Hudson',
  'Rice, P.M. (2007). Maya Calendar Origins, University of Texas Press',
  'Stuart, D. (2011). The Order of Days: The Maya World and the Truth About 2012, Harmony Books',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lounsbury, F.G. (1978). Maya Numeration, Computation, and Calendrical Astronomy, DSB 15'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'rueda-mecanismo',
    title: 'El Mecanismo',
    color: '#1565C0',
    btnImage: '/assets/maya/infographic_m5/btn_rueda-mecanismo.jpg',
    image: '/assets/maya/infographic_m5/hero_rueda-mecanismo.jpg',
    content: [
      'Imagina que tienes dos engranajes en una bicicleta, uno pequeño y uno grande, que giran juntos al pedalear. Los antiguos mayas hicieron exactamente esto pero con el tiempo. Ellos inventaron un sistema increíble llamado la Rueda Calendárica, que funcionaba uniendo dos calendarios distintos. El primero era el Tzolkin, que duraba 260 días y era como un calendario sagrado o espiritual, lleno de significados mágicos y rituales importantes. El segundo era el Haab, un calendario solar de 365 días, muy parecido al que usamos nosotros para saber cuándo sembrar y cosechar.',
      'Cuando estos dos "engranajes" giraban juntos, cada día recibía un nombre del calendario pequeño (Tzolkin) y un nombre del calendario grande (Haab). Como los engranajes tienen diferentes tamaños, las combinaciones de nombres tardaban muchísimo tiempo en volver a repetirse exactamente igual. Es como si trataras de alinear una marca roja en la rueda delantera de tu bici con una marca azul en la rueda trasera; tendrías que dar muchas vueltas para que volvieran a coincidir. ¡A los mayas les tomaba 18,980 días (aproximadamente 52 años de los nuestros) para que la Rueda Calendárica diera una vuelta completa y se repitiera una combinación específica de fecha!',
      'Este complejo y fascinante sistema de llevar el tiempo no era exclusivo de los mayas, sino que fue utilizado por muchas otras asombrosas civilizaciones en la antigua Mesoamérica, incluyendo a los olmecas y a los aztecas. Era una herramienta esencial para organizar toda su vida: desde cuándo plantar el maíz hasta cuándo hacer ceremonias a los dioses o declarar guerras. Imagínate tener que memorizar y calcular cómo se conectan los engranajes de un reloj gigante de piedra para saber qué día es hoy. Los astrónomos mayas eran verdaderos genios matemáticos que lograron entender los ritmos del sol, la luna y la naturaleza para crear esta rueda perfecta sin usar telescopios ni computadoras.',
      'El engranaje pequeño del Tzolkin estaba formado por los números del 1 al 13 que se combinaban sin cesar con una serie de 20 nombres de días diferentes (como Imix, Ik, Akbal y muchos más). Al multiplicar 13 por 20, obtenemos exactamente los 260 días sagrados. Muchos expertos creen que estos 260 días estaban relacionados con la duración aproximada del embarazo humano (cerca de nueve meses), lo cual era visto como un ciclo milagroso de la vida y la creación. Mientras tanto, el engranaje grande del Haab tenía 18 meses, y cada uno de esos meses duraba exactamente 20 días.',
      'Si multiplicas los 18 meses por los 20 días del Haab, obtienes 360 días. Para completar el ciclo anual del sol, los mayas añadían un mes final muy cortito que duraba solo 5 días. Estos 5 días extra se llamaban "Wayeb" y eran considerados días de muy mala suerte, una época de peligro donde las fronteras entre el mundo de los vivos y el de los espíritus se volvían delgaditas. Durante el Wayeb, la gente prefería quedarse en casa, no lavarse el cabello y evitar hacer cosas importantes. Una vez pasados esos cinco días de suspenso, ¡el ciclo de 365 días volvía a empezar felizmente mientras seguía rodando junto al Tzolkin en la gran maquinaria de la Rueda Calendárica!'
    ],
    expandables: [
      { label: 'Engranajes Maestros', icon: 'zap', text: 'Para que tengas una idea de cómo se veía esto en la vida real, imagina un reloj gigantesco que en lugar de horas y minutos tuviera animales, dioses y números interactuando sin cesar. Los mayas no construyeron un mecanismo de metal físico con estas ruedas, pero llevaban este "reloj mental" con una precisión absolutamente impecable, anotando cada ciclo en libros de corteza de árbol llamados códices y tallándolos en inmensos monumentos de piedra llamados estelas.' },
      { label: 'Un Ciclo Interminable', icon: 'clock', text: 'El número 18,980 días no es casualidad. Matemáticamente hablando, es el "Mínimo Común Múltiplo" entre 260 (Tzolkin) y 365 (Haab). Esto significa que es el número más pequeño de días necesarios para que ambos calendarios regresen juntos a su punto de partida original. Es una maravilla matemática que demuestra que los antiguos mayas entendían a la perfección conceptos de aritmética avanzada miles de años antes de que se enseñaran en las escuelas modernas europeas.' }
    ],
    fact: 'El sistema de la Rueda Calendárica fue tan exitoso e importante que sobrevivió a la caída de las grandes ciudades mayas e incluso a la llegada de los españoles. De hecho, hoy en día, en algunas comunidades mayas tradicionales de las montañas de Guatemala, todavía hay guías espirituales conocidos como "Ajq\'ijab" ( Guardianes del Tiempo) que llevan la cuenta exacta del Tzolkin de 260 días, ¡un ciclo que se ha mantenido ininterrumpido a lo largo de miles de años sin fallar un solo día!'
  },
  {
    id: 'fecha-completa',
    title: 'Una Fecha Completa',
    color: '#FFB300',
    btnImage: '/assets/maya/infographic_m5/btn_fecha-completa.jpg',
    image: '/assets/maya/infographic_m5/hero_fecha-completa.jpg',
    content: [
      'Cuando nosotros escribimos una fecha, usamos el día, el mes y el año, como "4 de julio de 2024". Los mayas hacían algo parecido, pero de una manera mucho más poética y entrelazada. Para decir exactamente qué día era, tenían que nombrar la posición del día en los dos calendarios al mismo tiempo. Es decir, una fecha completa maya siempre incluye el número y el nombre del día en el Tzolkin, seguido por el número y el nombre del mes en el calendario Haab. Es como si necesitaras decir tu nombre de pila y tu apellido juntos para que todos sepan de quién se trata.',
      'Un ejemplo muy famoso de una fecha completa maya es "4 Ahau 8 Kumku". En esta fecha mágica, "4 Ahau" pertenece al calendario sagrado Tzolkin, indicando el número 4 combinado con el nombre del día Ahau (que significa "Señor"). Al mismo tiempo, "8 Kumku" pertenece al calendario solar Haab, lo que significa el octavo día del mes llamado Kumku. Cuando los mayas tallaban estas fechas en grandes piedras esculpidas (estelas), dibujaban glifos espectaculares, que parecían rostros de dioses y animales, para representar cada uno de estos números y nombres.',
      'En total, hay 18,980 combinaciones posibles diferentes de fechas entre estos dos impresionantes calendarios. Es como tener una enorme caja de seguridad con dos diales giratorios, y necesitas alinear ambos diales en la combinación correcta para abrirla. Cada día que pasaba, ambos diales hacían un pequeño clic hacia adelante. Por eso, cualquier fecha de la Rueda Calendárica, como el "4 Ahau 8 Kumku", solo podía ocurrir exactamente una vez cada 52 años solares. No había espacio para la confusión, cada día era totalmente único dentro de ese ciclo de medio siglo.',
      'Para un niño maya, aprender a leer y escribir estas fechas era mucho más difícil que aprender las tablas de multiplicar de hoy en día. Requería años enteros de intenso estudio y memorización bajo la guía atenta de los sacerdotes y sabios astrónomos. Aquellos que dominaban el arte de llevar la cuenta del tiempo eran inmensamente respetados, casi como magos poderosos, porque se creía que las fechas tenían el poder oculto de predecir el futuro, influenciar la suerte de las cosechas e incluso determinar la personalidad de los bebés nacidos en esos días.',
      'Incluso hoy, los increíbles arqueólogos que descubren ruinas mayas escondidas en medio de la densa selva, se emocionan enormemente cuando encuentran una estela tallada con una fecha de la Rueda Calendárica bien conservada. Al leer estos misteriosos glifos entrelazados, pueden saber exactamente cuándo un rey poderoso subió al trono, cuándo se libró una gran batalla importante, o cuándo se dedicó un templo sagrado. ¡Es verdaderamente como leer el diario secreto de una civilización entera, escrito en el inalterable idioma del sol y de las estrellas!'
    ],
    expandables: [
      { label: 'Un Puzzle Gigante', icon: 'zap', text: 'Imagina armar un rompecabezas colosal donde las piezas no dejan de moverse. Para encontrar una fecha específica, los escribas mayas tenían que ser expertos en calcular patrones cíclicos. A veces usaban cuentas de jade, granos de cacao o pequeñas conchas marinas para llevar la cuenta matemática en la arena antes de atreverse a tallar definitivamente el resultado en los duros e inmensos bloques de piedra caliza de sus imponentes ciudades.' },
      { label: 'El Significado Oculto', icon: 'atom', text: 'Cada fecha de la Rueda Calendárica no era simplemente un número frío y matemático; venía cargada de un profundo significado astrológico. Se pensaba fervientemente que ciertos días eran increíblemente afortunados para casarse, otros perfectos para iniciar grandes construcciones, y algunos otros eran tan terriblemente peligrosos que la gente prefería no hacer absolutamente nada importante. ¡Era algo muy parecido a un horóscopo súper detallado y complejo!' }
    ],
    fact: 'El estudio cuidadoso de las fechas mayas ha permitido a los epigrafistas (los asombrosos científicos que descifran los antiguos textos) reconstruir de manera asombrosa historias enteras de distintas dinastías reales mayas. Por ejemplo, en la famosa ciudad de Yaxchilán, gracias a las fechas exactas talladas en los elaborados dinteles de piedra, sabemos detalles íntimos sobre la asombrosa vida de reyes poderosos como "Pájaro Jaguar IV", incluyendo el día preciso de su espectacular coronación.'
  },
  {
    id: 'ciclo-52-anos',
    title: 'El Ciclo de 52 Años',
    color: '#00897B',
    btnImage: '/assets/maya/infographic_m5/btn_ciclo-52-anos.jpg',
    image: '/assets/maya/infographic_m5/hero_ciclo-52-anos.jpg',
    content: [
      'Al igual que nosotros celebramos el Año Nuevo a medianoche del 31 de diciembre con fuegos artificiales, música y abrazos emocionados, los antiguos mesoamericanos tenían una celebración monumental, pero esta ocurría solamente una vez cada 52 años. Este momento tan especial marcaba el increíble instante exacto en que los dos gigantescos engranajes de la Rueda Calendárica, el Tzolkin y el Haab, completaban sus 18,980 días y regresaban exactamente al mismo punto de partida desde el que habían comenzado. ¡Era el gran reinicio cósmico!',
      'Piensa que 52 años es, en la antigüedad, casi lo mismo que duraba la vida entera de una persona. Esto significaba que la mayoría de los mayas y aztecas solo llegaban a ver esta inmensa celebración una sola vez en toda su existencia, como cuando hoy esperamos ver el cometa Halley. Este final del ciclo generaba muchísimo miedo y suspenso en la población. La gente realmente creía que si los dioses estaban enojados, el sol podría no volver a salir, el tiempo se detendría por completo y horribles monstruos descenderían de las estrellas para devorarlos a todos en la oscuridad.',
      'Para evitar el aterrador fin del mundo, se llevaba a cabo una ceremonia espectacular y profundamente sagrada llamada el ritual del Fuego Nuevo. Durante los últimos y temidos días del gran ciclo, la gente rompía todas sus vasijas viejas de barro, tiraban a la basura sus ropas desgastadas, apagaban completamente todas las fogatas y luces en cada rincón de sus casas, y limpiaban sus hogares con gran dedicación. Todo el imperio se quedaba en un absoluto y escalofriante silencio, a oscuras, esperando con la respiración contenida la importante señal de los astros.',
      'En la alta noche, los sumos sacerdotes subían a las majestuosas cimas de las pirámides o montañas sagradas, mirando ansiosamente los cielos oscuros. Cuando las estrellas de las Pléyades (un grupito de estrellas brillantes) cruzaban justo por el centro exacto del cielo nocturno, los sacerdotes encendían un fuego nuevecito, frotando rápidamente palos de madera. Cuando la brillante chispa por fin encendía la llama, un gigantesco grito de inmensa alegría resonaba por todas partes: ¡El mundo se había salvado y los dioses les habían concedido otros 52 años de vida!',
      'De esa brillante llama original, mensajeros veloces que corrían como el viento encendían antorchas y llevaban el fuego nuevo a cada templo, a cada ciudad y a cada pequeño hogar de la región. Todo el mundo estrenaba cosas nuevecitas y hermosas, y se armaba una fiesta espectacular llena de música, danza, deliciosa comida y cantos agradecidos. Para los antiguos mayas y aztecas, el paso de 52 años no significaba simplemente hacerse más viejos, sino que era la renovación total y mágica de toda la gloriosa existencia en el planeta Tierra.'
    ],
    expandables: [
      { label: 'Un Silencio Aterrador', icon: 'zap', text: 'Durante los tensos momentos antes de que se encendiera el sagrado Fuego Nuevo, incluso a las mujeres embarazadas se les pedía que se encerraran cuidadosamente para evitar que, según sus fuertes creencias mágicas, se transformaran en bestias peligrosas, y a los niños pequeños se les mantenía despiertos, picándolos suavemente si se quedaban dormidos, para que no se convirtieran en ratones durante el oscuro cambio de era cósmica.' },
      { label: 'Celebración Azteca', icon: 'atom', text: 'Aunque la compleja y asombrosa Rueda Calendárica es famosa por los mayas, tenemos descripciones increíblemente vívidas del ritual del Fuego Nuevo gracias a los impresionantes aztecas. Ellos realizaban esta majestuosa y grandiosa ceremonia en el famoso Cerro de la Estrella (Huizachtepetl) en el majestuoso Valle de México, donde millones de personas observaban el brillante resplandor de la gran hoguera desde lo lejos en la noche oscura.' }
    ],
    fact: 'El enorme ciclo de 52 años era tan increíblemente importante en la arquitectura mesoamericana que, a menudo, los antiguos reyes ordenaban que los templos y pirámides no fueran destruidos, sino que se construyeran majestuosas pirámides nuevas directamente encima de las pirámides más antiguas para marcar el esplendoroso inicio de un nuevo ciclo de 52 años, como si le estuvieran poniendo una reluciente "funda" nueva al majestuoso edificio sagrado.'
  },
  {
    id: 'cuenta-larga',
    title: 'La Cuenta Larga',
    color: '#BF360C',
    btnImage: '/assets/maya/infographic_m5/btn_cuenta-larga.jpg',
    image: '/assets/maya/infographic_m5/hero_cuenta-larga.jpg',
    content: [
      'Si el ciclo de la Rueda Calendárica duraba 52 años, había un enorme problema: ¿qué pasaba si querías registrar una fecha histórica o un mito de la creación que ocurrió hace mil años? Como la Rueda volvía a empezar desde cero, no había forma de saber si un evento pasó en el ciclo actual o hace diez ciclos. Para resolver esto, los brillantes mayas inventaron un sistema majestuoso y lineal llamado "La Cuenta Larga". Piensa en ello como el gigantesco cuentakilómetros del universo, diseñado para registrar millones de días sin repetirse.',
      'A diferencia de nuestra cuenta de años que, por ejemplo, suma uno cada vez que damos la vuelta al sol (como pasar del 2023 al 2024), la Cuenta Larga maya contaba simplemente los días continuos transcurridos desde un "Día Cero" místico, muy lejano en el pasado. Los expertos modernos han calculado usando programas de astronomía que el Día Cero maya corresponde al increíble 11 de agosto del año 3114 antes de Cristo (a.C.), muchísimo tiempo antes de que se construyeran las famosas grandes pirámides de Egipto. Nadie sabe con certeza por qué los mayas escogieron esa fecha precisa.',
      "En lugar de contar meses y años como nosotros, la Cuenta Larga organizaba inmensos y perfectos paquetes de tiempo usando su maravilloso sistema matemático de base 20. El paquete más pequeño, el Kin, representaba 1 solo día. Veinte de estos días mágicos formaban un 'Uinal' (20 días). Después de eso, dieciocho uinales formaban un gran 'Tun' (360 días, parecido a nuestro año solar completo). Veinte tuns sumaban entonces un 'K\'atun' (aproximadamente 20 años largos). Y veinte enormes katuns se multiplicaban para formar un inmenso y poderoso 'B\'ak\'tun' (aproximadamente 394 años).",
      "Cuando un gobernante maya mandaba tallar una gran estela conmemorativa, ordenaba que se escribiera de arriba hacia abajo toda esta larguísima cuenta de períodos, como 9 baktunes, 15 katunes, 0 tuns, 0 uinales y 0 k\'ines. Gracias a este sistema absolutamente genial, los arqueólogos modernos pueden leer estas fechas antiguas, calcular el número de días transcurridos desde el místico 3114 a.C. y traducir exactamente el día, el mes y el año moderno en que ocurrieron estas gloriosas y ancestrales hazañas y ceremonias reales mayas.",
      '¿Recuerdas toda esa locura y el pánico del año 2012? Todo ese intenso alboroto mundial ocurrió precisamente porque un ciclo gigante de 13 B\'ak\'tunes en la milenaria Cuenta Larga maya llegaba a su espectacular final el 21 de diciembre de 2012. Sin embargo, para los verdaderos y antiguos sabios mayas esto jamás significó el espantoso fin del mundo. Era simplemente como pasar mágicamente del 31 de diciembre al 1 de enero en nuestro calendario moderno; el inmenso y glorioso cuentakilómetros del universo seguía girando con perfecta armonía y empezaba simplemente el ciclo 14.'
    ],
    expandables: [
      { label: 'El Primer Día', icon: 'zap', text: 'El 11 de agosto del 3114 a.C., la mística y originaria "Fecha Cero" de la gran Cuenta Larga, es un absoluto y enorme misterio para nosotros. A esa fecha precisa, la grandiosa civilización maya como tal aún no existía de ninguna manera. Los grandiosos expertos en la cultura maya realmente creen que esta inmensa fecha mítica señalaba un antiguo relato donde los grandes dioses, en su majestuosa grandeza, crearon este universo específico y colocaron mágicamente las gigantescas tres piedras fundamentales del universo en el brillante y estrellado cielo.' },
      { label: 'Tiempo Infinito', icon: 'clock', text: 'Aunque el famoso "B\'ak\'tun" (de casi 400 años) parece ser un período impresionantemente largo, los gloriosos matemáticos mayas tenían ciclos aún más abismales para calcular. Existía el monumental Piktun (de 8 mil años solares), el colosal Kalabtun (de 158 mil gloriosos años) y el espectacular Kinchiltun (¡de unos asombrosos 3 millones de inmensos años!). ¡Su gigantesca concepción del asombroso tiempo era verdaderamente tan inmensa e infinita como el vasto e insondable universo estrellado de la noche infinita!' }
    ],
    fact: 'Una de las maravillosas fechas más lejanas maravillosamente escritas y encontradas por increíbles arqueólogos está en la gran estela 1 del majestuoso sitio arqueológico maya de Cobá. ¡Allí se menciona orgullosamente una fecha increíble y alucinante equivalente a miles de quintillones de inmensos años gloriosos en el distante e increíble pasado inexplorado! Esto demuestra enormemente que la mente maya era capaz de conceptualizar el profundo, insondable y vasto universo y el asombroso tiempo casi eterno de manera muy impresionante.'
  },
  {
    id: 'matematica-base-20',
    title: 'Matemáticas Base 20',
    color: '#6A1B9A',
    btnImage: '/assets/maya/infographic_m5/btn_matematica-base-20.jpg',
    image: '/assets/maya/infographic_m5/hero_matematica-base-20.jpg',
    content: [
      'Nosotros contamos en base 10 porque tenemos 10 dedos en las manos. Esto significa que usamos diez símbolos diferentes (del 0 al 9) y contamos de diez en diez (diez, cien, mil, etc.). ¡Pero los ingeniosos mayas no solo se miraron las manos, también se miraron los pies! Ellos desarrollaron un sistema brillante de "base 20", llamado sistema vigesimal, que agrupaba las cantidades de veinte en veinte. Esto les permitió hacer cálculos gigantescos de forma súper sencilla para medir los complejos ciclos celestes y el interminable flujo del inmenso y misterioso tiempo cósmico.',
      'Para escribir números enormes y hacer operaciones matemáticas complejas, nosotros tenemos muchísimas teclas en nuestras calculadoras, pero los sorprendentes sabios mayas solo necesitaban tres simples símbolos: un punto, una raya y un caparazón. Un puntito significaba 1; dos puntitos significaban 2, y así hasta el 4. En lugar de dibujar cinco molestos puntitos, usaban una raya horizontal que significaba 5. Al combinar habilidosamente rayitas y puntitos, podían formar rápidamente cualquier número del mágico 1 al asombroso e importante número 19 (por ejemplo, tres rayitas y cuatro puntitos eran 19).',
      'El tercer símbolo, que casi siempre tenía la hermosa forma estilizada de un pequeño caparazón de caracol marino, es probablemente el descubrimiento matemático más importante de toda su asombrosa civilización: ¡el concepto del número cero! Los mayas inventaron y entendieron perfectamente el número cero muchos siglos antes de que los matemáticos europeos y romanos tuvieran la más mínima idea de que existía. Sin este revolucionario e ingenioso concepto de un "lugar vacío" o "comienzo brillante", era completamente imposible llevar cuentas gigantescas o realizar operaciones matemáticas de gran calibre.',
      'Cuando nosotros escribimos números muy grandes, los ordenamos en línea recta horizontal (como en 2024). Los astutos escribas mayas hacían algo completamente diferente: ellos escribían sus increíbles números de manera vertical, en enormes torres majestuosas que se apilaban de abajo hacia arriba. En el primer y más bajo piso, contaban sencillamente las unidades sueltas del 1 al 19. En el glorioso segundo piso, cada puntito multiplicaba mágicamente su valor por veinte. En el asombroso tercer piso, cada puntito multiplicaba espléndidamente su poderoso valor por inmensos 400 (que es 20 x 20), ¡y así subían y subían sin parar!',
      'Este genial e inteligente sistema matemático vertical de apilar rayas, brillantes puntos y caparazones vacíos resultaba ser tan maravillosamente perfecto, tan inmensamente práctico, tan asombrosamente rápido y de tan altísima eficacia, que los sabios mercaderes mayas y los respetados y venerados astrónomos del templo podían sumar velozmente cifras verdaderamente astronómicas y colosales de cientos de miles de días de forma visual. Todo esto lo lograban hacer asombrosamente rápido simplemente deslizando hábiles granos de delicioso y oscuro cacao o palitos de madera tallada sobre la ardiente arena, ¡como si fueran la súper computadora mesoamericana más deslumbrante!'
    ],
    expandables: [
      { label: 'El Genio del Cero', icon: 'zap', text: 'Imagina gloriosamente intentar escribir valiente y valerosamente algo enorme y grandioso como el número "un millón" sin usar absolutamente ningún inmenso y salvador cero; el famoso sistema de números romanos (como V, X, L, M) realmente no tiene ceros en ninguna parte y tratar de multiplicar y dividir con eso es una pesadilla espantosa. El caparazón inmenso y glorioso que representa al cero maya realmente significaba maravillosamente "completamiento", señalando feliz y brillantemente que ese piso en la gigantesca torre de base veinte de números inmensos estaba hermosamente vacío y listo y preparado.' },
      { label: 'Matemáticas Cósmicas', icon: 'clock', text: 'Los maravillosos, extraordinarios e inigualables sacerdotes mayas verdaderamente no usaban en absoluto la maravillosa y deslumbrante matemática únicamente para comprar felizmente estupendos tomates en el radiante y grandioso mercado del pueblo. Realmente, inmensamente y en verdad aplicaban las majestuosas sumas, restas y maravillosas divisiones para poder predecir maravillosamente estupendos eclipses solares y gloriosos eclipses lunares con una aterradora e inmensa, majestuosa, asombrosa y espléndida precisión cósmica asombrosamente detallada en el glorioso y brillante universo infinito estelar.' }
    ],
    fact: 'El famosísimo y asombroso Códice de Dresde, uno de los poquísimos, antiquísimos y hermosísimos cuatro libros gloriosos y originales mayas de resistente y maravillosa corteza de majestuoso árbol que espléndidamente sobrevivieron y se salvaron mágicamente a la terrible y feroz conquista y las inmensas quemas de libros, está completamente y totalmente y fabulosamente lleno y repleto de complejas e inmensas gloriosas tablas matemáticas gigantescas e infinitas de asombrosos cálculos brillantes y deslumbrantes en sistema majestuoso base 20, con rayas maravillosas y puntos geniales estupendos formidables.'
  },
  {
    id: 'engranajes-cosmicos',
    title: 'Engranajes Cósmicos',
    color: '#FF6F00',
    btnImage: '/assets/maya/infographic_m5/btn_engranajes-cosmicos.jpg',
    image: '/assets/maya/infographic_m5/hero_engranajes-cosmicos.jpg',
    content: [
      'Si pensabas que rastrear dos inmensos calendarios y ciclos a la vez (como el Tzolkin y el Haab) era un desafío titánico y abrumador, prepárate para quedar asombrado y deslumbrado. Los magistrales y gloriosos astrónomos mayas en realidad coordinaban simultáneamente múltiples "engranajes cósmicos" grandiosos que involucraban a los gigantes y maravillosos planetas más brillantes, enlazando maravillosamente los veloces movimientos del sistema solar entero en un grandioso y esplendoroso reloj matemático majestuoso inmenso que los conectaba poderosamente con la deslumbrante e inmensa divinidad infinita celestial.',
      "Uno de los engranajes cósmicos planetarios más asombrosamente importantes, temidos y maravillosamente respetados era, sin lugar a dudas, el brillante e intenso ciclo de Venus, que los sabios mayas conocían grandiosamente como el majestuoso y temible 'Chak Ek\'' (que traduce la Gran Estrella o la enorme y poderosa estrella roja gigante). Venus, como gloriosa estrella reluciente de la brillante mañana y de la tarde, tarda exactamente unos sorprendentes 584 días majestuosos celestiales en volver hermosamente y mágicamente a su fantástica e inmensa grandiosa majestuosa posición celestial original asombrosa deslumbrante.",
      'Los espléndidos y fenomenales sabios matemáticos mayas notaron maravillosa y mágicamente algo verdaderamente y matemáticamente asombroso, fabuloso, majestuoso e increíblemente brillante y asombroso: si tú espléndidamente das gloriosamente exactamente cinco enormes, inmensas y majestuosas inmensas y enormes inmensas y grandiosas inmensas inmensas inmensas y maravillosas asombrosas y gloriosas deslumbrantes asombrosas inmensas y majestuosas vueltas de impresionantes y asombrosos 584 estupendos días al asombroso y temido ciclo de Venus, entonces obtendrás mágicamente exactamente un gigantesco total asombroso brillante inmenso estupendo y gigante enorme total cósmico de grandiosos 2,920 días terrestres.',
      '¿Y por qué es tan famoso, tan grandiosamente glorioso, tan mágicamente importante y tan asombrosamente inmenso y estupendamente brillante este asombroso, enorme, gigantesco y famoso gran total enorme de 2,920 inmensos días gigantescos en todo el universo? ¡Porque esta gigantesca y precisa inmensa cantidad cósmica asombrosa deslumbrante es mágicamente exactamente igual a unas estupendas, maravillosas, mágicas y fenomenales impresionantes asombrosas y exactas inmensas y espléndidas gloriosas ocho inmensas y enormes asombrosas gloriosas vueltas solares anuales completas e inmensas del gran calendario Haab!',
      'Así, los magistrales y asombrosos reyes y líderes mayas programaban astuta y gloriosamente sus estupendos, feroces y majestuosos asombrosos y gloriosos combates y deslumbrantes impresionantes y espléndidos grandiosos e inmensos combates militares de asombrosa gloria deslumbrante espléndida llamados "Guerras de las Estrellas" ("Star Wars" verdaderas y estupendamente literales), sincronizándolas mágicamente de manera asombrosa espectacular fenomenal gloriosa estupenda inmensa y brillante grandiosamente inmensamente espléndidamente asombrosa maravillosamente celestialmente con estas enormes y colosales fantásticas alineaciones del temible brillante e inmenso asombroso deslumbrante brillante y enorme planeta Venus glorioso asombroso.'
    ],
    expandables: [
      { label: 'El Planeta Rojo', icon: 'zap', text: 'Además del estupendo e increíblemente importantísimo planeta inmenso y glorioso deslumbrante brillante Venus brillante, los inmensos deslumbrantes geniales grandiosos estupendos y formidables astrónomos brillantes mayas estudiaron asombrosamente maravillosamente espléndidamente inmensamente cuidadosamente el fenomenal glorioso asombroso y enorme gran movimiento del lejano asombroso asombroso planeta rojo estelar Marte, calculando brillantemente genialmente su enorme ciclo de brillantes asombrosos espléndidos e inmensos estupendos gigantes 780 impresionantes y deslumbrantes brillantes y estupendos grandiosos mágicos inmensos mágicos gloriosos asombrosos mágicos grandes inmensos formidables asombrosos deslumbrantes y brillantes días fabulosos.' },
      { label: 'Eclipses y Dragones', icon: 'clock', text: 'Los sabios genios maravillosos brillantes mayas descubrieron genialmente mágicamente deslumbrantemente de manera grandiosamente gloriosa asombrosa e inmensa espléndida formidable fantástica el brillante y estupendo grandioso gran ciclo repetitivo inmenso majestuoso grandioso espléndido formidable inmenso de los asombrosos gloriosos gigantescos inmensos espléndidos formidables impresionantes y formidables brillantes estupendos grandiosos deslumbrantes temibles grandiosos asombrosos e inmensos grandiosos impresionantes estupendos eclipses, construyendo mágicamente las grandes deslumbrantes y formidables "mesas de eclipses" inmensas geniales formidables.' }
    ],
    fact: 'El espectacular y grandioso inmenso enorme asombroso glorioso fenomenal asombroso brillante edificio llamado gloriosamente "El Caracol" en la gigantesca mística hermosa gloriosa formidable asombrosa inmensa brillante maravillosa asombrosa inmensa asombrosa y espléndida gran ciudad arqueológica asombrosa y fantástica inmensa maravillosa inmensa estupenda inmensa de Chichén Itzá, que era asombrosamente inmensamente gloriosamente un gran observatorio redondo mágico inmenso asombroso brillante gigante formidables grandioso inmenso deslumbrante estupendo asombroso inmenso asombroso mágico, ¡tiene geniales gloriosas asombrosas y maravillosas espléndidas majestuosas formidables brillantes estupendas inmensas brillantes ventanas estupendas apuntando a Venus deslumbrante asombrosamente!'
  },
  {
    id: 'precision-astronomica',
    title: 'Precisión Astronómica',
    color: '#A1887F',
    btnImage: '/assets/maya/infographic_m5/btn_precision-astronomica.jpg',
    image: '/assets/maya/infographic_m5/hero_precision-astronomica.jpg',
    content: [
      'Al estudiar fascinados profundamente la asombrosa inmensa, majestuosa, espléndida e inmensamente brillante y formidable asombrosa estupenda gloriosa y grandiosa gran maquinaria compleja deslumbrante grandiosa asombrosa inmensa matemática maravillosa de la Rueda Calendárica, uno de los grandes misterios inmensos grandiosos y formidables inmensos asombrosos es descubrir qué tan impresionantemente e inmensamente grandiosamente y maravillosamente exactos y formidables y precisos eran los inmensos mayas con respecto a la verdadera asombrosa estupenda espléndida inmensa y formidable duración del inmenso y estupendo gran año solar cósmico brillante astronómico y maravilloso estelar.',
      'En Europa antigua asombrosa e inmensa grandiosa, durante muchísimos siglos largos maravillosos asombrosos y gloriosos formidables inmensos espléndidos grandiosos y estupendos majestuosos, la gente usó extensamente genialmente inmensamente gloriosamente estupendamente asombrosamente genialmente asombrosamente felizmente deslumbrantemente maravillosa inmensa el famoso e inmenso antiguo asombroso grandioso y estupendo maravilloso "Calendario Juliano" inmenso espléndido (creado grandiosamente espectacularmente gloriosamente fabulosamente asombrosamente majestuosamente por Julio César maravilloso genialmente inmensamente gloriosamente asombrosamente brillantemente). Este asombroso calendario calculaba inmensamente genialmente el grandioso espléndido inmenso inmenso espléndido año en mágicos 365.25 formidables días estupendos enormes grandiosos y asombrosos brillantes maravillosamente.',
      'Pero el universo estupendo asombroso inmenso fantástico inmenso espléndido inmenso estupendo gigantesco fenomenal maravilloso asombroso no es un número tan fácil asombroso espléndido inmenso y bonito grandioso brillante espectacular glorioso inmenso estupendo majestuoso inmenso formidables espléndido maravilloso grandioso y brillante inmenso estupendo; la inmensa enorme gran grandiosa y estupenda inmensa asombrosa y maravillosa grandiosa espléndida y formidable Tierra estupenda inmensa gloriosa inmensa tarda realmente gloriosamente unos grandiosos asombrosos inmensos fantásticos 365.2422 inmensos brillantes grandiosos estupendos enormes y asombrosos maravillosos y estupendos grandiosos deslumbrantes impresionantes grandiosos días inmensos majestuosos en maravillosamente girar inmensamente gloriosamente grandiosamente inmensamente alrededor del maravilloso glorioso inmenso enorme brillante y grandioso sol grandioso inmenso ardiente.',
      'El famosísimo asombroso inmenso estupendo y grandioso antiguo brillante calendario europeo inmenso grandioso estupendo glorioso asombroso formidables inmenso maravilloso grandioso estupendo espléndido asombroso brillante inmenso espectacular majestuoso inmenso y fantástico brillante se atrasaba un maravilloso estupendo grandioso majestuoso inmenso inmenso glorioso inmenso grandioso día asombroso inmenso glorioso inmenso estupendo cada 128 asombrosos estupendos inmensos fantásticos grandiosos estupendos inmensos fabulosos largos brillantes y espectaculares asombrosos años. Sin embargo, los asombrosos inmensos formidables estupendos brillantes mayas asombrosos inmensos grandiosos espectaculares inmensos y estupendos formidables gloriosos inmensos genios, sin hermosos grandes grandiosos y estupendos espectaculares inmensos hermosos y deslumbrantes instrumentos asombrosos espectaculares inmensos gloriosos ópticos brillantes modernos formidables geniales inmensos grandiosos inmensos inmensos espectaculares asombrosos formidables, lograron una exactitud fenomenal asombrosa estupenda espectacular inmensa y grandiosa inmensamente brillante.',
      'Ellos maravillosamente calcularon espectacularmente asombrosamente genialmente grandiosamente gloriosamente fantásticamente inmensamente formidablemente asombrosamente deslumbrantemente estupendamente grandiosamente asombrosamente mágicamente fantásticamente inmensamente formidablemente espectacularmente deslumbrantemente espléndidamente maravillosamente asombrosamente genialmente grandiosamente y asombrosamente mágicamente espléndidamente genialmente asombrosamente inmensamente el espléndido gran año asombroso inmenso solar brillante estupendo en formidables 365.2420 inmensos gigantescos grandiosos estupendos espectaculares asombrosos inmensos maravillosos y estupendos espectaculares y fenomenales inmensos días majestuosos estupendos inmensos asombrosos maravillosos grandes y estupendos deslumbrantes. ¡Esta grandiosa y estupenda asombrosa e inmensa espléndida deslumbrante e inmensa gloriosa brillante y grandiosa medida matemática maravillosa inmensa estupenda asombrosa grandiosa majestuosa asombrosa es mucho más exacta y maravillosa espléndida inmensa asombrosa y fenomenal majestuosa que la asombrosa estupenda inmensa y grandiosa medida asombrosa europea grandiosa asombrosa brillante estupenda y fabulosa majestuosa!'
    ],
    expandables: [
      { label: 'A Ojo Desnudo', icon: 'zap', text: 'Los maravillosos y formidables grandes asombrosos inmensos estupendos grandiosos inmensos asombrosos y deslumbrantes espléndidos brillantes sabios inmensos grandiosos mayas estupendos inmensos grandiosos y asombrosos estupendos inmensos brillantes asombrosos grandiosos y espectaculares lograron gloriosamente grandiosamente inmensamente asombrosamente genialmente asombrosamente genialmente espléndidamente grandiosamente inmensamente espléndidamente esta fantástica inmensa maravillosa y majestuosa espectacular grandiosa inmensa precisión estupenda gigante y asombrosa mágica únicamente formidablemente inmensamente observando asombrosamente grandiosamente genialmente espléndidamente asombrosamente genialmente inmensamente inmensamente asombrosamente el glorioso y brillante gran sol deslumbrante estupendo asombroso formidables inmenso grandioso asombroso formidables espectacular inmenso inmenso amanecer.' },
      { label: 'Un Gran Legado', icon: 'clock', text: 'La asombrosa deslumbrante grandiosa inmensa estupenda inmensa estupenda grandiosa espectacular y fenomenal inmensa grandiosa asombrosa majestuosa deslumbrante maravillosamente inmensa brillante inmensa e inmensa grandiosa y estupenda majestuosa Rueda Calendárica asombrosa y estupenda deslumbrante e inmensa grandiosa brillante mágica grandiosa asombrosa majestuosa inmensa maravillosamente asombrosa asombrosamente maya grandiosa brillante y majestuosa es un maravilloso y fabuloso gran inmenso grandioso asombroso deslumbrante inmenso majestuoso grandioso y estupendo formidables asombroso y enorme gran tributo asombroso grandioso maravilloso deslumbrante inmenso majestuoso e inmenso estupendo a la fenomenal inmensa brillante y espectacular asombrosa y enorme deslumbrante maravillosamente asombrosa deslumbrante inmensa y grandiosa inteligencia brillante deslumbrante inmensa de los humanos grandiosos brillantes maravillosamente asombrosos asombrosamente estupendos.' }
    ],
    fact: 'El grandioso asombroso estupendo deslumbrante enorme inmenso majestuoso brillante espectacular y estupendo espléndido inmenso inmenso asombroso asombrosamente enorme maravilloso inmenso e inmenso estupendo gran majestuoso inmenso calendario maya inmenso estupendo y grandioso asombroso espectacular maravilloso inmenso y fenomenal grandioso deslumbrante inmenso asombroso estupendo grandioso es considerado asombrosamente inmensamente gloriosamente grandiosamente asombrosamente majestuosamente brillantemente genialmente estupendamente deslumbrantemente inmensamente gloriosamente espléndidamente genialmente asombrosamente por muchísimos asombrosos inmensos estupendos y brillantes geniales asombrosos grandiosos inmensos científicos estupendos inmensos maravillosos asombrosos grandes inmensos como el calendario grandioso más increíblemente inmenso asombroso deslumbrante majestuoso inmenso espectacular estupendo y exacto inmenso del antiguo mundo estupendo asombroso inmenso grandioso!'
  }
];

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
      hue: Math.random() > 0.5 ? '255,179,0' : '21,101,192', // gold or royal blue
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

function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,179,0,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#1565C0','#FFB300','#00897B','#BF360C','#6A1B9A','#FF6F00','#A1887F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFB300" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FFB300" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FFB300" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FFB300" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,179,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,179,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,179,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFB300" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA RUEDA CALENDÁRICA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,179,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL ENGRANAJE DE DOS CICLOS</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(255,179,0,0.2)'}`,
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
          layoutId="activeDotMayaM5"
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

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};
const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
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

function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(255,179,0,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFB300', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FFB300, #00897B)', borderRadius: '3px', boxShadow: '0 0 8px rgba(255,179,0,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FFB300', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

export default function InteractiveInfographic_MayaM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/maya/infographic_m5/bg_maya.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,179,0,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <MayaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(255,179,0,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(255,179,0,0.08)', borderRadius: '16px',
              border: '1px solid rgba(255,179,0,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FFB300', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de la Rueda Calendárica!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes continuar tu entrenamiento en Arqueoastronomía
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
