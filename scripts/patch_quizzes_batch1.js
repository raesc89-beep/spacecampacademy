/**
 * patch_quizzes_batch1.js
 * Adds quizEs arrays to: bttf_m1-m7, rocosos_m1-m6, interestelar_m1-m6
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../lib/courseData.js');

// ── Quiz data ──────────────────────────────────────────────────────────────
const QUIZZES = {

  // BTTF m1-m7
  bttf_m1: [
    { q: "¿Cuál fue el componente más importante del automóvil DeLorean que permitía el viaje en el tiempo?", options: ["El motor V8", "El condensador de flujo", "Las ruedas de llanta", "El velocímetro"], a: 1 },
    { q: "¿Cuántos kilómetros por hora necesitaba alcanzar el DeLorean para activar el viaje en el tiempo?", options: ["88 mph (141 km/h)", "120 mph (193 km/h)", "60 mph (97 km/h)", "100 mph (161 km/h)"], a: 0 },
    { q: "¿Qué principio físico real describe la dilatación del tiempo cuando los objetos se mueven muy rápido?", options: ["La ley de Newton", "La teoría especial de la relatividad de Einstein", "El principio de Arquímedes", "La ley de Boyle"], a: 1 },
    { q: "¿En qué año Doc Brown tuvo la inspiración del condensador de flujo según la película?", options: ["1975", "1980", "1955", "1985"], a: 2 },
    { q: "¿Qué fuente de energía original necesitaba el condensador de flujo para funcionar?", options: ["Gasolina", "Energía solar", "Plutonio", "Energía eléctrica común"], a: 2 }
  ],

  bttf_m2: [
    { q: "¿Qué es la paradoja del abuelo en los viajes en el tiempo?", options: ["Viajar al pasado y conocer a un abuelo famoso", "Ir al pasado y hacer algo que impida tu propio nacimiento", "Llevar objetos del futuro al pasado", "Cambiar el nombre de tu abuelo en la historia"], a: 1 },
    { q: "¿Qué le pasaría en el universo si realmente existieran líneas de tiempo alternativas?", options: ["Todos los cambios del pasado desaparecerían", "Se crearían ramas separadas de realidad paralela", "El tiempo se detendría para siempre", "Nada cambiaría en absoluto"], a: 1 },
    { q: "¿Cuál es el nombre del principio que sugiere que el universo protege su propia historia?", options: ["Principio de incertidumbre", "Ley de causalidad", "Hipótesis de protección cronológica", "Teorema de Planck"], a: 2 },
    { q: "En 'Regreso al Futuro', ¿qué le ocurrió a la foto de Marty cuando comenzó a alterar el pasado?", options: ["La foto desapareció instantáneamente", "Sus hermanos comenzaron a desvanecerse de la imagen", "La foto se volvió de color dorado", "La foto se duplicó"], a: 1 },
    { q: "¿Cómo se llama la paradoja donde un objeto no tiene origen claro porque viene de un ciclo cerrado en el tiempo?", options: ["Paradoja de bootstrap", "Paradoja de Schrödinger", "Paradoja del gemelo", "Paradoja de Fermi"], a: 0 }
  ],

  bttf_m3: [
    { q: "¿Qué es un agujero de gusano según la física teórica?", options: ["Un túnel hipotético que conecta dos puntos del espacio-tiempo", "Un agujero en la corteza terrestre", "Un hoyo negro pequeño", "Un tubo de vacío en el espacio"], a: 0 },
    { q: "¿Por qué los científicos creen que los agujeros de gusano serían inestables?", options: ["Se cerrarían demasiado rápido para atravesarlos", "Solo existen en películas de ciencia ficción", "Viajan más lentos que la luz", "Solo funcionan en el futuro"], a: 0 },
    { q: "¿Qué tipo de materia hipotética necesitaría un agujero de gusano para mantenerse abierto?", options: ["Materia normal muy densa", "Materia oscura", "Materia exótica con energía negativa", "Antimateria pura"], a: 2 },
    { q: "¿Qué mostró la película 'Interstellar' sobre los agujeros de gusano?", options: ["Que son completamente imposibles", "Una representación visualmente realista basada en ecuaciones físicas", "Que sólo existen cerca de Saturno", "Que son puertas a otros universos sin retorno"], a: 1 },
    { q: "¿Cuál físico propuso originalmente la solución matemática que describe los agujeros de gusano?", options: ["Stephen Hawking", "Albert Einstein y Nathan Rosen", "Niels Bohr", "Richard Feynman"], a: 1 }
  ],

  bttf_m4: [
    { q: "¿Qué es la entropía en términos simples?", options: ["La cantidad de energía útil de un sistema", "La tendencia natural al desorden y al caos", "La velocidad de una reacción química", "La temperatura de un objeto"], a: 1 },
    { q: "¿Cuál ley de la termodinámica establece que la entropía del universo siempre aumenta?", options: ["Primera ley", "Segunda ley", "Tercera ley", "Ley cero"], a: 1 },
    { q: "¿Por qué la flecha del tiempo apunta siempre hacia el futuro y no al pasado?", options: ["Porque los relojes solo giran en un sentido", "Porque la entropía siempre aumenta, dando dirección al tiempo", "Porque el Sol sale por el este", "Porque la gravedad jala hacia abajo"], a: 1 },
    { q: "En física, ¿qué nombre recibe la dirección en que fluye el tiempo (del pasado al futuro)?", options: ["Vector temporal", "Flecha del tiempo", "Eje cronológico", "Línea causal"], a: 1 },
    { q: "¿Cuál de estos procesos es un ejemplo claro de aumento de entropía?", options: ["Construir un castillo de arena", "Romper un vaso de vidrio", "Congelar agua", "Compactar basura"], a: 1 }
  ],

  bttf_m5: [
    { q: "¿Qué es la mecánica cuántica?", options: ["El estudio del movimiento de objetos grandes", "La física que describe el comportamiento de partículas muy pequeñas", "La rama que estudia los planetas", "La ciencia de los volcanes"], a: 1 },
    { q: "¿Qué es la superposición cuántica?", options: ["La suma de dos ondas de sonido", "Un estado donde una partícula puede estar en múltiples estados a la vez", "La posición de un planeta en su órbita", "El nivel de energía de un átomo"], a: 1 },
    { q: "¿Qué implica la interpretación de muchos mundos de la mecánica cuántica?", options: ["Que solo existe un universo posible", "Que cada decisión cuántica crea universos paralelos", "Que el tiempo puede viajar hacia atrás", "Que la luz siempre va en línea recta"], a: 1 },
    { q: "¿Qué es el entrelazamiento cuántico?", options: ["Cuando dos partículas quedan conectadas y se afectan mutuamente sin importar la distancia", "Cuando dos átomos se fusionan en uno", "La atracción entre protones y electrones", "La velocidad de giro de los electrones"], a: 0 },
    { q: "¿Qué científico famoso dijo 'Dios no juega a los dados' en desacuerdo con la aleatoriedad cuántica?", options: ["Niels Bohr", "Max Planck", "Albert Einstein", "Erwin Schrödinger"], a: 2 }
  ],

  bttf_m6: [
    { q: "¿Qué es la dilatación temporal según Einstein?", options: ["El alargamiento físico de los relojes", "El hecho de que el tiempo transcurre más lento cerca de objetos masivos o a altas velocidades", "El cambio de zona horaria", "El desfase horario en viajes largos"], a: 1 },
    { q: "¿Cómo comprobamos hoy en día que la dilatación temporal es real?", options: ["Con relojes atómicos en satélites GPS que van más rápido que en la Tierra", "Con experimentos de laboratorio con luz visible", "Observando a tortugas y liebres", "Midiendo la temperatura del espacio"], a: 0 },
    { q: "Si un astronauta viajara casi a la velocidad de la luz durante 5 años, ¿qué ocurriría al regresar?", options: ["Habría envejecido igual que las personas en la Tierra", "Habría envejecido menos que las personas en la Tierra", "Habría envejecido el doble", "El tiempo no cambia para nadie"], a: 1 },
    { q: "¿Cómo se llama la paradoja que ilustra la dilatación temporal con dos gemelos?", options: ["Paradoja del prisionero", "Paradoja del gato de Schrödinger", "Paradoja de los gemelos", "Paradoja de Zeno"], a: 2 },
    { q: "¿A qué velocidad se mueve la luz en el vacío?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "100,000 km/s"], a: 0 }
  ],

  bttf_m7: [
    { q: "¿Qué es la energía oscura en cosmología?", options: ["La energía liberada por agujeros negros", "Una fuerza misteriosa que está acelerando la expansión del universo", "La energía que alimenta las estrellas de neutrones", "La energía que genera el campo magnético terrestre"], a: 1 },
    { q: "¿Qué porcentaje aproximado del universo está compuesto por materia y energía oscura juntas?", options: ["Alrededor del 95%", "Alrededor del 50%", "Alrededor del 20%", "Solo el 5%"], a: 0 },
    { q: "¿Qué fue el Big Bang?", options: ["Una explosión en el espacio vacío", "El inicio del espacio, tiempo, materia y energía hace ~13,800 millones de años", "Una colisión entre dos galaxias", "La formación del sistema solar"], a: 1 },
    { q: "¿Qué instrumento nos permite 'ver' el pasado del universo observando galaxias lejanas?", options: ["Un microscopio electrónico", "El telescopio, porque la luz tarda tiempo en viajar", "Un acelerador de partículas", "Un sonar espacial"], a: 1 },
    { q: "¿Cuál fue la contribución más importante de la película 'Regreso al Futuro' a la cultura científica popular?", options: ["Demostrar que los viajes en el tiempo son imposibles", "Inspirar a generaciones a interesarse en la física y la ciencia ficción", "Mostrar cómo construir un DeLorean real", "Probar que el plutonio es seguro"], a: 1 }
  ],

  // ROCOSOS m1-m6
  rocosos_m1: [
    { q: "¿Cuáles son los cuatro planetas rocosos del sistema solar?", options: ["Mercurio, Venus, Tierra, Marte", "Júpiter, Saturno, Urano, Neptuno", "Tierra, Marte, Júpiter, Venus", "Mercurio, Tierra, Saturno, Marte"], a: 0 },
    { q: "¿Qué característica principal diferencia a los planetas rocosos de los gaseosos?", options: ["Tienen anillos", "Tienen una superficie sólida de roca o metal", "Son más grandes", "Tienen más lunas"], a: 1 },
    { q: "¿Cuál de los planetas rocosos es el más cercano al Sol?", options: ["Venus", "Marte", "Mercurio", "Tierra"], a: 2 },
    { q: "¿Cómo se llama la zona alrededor de una estrella donde es posible la vida tal como la conocemos?", options: ["Zona de habitabilidad o zona de Goldilocks", "Zona de radiación solar", "Cinturón de asteroides", "Zona de exclusión planetaria"], a: 0 },
    { q: "¿Qué es el núcleo de los planetas rocosos?", options: ["Una región de gas a alta presión", "Un núcleo sólido o líquido de hierro y níquel", "Una capa de hielo comprimido", "Un centro de roca volcánica"], a: 1 }
  ],

  rocosos_m2: [
    { q: "¿Por qué Mercurio tiene temperaturas extremas a pesar de ser el planeta más cercano al Sol?", options: ["Porque tiene una atmósfera muy densa que atrapa calor", "Porque casi no tiene atmósfera y no puede retener calor", "Porque está hecho de hielo", "Porque gira demasiado rápido"], a: 1 },
    { q: "¿Cuál es la temperatura en el lado iluminado de Mercurio?", options: ["Unos -173°C", "Unos 430°C", "Unos 100°C", "Unos 2000°C"], a: 1 },
    { q: "¿Cómo se llama la misión espacial que orbita Mercurio actualmente?", options: ["BepiColombo", "Cassini", "New Horizons", "Voyager 2"], a: 0 },
    { q: "¿Qué hace especial a Mercurio en términos de órbita y rotación?", options: ["Gira 3 veces por cada 2 órbitas alrededor del Sol (resonancia 3:2)", "Gira 1 vez por cada órbita completa", "Su órbita es perfectamente circular", "Tiene la órbita más circular del sistema solar"], a: 0 },
    { q: "¿Qué sonda fue la primera en fotografiar Mercurio de cerca?", options: ["Voyager 1", "Mariner 10", "Pioneer 11", "Juno"], a: 1 }
  ],

  rocosos_m3: [
    { q: "¿Cuál es la temperatura promedio en la superficie de Venus?", options: ["Unos 462°C", "Unos 100°C", "Unos -60°C", "Unos 800°C"], a: 0 },
    { q: "¿Qué gas en la atmósfera de Venus causa el efecto invernadero extremo?", options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono (CO₂)", "Argón"], a: 2 },
    { q: "¿En qué dirección gira Venus comparado con la mayoría de los planetas?", options: ["En la misma dirección que la Tierra", "En dirección retrógrada (al revés)", "No gira en absoluto", "Gira perpendicular al Sol"], a: 1 },
    { q: "¿Por qué Venus es llamado el 'planeta hermano' de la Tierra?", options: ["Porque tiene vida similar a la terrestre", "Porque tiene un tamaño y masa muy similares a los de la Tierra", "Porque tiene la misma cantidad de lunas", "Porque está a la misma distancia del Sol"], a: 1 },
    { q: "¿Qué misión soviética aterrizó en Venus y tomó fotos de su superficie?", options: ["Luna 9", "Venera 13", "Mars 3", "Viking 1"], a: 1 }
  ],

  rocosos_m4: [
    { q: "¿Cuánto tiempo tarda la Tierra en dar una vuelta completa alrededor del Sol?", options: ["365.25 días", "24 horas", "30 días", "100 días"], a: 0 },
    { q: "¿Qué protege a la Tierra de la radiación solar dañina?", options: ["La capa de ozono y el campo magnético", "Las nubes de lluvia", "La luna llena", "La capa de nieve polar"], a: 0 },
    { q: "¿Qué porcentaje de la superficie terrestre está cubierta por agua?", options: ["Aproximadamente el 71%", "Aproximadamente el 30%", "Aproximadamente el 50%", "Aproximadamente el 90%"], a: 0 },
    { q: "¿Cómo se llama la teoría que explica el movimiento de las placas tectónicas de la Tierra?", options: ["Teoría de la deriva continental", "Teoría gravitacional", "Teoría de expansión térmica", "Teoría del campo magnético"], a: 0 },
    { q: "¿Por qué la Tierra tiene estaciones del año?", options: ["Porque se acerca y aleja del Sol en su órbita elíptica", "Porque su eje está inclinado unos 23.5° respecto a su órbita", "Porque la Luna bloquea la luz solar", "Por los cambios en la actividad del Sol"], a: 1 }
  ],

  rocosos_m5: [
    { q: "¿Cuál es la atmósfera principal de Marte?", options: ["Oxígeno y nitrógeno como la Tierra", "Dióxido de carbono en un 95%", "Metano y hidrógeno", "Vapor de agua y argón"], a: 1 },
    { q: "¿Cómo se llama el volcán más alto del sistema solar, ubicado en Marte?", options: ["Etna marciano", "Olympus Mons", "Valles Marineris", "Monte Elías"], a: 1 },
    { q: "¿Qué evidencia sugiere que Marte tuvo agua líquida en el pasado?", options: ["Canales y valles secos que parecen formados por ríos", "Océanos visibles desde el espacio actualmente", "Lluvias actuales de agua salada", "Nubes de vapor de agua densas"], a: 0 },
    { q: "¿Cuál fue el primer vehículo todoterreno (rover) en explorar exitosamente Marte?", options: ["Curiosity", "Perseverance", "Sojourner", "Opportunity"], a: 2 },
    { q: "¿Por qué Marte tiene ese característico color rojizo?", options: ["Por la presencia de azufre en su superficie", "Por óxido de hierro (herrumbre) en su suelo", "Por la reflexión de la luz solar en su atmósfera", "Por cristales de cuarzo rosa"], a: 1 }
  ],

  rocosos_m6: [
    { q: "¿Qué es terraformación?", options: ["El proceso de estudiar la forma de un planeta", "La transformación de un planeta para hacerlo habitable para humanos", "La construcción de estaciones espaciales", "El estudio de los terremotos en otros planetas"], a: 1 },
    { q: "¿Por qué los científicos proponen Marte como candidato para la terraformación?", options: ["Porque ya tiene una atmósfera respirable", "Porque tiene un día similar al de la Tierra y evidencia de agua pasada", "Porque está más cerca del Sol que la Tierra", "Porque tiene temperaturas ideales actualmente"], a: 1 },
    { q: "¿Qué desafíos enfrentaría una misión humana a Marte en cuanto a radiación?", options: ["No habría problema de radiación", "Los astronautas enfrentarían alta exposición a radiación solar y cósmica", "Solo habría radiación durante el despegue", "La atmósfera de Marte protege completamente la radiación"], a: 1 },
    { q: "¿Cuánto tiempo tardaría aproximadamente un viaje de la Tierra a Marte con la tecnología actual?", options: ["Unas pocas horas", "Alrededor de 7-9 meses", "2-3 años", "Unas pocas semanas"], a: 1 },
    { q: "¿Cuál de estas organizaciones tiene planes activos para enviar humanos a Marte?", options: ["Solo la NASA", "NASA, SpaceX y varias agencias espaciales", "Solo SpaceX", "Ninguna organización tiene planes concretos"], a: 1 }
  ],

  // INTERESTELAR m1-m6
  interestelar_m1: [
    { q: "¿Qué es la relatividad general de Einstein en términos simples?", options: ["Una teoría sobre la velocidad de la luz en el vacío", "La teoría que describe cómo la masa curva el espacio-tiempo", "Una fórmula para calcular la energía de los átomos", "La teoría del movimiento de los planetas según Newton"], a: 1 },
    { q: "¿Qué fenómeno predijo Einstein que luego fue confirmado por la película Interstellar?", options: ["La existencia de agujeros negros con disco de acreción visible", "La expansión del universo", "La existencia de vida en otros planetas", "El movimiento browniano de las partículas"], a: 0 },
    { q: "¿Cómo se llama el agujero negro en la película Interstellar?", options: ["Sagitario A*", "Gargantúa", "Cygnus X-1", "NGC 1277"], a: 1 },
    { q: "¿Qué es un horizonte de sucesos en un agujero negro?", options: ["La zona donde la luz cambia de color", "El límite más allá del cual nada puede escapar, ni siquiera la luz", "El ecuador magnético del agujero negro", "La región donde se forman los jets de radiación"], a: 1 },
    { q: "¿Qué físico asesoró a los realizadores de Interstellar para lograr la representación científica del agujero negro?", options: ["Stephen Hawking", "Michio Kaku", "Kip Thorne", "Neil deGrasse Tyson"], a: 2 }
  ],

  interestelar_m2: [
    { q: "¿Qué es la dilatación del tiempo gravitacional?", options: ["El hecho de que el tiempo pasa más lento cerca de objetos con gran masa", "El aumento de velocidad de los relojes en el espacio", "La distorsión visual de los planetas a gran velocidad", "El efecto que producen los agujeros negros en la temperatura"], a: 0 },
    { q: "En la película Interstellar, ¿cuántos años en la Tierra equivalía cada hora en el planeta Miller?", options: ["1 año", "7 años", "100 años", "25 años"], a: 1 },
    { q: "¿Cuál es la diferencia de tiempo entre los astronautas que permanecen en la nave y los que bajan al planeta Miller?", options: ["Ninguna diferencia", "Los que bajan al planeta envejecen más rápido", "Los que bajan al planeta envejecen mucho más lento", "Solo cambia el tiempo en la Tierra"], a: 2 },
    { q: "¿Cuál experimento real demostró que los relojes avanzan más rápido en altitudes más elevadas (menos gravedad)?", options: ["El experimento Michelson-Morley", "El experimento con relojes atómicos en aviones (Hafele-Keating)", "El experimento del doble rendija", "El experimento de Rutherford"], a: 1 },
    { q: "¿Cómo afecta la gravedad intensa al paso del tiempo según la relatividad general?", options: ["Acelera el tiempo", "Ralentiza el tiempo", "No afecta el tiempo en absoluto", "Detiene completamente el tiempo"], a: 1 }
  ],

  interestelar_m3: [
    { q: "¿Qué es un agujero de gusano de Einstein-Rosen?", options: ["Una conexión hipotética entre dos puntos del espacio-tiempo", "Una estrella que colapsa en sí misma", "Un tipo de meteorito muy denso", "Un túnel submarino en planetas con océanos"], a: 0 },
    { q: "¿Por qué sería difícil atravesar un agujero de gusano en la realidad?", options: ["Porque solo existen en universos paralelos", "Porque serían inestables y se cerrarían antes de poder cruzarlos", "Porque viajan hacia el pasado únicamente", "Porque la temperatura interior sería demasiado baja"], a: 1 },
    { q: "¿Qué tipo de materia hipotética estabilizaría un agujero de gusano?", options: ["Materia de neutrones muy compacta", "Materia exótica con presión negativa o energía negativa", "Antimateria de alta densidad", "Materia oscura fría"], a: 1 },
    { q: "¿Cuál es la diferencia entre un agujero negro y un agujero de gusano?", options: ["Un agujero negro atrapa todo, un agujero de gusano podría conectar dos regiones del espacio", "Un agujero negro es azul y uno de gusano es rojo", "Un agujero de gusano consume más luz", "No hay diferencia, son el mismo fenómeno"], a: 0 },
    { q: "¿Qué científico realizó las ecuaciones que predicen los agujeros de gusano junto con Einstein?", options: ["Nathan Rosen", "Max Planck", "Werner Heisenberg", "Paul Dirac"], a: 0 }
  ],

  interestelar_m4: [
    { q: "¿Qué es la quinta dimensión en la película Interstellar?", options: ["Una dimensión donde el tiempo se puede manipular como el espacio", "El espacio entre galaxias", "El interior de un agujero negro", "Una zona sin gravedad"], a: 0 },
    { q: "¿Qué es un tesseracto en física y matemáticas?", options: ["Un cubo de cuatro dimensiones espaciales (hipercubo)", "El nombre del agujero negro Gargantúa", "Una nave espacial de propulsión cuántica", "Un tipo de estrella de neutrones"], a: 0 },
    { q: "¿Cuántas dimensiones espaciales percibimos normalmente los seres humanos?", options: ["Dos (largo y ancho)", "Tres (largo, ancho y alto)", "Cuatro (incluyendo el tiempo)", "Una sola"], a: 1 },
    { q: "¿Qué implicaría tener acceso a una dimensión adicional según la física teórica?", options: ["Poder ver el tiempo como si fuera una dimensión espacial más", "Poder volar sin gravedad", "Tener poderes telepáticos", "Moverse más rápido que la luz sin esfuerzo"], a: 0 },
    { q: "¿En qué teoría física actual se propone la existencia de dimensiones adicionales?", options: ["La teoría de cuerdas (string theory)", "La mecánica newtoniana clásica", "La teoría del campo unificado de Maxwell", "La electrodinámica cuántica (QED)"], a: 0 }
  ],

  interestelar_m5: [
    { q: "¿Cuál es la presión que sufren los astronautas durante el lanzamiento de un cohete?", options: ["0 G (ingravidez total)", "Hasta 3-4 G (tres o cuatro veces el peso normal)", "10 G constantes", "La misma presión que en la Tierra"], a: 1 },
    { q: "¿Qué efectos produce la ingravidez prolongada en el cuerpo humano?", options: ["Fortalece los huesos y músculos", "Debilita los huesos, músculos y afecta la vista y el corazón", "No tiene efectos negativos", "Solo afecta la digestión"], a: 1 },
    { q: "¿Cómo afecta el espacio al sistema cardiovascular de los astronautas?", options: ["El corazón se hace más eficiente", "El corazón puede atrofiarse al no trabajar contra la gravedad", "El corazón late más rápido permanentemente", "No hay cambios cardiovasculares en el espacio"], a: 1 },
    { q: "¿Qué sistema del cuerpo humano sufre más en misiones de larga duración debido a la falta de gravedad?", options: ["El sistema digestivo", "El sistema óseo y muscular", "El sistema respiratorio", "El sistema nervioso central únicamente"], a: 1 },
    { q: "¿Qué tipo de ejercicio hacen los astronautas en la Estación Espacial Internacional (ISS) para contrarrestar los efectos de la ingravidez?", options: ["No hacen ejercicio porque es imposible en ingravidez", "Ejercicio en bicicleta estática y caminadoras con arneses hasta 2.5 horas al día", "Solo meditación y respiración", "Nado en tanques de agua"], a: 1 }
  ],

  interestelar_m6: [
    { q: "¿Qué es la propulsión iónica en naves espaciales?", options: ["El uso de explosivos nucleares para impulsar la nave", "Acelerar iones para generar empuje con muy poco combustible durante mucho tiempo", "La fusión nuclear de helio-3 para generar energía", "El uso de energía solar para calentar aire y generar impulso"], a: 1 },
    { q: "¿Cuál es la limitación principal de viajar a las estrellas más cercanas con la tecnología actual?", options: ["No hay oxígeno en el espacio interestelar", "Las distancias son tan inmensas que el viaje tardaría miles de años", "El Sol no deja salir a las naves del sistema solar", "Los trajes espaciales no funcionan fuera del sistema solar"], a: 1 },
    { q: "¿Cómo se llama la estrella más cercana al Sol, a unos 4.24 años luz?", options: ["Sirius", "Próxima Centauri", "Vega", "Betelgeuse"], a: 1 },
    { q: "¿Qué es un año luz?", options: ["El tiempo que tarda la Tierra en dar una vuelta al Sol", "La distancia que recorre la luz en un año (aproximadamente 9.46 billones de km)", "La distancia entre la Tierra y la Luna", "La velocidad máxima de una nave espacial"], a: 1 },
    { q: "¿Cuál proyecto real tiene como objetivo enviar una pequeña sonda a Próxima Centauri impulsada por láser?", options: ["Proyecto Artemis", "Iniciativa Breakthrough Starshot", "Proyecto Daedalus", "Misión Alpha Centauri de SpaceX"], a: 1 }
  ]
};

// ── Patch logic ────────────────────────────────────────────────────────────
function applyQuizzes() {
  let src = fs.readFileSync(DATA_FILE, 'utf8');
  let patched = 0;

  for (const [moduleId, quiz] of Object.entries(QUIZZES)) {
    // Find the module entry by id
    const idPattern = new RegExp(`("id"\\s*:\\s*"${moduleId}")`, 'g');
    
    if (!idPattern.test(src)) {
      console.log(`⚠️  Module ${moduleId} not found in file`);
      continue;
    }

    // Check if quizEs already exists with enough questions
    // We'll use a targeted replacement approach: find the id, then find the next 
    // occurrence of "quizEs" or inject one
    
    // Strategy: replace the chunk containing the id and add/replace quizEs
    const quizJson = JSON.stringify(quiz, null, 6);
    
    // Look for existing quizEs near this module
    const moduleBlockPattern = new RegExp(
      `("id"\\s*:\\s*"${moduleId}"[\\s\\S]{0,3000}?)("quizEs"\\s*:\\s*\\[[\\s\\S]*?\\])(\\s*[,}])`,
      'g'
    );
    
    if (moduleBlockPattern.test(src)) {
      // Replace existing quizEs
      src = src.replace(
        new RegExp(
          `("id"\\s*:\\s*"${moduleId}"[\\s\\S]{0,3000}?)("quizEs"\\s*:\\s*\\[[\\s\\S]*?\\])(\\s*[,}])`,
          ''
        ),
        (match, before, existingQuiz, after) => {
          return `${before}"quizEs": ${quizJson}${after}`;
        }
      );
      console.log(`✅ Replaced quizEs for ${moduleId}`);
      patched++;
    } else {
      // Need to inject quizEs — find the closing of this module's contentEs and inject before the module closes
      // Find the position of this id, then find the next '}' that closes the module
      // We'll insert "quizEs" right before the closing brace of the module object
      
      // Simpler approach: find "id": "moduleId" and then find the end of the contentEs block
      // and add quizEs: [...] before the module closes
      
      // Find all occurrences of the pattern: id matches moduleId, look for end of module
      const searchStr = `"id": "${moduleId}"`;
      const idx = src.indexOf(searchStr);
      if (idx === -1) {
        console.log(`⚠️  Could not find ${moduleId} in source`);
        continue;
      }
      
      // Find the next top-level closing brace after this id (module end)
      // We need to find where this module object ends
      // Look for pattern: the module ends with },\n  { or }] (end of array)
      
      // Simple heuristic: look for the next occurrence of '},\n  {' or '}]' after the id
      // which signals end of module
      const afterId = src.substring(idx);
      
      // Find where to insert - look for the last field before closing brace
      // We'll find the closing structure by counting braces
      let depth = 0;
      let inString = false;
      let escape = false;
      let moduleEnd = -1;
      
      // Find opening brace of this module (should be before the id)
      let moduleStart = idx;
      while (moduleStart > 0 && src[moduleStart] !== '{') moduleStart--;
      
      for (let i = moduleStart; i < src.length; i++) {
        const c = src[i];
        if (escape) { escape = false; continue; }
        if (c === '\\') { escape = true; continue; }
        if (c === '"' && !escape) { inString = !inString; continue; }
        if (inString) continue;
        if (c === '{') depth++;
        if (c === '}') {
          depth--;
          if (depth === 0) {
            moduleEnd = i;
            break;
          }
        }
      }
      
      if (moduleEnd === -1) {
        console.log(`⚠️  Could not find module end for ${moduleId}`);
        continue;
      }
      
      // Insert quizEs before the closing brace
      const insertion = `,\n      "quizEs": ${quizJson}`;
      src = src.substring(0, moduleEnd) + insertion + src.substring(moduleEnd);
      console.log(`✅ Injected quizEs for ${moduleId}`);
      patched++;
    }
  }

  fs.writeFileSync(DATA_FILE, src, 'utf8');
  console.log(`\n✅ Done! Patched ${patched} modules.`);
}

applyQuizzes();
