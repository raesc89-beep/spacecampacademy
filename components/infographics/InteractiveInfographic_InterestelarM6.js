'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Voyager themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoVoyager({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 22 L30 5 L35 5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 30 L5 30 L5 35" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="15" y1="15" x2="24" y2="24" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="45" y1="45" x2="36" y2="36" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 38 22 Q 45 15 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="10" r="2" fill={color} />
    </svg>
  );
}

function DecoGoldenRecord({ size = 70, color = '#FF8A65', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
      <path d="M30 6 L30 10" stroke={color} strokeWidth="2" />
      <path d="M54 30 L50 30" stroke={color} strokeWidth="2" />
      <path d="M30 54 L30 50" stroke={color} strokeWidth="2" />
      <path d="M6 30 L10 30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoPlanetFlyby({ size = 70, color = '#2979FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="30" rx="25" ry="8" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(20 30 30)" />
      <path d="M 5 50 Q 20 45 30 30 T 55 10" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
      <circle cx="55" cy="10" r="2" fill={color} />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoAntenna({ size = 70, color = '#90A4AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 20 Q 30 5 50 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 15 25 Q 30 15 45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 20 30 Q 30 25 40 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="2" />
      <line x1="25" y1="50" x2="35" y2="50" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="2" fill={color} />
    </svg>
  );
}

function DecoRTG({ size = 70, color = '#00E676', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="15" width="20" height="30" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="25" x2="45" y2="25" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="30" x2="45" y2="30" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="35" x2="45" y2="35" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="15" r="2" fill={color} />
      <path d="M 30 5 L 30 15" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const DECO_MAP = {
  'lanzamiento-1977': [DecoVoyager, DecoPlanetFlyby, DecoAntenna],
  'gran-tour-planetario': [DecoPlanetFlyby, DecoVoyager, DecoRTG],
  'disco-de-oro': [DecoGoldenRecord, DecoAntenna, DecoVoyager],'heliopausa-cruce': [DecoVoyager, DecoAntenna, DecoPlanetFlyby],
  'espacio-interestelar': [DecoAntenna, DecoVoyager, DecoGoldenRecord],'energia-plutonio': [DecoRTG, DecoVoyager, DecoPlanetFlyby],
  'legado-humanidad': [DecoGoldenRecord, DecoVoyager, DecoAntenna],
}; const BIBLIOGRAPHY = ['Stone, E.C. et al. (2013). "Voyager 1 Observes Low-Energy Galactic Cosmic Rays in a Region Depleted of Heliospheric Ions", Science, 341',
  'Gurnett, D.A. et al. (2013). "In Situ Observations of Interstellar Plasma with Voyager 1", Science, 341',
  'Burlaga, L.F. et al. (2019). "Magnetic field and particle measurements made by Voyager 2 at the heliopause", Nature Astronomy, 3',
  'Sagan, C. Et al. (1978). Murmurs of Earth: The Voyager Interstellar Record, Random House',
  'Kohlhase, C. & Penzo, P. (1977). "Voyager Mission Description", Space Science Reviews, 21',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'lanzamiento-1977',
    title: 'El Lanzamiento',
    color: '#FFD54F',
    btnImage: '/assets/interestelar/infographic_m6/btn_lanzamiento-1977.jpg',
    image: '/assets/interestelar/infographic_m6/hero_lanzamiento-1977.jpg',
    content: [
      'Lanzar una sonda y hacer que pase sobre cuatro planetas en movimiento usando solo el impulso inicial es muy complejo. La NASA aprovechó una alineación planetaria rara que ocurre cada 176 años. Los gigantes gaseosos estaban en la posición perfecta para que una nave pudiera visitarlos en un solo viaje. Esta ventana de oportunidad se llamó el "Gran Tour". Si perdían esta oportunidad en 1977, la humanidad tendría que esperar hasta el año 2153 para intentarlo de nuevo.',
      'La sonda Voyager 2 despegó el 20 de agosto de 1977. La Voyager 1 fue lanzada dieciséis días después. La Voyager 1 viajaba en una trayectoria más rápida y directa hacia Júpiter y Saturno, por lo que alcanzaría estos planetas antes. Ambas naves fueron impulsadas por cohetes Titan IIIE-Centaur, que las aceleraron a altas velocidades para escapar de la gravedad de la Tierra.',
      'El diseño de las naves Voyager es una maravilla de la ingeniería. No tenían los microchips modernos que usamos hoy. El procesador de tu teléfono celular es millones de veces más potente que las computadoras a bordo de estas sondas. Sin embargo, su diseño era tan robusto que han sobrevivido más de cuatro décadas en el vacío del espacio. Tienen antenas grandes para comunicarse y cámaras que nos dieron vistas detalladas de los mundos exteriores.',
      'El viaje comenzó con gran expectación. Los ingenieros del Laboratorio de Propulsión a Chorro trabajaron para asegurar que todo funcionara. Cada comando enviado a la nave tardaba minutos en llegar, y ese retraso aumentaría a medida que las naves se alejaran. Esto significaba que las naves tenían que ser lo suficientemente autónomas para cuidar de sí mismas en emergencias. Fue un concepto revolucionario para la exploración espacial.',
      'El lanzamiento en sí fue un espectáculo de poder. A medida que las sondas ascendían a través de la atmósfera, llevaban instrumentos científicos avanzados y la curiosidad de la humanidad. Estaban a punto de embarcarse en una gran aventura, un viaje sin retorno hacia el cosmos para estudiar el sistema solar exterior.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El programa original del Gran Tour fue cancelado por ser muy caro, siendo reemplazado por la misión "Mariner Jupiter-Saturn". Los ingenieros diseñaron en secreto las naves para que pudieran sobrevivir el viaje completo hasta Urano y Neptuno. Gracias a esa previsión, logramos visitar los cuatro gigantes gaseosos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para escapar de la gravedad terrestre, el cohete Titán-Centaur les dio a las Voyager una velocidad de escape de 14 kilómetros por segundo. A esa velocidad, podrías viajar de Nueva York a Los Ángeles en menos de cinco minutos.' }
    ],
    fact: 'Las Voyager utilizan computadoras con apenas 69 kilobytes de memoria. Aún con esa memoria limitada, las naves son capaces de ejecutar maniobras complejas, recopilar datos valiosos y transmitirlos a la Tierra a miles de millones de kilómetros.',
  },
  {
    id: 'gran-tour-planetario',
    title: 'El Gran Tour',
    color: '#2979FF',
    btnImage: '/assets/interestelar/infographic_m6/btn_gran-tour-planetario.jpg',
    image: '/assets/interestelar/infographic_m6/hero_gran-tour-planetario.jpg',
    content: [
      'El Gran Tour Planetario utilizó una técnica llamada asistencia gravitatoria. En lugar de usar motores grandes para viajar, las sondas robaron un poco de la energía orbital de los planetas gigantes. Esto les dio un impulso extra, acelerando su velocidad hacia el siguiente destino.',
      'La Voyager 1 visitó Júpiter en 1979 y Saturno en 1980. Descubrió volcanes activos en la luna Ío y anillos delgados alrededor de Júpiter. En Saturno, se acercó a la luna Titán, un mundo envuelto en nubes de smog donde llueven hidrocarburos líquidos. Esta trayectoria desvió a la nave fuera del plano del sistema solar, impidiendo que visitara Urano y Neptuno.',
      'La Voyager 2 continuó el Gran Tour. Pasó por Júpiter y Saturno, y luego se dirigió hacia Urano en 1986. Allí descubrió diez nuevas lunas, dos anillos y un campo magnético inclinado. Fue la primera vez que una nave humana visitó este gigante de hielo, revelando un sistema complejo y dinámico.',
      'En 1989, la Voyager 2 llegó a Neptuno. Descubrió la Gran Mancha Oscura, una tormenta gigante, y géiseres de nitrógeno líquido en la luna Tritón. Después de Neptuno, la Voyager 2 fue lanzada en una trayectoria hacia el espacio interestelar. Hasta hoy, ninguna otra nave espacial ha vuelto a visitar Urano o Neptuno.',
      'Las imágenes enviadas durante este Gran Tour cambiaron nuestra comprensión de los planetas exteriores. Antes de las Voyager, se veían como esferas simples. Las sondas nos revelaron planetas complejos con sistemas de anillos y lunas diversas. Esta hazaña se logró gracias a la coreografía orbital calculada por matemáticos usando computadoras de los años 70.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La asistencia gravitatoria en Júpiter le dio a las Voyager un aumento de velocidad de más de 35,000 kilómetros por hora. Al robar esta energía orbital a Júpiter, el planeta se ralentizó en su órbita por una cantidad minúscula e imperceptible.' },
      { label: 'En la Misión', icon: 'zap', text: 'Durante el encuentro de la Voyager 2 con Neptuno, la luz del sol era muy débil, lo que exigía exposiciones largas para tomar fotos. Para evitar que las imágenes salieran borrosas debido a la velocidad, los ingenieros programaron los propulsores para girar la nave espacial y compensar el movimiento.' }
    ],
    fact: 'Gracias a las asistencias gravitatorias, las naves Voyager redujeron el tiempo de viaje a Neptuno de 30 años a solo 12 años.',
  },
  {
    id: 'disco-de-oro',
    title: 'El Disco de Oro',
    color: '#FF8A65',
    btnImage: '/assets/interestelar/infographic_m6/btn_disco-de-oro.jpg',
    image: '/assets/interestelar/infographic_m6/hero_disco-de-oro.jpg',
    content: [
      '¿Qué mensaje enviarías a una civilización alienígena? Esa fue la pregunta que la NASA le hizo al astrónomo Carl Sagan antes del lanzamiento de las Voyager. Su solución fue crear el Disco de Oro: un disco fonográfico de cobre chapado en oro de 12 pulgadas. Contiene sonidos e imágenes seleccionados para retratar la diversidad de la vida y la cultura en la Tierra. Es un mensaje en una botella lanzado al océano cósmico.',
      'El disco contiene saludos hablados en 55 idiomas diferentes, desde antiguos lenguajes hasta idiomas modernos. Además de voces humanas, el disco incluye una "sinfonía de la Tierra" con sonidos de volcanes, lluvia, el canto de una ballena, un beso y el latido de un corazón. Estos sonidos muestran cómo es nuestro hogar.',
      'La sección musical del disco dura casi 90 minutos y abarca varias épocas históricas. Incluye piezas clásicas de Bach, Mozart y Beethoven, además de música tradicional de diferentes países y ritmos modernos como el de Chuck Berry. Carl Sagan quería incluir música de The Beatles, pero no se obtuvieron los derechos de autor para el espacio exterior.',
      'El Disco de Oro también contiene 115 imágenes codificadas de forma analógica. Estas imágenes muestran diagramas científicos, el ADN humano, paisajes, animales y personas realizando actividades cotidianas. Para evitar malentendidos, se excluyeron imágenes de guerra y violencia, mostrando una representación idealizada de la humanidad.',
      'En la cubierta exterior del disco protector, hay instrucciones grabadas con símbolos científicos para explicar cómo reproducir el disco. También incluye un mapa de la posición de nuestro sistema solar en relación a 14 púlsares, proporcionando una dirección cósmica para encontrar la Tierra. Además, lleva un trozo de uranio-238, cuya radiactividad permitirá calcular cuánto tiempo ha pasado desde el lanzamiento.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La grabación incluyó las ondas cerebrales de Ann Druyan, quien trabajaba en el proyecto y se había comprometido con Carl Sagan pocos días antes. De esta manera, el sonido del amor humano viaja actualmente hacia las estrellas.' },
      { label: 'En la Cultura Pop', icon: 'zap', text: 'En una broma de Saturday Night Live en 1978, Steve Martin anunció que los alienígenas habían respondido al Disco de Oro. El supuesto mensaje extraterrestre decía: "Envíen más Chuck Berry".' }
    ],
    fact: 'El disco está fabricado con protección de aluminio y se espera que dure mil millones de años en el vacío del espacio sin degradarse significativamente. El Disco de Oro podría sobrevivir a la especie humana.',
  },
  {
    id: 'heliopausa-cruce',
    title: 'Cruzando la Heliopausa',
    color: '#00E676',
    btnImage: '/assets/interestelar/infographic_m6/btn_heliopausa-cruce.jpg',
    image: '/assets/interestelar/infographic_m6/hero_heliopausa-cruce.jpg',
    content: [
      'Nuestro Sol produce un viento continuo de partículas calientes que infla una burbuja protectora llamada heliosfera. Esta heliosfera nos protege contra los rayos cósmicos que provienen del espacio profundo. El borde donde este viento solar choca con el plasma del medio interestelar se llama heliopausa.',
      'Nadie sabía a qué distancia se encontraba la heliopausa, porque ninguna nave humana había llegado tan lejos. El 25 de agosto de 2012, la sonda Voyager 1 hizo historia. Estaba a 121.6 Unidades Astronómicas de distancia. De repente, los científicos notaron un cambio radical en el entorno magnético.',
      'Los instrumentos de la Voyager 1 mostraron que las partículas solares disminuyeron drásticamente. Al mismo tiempo, los rayos cósmicos galácticos aumentaron. La prueba concluyente llegó cuando el instrumento de ondas de plasma captó el sonido del gas circundante. La vibración indicaba que el plasma era más denso, la firma del medio interestelar.',
      'La Voyager 2 viajó en una dirección diferente y cruzó la heliopausa el 5 de noviembre de 2018, a 119 Unidades Astronómicas. A diferencia de su hermana, la Voyager 2 todavía tenía su instrumento de plasma funcional. Esto permitió a los científicos observar cómo el viento solar interactúa y se mezcla con el plasma interestelar.',
      'Cruzar la heliopausa sigue siendo un hito histórico para la humanidad. Estas naves construidas en los años 70 lograron romper la burbuja magnética del Sol y entrar en la galaxia Vía Láctea. Nos enseñaron que la heliopausa es una frontera compleja, cambiante y turbulenta.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La heliosfera tiene forma de cometa. Mientras el sistema solar viaja a través de la galaxia a 720,000 kilómetros por hora, la heliosfera choca contra el medio interestelar, creando una curva por delante y dejando una cola magnética por detrás.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Aunque las naves Voyager han cruzado la heliopausa, todavía no han salido del sistema solar. Los astrónomos definen el límite real del sistema solar como el borde exterior de la Nube de Oort. Las Voyager tardarán unos 30,000 años más en alcanzar y cruzar ese límite.' }
    ],
    fact: 'El instrumento de ondas de plasma de la Voyager funciona escuchando fluctuaciones electromagnéticas. Cuando estas frecuencias se traducen a sonido, el cruce de la heliopausa suena como un zumbido cósmico agudo.',
  },
  {
    id: 'espacio-interestelar',
    title: 'En el Espacio Interestelar',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m6/btn_espacio-interestelar.jpg',
    image: '/assets/interestelar/infographic_m6/hero_espacio-interestelar.jpg',
    content: [
      '¿Qué están encontrando las sondas Voyager 1 y 2 en el espacio interestelar? A menudo pensamos en el espacio profundo como un vacío absoluto. Sin embargo, la realidad es diferente: el espacio entre las estrellas es un lugar dinámico, lleno de materia invisible que forma las nubes de las que nacen nuevas estrellas y planetas.',
      'Lo primero que notaron las sondas fue que el plasma interestelar es más denso que el viento solar dentro de nuestra heliosfera. Es como soplar aire dentro de una piscina de agua: la burbuja de aire es menos densa que el agua. El medio interestelar está comprimiendo la heliosfera de nuestro Sol desde el exterior con mayor presión.',
      'Las naves también experimentaron un aumento en el bombardeo de rayos cósmicos galácticos. Estas partículas subatómicas viajan a velocidades cercanas a la de la luz y son creadas por supernovas en otras partes de la Vía Láctea. Sin el escudo del viento solar, el espacio interestelar es un entorno de radiación hostil para la vida biológica.',
      'Otra revelación es cómo se comporta el campo magnético en el espacio interestelar. Los científicos esperaban que, al cruzar la heliopausa, las naves detectarían un cambio en la dirección de las líneas del campo magnético galáctico. Sorprendentemente, no fue así. Las líneas magnéticas del medio interestelar parecen alineadas en paralelo con el campo magnético de nuestro Sol.',
      'A medida que las Voyager se adentran en la galaxia, están viajando a través de la Nube Interestelar Local, una masa de polvo y gas de 30 años luz de ancho. Cada dato que estas naves envían a la Tierra es una ventana inestimable a la galaxia en la que vivimos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La señal de radio de las Voyager, transmitida con la energía equivalente a una pequeña bombilla de 22 vatios, tarda casi 23 horas viajando a la velocidad de la luz para llegar a las antenas de la Red del Espacio Profundo en la Tierra.' },
      { label: 'En la Misión', icon: 'zap', text: 'Para captar las débiles señales de las naves Voyager, la NASA usa antenas colosales de 70 metros de diámetro. Deben enfriar los componentes electrónicos a temperaturas cercanas al cero absoluto para reducir el ruido térmico.' }
    ],
    fact: 'El medio interestelar donde se encuentran las sondas Voyager no está oscuro. Está lleno del brillo ultravioleta emitido por estrellas jóvenes cercanas en nuestra galaxia Vía Láctea.',
  },
  {
    id: 'energia-plutonio',
    title: 'Energía de Plutonio',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m6/btn_energia-plutonio.jpg',
    image: '/assets/interestelar/infographic_m6/hero_energia-plutonio.jpg',
    content: [
      '¿Cómo es posible que una nave espacial de los años 70 siga funcionando hoy en el espacio profundo? No pueden usar paneles solares porque están tan lejos que el Sol se ve solo como un punto minúsculo; no proporciona suficiente luz para generar electricidad. La respuesta es la energía nuclear. Las naves Voyager están impulsadas por tres Generadores Termoeléctricos de Radioisótopos (RTGs) que producen potencia eléctrica.',
      'Un RTG no es como un reactor nuclear. No hay engranajes que giren ni turbinas móviles. Contienen pastillas de dióxido de plutonio-238. A medida que este material radiactivo se descompone de forma natural, emite una cantidad constante de calor. Dispositivos especiales llamados termopares convierten este calor directamente en electricidad de corriente continua para la sonda.',
      'El plutonio-238 es un isótopo ideal para esta misión porque tiene una vida media de 87.7 años. Esto significa que cada nueve décadas, la cantidad de calor generado por la pastilla disminuye a la mitad. Por lo tanto, el generador RTG de las Voyager produce aproximadamente 4 vatios menos de potencia eléctrica cada año.',
      'Esta pérdida de energía eléctrica significa que el equipo de ingenieros de la NASA tiene que gestionar la energía de forma estricta. Tienen que decidir qué instrumentos apagar para ahorrar vatios. A lo largo de los años, han apagado sistemáticamente cámaras fotográficas, calentadores y muchos sensores para mantener las sondas vivas.',
      'A pesar de esta lenta pérdida de energía nuclear, la NASA predice que las naves tendrán energía eléctrica residual para que al menos un par de instrumentos puedan recopilar y transmitir datos científicos hasta la década de 2025 o, con suerte, hasta 2030.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La situación es tan crítica con la energía que los ingenieros de la NASA apagaron los calefactores de los instrumentos para ahorrar vatios. Algunos componentes han seguido funcionando bien incluso en el frío extremo del espacio interestelar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El plutonio-238 usado en estas misiones no es el isótopo utilizado para fabricar armas nucleares (Plutonio-239). El Pu-238 es valorado por la comunidad científica por emitir calor constante sin radiaciones penetrantes dañinas para los instrumentos.' }
    ],
    fact: 'El diseño de los generadores RTGs en las sondas Voyager no tiene ninguna pieza móvil. Por esta razón de ingeniería, estos aparatos jamás sufren del típico desgaste mecánico por fricción que destruiría un motor en menos de una década.',
  },
  {
    id: 'legado-humanidad',
    title: 'El Legado',
    color: '#80CBC4',
    btnImage: '/assets/interestelar/infographic_m6/btn_legado-humanidad.jpg',
    image: '/assets/interestelar/infographic_m6/hero_legado-humanidad.jpg',
    content: [
      'Las misiones Voyager 1 y 2 representan uno de los mayores logros tecnológicos y científicos de la historia humana. Han ampliado de forma espectacular nuestra perspectiva del vecindario estelar y han empujado el horizonte de la exploración espacial.',
      'Hoy en día, la Voyager 1 ostenta el honor de ser el objeto construido por humanos que se encuentra más lejos de la Tierra. A partir de cálculos precisos en 2024, viaja en el vacío a más de 160 Unidades Astronómicas de nuestro planeta azul.',
      'Incluso después de que sus baterías nucleares dejen de producir electricidad útil, las Voyager continuarán viajando silenciosamente por la Vía Láctea. Se convertirán de por vida en monumentos póstumos y testimonios pacíficos de nuestra existencia.',
      'Pasarán decenas de miles de años antes de que estas exploradoras se acerquen de nuevo a otra estrella o sistema planetario. La Voyager 1 pasará a unos 1.6 años luz de la estrella Gliese 445 en aproximadamente 40,000 años.',
      'Si un día una civilización extraterrestre avanzada encuentra y logra decodificar el legendario Disco de Oro, sabrán que en un pequeño punto azul existió una joven civilización de humanos curiosos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La famosa e icónica fotografía conocida como el "Punto Azul Pálido" fue tomada por la Voyager 1 a sugerencia directa del astrónomo Carl Sagan.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las naves Voyager nunca, bajo ninguna circunstancia, regresarán a la Tierra. Continuarán su viaje a través del cosmos de forma permanente.' }
    ],
    fact: 'Las famosas sondas espaciales Voyager llevan un mensaje pacífico que afirma: "Este es un presente de un pequeño y distante mundo".',
  },
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
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.005 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      hue: Math.random() > 0.5 ? '255,213,79' : '41,121,255', // gold or blue
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.05;
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

