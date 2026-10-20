'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Machine themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} ${30 + 19 * Math.cos(rad)} ${30 + 19 * Math.sin(rad)})`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Concentric spiraling rings */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
      {/* Distortion streaks */}
      <path d="M30 6 Q35 15 30 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M54 30 Q45 35 42 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 54 Q25 45 30 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M6 30 Q15 25 18 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFluxCapacitor({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Y-shape */}
      <path d="M30 30 L15 15 M30 30 L45 15 M30 30 L30 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Glowing centers */}
      <circle cx="30" cy="30" r="3" fill={color} />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="45" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="48" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoClockFace({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

const DECO_MAP = {
  'metodo-cientifico': [DecoGear, DecoClockFace, DecoTimeline],
  'electricidad': [DecoBolt, DecoAtomSvg, DecoGear],
  'guerra-corrientes': [DecoGear, DecoTimeline, DecoBolt],
  'semiconductores': [DecoAtomSvg, DecoBolt, DecoClockFace],
  'biotecnologia': [DecoWormhole, DecoAtomSvg, DecoTimeline],
  'espacio-futuro': [DecoTimeline, DecoClockFace, DecoWormhole],
  'sostenibilidad': [DecoGear, DecoAtomSvg, DecoFluxCapacitor],
}; const BIBLIOGRAPHY = ['Doudna, J.A. & Sternberg, S.H. (2017). A Crack in Creation: Gene Editing and the Power to Control Evolution, Houghton Mifflin',
  'Tesla, N. (1905). "The Transmission of Electrical Energy Without Wires", Electrical World and Engineer',
  'Isaacson, W. (2011). Steve Jobs, Simon & Schuster',
  'Musk, E. & SpaceX Team (2017). "Making Humans a Multi-Planetary Species", New Space, 5(2)',
  'Shockley, W. (1950). Electrons and Holes in Semiconductors, Van Nostrand',
  'IPCC (2021). Climate Change 2021: The Physical Science Basis, Cambridge University Press'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "metodo-cientifico",
    diagramImage: '/assets/bttf/infographic_m7/diagram_metodo-cientifico.webp',
    diagramCaption: 'El método científico: el motor del progreso y del pensamiento crítico',
    "title": "El Método Científico",
    "color": "#6EC6FF",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_metodo.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_metodo.webp",
    "content": [
      "En la cinematografía de Hollywood, los descubrimientos científicos trascendentales suelen representarse como momentos mágicos de iluminación repentina: el doctor Emmett Brown resbala en el baño, se golpea la cabeza contra el inodoro y al despertar tiene la revelación instantánea del condensador de flujo dibujada en su mente. Esta divertida convención narrativa simplifica el proceso creador. En la ciencia real, sin embargo, el progreso no nace de accidentes cómicos, sino de la disciplina rigurosa del método científico.",
      "El método científico moderno, consolidado a partir del siglo XVII por figuras monumentales como Francis Bacon, Galileo Galilei y René Descartes, es un sistema estructurado de indagación empírica basado en la observación sistemática, la medición cuantitativa, la formulación de hipótesis contrastables, la experimentación rigurosa y la revisión continua por pares independientes de la comunidad internacional.",
      "La verdadera genialidad del Doc Brown no reside en su excentricidad visual ni en sus cabellos desordenados, sino en su adhesión apasionada a los principios experimentales. Cuando un experimento falla —como cuando el transformador eléctrico estalla en su garaje o el plutonio se agota en el aparcamiento—, el científico no se rinde ni recurre al pensamiento mágico: analiza minuciosamente los datos empíricos de los instrumentos, recalibra sus aparatos y rediseña sus modelos matemáticos.",
      "Uno de los pilares más cruciales del método científico es el principio de falsabilidad, establecido por el filósofo de la ciencia Karl Popper en el siglo XX. Una afirmación solo puede considerarse genuinamente científica si es susceptible de ser puesta a prueba mediante observaciones o experimentos que puedan demostrar potencialmente su falsedad. Si una teoría no puede ser contrastada o refutada mediante datos medibles en laboratorio, pertenece al campo de la creencia o la pseudociencia.",
      "La ciencia avanza cuestionando sin descanso los dogmas establecidos y reconociendo abiertamente los propios errores ante la evidencia factual. Para los jóvenes estudiantes y futuros investigadores, el espíritu del Doc Brown encarna la mayor virtud del quehacer científico: la curiosidad insaciable, el coraje para formular preguntas audaces sobre el cosmos y la humildad para someter cada hipótesis al juicio inapelable de la naturaleza."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La célebre maqueta a escala de la plaza de Hill Valley construida por el Doc Brown en 1955 para planificar el salto temporal con el rayo es un ejemplo magnífico de modelado experimental. El Doc se disculpa cómicamente ante Marty diciendo: «Por favor, perdona que esté a escala tan burda y no esté pintada», demostrando su rigor artesanal obsesivo incluso ante maquetas caseras de cartón."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El filósofo Karl Popper publicó en 1934 su obra cumbre La lógica de la investigación científica, donde demostró que ninguna cantidad finita de observaciones empíricas positivas puede verificar definitivamente una teoría universal (como afirmar que «todos los cisnes son blancos»), pero una sola observación negativa genuina (un cisne negro) basta para refutarla de forma concluyente."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_metodo-cientifico.webp",
    "bannerCaption": "El método científico: el motor del progreso y del pensamiento crítico",
    "fact": "Galileo Galilei publicó en 1632 su Diálogo sobre los dos máximos sistemas del mundo, fundamentando el método experimental al medir sistemáticamente la caída libre de esferas de bronce en planos inclinados de madera pulida utilizando relojes de agua clepsidras para registrar el tiempo con una precisión de décimas de segundo, sentando las bases de la física moderna."
  },
  {
    "id": "electricidad",
    diagramImage: '/assets/bttf/infographic_m7/diagram_electricidad.webp',
    diagramCaption: 'La revolución eléctrica: de la vela al LED y la transmisión inalámbrica',
    "title": "Electricidad y Rayos",
    "color": "#FFD740",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_electricidad.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_electricidad.webp",
    "content": [
      "El clímax dramático de la primera película es una de las secuencias más electrizantes del cine contemporáneo: una colosal tormenta eléctrica azota Hill Valley a las 10:04 de la noche, y un rayo descomunal impacta la veleta de bronce de la torre del reloj transmitiendo 1,21 gigavatios de energía directa hacia el condensador de flujo a través de un cable conductor. La escena sintetiza de manera espectacular el asombro y la furia indómita que la electricidad atmosférica ha despertado en la humanidad desde tiempos inmemoriales.",
      "Un rayo no es un fenómeno mágico, sino una gigantesca descarga electrostática natural que ocurre en la atmósfera entre regiones con cargas eléctricas opuestas dentro de una nube de tormenta cumulonimbus o entre la base de la nube y el suelo terrestre. Durante una tormenta severa, las violentas corrientes térmicas ascendentes provocan continuas colisiones microscópicas entre cristales de hielo y granizo blando o graupel, separando las cargas eléctricas por efecto triboeléctrico.",
      "Las partículas de hielo más ligeras con carga positiva ascienden hacia la cima de la nube a más de doce kilómetros de altitud, mientras que el granizo más pesado y cargado negativamente se acumula en la base inferior. Cuando la diferencia de potencial eléctrico entre la base de la nube y la superficie de la Tierra supera la rigidez dieléctrica del aire seco (aproximadamente tres millones de voltios por metro lineal), el aire se ioniza violentamente transformándose en un canal conductor de plasma incandescente.",
      "La descarga de retorno principal asciende desde el suelo a través de este canal de plasma a velocidades asombrosas que superan los cien mil kilómetros por segundo (un tercio de la velocidad de la luz). La corriente eléctrica extrema calienta el aire circundante en fracciones de microsegundo hasta temperaturas astronómicas de casi treinta mil grados Celsius —cinco veces más caliente que la superficie visible del Sol—, provocando una expansión térmica explosiva del aire que genera la onda de choque acústica que llamamos trueno.",
      "Intentar canalizar la energía de un rayo real para alimentar un aparato tecnológico como hace el Doc Brown en la película es uno de los mayores retos de la ingeniería de alta tensión. La naturaleza caótica, la duración infinitesimal de pocos microsegundos y la intensidad de corriente brutal de hasta doscientos mil amperios de un rayo fundirían cualquier cable convencional de cobre no dimensionado adecuadamente, justificando el monumental desafío técnico afrontado en la ficción."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Durante la filmación de la secuencia de la torre del reloj, el actor Christopher Lloyd realizó personalmente la mayoría de las arriesgadas maniobras colgado de cables de seguridad en la cornisa del edificio de la plaza de Universal Studios. La intensa lluvia artificial, el viento forzado de hélices industriales y los relámpagos estroboscópicos convirtieron ese rodaje nocturno en uno de los más extenuantes de su carrera."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La rigidez dieléctrica del aire atmosférico representa el campo eléctrico límite que el gas puede soportar antes de romperse y volverse conductor. En condiciones estándar de presión y temperatura a nivel del mar, este umbral físico se sitúa en torno a 3 x 10 elevado a 6 voltios por metro; al superarse este valor crítico, los electrones se arrancan de las moléculas creando el canal de plasma."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_electricidad.webp",
    "bannerCaption": "La revolución eléctrica: de la vela al LED y la transmisión inalámbrica",
    "fact": "La red global de detección de rayos de satélites meteorológicos registra en promedio entre 40 y 50 impactos de rayos por segundo en todo el planeta Tierra, sumando más de 1.400 millones de descargas eléctricas atmosféricas anuales; el lago de Maracaibo en Venezuela ostenta el récord planetario con hasta 250 rayos por kilómetro cuadrado al año debido a sus singulares tormentas del Catatumbo."
  },
  {
    "id": "guerra-corrientes",
    diagramImage: '/assets/bttf/infographic_m7/diagram_guerra-corrientes.webp',
    diagramCaption: 'La guerra de las corrientes: Tesla vs Edison y la batalla del AC vs DC',
    "title": "La Guerra de Corrientes",
    "color": "#FF8A80",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_corrientes.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_corrientes.webp",
    "content": [
      "En el laboratorio del Doc Brown coexisten cables de alta tensión, bobinas electromagnéticas, transformadores zumbantes e interruptores industriales con aisladores cerámicos que parecen salidos de la época dorada de la electrificación urbana. La estética del taller del científico rinde homenaje indirecto a uno de los episodios más apasionantes y encarnizados de la historia de la ciencia y la tecnología moderna: la legendaria Guerra de las Corrientes librada a finales del siglo XIX.",
      "A finales de la década de 1880, Estados Unidos y Europa se encontraban en plena transición hacia la electrificación masiva de sus metrópolis industriales. Thomas Alva Edison defendía con uñas y dientes el monopolio comercial de la corriente continua (CC), donde el flujo de electrones viaja en una sola dirección constante a voltajes relativamente bajos. Edison había desplegado las primeras centrales eléctricas urbanas con dinamos de vapor, pero se enfrentaba a una limitación física insalvable: no podía transportar la electricidad a más de dos kilómetros sin pérdidas energéticas gigantescas.",
      "En la otra acera se alzaban el genial inventor serbio Nikola Tesla y el acaudalado empresario e ingeniero George Westinghouse, defensores pioneros de la corriente alterna (CA). En la corriente alterna, la dirección del flujo de electrones oscila periódicamente hacia adelante y hacia atrás muchas veces por segundo (habitualmente a cincuenta o sesenta hercios). La ventaja física decisiva de la corriente alterna residía en la invención del transformador eléctrico basado en la ley de inducción de Faraday.",
      "Mediante transformadores de bobinas acopladas, la corriente alterna podía elevarse fácilmente a decenas de miles de voltios en la central generadora para ser transportada a través de cientos de kilómetros de tendidos eléctricos con mínimas pérdidas de energía por efecto Joule (P = I² · R). Al llegar a las ciudades o fábricas, otros transformadores reductores bajaban el voltaje a niveles seguros de 110 o 220 voltios para el consumo doméstico y el alumbrado público general.",
      "La superioridad de la corriente alterna quedó consagrada definitivamente en 1893 cuando Westinghouse y Tesla iluminaron la Exposición Universal de Chicago con decenas de miles de bombillas de corriente alterna y construyeron en 1895 la primera gran central hidroeléctrica del mundo en las cataratas del Niágara, sentando la infraestructura tecnológica sobre la que descansa la red eléctrica global que hoy alimenta nuestros hogares, fábricas y ordenadores."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La fascinación del Doc Brown por los pioneros de la electricidad se manifiesta en la decoración de su laboratorio de 1955: en la pared cuelgan retratos solemnes de cuatro gigantes de la ciencia que inspiraron su vocación experimental: Isaac Newton, Benjamin Franklin, Thomas Edison y Albert Einstein, reflejando su devoción por los genios de la física teórica y aplicada."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El efecto Joule, descubierto por el físico británico James Prescott Joule en 1841, establece que el calor generado por una corriente eléctrica en un conductor es proporcional al cuadrado de la intensidad de corriente multiplicado por la resistencia y el tiempo. Al elevar el voltaje diez veces mediante transformadores, la corriente se reduce diez veces y las pérdidas térmicas disminuyen cien veces."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_guerra-corrientes.webp",
    "bannerCaption": "La guerra de las corrientes: Tesla vs Edison y la batalla del AC vs DC",
    "fact": "La histórica central hidroeléctrica de Edward Dean Adams en las cataratas del Niágara, inaugurada formalmente en agosto de 1895 con gigantescos alternadores bifásicos de 5.000 caballos de fuerza diseñados por Nikola Tesla y construidos por Westinghouse, transmitió por primera vez electricidad en alta tensión a la ciudad de Búfalo a más de 32 kilómetros de distancia en noviembre de 1896."
  },
  {
    "id": "semiconductores",
    diagramImage: '/assets/bttf/infographic_m7/diagram_semiconductores.webp',
    diagramCaption: 'La era de los semiconductores: del transistor al nanochip moderno',
    "title": "Revolución Digital",
    "color": "#B388FF",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_semiconductores.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_semiconductores.webp",
    "content": [
      "Cuando Marty McFly viaja a 1955, se encuentra con un mundo analógico dominado por radios de válvulas incandescentes, discos de vinilo de 78 revoluciones y enormes cajas registradoras de engranajes mecánicos. El Doc Brown de 1955 contempla con incredulidad el reproductor portátil de casetes de Marty y sus zapatillas deportivas modernas. Este contraste temporal refleja el impacto descomunal de la mayor transformación tecnológica de la historia humana reciente: la revolución digital basada en los semiconductores.",
      "En la década de 1950, los ordenadores electrónicos como el ENIAC ocupaban salas enteras de cientos de metros cuadrados, consumían cientos de kilovatios de electricidad y utilizaban más de dieciocho mil válvulas de vacío o tubos termoiónicos que se fundían continuamente tras pocas horas de uso. El punto de inflexión definitivo ocurrió en los Laboratorios Bell en diciembre de 1947, cuando John Bardeen, Walter Brattain y William Shockley crearon el primer transistor de contacto de germanio del mundo.",
      "Un semiconductor, como el silicio cristalino ultrapuro, es un material cuya conductividad eléctrica se sitúa entre la de un metal conductor y la de un aislante de vidrio. Mediante un proceso químico denominado «dopaje», consistente en introducir cantidades diminutas de impurezas de fósforo o boro en la red cristalina, los ingenieros pueden controlar el flujo de electrones con absoluta precisión, permitiendo que el transistor funcione como un diminuto interruptor electrónico binario sin piezas móviles.",
      "En 1958, Jack Kilby en Texas Instruments y Robert Noyce en Fairchild Semiconductor dieron el salto decisivo al integrar múltiples transistores, resistencias y condensadores sobre una única oblea plana de silicio, naciendo el primer circuito integrado o microchip. En 1965, Gordon Moore formuló su célebre observación empírica: el número de transistores integrados en un microprocesador se duplicaría aproximadamente cada dos años, reduciendo su coste y disparando su velocidad de cálculo.",
      "Hoy en día, un teléfono inteligente de bolsillo que cualquier estudiante lleva en su mochila contiene miles de millones de transistores microscópicos en un chip más pequeño que una uña, poseyendo una potencia de procesamiento miles de veces superior a todos los ordenadores combinados que utilizaron la NASA y el programa Apolo para llevar a los astronautas a la Luna en 1969, materializando un futuro digital que ni el propio Doc Brown sospechaba."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Regreso al Futuro Parte III, ambientada en 1885, el circuito de control del tiempo del DeLorean se avería por un microchip quemado. El Doc Brown de 1885 debe fabricar un módulo de reemplazo artesanal utilizando válvulas de vacío termoiónicas de vidrio soplado montadas sobre el capó del coche en una enorme caja de madera con correas de cuero para sustituir al diminuto chip de 1985."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los transistores modernos de silicio han alcanzado la escala nanométrica mediante litografía ultravioleta extrema (EUV). Con nodos de fabricación avanzados de 3 nanómetros, la puerta lógica de un transistor mide apenas unos 15 átomos de silicio de ancho, aproximándose a los límites cuánticos donde el efecto túnel cuántico comienza a dificultar el bloqueo del paso de electrones."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_semiconductores.webp",
    "bannerCaption": "La era de los semiconductores: del transistor al nanochip moderno",
    "fact": "El microprocesador Apple M3 Max lanzado a finales de 2023 contiene más de 92.000 millones de transistores en un único chip de silicio de poco más de 400 milímetros cuadrados fabricado mediante fotolitografía de 3 nanómetros por TSMC, capaz de ejecutar más de 35 billones de operaciones matemáticas por segundo con un consumo de solo unas pocas decenas de vatios de potencia."
  },
  {
    "id": "biotecnologia",
    diagramImage: '/assets/bttf/infographic_m7/diagram_biotecnologia.webp',
    diagramCaption: 'Biotecnología del futuro: edición genética, órganos artificiales y medicina personalizada',
    "title": "CRISPR y Biotecnología",
    "color": "#00E5FF",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_biotec.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_biotec.webp",
    "content": [
      "En la visión del año 2015 de Regreso al Futuro Parte II, el doctor Emmett Brown visita una clínica médica de rejuvenecimiento estético en el futuro para cambiarse la sangre por completo, sustituir su bazo y aplicarse un tratamiento facial celular que promete sumarle treinta o cuarenta años de vida saludable. Aunque en 1989 el guion abordaba la medicina del porvenir como una parodia humorística, la biomedicina contemporánea del siglo XXI está convirtiendo la regeneración biológica en una realidad palpable gracias a la ingeniería genética.",
      "Durante milenios, la humanidad modificó indirectamente el genoma de plantas y animales mediante la selección artificial y el cruzamiento selectivo empírico de especies agrícolas. El descubrimiento trascendental de la estructura en doble hélice del ADN por Rosalind Franklin, James Watson y Francis Crick en 1953 reveló que las instrucciones fundamentales de todos los seres vivos sobre la Tierra están escritas en un lenguaje químico universal compuesto por cuatro bases nitrogenadas: adenina, timina, citosina y guanina.",
      "La auténtica revolución de precisión molecular estalló en 2012 con el desarrollo de la tecnología de edición genética CRISPR-Cas9 por parte de las investigadoras Emmanuelle Charpentier y Jennifer Doudna, galardonadas con el Premio Nobel de Química en 2020. Basándose en un sistema inmunitario bacteriano natural descubierto originalmente por el microbiólogo español Francis Mojica, CRISPR funciona como una tijera molecular guiada por ARN capaz de cortar, corregir o insertar genes con exactitud quirúrgica.",
      "Las aplicaciones de esta revolución biotecnológica son colosales y transformadoras. En la medicina clínica actual, las terapias génicas basadas en CRISPR y células CAR-T están curando enfermedades hereditarias hasta ahora mortales como la anemia de células falciformes o la beta-talasemia, reprogramando las propias células madre de los pacientes para corregir mutaciones genéticas congénitas directamente en su código biológico fundamental.",
      "Paralelamente, los campos de la biología sintética y la medicina regenerativa con células madre pluripotentes inducidas (iPSC) exploran la regeneración de tejidos dañados y el rejuvenecimiento celular mediante factores epigenéticos de Yamanaka. Este horizonte científico plantea a su vez dilemas éticos y bioéticos profundos sobre los límites de la edición en la línea germinal humana, recordándonos que el poder de editar el código de la vida debe guiarse por la prudencia y el bienestar universal."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando el Doc Brown se arranca una máscara de látex transparente de su rostro en la plaza de 2015 para mostrarse visiblemente rejuvenecido ante Marty, explica que pasó dos semanas enteras internado en una clínica estética especializada del futuro para someterse a una renovación completa de colon, bazo y sustitución sanguínea para vivir sano durante el próximo siglo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El microbiólogo español Francis Mojica descubrió en 1993 en las salinas de Santa Pola que las secuencias de ADN repetidas con espaciadores encontradas en arqueas haloófilas eran en realidad un registro inmunológico de memoria frente a virus bacteriófagos invasores, bautizando el fenómeno con el acrónimo CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats)."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_biotecnologia.webp",
    "bannerCaption": "Biotecnología del futuro: edición genética, órganos artificiales y medicina personalizada",
    "fact": "En diciembre de 2023, la Administración de Alimentos y Medicamentos de Estados Unidos (FDA) y la agencia reguladora del Reino Unido (MHRA) aprobaron formalmente Casgevy, el primer tratamiento médico del mundo basado en edición genética CRISPR-Cas9 para su uso clínico en pacientes humanos afectados por anemia de células falciformes severa."
  },
  {
    "id": "espacio-futuro",
    diagramImage: '/assets/bttf/infographic_m7/diagram_espacio-futuro.webp',
    diagramCaption: 'El espacio como frontera final: colonias, minería y naves generacionales',
    "title": "Exploración Espacial",
    "color": "#CE93D8",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_espacio.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_espacio.webp",
    "content": [
      "A lo largo de la trilogía de Regreso al Futuro, el cielo nocturno y las estrellas contempladas por el Doc Brown y Clara Clayton a través de su telescopio de latón evocan la eterna aspiración humana de explorar el cosmos. En la ficción, el DeLorean conquista las nubes de Hill Valley mediante propulsores atmosféricos flotantes; pero en la ciencia de vanguardia del siglo XXI, el verdadero desafío de la especie humana es abandonar la cuna terrestre para establecer asentamientos habitables permanentes en la Luna y en Marte.",
      "La conquista espacial moderna está viviendo un renacimiento extraordinario gracias a la combinación de agencias gubernamentales internacionales y el empuje de la industria aeroespacial privada. El desarrollo de cohetes pesados completamente reutilizables ha transformado la economía del transporte espacial, reduciendo el coste de poner un kilogramo de carga útil en órbita baja terrestre de diez mil dólares en la era de los transbordadores espaciales a menos de dos mil dólares en la actualidad.",
      "El programa Artemis de la NASA, en colaboración estrecha con la Agencia Espacial Europea (ESA), Japón y Canadá, planea el regreso sostenido de seres humanos a la superficie lunar en el polo sur de nuestro satélite natural. En esa región inhóspita existen cráteres de sombra eterna donde instrumentos orbitales han detectado millones de toneladas de hielo de agua atrapado en el regolito, un recurso vital que puede ser purificado para consumo humano o descompuesto en hidrógeno y oxígeno para fabricar combustible de cohetes.",
      "Al mismo tiempo, observatorios espaciales revolucionarios como el Telescopio Espacial James Webb (JWST), situado a un millón y medio de kilómetros de la Tierra en el punto de Lagrange L2, están escudriñando las primeras galaxias que se encendieron en el cosmos apenas unos cientos de millones de años después del Big Bang y analizando la composición química de las atmósferas de planetas extrasolares en busca de biomarcadores de vida extraterrestre.",
      "La exploración del espacio profundo obliga a resolver formidables desafíos biológicos y de ingeniería: la radiación cósmica galáctica de iones pesados, los efectos destructivos de la microgravedad prolongada sobre la masa ósea humana y la necesidad de desarrollar reactores nucleares compactos de fisión espacial para alimentar bases extraterrestres durante la gélida y prolongada noche lunar de catorce días terrestres consecutivos."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La pasión astronómica une a Clara Clayton y a Emmett Brown en Regreso al Futuro Parte III: en su primera cita romántica nocturna en Hill Valley de 1885, ambos contemplan el firmamento con un telescopio refractor y conversan entusiasmados sobre las novelas de Jules Verne De la Tierra a la Luna y Alrededor de la Luna, soñando con el día en que la humanidad viaje a las estrellas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El punto de Lagrange L2 del sistema Tierra-Sol es una posición orbital de equilibrio gravitatorio dinámico donde la atracción combinada del Sol y de la Tierra proporciona la fuerza centrípeta exacta necesaria para que un satélite artificial orbite el Sol al unísono con nuestro planeta, manteniendo un escudo térmico solar siempre alineado de espaldas a los detectores infrarrojos."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_espacio-futuro.webp",
    "bannerCaption": "El espacio como frontera final: colonias, minería y naves generacionales",
    "fact": "El espejo primario del Telescopio Espacial James Webb (JWST) está compuesto por 18 segmentos hexagonales de berilio ultraligero recubiertos por una capa molecular de oro puro de apenas 100 nanómetros de espesor (utilizando solo 48 gramos de oro en total), optimizada para reflejar la radiación infrarroja térmica del universo profundo con una reflectividad superior al 98%."
  },
  {
    "id": "sostenibilidad",
    diagramImage: '/assets/bttf/infographic_m7/diagram_sostenibilidad.webp',
    diagramCaption: 'Tecnología para la sostenibilidad: energía limpia, captura de carbono y ciudades verdes',
    "title": "Futuro Sostenible",
    "color": "#66BB6A",
    "btnImage": "/assets/bttf/infographic_biotecnologia/btn_sostenible.webp",
    "image": "/assets/bttf/infographic_biotecnologia/hero_sostenible.webp",
    "content": [
      "En una de las escenas más visionarias y divertidas de Regreso al Futuro, el Doc Brown regresa del año 2015 a toda prisa, abre el cubo de basura de los McFly y arroja restos de cáscaras de plátano, posos de café y una lata de cerveza vacía en el interior de un reactor cilíndrico montado en el capó trasero del DeLorean llamado «Mr. Fusion Home Energy Reactor». La película anticipó con brillantez cómica uno de los grandes imperativos éticos y científicos de nuestro siglo: la transición hacia una economía circular y una energía limpia.",
      "En el mundo real actual, el modelo energético global basado en la combustión incesante de carbón, petróleo y gas fósil ha liberado más de un billón y medio de toneladas métricas de dióxido de carbono a la atmósfera terrestre desde el comienzo de la Revolución Industrial. Este incremento acelerado de los gases de efecto invernadero atrapa la radiación infrarroja térmica saliente, provocando el calentamiento global, el deshielo de glaciares polares y la alteración de los patrones climáticos planetarios.",
      "Frente a este colosal desafío civilizatorio, la ciencia y la tecnología están protagonizando una revolución energética sin precedentes históricos. La generación eléctrica mediante paneles solares fotovoltaicos basados en silicio y aerogeneradores eólicos marinos ha experimentado una reducción de costes superior al 85% en la última década, convirtiéndose en la fuente de energía eléctrica nueva más barata y abundante en la inmensa mayoría de las naciones del globo terráqueo.",
      "Paralelamente, la investigación en biocombustibles avanzados, digestores anaeróbicos de residuos orgánicos municipales para producir biometano y el desarrollo de tecnologías de captura directa de carbono del aire (DAC) representan pasos concretos hacia la economía circular que Mr. Fusion caricaturizaba con tanta simpatía. Convertir los desechos de nuestra sociedad en recursos energéticos útiles es la clave de la bioeconomía moderna.",
      "El gran reto del siglo XXI consiste en integrar estas tecnologías sostenibles en redes eléctricas inteligentes de alta eficiencia apoyadas por almacenamiento químico en baterías de iones de litio y sodio, y el desarrollo futuro de la fusión nuclear comercial limpia en proyectos internacionales como ITER. Como nos enseñó el Doc Brown, el futuro de la Tierra no está condenado de antemano: está enteramente en nuestras manos construir un mañana limpio, próspero y en armonía con la naturaleza."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El prop de atrezo del generador Mr. Fusion instalado en el maletero del DeLorean fue fabricado por el equipo artístico reutilizando un molinillo de café doméstico de la marca alemana Krups (modelo Coffina 223) montado sobre una base plástica automotriz, demostrando cómo los diseñadores de cine transforman objetos cotidianos en iconos de tecnología futurista sostenible."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El proyecto internacional ITER (International Thermonuclear Experimental Reactor), en construcción en Cadarache, Francia, mediante la colaboración de 35 países, albergará el reactor de fusión por confinamiento magnético de tipo tokamak más colosal del mundo, diseñado para confinar un plasma a 150 millones de grados Celsius y producir 500 megavatios de energía térmica a partir de 50 MW suministrados."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m7/banner_sostenibilidad.webp",
    "bannerCaption": "Tecnología para la sostenibilidad: energía limpia, captura de carbono y ciudades verdes",
    "fact": "La concentración de dióxido de carbono (CO2) en la atmósfera terrestre superó las 424 partes por millón (ppm) en mayo de 2023 según los registros del Observatorio de Mauna Loa en Hawái, el nivel más elevado registrado en los últimos 3 millones de años geológicos de la historia de la Tierra, frente a los 280 ppm de la época preindustrial previa a 1750."
  }
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
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '0, 229, 255' : '255, 167, 38',
      gearSize: Math.random() * 3 + 1,
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
        // Gear-like particle
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3 + t * p.speed;
          const outerR = p.r * p.gearSize;
          ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
          ctx.lineTo(p.x + Math.cos(a + 0.3) * p.r, p.y + Math.sin(a + 0.3) * p.r);
        }
        ctx.closePath();
        
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Time Machine Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6EC6FF','#FFD740','#FF8A80','#B388FF','#00E5FF','#CE93D8','#66BB6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central gear icon */}
        <path d="M300 22 l1 2 a10 10 0 0 1 2 1 l2 -1 l2 2 l-1 2 a10 10 0 0 1 1 2 l2 1 l-2 2 l-1 2 a10 10 0 0 1 -2 1 l-2 1 l-2 -2 l-1 -2 a10 10 0 0 1 -1 -2 l-2 -1 l2 -2 z" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="10" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#00E5FF" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">BIOTECNOLOGÍA DEL FUTURO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA QUE TRANSFORMARÁ EL MAÑANA</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotBttfM7"
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
            background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none'
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
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}
              {/* Banner image */}
              {node.bannerImage && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={node.bannerImage}
                    alt={node.bannerCaption || node.title}
                    className="w-full object-cover"
                    style={{ maxHeight: '220px' }}
                  />
                  {node.bannerCaption && (
                    <p className="text-xs text-center text-white/50 py-1 px-2 bg-black/20">
                      {node.bannerCaption}
                    </p>
                  )}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

                </div>
              )}

        {/* â”€â”€â”€ Fact Box â”€â”€â”€ */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #00E5FF, #FF6B35)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM7() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/bttf/infographic_biotecnologia/bg_biotecnologia.png) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(0,229,255,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,229,255,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        {!activeNode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}
          >
            Toca cada círculo para explorar
          </motion.p>
        )}

                {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.75rem 2rem',
          margin: '0 auto 2.5rem',
          maxWidth: '1150px',
          padding: '1.5rem 1rem',
          background: 'rgba(15, 23, 42, 0.45)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Content Area */}
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

        {/* Completion Message */}
        <AnimatePresence>
          {allCompleted && !activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem', padding: '2rem',
                background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,107,53,0.1))',
                borderRadius: '16px', border: '1px solid rgba(0,229,255,0.2)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#00E5FF', margin: '0 0 1rem', fontSize: '1.5rem' }}>
                ðŸ† ¡Has completado la Misión Científica!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado los increíbles avances científicos que transformarán nuestro futuro. ¿Estás listo para poner a prueba tus conocimientos?
              </p>
              <button style={{
                padding: '0.8rem 2rem', background: '#00E5FF', color: '#0B0E2D',
                border: 'none', borderRadius: '30px', fontWeight: 'bold',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 15px rgba(0,229,255,0.4)'
              }}>
                Ir al Quiz Final <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h5 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#00E5FF', opacity: 0.5 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
