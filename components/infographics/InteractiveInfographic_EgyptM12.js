'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoObelisk({ size = 70, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size * 0.35} height={size} viewBox="0 0 24 70" style={{ opacity: 0.22, ...style }}>
      <polygon points="12,2 16,8 15,58 9,58 8,8" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <polygon points="10,4 14,4 16,8 8,8" fill={color} opacity="0.5" />
      <rect x="8" y="58" width="8" height="6" rx="1" fill={color} opacity="0.3" />
      <rect x="6" y="64" width="12" height="4" rx="1" fill={color} opacity="0.2" />
      <circle cx="12" cy="3" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoSunRays({ size = 80, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 30 + Math.cos(rad) * 14;
        const y1 = 30 + Math.sin(rad) * 14;
        const x2 = 30 + Math.cos(rad) * 26;
        const y2 = 30 + Math.sin(rad) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoGnomon({ size = 65, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 65 45" style={{ opacity: 0.2, ...style }}>
      <line x1="20" y1="40" x2="20" y2="8" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="6" r="3" fill={color} opacity="0.6" />
      <line x1="20" y1="40" x2="58" y2="35" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
      <ellipse cx="20" cy="42" rx="14" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoShadow({ size = 70, color = '#B8860B', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" style={{ opacity: 0.2, ...style }}>
      <polygon points="10,30 35,5 40,5 15,30" fill={color} opacity="0.3" />
      <line x1="35" y1="5" x2="35" y2="30" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="35" cy="4" r="3" fill={color} opacity="0.6" />
      <ellipse cx="12" cy="31" rx="8" ry="2" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoGlobe({ size = 65, color = '#1ABC9C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 65 65" style={{ opacity: 0.2, ...style }}>
      <circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <ellipse cx="32" cy="22" rx="20" ry="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <ellipse cx="32" cy="42" rx="20" ry="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="32" y1="6" x2="32" y2="58" stroke={color} strokeWidth="1" opacity="0.25" />
      <circle cx="32" cy="32" r="4" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoColumn({ size = 60, color = '#D4674A', style = {} }) {
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 24 60" style={{ opacity: 0.2, ...style }}>
      <rect x="6" y="8" width="12" height="42" rx="1" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      <rect x="4" y="4" width="16" height="5" rx="1" fill={color} opacity="0.35" />
      <rect x="4" y="50" width="16" height="5" rx="1" fill={color} opacity="0.35" />
      <polygon points="8,4 12,0 16,4" fill={color} opacity="0.5" />
      <circle cx="12" cy="2" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoClock({ size = 65, color = '#E67E22', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 65 65" style={{ opacity: 0.2, ...style }}>
      <circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="32" cy="32" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const r = Math.PI * deg / 180;
        return <line key={i} x1={32 + 20 * Math.cos(r)} y1={32 + 20 * Math.sin(r)} x2={32 + 24 * Math.cos(r)} y2={32 + 24 * Math.sin(r)} stroke={color} strokeWidth="1.5" opacity="0.4" />;
      })}
      <line x1="32" y1="32" x2="32" y2="16" stroke={color} strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      <line x1="32" y1="32" x2="44" y2="32" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

// â”€â”€â”€ Deco map per node â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DECO_MAP = {
  'reloj-solar': [DecoObelisk, DecoSunRays, DecoShadow],
  'piramidion': [DecoSunRays, DecoObelisk, DecoShadow],
  'cantera-asuan': [DecoObelisk, DecoGnomon, DecoSunRays],
  'calendario-piedra': [DecoShadow, DecoObelisk, DecoSunRays],
  'roma-obeliscos': [DecoColumn, DecoObelisk, DecoSunRays],
  'aguja-cleopatra': [DecoObelisk, DecoGlobe, DecoColumn],
  'eratostenes': [DecoGlobe, DecoGnomon, DecoSunRays],
  'legado-tiempo': [DecoClock, DecoObelisk, DecoSunRays],
};

// â”€â”€â”€ Bibliography â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Habachi, L. (1977). The Obelisks of Egypt, Charles Scribner\'s Sons',
  'Curran, B. Et al. (2009). Obelisk: A History, Burndy Library',
  'Arnold, D. (1991). Building in Egypt: Pharaonic Stone Masonry, Oxford University Press',
  'Isler, M. (2001). Sticks, Stones, and Shadows: Building the Egyptian Pyramids, University of Oklahoma Press',
];

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INFOGRAPHIC_NODES = [
  {
    "id": "reloj-solar",
    diagramImage: '/assets/egypt/infographic_m12/diagram_reloj-solar.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Reloj del Faraón',
    "bannerImage": "/assets/egypt/infographic_m12/banner_abu-simbel.webp",
    "title": "El Reloj del Faraón",
    "color": "#E8C96A",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_reloj.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_reloj.webp",
    "content": [
      "En la arquitectura sagrada del Antiguo Egipto, el obelisco —denominado en lengua jeroglífica «tekhen»— no era un simple monumento conmemorativo o un pilar decorativo, sino un prodigio tecnológico de piedra diseñado para interactuar con la luz del Sol. Considerado la materialización pétrea de un rayo solar petrificado que descendía directamente del disco de Ra, el obelisco funcionaba como un gigantesco gnomon para medir el avance del tiempo diurno.",
      "Al elevarse verticalmente hacia el cielo despejado, el fuste monolítico proyectaba una sombra nítida y alargada sobre las explanadas pavimentadas de los templos de Karnak, Heliópolis o Luxor. Los sacerdotes astrónomos trazaban en el suelo líneas de graduación angular concéntricas y marcas radiales que permitían subdividir las horas de luz en diez partes diurnas, más dos horas adicionales asignadas a los crepúsculos matutino y vespertino.",
      "El movimiento de la sombra proyectada por el obelisco variaba de manera continua a lo largo del año debido a la declinación solar inducida por la inclinación axial de la Tierra. Durante el solsticio de verano, cuando el Sol alcanzaba su cénit más elevado sobre el horizonte del Alto Egipto, la sombra al mediodía se reducía a su mínima longitud anual; en el solsticio de invierno, por el contrario, la sombra meridiana se estiraba alcanzando su máxima extensión.",
      "Junto a los grandes obeliscos monumentales, los escribas egipcios desarrollaron relojes solares portátiles de madera y piedra caliza conocidos como «sechat». Estos dispositivos constaban de una regla horizontal graduada con cinco marcas de hora y un travesaño vertical en forma de «T» que proyectaba la sombra. Al amanecer se orientaba el travesaño hacia el este, y al mediodía exacto se invertía el instrumento hacia el oeste para medir la tarde.",
      "La integración del obelisco como cronómetro monumental garantizaba que todas las liturgias del templo se ejecutaran en el instante astronómico preciso establecido por los cánones sagrados. El cambio de guardia sacerdotal, las libaciones matutinas de vino y leche, la quema de incienso de kyphi al mediodía y las ofrendas vespertinas estaban rigurosamente pautadas por el paso silencioso de la sombra de granito sobre las losas tebanas."
    ],
    "fact": "Los relojes solares portátiles «sechat» de la Dinastía XVIII dividían el día en doce partes mediante una regla de treinta centímetros y una mira transversal de diez centímetros, constituyendo los cronómetros de bolsillo más antiguos del registro arqueológico mundial, utilizados por sacerdotes y escribas para coordinar las ofrendas litúrgicas en los templos del Imperio Nuevo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los textos del papiro de Carlsberg revelan que los astrónomos egipcios disponían de tablas matemáticas de conversión de sombras que indicaban cuántos pies o codos debía medir la sombra de un obelisco en cada mes del año para determinar el momento exacto del rezo de mediodía, calculando la variación estacional de la altura del Sol con tablas trigonométricas empíricas de notable exactitud."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El principio óptico del gnomon se basa en la proyección geométrica cónica de los rayos solares paralelos que inciden sobre un obstáculo vertical rígido. El ángulo cenital solar se obtiene mediante la función trigonométrica del arco tangente de la longitud de la sombra dividida entre la altura exacta del monolito."
      }
    ]
  },
  {
    "id": "piramidion",
    diagramImage: '/assets/egypt/infographic_m12/diagram_piramidion.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Punta de Oro',
    "bannerImage": "/assets/egypt/infographic_m12/banner_dendera-zodiaco.webp",
    "title": "La Punta de Oro",
    "color": "#FFD700",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_piramidion.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_piramidion.webp",
    "content": [
      "El elemento culminante y más sagrado de todo obelisco egipcio es el piramidión, conocido en lengua faraónica como «benbenet». Esta pequeña pirámide cuadrangular que remata la cúspide del monumento reproducía a escala reducida la mítica colina primordial o «benben», la primera porción de tierra emergida de las aguas oscuras del Nun en el instante fundacional de la Creación, sobre la cual se posó el dios solar Ra para derramar la luz sobre el universo.",
      "Para potenciar su simbolismo solar y su visibilidad a kilómetros de distancia, los piramidiones eran cuidadosamente revestidos con gruesas láminas batidas de electro («djam»), una aleación metálica natural o artificial compuesta típicamente por un setenta y cinco por ciento de oro, un veinte por ciento de plata y un cinco por ciento de cobre. El electro ofrecía un brillo blanquecino y reflectante muy superior al del oro puro, emitiendo destellos cegadores bajo el sol del desierto.",
      "Cuando el valle del Nilo se encontraba todavía sumido en las sombras crepusculares previas al amanecer terrenal, la gran altura del obelisco permitía que su cúspide dorada interceptara los primeros rayos solares por encima del horizonte curvo de la Tierra. Durante varios minutos, el piramidión resplandecía en lo alto como una estrella solitaria suspendida en la penumbra, anunciando a los campesinos y sacerdotes la victoria inminente de la luz matutina.",
      "Del mismo modo, al caer la tarde, cuando el suelo del templo y los patios hipóstilos quedaban ya cubiertos por la sombra crepuscular, la punta dorada continuaba brillando intensamente en el cielo tebano, capturando el último suspiro del Sol poniente antes de su inmersión en el inframundo de la Duat. Este fenómeno óptico diario convertía al obelisco en un faro eterno de continuidad y esperanza para la sociedad egipcia.",
      "Muchos piramidiones estaban decorados con delicados bajorrelieves jeroglíficos que mostraban al faraón reinante arrodillado ofreciendo incienso o copas de vino directamente al dios Ra-Horakhty o al dios solar Amun. Uno de los ejemplares mejor conservados es el piramidión de basalto negro del faraón Amenemhat III de la Dinastía XII, hallado en Dahshur y conservado en el Museo de El Cairo, cuyas inscripciones invocan la apertura celestial de los ojos del rey."
    ],
    "fact": "El piramidión de piedra caliza y granito de un obelisco monumental de treinta metros pesaba entre cinco y diez toneladas, estando recubierto por planchas de electro de dos a tres milímetros de espesor fijadas mediante clavos de bronce y engastes de cola animal, reflejando los primeros rayos del amanecer como un faro dorado visible a decenas de kilómetros de distancia.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las láminas de electro que cubrían las puntas de los obeliscos eran tan codiciadas que durante las invasiones asirias del 664 a.C., las tropas del rey Asurbanipal saquearon dos obeliscos enteros en Tebas, arrancando más de dos mil quinientos kilogramos de metal precioso de sus piramidiones para llevarlo a Nínive."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La aleación de electro posee una reflectividad óptica especular superior al noventa por ciento en el espectro visible (400-700 nanómetros). La presencia de plata incrementa la reflectancia en las longitudes de onda azules y violetas, otorgándole ese resplandor blanco incandescente tan característico."
      }
    ]
  },
  {
    "id": "cantera-asuan",
    diagramImage: '/assets/egypt/infographic_m12/diagram_cantera-asuan.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Gigantes de Granito',
    "bannerImage": "/assets/egypt/infographic_m12/banner_hatshepsut-templo.webp",
    "title": "Gigantes de Granito",
    "color": "#C4846C",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_cantera.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_cantera.webp",
    "content": [
      "Todos los grandes obeliscos monolíticos erigidos en los templos del Imperio Antiguo, Medio y Nuevo proceden de un único enclave geológico excepcional: las canteras de granito rosa situadas en la Primera Catarata del Nilo, en la actual ciudad de Asuán, a unos ochocientos kilómetros al sur de El Cairo. Esta formación plutónica precámbrica proporciona un granito feldespático de extraordinaria densidad, caracterizado por sus grandes cristales rosados de microclina y motas de biotita negra.",
      "La evidencia más colosal del esfuerzo y las limitaciones de la ingeniería cantera egipcia es el célebre Obelisco Inacabado de Asuán, atribuido al reinado de la reina Hatshepsut o de Tutmosis III en la Dinastía XVIII. Este gigante pétreo, que todavía permanece yacente adherido a la roca madre del lecho de la cantera, habría alcanzado una longitud de cuarenta y dos metros y una masa descomunal estimada en casi mil doscientas toneladas, superando a cualquier otro monolito jamás erigido.",
      "Para tallar semejante mole sin herramientas de hierro endurecido ni explosivos, los canteros emplearon bolas esferoidales de dolerita traídas de los lechos volcánicos del desierto oriental. Con un peso de cuatro a seis kilogramos cada una, estas piedras basálticas de dureza extrema eran golpeadas rítmicamente contra el granito por cuadrillas de canteros, pulverizando la roca a un ritmo lentísimo de apenas unos centímetros cúbicos por hora de fatiga extrema.",
      "Los trabajadores excavaban trincheras perimetrales de apenas setenta centímetros de anchura a ambos lados del fuste, trabajando en cuclillas en condiciones de calor sofocante y polvo de sílice. Para acelerar el debilitamiento de la roca, encendían hogueras sobre la superficie del granito y arrojaban inmediatamente agua fría del Nilo: el violento choque térmico provocaba tensiones de dilatación diferencial que agrietaban la capa externa de cuarzo y feldespato.",
      "El destino trágico del Obelisco Inacabado se selló cuando los canteros estaban a punto de desprender su base inferior de la roca madre. Una falla geológica interna provocó una grieta longitudinal profunda e irreparable que cruzó todo el corazón del monolito. La obra fue abandonada de inmediato, pero dejó para la historia un libro abierto donde los arqueólogos contemporáneos pueden estudiar cada etapa de la cantería monumental faraónica."
    ],
    "fact": "El Obelisco Inacabado de Asuán mide cuarenta y un coma setenta y cinco metros de longitud con una sección de cuatro coma dos metros en la base y un peso calculado de mil ciento sesenta y ocho toneladas métricas, el mayor bloque monolítico de granito del mundo antiguo, abandonado en su lecho de roca debido a una fisura estructural imprevista que frustró su extracción.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En las trincheras del Obelisco Inacabado de Asuán, los arqueólogos han hallado miles de percutores de dolerita con sus superficies desgastadas y facetadas por millones de impactos repetitivos, testimoniando el esfuerzo sobrehumano de cientos de obreros que trabajaron durante meses continuos, golpeando rítmicamente el granito a una cadencia calculada de cuarenta a cincuenta impactos por minuto."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El granito rosa de Asuán tiene una resistencia a la compresión de ciento setenta megapascales y un módulo de Young de cincuenta gigapascales. La técnica de choque térmico provocaba gradientes de temperatura superiores a cuatrocientos grados, superando el límite de fractura térmica del cuarzo (573 °C)."
      }
    ]
  },
  {
    "id": "calendario-piedra",
    diagramImage: '/assets/egypt/infographic_m12/diagram_calendario-piedra.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Calendario de Piedra',
    "bannerImage": "/assets/egypt/infographic_m12/banner_karnak-templo.webp",
    "title": "Calendario de Piedra",
    "color": "#7EC8E3",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_calendario.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_calendario.webp",
    "content": [
      "Más allá de medir las horas del día a través de su sombra giratoria, los obeliscos y los grandes templos a los que estaban asociados funcionaban como gigantescos calendarios estacionales esculpidos en piedra. Los astrónomos reales conocían perfectamente que la trayectoria aparente del Sol a lo largo del año trópico describe un ciclo inmutable de trescientos sesenta y cinco días y cuarto, determinando los ciclos de siembra, crecida del río y cosecha.",
      "En los patios de templos solares como el de Niuserre en Abu Gurab (Dinastía V) o el Ramesseum de Ramsés II en Tebas, los obeliscos y las columnas centrales se situaban en relación directa con estelas conmemorativas y altares de alabastro alineados con los puntos cardinales. El día del equinoccio de primavera y de otoño, la sombra del obelisco al amanecer y al atardecer trazaba una línea recta perfecta sobre el pavimento de este a oeste.",
      "Por el contrario, en los solsticios de verano y de invierno, la sombra proyectada al mediodía alcanzaba marcas grabadas en el suelo que delimitaban los extremos angulares de la oscilación solar anual. Estas marcas no eran simples curiosidades visuales: servían como referencias empíricas absolutas para que los sacerdotes verificaran si el calendario civil oficial de trescientos sesenta y cinco días se estaba desfasando con respecto a las estaciones naturales agrícolas.",
      "Dado que el calendario civil egipcio carecía de años bisiestos y acumulaba un retraso de veinticuatro horas cada cuatro años solares, la observación periódica de las sombras del obelisco permitía a los escribas registrar el desplazamiento secular del ciclo de las estaciones, conocido como el año vago. Gracias a estas mediciones pétreas, los gobernantes sabían con exactitud matemática cuántos días de anticipación o retraso llevaba la crecida anual del Nilo.",
      "La precisión arquitectónica requerida para transformar una explanada en un calendario geodésico implicaba nivelar el suelo mediante canales de agua perimetrales con tolerancias menores a un centímetro a lo largo de cientos de metros cuadrados. El obelisco se convertía así en el corazón de un observatorio astronómico al aire libre donde la geometría, la religión y la agricultura se fundían en una síntesis perfecta."
    ],
    "fact": "La explanada del templo solar de Niuserre en Abu Gurab cubría más de ocho mil metros cuadrados nivelados con agua sobre el desierto, centrados en un obelisco monumental de treinta y seis metros de altura que registraba los equinoccios con un error inferior a medio grado de arco, constituyendo uno de los centros de observación y culto heliopolitano más avanzados de la época de las pirámides.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los templos solares de la Dinastía V no tenían santuarios techados oscuros como los templos tebanos posteriores; estaban presididos por un colosal obelisco truncado de piedra caliza y granito erigido sobre una base troncocónica abierta al cielo, bañado enteramente por la luz solar directa, permitiendo que la radiación heliaca bendijera de forma ininterrumpida los altares de ofrendas de alabastro."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad angular aparente del Sol a lo largo del horizonte durante los equinoccios es de cero coma veinticinco grados por minuto de tiempo. En un obelisco de treinta metros, el extremo de la sombra se desplaza a más de trece centímetros por minuto sobre el suelo, permitiendo lecturas temporales de gran precisión."
      }
    ]
  },
  {
    "id": "roma-obeliscos",
    diagramImage: '/assets/egypt/infographic_m12/diagram_roma-obeliscos.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Roma: Ciudad de Obeliscos',
    "bannerImage": "/assets/egypt/infographic_m12/banner_luxor-temple.webp",
    "title": "Roma: Ciudad de Obeliscos",
    "color": "#D4674A",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_roma.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_roma.webp",
    "content": [
      "Tras la derrota militar de Cleopatra VII y Marco Antonio en la batalla de Actium en el año treinta y uno antes de Cristo y la posterior anexión de Egipto como provincia imperial romana, los emperadores de Roma quedaron profundamente deslumbrados por la majestad y la tecnología astronómica de los obeliscos faraónicos. Estos gigantes de granito encarnaban el poder absoluto, la antigüedad milenaria y el dominio sobre el tiempo.",
      "El primer emperador, César Augusto, inauguró la moda imperial en el año diez antes de nuestra era ordenando el traslado marítimo de dos gigantescos obeliscos desde Heliópolis hasta Roma. Uno de ellos fue erigido en la espina central del Circo Máximo (hoy obelisco Flaminio en la Piazza del Popolo), mientras que el segundo fue levantado en el Campo de Marte para servir como el gigantesco gnomon del célebre «Horologium Augusti».",
      "El Horologium Augusti, diseñado por el matemático Facundus Novus, utilizaba el obelisco de granito de treinta metros como puntero solar central de una inmensa plaza circular pavimentada con travertino e incrustaciones de bronce dorado. Sobre este cuadrante geodésico, la sombra del obelisco señalaba no solo las horas del día, sino también el signo zodiacal del mes, la duración de las estaciones y el avance exacto del año juliano recién reformado.",
      "Para transportar estos colosos a través del mar Mediterráneo, los ingenieros navales romanos construyeron barcos de carga monstruosos impulsados por cientos de remeros, con cascos reforzados de roble y miles de ánforas de grano usadas como lastre estabilizador. Posteriormente, emperadores como Calígula, Nerón, Domiciano y Constantino continuaron transportando obeliscos para embellecer los foros, circos y templos de Isis en la capital imperial.",
      "En una paradoja histórica fascinante, hoy en día la ciudad de Roma posee más obeliscos egipcios antiguos en pie que ninguna otra urbe del planeta, incluido el propio Egipto. Un total de trece obeliscos históricos coronan las plazas más emblemáticas de la Ciudad Eterna, como San Pedro en el Vaticano, San Juan de Letrán y la Piazza Navona, funcionando como testigos eternos del intercambio cultural y científico entre el Nilo y el Tíber."
    ],
    "fact": "La ciudad de Roma alberga trece obeliscos egipcios antiguos monumentales; entre ellos destaca el de San Juan de Letrán, erigido originalmente por Tutmosis III en Karnak, con una altura de treinta y dos metros y ciento ocho centímetros y un peso de cuatrocientas cincuenta y cinco toneladas, siendo el mayor obelisco erigido en pie que sobrevive del mundo faraónico.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El obelisco de San Pedro en el Vaticano, traído de Alejandría por Calígula en el año 37 d.C., es el único de Roma que nunca llegó a desplomarse durante la Edad Media; en 1586, el papa Sixto V encomendó al arquitecto Domenico Fontana su traslado de doscientos metros mediante novecientos hombres y ciento cuarenta caballos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las excavaciones arqueológicas de 1979 en el Campo de Marte desenterraron una sección intacta de la cuadrícula de bronce del Horologium Augusti. El bronce original contiene letras griegas que indican los vientos estacionales y marcas astronómicas calibradas para la latitud de Roma (41° 53' N), confirmando el sofisticado empleo urbanístico y propagandístico del obelisco egipcio importado por Augusto."
      }
    ]
  },
  {
    "id": "aguja-cleopatra",
    diagramImage: '/assets/egypt/infographic_m12/diagram_aguja-cleopatra.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Aguja de Cleopatra',
    "bannerImage": "/assets/egypt/infographic_m12/banner_obelisco-origen.webp",
    "title": "La Aguja de Cleopatra",
    "color": "#9B59B6",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_aguja.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_aguja.webp",
    "content": [
      "Bajo la célebre denominación popular de «Agujas de Cleopatra» se conocen tres espectaculares obeliscos egipcios gemelos que hoy se alzan en tres de las metrópolis más influyentes del mundo occidental: Londres, París y Nueva York. A pesar de su nombre romántico decimonónico, estas tres agujas de granito rojo no fueron talladas durante el reinado de la última reina ptolemaica, sino forjadas más de mil cuatrocientos años antes por los reyes guerreros de la Dinastía XVIII.",
      "Los obeliscos de Londres y Nueva York formaban originalmente una pareja simétrica erigida hacia el año 1450 antes de Cristo por orden del faraón Tutmosis III ante el gran templo solar de Ra en Heliópolis, la legendaria Ciudad del Sol. Dos siglos más tarde, Ramsés II añadió inscripciones jeroglíficas en las columnas laterales para conmemorar sus victorias militares. En el año doce antes de Cristo, el emperador Augusto los trasladó al Cesáreo de Alejandría.",
      "A finales del siglo diecinueve, el virrey de Egipto Mehmet Alí y sus sucesores donaron estos monumentos a los gobiernos de Gran Bretaña y Estados Unidos como agradecimiento por relaciones comerciales y diplomáticas. La travesía náutica del obelisco de Londres en 1877 fue dramática: fue transportado dentro de un buque de hierro flotante cilíndrico bautizado como Cleopatra, que casi zozobró en una tormenta en el golfo de Vizcaya antes de ser erigido en el Victoria Embankment junto al Támesis.",
      "El obelisco gemelo de Nueva York fue transportado en 1880 a bordo del vapor Dessoug por el ingeniero naval Henry Gorringe. Tras cruzar el Atlántico, el coloso de doscientas veinte toneladas fue arrastrado mediante rodillos y cabrestantes a vapor a través de las calles de Manhattan durante cuatro meses agonizantes hasta su emplazamiento definitivo en una colina de Central Park, justo detrás del Museo Metropolitano de Arte.",
      "Por su parte, el obelisco de París que preside la emblemática Place de la Concorde procede de la entrada monumental del templo de Luxor, donado a Francia en 1830. Estas tres agujas milenarias actúan hoy como embajadores eternos de la civilización faraónica en el corazón del mundo contemporáneo, proyectando sus sombras solares sobre millones de transeúntes del siglo veintiuno tal como lo hacían en las orillas del Nilo."
    ],
    "fact": "La Aguja de Cleopatra en Central Park de Nueva York mide veintiún metros y veintiún centímetros de altura con un peso de doscientas veinticuatro toneladas, tallada en granito sienita rosa de Asuán y fechada arqueológicamente en el reinado de Tutmosis III hacia el 1460 a.C., habiendo superado con éxito una compleja travesía trasatlántica a vapor en 1880.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Bajo la base de granito del obelisco de Londres, los ingenieros victorianos enterraron en 1878 una cápsula del tiempo de plomo que contenía un juego completo de monedas británicas, una biblia en varios idiomas, fotografías de las doce mujeres inglesas más bellas de la época y un retrato de la reina Victoria."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La atmósfera industrial y el hielo de Nueva York erosionaron más la superficie de granito de la aguja de Central Park en sus primeros cincuenta años de estancia americana que tres mil años de intemperie en el desierto egipcio, obligando a los conservadores a aplicar consolidantes poliméricos de resina sintética."
      }
    ]
  },
  {
    "id": "eratostenes",
    diagramImage: '/assets/egypt/infographic_m12/diagram_eratostenes.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Midiendo la Tierra',
    "bannerImage": "/assets/egypt/infographic_m12/banner_tutankhamun-tumba.webp",
    "title": "Midiendo la Tierra",
    "color": "#1ABC9C",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_eratostenes.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_eratostenes.webp",
    "content": [
      "El uso de los obeliscos y los pilares gnomónicos como instrumentos geodésicos de precisión alcanzó su cumbre intelectual en el siglo tercero antes de nuestra era gracias al genio matemático y geográfico de Eratóstenes de Cirene. Como tercer director de la célebre Biblioteca de Alejandría, Eratóstenes combinó la observación astronómica empírica con la geometría euclidiana pura para lograr una hazaña asombrosa: calcular el tamaño del planeta Tierra.",
      "Eratóstenes leyó en un manuscrito de la biblioteca que en la ciudad de Siene (la actual Asuán), situada junto a la Primera Catarata del Nilo, ocurría un fenómeno extraordinario al mediodía del solsticio de verano (veintiuno de junio). En ese instante exacto, los pilares verticales y las columnas de los templos no proyectaban sombra alguna sobre el suelo, y la luz solar descendía en línea vertical hasta el fondo de los pozos de agua más profundos.",
      "Comprendiendo que en Siene el Sol se encontraba exactamente en el cénit celeste (a noventa grados sobre el horizonte), Eratóstenes midió al mediodía del mismo día del solsticio de verano la sombra proyectada por un gnomon vertical u obelisco en la ciudad de Alejandría, situada al norte de Siene sobre el mismo meridiano. Comprobó que en Alejandría el gnomon proyectaba una sombra cuyo ángulo respecto a la vertical era de siete coma dos grados.",
      "Aplicando el teorema geométrico de los ángulos alternos internos formados por una línea secante que cruza dos líneas paralelas (los rayos del Sol), Eratóstenes dedujo que el ángulo de siete coma dos grados en la cúspide del obelisco era exactamente igual al ángulo subtendido en el centro de la Tierra entre las ciudades de Siene y Alejandría. Dado que una circunferencia completa tiene trescientos sesenta grados, siete coma dos grados representa una cincuentava parte del total (360 / 7,2 = 50).",
      "Bastaba multiplicar la distancia terrestre entre ambas ciudades por cincuenta para obtener la circunferencia planetaria. Mediante las mediciones profesionales de los «bematistas» reales (agrimensores que contaban pasos calibrados), Eratóstenes estimó la distancia en cinco mil estadios egipcios. Su cálculo final arrojó una circunferencia de doscientos cincuenta mil estadios, equivalente a unos treinta y nueve mil trescientos setenta y cinco kilómetros modernos: un error menor al dos por ciento."
    ],
    "fact": "En el año 240 a.C., Eratóstenes de Cirene calculó la circunferencia terrestre utilizando la sombra de un gnomon de siete coma dos grados (1/50 de circunferencia) y la distancia de cinco mil estadios entre Alejandría y Asuán, logrando una precisión superior al 98 %, sentando las bases fundacionales de la geodesia y la cartografía matemática de la historia humana.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los bematistas del Egipto ptolemaico eran agrimensores del Estado altamente entrenados para medir distancias kilométricas con pasos idénticos y cuerdas de agrimensura calibradas tratadas con cera para evitar que la humedad variara la longitud de las fibras de lino durante el censo fiscal, permitiendo un trazado catastral de tierras de cultivo de una precisión geométrica sin precedentes en el Nilo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La circunferencia polar de la Tierra medida por satélites geodésicos modernos es de cuarenta mil ocho kilómetros. El cálculo de Eratóstenes (equivalente a 39.375 km si se usa el estadio egipcio estándar de 157,5 metros) constituye una de las mayores hazañas científicas de la historia de la humanidad sin tecnología óptica."
      }
    ]
  },
  {
    "id": "legado-tiempo",
    diagramImage: '/assets/egypt/infographic_m12/diagram_legado-tiempo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Del Obelisco al Reloj Atómico',
    "bannerImage": "/assets/egypt/infographic_m12/banner_valley-kings.webp",
    "title": "Del Obelisco al Reloj Atómico",
    "color": "#E67E22",
    "btnImage": "/assets/egypt/infographic_obeliscos/btn_legado.webp",
    "image": "/assets/egypt/infographic_obeliscos/hero_legado.webp",
    "content": [
      "La búsqueda de la medición exacta del tiempo iniciada hace más de cuatro mil años frente a los obeliscos de granito de Tebas y Heliópolis constituye uno de los hilos conductores más fascinantes de la historia de la tecnología universal. La necesidad de regular las liturgias sagradas, organizar la irrigación de los campos y predecir los ciclos celestes impulsó a la mente humana a buscar patrones periódicos cada vez más fiables y estables en la naturaleza.",
      "Desde aquellos primeros gnomones solares de piedra que dependían inevitablemente de la presencia de un cielo despejado, la civilización egipcia dio el siguiente salto tecnológico creando la clepsidra o reloj de agua. Halladas en Karnak en el siglo catorce antes de Cristo, estas vasijas cónicas de alabastro graduadas permitían medir las horas de la noche cronometrando el goteo constante de agua líquida a través de un orificio de bronce perforado en su base.",
      "Siglos más tarde, en la Europa medieval y renacentista, los principios geométricos de los gnomones egipcios se combinaron con la mecánica de precisión mediante la invención del escape mecánico, los engranajes dentados y el péndulo oscilante de Galileo Galilei y Christiaan Huygens. La medición del tiempo se independizó definitivamente de la astronomía directa, trasladándose del patio del templo al interior de los campanarios de las catedrales.",
      "En el siglo veinte, la revolución tecnológica de la electrónica sustituyó los péndulos mecánicos por las vibraciones piezoeléctricas ultrarrápidas de pequeños cristales de cuarzo mineral, capaces de oscilar con frecuencias regulares de treinta y dos mil setecientos sesenta y ocho ciclos por segundo. El tiempo pasó a medirse no en horas solares variables, sino en fracciones de segundo inmutables en chips de silicio.",
      "Hoy en día, la cúspide de la cronometría reside en los relojes atómicos de cesio-133 y en las fuentes atómicas ópticas de estroncio, que definen el segundo internacional mediante la frecuencia de transición hiperfina del átomo (nueve mil ciento noventa y dos millones seiscientos treinta y un mil setecientos setenta hercios). Aunque la precisión actual mide la milmillonésima de segundo, el impulso intelectual sigue siendo idéntico al de aquel sacerdote de Ra que observaba la sombra del obelisco."
    ],
    "fact": "La evolución cronométrica humana abarca desde el gnomon de granito de Heliópolis con un margen de error de diez minutos, pasando por la clepsidra de Karnak del 1380 a.C. con margen de dos minutos, hasta los relojes atómicos modernos con error menor a un nanosegundo cada mil años, demostrando la incesante búsqueda humana por medir con exactitud los latidos del cosmos.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La clepsidra de alabastro más antigua conocida fue descubierta en el templo de Amun en Karnak y data del reinado de Amenhotep III (c. 1380 a.C.); cuenta con doce columnas de puntos en su interior para medir las diferentes longitudes de las doce horas nocturnas a lo largo de los doce meses del año, resolviendo con genialidad hidrodinámica el problema de la duración variable de las horas estacionales en Egipto."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El reloj atómico de fuente de cesio NIST-F2 del Instituto Nacional de Estándares de Estados Unidos tiene una incertidumbre de frecuencia de un segundo cada trescientos millones de años, enfriando los átomos de cesio hasta casi el cero absoluto (-273,15 °C) mediante rayos láser cruzados, marcando la cúspide tecnológica de la precisión horaria desarrollada por la humanidad desde la antigüedad egipcia."
      }
    ]
  }
];

