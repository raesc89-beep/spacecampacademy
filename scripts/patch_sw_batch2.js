const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'courseData.js');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw.replace(/^export const COURSE_DATA = /, '').replace(/;\s*$/, ''));

// ============================================================
// starwars_sec_4 — Conexión con la fuerza: entrelazamiento cuántico
// ============================================================
const sw4 = data.find(m => m.id === 'starwars_sec_4');
if (!sw4) { console.error('Module starwars_sec_4 not found!'); process.exit(1); }

sw4.contentEs = { sections: [{ text: [
  '¿Y si te dijera que dos partículas pueden estar conectadas instantáneamente aunque estén en lados opuestos de la galaxia? 🌌 Eso es exactamente lo que hace el entrelazamiento cuántico, y suena tan mágico como la Fuerza de Star Wars. En 1935, Albert Einstein, Boris Podolsky y Nathan Rosen publicaron un artículo que describía este fenómeno, al que Einstein llamó acción fantasmal a distancia porque no podía creer que fuera real. Pero décadas de experimentos han demostrado que sí lo es.',

  'Para entender la mecánica cuántica, necesitamos olvidar todo lo que sabemos sobre el mundo cotidiano. ⚛️ A escala subatómica, las partículas no se comportan como bolitas diminutas, sino como ondas de probabilidad. Un electrón no está en un lugar fijo hasta que lo observas: existe en una superposición de todos los lugares posibles al mismo tiempo. Es como si tuvieras un dado que estuviera mostrando todos los números a la vez y solo se decidiera por uno cuando lo miras. ¡Suena loco, pero es ciencia comprobada!',

  'El famoso experimento de la doble rendija demuestra la naturaleza dual de la materia. 🔬 Si disparas electrones uno por uno a través de dos ranuras en una pared, esperarías ver dos líneas en la pantalla detrás. Pero no: ves un patrón de interferencia, como si los electrones fueran ondas que pasan por ambas rendijas al mismo tiempo. Lo más misterioso es que si pones un detector para ver por cuál rendija pasa cada electrón, el patrón de interferencia desaparece. ¡La observación cambia el resultado!',

  'El principio de incertidumbre de Heisenberg, formulado en 1927, establece que es imposible conocer simultáneamente la posición y la velocidad exactas de una partícula. 🎲 No es una limitación de nuestros instrumentos: es una propiedad fundamental de la naturaleza. Cuanto más precisamente mides la posición de un electrón, menos puedes saber sobre su velocidad, y viceversa. Werner Heisenberg ganó el Premio Nobel de Física en 1932 por esta contribución revolucionaria.',

  'El entrelazamiento cuántico ocurre cuando dos partículas interactúan y quedan conectadas de forma que el estado de una determina instantáneamente el estado de la otra. 💫 Si mides una partícula entrelazada y resulta estar girando hacia arriba, instantáneamente sabes que su compañera está girando hacia abajo, sin importar la distancia. En 2022, Alain Aspect, John Clauser y Anton Zeilinger ganaron el Premio Nobel de Física por sus experimentos que demostraron definitivamente que el entrelazamiento es real.',

  'Las desigualdades de Bell, propuestas por el físico John Bell en 1964, fueron la clave para demostrar el entrelazamiento. 📐 Bell diseñó un test matemático que podía distinguir entre dos posibilidades: ¿las partículas entrelazadas llevan información oculta desde el principio, o realmente se comunican instantáneamente? Los experimentos de Aspect en 1982 y los de Zeilinger en los años 2000 demostraron que no hay variables ocultas: la conexión cuántica es genuina y más extraña de lo que Einstein jamás imaginó.',

  'La teletransportación cuántica suena a ciencia ficción, pero ya se ha logrado en el laboratorio. 🚀 En 2017, científicos chinos usaron el satélite Micius para teletransportar el estado cuántico de un fotón a 1,400 kilómetros de distancia. No se transporta materia ni energía, sino información cuántica pura. Es como si pudieras enviar la receta exacta de un pastel instantáneamente a otro lugar, donde se recreara perfectamente, mientras el original desaparece.',

  'Los computadores cuánticos aprovechan la superposición y el entrelazamiento para resolver problemas que las computadoras normales tardarían millones de años. 💻 En 2019, el procesador Sycamore de Google realizó un cálculo en 200 segundos que a la supercomputadora más potente del mundo le habría tomado 10,000 años. IBM tiene su procesador Eagle de 127 qubits, y están trabajando en computadoras cuánticas con miles de qubits que podrían revolucionar la medicina, la criptografía y la inteligencia artificial.',

  'La criptografía cuántica usa las leyes de la mecánica cuántica para crear comunicaciones absolutamente imposibles de espiar. 🔐 Si alguien intenta interceptar un mensaje cuántico, el acto de observarlo cambia los fotones y la intrusión se detecta inmediatamente. China ya tiene una red de comunicaciones cuánticas de 2,000 kilómetros entre Pekín y Shanghái. En el futuro, el internet cuántico podría hacer que los hackeos sean cosa del pasado.',

  'La biología cuántica es un campo emergente que estudia los procesos cuánticos en los seres vivos. 🌿 Los científicos han descubierto que la fotosíntesis, el proceso por el cual las plantas convierten la luz solar en energía, utiliza coherencia cuántica para transferir energía con una eficiencia casi del 100%. Esto significa que las plantas han estado usando mecánica cuántica durante miles de millones de años, mucho antes de que nosotros la descubriéramos.',

  'Las aves migratorias podrían usar entrelazamiento cuántico para navegar. 🐦 Investigadores de la Universidad de Oxford descubrieron que una proteína llamada criptocromo, presente en los ojos de los petirrojos europeos, podría usar pares de electrones entrelazados para detectar el campo magnético de la Tierra. Este sentido magnético cuántico les permitiría ver literalmente las líneas del campo magnético terrestre como patrones de luz y sombra.',

  'Los sensores cuánticos son dispositivos ultraprecisos que pueden medir campos magnéticos, gravedad y tiempo con una exactitud imposible para la tecnología clásica. 🎯 Los magnetómetros cuánticos pueden detectar la actividad cerebral sin tocar la cabeza del paciente. Los gravímetros cuánticos pueden encontrar túneles subterráneos y yacimientos minerales. Los relojes atómicos cuánticos son tan precisos que no perderían ni un segundo en 15 mil millones de años.',

  'El gato de Schrödinger es el experimento mental más famoso de la mecánica cuántica. 🐱 Erwin Schrödinger lo propuso en 1935 para mostrar lo absurdo que parecía la superposición a escala grande: un gato en una caja cerrada con un dispositivo cuántico estaría simultáneamente vivo y muerto hasta que abrieras la caja y lo observaras. Aunque ningún gato real ha estado en superposición, este experimento mental ha inspirado películas, libros y memes durante casi un siglo.',

  'Los materiales cuánticos como los superconductores y los superfluidos muestran propiedades cuánticas visibles a simple vista. ❄️ Un superconductor puede levitar sobre un imán porque expulsa completamente el campo magnético de su interior, un efecto llamado Meissner. Los superfluidos, como el helio-4 a temperaturas cercanas al cero absoluto, pueden trepar por las paredes de un recipiente y fluir sin fricción. Estos materiales podrían revolucionar el transporte y la energía.',

  'La Fuerza de Star Wars y el entrelazamiento cuántico comparten algo fundamental: la idea de que todo en el universo está conectado. 🌟 Aunque la Fuerza es ficción, la mecánica cuántica nos ha mostrado que la realidad es mucho más extraña y maravillosa de lo que imaginamos. Cada átomo de tu cuerpo fue forjado en el interior de una estrella, y las partículas que te forman podrían estar entrelazadas con partículas en el otro lado del cosmos. La ciencia real es más asombrosa que cualquier película. ✨'
]}]};

