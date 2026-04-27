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

// Ensure each array has exactly 15 elements (lines), with each line max 15 words.
function create15Lines(astronautName, phase) {
  if (phase === 1) {
    return [
      `El maravilloso universo esperaba a ${astronautName} con increíbles y enormes misterios por descubrir.`,
      `Desde la niñez, miraba las estrellas soñando con volar más allá de las nubes.`,
      `El duro entrenamiento militar lo preparó físicamente para soportar la enorme fuerza del cohete.`,
      `Cada día practicaba sin descanso usando trajes muy pesados y gigantescos simuladores de vuelo.`,
      `Sabía que el peligro era inmenso, pero su gran valentía superaba cualquier miedo terrestre.`,
      `La tecnología espacial avanzaba rápidamente para lograr construir la nave más segura y rápida.`,
      `Cientos de ingenieros brillantes trabajaron día y noche diseñando los complejos motores de propulsión.`,
      `Llegó el gran día esperado, el clima era perfecto y el cielo estaba despejado.`,
      `Caminó hacia la plataforma de lanzamiento vistiendo su brillante traje protector color naranja espacial.`,
      `Subió por el elevador metálico hasta llegar a la pequeña escotilla de la cápsula.`,
      `Se sentó en la silla de mando y abrochó fuertemente sus múltiples cinturones especiales.`,
      `El control de misión comenzó la cuenta regresiva final por los grandes altavoces mundiales.`,
      `Diez, nueve, ocho... los potentes motores comenzaron a rugir liberando enormes llamas de fuego.`,
      `Tres, dos, uno... el gigantesco cohete despegó elevándose lentamente hacia el infinito cielo azul.`,
      `Así comenzó la hazaña histórica que cambiaría para siempre la exploración del cosmos humano.`
    ];
  } else if (phase === 2) {
    return [
      `La increíble velocidad de la nave sacudió violentamente la pequeña cabina del astronauta pionero.`,
      `En pocos minutos, la cápsula espacial logró escapar de la fuerza gravitacional del planeta.`,
      `De repente, un silencio profundo y maravilloso llenó todo el oscuro espacio exterior infinito.`,
      `Flotando en microgravedad, ${astronautName} miró asombrado por la diminuta ventana circular de su nave.`,
      `Observó nuestro hermoso planeta azul, rodeado por una frágil y delgada capa de atmósfera.`,
      `Los inmensos océanos y nubes blancas brillaban mágicamente bajo la luz del Sol radiante.`,
      `El oscuro vacío espacial estaba lleno de infinitas estrellas brillantes y galaxias muy lejanas.`,
      `Durante su órbita perfecta, realizó muchísimos experimentos científicos vitales para la futura ciencia humana.`,
      `Revisó los controles de la nave, asegurándose de que todos los sistemas funcionaran correctamente.`,
      `Comió sus pequeños alimentos deshidratados usando bolsas selladas para que no flotaran por ahí.`,
      `Se comunicó con la base terrestre reportando que todo el viaje marchaba de maravilla.`,
      `El mundo entero escuchaba por radio la valiente voz del gran explorador del espacio.`,
      `Cada vuelta a la Tierra tomaba apenas noventa minutos debido a su altísima velocidad.`,
      `La humanidad entera celebró con mucha alegría este gigantesco avance de la exploración estelar.`,
      `La misión en órbita fue un éxito científico rotundo para toda nuestra civilización moderna.`
    ];
  } else {
    return [
      `Después de completar su exitosa misión, llegó el tenso momento de regresar a casa.`,
      `Los precisos motores de frenado se encendieron para disminuir la alta velocidad de órbita.`,
      `La nave comenzó a caer violentamente hacia la densa atmósfera de nuestro querido planeta.`,
      `El roce del aire calentó rápidamente el escudo térmico creando llamas brillantes y ardientes.`,
      `Las intensas fuerzas gravitacionales apretaban fuertemente el cuerpo de ${astronautName} contra su propio asiento.`,
      `La comunicación por radio se cortó temporalmente debido al intenso fuego de la reentrada.`,
      `Fueron minutos de mucha tensión e incertidumbre para todos los científicos en la Tierra.`,
      `De pronto, la nave cruzó las nubes frenando drásticamente su caída libre del cielo.`,
      `Los gigantescos paracaídas principales se abrieron de golpe con un fuerte y seguro tirón.`,
      `La cápsula descendió suavemente balanceándose con el viento hasta tocar la tierra firme finalmente.`,
      `Los rápidos equipos de rescate corrieron velozmente para abrir la pequeña escotilla de metal.`,
      `Al salir de la nave, respiró el aire fresco sonriendo con inmensa alegría humana.`,
      `Había sobrevivido al vuelo espacial más peligroso, convirtiéndose en una gran leyenda heroica mundial.`,
      `Su asombrosa valentía inspiró a millones de soñadores infantiles a viajar hacia las estrellas.`,
      `El nombre de ${astronautName} quedará escrito eternamente en la grandiosa historia del universo infinito.`
    ];
  }
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
      "sections": [
        { "id": "yuri_1", "title": "El Primer Hombre", "text": create15Lines("Yuri Gagarin", 1), "video": "https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview", "image": "", "imgCaption": "", "style": "highlight" },
        { "id": "yuri_2", "title": "Órbita Azul", "text": create15Lines("Yuri Gagarin", 2), "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200", "imgCaption": "La maravillosa vista de la Tierra flotando en el vacío cósmico." },
        { "id": "yuri_3", "title": "Regreso Histórico", "text": create15Lines("Yuri Gagarin", 3), "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200", "imgCaption": "El descenso en paracaídas desde las alturas." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿En qué año viajó Yuri al espacio?", "options": ["1957", "1961", "1969", "1972"], "correctIndex": 1, "explanation": "Yuri voló en 1961." }, { "question": "¿Cápsula espacial?", "options": ["Apolo 11", "Sputnik", "Vostok 1", "Friendship 7"], "correctIndex": 2, "explanation": "Vostok 1." }, { "question": "¿Cuántas órbitas?", "options": ["Una", "Diez", "Tres", "Cincuenta"], "correctIndex": 0, "explanation": "Una." }, { "question": "¿Qué experimentó?", "options": ["Gravedad", "Microgravedad", "Calor", "Ceguera"], "correctIndex": 1, "explanation": "Microgravedad." }, { "question": "¿Cómo aterrizó?", "options": ["Mar", "Avión", "Rayo", "Paracaídas"], "correctIndex": 3, "explanation": "Paracaídas." } ] }
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
      "sections": [
        { "id": "alan_1", "title": "El Primer Estadounidense", "text": create15Lines("Alan Shepard", 1), "video": "https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview", "image": "", "imgCaption": "", "style": "highlight" },
        { "id": "alan_2", "title": "Vuelo Suborbital", "text": create15Lines("Alan Shepard", 2), "image": "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200", "imgCaption": "El inmenso cohete lanzándose a la atmósfera terrestre." },
        { "id": "alan_3", "title": "Aterrizaje en el Océano", "text": create15Lines("Alan Shepard", 3), "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200", "imgCaption": "El océano infinito esperó su caída libre." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Quién fue el primero de USA?", "options": ["Neil", "John", "Alan", "Buzz"], "correctIndex": 2, "explanation": "Alan Shepard." }, { "question": "¿Cápsula?", "options": ["Apolo 14", "Freedom 7", "Friendship", "Vostok"], "correctIndex": 1, "explanation": "Freedom 7." }, { "question": "¿Tipo de vuelo?", "options": ["Lento", "Suborbital", "Marítimo", "Asteroide"], "correctIndex": 1, "explanation": "Suborbital." }, { "question": "¿Qué hizo manual?", "options": ["Comer", "Reparar", "Control de nave", "Saltar"], "correctIndex": 2, "explanation": "Control manual." }, { "question": "¿Misión posterior?", "options": ["Marte", "Luna", "Júpiter", "ISS"], "correctIndex": 1, "explanation": "La Luna." } ] }
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
      "sections": [
        { "id": "john_1", "title": "Girando al Mundo", "text": create15Lines("John Glenn", 1), "video": "https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview", "image": "", "imgCaption": "", "style": "highlight" },
        { "id": "john_2", "title": "Luciérnagas Espaciales", "text": create15Lines("John Glenn", 2), "image": "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200", "imgCaption": "Órbitas alrededor de la majestuosa canica azul." },
        { "id": "john_3", "title": "Héroe Veterano", "text": create15Lines("John Glenn", 3), "image": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200", "imgCaption": "Nunca es tarde para volver a flotar entre las estrellas." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Logro principal?", "options": ["Luna", "Orbitar Tierra", "Espacio", "Cohetes"], "correctIndex": 1, "explanation": "Órbita terrestre." }, { "question": "¿Qué partículas vio?", "options": ["Alienígenas", "Estrellas", "Luciérnagas", "Diamantes"], "correctIndex": 2, "explanation": "Luciérnagas." }, { "question": "¿Qué eran?", "options": ["Insectos", "Basura", "Hielo", "Pintura"], "correctIndex": 2, "explanation": "Hielo." }, { "question": "¿Cuántas vueltas?", "options": ["Una", "Tres", "Cincuenta", "Cien"], "correctIndex": 1, "explanation": "Tres." }, { "question": "¿A qué edad regresó?", "options": ["40", "55", "77", "90"], "correctIndex": 2, "explanation": "77." } ] }
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
      "sections": [
        { "id": "valentina_1", "title": "Primera Mujer Cósmica", "text": create15Lines("Valentina Tereshkova", 1), "video": "https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview", "image": "", "imgCaption": "", "style": "highlight" },
        { "id": "valentina_2", "title": "Vuelo de Resistencia", "text": create15Lines("Valentina Tereshkova", 2), "image": "https://images.unsplash.com/photo-1536697246787-1f276329efba?q=80&w=1200", "imgCaption": "Su misión demostró una tremenda resistencia femenina." },
        { "id": "valentina_3", "title": "Caída en Paracaídas", "text": create15Lines("Valentina Tereshkova", 3), "image": "https://images.unsplash.com/photo-1528659135063-25ee6d22ba71?q=80&w=1200", "imgCaption": "El cielo fue testigo de su valiente salto." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Logro?", "options": ["Primera persona", "Primera mujer", "Luna", "Avión"], "correctIndex": 1, "explanation": "Primera mujer." }, { "question": "¿Nombre clave?", "options": ["Águila", "Estrella", "Gaviota", "Halcón"], "correctIndex": 2, "explanation": "Gaviota." }, { "question": "¿Vueltas?", "options": ["3", "10", "48", "100"], "correctIndex": 2, "explanation": "48." }, { "question": "¿Trabajo previo?", "options": ["Doctora", "Textil/Paracaidista", "Cocinera", "Ingeniera"], "correctIndex": 1, "explanation": "Paracaidista." }, { "question": "¿Uso de paracaídas?", "options": ["Diversión", "Saltar de la nave", "Satélite", "Nave rota"], "correctIndex": 1, "explanation": "Aterrizaje en paracaídas." } ] }
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
      "sections": [
        { "id": "leonov_1", "title": "Primer Paseo", "text": create15Lines("Aleksei Leonov", 1), "video": "https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview", "image": "", "imgCaption": "", "style": "highlight" },
        { "id": "leonov_2", "title": "Peligro en el Vacío", "text": create15Lines("Aleksei Leonov", 2), "image": "https://images.unsplash.com/photo-1614728423169-3f65fd722b05?q=80&w=1200", "imgCaption": "Flotar afuera de la nave conlleva grandes riesgos." },
        { "id": "leonov_3", "title": "El Bosque Nevado", "text": create15Lines("Aleksei Leonov", 3), "image": "https://images.unsplash.com/photo-1478147424132-026f743c3d52?q=80&w=1200", "imgCaption": "Siberia fue su inesperado lugar de aterrizaje." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Hazaña?", "options": ["Luna", "Caminata", "Telescopio", "Maratón"], "correctIndex": 1, "explanation": "Caminata espacial." }, { "question": "¿Peligro?", "options": ["Traje inflado", "Sin aire", "Alienígena", "Desmayo"], "correctIndex": 0, "explanation": "Traje rígido inflado." }, { "question": "¿Solución?", "options": ["Romper", "Desinflar", "Esperar", "Empujar"], "correctIndex": 1, "explanation": "Liberó aire." }, { "question": "¿Aterrizaje?", "options": ["Desierto", "Océano", "Bosque siberiano", "NASA"], "correctIndex": 2, "explanation": "Siberia." }, { "question": "¿Tiempo afuera?", "options": ["12h", "12min", "1h", "5d"], "correctIndex": 1, "explanation": "12 minutos." } ] }
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
      "sections": [
        { "id": "svetlana_1", "title": "Regreso de Mujeres", "text": create15Lines("Svetlana Savitskaya", 1), "image": "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200", "imgCaption": "Svetlana llegó a la estación Salyut 7.", "style": "highlight" },
        { "id": "svetlana_2", "title": "Primera Caminata Femenina", "text": create15Lines("Svetlana Savitskaya", 2), "image": "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200", "imgCaption": "Abriendo paso al futuro de las mujeres exploradoras." },
        { "id": "svetlana_3", "title": "Soldadura Cósmica", "text": create15Lines("Svetlana Savitskaya", 3), "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200", "imgCaption": "Manejo experto de herramientas pesadas sin gravedad." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Quién fue la segunda?", "options": ["Valentina", "Sally", "Svetlana", "Laika"], "correctIndex": 2, "explanation": "Svetlana." }, { "question": "¿Estación?", "options": ["ISS", "Salyut 7", "MIR", "Skylab"], "correctIndex": 1, "explanation": "Salyut 7." }, { "question": "¿Logro en segundo vuelo?", "options": ["Luna", "Caminata femenina", "Marte", "Coche"], "correctIndex": 1, "explanation": "Primera mujer en flotar." }, { "question": "¿Qué trabajo hizo?", "options": ["Limpiar", "Soldar", "Pintar", "Fotos"], "correctIndex": 1, "explanation": "Soldadura espacial." }, { "question": "¿Duración del paseo?", "options": ["10 min", "Media hora", "3 horas", "Día"], "correctIndex": 2, "explanation": "Más de 3 horas." } ] }
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
      "sections": [
        { "id": "sally_1", "title": "Rompiendo Barreras", "text": create15Lines("Sally Ride", 1), "image": "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200", "imgCaption": "El majestuoso Transbordador espacial estadounidense.", "style": "highlight" },
        { "id": "sally_2", "title": "Brazo Robótico", "text": create15Lines("Sally Ride", 2), "image": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200", "imgCaption": "La gigantesca grúa espacial en acción robótica." },
        { "id": "sally_3", "title": "Inspiración Educativa", "text": create15Lines("Sally Ride", 3), "image": "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1200", "imgCaption": "Educación y ciencia para los futuros cadetes." }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Primera mujer USA?", "options": ["Valentina", "Svetlana", "Sally", "Amelia"], "correctIndex": 2, "explanation": "Sally." }, { "question": "¿Nave?", "options": ["Vostok", "Challenger", "Saturno", "Soyuz"], "correctIndex": 1, "explanation": "Transbordador." }, { "question": "¿Herramienta?", "options": ["Láser", "Frenos", "Brazo robótico", "Radar"], "correctIndex": 2, "explanation": "Brazo robótico." }, { "question": "¿Uso del brazo?", "options": ["Satélites", "Defensa", "Limpiar", "Rocas"], "correctIndex": 0, "explanation": "Para desplegar satélites." }, { "question": "¿Dedicación final?", "options": ["Actriz", "Enseñar", "Hospital", "Viajar"], "correctIndex": 1, "explanation": "Educación infantil." } ] }
  }
];

jsData = jsData.filter(m => !m.id.startsWith('pioneros_'));
jsData.push(...pionerosModules);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('Pioneros 15x15 (15 lines x 15 words) injected successfully');
