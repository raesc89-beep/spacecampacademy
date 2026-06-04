const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'courseData.js');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw.replace(/^export const COURSE_DATA = /, '').replace(/;\s*$/, ''));

// ============================================================
// starwars_sec_7 — El código Jedi: La neurociencia y el budismo
// ============================================================
const sw7 = data.find(m => m.id === 'starwars_sec_7');
if (!sw7) { console.error('Module starwars_sec_7 not found!'); process.exit(1); }

sw7.contentEs = { sections: [{ text: [
  '¿Sabías que los Jedi entrenan su mente igual que los neurocientíficos recomiendan? 🧠 El cerebro tiene una zona llamada amígdala, que es como una alarma de emergencia. Cuando sientes miedo o enojo, la amígdala se activa y envía señales de alerta a todo el cuerpo. Los Jedi aprenden a controlar esta respuesta, y la ciencia moderna nos enseña cómo hacerlo también. Estudios de la Universidad de Harvard han demostrado que la meditación puede reducir el tamaño de la amígdala con el tiempo. ¡Tu cerebro puede cambiar su propia estructura!',

  'La corteza prefrontal es la parte del cerebro que nos ayuda a tomar decisiones inteligentes y controlar nuestros impulsos. 🎯 Es como el Maestro Yoda de tu cerebro: sabia, calmada y siempre pensando antes de actuar. En los niños y adolescentes, esta zona todavía está desarrollándose, por eso a veces es más difícil controlar las emociones. Los Jedi meditan para fortalecer esta conexión entre la corteza prefrontal y la amígdala. La buena noticia es que con práctica, tú también puedes mejorar este circuito cerebral.',

  'La meditación mindfulness, o atención plena, es una técnica que los científicos han estudiado durante décadas. 🧘 Investigadores de la UCLA descubrieron que las personas que meditan regularmente tienen más materia gris en zonas del cerebro relacionadas con la memoria y la empatía. En Star Wars, los Jedi meditan para conectarse con la Fuerza, pero en la vida real, la meditación te ayuda a concentrarte mejor, dormir más tranquilo y sentirte menos estresado. Solo necesitas 10 minutos al día para empezar a notar cambios.',

  'El budismo, una filosofía milenaria nacida en la India hace más de 2,500 años, influyó mucho en la creación del código Jedi. ☸️ Buda enseñaba que el sufrimiento viene del apego a las cosas materiales y de las emociones descontroladas. Los Jedi siguen principios similares: no hay emoción, hay paz; no hay ignorancia, hay conocimiento. Estas ideas no son solo filosofía antigua; la psicología moderna las usa en terapias como la Terapia Cognitivo-Conductual para ayudar a las personas a manejar la ansiedad y la depresión.',

  'La neuroplasticidad es uno de los descubrimientos más emocionantes de la neurociencia moderna. 🌟 Significa que tu cerebro puede reorganizarse y crear nuevas conexiones neuronales durante toda tu vida. Cada vez que aprendes algo nuevo, practicas un instrumento o resuelves un problema de matemáticas, tu cerebro forma nuevas redes. Los Jedi más jóvenes, los Padawan, entrenan desde pequeños porque saben que el cerebro joven es especialmente plástico. Pero incluso el Maestro Yoda, con sus 900 años, seguía aprendiendo.',

  'La respuesta de lucha o huida es un mecanismo de supervivencia que heredamos de nuestros ancestros. ⚡ Cuando tu cerebro detecta peligro, libera hormonas como la adrenalina y el cortisol que preparan tu cuerpo para pelear o escapar. Tu corazón late más rápido, tus pupilas se dilatan y tus músculos se tensan. Un Jedi aprende a reconocer esta respuesta sin dejarse controlar por ella. Los psicólogos llaman a esto regulación emocional, y es una habilidad que se puede aprender con práctica.',

  'La técnica de respiración 4-7-8 es una herramienta poderosa que usan tanto los meditadores como los astronautas de la NASA. 🌬️ Consiste en inhalar durante 4 segundos, mantener el aire 7 segundos y exhalar lentamente durante 8 segundos. Esta técnica activa el nervio vago, que conecta el cerebro con el corazón y los intestinos, enviando una señal de calma a todo el cuerpo. Cuando Obi-Wan Kenobi cierra los ojos antes de una batalla, probablemente está haciendo algo muy similar.',

  'Carol Dweck, una psicóloga de la Universidad de Stanford, descubrió algo fascinante sobre cómo pensamos. 📚 Ella identificó dos tipos de mentalidad: la mentalidad fija (creer que tu inteligencia no puede cambiar) y la mentalidad de crecimiento (creer que puedes mejorar con esfuerzo). Los Jedi tienen una mentalidad de crecimiento total: siempre están entrenando, aprendiendo y superándose. Los estudios muestran que los estudiantes con mentalidad de crecimiento obtienen mejores calificaciones y disfrutan más del aprendizaje.',

  'Daniel Goleman, un psicólogo famoso, popularizó el concepto de inteligencia emocional en los años 90. 💡 La inteligencia emocional incluye cinco habilidades: conocer tus emociones, manejarlas, motivarte a ti mismo, reconocer las emociones de otros y manejar las relaciones. Un Jedi maestro como Yoda demuestra todas estas habilidades. Goleman descubrió que la inteligencia emocional puede ser más importante que el cociente intelectual (IQ) para tener éxito en la vida.',

  'Las neuronas espejo son células especiales en tu cerebro que se activan tanto cuando haces algo como cuando ves a alguien más hacerlo. 🪞 Si ves a alguien sonreír, tus neuronas espejo hacen que quieras sonreír también. Los Jedi usan esta capacidad para sentir las emociones de otros a través de la Fuerza. En la vida real, las neuronas espejo son la base de la empatía, esa capacidad maravillosa de ponerte en los zapatos de otra persona y entender cómo se siente.',

  'El estrés crónico puede dañar tu cerebro si no lo manejas bien. 😰 Cuando estás estresado todo el tiempo, tu cuerpo produce demasiado cortisol, una hormona que en exceso puede reducir el hipocampo, la parte del cerebro que almacena recuerdos. Por eso cuando estás muy nervioso antes de un examen, a veces se te olvida todo lo que estudiaste. Los Jedi que caen al Lado Oscuro, como Anakin Skywalker, muestran exactamente lo que pasa cuando el estrés y las emociones negativas toman control.',

  'La psicología positiva, fundada por Martin Seligman, estudia qué hace felices a las personas en lugar de solo estudiar las enfermedades mentales. 😊 Seligman descubrió que la felicidad duradera viene de cinco elementos: emociones positivas, compromiso con actividades que disfrutas, relaciones significativas, encontrar un propósito y lograr metas. El código Jedi se alinea perfectamente con estos principios: los Jedi encuentran propósito en servir a la galaxia y mantienen relaciones de mentoría profundas.',

  'Los mandalas, diseños circulares usados en el budismo tibetano, son una forma de meditación activa. 🎨 Al colorear o crear un mandala, tu cerebro entra en un estado de flujo similar a la meditación. Estudios publicados en la revista científica Art Therapy demostraron que colorear mandalas reduce significativamente la ansiedad. En el Templo Jedi de Coruscant, los Padawan probablemente tenían actividades similares para entrenar su concentración. Tú puedes probar esto en casa con solo un papel y colores.',

  'El sueño es fundamental para la salud emocional y el aprendizaje. 😴 Durante la fase de sueño REM, tu cerebro procesa las emociones del día y consolida los recuerdos importantes. Los científicos del Instituto Walker de la Universidad de California descubrieron que dormir mal una sola noche puede aumentar la actividad de la amígdala en un 60%. Un Jedi descansado es un Jedi más sabio. Los expertos recomiendan que los niños de 6 a 13 años duerman entre 9 y 11 horas cada noche.',

  'Así como los Jedi transmiten su sabiduría de maestro a Padawan, tú puedes empezar a entrenar tu mente hoy mismo. 🌈 No necesitas la Fuerza ni un sable de luz: solo necesitas curiosidad, práctica y paciencia. Prueba meditar 5 minutos antes de dormir, practica la respiración 4-7-8 cuando te sientas nervioso, y recuerda que tu cerebro está cambiando y creciendo cada día. La neurociencia nos ha demostrado que todos tenemos el poder de ser más sabios, más empáticos y más felices. Que la ciencia te acompañe. ✨'
]}]};

