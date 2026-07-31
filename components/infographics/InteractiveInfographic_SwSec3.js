'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Robotics Themed)
   ========================================================================= */

const DecoCircuitBoard = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <circle cx="7" cy="7" r="1.5" fill={color} opacity="0.2"/>
    <circle cx="17" cy="17" r="1.5" fill={color} opacity="0.2"/>
    <path d="M7 7H11V17H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
  </svg>
);

const DecoRobotArm = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 20V14L18 8V4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
    <circle cx="12" cy="14" r="2" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <circle cx="18" cy="8" r="2" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <path d="M9 20H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>
    <path d="M16 3H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>
  </svg>
);

const DecoMicrochip = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="6" y="6" width="12" height="12" rx="1" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <path d="M9 6V4M12 6V4M15 6V4M9 18V20M12 18V20M15 18V20M6 9H4M6 12H4M6 15H4M18 9H20M18 12H20M18 15H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>
  </svg>
);

const DecoServo = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <path d="M12 4V1M12 20V23M4 12H1M20 12H23M6.5 6.5L4.5 4.5M17.5 17.5L19.5 19.5M6.5 17.5L4.5 19.5M17.5 6.5L19.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.2"/>
  </svg>
);

const DecoWaveform = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4 12H6L8 8L12 20L16 6L18 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
  </svg>
);