sw4.quizEs = [
  { q: '¿Cómo llamó Einstein al entrelazamiento cuántico?', options: ['Magia subatómica', 'Acción fantasmal a distancia', 'Conexión invisible', 'Fuerza cuántica'], a: 1 },
  { q: '¿Qué demuestra el experimento de la doble rendija?', options: ['Que la luz solo es partícula', 'Que los electrones son ondas y partículas a la vez', 'Que la gravedad afecta la luz', 'Que los átomos son indivisibles'], a: 1 },
  { q: '¿Quiénes ganaron el Nobel 2022 por demostrar el entrelazamiento cuántico?', options: ['Einstein, Podolsky y Rosen', 'Aspect, Clauser y Zeilinger', 'Heisenberg y Schrödinger', 'Bohr y Planck'], a: 1 },
  { q: '¿Qué hizo el procesador Sycamore de Google en 2019?', options: ['Creó una inteligencia artificial', 'Resolvió un cálculo en 200 segundos que tardaría 10,000 años', 'Descubrió un nuevo elemento', 'Simuló un agujero negro'], a: 1 },
  { q: '¿Qué proceso biológico en las plantas usa mecánica cuántica?', options: ['La respiración', 'La fotosíntesis', 'La polinización', 'La germinación'], a: 1 }
];

