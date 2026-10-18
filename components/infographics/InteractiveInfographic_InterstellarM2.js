'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoBlackHole({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="1" />
      {/* Accretion disk lines */}
      <path d="M 5 30 Q 30 15 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 5 30 Q 30 45 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoAccretionDisk({ size = 70, color = '#FF9800', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="28" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <ellipse cx="30" cy="30" rx="22" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <ellipse cx="30" cy="30" rx="16" ry="3" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoEventHorizon({ size = 70, color = '#F44336', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
      <path d="M 10 30 L 20 30 M 50 30 L 40 30 M 30 10 L 30 20 M 30 50 L 30 40" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSingularity({ size = 70, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="3" fill={color} opacity="1" />
      <path d="M 30 0 L 30 25 M 30 60 L 30 35 M 0 30 L 25 30 M 60 30 L 35 30" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 9 9 L 26 26 M 51 51 L 34 34 M 9 51 L 26 34 M 51 9 L 34 26" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function DecoGravityWell({ size = 70, color = '#7C4DFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 5 5 Q 30 40 55 5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 15 10 Q 30 45 45 10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M 25 15 Q 30 50 35 15" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="30" cy="5" rx="25" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="50" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'anatomia-agujero-negro': [DecoBlackHole, DecoAccretionDisk, DecoEventHorizon],'horizonte-sucesos': [DecoEventHorizon, DecoBlackHole, DecoGravityWell],'agujero-negro-kerr': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],'frame-dragging': [DecoGravityWell, DecoAccretionDisk, DecoBlackHole],'disco-acrecion': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],'simulacion-gargantua': [DecoBlackHole, DecoAccretionDisk, DecoGravityWell],'singularidad': [DecoSingularity, DecoGravityWell, DecoEventHorizon],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Kerr, R.P. (1963). "Gravitational Field of a Spinning Mass", Physical Review Letters, 11(5)',
  'James, O. et al. (2015). "Gravitational Lensing by Spinning Black Holes in Astrophysics and in the Movie Interstellar", Classical and Quantum Gravity, 32(6)',
  'Penrose, R. (1965). "Gravitational Collapse and Space-Time Singularities", Physical Review Letters, 14(3)',
  'Event Horizon Telescope Collaboration (2019). "First M87 Event Horizon Telescope Results", The Astrophysical Journal Letters, 875(1)',
  'Everitt, C.W.F. et al. (2011). "Gravity Probe B: Final Results of a Space Experiment to Test General Relativity", Physical Review Letters, 106(22)',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "anatomia-agujero-negro",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_anatomia-agujero-negro.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Anatomía de un Agujero Negro',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_anatomia-agujero-negro.webp",
    "title": "Anatomía de un Agujero Negro",
    "color": "#FF6B35",
    "btnImage": "/assets/interstellar/infographic_m2/btn_anatomia.webp",
    "image": "/assets/interstellar/infographic_m2/hero_anatomia.webp",
    "content": [
      "Un agujero negro no es un agujero físico en el tejido espacial, sino una concentración extrema de masa contenida en un volumen que tiende a cero según la relatividad general. Cuando una estrella gigante agota su combustible nuclear, pierde la presión de radiación hidrostática hacia afuera que compensaba su propia atracción gravitatoria. Sin esa resistencia térmica interna, la gravedad comprime toda la materia estelar hasta superar el límite de Oppenheimer-Volkoff, dando origen a una deformación geométrica infinita.",
      "La estructura teórica de un agujero negro comprende varias zonas bien delimitadas por las leyes de la física. En el exterior se encuentra la esfera de fotones, una región donde los rayos de luz orbitan en trayectorias circulares inestables antes de ser absorbidos o desviados hacia el cosmos. Más adentro yace el horizonte de sucesos, la frontera de causalidad donde la velocidad de escape iguala a la velocidad de la luz, aislando para siempre cualquier señal del universo visible exterior.",
      "En los agujeros negros que poseen momento angular o rotación, denominados agujeros de Kerr, surge una región adicional llamada ergosfera. En este espacio exterior con forma elipsoidal, el campo gravitatorio rota tan violentamente que arrastra consigo el propio tejido del espaciotiempo. Ninguna partícula, ni siquiera un fotón que viaje a trescientos mil kilómetros por segundo, puede permanecer estática respecto a un observador lejano: todo cuerpo es forzado a girar en la misma dirección orbital.",
      "El disco de acreción rodea el horizonte de sucesos como un torbellino de gas y polvo incandescente. El gas cae en espiral atraído por la gravedad mientras la fricción viscosa interna calienta el plasma a millones de grados Celsius, emitiendo radiación electromagnética en rayos X y luz visible. Este disco convierte la energía gravitatoria en radiación con una eficiencia térmica de hasta un cuarenta y dos por ciento, superando con creces el rendimiento energético de la fusión nuclear estelar.",
      "Comprender la anatomía de estos gigantes cósmicos representa el mayor desafío de la astrofísica moderna, ya que une la teoría de la relatividad general de Albert Einstein con la mecánica cuántica de Max Planck. Mientras los telescopios contemporáneos como el Event Horizon Telescope cartografían la sombra de estos abismos estelares, los astrofísicos buscan resolver la paradoja de la pérdida de información cuántica para desentrañar el verdadero funcionamiento del universo a escalas extremas."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El físico teórico Kip Thorne colaboró estrechamente con Christopher Nolan y el equipo de efectos visuales de Double Negative para construir el modelo de Gargantúa. Nolan exigió que el agujero negro no fuera una simple ilustración artística, sino el resultado visual directo de integrar las ecuaciones de Einstein en un motor de renderizado físico llamado DNGR. El equipo descubrió que la luz del disco trasero se curva por encima y por debajo del horizonte, creando el icónico halo luminoso de la película."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El radio de Schwarzschild define el tamaño exacto del horizonte de sucesos para una masa dada mediante la fórmula R = 2GM/c². Si comprimiéramos la Tierra al tamaño de una canica de nueve milímetros de radio, se transformaría en un microagujero negro. En contraste, Gargantúa posee una masa estimada de cien millones de masas solares, lo que sitúa su radio de Schwarzschild en unos trescientos millones de kilómetros, una dimensión colosal que supera con creces el radio de la órbita terrestre alrededor del Sol."
      }
    ],
    "fact": "El agujero negro supermasivo Sagitario A*, situado en el centro de nuestra Vía Láctea a veintiséis mil años luz de distancia, contiene cuatro coma tres millones de masas solares concentradas en una región con un radio de doce millones de kilómetros. En mayo de 2022, el consorcio internacional Event Horizon Telescope publicó su primera fotografía directa, revelando un anillo de plasma brillante que confirmó las predicciones teóricas de la relatividad general con una precisión milimétrica."
  },
  {
    "id": "horizonte-sucesos",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_horizonte-sucesos.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Punto de No Retorno',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_horizonte-sucesos.webp",
    "title": "El Punto de No Retorno",
    "color": "#F44336",
    "btnImage": "/assets/interstellar/infographic_m2/btn_horizonte.webp",
    "image": "/assets/interstellar/infographic_m2/hero_horizonte.webp",
    "content": [
      "El horizonte de sucesos marca el límite insuperable donde la curvatura espaciotemporal se vuelve tan pronunciada que todas las trayectorias futuras apuntan inexorablemente hacia el centro. No es una superficie sólida con la que una nave espacial pueda colisionar, sino una frontera puramente geométrica y causal. Una vez que cualquier átomo o fotón cruza esta barrera invisible, necesitaría una velocidad superior a la de la luz para regresar, una condición absolutamente prohibida por las leyes físicas universales.",
      "El físico alemán Karl Schwarzschild dedujo la existencia matemática de este horizonte en 1916 mientras combatía en el frente de la Primera Guerra Mundial, resolviendo de forma exacta las complejas ecuaciones de campo de Einstein apenas meses después de su publicación. Su solución demostró que para cualquier cantidad de masa existe un radio crítico en el cual la dilatación temporal gravitatoria se vuelve infinita respecto a un observador externo situado a una distancia infinita en reposo relativo.",
      "Para un observador exterior que contempla a un astronauta descender hacia el horizonte, el tiempo del viajero parece ralentizarse de manera progresiva. La luz reflejada por su traje sufre un corrimiento al rojo gravitacional extremo, perdiendo energía y atenuando su intensidad lumínica hasta desvanecerse en longitudes de onda de radio indetectables. El observador exterior jamás verá al astronauta cruzar la frontera; su imagen parecerá congelarse para siempre sobre la superficie del horizonte cósmico.",
      "En contraste con la perspectiva exterior, el propio viajero en caída libre no percibe ninguna anomalía local al cruzar el horizonte de sucesos. Su reloj de pulsera sigue marcando los segundos con total normalidad y no experimenta ningún cambio brusco en el espacio local. Sin embargo, su destino queda sellado: las coordenadas del espacio y del tiempo intercambian su papel algebraico dentro de la métrica, haciendo que la singularidad central se convierta en un momento futuro inevitable y no en un lugar físico.",
      "Las fuerzas de marea en el horizonte dependen inversamente del cuadrado de la masa del agujero negro. En un agujero estelar pequeño de pocas masas solares, el gradiente gravitatorio entre los pies y la cabeza de un explorador supera los millones de gravedades terrestres, provocando una espaguetización letal antes del cruce. En cambio, en supermasivos como Gargantúa, el gradiente es tan suave que un humano puede cruzar el horizonte sin sentir desgarros mecánicos inmediatos en su cuerpo."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En la secuencia clímax de Interstellar, Cooper decide desacoplar su nave Ranger para aligerar la Endurance y permitir que Amelia Brand alcance el planeta habitable de Edmunds. Cooper cae deliberadamente hacia el horizonte de sucesos de Gargantúa junto a TARS. La película plasma con precisión cómo los instrumentos de navegación pierden contacto con el exterior debido a que las ondas de radio no pueden escapar del pozo gravitatorio, ilustrando la pérdida total de causalidad con nuestro universo exterior."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El fenómeno de corrimiento al rojo gravitacional obedece a la pérdida de energía que sufren los fotones al escalar un campo gravitatorio intenso. La longitud de onda observada se dilata según el factor de Schwarzschild √(1 - 2GM/rc²). Justo en la frontera donde r es igual al radio de Schwarzschild, el denominador tiende a cero, lo que significa que la frecuencia del fotón se anula por completo y su energía se disipa íntegramente, haciendo que cualquier señal emitida resulte invisible para el resto del cosmos."
      }
    ],
    "fact": "En abril de 2019, la colaboración del Event Horizon Telescope logró medir experimentalmente el diámetro del horizonte de sucesos del agujero negro central en la galaxia Messier 87. Con una masa de seis mil quinientos millones de masas solares, su horizonte abarca un diámetro de cuarenta mil millones de kilómetros, un tamaño que triplica la órbita completa de Plutón y confirmó la precisión geométrica de la solución de Schwarzschild formulada más de un siglo atrás por la astrofísica teórica."
  },
  {
    "id": "agujero-negro-kerr",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_agujero-negro-kerr.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Agujero Negro que Gira',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_agujero-negro-kerr.webp",
    "title": "El Agujero Negro que Gira",
    "color": "#AB47BC",
    "btnImage": "/assets/interstellar/infographic_m2/btn_kerr.webp",
    "image": "/assets/interstellar/infographic_m2/hero_kerr.webp",
    "content": [
      "Durante casi cinco décadas después del trabajo de Schwarzschild, los astrofísicos se preguntaron si los agujeros negros reales podían existir en la naturaleza, ya que todas las estrellas en el universo giran y poseen momento angular. En 1963, el matemático neozelandés Roy Kerr halló la solución matemática exacta de las ecuaciones de Einstein para una masa en rotación constante. Este descubrimiento revolucionó la física teórica al describir la geometría realista del espaciotiempo que rodea a estos colosos estelares.",
      "La rotación induce modificaciones asombrosas en la anatomía del agujero negro. El horizonte de sucesos deja de ser una esfera perfecta y se aplana en los polos mientras se abulta en el ecuador, adquiriendo una silueta esferoidal oblata. Además, un agujero de Kerr posee dos horizontes: un horizonte de sucesos exterior y un horizonte interno o de Cauchy. Entre el horizonte exterior y el límite estático exterior se genera la ergosfera, una zona donde la energía del propio agujero puede ser extraída por naves o partículas.",
      "En el corazón de un agujero de Kerr, la materia colapsada no se concentra en un punto adimensional como en la solución estática de Schwarzschild. Debido a la conservación del momento angular y la fuerza centrífuga extrema, la materia adopta la forma de un anillo unidimensional de radio finito con densidad infinita, conocido como singularidad anular. En teoría, un objeto que atraviese el interior de este anillo sin tocarlo podría evitar el colapso gravitatorio y acceder a regiones teóricas de espaciotiempo negativo.",
      "El parámetro de espín adimensional de un agujero negro de Kerr, denotado algebraicamente como a*, mide su velocidad angular relativa respecto al límite físico máximo permitido por la relatividad general. Cuando a* alcanza el valor de uno, el agujero negro rota a la velocidad crítica máxima y su horizonte coincide exactamente con la ergosfera en el ecuador. Si un agujero superara este umbral teórico, su horizonte desaparecería, dejando al descubierto una singularidad desnuda violando el principio de censura cósmica.",
      "Kip Thorne calculó que Gargantúa debía rotar con un parámetro de espín a* igual a cero coma novecientos noventa y ocho para hacer posible la trama de Interstellar. A esta velocidad de giro casi extrema, las fuerzas gravitacionales y centrífugas se equilibran de forma tan particular que la última órbita circular estable se sitúa a escasa distancia del horizonte de sucesos. Esto permite que el planeta Miller orbite de forma segura en una región de inmensa dilatación temporal sin precipitarse al fondo del abismo."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Para lograr que una hora en el planeta Miller equivaliera exactamente a siete años en la Tierra, Kip Thorne demostró que Gargantúa necesitaba girar al 99.8% del límite relativista máximo de Kerr. Con un giro menor, la órbita de Miller habría caído dentro del horizonte de sucesos o habría sido destruida por fuerzas de marea. Christopher Nolan aceptó este requerimiento matemático estricto, convirtiendo las propiedades de la métrica de Kerr en el motor dramático fundamental de la misión de rescate interestelar."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 1969, el físico Roger Penrose demostró que es posible extraer energía mecánica de un agujero de Kerr mediante el llamado proceso Penrose. Al ingresar a la ergosfera, un objeto puede dividirse en dos fragmentos: uno cae más allá del horizonte con energía negativa respecto al infinito, mientras que el otro escapa hacia el exterior con una energía superior a la de la masa original. Este mecanismo permite convertir hasta un 29% de la masa total del agujero negro en energía cinética útil y aprovechable."
      }
    ],
    "fact": "El agujero negro supermasivo Cygnus X-1, primer candidato a agujero negro confirmado en nuestra galaxia a unos seis mil años luz de la Tierra, contiene veintiún masas solares y rota a más de ochocientas revoluciones por segundo. Mediciones de rayos X realizadas por satélites de la NASA estiman su parámetro de espín a* en más de cero coma noventa y nueve, lo que confirma que los agujeros negros en rotación extrema descritos por Roy Kerr son realidades tangibles y frecuentes en el cosmos."
  },
  {
    "id": "frame-dragging",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_frame-dragging.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Cuando el Espacio Gira Contigo',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_frame-dragging.webp",
    "title": "Cuando el Espacio Gira Contigo",
    "color": "#4FC3F7",
    "btnImage": "/assets/interstellar/infographic_m2/btn_frame-dragging.webp",
    "image": "/assets/interstellar/infographic_m2/hero_frame-dragging.webp",
    "content": [
      "Uno de los efectos más fascinantes predichos por la relatividad general es el arrastre del marco de referencia espaciotemporal, conocido técnicamente como efecto Lense-Thirring. Postulado en 1918 por los físicos austriacos Josef Lense y Hans Thirring, este fenómeno establece que un cuerpo masivo en rotación no solo deforma la geometría del espacio circundante, sino que literalmente tuerce y arrastra consigo las coordenadas mismas del espaciotiempo, comportándose de manera similar a una esfera girando en miel espesa.",
      "Alrededor de un agujero negro de Kerr en rápida rotación, el arrastre de marco adquiere una magnitud descomunal. Dentro de la ergosfera, la velocidad de arrastre supera la velocidad local de la luz con respecto a los sistemas de referencia lejanos en reposo. Como consecuencia física directa, ningún objeto material ni señal electromagnética puede permanecer estático sin girar. Para mantenerse en posición fija, una nave necesitaría viajar en sentido contrario más rápido que la luz, una proeza imposible.",
      "Este arrastre continuo fuerza a las partículas a orbitar en el mismo sentido que el agujero negro, un fenómeno conocido como co-rotación obligatoria. Las órbitas de objetos que intentan moverse en dirección retrógrada u opuesta son inestables y requieren enormes cantidades de energía para subsistir. Esta asimetría dinámica provoca que los discos de acreción de los agujeros negros de espín elevado experimenten fricciones extremas y alcancen temperaturas millones de grados superiores a las de discos estáticos.",
      "El efecto Lense-Thirring no es una mera hipótesis matemática confinada a la teoría: fue medido y verificado empíricamente en el campo gravitatorio de nuestro propio planeta. La misión satelital Gravity Probe B de la NASA, lanzada en 2004 con giroscopios de cuarzo de ultraprecisión, midió el arrastre inducido por la rotación de la Tierra. Los datos confirmaron una precesión de arrastre de treinta y siete coma dos milisegundos de arco por año, validando con exactitud las predicciones de Albert Einstein.",
      "En entornos extremos como Gargantúa, el arrastre de marco altera la propagación de los rayos lumínicos, distorsionando las constelaciones de fondo y los bordes del disco luminoso. Este arrastre ensancha el horizonte en la dirección del giro y lo comprime en el sentido contrario, produciendo una silueta asimétrica distintiva. Para los tripulantes del Endurance, este fenómeno implicaba que maniobrar cerca del agujero requería sincronizar sus trayectorias orbitales con la danza inercial del propio cosmos."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando la nave Endurance se aproxima al planeta Miller, debe aprovechar el arrastre inercial de Gargantúa para reducir el gasto de combustible en su aproximación orbital. Kip Thorne explicó a Christopher Nolan que el espaciotiempo en rotación ayuda a sostener la órbita de la nave, actuando como una descomunal catapulta gravitacional cinemática. Sin este arrastre del marco de Kerr, la nave habría requerido motores hiperbólicos inalcanzables para resistir la atracción y entrar en la trayectoria del planeta de agua."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El efecto Lense-Thirring provoca que el plano orbital de cualquier cuerpo que no coincida con el ecuador del agujero negro experimente una precesión continua llamada precesión nodular. En astrofísica de altas energías, este bamboleo periódico de la materia en el disco de acreción genera oscilaciones cuasi-periódicas en la emisión de rayos X, lo que permite a los astrónomos medir el momento angular de agujeros negros distantes mediante el análisis de las frecuencias observadas en telescopios espaciales."
      }
    ],
    "fact": "La sonda espacial LAGEOS II, en órbita alrededor de la Tierra a cinco mil novecientos kilómetros de altitud, confirmó el arrastre de marco terrestre midiendo el desplazamiento orbital mediante pulsos láser milimétricos durante once años continuos. El equipo internacional liderado por Ignazio Ciufolini determinó en 2004 que el arrastre del espaciotiempo terrestre coincide con la relatividad general con una incertidumbre menor al diez por ciento, una hazaña de metrología gravitacional sin precedentes."
  },
  {
    "id": "disco-acrecion",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_disco-acrecion.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Anillo de Fuego',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_disco-acrecion.webp",
    "title": "El Anillo de Fuego",
    "color": "#FF9800",
    "btnImage": "/assets/interstellar/infographic_m2/btn_disco.webp",
    "image": "/assets/interstellar/infographic_m2/hero_disco.webp",
    "content": [
      "El disco de acreción es una estructura plasmaica colosal formada por gas, polvo y fragmentos estelares que caen en espiral hacia el pozo gravitatorio de un agujero negro. A medida que la materia desciende atraída por el campo gravitatorio, la conservación del momento angular impide que caiga directamente en línea recta, obligándola a aplanarse en una estructura anular rotatoria. Esta formación funciona como uno de los generadores de radiación más potentes y eficientes del cosmos observable.",
      "Las capas concéntricas del disco giran a distintas velocidades según las leyes del movimiento kepleriano relativista: las regiones internas rotan con mucha mayor rapidez que las externas. Este gradiente de velocidad induce una colosal fricción viscosa impulsada por turbulencias magnetohidrodinámicas conocidas como inestabilidad magnetorotacional. Esta turbulencia transfiere el momento angular hacia afuera, permitiendo que la materia caiga hacia adentro mientras disipa gigantescas cantidades de calor.",
      "Las temperaturas en el interior del disco pueden alcanzar decenas de millones de kelvins en agujeros negros estelares, emitiendo torrentes de rayos X de alta energía. Sin embargo, en agujeros negros supermasivos como Gargantúa, el disco se distribuye a lo largo de millones de kilómetros, lo que modera su densidad y temperatura media. Su emisión térmica se concentra principalmente en el espectro óptico visible e infrarrojo, permitiendo la existencia de luz brillante similar a la de una estrella gigante.",
      "El aspecto visual del disco de acreción se ve profundamente alterado por el efecto de lente gravitacional y el efecto Doppler relativista. La gravedad deforma la trayectoria de los fotones emitidos por la cara posterior del disco, proyectándolos por encima y por debajo del horizonte oscuro. Simultáneamente, el lado del disco que se aproxima hacia el observador aparece considerablemente más brillante y azulado por el beaming relativista, mientras que el lado que se aleja se observa atenuado y rojizo.",
      "Sin la iluminación continua proporcionada por este disco de gas incandescente, los sistemas planetarios que orbitan agujeros negros estarían sumidos en una noche gélida y perpetua. El disco de Gargantúa actúa como un auténtico sol sustituto para los mundos del sistema, proveyendo energía térmica y lumínica a los planetas Miller y Edmunds. Este equilibrio radiativo demuestra que los agujeros negros no son únicamente destructores cósmicos, sino también potenciales centros térmicos de sistemas planetarios."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Christopher Nolan decidió atenuar ligeramente la asimetría Doppler del disco de Gargantúa para evitar que el público general se confundiera en las salas de cine. En una simulación física rigurosa, el lado izquierdo del disco habría sido cientos de veces más brillante que el derecho debido a la velocidad relativista. Aunque el software DNGR calculó la asimetría exacta con precisión absoluta, Nolan prefirió equilibrar sutilmente la iluminación para preservar la claridad visual y la belleza estética de la escena."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La eficiencia de conversión de masa en energía en un disco de acreción alrededor de un agujero negro de Schwarzschild estático es de aproximadamente un cinco coma siete por ciento. No obstante, en un agujero de Kerr en rotación máxima como Gargantúa, la última órbita circular estable se sitúa mucho más cerca del horizonte, elevando la eficiencia termodinámica teórica hasta un asombroso cuarenta y dos coma cuatro por ciento, casi sesenta veces más eficiente que la fusión del hidrógeno en el núcleo de nuestro Sol."
      }
    ],
    "fact": "Los cuásares son núcleos galácticos activos alimentados por discos de acreción alrededor de agujeros negros supermasivos devorando gas a ritmos desenfrenados. El cuásar más brillante conocido, SMSS J2157-3602, alberga un agujero negro de treinta y cuatro mil millones de masas solares que devora el equivalente a un Sol diario. Su disco de acreción brilla con una luminosidad equivalente a diez mil veces la luz de todas las estrellas de la Vía Láctea combinadas en una sola fuente cósmica."
  },
  {
    "id": "simulacion-gargantua",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_simulacion-gargantua.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Gargantúa en la Computadora',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_simulacion-gargantua.webp",
    "title": "Gargantúa en la Computadora",
    "color": "#7C4DFF",
    "btnImage": "/assets/interstellar/infographic_m2/btn_simulacion.webp",
    "image": "/assets/interstellar/infographic_m2/hero_simulacion.webp",
    "content": [
      "La creación visual de Gargantúa representó un hito histórico donde la investigación científica de vanguardia y la industria cinematográfica de Hollywood colaboraron para avanzar el conocimiento humano. Christopher Nolan y el productor Emma Thomas convocaron al físico teórico Kip Thorne para garantizar que cada elemento visual respondiera rigurosamente a las ecuaciones de la relatividad general, prohibiendo cualquier licencia artística arbitraria que contradijera las leyes físicas conocidas por la ciencia.",
      "El equipo de computación gráfica de Double Negative, liderado por el científico Oliver James y el supervisor de efectos visuales Paul Franklin, desarrolló un software de renderizado completamente nuevo bautizado como DNGR. En lugar de simular rayos de luz viajando en líneas rectas como hacen los programas tradicionales de animación digital, DNGR integró numéricamente las complejas ecuaciones diferenciales de las geodésicas nulas de Einstein en el espaciotiempo curvo de la métrica de Kerr.",
      "Para evitar aberraciones ópticas y artefactos de parpadeo en las imágenes de alta resolución, el equipo descubrió que no bastaba con calcular rayos de luz individuales, sino haces completos de fotones mediante técnicas de trazado de rayos diferenciales. Cada fotograma final requirió hasta cien horas de procesamiento informático en granjas de servidores masivas, manejando terabytes de datos para resolver con exactitud milimétrica la curvatura gravitacional y la propagación de cada longitud de onda visible.",
      "El resultado de las simulaciones sorprendió a los propios científicos. Cuando el software produjo las primeras imágenes del agujero negro rodeado por un disco de acreción plano, Thorne y el equipo pensaron inicialmente que existía un error de programación en el código. Sin embargo, los cálculos revelaron una verdad geométrica: la formidable gravedad curva la luz de la parte posterior del disco por encima y por debajo del horizonte, envolviendo visualmente al agujero negro en una corona luminosa infinita.",
      "Esta colaboración entre cine y astrofísica teórica derivó en la publicación de artículos científicos formales en prestigiosas revistas especializadas de física, tales como Classical and Quantum Gravity y American Journal of Physics. Las herramientas matemáticas desarrolladas para la película ayudaron a la comunidad científica internacional a visualizar con anticipación lo que años más tarde observaría el Event Horizon Telescope, demostrando el poder transformador de la simulación computacional avanzada."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Para renderizar las escenas en formato IMAX a resolución de siete mil líneas horizontales con absoluta nitidez, los servidores de Double Negative procesaron simulaciones que alcanzaban hasta ochocientos terabytes de memoria total. Christopher Nolan proyectó estas secuencias directamente en pantallas gigantes durante el rodaje para que los actores Matthew McConaughey y Anne Hathaway pudieran contemplar la majestuosidad de Gargantúa en tiempo real en lugar de actuar frente a fondos verdes vacíos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las geodésicas nulas calculadas por el software DNGR representan las trayectorias que siguen los fotones en un espaciotiempo curvado por la masa y la rotación. Al aproximarse al horizonte de Cauchy en un agujero de Kerr, los haces luminosos sufren fenómenos de cáusticas gravitacionales complejas donde múltiples rayos procedentes de una misma fuente se cruzan, generando imágenes múltiples y anillos de Einstein deformados que revelan la topología subyacente de la geometría del espacio-tiempo."
      }
    ],
    "fact": "El artículo científico titulado «Gravitational lensing by spinning black holes in astrophysics, and in the movie Interstellar», publicado en febrero de 2015 por Oliver James, Eugénie von Tunzelmann, Paul Franklin y Kip Thorne en la revista Classical and Quantum Gravity, fue descargado más de cincuenta mil veces en sus primeros meses, convirtiéndose en uno de los artículos de física relativista computacional más leídos y citados de la década en todo el mundo."
  },
  {
    "id": "singularidad",
    diagramImage: '/assets/interstellar/infographic_m2/diagram_singularidad.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Centro del Misterio',
    "bannerImage": "/assets/interstellar/infographic_m2/banner_singularidad.webp",
    "title": "El Centro del Misterio",
    "color": "#00BCD4",
    "btnImage": "/assets/interstellar/infographic_m2/btn_singularidad.jpg",
    "image": "/assets/interstellar/infographic_m2/hero_singularidad.jpg",
    "content": [
      "En el corazón más profundo de cualquier agujero negro se encuentra la singularidad, una región donde la materia colapsada se concentra hasta límites donde las magnitudes físicas conocidas pierden todo sentido matemático. La densidad de la materia, la temperatura térmica y la curvatura del espaciotiempo alcanzan valores formalmente infinitos según las ecuaciones de la relatividad general clásica, provocando que la geometría continua del espacio se rompa de manera definitiva e irremediable.",
      "La presencia de infinitos en las soluciones de Einstein indica que la relatividad general es una teoría incompleta en regímenes extremos, incapaz de describir lo que ocurre a escalas del orden de la longitud de Planck, equivalente a diez elevado a la menos treinta y cinco metros. A esta escala infinitesimal, los efectos de la incertidumbre cuántica dominan la dinámica del tejido espacial, exigiendo una teoría de gravedad cuántica aún no consolidada que unifique la gravitación con la física de partículas.",
      "En los agujeros negros en rotación de Kerr, la estructura interna de la singularidad no es un punto adimensional esférico, sino una singularidad anular situada en el plano ecuatorial detrás del horizonte de Cauchy. Sin embargo, estudios teóricos dirigidos por Kip Thorne, Werner Israel y Eric Poisson descubrieron que este horizonte interno es inestable ante perturbaciones externas, dando lugar a una singularidad de choque volador inflacionario que destruiría cualquier materia ordinaria que intente atravesarla.",
      "El renombrado matemático británico Roger Penrose propuso en 1969 la conjetura de la censura cósmica, postulando que la naturaleza siempre oculta estas singularidades detrás de un horizonte de sucesos para proteger la causalidad del resto del universo. Si una singularidad careciera de horizonte, se trataría de una singularidad desnuda, un fenómeno impredecible donde las leyes físicas se desmoronarían a la vista de cualquier observador externo, alterando el orden determinista de la ciencia natural.",
      "Resolver el misterio de la singularidad es el santo grial de la física fundamental del siglo veintiuno. Modelos contemporáneos como la teoría de cuerdas y la gravedad cuántica de bucles sugieren que los infinitos son ilusiones matemáticas derivadas de suponer un espaciotiempo continuo: a nivel de Planck, el espacio estaría granulado en unidades mínimas de volumen, evitando el colapso a densidad infinita y reemplazando la singularidad con un núcleo de densidad cuántica máxima finita."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el clímax de Interstellar, Cooper y el robot TARS caen a través del horizonte hacia el corazón de Gargantúa con el objetivo de medir los datos cuánticos de la singularidad. El profesor Brand necesitaba desesperadamente estos datos en la Tierra para completar su ecuación de la gravedad y salvar a la humanidad. Cooper sobrevive gracias a que seres tetradimensionales despliegan un teseracto en el interior del abismo, permitiendo que TARS capture los datos cuánticos sin ser destrozado por la singularidad."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El teorema de singularidades de Penrose-Hawking, formulado entre 1965 y 1970, demostró matemáticamente que las singularidades son consecuencias inevitables de la relatividad general bajo condiciones físicas razonables de energía positiva, y no meras anomalías causadas por simetrías perfectas. Por este trabajo pionero que transformó nuestra comprensión sobre el destino final de las estrellas gigantes, Roger Penrose fue galardonado con el Premio Nobel de Física en octubre del año 2020."
      }
    ],
    "fact": "La escala de Planck representa la barrera física fundamental donde el espaciotiempo clásico deja de existir como concepto continuo. Definida por la longitud de Planck (1.616 × 10⁻³⁵ metros) y el tiempo de Planck (5.391 × 10⁻⁴⁴ segundos), cualquier intento de explorar distancias más diminutas requeriría tanta energía concentrada que crearía espontáneamente un microagujero negro, marcando el límite absoluto hasta donde las leyes conocidas de la física pueden aplicarse en el universo."
  }
];

