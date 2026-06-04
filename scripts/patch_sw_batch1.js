/**
 * patch_sw_batch1.js
 * Patches 3 Star Wars modules: starwars_sec_1, starwars_sec_2, starwars_sec_3
 * Each module gets 15 paragraphs (Spanish) + 5 quiz questions.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'courseData.js');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw.replace(/^export const COURSE_DATA = /, '').replace(/;\s*$/, ''));

// ─────────────────────────────────────────────
// MODULE 1: starwars_sec_1
// "Los Parsecs y el Corredor de Kessel"
// ─────────────────────────────────────────────
const mod1 = data.find(m => m.id === 'starwars_sec_1');
if (!mod1) throw new Error('Module starwars_sec_1 not found');

mod1.contentEs.sections[0].text = [
  'En Star Wars, Han Solo presume de haber completado el Corredor de Kessel en menos de doce parsecs. Pero espera… ¿no es el parsec una unidad de distancia y no de tiempo? 🤔 ¡Exacto! Un parsec equivale a aproximadamente 3,26 años luz, es decir, unos 30,9 billones de kilómetros. Es una distancia tan inmensa que la luz tarda más de tres años en recorrerla. Los astrónomos usan parsecs todos los días para medir lo lejos que están las estrellas y las galaxias. Así que cuando Han Solo habla de parsecs, en realidad está hablando de cuán corta fue la ruta que tomó, ¡no de cuán rápido voló!',

  'La palabra "parsec" viene de combinar "paralaje" y "segundo de arco". El paralaje es un truco visual que puedes probar ahora mismo: extiende tu pulgar, cierra un ojo y luego el otro, y verás cómo tu dedo parece saltar de posición 👆. Eso mismo hacen los astrónomos, pero en lugar de ojos usan la posición de la Tierra en dos puntos opuestos de su órbita alrededor del Sol. Si una estrella parece moverse un segundo de arco (1/3600 de grado), está exactamente a un parsec de distancia. Friedrich Bessel fue el primero en medir el paralaje de una estrella, 61 Cygni, en 1838. Desde entonces, el paralaje ha sido la base de toda la escalera de distancias cósmicas.',

  'La misión Gaia de la Agencia Espacial Europea (ESA) es la campeona moderna de la medición por paralaje 🛰️. Lanzada en 2013, Gaia ha medido la posición y distancia de casi dos mil millones de estrellas en nuestra galaxia con una precisión increíble. Imagina poder medir el ancho de una moneda en la Luna desde la Tierra: ¡así de precisa es Gaia! Sus datos han creado el mapa tridimensional más detallado de la Vía Láctea que jamás ha existido. Gracias a Gaia sabemos que nuestra galaxia tiene brazos espirales retorcidos y un pasado lleno de colisiones con galaxias más pequeñas. Cada nueva publicación de datos de Gaia genera miles de artículos científicos nuevos.',

  'Más allá de los parsecs cercanos, los astrónomos necesitan trucos extra para medir distancias enormes 🔭. Usan "candelas estándar", objetos cuyo brillo real conocen: si parecen tenues, están lejos; si parecen brillantes, están cerca. Las estrellas variables cefeidas, descubiertas por Henrietta Swan Leavitt en 1912, fueron las primeras candelas estándar confiables. Leavitt notó que las cefeidas más brillantes parpadeaban más lentamente, lo que permitió calcular su brillo verdadero. Luego, las supernovas de tipo Ia se convirtieron en candelas aún más potentes para medir distancias de miles de millones de años luz. Toda esta escalera de distancias funciona paso a paso, cada peldaño apoyándose en el anterior.',

  'El Telescopio Espacial James Webb (JWST), lanzado en diciembre de 2021, está revolucionando nuestra comprensión de las distancias cósmicas 🌌. Webb puede observar galaxias que emitieron su luz cuando el universo tenía apenas unos cientos de millones de años. Para calcular la distancia a esas galaxias, los científicos miden el "corrimiento al rojo": la luz se estira hacia colores más rojos porque el universo se expande. Webb ha encontrado galaxias a más de 13.000 millones de años luz, formadas cuando el cosmos era muy joven. Estos descubrimientos nos ayudan a entender cómo nacieron las primeras estrellas y galaxias. Cada imagen de Webb es como una máquina del tiempo que nos muestra el pasado del universo.',

  'Ahora hablemos de velocidad: en Star Wars, las naves viajan por el hiperespacio saltando a velocidades superiores a la de la luz ✨. En la vida real, la teoría de la relatividad especial de Albert Einstein, publicada en 1905, establece que nada con masa puede alcanzar la velocidad de la luz. La luz viaja a unos 300.000 kilómetros por segundo en el vacío, y acercarse a esa velocidad requeriría una energía infinita. Pero eso no ha impedido que los físicos sueñen con atajos: la idea del motor de curvatura (warp drive) propuesta por el físico Miguel Alcubierre en 1994 sugiere comprimir el espacio delante de la nave y expandirlo detrás. Aunque teóricamente posible en las ecuaciones de Einstein, necesitaría cantidades de energía negativa que aún no sabemos cómo producir. Sin embargo, investigadores de la NASA y universidades siguen explorando variantes de esta idea.',

  'La métrica de Alcubierre funciona de una manera fascinante: la nave no se mueve a través del espacio, sino que el espacio mismo se mueve alrededor de ella 🚀. Es como estar parado en una cinta transportadora cósmica: tú no caminas, pero avanzas. Esto no viola la relatividad porque es el propio tejido del espacio-tiempo el que se deforma. De hecho, el universo ya hace algo parecido: las galaxias lejanas se alejan de nosotros más rápido que la luz porque es el espacio entre ellas el que se expande. En 2021, el físico Erik Lentz propuso una versión que podría funcionar sin energía negativa, usando "solitones" de espacio-tiempo. Aunque estamos muy lejos de construir algo así, estas ideas muestran que la ciencia real a veces es tan emocionante como la ciencia ficción.',

  'En Star Wars, los pilotos usan computadoras de navegación para calcular rutas seguras por el hiperespacio, evitando estrellas y agujeros negros 🗺️. En la vida real, la navegación estelar es igualmente impresionante. Las sondas Voyager 1 y 2, lanzadas en 1977, usan un sistema de navegación que compara la posición de estrellas brillantes para saber dónde están. La NASA emplea la Red de Espacio Profundo (DSN), un conjunto de antenas gigantes en California, España y Australia, para rastrear sus naves con precisión de centímetros. Incluso hay investigaciones sobre el uso de púlsares, estrellas de neutrones que giran rapidísimo, como un GPS cósmico natural. Cada púlsar emite pulsos de radio a intervalos tan regulares que funcionan como relojes ultraprecisos.',

  'El Corredor de Kessel en Star Wars es una ruta peligrosa cerca de un cúmulo de agujeros negros llamado "el Sumidero" 🕳️. Los agujeros negros reales son objetos con una gravedad tan intensa que ni la luz puede escapar. Se forman cuando estrellas muy masivas, de al menos 20 veces la masa del Sol, colapsan al final de su vida. En 2019, el proyecto Event Horizon Telescope (EHT) logró la primera imagen real de un agujero negro, el que está en el centro de la galaxia M87. La imagen mostraba un anillo brillante de gas supercaliente rodeando una sombra oscura: ¡el horizonte de eventos! En 2022, el EHT también fotografió a Sagitario A*, el agujero negro en el centro de nuestra propia Vía Láctea.',

  'Cerca de un agujero negro, el tiempo mismo se comporta de manera extraña, tal como vemos en las películas 🎬. Según la relatividad general de Einstein, cuanto más fuerte es la gravedad, más lento pasa el tiempo. Si pudieras orbitar cerca de un agujero negro y regresar a la Tierra, habrían pasado años o incluso siglos aquí mientras para ti solo fueron horas. Este efecto, llamado dilatación temporal gravitatoria, no es ciencia ficción: los relojes de los satélites GPS orbitan la Tierra más lejos de su gravedad y adelantan unos 38 microsegundos por día comparados con relojes en la superficie. Sin esa corrección, tu GPS se equivocaría en unos 10 kilómetros diarios. Así que la relatividad de Einstein no solo es teórica, ¡afecta tu vida cotidiana!',

  'Las distancias dentro de nuestro propio sistema solar ya son enormes para la escala humana 🪐. La luz del Sol tarda unos 8 minutos en llegar a la Tierra, pero más de 4 horas en alcanzar Neptuno. Cuando la NASA envía comandos al rover Perseverance en Marte, la señal tarda entre 4 y 24 minutos en llegar, dependiendo de la posición de los planetas. Por eso los rovers marcianos necesitan cierto grado de autonomía para tomar decisiones por sí mismos. La Voyager 1, el objeto humano más lejano, está a más de 24.000 millones de kilómetros de la Tierra y sus señales tardan casi un día entero en llegar. A la velocidad actual de la Voyager 1, tardaría unos 73.000 años en llegar a la estrella más cercana, Próxima Centauri.',

  'Para medir distancias aún mayores, los astrónomos usan el concepto de "universo observable" 🌍. Desde el Big Bang, hace unos 13.800 millones de años, la luz ha tenido un tiempo limitado para viajar. Pero como el universo se expande, los objetos más lejanos que podemos ver están ahora a unos 46.500 millones de años luz de nosotros. ¿Cómo es posible si el universo solo tiene 13.800 millones de años? Porque el espacio entre nosotros y esos objetos se ha expandido enormemente mientras la luz viajaba hacia nosotros. Más allá de ese horizonte, podría haber mucho más universo que simplemente no podemos ver todavía. Es como estar en medio del océano y ver hasta el horizonte, ¡pero saber que hay mucho más océano más allá!',

  'La escalera de distancias cósmicas ha permitido uno de los descubrimientos más sorprendentes: la expansión acelerada del universo 🎆. En 1998, dos equipos de científicos estudiaron supernovas lejanas y descubrieron que el universo no solo se expande, sino que lo hace cada vez más rápido. Este descubrimiento, galardonado con el Premio Nobel de Física en 2011, reveló la existencia de la "energía oscura", una fuerza misteriosa que compone el 68% del universo. Nadie sabe exactamente qué es la energía oscura, lo que la convierte en uno de los mayores misterios de la física moderna. Misiones futuras como Euclid de la ESA, lanzada en 2023, intentarán desentrañar este enigma. ¡Imagina ser tú quien resuelva este misterio algún día!',

  'La navegación interestelar plantea desafíos que hacen que el Corredor de Kessel parezca sencillo 🌠. El proyecto Breakthrough Starshot, financiado por el empresario Yuri Milner, propone enviar pequeñas sondas del tamaño de un sello postal a Próxima Centauri usando enormes láseres que las impulsarían al 20% de la velocidad de la luz. A esa velocidad, tardarían unos 20 años en llegar. Pero incluso al 20% de la velocidad de la luz, chocar con un grano de polvo sería catastrófico, así que las sondas necesitarían algún tipo de escudo protector. Además, comunicar los resultados de vuelta a la Tierra tomaría otros 4 años a la velocidad de la luz. Este proyecto muestra que el viaje interestelar, aunque difícil, podría ser posible en tu vida.',

  'La ciencia de medir distancias cósmicas es uno de los pilares más importantes de la astronomía y cada generación la mejora 📏. Desde el paralaje de Bessel hasta los datos de Gaia, desde las cefeidas de Leavitt hasta el Webb, cada avance tecnológico nos permite ver más lejos y con más claridad. Lo que Han Solo llama parsecs es, en realidad, la unidad favorita de astrónomos de todo el mundo para mapear el cosmos. La próxima vez que veas Star Wars y escuches sobre el Corredor de Kessel, recuerda que detrás de esa escena hay siglos de ciencia fascinante. Tú puedes ser parte de esta historia: observa el cielo, hazte preguntas y nunca dejes de explorar. ¡El universo está esperando a que lo descubras! 🚀'
];

mod1.quizEs = [
  {
    q: '¿Qué es un parsec en astronomía?',
    options: [
      'Una unidad de tiempo que mide la duración de un viaje espacial',
      'Una unidad de distancia equivalente a aproximadamente 3,26 años luz',
      'Una unidad de velocidad usada por las naves espaciales',
      'Una unidad de energía necesaria para el hiperespacio'
    ],
    a: 1
  },
  {
    q: '¿Qué fenómeno usan los astrónomos para medir la distancia a estrellas cercanas?',
    options: [
      'El efecto Doppler',
      'La luminosidad de las supernovas',
      'El paralaje estelar',
      'El corrimiento al rojo'
    ],
    a: 2
  },
  {
    q: '¿Qué misión de la ESA ha medido la posición de casi dos mil millones de estrellas?',
    options: [
      'Hubble',
      'James Webb',
      'Gaia',
      'Voyager 1'
    ],
    a: 2
  },
  {
    q: '¿Qué propuso el físico Miguel Alcubierre en 1994?',
    options: [
      'Una nueva teoría sobre agujeros negros',
      'Un motor de curvatura que deformaría el espacio-tiempo alrededor de una nave',
      'Un telescopio para fotografiar exoplanetas',
      'Un método para comunicarse más rápido que la luz con señales de radio'
    ],
    a: 1
  },
  {
    q: '¿Qué logró el proyecto Event Horizon Telescope (EHT) en 2019?',
    options: [
      'Enviar una sonda al agujero negro más cercano',
      'Descubrir que los agujeros negros no existen',
      'Obtener la primera imagen real de un agujero negro',
      'Medir la velocidad exacta de la luz cerca de un agujero negro'
    ],
    a: 2
  }
];

// ─────────────────────────────────────────────
// MODULE 2: starwars_sec_2
// "Mundos Extremos y Raros: Tatooine, Hoth y Degobah"
// ─────────────────────────────────────────────
const mod2 = data.find(m => m.id === 'starwars_sec_2');
if (!mod2) throw new Error('Module starwars_sec_2 not found');

mod2.contentEs.sections[0].text = [
  'Tatooine, el planeta desértico con dos soles donde creció Luke Skywalker, parecía pura fantasía cuando se estrenó Star Wars en 1977 🌅. Pero en 2011, el telescopio espacial Kepler descubrió Kepler-16b, un planeta real que orbita dos estrellas al mismo tiempo. Los científicos lo apodaron inmediatamente "Tatooine" porque, al igual que en la película, alguien parado en su superficie vería dos soles en el cielo. Kepler-16b es un gigante gaseoso del tamaño de Saturno y no tiene superficie sólida donde pararte, pero su descubrimiento demostró que los planetas circumbinarios existen de verdad. Desde entonces, Kepler y otros telescopios han encontrado más de una docena de planetas circumbinarios confirmados. La realidad superó a la ficción una vez más.',

  'Para encontrar exoplanetas como Kepler-16b, los astrónomos usan principalmente el método de tránsito 🔍. Cuando un planeta pasa frente a su estrella desde nuestra perspectiva, bloquea una pequeña fracción de la luz estelar, causando una diminuta bajada en el brillo. El telescopio Kepler, lanzado en 2009, observó más de 150.000 estrellas simultáneamente buscando estos mini-eclipses. Fue tan exitoso que descubrió más de 2.600 exoplanetas confirmados antes de que se agotara su combustible en 2018. Los tránsitos también permiten estudiar la atmósfera del planeta: cuando la luz de la estrella pasa a través de la atmósfera del exoplaneta, ciertos colores se absorben, revelando la composición química. ¡Es como analizar el aire de un mundo a cientos de años luz de distancia!',

  'Otro método fundamental para detectar exoplanetas es la velocidad radial, también llamado método Doppler 🎵. Cuando un planeta orbita una estrella, su gravedad tira de ella ligeramente, haciendo que la estrella se "tambalee". Este movimiento cambia la frecuencia de la luz de la estrella: se vuelve un poco más azul cuando se acerca a nosotros y un poco más roja cuando se aleja. Los astrónomos Michel Mayor y Didier Queloz usaron este método en 1995 para descubrir 51 Pegasi b, el primer exoplaneta alrededor de una estrella similar al Sol. Este hallazgo les valió el Premio Nobel de Física en 2019. Hoy, instrumentos como ESPRESSO en Chile pueden detectar tambaleos estelares causados por planetas del tamaño de la Tierra.',

  'La misión TESS (Transiting Exoplanet Survey Satellite) de la NASA tomó la batuta de Kepler en 2018 🛰️. Mientras Kepler observó un pedacito del cielo con gran profundidad, TESS observa casi todo el cielo buscando planetas alrededor de las estrellas más cercanas y brillantes. Esto es importante porque las estrellas cercanas son más fáciles de estudiar con detalle usando otros telescopios como el James Webb. TESS ha descubierto miles de candidatos a planetas y cientos de exoplanetas confirmados, incluyendo varios en la zona habitable de sus estrellas. La zona habitable es la franja de distancias donde un planeta podría tener agua líquida en su superficie. Encontrar planetas en esta zona es el primer paso para buscar vida fuera de la Tierra.',

  'Hablemos de Hoth, el planeta helado de Star Wars donde los rebeldes tenían su base secreta 🧊. En nuestro sistema solar, Europa, una luna de Júpiter, se parece muchísimo a Hoth. Europa tiene una superficie completamente cubierta de hielo, con temperaturas que bajan a -160°C. Pero lo más emocionante está debajo: los científicos creen que bajo esa capa de hielo hay un océano de agua líquida salada, mantenido caliente por las fuerzas de marea de Júpiter. La misión Europa Clipper de la NASA, lanzada en 2024, viajará a esta luna para estudiar si ese océano subterráneo podría albergar vida. También Encélado, una pequeña luna de Saturno, tiene géiseres de agua que brotan de grietas en su corteza helada.',

  'Dagobah, el pantanoso planeta selvático donde Yoda entrenó a Luke, también tiene un parecido real 🌿. Los científicos creen que la Tierra durante el período Carbonífero, hace unos 300 millones de años, lucía muy parecida a Dagobah. En esa época, enormes bosques de helechos arborescentes y plantas primitivas cubrían los continentes, el aire tenía mucho más oxígeno que hoy y los insectos crecían a tamaños gigantescos. Había libélulas con envergaduras de 70 centímetros y milpiés de dos metros de largo. Todo ese material vegetal que se acumuló y se comprimió durante millones de años se convirtió en el carbón que usamos hoy. Así que Dagobah no es solo ciencia ficción: es un capítulo real de la historia de nuestro propio planeta.',

  'Uno de los exoplanetas más extremos conocidos es 55 Cancri e, un verdadero mundo infernal 🔥. Este planeta, también llamado Janssen, orbita tan cerca de su estrella que su año dura solo 18 horas terrestres. La temperatura en su superficie supera los 2.000°C, lo suficientemente caliente para derretir la mayoría de las rocas. Los científicos creen que un lado del planeta podría estar cubierto de océanos de lava burbujeante. El James Webb ha observado este planeta y ha detectado evidencia de una atmósfera, algo sorprendente para un mundo tan caliente y bombardeado por la radiación de su estrella. 55 Cancri e nos enseña que los planetas pueden existir en condiciones que antes creíamos imposibles.',

  'TRAPPIST-1 es un sistema estelar que parece sacado directamente de Star Wars 🪐. Esta estrella enana roja, ubicada a solo 40 años luz de la Tierra, tiene siete planetas rocosos del tamaño de la Tierra orbitándola. Tres de ellos están en la zona habitable y podrían tener agua líquida en sus superficies. Los planetas están tan cerca entre sí que si estuvieras en uno, podrías ver los otros en el cielo, algunos tan grandes como nuestra Luna. El sistema fue descubierto en 2017 usando un telescopio terrestre en Chile y confirmado con Spitzer y Hubble. El James Webb está estudiando las atmósferas de estos planetas ahora mismo, buscando señales de agua, dióxido de carbono o incluso indicios de vida.',

  'Los mundos de lava o "planetas magma" son una categoría fascinante de exoplanetas extremos 🌋. Estos planetas rocosos orbitan tan cerca de sus estrellas que su lado diurno se funde completamente, creando océanos de roca derretida. Algunos tienen "lluvias de rocas": el material rocoso se evapora en el lado caliente, el viento lo transporta al lado oscuro y frío, y allí se condensa y cae como lluvia de piedras. K2-141b es uno de estos mundos: su superficie diurna alcanza más de 3.000°C y tiene un océano de magma de 100 kilómetros de profundidad. Estos planetas nos ayudan a entender cómo era la Tierra primitiva, que también fue una bola de lava hace 4.500 millones de años. Estudiar estos mundos es como tener una máquina del tiempo planetaria.',

  'También existen exoplanetas que desafían todo lo que creíamos saber sobre la formación planetaria 🤯. HAT-P-7b tiene vientos de rubíes y zafiros: nubes hechas de corindón, el mineral de estas gemas, se forman en su atmósfera. WASP-76b tiene "lluvia de hierro" porque el hierro se evapora en su lado diurno y se condensa como gotas de hierro líquido en el lado nocturno. TOI-1431b orbita en dirección contraria a la rotación de su estrella, lo que desafía las teorías estándar de formación. Y GJ 1214b podría ser un "mundo de agua" completamente cubierto por un océano profundo con una atmósfera de vapor. Cada descubrimiento nos muestra que la naturaleza es mucho más creativa que cualquier guionista de Hollywood.',

  'La búsqueda de biofirmas, señales de vida, en atmósferas de exoplanetas es uno de los grandes objetivos de la astronomía actual 🧬. Los científicos buscan combinaciones de gases que solo podrían existir juntos si algo vivo los produce. En la Tierra, por ejemplo, la presencia simultánea de oxígeno y metano es una biofirma porque estos gases reaccionan entre sí y desaparecerían rápidamente sin algo que los reponga constantemente, como la vida. El James Webb puede detectar estos gases usando espectroscopía de tránsito, descomponiendo la luz que pasa a través de la atmósfera de un exoplaneta. En 2023, Webb detectó dióxido de carbono y metano en la atmósfera de K2-18b, un exoplaneta en zona habitable. Aunque esto no confirma vida, es exactamente el tipo de señal que los científicos esperaban encontrar.',

  'El programa de ciencia ciudadana Planet Hunters, parte de Zooniverse, permite que cualquier persona ayude a descubrir exoplanetas desde su computadora 🖥️. Voluntarios de todo el mundo examinan datos reales de TESS y Kepler buscando las diminutas bajadas de brillo que indican un tránsito. Los humanos son sorprendentemente buenos detectando patrones que los algoritmos a veces pasan por alto. Planet Hunters ya ha contribuido al descubrimiento de varios exoplanetas confirmados, incluyendo algunos en zonas habitables. Uno de sus hallazgos más famosos fue PH1b, un planeta circumbinario descubierto por voluntarios en 2012 y confirmado por astrónomos profesionales. ¡Tú también podrías descubrir un nuevo planeta desde tu casa!',

  'Las zonas habitables no son iguales para todas las estrellas ⭐. Las estrellas más calientes y luminosas tienen zonas habitables más lejanas, mientras que las estrellas enanas rojas, más frías y pequeñas, las tienen muy cerca. El problema con las enanas rojas es que emiten frecuentes llamaradas que podrían destruir la atmósfera de planetas cercanos. Sin embargo, estas estrellas son las más comunes en la galaxia, representando alrededor del 70% de todas las estrellas. Algunos científicos creen que planetas con campos magnéticos fuertes o atmósferas densas podrían protegerse de las llamaradas. Determinar si los planetas alrededor de enanas rojas pueden ser habitables es una de las preguntas más importantes de la astrobiología moderna.',

  'La tecnología para estudiar exoplanetas avanza a pasos agigantados 🏗️. El Extremely Large Telescope (ELT) de la ESO, actualmente en construcción en Chile, tendrá un espejo de 39 metros de diámetro y será capaz de observar directamente la luz de exoplanetas rocosos cercanos. El Telescopio Espacial Romano de la NASA, planeado para finales de la década de 2020, usará un coronógrafo para bloquear la luz de las estrellas y ver planetas directamente. Y el concepto HWO (Habitable Worlds Observatory) podría buscar biofirmas en decenas de planetas similares a la Tierra en las décadas de 2030 y 2040. Cada nueva generación de telescopios nos acerca más a responder la gran pregunta: ¿estamos solos en el universo?',

  'Los mundos de Star Wars nos inspiran a imaginar, pero la realidad de los exoplanetas es aún más asombrosa 🌟. Llevamos apenas tres décadas descubriendo exoplanetas y ya hemos encontrado más de 5.700 mundos confirmados, con miles más esperando verificación. Hemos visto planetas de diamante, mundos de lava, mini-Neptunos esponjosos y súper-Tierras rocosas en zonas habitables. Cada descubrimiento nos recuerda que nuestro sistema solar es solo un ejemplo entre miles de millones de posibilidades. La próxima vez que veas los atardeceres dobles de Tatooine, los hielos de Hoth o los pantanos de Dagobah, recuerda: planetas así existen de verdad ahí fuera. ¡Y tú podrías ser quien descubra el próximo! 🚀'
];

mod2.quizEs = [
  {
    q: '¿Cómo se llama el exoplaneta real que orbita dos estrellas, similar a Tatooine?',
    options: [
      'TRAPPIST-1e',
      'Kepler-16b',
      '55 Cancri e',
      'Próxima Centauri b'
    ],
    a: 1
  },
  {
    q: '¿Qué método de detección de exoplanetas mide la diminuta bajada de brillo cuando un planeta pasa frente a su estrella?',
    options: [
      'Método de velocidad radial',
      'Método de imagen directa',
      'Método de tránsito',
      'Método de microlente gravitatoria'
    ],
    a: 2
  },
  {
    q: '¿Qué luna del sistema solar se parece a Hoth y podría tener un océano bajo su capa de hielo?',
    options: [
      'Titán, luna de Saturno',
      'Io, luna de Júpiter',
      'Fobos, luna de Marte',
      'Europa, luna de Júpiter'
    ],
    a: 3
  },
  {
    q: '¿Qué buscan los científicos en las atmósferas de exoplanetas como posible evidencia de vida?',
    options: [
      'Señales de radio artificiales',
      'Biofirmas como combinaciones inusuales de gases',
      'Campos magnéticos muy fuertes',
      'Temperaturas exactamente iguales a las de la Tierra'
    ],
    a: 1
  },
  {
    q: '¿Qué plataforma de ciencia ciudadana permite a voluntarios ayudar a descubrir exoplanetas?',
    options: [
      'Wikipedia Science',
      'NASA Kids Club',
      'Zooniverse (Planet Hunters)',
      'Google Sky'
    ],
    a: 2
  }
];

// ─────────────────────────────────────────────
// MODULE 3: starwars_sec_3
// "C3PO y R2-D2, mas cerca de lo que parecen, Biomecatronia e IA"
// ─────────────────────────────────────────────
const mod3 = data.find(m => m.id === 'starwars_sec_3');
if (!mod3) throw new Error('Module starwars_sec_3 not found');

mod3.contentEs.sections[0].text = [
  'C-3PO, el droide dorado de Star Wars, habla con fluidez más de seis millones de formas de comunicación 🗣️. Aunque eso es ciencia ficción, la inteligencia artificial real ha avanzado enormemente en la comprensión del lenguaje humano. Los modelos de procesamiento de lenguaje natural (NLP, por sus siglas en inglés) pueden hoy traducir textos entre cientos de idiomas, resumir documentos largos y mantener conversaciones sorprendentemente naturales. Google Translate, por ejemplo, usa redes neuronales profundas para traducir entre más de 130 idiomas y es utilizado por mil millones de personas. Los asistentes de voz como Siri, Alexa y Google Assistant entienden preguntas habladas y responden en tiempo real. Cada año, estos sistemas se acercan un poco más a las habilidades de C-3PO.',

  'El secreto detrás de los traductores modernos son las redes neuronales artificiales, inspiradas en cómo funciona nuestro cerebro 🧠. Una red neuronal está compuesta por capas de "neuronas" artificiales que procesan información y aprenden patrones a partir de millones de ejemplos. El avance más importante fue la arquitectura "Transformer", publicada por investigadores de Google en 2017 en un famoso artículo titulado "Attention is All You Need". Los Transformers permitieron a las máquinas entender el contexto de las palabras en una oración de manera revolucionaria. Antes, los modelos leían las palabras una por una en orden; los Transformers pueden mirar todas las palabras al mismo tiempo y entender sus relaciones. Esta tecnología es la base de todos los modelos de lenguaje grandes (LLMs) que existen hoy.',

  'R2-D2, por otro lado, es un droide que no habla nuestro idioma pero es increíblemente hábil para navegar, reparar cosas y resolver problemas de manera autónoma 🔧. En la vida real, los robots autónomos más impresionantes son los rovers marcianos de la NASA. Perseverance, que aterrizó en Marte en febrero de 2021, puede conducir de forma autónoma por el terreno marciano usando cámaras y software de inteligencia artificial para evitar rocas y cráteres peligrosos. Su sistema de navegación autónoma, llamado AutoNav, le permite recorrer hasta 200 metros por día sin recibir instrucciones directas desde la Tierra. Perseverance también tiene un brazo robótico con instrumentos que analizan rocas buscando señales de vida antigua. En muchos sentidos, Perseverance es nuestro R2-D2 real explorando otro planeta.',

  'Ingenuity, el pequeño helicóptero que viajó con Perseverance, hizo historia como el primer vehículo en volar controladamente en otro planeta 🚁. Volar en Marte es extremadamente difícil porque la atmósfera marciana es 100 veces menos densa que la de la Tierra. Ingenuity, que pesaba solo 1,8 kilogramos, tuvo que girar sus aspas a 2.400 revoluciones por minuto, cinco veces más rápido que un helicóptero terrestre. Diseñado originalmente para solo cinco vuelos de demostración, Ingenuity completó 72 vuelos exitosos en casi tres años antes de que una de sus aspas se dañara en enero de 2024. Cada vuelo era autónomo: Ingenuity no podía ser pilotado en tiempo real desde la Tierra debido al retraso de las comunicaciones. Su éxito abrió la puerta a futuras misiones con drones exploradores en Marte, Titán y otros mundos.',

  'La inteligencia artificial no solo mueve robots: también está revolucionando la ciencia 🔬. En 2020, DeepMind, una empresa de Google, presentó AlphaFold, un sistema de IA que puede predecir la estructura tridimensional de las proteínas con una precisión asombrosa. Las proteínas son las máquinas moleculares que hacen funcionar todas las células vivas, y conocer su forma es clave para entender enfermedades y crear medicinas. Antes de AlphaFold, determinar la estructura de una sola proteína podía llevar años de trabajo en el laboratorio. AlphaFold ha predicho las estructuras de más de 200 millones de proteínas conocidas y sus datos están disponibles gratuitamente para científicos de todo el mundo. Este avance fue reconocido con el Premio Nobel de Química en 2024 para Demis Hassabis y John Jumper de DeepMind.',

  'Las prótesis biónicas son otro campo donde la realidad se acerca a Star Wars 🦾. En las películas, Luke Skywalker recibe una mano robótica que funciona perfectamente después de perder la suya en un combate con Darth Vader. En la vida real, las prótesis biónicas modernas pueden ser controladas por señales eléctricas de los músculos del usuario, un proceso llamado electromiografía (EMG). Algunas prótesis avanzadas, desarrolladas por empresas como Össur y Open Bionics, tienen dedos individuales motorizados que pueden agarrar objetos delicados como un huevo sin romperlo. Investigadores de universidades como Johns Hopkins han desarrollado brazos robóticos que se conectan directamente a los nervios del paciente, permitiendo sentir presión y temperatura. Aunque aún estamos lejos de la mano perfecta de Luke, cada año las prótesis se vuelven más funcionales, ligeras y accesibles.',

  'La robótica blanda o "soft robotics" es un campo revolucionario que se inspira en animales como pulpos y medusas 🐙. A diferencia de los robots tradicionales hechos de metal rígido, los robots blandos están fabricados con materiales flexibles como silicona y polímeros. Pueden deformarse, estirarse y adaptarse a formas complicadas, lo que los hace ideales para tareas delicadas como la cirugía o la exploración de espacios reducidos. Investigadores de Harvard han creado un robot blando con forma de pulpo llamado "Octobot" que funciona completamente sin componentes electrónicos rígidos. En el campo médico, se están desarrollando robots blandos que pueden navegar por el interior del cuerpo humano para entregar medicamentos directamente donde se necesitan. Imagina un mini-R2-D2 flexible viajando por tus venas para reparar tu cuerpo desde adentro.',

  'Los robots quirúrgicos ya están ayudando a los médicos a realizar operaciones con una precisión sobrehumana 🏥. El sistema Da Vinci, creado por Intuitive Surgical, es el robot quirúrgico más utilizado del mundo, con más de 7.000 unidades instaladas en hospitales. Un cirujano controla los brazos del robot desde una consola, y el robot traduce sus movimientos a escala miniatura con una precisión de fracciones de milímetro. Esto permite realizar cirugías mínimamente invasivas: en lugar de una gran incisión, el robot trabaja a través de pequeños orificios, lo que reduce el dolor y acelera la recuperación del paciente. El sistema filtra el temblor natural de las manos humanas, haciendo imposible un movimiento brusco accidental. Más de 12 millones de cirugías se han realizado con Da Vinci desde que fue aprobado por la FDA en el año 2000.',

  'Boston Dynamics, una empresa de robótica, ha creado algunos de los robots más impresionantes del mundo 🤖. Atlas, su robot humanoide, puede caminar, correr, saltar, hacer piruetas y hasta parkour con una agilidad que parece sacada de una película. Spot, su robot cuadrúpedo con forma de perro, ya se utiliza en la vida real para inspeccionar fábricas, centrales eléctricas y sitios de construcción. Spot puede subir escaleras, abrir puertas y navegar de forma autónoma por entornos complejos. En 2024, Boston Dynamics presentó una nueva versión completamente eléctrica de Atlas capaz de movimientos aún más fluidos y naturales. Estos robots no son exactamente droides de Star Wars, pero cada vez se parecen más a lo que George Lucas imaginó.',

  'Los robots colaborativos, llamados "cobots", trabajan junto a las personas en fábricas y laboratorios 🏭. A diferencia de los robots industriales tradicionales que están encerrados en jaulas de seguridad, los cobots tienen sensores que detectan la presencia de personas y se detienen automáticamente si alguien se acerca demasiado. Empresas como Universal Robots y FANUC fabrican cobots que pueden ser programados por cualquier persona sin conocimientos especiales de robótica. Un trabajador puede enseñar al cobot un movimiento simplemente guiando su brazo con la mano, y el robot lo repite con precisión una y otra vez. Los cobots se usan para tareas repetitivas como empaquetar, soldar o ensamblar componentes, liberando a los humanos para trabajos más creativos. Se estima que para 2030, habrá más de 2 millones de cobots trabajando en fábricas de todo el mundo.',

  'La exploración submarina también depende de robots que se parecen mucho a droides de Star Wars 🌊. Los vehículos operados remotamente (ROVs) como el Jason de la Woods Hole Oceanographic Institution pueden sumergirse a más de 6.500 metros de profundidad, donde la presión es aplastante y la oscuridad es total. Estos robots tienen brazos manipuladores, cámaras de alta definición y sensores que permiten a los científicos explorar volcanes submarinos, fuentes hidrotermales y restos de naufragios. Los robots submarinos autónomos (AUVs) pueden operar sin cable, navegando por sí mismos durante días recopilando datos del fondo oceánico. En 2012, el director James Cameron usó un sumergible robótico para llegar al punto más profundo del océano, la Fosa de las Marianas, a casi 11.000 metros. ¡El fondo del mar es tan desconocido como el espacio exterior!',

  'La competencia FIRST Robotics es una de las mejores formas en que jóvenes de todo el mundo aprenden robótica real 🏆. Fundada en 1989 por el inventor Dean Kamen, FIRST organiza competencias donde equipos de estudiantes diseñan, construyen y programan robots para completar desafíos específicos. Hay categorías para todas las edades: FIRST LEGO League para niños de 4 a 16 años y FIRST Robotics Competition (FRC) para adolescentes de preparatoria. Miles de equipos de más de 100 países participan cada año, y muchos estudiantes que empezaron en FIRST ahora trabajan en la NASA, SpaceX y empresas de tecnología líderes. Las competencias enseñan no solo ingeniería y programación, sino también trabajo en equipo, liderazgo y resolución de problemas. Si te gustan los robots, ¡busca un equipo FIRST cerca de ti!',

  'Arduino y LEGO Mindstorms han democratizado la robótica, permitiendo que cualquier persona construya robots desde casa 🏠. Arduino es una pequeña placa electrónica de código abierto creada en Italia en 2005 que puede controlar motores, luces, sensores y casi cualquier componente electrónico. Es tan económica y fácil de usar que millones de estudiantes, artistas e inventores la utilizan para crear proyectos increíbles. LEGO Mindstorms, ahora evolucionado a LEGO Spike Prime, combina las piezas de LEGO con motores y sensores programables para construir robots funcionales. Con estas herramientas, puedes construir un brazo robótico, un vehículo autónomo, un sistema de riego inteligente o incluso tu propio R2-D2. La barrera para entrar al mundo de la robótica nunca ha sido tan baja como hoy.',

  'La ética de la inteligencia artificial y la robótica es un tema cada vez más importante 🤔. En Star Wars, los droides tienen personalidades, emociones y lealtades, pero son tratados como propiedad. En la vida real, aunque los robots actuales no tienen conciencia ni emociones, surgen preguntas éticas importantes: ¿quién es responsable si un robot autónomo comete un error? ¿Cómo nos aseguramos de que la IA no discrimine a ciertos grupos de personas? ¿Deberían existir robots diseñados para la guerra? Organizaciones como el IEEE y la UNESCO han creado guías éticas para el desarrollo de IA y robótica. Isaac Asimov, el famoso escritor de ciencia ficción, propuso sus "Tres Leyes de la Robótica" en 1942 como un marco para pensar en estas cuestiones. A medida que los robots se vuelven más capaces, estas preguntas serán aún más relevantes.',

  'El futuro de la robótica y la IA es emocionante y está más cerca de lo que piensas 🌟. Se están desarrollando robots humanoides como Figure 01 y Optimus de Tesla que podrían ayudar en el hogar y en trabajos peligrosos. La IA generativa puede crear textos, imágenes y música, mientras que los sistemas de IA científica aceleran descubrimientos en medicina, materiales y energía. En exploración espacial, robots cada vez más inteligentes serán esenciales para construir bases en la Luna y Marte antes de que lleguen los humanos. Quizás algún día tengamos un droide de protocolo que nos ayude a comunicarnos con civilizaciones extraterrestres, ¡como C-3PO! La robótica y la IA necesitan personas creativas, curiosas y éticas que las desarrollen: personas como tú. ¡El futuro de los droides está en tus manos! 🚀'
];

mod3.quizEs = [
  {
    q: '¿Qué arquitectura de inteligencia artificial, publicada en 2017, revolucionó la comprensión del lenguaje por las máquinas?',
    options: [
      'Red neuronal convolucional (CNN)',
      'Máquina de Boltzmann',
      'Transformer',
      'Perceptrón multicapa'
    ],
    a: 2
  },
  {
    q: '¿Qué sistema de IA predijo la estructura tridimensional de más de 200 millones de proteínas?',
    options: [
      'Watson de IBM',
      'AlphaFold de DeepMind',
      'GPT de OpenAI',
      'DALL-E de OpenAI'
    ],
    a: 1
  },
  {
    q: '¿Cómo se llama el helicóptero robótico que fue el primero en volar en otro planeta?',
    options: [
      'Spirit',
      'Opportunity',
      'Sojourner',
      'Ingenuity'
    ],
    a: 3
  },
  {
    q: '¿Qué robot quirúrgico es el más utilizado en hospitales del mundo?',
    options: [
      'Atlas de Boston Dynamics',
      'El sistema Da Vinci',
      'ASIMO de Honda',
      'Spot de Boston Dynamics'
    ],
    a: 1
  },
  {
    q: '¿Qué plataforma de código abierto creada en Italia permite a estudiantes construir y programar robots desde casa?',
    options: [
      'Raspberry Pi',
      'Arduino',
      'Micro:bit',
      'Scratch'
    ],
    a: 1
  }
];

// ─────────────────────────────────────────────
// WRITE BACK
// ─────────────────────────────────────────────
fs.writeFileSync(filePath, 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';', 'utf8');
console.log('✅ Patched starwars_sec_1, starwars_sec_2, starwars_sec_3 successfully.');
