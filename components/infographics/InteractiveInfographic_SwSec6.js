'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Plasma Themed)
   ========================================================================= */

const DecoLightsaber = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <line x1="12" y1="2" x2="12" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
    <rect x="10" y="16" width="4" height="6" rx="1" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoPlasmaBolt = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4 12H20M6 8H18M8 4H16M6 16H18M8 20H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" opacity="0.8" />
    <circle cx="12" cy="12" r="4" fill={color} opacity="0.9" />
  </svg>
);

const DecoLightning = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={`${color}22`} />
  </svg>
);

const DecoShield = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={`${color}11`}/>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);

const DecoAtom = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(30 12 12)" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(90 12 12)" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(150 12 12)" opacity="0.8"/>
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

const DECO_MAP = {
  'plasma-estado': [DecoAtom, DecoLightning],
  'sable-laser': [DecoLightsaber, DecoPlasmaBolt],
  'blasters-energia': [DecoPlasmaBolt, DecoLightning],
  'escudos-deflectores': [DecoShield, DecoAtom],
  'fusion-nuclear': [DecoAtom, DecoShield],
  'rayos-ionicos': [DecoLightning, DecoPlasmaBolt],
  'estrella-muerte': [DecoLightsaber, DecoShield],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Chen, F. F. (1984). 'Introduction to Plasma Physics and Controlled Fusion'. Springer.",
  "Kruer, W. L. (2019). 'The Physics of Laser Plasma Interactions'. CRC Press.",
  "Wesson, J. (2011). 'Tokamaks' (International Series of Monographs on Physics). Oxford University Press.",
  "Betti, R., & Hurricane, O. A. (2016). 'Inertial-confinement fusion with lasers'. Nature Physics, 12(5), 435-448.",
  "Goebel, D. M., & Katz, I. (2008). 'Fundamentals of Electric Propulsion: Ion and Hall Thrusters'. JPL Space Science and Technology Series.",
  "Eliezer, S. (2002). 'The Interaction of High-Power Lasers with Plasmas'. Institute of Physics Publishing."
];

