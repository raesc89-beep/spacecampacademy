'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Extraterrestrial Search themed) ────────────────
function DecoRadioWave({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Concentric radio waves emanating from center */}
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.28" />
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Signal lines */}
      <line x1="30" y1="6" x2="30" y2="2" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <line x1="50" y1="15" x2="53" y2="12" stroke={color} strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
      <line x1="50" y1="45" x2="53" y2="48" stroke={color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#7A5BAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Dish shape */}
      <path d="M15 35 Q30 10 45 35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Support struts */}
      <line x1="30" y1="22" x2="30" y2="50" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="20" y1="50" x2="40" y2="50" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Feed horn */}
      <circle cx="30" cy="22" r="3" fill={color} opacity="0.5" />
      {/* Signal dots */}
      <circle cx="30" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="25" cy="5" r="1" fill={color} opacity="0.3" />
      <circle cx="35" cy="7" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoStarField({ size = 80, color = '#9370C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Scattered stars */}
      {[
        [10, 12, 2], [45, 8, 1.5], [28, 18, 1.8], [8, 40, 1.2], [50, 42, 2],
        [35, 50, 1.5], [18, 55, 1], [52, 22, 1.3], [22, 32, 1.6], [42, 35, 1],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color} opacity={0.3 + (i % 3) * 0.15} />
      ))}
      {/* Connecting constellation lines */}
      <path d="M10 12 L28 18 L45 8" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <path d="M28 18 L22 32 L35 50" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function DecoDNA({ size = 60, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Double helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 58" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 58" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      {[12, 20, 28, 36, 44, 52].map((y, i) => (
        <line key={i} x1={20 + Math.sin((y / 10) * Math.PI) * 8} y1={y} x2={40 - Math.sin((y / 10) * Math.PI) * 8} y2={y} stroke={color} strokeWidth="1" opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoPlanet({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Planet body */}
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="16" fill={color} opacity="0.08" />
      {/* Ring system */}
      <ellipse cx="30" cy="30" rx="26" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(-20 30 30)" />
      {/* Surface detail */}
      <path d="M22 24 Q30 20 38 24" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M20 32 Q30 36 40 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Moon */}
      <circle cx="50" cy="14" r="3" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoEquation({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* N = R* × fp × ne stylized */}
      <text x="8" y="28" fill={color} fontSize="16" fontWeight="bold" fontFamily="serif" opacity="0.4">N=R*·fp</text>
      {/* Floating particles */}
      <circle cx="60" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="64" cy="20" r="1" fill={color} opacity="0.4" />
      <circle cx="58" cy="36" r="1.5" fill={color} opacity="0.5" />
      <circle cx="6" cy="8" r="1" fill={color} opacity="0.3" />
      {/* Wavy signal */}
      <path d="M5 38 Q15 34 25 38 Q35 42 45 38 Q55 34 65 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'ecuacion-drake': [DecoEquation, DecoRadioWave, DecoStarField],
  'seti-escuchando': [DecoTelescope, DecoRadioWave, DecoStarField],
  'paradoja-fermi': [DecoStarField, DecoEquation, DecoPlanet],
  'exoplanetas': [DecoPlanet, DecoStarField, DecoTelescope],
  'vida-sistema-solar': [DecoPlanet, DecoDNA, DecoTelescope],
  'astrobiologia': [DecoDNA, DecoPlanet, DecoEquation],
  'contact-ciencia-ficcion': [DecoRadioWave, DecoTelescope, DecoStarField],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Sagan, C. (1985). Contact. Simon & Schuster',
  'Drake, F. & Sobel, D. (1992). Is Anyone Out There? The Scientific Search for Extraterrestrial Intelligence. Delacorte Press',
  'Shostak, S. (2009). Confessions of an Alien Hunter: A Scientist\'s Search for Extraterrestrial Intelligence. National Geographic',
  'NASA Exoplanet Archive (2023). Confirmed Exoplanets Catalog. California Institute of Technology / NASA',
  'Webb, S. (2015). If the Universe Is Teeming with Aliens... WHERE IS EVERYBODY? Seventy-Five Solutions to the Fermi Paradox. Springer',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'ecuacion-drake',
    title: 'La Ecuación de Drake',
    color: '#5B3D8F',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_ecuacion-drake.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_ecuacion-drake.jpg',
    content: [
      'En 1961, el astrónomo Frank Drake reunió a un grupo selecto de científicos en el Observatorio de Green Bank, en Virginia Occidental, para abordar una pregunta que nadie antes había tratado de responder con matemáticas: ¿cuántas civilizaciones tecnológicas podrían existir en nuestra galaxia? Entre los asistentes se encontraban figuras como Carl Sagan, el químico Melvin Calvin (quien recibiría el Premio Nobel ese mismo año) y el astrofísico Philip Morrison. Drake propuso una ecuación que descomponía el problema en siete factores multiplicativos, cada uno representando una variable astrofísica o biológica que podía estimarse de forma independiente.',
      'La ecuación se expresa como N = R* × fp × ne × fl × fi × fc × L. Cada variable tiene un significado preciso: R* representa la tasa de formación de estrellas en la Vía Láctea (estimada entre 1.5 y 3 estrellas por año según observaciones del telescopio Hubble); fp es la fracción de esas estrellas que poseen sistemas planetarios (hoy sabemos gracias a Kepler que es superior al 50%); ne es el número promedio de planetas por sistema estelar que podrían soportar vida; fl es la fracción de esos planetas donde realmente surge la vida; fi es la fracción donde esa vida desarrolla inteligencia; fc es la fracción capaz de desarrollar tecnología de comunicación; y L es la duración promedio de tales civilizaciones tecnológicas.',
      'Carl Sagan popularizó la Ecuación de Drake en su serie televisiva Cosmos, emitida en 1980 y vista por más de 500 millones de personas en 60 países. Sagan la utilizaba para demostrar que, incluso usando estimaciones conservadoras para cada variable, el resultado sugería la existencia de miles o incluso millones de civilizaciones en nuestra galaxia. Sin embargo, Sagan siempre enfatizó que el factor más incierto era L, la longevidad de las civilizaciones. Si las civilizaciones tienden a autodestruirse rápidamente (por guerras nucleares o degradación ambiental), el número N sería bajo. Si logran sobrevivir millones de años, la galaxia podría estar repleta de señales esperando ser detectadas.',
      'La reunión de Green Bank de 1961 marcó el nacimiento formal de la búsqueda científica de inteligencia extraterrestre. Los participantes inicialmente llamaron al grupo "The Order of the Dolphin" (La Orden del Delfín), porque Melvin Calvin argumentó que primero deberíamos intentar comunicarnos con delfines en la Tierra antes de buscar inteligencia en otros planetas. La ecuación no pretende dar una respuesta definitiva, sino organizar nuestra ignorancia de manera productiva: al identificar cada factor por separado, los científicos pueden diseñar experimentos específicos para reducir la incertidumbre en cada uno.',
      'Las estimaciones modernas de la Ecuación de Drake han cambiado radicalmente desde 1961. Los datos del telescopio espacial Kepler, lanzado en 2009, revelaron que prácticamente todas las estrellas tienen planetas, y que aproximadamente el 22% de las estrellas similares al Sol poseen planetas rocosos en la zona habitable. Esto significa que fp × ne es mucho más alto de lo que Drake y Sagan estimaron originalmente. Sin embargo, los factores biológicos (fl, fi, fc) siguen siendo desconocidos. No tenemos ni un solo dato sobre la frecuencia con que surge la vida en otros planetas, lo que convierte a la ecuación en una herramienta de reflexión más que en una fórmula predictiva con resultado numérico preciso.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Frank Drake realizó el primer experimento SETI de la historia en 1960, un año antes de formular su ecuación. El Proyecto Ozma (nombrado por la princesa de los libros de Oz) usó el radiotelescopio de Green Bank de 26 metros para escuchar dos estrellas cercanas similares al Sol: Tau Ceti y Epsilon Eridani. Drake escuchó durante 150 horas sin detectar señales artificiales, pero el proyecto demostró que la búsqueda era técnicamente posible con la tecnología disponible en esa época.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Si usamos las estimaciones más optimistas actuales para la Ecuación de Drake (R*=3, fp=1, ne=0.4, fl=0.3, fi=0.1, fc=0.5, L=10,000 años), obtenemos N≈18 civilizaciones comunicativas en la Vía Láctea en cualquier momento dado. Si usamos estimaciones pesimistas (con L=100 años), N se reduce a menos de 1, lo que explicaría nuestro silencio observacional. La variable L domina el resultado final de forma determinante.' },
    ],
    fact: 'El 15 de agosto de 1977, el astrónomo Jerry Ehman detectó una señal de radio inusual con el radiotelescopio Big Ear de la Universidad Estatal de Ohio. La señal duró exactamente 72 segundos, coincidía con la frecuencia del hidrógeno (1420 MHz, la frecuencia que Drake y Sagan consideraban más lógica para una comunicación interestelar), y era 30 veces más potente que el ruido de fondo. Ehman escribió "Wow!" junto a los datos impresos, dándole nombre a la señal más prometedora jamás detectada por SETI. A pesar de décadas de intentos, la señal nunca se repitió.',
  },
  {
    id: 'seti-escuchando',
    title: 'SETI: Escuchando al Cosmos',
    color: '#D4A535',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_seti-escuchando.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_seti-escuchando.jpg',
    content: [
      'SETI (Search for Extraterrestrial Intelligence) es el programa científico dedicado a detectar señales de civilizaciones tecnológicas en otros sistemas estelares. El concepto nació formalmente en 1959, cuando los físicos Giuseppe Cocconi y Philip Morrison publicaron un artículo en la revista Nature titulado "Searching for Interstellar Communications". En él argumentaban que la frecuencia de 1420 MHz, correspondiente a la línea de emisión del hidrógeno neutro, sería la banda lógica para comunicaciones interestelares porque es la frecuencia más común en el universo y cualquier civilización tecnológica la conocería.',
      'El Proyecto Ozma de Frank Drake en 1960 fue la primera búsqueda SETI sistemática. Usando el radiotelescopio de 26 metros en Green Bank, Virginia Occidental, Drake apuntó hacia Tau Ceti (a 11.9 años luz) y Epsilon Eridani (a 10.5 años luz) durante un total de 150 horas. No detectó señales artificiales, pero estableció la metodología que seguirían todas las búsquedas posteriores. Carl Sagan se convirtió en el defensor público más visible de SETI durante las décadas de 1970 y 1980, argumentando ante el Congreso de Estados Unidos que la búsqueda merecía financiación gubernamental porque el descubrimiento de inteligencia extraterrestre sería el hallazgo más trascendente de la historia humana.',
      'El Allen Telescope Array (ATA), ubicado en Hat Creek, California, es un conjunto de 42 antenas de 6.1 metros de diámetro diseñado específicamente para la búsqueda SETI. Financiado inicialmente por el cofundador de Microsoft Paul Allen con una donación de 30 millones de dólares, el ATA comenzó operaciones en 2007. A diferencia de los radiotelescopios tradicionales que solo pueden apuntar a una estrella a la vez, el ATA puede observar múltiples objetivos simultáneamente. El plan original contemplaba 350 antenas, pero las limitaciones presupuestarias redujeron el proyecto. Actualmente el Instituto SETI opera el ATA para monitorear estrellas cercanas de forma continua.',
      'En 1992, la NASA lanzó el programa HRMS (High Resolution Microwave Survey), el proyecto SETI más ambicioso jamás financiado con fondos públicos. Usando los radiotelescopios de Arecibo (305 metros) y Goldstone (70 metros), el programa planeaba una búsqueda de 10 años cubriendo todo el cielo. Sin embargo, solo un año después, en 1993, el senador Richard Bryan de Nevada convenció al Congreso de cancelar la financiación, declarando que "no se había encontrado ni una sola marcianita" con el dinero de los contribuyentes. La comunidad científica privada, liderada por Carl Sagan entre otros, rescató el proyecto bajo el nombre Phoenix con financiación privada.',
      'La tecnología SETI moderna ha avanzado enormemente. El proyecto Breakthrough Listen, lanzado en 2015 por el empresario Yuri Milner con una inversión de 100 millones de dólares y respaldado por Stephen Hawking, utiliza los radiotelescopios de Green Bank (100 metros), Parkes en Australia (64 metros) y el telescopio óptico Automated Planet Finder en el Observatorio Lick. Breakthrough Listen puede analizar más de mil millones de canales de frecuencia simultáneamente y es capaz de detectar una señal equivalente a un radar de aeropuerto desde una estrella a 10 años luz de distancia. También existe SETI@home, que desde 1999 hasta 2020 utilizó la potencia de cómputo distribuida de millones de computadoras personales voluntarias para analizar datos de Arecibo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El 16 de noviembre de 1974, el radiotelescopio de Arecibo transmitió un mensaje codificado hacia el cúmulo estelar M13, ubicado a 25,000 años luz. El mensaje, diseñado por Frank Drake con ayuda de Carl Sagan, era un código binario de 1,679 bits (producto de los primos 73 × 23) que, organizados en cuadrícula, formaban una imagen con los números del 1 al 10, los elementos del ADN, una figura humana, el Sistema Solar y el telescopio. Si alguien responde, la respuesta llegará en 50,000 años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La frecuencia de 1420 MHz elegida por SETI corresponde a la transición hiperfina del hidrógeno neutro, donde el espín del electrón cambia de paralelo a antiparalelo respecto al protón. Esta transición emite un fotón con longitud de onda de 21 centímetros. Los astrónomos la consideran una "frecuencia universal" porque el hidrógeno constituye el 75% de la materia bariónica del universo, y cualquier civilización con radiotelescopios la detectaría inevitablemente.' },
    ],
    fact: 'El radiotelescopio de Arecibo operó durante 57 años (1963-2020) y fue el telescopio de un solo plato más grande del mundo hasta que China completó FAST (Five-hundred-meter Aperture Spherical Telescope) en 2016, con 500 metros de diámetro. Arecibo colapsó el 1 de diciembre de 2020 tras fallos en los cables de soporte. Durante su vida útil, descubrió el primer exoplaneta confirmado (alrededor del púlsar PSR B1257+12 en 1992), cartografió la superficie de Venus con radar, y detectó el primer púlsar binario (Hulse-Taylor, 1974), cuyo estudio proporcionó la primera evidencia indirecta de ondas gravitacionales, lo que contribuyó al Premio Nobel de Física de 1993.',
  },
  {
    id: 'paradoja-fermi',
    title: 'La Paradoja de Fermi',
    color: '#7A5BAF',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_paradoja-fermi.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_paradoja-fermi.jpg',
    content: [
      'En el verano de 1950, durante un almuerzo en el Laboratorio Nacional de Los Álamos, el físico italiano Enrico Fermi formuló una pregunta que sigue sin respuesta: "¿Dónde están todos?" (Where is everybody?). Fermi señaló una contradicción aparente: si la Vía Láctea contiene entre 100,000 y 400,000 millones de estrellas, si muchas tienen planetas, si la galaxia tiene 13,000 millones de años de antigüedad, y si una civilización tecnológica podría colonizar toda la galaxia en unos pocos millones de años usando viajes sublumínicos, entonces la galaxia debería estar llena de civilizaciones avanzadas. Sin embargo, no tenemos ninguna evidencia de su existencia. Esta contradicción se conoce como la Paradoja de Fermi.',
      'Carl Sagan abordó la Paradoja de Fermi con cautela. Reconocía la fuerza del argumento de Fermi pero advertía que la ausencia de evidencia no es evidencia de ausencia. Sagan señalaba que nuestras búsquedas SETI habían cubierto una fracción insignificante del cielo, del espectro electromagnético y del tiempo. Comparaba la situación con alguien que, tras meter un vaso en el océano y no encontrar ballenas, concluyera que no existen ballenas en el mar. Para Sagan, la paradoja no demostraba que estamos solos, sino que necesitábamos buscar con más intensidad, más paciencia y mejores instrumentos.',
      'Existen más de 75 soluciones propuestas para la Paradoja de Fermi. La hipótesis del Gran Filtro, formulada por el economista Robin Hanson en 1998, sugiere que existe algún obstáculo extremadamente difícil de superar en la evolución desde la materia inerte hasta una civilización interestelar. Si el filtro está en nuestro pasado (por ejemplo, el surgimiento de células eucariotas o de inteligencia), entonces somos afortunados y otras civilizaciones no llegan a ese punto. Si el filtro está en nuestro futuro (como la autodestrucción por tecnología), las civilizaciones se extinguen antes de poder expandirse, lo que tendría implicaciones preocupantes para nuestra propia supervivencia.',
      'La Hipótesis del Zoo, propuesta por el astrofísico John Ball en 1973, plantea que civilizaciones avanzadas podrían estar observando la Tierra deliberadamente sin intervenir, de manera similar a como los biólogos estudian animales en reservas naturales sin interferir. Otras soluciones incluyen la Hipótesis del Bosque Oscuro (las civilizaciones se ocultan por seguridad), la Hipótesis de la Tierra Rara (las condiciones para la vida compleja son extraordinariamente infrecuentes) propuesta por Peter Ward y Donald Brownlee en 2000, y la posibilidad de que las civilizaciones avanzadas se comuniquen por medios que no podemos detectar con nuestra tecnología actual.',
      'La Paradoja de Fermi adquiere mayor relevancia a medida que descubrimos más exoplanetas en zonas habitables. Si prácticamente todas las estrellas tienen planetas y un porcentaje significativo se encuentra en condiciones que podrían soportar agua líquida, la pregunta de Fermi se vuelve más urgente. El astrónomo Michael Hart argumentó en 1975 que la ausencia de visitantes extraterrestres demuestra que somos la única civilización tecnológica en la galaxia. En contraste, Sagan respondía que quizás las civilizaciones sabias no viajan físicamente sino que se comunican por radio, o que los viajes interestelares son tan difíciles que ninguna civilización los emprende, sin importar cuán avanzada sea.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Enrico Fermi era conocido por su capacidad para hacer estimaciones rápidas y precisas con información limitada (llamadas "problemas de Fermi"). Durante la primera prueba nuclear Trinity en 1945, dejó caer trocitos de papel al sentir la onda expansiva y calculó que la explosión había liberado energía equivalente a 10 kilotones de TNT. La medición oficial posterior fue 21 kilotones, lo que demuestra la notable precisión de su método aproximativo con datos mínimos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El astrofísico Frank Tipler calculó en 1980 que una civilización que enviara sondas autorreplicantes (similares a las sondas Von Neumann del matemático John von Neumann) podría explorar toda la Vía Láctea en aproximadamente 300 millones de años, incluso viajando a solo el 10% de la velocidad de la luz. Dado que la galaxia tiene 13,000 millones de años, ha habido tiempo suficiente para que esto ocurriera más de 40 veces, reforzando la pregunta de Fermi.' },
    ],
    fact: 'En 2020, los astrónomos del proyecto Breakthrough Listen detectaron una señal de radio a 982 MHz proveniente de la dirección de Próxima Centauri, la estrella más cercana al Sol a 4.24 años luz. Denominada BLC1 (Breakthrough Listen Candidate 1), la señal mostraba un desplazamiento de frecuencia consistente con una fuente no terrestre y no fue asociada a ninguna interferencia conocida. Tras meses de análisis, los investigadores concluyeron en 2021 que probablemente era una interferencia terrestre compleja, pero BLC1 demostró que los algoritmos actuales pueden detectar señales candidatas con sensibilidad sin precedentes.',
  },
  {
    id: 'exoplanetas',
    title: 'Exoplanetas',
    color: '#C49225',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_exoplanetas.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_exoplanetas.jpg',
    content: [
      'Un exoplaneta es un planeta que orbita una estrella fuera de nuestro Sistema Solar. Aunque la idea de que otras estrellas podrían tener planetas existía desde la antigüedad (Epicuro la propuso en el siglo III a.C.), la primera detección confirmada no ocurrió hasta 1992, cuando Aleksander Wolszczan y Dale Frail descubrieron dos planetas orbitando el púlsar PSR B1257+12 usando el radiotelescopio de Arecibo. El primer exoplaneta alrededor de una estrella similar al Sol, 51 Pegasi b, fue detectado en 1995 por Michel Mayor y Didier Queloz del Observatorio de Ginebra, un descubrimiento que les valió el Premio Nobel de Física en 2019.',
      'El telescopio espacial Kepler, lanzado por la NASA el 7 de marzo de 2009, revolucionó nuestra comprensión de los exoplanetas. Durante sus nueve años de operación, Kepler monitoreó el brillo de más de 530,000 estrellas en una región del cielo entre las constelaciones Cygnus y Lyra, buscando las diminutas disminuciones de luz causadas cuando un planeta transita (pasa frente a) su estrella. Kepler descubrió 2,662 exoplanetas confirmados y reveló que los planetas son más comunes que las estrellas en nuestra galaxia. Los datos de Kepler demostraron que aproximadamente una de cada cinco estrellas similares al Sol tiene un planeta rocoso en su zona habitable.',
      'La zona habitable (también llamada "zona Goldilocks" o "zona Ricitos de Oro") es la región alrededor de una estrella donde las temperaturas permiten la existencia de agua líquida en la superficie de un planeta. Esta zona varía según el tipo de estrella: para estrellas más calientes que el Sol, está más lejos; para estrellas más frías (enanas rojas tipo M), está más cerca. El sistema TRAPPIST-1, descubierto en 2016-2017, contiene siete planetas rocosos del tamaño de la Tierra, tres de los cuales se encuentran en la zona habitable de su estrella, una enana roja ultrafría ubicada a 40 años luz de distancia en la constelación de Acuario.',
      'El telescopio espacial TESS (Transiting Exoplanet Survey Satellite), lanzado por la NASA en abril de 2018, es el sucesor de Kepler. Mientras Kepler observaba una región fija del cielo, TESS examina casi todo el cielo en sectores de 27 días, buscando exoplanetas alrededor de las estrellas más cercanas y brillantes. Hasta 2024, TESS ha descubierto más de 400 exoplanetas confirmados y miles de candidatos pendientes de verificación. Su estrategia de observar estrellas cercanas facilita el estudio posterior de las atmósferas planetarias con telescopios como el James Webb.',
      'El telescopio espacial James Webb (JWST), operativo desde julio de 2022, tiene la capacidad de analizar las atmósferas de exoplanetas mediante espectroscopia de tránsito, detectando las huellas químicas de gases como vapor de agua, dióxido de carbono, metano y oxígeno. En septiembre de 2022, el JWST detectó dióxido de carbono en la atmósfera del exoplaneta WASP-39b, la primera detección directa de CO₂ en una atmósfera exoplanetaria. En septiembre de 2023, el JWST detectó dimetil sulfuro (DMS) en la atmósfera del exoplaneta K2-18b, un gas que en la Tierra es producido exclusivamente por organismos vivos, aunque los científicos advierten que se necesitan más observaciones para confirmar este resultado.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A fecha de 2024, la NASA ha confirmado más de 5,600 exoplanetas en más de 4,100 sistemas planetarios diferentes. Los tipos más comunes son los "mini-Neptunos" (planetas entre el tamaño de la Tierra y Neptuno), que no tienen equivalente en nuestro Sistema Solar. El exoplaneta confirmado más cercano es Próxima Centauri b, un planeta rocoso en la zona habitable de Próxima Centauri, a solo 4.24 años luz de la Tierra, descubierto en 2016 por el equipo del astrónomo Guillem Anglada-Escudé.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El método de tránsito detecta exoplanetas midiendo la disminución del brillo de una estrella cuando un planeta pasa frente a ella. Un planeta del tamaño de la Tierra causa una disminución de brillo de apenas el 0.008% (84 partes por millón) en una estrella como el Sol. Para detectar esto, Kepler medía variaciones de brillo con una precisión de 20 partes por millón, equivalente a detectar una pulga pasando frente a un faro a 10 kilómetros de distancia. El método de velocidad radial, usado para 51 Pegasi b, detecta el bamboleo gravitacional de la estrella causado por el planeta.' },
    ],
    fact: 'Carl Sagan predijo la abundancia de exoplanetas décadas antes de que fueran descubiertos. En su serie Cosmos (1980), declaró que la mayoría de las estrellas probablemente tenían familias de planetas, una afirmación basada en modelos teóricos de formación estelar que entonces carecían de confirmación observacional. Cuando Sagan murió en diciembre de 1996, solo se habían confirmado 6 exoplanetas. Hoy, con más de 5,600 descubiertos, los datos han validado sus estimaciones. El catálogo de exoplanetas de la NASA lleva su espíritu: cada nuevo mundo descubierto acerca a la humanidad a responder la pregunta que Sagan consideraba la más importante de todas.',
  },
  {
    id: 'vida-sistema-solar',
    title: 'Vida en el Sistema Solar',
    color: '#9370C4',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_vida-sistema-solar.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_vida-sistema-solar.jpg',
    content: [
      'Marte ha sido el foco principal de la búsqueda de vida en nuestro Sistema Solar desde las misiones Viking de la NASA en 1976. Viking 1 aterrizó el 20 de julio y Viking 2 el 3 de septiembre en la superficie marciana, llevando tres experimentos biológicos diseñados para detectar metabolismo microbiano. Carl Sagan participó en el equipo científico y defendió que los resultados del experimento Labeled Release (que mostró liberación de gas radioactivo al añadir nutrientes al suelo) podían indicar actividad biológica. La mayoría de los científicos concluyeron que las reacciones eran químicas, causadas por percloratos en el suelo, pero el debate continúa hasta hoy.',
      'El rover Curiosity de la NASA aterrizó en el cráter Gale de Marte el 6 de agosto de 2012. Ha recorrido más de 30 kilómetros y ha realizado descubrimientos fundamentales: detectó moléculas orgánicas complejas (tiofenos, benceno, tolueno) en rocas de 3,500 millones de años de antigüedad, midió variaciones estacionales de metano en la atmósfera marciana (un gas que en la Tierra es producido mayoritariamente por organismos vivos), y confirmó que el cráter Gale albergó un lago de agua dulce habitable durante al menos varios millones de años. Perseverance, que aterrizó el 18 de febrero de 2021 en el cráter Jezero, está recolectando muestras de roca que serán traídas a la Tierra por la misión Mars Sample Return para análisis detallado.',
      'Europa, la luna de Júpiter descubierta por Galileo en 1610, contiene un océano global de agua líquida salada bajo una corteza de hielo de entre 15 y 25 kilómetros de espesor. La sonda Galileo de la NASA (1995-2003) detectó un campo magnético inducido en Europa consistente con un océano conductor de electricidad. Se estima que este océano contiene el doble de agua que todos los océanos de la Tierra combinados y tiene una profundidad de hasta 100 kilómetros. La misión Europa Clipper de la NASA, lanzada en octubre de 2024, realizará 49 sobrevuelos cercanos para estudiar la composición del hielo, la profundidad del océano y la posible presencia de compuestos orgánicos en los géiseres de vapor que brotan de las fracturas en la superficie.',
      'Encélado, una luna de Saturno de solo 504 kilómetros de diámetro, sorprendió a los científicos cuando la sonda Cassini descubrió en 2005 géiseres de vapor de agua y hielo brotando de fracturas llamadas "rayas de tigre" en su polo sur. Cassini voló directamente a través de estos géiseres y detectó hidrógeno molecular, un posible indicador de actividad hidrotermal en el fondo del océano subterráneo de Encélado. También encontró sílice nanométrica y compuestos orgánicos complejos con masas moleculares superiores a 200 unidades de masa atómica, sugiriendo que el fondo oceánico tiene fuentes hidrotermales similares a las que existen en los océanos terrestres, donde prosperan ecosistemas completos sin luz solar.',
      'Titán, la luna más grande de Saturno con 5,150 kilómetros de diámetro, es el único cuerpo del Sistema Solar además de la Tierra con lagos y mares estables de líquido en su superficie. Sin embargo, en lugar de agua, estos lagos contienen metano y etano líquidos a temperaturas de -179°C. La sonda Huygens de la ESA aterrizó en Titán el 14 de enero de 2005, transmitiendo imágenes durante 72 minutos que mostraron un paisaje con canales de drenaje tallados por lluvias de metano. Titán tiene una atmósfera densa rica en nitrógeno y moléculas orgánicas prebióticas como cianuro de hidrógeno y tiolinas. Algunos astrobiólogos especulan que podría existir una forma de vida basada en metano líquido en lugar de agua, algo que desafiaría nuestra definición terrestre de la vida.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Carl Sagan se interesó por Titán décadas antes de que ninguna sonda lo visitara. En su tesis doctoral de 1960 en la Universidad de Chicago, Sagan estudió la atmósfera de Venus y propuso que las moléculas orgánicas en la atmósfera de Titán podrían formar compuestos prebióticos. Cuando la Voyager 1 fotografió Titán en 1980 y confirmó su densa atmósfera de nitrógeno, Sagan abogó por enviar una sonda de aterrizaje, un sueño que se cumplió 25 años después con la misión Huygens de la ESA.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las fuentes hidrotermales en el fondo oceánico de la Tierra, descubiertas en 1977 cerca de las Islas Galápagos, albergan ecosistemas completos que no dependen de la luz solar. Bacterias quimiosintéticas convierten sulfuro de hidrógeno y otros compuestos químicos en energía, alimentando gusanos tubícolas, cangrejos y camarones. Si existen fuentes hidrotermales similares en Europa o Encélado, estas podrían sostener ecosistemas análogos sin necesidad de fotosíntesis.' },
    ],
    fact: 'La misión Dragonfly de la NASA, programada para lanzarse en 2028 y llegar a Titán en 2034, será un dron-helicóptero de ocho rotores que volará por la densa atmósfera de Titán (1.5 veces más densa que la terrestre pero con gravedad 7 veces menor), recorriendo cientos de kilómetros entre diferentes sitios de aterrizaje. Dragonfly llevará un espectrómetro de masas para analizar la composición química de la superficie y buscar indicios de química prebiótica o biología exótica basada en solventes distintos al agua, algo que Carl Sagan habría considerado una de las misiones más relevantes en la historia de la exploración espacial.',
  },
  {
    id: 'astrobiologia',
    title: 'Astrobiología',
    color: '#B88420',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_astrobiologia.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_astrobiologia.jpg',
    content: [
      'La astrobiología es la disciplina científica que estudia el origen, evolución, distribución y futuro de la vida en el universo. Aunque el término fue acuñado por la NASA en 1995, las preguntas fundamentales que aborda son antiguas. ¿Qué es la vida? ¿Cómo surge a partir de materia inerte? ¿Puede existir vida basada en química diferente a la terrestre? Carl Sagan fue uno de los científicos que más contribuyó a establecer la astrobiología como campo legítimo de investigación. En una época en que hablar de vida extraterrestre en círculos académicos podía dañar una carrera profesional, Sagan defendió públicamente que la búsqueda de vida más allá de la Tierra era una empresa científica rigurosa y necesaria.',
      'El experimento de Miller-Urey, realizado en 1952 por Stanley Miller bajo la dirección de Harold Urey en la Universidad de Chicago, demostró que las moléculas orgánicas básicas de la vida pueden formarse a partir de compuestos inorgánicos simples. Miller selló en un matraz una mezcla de metano, amoníaco, hidrógeno y vapor de agua (simulando lo que entonces se creía era la atmósfera primitiva de la Tierra) y la sometió a descargas eléctricas continuas durante una semana. Al analizar el contenido, encontró aminoácidos, los bloques constituyentes de las proteínas. Experimentos posteriores han producido nucleótidos, lípidos y azúcares usando condiciones similares, sugiriendo que los ingredientes básicos de la vida se forman con relativa facilidad en condiciones planetarias tempranas.',
      'Los organismos extremófilos han ampliado radicalmente nuestra comprensión de dónde puede existir la vida. Deinococcus radiodurans, una bacteria descubierta en 1956, sobrevive dosis de radiación 3,000 veces superiores a las letales para humanos, reparando su ADN completamente fragmentado en pocas horas. Thermophilus aquaticus prospera en fuentes termales a 80°C y proporcionó la enzima Taq polimerasa que hizo posible la técnica PCR (reacción en cadena de la polimerasa), fundamental para la genética moderna. En 2010, científicos descubrieron la bacteria GFAJ-1 en el lago Mono de California, que puede incorporar arsénico en su metabolismo, aunque este hallazgo fue posteriormente cuestionado y parcialmente refutado.',
      'La hipótesis de la panspermia propone que la vida no se originó en la Tierra sino que fue transportada desde otro lugar del cosmos, posiblemente en meteoritos, cometas o polvo interestelar. El astrónomo Fred Hoyle y su colega Chandra Wickramasinghe fueron los defensores más prominentes de esta idea a partir de la década de 1970. Evidencia a favor incluye el descubrimiento de más de 80 aminoácidos diferentes en el meteorito Murchison (caído en Australia en 1969), la supervivencia demostrada de esporas bacterianas en el vacío espacial durante 6 años en el exterior de la Estación Espacial Internacional (experimento EXPOSE de la ESA), y la detección de glicina (un aminoácido) en el cometa 67P/Churyumov-Gerasimenko por la sonda Rosetta en 2016.',
      'La definición misma de vida sigue siendo debatida. La NASA utiliza una definición operativa: "un sistema químico autosostenido capaz de evolución darwiniana". Sin embargo, esta definición excluye entidades como los virus y los priones. Sagan advertía que nuestra comprensión de la vida está sesgada por el único ejemplo que conocemos: la vida terrestre, basada en carbono, agua líquida y ADN/ARN. Es posible que existan formas de vida basadas en silicio en lugar de carbono, que usen amoníaco líquido como solvente en lugar de agua, o que almacenen información genética en moléculas completamente diferentes al ADN. La astrobiología moderna mantiene la mente abierta ante estas posibilidades mientras desarrolla instrumentos capaces de detectar "biofirmas" generales que no dependan de suposiciones sobre la bioquímica específica de la vida extraterrestre.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El tardígrado (conocido coloquialmente como "oso de agua") es quizás el animal más resistente de la Tierra. Estos invertebrados microscópicos de 0.5 mm sobreviven temperaturas desde -272°C hasta 150°C, presiones 6 veces superiores a las del fondo oceánico más profundo, el vacío del espacio, y dosis de radiación cientos de veces letales para humanos. En 2019, la nave israelí Beresheet se estrelló en la Luna llevando tardígrados deshidratados. Los científicos creen que podrían haber sobrevivido al impacto, convirtiéndolos potencialmente en los primeros habitantes lunares.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 1990, la sonda Galileo de la NASA realizó un sobrevuelo de la Tierra camino a Júpiter. Carl Sagan propuso usar este sobrevuelo como un "experimento de control" para buscar señales de vida desde el espacio. Galileo detectó oxígeno y metano en la atmósfera (una combinación termodinámicamente inestable que requiere reposición biológica constante), luz reflejada por clorofila, y emisiones de radio moduladas. Sagan publicó estos resultados en Nature en 1993, estableciendo el protocolo para buscar biofirmas en exoplanetas.' },
    ],
    fact: 'El meteorito ALH84001, encontrado en la Antártida en 1984 y originario de Marte, generó una controversia científica global en 1996 cuando el equipo de David McKay del Centro Espacial Johnson de la NASA anunció que contenía posibles fósiles de bacterias marcianas. Las estructuras microscópicas encontradas median entre 20 y 100 nanómetros, más pequeñas que cualquier bacteria terrestre conocida. El presidente Bill Clinton hizo una declaración pública sobre el hallazgo. Aunque la mayoría de los científicos concluyeron posteriormente que las estructuras podían explicarse por procesos no biológicos, ALH84001 demostró que la pregunta sobre vida en Marte puede responderse con muestras físicas, motivando las misiones de retorno de muestras actualmente en planificación.',
  },
  {
    id: 'contact-ciencia-ficcion',
    title: 'Contact: Ciencia y Ficción',
    color: '#4A2D6F',
    btnImage: '/assets/carl_sagan/infographic_m4/btn_contact-ciencia-ficcion.jpg',
    image: '/assets/carl_sagan/infographic_m4/hero_contact-ciencia-ficcion.jpg',
    content: [
      'Contact, la novela de Carl Sagan publicada en 1985 por Simon & Schuster, narra la historia de la astrónoma Ellie Arroway, quien detecta una señal de radio artificial proveniente de la estrella Vega, a 26 años luz de la Tierra. Sagan trabajó en la novela durante más de una década, consultando con físicos como Kip Thorne (futuro Premio Nobel 2017) para asegurar la precisión científica. De hecho, fue Sagan quien pidió a Thorne que investigara si un agujero de gusano podría funcionar como mecanismo de viaje interestelar, una consulta que llevó a Thorne a publicar artículos académicos sobre agujeros de gusano transitables y que eventualmente influyó en la película Interstellar de 2014.',
      'La novela explora temas científicos reales con rigor. La señal detectada por Arroway consiste en una secuencia de números primos (2, 3, 5, 7, 11...), que Sagan argumentaba sería reconocida universalmente como artificial porque los números primos no ocurren en procesos astrofísicos naturales. Dentro de la señal hay planos de una máquina de transporte, codificados en un formato que la humanidad debe descifrar. Sagan utilizó la trama para explorar la tensión entre ciencia y fe, la política de la financiación científica, el papel de la mujer en la ciencia (Arroway enfrenta sexismo institucional constante), y la pregunta filosófica de qué constituye "evidencia" cuando la experiencia es subjetiva e irrepetible.',
      'La película Contact, estrenada el 11 de julio de 1997, fue dirigida por Robert Zemeckis y protagonizada por Jodie Foster como Ellie Arroway. Sagan murió el 20 de diciembre de 1996, siete meses antes del estreno, pero participó activamente en el desarrollo del guion junto a su esposa Ann Druyan. La película ganó el premio Hugo a la mejor presentación dramática y fue elogiada por la comunidad científica por su representación realista de la investigación SETI. La escena donde Arroway escucha por primera vez la señal alienígena fue filmada en el Very Large Array (VLA) de Nuevo México, un conjunto real de 27 antenas de 25 metros que los astrónomos utilizan para radioastronomía.',
      'La precisión científica de Contact fue deliberada. Sagan insistió en que el radiotelescopio de Arecibo apareciera en la película, que los procedimientos de verificación de señales fueran realistas (eliminar interferencias terrestres, confirmar con telescopios independientes, verificar que la señal se mueve con la rotación estelar), y que la tecnología mostrada fuera plausible. La máquina de transporte de la película no utiliza propulsión convencional sino un agujero de gusano, un concepto de la relatividad general que Kip Thorne demostró que era teóricamente posible si existiera materia con densidad de energía negativa, aunque tal materia no ha sido observada experimentalmente.',
      'El legado de Contact trasciende el entretenimiento. La novela y la película inspiraron a una generación de científicos a entrar en el campo SETI y la astrobiología. Jill Tarter, directora del Instituto SETI durante décadas, fue la inspiración principal para el personaje de Ellie Arroway y ha declarado que Contact legitimó la búsqueda de inteligencia extraterrestre ante el público general. La frase de la película "Si solo estamos nosotros, sería un terrible desperdicio de espacio" (adaptada de la novela) se convirtió en un argumento cultural poderoso a favor de la exploración. Ann Druyan, viuda de Sagan, continuó su trabajo produciendo la secuela de Cosmos en 2014 con Neil deGrasse Tyson, asegurando que el mensaje de curiosidad científica y humildad cósmica de Sagan alcanzara nuevas generaciones.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Jodie Foster se preparó para el papel de Ellie Arroway visitando el Instituto SETI y pasando tiempo con Jill Tarter, observando cómo los científicos reales monitoreaban señales de radio. Foster también aprendió a operar los controles del radiotelescopio del VLA en Nuevo México. La actriz ha declarado en entrevistas que el papel de Arroway fue uno de los más significativos de su carrera porque le permitió representar a una científica sin estereotipos ni simplificaciones, algo poco común en Hollywood durante los años noventa.' },
      { label: 'En la Película', icon: 'zap', text: 'Contact incluye una escena donde la señal extraterrestre contiene un video de la primera transmisión televisiva de alta potencia de la Tierra: las ceremonias de apertura de los Juegos Olímpicos de Berlín de 1936, con Adolf Hitler. Sagan usó este detalle para ilustrar un concepto real: las transmisiones de radio y televisión terrestres se propagan al espacio a la velocidad de la luz. Vega está a 26 años luz, por lo que en 1985 (año de la novela), la señal de 1936 habría tenido tiempo de llegar a Vega y regresar, haciendo la cronología científicamente coherente.' },
    ],
    fact: 'Carl Sagan murió el 20 de diciembre de 1996 a los 62 años de neumonía, complicación de mielodisplasia, en el Centro de Investigación del Cáncer Fred Hutchinson en Seattle. Había recibido un trasplante de médula ósea de su hermana Cari dos años antes. Sagan publicó más de 600 artículos científicos, fue autor o coautor de más de 20 libros, y su serie Cosmos de 1980 fue vista por más de 500 millones de personas en 60 países, convirtiéndola en la serie de televisión pública más vista de la historia estadounidense hasta ese momento. En 2023, la NASA le homenajeó nombrando oficialmente el lugar de aterrizaje de la sonda Mars Pathfinder como "Carl Sagan Memorial Station".',
  },
];