sw7.quizEs = [
  { q: '¿Qué parte del cerebro actúa como una alarma de emergencia ante el miedo?', options: ['Corteza prefrontal', 'Amígdala', 'Hipocampo', 'Cerebelo'], a: 1 },
  { q: '¿Qué es la neuroplasticidad?', options: ['Un tipo de plástico para el cerebro', 'La capacidad del cerebro de reorganizarse y crear nuevas conexiones', 'Una enfermedad neurológica', 'Un videojuego educativo'], a: 1 },
  { q: '¿Qué técnica de respiración usan los astronautas de la NASA para calmarse?', options: ['Respiración 10-10-10', 'Respiración 4-7-8', 'Respiración 2-2-2', 'Respiración libre'], a: 1 },
  { q: '¿Qué psicóloga descubrió la mentalidad de crecimiento?', options: ['Carol Dweck', 'Daniel Goleman', 'Marie Curie', 'Jane Goodall'], a: 0 },
  { q: '¿Qué son las neuronas espejo?', options: ['Neuronas que reflejan la luz', 'Células que se activan al hacer o ver una acción', 'Un tipo de espejo cerebral', 'Neuronas que solo existen en bebés'], a: 1 }
];

// ============================================================
// starwars_sec_8 — Cruceros espaciales
// ============================================================
const sw8 = data.find(m => m.id === 'starwars_sec_8');
if (!sw8) { console.error('Module starwars_sec_8 not found!'); process.exit(1); }

