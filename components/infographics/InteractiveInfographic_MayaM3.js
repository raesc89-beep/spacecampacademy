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
  'haab-estructura': [DecoCalendarRound, DecoGlyphCircle, DecoSunCycle],'dieciocho-meses': [DecoCalendarRound, DecoMaizPlant, DecoGlyphCircle],'wayeb-peligroso': [DecoRainDrop, DecoSunCycle, DecoCalendarRound],'agricola-estacional': [DecoMaizPlant, DecoRainDrop, DecoSunCycle],
  'comparacion-gregoriano': [DecoSunCycle, DecoCalendarRound, DecoGlyphCircle],'glifos-meses': [DecoGlyphCircle, DecoCalendarRound, DecoMaizPlant],'uso-cotidiano': [DecoCalendarRound, DecoMaizPlant, DecoSunCycle],
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
      'Imagina que quieres organizar una fiesta o un festival, pero no tienes un calendario en la pared ni un teléfono. ¿Cómo sabrías cuándo celebrar? Los antiguos mayas construyeron su propio sistema para medir el tiempo. Crearon el "Haab", un calendario solar de trescientos sesenta y cinco días. Era como un reloj que guiaba la vida de su civilización.',
      'Al igual que nosotros agrupamos nuestros días en meses, ellos también lo hacían, pero con reglas matemáticas diferentes. En lugar de tener doce meses desiguales, los mayas dividieron su año en dieciocho meses simétricos. Cada uno de estos meses tenía exactamente veinte días.',
      'Si multiplicas dieciocho meses por veinte días, el resultado es trescientos sesenta. Casi todo el año estaba organizado en periodos de veinte días. Pero un año solar verdadero tiene trescientos sesenta y cinco días. Los mayas reservaron los cinco días restantes para el final.',
      'Añadieron un mes especial de solo cinco días al terminar su ciclo regular, llamado "Wayeb". Con esto, la cuenta llegaba a trescientos sesenta y cinco días de forma exacta. Esta estructura matemática les permitía planificar desde ceremonias en templos hasta el momento para cultivar su milpa.',
      'Piensa en el calendario Haab como los engranajes de un reloj. Cada día tenía un número del cero al diecinueve, y cada mes tenía su propio nombre. El cero fue un número que los mayas descubrieron antes que los europeos. Por eso, el primer día del mes era el "asiento", representando el cero. El tiempo fluía de forma matemática.'
    ],
    expandables: [
      { label: 'Las Matemáticas del Tiempo', icon: 'clock', text: 'Los mayas usaban un sistema matemático vigesimal, basado en el número veinte, usando los dedos de las manos y pies. A diferencia de nuestro sistema decimal, era lógico para ellos crear meses de veinte días. Todo en su calendario encajaba con su forma de contar.' },
      { label: 'El Ciclo Sin Fin', icon: 'clock', text: 'Los mayas veían el tiempo como ruedas engranadas girando en ciclos, a diferencia de nuestra cuenta lineal. El Haab se combinaba con un calendario de 260 días llamado Tzolkin, formando la Rueda Calendárica. Pasaban cincuenta y dos años solares antes de que una fecha se repitiera de manera idéntica.' },
    ],
    fact: 'Los astrónomos mayas calcularon la duración del año solar con un margen de error minúsculo. Observaron el cielo desde sus pirámides sin telescopios. Su observación empírica fue tan precisa que sus conocimientos astronómicos rivalizaban con los cálculos de los científicos europeos de esa época.',
  },
  {
    id: 'dieciocho-meses',
    title: 'Los 18 Meses',
    color: '#795548',
    btnImage: '/assets/maya/infographic_m3/btn_dieciocho-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_dieciocho-meses.jpg',
    content: [
      'Nuestros meses actuales provienen de antiguos dioses o números romanos. Sin embargo, para la civilización maya, los nombres de sus dieciocho meses tenían un significado práctico. Estaban conectados con la naturaleza que los rodeaba en las selvas y montañas de Mesoamérica.',
      'Cada uno de los meses del Haab duraba veinte días. Tenían nombres como Pop, Wo, Sip, Sotz, Sek, Xul, Yaxkin, Mol, Chen, Yax, Sak, Keh, Mak, Kankin, Muwan, Pax, Kayab y Kumku. Estos nombres estaban vinculados a las actividades agrícolas, animales de la selva y ciclos de lluvias.',
      'Por ejemplo, el mes "Sotz" significa "murciélago". Durante esta época del año, estos animales eran más activos y los mayas realizaban ceremonias para honrar su papel como polinizadores. El mes "Yaxkin", que se traduce como "primer sol", marcaba el inicio de la temporada seca tras las lluvias.',
      'Estos meses funcionaban como una guía de supervivencia y prosperidad comunitaria. Le decían a los agricultores y gobernantes cuándo la tierra estaría húmeda para sembrar, cuándo el sol secaría los campos, o cuándo los animales de caza estarían migrando por sus territorios.',
      'Su calendario era un manual de instrucciones de la naturaleza traducido por los astrónomos. Hoy consultamos aplicaciones meteorológicas para saber si va a llover, pero los mayas miraban su calendario Haab para comprender en qué momento del ciclo natural se encontraban.',
    ],
    expandables: [
      { label: 'El Mes Pop', icon: 'atom', text: 'El mes "Pop" significa "estera" o "petate", un tapete donde se sentaban los reyes y gobernantes mayas. Este mes marcaba el primer día del Año Nuevo en el calendario Haab. Se encendían fuegos en los templos y las comunidades limpiaban sus casas para dar la bienvenida a un ciclo nuevo.' },
      { label: 'Ceremonias del Fuego', icon: 'clock', text: 'Durante el mes "Mak", se realizaban ceremonias en las que los sacerdotes extinguían los fuegos en las plazas de las ciudades mayas. Esta ceremonia simbolizaba el final de la temporada de sequía. Era una forma de pedir a las deidades que trajeran las lluvias para los campos de maíz.' },
    ],
    fact: 'Muchos de estos nombres de meses tienen diferentes interpretaciones dependiendo de la región maya, ya que hablaban más de treinta idiomas distintos. A pesar de las diferencias en la pronunciación, los símbolos jeroglíficos tallados en la piedra significaban lo mismo en todos sus dominios.',
  },
  {
    id: 'wayeb-peligroso',
    title: 'Los 5 Días Wayeb',
    color: '#D84315',
    btnImage: '/assets/maya/infographic_m3/btn_wayeb-peligroso.jpg',
    image: '/assets/maya/infographic_m3/hero_wayeb-peligroso.jpg',
    content: [
      '¿Alguna vez has sentido que un día es extraño o está fuera de lugar? Los antiguos mayas sentían esta preocupación durante cinco días enteros, y toda la comunidad compartía este sentimiento. Así eran los días "Wayeb". Estos cinco días adicionales al final de sus meses sumaban los 365 días del año.',
      'El Wayeb no era un momento de celebración. Los mayas consideraban que estos días eran peligrosos y de mala suerte. Era un período transitorio donde el orden normal del mundo se detenía. Durante este hueco temporal, las barreras protectoras entre nuestro mundo y el inframundo se debilitaban.',
      'A estos días se les llamaba los "días sin nombre". Eran vistos como portales a través de los cuales seres monstruosos y energías oscuras podían cruzar hacia el mundo de los humanos. Por eso, durante el Wayeb, la actividad de las ciudades mayas se detenía en un silencio solemne.',
      'Para mantenerse a salvo, las personas se quedaban escondidas dentro de sus casas y hablaban en voz baja. Evitaban trabajos físicos y viajes por la selva. Incluso intentaban no lavarse el cabello, no barrer sus patios y no encender fuegos para no atraer mala fortuna.',
      'Los sacerdotes y chamanes trabajaban realizando rituales de protección en las pirámides. Estos ritos sagrados ayudaban a alejar las fuerzas adversas, garantizando que el universo no colapsara y asegurando que el sol volviera a brillar en el Año Nuevo.'
    ],
    expandables: [
      { label: 'Criaturas del Inframundo', icon: 'clock', text: 'La sociedad maya creía que deidades y criaturas del Xibalbá (su inframundo) caminaban libres durante el Wayeb. Las leyendas hablaban sobre entes traviesos y deidades de la enfermedad deambulando. El mayor peligro era el colapso repentino y definitivo del universo.' },
      { label: 'El Dios Mam', icon: 'clock', text: 'Durante este periodo transicional, una deidad antigua llamada el Dios "Mam" reinaba como dueño de estos cinco días. Se le representaba como un anciano llevando una caracola. Simbolizaba el peso de la edad, el declive inminente y la inestabilidad de la creación antes de que el Año Nuevo la reiniciara.' },
    ],
    fact: 'En muchas comunidades mayas modernas que preservan tradiciones orales de sus antepasados, persiste la costumbre de mantenerse en quietud. Evitan tareas arduas y toman precauciones en los días finales que preceden al comienzo de un ciclo calendárico nuevo, honrando la herencia del Wayeb.',
  },
  {
    id: 'agricola-estacional',
    title: 'Calendario Agrícola',
    color: '#66BB6A',
    btnImage: '/assets/maya/infographic_m3/btn_agricola-estacional.jpg',
    image: '/assets/maya/infographic_m3/hero_agricola-estacional.jpg',
    content: [
      '¿Cómo saben los agricultores cuándo sembrar sus semillas para que crezcan sanas? Los antiguos mayas no tenían estaciones marcadas en calendarios modernos; su reloj agrícola era el calendario Haab. Este calendario era una herramienta de supervivencia esencial de su civilización agraria.',
      'A diferencia de lugares con primavera, verano, otoño e invierno, las regiones tropicales de Mesoamérica tienen dos estaciones principales: una estación seca y una estación lluviosa con tormentas tropicales. El Haab fue diseñado para sincronizarse y rastrear este ciclo climático de lluvia y sequía.',
      'El corazón de la cultura maya era la parcela de cultivo llamada "milpa". En la milpa crecía maíz, frijoles, calabazas y chiles. Para que el maíz creciera fuerte, los campesinos tenían que sembrar las semillas justo antes de que comenzaran las lluvias tropicales.',
      'Los sacerdotes, que eran astrónomos expertos, utilizaban el calendario Haab para informar a los agricultores. Les indicaban cuándo debían talar los bosques, cuándo quemar la vegetación para crear cenizas fertilizantes, y en qué día preciso sembrar cada semilla en la tierra húmeda.',
      'Una señal astronómica crucial en el calendario agrícola del Haab era el "paso del sol por el cenit". Dos veces al año, en las latitudes donde vivían los mayas, el sol se posicionaba directamente sobre sus cabezas al mediodía sin producir sombras. Este fenómeno anunciaba el inicio de la temporada de lluvias.',
    ],
    expandables: [
      { label: 'El Maíz Sagrado', icon: 'atom', text: 'El maíz no era solo un alimento; era sagrado. Según el Popol Vuh, el libro de la creación de los mayas kiche\', los dioses intentaron crear a los humanos con barro y madera sin éxito. Finalmente lograron moldear a las personas usando masa de maíz blanco y amarillo.' },
      { label: 'Las Pirámides y el Sol', icon: 'clock', text: 'Las pirámides mayas eran instrumentos astronómicos diseñados para medir el calendario solar Haab. Sus escalinatas en lugares como Chichén Itzá o Uaxactún estaban alineadas por constructores para marcar la salida y la puesta del sol durante los solsticios y equinoccios de las siembras.' },
    ],
    fact: 'La técnica agrícola maya de la milpa es una de las formas más sostenibles de agricultura. Mezclan diferentes cultivos que crecen juntos y se nutren mutuamente en el mismo suelo, evitando agotar rápidamente a la naturaleza.',
  },
  {
    id: 'comparacion-gregoriano',
    title: 'Comparación con el Gregoriano',
    color: '#42A5F5',
    btnImage: '/assets/maya/infographic_m3/btn_comparacion-gregoriano.jpg',
    image: '/assets/maya/infographic_m3/hero_comparacion-gregoriano.jpg',
    content: [
      'Nuestro calendario se llama "calendario gregoriano", en honor al Papa Gregorio XIII, quien lo introdujo en el año 1582. Si comparamos este calendario moderno con el calendario Haab de los mayas, encontraremos similitudes que demuestran una gran observación astronómica.',
      'Ambos calendarios comparten una característica fundamental: los dos están basados en la duración de 365 días. Esto demuestra que, sin importar la distancia y sin haberse conocido, tanto los estudiosos mayas en América como los pensadores de Europa llegaron a conclusiones solares similares.',
      'Sin embargo, hay una diferencia matemática profunda entre los dos sistemas. El viaje anual de la Tierra alrededor del Sol no tarda exactamente trescientos sesenta y cinco días cerrados, sino trescientos sesenta y cinco días con casi seis horas adicionales.',
      'En nuestro calendario gregoriano, los matemáticos resolvieron este desfase sumando un año bisiesto. Añaden un día extra el veintinueve de febrero cada cuatro años. Pero los mayas no insertaban días adicionales. Como resultado, el calendario Haab iba desfasándose de las estaciones reales en un día cada cuatro años solares.',
      'Esto significaba que, en un ciclo largo, un mes del Haab que originariamente correspondía a las lluvias, años después caería en la temporada seca. Para los mayas, esto no era un error. Valoraban el ciclo matemático abstracto más que mantener inamovibles las estaciones climáticas en su calendario de piedra.',
    ],
    expandables: [
      { label: 'Una Visión Distinta del Tiempo', icon: 'clock', text: 'La decisión maya de no usar años bisiestos artificiales no fue producto de la ignorancia. Conocían perfectamente la discrepancia solar que existía. Pero consideraban que su ciclo de días era demasiado sagrado para ser alterado con días sueltos e insertados artificialmente.' },
      { label: 'Correcciones Telescópicas', icon: 'clock', text: 'Para corregir su desviación paulatina respecto del sol, los sacerdotes mayas registraban fechas precisas en monumentos de piedra. Documentaban la diferencia exacta, logrando mantener una sincronicidad estelar que duraría miles de años, superando en algunos casos a los cálculos griegos y romanos.' },
    ],
    fact: 'El calendario gregoriano europeo fue una actualización al antiguo sistema juliano romano. Durante la época del Imperio Romano, su propio calendario también se había desfasado muchísimos días completos respecto al sol primaveral y los equinoccios de las festividades agrícolas.',
  },
  {
    id: 'glifos-meses',
    title: 'Los Glifos',
    color: '#009688',
    btnImage: '/assets/maya/infographic_m3/btn_glifos-meses.jpg',
    image: '/assets/maya/infographic_m3/hero_glifos-meses.jpg',
    content: [
      'Para los constructores mayas, la escritura antigua era algo más que anotar registros. Escribían los meses de su calendario Haab usando intrincados "glifos". En lugar de ser simples palabras, cada mes era retratado como una obra de arte tallada en las piedras de las pirámides.',
      'Un glifo maya de un mes calendario no es como nuestra letra "A". Es un cuadro detallado que muestra una cara humana estilizada, el perfil de un animal sagrado de la selva o diseños complejos de motivos de plantas y del cosmos.',
      'Cada uno de los dieciocho meses del Haab tenía su propio diseño jeroglífico inconfundible, acompañado con un número expresado en barras y puntos. Una barra horizontal representaba un valor de cinco, y un punto representaba el número uno. Esto convertía a la escritura maya en un sistema visual y compacto.',
      'Para los antiguos escribas que pintaban los códices mayas, o para los artesanos que tallaban en roca, esculpir el glifo de un mes era un trabajo respetado. Los escribas eran considerados nobles porque poseían la habilidad de registrar los eventos históricos y el tiempo.',
      'Si examinas uno de estos símbolos del Haab tallado en piedra, notarás que el glifo central reposaba dentro de un marco decorativo o cartucho que funcionaba como pedestal. Era una manera de enmarcar y darle importancia a este período cíclico en la historia del cosmos.',
    ],
    expandables: [
      { label: 'El Arte de Escribir', icon: 'atom', text: 'La escritura jeroglífica maya es uno de los pocos sistemas originales inventados de forma autónoma en la historia humana. Aprender a tallar los glifos requería años de estudio en escuelas dedicadas exclusivamente al arte de la caligrafía mesoamericana precolombina.' },
      { label: 'Sobrevivientes de Papel', icon: 'clock', text: 'Solamente tres libros mayas antiguos originales, llamados códices, sobrevivieron a la destrucción provocada por los conquistadores españoles. Estos libros desplegables están hechos de corteza de árbol de amate y contienen registros sobre sus ciclos astronómicos y ceremoniales.' },
    ],
    fact: 'Durante siglos, los glifos mayas fueron un misterio indescifrable. No fue hasta la década de mil novecientos ochenta que expertos y epigrafistas lograron comprender y leer de manera exitosa la mayoría de estas antiguas piedras talladas en Centroamérica.',
  },
  {
    id: 'uso-cotidiano',
    title: 'Uso Cotidiano',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m3/btn_uso-cotidiano.jpg',
    image: '/assets/maya/infographic_m3/hero_uso-cotidiano.jpg',
    content: [
      'Lejos de las pirámides ceremoniales donde se hacían los cálculos celestes, el calendario Haab era el reloj comunitario que sincronizaba la vida de la sociedad maya. Para una familia regular de comerciantes o campesinos, conocer la fecha exacta era fundamental para sus actividades diarias.',
      'Los mercados mesoamericanos operaban en días fijos específicos de las semanas o meses del Haab. Conocer qué fecha calendario era, les permitía a las familias caminar arduas jornadas para vender sus productos, como plumas o cacao, y saber que llegarían en un día de actividad comercial.',
      'El Haab también era necesario para agendar festivales y celebraciones públicas. Al igual que nosotros celebramos el Año Nuevo, los mayas usaban el calendario Haab para programar festines, ceremonias de bailes, representaciones teatrales y juegos de pelota en los centros de las ciudades.',
      'Este sistema preciso no se usaba únicamente para fines organizativos a nivel comunitario; formaba parte del sistema administrativo y gubernamental. Sirvió eficientemente como registro oficial. Cuando el hijo de un gobernante nacía, su fecha Haab y nombre calendárico se inscribían en monumentos.',
      'Este calendario de trescientos sesenta y cinco días entrelazaba la vida diaria de su civilización. Así como los estudiantes asisten a la escuela y celebran su cumpleaños basándose en calendarios modernos, un habitante maya organizaba su vida inmerso en este ritmo cósmico medido por el Haab.'
    ],
    expandables: [
      { label: 'Nombres al Nacer', icon: 'clock', text: 'La fecha calendárica exacta en que nacía un bebé maya tenía una gran importancia personal y astronómica. Muchos gobernantes y campesinos tomaban como su propio nombre personal el día específico en el que habían nacido, conectándose así al ciclo temporal maya.' },
      { label: 'La Vida del Campesino', icon: 'clock', text: 'Para las familias de campesinos, el Haab era una herramienta práctica para el mantenimiento del hogar. Leer las estaciones solares era crucial para saber cuándo reparar sus casas techadas con hojas secas, o saber en qué momento recolectar recursos en la selva.' },
    ],
    fact: 'Las inscripciones que conmemoran eventos como coronaciones y batallas, encontradas en estelas y pirámides mayas, combinaban una fecha Haab con otros ciclos sagrados. Esta combinación creaba una "Cuenta Larga" histórica de extrema exactitud a nivel mundial.',
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(253,216,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SOLAR DE 365 DÃƒÂAS</text>
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
                position: 'absolute'...pos, zIndex: 1, pointerEvents:'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#1a1005',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
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
              🔬  ¡Has dominado los secretos del Calendario Haab!
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
          🔬 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>"Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Ã‚Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