const DECO_MAP = {
  'lenguaje-ia': [DecoWaveform, DecoMicrochip],
  'rovers-autonomos': [DecoRobotArm, DecoCircuitBoard],
  'protesis-bionicas': [DecoRobotArm, DecoServo],
  'robots-cirujanos': [DecoServo, DecoMicrochip],
  'atlas-spot': [DecoCircuitBoard, DecoServo],
  'ia-cientifica': [DecoWaveform, DecoCircuitBoard],
  'futuro-droides': [DecoMicrochip, DecoRobotArm],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Vaswani, A. et al. (2017). 'Attention Is All You Need.' Advances in Neural Information Processing Systems, 30.",
  "Jumper, J. et al. (2021). 'Highly accurate protein structure prediction with AlphaFold.' Nature, 596.",
  "Farley, K. A. et al. (2020). 'Mars 2020 Mission Overview.' Space Science Reviews, 216.",
  "Asimov, I. (1950). 'I, Robot.' Gnome Press.",
  "Intuitive Surgical (2023). 'Da Vinci Surgical System â€” Technology Overview.' Intuitive.com.",
  "Wehner, M. et al. (2016). 'An integrated design and fabrication strategy for entirely soft, autonomous robots.' Nature, 536."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'lenguaje-ia',
    title: 'C-3PO: El Lenguaje de las Máquinas',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_droides/btn_lenguaje_ia.png',
    image: '/assets/starwars/infographic_droides/hero_lenguaje_ia.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_lenguaje_ia.png',
    bannerCaption: 'De los jeroglíficos a los Transformers: la evolución del lenguaje artificial',
    content: [
      "Si has visto las películas de Star Wars, seguro recuerdas a C-3PO, ese droide dorado y brillante que siempre está presumiendo. Él se enorgullece constantemente de dominar a la perfección más de seis millones de formas distintas de comunicación. Aunque parece magia de una galaxia muy lejana, hoy en día nuestros propios programas de Inteligencia Artificial han logrado hazañas lingüísticas sorprendentes. Gracias a una rama de la informática llamada Procesamiento de Lenguaje Natural (PLN), las computadoras modernas ahora pueden entender, traducir y generar lenguaje humano a niveles que hubieran parecido imposibles hace apenas un par de décadas.",
      "El gran salto de nuestra tecnología ocurrió con el nacimiento de los 'Modelos de Lenguaje Grandes' (LLM). Para que una máquina aprenda a hablar como tú, primero tiene que leer millones y millones de textos de internet, libros enteros, enciclopedias y artículos. A partir de toda esa información masiva, la computadora empieza a notar y memorizar los patrones ocultos que forman nuestras palabras. Es muy parecido a cómo un bebé humano aprende a hablar, escuchando repetidamente a sus padres, solo que la inteligencia artificial lo hace leyendo bibliotecas enteras en tan solo cuestión de días o semanas.",
      "Imagina que las palabras en una oración extensa son como las piezas sueltas de un rompecabezas muy complejo. Antes, las computadoras intentaban armar este rompecabezas mirando solamente una pieza a la vez, de izquierda a derecha. Por eso se confundían tanto y hacían traducciones que daban risa. Pero luego los científicos inventaron una arquitectura espectacular llamada 'Transformer'. Los Transformers pueden mirar absolutamente todas las piezas del rompecabezas al mismo tiempo. Al hacer esto, logran entender perfectamente el contexto, la intención y el significado exacto de toda la frase de forma instantánea.",
      "Esta arquitectura revolucionaria es precisamente la que alimenta a herramientas increíbles que usas casi a diario, como Google Translate, que es capaz de traducir entre más de 130 idiomas distintos y es usado por más de mil millones de personas en todo el planeta. También es el cerebro principal detrás de los famosos asistentes de voz como Siri, Alexa y Google Assistant, así como de los avanzados chatbots conversacionales. Aunque estos sistemas todavía cometen errores graciosos o extraños de vez en cuando, cada día se vuelven más inteligentes y precisos.",
      "Lo más fascinante de todo esto es que, así como C-3PO siempre intenta usar su dominio total del lenguaje para mediar conflictos, ayudar a sus amigos humanos y salir de situaciones peligrosas, nuestra Inteligencia Artificial del mundo real nos está ayudando a romper las antiguas barreras del idioma que solían separarnos. Hoy podemos viajar, leer y comunicarnos sin problemas con personas al otro lado del mundo, todo gracias a la misma chispa tecnológica que le dio voz al droide de protocolo más famoso y querido de la galaxia entera."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'A lo largo de las nueve películas principales de la "Saga Skywalker", el parlanchín y ansioso droide C-3PO fue interpretado ininterrumpidamente por el icónico actor británico Anthony Daniels. El personaje fue diseñado originalmente basándose directamente en la robot femenina llamada Maria de la legendaria y revolucionaria película de ciencia ficción"Metrópolis" (dirigida por Fritz Lang en el año 1927). Como dato curioso, la deslumbrante armadura dorada de C-3PO iba a ser originalmente de color plateado, pero George Lucas decidió hacer el cambio a último minuto.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La innovadora arquitectura "Transformer"revolucionó para siempre la Inteligencia Artificial porque procesa frases enteras utilizando un mecanismo llamado"auto-atención"(self-attention). Esto le permite a la máquina entender, por ejemplo, que la palabra"banco"significa cosas diferentes si está en la frase"banco de arena del río" o en la frase "cuenta bancaria en el banco". Como referencia de poder, el avanzado modelo de lenguaje GPT-4 cuenta con aproximadamente 1.8 billones de parámetros entrenados.' 
      }
    ],
    fact: 'En 2017, un equipo de genios investigadores de Google publicó un artículo titulado "Attention Is All You Need". Este documento ha sido citado más de 100,000 veces en investigaciones posteriores, convirtiéndolo en uno de los artículos científicos más influyentes en toda la historia de la informática. Gracias a ese texto, hoy existen todos los chatbots modernos.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/c3po_r2d2_tatooine.png', caption: 'C-3PO y R2-D2 en Tatooine â€” los droides más icónicos de Star Wars' }
    ]
  },
  {
    id: 'rovers-autonomos',
    title: 'R2-D2 en Marte: Perseverance e Ingenuity',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_droides/btn_rovers_autonomos.png',
    image: '/assets/starwars/infographic_droides/hero_rovers_autonomos.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_rovers_autonomos.png',
    bannerCaption: 'Perseverance recorre Marte de forma autónoma usando IA para evitar obstáculos',
    content: [
      "Todos sabemos que el heroico e inseparable droide astromecánico R2-D2 es el verdadero salvador en innumerables ocasiones durante la saga de Star Wars. Con su cuerpo en forma de barril blanco y azul, R2 repara naves dañadas en pleno vuelo espacial, hackea rápidamente enormes computadoras imperiales enemigas y guarda datos vitales para la Alianza Rebelde. Hoy, en nuestro propio sistema solar, la agencia espacial NASA tiene sus propias versiones reales de astromecánicos valientes, pero no exploran la Estrella de la Muerte, sino la superficie polvorienta y desolada del planeta Marte.",
      "El rover Perseverance, que aterrizó triunfalmente en Marte en febrero de 2021, es una de las máquinas más avanzadas jamás construidas por manos humanas. Mientras que los humanos controlan sus misiones generales, Perseverance cuenta con un sistema de inteligencia artificial brillante llamado 'AutoNav' que le permite pensar por sí mismo. Gracias a este avanzado software, el rover puede tomar sus propias decisiones de ruta, evitar cráteres gigantescos, sortear rocas afiladas y recorrer hasta 200 metros en un solo día marciano sin intervención humana constante.",
      "Imagina tratar de manejar un coche a control remoto mientras estás parado a kilómetros de distancia y la pantalla de tu celular tarda 20 minutos completos en mostrarte lo que el carrito acaba de chocar. Eso es lo que pasa al comunicarse con Marte; la inmensa distancia hace que la señal de radio demore entre 3 y 22 minutos en llegar. Por eso, el rover necesita usar su propio 'cerebro de silicio' para cuidarse y sobrevivir. Perseverance está equipado con un complejo brazo robótico lleno de espectrómetros y taladros para analizar rocas buscando restos de vida microscópica antigua.",
      "Pero Perseverance no viajó solo; llevó consigo a un amigo muy especial, como un pequeño droide compañero, llamado Ingenuity. Este diminuto pero valiente helicóptero logró hacer historia humana al convertirse en la primerísima nave en realizar un vuelo controlado y con motor en el cielo de otro planeta. Volar en Marte es muy difícil porque su atmósfera es 100 veces menos densa y mucho más delgada que la de la Tierra. Tratar de volar el helicóptero Ingenuity en Marte es casi idéntico a intentar volar un helicóptero normal a una altitud extrema de 30 kilómetros aquí en nuestro planeta, ¡donde apenas hay aire para levantar las aspas!",
      "Para lograr este aparente milagro de la ingeniería aeroespacial, el pequeño Ingenuity tuvo que hacer girar sus ligerísimas aspas de fibra de carbono a unas increíbles y vertiginosas 2,400 revoluciones por minuto. Aunque lamentablemente sufrió un daño irreparable en una de sus aspas en enero de 2024, el heroico helicóptero logró realizar un total de 72 vuelos totalmente exitosos. Ingenuity demostró al mundo, tal como lo hace R2-D2, que el tamaño no importa en absoluto cuando se trata de tener el valor tecnológico para hacer avanzar la gran historia de la exploración espacial."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la amada trilogía original de George Lucas, el icónico R2-D2 no era un simple robot manejado a control remoto, sino que era operado desde su apretado interior por el talentoso actor Kenny Baker. El inconfundible lenguaje de pitidos, silbidos y chirridos (conocido oficialmente como "droidspeak") fue creado magistralmente por el diseñador de sonido Ben Burtt utilizando un sintetizador analógico. R2-D2 ostenta el increíble récord de haber aparecido en más películas de Star Wars que cualquier otro personaje.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Los ingenieros de la NASA diseñaron inicialmente al helicóptero Ingenuity pensando que solo sobreviviría para realizar un máximo de 5 vuelos experimentales. Sorprendiendo maravillosamente a todos, completó un total de 72 vuelos durante casi 3 años, recorriendo 17.7 kilómetros en total y alcanzando alturas de hasta 24 metros. Cada uno de sus vuelos tenía que ser autónomo, ya que el enorme retraso de la señal de radio de la Tierra hace que el pilotaje en tiempo real sea imposible.' 
      }
    ],
    fact: 'El sofisticado sistema de inteligencia artificial AutoNav que utiliza el rover Perseverance funciona combinando múltiples cámaras estéreo con una red neuronal profunda. Esto le permite crear detallados mapas 3D del terreno marciano en tiempo real mientras se mueve, logrando conducirse autónomamente a una velocidad de 120 metros por hora, cuatro veces más rápido que Curiosity.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/c3po_r2d2_poster.png', caption: 'C-3PO y R2-D2 â€” arte conceptual inspirado en la trilogía original' }
    ]
  },
  {
    id: 'protesis-bionicas',
    title: 'La Mano de Luke: Prótesis Biónicas',
    color: '#42A5F5',
    btnImage: '/assets/starwars/infographic_droides/btn_protesis_bionicas.png',
    image: '/assets/starwars/infographic_droides/hero_protesis_bionicas.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_protesis_bionicas.png',
    bannerCaption: 'Las prótesis modernas pueden sentir presión y temperatura gracias a interfaces neuronales',
    content: [
      "Uno de los momentos más impactantes de la saga espacial es cuando Luke Skywalker pierde su mano derecha durante un feroz duelo de sables de luz y recibe una prótesis cibernética asombrosa que se ve, se mueve e incluso siente exactamente como una mano biológica real humana. Durante muchas décadas, los admiradores de la película creyeron que esto solo existiría en la imaginación y la ficción. Pero la ciencia moderna, combinando la medicina, la robótica y la ingeniería, está haciendo que las prótesis biónicas reales sean igual de asombrosas que la tecnología médica del universo de Star Wars.",
      "La magia detrás de los brazos robóticos modernos se basa en algo llamado Electromiografía (o EMG). Cada vez que tú decides mover un dedo de la mano, tu cerebro envía un pequeñísimo y sutil impulso eléctrico a través de tus nervios hasta los músculos de tu antebrazo. Piensa en el sistema EMG como si tus propios músculos biológicos le estuvieran enviando discretos mensajes de texto con instrucciones directas a los motores de la mano protésica de plástico y metal. La computadora dentro del brazo biónico lee estas señales eléctricas y hace que la mano robótica cierre el puño, agarre un vaso o señale con un dedo.",
      "Empresas tecnológicas vanguardistas como Ã–ssur y Open Bionics han creado manos robóticas increíbles donde cada uno de los dedos metálicos y plásticos tiene su propio y pequeño motor (un servo). Al tener motores individuales, los pacientes humanos pueden realizar agarres mucho más complejos y precisos, como sostener suavemente un delicado huevo de gallina sin romper su cáscara o utilizar un teclado de computadora. La gran meta no es simplemente reemplazar una extremidad ausente, sino lograr devolverle a las personas su total autonomía, independencia y dignidad en sus vidas diarias.",
      "Pero, ¿cómo pueden sentir el tacto como la mano cibernética de Luke? Los ingenieros prodigiosos de la Universidad Johns Hopkins y otras instituciones prestigiosas han logrado desarrollar un proceso llamado 'Reinervación Muscular Dirigida'. Los cirujanos redirigen muy cuidadosamente los cables nerviosos de los brazos de los pacientes para conectarlos a complejos parches llenos de sensores especiales. Así, cuando los dedos robóticos tocan una superficie, envían de regreso una suave corriente eléctrica. El paciente puede entonces sentir verdaderamente si está tocando algo caliente, frío, duro o suave.",
      "El inmenso y emocionante futuro de estas maravillas tecnológicas nos llevará directamente a la ciencia de las interfaces cerebro-computadora. Con esto, algún día una persona podrá dirigir su extremidad robótica utilizando exclusiva e instantáneamente la fuerza de su propio pensamiento, exactamente igual que un brazo de nacimiento. Esta deslumbrante intersección entre la anatomía biológica humana y el diseño de la mecatrónica avanzada es la prueba perfecta de que nuestra ciencia del mundo real está alcanzando rápidamente a las grandes maravillas que antes solo soñábamos ver en las pantallas de cine."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'El joven héroe Luke Skywalker recibe trágicamente su avanzada mano protésica hacia el final de la película "El Imperio Contraataca"(1980) inmediatamente después de perderla en el icónico y sombrío duelo contra Darth Vader. La mano cibernética demuestra funcionar perfectamente y tiene incluso la increíble capacidad de sentir dolor cuando el droide médico 2-1B la prueba con una aguja. Años más tarde, su propio padre, Anakin Skywalker, también recibe un voluminoso brazo derecho metálico cuando el Conde Dooku se lo corta en"El Ataque de los Clones" (2002).' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El asombroso Brazo Protésico Modular desarrollado tenazmente por la Universidad Johns Hopkins posee unos increíbles 26 grados de libertad (que son como articulaciones separadas) e incorpora más de 100 sensores distintos de fuerza y tacto. Otro modelo, el avanzado brazo DEKA, que fue financiado por DARPA y bautizado cariñosamente como el "Brazo Luke" en honor a Luke Skywalker, fue aprobado oficialmente por la estricta FDA en 2014 porque permite hacer tareas complejísimas, como usar llaves para abrir puertas cerradas.' 
      }
    ],
    fact: 'El acelerado campo de las interfaces cerebro-computadora (BCI) ha avanzado tanto que en el año 2024, la empresa Neuralink implantó con gran éxito un minúsculo chip neuronal en un paciente humano paralizado, logrando que controlara el cursor de una computadora solo con pensarlo. Además, investigadores de BrainGate lograron que pacientes similares escriban hasta 90 caracteres por minuto únicamente imaginando el movimiento de sus propias manos escribiendo.'
  },
  {
    id: 'robots-cirujanos',
    title: 'Droides Médicos: El Sistema Da Vinci',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_droides/btn_robots_cirujanos.png',
    image: '/assets/starwars/infographic_droides/hero_robots_cirujanos.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_robots_cirujanos.png',
    bannerCaption: 'El sistema Da Vinci ha realizado más de 12 millones de cirugías desde el año 2000',
    content: [
      "En el extenso universo de Star Wars, los droides médicos como el modelo 2-1B son robots sumamente confiables y precisos que se encargan de sanar todas las peores heridas de batalla de los valientes miembros de la Alianza Rebelde. Hoy en día, nuestros propios hospitales modernos del mundo real cuentan con una tecnología robótica médica verdaderamente espectacular y vanguardista, destacando entre todos el mundialmente famoso 'Sistema Quirúrgico Da Vinci', desarrollado por la compañía Intuitive Surgical, una maravilla aprobada por la FDA desde el lejano año 2000.",
      "El monumental y avanzado sistema robótico Da Vinci no opera de manera autónoma ni toma decisiones propias; es más bien una compleja e precisa extensión mecánica de las manos humanas. El médico cirujano se sienta cómodamente frente a una consola con pantalla 3D de alta definición, mientras que los largos y delgados brazos robóticos de la máquina, equipados con bisturíes y cámaras microscópicas, realizan incisiones pequeñísimas dentro del paciente. Para entenderlo de manera simple: usar el Da Vinci es literalmente como tener a un talentoso médico que posee una vista con súper zoom 10x y manos microscópicas invulnerables al temblor.",
      "Una de las mayores y más fabulosas ventajas de este portentoso droide quirúrgico real es que los cortes que realiza son diminutos y exactos, con incisiones que apenas miden un centímetro. Esto hace que la cirugía sea catalogada como 'mínimamente invasiva'. Como resultado de esto, los pacientes sangran drásticamente menos durante la delicada operación, se ahorran gigantescas e incómodas cicatrices, y se logran recuperar y marchar a sus casas muchísimo más rápido que si les hicieran una cirugía abierta tradicional con las enormes herramientas de acero del pasado.",
      "Mirando hacia el futuro cercano, los científicos no se están conformando con crear enormes robots de metal. En prestigiosos laboratorios como los de la Universidad de Harvard, los ingenieros expertos están diseñando una nueva tecnología llamada 'robótica blanda' y construyendo pequeños 'Octobots' hechos enteramente de plásticos suaves y polímeros de silicona flexibles, sin utilizar un solo engranaje o hueso metálico rígido. Estos asombrosos robots blanditos son súper elásticos, lo que les permitirá en el futuro apretujarse y navegar cuidadosamente a través de nuestros delicados vasos sanguíneos o intrincados intestinos humanos sin causar ningún daño interno.",
      "Incluso se están investigando e inventando los diminutos y futuristas 'nanorobots'. Estas son microscópicas y avanzadas máquinas que miden apenas una milésima parte del grosor de un cabello humano y que algún día cercano podrían ser inyectadas directamente en tu propio torrente sanguíneo. Su noble misión será la de cazar incansablemente los peligrosos virus o entregar dosis precisas de medicamentos salvadores exactamente en la célula específica que está enferma. Así, los droides médicos del futuro tal vez no estarán parados imponentemente junto a tu cama, sino que estarán fluyendo silenciosamente por dentro de tus propias venas."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el amargo final de la película "El Imperio Contraataca", es precisamente el eficiente droide médico 2-1B quien trata con éxito las graves heridas sistémicas de Luke Skywalker, además de realizar magistralmente la increíble y complejísima operación para acoplarle permanentemente su nueva mano biónica. Luego, en"La Venganza de los Sith", observamos cómo varios avanzados droides médicos asisten directamente en el difícil y triste parto doble donde nacen los gemelos Luke y Leia. También conocemos al especializado droide FX-7, que funge como un excelente asistente quirúrgico de múltiple brazos.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'El genial e innovador robot blando Octobot, inventado por un destacado equipo de la Universidad de Harvard, se convirtió en el primerísimo robot blando y flexible de la historia del mundo. Carece de piezas metálicas rígidas y de electrónica tradicional, utilizando sorprendentemente peróxido de hidrógeno como su principal combustible. Esta sustancia química reacciona y se descompone velozmente en forma de un gas inocuo que infla repetidamente sus tentáculos de silicona para poder avanzar.' 
      }
    ],
    fact: 'El complejísimo sistema quirúrgico Da Vinci utiliza potentes algoritmos informáticos para filtrar mecánicamente el temblor natural de las manos del médico cirujano, además de escalar sus movimientos reales hasta a una quinta parte de su tamaño. En términos prácticos, esto significa que si el cirujano mueve su mano física 5 centímetros en la consola, el microscópico instrumento robótico adentro del paciente solo se mueve 1 centímetro milimétricamente calculado. Esto posibilita operaciones perfectas en estructuras que miden menos de 1 milímetro.'
  },
  {
    id: 'atlas-spot',
    title: 'Boston Dynamics: Atlas y Spot',
    color: '#AB47BC',
    btnImage: '/assets/starwars/infographic_droides/btn_atlas_spot.png',
    image: '/assets/starwars/infographic_droides/hero_atlas_spot.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_atlas_spot.png',
    bannerCaption: 'Atlas puede correr, saltar y hacer parkour â€” Spot inspecciona fábricas y obras',
    content: [
      "Aunque no tenemos droides de batalla B1 marchando en masivos y amenazantes ejércitos en el planeta Tierra, sí contamos con robots increíblemente ágiles y asombrosos que son una maravilla mecánica de última generación. La famosa empresa estadounidense llamada Boston Dynamics ha construido durante los últimos años algunos de los robots bípedos y cuadrúpedos más avanzados y mundialmente reconocidos de toda la historia, como su robot humanoide estrella, el poderoso 'Atlas', y el ágil robot con apariencia de perro amarillo conocido popularmente como'Spot'.",
      "El deslumbrante humanoide Atlas es simplemente un prodigio y una obra maestra de la ingeniería moderna y del software de inteligencia artificial avanzado. Su computadora central procesa millones de datos de sus sensores corporales en menos de un microsegundo, lo que le permite realizar proezas gimnásticas sorprendentes, como dar volteretas hacia atrás sin caerse, subir escaleras rápidamente y superar complicadas pistas de obstáculos haciendo parkour real. Todo su pesado cuerpo debe hacer constantes y rápidos cálculos matemáticos instantáneos cada fracción de segundo para lograr mantener su centro de gravedad en perfecto equilibrio dinámico sin irse de bruces.",
      "Por otro lado, Spot, el veloz y amistoso perro-robot cuadrúpedo, ya se encuentra activamente trabajando como un empleado incansable en las industrias y construcciones del mundo real de hoy. Equipado hasta los topes con sofisticadas cámaras y complejos radares láser, Spot puede trotar sin ningún problema sobre las enormes rocas sueltas y sortear ágilmente escombros de lugares en demolición sin sufrir accidentes. Realiza vitales y valiosas inspecciones de seguridad en fábricas tóxicas, oscuras minas subterráneas y peligrosas plataformas petroleras donde, de otro modo, un valioso trabajador humano correría el riesgo constante de lastimarse.",
      "Otro paso gigante e importantísimo en el naciente mundo de la robótica son los llamados 'Cobots' (la contracción en inglés para referirse a 'Robots Colaborativos'). A diferencia de los grandes e industriales brazos robóticos que tenían que estar obligatoriamente encerrados en rígidas jaulas de metal grueso para no golpear accidentalmente a las personas, los cobots (fabricados por marcas líderes mundiales como Universal Robots o FANUC) son sumamente seguros, están rodeados por suaves almohadillas y están repletos de sensores inteligentes que detienen sus veloces motores de inmediato si detectan que apenas rozaron la mano o el hombro de una persona cercana.",
      "Enseñar a programar a estos maravillosos cobots colaborativos es sorprendentemente tan fácil como intentar enseñarle un nuevo paso de baile a tu mejor amigo. Los amables operadores humanos ni siquiera necesitan sentarse a escribir líneas complejas y aburridas de código fuente; simplemente sujetan físicamente el dócil brazo robótico y lo guían paso a pasito a lo largo de la trayectoria que debe recorrer para lograr agarrar su objetivo. El inteligente robot usa entonces sus sensores para memorizar cada uno de los movimientos y es capaz de repetirlo infinitamente de manera impecable, convirtiéndose en el compañero laboral ideal en las líneas de ensamblaje."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la trepidante película "La Venganza de los Sith", el terrorífico líder separatista General Grievous no es un robot total, sino un despiadado cyborg que es mitad máquina acorazada y mitad alienígena orgánico, demostrando la fascinante integración biomecatrónica completa para propósitos militares y de combate. Además, los letales Droidekas (o"droides destructores") de los separatistas fueron diseñados para tener la forma compacta de una veloz rueda esférica que se transporta rápidamente y, de pronto, se despliega mágicamente para levantar sus grandes escudos de energía impenetrable, un concepto brillante de geometría y diseño transformable que ha sido ávidamente estudiado y emulado por verdaderos ingenieros de robótica.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El complejo cerebro del humanoide Atlas emplea simultáneamente algoritmos avanzados de "control predictivo de modelos" y el uso extensivo del "aprendizaje automático" (machine learning) más actual para calcular dinámicamente cómo mantener su pesado cuerpo de 89 kilogramos en un balance inquebrantable y perfecto. Además de eso, el mundialmente famoso perro-robot amarillo Spot ha sido formalmente adquirido por el mismísimo Jet Propulsion Laboratory (JPL) de la agencia espacial NASA, quienes lo han empleado para recorrer, cartografiar y explorar cavernas subterráneas estrechas y terrenos difíciles en la Tierra para practicar misiones planetarias.' 
      }
    ],
    fact: 'En 2024, Boston Dynamics reveló un rediseño de su robot Atlas, cambiando la tecnología hidráulica por maquinaria eléctrica. El nuevo Atlas eléctrico puede rotar sus articulaciones 360 grados, un movimiento biomecánicamente imposible para un humano, y puede levantarse desde el suelo usando maniobras innovadoras en robótica.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/grievous_battle.png', caption: 'General Grievous â€” el temible cyborg con cuatro lightsabers' }
    ]
  },
  {
    id: 'ia-cientifica',
    title: 'AlphaFold: IA que Salva Vidas',
    color: '#4FC3F7',
    btnImage: '/assets/starwars/infographic_droides/btn_ia_cientifica.png',
    image: '/assets/starwars/infographic_droides/hero_ia_cientifica.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_ia_cientifica.png',
    bannerCaption: 'AlphaFold predijo la estructura de 200 millones de proteínas â€” Nobel de Química 2024',
    content: [
      "Mientras que muchos de los droides de las emocionantes películas de Star Wars son fabricados para ayudar en épicas batallas espaciales o arreglar viejas naves, la verdadera Inteligencia Artificial del mundo humano tiene metas aún más grandiosas e inspiradoras: ayudar silenciosamente a salvar incontables y valiosas vidas. El ejemplo más brillante y espectacular de todos se llama 'AlphaFold', que es un programa de computadora increíble creado por la famosa y revolucionaria compañía británica DeepMind, experta mundial indiscutible en redes neuronales e inteligencia artificial.",
      "Para entender cómo funciona AlphaFold, primero tienes que imaginar a las proteínas de nuestro cuerpo como microscópicos y complejísimos origamis o figuras de papel dobladas. Las proteínas construyen todo lo que eres, desde tus duros huesos hasta tu piel. Pero lo más importante de una proteína no es únicamente de qué diminutas partes está hecha, sino exactamente la manera física en la que se pliega y se dobla sobre sí misma. Si una proteína se dobla mal, empiezan a aparecer horribles enfermedades graves. El problema es que descubrir cómo se dobla un solo 'origami' de proteína podía costarle años y años de arduo trabajo a los mejores científicos.",
      "¡Y entonces apareció el todopoderoso programa de IA AlphaFold! Esta asombrosa y gigantesca inteligencia artificial aprendió en tan solo cuestión de meses, usando súper computadoras masivas, exactamente cómo se dobla y forma prácticamente cada una de las proteínas de todas las especies y plantas de la Tierra. AlphaFold resolvió en apenas horas, gracias a sus millones de redes neuronales interconectadas, el misterio oculto que los científicos biólogos y químicos del mundo llevaban investigando y persiguiendo por más de 50 años consecutivos, logrando un éxito científico inigualable.",
      "Y este es solo el gran y emocionante principio de las máquinas ayudando inmensamente a la humanidad a descubrir y explorar los últimos grandes misterios científicos del planeta. También contamos con increíbles submarinos robot no tripulados llamados 'Vehículos Operados a Distancia' (ROVs), los cuales se sumergen intrépidamente hacia la completa oscuridad, el frío brutal y la presión aplastante del océano profundo para descubrir criaturas extrañas. Estos invaluables robots descubren exóticas y misteriosas especies marinas, mapean en 3D el lecho del océano y nos enseñan celosamente secretos geológicos que ningún valiente buzo humano podría intentar alcanzar y sobrevivir.",
      "Al final del día, estas máquinas tan avanzadas e impresionantes son herramientas indispensables, construidas como extensiones poderosísimas e infatigables del ilimitado intelecto y la curiosidad humana. La asombrosa inteligencia artificial que resolvió de golpe el infinito misterio médico de las proteínas y los submarinos robotizados de alta resistencia que logran trazar el fondo negro del océano nos prueban contundentemente que la mejor manera de usar la más grande tecnología mundial es colaborando unidos pacíficamente para sanar y comprender mejor nuestro hermoso y pálido punto azul, la Tierra."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la película "El Episodio I: La Amenaza Fantasma", recordamos la escena con criaturas acuáticas como los asesinos Opee y los peces garra Colo en los océanos de Naboo. Qui-Gon, Obi-Wan y Jar Jar navegan esas profundidades en el submarino Bongo. En nuestra realidad, los robots de exploración marina deben enfrentar entornos oscuros que resultan casi tan inexplorados e inhóspitos como el abismo ficticio de Naboo.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Antes de AlphaFold, modelar la estructura 3D microscópica de una proteína tomaba años a los investigadores utilizando cristalografía de rayos X. Ahora, AlphaFold puede predecir en minutos esa misma estructura. DeepMind hizo pública una base de datos con más de 200 millones de predicciones de proteínas de forma gratuita para investigadores de todo el mundo.' 
      }
    ],
    fact: 'El invencible y avanzado robot submarino llamado ROV Jason fue construido expresamente para poder sumergirse velozmente hasta profundidades asombrosas que superan los 6,500 metros en la negrura total del mar, aguantando presiones aplastantes que equivalen a tener el peso enorme de un automóvil balanceándose únicamente sobre la diminuta superficie de cada centímetro cuadrado de su fuselaje de acero. Aún más increíble fue el año 2012, cuando el atrevido cineasta James Cameron bajó dentro de su submarino modificado Deepsea Challenger hasta los oscuros 10,908 metros de profundidad al interior de la fosa de las Marianas, que es una profundidad total todavía mayor a la asombrosa altura que posee el monte Everest.'
  },
  {
    id: 'futuro-droides',
    title: 'Construye tu Propio Droide',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_droides/btn_futuro_droides.png',
    image: '/assets/starwars/infographic_droides/hero_futuro_droides.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_futuro_droides.png',
    bannerCaption: 'Arduino, LEGO y FIRST Robotics: la robótica está al alcance de todos',
    content: [
      "Si toda esta sorprendente tecnología, inteligencias artificiales, helicópteros marcianos y brazos biónicos súper precisos han logrado encender la curiosidad de tu imaginación por completo, ¡tenemos grandes noticias para ti! nunca en toda la historia de la humanidad había resultado tan sencillo e barato lograr adentrarse en este apasionante y creativo mundo. Las herramientas perfectas e ideales para aprender y empezar ya existen en todas las escuelas y hogares, abriendo un abanico de posibilidades ilimitadas para que des tus primeros pasos en la robótica.",
      "Puedes empezar armando tus propios inventos usando la plataforma de LEGO Mindstorms o el genial Spike Prime. Ambos combinan los clásicos y divertidos ladrillitos de colores con pequeños motores eléctricos súper rápidos, múltiples sensores de movimiento muy avanzados y diminutas minicomputadoras que puedes programar fácil, arrastrando simples y vistosos bloques de código coloridos en la brillante pantalla de tu computadora. Es el paso inicial más fácil y emocionante para que tu genial e ingenioso diseño adquiera vida, movimiento propio y logre cumplir complejas tareas automatizadas sin necesidad de un complejo control remoto manual.",
      "Y si estás listo para intentar probar un desafío de electrónica e ingeniería mucho más ambicioso e increíble, tu principal opción debería ser explorar el fascinante y maravilloso universo de 'Arduino'. Puedes imaginar que una simple y pequeñita placa de circuito electrónico azul de Arduino (creada por geniales investigadores en 2005 en la lejana Italia) es literalmente igual que un cerebro electrónico del tamaño de una goma de borrar que puedes enchufar, programar y utilizar para controlar las luces de toda tu habitación, echar a andar múltiples servomotores al unísono, y armar los más potentes, veloces y útiles proyectos y creaciones mecatrónicas... y lo más increíble, ¡todo por un costo ridículamente menor que el precio que pagarías al ordenar una pizza grande en un restaurante local!",
      "Pero la mecatrónica moderna y la IA no son, en absoluto, solamente sobre apretar tornillos de metal con una llave y escribir interminables líneas de código fuente en un monitor luminoso; también implican una inmensa y seria responsabilidad moral y social sobre sus hombros. Los geniales pioneros de este campo tecnológico siempre se preguntan si estas grandiosas inteligencias y estas potentes y sofisticadas herramientas robóticas estarán utilizándose siempre por el bien mayor de todos, guiadas por pautas éticas justas. Es en este punto de enorme relevancia donde el antiguo y famoso escritor y maestro de la literatura futurista de ciencia ficción, Isaac Asimov, trazó desde el año 1942 sus célebres Tres Leyes de la Robótica, que fueron pilares tan sumamente importantes que más adelante lograron inspirar e impulsar la creación de gigantescos y verdaderos protocolos éticos y manuales de bioseguridad internacional.",
      "El futuro contará con robots avanzados como Figure 01 y el humanoide Tesla Optimus. Su desarrollo requerirá programadores talentosos que diseñen estas máquinas con responsabilidad. Si alguna vez miras a R2-D2 y te gustaría construir un androide similar, te invitamos a buscar un equipo y empezar a aprender los primeros pasos en programación y robótica."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En las películas de Star Wars, los droides poseen distintas personalidades. C-3PO se muestra ansioso y protocolario, mientras que R2-D2 es valiente, y BB-8 muestra lealtad. A pesar de estos rasgos emocionales, a menudo se les trata como propiedad mecánica y se les realizan borrados de memoria; un debate que refleja dilemas sobre los derechos y la ética en la inteligencia artificial moderna.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'La competencia internacional FIRST Robotics, fundada por el inventor Dean Kamen en 1989, cuenta con la participación de más de 650,000 estudiantes de unos 100 países. Diversos estudios muestran que los alumnos graduados de los programas de FIRST tienen mayores probabilidades de estudiar carreras vinculadas a las disciplinas STEM (ciencia, tecnología, ingeniería y matemáticas) a nivel universitario.' 
      }
    ],
    fact: 'El escritor Isaac Asimov postuló sus "Tres Leyes" de la Robótica en 1942: Primera: Un robot no debe dañar a un humano ni permitir que sufra daño por inacción. Segunda: Debe cumplir órdenes dadas a menos que violen la primera ley. Tercera: Un robot debe proteger su propia existencia, siempre y cuando no viole la primera o segunda ley. Es interesante notar que estas reglas nacidas de la ficción han inspirado debates éticos y regulaciones en inteligencia artificial en la vida real.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/bb8_cartoon.png', caption: 'BB-8 â€” el adorable droide esférico de la nueva trilogía' },
      { src: '/assets/starwars/infographic_droides/extras/bb8_vector.png', caption: 'BB-8 â€” diseño vectorial del droide astromecánico' }
    ]
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
  atom: <Atom size={18} />
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
        // Tech blue particles for robotics theme
        ctx.fillStyle = `rgba(100, 200, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.005) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(100,200,255,0.8)';
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
        color: '#AB47BC',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(171, 71, 188, 0.4)'
      }}>
        BIOMECATRÃ“NICA E IA
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        DROIDES &middot; ROVERS &middot; PRÃ“TESIS
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec3" : undefined}
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
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoCircuitBoard;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoMicrochip;
  
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
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '1rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', margin: '1.5rem 0', border: `1px solid ${node.color}33` }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${node.bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }} onClick={() => setLightboxSrc(node.bannerImage)}/>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)', pointerEvents: 'none' }} />
              {node.bannerCaption && (
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#FFF', fontFamily: '"Oswald", sans-serif', fontStyle: 'italic', textShadow: '0 2px 4px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
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

          {/* Extra Images Gallery Â§15 */}
          {node.extraImages && node.extraImages.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} /> GALERÍA DE IMÁGENES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: node.extraImages.length === 1 ?'1fr' : '1fr 1fr', gap: '0.75rem' }}>
                {node.extraImages.map((img, i) => (
                  <div key={i} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${node.color}33`, cursor: 'pointer' }} onClick={() => setLightboxSrc(img.src)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.caption} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} />
                    {img.caption && (
                      <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.7)', fontSize: '0.8rem', color: '#B0BEC5', fontFamily: '"Lora", serif', fontStyle: 'italic' }}>
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default function InteractiveInfographic_SwSec3() {
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
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_droides/bg_droides.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

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
            <span>PROTOCOLO DE ACTIVACIÃ“N</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #AB47BC, #4FC3F7)', boxShadow: '0 0 10px #4FC3F7' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #00CED1, #7B68EE)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(123, 104, 238, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_droides/sw_badge_3.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              ¡SISTEMAS INICIALIZADOS!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS DEL TEMPLO (Bibliografía)</h3>
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

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
