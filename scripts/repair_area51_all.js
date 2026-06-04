/**
 * repair_area51_all.js
 * Completely replaces all 5 broken area51 modules with correct content + quiz.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function replaceFullModule(src, moduleId, correctContent) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const openBrace = src.lastIndexOf('{', modStart);
  const orderIdx = src.indexOf('"order":', modStart);
  const nextOrderIdx = src.indexOf('"order":', orderIdx + 10);
  const nextOpenBrace = src.lastIndexOf('{', nextOrderIdx - 1);
  const closeBrace = src.lastIndexOf('}', nextOpenBrace - 1);
  src = src.slice(0, openBrace) + correctContent + src.slice(closeBrace + 1);
  console.log(`✅ Repaired ${moduleId}`);
  return src;
}

const MODULES = {
  area51_m1: `{
    "id": "area51_m1",
    "order": 9001,
    "titleEn": "What is Area 51?",
    "titleEs": "¿Qué es el Área 51?",
    "badge": "Base Explorer",
    "badgeEs": "Explorador de la Base",
    "badgeIcon": "/assets/area51/area51_m1.png",
    "color": "#1F8A70",
    "icon": "/assets/area51/area51_m1.png",
    "contentEs": {
      "sections": [
        {
          "id": "area51_m1_merged",
          "title": "La base militar real",
          "text": [
            "¡Bienvenido, agente secreto espacial! Hoy tu misión es descubrir uno de los lugares más misteriosos del planeta Tierra: el Área 51. Está escondido en medio del desierto de Nevada, en los Estados Unidos, rodeado de montañas áridas y cielos azules donde el sol abrasa. Desde el aire parece solo una mancha gris en la arena, pero adentro ocurren algunas de las investigaciones más avanzadas del mundo.",
            "El nombre oficial de este lugar es Base Aérea del Lago Groom, aunque también se le conoce como 'Dreamland' (Tierra de los Sueños), 'Paradise Ranch' o simplemente 'La Base'. Sus coordenadas exactas son 37°14'06″ Norte, 115°48'40″ Oeste. En los mapas del gobierno americano durante décadas ni siquiera aparecía marcada.",
            "El Área 51 fue construida en 1955 por la Agencia Central de Inteligencia (CIA) de Estados Unidos con un propósito muy concreto: probar en secreto aviones espía de alta tecnología sin que los soviéticos se enteraran. En plena Guerra Fría, conocer los movimientos del enemigo era una cuestión de supervivencia nacional.",
            "El primer avión probado en el Área 51 fue el U-2, un avión espía que podía volar a 21 kilómetros de altura, mucho más alto que cualquier avión militar soviético de la época. Desde esa altitud, sus cámaras podían fotografiar instalaciones militares soviéticas con una precisión increíble, revelando la posición de misiles nucleares.",
            "Los pilotos que volaban sobre el Área 51 veían cosas que nadie más veía desde tierra: aviones con formas extrañas, vuelos nocturnos de máquinas silenciosas, maniobras imposibles. Los granjeros y viajeros que vivían cerca también los veían a veces, y como no podían saber qué eran, algunos pensaban que eran naves extraterrestres.",
            "En realidad, lo que la gente veía eran prototipos de aviones de la CIA y la Fuerza Aérea de Estados Unidos. El U-2 era tan diferente a todo lo conocido que cuando los civiles lo reportaban, el gobierno simplemente no podía confirmar ni negar su existencia. El secreto era tan importante que prefirieron dejar que la gente pensara en extraterrestres.",
            "El Área 51 ocupa una superficie de unos 6,000 kilómetros cuadrados de zona restringida, más grande que la ciudad de Los Ángeles. Está rodeada de sensores de movimiento, cámaras de vigilancia, alambres de púas y letreros que advierten que cualquier persona que intente entrar puede ser detenida, fotografiada y procesada legalmente.",
            "En 2013, la CIA desclasificó documentos que confirmaban oficialmente la existencia del Área 51. Admitieron que era un lugar para probar aviones espía, no una base alienígena. Sin embargo, esta revelación no frenó las teorías conspirativas: muchos simplistas afirman que los documentos desclasificados no revelan toda la verdad.",
            "Hoy el Área 51 sigue siendo una base militar activa donde trabajan miles de ingenieros, científicos y personal militar. Desarrollan tecnologías de defensa avanzadas, prueban nuevos aviones y sistemas de armas, y siguen manteniendo un alto nivel de secreto. No por extraterrestres, sino por razones de seguridad nacional perfectamente comprensibles.",
            "La ciencia que se desarrolla en el Área 51 y bases similares ha producido avances que usamos todos los días: materiales compuestos para aviones comerciales, sistemas de navegación GPS, tecnologías de comunicación, materiales resistentes al calor. El secreto militar de ayer se convierte frecuentemente en la tecnología civil de mañana.",
            "Para visitar el Área 51 (o al menos su entorno), puedes ir al pequeño pueblo de Rachel en Nevada, o al 'Alien Research Center' y la 'Extraterrestrial Highway' (Ruta 375), que lleva ese nombre oficial desde 1996. Miles de turistas la visitan cada año atraídos por el misterio. Ninguno ha visto extraterrestres.",
            "El Área 51 tiene su propio aeropuerto privado llamado 'JANET' (acrónimo de 'Just Another Non-Existent Terminal'), y sus propios aviones de transporte pintados de blanco con una línea roja que llevan diariamente a los trabajadores desde Las Vegas. Nadie conoce a qué exactamente se dedican dentro.",
            "Las películas de Hollywood han creado una imagen del Área 51 llena de pasillos verdes donde científicos estudian extraterrestres congelados. Esta imagen es completamente ficticia. Lo que realmente hay dentro son hangares gigantes, pistas de aterrizaje experimentales, centros de procesamiento de datos y laboratorios de materiales avanzados.",
            "El pensamiento crítico es la herramienta más importante ante el misterio. Cuando algo nos parece inexplicable, tenemos dos opciones: asumir que es sobrenatural, o investigar más profundamente hasta encontrar la explicación. El Área 51 es un ejemplo perfecto: lo que parecía inexplicable tenía una explicación terrenal, científica y lógica.",
            "Como agente científico del futuro, recuerda siempre hacer las preguntas correctas: ¿Qué evidencia tengo? ¿Es esa evidencia confiable? ¿Existen explicaciones más sencillas? El método científico no es solo para laboratorios: es la mejor herramienta para navegar en un mundo lleno de misterios reales y falsos."
          ]
        }
      ]
    },
    "quizEs": [
      {"q": "¿En qué estado de Estados Unidos se encuentra el Área 51?", "options": ["Texas","California","Nevada","Arizona"], "a": 2},
      {"q": "¿Cuál fue uno de los primeros aviones espía probados en el Área 51?", "options": ["SR-71 Blackbird","U-2","B-2 Spirit","F-117"], "a": 1},
      {"q": "¿Por qué la tecnología stealth hace casi invisible un avión para el radar?", "options": ["Porque vuela muy alto","Porque vuela muy rápido","Porque sus formas desvían las ondas de radar","Porque está pintado de negro"], "a": 2},
      {"q": "¿Cuántas veces la velocidad del sonido alcanzaba el SR-71 Blackbird?", "options": ["Una vez","Dos veces","Tres veces","Cuatro veces"], "a": 2},
      {"q": "¿Qué publicó la CIA en 2013 sobre el Área 51?", "options": ["Que ahí vivían alienígenas","Que el lugar no existe","Que era una base para probar aviones espía","Que tenía tecnología extraterrestre"], "a": 2}
    ]
  }`,
  area51_m2: `{
    "id": "area51_m2",
    "order": 9002,
    "titleEn": "The Secret Planes",
    "titleEs": "Los Aviones Secretos",
    "badge": "Stealth Engineer",
    "badgeEs": "Ingeniero Stealth",
    "badgeIcon": "/assets/area51/area51_m2.png",
    "color": "#1F8A70",
    "icon": "/assets/area51/area51_m2.png",
    "contentEs": {
      "sections": [
        {
          "id": "area51_m2_merged",
          "title": "Los aviones más secretos del mundo",
          "text": [
            "El Área 51 fue el hogar de algunos de los aviones más avanzados y secretos jamás construidos. Cada uno representaba un salto tecnológico enorme sobre lo que existía antes. El secreto era esencial: si los soviéticos hubieran conocido sus capacidades, habrían intentado desarrollar contramedidas.",
            "El U-2 fue el primer gran secreto del Área 51. Este avión espía, desarrollado por Lockheed en los años 50, podía volar a 21 kilómetros de altura, muy por encima del techo de los cazas soviéticos. Sus alas eran larguísimas, casi como un planeador, para sustentarse en el aire delgado de la estratosfera.",
            "En 1960, un U-2 pilotado por Francis Gary Powers fue derribado sobre la Unión Soviética. Esto causó una crisis internacional: el gobierno americano había negado repetidamente que espiaba a los soviéticos. Cuando Powers fue capturado, la mentira quedó expuesta. El incidente empeoró las relaciones de la Guerra Fría.",
            "El sucesor del U-2 fue el SR-71 Blackbird, el avión más rápido con tripulación jamás construido. Podía volar a más de tres veces la velocidad del sonido (Mach 3.2, o 3,540 km/h) y a más de 25 kilómetros de altura. Fue diseñado para ser tan rápido que si un misil lo perseguía, simplemente aceleraba y escapaba.",
            "El SR-71 estaba construido principalmente de titanio, un metal ligero, fuerte y resistente al calor extremo generado por la fricción con el aire a esas velocidades. A Mach 3, la superficie del avión alcanzaba 316°C. El titanio era la única solución práctica. La mayor parte del titanio fue adquirida secretamente de... la Unión Soviética.",
            "El F-117 Nighthawk fue el primer avión de combate operacional con tecnología stealth. Stealth (sigilo) significa que el avión es casi invisible para los radares. Su forma angular y sus materiales especiales absorben y desvían las ondas de radar en lugar de reflejarlas hacia el emisor. En los radares parecía del tamaño de un pájaro.",
            "La tecnología stealth nació de una idea teórica del matemático soviético Pyotr Ufimtsev, publicada en 1964, que describía matemáticamente cómo diseñar superficies que reflejaran mínimamente las ondas de radar. Un ingeniero de Lockheed la descubrió y comprendió su aplicación práctica. La ironía: los soviéticos inventaron la teoría pero los americanos la aplicaron.",
            "El F-117 Nighthawk fue probado en secreto en el Área 51 durante años antes de ser revelado al público en 1988. Durante ese tiempo, los avistamientos de este avión de forma triangular y vuelos nocturnos alimentaron las teorías sobre OVNIs. Era un avión terrestre, no una nave espacial.",
            "El B-2 Spirit fue el siguiente paso: un bombardero stealth con forma de ala volante. Tiene una envergadura de 52 metros y puede transportar bombas nucleares o convencionales. Su silueta es tan discreta en radar que parece un pájaro. Su coste fue de 2,100 millones de dólares por unidad, el avión más caro de la historia.",
            "Los materiales absorbentes de radar (RAM, por sus siglas en inglés) son una mezcla de polvo de carbono y material ferroso mezclados en una resina especial. Cuando las ondas de radar los golpean, en lugar de rebotar hacia el receptor, se convierten en calor. El avión literalmente 'absorbe' el radar.",
            "El A-12 Oxcart fue el predecesor del SR-71, también desarrollado en el Área 51. Era aún más secreto que el SR-71 porque era un avión de reconocimiento de la CIA (no de la Fuerza Aérea). Voló misiones sobre Cuba durante la Crisis de los Misiles en 1962, fotografiando los emplazamientos de misiles soviéticos.",
            "El D-21, otro proyecto secreto del Área 51, fue un dron supersónico de reconocimiento. Se lanzaba desde el lomo de un SR-71 y podía volar a Mach 3.5 sin piloto para fotografiar objetivos peligrosos. Fue el precursor de los drones modernos que hoy usa el ejército americano en todo el mundo.",
            "Los ingenieros que trabajaban en estos proyectos vivían una doble vida. En sus documentos de identidad, decían que trabajaban en empresas normales. Sus familias no sabían exactamente en qué trabajaban. No podían contar sus logros. Algunos llegaron a sus tumbas sin poder decirles a sus hijos que habían construido los aviones más avanzados de la historia.",
            "Hoy, el heredero de todos estos proyectos es el B-21 Raider, el nuevo bombardero stealth de la Fuerza Aérea de Estados Unidos, presentado al público en 2022. También hay proyectos aún más secretos que probablemente se están probando en el Área 51 o en bases similares en este momento. La innovación militar no se detiene.",
            "La historia de los aviones secretos del Área 51 nos enseña que los mayores misterios suelen tener explicaciones humanas: ingeniería brillante, secretos bien guardados y la necesidad de mantener una ventaja tecnológica en un mundo competitivo. No hacen falta extraterrestres para explicar lo inexplicable."
          ]
        }
      ]
    },
    "quizEs": [
      {"q": "¿A qué altura máxima podía volar el avión espía U-2?", "options": ["5 km","10 km","21 km","50 km"], "a": 2},
      {"q": "¿De qué metal estaba construido principalmente el SR-71 Blackbird?", "options": ["Aluminio","Acero","Titanio","Platino"], "a": 2},
      {"q": "¿Qué piloto americano fue capturado por los soviéticos en 1960?", "options": ["Neil Armstrong","Chuck Yeager","John Glenn","Francis Gary Powers"], "a": 3},
      {"q": "¿Cómo se llama la tecnología que hace invisible un avión para el radar?", "options": ["Stealth","Supersónica","Hipersónica","Subórbital"], "a": 0},
      {"q": "¿Cuál fue el primer avión stealth operativo volado desde el Área 51?", "options": ["SR-71 Blackbird","U-2","F-117 Nighthawk","B-2 Spirit"], "a": 2}
    ]
  }`,
  area51_m3: `{
    "id": "area51_m3",
    "order": 9003,
    "titleEn": "The Origin of the Rumors",
    "titleEs": "El Origen de los Rumores",
    "badge": "Myth Buster",
    "badgeEs": "Cazador de Mitos",
    "badgeIcon": "/assets/area51/area51_m3.png",
    "color": "#1F8A70",
    "icon": "/assets/area51/area51_m3.png",
    "contentEs": {
      "sections": [
        {
          "id": "area51_m3_merged",
          "title": "Cómo nacen los rumores y por qué los creemos",
          "text": [
            "¿Alguna vez te has preguntado por qué la gente cree en cosas que no tienen evidencia científica? El caso del Área 51 es un laboratorio perfecto para entender cómo se forman las teorías conspirativas y por qué la mente humana las encuentra tan atractivas.",
            "Todo comenzó con un evento real: en julio de 1947, cerca de Roswell, Nuevo México, algo cayó del cielo. Los testigos describieron materiales extraños, metálicos, muy ligeros pero resistentes. Un comunicado del ejército confirmó inicialmente que era un 'disco volador'. Luego rectificaron: era solo un globo meteorológico.",
            "La verdad era más interesante que un simple globo meteorológico. Los documentos desclasificados décadas después revelaron que el objeto era un globo de vigilancia del Proyecto Mogul, un programa secreto para detectar las pruebas nucleares soviéticas usando globos de alta altitud con micrófonos. ¡Tan secreto era que no podían decir la verdad!",
            "Pero la semilla de la duda ya estaba plantada. Durante los años 50 y 60, los residentes del desierto de Nevada veían con frecuencia objetos volantes extraños: luces que se movían en ángulos imposibles, objetos silenciosos que aceleraban de repente, formas geométricas nunca vistas en aviones normales. Todos estos avistamientos tenían una explicación: los aviones secretos del Área 51.",
            "El problema era que el gobierno no podía dar la explicación real sin revelar los programas secretos. Cuando la Fuerza Aérea investigaba los reportes de OVNIs (Objetos Voladores No Identificados), a veces sabían exactamente qué había visto la gente, pero clasificaban la información. El silencio oficial alimentaba la especulación.",
            "En 1989, un hombre llamado Bob Lazar afirmó públicamente que había trabajado en el Área 51 analizando tecnología de propulsión extraterrestre. Su historia incluía detalles específicos sobre naves alienígenas y experimentos con energía gravitacional. Aunque nunca pudo verificar sus credenciales, su historia se volvió viral antes de que internet existiera como la conocemos.",
            "La historia de Bob Lazar sigue circulando hoy. Los investigadores que han tratado de verificar sus afirmaciones encuentran inconsistencias: su nombre no aparece en los registros universitarios que dice tener, las fechas no coinciden, y ningún otro testigo corrobora sus historias. Sin embargo, sus seguidores creen que la CIA borró sus huellas.",
            "En septiembre de 2019, más de dos millones de personas se organizaron en Facebook para 'asaltar el Área 51' en un evento llamado 'Area 51, They Can't Stop All of Us'. Era originalmente una broma viral, pero las autoridades lo tomaron en serio. Al final, solo unas pocas decenas de curiosos aparecieron frente a las puertas. Nadie entró.",
            "La psicología detrás de las teorías conspirativas es fascinante. Los seres humanos somos buscadores de patrones: nuestro cerebro evolucionó para encontrar significado y conexiones incluso donde no las hay. Cuando hay secretos del gobierno, nuestro cerebro los llena con las narrativas más dramáticas disponibles.",
            "Los conspiracionistas también usan un argumento circular muy efectivo: cualquier evidencia que contradiga la conspiración es presentada como parte de la conspiración. Si la NASA dice que no hay extraterrestres en el Área 51, es porque la NASA está en la conspiración. Este tipo de razonamiento es imposible de refutar, lo cual lo hace psicológicamente atractivo pero científicamente inútil.",
            "El método científico existe precisamente para protegernos de este tipo de pensamiento circular. Una afirmación científica debe ser 'falsificable': debe existir alguna observación o experimento que, si se realizara, podría demostrar que la afirmación es falsa. Si ninguna evidencia puede cambiar tu creencia, esa creencia no es científica.",
            "Carl Sagan, el astrónomo que mencionamos en el módulo de agujeros de gusano, tenía una frase brillante sobre esto: 'Extraordinary claims require extraordinary evidence' (Las afirmaciones extraordinarias requieren evidencias extraordinarias). Creer que hay extraterrestres en el Área 51 es una afirmación extraordinaria. ¿Dónde está la evidencia extraordinaria?",
            "Los avistamientos de OVNIs sí son fenómenos reales en el sentido de que las personas sí ven objetos en el cielo que no pueden identificar. La pregunta es qué son esos objetos. La respuesta más común, verificada una y otra vez por investigadores serios, es: tecnología militar secreta, fenómenos atmosféricos, satélites o drones. No naves extraterrestres.",
            "Los propios militares de Estados Unidos han reconocido en años recientes que algunos avistamientos de OVNIs (ahora llamados UAPs, Fenómenos Aéreos No Identificados) no tienen explicación inmediata. Pero 'no tengo explicación inmediata' es muy diferente de 'son extraterrestres'. La segunda conclusión requiere un salto enorme sin evidencia.",
            "Ser un buen científico significa ser cómodo con la incertidumbre. Está bien decir 'no sé' o 'necesitamos más evidencia'. Lo que no es científico es saltar a conclusiones extraordinarias sin evidencia solo porque el misterio nos produce ansiedad. El Área 51 es misteriosa por razones humanas perfectamente comprensibles: el secreto militar. Nada más."
          ]
        }
      ]
    },
    "quizEs": [
      {"q": "¿En qué año ocurrió el incidente de Roswell?", "options": ["1945","1947","1952","1960"], "a": 1},
      {"q": "¿Qué era realmente el objeto que cayó cerca de Roswell en 1947?", "options": ["Una nave extraterrestre","Un cohete soviético","Un globo del Proyecto Mogul","Un avión experimental U-2"], "a": 2},
      {"q": "¿Por qué el gobierno no podía explicar los avistamientos de OVNIs cerca del Área 51?", "options": ["Porque eran extraterrestres","Porque no sabían qué eran","Porque revelar la verdad expondría sus aviones secretos","Porque los pilotos mentían"], "a": 2},
      {"q": "¿Qué evento masivo en internet de 2019 involucró al Área 51?", "options": ["Un concierto","Una maratón de videos","Una propuesta de asaltar la base","Un torneo de videojuegos"], "a": 2},
      {"q": "¿Cómo se llama la tendencia a buscar explicaciones extraordinarias ante secretos?", "options": ["Pensamiento científico","Pensamiento conspirativo","Pensamiento crítico","Pensamiento lateral"], "a": 1}
    ]
  }`,
  area51_m4: `{
    "id": "area51_m4",
    "order": 9004,
    "titleEn": "Real Science vs Fiction",
    "titleEs": "Ciencia Real vs. Ficción",
    "badge": "Science Defender",
    "badgeEs": "Defensor de la Ciencia",
    "badgeIcon": "/assets/area51/area51_m4.png",
    "color": "#1F8A70",
    "icon": "/assets/area51/area51_m4.png",
    "contentEs": {
      "sections": [
        {
          "id": "area51_m4_merged",
          "title": "La ciencia real detrás del Área 51",
          "text": [
            "La ciencia real que se desarrolló en el Área 51 y en los proyectos secretos asociados es mucho más fascinante que cualquier historia de extraterrestres. Requería resolver problemas de física, química, ingeniería de materiales y aerodinámica que nadie había resuelto antes.",
            "La aerodinámica es la ciencia que estudia cómo se mueven los objetos a través del aire. Para diseñar aviones que volaran a tres veces la velocidad del sonido, los ingenieros del Área 51 tuvieron que resolver problemas aerodinámicos completamente nuevos: olas de choque, calentamiento por fricción, estabilidad a velocidades extremas.",
            "Cuando un avión supera la velocidad del sonido (340 metros por segundo a nivel del mar), crea una onda de choque, una perturbación violenta del aire que produce el 'boom sónico' que escuchas como un trueno. A tres veces la velocidad del sonido, el manejo de estas ondas de choque es crucial para la estabilidad del avión.",
            "El calentamiento aerodinámico fue uno de los mayores desafíos del SR-71. A Mach 3, la fricción con el aire calienta la superficie del avión a más de 300°C. Los materiales convencionales como el aluminio se deformarían. La solución fue el titanio, que mantiene su resistencia a esas temperaturas, aunque es mucho más difícil de fabricar.",
            "La fabricación con titanio en los años 60 era un arte difícil. El titanio no se puede soldar con las técnicas convencionales: reacciona con el oxígeno y el nitrógeno del aire a altas temperaturas. Los ingenieros tuvieron que desarrollar técnicas de soldadura en atmósfera de gas argón para fabricar el SR-71. Nuevas técnicas que luego se usaron en medicina e industria.",
            "La tecnología stealth requería resolver un problema matemático complejo: ¿cómo diseñar una superficie que, dado un ángulo de incidencia de ondas de radar, devuelva la mínima cantidad de energía hacia el receptor? La solución matemática era conocida (gracias a Ufimtsev), pero convertirla en un avión real que también volara requirió años de trabajo.",
            "Los materiales absorbentes de radar (RAM) son un ejemplo de síntesis química avanzada. Mezclar partículas de carbono y materiales ferrosos en una resina para crear un material que absorba eficientemente las microondas en un rango específico de frecuencias requería conocimiento profundo de física de ondas electromagnéticas y química de polímeros.",
            "Los sistemas de navegación inercial de los aviones espía son obras maestras de la mecánica de precisión. Un sistema inercial mide aceleraciones y rotaciones usando giroscopios y acelerómetros, calculando la posición sin ninguna señal externa. El SR-71 podía volar de California a un objetivo en el otro lado del mundo y llegar con error de solo 300 metros.",
            "Las cámaras de reconocimiento del U-2 y el SR-71 eran también milagros de óptica. Debían fotografiar el suelo desde 20-25 km de altura con suficiente resolución para leer las matrículas de los vehículos. Requerían lentes de cristal óptico de la máxima pureza, mecanismos de estabilización para compensar la vibración del avión, y películas fotográficas de alta sensibilidad y resolución.",
            "Los trajes de presión que usaban los pilotos del U-2 y el SR-71 eran precursores directos de los trajes espaciales. A 21-25 km de altura, la presión atmosférica es tan baja que la sangre podría literalmente hervir a temperatura corporal. El traje mantenía la presión correcta alrededor del cuerpo del piloto, como un traje espacial miniaturizado.",
            "El radar fue inventado en los años 30 y durante la Segunda Guerra Mundial se convirtió en una tecnología bélica crucial. La carrera entre hacer aviones invisibles al radar y mejorar los radares para detectarlos es una de las grandes carreras tecnológicas de la Guerra Fría, que continúa hasta hoy con radares de nueva generación.",
            "La inteligencia artificial también tiene sus raíces en los proyectos del Área 51. Los primeros sistemas de procesamiento de imágenes de satélite y avión espía, que debían analizar automáticamente miles de fotografías para detectar instalaciones militares, fueron de los primeros usos prácticos de algoritmos de reconocimiento de patrones automatizados.",
            "La bioquímica también tuvo su papel: los pilotos del SR-71 necesitaban dietas y regímenes especiales para tolerar las fuerzas G y las presiones de vuelo. Los estudios de fisiología del vuelo realizados en el Área 51 contribuyeron al conocimiento médico sobre los límites del cuerpo humano y eventualmente a la medicina deportiva de alto rendimiento.",
            "La historia de la ciencia real del Área 51 nos enseña que los grandes avances tecnológicos requieren resolver problemas que nadie ha resuelto antes. Necesitas física, matemáticas, química, ingeniería, biología y medicina trabajando juntas. Es un recordatorio de que la ciencia no son compartimentos separados sino un ecosistema de conocimiento interconectado.",
            "Si quieres trabajar algún día en proyectos tan apasionantes como los del Área 51 (sea en defensa, en exploración espacial, o en cualquier frontera del conocimiento), el camino comienza ahora: con curiosidad, con amor por las matemáticas y las ciencias, y con la disposición a seguir aprendiendo durante toda tu vida."
          ]
        }
      ]
    },
    "quizEs": [
      {"q": "¿Qué estudia la aerodinámica?", "options": ["El movimiento de los planetas","El comportamiento de objetos en el agua","El movimiento de objetos a través del aire","La temperatura del espacio"], "a": 2},
      {"q": "¿Por qué el titanio fue clave para los aviones del Área 51?", "options": ["Es invisible al radar","Es ligero, fuerte y soporta altas temperaturas","Es el metal más barato","Lo fabricaban en el Área 51"], "a": 1},
      {"q": "¿Qué hacen los materiales absorbentes de radar en aviones stealth?", "options": ["Reflejan el radar al enemigo","Convierten ondas de radar en calor","Emiten señales que confunden al radar","Bloquean físicamente las ondas"], "a": 1},
      {"q": "¿Qué necesita la ciencia para considerar válida una afirmación?", "options": ["Testimonios personales","Fotos borrosas","Evidencia medible y experimentos repetibles","La opinión de muchas personas"], "a": 2},
      {"q": "¿Para qué sirven los sistemas inerciales de navegación?", "options": ["Para ver a través de las nubes","Para comunicarse con satélites","Para calcular posición sin señales externas usando giroscopios","Para detectar aviones enemigos"], "a": 2}
    ]
  }`,
  area51_m5: `{
    "id": "area51_m5",
    "order": 9005,
    "titleEn": "The Camel Detection Team",
    "titleEs": "El Equipo de Detección de Camelos",
    "badge": "Innovator",
    "badgeEs": "Innovador",
    "badgeIcon": "/assets/area51/area51_m5.png",
    "color": "#1F8A70",
    "icon": "/assets/area51/area51_m5.png",
    "contentEs": {
      "sections": [
        {
          "id": "area51_m5_merged",
          "title": "Innovación y trabajo en equipo en el Área 51",
          "text": [
            "Uno de los aspectos más fascinantes del Área 51 no son los aviones en sí, sino la manera en que fueron creados: un modelo de innovación que se convirtió en referencia para la industria tecnológica moderna. Las startups de Silicon Valley, los equipos de investigación de las universidades y las empresas de tecnología de todo el mundo lo usan hoy.",
            "El equipo que creó los aviones más revolucionarios del Área 51 se llamaba 'Skunk Works', una división especial y secreta de la empresa Lockheed Martin. Fue fundada en 1943 por el ingeniero Kelly Johnson. El nombre venía de una tira cómica popular de la época, Lil' Abner, donde había una fábrica secreta llamada 'Skonk Works'.",
            "Kelly Johnson era un genio con una filosofía clara: los equipos pequeños y empoderados, sin burocracia, producen mejores resultados que los equipos grandes y jerarquizados. Su sistema de 14 reglas, conocidas como las 'Reglas de Kelly', son todavía estudiadas en escuelas de negocios y programas de innovación.",
            "Las reglas de Kelly incluían principios como: el director del proyecto debe tener autoridad total sobre todos los aspectos del proyecto; el número de informes debe ser mínimo; el contratista y el cliente deben tener una comunicación directa y fluida; los problemas deben resolverse en el nivel donde ocurren, sin escalarlos innecesariamente.",
            "En el Skunk Works, los ingenieros podían tomar decisiones sin aprobar cada detalle con docenas de gerentes. Si un ingeniero encontraba una solución mejor a un problema a las 11 de la noche, podía implementarla inmediatamente y explicarla al día siguiente. Esta agilidad aceleró enormemente el proceso de innovación.",
            "El resultado fue extraordinario: el U-2 fue diseñado y construido en menos de 8 meses desde que se aprobó el proyecto. El SR-71 tardó menos de dos años en ir del concepto al primer vuelo. Estos plazos eran imposibles con los métodos convencionales de adquisición militar, donde los proyectos duran décadas.",
            "Los trabajadores del Área 51 llegaban cada día en aviones especiales desde Las Vegas. La flota de aviones blancos con una franja roja que los transportaba se conocía como 'JANET Airlines' (un acrónimo que según los empleados significa 'Just Another Non-Existent Terminal'). Los pasajeros no podían revelar su destino ni su trabajo.",
            "La seguridad operacional era extrema. Los trabajadores firmaban contratos de confidencialidad de por vida. No podían hablar de su trabajo ni con sus familias. Muchos llevaron sus secretos a la tumba. En las reuniones sociales, cuando alguien preguntaba dónde trabajaban, tenían respuestas preparadas de organizaciones ficticias.",
            "Esta cultura de secreto total creó problemas psicológicos en algunos trabajadores. Vivir una doble vida durante décadas tiene un costo emocional. Algunos veteranos del Área 51, ya mayores y en sus últimos años, han hablado con alivio de poder finalmente contar sus historias cuando los programas fueron desclasificados.",
            "Ben Rich, el sucesor de Kelly Johnson como director del Skunk Works, dirigió el desarrollo del F-117 Nighthawk. Tenía una personalidad diferente a Johnson: más cálido, más dispuesto a escuchar ideas de sus ingenieros. Bajo su liderazgo, el Skunk Works mantuvo su reputación de producir los aviones más avanzados del mundo.",
            "El U-2 sigue volando hoy, más de 70 años después de su primer vuelo. Ha sido modernizado con nuevos motores, nuevas cámaras y nuevos sistemas electrónicos, pero la célula básica del avión sigue siendo esencialmente la misma que diseñó Kelly Johnson en los años 50. Un tributo a la calidad del diseño original.",
            "El modelo Skunk Works ha sido imitado por empresas tecnológicas de todo el mundo. Google X (ahora llamado simplemente X), el laboratorio de ideas secretas de Google, tiene una filosofía similar: pequeños equipos, alta autonomía, proyectos ambiciosos y disposición a aceptar el fracaso como parte del aprendizaje.",
            "Area 51 también nos enseña sobre el poder del propósito compartido. Los trabajadores sabían que su trabajo era crucial para la seguridad de su país en el momento más tenso de la Guerra Fría. Este propósito elevado les daba motivación para trabajar horas extraordinarias, resolver problemas imposibles y mantener el secreto durante décadas.",
            "La historia del Área 51 concluye con una lección sobre la naturaleza de la innovación: los mayores avances tecnológicos ocurren cuando personas brillantes, con recursos suficientes, trabajan juntas con un propósito claro y con la libertad de tomar decisiones sin burocracia excesiva. No hace falta tecnología extraterrestre para hacer lo imposible.",
            "Tú puedes aprender de este modelo. Cuando tengas un proyecto, rodéate de personas con habilidades complementarias a las tuyas, define claramente el objetivo, minimiza las reglas innecesarias, y da a cada persona la autonomía para dar lo mejor de sí. Eso es lo que hizo el Área 51, y cambió el mundo."
          ]
        }
      ]
    },
    "quizEs": [
      {"q": "¿Cómo se llamaba el grupo secreto de ingeniería de Lockheed?", "options": ["Area Works","Skunk Works","Black Works","Desert Works"], "a": 1},
      {"q": "¿Quién fue el fundador del Skunk Works?", "options": ["Ben Rich","Kelly Johnson","Werner von Braun","Howard Hughes"], "a": 1},
      {"q": "¿Cómo se llamaba el servicio secreto de transporte aéreo al Área 51?", "options": ["Shadow Air","Ghost Airlines","JANET Airlines","Secret Wings"], "a": 2},
      {"q": "¿Qué desafío especial tenía el U-2 al aterrizar?", "options": ["Necesitaba una pista de 10 km","Otro piloto en auto debía guiarlo por radio","Debía aterrizar en la oscuridad","Solo aterrizaba con viento en contra"], "a": 1},
      {"q": "¿Qué modelo de innovación estableció el Área 51?", "options": ["Equipos enormes con burocracia","Trabajo individual sin coordinación","Equipos pequeños y ágiles con libertad creativa","Solo ingenieros militares"], "a": 2}
    ]
  }`
};

for (const [moduleId, content] of Object.entries(MODULES)) {
  src = replaceFullModule(src, moduleId, content);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ All area51 modules repaired!');
