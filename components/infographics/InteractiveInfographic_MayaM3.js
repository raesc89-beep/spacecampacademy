'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya Haab themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoCalendarRound({ size = 70, color = '#FDD835', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Outer gear teeth to represent interlocking time cycles */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30 + 23 * Math.cos(rad) - 2} y={30 + 23 * Math.sin(rad) - 2} width="4" height="4" fill={color} opacity="0.4" transform={`rotate(${a} ${30 + 23 * Math.cos(rad)} ${30 + 23 * Math.sin(rad)})`} />;
      })}
      {/* Inner dots representing days */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 15 * Math.cos(rad)} cy={30 + 15 * Math.sin(rad)} r="1.5" fill={color} opacity="0.5" />;
      })}
    </svg>
  );
}

function DecoMaizPlant({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 55 L30 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M30 40 Q20 35 15 25 Q22 28 30 35" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 45 Q40 40 45 30 Q38 33 30 40" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 25 Q22 20 18 12 Q25 15 30 20" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q38 25 42 17 Q35 20 30 25" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Corn cobs */}
      <ellipse cx="24" cy="32" rx="3" ry="6" fill={color} opacity="0.5" transform="rotate(-30 24 32)" />
      <ellipse cx="36" cy="22" rx="3" ry="6" fill={color} opacity="0.5" transform="rotate(30 36 22)" />
    </svg>
  );
}

