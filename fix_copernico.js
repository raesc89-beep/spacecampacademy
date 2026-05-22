const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'lib', 'courseData.js');
let data = fs.readFileSync(targetFile, 'utf8');

const copernicoData = [
  {
    "id": "copernico_m1",
    "titleEs": "El Universo Antes de Copérnico",
    "color": "#D4A843",
    "contentEs": {
      "sections": [
        {
          "id": "copernico_m1_1",
          "title": "El Universo Antes de Copérnico",
          "text": "Durante más de 1,500 años, la humanidad creyó que la Tierra era el centro inamovible del universo. Este modelo, conocido como el **sistema geocéntrico** (o ptolemaico), proponía que el Sol, la Luna, las estrellas y los planetas giraban a nuestro alrededor en esferas de cristal perfectas.\\n\\nEl astrónomo griego Claudio Ptolomeo perfeccionó este sistema en el siglo II d.C. en su obra *Almagesto*. Para explicar los extraños movimientos retrógrados de los planetas (que a veces parecían retroceder en el cielo), Ptolomeo inventó los **epiciclos**: pequeños círculos sobre los cuales giraban los planetas mientras orbitaban la Tierra.\\n\\n*Dato Curioso:* El modelo de Ptolomeo era tan matemáticamente complejo que requería decenas de 'epiciclos' girando sobre otros 'epiciclos' solo para calcular la posición de Marte."
        }
      ],
      "quiz": [
        {
          "question": "¿Cómo se llamaba el modelo astronómico aceptado antes de Copérnico?",
          "options": ["Modelo Heliocéntrico", "Modelo Geocéntrico", "Modelo Galáctico", "Modelo Newtoniano"],
          "correctAnswer": 1,
          "explanation": "El modelo geocéntrico colocaba a la Tierra en el centro del universo."
        },
        {
          "question": "¿Qué mecanismo matemático usó Ptolomeo para explicar el movimiento retrógrado de los planetas?",
          "options": ["Elipses", "Parábolas", "Epiciclos", "Agujeros de gusano"],
          "correctAnswer": 2,
          "explanation": "Los epiciclos eran pequeños círculos sobre los que orbitaban los planetas en el modelo de Ptolomeo."
        }
      ]
    }
  },
  {
    "id": "copernico_m2",
    "titleEs": "La Revolución Heliocéntrica",
    "color": "#FFD700",
    "contentEs": {
      "sections": [
        {
          "id": "copernico_m2_1",
          "title": "La Revolución Heliocéntrica",
          "text": "Nicolás Copérnico, un clérigo, matemático y astrónomo polaco renacentista, se dio cuenta de que el sistema de Ptolomeo era demasiado complicado y presentaba errores matemáticos. Decidió explorar una idea radical: **¿Y si el Sol estaba en el centro y la Tierra era solo un planeta más?**\\n\\nEn el modelo heliocéntrico (*helios* = sol), el Sol ocupa el centro del sistema. La Tierra, Marte, Júpiter y los demás planetas orbitan a su alrededor. Esto explicaba de manera mucho más simple y elegante los movimientos planetarios, eliminando la necesidad de los complejos epiciclos mayores.\\n\\nUna de las mayores victorias del modelo de Copérnico fue explicar por qué Marte parecía retroceder en el cielo. Si la Tierra y Marte orbitan el Sol, y la Tierra (al estar más cerca) viaja más rápido, habrá un momento en que la Tierra 'rebase' a Marte. Desde nuestra perspectiva, parecerá que Marte va hacia atrás, igual que un coche lento parece retroceder cuando lo pasas en la autopista.\\n\\n*Dato Curioso:* Copérnico no fue el primero en proponer esto. Aristarco de Samos lo propuso en la antigua Grecia 1,800 años antes, pero su idea fue ignorada."
        }
      ],
      "quiz": [
        {
          "question": "¿Qué cuerpo celeste colocó Copérnico en el centro del universo conocido?",
          "options": ["La Tierra", "El Sol", "La Luna", "Júpiter"],
          "correctAnswer": 1,
          "explanation": "Copérnico propuso el modelo heliocéntrico, con el Sol en el centro."
        },
        {
          "question": "¿Qué fenómeno óptico/astronómico explicó Copérnico de manera elegante y sencilla con su modelo?",
          "options": ["Los eclipses lunares", "El movimiento retrógrado de los planetas", "Las fases de la Luna", "Las manchas solares"],
          "correctAnswer": 1,
          "explanation": "El movimiento retrógrado se explica fácilmente por la diferencia de velocidades orbitales entre la Tierra y otros planetas."
        }
      ]
    }
  },
  {
    "id": "copernico_m3",
    "titleEs": "De Revolutionibus Orbium Coelestium",
    "color": "#FF6B35",
    "contentEs": {
      "sections": [
        {
          "id": "copernico_m3_1",
          "title": "De Revolutionibus Orbium Coelestium",
          "text": "Copérnico desarrolló su teoría alrededor de 1514, resumiéndola en un manuscrito llamado *Commentariolus*, que solo compartió con unos pocos amigos. Sin embargo, se negó a publicar su obra completa durante décadas. Tenía miedo: no tanto de la Inquisición (la Iglesia aún no había condenado el heliocentrismo), sino de ser el hazmerreír de la comunidad científica y académica.\\n\\nFinalmente, persuadido por su discípulo Rheticus, Copérnico permitió la publicación de su obra maestra, **De revolutionibus orbium coelestium** (Sobre las revoluciones de las esferas celestes). Cuenta la leyenda que recibió la primera copia impresa en su lecho de muerte en 1543.\\n\\nPara evitar problemas, el editor del libro, Andreas Osiander, añadió un prólogo sin el permiso de Copérnico. En él, decía que el modelo heliocéntrico era solo 'un truco matemático' útil para los cálculos, y no necesariamente la realidad física del universo."
        }
      ],
      "quiz": [
        {
          "question": "¿Cuál es el nombre de la obra magna de Copérnico?",
          "options": ["Almagesto", "De revolutionibus orbium coelestium", "Principia Mathematica", "Diálogos sobre los dos máximos sistemas del mundo"],
          "correctAnswer": 1,
          "explanation": "De revolutionibus orbium coelestium fue publicado en 1543."
        },
        {
          "question": "¿Por qué el editor añadió un prólogo advirtiendo que el modelo era solo un 'truco matemático'?",
          "options": ["Porque era cierto", "Para hacer el libro más corto", "Para evitar la ira de los filósofos y teólogos", "Porque Copérnico se lo pidió"],
          "correctAnswer": 2,
          "explanation": "El prólogo de Osiander buscaba proteger el libro y al autor de la censura religiosa y académica."
        }
      ]
    }
  },
  {
    "id": "copernico_m4",
    "titleEs": "Astronomía a Ojo Desnudo",
    "color": "#00E4FF",
    "contentEs": {
      "sections": [
        {
          "id": "copernico_m4_1",
          "title": "Astronomía a Ojo Desnudo",
          "text": "Es fundamental recordar que Copérnico hizo todos sus descubrimientos **sin un telescopio**. El telescopio astronómico no fue inventado hasta principios del siglo XVII por Galileo Galilei, décadas después de la muerte de Copérnico.\\n\\nCopérnico observaba el cielo utilizando instrumentos antiguos, principalmente de madera. Usaba el *triquetrum* (o regla ptolemaica) para medir la altitud de las estrellas y los planetas, y el astrolabio para calcular posiciones. A pesar de las limitaciones de estos instrumentos rudimentarios, sus matemáticas eran precisas.\\n\\nAunque Copérnico tuvo razón al colocar el Sol en el centro, cometió un error crucial: creía que las órbitas de los planetas eran círculos perfectos. Como los planetas en realidad se mueven en elipses (como descubriría Kepler más tarde), Copérnico todavía tuvo que usar algunos pequeños epiciclos en su modelo para que las matemáticas coincidieran con sus observaciones a ojo desnudo."
        }
      ],
      "quiz": [
        {
          "question": "¿Qué instrumento óptico utilizó Copérnico para descubrir el sistema heliocéntrico?",
          "options": ["El telescopio refractor", "El telescopio reflector", "El microscopio", "Ninguno, lo hizo a ojo desnudo"],
          "correctAnswer": 3,
          "explanation": "El telescopio no se usó en astronomía hasta la época de Galileo, mucho después de la muerte de Copérnico."
        },
        {
          "question": "¿Cuál fue el principal error geométrico en el modelo de Copérnico?",
          "options": ["Puso la Tierra en el centro", "Pensó que las estrellas orbitaban la Luna", "Creía que las órbitas eran círculos perfectos", "Calculó mal la velocidad de la luz"],
          "correctAnswer": 2,
          "explanation": "Copérnico seguía aferrado al ideal griego de que el círculo es la forma perfecta, pero las órbitas son en realidad elípticas."
        }
      ]
    }
  },
  {
    "id": "copernico_m5",
    "titleEs": "El Legado de Copérnico",
    "color": "#A8FF78",
    "contentEs": {
      "sections": [
        {
          "id": "copernico_m5_1",
          "title": "El Inicio de una Nueva Era",
          "text": "Copérnico no solo cambió la posición de la Tierra, cambió la posición de la humanidad en el universo. Al derribar el modelo ptolemaico, desencadenó lo que hoy conocemos como la **Revolución Científica**.\\n\\nSu trabajo sentó las bases para los científicos que vinieron después:\\n* **Johannes Kepler:** Utilizó observaciones precisas para demostrar que los planetas orbitan el Sol no en círculos perfectos, sino en *elipses*.\\n* **Galileo Galilei:** Apuntó un telescopio al cielo y vio lunas orbitando Júpiter, demostrando que no todo orbitaba la Tierra. Defendió el heliocentrismo con vehemencia.\\n* **Isaac Newton:** En su obra *Principia*, formuló la Ley de la Gravitación Universal, explicando por fin *por qué* los planetas orbitan el Sol (la gravedad).\\n\\nFilosóficamente, la obra de Copérnico fue un golpe al ego humano. Nos enseñó que no ocupamos un lugar privilegiado en el centro geométrico de la creación, sino que somos pasajeros en un pequeño planeta rocoso que viaja a través del vasto cosmos."
        }
      ],
      "quiz": [
        {
          "question": "¿Qué astrónomo corrigió el modelo de Copérnico demostrando que las órbitas son elípticas?",
          "options": ["Galileo", "Ptolomeo", "Johannes Kepler", "Isaac Newton"],
          "correctAnswer": 2,
          "explanation": "Kepler formuló las leyes del movimiento planetario, donde estableció que las órbitas son elipses."
        },
        {
          "question": "¿Qué impacto filosófico tuvo la teoría heliocéntrica?",
          "options": ["Demostró que el universo es infinito", "Quitó a la humanidad del centro del universo", "Probó que existe vida extraterrestre", "Confirmó que la Tierra es plana"],
          "correctAnswer": 1,
          "explanation": "El 'Principio Copernicano' establece que la Tierra y la humanidad no ocupan un lugar central o privilegiado en el universo."
        }
      ]
    }
  }
];