sw8.contentEs = { sections: [{ text: [
  '¿Te imaginas construir una nave del tamaño de una ciudad flotando en el espacio? 🚀 En Star Wars, los Destructores Estelares Imperiales miden 1,600 metros de largo, ¡más que 16 campos de fútbol! En la vida real, la Estación Espacial Internacional (ISS) es la estructura más grande que los humanos hemos construido en órbita, y mide 109 metros de punta a punta. Aunque es mucho más pequeña que un Destructor Estelar, la ISS es una maravilla de la ingeniería que ha estado habitada continuamente desde el año 2000.',

  'La ISS pesa aproximadamente 420,000 kilogramos y orbita la Tierra a 408 kilómetros de altura, viajando a 27,600 km/h. 🌍 A esa velocidad, da una vuelta completa al planeta cada 90 minutos, lo que significa que los astronautas ven 16 amaneceres y 16 atardeceres cada día. Para construirla, se necesitaron más de 40 misiones espaciales y la colaboración de 15 países. Cada módulo fue lanzado por separado y ensamblado en órbita, como un gigantesco LEGO espacial.',

  'Los materiales que se usan en naves espaciales reales son increíblemente avanzados. 🔬 La fibra de carbono es cinco veces más fuerte que el acero pero mucho más ligera. Las aleaciones de titanio resisten temperaturas extremas sin deformarse. Los aerogeles, apodados humo congelado, son los sólidos más ligeros del mundo y excelentes aislantes térmicos. La NASA usa estos materiales en sus misiones, y algún día podrían usarse para construir naves mucho más grandes que la ISS.',

  'Para mover una nave espacial, necesitas propulsión, y hay muchos tipos diferentes. 🔥 Los cohetes químicos, como los de SpaceX, queman combustible líquido (hidrógeno y oxígeno) para generar un empuje enorme. Son perfectos para escapar de la gravedad terrestre, pero consumen demasiado combustible para viajes largos. Por eso los ingenieros están desarrollando alternativas como los motores iónicos, que aceleran partículas cargadas con electricidad para crear un empuje suave pero constante durante meses o incluso años.',

  'Las velas solares son una de las ideas más elegantes de la exploración espacial. ⛵ En lugar de usar combustible, una vela solar captura la presión de los fotones de luz del Sol para impulsar la nave. La misión IKAROS de Japón demostró en 2010 que esta tecnología funciona. La Planetary Society lanzó LightSail 2 en 2019, que usó una vela de solo 32 metros cuadrados para cambiar su órbita. Para una nave como el Halcón Milenario, necesitarías una vela del tamaño de una ciudad entera.',

  'La propulsión nuclear es otra opción prometedora para viajes interplanetarios. ☢️ El proyecto NERVA de la NASA en los años 60 ya probó motores nucleares térmicos que eran el doble de eficientes que los cohetes químicos. Hoy, la NASA y DARPA están desarrollando el proyecto DRACO para crear un cohete nuclear que podría llevar astronautas a Marte en solo 45 días en lugar de los 7 meses actuales. Los Destructores Estelares probablemente usarían algo similar, pero mil veces más potente.',

  'La mecánica orbital es la ciencia que explica cómo las cosas se mueven en el espacio. 🌙 Para cambiar de órbita, no basta con apuntar hacia tu destino y encender los motores. Necesitas entender conceptos como delta-v (la cantidad total de cambio de velocidad que tu nave puede hacer) y las asistencias gravitatorias, donde usas la gravedad de un planeta como una honda para ganar velocidad gratis. La sonda Voyager 1 usó asistencias gravitatorias de Júpiter y Saturno para alcanzar la velocidad necesaria para salir del sistema solar.',

  'Las megaestructuras espaciales han fascinado a los científicos durante décadas. 🏗️ En 1974, el físico Gerard O\'Neill propuso construir enormes cilindros rotantes de 8 kilómetros de diámetro donde podrían vivir millones de personas. Estos cilindros rotarían para crear gravedad artificial mediante la fuerza centrífuga. Jeff Bezos, fundador de Blue Origin, ha citado los cilindros de O\'Neill como inspiración para el futuro de la humanidad en el espacio.',

  'La esfera de Dyson es el concepto de megaestructura más ambicioso jamás propuesto. 🌞 Imaginada por el físico Freeman Dyson en 1960, sería una estructura que rodearía completamente una estrella para capturar toda su energía. Una esfera de Dyson alrededor del Sol capturaría 400 trillones de vatios de energía, suficiente para alimentar una civilización miles de millones de veces más avanzada que la nuestra. La Estrella de la Muerte de Star Wars sería apenas un punto comparada con una esfera de Dyson.',

  'La minería de asteroides podría ser la clave para construir grandes naves en el espacio. ⛏️ El asteroide Psyche 16, que la NASA está estudiando con una sonda lanzada en 2023, contiene hierro y níquel por un valor estimado de 10,000 cuatrillones de dólares. En lugar de lanzar todo el material desde la Tierra (lo cual es carísimo por la gravedad), las futuras civilizaciones podrían extraer metales directamente de los asteroides y construir naves en órbita.',

  'El SpaceX Starship es actualmente el cohete más grande y potente jamás construido. 🏆 Con 120 metros de altura y 33 motores Raptor, puede llevar hasta 150 toneladas a la órbita baja terrestre. Elon Musk diseñó Starship para ser completamente reutilizable, lo que reduciría drásticamente el costo de acceder al espacio. El programa Artemis de la NASA usará una versión modificada de Starship para llevar astronautas de vuelta a la Luna en los próximos años.',

  'Los sistemas de soporte vital son esenciales para cualquier nave tripulada. 💨 En la ISS, el agua se recicla al 93%: incluso el sudor y la orina de los astronautas se purifican y se convierten en agua potable. El sistema ECLSS genera oxígeno separando las moléculas de agua mediante electrólisis. Los filtros de CO₂ eliminan el dióxido de carbono que los astronautas exhalan. Para una nave del tamaño de un Destructor Estelar, necesitarías sistemas de soporte vital del tamaño de fábricas enteras.',

  'La gravedad artificial es un problema que aún no hemos resuelto completamente. 🌀 En la ISS, los astronautas flotan en microgravedad, lo que causa pérdida de masa ósea y muscular. Una solución sería construir secciones rotantes de la nave, como se ve en la película 2001: Odisea del espacio. La fuerza centrífuga empujaría a los tripulantes hacia las paredes externas, simulando gravedad. Para generar gravedad similar a la terrestre en un anillo de 100 metros de radio, necesitarías rotarlo a unas 3 revoluciones por minuto.',

  'La protección contra la radiación espacial es uno de los mayores desafíos para viajes largos. ☀️ Fuera de la magnetosfera terrestre, los astronautas están expuestos a rayos cósmicos y tormentas solares que pueden dañar el ADN y causar cáncer. La NASA investiga escudos de polietileno de alta densidad y campos magnéticos artificiales para proteger a las tripulaciones. Un Destructor Estelar necesitaría un escudo potentísimo para proteger a sus 37,000 tripulantes durante meses en el espacio profundo.',

  'Aunque todavía estamos lejos de construir naves como las de Star Wars, cada año nos acercamos más. 🌟 Con la Starship de SpaceX, la estación Gateway lunar de la NASA, y los planes para colonias en Marte, la humanidad está dando pasos reales hacia convertirnos en una civilización espacial. Tú podrías ser uno de los ingenieros, científicos o astronautas que diseñe las primeras naves interplanetarias de verdad. El espacio está esperándote, y el futuro se construye con ciencia, matemáticas y mucha imaginación. 🚀'
]}]};

