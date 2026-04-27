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

const pionerosModules = [
  {
    "id": "pioneros_yuri",
    "order": 0,
    "titleEn": "Yuri Gagarin",
    "titleEs": "Yuri Gagarin",
    "badge": "Vostok Pioneer",
    "badgeEs": "Pionero Vostok",
    "color": "#ff4d4d",
    "contentEs": {
      "sections": [
        {
          "id": "yuri_1",
          "title": "El Primer Hombre en el Espacio",
          "text": "Cadete, el 12 de abril de 1961, el mundo cambió para siempre. El cosmonauta soviético Yuri Gagarin se convirtió en el primer ser humano en viajar al espacio exterior a bordo de la cápsula Vostok 1. ¡Su vuelo demostró que podíamos alcanzar las estrellas!",
          "video": "https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "yuri_2",
          "title": "Un Vuelo Inolvidable",
          "text": "La Vostok 1 orbitó la Tierra una sola vez. El vuelo completo duró apenas 108 minutos, pero requirió años de preparación. A una altitud máxima de 327 kilómetros, Yuri experimentó la microgravedad y observó la inmensidad de nuestro brillante planeta azul flotando en el vacío oscuro.",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "yuri_3",
          "title": "Regreso Triunfal",
          "text": "Durante el descenso, Gagarin tuvo que saltar en paracaídas desde su cápsula a 7,000 metros de altura, ya que la Vostok 1 no estaba diseñada para un aterrizaje suave. Al tocar tierra, se convirtió inmediatamente en un héroe global y un icono eterno de la exploración espacial.",
          "image": "",
          "imgCaption": ""
        }
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
    "color": "#3399ff",
    "contentEs": {
      "sections": [
        {
          "id": "alan_1",
          "title": "El Primer Estadounidense",
          "text": "Pocas semanas después de Gagarin, el 5 de mayo de 1961, Alan Shepard hizo historia a bordo de la cápsula Freedom 7. Se convirtió en el primer astronauta estadounidense en viajar al espacio. ¡Un hito gigantesco para la incipiente agencia espacial NASA!",
          "video": "https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "alan_2",
          "title": "Vuelo Suborbital",
          "text": "A diferencia del vuelo de Gagarin, la misión de Shepard fue un vuelo suborbital. Esto significa que su cohete Redstone lo llevó al espacio a una altitud de 187 kilómetros, pero no tuvo suficiente velocidad para completar una vuelta entera alrededor de la Tierra. ¡Fue como un gran salto espacial!",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "alan_3",
          "title": "Control Manual",
          "text": "Shepard logró algo increíble: fue el primer piloto en controlar activamente la orientación de su nave en el espacio. Años más tarde, superando una grave enfermedad, Alan regresó al espacio como comandante del Apolo 14 y se convirtió en el quinto humano en caminar sobre la Luna.",
          "image": "",
          "imgCaption": ""
        }
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
    "color": "#00b300",
    "contentEs": {
      "sections": [
        {
          "id": "john_1",
          "title": "Girando al Mundo",
          "text": "El 20 de febrero de 1962, el valiente John Herschel Glenn se convirtió en el primer estadounidense en orbitar la Tierra. A bordo de la cápsula Friendship 7, Glenn completó tres órbitas enteras alrededor del planeta, igualando finalmente la proeza técnica de la Unión Soviética.",
          "video": "https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "john_2",
          "title": "Luciérnagas en el Espacio",
          "text": "Durante su vuelo, Glenn presenció un misterio fascinante: cientos de pequeñas partículas luminosas flotando alrededor de su nave. Él las llamó 'luciérnagas espaciales'. Más tarde, los científicos descubrieron que eran cristales de hielo congelado provenientes de la propia nave, iluminados por el brillante Sol.",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "john_3",
          "title": "El Astronauta Más Veterano",
          "text": "Tras su exitoso vuelo de casi cinco horas, Glenn se convirtió en un senador influyente. Sorprendentemente, en 1998, regresó al espacio a bordo del transbordador Discovery a la edad de 77 años. ¡Esto lo convirtió en la persona de mayor edad en volar al espacio en ese momento!",
          "image": "",
          "imgCaption": ""
        }
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
    "color": "#cc00cc",
    "contentEs": {
      "sections": [
        {
          "id": "valentina_1",
          "title": "La Primera Mujer Cósmica",
          "text": "El 16 de junio de 1963, el cielo dejó de ser exclusivo para hombres. La cosmonauta soviética Valentina Tereshkova, usando el nombre clave 'Gaviota', despegó en la cápsula Vostok 6. ¡Se convirtió oficialmente en la primera mujer en viajar al espacio exterior!",
          "video": "https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "valentina_2",
          "title": "Un Vuelo de Resistencia",
          "text": "Su misión fue extraordinaria. Valentina pasó casi tres días completos en órbita y dio 48 vueltas alrededor de la Tierra. ¡Durante ese único vuelo, acumuló más tiempo en el espacio que todos los astronautas estadounidenses anteriores combinados! Un récord asombroso de resistencia física.",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "valentina_3",
          "title": "De Paracaidista a Leyenda",
          "text": "Antes de ser cosmonauta, Valentina era una experta paracaidista que trabajaba en una fábrica textil. Su experiencia en el aire fue vital, ya que al igual que Gagarin, tuvo que saltar en paracaídas desde su cápsula durante el peligroso descenso. ¡Su valentía inspiró a millones de mujeres en el mundo!",
          "image": "",
          "imgCaption": ""
        }
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
    "color": "#ff9900",
    "contentEs": {
      "sections": [
        {
          "id": "leonov_1",
          "title": "El Primer Paseo Espacial",
          "text": "El 18 de marzo de 1965, la misión Voskhod 2 marcó otro momento revolucionario. El cosmonauta Aleksei Leonov salió de su nave y se convirtió en el primer ser humano en flotar libremente en el vacío del espacio exterior, realizando la primera Actividad Extravehicular (EVA).",
          "video": "https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "leonov_2",
          "title": "Peligro en el Vacío",
          "text": "Durante su paseo de 12 minutos, su traje espacial se infló demasiado debido a la falta de presión en el espacio exterior. Estaba tan rígido que Aleksei no podía regresar a la nave. En un acto de extremo valor, tuvo que desinflar manualmente su traje para lograr entrar a salvo.",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "leonov_3",
          "title": "Aterrizaje en el Bosque",
          "text": "La misión terminó de forma dramática. La nave se desvió y aterrizó en un profundo y helado bosque en Siberia, lleno de lobos y osos. Leonov y su compañero tuvieron que sobrevivir una noche entera a temperaturas bajo cero antes de ser finalmente rescatados. ¡Un verdadero aventurero extremo!",
          "image": "",
          "imgCaption": ""
        }
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
    "color": "#ff3399",
    "contentEs": {
      "sections": [
        {
          "id": "svetlana_1",
          "title": "El Regreso de las Mujeres",
          "text": "Diecinueve años después del vuelo de Valentina Tereshkova, Svetlana Savitskaya voló al espacio en agosto de 1982, convirtiéndose en la segunda mujer en la historia en alcanzar el cosmos. Fue una brillante piloto de pruebas que demostró su impecable habilidad técnica en la estación espacial Salyut 7.",
          "image": "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Las estaciones espaciales soviéticas abrieron las puertas a estancias prolongadas en microgravedad.",
          "style": "highlight"
        },
        {
          "id": "svetlana_2",
          "title": "La Primera Caminata Femenina",
          "text": "Pero su mayor hazaña ocurrió en su segundo vuelo el 25 de julio de 1984. Ese día, Svetlana salió al gélido vacío y se convirtió en la primera mujer de la historia en realizar un paseo espacial. Su destreza técnica marcó un antes y un después en la ingeniería.",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "svetlana_3",
          "title": "Soldadura en el Espacio",
          "text": "Svetlana no solo flotó en el exterior; durante sus 3 horas y 35 minutos de caminata espacial, utilizó una herramienta especial de electrones para realizar cortes y soldaduras en metales. ¡Logró completar complejas reparaciones en el casco de la estación orbital con total éxito!",
          "image": "",
          "imgCaption": ""
        }
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
    "color": "#00ced1",
    "contentEs": {
      "sections": [
        {
          "id": "sally_1",
          "title": "Rompiendo Barreras en la NASA",
          "text": "El 18 de junio de 1983, la Dra. Sally Kristen Ride despegó a bordo del transbordador espacial Challenger. Se convirtió en la primera mujer estadounidense, y la mujer más joven de su país, en viajar al espacio. ¡Su vuelo inspiró a una nueva generación entera de científicas!",
          "image": "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "El Transbordador Espacial fue la nave más compleja jamás construida, diseñada para ser reutilizable.",
          "style": "highlight"
        },
        {
          "id": "sally_2",
          "title": "Operando el Brazo Robótico",
          "text": "En el espacio, Sally trabajó como especialista de misión. Era una experta operadora del poderoso brazo robótico del transbordador. Usó este brazo para liberar enormes satélites de comunicaciones en la órbita de la Tierra y para realizar complejos experimentos científicos en microgravedad.",
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "sally_3",
          "title": "Una Educadora Brillante",
          "text": "Después de su carrera como astronauta, Sally Ride dedicó su vida a la educación. Creó programas especiales para inspirar a niños y jóvenes a interesarse en las ciencias, la tecnología, la ingeniería y las matemáticas (STEM). ¡Su enorme legado educativo vive hasta el día de hoy!",
          "image": "",
          "imgCaption": ""
        }
      ]
    }
  }
];

// Remover modulos viejos si existieran
jsData = jsData.filter(m => !m.id.startsWith('pioneros_'));

// Agregar los 7 nuevos
jsData.push(...pionerosModules);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log('Pioneros injected successfully');
