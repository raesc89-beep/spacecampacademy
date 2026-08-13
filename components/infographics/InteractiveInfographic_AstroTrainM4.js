'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Rocket & Propulsion themed) ————————————————
function DecoRocket({ size = 70, color = '#C44B4B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rocket body */}
      <path d="M30 6 L24 30 L26 42 L30 46 L34 42 L36 30 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Nose cone */}
      <circle cx="30" cy="14" r="3" fill={color} opacity="0.4" />
      {/* Fins */}
      <path d="M24 35 L16 44 L24 42" fill={color} opacity="0.3" />
      <path d="M36 35 L44 44 L36 42" fill={color} opacity="0.3" />
      {/* Exhaust flame */}
      <path d="M27 46 Q30 56 33 46" fill={color} opacity="0.35" />
      <path d="M28 46 Q30 52 32 46" fill={color} opacity="0.5" />
      {/* Exhaust particles */}
      <circle cx="26" cy="54" r="1" fill={color} opacity="0.3" />
      <circle cx="34" cy="52" r="1.2" fill={color} opacity="0.25" />
      <circle cx="30" cy="56" r="0.8" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoFlame({ size = 70, color = '#D45A5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Main flame */}
      <path d="M30 8 Q20 22 24 32 Q26 38 30 42 Q34 38 36 32 Q40 22 30 8" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      {/* Inner flame */}
      <path d="M30 16 Q25 26 28 34 Q29 38 30 40 Q31 38 32 34 Q35 26 30 16" fill={color} opacity="0.4" />
      {/* Sparks */}
      <circle cx="20" cy="18" r="1.5" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1" fill={color} opacity="0.35" />
      <circle cx="16" cy="30" r="1" fill={color} opacity="0.3" />
      <circle cx="44" cy="26" r="1.5" fill={color} opacity="0.4" />
      {/* Heat waves */}
      <path d="M22 44 Q26 42 30 44 Q34 46 38 44" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M24 48 Q28 46 32 48 Q36 50 40 48" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoNozzle({ size = 70, color = '#A8B5C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Bell nozzle shape */}
      <path d="M22 12 L22 20 Q22 36 14 48 L46 48 Q38 36 38 20 L38 12 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Internal lines */}
      <line x1="26" y1="14" x2="24" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="34" y1="14" x2="36" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Throat */}
      <line x1="22" y1="20" x2="38" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Exhaust flow */}
      <path d="M18 50 Q30 54 42 50" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M20 54 Q30 58 40 54" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoGear({ size = 60, color = '#96A3AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.3" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 30 + 12 * Math.cos(rad), y1 = 30 + 12 * Math.sin(rad);
        const x2 = 30 + 18 * Math.cos(rad), y2 = 30 + 18 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />;
      })}
      {/* Outer ring */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" strokeDasharray="4 4" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#8491A0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Orbital ellipses */}
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(120 30 30)" />
      {/* Planet */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      {/* Satellite dots */}
      <circle cx="54" cy="30" r="2" fill={color} opacity="0.5" />
      <circle cx="18" cy="18" r="1.5" fill={color} opacity="0.4" />
      <circle cx="42" cy="42" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoStaging({ size = 80, color = '#E46A6A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Stage 1 */}
      <rect x="32" y="30" width="16" height="16" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Stage 2 */}
      <rect x="34" y="16" width="12" height="14" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Payload fairing */}
      <path d="M36 16 L40 6 L44 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      {/* Separation lines */}
      <line x1="30" y1="30" x2="50" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 2" />
      <line x1="32" y1="16" x2="48" y2="16" stroke={color} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 2" />
      {/* Arrows */}
      <path d="M26 38 L20 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M54 38 L60 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Labels */}
      <text x="14" y="42" fill={color} fontSize="6" opacity="0.3" fontFamily="monospace">S1</text>
      <text x="62" y="42" fill={color} fontSize="6" opacity="0.3" fontFamily="monospace">S2</text>
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'tercera-ley-newton': [DecoRocket, DecoFlame, DecoGear],
  'historia-coheteria': [DecoStaging, DecoRocket, DecoNozzle],
  'combustibles-oxidantes': [DecoFlame, DecoNozzle, DecoGear],
  'etapas-cohete': [DecoStaging, DecoRocket, DecoOrbit],
  'el-lanzamiento': [DecoFlame, DecoRocket, DecoStaging],
  'cohetes-reutilizables': [DecoRocket, DecoGear, DecoOrbit],
  'propulsion-futuro': [DecoOrbit, DecoNozzle, DecoFlame],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Sutton, G.P. & Biblarz, O. (2017). Rocket Propulsion Elements, 9th ed. John Wiley & Sons',
  'Vance, A. (2015). Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future. Ecco/HarperCollins',
  'von Braun, W. (1952). The Mars Project. University of Illinois Press',
  'NASA Glenn Research Center. Beginner\'s Guide to Rockets. NASA Technical Reports Server',
  'Tsiolkovsky, K.E. (1903). Exploration of Outer Space by Means of Rocket Devices. Nauchnoye Obozreniye',
  'Clark, J.D. (1972). Ignition! An Informal History of Liquid Rocket Propellants. Rutgers University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tercera-ley-newton',
    title: 'La Tercera Ley de Newton',
    color: '#C44B4B',
    btnImage: '/assets/astrotrain/infographic_m4/btn_tercera-ley-newton.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_tercera-ley-newton.jpg',
    content: [
      'La base de toda la cohetería se encuentra en un principio formulado por Isaac Newton en 1687, dentro de su obra Philosophiæ Naturalis Principia Mathematica. La Tercera Ley de Newton establece que a cada acción le corresponde una reacción de igual magnitud pero en sentido opuesto. Cuando un cohete expulsa gases calientes hacia abajo a velocidades superiores a 3,000 metros por segundo, esos gases ejercen una fuerza sobre el cohete que lo empuja hacia arriba. No se trata de que los gases "empujen contra el suelo" — el cohete funciona en el vacío del espacio precisamente porque la fuerza es una interacción directa entre el motor y el gas expulsado.',
      'Para entender este principio de manera práctica, imagina que estás parado sobre una superficie sin fricción, como una pista de hielo, y lanzas una pelota pesada hacia adelante. Tu cuerpo se deslizará hacia atrás. Cuanto más rápido lances la pelota, más rápido te moverás en sentido contrario. Un cohete hace exactamente lo mismo, pero en lugar de una pelota lanza moléculas de gas a velocidades que pueden superar los 4,500 metros por segundo en motores modernos de hidrógeno líquido. Este principio funciona sin importar si hay atmósfera o vacío alrededor del cohete.',
      'El concepto de conservación del momento lineal es la formulación matemática que explica por qué funciona un cohete. El momento total de un sistema cerrado permanece constante: si el cohete y su combustible comienzan en reposo, el momento total es cero. Cuando el combustible sale expulsado con un momento determinado en una dirección, el cohete adquiere un momento igual y opuesto. La ecuación fundamental es: masa del cohete × velocidad del cohete = masa del gas × velocidad del gas. A mayor velocidad de escape de los gases, más eficiente resulta el empuje del motor.',
      'Newton no solo describió esta ley, sino que también sentó las bases matemáticas para la mecánica orbital. Su Ley de Gravitación Universal, publicada en la misma obra de 1687, permitió calcular las trayectorias que los cohetes seguirían siglos después. La combinación de sus tres leyes del movimiento con la gravitación universal forma el marco teórico completo que los ingenieros usan para diseñar misiones espaciales. Cada trayectoria de la ISS, cada maniobra del telescopio James Webb y cada aterrizaje en Marte se calcula usando las ecuaciones que Newton formuló hace más de 300 años.',
      'El empuje de un motor cohete se mide en newtons (N) o en libras-fuerza. Los motores RS-25 del transbordador espacial generaban cada uno 1,860 kilonewtons de empuje a nivel del mar, equivalentes a la fuerza que producirían unos 190,000 kilogramos empujando hacia abajo. El cohete Saturn V, que llevó astronautas a la Luna, generaba un empuje total de 34,020 kilonewtons en su primera etapa — suficiente para levantar sus 2,970 toneladas de peso al despegue. Cada newton de ese empuje se origina en el mismo principio que Newton describió observando cómo una manzana caía de un árbol.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Puedes demostrar la Tercera Ley de Newton con un globo inflado. Si lo sueltas sin atar, el aire sale hacia atrás y el globo sale disparado hacia adelante. Este es el mismo principio que mueve un cohete Saturn V de 3,000 toneladas. La diferencia es que en lugar de aire, el Saturn V expulsa 15 toneladas de combustible por segundo a temperaturas de más de 3,300 grados Celsius. La NASA usó este ejemplo del globo en sus materiales educativos desde los años 1960.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de escape de los gases en un motor cohete determina su eficiencia. En un motor de combustible sólido, los gases salen a unos 2,500 m/s. En un motor de queroseno y oxígeno líquido como el Merlin de SpaceX, alcanzan 3,050 m/s. Los motores de hidrógeno líquido como el RS-25 del transbordador logran 4,440 m/s en el vacío. Los motores iónicos experimentales aceleran partículas a 30,000 m/s, pero con un empuje muy bajo, del orden de fracciones de newton.' },
    ],
    fact: 'Isaac Newton publicó sus tres leyes del movimiento en 1687, pero la aplicación práctica a la cohetería no llegó hasta 1926, cuando Robert Goddard lanzó el primer cohete de combustible líquido en Auburn, Massachusetts. Pasaron 239 años entre la teoría y el primer vuelo propulsado por cohete líquido. El vuelo de Goddard duró solo 2.5 segundos, alcanzó 12.5 metros de altura y recorrió 56 metros. Hoy, los cohetes basados en esos mismos principios alcanzan velocidades de 40,000 km/h para escapar de la gravedad terrestre.',
  },
  {
    id: 'historia-coheteria',
    title: 'Historia de la Cohetería',
    color: '#A8B5C0',
    btnImage: '/assets/astrotrain/infographic_m4/btn_historia-coheteria.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_historia-coheteria.jpg',
    content: [
      'La historia de los cohetes comienza en la China del siglo IX, donde los alquimistas descubrieron la pólvora mezclando salitre, carbón y azufre. Hacia el año 1232, los chinos utilizaron "flechas de fuego volador" contra los invasores mongoles durante la batalla de Kai-Keng. Estos primitivos cohetes consistían en tubos de bambú rellenos de pólvora atados a flechas. Aunque eran armas imprecisas, marcaron el primer uso documentado de la propulsión por cohete en la historia humana. Desde China, la tecnología de cohetes se extendió por la Ruta de la Seda hacia el mundo árabe y posteriormente a Europa durante los siglos XIII y XIV.',
      'El verdadero padre de la cohetería moderna fue Robert Hutchings Goddard, un físico estadounidense que el 16 de marzo de 1926 lanzó el primer cohete de combustible líquido de la historia en la granja de su tía Effie, en Auburn, Massachusetts. El cohete, llamado "Nell", usaba gasolina como combustible y oxígeno líquido como oxidante. Voló durante 2.5 segundos, alcanzó 12.5 metros de altura y aterrizó a 56 metros de distancia. Goddard fue ridiculizado por el New York Times en 1920 por sugerir que un cohete podía funcionar en el vacío del espacio. El periódico publicó una corrección en 1969, el día después del lanzamiento del Apollo 11 hacia la Luna.',
      'Wernher von Braun, ingeniero aeroespacial nacido en Alemania en 1912, desarrolló el cohete V-2 durante la Segunda Guerra Mundial. El V-2 fue el primer objeto fabricado por humanos en alcanzar el espacio, cruzando la línea de Kármán a 100 km de altitud el 20 de junio de 1944. Medía 14 metros, pesaba 12.5 toneladas y utilizaba una mezcla de etanol y oxígeno líquido. Tras la guerra, von Braun fue llevado a Estados Unidos bajo la Operación Paperclip junto con 1,600 científicos alemanes. En la NASA, dirigió el desarrollo del cohete Saturn V que llevó a los primeros humanos a la Luna en julio de 1969.',
      'La carrera espacial entre Estados Unidos y la Unión Soviética aceleró el desarrollo de la cohetería de forma sin precedentes. El ingeniero soviético Serguéi Korolev, conocido como el "Diseñador Jefe", desarrolló el cohete R-7 Semyorka, que el 4 de octubre de 1957 puso en órbita el Sputnik 1, el primer satélite artificial de la historia. Ese mismo diseño básico del R-7 sigue volando en la actualidad como cohete Soyuz, con más de 1,900 lanzamientos desde 1957, lo que lo convierte en el vehículo de lanzamiento más utilizado de la historia. Korolev también supervisó el vuelo de Yuri Gagarin el 12 de abril de 1961.',
      'El cohete Saturn V sigue siendo el vehículo de lanzamiento más potente que ha volado con éxito en la historia. Con 110.6 metros de altura y un peso al despegue de 2,970 toneladas, generaba un empuje de 34,020 kilonewtons — equivalente a la potencia de 543,000 motores de automóvil funcionando simultáneamente. Entre 1967 y 1973 se lanzaron 13 Saturn V, todos de forma exitosa. Transportó a 24 astronautas hacia la Luna en las misiones Apollo y lanzó la estación espacial Skylab. El sistema SLS de la NASA, que voló por primera vez en noviembre de 2022 en la misión Artemis I, es el primer cohete que supera al Saturn V en empuje total.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Robert Goddard registró 214 patentes de cohetes durante su vida, muchas de las cuales describían conceptos que no se utilizarían hasta décadas después de su muerte en 1945. Entre sus inventos estaban las toberas de Laval para cohetes, los giroscopios para estabilización, las bombas de combustible y el concepto de cohetes multietapa. La NASA nombró en su honor el Goddard Space Flight Center en Greenbelt, Maryland, uno de sus centros de investigación más grandes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El cohete Soyuz, derivado del R-7 de Korolev, ha completado más de 1,900 lanzamientos desde 1957. Su tasa de fiabilidad supera el 97%. El diseño utiliza cuatro propulsores laterales (boosters) que se separan a los 118 segundos de vuelo en una maniobra conocida como la "Cruz de Korolev" por la forma que dibujan al separarse. Este diseño de 1957 sigue siendo una de las soluciones de ingeniería más confiables de la historia de la exploración espacial.' },
    ],
    fact: 'El New York Times ridiculizó públicamente a Robert Goddard el 13 de enero de 1920, afirmando que un cohete no podía funcionar en el vacío porque "no tendría nada contra qué empujar". El editorial decía que Goddard carecía de "los conocimientos que se imparten diariamente en las escuelas secundarias". El 17 de julio de 1969, un día después del lanzamiento del Apollo 11, el periódico publicó una corrección formal de 49 años de antigüedad, reconociendo que Newton tenía razón y que los cohetes sí funcionan en el vacío.',
  },
  {
    id: 'combustibles-oxidantes',
    title: 'Combustibles y Oxidantes',
    color: '#D45A5A',
    btnImage: '/assets/astrotrain/infographic_m4/btn_combustibles-oxidantes.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_combustibles-oxidantes.jpg',
    content: [
      'Un cohete necesita dos ingredientes esenciales para funcionar: un combustible y un oxidante. En la Tierra, los motores de automóvil usan la gasolina como combustible y el oxígeno del aire como oxidante. Pero en el espacio no hay aire, así que los cohetes deben llevar su propio suministro de oxidante. La combinación más utilizada en cohetes de alto rendimiento es hidrógeno líquido (LH2) como combustible y oxígeno líquido (LOX) como oxidante. El hidrógeno líquido debe mantenerse a -253°C y el oxígeno líquido a -183°C, lo que convierte el almacenamiento de estos propelentes en uno de los desafíos técnicos más complejos de la ingeniería aeroespacial.',
      'El queroseno refinado para uso aeroespacial, conocido como RP-1 (Rocket Propellant-1), es el combustible líquido más práctico para las primeras etapas de los cohetes. La combinación RP-1/LOX fue utilizada en el Saturn V, en el cohete Atlas y actualmente en los motores Merlin del Falcon 9 de SpaceX. El RP-1 tiene una densidad mucho mayor que el hidrógeno líquido, lo que permite tanques más pequeños y ligeros. El motor Merlin 1D del Falcon 9 quema 147 kilogramos de RP-1 y 340 kilogramos de LOX por segundo, generando 845 kilonewtons de empuje en el vacío. La proporción oxidante-combustible es de 2.36:1.',
      'Los propelentes hipergólicos son combinaciones químicas que se encienden espontáneamente al entrar en contacto, sin necesidad de una chispa o sistema de ignición. Las combinaciones más comunes son hidrazina (N2H4) o monometilhidrazina (MMH) con tetróxido de nitrógeno (N2O4). Estas sustancias son tóxicas y corrosivas, pero su encendido instantáneo y la posibilidad de almacenarlas a temperatura ambiente las hacen ideales para motores que deben encenderse y apagarse repetidamente, como los sistemas de maniobra de naves espaciales. Los motores de maniobra del transbordador espacial y la cápsula Dragon de SpaceX utilizan propelentes hipergólicos.',
      'Los propelentes sólidos funcionan de manera similar a los fuegos artificiales: una mezcla de combustible y oxidante se combina en un bloque sólido que arde desde el interior hacia afuera. Los boosters de combustible sólido (SRB) del transbordador espacial usaban una mezcla de perclorato de amonio como oxidante (69.6%), aluminio en polvo como combustible (16%), un polímero aglutinante (12.04%), un agente de curado (1.96%) y óxido de hierro como catalizador (0.4%). Cada SRB medía 45.4 metros, pesaba 590 toneladas y generaba 12,500 kilonewtons de empuje. Una vez encendido, un motor sólido no se puede apagar, lo cual representa tanto una simplicidad mecánica como una limitación operativa.',
      'La eficiencia de un motor cohete se mide con el impulso específico (Isp), expresado en segundos. Representa cuánto tiempo un kilogramo de propelente puede generar un newton de empuje. Los motores de combustible sólido alcanzan un Isp de unos 250 segundos. Los motores RP-1/LOX como el Merlin logran 311 segundos a nivel del mar. Los motores LH2/LOX como el RS-25 alcanzan 452 segundos en el vacío — el valor más alto entre los propelentes químicos convencionales. Los motores iónicos logran valores de Isp superiores a 3,000 segundos, pero con empujes tan bajos que solo sirven para misiones de larga duración donde la aceleración puede acumularse durante meses o años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El hidrógeno líquido es tan frío (-253°C) que congela el oxígeno del aire en contacto con las paredes del tanque, formando escarchas que caen como copos blancos durante el llenado del cohete. Es por eso que los cohetes como el Space Shuttle o el SLS parecen "sudar" en la plataforma de lanzamiento. Cada tanque externo del transbordador contenía 629,340 litros de hidrógeno líquido y 550,045 litros de oxígeno líquido, suficientes para llenar diez piscinas olímpicas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La combustión de hidrógeno y oxígeno produce solo agua pura (H2O) como producto de escape, lo que hace del LH2/LOX la combinación de propelentes más limpia. La temperatura dentro de la cámara de combustión del motor RS-25 alcanza 3,315°C, más caliente que la superficie del Sol (que es de unos 5,500°C en su fotosfera). Para evitar que el motor se funda, se usa un sistema de enfriamiento regenerativo donde el hidrógeno líquido circula por canales alrededor de la tobera antes de entrar en la cámara.' },
    ],
    fact: 'John D. Clark, químico que trabajó en el desarrollo de propelentes durante la Guerra Fría, escribió en su libro "Ignition!" (1972) que el trifluoruro de cloro (ClF3) es tan reactivo que enciende arena, vidrio, agua y a los propios ingenieros que lo manipulan. En un incidente en los años 1950, un derrame de 900 kilogramos de ClF3 disolvió 30 centímetros de concreto y 90 centímetros de grava antes de detenerse. Clark concluyó que era "probablemente el químico más vigorizante que existe" y que no era práctico como propelente de cohetes.',
  },
  {
    id: 'etapas-cohete',
    title: 'Etapas del Cohete',
    color: '#96A3AE',
    btnImage: '/assets/astrotrain/infographic_m4/btn_etapas-cohete.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_etapas-cohete.jpg',
    content: [
      'La idea de construir cohetes en etapas separadas que se descartan durante el vuelo fue propuesta por primera vez por el matemático ruso Konstantín Tsiolkovsky en 1903, en su artículo "La exploración del espacio cósmico por medio de aparatos de reacción". Tsiolkovsky demostró matemáticamente que un cohete de una sola etapa no podía alcanzar la velocidad necesaria para llegar a órbita terrestre. Su solución fue un "tren de cohetes": múltiples cohetes apilados donde cada etapa se enciende cuando la anterior agota su combustible y se separa. Esta idea fue la base conceptual de todos los vehículos de lanzamiento que existen hoy.',
      'La ecuación de Tsiolkovsky describe la relación entre la velocidad final de un cohete, la velocidad de escape de los gases y la proporción entre la masa inicial (con combustible) y la masa final (sin combustible). La ecuación es: Δv = ve × ln(mi/mf), donde Δv es el cambio de velocidad, ve es la velocidad de escape, mi es la masa inicial y mf la masa final. Para alcanzar órbita baja terrestre se necesitan aproximadamente 9,400 m/s de Δv. Dado que los mejores propelentes químicos expulsan gases a unos 4,400 m/s, un cohete de una sola etapa necesitaría que más del 88% de su masa fuera combustible, dejando apenas un 12% para estructura y carga útil.',
      'Un cohete de dos etapas resuelve el problema de la "tiranía de la ecuación del cohete". Cuando la primera etapa agota su combustible y se separa, el cohete descarta toda esa estructura vacía — tanques, motores y armazón — que ya no sirve y solo añade peso muerto. La segunda etapa entonces enciende sus motores propulsando una masa mucho menor. Es como correr una carrera cargando una mochila pesada y poder tirarla a la mitad del recorrido: inmediatamente corres más rápido con menos esfuerzo. El Saturn V usaba tres etapas: la S-IC con cinco motores F-1, la S-II con cinco motores J-2, y la S-IVB con un motor J-2.',
      'La fracción de carga útil es el porcentaje de la masa total del cohete que llega realmente a órbita. Para la mayoría de los cohetes modernos, esta fracción es sorprendentemente baja: entre el 2% y el 4%. El Falcon 9 de SpaceX, con una masa al despegue de 549 toneladas, puede colocar 22.8 toneladas en órbita baja terrestre — apenas el 4.15% de su masa total. El Saturn V era aún menos eficiente en proporción: sus 2,970 toneladas al despegue colocaban 140 toneladas en órbita baja, un 4.7%. En misiones a la Luna, solo 47 toneladas (1.58%) llegaban a trayectoria translunar.',
      'Los vehículos de lanzamiento modernos utilizan diferentes configuraciones de etapas. El Falcon 9 usa dos etapas de propelente líquido. El Space Launch System (SLS) combina una etapa central de hidrógeno líquido con dos boosters sólidos laterales. El Ariane 5 europeo usaba una configuración similar al SLS. El cohete Electron de Rocket Lab, diseñado para satélites pequeños, usa dos etapas con motores eléctricos de bomba de turbina, una innovación que reemplaza las pesadas turbobombas convencionales con motores eléctricos alimentados por baterías de litio. Cada diseño representa una solución de ingeniería diferente al mismo problema fundamental que Tsiolkovsky identificó en 1903.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Konstantín Tsiolkovsky era casi completamente sordo desde los 10 años, cuando una escarlatina dañó su audición. Nunca asistió a la universidad y fue autodidacta en matemáticas y física. Trabajó como profesor de escuela en una pequeña ciudad rusa mientras desarrollaba sus teorías de vuelo espacial. Calculó la velocidad orbital, diseñó estaciones espaciales, propuso el uso de oxígeno e hidrógeno líquidos como propelentes y describió esclusas de aire — todo esto décadas antes de que el primer cohete volara.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La "tiranía de la ecuación del cohete" explica por qué es tan difícil llegar al espacio. Para alcanzar órbita terrestre baja (LEO) a unos 400 km de altitud, un cohete necesita alcanzar aproximadamente 7,800 m/s de velocidad orbital, más unos 1,500 m/s adicionales para superar la resistencia del aire y las pérdidas gravitacionales, totalizando unos 9,400 m/s de Δv. Con los mejores combustibles químicos, esto significa que entre el 85% y el 90% de la masa del cohete al despegue debe ser combustible.' },
    ],
    fact: 'La separación de etapas es uno de los momentos más críticos de cualquier vuelo espacial. En el Saturn V, la separación entre la primera y segunda etapas involucraba ocho pequeños cohetes de retroceso que frenaban la etapa gastada, seguidos por ocho cohetes de separación que empujaban la segunda etapa hacia adelante. Todo el proceso tomaba solo 1.2 segundos y los motores de la segunda etapa se encendían mientras aún estaban parcialmente conectados. Un fallo en esta secuencia habría significado la pérdida de la misión y potencialmente de la tripulación.',
  },
  {
    id: 'el-lanzamiento',
    title: 'El Lanzamiento',
    color: '#B43A3A',
    btnImage: '/assets/astrotrain/infographic_m4/btn_el-lanzamiento.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_el-lanzamiento.jpg',
    content: [
      'La cuenta regresiva de un lanzamiento espacial no es simplemente contar hacia atrás desde diez. Es un procedimiento técnico detallado que puede durar más de 40 horas para cohetes grandes. La cuenta regresiva del Saturn V comenzaba 28 horas antes del lanzamiento (T-28:00:00) con la activación de los sistemas eléctricos. Incluía pausas programadas llamadas "holds" para verificaciones críticas. La cuenta del Falcon 9 de SpaceX es más corta: comienza a T-38 minutos para la secuencia automatizada final. A T-35 minutos se inicia la carga de LOX en la primera etapa. A T-16 minutos se carga el LOX en la segunda etapa. A T-1 minuto el ordenador de vuelo toma el control.',
      'Los últimos 10 segundos antes del lanzamiento son los más tensos. En el Falcon 9, a T-3 segundos los nueve motores Merlin se encienden en una secuencia escalonada, uno cada 70 milisegundos, para verificar que cada motor alcanza su empuje nominal. Si un motor falla, el ordenador puede abortar la misión automáticamente antes de soltar las abrazaderas de sujeción. Solo cuando los nueve motores funcionan correctamente y el empuje total alcanza 7,600 kilonewtons, las abrazaderas se liberan a T-0 y el cohete comienza a ascender. Todo este proceso ocurre más rápido de lo que un ser humano podría decidir — la computadora toma decisiones en milisegundos.',
      'Max-Q es el punto durante el ascenso donde la presión aerodinámica sobre el cohete alcanza su valor máximo. Ocurre típicamente entre los 60 y 80 segundos después del lanzamiento, a una altitud de 11 a 14 kilómetros. En ese momento, el cohete viaja suficientemente rápido para que la resistencia del aire sea máxima, pero aún no ha salido de la parte densa de la atmósfera. Para el Falcon 9, Max-Q ocurre a unos 80 segundos, cuando el cohete viaja a aproximadamente 1,600 km/h. Los motores se reducen en potencia durante este período para limitar la carga estructural, y se aumentan de nuevo una vez que la presión disminuye.',
      'Las fuerzas G que experimentan los astronautas durante el lanzamiento son un desafío físico serio. Un lanzamiento en Soyuz somete a la tripulación a entre 3.5 y 4 G durante la separación de etapas — cada astronauta siente como si pesara cuatro veces su peso normal. En el transbordador espacial, los astronautas experimentaban un máximo de 3 G. Los astronautas del Apollo 11 soportaron picos de 4 G durante 6 minutos. Para prepararse, los astronautas se entrenan en centrífugas que pueden generar hasta 8 G, donde practican mantener la consciencia y operar controles mientras su sangre lucha contra la fuerza centrípeta para llegar al cerebro.',
      'Los sistemas de escape de emergencia (Launch Escape Systems o LES) están diseñados para salvar la vida de la tripulación si algo sale mal durante el lanzamiento. La torre de escape del Apollo pesaba 4 toneladas y podía arrancar la cápsula del cohete en llamas en 3 segundos, alejándola a 1.2 km de distancia. El sistema SuperDraco de la cápsula Crew Dragon de SpaceX integra 8 motores hipergólicos en las paredes de la cápsula, capaces de generar 73 kilonewtons de empuje cada uno. En enero de 2020, SpaceX realizó una prueba de aborto en vuelo exitosa donde la Dragon se separó de un Falcon 9 a Max-Q, demostrando que los astronautas sobrevivirían una explosión del cohete durante la fase más peligrosa del ascenso.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La expresión "T minus" significa "tiempo menos". T-0 es el momento del lanzamiento. Los números negativos indican tiempo antes del despegue (T-10 = 10 segundos antes) y los positivos indican tiempo después (T+120 = 2 minutos después del lanzamiento). Esta nomenclatura fue inventada en 1929 por Fritz Lang para su película "La mujer en la Luna" (Frau im Mond). La NASA adoptó el sistema porque resultaba claro y evitaba confusiones durante las secuencias de lanzamiento.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los supresores de sonido en la plataforma de lanzamiento inyectan aproximadamente 1.1 millones de litros de agua sobre la plataforma durante el lanzamiento del SLS. El agua no es para apagar incendios — es para amortiguar las ondas sonoras. El ruido de un cohete puede alcanzar 180 decibelios, suficiente para destruir estructuras y dañar al propio cohete por vibración acústica. El sistema se activa 6.6 segundos antes del encendido de motores y descarga 3,785 litros por segundo durante 40 segundos.' },
    ],
    fact: 'El desastre del transbordador Challenger el 28 de enero de 1986 ocurrió 73 segundos después del despegue, cuando una junta tórica (O-ring) en el booster sólido derecho falló a -0.5°C, una temperatura fuera de su rango certificado de operación. Los gases calientes escaparon y perforaron el tanque externo de hidrógeno, causando la desintegración del vehículo a 14.6 km de altitud. Los siete miembros de la tripulación fallecieron. La investigación posterior, liderada por el físico Richard Feynman, demostró que las juntas perdían elasticidad bajo los 11°C.',
  },
  {
    id: 'cohetes-reutilizables',
    title: 'Cohetes Reutilizables',
    color: '#8491A0',
    btnImage: '/assets/astrotrain/infographic_m4/btn_cohetes-reutilizables.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_cohetes-reutilizables.jpg',
    content: [
      'Hasta 2015, todos los cohetes orbitales eran desechables: volaban una vez y terminaban en el fondo del océano o se desintegraban en la atmósfera. Era como construir un avión Boeing 747 de 350 millones de dólares para un solo vuelo y tirarlo después de aterrizar. El costo de un lanzamiento del Falcon 9 desechable era de unos 62 millones de dólares. SpaceX calculó que el combustible representaba solo el 0.3% de ese costo — unos 200,000 dólares. El 99.7% restante era el hardware que se destruía tras cada vuelo. Reutilizar el cohete significaba convertir un gasto de capital en un costo operativo.',
      'El 21 de diciembre de 2015, SpaceX logró por primera vez aterrizar la primera etapa de un Falcon 9 en tierra, en la zona de aterrizaje LZ-1 del Centro Espacial Kennedy. Cuatro meses después, el 8 de abril de 2016, aterrizó una primera etapa sobre la barcaza autónoma "Of Course I Still Love You" en el océano Atlántico. Para 2025, SpaceX ha aterrizado y reutilizado primeras etapas más de 300 veces. Un booster individual, el B1058, ha volado 23 veces. El aterrizaje requiere que la etapa realice tres encendidos de motores durante el regreso: el "boostback burn" para invertir la trayectoria, el "entry burn" para frenar al reingresar a la atmósfera y el "landing burn" final.',
      'La reutilización ha reducido el costo del acceso al espacio de manera sustancial. Un lanzamiento de Falcon 9 con booster reutilizado cuesta aproximadamente 67 millones de dólares en el mercado comercial, aunque el costo interno de SpaceX es considerablemente menor. Para comparar: un lanzamiento del transbordador espacial costaba aproximadamente 450 millones de dólares por misión (ajustado a dólares de 2020), un Delta IV Heavy cuesta unos 350 millones y un Ariane 5 costaba entre 165 y 220 millones. La reducción de costos ha permitido que más países, universidades y empresas accedan al espacio por primera vez.',
      'El cohete Starship de SpaceX, en desarrollo activo, busca llevar la reutilización al siguiente nivel. Con 121 metros de altura y la capacidad de colocar hasta 150 toneladas en órbita baja terrestre, Starship está diseñado para ser completamente reutilizable — tanto la primera etapa (Super Heavy) como la etapa superior (Starship) regresan y aterrizan. Super Heavy usa 33 motores Raptor que queman metano líquido y oxígeno líquido, generando 74,000 kilonewtons de empuje al despegue. El objetivo de SpaceX es lograr tiempos de rotación de horas entre vuelos, similar a como operan los aviones comerciales.',
      'SpaceX no es la única empresa que trabaja en cohetes reutilizables. Rocket Lab desarrolló un sistema para recuperar la primera etapa de su cohete Electron usando paracaídas y captura con helicóptero. Blue Origin, fundada por Jeff Bezos, ha desarrollado el cohete New Shepard (suborbital) con aterrizaje vertical desde 2015 y trabaja en el New Glenn orbital. La ESA investiga el programa Themis para un demostrador de etapa reutilizable. China ha probado prototipos de aterrizaje vertical con sus cohetes de la familia Larga Marcha. La reutilización se ha convertido en el estándar al que aspira toda la industria espacial global.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los nombres de las barcazas de aterrizaje de SpaceX son referencias a la serie de ciencia ficción "La Cultura" del escritor escocés Iain M. Banks. Las dos barcazas del Atlántico se llaman "Just Read the Instructions" y "Of Course I Still Love You", nombres de naves espaciales inteligentes en las novelas de Banks. La barcaza del Pacífico se llama "A Shortfall of Gravitas". Las barcazas son plataformas autónomas controladas por GPS que se posicionan con precisión de un metro en el océano.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El motor Raptor de SpaceX utiliza un ciclo de combustión de flujo completo (full-flow staged combustion), donde tanto el combustible como el oxidante son gasificados antes de entrar en la cámara de combustión principal. Solo dos motores han logrado esto antes: el RD-270 soviético (nunca voló) y el prototipo IPD del programa integrado de cohetes de los años 1960. El Raptor opera a una presión de cámara de 300 bar, la más alta de cualquier motor cohete operacional, lo que maximiza la eficiencia termodinámica.' },
    ],
    fact: 'El transbordador espacial (1981-2011) fue el primer intento de crear un vehículo de lanzamiento parcialmente reutilizable. Los orbitadores volaron un promedio de 33 veces cada uno, y los boosters sólidos se recuperaban del océano y se reacondicionaban. Sin embargo, la reutilización no ahorró dinero — cada vuelo costaba unos 450 millones de dólares porque el reacondicionamiento era extremadamente laborioso. Las 14,000 losetas térmicas del orbitador debían inspeccionarse individualmente después de cada vuelo. SpaceX demostró que la reutilización solo funciona si el diseño se concibe desde el principio para ser reutilizado.',
  },
  {
    id: 'propulsion-futuro',
    title: 'Propulsión del Futuro',
    color: '#E46A6A',
    btnImage: '/assets/astrotrain/infographic_m4/btn_propulsion-futuro.jpg',
    image: '/assets/astrotrain/infographic_m4/hero_propulsion-futuro.jpg',
    content: [
      'Los motores iónicos representan una tecnología de propulsión que ya está en uso pero que promete expandirse en las próximas décadas. En lugar de quemar combustible, un motor iónico usa electricidad para ionizar un gas noble como el xenón y acelerarlo mediante campos electromagnéticos a velocidades de 30,000 a 50,000 m/s — diez veces más rápido que los mejores motores químicos. La sonda Dawn de la NASA usó motores iónicos para visitar el asteroide Vesta (2011) y el planeta enano Ceres (2015), algo que habría sido imposible con propulsión química convencional dado el presupuesto de combustible disponible. El empuje es minúsculo — unos 90 milinewtons, equivalente al peso de una hoja de papel — pero opera durante meses continuos.',
      'Las velas solares aprovechan la presión de radiación de la luz solar para propulsar una nave sin ningún tipo de combustible. Los fotones, aunque no tienen masa, transportan momento y ejercen una presión diminuta al rebotar en una superficie reflectante. La misión IKAROS de JAXA, lanzada en 2010, fue la primera nave en demostrar la propulsión por vela solar en el espacio interplanetario. Su vela medía 14 metros de diagonal y era más delgada que un cabello humano (7.5 micrómetros). La Planetary Society lanzó LightSail 2 en 2019, que elevó su órbita usando solo luz solar durante más de tres años. Una vela solar suficientemente grande podría acelerar una sonda a velocidades que ningún motor químico alcanzaría.',
      'La propulsión nuclear térmica (NTP) utiliza un reactor nuclear para calentar hidrógeno gaseoso a temperaturas de 2,500°C y expulsarlo por una tobera a velocidades de 8,500 m/s — casi el doble que los mejores motores químicos. La NASA probó esta tecnología en el programa NERVA entre 1964 y 1972, realizando pruebas exitosas de motores nucleares que funcionaban durante más de una hora. El programa fue cancelado por recortes presupuestarios, no por fallos técnicos. En 2023, la NASA y DARPA anunciaron el programa DRACO para desarrollar un cohete nuclear térmico funcional para la década de 2030, lo que reduciría el tiempo de viaje a Marte de 9 meses a aproximadamente 4 meses.',
      'El Proyecto Orion (1958-1965) fue una propuesta para propulsar una nave espacial usando explosiones nucleares controladas. Diseñado por el físico Freeman Dyson y un equipo de científicos en General Atomics, la nave habría expulsado pequeñas bombas nucleares detrás de una placa de empuje masiva. Cada detonación aceleraría la nave un poco más. Los cálculos demostraban que una nave Orion de 4,000 toneladas podría alcanzar Marte en semanas y Saturno en meses. El Tratado de Prohibición Parcial de Ensayos Nucleares de 1963 efectivamente terminó el proyecto, aunque la física detrás del concepto sigue siendo válida.',
      'La propulsión por antimateria es la más energética teóricamente posible. Cuando la materia y la antimateria se encuentran, se aniquilan mutuamente y el 100% de su masa se convierte en energía según E=mc². Para comparar, la fisión nuclear convierte solo el 0.1% de la masa en energía y la fusión nuclear el 0.7%. Un gramo de antimateria aniquilándose con un gramo de materia liberaría tanta energía como 43 kilotones de TNT. El problema es producirla: el CERN en Ginebra produce unos 10 nanogramos de antimateria por año, y cada gramo costaría unos 62.5 billones de dólares. Para una misión a Marte se necesitarían unos 10 miligramos, que tardarían un millón de años en producir con la tecnología actual.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Freeman Dyson, el físico que trabajó en el Proyecto Orion, calculó que una versión grande de la nave (de 400,000 toneladas) podría alcanzar el 3.3% de la velocidad de la luz y llegar a la estrella más cercana, Alpha Centauri, en unos 133 años. Dyson consideró Orion "el mejor uso que podría dársele a las armas nucleares" y lamentó hasta el final de su vida que el proyecto fuera cancelado. Dijo: "El Proyecto Orion murió no porque la idea fuera mala, sino porque políticamente era inaceptable."' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Breakthrough Starshot Initiative, financiada por el empresario Yuri Milner con 100 millones de dólares, propone enviar miles de "nanobots" de un gramo cada uno a Alpha Centauri usando velas solares de 4 metros impulsadas por un láser terrestre de 100 gigavatios. Las nanosondas alcanzarían el 20% de la velocidad de la luz y llegarían a Alpha Centauri en unos 20 años. Las señales de radio tardarían 4.37 años adicionales en regresar a la Tierra. Si funciona, sería la primera misión interestelar de la humanidad.' },
    ],
    fact: 'El motor EM Drive, propuesto por el ingeniero británico Roger Shawyer en 2001, afirmaba generar empuje sin expulsar masa — violando aparentemente la conservación del momento. Múltiples laboratorios, incluido el Eagleworks de la NASA, reportaron mediciones de empuje diminutas. Sin embargo, estudios más rigurosos realizados por la Universidad Técnica de Dresde en 2021 determinaron que el empuje medido se debía a efectos térmicos y electromagnéticos en el equipo de medición, no a un efecto de propulsión real. El EM Drive no funciona y la Tercera Ley de Newton se mantiene inviolada.',
  },
];

