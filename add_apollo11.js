const fs = require('fs');

const apolloData = [
  {
    id: "apollo11_m1",
    order: 3001,
    titleEn: "The Saturn V Rocket",
    titleEs: "El Cohete Saturn V",
    badge: "Rocket Engineer",
    badgeEs: "Ingeniero de Cohetes",
    badgeIcon: "/assets/apollo11/m1_launch.png",
    color: "#FF6B35",
    icon: "/assets/apollo11/m1_launch.png",
    contentEs: {
      sections: [
        {
          id: "apollo11_m1_merged",
          title: "El Cohete Saturn V",
          text: [
            "¡Atención cadete! Prepárate para conocer a la máquina voladora más grande y ruidosa que el ser humano ha construido jamás.",
            "En la década de 1960, el presidente de Estados Unidos prometió que llevarían a un hombre a la Luna antes de que terminara la década.",
            "Para lograr esa hazaña imposible, la NASA necesitaba construir un cohete que no fuera solo grande, sino monstruosamente gigante.",
            "Así nació el majestuoso Saturn V, un titán de metal que medía 110 metros de altura. ¡Eso es más alto que la Estatua de la Libertad!",
            "Cuando esta bestia estaba completamente llena de combustible especial, pesaba casi tres millones de kilogramos. ¡Como una manada de mil elefantes!",
            "El Saturn V estaba dividido en tres grandes partes o 'fases', que se iban soltando y cayendo a medida que el cohete subía al espacio.",
            "En la base del cohete estaban los cinco motores F-1, los motores de un solo inyector más potentes jamás creados por la humanidad.",
            "Cuando se encendían en la plataforma de lanzamiento, el ruido era tan increíblemente fuerte que podía derretir el concreto y romper ventanas a kilómetros de distancia.",
            "En cuestión de dos minutos y medio, la primera fase quemaba todo su combustible y empujaba a los astronautas a una velocidad vertiginosa.",
            "La aceleración era tan brutal que los astronautas sentían como si cuatro personas estuvieran sentadas encima de su pecho, sin poder respirar bien.",
            "Después de soltar la primera fase, se encendían los motores de la segunda, llevando la nave hasta el borde negro del inmenso espacio exterior.",
            "Finalmente, la tercera fase era la encargada de dar el último empujón mágico para sacar a la nave de la órbita de la Tierra y enviarla hacia la Luna.",
            "Todo el cohete estaba lleno de millones de piezas individuales, cables, válvulas y computadoras que tenían que funcionar a la perfección sin ningún error.",
            "El cerebro del Saturn V era un anillo computarizado llamado Unidad de Instrumentos, que guiaba la nave a través del cielo sin perderse un milímetro.",
            "Lo más asombroso de todo es que el Saturn V nunca falló en vuelo; lanzó con éxito todas las misiones Apollo sin perder a ningún astronauta en el espacio.",
            "Este cohete gastaba toneladas de combustible cada segundo, demostrando que para salir de la gravedad de la Tierra se necesita pura fuerza explosiva.",
            "Los ingenieros liderados por Wernher von Braun trabajaron día y noche resolviendo problemas matemáticos imposibles con reglas de cálculo y lápices.",
            "Al ver el despegue, la Tierra entera se sacudía, y el cielo se iluminaba de naranja brillante como si un nuevo sol hubiera nacido en Florida.",
            "El Saturn V no solo era un vehículo de transporte; era el pasaporte de fuego que nos permitió abandonar nuestro planeta natal por primera vez.",
            "Hoy en día puedes ver estos cohetes gigantes descansando en museos, recordándonos que con ciencia e ingenio, hasta las estrellas están a nuestro alcance."
          ],
          image: "/assets/apollo11/m1_launch.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      {
        q: "¿Qué altura aproximada tenía el cohete Saturn V?",
        options: ["20 metros", "110 metros", "500 metros", "1 kilómetro"],
        a: 1
      },
      {
        q: "¿En cuántas fases o etapas estaba dividido el cohete principal?",
        options: ["Una", "Tres", "Cinco", "Diez"],
        a: 1
      },
      {
        q: "¿Cómo se llamaban los potentes motores de la base del cohete?",
        options: ["Motores F-1", "Turbo Boost", "Hélice Lunar", "Motores X-Wing"],
        a: 0
      },
      {
        q: "¿Quién lideró al equipo de ingenieros que diseñó este mega cohete?",
        options: ["Albert Einstein", "Wernher von Braun", "Isaac Newton", "Galileo Galilei"],
        a: 1
      },
      {
        q: "¿Cuántas veces falló catastróficamente el Saturn V durante sus misiones en el espacio?",
        options: ["Nunca, tuvo un récord perfecto", "En todas las misiones", "Solo una vez", "Cinco veces"],
        a: 0
      }
    ]
  },
  {
    id: "apollo11_m2",
    order: 3002,
    titleEn: "Journey to the Moon",
    titleEs: "Rumbo a la Luna",
    badge: "Orbital Navigator",
    badgeEs: "Navegante Orbital",
    badgeIcon: "/assets/apollo11/m2_trajectory.png",
    color: "#00C2FF",
    icon: "/assets/apollo11/m2_trajectory.png",
    contentEs: {
      sections: [
        {
          id: "apollo11_m2_merged",
          title: "Rumbo a la Luna",
          text: [
            "¡Gravedad cero alcanzada, tripulación! Una vez en el frío y negro espacio, la verdadera aventura hacia lo desconocido acababa de empezar.",
            "Neil Armstrong, Buzz Aldrin y Michael Collins viajaban apretados en una pequeña cápsula llamada el Módulo de Mando, bautizado como 'Columbia'.",
            "Viajar a la Luna no es como manejar en una carretera recta; no puedes simplemente apuntar hacia donde la ves en el cielo e ir para allá.",
            "Como la Luna está girando alrededor de la Tierra, los astronautas tenían que apuntar hacia donde la Luna iba a estar días en el futuro.",
            "A esta complicada maniobra matemática espacial se le conoce como 'Inyección Trans-Lunar' o TLI por sus siglas en inglés.",
            "Viajaban a la alucinante velocidad de casi 40,000 kilómetros por hora, la velocidad más rápida a la que ningún ser humano había viajado jamás.",
            "A esa velocidad, el inmenso viaje de casi 400,000 kilómetros hasta la Luna les tomaría aproximadamente unos tres días enteros.",
            "Durante el viaje, la Tierra se iba haciendo más y más pequeña a través de sus pequeñas ventanas, hasta verse como una frágil canica azul brillante.",
            "En el camino, los astronautas tenían que realizar una peligrosa maniobra: debían girar su nave para acoplarse con el Módulo Lunar.",
            "El Módulo Lunar, apodado 'Eagle' (Águila), estaba guardado detrás de ellos en otra parte del cohete, como si fuera una preciosa joya de oro.",
            "Collins tuvo que pilotar la nave y engancharla suavemente con el Águila en medio de la oscuridad del espacio, sin espacio para ningún error.",
            "Durante esos tres días, vivían flotando en la ingravidez, comiendo comida deshidratada en bolsas de plástico y hablando por radio con Houston.",
            "Tenían que hacer girar la nave lentamente todo el tiempo, como si fuera un pollo asándose, para evitar que un lado se congelara y el otro se quemara por el Sol.",
            "Este truco técnico se llamaba Control Térmico Pasivo, pero los astronautas, con mucho humor, le decían simplemente 'el modo barbacoa'.",
            "La computadora de a bordo, la Apollo Guidance Computer, era menos potente que un teléfono celular moderno, pero hizo los cálculos matemáticos perfectos.",
            "A medida que se acercaban, la gravedad de la Luna empezó a atraparlos suavemente y a tirar de ellos hacia su superficie llena de inmensos cráteres.",
            "Tuvieron que encender sus motores una vez más para frenar, o si no, pasarían de largo y se perderían para siempre en el espacio infinito.",
            "Al entrar en la órbita de la Luna, desaparecieron detrás de ella y perdieron toda comunicación por radio con la Tierra durante 45 aterradores minutos.",
            "Cuando finalmente volvieron a tener señal, Houston respiró de alivio: los tres astronautas estaban orbitando la Luna con total seguridad.",
            "El escenario estaba listo. El viaje por el gran océano oscuro del espacio había terminado, pero el momento histórico apenas estaba por comenzar."
          ],
          image: "/assets/apollo11/m2_trajectory.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      {
        q: "¿Cómo se llamaba la maniobra para salir de la órbita terrestre y viajar hacia la Luna?",
        options: ["Salto Hiperespacial", "Inyección Trans-Lunar (TLI)", "Caída Libre", "Turbo Lunar"],
        a: 1
      },
      {
        q: "¿Cuánto tiempo duró aproximadamente el viaje desde la Tierra a la Luna?",
        options: ["Una hora", "Tres días", "Un mes", "Un año"],
        a: 1
      },
      {
        q: "¿Por qué giraban la nave lentamente durante el viaje (el 'modo barbacoa')?",
        options: ["Para regular la temperatura por el calor del Sol", "Para poder dormir mejor", "Para crear gravedad artificial", "Para esquivar asteroides"],
        a: 0
      },
      {
        q: "¿Qué le pasaba a la nave cuando pasaba por detrás de la Luna?",
        options: ["Se apagaban las luces", "Perdían la comunicación por radio con la Tierra", "Se congelaba por completo", "Chocaba con satélites"],
        a: 1
      },
      {
        q: "¿Cómo se llamaba el Módulo Lunar que usarían para aterrizar?",
        options: ["Halcón Milenario", "Eagle (Águila)", "Apolo", "Columbia"],
        a: 1
      }
    ]
  },
  {
    id: "apollo11_m3",
    order: 3003,
    titleEn: "Descent of the Eagle",
    titleEs: "Descenso del Águila",
    badge: "Lunar Pilot",
    badgeEs: "Piloto Lunar",
    badgeIcon: "/assets/apollo11/m3_eagle.png",
    color: "#C0E8FF",
    icon: "/assets/apollo11/m3_eagle.png",
    contentEs: {
      sections: [
        {
          id: "apollo11_m3_merged",
          title: "Descenso del Águila",
          text: [
            "¡Alarmas sonando! La tensión está al máximo. Neil y Buzz se han metido en el pequeño Módulo Lunar 'Águila' para iniciar el descenso final.",
            "Michael Collins se quedó solo arriba, orbitando y cuidando la nave principal Columbia, esperando como el guardián más solitario del universo.",
            "El Águila comenzó a bajar hacia la superficie gris de la Luna usando su potente motor de descenso para frenar la caída en el vacío absoluto.",
            "De repente, a pocos minutos del aterrizaje, las computadoras de a bordo empezaron a brillar con alertas amarillas y alarmas de error: los códigos '1202' y '1201'.",
            "La computadora estaba sobrecargada recibiendo demasiada información del radar y amenazaba con reiniciar el sistema en el peor momento posible.",
            "Afortunadamente, los ingenieros en la Tierra en Misión Control en Houston gritaron '¡Adelante!' porque sabían que la computadora no iba a fallar del todo.",
            "Pero ahí no terminaron los problemas. Neil Armstrong miró por su pequeña ventana triangular y vio un desastre mortal.",
            "El piloto automático estaba llevando al Águila directamente hacia un enorme cráter del tamaño de un estadio de fútbol, lleno de enormes rocas del tamaño de automóviles.",
            "Si aterrizaban sobre esas enormes rocas, la nave se volcaría, se destruiría y quedarían atrapados en la Luna para siempre sin rescate posible.",
            "Con nervios de acero, el comandante Armstrong tomó el control manual de la frágil nave, volando como un helicóptero sobre el peligroso campo de rocas.",
            "El combustible se estaba acabando a una velocidad aterradora. En el panel, una luz indicaba que les quedaban menos de 60 segundos de combustible antes de caer.",
            "Misión Control estaba en silencio absoluto; el mundo entero contenía la respiración mientras escuchaban la estática de la radio desde el espacio.",
            "Buzz Aldrin iba gritando los números de altitud y velocidad: 'Treinta pies, bajando a dos y medio... levantando un poco de polvo'.",
            "El potente motor de la nave empezó a soplar la fina capa de polvo lunar, creando una neblina que hacía muy difícil ver la superficie real.",
            "Justo cuando solo les quedaban entre 15 y 20 segundos de combustible vital, unas varillas en las patas del Águila tocaron el suelo firme.",
            "Una luz azul en el panel se encendió indicando 'Contacto'. Armstrong apagó el motor inmediatamente para no causar una explosión en la superficie.",
            "El 20 de julio de 1969, a las 20:17 UTC, el Módulo Lunar se posó suavemente sobre el Mar de la Tranquilidad.",
            "Armstrong tomó el micrófono de radio y, con voz calmada, dijo las famosas palabras a la Tierra: 'Houston, aquí Base Tranquilidad. El Águila ha aterrizado'.",
            "En la sala de control de Houston, los ingenieros saltaron de sus sillas, gritando y aplaudiendo; algunos confesaron que estaban a punto de desmayarse.",
            "Habían logrado lo imposible: aterrizar una nave construida por humanos en otro cuerpo celeste, esquivando rocas, alarmas y casi sin combustible."
          ],
          image: "/assets/apollo11/m3_eagle.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      {
        q: "¿Quién se quedó orbitando la Luna en la nave principal mientras sus compañeros bajaban?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins", "Yuri Gagarin"],
        a: 2
      },
      {
        q: "¿Por qué sonaron las famosas alarmas '1202' y '1201' durante el descenso?",
        options: ["Se había roto una ventana", "La computadora estaba sobrecargada de datos", "Había un incendio", "Se quedaron sin oxígeno"],
        a: 1
      },
      {
        q: "¿Por qué Neil Armstrong tuvo que tomar el control manual del Águila?",
        options: ["Porque la computadora se apagó sola", "Porque iban hacia un cráter lleno de rocas gigantes", "Porque querían aterrizar más cerca del sol", "Porque Buzz Aldrin se equivocó de botón"],
        a: 1
      },
      {
        q: "¿Cuánto tiempo aproximado de combustible les quedaba cuando aterrizaron?",
        options: ["Una hora", "Menos de 60 segundos", "Cinco minutos", "Tres días"],
        a: 1
      },
      {
        q: "¿Cuál fue la primera frase famosa que dijo Armstrong al tocar suelo lunar?",
        options: ["¡Qué gran salto!", "¡Houston, tenemos un problema!", "El Águila ha aterrizado", "Hemos llegado a Marte"],
        a: 2
      }
    ]
  },
  {
    id: "apollo11_m4",
    order: 3004,
    titleEn: "The First Step",
    titleEs: "El Primer Paso",
    badge: "Moonwalker",
    badgeEs: "Caminante Lunar",
    badgeIcon: "/assets/apollo11/m4_moonwalk.png",
    color: "#F5D020",
    icon: "/assets/apollo11/m4_moonwalk.png",
    contentEs: {
      sections: [
        {
          id: "apollo11_m4_merged",
          title: "El Primer Paso",
          text: [
            "¡Historia en proceso, explorador! Después del tenso aterrizaje, los astronautas tuvieron que prepararse meticulosamente para salir al exterior.",
            "Pasaron horas revisando cada milímetro de sus enormes y pesados trajes espaciales blancos; un pequeño agujero podría ser fatal en el vacío.",
            "Sus mochilas, llamadas PLSS, eran como pequeñas naves espaciales personales que les daban oxígeno, enfriamiento y energía para sobrevivir.",
            "Finalmente, la escotilla del Águila se abrió. Neil Armstrong salió primero, bajando lentamente hacia atrás por los peldaños de la escalerilla dorada.",
            "Al pie de la escalera, tiró de un cable que abrió una cámara de televisión externa; de repente, más de 600 millones de personas en la Tierra lo estaban viendo en blanco y negro.",
            "Con su pie izquierdo en el aire, dudó un segundo y luego posó su bota gris sobre el fino polvo virgen de la superficie de la Luna.",
            "En ese mágico momento inmortal, pronunció la frase que pasaría a la historia: 'Es un pequeño paso para el hombre, un gran salto para la humanidad'.",
            "Describió que la superficie lunar era como carbón en polvo muy, muy fino, que se pegaba fácilmente a las suelas de sus botas espaciales.",
            "Unos minutos después, Buzz Aldrin salió y se unió a él, mirando el paisaje vacío y oscuro, y lo describió con la poética frase de 'Magnífica Desolación'.",
            "Al caminar, notaron que la gravedad en la Luna es seis veces menor que en la Tierra, por lo que se movían dando extraños saltitos como canguros.",
            "Su primera tarea importante fue recoger rápidamente muestras del suelo y rocas y guardarlas en sus bolsillos, por si tenían que escapar de emergencia.",
            "Después, comenzaron a instalar experimentos científicos avanzados, como un sismómetro mágico para medir los temblores en el suelo llamados 'lunomotos'.",
            "También colocaron un reflector láser especial lleno de espejos de cristal. ¡Hoy los científicos en la Tierra aún le disparan láseres a ese reflector para medir la distancia a la Luna!",
            "Desplegaron la famosa bandera de Estados Unidos; como no hay viento en el espacio, la bandera tenía un alambre duro arriba para que pareciera que estaba ondeando.",
            "Las huellas que dejaron en el polvo no han sido borradas y probablemente seguirán ahí por millones de años, ¡porque en la Luna no hay viento ni lluvia para lavarlas!",
            "Saltaron, tomaron cientos de fotografías icónicas y recogieron más de 21 kilogramos de rocas alienígenas para llevarlas a los laboratorios de la Tierra.",
            "En total, su caminata en el misterioso mundo extraterrestre duró unas cortas pero intensas dos horas y media de puro trabajo científico.",
            "Antes de volver adentro, dejaron atrás una placa pegada a la pata del Módulo Lunar con un hermoso mensaje de paz para todo el universo.",
            "La placa decía: 'Aquí hombres del planeta Tierra pisaron la Luna por primera vez. Vinimos en paz en nombre de toda la humanidad'.",
            "Con el traje lleno de polvo lunar gris, entraron al módulo y cerraron la puerta, sellando el capítulo más heroico y audaz de la historia humana."
          ],
          image: "/assets/apollo11/m4_moonwalk.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      {
        q: "¿Qué frase célebre dijo Neil Armstrong al pisar la Luna?",
        options: ["Llegamos en paz", "Un gran salto para la humanidad", "Es hora de explorar", "Qué magnífica desolación"],
        a: 1
      },
      {
        q: "¿Por qué la bandera parecía ondear si en la Luna no hay viento?",
        options: ["Porque había viento solar fuerte", "Porque tenía un alambre horizontal que la mantenía extendida", "Porque la estaban sacudiendo", "Por la gravedad magnética"],
        a: 1
      },
      {
        q: "¿Cómo describió Buzz Aldrin el paisaje lunar?",
        options: ["Una gran roca brillante", "Un paraíso estrellado", "Magnífica desolación", "Desierto de sal"],
        a: 2
      },
      {
        q: "¿Por qué las huellas de los astronautas durarán millones de años en la Luna?",
        options: ["Porque la arena lunar tiene pegamento", "Porque los astronautas usaban botas de metal pesado", "Porque no hay clima, viento ni lluvia que las borre", "Porque las pintaron de blanco"],
        a: 2
      },
      {
        q: "¿Qué dejaron en la pata del Módulo Lunar antes de irse?",
        options: ["Un tesoro escondido", "Una placa con un mensaje de paz", "Las llaves del cohete", "Un pedazo de queso"],
        a: 1
      }
    ]
  },
  {
    id: "apollo11_m5",
    order: 3005,
    titleEn: "Return to Orbit",
    titleEs: "Regreso a Órbita",
    badge: "Liftoff Commander",
    badgeEs: "Comandante de Ascenso",
    badgeIcon: "/assets/apollo11/m5_ascent.png",
    color: "#A8FF78",
    icon: "/assets/apollo11/m5_ascent.png",
    contentEs: {
      sections: [
        {
          id: "apollo11_m5_merged",
          title: "Regreso a Órbita",
          text: [
            "¡Atención cadetes, el trabajo aún no termina! Ahora viene la parte que ponía más nerviosos a todos los ingenieros en el planeta Tierra.",
            "Para regresar a casa, Neil y Buzz tenían que usar la parte superior del Águila, llamada Etapa de Ascenso, como una mini nave espacial.",
            "Debían encender el único motor de ascenso y abandonar la plataforma inferior del módulo, dejándola para siempre en la superficie lunar.",
            "El verdadero terror era que este pequeño motor nunca había sido probado en fuego real en el espacio y no había motor de repuesto.",
            "Si este frágil motor se apagaba o no encendía, los dos astronautas estarían irremediablemente atrapados en la Luna, sin ninguna posibilidad de rescate.",
            "Para colmo de males, cuando regresaron a la nave después de caminar, descubrieron que con sus pesadas mochilas habían roto accidentalmente un botón vital.",
            "¡Eran nada más y nada menos que el interruptor que activaba el encendido del motor de escape! La nave no podía arrancar.",
            "Con un ingenio digno del mejor campamento espacial, Buzz Aldrin usó la punta de plástico de un bolígrafo para empujar el interruptor roto.",
            "¡El truco del bolígrafo funcionó a la perfección! Con una explosión silenciosa de fuego sin oxígeno, la cápsula saltó de la Luna hacia el espacio.",
            "Las cámaras robóticas de televisión lograron grabar cómo el polvo salía volando y la plataforma dorada se quedaba sola en la superficie.",
            "Ahora empezaba el intenso juego espacial de las atrapadas. Tenían que volar su pequeña cápsula para encontrarse con Michael Collins, quien los esperaba arriba.",
            "Collins había pasado un día entero dando vueltas a la Luna, siendo el humano más aislado y solitario en la historia de nuestro sistema solar.",
            "Cuando Collins por fin vio al Águila acercarse flotando entre el paisaje de cráteres grises, sintió el alivio más grande de toda su vida.",
            "Pilotando suavemente con la precisión de un neurocirujano, engancharon ambas naves espaciales de nuevo con un sonoro 'clac' metálico.",
            "Una vez sellados los tubos, abrieron la escotilla y los tres valientes amigos se abrazaron con una sonrisa que no cabía en el espacio.",
            "Trasladaron rápidamente las pesadas cajas con las valiosas rocas lunares y la película de fotografías a salvo al interior del Columbia.",
            "Luego, cerraron la puerta del Águila y la soltaron de regreso al frío espacio, dejándola caer más tarde y estrellarse sola contra la Luna.",
            "El último gran reto matemático de la misión estaba por suceder. Tenían que encender el motor principal de la nave detrás del oscuro lado de la Luna.",
            "Este empuje final, llamado Inyección Trans-Tierra, era para sacarlos de la gravedad de la Luna y lanzarlos en un viaje largo hacia su querido planeta azul.",
            "Cuando volvieron a comunicarse por radio desde el otro lado, Misión Control sabía que el motor había funcionado; ¡los héroes volaban de regreso a casa!"
          ],
          image: "/assets/apollo11/m5_ascent.png",
          style: "highlight"
        }
      ]
    },
    quizEs: [
      {
        q: "¿Qué parte del Módulo Lunar usaron para regresar a órbita?",
        options: ["La Etapa de Ascenso", "El radar inferior", "Un globo aerostático lunar", "La plataforma con las patas"],
        a: 0
      },
      {
        q: "¿Cuál era el mayor miedo respecto al motor de ascenso?",
        options: ["Que hiciera mucho ruido", "Que no encendiera, dejándolos atrapados para siempre en la Luna", "Que consumiera mucha agua", "Que volara hacia el Sol"],
        a: 1
      },
      {
        q: "¿Con qué objeto ingenioso activó Buzz Aldrin el interruptor del motor roto?",
        options: ["Con una llave de tuercas", "Con un destornillador sónico", "Con la punta plástica de un bolígrafo", "Con una roca lunar"],
        a: 2
      },
      {
        q: "¿Quién estaba esperando en la nave principal orbitando la Luna?",
        options: ["Snoopy", "Michael Collins", "Neil Armstrong", "Gene Kranz"],
        a: 1
      },
      {
        q: "¿Qué pasó con el Módulo Lunar 'Águila' después de que se reunieron en la nave principal?",
        options: ["Lo llevaron a la Tierra para un museo", "Se lo vendieron a los marcianos", "Lo soltaron y dejaron caer para estrellarse en la Luna", "Lo usaron como antena extra"],
        a: 2
      }
    ]
  },
  {
    id: "apollo11_m6",
    order: 3006,
    titleEn: "Splashdown and Triumph",
    titleEs: "Amerizaje y Triunfo",
    badge: "Earth Hero",
    badgeEs: "Héroe de la Tierra",
    badgeIcon: "/assets/apollo11/m6_splashdown.png",
    color: "#38B6FF",
    icon: "/assets/apollo11/m6_splashdown.png",
    contentEs: {
      sections: [
        {
          id: "apollo11_m6_merged",
          title: "Amerizaje y Triunfo",
          text: [
            "¡Prepárense para el impacto, cadetes de la reentrada! Después de un viaje de regreso de tres días sin problemas, la Tierra los recibía.",
            "Sin embargo, el aterrizaje en nuestro planeta es igual de aterrador y violento que el viaje mismo. Su nave viajaba a casi 40,000 kilómetros por hora.",
            "Antes de tocar la capa de aire de la Tierra, separaron la cápsula de mando del resto del cohete, dejando que este se quemara en la atmósfera.",
            "Ahora, la cápsula Columbia tenía la forma de un cono especial diseñado para usar su grueso escudo térmico para soportar temperaturas de infierno.",
            "Al chocar contra el aire terrestre a esa velocidad brutal, la fricción calentó la nave a unos ardientes 2,700 grados centígrados.",
            "El aire a su alrededor se convirtió en plasma brillante y chispeante, bloqueando todas las comunicaciones por radio por varios y eternos minutos.",
            "Si el ángulo de entrada hubiera sido un milímetro muy empinado, se habrían quemado como un meteorito fugaz en el cielo oscuro.",
            "Si el ángulo hubiera sido muy plano, habrían rebotado contra la atmósfera como una piedra en un lago, perdiéndose en el espacio profundo.",
            "Pero la computadora hizo los cálculos perfectos, y cuando el fuego desapareció, tres paracaídas gigantes de color naranja y blanco se abrieron de golpe.",
            "La cápsula descendió flotando graciosamente hasta estrellarse contra las tranquilas olas azules del gigantesco Océano Pacífico.",
            "¡Chapuzón! El 24 de julio de 1969, la misión de ir a la Luna y volver vivos a la Tierra había sido finalmente cumplida.",
            "Buzos del poderoso barco militar USS Hornet saltaron en helicópteros para rescatar a la cápsula que se balanceaba sobre el mar salado.",
            "Pero había un detalle divertido: los buzos tuvieron que pasarles unos raros trajes especiales de aislamiento biológico para que se los pusieran.",
            "La NASA temía que los astronautas hubieran traído 'bichos espaciales' o enfermedades letales alienígenas en el polvo lunar de sus trajes.",
            "Por seguridad, los tres héroes tuvieron que vivir encerrados en un remolque especial de cuarentena durante tres largas semanas para asegurarse de que no estaban contaminados.",
            "¡Incluso el presidente de Estados Unidos tuvo que hablar con ellos a través de un pequeño vidrio como si estuvieran en un acuario!",
            "Por fin, cuando los doctores confirmaron que no había virus lunares misteriosos, salieron y el mundo entero estalló en millones de confetis y desfiles.",
            "Más de un millón de personas gritaron y aplaudieron en Nueva York y Chicago, celebrando que el gran sueño imposible por fin se había convertido en realidad.",
            "El heroico viaje del Apollo 11 demostró que no hay límites oscuros que la curiosidad y la tecnología del ser humano no puedan iluminar y conquistar.",
            "Así que, futuro explorador espacial, cuando mires la hermosa Luna brillante en la noche oscura, recuerda: ¡allá arriba está la historia de nuestro triunfo en el cosmos!"
          ],
          image: "/assets/apollo11/m6_splashdown.png",
          style: "highlight"
        }
      ]
    }
  }
];

const filePath = 'c:/Users/raesc/Desktop/Antigravity Projects/space-camp-academy/lib/courseData.js';
let content = fs.readFileSync(filePath, 'utf8');

// The file ends with "  }\n];" roughly
const appendPos = content.lastIndexOf('];');

if (appendPos !== -1) {
  const apolloString = JSON.stringify(apolloData, null, 2);
  // remove the outer brackets from the JSON string
  const dataToAppend = ',\n' + apolloString.slice(2, -2) + '\n];\n';
  
  const newContent = content.slice(0, appendPos) + dataToAppend;
  fs.writeFileSync(filePath, newContent);
  console.log('Apollo 11 course data added successfully!');
} else {
  console.error('Could not find the end of the array in courseData.js');
}
