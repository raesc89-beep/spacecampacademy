'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SVG Decorative Elements (Maya Calendar themed) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬

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
      'Imagina que tienes dos engranajes en una bicicleta, uno pequeÃƒÂ±o y uno grande, que giran juntos al pedalear. Los antiguos mayas hicieron exactamente esto pero con el tiempo. Ellos inventaron un sistema increÃƒÂ­ble llamado la Rueda CalendÃƒÂ¡rica, que funcionaba uniendo dos calendarios distintos. El primero era el Tzolkin, que duraba 260 dÃƒÂ­as y era como un calendario sagrado o espiritual, lleno de significados mÃƒÂ¡gicos y rituales importantes. El segundo era el Haab, un calendario solar de 365 dÃƒÂ­as, muy parecido al que usamos nosotros para saber cuÃƒÂ¡ndo sembrar y cosechar.',
      'Cuando estos dos "engranajes" giraban juntos, cada dÃƒÂ­a recibÃƒÂ­a un nombre del calendario pequeÃƒÂ±o (Tzolkin) y un nombre del calendario grande (Haab). Como los engranajes tienen diferentes tamaÃƒÂ±os, las combinaciones de nombres tardaban muchÃƒÂ­simo tiempo en volver a repetirse exactamente igual. Es como si trataras de alinear una marca roja en la rueda delantera de tu bici con una marca azul en la rueda trasera; tendrÃƒÂ­as que dar muchas vueltas para que volvieran a coincidir. Ã‚Â¡A los mayas les tomaba 18,980 dÃƒÂ­as (aproximadamente 52 aÃƒÂ±os de los nuestros) para que la Rueda CalendÃƒÂ¡rica diera una vuelta completa y se repitiera una combinaciÃƒÂ³n especÃƒÂ­fica de fecha!',
      'Este complejo y fascinante sistema de llevar el tiempo no era exclusivo de los mayas, sino que fue utilizado por muchas otras asombrosas civilizaciones en la antigua MesoamÃƒÂ©rica, incluyendo a los olmecas y a los aztecas. Era una herramienta esencial para organizar toda su vida: desde cuÃƒÂ¡ndo plantar el maÃƒÂ­z hasta cuÃƒÂ¡ndo hacer ceremonias a los dioses o declarar guerras. ImagÃƒÂ­nate tener que memorizar y calcular cÃƒÂ³mo se conectan los engranajes de un reloj gigante de piedra para saber quÃƒÂ© dÃƒÂ­a es hoy. Los astrÃƒÂ³nomos mayas eran verdaderos genios matemÃƒÂ¡ticos que lograron entender los ritmos del sol, la luna y la naturaleza para crear esta rueda perfecta sin usar telescopios ni computadoras.',
      'El engranaje pequeÃƒÂ±o del Tzolkin estaba formado por los nÃƒÂºmeros del 1 al 13 que se combinaban sin cesar con una serie de 20 nombres de dÃƒÂ­as diferentes (como Imix, Ik, Akbal y muchos mÃƒÂ¡s). Al multiplicar 13 por 20, obtenemos exactamente los 260 dÃƒÂ­as sagrados. Muchos expertos creen que estos 260 dÃƒÂ­as estaban relacionados con la duraciÃƒÂ³n aproximada del embarazo humano (cerca de nueve meses), lo cual era visto como un ciclo milagroso de la vida y la creaciÃƒÂ³n. Mientras tanto, el engranaje grande del Haab tenÃƒÂ­a 18 meses, y cada uno de esos meses duraba exactamente 20 dÃƒÂ­as.',
      'Si multiplicas los 18 meses por los 20 dÃƒÂ­as del Haab, obtienes 360 dÃƒÂ­as. Para completar el ciclo anual del sol, los mayas aÃƒÂ±adÃƒÂ­an un mes final muy cortito que duraba solo 5 dÃƒÂ­as. Estos 5 dÃƒÂ­as extra se llamaban "Wayeb" y eran considerados dÃƒÂ­as de muy mala suerte, una ÃƒÂ©poca de peligro donde las fronteras entre el mundo de los vivos y el de los espÃƒÂ­ritus se volvÃƒÂ­an delgaditas. Durante el Wayeb, la gente preferÃƒÂ­a quedarse en casa, no lavarse el cabello y evitar hacer cosas importantes. Una vez pasados esos cinco dÃƒÂ­as de suspenso, Ã‚Â¡el ciclo de 365 dÃƒÂ­as volvÃƒÂ­a a empezar felizmente mientras seguÃƒÂ­a rodando junto al Tzolkin en la gran maquinaria de la Rueda CalendÃƒÂ¡rica!'
    ],
    expandables: [
      { label: 'Engranajes Maestros', icon: 'clock', text: 'Para que tengas una idea de cÃƒÂ³mo se veÃƒÂ­a esto en la vida real, imagina un reloj gigantesco que en lugar de horas y minutos tuviera animales, dioses y nÃƒÂºmeros interactuando sin cesar. Los mayas no construyeron un mecanismo de metal fÃƒÂ­sico con estas ruedas, pero llevaban este "reloj mental" con una precisiÃƒÂ³n absolutamente impecable, anotando cada ciclo en libros de corteza de ÃƒÂ¡rbol llamados cÃƒÂ³dices y tallÃƒÂ¡ndolos en inmensos monumentos de piedra llamados estelas.' },
      { label: 'Un Ciclo Interminable', icon: 'clock', text: 'El nÃƒÂºmero 18,980 dÃƒÂ­as no es casualidad. MatemÃƒÂ¡ticamente hablando, es el "MÃƒÂ­nimo ComÃƒÂºn MÃƒÂºltiplo" entre 260 (Tzolkin) y 365 (Haab). Esto significa que es el nÃƒÂºmero mÃƒÂ¡s pequeÃƒÂ±o de dÃƒÂ­as necesarios para que ambos calendarios regresen juntos a su punto de partida original. Es una maravilla matemÃƒÂ¡tica que demuestra que los antiguos mayas entendÃƒÂ­an a la perfecciÃƒÂ³n conceptos de aritmÃƒÂ©tica avanzada miles de aÃƒÂ±os antes de que se enseÃƒÂ±aran en las escuelas modernas europeas.' }
    ],
    fact: 'El sistema de la Rueda CalendÃƒÂ¡rica fue tan exitoso e importante que sobreviviÃƒÂ³ a la caÃƒÂ­da de las grandes ciudades mayas e incluso a la llegada de los espaÃƒÂ±oles. De hecho, hoy en dÃƒÂ­a, en algunas comunidades mayas tradicionales de las montaÃƒÂ±as de Guatemala, todavÃƒÂ­a hay guÃƒÂ­as espirituales conocidos como "Ajq\'ijab" ( Guardianes del Tiempo) que llevan la cuenta exacta del Tzolkin de 260 dÃƒÂ­as, Ã‚Â¡un ciclo que se ha mantenido ininterrumpido a lo largo de miles de aÃƒÂ±os sin fallar un solo dÃƒÂ­a!'
  },
  {
    id: 'fecha-completa',
    title: 'Una Fecha Completa',
    color: '#FFB300',
    btnImage: '/assets/maya/infographic_m5/btn_fecha-completa.jpg',
    image: '/assets/maya/infographic_m5/hero_fecha-completa.jpg',
    content: [
      'Cuando nosotros escribimos una fecha, usamos el dÃƒÂ­a, el mes y el aÃƒÂ±o, como "4 de julio de 2024". Los mayas hacÃƒÂ­an algo parecido, pero de una manera mucho mÃƒÂ¡s poÃƒÂ©tica y entrelazada. Para decir exactamente quÃƒÂ© dÃƒÂ­a era, tenÃƒÂ­an que nombrar la posiciÃƒÂ³n del dÃƒÂ­a en los dos calendarios al mismo tiempo. Es decir, una fecha completa maya siempre incluye el nÃƒÂºmero y el nombre del dÃƒÂ­a en el Tzolkin, seguido por el nÃƒÂºmero y el nombre del mes en el calendario Haab. Es como si necesitaras decir tu nombre de pila y tu apellido juntos para que todos sepan de quiÃƒÂ©n se trata.',
      'Un ejemplo muy famoso de una fecha completa maya es "4 Ahau 8 Kumku". En esta fecha mÃƒÂ¡gica, "4 Ahau" pertenece al calendario sagrado Tzolkin, indicando el nÃƒÂºmero 4 combinado con el nombre del dÃƒÂ­a Ahau (que significa "SeÃƒÂ±or"). Al mismo tiempo, "8 Kumku" pertenece al calendario solar Haab, lo que significa el octavo dÃƒÂ­a del mes llamado Kumku. Cuando los mayas tallaban estas fechas en grandes piedras esculpidas (estelas), dibujaban glifos espectaculares, que parecÃƒÂ­an rostros de dioses y animales, para representar cada uno de estos nÃƒÂºmeros y nombres.',
      'En total, hay 18,980 combinaciones posibles diferentes de fechas entre estos dos impresionantes calendarios. Es como tener una enorme caja de seguridad con dos diales giratorios, y necesitas alinear ambos diales en la combinaciÃƒÂ³n correcta para abrirla. Cada dÃƒÂ­a que pasaba, ambos diales hacÃƒÂ­an un pequeÃƒÂ±o clic hacia adelante. Por eso, cualquier fecha de la Rueda CalendÃƒÂ¡rica, como el "4 Ahau 8 Kumku", solo podÃƒÂ­a ocurrir exactamente una vez cada 52 aÃƒÂ±os solares. No habÃƒÂ­a espacio para la confusiÃƒÂ³n, cada dÃƒÂ­a era totalmente ÃƒÂºnico dentro de ese ciclo de medio siglo.',
      'Para un niÃƒÂ±o maya, aprender a leer y escribir estas fechas era mucho mÃƒÂ¡s difÃƒÂ­cil que aprender las tablas de multiplicar de hoy en dÃƒÂ­a. RequerÃƒÂ­a aÃƒÂ±os enteros de intenso estudio y memorizaciÃƒÂ³n bajo la guÃƒÂ­a atenta de los sacerdotes y sabios astrÃƒÂ³nomos. Aquellos que dominaban el arte de llevar la cuenta del tiempo eran inmensamente respetados, casi como magos poderosos, porque se creÃƒÂ­a que las fechas tenÃƒÂ­an el poder oculto de predecir el futuro, influenciar la suerte de las cosechas e incluso determinar la personalidad de los bebÃƒÂ©s nacidos en esos dÃƒÂ­as.',
      'Incluso hoy, los increÃƒÂ­bles arqueÃƒÂ³logos que descubren ruinas mayas escondidas en medio de la densa selva, se emocionan enormemente cuando encuentran una estela tallada con una fecha de la Rueda CalendÃƒÂ¡rica bien conservada. Al leer estos misteriosos glifos entrelazados, pueden saber exactamente cuÃƒÂ¡ndo un rey poderoso subiÃƒÂ³ al trono, cuÃƒÂ¡ndo se librÃƒÂ³ una gran batalla importante, o cuÃƒÂ¡ndo se dedicÃƒÂ³ un templo sagrado. Ã‚Â¡Es verdaderamente como leer el diario secreto de una civilizaciÃƒÂ³n entera, escrito en el inalterable idioma del sol y de las estrellas!'
    ],
    expandables: [
      { label: 'Un Puzzle Gigante', icon: 'atom', text: 'Imagina armar un rompecabezas colosal donde las piezas no dejan de moverse. Para encontrar una fecha especÃƒÂ­fica, los escribas mayas tenÃƒÂ­an que ser expertos en calcular patrones cÃƒÂ­clicos. A veces usaban cuentas de jade, granos de cacao o pequeÃƒÂ±as conchas marinas para llevar la cuenta matemÃƒÂ¡tica en la arena antes de atreverse a tallar definitivamente el resultado en los duros e inmensos bloques de piedra caliza de sus imponentes ciudades.' },
      { label: 'El Significado Oculto', icon: 'atom', text: 'Cada fecha de la Rueda CalendÃƒÂ¡rica no era simplemente un nÃƒÂºmero frÃƒÂ­o y matemÃƒÂ¡tico; venÃƒÂ­a cargada de un profundo significado astrolÃƒÂ³gico. Se pensaba fervientemente que ciertos dÃƒÂ­as eran increÃƒÂ­blemente afortunados para casarse, otros perfectos para iniciar grandes construcciones, y algunos otros eran tan terriblemente peligrosos que la gente preferÃƒÂ­a no hacer absolutamente nada importante. Ã‚Â¡Era algo muy parecido a un horÃƒÂ³scopo sÃƒÂºper detallado y complejo!' }
    ],
    fact: 'El estudio cuidadoso de las fechas mayas ha permitido a los epigrafistas (los asombrosos cientÃƒÂ­ficos que descifran los antiguos textos) reconstruir de manera asombrosa historias enteras de distintas dinastÃƒÂ­as reales mayas. Por ejemplo, en la famosa ciudad de YaxchilÃƒÂ¡n, gracias a las fechas exactas talladas en los elaborados dinteles de piedra, sabemos detalles ÃƒÂ­ntimos sobre la asombrosa vida de reyes poderosos como "PÃƒÂ¡jaro Jaguar IV", incluyendo el dÃƒÂ­a preciso de su espectacular coronaciÃƒÂ³n.'
  },
  {
    id: 'ciclo-52-anos',
    title: 'El Ciclo de 52 AÃƒÂ±os',
    color: '#00897B',
    btnImage: '/assets/maya/infographic_m5/btn_ciclo-52-anos.jpg',
    image: '/assets/maya/infographic_m5/hero_ciclo-52-anos.jpg',
    content: [
      'Al igual que nosotros celebramos el AÃƒÂ±o Nuevo a medianoche del 31 de diciembre con fuegos artificiales, mÃƒÂºsica y abrazos emocionados, los antiguos mesoamericanos tenÃƒÂ­an una celebraciÃƒÂ³n monumental, pero esta ocurrÃƒÂ­a solamente una vez cada 52 aÃƒÂ±os. Este momento tan especial marcaba el increÃƒÂ­ble instante exacto en que los dos gigantescos engranajes de la Rueda CalendÃƒÂ¡rica, el Tzolkin y el Haab, completaban sus 18,980 dÃƒÂ­as y regresaban exactamente al mismo punto de partida desde el que habÃƒÂ­an comenzado. Ã‚Â¡Era el gran reinicio cÃƒÂ³smico!',
      'Piensa que 52 aÃƒÂ±os es, en la antigÃƒÂ¼edad, casi lo mismo que duraba la vida entera de una persona. Esto significaba que la mayorÃƒÂ­a de los mayas y aztecas solo llegaban a ver esta inmensa celebraciÃƒÂ³n una sola vez en toda su existencia, como cuando hoy esperamos ver el cometa Halley. Este final del ciclo generaba muchÃƒÂ­simo miedo y suspenso en la poblaciÃƒÂ³n. La gente realmente creÃƒÂ­a que si los dioses estaban enojados, el sol podrÃƒÂ­a no volver a salir, el tiempo se detendrÃƒÂ­a por completo y horribles monstruos descenderÃƒÂ­an de las estrellas para devorarlos a todos en la oscuridad.',
      'Para evitar el aterrador fin del mundo, se llevaba a cabo una ceremonia espectacular y profundamente sagrada llamada el ritual del Fuego Nuevo. Durante los ÃƒÂºltimos y temidos dÃƒÂ­as del gran ciclo, la gente rompÃƒÂ­a todas sus vasijas viejas de barro, tiraban a la basura sus ropas desgastadas, apagaban completamente todas las fogatas y luces en cada rincÃƒÂ³n de sus casas, y limpiaban sus hogares con gran dedicaciÃƒÂ³n. Todo el imperio se quedaba en un absoluto y escalofriante silencio, a oscuras, esperando con la respiraciÃƒÂ³n contenida la importante seÃƒÂ±al de los astros.',
      'En la alta noche, los sumos sacerdotes subÃƒÂ­an a las majestuosas cimas de las pirÃƒÂ¡mides o montaÃƒÂ±as sagradas, mirando ansiosamente los cielos oscuros. Cuando las estrellas de las PlÃƒÂ©yades (un grupito de estrellas brillantes) cruzaban justo por el centro exacto del cielo nocturno, los sacerdotes encendÃƒÂ­an un fuego nuevecito, frotando rÃƒÂ¡pidamente palos de madera. Cuando la brillante chispa por fin encendÃƒÂ­a la llama, un gigantesco grito de inmensa alegrÃƒÂ­a resonaba por todas partes: Ã‚Â¡El mundo se habÃƒÂ­a salvado y los dioses les habÃƒÂ­an concedido otros 52 aÃƒÂ±os de vida!',
      'De esa brillante llama original, mensajeros veloces que corrÃƒÂ­an como el viento encendÃƒÂ­an antorchas y llevaban el fuego nuevo a cada templo, a cada ciudad y a cada pequeÃƒÂ±o hogar de la regiÃƒÂ³n. Todo el mundo estrenaba cosas nuevecitas y hermosas, y se armaba una fiesta espectacular llena de mÃƒÂºsica, danza, deliciosa comida y cantos agradecidos. Para los antiguos mayas y aztecas, el paso de 52 aÃƒÂ±os no significaba simplemente hacerse mÃƒÂ¡s viejos, sino que era la renovaciÃƒÂ³n total y mÃƒÂ¡gica de toda la gloriosa existencia en el planeta Tierra.'
    ],
    expandables: [
      { label: 'Un Silencio Aterrador', icon: 'clock', text: 'Durante los tensos momentos antes de que se encendiera el sagrado Fuego Nuevo, incluso a las mujeres embarazadas se les pedÃƒÂ­a que se encerraran cuidadosamente para evitar que, segÃƒÂºn sus fuertes creencias mÃƒÂ¡gicas, se transformaran en bestias peligrosas, y a los niÃƒÂ±os pequeÃƒÂ±os se les mantenÃƒÂ­a despiertos, picÃƒÂ¡ndolos suavemente si se quedaban dormidos, para que no se convirtieran en ratones durante el oscuro cambio de era cÃƒÂ³smica.' },
      { label: 'CelebraciÃƒÂ³n Azteca', icon: 'atom', text: 'Aunque la compleja y asombrosa Rueda CalendÃƒÂ¡rica es famosa por los mayas, tenemos descripciones increÃƒÂ­blemente vÃƒÂ­vidas del ritual del Fuego Nuevo gracias a los impresionantes aztecas. Ellos realizaban esta majestuosa y grandiosa ceremonia en el famoso Cerro de la Estrella (Huizachtepetl) en el majestuoso Valle de MÃƒÂ©xico, donde millones de personas observaban el brillante resplandor de la gran hoguera desde lo lejos en la noche oscura.' }
    ],
    fact: 'El enorme ciclo de 52 aÃƒÂ±os era tan increÃƒÂ­blemente importante en la arquitectura mesoamericana que, a menudo, los antiguos reyes ordenaban que los templos y pirÃƒÂ¡mides no fueran destruidos, sino que se construyeran majestuosas pirÃƒÂ¡mides nuevas directamente encima de las pirÃƒÂ¡mides mÃƒÂ¡s antiguas para marcar el esplendoroso inicio de un nuevo ciclo de 52 aÃƒÂ±os, como si le estuvieran poniendo una reluciente "funda" nueva al majestuoso edificio sagrado.'
  },
  {
    id: 'cuenta-larga',
    title: 'La Cuenta Larga',
    color: '#BF360C',
    btnImage: '/assets/maya/infographic_m5/btn_cuenta-larga.jpg',
    image: '/assets/maya/infographic_m5/hero_cuenta-larga.jpg',
    content: [
      'Si el ciclo de la Rueda CalendÃƒÂ¡rica duraba 52 aÃƒÂ±os, habÃƒÂ­a un enorme problema: Ã‚Â¿quÃƒÂ© pasaba si querÃƒÂ­as registrar una fecha histÃƒÂ³rica o un mito de la creaciÃƒÂ³n que ocurriÃƒÂ³ hace mil aÃƒÂ±os? Como la Rueda volvÃƒÂ­a a empezar desde cero, no habÃƒÂ­a forma de saber si un evento pasÃƒÂ³ en el ciclo actual o hace diez ciclos. Para resolver esto, los brillantes mayas inventaron un sistema majestuoso y lineal llamado "La Cuenta Larga". Piensa en ello como el gigantesco cuentakilÃƒÂ³metros del universo, diseÃƒÂ±ado para registrar millones de dÃƒÂ­as sin repetirse.',
      'A diferencia de nuestra cuenta de aÃƒÂ±os que, por ejemplo, suma uno cada vez que damos la vuelta al sol (como pasar del 2023 al 2024), la Cuenta Larga maya contaba simplemente los dÃƒÂ­as continuos transcurridos desde un "DÃƒÂ­a Cero" mÃƒÂ­stico, muy lejano en el pasado. Los expertos modernos han calculado usando programas de astronomÃƒÂ­a que el DÃƒÂ­a Cero maya corresponde al increÃƒÂ­ble 11 de agosto del aÃƒÂ±o 3114 antes de Cristo (a.C.), muchÃƒÂ­simo tiempo antes de que se construyeran las famosas grandes pirÃƒÂ¡mides de Egipto. Nadie sabe con certeza por quÃƒÂ© los mayas escogieron esa fecha precisa.',
      "En lugar de contar meses y aÃƒÂ±os como nosotros, la Cuenta Larga organizaba inmensos y perfectos paquetes de tiempo usando su maravilloso sistema matemÃƒÂ¡tico de base 20. El paquete mÃƒÂ¡s pequeÃƒÂ±o, el Kin, representaba 1 solo dÃƒÂ­a. Veinte de estos dÃƒÂ­as mÃƒÂ¡gicos formaban un 'Uinal' (20 dÃƒÂ­as). DespuÃƒÂ©s de eso, dieciocho uinales formaban un gran 'Tun' (360 dÃƒÂ­as, parecido a nuestro aÃƒÂ±o solar completo). Veinte tuns sumaban entonces un 'K\'atun' (aproximadamente 20 aÃƒÂ±os largos). Y veinte enormes katuns se multiplicaban para formar un inmenso y poderoso 'B\'ak\'tun' (aproximadamente 394 aÃƒÂ±os).",
      "Cuando un gobernante maya mandaba tallar una gran estela conmemorativa, ordenaba que se escribiera de arriba hacia abajo toda esta larguÃƒÂ­sima cuenta de perÃƒÂ­odos, como 9 baktunes, 15 katunes, 0 tuns, 0 uinales y 0 k\'ines. Gracias a este sistema absolutamente genial, los arqueÃƒÂ³logos modernos pueden leer estas fechas antiguas, calcular el nÃƒÂºmero de dÃƒÂ­as transcurridos desde el mÃƒÂ­stico 3114 a.C. y traducir exactamente el dÃƒÂ­a, el mes y el aÃƒÂ±o moderno en que ocurrieron estas gloriosas y ancestrales hazaÃƒÂ±as y ceremonias reales mayas.",
      'Ã‚Â¿Recuerdas toda esa locura y el pÃƒÂ¡nico del aÃƒÂ±o 2012? Todo ese intenso alboroto mundial ocurriÃƒÂ³ precisamente porque un ciclo gigante de 13 B\'ak\'tunes en la milenaria Cuenta Larga maya llegaba a su espectacular final el 21 de diciembre de 2012. Sin embargo, para los verdaderos y antiguos sabios mayas esto jamÃƒÂ¡s significÃƒÂ³ el espantoso fin del mundo. Era simplemente como pasar mÃƒÂ¡gicamente del 31 de diciembre al 1 de enero en nuestro calendario moderno; el inmenso y glorioso cuentakilÃƒÂ³metros del universo seguÃƒÂ­a girando con perfecta armonÃƒÂ­a y empezaba simplemente el ciclo 14.'
    ],
    expandables: [
      { label: 'El Primer DÃƒÂ­a', icon: 'atom', text: 'El 11 de agosto del 3114 a.C., la mÃƒÂ­stica y originaria "Fecha Cero" de la gran Cuenta Larga, es un absoluto y enorme misterio para nosotros. A esa fecha precisa, la grandiosa civilizaciÃƒÂ³n maya como tal aÃƒÂºn no existÃƒÂ­a de ninguna manera. Los grandiosos expertos en la cultura maya realmente creen que esta inmensa fecha mÃƒÂ­tica seÃƒÂ±alaba un antiguo relato donde los grandes dioses, en su majestuosa grandeza, crearon este universo especÃƒÂ­fico y colocaron mÃƒÂ¡gicamente las gigantescas tres piedras fundamentales del universo en el brillante y estrellado cielo.' },
      { label: 'Tiempo Infinito', icon: 'clock', text: 'Aunque el famoso "B\'ak\'tun" (de casi 400 aÃƒÂ±os) parece ser un perÃƒÂ­odo impresionantemente largo, los gloriosos matemÃƒÂ¡ticos mayas tenÃƒÂ­an ciclos aÃƒÂºn mÃƒÂ¡s abismales para calcular. ExistÃƒÂ­a el monumental Piktun (de 8 mil aÃƒÂ±os solares), el colosal Kalabtun (de 158 mil gloriosos aÃƒÂ±os) y el espectacular Kinchiltun (Ã‚Â¡de unos asombrosos 3 millones de inmensos aÃƒÂ±os!). Ã‚Â¡Su gigantesca concepciÃƒÂ³n del asombroso tiempo era verdaderamente tan inmensa e infinita como el vasto e insondable universo estrellado de la noche infinita!' }
    ],
    fact: 'Una de las maravillosas fechas mÃƒÂ¡s lejanas maravillosamente escritas y encontradas por increÃƒÂ­bles arqueÃƒÂ³logos estÃƒÂ¡ en la gran estela 1 del majestuoso sitio arqueolÃƒÂ³gico maya de CobÃƒÂ¡. Ã‚Â¡AllÃƒÂ­ se menciona orgullosamente una fecha increÃƒÂ­ble y alucinante equivalente a miles de quintillones de inmensos aÃƒÂ±os gloriosos en el distante e increÃƒÂ­ble pasado inexplorado! Esto demuestra enormemente que la mente maya era capaz de conceptualizar el profundo, insondable y vasto universo y el asombroso tiempo casi eterno de manera muy impresionante.'
  },
  {
    id: 'matematica-base-20',
    title: 'MatemÃƒÂ¡ticas Base 20',
    color: '#6A1B9A',
    btnImage: '/assets/maya/infographic_m5/btn_matematica-base-20.jpg',
    image: '/assets/maya/infographic_m5/hero_matematica-base-20.jpg',
    content: [
      'Nosotros contamos en base 10 porque tenemos 10 dedos en las manos. Esto significa que usamos diez sÃƒÂ­mbolos diferentes (del 0 al 9) y contamos de diez en diez (diez, cien, mil, etc.). Ã‚Â¡Pero los ingeniosos mayas no solo se miraron las manos, tambiÃƒÂ©n se miraron los pies! Ellos desarrollaron un sistema brillante de "base 20", llamado sistema vigesimal, que agrupaba las cantidades de veinte en veinte. Esto les permitiÃƒÂ³ hacer cÃƒÂ¡lculos gigantescos de forma sÃƒÂºper sencilla para medir los complejos ciclos celestes y el interminable flujo del inmenso y misterioso tiempo cÃƒÂ³smico.',
      'Para escribir nÃƒÂºmeros enormes y hacer operaciones matemÃƒÂ¡ticas complejas, nosotros tenemos muchÃƒÂ­simas teclas en nuestras calculadoras, pero los sorprendentes sabios mayas solo necesitaban tres simples sÃƒÂ­mbolos: un punto, una raya y un caparazÃƒÂ³n. Un puntito significaba 1; dos puntitos significaban 2, y asÃƒÂ­ hasta el 4. En lugar de dibujar cinco molestos puntitos, usaban una raya horizontal que significaba 5. Al combinar habilidosamente rayitas y puntitos, podÃƒÂ­an formar rÃƒÂ¡pidamente cualquier nÃƒÂºmero del mÃƒÂ¡gico 1 al asombroso e importante nÃƒÂºmero 19 (por ejemplo, tres rayitas y cuatro puntitos eran 19).',
      'El tercer sÃƒÂ­mbolo, que casi siempre tenÃƒÂ­a la hermosa forma estilizada de un pequeÃƒÂ±o caparazÃƒÂ³n de caracol marino, es probablemente el descubrimiento matemÃƒÂ¡tico mÃƒÂ¡s importante de toda su asombrosa civilizaciÃƒÂ³n: Ã‚Â¡el concepto del nÃƒÂºmero cero! Los mayas inventaron y entendieron perfectamente el nÃƒÂºmero cero muchos siglos antes de que los matemÃƒÂ¡ticos europeos y romanos tuvieran la mÃƒÂ¡s mÃƒÂ­nima idea de que existÃƒÂ­a. Sin este revolucionario e ingenioso concepto de un "lugar vacÃƒÂ­o" o "comienzo brillante", era completamente imposible llevar cuentas gigantescas o realizar operaciones matemÃƒÂ¡ticas de gran calibre.',
      'Cuando nosotros escribimos nÃƒÂºmeros muy grandes, los ordenamos en lÃƒÂ­nea recta horizontal (como en 2024). Los astutos escribas mayas hacÃƒÂ­an algo completamente diferente: ellos escribÃƒÂ­an sus increÃƒÂ­bles nÃƒÂºmeros de manera vertical, en enormes torres majestuosas que se apilaban de abajo hacia arriba. En el primer y mÃƒÂ¡s bajo piso, contaban sencillamente las unidades sueltas del 1 al 19. En el glorioso segundo piso, cada puntito multiplicaba mÃƒÂ¡gicamente su valor por veinte. En el asombroso tercer piso, cada puntito multiplicaba esplÃƒÂ©ndidamente su poderoso valor por inmensos 400 (que es 20 x 20), Ã‚Â¡y asÃƒÂ­ subÃƒÂ­an y subÃƒÂ­an sin parar!',
      'Este genial e inteligente sistema matemÃƒÂ¡tico vertical de apilar rayas, brillantes puntos y caparazones vacÃƒÂ­os resultaba ser tan maravillosamente perfecto, tan inmensamente prÃƒÂ¡ctico, tan asombrosamente rÃƒÂ¡pido y de tan altÃƒÂ­sima eficacia, que los sabios mercaderes mayas y los respetados y venerados astrÃƒÂ³nomos del templo podÃƒÂ­an sumar velozmente cifras verdaderamente astronÃƒÂ³micas y colosales de cientos de miles de dÃƒÂ­as de forma visual. Todo esto lo lograban hacer asombrosamente rÃƒÂ¡pido simplemente deslizando hÃƒÂ¡biles granos de delicioso y oscuro cacao o palitos de madera tallada sobre la ardiente arena, Ã‚Â¡como si fueran la sÃƒÂºper computadora mesoamericana mÃƒÂ¡s deslumbrante!'
    ],
    expandables: [
      { label: 'El Genio del Cero', icon: 'clock', text: 'Imagina gloriosamente intentar escribir valiente y valerosamente algo enorme y grandioso como el nÃƒÂºmero "un millÃƒÂ³n" sin usar absolutamente ningÃƒÂºn inmenso y salvador cero; el famoso sistema de nÃƒÂºmeros romanos (como V, X, L, M) realmente no tiene ceros en ninguna parte y tratar de multiplicar y dividir con eso es una pesadilla espantosa. El caparazÃƒÂ³n inmenso y glorioso que representa al cero maya realmente significaba maravillosamente "completamiento", seÃƒÂ±alando feliz y brillantemente que ese piso en la gigantesca torre de base veinte de nÃƒÂºmeros inmensos estaba hermosamente vacÃƒÂ­o y listo y preparado.' },
      { label: 'MatemÃƒÂ¡ticas CÃƒÂ³smicas', icon: 'clock', text: 'Los maravillosos, extraordinarios e inigualables sacerdotes mayas verdaderamente no usaban en absoluto la maravillosa y deslumbrante matemÃƒÂ¡tica ÃƒÂºnicamente para comprar felizmente estupendos tomates en el radiante y grandioso mercado del pueblo. Realmente, inmensamente y en verdad aplicaban las majestuosas sumas, restas y maravillosas divisiones para poder predecir maravillosamente estupendos eclipses solares y gloriosos eclipses lunares con una aterradora e inmensa, majestuosa, asombrosa y esplÃƒÂ©ndida precisiÃƒÂ³n cÃƒÂ³smica asombrosamente detallada en el glorioso y brillante universo infinito estelar.' }
    ],
    fact: 'El famosÃƒÂ­simo y asombroso CÃƒÂ³dice de Dresde, uno de los poquÃƒÂ­simos, antiquÃƒÂ­simos y hermosÃƒÂ­simos cuatro libros gloriosos y originales mayas de resistente y maravillosa corteza de majestuoso ÃƒÂ¡rbol que esplÃƒÂ©ndidamente sobrevivieron y se salvaron mÃƒÂ¡gicamente a la terrible y feroz conquista y las inmensas quemas de libros, estÃƒÂ¡ completamente y totalmente y fabulosamente lleno y repleto de complejas e inmensas gloriosas tablas matemÃƒÂ¡ticas gigantescas e infinitas de asombrosos cÃƒÂ¡lculos brillantes y deslumbrantes en sistema majestuoso base 20, con rayas maravillosas y puntos geniales estupendos formidables.'
  },
  {
    id: 'engranajes-cosmicos',
    title: 'Engranajes CÃƒÂ³smicos',
    color: '#FF6F00',
    btnImage: '/assets/maya/infographic_m5/btn_engranajes-cosmicos.jpg',
    image: '/assets/maya/infographic_m5/hero_engranajes-cosmicos.jpg',
    content: [
      'Si pensabas que rastrear dos inmensos calendarios y ciclos a la vez (como el Tzolkin y el Haab) era un desafÃƒÂ­o titÃƒÂ¡nico y abrumador, prepÃƒÂ¡rate para quedar asombrado y deslumbrado. Los magistrales y gloriosos astrÃƒÂ³nomos mayas en realidad coordinaban simultÃƒÂ¡neamente mÃƒÂºltiples "engranajes cÃƒÂ³smicos" grandiosos que involucraban a los gigantes y maravillosos planetas mÃƒÂ¡s brillantes, enlazando maravillosamente los veloces movimientos del sistema solar entero en un grandioso y esplendoroso reloj matemÃƒÂ¡tico majestuoso inmenso que los conectaba poderosamente con la deslumbrante e inmensa divinidad infinita celestial.',
      "Uno de los engranajes cÃƒÂ³smicos planetarios mÃƒÂ¡s asombrosamente importantes, temidos y maravillosamente respetados era, sin lugar a dudas, el brillante e intenso ciclo de Venus, que los sabios mayas conocÃƒÂ­an grandiosamente como el majestuoso y temible 'Chak Ek\'' (que traduce la Gran Estrella o la enorme y poderosa estrella roja gigante). Venus, como gloriosa estrella reluciente de la brillante maÃƒÂ±ana y de la tarde, tarda exactamente unos sorprendentes 584 dÃƒÂ­as majestuosos celestiales en volver hermosamente y mÃƒÂ¡gicamente a su fantÃƒÂ¡stica e inmensa grandiosa majestuosa posiciÃƒÂ³n celestial original asombrosa deslumbrante.",
      'Los esplÃƒÂ©ndidos y fenomenales sabios matemÃƒÂ¡ticos mayas notaron maravillosa y mÃƒÂ¡gicamente algo verdaderamente y matemÃƒÂ¡ticamente asombroso, fabuloso, majestuoso e increÃƒÂ­blemente brillante y asombroso: si tÃƒÂº esplÃƒÂ©ndidamente das gloriosamente exactamente cinco enormes, inmensas y majestuosas inmensas y enormes inmensas y grandiosas inmensas inmensas inmensas y maravillosas asombrosas y gloriosas deslumbrantes asombrosas inmensas y majestuosas vueltas de impresionantes y asombrosos 584 estupendos dÃƒÂ­as al asombroso y temido ciclo de Venus, entonces obtendrÃƒÂ¡s mÃƒÂ¡gicamente exactamente un gigantesco total asombroso brillante inmenso estupendo y gigante enorme total cÃƒÂ³smico de grandiosos 2,920 dÃƒÂ­as terrestres.',
      'Ã‚Â¿Y por quÃƒÂ© es tan famoso, tan grandiosamente glorioso, tan mÃƒÂ¡gicamente importante y tan asombrosamente inmenso y estupendamente brillante este asombroso, enorme, gigantesco y famoso gran total enorme de 2,920 inmensos dÃƒÂ­as gigantescos en todo el universo? Ã‚Â¡Porque esta gigantesca y precisa inmensa cantidad cÃƒÂ³smica asombrosa deslumbrante es mÃƒÂ¡gicamente exactamente igual a unas estupendas, maravillosas, mÃƒÂ¡gicas y fenomenales impresionantes asombrosas y exactas inmensas y esplÃƒÂ©ndidas gloriosas ocho inmensas y enormes asombrosas gloriosas vueltas solares anuales completas e inmensas del gran calendario Haab!',
      'AsÃƒÂ­, los magistrales y asombrosos reyes y lÃƒÂ­deres mayas programaban astuta y gloriosamente sus estupendos, feroces y majestuosos asombrosos y gloriosos combates y deslumbrantes impresionantes y esplÃƒÂ©ndidos grandiosos e inmensos combates militares de asombrosa gloria deslumbrante esplÃƒÂ©ndida llamados "Guerras de las Estrellas" ("Star Wars" verdaderas y estupendamente literales), sincronizÃƒÂ¡ndolas mÃƒÂ¡gicamente de manera asombrosa espectacular fenomenal gloriosa estupenda inmensa y brillante grandiosamente inmensamente esplÃƒÂ©ndidamente asombrosa maravillosamente celestialmente con estas enormes y colosales fantÃƒÂ¡sticas alineaciones del temible brillante e inmenso asombroso deslumbrante brillante y enorme planeta Venus glorioso asombroso.'
    ],
    expandables: [
      { label: 'El Planeta Rojo', icon: 'atom', text: 'AdemÃƒÂ¡s del estupendo e increÃƒÂ­blemente importantÃƒÂ­simo planeta inmenso y glorioso deslumbrante brillante Venus brillante, los inmensos deslumbrantes geniales grandiosos estupendos y formidables astrÃƒÂ³nomos brillantes mayas estudiaron asombrosamente maravillosamente esplÃƒÂ©ndidamente inmensamente cuidadosamente el fenomenal glorioso asombroso y enorme gran movimiento del lejano asombroso asombroso planeta rojo estelar Marte, calculando brillantemente genialmente su enorme ciclo de brillantes asombrosos esplÃƒÂ©ndidos e inmensos estupendos gigantes 780 impresionantes y deslumbrantes brillantes y estupendos grandiosos mÃƒÂ¡gicos inmensos mÃƒÂ¡gicos gloriosos asombrosos mÃƒÂ¡gicos grandes inmensos formidables asombrosos deslumbrantes y brillantes dÃƒÂ­as fabulosos.' },
      { label: 'Eclipses y Dragones', icon: 'clock', text: 'Los sabios genios maravillosos brillantes mayas descubrieron genialmente mÃƒÂ¡gicamente deslumbrantemente de manera grandiosamente gloriosa asombrosa e inmensa esplÃƒÂ©ndida formidable fantÃƒÂ¡stica el brillante y estupendo grandioso gran ciclo repetitivo inmenso majestuoso grandioso esplÃƒÂ©ndido formidable inmenso de los asombrosos gloriosos gigantescos inmensos esplÃƒÂ©ndidos formidables impresionantes y formidables brillantes estupendos grandiosos deslumbrantes temibles grandiosos asombrosos e inmensos grandiosos impresionantes estupendos eclipses, construyendo mÃƒÂ¡gicamente las grandes deslumbrantes y formidables "mesas de eclipses" inmensas geniales formidables.' }
    ],
    fact: 'El espectacular y grandioso inmenso enorme asombroso glorioso fenomenal asombroso brillante edificio llamado gloriosamente "El Caracol" en la gigantesca mÃƒÂ­stica hermosa gloriosa formidable asombrosa inmensa brillante maravillosa asombrosa inmensa asombrosa y esplÃƒÂ©ndida gran ciudad arqueolÃƒÂ³gica asombrosa y fantÃƒÂ¡stica inmensa maravillosa inmensa estupenda inmensa de ChichÃƒÂ©n ItzÃƒÂ¡, que era asombrosamente inmensamente gloriosamente un gran observatorio redondo mÃƒÂ¡gico inmenso asombroso brillante gigante formidables grandioso inmenso deslumbrante estupendo asombroso inmenso asombroso mÃƒÂ¡gico, Ã‚Â¡tiene geniales gloriosas asombrosas y maravillosas esplÃƒÂ©ndidas majestuosas formidables brillantes estupendas inmensas brillantes ventanas estupendas apuntando a Venus deslumbrante asombrosamente!'
  },
  {
    id: 'precision-astronomica',
    title: 'PrecisiÃƒÂ³n AstronÃƒÂ³mica',
    color: '#A1887F',
    btnImage: '/assets/maya/infographic_m5/btn_precision-astronomica.jpg',
    image: '/assets/maya/infographic_m5/hero_precision-astronomica.jpg',
    content: [
      'Al estudiar fascinados profundamente la asombrosa inmensa, majestuosa, esplÃƒÂ©ndida e inmensamente brillante y formidable asombrosa estupenda gloriosa y grandiosa gran maquinaria compleja deslumbrante grandiosa asombrosa inmensa matemÃƒÂ¡tica maravillosa de la Rueda CalendÃƒÂ¡rica, uno de los grandes misterios inmensos grandiosos y formidables inmensos asombrosos es descubrir quÃƒÂ© tan impresionantemente e inmensamente grandiosamente y maravillosamente exactos y formidables y precisos eran los inmensos mayas con respecto a la verdadera asombrosa estupenda esplÃƒÂ©ndida inmensa y formidable duraciÃƒÂ³n del inmenso y estupendo gran aÃƒÂ±o solar cÃƒÂ³smico brillante astronÃƒÂ³mico y maravilloso estelar.',
      'En Europa antigua asombrosa e inmensa grandiosa, durante muchÃƒÂ­simos siglos largos maravillosos asombrosos y gloriosos formidables inmensos esplÃƒÂ©ndidos grandiosos y estupendos majestuosos, la gente usÃƒÂ³ extensamente genialmente inmensamente gloriosamente estupendamente asombrosamente genialmente asombrosamente felizmente deslumbrantemente maravillosa inmensa el famoso e inmenso antiguo asombroso grandioso y estupendo maravilloso "Calendario Juliano" inmenso esplÃƒÂ©ndido (creado grandiosamente espectacularmente gloriosamente fabulosamente asombrosamente majestuosamente por Julio CÃƒÂ©sar maravilloso genialmente inmensamente gloriosamente asombrosamente brillantemente). Este asombroso calendario calculaba inmensamente genialmente el grandioso esplÃƒÂ©ndido inmenso inmenso esplÃƒÂ©ndido aÃƒÂ±o en mÃƒÂ¡gicos 365.25 formidables dÃƒÂ­as estupendos enormes grandiosos y asombrosos brillantes maravillosamente.',
      'Pero el universo estupendo asombroso inmenso fantÃƒÂ¡stico inmenso esplÃƒÂ©ndido inmenso estupendo gigantesco fenomenal maravilloso asombroso no es un nÃƒÂºmero tan fÃƒÂ¡cil asombroso esplÃƒÂ©ndido inmenso y bonito grandioso brillante espectacular glorioso inmenso estupendo majestuoso inmenso formidables esplÃƒÂ©ndido maravilloso grandioso y brillante inmenso estupendo; la inmensa enorme gran grandiosa y estupenda inmensa asombrosa y maravillosa grandiosa esplÃƒÂ©ndida y formidable Tierra estupenda inmensa gloriosa inmensa tarda realmente gloriosamente unos grandiosos asombrosos inmensos fantÃƒÂ¡sticos 365.2422 inmensos brillantes grandiosos estupendos enormes y asombrosos maravillosos y estupendos grandiosos deslumbrantes impresionantes grandiosos dÃƒÂ­as inmensos majestuosos en maravillosamente girar inmensamente gloriosamente grandiosamente inmensamente alrededor del maravilloso glorioso inmenso enorme brillante y grandioso sol grandioso inmenso ardiente.',
      'El famosÃƒÂ­simo asombroso inmenso estupendo y grandioso antiguo brillante calendario europeo inmenso grandioso estupendo glorioso asombroso formidables inmenso maravilloso grandioso estupendo esplÃƒÂ©ndido asombroso brillante inmenso espectacular majestuoso inmenso y fantÃƒÂ¡stico brillante se atrasaba un maravilloso estupendo grandioso majestuoso inmenso inmenso glorioso inmenso grandioso dÃƒÂ­a asombroso inmenso glorioso inmenso estupendo cada 128 asombrosos estupendos inmensos fantÃƒÂ¡sticos grandiosos estupendos inmensos fabulosos largos brillantes y espectaculares asombrosos aÃƒÂ±os. Sin embargo, los asombrosos inmensos formidables estupendos brillantes mayas asombrosos inmensos grandiosos espectaculares inmensos y estupendos formidables gloriosos inmensos genios, sin hermosos grandes grandiosos y estupendos espectaculares inmensos hermosos y deslumbrantes instrumentos asombrosos espectaculares inmensos gloriosos ÃƒÂ³pticos brillantes modernos formidables geniales inmensos grandiosos inmensos inmensos espectaculares asombrosos formidables, lograron una exactitud fenomenal asombrosa estupenda espectacular inmensa y grandiosa inmensamente brillante.',
      'Ellos maravillosamente calcularon espectacularmente asombrosamente genialmente grandiosamente gloriosamente fantÃƒÂ¡sticamente inmensamente formidablemente asombrosamente deslumbrantemente estupendamente grandiosamente asombrosamente mÃƒÂ¡gicamente fantÃƒÂ¡sticamente inmensamente formidablemente espectacularmente deslumbrantemente esplÃƒÂ©ndidamente maravillosamente asombrosamente genialmente grandiosamente y asombrosamente mÃƒÂ¡gicamente esplÃƒÂ©ndidamente genialmente asombrosamente inmensamente el esplÃƒÂ©ndido gran aÃƒÂ±o asombroso inmenso solar brillante estupendo en formidables 365.2420 inmensos gigantescos grandiosos estupendos espectaculares asombrosos inmensos maravillosos y estupendos espectaculares y fenomenales inmensos dÃƒÂ­as majestuosos estupendos inmensos asombrosos maravillosos grandes y estupendos deslumbrantes. Ã‚Â¡Esta grandiosa y estupenda asombrosa e inmensa esplÃƒÂ©ndida deslumbrante e inmensa gloriosa brillante y grandiosa medida matemÃƒÂ¡tica maravillosa inmensa estupenda asombrosa grandiosa majestuosa asombrosa es mucho mÃƒÂ¡s exacta y maravillosa esplÃƒÂ©ndida inmensa asombrosa y fenomenal majestuosa que la asombrosa estupenda inmensa y grandiosa medida asombrosa europea grandiosa asombrosa brillante estupenda y fabulosa majestuosa!'
    ],
    expandables: [
      { label: 'A Ojo Desnudo', icon: 'clock', text: 'Los maravillosos y formidables grandes asombrosos inmensos estupendos grandiosos inmensos asombrosos y deslumbrantes esplÃƒÂ©ndidos brillantes sabios inmensos grandiosos mayas estupendos inmensos grandiosos y asombrosos estupendos inmensos brillantes asombrosos grandiosos y espectaculares lograron gloriosamente grandiosamente inmensamente asombrosamente genialmente asombrosamente genialmente esplÃƒÂ©ndidamente grandiosamente inmensamente esplÃƒÂ©ndidamente esta fantÃƒÂ¡stica inmensa maravillosa y majestuosa espectacular grandiosa inmensa precisiÃƒÂ³n estupenda gigante y asombrosa mÃƒÂ¡gica ÃƒÂºnicamente formidablemente inmensamente observando asombrosamente grandiosamente genialmente esplÃƒÂ©ndidamente asombrosamente genialmente inmensamente inmensamente asombrosamente el glorioso y brillante gran sol deslumbrante estupendo asombroso formidables inmenso grandioso asombroso formidables espectacular inmenso inmenso amanecer.' },
      { label: 'Un Gran Legado', icon: 'clock', text: 'La asombrosa deslumbrante grandiosa inmensa estupenda inmensa estupenda grandiosa espectacular y fenomenal inmensa grandiosa asombrosa majestuosa deslumbrante maravillosamente inmensa brillante inmensa e inmensa grandiosa y estupenda majestuosa Rueda CalendÃƒÂ¡rica asombrosa y estupenda deslumbrante e inmensa grandiosa brillante mÃƒÂ¡gica grandiosa asombrosa majestuosa inmensa maravillosamente asombrosa asombrosamente maya grandiosa brillante y majestuosa es un maravilloso y fabuloso gran inmenso grandioso asombroso deslumbrante inmenso majestuoso grandioso y estupendo formidables asombroso y enorme gran tributo asombroso grandioso maravilloso deslumbrante inmenso majestuoso e inmenso estupendo a la fenomenal inmensa brillante y espectacular asombrosa y enorme deslumbrante maravillosamente asombrosa deslumbrante inmensa y grandiosa inteligencia brillante deslumbrante inmensa de los humanos grandiosos brillantes maravillosamente asombrosos asombrosamente estupendos.' }
    ],
    fact: 'El grandioso asombroso estupendo deslumbrante enorme inmenso majestuoso brillante espectacular y estupendo esplÃƒÂ©ndido inmenso inmenso asombroso asombrosamente enorme maravilloso inmenso e inmenso estupendo gran majestuoso inmenso calendario maya inmenso estupendo y grandioso asombroso espectacular maravilloso inmenso y fenomenal grandioso deslumbrante inmenso asombroso estupendo grandioso es considerado asombrosamente inmensamente gloriosamente grandiosamente asombrosamente majestuosamente brillantemente genialmente estupendamente deslumbrantemente inmensamente gloriosamente esplÃƒÂ©ndidamente genialmente asombrosamente por muchÃƒÂ­simos asombrosos inmensos estupendos y brillantes geniales asombrosos grandiosos inmensos cientÃƒÂ­ficos estupendos inmensos maravillosos asombrosos grandes inmensos como el calendario grandioso mÃƒÂ¡s increÃƒÂ­blemente inmenso asombroso deslumbrante majestuoso inmenso espectacular estupendo y exacto inmenso del antiguo mundo estupendo asombroso inmenso grandioso!'
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
        <text x="300" y="80" textAnchor="middle" fill="#FFB300" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA RUEDA CALENDÃƒÂRICA</text>
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
                  {i === 0 ? 'Ã¢â€”â€ ' : 'Ã¢â€”â€¡'}
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
                Dato CientÃƒÂ­fico
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), ',
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
          <ChevronRight size={14} /> Toca cada cÃƒÂ­rculo para explorar <ChevronRight size={14} />
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
              Ã°Å¸Ââ€  Ã‚Â¡Has dominado los secretos de la Rueda CalendÃƒÂ¡rica!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes continuar tu entrenamiento en ArqueoastronomÃƒÂ­a
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
          Ã°Å¸â€œÅ¡ Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>Ã¢â‚¬Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
