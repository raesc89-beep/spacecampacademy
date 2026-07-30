'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ SVG Decorative Elements (Maya Haab themed) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Content Data Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
      'Imagina que quieres organizar una enorme fiesta de cumpleaÃƒÂ±os o un festival, pero no tienes un calendario en la pared ni un telÃƒÂ©fono celular para saber en quÃƒÂ© dÃƒÂ­a estÃƒÂ¡s. Ã‚Â¿CÃƒÂ³mo sabrÃƒÂ­as cuÃƒÂ¡ndo celebrar? Los antiguos mayas eran tan observadores e inteligentes que construyeron su propio sistema para medir el paso del tiempo. Crearon el "Haab", un calendario solar de exactamente trescientos sesenta y cinco dÃƒÂ­as. Era como un reloj majestuoso que guiaba la vida de toda una civilizaciÃƒÂ³n asombrosa.',
      'Al igual que nosotros agrupamos nuestros dÃƒÂ­as en meses, ellos tambiÃƒÂ©n lo hacÃƒÂ­an, pero con unas reglas matemÃƒÂ¡ticas fascinantes y muy diferentes a las nuestras. En lugar de tener doce meses desiguales que a veces tienen treinta dÃƒÂ­as, a veces treinta y uno y a veces veintiocho (como ocurre con nuestro febrero), los mayas decidieron ser muchÃƒÂ­simo mÃƒÂ¡s organizados. Dividieron su aÃƒÂ±o de manera simÃƒÂ©trica en dieciocho meses perfectos. Cada uno de esos dieciocho meses tenÃƒÂ­a exactamente veinte dÃƒÂ­as.',
      'Si eres un genio de las matemÃƒÂ¡ticas y multiplicas dieciocho meses por veinte dÃƒÂ­as, te darÃƒÂ¡s cuenta de que el resultado es trescientos sesenta. Es decir, casi todo el aÃƒÂ±o estaba organizado en cajas impecables de veinte dÃƒÂ­as cada una. Pero claro, tÃƒÂº ya sabes que un aÃƒÂ±o solar verdadero tiene trescientos sesenta y cinco dÃƒÂ­as, Ã‚Â¡no trescientos sesenta! Entonces, Ã‚Â¿quÃƒÂ© hacÃƒÂ­an con los cinco dÃƒÂ­as que faltaban? Los mayas no se olvidaron de ellos; los reservaron para el final.',
      'AÃƒÂ±adieron un mes especial, sÃƒÂºper pequeÃƒÂ±ito, justo al terminar su ciclo regular. Este "mini-mes" de solo cinco dÃƒÂ­as se llamaba "Wayeb". Con esto, la cuenta llegaba perfectamente a trescientos sesenta y cinco dÃƒÂ­as de forma exacta y elegante. Esta estructura matemÃƒÂ¡tica de "dieciocho por veinte mÃƒÂ¡s cinco" era tan precisa y constante que les permitÃƒÂ­a planificar todo meticulosamente, desde sus ceremonias secretas en templos gigantescos hasta el mejor momento para cultivar su milpa.',
      'Piensa en el calendario Haab como los engranajes de un reloj de piedra colosal. Cada dÃƒÂ­a tenÃƒÂ­a un nÃƒÂºmero del cero al diecinueve, y cada mes tenÃƒÂ­a su propio nombre. El cero era un nÃƒÂºmero que los mayas descubrieron e implementaron siglos antes que los europeos. Por eso, el primer dÃƒÂ­a del mes no era el "dÃƒÂ­a uno", sino el "asiento", representando el cero. AsÃƒÂ­, el tiempo fluÃƒÂ­a de forma cÃƒÂ­clica y matemÃƒÂ¡tica en esta increÃƒÂ­ble civilizaciÃƒÂ³n que observaba los cielos con reverencia.',
    ],
    expandables: [
      { label: 'Las MatemÃƒÂ¡ticas del Tiempo', icon: 'clock', text: 'Los mayas usaban un sistema matemÃƒÂ¡tico vigesimal, lo que significa que contaban basÃƒÂ¡ndose en el nÃƒÂºmero veinte, usando los dedos de las manos y de los pies. A diferencia de nuestro sistema decimal que se basa en el diez. Por eso, era completamente lÃƒÂ³gico e instintivo para ellos crear meses de exactamente veinte dÃƒÂ­as. Todo en su calendario encajaba perfectamente con su forma natural de contar y de entender las grandes matemÃƒÂ¡ticas cÃƒÂ³smicas.' },
      { label: 'El Ciclo Sin Fin', icon: 'clock', text: 'A diferencia de nosotros, que contamos los aÃƒÂ±os de forma lineal hacia el infinito, los mayas veÃƒÂ­an el tiempo como ruedas engranadas girando eternamente. El Haab se combinaba con otro calendario sagrado de 260 dÃƒÂ­as llamado Tzolkin, formando una gran Rueda CalendÃƒÂ¡rica. Pasaban exactamente cincuenta y dos aÃƒÂ±os solares de 365 dÃƒÂ­as antes de que una misma fecha exacta se volviera a repetir de manera idÃƒÂ©ntica. Ã‚Â¡Era como esperar 52 aÃƒÂ±os para tu verdadero cumpleaÃƒÂ±os cÃƒÂ³smico!' },
    ],
    fact: 'Ã‚Â¿SabÃƒÂ­as que los astrÃƒÂ³nomos mayas, observando pacientemente el cielo desde lo alto de sus pirÃƒÂ¡mides escalonadas sin ayuda de telescopios ni computadoras, calcularon la duraciÃƒÂ³n exacta del aÃƒÂ±o solar con un margen de error verdaderamente minÃƒÂºsculo? Su nivel de observaciÃƒÂ³n empÃƒÂ­rica del cielo nocturno y diurno era tan extremadamente preciso que sus vastos conocimientos astronÃƒÂ³micos rivalizaban e incluso superaban en exactitud a los cÃƒÂ¡lculos de muchÃƒÂ­simos cientÃƒÂ­ficos europeos renombrados de esa misma ÃƒÂ©poca histÃƒÂ³rica.',
  },
  {
    id: 'dieciocho-meses',
    title: 'Los 18 Meses',
    color: '#795548',
    btnImage: '/assets/maya/infographic_m3/btn_dieciocho-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_dieciocho-meses.jpg',
    content: [
      'Piensa en los nombres de nuestros meses actuales: enero, febrero, marzo... La mayorÃƒÂ­a de ellos provienen de antiguos dioses o nÃƒÂºmeros romanos que ya casi nadie recuerda en su vida diaria. Sin embargo, para la antigua civilizaciÃƒÂ³n maya, los nombres de sus dieciocho meses tenÃƒÂ­an un significado sÃƒÂºper prÃƒÂ¡ctico, profundamente ecolÃƒÂ³gico y completamente conectado con la hermosa naturaleza vibrante que los rodeaba en las espesas selvas y altas montaÃƒÂ±as de MesoamÃƒÂ©rica.',
      'Cada uno de los meses del Haab, que recordamos duraban exactamente veinte dÃƒÂ­as, tenÃƒÂ­a nombres fascinantes como Pop, Wo, Sip, Sotz, Sek, Xul, Yaxkin, Mol, Chen, Yax, Sak, Keh, Mak, Kankin, Muwan, Pax, Kayab y Kumku. Pronunciarlos es como escuchar un eco distante de la historia antigua. En lugar de celebrar a emperadores distantes, estos nombres estaban estrechamente vinculados a las actividades agrÃƒÂ­colas, a los animales sagrados de la selva y a los ciclos importantes de las lluvias.',
      'Por ejemplo, el mes llamado "Sotz" significa "murciÃƒÂ©lago". Durante esta ÃƒÂ©poca particular del aÃƒÂ±o solar maya, estos animales fascinantes e incomprendidos eran mÃƒÂ¡s activos o visibles, y los mayas realizaban ceremonias que honraban su papel fundamental como polinizadores en el bosque tropical oscuro. El mes "Yaxkin", que puede traducirse poÃƒÂ©ticamente como "sol nuevo" o "primer sol", marcaba el inicio mÃƒÂ¡gico de la resplandeciente temporada seca tras las lluvias intensas y renovadoras.',
      'Estos meses no eran solo palabras vacÃƒÂ­as en un registro de piedra; funcionaban como una verdadera guÃƒÂ­a de supervivencia y prosperidad comunitaria. Le decÃƒÂ­an a los sabios agricultores y a los nobles gobernantes exactamente cuÃƒÂ¡ndo la tierra estarÃƒÂ­a lo suficientemente hÃƒÂºmeda y receptiva para sembrar las semillas, cuÃƒÂ¡ndo el sol abrazador secarÃƒÂ­a los campos, o cuÃƒÂ¡ndo los animales de caza estarÃƒÂ­an migrando abundantemente a travÃƒÂ©s de los diversos territorios de los reinos mayas.',
      'Es como si su calendario fuera un manual de instrucciones gigantesco escrito por el universo y traducido por los astrÃƒÂ³nomos para toda su sociedad. Hoy, nosotros consultamos aplicaciones meteorolÃƒÂ³gicas sofisticadas en nuestros telÃƒÂ©fonos para saber si va a llover, pero los mayas solo tenÃƒÂ­an que mirar su intrincado calendario Haab para comprender perfectamente en quÃƒÂ© momento mÃƒÂ¡gico e importante del ciclo natural eterno se encontraban parados junto a su familia.',
    ],
    expandables: [
      { label: 'El Mes Pop', icon: 'atom', text: 'El mes "Pop" es especialmente interesante porque literalmente significa "estera" o "petate", que era un tapete tejido donde se sentaban los reyes y gobernantes mayas mÃƒÂ¡s poderosos. Este mes marcaba majestuosamente el mismÃƒÂ­simo primer dÃƒÂ­a del AÃƒÂ±o Nuevo en el extenso calendario Haab. En esta fecha tan importante, se encendÃƒÂ­an fuegos nuevos en los majestuosos templos y las comunidades limpiaban a fondo todas sus casas para dar la bienvenida triunfal a un ciclo fresco, renovado y brillante.' },
      { label: 'Ceremonias del Fuego', icon: 'clock', text: 'Durante el mes mÃƒÂ­stico llamado "Mak", se realizaban extensas e importantes ceremonias maravillosas en las que los sabios sacerdotes extinguÃƒÂ­an los fuegos en las plazas principales de las ciudades mayas grandiosas. Esta ceremonia simbolizaba profundamente el final de la ardiente temporada de sequÃƒÂ­a y era una forma mÃƒÂ­stica de pedir a las nubes tormentosas y a los dioses benÃƒÂ©volos que trajeran las esperadas lluvias fertilizantes necesarias para que florecieran abundantemente los campos de maÃƒÂ­z verde.' },
    ],
    fact: 'Un dato asombroso sobre la escritura sagrada maya es que muchos de estos nombres de meses tienen diferentes interpretaciones fascinantes dependiendo de la ciudad o regiÃƒÂ³n maya especÃƒÂ­fica, ya que los antiguos mayas hablaban mÃƒÂ¡s de treinta idiomas distintos. Sin embargo, a pesar de las ligeras diferencias en la pronunciaciÃƒÂ³n diaria o la variaciÃƒÂ³n dialectal local, los majestuosos sÃƒÂ­mbolos jeroglÃƒÂ­ficos tallados en la piedra sÃƒÂ³lida seguÃƒÂ­an significando de forma universal exactamente lo mismo a lo largo y ancho de todos sus dominios.',
  },
  {
    id: 'wayeb-peligroso',
    title: 'Los 5 DÃƒÂ­as Wayeb',
    color: '#D84315',
    btnImage: '/assets/maya/infographic_m3/btn_wayeb-peligroso.jpg',
    image: '/assets/maya/infographic_m3/hero_wayeb-peligroso.jpg',
    content: [
      'Ã‚Â¿Te has despertado alguna vez sintiendo que hoy va a ser un dÃƒÂ­a extraÃƒÂ±o, donde todo parece estar un poco al revÃƒÂ©s o fuera de lugar? Ahora imagina sentir esa tensiÃƒÂ³n y preocupaciÃƒÂ³n no por un solo dÃƒÂ­a, sino durante cinco dÃƒÂ­as enteros, y que todos tus vecinos y familiares sientan exactamente lo mismo al mismo tiempo. AsÃƒÂ­ es como se sentÃƒÂ­an los antiguos mayas durante los misteriosos dÃƒÂ­as "Wayeb". Estos cinco dÃƒÂ­as adicionales al final de sus dieciocho meses sumaban exactamente el total de 365 dÃƒÂ­as del aÃƒÂ±o.',
      'Pero el Wayeb no era un momento de celebraciÃƒÂ³n ni de alegrÃƒÂ­a vacacional. Ã‚Â¡Todo lo contrario! Los mayas consideraban que estos cinco dÃƒÂ­as residuales eran profundamente peligrosos y estaban cargados de una energÃƒÂ­a incierta, muy perjudicial o de mala suerte. Era un perÃƒÂ­odo transitorio donde el orden normal, predecible y seguro del mundo se detenÃƒÂ­a por completo, creando una brecha espeluznante en el tiempo seguro. Durante este extraÃƒÂ±o hueco temporal intermedio, las pesadas barreras protectoras entre nuestro cÃƒÂ¡lido mundo terrenal y el oscuro inframundo se debilitaban y se volvÃƒÂ­an extremadamente delgadas.',
      'A estos misteriosos dÃƒÂ­as se les llamaba a menudo los "dÃƒÂ­as sin nombre", aunque formaban parte de un ciclo. Eran vistos como portales oscuros a travÃƒÂ©s de los cuales seres monstruosos, fantasmas siniestros y energÃƒÂ­as de mala fortuna podÃƒÂ­an cruzar libremente para caminar furtivamente entre los humanos temerosos. Por eso, durante el peligroso Wayeb, toda la actividad vigorosa habitual de las bulliciosas y coloridas ciudades mayas se congelaba casi por completo en un silencio solemne e incÃƒÂ³modo. ',
      'Para mantenerse completamente a salvo de la desgracia o la fatalidad, las personas comunes se quedaban escondidas dentro de sus casas, hablando en voz baja. Se abstenÃƒÂ­an de realizar trabajos fÃƒÂ­sicos duros, evitaban emprender viajes largos por los peligrosos senderos de la selva exuberante, e increÃƒÂ­blemente, incluso intentaban no lavarse el cabello, no barrer sus patios y no encender fuegos ruidosos. Ã‚Â¡Imagina no poder ducharte ni hacer ruido durante cinco largos dÃƒÂ­as porque el universo entero estÃƒÂ¡ atravesando un momento sÃƒÂºper vulnerable y mÃƒÂ­stico!',
      'Sin embargo, no todos estaban paralizados por el miedo en la oscuridad. Los sabios sacerdotes y chamanes experimentados trabajaban incansablemente dÃƒÂ­a y noche, realizando rituales intensos de extrema protecciÃƒÂ³n en lo alto de las majestuosas pirÃƒÂ¡mides humeantes de copal fragante. Estos ritos sagrados ayudaban mÃƒÂ¡gicamente a alejar las fuerzas perversas incontrolables, garantizando exitosamente que el frÃƒÂ¡gil universo no colapsara en el caos, asegurando que el sol volviera a brillar triunfal y ordenado en el mÃƒÂ¡gico y prÃƒÂ³spero AÃƒÂ±o Nuevo inminente.',
    ],
    expandables: [
      { label: 'Criaturas del Inframundo', icon: 'clock', text: 'La profunda creencia de la sociedad maya era que deidades muy malvadas y criaturas pavorosas del temible XibalbÃƒÂ¡ (su aterrador e implacable inframundo) podÃƒÂ­an caminar sueltas con facilidad durante el Wayeb. Las leyendas aterradoras hablaban sobre entes traviesos e incluso deidades de la enfermedad deambulando sigilosamente. El mÃƒÂ¡s aterrador y destructivo de todos estos peligros acechantes era el temido colapso total, repentino y definitivo de todo el ordenado, brillante y hermoso universo.' },
      { label: 'El Dios Mam', icon: 'clock', text: 'Durante este extraÃƒÂ±o y peligroso periodo transicional, una deidad antigua muy peculiar llamada el Dios "Mam" (frecuentemente representado como un anciano anciano encorvado llevando una enorme caracola a cuestas) reinaba temporalmente como dueÃƒÂ±o indiscutible de estos cinco dÃƒÂ­as misteriosos de transiciÃƒÂ³n. El dios Mam simbolizaba misteriosamente todo el peso insoportable de la edad extrema, el declive inminente y la inestabilidad total de toda la creaciÃƒÂ³n terrenal antes de que el poderoso AÃƒÂ±o Nuevo lograra reiniciarla majestuosamente.' },
    ],
    fact: 'Incluso en muchas comunidades mayas modernas e indÃƒÂ­genas de la actualidad, que aÃƒÂºn preservan sabiamente valiosas tradiciones orales milenarias de sus antepasados, persiste la profunda y respetuosa costumbre de mantenerse en un estado de extrema quietud, evitando tareas arduas y tomando muchas precauciones en los dÃƒÂ­as finales que preceden al importante comienzo de un ciclo calendÃƒÂ¡rico totalmente nuevo, honrando de manera continua y reverente esta fascinante herencia del Wayeb ancestral.',
  },
  {
    id: 'agricola-estacional',
    title: 'Calendario AgrÃƒÂ­cola',
    color: '#66BB6A',
    btnImage: '/assets/maya/infographic_m3/btn_agricola-estacional.jpg',
    image: '/assets/maya/infographic_m3/hero_agricola-estacional.jpg',
    content: [
      'Ã‚Â¿Alguna vez te has preguntado cÃƒÂ³mo saben los agricultores de hoy exactamente cuÃƒÂ¡ndo sembrar sus deliciosas semillas para que crezcan fuertes y sanas? Los antiguos mayas no tenÃƒÂ­an estaciones del clima marcadas con colores en un refrigerador; su reloj agrÃƒÂ­cola, inmensamente preciso, brillante y vital, era nada menos que el magnÃƒÂ­fico calendario Haab. Este calendario no era un simple pasatiempo de sabios enclaustrados; era la herramienta de supervivencia mÃƒÂ¡s importante y esencial de toda su vibrante y floreciente civilizaciÃƒÂ³n agraria.',
      'A diferencia de lugares que tienen una marcada primavera, verano, otoÃƒÂ±o e invierno (como en Europa o el norte de AmÃƒÂ©rica), las selvas densas y las regiones tropicales de MesoamÃƒÂ©rica, donde habitaban los formidables mayas, tienen esencialmente solo dos grandes estaciones principales: una estaciÃƒÂ³n seca, caracterizada por soles abrasadores, y una estaciÃƒÂ³n lluviosa, que trae consigo aguaceros torrenciales y tormentas tropicales inmensas. El Haab fue diseÃƒÂ±ado inteligentemente para sincronizarse y rastrear este vital ciclo climÃƒÂ¡tico de lluvia y sequÃƒÂ­a.',
      'El corazÃƒÂ³n y alma de la brillante cultura maya y de toda su comida nutritiva era (y todavÃƒÂ­a es) una parcela de cultivo especial e ingeniosa llamada "milpa". En la mÃƒÂ¡gica milpa crecÃƒÂ­a el maÃƒÂ­z dorado, frijoles nutritivos, calabazas enormes y picantes chiles de hermosos colores brillantes. Pero para que el maÃƒÂ­z creciera grande y fuerte sin marchitarse miserablemente ni pudrirse en exceso, los campesinos dedicados tenÃƒÂ­an que sembrar las valiosas semillas exactamente justo antes de que comenzaran a caer del cielo espeso las fuertes y muy nutritivas lluvias tropicales.',
      'Los sabios sacerdotes, que a la vez eran astrÃƒÂ³nomos extremadamente dedicados y expertos, utilizaban los cielos celestiales inmensos y el intrincado calendario Haab para informar puntualmente y sin errores a todos los agricultores cuÃƒÂ¡ndo debÃƒÂ­an empezar a talar los espesos bosques, cuÃƒÂ¡ndo quemar inteligentemente la vegetaciÃƒÂ³n seca para crear valiosas cenizas fertilizantes, y en quÃƒÂ© dÃƒÂ­a preciso hundir reverentemente cada preciada semilla en la cÃƒÂ¡lida tierra hÃƒÂºmeda y perfumada.',
      'Una de las seÃƒÂ±ales astronÃƒÂ³micas maravillosas y brillantes que marcaban un hito crucial en el calendario agrÃƒÂ­cola del Haab era el espectacular "paso del sol por el cenit". Dos asombrosas veces al aÃƒÂ±o, en las latitudes especÃƒÂ­ficas y mÃƒÂ¡gicas donde vivÃƒÂ­an los mayas, el enorme Sol brillante se posicionaba de forma asombrosa e impecable directamente, en lÃƒÂ­nea recta vertical, sobre sus cabezas al radiante mediodÃƒÂ­a, de tal manera asombrosa que Ã‚Â¡absolutamente nada producÃƒÂ­a ningÃƒÂºn tipo de sombra! Este fenÃƒÂ³meno cÃƒÂ³smico celestial anunciaba el inminente inicio inminente de la vital y muy aguardada temporada de lluvias abundantes.',
    ],
    expandables: [
      { label: 'El MaÃƒÂ­z Sagrado', icon: 'atom', text: 'El maÃƒÂ­z no era solo un alimento mÃƒÂ¡s en la mesa para quitar el hambre de los niÃƒÂ±os; era sagrado, reverenciado y adorado. SegÃƒÂºn el Popol Vuh, el asombroso, poÃƒÂ©tico y muy hermoso libro de la creaciÃƒÂ³n cÃƒÂ³smica de los mayas kiche\', los dioses formidables intentaron crear, con varios intentos fallidos, a la raza de los seres humanos usando barro hÃƒÂºmedo e incluso madera crujiente sin lograr ningÃƒÂºn ÃƒÂ©xito. Ã‚Â¡Pero finalmente lograron crear exitosamente a las personas verdaderas moldeÃƒÂ¡ndolas maravillosamente a partir de una masa perfecta de maÃƒÂ­z blanco y maÃƒÂ­z amarillo!' },
      { label: 'Las PirÃƒÂ¡mides y el Sol', icon: 'clock', text: 'Las colosales e imponentes pirÃƒÂ¡mides mayas eran verdaderos y majestuosos instrumentos cientÃƒÂ­ficos astronÃƒÂ³micos diseÃƒÂ±ados maravillosamente con el propÃƒÂ³sito de medir meticulosamente y observar profundamente el grandioso calendario solar agrÃƒÂ­cola Haab. ArquitectÃƒÂ³nicamente asombroso, las escalinatas empinadas y los edificios colindantes enteros en lugares famosos y muy turÃƒÂ­sticos como ChichÃƒÂ©n ItzÃƒÂ¡ o UaxactÃƒÂºn estaban perfectamente alineados por genios constructores para marcar espectacularmente la majestuosa salida brillante y la espectacular puesta ardiente del sol durante los solsticios cruciales y los equinoccios de las siembras.' },
    ],
    fact: 'La tradicional, mÃƒÂ¡gica, y muy inteligente tÃƒÂ©cnica milenaria agrÃƒÂ­cola maya de la sagrada y biodiversa milpa es, sin duda alguna, una de las formas verdaderamente mÃƒÂ¡s sostenibles, maravillosas, y completamente ecolÃƒÂ³gicas de agricultura de supervivencia jamÃƒÂ¡s inventadas ingeniosamente en la vasta historia del planeta Tierra. Debido a que genialmente mezclan diferentes y nutritivos cultivos vigorosos todos creciendo juntos armoniosamente, se nutren mutuamente en el mismo pedazo de suelo sin agotar rÃƒÂ¡pidamente a la naturaleza dadivosa.',
  },
  {
    id: 'comparacion-gregoriano',
    title: 'ComparaciÃƒÂ³n con el Gregoriano',
    color: '#42A5F5',
    btnImage: '/assets/maya/infographic_m3/btn_comparacion-gregoriano.jpg',
    image: '/assets/maya/infographic_m3/hero_comparacion-gregoriano.jpg',
    content: [
      'TÃƒÂº conoces muy bien nuestro calendario, el cual usamos hoy en todo el mundo. Se llama "calendario gregoriano", bautizado de esa manera en honor al famoso e influyente Papa Gregorio XIII, quien lo introdujo oficial y firmemente en el lejano aÃƒÂ±o 1582 en el continente europeo. Ã‚Â¿Pero sabÃƒÂ­as que si comparamos cuidadosamente este calendario que estÃƒÂ¡ colgado en las paredes de tu casa con el majestuoso calendario Haab de los sabios mayas, encontraremos cosas interesantÃƒÂ­simas y enormes similitudes que te dejarÃƒÂ¡n completamente boquiabierto de puro asombro?',
      'Ambos impresionantes y grandiosos calendarios comparten una caracterÃƒÂ­stica asombrosa y fundamental que no puede pasarse por alto jamÃƒÂ¡s: los dos increÃƒÂ­blemente estÃƒÂ¡n basados en la misma duraciÃƒÂ³n asombrosamente precisa de 365 dÃƒÂ­as. Esto no es solo una curiosa y divertida casualidad al azar, sino que demuestra firmemente de forma brillante que, sin importar cuÃƒÂ¡n inmensamente lejos estuvieran y sin haberse conocido nunca jamÃƒÂ¡s de frente, tanto los estudiosos mayas en AmÃƒÂ©rica como los pensadores de Europa miraban el mismo hermoso firmamento estrellado y llegaron a conclusiones solares virtualmente idÃƒÂ©nticas.',
      'Sin embargo, hay una grandÃƒÂ­sima y muy fascinante diferencia matemÃƒÂ¡tica profunda entre los dos ingeniosos e histÃƒÂ³ricos sistemas. Como probablemente sabrÃƒÂ¡s, el asombroso viaje anual completo e incesante de nuestro planeta rocoso Tierra alrededor del resplandeciente Sol en el vasto espacio no tarda exactamente y con absoluta precisiÃƒÂ³n trescientos sesenta y cinco dÃƒÂ­as cerrados, sino mÃƒÂ¡s bien unos trescientos sesenta y cinco dÃƒÂ­as brillantes con casi seis largas horas adicionales e invisibles que van sobrando a cada rato.',
      'En nuestro confiable calendario occidental gregoriano moderno, los matemÃƒÂ¡ticos resolvieron mÃƒÂ¡gicamente este molesto y frustrante "descuadre" sumando silenciosamente y de manera astuta un valioso "aÃƒÂ±o bisiesto". Esto significa que aÃƒÂ±aden hÃƒÂ¡bilmente un dÃƒÂ­a extra completo (el famoso veintinueve de febrero) cada cuatro largos y laboriosos aÃƒÂ±os. Ã‚Â¡Pero los mayas simplemente no lo hacÃƒÂ­an asÃƒÂ­! Ellos no insertaban arbitrariamente dÃƒÂ­as adicionales fantasmas. Como resultado directo y fascinante, su majestuoso calendario inalterable Haab iba desfasÃƒÂ¡ndose y adelantÃƒÂ¡ndose muy sutilmente de las estaciones naturales reales en aproximadamente un dÃƒÂ­a entero cada cuatro vigorosos aÃƒÂ±os solares.',
      'Esto significaba que, asombrosamente y de una manera cÃƒÂ­clica larguÃƒÂ­sima, el mes Haab mÃƒÂ¡gico que originariamente correspondÃƒÂ­a sin falta a las torrenciales y vitales lluvias frescas, cientos y cientos de pacÃƒÂ­ficos aÃƒÂ±os despuÃƒÂ©s caerÃƒÂ­a impredecible y sorprendentemente en medio de la ardiente y polvorienta temporada extremadamente seca. Ã‚Â¡Pero ojo, esto no era para nada un terrible error! Los mayas, a diferencia de los europeos, valoraban inmensamente y amaban sinceramente el ciclo matemÃƒÂ¡tico abstracto puro y perfecto mucho mÃƒÂ¡s que mantener inamovibles o artificiales las estaciones climÃƒÂ¡ticas en su rÃƒÂ­gido calendario solar de piedra tallada.',
    ],
    expandables: [
      { label: 'Una VisiÃƒÂ³n Distinta del Tiempo', icon: 'clock', text: 'La fascinante, compleja y muy diferente soluciÃƒÂ³n astronÃƒÂ³mica que aplicaron los mayas de no utilizar en absoluto astutos aÃƒÂ±os bisiestos artificiales no fue para nada producto de la torpeza o por la absoluta falta total de conocimientos matemÃƒÂ¡ticos. Ellos realmente sabÃƒÂ­an perfectamente, al minuto exacto de manera prodigiosa, la discrepancia solar que existÃƒÂ­a. Pero decidieron profundamente que su magnÃƒÂ­fico ciclo inalterable de los dÃƒÂ­as era algo tremendamente demasiado asombroso y sumamente sagrado para ser alterado torpemente con dÃƒÂ­as sueltos e insertados artificialmente como hacemos nosotros ahora.' },
      { label: 'Correcciones TelescÃƒÂ³picas', icon: 'clock', text: 'Para corregir maravillosamente, de manera astronÃƒÂ³mica y mÃƒÂ¡gica su aparente y leve desviaciÃƒÂ³n paulatina observada respecto del sol real brillante, los sacerdotes mayas ingeniosos registraban y calculaban meticulosamente increÃƒÂ­bles fechas matemÃƒÂ¡ticas sumamente precisas en largos e inmensos monumentos altos de brillante piedra clara, donde documentaban pacientemente la enorme diferencia exacta, logrando mantener una sincronicidad estelar mental colosal y muy perfecta que durarÃƒÂ­a muchos miles y miles de esplendorosos y majestuosos aÃƒÂ±os, superior a los cÃƒÂ¡lculos griegos y romanos.' },
    ],
    fact: 'El valioso, histÃƒÂ³rico y muy famoso calendario gregoriano europeo en sÃƒÂ­ mismo fue en verdad una actualizaciÃƒÂ³n y mejora directa al antiguo sistema juliano romano, porque increÃƒÂ­blemente durante la ÃƒÂ©poca brillante del imponente Imperio Romano, Ã‚Â¡su propio calendario imperfecto tambiÃƒÂ©n se habÃƒÂ­a desfasado torpemente muchÃƒÂ­simos e incontables dÃƒÂ­as completos de manera muy bochornosa y cÃƒÂ³mica respecto al sol radiante primaveral y los equinoccios de las importantes festividades agrÃƒÂ­colas y estacionales!',
  },
  {
    id: 'glifos-meses',
    title: 'Los Glifos',
    color: '#009688',
    btnImage: '/assets/maya/infographic_m3/btn_glifos-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_glifos-meses.jpg',
    content: [
      'Ã‚Â¿Te imaginas si los meses vibrantes de tu aÃƒÂ±o, en lugar de ser simplemente palabras aburridas e insÃƒÂ­pidas escritas con letras simples, fueran retratados mÃƒÂ¡gicamente como obras de arte impresionantes, hermosas y extremadamente complejas talladas firmemente en colosales y sÃƒÂ³lidas piedras de las pirÃƒÂ¡mides? Para los grandes y sabios constructores mayas, la escritura antigua era algo mucho mÃƒÂ¡s majestuoso y sagrado que una simple forma comÃƒÂºn de anotar notas fugaces. EscribÃƒÂ­an sus meses del majestuoso calendario Haab usando intrincados y deslumbrantes "glifos".',
      'Un impresionante glifo maya de un mes calendario no es en lo absoluto como nuestra aburrida letra "A" o la simple letra "B". Es casi siempre un diminuto cuadro hermoso, poÃƒÂ©tico, enigmÃƒÂ¡tico y sumamente detallado que con frecuencia muestra de forma muy artÃƒÂ­stica una fascinante cara humana muy estilizada, el perfil de un animal sagrado de la oscura y hÃƒÂºmeda selva espesa, o elaborados diseÃƒÂ±os enrevesados, misteriosos y complejos de hermosos e importantÃƒÂ­simos motivos de plantas vivas y del cosmos.',
      'Cada uno de los asombrosos dieciocho increÃƒÂ­bles meses del Haab ostentaba y gozaba alegremente de su propio diseÃƒÂ±o jeroglÃƒÂ­fico principal ÃƒÂºnico e inconfundible, al que se le acompaÃƒÂ±aba sabiamente con un nÃƒÂºmero expresado brillantemente en formato de barras y puntos matemÃƒÂ¡ticos. Ã‚Â¡Una simple pero poderosa barra horizontal representaba sÃƒÂ³lidamente un valor grande de cinco, y un punto redondo y diminuto representaba con firmeza el nÃƒÂºmero de uno! Esto convertÃƒÂ­a magistralmente a la escritura maya de un mes en algo visualmente esplendoroso, hermoso, compacto, y lleno de informaciÃƒÂ³n en piedra.',
      'Para los asombrosos antiguos escribas, pintar pacientemente los coloridos cÃƒÂ³dices mayas invaluables usando delicados y finos pinceles de pelo de animal, o para los artesanos expertos que tallaban diestramente en la dura roca con rudimentarios cinceles, esculpir perfectamente la hermosa e intrincada forma redonda o cuadrada del sagrado glifo de un mes era considerado inmensamente un verdadero y gran honor respetado. Los hÃƒÂ¡biles escribas eran considerados grandes nobles mÃƒÂ¡gicos porque poseÃƒÂ­an profundamente el misterioso don poderoso de cristalizar de forma material y palpable al mismÃƒÂ­simo tiempo infinito.',
      'Si examinas detenidamente y de manera muy observadora uno de estos misteriosos sÃƒÂ­mbolos del Haab tallado majestuosamente en piedra maciza, notarÃƒÂ¡s brillantemente que casi siempre el glifo central del mes de veinte dÃƒÂ­as reposaba dentro de una especie de gran escudo estilizado, marco decorativo o bello cartucho que funcionaba hermosamente como un pedestal. Era una manera espectacular de enmarcar y darle toda la gigantesca e inmensa importancia suprema de lo que significaba para ellos eternizar mÃƒÂ¡gicamente este perÃƒÂ­odo cÃƒÂ­clico y muy repetitivo fundamental en la historia interminable y majestuosa del cosmos infinito y misterioso.',
    ],
    expandables: [
      { label: 'El Arte de Escribir', icon: 'atom', text: 'La maravillosa escritura jeroglÃƒÂ­fica antigua maya es uno de los poquÃƒÂ­simos sistemas de escritura originales, hermosos y verdaderamente independientes inventados desde cero y de forma completamente autÃƒÂ³noma en la inmensa historia del planeta entero. Aprender mÃƒÂ¡gicamente a tallar asombrosamente los perfectos e intrincados glifos requerÃƒÂ­a una dedicaciÃƒÂ³n profunda y tomar arduos aÃƒÂ±os interminables de paciente y riguroso estudio en exigentes y secretas escuelas especiales dedicadas exclusivamente al arte sagrado, mÃƒÂ­stico, histÃƒÂ³rico, astronÃƒÂ³mico y poderoso de la caligrafÃƒÂ­a mesoamericana precolombina brillante.' },
      { label: 'Sobrevivientes de Papel', icon: 'clock', text: 'Desafortunadamente y con gran tristeza e inmensa pena, solamente tres hermosos libros mayas antiquÃƒÂ­simos originales intactos e increÃƒÂ­blemente valiosos (que son usualmente llamados "cÃƒÂ³dices" desplegables hechos magistralmente de delgada pero muy resistente corteza de ÃƒÂ¡rbol de amate aplanada con paciencia) sobrevivieron trÃƒÂ¡gicamente a la terrible e implacable destrucciÃƒÂ³n devastadora provocada brutalmente por los furiosos y crueles conquistadores espaÃƒÂ±oles al intentar erradicar toda la sabidurÃƒÂ­a inmensa y la cultura vibrante que los sabios locales habÃƒÂ­an documentado en ellos sobre los misterios de sus divinidades cÃƒÂ³smicas y celestiales maravillosas.' },
    ],
    fact: 'Incluso tras innumerables y muchÃƒÂ­simos e infatigables decenios de intenso y muy riguroso estudio mundial apasionado e inteligente, los glifos majestuosos mayas seguÃƒÂ­an siendo un gran misterio indescifrable total e inescrutable. Ã‚Â¡No fue asombrosamente hasta la tardÃƒÂ­a e interesante dÃƒÂ©cada de muchÃƒÂ­simos hallazgos en mil novecientos ochenta que expertos brillantes, geniales investigadores y grandes epigrafistas astutos, lograron comprender verdaderamente y leer en voz alta de manera exitosa y sorprendente la inmensa mayorÃƒÂ­a abrumadora de estas antiguas e intrincadas piedras bellamente talladas por todo CentroamÃƒÂ©rica vibrante y misteriosa!',
  },
  {
    id: 'uso-cotidiano',
    title: 'Uso Cotidiano',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m3/btn_uso-cotidiano.jpg',
    image: '/assets/maya/infographic_m3/hero_uso-cotidiano.jpg',
    content: [
      'Lejos e independientemente de las altÃƒÂ­simas, sagradas y ceremoniales pirÃƒÂ¡mides resplandecientes colosales donde se hacÃƒÂ­an los cÃƒÂ¡lculos celestes grandiosos, el calendario Haab era en realidad de una manera profunda el gigantesco reloj comunitario que de verdad latÃƒÂ­a y sincronizaba cada latido y el ritmo diario incesante, vigoroso e intenso de toda la fascinante y muy bulliciosa vida de la vibrante y grandiosa sociedad de la civilizaciÃƒÂ³n maya. Para una familia regular de comerciantes o campesinos, conocer magistralmente la fecha exacta era una cosa verdaderamente clave.',
      'Imagina que tuvieras que organizar algo grandioso, como viajar a un mercado regional inmenso, gigantesco, vibrante y muy caÃƒÂ³tico. Los extensos e impresionantes mercados mesoamericanos mayas antiguos operaban a menudo, habitualmente y de una forma muy sincrÃƒÂ³nica e impresionante en determinados e invariables dÃƒÂ­as fijos muy especÃƒÂ­ficos de las largas semanas o de los perfectos y matemÃƒÂ¡ticos meses de 20 dÃƒÂ­as que estructuraban todo el Haab. Conocer profundamente quÃƒÂ© fecha calendario era hoy, les permitÃƒÂ­a a las familias caminar larguÃƒÂ­simas y arduas jornadas selva adentro para vender con total ÃƒÂ©xito brillantes plumas o cacao y saber que estarÃƒÂ­an repletos de bullicio alegre.',
      'El Haab tambiÃƒÂ©n era increÃƒÂ­blemente y absolutamente necesario para realizar grandiosos festivales y muy alegres celebraciones enormes llenas de colorido. Al igual que nosotros celebramos felices fiestas tradicionales como el AÃƒÂ±o Nuevo o fechas histÃƒÂ³ricas patriÃƒÂ³ticas emocionantes a nivel global, los antiguos mayas usaban alegremente el calendario sagrado inalterable Haab para agendar grandes espectÃƒÂ¡culos festivos, ceremonias masivas de bailes, representaciones teatrales espectaculares con mÃƒÂ¡scaras, deslumbrantes juegos de pelota intensos y grandiosos festines con tamales y rico chocolate picante con sabor a dioses en los gloriosos y muy bulliciosos centros de las ciudades prÃƒÂ³speras.',
      'AdemÃƒÂ¡s, este sistema brillante, preciso, imponente y meticuloso no se aplicaba y se usaba ÃƒÂºnicamente para fines meramente organizativos a nivel social amplio y comunitario extenso; formaba tambiÃƒÂ©n parte indiscutible de todo el gigantesco, meticuloso e increÃƒÂ­ble sistema burocrÃƒÂ¡tico, histÃƒÂ³rico y administrativo monumental inigualable y necesario. SirviÃƒÂ³ eficientemente y muy poderosamente como las valiosas "actas de nacimiento" pÃƒÂºblicas. Cuando el majestuoso hijo o hija amado de un gran rey o noble nacÃƒÂ­a resplandeciente, su fecha completa Haab y su nombre calendÃƒÂ¡rico maravilloso se inscribÃƒÂ­an tallados profundamente con infinito cuidado devoto.',
      'Por lo tanto, este prodigioso e inteligente calendario de grandiosos trescientos sesenta y cinco dÃƒÂ­as mÃƒÂ¡gicos entrelazaba indisolublemente toda la realidad vibrante y deslumbrante de la enorme y mÃƒÂ¡gica civilizaciÃƒÂ³n ancestral. AsÃƒÂ­ como tÃƒÂº asistes rigurosamente a la escuela feliz en tu horario y celebras con muchÃƒÂ­simo entusiasmo festivo tu emocionante y dulce cumpleaÃƒÂ±os basÃƒÂ¡ndote estrictamente en un calendario de papel o digital de hoy, un vivaz y alegre niÃƒÂ±o maya organizaba, crecÃƒÂ­a y maravillaba completamente toda su increÃƒÂ­ble vida milenaria brillante y majestuosa inmerso profundamente en este perfecto, colosal e inmensamente asombroso ritmo cÃƒÂ³smico majestuoso en la gran selva hÃƒÂºmeda.',
    ],
    expandables: [
      { label: 'Nombres al Nacer', icon: 'clock', text: 'La sagrada y mÃƒÂ¡gica fecha calendÃƒÂ¡rica especÃƒÂ­fica exacta en que nacÃƒÂ­a felizmente un bebÃƒÂ© maya tenÃƒÂ­a una enorme importancia astrolÃƒÂ³gica y personal inmensa, muy superior y poderosa. Muchos grandÃƒÂ­simos reyes nobles y plebeyos humildes tomaban como su propio y querido nombre propio personal ÃƒÂºnico e irrepetible el majestuoso y vibrante dÃƒÂ­a mÃƒÂ­stico asombroso particular exacto en el que habÃƒÂ­an respirado su mismÃƒÂ­simo y valioso primer aliento vital de vida. AsÃƒÂ­ se conectaba mÃƒÂ¡gicamente el ser humano diminuto inmediatamente al gran compÃƒÂ¡s cÃƒÂ³smico.' },
      { label: 'La Vida del Campesino', icon: 'clock', text: 'Para las laboriosas, fuertes e increÃƒÂ­blemente humildes inmensas familias unidas de campesinos arduos y respetables mayas, el asombroso Haab era verdaderamente la herramienta mÃƒÂ¡s importante de su hogar feliz de estuco y bajareque. Saber intuitivamente leer las estaciones solares era crucial para saber sin equivocarse ni fracasar cuÃƒÂ¡ndo hacer reparaciones astutas y necesarias a sus acogedoras e ingeniosas pequeÃƒÂ±as casas techadas bellamente con anchas hojas secas trenzadas, o saber exactamente en quÃƒÂ© momento brillante particular tejer con finas fibras preciosas o cazar pequeÃƒÂ±os e interesantes animales escurridizos nutritivos en la maleza.' },
    ],
    fact: 'Las maravillosas inscripciones gigantes, preciosas y sumamente ornamentadas que conmemoran majestuosamente eventos como coronaciones ÃƒÂ©picas y batallas memorables gloriosas, encontradas y descubiertas con asombro por arqueÃƒÂ³logos en altas estelas espectaculares y pirÃƒÂ¡mides mayas imponentes grandiosas y milenarias a lo ancho de CentroamÃƒÂ©rica mÃƒÂ­stica, casi siempre combinaban orgullosamente, rigurosamente y majestuosamente una precisa fecha brillante Haab inmensa al ladito de muchÃƒÂ­simos otros intrincados ciclos sagrados celestes infinitos, creando asombrosamente una "Cuenta Larga" histÃƒÂ³rica colosal de extrema y minuciosa exactitud perfecta inigualable mundialmente.',
  },
];

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Temporal Particle Field (Canvas Background) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Time Travel Header Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(253,216,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SOLAR DE 365 DÃƒÂAS</text>
      </svg>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Organic Node Button (matching M9 Dendera style) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Expandable Section with Random Direction Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Magazine-Style Content Panel Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Two-Column Hero Section Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Magazine Body Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

        {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Expandable Interactive Sections Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Progress Bar Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main Infographic Component Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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
              background: 'rgba(253,216,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(253,216,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FDD835', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Ã°Å¸Ââ€  Ã‚Â¡Has dominado los secretos del Calendario Haab!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de AstrÃƒÂ³nomo Maya
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ BibliografÃƒÂ­a Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ */}
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

      {/* ImageLightbox Ã‚Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
