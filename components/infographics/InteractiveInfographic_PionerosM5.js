'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// SVG Decorative Elements
function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} ${30 + 19 * Math.cos(rad)} ${30 + 19 * Math.sin(rad)})`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoClockFace({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const DECO_MAP = {
  'mision-vosjod': [DecoGear, DecoClockFace, DecoBolt],
  'traje-berkut': [DecoClockFace, DecoGear, DecoWormhole],
  'caminata-historica': [DecoWormhole, DecoAtomSvg, DecoClockFace],
  'regreso-peligroso': [DecoBolt, DecoWormhole, DecoAtomSvg],
};

const BIBLIOGRAPHY = [
  "Leonov, A., & Scott, D. (2004). 'Two Sides of the Moon: Our Story of the Cold War Space Race', Thomas Dunne Books.",
  "Siddiqi, A. A. (2000). 'Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974', NASA History Division.",
  "Harford, J. (1997). 'Korolev: How One Man Masterminded the Soviet Drive to Beat America to the Moon', John Wiley & Sons.",
  "Chertok, B. (2005). 'Rockets and People, Volume III: Hot Days of the Cold War', NASA History Division.",
  "Burgess, C., & Hall, R. (2009). 'The First Soviet Cosmonaut Team: Their Lives and Legacies', Springer Praxis Books.",
  "Portree, D. S. F. (1997). 'Mir Hardware Heritage', NASA Reference Publication 1357."
];

const INFOGRAPHIC_NODES = [
  {
    "id": "mision-vosjod",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_mision-vosjod.webp',
    diagramCaption: 'La esclusa inflable Volga desplegándose desde la nave Voskhod 2 el 18 de marzo de 1965',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_mision-vosjod.webp",
    "title": "La Misión Vosjod 2",
    "color": "#D87D4A",
    "btnImage": "/assets/pioneros/infographic_m5/btn_mision-vosjod.webp",
    "image": "/assets/pioneros/infographic_m5/hero_mision-vosjod.webp",
    "content": [
      "El 18 de marzo de 1965, la Unión Soviética lanzó la audaz misión Vosjod 2 desde el cosmódromo de Baikonur, tripulada por el comandante Pável Beliáyev y el copiloto Alekséi Arjípovich Leónov. El objetivo supremo del vuelo era realizar la primera actividad extravehicular (EVA) o caminata espacial de la historia de la humanidad, adelantándose al programa Gemini estadounidense. La nave Vosjod era una versión modificada de la cápsula Vostok, a la cual se le había retirado el pesado asiento eyectable para permitir acomodar a dos cosmonautas.",
      "Dado que la cabina interna no podía ser despresurizada por completo sin comprometer los sistemas electrónicos refrigerados por aire, los ingenieros de la oficina OKB-1 diseñaron un ingenioso dispositivo externo: una esclusa de aire inflable de lona multicapa llamada Volga. Durante el lanzamiento, la esclusa permaneció plegada a lo largo del fuselaje cilíndrico del vehículo, desplegándose mediante cuarenta cámaras tubulares presurizadas con gas una vez alcanzada la órbita terrestre.",
      "El cohete lanzador Vosjod 11A57 situó a la nave en una órbita elíptica inusualmente alta, con un apogeo de cuatrocientos setenta y cinco kilómetros sobre la superficie terrestre y un perigeo de ciento setenta y tres kilómetros, batiendo el récord de altitud orbital de la época. A esa altitud extrema, la nave cruzaba los cinturones exteriores de la atmósfera y quedaba expuesta a niveles mayores de radiación cósmica primaria y temperaturas superficiales extremas.",
      "El entrenamiento de Beliáyev y Leónov incluyó docenas de vuelos parabólicos en un bombardero militar Tupolev Tu-104 adaptado para generar veinticinco segundos de gravedad cero por parábola. En el interior del fuselaje del avión, los cosmonautas practicaron repetidamente la compleja coreografía motora de entrar y salir de la maqueta de la esclusa inflable Volga mientras vestían sus pesados trajes espaciales presurizados.",
      "El lanzamiento y la inserción orbital transcurrieron con precisión milimétrica. Apenas al completar la primera revolución completa al planeta, Beliáyev comenzó los procedimientos formales para presurizar la esclusa de aire y abrir la escotilla interior, preparando a Leónov para dar el salto más trascendental y arriesgado jamás intentado en la historia de la exploración astronáutica mundial."
    ],
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La esclusa de aire Volga constaba de treinta y seis costillas neumáticas inflables y una masa de doscientos cincuenta kilogramos; tras completarse con éxito la actividad extravehicular histórica, fue expulsada pirotécnicamente de la cápsula para no desestabilizar la trayectoria balística de frenado durante el reingreso atmosférico."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El transmisor de televisión de a bordo de la Vosjod 2 transmitió imágenes en vivo de la esclusa a las estaciones de control soviéticas; no obstante, cuando la caminata espacial experimentó graves contratiempos biomédicos con el inflado del traje, la emisión televisiva fue interrumpida de inmediato y reemplazada con música sinfónica."
      }
    ],
    "fact": "La misión Vosjod 2 despegó desde Baikonur el 18 de marzo de 1965 y alcanzó un apogeo orbital récord de 475 kilómetros sobre la superficie de la Tierra, utilizando una revolucionaria esclusa inflable de lona hermética de dos metros y medio llamada Volga para permitir que Alekséi Leónov realizara la primera caminata humana."
  },
  {
    "id": "traje-berkut",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_traje-berkut.webp',
    diagramCaption: 'El traje espacial Berkut: primer traje diseñado para la exposición directa al vacío cósmico',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_traje-berkut.webp",
    "title": "El Traje Espacial Berkut",
    "color": "#D4B872",
    "btnImage": "/assets/pioneros/infographic_m5/btn_traje-berkut.webp",
    "image": "/assets/pioneros/infographic_m5/hero_traje-berkut.webp",
    "content": [
      "Para permitir la supervivencia de Alekséi Leónov en el letal vacío espacial, la fábrica Zvezda bajo la dirección del ingeniero Guy Severin desarrolló el traje espacial Berkut ('Águila Real'). Se trataba de una obra pionera de bioingeniería que integraba dos capas de contención hermética de goma vulcanizada, revestidas por múltiples capas de tejido aislante aluminizado para reflejar la feroz radiación solar y resistir temperaturas desde -140 °C hasta +120 °C.",
      "A diferencia de los trajes intravehiculares previos, el Berkut era un sistema autónomo de soporte vital para actividades extravehiculares. Disponía de una mochila dorsal rígida KP-55 que suministraba oxígeno puro presurizado a una presión de 0.4 atmósferas (unos cuatrocientos milibares) para prevenir la ebullición de los fluidos corporales del cosmonauta y mantener la oxigenación alveolar sin requerir una mezcla de nitrógeno.",
      "El casco del traje Berkut incorporaba un visor de doble cristal con una fina capa de oro puro depositada al vacío. Este recubrimiento metálico óptico actuaba como un filtro reflectante infrarrojo y ultravioleta indispensable, protegiendo las retinas de Leónov del cegador brillo del Sol no atenuado por la atmósfera terrestre, mientras permitía una visibilidad angular panorámica de ciento ochenta grados.",
      "La ventilación pulmonar y la regulación térmica del cosmonauta dependían enteramente de un flujo continuo de oxígeno a circuito abierto: el gas entraba en el casco, pasaba por la zona facial y se expulsaba hacia el espacio arrastrando el vapor de agua y el dióxido de carbono producido por la respiración, un diseño simple y robusto que evitaba el uso de bombas eléctricas complejas.",
      "El traje estaba diseñado con fuelles mecánicos articulados en codos y rodillas para facilitar la flexión anatómica bajo presión diferencial interna. Sin embargo, dado que no existían antecedentes experimentales de presurización real en el vacío sideral absoluto, nadie anticipó con exactitud el comportamiento hiperbárico que las paredes elásticas exhibirían una vez expuestas al entorno espacial."
    ],
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El traje Berkut mantenía una presión interna diferencial de cuarenta kilopascales contra el vacío absoluto del espacio sideral; esta disparidad manométrica convirtió al tejido en una estructura inflada y rígida similar a un neumático presurizado, exigiendo al cosmonauta un esfuerzo muscular titánico para flexionar cualquier coyuntura."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Debido a la ausencia de un circuito interno de refrigeración líquida activa, la temperatura corporal central de Leónov ascendió a casi treinta y nueve grados centígrados durante los momentos de tensión biomecánica, perdiendo más de cinco kilogramos de peso por sudoración profusa acumulada en las botas en menos de media hora de misión."
      }
    ],
    "fact": "El traje espacial Berkut incorporaba una visera reflectante tratada con una película de oro vaporizado de pocos nanómetros de espesor para filtrar la radiación ultravioleta del Sol y utilizaba una mochila dorsal KP-55 con cuarenta y cinco minutos de oxígeno puro presurizado para sustentar la fisiología de Alekséi Leónov en el cosmos."
  },
  {
    "id": "caminata-historica",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_caminata-historica.webp',
    diagramCaption: 'La primera caminata espacial de la historia: 12 minutos flotando en el vacío del cosmos',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_caminata-historica.webp",
    "title": "La Caminata Histórica",
    "color": "#80DEEA",
    "btnImage": "/assets/pioneros/infographic_m5/btn_caminata-historica.webp",
    "image": "/assets/pioneros/infographic_m5/hero_caminata-historica.webp",
    "content": [
      "A las 11:34 hora de Moscú del 18 de marzo de 1965, Alekséi Leónov cruzó la escotilla exterior de la esclusa Volga y se empujó suavemente hacia el abismo espacial sobre el estrecho de Kerch, entre el mar Negro y el mar de Azov. Con ese primer impulso biomecánico, se transformó en el primer ser humano en la historia en flotar libremente en el cosmos, protegido únicamente por la delgada envoltura de su traje espacial presurizado.",
      "Leónov estaba conectado a la nave Vosjod 2 mediante un cordón umbilical de seguridad de cinco metros y treinta y cinco centímetros de longitud. Este cabo de acero entrelazado con cables de comunicaciones telefónicas de radio y una línea de oxígeno de reserva evitaba que el cosmonauta se alejara a la deriva en órbita, actuando al mismo tiempo como su único puente físico con la civilización humana.",
      "Durante los doce minutos y nueve segundos que permaneció en el exterior, Leónov experimentó una sobrecogedora sensación de inmensidad cósmica y silencio absoluto. Describió el cielo como un terciopelo negro impenetrable tachonado de estrellas inmóviles que no titilaban, mientras contemplaba a sus pies la gigantesca esfera de la Tierra, reconociendo con nitidez la curvatura del horizonte, la cordillera del Cáucaso y el río Volga.",
      "El cosmonauta fijó una pequeña cámara cinematográfica mecánica en el borde de la esclusa para filmar sus movimientos y saludó hacia la cámara mientras su cuerpo rotaba lentamente en caída libre. No experimentó vértigo ni desorientación espacial patológica, demostrando que el sistema nervioso humano puede orientarse en el vacío sideral empleando el relieve planetario como marco de referencia visual preponderante.",
      "Sin embargo, el tiempo de seguridad asignado para la actividad extravehicular llegaba a su término crítico y el comandante Pável Beliáyev ordenó a Leónov por los auriculares de radio iniciar de inmediato las maniobras de aproximación y reingreso a la esclusa inflable antes de que la nave cruzara hacia el hemisferio nocturno y se agotara la reserva de oxígeno de la mochila dorsal KP-55."
    ],
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En ausencia de resistencia aerodinámica en órbita, cada pequeño impulso que Leónov ejercía contra la esclusa generaba un momento angular opuesto e igual de acuerdo con la tercera ley de la dinámica de Newton, provocando que su cuerpo rotara de manera continua en tres dimensiones hasta tensar por completo el cordón de seguridad."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Alekséi Leónov era además un consumado dibujante y pintor artístico; llevó consigo a la esclusa lápices de cera dura sujetos con correas elásticas a su muñeca para realizar los primeros bocetos en color de la curvatura terrestre y el cielo cósmico jamás elaborados por la mano humana en el entorno de ingravidez del espacio exterior."
      }
    ],
    "fact": "Alekséi Leónov flotó en el vacío del espacio exterior durante doce minutos y nueve segundos a más de 28,000 km/h sobre las aguas del mar Negro y las montañas del Cáucaso, conectado a la nave Vosjod 2 únicamente por un cable de seguridad de acero de cinco metros y treinta y cinco centímetros con enlace telefónico por radio."
  },
  {
    "id": "regreso-peligroso",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_regreso-peligroso.webp',
    diagramCaption: 'Aterrizaje forzoso en la taiga siberiana: supervivencia en el bosque nevado de los Urales',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_regreso-peligroso.webp",
    "title": "Un Regreso al Límite",
    "color": "#3949AB",
    "btnImage": "/assets/pioneros/infographic_m5/btn_regreso-peligroso.webp",
    "image": "/assets/pioneros/infographic_m5/hero_regreso-peligroso.webp",
    "content": [
      "Al intentar regresar a la esclusa inflable, Leónov se topó con una pesadilla biomecánica imprevista: en el vacío exterior, la presión interna del oxígeno había inflado el traje Berkut hasta deformarlo por completo, volviendo los guantes y botas excesivamente rígidos y expandiendo el traje hasta superar el diámetro de un metro de la escotilla de entrada.",
      "Sus manos se habían salido de los dedos del guante por la elongación de las mangas y era incapaz de flexionar las articulaciones para entrar con los pies hacia adelante como exigía el protocolo. Con el pulso disparado a ciento noventa latidos por minuto y su temperatura corporal alcanzando niveles febriles, Leónov tomó una decisión desesperada y no autorizada por radio: abrir una válvula manual para purgar oxígeno al espacio y despresurizar el traje a niveles críticos.",
      "Arriesgándose a sufrir embolias gaseosas letales por descompresión súbita y anoxia cerebral, Leónov logró reducir la rigidez del traje lo suficiente para introducirse de cabeza en la esclusa Volga. Una vez dentro, ejecutó una extenuante contorsión en un tubo de apenas ochenta centímetros de diámetro interior para poder cerrar la escotilla exterior con sus propias manos antes de desmayarse por el agotamiento térmico.",
      "El drama continuó durante el reingreso al planeta al día siguiente: el sistema de orientación solar automático falló, obligando a Beliáyev a realizar la primera orientación y encendido manual de retrocohetes de la historia soviética. Esto retrasó la trayectoria balística de frenado, provocando que la cápsula ameritara en la inhóspita y densa taiga siberiana cubierta de nieve profunda en los Montes Urales, cerca de Perm, a miles de kilómetros de la zona prevista.",
      "Los cosmonautas pasaron dos días y dos noches aislados a veinticinco grados bajo cero rodeados de lobos y osos salvajes antes de que los equipos de rescate con esquís pudieran llegar hasta ellos. A pesar de los múltiples peligros mortales superados, la misión Vosjod 2 demostró con valentía y heroísmo que el ser humano puede abandonar el nido de su nave para trabajar activamente en el espacio exterior."
    ],
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La despresurización manual de emergencia ejecutada por Leónov al purgar oxígeno al espacio exterior conllevaba un riesgo inminente de aeroembolismo descompresivo letal con formación de burbujas de gas en articulaciones y médula, mitigado únicamente porque había respirado oxígeno puro en tierra durante el protocolo de desnitrogenación."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El kit de supervivencia invernal de la cápsula Vosjod 2 incluía una pistola de tres cañones combinados TP-82 con cartuchos de caza mayor y bengalas luminosas para protegerse de los lobos y osos de la taiga siberiana, junto con machetes plegables y trajes térmicos impermeables que salvaron la vida de la tripulación en el bosque."
      }
    ],
    "fact": "Para poder reingresar a la esclusa tras inflarse su traje por la diferencia de presión en el vacío, Leónov purgó manualmente su oxígeno a niveles críticos de 0.27 atmósferas arriesgando la anoxia cerebral aguda, y tras un descenso balístico manual forzoso debió sobrevivir dos noches gélidas en los Urales a 25 grados bajo cero."
  },
  {
    "id": "leonov-regreso-dificil",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_leonov-regreso-dificil.webp',
    diagramCaption: 'La angustiosa reentrada a la esclusa reduciendo la presión barométrica del traje al límite',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_leonov-regreso-dificil.webp",
    "title": "Los 12 Minutos que Casi Matan a Leonov",
    "color": "#EF5350",
    "btnImage": "/assets/pioneros/infographic_m5/btn_leonov-regreso.webp",
    "image": "/assets/pioneros/infographic_m5/hero_leonov_reentry.webp",
    "content": [
      "La caminata espacial de Alexei Leonov el 18 de marzo de 1965 duró 12 minutos y 9 segundos visibles fuera de la nave, pero el episodio que casi lo mató ocurrió al intentar regresar. El traje espacial Berkut, al inflarse completamente en el vacío, aumentó tanto su rigidez que Leonov no podía doblar los brazos lo suficiente para entrar a la esclusa de airlock, que tenía 1.2 metros de diámetro. Probó durante varios minutos usando la fuerza total de sus brazos, pero el traje hinchado actuaba como un globo rígido que no cedía. En ese momento, tomó una decisión que no estaba autorizada por el control de la misión: abrió una válvula de purga para reducir la presión interna de su traje de 0.4 a 0.27 atmósferas, al límite mínimo para mantener la consciencia, arriesgando pérdida de conocimiento y narcosis por nitrógeno.",
      "Con la presión reducida, Leonov logró doblar suficientemente el traje para entrar a la esclusa de cabeza —contra el protocolo establecido de entrar con los pies primero— lo que significaba que tendría que maniobrar dentro del espacio reducido del airlock para reposicionarse antes de cerrar la escotilla exterior. Esta maniobra, en un espacio apenas mayor que su cuerpo, con el corazón latiendo a 190 pulsaciones por minuto y sudando profusamente por el esfuerzo y el estrés, le tomó ocho minutos adicionales. La temperatura interna de su traje había subido a 38°C y sus botas se habían llenado con 6 litros de sudor. Logró cerrar la escotilla exterior solo cuando sus niveles de saturación de oxígeno comenzaban a descender peligrosamente.",
      "El regreso a la Tierra de la misión Voskhod 2 tuvo tres problemas adicionales al del traje. El sistema automático de orientación falló durante la reentrada, obligando a Leonov y al comandante Pavel Belyayev a realizar la primera reentrada manual guiada a través del ojo de la ventana, aterrizando 386 km fuera de la zona de aterrizaje prevista en los densos bosques de los Urales. La cápsula quedó atrapada en un árbol a 1.5 metros del suelo en una zona sin caminos, con temperaturas de -30°C y lobos merodeando en el exterior. Los cosmonautas pasaron la noche en la cápsula y fueron rescatados 24 horas después por esquiadores de una unidad militar que llegó a pie a través de la nieve profunda.",
      "La decisión de reducir la presión del traje sin autorización del control de la misión fue una de las pocas violaciones de protocolo documentadas y públicamente reconocidas en el programa espacial soviético, aunque no fue divulgada en el momento. Décadas después, cuando los archivos se desclasificaron, quedó claro que esta violación del protocolo fue lo que salvó la vida de Leonov. El episodio cambió los requisitos de diseño de los trajes espaciales para todos los programas subsiguientes: todos los trajes post-Berkut incorporaron sistemas de ajuste de presión de emergencia controlables por el astronauta, y los airlocks se diseñaron con mayor diámetro para acomodar trajes inflados.",
      "La historia del regreso de Leonov es un caso de estudio en la toma de decisiones bajo presión extrema, en el que el conocimiento técnico del astronauta y su disposición a actuar contra el protocolo establecido fue más valioso que el seguimiento estricto de los procedimientos. Este principio se formalizó en el Manual de Operaciones de la ISS como la \"Regla de Autoridad Autónoma\" que establece que en situaciones de emergencia de vida, el astronauta tiene autoridad absoluta sobre el control de tierra para tomar las acciones que juzgue necesarias para su supervivencia."
    ],
    "expandables": [
      {
        "label": "Traje Casi Mortal",
        "icon": "Zap",
        "text": "Al comprobar que el traje Berkut se había dilatado más de diez centímetros por la presión diferencial contra el vacío sideral absoluto, Leónov abrió la válvula de purga manual arriesgando una ebullición letal del nitrógeno tisular; este incidente obligó a rediseñar las uniones mecánicas de todos los trajes espaciales soviéticos y estadounidenses."
      },
      {
        "label": "24h en los Urales",
        "icon": "Star",
        "text": "Tras la compleja actividad extravehicular y el reingreso balístico manual no guiado, Beliáyev y Leónov tomaron tierra en un denso bosque de abetos en los Montes Urales a casi cuatrocientos kilómetros del área de aterrizaje programada, viéndose forzados a pernoctar a treinta grados bajo cero protegidos únicamente por la envoltura térmica de la cápsula."
      }
    ],
    "fact": "Alekséi Leónov redujo la presión de su traje espacial al límite mínimo de la consciencia humana sin autorización previa por radio para poder comprimir la envoltura inflada y acceder a la esclusa; esta audaz iniciativa técnica salvó su vida y fundamentó los protocolos modernos de autoridad autónoma en emergencias extravehiculares."
  },
  {
    "id": "berkut-ingenieria",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_berkut-ingenieria.webp',
    diagramCaption: 'Ingeniería del traje Berkut: sellado hermético contra temperaturas de -100°C a +120°C',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_berkut-ingenieria.webp",
    "title": "El Traje Berkut: Ingeniería del Primer Paso al Vacío",
    "color": "#66BB6A",
    "btnImage": "/assets/pioneros/infographic_m5/btn_berkut-ingenieria.webp",
    "image": "/assets/pioneros/infographic_m5/hero_berkut_suit.webp",
    "content": [
      "El traje espacial Berkut (Águila Dorada) utilizado por Leonov en 1965 fue diseñado en solo 18 meses por el equipo de Gai Ilyich Severin del Instituto de Investigación de Aparatos de Vuelo Estatal (NIISSU) —un logro notable considerando que nadie había construido antes un traje para funcionar en el vacío completo. El Berkut era un traje de presión \"blanda\" compuesto de múltiples capas: goma interior para retener el gas presurizado, capas de tela resistente a la abrasión, mylar reflectante para control térmico y cubierta exterior de nylon blanco. Pesaba 100 kg con la mochila de oxígeno portátil (PLSS) y proporcionaba 30 minutos de autonomía — suficiente para la EVA planificada con margen de seguridad.",
      "La limitación fatal del Berkut — la rigidez al inflarse — era conocida por los ingenieros durante el desarrollo pero fue subestimada. Los trajes presurizados a 0.4 atmósferas desarrollan una rigidez proporcional al cuadrado de la presión: en el vacío completo, la diferencia entre 0.4 atm interior y 0 exterior crea fuerzas de tensión en la tela que la hacen actuar como un globo rígido. Los ingenieros habían diseñado \"correas de restricción\" para mantener la forma durante la presurización, pero estas correas no previnieron la reducción de movilidad en las articulaciones en el grado que ocurrió en órbita real. La lección fue que los trajes espaciales deben probarse exhaustivamente en cámaras de vacío con humanos realizando movimientos completos.",
      "El Berkut introdujo varias innovaciones técnicas incorporadas en todos los trajes posteriores: el casco de visera doble con recubrimiento de oro para filtrar el 97% de la radiación UV solar (que destruiría la vista en minutos de exposición directa sin filtro), el sistema de regulación de temperatura por ventilación de oxígeno sobre la piel, y la filosofía de \"redundancia de vida\" donde cada sistema crítico tiene un respaldo manual accesible sin herramientas. La visera dorada del Berkut es el ancestro directo de las viseras del casco de los trajes EMU de la ISS y del xEMU del programa Artemis.",
      "Los trajes espaciales modernos son órdenes de magnitud más sofisticados que el Berkut pero comparten su desafío fundamental: cómo permitir que un humano realice trabajo físico en un entorno que lo mataría en 15 segundos. El traje EMU (Extravehicular Mobility Unit) de la ISS tiene 14 capas de materiales incluyendo Dacron, Neopreno, Mylar, Ortho-Fabric y LCVG (Liquid Cooling and Ventilation Garment), pesa 127 kg y cuesta aproximadamente 12 millones de dólares por unidad. Tiene autonomía de 7 horas de oxígeno, refrigeración por agua en circulación, comunicaciones de voz y video, y un sistema de propulsión de seguridad SAFER para casos de desconexión del tether.",
      "El diseño de trajes para Marte plantea desafíos únicos que el Berkut y el EMU no resolvieron. A 0.38g marciana, un traje rígido de 127 kg haría que caminar fuera agotador. El xEMU del programa Artemis pesa 81 kg, tiene mayor rango de movimiento en las articulaciones gracias a nuevas juntas de \"rodamiento de bola\" y se diseñó con una espalda de apertura para que el astronauta entre y salga sin asistencia — una innovación directamente inspirada en la dificultad de Leonov para entrar al airlock del Voskhod 2 en 1965."
    ],
    "expandables": [
      {
        "label": "Visera Dorada",
        "icon": "Star",
        "text": "La película de oro puro aplicada mediante deposición física de vapor sobre el visor de policarbonato del casco Berkut filtraba el noventa y siete por ciento de la radiación ultravioleta y el espectro infrarrojo solar; este principio óptico de reflectancia selectiva continúa protegiendo los cascos de las unidades extravehiculares modernas de la NASA en la ISS."
      },
      {
        "label": "xEMU y Leonov",
        "icon": "Sparkles",
        "text": "Los trajes espaciales contemporáneos como el xEMU del programa Artemis incorporan un sistema de ingreso trasero mediante escotilla dorsal rígida que permite al astronauta colocarse el equipo de manera autónoma sin ayuda externa, una innovación ergonómica derivada directamente de las lecciones biomecánicas del peligroso vuelo de Leónov en la Vosjod 2."
      }
    ],
    "fact": "El traje espacial Berkut fue desarrollado en dieciocho meses por la factoría Zvezda y sus aportes en visores de oro puro y redundancia manual sentaron las bases universales de los trajes extravehiculares de la actualidad, demostrando la necesidad crítica de dotar al equipo de movilidad bajo presión negativa."
  },
  {
    "id": "fisica-eva",
    diagramImage: '/assets/pioneros/infographic_m5/diagram_fisica-eva.webp',
    diagramCaption: 'La física de la actividad extravehicular: inercia, conservación de momento y velocidad orbital',
    "bannerImage": "/assets/pioneros/infographic_m5/banner_fisica-eva.webp",
    "title": "La Física de Caminar en el Vacío",
    "color": "#9C27B0",
    "btnImage": "/assets/pioneros/infographic_m5/btn_fisica-eva.webp",
    "image": "/assets/pioneros/infographic_m5/hero_eva_physics.webp",
    "content": [
      "Una actividad extravehicular (EVA) es uno de los entornos físicos más extremos que un ser humano puede experimentar: temperatura oscilando entre -157°C en la sombra y +121°C al sol, vacío con presión de 10^-9 atmósferas, radiación ultravioleta sin filtrar atmosférico, y microgravedad completa sin ningún punto de referencia gravitacional. El traje espacial es una nave espacial en miniatura diseñada para mantener vivo a un ser humano en este ambiente por 7-8 horas.",
      "La termorregulación es el desafío físico más complejo de la EVA porque en el vacío no existe la convección —la principal forma de disipación de calor del cuerpo humano en la Tierra. En el espacio, el calor generado por el metabolismo del astronauta (hasta 1,500 W durante trabajo físico intenso) solo puede disiparse por radiación infrarroja, que es un proceso lento. La solución en los trajes modernos es el LCVG (Liquid Cooling and Ventilation Garment): una red de tubos de poliuretano de 91 metros de longitud total entretejidos en una camiseta interior que circula agua fría a 3-20°C, absorbiendo el calor metabólico antes de que eleve la temperatura corporal a niveles peligrosos.",
      "La microgravedad en la EVA crea un problema de mecánica newtoniana que los astronautas deben aprender intuitivamente: cualquier fuerza aplicada a un objeto externo genera una reacción igual y opuesta en el astronauta que, al no tener fricción contra ninguna superficie, se desplazará en la dirección opuesta. Para apretar un perno, el astronauta debe estar anclado contra dos puntos de reacción simultáneamente — los \"foot restraints\" y el \"hip restraint\" — o de lo contrario el torque del perno lo hará girar en sentido contrario. Los astronautas del Apollo tenían el suelo lunar como punto de reacción; los de la ISS deben construir mentalmente sus propias cadenas de reacción antes de cada tarea.",
      "El riesgo de micrometeoritos en la EVA es estadísticamente bajo pero real: la superficie exterior de la ISS tiene más de 1,500 impactos de partículas visibles en sus módulos de aluminio. Un micrometeorito de 1 mm impactando a 72 km/s tiene la energía cinética de una bala de rifle de gran calibre. Los trajes tienen capas de Kevlar y Spectra que pueden absorber impactos de hasta 1-2 mm. La probabilidad estadística de un impacto peligroso en una EVA de 7 horas es de 1 en 750 — suficientemente baja para aceptar el riesgo operacional.",
      "La orientación espacial durante la EVA es uno de los desafíos cognitivos más complejos de la exploración humana. En la ISS, los astronautas se mueven alrededor de una estructura del tamaño de un campo de fútbol en microgravedad donde \"arriba\" y \"abajo\" son conceptos arbitrarios. El entrenamiento se realiza en la piscina Neutral Buoyancy Laboratory de la NASA, donde 1,100 empleados mantienen réplicas de tamaño real de todos los módulos de la ISS. Los astronautas practican cada movimiento de la EVA durante 10 horas en agua por cada hora de EVA real prevista."
    ],
    "expandables": [
      {
        "label": "91 Metros de Tubo",
        "icon": "Atom",
        "text": "La prenda interior de refrigeración líquida y ventilación (LCVG) utilizada en los paseos espaciales modernos integra más de noventa metros de tubos capilares de plástico por los que circula agua fría en circuito cerrado, disipando de forma continua los quinientos vatios de calor metabólico generados por el esfuerzo físico muscular del astronauta."
      },
      {
        "label": "Bala a 72 km/s",
        "icon": "Zap",
        "text": "Un impacto de micrometeorito de apenas un milímetro de diámetro viajando a setenta y dos kilómetros por segundo posee la energía cinética equivalente al impacto de un proyectil de fusil; por ello, los trajes espaciales modernos incorporan capas exteriores de tejido balístico Kevlar, Mylar aluminizado y Nomex para amortiguar colisiones orbitales hiperveloces."
      }
    ],
    "fact": "Para apretar una simple tuerca en el vacío exterior, un astronauta en microgravedad debe anclarse firmemente en dos puntos biomecánicos independientes; de lo contrario, el torque de reacción rotará su propio cuerpo en sentido opuesto según las leyes newtonianas de conservación del momento angular, convirtiendo cada tarea en un desafío físico."
  }
];

// Temporal Particle Field
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
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
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
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// Time Machine Header
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 4 }, (_, i) => {
          const t = (i + 0.5) / 4;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ALEXEI LEONOV</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA PRIMERA CAMINATA ESPACIAL</text>
      </svg>
    </div>
  );
}

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
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
    </motion.button>
  );
}

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
            {item.text.map((para, i) => (
              <p key={i} style={{
                margin: '0 0 0.8rem', fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {para}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
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
            pointerEvents: 'none',
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
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none' }}
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

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

                </div>
              )}
              {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_PionerosM5() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/course/animales_pioneros/banner_pioneros.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Contextual Background Image (§18) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('/assets/course/animales_pioneros/bg_pioneros.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem',
          marginBottom: '2rem', position: 'relative', zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode}
              node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '3rem', padding: '2rem',
              background: 'linear-gradient(135deg, rgba(216,125,74,0.1), rgba(128,222,234,0.05))',
              borderRadius: '20px', border: '1px solid rgba(216,125,74,0.3)',
              textAlign: 'center',
            }}
          >
            <Star size={40} color="#D87D4A" style={{ margin: '0 auto 1rem', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.5))' }} />
            <h3 style={{ color: '#D87D4A', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Misión Completada</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
              Has explorado exhaustivamente todos los detalles técnicos e históricos de la pionera misión Vosjod 2 y el histórico paseo espacial de Alexei Leonov.
            </p>
          </motion.div>
        )}

        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <h4 style={{ color: '#D87D4A', margin: '0 0 1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} />
            Bibliografía y Referencias
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