// â”€â”€â”€ Gargantua Video Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <video autoPlay muted loop playsInline
        poster="/assets/interstellar/gargantua_bg.jpg"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="https://drive.usercontent.google.com/download?id=1mor0WdE_0ycWM6X54VHqc9A8I2_J_GH6&export=download&authuser=0" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
    </div>
  );
}

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FF6B35','#F44336','#AB47BC','#4FC3F7','#FF9800','#7C4DFF','#00BCD4'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central hole icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF6B35" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="18" ry="6" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" transform="rotate(20 300 30)" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,107,53,0.2)" />
            <stop offset="50%" stopColor="rgba(79,195,247,0.9)" />
            <stop offset="100%" stopColor="rgba(255,107,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">GARGANTÚA â€“ ANATOMÍA DE UN MONSTRUO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÍSICA Y ESTRUCTURA DE UN AGUJERO NEGRO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(79,195,247,0.2)'}`,
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
          layoutId="activeDotInterstellarM2"
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0a0c1e',
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
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fast Fact â”€â”€â”€ */}
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
              {node.fact && (
          <div style={{
            marginTop: '2rem', padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{
              background: node.color, color: '#0a0c1e',
              padding: '0.5rem', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={20} />
            </div>
            <div>
              <strong style={{ display: 'block', color: node.color, marginBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Fascinante
              </strong>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  
  const activeNode = useMemo(() => 
    INFOGRAPHIC_NODES.find(n => n.id === activeNodeId),
  [activeNodeId]);

  return (
    <div style={{
      width: '100%',
      minHeight: '800px',
      background: '#0a0c1e',
      borderRadius: '24px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#fff',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <InterstellarBackground />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <InterstellarHeader />

        {/* â”€â”€â”€ Node Navigation â”€â”€â”€ */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '2rem 0',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(prev => prev === node.id ? null : node.id)}
            />
          ))}
        </div>

        {/* â”€â”€â”€ Dynamic Content Area â”€â”€â”€ */}
        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {activeNode ? (
              <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveNodeId(null)} setLightboxSrc={setLightboxSrc} />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                }}
              >
                <div style={{
                  textAlign: 'center', color: 'rgba(79,195,247,0.4)',
                  border: '1px dashed rgba(79,195,247,0.2)',
                  borderRadius: '20px', padding: '3rem',
                  maxWidth: '400px',
                }}>
                  <Sparkles size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
                    Selecciona un nodo interactivo de Gargantúa para explorar la física del agujero negro
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* â”€â”€â”€ Bibliography Footer â”€â”€â”€ */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ðŸ“š Fuentes y Referencias
          </h4>
          <ul style={{
            margin: 0, padding: '0 0 0 1.2rem',
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Lightbox component */}
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
