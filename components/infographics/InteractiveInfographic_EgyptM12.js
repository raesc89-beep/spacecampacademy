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
  'Curran, B. et al. (2009). Obelisk: A History, Burndy Library',
  'Arnold, D. (1991). Building in Egypt: Pharaonic Stone Masonry, Oxford University Press',
  'Isler, M. (2001). Sticks, Stones, and Shadows: Building the Egyptian Pyramids, University of Oklahoma Press',
];

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INFOGRAPHIC_NODES = [
  {
    id: 'reloj-solar',
    title: 'El Reloj del FaraÃ³n',
    color: '#E8C96A',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_reloj.png',
    image: '/assets/egypt/infographic_obeliscos/hero_reloj.png',
    content: [
      'Â¿Alguna vez has visto tu sombra cambiar de tamaÃ±o durante el dÃ­a? Cuando sales a jugar por la maÃ±ana, tu sombra es larguÃ­sima â€”Â¡pareces un gigante! Al mediodÃ­a, se encoge tanto que casi desaparece bajo tus pies. Y por la tarde, vuelve a estirarse, pero ahora apunta hacia el otro lado. Los egipcios descubrieron algo genial: Â¡podÃ­an usar esta sombra para saber la hora!',
      'Hace 4,000 aÃ±os, los sacerdotes egipcios construyeron columnas de piedra altÃ­simas llamadas obeliscos â€”como lÃ¡pices de piedra gigantes apuntando al cielo. No eran decoraciÃ³n: eran relojes enormes. La sombra que proyectaban sobre el suelo giraba como la manecilla de un reloj, y los sacerdotes marcaban en el piso las posiciones de la sombra a cada hora del dÃ­a.',
      'Cuando el Sol sale por el este, la sombra del obelisco apunta hacia el oeste y es muy larga. Conforme el Sol sube, la sombra se acorta y gira. Al mediodÃ­a solar exacto, la sombra apunta al Norte verdadero y es la mÃ¡s corta del dÃ­a. Â¡Es como un reloj gigante donde la sombra es la manecilla y el sol es el motor!',
      'Los sacerdotes tambiÃ©n marcaban la sombra en dÃ­as especiales: en el solsticio de verano (21 de junio), la sombra del mediodÃ­a es la mÃ¡s corta del aÃ±o. En el solsticio de invierno (21 de diciembre), es la mÃ¡s larga. En los equinoccios (marzo y septiembre), la sombra tiene exactamente la misma longitud. Â¡El obelisco era tambiÃ©n un calendario perpetuo grabado en piedra!',
      'La precisiÃ³n era impresionante: los egipcios dividieron el dÃ­a en 12 horas de luz y 12 horas de oscuridad. En verano, las horas diurnas eran mÃ¡s largas que las nocturnas, y en invierno al revÃ©s. Â¡Su "hora" no duraba siempre lo mismo! Es como si un recreo durara mÃ¡s en verano que en invierno.',
    ],
    fact: 'Â¿SabÃ­as que la palabra "reloj" viene del latÃ­n "horologium", que significa "el que mide las horas"? Y el primer horologium de Roma fue un obelisco egipcio que el emperador Augusto trajo de HeliÃ³polis en el aÃ±o 10 a.C. Lo convirtiÃ³ en un reloj solar monumental en el Campo de Marte.',
  },
  {
    id: 'piramidion',
    title: 'La Punta de Oro',
    color: '#FFD700',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_piramidion.png',
    image: '/assets/egypt/infographic_obeliscos/hero_piramidion.png',
    content: [
      'Â¡Imagina que cada maÃ±ana, antes de que salga el sol, la punta de un obelisco empieza a brillar como una estrella! Eso es exactamente lo que pasaba en el antiguo Egipto. La punta del obelisco, llamada "piramidiÃ³n", estaba cubierta con una aleaciÃ³n de oro y plata llamada "electrum" que brillaba como un espejo dorado.',
      'Cuando los primeros rayos del amanecer tocaban la punta del obelisco â€”antes de que la luz llegara al sueloâ€” el piramidiÃ³n resplandecÃ­a como un pequeÃ±o sol dorado en el cielo oscuro. Los egipcios creÃ­an que ese destello era el primer contacto del dios Ra (el Sol) con la Tierra cada maÃ±ana. Â¡Era como si Ra tocara con su dedo la punta del obelisco para despertar al mundo!',
      'El electrum es una mezcla natural de 75% oro y 25% plata que los egipcios encontraban en los lechos de rÃ­os. Es mÃ¡s duro que el oro puro y no se oxida ni se mancha, asÃ­ que brillaba durante siglos sin necesitar mantenimiento. Â¡Imagina un faro dorado de 3 metros de altura en la punta de una columna de 30 metros!',
      'Los piramidiones mÃ¡s famosos estaban en los obeliscos del Templo de Karnak en Luxor. La reina Hatshepsut mandÃ³ cubrir dos obeliscos enteros con electrum â€”no solo la punta, sino todo el obelisco. En sus inscripciones dice: "Los hice para mi padre AmÃ³n, recubiertos de electrum fino desde la punta hasta la base, tan brillantes que iluminan las Dos Tierras como el disco solar."',
      'Hoy no queda ningÃºn piramidiÃ³n de electrum original porque fueron robados o fundidos hace miles de aÃ±os. Pero en 2018, arqueÃ³logos encontraron un piramidiÃ³n de granito del faraÃ³n Amenemhat III (1800 a.C.) con jeroglÃ­ficos que dicen: "Que el rostro del rey se abra para ver al SeÃ±or de la Luz cuando cruza el cielo." Â¡Confirma que los obeliscos eran instrumentos astronÃ³micos sagrados!',
    ],
    fact: 'El Monumento a Washington en EE.UU. es un obelisco moderno de 169 metros de altura. Su punta de aluminio fue la pieza de aluminio mÃ¡s grande del mundo cuando se instalÃ³ en 1884. El aluminio era tan raro y caro en esa Ã©poca que valÃ­a mÃ¡s que el oro â€”Â¡igual que el electrum de los obeliscos egipcios!',
  },
  {
    id: 'cantera-asuan',
    title: 'Gigantes de Granito',
    color: '#C4846C',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_cantera.png',
    image: '/assets/egypt/infographic_obeliscos/hero_cantera.png',
    content: [
      'Â¿CÃ³mo tallar una aguja de piedra de 30 metros que pesa mÃ¡s que 40 elefantes? Â¡Sin mÃ¡quinas, sin electricidad, solo con herramientas de piedra! Los egipcios lo hicieron decenas de veces en las canteras de AsuÃ¡n, al sur de Egipto, donde encontraron la piedra perfecta: granito rosado, una de las rocas mÃ¡s duras del planeta.',
      'El granito tiene una dureza de 7 en la escala de Mohs (el diamante, lo mÃ¡s duro que existe, es 10). Para tallarlo, los egipcios usaban bolas de dolerita â€”una piedra aÃºn mÃ¡s dura que el granitoâ€” y las golpeaban una y otra vez contra la roca. Es como intentar rayar un vidrio con otro vidrio mÃ¡s duro. Â¡Un solo obelisco grande tardaba varios aÃ±os en tallarse!',
      'Los artesanos cavaban una trinchera alrededor del bloque de granito y debajo de Ã©l, dejando el obelisco conectado a la roca madre solo por la base. Luego hacÃ­an agujeros en la base, insertaban cuÃ±as de madera y las mojaban con agua. La madera se expandÃ­a al absorber el agua y la roca se fracturaba; el obelisco se separaba limpiamente de la cantera.',
      'En AsuÃ¡n todavÃ­a puedes ver el Obelisco Inacabado, el obelisco mÃ¡s grande jamÃ¡s intentado: 42 metros de largo y 1,200 toneladas de peso. Los artesanos descubrieron una grieta enorme en la roca cuando ya llevaban aÃ±os trabajando y tuvieron que abandonarlo. Â¡Es como armar un rompecabezas gigante y descubrir que falta una pieza importante!',
      'Una vez tallado, el obelisco se transportaba por el rÃ­o Nilo en una barcaza gigante hasta su destino final, a veces a 200 kilÃ³metros de distancia. Â¿CÃ³mo levantaban una columna de 300 toneladas sin grÃºas? Los arqueÃ³logos creen que usaban una rampa de arena: arrastraban el obelisco hasta la cima, lo inclinaban sobre el borde, y luego sacaban la arena poco a poco para que bajara lentamente hasta quedar vertical. Â¡IngenierÃ­a pura sin un solo motor!',
    ],
    fact: 'Si el Obelisco Inacabado de AsuÃ¡n se hubiera completado, habrÃ­a sido un tercio mÃ¡s alto que cualquier obelisco existente. Con sus 42 metros, habrÃ­a sido casi tan alto como la Estatua de la Libertad sin su pedestal (46 metros). Â¡Los egipcios pensaban en grande!',
  },
  {
    id: 'calendario-piedra',
    title: 'Calendario de Piedra',
    color: '#7EC8E3',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_calendario.png',
    image: '/assets/egypt/infographic_obeliscos/hero_calendario.png',
    content: [
      'Â¿SabÃ­as que los obeliscos no solo medÃ­an las horas del dÃ­a, sino tambiÃ©n los meses del aÃ±o? Los sacerdotes egipcios descubrieron algo fascinante: la longitud de la sombra del mediodÃ­a cambia cada dÃ­a del aÃ±o. En verano es corta (porque el Sol estÃ¡ alto), y en invierno es larga (porque el Sol estÃ¡ bajo). Â¡Es como si la sombra creciera y encogiera con las estaciones!',
      'Los sacerdotes marcaron en el suelo alrededor del obelisco las posiciones de la sombra del mediodÃ­a en cada estaciÃ³n. El solsticio de verano (cuando la sombra es mÃ¡s corta) marcaba el inicio de la temporada de cosecha. El solsticio de invierno (sombra mÃ¡s larga) anunciaba la Ã©poca de siembra. Los equinoccios indicaban la crecida del Nilo â€”Â¡el evento mÃ¡s importante del aÃ±o!',
      'La crecida del Nilo traÃ­a agua y limo fÃ©rtil que hacÃ­a crecer los cultivos. Si los sacerdotes calculaban mal la fecha, las cosechas podÃ­an arruinarse. El obelisco les daba una precisiÃ³n de pocos dÃ­as â€”suficiente para planificar todo el ciclo agrÃ­cola. Â¡Un error de cÃ¡lculo podÃ­a significar hambruna para millones de personas!',
      'Los egipcios crearon un calendario de 365 dÃ­as basado en estas observaciones: 12 meses de 30 dÃ­as mÃ¡s 5 dÃ­as extras al final. Es casi idÃ©ntico al nuestro. Solo les faltÃ³ el cuarto de dÃ­a extra que nosotros corregimos con los aÃ±os bisiestos. DespuÃ©s de 1,460 aÃ±os, su calendario se desfasaba un aÃ±o completo â€”y volvÃ­a a coincidir. Â¡A este ciclo lo llamaban "Gran AÃ±o de Sothis"!',
      'El obelisco era tan preciso que los sacerdotes podÃ­an predecir las estaciones con semanas de anticipaciÃ³n. Imagina ser un niÃ±o egipcio y que tu maestro dijera: "Â¡En 40 dÃ­as exactos vendrÃ¡ la crecida del Nilo!" gracias a las marcas de la sombra del obelisco. Era como tener un calendario de Google hecho de piedra y sombras.',
    ],
    fact: 'Nuestro calendario actual (gregoriano) tiene su origen en el calendario egipcio de 365 dÃ­as. Julio CÃ©sar lo adoptÃ³ en el 46 a.C. tras visitar Egipto y conocer a Cleopatra. El Papa Gregorio XIII lo ajustÃ³ en 1582, aÃ±adiendo la regla de los aÃ±os bisiestos. Â¡AsÃ­ que cada vez que miras un calendario, estÃ¡s usando tecnologÃ­a egipcia de 4,500 aÃ±os!',
  },
  {
    id: 'roma-obeliscos',
    title: 'Roma: Ciudad de Obeliscos',
    color: '#D4674A',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_roma.png',
    image: '/assets/egypt/infographic_obeliscos/hero_roma.png',
    content: [
      'Â¿SabÃ­as que la ciudad con mÃ¡s obeliscos egipcios del mundo NO es El Cairo ni Luxor, sino Roma, en Italia? Hoy hay 13 obeliscos egipcios originales en Roma â€”Â¡mÃ¡s que en todo Egipto! Los emperadores romanos estaban tan fascinados con estas columnas que se las llevaron como trofeos de guerra y sÃ­mbolos de poder.',
      'Todo empezÃ³ cuando el emperador Augusto conquistÃ³ Egipto en el aÃ±o 30 a.C. Se llevÃ³ dos obeliscos a Roma: uno para el Circo MÃ¡ximo y otro para el Campo de Marte, donde lo convirtiÃ³ en un reloj solar gigante. Â¡Imagina mover una columna de 300 toneladas en barco desde Egipto hasta Italia, cruzando todo el MediterrÃ¡neo!',
      'El obelisco mÃ¡s famoso de Roma estÃ¡ en el centro de la Plaza de San Pedro, en el Vaticano. Fue traÃ­do desde HeliÃ³polis por el emperador CalÃ­gula en el aÃ±o 37 d.C. Durante siglos estuvo junto al Circo de NerÃ³n, donde presenciaron martirios de los primeros cristianos. En 1586, el papa Sixto V ordenÃ³ moverlo â€”una operaciÃ³n que requiriÃ³ 900 hombres, 140 caballos y 47 grÃºas.',
      'El Obelisco de LetrÃ¡n es el mÃ¡s alto del mundo: 45.7 metros con su base. Fue mandado construir por Tutmosis III alrededor del 1400 a.C. y tardÃ³ mÃ¡s de un siglo en completarse. LlegÃ³ a Roma en el 357 d.C. Se cayÃ³ durante las invasiones bÃ¡rbaras, fue redescubierto en tres fragmentos en el siglo XVI, y restaurado por Sixto V en 1588. Â¡Tiene 3,400 aÃ±os y sigue en pie!',
      'Los romanos no solo se llevaron obeliscos â€”tambiÃ©n aprendieron a construir los suyos. Pero nunca lograron igualar la tÃ©cnica egipcia de tallar monolitos de una sola pieza. Los obeliscos romanos son mÃ¡s pequeÃ±os y a veces estÃ¡n hechos de varias piezas ensambladas. Â¡Como intentar copiar la tarea del mejor alumno, pero sin entender bien las instrucciones!',
    ],
    fact: 'Mover el obelisco de la Plaza de San Pedro en 1586 fue tan peligroso que el papa Sixto V prohibiÃ³ a la multitud hacer ruido bajo pena de muerte. Cuando las cuerdas empezaron a calentarse por la fricciÃ³n y estaban a punto de romperse, un marinero gritÃ³: "Â¡Agua a las cuerdas!" Su grito salvÃ³ el obelisco y el papa le perdonÃ³ la vida. Â¡Su familia recibiÃ³ el privilegio de suministrar las palmas del Domingo de Ramos al Vaticano durante 400 aÃ±os!',
  },
  {
    id: 'aguja-cleopatra',
    title: 'La Aguja de Cleopatra',
    color: '#9B59B6',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_aguja.png',
    image: '/assets/egypt/infographic_obeliscos/hero_aguja.png',
    content: [
      'Â¿SabÃ­as que hay obeliscos egipcios en Nueva York, Londres y ParÃ­s? Se llaman "Agujas de Cleopatra", aunque la reina Cleopatra no tuvo nada que ver con ellos â€”Â¡fueron construidos 1,500 aÃ±os antes de que ella naciera! El nombre se lo pusieron los europeos porque Cleopatra era la Ãºnica egipcia que conocÃ­an.',
      'El obelisco de Nueva York estÃ¡ en Central Park. Tiene 3,500 aÃ±os y fue tallado por orden del faraÃ³n Tutmosis III en HeliÃ³polis. Egipto lo regalÃ³ a Estados Unidos en 1879 para celebrar la inauguraciÃ³n del Canal de Suez. Transportarlo desde AlejandrÃ­a hasta Manhattan tomÃ³ 112 dÃ­as â€”cruzÃ³ el AtlÃ¡ntico en un barco de vapor y rodÃ³ por las calles de Nueva York sobre rieles.',
      'Debajo del obelisco de Nueva York, los ingenieros colocaron una cÃ¡psula del tiempo con objetos de la Ã©poca: monedas americanas, un censo de los EE.UU., ejemplares del periÃ³dico New York Tribune, una foto del presidente Grant, y una guÃ­a turÃ­stica de Egipto. Â¡Es un cofre del tesoro moderno bajo un monumento de 3,500 aÃ±os!',
      'El obelisco de Londres estÃ¡ en el Embankment del TÃ¡mesis. Su viaje en 1877 fue Ã©pico: la barcaza que lo transportaba casi se hunde en una tormenta en el Golfo de Vizcaya. Seis marineros murieron intentando rescatarla. El obelisco fue abandonado a la deriva durante dÃ­as antes de ser recuperado. Â¡SobreviviÃ³ 3,500 aÃ±os en Egipto y casi se pierde en el AtlÃ¡ntico!',
      'El obelisco de ParÃ­s, en la Plaza de la Concordia, es el que mejor se conserva. Fue un regalo del gobernante egipcio Mehmet AlÃ­ a Francia en 1829. Es uno de los dos obeliscos que estaban en la entrada del Templo de Luxor. El otro sigue en Egipto â€”Francia devolviÃ³ simbÃ³licamente sus derechos sobre Ã©l en 1981. Hoy hay 25 obeliscos egipcios en pie en todo el mundo, pero ninguno de los grandes estÃ¡ en su ubicaciÃ³n original.',
    ],
    fact: 'El clima de Nueva York ha daÃ±ado mÃ¡s la Aguja de Cleopatra en 140 aÃ±os que 3,500 aÃ±os de desierto egipcio. La lluvia Ã¡cida, la contaminaciÃ³n y los ciclos de hielo-deshielo han borrado casi todos los jeroglÃ­ficos del lado oeste. En Egipto, el aire seco y caliente conservaba la piedra perfectamente. Â¡La contaminaciÃ³n moderna es peor enemiga de la piedra que 35 siglos de arena del Sahara!',
  },
  {
    id: 'eratostenes',
    title: 'Midiendo la Tierra',
    color: '#1ABC9C',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_eratostenes.png',
    image: '/assets/egypt/infographic_obeliscos/hero_eratostenes.png',
    content: [
      'Â¿Puedes medir el tamaÃ±o de la Tierra con un palo y una sombra? Â¡EratÃ³stenes lo hizo hace 2,250 aÃ±os! Este genio griego que vivÃ­a en AlejandrÃ­a (Egipto) usÃ³ el mismo principio del obelisco â€”medir sombrasâ€” para calcular la circunferencia de nuestro planeta con una precisiÃ³n asombrosa.',
      'EratÃ³stenes se enterÃ³ de que en la ciudad de Siena (hoy AsuÃ¡n), al mediodÃ­a del solsticio de verano, el Sol estaba justo encima: un palo vertical no proyectaba sombra y la luz del sol llegaba hasta el fondo de un pozo profundo. Pero en AlejandrÃ­a, a 800 km al norte, un palo SÃ proyectaba sombra al mediodÃ­a del mismo dÃ­a. Â¿Por quÃ© la diferencia?',
      'La respuesta era simple pero revolucionaria: Â¡la Tierra es redonda! Si fuera plana, la sombra serÃ­a igual en ambas ciudades. EratÃ³stenes midiÃ³ el Ã¡ngulo de la sombra en AlejandrÃ­a: 7.2 grados, que es 1/50 de un cÃ­rculo completo (360Â°). Si Siena y AlejandrÃ­a estaban separadas por 800 km, entonces la circunferencia total de la Tierra serÃ­a 800 Ã— 50 = 40,000 km.',
      'Â¿Y cuÃ¡l es la circunferencia real de la Tierra? Â¡40,075 km! EratÃ³stenes acertÃ³ con un error de menos del 1%. Usando solo un palo, una sombra y geometrÃ­a bÃ¡sica, un hombre calculÃ³ el tamaÃ±o del planeta entero hace 2,250 aÃ±os. Â¡Ni siquiera necesitÃ³ una calculadora!',
      'Los egipcios le dieron a EratÃ³stenes las herramientas para su descubrimiento: el gnomon (una varilla vertical para medir sombras) era la versiÃ³n portÃ¡til del obelisco. Los sacerdotes egipcios usaban gnomones desde hacÃ­a 2,000 aÃ±os antes de EratÃ³stenes para calcular la latitud de diferentes ciudades midiendo la sombra del mediodÃ­a. Â¡La ciencia egipcia del obelisco permitiÃ³ medir la Tierra!',
    ],
    fact: 'EratÃ³stenes tambiÃ©n inventÃ³ un mÃ©todo para encontrar nÃºmeros primos llamado "la criba de EratÃ³stenes" que todavÃ­a se enseÃ±a en las escuelas. Era bibliotecario de la Biblioteca de AlejandrÃ­a, la mÃ¡s grande del mundo antiguo. Â¡Un solo hombre midiÃ³ la Tierra, organizÃ³ todo el conocimiento humano, y creÃ³ un mÃ©todo matemÃ¡tico que usamos 2,250 aÃ±os despuÃ©s!',
  },
  {
    id: 'legado-tiempo',
    title: 'Del Obelisco al Reloj AtÃ³mico',
    color: '#E67E22',
    btnImage: '/assets/egypt/infographic_obeliscos/btn_legado.png',
    image: '/assets/egypt/infographic_obeliscos/hero_legado.png',
    content: [
      'El obelisco fue el primer eslabÃ³n de una cadena increÃ­ble que conecta la antigÃ¼edad con tu telÃ©fono celular. Cada vez que miras la hora en tu celular, estÃ¡s usando tecnologÃ­a que comenzÃ³ con una sombra de piedra en el desierto hace 4,000 aÃ±os. Â¡Veamos cÃ³mo el obelisco se convirtiÃ³ en el reloj atÃ³mico!',
      'Los egipcios midieron el tiempo con sombras â†’ los griegos mejoraron los relojes solares con matemÃ¡ticas â†’ los romanos construyeron relojes de agua (clepsidras) para medir el tiempo de noche â†’ los monjes medievales inventaron los relojes mecÃ¡nicos con engranajes para saber cuÃ¡ndo rezar â†’ los holandeses inventaron el reloj de pÃ©ndulo (1656) â†’ los suizos perfeccionaron los relojes de bolsillo.',
      'En 1927, Warren Marrison inventÃ³ el reloj de cuarzo: un cristal que vibra exactamente 32,768 veces por segundo cuando le aplicas electricidad. Esas vibraciones son tan constantes que el reloj solo se desfasa 1 segundo cada 10 aÃ±os. Â¡Tu reloj de pulsera digital usa esta misma tecnologÃ­a!',
      'En 1955, Louis Essen inventÃ³ el reloj atÃ³mico de cesio: los Ã¡tomos de cesio vibran exactamente 9,192,631,770 veces por segundo. Es tan preciso que se desfasa solo 1 segundo cada 300 millones de aÃ±os. Los satÃ©lites GPS usan relojes atÃ³micos â€”si fueran menos precisos, tu ubicaciÃ³n en Google Maps se desviarÃ­a 10 km cada dÃ­a.',
      'PiÃ©nsalo: los sacerdotes egipcios necesitaban saber la hora para coordinar rituales, predecir la crecida del Nilo y plantar cultivos. Esa necesidad impulsÃ³ la invenciÃ³n de instrumentos cada vez mÃ¡s precisos durante 4,000 aÃ±os. El obelisco que medÃ­a la sombra del sol es el tatara-tatara-tatara-abuelo del reloj atÃ³mico de tu celular. Â¡La prÃ³xima vez que mires la hora, agradÃ©cele a un sacerdote egipcio!',
    ],
    fact: 'El reloj atÃ³mico mÃ¡s preciso del mundo (el reloj Ã³ptico de iterbio del NIST) se desfasarÃ­a menos de 1 segundo en 15 mil millones de aÃ±os â€”Â¡mÃ¡s que la edad del universo! Los egipcios empezaron esta carrera de precisiÃ³n hace 4,000 aÃ±os con un bloque de granito y una sombra.',
  },
];

// â”€â”€â”€ Sand Particle Field â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SandParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
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
            margin: '0 0 0.8rem', fontSize: '1.4rem', fontWeight: 800,
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#1A0A00',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>
                Dato CientÃ­fico
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
          <ChevronRight size={14} /> Toca cada cÃ­rculo para explorar <ChevronRight size={14} />
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
              ðŸ›ï¸ Â¡Has descubierto todos los secretos de los Obeliscos!
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
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>â€¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