// ============================================================
// starwars_sec_5 — Xenobiología y la fauna de Star Wars
// ============================================================
const sw5 = data.find(m => m.id === 'starwars_sec_5');
if (!sw5) { console.error('Module starwars_sec_5 not found!'); process.exit(1); }

sw5.contentEs = { sections: [{ text: [
  '¿Podría existir vida extraterrestre tan diversa como las criaturas de Star Wars? 🦎 La xenobiología, también llamada exobiología, es la ciencia que estudia las posibilidades de vida fuera de la Tierra. Aunque aún no hemos encontrado extraterrestres, los científicos han descubierto formas de vida en nuestro propio planeta que son tan extremas y extrañas que parecen sacadas de otra galaxia. Estas criaturas nos dan pistas sobre qué tipo de vida podría existir en mundos alienígenas.',

  'Los tardígrados son los animales más resistentes del planeta Tierra, y sobrevivirían perfectamente en muchos mundos de Star Wars. 🐻 Estos microscópicos ositos de agua miden menos de 1 milímetro, pero pueden sobrevivir en el vacío del espacio, soportar radiación 1,000 veces mayor que la dosis letal para humanos, resistir temperaturas desde -272°C hasta 150°C, y sobrevivir sin agua durante décadas. En 2007, la Agencia Espacial Europea los envió al espacio y sobrevivieron sin protección.',

  'Las bacterias extremófilas viven en lugares que matarían a cualquier otro ser vivo. 🦠 Deinococcus radiodurans puede sobrevivir dosis de radiación 3,000 veces mayores que las letales para humanos, reparando su ADN destrozado en solo unas horas. Las bacterias termófilas del Parque Yellowstone prosperan en aguas a 90°C. Y en las profundidades de la mina de Mponeng en Sudáfrica, se han encontrado bacterias que viven a 3 kilómetros bajo tierra, alimentándose de minerales radioactivos.',

  'El Dragón Krayt de Tatooine tiene un paralelo fascinante en la paleobiología real. 🐉 Los desiertos de la Tierra albergaron megafauna impresionante: el Spinosaurus, que medía hasta 18 metros, cazaba en los ríos del Sahara hace 95 millones de años. El Sarcosuchus, un cocodrilo prehistórico de 12 metros, compartía esos ecosistemas desérticos. La evolución ha demostrado que la vida puede producir gigantes incluso en ambientes hostiles, si hay suficiente alimento y agua disponible.',

  'El Wampa de Hoth se parece mucho al oso polar, el mayor depredador terrestre del Ártico. 🐻‍❄️ Los osos polares pueden pesar hasta 700 kg y sobrevivir temperaturas de -50°C gracias a una capa de grasa de 11 centímetros y un pelaje que parece blanco pero en realidad es transparente, con fibras huecas que atrapan calor como un invernadero. Además, su piel debajo del pelo es negra para absorber la radiación solar. Si existiera Hoth, la evolución probablemente produciría depredadores similares.',

  'El Sarlacc, esa criatura que vive en un pozo del desierto de Tatooine, tiene equivalentes sorprendentes en la naturaleza. 🪴 Las plantas carnívoras como la Nepenthes rajah de Borneo tienen jarras de hasta 35 centímetros llenas de líquido digestivo que pueden atrapar ratas y lagartos. El gusano bobbit, un poliqueto marino de hasta 3 metros de largo, se entierra en el fondo del mar y atrapa peces con mandíbulas tan afiladas que pueden partirlos en dos. La naturaleza es más aterradora que la ficción.',

  'La ecuación de Drake, formulada por el astrónomo Frank Drake en 1961, intenta calcular cuántas civilizaciones inteligentes podrían existir en nuestra galaxia. 📊 Considera factores como la tasa de formación de estrellas, la fracción con planetas, cuántos podrían albergar vida, y cuántas civilizaciones desarrollarían comunicación por radio. Las estimaciones van desde cero (estamos solos) hasta millones de civilizaciones. La respuesta depende de variables que aún no conocemos con certeza.',

  'El programa SETI (Búsqueda de Inteligencia Extraterrestre) lleva más de 60 años escuchando señales del cosmos. 📡 Usando radiotelescopios gigantes como el Allen Telescope Array en California, los científicos buscan señales artificiales entre el ruido cósmico natural. En 1977, el astrónomo Jerry Ehman detectó una señal tan prometedora que escribió ¡Wow! en la impresión: la famosa Señal Wow. Aunque nunca se repitió y sigue sin explicación, inspiró décadas de búsqueda.',

  'Las biofirmas son señales químicas que podrían revelar vida en otros planetas sin necesidad de visitarlos. 🌍 El telescopio James Webb puede analizar la luz que pasa a través de la atmósfera de un exoplaneta y detectar moléculas como oxígeno, metano y ozono. Si encontramos oxígeno y metano juntos en una atmósfera, sería una señal muy fuerte de vida, porque estos gases reaccionan entre sí y solo pueden coexistir si algo los está produciendo constantemente.',

  'Titán, la luna más grande de Saturno, es uno de los lugares más intrigantes del sistema solar. 🪐 Tiene una atmósfera espesa de nitrógeno, lagos y ríos de metano líquido, y una química orgánica compleja en su superficie. Los científicos especulan que podría albergar una forma de vida completamente diferente a la terrestre, basada en metano en lugar de agua. La misión Dragonfly de la NASA, que llegará a Titán en 2034, enviará un dron para explorar su superficie y buscar señales de vida.',

  'Europa, la luna helada de Júpiter, tiene un océano de agua líquida bajo su corteza de hielo. 🧊 Se estima que Europa contiene el doble de agua que todos los océanos de la Tierra juntos. En el fondo de ese océano, podría haber fuentes hidrotermales similares a las que existen en las profundidades de nuestros mares, donde prospera vida sin luz solar. La misión Europa Clipper de la NASA, lanzada en 2024, realizará más de 40 sobrevuelos para estudiar su potencial para albergar vida.',

  'La panspermia es la hipótesis de que la vida podría viajar entre planetas a bordo de meteoritos. 🌠 Sabemos que meteoritos marcianos han llegado a la Tierra (como ALH84001, encontrado en la Antártida). Los tardígrados y ciertas bacterias podrían sobrevivir el viaje si estuvieran protegidos dentro de la roca. Si esta hipótesis es correcta, toda la vida en la Tierra podría haber comenzado en Marte, o la vida marciana podría haberse originado aquí. ¡Quizás todos somos marcianos!',

  'La sopa primordial es una de las teorías más aceptadas sobre el origen de la vida en la Tierra. 🧪 En 1953, Stanley Miller y Harold Urey demostraron que los aminoácidos, los bloques básicos de las proteínas, podían formarse espontáneamente a partir de gases simples y descargas eléctricas, simulando la atmósfera primitiva de la Tierra. Las fuentes hidrotermales en el fondo del océano también son candidatas como cunas de la vida, proporcionando energía química y minerales catalíticos.',

  'La vida basada en silicio es una posibilidad fascinante que los científicos consideran seriamente. 💎 En la Tierra, toda la vida está basada en carbono, pero el silicio comparte muchas propiedades químicas con el carbono y es abundante en el universo. En 2016, investigadores de Caltech lograron que una enzima creara enlaces carbono-silicio, demostrando que la bioquímica del silicio es posible. Las criaturas de silicio podrían prosperar en mundos volcánicos con temperaturas que matarían a cualquier ser basado en carbono.',

  'La biodiversidad de Star Wars nos recuerda algo profundo: la vida encuentra un camino. 🌟 Desde los tardígrados que sobreviven en el espacio hasta las bacterias que comen radiación, nuestro propio planeta demuestra que la vida es increíblemente creativa y persistente. Con miles de millones de estrellas en nuestra galaxia y trillones de planetas en el universo, la pregunta no es si hay vida ahí afuera, sino cuándo la encontraremos. Y tú podrías ser parte del equipo que haga el descubrimiento más grande de la historia. 🚀'
]}]};

