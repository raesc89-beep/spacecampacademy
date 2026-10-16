'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (inline, no external images needed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoAnkh({ size = 60, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" style={{ opacity: 0.25, ...style, pointerEvents: 'none' }}>
      <ellipse cx="20" cy="12" rx="10" ry="12" fill="none" stroke={color} strokeWidth="3" />
      <line x1="20" y1="24" x2="20" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="34" x2="32" y2="34" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DecoEye({ size = 80, color = '#7EC8E3', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      <path d="M10 24 Q40 0 70 24 Q40 48 10 24Z" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="40" cy="24" r="8" fill={color} opacity="0.4" />
      <circle cx="40" cy="24" r="4" fill={color} opacity="0.7" />
      <path d="M40 32 Q35 42 28 46" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="46" x2="22" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoScarab({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      <circle cx="30" cy="14" r="10" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="36" rx="12" ry="16" fill={color} opacity="0.3" />
      <path d="M18 30 Q2 18 6 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 30 Q58 18 54 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="36" x2="6" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="54" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="42" x2="8" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="42" x2="52" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#E8C96A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      <polygon points="40,4 72,52 8,52" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="56,8 80,52 40,52" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="2" r="2" fill={color} opacity="0.8" />
      <circle cx="56" cy="6" r="1.5" fill={color} opacity="0.6" />
      <circle cx="48" cy="0" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStarCluster({ size = 60, color = '#C4A7E7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style, pointerEvents: 'none' }}>
      {[{x:30,y:10,r:3},{x:15,y:25,r:2},{x:45,y:20,r:2.5},{x:20,y:45,r:2},{x:40,y:42,r:3},{x:30,y:30,r:4},{x:10,y:12,r:1.5},{x:50,y:48,r:1.5}].map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill={color} opacity={0.6} />
          <circle cx={s.x} cy={s.y} r={s.r * 2.5} fill={color} opacity={0.1} />
        </g>
      ))}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'calendario-365': [DecoStarCluster, DecoAnkh, DecoEye],
  'calendario-lunar': [DecoEye, DecoStarCluster, DecoPyramid],
  'tres-estaciones': [DecoPyramid, DecoAnkh, DecoScarab],
  'sirio-sopdet': [DecoStarCluster, DecoEye, DecoScarab],
  'julio-cesar': [DecoAnkh, DecoPyramid, DecoStarCluster],
  'gregorio-reforma': [DecoEye, DecoStarCluster, DecoAnkh],
  'haab-maya': [DecoScarab, DecoPyramid, DecoStarCluster],
}; const BIBLIOGRAPHY = ['Parker, R. A. (1950). The Calendars of Ancient Egypt. Studies in Ancient Oriental Civilization, 26',
  'Clagett, M. (1995). Ancient Egyptian Science, Vol. II: Calendars, Clocks, and Astronomy. American Philosophical Society',
  'Depuydt, L. (1997). Civil Calendar and Lunar Calendar in Ancient Egypt. Peeters Publishers',
  'Neugebauer, O. (1957). The Exact Sciences in Antiquity. Dover Publications',
  'Brewer, D. J. & Teeter, E. (1999). Egypt and the Egyptians. Cambridge University Press',
  'Richards, E. G. (1998). Mapping Time: The Calendar and Its History. Oxford University Press'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "calendario-365",
    "bannerImage": "/assets/egypt/infographic_m13/banner_calendario-365.webp",
    "title": "El Primer Calendario de 365 Días",
    "color": "#80D080",
    "btnImage": "/assets/egypt/infographic_calendario/btn_calendario-365.webp",
    "image": "/assets/egypt/infographic_calendario/hero_calendario-365.webp",
    "content": [
      "En los albores del tercer milenio antes de nuestra era, durante el período dinástico temprano, la administración del Antiguo Egipto concibió una de las mayores invenciones intelectuales de la historia humana: el primer calendario solar civil regular de trescientos sesenta y cinco días. A diferencia de las sociedades mesopotámicas contemporáneas, cuyos calendarios dependían de los ciclos erráticos de la Luna, Egipto adoptó una estructura geométrica uniforme basada en el ritmo invariable del Sol.",
      "El calendario civil dividía el año en doce meses idénticos de exactamente treinta días cada uno, sumando un bloque básico de trescientos sesenta días. Cada mes se organizaba en tres semanas regulares de diez días de duración, conocidas como décadas. Esta regularidad decimal perfecta simplificaba extraordinariamente la recaudación de impuestos fiscales del Estado faraónico, el pago de raciones de trigo a los obreros de las pirámides y la administración de los contratos comerciales en todo el valle.",
      "Para cuadrar este esquema matemático con la duración real del año solar, los astrónomos reales añadieron un grupo festivo de cinco días complementarios al final del duodécimo mes, conocidos en lengua jeroglífica como «heriu renpet» (los que están sobre el año) y denominados en la tradición griega posterior como días epagómenos. Estos cinco días eran considerados un período sagrado fuera del tiempo ordinario, consagrados a celebrar el nacimiento terrenal de cinco grandes deidades.",
      "Según la teología heliopolitana, durante estos cinco días epagómenos nacieron sucesivamente los dioses Osiris, Horus el Viejo, Seth, Isis y Neftis. La mitología advertía que este intervalo liminar era espiritualmente peligroso y propenso a maldiciones cósmicas, por lo que la población encendía antorchas protectoras, recitaba amuletos específicos y evitaba emprender viajes largos o firmar tratados legales hasta la llegada del primer día del Año Nuevo («Uep Renpet»).",
      "A pesar de su asombrosa regularidad matemática, el calendario civil adolecía de una discrepancia astrofísica crucial: el año trópico real dura aproximadamente trescientos sesenta y cinco días y seis horas (365,2422 días). Al no intercalar un día bisiesto cada cuatro años, el calendario oficial acumulaba un retraso sistemático de un día entero cada cuatro años solares, provocando que las festividades religiosas se desplazaran lentamente a través de las estaciones agrícolas naturales."
    ],
    "fact": "El calendario civil egipcio constaba de doce meses de treinta días subdivididos en décadas exactas más cinco días epagómenos festivos al final del ciclo, totalizando trescientos sesenta y cinco días estables que rigieron la administración pública faraónica durante tres milenios continuos, constituyendo el sistema civil más duradero y ordenado de la cronología universal.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El papiro mágico de Leiden registra conjuros específicos que los egipcios recitaban durante los cinco días epagómenos para evitar que la temible diosa leona Sejmet enviara vientos pestilentes o fiebres epidémicas a los hogares durante ese peligroso período fuera del cómputo oficial de los meses, encendiendo antorchas purificadoras y ofreciendo vasijas de cerveza roja en honor de la divinidad solar pacificadora."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La tasa de desfase del calendario civil egipcio respecto al año trópico es de exactamente cero coma dos mil cuatrocientos veintidós días por año. Esto equivale a la pérdida acumulada de veinticuatro horas completas cada mil cuatrocientos sesenta años, intervalo que los astrónomos antiguos bautizaron como el gran período sótico."
      }
    ]
  },
  {
    "id": "calendario-lunar",
    "bannerImage": "/assets/egypt/infographic_m13/banner_calendario-lunar.webp",
    "title": "El Problema del Calendario Lunar",
    "color": "#7EC8E3",
    "btnImage": "/assets/egypt/infographic_calendario/btn_calendario-lunar.webp",
    "image": "/assets/egypt/infographic_calendario/hero_calendario-lunar.webp",
    "content": [
      "Antes de la implantación oficial del calendario civil de trescientos sesenta y cinco días, y conviviendo paralelamente con él a lo largo de toda la historia dinástica, Egipto se regía por un calendario lunar original mucho más antiguo. Este cómputo sacerdotal primigenio se fundamentaba en la observación directa de las fases de la Luna, comenzando cada mes el día exacto en que la última franja de la Luna menguante desaparecía del cielo oriental justo antes de la alborada matutina.",
      "Un mes lunar o período sinódico tiene una duración media real de veintinueve días, doce horas, cuarenta y cuatro minutos y dos coma ocho segundos (29,53059 días). Como consecuencia de esta cifra fraccionaria, los meses del calendario lunar egipcio alternaban de forma natural entre duraciones de veintinueve y treinta días, totalizando un año lunar de apenas trescientos cincuenta y cuatro días. Esto generaba un desajuste crónico de once días completos cada año respecto al ciclo solar.",
      "Si los sacerdotes no hubieran corregido este desfase periódico, las celebraciones agrícolas y los rituales litúrgicos lunares se habrían desincronizado con extrema rapidez de las estaciones terrestres: las fiestas de la siembra se habrían terminado celebrando en plena cosecha y los festivales de la crecida habrían caído en la estación seca en un lapso de apenas quince o dieciséis años civiles ordinarios.",
      "Para solucionar esta grave anomalía calendárica, los astrónomos de los templos idearon un sistema empírico de intercalación inteligente. Observaban atentamente la aparición de la brillante estrella Sirio (Sopdet) en el horizonte matutino: si el orto helíaco de Sirio caía dentro de los últimos once días del duodécimo mes lunar, los sacerdotes insertaban inmediatamente un mes bisiesto adicional llamado «Thoth intercalar», restableciendo la sincronía cósmica entre la Luna y las estaciones.",
      "De este modo, la sociedad faraónica funcionó durante siglos con un sofisticado sistema de doble calendario complementario. Por un lado, el calendario civil solar de trescientos sesenta y cinco días regulaba los asuntos administrativos del gobierno, el cobro de tributos y la justicia; por otro lado, el calendario lunar intercalado gobernaba los rituales litúrgicos de los templos, las ofrendas en las necrópolis y las grandes festividades populares consagradas a los dioses."
    ],
    "fact": "El año lunar egipcio de doce meses sumaba trescientos cincuenta y cuatro días, generando un desfase acumulado de once días anuales respecto al año solar que obligaba a los sacerdotes a intercalar un decimotercer mes bisiesto cada dos o tres años para sincronizar las fiestas litúrgicas, denominado Thoth Menor y consagrado a los rituales de purificación estacional del templo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los sacerdotes encargados de vigilar la desaparición de la Luna menguante recibían el título oficial de «horólogos observadores de la hora». Se apostaban en las terrazas superiores de los pilonos de los templos con varas de avistamiento para certificar la noche de invisibilidad lunar conocida como «pesdjentyu»."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El ciclo de intercalación lunar egipcio anticipó en casi mil años al célebre ciclo de Metón formulado en Atenas en el 432 a.C. Ambos sistemas se basan en el hecho de que doscientos treinta y cinco meses sinódicos lunares equivalen con extraordinaria precisión matemática a diecinueve años trópicos solares."
      }
    ]
  },
  {
    "id": "tres-estaciones",
    "bannerImage": "/assets/egypt/infographic_m13/banner_gregorio-reforma.webp",
    "title": "Akhet, Peret y Shemu",
    "color": "#E8C96A",
    "btnImage": "/assets/egypt/infographic_calendario/btn_tres-estaciones.webp",
    "image": "/assets/egypt/infographic_calendario/hero_tres-estaciones.webp",
    "content": [
      "A diferencia de las cuatro estaciones astronómicas tradicionales del mundo templado moderno (primavera, verano, otoño e invierno), la vida biológica y económica del Antiguo Egipto estaba articulada en torno a tres grandes estaciones climáticas naturales de cuatro meses de treinta días cada una. Estas tres fases recibían los nombres de Akhet (la Inundación), Peret (la Emergencia o Siembra) y Shemu (la Cosecha o la Estación Seca).",
      "La primera estación, Akhet («la inundación del río»), se extendía aproximadamente desde mediados de julio hasta mediados de noviembre según el calendario moderno. Durante estos meses, las aguas turbias y rojizas del Nilo, cargadas de nutrientes minerales y limo orgánico fertilizante arrastrado desde los macizos volcánicos de Etiopía, desbordaban los diques naturales y anegaban la totalidad del valle arable. Con los campos bajo el agua, los campesinos eran reclutados para las obras monumentales del Estado.",
      "La segunda estación era Peret («la salida o emergencia»), que abarcaba de mediados de noviembre a mediados de marzo. En este período, las aguas del río se retiraban gradualmente hacia su cauce principal, dejando sobre la tierra una capa esponjosa de limo negro húmedo («kemet»). Era el momento frenético de arar los campos con yuntas de bueyes, sembrar trigo candeal, cebada cervecera y lino textil, y reparar los canales de riego y compuertas mediante agrimensores oficiales.",
      "La tercera y última estación era Shemu («la cosecha o el estiaje»), que transcurría de mediados de marzo a mediados de julio. Durante estos meses de calor sofocante, las espigas maduraban y los campesinos segaban el grano con hoces de sílice y madera de acacia, aventaban la paja en eras circulares empujadas por asnos y almacenaban las cosechas en gigantescos silos cónicos estatales, antes de que el río descendiera a su caudal mínimo anual.",
      "La íntima dependencia de estas tres estaciones respecto al comportamiento hidrológico del río Nilo forjó la psicología colectiva de la civilización faraónica. Cada estación reflejaba una fase del ciclo cósmico de resurrección: Akhet era el caos acuático primordial regenerador, Peret representaba el renacimiento de la vida vegetal sobre la tierra fértil, y Shemu simbolizaba la maduración plena y la recolección de los dones concedidos por los dioses a la humanidad."
    ],
    "fact": "El año nilótico se subdividía en tres estaciones de exactamente cuatro meses de treinta días cada una: Akhet (inundación), Peret (emergencia y siembra) y Shemu (estiaje y recolección), conformando el ciclo agroclimático más regular y productivo de la cuenca mediterránea antigua, determinando la recaudación fiscal de granos y el reclutamiento de mano de obra para las obras públicas.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los meses egipcios no tenían originalmente nombres propios, sino que se designaban numéricamente dentro de su estación: «primer mes de Akhet», «segundo mes de Akhet», y así sucesivamente; los nombres populares como Thoth, Paophi o Hathor fueron oficializados en el Período Tardío, reflejando la primacía absoluta de la hidrología agraria sobre las festividades litúrgicas particulares."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El limo fértil arrastrado por la inundación de Akhet estaba compuesto por esmectitas, cuarzo coloidal y óxidos de hierro procedentes de la meteorización del basalto en la meseta de Abisinia. Este sedimento aportaba una media de un milímetro de suelo nuevo anual rico en fósforo y nitrógeno asimilable."
      }
    ]
  },
  {
    "id": "sirio-sopdet",
    "bannerImage": "/assets/egypt/infographic_m13/banner_haab-maya.webp",
    "title": "Sirio y el Orto Heliaco",
    "color": "#B388FF",
    "btnImage": "/assets/egypt/infographic_calendario/btn_sirio-sopdet.webp",
    "image": "/assets/egypt/infographic_calendario/hero_sirio-sopdet.webp",
    "content": [
      "El faro astronómico supremo que marcaba el compás del tiempo y el destino de toda la nación egipcia era la estrella Sirio, conocida en la astronomía moderna como Alfa Canis Maioris y adorada por los sacerdotes faraónicos bajo el nombre sagrado de Sopdet («la aguda» o «la resplandeciente»). Como la estrella más brillante de todo el firmamento nocturno visible, con una magnitud aparente de menos uno coma cuarenta y seis, su presencia era reverenciada con fervor místico.",
      "Tras permanecer invisible por debajo del horizonte durante un período de setenta días debido a la proximidad angular del Sol diurno, Sirio reaparecía finalmente en el firmamento en un acontecimiento astronómico crucial denominado orto helíaco. Este fenómeno consistía en la primera aparición fugaz de la estrella sobre el horizonte oriental, brillando con un fulgor azulado e intenso durante unos pocos minutos antes de que la luz cegadora del amanecer borrara las estrellas.",
      "En el tercer milenio antes de Cristo, el orto helíaco de Sopdet coincidía con asombrosa exactitud con el solsticio de verano (finales de julio) y con la llegada de las primeras aguas espumosas de la inundación del Nilo a la frontera de Elefantina en Asuán. Los sacerdotes interpretaban esta coincidencia cósmica como una señal divina irrefutable: la estrella Sopdet era la lágrima celestial derramada por la diosa Isis que fertilizaba las tierras de Egipto para resucitar a Osiris.",
      "Debido a que el calendario civil egipcio de trescientos sesenta y cinco días acumulaba un desfase de un cuarto de día por año respecto al año solar y estelar, la fecha del orto helíaco de Sirio no caía siempre en el primer día del calendario civil («I Akhet 1»). Por el contrario, la estrella se iba retrasando un día en el calendario civil cada cuatro años, recorriendo lentamente los doce meses del año a lo largo de un colosal período de mil cuatrocientos sesenta años solares.",
      "Este ciclo cósmico completo recibía el nombre de Ciclo Sótico o «gran año». El escritor romano Censorino dejó constancia documental de que en el año 139 después de Cristo, bajo el reinado del emperador Antonino Pío, el orto helíaco de Sirio volvió a coincidir de manera matemática con el primer día del calendario civil egipcio, marcando la culminación histórica de uno de estos gigantescos ciclos milenarios de sincronización estelar."
    ],
    "fact": "El ciclo sótico requería exactamente mil cuatrocientos sesenta años julianos (equivalentes a mil cuatrocientos sesenta y un años civiles egipcios de 365 días) para que el orto helíaco de la estrella Sirio volviera a coincidir con el primer día oficial del calendario civil de las Dos Tierras, registrado históricamente por el censor romano Censorino en el 139 d.C. con notable rigor cronográfico.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El período de setenta días en que la estrella Sirio permanecía invisible bajo el horizonte coincidía de forma exacta con la duración canónica del proceso de momificación en los talleres funerarios, interpretándose como el tiempo en que el difunto debía permanecer oculto antes de renacer purificado, sincronizando el tránsito de ultratumba del difunto con la trayectoria cósmica de la diosa Sopdet en la Duat."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Sirio es un sistema estelar binario situado a ocho coma seis años luz de la Tierra. Está compuesto por una estrella de la secuencia principal de tipo espectral A1V (Sirio A) y una enana blanca densa (Sirio B), cuya altísima luminosidad estelar garantizaba su visibilidad a través de la calima desértica matutina."
      }
    ]
  },
  {
    "id": "julio-cesar",
    "bannerImage": "/assets/egypt/infographic_m13/banner_julio-cesar.webp",
    "title": "De Egipto a Roma: El Calendario Juliano",
    "color": "#FF8A65",
    "btnImage": "/assets/egypt/infographic_calendario/btn_julio-cesar.webp",
    "image": "/assets/egypt/infographic_calendario/hero_julio-cesar.webp",
    "content": [
      "A mediados del siglo primero antes de nuestra era, la República romana sufría un caos administrativo mayúsculo provocado por la ineficiencia y la manipulación política de su anticuado calendario republicano. Basado en un ciclo lunar tradicional de trescientos cincuenta y cinco días, el calendario romano dependía de que los pontífices máximos insertaran arbitrariamente un mes intercalar llamado Mercedonius, lo que provocó que en el año cuarenta y siete antes de Cristo las fechas oficiales llevaran tres meses enteros de desfase respecto a las estaciones.",
      "Durante su estancia militar y amorosa en Alejandría junto a la reina Cleopatra VII en el año cuarenta y ocho antes de Cristo, el general y dictador romano Julio César quedó fascinado por los conocimientos astronómicos de los sabios de la corte ptolemaica. Conoció allí al eminente astrónomo y matemático alejandrino Sosígenes, quien le explicó con rigor técnico la superioridad absoluta del calendario solar egipcio de trescientos sesenta y cinco días y le propuso una reforma revolucionaria.",
      "Siguiendo los cálculos matemáticos de Sosígenes, Julio César promulgó en el año cuarenta y seis antes de nuestra era una reforma legislativa integral que abolió para siempre el calendario lunar de Roma. Para compensar los siglos de negligencia previa, el año cuarenta y seis a.C. fue extendido de forma excepcional hasta alcanzar cuatrocientos cuarenta y cinco días de duración mediante tres meses intercalares, siendo bautizado irónicamente como el «último año de la confusión».",
      "El nuevo calendario, bautizado en honor del dictador como Calendario Juliano, adoptó la estructura básica del año solar egipcio de trescientos sesenta y cinco días distribuidos en doce meses, pero introdujo una corrección matemática genial que los faraones nunca habían aplicado con éxito: añadir un día adicional de veinticuatro horas cada cuatro años entre el veintitrés y el veinticuatro de febrero (el día bisiesto, llamado «bis sextus dies ante calendas martias»).",
      "La reforma juliana transformó el calendario solar nacido en las riberas del Nilo en el estándar cronográfico universal de todo el Imperio Romano y, posteriormente, de toda la cristiandad medieval. Aunque adaptó los nombres de los meses a la tradición romana (como Iulius para julio y Augustus para agosto), su corazón mecánico continuó siendo el cómputo astronómico de las estaciones desarrollado milenios atrás por los sacerdotes de Ra."
    ],
    "fact": "La reforma del calendario juliano en el 46 a.C., diseñada por el astrónomo alejandrino Sosígenes a instancias de Julio César, adoptó el año solar egipcio de 365 días e introdujo el primer sistema de año bisiesto cuatrienal de la civilización occidental, suprimiendo el caótico calendario lunar romano y unificando el cómputo del tiempo en todo el Imperio.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el año 238 a.C., dos siglos antes de Julio César, el faraón Ptolomeo III ya había intentado introducir el día bisiesto cada cuatro años mediante el célebre «Decreto de Canopus», pero los sacerdotes conservadores tebanos se opusieron tenazmente a alterar la tradición litúrgica de los trescientos sesenta y cinco días."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El calendario juliano fijó la duración del año en trescientos sesenta y cinco días y seis horas exactas (365,25 días). Esto representaba una aproximación magnífica, pero sobreestimaba la duración real del año trópico (365,2422 días) en once minutos y catorce segundos cada año solar, acumulando un error de un día completo cada ciento veintiocho años de aplicación cronológica ininterrumpida."
      }
    ]
  },
  {
    "id": "gregorio-reforma",
    "bannerImage": "/assets/egypt/infographic_m13/banner_sirio-sopdet.webp",
    "title": "La Reforma Gregoriana de 1582",
    "color": "#4FC3F7",
    "btnImage": "/assets/egypt/infographic_calendario/btn_gregorio-reforma.webp",
    "image": "/assets/egypt/infographic_calendario/hero_gregorio-reforma.webp",
    "content": [
      "Aunque el calendario juliano inspirado en Egipto representó un avance colosal para la civilización, contenía una sutil discrepancia matemática que terminó acumulando un problema secular de proporciones mayúsculas. Los once minutos y catorce segundos de exceso que el año juliano atribuía anualmente al Sol frente a la realidad astronómica parecían insignificantes en una vida humana, pero con el transcurso de los siglos generaron una deriva inevitable.",
      "Hacia el siglo dieciséis, aquel pequeño desfase anual de once minutos se había transformado en un error astronómico acumulado de diez días completos. Como resultado directo de esta desviación, el equinoccio de primavera boreal, fijado por el Concilio de Nicea del año 325 en el veintiuno de marzo para calcular la fecha móvil de la Pascua de Resurrección, se producía en la realidad física el once de marzo, amenazando con desplazar la liturgia cristiana hacia el invierno.",
      "Para solucionar esta crisis cronológica de forma definitiva, el papa Gregorio XIII promulgó el veinticuatro de febrero de 1582 la célebre bula pontificia «Inter gravissimas». La comisión científica que diseñó la reforma estuvo liderada por el eminente médico y astrónomo italiano Aloysius Lilius y por el insigne matemático jesuita alemán Christopher Clavius, quienes emplearon las tablas astronómicas más avanzadas de la época renacentista.",
      "La reforma gregoriana aplicó una cirugía cronológica audaz en dos fases. En primer lugar, eliminó de un plumazo el error acumulado: se decretó que al jueves cuatro de octubre de 1582 le seguiría inmediatamente el viernes quince de octubre, borrando diez días del calendario de la historia europea. En segundo lugar, refinó la regla de los años bisiestos para que el calendario no volviera a desfasarse jamás.",
      "La nueva fórmula matemática estipuló que los años seculares terminados en dos ceros solo serían bisiestos si eran exactamente divisibles por cuatrocientos. De este modo, años como 1600 y 2000 mantuvieron su día bisiesto, mientras que 1700, 1800 y 1900 pasaron a ser años comunes de trescientos sesenta y cinco días. Este ajuste magistral redujo el margen de error a apenas un día cada tres mil trescientos años, rigiendo la vida global hasta hoy."
    ],
    "fact": "La reforma gregoriana de 1582 suprimió diez días del calendario civil en octubre y ajustó la regla secular de los años bisiestos, perfeccionando el cómputo solar iniciado en Egipto hasta alcanzar una exactitud de un día de desvío cada tres mil trescientos años, siendo adoptada paulatinamente por todas las naciones civilizadas del mundo contemporáneo.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Santa Teresa de Jesús falleció en Alba de Tormes exactamente en la noche del cuatro de octubre de 1582; debido a la entrada en vigor inmediata del calendario gregoriano en España esa misma medianoche, fue enterrada oficialmente al día siguiente: el quince de octubre, saltando diez fechas de golpe sin que transcurrieran más de doce horas reales entre el óbito y las exequias."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La duración media del año en el calendario gregoriano es de 365,2425 días terrestres (365 días, 5 horas, 49 minutos y 12 segundos). Esta cifra difiere del año trópico real en tan solo veintiséis segundos anuales, una precisión matemática verdaderamente portentosa para el siglo dieciséis, lograda gracias a las exhaustivas observaciones astronómicas de matemáticos como Cristóbal Clavio y Luis Lilio."
      }
    ]
  },
  {
    "id": "haab-maya",
    "bannerImage": "/assets/egypt/infographic_m13/banner_tres-estaciones.webp",
    "title": "Los Mayas: Otro 365",
    "color": "#A5D6A7",
    "btnImage": "/assets/egypt/infographic_calendario/btn_haab-maya.png",
    "image": "/assets/egypt/infographic_calendario/hero_haab-maya.webp",
    "content": [
      "A miles de kilómetros de distancia del valle del Nilo y en un aislamiento geográfico y cultural absoluto a través de los océanos, otra brillante civilización astronómica de la antigüedad llegó de forma independiente a la misma conclusión matemática que los sabios faraónicos: los mayas de Mesoamérica. Para regular sus ciclos agrícolas de siembra y quema de la selva tropical, los astrónomos mayas desarrollaron el calendario solar civil conocido como Haab.",
      "La estructura arquitectónica del Haab presenta una coincidencia verdaderamente asombrosa con el calendario civil egipcio. El año maya constaba de exactamente trescientos sesenta y cinco días distribuidos en dieciocho meses de veinte días cada uno (con base vigesimal mesoamericana), totalizando trescientos sesenta días básicos denominados Tun. Al final de este ciclo, los mayas añadían un período especial de cinco días suplementarios conocidos como los días Wayeb.",
      "Al igual que ocurría con los días epagómenos en el Antiguo Egipto, los cinco días Wayeb eran percibidos por la sociedad maya como un intervalo sumamente peligroso, nefasto y liminar. Los sacerdotes enseñaban que durante esos cinco días los portales del inframundo (Xibalbá) quedaban entreabiertos, permitiendo que deidades malignas y espíritus errantes cruzaran a la tierra. La gente evitaba salir de sus casas, no se peinaba ni realizaba labores físicas pesadas.",
      "Los mayas sabían perfectamente que el año trópico solar era superior a los trescientos sesenta y cinco días enteros del Haab. Sin embargo, en lugar de intercalar días bisiestos mecánicos que habrían roto la armonía matemática de su complejo sistema calendárico interconectado (que combinaba el Haab con el calendario ritual sagrado Tzolk'in de doscientos sesenta días en la Rueda Calendárica de cincuenta y dos años), registraban la desviación astronómica mediante tablas de corrección grabadas en estelas.",
      "Esta extraordinaria convergencia cultural entre el Nilo y la selva del Petén demuestra que cuando las civilizaciones humanas observan con paciencia metódica y rigor geométrico las mismas leyes físicas del cosmos —la rotación de la Tierra sobre su eje inclinado y su traslación anual alrededor del Sol—, la inteligencia humana converge de forma natural hacia soluciones matemáticas idénticas para descifrar el tiempo."
    ],
    "fact": "El calendario solar Haab de la civilización maya constaba de dieciocho meses de veinte días más cinco días peligrosos Wayeb, sumando trescientos sesenta y cinco días en una asombrosa coincidencia matemática independiente con el calendario civil del Egipto faraónico, demostrando la universalidad de la respuesta humana ante la duración del ciclo solar terrestre.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas calculaban la duración del año solar trópico en 365,2420 días en monumentos de Copán, una cifra que difiere en apenas dos diezmilésimas de día del valor astronómico moderno (365,2422 días), alcanzando una precisión superior a la del calendario juliano europeo coetáneo, calculada mediante observaciones de horizontes montañosos sin instrumentos ópticos de vidrio."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El sistema calendárico maya operaba mediante un mínimo común múltiplo exacto: la Rueda Calendárica combinaba los ciclos del Tzolk'in (260 días) y del Haab (365 días), tardando exactamente dieciocho mil novecientos ochenta días (cincuenta y dos años solares) en repetir una fecha idéntica completa, articulando de forma perfecta los ritmos sagrados de la liturgia con el cómputo astronómico civil mesoamericano."
      }
    ]
  }
];

