'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Comet themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoComet({ size = 70, color = '#81D4FA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="40" r="8" fill={color} opacity="0.8" />
      <circle cx="20" cy="40" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M 24 36 L 50 10 L 55 15 L 28 42 Z" fill={color} opacity="0.3" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="48" cy="28" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCometTail({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 50 Q 30 40 50 10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round" />
      <path d="M 15 55 Q 35 45 55 15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M 5 45 Q 25 35 45 5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <circle cx="10" cy="50" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoOrbit({ size = 80, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="4 4" />
      <path d="M 5 20 Q 40 -10 75 20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFB300" opacity="0.7" />
      <circle cx="75" cy="20" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoMolecule({ size = 60, color = '#7E57C2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.8" />
      <circle cx="15" cy="15" r="5" fill={color} opacity="0.6" />
      <circle cx="45" cy="45" r="5" fill={color} opacity="0.6" />
      <line x1="19" y1="19" x2="26" y2="26" stroke={color} strokeWidth="2" />
      <line x1="34" y1="34" x2="41" y2="41" stroke={color} strokeWidth="2" />
      <line x1="21" y1="17" x2="28" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStarMap({ size = 70, color = '#FFB300', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
      <line x1="15" y1="20" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="40" x2="35" y2="50" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="40" x2="50" y2="25" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="15" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="45" cy="40" r="4" fill={color} opacity="0.9" />
      <circle cx="35" cy="50" r="2" fill={color} opacity="0.6" />
      <circle cx="50" cy="25" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-borisov': [DecoComet, DecoStarMap, DecoOrbit],
  'confirmacion-interestelar': [DecoOrbit, DecoCometTail, DecoStarMap],
  'primer-cometa-alien': [DecoCometTail, DecoMolecule, DecoComet],
  'composicion-molecular': [DecoMolecule, DecoOrbit, DecoCometTail],
  'nucleo-fragmentacion': [DecoComet, DecoMolecule, DecoStarMap],
  'sistema-origen': [DecoStarMap, DecoOrbit, DecoCometTail],
  'comparacion-oumuamua': [DecoOrbit, DecoComet, DecoMolecule],
}; const BIBLIOGRAPHY = ['Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", ApJ Letters, 886',
  'Bodewits, D. et al. (2020). "The carbon monoxide-rich interstellar comet 2I/Borisov", Nature Astronomy, 4',
  'Cordiner, M. et al. (2020). "Unusually high CO abundance of the first unambiguously identified interstellar comet", Nature Astronomy, 4',
  'Guzik, P. et al. (2020). "Initial characterization of interstellar comet 2I/Borisov", Nature Astronomy, 4',
  'Bailer-Jones, C.A.L. et al. (2020). "A search for the origin of the interstellar comet 2I/Borisov", A&A, 634'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "descubrimiento-borisov",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_descubrimiento-borisov.webp',
    diagramCaption: 'Borisov 2019: el astrónomo amateur Gennady Borisov descubrió el segundo objeto interestelar con su telescopio casero',
    "title": "El Descubrimiento",
    "color": "#81D4FA",
    "btnImage": "/assets/interestelar/infographic_m3/btn_descubrimiento-borisov.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_descubrimiento-borisov.jpg",
    "content": [
      "En la madrugada del 30 de agosto de 2019, el astrónomo aficionado y consumado constructor de telescopios Gennadiy Borisov se encontraba en su observatorio personal MARGO, emplazado en la localidad de Nauchny, en la península de Crimea. Mientras escudriñaba minuciosamente el cielo nororiental en la constelación de Casiopea antes del amanecer, detectó una débil mota difusa en movimiento que no figuraba en ningún atlas estelar previo.",
      "Para realizar el avistamiento, Borisov utilizó un telescopio reflector de 0.65 metros de apertura con óptica astrométrica de campo amplio diseñado y construido enteramente por sus propias manos. El instrumento disponía de una cámara digital CCD de alta sensibilidad con la que capturó múltiples exposiciones consecutivas, permitiéndole advertir un desplazamiento angular neto respecto al fondo de estrellas que delataba la presencia de un cometa activo desconocido.",
      "A diferencia de los observatorios astronómicos profesionales automatizados que suelen rastrear franjas del cielo a medianoche, Borisov concentró su rastreo a baja altura sobre el horizonte oriental, una región celeste descartada frecuentemente por los sondeos oficiales debido a la turbulencia atmosférica y el crepúsculo. Esta estrategia observacional audaz le permitió localizar al viajero con notable anticipación balística.",
      "Borisov reportó de inmediato las coordenadas ecuatoriales precisas a la base de datos de objetos cercanos a la Tierra del Centro de Planetas Menores en Cambridge, Massachusetts. En pocas horas, decenas de telescopios en todo el mundo se volcaron sobre las coordenadas indicadas, confirmando que la difusa condensación central estaba envuelta en una coma evidente y presentaba una tenue cola de polvo orientada en sentido antisolar.",
      "El Centro de Planetas Menores asignó inicialmente al objeto la designación provisional de cometa C/2019 Q4 (Borisov). La comunidad astrofísica internacional recibió la noticia con enorme expectación, pues los primeros cálculos cinemáticos sugerían una trayectoria hiperbólica extrema que no parecía pertenecer a ningún cuerpo conocido confinado en el sistema solar interior."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Gennadiy Borisov no utilizó telescopios de miles de millones de dólares para este histórico descubrimiento. Fabricó su telescopio reflector de 65 centímetros con espejos tallados personalmente en su taller doméstico, dedicando años de noches despejadas al rastreo visual del horizonte crepuscular mientras los grandes telescopios robóticos dormían."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las primeras observaciones astrométricas reportadas por Borisov cubrieron un arco orbital preliminar de apenas unas horas, pero revelaron una velocidad geocéntrica de 30 kilómetros por segundo. La rápida publicación de sus datos permitió al Observatorio Europeo Austral y a observatorios de Hawái confirmar la órbita en menos de cuarenta y ocho horas."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_descubrimiento-borisov.webp",
    "bannerCaption": "Borisov 2019: el astrónomo amateur Gennady Borisov descubrió el segundo objeto interestelar con su telescopio casero",
    "fact": "El descubrimiento de 2I/Borisov el 30 de agosto de 2019 por Gennadiy Borisov representó la primera vez en la historia moderna en que un astrónomo independiente descubrió un objeto interestelar empleando un telescopio reflector artesanal de 0.65 metros, adelantándose a los grandes sondeos automatizados mundiales."
  },
  {
    "id": "confirmacion-interestelar",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_confirmacion-interestelar.webp',
    diagramCaption: 'Confirmación interestelar: excentricidad de 3.36, muy por encima del 1.0 necesario para ser interestelar',
    "title": "Confirmación Interestelar",
    "color": "#1565C0",
    "btnImage": "/assets/interestelar/infographic_m3/btn_confirmacion-interestelar.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_confirmacion-interestelar.jpg",
    "content": [
      "A los pocos días del reporte inicial, observatorios de renombre global como el Gran Telescopio Canarias en España, el telescopio Gemini Norte en Hawái y el Very Large Telescope en Chile recopilaron cientos de mediciones astrométricas independientes. La precisión combinada de estos datos permitió fijar con rigor matemático indiscutible los parámetros orbitales de la trayectoria de C/2019 Q4.",
      "El resultado de las ecuaciones orbitales conmocionó a los astrofísicos: el cometa exhibía una excentricidad orbital de e = 3.356. En la historia registrada de la astronomía, ningún cuerpo natural había mostrado jamás una excentricidad tan descomunal. El récord anterior pertenecía a 'Oumuamua con un valor de 1.1995, por lo que Borisov pulverizó ampliamente cualquier registro de apertura hiperbólica jamás medido.",
      "Una excentricidad superior a 3.0 significa que la órbita es una hipérbola extraordinariamente abierta y tensa, incompatible con cualquier perturbación gravitatoria inducida por planetas masivos como Júpiter o Saturno sobre un cometa procedente de la lejana nube de Oort. No cabía duda matemática posible: el cometa no estaba ni había estado nunca gravitacionalmente atrapado por el pozo de potencial del Sol.",
      "El cálculo de la velocidad asintótica de exceso hiperbólico al infinito arrojó una cifra vertiginosa de 32.2 kilómetros por segundo respecto al reposo local galáctico. El bólido se desplazaba a través del espacio con un vector de energía cinética tan descomunal que la gravedad solar apenas logró curvar suavemente su camino en un ángulo de deflexión moderado sin frenar su avance.",
      "El 24 de septiembre de 2019, la Unión Astronómica Internacional emitió un comunicado histórico bautizando oficialmente al objeto como 2I/Borisov. El prefijo «2I» lo consagró formalmente como el segundo objeto interestelar de la historia de la ciencia y el primer cometa interestelar genuino que exhibía actividad de desgasificación activa al aproximarse al astro rey."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los cometas hiperbólicos del sistema solar suelen alcanzar como máximo excentricidades de 1.01 o 1.02 cuando sufren el empuje de la gravedad de Júpiter. Un valor de 3.356 representaba una imposibilidad absoluta de pertenencia local, confirmando de manera instantánea y tajante que venía disparado directamente desde las profundidades del espacio interestelar."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El parámetro de energía orbital específica de 2I/Borisov, expresado mediante la constante C3 de exceso hiperbólico, alcanzó aproximadamente 1037 km²/s². Esta enorme energía orbital positiva demostró que su paso por el sistema solar interior fue un evento transitorio irrepetible a lo largo de toda la historia cósmica."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_confirmacion-interestelar.webp",
    "bannerCaption": "Confirmación interestelar: excentricidad de 3.36, muy por encima del 1.0 necesario para ser interestelar",
    "fact": "La excentricidad orbital calculada para 2I/Borisov alcanzó un valor numérico récord de e = 3.356, con una velocidad de exceso al infinito de 32.2 km/s y una inclinación orbital de 44.05°. Estos guarismos matemáticos establecieron el récord indiscutido de trayectoria hiperbólica abierta en toda la historia de la observación astronómica."
  },
  {
    "id": "primer-cometa-alien",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_primer-cometa-alien.webp',
    diagramCaption: 'El primer cometa alienígena: Borisov tiene coma, colas y desgasifica como un cometa normal pero de otra estrella',
    "title": "Primer Cometa de Otro Sistema",
    "color": "#00BCD4",
    "btnImage": "/assets/interestelar/infographic_m3/btn_primer-cometa-alien.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_primer-cometa-alien.jpg",
    "content": [
      "El aspecto físico de 2I/Borisov causó un impacto extraordinario en la comunidad científica porque presentaba todas las características visuales y dinámicas de un cometa clásico maduro. Rodeando a su diminuto núcleo sólido se extendía una coma esférica brillante de gas ionizado y partículas de polvo de decenas de miles de kilómetros de diámetro, seguida por una cola difusa que se alargaba en el espacio.",
      "A medida que el calor solar incidía sobre la corteza congelada del cometa, los hielos primordiales comenzaron a sublimar directamente de fase sólida a gas. Las observaciones espectroscópicas tempranas realizadas con el Telescopio William Herschel en La Palma y el Observatorio Keck en Hawái detectaron con claridad la emisión luminosa de moléculas de cianógeno (CN) y de carbono diatómico (C2) en la envoltura gaseosa.",
      "La detección de estas moléculas volátiles resultó profundamente reveladora para los astrofísicos. El cianógeno y el carbono diatómico son componentes químicos arquetípicos presentes en prácticamente todos los cometas nacidos en el sistema solar, desde los que orbitan en la lejana nube de Oort hasta los cometas de la familia de Júpiter. La física de los cometas interestelares compartía las mismas leyes universales.",
      "Los astrónomos lograron estimar la tasa de producción de polvo y la velocidad de eyección de las partículas microscópicas. Las partículas de polvo expulsadas eran arrastradas suavemente por la presión de radiación fotónica del Sol, formando una estela que se extendía a lo largo de más de cien mil kilómetros, ofreciendo a los telescopios un laboratorio natural para medir el tamaño y la distribución de los granos cósmicos.",
      "Este comportamiento contrastó de forma radical con el enigma que había planteado 'Oumuamua dos años antes. Mientras que el primer visitante interestelar desconcertó a los teóricos por su total carencia de envoltura cometaria visible, 2I/Borisov se comportaba de manera perfectamente comprensible y predecible bajo los modelos termodinámicos de sublimación superficial estándar."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La coma de gas y polvo de 2I/Borisov llegó a superar en volumen físico al tamaño del planeta Júpiter. Aunque el núcleo de hielo sólido medía menos de un kilómetro de diámetro, la tenue nube de moléculas brillantes iluminadas por el Sol se expandió a lo largo de más de 150.000 kilómetros en el espacio circundante."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las mediciones espectrofotométricas fijaron una tasa de producción de cianógeno de aproximadamente 3.7 × 10²⁴ moléculas por segundo cuando el cometa se encontraba a 2.6 unidades astronómicas del Sol. Esta tasa de desgasificación coincidía plenamente con los rangos típicos exhibidos por los cometas locales del sistema solar a distancias heliocéntricas análogas."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_primer-cometa-alien.webp",
    "bannerCaption": "El primer cometa alienígena: Borisov tiene coma, colas y desgasifica como un cometa normal pero de otra estrella",
    "fact": "2I/Borisov se consagró como el primer cometa genuinamente interestelar identificado por la ciencia, exhibiendo una coma activa de más de 100.000 kilómetros de diámetro y desgasificación detectable de moléculas de cianógeno (CN) y carbono diatómico (C₂), demostrando que los hielos cometarios son universales en la galaxia."
  },
  {
    "id": "composicion-molecular",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_composicion-molecular.webp',
    diagramCaption: 'Composición molecular: agua y monóxido de carbono en alta proporción, formado muy lejos de su estrella natal',
    "title": "Composición Molecular",
    "color": "#7E57C2",
    "btnImage": "/assets/interestelar/infographic_m3/btn_composicion-molecular.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_composicion-molecular.jpg",
    "content": [
      "El análisis químico más trascendental sobre 2I/Borisov se llevó a cabo utilizando el Atacama Large Millimeter/submillimeter Array (ALMA), un complejo de sesenta y seis antenas de alta precisión situado a 5.000 metros de altitud en el desierto de Atacama en Chile, complementado por el Telescopio Espacial Hubble y el telescopio orbital Neil Gehrels Swift de la NASA.",
      "Cuando las antenas de ALMA sintonizaron las frecuencias submilimétricas emitidas por los gases de la coma cometaria, los radioastrónomos descubrieron un fenómeno químico sin parangón: el cometa liberaba torrentes colosales de monóxido de carbono (CO). Las mediciones revelaron que la concentración molecular de monóxido de carbono superaba ampliamente la concentración habitual presente en casi todos los cometas del sistema solar.",
      "En los cometas originados en nuestro sistema planetario, el agua congelada (H2O) es invariablemente el ingrediente volátil más abundante, mientras que el monóxido de carbono representa solo entre un dos y un diez por ciento de la composición total de hielos. En 2I/Borisov, la abundancia relativa de CO frente a H2O resultó ser entre tres y diez veces mayor que el promedio local, compitiendo directamente con el vapor de agua.",
      "Esta composición exótica aportó pistas concluyentes sobre el entorno astrofísico en el que se gestó el cometa. El monóxido de carbono es un gas extremadamente volátil que únicamente puede condensarse en hielo sólido en regiones con temperaturas criogénicas inferiores a 25 kelvin, equivalentes a 248 grados Celsius bajo cero. Su núcleo debió condensarse en un ambiente gélido y protegido.",
      "Los investigadores dedujeron que 2I/Borisov se formó más allá de la línea de congelación de monóxido de carbono en las regiones remotas y ultrafrías del disco protoplanetario de su estrella progenitora. Este ambiente químico sugiere una formación probable alrededor de una estrella enana roja de tipo M, las estrellas más frías, tenues y numerosas de la Vía Láctea, donde la radiación estelar es reducida."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La cantidad de monóxido de carbono liberada por Borisov era tan abrumadora que emitía gas a un ritmo superior a sesenta kilogramos de CO por segundo. Respirar en las proximidades de su coma habría sido mortal de forma instantánea debido a la enorme toxicidad de este compuesto volátil concentrado en su envoltura."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las observaciones radioastronómicas con ALMA y el instrumento COS del Hubble cuantificaron una relación molecular CO/H₂O de entre 0.35 y 1.7 en la coma interior de Borisov. Esta cifra es un orden de magnitud superior a la media de los cometas locales de la nube de Oort, fijada típicamente en valores inferiores a 0.04."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_composicion-molecular.webp",
    "bannerCaption": "Composición molecular: agua y monóxido de carbono en alta proporción, formado muy lejos de su estrella natal",
    "fact": "Las mediciones espectroscópicas de ALMA y el Telescopio Espacial Hubble detectaron una concentración de monóxido de carbono (CO) de tres a diez veces mayor que la de cualquier cometa promedio del sistema solar. Esto evidenció que 2I/Borisov se condensó en un disco protoplanetario extrasolar criogénico a temperaturas inferiores a 25 Kelvin."
  },
  {
    "id": "nucleo-fragmentacion",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_nucleo-fragmentacion.webp',
    diagramCaption: 'Fragmentación del núcleo: en abril 2020 el Hubble observó a Borisov partiéndose en dos pedazos',
    "title": "El Núcleo y la Fragmentación",
    "color": "#69F0AE",
    "btnImage": "/assets/interestelar/infographic_m3/btn_nucleo-fragmentacion.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_nucleo-fragmentacion.jpg",
    "content": [
      "Determinar las dimensiones exactas del núcleo sólido de 2I/Borisov constituyó un formidable desafío observacional debido a que la densa coma de polvo encubría por completo la superficie rocosa y helada. Para penetrar esta envoltura difusa, los astrónomos recurrieron al poder de resolución angular del Telescopio Espacial Hubble de la NASA y la ESA y a los observatorios terrestres más avanzados del mundo.",
      "Mediante complejas técnicas de sustracción matemática del perfil lumínico de la coma, los científicos del Hubble lograron restringir el tamaño del núcleo cometario a un radio de entre doscientos y quinientos metros. Se trataba de un cuerpo compacto y relativamente pequeño, lo que hacía aún más impresionante la descomunal nube de gas brillante que era capaz de desplegar a su alrededor en el espacio.",
      "El 8 de diciembre de 2019, 2I/Borisov cruzó con éxito su perihelio a una distancia mínima de dos unidades astronómicas del Sol, situándose justo más allá de la órbita del planeta Marte. Durante este máximo acercamiento térmico, la radiación solar calentó intensamente las capas superficiales del núcleo, provocando gradientes de presión interna y violentos estallidos de desgasificación localizada.",
      "En marzo de 2020, imágenes de ultraalta resolución captadas por la Cámara de Gran Campo 3 del Hubble detectaron una anomalía dramática: el núcleo presentaba dos fuentes puntuales de luz separadas por menos de cien kilómetros. El cometa había experimentado un proceso de fragmentación parcial o eyección de un fragmento secundario desprendido de su cuerpo principal.",
      "Los análisis fotométricos revelaron que el fragmento desprendido no destruyó por completo al viajero cósmico, sino que constituyó un evento no catastrófico donde una sección de su corteza helada se quebró debido a la presión acumulada por los hielos de monóxido de carbono en ebullición. El fragmento menor se sublimó y desvaneció gradualmente en pocas semanas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cuando el Hubble fotografió la fragmentación de Borisov a principios de 2020, muchos astrónomos temieron que el cometa se desintegrara por completo como le ocurrió al cometa ATLAS. Sin embargo, el núcleo aguantó con firmeza y solo perdió una pequeña lasca superficial, continuando su viaje cósmico sin desviarse de su ruta."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El modelo de dispersión de luz del Hubble restringió el radio efectivo del núcleo sólido de Borisov en R = 0.4 ± 0.2 kilómetros, con una masa estimada entre 1 × 10⁸ y 2 × 10⁹ kilogramos, asumiendo una densidad porosa estándar de 500 kilogramos por metro cúbico típica de núcleos cometarios primitivos."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_nucleo-fragmentacion.webp",
    "bannerCaption": "Fragmentación del núcleo: en abril 2020 el Hubble observó a Borisov partiéndose en dos pedazos",
    "fact": "El seguimiento con el Telescopio Espacial Hubble restringió el radio del núcleo de 2I/Borisov a entre 200 y 500 metros. En marzo de 2020, el telescopio registró la eyección de un fragmento menor debido a la presión de sublimación del CO tras cruzar el perihelio a 2.006 UA del Sol, confirmando una fragmentación parcial no destructiva."
  },
  {
    "id": "sistema-origen",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_sistema-origen.webp',
    diagramCaption: 'Sistema de origen: el trayecto de Borisov apunta a Krueger 60, sistema binario de enanas rojas en Cefeo',
    "title": "¿De Dónde Vino?",
    "color": "#FFB300",
    "btnImage": "/assets/interestelar/infographic_m3/btn_sistema-origen.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_sistema-origen.jpg",
    "content": [
      "Una de las metas más fascinantes y complejas para los astrofísicos tras la confirmación de la órbita de 2I/Borisov consistió en reconstruir su vector cinemático hacia el pasado para intentar identificar el sistema estelar específico del que había sido expulsado hace incontables millones de años. Analizando los catálogos estelares del telescopio espacial Gaia de la ESA, los investigadores rastrearon los encuentros cinemáticos con cientos de miles de estrellas de la vecindad solar.",
      "Para abordar este enigma balístico galáctico, los investigadores recurrieron a la base de datos astrométrica del telescopio espacial Gaia de la Agencia Espacial Europea. El satélite Gaia ha cartografiado con precisión milimétrica las posiciones, distancias trigonométricas y velocidades tridimensionales propias de más de mil millones de estrellas en nuestra galaxia, permitiendo integrar órbitas estelares hacia atrás en el tiempo.",
      "Los cálculos cinemáticos revelaron que 2I/Borisov penetró en el sistema solar desde la dirección aparente de la constelación de Casiopea, muy cerca del plano del disco de la Vía Láctea. Los modelos dinámicos integraron la atracción gravitatoria del disco galáctico y los posibles encuentros cercanos con estrellas individuales a lo largo de los últimos diez millones de años de trayectoria balística.",
      "Aunque no se pudo asociar de forma concluyente su origen con una estrella específica debido a las incertidumbres acumulativas en la integración temporal de millones de años, la cinemática de Borisov encaja notablemente bien con la población de estrellas jóvenes del disco delgado galáctico. Su velocidad de aproximación es moderada en comparación con el estándar local de reposo galáctico.",
      "La hipótesis teórica más aceptada señala que Borisov nació en un disco protoplanetario circundante a una estrella enana roja. Durante las primeras etapas de formación de dicho sistema planetario, la interacción gravitatoria con un planeta gigante gaseoso en migración perturbó la órbita del cometa, catapultándolo con violencia hacia el vacío interestelar mediante una asistencia gravitatoria natural."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los científicos calcularon que nuestro propio sistema solar expulsó billones de cometas al espacio interestelar durante el violento período de migración planetaria de Júpiter y Saturno hace 4.000 millones de años. Es muy probable que cometas nacidos en la Tierra estén cruzando hoy en día sistemas estelares alienígenas distantes."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El rastreo de la trayectoria hacia atrás utilizando el catálogo Gaia DR2 identificó varios encuentros estelares a distancias de unos pocos pársecs en los últimos 5 millones de años, destacando la estrella binaria Kruger 60, aunque con velocidades relativas residuales que no permiten confirmar una eyección directa de ese sistema."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_sistema-origen.webp",
    "bannerCaption": "Sistema de origen: el trayecto de Borisov apunta a Krueger 60, sistema binario de enanas rojas en Cefeo",
    "fact": "La integración dinámica de la trayectoria de 2I/Borisov utilizando los datos del satélite Gaia de la ESA demostró que el cometa provino de la dirección del disco galáctico en Casiopea. Su vector de entrada sugiere que fue eyectado de un sistema estelar de enana roja durante una fase caótica de migración de gigantes gaseosos."
  },
  {
    "id": "comparacion-oumuamua",
    diagramImage: '/assets/interestelar/infographic_m3/diagram_comparacion-oumuamua.webp',
    diagramCaption: 'Oumuamua vs Borisov: dos visitantes totalmente distintos que muestran la diversidad del cosmos interestelar',
    "title": "Borisov vs Oumuamua",
    "color": "#B388FF",
    "btnImage": "/assets/interestelar/infographic_m3/btn_comparacion-oumuamua.jpg",
    "image": "/assets/interestelar/infographic_m3/hero_comparacion-oumuamua.jpg",
    "content": [
      "El cotejo directo entre 1I/'Oumuamua y 2I/Borisov ofrece a la astrofísica planetaria una oportunidad única para comparar dos especímenes procedentes del medio interestelar con características físicas, químicas y morfológicas que difícilmente podrían resultar más dispares entre sí. Mientras que el primero desafió las clasificaciones tradicionales al carecer por completo de coma, el segundo mostró una exuberante actividad cometaria rica en hielos primordiales.",
      "Por un lado, 'Oumuamua desconcertó al mundo por su comportamiento refractario y anómalo. Carecía por completo de coma observable o cola de polvo, exhibía una silueta hiperelongada o aplanada con oscilaciones extremas de brillo de 2.5 magnitudes, y experimentó una misteriosa aceleración no gravitacional impulsada por la desgasificación invisible de hielos moleculares procesados por radiólisis cósmica.",
      "Por otro lado, 2I/Borisov encarnó la viva imagen de un cometa clásico y tradicional. Mostró desde el inicio una abundante coma de gas, una prolongada cola de polvo microscópico, un núcleo esférico compacto de unos cientos de metros, desgasificación abundante de monóxido de carbono y cianógeno, y una aceleración dominada de manera predecible por la sublimación de volátiles.",
      "En cuanto a sus propiedades orbitales, Borisov presentó una excentricidad colosal de 3.356 y una velocidad asintótica de 32.2 km/s, superando ampliamente la excentricidad de 1.1995 y los 26.3 km/s medidos en 'Oumuamua. Ambos cuerpos demostraron que los objetos interestelares provienen de orígenes cinemáticos muy diversos y viajan con energías orbitales drásticamente distintas.",
      "Desde el punto de vista de la física de materiales, ambos viajeros presentan semejanzas superficiales cruciales: un tinte marcadamente rojizo provocado por la radiólisis de compuestos orgánicos generada tras millones de años de bombardeo continuo por rayos cósmicos galácticos en el frío vacío interestelar, dando lugar a costras ricas en tolinas complejas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si pudieras colocar a 'Oumuamua y a Borisov lado a lado, parecerían objetos de naturalezas completamente incompatibles. Uno parecería una enorme lasca oscura o un panqueque de asfalto en volteo caótico, mientras que el otro luciría como una resplandeciente bola de nieve brillante envuelta en una inmensa capa de niebla esmeralda."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La diferencia en la tasa de producción de polvo entre ambos objetos es abismal: mientras que en 'Oumuamua el límite superior de emisión de polvo se fijó en menos de 0.001 kg/s, en 2I/Borisov la tasa de pérdida de masa de polvo superó holgadamente los 35 kg/s en las proximidades del perihelio, subrayando la enorme diversidad de composición y volátiles presente en los diferentes sistemas planetarios de la galaxia."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m3/banner_comparacion-oumuamua.webp",
    "bannerCaption": "Oumuamua vs Borisov: dos visitantes totalmente distintos que muestran la diversidad del cosmos interestelar",
    "fact": "La comparación entre 1I/'Oumuamua y 2I/Borisov reveló una diversidad cósmica radical: mientras que 'Oumuamua (e = 1.1995) resultó ser un objeto seco, elongado y sin coma detectable con aceleración radiolítica, Borisov (e = 3.356) fue un cometa clásico rico en hielos primordiales de CO con una tasa de emisión de polvo superior a 35 kg/s."
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '129,212,250' : '21,101,192', // ice blue or deep blue
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

// â”€â”€â”€ Comet Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CometHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(129,212,250,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#cometGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#81D4FA','#1565C0','#00BCD4','#7E57C2','#69F0AE','#FFB300','#B3E5FC'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Comet icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#81D4FA" strokeWidth="1.5" opacity="0.6" />
        <circle cx="296" cy="34" r="4" fill="#81D4FA" opacity="0.8" />
        <path d="M 300 30 Q 315 15 325 5" fill="none" stroke="#81D4FA" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="cometGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(129,212,250,0.2)" />
            <stop offset="50%" stopColor="rgba(129,212,250,0.9)" />
            <stop offset="100%" stopColor="rgba(129,212,250,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#81D4FA" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">2I/BORISOV</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(129,212,250,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">EL COMETA ERRANTE</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(129,212,250,0.2)'}`,
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
          layoutId="activeDotComet"
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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Body Grid â”€â”€â”€ */}
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

        {/* â”€â”€â”€ Expandable Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            marginTop: '1.5rem', position: 'relative', zIndex: 2,
          }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
            ))}
          </div>
        )}

        {/* --- Banner Image --- */}
        {node.bannerImage && (
          <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src={node.bannerImage}
              alt={node.bannerCaption || node.title}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              loading="lazy"
            />
            {node.bannerCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
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

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem', padding: '1.2rem',
          background: `linear-gradient(90deg, ${node.color}20, transparent)`,
          borderLeft: `4px solid ${node.color}`, borderRadius: '0 12px 12px 0',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          position: 'relative', zIndex: 2,
        }}>
          <Star size={24} style={{ color: node.color, flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
            {node.fact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, activeId, explored }) {
  const progress = (explored.size / nodes.length) * 100;
  return (
    <div style={{ marginTop: '2rem', padding: '0 1rem', maxWidth: '400px', margin: '2rem auto 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Exploración del Cometa</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #81D4FA, #00BCD4)',
            boxShadow: '0 0 10px rgba(129,212,250,0.5)',
          }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM3() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      setExplored(prev => new Set(prev).add(id));
    }
  };

  const activeNodeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(to bottom, #050814, #0a1128)',
      borderRadius: '24px',
      padding: '2rem',
      color: 'white',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(129,212,250,0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '800px',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CometHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          margin: '2rem 0',
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

        {/* Active Content Panel */}
        <AnimatePresence mode="wait">
          {activeNodeData && (
            <ContentPanel
              key={activeNodeData.id}
              node={activeNodeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        <ProgressBar nodes={INFOGRAPHIC_NODES} activeId={activeNode} explored={explored} />

        {/* Bibliography */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '16px',
          border: '1px solid rgba(129,212,250,0.15)',
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'rgba(129,212,250,0.8)', letterSpacing: '1px' }}>
            REFERENCIAS Y FUENTES
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
