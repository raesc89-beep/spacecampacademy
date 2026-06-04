const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'courseData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Check if already injected
if (content.includes('"galileo_m1"')) {
  console.log('⚠️  Galileo modules already exist, skipping.');
  process.exit(0);
}

const newModules = `
,
  {
    "id": "galileo_m1",
    "order": 9001,
    "titleEn": "The Telescope Revolution",
    "titleEs": "La Revolución del Telescopio",
    "badge": "Sky Watcher",
    "badgeEs": "Observador del Cielo",
    "badgeIcon": "/assets/galileo/galileo_m1.png",
    "color": "#7B9ED9",
    "icon": "/assets/galileo/galileo_m1.png",
    "contentEs": {
      "sections": [
        {
          "id": "galileo_m1_s1",
          "title": "La Revolución del Telescopio",
          "text": [
            "¡Bienvenido, explorador! Hoy vamos a conocer a uno de los científicos más valientes e inteligentes de la historia: Galileo Galilei. Nació en Italia en el año 1564, y desde muy pequeño le fascinaba preguntarse cómo funcionaba el universo. En su época, la gente creía que la Tierra era el centro de todo el cosmos, y que el Sol, las estrellas y los planetas giraban a su alrededor. Pero Galileo iba a cambiar todo eso para siempre.",
            "En el año 1609, Galileo escuchó que en Holanda un inventor había creado un instrumento óptico que hacía ver las cosas lejanas como si estuvieran cerca. Sin verlo, Galileo usó su genio matemático para construir su propio telescopio, ¡y lo mejoró hasta hacerlo tres veces más poderoso que el original! Fue el primero en apuntar este instrumento al cielo nocturno de manera sistemática y científica.",
            "Lo que Galileo vio cambió la historia de la humanidad. Observó que la Luna no era una esfera perfecta y lisa como todos creían, sino que tenía montañas, cráteres y valles, igual que la Tierra. ¡Esto fue una revolución total! Si la Luna era imperfecta y similar a la Tierra, entonces quizás nuestro planeta no era tan especial ni único como pensaban.",
            "Galileo también descubrió que la Vía Láctea, esa banda blanca que vemos en el cielo nocturno, estaba formada por millones y millones de estrellas individuales, tan juntas que desde la Tierra parecían una sola nube. Y lo más impresionante: descubrió cuatro lunas gigantes orbitando alrededor de Júpiter. Las llamó los satélites mediceos en honor a sus mecenas. ¡Esto demostraba que no todo en el universo giraba alrededor de la Tierra!",
            "El telescopio de Galileo era simple comparado con los nuestros actuales, pero su método científico era perfectamente moderno. Observaba, anotaba, medía y sacaba conclusiones basadas en evidencias reales. Hoy la NASA y todas las agencias espaciales del mundo usan exactamente ese mismo método. Galileo no solo inventó una forma de ver el universo: inventó la manera en que la ciencia funciona."
          ],
          "image": "/assets/galileo/galileo_m1.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué fue lo primero que Galileo observó en la Luna con su telescopio?",
        "options": ["Que era perfectamente lisa", "Que tenía montañas y cráteres", "Que era de queso", "Que tenía agua"],
        "a": 1
      },
      {
        "q": "¿Cuántas lunas descubrió Galileo alrededor de Júpiter?",
        "options": ["Dos", "Tres", "Cuatro", "Cinco"],
        "a": 2
      },
      {
        "q": "¿En qué año construyó Galileo su telescopio mejorado?",
        "options": ["1564", "1609", "1700", "1543"],
        "a": 1
      },
      {
        "q": "¿Qué descubrió Galileo sobre la Vía Láctea?",
        "options": ["Que era una nube de gas", "Que estaba formada por millones de estrellas", "Que era el camino al Sol", "Que era invisible"],
        "a": 1
      },
      {
        "q": "¿Cuál era el método de trabajo de Galileo?",
        "options": ["Fe y tradición", "Magia y astrología", "Observación, medición y evidencias", "Rumores y opiniones"],
        "a": 2
      }
    ]
  },
  {
    "id": "galileo_m2",
    "order": 9002,
    "titleEn": "Galileo and the Moons of Jupiter",
    "titleEs": "Galileo y las Lunas de Júpiter",
    "badge": "Moon Hunter",
    "badgeEs": "Cazador de Lunas",
    "badgeIcon": "/assets/galileo/galileo_m2.png",
    "color": "#C87941",
    "icon": "/assets/galileo/galileo_m2.png",
    "contentEs": {
      "sections": [
        {
          "id": "galileo_m2_s1",
          "title": "Galileo y las Lunas de Júpiter",
          "text": [
            "En la fría noche del 7 de enero de 1610, Galileo apuntó su telescopio hacia Júpiter, el planeta más grande de nuestro sistema solar. Cerca del enorme planeta vio tres estrellitas brillantes que no había notado antes. Al principio pensó que eran estrellas normales de fondo. Pero algo le llamó la atención: estaban demasiado cerca de Júpiter y en una línea perfecta.",
            "La noche siguiente, Galileo volvió a mirar. ¡Las estrellitas habían cambiado de posición! Esto era imposible si fueran estrellas de fondo, que parecen fijas. Con la curiosidad a todo vapor, siguió observando noche tras noche. Una semana después encontró una cuarta estrellita. Galileo llegó a la conclusión más revolucionaria de su vida: estas no eran estrellas, ¡eran lunas orbitando alrededor de Júpiter!",
            "Este descubrimiento fue un golpe demoledor para la idea de que todo giraba alrededor de la Tierra. Si Júpiter tenía sus propias lunas girando a su alrededor, entonces la Tierra no podía ser el centro de todos los movimientos del universo. El modelo copernicano, que decía que los planetas giraban alrededor del Sol, comenzaba a tener mucho más sentido.",
            "Galileo llamó a estas lunas los 'Astros Mediceos' en honor al Duque de Medici, su mecenas en Florencia. Hoy las conocemos como las lunas galileanas: Io, Europa, Ganímedes y Calisto. Son mundos fascinantes. Europa podría tener un océano de agua líquida bajo su superficie helada, ¡y los científicos creen que podría albergar vida! La NASA ha enviado la misión Europa Clipper para explorarla.",
            "Gracias a este descubrimiento, Galileo publicó su famoso libro 'Sidereus Nuncius', el Mensajero Sideral, que conmocionó a toda Europa. Los astrónomos de toda la época trataron de repetir sus observaciones, y muchos confirmaron lo que había visto. Galileo demostró que el universo era mucho más complejo y maravilloso de lo que la humanidad había imaginado."
          ],
          "image": "/assets/galileo/galileo_m2.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuándo descubrió Galileo las lunas de Júpiter?",
        "options": ["Diciembre de 1642", "Enero de 1610", "Marzo de 1543", "Febrero de 1700"],
        "a": 1
      },
      {
        "q": "¿Cuál de estas es una luna galileana de Júpiter?",
        "options": ["Titán", "Fobos", "Europa", "Tritón"],
        "a": 2
      },
      {
        "q": "¿Qué hacía Galileo cada noche para confirmar su hallazgo?",
        "options": ["Rezaba", "Volvía a observar y registrar posiciones", "Preguntaba a la iglesia", "Dormía"],
        "a": 1
      },
      {
        "q": "¿Qué libro publicó Galileo sobre sus descubrimientos?",
        "options": ["El Diálogo de los Mundos", "Sidereus Nuncius", "De Revolutionibus", "Principia"],
        "a": 1
      },
      {
        "q": "¿Por qué era importante que hubiera lunas orbitando Júpiter?",
        "options": ["Porque eran bonitas", "Porque demostraba que no todo giraba alrededor de la Tierra", "Porque eran más grandes que la Luna", "Porque tenían montañas"],
        "a": 1
      }
    ]
  },
  {
    "id": "galileo_m3",
    "order": 9003,
    "titleEn": "Galileo vs. The Church",
    "titleEs": "Galileo contra la Inquisición",
    "badge": "Brave Scientist",
    "badgeEs": "Científico Valiente",
    "badgeIcon": "/assets/galileo/galileo_m3.png",
    "color": "#9B59B6",
    "icon": "/assets/galileo/galileo_m3.png",
    "contentEs": {
      "sections": [
        {
          "id": "galileo_m3_s1",
          "title": "Galileo contra la Inquisición",
          "text": [
            "Imagina que descubres algo increíble y verdadero sobre el universo, pero las personas más poderosas de tu época te amenazan con castigarte si lo dices en voz alta. Eso fue exactamente lo que le ocurrió a Galileo Galilei. Sus descubrimientos con el telescopio lo convencieron de que Copérnico tenía razón: la Tierra y los planetas giraban alrededor del Sol, no al revés.",
            "Galileo empezó a defender públicamente el modelo heliocéntrico, y esto puso muy nervioso a la Iglesia Católica. En 1616, la Inquisición le advirtió formalmente que no podía enseñar ni defender la idea de que la Tierra se movía alrededor del Sol. Galileo guardó silencio durante años, pero no pudo dejar de pensar y escribir.",
            "En 1632 publicó su obra más famosa: el 'Diálogo sobre los dos máximos sistemas del mundo'. Era un libro escrito como conversación entre tres personajes que debatían el modelo ptolemaico y el copernicano. Aunque intentó parecer neutral, era obvio que defendía que la Tierra giraba alrededor del Sol. El Papa Urbano VIII se sintió ofendido y convocó a Galileo ante la Inquisición.",
            "En 1633, ya anciano y con problemas de salud, Galileo fue llevado a Roma para ser juzgado. Bajo amenaza de tortura, se vio obligado a arrodillarse y retractarse públicamente de sus ideas científicas. Según una famosa leyenda, después de su retractación murmuró: 'Eppur si muove', que significa 'Y sin embargo, se mueve'. No hay prueba histórica de que lo dijo en voz alta, pero captura perfectamente su espíritu.",
            "Galileo fue condenado a arresto domiciliario de por vida, y murió en 1642 sin poder salir de su casa. Pero su ciencia era verdadera, e imparable. En 1992, casi 360 años después, el Papa Juan Pablo II reconoció oficialmente que la Iglesia había cometido un error al condenar a Galileo. Su historia nos enseña que la verdad científica siempre termina triunfando, aunque lleve siglos."
          ],
          "image": "/assets/galileo/galileo_m3.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué decía el modelo heliocéntrico que defendía Galileo?",
        "options": ["La Tierra es el centro del universo", "El Sol es el centro del sistema solar", "La Luna rodea al Sol", "Todo está quieto en el espacio"],
        "a": 1
      },
      {
        "q": "¿Qué libro publicó Galileo en 1632?",
        "options": ["Sidereus Nuncius", "Diálogo sobre los dos máximos sistemas del mundo", "Principia Mathematica", "El origen de las especies"],
        "a": 1
      },
      {
        "q": "¿Qué le ocurrió a Galileo en el juicio de 1633?",
        "options": ["Lo nombraron cardenal", "Lo enviaron al exilio en América", "Fue condenado a arresto domiciliario", "Lo ejecutaron"],
        "a": 2
      },
      {
        "q": "¿Cuándo reconoció la Iglesia que había cometido un error con Galileo?",
        "options": ["En 1700", "En 1850", "En 1992", "Nunca lo reconoció"],
        "a": 2
      },
      {
        "q": "¿Qué frase se le atribuye a Galileo después de su retractación?",
        "options": ["La ciencia es peligrosa", "Eppur si muove", "Dios manda", "El Sol no existe"],
        "a": 1
      }
    ]
  },
  {
    "id": "galileo_m4",
    "order": 9004,
    "titleEn": "The Laws of Motion",
    "titleEs": "Las Leyes del Movimiento",
    "badge": "Physics Pioneer",
    "badgeEs": "Pionero de la Física",
    "badgeIcon": "/assets/galileo/galileo_m4.png",
    "color": "#2ECC71",
    "icon": "/assets/galileo/galileo_m4.png",
    "contentEs": {
      "sections": [
        {
          "id": "galileo_m4_s1",
          "title": "Las Leyes del Movimiento",
          "text": [
            "Galileo no solo fue astrónomo, también fue el padre de la física moderna. Antes de él, la gente creía las ideas de Aristóteles, que decía que los objetos más pesados caían más rápido que los más ligeros. Parecía lógico, ¿verdad? Pero Galileo sospechaba que Aristóteles estaba equivocado, y diseñó experimentos para comprobarlo.",
            "Según una famosa historia, Galileo subió a lo alto de la Torre de Pisa y soltó simultáneamente dos bolas de cañón de diferente peso. Ambas llegaron al suelo al mismo tiempo. ¡Aristóteles estaba equivocado! Aunque los historiadores dudan de que este experimento realmente ocurrió exactamente así, Galileo sí hizo experimentos rigurosos con planos inclinados que demostraron lo mismo.",
            "Galileo usó planos inclinados con diferentes ángulos para estudiar cómo aceleraban los objetos al caer. Descubrió que la aceleración era constante y que no dependía del peso del objeto, sino de la gravedad. Midió distancias y tiempos con gran precisión. Estos experimentos lo llevaron a formular la ley de la caída libre, un pilar fundamental de la física.",
            "También estudió el movimiento de los proyectiles y demostró que la trayectoria de una bala de cañón era una parábola matemática perfecta. Y estudió el péndulo: según la leyenda, de joven observó cómo oscilaba una lámpara en la catedral de Pisa y descubrió que el tiempo de cada oscilación era constante sin importar qué tan amplio fuera el movimiento.",
            "Isaac Newton, quien nació el mismo año en que murió Galileo (1642), construyó sus famosas tres leyes del movimiento sobre la base que Galileo había puesto. Newton siempre reconoció que estaba parado sobre los hombros de gigantes, y Galileo era uno de ellos. Sin Galileo, no habría Newton, y sin Newton, no tendríamos cohetes ni naves espaciales. ¡La física de los videojuegos modernos también se basa en estos principios!"
          ],
          "image": "/assets/galileo/galileo_m4.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué demostró Galileo sobre la caída de los objetos?",
        "options": ["Los pesados caen más rápido", "Los ligeros caen más rápido", "Todos caen a la misma velocidad", "Ninguno cae"],
        "a": 2
      },
      {
        "q": "¿Qué forma tiene la trayectoria de un proyectil?",
        "options": ["Un círculo", "Una línea recta", "Una parábola", "Un zigzag"],
        "a": 2
      },
      {
        "q": "¿Quién construyó sus leyes sobre el trabajo de Galileo?",
        "options": ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Charles Darwin"],
        "a": 1
      },
      {
        "q": "¿Qué descubrió Galileo al estudiar el péndulo?",
        "options": ["Que oscilaba sin parar", "Que el tiempo de oscilación era constante", "Que dependía del peso", "Que era imán"],
        "a": 1
      },
      {
        "q": "¿Con qué herramienta estudió Galileo la aceleración de los cuerpos?",
        "options": ["Telescopio", "Planos inclinados", "Microscopio", "Brújula"],
        "a": 1
      }
    ]
  },
  {
    "id": "galileo_m5",
    "order": 9005,
    "titleEn": "Galileo's Legacy in Space",
    "titleEs": "El Legado de Galileo en el Espacio",
    "badge": "Legacy Star",
    "badgeEs": "Estrella de Legado",
    "badgeIcon": "/assets/galileo/galileo_m5.png",
    "color": "#E67E22",
    "icon": "/assets/galileo/galileo_m5.png",
    "contentEs": {
      "sections": [
        {
          "id": "galileo_m5_s1",
          "title": "El Legado de Galileo en el Espacio",
          "text": [
            "Cuatro siglos después de sus descubrimientos, el nombre de Galileo sigue resonando en las misiones espaciales más importantes de la humanidad. La NASA nombró la sonda Galileo en su honor: fue una nave espacial que viajó a Júpiter y estuvo en órbita alrededor del planeta gigante desde 1995 hasta 2003. Envió miles de imágenes increíbles de las lunas galileanas y confirmó que Europa podría tener un océano bajo su superficie helada.",
            "La misión Galileo de la NASA también soltó una pequeña sonda atmosférica que descendió directamente hacia Júpiter el 7 de diciembre de 1995. Fue la primera vez en la historia que un artefacto humano entró en la atmósfera de un planeta gigante gaseoso. La sonda resistió presiones increíbles y temperaturas extremas durante 57 minutos antes de ser destruida, enviando datos valiosísimos.",
            "La Unión Europea también honró a Galileo con su propio sistema de navegación satelital global llamado Galileo, que compite con el GPS de Estados Unidos. Este sistema de constelación de satélites es más preciso que el GPS y puede usarse tanto para navegación civil como para aplicaciones científicas y de emergencia.",
            "Las lunas que Galileo descubrió siguen siendo destino de misiones espaciales actuales. La misión JUICE (Jupiter Icy Moons Explorer) de la Agencia Espacial Europea fue lanzada en 2023 para estudiar Ganímedes, Calisto y Europa en detalle. La NASA también tiene la misión Europa Clipper, lanzada en 2024, dedicada exclusivamente a buscar signos de habitabilidad en Europa.",
            "El método científico de Galileo, basado en la observación cuidadosa, la experimentación y la evidencia, es el mismo que usan hoy todos los científicos del mundo. Cada vez que un cohete despega, cada vez que una sonda llega a otro planeta, y cada vez que un astrónomo mira a través de un telescopio, están siguiendo el camino que Galileo abrió hace 400 años. Tú, explorador, eres parte de esa historia."
          ],
          "image": "/assets/galileo/galileo_m5.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué estudió la sonda espacial Galileo de la NASA?",
        "options": ["Marte y sus lunas", "Júpiter y sus lunas galileanas", "El Sol", "Saturno y sus anillos"],
        "a": 1
      },
      {
        "q": "¿En qué año entró la sonda Galileo en la atmósfera de Júpiter?",
        "options": ["1989", "1995", "2003", "2010"],
        "a": 1
      },
      {
        "q": "¿Qué es el sistema Galileo de Europa?",
        "options": ["Un telescopio espacial", "Un sistema de navegación satelital", "Una misión a Marte", "Un acelerador de partículas"],
        "a": 1
      },
      {
        "q": "¿Qué misión de la NASA fue lanzada para estudiar Europa?",
        "options": ["Voyager", "Cassini", "Europa Clipper", "New Horizons"],
        "a": 2
      },
      {
        "q": "¿Cuál es la principal herencia de Galileo para la ciencia moderna?",
        "options": ["El telescopio como objeto", "El método científico basado en evidencias", "Los mapas celestes", "La astrología"],
        "a": 1
      }
    ]
  },
  {
    "id": "faraday_m1",
    "order": 9101,
    "titleEn": "The Boy Who Became a Scientist",
    "titleEs": "El Niño que se Convirtió en Científico",
    "badge": "Self-Made Scholar",
    "badgeEs": "Sabio por Méritos Propios",
    "badgeIcon": "/assets/faraday/faraday_m1.png",
    "color": "#3498DB",
    "icon": "/assets/faraday/faraday_m1.png",
    "contentEs": {
      "sections": [
        {
          "id": "faraday_m1_s1",
          "title": "El Niño que se Convirtió en Científico",
          "text": [
            "¡Hola, explorador del conocimiento! Hoy conoceremos a Michael Faraday, uno de los científicos más grandes de la historia, y una de las historias de superación más inspiradoras que existen. Faraday nació en 1791 en una familia muy pobre en los suburbios de Londres, Inglaterra. Su padre era herrero y estaba enfermo, así que Michael tuvo que abandonar la escuela cuando era muy pequeño. Apenas sabía leer, escribir y hacer sumas básicas.",
            "A los 13 años, Michael empezó a trabajar como aprendiz en una librería para ayudar a su familia. Pero en lugar de solo encuadernar libros, los leía con una sed enorme de conocimiento. Leía todo lo que caía en sus manos: ciencia, filosofía, historia. Se fascinó especialmente con un libro llamado 'Conversaciones sobre Química' escrito por Jane Marcet. Ahí descubrió que la electricidad era algo misterioso e impresionante.",
            "Un cliente generoso le regaló entradas para asistir a las famosas conferencias del científico Humphry Davy en la Royal Institution de Londres. Faraday tomó notas detalladas de cada conferencia, las encuadernó cuidadosamente con sus habilidades de librero, y le envió el cuaderno a Davy como solicitud de trabajo. Davy quedó tan impresionado que lo contrató como asistente en 1813.",
            "Al principio Faraday hacía tareas humildes: limpiaba instrumentos, preparaba experimentos, ordenaba el laboratorio. Pero observaba todo con una mente brillante. Viajó por Europa con Davy y conoció a los mejores científicos de su época, incluyendo a André-Marie Ampère y Alessandro Volta. Aprendía de cada conversación, de cada experimento, de cada fracaso.",
            "Faraday nunca tuvo una educación formal universitaria, y a veces los científicos de la elite lo menospreciaban por eso. Pero él respondía con experimentos brillantes y descubrimientos revolucionarios. Su historia nos enseña que la curiosidad, el trabajo duro y la pasión por aprender son mucho más importantes que los títulos o el dinero. Faraday es el símbolo perfecto de que la ciencia pertenece a todos."
          ],
          "image": "/assets/faraday/faraday_m1.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año nació Michael Faraday?",
        "options": ["1750", "1791", "1820", "1867"],
        "a": 1
      },
      {
        "q": "¿En qué trabajó Faraday desde los 13 años?",
        "options": ["En una mina", "En una librería", "En un barco", "En una farmacia"],
        "a": 1
      },
      {
        "q": "¿Quién contrató a Faraday como asistente?",
        "options": ["Isaac Newton", "Charles Darwin", "Humphry Davy", "James Watt"],
        "a": 2
      },
      {
        "q": "¿Qué libro inspiró a Faraday a estudiar la electricidad?",
        "options": ["Principia Mathematica", "Conversaciones sobre Química", "El Capital", "La Biblia"],
        "a": 1
      },
      {
        "q": "¿Qué demuestra la historia de Faraday?",
        "options": ["Que solo los ricos pueden ser científicos", "Que la universidad es todo", "Que la curiosidad y el trabajo superan la falta de recursos", "Que la ciencia es aburrida"],
        "a": 2
      }
    ]
  },
  {
    "id": "faraday_m2",
    "order": 9102,
    "titleEn": "Electromagnetic Induction",
    "titleEs": "La Inducción Electromagnética",
    "badge": "Electric Pioneer",
    "badgeEs": "Pionero Eléctrico",
    "badgeIcon": "/assets/faraday/faraday_m2.png",
    "color": "#F39C12",
    "icon": "/assets/faraday/faraday_m2.png",
    "contentEs": {
      "sections": [
        {
          "id": "faraday_m2_s1",
          "title": "La Inducción Electromagnética",
          "text": [
            "El 29 de agosto de 1831 fue uno de los días más importantes en la historia de la tecnología moderna. Ese día, Michael Faraday realizó el experimento que cambiaría al mundo para siempre. Enrolló dos bobinas de alambre alrededor de un anillo de hierro. Una bobina estaba conectada a una batería, y la otra a un galvanómetro, un instrumento que detecta corrientes eléctricas.",
            "Cuando Faraday conectó la batería a la primera bobina, el galvanómetro de la segunda bobina dio un pequeño salto: ¡detectó corriente! Pero lo más asombroso fue que cuando desconectó la batería, el galvanómetro saltó de nuevo, ¡pero en dirección opuesta! Sin que hubiera un contacto físico entre los dos circuitos, la energía había pasado de uno al otro.",
            "Faraday había descubierto la inducción electromagnética: un campo magnético que cambia puede generar una corriente eléctrica. Este es el principio que hace funcionar todos los generadores eléctricos del mundo. Cuando una planta hidroeléctrica mueve turbinas con el agua de un río, cuando un molino de viento gira con el aire, cuando una central nuclear produce calor... en todos los casos, lo que finalmente genera la electricidad es una variación de campo magnético, exactamente como descubrió Faraday.",
            "Ese mismo año, Faraday construyó el primer motor eléctrico primitivo y el primer generador eléctrico. El generador que inventó, al que llamó 'disco de Faraday', fue el primer dispositivo capaz de convertir energía mecánica en energía eléctrica de manera continua. Era simple y rudimentario, pero el principio que usaba es exactamente el mismo que usan las centrales eléctricas hoy.",
            "El físico matemático James Clerk Maxwell tomó los descubrimientos de Faraday y los expresó en ecuaciones matemáticas elegantes. Las ecuaciones de Maxwell son la base de todo el electromagnetismo moderno, incluyendo la radio, las microondas, la luz visible y los rayos X. Todo comenzó con ese pequeño salto del galvanómetro en 1831. La electricidad que llega a tu casa cada día es el regalo de Faraday al mundo."
          ],
          "image": "/assets/faraday/faraday_m2.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año descubrió Faraday la inducción electromagnética?",
        "options": ["1820", "1831", "1850", "1800"],
        "a": 1
      },
      {
        "q": "¿Qué es la inducción electromagnética?",
        "options": ["Generar luz con el Sol", "Generar corriente eléctrica con un campo magnético cambiante", "Crear imanes con electricidad", "Separar moléculas con calor"],
        "a": 1
      },
      {
        "q": "¿Qué inventó Faraday ese mismo año además del principio de inducción?",
        "options": ["El televisor y el radio", "El motor eléctrico y el generador", "El teléfono y el telegráfo", "La bombilla y el capacitor"],
        "a": 1
      },
      {
        "q": "¿Quién convirtió las ideas de Faraday en ecuaciones matemáticas?",
        "options": ["Albert Einstein", "Isaac Newton", "James Clerk Maxwell", "Heinrich Hertz"],
        "a": 2
      },
      {
        "q": "¿Qué principio usan las plantas eléctricas modernas?",
        "options": ["La gravedad de Newton", "La inducción electromagnética de Faraday", "La relatividad de Einstein", "La mecánica cuántica de Bohr"],
        "a": 1
      }
    ]
  },
  {
    "id": "faraday_m3",
    "order": 9103,
    "titleEn": "The Faraday Cage",
    "titleEs": "La Jaula de Faraday",
    "badge": "Shield Master",
    "badgeEs": "Maestro del Escudo",
    "badgeIcon": "/assets/faraday/faraday_m3.png",
    "color": "#1ABC9C",
    "icon": "/assets/faraday/faraday_m3.png",
    "contentEs": {
      "sections": [
        {
          "id": "faraday_m3_s1",
          "title": "La Jaula de Faraday",
          "text": [
            "En 1836, Michael Faraday realizó un experimento espectacular que aún se usa para demostrar uno de los principios más sorprendentes de la electricidad. Construyó una habitación completamente cubierta de malla metálica conductora, se metió dentro, y pidió a sus asistentes que dispararan enormes descargas de electricidad contra las paredes externas. Faraday salió completamente ileso.",
            "¿Por qué? Porque los conductores eléctricos, como el metal, redistribuyen las cargas eléctricas en su superficie externa cuando reciben una carga. El interior queda perfectamente protegido. Esta estructura se conoce hoy como la Jaula de Faraday, y es uno de los principios más útiles de la ingeniería eléctrica moderna.",
            "Las aplicaciones son fascinantes. Los microondas de cocina son jaulas de Faraday: las ondas electromagnéticas rebotan dentro para cocinar tu comida, pero no escapan al exterior para afectarte. Los automóviles actúan como jaulas de Faraday durante una tormenta eléctrica: si un rayo golpea el auto, la corriente viaja por la carrocería metálica hacia la tierra sin pasar por los pasajeros.",
            "En las telecomunicaciones y la electrónica, las jaulas de Faraday se usan para aislar circuitos sensibles de interferencias electromagnéticas externas. Los servidores de datos críticos, los equipos médicos de precisión y los laboratorios de investigación de alta sensibilidad están blindados con materiales que funcionan como jaulas de Faraday. Incluso los trajes especiales de los técnicos de alta tensión funcionan con este principio.",
            "En el espacio exterior, las naves espaciales deben proteger su electrónica de la radiación electromagnética intensa del Sol y de los rayos cósmicos. Los diseñadores de naves espaciales usan versiones avanzadas del principio de Faraday para proteger los sistemas críticos. Sin la Jaula de Faraday, muchos de nuestros dispositivos tecnológicos modernos serían vulnerables a interferencias y fallos."
          ],
          "image": "/assets/faraday/faraday_m3.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año inventó Faraday el principio de la jaula de Faraday?",
        "options": ["1831", "1836", "1850", "1820"],
        "a": 1
      },
      {
        "q": "¿Qué hace una jaula de Faraday?",
        "options": ["Atrae la electricidad al interior", "Protege el interior de campos eléctricos externos", "Genera electricidad", "Almacena calor"],
        "a": 1
      },
      {
        "q": "¿Cuál de estos es un ejemplo de jaula de Faraday?",
        "options": ["Una ventana de cristal", "Un microondas", "Una piscina", "Una linterna"],
        "a": 1
      },
      {
        "q": "¿Por qué es seguro estar dentro de un auto durante un rayo?",
        "options": ["Los neumáticos aíslan", "La carrocería metálica actúa como jaula de Faraday", "El vidrio protege", "El motor absorbe el rayo"],
        "a": 1
      },
      {
        "q": "¿Para qué usan este principio las naves espaciales?",
        "options": ["Para volar más rápido", "Para proteger la electrónica de la radiación espacial", "Para comunicarse con la Tierra", "Para aterrizar suavemente"],
        "a": 1
      }
    ]
  },
  {
    "id": "faraday_m4",
    "order": 9104,
    "titleEn": "Electrolysis and Chemistry",
    "titleEs": "La Electrolisis y la Química",
    "badge": "Molecule Breaker",
    "badgeEs": "Rompedor de Moléculas",
    "badgeIcon": "/assets/faraday/faraday_m4.png",
    "color": "#E74C3C",
    "icon": "/assets/faraday/faraday_m4.png",
    "contentEs": {
      "sections": [
        {
          "id": "faraday_m4_s1",
          "title": "La Electrolisis y la Química",
          "text": [
            "Faraday no solo fue revolucionario en física, también hizo contribuciones fundamentales a la química. Una de las más importantes fue su trabajo sobre la electrolisis, el proceso de usar electricidad para descomponer sustancias químicas en sus componentes básicos. En 1833, Faraday formuló las leyes de la electrolisis, que llevan su nombre hasta hoy.",
            "La electrolisis funciona así: cuando metes dos electrodos metálicos en una solución líquida y conectas una corriente eléctrica, las moléculas del líquido se descomponen y sus átomos se depositan en los electrodos. Faraday descubrió que la cantidad de sustancia que se deposita es directamente proporcional a la cantidad de electricidad que pasa. Esto era ciencia exacta y medible, no magia.",
            "Las aplicaciones de la electrolisis son enormes. La industria del aluminio la usa para extraer aluminio puro del mineral bauxita: sin electrolisis, no tendríamos envases de aluminio, aviones o cohetes. La industria del cloro y del sodio también depende de ella. En joyería, la electrolisis se usa para cubrir metales baratos con capas perfectas de oro o plata.",
            "En la actualidad, la electrolisis del agua es clave para producir hidrógeno limpio, el combustible del futuro. Cuando pasas electricidad por el agua, se separa en hidrógeno y oxígeno. Si esa electricidad viene de paneles solares o molinos de viento, obtienes hidrógeno completamente limpio que puede usarse para propulsar cohetes, aviones o automóviles sin emitir contaminación.",
            "La NASA ya usa hidrógeno líquido como combustible de cohetes, como en los motores del Shuttle y del cohete SLS. Las agencias espaciales están investigando cómo producir hidrógeno en la Luna o en Marte usando electrolisis con agua lunar o marciana. Una vez más, un principio descubierto por Faraday en su laboratorio londinense hace casi 200 años sigue guiando la exploración del universo."
          ],
          "image": "/assets/faraday/faraday_m4.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué es la electrolisis?",
        "options": ["Usar calor para fundir metales", "Usar electricidad para descomponer sustancias", "Usar magnetismo para mover objetos", "Usar luz para crear energía"],
        "a": 1
      },
      {
        "q": "¿En qué industria es esencial la electrolisis para producir aluminio?",
        "options": ["Industria alimenticia", "Industria aeroespacial y de envases", "Industria textil", "Industria farmacéutica"],
        "a": 1
      },
      {
        "q": "¿Qué produce la electrolisis del agua?",
        "options": ["Ozono y nitrógeno", "Hidrógeno y oxígeno", "Helio y argón", "Cloro y sodio"],
        "a": 1
      },
      {
        "q": "¿Qué tipo de combustible usa la NASA en cohetes que se basa en Faraday?",
        "options": ["Gasolina líquida", "Hidrógeno líquido", "Metano comprimido", "Propano"],
        "a": 1
      },
      {
        "q": "¿En qué año formuló Faraday sus leyes de la electrolisis?",
        "options": ["1820", "1831", "1833", "1845"],
        "a": 2
      }
    ]
  },
  {
    "id": "faraday_m5",
    "order": 9105,
    "titleEn": "Faraday's Legacy",
    "titleEs": "El Legado de Faraday",
    "badge": "Electricity Champion",
    "badgeEs": "Campeón de la Electricidad",
    "badgeIcon": "/assets/faraday/faraday_m5.png",
    "color": "#8E44AD",
    "icon": "/assets/faraday/faraday_m5.png",
    "contentEs": {
      "sections": [
        {
          "id": "faraday_m5_s1",
          "title": "El Legado de Faraday",
          "text": [
            "Michael Faraday murió en 1867, pero su legado es tan enorme que resulta difícil imaginarse el mundo moderno sin él. Cuando enciendes la luz, cuando cargas tu teléfono, cuando ves televisión, cuando viajas en un tren eléctrico o vuelas en un avión... todo eso existe gracias, en gran parte, a los descubrimientos de Faraday sobre el electromagnetismo.",
            "Faraday fue también un comunicador científico extraordinario. Sus 'Conferencias de Navidad' en la Royal Institution de Londres, que comenzó en 1825 y se dirigen especialmente a niños y jóvenes, siguen realizándose hoy, casi 200 años después. Su conferencia más famosa, 'La Historia Química de una Vela', fue publicada como libro y sigue siendo uno de los mejores ejemplos de divulgación científica de la historia.",
            "Albert Einstein tenía un retrato de Faraday colgado en su estudio, junto a los de Isaac Newton y James Clerk Maxwell. Einstein consideraba a Faraday uno de los mayores físicos de la historia. La unidad de capacitancia eléctrica del Sistema Internacional se llama faradio (F) en su honor. La constante de Faraday, usada en electroquímica, también lleva su nombre.",
            "En el siglo XXI, los principios de Faraday son la base de tecnologías de vanguardia. Los motores de los autos eléctricos como los Tesla funcionan con inducción electromagnética. Los generadores de energía renovable, los transformadores de corriente alterna, los escáneres de resonancia magnética usados en hospitales, y los sistemas de comunicación inalámbrica todos se basan en su trabajo.",
            "Faraday demostró que la ciencia no requiere de privilegios ni de riqueza, sino de curiosidad, dedicación y honestidad intelectual. Siendo el hijo de un herrero pobre, sin educación formal, se convirtió en el científico experimental más importante del siglo XIX. Su vida es una invitación a todos los exploradores como tú: la curiosidad es el cohete que lleva a cualquier persona, sin importar su origen, hasta los límites del universo."
          ],
          "image": "/assets/faraday/faraday_m5.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año murió Michael Faraday?",
        "options": ["1831", "1850", "1867", "1900"],
        "a": 2
      },
      {
        "q": "¿Cómo se llama la unidad de capacitancia eléctrica?",
        "options": ["Newton", "Ampere", "Faradio", "Voltio"],
        "a": 2
      },
      {
        "q": "¿Quién tenía un retrato de Faraday en su estudio?",
        "options": ["Thomas Edison", "Albert Einstein", "Nikola Tesla", "Marie Curie"],
        "a": 1
      },
      {
        "q": "¿Qué tecnología moderna usa inducción electromagnética de Faraday?",
        "options": ["Las computadoras cuánticas", "Los motores de autos eléctricos", "Los paneles solares", "Las baterías de litio"],
        "a": 1
      },
      {
        "q": "¿Cuál es la lección más importante de la vida de Faraday?",
        "options": ["La riqueza es clave para la ciencia", "La curiosidad y la dedicación superan los privilegios", "Solo los universitarios pueden descubrir cosas", "La ciencia es para genios"],
        "a": 1
      }
    ]
  },
  {
    "id": "davinci_m1",
    "order": 9201,
    "titleEn": "The Universal Genius",
    "titleEs": "El Genio Universal",
    "badge": "Renaissance Mind",
    "badgeEs": "Mente del Renacimiento",
    "badgeIcon": "/assets/davinci/davinci_m1.png",
    "color": "#D4A843",
    "icon": "/assets/davinci/davinci_m1.png",
    "contentEs": {
      "sections": [
        {
          "id": "davinci_m1_s1",
          "title": "El Genio Universal",
          "text": [
            "¡Saludos, explorador! Hoy conoceremos a uno de los seres humanos más extraordinarios que jamás han existido: Leonardo da Vinci. Nació el 15 de abril de 1452 en Vinci, un pequeño pueblo de la Toscana italiana, hijo ilegítimo de un notario llamado Ser Piero y una campesina llamada Caterina. Aunque su origen humilde le cerró algunas puertas, su mente brillante no conoció límites.",
            "Leonardo es famoso en todo el mundo como el pintor de la Mona Lisa y La Última Cena, dos de las obras de arte más conocidas de la historia. Pero reducir a Leonardo a solo un pintor sería como decir que el océano es solo agua: verdadero pero enormemente incompleto. Leonardo fue simultáneamente pintor, escultor, arquitecto, músico, matemático, ingeniero, inventor, anatomista, geólogo, botánico y escritor.",
            "Sus cuadernos, conocidos como los Códices, son uno de los tesoros más preciados de la humanidad. Se estima que escribió más de 13,000 páginas de notas y dibujos, aunque muchas se perdieron con el tiempo. En esas páginas diseñó máquinas voladoras, tanques de guerra, máquinas de vapor, robots mecánicos y muchos otros inventos, todos siglos antes de que la tecnología pudiera hacerlos realidad.",
            "Lo que hacía a Leonardo verdaderamente único era su forma de observar el mundo. Mientras otros artistas pintaban lo que creían que debía verse, Leonardo estudiaba la realidad con precisión científica. Pasó miles de horas observando el vuelo de los pájaros, el flujo del agua, el crecimiento de las plantas y la anatomía del cuerpo humano. Para él, el arte y la ciencia eran una misma cosa: maneras de entender la verdad del universo.",
            "Leonardo vivió en una época llamada el Renacimiento, un período de explosión cultural y científica en Europa que desafió las ideas medievales y celebró el conocimiento humano. Fue el hijo más brillante de su época, y sus ideas han influenciado a científicos, artistas e ingenieros durante los cinco siglos siguientes. Hoy, explorar a Leonardo es como abrir una ventana al futuro desde el pasado."
          ],
          "image": "/assets/davinci/davinci_m1.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuándo nació Leonardo da Vinci?",
        "options": ["15 de abril de 1452", "25 de diciembre de 1400", "3 de marzo de 1500", "1 de enero de 1480"],
        "a": 0
      },
      {
        "q": "¿Cuál es la pintura más famosa de Leonardo?",
        "options": ["La Creación de Adán", "La Mona Lisa", "La Gioconda del Paraíso", "El Nacimiento de Venus"],
        "a": 1
      },
      {
        "q": "¿Cómo se llaman los cuadernos de apuntes de Leonardo?",
        "options": ["Los Archivos", "Los Manuscritos", "Los Códices", "Los Rollos"],
        "a": 2
      },
      {
        "q": "¿Qué hacía Leonardo diferente a otros artistas de su época?",
        "options": ["Pintaba más rápido", "Estudiaba la realidad con precisión científica", "Usaba pinturas más caras", "Solo pintaba retratos reales"],
        "a": 1
      },
      {
        "q": "¿Cómo se llama el período histórico en que vivió Leonardo?",
        "options": ["La Edad Media", "La Ilustración", "El Renacimiento", "La Revolución Industrial"],
        "a": 2
      }
    ]
  },
  {
    "id": "davinci_m2",
    "order": 9202,
    "titleEn": "Leonardo's Flying Machines",
    "titleEs": "Las Máquinas Voladoras de Leonardo",
    "badge": "Dream Flyer",
    "badgeEs": "Soñador del Vuelo",
    "badgeIcon": "/assets/davinci/davinci_m2.png",
    "color": "#2980B9",
    "icon": "/assets/davinci/davinci_m2.png",
    "contentEs": {
      "sections": [
        {
          "id": "davinci_m2_s1",
          "title": "Las Máquinas Voladoras de Leonardo",
          "text": [
            "El sueño de volar obsesionó a Leonardo da Vinci durante toda su vida. Mucho antes de que los hermanos Wright construyeran el primer avión en 1903, Leonardo ya había diseñado docenas de máquinas voladoras en sus Códices, con una comprensión asombrosamente profunda de los principios del vuelo. Pasó años enteros observando el vuelo de los pájaros, estudiando la forma de sus alas, cómo inclinaban las plumas para controlar la dirección.",
            "El diseño más famoso de Leonardo fue el 'ornitóptero', una máquina con alas que imitaban el batido de las alas de los pájaros. El piloto movería las alas con el poder de sus piernas y brazos, usando un sistema de cuerdas y palancas. Leonardo calculó que necesitaría mucha más fuerza muscular de la que un humano podía generar, un problema que los aviadores reales encontrarían siglos después.",
            "Pero Leonardo no se limitó a imitar pájaros. También diseñó algo sorprendentemente similar a un helicóptero moderno: el 'tornillo aéreo'. Era una hélice espiral que, al girar, debía 'atornillarse' en el aire y elevarse. El principio era correcto, aunque la tecnología de la época no podía hacerlo funcionar. Los hermanos Wright y los diseñadores de helicópteros del siglo XX llegaron a conclusiones muy similares siglos después.",
            "Otro diseño notable fue su 'ala delta', un planeador con alas fijas que permitiría al piloto deslizarse por el aire. En 2002, un equipo de ingenieros construyó una réplica de este planeador siguiendo exactamente los planos de Leonardo, y logró volar exitosamente por varios segundos. ¡Las ideas de Leonardo realmente funcionaban! También diseñó algo similar a un paracaídas, 400 años antes de que se inventara.",
            "El trabajo de Leonardo sobre el vuelo fue un puente directo entre la observación de la naturaleza y la ingeniería. El estudio sistemático de las aves que Leonardo realizó se llama hoy ornitología aplicada, y es una disciplina que los ingenieros aeronáuticos modernos siguen practicando. Cuando los diseñadores de la NASA crean alas para aviones o drones planetarios, consultan principios que Leonardo identificó hace 500 años."
          ],
          "image": "/assets/davinci/davinci_m2.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué observó Leonardo para entender el vuelo?",
        "options": ["Las nubes", "El vuelo de los pájaros", "El movimiento del agua", "Las estrellas"],
        "a": 1
      },
      {
        "q": "¿Cómo se llama la máquina voladora de Leonardo con alas batientes?",
        "options": ["Planador", "Ornitóptero", "Globo aerostático", "Dirigible"],
        "a": 1
      },
      {
        "q": "¿Qué diseño de Leonardo es similar a un helicóptero moderno?",
        "options": ["El ala delta", "El paracaídas", "El tornillo aéreo", "El ornitóptero"],
        "a": 2
      },
      {
        "q": "¿En qué año construyeron ingenieros una réplica del planeador de Leonardo que voló?",
        "options": ["1960", "1985", "2002", "2010"],
        "a": 2
      },
      {
        "q": "¿Cuántos años antes de su invención diseñó Leonardo algo similar al paracaídas?",
        "options": ["100 años", "200 años", "300 años", "400 años"],
        "a": 3
      }
    ]
  },
  {
    "id": "davinci_m3",
    "order": 9203,
    "titleEn": "Leonardo and Human Anatomy",
    "titleEs": "Leonardo y la Anatomía Humana",
    "badge": "Body Scholar",
    "badgeEs": "Estudioso del Cuerpo",
    "badgeIcon": "/assets/davinci/davinci_m3.png",
    "color": "#C0392B",
    "icon": "/assets/davinci/davinci_m3.png",
    "contentEs": {
      "sections": [
        {
          "id": "davinci_m3_s1",
          "title": "Leonardo y la Anatomía Humana",
          "text": [
            "Para pintar el cuerpo humano perfectamente, Leonardo decidió estudiarlo por dentro. En una época en que la disección de cadáveres era controversial y a veces ilegal, Leonardo realizó más de 30 disecciones de cuerpos humanos en hospitales de Florencia, Milán y Roma. Lo que encontró dentro del cuerpo humano lo fascinó completamente, y lo registró con una precisión que los médicos no habían logrado antes.",
            "Sus dibujos anatómicos son obras maestras tanto científicas como artísticas. Dibujó el corazón con tal detalle que describió correctamente su función como una bomba muscular, algo que los médicos de su época no comprendían bien. Estudió el flujo de la sangre a través de las arterias y venas, y comenzó a intuir el sistema circulatorio, que William Harvey no describiría formalmente hasta 1628, un siglo después.",
            "Los dibujos del feto humano dentro del útero que Leonardo realizó son especialmente impresionantes. Con los instrumentos primitivos de su época, capturó con notable exactitud la posición del bebé, la forma de la placenta y el cordón umbilical. Médicos modernos que estudian estos dibujos quedan asombrados por su precisión. También estudió en detalle los músculos, los huesos, los tendones y los nervios del cuerpo.",
            "Leonardo diseñó conceptos de ingeniería basados en la anatomía humana. Por ejemplo, estudió el corazón con tanta profundidad que diseñó modelos de cristal de las válvulas cardíacas para estudiar el flujo de la sangre. Recientes investigaciones de ingeniería cardiovascular han demostrado que sus modelos eran funcionalmente correctos y que sus observaciones sobre la turbulencia del flujo sanguíneo anticiparon conceptos modernos de hemodinámica.",
            "El legado anatómico de Leonardo es inmenso. Sus cuadernos de anatomía fueron redescubiertos en el siglo XIX y estudiados por médicos y científicos. En 2005, el Museo Real de Edimburgo exhibió sus dibujos anatómicos junto a imágenes de tomografía computarizada modernas, y las comparaciones revelaron una exactitud asombrosa. Leonardo demostró que el arte y la ciencia médica son inseparables."
          ],
          "image": "/assets/davinci/davinci_m3.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuántas disecciones humanas realizó Leonardo?",
        "options": ["Más de 5", "Más de 15", "Más de 30", "Solo una"],
        "a": 2
      },
      {
        "q": "¿Cómo describió Leonardo la función del corazón?",
        "options": ["Como un filtro de sangre", "Como una bomba muscular", "Como un depósito de energía", "Como un regulador de calor"],
        "a": 1
      },
      {
        "q": "¿Quién formalizó el sistema circulatorio un siglo después de Leonardo?",
        "options": ["Andreas Vesalius", "William Harvey", "Ambroise Paré", "Paracelsus"],
        "a": 1
      },
      {
        "q": "¿Qué diseñó Leonardo para estudiar las válvulas del corazón?",
        "options": ["Modelos de cristal", "Maquetas de madera", "Diagramas en papel", "Modelos de cera"],
        "a": 0
      },
      {
        "q": "¿Qué demostraron sus dibujos del feto humano?",
        "options": ["Que no entendía la anatomía", "Que capturó detalles con notable exactitud", "Que copió a otros médicos", "Que era solo artístico"],
        "a": 1
      }
    ]
  },
  {
    "id": "davinci_m4",
    "order": 9204,
    "titleEn": "Leonardo the Engineer",
    "titleEs": "Leonardo el Ingeniero",
    "badge": "Master Builder",
    "badgeEs": "Constructor Maestro",
    "badgeIcon": "/assets/davinci/davinci_m4.png",
    "color": "#27AE60",
    "icon": "/assets/davinci/davinci_m4.png",
    "contentEs": {
      "sections": [
        {
          "id": "davinci_m4_s1",
          "title": "Leonardo el Ingeniero",
          "text": [
            "Si Leonardo da Vinci hubiera nacido en el siglo XXI, probablemente sería jefe de ingeniería en una empresa de tecnología aeroespacial o diseñaría robots en un laboratorio de inteligencia artificial. Sus cuadernos están llenos de diseños de máquinas extraordinarias que anticiparon inventos que la humanidad no desarrolló hasta siglos después.",
            "Uno de sus diseños más asombrosos fue un robot mecánico con forma de caballero medieval, conocido hoy como el 'robot de Leonardo'. Tenía un sistema de poleas, cables y ruedas dentadas que le permitían sentarse, mover los brazos y abrir la visera del casco. En 2002, el investigador Mark Rosheim construyó una réplica funcional siguiendo exactamente los planos de Leonardo, y el robot funcionó. Era el primer autómata diseñado con rigor ingenieril de la historia.",
            "Leonardo también diseñó una máquina que calculaba distancias al caminar, un odómetro, siglos antes de que se fabricara comercialmente. Diseñó grúas hidráulicas, molinos de viento mejorados, máquinas de dragado para limpiar canales, sistemas de ingeniería militar como catapultas mejoradas y vehículos blindados similares a los tanques modernos. También ideó un puente portátil que los ejércitos podían armar y desarmar rápidamente.",
            "Su trabajo en hidráulica fue especialmente brillante. Estudió el flujo del agua en ríos y canales con una comprensión de la dinámica de fluidos que no sería formalizada matemáticamente hasta siglos después. Diseñó sistemas de canales para desviar el río Arno en Florencia, propuso soluciones para controlar inundaciones y pensó en el agua como una fuente de energía mecánica aprovechable.",
            "Los ingenieros modernos que estudian los Códices de Leonardo se asombran regularmente. Muchos de sus diseños son técnicamente funcionales y podrían construirse hoy. La NASA ha estudiado sus principios de diseño aerodinámico para drones. El Instituto Tecnológico de Massachusetts (MIT) ha investigado sus diseños de robótica. Leonardo fue el primer ingeniero en pensar en términos de sistemas integrados de máquinas, anticipando los principios de la ingeniería moderna."
          ],
          "image": "/assets/davinci/davinci_m4.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué robot diseñó Leonardo da Vinci?",
        "options": ["Un robot con forma de pájaro", "Un robot con forma de caballero medieval", "Un robot con forma de pez", "Un robot con forma de árbol"],
        "a": 1
      },
      {
        "q": "¿Quién construyó una réplica funcional del robot de Leonardo en 2002?",
        "options": ["Elon Musk", "Mark Rosheim", "Bill Gates", "Steve Jobs"],
        "a": 1
      },
      {
        "q": "¿Qué estudió Leonardo en ríos y canales?",
        "options": ["La temperatura del agua", "La dinámica del flujo del agua", "Los peces del río", "El color del agua"],
        "a": 1
      },
      {
        "q": "¿Qué institución ha investigado los diseños de robótica de Leonardo?",
        "options": ["Harvard", "MIT (Instituto Tecnológico de Massachusetts)", "Oxford", "Cambridge"],
        "a": 1
      },
      {
        "q": "¿Cuál fue la innovación más importante de Leonardo como ingeniero?",
        "options": ["Construir los primeros puentes", "Pensar en sistemas integrados de máquinas", "Inventar el vapor", "Crear el primer motor"],
        "a": 1
      }
    ]
  },
  {
    "id": "davinci_m5",
    "order": 9205,
    "titleEn": "Leonardo's Scientific Method",
    "titleEs": "El Método Científico de Leonardo",
    "badge": "Observer Supreme",
    "badgeEs": "Observador Supremo",
    "badgeIcon": "/assets/davinci/davinci_m5.png",
    "color": "#16A085",
    "icon": "/assets/davinci/davinci_m5.png",
    "contentEs": {
      "sections": [
        {
          "id": "davinci_m5_s1",
          "title": "El Método Científico de Leonardo",
          "text": [
            "Lo que separaba a Leonardo da Vinci de sus contemporáneos no era solo su talento artístico o su creatividad, sino su método de trabajo. Leonardo fue, en muchos sentidos, el primer científico moderno, un siglo antes de que Galileo formalizara el método científico. Su enfoque era simple pero revolucionario: observa primero, pregunta siempre, y nunca aceptes algo como verdadero solo porque alguien importante lo dijo.",
            "Leonardo registraba todo en sus cuadernos. Observaba un fenómeno, hacía preguntas, diseñaba un experimento o un dibujo para investigarlo, sacaba conclusiones y las registraba. Sus cuadernos incluyen observaciones sobre la geología de las rocas en las colinas de Toscana, que lo llevaron a concluir que los fósiles marinos en las montañas significaban que el nivel del mar había cambiado, una idea revolucionaria para su época.",
            "Estudió la óptica y la luz con rigor científico. Entendió que los ojos no emiten rayos de luz hacia los objetos, como creían los filósofos antiguos, sino que reciben la luz reflejada por los objetos. Estudió cómo la luz se difracta, cómo funciona la sombra y la perspectiva, y aplicó todo esto a su pintura. La Mona Lisa, con sus famosos sfumatos, es el resultado de aplicar principios ópticos científicos a la pintura.",
            "También fue pionero en lo que llamamos biomimética: la idea de diseñar tecnología imitando soluciones que la naturaleza ha desarrollado. Sus máquinas voladoras imitaban aves, sus diseños de estructuras imitaban huesos, sus sistemas hidráulicos imitaban venas y ríos. Esta filosofía de aprender de la naturaleza es hoy una disciplina científica formal usada en la ingeniería aeroespacial, la robótica y la arquitectura.",
            "El legado científico de Leonardo es incalculable. Sus cuadernos, dispersos en museos y colecciones privadas de todo el mundo, siguen siendo estudiados por científicos e ingenieros. En 2019, el Centro de Investigación de la NASA Ames publicó un estudio sobre cómo los principios observacionales de Leonardo se aplican al diseño de drones planetarios. Leonardo da Vinci no fue solo un genio del pasado; sigue siendo una fuente de inspiración activa para el futuro de la exploración espacial."
          ],
          "image": "/assets/davinci/davinci_m5.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuál era el principio fundamental del método de Leonardo?",
        "options": ["Confiar en los libros antiguos", "Observar primero, preguntar siempre, nunca aceptar sin evidencia", "Seguir la autoridad religiosa", "Copiar a los maestros griegos"],
        "a": 1
      },
      {
        "q": "¿Qué conclusión geológica revolucionaria sacó Leonardo de los fósiles marinos en las montañas?",
        "options": ["Que los peces volaban", "Que el nivel del mar había cambiado", "Que las montañas eran volcanes", "Que los fósiles eran decorativos"],
        "a": 1
      },
      {
        "q": "¿Qué entendió Leonardo sobre cómo funcionan los ojos?",
        "options": ["Que emiten rayos de luz", "Que reciben la luz reflejada por los objetos", "Que crean su propia luz", "Que no necesitan luz"],
        "a": 1
      },
      {
        "q": "¿Cómo se llama la disciplina que diseña tecnología imitando a la naturaleza?",
        "options": ["Biotecnología", "Biomimética", "Bioquímica", "Bioestadística"],
        "a": 1
      },
      {
        "q": "¿Qué publicó la NASA en 2019 relacionado con Leonardo?",
        "options": ["Una misión a Júpiter llamada Da Vinci", "Un estudio sobre sus principios aplicados a drones planetarios", "Un telescopio en su honor", "Un libro sobre su arte"],
        "a": 1
      }
    ]
  }
`;

// Remove the closing `];` and append new modules + close
content = content.replace(/\];\s*$/, newModules + '\n];');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ 15 módulos añadidos correctamente: galileo_m1-5, faraday_m1-5, davinci_m1-5');
console.log('Total de bytes del archivo:', fs.statSync(filePath).size);
