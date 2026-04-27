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

// Helpers for word count validation
function validateLines(name, arr) {
  if (arr.length !== 15) throw new Error(`${name} does not have 15 lines (has ${arr.length})`);
  arr.forEach((line, i) => {
    const words = line.trim().split(/\\s+/);
    if (words.length > 15) throw new Error(`${name} line ${i+1} has ${words.length} words: "${line}"`);
  });
  return arr;
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
          "title": "El Primer Hombre",
          "text": validateLines("Yuri 1", [
            "Yuri Gagarin nació en Rusia trabajando duramente en granjas y siendo obrero metalúrgico.",
            "Su pasión por la aviación lo llevó a convertirse en piloto militar experto.",
            "En 1960, fue seleccionado entre miles de candidatos para el programa espacial soviético.",
            "Soportó durísimas pruebas físicas, como girar en máquinas centrífugas a grandes velocidades.",
            "Demostró una increíble resistencia a las enormes fuerzas gravitacionales y aislamiento total.",
            "Su carácter tranquilo y gran memoria fotográfica lo hicieron el candidato perfecto.",
            "El cohete R-7 fue modificado para llevar una cápsula tripulada llamada Vostok.",
            "La nave Vostok 1 medía apenas dos metros de diámetro, era muy pequeña.",
            "Gagarin no podía controlar la nave; volaba en modo totalmente automático.",
            "Llevaba códigos secretos en un sobre por si necesitaba tomar el control manual.",
            "El 12 de abril de 1961, Yuri subió al gigantesco cohete preparado.",
            "Justo antes del despegue, pronunció su famosa frase histórica: '¡Poyekhali!' (¡Allá vamos!).",
            "Los motores encendieron con tremenda furia elevando la pesada nave hacia el cielo.",
            "La aceleración empujó fuertemente su cuerpo contra el asiento durante varios minutos.",
            "Así comenzó el vuelo que cambiaría para siempre la exploración espacial humana."
          ]),
          "video": "https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "yuri_2",
          "title": "Órbita Azul",
          "text": validateLines("Yuri 2", [
            "La nave Vostok 1 alcanzó una asombrosa velocidad de 27,400 kilómetros por hora.",
            "Logró escapar de la gravedad terrestre e ingresó en la órbita de nuestro planeta.",
            "Llegó a una altitud máxima de 327 kilómetros sobre la superficie terrestre.",
            "Yuri se convirtió en el primer ser humano en experimentar la microgravedad espacial.",
            "Notó asombrado cómo su lápiz y objetos flotaban mágicamente dentro de la cabina.",
            "Al mirar por la pequeña ventana, observó la hermosa curvatura de nuestro mundo.",
            "Vio los vastos océanos azules, nubes blancas y las gigantescas cadenas montañosas.",
            "Confirmó científicamente que la Tierra era una esfera brillante flotando en el vacío.",
            "Su vuelo orbital duró exactamente 108 minutos, completando una sola vuelta entera.",
            "Durante el trayecto, Yuri comió alimentos en forma de pasta desde unos tubos.",
            "Esto demostró que el cuerpo humano podía tragar y digerir sin fuerza gravitacional.",
            "Las estaciones terrestres soviéticas monitoreaban constantemente sus signos vitales por radio.",
            "Su corazón latía calmadamente, probando que el espacio no era mortalmente peligroso.",
            "El vuelo fue extremadamente rápido, cruzando océanos enteros en cuestión de pocos minutos.",
            "Todo el histórico viaje transcurrió sin ningún problema mecánico ni falla grave."
          ]),
          "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
          "imgCaption": "La maravillosa vista de la Tierra flotando en el vacío cósmico."
        },
        {
          "id": "yuri_3",
          "title": "Regreso Histórico",
          "text": validateLines("Yuri 3", [
            "Terminada la órbita, los motores de frenado retro-cohetes se encendieron automáticamente.",
            "La cápsula Vostok 1 comenzó su violento y caliente descenso hacia la atmósfera.",
            "El escudo térmico de la nave alcanzó miles de grados centígrados de temperatura.",
            "Las inmensas fuerzas aerodinámicas sacudieron la pequeña cabina esférica con mucha agresividad.",
            "Yuri experimentó fuerzas de hasta ocho gravedades aplastando fuertemente su resistente cuerpo.",
            "El diseño de la cápsula impedía un aterrizaje suave directamente sobre el suelo.",
            "Por este motivo técnico, el asiento de Yuri fue expulsado de la nave.",
            "Salió disparado a unos increíbles 7,000 metros de altura sobre el cielo terrestre.",
            "Desplegó su gran paracaídas personal cayendo lentamente hacia los campos agrícolas soviéticos.",
            "Aterrizó sano y salvo en una granja, sorprendiendo a unos campesinos locales.",
            "Se convirtió inmediatamente en un héroe nacional y un ícono histórico mundial.",
            "Su misión demostró que la humanidad tenía la capacidad tecnológica de viajar lejos.",
            "Esto inició oficialmente la gran 'Carrera Espacial' entre potencias mundiales como Estados Unidos.",
            "Yuri nunca volvió al espacio, pero siguió entrenando a las futuras generaciones cosmonautas.",
            "Su legado perdura como el gran pionero que abrió las puertas del cosmos."
          ]),
          "image": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200",
          "imgCaption": "El descenso en paracaídas fue un requisito técnico de las pesadas cápsulas Vostok."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Cuánto duró el vuelo de Yuri?", "options": ["3 días", "108 minutos", "5 horas", "20 minutos"], "correctIndex": 1, "explanation": "El histórico vuelo orbital de Vostok 1 duró exactamente 108 minutos." }, { "question": "¿Cápsula espacial de Gagarin?", "options": ["Apolo 11", "Sputnik", "Vostok 1", "Friendship 7"], "correctIndex": 2, "explanation": "Viajó en la pequeña cápsula soviética Vostok 1." }, { "question": "¿Por qué saltó en paracaídas?", "options": ["Se rompió la nave", "No sabía aterrizar", "La cápsula no tenía aterrizaje suave", "Quería ver el paisaje"], "correctIndex": 2, "explanation": "El diseño de Vostok 1 exigía que el piloto se eyectara a 7,000 metros." }, { "question": "¿Cuál fue su máxima altitud?", "options": ["327 km", "100 km", "1000 km", "Llegó a la Luna"], "correctIndex": 0, "explanation": "Logró una altura máxima (apogeo) de 327 kilómetros sobre la Tierra." }, { "question": "¿Qué demostró al comer pasta en tubos?", "options": ["Que la pasta es rica", "Que se puede tragar sin gravedad", "Que no había platos", "Que los rusos cocinan bien"], "correctIndex": 1, "explanation": "Fue un experimento clave para probar que la digestión humana funciona en microgravedad." } ] }
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
          "title": "El Proyecto Mercury",
          "text": validateLines("Alan 1", [
            "Alan Shepard fue uno de los siete primeros astronautas del famoso Proyecto Mercury estadounidense.",
            "Era un excelente y experimentado piloto de pruebas de la Marina militar.",
            "La incipiente agencia NASA lo seleccionó tras durísimas pruebas médicas y psicológicas exhaustivas.",
            "El objetivo estadounidense era alcanzar el espacio exterior antes que la Unión Soviética.",
            "Alan fue asignado para pilotar la primera misión humana llamada Mercury-Redstone 3.",
            "Su pequeña nave en forma de campana fue bautizada como Freedom 7.",
            "El espacio interno era tan pequeño que Shepard apenas cabía con su traje.",
            "Estuvo retrasado en la plataforma de lanzamiento durante horas por problemas eléctricos técnicos.",
            "Soportó pacientemente la larga espera conectado a pesados sistemas de ventilación y sensores.",
            "Finalmente, el histórico 5 de mayo de 1961, el conteo llegó a cero.",
            "El cohete Redstone, modificado de un misil militar, despegó con tremenda fuerza.",
            "Shepard soportó seis veces la fuerza de gravedad durante el violento ascenso inicial.",
            "Se convirtió en el primer estadounidense en lograr cruzar la atmósfera terrestre.",
            "Este lanzamiento fue transmitido en vivo por televisión a millones de personas expectantes.",
            "Fue un evento público que unió al país entero en la gran hazaña."
          ]),
          "video": "https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "alan_2",
          "title": "Vuelo Suborbital",
          "text": validateLines("Alan 2", [
            "El vuelo de Shepard fue totalmente distinto al de Gagarin, fue suborbital.",
            "Esto significa que subió altísimo y volvió a caer como una bala lanzada.",
            "No alcanzó la inmensa velocidad necesaria para mantenerse girando alrededor del planeta.",
            "La misión duró solamente quince minutos desde el dramático despegue hasta el final.",
            "Logró llegar a una impresionante altitud máxima de 187 kilómetros de altura.",
            "Durante esos breves minutos, Shepard experimentó cinco minutos enteros de ingravidez flotante.",
            "A diferencia de los soviéticos, Shepard sí controló manualmente su nave espacial tecnológica.",
            "Usó una pequeña palanca para ajustar los complejos propulsores de gas comprimido direccionales.",
            "Pudo girar y apuntar la pesada cápsula Freedom 7 hacia varias direcciones específicas.",
            "Demostró científicamente que los humanos podían trabajar activamente bajo condiciones extremas de microgravedad.",
            "Observó la maravillosa costa estadounidense del océano Atlántico a través del periscopio óptico.",
            "Informó constantemente su estado usando complejos términos aeronáuticos a los controladores terrestres.",
            "Su habilidad técnica demostró que las naves no debían ser totalmente automáticas siempre.",
            "Esta autonomía manual fue vital para los futuros y complejos viajes a la Luna.",
            "Shepard abrió el camino a naves piloteadas por humanos como verdaderos capitanes espaciales."
          ]),
          "image": "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200",
          "imgCaption": "El cohete Redstone fue el primer vehículo estadounidense en llevar humanos al límite espacial."
        },
        {
          "id": "alan_3",
          "title": "Regreso a la Luna",
          "text": validateLines("Alan 3", [
            "El rápido reingreso atmosférico de Freedom 7 fue perfecto y muy seguro.",
            "Soportó once gravedades de fuerza antes de abrir el inmenso paracaídas salvavidas principal.",
            "Aterrizó suavemente flotando en medio del océano Atlántico, cerca de las islas Bahamas.",
            "Un ágil helicóptero naval lo rescató junto con su histórica cápsula espacial metálica.",
            "Años después, Shepard fue diagnosticado con la molesta enfermedad de Meniere en el oído.",
            "Este problema médico lo alejó de poder volar al espacio durante muchos años.",
            "Sin embargo, tras una arriesgada cirugía experimental, recuperó totalmente su salud auditiva.",
            "Regresó a la agencia NASA con la firme meta de llegar a la Luna.",
            "En 1971, comandó brillantemente la compleja misión espacial del programa Apolo 14.",
            "Se convirtió en el quinto humano, y el de mayor edad, en pisarla.",
            "Paseó por la polvorienta superficie lunar realizando geología e instalando instrumentos científicos.",
            "Hizo historia divertida al golpear unas pequeñas pelotas de golf usando una herramienta.",
            "La baja gravedad lunar permitió que la bola volara cientos de metros lejanos.",
            "Alan Shepard pasó de un vuelo de quince minutos a conquistar la Luna.",
            "Su asombrosa persistencia y resiliencia es una de las grandes historias de NASA."
          ]),
          "image": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200",
          "imgCaption": "El exitoso acuatizaje de Freedom 7 en el océano Atlántico."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Qué tipo de vuelo realizó Shepard en Freedom 7?", "options": ["Orbital", "Suborbital", "Lunar", "Avión supersónico"], "correctIndex": 1, "explanation": "Fue un vuelo suborbital de quince minutos, subiendo como un misil y volviendo a caer." }, { "question": "¿Qué diferencia técnica tuvo su vuelo respecto al de Gagarin?", "options": ["Tenía ventanas", "Controló manualmente la nave", "Comió pizza", "Viajó con un perro"], "correctIndex": 1, "explanation": "Shepard fue el primer humano en usar controles manuales direccionales en el espacio." }, { "question": "¿Cuánto duró su primera misión?", "options": ["108 minutos", "15 minutos", "3 días", "1 año"], "correctIndex": 1, "explanation": "El histórico vuelo suborbital de Freedom 7 duró tan solo 15 intensos minutos." }, { "question": "¿Qué enfermedad lo alejó temporalmente de volar?", "options": ["Meniere (oído)", "Ceguera", "Gripe", "Huesos frágiles"], "correctIndex": 0, "explanation": "La enfermedad de Meniere en el oído interno le causaba vértigo severo." }, { "question": "¿Qué hizo en la Luna en Apolo 14?", "options": ["Durmió", "Golpeó bolas de golf", "Manejó un auto", "Pintó una bandera"], "correctIndex": 1, "explanation": "Usó una herramienta para golpear dos pelotas de golf en la baja gravedad lunar." } ] }
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
          "title": "Buscando la Órbita",
          "text": validateLines("John 1", [
            "Después de los cortos vuelos suborbitales, Estados Unidos necesitaba igualar la hazaña soviética.",
            "El objetivo urgente era poner a un humano en verdadera órbita alrededor de la Tierra.",
            "John Glenn, un piloto de combate de la Marina, fue el astronauta elegido.",
            "Había roto varios récords de velocidad en vuelos supersónicos cruzando el país entero.",
            "Para esta difícil misión orbital, se usó el gigantesco y peligroso cohete Atlas.",
            "El Atlas había explotado varias veces durante peligrosas pruebas sin tripulación anteriores.",
            "Sin embargo, Glenn confió plenamente en los brillantes ingenieros aeroespaciales de la NASA.",
            "Su pequeña cápsula Mercury fue nombrada cariñosamente como Friendship 7 por sus hijos.",
            "El 20 de febrero de 1962, subió a la peligrosa torre de lanzamiento.",
            "Esperó pacientemente dentro de la angosta cápsula durante múltiples retrasos técnicos graves.",
            "Finalmente, el gigantesco Atlas encendió sus masivos motores levantando la pesada nave metálica.",
            "El ascenso fue muy brusco, con enormes vibraciones sacudiendo violentamente toda su cápsula.",
            "Aceleró a más de 28,000 kilómetros por hora para poder orbitar la Tierra.",
            "Estados Unidos lograba por fin tener a un hombre orbitando su querido planeta.",
            "John sintió la maravillosa ingravidez mientras su nave se estabilizaba en el vacío."
          ]),
          "video": "https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "john_2",
          "title": "Las Luciérnagas de Hielo",
          "text": validateLines("John 2", [
            "Glenn orbitó nuestro hermoso planeta a una altitud de 260 kilómetros de altura.",
            "Su histórico y emocionante viaje completó tres órbitas enteras en unas cinco horas.",
            "Durante su vuelo, observó la geografía terrestre y reportó sus investigaciones atmosféricas.",
            "Vio espectaculares atardeceres y amaneceres rápidos causados por su extrema velocidad en órbita.",
            "En un momento, notó miles de pequeñas partículas brillantes flotando fuera de su nave.",
            "Las describió poéticamente como cientos de 'luciérnagas espaciales' danzando mágicamente en el espacio.",
            "Los científicos terrestres no entendían qué extrañas partículas estaba observando el fascinado piloto.",
            "Posteriormente se descubrió que era condensación de agua expulsada por su propia cápsula.",
            "Esta agua se congelaba al instante formando cristales de hielo que brillaban mucho.",
            "En la segunda órbita, un sensor indicó un problema gravísimo en su nave.",
            "La luz de alerta advertía que su escudo térmico protector estaba totalmente suelto.",
            "Sin escudo térmico, la cápsula se desintegraría por completo en fuego al reingresar.",
            "El control de la misión analizó apresuradamente cómo salvar la vida del astronauta.",
            "Le ordenaron no soltar los retro-cohetes atados, esperando que sujetaran el escudo térmico.",
            "Glenn voló las órbitas restantes bajo enorme presión psicológica por el grave peligro."
          ]),
          "image": "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200",
          "imgCaption": "El hielo expulsado por la nave creó brillantes cristales reflectantes en el vacío."
        },
        {
          "id": "john_3",
          "title": "Fuego y Retorno Histórico",
          "text": validateLines("John 3", [
            "El reingreso a nuestra atmósfera terrestre fue el momento más tenso del proyecto.",
            "John mantuvo los retro-cohetes atados a la cápsula, cruzando los dedos para sobrevivir.",
            "Al entrar al denso aire, la nave se envolvió en intenso plasma ardiente.",
            "Por la ventana, Glenn veía grandes trozos de metal rojo fuego volando agresivamente.",
            "Él pensó seriamente que su indispensable escudo térmico se estaba destruyendo en pedazos.",
            "Durante varios minutos escalofriantes, el gran muro de fuego bloqueó las comunicaciones radiales.",
            "En la Tierra, los nerviosos ingenieros esperaban escuchar nuevamente su valiente voz humana.",
            "De repente, el fuerte sonido estático se cortó y Glenn reportó estar bien.",
            "Afortunadamente, el sensor que reportaba el escudo térmico suelto simplemente estaba muy roto.",
            "El escudo térmico siempre estuvo seguro y protegió perfectamente la nave Friendship 7.",
            "Aterrizó a salvo en el océano Atlántico completando la monumental proeza científica estadounidense.",
            "Glenn se retiró y se convirtió en un gran y respetado senador político.",
            "Increíblemente, en 1998, a sus maravillosos 77 años, regresó a viajar al cosmos.",
            "Voló exitosamente en el moderno Transbordador Espacial Discovery investigando el envejecimiento en microgravedad.",
            "Sigue siendo la persona de mayor edad que ha orbitado el gran universo."
          ]),
          "image": "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200",
          "imgCaption": "John Glenn superó un falso pero terrorífico reporte de falla del escudo térmico."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Qué cohete peligroso llevó a Glenn al espacio?", "options": ["Redstone", "Atlas", "Saturno V", "Falcon 9"], "correctIndex": 1, "explanation": "Usaron el cohete orbital Atlas, modificado de misiles balísticos muy potentes." }, { "question": "¿Qué eran realmente las 'luciérnagas espaciales'?", "options": ["Alienígenas", "Polvo lunar", "Cristales de hielo congelado", "Fuego de la nave"], "correctIndex": 2, "explanation": "Eran cristales de hielo brillante provenientes de los fluidos de su propia nave." }, { "question": "¿Qué falsa emergencia aterrorizó su misión?", "options": ["Se acabó el aire", "El escudo térmico parecía estar suelto", "Un meteorito", "El motor explotó"], "correctIndex": 1, "explanation": "Un sensor defectuoso indicó que el vital escudo contra el calor estaba desprendido." }, { "question": "¿Qué hizo en su regreso a los 77 años?", "options": ["Investigó el envejecimiento en microgravedad", "Reparó un satélite roto", "Viajó a Marte", "Pisó la Luna"], "correctIndex": 0, "explanation": "En el Discovery, los médicos estudiaron cómo el espacio afecta a personas mayores." }, { "question": "¿Cuántas órbitas completó en su primer viaje?", "options": ["Una", "Diez", "Tres", "Quince"], "correctIndex": 2, "explanation": "A bordo de la Friendship 7 logró completar tres vueltas enteras al planeta." } ] }
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
          "title": "La Trabajadora Textil",
          "text": validateLines("Valentina 1", [
            "Valentina Tereshkova nació en un pequeño y humilde pueblo de la Rusia central.",
            "De joven trabajaba reparando telares en una gigantesca fábrica de textiles de algodón.",
            "Sin embargo, tenía un pasatiempo extremo que marcaría el destino de su vida.",
            "Era una experta paracaidista aficionada que saltaba fines de semana en un aeroclub local.",
            "Esta rara habilidad llamó la profunda atención de los reclutadores del programa espacial.",
            "Las cápsulas soviéticas Vostok requerían que el piloto saltara en paracaídas al aterrizar.",
            "Buscando asegurar otro hito histórico frente a Estados Unidos, buscaron a una mujer.",
            "Valentina fue elegida entre más de cuatrocientas candidatas extremadamente capacitadas y muy fuertes.",
            "Entrenó duramente soportando calor extremo, aislamiento en solitario y rápidos vuelos de gravedad.",
            "Soportó dolorosas pruebas físicas demostrando ser igual o más resistente que muchos hombres.",
            "Le asignaron el lindo nombre clave de 'Chayka', que significa Gaviota en ruso.",
            "El 16 de junio de 1963, fue lanzada a bordo de la Vostok 6.",
            "Gritó alegremente: '¡Eh, cielo, quítate el sombrero! ¡Voy a verte!' al iniciar despegue.",
            "A sus jóvenes 26 años, rompió barreras inmensas convirtiéndose en primera cosmonauta mundial.",
            "Inició el asombroso viaje para conquistar el espacio que era exclusivo de hombres."
          ]),
          "video": "https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "valentina_2",
          "title": "Vuelo de Larga Duración",
          "text": validateLines("Valentina 2", [
            "La increíble misión de Valentina no fue un viaje corto ni sencillo orbital.",
            "Pasó casi tres días completos viviendo dentro de la pequeña nave esférica espacial.",
            "Realizó 48 impresionantes órbitas alrededor de la Tierra recorriendo dos millones de kilómetros.",
            "Ella sola acumuló mucho más tiempo en órbita que todos los astronautas estadounidenses.",
            "En el espacio sufrió mareos espaciales intensos y muchos dolores en su cuerpo.",
            "A pesar del fuerte malestar físico, se mantuvo profesional, fuerte, firme y concentrada.",
            "Tomó espectaculares fotografías de los hermosos horizontes y la densa atmósfera de Tierra.",
            "Estas imágenes fueron usadas científicamente para identificar peligrosos aerosoles flotando en el cielo.",
            "Durante el viaje, experimentó un gravísimo error en la programación del computador automático.",
            "La nave, en lugar de descender hacia la atmósfera, intentaba alejarse de Tierra.",
            "Si no corregía la ruta, se perdería totalmente y moriría en el espacio.",
            "Con nervios de hielo, ajustó manualmente los complicados datos de orientación en órbita.",
            "Logró corregir la órbita permitiendo que el módulo de descenso apuntara hacia casa.",
            "Este enorme acto técnico demostró su brillante preparación bajo inmensa presión mental extrema.",
            "Valentina demostró que las mujeres tienen igual resistencia psicológica en misiones espaciales largas."
          ]),
          "image": "https://images.unsplash.com/photo-1536697246787-1f276329efba?q=80&w=1200",
          "imgCaption": "Valentina completó 48 órbitas, superando todos los récords de vuelo estadounidenses previos combinados."
        },
        {
          "id": "valentina_3",
          "title": "Salto Triunfal",
          "text": validateLines("Valentina 3", [
            "La cápsula Vostok 6 ingresó furiosamente envuelta en fuertes llamas a la atmósfera.",
            "Alcanzando la segura altitud de 7,000 metros, Valentina ejecutó su experto salto salvavidas.",
            "Fue expulsada mecánicamente de su asiento descendiendo sola sostenida por un gigante paracaídas.",
            "Los intensos vientos terrestres le causaron un duro golpe al chocar contra suelo.",
            "Terminó con un moretón fuerte en su rostro debido al casco protector metálico.",
            "A pesar del dolor físico, sonrió al ser recibida por los felices campesinos.",
            "Les ofreció sobras de su interesante comida espacial deshidratada como un hermoso regalo.",
            "Su éxito la catapultó convirtiéndola en una enorme figura política y respetada heroína.",
            "Se graduó formalmente como una brillante ingeniera cosmonauta y general de la fuerza.",
            "Pasarían casi veinte largos años antes de que otra mujer viajara al espacio.",
            "Valentina rompió los antiguos prejuicios abriendo permanentemente las grandes estrellas al género femenino.",
            "Ha recibido muchísimas medallas mundiales y reconocimiento histórico de Naciones Unidas en Tierra.",
            "Incluso declaró estar dispuesta a realizar un peligrosísimo viaje sin retorno hacia Marte.",
            "La inspiradora y valiente 'Gaviota' sigue siendo un fuerte símbolo astronáutico de resiliencia.",
            "Demostró eternamente que no existen límites celestes para los grandes sueños de humanidad."
          ]),
          "image": "https://images.unsplash.com/photo-1528659135063-25ee6d22ba71?q=80&w=1200",
          "imgCaption": "Al igual que Gagarin, Valentina saltó en paracaídas desde 7,000 metros de altitud."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Cuál era la profesión inicial de Valentina?", "options": ["Doctora", "Trabajadora textil", "Bióloga", "Piloto de guerra"], "correctIndex": 1, "explanation": "Trabajaba reparando grandes máquinas textiles y saltaba en paracaídas por afición." }, { "question": "¿Qué error computacional casi le cuesta la vida?", "options": ["La nave ascendía", "Se apagó el motor", "Fuga de oxígeno", "Fallo de radio"], "correctIndex": 0, "explanation": "El piloto automático estaba mal programado y alejaba a la nave de la Tierra." }, { "question": "¿Cómo se salvó del error del piloto automático?", "options": ["Rezando", "Durmiendo", "Corrigió los datos manualmente", "Una nave la rescató"], "correctIndex": 2, "explanation": "Ingresó nuevos datos orbitales al computador para forzar el descenso correcto." }, { "question": "¿Qué nombre clave y poético utilizó en radio?", "options": ["Estrella", "Gaviota (Chayka)", "Halcón", "Lobo"], "correctIndex": 1, "explanation": "La llamaban 'Gaviota', un nombre que pasó a la historia del cosmos." }, { "question": "¿Cuántas órbitas logró en sus casi tres días de vuelo?", "options": ["10", "48", "100", "5"], "correctIndex": 1, "explanation": "Completó unas impresionantes 48 órbitas, superando récords de duración." } ] }
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
          "title": "Misión Extrema",
          "text": validateLines("Leonov 1", [
            "Aleksei Leonov fue elegido para lograr un inmenso hito: la primera caminata espacial.",
            "La agencia soviética aceleró el peligroso programa Voskhod para ganarle velozmente a NASA.",
            "La nave Voskhod 2 fue equipada con una curiosa escotilla de túnel inflable.",
            "El túnel permitía al cosmonauta salir sin que se perdiera el oxígeno interno.",
            "El 18 de marzo de 1965, Leonov y el comandante Belyayev despegaron exitosamente.",
            "Llevaba un enorme e innovador traje espacial llamado Berkut diseñado como mochila presurizada.",
            "Estando en órbita, Leonov infló el pequeño túnel de tela sellando las puertas.",
            "Abrió valientemente la compuerta externa exponiéndose directamente al frío e inmenso vacío espacial.",
            "Se impulsó flotando hacia la gigantesca nada, unido solo por un cable umbilical.",
            "Con gran emoción, se convirtió en primer ser humano en flotar libremente afuera.",
            "Debajo de él pasaban los continentes y océanos brillantes a enorme velocidad impresionante.",
            "Disfrutó la hermosa y solitaria vista del enorme planeta silencioso girando muy pacíficamente.",
            "Incluso tenía una pequeña cámara pegada para filmar este valioso logro científico mundial.",
            "Pasó unos emocionantes doce minutos fuera de la segura nave respirando oxígeno puro.",
            "Todo parecía marchar perfecto hasta que las leyes de física comenzaron a traicionarlo."
          ]),
          "video": "https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "leonov_2",
          "title": "Traje Inflado",
          "text": validateLines("Leonov 2", [
            "El vacío total del espacio exterior causó un gigantesco y casi mortal problema.",
            "Sin presión externa, el grueso traje espacial de Leonov comenzó a inflarse drásticamente.",
            "Se convirtió rápidamente en un globo muy tenso y totalmente rígido por dentro.",
            "Sus dedos ya no podían moverse libremente para agarrar cables o pesadas herramientas.",
            "Sus botas incluso se salieron internamente de sus pies por la inmensa rigidez.",
            "Llegó el momento crítico de terminar el paseo y volver al estrecho túnel.",
            "Leonov intentó desesperadamente entrar por la compuerta, pero su inflado traje no cabía.",
            "No lograba doblar sus rodillas rígidas para deslizarse hacia la pequeña esclusa inflable.",
            "Su ritmo cardíaco se aceleró enormemente, sudando muchísimo por el esfuerzo físico extremo.",
            "Estaba corriendo serio riesgo de agotar su limitado aire o flotar para siempre.",
            "Tomó una rápida y muy arriesgada decisión que violaba las rígidas reglas espaciales.",
            "Abrió una pequeña válvula liberando gran cantidad de su vital oxígeno al espacio.",
            "Desinfló su traje arriesgando sufrir una severa enfermedad por rápida descompresión física peligrosa.",
            "Logró encogerse justo a tiempo y metió su cuerpo esforzadamente al apretado túnel.",
            "Sobrevivió por puro milagro, cerrando herméticamente la gran escotilla externa con fuerza desesperada."
          ]),
          "image": "https://images.unsplash.com/photo-1614728423169-3f65fd722b05?q=80&w=1200",
          "imgCaption": "El vacío absoluto provocó que el traje Berkut se inflara hasta quedar inmovilizado."
        },
        {
          "id": "leonov_3",
          "title": "Perdidos en el Bosque",
          "text": validateLines("Leonov 3", [
            "Los problemas de la accidentada misión soviética no terminaron con el desesperado paseo.",
            "Durante el veloz reingreso, el sistema de navegación automática de aterrizaje falló completamente.",
            "Tuvieron que disparar los retro-cohetes usando sistemas manuales, alterando enormemente la trayectoria calculada.",
            "La cápsula se desvió cientos de kilómetros de su cómoda zona de aterrizaje.",
            "Terminaron cayendo en medio de un helado y salvaje bosque en Siberia oriental.",
            "Aterrizaron entre enormes árboles de nieve profunda, a temperaturas de treinta grados bajo cero.",
            "La espesa nieve atrapó fuertemente la gran puerta de su pesada nave metálica.",
            "Al salir, enfrentaron otro gigantesco peligro: enormes manadas de lobos y grandes osos.",
            "Tuvieron que encender grandes fogatas y portar una pistola para proteger su vida.",
            "Los helicópteros de rescate los encontraron, pero no podían aterrizar en árboles altos.",
            "Pasaron dos duras y frías noches acampando en la salvaje nieve siberiana congelada.",
            "Finalmente esquiaron muchos kilómetros hasta donde un helicóptero espacial logró evacuarlos a salvo.",
            "Esta casi fatal misión demostró la enorme y difícil peligrosidad de viajar alto.",
            "Leonov demostró ser un explorador durísimo, con nervios de frío acero ruso auténtico.",
            "Escribió valiosos manuales detallando cómo dominar las caminatas espaciales futuras y sobrevivir siempre."
          ]),
          "image": "https://images.unsplash.com/photo-1478147424132-026f743c3d52?q=80&w=1200",
          "imgCaption": "Las heladas tierras de Siberia albergaron a los cosmonautas perdidos durante 2 días."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Qué histórico logro realizó Leonov en Voskhod 2?", "options": ["Fue a Marte", "Hizo la primera caminata espacial (EVA)", "Pilotó el transbordador", "Descubrió anillos"], "correctIndex": 1, "explanation": "Fue el pionero indiscutible de las caminatas espaciales (Extravehicular Activity)." }, { "question": "¿Por qué estuvo a punto de no poder entrar a su nave?", "options": ["Perdió la llave", "Su traje se infló en el vacío y no cabía", "Un alienígena", "Se quedó dormido"], "correctIndex": 1, "explanation": "El traje se expandió tanto que sus articulaciones quedaron bloqueadas." }, { "question": "¿Cómo solucionó audazmente el problema de su traje inflado?", "options": ["Rompió la tela", "Liberó oxígeno al espacio para desinflarlo", "La cortó", "Su amigo lo empujó"], "correctIndex": 1, "explanation": "Se arriesgó a una descompresión al liberar aire intencionalmente." }, { "question": "¿En qué entorno salvaje y peligroso aterrizaron por accidente?", "options": ["Océano Pacífico", "Desierto de Sahara", "Helado bosque profundo en Siberia", "Nueva York"], "correctIndex": 2, "explanation": "El fallo de navegación los desvió al peligroso bosque invernal de Siberia." }, { "question": "¿Cuánto tiempo tuvieron que sobrevivir acampando en la nieve?", "options": ["Dos noches completas", "Una semana", "Un mes", "Cinco minutos"], "correctIndex": 0, "explanation": "El equipo de rescate tardó dos días en sacarlos del frondoso bosque nevado." } ] }
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
          "title": "Segunda Mujer Cosmonauta",
          "text": validateLines("Svetlana 1", [
            "Pasaron diecinueve largos años de espera después del gran vuelo pionero de Valentina.",
            "La Unión Soviética seleccionó rápidamente a Svetlana Savitskaya para ser la segunda cosmonauta.",
            "Svetlana era una brillante y excelente piloto de pruebas de veloces aviones supersónicos.",
            "Había roto grandiosos récords mundiales mundiales volando a velocidades impresionantemente rápidas y altas.",
            "Además era experta ingeniera y famosa campeona mundial haciendo peligrosísimos saltos de paracaidismo.",
            "En agosto de 1982, fue lanzada en la muy moderna misión tripulada Soyuz T-7.",
            "A diferencia de las pequeñas cápsulas, ella viajó acoplándose a la gran estación.",
            "Vivió siete días enteros realizando trabajos científicos dentro de la estación espacial Salyut.",
            "La estación Salyut era un inmenso y maravilloso laboratorio flotante orbitando nuestra Tierra.",
            "Realizó valiosos e interesantes experimentos biológicos, astrofísicos y médicos en profunda y clara microgravedad.",
            "Los ingenieros probaron su alta adaptación corporal volando sin experimentar gravedad por días.",
            "Svetlana probó tener altísima tolerancia física al fuerte mareo causado por movimientos espaciales.",
            "Su tremendo éxito cerró muchísimas bocas dudando de las brillantes capacidades técnicas femeninas.",
            "Su habilidad técnica superó ampliamente la de muchos compañeros hombres durante su viaje.",
            "Aseguró firmemente que muchísimas más mujeres fueran aceptadas volando en programas espaciales avanzados."
          ]),
          "image": "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200",
          "imgCaption": "Las estaciones Salyut eran grandes laboratorios donde los humanos vivían y trabajaban en microgravedad.",
          "style": "highlight"
        },
        {
          "id": "svetlana_2",
          "title": "Caminata y Soldadura",
          "text": validateLines("Svetlana 2", [
            "El gran hito histórico supremo de Svetlana ocurrió durante su impresionante segundo viaje.",
            "En el ardiente verano de 1984, viajó nuevamente a la gran estación Salyut 7.",
            "Se preparó duramente usando un pesado traje espacial Orlan, diseñado para largos paseos.",
            "El 25 de julio, Svetlana salió valientemente al gélido y oscuro vacío cósmico.",
            "Fue la primera e histórica vez que una mujer caminaba flotando en espacio.",
            "Pero su grandiosa misión no era simplemente salir para disfrutar las brillantes vistas.",
            "Tenía que probar una compleja y peligrosísima herramienta portátil de enorme soldadura electrónica.",
            "Operar láseres calientes y potentes chispas eléctricas en espacio vacío es extremadamente arriesgado.",
            "Svetlana cortó gruesos y resistentes metales flotando a cientos de kilómetros de altura.",
            "Aplicó revestimientos especiales para reparar piezas externas de toda la gran estación espacial.",
            "El duro trabajo físico fuera de nave agota rápidamente los músculos del astronauta.",
            "Manejó el pesado equipo usando inmensa concentración para no quemar o perforar guantes.",
            "Cualquier hoyo diminuto en su traje Orlan causaría una despresurización rápida y mortal.",
            "Trabajó arduamente afuera durante maravillosas tres horas y treinta y cinco gloriosos minutos.",
            "Demostró indiscutiblemente ser una grandiosa operadora de altísima precisión trabajando en extremo vacío."
          ]),
          "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
          "imgCaption": "Soldar metales en microgravedad requiere herramientas láser precisas para evitar chispas peligrosas."
        },
        {
          "id": "svetlana_3",
          "title": "Un Legado Científico",
          "text": validateLines("Svetlana 3", [
            "Después de completar brillantemente su enorme hazaña de soldadura, reingresó a la estación.",
            "Esta caminata espacial elevó rápidamente su prestigio a niveles asombrosos dentro del país.",
            "Regresó exitosamente a nuestro planeta con muchísima valiosa información técnica y nueva geológica.",
            "Se planeó designarla oficialmente comandante de una arriesgada tripulación exclusivamente compuesta de mujeres.",
            "Lamentablemente, grandes problemas técnicos con las estaciones soviéticas retrasaron y cancelaron ese plan.",
            "Sin embargo, Svetlana Savitskaya ya había destrozado permanentemente grandísimos y anticuados techos de cristal.",
            "Ganó dos importantes y respetadas medallas doradas como enorme 'Heroína de Unión Soviética'.",
            "Después de abandonar los arriesgados vuelos cósmicos, se dedicó totalmente a la política.",
            "Ha sido diputada apoyando leyes para avanzar la ciencia e impulsar tecnología aeroespacial.",
            "También dedicó largos años educando nuevos pilotos sobre peligrosas y complicadas aerodinámicas de vuelo.",
            "Svetlana es recordada históricamente como una pionera inquebrantable trabajando en altísimo frío extremo.",
            "Ella probó valientemente que pesados trabajos de ingeniería son totalmente posibles para mujeres.",
            "Sus técnicas usadas para soldadura espacial siguen siendo aplicadas en construcción de satélites.",
            "Inspiró gigantescamente a incontables mujeres que hoy brillan trabajando en NASA y ESA.",
            "Su asombroso éxito técnico vivirá para siempre iluminando las hermosas estrellas de astronomía."
          ]),
          "image": "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200",
          "imgCaption": "Svetlana regresó con información clave para construir futuras estaciones modernas."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿A qué se dedicaba Svetlana antes de ser astronauta?", "options": ["Doctora infantil", "Piloto acrobática y de pruebas en aviones supersónicos", "Ingeniera civil", "Cocinera naval"], "correctIndex": 1, "explanation": "Tenía gran experiencia manejando jets de combate y rompiendo récords de velocidad." }, { "question": "¿Qué hito mundial logró Svetlana en julio de 1984?", "options": ["Llegar a Marte", "Primera mujer en flotar haciendo caminata espacial (EVA)", "Pilotar el Concorde", "Saltar de la estratosfera"], "correctIndex": 1, "explanation": "Fue la primera mujer en salir al vacío del espacio usando traje." }, { "question": "¿Qué tarea de gran ingeniería y riesgo hizo en su caminata?", "options": ["Limpió paneles solares", "Atrapó un satélite", "Probó herramientas portátiles soldando y cortando metales duros", "Solo tomó fotografías panorámicas"], "correctIndex": 2, "explanation": "Probó por primera vez equipo para soldar chapa metálica pesada en microgravedad." }, { "question": "¿Por qué era peligroso hacer eso en el vacío?", "options": ["Había lluvia espacial", "Los extraterrestres la miraban", "Una chispa caliente podría haber perforado su grueso traje causando muerte", "Le daba frío intenso"], "correctIndex": 2, "explanation": "Trabajar con altas temperaturas y metales cortantes cerca del frágil traje es mortal." }, { "question": "¿Cuánto duró su brillante y tensa caminata histórica?", "options": ["Casi doce minutos", "Más de tres largas horas (3h 35m)", "Quince rápidas horas", "Dos fríos días"], "correctIndex": 1, "explanation": "Mantuvo la alta concentración requerida por 3 horas y 35 minutos trabajando afuera." } ] }
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
          "title": "La Gran Científica",
          "text": validateLines("Sally 1", [
            "Sally Kristen Ride era una grandiosa y brillante estudiante amante del agresivo tenis.",
            "Dejó los deportes competitivos para seguir su gigante y gran amor por ciencia.",
            "Estudió muchísimo graduándose inteligentemente con grandes honores estudiando física en respetada universidad Stanford.",
            "Investigó profundamente oscuros misterios astronómicos y avanzados fenómenos extraños de láseres muy potentes.",
            "En 1977, leyó casualmente un anuncio de NASA buscando integrar excelentes nuevos científicos.",
            "NASA ya no solo requería rápidos pilotos, buscaba investigadores astrofísicos para el transbordador.",
            "Postuló valientemente compitiendo ferozmente contra casi mil impresionantes mujeres y muchísimos hombres preparados.",
            "Su grandiosa inteligencia analítica, perfecta memoria y enorme calma asombraron positivamente a NASA.",
            "Fue seleccionada, siendo brillante especialista de intensa misión en complejas comunicaciones muy avanzadas.",
            "Trabajó intensamente ayudando a diseñar la enorme grúa mecánica gigante del flamante transbordador.",
            "Entrenó arduamente durante larguísimos seis años antes de lograr abordar una auténtica nave.",
            "Enfrentó muchísimos prejuicios sociales mediáticos pero siempre mantuvo firme su gran dignidad científica.",
            "Demostró sobradamente que las asombrosas mentes brillantes femeninas aportaban infinito valor a NASA.",
            "En el hermoso mes cálido de junio de 1983, llegó su gran oportunidad.",
            "Inició el histórico viaje subiendo a bordo del asombroso Transbordador espacial llamado Challenger."
          ]),
          "image": "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200",
          "imgCaption": "El Transbordador Espacial fue diseñado para llevar a los mejores científicos a órbita.",
          "style": "highlight"
        },
        {
          "id": "sally_2",
          "title": "Maestría Robótica",
          "text": validateLines("Sally 2", [
            "El 18 de junio, el Challenger despegó rugiendo maravillosamente hacia nuestro cielo azul.",
            "Sally Ride cruzó velozmente la pesada atmósfera, marcando un inmenso triunfo espacial americano.",
            "A sus impresionantes jóvenes 32 años, fue la astronauta nacional estadounidense más joven.",
            "Se convirtió brillantemente en la primera mujer heroica estadounidense flotando en órbita terrestre.",
            "Como especialista oficial, su gran e inmenso trabajo principal era sumamente complejo matemáticamente.",
            "Ella fue la mejor ingeniera operando el enorme e innovador brazo robótico canadiense.",
            "Esta gigantesca y pesada grúa espacial medía unos quince largos y asombrosos metros.",
            "Moviendo ágilmente complejas palancas, atrapó suavemente un importante y valioso satélite en vuelo.",
            "Alineó perfectamente los inmensos paneles solares flotantes usando alta y detallada destreza analítica.",
            "Sus geniales y perfectas maniobras probaron científicamente que usar pesados brazos mecánicos funcionaba.",
            "También manejó grandiosos y muy complejos experimentos médicos usando pequeñas ranas de laboratorio.",
            "Disfrutó inmensamente la gran experiencia de flotar libremente impulsándose fuertemente por anchos pasillos.",
            "Admiró extasiada los brillantes y muy hermosos mares luminosos desde amplias ventanas frontales.",
            "Tras seis valiosos días enteros investigando exitosamente, la asombrosa misión concluyó a perfección.",
            "Aterrizó segura sabiendo profundamente que había abierto inmensas oportunidades para las científicas mundiales."
          ]),
          "image": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200",
          "imgCaption": "Operar el brazo robótico (Canadarm) exige enorme habilidad matemática y coordinación ocular."
        },
        {
          "id": "sally_3",
          "title": "Misión Educativa",
          "text": validateLines("Sally 3", [
            "Sally Ride viajó exitosamente en el transbordador espacial por segunda vez al año siguiente.",
            "Trágicamente, el Challenger explotó tiempo después, cancelando profundamente su planeado tercer viaje cósmico.",
            "Formó valientemente parte oficial del importante panel gubernamental investigando este enorme desastre aeroespacial.",
            "Su gigante aportación técnica ayudó inmensamente a construir y diseñar futuras naves seguras.",
            "Al retirarse honoríficamente de NASA, decidió seguir su intensa y maravillosa pasión pedagógica.",
            "Escribió valiosos y asombrosos libros científicos motivacionales para inspirar velozmente a pequeños niños.",
            "Inició el enorme y grandioso proyecto EarthKAM en respetada colaboración educativa con NASA.",
            "Este sistema maravillosamente permitió a jóvenes estudiantes manejar grandes cámaras espaciales por internet.",
            "Millones de escuelas mundiales tomaron excelentes y muy educativas fotos satelitales directamente online.",
            "Sally deseaba ardientemente que las brillantes mentes de niñas amaran profundas matemáticas exactas.",
            "Sus empresas donaron muchísimas becas fomentando increíblemente las nobles y maravillosas carreras científicas.",
            "Falleció en 2012, dejando enormemente un legado gigantesco inspirando asombrosamente a muchas generaciones.",
            "NASA nombró respetuosamente el lugar donde cayeron preciosos satélites lunares en su gigantesco honor.",
            "Su brillante sonrisa científica vivirá siempre impulsando jóvenes mentes soñadoras del planeta azul.",
            "Sally es el gigante faro eterno demostrando que estudiar ciencias lleva al infinito."
          ]),
          "image": "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=1200",
          "imgCaption": "Su programa EarthKAM conectó satélites y transbordadores a las aulas de educación básica."
        }
      ]
    },
    "quiz": { "questionsEs": [ { "question": "¿Qué importante carrera profesional estudió la brillante Sally Ride?", "options": ["Medicina de ranas", "Física astrofísica e investigación en láseres", "Filosofía antigua", "Arquitectura naval"], "correctIndex": 1, "explanation": "Tenía un doctorado de Stanford en física, especializado en astrofísica y rayos láser." }, { "question": "¿Qué hito espacial nacional marcó ella a los 32 años?", "options": ["Caminó en Marte", "Piloteó el Concorde sola", "Primera mujer estadounidense y más joven del país en espacio", "Saltó desde la luna"], "correctIndex": 2, "explanation": "Se convirtió en la primera mujer astronauta de Estados Unidos y la más joven." }, { "question": "¿Cuál era su tarea de mayor complejidad técnica durante el vuelo?", "options": ["Cocinar comida caliente", "Pintar exterior de nave", "Operar a precisión la gran grúa gigante del brazo robótico", "Limpiar cabina sucia"], "correctIndex": 2, "explanation": "Fue la experta principal en operar el complejo y largo brazo mecánico (Canadarm)." }, { "question": "¿Qué maravilloso programa escolar e interactivo fundó con NASA?", "options": ["Volar aviones", "Lanzar pequeños cohetes", "EarthKAM, para que alumnos tomaran fotos reales desde el espacio", "Plantar hermosos árboles"], "correctIndex": 2, "explanation": "EarthKAM permitía a estudiantes secundarios tomar maravillosas fotografías usando satélites orbitales reales." }, { "question": "¿Qué meta personal tuvo al escribir asombrosos libros científicos?", "options": ["Ser millonaria", "Aprender español", "Inspirar a niñas y niños a amar enormemente las ciencias y matemáticas", "Viajar nuevamente a China"], "correctIndex": 2, "explanation": "Quería eliminar los fuertes prejuicios sociales y emocionar a la niñez con las ciencias exactas." } ] }
  }
];

// Combine into JS Data
jsData = jsData.filter(m => !m.id.startsWith('pioneros_'));
jsData.push(...pionerosModules);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('Pioneros 15x15 Sci-History Edition Injected successfully');
