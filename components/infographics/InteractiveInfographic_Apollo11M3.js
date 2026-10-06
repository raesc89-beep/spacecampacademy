'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#C9B37E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Mindell, D. A. (2008). Digital Apollo: Human and Machine in Spaceflight. MIT Press.",
  "Hansen, J. R. (2005). First Man: The Life of Neil A. Armstrong. Simon & Schuster.",
  "Eyles, D. (2018). Sunburst and Luminary: An Apollo Memoir. Fort Point Press.",
  "Heiken, G. H., Vaniman, D. T. y French, B. M. (eds.) (1991). Lunar Sourcebook: A User's Guide to the Moon. Cambridge University Press.",
  "Colaprete, A. y otros (2010). Detection of Water in the LCROSS Ejecta Plume. Science, 330(6003), 463-468.",
  "Jones, E. M. (ed.). Apollo Lunar Surface Journal. NASA History Office (history.nasa.gov/alsj)."
];

const INFOGRAPHIC_NODES = [
  {
    id: "modulo-lunar-eagle",
    bannerImage: '/assets/apollo11/infographic_m3/banner_modulo-lunar-eagle.webp',
    bannerCaption: "El Módulo Lunar Eagle, construido por Grumman, tenía dos etapas y paredes de aluminio tan finas como varias hojas de papel.",
    title: "Eagle: una nave hecha para el vacío",
    color: '#8C7A5A',
    btnImage: '/assets/apollo11/infographic_m3/btn_modulo-lunar-eagle.webp',
    image: '/assets/apollo11/infographic_m3/hero_modulo-lunar-eagle.webp',
    content: [
      "El Módulo Lunar Eagle fue la primera nave tripulada diseñada para volar solo en el vacío del espacio. Lo construyó la empresa Grumman, en Nueva York. Medía unos 7 metros de alto y, con sus cuatro patas abiertas, ocupaba unos 9 metros de ancho. Lleno de combustible pesaba unas 15 toneladas en la Tierra, pero en la Luna, con una gravedad seis veces menor, ese peso equivalía al de unas 2.5 toneladas terrestres.",
      "Como nunca tendría que atravesar una atmósfera, el Eagle no necesitaba forma aerodinámica ni escudo térmico. Los ingenieros recortaron cada kilogramo posible. En algunas zonas, las paredes de la cabina presurizada eran láminas de aluminio de unas décimas de milímetro de grosor. Fuera, el módulo estaba cubierto de mantas aislantes doradas y plateadas que lo protegían del calor y del frío extremos, y que le daban su aspecto de envoltorio de regalo arrugado.",
      "El Módulo Lunar tenía dos partes. La etapa de descenso, abajo, llevaba las patas, los instrumentos científicos y un motor que podía regular su potencia, algo nuevo en un motor de cohete tripulado. La etapa de ascenso, arriba, contenía la cabina de los astronautas y un motor más pequeño. Al terminar la visita, la etapa de descenso servía como plataforma de lanzamiento y se quedaba en la Luna, mientras la de ascenso despegaba hacia la órbita.",
      "La cabina era muy pequeña y no tenía asientos. Armstrong y Aldrin volaban de pie, sujetos con arneses elásticos, mirando por dos ventanas triangulares. Volar de pie permitía acercar los ojos a las ventanas y ver mejor el suelo durante el aterrizaje. Así los ingenieros pudieron hacer ventanas más pequeñas y una cabina más ligera. Los mandos estaban al alcance de la mano y frente a ellos tenían la pantalla y el teclado de la computadora de guiado.",
      "El 20 de julio de 1969, unas 100 horas después del despegue, el Eagle se separó de Columbia en órbita lunar. Michael Collins lo inspeccionó desde la ventana para comprobar que las patas estaban bien desplegadas. Después, el Eagle encendió su motor para bajar su órbita. Cuando estaba a unos 15 kilómetros de altura, comenzó el encendido de descenso motorizado, el tramo final hacia la superficie, que duraría unos doce minutos y medio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las patas del Eagle tenían varillas sensoras de más de 1.5 metros colgando bajo los platos de apoyo. Cuando una de ellas tocaba el suelo, se encendía en la cabina una luz azul de contacto lunar. En ese momento, el piloto debía apagar el motor. Aldrin anunció la luz de contacto segundos antes de que el Eagle quedara completamente posado." },
      { label: "Dato Científico", icon: "atom", text: "Las mantas aislantes del Módulo Lunar estaban hechas de muchas capas de plástico muy fino, como Kapton y Mylar, recubiertas de aluminio. Entre capa y capa había vacío, y en el vacío el calor no puede viajar por conducción ni por convección, solo por radiación. Cada capa reflejaba parte de esa radiación, y así la nave se mantenía a una temperatura estable." }
    ],
    fact: "Seis módulos lunares aterrizaron en la Luna entre 1969 y 1972, y sus etapas de descenso siguen allí, en los seis lugares de aterrizaje del programa Apolo. La sonda Lunar Reconnaissance Orbiter de la NASA las ha fotografiado desde órbita, y en sus imágenes se distinguen incluso los senderos oscuros que dejaron los astronautas al caminar sobre el polvo.",
  },
  {
    id: "alarmas-1202-software",
    bannerImage: '/assets/apollo11/infographic_m3/banner_alarmas-1202-software.webp',
    bannerCaption: "Durante el descenso, la computadora AGC mostró alarmas por sobrecarga; su software descartó tareas secundarias y siguió guiando.",
    title: "Alarmas 1202 y 1201: el software al rescate",
    color: '#8C5E5E',
    btnImage: '/assets/apollo11/infographic_m3/btn_alarmas-1202-software.webp',
    image: '/assets/apollo11/infographic_m3/hero_alarmas-1202-software.webp',
    content: [
      "Pocos minutos después de empezar el descenso, cuando el Eagle estaba a unos 10 kilómetros de altura, se encendió una alarma en la computadora: el código 1202. Armstrong pidió a Houston que le explicaran qué significaba. Ninguno de los dos astronautas había visto esa alarma en los entrenamientos de vuelo. En pocos minutos aparecieron otras alarmas 1202 y una 1201. En la sala de control, todos tenían que decidir rápido si era seguro continuar o si había que abortar el aterrizaje.",
      "El oficial de guiado Steve Bales, de 26 años, consultó con el ingeniero Jack Garman, que tenía una lista escrita a mano con el significado de cada alarma. Ambos sabían que las alarmas 1202 y 1201 indicaban que la computadora estaba sobrecargada, pero que seguía haciendo sus tareas esenciales. Bales respondió con un «Go», que significaba continuar. Por esa decisión, en 1969 Bales aceptó la Medalla Presidencial de la Libertad en nombre de todo el equipo de control de la misión.",
      "La computadora de guiado del Apolo, conocida como AGC, tenía unos 4 kilobytes de memoria de trabajo y unos 72 kilobytes de memoria permanente. Esa memoria permanente se fabricaba tejiendo a mano hilos de cobre a través de pequeños anillos magnéticos: si el hilo pasaba por dentro del anillo, guardaba un 1; si pasaba por fuera, un 0. Muchas de las personas que tejían esa memoria eran trabajadoras de la industria textil de Massachusetts.",
      "El software de la AGC se escribió en el Laboratorio de Instrumentación del Instituto Tecnológico de Massachusetts (MIT). Margaret Hamilton dirigía la división que programó el software de vuelo de las naves. El sistema estaba organizado por prioridades: cada tarea tenía un nivel de importancia. Cuando la computadora no daba abasto, borraba las tareas menos importantes y se reiniciaba en una fracción de segundo, conservando las tareas de guiado y control del motor.",
      "Más tarde, los ingenieros descubrieron la causa de la sobrecarga. Un interruptor del radar de encuentro, que solo hacía falta para volver a encontrarse con Columbia, estaba en una posición que hacía que el radar enviara señales innecesarias a la computadora. Esas señales le robaban cerca del 15 % de su tiempo de trabajo. Gracias al diseño por prioridades, el problema no afectó al guiado. En 2016, Margaret Hamilton recibió la Medalla Presidencial de la Libertad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Margaret Hamilton es una de las personas que popularizaron la expresión «ingeniería de software». En los años sesenta, programar no se consideraba una ingeniería, y ella quería que su trabajo se tratara con el mismo rigor que el diseño de un motor o un puente. Una foto famosa la muestra junto a una pila de listados de código casi tan alta como ella." },
      { label: "Dato Científico", icon: "atom", text: "Un kilobyte equivale a unos mil caracteres de texto. Los 4 kilobytes de memoria de trabajo de la AGC alcanzarían para guardar más o menos una página escrita. Un teléfono móvil actual tiene millones de veces más memoria. Aun así, la AGC podía guiar una nave porque su programa estaba escrito con mucho cuidado y hacía solo lo necesario." }
    ],
    fact: "Los astronautas se comunicaban con la AGC mediante un teclado y una pantalla llamados DSKY. En lugar de palabras, usaban combinaciones de números con dos tipos de instrucciones: «verbos», que indicaban la acción, y «sustantivos», que indicaban los datos. Por ejemplo, un verbo podía significar «mostrar» y un sustantivo, «altitud». Los astronautas memorizaron decenas de esas combinaciones.",
  },
  {
    id: "aterrizaje-base-tranquilidad",
    bannerImage: '/assets/apollo11/infographic_m3/banner_aterrizaje-base-tranquilidad.webp',
    bannerCaption: "El 20 de julio de 1969, a las 20:17:40 UTC, el Eagle se posó en el mar de la Tranquilidad tras un tramo final pilotado a mano.",
    title: "«El Águila ha aterrizado»",
    color: '#6F7D5C',
    btnImage: '/assets/apollo11/infographic_m3/btn_aterrizaje-base-tranquilidad.webp',
    image: '/assets/apollo11/infographic_m3/hero_aterrizaje-base-tranquilidad.webp',
    content: [
      "Durante los últimos minutos del descenso, Armstrong miró por la ventana y vio que la computadora los llevaba hacia una zona peligrosa: el borde de un cráter de unos 180 metros de ancho, más tarde llamado cráter West, rodeado de rocas del tamaño de automóviles. Aterrizar allí podía volcar el Eagle o dañar sus patas. Armstrong pasó a un modo semiautomático, controlando él mismo el avance horizontal y la velocidad de bajada, y siguió volando más allá del cráter.",
      "Mientras Armstrong buscaba terreno plano, Aldrin le leía en voz alta la altura y la velocidad que mostraba la computadora. En Houston, el comunicador Charlie Duke avisaba del combustible restante. Cuando llegó el aviso de «60 segundos», el Eagle aún no había aterrizado; después llegó el de «30 segundos». En 1969 se calculó que quedaban unos 25 segundos de margen; análisis posteriores, que tuvieron en cuenta el movimiento del combustible en los tanques, estimaron cerca de 45.",
      "Cerca del suelo, el chorro del motor levantó una nube de polvo que se deslizaba en todas direcciones y dificultaba ver la superficie. Armstrong se guió por las sombras de las rocas que asomaban a través del polvo. A las 20:17:40 en tiempo universal del 20 de julio de 1969, las sondas de las patas tocaron el suelo. Aldrin dijo «luz de contacto» y, segundos después, Armstrong apagó el motor. El Eagle estaba en el mar de la Tranquilidad.",
      "Entonces Armstrong pronunció la frase que se escuchó en todo el mundo: «Houston, aquí Base Tranquilidad. El Águila ha aterrizado». Era la primera vez que usaba ese nombre en una comunicación. Charlie Duke respondió, emocionado, que tenían a un montón de gente a punto de ponerse azul, es decir, que habían estado conteniendo la respiración. En la sala de control de Houston, los controladores aplaudieron, pero enseguida volvieron a trabajar.",
      "El trabajo no terminaba con el aterrizaje. En los minutos siguientes, los controladores revisaron todos los sistemas del Eagle para decidir si podía quedarse en la superficie o debía despegar de inmediato. Hubo un momento de tensión cuando la presión subió en una tubería de combustible congelada. El problema se resolvió solo. Unas seis horas y media después del aterrizaje, Armstrong abrió la escotilla para bajar a la superficie lunar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Armstrong se había entrenado para aterrizar con el Vehículo de Entrenamiento para Aterrizaje Lunar, una máquina voladora con un motor a reacción que cancelaba parte de su peso. En mayo de 1968, ese vehículo falló durante un vuelo y Armstrong tuvo que salir disparado en su asiento eyectable segundos antes de que se estrellara. Salió casi ileso." },
      { label: "Dato Científico", icon: "atom", text: "En la Tierra, el polvo levantado por un helicóptero forma nubes que flotan en el aire. En la Luna no hay aire, así que cada grano de polvo sale disparado en línea recta y cae como una pequeña bala, sin formar remolinos. Por eso Armstrong veía el polvo como una lámina que se deslizaba sobre el suelo y ocultaba el terreno." }
    ],
    fact: "El lugar de aterrizaje del Apolo 11 está cerca de las coordenadas 0.67 grados norte y 23.47 grados este, en el sur del mar de la Tranquilidad. Los mares lunares son llanuras de lava solidificada que se ven oscuras desde la Tierra. La NASA eligió esa zona porque era relativamente lisa y se podía alcanzar con la luz del Sol en un ángulo adecuado para ver las sombras.",
  },
  {
    id: "rocas-capsulas-tiempo",
    bannerImage: '/assets/apollo11/infographic_m3/banner_rocas-capsulas-tiempo.webp',
    bannerCaption: "El Apolo 11 trajo 21.5 kg de rocas y polvo; la Luna conserva rocas de hace más de 4,000 millones de años porque no recicla su corteza.",
    title: "Rocas lunares: cápsulas del tiempo",
    color: '#7D7466',
    btnImage: '/assets/apollo11/infographic_m3/btn_rocas-capsulas-tiempo.webp',
    image: '/assets/apollo11/infographic_m3/hero_rocas-capsulas-tiempo.webp',
    content: [
      "Armstrong y Aldrin recogieron 21.5 kilogramos de rocas y polvo lunar, que regresaron a la Tierra en cajas selladas de aluminio. Entre las seis misiones Apolo que aterrizaron, los astronautas trajeron en total 382 kilogramos de muestras. La mayoría se guarda en el Centro Espacial Johnson, en Houston, en cámaras llenas de nitrógeno para que no reaccionen con el oxígeno ni con la humedad del aire. Investigadores de todo el mundo siguen pidiendo pequeñas porciones para estudiarlas.",
      "Las rocas lunares son valiosas porque conservan la historia del sistema solar. En la Tierra, la tectónica de placas hunde la corteza antigua en el manto y la funde, y el viento, el agua y la vida erosionan las rocas de la superficie. Por eso quedan muy pocas rocas terrestres de más de 4,000 millones de años. La Luna no tiene placas tectónicas activas, ni lluvia, ni ríos, así que muchas de sus rocas han permanecido casi intactas desde su formación.",
      "Las rocas del Apolo 11 eran sobre todo basaltos, rocas volcánicas formadas cuando la lava se enfrió y se solidificó. Los científicos midieron su edad mediante la desintegración de elementos radiactivos y descubrieron que tenían entre 3,600 y 3,900 millones de años. Eso demostró que el mar de la Tranquilidad se formó por enormes coladas de lava en una época muy antigua. Además, esos basaltos tenían mucho más titanio que los de la Tierra.",
      "En las muestras del Apolo 11 se descubrió un mineral nuevo que no se conocía en la Tierra. Se llamó armalcolita, una palabra formada con las primeras letras de los apellidos de los tres tripulantes: Armstrong, Aldrin y Collins. Más tarde también se encontró en algunos lugares de la Tierra. Los científicos hallaron además pequeñas esferas de vidrio en el polvo lunar, formadas cuando los impactos de meteoritos fundieron la roca y las gotas se enfriaron en el vacío.",
      "Las muestras del Apolo también ayudaron a entender cómo nació la Luna. Las rocas lunares tienen proporciones de isótopos de oxígeno casi idénticas a las de la Tierra, pero muy poca agua y pocos elementos que se evaporan fácilmente. Esto apoya la hipótesis del gran impacto: hace unos 4,500 millones de años, un cuerpo del tamaño de Marte chocó contra la Tierra joven, y los restos de esa colisión formaron la Luna."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Al regresar, los astronautas del Apolo 11 pasaron 21 días en cuarentena por si traían microbios lunares. Las rocas también se analizaron en laboratorios aislados, y los científicos incluso pusieron polvo lunar en contacto con plantas y animales para comprobar que no era peligroso. No se encontró ningún ser vivo, y la cuarentena se suspendió después del Apolo 14." },
      { label: "Dato Científico", icon: "atom", text: "La datación radiométrica funciona como un reloj natural. Algunos átomos radiactivos, como el potasio-40, se transforman en otros átomos a un ritmo constante y conocido. Midiendo cuánto del átomo original queda en una roca y cuánto se ha transformado, los científicos calculan cuánto tiempo ha pasado desde que la roca se solidificó." }
    ],
    fact: "Una de las rocas más famosas del programa Apolo es la «roca del Génesis», recogida por la misión Apolo 15 en 1971. Es un trozo de anortosita, una roca clara que formó parte de la corteza original de la Luna, y tiene unos 4,000 millones de años o más. Los científicos creen que esa corteza se formó cuando minerales ligeros flotaron sobre un océano de magma que cubría toda la Luna joven.",
  },
  {
    id: "crateres-cronologia-impactos",
    bannerImage: '/assets/apollo11/infographic_m3/banner_crateres-cronologia-impactos.webp',
    bannerCaption: "Contando cráteres y comparándolos con la edad de las rocas del Apolo, los científicos estiman la edad de cada región lunar.",
    title: "Cráteres: el reloj de la superficie",
    color: '#6B6E8C',
    btnImage: '/assets/apollo11/infographic_m3/btn_crateres-cronologia-impactos.webp',
    image: '/assets/apollo11/infographic_m3/hero_crateres-cronologia-impactos.webp',
    content: [
      "La superficie de la Luna está cubierta de cráteres de todos los tamaños, desde agujeros microscópicos en granos de polvo hasta cuencas de más de 2,000 kilómetros de diámetro. Casi todos se formaron por el impacto de asteroides, cometas y meteoritos. En la Tierra, la atmósfera frena o desintegra muchos objetos pequeños, y la erosión borra los cráteres antiguos. En la Luna no hay atmósfera que los detenga ni erosión que los borre, así que casi todos los impactos dejan una marca.",
      "Si observas la Luna con un telescopio, verás que algunas zonas tienen muchos cráteres y otras muy pocos. Las zonas claras, llamadas tierras altas, están llenas de cráteres superpuestos. Los mares oscuros tienen menos. La explicación es sencilla: cuanto más tiempo lleva expuesta una superficie, más impactos acumula. Por eso las tierras altas son más antiguas que los mares, que se formaron después, cuando la lava cubrió los cráteres anteriores.",
      "Los científicos llaman cronología de impactos a la técnica de estimar la edad de una región contando cuántos cráteres tiene por cada kilómetro cuadrado. Para que funcione, hace falta calibrarla. Aquí las muestras del Apolo fueron fundamentales: como se conocía el lugar exacto de cada roca y se podía medir su edad en el laboratorio, los investigadores relacionaron la cantidad de cráteres de cada zona de aterrizaje con su edad real.",
      "También se puede estimar la edad de un cráter por su aspecto. Los cráteres recientes tienen bordes afilados y rayos brillantes de material expulsado que se extienden a su alrededor. Con el tiempo, los impactos pequeños y las partículas del viento solar suavizan los bordes y oscurecen los rayos. El cráter Tycho, por ejemplo, tiene rayos que se ven desde la Tierra con binoculares, y se calcula que se formó hace unos 100 millones de años, un tiempo corto en la historia lunar.",
      "La cronología de impactos no solo sirve para la Luna. Una vez calibrada con las rocas del Apolo, los científicos la aplican a Marte, Mercurio y otros cuerpos de los que no tienen muestras. Así estiman, por ejemplo, la edad de antiguos ríos o volcanes marcianos. Por eso las rocas que trajeron los astronautas siguen siendo una referencia para estudiar todo el sistema solar, más de cincuenta años después."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante su paseo lunar, Armstrong caminó unos 60 metros hasta el borde de un cráter pequeño, de unos 33 metros de ancho, que más tarde se llamó Little West. Fue la mayor distancia que un astronauta del Apolo 11 se alejó del Eagle. Desde allí fotografió el interior del cráter, donde había rocas expulsadas desde debajo de la superficie." },
      { label: "Dato Científico", icon: "atom", text: "Un meteorito que choca contra la Luna puede viajar a más de 70,000 kilómetros por hora. Al impactar, su energía es tan grande que la roca se funde y parte se evapora. El cráter que se forma suele ser unas diez veces más ancho que el objeto que lo produjo, y casi siempre es redondo, aunque el impacto haya llegado de lado." }
    ],
    fact: "La cuenca Polo Sur-Aitken, en la cara oculta de la Luna, es uno de los cráteres de impacto más grandes del sistema solar: mide unos 2,500 kilómetros de diámetro y varios kilómetros de profundidad. Es tan antigua que sus bordes apenas se reconocen. En 2024, la sonda china Chang'e 6 aterrizó dentro de esa cuenca y trajo las primeras muestras de la cara oculta de la Luna.",
  },
  {
    id: "polos-frios-hielo",
    bannerImage: '/assets/apollo11/infographic_m3/banner_polos-frios-hielo.webp',
    bannerCaption: "En los polos lunares hay cráteres que nunca reciben luz solar, con temperaturas cercanas a -250 °C, donde se conserva hielo de agua.",
    title: "Cráteres en sombra eterna y hielo lunar",
    color: '#5E7A8A',
    btnImage: '/assets/apollo11/infographic_m3/btn_polos-frios-hielo.webp',
    image: '/assets/apollo11/infographic_m3/hero_polos-frios-hielo.webp',
    content: [
      "El eje de rotación de la Luna está casi vertical respecto a su órbita alrededor del Sol: solo se inclina unos 1.5 grados. Por eso, en los polos lunares el Sol siempre aparece muy bajo sobre el horizonte. En el fondo de algunos cráteres profundos cercanos a los polos, la luz solar nunca llega. Los científicos llaman a esos lugares regiones de sombra permanente. Algunas llevan sin recibir un rayo de Sol directo desde hace miles de millones de años.",
      "Esas regiones están entre los lugares más fríos conocidos del sistema solar. El instrumento Diviner, a bordo de la sonda Lunar Reconnaissance Orbiter de la NASA, midió en ellas temperaturas por debajo de los 230 grados bajo cero. En el cráter Hermite, cerca del polo norte, registró unos 26 kelvin, es decir, alrededor de 247 grados bajo cero, una temperatura más baja que la de la superficie de Plutón. A esa temperatura, el agua congelada puede durar indefinidamente.",
      "El 9 de octubre de 2009, la misión LCROSS de la NASA lanzó una etapa de cohete contra el cráter Cabeus, cerca del polo sur lunar. El impacto levantó una nube de material que una pequeña sonda analizó antes de estrellarse también. Los instrumentos detectaron agua en esa nube. Los científicos calcularon que el suelo de ese lugar contenía alrededor de un 5 % de agua en masa, mezclada con el regolito, es decir, con el polvo y los fragmentos de roca.",
      "Ese mismo año, el instrumento M3 de la NASA, a bordo de la sonda india Chandrayaan-1, detectó señales de agua y de grupos hidroxilo en la superficie de amplias zonas de la Luna. ¿De dónde viene ese hielo? Los científicos proponen varias fuentes: cometas y asteroides que chocaron contra la Luna, el viento solar, que aporta hidrógeno que reacciona con el oxígeno de las rocas, y gases liberados por antiguos volcanes lunares. Probablemente todas contribuyeron.",
      "El hielo de los polos es muy importante para el futuro de la exploración. Con él se podría obtener agua para beber, oxígeno para respirar e hidrógeno y oxígeno para fabricar propelente de cohetes. Transportar agua desde la Tierra es muy caro, así que extraerla en la Luna haría posibles estancias más largas. Por eso el programa Artemis de la NASA ha elegido la región del polo sur lunar como destino para sus próximas misiones tripuladas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Junto a los cráteres en sombra eterna hay picos y bordes que reciben luz solar casi todo el tiempo, porque el Sol da vueltas a ras del horizonte sin ocultarse del todo. Esos lugares serían ideales para instalar paneles solares, con hielo a pocos kilómetros. Por eso las futuras bases lunares podrían construirse cerca de esos puntos." },
      { label: "Dato Científico", icon: "atom", text: "El kelvin es la unidad de temperatura que usan los científicos. Empieza en el cero absoluto, la temperatura más baja posible, en la que las partículas casi dejan de moverse. Cero kelvin equivalen a 273.15 grados bajo cero. Para pasar de kelvin a grados Celsius, se resta 273.15: por eso 26 kelvin son unos 247 grados bajo cero." }
    ],
    fact: "En agosto de 2023, la misión india Chandrayaan-3 consiguió aterrizar cerca del polo sur de la Luna, la primera nave en posarse tan cerca de esa región. Su pequeño vehículo, Pragyan, recorrió unos 100 metros y midió la composición del suelo, donde detectó azufre. Las agencias espaciales siguen enviando sondas a los polos para localizar dónde se concentra el hielo.",
  },
  {
    id: "tubos-lava-polvo-lunar",
    bannerImage: '/assets/apollo11/infographic_m3/banner_tubos-lava-polvo-lunar.webp',
    bannerCaption: "Bajo la Luna hay túneles de lava antigua que podrían proteger futuras bases; su polvo afilado olía a pólvora quemada.",
    title: "Tubos de lava y el olor del polvo lunar",
    color: '#8A7560',
    btnImage: '/assets/apollo11/infographic_m3/btn_tubos-lava-polvo-lunar.webp',
    image: '/assets/apollo11/infographic_m3/hero_tubos-lava-polvo-lunar.webp',
    content: [
      "Hace más de 3,000 millones de años, ríos de lava fluían por la superficie lunar. Cuando la parte superior de una colada se enfriaba y se endurecía, la lava del interior seguía corriendo por debajo. Al vaciarse, dejaba un túnel hueco: un tubo de lava. En la Tierra hay tubos de lava en lugares como Hawái o las islas Canarias. En la Luna, con una gravedad seis veces menor, esos túneles podrían ser mucho más grandes y medir decenas o cientos de metros de ancho.",
      "En 2009, la sonda japonesa Kaguya fotografió un agujero de unos 65 metros de diámetro en la región de las colinas de Marius. Era un pozo, una abertura donde el techo de un túnel subterráneo se había derrumbado. Desde entonces, las cámaras de la sonda Lunar Reconnaissance Orbiter han encontrado más de 200 pozos en la Luna. Algunos tienen paredes verticales y fondos en sombra que podrían conectar con cavidades más grandes bajo la superficie.",
      "En 2024, un equipo de investigadores italianos analizó datos de radar tomados por la Lunar Reconnaissance Orbiter sobre un pozo del mar de la Tranquilidad, la misma gran región donde aterrizó el Apolo 11. Los ecos de radar indicaron que, desde el fondo del pozo, se abre una cavidad que se extiende varias decenas de metros bajo tierra. Fue la primera evidencia directa de una cueva accesible bajo la superficie de la Luna.",
      "Los tubos de lava interesan a los planificadores de bases lunares. En la superficie, los astronautas estarían expuestos a la radiación del Sol y de las estrellas lejanas, a los micrometeoritos y a cambios de temperatura enormes entre el día y la noche lunares. Bajo decenas de metros de roca, la temperatura sería mucho más estable y la radiación mucho menor. Un túnel natural podría servir como refugio sin necesidad de excavar ni de transportar materiales pesados.",
      "El polvo lunar, llamado regolito, fue uno de los problemas más molestos para los astronautas. Sus granos son muy afilados, porque en la Luna no hay agua ni viento que los redondeen. Se pegaba a los trajes por la electricidad estática y entraba en las juntas y en las cremalleras. Al volver a la cabina y quitarse el casco, los astronautas notaban un olor. Los tripulantes de varias misiones Apolo lo compararon con pólvora quemada o con ceniza húmeda de chimenea."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Después de cada salida a la superficie, el polvo cubría los trajes, las herramientas y el suelo de la cabina. Durante el regreso a la Tierra, parte flotaba en la nave por la ingravidez. En la misión Apolo 17, el geólogo Harrison Schmitt sufrió irritación nasal y estornudos, que describió como una especie de fiebre del heno lunar, después de respirar ese polvo." },
      { label: "Dato Científico", icon: "atom", text: "¿Por qué huele el polvo lunar? En la Luna, el polvo nunca ha tocado oxígeno ni agua, y sus granos tienen superficies con enlaces químicos libres, listos para reaccionar. Una explicación propuesta por científicos de la NASA es que, al entrar en la cabina con aire y humedad, esos granos reaccionaban rápidamente, de forma parecida a la combustión lenta, y liberaban el olor que percibían los astronautas." }
    ],
    fact: "En la Tierra, las muestras de polvo lunar no huelen a nada. Los científicos que las estudian en el Centro Espacial Johnson dicen que no perciben ningún olor, porque el polvo lleva décadas en contacto con nitrógeno y pequeñas cantidades de oxígeno y ya ha reaccionado. Solo los doce astronautas que caminaron en la Luna olieron ese polvo fresco, recién llegado del vacío.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '201,179,126' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(201,179,126,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo11M3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#8C7A5A", "#8C5E5E", "#6F7D5C", "#7D7466", "#6B6E8C", "#5E7A8A", "#8A7560"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#C9B37E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#C9B37E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradApollo11M3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DESCENSO AL MAR DE LA TRANQUILIDAD</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(201,179,126,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MISIONES APOLO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(201,179,126,0.2)'}`,
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
          layoutId="activeDotApollo11M3"
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
        {node.bannerImage && (
              <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                <img src={node.bannerImage} alt={node.bannerCaption || ''}
                     style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                {node.bannerCaption && (
                  <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                              fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                              textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                    {node.bannerCaption}
                  </p>
                )}
              </div>
            )}
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
      border: '1px solid rgba(201,179,126,0.15)',
    }}>
      <Star size={14} style={{ color: '#C9B37E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C9B37E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(201,179,126,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C9B37E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Apollo11M3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(201,179,126,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(201,179,126,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(201,179,126,0.08)', borderRadius: '16px',
              border: '1px solid rgba(201,179,126,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C9B37E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Piloto Maestro! Entiendes el descenso del Eagle y los secretos de la Luna.
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
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

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
