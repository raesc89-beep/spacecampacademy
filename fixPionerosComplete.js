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
    "badgeImage": "/assets/badges/pioneros_yuri_badge.png",
    "color": "#ff4d4d",
    "contentEs": {
      "sections": [
        {
          "id": "yuri_1",
          "title": "El Primer Hombre en el Espacio",
          "text": [
            "El 12 de abril de 1961, el mundo entero cambió para siempre en la historia.",
            "El joven cosmonauta soviético Yuri Gagarin se preparó valientemente para un viaje totalmente desconocido.",
            "A bordo de su pequeña cápsula Vostok 1, Gagarin despegó con una inmensa fuerza.",
            "Se convirtió en el primer ser humano en viajar más allá de nuestra atmósfera.",
            "Este logro monumental demostró a la humanidad que podíamos alcanzar las estrellas más lejanas."
          ],
          "video": "https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "yuri_2",
          "title": "Un Vuelo Inolvidable",
          "text": [
            "La nave Vostok 1 orbitó nuestro planeta Tierra una sola vez a gran velocidad.",
            "El vuelo completo duró solamente 108 minutos, pero requirió muchísimos años de preparación científica.",
            "A una altitud asombrosa de 327 kilómetros, Yuri experimentó la extraña sensación de microgravedad.",
            "Desde su ventana, observó la inmensidad de nuestro brillante planeta azul y mares hermosos.",
            "Esa pequeña esfera flotando en el vacío oscuro del cosmos lo dejó totalmente maravillado."
          ],
          "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "La maravillosa y frágil vista de nuestro planeta Tierra desde el oscuro y silencioso espacio exterior."
        },
        {
          "id": "yuri_3",
          "title": "Regreso Triunfal",
          "text": [
            "Durante el veloz descenso a la Tierra, Gagarin enfrentó un desafío extremadamente peligroso.",
            "Tuvo que saltar en paracaídas desde su cápsula a unos 7,000 metros de altura.",
            "Esto ocurrió porque la Vostok 1 no estaba diseñada para lograr un aterrizaje suave.",
            "Al tocar tierra firme a salvo, se convirtió inmediatamente en un héroe muy famoso.",
            "Hoy es un ícono eterno y legendario de la exploración espacial de la humanidad."
          ],
          "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "El intrépido salto en paracaídas fue clave para que Yuri pudiera regresar completamente a salvo."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿En qué año viajó Yuri Gagarin al espacio?",
          "options": ["1957", "1961", "1969", "1972"],
          "correctIndex": 1,
          "explanation": "El histórico vuelo de Yuri ocurrió el 12 de abril de 1961."
        },
        {
          "question": "¿Cómo se llamaba la cápsula espacial de Gagarin?",
          "options": ["Apolo 11", "Sputnik", "Vostok 1", "Friendship 7"],
          "correctIndex": 2,
          "explanation": "La Vostok 1 fue la pequeña nave soviética que lo llevó al espacio."
        },
        {
          "question": "¿Cuántas veces orbitó la Tierra durante su misión?",
          "options": ["Una sola vez", "Diez veces", "Tres veces", "Cincuenta veces"],
          "correctIndex": 0,
          "explanation": "Su vuelo fue muy corto, completando una única órbita en 108 minutos."
        },
        {
          "question": "¿Qué experimentó Yuri al estar a 327 kilómetros de altura?",
          "options": ["Gravedad extrema", "Microgravedad", "Calor intenso", "Ceguera temporal"],
          "correctIndex": 1,
          "explanation": "Al alcanzar la órbita, Yuri sintió por primera vez la ingravidez o microgravedad."
        },
        {
          "question": "¿Cómo logró aterrizar a salvo en la Tierra?",
          "options": ["Con la cápsula en el mar", "Como un avión", "Usando un rayo tractor", "Saltando en paracaídas"],
          "correctIndex": 3,
          "explanation": "La cápsula no tenía frenos suaves, así que tuvo que saltar en paracaídas a 7,000 metros de altura."
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
    "badgeImage": "/assets/badges/pioneros_alan_badge.png",
    "color": "#3399ff",
    "contentEs": {
      "sections": [
        {
          "id": "alan_1",
          "title": "El Primer Estadounidense",
          "text": [
            "Pocas semanas después del histórico vuelo de Gagarin, Estados Unidos lanzó su propia misión.",
            "El 5 de mayo de 1961, el valiente piloto Alan Shepard hizo gran historia.",
            "Despegó hacia el cielo a bordo de la poderosa cápsula llamada Freedom 7.",
            "Se convirtió así en el primer astronauta estadounidense en viajar al espacio exterior.",
            "Fue un hito gigantesco para la entonces joven e incipiente agencia espacial llamada NASA."
          ],
          "video": "https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "alan_2",
          "title": "Vuelo Suborbital",
          "text": [
            "A diferencia del rápido vuelo de Gagarin, la misión de Shepard fue un vuelo suborbital.",
            "Esto significa que su cohete Redstone lo llevó al espacio como una enorme bala.",
            "Alcanzó una altitud máxima de 187 kilómetros sobre la superficie de nuestro querido planeta.",
            "Sin embargo, no tuvo la velocidad suficiente para dar una vuelta entera al mundo.",
            "Fue como dar un salto gigantesco hacia el vacío antes de volver a caer."
          ],
          "image": "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Los poderosos cohetes Redstone fueron los primeros encargados de llevar a los estadounidenses a cruzar el cielo."
        },
        {
          "id": "alan_3",
          "title": "Control Manual",
          "text": [
            "Durante este arriesgado vuelo, Shepard logró hacer algo que nadie más había hecho antes.",
            "Fue el primer piloto en controlar manualmente la orientación de su nave espacial volando.",
            "Demostró que los humanos podían trabajar activamente y controlar máquinas en el espacio profundo.",
            "Años más tarde, tras superar una grave enfermedad, Alan regresó triunfante a volar cohetes.",
            "Como comandante del Apolo 14, se convirtió en el quinto hombre en pisar la Luna."
          ],
          "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Alan demostró que un piloto podía controlar manualmente los precisos instrumentos espaciales."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿Quién fue el primer astronauta estadounidense en viajar al espacio?",
          "options": ["Neil Armstrong", "John Glenn", "Alan Shepard", "Buzz Aldrin"],
          "correctIndex": 2,
          "explanation": "Alan Shepard cruzó la atmósfera apenas unas semanas después que Yuri Gagarin."
        },
        {
          "question": "¿Cómo se llamó la cápsula en la que voló Alan?",
          "options": ["Apolo 14", "Freedom 7", "Friendship 7", "Vostok 1"],
          "correctIndex": 1,
          "explanation": "Su cápsula Mercury llevaba el famoso nombre de Freedom 7."
        },
        {
          "question": "¿Qué significa que su vuelo fue 'suborbital'?",
          "options": ["Que fue muy lento", "Que no completó una vuelta a la Tierra", "Que se quedó en el mar", "Que chocó con un asteroide"],
          "correctIndex": 1,
          "explanation": "Suborbital significa llegar al espacio pero sin la velocidad suficiente para dar una vuelta entera alrededor de la Tierra."
        },
        {
          "question": "¿Qué hazaña manual logró Shepard durante su vuelo?",
          "options": ["Comer un sándwich", "Reparar el motor", "Controlar la orientación de la nave", "Saltar en paracaídas"],
          "correctIndex": 2,
          "explanation": "Fue el primer astronauta en usar los controles manuales para mover su nave en el espacio."
        },
        {
          "question": "¿A dónde viajó Alan Shepard años después como comandante?",
          "options": ["A Marte", "A la Luna", "A Júpiter", "A la estación espacial ISS"],
          "correctIndex": 1,
          "explanation": "Superando una enfermedad, Shepard volvió al espacio y pisó la Luna en la misión Apolo 14."
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
    "badgeImage": "/assets/badges/pioneros_john_badge.png",
    "color": "#00b300",
    "contentEs": {
      "sections": [
        {
          "id": "john_1",
          "title": "Girando al Mundo",
          "text": [
            "El 20 de febrero de 1962, el valiente John Herschel Glenn hizo una enorme proeza.",
            "Se convirtió en el primer astronauta estadounidense en orbitar completamente nuestro amado planeta azul.",
            "A bordo de la veloz cápsula Friendship 7, Glenn completó tres órbitas muy rápidas.",
            "Su viaje en el espacio duró cerca de cinco horas llenas de mucha emoción.",
            "Esta misión igualó por fin la hazaña espacial lograda antes por la Unión Soviética."
          ],
          "video": "https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "john_2",
          "title": "Luciérnagas en el Espacio",
          "text": [
            "Durante su impresionante vuelo espacial, Glenn presenció un misterio verdaderamente hermoso y fascinante.",
            "Vio cientos de diminutas partículas luminosas flotando libremente alrededor de su cápsula en movimiento.",
            "Él las bautizó cariñosamente con el nombre de adorables 'luciérnagas espaciales' muy brillantes.",
            "Más tarde, los científicos descubrieron que eran solo pequeños cristales de hielo muy frío.",
            "Se desprendían de la propia nave y brillaban intensamente al reflejar la luz solar."
          ],
          "image": "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "El brillo de las estrellas y los cristales de hielo confundieron inicialmente al astronauta con pequeñas luciérnagas."
        },
        {
          "id": "john_3",
          "title": "El Astronauta Más Veterano",
          "text": [
            "Tras su muy exitoso vuelo orbital, Glenn se retiró y se convirtió en senador.",
            "Pero su amor por la exploración y las estrellas nunca desapareció de su corazón.",
            "Sorprendentemente, en el año 1998, regresó a viajar al espacio a sus 77 años.",
            "Voló valientemente a bordo del gran transbordador espacial llamado Discovery para realizar importantes experimentos.",
            "¡Se convirtió así en la persona de mayor edad en viajar al espacio profundo!"
          ],
          "image": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "John Glenn demostró que no existe límite de edad para soñar y alcanzar nuevamente el maravilloso cosmos."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿Qué gran récord logró John Glenn en 1962?",
          "options": ["Fue el primer hombre en la Luna", "Fue el primer estadounidense en orbitar la Tierra", "Fue el primer hombre en el espacio", "Fue el inventor de los cohetes"],
          "correctIndex": 1,
          "explanation": "John Glenn fue el primero de su país en dar la vuelta completa al planeta."
        },
        {
          "question": "¿Cómo llamó Glenn a las partículas brillantes que vio?",
          "options": ["Alienígenas", "Estrellas fugaces", "Luciérnagas espaciales", "Diamantes cósmicos"],
          "correctIndex": 2,
          "explanation": "Él creía ver 'luciérnagas' flotando mágicamente fuera de su ventana espacial."
        },
        {
          "question": "¿Qué eran realmente esas misteriosas 'luciérnagas'?",
          "options": ["Insectos de la Tierra", "Basura espacial", "Cristales de hielo congelado", "Pintura despegada"],
          "correctIndex": 2,
          "explanation": "Eran cristales de hielo formados en la nave que brillaban con la luz del sol."
        },
        {
          "question": "¿Cuántas vueltas le dio John Glenn a la Tierra?",
          "options": ["Una", "Tres", "Cincuenta", "Cien"],
          "correctIndex": 1,
          "explanation": "A bordo de su cápsula Friendship 7, dio tres órbitas completas."
        },
        {
          "question": "¿A qué edad regresó sorprendentemente al espacio?",
          "options": ["A los 40", "A los 55", "A los 77", "A los 90"],
          "correctIndex": 2,
          "explanation": "En 1998, a sus increíbles 77 años, voló en el transbordador espacial Discovery."
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
    "badgeImage": "/assets/badges/pioneros_valentina_badge.png",
    "color": "#cc00cc",
    "contentEs": {
      "sections": [
        {
          "id": "valentina_1",
          "title": "La Primera Mujer Cósmica",
          "text": [
            "El histórico 16 de junio de 1963, el inmenso cielo dejó de ser exclusivo.",
            "La gran cosmonauta soviética Valentina Tereshkova despegó usando el bonito nombre clave de 'Gaviota'.",
            "Viajó a las estrellas a bordo de la poderosa y rápida cápsula Vostok 6.",
            "¡Valentina se convirtió oficialmente en la primera mujer de la historia en viajar al espacio!",
            "Demostró al mundo entero que las mujeres podían ser extraordinarias exploradoras del universo infinito."
          ],
          "video": "https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "valentina_2",
          "title": "Un Vuelo de Resistencia",
          "text": [
            "Su gran misión solitaria en el espacio fue verdaderamente difícil y asombrosa al extremo.",
            "Valentina pasó casi tres días completos volando a gran velocidad en la órbita terrestre.",
            "Dio nada menos que 48 impresionantes vueltas enteras alrededor de nuestro brillante planeta azul.",
            "En ese único vuelo, acumuló mucho más tiempo total en el espacio sin gravedad.",
            "Superó a todos los astronautas estadounidenses anteriores sumados, marcando un tremendo récord de resistencia."
          ],
          "image": "https://images.unsplash.com/photo-1536697246787-1f276329efba?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Valentina resistió la dura microgravedad durante casi 3 días dando decenas de vueltas a la Tierra."
        },
        {
          "id": "valentina_3",
          "title": "De Paracaidista a Leyenda",
          "text": [
            "Antes de convertirse valientemente en cosmonauta, Valentina era una trabajadora experta haciendo saltos en paracaídas.",
            "También pasaba sus días trabajando fuertemente en una enorme fábrica que producía productos textiles.",
            "Su habilidad en el paracaidismo fue sumamente vital para sobrevivir a la peligrosa misión.",
            "Tuvo que saltar de la cápsula a miles de metros al regresar a casa.",
            "¡Su increíble valentía inspiró a millones de jóvenes mujeres soñadoras alrededor de todo el mundo!"
          ],
          "image": "https://images.unsplash.com/photo-1528659135063-25ee6d22ba71?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "El paracaidismo extremo fue el talento clave que la llevó a ser seleccionada como cosmonauta."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿Cuál fue el logro gigante de Valentina Tereshkova?",
          "options": ["Ser la primera persona en el espacio", "Ser la primera mujer en viajar al espacio", "Llegar a la Luna", "Piloteó un avión supersónico"],
          "correctIndex": 1,
          "explanation": "En 1963, rompió la barrera y se convirtió en la primera mujer cosmonauta."
        },
        {
          "question": "¿Qué bonito nombre clave usó Valentina en su vuelo?",
          "options": ["Águila", "Estrella", "Gaviota", "Halcón"],
          "correctIndex": 2,
          "explanation": "El control terrestre y ella se comunicaban usando el poético nombre clave 'Gaviota'."
        },
        {
          "question": "¿Cuántas vueltas completas dio a la Tierra?",
          "options": ["3", "10", "48", "100"],
          "correctIndex": 2,
          "explanation": "Orbitó la Tierra 48 veces durante sus intensos 3 días en el espacio."
        },
        {
          "question": "¿Qué trabajo importante tenía antes de volar a las estrellas?",
          "options": ["Doctora", "Trabajadora textil y paracaidista", "Cocinera militar", "Ingeniera de cohetes"],
          "correctIndex": 1,
          "explanation": "Trabajaba en una fábrica textil, pero su pasión por el paracaidismo le abrió las puertas del cosmos."
        },
        {
          "question": "¿Por qué fue tan importante que supiera usar paracaídas?",
          "options": ["Por diversión", "Porque debía saltar de su nave al aterrizar", "Para reparar un satélite", "Porque la nave era descubierta"],
          "correctIndex": 1,
          "explanation": "Al igual que Gagarin, las naves Vostok requerían que el piloto saltara en paracaídas antes del aterrizaje."
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
    "badgeImage": "/assets/badges/pioneros_leonov_badge.png",
    "color": "#ff9900",
    "contentEs": {
      "sections": [
        {
          "id": "leonov_1",
          "title": "El Primer Paseo Espacial",
          "text": [
            "El gran día del 18 de marzo de 1965 marcó otro momento totalmente revolucionario.",
            "La increíble misión soviética Voskhod 2 estaba lista para intentar lo que parecía imposible.",
            "El cosmonauta Aleksei Leonov salió físicamente por la pequeña escotilla de su nave espacial.",
            "Se convirtió en el primer ser humano en flotar libremente afuera en el oscuro vacío.",
            "¡Realizó exitosamente la primera Actividad Extravehicular, comúnmente llamada caminata espacial, en la historia humana!"
          ],
          "video": "https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "leonov_2",
          "title": "Peligro en el Vacío",
          "text": [
            "Durante su extraordinario paseo espacial de tan solo 12 minutos, ocurrió un gran problema.",
            "Su grueso traje espacial se infló demasiado por la enorme falta de presión exterior.",
            "Estaba tan duro y rígido que el pobre Aleksei ya no podía moverse libremente.",
            "No cabía por la puerta para poder regresar adentro de su segura nave protectora.",
            "Tuvo que abrir una válvula para desinflar manualmente su traje y sobrevivir al gran peligro."
          ],
          "image": "https://images.unsplash.com/photo-1614728423169-3f65fd722b05?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "La falta de presión atmosférica en el vacío infló su traje convirtiéndolo en un globo rígido."
        },
        {
          "id": "leonov_3",
          "title": "Aterrizaje en el Bosque",
          "text": [
            "El final de esta histórica misión soviética terminó de una forma sumamente tensa y dramática.",
            "La nave espacial experimentó problemas y se desvió enormemente de su curso de aterrizaje seguro.",
            "Terminó cayendo en medio de un profundo bosque congelado en la vasta región de Siberia.",
            "Leonov tuvo que sobrevivir rodeado de frío extremo, peligrosos lobos y osos salvajes gigantes.",
            "Fue rescatado al día siguiente, demostrando ser un verdadero aventurero de enorme valentía mundial."
          ],
          "image": "https://images.unsplash.com/photo-1478147424132-026f743c3d52?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Los fríos y peligrosos bosques nevados de Siberia fueron su lugar de aterrizaje inesperado."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿Qué hazaña histórica realizó Aleksei Leonov en 1965?",
          "options": ["Pisó la Luna", "Realizó la primera caminata espacial", "Construyó un telescopio gigante", "Corrió un maratón"],
          "correctIndex": 1,
          "explanation": "Fue el primer humano en salir de su nave y flotar en el espacio."
        },
        {
          "question": "¿Por qué Leonov estuvo en grave peligro al intentar entrar a su nave?",
          "options": ["Su traje espacial se infló como un globo duro", "Se quedó sin oxígeno", "Un alienígena lo atrapó", "Se desmayó"],
          "correctIndex": 0,
          "explanation": "El vacío del espacio hizo que su traje se inflara tanto que no podía doblar las articulaciones para entrar."
        },
        {
          "question": "¿Cómo resolvió valientemente el problema de su traje inflado?",
          "options": ["Rompió la puerta", "Desinfló su traje liberando su propio aire", "Esperó a desinflarse solo", "Un amigo lo empujó"],
          "correctIndex": 1,
          "explanation": "En un acto de gran valor, abrió una válvula y liberó oxígeno para poder encoger su traje."
        },
        {
          "question": "¿En qué lugar salvaje y peligroso aterrizó su nave?",
          "options": ["En el desierto caliente", "En medio del océano Pacífico", "En un bosque helado de Siberia", "En el patio de la NASA"],
          "correctIndex": 2,
          "explanation": "La nave se desvió y cayó en la helada Siberia, llena de animales salvajes."
        },
        {
          "question": "¿Cuánto tiempo duró su paseo flotando en el espacio libre?",
          "options": ["12 horas", "12 minutos", "1 hora", "5 días"],
          "correctIndex": 1,
          "explanation": "Flotó en el vacío exterior durante unos emocionantes y tensos 12 minutos."
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
    "badgeImage": "/assets/badges/pioneros_svetlana_badge.png",
    "color": "#ff3399",
    "contentEs": {
      "sections": [
        {
          "id": "svetlana_1",
          "title": "El Regreso de las Mujeres",
          "text": [
            "Diecinueve largos años después del gran vuelo espacial realizado por la legendaria Valentina Tereshkova.",
            "La destacada y hábil piloto rusa Svetlana Savitskaya viajó valientemente rumbo al frío espacio.",
            "Esto ocurrió en el caluroso mes de agosto de 1982 a bordo de una nave.",
            "Así se convirtió oficialmente en la segunda mujer de la historia en alcanzar las estrellas.",
            "Vivió días inolvidables trabajando duro a bordo de la estación espacial soviética Salyut 7."
          ],
          "image": "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Svetlana vivió en una de las primeras estaciones espaciales construidas para estancias largas.",
          "style": "highlight"
        },
        {
          "id": "svetlana_2",
          "title": "La Primera Caminata Femenina",
          "text": [
            "Pero sin duda alguna, su hazaña más gloriosa ocurrió en su emocionante segundo viaje.",
            "Durante ese magnífico día, el 25 de julio de 1984, Svetlana hizo algo impensable.",
            "Salió al gélido y oscuro vacío del espacio exterior utilizando un grueso traje espacial.",
            "Se convirtió brillantemente en la primera mujer de la historia en realizar un paseo espacial.",
            "¡Su impecable técnica abrió el enorme universo para todas las mujeres exploradoras del futuro!"
          ],
          "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Svetlana demostró que las mujeres también podían realizar tareas sumamente complejas fuera de la nave."
        },
        {
          "id": "svetlana_3",
          "title": "Soldadura en el Espacio",
          "text": [
            "Svetlana no se dedicó solamente a flotar y admirar las bellezas del universo exterior.",
            "Durante las largas 3 horas y 35 minutos que duró su asombrosa caminata espacial afuera.",
            "Ella utilizó con enorme maestría una complicada y pesada herramienta especial de corte electrónico.",
            "Logró cortar y soldar gruesas placas de duro metal flotando totalmente sin ninguna gravedad.",
            "Demostró así que era una de las mejores ingenieras que había viajado al cosmos inmenso."
          ],
          "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Usar herramientas pesadas como soldadoras en microgravedad es un arte extremadamente difícil."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿Quién fue la segunda mujer en viajar al espacio en toda la historia?",
          "options": ["Valentina Tereshkova", "Sally Ride", "Svetlana Savitskaya", "Laika"],
          "correctIndex": 2,
          "explanation": "Svetlana Savitskaya siguió los grandes pasos pioneros de Valentina en 1982."
        },
        {
          "question": "¿Qué importante estación espacial soviética visitó Svetlana?",
          "options": ["La ISS", "Salyut 7", "Estación MIR", "Skylab"],
          "correctIndex": 1,
          "explanation": "Svetlana voló y vivió varios días en la estación espacial soviética Salyut 7."
        },
        {
          "question": "¿Cuál fue el gigantesco logro mundial que hizo en su segundo vuelo?",
          "options": ["Caminó en la Luna", "Hizo la primera caminata espacial de una mujer", "Llegó al planeta Marte", "Condujo un coche lunar"],
          "correctIndex": 1,
          "explanation": "En 1984, rompió barreras al ser la primera mujer en flotar en el espacio exterior."
        },
        {
          "question": "¿Qué trabajo pesado realizó ella mientras flotaba afuera en el espacio?",
          "options": ["Limpió ventanas", "Soldó metales con herramientas", "Pintó la nave de color rojo", "Tomó fotografías solamente"],
          "correctIndex": 1,
          "explanation": "Usó herramientas de soldadura electrónica pesada para reparar la estación espacial en el vacío."
        },
        {
          "question": "¿Cuánto duró su histórico paseo espacial soldando piezas?",
          "options": ["Unos 10 minutos", "Menos de media hora", "Más de tres horas", "Todo el día entero"],
          "correctIndex": 2,
          "explanation": "Estuvo trabajando arduamente afuera durante largas 3 horas y 35 minutos seguidos."
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
    "badgeImage": "/assets/badges/pioneros_sally_badge.png",
    "color": "#00ced1",
    "contentEs": {
      "sections": [
        {
          "id": "sally_1",
          "title": "Rompiendo Barreras en la NASA",
          "text": [
            "El brillante y caluroso día del 18 de junio del memorable año de 1983.",
            "La joven científica llamada Sally Kristen Ride despegó a bordo del famoso transbordador espacial Challenger.",
            "Se convirtió con mucho orgullo en la primera astronauta mujer estadounidense en cruzar nuestra atmósfera.",
            "Y no solo eso, fue la mujer más joven de todo su país en lograrlo.",
            "Su increíble valentía inspiró a millones de niñas en el mundo a soñar con cohetes."
          ],
          "image": "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "El Transbordador Espacial fue la nave más compleja jamás construida, diseñada para ser reutilizable.",
          "style": "highlight"
        },
        {
          "id": "sally_2",
          "title": "Operando el Brazo Robótico",
          "text": [
            "Ya flotando en el espacio sin gravedad, Sally trabajó duramente como gran especialista de misión.",
            "Ella era una grandiosa y excelente operadora del inmenso brazo robótico del gran transbordador espacial.",
            "Usó esta enorme grúa metálica para atrapar y liberar gigantescos satélites brillantes de vitales comunicaciones.",
            "También aprovechó sus largos días orbitando para realizar interesantes experimentos científicos de física y astrofísica.",
            "Su perfecto trabajo ayudó a mejorar todos los futuros viajes espaciales de la NASA."
          ],
          "image": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "La manipulación robótica requiere de conocimientos matemáticos y astrofísicos asombrosos."
        },
        {
          "id": "sally_3",
          "title": "Una Educadora Brillante",
          "text": [
            "Después de terminar su exitosa carrera volando como una audaz astronauta exploradora del cosmos oscuro.",
            "La brillante Sally Ride decidió dedicar el resto de su maravillosa vida a la educación.",
            "Escribió emocionantes libros y creó programas especiales para miles de niños en todas las escuelas.",
            "Quería profundamente que los jóvenes amaran la ciencia, las matemáticas y la increíble tecnología moderna.",
            "Su enorme y bondadoso legado educativo sigue viviendo muy fuertemente hasta nuestros días actuales maravillosos."
          ],
          "image": "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Su misión más grande en la Tierra fue inspirar e impulsar la ciencia infantil."
        }
      ]
    },
    "quiz": {
      "questionsEs": [
        {
          "question": "¿Quién fue la primera mujer estadounidense en viajar al espacio exterior?",
          "options": ["Valentina Tereshkova", "Svetlana Savitskaya", "Sally Ride", "Amelia Earhart"],
          "correctIndex": 2,
          "explanation": "Sally Ride hizo vibrar a la NASA y a todo Estados Unidos con su vuelo en 1983."
        },
        {
          "question": "¿En qué famosa nave viajó Sally Ride?",
          "options": ["Cápsula Vostok", "Transbordador Challenger", "Cohete Saturno V", "Nave Soyuz"],
          "correctIndex": 1,
          "explanation": "Viajó a bordo de uno de los emblemáticos transbordadores espaciales de la NASA: el Challenger."
        },
        {
          "question": "¿Qué herramienta gigante del transbordador era experta en manejar?",
          "options": ["El rayo láser", "El sistema de frenos", "El brazo robótico", "El radar meteorológico"],
          "correctIndex": 2,
          "explanation": "Era la mejor en operar la gigante grúa conocida como 'brazo robótico canadiense'."
        },
        {
          "question": "¿Para qué usaba Sally el inmenso brazo robótico en el espacio?",
          "options": ["Para atrapar y lanzar satélites grandes", "Para defenderse", "Para limpiar la ventana", "Para recoger piedras lunares"],
          "correctIndex": 0,
          "explanation": "Ese brazo mecánico era usado para poner en el vacío grandes satélites de comunicación."
        },
        {
          "question": "¿A qué se dedicó principalmente Sally al terminar su carrera en la NASA?",
          "options": ["Ser actriz", "A enseñar ciencias e inspirar a los niños", "Ser doctora en un hospital", "Viajar en barco por el mundo"],
          "correctIndex": 1,
          "explanation": "Dedicó su vida entera a la educación y a inspirar a niños para que amaran las matemáticas y ciencias."
        }
      ]
    }
  }
];

jsData = jsData.filter(m => !m.id.startsWith('pioneros_'));
jsData.push(...pionerosModules);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('Pioneros reformatted 15x15 arrays, badges, and quizzes injected successfully');
