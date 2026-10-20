'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Machine themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

function DecoFluxCapacitor({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Y-shape */}
      <path d="M30 30 L15 15 M30 30 L45 15 M30 30 L30 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Glowing centers */}
      <circle cx="30" cy="30" r="3" fill={color} />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="45" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="48" r="2" fill={color} opacity="0.8" />
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
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
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
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

const DECO_MAP = {
  'naturaleza-tiempo': [DecoGear, DecoClockFace, DecoTimeline],
  'simultaneidad': [DecoWormhole, DecoAtomSvg, DecoGear],
  'entropia': [DecoAtomSvg, DecoTimeline, DecoBolt],
  'memoria-tiempo': [DecoGear, DecoBolt, DecoClockFace],
  'cuantica-tiempo': [DecoFluxCapacitor, DecoBolt, DecoAtomSvg],
  'viaje-futuro': [DecoTimeline, DecoClockFace, DecoWormhole],
  'viaje-pasado': [DecoClockFace, DecoGear, DecoTimeline],
};

const BIBLIOGRAPHY = [
  "Boltzmann, L. (1877). 'Über die Beziehung zwischen dem zweiten Hauptsatze', Sitzungsberichte der Kaiserlichen Akademie der Wissenschaften",
  "Hawking, S. (1988). A Brief History of Time, Bantam Books",
  "Penrose, R. (2004). The Road to Reality, Jonathan Cape",
  "Carroll, S. (2010). From Eternity to Here: The Quest for the Ultimate Theory of Time, Dutton",
  "Barbour, J. (1999). The End of Time, Oxford University Press",
  "Hafele, J.C. & Keating, R.E. (1972). 'Around-the-World Atomic Clocks', Science, 177"
];

const INFOGRAPHIC_NODES = [
  {
    "id": "naturaleza-tiempo",
    diagramImage: '/assets/bttf/infographic_m4/diagram_naturaleza-tiempo.webp',
    diagramCaption: 'La naturaleza filosófica y física del tiempo como dimensión fundamental',
    "title": "La Naturaleza del Tiempo",
    "color": "#7C4DFF",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_naturaleza.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_naturaleza.webp",
    "content": [
      "En la mítica secuencia inicial de Regreso al Futuro, decenas de relojes de pared hacen tictac al unísono en el taller del Doc Brown, creando la reconfortante ilusión de un tiempo universal que avanza como un metrónomo perfecto. La cinematografía de Robert Zemeckis utiliza esta sinfonía mecánica para sumergirnos en la nostalgia de los minutos contados. Sin embargo, para la física del siglo XXI, ese tiempo absoluto y uniforme de los relojes es una quimera: el tiempo no es un escenario fijo donde ocurren los hechos, sino un componente dinámico del espaciotiempo que se estira y deforma.",
      "Desde la Grecia clásica hasta la Revolución Científica, pensadores ilustres intentaron definir qué es realmente el tiempo. Aristóteles lo vinculó al movimiento y al cambio de las cosas materiales, argumentando que si nada se transformara en el universo, el tiempo dejaría de tener significado alguno. Siglos más tarde, Isaac Newton postuló su célebre hipótesis del «tiempo absoluto, verdadero y matemático», una corriente invisible que fluía eternamente por sí misma a un ritmo invariable y sin relación alguna con el mundo exterior circundante.",
      "El golpe mortal a la concepción newtoniana provino de la teoría de la relatividad formulated por Albert Einstein. Al demostrar que la velocidad de la propagación de la luz en el vacío es idéntica para todos los observadores sin importar su velocidad de desplazamiento, Einstein probó que el intervalo temporal entre dos sucesos no es absoluto. No existe un reloj cósmico maestro en el centro de la galaxia: cada partícula, cada ser humano y cada planeta transporta su propio tiempo propio, dictado por su trayectoria específica en el cosmos.",
      "En la física teórica contemporánea, destacados investigadores como Carlo Rovelli proponen la revolucionaria hipótesis del «tiempo térmico». Según este marco de la gravedad cuántica, a nivel fundamental de partículas elementales las ecuaciones básicas de la física fundamental no contienen ninguna variable temporal «t». El tiempo no sería una propiedad elemental de la realidad, sino un fenómeno macroscópico emergente generado por nuestra ignorancia de los microestados cuánticos, de forma análoga a cómo la temperatura emerge de la agitación molecular colectiva.",
      "Comprender la verdadera naturaleza del tiempo transforma radicalmente la visión que tenemos de nuestra propia existencia cósmica. Lejos de ser prisioneros atrapados en un río implacable que nos arrastra hacia un futuro desconocido, la física moderna nos enseña que formamos parte integral de un tejido cuatridimensional donde cada instante vivido permanece grabado para siempre en la geometría del universo de bloque, accesible a través de las leyes fundamentales de la naturaleza."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La secuencia inicial de los relojes en el laboratorio del Doc Brown requirió días enteros de preparación artesanal en el plató de rodaje. El equipo técnico sincronizó cuidadosamente más de cincuenta relojes de cuco, de péndulo y digitales, incluyendo un reloj mecánico donde una figura en miniatura de Harold Lloyd cuelga de las manecillas, un homenaje explícito al clásico del cine mudo de 1923 El hombre cañón."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La famosa ecuación de Wheeler-DeWitt, formulada por John Wheeler y Bryce DeWitt en 1967 para intentar unificar la mecánica cuántica y la relatividad general en una función de onda del universo entero, destaca por una peculiaridad matemática desconcertante: la variable temporal «t» no aparece en ningún miembro de la ecuación, sugiriendo un cosmos cuántico atemporal en su base."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_naturaleza-tiempo.webp",
    "bannerCaption": "La naturaleza filosófica y física del tiempo como dimensión fundamental",
    "fact": "La definición científica oficial de un segundo internacional del Sistema Internacional (SI) fue fijada en 1967 y no depende de la rotación de la Tierra, sino de la frecuencia de transición hiperfina del estado fundamental del átomo de cesio 133 sin perturbaciones, equivalente a exactamente 9.192.631.770 periodos completos de oscilación de la radiación electromagnética emitida."
  },
  {
    "id": "simultaneidad",
    diagramImage: '/assets/bttf/infographic_m4/diagram_simultaneidad.webp',
    diagramCaption: 'Simultaneidad relativa: dos observadores ven los mismos eventos en diferente orden',
    "title": "La Simultaneidad",
    "color": "#FF6B35",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_simultaneidad.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_simultaneidad.webp",
    "content": [
      "En el cine de aventuras temporales, la narración suele recurrir al dramatismo del «mientras tanto»: la película nos muestra a Marty esquivando a Biff en 1955 al mismo tiempo que el Doc Brown prepara afanosamente el cable en la torre del reloj bajo la lluvia. Esta noción de acontecimientos que suceden simultáneamente en lugares distintos es intuitiva y vital para el suspense fílmico. No obstante, uno de los descubrimientos más radicales de la relatividad especial es que la simultaneidad absoluta no existe en el universo físico.",
      "Albert Einstein formuló un célebre experimento mental que involucraba un tren en movimiento y dos rayos que caen sobre las vías férreas. Si un observador situado en el andén de la estación ve caer dos rayos al mismo tiempo sobre la parte delantera y trasera del convoy, un pasajero sentado exactamente en el centro del vagón en movimiento verá caer primero el rayo delantero. Como la luz del frente viaja hacia él mientras se desplaza a su encuentro, la señal óptica le llega antes que la del rayo trasero.",
      "Dado que la velocidad de la luz en el vacío es idéntica e inmutable para ambos observadores, la conclusión física es demoledora e inapelable: ninguno de los dos observadores tiene más razón que el otro. Para el observador del andén los dos impactos fueron estrictamente simultáneos; para el pasajero del tren fueron consecutivos y separados por un intervalo temporal medible. El orden de los sucesos distantes en el espacio depende de la velocidad relativa del marco inercial de referencia adoptado.",
      "Este fenómeno derrumba la creencia tradicional de que existe un «ahora» universal compartido por todas las civilizaciones del cosmos. Cuando miramos a través de un telescopio hacia la galaxia de Andrómeda, no estamos contemplando su estado actual, sino la luz que partió de sus estrellas hace dos millones y medio de años terrestres. Un observador que camina lentamente en la Tierra y otro que viaja en un cohete supersónico poseen planos de simultaneidad diferentes que cortan el tiempo de Andrómeda con días enteros de disparidad.",
      "La pérdida de la simultaneidad universal condujo a los físicos matemáticos, encabezados por Hermann Minkowski, a concebir la realidad como un «universo de bloque» tetradimensional. En esta estructura geométrica, todos los puntos espaciotemporales coexisten en una malla inmutable: el pasado de un observador puede coincidir con el presente de otro y con el futuro de un tercero, dependiendo de sus velocidades relativas, haciendo que la división entre pasado, presente y futuro sea solo una persistente ilusión humana."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La sincronización temporal es un elemento crucial de suspense en el clímax de la primera película: Marty debe acelerar el DeLorean para alcanzar exactamente 88 millas por hora en el segundo preciso en que el rayo impacta la veleta de la torre a las 10:04 pm. Bob Gale calculó con precisión cronométrica cada línea de diálogo para que la cuenta regresiva del Doc coincidiera con la tensión musical de Alan Silvestri."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La relatividad de la simultaneidad exige que dos eventos separados por un intervalo de tipo espacial no puedan tener una relación causal directa de causa y efecto. Esto garantiza que ninguna señal física ni información electromagnética pueda propagarse a mayor velocidad que la luz en el vacío, protegiendo el orden de los acontecimientos que están causalmente vinculados."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_simultaneidad.webp",
    "bannerCaption": "Simultaneidad relativa: dos observadores ven los mismos eventos en diferente orden",
    "fact": "La galaxia de Andrómeda (M31) dista aproximadamente 2,537 millones de años luz de la Tierra; debido al efecto de inclinación del plano de simultaneidad relativista, dos personas caminando en direcciones opuestas en una calle terrestre a solo 5 km/h poseen rebanadas de presente en Andrómeda desfasadas en más de varios días completos respecto a qué acontecimientos estelares ocurren «ahora»."
  },
  {
    "id": "entropia",
    diagramImage: '/assets/bttf/infographic_m4/diagram_entropia.webp',
    diagramCaption: 'La entropía define la flecha del tiempo hacia mayor desorden',
    "title": "Entropía y Desorden",
    "color": "#00E5FF",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_entropia.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_entropia.webp",
    "content": [
      "En la cinematografía fantástica, revertir el tiempo suele mostrarse como rebobinar una cinta de vídeo: las gotas de lluvia ascienden hacia las nubes, los cristales rotos saltan del suelo para recomponer una ventana y los coches circulan hacia atrás. Regreso al Futuro fantasea con deshacer los errores del pasado con solo viajar a 1955. Sin embargo, en la física experimental real existe un principio implacable que prohíbe taxativamente ese rebobinado espontáneo: la segunda ley de la termodinámica y el concepto de entropía.",
      "Formulada a mediados del siglo XIX por físicos colosales como Rudolf Clausius y Ludwig Boltzmann, la segunda ley establece que en cualquier sistema termodinámico aislado la entropía global tiende inevitablemente a aumentar con el paso del tiempo. La entropía es una medida cuantitativa del número de microestados microscópicos correspondientes a un mismo estado macroscópico observable, lo que popularmente se interpreta como la medida del desorden molecular de la materia.",
      "Existe un número astronómico de formas en que las moléculas de una taza de porcelana pueden estar dispuestas sobre el suelo tras romperse en mil pedazos, pero existe un número sumamente reducido y exclusivo de configuraciones en que esas mismas moléculas forman una taza íntegra y funcional. Por pura probabilidad estadística y sin necesidad de magia, es prácticamente imposible que las fluctuaciones térmicas aleatorias del aire reúnan los fragmentos de cerámica rota y los vuelvan a fusionar espontáneamente sobre la mesa.",
      "Esta asimetría probabilística es la responsable directa de lo que el astrofísico británico Arthur Eddington bautizó en 1927 como la «flecha del tiempo». Todas las leyes fundamentales de la física teórica clásica y cuántica —como las leyes del movimiento de Newton, el electromagnetismo de Maxwell o la ecuación cuántica de Schrödinger— son enteramente simétricas respecto al tiempo: funcionarían de manera idéntica hacia adelante o hacia atrás. Es la termodinámica la que impone la dirección irreversible del devenir.",
      "Para revertir localmente la entropía en una región reducida del espacio —por ejemplo, para ensamblar un automóvil nuevo a partir de minerales dispersos o mantener viva una célula biológica— es imperativo inyectar energía externa continua y disipar calor hacia el entorno. A nivel cósmico global, el universo entero avanza inexorablemente desde un estado primordial de entropía ultrabaja en el Big Bang hacia una disolución final conocida como la muerte térmica del cosmos, donde ya no habrá gradientes energéticos útiles."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La paradoja de revertir el desorden se explora con ironía visual en la tercera entrega de la saga en el Salvaje Oeste de 1885: el Doc Brown construye una gigantesca y ruidosa máquina de vapor artesanal en su herrería que ocupa toda la habitación y quema carbón durante horas simplemente para fabricar dos diminutos cubitos de hielo para su té, mostrando el colosal coste termodinámico del enfriamiento."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La fórmula fundamental de la entropía estadística de Boltzmann, grabada por deseo expreso del físico sobre su propia lápida conmemorativa en el cementerio central de Viena, reza «S = k log W», donde S representa la entropía del sistema, k es la constante universal de Boltzmann (1,38 x 10 a la menos 23 julios por kelvin) y W es el número total de microestados posibles."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_entropia.webp",
    "bannerCaption": "La entropía define la flecha del tiempo hacia mayor desorden",
    "fact": "El universo primitivo inmediatamente posterior al Big Bang poseía una entropía extraordinariamente baja debido a la extraordinaria homogeneidad de la distribución de masa y energía en el espacio; los cosmólogos estiman que la probabilidad estadística de que esa configuración de baja entropía emergiera al azar era de 1 entre 10 elevado a la potencia de 10 elevado a 123, según Roger Penrose."
  },
  {
    "id": "memoria-tiempo",
    diagramImage: '/assets/bttf/infographic_m4/diagram_memoria-tiempo.webp',
    diagramCaption: 'La memoria y la percepción psicológica del tiempo en el cerebro humano',
    "title": "Memoria y el Tiempo",
    "color": "#FFA726",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_memoria.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_memoria.webp",
    "content": [
      "En Regreso al Futuro, Marty McFly y el Doc Brown poseen recuerdos nítidos de eventos históricos que solo ellos vivieron, mientras que el resto de los habitantes de Hill Valley ven sus memorias adaptadas automáticamente a la nueva realidad. En el lenguaje del cine, la memoria humana es el ancla emocional que permite al héroe reconocer que el presente ha cambiado. En la neurobiología y la física cognitiva, sin embargo, surge un enigma apasionante: ¿por qué los seres humanos recordamos perfectamente el pasado, pero jamás recordamos el futuro?",
      "La respuesta a este enigma no es puramente biológica, sino profundamente física y termodinámica. Para almacenar un recuerdo en un cerebro biológico o en el disco duro de un ordenador, es indispensable disipar energía hacia el entorno exterior y generar un aumento neto de entropía. Cuando nuestras neuronas forman nuevas conexiones sinápticas tras presenciar un acontecimiento, el cerebro consume moléculas de glucosa y oxígeno, liberando calor residual hacia la corriente sanguínea y el aire circundante.",
      "Este proceso de registro informacional deja una huella física imborrable que llamamos «registro» o «memoria». Las huellas geológicas en las rocas sedimentarias, los cráteres causados por meteoritos en la Luna y las memorias neuronales en el lóbulo temporal del cerebro humano son exactamente la misma clase de fenómeno: cicatrices macroscópicas causadas por procesos irreversibles que tuvieron lugar en una época donde la entropía del cosmos era menor a la actual.",
      "Si la entropía cósmica no aumentara con el tiempo, sería físicamente imposible distinguir entre el ayer y el mañana a nivel informativo. No tendríamos manera de registrar datos sobre estados futuros porque el proceso mismo de procesar información genera necesariamente calor y desorden ambiental. Nuestra percepción psicológica del flujo temporal como un devenir continuo es el resultado evolutivo directo de estar equipados con cerebros termodinámicos optimizados para sobrevivir en un universo con gradientes de energía.",
      "Asimismo, la neurociencia moderna demuestra que recordar el pasado y proyectar el futuro emplean los mismos circuitos neuronales de la llamada red neuronal por defecto en el cerebro humano. Al recordar la infancia o planear las tareas del día de mañana, el cerebro reconstruye fragmentos de información archivados previamente. Lejos de ser una cámara de vídeo inmutable, la memoria es un órgano dinámico de predicción adaptativa modelado por la termodinámica del entorno que nos rodea."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando Marty regresa a su hogar en el Hill Valley restaurado de 1985 al final de la primera película, descubre atónito que su padre George es un exitoso autor de novelas de ciencia ficción y Biff es un sumiso limpiador de coches. Marty es el único ser humano sobre el planeta que conserva la memoria intacta de la línea temporal deprimente previa, creando un contraste cómico entrañable."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El principio de Landauer, formulado por el físico Rolf Landauer en los laboratorios de IBM en 1961, demostró rigurosamente que borrar o registrar un solo bit de información en cualquier sistema informático conlleva un coste termodinámico mínimo e inevitable de calor disipado igual a k multiplicado por T por el logaritmo natural de 2, conectando la computación con la entropía."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_memoria-tiempo.webp",
    "bannerCaption": "La memoria y la percepción psicológica del tiempo en el cerebro humano",
    "fact": "El cerebro humano adulto pesa en promedio apenas 1,4 kilogramos (aproximadamente el 2% de la masa corporal total), pero consume de manera continua más del 20% del oxígeno y de la energía metabólica de la glucosa del organismo entero, funcionando como un potente motor disipador de entropía que sostiene miles de millones de operaciones de memoria por segundo."
  },
  {
    "id": "cuantica-tiempo",
    diagramImage: '/assets/bttf/infographic_m4/diagram_cuantica-tiempo.webp',
    diagramCaption: 'El tiempo en la mecánica cuántica: discreto, continuo y bidireccional',
    "title": "Mecánica Cuántica",
    "color": "#E040FB",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_cuantica.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_cuantica.webp",
    "content": [
      "En la iconografía de Regreso al Futuro, el condensador de flujo brilla con tres haces pulsantes de luz azulada formando una «Y» dentro de una caja de vidrio transparente, simbolizando la misteriosa tecnología que domina el tiempo. En la década de 1980, Hollywood recurría a efectos visuales estroboscópicos para sugerir física cuántica avanzada. En la física subatómica moderna, la relación entre el tiempo y la mecánica cuántica es todavía más desconcertante: a escala cuántica, el tiempo desafía todas nuestras intuiciones cotidianas de orden y causa.",
      "Uno de los principios angulares del mundo subatómico es el principio de incertidumbre formulado por Werner Heisenberg en 1927. Aunque comúnmente se asocia con la posición y el momento de una partícula, existe una versión cuántica complementaria para la energía y el tiempo: delta E multiplicado por delta t es mayor o igual a la constante de Planck reducida dividida entre dos. Esto implica que durante intervalos de tiempo extraordinariamente breves, la conservación estricta de la energía puede fluctuar espontáneamente en el vacío cuántico.",
      "Gracias a esta incertidumbre temporal fundamental, el vacío cuántico no es la nada absoluta, sino un océano hirviente de actividad microscópica donde pares de partículas y antipartículas virtuales brotan espontáneamente de la nada, interactúan entre sí y se aniquilan en fracciones infinitesimales de segundo sin violar ninguna ley cósmica medible. Este efecto microscópico es el responsable directo de fenómenos medibles en laboratorio como el efecto Casimir y la radiación térmica emitida por los agujeros negros.",
      "Más desconcertante aún es el fenómeno de la retrocausalidad cuántica aparente estudiado en experimentos de laboratorio como el de la «elección retardada» propuesto por John Wheeler. En estas pruebas ópticas de laboratorio con interferómetros de fotones, la decisión de los físicos sobre cómo medir un fotón en el presente parece determinar retrospectivamente si la partícula cuántica se comportó como una onda extendida o como una partícula localizada en el pasado de su trayectoria.",
      "Pese a estas extrañezas que alimentan la imaginación de los guionistas cinematográficos, los físicos teóricos subrayan que la mecánica cuántica no permite enviar mensajes telegráficos hacia el pasado para alterar la historia humana. El principio cuántico de no-señalización (no-signaling theorem) demuestra matemáticamente que el entrelazamiento cuántico entre partículas distantes jamás puede ser utilizado para transmitir información clásica más rápido que la luz ni violar la causalidad temporal macroscópica."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El célebre condensador de flujo fue ideado por Bob Gale y Robert Zemeckis basándose en una anécdota ficticia narrada por Emmett Brown: el 5 de noviembre de 1955, el científico resbaló mientras intentaba colgar un reloj en el baño subido al inodoro húmedo, se golpeó la cabeza contra el lavabo y, al despertar del desmayo conmocionado, visualizó la estructura trifásica del condensador."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El experimento de la goma de borrar cuántica de elección retardada, realizado con éxito experimental por Yoon-Ho Kim y sus colaboradores en 1999, demostró que borrar la información sobre qué trayectoria siguió un fotón restaura el patrón de interferencia ondulatoria, ilustrando la sutil relación entre la información cuántica disponible y el orden temporal aparente."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_cuantica-tiempo.webp",
    "bannerCaption": "El tiempo en la mecánica cuántica: discreto, continuo y bidireccional",
    "fact": "La constante reducida de Planck (h-barra), valor fundamental de la escala cuántica universal, equivale a 1,054571817 x 10 a la menos 34 julios por segundo; a causa de este valor infinitesimal, los efectos cuánticos de superposición temporal e incertidumbre se promedian y ocultan totalmente en el mundo macroscópico de los objetos cotidianos."
  },
  {
    "id": "viaje-futuro",
    diagramImage: '/assets/bttf/infographic_m4/diagram_viaje-futuro.webp',
    diagramCaption: 'El viaje al futuro ya es posible: dilatación del tiempo en cohetes y satélites',
    "title": "Viaje al Futuro",
    "color": "#66BB6A",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_futuro.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_futuro.webp",
    "content": [
      "En el desenlace de la primera película, el DeLorean despega propulsado hacia el cielo mientras el Doc exclama una de las frases más celebradas del cine moderno: «¿Carreteras? A donde vamos no necesitamos carreteras», poniendo rumbo directo al 21 de octubre de 2015. El público suele asumir que viajar al futuro es un artificio narrativo tan inverosímil como la levitación antigravitatoria. Sin embargo, para la física teórica contemporánea, viajar hacia el futuro no solo es científicamente viable: es una realidad inevitable plenamente comprobada.",
      "La teoría de la relatividad de Albert Einstein ofrece dos métodos rigurosos y demostrados para acelerar el viaje hacia el futuro. El primer mecanismo es la dilatación temporal cinemática descrita por la relatividad especial: cuanto más rápido se desplaza un objeto a través del espacio respecto a un observador en reposo, más lento avanza su reloj interno en comparación con el reloj del observador estacionario.",
      "Si una tripulación humana abordara una nave espacial impulsada por fusión nuclear o antimateria capaz de acelerar de forma constante a 1 g de confort terrestre hasta alcanzar el 99,9999% de la velocidad de la luz, el factor de Lorentz provocaría una dilatación colosal. Mientras para los astronautas a bordo de la nave transcurrirían únicamente unos pocos años de vida biológica y alimentación regular, en el planeta Tierra habrían transcurrido siglos enteros, permitiéndoles desembarcar en el futuro remoto de la civilización.",
      "El segundo método para viajar al futuro prescinde de la alta velocidad y utiliza la gravedad masiva mediante la relatividad general. Cerca de un cuerpo celeste hiperdenso, como una estrella de neutrones o en las proximidades del horizonte de sucesos de un agujero negro supermasivo como Sagitario A*, el tiempo se frena drásticamente respecto al espacio interestelar lejano. Pasar unas pocas semanas orbitando ese pozo gravitatorio equivaldría a saltar miles de años hacia el porvenir terrestre.",
      "La asimetría fundamental del viaje al futuro reside en su carácter estrictamente unidireccional. A diferencia de las aventuras cinematográficas de Marty McFly, en las que el bólido puede regresar cómodamente a 1985 para cenar con la familia, un viaje relativista al futuro es un boleto de ida irrevocable: una vez que una persona ha avanzado mil años hacia el porvenir del cosmos, ninguna ley física conocida le permitirá jamás volver hacia atrás para narrar lo vivido."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La célebre fecha del futuro elegida en Regreso al Futuro Parte II fue el miércoles 21 de octubre de 2015 a las 04:29 de la tarde en Hill Valley, California. Los guionistas eligieron un salto de exactamente treinta años hacia adelante para crear una simetría cronológica perfecta con el salto de treinta años hacia el pasado realizado en la primera película entre 1985 y 1955."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El físico teórico Kip Thorne actuó como asesor científico principal de la película Interstellar (2014) de Christopher Nolan, donde calculó minuciosamente la dilatación temporal gravitatoria del planeta de Miller orbitando cerca del agujero negro Gargantúa: cada hora transcurrida en la superficie de ese mundo equivale exactamente a siete años enteros transcurridos en la Tierra."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_viaje-futuro.webp",
    "bannerCaption": "El viaje al futuro ya es posible: dilatación del tiempo en cohetes y satélites",
    "fact": "El cosmonauta soviético Sergei Krikalev, apodado «el último ciudadano de la URSS» tras permanecer a bordo de la estación Mir durante la disolución de su país en 1991, acumuló 803 días en órbita terrestre, viajando de forma efectiva hacia el futuro de nuestro planeta en aproximadamente 0,02 segundos reales por efectos de la velocidad orbital relativista."
  },
  {
    "id": "viaje-pasado",
    diagramImage: '/assets/bttf/infographic_m4/diagram_viaje-pasado.webp',
    diagramCaption: 'Los obstáculos físicos que impiden el viaje al pasado',
    "title": "Viaje al Pasado",
    "color": "#FF7043",
    "btnImage": "/assets/bttf/infographic_gigawatts/btn_pasado.webp",
    "image": "/assets/bttf/infographic_gigawatts/hero_pasado.webp",
    "content": [
      "El regreso de Marty McFly a 1955 para arreglar la vida sentimental de sus padres es uno de los viajes al pasado más queridos del cine comercial. En la pantalla grande, el pasado se muestra como un destino geográfico congelado en el tiempo al que se puede viajar como quien toma un tren hacia una ciudad vecina. No obstante, para la física moderna de la relatividad general y la teoría cuántica de campos, viajar al pasado representa uno de los desafíos más formidables, controvertidos y teóricamente restringidos de toda la ciencia.",
      "Las ecuaciones de la relatividad general de Albert Einstein son formalmente compatibles con trayectorias que regresan al punto de origen cronológico, conocidas técnicamente como curvas temporales cerradas. A lo largo de las décadas, físicos eminentes han descubierto soluciones exactas a las ecuaciones de campo que albergan estas curvas: el universo rotatorio formulado por Kurt Gödel en 1949, el cilindro masivo de rotación infinita concebido por Frank Tipler en 1974 y los agujeros de gusano transitables teorizados por Kip Thorne en 1988.",
      "Sin embargo, la inmensa mayoría de estas soluciones matemáticas exige condiciones físicas extremas que rozan la imposibilidad empírica. El modelo de Tipler, por ejemplo, requiere construir un cilindro metálico con una masa superior a millones de estrellas comprimida a densidades nucleares, con una longitud infinita y rotando sobre su propio eje longitudinal a más de mil millones de revoluciones por minuto para arrastrar el espaciotiempo circundante mediante el efecto Lense-Thirring.",
      "En el caso de los agujeros de gusano transitables —túneles hipotéticos que conectan dos regiones separadas del espaciotiempo— el obstáculo insalvable reside en mantener abierta la garganta gravitatoria. Según los cálculos de Morris y Thorne, cualquier masa ordinaria hace que el túnel colapse instantáneamente en una singularidad destructiva; para estabilizar la entrada temporal se necesitaría inyectar materia exótica con densidad de energía negativa masiva, cuya existencia macroscópica no ha sido jamás demostrada.",
      "Por encima de todas estas trabas de ingeniería cósmica se alzan las restricciones termodinámicas y cuánticas descritas por la física fundamental. La conjetura de protección cronológica de Stephen Hawking y el aumento inexorable de la entropía cósmica sugieren que la propia fábrica del universo posee mecanismos de defensa intrínsecos que impiden los saltos al pasado, preservando la coherencia de la historia humana como un tapiz que se teje hacia adelante en una sola dirección irreversible."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Para filmar el viaje hacia el pasado de 1955, el director de arte Rick Carter diseñó una plaza central de Hill Valley con dos caras meticulosamente documentadas: la versión degradada y llena de tiendas de empeño de 1985 y la versión luminosa, pulcra y optimista de la posguerra estadounidense de 1955 con anuncios de neón de Texaco y cafeterías de batidos con gramolas mecánicas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cilindro de Tipler fue propuesto por el físico Frank J. Tipler en 1974 como una solución rigurosa a las ecuaciones de Einstein. Cálculos posteriores realizados por Stephen Hawking demostraron que un cilindro de longitud finita no puede generar curvas temporales cerradas a menos que se viole la condición débil de energía, haciendo inviable su construcción con materia real."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m4/banner_viaje-pasado.webp",
    "bannerCaption": "Los obstáculos físicos que impiden el viaje al pasado",
    "fact": "Para mantener abierto un agujero de gusano transitable de solo un metro de diámetro apto para que cruce un ser humano, los cálculos teóricos de Thorne y Morris estiman que se requeriría una cantidad de materia exótica con energía negativa equivalente a la masa entera del planeta Júpiter concentrada en una garganta microscópica."
  }
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
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '0, 229, 255' : '255, 167, 38',
      gearSize: Math.random() * 3 + 1,
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
        // Gear-like particle
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3 + t * p.speed;
          const outerR = p.r * p.gearSize;
          ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
          ctx.lineTo(p.x + Math.cos(a + 0.3) * p.r, p.y + Math.sin(a + 0.3) * p.r);
        }
        ctx.closePath();
        
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

// â”€â”€â”€ Time Machine Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#7C4DFF','#FF6B35','#00E5FF','#FFA726','#E040FB','#66BB6A','#FF7043'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central gear icon */}
        <path d="M300 22 l1 2 a10 10 0 0 1 2 1 l2 -1 l2 2 l-1 2 a10 10 0 0 1 1 2 l2 1 l-2 2 l-1 2 a10 10 0 0 1 -2 1 l-2 1 l-2 -2 l-1 -2 a10 10 0 0 1 -1 -2 l-2 -1 l2 -2 z" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="10" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#00E5FF" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ENERGÍA A 1.21 GIGAWATTS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DE LA ENERGÍA Y EL TIEMPO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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

      {isActive && (
        <motion.div
          layoutId="activeDotBttfM4"
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}
              {/* Banner image */}
              {node.bannerImage && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={node.bannerImage}
                    alt={node.bannerCaption || node.title}
                    className="w-full object-cover"
                    style={{ maxHeight: '220px' }}
                  />
                  {node.bannerCaption && (
                    <p className="text-xs text-center text-white/50 py-1 px-2 bg-black/20">
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

        {/* â”€â”€â”€ Fact Box â”€â”€â”€ */}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #00E5FF, #FF6B35)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM4() {
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
      background: 'url(/assets/bttf/infographic_gigawatts/bg_gigawatts.png) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(0,229,255,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,229,255,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        {!activeNode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}
          >
            Toca cada círculo para explorar
          </motion.p>
        )}

                {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.75rem 2rem',
          margin: '0 auto 2.5rem',
          maxWidth: '1150px',
          padding: '1.5rem 1rem',
          background: 'rgba(15, 23, 42, 0.45)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Content Area */}
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

        {/* Completion Message */}
        <AnimatePresence>
          {allCompleted && !activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem', padding: '2rem',
                background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,107,53,0.1))',
                borderRadius: '16px', border: '1px solid rgba(0,229,255,0.2)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#00E5FF', margin: '0 0 1rem', fontSize: '1.5rem' }}>
                ðŸ† ¡Has dominado los secretos de la Máquina del Tiempo!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado toda la ciencia detrás de las máquinas del tiempo. ¿Estás listo para poner a prueba tus conocimientos?
              </p>
              <button style={{
                padding: '0.8rem 2rem', background: '#00E5FF', color: '#0B0E2D',
                border: 'none', borderRadius: '30px', fontWeight: 'bold',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 15px rgba(0,229,255,0.4)'
              }}>
                Ir al Quiz Final <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h5 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#00E5FF', opacity: 0.5 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
