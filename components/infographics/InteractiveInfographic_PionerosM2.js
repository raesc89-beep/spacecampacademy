import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Rocket, Star, Globe, Award, Info, Book } from 'lucide-react';

const COLORS = {
  sand: '#D87D4A',
  gold: '#D4B872',
  paleBlue: '#80DEEA',
  deepBlue: '#3949AB',
  darkBg: '#2C3E50',
  highlight: 'var(--gold-star, #FFD700)'
};

const BIBLIOGRAPHY = [
  "Swenson, L. S., Grimwood, J. M., & Alexander, C. C. (1966). This New Ocean: A History of Project Mercury. NASA Special Publication-4201.",
  "Thompson, N. (2004). Light This Candle: The Life and Times of Alan Shepard, America's First Spaceman. Crown Publishers.",
  "Burgess, C. (2014). Freedom 7: The Historic Flight of Alan B. Shepard, Jr. Springer Praxis Books, Space Exploration.",
  "Catchpole, J. (2001). Project Mercury: NASA's First Manned Space Programme. Springer Praxis Books.",
  "Jones, E. M., & Glover, K. (2017). Apollo 14 Lunar Surface Journal. NASA History Division.",
  "Hansen, J. R. (1995). Spaceflight Revolution: NASA Langley Research Center from Sputnik to Apollo. NASA Special Publication-4308."
];

