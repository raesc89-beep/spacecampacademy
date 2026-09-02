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
    btnImage: '/assets/animales/infographic_m4/btn_felicette.jpg',
    image: '/assets/animales/infographic_m4/hero_felicette.jpg',
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
    btnImage: '/assets/animales/infographic_m4/btn_moscas.jpg',
    image: '/assets/animales/infographic_m4/hero_moscas.jpg',
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
    btnImage: '/assets/animales/infographic_m4/btn_invertebrados.jpg',
    image: '/assets/animales/infographic_m4/hero_invertebrados.jpg',
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
  },
  {
    id: 'tardigrados-espacio',
    title: 'Tardígrados: Los Invencibles del Cosmos',
    color: '#81C784',
    btnImage: '/assets/animales/infographic_m4/btn_tardigrados-espacio.jpg',
    image: '/assets/animales/infographic_m4/hero_tardigrados_espacio.jpg',
    content: [
      'Los tardígrados, coloquialmente conocidos como "osos de agua" por su peculiar locomoción de ocho patas, son animales microscópicos de entre 0.1 y 1.5 milímetros que habitan en todos los ecosistemas terrestres, desde las cimas del Himalaya hasta los fondos oceánicos abisales. En 2007, el experimento FOTON-M3 de la Agencia Espacial Europea demostró que 3,000 tardígrados de las especies Milnesium tardigradum y Richtersius coronifer podían sobrevivir 10 días en el vacío completo del espacio exterior, expuestos directamente a la radiación UV del sol sin ninguna protección. Esta hazaña la habían logrado entrando en un estado llamado criptobiosis, una suspensión metabólica casi total donde su actividad vital cae por debajo del 0.01% de lo normal.',
      'El mecanismo de supervivencia de los tardígrados se basa en una proteína única que no tiene equivalente en ningún otro phylum animal: la proteína Dsup (Damage Suppressor), descubierta en 2016 por investigadores de la Universidad de Tokio. Esta proteína se envuelve alrededor del ADN como un escudo molecular, bloqueando físicamente el acceso de los radicales libres y la radiación ionizante a la doble hélice genética. Cuando los investigadores transfirieron el gen de Dsup a células humanas cultivadas en laboratorio, la tasa de daño al ADN por radiación UV disminuyó en un 40%, lo que abrió perspectivas directas para el desarrollo de fármacos radioprotectores aplicables en radioterapia oncológica y en la protección de astronautas durante misiones de larga duración.',
      'El experimento TARDIS (Tardigrades in Space) a bordo de la Estación Espacial Internacional demostró en 2011 que estos animales no solo sobreviven al espacio sino que pueden reproducirse después de la exposición. Grupos de tardígrados expuestos durante 18 meses a la microgravedad dentro de la ISS produjeron descendencia fértil con una tasa de eclosión de huevos comparable a la de poblaciones control en tierra, descartando la hipótesis de que la microgravedad dañara irreparablemente sus sistemas reproductivos. Este resultado fue fundamental para confirmar que las adaptaciones extremófilas de los tardígrados son robustas no solo frente al vacío y la radiación, sino también frente a la ausencia de gravedad.',
      'La resistencia de los tardígrados al vacío espacial está mediada por su capacidad de reducir su contenido de agua hasta el 3% del peso corporal total, sustituyendo las moléculas de agua intercelular por una matriz vítrea de trehalosa, un disacárido que funciona como "vidrio biológico" preservando la estructura tridimensional de proteínas y membranas celulares. Esta técnica de vitrificación natural fue el modelo que inspiró las técnicas modernas de criopreservación de órganos para trasplante y la liofilización farmacéutica de fármacos termolábiles. Los tardígrados demuestran que la biología evolutiva ha resuelto problemas de ingeniería molecular que aún hoy desafían a la tecnología humana.',
      'La misión Beresheet de Israel, que se estrelló contra la Luna en abril de 2019, llevaba a bordo una muestra de tardígrados deshidratados sin autorización oficial de la comunidad científica internacional — un incidente que generó el primer debate ético formal sobre la posible contaminación biológica de cuerpos celestes con organismos terrestres. Estudios posteriores calcularon que algunos tardígrados probablemente sobrevivieron el impacto en estado criptobiótico, aunque las temperaturas del suelo lunar y la ausencia de agua hacen prácticamente imposible que se reactiven. El episodio aceleró la revisión de los protocolos de protección planetaria de la COSPAR para incluir organismos extremófilos en las regulaciones de contaminación forward.'
    ],
    expandables: [
      { label: 'Proteína Dsup', icon: 'Atom', text: 'La proteína Dsup de los tardígrados, cuando se transfiere a células humanas, reduce el daño al ADN por radiación UV en un 40%. Los investigadores la están estudiando para desarrollar fármacos que protejan a los astronautas de la radiación cósmica durante misiones a Marte.' },
      { label: 'Luna Contaminada', icon: 'Sparkles', text: 'La sonda Beresheet (Israel, 2019) se estrelló en la Luna llevando tardígrados deshidratados no autorizados. El debate científico que generó llevó a la COSPAR a revisar sus protocolos de protección planetaria para incluir extremófilos.' }
    ],
    fact: 'Los tardígrados fueron los primeros animales en sobrevivir al vacío del espacio exterior sin ninguna protección en el experimento FOTON-M3 (2007). Su proteína Dsup, que blinda el ADN de la radiación, podría ser el fármaco radioprotector que los astronautas en Marte necesitarán.'
  },
  {
    id: 'elegans-columbia',
    title: 'C. elegans y el Columbia: Sobrevivientes del Desastre',
    color: '#4FC3F7',
    btnImage: '/assets/animales/infographic_m4/btn_elegans-columbia.jpg',
    image: '/assets/animales/infographic_m4/hero_elegans_columbia.jpg',
    content: [
      'El 1 de febrero de 2003, el transbordador espacial Columbia se desintegró durante la reentrada atmosférica a 60 km de altitud, causando la muerte de los 7 astronautas a bordo. Sin embargo, entre los escombros recuperados semanas después en Texas y Louisiana, los investigadores encontraron algo extraordinario: colonias vivas y completamente funcionales del nematodo Caenorhabditis elegans, un gusano microscópico de 1 mm de longitud que había sobrevivido la catástrofe en contenedores de aluminio sellados que protegieron sus cápsulas de dormancia de las temperaturas de reentrada, que alcanzaron más de 1,500°C en la superficie exterior del transbordador.',
      'C. elegans se ha convertido en el organismo modelo más importante de la biología espacial por razones muy concretas: tiene exactamente 959 células somáticas cuyo linaje completo está mapeado desde el óvulo fecundado hasta el gusano adulto, su genoma de 100 millones de pares de bases comparte el 40% de sus genes con el genoma humano, y su ciclo de vida de 2-3 semanas permite estudiar generaciones completas en el tiempo de una misión a la ISS. El experimento CELEG en la ISS ha utilizado C. elegans para identificar 2,000 genes que cambian su expresión en microgravedad, de los cuales 500 tienen homólogos directos en el genoma humano.',
      'El análisis genético de las colonias de C. elegans sobrevivientes del Columbia reveló algo inesperado: las poblaciones que habían estado en órbita durante 16 días mostraban cambios de expresión génica que se habían propagado a generaciones posteriores a través de mecanismos epigenéticos, específicamente mediante modificaciones en las marcas de histonas H3K4me3 y H3K27me3. Este fenómeno, denominado "memoria epigenética de la microgravedad", demostró que los organismos no solo se adaptan a la microgravedad durante la exposición sino que codifican esa adaptación en un formato hereditario que se transmite a descendientes que nunca estuvieron en el espacio.',
      'El experimento GeneLab en la ISS, que ha analizado más de 200 experimentos con C. elegans desde 2011, ha generado la base de datos más completa de biología molecular espacial existente. Los datos muestran que la microgravedad activa sistemáticamente genes relacionados con el estrés oxidativo, la autofagia celular y la desregulación del reloj circadiano, mientras que suprime genes asociados con la contracción muscular y la señalización neuronal. Sorprendentemente, estos patrones moleculares son similares a los observados durante el envejecimiento acelerado en C. elegans terrestre, reforzando la hipótesis de que la microgravedad actúa como un acelerador del envejecimiento biológico a nivel molecular.',
      'La versatilidad de C. elegans como modelo experimental para la biología espacial está siendo aprovechada para desarrollar contramedidas farmacológicas para astronautas. El compuesto PW1, un inhibidor de la proteína kinasa SGK-1 identificado en experimentos con C. elegans en microgravedad, ha mostrado en pruebas preliminares que preserva la masa muscular en un 60% durante simulaciones de microgravedad en ratones. Esta línea de investigación, iniciada gracias a los experimentos con nematodos en la ISS, podría producir en los próximos 10 años el primer fármaco antiosteoporosis y antiamiotrofia diseñado específicamente para los viajes interplanetarios de larga duración.'
    ],
    expandables: [
      { label: 'Memoria Epigenética', icon: 'Activity', text: 'Las colonias de C. elegans del Columbia mostraron que la adaptación a la microgravedad se codifica en marcas epigenéticas hereditarias — descendientes que nunca estuvieron en el espacio "recordaban" molecularmente que sus ancestros sí lo estuvieron.' },
      { label: 'Fármaco SGK-1', icon: 'Microscope', text: 'El inhibidor PW1, descubierto gracias a experimentos con C. elegans en la ISS, preserva el 60% de la masa muscular en microgravedad simulada en ratones. Podría ser el primer fármaco antiatrofia diseñado para viajes a Marte.' }
    ],
    fact: 'C. elegans sobrevivió la desintegración del Columbia a 1,500°C y fue recuperado vivo de los escombros en Texas. Ese mismo organismo ha permitido identificar un posible fármaco que podría prevenir la atrofia muscular en astronautas durante viajes a Marte.'
  },
  {
    id: 'peces-zebrafish',
    title: 'Peces Cebra: Vertebrados en Microgravedad',
    color: '#7986CB',
    btnImage: '/assets/animales/infographic_m4/btn_peces-zebrafish.jpg',
    image: '/assets/animales/infographic_m4/hero_zebrafish_iss.jpg',
    content: [
      'El pez cebra (Danio rerio) es el único vertebrado que ha completado su desarrollo embrionario completo —desde huevo fertilizado hasta organismo maduro— en microgravedad a bordo de la Estación Espacial Internacional. En el experimento Zebrafish de JAXA (2015-2016), embriones de pez cebra fueron fertilizados en el laboratorio Kibo de la ISS y observados durante las 72 horas críticas de desarrollo que determinan la simetría corporal, la formación del sistema nervioso central y el establecimiento del eje dorsoventral. Los resultados desafiaron la teoría predominante: los embriones desarrollaron simetría bilateral normal y gastrulación correcta, demostrando que la polaridad celular embrionaria no depende de la gravedad como se creía.',
      'Sin embargo, el análisis detallado reveló anomalías específicas en el sistema otolítico —las estructuras de equilibrio del oído interno— que son funcionalmente análogas a los otolitos del oído humano. Los peces cebra desarrollados en microgravedad mostraron otolitos de menor densidad cristalina y mayor variabilidad en tamaño que los controles terrestres, y en el 23% de los individuos los otolitos no se depositaron simétricamente en las dos cámaras. Cuando estos peces fueron devueltos a la gravedad, exhibieron comportamientos de natación anómalos consistentes con desorientación vestibular —nadando en espirales o de costado— que en el 35% de los casos eran permanentes, sin recuperación observable.',
      'El pez medaka (Oryzias latipes), más pequeño y de ciclo reproductivo más rápido que el zebrafish, fue el primer vertebrado en reproducirse en el espacio durante el experimento de la misión STS-65 en 1994. Los medakas fertilizaron huevos, incubaron y eclosionaron larvas funcionales en microgravedad, demostrando que la reproducción sexual de vertebrados es posible fuera de la Tierra. Las larvas eclosionadas en órbita mostraron inicialmente una conducta de natación circular desorientada —dando vueltas hacia el lado oscuro de la pecera en lugar de hacia la fuente de luz—, un comportamiento que los investigadores interpretaron como la ausencia de la referencia gravitacional que normalmente orienta la fototaxis ascendente en los peces.',
      'La transparencia del embrión de pez cebra, que permite observar en tiempo real el desarrollo de órganos internos bajo microscopio sin intervención quirúrgica, lo convierte en una herramienta experimental única en la biología espacial. El experimento Aquatic Habitat en la ISS ha utilizado esta característica para observar la formación de vasos sanguíneos, el latido cardíaco y la mielinización neuronal en tiempo real durante el desarrollo en microgravedad, transmitiendo imágenes de alta resolución a investigadores en tierra. Estas observaciones han revelado que la angiogénesis —la formación de nuevos vasos sanguíneos— procede de forma normal en los primeros 3 días pero muestra retrasos en los días 4-6, coincidiendo con la fase en que la presión hidrostática normalmente impulsa el flujo sanguíneo hacia las extremidades.',
      'Los resultados obtenidos con peces en la ISS tienen implicaciones directas para entender el síndrome visual asociado al vuelo espacial en astronautas humanos, una condición en la que el 70% de los astronautas desarrollan edema del nervio óptico y cambios en la curvatura del cristalino después de misiones de larga duración. Los modelos de pez cebra con genes de presión intraocular modificados están siendo utilizados en el experimento EyeVessel de la ISS para identificar los mecanismos moleculares de la redistribución de fluidos craneales en microgravedad, con el objetivo de desarrollar fármacos que prevengan el deterioro visual permanente en astronautas durante los viajes a Marte.'
    ],
    expandables: [
      { label: 'Otolitos Asimétricos', icon: 'Activity', text: 'El 23% de los peces cebra desarrollados en la ISS tuvieron otolitos mal formados, y el 35% nunca recuperó la orientación normal al volver a la Tierra. Exactamente el mismo mecanismo podría explicar el mareo espacial que afecta al 70% de los astronautas.' },
      { label: 'Peces Ciegos al Espacio', icon: 'Sparkles', text: 'Los medakas eclosionados en microgravedad en 1994 nadaban en círculos hacia la oscuridad en lugar de hacia la luz — sin gravedad, los peces pierden la referencia que les indica cuál es "arriba". Los humanos tenemos el mismo problema en los primeros días en órbita.' }
    ],
    fact: 'El pez cebra es el único vertebrado en haber completado su desarrollo completo en microgravedad. Sus anomalías otolíticas son el modelo más preciso disponible para estudiar por qué el 70% de los astronautas desarrollan problemas de visión permanentes en misiones largas.'
  },
  {
    id: 'ratones-reproduccion',
    title: 'Mamíferos en Órbita: El Futuro de la Vida en el Espacio',
    color: '#FF8A65',
    btnImage: '/assets/animales/infographic_m4/btn_ratones-reproduccion.jpg',
    image: '/assets/animales/infographic_m4/hero_ratones_iss.jpg',
    content: [
      'La pregunta de si los mamíferos pueden reproducirse con éxito en el espacio tiene implicaciones fundamentales para cualquier proyecto de colonización permanente más allá de la Tierra. Los experimentos con ratones en la ISS han abordado esta pregunta de forma progresiva: primero confirmando que los adultos sobreviven misiones largas (30-90 días en el módulo Rodent Research); luego verificando que las hembras mantienen ciclos estrales relativamente regulares; y más recientemente, enviando espermatozoides liofilizados que permanecieron 288 días en la ISS y produjeron crías sanas tras ser fertilizados en tierra, demostrando que el material genético masculino es viable tras exposición prolongada a la radiación cósmica en microgravedad.',
      'El experimento Mouse Habitat Unit de JAXA demostró en 2016 que grupos de ratones alojados en un hábitat orbital con ruedas de ejercicio mantenían una masa muscular hasta un 25% mayor que los ratones en hábitats sin ejercicio, y presentaban una densidad ósea un 18% más alta. Este resultado transformó la comprensión de las contramedidas para la atrofia muscular y la osteoporosis espacial: el ejercicio físico no es solo un complemento sino una variable biológica esencial que puede compensar parcialmente los efectos de la microgravedad sobre el sistema musculoesquelético de los mamíferos, incluyendo probablemente a los humanos.',
      'Uno de los hallazgos más alarmantes de la investigación con ratones en la ISS fue el descubrimiento de que la exposición a la radiación cósmica —no la microgravedad— es el principal factor de daño al ADN en mamíferos en el espacio. Los ratones expuestos a simuladores de radiación cósmica en tierra mostraron tasas de mutagénesis 4 veces mayores que los ratones en microgravedad sin radiación intensa. La combinación de ambas (como ocurrirá en un viaje a Marte de 9 meses) elevó la tasa de mutaciones a niveles 12 veces superiores al control terrestre, y en el 8% de los animales se observaron indicios tempranos de transformación neoplásica en células hepáticas tras solo 6 semanas de exposición.',
      'El proyecto Space Pup, realizado por el grupo de Teruhiko Wakayama en la Universidad de Yamanashi (Japón), demostró en 2023 que embriones de ratón preservados como blastocistos a bordo de la ISS durante 288 días pueden implantarse exitosamente en úteros de ratonas terrestres y producir crías completamente normales. De 720 blastocistos enviados al espacio, 168 (23.3%) sobrevivieron en condiciones viables y produjeron 168 ratones nacidos vivos con peso, tamaño y fertilidad comparables a los controles. Sin embargo, el análisis epigenómico reveló que estos ratones tenían perfiles de metilación del ADN ligeramente alterados en los genes implicados en el metabolismo energético, con posibles consecuencias a largo plazo aún en estudio.',
      'Las investigaciones con ratones en la ISS han identificado una ventana fisiológica crítica para las colonias espaciales del futuro: los primeros 72 horas post-concepción son el período más vulnerable del desarrollo embrionario mamífero en microgravedad. Los embriones que superan este período crítico muestran tasas de viabilidad comparables a los controles terrestres, mientras que los embriones expuestos a microgravedad durante las primeras 72 horas presentan tasas de anomalías del 34%. Esta información es fundamental para diseñar los protocolos de reproducción de las futuras colonias en la Luna o Marte: los estudios sugieren que instalaciones con gravedad artificial de al menos 0.38g (la gravedad marciana) serían necesarias para los períodos críticos de gestación temprana, mientras que el resto del embarazo podría tolerar niveles gravitacionales más bajos.'
    ],
    expandables: [
      { label: 'Esperma en Órbita', icon: 'Sparkles', text: 'Espermatozoides de ratón liofilizados permanecieron 288 días en la ISS, expuestos a niveles de radiación cósmica que habrían matado cualquier célula viva. Al ser fertilizados en tierra, produjeron crías completamente sanas — el ADN masculino es sorprendentemente resistente.' },
      { label: 'Ventana de 72h', icon: 'Clock', text: 'Los primeros 3 días de embarazo son críticos: los embriones de ratón expuestos a microgravedad durante ese período tienen un 34% de anomalías. Para colonias en Marte, esto significa que las gestantes necesitarían gravedad artificial durante el primer trimestre.' }
    ],
    fact: 'El proyecto Space Pup (2023) demostró que embriones de ratón pueden sobrevivir 288 días en la ISS y producir crías normales tras ser implantados en la Tierra. Pero los análisis epigenómicos muestran que el "recuerdo" espacial queda grabado en su ADN — con consecuencias que aún estamos descubriendo.'
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
