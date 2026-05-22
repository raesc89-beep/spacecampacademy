const fs = require('fs');

const copernicoData = [
  {
    id: "copernico_m1",
    titleEs: "El Universo Antes de Copérnico",
    titleEn: "The Universe Before Copernicus",
    type: "course",
    content: {
      "es": {
        "title": "El Universo Antes de Copérnico",
        "description": "Explora cómo la humanidad veía el cosmos antes de la revolución heliocéntrica. Descubre el modelo geocéntrico de Ptolomeo, donde la Tierra era el centro de todo.",
        "theory": `### La Tierra en el Centro
Durante más de 1,500 años, la humanidad creyó que la Tierra era el centro inamovible del universo. Este modelo, conocido como el **sistema geocéntrico** (o ptolemaico), proponía que el Sol, la Luna, las estrellas y los planetas giraban a nuestro alrededor en esferas de cristal perfectas.

### El Modelo de Ptolomeo
El astrónomo griego Claudio Ptolomeo perfeccionó este sistema en el siglo II d.C. en su obra *Almagesto*. Para explicar los extraños movimientos retrógrados de los planetas (que a veces parecían retroceder en el cielo), Ptolomeo inventó los **epiciclos**: pequeños círculos sobre los cuales giraban los planetas mientras orbitaban la Tierra.

### ¿Por qué creían esto?
A simple vista, tiene sentido: no sentimos que la Tierra se mueva y el Sol parece cruzar el cielo todos los días. Además, este modelo encajaba con las creencias filosóficas y religiosas de la época, que colocaban a la humanidad en el centro de la creación.`,
        "funFact": "El modelo de Ptolomeo era tan matemáticamente complejo que requería decenas de 'epiciclos' girando sobre otros 'epiciclos' solo para calcular la posición de Marte.",
        "quiz": [
          {
            "question": "¿Cómo se llamaba el modelo astronómico aceptado antes de Copérnico?",
            "options": ["Modelo Heliocéntrico", "Modelo Geocéntrico", "Modelo Galáctico", "Modelo Newtoniano"],
            "correctAnswer": 1,
            "explanation": "El modelo geocéntrico colocaba a la Tierra en el centro del universo."
          },
          {
            "question": "¿Qué astrónomo griego perfeccionó el modelo geocéntrico en el siglo II d.C.?",
            "options": ["Aristarco", "Galileo", "Ptolomeo", "Aristóteles"],
            "correctAnswer": 2,
            "explanation": "Claudio Ptolomeo escribió el Almagesto, la obra máxima de la astronomía geocéntrica."
          },
          {
            "question": "¿Qué mecanismo matemático usó Ptolomeo para explicar el movimiento retrógrado de los planetas?",
            "options": ["Elipses", "Parábolas", "Epiciclos", "Agujeros de gusano"],
            "correctAnswer": 2,
            "explanation": "Los epiciclos eran pequeños círculos sobre los que orbitaban los planetas en el modelo de Ptolomeo."
          }
        ]
      }
    }
  },
  {
    id: "copernico_m2",
    titleEs: "La Revolución Heliocéntrica",
    titleEn: "The Heliocentric Revolution",
    type: "course",
    content: {
      "es": {
        "title": "La Revolución Heliocéntrica",
        "description": "Descubre la idea radical que cambió el mundo: el Sol, y no la Tierra, está en el centro del sistema planetario.",
        "theory": `### Una Idea Peligrosa
Nicolás Copérnico, un clérigo, matemático y astrónomo polaco renacentista, se dio cuenta de que el sistema de Ptolomeo era demasiado complicado y presentaba errores matemáticos. Decidió explorar una idea radical: **¿Y si el Sol estaba en el centro y la Tierra era solo un planeta más?**

### El Sistema Heliocéntrico
En el modelo heliocéntrico (*helios* = sol), el Sol ocupa el centro del sistema. La Tierra, Marte, Júpiter y los demás planetas orbitan a su alrededor. Esto explicaba de manera mucho más simple y elegante los movimientos planetarios, eliminando la necesidad de los complejos epiciclos mayores.

### El Movimiento Retrógrado Explicado
Una de las mayores victorias del modelo de Copérnico fue explicar por qué Marte parecía retroceder en el cielo. Si la Tierra y Marte orbitan el Sol, y la Tierra (al estar más cerca) viaja más rápido, habrá un momento en que la Tierra 'rebase' a Marte. Desde nuestra perspectiva, parecerá que Marte va hacia atrás, igual que un coche lento parece retroceder cuando lo pasas en la autopista.`,
        "funFact": "Copérnico no fue el primero en proponer esto. Aristarco de Samos lo propuso en la antigua Grecia 1,800 años antes, pero su idea fue ignorada.",
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
    }
  },
  {
    id: "copernico_m3",
    titleEs: "De Revolutionibus",
    titleEn: "De Revolutionibus",
    type: "course",
    content: {
      "es": {
        "title": "De Revolutionibus Orbium Coelestium",
        "description": "Conoce el libro que encendió la chispa de la Revolución Científica y por qué Copérnico tardó tanto en publicarlo.",
        "theory": `### El Miedo a la Crítica
Copérnico desarrolló su teoría alrededor de 1514, resumiéndola en un manuscrito llamado *Commentariolus*, que solo compartió con unos pocos amigos. Sin embargo, se negó a publicar su obra completa durante décadas. Tenía miedo: no tanto de la Inquisición (la Iglesia aún no había condenado el heliocentrismo), sino de ser el hazmerreír de la comunidad científica y académica.

### Sobre las revoluciones de las esferas celestes
Finalmente, persuadido por su discípulo Rheticus, Copérnico permitió la publicación de su obra maestra, **De revolutionibus orbium coelestium** (Sobre las revoluciones de las esferas celestes). Cuenta la leyenda que recibió la primera copia impresa en su lecho de muerte en 1543.

### Un Prólogo Cauteloso
Para evitar problemas, el editor del libro, Andreas Osiander, añadió un prólogo sin el permiso de Copérnico. En él, decía que el modelo heliocéntrico era solo 'un truco matemático' útil para los cálculos, y no necesariamente la realidad física del universo.`,
        "funFact": "El libro era tan técnico y denso matemáticamente que muy pocas personas lo leyeron al principio, lo que ayudó a que pasara desapercibido por las autoridades religiosas durante casi 70 años.",
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
    }
  },
  {
    id: "copernico_m4",
    titleEs: "Matemáticas y Observación",
    titleEn: "Math and Observation",
    type: "course",
    content: {
      "es": {
        "title": "Astronomía a Ojo Desnudo",
        "description": "Descubre cómo Copérnico revolucionó la astronomía utilizando únicamente la observación a simple vista y las matemáticas.",
        "theory": `### Astronomía sin Telescopio
Es fundamental recordar que Copérnico hizo todos sus descubrimientos **sin un telescopio**. El telescopio astronómico no fue inventado hasta principios del siglo XVII por Galileo Galilei, décadas después de la muerte de Copérnico.

### El Triquetrum y el Astrolabio
Copérnico observaba el cielo utilizando instrumentos antiguos, principalmente de madera. Usaba el *triquetrum* (o regla ptolemaica) para medir la altitud de las estrellas y los planetas, y el astrolabio para calcular posiciones. A pesar de las limitaciones de estos instrumentos rudimentarios, sus matemáticas eran precisas.

### La Matemática de los Círculos Perfectos
Aunque Copérnico tuvo razón al colocar el Sol en el centro, cometió un error crucial: creía que las órbitas de los planetas eran círculos perfectos. Como los planetas en realidad se mueven en elipses (como descubriría Kepler más tarde), Copérnico todavía tuvo que usar algunos pequeños epiciclos en su modelo para que las matemáticas coincidieran con sus observaciones a ojo desnudo.`,
        "funFact": "Copérnico era un hombre del Renacimiento: además de astrónomo, era médico, economista, traductor, diplomático y gobernador.",
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
    }
  },
  {
    id: "copernico_m5",
    titleEs: "El Legado de Copérnico",
    titleEn: "The Legacy of Copernicus",
    type: "course",
    content: {
      "es": {
        "title": "El Inicio de una Nueva Era",
        "description": "El impacto de la idea de Copérnico y cómo pavimentó el camino para los más grandes genios de la ciencia moderna.",
        "theory": `### La Revolución Científica
Copérnico no solo cambió la posición de la Tierra, cambió la posición de la humanidad en el universo. Al derribar el modelo ptolemaico, desencadenó lo que hoy conocemos como la **Revolución Científica**.

### Los Gigantes sobre sus Hombros
Su trabajo sentó las bases para los científicos que vinieron después:
* **Johannes Kepler:** Utilizó observaciones precisas para demostrar que los planetas orbitan el Sol no en círculos perfectos, sino en *elipses*.
* **Galileo Galilei:** Apuntó un telescopio al cielo y vio lunas orbitando Júpiter, demostrando que no todo orbitaba la Tierra. Defendió el heliocentrismo con vehemencia.
* **Isaac Newton:** En su obra *Principia*, formuló la Ley de la Gravitación Universal, explicando por fin *por qué* los planetas orbitan el Sol (la gravedad).

### El Fin del Antropocentrismo
Filosóficamente, la obra de Copérnico fue un golpe al ego humano. Nos enseñó que no ocupamos un lugar privilegiado en el centro geométrico de la creación, sino que somos pasajeros en un pequeño planeta rocoso que viaja a través del vasto cosmos.`,
        "funFact": "En 2008, los restos de Copérnico, que estaban perdidos, fueron confirmados mediante análisis de ADN comparándolos con un cabello suyo encontrado en un libro antiguo.",
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
  }
];

// Append to courseData.js
const targetFile = 'c:\\\\Users\\\\raesc\\\\Desktop\\\\Antigravity Projects\\\\space-camp-academy\\\\lib\\\\courseData.js';
let data = fs.readFileSync(targetFile, 'utf8');

// Find the last index of '];'
const lastIndex = data.lastIndexOf('];');

if (lastIndex !== -1) {
  // Convert copernicoData to string but remove the brackets
  let jsonStr = JSON.stringify(copernicoData, null, 2);
  // Remove first [ and last ]
  jsonStr = jsonStr.substring(1, jsonStr.length - 1);
  
  // Construct new file content: content before '];', then a comma, then our new data, then '];'
  const newData = data.substring(0, lastIndex) + ',\\n' + jsonStr + '\\n];';
  fs.writeFileSync(targetFile, newData);
  console.log('Successfully appended Copernico to COURSE_DATA');
} else {
  console.error('Could not find ]; in courseData.js');
}