sw5.quizEs = [
  { q: '¿Qué animal microscópico puede sobrevivir en el vacío del espacio?', options: ['Hormiga', 'Tardígrado', 'Ameba', 'Pulga de agua'], a: 1 },
  { q: '¿Qué intenta calcular la ecuación de Drake?', options: ['La distancia a otras galaxias', 'El número de civilizaciones inteligentes en nuestra galaxia', 'La edad del universo', 'La velocidad de la luz'], a: 1 },
  { q: '¿Qué luna de Saturno tiene lagos de metano líquido?', options: ['Europa', 'Encélado', 'Titán', 'Ganímedes'], a: 2 },
  { q: '¿Qué son las biofirmas?', options: ['Firmas de biólogos famosos', 'Señales químicas que podrían revelar vida', 'Fósiles microscópicos', 'Tipos de ADN alienígena'], a: 1 },
  { q: '¿Qué hipótesis propone que la vida viaja entre planetas en meteoritos?', options: ['Generación espontánea', 'Sopa primordial', 'Panspermia', 'Biogénesis'], a: 2 }
];

// ============================================================
// starwars_sec_6 — Física de Plasmas: Sables laser y Blasters
// ============================================================
const sw6 = data.find(m => m.id === 'starwars_sec_6');
if (!sw6) { console.error('Module starwars_sec_6 not found!'); process.exit(1); }