// â”€â”€â”€ Voyager Space Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function VoyagerHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,213,79,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#voyagerGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFD54F','#2979FF','#FF8A65','#00E676','#B388FF','#FFD740','#80CBC4'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="16" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="4" fill="#FFD54F" opacity="0.5" />
        <path d="M290 30 L310 30 M300 20 L300 40" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <defs>
          <linearGradient id="voyagerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,213,79,0.2)" />
            <stop offset="50%" stopColor="rgba(255,213,79,0.9)" />
            <stop offset="100%" stopColor="rgba(255,213,79,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD54F" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">VOYAGER 1 Y 2</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,213,79,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EXPLORADORES DEL VACÍO INTERESTELAR</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.2)'}`,
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
          layoutId="activeDotInterestelarM6"
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
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 800, color: node.color, display:'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Explora Más
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${node.color}15, transparent)`,
          border: `1px solid ${node.color}40`,
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', top: '-15px', left: '1.5rem',
            background: '#0B0E2D', padding: '0 10px',
            color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px',
          }}>
            <Sparkles size={16} /> DATO CIENTÍFICO
          </div>
          <p style={{
            margin: 0, fontSize: '1.05rem', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.95)', fontStyle: 'italic',
            textAlign: 'center',
          }}>
            "{node.fact}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM6() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      setExploredNodes(prev => new Set(prev).add(id));
    }
  };

  const progress = Math.round((exploredNodes.size / INFOGRAPHIC_NODES.length) * 100);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      background: '#050714',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#E2E8F0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <VoyagerHeader />

      {/* ProgressBar tracking explored nodes */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', background: '#FFD54F' }}
          />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFD54F' }}>
          {progress}% EXPLORADO
        </span>
      </div>

      {/* Nodes Map */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 2,
        padding: '1rem 0',
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
        {activeNode && (
          <ContentPanel
            key={activeNode}
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      {/* Bibliography */}
      <div style={{
        marginTop: '4rem',
        padding: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        zIndex: 2,
      }}>
        <h5 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Referencias Científicas
        </h5>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
          {BIBLIOGRAPHY.map((bib, i) => (
            <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#FFD54F' }}>•</span> {bib}
            </li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Vista Detallada"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
