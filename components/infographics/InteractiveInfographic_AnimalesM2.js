'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Atom, BookOpen } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const BIBLIOGRAPHY = [
  "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer Praxis Books.",
  "Henry, J. P. (1952). Aeromedical Reviews: The V-2 Monkey Flights. Holloman Air Development Center Technical Report.",
  "NASA History Division (1961). Mercury-Redstone 2: The Flight of Ham the Chimpanzee. NASA Historical Data Book.",
  "Gray, T. (1998). A Brief History of Animals in Space. NASA History Office.",
  "Beischer, D. E., & Fregly, A. R. (1962). Animals and Man in Space: A Chronology and Annotated Bibliography Through the Year 1960. ONR Report."
];

const INFOGRAPHIC_NODES = [
  {
    "id": "albert-1-v2",
    diagramImage: '/assets/animales/infographic_m1/diagram_albert-1-v2.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Albert I: El Primer Ensayo en Cohete V-2',
    "title": "Albert I: El Primer Ensayo en Cohete V-2",
    "color": "#4FA3B5",
    "btnImage": "/assets/animales/mamiferos_rhesus.webp",
    "image": "/assets/animales/hub_albert_ham.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_vuelo-primates.webp",
    "content": [
      "El 11 de junio de 1948, el desierto de White Sands en Nuevo México fue testigo de una de las misiones aeromédicas más trascendentales de la historia de la ciencia. La Fuerza Aérea de los Estados Unidos y la Escuela de Medicina de Aviación prepararon un cohete V-2 capturado tras la Segunda Guerra Mundial para transportar en su ojiva a Albert I, un macaco rhesus anestesiado. El propósito fundamental era determinar si un mamífero con fisiología cardiovascular y pulmonar similar a la de un ser humano podía sobrevivir a la tremenda aceleración vertical de un despegue supersónico y a la rápida transición hacia la microgravedad.",
      "La cápsula que albergaba a Albert I era un compartimento de acero sumamente angosto y rudimentario, diseñado con escasos conocimientos sobre soporte vital en grandes altitudes. Dentro del habitáculo presurizado, los científicos instalaron sensores galvánicos para registrar la frecuencia respiratoria y electrodos torácicos con el fin de obtener un electrocardiograma continuo durante la trayectoria balística. No existían en ese momento trajes espaciales miniaturizados ni sistemas de reciclaje térmico, por lo que el animal dependía enteramente de botellas de oxígeno a presión fijas.",
      "Durante el ascenso, el cohete V-2 alcanzó una altitud de sesenta y tres kilómetros, atravesando la estratosfera e ingresando en la mesosfera a una velocidad superior a los cuatro mil kilómetros por hora. Aunque la telemetría biológica indicó que los registros vitales de Albert I cesaron poco antes de alcanzar el apogeo debido a fallos en el suministro de oxígeno de la cápsula presurizada, los sensores mecánicos demostraron que la estructura biológica soportó sin fracturas ni hemorragias internas masivas las brutales fuerzas de inercia y vibración del motor del cohete.",
      "El descenso de la ojiva culminó en un impacto catastrófico en el terreno desértico debido a que el sistema de expulsión de paracaídas sufrió una rotura mecánica por la extrema resistencia aerodinámica. El equipo de recuperación aeromédica liderado por el doctor James P. Henry tuvo que lidiar con la pérdida del sujeto, pero las cintas de telemetría de radio recuperadas de la estación terrestre aportaron la primera confirmación empírica de que los impulsos nerviosos y el sistema circulatorio básico de un primate pueden continuar operando a decenas de miles de metros de altitud.",
      "La misión de Albert I dejó lecciones de ingeniería indispensables para el diseño de habitáculos espaciales. Demostró con crudeza que los contenedores estáticos no eran suficientes y que se requerían cápsulas con amortiguación biomecánica activa, redundancia múltiple en el flujo de oxígeno y paracaídas con desaceleración en varias fases. Aquel trágico primer paso marcó el nacimiento formal de la medicina aeroespacial moderna y colocó el soporte vital de mamíferos como la máxima prioridad de la ingeniería de vuelo."
    ],
    "fact": "La cápsula biológica de Albert I instalada en la ojiva del cohete V-2 lanzado en White Sands en junio de 1948 constituyó el primer habitáculo aeromédico experimental en la historia de la astronáutica en equipar telemetría en tiempo real, transmitiendo registros electrocardiográficos continuos y frecuencia respiratoria hacia estaciones de radio en tierra.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las evaluaciones aeromédicas dirigidas por el doctor James P. Henry en 1948 determinaron que a presiones atmosféricas por debajo de 50 milibares, la hemoglobina pierde rápidamente su capacidad de transporte de oxígeno molecular, exigiendo cabinas presurizadas herméticas y sistemas automáticos con válvulas antirretorno para prevenir la anoxia cerebral aguda en primates."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El equipo médico de la Fuerza Aérea asignó de manera informal el nombre Albert al primer macaco rhesus en tributo al físico Albert Einstein; esta denominación se convirtió en el código protocolar estándar para toda la serie histórica de investigaciones biológicas suborbitales estadounidenses desarrolladas entre los años 1948 y 1952."
      }
    ]
  },
  {
    "id": "albert-2-karman",
    diagramImage: '/assets/animales/infographic_m1/diagram_albert-2-karman.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Albert II: Cruce Histórico de la Línea de Kármán',
    "title": "Albert II: Cruce Histórico de la Línea de Kármán",
    "color": "#D4A843",
    "btnImage": "/assets/animales/mamiferos_rhesus.webp",
    "image": "/assets/animales/hub_albert_ham.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_vuelo-primates.webp",
    "content": [
      "Un año después del primer intento, el 14 de junio de 1949, la Fuerza Aérea norteamericana lanzó el cohete V-2 número 47 llevando a bordo a Albert II, un macaco rhesus anestesiado con pentobarbital sódico. En esta ocasión, los ingenieros habían rediseñado completamente el sistema de sellado hermético y la cápsula respiratoria para evitar los fallos de oxigenación previos. El objetivo era superar los cien kilómetros de altitud sobre la superficie terrestre, penetrando por primera vez en el verdadero espacio exterior.",
      "El lanzamiento se desarrolló de manera impecable y el cohete trepó en trayectoria casi vertical hasta alcanzar un apogeo de ciento treinta y cuatro kilómetros sobre el desierto de White Sands. Al superar los cien kilómetros de cota, Albert II se transformó formalmente en el primer mamífero y primer primate de la historia en cruzar la frontera del espacio exterior, conocida internacionalmente como la línea de Kármán, entrando en una región donde la atmósfera terrestre es prácticamente inexistente.",
      "Durante los minutos de ingravidez en el cenit de la parábola balística, la telemetría biomédica continuó transmitiendo datos estables hacia los receptores en tierra. Los registros electrocardiográficos revelaron que el ritmo cardíaco del primate se mantuvo dentro de rangos fisiológicos seguros y la presión arterial periférica no experimentó los colapsos hidrostáticos catastróficos que muchos científicos teóricos de la época habían augurado para un corazón operando sin la atracción gravitatoria.",
      "Desafortunadamente, durante el reingreso a la atmósfera densa a más de cinco veces la velocidad del sonido, el sistema de paracaídas volvió a fallar por un desgarro en las cuerdas de suspensión provocado por la violencia del choque con las capas de aire. La cápsula se estrelló a alta velocidad en el desierto, acabando instantáneamente con la vida del primate. A pesar del fatídico desenlace, la instrumentación de registro fue recuperada casi intacta dentro de su caja de acero endurecido.",
      "El sacrificio de Albert II proporcionó la prueba científica definitiva de que un mamífero complejo puede sobrevivir a las brutales aceleraciones del despegue y a la ingravidez orbital sin sufrir paros cardiorrespiratorios ni daños cerebrales. Este hito demostró empíricamente a la comunidad médica internacional que el ser humano poseía la capacidad biológica para viajar al espacio, transformando la exploración espacial de una fantasía teórica en una meta de ingeniería viable."
    ],
    "fact": "El macaco rhesus Albert II se convirtió el 14 de junio de 1949 en el primer mamífero en la historia en cruzar la frontera del espacio exterior o línea de Kármán, registrando signos vitales estables y telemetría activa a 134 kilómetros sobre la superficie de la Tierra, demostrando que la microgravedad prolongada no paraliza el miocardio.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El registro electrocardiográfico telemétrico de Albert II durante el apogeo a 134 kilómetros de altitud aportó la primera evidencia empírica cuantitativa de que el sistema circulatorio de los mamíferos conserva la presión arterial media y el gasto cardíaco sin depender exclusivamente del gradiente de gravedad hidrostática terrestre."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los técnicos e ingenieros de White Sands apodaban cariñosamente al cohete V-2 número 47 de Albert II como 'La Flecha Sagrada' debido a la extraordinaria pureza de su trayectoria vertical, la cual no sufrió oscilaciones angulares perceptibles durante los primeros noventa segundos de propulsión hacia la alta atmósfera."
      }
    ]
  },
  {
    "id": "albert-3-4-redstone",
    diagramImage: '/assets/animales/infographic_m1/diagram_albert-3-4-redstone.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Albert III, IV y Yorick: Telemetría Continua',
    "title": "Albert III, IV y Yorick: Telemetría Continua",
    "color": "#8FAF7A",
    "btnImage": "/assets/animales/mamiferos_rhesus.webp",
    "image": "/assets/animales/hub_albert_ham.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_ensayos-biologicos.webp",
    "content": [
      "Entre finales de 1949 y 1951, el programa biomédico de Holloman continuó con los vuelos de Albert III, Albert IV y Albert VI (rebautizado como Yorick). Cada una de estas misiones introdujo sensores más refinados, electroencefalogramas de superficie y sistemas de amortiguación hidráulica en las literas de sujeción. La meta prioritaria de la Escuela de Medicina Aeroespacial era resolver el problema recurrente de la recuperación en paracaídas para conseguir que un mamífero regresara vivo del espacio.",
      "El vuelo de Albert III en noviembre de 1949 terminó en una explosión del cohete a diez kilómetros de altura debido a un fallo en la cámara de combustión del motor V-2. Sin embargo, el vuelo de Albert IV en diciembre de ese mismo año logró llegar a ciento treinta kilómetros de altura, transmitiendo telemetría continua de once canales que documentó la resistencia neuromuscular ante fuerzas de aceleración de hasta quince veces la gravedad terrestre sin rotura de vasos sanguíneos mayores.",
      "En septiembre de 1951, la misión de Albert VI (Yorick), acompañado por once ratones de laboratorio dentro de un cohete Aerobee, logró un avance histórico. La cápsula alcanzó setenta y dos kilómetros de altura y, gracias a un nuevo sistema de desaceleración balística con paracaídas de apertura retardada y cápsula amortiguada con espuma de poliuretano, el habitáculo tocó tierra sin destruirse. Yorick y sus compañeros ratones se convirtieron en los primeros mamíferos en sobrevivir al impacto de regreso de un vuelo en cohete espacial.",
      "A pesar de haber superado el impacto del aterrizaje con signos vitales estables, Yorick falleció un par de horas más tarde debido al sobrecalentamiento térmico acumulado dentro de la cápsula mientras esperaba al equipo de rescate bajo el abrasador sol del desierto de White Sands. Los once ratones, por su parte, sobrevivieron sin secuelas a largo plazo y fueron estudiados durante meses en los laboratorios de Wright-Patterson para evaluar la posible degradación tisular celular.",
      "La serie de misiones de Holloman transformó radicalmente la bioingeniería aeroespacial estadounidense. Se descubrió la necesidad crítica de dotar a las cápsulas espaciales de sistemas de control ambiental y refrigeración activa posaterrizaje, sellados herméticos con aislamiento térmico multicapa y transmisores de localización por radiobaliza, tecnologías que serían adoptadas directamente por el naciente Proyecto Mercury para proteger a los futuros astronautas."
    ],
    "fact": "El macaco Yorick (Albert VI) y once ratones de laboratorio a bordo del cohete Aerobee en septiembre de 1951 fueron los primeros mamíferos en sobrevivir físicamente al aterrizaje de una cápsula espacial tras alcanzar la alta atmósfera, validando los sistemas combinados de frenado por paracaídas y amortiguación balística.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La recuperación con vida de los once ratones de la misión Yorick en 1951 permitió llevar a cabo las primeras necropsias e historiales cromosómicos en mamíferos expuestos a la radiación ionizante primaria y rayos cósmicos pesados más allá de las capas densas de absorción atmosférica sin detectarse daño tisular agudo."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La litera de amortiguación anatómica de poliuretano y aleación ligera utilizada por Yorick durante el impacto en el desierto de White Sands fue preservada como pieza histórica fundamental y se exhibe en el Museo Nacional del Aire y el Espacio del Instituto Smithsonian en Washington D. C. para conmemorar este hito."
      }
    ]
  },
  {
    "id": "ham-chimpance-mr2",
    diagramImage: '/assets/animales/infographic_m1/diagram_ham-chimpance-mr2.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Ham el Chimpancé: El Vuelo Suborbital Mercury-Redstone 2',
    "title": "Ham el Chimpancé: El Vuelo Suborbital Mercury-Redstone 2",
    "color": "#FF9FFF",
    "btnImage": "/assets/animales/ham_training.webp",
    "image": "/assets/animales/ham_ship_3d.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_vuelo-primates.webp",
    "content": [
      "Para la misión Mercury-Redstone 2 (MR-2) del 31 de enero de 1961, la NASA seleccionó a un chimpancé de tres años llamado Ham, entrenado exhaustivamente en la Base Holloman de la Fuerza Aérea. A diferencia de los experimentos de la década anterior, Ham no fue un mero sujeto pasivo: fue entrenado mediante condicionamiento operante para manipular palancas mecánicas en respuesta a luces intermitentes de colores, evaluando si el cerebro de un primate podía ejecutar tareas cognitivas complejas en medio del estrés del despegue y la microgravedad.",
      "Durante el lanzamiento en Cabo Cañaveral, una falla en la válvula reguladora del cohete Redstone provocó una combustión acelerada del combustible de alcohol y oxígeno líquido. Esto impulsó a la nave a una velocidad imprevista de ocho mil quinientos kilómetros por hora y sometió a Ham a una tremenda aceleración de catorce punto siete G durante el ascenso, elevando la cápsula hasta los doscientos cincuenta y tres kilómetros de altitud, muy por encima de la trayectoria prevista.",
      "A pesar de las violentas fuerzas de inercia y de una repentina pérdida de presión en la cabina (que fue contenida por su traje espacial presurizado biológico), los registros de telemetría confirmaron que Ham continuó operando sus palancas con asombrosa precisión milimétrica. Su velocidad de respuesta fue apenas una fracción de segundo menor a la que registraba en los laboratorios de entrenamiento en tierra, demostrando que el raciocinio y la coordinación motora fina no se degradaban en el espacio.",
      "La cápsula amerizó en el Océano Atlántico a casi doscientos kilómetros de distancia del buque de rescate USS Donner debido a la trayectoria más alta de lo planificado. Para complicar las cosas, la cápsula comenzó a inundarse con agua marina por una válvula abierta. Afortunadamente, un helicóptero de rescate izó la nave a tiempo y extrajo a Ham sano y salvo. Al salir, Ham estrechó la mano del médico del barco y comió con entusiasmo una manzana y media naranja.",
      "El éxito indiscutible del vuelo de Ham demostró al mundo y a la dirección de la NASA que la cápsula espacial Mercury era segura, presurizable y funcional para un ser vivo. Con los datos médicos y de desempeño cognitivo de Ham en la mano, el director médico de la misión dio luz verde definitiva para que el astronauta Alan Shepard realizara el primer vuelo espacial tripulado por un estadounidense en mayo de ese mismo año."
    ],
    "fact": "El chimpancé Ham realizó pruebas operativas psicomotoras accionando palancas bajo una aceleración extrema de 14.7 G y 6.6 minutos de microgravedad en el vuelo Mercury-Redstone 2 del 31 de enero de 1961, demostrando formalmente que un ser vivo puede operar controles de vuelo y mantener reflejos intactos en el espacio exterior.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La telemetría bioelectrónica del traje presurizado de Ham evidenció un ritmo cardíaco basal de 70 latidos por minuto que ascendió a 170 latidos durante el empuje de 14.7 G, estabilizándose de forma inmediata en parámetros seguros al entrar en ingravidez, sin anomalías en la presión venosa central ni arritmias cardíacas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El nombre HAM fue creado como un acrónimo confidencial en honor al Holloman Aerospace Medical Center; la dirección de la NASA mantuvo en estricto secreto la identidad del chimpancé hasta después de su exitoso rescate en el mar para evitar controversias públicas si la misión suborbital sufría un percance catastrófico."
      }
    ]
  },
  {
    "id": "enos-orbita-mercury",
    diagramImage: '/assets/animales/infographic_m1/diagram_enos-orbita-mercury.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Enos: El Primer Primate Estadounidense en Órbita',
    "title": "Enos: El Primer Primate Estadounidense en Órbita",
    "color": "#00E4FF",
    "btnImage": "/assets/animales/ham_training.webp",
    "image": "/assets/animales/ham_ship_3d.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_vuelo-primates.webp",
    "content": [
      "Tras el salto suborbital de Ham y los vuelos de Shepard y Grissom, la NASA enfrentaba el desafío supremo: colocar una nave en órbita completa alrededor de la Tierra impulsada por el potente cohete Atlas. Para validar que el sistema de soporte vital funcionaba durante horas consecutivas en el vacío espacial antes de comprometer la vida de John Glenn, se preparó la misión Mercury-Atlas 5 con el chimpancé Enos a bordo el 29 de noviembre de 1961.",
      "Enos había recibido más de mil doscientas horas de entrenamiento psicomotor avanzado en simuladores centrífugos, cámaras de aislamiento sensorial y cabinas térmicas en la Base Holloman. Durante su vuelo orbital, el chimpancé debía resolver secuencias lógicas accionando interruptores y respondiendo a patrones visuales para recibir pequeñas recompensas líquidas, soportando largas horas de ingravidez continua a veintiocho mil kilómetros por hora.",
      "Durante la segunda órbita, ocurrió un grave fallo electromecánico en el panel de condicionamiento: el circuito eléctrico comenzó a administrarle descargas en los pies incluso cuando Enos accionaba la palanca correcta. A pesar de la injusta penalización eléctrica y del dolor resultante, Enos demostró una tenacidad cognitiva extraordinaria: siguió analizando las luces y pulsando los comandos correctos sin entrar en pánico ni abandonar la tarea operativa.",
      "Simultáneamente, los sensores térmicos de la nave detectaron un sobrecalentamiento en la cabina y una avería en los propulsores de actitud de gas helio, lo que causaba un balanceo descontrolado. El director de vuelo Christopher Kraft tomó la prudente decisión de cancelar la tercera órbita y ordenar el reingreso inmediato tras completar dos vueltas al planeta. Enos amerizó en el mar de Puerto Rico y fue recuperado en excelente estado de salud física y mental.",
      "La misión orbital de Enos fue la prueba de fuego definitiva para el hardware del Proyecto Mercury. Demostró que el cohete Atlas era confiable para transportar vidas, que el traje espacial protegía del calor excesivo y que un piloto primate podía mantener la serenidad y la precisión mental bajo estrés técnico severo. El vuelo allanó el camino directo para que John Glenn se convirtiera en el primer estadounidense en orbitar la Tierra tres meses después."
    ],
    "fact": "El chimpancé Enos completó dos órbitas terrestres completas a 28,000 km/h en la misión Mercury-Atlas 5 el 29 de noviembre de 1961, manteniendo una concentración mental y disciplina psicomotora asombrosas a pesar de sufrir descargas eléctricas accidentales por una falla de circuito y sobrecalentamiento en la cabina.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Durante tres horas y quince minutos de vuelo orbital continuo, los sensores biomédicos de Enos registraron la excreción urinaria, temperatura corporal y respuesta refleja neuromuscular en ingravidez completa, refutando los temores de los neurólogos sobre desorientación psicomotora o alucinaciones inducidas por la microgravedad."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Al completarse con éxito el amerizaje de rescate en el mar de Puerto Rico y abrirse la escotilla de la cápsula a bordo del destructor USS Stormes, Enos demostró tal vitalidad y júbilo que dio saltos en la cubierta, tomó la mano de su veterinario y comió gustoso rodajas de plátano fresco ante las cámaras de la prensa naval."
      }
    ]
  },
  {
    "id": "baker-able-jupiter",
    diagramImage: '/assets/animales/infographic_m1/diagram_baker-able-jupiter.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Able y Baker: Supervivencia Heroica en el Cohete Júpiter',
    "title": "Able y Baker: Supervivencia Heroica en el Cohete Júpiter",
    "color": "#FFD700",
    "btnImage": "/assets/animales/mamiferos_rhesus.webp",
    "image": "/assets/animales/hub_albert_ham.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_ensayos-biologicos.webp",
    "content": [
      "El 28 de mayo de 1959, dos monas llamadas Able (una macaco rhesus nacida en Kansas) y Baker (una pequeña mona ardilla de Perú) abordaron la ojiva del misil balístico Júpiter AM-18 en Cabo Cañaveral. Diseñada por el equipo de ingenieros de Wernher von Braun y la Marina estadounidense, esta misión fue concebida como la primera prueba biológica integral con escudo térmico ablativo de reingreso militar de alta velocidad.",
      "El cohete alcanzó una altitud de quinientos catorce kilómetros y recorrió dos mil setecientos kilómetros de distancia horizontal sobre el Atlántico, alcanzando una velocidad de dieciséis mil kilómetros por hora y sometiendo a las tripulantes a fuerzas de frenado aerodinámico de hasta treinta y ocho G durante la violenta caída balística. Ambas contaban con sistemas de telemetría independientes acoplados a sus diminutas literas de fibra de vidrio.",
      "Las monas pasaron nueve minutos completos en estado de ingravidez pura mientras surcaban la ionosfera. Los electrodos registraron que, tras la conmoción inicial del empuje del despegue, los ritmos respiratorios y la actividad cardíaca de Able y Baker retornaron a niveles basales estables durante el vuelo orbital, confirmando la resiliencia innata del sistema nervioso central de los primates ante la pérdida de peso aparente.",
      "El escudo ablativo resistió de manera impecable los más de mil seiscientos grados centígrados de fricción atmosférica y los paracaídas se desplegaron a la perfección. La ojiva amerizó cerca de la isla de Antigua y el buque USS Kiowa rescató a ambas monas completamente vivas y activas. Fue la primera vez en la historia de los Estados Unidos que mamíferos regresaban con vida e ilesos de un viaje espacial balístico a gran escala.",
      "La mona Baker se convirtió en una celebridad mundial y un símbolo del avance biomédico espacial. Fue condecorada con medallas de mérito civil y vivió durante veinticinco años en el Centro Espacial y de Cohetes de Alabama en Huntsville, donde falleció pacíficamente de vejez en 1984 a los veintisiete años de edad, habiendo inspirado a millones de estudiantes y futuros ingenieros espaciales en todo el planeta."
    ],
    "fact": "Las monas Able y Baker sobrevivieron a un reingreso atmosférico balístico a más de 16,000 km/h soportando un pico de 38 G de desaceleración en el cono frontal del misil Júpiter AM-18 en mayo de 1959, convirtiéndose en los primeros seres vivos de los Estados Unidos en regresar ilesos de un vuelo espacial a 514 km de altitud.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La litera biocontenida de la mona Baker integró un electroencefalograma de cuatro canales acoplado a un transmisor miniaturizado de modulación de frecuencia (FM) de estado sólido, siendo uno de los primeros hitos tecnológicos mundiales en bioelectrónica de semiconductores aplicada con éxito a la medicina de vuelo orbital."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La mona ardilla Baker vivió veinticinco años tras su histórico vuelo espacial en el Centro Espacial y de Cohetes de Alabama en Huntsville, donde falleció pacíficamente por causas naturales en 1984 a los veintisiete años; miles de visitantes continúan depositando plátanos sobre su tumba en homenaje a su legado espacial."
      }
    ]
  },
  {
    "id": "legado-biomedico-espacial",
    diagramImage: '/assets/animales/infographic_m1/diagram_legado-biomedico-espacial.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Legado Biomédico: El Camino Hacia el Ser Humano',
    "title": "El Legado Biomédico: El Camino Hacia el Ser Humano",
    "color": "#A8FF78",
    "btnImage": "/assets/animales/mamiferos_rhesus.webp",
    "image": "/assets/animales/hub_albert_ham.webp",
    "bannerImage": "/assets/animales/infographic_m1/banner_vuelo-primates.webp",
    "content": [
      "Las misiones de primates entre 1948 y 1961 no solo fueron proezas de audacia técnica, sino que constituyeron el cimiento experimental insustituible sobre el cual se construyó la totalidad de la medicina espacial moderna. Antes de estos vuelos, eminentes teóricos médicos pronosticaban que el corazón humano no podría bombear sangre hacia el cerebro en ingravidez, que los ojos perderían el enfoque retiniano y que la digestión se detendría por completo.",
      "Cada registro electrocardiográfico, cada lectura respiratoria y cada palanca accionada por Albert, Ham y Enos aportó datos biomédicos cuantitativos que demolieron los mitos del colapso fisiológico. Gracias a sus mediciones, los ingenieros de la NASA y de las agencias espaciales del mundo aprendieron a diseñar trajes espaciales presurizados con regulación térmica activa, mezclas gaseosas respirables de oxígeno y nitrógeno, y literas de sustentación anatómica.",
      "Asimismo, las tecnologías pioneras desarrolladas para monitorear a los primates en vuelo balístico dieron origen a aplicaciones de uso civil directo en la medicina hospitalaria terrestre. Los pequeños sensores de frecuencia cardíaca telemétrica, los electrodos adheribles de monitorización intensiva y los sistemas inalámbricos de reanimación médica que hoy salvan vidas en unidades de cuidados intensivos y ambulancias nacieron en los laboratorios de Holloman y White Sands.",
      "El sacrificio y desempeño de estos animales también impulsó una profunda evolución bioética en la comunidad científica internacional. Las dificultades enfrentadas durante las primeras misiones de los cohetes V-2 obligaron a formular normativas internacionales estrictas sobre bienestar animal, protocolos no invasivos de contención y sistemas de respaldo de emergencia que hoy regulan cualquier investigación biológica en órbita terrestre y en la Estación Espacial Internacional.",
      "Al conmemorar los grandes hitos de astronautas legendarios como Yuri Gagarin, Alan Shepard o John Glenn, la historia aeroespacial reconoce que ninguno de sus logros habría sido posible sin el camino trazado por estos pioneros biológicos. Sus viajes a través de la atmósfera y el espacio exterior demostraron de forma concluyente que la vida de nuestro planeta puede aventurarse más allá de los confines de la Tierra y conquistar el cosmos."
    ],
    "fact": "La arquitectura telemétrica cardiovascular, los electrodos adhesivos secos y los protocolos de oxigenación diseñados para los primates en Holloman y White Sands fueron transferidos íntegramente a la medicina intensiva hospitalaria terrestre, dando origen directo a las modernas unidades de cuidados intensivos y monitoreo de urgencias.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los rigurosos ensayos biomecánicos en centrífugas de aceleración angular con primates definieron las tablas cuantitativas de tolerancia biológica a fuerzas de aceleración vectorial transversal (Gx) y lineal (Gz), dictando el diseño anatómico y la postura supina de las butacas de amortiguación en las cápsulas Mercury y Apolo."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los jardines exteriores del Centro de Vuelo Espacial Goddard de la NASA se erige una placa de bronce conmemorativa que honra expresamente a los primates y animales pioneros cuyos datos fisiológicos abrieron con seguridad las compuertas de la exploración espacial para que los primeros seres humanos pudieran alcanzar la Luna."
      }
    ]
  }
];