const CONTENT_NODES = [
  {
    id: 'node1',
    title: 'El Proyecto Mercury y los Siete Originales',
    icon: <Rocket size={24} color={COLORS.gold} />,
    paragraphs: [
      "El Proyecto Mercury, concebido en los albores de la Guerra Fría, representó el primer esfuerzo coordinado de los Estados Unidos para colocar a un ser humano en el espacio, marcando el inicio de la era de los vuelos espaciales tripulados. Este programa monumental requirió la creación de infraestructuras sin precedentes, desde redes globales de seguimiento y comunicaciones hasta instalaciones de pruebas biomédicas avanzadas diseñadas específicamente para evaluar las capacidades de supervivencia y rendimiento del cuerpo humano bajo condiciones extremas de aceleración, ingravidez y aislamiento. La administración de la NASA enfrentó el desafío colosal de desarrollar tecnología orbital desde cero en un tiempo récord, operando bajo una presión política inmensa debido a los avances simultáneos del programa espacial soviético, lo que catalizó una inversión masiva en investigación aerodinámica y propulsión termodinámica a nivel nacional.",
      "La selección de los candidatos idóneos para este programa pionero fue un proceso riguroso y multifacético que buscaba individuos no solo con experiencia técnica excepcional, sino también con una resiliencia psicológica inquebrantable frente a situaciones de vida o muerte. La NASA determinó que los pilotos de pruebas militares, particularmente aquellos con formación en ingeniería aeronáutica y experiencia en vuelos de alta velocidad y altitud, poseían el conjunto de habilidades ideal para operar los controles manuales de la incipiente nave espacial bajo fuerzas G extremas. Alan Bartlett Shepard Jr., un condecorado aviador naval con un historial impecable de pilotaje de jets de combate experimentales y una reputación de concentración imperturbable, emergió rápidamente como uno de los candidatos más prometedores, demostrando una aptitud sobresaliente para asimilar sistemas electromecánicos complejos.",
      "El régimen de entrenamiento físico y psicológico al que fueron sometidos los denominados \"Siete del Mercury\" no tenía precedentes en la historia de la aviación militar o civil, empujando a los sujetos hasta el límite de la resistencia humana. Shepard y sus compañeros soportaron agotadoras sesiones en centrifugadoras humanas de alta velocidad, simulando los aplastantes perfiles de aceleración del lanzamiento y la reentrada atmosférica, al mismo tiempo que dominaban procedimientos de emergencia en cámaras de altitud que replicaban el vacío y las temperaturas extremas del entorno exoatmosférico. Este adiestramiento exhaustivo también incluyó horas interminables en simuladores de vuelo estáticos, donde debían resolver fallos de sistemas simulados en tiempo real, desarrollando una memoria muscular y una respuesta cognitiva automática esenciales para la supervivencia en caso de malfuncionamientos críticos durante el vuelo real.",
      "A nivel de sistemas, el Proyecto Mercury impulsó innovaciones radicales en la ingeniería de soporte vital, requiriendo el desarrollo de un entorno de cabina completamente autónomo y presurizado dentro de las severas restricciones de peso y volumen impuestas por los vehículos de lanzamiento disponibles en esa época. Los ingenieros de diseño espacial, colaborando estrechamente con especialistas en medicina aeroespacial, perfeccionaron trajes de presión intravehicular que funcionaban como cápsulas de supervivencia redundantes, equipados con sistemas integrados de gestión térmica, monitoreo biométrico continuo y suministro de oxígeno de circuito cerrado. Para Shepard, comprender las complejidades termodinámicas y mecánicas de este entorno encapsulado era tan crucial como su habilidad de pilotaje, ya que cualquier fallo de presurización a cien kilómetros de altitud requeriría una intervención manual inmediata y precisa para evitar una descompresión catastrófica fatal.",
      "Finalmente, el 21 de febrero de 1961, tras innumerables evaluaciones, escrutinios médicos y pruebas de aptitud técnica, Robert Gilruth, director del Space Task Group de la NASA, comunicó internamente la decisión de que Alan Shepard sería el primer estadounidense en viajar al espacio, un honor histórico que conllevaba una responsabilidad abrumadora. Esta selección se basó no solo en sus excepcionales métricas de rendimiento en los simuladores y pruebas de estrés, sino también en su destacada capacidad de liderazgo, su pensamiento analítico agudo bajo presión extrema y su profunda implicación en el diseño de los sistemas de instrumentación de la cápsula. Shepard no era un mero pasajero en la Freedom 7; era un ingeniero de vuelo integral que había contribuido directamente a la configuración ergonómica de los controles, asegurando que la interfaz hombre-máquina estuviera optimizada para las exigencias cognitivas y físicas del vuelo espacial suborbital pionero."
    ]
  },
  {
    id: 'node2',
    title: 'Ingeniería Aeroespacial: Redstone y Freedom 7',
    icon: <Info size={24} color={COLORS.paleBlue} />,
    paragraphs: [
      "El vehículo de lanzamiento seleccionado para propulsar la misión inaugural de Alan Shepard fue el cohete Mercury-Redstone, una derivación directa del misil balístico de alcance medio Redstone, el cual fue extensamente modificado por un equipo de ingenieros liderado por Wernher von Braun en el Centro de Vuelos Espaciales Marshall. La integración de la cápsula tripulada exigió alteraciones críticas en la arquitectura del misil original, incluyendo el alargamiento de los tanques de propulsante para incrementar el tiempo de combustión y la capacidad de empuje, necesario para superar la resistencia aerodinámica e inercial de la pesada carga útil coronando el vehículo. Además, la adaptación del motor de combustible líquido A-7, que utilizaba una mezcla hipergólica altamente volátil de oxígeno líquido y alcohol etílico, requirió la implementación de sistemas de inyección y turbobombas rediseñados para garantizar una combustión más estable y reducir el riesgo de oscilaciones destructivas de alta frecuencia.",
      "El diseño y la manufactura de la cápsula espacial, bautizada posteriormente por Shepard como Freedom 7, recayó en la McDonnell Aircraft Corporation, cuyos ingenieros se enfrentaron al desafío colosal de miniaturizar sistemas complejos de aviónica, navegación y soporte vital dentro de un volumen interno de apenas 2.8 metros cúbicos. La estructura primaria de la nave estaba construida con una aleación de titanio extremadamente resistente, soldada meticulosamente para formar un recipiente hermético capaz de soportar las enormes fuerzas de compresión durante el ascenso dinámico a través de las capas densas de la atmósfera terrestre y el intenso choque térmico de la reentrada. La geometría cónica truncada de la nave no fue arbitraria; fue el resultado de rigurosos análisis computacionales y pruebas en túneles de viento para optimizar la estabilidad aerodinámica y maximizar la eficacia del escudo térmico ablativo que protegería al astronauta de las temperaturas de plasma abrasador superiores a los dos mil grados Celsius.",
      "A diferencia del enfoque soviético temprano, que favorecía un control completamente automatizado desde estaciones terrestres o mediante secuenciadores electromecánicos a bordo, la filosofía de diseño de la NASA para la cápsula Mercury priorizó otorgar al piloto una autoridad significativa y capacidades de anulación manual sobre los sistemas críticos de vuelo y control de actitud. Alan Shepard, utilizando una palanca de mando de tres ejes ingeniosamente diseñada, poseía la capacidad de comandar el sistema de propulsores de peróxido de hidrógeno de la cápsula para ajustar el cabeceo, la guiñada y el alabeo de la nave en el entorno de microgravedad. Esta capacidad de control activo fue considerada fundamental no solo para el éxito de la misión técnica, sino también para evaluar objetivamente la capacidad psicomotora y la orientación espacial de un ser humano operando maquinaria compleja en un entorno completamente carente de referencias gravitacionales y aerodinámicas convencionales.",
      "Un aspecto crítico de la ingeniería de la misión fue el desarrollo y la implementación del Sistema de Escape de Lanzamiento (LES), un mecanismo de seguridad redundante concebido para abortar rápidamente la misión y extraer la cápsula de un cohete defectuoso en cualquier punto de la fase de ascenso propulsado, desde la plataforma de lanzamiento hasta la separación orbital. Este sistema, que dominaba visualmente el vértice de la cápsula Freedom 7, consistía en una torre de armadura de titanio coronada por potentes cohetes de combustible sólido, diseñados para encenderse automáticamente en fracciones de segundo ante la detección de anomalías catastróficas, como una caída abrupta en la presión de la cámara de combustión del Redstone. El diseño del LES ejemplificaba el enfoque meticuloso de la NASA en la gestión de riesgos y la tolerancia a fallos, asegurando que existieran múltiples vectores de supervivencia técnica para proteger el invaluable recurso humano frente a los peligros inherentes de los primeros vuelos balísticos experimentales.",
      "La secuencia de despliegue de los paracaídas de recuperación representaba la etapa final, pero no menos crítica, de la cadena de eventos de ingeniería diseñados para garantizar el retorno seguro de Shepard después de completar su perfil de vuelo exoatmosférico y soportar el intenso calor de la fase de fricción atmosférica. El sistema de recuperación secuencial incluía un paracaídas de frenado inicial que se desplegaba a una altitud de aproximadamente seis kilómetros para estabilizar la caída libre de la cápsula oscilante, seguido por el despliegue del paracaídas principal, un inmenso dosel anular diseñado para reducir la velocidad de descenso a un rango seguro de diez metros por segundo antes del impacto oceánico. La fiabilidad de estos mecanismos pirotécnicos de despliegue y la resistencia estructural de las líneas de suspensión de nailon fueron verificadas a través de docenas de pruebas de caída de maquetas a escala real, validando la integridad del diseño de McDonnell Aircraft frente a las fuerzas de cizalladura atmosférica extremas encontradas durante la fase terminal del vuelo."
    ]
  },
  {
    id: 'node3',
    title: 'Física y Balística de la Misión MR-3',
    icon: <Globe size={24} color={COLORS.sand} />,
    paragraphs: [
      "El 5 de mayo de 1961, el vuelo inaugural del programa Mercury, designado oficialmente como Mercury-Redstone 3 (MR-3), despegó desde la plataforma de lanzamiento en Cabo Cañaveral, inaugurando una trayectoria balística meticulosamente planificada que llevaría a Alan Shepard a rozar los límites del espacio exterior sin entrar en órbita circumterrestre. El perfil de vuelo suborbital fue diseñado con precisión matemática para maximizar el tiempo de microgravedad aparente mientras se mantenían las tensiones estructurales y térmicas sobre el vehículo de lanzamiento y la cápsula dentro de los parámetros operativos de seguridad establecidos durante las exhaustivas fases de simulación computacional. La trayectoria, asemejándose a una parábola inmensa, exigía una combustión impecable del motor principal del cohete Redstone, acelerando la masa combinada a velocidades supersónicas críticas antes del agotamiento del propulsante y la posterior fase balística impulsada únicamente por la inercia adquirida y las leyes del movimiento kepleriano.",
      "Durante la exigente fase de ascenso propulsado de la misión Freedom 7, Shepard experimentó fuerzas G aplastantes que superaron las 6 gravedades, un nivel de estrés fisiológico masivo que exigía técnicas de respiración especializadas y una tensión muscular isométrica intensa para evitar el estancamiento de la sangre en las extremidades inferiores y el subsiguiente síncope inducido por aceleración. La telemetría biomédica transmitida continuamente desde los sensores dérmicos del traje presurizado de Shepard confirmó a los controladores de vuelo en tierra que, a pesar de las fuerzas centrífugas y lineales extremas, el pulso y la presión arterial del piloto se mantenían dentro de límites médicamente aceptables, demostrando la eficacia de los asientos contorneados a medida y el riguroso entrenamiento físico previo. Esta resistencia fenomenal subrayó la capacidad humana para soportar las brutales realidades del despegue balístico, un requisito indispensable para la validación continua de las futuras arquitecturas de misiones tripuladas de mayor duración e intensidad.",
      "Al alcanzar la altitud de apogeo planificada de aproximadamente 187 kilómetros sobre el nivel del mar, Shepard ingresó oficialmente en el entorno inhóspito del espacio exterior, experimentando aproximadamente cinco minutos ininterrumpidos de ingravidez o caída libre sostenida. Durante esta fase crítica de la misión, se le encomendó la ejecución de una serie de maniobras de control de actitud manuales para evaluar la respuesta cinemática de la nave y la eficacia de sus propios procesos perceptivos y cognitivos bajo condiciones de estimulación vestibular alterada. Con precisión milimétrica, utilizando el sistema de control de reacción proporcional, Shepard ajustó con éxito el cabeceo, el alabeo y la guiñada de la cápsula Freedom 7, demostrando de manera inequívoca que un astronauta humano podía funcionar como un piloto activo y decisivo en el espacio, refutando las teorías médicas contemporáneas que predecían desorientación espacial paralizante.",
      "La fase de reentrada atmosférica representó el punto de máximo peligro termodinámico y aerodinámico del perfil de vuelo suborbital, ya que la cápsula espacial se precipitaba hacia la densa atmósfera terrestre a velocidades hipersónicas que superaban los dos kilómetros por segundo, generando una intensa onda de choque frente a la nave. El escudo térmico de resina ablativa situado en la base ensanchada de la cápsula funcionó exactamente según las simulaciones predictivas, vaporizándose gradualmente para disipar las enormes cantidades de energía cinética convertida en energía térmica por la fricción del aire, manteniendo así la temperatura interna de la cabina dentro de límites habitables. Durante esta violenta desaceleración, las fuerzas de retardo impusieron un asombroso pico de 11.6G sobre el cuerpo de Shepard, aplastándolo implacablemente contra su asiento protector en una de las pruebas de resistencia humana más extremas jamás registradas en la historia de la investigación biomédica aeroespacial.",
      "El exitoso acuatizaje de la Freedom 7 en las aguas del Océano Atlántico Norte, a unos 486 kilómetros del punto de lanzamiento original en Florida, validó por completo la exactitud de los cálculos balísticos de los ingenieros de trayectoria y la integridad de los sistemas electromecánicos de recuperación. La rápida y eficiente operación de rescate, coordinada con la Marina de los Estados Unidos mediante la asistencia de helicópteros de recuperación especializados, recuperó a Shepard y a la cápsula espacial del agua en cuestión de minutos, marcando la culminación triunfal de un vuelo que duró apenas 15 minutos y 22 segundos, pero que alteró fundamentalmente el curso de la historia tecnológica humana. Este logro monumental no solo sirvió como una demostración contundente de la capacidad tecnológica y la voluntad política estadounidense en plena carrera espacial, sino que también proporcionó un corpus de datos empíricos invaluables que aceleraron drásticamente el desarrollo de las misiones orbitales de duración prolongada del programa Mercury."
    ]
  },
  {
    id: 'node4',
    title: 'Impacto Fisiológico y Psicológico del Vuelo Espacial',
    icon: <BookOpen size={24} color={COLORS.deepBlue} />,
    paragraphs: [
      "El impacto fisiológico del vuelo suborbital de quince minutos sobre el organismo de Alan Shepard fue el sujeto de un intenso escrutinio biomédico exhaustivo, diseñado para comprender cómo la fisiología de los mamíferos responde y se adapta a las transiciones violentas entre la hipergravedad extrema y el entorno de ingravidez absoluta. Los cardiólogos y fisiólogos aeroespaciales de la NASA analizaron meticulosamente los extensos registros de electrocardiogramas, frecuencia respiratoria y temperatura corporal profunda, buscando cualquier signo de arritmia cardíaca, disfunción vestibular o deterioro neurológico provocado por la exposición aguda a las condiciones anormales del vuelo espacial. Sorprendentemente, los resultados post-vuelo confirmaron que el sistema cardiovascular y el aparato respiratorio de Shepard habían funcionado sin anomalías patológicas significativas, demostrando que un individuo con un acondicionamiento físico excepcional podía tolerar perfiles de estrés balístico extremo sin sufrir daños biológicos permanentes o debilitantes.",
      "A nivel cognitivo y psicológico, la actuación de Shepard durante el vuelo de la Freedom 7 disipó por completo las persistentes preocupaciones de la comunidad médica conservadora, que temía que el aislamiento extremo, la ansiedad anticipatoria y la ausencia de retroalimentación sensorial gravitatoria precipitaran episodios de pánico agudo, ilusiones espaciales paralizantes o, en el peor de los casos, un deterioro mental psicótico agudo. En lugar de sucumbir a la presión psicológica abrumadora, el astronauta mantuvo un nivel de concentración operativa fenomenal, comunicándose de manera clara, concisa y analítica con los controladores de telemetría y ejecutando comandos de pilotaje manual con una precisión biomecánica asombrosa, incluso cuando su ritmo cardíaco alcanzó su punto máximo durante el ascenso. Su capacidad para compartimentar el estrés emocional y mantener el enfoque láser en la resolución sistemática de problemas sirvió para establecer el estándar de oro del \"temperamento de astronauta\", un paradigma de frialdad bajo fuego que influiría en las futuras selecciones de tripulaciones espaciales durante décadas.",
      "Sin embargo, el legado médico del vuelo de Shepard no estuvo exento de desafíos imprevistos y problemas de diseño ergonómico que subrayaron la imperativa necesidad de iteración continua en la ingeniería de soporte vital y la planificación de procedimientos pre-lanzamiento. Los retrasos mecánicos prolongados en la plataforma de lanzamiento, que lo mantuvieron confinado en la cápsula presurizada durante horas antes del despegue real, pusieron de relieve la falta crítica de un sistema de recolección de orina integrado en la primera generación de trajes espaciales Mercury, lo que obligó a Shepard a orinarse en su traje con la autorización a regañadientes de los directores de vuelo. Este incidente, aunque aparentemente trivial, representaba un riesgo sustancial de cortocircuito en los biosensores críticos que monitoreaban sus funciones vitales, precipitando un rediseño inmediato y exhaustivo de los sistemas de contención de residuos biológicos para todas las misiones tripuladas posteriores, destacando la interacción vital entre la función biológica humana y el diseño de sistemas de ingeniería complejos.",
      "Después de su histórico vuelo, la trayectoria astronáutica de Shepard sufrió un revés dramático y prolongado debido al diagnóstico de la enfermedad de Ménière, un debilitante trastorno idiopático del oído interno caracterizado por episodios repentinos y severos de vértigo rotatorio, tinnitus ensordecedor y pérdida de audición neurosensorial progresiva. Esta patología vestibular intratable lo descalificó médicamente para operaciones de vuelo activas, marginándolo cruelmente de la lista rotativa de tripulaciones para las posteriores y más complejas misiones de los programas Gemini y los primeros vuelos de prueba del programa Apolo, obligándolo a asumir el rol administrativo de Jefe de la Oficina de Astronautas. Durante este prolongado período de inactividad obligada, su capacidad de resiliencia psicológica se puso a prueba repetidamente mientras observaba a sus contemporáneos ejecutar caminatas espaciales históricas y órbitas de acoplamiento, canalizando su frustración profesional hacia la gestión meticulosa y rigurosa del cuerpo de astronautas bajo su mando operativo.",
      "La rehabilitación clínica de Shepard y su eventual retorno al estado de vuelo activo constituyen uno de los capítulos más extraordinarios de perseverancia personal y avance neuroquirúrgico en la historia temprana de la exploración espacial estadounidense. A finales de la década de mil novecientos sesenta, se sometió a un procedimiento quirúrgico altamente experimental y riesgoso conocido como derivación del saco endolinfático, diseñado específicamente para aliviar la presión de fluidos aberrante dentro del laberinto del oído interno que desencadenaba sus episodios incapacitantes de vértigo crónico. La intervención resultó ser un éxito sin precedentes, restaurando completamente su función vestibular y audición, y tras superar un régimen punitivo de recertificación médica y entrenamiento de simuladores, la NASA lo reintegró al servicio activo de vuelo, pavimentando el camino para su milagrosa asignación como comandante de una de las misiones de exploración lunar más ambiciosas del siglo veinte."
    ]
  },
  {
    id: 'node5',
    title: 'Legado, Apolo 14 y Exploración Lunar',
    icon: <Award size={24} color={COLORS.gold} />,
    paragraphs: [
      "El retorno triunfal de Alan Shepard a las misiones espaciales activas cristalizó con su asignación como Comandante de la Misión Apolo catorce, una expedición de aterrizaje lunar crucial que debía recuperar la confianza pública y gubernamental tras el casi desastroso y abortado vuelo de la nave Apolo trece. A los cuarenta y siete años de edad, ostentando el título del astronauta de mayor edad en el programa activo, Shepard, junto con el piloto del módulo lunar Edgar Mitchell, se embarcó en una odisea científica rigurosa destinada a explorar la escarpada e inhóspita región de las tierras altas de Fra Mauro, una formación geológica compleja que albergaba claves críticas sobre los primeros impactos catastróficos en la historia del sistema solar primitivo. Esta misión exigió una precisión de navegación y técnicas de pilotaje manual sin precedentes, culminando con el aterrizaje lunar tripulado más preciso de todo el programa Apolo, demostrando que la pericia operativa aguda y la experiencia analítica de Shepard no habían disminuido un ápice durante su largo hiato administrativo forzado por su condición médica.",
      "Durante las exigentes actividades extravehiculares de superficie, el equipo de la Apolo catorce logró desplegar con éxito un conjunto sofisticado de instrumentos geofísicos ALSEP (Apollo Lunar Surface Experiments Package) y completar perfiles geológicos complejos, recolectando más de cuarenta y dos kilogramos de rocas y brechas de impacto que posteriormente revolucionarían la comprensión científica de la cronología estratigráfica lunar. Shepard demostró una asombrosa adaptación neuromuscular y resistencia física mientras navegaba a pie por el terreno lunar extremadamente traicionero, arrastrando el innovador, aunque problemático, Modular Equipment Transporter (MET), un carrito de herramientas tirado a mano que presagiaría el desarrollo de los futuros vehículos itinerantes lunares motorizados. Su capacidad para ejecutar procedimientos experimentales prolongados, documentar anomalías geológicas in situ e interpretar datos estratigráficos complejos en el agresivo entorno de gravedad un sexto validó la eficacia de la formación científica cruzada impartida a la tripulación antes del lanzamiento por geólogos planetarios destacados.",
      "En un momento de levidad cuidadosamente coreografiada que contrastaba marcadamente con la severidad del trabajo científico y se convirtió en uno de los eventos televisivos más icónicos de la historia espacial, Shepard improvisó un experimento dinámico utilizando un instrumento adaptado, acoplando la cabeza de un palo de golf de hierro seis genuino a la empuñadura telescópica de una herramienta de excavación lunar de contingencia. A pesar de las graves restricciones de movilidad cinemática impuestas por su voluminoso y rígido traje de presión extravehicular, logró ejecutar una serie de golpes con un solo brazo contra varias pelotas de golf introducidas de contrabando, demostrando empíricamente de manera lúdica las sorprendentes propiedades de las trayectorias balísticas en un entorno de baja gravedad y vacío atmosférico. Este acto espontáneo de ingenio humano no solo sirvió para aliviar la inmensa tensión psicológica acumulada durante las intensas operaciones de superficie, sino que también capturó indeleblemente la imaginación del público mundial, humanizando la exploración espacial y cimentando su estatus cultural como un explorador audaz y carismático.",
      "El legado multifacético de Alan Shepard dentro del ecosistema de la NASA y la floreciente industria aeroespacial estadounidense se extendió mucho más allá de sus notables logros individuales como piloto suborbital pionero y experimentado comandante de misiones de desembarco lunar. Como Jefe interino y titular de la Oficina de Astronautas durante un período de crecimiento exponencial sin precedentes y desafíos operativos formidables, estableció protocolos rigurosos de disciplina operativa, reestructuró las arquitecturas del entrenamiento de misiones críticas y desempeñó un papel determinante en la selección de tripulaciones clave para el naciente programa del Transbordador Espacial (Space Shuttle). Su liderazgo fue fundamental para la profesionalización y diversificación del cuerpo de astronautas modernos, exigiendo la más alta excelencia técnica de su personal mientras defendía implacablemente mejoras críticas en las tecnologías de seguridad de la tripulación y diseños de soporte vital redundantes frente a las limitaciones de presupuesto impuestas por la administración federal.",
      "La monumental contribución de Shepard a la expansión de las fronteras de la humanidad ha sido ampliamente reconocida y consagrada con la adjudicación de las más altas condecoraciones civiles y militares que puede otorgar la nación, incluyendo la prestigiosa Medalla de Honor Espacial del Congreso y la Medalla del Servicio Distinguido de la NASA. Su excepcional valentía, su aptitud técnica analítica inigualable y su estoica perseverancia frente a la adversidad física debilitante continúan inspirando a las sucesivas generaciones de investigadores científicos, ingenieros aeroespaciales y astronautas internacionales que actualmente desarrollan la arquitectura tecnológica para el regreso permanente de la humanidad a la superficie lunar y las futuras misiones tripuladas a la superficie marciana. La carrera de Alan Shepard ejemplifica a la perfección el espíritu inquebrantable de descubrimiento, encarnando la audacia y la visión requeridas para empujar continuamente los límites de la tecnología humana en el implacable, vasto y silencioso océano del espacio exterior."
    ]
  }
];

