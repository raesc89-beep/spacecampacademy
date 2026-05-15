const fs = require('fs');

const wormhole15x15 = [
  {
    title: "¿Qué es un Puente Einstein-Rosen? (I)",
    text: [
      "Un puente de Einstein-Rosen, comúnmente conocido como agujero de gusano, es una característica topológica del espacio-tiempo.",
      "Imagina el universo como una inmensa sábana de tela elástica y plana que se extiende en todas direcciones.",
      "Normalmente, para viajar de un punto A a un punto B en esta sábana, debes recorrer toda la distancia sobre la superficie.",
      "Sin embargo, si lograras doblar la sábana por la mitad, el punto A y el punto B quedarían uno frente al otro.",
      "Un agujero de gusano sería un 'túnel' que perfora la tela en ese preciso lugar, conectando ambas zonas casi instantáneamente.",
      "A nivel topológico, estas estructuras consisten en dos bocas esféricas conectadas por una 'garganta' o conducto.",
      "Las distancias que separan ambas bocas podrían ser de escasos metros o de millones de años luz a través del universo normal.",
      "Matemáticamente, estas estructuras no violan ninguna de las leyes físicas que conocemos actualmente.",
      "Se consideran atajos cósmicos que, de existir, revolucionarían nuestra comprensión de la expansión del universo.",
      "Sin embargo, es crucial recordar que hasta hoy son objetos estrictamente teóricos y nunca han sido observados por nuestros telescopios."
    ]
  },
  {
    title: "¿Qué es un Puente Einstein-Rosen? (II)",
    text: [
      "Para comprender la naturaleza de un puente, debemos adentrarnos en las matemáticas de la Relatividad General.",
      "Albert Einstein demostró que la masa y la energía pueden curvar el tejido mismo del espacio-tiempo.",
      "Cuando la densidad de materia es increíblemente alta, esta curvatura puede volverse tan extrema que perfora el tejido.",
      "Las ecuaciones permiten soluciones donde esta perforación no termina en una singularidad ciega, sino que desemboca en otra región.",
      "Es como un remolino en el océano que, en lugar de hundirse en la arena, conectara directamente con otro océano distante.",
      "Esta conexión se realiza a través de un hiperespacio matemático, una dimensión superior a nuestras tres dimensiones espaciales normales.",
      "Si existieran, los puentes podrían conectar no solo dos lugares distintos de nuestro propio universo observable.",
      "Algunas teorías sugieren que podrían conectar nuestro universo con otros universos paralelos en el multiverso.",
      "Incluso podrían vincular regiones con leyes físicas fundamentalmente diferentes a las que conocemos en la Tierra.",
      "La fascinación por estas estructuras radica en que son la única solución matemática que permite eludir el límite de la velocidad de la luz."
    ]
  },
  {
    title: "La Historia de su Teoría (I)",
    text: [
      "La génesis de los agujeros de gusano se remonta a 1916, justo después de la publicación de la Relatividad General.",
      "Karl Schwarzschild fue el primero en encontrar una solución exacta a las ecuaciones de Einstein, describiendo los agujeros negros.",
      "Poco después, el físico austriaco Ludwig Flamm revisó meticulosamente las matemáticas del trabajo de Schwarzschild.",
      "Flamm se percató de que la geometría del espacio-tiempo permitía una segunda solución oculta dentro de los números.",
      "Esta segunda solución sugería una estructura de conducto o 'túnel' que no colapsaba inmediatamente en un punto.",
      "En su momento, esta idea fue considerada una mera anomalía matemática sin aplicación en la realidad astrofísica.",
      "Tuvieron que pasar casi dos décadas para que la idea fuera retomada con seriedad en el ámbito académico.",
      "Durante ese tiempo, la física cuántica comenzó a desarrollarse rápidamente, buscando unificarse con la relatividad.",
      "Los físicos necesitaban herramientas matemáticas robustas para describir el universo tanto a nivel macro como microscópico.",
      "La idea de los túneles espaciales permaneció latente hasta que Einstein decidió investigar sus implicaciones directas."
    ]
  },
  {
    title: "La Historia de su Teoría (II)",
    text: [
      "En 1935, Albert Einstein y su colaborador Nathan Rosen publicaron un artículo que cambiaría la historia de la astrofísica.",
      "Su objetivo original no era proponer sistemas de transporte interestelar, sino resolver un problema de partículas elementales.",
      "Querían construir un modelo matemático del electrón que no dependiera de singularidades gravitacionales infinitas.",
      "Para lograrlo, utilizaron la geometría del túnel descubierta por Flamm, integrándola formalmente a la Relatividad General.",
      "Bautizaron formalmente a estas complejas topologías como 'Puentes de Einstein-Rosen'.",
      "Einstein y Rosen demostraron que estos puentes enlazaban dos regiones planas y separadas del universo de manera elegante.",
      "Posteriormente, en 1957, el físico teórico estadounidense John Archibald Wheeler popularizó enormemente el concepto.",
      "Wheeler introdujo la analogía del gusano masticando una manzana para crear un atajo de un extremo al otro.",
      "A partir de ese momento, el término 'agujero de gusano' se adoptó como el estándar en la comunidad científica y en la cultura popular.",
      "El trabajo de Wheeler y otros científicos elevó estas estructuras de curiosidades matemáticas a posibles realidades cósmicas."
    ]
  },
  {
    title: "Propiedades de los Agujeros de Gusano (I)",
    text: [
      "Físicamente, un agujero de gusano se caracteriza por propiedades extremas que desafían nuestra intuición.",
      "A diferencia de un túnel terrestre, las 'bocas' de un agujero de gusano no serían agujeros planos y bidimensionales.",
      "Serían estructuras esféricas flotando en el vacío del espacio, similares a la apariencia visual de un planeta oscuro.",
      "Si te acercaras a una de estas bocas, la gravedad deformaría la luz de las estrellas ubicadas al otro lado del túnel.",
      "Verías un efecto de lente gravitacional masivo, creando un anillo brillante de luz doblada alrededor del horizonte.",
      "El interior de la boca mostraría una imagen esférica distorsionada del sistema estelar al que está conectado.",
      "La garganta del túnel, la sección intermedia, posee una gravedad inmensa que tira de cualquier objeto hacia el centro.",
      "La longitud de esta garganta determina el tiempo subjetivo que le tomaría a un viajero cruzar al otro extremo.",
      "Matemáticamente, la garganta podría ser muy corta, permitiendo cruzar millones de años luz en solo un par de metros.",
      "La métrica del túnel es la que dicta las brutales presiones físicas a las que se sometería cualquier objeto en tránsito."
    ]
  },
  {
    title: "Propiedades de los Agujeros de Gusano (II)",
    text: [
      "Una de las propiedades más fascinantes de los puentes de Einstein-Rosen es su relación teórica con el tiempo.",
      "La teoría de la relatividad postula que el tiempo es flexible y se ve afectado tanto por la velocidad como por la gravedad.",
      "Si un extremo de un agujero de gusano estuviera sometido a una fuerte fuerza gravitatoria, el tiempo pasaría más lento allí.",
      "Mientras tanto, el otro extremo situado en un vacío profundo experimentaría un flujo temporal mucho más rápido.",
      "Esto convierte teóricamente al agujero de gusano en una máquina del tiempo funcional, conectando el pasado con el futuro.",
      "Sin embargo, los físicos creen que si se intentara utilizar para alterar el pasado, fuerzas cuánticas extremas lo destruirían.",
      "Otra propiedad crítica es el ruido gravitacional; el túnel actuaría como un conducto acústico de ondas gravitatorias.",
      "Cualquier perturbación en un extremo, como la explosión de una supernova, reverberaría a través de la garganta.",
      "La fragilidad topológica es inmensa: son estructuras propensas a cerrarse a la velocidad de la luz ante cualquier intrusión.",
      "Comprender estas propiedades ayuda a los científicos a diseñar modelos computacionales sobre la viabilidad del viaje interestelar."
    ]
  },
  {
    title: "¿Cómo Funciona un Agujero de Gusano? (I)",
    text: [
      "El funcionamiento mecánico de un agujero de gusano transitable depende de contrarrestar el aplastamiento gravitacional.",
      "La gravedad de la materia normal siempre es atractiva, lo que significa que el túnel tiende a colapsar sobre sí mismo.",
      "El físico Kip Thorne descubrió que para mantener la garganta abierta, se debe introducir un andamiaje antigravitatorio.",
      "La única forma de lograr esto según la física teórica es utilizando 'Materia Exótica' con energía negativa.",
      "La energía negativa crea una fuerza de repulsión gravitacional masiva, actuando en contraposición a la masa del puente.",
      "Al inyectar materia exótica en la garganta del túnel, sus paredes se empujarían hacia afuera manteniéndose estables.",
      "Sin esta materia repulsiva, la garganta colapsaría en fracciones de milisegundo ante la simple presencia de una nave.",
      "Incluso la energía del haz de luz de una linterna apuntada hacia la boca generaría suficiente gravedad para cerrar el puente.",
      "La materia exótica debe distribuirse en forma de anillo concéntrico alrededor del diámetro más estrecho de la garganta.",
      "Esta fina calibración termodinámica y gravitatoria es el núcleo funcional que permitiría un tránsito seguro entre las estrellas."
    ]
  },
  {
    title: "¿Cómo Funciona un Agujero de Gusano? (II)",
    text: [
      "Una vez estabilizado con materia exótica, el funcionamiento del túnel permitiría a un vehículo espacial iniciar el cruce.",
      "La nave entraría por el horizonte de la boca esférica, impulsada gradualmente por sus propios propulsores iónicos.",
      "A medida que avanzara, no percibiría una gran velocidad real, pero el tejido espacial alrededor de la nave se acortaría.",
      "Es importante destacar que el agujero de gusano no mueve la nave más rápido que la luz, simplemente hace el camino más corto.",
      "Dentro de la garganta, la tripulación estaría protegida por escudos deflactores contra las anomalías de la materia exótica.",
      "La nave no experimentaría aceleraciones bruscas, garantizando que los humanos a bordo sobrevivan a fuerzas G extremas.",
      "Al cruzar el punto medio exacto de la garganta, la repulsión de la materia exótica empujaría suavemente la nave hacia la salida.",
      "Al emerger por la segunda boca esférica, la nave se encontraría instantáneamente en otra galaxia o rincón del universo.",
      "Toda la maniobra consumiría cantidades titánicas de energía, comparables a las emitidas por una estrella tipo solar.",
      "Aunque mecánicamente impecable en papel, construir y operar un dispositivo así sigue siendo el santo grial de la física."
    ]
  },
  {
    title: "¿Qué Pasa si Caigo en un Agujero de Gusano? (I)",
    text: [
      "Si cayeras accidentalmente en un agujero de gusano no estabilizado (un puente original de Einstein-Rosen), el destino sería fatal.",
      "A medida que te acercas a la boca esférica, experimentarías intensas fuerzas de marea gravitacionales sobre tu cuerpo.",
      "La atracción en tus pies sería millones de veces más fuerte que en tu cabeza, estirándote como un fideo.",
      "Este brutal y destructivo fenómeno físico es conocido en la astrofísica formal como 'espaguetización'.",
      "Además, el puente colapsaría sobre ti a la velocidad de la luz antes de que pudieras llegar siquiera al punto medio.",
      "Te encontrarías atrapado en una singularidad gravitacional, siendo triturado a nivel subatómico por la presión infinita.",
      "La radiación acumulada en la entrada, generada por luz estelar atrapada, te incineraría con rayos gamma de alta intensidad.",
      "Por lo tanto, la caída libre en un agujero de gusano natural es equivalente a caer en un voraz agujero negro supermasivo.",
      "La supervivencia humana es estrictamente imposible sin la modificación artificial de las paredes del túnel.",
      "La exploración de estos fenómenos sin sondas automatizadas representaría el mayor riesgo en la historia de la astronáutica."
    ]
  },
  {
    title: "¿Qué Pasa si Caigo en un Agujero de Gusano? (II)",
    text: [
      "En contraste, si cayeras en un agujero de gusano transitable y artificialmente estabilizado, la experiencia sería maravillosa.",
      "Al cruzar el horizonte esférico, no sentirías ninguna fuerza de marea gravitacional destruyendo tu fisiología.",
      "Visualmente, verías las estrellas del cielo curvarse y distorsionarse en un espectacular anillo caleidoscópico de luz.",
      "Frente a ti, verías el resplandor directo de las constelaciones alienígenas que se encuentran en el destino final.",
      "Experimentarías una ingravidez total mientras flotas suavemente por la garganta repulsiva del túnel cósmico.",
      "Si volteas a mirar atrás, verías tu propio sistema solar comprimiéndose lentamente en una esfera luminosa distante.",
      "El viaje podría durar apenas unos minutos u horas subjetivas, a pesar de cruzar cientos de años luz de distancia real.",
      "Debido a los efectos de dilatación temporal nulos dentro de un puente bien diseñado, no envejecerías drásticamente.",
      "Emergerías en la nueva región estelar en perfecto estado físico, listo para explorar mundos totalmente desconocidos.",
      "Esta prometedora travesía segura es la razón por la que la humanidad invierte décadas teorizando sobre su construcción."
    ]
  },
  {
    title: "Últimas Teorías y Experimentos (I)",
    text: [
      "En la física moderna, las últimas teorías intentan conectar los agujeros de gusano con los cimientos de la mecánica cuántica.",
      "Una de las conjeturas más revolucionarias de la actualidad es la ecuación ER=EPR, formulada por Susskind y Maldacena.",
      "Esta teoría sugiere que los Puentes de Einstein-Rosen (ER) están conectados al entrelazamiento cuántico (EPR).",
      "Propone que dos partículas entrelazadas cuánticamente están unidas invisiblemente por un agujero de gusano microscópico.",
      "Esto resolvería la aparente contradicción de cómo las partículas se comunican instantáneamente sin violar la velocidad de la luz.",
      "A nivel macroscópico, algunos científicos investigan la materia oscura como una posible candidata natural de materia exótica.",
      "Los modelos matemáticos recientes también postulan la existencia de agujeros de gusano microscópicos que burbujean en el vacío.",
      "Esta 'espuma cuántica' teórica a nivel de Planck podría contener incontables túneles espaciotemporales fugaces.",
      "Los teóricos buscan la forma de inflar gravitacionalmente uno de estos túneles microscópicos hasta un tamaño transitable.",
      "Esta investigación vanguardista representa la frontera absoluta donde convergen la relatividad general y la gravedad cuántica."
    ]
  },
  {
    title: "Últimas Teorías y Experimentos (II)",
    text: [
      "A nivel experimental, los ingenieros informáticos han logrado simular túneles cósmicos utilizando computadoras cuánticas.",
      "En un hito histórico reciente, un equipo de científicos creó un holograma cuántico de un agujero de gusano en un procesador.",
      "Teletransportaron un qubit de información a través del modelo simulado, observando cómo las matemáticas predecían su paso.",
      "Aunque esto no creó una ruptura real en el espacio-tiempo físico, demostró que el modelo teórico funciona perfectamente en datos.",
      "Por otro lado, los telescopios espaciales buscan firmas observacionales que revelen agujeros de gusano naturales en el cosmos.",
      "Si un agujero de gusano conecta nuestro universo con otro más brillante, la luz filtrada podría verse como una anomalía lumínica.",
      "Algunos astrónomos rastrean destellos inusuales de microlentes gravitacionales que no coinciden con la presencia de masa ordinaria.",
      "Encontrar pruebas visuales indirectas requeriría una resolución telescópica cientos de veces superior al James Webb actual.",
      "Mientras tanto, los teóricos se esfuerzan por solucionar el problema de la energía negativa necesaria para construirlos.",
      "Se especula que aprovechar la energía cuántica del efecto Casimir podría ser el primer paso viable hacia su ingeniería."
    ]
  },
  {
    title: "La Paradoja Temporal",
    text: [
      "El estudio de los agujeros de gusano conlleva el enfrentamiento inevitable con las aterradoras paradojas temporales.",
      "Como mencionamos, acelerar una de las bocas del túnel a velocidades cercanas a la luz produciría dilatación temporal.",
      "Si luego reunieras ambas bocas, cruzar la garganta en una dirección te enviaría irremediablemente al futuro distante.",
      "Sin embargo, cruzar la garganta en la dirección opuesta te enviaría de vuelta en el tiempo hacia el pasado del universo.",
      "Esto abre la puerta a la temida 'Paradoja del Abuelo', donde un viajero podría evitar teóricamente su propio nacimiento.",
      "El físico Stephen Hawking propuso la 'Conjetura de Protección de la Cronología' para salvar al universo de este caos.",
      "Hawking argumentaba que las leyes fundamentales de la física siempre intervendrían para prevenir los viajes en el tiempo.",
      "Según sus cálculos, la retroalimentación de la radiación cuántica destruiría el puente justo en el instante en que se volviera una máquina del tiempo.",
      "La energía infinita se acumularía en el interior de la garganta, vaporizando las paredes repulsivas y causando su colapso total.",
      "Por tanto, los agujeros de gusano podrían ser estrictamente autopistas espaciales, prohibidas eternamente para los turistas del tiempo."
    ]
  },
  {
    title: "La Visión de Carl Sagan y 'Contacto' (I)",
    text: [
      "El matrimonio entre la ciencia formal y la cultura popular a menudo impulsa grandes descubrimientos en el mundo real.",
      "En 1985, el famoso astrónomo y divulgador científico Carl Sagan estaba escribiendo su magistral novela 'Contacto'.",
      "Sagan necesitaba un mecanismo realista y plausible para que su protagonista viajara a la estrella Vega rápidamente.",
      "Al principio, pensó en usar un agujero negro, pero pronto se dio cuenta de que la fuerza gravitatoria destruiría a cualquier viajero.",
      "Buscando absoluto rigor científico para su obra literaria, Sagan consultó a su íntimo amigo, el brillante físico teórico Kip Thorne.",
      "Thorne analizó detenidamente las ecuaciones de Einstein y le explicó que un agujero negro jamás funcionaría como puente seguro.",
      "Sin embargo, Thorne le sugirió usar un 'Agujero de Gusano Transitable', una idea poco desarrollada hasta ese momento.",
      "Sagan implementó la idea, pero le pidió a Thorne que elaborara la matemática necesaria para que fuera impecable.",
      "Este simple intercambio impulsó a Kip Thorne a revolucionar la astrofísica y formalizar la teoría de la 'Materia Exótica'.",
      "Gracias a una novela de ciencia ficción, se sentaron las bases matemáticas modernas para la ingeniería espaciotemporal."
    ]
  },
  {
    title: "La Visión de Carl Sagan y 'Contacto' (II)",
    text: [
      "En la novela y posterior adaptación cinematográfica de 'Contacto', se explora brillantemente la mecánica del túnel cósmico.",
      "La historia narra cómo la humanidad recibe intrincados planos alienígenas para construir una colosal máquina anular.",
      "La máquina no es una nave espacial tradicional, sino un dispositivo gigantesco capaz de generar un agujero de gusano artificial.",
      "Esta geometría espaciotemporal estable permite a la doctora Ellie Arroway cruzar veintiséis años luz de forma casi instantánea.",
      "La magistral visualización de los vórtices luminosos y el tránsito sin gravedad capturó perfectamente la teoría de Thorne.",
      "La influencia de Sagan y Thorne trascendió 'Contacto'; más tarde colaborarían espiritualmente para la película 'Interstellar'.",
      "El legado de Carl Sagan demostró que la imaginación literaria puede motivar a los físicos más brillantes del mundo.",
      "Aquel simple deseo de precisión técnica para un libro desencadenó una avalancha de nuevas investigaciones reales sobre astrofísica.",
      "Los agujeros de gusano dejaron de ser meros artefactos oscuros de la relatividad general y pasaron a ser una esperanza tangible.",
      "Hoy en día, las agencias espaciales continúan el análisis teórico soñando con el día en que la obra de Sagan se vuelva realidad."
    ]
  }
];

