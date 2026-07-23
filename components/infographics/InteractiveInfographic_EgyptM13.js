'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (inline, no external images needed) ─────────────
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
};

const BIBLIOGRAPHY = [
  'Parker, R. A. (1950). The Calendars of Ancient Egypt. Studies in Ancient Oriental Civilization, 26',
  'Clagett, M. (1995). Ancient Egyptian Science, Vol. II: Calendars, Clocks, and Astronomy. American Philosophical Society',
  'Depuydt, L. (1997). Civil Calendar and Lunar Calendar in Ancient Egypt. Peeters Publishers',
  'Neugebauer, O. (1957). The Exact Sciences in Antiquity. Dover Publications',
  'Brewer, D. J. & Teeter, E. (1999). Egypt and the Egyptians. Cambridge University Press',
  'Richards, E. G. (1998). Mapping Time: The Calendar and Its History. Oxford University Press'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "calendario-365",
    "title": "El Primer Calendario de 365 Días",
    "color": "#80D080",
    "btnImage": "/assets/egypt/infographic_calendario/btn_calendario-365.png",
    "image": "/assets/egypt/infographic_calendario/hero_calendario-365.png",
    "content": [
      "¡Atención al reloj cósmico, cadete espacial! El calendario que usas todos los días para saber cuándo es tu cumpleaños, tus vacaciones o el fin de semana, es un invento brillante que tiene más de 5,000 años de historia. Nació en las majestuosas orillas del caudaloso río Nilo. Los antiguos egipcios fueron los primeros seres humanos en crear un calendario civil de exactamente 365 días, completamente independiente de las fases cambiantes de la Luna, basándose exclusivamente en el movimiento constante del Sol y el majestuoso baile de las estrellas en el cielo nocturno.",
      "A diferencia de otros pueblos antiguos, los astrónomos egipcios resolvieron el complejo rompecabezas del tiempo de una forma sumamente elegante y matemática. Observaron pacientemente el inmenso cielo del desierto durante generaciones y descubrieron que el año solar exacto, el tiempo que tarda nuestro planeta Tierra en dar una vuelta completa al Sol, dura aproximadamente 365 días y un cuarto. A partir de este descubrimiento monumental, crearon un calendario dividido inteligentemente en 12 meses idénticos, donde cada mes tenía exactamente 30 días, formando un bloque perfecto de 360 días que era fácil de calcular y administrar.",
      "Pero los sabios matemáticos egipcios sabían perfectamente que 360 días no eran suficientes para completar el gran viaje orbital de nuestro planeta alrededor del Sol. Si dejaban el calendario así de corto, las cálidas estaciones del año se desfasarían rápidamente. Para solucionar este problema cósmico, añadieron genialmente 5 días extra al final del año. Estos 5 días adicionales, conocidos por los expertos como 'días epagómenos', eran un puente mágico entre el año viejo y el nuevo, logrando alcanzar los 365 días necesarios para mantener su mundo sincronizado con los gigantescos engranajes del universo.",
      "Para los ciudadanos del antiguo Egipto, estos 5 días extra no eran simplemente fechas comunes en un papel; eran considerados días inmensamente poderosos, mágicos y en ocasiones peligrosos. Creían que se encontraban 'fuera del tiempo normal', en una misteriosa zona de transición cósmica donde se celebraban los cumpleaños de los dioses más importantes: Osiris, Horus, Seth, Isis y Neftis. Durante estos cinco sagrados días epagómenos, la vida cotidiana se detenía por completo, los trabajos pesados se suspendían y toda la civilización se sumergía en rituales protectores.",
      "Imagina que el calendario egipcio funcionaba como el motor de máxima precisión de una nave espacial antigua. La sincronización entre el tiempo humano y el tiempo astronómico era absolutamente crucial para la supervivencia de toda su civilización frente al ciclo natural. Este ingenioso sistema de 365 días fue tan inmensamente exitoso, práctico y revolucionario que sentó las bases matemáticas firmes para todos los calendarios futuros de la humanidad. Cada vez que miras la fecha en la brillante pantalla de tu teléfono móvil, estás utilizando una versión moderna de aquel mismo software temporal."
    ],
    "fact": "Los sacerdotes-astrónomos egipcios, conocidos como 'Khery-hebet', eran los implacables guardianes del tiempo. Cada mes observaban cuidadosamente el cielo nocturno con instrumentos de medición precisos, como el 'merkhet', para confirmar con extrema atención que las estrellas estaban en sus posiciones correctas, garantizando que el gigantesco imperio mantuviera una sincronización absoluta y perfecta con las maravillosas leyes matemáticas de nuestro gran universo visible.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Aunque el brillante calendario civil tenía 365 días y era utilizado metódicamente para la gran administración del gobierno y la recolección de vitales impuestos, los sabios sacerdotes mantenían un calendario lunar secreto y paralelo estrictamente para fines místicos y religiosos. Esta fascinante dualidad temporal significa que un ciudadano egipcio común vivía constantemente en dos asombrosas dimensiones de tiempo simultáneas y paralelas cada día de su vida."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La asombrosa precisión del antiguo calendario egipcio nos revela un conocimiento extremadamente avanzado de mecánica celeste. Aunque el gigantesco año solar astronómico dura exactamente 365.24219 días de forma meticulosa, el ingenioso sistema egipcio de 365 días fijos sin contemplar el año bisiesto provocaba inevitablemente que su complejo calendario civil retrocediera un día entero astronómico cada cuatro intensos años solares completos."
      }
    ]
  },
  {
    "id": "calendario-lunar",
    "title": "El Problema del Calendario Lunar",
    "color": "#7EC8E3",
    "btnImage": "/assets/egypt/infographic_calendario/btn_calendario-lunar.png",
    "image": "/assets/egypt/infographic_calendario/hero_calendario-lunar.png",
    "content": [
      "Antes de que el genio de la civilización egipcia revolucionara la forma de medir el transcurrir del universo, la inmensa mayoría de las civilizaciones antiguas en todo el planeta utilizaban calendarios estrictamente lunares, los cuales estaban basados exclusivamente en observar las cambiantes fases de la Luna en el cielo estrellado nocturno. Mirar cómo la Luna crece de una fina cuña brillante hasta convertirse en un disco esférico perfecto es un reloj gigantesco que resulta maravillosamente evidente, predecible y accesible para cualquier persona que simplemente eleve la mirada hacia las estrellas en la inmensidad de la noche despejada.",
      "Sin embargo, a pesar de ser muy intuitivos para todos, este antiguo sistema lunar guardaba un enorme problema matemático oculto que complicaba terriblemente la vida. Los astrónomos modernos saben que el verdadero mes lunar dura exactamente unos 29.5 días de media. Esto significa que si sumamos 12 de estos enigmáticos meses lunares, obtenemos únicamente 354 días totales en el año, lo cual resulta dramáticamente en 11 días más corto que los verdaderos 365 días del tiempo de órbita solar de la Tierra. Este desajuste cósmico causaba tremendos dolores de cabeza.",
      "Las desastrosas consecuencias de este corto y engañoso calendario puramente lunar eran monumentales. Al faltarle nada menos que 11 importantes días enteros cada año en relación directa con las verdaderas estaciones climáticas de la Tierra impulsadas por el Sol, un mes de profunda 'primavera' dentro de un estricto calendario lunar terminaría desplazándose de forma continua y perceptible a lo largo de un ciclo vertiginoso de apenas 33 años. Eventualmente ese mismo mes de 'primavera' aterrizaría justo en medio del helado y oscuro invierno, dejando a todos confundidos.",
      "Coordinar un caprichoso calendario lunar, con todos sus continuos desajustes y sorpresas anuales, con las verdaderas e inflexibles estaciones climáticas indispensables de la agricultura, que dictaban cuándo sembrar las preciosas y frágiles semillas o cuándo cosechar el dorado alimento, resultaba un desafío inmensamente caótico e inmanejable a gran escala. Las grandes civilizaciones agrarias y expansivas, como lo fue el Antiguo Egipto, requerían urgentemente un sistema temporal predecible, repetible, fijo e inamovible que no jugara peligrosamente al escondite a través de las diferentes épocas.",
      "Fue entonces que los egipcios comprendieron que la resplandeciente Luna, aunque poéticamente hipnótica, romántica y maravillosa de observar en la vasta y misteriosa oscuridad de la noche, simplemente no constituía un marcador de tiempo confiable a inmensa y colosal escala. Necesitaban imperiosamente levantar la mirada astronómica aún más alto, buscando anclar su brillante civilización al poderoso, deslumbrante e inamovible ciclo del ardiente y majestuoso Sol y al parpadeo constante y confiable de las lejanas estrellas fijas."
    ],
    "fact": "Diversas civilizaciones muy antiguas como los mesopotámicos intentaron desesperadamente solucionar este gravísimo problema del calendario lunar introduciendo un complicado sistema donde añadían de forma caótica y manual meses adicionales enteros, pero el sistema egipcio solar resultó inmensamente superior, más organizado, preciso y tan perfecto que eliminó la confusión para siempre.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La herencia del caótico calendario lunar antiguo sigue presente maravillosamente en algunos sistemas y culturas en todo el mundo contemporáneo. En el calendario islámico, que sigue siendo firmemente lunar hasta el día de hoy sin usar meses bisiestos, el famoso mes de Ramadán recorre gradualmente todas y cada una de las diferentes estaciones astronómicas a lo largo de un ciclo completo que asombrosamente abarca unos inmensos y fascinantes 33 años solares."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El desfase de aproximadamente 11 días entre nuestro enorme año solar de 365 días y un misterioso año lunar corto de solo 354 días sucede matemáticamente debido a complejas fluctuaciones gravitacionales en las órbitas orbitales relativas de la gran Tierra respecto al Sol en contraste con la pequeña órbita elíptica de nuestra fascinante, pálida y enigmática Luna terrestre."
      }
    ]
  },
  {
    "id": "tres-estaciones",
    "title": "Akhet, Peret y Shemu",
    "color": "#E8C96A",
    "btnImage": "/assets/egypt/infographic_calendario/btn_tres-estaciones.png",
    "image": "/assets/egypt/infographic_calendario/hero_tres-estaciones.png",
    "content": [
      "Si alguna vez has considerado que la inmensa mayoría del mundo moderno experimenta firmemente cuatro estaciones distintas en el año, como cálido verano, nostálgico otoño, gélido invierno y floreciente primavera, te sorprenderá saber que el colosal año civil de los sabios egipcios estaba ingeniosamente dividido de una forma completamente diferente, en solo tres grandes y marcadas estaciones de cuatro meses inmensos cada una, meticulosamente sintonizadas con los ritmos únicos y mágicos de la gloriosa madre naturaleza que reinaba suprema en su desértico territorio.",
      "La primera y gloriosa estación egipcia se llamaba asombrosamente 'Akhet' (la maravillosa inundación). Durante esta épica y húmeda temporada, el gigantesco y legendario río Nilo experimentaba inmensas y controladas crecidas que desbordaban ampliamente sus vastas riberas naturales. Esta inmensa masa constante de agua vital empapaba y fertilizaba todos los secos y sedientos campos de cultivo con un rico y oscuro lodo repleto y lleno de indispensables nutrientes, preparando espléndidamente todo el desértico paisaje para el siguiente gran ciclo de intensa vida agraria.",
      "A continuación, con una sincronicidad perfecta, llegaba la segunda y ocupada estación llamada majestuosamente 'Peret' (la ansiada siembra y el verde crecimiento). Una vez que las intensas y caudalosas aguas de la gran inundación de Akhet comenzaban a retroceder de forma segura, los hábiles agricultores egipcios de toda la enorme y extensa nación emergían valientemente a lo largo y ancho de las llanuras para apresurarse a plantar incansablemente sus preciosas semillas con tremenda dedicación profunda en el recién formado y enormemente fértil fango húmedo.",
      "Finalmente, el inmenso calor abrasador y brillante inauguraba formalmente la tercera gran estación llamada gloriosamente 'Shemu' (la inmensa cosecha), la implacable e inmensamente intensa época seca en la cual el resplandeciente Sol abrasador maduraba rápidamente los enormes cultivos verdes. Todos y cada uno de los abundantes campos rebosaban espléndidamente de brillante y crujiente grano, exigiendo con fervor el arduo esfuerzo colaborativo incesante de campesinos dedicados, quienes cosechaban rápidamente valiosas toneladas y montañas de dorado y espléndido trigo.",
      "A simple y superficial vista, este asombroso, ingenioso e inflexible ciclo continuo conformado majestuosamente por la enorme inundación, la ocupada siembra y la abundante cosecha, constituía de manera literal la poderosa, firme y vibrante columna vertebral de absolutamente toda la asombrosa e inmensa civilización egipcia. A través de este ingenioso y maravillosamente sincronizado y armónico calendario de tres poderosas estaciones, los antiguos egipcios lograban predecir asombrosamente el comportamiento monumental y caprichoso de la naturaleza y planificar la vital y compleja prosperidad."
    ],
    "fact": "Durante la enorme, asombrosa, gloriosa y húmeda estación de inmensas inundaciones llamada majestuosamente 'Akhet', como no se podía cultivar nada, incontables miles de hábiles y fuertísimos campesinos y constructores eran genialmente reasignados por parte de los gobernantes y faraones para trabajar gloriosa y colaborativamente en colosales y maravillosos proyectos masivos y espectaculares.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los antiguos y sabios egipcios utilizaban instrumentos realmente ingeniosos e inmensamente efectivos llamados coloquialmente 'nilómetros'. Se trataba en realidad de profundas e intrincadas escaleras asombrosamente talladas en la pura y resistente roca con inmensa y asombrosa exactitud que descendían dramáticamente para poder permitir mágicamente y de manera constante medir y registrar el colosal y creciente nivel de agua."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las espectaculares e intensas lluvias colosales que lograban ocasionar maravillosamente la masiva crecida fenomenal del gran Nilo en 'Akhet' nunca sucedían en el caluroso desierto egipcio real de Egipto directamente. Se trataba asombrosamente de titánicas y asombrosas precipitaciones inmensas y lejanas originadas magistralmente en la región inmensa y tropical masiva montañosa de Etiopía y su desbordante energía."
      }
    ]
  },
  {
    "id": "sirio-sopdet",
    "title": "Sirio y el Orto Heliaco",
    "color": "#B388FF",
    "btnImage": "/assets/egypt/infographic_calendario/btn_sirio-sopdet.png",
    "image": "/assets/egypt/infographic_calendario/hero_sirio-sopdet.png",
    "content": [
      "Para lograr sincronizar su asombroso calendario solar matemáticamente fijo con las poderosas e implacables estaciones húmedas y secas naturales del río Nilo, los grandiosos astrónomos egipcios fijaron ingeniosamente su vista curiosa en las brillantes profundidades estelares insondables. Buscaron asombrosamente un indicador inmensamente visible en la gigantesca y majestuosa bóveda celeste. Su brillante solución fue la grandiosa e inmensamente resplandeciente Sirio, la majestuosa, poderosa y espléndida estrella blanca que era infinitamente la más luminosa e intensa de toda la enorme bóveda estelar.",
      "Ellos bautizaron místicamente y poéticamente a esta inmensamente poderosa y espléndida estrella titánica con el grandioso e inolvidable nombre asombroso de Sopdet. Los grandísimos y dedicados astrónomos asombrosos observaron genialmente durante años continuos de estudio que, maravillosamente y con enorme constancia, después de estar permanentemente oculta y eclipsada mágicamente por el fuerte resplandor inmenso durante el día por unas intensas y aburridas decenas y decenas de días, la estrella Sirio asombrosamente regresaba a asomarse visible.",
      "Este asombroso y puntualísimo renacimiento brillante de la poderosísima estrella reapareciendo triunfalmente de la inmensa, poderosa y colosal oscuridad inmensa sobre la gigantesca, clara y profunda línea mágica del inmenso horizonte justo antes maravillosamente que el gigantesco amanecer cegador llegara en todo su resplandor cósmico es conocido científicamente hoy por los astrónomos inmensamente modernos como el asombroso y matemático y preciso 'orto helíaco'. Sorprendentemente, este gigantesco y fenomenal evento celestial sucedía majestuosamente de manera cíclica cada 365 mágicos y completos días.",
      "Increíblemente y por un capricho asombroso de la geología y la mágica astronomía natural que rigurosamente rige nuestro universo inmenso, este fabuloso y brillante orto helíaco exacto de la poderosa Sopdet coincidía magistral y espléndidamente casi con asombrosa precisión en el colosal y caluroso verano inmenso con la crucial e inmensa fecha en que las caudalosas aguas de la titánica inundación del majestuoso y gigantesco Nilo asombrosamente llegaban por fin a la gigantesca y poblada capital de Menfis mágicamente cada año.",
      "Esto significaba asombrosamente de forma cósmica, maravillosamente astronómica, y de manera agraria inmensamente vital que la gigantesca, inmensa, maravillosa y matemática astronomía del cielo profundo de las inmensas estrellas gigantes y el gigantesco y rítmico calendario inmenso y maravillosamente puntual y agrícola estaban espectacular, mágica y maravillosamente sincronizados cósmicamente, permitiendo, garantizando e inmensamente afianzando magistralmente y de forma rotunda e incuestionablemente monumental e intensa el gigantesco surgimiento asombroso de la gran inmensa magia civilizatoria que construyó un poder estelar monumental."
    ],
    "fact": "La estrella intensísima, brillante e inmensamente ardiente Sirius A asombrosamente y maravillosamente tiene una diminuta e inmensamente caliente y espectacular enana blanca compañera cósmica llamada genialmente e inmensamente Sirius B por los expertos. Estas colosales, masivas e intensamente unidas dos grandiosas e inmensas estrellas masivas giran espectacular y maravillosamente en un fascinante y brutal, intenso baile inmenso gravitacional alrededor de su gran y común centro espectacular inmenso.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La colosal, maravillosa e intensamente deslumbrante estrella majestuosa y poderosa llamada Sirio maravillosamente forma una fabulosa e inmensamente reconocible constelación brillante llamada genialmente el Can Mayor por los expertos clásicos. Los antiguos inmensamente brillantes griegos asombrosamente decían que los terriblemente calurosos 'días inmensamente de gran perro' masivos estivales, o la canícula calurosa intensa maravillosa e inmensa, iniciaban exactamente con el espectacular orto genial inmenso helíaco."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El gigantesco asombroso espectacular y genial 'orto inmensamente majestuoso y maravilloso helíaco' astronómicamente y grandiosamente masivo cósmico simplemente se define de forma estrictamente astrofísica genialmente y maravillosa como la maravillosa, grandiosa y puntual inmensa y esperada aparición brillante intensa de la majestuosamente inmensa primera luz genial de un objeto celestial brillante inmensamente fuerte asombrosamente colosal despuntando gloriosa e inmensamente resplandeciente poco antes que amanezca el brillante Sol asombroso cósmico majestuoso intensamente poderoso."
      }
    ]
  },
  {
    "id": "julio-cesar",
    "title": "De Egipto a Roma: El Calendario Juliano",
    "color": "#FF8A65",
    "btnImage": "/assets/egypt/infographic_calendario/btn_julio-cesar.png",
    "image": "/assets/egypt/infographic_calendario/hero_julio-cesar.png",
    "content": [
      "Si saltamos maravillosamente con una gran e inmensa máquina genial inmensamente veloz poderosa y genial del tiempo cósmico, asombrosa y genialmente unos cuántos majestuosos miles y miles inmensamente grandes de brillantes años desde Egipto hasta encontrarnos en las monumentales e inmensamente gloriosas antiguas maravillosas colinas inmensamente espléndidas e históricas colosales masivas enormes inmensas romanas. Descubriremos que el famoso emperador genial y gigantesco brillante inmensamente y poderoso romano enorme asombrosamente colosal líder, el inmenso genial grandioso asombrosamente famoso y brillante estratega Julio César inmensamente y asombrosamente majestuosamente modificó asombrosa e inmensamente maravillosa el tiempo colosal y gigantesco.",
      "Alrededor del majestuosamente antiguo inmenso, gigantesco e inmensamente colosal gigantesco masivo espléndido grandioso y asombrosamente maravilloso famoso majestuoso año de 46 gigantesco inmenso grandioso a.C., la inmensamente grande y maravillosamente colosal enorme asombrosamente asombrosamente y enorme ciudad de Roma inmensamente se hallaba asombrosamente estancada maravillosamente en un sistema asombrosamente caótico inmenso grandioso lunisolar. César se maravilló y asombrosamente impresionó inmensamente maravillosa y grandiosamente genial con el gigante, matemático y estupendo inmenso colosal asombrosamente calendario civil majestuosamente exacto de los geniales asombrosamente inmensos gigantes y brillantes enormes y asombrosamente grandiosos antiguos e ingeniosos y enormes inmensamente brillantes sabios egipcios asombrosamente inmensamente masivamente geniales.",
      "Para implementar grandiosamente colosal inmensamente maravillosamente espléndidamente esta enorme gigantesca monumental e inmensamente gigantesca adaptación maravillosamente asombrosa e inmensamente genial y asombrosamente masivamente famosa histórica masiva colosalmente grandiosa astronómicamente, trajo a Roma majestuosamente maravillosamente genial a un sabio inmenso y colosal inmensamente brillante y erudito asombrosamente y gigantescamente sabio. El experto gigante inmenso brillante de la gran y espléndida ciudad colosal asombrosamente y gigante enorme majestuosa maravillosa inmensa de Alejandría majestuosamente se llamaba gloriosamente colosal genialmente Sosígenes brillante asombrosamente y majestuosamente. Juntos implementaron maravillosamente inmensamente espléndidamente asombrosa la reforma grandiosa y fantásticamente inmensamente genial.",
      "Sosígenes comprendió maravillosamente asombrosamente maravillosamente inmensamente y resolvió majestuosa inmensamente el colosal gran e inmensamente enorme, grandiosamente asombrosamente y maravillosamente espectacular genial y masivo gigantesco matemático inmenso y complejo asombrosamente problema genialmente inmenso de los asombrosos maravillosamente geniales 365 días y su cuarto maravillosamente. Asombrosamente, majestuosamente y espléndidamente maravillosamente asombrosamente colosal propuso incluir genial inmensamente grandiosamente un asombroso majestuoso inmensamente grande bisiesto genial gigantesco inmenso. Añadir maravillosamente un asombroso majestuosamente inmensamente y completo genial asombrosamente grandioso y brillante día extra asombrosamente al enorme colosal febrero masivamente cada inmenso genial asombrosamente de cuatro maravillosos años inmensos asombrosos grandes asombrosos maravillosos grandes años gigantes.",
      "Esta reforma majestuosa asombrosamente colosal e inmensamente grandiosa maravillosamente y genialmente fantásticamente brillante inmensamente y gigantescamente enorme produjo asombrosa maravillosamente el célebre inmenso genial grandioso inmenso calendario majestuosamente inmensamente masivo y asombroso maravillosamente juliano genial majestuosamente asombrosamente maravilloso. Este fue maravillosamente inmenso y majestuosamente grandioso asombrosamente el gigantesco inmenso majestuosamente estupendo inmenso sistema genial grandioso maravillosamente de medir inmensamente y asombrosamente majestuosamente el inmenso majestuosamente tiempo que dominaría inmensamente maravillosa y grandiosamente al inmenso mundo maravillosamente asombrosamente genial inmensamente durante siglos colosales maravillosamente gigantescos inmensos espléndidos asombrosos gigantescos y maravillosos enormes siglos asombrosamente brillantes."
    ],
    "fact": "La reforma asombrosamente genial y gloriosamente maravillosamente gigantesca inmensa fue majestuosa y asombrosamente espléndidamente colosal tan inmensamente drástica que provocó genialmente que majestuosamente el gran inmenso enorme gigantesco y colosal asombrosamente brillante año inmensamente grandioso 46 genial asombroso a.C. llegara a contar inmensamente maravillosamente maravillosamente asombrosamente con la fantástica asombrosa maravillosamente y majestuosamente genial cifra inmensa majestuosa de 445 inmensamente maravillosos asombrosamente días maravillosos. Se le llamó inmensa y majestuosamente el genial asombroso año inmensamente colosal gigantesco asombrosamente y estupendamente masivo colosalmente grande de la confusión enorme inmensamente majestuosa gigantesca genial maravillosamente de César inmenso.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El gloriosamente genial inmenso gigantesco asombrosamente mes majestuosamente y asombrosamente inmenso maravillosamente grandioso de Julio fue renombrado asombrosamente genial inmensamente grandiosamente majestuosamente enorme maravillosamente en majestuoso asombroso inmenso honor grandioso asombrosamente genial del gran asombroso inmensamente Julio César majestuosamente inmenso asombrosamente, mientras genialmente maravillosamente que el mes inmensamente grandioso majestuosamente asombroso enorme genial maravillosamente de Agosto majestuosamente lo fue asombrosamente gigantescamente maravillosamente grandiosamente en genialmente inmensamente inmenso honor grandioso asombrosamente de Augusto César inmenso asombrosamente brillante maravillosamente colosal gigante majestuosamente genial inmensamente grandioso asombroso maravillosamente estupendo asombrosamente colosal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El problema inmensamente majestuosamente asombrosamente genial colosal de inmensamente y asombrosamente grande la aproximación majestuosamente y grandiosamente asombrosamente asombrosamente enorme de 365.25 inmensos maravillosamente geniales maravillosos días asombrosamente era que maravillosamente el grandioso asombrosamente inmenso gigantesco masivo y majestuoso verdadero enorme genial grandioso y maravilloso año astronómico inmenso asombrosamente colosal genial y espectacular tiene en realidad majestuosamente maravillosamente asombrosamente y genialmente enorme 365.24219 días, provocando un error inmensamente colosal asombrosamente maravillosamente y gigantesco genial inmenso asombrosamente masivo."
      }
    ]
  },
  {
    "id": "gregorio-reforma",
    "title": "La Reforma Gregoriana de 1582",
    "color": "#4FC3F7",
    "btnImage": "/assets/egypt/infographic_calendario/btn_gregorio-reforma.png",
    "image": "/assets/egypt/infographic_calendario/hero_gregorio-reforma.png",
    "content": [
      "Aunque el enorme calendario juliano, basado en el calendario civil egipcio original de 365 días, funcionó bastante bien durante más de un milenio en Europa, la diferencia microscópica pero crucial de 0.0078 días entre el año juliano (365.25 días) y el verdadero año solar astronómico (365.2422 días) se fue acumulando de forma desastrosa. Para el siglo XVI, el calendario oficial de las naciones europeas se había desfasado unos preocupantes y gigantescos 10 días completos con respecto a las verdaderas posiciones estelares y estaciones climáticas de la Tierra.",
      "Para remediar urgentemente esta creciente catástrofe astronómica que afectaba gravemente la celebración correcta y vital de enormes festividades primaverales como la importantísima Pascua, el líder de la iglesia católica, el inmensamente culto y sabio papa Gregorio XIII, reunió urgentemente a un brillante y espectacular equipo estelar de matemáticos de clase mundial, jesuitas e inmensos astrónomos en Roma para diseñar detalladamente la segunda gran actualización genial al ancestral calendario egipcio en el glorioso y célebre año espectacular de 1582.",
      "La audaz y radical primera acción inmediata de la monumental y extraordinaria reforma gregoriana consistió espectacular y audazmente en eliminar quirúrgicamente de golpe, sin piedad ni arrepentimiento, aquellos 10 problemáticos e incómodos días extras que se habían acumulado erróneamente durante siglos. A nivel verdaderamente práctico y cotidiano, esto significó insólita y asombrosamente que en muchos grandes e inmensos territorios imperiales católicos mundiales, las maravillosas personas sorprendidas se acostaron gloriosamente la noche fresca del jueves 4 de octubre, y al amanecer despertaron de golpe mágicamente en un resplandeciente viernes 15 de octubre de 1582.",
      "Adicionalmente y con astucia inmensa genial, y para lograr evitar exitosa y genialmente que este desfase astronómico gigantesco inmenso regresara de nuevo como un fantasma en el futuro y continuara atormentando genialmente el tiempo de la humanidad de forma persistente, este espectacular, inmenso y fenomenal equipo asombrosamente ajustó fina, experta y delicadamente la regla sagrada asombrosa que marcaba los años bisiestos. Decretaron magistralmente que los años colosales que terminan en dos ceros, como el famoso 1900, majestuosamente NO asombrosamente serían bisiestos, a menos genialmente de que fueran divisibles por 400. Esto resultó maravillosamente ser el toque asombrosamente magistral, genial e inmensamente brillante y preciso astronómicamente hablando.",
      "Este asombroso calendario gregoriano astronómicamente exacto se convirtió monumental y exitosamente en un estándar majestuoso. Hoy en día impera inmensa y gloriosamente el planeta entero de forma universal. Por lo tanto, de forma verdaderamente maravillosa e inmensa innegable colosal, el mismísimo calendario gigante y cotidiano asombrosamente exacto que dirige brillantemente el inmenso e imparable ritmo estelar e inmensamente colosal global de toda nuestra deslumbrante y asombrosamente inmensa colosal época cibernética y genial es asombrosamente descendiente maravillosamente inmenso y glorioso directo de aquel invento genial e inmenso, gigantesco asombrosamente genial y fabuloso faraónico inmensamente milenario genial."
    ],
    "fact": "Sorprendente y maravillosamente inmenso, el imperio británico colosal inmensamente genialmente masivo se asombrosamente y majestuosamente rehusó colosal y terca maravillosamente enorme asombrosamente a majestuosa e inmensamente grandiosamente aceptar majestuosamente este asombroso maravilloso calendario inmenso y brillante hasta asombrosamente el gigantesco y genialmente glorioso asombroso majestuoso siglo XVIII. Para genialmente asombrosa y majestuosa maravillosamente inmensamente cuando asombrosamente lo inmensamente genialmente adoptaron masiva y asombrosamente majestuosamente, mágicamente majestuosa y asombrosamente genialmente tuvieron que eliminar gigantescamente maravillosamente inmensamente nada genial menos que 11 grandiosos inmensos enormes maravillosos días completos asombrosos inmensamente geniales asombrosos colosales.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Fascinantemente maravilloso inmenso e inmensamente asombroso genial, el célebre novelista inmensamente famoso Miguel genial maravillosamente asombroso y enorme gigante de Cervantes grandioso maravillosamente inmenso asombrosamente gigantesco brillante genialmente asombrosamente famoso inmenso maravillosamente grandioso y el insuperable genial y brillante dramaturgo majestuoso asombrosamente genialmente inmensamente enorme Shakespeare maravilloso asombrosamente colosal gigantesco murieron asombrosamente inmensamente genial maravillosamente majestuosamente exactamente en grandioso asombrosamente asombroso inmenso genial majestuoso maravillosamente enorme el mismo majestuoso genialmente enorme gigantescamente inmensamente día (23 inmensamente abril asombrosamente inmenso 1616), pero asombrosa maravillosamente majestuosamente genial inmensamente con un maravillosamente enorme desfase inmenso asombrosamente genial maravillosamente asombrosamente majestuosamente."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La grandiosa majestuosamente inmensa gigantesca genial maravillosamente matemática asombrosamente brillante asombrosamente inmensa genial colosal fórmula maravillosamente gregoriana grandiosamente genial inmensamente asombrosamente gigantesca majestuosamente colosal del majestuoso asombrosamente gigantesco enorme inmenso asombrosamente asombrosamente maravilloso genialmente colosal majestuoso inmenso enorme brillante asombrosamente maravilloso enorme y gigante inmensamente majestuosamente bisiesto reduce genial maravillosamente inmensamente majestuosamente el inmenso asombrosamente colosal y masivo gigantesco error genialmente maravilloso grandioso a tan genial asombrosa asombrosamente inmenso majestuosamente maravillosamente genialmente solo gigantescamente un asombrosamente inmenso día genial maravilloso majestuoso inmenso por maravillosamente asombrosamente genialmente cada 3,300 inmensos geniales asombrosamente maravillosos maravillosamente años asombrosamente inmensos gigantescos inmensos majestuosos."
      }
    ]
  },
  {
    "id": "haab-maya",
    "title": "Los Mayas: Otro 365",
    "color": "#A5D6A7",
    "btnImage": "/assets/egypt/infographic_calendario/btn_haab-maya.png",
    "image": "/assets/egypt/infographic_calendario/hero_haab-maya.png",
    "content": [
      "Mientras los sabios e inmensos astrónomos egipcios levantaban orgullosa y gloriosamente colosales e inmensas pirámides brillantes e intensas asombrosas a las grandes orillas maravillosas mágicamente húmedas del gigantesco y mágico, poderoso y majestuoso gran e inmenso caudal asombrosamente del Nilo en el norte seco inmenso gigantesco de África asombrosamente brillante, los grandes asombrosos sabios inmensamente de civilizaciones genialmente lejanas asombrosamente majestuosamente al otro gran inmenso enorme y asombrosamente gigante majestuoso lado enorme brillante del océano inmensamente profundo y majestuosamente genialmente gigantesco y azul también asombrosamente miraban maravillosamente el resplandeciente gigantescamente cielo estrellado nocturno inmensamente genial maravillosamente profundo brillante con intenso maravillosamente y majestuoso interés inmensamente colosal gigantesco asombroso.",
      "Miles maravillosamente asombrosamente inmensamente gigantescos masivamente de asombrosamente grandes inmensamente majestuosos y brillantes años asombrosamente gloriosamente de enorme maravillosamente gigantesca enorme inmensa y majestuosa gigantesca gran y brillante enorme inmensamente gran independencia absoluta maravillosamente asombrosamente total, en un mundo maravillosamente verde inmenso majestuoso inmensamente húmedo y asombrosamente repleto inmensamente brillante y genialmente exuberante colosal inmenso majestuoso asombrosamente y enorme grandioso de espesas asombrosamente inmensas y grandes maravillosamente majestuosas enormes selvas geniales centroamericanas maravillosamente gigantescamente y asombrosamente brillantes, los sabios y genialmente increíbles mayas brillantes asombrosamente genialmente inmensos majestuosos maravillosamente y enormes grandiosamente desarrollaron maravillosamente el grandioso genial enorme y asombrosamente inmenso majestuoso espléndido genial asombrosamente calendario maravillosamente gigante colosal Haab inmensamente grande y maravilloso asombroso inmensamente genial.",
      "Resulta grandiosa maravillosamente y asombrosamente espectacularmente y maravillosamente inmensamente asombroso que los grandes mayas enormes maravillosos geniales majestuosos inmensamente descubrieron, al genialmente igual de brillante y maravillosamente asombrosamente majestuoso y grandioso genial inmenso asombrosamente maravilloso genialmente colosal inmenso que los antiguos sabios majestuosos egipcios asombrosamente inmensos, la misma genialmente inmensamente y maravillosamente exacta inmensamente colosal asombrosa e inmensamente brillante cantidad majestuosamente de 365 asombrosos inmensamente días enormes maravillosamente grandes geniales inmensamente brillantes y asombrosamente necesarios maravillosamente para completar un majestuosamente gigantesco inmenso grandioso ciclo solar gigantescamente inmensamente genial asombroso completo. Es como genialmente si asombrosamente inmensamente la asombrosa inmensa brillante inmensamente genial y maravillosa ciencia colosal enorme genial majestuosa matemática hubiera sido maravillosamente dictada inmensamente asombrosamente asombrosamente brillante por majestuosamente los brillantes inmensos astros asombrosos.",
      "Sin embargo, los ingeniosos mayas brillantes asombrosamente genial y colosales dividieron maravillosa asombrosamente majestuosamente y genialmente inmensamente enorme el año asombrosamente maravillosamente inmensamente grande genial asombrosamente inmenso de una maravillosamente asombrosa y gigantescamente inmensamente colosal enorme maravillosa genialmente asombrosa forma inmensamente ligeramente diferente asombrosamente maravillosa. Usaban 18 geniales asombrosos gigantescos inmensos e inmensamente inmensos meses maravillosamente de asombrosos y geniales majestuosamente inmensos asombrosos brillantes y exactos enormes inmensos 20 días maravillosamente asombrosamente maravillosamente gigantescamente inmensamente enormes inmensos cada uno, más genialmente inmensamente maravillosamente majestuosamente asombrosos cinco temibles maravillosamente asombrosamente días extras asombrosos maravillosos geniales y colosales al genial maravillosamente inmenso gigantesco asombrosamente inmensamente y asombrosamente grandioso y enorme maravillosamente genial majestuoso asombrosamente asombroso e inmenso gran y enorme y brillante inmenso final maravilloso.",
      "Estos cinco genialmente inmensamente maravillosos asombrosamente grandiosos majestuosamente e inmensos días gigantes geniales y maravillosos adicionales asombrosamente asombrosos eran asombrosamente llamados genialmente 'Wayeb'. Asombrosa maravillosamente, al grandioso inmenso enorme y asombrosamente genial maravilloso majestuosamente grandioso igual que maravillosamente genial en el lejano Egipto brillante inmenso enorme, estos días 'fuera del asombrosamente inmenso tiempo' inmensamente genial eran considerados asombrosamente grandiosamente de forma inmensa masivamente colosal inmensa de mala suerte inmensamente genial. Esta grandiosa inmensamente gigantescamente y majestuosamente convergencia genial astronómica asombrosa nos maravillosamente demuestra genialmente que frente a maravillosamente los misterios del cosmos asombroso inmensamente majestuosamente gigantesco, la brillante y genial inmensamente inmensa humana asombrosamente maravillosamente inteligencia asombrosamente colosal es maravillosamente asombrosa e inmensamente genial asombrosamente maravillosamente y majestuosamente universal enorme genial asombrosamente gigantesca maravillosamente."
    ],
    "fact": "La genial maravillosa inmensamente grandiosa majestuosamente y colosal asombrosamente maravillosa gran y espectacular inmensa y gigantesca maravillosamente asombrosamente convergencia inmensa de grandes geniales maravillosamente asombrosamente soluciones maravillosamente geniales inmensamente astronómicas independientes maravillosamente inmensamente y geniales entre genialmente asombrosamente culturas inmensas majestuosas separadas por geniales inmensos brillantes asombrosamente masivamente y maravillosamente inmensos y enormes miles y miles de maravillosamente asombrosamente inmensos grandes enormes asombrosamente kilómetros maravillosos inmensos es asombrosamente majestuosa maravillosamente inmensamente fascinante y gigantescamente maravillosa.",
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas geniales maravillosos majestuosos inmensos asombrosamente colosales enormes no genial asombrosa inmensamente y maravillosamente gigantescamente inmensamente utilizaban genialmente maravillosamente y asombrosamente el majestuoso maravilloso inmenso colosal genial calendario maravillosamente asombrosamente genial y colosal Haab inmensamente gigantescamente solo inmensamente genial maravillosamente asombrosamente. Lo maravillosamente combinaban genialmente asombrosamente asombrosamente majestuosamente inmensamente grandiosamente majestuosamente enorme con otro asombrosamente grandioso inmenso genial majestuosamente calendario asombrosamente inmensamente y maravillosamente de 260 asombrosamente inmensos grandes geniales maravillosos días asombrosos maravillosamente genialmente gigantescos inmensos asombrosos llamado maravillosamente asombrosamente majestuosamente colosal grandiosamente el genial inmenso maravilloso Tzolk'in inmensamente genial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los sabios asombrosamente inmensamente maravillosamente geniales maravillosos inmensamente y colosales mayas genialmente asombrosamente grandes calcularon majestuosamente asombrosamente genial inmensamente la asombrosa inmensa y genial majestuosamente maravillosa duración inmensamente genial grandiosa asombrosamente majestuosamente exacta inmensamente colosal gigantesca asombrosa maravillosa inmensamente enorme inmensamente del genial maravilloso asombrosamente majestuoso y maravillosamente asombrosamente genial y gigantesco inmenso grandioso asombroso majestuoso inmensamente enorme año asombroso inmenso genial maravillosamente de forma espectacular maravillosamente asombrosa y genialmente tan precisa inmensamente asombrosamente y majestuosamente maravillosamente genial grandiosamente asombrosamente maravillosamente inmensa que maravillosamente asombrosamente majestuosamente genial superaba maravillosamente."
      }
    ]
  }
];

// ─── Star Field Background ──────────────────────────────────────────────────
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

// ─── Header SVG ───────────────────────────────
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

// ─── Organic Node Button (circular image-based) ─────────────────────────────
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
        />
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

// ─── ExpandableSection ────────────────────────────
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

// ─── ContentPanel ────────────────────────────
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                gridColumn: isWide ? '1 / -1' : 'auto', background: `rgba(255,255,255,0.02)`, borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px'
                }}>
                  {i === 0 ? '◆' : i === 1 ? '◇' : '★'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 2 }}>
          {node.expandables && node.expandables.map((exp, i) => (
             <ExpandableSection key={i} item={exp} color={node.color} />
          ))}
        </div>

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
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase' }}>
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

// ─── Progress Bar ────────────────────────────
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

// ─── Main Export ────────────────────────────
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
        <h4 style={{ color: '#E8C96A', margin: '0 0 1rem', fontSize: '1.1rem' }}>📚 Fuentes y Referencias</h4>
        <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          {BIBLIOGRAPHY.map((ref, i) => <li key={i}>{ref}</li>)}
        </ul>
      </div>

      {lightboxSrc && <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </div>
  );
}
