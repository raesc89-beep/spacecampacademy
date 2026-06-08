// Curso: Nikola Tesla — El Genio de la Electricidad
// 10 módulos con contenido educativo en español y 5 preguntas de quiz cada uno
export const TESLA_COURSE_DATA = [
  {
    "id": "tesla_m1",
    "order": 8201,
    "titleEn": "Born in a Storm",
    "titleEs": "Nacido en una Tormenta",
    "badge": "Lightning Born",
    "badgeEs": "Nacido del Rayo",
    "badgeIcon": "/assets/tesla/tesla_m1.png",
    "color": "#1565C0",
    "icon": "/assets/tesla/tesla_m1.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m1_s1",
          "title": "Nacido en una Tormenta: Los Primeros Años de Nikola Tesla",
          "text": [
            "¡Explorador, prepárate para conocer al genio más incomprendido de la historia de la ciencia! Nikola Tesla nació exactamente a la medianoche entre el 9 y el 10 de julio de 1856, en medio de una feroz tormenta eléctrica, en el pequeño pueblo de Smiljan, en lo que hoy es Croacia. La partera, asustada por los rayos, dijo que el bebé sería un hijo de la oscuridad. Su madre respondió: 'No, será un hijo de la luz'. Esta frase resultó ser profética: Tesla dedicaría su vida a iluminar el mundo con electricidad.",
            "Tesla fue un niño prodigio con una mente extraordinaria. Podía realizar cálculos matemáticos complejos de memoria, visualizar máquinas completas con todo detalle en su imaginación antes de construirlas, y hablaba ocho idiomas con fluidez: serbocroata, checo, alemán, francés, húngaro, italiano, inglés y latín. Tenía una memoria eidética tan precisa que podía recitar libros enteros de memoria después de leerlos una sola vez. Sin embargo, también sufría de visiones involuntarias y sensibilidad extrema a la luz y el sonido.",
            "Su padre, Milutin Tesla, era un sacerdote ortodoxo serbio que quería que Nikola siguiera sus pasos en el sacerdocio. Pero un evento cambió todo: a los 17 años, Tesla contrajo cólera y estuvo al borde de la muerte durante nueve meses. Su padre, desesperado, le prometió que si sobrevivía lo enviaría a la mejor escuela de ingeniería. Tesla se recuperó milagrosamente y fue enviado a la Escuela Politécnica de Graz, Austria, donde sus profesores quedaron asombrados por su capacidad intelectual.",
            "En Graz, Tesla vio por primera vez un generador de corriente continua de Gramme y tuvo una revelación: el sistema era ineficiente porque las escobillas que transferían la corriente producían chispas constantes. Le dijo a su profesor que debía existir una forma mejor. El profesor lo ridiculizó frente a toda la clase, diciendo que lo que Tesla proponía era un 'movimiento perpetuo', algo imposible. Tesla pasó los siguientes años obsesionado con resolver este problema. La respuesta le llegó en 1882, mientras caminaba por un parque en Budapest: de pronto, la solución del motor de corriente alterna apareció completa en su mente, como una visión."
          ],
          "image": "/assets/tesla/tesla_m1.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Dónde nació Nikola Tesla?",
        "options": [
          "En Nueva York",
          "En Smiljan, actual Croacia",
          "En Berlín, Alemania",
          "En Moscú, Rusia"
        ],
        "a": 1
      },
      {
        "q": "¿Cuántos idiomas hablaba Tesla?",
        "options": [
          "2",
          "5",
          "8",
          "12"
        ],
        "a": 2
      },
      {
        "q": "¿Qué enfermedad casi lo mata de joven?",
        "options": [
          "Gripe",
          "Cólera",
          "Malaria",
          "Neumonía"
        ],
        "a": 1
      },
      {
        "q": "¿Qué fenómeno meteorológico ocurrió cuando nació?",
        "options": [
          "Un terremoto",
          "Una tormenta eléctrica",
          "Un eclipse solar",
          "Una nevada"
        ],
        "a": 1
      },
      {
        "q": "¿Dónde se le ocurrió la idea del motor de corriente alterna?",
        "options": [
          "En un laboratorio",
          "Caminando por un parque en Budapest",
          "En un sueño",
          "En la escuela"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m2",
    "order": 8202,
    "titleEn": "AC vs DC",
    "titleEs": "Corriente Alterna vs Corriente Continua",
    "badge": "Current Master",
    "badgeEs": "Maestro de la Corriente",
    "badgeIcon": "/assets/tesla/tesla_m2.png",
    "color": "#F57F17",
    "icon": "/assets/tesla/tesla_m2.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m2_s1",
          "title": "La Guerra de las Corrientes: Tesla vs Edison",
          "text": [
            "¡Explorador, estás a punto de presenciar una de las batallas tecnológicas más épicas de la historia! En la década de 1880, dos genios se enfrentaron por definir cómo la humanidad usaría la electricidad: Thomas Edison, el empresario americano que apostó por la corriente continua (DC), y Nikola Tesla, el visionario serbio que defendía la corriente alterna (AC). Tesla llegó a Estados Unidos en 1884 con apenas 4 centavos en el bolsillo, una carta de recomendación, y la promesa de la corriente alterna en su mente.",
            "Edison le ofreció trabajo y Tesla mejoró significativamente los generadores de corriente continua de Edison. Cuando Tesla pidió los 50,000 dólares que Edison supuestamente le había prometido como recompensa, Edison se rió y dijo: 'Tesla, usted no entiende el humor americano'. Tesla renunció inmediatamente. Después de un período oscuro cavando zanjas para sobrevivir, Tesla encontró inversores que financiaron su propio laboratorio, donde perfeccionó el motor de inducción de corriente alterna y el sistema polifásico que había soñado.",
            "¿Cuál es la diferencia entre AC y DC? La corriente continua (DC) fluye siempre en una dirección, como el agua de una manguera. La corriente alterna (AC) cambia de dirección muchas veces por segundo (60 veces en América, 50 en Europa). La ventaja crucial del AC es que puede transformarse fácilmente: usando un transformador, puedes subir el voltaje para transmitir electricidad a grandes distancias con mínima pérdida de energía, y luego bajarlo para uso doméstico. El DC de Edison perdía tanta energía que necesitaba una planta generadora cada kilómetro y medio.",
            "George Westinghouse, un empresario visionario, compró las patentes de Tesla por 60,000 dólares más regalías de 2.50 dólares por cada caballo de fuerza de electricidad AC vendido. Juntos, Tesla y Westinghouse ganaron la 'Guerra de las Corrientes'. La victoria definitiva llegó en 1893 cuando iluminaron la Exposición Universal de Chicago con corriente alterna, y en 1896 cuando la central hidroeléctrica de las Cataratas del Niágara, diseñada con tecnología de Tesla, comenzó a enviar electricidad AC a Buffalo, a 32 kilómetros de distancia. El sistema AC de Tesla es el mismo que alimenta tu casa hoy."
          ],
          "image": "/assets/tesla/tesla_m2.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Quién defendía la corriente continua (DC)?",
        "options": [
          "Tesla",
          "Westinghouse",
          "Edison",
          "Faraday"
        ],
        "a": 2
      },
      {
        "q": "¿Cuál es la ventaja principal de la corriente alterna?",
        "options": [
          "Es más barata de producir",
          "Se puede transformar para transmitir a grandes distancias",
          "Es más segura",
          "Produce más luz"
        ],
        "a": 1
      },
      {
        "q": "¿Quién compró las patentes de Tesla?",
        "options": [
          "Thomas Edison",
          "George Westinghouse",
          "Benjamin Franklin",
          "Alexander Graham Bell"
        ],
        "a": 1
      },
      {
        "q": "¿Dónde se demostró la victoria de la corriente alterna en 1893?",
        "options": [
          "En las Cataratas del Niágara",
          "En la Exposición Universal de Chicago",
          "En la Torre Eiffel",
          "En el Congreso de EE.UU."
        ],
        "a": 1
      },
      {
        "q": "¿Con cuánto dinero llegó Tesla a Estados Unidos?",
        "options": [
          "Con 1,000 dólares",
          "Con 4 centavos",
          "Con 50,000 dólares",
          "Sin ningún dinero"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m3",
    "order": 8203,
    "titleEn": "The Tesla Coil",
    "titleEs": "La Bobina de Tesla",
    "badge": "Coil Builder",
    "badgeEs": "Constructor de Bobinas",
    "badgeIcon": "/assets/tesla/tesla_m3.png",
    "color": "#7B1FA2",
    "icon": "/assets/tesla/tesla_m3.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m3_s1",
          "title": "La Bobina de Tesla: Rayos Artificiales y Electricidad Inalámbrica",
          "text": [
            "¡Explorador, prepárate para ver rayos artificiales! En 1891, Tesla inventó una de sus creaciones más espectaculares: la bobina de Tesla. Es un transformador de resonancia que puede generar voltajes extremadamente altos, de cientos de miles a millones de voltios, a frecuencias muy altas. Las bobinas de Tesla producen descargas eléctricas visibles que parecen rayos en miniatura, y fueron el primer dispositivo capaz de crear corrientes de alta frecuencia de forma controlada.",
            "¿Cómo funciona la bobina de Tesla? El principio es la resonancia electromagnética. Tiene dos circuitos: uno primario con pocas vueltas de alambre grueso y un capacitor, y uno secundario con cientos o miles de vueltas de alambre fino. Cuando el capacitor se descarga a través del circuito primario, crea un campo magnético oscilante que induce un voltaje cada vez mayor en el secundario, como un columpio que va cada vez más alto con cada empujón. Cuando ambos circuitos oscilan a la misma frecuencia (resuenan), la energía se transfiere con máxima eficiencia.",
            "Tesla no creó la bobina solo como un espectáculo de luces. Estaba investigando la transmisión inalámbrica de energía. En 1899, construyó un laboratorio en Colorado Springs con una bobina de Tesla gigante capaz de producir rayos de hasta 41 metros de largo, los rayos artificiales más largos jamás creados. La bobina generaba voltajes de 12 millones de voltios. Durante sus experimentos, Tesla afirmó haber encendido 200 lámparas a 40 kilómetros de distancia sin cables, aunque esta afirmación nunca fue verificada de forma independiente.",
            "Las bobinas de Tesla tienen aplicaciones prácticas reales más allá del espectáculo. Tesla las usó para desarrollar la tecnología de radio (patente concedida en 1900), iluminación fluorescente (décadas antes de su comercialización), y rayos X. Las bobinas de Tesla modernas se usan en medicina para esterilización con ozono, en investigación de física de plasma, y en el encendido de motores de cohetes. Cada vez que usas WiFi, Bluetooth o cualquier tecnología de comunicación inalámbrica, estás usando principios que Tesla exploró con sus bobinas."
          ],
          "image": "/assets/tesla/tesla_m3.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuándo inventó Tesla la bobina de Tesla?",
        "options": [
          "En 1856",
          "En 1891",
          "En 1920",
          "En 1950"
        ],
        "a": 1
      },
      {
        "q": "¿Cuántos metros de largo alcanzaron los rayos de Colorado Springs?",
        "options": [
          "1 metro",
          "10 metros",
          "41 metros",
          "100 metros"
        ],
        "a": 2
      },
      {
        "q": "¿Qué principio físico usa la bobina de Tesla?",
        "options": [
          "Gravedad",
          "Resonancia electromagnética",
          "Fisión nuclear",
          "Presión atmosférica"
        ],
        "a": 1
      },
      {
        "q": "¿Para qué investigaba Tesla con las bobinas?",
        "options": [
          "Para hacer fuegos artificiales",
          "Para la transmisión inalámbrica de energía",
          "Para cocinar",
          "Para iluminar su casa"
        ],
        "a": 1
      },
      {
        "q": "¿Qué voltaje generaba la bobina gigante de Colorado Springs?",
        "options": [
          "100 voltios",
          "10,000 voltios",
          "12 millones de voltios",
          "1 voltio"
        ],
        "a": 2
      }
    ]
  },
  {
    "id": "tesla_m4",
    "order": 8204,
    "titleEn": "Wireless Dreams",
    "titleEs": "El Sueño de la Energía Inalámbrica",
    "badge": "Wireless Pioneer",
    "badgeEs": "Pionero Inalámbrico",
    "badgeIcon": "/assets/tesla/tesla_m4.png",
    "color": "#00695C",
    "icon": "/assets/tesla/tesla_m4.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m4_s1",
          "title": "Wardenclyffe: El Sueño de Tesla de Conectar el Mundo",
          "text": [
            "¡Explorador, imagina un mundo sin cables de electricidad! Ese era el sueño más ambicioso de Nikola Tesla. Después de sus exitosos experimentos en Colorado Springs, Tesla convenció al banquero J.P. Morgan de financiar un proyecto monumental: la Torre Wardenclyffe, una estructura de 57 metros de altura coronada con una cúpula metálica de 20 metros de diámetro, construida en Shoreham, Long Island, Nueva York, a partir de 1901.",
            "El plan original que Tesla presentó a Morgan era un sistema de comunicaciones transatlánticas que competiría con la radio de Marconi. Pero el verdadero objetivo de Tesla era mucho más ambicioso: crear una red mundial de transmisión inalámbrica de energía. Tesla creía que la Tierra misma podía usarse como conductor: si inyectaba corriente eléctrica a la frecuencia resonante del planeta, la energía podría extraerse en cualquier punto del globo usando antenas receptoras. Quería transmitir electricidad, mensajes, imágenes y hasta la hora exacta a todo el planeta simultáneamente.",
            "El proyecto fracasó por razones financieras, no técnicas. Cuando Morgan descubrió que Tesla quería transmitir energía gratis en lugar de vender comunicaciones, retiró su financiamiento. Si todos pudieran obtener energía del aire, ¿cómo poner un medidor? La torre nunca se completó operativamente y fue demolida en 1917 para pagar deudas. Sin embargo, muchos de los conceptos de Tesla se han hecho realidad un siglo después: la carga inalámbrica de teléfonos, la transmisión WiFi de datos, y los experimentos de la NASA con transmisión de energía solar desde el espacio.",
            "El legado de Wardenclyffe es profundo. Tesla no solo imaginó internet y la comunicación global inalámbrica más de 90 años antes de que existieran, sino que patentó tecnologías fundamentales para hacerlo realidad. Sus patentes de radio (reconocidas por la Corte Suprema de EE.UU. en 1943, meses después de su muerte, invalidando las de Marconi) son la base de toda la comunicación inalámbrica moderna. El sitio de Wardenclyffe fue comprado en 2013 por una organización sin fines de lucro para convertirlo en un museo y centro de ciencias dedicado a Tesla."
          ],
          "image": "/assets/tesla/tesla_m4.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuánto medía la Torre Wardenclyffe?",
        "options": [
          "10 metros",
          "57 metros",
          "100 metros",
          "200 metros"
        ],
        "a": 1
      },
      {
        "q": "¿Quién financió inicialmente la Torre Wardenclyffe?",
        "options": [
          "Thomas Edison",
          "J.P. Morgan",
          "George Westinghouse",
          "El gobierno de EE.UU."
        ],
        "a": 1
      },
      {
        "q": "¿Por qué fracasó el proyecto?",
        "options": [
          "Porque no funcionaba la tecnología",
          "Porque Morgan retiró el financiamiento",
          "Porque un rayo destruyó la torre",
          "Porque Tesla se enfermó"
        ],
        "a": 1
      },
      {
        "q": "¿Cuándo reconoció la Corte Suprema las patentes de radio de Tesla?",
        "options": [
          "En 1891",
          "En 1917",
          "En 1943",
          "En 2013"
        ],
        "a": 2
      },
      {
        "q": "¿Qué quería hacer Tesla con la Tierra?",
        "options": [
          "Convertirla en un imán",
          "Usarla como conductor para transmitir energía",
          "Hacerla girar más rápido",
          "Enfriarla con electricidad"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m5",
    "order": 8205,
    "titleEn": "Radio and Remote Control",
    "titleEs": "Radio y Control Remoto",
    "badge": "Radio Inventor",
    "badgeEs": "Inventor de la Radio",
    "badgeIcon": "/assets/tesla/tesla_m5.png",
    "color": "#E65100",
    "icon": "/assets/tesla/tesla_m5.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m5_s1",
          "title": "Radio y Control Remoto: Tesla, el Padre de la Comunicación Inalámbrica",
          "text": [
            "¡Explorador, cada vez que usas un control remoto, le debes un agradecimiento a Nikola Tesla! En 1898, Tesla asombró al público en el Madison Square Garden de Nueva York con una demostración que parecía magia: controlaba un pequeño bote a distancia usando ondas de radio. El público no podía creer lo que veía. Algunos pensaban que era un truco de magia, otros que Tesla usaba telepatía, y un periodista sugirió que un mono entrenado se escondía dentro del bote.",
            "Lo que Tesla demostró ese día fue el primer vehículo controlado por radio de la historia: la patente US613809, que describía un sistema de 'teleautomática' (control remoto). El bote tenía una antena que recibía señales de radio de diferentes frecuencias, y un circuito lógico que interpretaba estas señales para activar motores que controlaban el timón y la hélice. Tesla no solo inventó el control remoto: inventó la robótica. Él vio que esta tecnología podría usarse para operar máquinas a distancia en situaciones peligrosas, como la exploración de minas o la guerra.",
            "La historia de la radio es una de las más controvertidas de la ciencia. Guglielmo Marconi es generalmente reconocido como el inventor de la radio porque logró la primera transmisión transatlántica en 1901. Sin embargo, Marconi usó al menos 17 patentes de Tesla para construir su transmisor. En 1904, la Oficina de Patentes de EE.UU. revirtió inexplicablemente su decisión anterior y otorgó la patente de radio a Marconi (posiblemente influenciada por la presión financiera de los inversores de Marconi). No fue hasta 1943, meses después de la muerte de Tesla, que la Corte Suprema de EE.UU. reconoció las patentes originales de Tesla.",
            "Tesla también imaginó tecnologías que tardarían décadas en materializarse. En 1926, en una entrevista con la revista Collier's, describió con precisión lo que hoy llamamos un teléfono inteligente: 'Cuando lo inalámbrico se aplique perfectamente, toda la Tierra se convertirá en un enorme cerebro. Podremos comunicarnos instantáneamente, sin importar la distancia. No solo eso, sino que a través de la televisión y la telefonía podremos vernos y oírnos tan perfectamente como si estuviéramos cara a cara, a pesar de distancias de miles de kilómetros. Y los instrumentos a través de los cuales podremos hacer esto serán asombrosamente simples comparados con nuestro teléfono actual. Un hombre podrá llevar uno en su bolsillo del chaleco'."
          ],
          "image": "/assets/tesla/tesla_m5.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Dónde demostró Tesla el primer control remoto?",
        "options": [
          "En Londres",
          "En el Madison Square Garden de Nueva York",
          "En París",
          "En Colorado Springs"
        ],
        "a": 1
      },
      {
        "q": "¿Qué controlaba Tesla con ondas de radio?",
        "options": [
          "Un avión",
          "Un bote",
          "Un tren",
          "Un automóvil"
        ],
        "a": 1
      },
      {
        "q": "¿En qué año describió Tesla algo similar a un smartphone?",
        "options": [
          "En 1898",
          "En 1926",
          "En 1943",
          "En 1960"
        ],
        "a": 1
      },
      {
        "q": "¿Cuántas patentes de Tesla usó Marconi para su transmisor?",
        "options": [
          "Ninguna",
          "3",
          "Al menos 17",
          "100"
        ],
        "a": 2
      },
      {
        "q": "¿Qué nombre le dio Tesla a su tecnología de control remoto?",
        "options": [
          "Electromagnética",
          "Teleautomática",
          "Cibernética",
          "Robótica"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m6",
    "order": 8206,
    "titleEn": "X-Rays and Medicine",
    "titleEs": "Rayos X y Medicina",
    "badge": "X-Ray Pioneer",
    "badgeEs": "Pionero de los Rayos X",
    "badgeIcon": "/assets/tesla/tesla_m6.png",
    "color": "#2E7D32",
    "icon": "/assets/tesla/tesla_m6.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m6_s1",
          "title": "Rayos X y Contribuciones Médicas: Tesla y la Medicina Invisible",
          "text": [
            "¡Explorador, Tesla casi se convierte en el descubridor de los rayos X! En 1894, un año antes de que Wilhelm Röntgen anunciara oficialmente el descubrimiento de los rayos X, Tesla ya estaba experimentando con lo que él llamaba 'radiaciones de sombra'. Usando sus bobinas de alta frecuencia, Tesla produjo imágenes de rayos X de objetos metálicos dentro de cajas selladas. Incluso envió algunas de estas imágenes a Röntgen, quien las elogió. Tesla no publicó formalmente sus resultados porque un incendio destruyó su laboratorio en marzo de 1895, llevándose años de notas e investigación.",
            "Después de que Röntgen publicara su descubrimiento en diciembre de 1895, Tesla se lanzó a investigar los rayos X con intensidad. Produjo algunas de las primeras imágenes de rayos X de alta calidad en Estados Unidos, incluyendo una imagen del pie dentro de un zapato con detalles asombrosos. Tesla descubrió rápidamente que los rayos X podían ser peligrosos: documentó quemaduras en la piel, irritación ocular y pérdida de cabello después de exposiciones prolongadas. Fue uno de los primeros científicos en advertir sobre los peligros de la radiación.",
            "Tesla también desarrolló terapias médicas usando corrientes de alta frecuencia. La 'corriente de Tesla' o electroterapia de alta frecuencia fue una de las primeras formas de diatermia: el uso de corrientes eléctricas para calentar tejidos profundos del cuerpo con fines terapéuticos. Tesla demostró que corrientes de alta frecuencia podían pasar a través del cuerpo humano sin causar dolor ni daño, un descubrimiento que contradecía la creencia general de que toda electricidad era peligrosa.",
            "Otra contribución médica de Tesla fue su trabajo en generación de ozono para esterilización. Usando sus bobinas de alta frecuencia, Tesla creó generadores de ozono que se utilizaron en hospitales para desinfectar instrumentos quirúrgicos y purificar agua. También experimentó con campos electromagnéticos pulsados que hoy se usan en fisioterapia y en la estimulación magnética transcraneal para tratar la depresión. Muchas de las tecnologías médicas que damos por sentadas tienen sus raíces en los experimentos de Tesla de hace más de 125 años."
          ],
          "image": "/assets/tesla/tesla_m6.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué nombre les daba Tesla a los rayos X?",
        "options": [
          "Rayos de luz",
          "Radiaciones de sombra",
          "Ondas invisibles",
          "Corrientes fantasma"
        ],
        "a": 1
      },
      {
        "q": "¿Qué destruyó las notas de Tesla sobre rayos X?",
        "options": [
          "Una inundación",
          "Un incendio en su laboratorio",
          "Un robo",
          "Un terremoto"
        ],
        "a": 1
      },
      {
        "q": "¿Qué es la diatermia?",
        "options": [
          "Una enfermedad",
          "Uso de corrientes eléctricas para calentar tejidos del cuerpo",
          "Un tipo de imán",
          "Una forma de cocinar"
        ],
        "a": 1
      },
      {
        "q": "¿Qué peligro de los rayos X documentó Tesla?",
        "options": [
          "Que eran demasiado brillantes",
          "Quemaduras en la piel e irritación ocular",
          "Que hacían ruido",
          "Que atraían rayos"
        ],
        "a": 1
      },
      {
        "q": "¿Para qué usó Tesla el ozono?",
        "options": [
          "Para perfumar habitaciones",
          "Para esterilización y desinfección",
          "Para alimentar motores",
          "Para hacer burbujas"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m7",
    "order": 8207,
    "titleEn": "Niagara Falls Power",
    "titleEs": "La Central de las Cataratas del Niágara",
    "badge": "Hydroelectric Master",
    "badgeEs": "Maestro Hidroeléctrico",
    "badgeIcon": "/assets/tesla/tesla_m7.png",
    "color": "#0277BD",
    "icon": "/assets/tesla/tesla_m7.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m7_s1",
          "title": "Cataratas del Niágara: El Triunfo de la Corriente Alterna",
          "text": [
            "¡Explorador, imagina convertir una de las cascadas más poderosas del mundo en electricidad! Desde niño en Croacia, Tesla vio una imagen de las Cataratas del Niágara y soñó con aprovechar su inmenso poder. Ese sueño se hizo realidad en 1896, cuando la Central Hidroeléctrica de las Cataratas del Niágara, diseñada con tecnología de corriente alterna de Tesla y construida por Westinghouse, comenzó a operar. Fue la primera gran central hidroeléctrica de corriente alterna del mundo y marcó el fin de la Guerra de las Corrientes.",
            "Las cataratas del Niágara tienen un caudal promedio de 2,800 metros cúbicos de agua por segundo y una caída de 51 metros. La central original usaba 10 generadores de 5,000 caballos de fuerza (3,700 kW) cada uno, diseñados según las patentes de Tesla. El agua se desviaba por un canal hasta turbinas subterráneas que giraban los generadores. La electricidad producida se transformaba a alto voltaje (11,000 voltios) y se transmitía por cables hasta Buffalo, a 32 kilómetros de distancia, algo que era imposible con la corriente continua de Edison.",
            "Este proyecto demostró al mundo que la corriente alterna era el futuro. Antes de Niágara, las ciudades generaban su propia electricidad localmente con pequeñas plantas de carbón. Después de Niágara, quedó claro que grandes centrales podían generar electricidad barata y transmitirla a ciudades lejanas. Esto transformó la industria, permitiendo que fábricas se establecieran lejos de las fuentes de energía. La electrificación masiva de Estados Unidos, y luego del mundo, fue posible gracias a los principios de Tesla.",
            "Hoy existe una estatua de Tesla en las Cataratas del Niágara, inaugurada en 2006 para conmemorar su contribución. La central original fue cerrada en 1961, pero fue reemplazada por plantas más modernas que siguen usando el mismo principio de corriente alterna. Las Cataratas del Niágara generan actualmente unos 4.4 gigavatios de electricidad, suficiente para alimentar a 3.8 millones de hogares. Cada vatio de esa energía fluye gracias al sistema que Tesla imaginó cuando era un niño mirando una fotografía en un pequeño pueblo de Croacia."
          ],
          "image": "/assets/tesla/tesla_m7.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año comenzó a operar la central de Niágara?",
        "options": [
          "En 1856",
          "En 1891",
          "En 1896",
          "En 1920"
        ],
        "a": 2
      },
      {
        "q": "¿A cuántos kilómetros se transmitió la electricidad hasta Buffalo?",
        "options": [
          "1 kilómetro",
          "5 kilómetros",
          "32 kilómetros",
          "100 kilómetros"
        ],
        "a": 2
      },
      {
        "q": "¿Cuántos generadores tenía la central original?",
        "options": [
          "1",
          "5",
          "10",
          "50"
        ],
        "a": 2
      },
      {
        "q": "¿A qué voltaje se transformaba la electricidad para transmitirla?",
        "options": [
          "110 voltios",
          "1,000 voltios",
          "11,000 voltios",
          "1 millón de voltios"
        ],
        "a": 2
      },
      {
        "q": "¿Cuántos gigavatios generan las Cataratas del Niágara actualmente?",
        "options": [
          "0.5 gigavatios",
          "4.4 gigavatios",
          "10 gigavatios",
          "100 gigavatios"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m8",
    "order": 8208,
    "titleEn": "Tesla's Inventions",
    "titleEs": "Las Invenciones Olvidadas de Tesla",
    "badge": "Invention Hunter",
    "badgeEs": "Cazador de Inventos",
    "badgeIcon": "/assets/tesla/tesla_m8.png",
    "color": "#AD1457",
    "icon": "/assets/tesla/tesla_m8.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m8_s1",
          "title": "Las Invenciones Olvidadas: Tecnologías de Tesla que Cambiaron el Mundo en Silencio",
          "text": [
            "¡Explorador, Tesla tenía más de 300 patentes registradas en 26 países, pero muchas de sus invenciones más brillantes pasaron desapercibidas! El motor de inducción, patentado en 1888, es quizás su invención más importante después del sistema AC. Este motor convierte la electricidad en movimiento mecánico sin necesidad de escobillas ni contactos eléctricos, lo que lo hace extremadamente confiable y duradero. Hoy, el 90% de los motores eléctricos del mundo son motores de inducción basados en el diseño de Tesla: los encontrarás en lavadoras, ventiladores, ascensores, trenes y vehículos eléctricos.",
            "Tesla también inventó la iluminación fluorescente décadas antes de su comercialización. En la década de 1890, Tesla creó tubos de gas que brillaban con luz suave y eficiente cuando se les aplicaba corriente de alta frecuencia. Los exhibió en conferencias y demostraciones públicas, pero la industria estaba demasiado invertida en las bombillas incandescentes de Edison como para adoptar una tecnología superior. Las lámparas fluorescentes no se comercializaron masivamente hasta la década de 1930, cuarenta años después de que Tesla las demostrara.",
            "En 1891, Tesla recibió la patente del 'oscilador electromecánico', un generador de vapor compacto que convertía energía térmica en energía eléctrica con alta eficiencia. Tesla afirmó que durante las pruebas, el dispositivo comenzó a vibrar a la frecuencia resonante de su edificio en el 46 de East Houston Street en Manhattan, haciendo temblar los edificios vecinos hasta que la policía llegó pensando que era un terremoto. Tesla rompió la máquina con un martillo para detenerla. Aunque esta historia es probablemente exagerada, el principio de resonancia mecánica es real y se usa en ingeniería moderna.",
            "Otra invención crucial pero olvidada es la turbina sin álabes de Tesla, patentada en 1913. En lugar de álabes como las turbinas convencionales, usaba discos lisos apilados que aprovechaban la viscosidad y la adhesión del fluido para girar. Tesla la llamó 'su invención más importante' y predijo eficiencias del 97%. Aunque no alcanzó ese nivel, la turbina de Tesla tiene ventajas únicas: puede funcionar con cualquier fluido, es extremadamente simple de fabricar, y no tiene partes que se desgasten fácilmente. Se está investigando actualmente para aplicaciones en energía geotérmica y en motores de microturbinas."
          ],
          "image": "/assets/tesla/tesla_m8.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuántas patentes tenía Tesla registradas?",
        "options": [
          "50",
          "100",
          "Más de 300",
          "10"
        ],
        "a": 2
      },
      {
        "q": "¿Qué porcentaje de motores eléctricos modernos usan el diseño de Tesla?",
        "options": [
          "10%",
          "50%",
          "90%",
          "100%"
        ],
        "a": 2
      },
      {
        "q": "¿Cuántos años antes de su comercialización demostró Tesla la iluminación fluorescente?",
        "options": [
          "5 años",
          "10 años",
          "40 años",
          "100 años"
        ],
        "a": 2
      },
      {
        "q": "¿Qué tiene de especial la turbina de Tesla?",
        "options": [
          "Usa álabes gigantes",
          "Usa discos lisos en vez de álabes",
          "Funciona con energía solar",
          "Es del tamaño de un edificio"
        ],
        "a": 1
      },
      {
        "q": "¿Qué pasó cuando el oscilador vibró a la frecuencia resonante del edificio?",
        "options": [
          "Produjo electricidad para todo Manhattan",
          "Los edificios vecinos temblaron como un terremoto",
          "Explotó",
          "No pasó nada"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m9",
    "order": 8209,
    "titleEn": "Tesla's Later Years",
    "titleEs": "Los Últimos Años de Tesla",
    "badge": "Tesla Historian",
    "badgeEs": "Historiador de Tesla",
    "badgeIcon": "/assets/tesla/tesla_m9.png",
    "color": "#546E7A",
    "icon": "/assets/tesla/tesla_m9.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m9_s1",
          "title": "Los Últimos Años: Genio, Soledad y Palomas",
          "text": [
            "¡Explorador, los últimos años de Tesla son una historia agridulce de genio y tragedia! Después del fracaso de Wardenclyffe, Tesla enfrentó dificultades financieras crecientes. A pesar de que sus inventos habían creado industrias multimillonarias, Tesla nunca fue un buen hombre de negocios. En un acto extraordinario de generosidad (o locura financiera), Tesla renunció voluntariamente a sus regalías de las patentes de corriente alterna con Westinghouse cuando la compañía enfrentó problemas económicos. Esas regalías habrían valido millones de dólares y lo habrían convertido en uno de los hombres más ricos del mundo.",
            "En sus últimos años, Tesla vivió solo en habitaciones de hotel en Nueva York, movido periódicamente cuando no podía pagar las facturas. Los hoteles a veces aceptaban sus patentes como forma de pago. Desarrolló una profunda conexión con las palomas de la ciudad, alimentándolas diariamente en Bryant Park y Central Park. Sobre una paloma blanca particular, Tesla dijo: 'Yo amaba a esa paloma como un hombre ama a una mujer, y ella me amaba. Mientras la tuve, hubo un propósito en mi vida'. Esta declaración ha sido interpretada como evidencia de su creciente aislamiento social.",
            "Sin embargo, la mente de Tesla seguía produciendo ideas revolucionarias. En 1934, describió un arma teórica que los medios bautizaron como 'rayo de la muerte': un dispositivo que podría proyectar un haz de partículas subatómicas aceleradas capaz de destruir aviones a 400 kilómetros de distancia. Tesla ofreció la tecnología a varios gobiernos como arma defensiva que haría las guerras imposibles. Aunque el 'rayo de la muerte' fue considerado fantasía en su época, el principio básico es similar al de los aceleradores de partículas modernos y las armas de energía dirigida que se investigan actualmente.",
            "Tesla recibió el reconocimiento de la comunidad científica a lo largo de su vida. En 1917, recibió la Medalla Edison del Instituto Americano de Ingenieros Eléctricos, irónicamente nombrada en honor a su rival. Fue nominado al Premio Nobel de Física, aunque nunca lo ganó. Se rumorea que lo rechazó para no compartirlo con Edison, aunque esta historia no ha sido confirmada. A pesar de sus dificultades, Tesla mantuvo su dignidad hasta el final, siempre vestido impecablemente con traje, sombrero y guantes blancos."
          ],
          "image": "/assets/tesla/tesla_m9.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Por qué Tesla no era rico a pesar de sus inventos?",
        "options": [
          "Porque nunca patentó nada",
          "Porque renunció a sus regalías y no era buen empresario",
          "Porque todo se lo robaron",
          "Porque regaló todo a caridad"
        ],
        "a": 1
      },
      {
        "q": "¿Dónde vivió Tesla en sus últimos años?",
        "options": [
          "En una mansión",
          "En habitaciones de hotel",
          "En su laboratorio",
          "En las Cataratas del Niágara"
        ],
        "a": 1
      },
      {
        "q": "¿Qué animal fue especialmente importante para Tesla?",
        "options": [
          "Un gato",
          "Una paloma blanca",
          "Un perro",
          "Un águila"
        ],
        "a": 1
      },
      {
        "q": "¿Qué medalla recibió Tesla irónicamente nombrada en honor a su rival?",
        "options": [
          "La Medalla Nobel",
          "La Medalla Edison",
          "La Medalla de Oro",
          "La Medalla Westinghouse"
        ],
        "a": 1
      },
      {
        "q": "¿Qué era el 'rayo de la muerte' de Tesla?",
        "options": [
          "Un láser gigante",
          "Un dispositivo teórico de partículas aceleradas",
          "Un arma química",
          "Un rayo de luz visible"
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "tesla_m10",
    "order": 8210,
    "titleEn": "Tesla's Legacy",
    "titleEs": "El Legado Eterno de Tesla",
    "badge": "Tesla Legacy Keeper",
    "badgeEs": "Guardián del Legado de Tesla",
    "badgeIcon": "/assets/tesla/tesla_m10.png",
    "color": "#311B92",
    "icon": "/assets/tesla/tesla_m10.png",
    "contentEs": {
      "sections": [
        {
          "id": "tesla_m10_s1",
          "title": "El Legado Eterno de Nikola Tesla: El Hombre que Inventó el Siglo XXI",
          "text": [
            "¡Explorador, el legado de Nikola Tesla está literalmente en todo lo que te rodea! Tesla murió el 7 de enero de 1943, solo en su habitación del Hotel New Yorker en Manhattan, a los 86 años. Murió en la pobreza, pero su legado es incalculable. La unidad de medida del campo magnético lleva su nombre: el tesla (T), adoptada por la Conferencia General de Pesas y Medidas en 1960. Cuando un médico te hace una resonancia magnética, la fuerza del imán se mide en teslas. El coche eléctrico más famoso del mundo lleva su nombre.",
            "Después de su muerte, el FBI confiscó todos sus documentos y pertenencias personales, supuestamente por preocupaciones de seguridad nacional sobre su investigación en armas de energía dirigida. Los documentos fueron finalmente liberados y enviados al Museo Nikola Tesla en Belgrado, Serbia, en 1952. En 2003, la UNESCO declaró que los archivos de Nikola Tesla en el museo forman parte del Programa 'Memoria del Mundo', reconociendo su importancia para toda la humanidad.",
            "Las tecnologías que Tesla inventó, perfeccionó o anticipó incluyen: la corriente alterna (que alimenta al 90% del mundo), el motor de inducción, la radio, el control remoto, la iluminación fluorescente, los rayos X médicos, el radar, la carga inalámbrica, las comunicaciones inalámbricas, la robótica, los circuitos lógicos, y conceptos de inteligencia artificial y energía libre. Elon Musk nombró su compañía de coches eléctricos Tesla Motors en su honor, reconociendo que sin el motor de inducción de Tesla, los vehículos eléctricos modernos no existirían.",
            "Quizás lo más importante del legado de Tesla es su visión del futuro. En una época en que la electricidad era una curiosidad de laboratorio, Tesla imaginó un mundo completamente electrificado, conectado inalámbricamente, donde la energía limpia sería abundante y accesible para todos. Esa visión todavía guía a ingenieros y científicos un siglo después. Tesla demostró que una sola persona con imaginación, determinación y conocimiento científico puede cambiar literalmente el curso de la civilización humana. Como él mismo dijo: 'El presente es suyo. El futuro, por el cual yo realmente he trabajado, es mío'."
          ],
          "image": "/assets/tesla/tesla_m10.png",
          "style": "highlight"
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuándo murió Nikola Tesla?",
        "options": [
          "En 1900",
          "En 1943",
          "En 1960",
          "En 1899"
        ],
        "a": 1
      },
      {
        "q": "¿Qué unidad de medida lleva su nombre?",
        "options": [
          "El voltio",
          "El amperio",
          "El tesla (campo magnético)",
          "El vatio"
        ],
        "a": 2
      },
      {
        "q": "¿Qué organismo confiscó los documentos de Tesla después de su muerte?",
        "options": [
          "La NASA",
          "El FBI",
          "La CIA",
          "El ejército"
        ],
        "a": 1
      },
      {
        "q": "¿Dónde se encuentra el Museo Nikola Tesla?",
        "options": [
          "En Nueva York",
          "En Belgrado, Serbia",
          "En Londres",
          "En Zagreb, Croacia"
        ],
        "a": 1
      },
      {
        "q": "¿Qué frase famosa dijo Tesla sobre el futuro?",
        "options": [
          "'La ciencia es aburrida'",
          "'El presente es suyo. El futuro es mío'",
          "'Solo sé que no sé nada'",
          "'La electricidad no sirve para nada'"
        ],
        "a": 1
      }
    ]
  }
];