const INFOGRAPHIC_NODES = [
  {
    "id": "plasma-estado",
    "title": "El Cuarto Estado de la Materia",
    "color": "#FF5252",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_plasma_estado.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_plasma_estado.webp",
    "bannerImage": "/assets/starwars/infographic_sec6/banner_plasma-estado.webp",
    "bannerCaption": "El plasma: el cuarto estado de la materia, más común en el universo que el sólido líquido y gas juntos",
    "content": [
      "El plasma es formalmente considerado el cuarto estado fundamental de la materia, situado más allá de los sólidos, los líquidos y los gases. Cuando a un gas neutro se le suministra una cantidad colosal de energía térmica o se le somete a diferencias de potencial electrostático descomunales, las violentas colisiones cinéticas arrancan los electrones de sus órbitas atómicas. El resultado es un fluido energizado compuesto por una mezcla dinámica de iones cargados positivamente y electrones libres deslocalizados.",
      "A pesar de que el plasma está repleto de cargas eléctricas libres en constante movimiento caótico, exhibe una propiedad matemática fundamental denominada cuasineutralidad. A distancias superiores a la longitud de apantallamiento de Debye, el número total de cargas positivas y negativas se cancela con exactitud. Sin embargo, a escalas espaciales microscópicas, las fluctuaciones de carga desencadenan oscilaciones de plasma colectivas de altísima frecuencia conocidas como ondas de Langmuir.",
      "El comportamiento colectivo distingue al plasma de cualquier gas ordinario de moléculas neutras. Mientras que en un gas neutro las partículas únicamente interactúan cuando chocan mecánicamente entre sí como bolas de billar, las partículas cargadas de un plasma generan intensos campos eléctricos y magnéticos de largo alcance. Esta respuesta electromagnética coordinada confiere al plasma una conductividad térmica y eléctrica descomunal, superando con creces la conductividad del cobre metálico sólido.",
      "Aunque en la superficie templada de nuestro planeta el plasma es una rareza confinada a relámpagos de tormenta, arcos eléctricos de soldadura y auroras boreales en los polos, en el cosmos visible representa más del noventa y nueve por ciento de toda la materia bariónica observable. El Sol, las gigantescas estrellas luminosas, el medio interestelar difuso y los filamentos cósmicos calientes que unen cúmulos de galaxias se encuentran íntegramente en estado de plasma.",
      "En la ingeniería moderna de vanguardia, el control del plasma hace posible la tecnología más avanzada del siglo XXI. Se utiliza para el grabado atómico por litografía ultravioleta extrema en la manufactura de microprocesadores de silicio, en reactores de esterilización médica hospitalaria y como propulsor en motores iónicos que impulsan satélites espaciales a través del sistema solar con una eficiencia de combustible inigualable."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Star Wars, el plasma es la savia energética de la galaxia: impulsa los reactores de las naves, alimenta los blasters, estabiliza los sables de luz y hace funcionar los droides. La saga acierta al mostrar el plasma como un fluido brillante de alta energía, aunque en el cine se comporta más como luz compacta que como gas ionizado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Irving Langmuir acuñó el término «plasma» en 1928 porque le recordó al plasma sanguíneo por su capacidad de transportar iones y electrones libres de manera fluida y autorregulada, fundando una nueva rama de la física fundamental que revolucionaría la astrofísica y la ingeniería nuclear, permitiendo modelar desde auroras polares hasta los reactores de fusión más avanzados del planeta."
      }
    ],
    "fact": "Más del 99 por ciento de la materia bariónica visible en el universo observable se encuentra en estado de plasma; las estrellas, los discos de acreción de agujeros negros, las nebulosas de emisión y el medio intergaláctico son plasmas calientes regidos por las leyes de la magnetohidrodinámica, constituyendo el sustrato material dominante del cosmos profundo."
  },
  {
    "id": "sable-laser",
    "title": "¿Podremos Construir un Sable Láser?",
    "color": "#448AFF",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_sable_laser.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_sable_laser.webp",
    "bannerImage": "/assets/starwars/infographic_sec6/banner_sable-laser.webp",
    "bannerCaption": "Por qué es imposible un sable de luz real: el plasma necesita confinamiento magnético o se dispersa instantáneamente",
    "content": [
      "El sable de luz empuñado por los Caballeros Jedi es uno de los artefactos más fascinantes de la cultura popular mundial, pero su diseño plantea interrogantes físicos insalvables para la óptica tradicional. Un haz láser de fotones ordinario no puede detenerse abruptamente en el aire a un metro de longitud sin un espejo reflector terminal, ni emite zumbidos sonoros en el vacío, ni puede entrechocar con otro haz de luz produciendo resistencia mecánica sólida.",
      "La hipótesis científica más plausible para construir un dispositivo semejante descarta los láseres ópticos puros en favor de una hoja de plasma térmico confinada magnéticamente. Si un gas inerte a alta presión es sobrecalentado a decenas de miles de grados Celsius dentro de la empuñadura, se convierte en un chorro incandescente de plasma brillante. Este plasma puede fundir aleaciones metálicas estructurales en milisegundos mediante transferencia térmica directa por convección y conducción.",
      "El obstáculo técnico formidable reside en el confinamiento magnético de la hoja incandescente al aire libre. Contener un filamento de plasma a diez mil grados exige generar una botella magnética con campos de varios teslas mediante bobinas superconductoras ultracompactas integradas en la empuñadura. En la atmósfera abierta, las turbulencias fluidodinámicas y las inestabilidades magnetohidrodinámicas de tipo salchicha dispersarían la columna de plasma en una fracción de milisegundo.",
      "La demanda energética para sostener una hoja de plasma térmico continuo es astronómica. Cortar una compuerta blindada de acero o blast-door en segundos exige una potencia constante calculada entre dos y cinco megavatios térmicos. Empaquetar semejante capacidad de generación energética en un cilindro portátil de veinticinco centímetros requeriría densidades energéticas que superan a las mejores baterías de ion de litio en más de diez mil veces, exigiendo fuentes de antimateria en miniatura.",
      "Ingenieros y físicos experimentales contemporáneos han construido prototipos funcionales que se aproximan asombrosamente al aspecto visual cinematográfico utilizando antorchas laminares de plasma de gas licuado de petróleo y oxígeno enriquecido. Con boquillas de microflujo cerámico, estos prototipos generan llamas laminares de plasma azul de cuatro mil grados capaces de cortar placas de titanio, constituyendo el tributo técnico más cercano al arma de los Jedi."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El sable láser es el arma icónica de los Caballeros Jedi y los Señores Sith, energizada por un cristal Kyber sensible a la Fuerza que enfoca la energía del prisma en una hoja luminosa de color azul, verde o rojo que emite un zumbido electromagnético inconfundible al hendir el aire, capaz de cortar blindajes de acero y desviar disparos de plasma térmico concentrado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Si dos haces de luz láser real se cruzan en el aire o en el vacío, los fotones simplemente se superponen y se atraviesan sin experimentar ningún rozamiento mecánico, choque elástico ni resistencia sólida, haciendo físicamente imposible un duelo de esgrima con rayos ópticos puros, debido a que los bosones electromagnéticos no interactúan directamente entre sí a bajas energías."
      }
    ],
    "fact": "Una antorcha de corte por plasma industrial opera ionizando nitrógeno o argón a temperaturas de entre 10,000 y 28,000 grados Celsius mediante un arco voltaico continuo; a esa temperatura, la materia ionizada funde cualquier aleación metálica estructural instantáneamente al soplar el metal líquido expulsado."
  },
  {
    "id": "blasters-energia",
    "title": "Blasters: Armas de Energía Dirigida",
    "color": "#FF6E40",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_blasters_energia.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_blasters_energia.webp",
    "bannerImage": "/assets/starwars/infographic_sec6/banner_blasters-energia.webp",
    "bannerCaption": "Los blasters de Star Wars: en la realidad los láseres viajan a velocidad de luz, no en cámara lenta como en la película",
    "content": [
      "En el universo de Star Wars, las pistolas y rifles bláster son las armas de fuego reglamentarias de ejércitos galácticos y mercenarios espaciales. Según la mitología técnica oficial de la saga, estas armas no disparan fotones láser puros, sino paquetes discretos de gas tibanna ionizado sobrecalentado y acelerado magnéticamente, lo que explica por qué los proyectiles luminosos viajan a velocidades observables y dejan cicatrices de impacto fundidas.",
      "En el mundo real, los desarrollos balísticos más cercanos corresponden a las armas de energía dirigida militares contemporáneas (conocidas por la sigla DEW). Los laboratorios de defensa investigan dos vertientes tecnológicas complementarias: los láseres de fibra óptica de estado sólido en estado continuo de alta potencia para derribar drones y proyectiles balísticos, y los cañones de pulsos de microondas de alta potencia para inutilizar electrónica enemiga.",
      "Uno de los desafíos atmosféricos más severos que enfrenta cualquier haz energético enfocado es el fenómeno del «blooming térmico». Cuando un rayo láser de decenas de kilovatios atraviesa el aire libre, ioniza y calienta el gas a lo largo de su trayectoria óptica. El aire sobrecalentado se expande violentamente hacia afuera, reduciendo su densidad e índice de refracción, lo que actúa como una lente óptica divergente que dispersa el haz antes de dar en el blanco.",
      "Para proyectar paquetes de plasma compacto similares a los disparos de bláster, los físicos de aceleradores estudian cañones de plasma coaxial basados en la fuerza electromagnética de Lorentz. Al descargar bancos de condensadores de alta tensión a través de un gas inerte inyectado entre dos electrodos cilíndricos, el plasma resultante es acelerado a velocidades hipersónicas de cientos de kilómetros por segundo formando un toroide magnético autosostenido llamado esferomac.",
      "Sin embargo, el empleo militar portátil de estas armas enfrenta un obstáculo térmico casi insalvable: la degradación del cañón. La descarga continua de plasma a temperaturas de decenas de miles de grados desgasta y evapora los materiales cerámicos y metálicos por erosión térmica y choque dieléctrico, requiriendo circuitos de enfriamiento por criogenia continua imposibles de sostener en un arma de mano en un campo de batalla terrestre."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El contrabandista Han Solo confía ciegamente en su famosa pistola bláster pesada DL-44 («Las religiones arcaicas y las armas antiguas no son rivales para un buen bláster en tu mano, chico»). Los proyectiles rojos viajan a unos sesenta metros por segundo, mucho más lentos que una bala de fusil terrestre convencional (900 m/s)."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad real de un rayo láser militar es exactamente la velocidad de la luz: trescientos mil kilómetros por segundo. Un disparo de láser defensivo impacta a un objetivo situado a diez kilómetros de distancia en apenas treinta y tres microsegundos, haciendo imposible esquivarlo visualmente, requiriendo sistemas computacionales ultra-rápidos de puntería automatizada por radar y sensores ópticos."
      }
    ],
    "fact": "Los cañones de riel electromagnéticos de la armada naval utilizan fuerzas de Lorentz para acelerar proyectiles hipersónicos de tres kilogramos a velocidades superiores a Mach 6 (más de dos mil metros por segundo) sin usar pólvora química, transformando treinta megavatios de pulso eléctrico en pura energía cinética."
  },
  {
    "id": "escudos-deflectores",
    "title": "Escudos Deflectores: ¿Son Posibles?",
    "color": "#40C4FF",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_escudos_deflectores.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_escudos_deflectores.webp",
    "bannerImage": "/assets/starwars/infographic_sec6/banner_escudos-deflectores.webp",
    "bannerCaption": "Escudos deflectores: la magnetosfera terrestre es un escudo real, investigadores diseñan versiones para naves espaciales",
    "content": [
      "Los escudos deflectores son el baluarte defensivo indispensable en los combates espaciales de ciencia ficción, cubriendo cazas estelares y acorazados con burbujas de energía transparentes que evaporan torpedos de protones y absorben disparos de bláster. En la física espacial aplicada contemporánea, el análogo más directo y funcional son los escudos magnéticos de plasma activo concebidos para proteger naves tripuladas.",
      "La física fundamental que sustenta una pantalla defensiva magnética es la fuerza de Lorentz, expresada como F igual al producto de la carga por la suma del campo eléctrico más el vector velocidad multiplicado vectorialmente por el campo magnético. Cuando partículas ionizadas de alta energía inciden contra una nave protegida por un dipolo magnético intenso, la fuerza transversal curva sus trayectorias parabólicamente, desviándolas lejos del casco habitable.",
      "El mayor ejemplo operativo de un escudo deflector a escala planetaria es la propia magnetosfera de la Tierra. Generada por el efecto dinamo del hierro y níquel líquidos en rotación dentro de nuestro núcleo externo, esta jaula magnética desvía el bombardeo continuo del viento solar supersónico hacia los cinturones de Van Allen, protegiendo la tenue atmósfera terrestre y el ADN de toda la biosfera de la esterilización por radiación cósmica.",
      "No obstante, un escudo magnético convencional presenta una vulnerabilidad crítica ante amenazas neutras. Debido a que la fuerza de Lorentz exige que los proyectiles posean carga eléctrica neta, un campo magnético es enteramente incapaz de frenar o desviar asteroides rocosos neutros, fragmentos metálicos de metralla balística o fotones de alta energía procedentes de láseres militares, que atravesarían las líneas de campo sin desviarse.",
      "Para solucionar esta limitación, investigadores de instituciones como el MIT exploran conceptos avanzados de apantallamiento basados en plasma magnetizado. Al inyectar una nube de gas noble ionizado dentro de las líneas de campo magnético que rodean la nave, el plasma atrapado puede absorber o dispersar la radiación electromagnética hostil y disipar ondas de choque térmicas, funcionando como un auténtico blindaje deflector bifásico."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En la batalla de Endor en El Retorno del Jedi, la segunda Estrella de la Muerte está protegida por un gigantesco generador de escudo deflector instalado en la superficie de la luna boscosa de Endor, haciendo que la flota rebelde no pueda atacar la superestructura hasta que el comando destruya la base terrena."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para proteger a los astronautas en futuras misiones tripuladas a Marte contra la radiación cósmica galáctica, la NASA investiga escudos magnéticos superconductores de alta temperatura (HTS) capaces de generar una burbuja deflectora de tres teslas con una masa de bobinas inferior a diez toneladas, desviando protones solares de alta energía de manera análoga a la magnetosfera protectora de la Tierra."
      }
    ],
    "fact": "Los cinturones de radiación de Van Allen que rodean la Tierra desvían partículas cósmicas con energías superiores a decenas de megaelectronvoltios; sin este escudo magnetosférico natural de 0.5 gauss, el flujo de partículas solares habría erosionado el agua y la capa de ozono de nuestro planeta hace miles de millones de años."
  },
  {
    "id": "fusion-nuclear",
    "title": "Fusión Nuclear: La Energía de las Estrellas",
    "color": "#FF1744",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_fusion_nuclear.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_fusion_nuclear.webp",
    "bannerImage": "/assets/starwars/infographic_plasmas/banner_fusion_nuclear.webp",
    "bannerCaption": "Los reactores tokamak confinan plasma a 150 millones de grados en forma toroidal para lograr la fusión nuclear controlada.",
    "content": [
      "La fusión nuclear es el proceso termodinámico más potente y virtuoso del universo, responsable de encender el núcleo del Sol y mantener el resplandor de todas las estrellas durante miles de millones de años. Consiste en la unión forzada de dos núcleos atómicos ligeros (primordialmente isótopos de hidrógeno como el deuterio y el tritio) para engendrar un núcleo de helio más estable, liberando una fracción colosal de masa en forma de energía pura según la ecuación E igual a m por c al cuadrado.",
      "Para fusionar dos núcleos atómicos cargados positivamente, es indispensable superar la colosal repulsión electrostática mutua descrita por la ley de Coulomb. La única forma de aproximar los núcleos a la distancia de un femtómetro (diez a la menos quince metros), donde la fuerza nuclear fuerte atractiva supera a la repulsión eléctrica, es calentar el combustible hasta formar un plasma a más de ciento cincuenta millones de grados Celsius.",
      "En 1957, el físico británico John Lawson formuló el célebre criterio matemático que lleva su nombre para definir las condiciones necesarias de ignición termonuclear. El producto de la densidad iónica del plasma, la temperatura del núcleo y el tiempo de confinamiento de energía debe superar un umbral crítico. Si se alcanza este triple producto, la energía liberada por las partículas alfa de helio mantiene el plasma caliente sin requerir calefacción externa.",
      "Existen dos vías tecnológicas principales para dominar este proceso: el confinamiento inercial y el confinamiento magnético. En el confinamiento inercial, casi doscientos rayos láser ultravioleta de alta potencia comprimen una microcápsula esférica de combustible helado en milmillonésimas de segundo; en diciembre de 2022, la National Ignition Facility de Estados Unidos logró por primera vez en la historia humana una ganancia neta positiva de energía por fusión.",
      "La fusión nuclear ofrece una solución energética limpia y casi ilimitada para la civilización. A diferencia de las centrales nucleares de fisión actuales basadas en uranio, los reactores de fusión no conllevan riesgo alguno de accidentes descontrolados por reacción en cadena, ya que si el confinamiento falla el plasma se enfría en microsegundos, y su combustible de deuterio se extrae de manera abundante e inagotable del agua marina."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Los generadores hiperespaciales y reactores principales de los cazas TIE y destructores estelares imperiales funcionan con núcleos de fusión masivos que generan la potencia necesaria para saltar al hiperespacio. En la física real, dominar la fusión limpia es el pasaporte indispensable para convertirnos en una especie espacial interplanetaria."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un solo gramo de combustible de deuterio-tritio fusionado por completo produce la misma cantidad neta de energía térmica que la combustión química de ocho toneladas de petróleo crudo o once toneladas de carbón mineral fósil, sin emitir un solo gramo de dióxido de carbono a la atmósfera, liberando helio inerte como único residuo atómico de la reacción termonuclear."
      }
    ],
    "fact": "En diciembre de 2022, la Instalación Nacional de Ignición (NIF) en el Laboratorio Nacional Lawrence Livermore concentró 2.05 megajulios de energía láser ultravioleta sobre un blanco diminuto, logrando liberar 3.15 megajulios de energía por fusión nuclear neta, superando el umbral de ignición por primera vez con Q=1.54."
  },
  {
    "id": "rayos-ionicos",
    "title": "Cañones de Iones y Propulsión",
    "color": "#2979FF",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_rayos_ionicos.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_rayos_ionicos.webp",
    "bannerImage": "/assets/starwars/infographic_plasmas/banner_rayos_ionicos.webp",
    "bannerCaption": "Los motores iónicos aceleran gas xenón ionizado para generar empuje continuo, alcanzando velocidades de 90 km/s.",
    "content": [
      "En la ficción cinematográfica de Star Wars, los cañones de iones constituyen armas especializadas de neutralización táctica. Sus disparos luminosos azulados no fracturan mecánicamente los blindajes de las naves enemigas, sino que sobrecargan de inmediato sus redes eléctricas y circuitos de computación, dejando a acorazados estelares enteros flotando a la deriva como cáscaras inertes en medio del combate espacial.",
      "En la ingeniería aeroespacial del mundo real, los iones no se emplean primordialmente como armas de bombardeo, sino como el medio de propulsión más eficiente jamás inventado para navegar por el espacio profundo: la propulsión iónica electrostática y los propulsores de efecto Hall. Agencias espaciales como la NASA y la ESA han impulsado misiones científicas legendarias, tales como Deep Space 1, Dawn y BepiColombo, mediante estos motores.",
      "El principio de funcionamiento de un motor de iones consiste en ionizar un gas inerte pesado, típicamente xenón o kriptón, bombardeándolo con electrones energéticos para crear un plasma. A continuación, un par de rejillas de molibdeno sometidas a una diferencia de potencial eléctrico de miles de voltios aceleran los iones positivos hacia el exterior a velocidades supersónicas de entre treinta y cincuenta kilómetros por segundo.",
      "La ventaja competitiva de la propulsión iónica radica en su elevadísimo impulso específico, que supera los tres mil a cuatro mil segundos, en comparación con los escasos cuatrocientos cincuenta segundos de los cohetes químicos convencionales. Aunque el empuje generado en cada instante es sumamente suave (comparable a la presión que ejerce una hoja de papel sobre la palma de una mano), puede funcionar de forma ininterrumpida durante años en el vacío.",
      "Por otra parte, los efectos de sobrecarga electrónica que Star Wars atribuye a los cañones de iones se manifiestan en la realidad mediante el pulso electromagnético (EMP). Generado por detonaciones nucleares exoatmosféricas o cañones de microondas de alta potencia en laboratorio, un pulso electromagnético induce voltajes letales en las pistas microscópicas de los semiconductores, fundiendo los transistores por choque térmico."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Durante la evacuación rebelde de Hoth en El Imperio Contraataca, un enorme cañón de iones de superficie dispara descargas azules hacia el espacio exterior, incapacitando un destructor estelar imperial y permitiendo que los transportes de tropas de la Alianza escapen ilesos hacia el hiperespacio, ilustrando cinematográficamente los efectos disruptivos de pulsos electromagnéticos masivos en sistemas electrónicos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La sonda espacial Dawn de la NASA utilizó tres propulsores de iones electrostáticos NSTAR alimentados por paneles solares para viajar a través del cinturón de asteroides durante más de una década, operando durante más de cincuenta mil horas de empuje continuo acumulado con solo cuatrocientos veinticinco kilogramos de xenón."
      }
    ],
    "fact": "Los propulsores de efecto Hall expulsan iones de xenón a velocidades de escape superiores a 65,000 km/h (18 km/s), logrando una eficiencia de combustible diez veces superior a la de los mejores motores de combustible líquido criogénico de cohetes químicos convencionales como el RS-25 del transbordador espacial."
  },
  {
    "id": "estrella-muerte",
    "title": "La Estrella de la Muerte: Superláseres",
    "color": "#FF9100",
    "btnImage": "/assets/starwars/infographic_plasmas/btn_estrella_muerte.webp",
    "image": "/assets/starwars/infographic_plasmas/hero_estrella_muerte.webp",
    "bannerImage": "/assets/starwars/infographic_plasmas/banner_estrella_muerte.webp",
    "bannerCaption": "Los láseres de alta potencia concentran fotones coherentes mediante cristales amplificadores para transferir energía a largas distancias.",
    "content": [
      "La Estrella de la Muerte es el epítome de la destrucción masiva en la historia del cine: una megaestructura artificial con el volumen de una luna rocosa armada con un superláser colosal capaz de vaporizar planetas enteros de un solo disparo, como el desafortunado Alderaan. Analizar los requerimientos energéticos de semejante hazaña armamentista revela las proporciones titánicas impuestas por la astrofísica real.",
      "Para desintegrar un planeta rocoso como la Tierra de manera que sus escombros no vuelvan a colapsar sobre sí mismos debido a su propia gravedad, el haz de energía debe superar la llamada energía de enlace gravitacional del planeta. Calculada con la fórmula de tres quintos de la constante de gravitación universal multiplicada por la masa al cuadrado dividida por el radio planetario, esta magnitud define la cohesión intrínseca del cuerpo cósmico.",
      "Para nuestro planeta Tierra, este cálculo físico arroja una cifra verdaderamente descomunal: dos coma veinticuatro por diez elevado a treinta y dos julios de energía. Suministrar semejante cantidad de energía en una fracción de segundo requeriría consumir en un instante el equivalente a toda la radiación luminosa generada por nuestro Sol a lo largo de una semana entera, una magnitud que excede a todas las fuentes terrestres combinadas.",
      "Desde la perspectiva de la óptica física, el superláser cinematográfico muestra un fenómeno físicamente imposible en el vacío del espacio interestelar. En la película, ocho haces independientes de color verde convergen en un único foco geométrico sin lentes ni espejos y repentinamente se transforman en un único rayo unificado. En la realidad cuántica, los fotones no interactúan entre sí mecánicamente y continuarían en línea recta cruzándose sin fundirse.",
      "En la física experimental contemporánea, los científicos investigan la materia bajo condiciones extremas utilizando los láseres más potentes del planeta, como el sistema ELI de Europa y el láser Apollon de diez petavatios en Francia. Aunque operan en escalas temporales de femtosegundos y no destruyen planetas, estos pulsos ultraconcentrados permiten simular el nacimiento de estrellas de neutrones y probar los límites cuánticos del espacio-tiempo."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La orden del Gran Moff Tarkin «Pueden disparar cuando estén listos» condena al idílico planeta Alderaan a una aniquilación instantánea que deja solo un campo de asteroides. En la astrofísica real, destruir un planeta requeriría consumir toda la masa de una luna mediana convertida íntegramente en energía pura mediante aniquilación de antimateria."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para disipar el calor residual generado al disparar una energía de diez a la treinta y dos julios con un noventa y nueve por ciento de eficiencia, la estación espacial sufriría una vaporización térmica interna inmediata si no contara con radiadores de emisión radiativa del tamaño de continentes enteros."
      }
    ],
    "fact": "La energía de enlace gravitatoria de la Tierra es de 2.24 x 10^32 julios; suministrar esa energía en un segundo exigiría una potencia de 2.24 x 10^32 vatios, superando en un factor de seiscientos mil millones la potencia eléctrica combinada que produce toda la civilización humana global durante un año entero."
  },
  {
    "id": "fusion-tokamak",
    "title": "Plasma en Fusión Nuclear: El Sol en una Botella",
    "color": "#FF7043",
    "btnImage": "/assets/starwars/swsec6/btn_fusion-tokamak.webp",
    "image": "/assets/starwars/swsec6/hero_fusion_tokamak.webp",
    "content": [
      "El reactor de fusión tipo Tokamak representa el esfuerzo de ingeniería más audaz y sofisticado jamás emprendido por la humanidad para crear un sol artificial dentro de una botella magnética terrestre. Inventado originalmente en la Unión Soviética por Igor Tamm y Andréi Sájarov en la década de 1950, su arquitectura toroidal resuelve el problema fundamental de evitar que el plasma caliente entre en contacto con paredes materiales sólidas.",
      "En un Tokamak, el combustible de gas ionizado de deuterio y tritio se mantiene levitando en el vacío dentro de una cámara anular en forma de rosquilla. Para evitar que las partículas se desvíen por las curvaturas del campo toroidal, un transformador central induce una corriente eléctrica masiva de millones de amperios dentro del propio plasma, generando un campo poloidal que retuerce las líneas magnéticas en una hélice cerrada de estabilidad milimétrica.",
      "El corazón de la vanguardia mundial es el proyecto ITER, construido por un consorcio de treinta y cinco naciones en Cadarache, en el sur de Francia. Con una cámara de vacío de ochocientos cuarenta metros cúbicos y un peso superior a veintitrés mil toneladas, el reactor albergará un plasma termonuclear mantenido a ciento cincuenta millones de grados Celsius, diez veces más caliente que el núcleo de nuestro propio Sol.",
      "El objetivo histórico de diseño de ITER es lograr un factor de amplificación energética Q igual a diez. Esto significa que inyectando cincuenta megavatios de potencia térmica auxiliar mediante microondas y haces neutros acelerados, el reactor generará quinientos megavatios de potencia neta por fusión durante pulsos sostenidos de varios minutos, demostrando la viabilidad comercial y tecnológica de la energía estelar en la Tierra.",
      "Uno de los desafíos de ingeniería más extremos se ubica en el fondo de la vasija: el divertor. Este componente absorbe el calor residual y extrae las cenizas de helio del plasma, soportando cargas térmicas constantes de hasta veinte megavatios por metro cuadrado sobre bloques de tungsteno macizo refrigerados por agua supercrítica, en un entorno sometido a un flujo incesante de neutrones energéticos de catorce megaelectronvoltios."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Las ciudades flotantes como Cloud City en Bespin extraen y refinan gas tibanna mediante gigantescos reactores electromagnéticos suspendidos en las capas gaseosas atmosféricas. En la realidad, las plantas de energía del siglo XXI dependerán de tokamaks como ITER para alimentar ciudades enteras sin quemar hidrocarburos ni emitir hollín."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los imanes de campo toroidal de ITER están fabricados con aleaciones superconductoras de niobio-estaño (Nb3Sn) y niobio-titanio enfriadas con helio supercrítico a cuatro coma cinco Kelvin (-269 °C), almacenando una energía magnética total de cuarenta y un gigajulios, capaz de frenar un tren de alta velocidad en marcha."
      }
    ],
    "bannerImage": "/assets/starwars/infographic_sec6/banner_fusion-tokamak.webp",
    "bannerCaption": "El tokamak ITER: plasma a 150 millones de grados confinado por imanes superconductores — la energía del futuro",
    "fact": "El plasma en el interior de ITER alcanzará ciento cincuenta millones de grados Celsius (diez veces la temperatura del núcleo solar de 15 millones de grados), suspendido en el vacío a escasos metros de bobinas magnéticas superconductoras mantenidas a cuatro Kelvin (-269 °C), el mayor gradiente térmico del universo conocido."
  },
  {
    "id": "sonoluminiscencia",
    "title": "Sonoluminiscencia: Luz del Sonido, Misterio del Plasma",
    "color": "#7E57C2",
    "btnImage": "/assets/starwars/swsec6/btn_sonoluminiscencia.webp",
    "image": "/assets/starwars/swsec6/hero_sonoluminiscencia.webp",
    "content": [
      "La sonoluminiscencia es uno de los fenómenos físicos más desconcertantes y bellos de la física moderna: la conversión directa de energía acústica en destellos luminosos ultracortos. Descubierta accidentalmente en 1934 en la Universidad de Colonia, ocurre cuando ondas de ultrasonido de alta frecuencia concentradas en un líquido provocan que microburbujas de gas suspendidas colapsen con una violencia extrema emitiendo luz visible y ultravioleta.",
      "La hidrodinámica del colapso está descrita rigurosamente por la ecuación de Rayleigh-Plesset. Durante la fase de baja presión del ciclo acústico, la burbuja se expande hasta decenas de veces su tamaño inicial; cuando la onda ultrasónica pasa a la fase de compresión brusca, la masa del agua circundante aplasta la burbuja a velocidades hipersónicas, concentrando la energía dispersa en un volumen de fracciones de micrómetro.",
      "En el epicentro del colapso de la burbuja, las temperaturas estimadas por espectroscopía óptica oscilan entre diez mil y cientos de miles de grados Celsius en una fracción infinitesimal de segundo. A estas temperaturas colosales, los átomos de gas noble atrapados en la cavidad se ionizan de forma repentina, transformando el interior de la burbuja en un microplasma caliente transitorio que emite radiación de cuerpo negro y bremsstrahlung térmico.",
      "La duración de cada destello luminoso emitido en la sonoluminiscencia de burbuja única es extraordinariamente breve, rondando entre treinta y trescientos picosegundos (diez a la menos diez segundos). Esta concentración de potencia en tiempos tan microscópicos llevó a prestigiosos grupos científicos a investigar la hipotética fusión inducida por cavitación acústica («fusión por burbujas»), un campo polémico que refinó el entendimiento de la física de cavitación.",
      "Hoy en día, los conocimientos derivados del estudio de estos microplasmas acústicos alimentan aplicaciones de vanguardia en la ingeniería biomédica contemporánea. La cavitación ultrasónica focalizada permite abrir selectivamente la barrera hematoencefálica para administrar quimioterapia en tumores cerebrales sin cirugía, además de utilizarse en la sonofitoquímica para neutralizar contaminantes orgánicos persistentes en aguas residuales industriales."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el Episodio II: El Ataque de los Clones, el cazarrecompensas Jango Fett persigue a Obi-Wan a través de los anillos del planeta Geonosis arrojando cargas sísmicas que detonan en un sobrecogedor silencio cósmico inicial antes de liberar un pulso acústico devastador que pulveriza asteroides, mostrando el poder destructivo de las ondas de choque extremas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La duración del pulso de luz emitido en la sonoluminiscencia de burbuja única es tan asombrosamente breve que ronda entre treinta y trescientos picosegundos, con una potencia instantánea de radiación térmica emitida similar a la superficie del Sol pero concentrada en un radio menor a una micra, desconcertando a los físicos sobre los límites extremos de la compresión acústica y la ionización molecular rápida."
      }
    ],
    "bannerImage": "/assets/starwars/infographic_sec6/banner_sonoluminiscencia.webp",
    "bannerCaption": "Sonoluminiscencia: una burbuja que colapsa por ultrasonido crea plasma a millones de grados por nanosegundos",
    "fact": "En el colapso de sonoluminiscencia, la concentración de energía mecánica acústica en energía lumínica representa un factor de amplificación de densidad energética de doce órdenes de magnitud (un billón de veces), transformando ondas sonoras audibles en fotones ultravioletas y estados ionizados de plasma a decenas de miles de grados."
  },
  {
    "id": "magnetares-plasma",
    "title": "Magnetares: El Plasma más Extremo del Universo",
    "color": "#26A69A",
    "btnImage": "/assets/starwars/swsec6/btn_magnetares-plasma.webp",
    "image": "/assets/starwars/swsec6/hero_magnetar.webp",
    "content": [
      "Los magnetares son las centrales electromagnéticas más violentas y aterradoras de todo el cosmos observable. Nacidos tras la muerte cataclísmica de estrellas hipermasivas en explosiones de supernova, estos remanentes estelares comprimen una masa equivalente a una estrella y media similar a nuestro Sol en una esfera sólida de neutrones y plasma de tan solo veinte kilómetros de diámetro que gira vertiginosamente.",
      "La característica definitoria de un magnetar es su campo magnético descomunal, que alcanza intensidades de entre diez a la diez y diez a la once teslas (hasta diez a la quince gauss). En comparación, el campo magnético que orienta las brújulas en la Tierra ronda apenas el medio gauss, y los mejores imanes de laboratorio humano alcanzan con gran esfuerzo cuarenta teslas, haciendo a los magnetares trillones de veces más potentes.",
      "Bajo estas condiciones descomunales, se rebasa el llamado campo cuántico crítico de Schwinger de cuarenta y cuatro mil millones de gauss. A este nivel, las reglas de la física ordinaria se quiebran: el vacío del espacio deja de ser neutro y se vuelve birrefringente a la luz dividiendo los haces luminosos, los átomos de materia se comprimen en filamentos microscópicos alargados y los fotones de rayos gamma se desintegran espontáneamente en pares electrón-positrón.",
      "Las tensiones magnéticas monstruosas deforman periódicamente la corteza rígida de hierro y neutrones del magnetar, provocando sismos estelares o «starquakes». Una fractura de apenas un micrómetro en la corteza sólida libera una energía magnética acumulada inmensa, proyectando una bola de fuego de plasma relativista de electrones y positrones al espacio a velocidades cercanas a la de la luz en forma de erupción gigantesca de rayos gamma.",
      "El mayor cataclismo astrofísico de este tipo jamás registrado por la humanidad ocurrió el 27 de diciembre de 2004, cuando el magnetar SGR 1806-20 emitió una llamarada gigante. A pesar de encontrarse a cincuenta mil años luz de distancia en el extremo opuesto de la Vía Láctea, el pulso de energía ionizó la atmósfera superior de la Tierra a medianoche y saturó los detectores de satélites espaciales científicos en órbita."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Ni siquiera la Estrella de la Muerte o los destructores estelares clase Ejecutor podrían acercarse a un magnetar real. A mil kilómetros de distancia de su superficie, el gradiente magnético es tan inimaginablemente brutal que rasgaría las nubes electrónicas de los átomos de tu cuerpo, disolviendo toda estructura biológica en milisegundos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El límite de campo cuántico de Schwinger ($4.4 \\times 10^9$ teslas) es el umbral teórico donde la energía magnética interactúa directamente con la energía de masa en reposo del electrón, provocando fenómenos de polarización del vacío y desintegración fotónica predichos por la electrodinámica cuántica no lineal."
      }
    ],
    "bannerImage": "/assets/starwars/infographic_sec6/banner_magnetares-plasma.webp",
    "bannerCaption": "Magnetares: estrellas de neutrones con campos magnéticos un billón de veces más fuertes que el de la Tierra",
    "fact": "El destello del magnetar SGR 1806-20 registrado en diciembre de 2004 emitió diez elevado a treinta y nueve julios en dos décimas de segundo; a pesar de encontrarse a 50,000 años luz de distancia en el lado opuesto de la Vía Láctea, la llamarada de rayos gamma ionizó la atmósfera superior de la Tierra y cegó satélites de la NASA."
  }
];

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
};