async function run() {
  const filePath = 'lib/courseData.js';
  let content = fs.readFileSync(filePath, 'utf8');
  const startIndex = content.indexOf('[');
  const jsonString = content.substring(startIndex).replace(/;\s*$/, '');
  let jsData = eval(jsonString);

  // Filtrar el curso original si existe
  jsData = jsData.filter(c => c.id !== 'agujeros_gusano_er');

  const newModules = wormhole15x15.map((data, idx) => {
    return {
      id: `wormhole_m${idx + 1}`,
      order: 4001 + idx,
      titleEn: `Wormhole Section ${idx + 1}`,
      titleEs: data.title,
      badge: "Spacetime Traveler",
      badgeEs: "Viajero Cuántico",
      badgeIcon: "/assets/badges/gusano_badge.png",
      color: "#00FFCC",
      icon: "/assets/badges/gusano_badge.png",
      contentEs: {
        sections: [
          {
            id: `wormhole_m${idx + 1}_sec`,
            title: data.title,
            text: data.text,
            image: `/assets/dashboard/agujeros_gusano_cover.png`,
            style: "highlight"
          }
        ]
      },
      quizEs: [
        {
          q: `¿Sobre qué trata el tema de ${data.title}?`,
          options: [
            "Sobre la mecánica cuántica avanzada",
            "Sobre la dilatación del tiempo en agujeros negros",
            "Sobre las propiedades de los agujeros de gusano",
            "Sobre la expansión del universo observable"
          ],
          a: 2
        }
      ]
    };
  });

  jsData.push(...newModules);

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync(filePath, header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Wormhole split into 15 modules successfully.");
}

run();
