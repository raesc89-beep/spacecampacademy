'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Travel themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoClockwork({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Clock hands */}
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Hour markers */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
      {/* Gear teeth */}
      {[15,45,75,105,135,165,195,225,255,285,315,345].map((a,i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30+23*Math.cos(rad)-2} y={30+23*Math.sin(rad)-2} width="4" height="4" fill={color} opacity="0.3" transform={`rotate(${a} ${30+23*Math.cos(rad)} ${30+23*Math.sin(rad)})`} />;
      })}
    </svg>
  );
}

function DecoLightning({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Main timeline */}
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Branch */}
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Nodes */}
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      {/* Arrow */}
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      {/* Electron orbits */}
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      {/* Electrons */}
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
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

function DecoDeLoreanSvg({ size = 80, color = '#90CAF9', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Car body silhouette */}
      <path d="M10 28 L18 28 L22 18 L35 14 L55 14 L62 18 L70 28 L72 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="24" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Speed trails */}
      <line x1="2" y1="20" x2="12" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="4" y1="24" x2="14" y2="24" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="6" y1="28" x2="10" y2="28" stroke={color} strokeWidth="1" opacity="0.2" />
      {/* Fire trails */}
      <path d="M72 26 Q76 24 78 26 Q76 28 72 26" fill={color} opacity="0.3" />
      <path d="M72 30 Q76 28 78 30 Q76 32 72 30" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFormula({ size = 70, color = '#FFAB91', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* E=mcÂ² stylized */}
      <text x="10" y="28" fill={color} fontSize="20" fontWeight="bold" fontFamily="serif" opacity="0.4">E=mcÂ²</text>
      {/* Floating particles */}
      <circle cx="58" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="62" cy="18" r="1" fill={color} opacity="0.4" />
      <circle cx="55" cy="36" r="1.5" fill={color} opacity="0.5" />
      <circle cx="8" cy="8" r="1" fill={color} opacity="0.3" />
      {/* Wavy lines */}
      <path d="M5 38 Q15 34 25 38 Q35 42 45 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'relatividad-basico': [DecoClockwork, DecoFormula, DecoAtomSvg],
  'delorean-velocidad': [DecoDeLoreanSvg, DecoLightning, DecoClockwork],
  'paradoja-abuelo': [DecoTimeline, DecoWormhole, DecoClockwork],
  'einstein-relatividad': [DecoFormula, DecoAtomSvg, DecoClockwork],
  'muchos-mundos': [DecoWormhole, DecoTimeline, DecoAtomSvg],
  'predicciones-2015': [DecoDeLoreanSvg, DecoLightning, DecoFormula],
  'ciencia-ficcion': [DecoWormhole, DecoFormula, DecoTimeline],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Einstein, A. (1905). Zur Elektrodynamik bewegter Korper, Annalen der Physik, 17',
  'Hawking, S. (1988). A Brief History of Time, Bantam Books',
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'relatividad-basico',
    title: 'Â¿QuÃ© es el Tiempo?',
    color: '#6EC6FF',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_relatividad.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_relatividad.png',
    content: [
      'Imagina que tienes un reloj en tu muÃ±eca y tu amigo tiene otro idÃ©ntico. Si tu amigo se sube a un cohete que viaja increÃ­blemente rÃ¡pido â€” digamos al 90% de la velocidad de la luz â€” y tÃº te quedas en la Tierra, algo asombroso pasarÃ­a: Â¡su reloj se atrasarÃ­a! No es que estÃ© roto, es que el tiempo realmente pasa mÃ¡s despacio para quien viaja rÃ¡pido.',
      'Esto no es ciencia ficciÃ³n: Albert Einstein lo demostrÃ³ en 1905 con su TeorÃ­a de la Relatividad Especial. Y lo hemos comprobado muchas veces. En 1971, los fÃ­sicos Joseph Hafele y Richard Keating pusieron relojes atÃ³micos ultra-precisos en aviones que volaron alrededor del mundo. Cuando los compararon con relojes idÃ©nticos que se quedaron en tierra, Â¡los relojes del aviÃ³n se habÃ­an atrasado 59 nanosegundos! Exactamente lo que Einstein predijo.',
      'El ejemplo mÃ¡s prÃ¡ctico estÃ¡ en tu bolsillo: los satÃ©lites GPS orbitan la Tierra a unos 14,000 km/h. A esa velocidad, sus relojes atÃ³micos se atrasan 7 microsegundos al dÃ­a por velocidad. Pero como estÃ¡n mÃ¡s lejos de la gravedad terrestre, Â¡tambiÃ©n se adelantan 45 microsegundos al dÃ­a! Sin corregir esta diferencia, el GPS darÃ­a errores de ubicaciÃ³n de hasta 10 kilÃ³metros cada dÃ­a.',
      'El tiempo tambiÃ©n tiene una "direcciÃ³n". Es como un rÃ­o que solo fluye en un sentido: del pasado al futuro. Los fÃ­sicos llaman a esto la "flecha del tiempo", y estÃ¡ conectada con algo llamado entropÃ­a â€” una medida del desorden. Un huevo roto nunca se rearma solo. Una taza de cafÃ© caliente siempre se enfrÃ­a, nunca se calienta sola. El tiempo avanza porque el desorden siempre aumenta.',
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Si pudieras viajar al 99.9% de la velocidad de la luz, el tiempo pasarÃ­a para ti 22 veces mÃ¡s lento. Un viaje de 1 aÃ±o para ti serÃ­an 22 aÃ±os en la Tierra. Â¡VolverÃ­as al futuro como Marty McFly!' },
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'En "Regreso al Futuro", Doc Brown dice que el tiempo es la "cuarta dimensiÃ³n". Â¡Esto es correcto! Einstein unificÃ³ las tres dimensiones del espacio con el tiempo en un concepto llamado "espacio-tiempo" de cuatro dimensiones.' },
    ],
    fact: 'Los muones â€” partÃ­culas diminutas creadas cuando los rayos cÃ³smicos golpean la atmÃ³sfera â€” viajan al 99.94% de la velocidad de la luz. DeberÃ­an desintegrarse antes de llegar al suelo, pero gracias a la dilataciÃ³n temporal, el tiempo pasa tan lento para ellos que SÃ llegan. Â¡La relatividad ocurre sobre nuestras cabezas todos los dÃ­as!',
  },
  {
    id: 'delorean-velocidad',
    title: '88 Millas por Hora',
    color: '#FFD740',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_delorean.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_delorean.png',
    content: [
      'En la pelÃ­cula, el DeLorean necesita alcanzar 88 millas por hora (141 km/h) para activar el viaje en el tiempo. Suena impresionante cuando ves las llamas en el asfalto, Â¿verdad? Pero pongÃ¡moslo en perspectiva: un aviÃ³n comercial vuela a 900 km/h. Â¡El DeLorean es mÃ¡s lento que el aviÃ³n en el que tus papÃ¡s viajan de vacaciones!',
      'Para que la relatividad de Einstein haga efecto real sobre el tiempo, necesitarÃ­as viajar a velocidades cercanas a la de la luz: Â¡1,079 MILLONES de km/h! Eso es 7.6 millones de veces mÃ¡s rÃ¡pido que el DeLorean. A la velocidad de la luz, podrÃ­as dar 7.5 vueltas a la Tierra en UN SOLO SEGUNDO.',
      'El DeLorean real (DMC-12) fue fabricado en Belfast, Irlanda del Norte, entre 1981 y 1983 por la DeLorean Motor Company. Solo se fabricaron unos 9,000 coches antes de que la empresa quebrara. Su carrocerÃ­a de acero inoxidable sin pintar le daba un aspecto futurista Ãºnico. Hoy, un DeLorean en buen estado vale entre $40,000 y $100,000 dÃ³lares.',
      'La energÃ­a que necesita la mÃ¡quina del tiempo segÃºn la pelÃ­cula es de 1.21 gigawatts (Â¡"jigovatios" como dice Doc!). Â¿CuÃ¡nto es eso? Aproximadamente la energÃ­a que produce una central nuclear completa, o la que descarga un rayo natural en una fracciÃ³n de segundo. En la pelÃ­cula, Doc originalmente usa plutonio robado, y despuÃ©s Mr. Fusion (un reactor de fusiÃ³n casero alimentado con basura).',
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Las zapatillas Nike Mag de "Regreso al Futuro II" se hicieron realidad. Nike presentÃ³ en 2016 las Nike HyperAdapt con sistema de ajuste automÃ¡tico real. Solo se fabricaron 89 pares de las Mag originales, subastadas por hasta $200,000 dÃ³lares cada par para caridad.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: '1.21 gigawatts no es una cifra descabellada. La estaciÃ³n espacial ISS usa solo 120 kilowatts de energÃ­a solar. Un rayo produce entre 1 y 5 gigawatts, pero solo durante 30 microsegundos. La fusiÃ³n nuclear controlada (como en ITER, Francia) podrÃ­a producir 500 megawatts â€” todavÃ­a menos que lo que necesita el DeLorean.' },
    ],
    fact: 'El nÃºmero "88 mph" fue elegido por los guionistas Bob Gale y Robert Zemeckis porque les gustÃ³ cÃ³mo se veÃ­a "88" en el velocÃ­metro del DeLorean. No tiene ningÃºn significado cientÃ­fico. Sin embargo, en el sistema mÃ©trico, 88 mph = 141.62 km/h, que casualmente es la velocidad mÃ¡xima real que alcanzaba el DMC-12 original.',
  },
  {
    id: 'paradoja-abuelo',
    title: 'La Paradoja del Abuelo',
    color: '#FF8A80',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_paradoja.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_paradoja.png',
    content: [
      'Imagina esto: viajas al pasado en una mÃ¡quina del tiempo y evitas que tus abuelos se conozcan. Si nunca se conocieron, tus padres nunca nacieron. Y si tus padres nunca nacieron... Â¡tÃº nunca naciste para hacer el viaje! Pero si nunca hiciste el viaje, tus abuelos sÃ­ se conocieron y tÃº sÃ­ naciste. Es un cÃ­rculo imposible. Esto es la Paradoja del Abuelo.',
      'Es como intentar borrar la llave con la que abriste una puerta... Â¡mientras estÃ¡s dentro del cuarto! Si borras la llave, nunca pudiste abrir la puerta, asÃ­ que nunca entraste al cuarto para borrar la llave. Es un verdadero rompecabezas lÃ³gico.',
      '"Regreso al Futuro" muestra esta paradoja de manera brillante: cuando Marty viaja a 1955 y accidentalmente impide que sus padres se conozcan, empieza a desvanecerse de una fotografÃ­a familiar. Si no logra que se enamoren, dejarÃ¡ de existir. La pelÃ­cula convierte un concepto de fÃ­sica teÃ³rica en algo visual y emocionante.',
      'Los fÃ­sicos tienen dos soluciones principales para esta paradoja. La primera es la "InterpretaciÃ³n de los Muchos Mundos" propuesta por Hugh Everett III en 1957: al viajar al pasado, creas una rama paralela del universo. En tu universo original nada cambia; en el nuevo, las cosas son diferentes. La segunda es el "Principio de Autoconsistencia" de Igor Novikov (1980s): las leyes de la fÃ­sica solo permiten viajes al pasado que NO crean paradojas â€” como si el universo se protegiera a sÃ­ mismo.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Marty no es el Ãºnico que casi causa una paradoja. En BTTF II, el viejo Biff roba el DeLorean y se da el almanaque deportivo a sÃ­ mismo en 1955, creando una lÃ­nea temporal alternativa donde es millonario y Hill Valley es un desastre. Doc explica que el viaje creÃ³ una "tangente temporal" â€” una rama del tiempo.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El filÃ³sofo David Lewis argumentÃ³ en 1976 que no hay paradoja real: si viajaras al pasado para "matar a tu abuelo", algo SIEMPRE lo impedirÃ­a â€” te resbalarias, fallarÃ­as el tiro, cambiarÃ­as de opiniÃ³n. El universo conspirarÃ­a para mantener la consistencia. Â¡Es como si la realidad tuviera un sistema inmunolÃ³gico!' },
    ],
    fact: 'En la fÃ­sica real, el concepto mÃ¡s cercano a una "paradoja temporal" ocurre a nivel cuÃ¡ntico. Las partÃ­culas de antimateria (como el positrÃ³n) se comportan matemÃ¡ticamente como si fueran partÃ­culas normales viajando hacia atrÃ¡s en el tiempo. El fÃ­sico Richard Feynman propuso esta interpretaciÃ³n en 1949, Â¡y las matemÃ¡ticas funcionan perfectamente!',
  },
  {
    id: 'einstein-relatividad',
    title: 'Einstein y el Tiempo ElÃ¡stico',
    color: '#B388FF',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_einstein.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_einstein.png',
    content: [
      'Albert Einstein era un joven empleado de la oficina de patentes en Berna, Suiza, cuando en 1905 publicÃ³ cuatro artÃ­culos que cambiaron la fÃ­sica para siempre. Uno de ellos contenÃ­a la TeorÃ­a de la Relatividad Especial, que demostrÃ³ que el tiempo no es igual para todos â€” depende de tu velocidad.',
      'Piensa en el tiempo como una goma elÃ¡stica. Si te sientas quieto, la goma estÃ¡ en reposo. Pero si corres muy rÃ¡pido, la goma se estira: el tiempo se dilata, pasa mÃ¡s despacio para ti. A velocidades cotidianas el efecto es microscÃ³pico, pero cerca de la velocidad de la luz se vuelve enorme.',
      'La famosa "Paradoja de los Gemelos" lo explica asÃ­: si tienes un hermano gemelo y Ã©l viaja al 90% de la velocidad de la luz durante 5 aÃ±os (segÃºn SU reloj), cuando regrese a la Tierra habrÃ¡n pasado 11.5 aÃ±os aquÃ­. TÃº serÃ¡s 6.5 aÃ±os mÃ¡s viejo que tu gemelo. No es magia: es fÃ­sica verificada experimentalmente.',
      'En 1971, Hafele y Keating pusieron esto a prueba con relojes atÃ³micos de cesio en aviones comerciales que volaron hacia el este y el oeste alrededor del mundo. Los resultados coincidieron con la predicciÃ³n de Einstein: los relojes en movimiento se atrasaron. Este experimento se considera una de las pruebas mÃ¡s elegantes de la relatividad.',
    ],
    expandables: [
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'La ecuaciÃ³n mÃ¡s famosa del mundo, E=mcÂ², dice que la energÃ­a (E) es igual a la masa (m) multiplicada por la velocidad de la luz al cuadrado (cÂ²). Como c = 300,000 km/s, cÂ² es un nÃºmero ENORME. Por eso una cantidad diminuta de masa contiene una cantidad colosal de energÃ­a. Una moneda de 1 centavo contiene suficiente energÃ­a (segÃºn E=mcÂ²) para abastecer a una ciudad pequeÃ±a durante varios dÃ­as.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Einstein no ganÃ³ el Nobel por la relatividad sino por explicar el efecto fotoelÃ©ctrico (cÃ³mo la luz arranca electrones de los metales). El comitÃ© Nobel considerÃ³ la relatividad "demasiado teÃ³rica" en 1921. Hoy usamos el efecto fotoelÃ©ctrico en paneles solares y cÃ¡maras digitales.' },
    ],
    fact: 'El astronauta Scott Kelly pasÃ³ 340 dÃ­as en la EstaciÃ³n Espacial Internacional (que orbita a 27,600 km/h). Cuando regresÃ³, era 8.6 milisegundos mÃ¡s joven que su hermano gemelo Mark Kelly (tambiÃ©n astronauta). Â¡La paradoja de los gemelos ocurriÃ³ literalmente! Scott viajÃ³ una fracciÃ³n infinitesimal al futuro.',
  },
  {
    id: 'muchos-mundos',
    title: 'LÃ­neas Temporales Paralelas',
    color: '#CE93D8',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_mundos.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_mundos.png',
    content: [
      'En "Regreso al Futuro II", Doc Brown dibuja en una pizarra cÃ³mo el tiempo se bifurca cuando alguien cambia el pasado: la lÃ­nea temporal original sigue existiendo, pero una nueva lÃ­nea "alternativa" se crea. Esto no es solo pelÃ­cula â€” es una idea real de la fÃ­sica llamada la "InterpretaciÃ³n de los Muchos Mundos".',
      'Hugh Everett III la propuso en 1957, cuando tenÃ­a solo 27 aÃ±os. Su idea era revolucionaria: cada vez que ocurre un evento cuÃ¡ntico (como un electrÃ³n que puede girar a la izquierda o a la derecha), el universo se divide en dos ramas. En una rama gira a la izquierda, en la otra a la derecha. Las dos ramas coexisten pero no se comunican entre sÃ­.',
      'Imagina un jardÃ­n de senderos que se bifurcan. Cada decisiÃ³n, cada evento cuÃ¡ntico, crea un nuevo camino. Si esto es cierto, existen infinitos universos paralelos: uno donde los dinosaurios no se extinguieron, uno donde nunca aprendiste a leer, uno donde estÃ¡s leyendo este mismo texto pero con un sombrero puesto.',
      'Werner Heisenberg descubriÃ³ en 1927 el Principio de Incertidumbre: es imposible conocer simultÃ¡neamente la posiciÃ³n exacta y la velocidad exacta de una partÃ­cula. No es un problema de instrumentos: es una propiedad fundamental de la realidad. Esto significa que el futuro no estÃ¡ determinado con precisiÃ³n â€” hay probabilidades, no certezas. "Ver el futuro" es literalmente imposible porque el futuro aÃºn no existe de manera fija.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Cuando Biff altera 1955 con el almanaque, Doc explica que creÃ³ una "tangente temporal" â€” una lÃ­nea alternativa del tiempo. En esta versiÃ³n, Hill Valley es un paraÃ­so del crimen y Biff es dueÃ±o de un casino. Doc y Marty deben volver a 1955 para restaurar la lÃ­nea original. Â¡Puro Everett en acciÃ³n!' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Hugh Everett abandonÃ³ la fÃ­sica en 1960 porque nadie tomaba en serio su teorÃ­a. Se dedicÃ³ a trabajar para el PentÃ¡gono en anÃ¡lisis matemÃ¡tico militar. MuriÃ³ en 1982 sin saber que su idea se convertirÃ­a en una de las interpretaciones mÃ¡s estudiadas y debatidas de la mecÃ¡nica cuÃ¡ntica. Su hijo Mark Oliver Everett es el cantante de la banda de rock Eels.' },
    ],
    fact: 'Si la interpretaciÃ³n de Muchos Mundos es correcta, desde el Big Bang se han creado un nÃºmero inimaginable de universos paralelos. El fÃ­sico Max Tegmark calculÃ³ que la copia mÃ¡s cercana de ti â€” idÃ©ntica Ã¡tomo por Ã¡tomo â€” estarÃ­a a 10^(10^29) metros de distancia. Eso es un 1 seguido de 100,000,000,000,000,000,000,000,000,000 ceros de metros. Â¡Lejos pero existente!',
  },
  {
    id: 'predicciones-2015',
    title: 'Predicciones del Futuro',
    color: '#80CBC4',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_predicciones.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_predicciones.png',
    content: [
      'En "Regreso al Futuro II" (1989), Doc y Marty viajan al 21 de octubre de 2015. La pelÃ­cula imaginÃ³ cÃ³mo serÃ­a ese aÃ±o, y algunas predicciones fueron asombrosamente acertadas: âœ… tabletas electrÃ³nicas y pantallas planas en todas partes, âœ… videollamadas (Marty habla con su jefe por videoconferencia), âœ… pago con huella dactilar y biometrÃ­a, âœ… gafas inteligentes (antes de Google Glass).',
      'Pero tambiÃ©n fallaron espectacularmente: âŒ No hay coches voladores de uso cotidiano. âŒ Los fax NO son la tecnologÃ­a de comunicaciÃ³n dominante (el internet los enterrÃ³). âŒ Los hoverboards magnÃ©ticos flotantes no existen para el pÃºblico general. âŒ No usamos chaquetas autoajustables ni zapatos auto-atables como ropa estÃ¡ndar.',
      'Predecir el futuro tecnolÃ³gico es como intentar adivinar quÃ© juguete inventarÃ¡n el prÃ³ximo aÃ±o: es mÃ¡s fÃ¡cil predecir que HABRÃ juguetes nuevos que predecir cuÃ¡les serÃ¡n exactamente. Las predicciones que acertaron fueron sobre TENDENCIAS generales (pantallas, biometrÃ­a, conectividad). Las que fallaron fueron sobre PRODUCTOS especÃ­ficos (coches voladores, fax).',
      'Sin embargo, una predicciÃ³n alucinante casi se cumple: la pelÃ­cula mostrÃ³ que los Cubs de Chicago ganarÃ­an la Serie Mundial de bÃ©isbol en 2015. Â¡Los Cubs realmente ganaron la Serie Mundial en 2016! Solo fallaron por un aÃ±o, despuÃ©s de una sequÃ­a de 108 aÃ±os sin campeonato. Fue tan improbable que muchos fans agradecieron a la pelÃ­cula.',
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Las zapatillas Nike Mag de la pelÃ­cula se hicieron realidad con el sistema "E.A.R.L." (Electro Adaptive Reactive Lacing). Este mecanismo usaba un sensor en el talÃ³n que activaba un micromotor a baterÃ­a, el cual tensaba los cordones automÃ¡ticamente al detectar el peso del pie del usuario.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'El progreso tecnolÃ³gico avanza mÃ¡s rÃ¡pido en informaciÃ³n que en transporte. En 1969 fuimos a la Luna; en 2026, el cohete mÃ¡s rÃ¡pido viaja a velocidades similares. Pero la capacidad de computaciÃ³n se ha multiplicado por mÃ¡s de mil millones desde entonces. Por eso tenemos smartphones pero no coches voladores.' },
    ],
    fact: 'La predicciÃ³n mÃ¡s profunda de BTTF no fue un gadget sino un concepto social: la pelÃ­cula mostrÃ³ un mundo donde la tecnologÃ­a estÃ¡ integrada naturalmente en la vida cotidiana, donde las personas interactÃºan con dispositivos constantemente y la informaciÃ³n es ubicua e inmediata. Esto describe perfectamente la realidad de 2015 y mÃ¡s allÃ¡. Los guionistas entendieron el ESPÃRITU del futuro, aunque no los detalles.',
  },
  {
    id: 'ciencia-ficcion',
    title: 'Ciencia FicciÃ³n como BrÃºjula',
    color: '#FFAB91',
    btnImage: '/assets/bttf/infographic_viajes_tiempo/btn_cienciaficcion.png',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_cienciaficcion.png',
    content: [
      'La ciencia ficciÃ³n no solo predice el futuro â€” lo INSPIRA. Los comunicadores de "Star Trek" (1966) inspiraron a Martin Cooper para crear el primer telÃ©fono celular en Motorola (1973). Los submarinos de Julio Verne (1870) precedieron a los submarinos reales. Las tabletas de "2001: Odisea del Espacio" (1968) anticiparon el iPad por 42 aÃ±os.',
      '"Regreso al Futuro" ha inspirado a generaciones de cientÃ­ficos. El fÃ­sico Ronald Mallett (Universidad de Connecticut) ha dedicado su vida a diseÃ±ar una mÃ¡quina del tiempo teÃ³rica usando lÃ¡seres circulares, inspirado por la pelÃ­cula y por el deseo de ver a su padre fallecido. Aunque su diseÃ±o es controvertido, su investigaciÃ³n sobre gravedad y luz es legÃ­tima.',
      'La causalidad â€” el principio de que la causa siempre precede al efecto â€” es uno de los pilares mÃ¡s fundamentales de la fÃ­sica. Es tan importante que Stephen Hawking propuso la "Conjetura de ProtecciÃ³n de la CronologÃ­a": las leyes de la fÃ­sica SIEMPRE conspiran para impedir el viaje al pasado y proteger la causalidad.',
      'La ciencia ficciÃ³n hace preguntas teÃ³ricas, y la ciencia busca respuestas comprobables. Â¿QuÃ© es el tiempo? Â¿Puede tener direcciÃ³n contraria? Estas interrogantes conceptuales son las que impulsan muchas ramas de la fÃ­sica moderna.',
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Stephen Hawking organizÃ³ una "Fiesta para Viajeros del Tiempo" el 28 de junio de 2009 en la Universidad de Cambridge. PreparÃ³ champÃ¡n, globos y un cartel de bienvenida... pero enviÃ³ las invitaciones DESPUÃ‰S de la fiesta. Su lÃ³gica: si el viaje al pasado fuera posible, alguien del futuro habrÃ­a recibido la invitaciÃ³n y asistido. Nadie vino. Hawking lo considerÃ³ "evidencia experimental" de que el viaje al pasado probablemente es imposible.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'El fÃ­sico Kip Thorne (Premio Nobel 2017) demostrÃ³ en 1988 que los agujeros de gusano PODRÃAN permitir el viaje en el tiempo en teorÃ­a, pero requerirÃ­an "materia exÃ³tica" con energÃ­a negativa para mantenerlos abiertos. AÃºn no sabemos si la materia exÃ³tica existe. Thorne fue asesor cientÃ­fico de la pelÃ­cula "Interstellar".' },
    ],
    fact: 'Michael J. Fox (Marty McFly) fue diagnosticado con Parkinson a los 29 aÃ±os. CreÃ³ la FundaciÃ³n Michael J. Fox, que ha recaudado mÃ¡s de $1,500 millones de dÃ³lares para investigaciÃ³n del Parkinson â€” mÃ¡s que cualquier otra fundaciÃ³n privada de enfermedad neurolÃ³gica. La ciencia ficciÃ³n que interpretÃ³ ahora financia ciencia real.',
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
      hue: Math.random() > 0.5 ? '160,200,255' : '200,160,255', // blue or purple
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(110,198,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6EC6FF','#FFD740','#FF8A80','#B388FF','#CE93D8','#80CBC4','#FFAB91'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central clock icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#6EC6FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#6EC6FF" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#6EC6FF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#6EC6FF" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(110,198,255,0.2)" />
            <stop offset="50%" stopColor="rgba(110,198,255,0.9)" />
            <stop offset="100%" stopColor="rgba(110,198,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#6EC6FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIAJES EN EL TIEMPO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(110,198,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DETRÃS DE LA FICCIÃ“N</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(110,198,255,0.2)'}`,
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
          layoutId="activeDotBttfM2"
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
                  background: node.color, color: '#0B0E2D',
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
      border: '1px solid rgba(110,198,255,0.15)',
    }}>
      <Star size={14} style={{ color: '#6EC6FF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #6EC6FF, #B388FF)', borderRadius: '3px', boxShadow: '0 0 8px rgba(110,198,255,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#6EC6FF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/bttf/infographic_viajes_tiempo/bg_viajes_tiempo.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(110,198,255,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
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
            textAlign: 'center', color: 'rgba(110,198,255,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(110,198,255,0.08)', borderRadius: '16px',
              border: '1px solid rgba(110,198,255,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#6EC6FF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ† Â¡Has dominado los secretos del Viaje en el Tiempo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Viajero Temporal
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