const splitIndex = data.indexOf(',\\n\\n  {\\n    "id": "copernico_m1"');
if (splitIndex !== -1) {
  let jsonStr = JSON.stringify(copernicoData, null, 2);
  jsonStr = jsonStr.substring(1, jsonStr.length - 1);
  const newData = data.substring(0, splitIndex) + ',\\n' + jsonStr + '\\n];';
  fs.writeFileSync(targetFile, newData);
  console.log("Successfully fixed COURSE_DATA schema for Copernico");
} else {
  // Wait, the view_file showed:
  // 22521: }
  // 22522: ,\n
  // 22523:   {
  // 22524:     "id": "copernico_m1",
  // So it's '}\\r\\n,\\\\n\\r\\n  {\\r\\n    "id": "copernico_m1",' (on windows it's CRLF)
  const copernicoMatch = data.indexOf('"id": "copernico_m1"');
  if (copernicoMatch !== -1) {
     // Go back until the previous }
     const textBefore = data.substring(0, copernicoMatch);
     const lastBrace = textBefore.lastIndexOf('}');
     
     let jsonStr = JSON.stringify(copernicoData, null, 2);
     jsonStr = jsonStr.substring(1, jsonStr.length - 1);
     
     const newData = data.substring(0, lastBrace + 1) + ',\\n' + jsonStr + '\\n];';
     fs.writeFileSync(targetFile, newData);
     console.log("Successfully fixed COURSE_DATA schema for Copernico by finding the last brace.");
  } else {
     console.log("Could not find copernico_m1 in the file.");
  }
}
