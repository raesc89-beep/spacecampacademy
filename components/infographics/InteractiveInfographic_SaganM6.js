'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Cosmic Sagan themed) ————————————————————
function DecoStarField({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central star */}
      <polygon points="30,6 34,22 50,22 37,32 42,48 30,38 18,48 23,32 10,22 26,22" fill={color} opacity="0.3" stroke={color} strokeWidth="0.8" />
      {/* Small surrounding stars */}
      <circle cx="8" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="52" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="50" cy="50" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="48" r="1" fill={color} opacity="0.4" />
      <circle cx="30" cy="56" r="1.2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#7A5BAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Telescope body */}
      <line x1="15" y1="50" x2="40" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Lens */}
      <circle cx="42" cy="12" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="42" cy="12" r="3" fill={color} opacity="0.2" />
      {/* Tripod legs */}
      <line x1="15" y1="50" x2="8" y2="58" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="15" y1="50" x2="22" y2="58" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Star sparkles near lens */}
      <circle cx="52" cy="8" r="1" fill={color} opacity="0.6" />
      <circle cx="48" cy="3" r="0.8" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoPlanetRings({ size = 70, color = '#9370C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Planet body */}
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Rings */}
      <ellipse cx="30" cy="30" rx="24" ry="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" transform="rotate(-20 30 30)" />
      <ellipse cx="30" cy="30" rx="20" ry="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" transform="rotate(-20 30 30)" />
      {/* Moons */}
      <circle cx="52" cy="18" r="2" fill={color} opacity="0.5" />
      <circle cx="10" cy="42" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSpacecraft({ size = 80, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Voyager-like spacecraft body */}
      <rect x="30" y="16" width="20" height="8" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Antenna dish */}
      <path d="M25 20 Q20 12 15 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="15" cy="20" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Solar panels / booms */}
      <line x1="50" y1="20" x2="65" y2="10" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="50" y1="20" x2="65" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <rect x="62" y="7" width="10" height="6" rx="1" fill={color} opacity="0.2" />
      <rect x="62" y="27" width="10" height="6" rx="1" fill={color} opacity="0.2" />
      {/* Signal waves */}
      <path d="M10 20 Q7 16 4 20" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M7 20 Q3 14 -1 20" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function DecoGoldenRecord({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Record disc */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.3" />
      {/* Pulsar map lines */}
      <line x1="30" y1="30" x2="50" y2="15" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="30" x2="12" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="30" x2="20" y2="52" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Small dots at endpoints */}
      <circle cx="50" cy="15" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="20" cy="52" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoPaleBlueDot({ size = 70, color = '#5B3D8F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Sun ray band */}
      <rect x="26" y="2" width="8" height="56" rx="4" fill={color} opacity="0.08" />
      {/* The pale blue dot */}
      <circle cx="30" cy="34" r="2.5" fill="#6EC6FF" opacity="0.6" />
      {/* Scattered light rays */}
      <line x1="10" y1="10" x2="50" y2="50" stroke={color} strokeWidth="0.5" opacity="0.15" />
      <line x1="50" y1="10" x2="10" y2="50" stroke={color} strokeWidth="0.5" opacity="0.15" />
      {/* Distant stars */}
      <circle cx="8" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="52" cy="8" r="0.8" fill={color} opacity="0.3" />
      <circle cx="48" cy="45" r="1" fill={color} opacity="0.4" />
      <circle cx="12" cy="50" r="0.8" fill={color} opacity="0.3" />
      <circle cx="5" cy="35" r="0.6" fill={color} opacity="0.3" />
      <circle cx="55" cy="28" r="0.7" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'vida-dedicada-estrellas': [DecoStarField, DecoTelescope, DecoPaleBlueDot],
  'el-cientifico': [DecoPlanetRings, DecoTelescope, DecoSpacecraft],
  'el-comunicador': [DecoStarField, DecoGoldenRecord, DecoPlanetRings],
  'activismo-politica': [DecoPaleBlueDot, DecoSpacecraft, DecoStarField],
  'ann-druyan-companera': [DecoGoldenRecord, DecoStarField, DecoPlanetRings],
  'ultimos-anios': [DecoPaleBlueDot, DecoTelescope, DecoGoldenRecord],
  'legado-eterno': [DecoSpacecraft, DecoStarField, DecoPlanetRings],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space, Random House',
  'Poundstone, W. (1999). Carl Sagan: A Life in the Cosmos, Henry Holt and Company',
  'Davidson, K. (1999). Carl Sagan: A Life, John Wiley & Sons',
  'Druyan, A. (2020). Cosmos: Possible Worlds, National Geographic Books',
  'Sagan, C. (1980). Cosmos, Random House',
  'Sagan, C. (1996). The Demon-Haunted World: Science as a Candle in the Dark, Random House',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'vida-dedicada-estrellas',
    title: 'Una Vida Dedicada a las Estrellas',
    color: '#5B3D8F',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'Carl Edward Sagan nació el 9 de noviembre de 1934 en el barrio de Brooklyn, Nueva York, en el seno de una familia judía de origen ucraniano. Su padre, Samuel Sagan, trabajaba como cortador en una fábrica textil, y su madre, Rachel Molly Gruber, era ama de casa. La familia vivía en un modesto apartamento en el barrio de Bensonhurst, un vecindario de clase trabajadora donde las estrellas apenas se veían entre las luces de la ciudad. A pesar de estas circunstancias humildes, los padres de Carl fomentaron su curiosidad natural desde sus primeros años de vida.',
      'El momento que transformó la vida de Carl Sagan ocurrió en 1939, cuando sus padres lo llevaron a la Feria Mundial de Nueva York en Flushing Meadows. Carl tenía apenas cuatro años, pero la experiencia lo marcó de por vida. En la feria, vio exhibiciones sobre el futuro de la tecnología, cápsulas del tiempo enterradas para ser abiertas en miles de años, y representaciones del sistema solar que le hicieron comprender por primera vez que los planetas eran mundos reales, no simples puntos de luz. Aquel niño de Brooklyn salió de la feria convencido de que quería dedicar su vida a estudiar los mundos del espacio.',
      'A los cinco años, Carl comenzó a visitar la Biblioteca Pública de Nueva York, donde descubrió libros sobre astronomía y las estrellas. Le pidió a la bibliotecaria un libro sobre estrellas, y ella le trajo uno sobre actores de Hollywood. Carl aclaró que quería saber sobre las estrellas reales del cielo. Cuando finalmente tuvo el libro correcto entre sus manos, quedó maravillado al descubrir que el Sol era una estrella cercana y que las estrellas de la noche eran soles lejanos, cada uno potencialmente rodeado de sus propios planetas. Esta revelación cambió su percepción del universo para siempre.',
      'Durante su adolescencia en Rahway, Nueva Jersey, Carl se convirtió en un ávido lector de ciencia ficción, devorando las obras de H.G. Wells, Edgar Rice Burroughs y Arthur C. Clarke. A los dieciséis años, ganó un concurso de ciencia y obtuvo una beca para la Universidad de Chicago, donde estudió física, obteniendo su licenciatura en 1954, su maestría en 1956 y su doctorado en astronomía y astrofísica en 1960. Su tesis doctoral, dirigida por Gerard Kuiper, analizó la atmósfera del planeta Venus mediante modelos de efecto invernadero.',
      'La infancia de Sagan en Brooklyn tuvo una influencia duradera en su visión del mundo. Creció rodeado de personas trabajadoras sin formación científica, lo que le enseñó que la ciencia debía comunicarse de manera clara y accesible para todos, no solo para especialistas. Esta convicción se convirtió en el eje central de toda su carrera posterior. Sagan solía recordar que fue su madre quien le inculcó la capacidad de hacerse preguntas, y su padre quien le enseñó el valor de la honestidad y la humildad ante lo desconocido.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La cápsula del tiempo enterrada en la Feria Mundial de 1939 que tanto cautivó al joven Sagan fue diseñada por la Westinghouse Electric Corporation. Contenía 75 objetos cotidianos, desde un sombrero de mujer hasta semillas de trigo, además de microfilms con libros y noticias. Fue sellada con instrucciones para ser abierta en el año 6939, exactamente 5,000 años después. Esta idea de comunicarse con el futuro dejó una huella profunda en Sagan, quien décadas más tarde diseñaría mensajes para civilizaciones extraterrestres.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Biblioteca Pública de Nueva York, donde el joven Carl descubrió su pasión por las estrellas, fue fundada en 1895 mediante la fusión de las bibliotecas Astor y Lenox con el fideicomiso Tilden. Para la década de 1940, su sistema de sucursales contaba con más de 80 ubicaciones en Manhattan, el Bronx y Staten Island, proporcionando acceso gratuito al conocimiento a millones de neoyorquinos de todas las clases sociales. Este acceso democrático al saber influyó directamente en la filosofía de Sagan sobre la divulgación científica universal.' },
    ],
    fact: 'La Feria Mundial de Nueva York de 1939 recibió a más de 44 millones de visitantes durante sus dos temporadas (1939-1940). Su lema era "El Mundo del Mañana" y presentó innovaciones como la televisión (RCA exhibió las primeras transmisiones públicas), el aire acondicionado doméstico y la autopista de General Motors "Futurama", que mostraba una visión de Estados Unidos en 1960 con autopistas de alta velocidad. Carl Sagan tenía exactamente 4 años y 3 meses cuando visitó la feria con sus padres el verano de 1939, y describió esa experiencia como el origen de su vocación científica.',
  },
  {
    id: 'el-cientifico',
    title: 'El Científico',
    color: '#D4A535',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'Carl Sagan se incorporó como profesor titular de astronomía en la Universidad de Cornell en Ithaca, Nueva York, en 1968, donde dirigió el Laboratorio de Estudios Planetarios durante casi tres décadas hasta su muerte en 1996. En Cornell, Sagan se convirtió en una figura central de la ciencia planetaria, una disciplina que él mismo ayudó a definir y establecer como campo académico independiente. Antes de Sagan, el estudio de los planetas era considerado un área menor dentro de la astronomía; después de él, se transformó en una de las ramas más activas de la exploración espacial.',
      'Su contribución más temprana e influyente fue la explicación de las altas temperaturas superficiales de Venus. En su tesis doctoral de 1960, Sagan propuso que la atmósfera densa de dióxido de carbono de Venus creaba un efecto invernadero descontrolado que elevaba la temperatura superficial a más de 460 grados Celsius. Esta hipótesis fue confirmada por las sondas soviéticas Venera entre 1967 y 1982, que midieron directamente las condiciones en la superficie venusina. El trabajo de Sagan sobre Venus se convirtió en una referencia fundamental para comprender el cambio climático en la Tierra.',
      'Sagan también realizó contribuciones significativas al estudio de Titán, la luna más grande de Saturno. En la década de 1970, propuso que la atmósfera de Titán contenía moléculas orgánicas complejas y que su superficie podría albergar lagos de hidrocarburos líquidos. Estas predicciones fueron confirmadas por la misión Cassini-Huygens de la NASA y la ESA entre 2004 y 2017, cuando la sonda Huygens descendió sobre Titán el 14 de enero de 2005 y fotografió ríos y lagos de metano y etano líquido, validando las hipótesis que Sagan había formulado treinta años antes.',
      'Como asesor científico de la NASA, Sagan participó directamente en las misiones más importantes de la era dorada de la exploración planetaria. Contribuyó al diseño de los experimentos de las sondas Mariner que sobrevolaron Venus y Marte, trabajó en el programa Viking que aterrizó en Marte en 1976, y fue parte del equipo científico de las misiones Voyager 1 y Voyager 2 lanzadas en 1977. Fue Sagan quien convenció a la NASA de girar la cámara de la Voyager 1 para tomar la fotografía del "Pale Blue Dot" el 14 de febrero de 1990, a una distancia de 6,000 millones de kilómetros de la Tierra.',
      'A lo largo de su carrera, Sagan publicó más de 600 artículos científicos revisados por pares y fue autor, coautor o editor de más de 20 libros. Recibió la Medalla de la NASA al Servicio Público Distinguido en dos ocasiones (1977 y 1981), un reconocimiento sin precedentes. También recibió el Premio Pulitzer en 1978 por su libro "Los Dragones del Edén", que exploraba la evolución de la inteligencia humana. A pesar de su enorme producción divulgativa, Sagan mantuvo hasta el final de su vida una rigurosa actividad de investigación, demostrando que la excelencia científica y la comunicación pública podían coexistir en una misma persona.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La fotografía "Pale Blue Dot" tomada por la Voyager 1 el 14 de febrero de 1990 muestra la Tierra como un punto de apenas 0.12 píxeles de diámetro, suspendido en un rayo de luz solar dispersa. La imagen fue capturada desde una distancia de 6,054 millones de kilómetros. Sagan tuvo que convencer a varios directivos de la NASA para que aprobaran girar la cámara, pues temían que apuntar al Sol pudiera dañar los sensores. La imagen se convirtió en uno de los retratos más influyentes de la Tierra jamás tomados.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La temperatura superficial de Venus es de 462 °C en promedio, suficiente para fundir plomo (punto de fusión: 327 °C) y zinc (419 °C). Su atmósfera, compuesta en un 96.5% de dióxido de carbono, ejerce una presión superficial 92 veces mayor que la de la Tierra, equivalente a la presión que se experimenta a 900 metros de profundidad en los océanos terrestres. Las sondas Venera soviéticas que confirmaron las predicciones de Sagan solo sobrevivieron entre 23 minutos y 2 horas en la superficie antes de ser destruidas por las condiciones.' },
    ],
    fact: 'Las sondas Voyager 1 y Voyager 2, en cuyo equipo científico participó Sagan, son actualmente los objetos fabricados por humanos más distantes de la Tierra. En agosto de 2012, Voyager 1 cruzó la heliopausa y se convirtió en el primer objeto humano en alcanzar el espacio interestelar, a 18,200 millones de kilómetros del Sol. Ambas sondas llevan consigo el Disco de Oro diseñado por un comité presidido por Sagan, que contiene sonidos e imágenes seleccionados para representar la diversidad de vida y cultura en la Tierra, destinados a cualquier civilización extraterrestre que pudiera encontrarlos.',
  },
  {
    id: 'el-comunicador',
    title: 'El Comunicador',
    color: '#7A5BAF',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'La serie de televisión "Cosmos: Un Viaje Personal" se estrenó el 28 de septiembre de 1980 en la cadena PBS y se convirtió en el programa de televisión pública más visto en la historia de Estados Unidos hasta ese momento. Con 13 episodios de una hora cada uno, la serie fue vista por más de 500 millones de personas en 60 países, traducida a más de 10 idiomas, y ganó un Emmy y un Peabody Award. Sagan escribió y presentó cada episodio, viajando por el mundo para filmar en locaciones que iban desde las bibliotecas de Alejandría hasta los observatorios de Monte Palomar en California.',
      'La frase más recordada de Cosmos es "miles de millones y miles de millones" (billions and billions), aunque técnicamente Sagan nunca dijo esas palabras exactas en la serie original. Lo que sí repetía era "billions" con énfasis en la "b" para distinguirla de "millions". La cultura popular le atribuyó la frase completa, y Sagan, con buen humor, tituló su último libro "Miles de Millones" (Billions and Billions, 1997), publicado póstumamente. El libro incluía reflexiones sobre ciencia, esperanza y mortalidad escritas durante sus últimos meses de vida.',
      'Sagan apareció en el programa "The Tonight Show Starring Johnny Carson" en 26 ocasiones entre 1972 y 1989, convirtiéndose en el invitado científico más frecuente del programa. Carson, que tenía un genuino interés por la astronomía (poseía su propio telescopio), disfrutaba las conversaciones con Sagan y le daba libertad para explicar conceptos complejos ante una audiencia de millones. Estas apariciones televisivas convirtieron a Sagan en una celebridad reconocible y demostraron que un científico serio podía comunicarse con el público general sin sacrificar la precisión.',
      'Además de Cosmos, Sagan escribió la novela "Contact" en 1985, que fue adaptada a una película en 1997 dirigida por Robert Zemeckis y protagonizada por Jodie Foster. Para la novela, Sagan consultó con el físico Kip Thorne sobre la viabilidad teórica de los agujeros de gusano como medio de viaje intergaláctico. Esta colaboración resultó en un artículo académico publicado por Thorne en 1988 en la revista Physical Review Letters, demostrando que la ficción de Sagan había generado investigación científica real sobre la física de los agujeros de gusano traversables.',
      'Su libro "El Mundo y sus Demonios" (The Demon-Haunted World), publicado en 1995, se convirtió en un texto de referencia para el pensamiento crítico y el escepticismo científico. En él, Sagan presentó su "kit de detección de sandeces" (baloney detection kit), un conjunto de herramientas cognitivas para evaluar afirmaciones extraordinarias. Estos criterios incluyen la verificación independiente, el debate sustantivo, la navaja de Occam y la falsabilidad. El libro ha sido adoptado como lectura obligatoria en numerosas universidades y programas de educación científica alrededor del mundo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La serie original de Cosmos de 1980 costó aproximadamente 3.5 millones de dólares por episodio, una cifra alta para la televisión pública de aquella época. La producción utilizó efectos especiales innovadores creados por la compañía de Robert Abel, incluyendo la icónica secuencia de la "Nave de la Imaginación". Cada episodio requirió un promedio de seis semanas de filmación en locaciones de todo el mundo, desde Egipto hasta Japón. Sagan insistió en que la serie no simplificara la ciencia, sino que la presentara con toda su complejidad de manera visual y narrativa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La consulta de Sagan con Kip Thorne para la novela Contact produjo resultados científicos reales. Thorne, junto con sus estudiantes Michael Morris y Ulvi Yurtsever, publicó en 1988 el artículo "Wormholes, Time Machines, and the Weak Energy Condition" en Physical Review Letters (Vol. 61, pp. 1446-1449). Este trabajo demostró que un agujero de gusano traversable requeriría materia con densidad de energía negativa para mantenerse abierto. Thorne recibió el Premio Nobel de Física en 2017 por la detección de ondas gravitacionales.' },
    ],
    fact: 'Johnny Carson presentó "The Tonight Show" durante 30 años (1962-1992) con una audiencia promedio de 15 millones de espectadores por noche. Las 26 apariciones de Carl Sagan en el programa entre 1972 y 1989 expusieron conceptos de astronomía y ciencia planetaria a una audiencia acumulada estimada de más de 390 millones de espectadores. Carson parodiaba cariñosamente a Sagan con imitaciones que se volvieron parte de la cultura popular, pero siempre trataba al científico con respeto genuino y le permitía explicaciones extensas que no concedía a otros invitados.',
  },
  {
    id: 'activismo-politica',
    title: 'Activismo y Política',
    color: '#C49225',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'En 1983, Carl Sagan coescribió junto con Richard Turco, Owen Toon, Thomas Ackerman y James Pollack el artículo científico conocido como "TTAPS" (por las iniciales de los apellidos de sus autores), publicado en la revista Science. Este estudio modeló los efectos climáticos de una guerra nuclear a gran escala y concluyó que las detonaciones múltiples inyectarían suficiente hollín y partículas en la estratósfera como para bloquear entre el 90% y el 99% de la luz solar durante meses, provocando un descenso de temperaturas de hasta 35 grados Celsius en las zonas continentales.',
      'El concepto de "invierno nuclear" descrito en el artículo TTAPS tuvo un impacto político directo y documentado. En sus memorias, el secretario general soviético Mijaíl Gorbachov citó explícitamente las investigaciones de Sagan como uno de los factores que influyeron en su decisión de buscar acuerdos de desarme con Estados Unidos. El Tratado de Fuerzas Nucleares de Rango Intermedio (INF), firmado en 1987 entre Gorbachov y Ronald Reagan, eliminó una categoría entera de armas nucleares y representó el primer acuerdo real de reducción de arsenales entre las superpotencias.',
      'Sagan también fue un defensor del desarme nuclear a nivel público. En 1986 fue arrestado durante una protesta en el sitio de pruebas nucleares de Nevada, junto con otros científicos y activistas. Participó activamente en organizaciones como Physicians for Social Responsibility y el Council for a Livable World. Su postura le costó críticas dentro de la comunidad científica y del establishment político, pero Sagan argumentaba que un científico tenía la obligación moral de alertar al público cuando sus hallazgos revelaban amenazas existenciales para la humanidad.',
      'Menos conocida es la postura de Sagan respecto a la marihuana. En 1971, bajo el seudónimo "Mr. X", escribió un ensayo publicado en el libro "Marihuana Reconsidered" del psiquiatra de Harvard Lester Grinspoon, donde describía sus experiencias personales con el cannabis y argumentaba que la sustancia potenciaba su capacidad de pensamiento creativo y asociativo. La identidad de "Mr. X" fue revelada públicamente solo después de la muerte de Sagan en 1999 por su biógrafo Keay Davidson. Sagan abogaba por la despenalización basándose en evidencia científica.',
      'Su investigación sobre Venus y el efecto invernadero descontrolado lo convirtió en uno de los primeros científicos prominentes en advertir sobre el cambio climático terrestre. En testimonio ante el Congreso de Estados Unidos en 1985, Sagan explicó que la quema de combustibles fósiles estaba incrementando la concentración de dióxido de carbono atmosférico de manera análoga, aunque mucho más lenta, al proceso que convirtió a Venus en un mundo con temperaturas superficiales de 462 grados Celsius. Argumentó que la humanidad estaba realizando un experimento involuntario con la atmósfera de su propio planeta.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El artículo TTAPS de 1983 utilizó modelos computacionales unidimensionales que fueron criticados inicialmente por algunos científicos como simplificaciones excesivas. Sin embargo, estudios posteriores con modelos tridimensionales más sofisticados, publicados por Alan Robock y Owen Toon en 2007 en la revista Atmospheric Chemistry and Physics, confirmaron los hallazgos fundamentales del TTAPS. Estos modelos actualizados mostraron que incluso un conflicto nuclear regional entre India y Pakistán podría producir un enfriamiento global de 1.25 °C durante una década.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En el apogeo de la Guerra Fría, hacia 1986, el arsenal nuclear mundial alcanzó un máximo de aproximadamente 70,300 ojivas nucleares, con Estados Unidos poseyendo unas 23,300 y la Unión Soviética cerca de 45,000. La potencia combinada de estas armas equivalía a más de un millón de veces la bomba de Hiroshima (15 kilotones). Los cálculos de Sagan y el equipo TTAPS demostraron que la detonación de apenas el 1% de este arsenal sobre ciudades sería suficiente para desencadenar un invierno nuclear capaz de colapsar la agricultura global.' },
    ],
    fact: 'Carl Sagan testificó ante comités del Congreso de Estados Unidos en múltiples ocasiones durante las décadas de 1970 y 1980 sobre temas que iban desde la exploración de Marte hasta el invierno nuclear y el cambio climático. Su testimonio del 10 de diciembre de 1985 ante el Subcomité de Ciencia, Tecnología y Espacio del Senado incluyó datos sobre el incremento de CO₂ atmosférico desde 280 partes por millón (nivel preindustrial) hasta 345 ppm en 1985. En 2024, esa concentración superó las 424 ppm, validando la tendencia que Sagan identificó casi cuatro décadas antes.',
  },
  {
    id: 'ann-druyan-companera',
    title: 'Ann Druyan: Compañera Cósmica',
    color: '#9370C4',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'Ann Druyan nació el 13 de junio de 1949 en Queens, Nueva York, y se formó como escritora y productora especializada en comunicación científica. Conoció a Carl Sagan en 1974, cuando ambos trabajaban en un proyecto para enviar un mensaje a bordo de la sonda Pioneer. Iniciaron una colaboración profesional que se transformó en una relación amorosa en junio de 1977, durante una conversación telefónica sobre el contenido del Disco de Oro de las sondas Voyager. Ambos han descrito ese momento como una revelación simultánea de sus sentimientos mutuos.',
      'Druyan fue directora creativa del proyecto del Disco de Oro de la Voyager, uno de los objetos más singulares jamás fabricados por la humanidad. El disco, recubierto de oro y diseñado para durar mil millones de años en el espacio interestelar, contiene 115 imágenes codificadas, saludos en 55 idiomas, una selección de sonidos naturales de la Tierra (desde truenos hasta cantos de ballenas), y 90 minutos de música que incluyen obras de Bach, Beethoven, Mozart, Chuck Berry y músicos de culturas de todo el mundo. Druyan seleccionó personalmente gran parte del contenido musical.',
      'Un dato poco conocido es que Ann Druyan registró sus propias ondas cerebrales (EEG) el 3 de junio de 1977 para incluirlas en el Disco de Oro como una representación comprimida de los pensamientos y emociones humanas. Durante la grabación de una hora, Druyan meditó conscientemente sobre la historia de la Tierra, la evolución de la vida, las guerras y esperanzas humanas, y sus sentimientos de amor recién descubiertos por Carl Sagan. Estas señales eléctricas cerebrales fueron convertidas en sonido y grabadas en el disco, viajando ahora por el espacio interestelar.',
      'Sagan y Druyan se casaron en 1981 y tuvieron dos hijos: Alexandra Rachel (nacida en 1982) y Samuel Democritus (nacido en 1991, llamado así en honor al filósofo griego que propuso la existencia de los átomos). Juntos coescribieron la serie Cosmos de 1980, la novela "Comet" (1985), el guion de la película "Contact" (1997) y numerosos artículos. Druyan describió su matrimonio como una "fusión de mentes" donde las ideas científicas y creativas fluían constantemente entre ambos, produciendo un trabajo conjunto superior a lo que cualquiera habría logrado por separado.',
      'Tras la muerte de Sagan en 1996, Druyan dedicó su vida a preservar y expandir su legado. Produjo las dos secuelas de la serie Cosmos: "Cosmos: Una Odisea del Espacio-Tiempo" (2014) con Neil deGrasse Tyson como presentador, y "Cosmos: Mundos Posibles" (2020). Ambas series mantuvieron el espíritu de rigor científico y narrativa poética del original. Druyan también supervisó la publicación de obras póstumas de Sagan y participó activamente en la Sociedad Planetaria. Ha declarado en múltiples entrevistas que considera su trabajo con la ciencia como una forma de mantener viva la conversación que comenzó con Carl.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Disco de Oro de la Voyager incluye la canción "Johnny B. Goode" de Chuck Berry, grabada en 1958. Cuando se debatió si incluirla, algunos miembros del comité argumentaron que el rock and roll era demasiado "juvenil" para representar a la humanidad ante civilizaciones extraterrestres. Sagan respondió: "Hay muchos de nosotros que creemos que el rock and roll está en sus mejores momentos". La grabación seleccionada fue la versión original de estudio de Berry, publicada por Chess Records. La canción viaja ahora a más de 17 kilómetros por segundo rumbo al espacio interestelar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ondas cerebrales de Ann Druyan grabadas para el Disco de Oro consistieron en señales de electroencefalograma (EEG) capturadas durante una hora mediante electrodos colocados en su cuero cabelludo. Las ondas cerebrales humanas oscilan entre 1 y 100 Hz, generando patrones alfa (8-13 Hz en reposo), beta (13-30 Hz en concentración activa) y theta (4-8 Hz en meditación profunda). La señal fue comprimida y convertida a formato de audio. Si una civilización extraterrestre pudiera decodificar estas ondas, potencialmente recuperaría patrones asociados a estados emocionales y cognitivos humanos.' },
    ],
    fact: 'Los dos Discos de Oro de la Voyager están fabricados con cobre recubierto de una capa de oro de 0.0003 centímetros de grosor y protegidos por una funda de aluminio electrochapada en uranio-238, cuya tasa de desintegración radiactiva permite calcular el tiempo transcurrido desde su fabricación. La NASA estima que los discos permanecerán legibles durante al menos mil millones de años en el vacío del espacio interestelar. La Voyager 1 alcanzará la proximidad de la estrella Gliese 445 en la constelación de la Jirafa dentro de aproximadamente 40,000 años, llevando consigo las ondas cerebrales de Ann Druyan.',
  },
  {
    id: 'ultimos-anios',
    title: 'Los Últimos Años',
    color: '#B88420',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'En 1994, Carl Sagan fue diagnosticado con mielodisplasia, un trastorno de la médula ósea en el que las células madre sanguíneas no maduran correctamente y pueden evolucionar hacia leucemia aguda. La mielodisplasia afecta la producción de glóbulos rojos, glóbulos blancos y plaquetas, debilitando progresivamente el sistema inmunológico del paciente. El diagnóstico llegó cuando Sagan tenía 59 años y se encontraba en uno de los momentos más productivos de su carrera, trabajando simultáneamente en nuevos libros, conferencias y proyectos de investigación sobre la búsqueda de vida extraterrestre.',
      'Sagan recibió tres trasplantes de médula ósea en el Centro Oncológico Fred Hutchinson de Seattle, Washington, con su hermana Cari como donante. El primer trasplante se realizó en abril de 1995. El procedimiento implicaba destruir su propia médula ósea mediante quimioterapia intensiva y radiación total del cuerpo, para luego reemplazarla con células madre sanas de su hermana. A pesar de los períodos de recuperación, Sagan continuó escribiendo y concediendo entrevistas desde el hospital, negándose a detener su trabajo de divulgación científica.',
      'Durante sus últimos años, Sagan completó dos de sus obras más personales. "El Mundo y sus Demonios" (1995) es un apasionado argumento a favor del pensamiento crítico y contra la pseudociencia, donde presenta herramientas prácticas para evaluar afirmaciones y distinguir entre ciencia y superstición. "Miles de Millones" (1997), publicado póstumamente, contiene reflexiones sobre la vida, la muerte, la esperanza y el lugar de la humanidad en el cosmos, escritas con la lucidez de alguien que sabe que su tiempo es limitado pero cuya curiosidad permanece intacta.',
      'En noviembre de 1996, la mielodisplasia se transformó en neumonía, complicada por la inmunosupresión causada por los trasplantes. Carl Sagan falleció a las 4:20 de la madrugada del 20 de diciembre de 1996 en el Centro Oncológico Fred Hutchinson de Seattle, a los 62 años de edad. Ann Druyan estaba a su lado. Según ella relató posteriormente, las últimas palabras coherentes de Sagan fueron dirigidas a ella. No hubo ceremonia religiosa; Sagan había sido agnóstico durante toda su vida y consideraba que el universo natural era suficientemente maravilloso sin necesidad de explicaciones sobrenaturales.',
      'La noticia de su muerte generó tributos de científicos, políticos, artistas y ciudadanos de todo el mundo. El astrónomo Frank Drake, creador de la ecuación que estima el número de civilizaciones comunicativas en la galaxia y amigo cercano de Sagan, declaró que la ciencia había perdido a su mejor voz pública. La revista Time publicó un extenso obituario titulando a Sagan como "el científico más famoso de Estados Unidos". Sus cenizas fueron enterradas en el cementerio Lakeview de Ithaca, Nueva York, cerca del campus de la Universidad de Cornell donde había enseñado durante 28 años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante su tratamiento en el Fred Hutchinson Cancer Research Center, Sagan mantuvo correspondencia con cientos de personas, incluyendo niños que le escribían preguntándole sobre el espacio. En una carta de diciembre de 1995, respondió a una niña de nueve años que le preguntó si existían extraterrestres: "Nadie lo sabe con certeza, pero las posibilidades son emocionantes. Hay miles de millones de estrellas en nuestra galaxia, y probablemente la mayoría tiene planetas. Parece poco probable que la Tierra sea el único lugar con vida. Sigue mirando las estrellas y haciéndote preguntas".' },
      { label: 'Dato Científico', icon: 'atom', text: 'La mielodisplasia (síndrome mielodisplásico o SMD) es un grupo de trastornos causados por células sanguíneas mal formadas o disfuncionales producidas por la médula ósea. Afecta principalmente a personas mayores de 60 años. El trasplante alogénico de médula ósea (de un donante compatible) es el único tratamiento potencialmente curativo. En la década de 1990, la tasa de supervivencia a 5 años para trasplantes de médula en pacientes con SMD era del 30-40%. La compatibilidad HLA entre Sagan y su hermana Cari fue un factor determinante en la decisión de proceder con los trasplantes.' },
    ],
    fact: 'El cementerio Lakeview de Ithaca, Nueva York, donde descansan los restos de Carl Sagan, se encuentra a solo 3.2 kilómetros del edificio de Ciencias Espaciales de la Universidad de Cornell donde Sagan tuvo su oficina durante 28 años. La lápida de Sagan es deliberadamente sencilla, sin epitafio elaborado, reflejando su filosofía personal. Sin embargo, visitantes de todo el mundo dejan regularmente piedras, flores y notas en su tumba. La tradición de dejar piedras proviene de la costumbre judía de honrar a los difuntos, recordando las raíces culturales de la familia Sagan en Ucrania.',
  },
  {
    id: 'legado-eterno',
    title: 'El Legado Eterno',
    color: '#4A2D6F',
    btnImage: '/assets/sagan/sagan_m6.png',
    image: '/assets/sagan/sagan_m6.png',
    content: [
      'La Sociedad Planetaria, cofundada por Sagan en 1980 junto con Bruce Murray (entonces director del Laboratorio de Propulsión a Chorro de la NASA) y el ingeniero Louis Friedman, se ha convertido en la mayor organización espacial no gubernamental del mundo, con más de 100,000 miembros en 149 países. La organización promueve la exploración espacial, la búsqueda de vida extraterrestre y la defensa planetaria contra impactos de asteroides. En 2019, su proyecto LightSail 2 demostró con éxito la navegación mediante vela solar en órbita terrestre, validando un concepto que Sagan había promovido durante décadas.',
      'Quizás la persona que mejor encarna la influencia directa de Carl Sagan es el astrofísico Neil deGrasse Tyson. En 1975, cuando Tyson tenía 17 años y vivía en el Bronx de Nueva York, fue aceptado en la Universidad de Cornell. Sagan, al enterarse del interés del joven por la astronomía, le envió una carta personal invitándolo a visitar el campus. Tyson viajó a Ithaca, donde Sagan le mostró su laboratorio, le regaló un libro autografiado, y cuando comenzó a nevar, le ofreció su número de teléfono personal por si perdía el autobús de regreso. Tyson ha repetido esta historia en conferencias, diciendo que ese día aprendió qué clase de persona aspiraba ser.',
      'El legado de Sagan continúa en las misiones espaciales del siglo XXI. La misión Europa Clipper de la NASA, lanzada el 14 de octubre de 2024, fue diseñada para investigar la habitabilidad del océano subterráneo de Europa, la luna de Júpiter, siguiendo la hipótesis que Sagan articuló en la década de 1970 sobre la posibilidad de vida en ese mundo. La sonda Mars Science Laboratory (Curiosity), que aterrizó en Marte el 6 de agosto de 2012, lleva en su cubierta una placa que dice "Mars to Stay", un concepto que Sagan propuso como inevitable consecuencia de la exploración humana del planeta rojo.',
      'El concepto del "Pale Blue Dot" —la Tierra vista como un diminuto punto de luz desde los confines del sistema solar— se ha convertido en uno de los símbolos más poderosos del ambientalismo y la perspectiva cósmica. Las palabras que Sagan escribió al contemplar esa imagen ("Miren ese punto. Eso es aquí. Eso es casa. Eso somos nosotros") han sido citadas en discursos de líderes mundiales, en resoluciones de las Naciones Unidas sobre cambio climático, y en currículos educativos de más de 40 países. La imagen fue actualizada en 2020 por la NASA con una versión reprocesada de mayor resolución para el 30 aniversario de la fotografía.',
      'El impacto de Sagan en la educación científica se mide en generaciones. Encuestas realizadas por la American Astronomical Society en 2014 revelaron que el 38% de los astrónomos profesionales menores de 45 años citaban la serie Cosmos o los libros de Sagan como una influencia directa en su decisión de estudiar astronomía. La frase "somos polvo de estrellas" (we are starstuff), que Sagan popularizó en Cosmos para explicar que los elementos químicos de nuestros cuerpos fueron forjados en el interior de estrellas que explotaron hace miles de millones de años, se ha convertido en una de las expresiones más citadas de la divulgación científica contemporánea.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El proyecto LightSail 2 de la Sociedad Planetaria fue lanzado el 25 de junio de 2019 a bordo de un cohete Falcon Heavy de SpaceX. La nave, del tamaño de un pan de molde, desplegó una vela solar de 32 metros cuadrados fabricada con Mylar de apenas 4.5 micrómetros de grosor (más delgada que un cabello humano). Durante los siguientes meses, demostró que los fotones del Sol ejercían presión suficiente para elevar su órbita, validando un medio de propulsión que no requiere combustible. Carl Sagan había aparecido en The Tonight Show en 1976 mostrando un modelo de vela solar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La frase "somos polvo de estrellas" de Sagan tiene fundamento en la nucleosíntesis estelar. Los elementos más pesados que el hidrógeno y el helio fueron creados mediante fusión nuclear en el interior de estrellas masivas. Cuando estas estrellas explotan como supernovas, dispersan estos elementos al espacio. El calcio de nuestros huesos se formó en supernovas de tipo Ia. El hierro de nuestra sangre se forjó en estrellas de al menos 8 masas solares. El oxígeno que respiramos fue producido por estrellas de más de 10 masas solares. Cada átomo pesado de nuestro cuerpo viajó por el espacio durante miles de millones de años antes de formar parte de la Tierra y de nosotros.' },
    ],
    fact: 'El asteroide 2709 Sagan, descubierto el 4 de junio de 1982 por el astrónomo Edwin Bowell en la Estación Anderson Mesa del Observatorio Lowell en Arizona, fue nombrado en honor a Carl Sagan por la Unión Astronómica Internacional. Tiene un diámetro estimado de 15.4 kilómetros y orbita el Sol en el cinturón de asteroides entre Marte y Júpiter con un período orbital de 4.41 años. Además, el lugar de aterrizaje de la sonda Mars Pathfinder en Marte fue renombrado "Carl Sagan Memorial Station" el 5 de julio de 1997, convirtiendo a Sagan en el primer divulgador científico con un monumento en otro planeta.',
  },
];

// ——— Cosmic Particle Field (Canvas Background) ——————————————————————
function CosmicField() {
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
      hue: Math.random() > 0.5 ? '140,100,210' : '212,165,53', // purple or gold
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

// ——— Sagan Legacy Header ——————————————————————————————————————————
function SaganLegacyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,61,143,0.3))' }}>
        {/* Cosmic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#saganGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 star markers */}
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
        {/* Central star icon */}
        <polygon points="300,16 303,26 313,26 305,32 308,42 300,36 292,42 295,32 287,26 297,26" fill="#D4A535" opacity="0.5" />
        <defs>
          <linearGradient id="saganGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,61,143,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(91,61,143,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LEGADO DE CARL SAGAN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">POLVO DE ESTRELLAS, PARA SIEMPRE</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ——————————————————
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
          layoutId="activeDotSaganM6"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Video Section ——— */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
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

// ——— Progress Bar ————————————————————————————————————————————————————
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

// ——— Main Infographic Component ——————————————————————————————————————
export default function InteractiveInfographic_SaganM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/sagan/sagan_m6.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,61,143,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <CosmicField />

      <SaganLegacyHeader />

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
              border: '1px solid rgba(91,61,143,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado el legado completo de Carl Sagan!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Heredero de las Estrellas
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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
