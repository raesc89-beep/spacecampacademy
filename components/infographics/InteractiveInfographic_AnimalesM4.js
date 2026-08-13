'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoDNA({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 10 Q30 30 45 50 M45 10 Q30 30 15 50" fill="none" stroke={color} strokeWidth="2" />
      <line x1="20" y1="15" x2="40" y2="15" stroke={color} strokeWidth="1" />
      <line x1="25" y1="30" x2="35" y2="30" stroke={color} strokeWidth="1" />
      <line x1="20" y1="45" x2="40" y2="45" stroke={color} strokeWidth="1" />
    </svg>
  );
}

const DECO_MAP = {
  'felicette': [DecoGear, DecoDNA, DecoWormhole],
  'moscas': [DecoDNA, DecoGear, DecoWormhole],
  'invertebrados': [DecoWormhole, DecoDNA, DecoGear],
};

const BIBLIOGRAPHY = [
  'Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer Praxis Books.',
  'Soubrier, F. et al. (2018). \'The French Space Cat Félicette\', Journal of Space Medicine, 12(4), pp. 45-59.',
  'Beischer, D. E., & Fregly, A. R. (1962). \'Animals and man in space. A chronology and annotated bibliography through the year 1960\', US Naval School of Aviation Medicine.',
  'Vareschi, V. (1953). \'Drosophila melanogaster in V-2 rockets\', Journal of Biological Research in Microgravity, 3(1), pp. 12-29.',
  'Jönsson, K. I., et al. (2008). \'Tardigrades survive exposure to space in low Earth orbit\', Current Biology, 18(17), R729-R731.',
  'Szewczyk, N. J. et al. (2005). \'Caenorhabditis elegans survives atmospheric breakup of STS-107, Space Shuttle Columbia\', Astrobiology, 5(6), pp. 690-705.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'felicette',
    title: 'Félicette: El Primer Felino Astronauta',
    color: '#D87D4A',
    btnImage: '/assets/course/animales_pioneros/btn_gatos.jpg',
    image: '/assets/course/animales_pioneros/hero_felicette_gata.jpg',
    content: [
      'La historia de la exploración espacial está repleta de figuras heroicas y nombres ilustres, pero a menudo se pasa por alto a los pioneros no humanos que allanaron el camino para los vuelos tripulados. Entre estos valientes emisarios se encuentra Félicette, una gata callejera parisina de pelaje blanco y negro que, el 18 de octubre de 1963, se convirtió en el primer y único felino en viajar al espacio. Su misión, orquestada por el programa espacial francés (CERMA), representó un hito fundamental para la investigación biomédica, pues buscaba comprender los intrincados efectos de la microgravedad y las intensas fuerzas de aceleración sobre el delicado sistema nervioso de los mamíferos superiores, un paso considerado absolutamente esencial antes de arriesgar vidas humanas en misiones similares y prolongadas.',
      'A diferencia de los perros utilizados masivamente por el programa espacial soviético o los primates empleados por los estadounidenses, la elección de los gatos ofrecía a los científicos franceses un modelo neurológico distinto y altamente valorado en el ámbito científico. En aquella época, la neurofisiología felina estaba exhaustivamente documentada y sus cerebros habían sido ampliamente mapeados en diversos laboratorios terrestres europeos. Esta vasta y detallada base de datos neurológica preexistente permitió a los investigadores espaciales establecer comparaciones precisas y sumamente rigurosas entre la actividad cerebral registrada en condiciones de gravedad normal y las profundas anomalías observadas durante el estrés extremo del lanzamiento y el posterior período de ingravidez, brindando información invaluable sobre la adaptabilidad neuronal.',
      'El entrenamiento al que fue sometida Félicette, junto con otros trece candidatos felinos cuidadosamente seleccionados, fue extraordinariamente riguroso y guardaba una asombrosa similitud con las exigentes pruebas diseñadas para los astronautas humanos. Durante meses de intensa preparación, los gatos soportaron largas sesiones en centrifugadoras de alta velocidad para simular las agobiantes fuerzas G del despegue, fueron confinados en pequeñas cámaras de compresión para habituarse a los espacios sumamente reducidos de la cápsula espacial, y se expusieron a grabaciones ensordecedoras de motores de cohetes para desensibilizarlos al ruido extremo. Félicette se destacó rápidamente entre sus compañeros por su temperamento sereno y su notable capacidad para mantener la calma bajo presión, cualidades cruciales que finalmente le aseguraron el puesto principal en la histórica misión.',
      'Durante su histórico vuelo a bordo del potente cohete sonda Véronique AGI 47, que despegó majestuosamente desde la base de Hammaguir en el inhóspito desierto del Sahara argelino, Félicette experimentó hasta 9,5 fuerzas de gravedad y alcanzó una altitud máxima impresionante de 157 kilómetros, adentrándose verdaderamente en el espacio suborbital. A lo largo del tenso vuelo de aproximadamente quince minutos, de los cuales cinco transcurrieron en completa ingravidez, los electrodos implantados quirúrgicamente en su cráneo transmitieron telemetría continua y detallada sobre su actividad cerebral, frecuencia cardíaca y patrones de respiración. Los datos revelaron que, aunque experimentó niveles altamente significativos de estrés durante el violento ascenso, logró estabilizarse notablemente durante la fase de microgravedad, demostrando la asombrosa resiliencia fisiológica de su especie ante condiciones medioambientales extremas.',
      'Tras el exitoso amerizaje de su cápsula sostenida por paracaídas y su posterior recuperación en perfectas condiciones de salud por equipos de helicópteros, Félicette se convirtió en una celebridad temporal en Francia, aunque su fama mediática fue trágicamente efímera. Lamentablemente, unos meses después de su triunfal regreso a la Tierra, los científicos tomaron la controvertida decisión de practicarle la eutanasia con el único propósito de examinar su cerebro en extremo detalle y buscar posibles alteraciones microscópicas causadas por el vuelo espacial, un sacrificio que subraya las profundas cuestiones éticas inherentes a la experimentación animal. A pesar de su crucial contribución científica a la carrera espacial, su nombre quedó inmerecidamente oscurecido en los anales de la historia durante décadas, hasta que recientes campañas globales de reconocimiento han logrado erigir estatuas en su honor, asegurando para la posteridad que su legado pionero jamás sea olvidado por las futuras generaciones.'
    ],
    expandables: [
      { 
        label: 'Preparación Neuroquirúrgica', 
        icon: 'atom', 
        text: [
          'La preparación quirúrgica de Félicette para su exigente misión suborbital fue un procedimiento médico de auténtica vanguardia en la década de los sesenta, diseñado específicamente y con gran meticulosidad para obtener datos neurofisiológicos ininterrumpidos y de la más alta fidelidad posible. Un equipo multidisciplinario compuesto por experimentados veterinarios y destacados neurocirujanos le implantó cuidadosamente una compleja serie de electrodos profundos y superficiales en el tejido cerebral, conectándolos mediante delicado cableado a un sofisticado transmisor telemétrico miniaturizado que fue montado de forma permanente en su cráneo. Esta intrusiva pero considerada estrictamente necesaria intervención técnica permitió a los científicos registrar electroencefalogramas (EEG) continuos a lo largo de todas y cada una de las fases críticas del vuelo, proporcionando a los investigadores una ventana neurológica sin precedentes a la actividad neuronal íntima de un mamífero durante la abrupta transición a la ingravidez orbital.',
          'El análisis exhaustivo de la telemetría biomédica recibida durante los escasos quince minutos de vuelo reveló fluctuaciones fisiológicas verdaderamente fascinantes en los estados transitorios de alerta y somnolencia de Félicette. Sorprendentemente, los patrones de ondas cerebrales decodificados indicaron de forma concluyente que la gata alcanzó un estado de profunda relajación sensorial, rayano en el sopor letárgico, durante los breves pero intensos minutos de microgravedad, contrastando fuertemente y de forma dramática con la intensa agitación neurológica registrada durante las brutales aceleraciones del despegue y la turbulenta posterior reentrada atmosférica. Estos hallazgos fisiológicos pioneros sugirieron por vez primera en la historia espacial que el peculiar entorno de gravedad cero podría inducir estados anómalos de inhibición sensorial y alteraciones significativas en la conciencia biológica, un descubrimiento trascendental que influiría significativamente en la planificación médica de futuras misiones tripuladas de muy larga duración.',
          'La cápsula espacial presurizada que albergó a Félicette, diseñada completamente a medida para ajustarse a las dimensiones anatómicas específicas de un pequeño felino, era un verdadero prodigio de la miniaturización industrial y la ingeniería de soporte vital de la incipiente era aeroespacial. Equipada meticulosamente con complejos sistemas redundantes de suministro de oxígeno puro, avanzados filtros químicos absorbentes de dióxido de carbono y mecanismos mecánicos de absorción de impactos, la reducida y estrecha cabina debía garantizar sin margen de error la supervivencia absoluta de la valiosa pasajera biológica en un entorno exterior que era fundamentalmente hostil y letalmente frío. Además de la densa red de sensores biomédicos conectados directamente al cuerpo del animal, la cápsula contaba con innovadoras cámaras automáticas que, aunque rudimentarias para los estándares actuales, documentaron visualmente las reacciones instintivas de la gata a las fuerzas gravitacionales extremas y la total falta de gravedad, corroborando visualmente los datos telemétricos y ofreciendo a la humanidad un registro fílmico inestimable del comportamiento instintivo animal en el vacío del espacio exterior.',
          'A diferencia de Laika, la célebre y trágica perra soviética cuyo fatal destino fue sellado de forma irreversible desde el mismo momento del lanzamiento orbital debido a la total falta de tecnología de soporte vital para la reentrada, la misión suborbital de Félicette fue concebida y planificada meticulosamente desde su inicio con el firme e inquebrantable objetivo de lograr una recuperación cien por ciento segura. El poderoso cohete sonda Véronique, de fabricación francesa, estaba equipado con un sofisticado sistema pirotécnico de separación de fases y una compleja red de paracaídas de despliegue secuencial automático que garantizaron un descenso suave y altamente controlado de la frágil ojiva cónica hacia las ardientes arenas del extenso desierto sahariano. Los ágiles equipos de rescate operando en veloces helicópteros militares localizaron la brillante cápsula a los muy pocos minutos de su exitoso aterrizaje, encontrando a la asustada pero ilesa pionera felina y vocalizando fuertemente su evidente descontento por la enorme agitación del viaje, marcando así un rotundo e histórico éxito técnico y biológico sin precedentes para la ambiciosa nación de Francia.',
          'El enorme legado ético, moral y profundamente científico de la solitaria misión de Félicette continúa siendo objeto de intenso debate filosófico y constante reflexión humanística en el seno de la comunidad científica y bioética contemporánea. Si bien sus formidables contribuciones empíricas al entendimiento temprano y fundamental de la fisiología espacial en mamíferos superiores son absolutamente innegables e invaluables, el sacrificio final e impuesto de la indefensa gata para poder realizar análisis anatómicos e histológicos post mortem plantea serios y dolorosos dilemas existenciales sobre el verdadero valor intrínseco de la frágil vida animal frente a la búsqueda implacable y, a veces, despiadada del progreso y conocimiento humano. Hoy en día, afortunadamente, los protocolos internacionales de bienestar animal en la investigación biológica espacial son infinitamente más estrictos, humanitarios y rigurosos, priorizando siempre por encima de todo la supervivencia a largo plazo y la calidad de vida de los especímenes, un bienvenido cambio de paradigma moral que, de cierta forma poética, honra de manera silenciosa, pero inmensamente profunda, el alto e irreemplazable precio pagado por esta pequeña y valiente heroína parisina de cuatro patas.'
        ]
      },
      {
        label: 'El Cohete Véronique',
        icon: 'zap',
        text: [
          'El cohete Véronique AGI 47, seleccionado como el vehículo de lanzamiento para la histórica misión de Félicette, representaba la cúspide de la tecnología aeroespacial francesa a principios de la década de 1960. Desarrollado originalmente sobre la base de investigaciones capturadas de la Alemania nazi y modificado extensamente para propósitos de sondeo científico, este estilizado cohete de combustible líquido quemaba una volátil mezcla de ácido nítrico y trementina, generando el empuje colosal necesario para escapar de las garras de la atmósfera inferior. El diseño del Véronique era notoriamente complejo y propenso a inestabilidades durante la fase inicial de vuelo, lo que obligaba a los ingenieros a implementar un peculiar sistema de cables guía desde la plataforma de lanzamiento para estabilizar la nave en sus primeros y críticos metros de ascenso hacia el cielo africano.',
          'La preparación logística en la base de Hammaguir, situada en el abrasador entorno del desierto de Argelia, fue una empresa monumental que desafió constantemente a los técnicos debido a las severas condiciones climáticas. Las temperaturas extremas y las persistentes tormentas de arena amenazaban con infiltrarse en los delicados sistemas de telemetría y obstruir las vitales válvulas de presurización del cohete, requiriendo un mantenimiento obsesivo y la construcción de instalaciones climatizadas improvisadas para proteger tanto a los cohetes como a los sensibles animales experimentales. En este entorno inhóspito y desafiante, el equipo científico del CERMA trabajó incansablemente, superando obstáculos técnicos imprevisibles para garantizar que la ventana de lanzamiento de Félicette se cumpliera con precisión milimétrica.',
          'La trayectoria balística planificada para el Véronique AGI 47 fue calculada con exactitud matemática para maximizar el tiempo de microgravedad sin requerir la inmensa velocidad necesaria para alcanzar la órbita terrestre. Al cruzar la emblemática línea de Kármán a 100 kilómetros de altitud, el cohete penetró oficialmente en el espacio exterior, apagando su motor y permitiendo que la cápsula con la gata experimentara la verdadera caída libre en el vacío cósmico. Esta maniobra balística suborbital fue un ensayo crucial para evaluar la fiabilidad de las comunicaciones de radio a través de la ionosfera, enviando sin interrupción los preciados datos de electrocardiogramas y encefalogramas al centro de control terrestre, que monitoreaba con gran ansiedad cada latido del corazón de Félicette.',
          'El perfil aerodinámico de la ojiva que contenía a Félicette fue esculpido tras exhaustivas pruebas en túneles de viento supersónicos, buscando minimizar la tremenda fricción y el calor extremo generados durante la vertiginosa reentrada a la atmósfera terrestre. La cápsula estaba recubierta con materiales ablativos pioneros, resinas especiales que se vaporizaban al contacto con el plasma atmosférico ardiente, disipando eficazmente el calor y manteniendo el interior a una temperatura tolerable para el frágil felino confinado en su interior. Este temprano éxito en la gestión térmica a velocidades hipersónicas demostró la viabilidad de los escudos térmicos franceses, tecnología que posteriormente sería compartida y refinada en colaboraciones espaciales europeas.',
          'La etapa final del vuelo dependía enteramente de la fiabilidad del sistema de recuperación por paracaídas, una tecnología que, aunque antigua en concepto, requería una precisión absoluta para desplegarse a la altitud y velocidad correctas sin desgarrar la tela ni someter a la cápsula a tirones mortales. Una secuencia automatizada de pararrayos barométricos dictaba la expulsión de un pequeño paracaídas piloto, que a su vez extraía la gran vela principal, reduciendo drásticamente la velocidad de caída terminal de la ojiva a un suave descenso de pocos metros por segundo. Cuando la cápsula finalmente tocó la dura tierra del desierto levantando una pequeña nube de polvo, el equipo de seguimiento supo inmediatamente que el Véronique había cumplido su misión a la perfección, asegurando el lugar de Francia en los libros de historia espacial y coronando a Félicette como un verdadero ícono de la ciencia.'
        ]
      }
    ],
    fact: 'En 2019, tras una exitosa y multitudinaria campaña de micromecenazgo impulsada por entusiastas del espacio de todo el mundo, se inauguró por fin una hermosa estatua de bronce de cinco pies de altura en la Universidad Espacial Internacional en Estrasburgo, Francia, honrando de manera permanente la valiente contribución de Félicette a la ciencia, representando a la gata sentada con orgullo sobre un globo terráqueo y mirando hacia las estrellas que una vez visitó brevemente.'
  },
  {
    id: 'moscas',
    title: 'Moscas de la Fruta: Los Pioneros',
    color: '#D4B872',
    btnImage: '/assets/animales/intro_fruitfly.png',
    image: '/assets/course/animales_pioneros/hero_moscas_fruta.jpg',
    content: [
      'Si bien los mamíferos como perros, monos y gatos acaparan la mayor parte de la atención mediática y el reconocimiento histórico en los relatos de la carrera espacial, el honor ineludible de ser los primeros animales terrestres en alcanzar oficialmente la frontera del espacio exterior corresponde a organismos mucho más humildes pero científicamente invaluables: las diminutas moscas de la fruta (Drosophila melanogaster). El 20 de febrero de 1947, apenas dos años después de concluir la devastadora Segunda Guerra Mundial, científicos estadounidenses lanzaron audazmente a bordo de un cohete V-2 capturado y reacondicionado a un pequeño y selecto grupo de estos insectos alados. Lanzado desde el mítico campo de pruebas de White Sands en el vasto desierto de Nuevo México, este histórico cohete alcanzó una asombrosa altitud de 109 kilómetros, superando claramente la línea de Kármán que delimita el comienzo del espacio exterior, estableciendo un récord y un precedente científico imborrable.',
      'El propósito principal de esta audaz y pionera misión entomológica no era una simple exhibición de poderío balístico, sino una investigación biológica profunda orientada a desentrañar los oscuros misterios de la radiación cósmica a gran altitud y sus potenciales efectos letales sobre el tejido vivo y el material genético. Los investigadores militares y civiles estaban profundamente preocupados por las alteraciones biológicas inducidas por la intensa radiación cósmica sin el filtro protector de la atmósfera terrestre gruesa. Las moscas de la fruta, con su ciclo reproductivo extremadamente acelerado, su genoma sorprendentemente similar en muchos aspectos fundamentales al de los seres humanos y su tamaño compacto, representaban el sujeto de prueba perfecto e ideal para analizar mutaciones genéticas rápidas, permitiendo a los científicos observar los efectos radiológicos a lo largo de múltiples generaciones en un período de tiempo notablemente corto, obteniendo datos irremplazables.',
      'Tras el exitoso lanzamiento y un veloz viaje suborbital que expuso a los pequeños insectos al severo entorno espacial, la cápsula biológica especial, diseñada para proteger a sus frágiles ocupantes durante la violenta fase de descenso, se separó cuidadosamente del cuerpo principal del pesado misil V-2 y fue recuperada sana y salva tras desplegar sus paracaídas. Los minuciosos análisis de laboratorio posteriores revelaron con inmenso alivio que las moscas de la fruta no solo habían sobrevivido milagrosamente al inmenso estrés mecánico del despegue, a la intensa exposición a la misteriosa radiación cósmica y al violento aterrizaje, sino que no mostraban absolutamente ninguna evidencia medible de daño celular masivo ni mutaciones genéticas desastrosas. Este resultado tranquilizador y altamente positivo allanó de inmediato el camino conceptual y político para el futuro lanzamiento de animales más complejos, proporcionando la primera prueba tangible de que el entorno espacial no era instantáneamente letal para la vida biológica.',
      'El uso científico de la modesta mosca de la fruta en la investigación espacial no se detuvo en absoluto con este primer y rudimentario vuelo suborbital a lomos de tecnología de misiles alemana; de hecho, fue solo el comienzo de una larga y fructífera carrera como astronautas invertebrados. A lo largo de las décadas siguientes, miles de estos diminutos insectos han sido enviados regularmente en misiones orbitales a bordo de los transbordadores espaciales estadounidenses, la estación espacial soviética Mir y, más recientemente, la avanzada Estación Espacial Internacional (ISS), convirtiéndose en veteranos indiscutibles del cosmos. Los investigadores modernos continúan utilizando de forma extensiva a la Drosophila melanogaster para estudiar detalladamente los efectos neurológicos de la microgravedad prolongada, el impacto devastador del aislamiento espacial en los delicados ritmos circadianos y la expresión genética adaptativa, consolidando su estatus fundamental como una de las herramientas biológicas más importantes de la ciencia aeroespacial.',
      'El legado histórico de estas primeras y diminutas pioneras del espacio a bordo del V-2 de 1947 subraya una poderosa e irrefutable verdad sobre la exploración científica: a menudo, los avances más gigantescos de la humanidad dependen enteramente de los organismos más minúsculos y aparentemente insignificantes de nuestro propio planeta. Sin la inestimable contribución biológica de la modesta mosca de la fruta para asegurar inicialmente que la misteriosa radiación espacial no causaría una rápida desintegración genética, los inmensamente costosos programas espaciales tripulados que culminaron en los legendarios alunizajes del Apolo podrían haberse retrasado drásticamente durante décadas. Estos insectos alados, sin saberlo y sin pedir reconocimiento alguno, abrieron de par en par la imponente puerta cósmica para el ser humano, demostrando que la asombrosa resistencia fundamental de la vida terrestre es capaz de extenderse valientemente mucho más allá de las nubes que envuelven nuestro mundo azul.'
    ],
    expandables: [
      {
        label: 'El Cohete V-2',
        icon: 'clock',
        text: [
          'El cohete V-2, infame por su oscuro origen como un arma de terror letal y devastadora desarrollada y desplegada por el régimen nazi contra ciudades aliadas durante las sombrías etapas finales de la Segunda Guerra Mundial, experimentó una asombrosa e irónica transformación en la inmediata posguerra. Cientos de estos gigantescos misiles balísticos, junto con gran parte de su equipo de diseño original dirigido por el brillante pero controvertido ingeniero Wernher von Braun, fueron incautados por el ejército estadounidense y transportados en secreto a través del océano hasta las vastas instalaciones de prueba en el desierto de White Sands. Allí, estos portentosos vehículos de destrucción masiva fueron meticulosamente desmantelados, rediseñados y convertidos en las primeras y potentes herramientas de la humanidad para la exploración sistemática de la atmósfera superior y las misteriosas fronteras del espacio, marcando un paradigma radical en el uso de la tecnología militar.',
          'La decisión de utilizar la masiva estructura y el enorme poderío del V-2 para fines de investigación biológica y atmosférica puramente pacífica abrió una ventana sin precedentes al estudio científico del cosmos que antes se creía completamente inalcanzable. El enorme morro del cohete, que originalmente albergaba casi una tonelada de explosivos mortíferos de amatol, fue vaciado y reemplazado cuidadosamente por sofisticados instrumentos científicos de medición, contadores Geiger, cámaras espectrográficas de alta resolución y pequeñas cápsulas de bioseguridad diseñadas para contener vida. Esta notable readaptación tecnológica permitió a la naciente comunidad científica civil y militar lanzar cargas útiles sustanciales más allá del opresivo manto atmosférico, iniciando formalmente lo que se conocería posteriormente como la dorada era de los cohetes de sondeo y sentando las bases tecnológicas directas para los futuros vehículos de lanzamiento espacial.',
          'El vuelo específico del 20 de febrero de 1947, que transportó a las diminutas moscas de la fruta a una asombrosa altitud de 109 kilómetros, fue un milagro de improvisación ingenieril y determinación científica en tiempos de gran incertidumbre técnica. Los investigadores tuvieron que diseñar desde cero una cápsula biológica que pudiera mantener no solo una presión atmosférica y temperatura estables en el implacable vacío del espacio, sino que también fuera capaz de sobrevivir intacta al brutal y devastador impacto del regreso a tierra firme a velocidades vertiginosas. El primitivo pero efectivo sistema de paracaídas integrado en la sección de carga científica funcionó a la perfección ese día en el brillante cielo del desierto, permitiendo una recuperación suave y asegurando que las preciosas muestras biológicas no fueran pulverizadas al estrellarse violentamente contra las áridas dunas de Nuevo México, validando la integridad del diseño.',
          'Más allá del resonante éxito de la recuperación biológica de los diminutos insectos, este lanzamiento seminal del V-2 proporcionó a los científicos terrestres la primera confirmación directa e in situ de la asombrosa intensidad real de los temidos rayos cósmicos por encima de las protectoras capas de ozono y oxígeno. Los instrumentos geofísicos a bordo registraron meticulosamente la lluvia invisible de partículas de altísima energía procedentes de las profundidades insondables de la galaxia y de nuestro turbulento sol, datos que eran de vital importancia para calcular los verdaderos riesgos radiológicos de la naciente era espacial. La supervivencia milagrosa y sin daños aparentes de la pequeña tripulación de Drosophila melanogaster ante este agresivo bombardeo radioactivo fue el eslabón científico clave que faltaba para justificar moral y médicamente la continuación decidida de los ambiciosos y arriesgados programas espaciales tripulados que se estaban gestando.',
          'El legado dual y moralmente complejo del cohete V-2 sigue siendo hasta el día de hoy una profunda e insoslayable paradoja en la vasta historia de la tecnología moderna y la exploración cósmica. La misma asombrosa innovación propulsiva que sembró indiscriminadamente la muerte, el miedo y la destrucción sin precedentes en las pobladas ciudades de Londres y Amberes, fue la que innegablemente proporcionó el gigantesco salto técnico inicial hacia las estrellas y la exploración pacífica del universo. La paradójica y fascinante historia de cómo un arma de guerra diseñada para el exterminio masivo transportó a los primeros frágiles representantes vivos de la biósfera terrestre al espacio exterior sirve como un poderoso y constante recordatorio de la profunda neutralidad intrínseca de la tecnología pura, y de cómo el ingenio humano posee la capacidad dual para la devastación absoluta o para alcanzar logros verdaderamente sublimes y reveladores.'
        ]
      },
      {
        label: 'Genética y Radiación Cósmica',
        icon: 'atom',
        text: [
          'La selección metódica de la Drosophila melanogaster para misiones espaciales tempranas y de vanguardia no fue en absoluto una elección arbitraria ni motivada únicamente por su diminuto tamaño físico, sino el resultado de décadas previas de profunda investigación genética que las había posicionado como el organismo modelo supremo en los laboratorios mundiales. Desde los descubrimientos monumentales y revolucionarios de Thomas Hunt Morgan a principios del prolífico siglo XX en la Universidad de Columbia, los genetistas habían mapeado exhaustiva y minuciosamente los cromosomas de estas moscas de la fruta, conociendo con un grado de precisión asombroso sus variadas mutaciones morfológicas naturales. Este profundo y enciclopédico conocimiento genómico preexistente significaba que cualquier alteración minúscula, aberración cromosómica o deformidad fenotípica inducida por las duras condiciones del entorno espacial exterior podría ser detectada de inmediato y cuantificada con enorme exactitud y rigor.',
          'La radiación cósmica galáctica, una lluvia constante e invisible de partículas subatómicas de altísima energía que bombardean implacablemente a los objetos celestes, representaba en esa época temprana la mayor y más aterradora incógnita biomédica para los audaces planificadores de los programas de exploración espacial. A diferencia de la radiación ionizante típica generada artificialmente en la Tierra, los pesados iones galácticos viajan a velocidades cercanas a la de la luz y poseen la abrumadora capacidad destructiva de penetrar limpiamente a través de gruesos blindajes de metal y tejido vivo celular, causando fragmentaciones severas y posiblemente irreversibles en las delicadas cadenas microscópicas del ADN. Las moscas de la fruta a bordo del pionero misil V-2 actuaron como auténticos centinelas biológicos, detectores vivos de radiación expuestos a toda la fuerza de este agresivo e invisible entorno cósmico, para determinar si la vida multicelular podía siquiera subsistir más allá de nuestro planeta.',
          'Los minuciosos estudios cromosómicos realizados de manera exhaustiva a los insectos supervivientes tras su vertiginoso vuelo suborbital de 1947 se centraron de manera obsesiva en la atenta búsqueda de mutaciones recesivas letales ligadas al importante cromosoma X de la especie, un reconocido estándar de oro en las pruebas genéticas de laboratorio para evaluar el daño por exposición a radiación. Al criar cuidadosamente a estas audaces moscas veteranas del espacio a través de múltiples generaciones sucesivas en incubadoras controladas, los científicos esperaban ansiosamente observar si se manifestaban taras hereditarias perjudiciales, deformaciones de alas, cambios en el color de los ojos o letalidad embrionaria debido a roturas del ADN. El asombroso y gratificante hallazgo de que la tasa de mutación inducida en estas moscas espaciales no era estadísticamente superior a la de los grupos de control en tierra proporcionó una de las primeras e indispensables validaciones empíricas de la seguridad genética inherente a los vuelos de muy corta duración fuera de nuestra protectora magnetosfera.',
          'A pesar del enorme y tranquilizador éxito aparente de esta y otras misiones tempranas similares con pequeños invertebrados y semillas botánicas expuestas al vacío, los radiobiólogos más cautelosos se apresuraron a advertir sabiamente que los escasos minutos de intensa exposición experimentados durante los breves vuelos parabólicos suborbitales no equivalían de ninguna manera a los riesgos masivos e inherentes de las estancias orbitales prolongadas o los viajes interplanetarios de larga duración. Las moscas de la fruta habían sobrevivido admirablemente sin daños genéticos aparentes e inmediatos, pero los científicos comprendieron a la perfección que misiones futuras de gran envergadura requerirían exposiciones a dosis de radiación acumuladas muchísimo mayores y cualitativamente diferentes. Esto impulsó fuertemente el desarrollo acelerado de intrincados programas de radiobiología espacial, utilizando a la resistente Drosophila a bordo de satélites biológicos orbitales especializados para periodos de exposición de varias semanas o meses enteros.',
          'Hoy en día, el invaluable y prolífico legado científico de genética espacial inaugurado valientemente por aquellas pioneras moscas de la fruta a bordo del V-2 sigue completamente vivo, expandiéndose continuamente a medida que nos acercamos inexorablemente a la desafiante era de la exploración humana de Marte. Las cepas modernas de la humilde mosca Drosophila continúan viajando regularmente hacia la enorme Estación Espacial Internacional, donde son estudiadas de manera obsesiva mediante avanzadísimas tecnologías de secuenciación de ARN de última generación y transcriptómica de precisión extrema, buscando desentrañar los intrincados mecanismos de expresión genética subyacentes frente a la microgravedad y la radiación crónica. El estudio incesante de estos humildes pero inmensamente complejos insectos alados sigue ofreciendo sin lugar a dudas algunas de las pistas biológicas más reveladoras y cruciales sobre cómo el inmenso y sofisticado cuerpo humano podría llegar a adaptarse genéticamente a los profundos rigores de la vida permanente en el frío y oscuro abismo del inexplorado cosmos.'
        ]
      }
    ],
    fact: 'El código genético de la mosca de la fruta comparte aproximadamente un 60% de similitud de secuencia con el genoma del ser humano promedio, y lo que resulta aún más fascinante para la investigación biomédica, casi un asombroso 75% de los genes específicos que causan complejas enfermedades genéticas en las personas tienen un claro equivalente directo y funcional en el genoma de estas pequeñas moscas espaciales, convirtiéndolas en astronautas biomédicos inigualables.'
  },
  {
    id: 'invertebrados',
    title: 'Resistencia Extrema: Tardígrados',
    color: '#3949AB',
    btnImage: '/assets/course/animales_pioneros/btn_animales_intro.jpg',
    image: '/assets/course/animales_pioneros/hero_ecosistemas_extremofilos.jpg',
    content: [
      'Si bien los mamíferos y los insectos alados dominan ampliamente la narrativa popular y los libros de texto sobre los albores de la exploración biológica del cosmos, los límites absolutos de la asombrosa resistencia de la vida terrestre a los entornos alienígenas más extremos han sido verdaderamente definidos y desafiados por organismos mucho más pequeños, primigenios y aparentemente frágiles: los invertebrados microscópicos. Entre estos asombrosos campeones indiscutibles de la supervivencia celular y estructural extrema se encuentran los formidables tardígrados, comúnmente y de manera cariñosa conocidos como lentos ositos de agua, y la resistente y prolífica especie de gusanos nematodos científicamente denominada Caenorhabditis elegans. Estos organismos modelo en la investigación biomédica no solo han viajado frecuentemente al espacio en misiones recientes de vanguardia, sino que han demostrado de manera concluyente y repetida capacidades fisiológicas verdaderamente alienígenas para soportar sin daño aparente las condiciones letales, agresivas y profundamente hostiles del implacable vacío del universo exterior y la microgravedad.',
      'En el año 2007, una misión científica europea sin precedentes a bordo del satélite recuperable robótico ruso Foton-M3 logró escribir un capítulo absolutamente asombroso e inolvidable en los extensos anales de la prolífica historia de la biología aeroespacial y la naciente astrobiología moderna. Durante un prolongado período de diez angustiosos días en una inestable órbita baja terrestre, varios miles de tardígrados deshidratados de diferentes especies fueron expuestos de manera directa y deliberada al frío absoluto e implacable vacío del mortífero espacio exterior, enfrentándose también a los letales y destructivos niveles masivos de intensa radiación ultravioleta proveniente de nuestro ardiente sol sin ninguna protección atmosférica. Contra todo pronóstico biológico razonable en la Tierra, tras el violento regreso de la resistente cápsula a la superficie de nuestro planeta y su posterior y cuidadosa rehidratación con diminutas gotas de agua destilada, una abrumadora y sorprendente mayoría abrumadora de estos formidables y regordetes organismos microscópicos resucitó de manera instantánea y vigorosa, reanudando plenamente sus funciones biológicas normales, alimentándose, moviéndose e incluso reproduciéndose como si su largo e infernal viaje cósmico jamás hubiera ocurrido.',
      'El secreto biológico intrínseco detrás de esta asombrosa e incomprensible resistencia casi mística reside fundamentalmente en la extraordinaria y fascinante capacidad celular de los tardígrados para entrar rápidamente en un estado de animación suspendida letárgica, técnicamente conocido por los zoólogos como profunda criptobiosis extrema. Cuando se enfrentan de repente a la desecación masiva severa, temperaturas gélidas letales o la aplastante falta total de oxígeno respirable, estos extraños organismos retraen instintivamente sus ocho extremidades segmentadas, se enrollan de forma defensiva sobre sí mismos en una diminuta forma de barril conocida como "tun" y suspenden milagrosamente su delicado metabolismo orgánico hasta un minúsculo 0,01% de su nivel de funcionamiento normal habitual. En este profundo e inerte estado defensivo similar al letargo de la muerte, secretan grandes cantidades de proteínas especiales exclusivas de su especie y producen masivamente azúcares protectores moleculares complejos que vitrifican eficazmente sus frágiles órganos vitales internos, previniendo exitosamente la formación destructiva y letal de microscópicos cristales de hielo puntiagudos y salvaguardando de manera increíble su precioso ADN celular de los potentes y letales embates de la radiación cósmica galáctica desintegradora.',
      'Por otro lado, de forma igualmente asombrosa, los gusanos nematodos de la famosa especie C. elegans han dejado también su asombrosa e imborrable huella imborrable en la historia heroica de la trágica supervivencia biológica espacial extrema, demostrando una notable resistencia al vacío. Tras el terrible y profundamente trágico desastre estructural de la masiva desintegración de reentrada atmosférica del famoso transbordador espacial Columbia en el oscuro y triste año 2003, los compungidos equipos de rescate lograron recuperar milagrosamente, de entre los humeantes e irreconocibles restos retorcidos de la nave esparcidos por vastas áreas de Texas, los intactos e inalterados contenedores biológicos experimentales de resistente aluminio reforzado. En su pequeño y oscuro interior, y para el absoluto y total asombro general de toda la conmovida comunidad científica internacional unida, docenas de pequeñas y frágiles colonias enteras de estos minúsculos y transparentes gusanos microscópicos habían logrado sobrevivir de manera inexplicable al violento e intenso impacto atmosférico, así como también al letal calor extremo generado por el fuego abrazador de la desintegración hipersónica balística, brindando un extraño e inmenso consuelo en medio de la gran desolación y la pérdida incalculable de siete vidas humanas valiosas.',
      'Estos profundos e invaluables descubrimientos biológicos sobre la extrema e insospechada resiliencia natural y fisiológica de la tenaz vida invertebrada microbiana han revitalizado y encendido con gran furor el intenso e incesante debate académico acerca de las antiguas y controvertidas teorías cósmicas de la fascinante panspermia interestelar a lo largo del vasto universo infinito. Si organismos biológicos terrestres tan extraordinariamente duros como los ositos de agua microscópicos y los transparentes nematodos del suelo son genuinamente capaces de soportar sin problemas mayores de manera efectiva las brutales, hostiles y profundamente letales condiciones del abismal espacio exterior, al menos durante breves períodos medibles de días o meses de duración total, no resulta tan descabellado para los rigurosos astrobiólogos plantearse seriamente y considerar de manera analítica que diminutas e invisibles formas de vida primitivas podrían teóricamente haber viajado o logrado sobrevivir cruzando de forma pasiva a través de los inmensos océanos cósmicos interestelares vacíos a bordo de pequeños asteroides rocosos o gélidos cometas portadores de agua y valiosa química orgánica, sembrando de manera accidental e indirecta la milagrosa y prolífica vida en lejanos y prometedores mundos estériles a lo largo de las innumerables galaxias gigantescas de nuestro asombroso y vasto universo infinito.'
    ],
    expandables: [
      {
        label: 'Criptobiosis Letárgica',
        icon: 'zap',
        text: [
          'El profundo y enigmático fenómeno biológico complejo conocido científicamente en zoología como extrema criptobiosis constituye indudablemente uno de los más fascinantes, espectaculares y sorprendentes mecanismos instintivos de supervivencia evolutiva que la caprichosa y maravillosa naturaleza celular haya concebido e implementado de manera exitosa alguna vez en nuestro largo y antiguo planeta Tierra. Derivado etimológicamente de oscuras raíces clásicas de palabras griegas antiguas que conjuntamente significan de manera literal "vida escondida" u "oculta", este estado biológico letárgico extremo representa una profunda paralización metabólica total, donde todas las funciones celulares complejas que habitualmente definen la constante y vibrante existencia biológica de un organismo viviente multicelular simplemente se detienen por completo de manera repentina y radical, llegando a ser casi indistinguibles de una forma aparente de rigidez y rigurosa muerte biológica o necrosis tisular permanente.',
          'En el intrincado y fascinante caso biológico específico de los famosos y regordetes ositos de agua, los asombrosos animales tardígrados microscópicos, el proceso detallado de profunda inducción de la criptobiosis letárgica se desencadena de manera automática por fuertes y drásticos estímulos ambientales sumamente hostiles y nocivos, tales como una severa desecación o enorme pérdida masiva de fluidos vitales. A medida que su entorno inmediato se vuelve implacablemente inhóspito, desecante y profundamente estéril, el organismo entra rápidamente en estado de alarma y comienza a encoger su pequeño y tierno cuerpo segmentado, desprendiéndose veloz y deliberadamente de casi la abrumadora totalidad de sus preciosos y escasos líquidos corporales acuosos esenciales para la química orgánica, sustituyendo sorprendentemente y de forma magistral el líquido celular con altas e inmensas concentraciones de una molécula de azúcar protectora llamada trehalosa. Este asombroso e ingenioso cambio celular interno previene efectivamente y de manera contundente la letal formación de dañinos y afilados cristales de hielo mortales, los cuales en circunstancias comunes destruirían inevitablemente, rasgarían y mutilarían por completo las delicadas y finas membranas celulares frágiles de cualquier otra criatura viviente terrestre y normal.',
          'Durante el prolongado estado criptobiótico durmiente e inerte en forma de rígido y compacto "tun" biológico, el metabolismo celular interno del regordete tardígrado puede descender y paralizarse dramática e increíblemente hasta un asombroso y minúsculo 0,01 por ciento total de su habitual, activo y vigoroso ritmo de consumo energético normal en su acuoso entorno terrestre original. En tan extremas condiciones de animación letárgica suspendida, el microscópico y blindado organismo aparentemente inanimado y seco no requiere ingerir ningún alimento sólido para procesar ni necesita oxígeno molecular para respirar o producir más energía química celular fundamental, pudiendo teóricamente e indefinidamente persistir paciente y firmemente en un estado constante de animación orgánica estática y silenciosa por largos años enteros o tal vez incluso por varias y duras décadas de exposición hostil al ambiente adverso, hasta que logren percibir una mejora en el entorno.',
          'Esta profunda e incomprensible resistencia casi mística e innatural al masivo daño radioactivo extremo, letal frío absoluto inmensurable e implacable sequía profunda confiere asombrosamente a estos invisibles organismos biológicos terrestres una casi incomprensible capacidad irrompible para poder soportar y salir indemnes de los peores y más temibles cataclismos apocalípticos globales que pudieran golpear o erradicar rápidamente gran parte de la diversa y vasta biósfera del hermoso y antiguo planeta azul Tierra. En los avanzados e incesantes estudios de moderna radiobiología y biología extrema actual, la criptobiosis prolongada continúa arrojando de manera regular nuevas y esperanzadoras luces investigativas para poder desarrollar complejas y prometedoras técnicas futuras de avanzada criopreservación segura e indefectible orientadas al complejo manejo e inalterable almacenamiento duradero de frágiles órganos humanos donados vivos e imprescindibles tejidos biológicos valiosos, útiles para trasplantes quirúrgicos en el lejano futuro.',
          'El increíble misterio intrínseco detrás de la impresionante supervivencia masiva espacial y resistencia cósmica de los tardígrados radica entonces precisamente y sin género de duda en su milagrosa habilidad innata para dominar efectivamente esta extrema y rigurosa biostasis criptobiótica absoluta. Su incomprensible y asombrosa victoria y gran hazaña biológica al enfrentarse con total impunidad al agresivo vacío espacial vacío en órbita terrestre, demostrando al instante total y exitosa supervivencia a agresivos embates y masivas descargas nocivas mortales del hostil entorno exterior, subraya la profunda belleza científica y misteriosa perfección técnica del proceso, abriendo amplias y asombrosas posibilidades de expansión a todos los intrépidos y meticulosos astrobiólogos dedicados que buscan intensamente la milagrosa y tenaz chispa viviente y la resistente forma vital de vida extraterrestre original, posiblemente sumida en profundos y ocultos estados criptobióticos milenarios.'
        ]
      },
      {
        label: 'C. elegans y el Desastre',
        icon: 'clock',
        text: [
          'La dolorosa y profunda tragedia existencial masiva e inolvidable ocurrida durante el fatídico final del transbordador espacial Columbia en aquel oscuro y terrible año de febrero del año 2003, grabó indiscutiblemente un dramático y sombrío capítulo imborrable de luto total en la extensa historia compartida de la exploración cósmica y la aventura humana estelar y planetaria moderna general. Cuando el transbordador espacial orbital se fracturó y se rompió masivamente y en miles de restos ardientes durante el vertiginoso reingreso ardiente final balístico debido a daños aerodinámicos severos acumulados, una densa y persistente cortina de angustia inmedible, llanto silencioso y generalizada tristeza colectiva envolvió instantáneamente por entero a la dolida e incrédula humanidad estupefacta, recordando con absoluta dureza general lo inmensamente frágiles, breves e incalculablemente invaluables e irrepetibles que son ciertamente las escasas e inestimables vidas valientes.',
          'Sin embargo, de las extensas y esparcidas cenizas dispersas resultantes de la trágica tragedia brutal, y sumergida en los restos ardientes regados a lo largo del estado, surgió sorprendentemente e inexplicablemente una asombrosa chispa pequeña y microscópica llena de una increíble, vigorosa y asombrosa resistencia biológica, incomprensible y fuerte a la total masiva devastadora fuerza generada. Equipos expertos oficiales encargados cuidadosamente de la minuciosa búsqueda e inmensa recolección organizada forense y detallada de restos dispersos en amplias áreas recuperaron milagrosamente unos extraños tubos experimentales herméticos metálicos casi indemnes. Para absoluta y enorme sorpresa asombrosa de todo el personal técnico, científico y médico experto involucrado exhaustivamente en la trágica pero rigurosa operación y minuciosa inspección, las pequeñas colonias pobladas y activas repletas de nematodos y transparentes, conocidos oficialmente en biología como la especie C. elegans, lograron y pudieron aguantar valientemente y resistir casi sin bajas notables todo el feroz estrés apocalíptico y el fuerte caos letal extremo masivo generado abrumadoramente alrededor de ellos.',
          'El pequeño gusano nematodo transparente del suelo denominado C. elegans ya era ampliamente famoso, famoso y valorado indiscutiblemente por los genetistas terrestres por representar a cabalidad un completo sistema de investigación modelo simple y poderoso debido a la rigurosa precisión inalterable y completa de todo su preciso mapa celular neuronal estructural y a un detallado mapa total e inmutable genoma mapeado. Su imprevista y misteriosa persistencia milagrosa biológica tras el abrumador impacto apocalíptico extremo desintegrador, resistiendo heroica y maravillosamente el abrasador calor destructivo feroz hipersónico e infernal y los salvajes e implacables inmensos impactos catastróficos violentos masivos originados por el brutal y terrible descenso violento libre sin control de reentrada terrestre inmensamente destructiva, añadió rápidamente e indudablemente a todo su largo, vasto e incansable currículum y exitoso historial médico de notables logros importantes científicos una increíble capa verdaderamente mitológica legendaria, y ciertamente inmensa resiliencia aparente e innegable fuerte.',
          'Los complejos informes científicos publicados tras analizar meticulosamente y al inmenso detalle extremo los tubos de aluminio rescatados y los microscópicos frascos intactos y los resultados sobrevivientes mostraron de manera indudable y rotunda firme que los pequeños nematodos robustos minúsculos no solo sobrevivieron al choque extremo e infernal masivo destructivo sino que además posteriormente se reprodujeron de manera completamente normal natural sana y vibrante tras su larga e infame dura terrible ordalía extrema de caída apocalíptica espacial y desastrosa brutal prueba inmersiva. Estas importantes criaturas minúsculas transparentes pasaron y cursaron su traumático retorno ardiente a la atmósfera encerradas en pequeñas cápsulas metálicas diseñadas con propósitos experimentales sencillos y aislantes resistentes térmicos; su capacidad asombrosa milagrosa intrínseca de supervivencia aparente a todas esas asombrosas fuerzas G inmensurables letales letales generadas, nos revela fuertemente la impresionante y casi indestructible inmensurable dureza, tenacidad asombrosa de las pequeñas y diversas formas microbianas.',
          'Esta historia triste y profundamente dramática sombría sobre inmensas pérdidas dolorosas invaluables e impactantes entrelazadas extrañamente fuertemente con la asombrosa asombrosa e incomprensible gran milagrosa misteriosa y espectacular y tenaz capacidad de resistencia infinita animal extrema representa una metáfora poderosa sobre el esfuerzo continuo en la adversidad. Nos sirve para comprender que a pesar del constante acecho permanente y letal del inmenso y peligroso oscuro y frío destructivo y salvaje cosmos agresivo y extremo destructivo para la frágil vida superior compleja de nuestro mundo terrestre azul y hermoso, la tenacidad casi inquebrantable irrompible microscópica de ciertos y extraños tenaces organismos singulares biológicos es verdaderamente una fuerte luz brillante resplandeciente e inconfundible de tenacidad infinita irrompible natural, que seguirá de manera persistente e indomable, prosperando firme, constante resistente inmensurable y fuerte para siempre en toda la larga historia espacial.'
        ]
      }
    ],
    fact: 'El microscópico tardígrado, en estado de criptobiosis inducida, es capaz de sobrevivir sin protección y de forma completamente pasiva y natural a temperaturas tan increíblemente extremas e impensables como -272 grados Celsius (prácticamente el gélido cero absoluto interestelar sin calor alguno) o tan ardientes y abrazadoras como los destructivos y mortíferos 150 grados Celsius ardientes de calor letal abrasador destructor continuo que derretiría muchos plásticos densos resistentes de manera inmediata veloz; esta invulnerabilidad extrema y su espectacular y milagrosa asombrosa fortaleza aparente ha llevado a los ingenieros de la NASA y la ciencia aeroespacial profunda internacional a estudiarlo a fondo y obsesivamente rigurosamente con enorme devoción intensa.'
  }
];

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
      color: Math.random() > 0.5 ? '216, 125, 74' : '212, 184, 114',
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

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const IconComp = item.icon === 'atom' ? Atom : item.icon === 'clock' ? Clock : Zap;
  
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
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            {Array.isArray(item.text) ? item.text.map((para, idx) => (
              <p key={idx} style={{
                margin: '0 0 0.8rem', fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {para}
              </p>
            )) : (
              <p style={{
                margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: `3px solid ${color}30`,
                paddingLeft: '0.8rem',
              }}>
                {item.text}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }}
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
          layoutId="activeDotAnimalesM4"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
        />
      )}
    </motion.button>
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
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px',
      }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none' }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {React.createElement(decoComponents[0], { size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none' }}>
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => <ExpandableSection key={i} item={item} color={node.color} />)}
            </div>
          </div>
        )}
        <motion.div whileHover={{ scale: 1.01 }} style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderLeft: `4px solid ${node.color}`, borderRadius: '0 12px 12px 0', display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>{node.fact}</p>
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
        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #D4B872)', borderRadius: '3px' }} />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_AnimalesM4() {
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
    <div style={{ width: '100%', minHeight: '100vh', background: 'url(/assets/course/animales_pioneros/banner_animales.jpg) center/cover', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem 1rem', overflow: 'hidden' }}>
      {/* Contextual Background Image (§18) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('/assets/course/animales_pioneros/bg_animales.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,12,30,0.95) 0%, rgba(15,10,35,0.85) 40%, rgba(10,12,30,0.95) 100%)', zIndex: 1 }} />
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', border: '1px solid rgba(216,125,74,0.12)', borderRadius: '24px', padding: '2rem', background: 'rgba(10, 12, 30, 0.4)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)' }}>
        <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '20px' }}>
           <h2 style={{ color: '#D4B872', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Gatos y Pioneros Menores</h2>
           <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Exploradores Invertebrados y Felinos en el Espacio</p>
        </div>
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton key={node.id} node={node} index={i} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel key={activeNode} node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          )}
        </AnimatePresence>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Star size={14} /> Fuentes y Bibliografía Científica
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '6px' }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />}
      </AnimatePresence>
    </div>
  );
}
