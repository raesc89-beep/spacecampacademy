const fs = require('fs');
const path = require('path');

const egyptModules = [
  {
    "id": "egypt_m1",
    "order": 100,
    "titleEn": "Nabta Playa and the Desert Clock",
    "titleEs": "Nabta Playa y el Reloj del Desierto",
    "badge": "Desert Observer",
    "badgeEs": "Observador del Desierto",
    "color": "#D4A843",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m1_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Imagina caminar por el ardiente y solitario desierto del Sahara y, de repente, tropezar con un círculo de piedras gigantes clavadas en la arena.",
            "Mucho antes de que se construyera la primera pirámide y miles de años antes del famoso Stonehenge en Inglaterra, un grupo de antiguos nómadas construyó este misterioso anillo de rocas llamado Nabta Playa.",
            "Al principio, los exploradores modernos pensaron que eran simples piedras caídas, pero pronto descubrieron que estaban frente al observatorio astronómico más antiguo del planeta.",
            "Este lugar secreto, escondido entre las dunas, era un inmenso calendario de piedra diseñado por personas que miraban al cielo nocturno para sobrevivir en uno de los lugares más extremos de la Tierra."
          ],
          "image": "/assets/egypt/m1_nabta_playa.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m1_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Estas enormes losas de piedra no fueron colocadas al azar. Los antiguos científicos del desierto las alinearon cuidadosamente utilizando la luz de las estrellas y la posición del Sol.",
            "El círculo principal tiene un par de \"puertas\" de roca que apuntan exactamente hacia el lugar donde sale el Sol en el solsticio de verano, que es el día más largo del año.",
            "Para esta antigua civilización, saber cuándo ocurriría esto era cuestión de vida o muerte, ya que marcaba el inicio de la temporada de lluvias.",
            "Al observar cómo la sombra de las piedras cambiaba día con día, podían predecir el clima y saber exactamente cuándo debían mover sus campamentos para encontrar agua para ellos y sus animales."
          ],
          "image": "/assets/egypt/m1_nabta_playa.png",
          "style": "normal"
        },
        {
          "id": "egypt_m1_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Aunque hoy en día no usamos enormes piedras en el desierto para saber qué día es, la idea brillante detrás de Nabta Playa sigue viva en nuestra tecnología más avanzada.",
            "Este antiguo círculo de rocas fue el tatarabuelo de los gigantescos observatorios espaciales y de los radiotelescopios que hoy usamos para mirar las galaxias.",
            "La necesidad de medir el tiempo con exactitud estudiando los patrones del universo es exactamente la misma ciencia que utilizan nuestros teléfonos móviles y relojes inteligentes.",
            "Estos dispositivos se sincronizan con satélites en el espacio para decirnos la hora exacta y predecir cuándo va a llover, tal como lo hacían los nómadas con las estrellas."
          ],
          "image": "/assets/egypt/m1_nabta_playa.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Malville, J. M., Wendorf, F., Mazar, A., & Schild, R. (1998). Megaliths and Neolithic astronomy in southern Egypt. Nature, 392(6675), 488-491."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué era exactamente Nabta Playa?",
        "options": [
          "El observatorio astronómico de piedra más antiguo del mundo.",
          "Una antigua ciudad donde vivían los faraones.",
          "Un oasis artificial creado por los romanos."
        ],
        "a": 0
      },
      {
        "q": "¿Qué evento astronómico importante marcaban las 'puertas' de roca de Nabta Playa?",
        "options": [
          "El eclipse solar total.",
          "La llegada de un cometa.",
          "La salida del Sol en el solsticio de verano, marcando las lluvias."
        ],
        "a": 2
      }
    ]
  },
  {
    "id": "egypt_m2",
    "order": 101,
    "titleEn": "The Decans and the Time Makers",
    "titleEs": "Los Decanos y los Creadores del Tiempo",
    "badge": "Time Keeper",
    "badgeEs": "Guardián del Tiempo",
    "color": "#6A9FD4",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m2_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Si alguna vez te has preguntado por qué un día tiene exactamente 24 horas, la respuesta está oculta en los oscuros cielos del antiguo Egipto.",
            "Antes de los relojes digitales o de manecillas, medir el tiempo durante el día era fácil gracias al Sol, pero ¿qué pasaba cuando llegaba la noche y todo se volvía oscuridad?",
            "Los sacerdotes y astrónomos egipcios, vestidos de lino blanco, subían a los techos planos de sus templos para resolver este problema.",
            "Observando el cielo con mucha atención durante años, descubrieron un patrón secreto: ciertas estrellas brillantes aparecían en el horizonte justo antes del amanecer y cambiaban cada diez días. Habían encontrado el primer reloj nocturno de la historia."
          ],
          "image": "/assets/egypt/m2_decanos.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m2_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "A estos grupos especiales de estrellas los llamaron 'Decanos'. Los astrónomos dividieron todo el cielo nocturno en 36 secciones, cada una gobernada por un Decano diferente.",
            "Durante la corta noche de verano en Egipto, siempre se podían ver exactamente 12 de estos grupos de estrellas cruzar el cielo de este a oeste, uno tras otro.",
            "Al observar qué estrella gobernante estaba en lo más alto, podían saber exactamente qué hora de la noche era. Así, decidieron que la noche tendría 12 horas.",
            "Más tarde, por pura lógica matemática, decidieron dividir el día de luz solar también en 12 horas, creando así nuestro día completo de 24 horas."
          ],
          "image": "/assets/egypt/m2_decanos.png",
          "style": "normal"
        },
        {
          "id": "egypt_m2_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Es increíble pensar que cada vez que miras tu reloj, tu tableta o la pantalla de la computadora para saber si ya es hora de jugar o de comer, estás usando un sistema inventado por astrónomos observando estrellas hace miles de años.",
            "Hoy en día medimos el tiempo usando la vibración de los átomos en relojes atómicos súper precisos.",
            "Pero la base matemática de cómo dividimos nuestras rutinas diarias, nuestras clases y nuestros horarios, es un regalo directo de aquellos vigilantes del cielo egipcio.",
            "Ellos no querían perder la cuenta del tiempo mientras el Sol dormía."
          ],
          "image": "/assets/egypt/m2_decanos.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Neugebauer, O., & Parker, R. A. (1960). Egyptian Astronomical Texts. Brown University Press."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué eran los 'Decanos' en el antiguo Egipto?",
        "options": [
          "Grupos de estrellas que servían como un reloj nocturno.",
          "Los sacerdotes que gobernaban los templos.",
          "Meteoritos que caían del cielo."
        ],
        "a": 0
      },
      {
        "q": "¿Gracias a los Decanos, en cuántas horas decidieron los egipcios dividir la noche?",
        "options": [
          "En 10 horas.",
          "En 12 horas, lo que nos dio el día de 24 horas.",
          "En 24 horas solo para la noche."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m3",
    "order": 102,
    "titleEn": "Sopdet and the Great Reset",
    "titleEs": "Sopdet y el Gran Reseteo",
    "badge": "Sirius Explorer",
    "badgeEs": "Explorador de Sirio",
    "color": "#C0E8FF",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m3_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "En el corazón de Egipto existe un río inmenso llamado Nilo, y para los antiguos egipcios, este río lo era todo.",
            "Sin embargo, había un misterio que los mantenía en suspenso cada año: el río siempre se desbordaba, llenando las tierras secas de barro oscuro y nutritivo perfecto para sembrar comida, pero ¿cómo saber el día exacto en que esto pasaría?",
            "La respuesta no estaba en el agua, sino flotando muy arriba, en el espacio profundo.",
            "Descubrieron que una estrella específica y súper brillante, a la que llamaron Sopdet (y que hoy conocemos como Sirio), tenía el poder de 'encender' el río. Cuando Sopdet aparecía, la vida renacía en el desierto."
          ],
          "image": "/assets/egypt/m3_sopdet.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m3_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Sirio es la estrella más brillante de nuestro cielo nocturno, pero debido al movimiento de la Tierra, hay un período de 70 días al año en el que no se puede ver desde Egipto, como si estuviera escondida detrás del Sol.",
            "El momento mágico, conocido por los astrónomos modernos como la 'aparición helíaca', ocurre cuando Sirio vuelve a ser visible en el horizonte oriental justo unos minutos antes de que el Sol salga por la mañana.",
            "Para los egipcios, ese destello azulado en la madrugada era la señal matemática perfecta.",
            "Significaba que las lluvias en las montañas lejanas de África habían comenzado y que la gran inundación del Nilo llegaría en cuestión de días."
          ],
          "image": "/assets/egypt/m3_sopdet.png",
          "style": "normal"
        },
        {
          "id": "egypt_m3_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "La observación de Sopdet fue uno de los primeros y más exitosos intentos de la humanidad por conectar un evento astronómico con un cambio climático en la Tierra.",
            "Hoy en día, seguimos haciendo exactamente lo mismo, pero con herramientas mucho más complejas.",
            "Utilizamos satélites meteorológicos que orbitan nuestro planeta, como verdaderas 'estrellas robóticas', para observar los patrones climáticos globales.",
            "Los antiguos astrónomos egipcios fueron los primeros meteorólogos espaciales, enseñándonos que mirar hacia arriba es la mejor manera de entender lo que pasará aquí abajo."
          ],
          "image": "/assets/egypt/m3_sopdet.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Holmberg, M. (1946). The God Ptah. CWK Gleerup."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué estrella es conocida como Sopdet en el antiguo Egipto?",
        "options": [
          "El Sol",
          "Sirio, la estrella más brillante del cielo nocturno.",
          "La Estrella Polar"
        ],
        "a": 1
      },
      {
        "q": "¿Qué evento de la Tierra predecía la aparición helíaca de Sopdet?",
        "options": [
          "Un terremoto destructivo.",
          "La gran inundación anual del río Nilo.",
          "Una sequía prolongada."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m4",
    "order": 103,
    "titleEn": "Mesjetiu, the Cosmic Bull's Leg",
    "titleEs": "Mesjetiu, la Pata de Buey Cósmica",
    "badge": "Navigator",
    "badgeEs": "Navegante Estelar",
    "color": "#F5C842",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m4_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Cuando miras al cielo del norte por la noche, es muy probable que busques la famosa estrella Polar o intentes encontrar formas de osos gigantes entre las estrellas.",
            "Pero si hubieras nacido en el antiguo Egipto, no buscarías osos, ¡buscarías la enorme pata de un toro gigante!",
            "En las tumbas de los grandes faraones, pintada en los techos con colores brillantes, aparece siempre una extraña figura llamada 'Mesjetiu', que tiene la forma de una pata de buey.",
            "Para ellos, esta extraña figura no era solo un dibujo divertido, era la herramienta más importante que tenían en todo el universo para orientarse en el mundo y nunca perder el rumbo."
          ],
          "image": "/assets/egypt/m4_mesjetiu.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m4_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Lo que los egipcios llamaban Mesjetiu es exactamente el mismo grupo de estrellas que nosotros llamamos hoy 'La Osa Mayor' o 'El Cazo'.",
            "La ciencia detrás de su importancia es fascinante: debido a la rotación de la Tierra, la mayoría de las estrellas nacen por el este y mueren por el oeste cada noche.",
            "Sin embargo, las estrellas de Mesjetiu están tan cerca del Polo Norte celeste que nunca se esconden bajo el horizonte. Para los egipcios, eran las 'estrellas inmortales' o 'las que no conocen la destrucción'.",
            "Al observar su posición constante en el cielo nocturno, los arquitectos podían encontrar el punto cardinal Norte exacto, en cualquier día del año."
          ],
          "image": "/assets/egypt/m4_mesjetiu.png",
          "style": "normal"
        },
        {
          "id": "egypt_m4_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Utilizar estrellas lejanas que nunca cambian de posición como puntos de referencia es el principio fundamental de la navegación espacial y terrestre.",
            "Hoy en día, los grandes barcos mercantes y hasta los aviones más modernos tienen sistemas de respaldo que utilizan el mapa estelar para orientarse en caso de que todo lo demás falle.",
            "Aún más increíble, las naves espaciales que enviamos a explorar Marte o Júpiter no usan brújulas magnéticas, usan 'rastreadores de estrellas' computarizados.",
            "Estos sistemas buscan constelaciones constantes, al igual que los antiguos arquitectos egipcios buscaban a Mesjetiu para construir sus inmensas obras maestras."
          ],
          "image": "/assets/egypt/m4_mesjetiu.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Krupp, E. C. (1983). Echoes of the Ancient Skies: The Astronomy of Lost Civilizations. Harper & Row."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué constelación actual es la que los egipcios llamaban 'Mesjetiu'?",
        "options": [
          "La Osa Mayor.",
          "El Cinturón de Orión.",
          "La Cruz del Sur."
        ],
        "a": 0
      },
      {
        "q": "¿Por qué era tan importante Mesjetiu para los egipcios?",
        "options": [
          "Porque marcaba el inicio de la primavera.",
          "Porque nunca se escondía bajo el horizonte y les indicaba el Norte exacto.",
          "Porque era la constelación más brillante del cielo."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m5",
    "order": 104,
    "titleEn": "The Giza Laser and the Great Alignment",
    "titleEs": "El Láser de Giza y la Gran Alineación",
    "badge": "Architect",
    "badgeEs": "Arquitecto Cósmico",
    "color": "#F0A500",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m5_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "La Gran Pirámide de Giza es uno de los edificios más asombrosos jamás construidos, formada por millones de bloques de piedra pesadísimos.",
            "Pero su mayor secreto no está en su tamaño, sino en un detalle casi invisible para el ojo humano: su precisión.",
            "Las cuatro bases de esta gigantesca montaña artificial están alineadas casi perfectamente con el norte, sur, este y oeste geográfico. ¡Tienen un error de apenas una fracción diminuta de grado!",
            "La gran pregunta que volvió locos a los científicos modernos durante años fue: ¿Cómo lograron una precisión casi de rayo láser hace miles de años, si aún no habían inventado las brújulas ni el GPS?"
          ],
          "image": "/assets/egypt/m5_giza.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m5_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "La magia arquitectónica no requería tecnología alienígena, sino una inteligencia observacional extraordinaria y un método llamado el 'círculo indio' o el seguimiento de sombras.",
            "Los ingenieros egipcios clavaban un poste recto en el suelo y trazaban un círculo perfecto alrededor de él.",
            "A medida que el Sol se movía por el cielo, marcaban exactamente el punto donde la sombra del poste tocaba el círculo por la mañana y el punto exacto donde lo tocaba por la tarde.",
            "Al trazar una línea que dividía a la mitad esos dos puntos, obtenían una flecha perfecta apuntando directamente hacia el norte verdadero. Así de simple y así de matemáticamente brillante."
          ],
          "image": "/assets/egypt/m5_giza.png",
          "style": "normal"
        },
        {
          "id": "egypt_m5_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Este asombroso método de usar luces y sombras para encontrar coordenadas perfectas es el mismo concepto geométrico que aplicamos en nuestra tecnología moderna.",
            "Cuando utilizas un mapa digital en tu teléfono celular para encontrar tu restaurante favorito o saber dónde estás, la antena GPS de tu dispositivo calcula distancias basándose en satélites.",
            "Los constructores de pirámides nos demostraron que, si conoces la geometría del cosmos y usas el cielo como tu herramienta principal, puedes lograr una precisión milimétrica.",
            "La astronomía fue su GPS original, sin importar las herramientas que tuvieran en la mano."
          ],
          "image": "/assets/egypt/m5_giza.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Spence, K. (2000). Ancient Egyptian chronology and the astronomical orientation of pyramids. Nature, 408(6810), 320-324."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué método utilizaban los egipcios para alinear perfectamente las pirámides con los puntos cardinales?",
        "options": [
          "Una brújula magnética.",
          "El 'círculo indio' o seguimiento de sombras con un poste.",
          "Calculadoras rudimentarias."
        ],
        "a": 1
      },
      {
        "q": "¿Con qué precisión están alineadas las bases de la Gran Pirámide?",
        "options": [
          "Están completamente desviadas.",
          "Alineadas casi perfectamente al norte, sur, este y oeste, con un error minúsculo.",
          "Alineadas hacia la estrella Sirio exclusivamente."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m6",
    "order": 105,
    "titleEn": "The First Map of the Universe",
    "titleEs": "El Primer Mapa del Universo",
    "badge": "Cartographer",
    "badgeEs": "Cartógrafo Celeste",
    "color": "#9B6BFF",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m6_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Imagina entrar a una cueva oscura, iluminar el techo con tu linterna y descubrir que alguien pintó todo el universo conocido hace más de 3,500 años.",
            "Eso es exactamente lo que ocurrió cuando los arqueólogos descubrieron la tumba oculta de Senenmut, un arquitecto súper brillante y el mejor amigo de la famosa reina Hatshepsut.",
            "A diferencia de otras tumbas llenas de oro o estatuas, el tesoro de Senenmut estaba en su techo: había diseñado y pintado el primer catálogo estelar detallado de toda la historia de la humanidad.",
            "Era un inmenso mapa cósmico, lleno de figuras extrañas de dioses, animales y círculos planetarios."
          ],
          "image": "/assets/egypt/m6_senenmut.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m6_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "El Techo de Senenmut no era solo arte, era una base de datos astronómica. El mapa está dividido en dos grandes secciones: el cielo del norte y el cielo del sur.",
            "En él, los astrónomos egipcios registraron cuidadosamente los meridianos celestes, dibujaron a Júpiter y Saturno, y catalogaron docenas de constelaciones que ellos veían.",
            "Vemos figuras como un hombre con un arpón o un inmenso hipopótamo con un cocodrilo en la espalda.",
            "Esta obra maestra demuestra que tenían un sistema de coordenadas complejo para seguir el movimiento de los planetas brillantes que vagaban entre las estrellas fijas, entendiendo que el cielo no era un caos, sino una máquina organizada."
          ],
          "image": "/assets/egypt/m6_senenmut.png",
          "style": "normal"
        },
        {
          "id": "egypt_m6_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Este techo pintado en la oscuridad es el abuelo directo de algo que probablemente conoces muy bien: los planetarios modernos y las aplicaciones de mapas estelares.",
            "Hoy usamos softwares que proyectan en pantallas digitales el mismo cielo nocturno, ayudándonos a identificar dónde están los planetas o la Estación Espacial Internacional.",
            "El arquitecto Senenmut hizo exactamente lo mismo con pintura natural y matemáticas, creando la primera 'pantalla' de información astronómica.",
            "Su mapa permitió a las personas viajar por las estrellas incluso después de haber cerrado los ojos para siempre."
          ],
          "image": "/assets/egypt/m6_senenmut.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Dorman, P. F. (1991). The Tombs of Senenmut: The Architecture and Decoration of Tombs 71 and 353. Metropolitan Museum of Art."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué tesoro astronómico se encontró en la tumba del arquitecto Senenmut?",
        "options": [
          "Un telescopio antiguo.",
          "El primer catálogo estelar detallado pintado en su techo.",
          "Un calendario solar de oro."
        ],
        "a": 1
      },
      {
        "q": "¿Qué características tiene el mapa estelar de Senenmut?",
        "options": [
          "Solo muestra a la Luna.",
          "Divide el cielo en norte y sur, mostrando planetas y constelaciones egipcias.",
          "Es un mapa del río Nilo, no del cielo."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m7",
    "order": 106,
    "titleEn": "Stone Telescopes",
    "titleEs": "Telescopios de Piedra",
    "badge": "Stargazer",
    "badgeEs": "Mirador de Estrellas",
    "color": "#5EC4A0",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m7_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Cuando los primeros exploradores lograron entrar a las misteriosas cámaras ocultas en el centro de la Gran Pirámide, encontraron algo que no tenía sentido.",
            "Había pequeños túneles cuadrados, no más anchos que una caja de zapatos, que atravesaban cientos de metros de piedra sólida desde el centro de la pirámide hasta el exterior.",
            "Durante mucho tiempo, la gente pensó que eran simples conductos de ventilación para que entrara aire fresco.",
            "Pero los arqueoastrónomos hicieron un descubrimiento impactante usando modelos de computadora: ¡estos túneles no eran para el aire, eran cañones estelares gigantes que apuntaban a coordenadas precisas en el cielo nocturno!"
          ],
          "image": "/assets/egypt/m7_star_shafts.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m7_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Estos misteriosos ejes, conocidos como canales estelares, son una obra maestra de la óptica antigua sin usar lentes de vidrio.",
            "En la época en que se construyó la pirámide, los túneles apuntaban con una puntería perfecta hacia estrellas muy específicas. Uno apuntaba a Thuban, que en ese entonces era la Estrella Polar (el norte absoluto).",
            "Otro apuntaba directamente al Cinturón de Orión, que representaba a Osiris, el gran rey del más allá.",
            "Para la ciencia egipcia, el alma era energía pura que necesitaba un 'cañón de lanzamiento' geométricamente perfecto para ser disparada y unirse a las estrellas inmortales."
          ],
          "image": "/assets/egypt/m7_star_shafts.png",
          "style": "normal"
        },
        {
          "id": "egypt_m7_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "La idea de construir un enorme tubo oscuro para aislar la luz y apuntar a una estrella específica es exactamente el principio de funcionamiento de los telescopios modernos.",
            "Aunque hoy usamos lentes de cristal o espejos gigantes para acercar la imagen, el concepto de alinear un eje sólido hacia un punto específico del espacio fue probado aquí primero.",
            "Cuando apuntamos potentes telescopios espaciales hacia zonas oscuras del universo para descubrir exoplanetas, estamos siguiendo la misma lógica de los arquitectos egipcios.",
            "Enfocamos la mirada a través de un túnel estrecho para descubrir los secretos de mundos lejanos."
          ],
          "image": "/assets/egypt/m7_star_shafts.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Bauval, R., & Gilbert, A. (1994). The Orion Mystery: Unlocking the Secrets of the Pyramids. Crown."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué descubrieron los científicos sobre los pequeños túneles en la Gran Pirámide?",
        "options": [
          "Eran conductos de ventilación para el faraón.",
          "Eran cañones estelares alineados con estrellas específicas como Thuban y Orión.",
          "Servían para iluminar el interior con luz solar."
        ],
        "a": 1
      },
      {
        "q": "¿Con qué herramienta moderna se relaciona la función de estos túneles de piedra?",
        "options": [
          "Con los microscopios.",
          "Con los radares submarinos.",
          "Con los telescopios, al aislar la luz y apuntar a puntos específicos."
        ],
        "a": 2
      }
    ]
  },
  {
    "id": "egypt_m8",
    "order": 107,
    "titleEn": "The Sun Miracle of Abu Simbel",
    "titleEs": "El Milagro del Sol de Abu Simbel",
    "badge": "Sun Catcher",
    "badgeEs": "Atrapasol Cósmico",
    "color": "#FF9A3C",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m8_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "En lo profundo del sur de Egipto, tallado directamente en la pared de una montaña rocosa, se encuentra el colosal templo de Abu Simbel, vigilado por cuatro estatuas gigantes del faraón Ramsés II.",
            "El templo es asombroso por sí solo, pero guarda un secreto tecnológico y astronómico espectacular.",
            "Durante casi todo el año, la sala principal del templo está envuelta en una oscuridad total. Sin embargo, dos días específicos al año, ocurre magia pura.",
            "Un rayo de sol logra colarse por la entrada principal, atraviesa más de 60 metros de pasillos oscuros como si fuera un láser, y golpea directamente las caras de las estatuas doradas sentadas en el fondo."
          ],
          "image": "/assets/egypt/m8_abu_simbel.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m8_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Este evento, conocido como la alineación solar de Ramsés, es una prueba del genio matemático de los arquitectos antiguos.",
            "Tuvieron que calcular el ángulo exacto de rotación y traslación de la Tierra respecto al Sol para perforar la montaña con precisión milimétrica.",
            "Calcularon que el rayo solar penetraría el santuario en octubre y febrero (fechas vinculadas a las estaciones de siembra y cosecha).",
            "Aún más impresionante: de las cuatro estatuas en el fondo, el rayo de luz nunca, jamás, toca la estatua del dios Ptah, porque él era el dios del inframundo y debía permanecer siempre en la oscuridad geométrica."
          ],
          "image": "/assets/egypt/m8_abu_simbel.png",
          "style": "normal"
        },
        {
          "id": "egypt_m8_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Lo que hizo Ramsés II con su templo es uno de los primeros y más impresionantes ejemplos de 'arquitectura solar pasiva'.",
            "Hoy en día, los ingenieros modernos y los arquitectos sostenibles utilizan sofisticados programas de diseño 3D para construir casas inteligentes y edificios ecológicos.",
            "Estos edificios atrapan la luz del sol en invierno para calentar las habitaciones de forma natural y bloquean el sol en verano para mantener los interiores frescos, ahorrando energía.",
            "El genio antiguo nos demuestra que jugar con los ángulos de la luz es una de las tecnologías más poderosas y sostenibles que existen."
          ],
          "image": "/assets/egypt/m8_abu_simbel.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Krupp, E. C. (1988). Light in the Temples. In Records in Stone: Papers in Memory of Alexander Thom."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué fenómeno astronómico ocurre dos veces al año en el templo de Abu Simbel?",
        "options": [
          "El templo entero cambia de color.",
          "Un rayo de sol penetra 60 metros e ilumina las estatuas del santuario.",
          "El río Nilo inunda el templo."
        ],
        "a": 1
      },
      {
        "q": "¿Qué estatua del santuario nunca es iluminada por el sol en Abu Simbel y por qué?",
        "options": [
          "La estatua de Ptah, porque era el dios del inframundo.",
          "La estatua de Ramsés II, por respeto.",
          "La estatua del halcón Horus."
        ],
        "a": 0
      }
    ]
  },
  {
    "id": "egypt_m9",
    "order": 108,
    "titleEn": "The Stolen Zodiac of Dendera",
    "titleEs": "El Zodiaco Robado de Dendera",
    "badge": "Zodiac Master",
    "badgeEs": "Maestro del Zodiaco",
    "color": "#D46A6A",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m9_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Imagina entrar a un templo milenario y encontrar en el techo del segundo piso un inmenso mapa circular de piedra lleno de monstruos, dioses y animales, tan detallado que parece un rompecabezas espacial.",
            "Este es el famoso Zodiaco de Dendera. Fue un hallazgo tan valioso e increíble que, a principios del siglo XIX, los exploradores franceses literalmente usaron dinamita y sierras para cortarlo del techo.",
            "Se lo llevaron en un barco hasta Europa, donde aún se exhibe en el museo del Louvre en París.",
            "Pero el verdadero tesoro de esta pieza no es de quién es, sino la increíble base de datos global que esconde tallada en su superficie."
          ],
          "image": "/assets/egypt/m9_dendera.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m9_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "El Zodiaco de Dendera es asombroso porque es como un 'traductor universal' de las estrellas. Muestra cómo la astronomía egipcia comenzó a fusionarse con los conocimientos de otros imperios lejanos.",
            "En este inmenso mapa de piedra podemos ver constelaciones egipcias tradicionales mezcladas perfectamente con símbolos que nosotros conocemos muy bien hoy, como Leo el león, Tauro el toro y Libra la balanza.",
            "Además, incluye íconos especiales para marcar los eclipses solares y lunares.",
            "Esto creó uno de los mapas del cielo más completos, precisos e integrados del mundo antiguo."
          ],
          "image": "/assets/egypt/m9_dendera.png",
          "style": "normal"
        },
        {
          "id": "egypt_m9_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Este mapa estelar de piedra fue la primera versión de la 'globalización científica'. Nos demuestra que cuando científicos de diferentes partes del mundo comparten sus datos, los resultados son sorprendentes.",
            "Hoy en día, la Estación Espacial Internacional y los grandes proyectos astronómicos como el telescopio James Webb funcionan exactamente con esta idea.",
            "Agencias espaciales de muchos países distintos, compartiendo un mismo 'mapa' y trabajando juntos para comprender el universo.",
            "El Zodiaco de Dendera nos demuestra que la ciencia y la exploración de las estrellas no tienen fronteras."
          ],
          "image": "/assets/egypt/m9_dendera.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Aubin, F. (1995). Le Zodiaque d'Osiris. Editions Dervy."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué es el Zodiaco de Dendera?",
        "options": [
          "Un reloj de arena egipcio.",
          "Un inmenso mapa circular de piedra que fusiona constelaciones egipcias y babilónicas/griegas.",
          "Un libro escrito por el faraón."
        ],
        "a": 1
      },
      {
        "q": "¿Por qué es un ejemplo de 'globalización científica' de la antigüedad?",
        "options": [
          "Porque muestra que la Tierra es plana.",
          "Porque mezcla conocimientos astronómicos de diferentes culturas (egipcia, griega, babilónica).",
          "Porque fue encontrado en París."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m10",
    "order": 109,
    "titleEn": "Iron from the Sky, the Space Dagger",
    "titleEs": "Hierro del Cielo, la Daga Espacial",
    "badge": "Meteor Miner",
    "badgeEs": "Minero de Meteoritos",
    "color": "#B0C4DE",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m10_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Cuando el famoso arqueólogo Howard Carter descubrió la tumba intacta del joven faraón Tutankamón, encontró tesoros de oro macizo, carros de guerra y estatuas.",
            "Pero escondida entre las vendas de la momia había una daga que dejó a los científicos totalmente confundidos.",
            "La hoja de esta daga estaba hecha de hierro, un metal brillante y perfectamente pulido que no se había oxidado. El gran misterio era que en la época en que vivió el rey Tutankamón, ¡los egipcios aún no sabían cómo extraer ni fundir el hierro de la Tierra!",
            "Entonces, si no extrajeron el metal de nuestro planeta, ¿de dónde sacó el faraón su increíble arma secreta?"
          ],
          "image": "/assets/egypt/m10_daga.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m10_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "La asombrosa respuesta se confirmó casi cien años después usando espectrómetros de rayos X modernos: la daga es literalmente tecnología extraterrestre.",
            "El metal para forjar la espada de Tutankamón provino del espacio exterior. Los herreros del faraón encontraron un meteorito metálico que había chocado contra el desierto y usaron ese fragmento de estrella caída para forjar la hoja.",
            "Sabemos esto porque la composición química del cuchillo tiene altos niveles de níquel y cobalto.",
            "Esta firma química única solo se encuentra en meteoritos metálicos que han viajado por el sistema solar durante miles de millones de años."
          ],
          "image": "/assets/egypt/m10_daga.png",
          "style": "normal"
        },
        {
          "id": "egypt_m10_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Para los egipcios, un meteorito era 'hierro del cielo', un regalo mágico de los dioses. Para nosotros hoy, esta daga es la prueba de la Astromineralogía, el estudio de los minerales espaciales.",
            "Esta misma ciencia es la que impulsa los planes más audaces del siglo XXI: la minería de asteroides.",
            "En este mismo momento, agencias espaciales y empresas de tecnología están enviando sondas a asteroides lejanos.",
            "Están aprendiendo cómo extraer metales raros y valiosos flotando en el espacio, siguiendo los pasos de aquellos antiguos herreros que forjaron la primera herramienta espacial."
          ],
          "image": "/assets/egypt/m10_daga.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Comelli, D., et al. (2016). The meteoritic origin of Tutankhamun's iron dagger blade. Meteoritics & Planetary Science, 51(7), 1301-1309."
      ]
    },
    "quizEs": [
      {
        "q": "¿De dónde provino el hierro utilizado para la daga del faraón Tutankamón?",
        "options": [
          "De minas profundas en África.",
          "De un meteorito caído del espacio exterior.",
          "Fue un regalo de los reyes de Roma."
        ],
        "a": 1
      },
      {
        "q": "¿Qué prueba científica confirmó el origen de la daga?",
        "options": [
          "El color de la hoja.",
          "Un texto antiguo encontrado en la tumba.",
          "Los altos niveles de níquel y cobalto detectados con espectrómetros de rayos X."
        ],
        "a": 2
      }
    ]
  },
  {
    "id": "egypt_m11",
    "order": 110,
    "titleEn": "The Milky Way and Nut's Nile",
    "titleEs": "La Vía Láctea y el Nilo de Nut",
    "badge": "Galaxy Surfer",
    "badgeEs": "Navegante Galáctico",
    "color": "#9DD4F0",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m11_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Si pudieras viajar en el tiempo a una noche sin contaminación lumínica en el antiguo Egipto, mirar hacia arriba sería un espectáculo sobrecogedor.",
            "Atravesando todo el cielo de lado a lado, verías una franja blanca y brillante llena de millones de estrellas a la que hoy llamamos la Vía Láctea.",
            "Para los egipcios, esta enorme mancha de luz no era solo un grupo de estrellas, era un río cósmico. Creían que todo en el universo debía tener un reflejo, un espejo perfecto.",
            "Así como ellos tenían el río Nilo que cruzaba sus tierras de sur a norte y les daba vida, el cielo debía tener su propio Nilo navegable."
          ],
          "image": "/assets/egypt/m11_via_lactea.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m11_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "En la ciencia astronómica egipcia, la Vía Láctea era la manifestación visible del cuerpo estrellado de la diosa Nut, la protectora del cielo.",
            "El concepto científico que desarrollaron es brillante: creían en la 'geografía cósmica simétrica'. Observaron que esta banda de estrellas parecía fluir en una dirección similar a su río terrestre.",
            "Desarrollaron la teoría de que el dios Sol (Ra) usaba un barco de energía cósmica para navegar por este río estelar cada noche.",
            "El sol cruzaba la Vía Láctea para poder renacer por la mañana, explicando así la mecánica continua del día y la noche a través del movimiento cósmico."
          ],
          "image": "/assets/egypt/m11_via_lactea.png",
          "style": "normal"
        },
        {
          "id": "egypt_m11_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "La idea de 'mapear' la Vía Láctea como si fuera una carretera brillante o un río es exactamente lo que los astrónomos hacen hoy con la astrometría.",
            "Usando satélites ultramodernos como la sonda Gaia, estamos dibujando el mapa tridimensional más detallado y grande de nuestra galaxia.",
            "Rastreamos la posición y el movimiento fluido de miles de millones de estrellas.",
            "Al igual que los egipcios imaginaron rutas de navegación a lo largo del 'Nilo celestial', nosotros trazamos rutas galácticas intentando entender cómo se mueve este gigantesco río de estrellas."
          ],
          "image": "/assets/egypt/m11_via_lactea.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Wells, R. A. (1992). The Mythology of the Milky Way. Journal for the History of Astronomy, 23(4), 305-324."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué representaba la Vía Láctea para los antiguos egipcios?",
        "options": [
          "Una nube de tormenta que traería lluvia.",
          "El 'Nilo celestial', un río cósmico por el que navegaba el Sol de noche.",
          "El camino hacia el inframundo."
        ],
        "a": 1
      },
      {
        "q": "¿Qué proyecto tecnológico moderno hace algo similar a mapear el 'río de estrellas' de los egipcios?",
        "options": [
          "Los submarinos nucleares.",
          "La sonda Gaia, que traza un mapa 3D detallado de nuestra galaxia.",
          "Las torres de control de los aeropuertos."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m12",
    "order": 111,
    "titleEn": "Obelisks, Catching the Sun",
    "titleEs": "Obeliscos, Atrapando el Sol",
    "badge": "Sundial Master",
    "badgeEs": "Maestro de las Sombras",
    "color": "#E8C96A",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m12_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Caminar por los antiguos templos egipcios es como entrar a un bosque de gigantescas agujas de piedra.",
            "Estas inmensas columnas rectangulares que terminan en una punta piramidal se llaman 'Obeliscos', y los egipcios los tallaban de un solo bloque de roca que podía pesar tanto como cien elefantes.",
            "Muchos piensan que solo eran monumentos bonitos para mostrar el poder del faraón o para decorar la entrada de los palacios.",
            "Pero en realidad, estas columnas puntiagudas eran los instrumentos de medición de tiempo más grandes y precisos del mundo antiguo. Eran gigantescos cazadores de sombras."
          ],
          "image": "/assets/egypt/m12_obelisco.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m12_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "En la arqueoastronomía, un obelisco funciona como un 'Gnomon', que es la parte de un reloj de sol que arroja una sombra. La ciencia aquí es pura geometría solar en acción.",
            "A medida que la Tierra rota, el sol parece moverse por el cielo, y el obelisco proyecta una sombra nítida sobre el suelo de las plazas de los templos.",
            "Los sacerdotes hacían marcas en el suelo para medir cómo la sombra se hacía más corta hacia el mediodía y más larga hacia la tarde, dividiendo así las horas del día de manera exacta.",
            "La punta piramidal (el piramidión) estaba recubierta de oro o electro para que brillara y la sombra fuera increíblemente precisa."
          ],
          "image": "/assets/egypt/m12_obelisco.png",
          "style": "normal"
        },
        {
          "id": "egypt_m12_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Aunque hoy un gigantesco reloj de piedra parezca lento y anticuado, la física fundamental de medir el cambio constante para saber el tiempo es universal.",
            "Los obeliscos medían el tiempo basándose en la rotación de la Tierra respecto al Sol. Hoy en día, los relojes atómicos miden el tiempo basándose en la rotación de los electrones dentro de un átomo de cesio.",
            "Las herramientas han cambiado drásticamente en tamaño y velocidad, pero el propósito fundamental se mantiene igual.",
            "La necesidad humana de calibrar y sincronizar nuestras actividades diarias nació viendo cómo la afilada sombra de un obelisco acariciaba la arena del desierto."
          ],
          "image": "/assets/egypt/m12_obelisco.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Isler, M. (1991). The Gnomon in Egyptian Antiquity. Journal of the American Research Center in Egypt, 28, 155-185."
      ]
    },
    "quizEs": [
      {
        "q": "¿Para qué servían realmente los obeliscos egipcios, además de decoración?",
        "options": [
          "Como pararrayos para proteger los templos.",
          "Como 'Gnomon' o reloj de sol gigante para medir las horas del día.",
          "Como soporte para sostener el techo del templo."
        ],
        "a": 1
      },
      {
        "q": "¿Qué principio físico subyacente comparten los obeliscos con los relojes modernos?",
        "options": [
          "Usan baterías solares.",
          "Miden una constante física, ya sea el movimiento del Sol o la vibración de un átomo, para calcular el tiempo.",
          "Tienen engranajes mecánicos en su interior."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m13",
    "order": 112,
    "titleEn": "The 365 Days Code",
    "titleEs": "El Código de los 365 Días",
    "badge": "Calendar Creator",
    "badgeEs": "Creador de Calendarios",
    "color": "#80D080",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m13_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Si el 31 de diciembre celebras la llegada de un año nuevo, debes agradecerle a un antiguo matemático egipcio.",
            "En los inicios de la historia humana, organizar el tiempo era un caos; algunos pueblos tenían años de 300 días, otros se guiaban solo por la luna y sus calendarios se desfasaban totalmente con el clima.",
            "Imagina que el calendario de tu escuela dijera que es invierno, ¡pero hiciera un calor terrible!",
            "Para evitar este desastre y poder organizar un imperio gigante, los astrónomos egipcios se sentaron a observar el sol y las estrellas y crearon el calendario más perfecto y estable del mundo antiguo."
          ],
          "image": "/assets/egypt/m13_calendario.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m13_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Tras décadas de observación astronómica estricta, los científicos egipcios descubrieron la fórmula matemática exacta del tiempo terrestre: crearon el año civil.",
            "Decidieron que el año tendría exactamente 12 meses, y que cada mes tendría 30 días exactos, divididos en tres semanas de 10 días cada una. Esto daba un total de 360 días.",
            "Pero, como sabían por la observación de las estrellas que a la Tierra le tomaba un poco más dar la vuelta al Sol, agregaron 5 'días mágicos' extra al final del año (días epagómenos) dedicados a sus dioses principales.",
            "Así, bloquearon matemáticamente el ciclo en 365 días."
          ],
          "image": "/assets/egypt/m13_calendario.png",
          "style": "normal"
        },
        {
          "id": "egypt_m13_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Ese diseño lógico y limpio de 365 días se convirtió en el 'código fuente' o el sistema operativo del tiempo humano.",
            "Más tarde, los romanos copiaron este sistema egipcio y le agregaron el año bisiesto, creando el calendario que usamos en computadoras, teléfonos y relojes inteligentes en todo el planeta.",
            "Cada vez que programas una alarma en tu calendario digital para tu cumpleaños o para una entrega de tareas en la plataforma, estás ejecutando una línea de tiempo.",
            "Esa línea de tiempo fue codificada por observadores de estrellas a las orillas del río Nilo hace milenios."
          ],
          "image": "/assets/egypt/m13_calendario.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Parker, R. A. (1950). The Calendars of Ancient Egypt. University of Chicago Press."
      ]
    },
    "quizEs": [
      {
        "q": "¿Cómo estructuraron los egipcios su calendario perfecto de 365 días?",
        "options": [
          "12 meses de 30 días, más 5 'días mágicos' al final del año.",
          "10 meses de 36 días y medio.",
          "Meses que cambiaban de duración según las fases de la luna."
        ],
        "a": 0
      },
      {
        "q": "¿Qué problema resolvía el calendario egipcio de 365 días?",
        "options": [
          "Evitaba que el Sol se apagara.",
          "Evitaba el desfase total entre las fechas del calendario y las estaciones climáticas reales.",
          "Calculaba el número de piedras en una pirámide."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m14",
    "order": 113,
    "titleEn": "Eclipses and the Chaos of Apophis",
    "titleEs": "Los Eclipses y el Caos de Apofis",
    "badge": "Eclipse Watcher",
    "badgeEs": "Observador de Eclipses",
    "color": "#FF5252",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m14_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Imagina estar jugando al mediodía con un sol brillante y calor, y de repente, en cuestión de minutos, el cielo se vuelve negro como la medianoche, las aves dejan de cantar y las estrellas aparecen de la nada.",
            "Para nosotros esto es un espectáculo increíble, pero para los antiguos egipcios, un eclipse solar total era el evento más aterrador del universo.",
            "En su visión del mundo, un eclipse no era un simple fenómeno natural, era una batalla cósmica de vida o muerte.",
            "Creían que una gigantesca serpiente monstruosa de oscuridad, llamada Apofis, estaba logrando devorar al Sol en pleno vuelo."
          ],
          "image": "/assets/egypt/m14_apofis.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m14_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "A diferencia de su conocimiento perfecto sobre estrellas y planetas, la física de los eclipses solares y lunares era tan impredecible que representaba el 'caos' matemático.",
            "Ocurrían raras veces (a veces pasaban cientos de años antes de que el mismo lugar viera otro eclipse total).",
            "Debido a esta interrupción de las leyes naturales del cielo, los egipcios no registraban felizmente estos eventos en sus templos como hacían con las constelaciones.",
            "Los consideraban fallos en la matriz del universo que debían revertirse con fuertes rituales."
          ],
          "image": "/assets/egypt/m14_apofis.png",
          "style": "normal"
        },
        {
          "id": "egypt_m14_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "El esfuerzo por descifrar el caos de los eclipses empujó a las civilizaciones a mejorar sus matemáticas. Hoy, predecir el paso de cuerpos espaciales oscuros es vital para nuestra supervivencia.",
            "Gracias a los potentes superordenadores y a la astrofísica moderna, no solo sabemos el segundo exacto en que ocurrirá el próximo eclipse solar dentro de mil años.",
            "También utilizamos esa misma matemática predictiva para rastrear asteroides reales y asegurarnos de que ninguna roca espacial golpee la Tierra.",
            "De hecho, uno de los asteroides cercanos a la Tierra fue nombrado Apophis en honor a ese mismo mito del caos espacial."
          ],
          "image": "/assets/egypt/m14_apofis.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Pinch, G. (2002). Egyptian Mythology: A Guide to the Gods, Goddesses, and Traditions of Ancient Egypt. Oxford University Press."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué criatura mitológica creían los egipcios que causaba un eclipse solar?",
        "options": [
          "Un dragón de fuego.",
          "Apofis, una serpiente monstruosa gigante de oscuridad.",
          "Un escarabajo gigante."
        ],
        "a": 1
      },
      {
        "q": "¿Qué uso tecnológico moderno se le da a la matemática que desarrollamos para entender los eclipses?",
        "options": [
          "Para crear nuevos colores de pintura.",
          "Para predecir trayectorias de asteroides reales (como el asteroide Apophis) y evitar impactos en la Tierra.",
          "Para diseñar videojuegos de serpientes."
        ],
        "a": 1
      }
    ]
  },
  {
    "id": "egypt_m15",
    "order": 114,
    "titleEn": "Satellite Archaeology and the Eye in Space",
    "titleEs": "Arqueología Satelital y el Ojo en el Espacio",
    "badge": "Space Archaeologist",
    "badgeEs": "Arqueólogo Espacial",
    "color": "#64B5F6",
    "contentEs": {
      "sections": [
        {
          "id": "egypt_m15_sec_1",
          "title": "El Descubrimiento",
          "text": [
            "Podrías pensar que después de cientos de años excavando en la arena, ya hemos encontrado todos los templos y pirámides de Egipto. ¡Pero la realidad es que apenas hemos rascado la superficie!",
            "El desierto es inmenso y las tormentas de arena han ocultado ciudades enteras, mapas estelares y alineaciones astronómicas gigantes bajo toneladas de dunas.",
            "Para encontrar estos tesoros ocultos de la ciencia antigua hoy en día no usamos picos ni palas, sino 'ojos' robóticos que orbitan a cientos de kilómetros de altura en el espacio frío y oscuro.",
            "Nos hemos convertido en exploradores espaciales de nuestro propio pasado."
          ],
          "image": "/assets/egypt/m15_satelite.png",
          "style": "highlight"
        },
        {
          "id": "egypt_m15_sec_2",
          "title": "La Ciencia del Horizonte",
          "text": [
            "Los arqueólogos modernos se han aliado con los ingenieros aeroespaciales para utilizar la detección remota.",
            "Satélites equipados con sensores infrarrojos de alta resolución y tecnología LiDAR escanean el desierto desde el espacio exterior.",
            "Estos sensores pueden 'ver' a través de la arena superficial y detectar los sutiles cambios químicos y de temperatura que la antigua piedra caliza produce bajo el suelo.",
            "Las computadoras toman esos datos invisibles y dibujan mapas 3D perfectos de pirámides invisibles y calles perdidas."
          ],
          "image": "/assets/egypt/m15_satelite.png",
          "style": "normal"
        },
        {
          "id": "egypt_m15_sec_3",
          "title": "El Enlace Tecnológico",
          "text": [
            "Esta es la frontera más emocionante de la ciencia. La tecnología satelital que descubre templos egipcios hundidos bajo la arena es exactamente el mismo escáner láser LiDAR que utilizan los vehículos autónomos para conducir sin chocar.",
            "También es el que los exploradores marcianos usan para mapear el terreno rojo.",
            "Al conectar las herramientas del futuro con los misterios del pasado, los arqueólogos hoy trabajan como verdaderos detectives tecnológicos.",
            "Nos demuestran que el código estelar de Egipto seguirá revelando sus secretos a las nuevas generaciones de exploradores."
          ],
          "image": "/assets/egypt/m15_satelite.png",
          "style": "highlight"
        }
      ],
      "bibliography": [
        "Parcak, S. (2019). Archaeology from Space: How the Future Shapes Our Past. Henry Holt and Co."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué tecnología espacial utilizan hoy los arqueólogos para encontrar pirámides y templos bajo la arena?",
        "options": [
          "Imanes gigantes en helicópteros.",
          "Satélites con tecnología LiDAR y sensores infrarrojos.",
          "Perros entrenados y brújulas."
        ],
        "a": 1
      },
      {
        "q": "¿Qué otra tecnología moderna utiliza el mismo tipo de escáner LiDAR que los arqueólogos satelitales?",
        "options": [
          "Los vehículos autónomos (coches que se conducen solos) y exploradores en Marte.",
          "Los hornos de microondas.",
          "Los relojes de pulsera."
        ],
        "a": 0
      }
    ]
  }
];

// Append to courseData.js safely
try {
  const filePath = path.join(__dirname, 'lib', 'courseData.js');
  let dataStr = fs.readFileSync(filePath, 'utf8');

  // Parse existing data
  const arrayStart = dataStr.indexOf('export const COURSE_DATA = [');
  const jsonStr = dataStr.substring(arrayStart + 27, dataStr.lastIndexOf('];') + 1);
  const existingData = JSON.parse(jsonStr);

  // Merge avoiding duplicates
  const newIds = egyptModules.map(m => m.id);
  const filteredData = existingData.filter(m => !newIds.includes(m.id));
  const finalData = [...filteredData, ...egyptModules];

  // Write back
  const newFileContent = "// Archivo maestro estático del curso\nexport const COURSE_DATA = " + JSON.stringify(finalData, null, 2) + ";\n";

  fs.writeFileSync(filePath, newFileContent, 'utf8');
  console.log('Successfully added Egyptian Archaeoastronomy modules to courseData.js');
} catch(err) {
  console.error('Error updating courseData.js', err);
}
