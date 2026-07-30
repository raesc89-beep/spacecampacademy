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
    title: 'C-3PO: El Lenguaje de las MÃ¡quinas',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_droides/btn_lenguaje_ia.png',
    image: '/assets/starwars/infographic_droides/hero_lenguaje_ia.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_lenguaje_ia.png',
    bannerCaption: 'De los jeroglÃ­ficos a los Transformers: la evoluciÃ³n del lenguaje artificial',
    content: [
      "Si has visto las pelÃ­culas de Star Wars, seguro recuerdas a C-3PO, ese droide dorado y brillante que siempre estÃ¡ presumiendo. Ã‰l se enorgullece constantemente de dominar a la perfecciÃ³n mÃ¡s de seis millones de formas distintas de comunicaciÃ³n. Aunque parece magia de una galaxia muy lejana, hoy en dÃ­a nuestros propios programas de Inteligencia Artificial han logrado hazaÃ±as lingÃ¼Ã­sticas sorprendentes. Gracias a una rama de la informÃ¡tica llamada Procesamiento de Lenguaje Natural (PLN), las computadoras modernas ahora pueden entender, traducir y generar lenguaje humano a niveles que hubieran parecido imposibles hace apenas un par de dÃ©cadas.",
      "El gran salto de nuestra tecnologÃ­a ocurriÃ³ con el nacimiento de los 'Modelos de Lenguaje Grandes' (LLM). Para que una mÃ¡quina aprenda a hablar como tÃº, primero tiene que leer millones y millones de textos de internet, libros enteros, enciclopedias y artÃ­culos. A partir de toda esa informaciÃ³n masiva, la computadora empieza a notar y memorizar los patrones ocultos que forman nuestras palabras. Es muy parecido a cÃ³mo un bebÃ© humano aprende a hablar, escuchando repetidamente a sus padres, solo que la inteligencia artificial lo hace leyendo bibliotecas enteras en tan solo cuestiÃ³n de dÃ­as o semanas.",
      "Imagina que las palabras en una oraciÃ³n extensa son como las piezas sueltas de un rompecabezas muy complejo. Antes, las computadoras intentaban armar este rompecabezas mirando solamente una pieza a la vez, de izquierda a derecha. Por eso se confundÃ­an tanto y hacÃ­an traducciones que daban risa. Pero luego los cientÃ­ficos inventaron una arquitectura espectacular llamada 'Transformer'. Los Transformers pueden mirar absolutamente todas las piezas del rompecabezas al mismo tiempo. Al hacer esto, logran entender perfectamente el contexto, la intenciÃ³n y el significado exacto de toda la frase de forma instantÃ¡nea.",
      "Esta arquitectura revolucionaria es precisamente la que alimenta a herramientas increÃ­bles que usas casi a diario, como Google Translate, que es capaz de traducir entre mÃ¡s de 130 idiomas distintos y es usado por mÃ¡s de mil millones de personas en todo el planeta. TambiÃ©n es el cerebro principal detrÃ¡s de los famosos asistentes de voz como Siri, Alexa y Google Assistant, asÃ­ como de los avanzados chatbots conversacionales. Aunque estos sistemas todavÃ­a cometen errores graciosos o extraÃ±os de vez en cuando, cada dÃ­a se vuelven mÃ¡s inteligentes y precisos.",
      "Lo mÃ¡s fascinante de todo esto es que, asÃ­ como C-3PO siempre intenta usar su dominio total del lenguaje para mediar conflictos, ayudar a sus amigos humanos y salir de situaciones increÃ­blemente peligrosas, nuestra Inteligencia Artificial del mundo real nos estÃ¡ ayudando enormemente a romper las antiguas barreras del idioma que solÃ­an separarnos. Hoy podemos viajar, leer y comunicarnos sin problemas con personas al otro lado del mundo, todo gracias a la misma chispa tecnolÃ³gica que le dio voz al droide de protocolo mÃ¡s famoso y querido de la galaxia entera."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'A lo largo de las nueve pelÃ­culas principales de la "Saga Skywalker", el parlanchÃ­n y ansioso droide C-3PO fue interpretado ininterrumpidamente por el icÃ³nico actor britÃ¡nico Anthony Daniels. El personaje fue diseÃ±ado originalmente basÃ¡ndose directamente en la robot femenina llamada Maria de la legendaria y revolucionaria pelÃ­cula de ciencia ficciÃ³n "MetrÃ³polis" (dirigida por Fritz Lang en el aÃ±o 1927). Como dato curioso, la deslumbrante armadura dorada de C-3PO iba a ser originalmente de color plateado, pero George Lucas decidiÃ³ hacer el cambio a Ãºltimo minuto.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La innovadora arquitectura "Transformer" revolucionÃ³ para siempre la Inteligencia Artificial porque procesa frases enteras utilizando un mecanismo llamado "auto-atenciÃ³n" (self-attention). Esto le permite a la mÃ¡quina entender, por ejemplo, que la palabra "banco" significa cosas completamente diferentes si estÃ¡ en la frase "banco de arena del rÃ­o" o en la frase "cuenta bancaria en el banco". Como referencia de poder, el avanzado modelo de lenguaje GPT-4 cuenta con aproximadamente 1.8 billones de parÃ¡metros entrenados.' 
      }
    ],
    fact: 'En 2017, un equipo de genios investigadores de Google publicÃ³ un artÃ­culo titulado "Attention Is All You Need". Este documento ha sido citado mÃ¡s de 100,000 veces en investigaciones posteriores, convirtiÃ©ndolo en uno de los artÃ­culos cientÃ­ficos mÃ¡s influyentes en toda la historia de la informÃ¡tica. Gracias a ese texto, hoy existen todos los chatbots modernos.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/c3po_r2d2_tatooine.png', caption: 'C-3PO y R2-D2 en Tatooine â€” los droides mÃ¡s icÃ³nicos de Star Wars' }
    ]
  },
  {
    id: 'rovers-autonomos',
    title: 'R2-D2 en Marte: Perseverance e Ingenuity',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_droides/btn_rovers_autonomos.png',
    image: '/assets/starwars/infographic_droides/hero_rovers_autonomos.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_rovers_autonomos.png',
    bannerCaption: 'Perseverance recorre Marte de forma autÃ³noma usando IA para evitar obstÃ¡culos',
    content: [
      "Todos sabemos que el heroico e inseparable droide astromecÃ¡nico R2-D2 es el verdadero salvador en innumerables ocasiones durante la saga de Star Wars. Con su cuerpo en forma de barril blanco y azul, R2 repara naves daÃ±adas en pleno vuelo espacial, hackea rÃ¡pidamente enormes computadoras imperiales enemigas y guarda datos absolutamente vitales para la Alianza Rebelde. Hoy, en nuestro propio sistema solar, la agencia espacial NASA tiene sus propias versiones reales de astromecÃ¡nicos valientes, pero no exploran la Estrella de la Muerte, sino la superficie polvorienta y desolada del planeta Marte.",
      "El rover Perseverance, que aterrizÃ³ triunfalmente en Marte en febrero de 2021, es una de las mÃ¡quinas mÃ¡s avanzadas jamÃ¡s construidas por manos humanas. Mientras que los humanos controlan sus misiones generales, Perseverance cuenta con un sistema de inteligencia artificial brillante llamado 'AutoNav' que le permite pensar por sÃ­ mismo. Gracias a este avanzado software, el rover puede tomar sus propias decisiones de ruta, evitar crÃ¡teres gigantescos, sortear rocas afiladas y recorrer hasta 200 metros en un solo dÃ­a marciano sin intervenciÃ³n humana constante.",
      "Imagina tratar de manejar un coche a control remoto mientras estÃ¡s parado a kilÃ³metros de distancia y la pantalla de tu celular tarda 20 minutos completos en mostrarte lo que el carrito acaba de chocar. Eso es lo que pasa al comunicarse con Marte; la inmensa distancia hace que la seÃ±al de radio demore entre 3 y 22 minutos en llegar. Por eso, el rover necesita usar su propio 'cerebro de silicio' para cuidarse y sobrevivir. Perseverance estÃ¡ equipado con un complejo brazo robÃ³tico lleno de espectrÃ³metros y taladros para analizar rocas buscando restos de vida microscÃ³pica antigua.",
      "Pero Perseverance no viajÃ³ solo; llevÃ³ consigo a un amigo muy especial, como un pequeÃ±o droide compaÃ±ero, llamado Ingenuity. Este diminuto pero valiente helicÃ³ptero logrÃ³ hacer historia humana al convertirse en la primerÃ­sima nave en realizar un vuelo controlado y con motor en el cielo de otro planeta. Volar en Marte es extremadamente difÃ­cil porque su atmÃ³sfera es 100 veces menos densa y mucho mÃ¡s delgada que la de la Tierra. Tratar de volar el helicÃ³ptero Ingenuity en Marte es casi idÃ©ntico a intentar volar un helicÃ³ptero normal a una altitud extrema de 30 kilÃ³metros aquÃ­ en nuestro planeta, Â¡donde apenas hay aire para levantar las aspas!",
      "Para lograr este aparente milagro de la ingenierÃ­a aeroespacial, el pequeÃ±o Ingenuity tuvo que hacer girar sus ligerÃ­simas aspas de fibra de carbono a unas increÃ­bles y vertiginosas 2,400 revoluciones por minuto. Aunque lamentablemente sufriÃ³ un daÃ±o irreparable en una de sus aspas en enero de 2024, el heroico helicÃ³ptero logrÃ³ realizar un total de 72 vuelos totalmente exitosos. Ingenuity demostrÃ³ al mundo, tal como lo hace R2-D2, que el tamaÃ±o no importa en absoluto cuando se trata de tener el valor tecnolÃ³gico para hacer avanzar la gran historia de la exploraciÃ³n espacial."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la amada trilogÃ­a original de George Lucas, el icÃ³nico R2-D2 no era un simple robot manejado a control remoto, sino que era operado desde su apretado interior por el talentoso actor Kenny Baker. El inconfundible lenguaje de pitidos, silbidos y chirridos (conocido oficialmente como "droidspeak") fue creado magistralmente por el diseÃ±ador de sonido Ben Burtt utilizando un sintetizador analÃ³gico. R2-D2 ostenta el increÃ­ble rÃ©cord de haber aparecido en mÃ¡s pelÃ­culas de Star Wars que cualquier otro personaje.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'Los ingenieros de la NASA diseÃ±aron inicialmente al helicÃ³ptero Ingenuity pensando que solo sobrevivirÃ­a para realizar un mÃ¡ximo de 5 vuelos experimentales. Sorprendiendo maravillosamente a todos, completÃ³ un total de 72 vuelos durante casi 3 aÃ±os, recorriendo 17.7 kilÃ³metros en total y alcanzando alturas de hasta 24 metros. Cada uno de sus vuelos tenÃ­a que ser absolutamente autÃ³nomo, ya que el enorme retraso de la seÃ±al de radio de la Tierra hace que el pilotaje en tiempo real sea imposible.' 
      }
    ],
    fact: 'El sofisticado sistema de inteligencia artificial AutoNav que utiliza el rover Perseverance funciona combinando mÃºltiples cÃ¡maras estÃ©reo con una red neuronal profunda. Esto le permite crear detallados mapas 3D del terreno marciano en tiempo real mientras se mueve, logrando conducirse autÃ³nomamente a una velocidad de 120 metros por hora, cuatro veces mÃ¡s rÃ¡pido que Curiosity.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/c3po_r2d2_poster.png', caption: 'C-3PO y R2-D2 â€” arte conceptual inspirado en la trilogÃ­a original' }
    ]
  },
  {
    id: 'protesis-bionicas',
    title: 'La Mano de Luke: PrÃ³tesis BiÃ³nicas',
    color: '#42A5F5',
    btnImage: '/assets/starwars/infographic_droides/btn_protesis_bionicas.png',
    image: '/assets/starwars/infographic_droides/hero_protesis_bionicas.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_protesis_bionicas.png',
    bannerCaption: 'Las prÃ³tesis modernas pueden sentir presiÃ³n y temperatura gracias a interfaces neuronales',
    content: [
      "Uno de los momentos mÃ¡s impactantes de la saga espacial es cuando Luke Skywalker pierde su mano derecha durante un feroz duelo de sables de luz y recibe una prÃ³tesis cibernÃ©tica asombrosa que se ve, se mueve e incluso siente exactamente como una mano biolÃ³gica real humana. Durante muchas dÃ©cadas, los admiradores de la pelÃ­cula creyeron que esto solo existirÃ­a en la imaginaciÃ³n y la ficciÃ³n. Pero la ciencia moderna, combinando la medicina, la robÃ³tica y la ingenierÃ­a, estÃ¡ haciendo que las prÃ³tesis biÃ³nicas reales sean igual de asombrosas que la tecnologÃ­a mÃ©dica del universo de Star Wars.",
      "La magia detrÃ¡s de los brazos robÃ³ticos modernos se basa en algo llamado ElectromiografÃ­a (o EMG). Cada vez que tÃº decides mover un dedo de la mano, tu cerebro envÃ­a un pequeÃ±Ã­simo y sutil impulso elÃ©ctrico a travÃ©s de tus nervios hasta los mÃºsculos de tu antebrazo. Piensa en el sistema EMG como si tus propios mÃºsculos biolÃ³gicos le estuvieran enviando discretos mensajes de texto con instrucciones directas a los motores de la mano protÃ©sica de plÃ¡stico y metal. La computadora dentro del brazo biÃ³nico lee estas seÃ±ales elÃ©ctricas y hace que la mano robÃ³tica cierre el puÃ±o, agarre un vaso o seÃ±ale con un dedo.",
      "Empresas tecnolÃ³gicas vanguardistas como Ã–ssur y Open Bionics han creado manos robÃ³ticas increÃ­bles donde cada uno de los dedos metÃ¡licos y plÃ¡sticos tiene su propio y pequeÃ±o motor (un servo). Al tener motores individuales, los pacientes humanos pueden realizar agarres mucho mÃ¡s complejos y precisos, como sostener suavemente un delicado huevo de gallina sin romper su cÃ¡scara o utilizar un teclado de computadora. La gran meta no es simplemente reemplazar una extremidad ausente, sino lograr devolverle a las personas su total autonomÃ­a, independencia y dignidad en sus vidas diarias.",
      "Pero, Â¿cÃ³mo pueden sentir el tacto como la mano cibernÃ©tica de Luke? Los ingenieros prodigiosos de la Universidad Johns Hopkins y otras instituciones prestigiosas han logrado desarrollar un proceso llamado 'ReinervaciÃ³n Muscular Dirigida'. Los cirujanos redirigen muy cuidadosamente los cables nerviosos de los brazos de los pacientes para conectarlos a complejos parches llenos de sensores especiales. AsÃ­, cuando los dedos robÃ³ticos tocan una superficie, envÃ­an de regreso una suave corriente elÃ©ctrica. El paciente puede entonces sentir verdaderamente si estÃ¡ tocando algo caliente, frÃ­o, duro o suave.",
      "El inmenso y emocionante futuro de estas maravillas tecnolÃ³gicas nos llevarÃ¡ directamente a la ciencia de las interfaces cerebro-computadora. Con esto, algÃºn dÃ­a una persona podrÃ¡ dirigir su extremidad robÃ³tica utilizando exclusiva e instantÃ¡neamente la fuerza de su propio pensamiento, exactamente igual que un brazo de nacimiento. Esta deslumbrante intersecciÃ³n entre la anatomÃ­a biolÃ³gica humana y el diseÃ±o de la mecatrÃ³nica avanzada es la prueba perfecta de que nuestra ciencia del mundo real estÃ¡ alcanzando rÃ¡pidamente a las grandes maravillas que antes solo soÃ±Ã¡bamos ver en las pantallas de cine."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'El joven hÃ©roe Luke Skywalker recibe trÃ¡gicamente su avanzada mano protÃ©sica hacia el final de la pelÃ­cula "El Imperio Contraataca" (1980) inmediatamente despuÃ©s de perderla en el icÃ³nico y sombrÃ­o duelo contra Darth Vader. La mano cibernÃ©tica demuestra funcionar perfectamente y tiene incluso la increÃ­ble capacidad de sentir dolor cuando el droide mÃ©dico 2-1B la prueba con una aguja. AÃ±os mÃ¡s tarde, su propio padre, Anakin Skywalker, tambiÃ©n recibe un voluminoso brazo derecho metÃ¡lico cuando el Conde Dooku se lo corta en "El Ataque de los Clones" (2002).' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El asombroso Brazo ProtÃ©sico Modular desarrollado tenazmente por la Universidad Johns Hopkins posee unos increÃ­bles 26 grados de libertad (que son como articulaciones separadas) e incorpora mÃ¡s de 100 sensores distintos de fuerza y tacto. Otro modelo, el avanzado brazo DEKA, que fue financiado por DARPA y bautizado cariÃ±osamente como el "Brazo Luke" en honor a Luke Skywalker, fue aprobado oficialmente por la estricta FDA en 2014 porque permite hacer tareas complejÃ­simas, como usar llaves para abrir puertas cerradas.' 
      }
    ],
    fact: 'El acelerado campo de las interfaces cerebro-computadora (BCI) ha avanzado tanto que en el aÃ±o 2024, la empresa Neuralink implantÃ³ con gran Ã©xito un minÃºsculo chip neuronal en un paciente humano totalmente paralizado, logrando que controlara el cursor de una computadora solo con pensarlo. AdemÃ¡s, investigadores de BrainGate lograron que pacientes similares escriban hasta 90 caracteres por minuto Ãºnicamente imaginando el movimiento de sus propias manos escribiendo.'
  },
  {
    id: 'robots-cirujanos',
    title: 'Droides MÃ©dicos: El Sistema Da Vinci',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_droides/btn_robots_cirujanos.png',
    image: '/assets/starwars/infographic_droides/hero_robots_cirujanos.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_robots_cirujanos.png',
    bannerCaption: 'El sistema Da Vinci ha realizado mÃ¡s de 12 millones de cirugÃ­as desde el aÃ±o 2000',
    content: [
      "En el extenso universo de Star Wars, los droides mÃ©dicos como el modelo 2-1B son robots sumamente confiables y precisos que se encargan de sanar todas las peores heridas de batalla de los valientes miembros de la Alianza Rebelde. Hoy en dÃ­a, nuestros propios hospitales modernos del mundo real cuentan con una tecnologÃ­a robÃ³tica mÃ©dica verdaderamente espectacular y vanguardista, destacando entre todos el mundialmente famoso 'Sistema QuirÃºrgico Da Vinci', desarrollado por la compaÃ±Ã­a Intuitive Surgical, una maravilla aprobada por la FDA desde el lejano aÃ±o 2000.",
      "El monumental y avanzado sistema robÃ³tico Da Vinci no opera de manera autÃ³noma ni toma decisiones propias; es mÃ¡s bien una compleja e increÃ­blemente precisa extensiÃ³n mecÃ¡nica de las manos humanas. El mÃ©dico cirujano se sienta cÃ³modamente frente a una consola con pantalla 3D de alta definiciÃ³n, mientras que los largos y delgados brazos robÃ³ticos de la mÃ¡quina, equipados con bisturÃ­es y cÃ¡maras microscÃ³picas, realizan incisiones pequeÃ±Ã­simas dentro del paciente. Para entenderlo de manera simple: usar el Da Vinci es literalmente como tener a un talentoso mÃ©dico que posee una vista con sÃºper zoom 10x y manos microscÃ³picas invulnerables al temblor.",
      "Una de las mayores y mÃ¡s fabulosas ventajas de este portentoso droide quirÃºrgico real es que los cortes que realiza son diminutos y exactos, con incisiones que apenas miden un centÃ­metro. Esto hace que la cirugÃ­a sea catalogada como 'mÃ­nimamente invasiva'. Como resultado de esto, los pacientes sangran drÃ¡sticamente menos durante la delicada operaciÃ³n, se ahorran gigantescas e incÃ³modas cicatrices, y se logran recuperar y marchar a sus casas muchÃ­simo mÃ¡s rÃ¡pido que si les hicieran una cirugÃ­a abierta tradicional con las enormes herramientas de acero del pasado.",
      "Mirando hacia el futuro cercano, los cientÃ­ficos no se estÃ¡n conformando con crear enormes robots de metal. En prestigiosos laboratorios como los de la Universidad de Harvard, los ingenieros expertos estÃ¡n diseÃ±ando una nueva tecnologÃ­a llamada 'robÃ³tica blanda' y construyendo pequeÃ±os 'Octobots' hechos enteramente de plÃ¡sticos suaves y polÃ­meros de silicona flexibles, sin utilizar un solo engranaje o hueso metÃ¡lico rÃ­gido. Estos asombrosos robots blanditos son sÃºper elÃ¡sticos, lo que les permitirÃ¡ en el futuro apretujarse y navegar cuidadosamente a travÃ©s de nuestros delicados vasos sanguÃ­neos o intrincados intestinos humanos sin causar ningÃºn daÃ±o interno.",
      "Incluso se estÃ¡n investigando e inventando los diminutos y futuristas 'nanorobots'. Estas son microscÃ³picas y avanzadas mÃ¡quinas que miden apenas una milÃ©sima parte del grosor de un cabello humano y que algÃºn dÃ­a cercano podrÃ­an ser inyectadas directamente en tu propio torrente sanguÃ­neo. Su noble misiÃ³n serÃ¡ la de cazar incansablemente los peligrosos virus o entregar dosis precisas de medicamentos salvadores exactamente en la cÃ©lula especÃ­fica que estÃ¡ enferma. AsÃ­, los droides mÃ©dicos del futuro tal vez no estarÃ¡n parados imponentemente junto a tu cama, sino que estarÃ¡n fluyendo silenciosamente por dentro de tus propias venas."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el amargo final de la pelÃ­cula "El Imperio Contraataca", es precisamente el eficiente droide mÃ©dico 2-1B quien trata con Ã©xito las graves heridas sistÃ©micas de Luke Skywalker, ademÃ¡s de realizar magistralmente la increÃ­ble y complejÃ­sima operaciÃ³n para acoplarle permanentemente su nueva mano biÃ³nica. Luego, en "La Venganza de los Sith", observamos cÃ³mo varios avanzados droides mÃ©dicos asisten directamente en el difÃ­cil y triste parto doble donde nacen los gemelos Luke y Leia. TambiÃ©n conocemos al especializado droide FX-7, que funge como un excelente asistente quirÃºrgico de mÃºltiple brazos.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'El genial e innovador robot blando Octobot, inventado por un destacado equipo de la Universidad de Harvard, se convirtiÃ³ en el primerÃ­simo robot completamente blando y flexible de la historia del mundo. Carece absolutamente de piezas metÃ¡licas rÃ­gidas y de electrÃ³nica tradicional, utilizando sorprendentemente perÃ³xido de hidrÃ³geno como su principal combustible. Esta sustancia quÃ­mica reacciona y se descompone velozmente en forma de un gas inocuo que infla repetidamente sus tentÃ¡culos de silicona para poder avanzar.' 
      }
    ],
    fact: 'El complejÃ­simo sistema quirÃºrgico Da Vinci utiliza potentes algoritmos informÃ¡ticos para filtrar mecÃ¡nicamente el temblor natural de las manos del mÃ©dico cirujano, ademÃ¡s de escalar sus movimientos reales hasta a una quinta parte de su tamaÃ±o. En tÃ©rminos prÃ¡cticos, esto significa que si el cirujano mueve su mano fÃ­sica 5 centÃ­metros en la consola, el microscÃ³pico instrumento robÃ³tico adentro del paciente solo se mueve 1 centÃ­metro milimÃ©tricamente calculado. Esto posibilita operaciones perfectas en estructuras que miden menos de 1 milÃ­metro.'
  },
  {
    id: 'atlas-spot',
    title: 'Boston Dynamics: Atlas y Spot',
    color: '#AB47BC',
    btnImage: '/assets/starwars/infographic_droides/btn_atlas_spot.png',
    image: '/assets/starwars/infographic_droides/hero_atlas_spot.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_atlas_spot.png',
    bannerCaption: 'Atlas puede correr, saltar y hacer parkour â€” Spot inspecciona fÃ¡bricas y obras',
    content: [
      "Aunque no tenemos droides de batalla B1 marchando en masivos y amenazantes ejÃ©rcitos en el planeta Tierra, sÃ­ contamos con robots increÃ­blemente Ã¡giles y asombrosos que son una maravilla mecÃ¡nica de Ãºltima generaciÃ³n. La famosa empresa estadounidense llamada Boston Dynamics ha construido durante los Ãºltimos aÃ±os algunos de los robots bÃ­pedos y cuadrÃºpedos mÃ¡s avanzados y mundialmente reconocidos de toda la historia, como su robot humanoide estrella, el poderoso 'Atlas', y el Ã¡gil robot con apariencia de perro amarillo conocido popularmente como 'Spot'.",
      "El deslumbrante humanoide Atlas es simplemente un prodigio y una obra maestra de la ingenierÃ­a moderna y del software de inteligencia artificial avanzado. Su computadora central procesa millones de datos de sus sensores corporales en menos de un microsegundo, lo que le permite realizar proezas gimnÃ¡sticas sorprendentes, como dar volteretas hacia atrÃ¡s sin caerse, subir escaleras rÃ¡pidamente y superar complicadas pistas de obstÃ¡culos haciendo parkour real. Todo su pesado cuerpo debe hacer constantes y rÃ¡pidos cÃ¡lculos matemÃ¡ticos instantÃ¡neos cada fracciÃ³n de segundo para lograr mantener su centro de gravedad en perfecto equilibrio dinÃ¡mico sin irse de bruces.",
      "Por otro lado, Spot, el veloz y amistoso perro-robot cuadrÃºpedo, ya se encuentra activamente trabajando como un empleado incansable en las industrias y construcciones del mundo real de hoy. Equipado hasta los topes con sofisticadas cÃ¡maras y complejos radares lÃ¡ser, Spot puede trotar sin ningÃºn problema sobre las enormes rocas sueltas y sortear Ã¡gilmente escombros de lugares en demoliciÃ³n sin sufrir accidentes. Realiza vitales y valiosas inspecciones de seguridad en fÃ¡bricas tÃ³xicas, oscuras minas subterrÃ¡neas y peligrosas plataformas petroleras donde, de otro modo, un valioso trabajador humano correrÃ­a el riesgo constante de lastimarse.",
      "Otro paso gigante e importantÃ­simo en el naciente mundo de la robÃ³tica son los llamados 'Cobots' (la contracciÃ³n en inglÃ©s para referirse a 'Robots Colaborativos'). A diferencia de los grandes e industriales brazos robÃ³ticos que tenÃ­an que estar obligatoriamente encerrados en rÃ­gidas jaulas de metal grueso para no golpear accidentalmente a las personas, los cobots (fabricados por marcas lÃ­deres mundiales como Universal Robots o FANUC) son sumamente seguros, estÃ¡n rodeados por suaves almohadillas y estÃ¡n repletos de sensores inteligentes que detienen sus veloces motores de inmediato si detectan que apenas rozaron la mano o el hombro de una persona cercana.",
      "EnseÃ±ar a programar a estos maravillosos cobots colaborativos es sorprendentemente tan fÃ¡cil como intentar enseÃ±arle un nuevo paso de baile a tu mejor amigo. Los amables operadores humanos ni siquiera necesitan sentarse a escribir lÃ­neas complejas y aburridas de cÃ³digo fuente; simplemente sujetan fÃ­sicamente el dÃ³cil brazo robÃ³tico y lo guÃ­an paso a pasito a lo largo de la trayectoria que debe recorrer para lograr agarrar su objetivo. El inteligente robot usa entonces sus sensores para memorizar cada uno de los movimientos y es capaz de repetirlo infinitamente de manera absolutamente impecable, convirtiÃ©ndose en el compaÃ±ero laboral ideal en las lÃ­neas de ensamblaje."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la trepidante pelÃ­cula "La Venganza de los Sith", el terrorÃ­fico lÃ­der separatista General Grievous no es un robot total, sino un despiadado cyborg que es mitad mÃ¡quina acorazada y mitad alienÃ­gena orgÃ¡nico, demostrando la fascinante integraciÃ³n biomecatrÃ³nica completa para propÃ³sitos militares y de combate. AdemÃ¡s, los letales Droidekas (o "droides destructores") de los separatistas fueron diseÃ±ados para tener la forma compacta de una veloz rueda esfÃ©rica que se transporta rÃ¡pidamente y, de pronto, se despliega mÃ¡gicamente para levantar sus grandes escudos de energÃ­a impenetrable, un concepto brillante de geometrÃ­a y diseÃ±o transformable que ha sido Ã¡vidamente estudiado y emulado por verdaderos ingenieros de robÃ³tica.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El complejo cerebro del humanoide Atlas emplea simultÃ¡neamente algoritmos avanzados de "control predictivo de modelos" y el uso extensivo del "aprendizaje automÃ¡tico" (machine learning) mÃ¡s actual para calcular dinÃ¡micamente cÃ³mo mantener su pesado cuerpo de 89 kilogramos en un balance inquebrantable y perfecto. AdemÃ¡s de eso, el mundialmente famoso perro-robot amarillo Spot ha sido formalmente adquirido por el mismÃ­simo Jet Propulsion Laboratory (JPL) de la agencia espacial NASA, quienes lo han empleado para recorrer, cartografiar y explorar cavernas subterrÃ¡neas estrechas y terrenos difÃ­ciles en la Tierra para practicar misiones planetarias.' 
      }
    ],
    fact: 'En 2024, Boston Dynamics revelÃ³ un rediseÃ±o de su robot Atlas, cambiando la tecnologÃ­a hidrÃ¡ulica por maquinaria elÃ©ctrica. El nuevo Atlas elÃ©ctrico puede rotar sus articulaciones 360 grados, un movimiento biomecÃ¡nicamente imposible para un humano, y puede levantarse desde el suelo usando maniobras innovadoras en robÃ³tica.',
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
    bannerCaption: 'AlphaFold predijo la estructura de 200 millones de proteÃ­nas â€” Nobel de QuÃ­mica 2024',
    content: [
      "Mientras que muchos de los droides de las emocionantes pelÃ­culas de Star Wars son fabricados para ayudar en Ã©picas batallas espaciales o arreglar viejas naves, la verdadera Inteligencia Artificial del mundo humano tiene metas aÃºn mÃ¡s grandiosas e inspiradoras: ayudar silenciosamente a salvar incontables y valiosas vidas. El ejemplo mÃ¡s brillante y espectacular de todos se llama 'AlphaFold', que es un programa de computadora increÃ­ble creado por la famosa y revolucionaria compaÃ±Ã­a britÃ¡nica DeepMind, experta mundial indiscutible en redes neuronales e inteligencia artificial.",
      "Para entender cÃ³mo funciona AlphaFold, primero tienes que imaginar a las proteÃ­nas de nuestro cuerpo como microscÃ³picos y complejÃ­simos origamis o figuras de papel dobladas. Las proteÃ­nas construyen todo lo que eres, desde tus duros huesos hasta tu piel. Pero lo mÃ¡s importante de una proteÃ­na no es Ãºnicamente de quÃ© diminutas partes estÃ¡ hecha, sino exactamente la manera fÃ­sica en la que se pliega y se dobla sobre sÃ­ misma. Si una proteÃ­na se dobla mal, empiezan a aparecer horribles enfermedades graves. El problema es que descubrir cÃ³mo se dobla un solo 'origami' de proteÃ­na podÃ­a costarle aÃ±os y aÃ±os de arduo trabajo a los mejores cientÃ­ficos.",
      "Â¡Y entonces apareciÃ³ el todopoderoso programa de IA AlphaFold! Esta asombrosa y gigantesca inteligencia artificial aprendiÃ³ en tan solo cuestiÃ³n de meses, usando sÃºper computadoras masivas, exactamente cÃ³mo se dobla y forma prÃ¡cticamente cada una de las proteÃ­nas de todas las especies y plantas de la Tierra. AlphaFold resolviÃ³ en apenas horas, gracias a sus millones de redes neuronales interconectadas, el misterio oculto que los cientÃ­ficos biÃ³logos y quÃ­micos del mundo llevaban investigando y persiguiendo por mÃ¡s de 50 aÃ±os consecutivos, logrando un Ã©xito cientÃ­fico inigualable.",
      "Y este es solo el gran y emocionante principio de las mÃ¡quinas ayudando inmensamente a la humanidad a descubrir y explorar los Ãºltimos grandes misterios cientÃ­ficos del planeta. TambiÃ©n contamos con increÃ­bles submarinos robot no tripulados llamados 'VehÃ­culos Operados a Distancia' (ROVs), los cuales se sumergen intrÃ©pidamente hacia la completa oscuridad, el frÃ­o brutal y la presiÃ³n aplastante del ocÃ©ano profundo para descubrir criaturas extraÃ±as. Estos invaluables robots descubren exÃ³ticas y misteriosas especies marinas, mapean en 3D el lecho del ocÃ©ano y nos enseÃ±an celosamente secretos geolÃ³gicos que ningÃºn valiente buzo humano podrÃ­a intentar alcanzar y sobrevivir.",
      "Al final del dÃ­a, estas mÃ¡quinas tan avanzadas e impresionantes son herramientas indispensables, construidas como extensiones poderosÃ­simas e infatigables del ilimitado intelecto y la curiosidad humana. La asombrosa inteligencia artificial que resolviÃ³ de golpe el infinito misterio mÃ©dico de las proteÃ­nas y los submarinos robotizados de alta resistencia que logran trazar el fondo negro del ocÃ©ano nos prueban contundentemente que la mejor manera de usar la mÃ¡s grande tecnologÃ­a mundial es colaborando unidos pacÃ­ficamente para sanar y comprender mejor nuestro hermoso y pÃ¡lido punto azul, la Tierra."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En la pelÃ­cula "El Episodio I: La Amenaza Fantasma", recordamos la escena con criaturas acuÃ¡ticas como los asesinos Opee y los peces garra Colo en los ocÃ©anos de Naboo. Qui-Gon, Obi-Wan y Jar Jar navegan esas profundidades en el submarino Bongo. En nuestra realidad, los robots de exploraciÃ³n marina deben enfrentar entornos oscuros que resultan casi tan inexplorados e inhÃ³spitos como el abismo ficticio de Naboo.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Antes de AlphaFold, modelar la estructura 3D microscÃ³pica de una proteÃ­na tomaba aÃ±os a los investigadores utilizando cristalografÃ­a de rayos X. Ahora, AlphaFold puede predecir en minutos esa misma estructura. DeepMind hizo pÃºblica una base de datos con mÃ¡s de 200 millones de predicciones de proteÃ­nas de forma gratuita para investigadores de todo el mundo.' 
      }
    ],
    fact: 'El invencible y avanzado robot submarino llamado ROV Jason fue construido expresamente para poder sumergirse velozmente hasta profundidades asombrosas que superan los 6,500 metros en la negrura total del mar, aguantando presiones aplastantes que equivalen a tener el peso descomunal de un automÃ³vil balanceÃ¡ndose Ãºnicamente sobre la diminuta superficie de cada centÃ­metro cuadrado de su fuselaje de acero. AÃºn mÃ¡s increÃ­ble fue el aÃ±o 2012, cuando el atrevido cineasta James Cameron bajÃ³ dentro de su submarino modificado Deepsea Challenger hasta los oscuros 10,908 metros de profundidad al interior de la fosa de las Marianas, que es una profundidad total todavÃ­a mayor a la asombrosa altura que posee el monte Everest.'
  },
  {
    id: 'futuro-droides',
    title: 'Construye tu Propio Droide',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_droides/btn_futuro_droides.png',
    image: '/assets/starwars/infographic_droides/hero_futuro_droides.png',
    bannerImage: '/assets/starwars/infographic_droides/banner_futuro_droides.png',
    bannerCaption: 'Arduino, LEGO y FIRST Robotics: la robÃ³tica estÃ¡ al alcance de todos',
    content: [
      "Si toda esta sorprendente tecnologÃ­a, inteligencias artificiales, helicÃ³pteros marcianos y brazos biÃ³nicos sÃºper precisos han logrado encender la curiosidad de tu imaginaciÃ³n por completo, Â¡tenemos grandes noticias para ti! Absolutamente nunca en toda la historia de la humanidad habÃ­a resultado tan inmensamente sencillo e increÃ­blemente barato lograr adentrarse en este apasionante y creativo mundo. Las herramientas perfectas e ideales para aprender y empezar ya existen en todas las escuelas y hogares, abriendo un abanico de posibilidades ilimitadas para que des tus primeros pasos en la robÃ³tica.",
      "Puedes empezar armando tus propios inventos usando la plataforma de LEGO Mindstorms o el genial Spike Prime. Ambos combinan los clÃ¡sicos y divertidos ladrillitos de colores con pequeÃ±os motores elÃ©ctricos sÃºper rÃ¡pidos, mÃºltiples sensores de movimiento muy avanzados y diminutas minicomputadoras que puedes programar sumamente fÃ¡cil, arrastrando simples y vistosos bloques de cÃ³digo coloridos en la brillante pantalla de tu computadora. Es el paso inicial mÃ¡s fÃ¡cil y emocionante para que tu genial e ingenioso diseÃ±o adquiera vida, movimiento propio y logre cumplir complejas tareas automatizadas sin necesidad de un complejo control remoto manual.",
      "Y si estÃ¡s listo para intentar probar un desafÃ­o de electrÃ³nica e ingenierÃ­a mucho mÃ¡s ambicioso e increÃ­ble, tu principal opciÃ³n deberÃ­a ser explorar el fascinante y maravilloso universo de 'Arduino'. Puedes imaginar que una simple y pequeÃ±ita placa de circuito electrÃ³nico azul de Arduino (creada por geniales investigadores en 2005 en la lejana Italia) es literalmente igual que un cerebro electrÃ³nico del tamaÃ±o de una goma de borrar que puedes enchufar, programar y utilizar para controlar las luces de toda tu habitaciÃ³n, echar a andar mÃºltiples servomotores al unÃ­sono, y armar los mÃ¡s potentes, veloces y Ãºtiles proyectos y creaciones mecatrÃ³nicas... y lo mÃ¡s increÃ­ble, Â¡todo por un costo ridÃ­culamente menor que el precio que pagarÃ­as al ordenar una pizza grande en un restaurante local!",
      "Pero la mecatrÃ³nica moderna y la IA no son, en absoluto, solamente sobre apretar tornillos de metal con una llave y escribir interminables lÃ­neas de cÃ³digo fuente en un monitor luminoso; tambiÃ©n implican una inmensa y seria responsabilidad moral y social sobre sus hombros. Los geniales pioneros de este campo tecnolÃ³gico siempre se preguntan si estas grandiosas inteligencias y estas potentes y sofisticadas herramientas robÃ³ticas estarÃ¡n utilizÃ¡ndose siempre por el bien mayor de todos, guiadas por pautas Ã©ticas justas. Es en este punto de enorme relevancia donde el antiguo y famoso escritor y maestro de la literatura futurista de ciencia ficciÃ³n, Isaac Asimov, trazÃ³ desde el aÃ±o 1942 sus cÃ©lebres Tres Leyes de la RobÃ³tica, que fueron pilares tan sumamente importantes que mÃ¡s adelante lograron inspirar e impulsar la creaciÃ³n de gigantescos y verdaderos protocolos Ã©ticos y manuales de bioseguridad internacional.",
      "El futuro contarÃ¡ con robots avanzados como Figure 01 y el humanoide Tesla Optimus. Su desarrollo requerirÃ¡ programadores talentosos que diseÃ±en estas mÃ¡quinas con responsabilidad. Si alguna vez miras a R2-D2 y te gustarÃ­a construir un androide similar, te invitamos a buscar un equipo y empezar a aprender los primeros pasos en programaciÃ³n y robÃ³tica."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En las pelÃ­culas de Star Wars, los droides poseen distintas personalidades. C-3PO se muestra ansioso y protocolario, mientras que R2-D2 es valiente, y BB-8 muestra lealtad. A pesar de estos rasgos emocionales, a menudo se les trata como propiedad mecÃ¡nica y se les realizan borrados de memoria; un debate que refleja dilemas sobre los derechos y la Ã©tica en la inteligencia artificial moderna.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'La competencia internacional FIRST Robotics, fundada por el inventor Dean Kamen en 1989, cuenta con la participaciÃ³n de mÃ¡s de 650,000 estudiantes de unos 100 paÃ­ses. Diversos estudios muestran que los alumnos graduados de los programas de FIRST tienen mayores probabilidades de estudiar carreras vinculadas a las disciplinas STEM (ciencia, tecnologÃ­a, ingenierÃ­a y matemÃ¡ticas) a nivel universitario.' 
      }
    ],
    fact: 'El escritor Isaac Asimov postulÃ³ sus "Tres Leyes" de la RobÃ³tica en 1942: Primera: Un robot no debe daÃ±ar a un humano ni permitir que sufra daÃ±o por inacciÃ³n. Segunda: Debe cumplir Ã³rdenes dadas a menos que violen la primera ley. Tercera: Un robot debe proteger su propia existencia, siempre y cuando no viole la primera o segunda ley. Es interesante notar que estas reglas nacidas de la ficciÃ³n han inspirado debates Ã©ticos y regulaciones en inteligencia artificial en la vida real.',
    extraImages: [
      { src: '/assets/starwars/infographic_droides/extras/bb8_cartoon.png', caption: 'BB-8 â€” el adorable droide esfÃ©rico de la nueva trilogÃ­a' },
      { src: '/assets/starwars/infographic_droides/extras/bb8_vector.png', caption: 'BB-8 â€” diseÃ±o vectorial del droide astromecÃ¡nico' }
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
          right: '5px',
          background: node.color,
          borderRadius: '50%',
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
                <Sparkles size={16} /> GALERÃA DE IMÃGENES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: node.extraImages.length === 1 ? '1fr' : '1fr 1fr', gap: '0.75rem' }}>
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
              Â¡SISTEMAS INICIALIZADOS!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS DEL TEMPLO (BibliografÃ­a)</h3>
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