sw6.contentEs = { sections: [{ text: [
  '¿Sabías que los sables de luz de Star Wars no podrían funcionar con láser? 💡 Un rayo láser es invisible en el vacío y no se detiene a cierta distancia: sigue viajando hasta que algo lo bloquea. Además, dos rayos láser se atravesarían sin chocar, así que los duelos de sables serían imposibles. La ciencia real detrás de un sable de luz tendría que usar plasma, el cuarto estado de la materia, confinado en un campo magnético con forma de espada. ¡La física de plasmas es más emocionante que la ficción!',

  'El plasma es materia tan caliente que los electrones se separan de sus átomos, creando una sopa de partículas cargadas. ⚡ Es el estado más abundante de materia visible en el universo: las estrellas, las nebulosas, los rayos y la corona solar son todos plasma. Aquí en la Tierra, puedes ver plasma en los relámpagos, en los letreros de neón y en las bolas de plasma decorativas que venden en tiendas de ciencia. Cuando enciendes un letrero de neón, estás creando un tubo de plasma con tus propias manos.',

  'Para construir un sable de luz real, necesitarías confinar plasma a más de 10,000°C dentro de un campo magnético con forma cilíndrica. 🔥 Los científicos ya saben hacer esto en reactores de fusión nuclear. El problema es que los imanes necesarios para contener plasma tan caliente son enormes y consumen toneladas de energía. Un investigador del Laboratorio de Física de Plasmas de Princeton calculó que la batería necesaria para un sable de luz real pesaría varias toneladas. No muy práctico para un duelo Jedi.',

  'ITER, el reactor de fusión nuclear más grande del mundo, se está construyendo en Francia con la colaboración de 35 países. 🏗️ Su objetivo es demostrar que la fusión nuclear (el mismo proceso que alimenta al Sol) puede producir energía limpia e ilimitada. ITER calentará plasma de hidrógeno a 150 millones de grados Celsius, diez veces más caliente que el centro del Sol, y lo confinará con imanes superconductores del tamaño de edificios. Si funciona, podría revolucionar la energía mundial para siempre.',

  'Los tokamaks son las máquinas que confinan el plasma en forma de rosquilla usando campos magnéticos. 🍩 El diseño fue inventado por los físicos soviéticos Igor Tamm y Andrei Sakharov en los años 1950. Funciona combinando dos campos magnéticos: uno que va alrededor del tubo y otro que lo recorre a lo largo, creando un campo helicoidal que mantiene al plasma flotando sin tocar las paredes. Si el plasma tocara las paredes, se enfriaría instantáneamente y la reacción de fusión se detendría.',

  'Los láseres reales son muy diferentes de los blasters de Star Wars, pero igual de fascinantes. 🔴 LASER significa Amplificación de Luz por Emisión Estimulada de Radiación. Theodore Maiman construyó el primer láser funcional en 1960 usando un cristal de rubí. Los láseres emiten luz coherente: todas las ondas van perfectamente sincronizadas en la misma dirección, a diferencia de una bombilla que emite luz en todas direcciones. Esta propiedad los hace útiles en cirugía, comunicaciones, lectores de código de barras y mucho más.',

  'Los láseres médicos pueden cortar tejido con una precisión de fracciones de milímetro. 👁️ La cirugía LASIK usa un láser ultravioleta para remodelar la córnea del ojo y corregir la miopía en solo minutos. Los láseres de CO₂ se usan para vaporizar tumores. Los láseres de femtosegundo, que emiten pulsos de solo 0.000000000000001 segundos, pueden cortar dentro del ojo sin dañar las capas externas. Cada año, más de 600,000 personas en EE.UU. se operan la vista con láser.',

  'Las armas de energía dirigida son el equivalente real de los blasters de Star Wars. 🎯 El sistema HELIOS de la Marina de EE.UU. usa un láser de alta energía para derribar drones y desactivar embarcaciones. El Iron Beam de Israel usa láseres para interceptar cohetes en vuelo. Estas armas viajan a la velocidad de la luz (300,000 km/s), así que son imposibles de esquivar. A diferencia de los blasters de Star Wars, cuyos disparos viajan tan lento que un Jedi puede desviarlos con un sable de luz.',

  'El espectro electromagnético es la gama completa de radiación que existe en el universo. 🌈 Va desde las ondas de radio (kilómetros de longitud de onda) hasta los rayos gamma (más pequeños que un átomo). La luz visible, que nuestros ojos pueden detectar, es solo una pequeñísima franja de este espectro. Los láseres pueden emitir en cualquier parte del espectro: los láseres infrarrojos se usan en controles remotos, los verdes en apuntadores, los ultravioleta en impresoras 3D y los de rayos X en microscopios.',

  'La corona solar es un ejemplo espectacular de plasma natural. ☀️ La capa externa del Sol alcanza temperaturas de 1 a 3 millones de grados Celsius, mucho más caliente que la superficie solar de 5,500°C. Este misterio, llamado el problema del calentamiento coronal, ha desconcertado a los físicos durante décadas. La sonda Parker Solar Probe de la NASA, lanzada en 2018, se ha acercado a solo 6 millones de kilómetros del Sol para estudiar la corona y ha descubierto estructuras magnéticas llamadas switchbacks.',

  'Los rayos son descargas de plasma natural que pueden alcanzar 30,000°C, cinco veces la temperatura de la superficie del Sol. ⚡ Un rayo típico dura solo 0.2 segundos pero libera hasta mil millones de julios de energía. Los rayos producen ondas de choque que escuchamos como truenos y generan brevemente rayos X y rayos gamma. El programa BOLT de la Universidad de Florida usa cohetes con cables conductores para provocar rayos controlados y estudiar su física.',

  'Las pantallas de plasma, aunque están siendo reemplazadas por LED y OLED, fueron una aplicación brillante de la física de plasmas. 📺 Cada píxel contenía una celda diminuta llena de gas noble (neón o xenón). Al aplicar electricidad, el gas se ionizaba creando plasma que emitía luz ultravioleta, la cual excitaba fósforos de colores rojo, verde y azul. Las pantallas de plasma ofrecían negros más profundos y mejores ángulos de visión que las LCD de su época.',

  'Los propulsores iónicos usan plasma para impulsar naves espaciales con una eficiencia extraordinaria. 🚀 El motor Hall acelera iones de xenón con campos eléctricos, creando un chorro de plasma que empuja la nave suavemente pero de forma continua. La sonda Dawn de la NASA usó propulsión iónica para visitar el asteroide Vesta y el planeta enano Ceres en una sola misión. Los propulsores iónicos son 10 veces más eficientes que los cohetes químicos, aunque producen mucho menos empuje.',

  'El confinamiento inercial es otro enfoque para la fusión nuclear que usa láseres en lugar de magnetos. 💥 En el National Ignition Facility (NIF) de California, 192 láseres ultrapoderosos convergen simultáneamente sobre una cápsula de hidrógeno del tamaño de un chícharo. En diciembre de 2022, el NIF logró un hito histórico: por primera vez, la energía producida por la fusión superó la energía de los láseres que la provocaron. Este logro fue descrito como el momento Wright Brothers de la energía de fusión.',

  'La física de plasmas conecta los sables de luz de la ficción con tecnologías reales que están cambiando el mundo. 🌟 Desde reactores de fusión que prometen energía limpia e infinita, hasta láseres médicos que devuelven la vista y propulsores que llevan naves a los confines del sistema solar, el plasma es la clave de muchas de las tecnologías más avanzadas de la humanidad. Entender la física de plasmas podría ser tu pasaporte para diseñar el futuro. ¡Y quién sabe, tal vez algún día construyas un sable de luz de verdad! ⚔️'
]}]};