// â”€â”€â”€ Star Field Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function StarField() {
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
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        const opacity = s.o + Math.sin(t * s.speed + s.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Header SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function NutHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-20px', pointerEvents: 'none' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(232,201,106,0.3))' }}>
        <path d="M 30 110 Q 80 20, 300 10 Q 520 20, 570 110" fill="none" stroke="url(#nutGrad)" strokeWidth="3" strokeLinecap="round" />
        {[80, 150, 220, 300, 380, 450, 520].map((cx, i) => (
          <motion.circle key={i} cx={cx} cy={10 + Math.abs(cx - 300) * 0.15 + 15} r="3" fill="#FFD700"
            animate={{ opacity: [0.4, 1, 0.4], r: [2, 4, 2] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
          />
        ))}
        <circle cx="30" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="570" cy="110" r="5" fill="rgba(232,201,106,0.6)" />
        <circle cx="300" cy="8" r="7" fill="rgba(232,201,106,0.8)" style={{ filter: 'drop-shadow(0 0 8px rgba(232,201,106,0.5))' }} />
        <defs>
          <linearGradient id="nutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(232,201,106,0.3)" />
            <stop offset="50%" stopColor="rgba(232,201,106,0.9)" />
            <stop offset="100%" stopColor="rgba(232,201,106,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E8C96A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL NILO DE NUT</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(232,201,106,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL TIEMPO Y LAS ESTRELLAS</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (circular image-based) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(232,201,106,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.btnImage}
          alt={node.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}
         loading="lazy" />
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
          layoutId="activeDot"
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

// â”€â”€â”€ ExpandableSection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ExpandableSection({ item, color }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon === 'sparkles' ? Sparkles : Star;
  
  return (
    <div style={{ marginBottom: '1rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: `linear-gradient(90deg, ${color}15, transparent)`,
          border: `1px solid ${color}30`, borderRadius: '12px', padding: '1rem',
          cursor: 'pointer', color: '#FFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ background: `${color}30`, padding: '0.5rem', borderRadius: '50%' }}>
            <Icon size={18} style={{ color }} />
          </div>
          <span style={{ fontWeight: 'bold', color }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronRight size={18} style={{ color }} /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '1rem', marginTop: '0.5rem',
              background: 'rgba(255,255,255,0.03)',
              borderLeft: `3px solid ${color}`,
              borderRadius: '0 12px 12px 0',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.95rem', lineHeight: 1.7
            }}>
              {item.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ ContentPanel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'rgba(12, 12, 35, 0.9)',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px'
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none'
          }} />
        </div>

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
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2, marginBottom: '2rem' }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto', background: `rgba(255,255,255,0.02)`, borderRadius:'12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px'
                }}>
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 2 }}>
          {node.expandables && node.expandables.map((exp, i) => (
             <ExpandableSection key={i} item={exp} color={node.color} />
          ))}
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
              {node.fact && (
          <div style={{
            marginTop: '1.5rem', background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px', padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%',
              background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(232,201,106,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFD700', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #E8C96A, #FFD700)', borderRadius: '3px', boxShadow: '0 0 8px rgba(232,201,106,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E8C96A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_EgyptM13() {
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
      background: 'url(/assets/egypt/infographic_calendario/bg_calendario.png) center/cover no-repeat, linear-gradient(180deg, #0B0E2D 0%, #1A1040 40%, #0B0E2D 100%)',
      backgroundBlendMode: 'overlay',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(232,201,106,0.12)', boxShadow: '0 0 60px rgba(11,14,45,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 14, 45, 0.75)', zIndex: 0, pointerEvents: 'none' }} />
      <StarField />
      <NutHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(232,201,106,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem 1.2rem',
        position: 'relative', zIndex: 2, marginBottom: '1rem', padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>

      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)', borderRadius: '0 0 16px 16px', position: 'relative', zIndex: 2
      }}>
        <h4 style={{ color: '#E8C96A', margin: '0 0 1rem', fontSize: '1.1rem' }}>ðŸ“š Fuentes y Referencias</h4>
        <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          {BIBLIOGRAPHY.map((ref, i) => <li key={i}>{ref}</li>)}
        </ul>
      </div>

      {lightboxSrc && <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </div>
  );
}
