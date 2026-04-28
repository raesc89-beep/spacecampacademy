const fs = require('fs');

function rewriteWormhole() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const jsonString = content.substring(startIndex).replace(/;\s*$/, '');
  let jsData = eval(jsonString);

  const idx = jsData.findIndex(c => c.id === 'agujeros_gusano_er');
  if (idx === -1) {
    console.log("No se encontró el curso agujeros_gusano_er");
    return;
  }

  const course = jsData[idx];

  // Nuevo contenido estructurado exactamente según el temario del usuario
  course.contentEs = {
    overview: "Exploración teórica de los puentes de Einstein-Rosen y la física de los agujeros de gusano.",
    sections: [
      {
        id: "er_sec_1",
        title: "¿Qué es un Puente Einstein-Rosen?",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Worm3.jpg/800px-Worm3.jpg",
        text: [
          "Un puente de Einstein-Rosen, comúnmente conocido como agujero de gusano, es una característica topológica hipotética del espacio-tiempo que crearía un atajo entre dos puntos del universo.",
          "Imagina el universo como una hoja de papel plana. Si quieres ir de un extremo a otro, normalmente tendrías que viajar por toda la superficie.",
          "Sin embargo, si doblas el papel por la mitad, ambos extremos se tocan. Un agujero de gusano es el 'túnel' que perfora ese doblez, conectando dos lugares increíblemente lejanos en un instante.",
          "Desde un punto de vista matemático, son soluciones válidas a las ecuaciones de campo de la Relatividad General de Albert Einstein.",
          "Un agujero de gusano consta de dos bocas (que podrían ser esféricas) conectadas por una garganta o túnel.",
          "Si alguien pudiera cruzar la garganta de forma segura, el viajero espacial podría cubrir distancias de millones de años luz en un tiempo mínimo.",
          "Es crucial entender que, hasta la fecha, los agujeros de gusano son estructuras puramente teóricas; nunca se ha observado ninguno en el cosmos.",
          "Además, las matemáticas sugieren que un agujero de gusano no solo podría conectar dos regiones distantes del espacio, sino también diferentes momentos en el tiempo.",
          "Para que un agujero de gusano sea transitable, su garganta debe mantenerse abierta, un desafío inmenso debido a la fuerza gravitacional extrema que tendería a colapsarlo.",
          "A pesar de no haber sido descubiertos, siguen siendo uno de los conceptos más fascinantes para la física teórica y la astrofísica moderna."
        ],
        style: "normal"
      },
      {
        id: "er_sec_2",
        title: "La historia de su teoría",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg",
        text: [
          "El concepto de agujero de gusano nació en 1916, poco después de que Albert Einstein publicara su Teoría de la Relatividad General.",
          "El físico austriaco Ludwig Flamm, al revisar la solución del físico Karl Schwarzschild a las ecuaciones de Einstein, se dio cuenta de que existía una segunda solución posible.",
          "Flamm describió un escenario teórico donde las matemáticas permitían la existencia de un 'túnel' o conducto que conectaba dos regiones distintas del espacio-tiempo.",
          "Sin embargo, fue en 1935 cuando Albert Einstein y su colega, el físico Nathan Rosen, profundizaron matemáticamente en esta idea.",
          "Einstein y Rosen publicaron un artículo donde utilizaron la teoría de la relatividad general para proponer la existencia de 'puentes' en el espacio.",
          "El propósito original de Einstein y Rosen no era proponer viajes interestelares, sino intentar explicar las partículas elementales (como electrones) en términos de la relatividad.",
          "A estas estructuras teóricas las bautizaron matemáticamente como 'Puentes de Einstein-Rosen'.",
          "Fue mucho más tarde, en 1957, cuando el físico teórico estadounidense John Archibald Wheeler acuñó el famoso término 'agujero de gusano' (wormhole).",
          "Wheeler hizo la analogía de un gusano que mastica un túnel a través de una manzana, creando un atajo directo de un lado a otro en lugar de caminar por la piel exterior.",
          "Desde entonces, el concepto pasó de ser una mera curiosidad matemática a un área seria de estudio cosmológico y física cuántica."
        ],
        style: "highlight"
      },
      {
        id: "er_sec_3",
        title: "¿Cómo funciona un agujero de gusano?",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/LorentzianWormhole.jpg/800px-LorentzianWormhole.jpg",
        text: [
          "El funcionamiento de un agujero de gusano transitable requiere manipular el tejido mismo del espacio y el tiempo de maneras que hoy superan nuestra tecnología.",
          "Matemáticamente, la boca de un agujero de gusano funcionaría como un portal tridimensional (una esfera) en lugar del túnel bidimensional que se suele dibujar.",
          "El principal problema físico es la estabilidad. Las ecuaciones muestran que los puentes de Einstein-Rosen originales son extremadamente inestables.",
          "Cualquier perturbación, incluso la mera presencia de un fotón de luz o una pequeña nave espacial, causaría que el túnel colapsara y se cerrara instantáneamente.",
          "Para que un agujero de gusano funcione como medio de transporte, su 'garganta' debe mantenerse abierta por la fuerza.",
          "Aquí es donde entra la física teórica avanzada: la única forma conocida matemáticamente de mantenerlo abierto es llenando el túnel con 'Materia Exótica'.",
          "La materia exótica no es antimateria ni materia oscura. Es una sustancia hipotética que posee densidad de energía negativa y presión negativa.",
          "Esta energía negativa crearía una fuerza de repulsión gravitacional masiva, empujando las paredes del túnel hacia afuera y evitando que la gravedad lo aplaste.",
          "Si se lograra estabilizar, una nave entraría por una boca esférica, viajaría una corta distancia física dentro de la garganta repulsiva, y saldría por la otra boca en un rincón distante del universo.",
          "A pesar de ser teóricamente posible, nadie sabe si la materia exótica existe en cantidades suficientes, ni cómo una civilización podría recolectarla y manipularla."
        ],
        style: "normal"
      },
      {
        id: "er_contacto_sagan",
        title: "La Visión de Carl Sagan y 'Contacto'",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Carl_Sagan_Planetary_Society.JPG",
        text: [
          "En 1985, el famoso astrónomo y divulgador científico Carl Sagan estaba escribiendo su novela 'Contacto' (que luego sería una exitosa película).",
          "Sagan necesitaba un mecanismo realista y científicamente plausible para que su protagonista viajara a la estrella Vega en poco tiempo.",
          "Al principio, pensó en usar un agujero negro, pero pronto se dio cuenta de que la ciencia dictaba que cualquier viajero sería destruido por la espaguetización.",
          "Buscando rigor absoluto, Sagan consultó a su amigo, el brillante físico teórico Kip Thorne (quien más tarde ganaría el Premio Nobel).",
          "Thorne analizó las ecuaciones de la Relatividad General y le explicó a Sagan que un agujero negro no funcionaría, pero un 'Agujero de Gusano Transitable' sí podría hacerlo.",
          "Fue Kip Thorne, inspirado por la pregunta de Sagan, quien descubrió y formuló la teoría de que se requeriría 'Materia Exótica' (energía negativa) para mantener el túnel abierto.",
          "En la novela y la película 'Contacto', la humanidad recibe planos alienígenas para construir una máquina que genera uno de estos agujeros de gusano artificiales.",
          "La máquina crea una geometría espaciotemporal estable que permite a la protagonista cruzar el cosmos casi instantáneamente.",
          "La pregunta de Carl Sagan para su obra de ciencia ficción desencadenó una avalancha de nuevas investigaciones reales sobre astrofísica.",
          "Gracias a 'Contacto', los agujeros de gusano pasaron a ser una rama seria y formal de investigación para físicos teóricos en todo el mundo."
        ],
        style: "highlight"
      }
    ]
  };

  // Actualizar los Quizzes que eran un desastre total de palabras sin sentido
  course.quizEs = [
    {
      q: "¿Qué analogía utilizó el físico John Archibald Wheeler para acuñar el término 'agujero de gusano' en 1957?",
      options: [
        "Un tren viajando a través de un túnel oscuro bajo la montaña.",
        "Un gusano masticando un agujero directamente a través de una manzana para llegar al otro lado.",
        "Un pez saltando fuera del agua para esquivar un remolino."
      ],
      a: 1
    },
    {
      q: "Según la física teórica, ¿qué se requiere para que un agujero de gusano no colapse y se mantenga abierto permitiendo el viaje espacial?",
      options: [
        "Escudos de titanio reforzado y propulsión nuclear avanzada.",
        "Materia Oscura para crear un campo gravitatorio masivo.",
        "Materia Exótica con densidad de energía y presión negativas que generen repulsión gravitacional."
      ],
      a: 2
    },
    {
      q: "¿A qué físico teórico y futuro Premio Nobel consultó Carl Sagan para asegurar el rigor científico del viaje espacial en su novela 'Contacto'?",
      options: [
        "A Kip Thorne.",
        "A Stephen Hawking.",
        "A Neil deGrasse Tyson."
      ],
      a: 0
    },
    {
      q: "¿Cuál fue el objetivo original de Albert Einstein y Nathan Rosen al publicar su teoría matemática sobre los puentes espaciales en 1935?",
      options: [
        "Proponer un método para que la humanidad pudiera viajar a otras galaxias.",
        "Intentar explicar las partículas elementales usando la Teoría de la Relatividad General.",
        "Refutar las leyes de la gravedad de Isaac Newton."
      ],
      a: 1
    }
  ];

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Curso de agujeros de gusano reescrito perfectamente con información científica y literaria coherente.");
}

rewriteWormhole();