// â”€â”€â”€ Sand Particle Field â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SandParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d'); const dpr = window.devicePixelRatio || 1; const w = canvas.parentElement.offsetWidth; const h = canvas.parentElement.offsetHeight; canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w +'px'; canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.5,
      r: Math.random() * 1.5 + 0.5, speed: Math.random() * 0.001 + 0.0005,
      phase: Math.random() * Math.PI * 2, o: Math.random() * 0.4 + 0.1,
    }));
    const sand = Array.from({ length: 25 }, () => ({
      x: Math.random() * w, y: h * 0.6 + Math.random() * h * 0.4,
      r: Math.random() * 1.2 + 0.3, vx: Math.random() * 0.3 + 0.1,
      o: Math.random() * 0.3 + 0.05,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 201, 106, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      sand.forEach(s => {
        s.x += s.vx;
        if (s.x > w + 5) s.x = -5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${s.o})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Obeliscos SVG Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ObeliscosHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-16px' }}>
      <svg viewBox="0 0 640 130" style={{ width: '100%', maxWidth: '640px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(232,201,106,0.3))' }}>
        {/* Horizon arc */}
        <path d="M80 110 Q200 30 320 20 Q440 30 560 110Z" fill="none" stroke="rgba(232,201,106,0.2)" strokeWidth="1.5" />
        {/* Central obelisk silhouette */}
        <polygon points="315,25 320,15 325,25 323,95 317,95" fill="rgba(232,201,106,0.15)" stroke="rgba(232,201,106,0.3)" strokeWidth="1" />
        {/* Pyramidion glow */}
        <motion.circle cx="320" cy="14" r="6" fill="#FFD700"
          animate={{ opacity: [0.3, 0.9, 0.3], r: [5, 8, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }}
        />
        {/* Shadow line */}
        <motion.line x1="320" y1="95" x2="440" y2="105"
          stroke="#E8C96A" strokeWidth="2" strokeLinecap="round"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Decorative stars */}
        {[{cx:160,cy:18},{cx:210,cy:10},{cx:270,cy:8},{cx:370,cy:8},{cx:430,cy:10},{cx:480,cy:18}].map((s,i) => (
          <motion.circle key={i} cx={s.cx} cy={s.cy} r="2.5" fill="#FFD700"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }}
          />
        ))}
        {/* Title */}
        <text x="320" y="75" textAnchor="middle" fill="#E8C96A" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">OBELISCOS</text>
        <text x="320" y="95" textAnchor="middle" fill="rgba(232,201,106,0.65)" fontSize="10.5" fontFamily="monospace" letterSpacing="2.5">RELOJES DEL SOL EN PIEDRA</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NodeButton({ node, isActive, onClick, index, explored }) {
  const wasExplored = explored.has(node.id);
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.5rem', padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : wasExplored ? node.color + '60' : 'rgba(232,201,106,0.2)'}`,
        boxShadow: isActive
          ? `0 0 22px ${node.color}55, 0 0 44px ${node.color}22, inset 0 0 16px ${node.color}33`
          : wasExplored ? `0 4px 15px ${node.color}25` : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
         loading="lazy" />
        {wasExplored && !isActive && (
          <div style={{
            position: 'absolute', bottom: '4px', right: '4px',
            width: '18px', height: '18px', borderRadius: '50%',
            background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#1A0A00', fontSize: '10px', fontWeight: 900 }}>âœ“</span>
          </div>
        )}
        {isActive && (
          <motion.div animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }}
          />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : wasExplored ? node.color + 'CC' : 'rgba(255,255,255,0.72)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '96px', textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotM12"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
  );
}

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-8px', rotate: 12 },
    { top: '42%', left: '-12px', rotate: -8 },
    { bottom: '10%', right: '8px', rotate: 18 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(18, 10, 2, 0.93)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}28`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.65)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* â”€â”€â”€ Two-Column Hero (Standard: 1fr 1fr) â”€â”€â”€ */}
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
            pointerEvents: 'none',
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
            margin: '0 0 0.8rem', fontSize: '1.4rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
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
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 1.8rem',
          position: 'relative', zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.025)', borderRadius: '12px',
                padding: '1.1rem 1.2rem', borderLeft: `3px solid ${node.color}30`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#1A0A00',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {['â—†', 'â—‡', 'â˜…', 'â—‰'][i % 4]}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.76, color: 'rgba(255,255,255,0.86)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

                      {node.bannerImage && (
                <div className="relative w-full rounded-xl overflow-hidden mb-6" style={{aspectRatio:'16/5'}}>
                  <img
                    src={node.bannerImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium leading-tight">
                    {node.caption}
                  </p>
                </div>
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

              {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}28`, borderRadius: '16px',
            padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
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
                color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.72,
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px',
      border: '1px solid rgba(232,201,106,0.15)',
    }}>
      <Star size={14} style={{ color: '#E8C96A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #B8860B, #E8C96A, #FFD700)',
            borderRadius: '3px', boxShadow: '0 0 8px rgba(232,201,106,0.4)',
          }}
        />
      </div>
      <span style={{
        fontSize: '0.75rem', color: '#E8C96A', fontFamily: 'monospace',
        fontWeight: 'bold', minWidth: '45px', textAlign: 'right',
      }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM12() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,12,2,0.88) 0%, rgba(40,25,8,0.80) 40%, rgba(15,8,0,0.92) 100%), url(/assets/egypt/infographic_obeliscos/bg_obeliscos.png)',
      backgroundSize: 'cover', backgroundPosition: 'center 40%',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative',
      overflow: 'hidden', border: '1px solid rgba(232,201,106,0.12)',
      boxShadow: '0 0 60px rgba(20,8,0,0.85), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <SandParticleField />
      <ObeliscosHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(232,201,106,0.72)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      {/* Node Buttons Grid */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2,
        marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton
            key={node.id} node={node} index={index}
            isActive={activeNode === node.id}
            explored={explored}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      {/* Content Panel */}
      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      {/* Completion Banner */}
      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(232,201,106,0.08)', borderRadius: '16px',
              border: '1px solid rgba(232,201,106,0.28)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#E8C96A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ›ï¸ ¡Has descubierto todos los secretos de los Obeliscos!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Maestro de las Sombras
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* â”€â”€â”€ Bibliography â”€â”€â”€ */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ðŸ“š Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
