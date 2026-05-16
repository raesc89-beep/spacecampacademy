const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'lib/courseData.js');
let content = fs.readFileSync(dataPath, 'utf8');

const newModules = [
  {
    "id": "interstellar_m1",
    "order": 5001,
    "titleEn": "Einstein and the Invisible Web",
    "titleEs": "Einstein y la Red Invisible",
    "badge": "Space-Time Navigator",
    "badgeEs": "Navegante del Espaciotiempo",
    "badgeIcon": "/assets/interstellar/m1.png",
    "color": "#00E4FF",
    "icon": "/assets/interstellar/m1.png",
    "contentEs": {
      "sections": [
        {
          "id": "interstellar_m1_1",
          "title": "Einstein y la Red Invisible",
          "text": [
            "1.1. Adiós a Newton: ¿Por qué la gravedad no es una fuerza magnética, sino una deformación?",
            "Durante mucho tiempo, la gente creyó que la gravedad era como un imán invisible que tiraba de nosotros.",
            "¡Pero Albert Einstein nos enseñó que el espacio y el tiempo son como una inmensa cama elástica!",
            "1.2. La Cama Elástica del Cosmos: Cómo los planetas y estrellas hunden el espacio a su alrededor.",
            "Imagina poner una bola de bolos en medio de la cama elástica. Se hunde, ¿verdad?",
            "Esa deformación hace que otras canicas más pequeñas giren hacia ella. ¡Eso es la gravedad!",
            "1.3. La Velocidad de la Luz: El límite de velocidad absoluto del universo (c ≈ 300,000 km/s).",
            "Nada en todo el universo puede viajar más rápido que la luz. Es la regla absoluta de la física cósmica."
          ],
          "image": "/assets/interstellar/m1.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué científico propuso que la gravedad deforma el espaciotiempo?",
        "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        "a": 1
      },
      {
        "q": "¿A qué se parece el tejido del espaciotiempo según el módulo?",
        "options": ["A un bloque de hielo", "A una cama elástica", "A un imán gigante", "A una nube de polvo"],
        "a": 1
      },
      {
        "q": "¿Cuál es la velocidad de la luz aproximada?",
        "options": ["300,000 km/s", "1,000 km/h", "150,000 km/s", "Infinita"],
        "a": 0
      }
    ]
  },
  {
    "id": "interstellar_m2",
    "order": 5002,
    "titleEn": "Gargantua",
    "titleEs": "Gargantúa – Anatomía de un Monstruo Gravitacional",
    "badge": "Black Hole Explorer",
    "badgeEs": "Explorador de Gargantúa",
    "badgeIcon": "/assets/interstellar/m2.png",
    "color": "#FF3366",
    "icon": "/assets/interstellar/m2.png",
    "contentEs": {
      "sections": [
        {
          "id": "interstellar_m2_1",
          "title": "Gargantúa – Anatomía de un Monstruo Gravitacional",
          "text": [
            "2.1. ¿Qué es un Agujero Negro Supermasivo?: Estrellas colapsadas y el centro de las galaxias.",
            "Gargantúa es un monstruo devorador de luz. Nace cuando una estrella inmensa se apaga y colapsa sobre sí misma.",
            "2.2. El Punto de No Retorno: El Horizonte de Sucesos y por qué ni la luz puede escapar.",
            "Una vez que cruzas el Horizonte de Sucesos, ¡es el fin! La gravedad es tan fuerte que ni siquiera la luz, la cosa más rápida del universo, puede escapar.",
            "2.3. El Disco de Acreción: Por qué Gargantúa brilla.",
            "Aunque el agujero negro es oscuro, está rodeado de gas y polvo que gira tan rápido que se calienta y brilla intensamente por la fricción extrema."
          ],
          "image": "/assets/interstellar/m2.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué es el Horizonte de Sucesos?",
        "options": ["Una estrella brillante", "El punto de no retorno de un agujero negro", "El centro de la galaxia", "Un planeta habitable"],
        "a": 1
      },
      {
        "q": "¿Por qué brilla un agujero negro desde afuera?",
        "options": ["Por la fricción del disco de acreción", "Porque es una estrella gigante", "Por luces artificiales", "Por la reflexión del sol"],
        "a": 0
      }
    ]
  },
  {
    "id": "interstellar_m3",
    "order": 5003,
    "titleEn": "Elastic Time",
    "titleEs": "El Tiempo es Elástico (Dilatación Temporal)",
    "badge": "Time Traveler",
    "badgeEs": "Viajero del Tiempo",
    "badgeIcon": "/assets/interstellar/m3.png",
    "color": "#33FF66",
    "icon": "/assets/interstellar/m3.png",
    "contentEs": {
      "sections": [
        {
          "id": "interstellar_m3_1",
          "title": "El Tiempo es Elástico",
          "text": [
            "3.1. El Planeta de Miller: 'Una hora aquí son siete años en la Tierra'.",
            "La inmensa gravedad de Gargantúa dobla tanto el espacio que también frena el tiempo.",
            "3.2. La Ecuación del Tiempo: Cómo la gravedad extrema frena el tic-tac del reloj.",
            "Para los astronautas en el planeta de Miller, el tiempo pasa lento, pero para quienes están lejos en la Tierra, los años vuelan.",
            "3.3. Paradoja de los Gemelos: Por qué Cooper regresa más joven que su hija Murph.",
            "Al viajar cerca de la velocidad de la luz y experimentar alta gravedad, el reloj biológico de Cooper avanzó muy poco comparado con el de su hija."
          ],
          "image": "/assets/interstellar/m3.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué causa que el tiempo pase más lento en el planeta de Miller?",
        "options": ["El clima frío", "La inmensa gravedad de Gargantúa", "Las nubes espesas", "El reloj estaba roto"],
        "a": 1
      },
      {
        "q": "¿Cuánto equivale una hora en el planeta de Miller en la Tierra?",
        "options": ["Un día", "Siete años", "Un mes", "Diez minutos"],
        "a": 1
      }
    ]
  },
  {
    "id": "interstellar_m4",
    "order": 5004,
    "titleEn": "Wormholes",
    "titleEs": "Agujeros de Gusano – Atajos Cósmicos",
    "badge": "Wormhole Surfer",
    "badgeEs": "Surfista de Gusanos",
    "badgeIcon": "/assets/interstellar/m4.png",
    "color": "#9933FF",
    "icon": "/assets/interstellar/m4.png",
    "contentEs": {
      "sections": [
        {
          "id": "interstellar_m4_1",
          "title": "Agujeros de Gusano",
          "text": [
            "4.1. Doblando el Papel: La explicación de la manzana y el papel.",
            "Imagina dibujar dos puntos en una hoja. El camino más corto es doblar la hoja y hacer un agujero con un lápiz que una ambos puntos.",
            "4.2. Esferas en el Espacio: Por qué es una esfera y no un círculo plano.",
            "En el espacio 3D, un agujero no es un círculo plano, se ve desde todos los ángulos como una esfera cristalina.",
            "4.3. Estabilidad: ¿Existen realmente?",
            "Por ahora, solo existen en las matemáticas teóricas y requieren energía negativa para mantenerse abiertos."
          ],
          "image": "/assets/interstellar/m4.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cómo se ve un agujero de gusano en el espacio tridimensional?",
        "options": ["Como un círculo plano", "Como un tubo recto", "Como una esfera", "Como una estrella"],
        "a": 2
      },
      {
        "q": "¿Para qué sirve un agujero de gusano teóricamente?",
        "options": ["Para guardar objetos", "Como un atajo cósmico entre dos puntos lejanos", "Para crear gravedad", "Para calentar galaxias"],
        "a": 1
      }
    ]
  },
  {
    "id": "interstellar_m5",
    "order": 5005,
    "titleEn": "The Tesseract",
    "titleEs": "El Teseracto y la Quinta Dimensión",
    "badge": "5D Master",
    "badgeEs": "Maestro de 5D",
    "badgeIcon": "/assets/interstellar/m5.png",
    "color": "#FFD700",
    "icon": "/assets/interstellar/m5.png",
    "contentEs": {
      "sections": [
        {
          "id": "interstellar_m5_1",
          "title": "El Teseracto y la Quinta Dimensión",
          "text": [
            "5.1. Viviendo en 3D: Por qué nuestros ojos solo ven alto, ancho y profundidad.",
            "Estamos atados a tres dimensiones y avanzamos inevitablemente por una cuarta: el tiempo.",
            "5.2. El Cubo de 4 Dimensiones: Qué es un teseracto.",
            "En el teseracto, el tiempo se convierte en una dimensión espacial. Cooper podía moverse hacia adelante o atrás en el tiempo como si caminara por un pasillo.",
            "5.3. La Ecuación de la Gravedad: El secreto para salvar a la humanidad.",
            "Manipulando la gravedad a través del tiempo, Cooper logró enviar el mensaje cuántico a Murph para resolver la ecuación final de la unificación gravitatoria."
          ],
          "image": "/assets/interstellar/m5.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué permite el Teseracto a Cooper en la quinta dimensión?",
        "options": ["Volar más rápido", "Moverse por el tiempo como si fuera un espacio físico", "Respirar sin oxígeno", "Crear agujeros negros"],
        "a": 1
      },
      {
        "q": "¿Qué necesitaba Murph para resolver su ecuación y salvar a la humanidad?",
        "options": ["Datos cuánticos del interior del agujero negro", "Una nave más rápida", "Más combustible", "El reloj de Cooper"],
        "a": 0
      }
    ]
  }
];

const stringifiedNew = newModules.map(m => JSON.stringify(m, null, 2)).join(',\n  ');

// Insertar antes del cierre del array de COURSE_DATA
const modifiedContent = content.replace(/\];\s*$/, ',\n  ' + stringifiedNew + '\n];\n');

fs.writeFileSync(dataPath, modifiedContent);
console.log('Interstellar modules added successfully!');
