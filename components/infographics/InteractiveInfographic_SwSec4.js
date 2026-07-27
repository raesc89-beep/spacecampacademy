'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Quantum Themed)
   ========================================================================= */

const DecoAtom = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(45 12 12)" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(-45 12 12)" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <circle cx="12" cy="12" r="2" fill={color} opacity="0.9"/>
  </svg>
);

const DecoWaveFunction = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M2 12C6 12 6 4 10 4C14 4 14 20 18 20C22 20 22 12 24 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);

const DecoEntanglementSpiral = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7"/>
    <circle cx="8" cy="12" r="2" fill={color} opacity="0.9"/>
    <circle cx="16" cy="12" r="2" fill={color} opacity="0.9"/>
    <path d="M8 12C8 12 12 8 16 12" stroke={color} strokeWidth="1" opacity="0.6"/>
  </svg>
);

const DecoForceLightning = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    <path d="M15 4L7 12H13L12 18L19 10H14L15 4Z" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);

const DecoQubitOrbit = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <ellipse cx="12" cy="12" rx="10" ry="3" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="3" ry="10" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
    <circle cx="12" cy="2" r="2" fill={color} opacity="0.9"/>
  </svg>
);

const DECO_MAP = {
  'entrelazamiento-basico': [DecoEntanglementSpiral, DecoAtom],
  'epr-paradoja': [DecoAtom, DecoWaveFunction],
  'superposicion-cuantica': [DecoWaveFunction, DecoQubitOrbit],
  'teleportacion-cuantica': [DecoEntanglementSpiral, DecoForceLightning],
  'computacion-cuantica': [DecoQubitOrbit, DecoAtom],
  'no-localidad': [DecoEntanglementSpiral, DecoWaveFunction],
  'fuerza-universo': [DecoForceLightning, DecoQubitOrbit],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Einstein, A., Podolsky, B., & Rosen, N. (1935). 'Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?'. Physical Review, 47(10), 777-780.",
  "Bell, J. S. (1964). 'On the Einstein Podolsky Rosen paradox'. Physics Physique Fizika, 1(3), 195-200.",
  "Aspect, A., Dalibard, J., & Roger, G. (1982). 'Experimental Test of Bell\\'s Inequalities Using Time-Varying Analyzers'. Physical Review Letters, 49(25), 1804-1807.",
  "Schrödinger, E. (1935). 'Die gegenwärtige Situation in der Quantenmechanik'. Naturwissenschaften, 23, 807-812.",
  "Bennett, C. H., et al. (1993). 'Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels'. Physical Review Letters, 70(13), 1895-1899.",
  "Arute, F., et al. (2019). 'Quantum supremacy using a programmable superconducting processor'. Nature, 574(7779), 505-510."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'entrelazamiento-basico',
    title: 'La Fuerza que Conecta Todo',
    color: '#B388FF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_entrelazamiento-basico.png',
    image: '/assets/starwars/infographic_fuerza/hero_entrelazamiento-basico.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_entrelazamiento-basico.png',
    bannerCaption: "Representación del entrelazamiento cuántico: dos partículas comparten estado instantáneamente sin importar la distancia.",
    content: [
      "¿Alguna vez has sentido que estás conectado invisiblemente con un gran amigo, sabiendo exactamente lo que piensa sin tener que decir una sola palabra en voz alta? En la física cuántica, existe un fenómeno maravillosamente real y fascinante llamado 'entrelazamiento cuántico', que los científicos llaman de manera cariñosa 'acción fantasmal a distancia'. Ocurre exactamente cuando dos partículas microscópicas interactúan estrechamente y sus destinos quedan unidos permanentemente para siempre. Es decir, lo que le sucede a una partícula afecta inmediatamente a la otra compañera, incluso si se encuentran en extremos opuestos del inmenso universo, sin importar los millones de kilómetros de espacio frío y vacío que las separen en ese instante.",
      "Imagina por un momento que tienes en tus manos dos dados mágicos de seis caras. Cuando los lanzas en diferentes planetas al mismo tiempo, si el primer dado cae mostrando un seis perfecto, el otro dado automáticamente y al instante mostrará también un seis, sin ninguna duda. Así es exactamente como funciona el asombroso entrelazamiento cuántico en los modernos laboratorios de física de todo el mundo. Los científicos expertos pueden medir el estado o el giro direccional (conocido formalmente como 'espín') de una partícula pequeña como un electrón aquí en la Tierra, y misteriosamente, su partícula gemela entrelazada ubicada hipotéticamente en otra galaxia lejana adoptará el estado opuesto en el mismo instante exacto, violando de manera flagrante todas las reglas tradicionales del sentido común y la física clásica.",
      "Para lograr entender esto muchísimo mejor, usemos una analogía brillante al estilo del gran físico educador Richard Feynman. Piensa en el misterioso entrelazamiento como si tuvieras un par de guantes mágicos de invierno guardados cuidadosamente en dos cajas selladas y separadas. Si abres una de las cajas misteriosas y descubres que tienes el guante izquierdo, instantáneamente sabes con absoluta certeza del cien por ciento que la otra caja cerrada, sin importar qué tan lejos haya sido enviada por el correo espacial, contiene indudablemente el guante derecho correspondiente. La revolucionaria física cuántica demuestra científicamente que antes de abrir la caja, las partículas están en un estado indefinido y fantasmal, pero al realizar la medición, colapsan juntas en sus realidades definitivas casi como por arte de una magia cósmica.",
      "En el increíble y vasto universo de Star Wars, los sabios Maestros Jedi hablan constantemente y con gran reverencia de 'La Fuerza', un campo de energía mística y omnipotente creado por todas las cosas vivas que nos rodea, nos penetra y mantiene unida a la inmensa galaxia entera. El entrelazamiento cuántico es, sin lugar a dudas, lo más cercano que tenemos en nuestro mundo real y científico a esa misteriosa e invisible Fuerza galáctica de las películas. Este concepto físico sugiere de manera comprobable en el laboratorio que el universo en el que vivimos no está hecho simplemente de piezas separadas y solitarias que flotan sin rumbo en el vacío oscuro, sino que es una red infinitamente compleja y profundamente interconectada donde todo puede comunicarse y resonar instantáneamente a un nivel subatómico verdaderamente fundamental.",
      "Los rigurosos experimentos científicos internacionales han verificado este extraño fenómeno docenas de veces utilizando pares especiales de fotones, que son las pequeñas e increíbles partículas fundamentales que componen la hermosa luz que vemos cada día con nuestros ojos. Han separado físicamente estos fotones entrelazados por cientos de kilómetros utilizando larguísimos cables de fibra óptica subterráneos e incluso han utilizado satélites espaciales avanzados como el satélite chino Micius para probarlo desde la órbita. En cada una de estas rigurosas e increíbles pruebas, la conexión cuántica instantánea e invisible se mantuvo intacta y absolutamente perfecta. Así como un joven Padawan aprende a sentir la presencia de su Maestro Jedi a través de vastas distancias espaciales, la naturaleza cuántica de nuestro cosmos demuestra fehacientemente que la separación física es en gran medida solo una poderosa ilusión persistente."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'En el desconcertante mundo subatómico y microscópico, el entrelazamiento cuántico simplemente no parece respetar en absoluto el límite de velocidad cósmico más famoso y estricto establecido por Albert Einstein: la asombrosa velocidad de la luz. Aunque nada material puede viajar más rápido que la luz en el vacío del espacio normal, la misteriosa "información" o el estado correlacionado entre dos partículas cuánticas entrelazadas parece transferirse de manera absolutamente instantánea y simultánea, lo que ha desconcertado y fascinado por completo a las mentes científicas más brillantes de la humanidad durante casi todo un siglo entero de investigaciones continuas y debates acalorados.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El destacado y brillante físico teórico Erwin Schrödinger fue la primera persona en utilizar oficialmente el término "entrelazamiento" (o "Verschränkung" en su idioma alemán original) en el histórico año de 1935 para intentar describir esta extraña e inusual correlación cuántica. Schrödinger se dio cuenta completamente asombrado de que el entrelazamiento no era solo un rasgo menor e insignificante de la mecánica cuántica, sino que era en realidad "el" rasgo característico y fundamental que obliga a la novedosa teoría a apartarse por completo de todas las líneas de pensamiento clásicas, newtonianas y convencionales sobre cómo funciona verdaderamente nuestro universo físico.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el emocionante e intenso Episodio VIII: Los Últimos Jedi, la valiente heroína Rey y el profundamente conflictivo Kylo Ren experimentan de primera mano una poderosa, íntima e inexplicable conexión a través de la Fuerza, conocida en la mitología galáctica como una "Díada en la Fuerza". Pueden hablar fluidamente, verse con total claridad e incluso llegar a tocarse físicamente a pesar de estar ubicados en planetas completamente diferentes a muchísimos años luz de enorme distancia. Esta asombrosa conexión galáctica en la pantalla grande es la representación perfecta, poética y cinematográfica del misterioso entrelazamiento cuántico macroscópico, donde dos entidades están tan profundamente entrelazadas que trascienden el espacio y el tiempo convencional.' 
      }
    ],
    fact: 'El entrelazamiento cuántico es un fenómeno físico absolutamente real y verificado empíricamente en múltiples laboratorios donde los grupos de partículas microscópicas se generan o interactúan de tal manera asombrosa que el estado cuántico preciso de cada partícula individual simplemente no puede describirse de forma independiente del estado de las otras compañeras, incluso cuando dichas partículas están separadas por distancias astronómicamente inmensas y sin conexión material.'
  },
  {
    id: 'epr-paradoja',
    title: 'La Paradoja EPR',
    color: '#00BCD4',
    btnImage: '/assets/starwars/infographic_fuerza/btn_epr-paradoja.png',
    image: '/assets/starwars/infographic_fuerza/hero_epr-paradoja.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_epr-paradoja.png',
    bannerCaption: "Albert Einstein, Boris Podolsky y Nathan Rosen propusieron en 1935 la paradoja EPR, cuestionando la mecánica cuántica.",
    content: [
      "En el históricamente fascinante año de 1935, el legendario y mundialmente famoso genio Albert Einstein, trabajando junto con sus brillantes colegas científicos Boris Podolsky y Nathan Rosen, publicaron un documento científico verdaderamente revolucionario que sacudiría violentamente los firmes cimientos de la física moderna de la época. A este famosísimo desafío intelectual e histórico se le conoce cariñosamente en las universidades como la 'Paradoja EPR', nombrada así por las iniciales de sus tres inteligentes creadores. Einstein estaba profundamente incómodo, insatisfecho y perturbado por las extrañas y raras predicciones de la nueva mecánica cuántica, especialmente por la descabellada idea del entrelazamiento cuántico, porque parecía contradecir de manera muy directa y peligrosa su propia y celebrada Teoría de la Relatividad Especial, la cual afirmaba categóricamente que absolutamente nada en el universo superaba jamás a la velocidad de la luz.",
      "Einstein argumentó con muchísima vehemencia y tremenda pasión que si el fenómeno del entrelazamiento fuera verdaderamente instantáneo como decían las matemáticas, entonces requeriría obligatoriamente lo que él llamó famosamente y con mucho sarcasmo una 'espeluznante acción a distancia' o 'spooky action at a distance' en su idioma original. Para la mente ordenada de Einstein, el universo entero tenía que ser obligatoriamente un lugar lógico, predecible y maravillosamente ordenado donde las cosas físicas solo se afectaban o influían entre sí si estaban lo suficientemente cerca como para enviarse una señal o tocarse. Él creía firme y tercamente que debía existir alguna información oculta y totalmente secreta, a la que llamó científicamente 'variables ocultas', que los científicos de su época simplemente no podían ver, encontrar o medir todavía porque sus herramientas de laboratorio actuales eran demasiado primitivas.",
      "Para usar una maravillosa, clara y divertida analogía al inconfundible estilo del gran educador Richard Feynman, imagina a dos hermanos gemelos idénticos que siempre, sin falta, se visten del mismo color de ropa todos los días sin haberse puesto de acuerdo por teléfono. Einstein decía con seguridad que los gemelos no se estaban comunicando mágicamente ni telepáticamente en el instante exacto en que se despertaban por la mañana en diferentes ciudades alejadas; más bien, afirmaba rotundamente que ambos hermanos habían planeado en secreto usar sus camisas rojas desde el día anterior justo antes de separarse. Estas instrucciones secretas pre-programadas y bien escondidas en las partículas eran exactamente las famosas 'variables ocultas' de Einstein que hacían parecer, erróneamente, que existía una conexión mágica, fantasmal e instantánea entre las diminutas partículas cuánticas distantes.",
      "En el épico, asombroso y extenso conflicto galáctico de Star Wars, esta profunda y amarga división filosófica entre los mejores físicos de la Tierra se asemeja y refleja bastante bien a las diferentes percepciones radicales que tienen los distintos personajes sobre la misteriosa naturaleza y el origen de la Fuerza. Así como el rudo y cínico contrabandista Han Solo dudaba enormemente del poder invisible, místico y mágico de la Fuerza, llamándola simplemente 'simples trucos baratos y tonterías sin sentido', el gran Einstein dudaba fuertemente de la extraña, ilógica y aleatoria naturaleza de la mecánica cuántica. El famoso físico del cabello alborotado exigía fervientemente que el majestuoso universo funcionara como una perfecta y hermosa máquina predecible de relojería suiza, en lugar de parecerse a un caótico juego de azar cósmico lleno de incertidumbre fantasmagórica y trucos incomprensibles de magia.",
      "Durante varias largas y acaloradas décadas enteras, la famosa paradoja EPR se mantuvo estancada como un gigantesco, fascinante y molesto debate puramente filosófico de salón entre los físicos teóricos más destacados e inteligentes del planeta entero. Parecía completamente imposible y fuera del alcance humano probar de manera concluyente en un laboratorio físico real si Einstein tenía la razón absoluta con sus variables ocultas pre-programadas y sensatas, o si la alocada teoría cuántica realmente permitía y celebraba esta espeluznante conexión instantánea que desafiaba a la sacrosanta relatividad. Sin embargo, este histórico e inolvidable desacuerdo intelectual del año 1935 sentó las bases investigativas cruciales para cuestionar la naturaleza fundamental de la realidad misma que nos rodea y preparó perfectamente el gran escenario para los increíbles, precisos y asombrosos experimentos modernos de la ciencia."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La famosa frase en inglés "spooky action at a distance" (espeluznante acción a distancia), que Albert Einstein usó de manera muy despectiva, irónica y burlona en una famosa carta personal escrita en 1947 dirigida a su amigo el físico Max Born, se ha convertido con el paso de los años en uno de los términos científicos informales más célebres, divertidos y citados en toda la historia de la física moderna para describir maravillosamente el misterioso entrelazamiento cuántico que tanto le molestaba al genio.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El influyente artículo científico original publicado por Einstein, Podolsky y Rosen (EPR) en el mes de mayo del año 1935 en la prestigiosa revista "Physical Review" es actualmente uno de los documentos de física teórica más descargados, analizados y extensamente citados de todos los tiempos. Irónicamente, aunque su objetivo principal y declarado era demostrar con lógica que la naciente teoría cuántica estaba defectuosa o incompleta, terminó inspirando a generaciones enteras para descubrir asombrosas propiedades reales del universo.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el comienzo de la legendaria película original del Episodio IV: Una Nueva Esperanza, el Almirante imperial Motti se burla abierta y cruelmente de Darth Vader, refiriéndose a la Fuerza como una "antigua y triste religión" que carece totalmente de sentido lógico y poder real frente a las maravillas mecánicas de la Estrella de la Muerte. Vader, sin decir una palabra y usando la Fuerza para asfixiarlo invisiblemente desde la distancia, le demuestra de forma escalofriante que, al igual que los sorprendentes efectos cuánticos de la física, esta conexión invisible y misteriosa es innegablemente poderosa y tremendamente real, le guste o no a la lógica militar.' 
      }
    ],
    fact: 'El influyente artículo científico EPR de 1935 argumentaba brillantemente que la "descripción cuántica de la realidad física" no podía considerarse matemáticamente completa a menos que existieran parámetros adicionales secretos. Esto introdujo al mundo la fascinante idea de las "variables ocultas locales", proponiendo un determinismo clásico estricto para salvar a la física del perturbador y fantasmal determinismo cuántico.'
  },
  {
    id: 'superposicion-cuantica',
    title: 'Superposición: Ser Todo a la Vez',
    color: '#7C4DFF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_superposicion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_superposicion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_superposicion-cuantica.png',
    bannerCaption: "En mecánica cuántica, una partícula puede existir en múltiples estados simultáneamente hasta que es observada.",
    content: [
      "¿Has jugado alguna vez al divertido juego del escondite y simplemente no tenías ni la menor idea de si tu mejor amigo estaba escondido detrás de la puerta principal o si estaba oculto debajo de la cama de la habitación? En el loco, diminuto y contraintuitivo mundo de la física cuántica, hasta que no abres los ojos y miras activamente, tu amigo cuántico microscópico estaría de hecho literalmente en ambos lugares escondidos al mismo y preciso tiempo. A este increíble e incomprensible fenómeno natural se le conoce científicamente como 'Superposición Cuántica'. Significa esencialmente que una partícula microscópica fundamental, como puede ser un veloz electrón o un brillante fotón de luz, puede existir cómoda y simultáneamente en múltiples estados físicos totalmente contradictorios, girando hacia arriba y hacia abajo a la vez, justo hasta el preciso instante definitivo en que un científico decide encender su equipo para medirla.",
      "El mundialmente famoso y sumamente peculiar experimento mental del 'Gato de Schrödinger', que fue propuesto audazmente por el genio austríaco Erwin Schrödinger en el año 1935, explica de manera absolutamente perfecta este concepto matemático tan alucinante y difícil de creer. Imagina por un momento a un gato vivo encerrado dentro de una caja cerrada y gruesa de acero impenetrable junto con un impredecible mecanismo cuántico radiactivo aleatorio que podría, o tal vez no, liberar un gas tóxico. Según las extrañas, inflexibles y frías reglas matemáticas de la cuántica, antes de atreverte a abrir la pesada tapa para mirar dentro de la caja misteriosa, el pobre gato se encuentra literalmente en un estado combinado, fantasmal y borroso de estar completamente sano y vivo, y al mismo tiempo tristemente muerto. Solo el acto consciente e irreversible de la observación científica obliga a la naturaleza y a la realidad a decidirse de golpe por un solo resultado fijo y permanente.",
      "Para aplicar y disfrutar de una genial analogía al inconfundible estilo del gran profesor y divulgador Richard Feynman, piensa en el estado de superposición cuántica como si fuera una brillante moneda de plata que está girando muy rápidamente en el aire sobre una mesa de madera. Mientras la brillante moneda sigue girando rápidamente y desdibujándose caóticamente frente a tus propios ojos curiosos, la moneda realmente no es ni 'cara' ni tampoco es 'cruz', sino que representa dinámicamente una combinación borrosa, vibrante y simultánea de ambas posibilidades existiendo al mismo tiempo. Solo cuando la golpeas fuertemente con tu mano plana contra la mesa y la detienes por completo (lo que equivale científicamente y con precisión matemática a realizar una 'medición' en el laboratorio), la moneda colapsa y se destruye instantáneamente en un estado definitivo, único y estático para que absolutamente todos los presentes lo puedan observar claramente.",
      "En la inmensamente épica y profunda saga narrativa de Star Wars, los atentos espectadores podemos ver reflejada una versión sumamente filosófica, humana e intrigante de esta superposición cuántica cuando consideramos y analizamos el destino siempre incierto y dolorosamente cambiante del joven y excepcionalmente poderoso Anakin Skywalker. Durante muchos años llenos de terrible conflicto interno y dudas existenciales, Anakin existía en una dolorosa y palpable superposición emocional y moral, luchando tenazmente entre seguir la luz brillante y pacífica de los sabios Caballeros Jedi y la oscura, egoísta y destructiva tentación de los crueles y poderosos lores Sith. El joven guerrero mantenía magistralmente ambas potentes posibilidades y destinos vivos y latentes simultáneamente en lo más profundo de su interior, justo hasta que los dramáticos y trágicos eventos lo obligaron violentamente a tomar una decisión definitiva y fatal que colapsó su destino para siempre, convirtiéndolo irreversiblemente en el temido Darth Vader.",
      "Los modernos y brillantes físicos cuánticos de la actualidad utilizan todos los días unas enormes e increíblemente complejas herramientas matemáticas conocidas formalmente como 'funciones de onda' para intentar calcular y predecir numéricamente estas múltiples y asombrosas posibilidades simultáneas dentro del entorno controlado del laboratorio. Estas complicadísimas ecuaciones de nivel universitario no nos dicen con una certeza absoluta el lugar exacto en dónde estará una escurridiza partícula microscópica, sino que nos ofrecen generosamente un asombroso, fascinante y hermoso mapa tridimensional de densas nubes de probabilidades estadísticas y matemáticas puras. Comprender a la perfección y llegar a dominar la extraña superposición es verdaderamente la llave maestra y el paso tecnológico fundamental que permite hoy en día el increíble desarrollo actual de las tecnologías futuristas asombrosas, tales como los revolucionarios y potentísimos computadores cuánticos del mañana que cambiarán el mundo entero."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La maravillosamente poética y extraña idea filosófica de que el mero y simple acto de "mirar" o de "medir" algo con un instrumento de laboratorio tiene el gigantesco poder de cambiar activa y físicamente la misma realidad fundamental que nos rodea, se conoce en las aulas de ciencia como el "Efecto del Observador". Es uno de los misterios filosóficos y científicos más profundos, inquietantes y constantemente debatidos de absolutamente toda la historia y la evolución de la mecánica cuántica moderna.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El asombroso e histórico experimento científico conocido mundialmente como el "Experimento de la Doble Rendija" demuestra de manera absolutamente hermosa e innegable la superposición en acción frente a nuestros propios ojos. Cuando los físicos disparan partículas individuales (como electrones) hacia una pared oscura con dos pequeñas rendijas, cada partícula diminuta sorprendentemente pasa por ambas rendijas al mismo y exacto tiempo como si fuera una gran ola de agua, creando así un inconfundible y maravilloso patrón de interferencia ondulatoria que solo es posible si existe la superposición cuántica real.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el dramático e inolvidable clímax final del Episodio VI: El Retorno del Jedi, el temible y oscuro Darth Vader se encuentra de pie, atrapado paralizantemente en un dramático estado de superposición emocional y moral de vida o muerte extrema. Mientras observa pasivamente cómo el malvado Emperador Palpatine tortura dolorosamente a su propio hijo con rayos mortales, Vader es simultáneamente y de manera dolorosa un leal monstruo sirviente de los oscuros Sith y también un amoroso y desesperado padre arrepentido. Esta doble y conflictiva existencia psicológica simultánea solo "colapsa" en una única realidad final, redentora y heroica en el instante crucial en que finalmente decide actuar y lanzar valientemente al terrible Emperador al abismo infinito.' 
      }
    ],
    fact: 'La superposición cuántica es el profundo principio fundamental de la mecánica cuántica de ondas que establece categóricamente que cualquier sistema físico y subatómico existe simultáneamente en todos sus estados teóricos y matemáticamente posibles hasta que es medido activamente o interactúa con el mundo físico macroscópico exterior, causando el colapso inmediato de la función de onda matemática.'
  },
  {
    id: 'teleportacion-cuantica',
    title: 'Teletransportación Cuántica',
    color: '#18FFFF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_teleportacion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_teleportacion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_teleportacion-cuantica.png',
    bannerCaption: "La teleportación cuántica transfiere estados cuánticos entre partículas distantes usando entrelazamiento.",
    content: [
      "Cuando escuchas atónito la espectacular palabra 'teletransportación', es casi seguro que inmediatamente te imaginas a los famosos astronautas de las increíbles películas de ciencia ficción desintegrándose mágicamente y desapareciendo en destellos de luces brillantes para luego volver a aparecer físicamente de la nada en la árida superficie de un planeta totalmente desconocido y alienígena. Aunque lamento decirte que en el mundo real de la ciencia todavía no podemos teletransportar a seres humanos completos de un lado a otro (¡y probablemente pasará muchísimo tiempo antes de que podamos intentar algo así de peligroso!), los físicos modernos, muy astutos e inteligentes, ya han logrado dominar y realizar exitosamente en sus sofisticados laboratorios algo asombroso y maravillosamente real conocido científicamente en todo el mundo como la 'Teletransportación Cuántica'.",
      "Es de suma e imperativa importancia que comprendas clara y perfectamente bien que la teletransportación cuántica de los laboratorios modernos no transporta materia sólida ni objetos físicos pesados de un lugar a otro a través del espacio como si fuera un camión mágico de carga invisible. Lo que realmente se está teletransportando de un punto 'A' a un punto 'B' de manera instantánea es la 'información cuántica' pura y dura, que es esencialmente el manual de instrucciones exacto y detallado sobre cómo está estructurada internamente una partícula diminuta en particular. Usando las asombrosas propiedades mágicas del entrelazamiento cuántico que aprendimos antes, los científicos logran tomar todo el estado y la identidad íntima de un diminuto fotón ubicado en la ciudad de origen y lo transfieren mágicamente, de manera instantánea y perfecta, a otro fotón lejano que está esperando pacientemente en la lejana ciudad de destino.",
      "Para entender esto mejor, usemos una nueva e ingeniosa analogía que a Richard Feynman seguramente le habría encantado compartir en sus clases. Imagina que has logrado construir un castillo de bloques de juguete increíblemente complicado, único y hermoso en tu casa. En lugar de empacar con cuidado cada uno de los bloques sólidos de plástico en una gran caja para enviárselos por el lento correo postal a tu primo que vive en otra ciudad lejana, usas una fantástica máquina de escaneo mágico. Esta máquina misteriosa escanea y lee al instante el plano arquitectónico perfecto de tu castillo, destruyendo el original en el proceso inevitablemente, y le envía por radio esa información exacta y detallada a tu primo. Automáticamente, los bloques plásticos genéricos y sueltos que tu primo ya tiene tirados en su propia casa se ensamblan de inmediato y de forma mágica para formar una copia idéntica e indistinguible de tu hermoso y original castillo.",
      "Dentro de la mística, extensa y maravillosa narrativa de la Orden Jedi, vemos una sorprendente habilidad esotérica llamada 'Proyección de la Fuerza', que es una de las técnicas más avanzadas, agotadoras y peligrosas conocidas en toda la galaxia entera. Un poderoso Maestro Jedi con suficiente concentración y energía vital es capaz de enviar una proyección mental interactiva e increíblemente realista de sí mismo a través del vasto cosmos estelar, apareciendo visualmente en lugares remotos y peligrosos para ayudar a sus amigos o engañar a sus enemigos sin necesidad de mover físicamente ni un solo milímetro su propio cuerpo carnal. Al igual que la verdadera y asombrosa teletransportación cuántica moderna de nuestros laboratorios, la majestuosa Fuerza está transmitiendo de manera impecable e instantánea la 'información' vital y la presencia visual de la persona de manera casi instantánea a través del inconmensurable vacío estelar y cósmico.",
      "Uno de los misterios más geniales y absolutos de este proceso cuántico es un concepto matemático sumamente estricto llamado 'Teorema de No-Clonación'. Este severo teorema de la física afirma con pruebas rigurosas que es físicamente y matemáticamente imposible hacer una copia exacta e idéntica de un estado cuántico desconocido y mantener vivo al original al mismo tiempo. Es por esta razón precisa y estricta que cuando tú teletransportas victoriosamente la frágil información de una minúscula partícula a otra partícula lejana en el otro lado del mundo, la importante partícula original ubicada en tu laboratorio pierde irreversiblemente toda su memoria e identidad única en ese mismo y dramático instante temporal. Este proceso seguro e infalible es la increíble base tecnológica y vanguardista sobre la que se construirá sin lugar a dudas el futuro e inviolable internet cuántico, prometiendo niveles de seguridad de datos verdaderamente asombrosos."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'En un logro científico verdaderamente histórico, monumental y digno de ser recordado, científicos chinos de renombre mundial utilizaron con gran éxito el avanzado satélite satélite Micius en el año 2017 para teletransportar fotones cuánticos desde una pequeña base en la Tierra hacia el espacio exterior y la órbita baja, logrando alcanzar una increíble y récord distancia de más de 1.400 kilómetros de separación, demostrando al mundo que la extraña magia cuántica no tiene límites terrestres.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El revolucionario y famoso protocolo de teletransportación cuántica que usan los laboratorios fue teórica y elegantemente inventado por primera vez en el año 1993 por un brillante equipo de expertos investigadores liderado por el famoso científico Charles Bennett de la compañía IBM. Demostraron asombrosamente que enviando tan solo dos pequeños bits clásicos y convencionales de información normal, se puede reconstruir mágicamente y por completo todo un complejo estado cuántico a cientos de miles de kilómetros de distancia.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la película de la saga, el Episodio VIII: Los Últimos Jedi, el legendario y agotado héroe Luke Skywalker realiza el acto supremo y espectacular de utilizar la ancestral Proyección de la Fuerza para proyectar una apariencia física completamente realista y táctil de sí mismo en el lejano e inhóspito planeta Crait. Utiliza todo su poder místico acumulado para distraer valientemente a las letales fuerzas de la temida Primera Orden y salvar a la Resistencia. Al igual que en la verdadera teletransportación cuántica de fotones, la enorme transferencia de información y la compleja proyección exigen una cantidad titánica de energía pura, lo que trágicamente, y cumpliendo con el Teorema de No-Clonación, resulta irremediablemente en la desaparición pacífica del cuerpo original de Luke hacia la Fuerza.' 
      }
    ],
    fact: 'La teletransportación cuántica es un riguroso protocolo tecnológico donde el estado cuántico exacto de un átomo o fotón individual se puede transferir impecablemente de una ubicación a otra ubicación lejana, utilizando la asistencia mágica de la correlación cuántica (entrelazamiento) compartida previamente y la transmisión de información clásica. El Teorema de No-Clonación prohíbe la copia de estados desconocidos.'
  },
  {
    id: 'computacion-cuantica',
    title: 'Computadoras del Futuro',
    color: '#E040FB',
    btnImage: '/assets/starwars/infographic_fuerza/btn_computacion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_computacion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_computacion-cuantica.png',
    bannerCaption: "Los computadores cuánticos utilizan qubits que procesan información exponencialmente más rápido que los bits clásicos.",
    content: [
      "Las increíbles computadoras y los rápidos teléfonos celulares inteligentes que usamos con tanta frecuencia todos y cada uno de los días son, en el fondo y en su corazón electrónico, unas calculadoras de alta velocidad verdaderamente fantásticas y maravillosas. Hablan y se comunican entre sí en un idioma artificial y muy sencillo que está hecho completamente de pequeñísimos ceros y unos, conocidos en el ámbito tecnológico como 'bits' informáticos. En este rígido sistema de comunicación binaria y clásica, cada diminuto interruptor electrónico dentro de tu aparato solo puede estar apagado de manera total (un aburrido 0) o encendido brillando fuertemente (un rápido 1), y absolutamente nunca ambas opciones al mismo tiempo de manera simultánea en ninguna situación dada o concebible.",
      "Sin embargo, existe una revolución tecnológica en marcha. Las maravillosas y misteriosas computadoras cuánticas, en lugar de usar aburridos y lentos bits normales, utilizan unidades de información hiper-avanzadas, novedosas y casi mágicas conocidas como 'qubits' (bits cuánticos de información). Gracias a la increíble y asombrosa regla de la superposición cuántica que ya exploramos y aprendimos juntos anteriormente en este viaje, un pequeñísimo y poderoso qubit puede ser al mismo tiempo un valioso 0, un rápido 1, y además, sorprendentemente, ¡todas las posibles, infinitas y hermosas mezclas, combinaciones y gradaciones de números imaginables entre el cero y el uno de manera simultánea y paralela, mientras los científicos aún no han abierto la caja para poder observarlo fijamente y arruinar su superposición!",
      "Haciendo uso de una excelente y esclarecedora analogía al estilo y sabor del inigualable Feynman, imagina que te encuentras físicamente atrapado en medio de un gigantesco y confuso laberinto de setos en el jardín y necesitas imperiosamente encontrar con desesperación el camino correcto para poder salir. Una computadora normal y aburrida enviaría a un pequeño ratoncito explorador, uno por uno y de forma muy secuencial, a intentar recorrer cada posible camino alternativo y cada callejón sin salida hasta finalmente tropezar por puro cansancio y suerte con la preciada salida. Una computadora cuántica, por el asombroso y magistral contrario, es como derramar velozmente un gran balde lleno de agua en el inicio del laberinto gigante; el agua líquida inundará mágica y simultáneamente absolutamente todos los posibles caminos y corredores al mismo tiempo, descubriendo de inmediato y sin dudar la salida correcta en una pequeñísima y envidiable fracción de segundo.",
      "En el extenso, deslumbrante y tecnológico universo galáctico de Star Wars, hay inmensos droides astromecánicos asombrosamente inteligentes y avanzadas y potentes supercomputadoras de navegación interplanetaria que son las encargadas de trazar y planificar en pocos segundos los peligrosísimos saltos de velocidad a través de la misteriosa dimensión del hiperespacio cósmico. Calcular y predecir de forma muy segura y sin accidentes fatales las ubicaciones exactas y cambiantes de las estrellas gigantes, las masas errantes de los planetas y los peligrosos campos de asteroides letales que viajan a la asombrosa y vertiginosa velocidad de la luz requiere indiscutiblemente un nivel enorme, asombroso y masivo de enorme poder de procesamiento matemático y computacional. Sería totalmente imposible sobrevivir al peligroso hiperespacio de las películas utilizando las viejas y normales computadoras lentas que poseemos actualmente en nuestros hogares; definitivamente y sin lugar a duda necesitarían, en su núcleo mismo, los alucinantes y potentes cerebros cuánticos y mágicos del gran futuro para poder triunfar.",
      "Esta gran tecnología futurista que suena increíblemente a ciencia ficción lejana es, de hecho real y maravillosamente cierta, ya una asombrosa y maravillosa realidad tangible. Gigantescas y millonarias compañías tecnológicas a nivel mundial, como las conocidas Google y la histórica IBM, ya han construido, probado y exhibido con enorme éxito gigantescas, ruidosas y hermosas computadoras cuánticas verdaderas en sus helados laboratorios. Estos hermosos y brillantes aparatos mecánicos parecen maravillosas y exóticas lámparas doradas colgantes de araña, y su asombroso cerebro cuántico y su núcleo informático deben mantenerse refrigerados y muy congelados a temperaturas tan pero tan extremadamente frías y gélidas que llegan a ser mucho más heladas, oscuras y paralizantes que el espacio profundo y vacío que se encuentra entre las mismísimas estrellas lejanas, logrando así procesar datos y cálculos matemáticos complejos que a una computadora de hoy en día le tomarían, literalmente, muchos y largos miles de años enteros en resolver satisfactoriamente."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'En el asombroso, recordado e histórico año de 2019, la gigantesca y poderosa compañía tecnológica Google anunció con muchísimo orgullo al mundo entero de la ciencia que su gran y experimental computadora cuántica, apodada amigablemente con el nombre de "Sycamore", había logrado alcanzar y demostrar de manera contundente la famosa e increíble "supremacía cuántica". Había conseguido realizar y resolver magistralmente y de forma perfecta un inmenso y complicadísimo cálculo estadístico de altísimo nivel en tan solo un pequeño periodo de escasos 200 segundos, una tarea verdaderamente colosal que a la supercomputadora clásica más rápida del mundo de ese entonces le habría tomado de forma dolorosa unos increíbles e inalcanzables 10.000 años de intenso procesamiento sin fin.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La principal, más peligrosa y mayor dificultad tecnológica en el campo actual de la construcción de las novedosas y rápidas computadoras cuánticas de la actualidad se llama "decoherencia cuántica". Esta temible y destructiva palabra significa que los muy sensibles e inestables qubits de información pueden, de forma accidental y repentina, perder de inmediato y para siempre su estado de superposición cuántica y toda su información valiosa y acumulada si son perturbados lo más mínimo y sutil por cualquier minúscula variación de calor externo, vibración en el piso del laboratorio o incluso leves campos magnéticos no deseados.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la muy querida y recordada película original del genial Episodio IV: Una Nueva Esperanza, el inmensamente popular, fiel y simpático droide astromecánico color azul y plata llamado R2-D2 logra hackear con enorme rapidez y enorme éxito todo el enorme, peligroso y súper protegido mainframe cibernético y computacional de control masivo de la gigantesca y letal estación espacial y militar, la imponente y oscura Estrella de la Muerte. Para que el tamaño minúsculo y pequeño cerebro robótico y metálico de R2 pueda descifrar a gran velocidad los millones de códigos militares ultrasecretos del Imperio en milisegundos y controlar el fuego enemigo, él operativamente tendría que estar usando de forma indudable potentes procesadores y cerebros de tecnología de nivel cuántico avanzado en su brillante y redonda cabeza.' 
      }
    ],
    fact: 'La emergente computación cuántica utiliza los fenómenos maravillosamente misteriosos de la mecánica cuántica tales como la increíble superposición y el misterioso entrelazamiento para poder realizar, analizar y ejecutar enormes y gigantescas operaciones sobre conjuntos masivos de datos e información estructurada. Mientras que los lentos y tradicionales bits clásicos representan y muestran un valor final de 0 o 1, los poderosos e inestables qubits mantienen un asombroso estado coherente de ambos valores a la vez.'
  },
  {
    id: 'no-localidad',
    title: 'Conexión Instantánea: No-Localidad',
    color: '#64FFDA',
    btnImage: '/assets/starwars/infographic_fuerza/btn_no-localidad.png',
    image: '/assets/starwars/infographic_fuerza/hero_no-localidad.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_no-localidad.png',
    bannerCaption: "La no-localidad cuántica permite que partículas entrelazadas se influyan mutuamente a cualquier distancia, demostrado por John Bell en 1964.",
    content: [
      "¿Te imaginas profundamente e intensamente lo que sucedería si todas, pero todas las rígidas y estrictas reglas normales y clásicas sobre la enorme e inmensurable distancia espacial de repente, de manera inexplicable, mágica e instantánea, ya no importaran absolutamente para nada? En la extraña e incomprensible frontera filosófica de la verdadera física cuántica asombrosa y fundamental que estudian hoy en día las mentes maestras, la 'no-localidad' es sin duda el gigantesco, el enorme y el principio matemático y científico absolutamente comprobado que nos dice que nuestro gigantesco e inmenso cosmos maravillosamente no está verdaderamente atado ni esclavizado a un tiempo lento, secuencial o a enormes espacios aburridos y separadores. Simplemente y maravillosamente esto significa en palabras simples que ciertos eventos minúsculos y lejanos pueden instantáneamente y misteriosamente estar fuertemente vinculados y entrelazados entre sí sin que absolutamente ninguna señal mensajera de luz o de energía deba ni siquiera molestarse en atravesar de manera dolorosa y lenta el inmenso vacío infinito para lograr conectarlos de nuevo.",
      "Para lograr verdaderamente terminar para siempre con el histórico y larguísimo debate amargo y molesto sobre las extrañas 'variables ocultas pre-programadas' que el gran genio Albert Einstein había defendido e intentado justificar con tanto esfuerzo, fervor y orgullo obstinado durante su vejez en la famosa Paradoja EPR, en el brillante y caluroso año de 1964 un sumamente astuto, inteligente y perspicaz físico irlandés y revolucionario llamado John Stewart Bell apareció y creó en su pizarra una asombrosa y perfecta trampa lógica y matemática infalible. Bell logró asombrar al mundo cuando desarrolló unas hermosas, estrictas y elegantes fórmulas y ecuaciones matemáticas innegables que ahora los científicos reverencian y llaman felizmente el 'Teorema de Bell'. Estas duras e inquebrantables reglas matemáticas y analíticas permitirían por fin que los inteligentes científicos de todos los laboratorios terrestres pudieran verificar, probar empíricamente, medir y saber con un grado de certeza indiscutible, real y del ciento por ciento de precisión irrefutable si realmente nuestro misterioso universo es verdaderamente cuántico e impredecible o secretamente determinista y clásico como anhelaba Einstein.",
      "En una maravillosa, cálida y encantadora analogía clásica al perfecto estilo amigable e inolvidable del célebre Richard Feynman, trata por un instante de jugar e imaginarte audazmente que dos gigantescas y hermosas máquinas mágicas dispensadoras de grandes bolas chicles y dulces están maravillosamente conectadas entre sí. Según la vieja, conservadora y cómoda lógica clásica de la mecánica de Newton (variables ocultas de Einstein), las bonitas máquinas tragamonedas simplemente fueron empaquetadas desde la enorme fábrica con el mismo e idéntico rollo rígido e inflexible de chicles de colores brillantes ordenados en secuencia; eso no tiene magia. Pero la salvaje, extraña y alucinante mecánica cuántica sugiere de manera probada y firme algo mil veces más loco, divertido y aterrador: las chicles coloridas y redondas literalmente no poseen absolutamente ningún color definido cuando salen de la fábrica de dulces, y milagrosamente ambas maravillosas máquinas deciden mágica, instantánea e impredeciblemente producir al mismo y exacto tiempo una deliciosa bola roja en el asombroso microsegundo exacto en que alguien muy curioso y goloso jala de forma brusca ambas palancas a la vez.",
      "En la asombrosa y filosófica mitología profundamente mística de Star Wars, el concepto asombroso de la no-localidad científica moderna y del espacio engañoso se alinea hermosamente a la perfección con la grandiosa y espiritual visión que tiene de la poderosa Fuerza. Cuando un experimentado, sabio y arrugado Maestro Yoda enseña paciente y profundamente a Luke Skywalker a levitar su pesada y pantanosa nave X-Wing desde las turbias y oscuras aguas, este famoso gran maestro le explica con contundencia y convicción absoluta que la inmensa distancia intergaláctica y el enorme tamaño material de los pesados objetos materiales no son ni representan verdaderamente ningún límite infranqueable. 'El tamaño no importa, míranos a mí y la Fuerza, grandes aliados somos', diría. La mística Fuerza inunda por completo el universo interconectado simultáneamente de lado a lado y de esquina a esquina, operando magníficamente y en su totalidad fuera de todos los límites geográficos, burdos, comunes e ilusorios que perciben nuestros pobres y limitados ojos mortales.",
      "Casi dos décadas después de Bell, en un extraordinario año increíble y memorable de 1982, un brillante físico francés galardonado llamado Alain Aspect, ejecutando con una precisión milimétrica su inmenso trabajo, logró por fin de manera exitosa construir y ejecutar impecablemente el histórico experimento decisivo y supremo para poner a prueba de fuego las complejas desigualdades matemáticas impuestas por Bell en el laboratorio. Con unos gigantescos y rapidísimos detectores de fotones giratorios asombrosamente complejos de su época, Aspect confirmó de manera absoluta que Einstein, tristemente y en efecto, estaba total y completamente equivocado en sus creencias más firmes. La 'espeluznante acción e interconexión a distancia' que tanto le asustaba al genio del pelo blanco resultó ser cien por ciento fantásticamente cierta y una propiedad real fundamental de nuestro extraño universo. Este asombroso descubrimiento científico, increíble y transformador de paradigmas enteros e históricos valió tanto la pena y la espera que finalmente fue enormemente reconocido y grandiosamente premiado por el mundo entregando sin duda alguna el merecidísimo y ansiado Premio Nobel de Física del inolvidable año 2022 a sus geniales descubridores."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La maravillosamente bella y extraña e indudable idea subyacente central y firme de que las partes individuales constituyentes microscópicas de un enorme, vasto e inmenso sistema no pueden de manera real y efectiva considerarse aisladamente separadas ni tratadas matemáticamente en su pura e ilusoria individualidad o soledad se conoce académicamente en todo el planeta Tierra y el globo como holismo cuántico universal. El misterioso entrelazamiento es la confirmación y la muestra real más fuerte y potente de ese maravilloso y misterioso comportamiento holístico.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El gran e importantísimo Premio Nobel de Física entregado pomposamente en la histórica y mágica ceremonia del gran año del 2022 fue merecida y grandiosamente compartido de manera hermosa por los tres titanes científicos: el gran científico francés Alain Aspect, el brillante genio e incansable John Clauser y el brillante genio matemático Anton Zeilinger, todos ellos inmensamente aplaudidos exactamente por sus asombrosos y revolucionarios experimentos milimétricos, precisos y magistrales con fotones cuánticos intrincadamente enlazados y, al mismo tiempo e irónicamente, por establecer finalmente de manera indudable la flagrante y comprobable enorme violación de todas las matemáticas desigualdades descritas por el Teorema de Bell.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el amargo e intenso clímax dramático de la legendaria, trágica e inolvidable película clásica del gran Episodio V: El Imperio Contraataca, la joven, brillante y determinada heroína Princesa Leia, escapando desesperadamente en la grandiosa nave espacial de contrabando llamada el Halcón Milenario tras una dura huida y pelea, percibe y "escucha" de pronto, instantánea, sorprendentemente y misteriosamente un grito de auxilio lejano y mudo mental desde su profundo interior, originado por supuesto por parte de su desconocido hermano gemelo y malherido Luke, quien cuelga peligrosamente a miles de kilómetros muy por debajo de la Ciudad de las Nubes flotante. Ese preciso y perfecto maravilloso momento de inquebrantable conexión empática a grandes distancias y sin necesidad de ningún transmisor representa perfectamente la misma esencia pura, innegable y perfecta de la "no-localidad" física de la que siempre se habla.' 
      }
    ],
    fact: 'El revolucionario y hermoso Teorema de Bell desarrollado asombrosamente en el año de 1964 por el inigualable e ingenioso John Stewart Bell establece mediante matemáticas precisas que ninguna teoría física de variables secretas o de ocultas explicaciones de corte puramente mecanicista, lineal, estricta y puramente clásicas de las variables locales propuestas puede y debe reproducir nunca en un laboratorio exitosamente la totalidad de las salvajes y asombrosas predicciones de correlación que asustan a la gloriosa mecánica cuántica de ondas.'
  },
  {
    id: 'fuerza-universo',
    title: 'La Fuerza del Universo Real',
    color: '#AA00FF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_fuerza-universo.png',
    image: '/assets/starwars/infographic_fuerza/hero_fuerza-universo.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_fuerza-universo.png',
    bannerCaption: "Las fuerzas fundamentales del universo — gravedad, electromagnetismo, nuclear fuerte y débil — gobiernan toda la materia.",
    content: [
      "Si alguna vez has llegado a observar fascinado y asombrado el inmenso cielo estrellado oscuro y te has atrevido a preguntar asombrado en medio de la profunda inmensidad de la noche y del vacío de qué material oscuro e invisible y misterioso está realmente construido y rellenado absolutamente todo el universo estelar que nos acompaña, debes comprender y saber la respuesta de inmediato: tú, yo, las distantes nebulosas y todo en absoluto, no estamos habitando ni parados dentro de un aburrido espacio silencioso vacío y hueco, inerte y seco en el cosmos estelar y galáctico. En el mundo de la moderna e indudable física teórica asombrosa y fundamental, se plantea y afirma matemáticamente que lo que todos los humanos mortales llamamos a simple y equivocada vista e imperfectamente el 'vacío silencioso' está rebosante de actividad intensa y de vida; está absolutamente hirviendo de forma caótica, rápida e invisible con misteriosos, gigantescos e inmensurables 'Campos Cuánticos' ondulantes de pura energía infinita y primordial, llenos y plenos en actividad ininterrumpida y fantasmagórica y frenética siempre vibrando sin cesar por un solo instante bajo nuestros pies o a miles de millones de leguas muy por encima de todos nosotros sin ninguna forma normal.",
      "Estos hermosos, invisibles y omnipresentes campos matemáticos y energéticos se asemejan impresionantemente a unos enormes, interminables y profundísimos océanos líquidos e interconectados de increíble fuerza primordial vibrante invisible e inmensa de purísima energía efervescente, que se agitan intensamente cada instante microsegundo. Las partículas de luz subatómicas diminutas e imperceptibles por nosotros y las piezas mismas que conforman nuestros hermosos mundos no son pequeñas piedritas redondas ni trozos de materia duras inquebrantables e indestructibles en lo absoluto. Al igual que afirmaba la teoría ondulatoria, las partículas son simples, asombrosas y minúsculas ondulaciones temporales o salpicaduras diminutas de grandes y hermosas olas enormes de la marea que rompen y explotan fugaz y efímeramente y se originan sobre la inmensa, calmada y tranquila superficie profunda de estos fantásticos campos energéticos cósmicos insondables por la vista humana y llenos y repletos de misterios.",
      "En un extraordinario intento por usar una fantástica, amena e iluminadora analogía educativa brillante y típica en honor del carismático, alegre y gran profesor Richard Feynman de antaño, podemos e invitamos a imaginarte libremente cada uno de estos místicos campos cuánticos invisibles de forma idéntica, sencilla y exacta como si se tratara de una infinita, tensa y maravillosa cama elástica saltarina o el parche estirado, vibrante y tenso de un inmenso y grandioso tambor percutor extendiéndose hasta la infinidad de los bordes del universo lejano entero que podemos conocer y ver e iluminar con potentes y geniales telescopios espaciales sin cesar o detener la marcha exploradora. Cuando algún suceso golpea fuertemente, excita energéticamente y toca vigorosamente este enorme tambor espacial que todos habitamos en un pequeño puntito infinitesimal minúsculo, de pronto nace gloriosamente una diminuta partícula material (ya sea de luz o masa); esto explica de manera magistral, sorprendente e inteligente que todo en absoluto es sencillamente materia, pura y deslumbrante energía musical que tiembla e interactúa armónica e incesantemente con su entorno lejano.",
      "Dentro de la gloriosa narrativa, hermosa filosofía y las sabias y míticas películas históricas e intemporales de las sagas y mundos del vasto, asombroso y enorme universo de George Lucas y su Star Wars adorado inmensamente por generaciones enteras, el maestro Jedi Yoda describía a su poderoso e inquebrantable alumno de manera inolvidable y magistralmente elocuente con el concepto supremo y majestuoso de la increíble Fuerza; él pronunciaba de manera solemne lo siguiente: 'La vida entera la crea radiante de lado a lado y nos rodea, su inmensa y vital energía mística galáctica asombrosa hace brillar en esplendor radiante todo en paz o en guerra'. La maravillosa física moderna de los campos verdaderamente sugiere que nosotros todos mismos no somos en absoluto, ni en broma seríamos individuos separados de la matriz original cósmica que nos soporta amorosamente en su lecho, somos luminosos, maravillosos, potentes e increíbles nodos concentrados temporalmente, fuertes y vibrantes hechos en su totalidad por y puramente de las mismas ondulaciones misteriosas de esos místicos campos universales.",
      "Entonces verdaderamente este profundo y grandísimo viaje deslumbrante hacia la maravillosa comprensión de la majestuosa física cuántica nos conduce final y poéticamente a una extraordinaria y maravillosa e inmensa realización espiritual muy parecida e igual en fuerza y profundidad a la sabiduría e iluminación adquirida y pacífica mostrada y enseñada en los polvorientos libros del misticismo ancestral de monjes e incluso los Jedi amados e idolatrados. La naturaleza cuántica, con el inigualable, milagroso entrelazamiento mágico subatómico incomprensible de los minúsculos átomos y partículas fotónicas, y además con todos sus increíbles e invisibles y gigantescos campos estelares de energía rebosante, nos demuestra ineludible y maravillosamente siempre con enorme, poderosa e imbatible evidencia comprobable matemática pura, dura, e incontrovertible que todo el cosmos inmenso y deslumbrante entero está innegablemente y profundamente e increíblemente entrelazado, tejido e interactuando como si el majestuoso infinito de soles de la galaxia inmensa y entera se tratara hermosa, pacífica y verdaderamente como de un solo, unido y gran ser consciente, respirando sin parar."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La maravillosamente bella y extraña idea de la gran "Energía Oscura" misteriosa y asombrosa y potente en la actualidad en toda la grandiosa astronomía gigantesca moderna de avanzada podría sin ninguna duda y en la realidad objetiva e innegable llegar estar fuertemente vinculada, unida o relacionada al cien por ciento y directamente indudablemente a algo increíblemente diminuto y extraño cuánticamente llamado científicamente y medido en los equipos y laboratorios como simplemente la "Energía incomprensible del puro e infinito y grandioso Vacío Cuántico Inmenso" estelar.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En la brillantísima y probadísima exitosa, perfecta y compleja gran y muy alabada "Teoría Cuántica Inmensa y Compleja de Campos" o también conocida comúnmente en abreviatura y en libros como (QFT) de los grandes científicos de todo el orbe entero y los grandes pensadores asombrosos geniales en las academias, las partículas masivas físicas elementales como el grandioso pequeñísimo bosón divino innegable de Higgs no son ni más ni menos que increíbles y medibles potentes excitaciones diminutas energéticas o pequeñas vibraciones oscilatorias y armónicas hermosísimas concentradas.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el mágico y poético grandioso Episodio original amado inmensamente V: El Imperio Contraataca y su fabuloso desarrollo histórico, el queridísimo y verde sabio y gran viejo Maestro Jedi Yoda le dice valiente y sinceramente frente a todos al gran inexperto y torpe héroe humano joven guerrero galáctico Luke Skywalker: "Seres luminosos y brillantes místicos en el fondo absoluto somos en verdad completamente innegablemente nosotros, amigo guerrero, no somos esta tosca, frágil e insignificante asquerosa materia bruta y temporal de nuestra simple, lenta y decrépita carnalidad humana perecedera."' 
      }
    ],
    fact: 'La maravillosa y asombrosa moderna y probadísima Teoría Cuántica de los Campos Físicos amada e innegablemente grandiosa que gobierna el cosmos universal y entero y sus hermosas matemáticas explica y dice asombrosamente de manera brillante que no hay y no existe un vacío inerte real espacial; el inmenso universo oscuro galáctico y hermoso que observamos y pensamos está lleno rebosantemente incesantemente de campos entrelazados y vibraciones hermosas.'
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

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#E040FB',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(224, 64, 251, 0.4)'
      }}>
        CONEXIÓN CON LA FUERZA: ENTRELAZAMIENTO CUÁNTICO
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        FÍSICA CUÁNTICA &middot; SUPERPOSICIÓN &middot; NO-LOCALIDAD
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec4" : undefined}
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
      />
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
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoAtom;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoWaveFunction;
  
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
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
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
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}55` }}>
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

export default function InteractiveInfographic_SwSec4() {
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
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_fuerza/bg_fuerza.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

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
              style={{ height: '100%', background: 'linear-gradient(90deg, #E040FB, #00BCD4)', boxShadow: '0 0 10px #00BCD4' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #7C4DFF, #18FFFF)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(124, 77, 255, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_fuerza/badge_quantum.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              ¡ENTRENAMIENTO CUÁNTICO COMPLETADO!
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
