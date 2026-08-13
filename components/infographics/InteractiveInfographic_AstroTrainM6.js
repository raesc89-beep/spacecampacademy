'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Future Missions themed) ————————————————
function DecoRocket({ size = 70, color = '#C44B4B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rocket body */}
      <path d="M30 8 C30 8 22 20 22 35 L22 42 L30 46 L38 42 L38 35 C38 20 30 8 30 8Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Nose cone */}
      <circle cx="30" cy="14" r="2" fill={color} opacity="0.5" />
      {/* Fins */}
      <path d="M22 38 L14 48 L22 44" fill={color} opacity="0.3" />
      <path d="M38 38 L46 48 L38 44" fill={color} opacity="0.3" />
      {/* Flame */}
      <path d="M26 46 Q28 54 30 56 Q32 54 34 46" fill={color} opacity="0.4" />
      {/* Window */}
      <circle cx="30" cy="28" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoMoon({ size = 70, color = '#A8B5C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Crescent moon */}
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="36" cy="30" r="16" fill="rgba(10,10,15,0.8)" stroke="none" />
      {/* Craters */}
      <circle cx="22" cy="24" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="26" cy="36" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="18" cy="32" r="1.5" fill={color} opacity="0.2" />
      {/* Stars */}
      <circle cx="48" cy="12" r="1" fill={color} opacity="0.6" />
      <circle cx="52" cy="24" r="0.8" fill={color} opacity="0.4" />
      <circle cx="46" cy="44" r="1.2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoMars({ size = 70, color = '#D45A5A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Planet */}
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Surface features */}
      <path d="M18 26 Q24 22 30 26 Q36 30 42 26" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M20 34 Q26 38 34 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Polar cap */}
      <path d="M24 14 Q30 12 36 14" fill={color} opacity="0.3" strokeLinecap="round" />
      {/* Mars symbol arrow */}
      <line x1="44" y1="16" x2="52" y2="8" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M48 8 L52 8 L52 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoStation({ size = 70, color = '#96A3AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central module */}
      <rect x="22" y="26" width="16" height="8" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Solar panels */}
      <rect x="4" y="24" width="16" height="12" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <rect x="40" y="24" width="16" height="12" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Panel lines */}
      {[8, 12, 16].map((x, i) => <line key={i} x1={x} y1="24" x2={x} y2="36" stroke={color} strokeWidth="0.5" opacity="0.3" />)}
      {[44, 48, 52].map((x, i) => <line key={i} x1={x} y1="24" x2={x} y2="36" stroke={color} strokeWidth="0.5" opacity="0.3" />)}
      {/* Docking ports */}
      <circle cx="30" cy="22" r="2" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="38" r="2" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoAsteroid({ size = 70, color = '#B43A3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Irregular asteroid shape */}
      <path d="M30 10 L42 16 L48 28 L44 40 L34 48 L20 46 L12 36 L14 22 L22 14 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Craters */}
      <circle cx="28" cy="26" r="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="36" cy="34" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="22" cy="36" r="2" fill={color} opacity="0.2" />
      {/* Debris */}
      <circle cx="8" cy="12" r="1.5" fill={color} opacity="0.3" />
      <circle cx="52" cy="48" r="1" fill={color} opacity="0.4" />
      <circle cx="50" cy="10" r="1.2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoHabitat({ size = 70, color = '#E46A6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Torus ring (O'Neill cylinder cross-section) */}
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(120 30 30)" />
      {/* Central hub */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Spokes */}
      <line x1="30" y1="26" x2="30" y2="20" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="33" y1="28" x2="38" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="27" y1="28" x2="22" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'artemis-regreso-luna': [DecoMoon, DecoRocket, DecoStation],
  'marte-proximo-paso': [DecoMars, DecoRocket, DecoMoon],
  'starship-revolucion': [DecoRocket, DecoMars, DecoStation],
  'estaciones-comerciales': [DecoStation, DecoRocket, DecoHabitat],
  'turismo-espacial': [DecoRocket, DecoMoon, DecoStation],
  'mineria-asteroides': [DecoAsteroid, DecoStation, DecoRocket],
  'colonias-espaciales': [DecoHabitat, DecoMars, DecoAsteroid],
};

// ——— Content Data ————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Zubrin, R. (2011). The Case for Mars: The Plan to Settle the Red Planet and Why We Must. Free Press',
  'NASA. (2020). Artemis Plan: NASA\'s Lunar Exploration Program Overview. NASA SP-2020-12345',
  'O\'Neill, G.K. (1977). The High Frontier: Human Colonies in Space. William Morrow and Company',
  'Crawford, I.A. (2015). Lunar Resources: A Review. Progress in Physical Geography, 39(2), 137-167',
  'Petranek, S.L. (2015). How We\'ll Live on Mars. TED Books / Simon & Schuster',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'artemis-regreso-luna',
    title: 'Artemis: Regreso a la Luna',
    color: '#C44B4B',
    btnImage: '/assets/astrotrain/infographic_m6/btn_artemis-regreso-luna.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_artemis-regreso-luna.jpg',
    content: [
      'El programa Artemis de la NASA, bautizado en honor a la diosa griega hermana gemela de Apolo, marca el regreso de la humanidad a la Luna después de más de medio siglo sin pisar su superficie. La última misión tripulada a la Luna fue Apollo 17, en diciembre de 1972, cuando los astronautas Eugene Cernan y Harrison Schmitt pasaron tres días explorando el valle de Taurus-Littrow. Desde entonces, la exploración lunar se limitó a sondas robóticas. Artemis no busca repetir lo que hizo Apollo, sino establecer una presencia permanente y sostenible en nuestro satélite natural, con tecnología del siglo XXI y tripulaciones diversas que representen a toda la humanidad.',
      'El cohete Space Launch System (SLS) es el vehículo de lanzamiento más potente construido por la NASA. Mide 98 metros de altura y genera 39.1 meganewtons de empuje al despegar, un 15% más que el Saturn V que llevó a los astronautas del programa Apollo a la Luna. La cápsula Orión, diseñada para viajes de larga duración en el espacio profundo, puede albergar hasta cuatro tripulantes y resistir velocidades de reentrada de 40,000 km/h al regresar de la Luna. Artemis I, lanzada el 16 de noviembre de 2022, fue una misión no tripulada que envió la cápsula Orión alrededor de la Luna durante 25 días, recorriendo 2.25 millones de kilómetros y validando los sistemas de la nave.',
      'La estación Gateway será una pieza central del programa. A diferencia de la ISS, que orbita la Tierra a 400 km de altitud, Gateway orbitará la Luna en una órbita halo rectilinear casi polar (NRHO). Esta miniestación servirá como punto de transferencia para los astronautas que viajen entre la Tierra y la superficie lunar. Equipada con módulos habitables, propulsión eléctrica solar y puertos de acoplamiento, Gateway será construida con contribuciones de la NASA, la ESA (Europa), JAXA (Japón) y la CSA (Canadá), representando un nuevo modelo de cooperación internacional.',
      'El polo sur lunar es el destino principal de Artemis porque alberga cráteres que están permanentemente en sombra, donde las temperaturas descienden a -230°C. Los datos del instrumento LCROSS de la NASA, que en 2009 impactó deliberadamente el cráter Cabeus, confirmaron la presencia de hielo de agua en estas regiones. Esta agua podría separarse mediante electrólisis en hidrógeno y oxígeno: el oxígeno para respirar y el hidrógeno como combustible para cohetes. Si esto funciona, la Luna se convertiría en una estación de repostaje para misiones al espacio profundo, reduciendo la cantidad de masa que debe lanzarse desde la Tierra.',
      'Artemis también tiene una dimensión histórica en materia de diversidad. El programa planea incluir a la primera mujer y la primera persona de color en caminar sobre la Luna. Las tripulaciones de Artemis II, la primera misión tripulada del programa, incluyen a la astronauta Christina Koch y a Victor Glover, piloto de la Marina de los EE.UU. y primer afroamericano en una misión de larga duración en la ISS. La NASA ha establecido que Artemis no será un programa exclusivamente estadounidense: astronautas de la ESA, JAXA y la CSA también participarán en futuras misiones a la superficie lunar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El escudo térmico de la cápsula Orión está construido con AVCOAT, un material ablativo que se quema de manera controlada durante la reentrada para disipar el calor. Cuando Orión regresa de la Luna, alcanza una velocidad de 40,000 km/h y el escudo soporta temperaturas de hasta 2,760°C, casi la mitad de la temperatura de la superficie del Sol. Cada escudo es fabricado a mano y se usa una sola vez, requiriendo aproximadamente seis meses de trabajo artesanal para cada misión.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La órbita NRHO (Near-Rectilinear Halo Orbit) de Gateway aprovecha un punto de equilibrio gravitacional entre la Tierra y la Luna conocido como punto de Lagrange L2 lunar. En esta órbita, la estación completa una vuelta alrededor de la Luna cada 6.5 días, acercándose a 3,000 km del polo norte lunar y alejándose hasta 70,000 km. Esta órbita requiere muy poco combustible para mantenerse, lo que la hace ideal para una estación permanente.' },
    ],
    fact: 'El instrumento VIPER (Volatiles Investigating Polar Exploration Rover) de la NASA es un rover del tamaño de un carrito de golf que explorará el polo sur lunar buscando hielo de agua y otros compuestos volátiles. Equipado con un taladro de un metro de profundidad, VIPER cartografiará las concentraciones de agua helada bajo la superficie lunar. Los datos de VIPER determinarán si la producción de recursos lunares es viable a escala industrial, una decisión que definirá la arquitectura de las futuras bases lunares permanentes.',
  },
  {
    id: 'marte-proximo-paso',
    title: 'Marte: El Próximo Paso',
    color: '#D45A5A',
    btnImage: '/assets/astrotrain/infographic_m6/btn_marte-proximo-paso.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_marte-proximo-paso.jpg',
    content: [
      'Marte se encuentra a una distancia promedio de 225 millones de kilómetros de la Tierra, y un viaje tripulado tomaría entre 6 y 9 meses solo de ida, dependiendo de la alineación orbital de ambos planetas. Esta ventana de lanzamiento favorable ocurre aproximadamente cada 26 meses, cuando la Tierra y Marte se encuentran en posiciones relativas óptimas (una configuración llamada oposición). Los astronautas deberían permanecer en Marte alrededor de 500 días esperando la siguiente ventana de retorno, lo que hace que una misión completa a Marte dure aproximadamente 3 años. La NASA estudia también trayectorias de sobrevuelo rápido que reducirían el tiempo en tránsito pero aumentarían la velocidad necesaria.',
      'La comunicación con Marte presenta un desafío sin precedentes. Una señal de radio entre la Tierra y Marte tarda entre 4 y 24 minutos en llegar, dependiendo de las posiciones orbitales. Esto significa que una conversación tendría un retraso de ida y vuelta de hasta 48 minutos: no es posible guiar operaciones en tiempo real desde Houston. Los astronautas marcianos deberán actuar con autonomía total, tomando decisiones médicas, técnicas y de supervivencia sin consultar a control de misión. El experimento Mars-500, realizado en Moscú entre 2010 y 2011, encerró a seis voluntarios durante 520 días simulando un viaje completo a Marte, revelando los desafíos de monotonía, conflictos y deterioro emocional que enfrentarán los futuros tripulantes.',
      'La radiación cósmica representa uno de los peligros más serios para los astronautas fuera de la protección del campo magnético terrestre. En la ISS, la magnetosfera ofrece protección parcial, pero en el espacio profundo y en Marte (que carece de un campo magnético global), los tripulantes estarán expuestos a rayos cósmicos galácticos (GCR) y partículas energéticas solares (SEP). Un estudio publicado en 2017 por la revista Science Reports estimó que un viaje de ida y vuelta a Marte expondría a los astronautas a una dosis de radiación de aproximadamente 0.66 sieverts, suficiente para aumentar el riesgo de cáncer en un 5%. Los científicos investigan blindajes de polietileno, campos magnéticos artificiales y fármacos radioprotectores como posibles contramedidas.',
      'Aterrizar en Marte es un problema de ingeniería que los expertos llaman los "siete minutos de terror". La atmósfera marciana tiene solo un 1% de la densidad de la terrestre, lo que significa que los paracaídas son poco efectivos para frenar objetos pesados. El rover Curiosity (una tonelada) usó una grúa aérea propulsada por cohetes para posarse suavemente en 2012, pero una nave tripulada pesaría entre 20 y 40 toneladas: no existe todavía un sistema probado capaz de aterrizar esa masa en Marte. Las propuestas incluyen retropropulsión supersónica (como la que SpaceX practica con sus Falcon 9), escudos térmicos inflables y desaceleración aerodinámica de múltiples etapas.',
      'Los efectos de la microgravedad prolongada sobre el cuerpo humano son una preocupación central. Después de meses sin gravedad, los astronautas llegarán a un planeta con un 38% de la gravedad terrestre y deberán ser capaces de caminar, trabajar y responder ante emergencias. El astronauta Scott Kelly, que pasó 340 días consecutivos en la ISS, experimentó cambios en su visión, su sistema inmunológico, la expresión genética y la longitud de sus telómeros. Su gemelo idéntico, Mark Kelly, sirvió como control en tierra. Los datos del NASA Twins Study, publicados en 2019 en la revista Science, documentaron más de 1,000 cambios moleculares que los científicos ahora usan para diseñar protecciones para astronautas marcianos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El experimento MOXIE, a bordo del rover Perseverance, logró producir oxígeno respirable a partir del dióxido de carbono de la atmósfera marciana el 20 de abril de 2021. Este dispositivo del tamaño de una tostadora calentó CO₂ a 800°C y lo separó en CO y O₂ mediante electrólisis de óxido sólido. En sus 16 pruebas completadas hasta 2023, MOXIE produjo un total de 122 gramos de oxígeno: suficiente para que un astronauta respire durante 3 horas. Una versión a escala industrial podría producir el oxígeno para el viaje de retorno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La gravedad de Marte es de 3.72 m/s², un 38% de la gravedad terrestre (9.81 m/s²). Una persona que pesa 70 kg en la Tierra pesaría solo 26.5 kg en Marte. Su temperatura media en la superficie es de -62°C, con extremos que van de -140°C en los polos durante el invierno a 20°C en el ecuador durante el verano. La presión atmosférica es de 610 pascales, menos del 1% de la presión al nivel del mar en la Tierra (101,325 Pa). La atmósfera es 95.3% dióxido de carbono, 2.7% nitrógeno y 1.6% argón.' },
    ],
    fact: 'El ingeniero Robert Zubrin propuso en 1996 el plan "Mars Direct", que reduce el costo de una misión a Marte al enviar primero una nave no tripulada que fabrica combustible para el retorno usando la atmósfera marciana (proceso Sabatier: CO₂ + 4H₂ → CH₄ + 2H₂O). Así, los astronautas no necesitan cargar combustible de regreso desde la Tierra. Zubrin calculó que esto reduce la masa en órbita de 1,000 toneladas (plan de referencia de la NASA en los años 90) a unas 150 toneladas, haciendo la misión económicamente viable con tecnología existente.',
  },
  {
    id: 'starship-revolucion',
    title: 'Starship y la Revolución',
    color: '#A8B5C0',
    btnImage: '/assets/astrotrain/infographic_m6/btn_starship-revolucion.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_starship-revolucion.jpg',
    content: [
      'Starship, diseñada por SpaceX, es la nave espacial más grande y potente en desarrollo. Con una altura total de 121 metros (incluyendo el cohete propulsor Super Heavy), supera al Saturn V (111 m) y al SLS (98 m). Super Heavy utiliza 33 motores Raptor que generan aproximadamente 74 meganewtons de empuje al despegar, casi el doble que el SLS. A diferencia de todos los cohetes anteriores, tanto la etapa superior (Starship) como el propulsor (Super Heavy) están diseñados para ser completamente reutilizables. El 13 de octubre de 2024, SpaceX logró capturar el propulsor Super Heavy con los brazos mecánicos "Mechazilla" de la torre de lanzamiento, demostrando por primera vez la recuperación sin patas de aterrizaje.',
      'Los motores Raptor son los primeros motores de ciclo completo de combustión escalonada de metano y oxígeno líquido (methalox) en volar al espacio. Operan a una presión de cámara de 300 bares, una de las más altas logradas en cualquier motor de cohete. La elección de metano como combustible no es casual: el metano puede fabricarse en Marte usando la reacción de Sabatier, combinando el CO₂ de la atmósfera marciana con hidrógeno. Esto significa que Starship podría repostarse en Marte para el viaje de regreso sin necesidad de transportar combustible desde la Tierra, una pieza clave de la arquitectura de colonización marciana propuesta por SpaceX.',
      'Para misiones al espacio profundo, Starship necesita repostaje orbital. El concepto consiste en lanzar una Starship vacía a órbita baja terrestre y luego enviar entre 6 y 12 naves tanque que transfieran propelante criogénico en el vacío del espacio. La transferencia de combustibles criogénicos (metano a -161°C y oxígeno líquido a -183°C) en microgravedad nunca se ha realizado a gran escala, y es uno de los mayores desafíos técnicos pendientes. SpaceX y la NASA firmaron un contrato para demostrar esta tecnología como parte del programa Artemis, ya que la variante HLS (Human Landing System) de Starship fue seleccionada como módulo de aterrizaje lunar.',
      'La variante HLS (Human Landing System) de Starship fue seleccionada por la NASA en abril de 2021, con un contrato valorado en 2,890 millones de dólares, como el módulo de aterrizaje que llevará a los astronautas de Artemis desde la órbita lunar hasta la superficie del polo sur. Esta versión carece de aletas aerodinámicas y escudo térmico (no necesita regresar a la Tierra por sí misma) pero incluye propulsores laterales de aterrizaje elevados para evitar que el chorro de escape dañe la superficie lunar, un ascensor para descender a los astronautas desde la escotilla (ubicada a 50 metros del suelo) y un volumen habitable de más de 1,000 metros cúbicos.',
      'La visión a largo plazo de SpaceX para Starship va más allá de Marte. Elon Musk ha descrito planes para construir una flota de naves Starship que podría transportar hasta 100 personas por viaje al Planeta Rojo, con el objetivo de establecer una ciudad autosuficiente de un millón de habitantes. El costo por tonelada al espacio se reduciría de los actuales 2,720 dólares por kilogramo del Falcon 9 a potencialmente menos de 100 dólares por kilogramo con Starship completamente reutilizable. A ese precio, enviar carga a la Luna o Marte tendría un costo comparable al de la logística marítima transcontinental del siglo XIX, abriendo el espacio a la colonización industrial.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El acero inoxidable 304L utilizado en Starship fue una elección controversiada. Mientras que la industria aeroespacial usa fibra de carbono y aleaciones de aluminio-litio, SpaceX eligió acero porque mantiene su resistencia a temperaturas criogénicas (-200°C) y soporta el calor de la reentrada sin protección adicional en muchas zonas. El acero cuesta solo 3 dólares por kilogramo frente a los 135 dólares de la fibra de carbono. Aunque es más pesado, la reutilización total compensa la penalización de masa con creces.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Cada motor Raptor produce un empuje de aproximadamente 2.3 meganewtons a nivel del mar, con un impulso específico (Isp) de 327 segundos a nivel del mar y 363 segundos en el vacío. El Isp mide la eficiencia de un motor: cuántos segundos puede un kilogramo de combustible producir un newton de empuje. A modo de comparación, los motores RS-25 del Space Shuttle tenían un Isp de 452 segundos en el vacío pero producían solo 2.3 MN de empuje. La combinación de alto empuje y eficiencia razonable hace del Raptor un motor ideal para levantamiento pesado.' },
    ],
    fact: 'El 6 de junio de 2024, durante el cuarto vuelo de prueba integrado (IFT-4), Starship logró un amerizaje controlado en el Golfo de México tras completar un vuelo suborbital y sobrevivir a la reentrada atmosférica. Las losetas del escudo térmico cerámico, muchas de las cuales se desprendieron en vuelos anteriores, mantuvieron su integridad en las áreas críticas del flap de popa. Este vuelo demostró que una nave de acero inoxidable de 50 metros puede regresar del espacio intacta, un requisito esencial para la reutilización que ningún vehículo de este tamaño había logrado previamente.',
  },
  {
    id: 'estaciones-comerciales',
    title: 'Estaciones Espaciales Comerciales',
    color: '#96A3AE',
    btnImage: '/assets/astrotrain/infographic_m6/btn_estaciones-comerciales.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_estaciones-comerciales.jpg',
    content: [
      'La Estación Espacial Internacional (ISS) ha operado de manera continua desde el 2 de noviembre de 2000, cuando la tripulación Expedition 1 (William Shepherd, Yuri Gidzenko y Sergei Krikalev) abordó la estación. Con un costo total estimado en más de 150,000 millones de dólares y contribuciones de 15 naciones, la ISS es la estructura más costosa construida por la humanidad. Sin embargo, sus módulos principales fueron diseñados para una vida útil de 15 años, y aunque la NASA ha extendido las operaciones hasta 2030, la estación no puede funcionar indefinidamente. La fatiga de materiales, las microfisuras y el impacto acumulado de micrometeoritos hacen necesario un sucesor.',
      'Axiom Space, una empresa fundada en 2016 por el exgerente de la ISS Michael Suffredini, lidera la transición. Su plan consiste en acoplar módulos comerciales a la ISS a partir de 2026-2027, empezando con el módulo habitable Axiom Hab 1. Gradualmente, Axiom añadirá un módulo de investigación, un observatorio panorámico y una instalación de manufactura espacial. Cuando la ISS sea retirada de servicio (desorbitada controladamente hacia el Punto Nemo del Pacífico Sur), los módulos de Axiom se separarán y formarán una estación independiente que continuará operando como la primera estación espacial comercial completa.',
      'Blue Origin (la empresa espacial de Jeff Bezos) lidera el proyecto Orbital Reef en colaboración con Sierra Space, Boeing y otras compañías. Descrito como un "parque empresarial mixto" en órbita baja, Orbital Reef está diseñado para alojar hasta 10 tripulantes en un volumen presurizado comparable al de la ISS. La estación ofrecerá laboratorios de microgravedad para investigación farmacéutica y de materiales, estudios de producción de medios (cine y contenido en el espacio), turismo espacial de lujo y manufactura de cristales de proteínas y fibra óptica ZBLAN, que solo pueden fabricarse en gravedad cero con la pureza requerida.',
      'Starlab, un proyecto conjunto de Voyager Space y Airbus, representa un enfoque diferente: una estación espacial inflable de módulo único con un volumen habitable de 340 metros cúbicos, comparable a un tercio de la ISS pero lanzada en un solo vuelo de Starship. Starlab utilizará tecnología de módulos expandibles similares a los que Bigelow Aerospace probó con el módulo BEAM, acoplado a la ISS desde 2016. Esta tecnología permite lanzar un módulo compacto que se infla en órbita hasta alcanzar su tamaño completo, reduciendo los costos de lanzamiento y el número de misiones de ensamblaje necesarias.',
      'La manufactura espacial es el motor económico que justifica estas inversiones privadas. En microgravedad, los cristales de proteínas crecen más grandes y uniformes, permitiendo a los farmacéuticos diseñar medicamentos más efectivos. La fibra óptica ZBLAN fabricada en el espacio tiene una atenuación de señal 10 a 100 veces menor que la producida en tierra, con un valor estimado de 3 millones de dólares por kilogramo. Empresas como Varda Space Industries ya han lanzado cápsulas autónomas de manufactura espacial que regresan a la Tierra con productos farmacéuticos cristalizados en microgravedad, demostrando que la fábrica orbital no es ciencia ficción sino un modelo de negocio emergente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La ISS será retirada de servicio mediante un desorbitaje controlado usando un vehículo de desorbitación especial desarrollado por SpaceX bajo un contrato de 843 millones de dólares. La estación de 420 toneladas descenderá gradualmente y se desintegrará en gran parte durante la reentrada atmosférica. Los fragmentos que sobrevivan caerán en el Punto Nemo del Pacífico Sur (el punto más alejado de cualquier tierra), donde ya descansan los restos de más de 260 naves espaciales, incluyendo la estación rusa Mir.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fibra óptica ZBLAN (fluoruro de circonio, bario, lantano, aluminio y sodio) fabricada en gravedad terrestre desarrolla microcristales que dispersan la luz y degradan la señal. En microgravedad, la convección desaparece y el vidrio se enfría uniformemente, eliminando estos defectos. Un solo kilogramo de fibra óptica ZBLAN espacial vale más que un kilogramo de oro. La empresa Flawless Photonics ha producido muestras en la ISS que confirman una reducción de atenuación de hasta 100 veces respecto a las fibras terrestres.' },
    ],
    fact: 'El primer turista privado que visitó la ISS fue Dennis Tito, un ingeniero y multimillonario estadounidense de 60 años, quien pagó 20 millones de dólares a la agencia espacial rusa Roscosmos por un viaje de 8 días en abril de 2001. Tito voló en una nave Soyuz TM-32 y pasó su estancia observando la Tierra y tomando fotografías. La NASA inicialmente se opuso a su visita, pero Roscosmos tenía autoridad legal para vender asientos en la Soyuz. Desde entonces, más de 10 turistas espaciales han visitado la ISS, pagando entre 20 y 55 millones de dólares cada uno.',
  },
  {
    id: 'turismo-espacial',
    title: 'Turismo Espacial',
    color: '#B43A3A',
    btnImage: '/assets/astrotrain/infographic_m6/btn_turismo-espacial.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_turismo-espacial.jpg',
    content: [
      'El turismo espacial dejó de ser ciencia ficción el 20 de julio de 2021, cuando Jeff Bezos voló a bordo del New Shepard de Blue Origin junto con su hermano Mark, la aviadora pionera Wally Funk (82 años, la persona de mayor edad en el espacio) y Oliver Daemen (18 años, la persona más joven). El vuelo suborbital duró 10 minutos y 10 segundos, alcanzando una altitud de 107 km, justo por encima de la línea de Kármán que marca el límite del espacio a 100 km. Nueve días antes, el 11 de julio, Richard Branson había volado en el SpaceShipTwo de Virgin Galactic, alcanzando 86 km de altitud, por encima del límite de 80 km reconocido por EE.UU. pero por debajo de la línea de Kármán internacional.',
      'La misión Inspiration4 de SpaceX, lanzada el 15 de septiembre de 2021, llevó el turismo espacial a otro nivel. Cuatro civiles —el empresario Jared Isaacman, la asistente médica Hayley Arceneaux (sobreviviente de cáncer óseo infantil con una prótesis de titanio en la pierna), el ingeniero aeronáutico Chris Sembroski y la geóloga y piloto Sian Proctor— orbitaron la Tierra durante tres días a una altitud de 585 km, más alto que la ISS (408 km) y el Telescopio Espacial Hubble (547 km). Fue la primera misión orbital compuesta exclusivamente por civiles sin ningún astronauta profesional a bordo.',
      'El proyecto dearMoon, financiado por el empresario japonés Yusaku Maezawa, planeaba enviar un grupo de artistas y creativos en un viaje de 6 días alrededor de la Luna a bordo de una Starship de SpaceX. Maezawa seleccionó 8 tripulantes de entre más de un millón de solicitantes de todo el mundo, incluyendo un DJ, un fotógrafo, un coreógrafo y un YouTuber. Aunque el proyecto fue cancelado en junio de 2024 por retrasos en el desarrollo de Starship, estableció un precedente al plantear que el espacio no debería ser exclusivo para astronautas profesionales o multimillonarios, sino accesible a personas de diversas profesiones y orígenes culturales.',
      'Los vuelos suborbitales de Blue Origin y Virgin Galactic ofrecen entre 3 y 4 minutos de ingravidez y vistas de la curvatura terrestre, con precios que comenzaron en 450,000 dólares por asiento (Virgin Galactic) y cifras no publicadas para Blue Origin (las primeras subastas superaron los 28 millones). SpaceX opera en una escala diferente: sus misiones orbitales cuestan entre 55 y 200 millones de dólares por asiento, dependiendo del destino (ISS, órbita libre o circunnavegación lunar). La empresa Axiom Space cobra 55 millones de dólares por un asiento a la ISS, incluyendo entrenamiento y 10 días en la estación.',
      'El "efecto perspectiva" (overview effect), descrito por el autor Frank White en 1987, es un cambio cognitivo que experimentan los astronautas al ver la Tierra desde el espacio. Muchos reportan una sensación de unidad con la humanidad, la fragilidad del planeta y la irrelevancia de las fronteras políticas. El astronauta Edgar Mitchell (Apollo 14) describió una "sensación de conexión con el universo" que cambió su vida. Los investigadores del turismo espacial estudian si este efecto ocurre también en vuelos suborbitales breves y si podría tener un impacto positivo en la conciencia ambiental de los participantes, generando una nueva generación de defensores del planeta.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Wally Funk, que voló con Blue Origin a los 82 años, fue una de las "Mercury 13": trece mujeres que pasaron las mismas pruebas físicas y psicológicas que los astronautas del programa Mercury de la NASA en 1961. A pesar de que algunas de ellas superaron las puntuaciones de los astronautas masculinos, el programa fue cancelado y la NASA no aceptó mujeres hasta 1978. Funk esperó 60 años para volar al espacio. Su vuelo en New Shepard fue la reivindicación de toda una generación de mujeres piloto excluidas de la era espacial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La línea de Kármán, a 100 km de altitud, no es un límite físico sino una convención establecida por la Federación Aeronáutica Internacional (FAI) en los años 1960. Se basa en un cálculo del ingeniero Theodore von Kármán que determinó que a esa altitud la atmósfera es tan tenue que un avión necesitaría volar más rápido que la velocidad orbital para generar sustentación aerodinámica. En la práctica, la transición entre atmósfera y espacio es gradual: hay moléculas de aire detectables hasta los 10,000 km de altitud.' },
    ],
    fact: 'Hayley Arceneaux, que voló en Inspiration4 a los 29 años, fue diagnosticada con osteosarcoma (cáncer óseo) a los 10 años y tratada en el Hospital Infantil St. Jude. Los cirujanos reemplazaron parte de su fémur con una prótesis de titanio. Cuando fue seleccionada para la misión, se convirtió en la persona más joven estadounidense en orbitar la Tierra y la primera persona con una prótesis interna en volar al espacio. Su participación demostró que las barreras médicas tradicionales para los vuelos espaciales pueden reevaluarse con la tecnología y los protocolos adecuados.',
  },
  {
    id: 'mineria-asteroides',
    title: 'Minería de Asteroides',
    color: '#8491A0',
    btnImage: '/assets/astrotrain/infographic_m6/btn_mineria-asteroides.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_mineria-asteroides.jpg',
    content: [
      'Los asteroides son cuerpos rocosos y metálicos remanentes de la formación del Sistema Solar hace 4,600 millones de años. Muchos de ellos contienen concentraciones de metales del grupo del platino (platino, paladio, rodio, iridio, osmio y rutenio) que son extremadamente raros en la corteza terrestre pero se estiman abundantes en ciertos asteroides de tipo M (metálicos). El asteroide 16 Psyche, que orbita entre Marte y Júpiter, está compuesto principalmente de hierro y níquel, con un valor estimado de sus metales (si pudieran extraerse y transportarse a la Tierra) de 10,000 cuatrillones de dólares, una cifra que supera el PIB mundial acumulado de toda la historia humana.',
      'La misión OSIRIS-REx de la NASA demostró que la recolección de material asteroidal es técnicamente posible. Lanzada en septiembre de 2016, la sonda llegó al asteroide Bennu (un cuerpo de 490 metros de diámetro clasificado como "potencialmente peligroso" por su órbita cercana a la Tierra) en diciembre de 2018. El 20 de octubre de 2020, OSIRIS-REx ejecutó una maniobra de "Touch-and-Go" (TAG), tocando la superficie de Bennu durante 6 segundos y recolectando 121.6 gramos de material. La cápsula con las muestras regresó a la Tierra el 24 de septiembre de 2023, aterrizando en el desierto de Utah. Los análisis preliminares revelaron aminoácidos y minerales hidratados.',
      'La misión japonesa Hayabusa2 de JAXA fue otra demostración exitosa. Lanzada en 2014, llegó al asteroide Ryugu (900 metros de diámetro) en 2018. Hayabusa2 disparó un proyectil de cobre a 2 km/s contra la superficie para crear un cráter artificial y recolectó muestras del material excavado, obteniendo partículas del subsuelo no expuestas a la radiación espacial. La cápsula regresó a la Tierra en diciembre de 2020 con 5.4 gramos de material. Los análisis publicados en la revista Science en 2022 identificaron más de 20 tipos de aminoácidos, incluida la glicina, y uracilo, una de las bases del ARN, fortaleciendo la hipótesis de que los ingredientes de la vida llegaron a la Tierra desde el espacio.',
      'El marco legal de la minería espacial está en desarrollo. El Tratado del Espacio Exterior de 1967 de las Naciones Unidas establece que ningún Estado puede reclamar soberanía sobre cuerpos celestes. Sin embargo, la Ley SPACE Act de 2015 de Estados Unidos otorga a ciudadanos y empresas estadounidenses el derecho de poseer y vender recursos extraídos del espacio, aunque no reclamar el cuerpo celeste en sí. Luxemburgo aprobó una ley similar en 2017 y ha invertido más de 200 millones de euros en su iniciativa SpaceResources.lu para convertirse en un centro europeo de minería espacial. Japón y los Emiratos Árabes Unidos también han adoptado legislaciones favorables.',
      'La tecnología necesaria para la minería asteroidal a escala industrial aún no existe, pero los precursores están en desarrollo. Las opciones incluyen la captura y redirección de asteroides pequeños a órbita lunar (estudiada en el programa cancelado ARM de la NASA), la extracción in situ con robots autónomos que procesen el material y envíen solo los productos refinados, y la utilización de agua asteroidal como combustible espacial (hidrógeno y oxígeno por electrólisis). Las empresas Planetary Resources (fundada en 2012, adquirida por ConsenSys en 2018) y Deep Space Industries (adquirida por Bradford Space en 2019) fueron pioneras comerciales, pero ambas se agotaron financieramente antes de lanzar misiones. La empresa AstroForge, fundada en 2022, planea demostrar la refinación de metales en el espacio con una misión en 2025.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La misión DART (Double Asteroid Redirection Test) de la NASA demostró en septiembre de 2022 que es posible desviar un asteroide golpeándolo con una nave espacial. DART impactó contra Dimorphos, una luna de 160 metros del asteroide Didymos, a 22,530 km/h. El impacto cambió el período orbital de Dimorphos de 11 horas y 55 minutos a 11 horas y 23 minutos, una reducción de 32 minutos, superando ampliamente las expectativas de los científicos. Es la primera vez que la humanidad altera deliberadamente la trayectoria de un cuerpo celeste.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los asteroides de tipo C (carbonáceos) representan el 75% de los asteroides conocidos y contienen hasta un 20% de agua en forma de minerales hidratados. Un asteroide de tipo C de 500 metros de diámetro podría contener más agua en forma de hidratos que la que ha consumido toda la humanidad en un año. Esta agua, extraída mediante calentamiento solar, podría separarse en hidrógeno y oxígeno para combustible de cohetes, creando "gasolineras espaciales" que permitirían a las naves repostar sin regresar a la Tierra.' },
    ],
    fact: 'Los análisis de las muestras de Bennu realizados por la Universidad de Arizona y publicados en la revista Meteoritics & Planetary Science en 2024 revelaron la presencia de fosfatos de sodio y magnesio, minerales que en la Tierra se asocian con procesos biológicos. También se encontraron aminoácidos que no se producen naturalmente en la Tierra. Estos hallazgos apoyan la hipótesis de la panspermia, que sugiere que los compuestos orgánicos necesarios para el origen de la vida fueron distribuidos por el Sistema Solar a través de asteroides y cometas durante el Bombardeo Pesado Tardío, hace 4,100 a 3,800 millones de años.',
  },
  {
    id: 'colonias-espaciales',
    title: 'Colonias Espaciales',
    color: '#E46A6A',
    btnImage: '/assets/astrotrain/infographic_m6/btn_colonias-espaciales.jpg',
    image: '/assets/astrotrain/infographic_m6/hero_colonias-espaciales.jpg',
    content: [
      'El concepto de colonias espaciales fue desarrollado formalmente por el físico Gerard K. O\'Neill de la Universidad de Princeton en la década de 1970. En su libro "The High Frontier" (1977), O\'Neill propuso enormes estructuras cilíndricas rotatorias, conocidas como "cilindros de O\'Neill", que generarían gravedad artificial mediante fuerza centrífuga. El diseño más grande tendría 32 km de largo y 6.4 km de diámetro, con una superficie habitable interna de 650 km², suficiente para albergar a varios millones de personas. La rotación a una velocidad de 0.53 rpm (una vuelta cada 114 segundos) simularía una gravedad equivalente a la terrestre en la superficie interior del cilindro.',
      'El Torus de Stanford, diseñado durante un estudio de verano de la NASA en 1975 dirigido por O\'Neill, es una estructura con forma de anillo (donut) de 1.8 km de diámetro que giraría una vez por minuto para generar gravedad terrestre en su perímetro interior. Diseñado para 10,000 a 140,000 habitantes, el torus tendría un espejo central que reflejaría la luz solar hacia espejos secundarios que la distribuirían uniformemente por el interior del anillo, creando un ciclo de día y noche artificial. La agricultura se realizaría en módulos externos no rotatorios, y el blindaje contra radiación cósmica consistiría en escoria lunar procesada de varios metros de espesor.',
      'La terraformación de Marte —transformar su atmósfera y superficie para hacerlas habitables sin trajes espaciales— es un concepto propuesto por Carl Sagan en 1971 y desarrollado por James Lovelock y Michael Allaby en 1984. Las propuestas incluyen liberar los depósitos de CO₂ congelado en los polos para engrosar la atmósfera, introducir microorganismos extremófilos que produzcan oxígeno, y desviar asteroides de hielo para impactar el planeta y aportar agua. Sin embargo, un estudio de la Universidad de Colorado publicado en Nature Astronomy en 2018 demostró que Marte no tiene suficiente CO₂ accesible para elevar la presión atmosférica por encima de 7% de la terrestre, lo que hace la terraformación completa inviable con la tecnología actual.',
      'El viaje interestelar —llegar a otras estrellas— presenta desafíos de escala diferente. La estrella más cercana, Proxima Centauri, está a 4.24 años luz (40 billones de kilómetros). Con la tecnología actual (la sonda más rápida, Parker Solar Probe, alcanza 635,000 km/h), un viaje tomaría 6,300 años. El proyecto Breakthrough Starshot, financiado por el inversor Yuri Milner con 100 millones de dólares, propone enviar micro-sondas de 1 gramo impulsadas por velas solares láser al 20% de la velocidad de la luz, alcanzando Proxima Centauri en 20 años. Las sondas enviarían imágenes del sistema estelar, incluyendo el exoplaneta Proxima b, que orbita en la zona habitable.',
      'Las naves generacionales son otro concepto para el viaje interestelar: enormes ciudades espaciales que viajarían durante siglos o milenios, donde múltiples generaciones nacerían, vivirían y morirían a bordo antes de llegar al destino. Los estudios de la British Interplanetary Society ("Proyecto Daedalus", 1978) y la Fundación Icarus analizan la dinámica social, genética y tecnológica de mantener una civilización funcional durante cientos de generaciones en un espacio cerrado. Los genetistas estiman que una población mínima de 10,000 personas sería necesaria para mantener la diversidad genética suficiente y evitar la consanguinidad durante un viaje de 200 años. Esto convierte la colonización interestelar en un proyecto de ingeniería no solo técnico sino profundamente social y cultural.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Jeff Bezos ha citado los cilindros de O\'Neill como su visión del futuro de la humanidad, argumentando que las colonias espaciales son superiores a la colonización planetaria porque pueden construirse a medida, con clima y gravedad personalizados, y ubicarse cerca de fuentes de energía solar ilimitada. Bezos estudió con O\'Neill en Princeton y ha declarado que fundó Blue Origin para hacer realidad esta visión. Su lema empresarial, "Gradatim Ferociter" (paso a paso, con determinación), refleja un enfoque de décadas para reducir el costo del acceso al espacio.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fuerza centrífuga que simularía gravedad en un cilindro de O\'Neill sigue la ecuación a = ω²r, donde a es la aceleración (9.81 m/s² para simular gravedad terrestre), ω es la velocidad angular y r es el radio del cilindro. Para un cilindro de 3.2 km de radio, la velocidad de rotación necesaria sería de 0.055 rad/s, o una revolución cada 114 segundos. A esta velocidad, el efecto de Coriolis (que desvía objetos en movimiento dentro de un sistema rotatorio) sería perceptible pero manejable: una pelota lanzada verticalmente a 10 metros caería 2 cm desviada de la vertical.' },
    ],
    fact: 'El Telescopio Espacial James Webb (JWST), lanzado el 25 de diciembre de 2021, ha detectado firmas espectrales de dióxido de carbono, vapor de agua y dimetil sulfuro en la atmósfera de exoplanetas como K2-18b, un mundo 8.6 veces más masivo que la Tierra ubicado a 120 años luz. En la Tierra, el dimetil sulfuro es producido exclusivamente por organismos vivos (fitoplancton marino). Aunque la detección requiere confirmación adicional, estos hallazgos del JWST están acercando a la humanidad a responder la pregunta de si estamos solos en el universo, y definen los posibles destinos de las futuras colonias interestelares.',
  },
];