// ——— Rocket Exhaust Particle Field (Canvas Background) ——————————————————
function RocketParticleField() {
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
      hue: Math.random() > 0.5 ? '196,75,75' : '168,181,192', // mission red or space silver
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

// ——— Rocket Propulsion Header ——————————————————————————————————————————
function RocketHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,75,75,0.3))' }}>
        {/* Trajectory arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#rocketGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 stage markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C44B4B','#A8B5C0','#D45A5A','#96A3AE','#B43A3A','#8491A0','#E46A6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central rocket icon */}
        <path d="M300 18 L294 34 L296 40 L300 43 L304 40 L306 34 Z" fill="none" stroke="#C44B4B" strokeWidth="1.5" opacity="0.6" />
        <path d="M297 43 Q300 50 303 43" fill="#C44B4B" opacity="0.4" />
        <defs>
          <linearGradient id="rocketGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(196,75,75,0.2)" />
            <stop offset="50%" stopColor="rgba(196,75,75,0.9)" />
            <stop offset="100%" stopColor="rgba(196,75,75,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C44B4B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COHETES Y PROPULSIÓN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(196,75,75,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DEL VUELO ESPACIAL</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ———————————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(196,75,75,0.2)'}`,
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
          layoutId="activeDotAstroTrainM4"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ——————————————————————————————————————
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

        {/* ——— Conditional Video Render ——— */}
        {node.video && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <VideoPlayer
              src={node.video.src}
              title={node.video.title}
              color={node.color}
              poster={node.video.poster}
            />
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
      border: '1px solid rgba(196,75,75,0.15)',
    }}>
      <Star size={14} style={{ color: '#C44B4B', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C44B4B, #A8B5C0)', borderRadius: '3px', boxShadow: '0 0 8px rgba(196,75,75,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C44B4B', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————
export default function InteractiveInfographic_AstroTrainM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(25,10,15,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/astrotrain/astrotrain_m4.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(196,75,75,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <RocketParticleField />

      <RocketHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(196,75,75,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(196,75,75,0.08)', borderRadius: '16px',
              border: '1px solid rgba(196,75,75,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C44B4B', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🚀 ¡Has dominado los secretos de Cohetes y Propulsión!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Ingeniero de Propulsión
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
