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

const format15x15 = (lines) => lines.join('\\n');

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
          "text": format15x15([
            "El 12 de abril de 1961, el mundo entero cambió para siempre en la historia.",
            "El joven cosmonauta soviético Yuri Gagarin se preparó valientemente para un viaje totalmente desconocido.",
            "A bordo de su pequeña cápsula Vostok 1, Gagarin despegó con una inmensa fuerza.",
            "Se convirtió en el primer ser humano en viajar más allá de nuestra atmósfera.",
            "Este logro monumental demostró a la humanidad que podíamos alcanzar las estrellas más lejanas."
          ]),
          "video": "https://drive.google.com/file/d/1dYjSircx9WCGCzukiCrq35MvIvgzl-Gp/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "yuri_2",
          "title": "Un Vuelo Inolvidable",
          "text": format15x15([
            "La nave Vostok 1 orbitó nuestro planeta Tierra una sola vez a gran velocidad.",
            "El vuelo completo duró solamente 108 minutos, pero requirió muchísimos años de preparación científica.",
            "A una altitud asombrosa de 327 kilómetros, Yuri experimentó la extraña sensación de microgravedad.",
            "Desde su ventana, observó la inmensidad de nuestro brillante planeta azul y mares hermosos.",
            "Esa pequeña esfera flotando en el vacío oscuro del cosmos lo dejó totalmente maravillado."
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "yuri_3",
          "title": "Regreso Triunfal",
          "text": format15x15([
            "Durante el veloz descenso a la Tierra, Gagarin enfrentó un desafío extremadamente peligroso.",
            "Tuvo que saltar en paracaídas desde su cápsula a unos 7,000 metros de altura.",
            "Esto ocurrió porque la Vostok 1 no estaba diseñada para lograr un aterrizaje suave.",
            "Al tocar tierra firme a salvo, se convirtió inmediatamente en un héroe muy famoso.",
            "Hoy es un ícono eterno y legendario de la exploración espacial de la humanidad."
          ]),
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
          "text": format15x15([
            "Pocas semanas después del histórico vuelo de Gagarin, Estados Unidos lanzó su propia misión.",
            "El 5 de mayo de 1961, el valiente piloto Alan Shepard hizo gran historia.",
            "Despegó hacia el cielo a bordo de la poderosa cápsula llamada Freedom 7.",
            "Se convirtió así en el primer astronauta estadounidense en viajar al espacio exterior.",
            "Fue un hito gigantesco para la entonces joven e incipiente agencia espacial llamada NASA."
          ]),
          "video": "https://drive.google.com/file/d/1xn4r3Pmm4S3Wx0SewsmNLhEKtGF618-G/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "alan_2",
          "title": "Vuelo Suborbital",
          "text": format15x15([
            "A diferencia del rápido vuelo de Gagarin, la misión de Shepard fue un vuelo suborbital.",
            "Esto significa que su cohete Redstone lo llevó al espacio como una enorme bala.",
            "Alcanzó una altitud máxima de 187 kilómetros sobre la superficie de nuestro querido planeta.",
            "Sin embargo, no tuvo la velocidad suficiente para dar una vuelta entera al mundo.",
            "Fue como dar un salto gigantesco hacia el vacío antes de volver a caer."
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "alan_3",
          "title": "Control Manual",
          "text": format15x15([
            "Durante este arriesgado vuelo, Shepard logró hacer algo que nadie más había hecho antes.",
            "Fue el primer piloto en controlar manualmente la orientación de su nave espacial volando.",
            "Demostró que los humanos podían trabajar activamente y controlar máquinas en el espacio profundo.",
            "Años más tarde, tras superar una grave enfermedad, Alan regresó triunfante a volar cohetes.",
            "Como comandante del Apolo 14, se convirtió en el quinto hombre en pisar la Luna."
          ]),
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
          "text": format15x15([
            "El 20 de febrero de 1962, el valiente John Herschel Glenn hizo una enorme proeza.",
            "Se convirtió en el primer astronauta estadounidense en orbitar completamente nuestro amado planeta azul.",
            "A bordo de la veloz cápsula Friendship 7, Glenn completó tres órbitas muy rápidas.",
            "Su viaje en el espacio duró cerca de cinco horas llenas de mucha emoción.",
            "Esta misión igualó por fin la hazaña espacial lograda antes por la Unión Soviética."
          ]),
          "video": "https://drive.google.com/file/d/1S0EZbeS_bZj0WCWh7hOJpc7ayhKIRgeX/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "john_2",
          "title": "Luciérnagas en el Espacio",
          "text": format15x15([
            "Durante su impresionante vuelo espacial, Glenn presenció un misterio verdaderamente hermoso y fascinante.",
            "Vio cientos de diminutas partículas luminosas flotando libremente alrededor de su cápsula en movimiento.",
            "Él las bautizó cariñosamente con el nombre de adorables 'luciérnagas espaciales' muy brillantes.",
            "Más tarde, los científicos descubrieron que eran solo pequeños cristales de hielo muy frío.",
            "Se desprendían de la propia nave y brillaban intensamente al reflejar la luz solar."
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "john_3",
          "title": "El Astronauta Más Veterano",
          "text": format15x15([
            "Tras su muy exitoso vuelo orbital, Glenn se retiró y se convirtió en senador.",
            "Pero su amor por la exploración y las estrellas nunca desapareció de su corazón.",
            "Sorprendentemente, en el año 1998, regresó a viajar al espacio a sus 77 años.",
            "Voló valientemente a bordo del gran transbordador espacial llamado Discovery para realizar importantes experimentos.",
            "¡Se convirtió así en la persona de mayor edad en viajar al espacio profundo!"
          ]),
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
          "text": format15x15([
            "El histórico 16 de junio de 1963, el inmenso cielo dejó de ser exclusivo.",
            "La gran cosmonauta soviética Valentina Tereshkova despegó usando el bonito nombre clave de 'Gaviota'.",
            "Viajó a las estrellas a bordo de la poderosa y rápida cápsula Vostok 6.",
            "¡Valentina se convirtió oficialmente en la primera mujer de la historia en viajar al espacio!",
            "Demostró al mundo entero que las mujeres podían ser extraordinarias exploradoras del universo infinito."
          ]),
          "video": "https://drive.google.com/file/d/1EiMYfUIZh_H_QLtiFtZBrb25UCjx6_n1/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "valentina_2",
          "title": "Un Vuelo de Resistencia",
          "text": format15x15([
            "Su gran misión solitaria en el espacio fue verdaderamente difícil y asombrosa al extremo.",
            "Valentina pasó casi tres días completos volando a gran velocidad en la órbita terrestre.",
            "Dio nada menos que 48 impresionantes vueltas enteras alrededor de nuestro brillante planeta azul.",
            "En ese único vuelo, acumuló mucho más tiempo total en el espacio sin gravedad.",
            "Superó a todos los astronautas estadounidenses anteriores sumados, marcando un tremendo récord de resistencia."
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "valentina_3",
          "title": "De Paracaidista a Leyenda",
          "text": format15x15([
            "Antes de convertirse valientemente en cosmonauta, Valentina era una trabajadora experta haciendo saltos en paracaídas.",
            "También pasaba sus días trabajando fuertemente en una enorme fábrica que producía productos textiles.",
            "Su habilidad en el paracaidismo fue sumamente vital para sobrevivir a la peligrosa misión.",
            "Tuvo que saltar de la cápsula a miles de metros al regresar a casa.",
            "¡Su increíble valentía inspiró a millones de jóvenes mujeres soñadoras alrededor de todo el mundo!"
          ]),
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
          "text": format15x15([
            "El gran día del 18 de marzo de 1965 marcó otro momento totalmente revolucionario.",
            "La increíble misión soviética Voskhod 2 estaba lista para intentar lo que parecía imposible.",
            "El cosmonauta Aleksei Leonov salió físicamente por la pequeña escotilla de su nave espacial.",
            "Se convirtió en el primer ser humano en flotar libremente afuera en el oscuro vacío.",
            "¡Realizó exitosamente la primera Actividad Extravehicular, comúnmente llamada caminata espacial, en la historia humana!"
          ]),
          "video": "https://drive.google.com/file/d/17nQIOVaooblD0jR5rjr25HWL-5EXAg-W/preview",
          "image": "",
          "imgCaption": "",
          "style": "highlight"
        },
        {
          "id": "leonov_2",
          "title": "Peligro en el Vacío",
          "text": format15x15([
            "Durante su extraordinario paseo espacial de tan solo 12 minutos, ocurrió un gran problema.",
            "Su grueso traje espacial se infló demasiado por la enorme falta de presión exterior.",
            "Estaba tan duro y rígido que el pobre Aleksei ya no podía moverse libremente.",
            "No cabía por la puerta para poder regresar adentro de su segura nave protectora.",
            "Tuvo que abrir una válvula para desinflar manualmente su traje y sobrevivir al gran peligro."
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "leonov_3",
          "title": "Aterrizaje en el Bosque",
          "text": format15x15([
            "El final de esta histórica misión soviética terminó de una forma sumamente tensa y dramática.",
            "La nave espacial experimentó problemas y se desvió enormemente de su curso de aterrizaje seguro.",
            "Terminó cayendo en medio de un profundo bosque congelado en la vasta región de Siberia.",
            "Leonov tuvo que sobrevivir rodeado de frío extremo, peligrosos lobos y osos salvajes gigantes.",
            "Fue rescatado al día siguiente, demostrando ser un verdadero aventurero de enorme valentía mundial."
          ]),
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
          "text": format15x15([
            "Diecinueve largos años después del gran vuelo espacial realizado por la legendaria Valentina Tereshkova.",
            "La destacada y hábil piloto rusa Svetlana Savitskaya viajó valientemente rumbo al frío espacio.",
            "Esto ocurrió en el caluroso mes de agosto de 1982 a bordo de una nave.",
            "Así se convirtió oficialmente en la segunda mujer de la historia en alcanzar las estrellas.",
            "Vivió días inolvidables trabajando duro a bordo de la estación espacial soviética Salyut 7."
          ]),
          "image": "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "Las estaciones espaciales soviéticas abrieron las puertas a estancias prolongadas en microgravedad.",
          "style": "highlight"
        },
        {
          "id": "svetlana_2",
          "title": "La Primera Caminata Femenina",
          "text": format15x15([
            "Pero sin duda alguna, su hazaña más gloriosa ocurrió en su emocionante segundo viaje.",
            "Durante ese magnífico día, el 25 de julio de 1984, Svetlana hizo algo impensable.",
            "Salió al gélido y oscuro vacío del espacio exterior utilizando un grueso traje espacial.",
            "Se convirtió brillantemente en la primera mujer de la historia en realizar un paseo espacial.",
            "¡Su impecable técnica abrió el enorme universo para todas las mujeres exploradoras del futuro!"
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "svetlana_3",
          "title": "Soldadura en el Espacio",
          "text": format15x15([
            "Svetlana no se dedicó solamente a flotar y admirar las bellezas del universo exterior.",
            "Durante las largas 3 horas y 35 minutos que duró su asombrosa caminata espacial afuera.",
            "Ella utilizó con enorme maestría una complicada y pesada herramienta especial de corte electrónico.",
            "Logró cortar y soldar gruesas placas de duro metal flotando totalmente sin ninguna gravedad.",
            "Demostró así que era una de las mejores ingenieras que había viajado al cosmos inmenso."
          ]),
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
          "text": format15x15([
            "El brillante y caluroso día del 18 de junio del memorable año de 1983.",
            "La joven científica llamada Sally Kristen Ride despegó a bordo del famoso transbordador espacial Challenger.",
            "Se convirtió con mucho orgullo en la primera astronauta mujer estadounidense en cruzar nuestra atmósfera.",
            "Y no solo eso, fue la mujer más joven de todo su país en lograrlo.",
            "Su increíble valentía inspiró a millones de niñas en el mundo a soñar con cohetes."
          ]),
          "image": "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200&auto=format&fit=crop",
          "imgCaption": "El Transbordador Espacial fue la nave más compleja jamás construida, diseñada para ser reutilizable.",
          "style": "highlight"
        },
        {
          "id": "sally_2",
          "title": "Operando el Brazo Robótico",
          "text": format15x15([
            "Ya flotando en el espacio sin gravedad, Sally trabajó duramente como gran especialista de misión.",
            "Ella era una grandiosa y excelente operadora del inmenso brazo robótico del gran transbordador espacial.",
            "Usó esta enorme grúa metálica para atrapar y liberar gigantescos satélites brillantes de vitales comunicaciones.",
            "También aprovechó sus largos días orbitando para realizar interesantes experimentos científicos de física y astrofísica.",
            "Su perfecto trabajo ayudó a mejorar todos los futuros viajes espaciales de la NASA."
          ]),
          "image": "",
          "imgCaption": ""
        },
        {
          "id": "sally_3",
          "title": "Una Educadora Brillante",
          "text": format15x15([
            "Después de terminar su exitosa carrera volando como una audaz astronauta exploradora del cosmos oscuro.",
            "La brillante Sally Ride decidió dedicar el resto de su maravillosa vida a la educación.",
            "Escribió emocionantes libros y creó programas especiales para miles de niños en todas las escuelas.",
            "Quería profundamente que los jóvenes amaran la ciencia, las matemáticas y la increíble tecnología moderna.",
            "Su enorme y bondadoso legado educativo sigue viviendo muy fuertemente hasta nuestros días actuales maravillosos."
          ]),
          "image": "",
          "imgCaption": ""
        }
      ]
    }
  }
];

jsData = jsData.filter(m => !m.id.startsWith('pioneros_'));
jsData.push(...pionerosModules);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('Pioneros reformatted 15x15 injected successfully');
