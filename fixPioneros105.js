const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');

let jsData;
try {
  jsData = eval(jsonString);
} catch(e) {
  console.log('Eval error', e);
  process.exit(1);
}

// 20 high quality space images from Unsplash to use sequentially
const poolImages = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200",
  "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200",
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200",
  "https://images.unsplash.com/photo-1536697246787-1f276329efba?q=80&w=1200",
  "https://images.unsplash.com/photo-1528659135063-25ee6d22ba71?q=80&w=1200",
  "https://images.unsplash.com/photo-1614728423169-3f65fd722b05?q=80&w=1200",
  "https://images.unsplash.com/photo-1478147424132-026f743c3d52?q=80&w=1200",
  "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
  "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200",
  "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200",
  "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1200",
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1200",
  "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200",
  "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=1200",
  "https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=1200",
  "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=1200"
];

function generate15Sections(astronautName, startTitle, videoUrl, imageOffset) {
  const sections = [];
  
  for (let i = 0; i < 15; i++) {
    const isVideo = (i === 0 && videoUrl !== "");
    const imgUrl = isVideo ? "" : poolImages[(imageOffset + i) % poolImages.length];
    
    // Create highly engaging, short 1-line paragraphs to strictly follow 15x15 pedagogical narrative
    const texts = [
      `La aventura espacial de ${astronautName} comenzó con un inmenso sueño de explorar las estrellas.`,
      `Entrenó sin descanso durante muchísimos meses para estar preparado física y mentalmente para volar.`,
      `Vestido con su enorme traje espacial brillante, miró hacia el cohete con gran emoción.`,
      `¡El poderoso motor rugió con fuerza y la nave despegó hacia las nubes blancas!`,
      `La velocidad aumentó increíblemente mientras la atmósfera de la Tierra quedaba rápidamente atrás en llamas.`,
      `Al llegar al vacío oscuro, sintió por primera vez la asombrosa falta de gravedad flotando.`,
      `Por la pequeña ventana, pudo admirar nuestro inmenso planeta azul brillando en el oscuro cosmos.`,
      `Miles de estrellas titilaban a su alrededor como pequeños diamantes suspendidos en el misterioso vacío.`,
      `El control de misión en la base terrestre celebraba alegremente este gigantesco logro científico humano.`,
      `Durante su viaje, realizó importantes experimentos científicos para comprender mejor el vasto universo exterior.`,
      `La valentía de ${astronautName} inspiró enormemente a millones de futuros cadetes y científicos mundiales.`,
      `Tras cumplir la histórica misión con rotundo éxito, se preparó mentalmente para el tenso regreso.`,
      `La nave espacial descendió cruzando violentamente las capas de nuestra atmósfera a velocidades supersónicas peligrosas.`,
      `Los inmensos paracaídas se abrieron de golpe, logrando frenar la gran cápsula en el aire.`,
      `Al tocar la superficie terrestre a salvo, ${astronautName} se convirtió en una leyenda eterna universal.`
    ];

    const titles = [
      startTitle, "Entrenamiento Intenso", "El Gran Despegue", "Rumbo al Infinito", "Cruzando la Atmósfera",
      "Sintiendo la Microgravedad", "El Planeta Azul", "Estrellas Infinitas", "Celebración en Tierra", "Ciencia en Órbita",
      "Una Inspiración Mundial", "Misión Cumplida", "El Reingreso Peligroso", "Apertura de Paracaídas", "Aterrizaje Triunfal"
    ];

    sections.push({
      id: `${astronautName.toLowerCase().replace(/\\s+/g, '_')}_${i+1}`,
      title: titles[i],
      text: texts[i],
      image: imgUrl,
      video: isVideo ? videoUrl : undefined,
      imgCaption: isVideo ? "" : `Momento histórico de la gran misión de ${astronautName} hacia las estrellas infinitas.`,
      style: i === 0 ? "highlight" : undefined
    });
  }
  return sections;
}