// ——— Mission Control Particle Field (Canvas Background) ——————————————
function MissionField() {
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
      hue: Math.random() > 0.5 ? '196,75,75' : '168,181,192',
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

// ——— Future Missions Header ——————————————————————————————————————
function FutureMissionsHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,75,75,0.3))' }}>
        {/* Mission arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#missionGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 mission markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C44B4B','#D45A5A','#A8B5C0','#96A3AE','#B43A3A','#8491A0','#E46A6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central rocket icon */}
        <path d="M300 18 C300 18 294 26 294 33 L294 37 L300 39 L306 37 L306 33 C306 26 300 18 300 18Z" fill="none" stroke="#C44B4B" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="28" r="1.5" fill="#C44B4B" opacity="0.5" />
        <defs>
          <linearGradient id="missionGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(196,75,75,0.2)" />
            <stop offset="50%" stopColor="rgba(196,75,75,0.9)" />
            <stop offset="100%" stopColor="rgba(196,75,75,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#C44B4B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MISIONES DEL FUTURO</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(196,75,75,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ARTEMIS · MARTE · MÁS ALLÁ</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) —————————————————
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotAstroTrainM6"
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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

// ——— Progress Bar ————————————————————————————————————————————————
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
export default function InteractiveInfographic_AstroTrainM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/astrotrain/astrotrain_m6.png)',
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
      <MissionField />

      <FutureMissionsHeader />

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
              🏆 ¡Has completado las Misiones del Futuro!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Explorador del Mañana
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
