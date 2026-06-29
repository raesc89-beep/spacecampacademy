// Curso: Entrenamiento de Astronautas — De la Tierra al Espacio
// 6 módulos con contenido educativo en español y 3 preguntas de quiz cada uno
export const ASTRO_TRAIN_COURSE_DATA = [
  {
    id: 'astro_train_m1',
    order: 9001,
    titleEn: 'How Are Astronauts Selected?',
    titleEs: '¿Cómo se seleccionan los astronautas?',
    badge: 'Space Candidate',
    badgeEs: 'Candidato Espacial',
    badgeIcon: '/assets/astronaut_training/astro_train_m1.png',
    color: '#FF6B35',
    icon: '/assets/astronaut_training/astro_train_m1.png',
    contentEs: {
      sections: [
        {
          id: 'astro_train_m1_s1',
          title: '¿Cómo se seleccionan los astronautas?',
          text: [
            '¿Sabías que convertirse en astronauta es más difícil que entrar a la universidad más exclusiva del mundo? De cada miles de personas que sueñan con viajar al espacio, solo un puñado diminuto lo logra. La NASA, la agencia espacial más famosa del planeta, recibe miles y miles de solicitudes cada vez que abre un proceso de selección, pero solo elige a unas pocas personas. Es un camino largo, exigente y lleno de desafíos, pero también es una de las aventuras más emocionantes que un ser humano puede emprender.',

            'Para empezar, la NASA exige que sus candidatos sean ciudadanos estadounidenses. Pero no te preocupes si vives en otro país, porque otras agencias espaciales también buscan astronautas: la ESA (Agencia Espacial Europea), JAXA (Japón), CSA (Canadá) y Roscosmos (Rusia) tienen sus propios programas de selección. Cada agencia tiene requisitos similares pero adaptados a su país. Lo importante es que, sin importar de dónde vengas, necesitas prepararte mucho para tener una oportunidad de llegar al espacio.',

            'Uno de los requisitos fundamentales es tener al menos una licenciatura universitaria en un campo STEM: ciencia, tecnología, ingeniería o matemáticas. Pero la mayoría de los seleccionados van mucho más allá: tienen maestrías, doctorados o incluso títulos de medicina. La NASA busca personas que no solo hayan estudiado, sino que hayan demostrado excelencia académica y una verdadera pasión por el conocimiento. Ingenieros aeronáuticos, físicos, biólogos, médicos y geólogos son algunos de los perfiles más comunes entre los candidatos exitosos.',

            'Además de los estudios, la NASA requiere experiencia profesional significativa. Los candidatos necesitan al menos tres años de experiencia profesional relevante después de obtener su título universitario, o bien mil horas o más como piloto al mando de aviones a reacción. Muchos astronautas vienen de las fuerzas aéreas militares, donde han volado aviones de combate y acumulado miles de horas de vuelo. Otros son científicos destacados que han liderado investigaciones importantes en sus campos. La clave es demostrar que puedes rendir bajo presión.',

            '¡Prepárate para una cifra asombrosa! En la convocatoria de 2017, la NASA recibió la increíble cantidad de 18,300 solicitudes para convertirse en astronauta. ¿Y cuántas personas fueron seleccionadas? ¡Solo 12! Eso significa que la tasa de aceptación fue de apenas el 0.065%, muchísimo más baja que la de cualquier universidad de élite del mundo. Cada uno de esos 12 elegidos tuvo que superar a más de 1,500 competidores por cada puesto disponible. Ser astronauta es, literalmente, uno de los trabajos más competitivos del planeta.',

            'La Agencia Espacial Europea (ESA) tampoco se queda atrás en competitividad. En su proceso de selección de 2021-2022, la ESA recibió más de 22,500 solicitudes de personas de toda Europa que soñaban con viajar al espacio. Después de meses de evaluaciones rigurosas, solo 17 personas fueron seleccionadas como astronautas de carrera y reserva. La ESA también hizo historia al seleccionar por primera vez a un parastronauta, demostrando que el espacio puede ser más inclusivo de lo que pensábamos.',

            'Los requisitos físicos para ser astronauta son estrictos, pero quizás no de la manera que imaginas. No necesitas ser un superatleta ni tener la fuerza de un levantador de pesas olímpico. Lo que sí necesitas es una salud excelente, una buena condición cardiovascular y una visión que sea corregible a 20/20. Tu presión arterial debe estar en rangos normales, y tu estatura debe estar entre aproximadamente 157 cm y 190 cm para poder caber en las naves espaciales. Los exámenes médicos son exhaustivos e incluyen pruebas cardíacas, neurológicas y psicológicas.',

            'El proceso de selección de la NASA consta de varias rondas eliminatorias que pueden durar más de un año. Primero, un comité revisa todas las solicitudes y elimina a quienes no cumplen los requisitos básicos. Luego, los mejores candidatos son invitados a entrevistas presenciales en el Centro Espacial Johnson en Houston, Texas. Durante estas visitas, los candidatos pasan por exámenes médicos intensivos, entrevistas con paneles de astronautas veteranos y evaluaciones psicológicas para determinar si pueden trabajar en equipo bajo condiciones extremas.',

            'Las pruebas psicológicas son una parte crucial de la selección que muchos no conocen. La NASA no solo busca personas inteligentes y sanas, sino personas que puedan mantener la calma en situaciones de emergencia, convivir en espacios reducidos durante meses y trabajar en equipo con personas de diferentes culturas e idiomas. Los evaluadores observan cómo los candidatos interactúan entre sí, cómo manejan el estrés y cómo resuelven conflictos. Un genio solitario que no sabe trabajar en equipo jamás será seleccionado como astronauta.',

            'Una vez seleccionados, los candidatos no se convierten automáticamente en astronautas. Primero reciben el título de "Candidatos a Astronauta" o ASCAN (por sus siglas en inglés) y deben completar aproximadamente dos años de entrenamiento básico antes de ser considerados astronautas completos. Durante ese período, estudian sistemas de la Estación Espacial Internacional, aprenden ruso (sí, ¡es obligatorio!), realizan entrenamiento de supervivencia en agua, practican caminatas espaciales simuladas y vuelan en aviones T-38 de entrenamiento.',

            'Aprender ruso no es un capricho, sino una necesidad práctica vital. Desde el retiro del transbordador espacial en 2011 y hasta que SpaceX comenzó sus vuelos tripulados en 2020, la única forma de llegar a la Estación Espacial Internacional era a bordo de la nave rusa Soyuz. Los astronautas deben poder comunicarse con sus compañeros rusos y operar los sistemas de la Soyuz en caso de emergencia. Por eso, todos los candidatos a astronauta de la NASA deben alcanzar un nivel funcional de ruso durante su entrenamiento.',

            'La diversidad entre los astronautas ha cambiado enormemente a lo largo de la historia. Los primeros astronautas del programa Mercury en 1959 eran todos hombres blancos y pilotos militares. Hoy en día, las clases de astronautas incluyen hombres y mujeres de diferentes orígenes étnicos, con carreras que van desde la medicina hasta la geología y la ingeniería informática. La NASA reconoce que la diversidad de perspectivas y experiencias hace equipos más fuertes y más capaces de resolver los desafíos del espacio.',

            'No todos los astronautas siguen el mismo camino. Existen diferentes categorías: los pilotos astronautas, que se especializan en volar las naves espaciales; los especialistas de misión, que realizan experimentos científicos y caminatas espaciales; y los especialistas de carga útil, que son científicos invitados para misiones específicas. Con la llegada de los vuelos comerciales de SpaceX y Boeing, también han surgido los astronautas comerciales, que vuelan en naves operadas por empresas privadas bajo contratos con la NASA.',

            'Si estás leyendo esto y sueñas con ser astronauta, hay buenas noticias: puedes empezar a prepararte desde ahora. Estudia mucho, especialmente matemáticas y ciencias. Aprende a trabajar en equipo y a resolver problemas bajo presión. Mantén una buena condición física. Aprende idiomas, especialmente inglés y ruso. Y sobre todo, nunca dejes de ser curioso ni de hacerte preguntas sobre el universo. Muchos astronautas cuentan que su viaje hacia el espacio comenzó con un simple acto: mirar las estrellas y preguntarse qué había allá arriba.',

            '¡Pero ser seleccionado es solo el primer paso de un viaje increíble! En el próximo módulo descubrirás el entrenamiento físico brutal que deben superar los astronautas: flotar en piscinas gigantes, experimentar la ingravidez en aviones especiales y soportar fuerzas de gravedad que aplastarían a cualquier persona normal. ¿Crees que tienes lo que se necesita para sobrevivir al entrenamiento más extremo del mundo? ¡Prepárate para averiguarlo!'
          ],
          image: '/assets/astronaut_training/astro_train_m1.png',
          imgCaption: 'Candidatos a astronauta durante el proceso de selección de la NASA en Houston, Texas',
        },
      ],
    },
    quizEs: [
      { q: '¿Cuántas solicitudes recibió la NASA en su convocatoria de 2017 para seleccionar astronautas?', options: ['5,000', '12,000', '18,300', '25,000'], a: 2 },
      { q: '¿Qué idioma es obligatorio aprender para los candidatos a astronauta de la NASA, además del inglés?', options: ['Chino mandarín', 'Francés', 'Ruso', 'Japonés'], a: 2 },
      { q: '¿Cuántos años de experiencia profesional mínima requiere la NASA si no tienes horas de pilotaje?', options: ['1 año', '2 años', '3 años', '5 años'], a: 2 },
    ],
  },
  {
    id: 'astro_train_m2',
    order: 9002,
    titleEn: 'Physical Training: Zero Gravity, Centrifuges, and Pools',
    titleEs: 'Entrenamiento físico: gravedad cero, centrífugas y piscinas',
    badge: 'Gravity Warrior',
    badgeEs: 'Guerrero de la Gravedad',
    badgeIcon: '/assets/astronaut_training/astro_train_m2.png',
    color: '#E74C3C',
    icon: '/assets/astronaut_training/astro_train_m2.png',
    contentEs: {
      sections: [
        {
          id: 'astro_train_m2_s1',
          title: 'Entrenamiento físico: gravedad cero, centrífugas y piscinas',
          text: [
            '¿Te imaginas flotar en una piscina tan enorme que podrías meter un edificio entero dentro de ella? Eso es exactamente lo que hacen los astronautas durante su entrenamiento en el Laboratorio de Flotabilidad Neutra de la NASA, conocido como el NBL por sus siglas en inglés. Esta instalación, ubicada en el Centro Espacial Johnson en Houston, Texas, es una de las piscinas más grandes del mundo y está diseñada para simular las condiciones de ingravidez que los astronautas experimentarán en el espacio. ¡Bienvenido al entrenamiento más mojado del universo!',

            'El Laboratorio de Flotabilidad Neutra es verdaderamente impresionante en sus dimensiones. Mide 62 metros de largo, 31 metros de ancho y 12 metros de profundidad, y contiene más de 23 millones de litros de agua. Para que te hagas una idea, eso equivale a unas nueve piscinas olímpicas juntas. En su interior hay réplicas a escala real de los módulos de la Estación Espacial Internacional sumergidas bajo el agua, donde los astronautas practican sus caminatas espaciales. Los buzos de seguridad los acompañan en todo momento para garantizar su protección.',

            'La idea detrás de la flotabilidad neutra es ingeniosa: al ajustar los pesos en el traje del astronauta para que no flote ni se hunda, se crea una sensación similar a la ingravidez del espacio. Los técnicos añaden o quitan pequeños pesos y flotadores al traje hasta que el astronauta queda suspendido en el agua sin moverse hacia arriba ni hacia abajo. No es una simulación perfecta de la microgravedad, ya que el agua crea resistencia al movimiento, pero es la mejor forma de practicar en la Tierra las tareas que se realizarán fuera de la estación espacial.',

            'Cada sesión de entrenamiento en la piscina dura aproximadamente seis horas, y los astronautas pueden pasar cientos de horas sumergidos antes de una misión. Se estima que por cada hora de caminata espacial real, un astronauta practica al menos siete horas en la piscina. Durante estas sesiones, los astronautas usan trajes presurizados que simulan los trajes espaciales reales y practican tareas específicas como instalar equipos, reparar componentes y mover objetos pesados, todo mientras flotan bajo el agua rodeados de burbujas.',

            '¡Prepárate para sentir mariposas en el estómago! El avión de gravedad cero, apodado el "Cometa del Vómito", es otra herramienta fundamental del entrenamiento de astronautas. Originalmente la NASA usaba un avión KC-135 (un Boeing 707 modificado), y actualmente se utiliza un avión similar que realiza maniobras parabólicas especiales. El avión sube a gran altura y luego se lanza en una trayectoria parabólica descendente, creando aproximadamente 25 segundos de ingravidez real en cada parábola. Los tripulantes flotan libremente dentro de la cabina, experimentando la misma sensación que tendrían en el espacio.',

            'El apodo de "Cometa del Vómito" no es una broma. Durante un vuelo típico, el avión realiza entre 30 y 40 parábolas consecutivas, alternando entre momentos de ingravidez y momentos de gravedad aumentada (hasta 1.8 veces la gravedad normal). Esta montaña rusa extrema afecta el sistema vestibular del oído interno, que es responsable de nuestro sentido del equilibrio. Es completamente normal que los pasajeros novatos sientan náuseas intensas durante las primeras parábolas, y muchos efectivamente vomitan. Con el entrenamiento, el cuerpo se adapta y las náuseas disminuyen.',

            'El entrenamiento en centrífugas es quizás el más brutal de todos. Una centrífuga humana es una máquina enorme con un brazo giratorio que tiene una cápsula en su extremo donde se sienta el astronauta. Al girar a alta velocidad, la fuerza centrífuga empuja al astronauta contra su asiento, simulando las fuerzas G que experimentará durante el lanzamiento y la reentrada a la atmósfera. Los astronautas pueden experimentar hasta 8 G durante el entrenamiento, lo que significa que sienten como si su cuerpo pesara ocho veces más de lo normal.',

            'A 8 G, la sangre de tu cuerpo es empujada hacia abajo por la fuerza, alejándose de tu cerebro. Esto puede causar visión de túnel (donde pierdes la visión periférica), visión gris (donde todo se vuelve blanco y negro) e incluso pérdida total de la consciencia si la fuerza es demasiado intensa o prolongada. Los astronautas aprenden técnicas especiales de respiración y contracción muscular llamadas maniobras anti-G para mantener la sangre fluyendo hacia el cerebro. Es un entrenamiento que pone a prueba los límites absolutos del cuerpo humano.',

            'La condición física general es un pilar fundamental del programa de entrenamiento de astronautas. Cada candidato debe mantener un nivel excelente de aptitud cardiovascular, fuerza muscular y flexibilidad. Los astronautas siguen rutinas de ejercicio que incluyen correr, nadar, levantar pesas y practicar actividades como el ciclismo y el entrenamiento funcional. No se trata de convertirlos en atletas olímpicos, sino de asegurar que sus cuerpos puedan soportar el estrés del lanzamiento, la vida en microgravedad y el regreso a la Tierra.',

            'Uno de los mayores desafíos del espacio es lo que la microgravedad le hace al cuerpo humano. Sin la fuerza de gravedad tirando constantemente hacia abajo, los músculos y los huesos comienzan a debilitarse rápidamente. Los astronautas pueden perder hasta un 1-2% de su masa ósea por cada mes que pasan en el espacio, y sus músculos pueden atrofiarse significativamente. Por eso, durante su estancia en la Estación Espacial Internacional, los astronautas deben hacer al menos dos horas y media de ejercicio intenso cada día para combatir estos efectos.',

            'El corazón también se ve afectado por la microgravedad de maneras sorprendentes. En la Tierra, tu corazón trabaja constantemente contra la gravedad para bombear sangre hacia tu cabeza. En el espacio, sin esa resistencia, el corazón puede volverse más perezoso y cambiar incluso de forma, volviéndose más esférico. Los fluidos corporales se redistribuyen hacia la parte superior del cuerpo, lo que hace que los astronautas tengan la cara hinchada y las piernas más delgadas durante los primeros días en órbita, un efecto conocido como "cara de luna y piernas de pollo".',

            'La visión de los astronautas puede deteriorarse en el espacio, un fenómeno que preocupa mucho a los médicos de la NASA. El Síndrome Neuro-Ocular Asociado al Vuelo Espacial (SANS) afecta a más del 50% de los astronautas en misiones de larga duración. La presión intracraneal aumentada por la redistribución de fluidos puede aplanar el globo ocular y dañar el nervio óptico. Algunos astronautas regresan a la Tierra necesitando gafas que no usaban antes del vuelo. Los científicos están investigando activamente cómo prevenir este problema.',

            'El sistema vestibular, ese pequeño órgano en tu oído interno que te dice dónde es arriba y dónde es abajo, se confunde completamente en microgravedad. Sin la fuerza de gravedad como referencia, el cerebro recibe señales contradictorias: tus ojos te dicen una cosa, pero tu oído interno dice otra. Esto causa la llamada "enfermedad del espacio", que afecta a aproximadamente el 60-80% de los astronautas durante los primeros dos o tres días en órbita. Los síntomas incluyen náuseas, desorientación y malestar general.',

            'Para preparar el cuerpo para todos estos cambios, los astronautas realizan estudios de línea base antes de su misión. Los médicos miden todo: densidad ósea, masa muscular, capacidad cardiovascular, presión intraocular, composición de la sangre y mucho más. Estas mediciones se repiten durante y después del vuelo para evaluar exactamente cómo el espacio afectó el cuerpo de cada astronauta. Toda esta información es valiosísima para diseñar mejores contramedidas y preparar a los humanos para misiones cada vez más largas, como un viaje a Marte.',

            '¡Tu cuerpo ya está listo para el siguiente desafío! En el próximo módulo exploraremos el entrenamiento técnico de los astronautas: cómo aprenden a manejar robots gigantes en el espacio, a realizar caminatas espaciales con trajes que pesan más que tú, y a pilotar las naves más avanzadas jamás construidas. ¿Estás preparado para convertirte en un ingeniero orbital? ¡El espacio necesita tus habilidades!'
          ],
          image: '/assets/astronaut_training/astro_train_m2.png',
          imgCaption: 'Astronauta entrenando dentro del Laboratorio de Flotabilidad Neutra de la NASA en Houston',
        },
      ],
    },
    quizEs: [
      { q: '¿Cuántos litros de agua contiene aproximadamente el Laboratorio de Flotabilidad Neutra de la NASA?', options: ['5 millones', '12 millones', '23 millones', '50 millones'], a: 2 },
      { q: '¿Cuántos segundos de ingravidez aproximadamente se experimentan en cada parábola del avión de gravedad cero?', options: ['5 segundos', '25 segundos', '60 segundos', '120 segundos'], a: 1 },
      { q: '¿Cuántas horas de ejercicio diario deben hacer los astronautas en la ISS para combatir la pérdida muscular y ósea?', options: ['30 minutos', '1 hora', '2 horas y media', '4 horas'], a: 2 },
    ],
  },
  {
    id: 'astro_train_m3',
    order: 9003,
    titleEn: 'Technical Training: Simulators, Robotics, and EVA',
    titleEs: 'Entrenamiento técnico: simuladores, robótica y EVA',
    badge: 'Orbital Engineer',
    badgeEs: 'Ingeniero Orbital',
    badgeIcon: '/assets/astronaut_training/astro_train_m3.png',
    color: '#3498DB',
    icon: '/assets/astronaut_training/astro_train_m3.png',
    contentEs: {
      sections: [
        {
          id: 'astro_train_m3_s1',
          title: 'Entrenamiento técnico: simuladores, robótica y EVA',
          text: [
            '¿Sabías que los astronautas pasan miles de horas aprendiendo cada botón, cada interruptor y cada sistema de la Estación Espacial Internacional antes de poner un pie en ella? El entrenamiento técnico es la columna vertebral de la preparación de un astronauta, y es tan intenso que muchos lo comparan con obtener varios títulos universitarios al mismo tiempo. Desde simuladores que replican la estación con exactitud milimétrica hasta robots gigantes que deben manejar con precisión quirúrgica, los astronautas deben convertirse en verdaderos expertos en ingeniería espacial.',

            'La Estación Espacial Internacional es la estructura más compleja jamás construida por la humanidad. Tiene el tamaño aproximado de un campo de fútbol, pesa más de 420 toneladas y contiene cientos de miles de componentes que deben funcionar perfectamente en todo momento. Los astronautas necesitan conocer los sistemas de soporte vital, la generación de energía eléctrica a través de paneles solares, el control térmico, los sistemas de comunicaciones, los sistemas de propulsión y la navegación orbital. Es como aprender a operar una ciudad entera flotando en el espacio.',

            'En el Centro Espacial Johnson de Houston se encuentra una réplica a escala real de la Estación Espacial Internacional. Este simulador, conocido como el Space Vehicle Mockup Facility, permite a los astronautas familiarizarse con cada módulo de la estación: el laboratorio estadounidense Destiny, el módulo japonés Kibo, el laboratorio europeo Columbus, los módulos rusos y los nodos de conexión. Los astronautas pasan semanas enteras dentro de estos simuladores, practicando procedimientos de rutina y también respondiendo a emergencias simuladas como incendios, fugas de aire y fallos eléctricos.',

            'Uno de los entrenamientos más espectaculares es el del Canadarm2, el brazo robótico de la Estación Espacial Internacional. Este brazo robótico, construido por la Agencia Espacial Canadiense, mide 17.6 metros de largo y puede mover cargas de hasta 116 toneladas en el espacio. Los astronautas aprenden a operarlo usando controles manuales y pantallas de computadora, y deben ser capaces de atrapar naves de abastecimiento que se acercan a la estación, mover módulos y asistir en caminatas espaciales. Es como jugar el videojuego más difícil y costoso del mundo, pero con objetos reales que cuestan miles de millones de dólares.',

            'La precisión requerida para operar el Canadarm2 es asombrosa. Imagina mover un brazo de casi 18 metros para atrapar una nave espacial que se acerca a una velocidad relativa de centímetros por segundo, mientras ambos objetos orbitan la Tierra a 28,000 km/h. Un error de cálculo podría provocar una colisión catastrófica. Los astronautas practican esta maniobra cientos de veces en simuladores antes de hacerla en el espacio real, usando cámaras externas y datos de distancia para guiar el brazo con una precisión de pocos centímetros.',

            '¡Prepárate para salir al vacío del espacio! Las EVA, o Actividades Extravehiculares (lo que comúnmente llamamos caminatas espaciales), son probablemente la actividad más peligrosa y emocionante que realiza un astronauta. Durante una EVA, el astronauta sale de la seguridad de la estación y trabaja en el exterior, protegido únicamente por su traje espacial. Cada caminata espacial requiere meses de preparación y entrenamiento específico, porque no hay margen para la improvisación cuando flotas en el vacío a 408 kilómetros sobre la Tierra.',

            'El traje espacial utilizado para las EVA se llama EMU (Unidad de Movilidad Extravehicular) y es mucho más que un simple traje: es una nave espacial en miniatura. Pesa aproximadamente 127 kilogramos en la Tierra y contiene sistemas de soporte vital, regulación de temperatura, comunicaciones, suministro de oxígeno y protección contra micrometeoritos y radiación. El traje está presurizado a una presión menor que la de la estación, por lo que los astronautas deben respirar oxígeno puro durante horas antes de una EVA para eliminar el nitrógeno de su sangre y evitar la enfermedad por descompresión, similar a lo que les pasa a los buzos.',

            'La realidad virtual se ha convertido en una herramienta revolucionaria para el entrenamiento de astronautas. La NASA utiliza sistemas de realidad virtual avanzados que permiten a los astronautas practicar caminatas espaciales, operaciones robóticas y procedimientos de emergencia en entornos virtuales increíblemente realistas. Con visores de VR y guantes hápticos, los astronautas pueden "tocar" y manipular componentes virtuales de la estación espacial. Esta tecnología complementa el entrenamiento en la piscina y los simuladores físicos, permitiendo que los astronautas practiquen más escenarios en menos tiempo.',

            'Antes de la llegada de SpaceX Crew Dragon, todos los astronautas que viajaban a la ISS debían entrenarse extensivamente en el simulador de la nave rusa Soyuz. La Soyuz, que ha estado en servicio desde 1967 en diferentes versiones, es una nave compacta con controles muy diferentes a los de las naves occidentales. Los astronautas debían aprender a leer instrumentos en cirílico, operar sistemas diseñados con filosofía de ingeniería soviética y comunicarse con el control de misión de Moscú en ruso. Este entrenamiento se realizaba en la Ciudad de las Estrellas, el centro de entrenamiento de cosmonautas cerca de Moscú.',

            'Con la llegada de la nave Crew Dragon de SpaceX, el entrenamiento para vuelos tripulados cambió significativamente. La Crew Dragon utiliza pantallas táctiles en lugar de botones y palancas tradicionales, y muchos de sus sistemas son automatizados. Sin embargo, los astronautas aún deben aprender a tomar el control manual en caso de emergencia, a operar los sistemas de soporte vital de la nave y a ejecutar procedimientos de acoplamiento con la ISS. El entrenamiento para la Crew Dragon se realiza en las instalaciones de SpaceX en Hawthorne, California.',

            'Los astronautas también deben convertirse en expertos en sistemas eléctricos y de plomería espacial. La ISS genera su electricidad a través de ocho enormes paneles solares que convierten la luz del Sol en energía, produciendo hasta 120 kilovatios de potencia. Cuando la estación pasa por la sombra de la Tierra (lo que ocurre cada 90 minutos), las baterías recargables toman el relevo. Los astronautas deben entender cómo funcionan estos sistemas para poder diagnosticar y reparar problemas, porque en el espacio no puedes llamar a un electricista.',

            'El sistema de soporte vital de la ISS es una maravilla de la ingeniería que los astronautas deben conocer a fondo. El sistema ECLSS (Sistema de Control Ambiental y Soporte Vital) recicla el aire eliminando el dióxido de carbono y generando oxígeno mediante electrólisis del agua. También controla la temperatura, la humedad y la presión del aire dentro de la estación. Un fallo en cualquiera de estos sistemas podría ser mortal, por lo que los astronautas practican repetidamente los procedimientos de emergencia para cada posible escenario de fallo.',

            'Las emergencias en la estación se clasifican en tres categorías principales que todo astronauta debe conocer de memoria: incendio, despresurización y fuga de amoníaco. Para cada una existe un protocolo específico que los astronautas practican una y otra vez hasta que pueden ejecutarlo incluso dormidos. En caso de incendio, deben ponerse máscaras de oxígeno y localizar la fuente. En caso de despresurización, deben sellar los módulos y encontrar la fuga. Y en caso de fuga de amoníaco tóxico del sistema de refrigeración, deben evacuar a los módulos rusos, que tienen un sistema de refrigeración diferente.',

            'El entrenamiento técnico no se limita a los sistemas de la estación. Los astronautas también deben aprender a realizar experimentos científicos en áreas tan diversas como la biología, la física de fluidos, la ciencia de materiales y la medicina. Muchos de estos experimentos no pueden repetirse en la Tierra, por lo que los astronautas deben ejecutarlos correctamente a la primera. Reciben instrucciones detalladas de los científicos en tierra, pero también deben tener el conocimiento suficiente para adaptarse si algo no sale según lo planeado.',

            '¡Ya dominas la tecnología espacial, pero el espacio también requiere que sobrevivas en los lugares más extremos de la Tierra! En el próximo módulo descubrirás cómo los astronautas se entrenan en cuevas subterráneas, hábitats submarinos, bosques helados y desiertos abrasadores. Estos entrenamientos de supervivencia extrema preparan a los astronautas para lo que podría pasar si su nave aterriza en un lugar inesperado. ¿Podrías sobrevivir en la naturaleza más salvaje del planeta? ¡Vamos a descubrirlo!'
          ],
          image: '/assets/astronaut_training/astro_train_m3.png',
          imgCaption: 'Astronauta practicando operaciones con el brazo robótico Canadarm2 en un simulador de la NASA',
        },
      ],
    },
    quizEs: [
      { q: '¿Cuánto pesa aproximadamente el traje espacial EMU utilizado para caminatas espaciales en la Tierra?', options: ['50 kg', '87 kg', '127 kg', '200 kg'], a: 2 },
      { q: '¿Cuánto mide de largo el brazo robótico Canadarm2 de la Estación Espacial Internacional?', options: ['8.5 metros', '12.3 metros', '17.6 metros', '25 metros'], a: 2 },
      { q: '¿Cuáles son las tres emergencias principales que los astronautas deben practicar en la ISS?', options: ['Incendio, inundación y terremoto', 'Incendio, despresurización y fuga de amoníaco', 'Fallo eléctrico, incendio y colisión', 'Despresurización, radiación y fallo de motor'], a: 1 },
    ],
  },
  {
    id: 'astro_train_m4',
    order: 9004,
    titleEn: 'Extreme Survival: Deserts, Forests, and Sea',
    titleEs: 'Supervivencia extrema: desiertos, bosques y mar',
    badge: 'Extreme Survivor',
    badgeEs: 'Superviviente Extremo',
    badgeIcon: '/assets/astronaut_training/astro_train_m4.png',
    color: '#2ECC71',
    icon: '/assets/astronaut_training/astro_train_m4.png',
    contentEs: {
      sections: [
        {
          id: 'astro_train_m4_s1',
          title: 'Supervivencia extrema: desiertos, bosques y mar',
          text: [
            '¿Qué tienen en común una cueva oscura bajo las montañas de Cerdeña, un hábitat en el fondo del mar de Florida y los bosques helados de Rusia? Todos son lugares donde los astronautas entrenan para el espacio. Puede parecer contradictorio, pero para prepararse para la inmensidad del cosmos, los astronautas primero deben aprender a sobrevivir en los ambientes más extremos de nuestro propio planeta. Estos entrenamientos no solo enseñan técnicas de supervivencia, sino que también forjan el trabajo en equipo, la resistencia mental y la capacidad de tomar decisiones bajo presión.',

            'El programa CAVES de la Agencia Espacial Europea es una de las experiencias de entrenamiento más fascinantes del mundo. CAVES significa "Cooperative Adventure for Valuing and Exercising human behaviour and performance Skills" (Aventura Cooperativa para Valorar y Ejercitar Habilidades de Comportamiento y Rendimiento Humano). Durante este programa, grupos de astronautas de diferentes agencias espaciales pasan aproximadamente dos semanas explorando sistemas de cuevas profundas en la isla de Cerdeña, Italia. En esas cuevas oscuras y húmedas, los astronautas experimentan condiciones sorprendentemente similares a las del espacio.',

            '¿Por qué cuevas? Porque el ambiente subterráneo comparte muchas características con el espacio: oscuridad constante, aislamiento del mundo exterior, espacios confinados, necesidad de depender completamente de tu equipo y tus compañeros, y un entorno potencialmente peligroso donde cada decisión cuenta. Los astronautas deben navegar por pasajes estrechos, descender por pozos verticales y acampar en cavernas donde nunca llega la luz del sol. No pueden simplemente "salir" cuando se sienten incómodos, igual que en el espacio. Además, la comunicación con el exterior es limitada, lo que simula los retrasos de comunicación de las misiones espaciales.',

            'Durante el programa CAVES, los astronautas no solo sobreviven bajo tierra, sino que también realizan verdadera ciencia. Recogen muestras geológicas y biológicas, documentan formaciones minerales y buscan organismos extremófilos, seres vivos que prosperan en condiciones extremas. Estas actividades simulan las tareas científicas que los astronautas realizarán en la Luna o Marte, donde deberán explorar cuevas de lava que podrían servir como refugios naturales contra la radiación. Es ciencia real en un entorno que se siente como otro mundo.',

            '¡Sumérgete con nosotros al fondo del mar! NEEMO (NASA Extreme Environment Mission Operations) es un programa donde los astronautas viven y trabajan en Aquarius, un hábitat submarino ubicado a unos 19 metros de profundidad frente a la costa de Cayo Largo, en los Cayos de Florida. Las misiones NEEMO duran entre una y tres semanas, durante las cuales los astronautas experimentan algo llamado "saturación": su cuerpo absorbe tanto nitrógeno del aire a presión que no pueden subir rápidamente a la superficie sin arriesgar su vida. Están verdaderamente aislados, como lo estarían en el espacio.',

            'La vida en Aquarius es sorprendentemente parecida a la vida en la Estación Espacial Internacional. El hábitat es pequeño y confinado, la tripulación comparte un espacio muy reducido, y las tareas de mantenimiento del hábitat son constantes. Los astronautas realizan "caminatas submarinas" que simulan caminatas espaciales, prueban equipos y herramientas que podrían usarse en la Luna o Marte, y practican técnicas de comunicación con el centro de control en tierra. La presión del agua también añade un elemento de riesgo real que mantiene a los tripulantes alerta en todo momento.',

            'El entrenamiento de supervivencia invernal en Rusia es legendario entre los astronautas. En los bosques nevados cerca de la Ciudad de las Estrellas, a temperaturas que pueden descender por debajo de los -25°C, los astronautas aprenden a sobrevivir con recursos mínimos después de un aterrizaje de emergencia. Vestidos con sus trajes de vuelo Sokol, deben construir refugios con paracaídas, encender fogatas, buscar agua y enviar señales de rescate. Este entrenamiento es obligatorio porque la nave Soyuz podría aterrizar fuera del área designada, en la vasta y gélida estepa rusa o en los bosques de Siberia.',

            'La historia ha demostrado que la supervivencia en entornos hostiles no es solo una precaución teórica. En 1965, los cosmonautas Pavel Belyayev y Alexei Leonov (el primer humano en caminar en el espacio) aterrizaron a casi 400 km del punto previsto, en un denso bosque siberiano lleno de lobos y osos. Pasaron dos noches en la nieve antes de ser rescatados. En 1976, la Soyuz 23 aterrizó en el lago Tengiz, en Kazajistán, en pleno invierno, y la tripulación tuvo que esperar horas dentro de la cápsula semi-sumergida en agua helada. Estas experiencias reales demuestran por qué el entrenamiento de supervivencia es vital.',

            'El entrenamiento de egreso en agua, conocido como "water egress training", prepara a los astronautas para sobrevivir si su cápsula aterriza en el mar. Los astronautas practican cómo salir de una cápsula espacial que flota en el agua, que está volcada, o que incluso se está hundiendo. También aprenden a inflar balsas de emergencia, a usar equipos de señalización y a mantenerse a flote durante horas esperando el rescate. Con SpaceX Crew Dragon amerizando en el océano como método estándar, este entrenamiento ha vuelto a ser más importante que nunca.',

            'El entrenamiento de supervivencia en el desierto enseña a los astronautas a sobrevivir en uno de los ambientes más despiadados de la Tierra. En programas pasados de la NASA, los astronautas del programa Apollo entrenaron en el desierto de Nevada para prepararse para las condiciones lunares y para posibles aterrizajes de emergencia en zonas áridas. Aprendieron a encontrar agua, a protegerse del sol abrasador, a conservar energía y a orientarse sin tecnología. Estas habilidades son fundamentales porque un astronauta que regresa a la Tierra podría aterrizar en cualquier parte del planeta.',

            'Más allá de las habilidades prácticas de supervivencia, estos entrenamientos tienen un propósito psicológico crucial. Enfrentar el miedo, la incomodidad y la incertidumbre en ambientes extremos revela el verdadero carácter de cada persona. Los instructores observan cómo los astronautas manejan el estrés, cómo se comunican bajo presión y si son capaces de mantener el liderazgo o seguir instrucciones cuando están exhaustos, hambrientos y asustados. Estas evaluaciones son tan importantes como las pruebas técnicas para determinar quién está listo para una misión espacial.',

            'El trabajo en equipo es el hilo conductor de todos estos entrenamientos de supervivencia. En las cuevas, bajo el mar o en los bosques helados, ningún astronauta puede sobrevivir solo. Deben confiar unos en otros con sus vidas, comunicarse de manera clara y eficiente, distribuir las tareas según las fortalezas de cada uno y tomar decisiones en consenso. Estas experiencias crean lazos profundos entre compañeros de tripulación que duran toda la vida, y son esenciales porque en el espacio, tu compañero de equipo es tu única línea de vida.',

            'Los entrenamientos de supervivencia también enseñan a los astronautas habilidades de primeros auxilios avanzados. En una situación de emergencia en un lugar remoto, o en el espacio, no hay hospitales ni ambulancias disponibles. Los astronautas aprenden a tratar heridas, fracturas, quemaduras y condiciones médicas de emergencia con los recursos limitados que tengan a mano. En la ISS, hay un botiquín médico completo y los astronautas pueden consultar con médicos en tierra, pero en una misión a Marte, los retrasos de comunicación harían imposible recibir orientación médica inmediata.',

            'La Agencia Espacial Europea también organiza el programa PANGAEA, un entrenamiento geológico que lleva a los astronautas a paisajes terrestres que se parecen a la Luna y Marte. Los astronautas visitan los campos de lava de Lanzarote en las Islas Canarias, las Dolomitas en Italia y cráteres de impacto en Alemania. Allí aprenden a identificar rocas, a tomar muestras científicas correctamente y a reconocer formaciones geológicas de interés planetario. Este conocimiento será esencial cuando los humanos vuelvan a la Luna con el programa Artemis y eventualmente caminen sobre Marte.',

            '¡Has sobrevivido a los entrenamientos más extremos de la Tierra, pero ahora es momento de dejar atrás nuestro planeta! En el próximo módulo viviremos la experiencia completa de la vida cotidiana en la Estación Espacial Internacional: cómo duermen, comen, se ejercitan y trabajan los astronautas a 408 kilómetros sobre nuestras cabezas. ¿Alguna vez te has preguntado cómo se cepillan los dientes o van al baño en el espacio? ¡Prepárate para descubrir los secretos más fascinantes de la vida orbital!'
          ],
          image: '/assets/astronaut_training/astro_train_m4.png',
          imgCaption: 'Astronautas de la ESA durante el programa CAVES, explorando cuevas profundas en Cerdeña, Italia',
        },
      ],
    },
    quizEs: [
      { q: '¿En qué isla se realiza el programa CAVES de entrenamiento en cuevas de la ESA?', options: ['Sicilia', 'Cerdeña', 'Creta', 'Mallorca'], a: 1 },
      { q: '¿A qué profundidad aproximada se encuentra el hábitat submarino Aquarius usado en las misiones NEEMO?', options: ['5 metros', '19 metros', '50 metros', '100 metros'], a: 1 },
      { q: '¿Qué cosmonauta, el primero en caminar en el espacio, aterrizó fuera del área prevista en un bosque siberiano en 1965?', options: ['Yuri Gagarin', 'Valentina Tereshkova', 'Alexei Leonov', 'Gherman Titov'], a: 2 },
    ],
  },
  {
    id: 'astro_train_m5',
    order: 9005,
    titleEn: 'Life on the International Space Station',
    titleEs: 'La vida en la Estación Espacial Internacional',
    badge: 'Space Citizen',
    badgeEs: 'Ciudadano del Espacio',
    badgeIcon: '/assets/astronaut_training/astro_train_m5.png',
    color: '#9B59B6',
    icon: '/assets/astronaut_training/astro_train_m5.png',
    contentEs: {
      sections: [
        {
          id: 'astro_train_m5_s1',
          title: 'La vida en la Estación Espacial Internacional',
          text: [
            '¡Imagina despertarte cada mañana y ver nuestro planeta azul flotando fuera de tu ventana! La Estación Espacial Internacional (ISS) orbita la Tierra a una altitud promedio de 408 kilómetros, viajando a la increíble velocidad de 28,000 kilómetros por hora. A esa velocidad, la estación completa una vuelta entera alrededor de la Tierra cada 90 minutos, lo que significa que los astronautas ven 16 amaneceres y 16 atardeceres cada día. Es el hogar más extraordinario que los seres humanos han construido jamás, y en este módulo vivirás la experiencia de habitarlo.',

            'La ISS es un laboratorio orbital que ha estado habitado de forma continua desde noviembre del año 2000. Normalmente alberga a una tripulación de 6 a 7 astronautas de diferentes países, que trabajan juntos como una familia internacional en el espacio. La estación tiene un volumen habitable de aproximadamente 388 metros cúbicos, similar al interior de un Boeing 747. Pero a diferencia de un avión, los astronautas pueden usar cada centímetro del espacio, incluyendo el techo y las paredes, porque en microgravedad no hay un "arriba" ni un "abajo" definido.',

            'El día a día de un astronauta en la ISS sigue un horario estricto coordinado por los centros de control de misión en Houston, Moscú, Múnich, Tsukuba (Japón) y Montreal. Un día típico comienza a las 6:00 de la mañana (hora GMT). Los astronautas dedican unas 6.5 horas al trabajo científico y mantenimiento de la estación, 2.5 horas obligatorias al ejercicio físico, y el resto a comidas, reuniones con el centro de control, preparación del día siguiente y tiempo personal. Cada minuto está planificado con semanas de anticipación por equipos en tierra.',

            '¿Cómo duermes cuando no hay gravedad que te mantenga en una cama? Los astronautas de la ISS duermen dentro de pequeños sacos de dormir que están atados a las paredes de sus "camarotes" personales, que son poco más que cabinas del tamaño de una cabina telefónica. Si no se sujetaran, flotarían libremente por la estación mientras duermen y podrían golpearse con el equipo o bloquear las rejillas de ventilación. Los camarotes tienen una pequeña ventana y espacio para fotos familiares. Muchos astronautas dicen que dormir en el espacio es maravilloso: sin el peso de la gravedad, no hay puntos de presión, y la sensación es como flotar en una nube.',

            'La comida espacial ha recorrido un largo camino desde los tubos de pasta que comían los primeros astronautas. Hoy en día, los astronautas de la ISS disfrutan de un menú variado que incluye más de 200 opciones diferentes. La comida viene en diferentes formatos: deshidratada (se le añade agua caliente), termoestabilizada (como las conservas), irradiada y fresca (cuando llegan naves de abastecimiento). Los astronautas pueden elegir sus comidas favoritas antes de la misión, y algunas agencias espaciales envían platos típicos de sus países. Los astronautas japoneses disfrutan de ramen, los rusos de borsch y los mexicanos han llevado tortillas, que son perfectas en el espacio porque no producen migas flotantes.',

            '¡El agua en la ISS tiene un secreto que podría sorprenderte! Debido a que transportar agua desde la Tierra es enormemente caro (cuesta aproximadamente 20,000 dólares por cada kilogramo enviado a órbita), la estación recicla casi toda el agua posible. El sistema de reciclaje de agua de la ISS recupera aproximadamente el 93% del agua, incluyendo la humedad del aire, el sudor de los astronautas y, sí, ¡incluso la orina! El agua reciclada es filtrada y purificada tan exhaustivamente que los astronautas aseguran que es más limpia que la mayoría del agua del grifo en la Tierra.',

            'Ir al baño en el espacio es una de las preguntas que más curiosidad genera, y la respuesta es fascinante. El inodoro de la ISS usa succión en lugar de gravedad para funcionar. Los astronautas se sujetan con correas al asiento y un sistema de aspiración recoge los desechos. La orina es dirigida al sistema de reciclaje de agua (sí, el mismo que mencionamos antes), mientras que los desechos sólidos se sellan en contenedores especiales, se almacenan y eventualmente se cargan en naves de abastecimiento que se desintegran al reingresar a la atmósfera. Cada astronauta tiene su propio embudo personal adaptado a su anatomía.',

            'El ejercicio en la ISS no es opcional: es una prescripción médica obligatoria. Los astronautas cuentan con tres máquinas principales de ejercicio: una cinta de correr llamada COLBERT (sujeta por bandas elásticas para que el astronauta no salga flotando), una bicicleta estática llamada CEVIS, y un dispositivo de ejercicio de resistencia llamado ARED que simula el levantamiento de pesas usando cilindros de vacío. Las 2.5 horas diarias de ejercicio son esenciales para mantener los músculos y huesos en condición, ya que sin gravedad, el cuerpo perdería masa ósea y muscular rápidamente.',

            'La comunicación entre la ISS y la Tierra es constante pero no continua. La estación se comunica con el centro de control a través de una red de satélites de retransmisión llamados TDRS (Tracking and Data Relay Satellites) que proporcionan cobertura durante la mayor parte de la órbita. Los astronautas pueden hacer videollamadas a sus familias, enviar correos electrónicos y hasta publicar en redes sociales. Sin embargo, la conexión a internet es relativamente lenta comparada con la que tenemos en casa, con velocidades de descarga de apenas unos pocos megabits por segundo.',

            'Las tareas de mantenimiento ocupan una parte significativa del día de un astronauta. La ISS es como una casa muy complicada que necesita reparaciones constantes: filtros de aire que cambiar, equipos que calibrar, experimentos que configurar y módulos que limpiar. Los astronautas también deben monitorear los sistemas de soporte vital, revisar los niveles de oxígeno y dióxido de carbono, y asegurarse de que todos los sistemas funcionen correctamente. Aproximadamente un tercio del tiempo de trabajo de un astronauta se dedica a estas tareas de "ama de casa espacial".',

            'Los experimentos científicos son la razón principal de la existencia de la ISS. La estación sirve como laboratorio de microgravedad único donde se realizan cientos de experimentos en áreas como biología, física, ciencia de materiales y tecnología. Los astronautas cultivan vegetales en el espacio (el proyecto Veggie ha producido lechuga, rábanos y chiles), estudian cómo se comportan las llamas sin gravedad, observan el crecimiento de cristales de proteínas y realizan experimentos médicos sobre el cuerpo humano. Muchos de estos experimentos no podrían hacerse en ningún otro lugar del universo.',

            'El módulo Cupola es el lugar favorito de muchos astronautas en la ISS. Esta cúpula de observación, construida por la ESA e instalada en 2010, tiene siete ventanas que ofrecen una vista panorámica de 360 grados de la Tierra y el espacio. La ventana central tiene un diámetro de 80 centímetros y es la ventana más grande jamás instalada en el espacio. Los astronautas usan la Cupola para fotografiar la Tierra, controlar operaciones robóticas con el Canadarm2 y, en sus momentos libres, simplemente contemplar la belleza de nuestro planeta. Muchos astronautas dicen que ver la Tierra desde la Cupola cambió sus vidas para siempre.',

            'La convivencia multicultural en la ISS es un aspecto único que pocos conocen. Astronautas estadounidenses, rusos, europeos, japoneses y canadienses conviven en un espacio reducido durante meses. Celebran juntos las fiestas de cada cultura: Navidad, el Año Nuevo ruso (que se celebra dos veces por el calendario juliano), el Tanabata japonés y muchas más. Las barreras del idioma se superan con humor, paciencia y mucho entrenamiento previo. La ISS ha demostrado que personas de países con historias de conflicto pueden trabajar juntas en armonía cuando comparten un objetivo común.',

            'Uno de los fenómenos psicológicos más profundos que experimentan los astronautas se conoce como el "efecto perspectiva" (overview effect). Al ver la Tierra desde el espacio, sin fronteras visibles entre los países, muchos astronautas experimentan una transformación emocional y cognitiva profunda. Sienten una conexión nueva con toda la humanidad y una comprensión visceral de la fragilidad de nuestro planeta. El astronauta Ron Garan describió la sensación como ver "una oasis brillante y colorido flotando en la inmensidad del vacío oscuro e inhóspito del espacio". Esta experiencia ha convertido a muchos astronautas en fervientes defensores del medio ambiente.',

            '¡Ya conoces los secretos de la vida en la ISS, pero el futuro nos lleva mucho más lejos! En el próximo y último módulo exploraremos las misiones que están por venir: el programa Artemis que nos devolverá a la Luna, la estación Gateway que orbitará nuestro satélite natural, y los planes para enviar humanos a Marte por primera vez en la historia. ¿Estás listo para dar el salto más grande que la humanidad haya intentado jamás? ¡El futuro del espacio nos espera!'
          ],
          image: '/assets/astronaut_training/astro_train_m5.png',
          imgCaption: 'Vista de la Tierra desde la Cúpula de observación de la Estación Espacial Internacional',
        },
      ],
    },
    quizEs: [
      { q: '¿Cada cuántos minutos completa la ISS una órbita alrededor de la Tierra?', options: ['45 minutos', '60 minutos', '90 minutos', '120 minutos'], a: 2 },
      { q: '¿Qué porcentaje del agua recicla aproximadamente el sistema de la ISS, incluyendo la orina?', options: ['50%', '75%', '93%', '100%'], a: 2 },
      { q: '¿Cómo se llama el fenómeno psicológico que experimentan los astronautas al ver la Tierra desde el espacio?', options: ['Síndrome de Estocolmo', 'Efecto perspectiva', 'Mal de altura', 'Síndrome del astronauta'], a: 1 },
    ],
  },
  {
    id: 'astro_train_m6',
    order: 9006,
    titleEn: 'The Future: Artemis, Mars, and Beyond',
    titleEs: 'El futuro: Artemis, Marte y más allá',
    badge: 'Explorer of Tomorrow',
    badgeEs: 'Explorador del Mañana',
    badgeIcon: '/assets/astronaut_training/astro_train_m6.png',
    color: '#FFD700',
    icon: '/assets/astronaut_training/astro_train_m6.png',
    contentEs: {
      sections: [
        {
          id: 'astro_train_m6_s1',
          title: 'El futuro: Artemis, Marte y más allá',
          text: [
            '¡El futuro de la exploración espacial está a punto de vivir su capítulo más emocionante! Después de más de medio siglo desde que el último ser humano pisó la Luna en diciembre de 1972, con la misión Apollo 17, la humanidad se prepara para regresar a nuestro satélite natural y, esta vez, para quedarse. El programa Artemis de la NASA, nombrado en honor a la diosa griega hermana gemela de Apolo, no solo planea llevar astronautas de vuelta a la superficie lunar, sino hacerlo de una manera completamente nueva: con tecnología del siglo XXI y con la diversidad que el programa Apollo nunca tuvo.',

            'Artemis tiene objetivos ambiciosos que van mucho más allá de repetir lo que hizo Apollo. El programa planea establecer una presencia sostenible en la Luna, incluyendo un campamento base en la superficie lunar cerca del polo sur, donde se cree que hay depósitos de hielo de agua en cráteres permanentemente en sombra. Esta agua podría usarse para beber, generar oxígeno respirable y producir combustible para cohetes mediante la separación del hidrógeno y el oxígeno. La Luna se convertiría así en una gasolinera cósmica y un laboratorio donde aprender a vivir en otro mundo.',

            'La estación Gateway será una pieza clave del programa Artemis. A diferencia de la ISS, que orbita la Tierra, Gateway orbitará la Luna y servirá como punto de parada para los astronautas que viajen entre la Tierra y la superficie lunar. Esta miniestación espacial será mucho más pequeña que la ISS, pero estará equipada con módulos habitables, sistemas de propulsión eléctrica solar y puertos de acoplamiento para diferentes naves espaciales. Gateway será construida de forma internacional, con contribuciones de la NASA, la ESA, JAXA y la CSA, y representará un nuevo modelo de cooperación espacial.',

            'El cohete que impulsará las misiones Artemis es el Space Launch System (SLS), el vehículo de lanzamiento más potente jamás construido por la NASA. El SLS mide 98 metros de altura y genera 39.1 meganewtons de empuje al despegar, un 15% más que el legendario Saturn V que llevó a los astronautas del Apollo a la Luna. La nave que transportará a los astronautas se llama Orión, una cápsula diseñada para viajes de larga duración en el espacio profundo que puede albergar hasta cuatro tripulantes y resistir las velocidades extremas de reentrada al regresar de la Luna.',

            'Pero el verdadero sueño que mantiene despiertos a los ingenieros y astronautas de todo el mundo es Marte. El Planeta Rojo, ubicado a una distancia promedio de 225 millones de kilómetros de la Tierra, representa el mayor desafío de exploración que la humanidad haya enfrentado. Un viaje a Marte tomaría entre 6 y 9 meses solo de ida, dependiendo de la alineación orbital de ambos planetas. Los astronautas tendrían que esperar aproximadamente 26 meses en Marte antes de que los planetas se realineen para el viaje de regreso, lo que hace que una misión completa a Marte dure aproximadamente 3 años.',

            'La comunicación con la Tierra desde Marte plantea un desafío completamente nuevo. Mientras que los astronautas en la ISS pueden hablar con Houston casi en tiempo real, una señal de radio entre la Tierra y Marte tarda entre 4 y 24 minutos en llegar, dependiendo de las posiciones relativas de los planetas. Esto significa que una conversación simple tendría un retraso de ida y vuelta de hasta 48 minutos. Los astronautas en Marte no podrán pedir instrucciones inmediatas al control de misión: deberán ser capaces de tomar decisiones autónomas y resolver emergencias por su cuenta. El entrenamiento para esta autonomía comienza en la Tierra.',

            'SpaceX y su nave Starship representan un enfoque revolucionario para llegar a Marte. Diseñada por la empresa de Elon Musk, Starship será la nave espacial más grande y potente jamás construida, capaz de transportar hasta 100 toneladas de carga o hasta 100 personas al espacio profundo. Con una altura total de 121 metros (incluyendo el cohete propulsor Super Heavy), Starship es completamente reutilizable, lo que podría reducir drásticamente el costo de los viajes espaciales. La NASA ha seleccionado una versión de Starship como módulo de aterrizaje lunar para las misiones Artemis.',

            'La radiación cósmica es uno de los peligros más graves para los astronautas en misiones de larga duración fuera de la protección del campo magnético de la Tierra. En la ISS, los astronautas están parcialmente protegidos por la magnetosfera terrestre, pero en el espacio profundo y en Marte, estarán expuestos a rayos cósmicos galácticos y partículas de alta energía del Sol. Esta radiación puede dañar el ADN, aumentar el riesgo de cáncer y afectar el sistema nervioso central. Los científicos están desarrollando nuevos materiales de blindaje, medicamentos radioprotectores y hábitats que usen el suelo marciano como escudo.',

            'La preparación psicológica para una misión a Marte es quizás el desafío menos visible pero más complejo. Imagina estar encerrado con las mismas 4 a 6 personas durante tres años, en un espacio no mayor que una casa pequeña, a millones de kilómetros de cualquier otra persona. Sin la posibilidad de salir a dar un paseo, sin poder llamar a tu familia sin un retraso enorme y sin la opción de ser rescatado si las cosas salen mal. Estudios como Mars-500, donde voluntarios vivieron aislados durante 520 días simulando un viaje a Marte, han revelado los enormes desafíos de monotonía, conflictos interpersonales y deterioro emocional que enfrentarán los tripulantes.',

            'Los efectos de la microgravedad prolongada sobre el cuerpo humano son una preocupación central para las misiones a Marte. Después de meses sin gravedad, los astronautas llegarán a un planeta con un 38% de la gravedad terrestre y deberán ser capaces de caminar, trabajar y posiblemente correr en caso de emergencia. El astronauta Scott Kelly, que pasó 340 días consecutivos en la ISS, experimentó cambios en su visión, su sistema inmunológico, la expresión de sus genes e incluso en la longitud de sus telómeros (las tapas protectoras de los cromosomas). Los científicos estudian estos datos para desarrollar contramedidas que protejan a los astronautas marcianos.',

            'La alimentación durante un viaje a Marte plantea desafíos únicos que no existen en las misiones a la ISS. No habrá naves de abastecimiento regulares trayendo comida fresca: los astronautas deberán llevar toda su comida para tres años o producir parte de ella en el camino. La NASA investiga activamente sistemas de cultivo espacial que permitan producir frutas, verduras y hasta proteínas a bordo de la nave. Tecnologías como la agricultura hidropónica, la impresión 3D de alimentos y el cultivo de algas comestibles podrían ser la clave para alimentar a las futuras tripulaciones marcianas.',

            'Los hábitats en Marte deberán proteger a los astronautas de la radiación, las temperaturas extremas (que pueden descender a -60°C) y la atmósfera tóxica compuesta principalmente de dióxido de carbono. Varias agencias espaciales y empresas privadas están diseñando hábitats que podrían construirse usando impresión 3D con regolito marciano (el suelo de Marte), estructuras inflables reforzadas con materiales avanzados, o incluso cuevas de lava naturales que ofrecerían protección contra la radiación. La vida en Marte requerirá un nivel de autosuficiencia que ningún ser humano ha tenido que desarrollar jamás.',

            'El entrenamiento de los futuros astronautas marcianos será radicalmente diferente al de los astronautas actuales. Además de todas las habilidades que ya conoces, deberán ser médicos capaces de realizar cirugías de emergencia, geólogos que puedan identificar recursos en el terreno marciano, ingenieros que reparen cualquier sistema sin piezas de repuesto de la Tierra, y psicólogos de sí mismos capaces de mantener su salud mental durante años de aislamiento. Se habla de tripulaciones de al menos seis personas con perfiles extremadamente complementarios.',

            'La exploración más allá de Marte también está en el horizonte. Los científicos sueñan con enviar misiones tripuladas a los asteroides cercanos a la Tierra para estudiar su composición y, potencialmente, extraer minerales valiosos. Las lunas de Júpiter, especialmente Europa (con su océano subterráneo bajo una corteza de hielo), y Encélado, la luna de Saturno que lanza géiseres de agua al espacio, son destinos fascinantes donde podríamos encontrar vida extraterrestre. Aunque estos viajes aún están a décadas de distancia, cada misión que realizamos hoy nos acerca un paso más a esos destinos extraordinarios.',

            '¡Felicidades, explorador! Has completado el curso de Entrenamiento de Astronautas de la Space Camp Academy. Ahora conoces el increíble camino que recorren los hombres y mujeres que viajan al espacio: desde la selección inicial entre miles de candidatos, pasando por el entrenamiento físico brutal, la preparación técnica exhaustiva y la supervivencia en ambientes extremos, hasta la vida cotidiana en la ISS y los sueños del futuro. Quizás algún día seas tú quien mire la Tierra desde la ventana de una nave espacial. Recuerda: cada astronauta comenzó como un niño o una niña que miraba las estrellas y se atrevía a soñar. ¡Nunca dejes de mirar hacia arriba!'
          ],
          image: '/assets/astronaut_training/astro_train_m6.png',
          imgCaption: 'Concepto artístico de astronautas explorando la superficie de Marte en una futura misión tripulada',
        },
      ],
    },
    quizEs: [
      { q: '¿Cuánto tarda aproximadamente un viaje de la Tierra a Marte (solo ida)?', options: ['2 a 4 semanas', '1 a 3 meses', '6 a 9 meses', '2 a 3 años'], a: 2 },
      { q: '¿Cuál es el retraso máximo de comunicación entre la Tierra y Marte (solo ida)?', options: ['3 segundos', '2 minutos', '24 minutos', '2 horas'], a: 2 },
      { q: '¿Cómo se llama la estación espacial que orbitará la Luna como parte del programa Artemis?', options: ['Orión', 'Skylab 2', 'Gateway', 'Lunar Base Alpha'], a: 2 },
    ],
  },
];