// ─── Cosmic Signal Particle Field (Canvas Background) ────────────────────────
function CosmicSignalField() {
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
      hue: Math.random() > 0.5 ? '145,100,210' : '212,165,53',
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

// ─── Signal Search Header ────────────────────────────────────────────────────
function SignalSearchHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,61,143,0.3))' }}>
        {/* Signal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#signalGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B3D8F','#D4A535','#7A5BAF','#C49225','#9370C4','#B88420','#4A2D6F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central radio dish icon */}
        <path d="M285 25 Q300 15 315 25" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" />
        <line x1="300" y1="20" x2="300" y2="38" stroke="#D4A535" strokeWidth="1.5" opacity="0.5" />
        <circle cx="300" cy="18" r="2.5" fill="#D4A535" opacity="0.5" />
        <defs>
          <linearGradient id="signalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,61,143,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(91,61,143,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIDA EXTRATERRESTRE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA BÚSQUEDA EN EL COSMOS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,61,143,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotSaganM4"
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} poster={node.video.poster} />
          </div>
        )}

        {/* Fact Box */}
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
      border: '1px solid rgba(91,61,143,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B3D8F, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,61,143,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_SaganM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(20,12,40,0.8) 40%, rgba(10,10,15,0.88) 100%), url(/assets/sagan/sagan_m4.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,61,143,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <CosmicSignalField />

      <SignalSearchHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(91,61,143,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has completado la búsqueda de vida extraterrestre!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cazador de Señales
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