sw6.quizEs = [
  { q: '¿Qué es el plasma?', options: ['Un tipo de sangre', 'Materia tan caliente que los electrones se separan de los átomos', 'Un líquido espacial', 'Gas congelado'], a: 1 },
  { q: '¿Qué forma tiene un tokamak para confinar el plasma?', options: ['Esfera', 'Cubo', 'Rosquilla (toroide)', 'Cilindro'], a: 2 },
  { q: '¿Qué significa la palabra LASER?', options: ['Luz Amplificada por Sonido Estelar de Radio', 'Amplificación de Luz por Emisión Estimulada de Radiación', 'Lanzamiento Automático de Señales Electromagnéticas Rápidas', 'Luz Artificial Super Energética Refractada'], a: 1 },
  { q: '¿Qué logró el NIF de California en diciembre de 2022?', options: ['Crear un sable de luz', 'Producir más energía de fusión que la energía láser usada', 'Enviar plasma al espacio', 'Construir el láser más grande del mundo'], a: 1 },
  { q: '¿Qué temperatura puede alcanzar un rayo?', options: ['5,000°C', '10,000°C', '30,000°C', '100,000°C'], a: 2 }
];

// Write back
fs.writeFileSync(filePath, 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';', 'utf8');
console.log('✅ Patched starwars_sec_4, starwars_sec_5, starwars_sec_6 — 15 paragraphs + 5 quiz each');
