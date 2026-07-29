'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Haab themed) ────────────────────────────
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

// ─── Content Data ────────────────────────────────────────────────────────────
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
      'Imagina que quieres organizar una enorme fiesta de cumpleaños o un festival, pero no tienes un calendario en la pared ni un teléfono celular para saber en qué día estás. ¿Cómo sabrías cuándo celebrar? Los antiguos mayas eran tan observadores e inteligentes que construyeron su propio sistema para medir el paso del tiempo. Crearon el "Haab", un calendario solar de exactamente trescientos sesenta y cinco días. Era como un reloj majestuoso que guiaba la vida de toda una civilización asombrosa.',
      'Al igual que nosotros agrupamos nuestros días en meses, ellos también lo hacían, pero con unas reglas matemáticas fascinantes y muy diferentes a las nuestras. En lugar de tener doce meses desiguales que a veces tienen treinta días, a veces treinta y uno y a veces veintiocho (como ocurre con nuestro febrero), los mayas decidieron ser muchísimo más organizados. Dividieron su año de manera simétrica en dieciocho meses perfectos. Cada uno de esos dieciocho meses tenía exactamente veinte días.',
      'Si eres un genio de las matemáticas y multiplicas dieciocho meses por veinte días, te darás cuenta de que el resultado es trescientos sesenta. Es decir, casi todo el año estaba organizado en cajas impecables de veinte días cada una. Pero claro, tú ya sabes que un año solar verdadero tiene trescientos sesenta y cinco días, ¡no trescientos sesenta! Entonces, ¿qué hacían con los cinco días que faltaban? Los mayas no se olvidaron de ellos; los reservaron para el final.',
      'Añadieron un mes especial, súper pequeñito, justo al terminar su ciclo regular. Este "mini-mes" de solo cinco días se llamaba "Wayeb". Con esto, la cuenta llegaba perfectamente a trescientos sesenta y cinco días de forma exacta y elegante. Esta estructura matemática de "dieciocho por veinte más cinco" era tan precisa y constante que les permitía planificar todo meticulosamente, desde sus ceremonias secretas en templos gigantescos hasta el mejor momento para cultivar su milpa.',
      'Piensa en el calendario Haab como los engranajes de un reloj de piedra colosal. Cada día tenía un número del cero al diecinueve, y cada mes tenía su propio nombre. El cero era un número que los mayas descubrieron e implementaron siglos antes que los europeos. Por eso, el primer día del mes no era el "día uno", sino el "asiento", representando el cero. Así, el tiempo fluía de forma cíclica y matemática en esta increíble civilización que observaba los cielos con reverencia.',
    ],
    expandables: [
      { label: 'Las Matemáticas del Tiempo', icon: 'clock', text: 'Los mayas usaban un sistema matemático vigesimal, lo que significa que contaban basándose en el número veinte, usando los dedos de las manos y de los pies. A diferencia de nuestro sistema decimal que se basa en el diez. Por eso, era completamente lógico e instintivo para ellos crear meses de exactamente veinte días. Todo en su calendario encajaba perfectamente con su forma natural de contar y de entender las grandes matemáticas cósmicas.' },
      { label: 'El Ciclo Sin Fin', icon: 'clock', text: 'A diferencia de nosotros, que contamos los años de forma lineal hacia el infinito, los mayas veían el tiempo como ruedas engranadas girando eternamente. El Haab se combinaba con otro calendario sagrado de 260 días llamado Tzolkin, formando una gran Rueda Calendárica. Pasaban exactamente cincuenta y dos años solares de 365 días antes de que una misma fecha exacta se volviera a repetir de manera idéntica. ¡Era como esperar 52 años para tu verdadero cumpleaños cósmico!' },
    ],
    fact: '¿Sabías que los astrónomos mayas, observando pacientemente el cielo desde lo alto de sus pirámides escalonadas sin ayuda de telescopios ni computadoras, calcularon la duración exacta del año solar con un margen de error verdaderamente minúsculo? Su nivel de observación empírica del cielo nocturno y diurno era tan extremadamente preciso que sus vastos conocimientos astronómicos rivalizaban e incluso superaban en exactitud a los cálculos de muchísimos científicos europeos renombrados de esa misma época histórica.',
  },
  {
    id: 'dieciocho-meses',
    title: 'Los 18 Meses',
    color: '#795548',
    btnImage: '/assets/maya/infographic_m3/btn_dieciocho-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_dieciocho-meses.jpg',
    content: [
      'Piensa en los nombres de nuestros meses actuales: enero, febrero, marzo... La mayoría de ellos provienen de antiguos dioses o números romanos que ya casi nadie recuerda en su vida diaria. Sin embargo, para la antigua civilización maya, los nombres de sus dieciocho meses tenían un significado súper práctico, profundamente ecológico y completamente conectado con la hermosa naturaleza vibrante que los rodeaba en las espesas selvas y altas montañas de Mesoamérica.',
      'Cada uno de los meses del Haab, que recordamos duraban exactamente veinte días, tenía nombres fascinantes como Pop, Wo, Sip, Sotz, Sek, Xul, Yaxkin, Mol, Chen, Yax, Sak, Keh, Mak, Kankin, Muwan, Pax, Kayab y Kumku. Pronunciarlos es como escuchar un eco distante de la historia antigua. En lugar de celebrar a emperadores distantes, estos nombres estaban estrechamente vinculados a las actividades agrícolas, a los animales sagrados de la selva y a los ciclos importantes de las lluvias.',
      'Por ejemplo, el mes llamado "Sotz" significa "murciélago". Durante esta época particular del año solar maya, estos animales fascinantes e incomprendidos eran más activos o visibles, y los mayas realizaban ceremonias que honraban su papel fundamental como polinizadores en el bosque tropical oscuro. El mes "Yaxkin", que puede traducirse poéticamente como "sol nuevo" o "primer sol", marcaba el inicio mágico de la resplandeciente temporada seca tras las lluvias intensas y renovadoras.',
      'Estos meses no eran solo palabras vacías en un registro de piedra; funcionaban como una verdadera guía de supervivencia y prosperidad comunitaria. Le decían a los sabios agricultores y a los nobles gobernantes exactamente cuándo la tierra estaría lo suficientemente húmeda y receptiva para sembrar las semillas, cuándo el sol abrazador secaría los campos, o cuándo los animales de caza estarían migrando abundantemente a través de los diversos territorios de los reinos mayas.',
      'Es como si su calendario fuera un manual de instrucciones gigantesco escrito por el universo y traducido por los astrónomos para toda su sociedad. Hoy, nosotros consultamos aplicaciones meteorológicas sofisticadas en nuestros teléfonos para saber si va a llover, pero los mayas solo tenían que mirar su intrincado calendario Haab para comprender perfectamente en qué momento mágico e importante del ciclo natural eterno se encontraban parados junto a su familia.',
    ],
    expandables: [
      { label: 'El Mes Pop', icon: 'atom', text: 'El mes "Pop" es especialmente interesante porque literalmente significa "estera" o "petate", que era un tapete tejido donde se sentaban los reyes y gobernantes mayas más poderosos. Este mes marcaba majestuosamente el mismísimo primer día del Año Nuevo en el extenso calendario Haab. En esta fecha tan importante, se encendían fuegos nuevos en los majestuosos templos y las comunidades limpiaban a fondo todas sus casas para dar la bienvenida triunfal a un ciclo fresco, renovado y brillante.' },
      { label: 'Ceremonias del Fuego', icon: 'clock', text: 'Durante el mes místico llamado "Mak", se realizaban extensas e importantes ceremonias maravillosas en las que los sabios sacerdotes extinguían los fuegos en las plazas principales de las ciudades mayas grandiosas. Esta ceremonia simbolizaba profundamente el final de la ardiente temporada de sequía y era una forma mística de pedir a las nubes tormentosas y a los dioses benévolos que trajeran las esperadas lluvias fertilizantes necesarias para que florecieran abundantemente los campos de maíz verde.' },
    ],
    fact: 'Un dato asombroso sobre la escritura sagrada maya es que muchos de estos nombres de meses tienen diferentes interpretaciones fascinantes dependiendo de la ciudad o región maya específica, ya que los antiguos mayas hablaban más de treinta idiomas distintos. Sin embargo, a pesar de las ligeras diferencias en la pronunciación diaria o la variación dialectal local, los majestuosos símbolos jeroglíficos tallados en la piedra sólida seguían significando de forma universal exactamente lo mismo a lo largo y ancho de todos sus dominios.',
  },
  {
    id: 'wayeb-peligroso',
    title: 'Los 5 Días Wayeb',
    color: '#D84315',
    btnImage: '/assets/maya/infographic_m3/btn_wayeb-peligroso.jpg',
    image: '/assets/maya/infographic_m3/hero_wayeb-peligroso.jpg',
    content: [
      '¿Te has despertado alguna vez sintiendo que hoy va a ser un día extraño, donde todo parece estar un poco al revés o fuera de lugar? Ahora imagina sentir esa tensión y preocupación no por un solo día, sino durante cinco días enteros, y que todos tus vecinos y familiares sientan exactamente lo mismo al mismo tiempo. Así es como se sentían los antiguos mayas durante los misteriosos días "Wayeb". Estos cinco días adicionales al final de sus dieciocho meses sumaban exactamente el total de 365 días del año.',
      'Pero el Wayeb no era un momento de celebración ni de alegría vacacional. ¡Todo lo contrario! Los mayas consideraban que estos cinco días residuales eran profundamente peligrosos y estaban cargados de una energía incierta, muy perjudicial o de mala suerte. Era un período transitorio donde el orden normal, predecible y seguro del mundo se detenía por completo, creando una brecha espeluznante en el tiempo seguro. Durante este extraño hueco temporal intermedio, las pesadas barreras protectoras entre nuestro cálido mundo terrenal y el oscuro inframundo se debilitaban y se volvían extremadamente delgadas.',
      'A estos misteriosos días se les llamaba a menudo los "días sin nombre", aunque formaban parte de un ciclo. Eran vistos como portales oscuros a través de los cuales seres monstruosos, fantasmas siniestros y energías de mala fortuna podían cruzar libremente para caminar furtivamente entre los humanos temerosos. Por eso, durante el peligroso Wayeb, toda la actividad vigorosa habitual de las bulliciosas y coloridas ciudades mayas se congelaba casi por completo en un silencio solemne e incómodo. ',
      'Para mantenerse completamente a salvo de la desgracia o la fatalidad, las personas comunes se quedaban escondidas dentro de sus casas, hablando en voz baja. Se abstenían de realizar trabajos físicos duros, evitaban emprender viajes largos por los peligrosos senderos de la selva exuberante, e increíblemente, incluso intentaban no lavarse el cabello, no barrer sus patios y no encender fuegos ruidosos. ¡Imagina no poder ducharte ni hacer ruido durante cinco largos días porque el universo entero está atravesando un momento súper vulnerable y místico!',
      'Sin embargo, no todos estaban paralizados por el miedo en la oscuridad. Los sabios sacerdotes y chamanes experimentados trabajaban incansablemente día y noche, realizando rituales intensos de extrema protección en lo alto de las majestuosas pirámides humeantes de copal fragante. Estos ritos sagrados ayudaban mágicamente a alejar las fuerzas perversas incontrolables, garantizando exitosamente que el frágil universo no colapsara en el caos, asegurando que el sol volviera a brillar triunfal y ordenado en el mágico y próspero Año Nuevo inminente.',
    ],
    expandables: [
      { label: 'Criaturas del Inframundo', icon: 'clock', text: 'La profunda creencia de la sociedad maya era que deidades muy malvadas y criaturas pavorosas del temible Xibalbá (su aterrador e implacable inframundo) podían caminar sueltas con facilidad durante el Wayeb. Las leyendas aterradoras hablaban sobre entes traviesos e incluso deidades de la enfermedad deambulando sigilosamente. El más aterrador y destructivo de todos estos peligros acechantes era el temido colapso total, repentino y definitivo de todo el ordenado, brillante y hermoso universo.' },
      { label: 'El Dios Mam', icon: 'clock', text: 'Durante este extraño y peligroso periodo transicional, una deidad antigua muy peculiar llamada el Dios "Mam" (frecuentemente representado como un anciano anciano encorvado llevando una enorme caracola a cuestas) reinaba temporalmente como dueño indiscutible de estos cinco días misteriosos de transición. El dios Mam simbolizaba misteriosamente todo el peso insoportable de la edad extrema, el declive inminente y la inestabilidad total de toda la creación terrenal antes de que el poderoso Año Nuevo lograra reiniciarla majestuosamente.' },
    ],
    fact: 'Incluso en muchas comunidades mayas modernas e indígenas de la actualidad, que aún preservan sabiamente valiosas tradiciones orales milenarias de sus antepasados, persiste la profunda y respetuosa costumbre de mantenerse en un estado de extrema quietud, evitando tareas arduas y tomando muchas precauciones en los días finales que preceden al importante comienzo de un ciclo calendárico totalmente nuevo, honrando de manera continua y reverente esta fascinante herencia del Wayeb ancestral.',
  },
  {
    id: 'agricola-estacional',
    title: 'Calendario Agrícola',
    color: '#66BB6A',
    btnImage: '/assets/maya/infographic_m3/btn_agricola-estacional.jpg',
    image: '/assets/maya/infographic_m3/hero_agricola-estacional.jpg',
    content: [
      '¿Alguna vez te has preguntado cómo saben los agricultores de hoy exactamente cuándo sembrar sus deliciosas semillas para que crezcan fuertes y sanas? Los antiguos mayas no tenían estaciones del clima marcadas con colores en un refrigerador; su reloj agrícola, inmensamente preciso, brillante y vital, era nada menos que el magnífico calendario Haab. Este calendario no era un simple pasatiempo de sabios enclaustrados; era la herramienta de supervivencia más importante y esencial de toda su vibrante y floreciente civilización agraria.',
      'A diferencia de lugares que tienen una marcada primavera, verano, otoño e invierno (como en Europa o el norte de América), las selvas densas y las regiones tropicales de Mesoamérica, donde habitaban los formidables mayas, tienen esencialmente solo dos grandes estaciones principales: una estación seca, caracterizada por soles abrasadores, y una estación lluviosa, que trae consigo aguaceros torrenciales y tormentas tropicales inmensas. El Haab fue diseñado inteligentemente para sincronizarse y rastrear este vital ciclo climático de lluvia y sequía.',
      'El corazón y alma de la brillante cultura maya y de toda su comida nutritiva era (y todavía es) una parcela de cultivo especial e ingeniosa llamada "milpa". En la mágica milpa crecía el maíz dorado, frijoles nutritivos, calabazas enormes y picantes chiles de hermosos colores brillantes. Pero para que el maíz creciera grande y fuerte sin marchitarse miserablemente ni pudrirse en exceso, los campesinos dedicados tenían que sembrar las valiosas semillas exactamente justo antes de que comenzaran a caer del cielo espeso las fuertes y muy nutritivas lluvias tropicales.',
      'Los sabios sacerdotes, que a la vez eran astrónomos extremadamente dedicados y expertos, utilizaban los cielos celestiales inmensos y el intrincado calendario Haab para informar puntualmente y sin errores a todos los agricultores cuándo debían empezar a talar los espesos bosques, cuándo quemar inteligentemente la vegetación seca para crear valiosas cenizas fertilizantes, y en qué día preciso hundir reverentemente cada preciada semilla en la cálida tierra húmeda y perfumada.',
      'Una de las señales astronómicas maravillosas y brillantes que marcaban un hito crucial en el calendario agrícola del Haab era el espectacular "paso del sol por el cenit". Dos asombrosas veces al año, en las latitudes específicas y mágicas donde vivían los mayas, el enorme Sol brillante se posicionaba de forma asombrosa e impecable directamente, en línea recta vertical, sobre sus cabezas al radiante mediodía, de tal manera asombrosa que ¡absolutamente nada producía ningún tipo de sombra! Este fenómeno cósmico celestial anunciaba el inminente inicio inminente de la vital y muy aguardada temporada de lluvias abundantes.',
    ],
    expandables: [
      { label: 'El Maíz Sagrado', icon: 'atom', text: 'El maíz no era solo un alimento más en la mesa para quitar el hambre de los niños; era sagrado, reverenciado y adorado. Según el Popol Vuh, el asombroso, poético y muy hermoso libro de la creación cósmica de los mayas kiche\', los dioses formidables intentaron crear, con varios intentos fallidos, a la raza de los seres humanos usando barro húmedo e incluso madera crujiente sin lograr ningún éxito. ¡Pero finalmente lograron crear exitosamente a las personas verdaderas moldeándolas maravillosamente a partir de una masa perfecta de maíz blanco y maíz amarillo!' },
      { label: 'Las Pirámides y el Sol', icon: 'clock', text: 'Las colosales e imponentes pirámides mayas eran verdaderos y majestuosos instrumentos científicos astronómicos diseñados maravillosamente con el propósito de medir meticulosamente y observar profundamente el grandioso calendario solar agrícola Haab. Arquitectónicamente asombroso, las escalinatas empinadas y los edificios colindantes enteros en lugares famosos y muy turísticos como Chichén Itzá o Uaxactún estaban perfectamente alineados por genios constructores para marcar espectacularmente la majestuosa salida brillante y la espectacular puesta ardiente del sol durante los solsticios cruciales y los equinoccios de las siembras.' },
    ],
    fact: 'La tradicional, mágica, y muy inteligente técnica milenaria agrícola maya de la sagrada y biodiversa milpa es, sin duda alguna, una de las formas verdaderamente más sostenibles, maravillosas, y completamente ecológicas de agricultura de supervivencia jamás inventadas ingeniosamente en la vasta historia del planeta Tierra. Debido a que genialmente mezclan diferentes y nutritivos cultivos vigorosos todos creciendo juntos armoniosamente, se nutren mutuamente en el mismo pedazo de suelo sin agotar rápidamente a la naturaleza dadivosa.',
  },
  {
    id: 'comparacion-gregoriano',
    title: 'Comparación con el Gregoriano',
    color: '#42A5F5',
    btnImage: '/assets/maya/infographic_m3/btn_comparacion-gregoriano.jpg',
    image: '/assets/maya/infographic_m3/hero_comparacion-gregoriano.jpg',
    content: [
      'Tú conoces muy bien nuestro calendario, el cual usamos hoy en todo el mundo. Se llama "calendario gregoriano", bautizado de esa manera en honor al famoso e influyente Papa Gregorio XIII, quien lo introdujo oficial y firmemente en el lejano año 1582 en el continente europeo. ¿Pero sabías que si comparamos cuidadosamente este calendario que está colgado en las paredes de tu casa con el majestuoso calendario Haab de los sabios mayas, encontraremos cosas interesantísimas y enormes similitudes que te dejarán completamente boquiabierto de puro asombro?',
      'Ambos impresionantes y grandiosos calendarios comparten una característica asombrosa y fundamental que no puede pasarse por alto jamás: los dos increíblemente están basados en la misma duración asombrosamente precisa de 365 días. Esto no es solo una curiosa y divertida casualidad al azar, sino que demuestra firmemente de forma brillante que, sin importar cuán inmensamente lejos estuvieran y sin haberse conocido nunca jamás de frente, tanto los estudiosos mayas en América como los pensadores de Europa miraban el mismo hermoso firmamento estrellado y llegaron a conclusiones solares virtualmente idénticas.',
      'Sin embargo, hay una grandísima y muy fascinante diferencia matemática profunda entre los dos ingeniosos e históricos sistemas. Como probablemente sabrás, el asombroso viaje anual completo e incesante de nuestro planeta rocoso Tierra alrededor del resplandeciente Sol en el vasto espacio no tarda exactamente y con absoluta precisión trescientos sesenta y cinco días cerrados, sino más bien unos trescientos sesenta y cinco días brillantes con casi seis largas horas adicionales e invisibles que van sobrando a cada rato.',
      'En nuestro confiable calendario occidental gregoriano moderno, los matemáticos resolvieron mágicamente este molesto y frustrante "descuadre" sumando silenciosamente y de manera astuta un valioso "año bisiesto". Esto significa que añaden hábilmente un día extra completo (el famoso veintinueve de febrero) cada cuatro largos y laboriosos años. ¡Pero los mayas simplemente no lo hacían así! Ellos no insertaban arbitrariamente días adicionales fantasmas. Como resultado directo y fascinante, su majestuoso calendario inalterable Haab iba desfasándose y adelantándose muy sutilmente de las estaciones naturales reales en aproximadamente un día entero cada cuatro vigorosos años solares.',
      'Esto significaba que, asombrosamente y de una manera cíclica larguísima, el mes Haab mágico que originariamente correspondía sin falta a las torrenciales y vitales lluvias frescas, cientos y cientos de pacíficos años después caería impredecible y sorprendentemente en medio de la ardiente y polvorienta temporada extremadamente seca. ¡Pero ojo, esto no era para nada un terrible error! Los mayas, a diferencia de los europeos, valoraban inmensamente y amaban sinceramente el ciclo matemático abstracto puro y perfecto mucho más que mantener inamovibles o artificiales las estaciones climáticas en su rígido calendario solar de piedra tallada.',
    ],
    expandables: [
      { label: 'Una Visión Distinta del Tiempo', icon: 'clock', text: 'La fascinante, compleja y muy diferente solución astronómica que aplicaron los mayas de no utilizar en absoluto astutos años bisiestos artificiales no fue para nada producto de la torpeza o por la absoluta falta total de conocimientos matemáticos. Ellos realmente sabían perfectamente, al minuto exacto de manera prodigiosa, la discrepancia solar que existía. Pero decidieron profundamente que su magnífico ciclo inalterable de los días era algo tremendamente demasiado asombroso y sumamente sagrado para ser alterado torpemente con días sueltos e insertados artificialmente como hacemos nosotros ahora.' },
      { label: 'Correcciones Telescópicas', icon: 'clock', text: 'Para corregir maravillosamente, de manera astronómica y mágica su aparente y leve desviación paulatina observada respecto del sol real brillante, los sacerdotes mayas ingeniosos registraban y calculaban meticulosamente increíbles fechas matemáticas sumamente precisas en largos e inmensos monumentos altos de brillante piedra clara, donde documentaban pacientemente la enorme diferencia exacta, logrando mantener una sincronicidad estelar mental colosal y muy perfecta que duraría muchos miles y miles de esplendorosos y majestuosos años, superior a los cálculos griegos y romanos.' },
    ],
    fact: 'El valioso, histórico y muy famoso calendario gregoriano europeo en sí mismo fue en verdad una actualización y mejora directa al antiguo sistema juliano romano, porque increíblemente durante la época brillante del imponente Imperio Romano, ¡su propio calendario imperfecto también se había desfasado torpemente muchísimos e incontables días completos de manera muy bochornosa y cómica respecto al sol radiante primaveral y los equinoccios de las importantes festividades agrícolas y estacionales!',
  },
  {
    id: 'glifos-meses',
    title: 'Los Glifos',
    color: '#009688',
    btnImage: '/assets/maya/infographic_m3/btn_glifos-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_glifos-meses.jpg',
    content: [
      '¿Te imaginas si los meses vibrantes de tu año, en lugar de ser simplemente palabras aburridas e insípidas escritas con letras simples, fueran retratados mágicamente como obras de arte impresionantes, hermosas y extremadamente complejas talladas firmemente en colosales y sólidas piedras de las pirámides? Para los grandes y sabios constructores mayas, la escritura antigua era algo mucho más majestuoso y sagrado que una simple forma común de anotar notas fugaces. Escribían sus meses del majestuoso calendario Haab usando intrincados y deslumbrantes "glifos".',
      'Un impresionante glifo maya de un mes calendario no es en lo absoluto como nuestra aburrida letra "A" o la simple letra "B". Es casi siempre un diminuto cuadro hermoso, poético, enigmático y sumamente detallado que con frecuencia muestra de forma muy artística una fascinante cara humana muy estilizada, el perfil de un animal sagrado de la oscura y húmeda selva espesa, o elaborados diseños enrevesados, misteriosos y complejos de hermosos e importantísimos motivos de plantas vivas y del cosmos.',
      'Cada uno de los asombrosos dieciocho increíbles meses del Haab ostentaba y gozaba alegremente de su propio diseño jeroglífico principal único e inconfundible, al que se le acompañaba sabiamente con un número expresado brillantemente en formato de barras y puntos matemáticos. ¡Una simple pero poderosa barra horizontal representaba sólidamente un valor grande de cinco, y un punto redondo y diminuto representaba con firmeza el número de uno! Esto convertía magistralmente a la escritura maya de un mes en algo visualmente esplendoroso, hermoso, compacto, y lleno de información en piedra.',
      'Para los asombrosos antiguos escribas, pintar pacientemente los coloridos códices mayas invaluables usando delicados y finos pinceles de pelo de animal, o para los artesanos expertos que tallaban diestramente en la dura roca con rudimentarios cinceles, esculpir perfectamente la hermosa e intrincada forma redonda o cuadrada del sagrado glifo de un mes era considerado inmensamente un verdadero y gran honor respetado. Los hábiles escribas eran considerados grandes nobles mágicos porque poseían profundamente el misterioso don poderoso de cristalizar de forma material y palpable al mismísimo tiempo infinito.',
      'Si examinas detenidamente y de manera muy observadora uno de estos misteriosos símbolos del Haab tallado majestuosamente en piedra maciza, notarás brillantemente que casi siempre el glifo central del mes de veinte días reposaba dentro de una especie de gran escudo estilizado, marco decorativo o bello cartucho que funcionaba hermosamente como un pedestal. Era una manera espectacular de enmarcar y darle toda la gigantesca e inmensa importancia suprema de lo que significaba para ellos eternizar mágicamente este período cíclico y muy repetitivo fundamental en la historia interminable y majestuosa del cosmos infinito y misterioso.',
    ],
    expandables: [
      { label: 'El Arte de Escribir', icon: 'atom', text: 'La maravillosa escritura jeroglífica antigua maya es uno de los poquísimos sistemas de escritura originales, hermosos y verdaderamente independientes inventados desde cero y de forma completamente autónoma en la inmensa historia del planeta entero. Aprender mágicamente a tallar asombrosamente los perfectos e intrincados glifos requería una dedicación profunda y tomar arduos años interminables de paciente y riguroso estudio en exigentes y secretas escuelas especiales dedicadas exclusivamente al arte sagrado, místico, histórico, astronómico y poderoso de la caligrafía mesoamericana precolombina brillante.' },
      { label: 'Sobrevivientes de Papel', icon: 'clock', text: 'Desafortunadamente y con gran tristeza e inmensa pena, solamente tres hermosos libros mayas antiquísimos originales intactos e increíblemente valiosos (que son usualmente llamados "códices" desplegables hechos magistralmente de delgada pero muy resistente corteza de árbol de amate aplanada con paciencia) sobrevivieron trágicamente a la terrible e implacable destrucción devastadora provocada brutalmente por los furiosos y crueles conquistadores españoles al intentar erradicar toda la sabiduría inmensa y la cultura vibrante que los sabios locales habían documentado en ellos sobre los misterios de sus divinidades cósmicas y celestiales maravillosas.' },
    ],
    fact: 'Incluso tras innumerables y muchísimos e infatigables decenios de intenso y muy riguroso estudio mundial apasionado e inteligente, los glifos majestuosos mayas seguían siendo un gran misterio indescifrable total e inescrutable. ¡No fue asombrosamente hasta la tardía e interesante década de muchísimos hallazgos en mil novecientos ochenta que expertos brillantes, geniales investigadores y grandes epigrafistas astutos, lograron comprender verdaderamente y leer en voz alta de manera exitosa y sorprendente la inmensa mayoría abrumadora de estas antiguas e intrincadas piedras bellamente talladas por todo Centroamérica vibrante y misteriosa!',
  },
  {
    id: 'uso-cotidiano',
    title: 'Uso Cotidiano',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m3/btn_uso-cotidiano.jpg',
    image: '/assets/maya/infographic_m3/hero_uso-cotidiano.jpg',
    content: [
      'Lejos e independientemente de las altísimas, sagradas y ceremoniales pirámides resplandecientes colosales donde se hacían los cálculos celestes grandiosos, el calendario Haab era en realidad de una manera profunda el gigantesco reloj comunitario que de verdad latía y sincronizaba cada latido y el ritmo diario incesante, vigoroso e intenso de toda la fascinante y muy bulliciosa vida de la vibrante y grandiosa sociedad de la civilización maya. Para una familia regular de comerciantes o campesinos, conocer magistralmente la fecha exacta era una cosa verdaderamente clave.',
      'Imagina que tuvieras que organizar algo grandioso, como viajar a un mercado regional inmenso, gigantesco, vibrante y muy caótico. Los extensos e impresionantes mercados mesoamericanos mayas antiguos operaban a menudo, habitualmente y de una forma muy sincrónica e impresionante en determinados e invariables días fijos muy específicos de las largas semanas o de los perfectos y matemáticos meses de 20 días que estructuraban todo el Haab. Conocer profundamente qué fecha calendario era hoy, les permitía a las familias caminar larguísimas y arduas jornadas selva adentro para vender con total éxito brillantes plumas o cacao y saber que estarían repletos de bullicio alegre.',
      'El Haab también era increíblemente y absolutamente necesario para realizar grandiosos festivales y muy alegres celebraciones enormes llenas de colorido. Al igual que nosotros celebramos felices fiestas tradicionales como el Año Nuevo o fechas históricas patrióticas emocionantes a nivel global, los antiguos mayas usaban alegremente el calendario sagrado inalterable Haab para agendar grandes espectáculos festivos, ceremonias masivas de bailes, representaciones teatrales espectaculares con máscaras, deslumbrantes juegos de pelota intensos y grandiosos festines con tamales y rico chocolate picante con sabor a dioses en los gloriosos y muy bulliciosos centros de las ciudades prósperas.',
      'Además, este sistema brillante, preciso, imponente y meticuloso no se aplicaba y se usaba únicamente para fines meramente organizativos a nivel social amplio y comunitario extenso; formaba también parte indiscutible de todo el gigantesco, meticuloso e increíble sistema burocrático, histórico y administrativo monumental inigualable y necesario. Sirvió eficientemente y muy poderosamente como las valiosas "actas de nacimiento" públicas. Cuando el majestuoso hijo o hija amado de un gran rey o noble nacía resplandeciente, su fecha completa Haab y su nombre calendárico maravilloso se inscribían tallados profundamente con infinito cuidado devoto.',
      'Por lo tanto, este prodigioso e inteligente calendario de grandiosos trescientos sesenta y cinco días mágicos entrelazaba indisolublemente toda la realidad vibrante y deslumbrante de la enorme y mágica civilización ancestral. Así como tú asistes rigurosamente a la escuela feliz en tu horario y celebras con muchísimo entusiasmo festivo tu emocionante y dulce cumpleaños basándote estrictamente en un calendario de papel o digital de hoy, un vivaz y alegre niño maya organizaba, crecía y maravillaba completamente toda su increíble vida milenaria brillante y majestuosa inmerso profundamente en este perfecto, colosal e inmensamente asombroso ritmo cósmico majestuoso en la gran selva húmeda.',
    ],
    expandables: [
      { label: 'Nombres al Nacer', icon: 'clock', text: 'La sagrada y mágica fecha calendárica específica exacta en que nacía felizmente un bebé maya tenía una enorme importancia astrológica y personal inmensa, muy superior y poderosa. Muchos grandísimos reyes nobles y plebeyos humildes tomaban como su propio y querido nombre propio personal único e irrepetible el majestuoso y vibrante día místico asombroso particular exacto en el que habían respirado su mismísimo y valioso primer aliento vital de vida. Así se conectaba mágicamente el ser humano diminuto inmediatamente al gran compás cósmico.' },
      { label: 'La Vida del Campesino', icon: 'clock', text: 'Para las laboriosas, fuertes e increíblemente humildes inmensas familias unidas de campesinos arduos y respetables mayas, el asombroso Haab era verdaderamente la herramienta más importante de su hogar feliz de estuco y bajareque. Saber intuitivamente leer las estaciones solares era crucial para saber sin equivocarse ni fracasar cuándo hacer reparaciones astutas y necesarias a sus acogedoras e ingeniosas pequeñas casas techadas bellamente con anchas hojas secas trenzadas, o saber exactamente en qué momento brillante particular tejer con finas fibras preciosas o cazar pequeños e interesantes animales escurridizos nutritivos en la maleza.' },
    ],
    fact: 'Las maravillosas inscripciones gigantes, preciosas y sumamente ornamentadas que conmemoran majestuosamente eventos como coronaciones épicas y batallas memorables gloriosas, encontradas y descubiertas con asombro por arqueólogos en altas estelas espectaculares y pirámides mayas imponentes grandiosas y milenarias a lo ancho de Centroamérica mística, casi siempre combinaban orgullosamente, rigurosamente y majestuosamente una precisa fecha brillante Haab inmensa al ladito de muchísimos otros intrincados ciclos sagrados celestes infinitos, creando asombrosamente una "Cuenta Larga" histórica colosal de extrema y minuciosa exactitud perfecta inigualable mundialmente.',
  },
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
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

// ─── Time Travel Header ──────────────────────────────────────────────────────
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(253,216,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SOLAR DE 365 DÍAS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ─────────────────────────
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

// ─── Main Infographic Component ──────────────────────────────────────────────
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,15,10,0.85) 0%, rgba(25,20,15,0.8) 40%, rgba(20,15,10,0.88) 100%), url(/assets/maya/infographic_m3/bg_haab.jpg)',
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
              background: 'rgba(253,216,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(253,216,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FDD835', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos del Calendario Haab!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrónomo Maya
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