const EXPAND_ICONS = {
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  atom: <Atom size={18} />,
  sparkles: <Sparkles size={18} />
};

/* =========================================================================
   3. COMPONENTS
   ========================================================================= */

const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.05) + 0.01
    }));

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.005) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(200,220,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#448AFF',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(68, 138, 255, 0.4)'
      }}>
        FÍSICA DE PLASMAS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        SABLES LÁSER &middot; BLASTERS &middot; FUSIÓN
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec6" : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} 
          />
        ))}
      </div>
    </div>
  );
};

const NodeButton = ({ node, isVisited, onClick }) => {
  const isComplete = isVisited(node.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(node)}
      style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        padding: 0,
        border: `3px solid ${isComplete ? node.color : '#333'}`,
        background: '#1A1C29',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isComplete ? `0 0 15px ${node.color}55` : 'none',
        zIndex: 10
      }}
    >
      <img 
        src={node.btnImage} 
        alt={node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isComplete ? 1 : 0.6 }}
       loading="lazy" />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px', background: node.color, borderRadius:'50%',
          padding: '2px'
        }}>
          <Sparkles size={12} color="#000" />
        </div>
      )}
    </motion.button>
  );
};

const ExpandableSection = ({ data, color, direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const variant = dirVariants[direction] || dirVariants.up;
  
  return (
    <div style={{ marginBottom: '1rem', background: '#1A1C29', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${color}33` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: isOpen ? `${color}11` : 'transparent',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          fontFamily: '"Oswald", sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>
              {data.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoAtom;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoLightning;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        inset: '2rem',
        background: '#0B0D17',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}  loading="lazy" />
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>{node.title}</h2>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
              width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
            }} />
          </div>
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[1]}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
                <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATAFILA
              </div>
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
                {node.fact}
              </p>
            </div>
            <div>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
              ))}
            </div>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '2rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}33` }}>
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif', fontStyle: 'italic' }}>
                  {node.bannerCaption}
                </div>
              )}
            </div>
          )}

          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[3]}
          </p>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[4]}
          </p>
        </div>
      </div>
      
      <div style={{ padding: '1rem 2rem', background: '#1A1C29', borderTop: `1px solid ${node.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ color: '#90A4AE', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
          ARCHIVOS DEL TEMPLO / {node.title.toUpperCase()}
        </div>
        <button 
          onClick={onNext}
          style={{ 
            background: node.color, 
            color: '#000', 
            border: 'none', 
            padding: '0.75rem 2rem', 
            borderRadius: '24px', 
            fontWeight: 'bold', 
            fontFamily: '"Oswald", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: `0 4px 15px ${node.color}66`
          }}
        >
          {isLast ? 'FINALIZAR' : 'SIGUIENTE'} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec6() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

  const progress = (visitedNodes.size / INFOGRAPHIC_NODES.length) * 100;
  const isAllComplete = visitedNodes.size === INFOGRAPHIC_NODES.length;

  const handleNodeClick = (node) => {
    setActiveNode(node.id);
    if (!visitedNodes.has(node.id)) {
      setVisitedNodes(prev => new Set(prev).add(node.id));
    }
  };

  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      const nextNode = INFOGRAPHIC_NODES[currentIndex + 1];
      handleNodeClick(nextNode);
    } else {
      setActiveNode(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05060A', overflow: 'hidden', fontFamily: '"Lora", serif' }}>
      <StarField />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_plasmas/bg_plasmas.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNode} />
        
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '800px', 
          height: '400px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NodeButton node={node} isVisited={(id) => visitedNodes.has(id)} onClick={handleNodeClick} />
            </motion.div>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '600px', marginTop: '4rem', background: '#1A1C29', borderRadius: '12px', padding: '1rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: '"Oswald", sans-serif', color: '#90A4AE' }}>
            <span>CONEXIÓN CON LA FUERZA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #448AFF, #FF1744)', boxShadow: '0 0 10px #448AFF' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #FF5252, #2979FF)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(68, 138, 255, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_plasmas/badge_plasmas.webp" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              ¡ANÁLISIS DE PLASMA COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>


        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÓN (Bibliografía)</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#78909C', fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>

      </div>

      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
