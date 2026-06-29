// Curso: Carl Sagan — El Mensajero del Cosmos
// 6 módulos con contenido educativo en español y 3 preguntas de quiz cada uno
export const SAGAN_COURSE_DATA = [
  {
    id: 'sagan_m1',
    order: 7001,
    titleEn: 'Who Was Carl Sagan? Life and Education',
    titleEs: '¿Quién fue Carl Sagan? Vida y formación',
    badge: 'Cosmos Explorer',
    badgeEs: 'Explorador del Cosmos',
    badgeIcon: '/assets/carl_sagan/sagan_m1.png',
    color: '#1E90FF',
    icon: '/assets/carl_sagan/sagan_m1.png',
    contentEs: {
      sections: [
        {
          id: 'sagan_m1_s1',
          title: '¿Quién fue Carl Sagan? Vida y formación',
          text: [
            '¿Sabías que uno de los científicos más famosos del siglo XX creció soñando con las estrellas en un pequeño apartamento de Brooklyn, Nueva York? Carl Edward Sagan nació el 9 de noviembre de 1934 en una familia humilde pero llena de curiosidad. Desde muy pequeño, Carl miraba el cielo nocturno y se preguntaba qué eran esos puntos brillantes que titilaban sobre su cabeza. Esa fascinación lo acompañaría toda la vida y lo convertiría en el divulgador científico más importante de su época.',

            'Sus padres fueron Samuel Sagan, un trabajador de la industria textil nacido en Ucrania, y Rachel Molly Gruber, una mujer inteligente y curiosa que había crecido en Nueva York. Aunque no eran científicos, ambos fomentaron la curiosidad natural de su hijo. Su madre le hacía preguntas sobre el mundo que lo rodeaba, y su padre le enseñó que incluso las personas más sencillas podían entender las maravillas del universo. Esta lección marcó profundamente a Carl: la ciencia debía ser para todos, no solo para los expertos.',

            '¡Prepárate para un momento increíble en la vida del pequeño Carl! En 1939, cuando tenía apenas 5 años, sus padres lo llevaron a la Feria Mundial de Nueva York. Aquella exposición, con su lema "El Mundo del Mañana", exhibía maravillas tecnológicas que parecían sacadas de la ciencia ficción: televisores, robots y cápsulas del tiempo. Para un niño de cinco años, fue como visitar el futuro. Carl quedó absolutamente deslumbrado y desde ese día supo que quería dedicar su vida a explorar y comprender el universo.',

            'En la biblioteca pública de su barrio, Carl descubrió los libros que cambiarían su vida para siempre. Pidió a la bibliotecaria un libro sobre estrellas, y ella le trajo uno sobre las estrellas de Hollywood. Él le explicó que quería saber sobre las estrellas de verdad, las que brillaban en el cielo nocturno. Cuando finalmente tuvo en sus manos un libro de astronomía, se asombró al descubrir que el Sol era una estrella como las demás, pero mucho más cercana a nosotros. Ese descubrimiento encendió una chispa que jamás se apagaría.',

            'Carl fue un estudiante brillante y apasionado. Se graduó de la Rahway High School en Nueva Jersey en 1951, con solo 16 años. Su inteligencia y su entusiasmo por la ciencia eran evidentes para todos sus profesores, quienes lo animaron a seguir sus sueños. A pesar de las dificultades económicas de su familia, Carl estaba decidido a estudiar las estrellas y los planetas en la universidad, y nada lo iba a detener en su camino hacia el cosmos.',

            'Ingresó a la prestigiosa Universidad de Chicago, una de las mejores del mundo para estudiar ciencias. Allí encontró un ambiente intelectual vibrante donde podía explorar todas sus pasiones: la física, la química, la biología y, por supuesto, la astronomía. Chicago fue como un segundo hogar para Carl, un lugar donde su curiosidad era celebrada en lugar de ser vista como algo raro. Estudió con algunos de los científicos más importantes de la época y absorbió conocimientos como una esponja cósmica.',

            'En la Universidad de Chicago, Carl obtuvo no uno, sino tres títulos diferentes. Primero consiguió su licenciatura en artes liberales en 1954, luego su licenciatura en ciencias en 1955, y finalmente su maestría en física en 1956. Cada paso lo acercaba más a su sueño de comprender el cosmos. Su capacidad para combinar diferentes áreas del conocimiento era extraordinaria: entendía que para descifrar los misterios del universo se necesitaba saber de muchas cosas, no solo de una.',

            'El momento cumbre de su formación llegó en 1960, cuando Carl Sagan obtuvo su doctorado en astronomía y astrofísica, también en la Universidad de Chicago. Su tesis doctoral trataba sobre las condiciones físicas en la superficie del planeta Venus. Demostró que la altísima temperatura de Venus se debía al efecto invernadero causado por su densa atmósfera de dióxido de carbono. Esta investigación fue revolucionaria y estableció a Sagan como un científico serio y original, capaz de resolver problemas que otros no podían.',

            'Mientras estudiaba, Carl tuvo la suerte de aprender de científicos legendarios. Uno de sus mentores fue el genetista Hermann Joseph Muller, ganador del Premio Nobel, quien le enseñó sobre la biología y la vida. Otro fue Gerard Kuiper, considerado el padre de la ciencia planetaria moderna, quien le mostró cómo estudiar otros mundos. Estas influencias fueron fundamentales: Carl aprendió a pensar como biólogo y como astrónomo al mismo tiempo, lo que lo llevó a preguntarse si podría existir vida en otros planetas.',

            'Desde joven, Carl mostró un talento excepcional para comunicar ideas complejas de manera sencilla. Mientras otros científicos escribían artículos llenos de fórmulas incomprensibles, Carl podía explicar las mismas ideas usando palabras que cualquier persona entendería. Sus amigos y compañeros de universidad ya notaban esta habilidad especial: cuando Carl hablaba de las estrellas, todos querían escucharlo. Era como si pudiera traducir el lenguaje del universo al lenguaje de la gente común.',

            'Después de su doctorado, Carl comenzó a trabajar como investigador en la Universidad de California en Berkeley y luego en el Smithsonian Astrophysical Observatory en Cambridge, Massachusetts. Durante estos años, contribuyó a la investigación sobre las atmósferas de Venus y Marte, y comenzó a desarrollar sus ideas sobre la posibilidad de vida extraterrestre. Su carrera científica despegaba como un cohete, y el joven astrónomo de Brooklyn estaba listo para conquistar el mundo académico.',

            'En 1968, Carl Sagan se unió a la Universidad de Cornell en Ithaca, Nueva York, donde sería profesor durante el resto de su vida. Allí dirigió el Laboratorio de Estudios Planetarios y se convirtió en una figura central de la investigación espacial en Estados Unidos. Cornell fue el lugar perfecto para él: una universidad que valoraba tanto la investigación de vanguardia como la enseñanza y la divulgación. Desde ese lugar, Carl cambiaría para siempre la forma en que la humanidad miraba las estrellas.',

            'Carl Sagan vivió una vida intensa y apasionada, pero lamentablemente breve. Falleció el 20 de diciembre de 1996, a los 62 años, debido a una neumonía causada por complicaciones de una enfermedad llamada mielodisplasia, un trastorno de la médula ósea. Aunque su vida fue corta, su impacto fue inmenso. En solo seis décadas, logró más de lo que la mayoría de las personas logran en varias vidas: revolucionó la ciencia planetaria, inspiró a millones de personas y nos enseñó a mirar el cielo con nuevos ojos.',

            'Lo que hizo a Carl Sagan verdaderamente especial no fue solo su brillantez científica, sino su profunda creencia en que todas las personas merecían entender el universo. Él decía que vivimos en una sociedad que depende de la ciencia y la tecnología, pero donde casi nadie entiende la ciencia ni la tecnología. Esa contradicción lo motivaba cada día a salir al mundo y compartir su conocimiento. Para Carl, enseñar ciencia no era solo un trabajo: era una misión sagrada para el futuro de la humanidad.',

            '¡El viaje apenas comienza, explorador! En el próximo módulo descubrirás cómo Carl Sagan creó una serie de televisión que cambió para siempre la forma en que millones de personas en todo el mundo entendieron la ciencia y el cosmos. Una serie que se convirtió en la más vista en la historia de la televisión pública y que hizo llorar, reír y soñar a espectadores de más de 60 países. ¡Prepárate para embarcarte en el viaje más épico de la televisión científica!'
          ],
          image: '/assets/carl_sagan/sagan_m1.png',
          imgCaption: 'Carl Sagan de joven, el niño de Brooklyn que soñaba con las estrellas',
        },
      ],
    },
    quizEs: [
      { q: '¿En qué año nació Carl Sagan?', options: ['1929', '1934', '1940', '1945'], a: 1 },
      { q: '¿Qué evento de 1939 deslumbró al pequeño Carl cuando tenía 5 años?', options: ['Un eclipse solar', 'La Feria Mundial de Nueva York', 'Un lanzamiento de cohetes', 'Una exposición en un museo'], a: 1 },
      { q: '¿En qué universidad obtuvo Carl Sagan su doctorado en astronomía y astrofísica?', options: ['Harvard', 'MIT', 'Universidad de Chicago', 'Universidad de Cornell'], a: 2 },
    ],
  },
  {
    id: 'sagan_m2',
    order: 7002,
    titleEn: 'Cosmos: The Series That Changed Science Communication',
    titleEs: 'Cosmos: La serie que cambió la divulgación',
    badge: 'Stellar Communicator',
    badgeEs: 'Divulgador Estelar',
    badgeIcon: '/assets/carl_sagan/sagan_m2.png',
    color: '#4169E1',
    icon: '/assets/carl_sagan/sagan_m2.png',
    contentEs: {
      sections: [
        {
          id: 'sagan_m2_s1',
          title: 'Cosmos: La serie que cambió la divulgación',
          text: [
            '¡Imagina un programa de televisión tan poderoso que cambió la forma en que el mundo entero miraba las estrellas! En 1980, Carl Sagan presentó "Cosmos: Un Viaje Personal" (Cosmos: A Personal Voyage), una serie documental de 13 episodios que se convirtió en el programa de televisión pública más visto de la historia hasta ese momento. Fue emitida por primera vez en la cadena PBS de Estados Unidos el 28 de septiembre de 1980, y desde su primer episodio cautivó a millones de espectadores con su mezcla única de ciencia, filosofía y asombro.',

            'La serie fue co-escrita por tres personas extraordinarias: Carl Sagan, Ann Druyan y Steven Soter. Ann Druyan era una escritora brillante que se convertiría en la esposa de Sagan y en su compañera de vida y trabajo. Steven Soter era un astrofísico y escritor científico de gran talento. Juntos, los tres formaron un equipo creativo increíble que combinaba rigor científico con una narrativa emocionante y accesible. Cada episodio fue cuidadosamente elaborado para que cualquier persona, sin importar su nivel educativo, pudiera entender y disfrutar los misterios del universo.',

            '¿Sabías que Cosmos fue vista por más de 500 millones de personas en más de 60 países? Eso significa que, en su momento, una de cada nueve personas en todo el planeta Tierra había visto al menos un episodio de la serie. Fue traducida a decenas de idiomas y llegó a hogares en todos los continentes, desde pequeñas aldeas hasta grandes ciudades. Nunca antes un programa científico había alcanzado a tanta gente. Carl Sagan se convirtió de la noche a la mañana en el científico más famoso del mundo.',

            'Cada episodio de Cosmos exploraba un tema diferente con una profundidad y una belleza que dejaban sin aliento. El primer episodio, "Las Costas del Océano Cósmico", presentaba la inmensidad del universo. Otros episodios abordaban la historia de la astronomía, la vida de las estrellas, la evolución de la vida en la Tierra, los viajes espaciales y la posibilidad de civilizaciones extraterrestres. Carl guiaba a los espectadores en un viaje imaginario a bordo de la "Nave de la Imaginación", una nave espacial con la que podía viajar a cualquier rincón del cosmos.',

            'Una de las frases más famosas de toda la historia de la ciencia surgió de esta serie: "Somos polvo de estrellas" (en inglés, "We are made of star stuff"). Con esta frase, Sagan explicaba un hecho científico asombroso: los átomos que forman nuestro cuerpo —el carbono, el oxígeno, el hierro, el nitrógeno— fueron creados en el interior de estrellas que explotaron hace miles de millones de años. Literalmente, cada átomo de tu cuerpo fue forjado en el corazón de una estrella. ¡Tú eres polvo de estrellas, explorador!',

            'La serie utilizaba efectos especiales revolucionarios para su época. Aunque hoy nos pueden parecer sencillos comparados con los efectos digitales modernos, en 1980 eran impresionantes. Se crearon maquetas detalladas de planetas, galaxias y naves espaciales, y se usaron técnicas de animación que nadie había visto antes en un documental científico. La música, compuesta por Vangelis entre otros artistas, añadía una atmósfera mágica y solemne que hacía que los espectadores sintieran que realmente estaban viajando por el espacio.',

            'Carl Sagan tenía un estilo de presentación absolutamente único e inimitable. Hablaba con una combinación de pasión, asombro y ternura que era imposible de ignorar. Cuando describía las dimensiones del universo o la antigüedad de las estrellas, su voz temblaba de emoción genuina. No era un presentador que simplemente leía un guion: era un científico que realmente sentía cada palabra que decía. Su famosa forma de pronunciar "billions and billions" (miles y miles de millones) se convirtió en un sello personal reconocible en todo el mundo.',

            'Cosmos no solo hablaba de ciencia: también contaba historias humanas de científicos a lo largo de la historia. Sagan dedicó episodios completos a figuras como Eratóstenes, el bibliotecario griego que calculó la circunferencia de la Tierra hace más de 2,000 años; Johannes Kepler, quien descubrió las leyes del movimiento planetario; y muchos otros pensadores que se atrevieron a cuestionar las ideas establecidas. Carl quería mostrar que la ciencia es una aventura humana, llena de luchas, fracasos y triunfos.',

            'Uno de los aspectos más valientes de Cosmos fue su defensa del pensamiento crítico y del escepticismo científico. Sagan dedicó segmentos importantes a explicar por qué la astrología, los ovnis y otras pseudociencias no tenían base real. Pero lo hacía con respeto y amabilidad, explicando que la curiosidad que llevaba a la gente a creer en estas cosas era la misma curiosidad que impulsaba a la ciencia. La diferencia estaba en el método: la ciencia exige pruebas, evidencias y la disposición a cambiar de opinión cuando los datos lo requieren.',

            'La serie también abordó temas que iban mucho más allá de la astronomía. Sagan habló sobre el peligro de la guerra nuclear, la destrucción del medio ambiente y la responsabilidad de la humanidad de cuidar su planeta. En el episodio "¿Quién habla en nombre de la Tierra?", hizo un llamado apasionado a la paz y a la cooperación internacional. Para Carl, entender el cosmos significaba entender nuestro lugar en él y asumir la responsabilidad de proteger nuestro frágil hogar: la Tierra.',

            'El impacto de Cosmos en la cultura popular fue extraordinario. Inspiró a toda una generación de científicos, ingenieros, maestros y exploradores. Muchísimos astrónomos, astronautas y divulgadores científicos que trabajan hoy en día citan a Cosmos como la razón por la que eligieron dedicarse a la ciencia. La serie demostró que un programa de televisión podía ser al mismo tiempo profundamente educativo y tremendamente entretenido, rompiendo la idea de que la ciencia era aburrida o incomprensible.',

            'Cosmos fue galardonada con los premios Emmy y Peabody, dos de los reconocimientos más prestigiosos de la televisión estadounidense. Además, el libro que Sagan escribió como acompañamiento de la serie, también titulado "Cosmos", se convirtió en uno de los libros de ciencia más vendidos de todos los tiempos, permaneciendo en la lista de bestsellers del New York Times durante 70 semanas. El libro fue publicado en 1980 y ha sido traducido a más de 40 idiomas, llegando a lectores de todo el mundo.',

            'El legado de Cosmos fue tan duradero que, en 2014, se produjo una secuela titulada "Cosmos: Una Odisea del Espacio-Tiempo" (Cosmos: A Spacetime Odyssey), presentada por Neil deGrasse Tyson, un astrofísico que de joven fue inspirado personalmente por Carl Sagan. La nueva serie fue producida por Ann Druyan y mantuvo el espíritu original mientras actualizaba la ciencia y los efectos visuales para una nueva generación. En 2020 se estrenó una tercera temporada, "Cosmos: Mundos Posibles", demostrando que el legado de Sagan seguía vivo.',

            'Lo que hizo a Cosmos verdaderamente revolucionaria no fueron los efectos especiales ni los premios: fue la filosofía que la sustentaba. Carl Sagan creía profundamente que la ciencia era una herramienta de liberación, una forma de empoderar a las personas para que pensaran por sí mismas y no fueran engañadas. "La ciencia es más que un cuerpo de conocimientos", decía. "Es una forma de pensar". Cosmos enseñó a millones de personas no solo datos sobre el universo, sino a pensar de manera científica, a hacer preguntas y a buscar respuestas con evidencia.',

            '¡Pero el viaje de Carl Sagan no se detuvo en la televisión, explorador! En el próximo módulo descubrirás una de las fotografías más famosas y emotivas de la historia de la humanidad: el Pálido Punto Azul. Fue tomada desde una nave espacial que Carl ayudó a enviar a los confines del Sistema Solar, y la reflexión que Sagan hizo sobre esa imagen ha conmovido a millones de personas en todo el mundo. ¡Prepárate para ver la Tierra como nunca antes la habías imaginado!'
          ],
          image: '/assets/carl_sagan/sagan_m2.png',
          imgCaption: 'Carl Sagan en el set de Cosmos, la serie que transformó la divulgación científica',
        },
      ],
    },
    quizEs: [
      { q: '¿Cuántos episodios tenía la serie original de Cosmos?', options: ['8', '10', '13', '20'], a: 2 },
      { q: '¿Aproximadamente cuántas personas vieron Cosmos en todo el mundo?', options: ['50 millones', '100 millones', '500 millones', '1,000 millones'], a: 2 },
      { q: '¿Quiénes co-escribieron Cosmos junto con Carl Sagan?', options: ['Neil Tyson y Bill Nye', 'Ann Druyan y Steven Soter', 'Stephen Hawking y Isaac Asimov', 'Arthur C. Clarke y Ray Bradbury'], a: 1 },
    ],
  },
  {
    id: 'sagan_m3',
    order: 7003,
    titleEn: 'The Pale Blue Dot and the Voyager Missions',
    titleEs: 'El Pálido Punto Azul y las misiones Voyager',
    badge: 'Blue Dot Guardian',
    badgeEs: 'Guardián del Punto Azul',
    badgeIcon: '/assets/carl_sagan/sagan_m3.png',
    color: '#00CED1',
    icon: '/assets/carl_sagan/sagan_m3.png',
    contentEs: {
      sections: [
        {
          id: 'sagan_m3_s1',
          title: 'El Pálido Punto Azul y las misiones Voyager',
          text: [
            '¡Prepárate para conocer la historia de las naves espaciales más viajeras de la historia humana! En 1977, la NASA lanzó dos sondas espaciales que cambiarían para siempre nuestra comprensión del Sistema Solar: Voyager 1 y Voyager 2. Voyager 2 fue lanzada primero, el 20 de agosto de 1977, y Voyager 1 despegó poco después, el 5 de septiembre de 1977. A pesar de salir después, Voyager 1 viajaba por una trayectoria más rápida y pronto adelantó a su hermana gemela. Carl Sagan fue una de las figuras clave en la planificación científica de estas misiones legendarias.',

            'Las sondas Voyager aprovecharon una alineación especial de los planetas exteriores que solo ocurre una vez cada 176 años. Esta configuración permitía que una sola nave visitara Júpiter, Saturno, Urano y Neptuno usando la gravedad de cada planeta como una honda cósmica para impulsarse hacia el siguiente. Voyager 1 visitó Júpiter y Saturno, mientras que Voyager 2 hizo el gran recorrido completo por los cuatro gigantes gaseosos. Las imágenes que enviaron fueron espectaculares: volcanes activos en la luna Ío de Júpiter, los intrincados anillos de Saturno y géiseres de nitrógeno en Tritón, la luna de Neptuno.',

            'Pero antes de las misiones Voyager, Carl Sagan ya había dejado su huella en la exploración espacial con las sondas Pioneer 10 y Pioneer 11, lanzadas en 1972 y 1973. Sagan diseñó, junto con Frank Drake y la artista Linda Salzman Sagan, las famosas placas de Pioneer: unas placas de aluminio dorado adosadas a cada sonda que contenían un mensaje para cualquier civilización extraterrestre que pudiera encontrarlas. Las placas mostraban figuras de un hombre y una mujer, la posición de la Tierra en la galaxia y otros datos científicos fundamentales.',

            'Para las misiones Voyager, Sagan lideró un proyecto mucho más ambicioso: el Disco de Oro Voyager (Voyager Golden Record). Se trata de un disco fonográfico chapado en oro que viaja a bordo de cada sonda Voyager, conteniendo los sonidos e imágenes de la vida en la Tierra. Es, literalmente, una carta de presentación de la humanidad enviada a las estrellas. El disco fue diseñado para durar miles de millones de años en el vacío del espacio, con la esperanza de que alguna civilización inteligente pudiera encontrarlo algún día en el futuro lejano.',

            '¿Sabías qué contiene el Disco de Oro? Incluye 115 imágenes que muestran la vida en la Tierra: desde la estructura del ADN hasta una madre amamantando a su bebé, desde un amanecer hasta un delfín saltando en el océano. También contiene saludos en 55 idiomas diferentes, incluyendo español, inglés, chino mandarín, árabe y hasta el idioma sumerio, una lengua que ya nadie habla desde hace miles de años. Además, incluye una selección de sonidos naturales como truenos, cantos de ballenas, el viento y la risa de un niño.',

            'La selección musical del Disco de Oro fue igualmente extraordinaria. Ann Druyan, quien se enamoró de Sagan durante el proceso de selección, eligió cuidadosamente 27 piezas musicales que representaban la diversidad cultural de la humanidad. Hay música de Bach, Beethoven y Mozart, pero también canciones de Azerbaiyán, percusiones senegalesas, música de gamelán de Java, cantos navajos y hasta "Johnny B. Goode" de Chuck Berry. Cada pieza musical fue elegida para mostrar la riqueza y la creatividad de la especie humana.',

            'Ahora llegamos al momento más emotivo de toda esta aventura. El 14 de febrero de 1990, cuando Voyager 1 se encontraba a unos 6,000 millones de kilómetros de la Tierra, Carl Sagan convenció a la NASA de que girara la cámara de la sonda hacia atrás para tomar una última fotografía de nuestro planeta. Muchos en la NASA pensaban que la foto no tendría valor científico, pero Sagan insistió. El resultado fue una imagen que cambiaría para siempre la forma en que la humanidad se ve a sí misma: el Pálido Punto Azul.',

            'En aquella fotografía, la Tierra aparece como un diminuto punto de luz, apenas un píxel de color azul pálido, suspendido en un rayo de sol disperso. Desde esa distancia increíble, nuestro planeta —con todos sus océanos, montañas, ciudades, guerras y amores— era apenas una mota de polvo flotando en la inmensidad del espacio. La imagen fue profundamente humilde y conmovedora: todo lo que la humanidad había conocido, amado, construido y destruido existía en ese diminuto punto casi invisible.',

            'La reflexión que Carl Sagan escribió sobre esa fotografía se convirtió en uno de los textos más bellos y poderosos de la historia de la ciencia. "Mira ese punto", escribió. "Eso es aquí. Eso es nuestro hogar. Eso somos nosotros. En él, todos los que amas, todos los que conoces, todos de los que alguna vez oíste hablar, cada ser humano que ha existido, vivió ahí su vida". Estas palabras han sido leídas en escuelas, universidades, congresos y ceremonias en todo el mundo, y siguen conmoviendo a quien las escucha.',

            'Sagan continuó su reflexión con un mensaje de responsabilidad cósmica. Señaló que todas las guerras, todos los reyes y campesinos, todos los héroes y cobardes, todos los creadores y destructores de civilizaciones, habían vivido en esa mota de polvo suspendida en un rayo de sol. Argumentó que la vastedad del espacio debería hacernos más humildes y más amables los unos con los otros, porque no hay ningún otro lugar, al menos en un futuro cercano, al que nuestra especie pudiera migrar. Este pálido punto azul es nuestro único hogar.',

            'Las sondas Voyager no dejaron de sorprender después de esa foto histórica. En agosto de 2012, Voyager 1 se convirtió en el primer objeto creado por humanos en alcanzar el espacio interestelar, cruzando la heliopausa y abandonando la burbuja protectora del Sol. Voyager 2 lo siguió en noviembre de 2018. Ambas naves siguen enviando datos a la Tierra, aunque se encuentran a más de 24,000 millones de kilómetros de distancia. Sus señales de radio, viajando a la velocidad de la luz, tardan más de 22 horas en llegar hasta nosotros.',

            'El Disco de Oro sigue viajando por el espacio y lo seguirá haciendo durante miles de millones de años. Incluso cuando el Sol se haya apagado y la Tierra haya dejado de existir, los discos de las Voyager seguirán deslizándose silenciosamente entre las estrellas, llevando consigo la memoria de una civilización que miró al cielo y se preguntó si estaba sola. Es, quizás, el monumento más duradero que la humanidad jamás haya creado, y fue idea de Carl Sagan.',

            'La historia del Pálido Punto Azul nos enseña algo fundamental sobre la perspectiva. Cuando miras un problema desde muy cerca, puede parecer enorme e insuperable. Pero cuando te alejas lo suficiente, entiendes que tus problemas son parte de algo mucho más grande. Carl Sagan usó esa perspectiva cósmica para invitarnos a superar nuestras diferencias y trabajar juntos como especie. Desde el espacio, no hay fronteras, no hay banderas, no hay países: solo un frágil mundo azul lleno de vida.',

            'Las misiones Voyager y Pioneer representan lo mejor de la humanidad: nuestra curiosidad, nuestra creatividad y nuestro deseo de explorar lo desconocido. Carl Sagan entendió que estas misiones no eran solo proyectos científicos, sino mensajes de esperanza. Al enviar nuestras imágenes, nuestra música y nuestros saludos a las estrellas, estábamos diciendo: "Estamos aquí, somos curiosos, y queremos conocerlos". Es el gesto más grandioso de amistad que una civilización puede hacer.',

            '¡La aventura continúa, explorador! En el próximo módulo descubrirás cómo Carl Sagan dedicó gran parte de su vida a una de las preguntas más emocionantes que un ser humano puede hacerse: ¿estamos solos en el universo? Conocerás el programa SETI, el famoso Mensaje de Arecibo y los esfuerzos de Sagan por buscar vida más allá de la Tierra. ¡Prepárate para escuchar el susurro de las estrellas!'
          ],
          image: '/assets/carl_sagan/sagan_m3.png',
          imgCaption: 'La famosa fotografía del Pálido Punto Azul tomada por Voyager 1 desde 6,000 millones de km',
        },
      ],
    },
    quizEs: [
      { q: '¿En qué fecha se tomó la famosa fotografía del Pálido Punto Azul?', options: ['4 de julio de 1976', '14 de febrero de 1990', '20 de julio de 1969', '12 de abril de 1981'], a: 1 },
      { q: '¿Qué objeto viaja a bordo de las sondas Voyager como mensaje para civilizaciones extraterrestres?', options: ['Una cápsula del tiempo', 'Un disco de oro con sonidos e imágenes', 'Un libro digital', 'Una bandera de la Tierra'], a: 1 },
      { q: '¿En qué año fueron lanzadas las sondas Voyager 1 y Voyager 2?', options: ['1969', '1972', '1977', '1980'], a: 2 },
    ],
  },
  {
    id: 'sagan_m4',
    order: 7004,
    titleEn: 'The Search for Extraterrestrial Life (SETI and Arecibo)',
    titleEs: 'La búsqueda de vida extraterrestre (SETI y Arecibo)',
    badge: 'Signal Hunter',
    badgeEs: 'Cazador de Señales',
    badgeIcon: '/assets/carl_sagan/sagan_m4.png',
    color: '#32CD32',
    icon: '/assets/carl_sagan/sagan_m4.png',
    contentEs: {
      sections: [
        {
          id: 'sagan_m4_s1',
          title: 'La búsqueda de vida extraterrestre (SETI y Arecibo)',
          text: [
            '¿Sabías que Carl Sagan dedicó una parte enorme de su carrera a responder la pregunta más fascinante que la humanidad se ha hecho jamás: ¿estamos solos en el universo? Para Sagan, esta no era una pregunta de ciencia ficción, sino una cuestión científica seria que merecía ser investigada con rigor y método. Él creía que, dado el tamaño inmenso del universo —con cientos de miles de millones de galaxias, cada una con cientos de miles de millones de estrellas—, sería extraordinariamente improbable que la Tierra fuera el único lugar con vida.',

            'SETI, que significa "Search for Extraterrestrial Intelligence" (Búsqueda de Inteligencia Extraterrestre), es un proyecto científico dedicado a buscar señales de radio o luz que pudieran provenir de civilizaciones tecnológicas en otros planetas. Carl Sagan fue uno de los defensores más apasionados de SETI y contribuyó enormemente a darle credibilidad científica. Mientras muchos científicos consideraban que buscar extraterrestres era una pérdida de tiempo, Sagan argumentaba que no buscar sería una decisión mucho peor: ¿y si la señal estaba ahí y nadie la escuchaba?',

            'Para entender las posibilidades de encontrar vida inteligente en el cosmos, los científicos usan una herramienta conceptual llamada la Ecuación de Drake. Fue propuesta por el astrónomo Frank Drake en 1961, y Carl Sagan la popularizó enormemente. La ecuación estima el número de civilizaciones en nuestra galaxia con las que podríamos comunicarnos, tomando en cuenta factores como la tasa de formación de estrellas, la fracción de estrellas con planetas, la probabilidad de que surja vida y la duración de las civilizaciones tecnológicas. Sagan usaba esta ecuación para mostrar que incluso con estimaciones conservadoras, podría haber miles de civilizaciones ahí afuera.',

            'El 16 de noviembre de 1974 ocurrió uno de los eventos más extraordinarios de la historia de la humanidad: el envío del Mensaje de Arecibo. Desde el enorme radiotelescopio de Arecibo en Puerto Rico, que tenía 305 metros de diámetro, se transmitió un mensaje codificado hacia el cúmulo estelar M13, ubicado a unos 25,000 años luz de distancia. El mensaje fue diseñado por Frank Drake con la ayuda de Carl Sagan e incluía información sobre los números del 1 al 10, los elementos químicos del ADN, la forma de la doble hélice del ADN, una figura humana, el Sistema Solar y el propio telescopio de Arecibo.',

            'El Mensaje de Arecibo era un código binario de 1,679 bits que, cuando se organizan en una cuadrícula de 73 filas por 23 columnas (ambos números primos), forman una imagen con toda la información. Sagan sabía que cualquier civilización inteligente reconocería que 1,679 es el producto de dos números primos y deduciría la forma de organizar los datos. Por supuesto, la respuesta, si alguna vez llega, no la recibiremos en miles de años, ya que la señal viaja a la velocidad de la luz. Fue más un gesto simbólico que un intento real de comunicación, pero demostró que la humanidad estaba lista para hablar con las estrellas.',

            'Carl Sagan participó activamente en las misiones Viking de la NASA, las primeras en aterrizar exitosamente en Marte en 1976. Viking 1 aterrizó el 20 de julio y Viking 2 el 3 de septiembre de ese año. Sagan fue miembro del equipo científico y estaba especialmente interesado en los experimentos biológicos diseñados para detectar vida microbiana en el suelo marciano. Los resultados fueron ambiguos e intrigantes: algunos experimentos parecían mostrar señales de actividad biológica, pero la mayoría de los científicos concluyeron que las reacciones eran probablemente químicas, no biológicas.',

            'Antes de las misiones Viking, Sagan había hecho predicciones audaces sobre Marte. Mientras algunos científicos imaginaban un Marte completamente muerto y desolado, Sagan sugería que podría haber regiones donde la vida microbiana pudiera existir, quizás bajo la superficie o en zonas donde el agua líquida pudiera aparecer brevemente. Décadas después, las misiones modernas han confirmado que Marte tuvo agua líquida en su pasado y que existen depósitos de hielo bajo su superficie, dándole parcialmente la razón a las intuiciones de Sagan.',

            'Uno de los aspectos más importantes del trabajo de Carl Sagan fue su incansable lucha contra la pseudociencia. Él amaba la idea de vida extraterrestre, pero se oponía firmemente a las afirmaciones sin evidencia sobre ovnis y abducciones alienígenas. Su posición era clara y elegante: "Afirmaciones extraordinarias requieren evidencia extraordinaria". Esta frase se convirtió en un principio fundamental del pensamiento escéptico. Sagan no descartaba la posibilidad de visitas extraterrestres, pero señalaba que las anécdotas y las fotografías borrosas no constituían pruebas científicas.',

            'Sagan escribió un libro fundamental sobre este tema: "El mundo y sus demonios" (The Demon-Haunted World), publicado en 1995. En él, proporcionó a los lectores lo que llamó un "kit de detección de engaños" (Baloney Detection Kit): un conjunto de herramientas de pensamiento crítico para distinguir la ciencia real de la pseudociencia. Enseñaba a la gente a buscar evidencia independiente, a considerar explicaciones alternativas, a no creer en argumentos de autoridad y a ser escépticos con sus propias creencias. Este libro sigue siendo una lectura esencial para cualquier persona que quiera pensar con claridad.',

            'Carl Sagan también estudió la posibilidad de vida en otros lugares del Sistema Solar además de Marte. Se interesó profundamente por Titán, la luna más grande de Saturno, que tiene una densa atmósfera rica en moléculas orgánicas. También especuló sobre Europa, la luna helada de Júpiter, que podría albergar un océano de agua líquida bajo su superficie de hielo. Las misiones espaciales modernas han confirmado la existencia de ese océano subterráneo, y Europa es hoy considerada uno de los lugares más prometedores para buscar vida en el Sistema Solar.',

            'La importancia de Sagan para la astrobiología —la ciencia que estudia la vida en el universo— es difícil de exagerar. En una época en que hablar de vida extraterrestre podía arruinar la carrera de un científico, Sagan tuvo el valor de defender públicamente esta búsqueda como una empresa científica legítima y necesaria. Gracias en gran parte a su influencia, la astrobiología se convirtió en un campo respetado de la ciencia moderna, con programas de investigación financiados por la NASA y universidades de todo el mundo.',

            'Sagan también reflexionó profundamente sobre qué significaría para la humanidad descubrir que no estamos solos. Argumentaba que confirmar la existencia de vida extraterrestre, aunque fuera microbiana, sería el descubrimiento más importante de toda la historia humana. Cambiaría fundamentalmente nuestra visión de nosotros mismos y de nuestro lugar en el cosmos. Al mismo tiempo, Sagan advertía que debíamos ser cautelosos en nuestros primeros contactos y no asumir que una civilización extraterrestre sería necesariamente amigable o hostil.',

            'El radiotelescopio de Arecibo, desde donde se envió el famoso mensaje, fue durante décadas uno de los instrumentos más importantes para la búsqueda de señales extraterrestres. Con sus 305 metros de diámetro, era el telescopio de un solo plato más grande del mundo. Lamentablemente, el 1 de diciembre de 2020, el telescopio colapsó después de sufrir daños estructurales. Su pérdida fue un golpe enorme para la comunidad científica, pero su legado —incluyendo el mensaje que Carl Sagan ayudó a enviar hacia las estrellas— perdurará para siempre.',

            'Lo que hacía especial el enfoque de Sagan sobre la vida extraterrestre era su equilibrio perfecto entre entusiasmo y rigor. Él quería desesperadamente encontrar vida más allá de la Tierra, pero nunca permitió que ese deseo nublara su juicio científico. Enseñaba que la ciencia no trata de creer lo que queremos creer, sino de descubrir lo que realmente es verdad, nos guste o no. Esta honestidad intelectual es quizás la lección más valiosa que Carl Sagan dejó a las futuras generaciones de científicos.',

            '¡No te detengas aquí, explorador! En el próximo módulo descubrirás una de las ideas más geniales y creativas de Carl Sagan: el Calendario Cósmico. Imagina comprimir toda la historia del universo, desde el Big Bang hasta este preciso momento, en un solo año calendario. ¿En qué mes aparecerían los dinosaurios? ¿En qué segundo de qué día nacerías tú? ¡Prepárate para un viaje alucinante a través del tiempo cósmico!'
          ],
          image: '/assets/carl_sagan/sagan_m4.png',
          imgCaption: 'El radiotelescopio de Arecibo, desde donde se envió el mensaje hacia las estrellas en 1974',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué significa SETI?', options: ['Sistema de Exploración Terrestre Inteligente', 'Search for Extraterrestrial Intelligence', 'Sociedad para el Estudio del Telescopio Interestelar', 'Science and Engineering for Tomorrow\'s Innovations'], a: 1 },
      { q: '¿En qué fecha se envió el Mensaje de Arecibo?', options: ['20 de julio de 1969', '14 de febrero de 1990', '16 de noviembre de 1974', '5 de septiembre de 1977'], a: 2 },
      { q: '¿Cuál era la famosa frase de Sagan sobre las afirmaciones sin evidencia?', options: ['"La ciencia es la poesía del cosmos"', '"Somos polvo de estrellas"', '"Afirmaciones extraordinarias requieren evidencia extraordinaria"', '"El cosmos es todo lo que existe"'], a: 2 },
    ],
  },
  {
    id: 'sagan_m5',
    order: 7005,
    titleEn: 'The Cosmic Calendar: 13.8 Billion Years in 1 Year',
    titleEs: 'El Calendario Cósmico: 13,800 millones de años en 1 año',
    badge: 'Cosmic Chrononaut',
    badgeEs: 'Crononauta Cósmico',
    badgeIcon: '/assets/carl_sagan/sagan_m5.png',
    color: '#FFD700',
    icon: '/assets/carl_sagan/sagan_m5.png',
    contentEs: {
      sections: [
        {
          id: 'sagan_m5_s1',
          title: 'El Calendario Cósmico: 13,800 millones de años en 1 año',
          text: [
            '¡Prepárate para el ejercicio de imaginación más asombroso que jamás hayas intentado! Carl Sagan inventó una herramienta brillante para ayudarnos a comprender la inmensidad del tiempo cósmico: el Calendario Cósmico. La idea es sencilla pero poderosa: ¿qué pasaría si comprimiéramos toda la historia del universo, desde el Big Bang hasta el momento presente, en un solo año calendario? Es decir, 13,800 millones de años reales equivaldrían a 365 días. Cada mes del calendario representaría más de mil millones de años, y cada segundo equivaldría a unos 438 años reales.',

            'En este calendario extraordinario, todo comienza el 1 de enero a la medianoche con el Big Bang, la gran explosión que dio origen al universo. En ese instante, toda la materia, la energía, el espacio y el tiempo nacieron de una singularidad increíblemente densa y caliente. Durante las primeras horas del 1 de enero cósmico, el universo era una sopa ardiente de partículas subatómicas. Los primeros átomos de hidrógeno y helio se formaron en los primeros minutos, pero tuvieron que pasar millones de años (días cósmicos) para que las primeras estrellas comenzaran a brillar.',

            'Las primeras estrellas del universo se encendieron alrededor del 10 de enero en nuestro calendario cósmico. Estas estrellas primordiales eran gigantes, enormes bolas de hidrógeno y helio cientos de veces más masivas que nuestro Sol. Vivían rápido y morían jóvenes, explotando como supernovas y esparciendo elementos más pesados por el espacio. Cada generación de estrellas que nacía, vivía y moría fabricaba nuevos elementos químicos en su interior: carbono, oxígeno, hierro, oro. ¡Literalmente, las estrellas eran las fábricas de los átomos que hoy forman tu cuerpo!',

            'Nuestra galaxia, la Vía Láctea, se formó alrededor de marzo en el calendario cósmico, hace unos 11,000 millones de años. Imagina: el universo ya llevaba dos meses existiendo cuando nació nuestra galaxia hogar. La Vía Láctea se formó a partir de enormes nubes de gas que colapsaron bajo su propia gravedad, creando un disco espiral giratorio con brazos elegantes llenos de estrellas jóvenes y viejas. Durante los meses siguientes del calendario cósmico, la Vía Láctea fue creciendo, fusionándose con galaxias más pequeñas y formando miles de millones de estrellas nuevas.',

            'Ahora viene un dato que te dejará boquiabierto: nuestro Sol y el Sistema Solar no se formaron hasta el 1 de septiembre del calendario cósmico, hace unos 4,600 millones de años. ¡Eso significa que el universo ya había existido durante ocho meses completos antes de que naciera nuestro hogar planetario! El Sol se formó a partir de una nube de gas y polvo que colapsó, probablemente empujada por la onda expansiva de una supernova cercana. Los restos de esa nube formaron los planetas, incluida nuestra querida Tierra, que nació poco después, alrededor del 2 de septiembre.',

            'La vida en la Tierra apareció sorprendentemente pronto. Las primeras formas de vida —organismos microscópicos similares a bacterias— surgieron alrededor del 21 de septiembre del calendario cósmico, hace unos 3,800 millones de años. Esto significa que la vida apareció en nuestro planeta cuando el año cósmico apenas había entrado en su último trimestre. Durante los siguientes meses cósmicos, la vida siguió siendo microscópica: bacterias y organismos unicelulares reinaron la Tierra durante un tiempo increíblemente largo. ¡La vida microscópica dominó nuestro planeta durante la mayor parte de su historia!',

            'Las primeras células con núcleo, llamadas eucariotas, no aparecieron hasta bien entrado noviembre en nuestro calendario. Y los primeros organismos multicelulares, los antepasados de todos los animales y plantas que conocemos, no surgieron hasta mediados de diciembre. Piensa en eso: durante la mayor parte de la historia de la vida en la Tierra, no existían ni plantas, ni animales, ni hongos. Solo bacterias microscópicas flotando en océanos primitivos. La complejidad de la vida que vemos hoy tardó miles de millones de años en evolucionar.',

            'Los dinosaurios, esas criaturas majestuosas que fascinan a niños y adultos por igual, no aparecieron hasta el 25 de diciembre en el calendario cósmico. ¡Los dinosaurios son un regalo de Navidad cósmico! Dominaron la Tierra durante millones de años, pero en el calendario cósmico su reinado duró apenas unos pocos días. El asteroide que causó su extinción masiva impactó la Tierra el 30 de diciembre. En solo cinco días cósmicos, los dinosaurios aparecieron, reinaron y desaparecieron. La naturaleza puede ser asombrosamente veloz en la escala del tiempo cósmico.',

            'Y ahora prepárate para el dato más impactante de todos: los seres humanos modernos, el Homo sapiens, no aparecemos hasta las 11:52 de la noche del 31 de diciembre, apenas ocho minutos antes de la medianoche. Toda nuestra especie, con todos sus descubrimientos, aventuras, guerras, obras de arte y conquistas, cabe en los últimos ocho minutos del último día del año cósmico. Nuestra existencia es un suspiro en la historia del universo, un parpadeo brevísimo en la escala del tiempo cósmico.',

            '¿Y la historia registrada? Todo lo que estudiamos en clase de historia —las pirámides de Egipto, el Imperio Romano, el Renacimiento, las guerras mundiales, la llegada del ser humano a la Luna— todo eso ocurre en los últimos 14 segundos del 31 de diciembre. ¡Catorce segundos! Cristóbal Colón llegó a América hace apenas un segundo cósmico. La revolución industrial, la invención del avión, las computadoras, internet... todo eso ha sucedido en la última fracción de segundo del año cósmico. Somos increíblemente nuevos en este universo.',

            'Carl Sagan usó el Calendario Cósmico en el primer episodio de su serie Cosmos, y el impacto visual fue devastador. Los espectadores podían ver, con una claridad que las palabras solas no podían lograr, cuán breve es la existencia humana comparada con la edad del universo. Sagan caminaba por un enorme calendario dibujado en el suelo de un estudio, señalando cada fecha con asombro y reverencia. Fue una de las demostraciones educativas más efectivas jamás realizadas en televisión.',

            'Pero el Calendario Cósmico no pretende hacernos sentir insignificantes. Al contrario: Carl Sagan lo usaba para inspirar asombro y gratitud. El hecho de que seamos conscientes de nuestra propia brevedad en el cosmos es, en sí mismo, algo extraordinario. Somos la forma en que el universo se conoce a sí mismo, decía Sagan. En esos últimos segundos del calendario cósmico, una especie de primates en un pequeño planeta aprendió a mirar las estrellas y a preguntarse de dónde venimos. Eso es algo maravilloso e irrepetible.',

            'El Calendario Cósmico también nos invita a pensar en el futuro. Si la historia de la humanidad cabe en los últimos segundos del 31 de diciembre, imagina todo lo que podría suceder en los próximos "años cósmicos". Podríamos colonizar otros planetas, curar todas las enfermedades, comprender los misterios más profundos del universo o incluso encontrar vida inteligente en otras galaxias. El futuro es inmensamente más largo que el pasado, y las posibilidades son literalmente infinitas. Sagan nos recordaba que estamos apenas al comienzo de nuestra historia cósmica.',

            'Una de las lecciones más profundas del Calendario Cósmico es la humildad. Nos recuerda que nuestros problemas cotidianos, nuestras peleas y nuestros miedos son fenómenos efímeros en la escala del universo. Pero al mismo tiempo, nos recuerda que cada momento es precioso precisamente porque es tan breve. Carl Sagan encontraba en esta perspectiva no tristeza, sino motivación: si nuestra existencia es tan corta, debemos aprovecharla al máximo, ser amables, curiosos y valientes, y dejar el mundo un poco mejor de como lo encontramos.',

            '¡Felicidades, crononauta! Has viajado a través de toda la historia del universo en un solo módulo. En la próxima y última parada de nuestro viaje por la vida de Carl Sagan, descubrirás su legado más duradero: su novela "Contact", la Sociedad Planetaria que fundó, y cómo su influencia sigue viva hoy en científicos como Neil deGrasse Tyson. ¡Prepárate para el gran final de esta aventura cósmica!'
          ],
          image: '/assets/carl_sagan/sagan_m5.png',
          imgCaption: 'El Calendario Cósmico de Carl Sagan: toda la historia del universo comprimida en un año',
        },
      ],
    },
    quizEs: [
      { q: 'En el Calendario Cósmico, ¿qué evento ocurre el 1 de enero?', options: ['La formación de la Tierra', 'El Big Bang', 'La aparición de los dinosaurios', 'El nacimiento del Sol'], a: 1 },
      { q: '¿En qué "fecha" del Calendario Cósmico aparecen los dinosaurios?', options: ['1 de septiembre', '15 de noviembre', '25 de diciembre', '31 de diciembre'], a: 2 },
      { q: '¿Cuántos segundos del Calendario Cósmico ocupa toda la historia registrada de la humanidad?', options: ['60 segundos', '14 segundos', '1 hora', '5 minutos'], a: 1 },
    ],
  },
  {
    id: 'sagan_m6',
    order: 7006,
    titleEn: 'His Legacy: Contact, The Planetary Society, and the Future',
    titleEs: 'Su legado: Contact, la Sociedad Planetaria y el futuro',
    badge: 'Heir of the Stars',
    badgeEs: 'Heredero de las Estrellas',
    badgeIcon: '/assets/carl_sagan/sagan_m6.png',
    color: '#9B59B6',
    icon: '/assets/carl_sagan/sagan_m6.png',
    contentEs: {
      sections: [
        {
          id: 'sagan_m6_s1',
          title: 'Su legado: Contact, la Sociedad Planetaria y el futuro',
          text: [
            '¡Bienvenido al último capítulo de nuestro viaje por la vida de Carl Sagan, explorador! Aunque Carl nos dejó en 1996, su legado sigue tan vivo y vibrante como las estrellas que tanto amaba. En este módulo descubrirás cómo sus ideas, sus libros, sus organizaciones y las personas que inspiró continúan cambiando el mundo y acercando a la humanidad a las estrellas. Porque los grandes soñadores no mueren realmente: sus sueños siguen viviendo en todos aquellos que los escucharon.',

            'Una de las obras más queridas de Carl Sagan es su novela "Contact", publicada en 1985. Es la historia de Ellie Arroway, una brillante astrónoma que trabaja en el proyecto SETI y un día detecta una señal de radio proveniente de la estrella Vega, a 26 años luz de la Tierra. La señal contiene instrucciones para construir una máquina que permite viajar a través del espacio. La novela explora temas profundos: la relación entre ciencia y fe, el significado de la vida, la soledad cósmica y la posibilidad de contacto con civilizaciones extraterrestres.',

            'Sagan trabajó en "Contact" durante muchos años, puliendo cada detalle científico para que la historia fuera lo más realista posible. A diferencia de muchas novelas de ciencia ficción, "Contact" se toma la ciencia en serio: los agujeros de gusano, las señales de radio y la tecnología descrita están basados en física real. Sagan consultó con físicos teóricos, incluyendo a Kip Thorne (quien más tarde ganaría el Premio Nobel), para asegurarse de que los viajes a través de agujeros de gusano fueran teóricamente posibles. ¡La ciencia de la novela inspiró investigaciones reales!',

            'En 1997, un año después de la muerte de Sagan, "Contact" fue adaptada a una película protagonizada por Jodie Foster en el papel de Ellie Arroway y Matthew McConaughey como el teólogo Palmer Joss. La película fue dirigida por Robert Zemeckis, el mismo director de "Volver al Futuro". Fue un gran éxito de taquilla y de crítica, y presentó al público general las ideas de SETI y la búsqueda de vida extraterrestre de una manera emocionante y accesible. Muchos científicos han dicho que la película los inspiró a dedicarse a la astrobiología.',

            'Otro pilar fundamental del legado de Sagan es la Sociedad Planetaria (The Planetary Society), que cofundó en 1980 junto con Bruce Murray, entonces director del Laboratorio de Propulsión a Chorro (JPL) de la NASA, y Louis Friedman, ingeniero espacial. La Sociedad Planetaria es la organización espacial no gubernamental más grande del mundo, con miembros en más de 100 países. Su misión es promover la exploración espacial, la búsqueda de vida extraterrestre y la defensa planetaria contra asteroides que pudieran amenazar la Tierra.',

            'La Sociedad Planetaria ha logrado cosas increíbles desde su fundación. Uno de sus proyectos más emocionantes es LightSail, una nave espacial impulsada por la presión de la luz solar sobre velas extremadamente delgadas. Esta idea, que Sagan promovió durante décadas, fue finalmente demostrada con éxito en 2019 cuando LightSail 2 desplegó sus velas en órbita terrestre y demostró que la navegación solar es posible. La Sociedad también financió el proyecto SETI@home, que permitía a cualquier persona con una computadora contribuir a la búsqueda de señales extraterrestres.',

            'Carl Sagan fue también un defensor apasionado del desarme nuclear. Vivió durante la Guerra Fría, cuando Estados Unidos y la Unión Soviética tenían arsenales nucleares capaces de destruir la civilización humana varias veces. Sagan, junto con otros científicos, desarrolló el concepto de "invierno nuclear": la teoría de que una guerra nuclear masiva levantaría tanto polvo y hollín a la atmósfera que bloquearía la luz del Sol durante años, provocando una catástrofe climática global. Este concepto ayudó a convencer a líderes políticos de los peligros reales de la guerra nuclear.',

            'Su compromiso con la Tierra se extendía más allá del desarme nuclear. Sagan fue uno de los primeros científicos famosos en advertir sobre el cambio climático y el efecto invernadero. Su investigación sobre Venus le había enseñado que un efecto invernadero descontrolado podía transformar un planeta habitable en un infierno ardiente. Argumentaba que la humanidad estaba realizando un experimento peligroso con la atmósfera de la Tierra al quemar combustibles fósiles, y que necesitábamos actuar antes de que fuera demasiado tarde. Sus advertencias, lamentablemente, siguen siendo relevantes hoy.',

            'Ann Druyan, la esposa de Carl Sagan y su compañera creativa más cercana, ha dedicado su vida a continuar el legado de su esposo. Fue ella quien produjo las secuelas de Cosmos en 2014 y 2020, asegurándose de que el espíritu original de la serie se mantuviera intacto. También ha trabajado incansablemente para promover el pensamiento científico, la exploración espacial y la educación. Ann ha dicho que su misión es completar el trabajo que ella y Carl comenzaron juntos: hacer que la ciencia sea accesible y emocionante para todas las personas del planeta.',

            'Quizás la persona que mejor encarna la influencia directa de Carl Sagan es el astrofísico Neil deGrasse Tyson. Cuando Tyson era un joven de 17 años en el Bronx de Nueva York, soñaba con estudiar astronomía. Carl Sagan, que ya era famoso, se enteró de su interés y personalmente lo invitó a pasar un día en la Universidad de Cornell. Le mostró su laboratorio, le regaló un libro firmado y, cuando comenzó a nevar, le ofreció llevarlo a la estación de autobuses. Tyson ha contado esta historia muchas veces, diciendo que ese día aprendió qué tipo de persona quería ser.',

            'Neil deGrasse Tyson siguió los pasos de Sagan y se convirtió en uno de los divulgadores científicos más importantes del siglo XXI. Fue el presentador de "Cosmos: Una Odisea del Espacio-Tiempo" (2014) y "Cosmos: Mundos Posibles" (2020), continuando directamente la tradición que Sagan había establecido. Tyson, como director del Planetario Hayden en Nueva York, ha inspirado a millones de personas con su entusiasmo contagioso por la ciencia. La cadena de inspiración que Sagan inició sigue extendiéndose de generación en generación.',

            'El legado de Sagan también vive en la ciencia misma. Sus investigaciones sobre Venus, Marte y las atmósferas planetarias sentaron las bases de la ciencia planetaria moderna. Sus ideas sobre la posibilidad de vida en Europa (la luna de Júpiter) y en Titán (la luna de Saturno) han guiado misiones espaciales que se planifican hoy. La misión Europa Clipper de la NASA, lanzada en 2024, fue diseñada en parte para buscar signos de vida en el océano subterráneo de Europa, siguiendo la visión que Sagan articuló décadas antes.',

            'Carl Sagan publicó más de 600 artículos científicos y fue autor, coautor o editor de más de 20 libros. Además de "Cosmos" y "Contact", escribió obras influyentes como "Los dragones del Edén" (que ganó el Premio Pulitzer en 1978), "El cerebro de Broca", "Miles de millones" y el ya mencionado "El mundo y sus demonios". Cada uno de estos libros democratizaba el conocimiento científico, haciéndolo accesible para lectores de todas las edades y formaciones. Sagan demostró que un científico podía ser al mismo tiempo riguroso y popular.',

            'Hay una frase de Carl Sagan que resume perfectamente su filosofía de vida: "En algún lugar, algo increíble está esperando ser descubierto". Esta frase captura su optimismo infinito, su curiosidad insaciable y su creencia profunda en el potencial de la humanidad. Sagan vivió cada día de su vida buscando ese algo increíble, y nos enseñó a todos a hacer lo mismo. Su mensaje final es de esperanza: el universo es vasto, misterioso y maravilloso, y nosotros somos lo suficientemente inteligentes y valientes para explorarlo.',

            '¡Felicidades, explorador! Has completado el curso sobre Carl Sagan, el Mensajero del Cosmos. Ahora conoces la historia del niño de Brooklyn que miraba las estrellas y se convirtió en la voz del universo para millones de personas. Recuerda sus lecciones más importantes: somos polvo de estrellas, vivimos en un pálido punto azul, la ciencia es nuestra mejor herramienta para entender el mundo, y en algún lugar del cosmos, algo increíble está esperando a que tú lo descubras. ¡Sal a mirar las estrellas esta noche y lleva contigo el espíritu de Carl Sagan!'
          ],
          image: '/assets/carl_sagan/sagan_m6.png',
          imgCaption: 'Carl Sagan, el hombre que nos enseñó a mirar las estrellas con asombro y curiosidad',
        },
      ],
    },
    quizEs: [
      { q: '¿En qué año se publicó la novela "Contact" de Carl Sagan?', options: ['1980', '1985', '1990', '1997'], a: 1 },
      { q: '¿Quiénes cofundaron la Sociedad Planetaria junto con Carl Sagan en 1980?', options: ['Neil Tyson y Ann Druyan', 'Bruce Murray y Louis Friedman', 'Frank Drake y Steven Soter', 'Jodie Foster y Robert Zemeckis'], a: 1 },
      { q: '¿Qué astrofísico fue inspirado personalmente por Sagan cuando era joven y luego presentó las secuelas de Cosmos?', options: ['Stephen Hawking', 'Bill Nye', 'Neil deGrasse Tyson', 'Michio Kaku'], a: 2 },
    ],
  },
];