sw8.quizEs = [
  { q: '¿Cuánto mide aproximadamente la Estación Espacial Internacional?', options: ['10 metros', '109 metros', '1,600 metros', '5,000 metros'], a: 1 },
  { q: '¿Qué material es cinco veces más fuerte que el acero pero mucho más ligero?', options: ['Aluminio', 'Titanio', 'Fibra de carbono', 'Aerogel'], a: 2 },
  { q: '¿Qué es una asistencia gravitatoria?', options: ['Un motor especial de gravedad', 'Usar la gravedad de un planeta para ganar velocidad', 'Un tipo de combustible espacial', 'Un freno gravitacional'], a: 1 },
  { q: '¿Qué propuso Freeman Dyson para capturar toda la energía de una estrella?', options: ['Un espejo gigante', 'Una esfera que rodee la estrella', 'Un cable espacial', 'Un agujero negro artificial'], a: 1 },
  { q: '¿Qué porcentaje de agua recicla la ISS?', options: ['50%', '75%', '93%', '100%'], a: 2 }
];

// ============================================================
// starwars_sec_9 — El traje de Darth Vader
// ============================================================
const sw9 = data.find(m => m.id === 'starwars_sec_9');
if (!sw9) { console.error('Module starwars_sec_9 not found!'); process.exit(1); }