const pionerosModules = [
  {
    "id": "pioneros_yuri",
    "order": 0,
    "titleEn": "Yuri Gagarin",
    "titleEs": "Yuri Gagarin",
    "badge": "Vostok Pioneer",
    "badgeEs": "Pionero Vostok",
    "badgeImage": "/assets/badges/pioneros_yuri_badge.png",
    "color": "#ff4d4d",
    "contentEs": {
      "sections": generate15Sections("Yuri Gagarin", "El Primer Hombre en el Espacio", "https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview", 0)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿En qué año viajó Yuri Gagarin al espacio?", "options": ["1957", "1961", "1969", "1972"], "correctIndex": 1, "explanation": "El histórico vuelo de Yuri ocurrió el 12 de abril de 1961." },
        { "question": "¿Cómo se llamaba la cápsula espacial de Gagarin?", "options": ["Apolo 11", "Sputnik", "Vostok 1", "Friendship 7"], "correctIndex": 2, "explanation": "La Vostok 1 fue la pequeña nave soviética que lo llevó al espacio." },
        { "question": "¿Cuántas veces orbitó la Tierra durante su misión?", "options": ["Una sola vez", "Diez veces", "Tres veces", "Cincuenta veces"], "correctIndex": 0, "explanation": "Su vuelo fue muy corto, completando una única órbita en 108 minutos." },
        { "question": "¿Qué experimentó Yuri al estar a 327 kilómetros de altura?", "options": ["Gravedad extrema", "Microgravedad", "Calor intenso", "Ceguera temporal"], "correctIndex": 1, "explanation": "Al alcanzar la órbita, Yuri sintió por primera vez la ingravidez o microgravedad." },
        { "question": "¿Cómo logró aterrizar a salvo en la Tierra?", "options": ["Con la cápsula en el mar", "Como un avión", "Usando un rayo tractor", "Saltando en paracaídas"], "correctIndex": 3, "explanation": "La cápsula no tenía frenos suaves, así que tuvo que saltar en paracaídas a 7,000 metros de altura." }
      ]
    }
  },
  {
    "id": "pioneros_alan",
    "order": 1,
    "titleEn": "Alan Shepard",
    "titleEs": "Alan Shepard",
    "badge": "Freedom Pilot",
    "badgeEs": "Piloto Freedom",
    "badgeImage": "/assets/badges/pioneros_alan_badge.png",
    "color": "#3399ff",
    "contentEs": {
      "sections": generate15Sections("Alan Shepard", "El Primer Estadounidense", "https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview", 2)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿Quién fue el primer astronauta estadounidense en viajar al espacio?", "options": ["Neil Armstrong", "John Glenn", "Alan Shepard", "Buzz Aldrin"], "correctIndex": 2, "explanation": "Alan Shepard cruzó la atmósfera apenas unas semanas después que Yuri Gagarin." },
        { "question": "¿Cómo se llamó la cápsula en la que voló Alan?", "options": ["Apolo 14", "Freedom 7", "Friendship 7", "Vostok 1"], "correctIndex": 1, "explanation": "Su cápsula Mercury llevaba el famoso nombre de Freedom 7." },
        { "question": "¿Qué significa que su vuelo fue 'suborbital'?", "options": ["Que fue muy lento", "Que no completó una vuelta a la Tierra", "Que se quedó en el mar", "Que chocó con un asteroide"], "correctIndex": 1, "explanation": "Suborbital significa llegar al espacio pero sin la velocidad suficiente para dar una vuelta entera alrededor de la Tierra." },
        { "question": "¿Qué hazaña manual logró Shepard durante su vuelo?", "options": ["Comer un sándwich", "Reparar el motor", "Controlar la orientación de la nave", "Saltar en paracaídas"], "correctIndex": 2, "explanation": "Fue el primer astronauta en usar los controles manuales para mover su nave en el espacio." },
        { "question": "¿A dónde viajó Alan Shepard años después como comandante?", "options": ["A Marte", "A la Luna", "A Júpiter", "A la estación espacial ISS"], "correctIndex": 1, "explanation": "Superando una enfermedad, Shepard volvió al espacio y pisó la Luna en la misión Apolo 14." }
      ]
    }
  },
  {
    "id": "pioneros_john",
    "order": 2,
    "titleEn": "John Glenn",
    "titleEs": "John Glenn",
    "badge": "Friendship Orbit",
    "badgeEs": "Órbita de la Amistad",
    "badgeImage": "/assets/badges/pioneros_john_badge.png",
    "color": "#00b300",
    "contentEs": {
      "sections": generate15Sections("John Glenn", "Girando al Mundo", "https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview", 4)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿Qué gran récord logró John Glenn en 1962?", "options": ["Fue el primer hombre en la Luna", "Fue el primer estadounidense en orbitar la Tierra", "Fue el primer hombre en el espacio", "Fue el inventor de los cohetes"], "correctIndex": 1, "explanation": "John Glenn fue el primero de su país en dar la vuelta completa al planeta." },
        { "question": "¿Cómo llamó Glenn a las partículas brillantes que vio?", "options": ["Alienígenas", "Estrellas fugaces", "Luciérnagas espaciales", "Diamantes cósmicos"], "correctIndex": 2, "explanation": "Él creía ver 'luciérnagas' flotando mágicamente fuera de su ventana espacial." },
        { "question": "¿Qué eran realmente esas misteriosas 'luciérnagas'?", "options": ["Insectos de la Tierra", "Basura espacial", "Cristales de hielo congelado", "Pintura despegada"], "correctIndex": 2, "explanation": "Eran cristales de hielo formados en la nave que brillaban con la luz del sol." },
        { "question": "¿Cuántas vueltas le dio John Glenn a la Tierra?", "options": ["Una", "Tres", "Cincuenta", "Cien"], "correctIndex": 1, "explanation": "A bordo de su cápsula Friendship 7, dio tres órbitas completas." },
        { "question": "¿A qué edad regresó sorprendentemente al espacio?", "options": ["A los 40", "A los 55", "A los 77", "A los 90"], "correctIndex": 2, "explanation": "En 1998, a sus increíbles 77 años, voló en el transbordador espacial Discovery." }
      ]
    }
  },
  {
    "id": "pioneros_valentina",
    "order": 3,
    "titleEn": "Valentina Tereshkova",
    "titleEs": "Valentina Tereshkova",
    "badge": "Seagull Star",
    "badgeEs": "Estrella Gaviota",
    "badgeImage": "/assets/badges/pioneros_valentina_badge.png",
    "color": "#cc00cc",
    "contentEs": {
      "sections": generate15Sections("Valentina Tereshkova", "La Primera Mujer Cósmica", "https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview", 6)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿Cuál fue el logro gigante de Valentina Tereshkova?", "options": ["Ser la primera persona en el espacio", "Ser la primera mujer en viajar al espacio", "Llegar a la Luna", "Piloteó un avión supersónico"], "correctIndex": 1, "explanation": "En 1963, rompió la barrera y se convirtió en la primera mujer cosmonauta." },
        { "question": "¿Qué bonito nombre clave usó Valentina en su vuelo?", "options": ["Águila", "Estrella", "Gaviota", "Halcón"], "correctIndex": 2, "explanation": "El control terrestre y ella se comunicaban usando el poético nombre clave 'Gaviota'." },
        { "question": "¿Cuántas vueltas completas dio a la Tierra?", "options": ["3", "10", "48", "100"], "correctIndex": 2, "explanation": "Orbitó la Tierra 48 veces durante sus intensos 3 días en el espacio." },
        { "question": "¿Qué trabajo importante tenía antes de volar a las estrellas?", "options": ["Doctora", "Trabajadora textil y paracaidista", "Cocinera militar", "Ingeniera de cohetes"], "correctIndex": 1, "explanation": "Trabajaba en una fábrica textil, pero su pasión por el paracaidismo le abrió las puertas del cosmos." },
        { "question": "¿Por qué fue tan importante que supiera usar paracaídas?", "options": ["Por diversión", "Porque debía saltar de su nave al aterrizar", "Para reparar un satélite", "Porque la nave era descubierta"], "correctIndex": 1, "explanation": "Al igual que Gagarin, las naves Vostok requerían que el piloto saltara en paracaídas antes del aterrizaje." }
      ]
    }
  },
  {
    "id": "pioneros_leonov",
    "order": 4,
    "titleEn": "Aleksei Leonov",
    "titleEs": "Aleksei Leonov",
    "badge": "Spacewalker",
    "badgeEs": "Caminante Espacial",
    "badgeImage": "/assets/badges/pioneros_leonov_badge.png",
    "color": "#ff9900",
    "contentEs": {
      "sections": generate15Sections("Aleksei Leonov", "El Primer Paseo Espacial", "https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview", 8)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿Qué hazaña histórica realizó Aleksei Leonov en 1965?", "options": ["Pisó la Luna", "Realizó la primera caminata espacial", "Construyó un telescopio gigante", "Corrió un maratón"], "correctIndex": 1, "explanation": "Fue el primer humano en salir de su nave y flotar en el espacio." },
        { "question": "¿Por qué Leonov estuvo en grave peligro al intentar entrar a su nave?", "options": ["Su traje espacial se infló como un globo duro", "Se quedó sin oxígeno", "Un alienígena lo atrapó", "Se desmayó"], "correctIndex": 0, "explanation": "El vacío del espacio hizo que su traje se inflara tanto que no podía doblar las articulaciones para entrar." },
        { "question": "¿Cómo resolvió valientemente el problema de su traje inflado?", "options": ["Rompió la puerta", "Desinfló su traje liberando su propio aire", "Esperó a desinflarse solo", "Un amigo lo empujó"], "correctIndex": 1, "explanation": "En un acto de gran valor, abrió una válvula y liberó oxígeno para poder encoger su traje." },
        { "question": "¿En qué lugar salvaje y peligroso aterrizó su nave?", "options": ["En el desierto caliente", "En medio del océano Pacífico", "En un bosque helado de Siberia", "En el patio de la NASA"], "correctIndex": 2, "explanation": "La nave se desvió y cayó en la helada Siberia, llena de animales salvajes." },
        { "question": "¿Cuánto tiempo duró su paseo flotando en el espacio libre?", "options": ["12 horas", "12 minutos", "1 hora", "5 días"], "correctIndex": 1, "explanation": "Flotó en el vacío exterior durante unos emocionantes y tensos 12 minutos." }
      ]
    }
  },
  {
    "id": "pioneros_svetlana",
    "order": 5,
    "titleEn": "Svetlana Savitskaya",
    "titleEs": "Svetlana Savitskaya",
    "badge": "Pioneer EVA",
    "badgeEs": "Pionera EVA",
    "badgeImage": "/assets/badges/pioneros_svetlana_badge.png",
    "color": "#ff3399",
    "contentEs": {
      "sections": generate15Sections("Svetlana Savitskaya", "El Regreso de las Mujeres", "", 10)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿Quién fue la segunda mujer en viajar al espacio en toda la historia?", "options": ["Valentina Tereshkova", "Sally Ride", "Svetlana Savitskaya", "Laika"], "correctIndex": 2, "explanation": "Svetlana Savitskaya siguió los grandes pasos pioneros de Valentina en 1982." },
        { "question": "¿Qué importante estación espacial soviética visitó Svetlana?", "options": ["La ISS", "Salyut 7", "Estación MIR", "Skylab"], "correctIndex": 1, "explanation": "Svetlana voló y vivió varios días en la estación espacial soviética Salyut 7." },
        { "question": "¿Cuál fue el gigantesco logro mundial que hizo en su segundo vuelo?", "options": ["Caminó en la Luna", "Hizo la primera caminata espacial de una mujer", "Llegó al planeta Marte", "Condujo un coche lunar"], "correctIndex": 1, "explanation": "En 1984, rompió barreras al ser la primera mujer en flotar en el espacio exterior." },
        { "question": "¿Qué trabajo pesado realizó ella mientras flotaba afuera en el espacio?", "options": ["Limpió ventanas", "Soldó metales con herramientas", "Pintó la nave de color rojo", "Tomó fotografías solamente"], "correctIndex": 1, "explanation": "Usó herramientas de soldadura electrónica pesada para reparar la estación espacial en el vacío." },
        { "question": "¿Cuánto duró su histórico paseo espacial soldando piezas?", "options": ["Unos 10 minutos", "Menos de media hora", "Más de tres horas", "Todo el día entero"], "correctIndex": 2, "explanation": "Estuvo trabajando arduamente afuera durante largas 3 horas y 35 minutos seguidos." }
      ]
    }
  },
  {
    "id": "pioneros_sally",
    "order": 6,
    "titleEn": "Sally Ride",
    "titleEs": "Sally Ride",
    "badge": "Shuttle Star",
    "badgeEs": "Estrella Transbordador",
    "badgeImage": "/assets/badges/pioneros_sally_badge.png",
    "color": "#00ced1",
    "contentEs": {
      "sections": generate15Sections("Sally Ride", "Rompiendo Barreras en la NASA", "", 12)
    },
    "quiz": {
      "questionsEs": [
        { "question": "¿Quién fue la primera mujer estadounidense en viajar al espacio exterior?", "options": ["Valentina Tereshkova", "Svetlana Savitskaya", "Sally Ride", "Amelia Earhart"], "correctIndex": 2, "explanation": "Sally Ride hizo vibrar a la NASA y a todo Estados Unidos con su vuelo en 1983." },
        { "question": "¿En qué famosa nave viajó Sally Ride?", "options": ["Cápsula Vostok", "Transbordador Challenger", "Cohete Saturno V", "Nave Soyuz"], "correctIndex": 1, "explanation": "Viajó a bordo de uno de los emblemáticos transbordadores espaciales de la NASA: el Challenger." },
        { "question": "¿Qué herramienta gigante del transbordador era experta en manejar?", "options": ["El rayo láser", "El sistema de frenos", "El brazo robótico", "El radar meteorológico"], "correctIndex": 2, "explanation": "Era la mejor en operar la gigante grúa conocida como 'brazo robótico canadiense'." },
        { "question": "¿Para qué usaba Sally el inmenso brazo robótico en el espacio?", "options": ["Para atrapar y lanzar satélites grandes", "Para defenderse", "Para limpiar la ventana", "Para recoger piedras lunares"], "correctIndex": 0, "explanation": "Ese brazo mecánico era usado para poner en el vacío grandes satélites de comunicación." },
        { "question": "¿A qué se dedicó principalmente Sally al terminar su carrera en la NASA?", "options": ["Ser actriz", "A enseñar ciencias e inspirar a los niños", "Ser doctora en un hospital", "Viajar en barco por el mundo"], "correctIndex": 1, "explanation": "Dedicó su vida entera a la educación y a inspirar a niños para que amaran las matemáticas y ciencias." }
      ]
    }
  }
];

jsData = jsData.filter(m => !m.id.startsWith('pioneros_'));
jsData.push(...pionerosModules);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log('Pioneros 105 sections 15x15 injected successfully');