export default function InteractiveInfographic_AnimalesM2() {
  const [selectedNode, setSelectedNode] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBiblio, setShowBiblio] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpandable = (nodeId, index) => {
    const key = `${nodeId}-${index}`;
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const node = INFOGRAPHIC_NODES[selectedNode];

  return (
    <div ref={containerRef} style={{
      background: 'radial-gradient(ellipse at 50% 20%, #1a1a2e 0%, #0d0d15 60%, #050508 100%)',
      minHeight: '100vh',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '16px 8px' : '32px 16px',
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 40 }}>
        <span style={{
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          fontWeight: 700,
          color: '#4FA3B5',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 8,
        }}>
          MÓDULO: ANIMALES_ALBERT_HAM
        </span>
        <h1 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: 0,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          Primates en el Espacio: De los Monos Albert a Ham y Enos
        </h1>
      </header>

      {/* Selector de Nodos Circulares */}
      <div style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 12 : 20,
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? 16 : 32,
        paddingLeft: isMobile ? 8 : 0,
        paddingRight: isMobile ? 8 : 0,
        scrollbarWidth: 'none',
      }}>
        {INFOGRAPHIC_NODES.map((n, idx) => {
          const isSelected = idx === selectedNode;
          return (
            <button
              key={n.id}
              onClick={() => setSelectedNode(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: isMobile ? 54 : 70,
                height: isMobile ? 54 : 70,
                borderRadius: '50%',
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${n.color}, #ffffff)`
                  : 'rgba(255,255,255,0.1)',
                boxShadow: isSelected
                  ? `0 0 20px ${n.color}80`
                  : 'none',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0a0a14',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={n.btnImage}
                    alt={n.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <span style={{
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? n.color : '#94a3b8',
                marginTop: 8,
                maxWidth: isMobile ? 70 : 90,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {n.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${node.color}30`,
            borderRadius: 24,
            padding: isMobile ? 20 : 36,
            backdropFilter: 'blur(16px)',
            boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${node.color}15`,
          }}
        >
          {/* Banner Panoramico si existe */}
          {node.bannerImage && (
            <div style={{
              width: '100%',
              height: isMobile ? 180 : 280,
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 28,
              position: 'relative',
              cursor: 'zoom-in',
            }} onClick={() => setLightboxSrc(node.bannerImage)}

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
 >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.bannerImage}
                alt={node.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)',
              }} />
            </div>
          )}

          {/* Titulo con Mini-Avatar Circular */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{
              display: 'inline-block',
              width: 36,
              height: 36,
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2px solid ${node.color}`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.btnImage}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </span>
            <h2 style={{
              fontSize: isMobile ? '1.4rem' : '1.85rem',
              fontWeight: 800,
              color: node.color,
              margin: 0,
              lineHeight: 1.25,
            }}>
              {node.title}
            </h2>
          </div>

          {/* Layout 1fr 1fr con Hero Image y Texto */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 36,
            alignItems: 'start',
            marginBottom: 28,
          }}>
            {/* Hero Image */}
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${node.color}40`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                cursor: 'zoom-in',
                position: 'relative',
                maxHeight: 400,
              }}
              onClick={() => setLightboxSrc(node.image)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.image}
                alt={node.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Primeros 2 Parrafos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {node.content.slice(0, 2).map((para, i) => (
                <p key={i} style={{
                  fontSize: isMobile ? '0.92rem' : '1rem',
                  lineHeight: 1.75,
                  color: '#cbd5e1',
                  margin: 0,
                  textAlign: 'justify',
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Parrafos restantes (3, 4, 5) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {node.content.slice(2).map((para, i) => (
              <p key={i + 2} style={{
                fontSize: isMobile ? '0.92rem' : '1rem',
                lineHeight: 1.75,
                color: '#cbd5e1',
                margin: 0,
                textAlign: 'justify',
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Fact Destacado */}
          {node.fact && (
            <div style={{
              background: `linear-gradient(135deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              borderRadius: '0 16px 16px 0',
              padding: '16px 20px',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Sparkles size={18} color={node.color} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: node.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hecho Histórico Clave
                </span>
              </div>
              <p style={{ fontSize: isMobile ? '0.9rem' : '0.95rem', lineHeight: 1.65, color: '#f1f5f9', margin: 0, fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          )}

          {/* Expandables */}
          {node.expandables && node.expandables.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              {node.expandables.map((exp, idx) => {
                const isExpanded = !!expandedSections[`${node.id}-${idx}`];
                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.03)',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => toggleExpandable(node.id, idx)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        color: '#f8fafc',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {exp.icon === 'atom' ? (
                          <Atom size={18} color={node.color} />
                        ) : (
                          <Sparkles size={18} color={node.color} />
                        )}
                        <span>{exp.label}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: '#94a3b8',
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ padding: '0 18px 16px 18px' }}
                        >
                          <p style={{
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            color: '#94a3b8',
                            margin: 0,
                            paddingTop: 8,
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                          }}>
                            {exp.text}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bibliografia Colapsable */}
      <div style={{ maxWidth: 1100, margin: '36px auto 0', padding: '0 16px' }}>
        <button
          onClick={() => setShowBiblio(!showBiblio)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '10px 18px',
            color: '#94a3b8',
            fontSize: '0.85rem',
            cursor: 'pointer',
            margin: '0 auto',
            transition: 'all 0.2s',
          }}
        >
          <BookOpen size={16} />
          <span>{showBiblio ? 'Ocultar Referencias Bibliográficas' : 'Ver Referencias Bibliográficas'}</span>
          <ChevronDown
            size={16}
            style={{
              transform: showBiblio ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
        {showBiblio && (
          <div style={{
            marginTop: 16,
            padding: 20,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8 }}>
              {BIBLIOGRAPHY.map((b, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />
    </div>
  );
}
