'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// SVG Decorative Elements
function DecoOrbit({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.6" transform="rotate(-30 30 30)" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      <circle cx="48" cy="18" r="2.5" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoStars({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L33 25 L48 28 L33 31 L30 46 L27 31 L12 28 L27 25 Z" fill={color} opacity="0.8" />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.6" />
      <circle cx="45" cy="45" r="1.5" fill={color} opacity="0.5" />
      <circle cx="10" cy="40" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoShuttle({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 Q35 30 40 45 L20 45 Q25 30 30 10" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 45 L15 52 L45 52 L40 45" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      <line x1="30" y1="45" x2="30" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const DECO_MAP = {
  'sally-ride': [DecoStars, DecoOrbit, DecoShuttle],
  'sts-7': [DecoShuttle, DecoOrbit, DecoStars],
  'shuttle-program': [DecoShuttle, DecoStars, DecoOrbit],
  'robotic-arm': [DecoOrbit, DecoShuttle, DecoStars],
  'challenger': [DecoStars, DecoOrbit, DecoShuttle],
  'legacy': [DecoOrbit, DecoStars, DecoShuttle],
}; 

const BIBLIOGRAPHY = [
  'Ride, S. (1986). \'To Space and Back\', Lothrop, Lee & Shepard Books, New York.',
  'O\'Shaughnessy, T. (2015). \'Sally Ride: A Photobiography of America\\\'s Pioneering Woman in Space\', Roaring Brook Press.',
  'Presidential Commission on the Space Shuttle Challenger Accident (1986). \'Report to the President\', Washington D.C.',
  'Jenkins, D. R. (2001). \'Space Shuttle: The History of the National Space Transportation System\', Voyageur Press.',
  'Hitt, D., Garber, S. (2020). \'Homesteading Space: The Skylab Story and the Space Shuttle\', University of Nebraska Press.',
  'Evans, B. (2007). \'Space Shuttle Challenger: Ten Journeys into the Unknown\', Springer Science & Business Media.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'sally-ride',
    title: 'Primeros Pasos',
    color: '#D87D4A',
    btnImage: '/assets/pioneros/infographic_m7/btn_sally-ride.jpg',
    image: '/assets/pioneros/infographic_m7/hero_sally-ride.jpg',
    content: [
      'Sally Kristen Ride se convirtió en la primera mujer estadounidense en viajar al espacio exterior, marcando un hito fundamental en la historia de la exploración espacial y desafiando las barreras de género dentro de un programa predominantemente masculino. Su ingreso a la Administración Nacional de Aeronáutica y del Espacio (NASA) se produjo en 1978, formando parte de la revolucionaria y esperada clase de astronautas conocida como el Grupo 8. Este grupo fue el primero en incluir explícitamente a mujeres, minorías étnicas y civiles especialistas de misión, diversificando la plantilla tras años de exclusividad militar. Ride, con un doctorado en física de la Universidad de Stanford enfocado en la interacción de los rayos X con el medio interestelar, aportó un perfil sumamente técnico y analítico que resultaría indispensable para el desarrollo operativo del nuevo Transbordador Espacial, demostrando desde el principio unas capacidades excepcionales.',
      'Durante sus años de formación y entrenamiento en el Centro Espacial Johnson, Sally Ride destacó no solo por sus conocimientos en astrofísica, sino también por sus habilidades excepcionales de comunicación, trabajo en equipo y adaptabilidad en condiciones de alta presión simuladas en centrifugadoras y cámaras de vacío. Antes de ser asignada a una misión espacial, desempeñó el papel crucial de comunicadora de cabina (CAPCOM) durante las históricas misiones STS-2 y STS-3 del Transbordador Espacial Columbia, sirviendo como enlace vital de comunicaciones entre el control de la misión en tierra y los astronautas en órbita. Su profundo conocimiento de los sistemas de la nave espacial, adquirido mediante rigurosas horas de estudio y simulaciones complejas, la posicionó como una candidata sobresaliente para operar equipos altamente sofisticados en futuras misiones tripuladas, destacándose en un entorno altamente competitivo y exigente.',
      'El anuncio oficial de su asignación como Especialista de Misión para el vuelo STS-7 del Transbordador Espacial Challenger generó una atención mediática sin precedentes a nivel internacional, enfocándose lamentablemente en muchas ocasiones en cuestiones triviales sobre su género en lugar de sus notables cualificaciones científicas y técnicas. A pesar de las constantes y a veces condescendientes preguntas de los medios de comunicación acerca de si lloraría bajo presión o sobre las instalaciones a bordo para mujeres, Ride mantuvo un enfoque estrictamente profesional y estoico, redirigiendo pacientemente las conversaciones hacia los objetivos científicos de la misión y la complejidad técnica de las operaciones espaciales. Su actitud profesional y su firme dedicación a la misión sirvieron para establecer un nuevo estándar de excelencia profesional, allanando el camino para que las futuras generaciones de astronautas femeninas fueran juzgadas y valoradas exclusivamente por sus méritos, capacidades técnicas y contribuciones científicas al programa espacial.',
      'La preparación para la misión STS-7 implicó un régimen de entrenamiento físico y mental exhaustivo, abarcando desde simulaciones de aborto de despegue en el Simulador de Movimiento de la Base hasta la práctica de procedimientos de emergencia en el Laboratorio de Flotabilidad Neutra (NBL) para emular la ingravidez, aunque los paseos espaciales no estaban planificados para esta misión en particular. Sally Ride se especializó intensivamente en la operación del Sistema de Manipulación Remota (RMS), más conocido como el Canadarm, un complejo brazo robótico articulado diseñado para desplegar y recuperar satélites pesados desde la bahía de carga del transbordador. Su destreza técnica en el manejo de este sistema electro-mecánico avanzado fue fundamental, ya que requería una coordinación ojo-mano excepcional, una comprensión profunda de la cinemática en microgravedad y la capacidad de reaccionar rápidamente ante cualquier anomalía imprevista durante el despliegue crítico de la carga útil orbital de comunicaciones.',
      'El lanzamiento exitoso del Transbordador Espacial Challenger el 18 de junio de 1983 desde el Centro Espacial Kennedy en Florida no solo catapultó a Sally Ride a la órbita terrestre baja, sino que también la consolidó permanentemente como un ícono duradero de la exploración espacial y del empoderamiento femenino en las disciplinas de la ciencia, tecnología, ingeniería y matemáticas (STEM). A lo largo de la histórica misión de seis días, Ride desempeñó sus funciones de manera impecable, demostrando que las mujeres poseían exactamente la misma resistencia física, agudeza mental y capacidad operativa que sus homólogos masculinos en el implacable e impredecible entorno del espacio exterior. Su legado trasciende el mero logro histórico de ser la primera estadounidense en el espacio; radica en la validación definitiva de la competencia femenina en la vanguardia tecnológica y en su impacto perdurable como modelo a seguir, inspirando a incontables mujeres a perseguir carreras científicas y a explorar los límites de nuestro universo conocido.'
    ],
    expandables: [
      { label: 'Reclutamiento', icon: 'clock', text: 'NASA recibió más de 8000 solicitudes cuando abrió el proceso en 1977. Sally Ride descubrió el anuncio en el periódico estudiantil de Stanford y decidió aplicar inmediatamente.' },
      { label: 'Formación en Física', icon: 'atom', text: 'Su investigación doctoral versaba sobre la interacción de los rayos X con el medio interestelar, demostrando un nivel matemático e intelectual sobresaliente que le fue sumamente útil.' }
    ],
    fact: 'Sally Ride era también una jugadora de tenis de nivel nacional y en su juventud consideró seriamente dedicarse al deporte profesional.'
  },
  {
    id: 'sts-7',
    title: 'Misión STS-7',
    color: '#D4B872',
    btnImage: '/assets/pioneros/infographic_m7/btn_sts-7.jpg',
    image: '/assets/pioneros/infographic_m7/hero_sts-7.jpg',
    content: [
      'La misión STS-7, que despegó el 18 de junio de 1983, representó el séptimo vuelo orbital del programa del Transbordador Espacial y el segundo viaje al espacio para el orbitador Challenger, consolidándose como un hito rotundo en la historia espacial estadounidense al incluir a la primera mujer del país en su tripulación. Esta misión fue diseñada para demostrar la creciente madurez operativa del programa, transportando no solo a la tripulación más grande hasta la fecha con cinco miembros altamente capacitados, sino también un cargamento de gran complejidad tecnológica que requería maniobras precisas y una coordinación impecable en microgravedad. El comandante Robert L. Crippen lideró este vuelo histórico junto con el piloto Frederick H. Hauck y los especialistas de misión John M. Fabian, Norman E. Thagard y, por supuesto, la doctora Sally K. Ride, quienes conformaron un equipo multidisciplinario cuyas capacidades conjuntas fueron cruciales para el éxito de cada uno de los objetivos planteados y ejecutados meticulosamente en el riguroso entorno orbital.',
      'Durante los intensos seis días que duró la misión en órbita terrestre baja, la tripulación del STS-7 ejecutó con notable precisión una serie continua de experimentos científicos complejos y despliegues satelitales que validaron la destacada versatilidad y capacidad de carga útil del Transbordador Espacial. El despliegue de los satélites de comunicaciones comerciales Anik C2, perteneciente a Telesat de Canadá, y Palapa B1, operado por el gobierno de Indonesia, demostró inequívocamente la utilidad comercial de la flota de transbordadores para colocar infraestructuras de comunicación masivas en el espacio. Estas operaciones altamente delicadas requirieron el uso experto del sistema de despliegue PAM-D (Payload Assist Module), un motor de cohete de combustible sólido que, una vez liberado el satélite de la bahía de carga, se encendía de forma autónoma para impulsar la nave espacial hacia su órbita geoestacionaria final, exigiendo a los especialistas de misión una temporización exacta y un control de los parámetros inerciales sumamente riguroso.',
      'Uno de los logros técnicos más destacados y celebrados de la misión STS-7 fue el primer despliegue y posterior recuperación en órbita del satélite científico SPAS-1 (Shuttle Pallet Satellite), una plataforma reutilizable de investigación fabricada en Alemania Occidental y diseñada específicamente para operar en conjunto con el orbitador. La doctora Sally Ride y el especialista John Fabian operaron magistralmente el Canadarm (el Brazo Manipulador Remoto o RMS) para liberar cuidadosamente la plataforma científica y dejarla volar en formación autónoma junto al Challenger durante varias horas, recabando datos invaluables sobre la contaminación del entorno cercano y realizando experimentos sobre el procesamiento de materiales en microgravedad. Posteriormente, ejecutaron maniobras orbitales de aproximación de alta precisión para capturar nuevamente el SPAS-1 con el brazo robótico y asegurarlo firmemente en la bahía de carga para su retorno a la Tierra, validando la capacidad del transbordador para recuperar satélites defectuosos o realizar mantenimiento orbital a gran escala.',
      'La investigación científica a bordo del Challenger durante esta misión no se limitó únicamente a la tecnología de satélites; abarcó una amplia gama de experimentos biomédicos, metalúrgicos y de física de fluidos patrocinados tanto por instituciones gubernamentales como por iniciativas estudiantiles a través del Programa de Participación Estudiantil del Transbordador. El especialista de misión Norman E. Thagard, un médico calificado incorporado a la tripulación tardíamente, llevó a cabo investigaciones pioneras y exhaustivas sobre el Síndrome de Adaptación Espacial, un tipo agudo de mareo por movimiento que afectaba a numerosos astronautas durante los primeros días en ingravidez. Además, la cámara fotográfica de formato ancho alojada en el SPAS-1 capturó las primeras y asombrosas imágenes de un Transbordador Espacial volando libremente sobre el telón de fondo de la Tierra, proporcionando tanto datos valiosos para el análisis de los sistemas de protección térmica como fotografías icónicas que capturaron la imaginación del público mundial y fortalecieron el apoyo cívico al programa.',
      'Tras completar de manera excepcional todos los objetivos científicos y comerciales planificados, el Transbordador Espacial Challenger inició su secuencia de reingreso a la atmósfera terrestre, enfrentando las extremas temperaturas generadas por la fricción aerodinámica que pusieron a prueba una vez más el crítico escudo térmico compuesto por miles de losetas de sílice. El aterrizaje, originalmente programado para llevarse a cabo en la pista de aterrizaje del Centro Espacial Kennedy en Florida, tuvo que ser desviado hacia la Base de la Fuerza Aérea Edwards en California debido a condiciones meteorológicas adversas inaceptables en el sitio primario. El 24 de junio de 1983, el Challenger aterrizó con una suavidad impecable en la superficie desértica seca y plana de la pista del lago seco, concluyendo triunfalmente la misión STS-7 y consolidando firmemente el legado de Sally Ride no solo como una pionera firme de los derechos de las mujeres en las ciencias, sino como una astronauta de élite cuyas notables habilidades contribuyeron directamente al dominio orbital de la humanidad.'
    ],
    expandables: [
      { label: 'Sexto Sentido', icon: 'zap', text: 'Durante el reingreso atmosférico, la fricción genera una envoltura de plasma alrededor de la nave, cortando todas las comunicaciones de radio temporariamente. Ride lo describió como un momento profundamente meditativo.' },
      { label: 'Formación Libre', icon: 'atom', text: 'El satélite SPAS-1 permitió la primera imagen del orbitador en el espacio capturada desde una plataforma independiente en vuelo libre, una postal icónica de los años 80.' }
    ],
    fact: 'En su vuelo, cargaba un parche de misión diseñado por la tripulación que presentaba el símbolo de Venus entrelazado sutilmente.'
  },
  {
    id: 'shuttle-program',
    title: 'Transbordador Espacial',
    color: '#80DEEA',
    btnImage: '/assets/pioneros/infographic_m7/btn_shuttle-program.jpg',
    image: '/assets/pioneros/infographic_m7/hero_shuttle-program.jpg',
    content: [
      'El programa del Transbordador Espacial, concebido formalmente a principios de la década de 1970 bajo el acrónimo técnico STS (Space Transportation System), representó el proyecto más ambicioso e intrincado emprendido por la NASA después del histórico y exitoso programa Apolo. La premisa fundamental y visionaria detrás del transbordador era la creación de un vehículo de acceso al espacio parcialmente reutilizable que pudiera despegar verticalmente como un cohete convencional y aterrizar horizontalmente como un avión comercial en una pista terrestre. Esta innovación estructural y filosófica prometía reducir drásticamente los costos exorbitantes de colocar cargas útiles en órbita y aumentar enormemente la frecuencia de los lanzamientos, imaginando un futuro en el que el acceso regular, rutinario e institucionalizado a la órbita terrestre baja fuera tan común y predecible como el despliegue de operaciones de aviación a nivel comercial en el siglo veinte.',
      'La arquitectura del sistema del Transbordador Espacial constaba de tres componentes principales y enormes, cada uno presentando serios desafíos para la ingeniería aeroespacial y de materiales de la época: el Vehículo Orbitador alado (el transbordador propiamente dicho), el inmenso Tanque Externo de combustible líquido prescindible (ET) y los dos gigantescos Cohetes Aceleradores de Combustible Sólido reutilizables (SRB). El orbitador, que funcionaba simultáneamente como nave espacial, hábitat para la tripulación humana y planeador aerodinámico durante el reingreso atmosférico, albergaba los tres sofisticados Motores Principales del Transbordador Espacial (SSME), conocidos por ser los motores de cohete de ciclo de combustión por etapas más avanzados, eficientes y complejos térmicamente jamás construidos en la historia. Los SRB proporcionaban más del setenta y cinco por ciento del inmenso empuje necesario durante los críticos primeros dos minutos del ascenso supersónico, después de lo cual se separaban pirotécnicamente para ser recuperados con paracaídas en las aguas del océano Atlántico y posteriormente reacondicionados para su uso en futuras y exigentes misiones.',
      'Uno de los logros de ingeniería más asombrosos y a la vez críticos del Transbordador Espacial fue el Sistema de Protección Térmica (TPS), una compleja e ingeniosa barrera diseñada específicamente para salvaguardar la integridad estructural de aluminio del orbitador de las temperaturas abrasadoras que superaban los 1,650 grados Celsius durante la fricción hiperveloz del reingreso atmosférico. Este intrincado sistema estaba compuesto predominantemente por más de veinticuatro mil losetas individuales de sílice purificada y paneles reforzados de carbono-carbono (RCC) instalados en los bordes de ataque de las alas y en el cono del morro. Cada loseta, mecanizada a la medida y adherida manualmente a la estructura subyacente con un elastómero de silicona espacial (RTV), poseía propiedades de disipación de calor tan singulares que, apenas unos segundos después de ser extraída de un horno incandescente, una loseta de sílice podía ser sostenida a mano desnuda por sus bordes, una maravilla de la ciencia de los materiales que habilitó la supervivencia aerodinámica del vehículo.',
      'A pesar de sus considerables capacidades operativas y sus innegables e históricos éxitos científicos, el sistema demostró ser órdenes de magnitud más frágil, costoso de mantener y peligroso de operar de lo que las visiones excesivamente optimistas de sus primeros arquitectos y planificadores gubernamentales habían anticipado en los documentos de diseño. La inmensa complejidad de los Motores Principales y la absoluta fragilidad inherente del Sistema de Protección Térmica requirieron de un mantenimiento exhaustivo, meticuloso y altamente intensivo en mano de obra entre cada vuelo, evaporando la promesa inicial de retornos rápidos y operaciones rutinarias económicas. Lamentablemente, la complejidad catastróficamente subestimada de estas interfaces operativas se hizo dolorosamente evidente en las trágicas y desgarradoras pérdidas de los transbordadores Challenger en 1986 y Columbia en 2003, desastres irreparables que resaltaron amargamente los riesgos inherentes y sistémicos de propulsar vehículos tripulados complejos más allá del frágil escudo protector de nuestra atmósfera.',
      'El legado integral del programa del Transbordador Espacial, que abarcó un asombroso total de 135 misiones desde 1981 hasta su conclusión definitiva en 2011, es innegablemente significativo, profundo y multifacético, transformando para siempre nuestro enfoque de la investigación extraplanetaria y la cooperación astronáutica mundial. A pesar de los altos costos financieros y humanos, los transbordadores desplegaron observatorios revolucionarios como el Telescopio Espacial Hubble, el Telescopio Espacial Spitzer y el Observatorio de Rayos X Chandra, los cuales han reescrito completamente nuestros libros de texto de astrofísica y cosmología modernas. Además, las misiones del transbordador sirvieron como los camiones de carga pesada insustituibles requeridos para transportar y ensamblar laboriosamente los enormes módulos y armazones que componen la Estación Espacial Internacional (ISS), el proyecto colaborativo multinacional más ambicioso de la humanidad que asegura una presencia científica y pacífica continua en el implacable entorno del espacio orbital profundo.'
    ],
    expandables: [
      { label: 'Escudo Térmico', icon: 'zap', text: 'Las losetas estaban diseñadas de tal manera que si la nave perdía un número específico en áreas críticas durante el despegue, el orbitador no podría sobrevivir a la reentrada.' },
      { label: 'El Computador', icon: 'clock', text: 'Las computadoras originales del transbordador utilizaban memoria de núcleo magnético, que era resistente a la radiación cósmica que a menudo causa reinicios en las computadoras modernas.' }
    ],
    fact: 'El orbitador estaba recubierto de casi 24,000 losetas individuales, todas distintas y con números de serie únicos.'
  },
  {
    id: 'robotic-arm',
    title: 'El Brazo Robótico',
    color: '#3949AB',
    btnImage: '/assets/pioneros/infographic_m7/btn_robotic-arm.jpg',
    image: '/assets/pioneros/infographic_m7/hero_robotic-arm.jpg',
    content: [
      'El Sistema de Manipulación Remota del Transbordador (SRMS), conocido mundialmente como Canadarm, representa uno de los logros más significativos de la ingeniería robótica espacial y constituyó una contribución crítica de la Agencia Espacial Canadiense (CSA) y el Consejo Nacional de Investigación de Canadá al programa del Transbordador Espacial de la NASA. Diseñado, desarrollado y fabricado principalmente por la empresa aeroespacial canadiense Spar Aerospace bajo rigurosas especificaciones gubernamentales, este brazo articulado altamente sofisticado revolucionó por completo la forma en que los seres humanos interactuaban con grandes cargas útiles y estructuras masivas en el implacable y traicionero entorno de la órbita terrestre baja. Su inclusión en el diseño fundamental del orbitador fue determinante para la viabilidad económica y operativa de las misiones que requerían el despliegue de observatorios espaciales pesados, la captura meticulosa de satélites averiados o la posterior construcción modular y progresiva de la Estación Espacial Internacional (ISS).',
      'Desde el punto de vista mecánico y cinemático, el Canadarm fue diseñado con precisión para simular el movimiento complejo y fluido de un brazo humano a una escala masiva de 15.2 metros de longitud y un peso terrestre aproximado de 410 kilogramos, contando con un total de seis grados de libertad. Estaba equipado con juntas electromecánicas altamente especializadas que funcionaban como hombro (cabeceo y guiñada), codo (cabeceo) y muñeca (cabeceo, guiñada y balanceo), permitiendo a los operadores maniobrar cargas enormes con una precisión casi milimétrica en el espacio tridimensional de microgravedad. El extremo distal del brazo presentaba un mecanismo de captura de cable trenzado patentado conocido como efector final (End Effector), diseñado inteligentemente para acoplarse firmemente a pernos de agarre estandarizados integrados en los satélites, asegurando una conexión rígida y segura necesaria para soportar los considerables momentos de inercia de objetos que podían pesar hasta 29,000 kilogramos en el espacio.',
      'La operación del Canadarm, una especialidad en la que Sally Ride demostró una competencia y maestría destacadas, requería que los astronautas especialistas de misión trabajaran en el panel de control de la cubierta de vuelo de popa del orbitador utilizando controladores manuales translacionales y rotacionales especializados. Debido a la ausencia de gravedad, la masa inercial de las cargas acopladas seguía siendo un factor dinámico crítico; intentar mover o detener abruptamente un satélite de varias toneladas generaba fuerzas inerciales significativas que podían desestabilizar la actitud de vuelo del propio transbordador o dañar gravemente la estructura de los engranajes armónicos de las articulaciones del brazo. Para mitigar estos peligros inminentes, el sistema informático integrado calculaba continuamente las trayectorias seguras, limitando activamente las velocidades de las articulaciones y aplicando algoritmos de control de lazo cerrado para amortiguar oscilaciones, exigiendo al mismo tiempo de los operadores una inmensa concentración, paciencia y conocimiento predictivo del movimiento espacial.',
      'Durante la histórica misión STS-7, el papel indispensable del Canadarm quedó irrevocablemente demostrado cuando Sally Ride y su compañero John Fabian lo utilizaron con maestría quirúrgica para implementar operaciones complejas de despliegue y recaptura con el satélite autónomo SPAS-1 (Shuttle Pallet Satellite). Esta maniobra, la primera de su tipo en la historia de los vuelos espaciales, no solo certificó la inmensa utilidad y precisión operativa del brazo robótico, sino que también demostró concluyentemente que el Transbordador Espacial era capaz de funcionar de manera efectiva como un muelle de servicio orbital, permitiendo a los astronautas recuperar tecnología valiosa de órbita para su reparación en tierra o directamente en la bahía de carga. La destreza exhibida por Ride al maniobrar este titán electromecánico cerca de la estructura delicada del transbordador sin provocar ninguna colisión cimentó la confianza de la NASA en el uso rutinario del brazo para operaciones orbitales venideras extremadamente críticas.',
      'El legado duradero del Canadarm se extiende profundamente a lo largo de décadas de misiones del Transbordador Espacial y sirve como la piedra angular indiscutible de las tecnologías robóticas espaciales modernas, como el Canadarm2 y el manipulador diestro Dextre actualmente operativos en la Estación Espacial Internacional. A lo largo de su dilatada e ilustre vida útil, el Canadarm fue instrumental en despliegues históricos como el del Telescopio Espacial Hubble, así como en las cinco arriesgadas y complejas misiones de mantenimiento y actualización que repararon y mejoraron sus ópticas, asegurando su legendaria productividad científica. Su confiabilidad y precisión convirtieron las tareas espaciales teóricamente imposibles en rutinas meticulosamente orquestadas, reafirmando el valor inconmensurable de la robótica teleoperada como extensión directa de las capacidades humanas en la exploración e infraestructura del cosmos y consolidando a Canadá como una superpotencia mundial en el desarrollo de la robótica espacial avanzada y confiable.'
    ],
    expandables: [
      { label: 'Precisión Milimétrica', icon: 'atom', text: 'A pesar de sus 15 metros de largo, los sensores del efector final podían alinear las capturas de carga útil con tolerancias menores a un centímetro.' },
      { label: 'Controladores', icon: 'zap', text: 'Los astronautas usaban dos palancas de mando diferentes, una translacional (para mover x, y, z) y una rotacional, similares a los controles de actitud del Apolo.' }
    ],
    fact: 'En la Tierra, el Canadarm original era demasiado débil para siquiera levantar su propio peso contra la gravedad. Solo funcionaba en órbita.'
  },
  {
    id: 'challenger',
    title: 'Comisión Rogers',
    color: '#2C3E50',
    btnImage: '/assets/pioneros/infographic_m7/btn_challenger.jpg',
    image: '/assets/pioneros/infographic_m7/hero_challenger.jpg',
    content: [
      'El 28 de enero de 1986, el programa espacial estadounidense sufrió uno de sus reveses más devastadores y traumáticos cuando el Transbordador Espacial Challenger se desintegró catastróficamente setenta y tres segundos después del despegue, resultando en la trágica pérdida de los siete valientes miembros de la tripulación a bordo. En respuesta inmediata a este desastre televisado a nivel nacional, el entonces presidente Ronald Reagan formó con carácter de urgencia la Comisión Presidencial sobre el Accidente del Transbordador Espacial Challenger, comúnmente conocida por el público general y los historiadores como la Comisión Rogers, en honor a su distinguido presidente, el ex Secretario de Estado William P. Rogers. Este panel investigador multidisciplinario fue excepcionalmente dotado de un mandato claro, contundente e inequívoco para determinar exhaustivamente las causas físicas y técnicas del accidente, así como examinar detalladamente el proceso administrativo, gerencial y de toma de decisiones que culminó fatalmente en la autorización errónea del lanzamiento bajo condiciones gélidas severas.',
      'Sally Ride, quien había forjado su histórica reputación como especialista de misión precisamente a bordo del Challenger y mantenía una profunda conexión emocional y profesional con el vehículo, fue seleccionada para integrar esta crítica y prominente comisión presidencial junto a otras luminarias como el renombrado físico ganador del Premio Nobel Richard Feynman, y el pionero astronauta del Apolo 11 Neil Armstrong. Su nombramiento, siendo la única astronauta activa que formaba parte directa de este exhaustivo esfuerzo de investigación gubernamental, la colocó en una posición muy delicada pero de vital importancia estratégica, donde su conocimiento directo y minucioso de los sistemas operativos del orbitador y de la opaca cultura interna de toma de decisiones de la NASA resultó ser un activo inestimable para penetrar los muros institucionales y extraer hechos técnicos verificables que otras mentes menos familiarizadas con la ingeniería espacial práctica habrían pasado por alto o desestimado prematuramente.',
      'La investigación oficial de la Comisión Rogers concluyó irrefutablemente que la causa técnica directa y primaria del desastre fue el fallo catastrófico de un sello de junta tórica (O-ring) de elastómero sintético en el segmento posterior derecho del Cohete Acelerador de Combustible Sólido (SRB), fabricado por la empresa contratista Morton Thiokol. Las temperaturas ambientales inusualmente frías e históricamente bajas registradas en el Centro Espacial Kennedy durante la mañana del lanzamiento redujeron críticamente la elasticidad e integridad estructural del sellador de goma, comprometiendo irreparablemente su capacidad funcional para aislar y contener herméticamente los gases propulsores supercalentados, altamente presurizados e incineradores durante la inmensamente violenta fase inicial del encendido sólido. La famosa demostración física del profesor Richard Feynman ante las cámaras de televisión nacional, sumergiendo un fragmento idéntico de material de junta tórica en un vaso de agua helada y mostrando su pérdida dramática y evidente de flexibilidad, cristalizó elegantemente esta compleja falla termomecánica en un concepto innegablemente accesible para el amplio entendimiento del público estadounidense.',
      'Más allá de los detalles técnicos de la junta tórica averiada, el aspecto realmente contundente, reformador y de mayor alcance histórico del informe final de la Comisión Rogers fue su dura, sin precedentes y mordaz condena sistemática de la arraigada cultura de gestión y seguridad interna institucional de la NASA y sus empresas contratistas. La comisión descubrió inequívocamente que los ingenieros especialistas en materiales de Thiokol habían expresado profunda y repetidamente graves, documentadas y justificadas preocupaciones sobre los peligros térmicos inminentes de los O-rings en temperaturas frías bajo cero, y habían aconsejado fuertemente y de manera urgente aplazar el despegue, pero que la gerencia superior priorizó agresivamente mantener el implacable y optimista calendario político de lanzamientos sobre las normas prudenciales de seguridad aeronáutica. Sally Ride desempeñó un papel interno de una importancia crítica, aunque a menudo de forma sumamente discreta, durante las audiencias a puertas cerradas, ayudando fervientemente a garantizar que las preocupaciones acalladas del personal técnico de primera línea recibieran la atención investigativa adecuada frente a la presión institucional para minimizar las graves deficiencias estructurales.',
      'Las consecuencias administrativas y las reformas de ingeniería ordenadas a raíz de las exhaustivas recomendaciones finales de la Comisión Rogers fueron drásticas, extensivas y resultaron en una paralización operativa completa de todos los vuelos del transbordador durante un período crítico de inactividad obligatoria que se extendió por casi tres largos años (32 meses). Se rediseñó meticulosamente la junta de campo de los aceleradores sólidos para incluir calentadores intrínsecos de cinta y anillos entrelazados adicionales para prevenir permanentemente la fuga de gases, y se implementaron reestructuraciones corporativas y burocráticas masivas para descentralizar y fortalecer la autoridad de las Oficinas de Seguridad y Garantía de Calidad a través de los múltiples centros espaciales involucrados. La participación rigurosa, analítica e insobornable de Sally Ride en esta investigación reafirmó poderosamente su profundo compromiso moral con la integridad incuestionable de los astronautas que arriesgaban sus vidas; el trabajo tenaz de la comisión garantizó que, al menos temporalmente, el programa adoptara medidas de seguridad de vuelo significativamente mejoradas y rigurosas.'
    ],
    expandables: [
      { label: 'Silencio Roto', icon: 'clock', text: 'Fue en gran parte gracias a los canales discretos que Ride mantuvo con ingenieros subalternos que la historia de los anillos O defectuosos llegó a oídos de Richard Feynman.' },
      { label: 'Dolor Personal', icon: 'atom', text: 'Ride conocía íntimamente a la tripulación del Challenger, ya que había volado en ese mismo orbitador. La tragedia la marcó profundamente en su carrera y perspectiva sobre la seguridad institucional.' }
    ],
    fact: 'La comisión reveló que existía un historial de daños por erosión en las juntas tóricas que había sido sistemáticamente normalizado y categorizado como riesgo de vuelo aceptable.'
  },
  {
    id: 'legacy',
    title: 'Legado e Inspiración',
    color: '#D87D4A',
    btnImage: '/assets/pioneros/infographic_m7/btn_legacy.jpg',
    image: '/assets/pioneros/infographic_m7/hero_legacy.jpg',
    content: [
      'Tras su histórico segundo y último vuelo espacial (la misión STS-41-G en 1984) y su destacada, valiente e indispensable contribución al riguroso trabajo investigativo de la Comisión Rogers, Sally Ride se retiró de la sede de la NASA en 1987 para iniciar un capítulo profundamente impactante y transformador centrado en gran medida en el mundo de la academia, el fomento educativo institucional y la promoción activa de las ciencias exactas. Aceptó inicialmente un prestigioso y codiciado puesto docente como profesora de física en la Universidad de California, San Diego (UCSD), al tiempo que asumía la inmensamente importante y estratégica responsabilidad de dirigir y expandir el Instituto Espacial de California, un esfuerzo investigativo multidisciplinario estatal dedicado incansablemente a liderar e impulsar la innovación aeronáutica y el desarrollo pionero en tecnologías espaciales avanzadas y la ciencia atmosférica integral.',
      'Motivada constantemente por la aguda y dolorosa constatación estadística de que el entusiasmo innato y curiosidad científica de las jóvenes estudiantes por asignaturas críticas como las matemáticas, la ingeniería y las ciencias exactas tiende a disminuir precipitada y alarmantemente al ingresar a los desafiantes y definitorios años de la escuela secundaria superior, cofundó en 2001 la innovadora y perdurable iniciativa educativa "Sally Ride Science" junto a su socia y colaboradora de toda la vida, Tam O\'Shaughnessy. Esta empresa dinámica e impulsada por una misión cívica profunda se diseñó arquitectónicamente con el objetivo primario, decidido y enfocado de crear abundantes y accesibles materiales educativos, capacitaciones didácticas de alta calidad para profesores STEM y programas interactivos enriquecedores destinados a inspirar de manera sistemática y duradera a miles de estudiantes, especialmente y deliberadamente a mujeres jóvenes y de minorías infrarrepresentadas, fomentando su inmersión vocacional.',
      'La estrategia metodológica y los libros educativos impulsados vigorosamente por su empresa pionera buscaban conscientemente y con gran efectividad desmitificar por completo la errónea y obsoleta imagen mental tradicional, socialmente incrustada, que perpetúa el estereotipo del científico como un anciano, distante y solitario varón recluido en un laboratorio sin ventanas. A través de la organización periódica e impactante de coloridos y dinámicos Festivales de Ciencias masivos llevados a cabo a lo largo y ancho del panorama geográfico de todo Estados Unidos, Sally Ride brindó directamente a innumerables niñas y adolescentes la notable, motivadora y rara oportunidad de interactuar cara a cara con profesionales, astrónomas, biólogas marinas e ingenieras aeroespaciales en activo que compartían abiertamente no solo sus éxitos revolucionarios, sino también sus propios obstáculos iniciales, humanizando en gran medida la labor investigativa moderna y la exploración del universo palpable.',
      'Además de su incesante e invaluable activismo filantrópico y educativo directo, Ride continuó ejerciendo una influencia y liderazgo excepcionalmente fuertes e impactantes dentro de la estricta formulación de amplias directrices estratégicas e iniciativas de política espacial nacional e internacional como miembro destacado e indispensable de numerosas e influyentes juntas de revisión científica, comités asesores presidenciales formales y paneles gubernamentales independientes y especializados. Años más tarde, tras el doloroso y posterior accidente fatal del Transbordador Espacial Columbia en el fatídico año 2003, fue convocada perentoriamente y con urgencia una vez más, convirtiéndose de manera excepcional y sin precedentes en la única, solitaria y recurrente figura histórica nacional en haber servido activamente y con integridad comprobada en ambas comisiones presidenciales formales de investigación constituidas especialmente y bajo juramento para escrutar y auditar a fondo los dos peores desastres mortales que asolaron la historia operacional de la agencia.',
      'El legado y el espíritu resuelto de Sally Ride continúan ardiendo intensamente y expandiéndose astronómicamente tras su lamentable fallecimiento en 2012, consolidando y elevando su estatus permanente y significativo en la historia no meramente como un distinguido y crucial hito pionero en los vastos libros y crónicas de la exploración espacial global, sino profundamente como una educadora iluminada, defensora acérrima de los derechos fundamentales y faro deslumbrante de inspiración intergeneracional constante e inmarcesible. En un justo y conmemorativo tributo a su inconmensurable contribución al espíritu y avance de la nación, fue honrada y condecorada póstumamente con la prestigiosa Medalla Presidencial de la Libertad por el entonces presidente Barack Obama, consagrando de manera oficial, histórica y definitiva el notable impacto, progreso social y cultural incuestionable que su destacada, valiente y revolucionaria vida impartió ininterrumpidamente sobre el complejo tejido social y científico del mundo moderno y su exploración constante.'
    ],
    expandables: [
      { label: 'Educación Activa', icon: 'atom', text: 'Los festivales de Sally Ride Science atraían a decenas de miles de estudiantes, convirtiendo estadios y centros de convenciones en laboratorios temporales.' },
      { label: 'Más Allá de la Tierra', icon: 'zap', text: 'El programa EarthKAM de Ride permitió a estudiantes de secundaria tomar fotografías de la Tierra controlando directamente una cámara a bordo de la Estación Espacial Internacional.' }
    ],
    fact: 'La Marina de EE. UU. Bautizó un buque de investigación oceanográfica de clase Neil Armstrong con el nombre RV Sally Ride en 2013.'
  },
  {
    id: 'women-stem-legacy',
    title: 'Mujeres en STEM: El Efecto Sally Ride',
    color: '#9E4FD4',
    btnImage: '/assets/pioneros/infographic_m7/btn_women-stem-legacy.jpg',
    image: '/assets/course/pioneros/hero_women_stem.jpg',
    content: [
      'Sally Ride transformó no solo la historia del programa espacial estadounidense sino la percepción cultural colectiva de quiénes pueden y deben ser científicos e ingenieros. Cuando se convirtió en la primera mujer americana en el espacio en junio de 1983 a bordo del Challenger, no solo rompió una barrera institucional; desencadenó un efecto estadísticamente medible en las inscripciones universitarias femeninas en programas de ingeniería, física y matemáticas en los años siguientes. Estudios sociológicos documentaron un incremento del 12% en el número de mujeres que declaraban interés en carreras científicas en encuestas escolares realizadas el año posterior al vuelo de Ride, un fenómeno que los investigadores denominaron "el efecto Sally Ride" en honor al impacto que los modelos de rol mediáticos tienen en las aspiraciones vocacionales de jóvenes estudiantes que se identifican con ellos.',
      'La carrera científica de Ride como física del plasma y especialista en rayos láser de alta potencia fue igualmente impresionante fuera del contexto astronáutico. Antes de ser seleccionada entre más de 8,000 candidatos como astronauta en 1978, Ride completó su doctorado en física en Stanford estudiando el scattering de Compton y la propagación de pulsos de rayos X en plasmas estelares, investigación que fue citada múltiples veces en la literatura de astrofísica de alta energía. Esta base científica sólida le permitió, ya como astronauta, operar el brazo robótico SRMS del Challenger con precisión quirúrgica durante el despliegue y recuperación de satélites, convirtiéndose en la operadora principal del sistema robótico en ambas misiones del transbordador.',
      'Sally Ride fue la única persona en ser miembro de ambas comisiones de investigación de accidentes del programa de transbordadores espaciales: la Comisión Rogers por el Challenger en 1986 y la Junta de Investigación del Accidente del Columbia en 2003. Su rigor analítico y su disposición a confrontar las presiones institucionales de la NASA quedaron documentados en el informe Rogers cuando fue ella quien popularizó el experimento de la junta de goma en agua helada durante la conferencia de prensa, demostrando físicamente que las juntas tóricas del cohete de combustible sólido perdían elasticidad en temperaturas bajo cero. Este acto de comunicación científica pública en tiempo real se considera uno de los momentos más efectivos de divulgación científica mediática del siglo XX.',
      'Tras retirarse del programa de astronautas, Ride fundó en 2001 Sally Ride Science, una organización sin fines de lucro dedicada exclusivamente a mantener el interés de las niñas y jóvenes en ciencia a través de experiencias prácticas de laboratorio y ferias científicas. La organización desarrolló materiales didácticos utilizados en más de 60,000 escuelas estadounidenses y organizó campamentos científicos de verano donde las participantes realizaban experimentos reales de física, química y biología con mentoras científicas profesionales. El enfoque pedagógico de Ride priorizaba la experiencia directa sobre la memorización: su tesis educativa era que la identidad de "persona científica" se forma antes de los 12 años y que una sola experiencia de laboratorio emocionalmente significativa puede ser más determinante que años de instrucción teórica.',
      'El legado de Sally Ride se mantuvo secreto en uno de sus aspectos más personales hasta su obituario en 2012, cuando su compañera de vida de 27 años, Tam O\'Shaughnessy, fue revelada como familiar inmediata sobreviviente. En su muerte por cáncer de páncreas, Ride eligió hacer pública esta parte de su vida, convirtiéndose post moralmente en el primer astronauta americano conocido LGBT+. Este último acto de autenticidad expandió su legado más allá de la ciencia y el género para abarcar la representación de identidades frecuentemente invisibles en la cultura dominante de las instituciones científicas y militares, consolidando a Sally Ride como un símbolo interseccional de la diversidad en la exploración del cosmos.'
    ],
    expandables: [
      { label: 'Efecto Estadístico', icon: 'Star', text: 'El "efecto Sally Ride" documentó un 12% de aumento en inscripciones femeninas en programas STEM el año siguiente a su vuelo — el primer dato estadístico de cómo un astronauta cambia vocaciones a escala nacional.' },
      { label: 'Junta de Goma', icon: 'Microscope', text: 'En la conferencia de prensa de la Comisión Rogers, Ride introdujo en silencio la junta de goma en agua helada, mostrando en tiempo real por qué el Challenger explotó — el experimento más famoso de divulgación científica televisiva.' }
    ],
    fact: 'Sally Ride fue la única persona en investigar AMBOS accidentes del transbordador (Challenger 1986 y Columbia 2003), y fue ella quien demostró públicamente con agua helada por qué las juntas tóricas del Challenger fallaron en el invierno de Florida.'
  }

];

// Temporal Particle Field (Canvas Background)
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
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
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

// Space Header
function SpaceHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 6 }, (_, i) => {
          const t = (i + 0.5) / 6;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB','#2C3E50','#D87D4A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="15" fill="none" stroke="#D87D4A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="5" fill="#D87D4A" opacity="0.5" />
        <path d="M 285 30 L 315 30 M 300 15 L 300 45" stroke="#D87D4A" strokeWidth="1" opacity="0.6" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">SALLY RIDE Y EL TRANSBORDADOR ESPACIAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MÓDULO DE PIONEROS</text>
      </svg>
    </div>
  );
}

// Node Button
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
        border: `3px solid ${isActive ? node.color : 'rgba(128,222,234,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
          layoutId="activeDotPionerosM7"
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>

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
                  {i === 0 ? '◆' : '◇'}
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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

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
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_PionerosM7() {
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
      background: 'url(/assets/course/animales_pioneros/banner_pioneros.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Contextual Background Image (§18) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('/assets/course/animales_pioneros/bg_pioneros.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(128,222,234,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(128,222,234,0.05)',
      }}>
        <SpaceHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
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

        <AnimatePresence>
          {allCompleted && !activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem', padding: '2rem',
                background: 'linear-gradient(135deg, rgba(216,125,74,0.1), rgba(128,222,234,0.1))',
                borderRadius: '16px', border: '1px solid rgba(216,125,74,0.2)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#D87D4A', margin: '0 0 1rem', fontSize: '1.5rem' }}>
                🏆 ¡Has completado la exploración!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has descubierto la inmensa historia y legado de Sally Ride en el programa del Transbordador Espacial.
              </p>
              <button style={{
                padding: '0.8rem 2rem', background: '#D87D4A', color: '#FFF',
                border: 'none', borderRadius: '30px', fontWeight: 'bold',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 15px rgba(216,125,74,0.4)'
              }}>
                Siguiente Módulo <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h5 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#D87D4A', opacity: 0.5 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
