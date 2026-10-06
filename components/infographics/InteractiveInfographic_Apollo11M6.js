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
  "NASA Manned Spacecraft Center (1969). Apollo 11 Mission Report, MSC-00171. Houston: NASA.",
  "Woods, D. y O'Brien, F. (eds.). Apollo 11 Flight Journal. NASA History Office (history.nasa.gov/afj).",
  "Mangus, S. y Larsen, W. (2004). Lunar Receiving Laboratory Project History. NASA/CR-2004-208938.",
  "Collins, M. (1974). Carrying the Fire: An Astronaut's Journeys. Nueva York: Farrar, Straus and Giroux.",
  "Hartmann, W. K. y Davis, D. R. (1975). Satellite-sized planetesimals and lunar origin. Icarus, 24(4), 504-515.",
  "Colaprete, A. et al. (2010). Detection of Water in the LCROSS Ejecta Plume. Science, 330(6003), 463-468.",
  "Stone, E. C. et al. (2013). Voyager 1 Observes Low-Energy Galactic Cosmic Rays in a Region Depleted of Heliospheric Ions. Science, 341(6142), 150-153.",
  "NASA (2020). Artemis Plan: NASA's Lunar Exploration Program Overview. Washington D. C.: NASA."
];

const INFOGRAPHIC_NODES = [
  {
    id: "despegue-lunar-y-regreso",
    bannerImage: '/assets/apollo11/infographic_m6/banner_despegue-lunar-y-regreso.webp',
    bannerCaption: "El 21 de julio de 1969 el Eagle despegó de la Luna; al día siguiente, el Columbia encendió su motor rumbo a la Tierra.",
    title: "Adiós a la Luna: el viaje de vuelta",
    color: '#4F6D7A',
    btnImage: '/assets/apollo11/infographic_m6/btn_despegue-lunar-y-regreso.webp',
    image: '/assets/apollo11/infographic_m6/hero_despegue-lunar-y-regreso.webp',
    content: [
      "El 21 de julio de 1969, a las 17:54 UTC, la etapa de ascenso del módulo lunar Eagle despegó del Mar de la Tranquilidad con Neil Armstrong y Buzz Aldrin a bordo. Su único motor tenía que funcionar a la primera, porque no existía ningún plan de rescate desde la superficie. La etapa de descenso se quedó en la Luna como plataforma de lanzamiento. En una de sus patas sigue fija una placa que dice que llegaron en paz en nombre de toda la humanidad.",
      "Mientras tanto, Michael Collins esperaba en órbita dentro del módulo de mando Columbia, dando una vuelta a la Luna cada dos horas, más o menos. A las 21:35 UTC de ese mismo día las dos naves se acoplaron otra vez. Armstrong y Aldrin pasaron por el túnel de conexión al Columbia con las cajas de muestras lunares y los rollos de película. Después, la etapa de ascenso del Eagle fue soltada y quedó en órbita lunar; su destino final todavía no se conoce con certeza.",
      "El paso decisivo llegó el 22 de julio a las 04:55 UTC, cuando la nave volaba por detrás de la Luna, sin contacto de radio con la Tierra. El motor principal del módulo de servicio se encendió durante unos dos minutos y medio para acelerar la nave y sacarla de la órbita lunar. Esta maniobra se llama inyección transterrestre, o TEI por sus siglas en inglés. En Houston esperaron en silencio hasta que el Columbia salió por el borde de la Luna y confirmó que el encendido había funcionado.",
      "El viaje de regreso duró unas 60 horas. Durante ese tiempo, la gravedad de la Tierra aceleró la nave de forma continua, como una piedra que cae desde muy alto. Solo hizo falta una pequeña corrección de rumbo con los propulsores, porque la trayectoria calculada en Houston y por la computadora de a bordo era muy precisa. Para repartir el calor del Sol, la nave giraba lentamente sobre sí misma, una maniobra que los ingenieros apodaron «barbacoa».",
      "El 23 de julio, víspera del amerizaje, los tres astronautas hicieron su última transmisión de televisión desde el espacio. Collins recordó a los miles de trabajadores que construyeron el cohete Saturno V y la nave, Aldrin habló del significado del viaje para la humanidad y Armstrong agradeció a todos los que lo hicieron posible. Ese mismo día, por un pronóstico de tormentas, el punto de amerizaje previsto en el Pacífico se desplazó varios cientos de kilómetros."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En cada vuelta a la Luna, Michael Collins pasaba unos 48 minutos al otro lado, sin contacto de radio con la Tierra ni con sus compañeros. Algunos periódicos lo llamaron el hombre más solo de la historia. Sin embargo, en su libro Carrying the Fire, publicado en 1974, explicó que no se sentía solo, sino atento, confiado y satisfecho con su trabajo. En total, el Columbia completó 30 órbitas alrededor de la Luna." },
      { label: "Dato Científico", icon: "atom", text: "Escapar de la Luna es mucho más fácil que escapar de la Tierra. La velocidad de escape lunar es de unos 2.4 km por segundo, frente a los 11.2 km por segundo de nuestro planeta, porque la gravedad en la superficie lunar es aproximadamente la sexta parte de la terrestre. Por eso el pequeño motor del Eagle bastó para volver a órbita, mientras que salir de la Tierra necesitó los tres pisos del enorme Saturno V." }
    ],
    fact: "Junto a la etapa de descenso del Eagle quedaron objetos simbólicos: un parche de la misión Apolo 1, en recuerdo de Gus Grissom, Ed White y Roger Chaffee, que murieron en un incendio en 1967; medallas en honor de los cosmonautas soviéticos Yuri Gagarin y Vladímir Komarov; una pequeña rama de olivo dorada; y un disco de silicio con mensajes de buena voluntad de líderes de 73 países.",
  },
  {
    id: "reentrada-escudo-termico",
    bannerImage: '/assets/apollo11/infographic_m6/banner_reentrada-escudo-termico.webp',
    bannerCaption: "El 24 de julio de 1969 el Columbia entró en la atmósfera a casi 11 km por segundo, protegido por un escudo térmico ablativo.",
    title: "La reentrada: atravesar el fuego",
    color: '#8A5A44',
    btnImage: '/assets/apollo11/infographic_m6/btn_reentrada-escudo-termico.webp',
    image: '/assets/apollo11/infographic_m6/hero_reentrada-escudo-termico.webp',
    content: [
      "Unos 15 minutos antes de tocar la atmósfera, la tripulación soltó el módulo de servicio, que contenía el motor principal, los tanques de oxígeno y las celdas de combustible. Desde ese momento, los tres astronautas viajaron solo en el módulo de mando, una cápsula cónica de unos 3.9 metros de diámetro. El módulo de servicio, que no tenía escudo térmico, se desintegró al entrar en la atmósfera. La cápsula se orientó para que su base ancha, cubierta por el escudo, quedara hacia adelante.",
      "A las 16:35 UTC, el Columbia llegó a la llamada interfaz de entrada, a unos 122 kilómetros de altura, viajando a casi 11 kilómetros por segundo, cerca de 40,000 km/h. A esa velocidad se cruzaría la península ibérica de norte a sur en menos de dos minutos. Si la nave entraba con un ángulo demasiado inclinado, la frenada sería tan brusca que el calor y la fuerza dañarían la cápsula. Si entraba demasiado plana, podía rebotar en el aire de vuelta al espacio.",
      "Al chocar contra el aire, la cápsula comprime los gases que tiene delante tan rápido que se calientan y forman plasma, un gas tan caliente que sus átomos pierden electrones. El escudo térmico soportó temperaturas de unos 2,760 °C, suficientes para fundir el acero. Aun así, esa cifra es menor que los cerca de 5,500 °C de la superficie del Sol. El escudo estaba hecho de AVCOAT, una resina epóxica inyectada en un panal de fibra de vidrio con cientos de miles de celdas rellenadas a mano.",
      "El AVCOAT es un material ablativo: en lugar de reflejar el calor, se carboniza y se desprende capa a capa, llevándose la energía con los fragmentos. El escudo era más grueso en la base, la zona que recibe más calor. Gracias a ello, dentro de la cabina la temperatura se mantuvo soportable para la tripulación. Más de 50 años después, la nave Orion del programa Artemis usa una versión actualizada del mismo material para regresar de la Luna.",
      "El plasma que rodeaba la cápsula bloqueó las ondas de radio durante unos tres minutos. Era un apagón de comunicaciones esperado, pero el centro de control no podía saber cómo estaba la tripulación. Mientras frenaban, los astronautas sintieron su cuerpo varias veces más pesado de lo normal, porque la desaceleración los empujaba contra los asientos. Cuando el plasma se disipó, los aviones de rastreo volvieron a recibir la señal del Columbia, que ya caía mucho más despacio sobre el Pacífico."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Antes de arriesgar a una tripulación, la NASA probó el escudo térmico sin astronautas. El 9 de noviembre de 1967, la misión Apolo 4 lanzó por primera vez un Saturno V y devolvió una cápsula vacía a la atmósfera a una velocidad parecida a la de un regreso lunar. La primera tripulación que volvió de la Luna y sobrevivió a ese calor fue la del Apolo 8, que amerizó el 27 de diciembre de 1968." },
      { label: "Dato Científico", icon: "atom", text: "La energía de movimiento crece con el cuadrado de la velocidad. A 11 km por segundo, cada kilogramo de la cápsula lleva unos 60 millones de julios de energía cinética, unas 14 veces la energía química de un kilogramo de TNT. Toda esa energía tenía que convertirse en calor y disiparse en el aire durante unos pocos minutos. Por eso la reentrada es una de las fases más delicadas de cualquier regreso desde la Luna." }
    ],
    fact: "La cápsula Columbia se exhibe hoy en el Museo Nacional del Aire y el Espacio del Instituto Smithsonian, en Washington D. C., y su escudo todavía muestra las marcas de la reentrada. En 2016, un escaneo en 3D del interior reveló un mensaje escrito a mano por Michael Collins en una pared de la cabina, donde describía al Columbia como la mejor nave salida de la línea de producción.",
  },
  {
    id: "paracaidas-y-amerizaje",
    bannerImage: '/assets/apollo11/infographic_m6/banner_paracaidas-y-amerizaje.webp',
    bannerCaption: "El Columbia amerizó el 24 de julio de 1969 a las 16:50 UTC, a unos 24 km del portaaviones USS Hornet.",
    title: "Paracaídas y amerizaje en el Pacífico",
    color: '#3F6E73',
    btnImage: '/assets/apollo11/infographic_m6/btn_paracaidas-y-amerizaje.webp',
    image: '/assets/apollo11/infographic_m6/hero_paracaidas-y-amerizaje.webp',
    content: [
      "Después de la reentrada, la cápsula todavía caía demasiado rápido para tocar el agua. A unos 7,300 metros de altura se abrieron dos paracaídas de frenado, llamados drogues, que la estabilizaron y redujeron su velocidad. A unos 3,000 metros, los drogues se soltaron y salieron tres paracaídas principales a franjas anaranjadas y blancas, de unos 25.4 metros de diámetro cada uno. Con los tres abiertos, la velocidad de caída bajó a unos 35 km/h, parecida a la de un ciclista rápido.",
      "A las 16:50:35 UTC del 24 de julio de 1969, el Columbia tocó el océano Pacífico al suroeste de Hawái, cerca de los 13° de latitud norte y 169° de longitud oeste. La misión había durado 8 días, 3 horas, 18 minutos y 35 segundos desde el despegue en Florida. El portaaviones USS Hornet, al mando del capitán Carl Seiberlich, estaba a solo 24 km del punto de amerizaje. La nave había recorrido más de 1.5 millones de kilómetros entre la ida y la vuelta.",
      "Tras el golpe contra el agua, la cápsula quedó flotando boca abajo, con la punta hacia el fondo del mar, una posición que la NASA llamaba «Stable II». Para corregirla, la tripulación infló tres bolsas de aire situadas en la punta de la nave, que la enderezaron en pocos minutos. Dentro, los astronautas notaron el balanceo de las olas después de más de ocho días en ingravidez. Era la primera señal de que su cuerpo debía adaptarse otra vez a la gravedad terrestre.",
      "Los helicópteros Sea King del escuadrón HS-4 de la Marina llegaron enseguida. El más conocido, el «Helicóptero 66», pilotado por el comandante Donald Jones, dirigió la recuperación. Nadadores de la Marina saltaron al agua, colocaron un collar flotante alrededor de la cápsula y unieron balsas inflables a su costado. El collar evitaba que la nave se hundiera si entraba agua al abrir la escotilla, y las balsas servían de plataforma para los astronautas y los rescatistas.",
      "La recuperación formaba parte de una operación de la Marina de Estados Unidos con barcos y aviones repartidos por el Pacífico y el Atlántico, preparados por si la nave tenía que regresar antes de tiempo o caía lejos del punto previsto. Los aviones de rastreo localizaron la cápsula por radio y por la luz de su baliza. El amerizaje del Apolo 11 confirmó que todo el sistema de regreso, desde el escudo hasta los paracaídas, funcionaba con una tripulación procedente de la superficie lunar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El USS Hornet es un portaaviones de la clase Essex que entró en servicio en 1943 y combatió en la Segunda Guerra Mundial. Además del Apolo 11, recuperó a la tripulación del Apolo 12 el 24 de noviembre de 1969. Hoy es un barco museo anclado en Alameda, California, donde se exhibe una de las instalaciones móviles de cuarentena usadas por los astronautas del programa Apolo." },
      { label: "Dato Científico", icon: "atom", text: "La fuerza de frenado de un paracaídas crece con su área y con el cuadrado de la velocidad. Cada paracaídas principal del Apolo cubría más de 500 metros cuadrados, así que los tres juntos sumaban unos 1,500 metros cuadrados para frenar una cápsula de casi 5 toneladas. El sistema estaba diseñado para amerizar con seguridad incluso con solo dos paracaídas, algo que ocurrió de verdad en el Apolo 15, en agosto de 1971." }
    ],
    fact: "Las cápsulas de Estados Unidos regresaron al mar desde el programa Mercury, mientras que las soviéticas aterrizaban en tierra firme. La nave Orion mantiene la tradición: el 11 de diciembre de 2022, al final de la misión Artemis I, amerizó en el Pacífico cerca de la isla Guadalupe, frente a Baja California, México, y fue recuperada por el buque USS Portland.",
  },
  {
    id: "cuarentena-biologica",
    bannerImage: '/assets/apollo11/infographic_m6/banner_cuarentena-biologica.webp',
    bannerCaption: "Por precaución, los astronautas del Apolo 11 pasaron 21 días aislados, contados desde que dejaron la superficie lunar.",
    title: "Cuarentena: ¿gérmenes de la Luna?",
    color: '#5E6B4E',
    btnImage: '/assets/apollo11/infographic_m6/btn_cuarentena-biologica.webp',
    image: '/assets/apollo11/infographic_m6/hero_cuarentena-biologica.webp',
    content: [
      "En 1969 nadie podía asegurar que la Luna estuviera libre de microbios. La mayoría de los científicos pensaba que era muy improbable, porque la superficie lunar no tiene aire ni agua líquida y recibe radiación intensa del Sol. Aun así, un error podía tener consecuencias graves. Por eso la NASA y varias agencias de salud y agricultura de Estados Unidos acordaron un protocolo contra la «contaminación inversa», es decir, contra la posibilidad de traer a la Tierra algo vivo desde otro mundo.",
      "Cuando se abrió la escotilla, el nadador de descontaminación, el teniente Clancy Hatleberg, entregó a los astronautas unos trajes llamados BIG, siglas en inglés de prendas de aislamiento biológico. Tenían capucha y una mascarilla que filtraba el aire exhalado. Los tres se los pusieron dentro de la cápsula, salieron a la balsa y fueron rociados con desinfectante. Luego, el Helicóptero 66 los subió uno a uno con una canastilla y los llevó a la cubierta del USS Hornet.",
      "En el Hornet entraron directamente en la Instalación Móvil de Cuarentena, un remolque de aluminio Airstream modificado y sellado, de unos 11 metros de largo. Con ellos quedaron aislados el médico William Carpentier y el ingeniero John Hirasaki, que había ayudado a manejar la cápsula y las muestras. Dentro había literas, una pequeña cocina, un baño y una ventana. El aire del remolque salía por filtros para que ningún posible germen escapara al exterior.",
      "El presidente Richard Nixon esperaba en el barco. Desde fuera de la ventana del remolque, habló con los astronautas por un intercomunicador y les dijo que aquella era la semana más grande en la historia del mundo desde la Creación. A veces se cita como el día más importante, pero la frase original habla de una semana. Después, el Hornet navegó hasta Pearl Harbor, en Hawái, adonde llegó el 26 de julio con el remolque sellado sobre su cubierta.",
      "Desde Hawái, el remolque viajó en un avión de carga C-141 hasta la base Ellington, cerca de Houston. El 28 de julio, los astronautas entraron en el Laboratorio de Recepción Lunar del Centro de Naves Espaciales Tripuladas, hoy Centro Espacial Johnson. Allí siguieron aislados mientras otros equipos examinaban las rocas. El 10 de agosto de 1969, sin haber detectado ningún microbio lunar, la NASA los dejó salir: habían pasado 21 días desde el despegue del Eagle."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En el Laboratorio de Recepción Lunar se pusieron muestras de suelo lunar en contacto con ratones, codornices, peces, ostras, insectos y plantas para comprobar si sufrían algún daño. Ninguno enfermó por esa exposición. Las tripulaciones del Apolo 12 y del Apolo 14 también pasaron cuarentena, pero en 1971 la NASA la eliminó, y desde el Apolo 15 los astronautas regresaron sin aislamiento." },
      { label: "Dato Científico", icon: "atom", text: "La cuarentena del Apolo dio origen a reglas que hoy se llaman protección planetaria. El Tratado del Espacio Exterior de 1967, en su artículo IX, pide evitar la contaminación dañina de otros cuerpos celestes y de la Tierra. El Comité de Investigación Espacial, conocido como COSPAR, clasifica las misiones por su riesgo; traer muestras de Marte se considera la categoría más estricta, de regreso restringido a la Tierra." }
    ],
    fact: "Al llegar a Honolulu, Armstrong, Aldrin y Collins firmaron un formulario de aduanas, igual que cualquier viajero que entra en Estados Unidos. En la casilla de procedencia figura la Luna, con escala en Cabo Kennedy, y en la carga declararon rocas y polvo lunar. El documento se conserva como una curiosidad histórica y muestra cómo la burocracia también se aplicó al primer viaje a otro mundo.",
  },
  {
    id: "rocas-lunares-y-legado",
    bannerImage: '/assets/apollo11/infographic_m6/banner_rocas-lunares-y-legado.webp',
    bannerCaption: "El Apolo 11 trajo 21.5 kg de roca y suelo lunar; su estudio cambió lo que sabemos sobre el origen de la Luna.",
    title: "Las rocas lunares y el legado del Apolo 11",
    color: '#6E6259',
    btnImage: '/assets/apollo11/infographic_m6/btn_rocas-lunares-y-legado.webp',
    image: '/assets/apollo11/infographic_m6/hero_rocas-lunares-y-legado.webp',
    content: [
      "Armstrong y Aldrin trajeron 21.5 kilogramos de material lunar: rocas, suelo fino y dos tubos con muestras del subsuelo, guardados en cajas de aluminio selladas. En el Laboratorio de Recepción Lunar, los técnicos las abrieron dentro de cámaras con guantes y en ambiente controlado, para no contaminarlas con el aire húmedo de la Tierra. Tras la cuarentena, la NASA repartió fragmentos a más de un centenar de equipos de investigación de distintos países.",
      "Las rocas del Mar de la Tranquilidad resultaron ser basaltos, una roca volcánica parecida a la de Hawái, pero sin rastro de agua y con mucho titanio. Midiendo elementos radiactivos, los geólogos calcularon que esa lava se solidificó hace entre 3,600 y 3,900 millones de años. Así se confirmó que los «mares» oscuros que vemos desde la Tierra son enormes llanuras de lava muy antigua, y no océanos secos ni capas de polvo acumulado.",
      "Entre el suelo aparecieron pequeños fragmentos blancos de anortosita, una roca formada sobre todo por un mineral llamado plagioclasa. Su presencia llevó en 1970 a proponer que la Luna joven estuvo cubierta por un océano de magma de cientos de kilómetros de profundidad, cuyos minerales ligeros flotaron y formaron la corteza clara de las tierras altas. También se identificó un mineral nuevo, la armalcolita, cuyo nombre combina los apellidos de Armstrong, Aldrin y Collins.",
      "Entre 1969 y 1972, las seis misiones Apolo que alunizaron trajeron 382 kg de muestras. Comparándolas, se estableció que la Luna se formó hace unos 4,500 millones de años y que sus rocas tienen proporciones de isótopos de oxígeno casi idénticas a las terrestres. Con esos datos, en 1975 William Hartmann y Donald Davis propusieron la hipótesis del Gran Impacto: un cuerpo del tamaño de Marte chocó con la Tierra joven y los restos formaron la Luna. Hoy es la explicación más aceptada, aunque sus detalles se siguen debatiendo.",
      "El 13 de agosto de 1969, Nueva York, Chicago y Los Ángeles organizaron desfiles en honor de la tripulación. El 29 de septiembre comenzó una gira mundial de unos 38 días cuya primera parada fue la Ciudad de México. El legado técnico también fue enorme: el programa Apolo impulsó el uso de circuitos integrados en computadoras de navegación y formó a una generación de ingenieros. Collins, Aldrin y Armstrong no volvieron a viajar al espacio después del Apolo 11."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Algunas muestras del Apolo se guardaron sin abrir durante décadas, a la espera de mejores instrumentos. En noviembre de 2019, dentro del programa ANGSA, la NASA abrió un tubo del Apolo 17 que había permanecido sellado desde 1972. Así, científicos que no habían nacido durante el programa Apolo pudieron estudiar suelo lunar intacto con técnicas que en 1972 no existían." },
      { label: "Dato Científico", icon: "atom", text: "Para fechar las rocas se usa la desintegración radiactiva, que funciona como un reloj natural. El potasio-40 se transforma en argón-40 con una vida media de unos 1,250 millones de años, y el uranio-238 se convierte en plomo-206 con una vida media de unos 4,470 millones de años. Midiendo cuánto elemento original queda y cuánto producto se ha acumulado, se calcula cuándo se solidificó la roca." }
    ],
    fact: "Las 382 kg de muestras del programa Apolo se dividen en 2,196 ejemplares y se conservan sobre todo en el Centro Espacial Johnson, en Houston, en armarios llenos de nitrógeno seco para evitar la humedad. La NASA presta discos de acrílico con pequeños fragmentos lunares a escuelas y museos, de modo que estudiantes de todo el mundo pueden ver de cerca roca traída de la Luna.",
  },
  {
    id: "artemis-gateway-starship",
    bannerImage: '/assets/apollo11/infographic_m6/banner_artemis-gateway-starship.webp',
    bannerCaption: "Artemis es el programa de la NASA para volver a la Luna con astronautas, apoyado en Orion, el Gateway y el Starship de SpaceX.",
    title: "Artemis: el Gateway y el Starship",
    color: '#4A5A78',
    btnImage: '/assets/apollo11/infographic_m6/btn_artemis-gateway-starship.webp',
    image: '/assets/apollo11/infographic_m6/hero_artemis-gateway-starship.webp',
    content: [
      "En 2019 la NASA llamó Artemis a su nuevo programa lunar, en honor de la hermana gemela de Apolo en la mitología griega. Su primer vuelo, Artemis I, despegó el 16 de noviembre de 2022 desde el Centro Espacial Kennedy con el cohete SLS y la nave Orion sin tripulación. Orion llegó a 432,210 km de la Tierra, el récord para una nave diseñada para llevar personas, y amerizó el 11 de diciembre frente a Baja California tras 25 días y medio de viaje.",
      "El 3 de abril de 2023, la NASA y la Agencia Espacial Canadiense presentaron a la tripulación de Artemis II: Reid Wiseman, Victor Glover, Christina Koch y Jeremy Hansen. La misión, planificada para 2026, consiste en un viaje de unos 10 días alrededor de la Luna sin alunizar. Koch sería la primera mujer en viajar hacia la Luna, Glover la primera persona afrodescendiente y Hansen el primer astronauta no estadounidense en hacer ese recorrido.",
      "El Gateway es una pequeña estación espacial planificada para orbitar la Luna, no una base en su superficie. No seguirá una órbita circular, sino una órbita de halo casi rectilínea, muy alargada, que la acercará a unos 3,000 km de la superficie y la alejará hasta unos 70,000 km, con una vuelta cada 7 días aproximadamente. Sus dos primeros módulos, el de energía y propulsión, llamado PPE, y el habitacional HALO, están diseñados para lanzarse juntos en un cohete Falcon Heavy.",
      "El Gateway es un proyecto internacional. La Agencia Espacial Europea aporta el módulo habitacional I-Hab y el módulo de comunicaciones ESPRIT; Canadá construye el brazo robótico Canadarm3; Japón contribuye con sistemas de soporte vital y transporte de carga; y en 2024 los Emiratos Árabes Unidos se comprometieron a fabricar la esclusa para la tripulación. La estación serviría como punto de encuentro, laboratorio y campo de pruebas para viajes más largos hacia Marte.",
      "Para bajar a la superficie, la NASA eligió en abril de 2021 el Starship de SpaceX, con un contrato inicial de 2,890 millones de dólares, como módulo de alunizaje de Artemis III. Apilado sobre su propulsor Super Heavy, de 33 motores Raptor, el conjunto mide más de 120 metros y genera al despegar más del doble de empuje que el Saturno V, que medía 110.6 metros. Para llegar a la Luna, el Starship lunar necesita repostar en órbita terrestre con combustible llevado por otras naves Starship."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El 13 de octubre de 2020, ocho países firmaron los Acuerdos Artemis, un conjunto de principios para explorar la Luna de forma pacífica y transparente: compartir datos científicos, ayudar a astronautas en peligro y proteger sitios históricos como la Base Tranquilidad del Apolo 11. Desde entonces se han unido más de 50 países de todos los continentes, entre ellos varios de América Latina y Europa." },
      { label: "Dato Científico", icon: "atom", text: "El Starship está construido con acero inoxidable, que resiste bien tanto el frío del combustible criogénico como el calor de la reentrada. Sus motores Raptor queman metano líquido y oxígeno líquido. Esa elección tiene una ventaja para el futuro: en Marte se podría fabricar metano combinando el dióxido de carbono de su atmósfera con hidrógeno obtenido del hielo, mediante la reacción de Sabatier." }
    ],
    fact: "El 13 de octubre de 2024, en su quinto vuelo de prueba, SpaceX atrapó por primera vez el propulsor Super Heavy con los brazos mecánicos de su torre de lanzamiento en Starbase, Texas, cuando regresaba del vuelo. En mayo de 2023, la NASA eligió también el módulo Blue Moon, de Blue Origin, para una misión posterior, Artemis V, para no depender de un solo vehículo de alunizaje.",
  },
  {
    id: "recursos-lunares-y-marte",
    bannerImage: '/assets/apollo11/infographic_m6/banner_recursos-lunares-y-marte.webp',
    bannerCaption: "Helio-3, hielo de agua, sondas como Voyager 1 y robots en Marte preparan el siguiente gran paso: astronautas en Marte.",
    title: "Más allá del Apolo: recursos, robots y Marte",
    color: '#7A5E4A',
    btnImage: '/assets/apollo11/infographic_m6/btn_recursos-lunares-y-marte.webp',
    image: '/assets/apollo11/infographic_m6/hero_recursos-lunares-y-marte.webp',
    content: [
      "El viento solar, un flujo de partículas que sale del Sol, lleva miles de millones de años depositando helio-3 en el suelo lunar. En la Tierra este isótopo es muy escaso porque el campo magnético y la atmósfera lo frenan. Ya las muestras del Apolo 11 contenían gases del viento solar atrapados en sus granos. En el regolito lunar el helio-3 está muy diluido, en unas pocas partes por cada mil millones, pero se estudia como posible combustible para reactores de fusión nuclear del futuro.",
      "Otro recurso es el agua helada. El 9 de octubre de 2009, la sonda LCROSS de la NASA hizo chocar una etapa de cohete contra el cráter Cabeus, cerca del polo sur lunar, y detectó vapor de agua en la nube de polvo levantada. En el fondo de algunos cráteres polares, donde nunca llega la luz del Sol, la temperatura baja de 200 °C bajo cero. Ese hielo podría dar agua potable, oxígeno para respirar e hidrógeno y oxígeno para fabricar combustible de cohetes.",
      "Mientras tanto, los robots exploran más lejos. La sonda Voyager 1, lanzada el 5 de septiembre de 1977, visitó Júpiter en 1979 y Saturno en 1980. El 25 de agosto de 2012 cruzó la heliopausa, la frontera donde termina la burbuja del viento solar, y se convirtió en el primer objeto humano en llegar al espacio interestelar. Hoy está a más de 25,000 millones de kilómetros y sus señales de radio tardan casi un día en llegar a la Tierra.",
      "El rover Perseverance aterrizó en el cráter Jezero de Marte el 18 de febrero de 2021, en el delta de un antiguo lago, para buscar señales de vida microbiana pasada y guardar muestras de roca. Lo acompañó el helicóptero Ingenuity, que el 19 de abril de 2021 hizo el primer vuelo propulsado en otro planeta y completó 72 vuelos. El telescopio espacial James Webb, lanzado el 25 de diciembre de 2021 con un espejo de 6.5 metros, observa galaxias formadas poco después del Big Bang.",
      "Para muchas agencias, el siguiente gran destino humano después de la Luna es Marte. La distancia entre ambos planetas varía de unos 55 a unos 400 millones de kilómetros, y un viaje de ida tarda entre seis y nueve meses con la tecnología actual. Las ventanas de lanzamiento favorables se repiten cada 26 meses, aproximadamente. Por eso la Luna se considera un campo de entrenamiento: allí se pueden probar trajes, hábitats, vehículos y el uso de recursos locales antes de un viaje mucho más largo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El 14 de febrero de 1990, a petición del astrónomo Carl Sagan, la Voyager 1 giró su cámara y fotografió la Tierra desde unos 6,000 millones de kilómetros. En la imagen, nuestro planeta aparece como un punto azul pálido más pequeño que un píxel, dentro de un rayo de luz solar dispersa. La sonda lleva además un disco dorado con sonidos, música y saludos en 55 idiomas, entre ellos el español." },
      { label: "Dato Científico", icon: "atom", text: "La fusión nuclear une núcleos ligeros y libera energía, como ocurre en el Sol. La reacción entre deuterio y helio-3 produce sobre todo protones, partículas con carga, en lugar de muchos neutrones, lo que reduciría la radiactividad de los materiales del reactor. El problema es que necesita temperaturas varias veces más altas que la fusión de deuterio y tritio, y ningún reactor ha logrado todavía producir energía útil con ella." }
    ],
    fact: "El rover Perseverance llevó a Marte el experimento MOXIE, del tamaño de una tostadora, que entre 2021 y 2023 extrajo oxígeno del dióxido de carbono de la atmósfera marciana. En 16 pruebas produjo en total 122 gramos de oxígeno, la cantidad que respira un perro pequeño en unas 10 horas. Fue la primera demostración de que se puede fabricar oxígeno con recursos de otro planeta.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo11M6)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#4F6D7A", "#8A5A44", "#3F6E73", "#5E6B4E", "#6E6259", "#4A5A78", "#7A5E4A"];
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
          <linearGradient id="gradApollo11M6" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">REGRESO, CUARENTENA Y FUTURO LUNAR</text>
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
          layoutId="activeDotApollo11M6"
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
export default function InteractiveInfographic_Apollo11M6() {
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
              🏆 Misión Cumplida: del amerizaje del Columbia al programa Artemis
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