sw9.contentEs = { sections: [{ text: [
  'El traje de Darth Vader no es solo una armadura intimidante: es una unidad de soporte vital completa que lo mantiene vivo. 🖤 Después de su terrible batalla con Obi-Wan Kenobi en Mustafar, Anakin Skywalker sufrió quemaduras en más del 60% de su cuerpo y perdió tres extremidades. Su traje incluye un respirador artificial, reguladores de temperatura, prótesis mecánicas y un sistema de administración de medicamentos. Sorprendentemente, la tecnología médica real ya puede hacer muchas de estas cosas.',

  'El respirador de Vader es quizás el componente más reconocible de su traje, con su icónico sonido de respiración. 🫁 En la vida real, los ventiladores mecánicos han salvado millones de vidas desde su invención en los años 1920. El primer pulmón de hierro, creado por Philip Drinker, ayudó a pacientes con polio a respirar cuando sus músculos respiratorios fallaban. Hoy, los ventiladores modernos son computarizados y pueden ajustar automáticamente la presión y el volumen de aire según las necesidades del paciente.',

  'Los marcapasos cardíacos son otro tipo de tecnología que Vader probablemente lleva en su traje. ❤️ Un marcapasos es un pequeño dispositivo que envía impulsos eléctricos al corazón para mantener un ritmo regular. El primer marcapasos implantable fue colocado en 1958 por el Dr. Åke Senning en Suecia. Hoy, más de 3 millones de personas en el mundo viven con marcapasos, y los modelos más modernos pueden durar hasta 15 años con una sola batería. Algunos incluso se pueden monitorear por Bluetooth.',

  'Las prótesis mecánicas han avanzado de manera increíble en las últimas décadas. 🦾 Darth Vader tiene un brazo robótico completo que funciona como si fuera real. En la vida real, las prótesis mioeléctricas usan sensores que detectan las señales eléctricas de los músculos restantes para controlar los movimientos de la mano artificial. El proyecto LUKE Arm, desarrollado por DEKA Research, permite a los usuarios agarrar objetos tan delicados como una uva o un huevo sin romperlos.',

  'Las interfaces cerebro-computadora (BCI) llevan las prótesis al siguiente nivel. 🧠 En lugar de usar señales musculares, estas interfaces leen directamente la actividad del cerebro para controlar dispositivos. El proyecto BrainGate, de la Universidad de Brown, ha permitido a personas con parálisis mover cursores de computadora y brazos robóticos solo con el pensamiento. Neuralink, la empresa de Elon Musk, está desarrollando chips cerebrales del tamaño de una moneda que podrían restaurar la visión, el movimiento y la comunicación.',

  'El tratamiento de quemaduras ha mejorado enormemente gracias a la ingeniería de tejidos. 🔬 Vader sufrió quemaduras gravísimas, y en Star Wars lo curaron con bacta, un líquido regenerativo ficticio. En la realidad, los científicos han desarrollado la bioimpresión 3D de piel, usando células del propio paciente para crear injertos de piel personalizados. El Instituto de Medicina Regenerativa de las Fuerzas Armadas de EE.UU. ha logrado imprimir capas de piel directamente sobre heridas usando impresoras portátiles.',

  'Los exoesqueletos robóticos son trajes mecánicos que amplifican la fuerza humana o ayudan a caminar a personas con parálisis. 🤖 El sistema ReWalk permite a personas con lesiones de médula espinal ponerse de pie y caminar usando motores en las caderas y rodillas. El exoesqueleto Ekso GT se usa en hospitales para rehabilitación de pacientes con ictus o lesiones cerebrales. Los militares también desarrollan exoesqueletos como el TALOS para que los soldados puedan cargar equipos pesados sin cansarse.',

  'El traje de Vader incluye un sistema de regulación de temperatura, algo que también existe en la tecnología espacial real. 🌡️ Los trajes espaciales de la NASA (EMU) tienen un sistema de tubos con agua que circula por todo el traje para absorber el calor corporal. En el espacio, la temperatura puede variar entre -157°C en la sombra y +121°C al sol. Sin este sistema de enfriamiento líquido, un astronauta podría sobrecalentarse en minutos durante una caminata espacial.',

  'La administración automática de medicamentos es otra tecnología real que Vader probablemente usa. 💊 Las bombas de insulina, por ejemplo, monitorizan los niveles de azúcar en sangre y administran insulina automáticamente a personas con diabetes. Los parches transdérmicos liberan medicamentos a través de la piel de forma controlada durante horas o días. Investigadores del MIT han desarrollado píldoras robóticas que pueden navegar por el intestino y liberar medicamentos exactamente donde se necesitan.',

  'La visión artificial es un campo que conecta directamente con el visor rojo de Vader. 👁️ Los implantes de retina, como el sistema Argus II, pueden restaurar parcialmente la visión en personas con ciertas enfermedades oculares. El dispositivo convierte las imágenes de una cámara en señales eléctricas que estimulan las células de la retina. Aunque la resolución actual es limitada (solo unas 60 pixeles), los investigadores están trabajando en la próxima generación que podría ofrecer miles de pixeles.',

  'Los biomateriales son esenciales para que el cuerpo humano acepte implantes y prótesis sin rechazarlos. 🧬 El titanio es el metal más usado en implantes porque el cuerpo no lo reconoce como un objeto extraño. Los polímeros biocompatibles se usan en articulaciones artificiales, válvulas cardíacas y lentes intraoculares. Los hidrogeles, materiales suaves que contienen hasta un 99% de agua, se están investigando para crear cartílagos artificiales y sistemas de liberación de fármacos.',

  'La cibernética es la ciencia que estudia la integración de la tecnología con el cuerpo humano. 🔧 El término fue acuñado por Norbert Wiener en 1948 y viene del griego kybernetes, que significa piloto o gobernante. Hoy, los cyborgs ya existen: hay personas con implantes cocleares que les permiten oír, marcapasos que regulan su corazón, y estimuladores de nervios que controlan el dolor crónico. Darth Vader es esencialmente un cyborg, y cada vez más personas en el mundo real también lo son.',

  'Los órganos artificiales son el siguiente gran salto en biomedicina. 🫀 Los científicos ya han creado corazones artificiales temporales que mantienen vivos a pacientes mientras esperan un trasplante. Los riñones artificiales portátiles están en desarrollo para liberar a los pacientes de la diálisis. Y los investigadores del Instituto Wyss de Harvard han creado órganos en chip: dispositivos del tamaño de una memoria USB que simulan la función de pulmones, hígados e intestinos para probar medicamentos sin usar animales.',

  'La telemedicina y los sensores vestibles (wearables) representan el futuro de la salud personalizada. ⌚ Los relojes inteligentes ya pueden medir el ritmo cardíaco, los niveles de oxígeno en sangre, la actividad física y hasta detectar caídas. El Apple Watch ha salvado vidas al alertar a usuarios sobre ritmos cardíacos peligrosos. En el futuro, sensores como los del traje de Vader podrían monitorizar constantemente tu salud y enviar datos a tu médico en tiempo real.',

  'El traje de Darth Vader, que en Star Wars representa oscuridad y miedo, en realidad es un símbolo de esperanza tecnológica. 🌟 Cada componente de su traje tiene un equivalente real que está ayudando a millones de personas hoy mismo. Desde prótesis que devuelven la movilidad hasta implantes que restauran sentidos perdidos, la biomedicina y la robótica están transformando vidas. Tú podrías ser el ingeniero o médico que invente la próxima generación de estas tecnologías. El futuro de la medicina es parte humano, parte máquina, y completamente asombroso. 🚀'
]}]};