export default function InteractiveInfographic_PionerosM2() {
  const [expandedNode, setExpandedNode] = useState(null);

  const handleToggle = (id) => {
    setExpandedNode(expandedNode === id ? null : id);
  };

  return (
    <div style={{ backgroundColor: COLORS.darkBg, color: '#fff', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img 
          src="/assets/course/animales_pioneros/banner_pioneros.jpg" 
          alt="Banner Pioneros" 
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} 
        />
        <h1 style={{ color: COLORS.gold, marginTop: '2rem', fontSize: '2.5rem' }}>
          Alan Shepard y el Programa Mercury
        </h1>
        <p style={{ color: COLORS.paleBlue, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Un análisis técnico, médico y operativo del primer vuelo suborbital tripulado de los Estados Unidos y su duradero impacto.
        </p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
        <img 
          src="/assets/course/animales_pioneros/hero_alan.jpg" 
          alt="Alan Shepard Hero" 
          style={{ border: `4px solid ${COLORS.sand}`, borderRadius: '15px', width: '80%', maxWidth: '800px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} 
        />
        <div style={{ marginTop: '1rem' }}>
          <img 
            src="/assets/course/animales_pioneros/btn_alan.jpg" 
            alt="Boton Alan" 
            style={{ width: '150px', borderRadius: '50%', border: `2px solid ${COLORS.gold}` }} 
          />
        </div>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto' }}>
        {CONTENT_NODES.map((node) => (
          <div key={node.id} style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <button 
              onClick={() => handleToggle(node.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.5rem', backgroundColor: expandedNode === node.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'background-color 0.3s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {node.icon}
                <h2 style={{ margin: 0, fontSize: '1.4rem', color: COLORS.paleBlue }}>{node.title}</h2>
              </div>
              {expandedNode === node.id ? <ChevronUp color={COLORS.gold} /> : <ChevronDown color={COLORS.gold} />}
            </button>
            <AnimatePresence>
              {expandedNode === node.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ padding: '0 2rem 2rem 2rem' }}
                >
                  {node.paragraphs.map((p, idx) => (
                    <p key={idx} style={{ lineHeight: '1.8', textAlign: 'justify', marginBottom: '1.5rem' }}>
                      {p}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      <footer style={{ maxWidth: '900px', margin: '4rem auto 0 auto', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Book size={28} color={COLORS.sand} />
          <h3 style={{ margin: 0, color: COLORS.gold, fontSize: '1.5rem' }}>Bibliografía Académica</h3>
        </div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {BIBLIOGRAPHY.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative', lineHeight: '1.6', color: '#ddd' }}>
              <span style={{ position: 'absolute', left: 0, color: COLORS.paleBlue }}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