function DecoSunCycle({ size = 80, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Horizon line */}
      <line x1="5" y1="30" x2="75" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Sun arcs representing seasonal passage */}
      <path d="M15 30 A 25 25 0 0 1 65 30" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M25 30 A 15 15 0 0 1 55 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Sun */}
      <circle cx="40" cy="15" r="5" fill={color} opacity="0.6" />
      {/* Sun rays */}
      <line x1="40" y1="10" x2="40" y2="5" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="25" stroke={color} strokeWidth="1.5" />
      <line x1="35" y1="15" x2="30" y2="15" stroke={color} strokeWidth="1.5" />
      <line x1="45" y1="15" x2="50" y2="15" stroke={color} strokeWidth="1.5" />
      <line x1="36" y1="11" x2="32" y2="7" stroke={color} strokeWidth="1.5" />
      <line x1="44" y1="19" x2="48" y2="23" stroke={color} strokeWidth="1.5" />
      <line x1="44" y1="11" x2="48" y2="7" stroke={color} strokeWidth="1.5" />
      <line x1="36" y1="19" x2="32" y2="23" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoGlyphCircle({ size = 60, color = '#009688', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Cartouche outline */}
      <rect x="15" y="10" width="30" height="40" rx="10" fill="none" stroke={color} strokeWidth="2" />
      {/* Inner glyph details (abstracted) */}
      <circle cx="30" cy="22" r="5" fill={color} opacity="0.5" />
      <path d="M20 35 L40 35 L30 45 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="15" r="2" fill={color} />
      <circle cx="38" cy="15" r="2" fill={color} />
      {/* Affixes (number bars and dots) */}
      <circle cx="10" cy="20" r="2" fill={color} />
      <circle cx="10" cy="30" r="2" fill={color} />
      <circle cx="10" cy="40" r="2" fill={color} />
      <line x1="6" y1="50" x2="14" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoRainDrop({ size = 70, color = '#42A5F5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Rain cloud */}
      <path d="M20 25 Q15 25 15 20 Q15 15 25 15 Q28 10 35 12 Q42 10 45 18 Q50 18 50 25 Q50 30 40 30 L20 30 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Rain drops */}
      <path d="M25 35 Q25 40 23 45" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M35 32 Q35 37 33 42" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M45 35 Q45 40 43 45" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="23" cy="47" r="1.5" fill={color} opacity="0.6" />
      <circle cx="33" cy="44" r="1.5" fill={color} opacity="0.6" />
      <circle cx="43" cy="47" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'haab-estructura': [DecoCalendarRound, DecoGlyphCircle, DecoSunCycle],
  'dieciocho-meses': [DecoCalendarRound, DecoMaizPlant, DecoGlyphCircle],
  'wayeb-peligroso': [DecoRainDrop, DecoSunCycle, DecoCalendarRound],
  'agricola-estacional': [DecoMaizPlant, DecoRainDrop, DecoSunCycle],
  'comparacion-gregoriano': [DecoSunCycle, DecoCalendarRound, DecoGlyphCircle],
  'glifos-meses': [DecoGlyphCircle, DecoCalendarRound, DecoMaizPlant],
  'uso-cotidiano': [DecoCalendarRound, DecoMaizPlant, DecoSunCycle],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Coe, M.D. (2011). The Maya, Thames & Hudson (9th edition)',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Rice, P.M. (2007). Maya Calendar Origins: Monuments, Mythistory, and the Materialization of Time, University of Texas Press',
  'Sharer, R.J. & Traxler, L.P. (2006). The Ancient Maya, Stanford University Press',
  'Lounsbury, F.G. (1978). "Maya Numeration, Computation, and Calendrical Astronomy", Dictionary of Scientific Biography, 15'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'haab-estructura',
    title: 'Estructura del Haab',
    color: '#FDD835',
    btnImage: '/assets/maya/infographic_m3/btn_haab-estructura.jpg',
    image: '/assets/maya/infographic_m3/hero_haab-estructura.jpg',
    content: [
      'Imagina que quieres organizar una enorme fiesta de cumpleaÃ±os o un festival, pero no tienes un calendario en la pared ni un telÃ©fono celular para saber en quÃ© dÃ­a estÃ¡s. Â¿CÃ³mo sabrÃ­as cuÃ¡ndo celebrar? Los antiguos mayas eran tan observadores e inteligentes que construyeron su propio sistema para medir el paso del tiempo. Crearon el "Haab", un calendario solar de exactamente trescientos sesenta y cinco dÃ­as. Era como un reloj majestuoso que guiaba la vida de toda una civilizaciÃ³n asombrosa.',
      'Al igual que nosotros agrupamos nuestros dÃ­as en meses, ellos tambiÃ©n lo hacÃ­an, pero con unas reglas matemÃ¡ticas fascinantes y muy diferentes a las nuestras. En lugar de tener doce meses desiguales que a veces tienen treinta dÃ­as, a veces treinta y uno y a veces veintiocho (como ocurre con nuestro febrero), los mayas decidieron ser muchÃ­simo mÃ¡s organizados. Dividieron su aÃ±o de manera simÃ©trica en dieciocho meses perfectos. Cada uno de esos dieciocho meses tenÃ­a exactamente veinte dÃ­as.',
      'Si eres un genio de las matemÃ¡ticas y multiplicas dieciocho meses por veinte dÃ­as, te darÃ¡s cuenta de que el resultado es trescientos sesenta. Es decir, casi todo el aÃ±o estaba organizado en cajas impecables de veinte dÃ­as cada una. Pero claro, tÃº ya sabes que un aÃ±o solar verdadero tiene trescientos sesenta y cinco dÃ­as, Â¡no trescientos sesenta! Entonces, Â¿quÃ© hacÃ­an con los cinco dÃ­as que faltaban? Los mayas no se olvidaron de ellos; los reservaron para el final.',
      'AÃ±adieron un mes especial, sÃºper pequeÃ±ito, justo al terminar su ciclo regular. Este "mini-mes" de solo cinco dÃ­as se llamaba "Wayeb". Con esto, la cuenta llegaba perfectamente a trescientos sesenta y cinco dÃ­as de forma exacta y elegante. Esta estructura matemÃ¡tica de "dieciocho por veinte mÃ¡s cinco" era tan precisa y constante que les permitÃ­a planificar todo meticulosamente, desde sus ceremonias secretas en templos gigantescos hasta el mejor momento para cultivar su milpa.',
      'Piensa en el calendario Haab como los engranajes de un reloj de piedra colosal. Cada dÃ­a tenÃ­a un nÃºmero del cero al diecinueve, y cada mes tenÃ­a su propio nombre. El cero era un nÃºmero que los mayas descubrieron e implementaron siglos antes que los europeos. Por eso, el primer dÃ­a del mes no era el "dÃ­a uno", sino el "asiento", representando el cero. AsÃ­, el tiempo fluÃ­a de forma cÃ­clica y matemÃ¡tica en esta increÃ­ble civilizaciÃ³n que observaba los cielos con reverencia.',
    ],
    expandables: [
      { label: 'Las MatemÃ¡ticas del Tiempo', icon: 'clock', text: 'Los mayas usaban un sistema matemÃ¡tico vigesimal, lo que significa que contaban basÃ¡ndose en el nÃºmero veinte, usando los dedos de las manos y de los pies. A diferencia de nuestro sistema decimal que se basa en el diez. Por eso, era completamente lÃ³gico e instintivo para ellos crear meses de exactamente veinte dÃ­as. Todo en su calendario encajaba perfectamente con su forma natural de contar y de entender las grandes matemÃ¡ticas cÃ³smicas.' },
      { label: 'El Ciclo Sin Fin', icon: 'clock', text: 'A diferencia de nosotros, que contamos los aÃ±os de forma lineal hacia el infinito, los mayas veÃ­an el tiempo como ruedas engranadas girando eternamente. El Haab se combinaba con otro calendario sagrado de 260 dÃ­as llamado Tzolkin, formando una gran Rueda CalendÃ¡rica. Pasaban exactamente cincuenta y dos aÃ±os solares de 365 dÃ­as antes de que una misma fecha exacta se volviera a repetir de manera idÃ©ntica. Â¡Era como esperar 52 aÃ±os para tu verdadero cumpleaÃ±os cÃ³smico!' },
    ],
    fact: 'Â¿SabÃ­as que los astrÃ³nomos mayas, observando pacientemente el cielo desde lo alto de sus pirÃ¡mides escalonadas sin ayuda de telescopios ni computadoras, calcularon la duraciÃ³n exacta del aÃ±o solar con un margen de error verdaderamente minÃºsculo? Su nivel de observaciÃ³n empÃ­rica del cielo nocturno y diurno era tan extremadamente preciso que sus vastos conocimientos astronÃ³micos rivalizaban e incluso superaban en exactitud a los cÃ¡lculos de muchÃ­simos cientÃ­ficos europeos renombrados de esa misma Ã©poca histÃ³rica.',
  },
  {
    id: 'dieciocho-meses',
    title: 'Los 18 Meses',
    color: '#795548',
    btnImage: '/assets/maya/infographic_m3/btn_dieciocho-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_dieciocho-meses.jpg',
    content: [
      'Piensa en los nombres de nuestros meses actuales: enero, febrero, marzo... La mayorÃ­a de ellos provienen de antiguos dioses o nÃºmeros romanos que ya casi nadie recuerda en su vida diaria. Sin embargo, para la antigua civilizaciÃ³n maya, los nombres de sus dieciocho meses tenÃ­an un significado sÃºper prÃ¡ctico, profundamente ecolÃ³gico y completamente conectado con la hermosa naturaleza vibrante que los rodeaba en las espesas selvas y altas montaÃ±as de MesoamÃ©rica.',
      'Cada uno de los meses del Haab, que recordamos duraban exactamente veinte dÃ­as, tenÃ­a nombres fascinantes como Pop, Wo, Sip, Sotz, Sek, Xul, Yaxkin, Mol, Chen, Yax, Sak, Keh, Mak, Kankin, Muwan, Pax, Kayab y Kumku. Pronunciarlos es como escuchar un eco distante de la historia antigua. En lugar de celebrar a emperadores distantes, estos nombres estaban estrechamente vinculados a las actividades agrÃ­colas, a los animales sagrados de la selva y a los ciclos importantes de las lluvias.',
      'Por ejemplo, el mes llamado "Sotz" significa "murciÃ©lago". Durante esta Ã©poca particular del aÃ±o solar maya, estos animales fascinantes e incomprendidos eran mÃ¡s activos o visibles, y los mayas realizaban ceremonias que honraban su papel fundamental como polinizadores en el bosque tropical oscuro. El mes "Yaxkin", que puede traducirse poÃ©ticamente como "sol nuevo" o "primer sol", marcaba el inicio mÃ¡gico de la resplandeciente temporada seca tras las lluvias intensas y renovadoras.',
      'Estos meses no eran solo palabras vacÃ­as en un registro de piedra; funcionaban como una verdadera guÃ­a de supervivencia y prosperidad comunitaria. Le decÃ­an a los sabios agricultores y a los nobles gobernantes exactamente cuÃ¡ndo la tierra estarÃ­a lo suficientemente hÃºmeda y receptiva para sembrar las semillas, cuÃ¡ndo el sol abrazador secarÃ­a los campos, o cuÃ¡ndo los animales de caza estarÃ­an migrando abundantemente a travÃ©s de los diversos territorios de los reinos mayas.',
      'Es como si su calendario fuera un manual de instrucciones gigantesco escrito por el universo y traducido por los astrÃ³nomos para toda su sociedad. Hoy, nosotros consultamos aplicaciones meteorolÃ³gicas sofisticadas en nuestros telÃ©fonos para saber si va a llover, pero los mayas solo tenÃ­an que mirar su intrincado calendario Haab para comprender perfectamente en quÃ© momento mÃ¡gico e importante del ciclo natural eterno se encontraban parados junto a su familia.',
    ],
    expandables: [
      { label: 'El Mes Pop', icon: 'atom', text: 'El mes "Pop" es especialmente interesante porque literalmente significa "estera" o "petate", que era un tapete tejido donde se sentaban los reyes y gobernantes mayas mÃ¡s poderosos. Este mes marcaba majestuosamente el mismÃ­simo primer dÃ­a del AÃ±o Nuevo en el extenso calendario Haab. En esta fecha tan importante, se encendÃ­an fuegos nuevos en los majestuosos templos y las comunidades limpiaban a fondo todas sus casas para dar la bienvenida triunfal a un ciclo fresco, renovado y brillante.' },
      { label: 'Ceremonias del Fuego', icon: 'clock', text: 'Durante el mes mÃ­stico llamado "Mak", se realizaban extensas e importantes ceremonias maravillosas en las que los sabios sacerdotes extinguÃ­an los fuegos en las plazas principales de las ciudades mayas grandiosas. Esta ceremonia simbolizaba profundamente el final de la ardiente temporada de sequÃ­a y era una forma mÃ­stica de pedir a las nubes tormentosas y a los dioses benÃ©volos que trajeran las esperadas lluvias fertilizantes necesarias para que florecieran abundantemente los campos de maÃ­z verde.' },
    ],
    fact: 'Un dato asombroso sobre la escritura sagrada maya es que muchos de estos nombres de meses tienen diferentes interpretaciones fascinantes dependiendo de la ciudad o regiÃ³n maya especÃ­fica, ya que los antiguos mayas hablaban mÃ¡s de treinta idiomas distintos. Sin embargo, a pesar de las ligeras diferencias en la pronunciaciÃ³n diaria o la variaciÃ³n dialectal local, los majestuosos sÃ­mbolos jeroglÃ­ficos tallados en la piedra sÃ³lida seguÃ­an significando de forma universal exactamente lo mismo a lo largo y ancho de todos sus dominios.',
  },
  {
    id: 'wayeb-peligroso',
    title: 'Los 5 DÃ­as Wayeb',
    color: '#D84315',
    btnImage: '/assets/maya/infographic_m3/btn_wayeb-peligroso.jpg',
    image: '/assets/maya/infographic_m3/hero_wayeb-peligroso.jpg',
    content: [
      'Â¿Te has despertado alguna vez sintiendo que hoy va a ser un dÃ­a extraÃ±o, donde todo parece estar un poco al revÃ©s o fuera de lugar? Ahora imagina sentir esa tensiÃ³n y preocupaciÃ³n no por un solo dÃ­a, sino durante cinco dÃ­as enteros, y que todos tus vecinos y familiares sientan exactamente lo mismo al mismo tiempo. AsÃ­ es como se sentÃ­an los antiguos mayas durante los misteriosos dÃ­as "Wayeb". Estos cinco dÃ­as adicionales al final de sus dieciocho meses sumaban exactamente el total de 365 dÃ­as del aÃ±o.',
      'Pero el Wayeb no era un momento de celebraciÃ³n ni de alegrÃ­a vacacional. Â¡Todo lo contrario! Los mayas consideraban que estos cinco dÃ­as residuales eran profundamente peligrosos y estaban cargados de una energÃ­a incierta, muy perjudicial o de mala suerte. Era un perÃ­odo transitorio donde el orden normal, predecible y seguro del mundo se detenÃ­a por completo, creando una brecha espeluznante en el tiempo seguro. Durante este extraÃ±o hueco temporal intermedio, las pesadas barreras protectoras entre nuestro cÃ¡lido mundo terrenal y el oscuro inframundo se debilitaban y se volvÃ­an extremadamente delgadas.',
      'A estos misteriosos dÃ­as se les llamaba a menudo los "dÃ­as sin nombre", aunque formaban parte de un ciclo. Eran vistos como portales oscuros a travÃ©s de los cuales seres monstruosos, fantasmas siniestros y energÃ­as de mala fortuna podÃ­an cruzar libremente para caminar furtivamente entre los humanos temerosos. Por eso, durante el peligroso Wayeb, toda la actividad vigorosa habitual de las bulliciosas y coloridas ciudades mayas se congelaba casi por completo en un silencio solemne e incÃ³modo. ',
      'Para mantenerse completamente a salvo de la desgracia o la fatalidad, las personas comunes se quedaban escondidas dentro de sus casas, hablando en voz baja. Se abstenÃ­an de realizar trabajos fÃ­sicos duros, evitaban emprender viajes largos por los peligrosos senderos de la selva exuberante, e increÃ­blemente, incluso intentaban no lavarse el cabello, no barrer sus patios y no encender fuegos ruidosos. Â¡Imagina no poder ducharte ni hacer ruido durante cinco largos dÃ­as porque el universo entero estÃ¡ atravesando un momento sÃºper vulnerable y mÃ­stico!',
      'Sin embargo, no todos estaban paralizados por el miedo en la oscuridad. Los sabios sacerdotes y chamanes experimentados trabajaban incansablemente dÃ­a y noche, realizando rituales intensos de extrema protecciÃ³n en lo alto de las majestuosas pirÃ¡mides humeantes de copal fragante. Estos ritos sagrados ayudaban mÃ¡gicamente a alejar las fuerzas perversas incontrolables, garantizando exitosamente que el frÃ¡gil universo no colapsara en el caos, asegurando que el sol volviera a brillar triunfal y ordenado en el mÃ¡gico y prÃ³spero AÃ±o Nuevo inminente.',
    ],
    expandables: [
      { label: 'Criaturas del Inframundo', icon: 'clock', text: 'La profunda creencia de la sociedad maya era que deidades muy malvadas y criaturas pavorosas del temible XibalbÃ¡ (su aterrador e implacable inframundo) podÃ­an caminar sueltas con facilidad durante el Wayeb. Las leyendas aterradoras hablaban sobre entes traviesos e incluso deidades de la enfermedad deambulando sigilosamente. El mÃ¡s aterrador y destructivo de todos estos peligros acechantes era el temido colapso total, repentino y definitivo de todo el ordenado, brillante y hermoso universo.' },
      { label: 'El Dios Mam', icon: 'clock', text: 'Durante este extraÃ±o y peligroso periodo transicional, una deidad antigua muy peculiar llamada el Dios "Mam" (frecuentemente representado como un anciano anciano encorvado llevando una enorme caracola a cuestas) reinaba temporalmente como dueÃ±o indiscutible de estos cinco dÃ­as misteriosos de transiciÃ³n. El dios Mam simbolizaba misteriosamente todo el peso insoportable de la edad extrema, el declive inminente y la inestabilidad total de toda la creaciÃ³n terrenal antes de que el poderoso AÃ±o Nuevo lograra reiniciarla majestuosamente.' },
    ],
    fact: 'Incluso en muchas comunidades mayas modernas e indÃ­genas de la actualidad, que aÃºn preservan sabiamente valiosas tradiciones orales milenarias de sus antepasados, persiste la profunda y respetuosa costumbre de mantenerse en un estado de extrema quietud, evitando tareas arduas y tomando muchas precauciones en los dÃ­as finales que preceden al importante comienzo de un ciclo calendÃ¡rico totalmente nuevo, honrando de manera continua y reverente esta fascinante herencia del Wayeb ancestral.',
  },
  {
    id: 'agricola-estacional',
    title: 'Calendario AgrÃ­cola',
    color: '#66BB6A',
    btnImage: '/assets/maya/infographic_m3/btn_agricola-estacional.jpg',
    image: '/assets/maya/infographic_m3/hero_agricola-estacional.jpg',
    content: [
      'Â¿Alguna vez te has preguntado cÃ³mo saben los agricultores de hoy exactamente cuÃ¡ndo sembrar sus deliciosas semillas para que crezcan fuertes y sanas? Los antiguos mayas no tenÃ­an estaciones del clima marcadas con colores en un refrigerador; su reloj agrÃ­cola, inmensamente preciso, brillante y vital, era nada menos que el magnÃ­fico calendario Haab. Este calendario no era un simple pasatiempo de sabios enclaustrados; era la herramienta de supervivencia mÃ¡s importante y esencial de toda su vibrante y floreciente civilizaciÃ³n agraria.',
      'A diferencia de lugares que tienen una marcada primavera, verano, otoÃ±o e invierno (como en Europa o el norte de AmÃ©rica), las selvas densas y las regiones tropicales de MesoamÃ©rica, donde habitaban los formidables mayas, tienen esencialmente solo dos grandes estaciones principales: una estaciÃ³n seca, caracterizada por soles abrasadores, y una estaciÃ³n lluviosa, que trae consigo aguaceros torrenciales y tormentas tropicales inmensas. El Haab fue diseÃ±ado inteligentemente para sincronizarse y rastrear este vital ciclo climÃ¡tico de lluvia y sequÃ­a.',
      'El corazÃ³n y alma de la brillante cultura maya y de toda su comida nutritiva era (y todavÃ­a es) una parcela de cultivo especial e ingeniosa llamada "milpa". En la mÃ¡gica milpa crecÃ­a el maÃ­z dorado, frijoles nutritivos, calabazas enormes y picantes chiles de hermosos colores brillantes. Pero para que el maÃ­z creciera grande y fuerte sin marchitarse miserablemente ni pudrirse en exceso, los campesinos dedicados tenÃ­an que sembrar las valiosas semillas exactamente justo antes de que comenzaran a caer del cielo espeso las fuertes y muy nutritivas lluvias tropicales.',
      'Los sabios sacerdotes, que a la vez eran astrÃ³nomos extremadamente dedicados y expertos, utilizaban los cielos celestiales inmensos y el intrincado calendario Haab para informar puntualmente y sin errores a todos los agricultores cuÃ¡ndo debÃ­an empezar a talar los espesos bosques, cuÃ¡ndo quemar inteligentemente la vegetaciÃ³n seca para crear valiosas cenizas fertilizantes, y en quÃ© dÃ­a preciso hundir reverentemente cada preciada semilla en la cÃ¡lida tierra hÃºmeda y perfumada.',
      'Una de las seÃ±ales astronÃ³micas maravillosas y brillantes que marcaban un hito crucial en el calendario agrÃ­cola del Haab era el espectacular "paso del sol por el cenit". Dos asombrosas veces al aÃ±o, en las latitudes especÃ­ficas y mÃ¡gicas donde vivÃ­an los mayas, el enorme Sol brillante se posicionaba de forma asombrosa e impecable directamente, en lÃ­nea recta vertical, sobre sus cabezas al radiante mediodÃ­a, de tal manera asombrosa que Â¡absolutamente nada producÃ­a ningÃºn tipo de sombra! Este fenÃ³meno cÃ³smico celestial anunciaba el inminente inicio inminente de la vital y muy aguardada temporada de lluvias abundantes.',
    ],
    expandables: [
      { label: 'El MaÃ­z Sagrado', icon: 'atom', text: 'El maÃ­z no era solo un alimento mÃ¡s en la mesa para quitar el hambre de los niÃ±os; era sagrado, reverenciado y adorado. SegÃºn el Popol Vuh, el asombroso, poÃ©tico y muy hermoso libro de la creaciÃ³n cÃ³smica de los mayas kiche\', los dioses formidables intentaron crear, con varios intentos fallidos, a la raza de los seres humanos usando barro hÃºmedo e incluso madera crujiente sin lograr ningÃºn Ã©xito. Â¡Pero finalmente lograron crear exitosamente a las personas verdaderas moldeÃ¡ndolas maravillosamente a partir de una masa perfecta de maÃ­z blanco y maÃ­z amarillo!' },
      { label: 'Las PirÃ¡mides y el Sol', icon: 'clock', text: 'Las colosales e imponentes pirÃ¡mides mayas eran verdaderos y majestuosos instrumentos cientÃ­ficos astronÃ³micos diseÃ±ados maravillosamente con el propÃ³sito de medir meticulosamente y observar profundamente el grandioso calendario solar agrÃ­cola Haab. ArquitectÃ³nicamente asombroso, las escalinatas empinadas y los edificios colindantes enteros en lugares famosos y muy turÃ­sticos como ChichÃ©n ItzÃ¡ o UaxactÃºn estaban perfectamente alineados por genios constructores para marcar espectacularmente la majestuosa salida brillante y la espectacular puesta ardiente del sol durante los solsticios cruciales y los equinoccios de las siembras.' },
    ],
    fact: 'La tradicional, mÃ¡gica, y muy inteligente tÃ©cnica milenaria agrÃ­cola maya de la sagrada y biodiversa milpa es, sin duda alguna, una de las formas verdaderamente mÃ¡s sostenibles, maravillosas, y completamente ecolÃ³gicas de agricultura de supervivencia jamÃ¡s inventadas ingeniosamente en la vasta historia del planeta Tierra. Debido a que genialmente mezclan diferentes y nutritivos cultivos vigorosos todos creciendo juntos armoniosamente, se nutren mutuamente en el mismo pedazo de suelo sin agotar rÃ¡pidamente a la naturaleza dadivosa.',
  },
  {
    id: 'comparacion-gregoriano',
    title: 'ComparaciÃ³n con el Gregoriano',
    color: '#42A5F5',
    btnImage: '/assets/maya/infographic_m3/btn_comparacion-gregoriano.jpg',
    image: '/assets/maya/infographic_m3/hero_comparacion-gregoriano.jpg',
    content: [
      'TÃº conoces muy bien nuestro calendario, el cual usamos hoy en todo el mundo. Se llama "calendario gregoriano", bautizado de esa manera en honor al famoso e influyente Papa Gregorio XIII, quien lo introdujo oficial y firmemente en el lejano aÃ±o 1582 en el continente europeo. Â¿Pero sabÃ­as que si comparamos cuidadosamente este calendario que estÃ¡ colgado en las paredes de tu casa con el majestuoso calendario Haab de los sabios mayas, encontraremos cosas interesantÃ­simas y enormes similitudes que te dejarÃ¡n completamente boquiabierto de puro asombro?',
      'Ambos impresionantes y grandiosos calendarios comparten una caracterÃ­stica asombrosa y fundamental que no puede pasarse por alto jamÃ¡s: los dos increÃ­blemente estÃ¡n basados en la misma duraciÃ³n asombrosamente precisa de 365 dÃ­as. Esto no es solo una curiosa y divertida casualidad al azar, sino que demuestra firmemente de forma brillante que, sin importar cuÃ¡n inmensamente lejos estuvieran y sin haberse conocido nunca jamÃ¡s de frente, tanto los estudiosos mayas en AmÃ©rica como los pensadores de Europa miraban el mismo hermoso firmamento estrellado y llegaron a conclusiones solares virtualmente idÃ©nticas.',
      'Sin embargo, hay una grandÃ­sima y muy fascinante diferencia matemÃ¡tica profunda entre los dos ingeniosos e histÃ³ricos sistemas. Como probablemente sabrÃ¡s, el asombroso viaje anual completo e incesante de nuestro planeta rocoso Tierra alrededor del resplandeciente Sol en el vasto espacio no tarda exactamente y con absoluta precisiÃ³n trescientos sesenta y cinco dÃ­as cerrados, sino mÃ¡s bien unos trescientos sesenta y cinco dÃ­as brillantes con casi seis largas horas adicionales e invisibles que van sobrando a cada rato.',
      'En nuestro confiable calendario occidental gregoriano moderno, los matemÃ¡ticos resolvieron mÃ¡gicamente este molesto y frustrante "descuadre" sumando silenciosamente y de manera astuta un valioso "aÃ±o bisiesto". Esto significa que aÃ±aden hÃ¡bilmente un dÃ­a extra completo (el famoso veintinueve de febrero) cada cuatro largos y laboriosos aÃ±os. Â¡Pero los mayas simplemente no lo hacÃ­an asÃ­! Ellos no insertaban arbitrariamente dÃ­as adicionales fantasmas. Como resultado directo y fascinante, su majestuoso calendario inalterable Haab iba desfasÃ¡ndose y adelantÃ¡ndose muy sutilmente de las estaciones naturales reales en aproximadamente un dÃ­a entero cada cuatro vigorosos aÃ±os solares.',
      'Esto significaba que, asombrosamente y de una manera cÃ­clica larguÃ­sima, el mes Haab mÃ¡gico que originariamente correspondÃ­a sin falta a las torrenciales y vitales lluvias frescas, cientos y cientos de pacÃ­ficos aÃ±os despuÃ©s caerÃ­a impredecible y sorprendentemente en medio de la ardiente y polvorienta temporada extremadamente seca. Â¡Pero ojo, esto no era para nada un terrible error! Los mayas, a diferencia de los europeos, valoraban inmensamente y amaban sinceramente el ciclo matemÃ¡tico abstracto puro y perfecto mucho mÃ¡s que mantener inamovibles o artificiales las estaciones climÃ¡ticas en su rÃ­gido calendario solar de piedra tallada.',
    ],
    expandables: [
      { label: 'Una VisiÃ³n Distinta del Tiempo', icon: 'clock', text: 'La fascinante, compleja y muy diferente soluciÃ³n astronÃ³mica que aplicaron los mayas de no utilizar en absoluto astutos aÃ±os bisiestos artificiales no fue para nada producto de la torpeza o por la absoluta falta total de conocimientos matemÃ¡ticos. Ellos realmente sabÃ­an perfectamente, al minuto exacto de manera prodigiosa, la discrepancia solar que existÃ­a. Pero decidieron profundamente que su magnÃ­fico ciclo inalterable de los dÃ­as era algo tremendamente demasiado asombroso y sumamente sagrado para ser alterado torpemente con dÃ­as sueltos e insertados artificialmente como hacemos nosotros ahora.' },
      { label: 'Correcciones TelescÃ³picas', icon: 'clock', text: 'Para corregir maravillosamente, de manera astronÃ³mica y mÃ¡gica su aparente y leve desviaciÃ³n paulatina observada respecto del sol real brillante, los sacerdotes mayas ingeniosos registraban y calculaban meticulosamente increÃ­bles fechas matemÃ¡ticas sumamente precisas en largos e inmensos monumentos altos de brillante piedra clara, donde documentaban pacientemente la enorme diferencia exacta, logrando mantener una sincronicidad estelar mental colosal y muy perfecta que durarÃ­a muchos miles y miles de esplendorosos y majestuosos aÃ±os, superior a los cÃ¡lculos griegos y romanos.' },
    ],
    fact: 'El valioso, histÃ³rico y muy famoso calendario gregoriano europeo en sÃ­ mismo fue en verdad una actualizaciÃ³n y mejora directa al antiguo sistema juliano romano, porque increÃ­blemente durante la Ã©poca brillante del imponente Imperio Romano, Â¡su propio calendario imperfecto tambiÃ©n se habÃ­a desfasado torpemente muchÃ­simos e incontables dÃ­as completos de manera muy bochornosa y cÃ³mica respecto al sol radiante primaveral y los equinoccios de las importantes festividades agrÃ­colas y estacionales!',
  },
  {
    id: 'glifos-meses',
    title: 'Los Glifos',
    color: '#009688',
    btnImage: '/assets/maya/infographic_m3/btn_glifos-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_glifos-meses.jpg',
    content: [
      'Â¿Te imaginas si los meses vibrantes de tu aÃ±o, en lugar de ser simplemente palabras aburridas e insÃ­pidas escritas con letras simples, fueran retratados mÃ¡gicamente como obras de arte impresionantes, hermosas y extremadamente complejas talladas firmemente en colosales y sÃ³lidas piedras de las pirÃ¡mides? Para los grandes y sabios constructores mayas, la escritura antigua era algo mucho mÃ¡s majestuoso y sagrado que una simple forma comÃºn de anotar notas fugaces. EscribÃ­an sus meses del majestuoso calendario Haab usando intrincados y deslumbrantes "glifos".',
      'Un impresionante glifo maya de un mes calendario no es en lo absoluto como nuestra aburrida letra "A" o la simple letra "B". Es casi siempre un diminuto cuadro hermoso, poÃ©tico, enigmÃ¡tico y sumamente detallado que con frecuencia muestra de forma muy artÃ­stica una fascinante cara humana muy estilizada, el perfil de un animal sagrado de la oscura y hÃºmeda selva espesa, o elaborados diseÃ±os enrevesados, misteriosos y complejos de hermosos e importantÃ­simos motivos de plantas vivas y del cosmos.',
      'Cada uno de los asombrosos dieciocho increÃ­bles meses del Haab ostentaba y gozaba alegremente de su propio diseÃ±o jeroglÃ­fico principal Ãºnico e inconfundible, al que se le acompaÃ±aba sabiamente con un nÃºmero expresado brillantemente en formato de barras y puntos matemÃ¡ticos. Â¡Una simple pero poderosa barra horizontal representaba sÃ³lidamente un valor grande de cinco, y un punto redondo y diminuto representaba con firmeza el nÃºmero de uno! Esto convertÃ­a magistralmente a la escritura maya de un mes en algo visualmente esplendoroso, hermoso, compacto, y lleno de informaciÃ³n en piedra.',
      'Para los asombrosos antiguos escribas, pintar pacientemente los coloridos cÃ³dices mayas invaluables usando delicados y finos pinceles de pelo de animal, o para los artesanos expertos que tallaban diestramente en la dura roca con rudimentarios cinceles, esculpir perfectamente la hermosa e intrincada forma redonda o cuadrada del sagrado glifo de un mes era considerado inmensamente un verdadero y gran honor respetado. Los hÃ¡biles escribas eran considerados grandes nobles mÃ¡gicos porque poseÃ­an profundamente el misterioso don poderoso de cristalizar de forma material y palpable al mismÃ­simo tiempo infinito.',
      'Si examinas detenidamente y de manera muy observadora uno de estos misteriosos sÃ­mbolos del Haab tallado majestuosamente en piedra maciza, notarÃ¡s brillantemente que casi siempre el glifo central del mes de veinte dÃ­as reposaba dentro de una especie de gran escudo estilizado, marco decorativo o bello cartucho que funcionaba hermosamente como un pedestal. Era una manera espectacular de enmarcar y darle toda la gigantesca e inmensa importancia suprema de lo que significaba para ellos eternizar mÃ¡gicamente este perÃ­odo cÃ­clico y muy repetitivo fundamental en la historia interminable y majestuosa del cosmos infinito y misterioso.',
    ],
    expandables: [
      { label: 'El Arte de Escribir', icon: 'atom', text: 'La maravillosa escritura jeroglÃ­fica antigua maya es uno de los poquÃ­simos sistemas de escritura originales, hermosos y verdaderamente independientes inventados desde cero y de forma completamente autÃ³noma en la inmensa historia del planeta entero. Aprender mÃ¡gicamente a tallar asombrosamente los perfectos e intrincados glifos requerÃ­a una dedicaciÃ³n profunda y tomar arduos aÃ±os interminables de paciente y riguroso estudio en exigentes y secretas escuelas especiales dedicadas exclusivamente al arte sagrado, mÃ­stico, histÃ³rico, astronÃ³mico y poderoso de la caligrafÃ­a mesoamericana precolombina brillante.' },
      { label: 'Sobrevivientes de Papel', icon: 'clock', text: 'Desafortunadamente y con gran tristeza e inmensa pena, solamente tres hermosos libros mayas antiquÃ­simos originales intactos e increÃ­blemente valiosos (que son usualmente llamados "cÃ³dices" desplegables hechos magistralmente de delgada pero muy resistente corteza de Ã¡rbol de amate aplanada con paciencia) sobrevivieron trÃ¡gicamente a la terrible e implacable destrucciÃ³n devastadora provocada brutalmente por los furiosos y crueles conquistadores espaÃ±oles al intentar erradicar toda la sabidurÃ­a inmensa y la cultura vibrante que los sabios locales habÃ­an documentado en ellos sobre los misterios de sus divinidades cÃ³smicas y celestiales maravillosas.' },
    ],
    fact: 'Incluso tras innumerables y muchÃ­simos e infatigables decenios de intenso y muy riguroso estudio mundial apasionado e inteligente, los glifos majestuosos mayas seguÃ­an siendo un gran misterio indescifrable total e inescrutable. Â¡No fue asombrosamente hasta la tardÃ­a e interesante dÃ©cada de muchÃ­simos hallazgos en mil novecientos ochenta que expertos brillantes, geniales investigadores y grandes epigrafistas astutos, lograron comprender verdaderamente y leer en voz alta de manera exitosa y sorprendente la inmensa mayorÃ­a abrumadora de estas antiguas e intrincadas piedras bellamente talladas por todo CentroamÃ©rica vibrante y misteriosa!',
  },
  {
    id: 'uso-cotidiano',
    title: 'Uso Cotidiano',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m3/btn_uso-cotidiano.jpg',
    image: '/assets/maya/infographic_m3/hero_uso-cotidiano.jpg',
    content: [
      'Lejos e independientemente de las altÃ­simas, sagradas y ceremoniales pirÃ¡mides resplandecientes colosales donde se hacÃ­an los cÃ¡lculos celestes grandiosos, el calendario Haab era en realidad de una manera profunda el gigantesco reloj comunitario que de verdad latÃ­a y sincronizaba cada latido y el ritmo diario incesante, vigoroso e intenso de toda la fascinante y muy bulliciosa vida de la vibrante y grandiosa sociedad de la civilizaciÃ³n maya. Para una familia regular de comerciantes o campesinos, conocer magistralmente la fecha exacta era una cosa verdaderamente clave.',
      'Imagina que tuvieras que organizar algo grandioso, como viajar a un mercado regional inmenso, gigantesco, vibrante y muy caÃ³tico. Los extensos e impresionantes mercados mesoamericanos mayas antiguos operaban a menudo, habitualmente y de una forma muy sincrÃ³nica e impresionante en determinados e invariables dÃ­as fijos muy especÃ­ficos de las largas semanas o de los perfectos y matemÃ¡ticos meses de 20 dÃ­as que estructuraban todo el Haab. Conocer profundamente quÃ© fecha calendario era hoy, les permitÃ­a a las familias caminar larguÃ­simas y arduas jornadas selva adentro para vender con total Ã©xito brillantes plumas o cacao y saber que estarÃ­an repletos de bullicio alegre.',
      'El Haab tambiÃ©n era increÃ­blemente y absolutamente necesario para realizar grandiosos festivales y muy alegres celebraciones enormes llenas de colorido. Al igual que nosotros celebramos felices fiestas tradicionales como el AÃ±o Nuevo o fechas histÃ³ricas patriÃ³ticas emocionantes a nivel global, los antiguos mayas usaban alegremente el calendario sagrado inalterable Haab para agendar grandes espectÃ¡culos festivos, ceremonias masivas de bailes, representaciones teatrales espectaculares con mÃ¡scaras, deslumbrantes juegos de pelota intensos y grandiosos festines con tamales y rico chocolate picante con sabor a dioses en los gloriosos y muy bulliciosos centros de las ciudades prÃ³speras.',
      'AdemÃ¡s, este sistema brillante, preciso, imponente y meticuloso no se aplicaba y se usaba Ãºnicamente para fines meramente organizativos a nivel social amplio y comunitario extenso; formaba tambiÃ©n parte indiscutible de todo el gigantesco, meticuloso e increÃ­ble sistema burocrÃ¡tico, histÃ³rico y administrativo monumental inigualable y necesario. SirviÃ³ eficientemente y muy poderosamente como las valiosas "actas de nacimiento" pÃºblicas. Cuando el majestuoso hijo o hija amado de un gran rey o noble nacÃ­a resplandeciente, su fecha completa Haab y su nombre calendÃ¡rico maravilloso se inscribÃ­an tallados profundamente con infinito cuidado devoto.',
      'Por lo tanto, este prodigioso e inteligente calendario de grandiosos trescientos sesenta y cinco dÃ­as mÃ¡gicos entrelazaba indisolublemente toda la realidad vibrante y deslumbrante de la enorme y mÃ¡gica civilizaciÃ³n ancestral. AsÃ­ como tÃº asistes rigurosamente a la escuela feliz en tu horario y celebras con muchÃ­simo entusiasmo festivo tu emocionante y dulce cumpleaÃ±os basÃ¡ndote estrictamente en un calendario de papel o digital de hoy, un vivaz y alegre niÃ±o maya organizaba, crecÃ­a y maravillaba completamente toda su increÃ­ble vida milenaria brillante y majestuosa inmerso profundamente en este perfecto, colosal e inmensamente asombroso ritmo cÃ³smico majestuoso en la gran selva hÃºmeda.',
    ],
    expandables: [
      { label: 'Nombres al Nacer', icon: 'clock', text: 'La sagrada y mÃ¡gica fecha calendÃ¡rica especÃ­fica exacta en que nacÃ­a felizmente un bebÃ© maya tenÃ­a una enorme importancia astrolÃ³gica y personal inmensa, muy superior y poderosa. Muchos grandÃ­simos reyes nobles y plebeyos humildes tomaban como su propio y querido nombre propio personal Ãºnico e irrepetible el majestuoso y vibrante dÃ­a mÃ­stico asombroso particular exacto en el que habÃ­an respirado su mismÃ­simo y valioso primer aliento vital de vida. AsÃ­ se conectaba mÃ¡gicamente el ser humano diminuto inmediatamente al gran compÃ¡s cÃ³smico.' },
      { label: 'La Vida del Campesino', icon: 'clock', text: 'Para las laboriosas, fuertes e increÃ­blemente humildes inmensas familias unidas de campesinos arduos y respetables mayas, el asombroso Haab era verdaderamente la herramienta mÃ¡s importante de su hogar feliz de estuco y bajareque. Saber intuitivamente leer las estaciones solares era crucial para saber sin equivocarse ni fracasar cuÃ¡ndo hacer reparaciones astutas y necesarias a sus acogedoras e ingeniosas pequeÃ±as casas techadas bellamente con anchas hojas secas trenzadas, o saber exactamente en quÃ© momento brillante particular tejer con finas fibras preciosas o cazar pequeÃ±os e interesantes animales escurridizos nutritivos en la maleza.' },
    ],
    fact: 'Las maravillosas inscripciones gigantes, preciosas y sumamente ornamentadas que conmemoran majestuosamente eventos como coronaciones Ã©picas y batallas memorables gloriosas, encontradas y descubiertas con asombro por arqueÃ³logos en altas estelas espectaculares y pirÃ¡mides mayas imponentes grandiosas y milenarias a lo ancho de CentroamÃ©rica mÃ­stica, casi siempre combinaban orgullosamente, rigurosamente y majestuosamente una precisa fecha brillante Haab inmensa al ladito de muchÃ­simos otros intrincados ciclos sagrados celestes infinitos, creando asombrosamente una "Cuenta Larga" histÃ³rica colosal de extrema y minuciosa exactitud perfecta inigualable mundialmente.',
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '253,216,53' : '102,187,106', // gold or green
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

// â”€â”€â”€ Time Travel Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(253,216,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FDD835','#795548','#D84315','#66BB6A','#42A5F5','#009688','#FF8F00'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central clock icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FDD835" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FDD835" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FDD835" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FDD835" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(253,216,53,0.2)" />
            <stop offset="50%" stopColor="rgba(253,216,53,0.9)" />
            <stop offset="100%" stopColor="rgba(253,216,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FDD835" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CALENDARIO HAAB</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(253,216,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SOLAR DE 365 DÃAS</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching M9 Dendera style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(253,216,53,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      >
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
          layoutId="activeDotMayaM3"
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
        background: 'rgba(20, 15, 10, 0.95)',
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
                  background: node.color, color: '#1a1005',
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
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>
                Dato CientÃ­fico
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(253,216,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#FDD835', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FDD835, #66BB6A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(253,216,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FDD835', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,15,10,0.85) 0%, rgba(25,20,15,0.8) 40%, rgba(20,15,10,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(253,216,53,0.12)',
      boxShadow: '0 0 60px rgba(20,15,10,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <TimeTravelHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(253,216,53,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada cÃ­rculo para explorar <ChevronRight size={14} />
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
              background: 'rgba(253,216,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(253,216,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FDD835', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ† Â¡Has dominado los secretos del Calendario Haab!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de AstrÃ³nomo Maya
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* â”€â”€â”€ BibliografÃ­a â”€â”€â”€ */}
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
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>â€¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