sw9.quizEs = [
  { q: '¿Qué porcentaje de su cuerpo sufrió quemaduras Anakin Skywalker?', options: ['20%', '40%', '60%', '80%'], a: 2 },
  { q: '¿Qué son las prótesis mioeléctricas?', options: ['Prótesis controladas por la voz', 'Prótesis que usan señales de los músculos', 'Prótesis de madera', 'Prótesis que funcionan con pilas'], a: 1 },
  { q: '¿Qué proyecto permite a personas con parálisis mover objetos con el pensamiento?', options: ['Proyecto LUKE', 'Neuralink', 'BrainGate', 'ReWalk'], a: 2 },
  { q: '¿Por qué el titanio es ideal para implantes médicos?', options: ['Es muy barato', 'El cuerpo no lo rechaza', 'Es transparente', 'Se disuelve en agua'], a: 1 },
  { q: '¿Qué son los órganos en chip?', options: ['Órganos hechos de silicona', 'Dispositivos que simulan funciones de órganos', 'Chips dentro de órganos reales', 'Videojuegos de biología'], a: 1 }
];

// Write back
fs.writeFileSync(filePath, 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';', 'utf8');
console.log('✅ Patched starwars_sec_7, starwars_sec_8, starwars_sec_9 — 15 paragraphs + 5 quiz each');
