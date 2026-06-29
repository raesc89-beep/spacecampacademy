// Curso: Científicos de la Antigua Grecia
// 6 módulos con contenido educativo en español y 3 preguntas de quiz cada uno
export const GRIEGOS_COURSE_DATA = [
  {
    id: 'griegos_m1',
    order: 11001,
    titleEn: 'Thales of Miletus: The First Scientist in History',
    titleEs: 'Tales de Mileto: el primer científico de la historia',
    badge: 'First Natural Philosopher',
    badgeEs: 'Primer Filósofo Natural',
    badgeIcon: '/assets/griegos_ciencia/griegos_m1.png',
    color: '#D4A017',
    icon: '/assets/griegos_ciencia/griegos_m1.png',
    contentEs: {
      sections: [
        {
          id: 'griegos_m1_s1',
          title: 'Tales de Mileto: el primer científico de la historia',
          text: [
            '¿Sabías que hace más de 2.600 años, en una ciudad a orillas del mar Egeo, un hombre decidió buscar explicaciones sobre la naturaleza sin recurrir a los dioses ni a los mitos? Ese hombre fue Tales de Mileto, nacido alrededor del año 624 a.C. en la ciudad de Mileto, en la actual Turquía. Mientras todos a su alrededor creían que los rayos eran lanzados por Zeus y que los terremotos eran causados por Poseidón, Tales se atrevió a pensar diferente. Por eso, muchos historiadores lo consideran el primer científico de la historia.',

            'Mileto era una de las ciudades más ricas y avanzadas del mundo antiguo, un puerto comercial donde se cruzaban culturas de Grecia, Egipto, Mesopotamia y Persia. Los barcos llegaban cargados de mercancías, pero también de ideas y conocimientos. Tales creció rodeado de comerciantes, marineros y viajeros que traían historias de tierras lejanas. Este ambiente cosmopolita fue perfecto para alimentar su curiosidad insaciable y su deseo de comprender cómo funcionaba realmente el mundo.',

            '¡Prepárate para conocer una de las hazañas más asombrosas de la antigüedad! Tales de Mileto predijo un eclipse solar que ocurrió el 28 de mayo del año 585 a.C. Este eclipse fue tan impactante que detuvo una batalla entre los lidios y los medos, dos pueblos que llevaban años en guerra. Cuando el sol desapareció en pleno día, ambos bandos quedaron tan aterrados que decidieron firmar la paz inmediatamente. Tales había demostrado que los fenómenos celestes podían ser calculados y previstos por la razón humana, no por capricho de los dioses.',

            'La idea más revolucionaria de Tales fue proponer que toda la materia del universo estaba hecha de un solo elemento fundamental: el agua. Observó que el agua podía convertirse en hielo sólido, en líquido, o en vapor gaseoso. Vio que las semillas necesitaban humedad para germinar y que los alimentos contenían agua. Aunque hoy sabemos que la materia está compuesta de átomos y elementos diferentes, la propuesta de Tales fue un salto gigantesco: por primera vez, alguien buscaba una explicación natural y universal para la composición de todo lo que existe.',

            'Tales fue reconocido en toda Grecia como uno de los Siete Sabios, un grupo selecto de pensadores famosos por su sabiduría práctica y filosófica. Estos siete hombres eran consultados por reyes y gobernantes para resolver problemas difíciles. La frase que se le atribuye a Tales entre los Sabios es "Conócete a ti mismo", una invitación a la reflexión que siglos después sería inscrita en el templo de Apolo en Delfos. Ser nombrado entre los Siete Sabios era el mayor honor intelectual que existía en la antigua Grecia.',

            'En el campo de las matemáticas, Tales hizo contribuciones que siguen siendo estudiadas hoy en día en las escuelas de todo el mundo. El famoso Teorema de Tales establece que si trazamos líneas paralelas que cortan dos rectas, los segmentos que se forman son proporcionales. Esta idea parece sencilla, pero fue fundamental para el desarrollo de la geometría. Con este principio, Tales pudo medir la altura de las pirámides de Egipto usando solamente la sombra que proyectaban, lo cual dejó boquiabiertos a los sacerdotes egipcios.',

            'Se cuenta que Tales viajó a Egipto, donde aprendió geometría de los sacerdotes que medían las tierras inundadas por el río Nilo cada año. Los egipcios sabían hacer cálculos prácticos, pero Tales fue más allá: transformó esas técnicas en principios generales que podían aplicarse a cualquier situación. Fue el primero en demostrar teoremas geométricos de forma lógica, pasando de la práctica a la teoría. Este método de demostración se convertiría en la base de toda la matemática occidental.',

            'Tales también se interesó por la astronomía y la navegación. Enseñó a los marineros griegos a usar la constelación de la Osa Menor para orientarse en el mar, una técnica que los fenicios ya conocían pero que los griegos no utilizaban. Comprendió que las estrellas podían ser herramientas prácticas para la vida cotidiana, no solo luces misteriosas en el cielo. Esta conexión entre el conocimiento teórico y la aplicación práctica sería una característica de toda la ciencia griega posterior.',

            'Una de las historias más famosas sobre Tales cuenta que una noche, mientras caminaba mirando las estrellas, cayó en un pozo. Una sirvienta que lo vio se burló diciendo que quería conocer los cielos pero no veía lo que tenía a sus pies. Sin embargo, otra historia cuenta lo contrario: Tales usó sus conocimientos de astronomía para predecir una gran cosecha de aceitunas y alquiló todas las prensas de aceite de Mileto, ganando una fortuna. Así demostró que la filosofía también podía ser útil para ganar dinero, aunque ese no fuera su objetivo principal.',

            'Lo verdaderamente revolucionario de Tales no fue una teoría específica, sino su método de pensar. Antes de él, cuando la gente veía un relámpago, decía "Zeus está enfadado". Tales preguntaba: "¿Qué causa natural produce los relámpagos?" Esta forma de cuestionar la realidad, buscando explicaciones racionales en lugar de sobrenaturales, fue el nacimiento del pensamiento científico. Fue como encender una antorcha en una cueva oscura: de pronto, el mundo podía ser explorado con la razón.',

            'Tales fundó lo que los historiadores llaman la Escuela de Mileto, o Escuela Jónica, la primera escuela filosófica del mundo occidental. Sus discípulos más famosos fueron Anaximandro y Anaxímenes, quienes continuaron buscando explicaciones naturales para los fenómenos del universo. Anaximandro propuso que el elemento fundamental era algo indefinido llamado "ápeiron", y Anaxímenes dijo que era el aire. Aunque no estuvieron de acuerdo con su maestro, lo importante es que seguían el mismo método: observar, pensar y proponer explicaciones racionales.',

            'Tales también investigó las propiedades del magnetismo y la electricidad estática. Observó que el ámbar, al ser frotado, atraía objetos pequeños como plumas y trocitos de paja. También estudió la magnetita, una piedra natural que atraía al hierro. De hecho, la palabra "electricidad" viene del griego "élektron", que significa ámbar. Sin saberlo, Tales estaba explorando fuerzas fundamentales de la naturaleza que no serían comprendidas plenamente hasta más de dos mil años después.',

            'Aunque Tales no dejó ningún escrito que haya sobrevivido hasta nuestros días, sus ideas fueron transmitidas por otros filósofos como Aristóteles, Platón y Diógenes Laercio. Esto era común en la antigüedad: el conocimiento se transmitía de maestro a alumno de forma oral, y solo generaciones posteriores lo pusieron por escrito. A pesar de no tener textos originales, la influencia de Tales en la historia del pensamiento humano es incalculable, comparable a la de los más grandes científicos de todos los tiempos.',

            'Tales de Mileto falleció alrededor del año 546 a.C., pero su legado vive en cada clase de ciencias, en cada laboratorio y en cada persona que se hace una pregunta sobre cómo funciona el mundo. Él nos enseñó que no debemos aceptar las explicaciones mágicas sin cuestionarlas, que la naturaleza tiene sus propias reglas y que la mente humana es capaz de descubrirlas. En un mundo lleno de supersticiones, Tales fue el primer rayo de luz racional, el primer ser humano que decidió pensar como un científico.',

            '¡En el próximo módulo conocerás a otro genio griego que llevó el pensamiento racional aún más lejos! Pitágoras de Samos descubrió que los números escondían secretos increíbles sobre la música, las formas geométricas y la estructura misma del universo. Su famoso teorema sigue siendo una de las herramientas más poderosas de las matemáticas, y sus ideas sobre la armonía cósmica inspiraron a científicos durante miles de años. ¡Prepárate para entrar en el fascinante mundo de los números!'
          ],
          image: '/assets/griegos_ciencia/griegos_m1.png',
          imgCaption: 'Tales de Mileto, el primer pensador que buscó explicaciones naturales del universo',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué evento natural predijo Tales de Mileto en el año 585 a.C.?', options: ['Un terremoto', 'Un eclipse solar', 'Una erupción volcánica', 'Un tsunami'], a: 1 },
      { q: '¿Cuál era el elemento fundamental del universo según Tales?', options: ['El fuego', 'El aire', 'El agua', 'La tierra'], a: 2 },
      { q: '¿Qué grupo de pensadores ilustres incluía a Tales de Mileto?', options: ['Los Doce Olímpicos', 'Los Siete Sabios de Grecia', 'Los Tres Filósofos', 'Los Cinco Grandes'], a: 1 },
    ],
  },
  {
    id: 'griegos_m2',
    order: 11002,
    titleEn: 'Pythagoras: Numbers, Music and the Cosmos',
    titleEs: 'Pitágoras: números, música y el cosmos',
    badge: 'Master of Numbers',
    badgeEs: 'Maestro de los Números',
    badgeIcon: '/assets/griegos_ciencia/griegos_m2.png',
    color: '#E74C3C',
    icon: '/assets/griegos_ciencia/griegos_m2.png',
    contentEs: {
      sections: [
        {
          id: 'griegos_m2_s1',
          title: 'Pitágoras: números, música y el cosmos',
          text: [
            '¿Te imaginas descubrir que la música, las estrellas y las formas geométricas están conectadas por un hilo invisible hecho de números? Eso es exactamente lo que hizo Pitágoras de Samos, uno de los pensadores más fascinantes de toda la historia. Nacido alrededor del año 570 a.C. en la isla griega de Samos, Pitágoras dedicó su vida a demostrar que los números eran la clave secreta para entender absolutamente todo en el universo. Su influencia fue tan profunda que todavía hoy, más de 2.500 años después, su nombre aparece en los libros de matemáticas de todo el mundo.',

            'Pitágoras creció en Samos, una isla próspera frente a las costas de la actual Turquía. Según las leyendas antiguas, viajó extensamente en su juventud: visitó Egipto, donde aprendió geometría con los sacerdotes; estuvo en Babilonia, donde estudió astronomía y aritmética; y quizás llegó hasta la India, donde conoció las ideas de los sabios orientales. Estos viajes le dieron una visión del conocimiento mucho más amplia que la de cualquier otro griego de su época, combinando saberes de las civilizaciones más avanzadas del mundo antiguo.',

            '¡Prepárate para conocer una de las ideas más poderosas de la historia de las matemáticas! El Teorema de Pitágoras establece que en todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los otros dos lados: a² + b² = c². Esto significa que si un triángulo tiene lados de 3 y 4, su hipotenusa mide exactamente 5, porque 9 + 16 = 25. Este teorema es una herramienta fundamental que usan hoy arquitectos, ingenieros, navegantes y hasta los programadores de videojuegos para calcular distancias.',

            'Aunque el teorema lleva su nombre, es importante saber que los babilonios ya conocían la relación entre los lados de un triángulo rectángulo más de mil años antes de Pitágoras. Se han encontrado tablillas de arcilla del año 1800 a.C. con listas de ternas pitagóricas como 3-4-5 y 5-12-13. Sin embargo, Pitágoras y su escuela fueron los primeros en demostrar matemáticamente por qué esta relación funciona siempre, para cualquier triángulo rectángulo. Pasar del "saber que funciona" al "demostrar por qué funciona" fue una revolución intelectual enorme.',

            'Uno de los descubrimientos más hermosos de Pitágoras fue la conexión entre la música y las matemáticas. Según la tradición, un día pasó frente a una herrería y notó que los martillos producían sonidos diferentes según su peso. Intrigado, experimentó con cuerdas de diferentes longitudes y descubrió algo asombroso: cuando una cuerda se divide exactamente a la mitad, produce una nota una octava más alta. Si se divide en tres partes, produce una quinta musical. Los intervalos musicales más agradables al oído correspondían a las razones numéricas más sencillas: 2:1, 3:2 y 4:3.',

            'Este descubrimiento de las razones musicales fue absolutamente revolucionario porque demostró que la belleza tenía una base matemática. Los sonidos que nos parecen armoniosos no son arbitrarios: están gobernados por relaciones numéricas precisas. Pitágoras concluyó que si la armonía musical obedecía a los números, quizás todo el cosmos funcionaba de la misma manera. Imaginó que los planetas, al moverse por el cielo, producían una "música de las esferas" que los humanos no podíamos escuchar pero que mantenía el universo en orden perfecto.',

            'Alrededor del año 530 a.C., Pitágoras se trasladó a la ciudad de Crotona, en el sur de Italia, donde fundó una escuela muy diferente a cualquier otra de su época. La escuela pitagórica era una comunidad donde los miembros vivían juntos, compartían sus posesiones y seguían reglas estrictas de conducta y alimentación. Los estudiantes se dividían en dos grupos: los "acusmáticos", que solo escuchaban las enseñanzas, y los "matemáticos", que participaban activamente en la investigación. Para entrar al círculo interior, había que pasar cinco años de silencio escuchando las lecciones del maestro.',

            'Se dice que Pitágoras fue el primero en usar la palabra "filósofo", que en griego significa "amante de la sabiduría". Según la tradición, cuando alguien lo llamó "sabio", él respondió humildemente que no era sabio, sino simplemente alguien que amaba la sabiduría y la buscaba constantemente. Esta distinción puede parecer pequeña, pero encierra una idea profunda: el verdadero conocimiento no es algo que se posee de una vez, sino un camino que se recorre toda la vida con curiosidad y humildad.',

            'Los pitagóricos hicieron descubrimientos matemáticos extraordinarios más allá del famoso teorema. Estudiaron los números figurados, como los números triangulares (1, 3, 6, 10...) y los números cuadrados (1, 4, 9, 16...), descubriendo patrones fascinantes entre ellos. También exploraron la idea de los números perfectos, como el 6, que es igual a la suma de sus divisores (1+2+3=6). Estas investigaciones sentaron las bases de la teoría de números, una rama de las matemáticas que sigue siendo vital en la actualidad, especialmente en la criptografía que protege nuestras comunicaciones digitales.',

            'Sin embargo, los pitagóricos también se enfrentaron a un descubrimiento que los horrorizó: los números irracionales. Cuando intentaron calcular la diagonal de un cuadrado de lado 1, descubrieron que el resultado era la raíz cuadrada de 2, un número que no puede expresarse como una fracción de dos enteros. Esto contradecía su creencia fundamental de que todo en el universo podía expresarse con números enteros y sus razones. Según la leyenda, el pitagórico que reveló este secreto al mundo exterior, Hipaso de Metaponto, fue expulsado de la comunidad o incluso ahogado en el mar.',

            'Pitágoras y sus seguidores también contribuyeron a la astronomía. Fueron de los primeros en proponer que la Tierra era una esfera, basándose en observaciones como la forma circular de la sombra de la Tierra durante los eclipses lunares. Además, reconocieron que la "estrella de la mañana" y la "estrella de la tarde" eran en realidad el mismo astro: el planeta Venus. Algunos pitagóricos posteriores, como Filolao, incluso sugirieron que la Tierra se movía, una idea revolucionaria que no sería aceptada hasta que Copérnico la retomó casi dos mil años después.',

            'La escuela pitagórica fue única porque aceptaba a mujeres como miembros plenos, algo extraordinario para la antigua Grecia. Teano, quien según algunas fuentes fue esposa de Pitágoras y según otras su discípula más destacada, contribuyó a las matemáticas y la filosofía por derecho propio. Otras mujeres pitagóricas incluyen a Myia y Damo, supuestas hijas de Pitágoras. En una sociedad donde las mujeres rara vez recibían educación, la comunidad pitagórica fue un oasis de igualdad intelectual.',

            'La vida de Pitágoras terminó de manera trágica. Alrededor del año 495 a.C., una revuelta política en Crotona destruyó la comunidad pitagórica. Los ciudadanos, resentidos por la influencia política de los pitagóricos, atacaron sus lugares de reunión y persiguieron a sus miembros. Según algunas versiones, Pitágoras logró escapar pero murió poco después en Metaponto. Otras dicen que murió durante el ataque mismo. Tenía aproximadamente 75 años, una edad muy avanzada para la época.',

            'El legado de Pitágoras va mucho más allá de su teorema. Su idea de que el universo puede ser comprendido a través de las matemáticas es el fundamento mismo de la ciencia moderna. Cuando los físicos actuales usan ecuaciones para describir la gravedad, la luz o las partículas subatómicas, están siguiendo el camino que Pitágoras abrió hace más de dos milenios. Galileo Galilei dijo que "el libro de la naturaleza está escrito en lenguaje matemático", y esa idea nació con Pitágoras en la antigua Grecia.',

            '¡En el próximo módulo conocerás a un gigante del conocimiento que quiso estudiar absolutamente todo! Aristóteles de Estagira fue alumno de Platón, maestro de Alejandro Magno, y escribió sobre biología, física, lógica, política y mucho más. Sus ideas dominaron la ciencia durante casi 2.000 años. ¿Estás listo para explorar la mente más enciclopédica de la antigüedad? ¡Adelante, joven explorador!'
          ],
          image: '/assets/griegos_ciencia/griegos_m2.png',
          imgCaption: 'Pitágoras descubriendo la relación entre la música y los números',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué establece el Teorema de Pitágoras?', options: ['Que la Tierra es redonda', 'Que a² + b² = c² en un triángulo rectángulo', 'Que los planetas giran alrededor del Sol', 'Que el agua es el elemento fundamental'], a: 1 },
      { q: '¿Qué descubrió Pitágoras sobre la música?', options: ['Que los instrumentos fueron inventados en Egipto', 'Que los intervalos musicales corresponden a razones numéricas', 'Que el sonido no viaja en el vacío', 'Que las canciones curan enfermedades'], a: 1 },
      { q: '¿En qué ciudad del sur de Italia fundó Pitágoras su famosa escuela?', options: ['Roma', 'Nápoles', 'Crotona', 'Siracusa'], a: 2 },
    ],
  },
  {
    id: 'griegos_m3',
    order: 11003,
    titleEn: 'Aristotle: The Observer of Nature',
    titleEs: 'Aristóteles: el observador de la naturaleza',
    badge: 'Universal Observer',
    badgeEs: 'Observador Universal',
    badgeIcon: '/assets/griegos_ciencia/griegos_m3.png',
    color: '#3498DB',
    icon: '/assets/griegos_ciencia/griegos_m3.png',
    contentEs: {
      sections: [
        {
          id: 'griegos_m3_s1',
          title: 'Aristóteles: el observador de la naturaleza',
          text: [
            '¿Sabías que hubo un hombre en la antigua Grecia que intentó estudiar absolutamente todo lo que existía: animales, plantas, estrellas, política, teatro, lógica e incluso la felicidad? Ese hombre fue Aristóteles, nacido en el año 384 a.C. en Estagira, una pequeña ciudad en la región de Macedonia, al norte de Grecia. Su padre, Nicómaco, era médico personal del rey Amintas III de Macedonia, lo que le dio a Aristóteles desde niño un contacto directo con la observación cuidadosa del cuerpo humano y la naturaleza. Esta herencia médica marcaría toda su forma de hacer ciencia.',

            'A los 17 años, Aristóteles viajó a Atenas para estudiar en la Academia de Platón, la universidad más prestigiosa del mundo antiguo. Platón fue un filósofo extraordinario que creía que la verdadera realidad estaba en las ideas perfectas, no en el mundo material que vemos y tocamos. Aristóteles estudió allí durante 20 años, pero gradualmente desarrolló ideas muy diferentes a las de su maestro. Mientras Platón miraba hacia el cielo de las ideas abstractas, Aristóteles prefería mirar hacia la tierra, observar los animales, las plantas y las rocas con sus propios ojos.',

            '¡Prepárate para uno de los datos más impresionantes de la historia! Cuando el rey Filipo II de Macedonia buscó al mejor tutor posible para su hijo adolescente, eligió a Aristóteles. Ese adolescente era nada menos que Alejandro, quien se convertiría en Alejandro Magno, uno de los conquistadores más grandes de todos los tiempos. Entre los años 343 y 340 a.C., Aristóteles enseñó a Alejandro literatura, ciencia, medicina y filosofía en la ciudad de Mieza. Se dice que Alejandro llevaba siempre consigo una copia de la Ilíada de Homero que Aristóteles le había anotado personalmente.',

            'En el año 335 a.C., Aristóteles regresó a Atenas y fundó su propia escuela: el Liceo. Este centro de estudios se encontraba en un bosque sagrado dedicado a Apolo Licio, cerca de las murallas de la ciudad. Aristóteles tenía la costumbre de enseñar mientras caminaba por los senderos arbolados del Liceo, razón por la cual sus seguidores fueron llamados "peripatéticos", del griego "peripatein", que significa caminar. El Liceo tenía una biblioteca impresionante, jardines botánicos y colecciones de especímenes naturales enviados desde todos los rincones del imperio de Alejandro.',

            'Aristóteles fue el primer biólogo sistemático de la historia. Estudió y clasificó más de 500 especies de animales, diseccionando cuidadosamente muchos de ellos para entender su anatomía interna. Dividió el reino animal en dos grandes grupos: los que tenían sangre roja (que hoy llamamos vertebrados) y los que no la tenían (invertebrados). Observó que los delfines eran mamíferos y no peces, algo que mucha gente no aceptaría hasta siglos después. También describió con precisión el desarrollo del embrión de pollo dentro del huevo, abriendo cáscaras en diferentes etapas para seguir su crecimiento.',

            'Su método de investigación era revolucionario para su época: observar primero, clasificar después y explicar finalmente. Aristóteles no se conformaba con teorías abstractas; quería tocar, ver y examinar la realidad directamente. Diseccionó pulpos, estudió el comportamiento de las abejas, observó cómo los peces respiraban y examinó la reproducción de los tiburones. Sus descripciones eran tan detalladas y precisas que Charles Darwin, más de dos mil años después, dijo que Aristóteles era uno de los naturalistas más grandes que jamás habían existido.',

            'Aristóteles escribió sobre una cantidad asombrosa de temas. Se conservan obras suyas sobre física, biología, zoología, lógica, ética, política, retórica, poética, meteorología y metafísica. En total, se le atribuyen alrededor de 200 tratados, aunque solo han sobrevivido unos 31. Sus escritos formaron la base del conocimiento occidental durante casi dos milenios. Es difícil encontrar otro ser humano en toda la historia que haya escrito con autoridad sobre tantos campos diferentes del saber.',

            'En el campo de la lógica, Aristóteles creó un sistema de razonamiento llamado silogismo que se convirtió en la base del pensamiento científico y filosófico. Un silogismo funciona así: "Todos los hombres son mortales; Sócrates es un hombre; por lo tanto, Sócrates es mortal." Este método de deducción permitía llegar a conclusiones verdaderas partiendo de premisas verdaderas. Durante más de dos mil años, la lógica aristotélica fue considerada la forma correcta y definitiva de razonar, y sigue siendo fundamental en la filosofía y las matemáticas.',

            'Sin embargo, Aristóteles también cometió errores importantes, especialmente en la física. Creía que los objetos pesados caían más rápido que los ligeros, que la Tierra estaba inmóvil en el centro del universo y que los cuerpos celestes eran perfectos e inmutables. Pensaba que para que un objeto se moviera, algo tenía que estar empujándolo constantemente. Estas ideas parecían lógicas basándose en la observación cotidiana, pero eran incorrectas. Harían falta casi 2.000 años para que científicos como Galileo y Newton las corrigieran.',

            'La física aristotélica proponía que todo estaba compuesto por cuatro elementos: tierra, agua, aire y fuego. Cada elemento tenía su "lugar natural": la tierra y el agua iban hacia abajo, el aire y el fuego hacia arriba. Según Aristóteles, una piedra caía al suelo porque estaba hecha principalmente de tierra y buscaba su lugar natural. Aunque esta teoría era elegante y parecía explicar muchos fenómenos, era fundamentalmente errónea. No fue hasta la revolución científica del siglo XVII que estas ideas fueron reemplazadas por las leyes de Newton.',

            'La influencia de Aristóteles en la historia fue inmensa, tanto positiva como negativa. Por un lado, estableció el método de observación empírica y clasificación que es la base de toda ciencia. Por otro lado, su autoridad fue tan grande que durante la Edad Media sus ideas se convirtieron casi en dogma: cuestionar a Aristóteles era casi tan peligroso como cuestionar la Biblia. La Iglesia Católica adoptó muchas de sus ideas, y desafiarlas requirió un coraje enorme por parte de científicos como Galileo Galilei.',

            'Aristóteles también hizo contribuciones fundamentales a la ética y la política. En su obra "Ética a Nicómaco", dedicada a su hijo, argumentó que la felicidad es el objetivo último de la vida humana, y que se alcanza a través de la práctica de las virtudes. En "Política", analizó diferentes formas de gobierno y concluyó que la mejor era una mezcla de democracia y oligarquía. Estas ideas influyeron profundamente en el pensamiento político occidental y siguen siendo debatidas por los filósofos de hoy.',

            'Tras la muerte de Alejandro Magno en el año 323 a.C., el sentimiento antimacedonio se extendió por Atenas. Aristóteles, por su conexión con Macedonia, fue acusado de impiedad. Recordando el destino de Sócrates, que había sido condenado a muerte por la ciudad, Aristóteles decidió abandonar Atenas diciendo que no permitiría que los atenienses "pecaran dos veces contra la filosofía". Se retiró a Calcis, en la isla de Eubea, donde falleció en el año 322 a.C., a los 62 años de edad.',

            'El legado de Aristóteles es tan vasto que resulta casi imposible de resumir. Creó disciplinas enteras del conocimiento, estableció métodos de investigación que seguimos usando, y planteó preguntas fundamentales que la humanidad sigue intentando responder. Fue el primer pensador que intentó crear un sistema completo del conocimiento humano, abarcando desde los organismos más pequeños hasta la estructura del cosmos. Como dijo el filósofo Bertrand Russell: "Casi toda la sabiduría del mundo occidental se remonta a Aristóteles."',

            '¡En el próximo módulo te espera uno de los inventores más geniales de todos los tiempos! Arquímedes de Siracusa diseñó máquinas de guerra increíbles, descubrió las leyes de la flotación gritando "¡Eureka!" y calculó el número pi con una precisión asombrosa. Su historia está llena de aventuras, ingenio y un final tan dramático que sigue conmoviendo a la gente después de más de 2.200 años. ¡No te lo pierdas!'
          ],
          image: '/assets/griegos_ciencia/griegos_m3.png',
          imgCaption: 'Aristóteles observando y clasificando la naturaleza en el Liceo de Atenas',
        },
      ],
    },
    quizEs: [
      { q: '¿A quién fue tutor Aristóteles durante su juventud?', options: ['Julio César', 'Alejandro Magno', 'Pericles', 'El faraón Ramsés II'], a: 1 },
      { q: '¿Cómo se llamaba la escuela que Aristóteles fundó en Atenas?', options: ['La Academia', 'El Liceo', 'El Ágora', 'El Partenón'], a: 1 },
      { q: '¿En qué campo fue Aristóteles el primer investigador sistemático?', options: ['Astronomía', 'Química', 'Biología', 'Arquitectura'], a: 2 },
    ],
  },
  {
    id: 'griegos_m4',
    order: 11004,
    titleEn: 'Archimedes: Levers, Mirrors and Eureka!',
    titleEs: 'Arquímedes: palancas, espejos y ¡Eureka!',
    badge: 'Genius Inventor',
    badgeEs: 'Inventor Genial',
    badgeIcon: '/assets/griegos_ciencia/griegos_m4.png',
    color: '#FFD700',
    icon: '/assets/griegos_ciencia/griegos_m4.png',
    contentEs: {
      sections: [
        {
          id: 'griegos_m4_s1',
          title: 'Arquímedes: palancas, espejos y ¡Eureka!',
          text: [
            '¡Imagina a un hombre tan apasionado por las matemáticas que se olvidaba de comer, de bañarse y de vestirse! Ese hombre fue Arquímedes de Siracusa, nacido alrededor del año 287 a.C. en la ciudad de Siracusa, en la isla de Sicilia. Arquímedes fue un matemático, físico, ingeniero, inventor y astrónomo que muchos consideran el científico más brillante de toda la antigüedad. Sus descubrimientos fueron tan avanzados para su época que parecían magia, y sus inventos defendieron una ciudad entera contra el ejército más poderoso del mundo.',

            'Siracusa era una de las ciudades griegas más ricas e importantes del Mediterráneo occidental. Arquímedes era hijo de un astrónomo llamado Fidias, y posiblemente estaba emparentado con el rey Hierón II de Siracusa, quien fue su protector y mecenas durante toda su vida. De joven, Arquímedes viajó a Alejandría, en Egipto, para estudiar en la biblioteca y el museo más famosos del mundo antiguo. Allí conoció a otros grandes matemáticos como Conón de Samos y Eratóstenes de Cirene, con quienes mantuvo correspondencia toda su vida.',

            '¡La historia más famosa de Arquímedes es la del grito de "¡Eureka!"! El rey Hierón había encargado una corona de oro puro, pero sospechaba que el orfebre había mezclado el oro con plata más barata. Le pidió a Arquímedes que descubriera la verdad sin dañar la corona. Un día, mientras Arquímedes se sumergía en su bañera, notó que el agua subía de nivel al entrar su cuerpo. En ese instante comprendió que podía usar el volumen de agua desplazada para calcular la densidad de la corona. Cuenta la leyenda que salió corriendo desnudo por las calles gritando "¡Eureka!" ("¡Lo encontré!").',

            'Este descubrimiento dio origen al famoso Principio de Arquímedes, una de las leyes fundamentales de la física. El principio establece que todo cuerpo sumergido en un fluido experimenta una fuerza hacia arriba (empuje) igual al peso del fluido que desplaza. Esta ley explica por qué los barcos enormes de acero pueden flotar, por qué los globos aerostáticos se elevan y por qué nosotros nos sentimos más ligeros dentro del agua. Es una de las leyes más elegantes y prácticas de toda la física, y se sigue aplicando en la ingeniería naval, la hidráulica y muchos otros campos.',

            'Arquímedes fue un genio de las matemáticas que calculó el número pi (π) con mayor precisión que nadie antes que él. Utilizó un método brillante: inscribió y circunscribió polígonos regulares dentro y fuera de un círculo, empezando con hexágonos y llegando hasta polígonos de 96 lados. Con este método, demostró que pi estaba entre 3 + 10/71 y 3 + 1/7, es decir, entre aproximadamente 3,1408 y 3,1429. Esta fue la aproximación más precisa del mundo antiguo y un logro matemático extraordinario que no sería superado hasta varios siglos después.',

            'Una de las frases más célebres de la historia de la ciencia se atribuye a Arquímedes: "Dadme un punto de apoyo y moveré el mundo." Con esta frase expresaba la potencia del principio de la palanca, que él formuló matemáticamente. Arquímedes demostró que con una palanca suficientemente larga y un punto de apoyo adecuado, una persona podía levantar cualquier peso, sin importar cuán grande fuera. Este principio no es solo teórico: se aplica en las balanzas, las catapultas, los remos de un bote, las tijeras, los cascanueces e incluso en nuestros propios brazos, que funcionan como palancas.',

            'El tornillo de Arquímedes es uno de los inventos más ingeniosos y duraderos de la historia. Se trata de un dispositivo con forma de espiral dentro de un tubo cilíndrico que, al girarlo, eleva agua desde un nivel bajo a uno más alto. Fue diseñado originalmente para sacar el agua de los barcos o para irrigar campos de cultivo. Lo más asombroso es que este invento de hace más de 2.200 años sigue usándose hoy en día en plantas de tratamiento de aguas, en la agricultura y en diversas aplicaciones industriales. ¡Un diseño tan perfecto que no ha necesitado mejoras en más de dos milenios!',

            'Cuando los romanos atacaron Siracusa en el año 214 a.C., durante la Segunda Guerra Púnica, Arquímedes diseñó máquinas de guerra extraordinarias para defender su ciudad. Construyó catapultas capaces de lanzar rocas enormes contra los barcos romanos, grúas gigantes llamadas "garras de Arquímedes" que podían agarrar los barcos enemigos por la proa y volcarlos, y según algunas fuentes, incluso utilizó espejos para concentrar los rayos del sol y prender fuego a las naves romanas. El general romano Marco Claudio Marcelo quedó tan impresionado que ordenó a sus tropas capturar a Arquímedes con vida.',

            'Las máquinas de Arquímedes mantuvieron a raya al poderoso ejército romano durante casi tres años, una hazaña militar sin precedentes. El historiador romano Plutarco escribió que los soldados romanos temblaban de terror cada vez que veían asomarse una cuerda o un palo por encima de las murallas de Siracusa, pensando que era otra de las temibles máquinas de Arquímedes. Un solo hombre, armado con su ingenio y sus conocimientos de física y matemáticas, logró lo que ejércitos enteros no podían: resistir el poder de Roma.',

            'Arquímedes también hizo descubrimientos fundamentales sobre los centros de gravedad y el equilibrio de los cuerpos. Calculó los centros de gravedad de diversas figuras geométricas, incluyendo triángulos, paraboloides y hemisferios. Estos cálculos pueden parecer abstractos, pero son esenciales para la ingeniería: para construir un puente que no se caiga o un barco que no vuelque, hay que saber exactamente dónde está su centro de gravedad. Arquímedes puso los cimientos de la mecánica estática, una disciplina que los ingenieros siguen usando cada día.',

            'En geometría, Arquímedes descubrió las relaciones entre esferas, cilindros y conos que lo llenaron de orgullo. Demostró que el volumen de una esfera es exactamente dos tercios del volumen del cilindro que la contiene, y que la superficie de la esfera también es dos tercios de la superficie total del cilindro. Estaba tan orgulloso de este descubrimiento que pidió que en su tumba se grabara la imagen de una esfera inscrita en un cilindro. Siglos después, el orador romano Cicerón encontró su tumba abandonada en Siracusa y la restauró al ver ese símbolo.',

            'Uno de sus trabajos más sorprendentes fue "El contador de arena", un tratado donde Arquímedes intentó calcular cuántos granos de arena cabrían en el universo. Para ello, inventó un sistema de numeración capaz de expresar números enormes, mucho más allá de lo que el sistema griego permitía. Estimó que el universo podría contener 10 elevado a la 63 granos de arena. Este ejercicio aparentemente lúdico demostró que las matemáticas podían manejar cantidades inimaginablemente grandes, anticipando conceptos modernos sobre el infinito y la notación exponencial.',

            'Arquímedes también diseñó un planetario mecánico, un dispositivo que reproducía los movimientos del Sol, la Luna y los planetas conocidos. Este mecanismo era tan preciso que podía predecir eclipses solares y lunares. Cuando el general Marcelo conquistó finalmente Siracusa, se llevó este planetario como su botín de guerra más preciado. Algunos historiadores creen que este tipo de dispositivos está relacionado con el famoso Mecanismo de Anticitera, una especie de computadora astronómica antigua encontrada en un naufragio griego.',

            'El final de Arquímedes fue trágico y se convirtió en una de las historias más conmovedoras de la antigüedad. En el año 212 a.C., cuando los romanos finalmente tomaron Siracusa, un soldado romano encontró a Arquímedes absorto en sus cálculos matemáticos, trazando figuras geométricas en la arena. El soldado le ordenó que lo acompañara ante el general Marcelo, pero Arquímedes, completamente concentrado en su problema, respondió: "No molestes mis círculos." El soldado, enfurecido, lo mató con su espada. Marcelo, quien había ordenado expresamente que se respetara la vida de Arquímedes, quedó profundamente entristecido.',

            '¡En el próximo módulo conocerás a un hombre que hizo algo que parece imposible: midió el tamaño de la Tierra usando solo un palo, una sombra y su brillante inteligencia! Eratóstenes de Cirene, director de la legendaria Biblioteca de Alejandría, calculó la circunferencia de nuestro planeta con una precisión asombrosa hace más de 2.200 años. ¿Cómo lo hizo? ¡Descúbrelo en el siguiente capítulo de esta aventura por la ciencia griega!'
          ],
          image: '/assets/griegos_ciencia/griegos_m4.png',
          imgCaption: 'Arquímedes descubriendo el principio de la flotación en su bañera: ¡Eureka!',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué gritó Arquímedes al descubrir el principio de la flotación?', options: ['¡Victoria!', '¡Eureka!', '¡Magnífico!', '¡Increíble!'], a: 1 },
      { q: '¿Qué invento de Arquímedes se usa todavía hoy para bombear agua?', options: ['La palanca de Arquímedes', 'El espejo solar', 'El tornillo de Arquímedes', 'La garra de Arquímedes'], a: 2 },
      { q: '¿Cómo murió Arquímedes en el año 212 a.C.?', options: ['De vejez en Atenas', 'Ahogado en el mar', 'Asesinado por un soldado romano durante la toma de Siracusa', 'Envenenado por sus enemigos'], a: 2 },
    ],
  },
  {
    id: 'griegos_m5',
    order: 11005,
    titleEn: 'Eratosthenes: The Man Who Measured the Earth',
    titleEs: 'Eratóstenes: el hombre que midió la Tierra',
    badge: 'Cosmic Geographer',
    badgeEs: 'Geógrafo Cósmico',
    badgeIcon: '/assets/griegos_ciencia/griegos_m5.png',
    color: '#2ECC71',
    icon: '/assets/griegos_ciencia/griegos_m5.png',
    contentEs: {
      sections: [
        {
          id: 'griegos_m5_s1',
          title: 'Eratóstenes: el hombre que midió la Tierra',
          text: [
            '¿Te imaginas poder medir el tamaño de todo el planeta Tierra sin salir de tu ciudad, usando solo un palo, la luz del Sol y tu inteligencia? Eso es exactamente lo que hizo Eratóstenes de Cirene hace más de 2.200 años, y lo más asombroso es que su resultado fue increíblemente preciso. Nacido alrededor del año 276 a.C. en Cirene, una ciudad griega en la actual Libia, Eratóstenes fue un genio multidisciplinario: matemático, geógrafo, astrónomo, poeta, filósofo y atleta. Su hazaña de medir la circunferencia terrestre es uno de los logros más brillantes de toda la ciencia antigua.',

            'Eratóstenes estudió en Atenas con los mejores maestros de su época, incluyendo al filósofo estoico Zenón de Citio y al poeta Calímaco. Su educación fue tan amplia y variada que sus contemporáneos lo apodaron "Beta" (la segunda letra del alfabeto griego), porque decían que era el segundo mejor en todo: segundo mejor matemático, segundo mejor geógrafo, segundo mejor poeta. Pero este apodo, que parecía un insulto, en realidad era un elogio extraordinario: ser el segundo mejor en tantas disciplinas diferentes lo convertía, en conjunto, en el intelectual más completo de su generación.',

            '¡Prepárate para conocer uno de los trabajos más geniales de la historia! Alrededor del año 245 a.C., el rey Ptolomeo III de Egipto invitó a Eratóstenes a dirigir la Biblioteca de Alejandría, la institución del conocimiento más importante del mundo antiguo. Esta biblioteca contenía cientos de miles de rollos de papiro con obras de filosofía, ciencia, literatura, historia y matemáticas de todas las civilizaciones conocidas. Ser su director era como ser el guardián de todo el saber humano, y Eratóstenes dedicó décadas de su vida a ampliar y organizar esta colección incomparable.',

            'El experimento más famoso de Eratóstenes nació de una observación aparentemente sencilla. Sabía que en la ciudad de Siena (la actual Asuán, en el sur de Egipto), el día del solsticio de verano, el Sol se reflejaba en el fondo de un pozo profundo, lo que significaba que estaba exactamente en la vertical, sin producir sombra alguna. Pero ese mismo día, en Alejandría, una vara clavada en el suelo sí proyectaba una pequeña sombra. Si la Tierra fuera plana, ambas ciudades verían el Sol exactamente en la misma posición. La diferencia de sombras solo podía significar una cosa: la superficie de la Tierra era curva.',

            'Con esta observación genial, Eratóstenes midió el ángulo de la sombra en Alejandría el día del solsticio de verano y encontró que era de aproximadamente 7,2 grados, es decir, una cincuentava parte de un círculo completo de 360 grados. Luego, sabía que la distancia entre Alejandría y Siena era de unos 5.000 estadios (una medida griega de distancia). Razonó que si 7,2 grados correspondían a 5.000 estadios, entonces los 360 grados completos de la circunferencia terrestre correspondían a 50 × 5.000 = 250.000 estadios. Convertido a kilómetros, esto equivale a aproximadamente 40.000 km.',

            'Lo verdaderamente asombroso es la precisión de su cálculo. La circunferencia real de la Tierra por los polos es de 40.075 km. Eratóstenes obtuvo un resultado sorprendentemente cercano a esta cifra hace más de 2.200 años, sin telescopios, sin satélites, sin computadoras, sin GPS. Solo usó observación, geometría y lógica. Este logro demuestra que la mente humana, armada con las herramientas del pensamiento racional, puede descifrar los secretos más grandes de la naturaleza incluso con los recursos más sencillos.',

            'Eratóstenes fue también el inventor de la palabra "geografía", que en griego significa "escritura de la Tierra". Creó el primer mapa del mundo conocido basado en principios científicos, utilizando un sistema de líneas paralelas y meridianos que recuerda a las coordenadas de latitud y longitud que usamos hoy. Su mapa abarcaba desde las Islas Británicas en el noroeste hasta Sri Lanka en el sureste, e incluía Europa, Asia y el norte de África. Aunque tenía errores inevitables, fue el mapa más preciso y científico creado hasta entonces.',

            'Además de medir la Tierra, Eratóstenes intentó calcular la distancia de la Tierra al Sol y a la Luna. Estimó la distancia al Sol en aproximadamente 804 millones de estadios y la distancia a la Luna en 780.000 estadios. Aunque estas estimaciones no eran tan precisas como su cálculo de la circunferencia terrestre, representaban un esfuerzo extraordinario por comprender las dimensiones del cosmos. El simple hecho de intentar medir distancias astronómicas con las herramientas limitadas de su época demuestra la ambición y el genio de Eratóstenes.',

            'En el campo de las matemáticas, Eratóstenes inventó un método elegante para encontrar números primos que sigue usándose hoy en día: la Criba de Eratóstenes. El método funciona así: escribes todos los números del 2 en adelante, y empiezas eliminando todos los múltiplos de 2 (excepto el 2 mismo), luego todos los múltiplos de 3, luego los de 5, y así sucesivamente. Los números que sobreviven a esta "criba" son los números primos. Este algoritmo es tan eficiente y elegante que los programadores de computadoras lo siguen implementando más de dos milenios después de su invención.',

            'Eratóstenes también hizo contribuciones importantes a la cronología, el estudio de las fechas históricas. Intentó crear una línea temporal unificada de la historia griega, estableciendo fechas para eventos como la Guerra de Troya y las primeras Olimpiadas. Su trabajo fue pionero en el intento de organizar el conocimiento histórico de forma sistemática y cronológica. Calculó que la primera Olimpiada se había celebrado en el año 776 a.C., una fecha que los historiadores modernos siguen aceptando como referencia.',

            'La Biblioteca de Alejandría bajo la dirección de Eratóstenes fue un lugar donde el conocimiento de todas las civilizaciones se reunía y preservaba. Los estudiosos de Alejandría copiaban y traducían textos de Grecia, Egipto, Persia, India y muchas otras culturas. La biblioteca no era solo un almacén de libros: era un centro de investigación vivo donde matemáticos, astrónomos, médicos y filósofos trabajaban juntos, intercambiaban ideas y hacían nuevos descubrimientos. Eratóstenes fue el corazón intelectual de esta institución durante más de cuarenta años.',

            'Eratóstenes también midió la inclinación del eje de la Tierra con respecto al plano de su órbita alrededor del Sol, lo que los astrónomos llaman la oblicuidad de la eclíptica. Calculó este ángulo en aproximadamente 23 grados y 51 minutos, un valor extremadamente cercano al valor actual de 23 grados y 26 minutos. Esta inclinación es la responsable de las estaciones del año: cuando el hemisferio norte está inclinado hacia el Sol, tenemos verano, y cuando está inclinado en la dirección opuesta, tenemos invierno. Una vez más, Eratóstenes demostró una precisión notable con herramientas muy básicas.',

            'Los últimos años de Eratóstenes fueron difíciles. Gradualmente perdió la vista, lo que para un hombre que vivía para leer y estudiar fue un golpe devastador. Según algunas fuentes antiguas, la ceguera lo sumió en una profunda tristeza, y decidió dejar de comer, falleciendo alrededor del año 194 a.C. a la edad de aproximadamente 82 años. Aunque su final fue triste, su vida fue extraordinariamente productiva y sus contribuciones al conocimiento humano son imperecederas.',

            'El legado de Eratóstenes es una inspiración para todos los que creen en el poder de la observación y el razonamiento. Con un simple palo y la sombra del Sol, midió nuestro planeta entero. Con un método sencillo, encontró los números primos. Con curiosidad y dedicación, dirigió la biblioteca más grande del mundo antiguo. Nos enseñó que no necesitas tecnología sofisticada para hacer grandes descubrimientos: solo necesitas una mente curiosa, ojos atentos y el valor de hacer las preguntas correctas.',

            '¡En el próximo y último módulo de este curso conocerás a una mujer extraordinaria que brilló con luz propia en un mundo dominado por hombres! Hipatia de Alejandría fue matemática, astrónoma y filósofa, y se convirtió en un símbolo del conocimiento y la razón en los últimos días del mundo antiguo. Su historia es inspiradora, conmovedora y un recordatorio de lo importante que es defender el saber contra la ignorancia. ¡No te pierdas el cierre de esta aventura por la ciencia griega!'
          ],
          image: '/assets/griegos_ciencia/griegos_m5.png',
          imgCaption: 'Eratóstenes midiendo la circunferencia de la Tierra con sombras y geometría',
        },
      ],
    },
    quizEs: [
      { q: '¿Cuál fue el resultado aproximado de Eratóstenes al medir la circunferencia de la Tierra?', options: ['20.000 km', '30.000 km', '40.000 km', '50.000 km'], a: 2 },
      { q: '¿Qué método matemático inventó Eratóstenes para encontrar números primos?', options: ['El teorema de Eratóstenes', 'La criba de Eratóstenes', 'La ecuación de Eratóstenes', 'La fórmula de Eratóstenes'], a: 1 },
      { q: '¿Qué importante institución dirigió Eratóstenes durante décadas?', options: ['La Academia de Atenas', 'El Liceo de Aristóteles', 'La Biblioteca de Alejandría', 'El Templo de Delfos'], a: 2 },
    ],
  },
  {
    id: 'griegos_m6',
    order: 11006,
    titleEn: 'Hypatia of Alexandria: The Last Scientist of the Ancient World',
    titleEs: 'Hipatia de Alejandría: la última científica del mundo antiguo',
    badge: 'Guardian of Knowledge',
    badgeEs: 'Guardiana del Conocimiento',
    badgeIcon: '/assets/griegos_ciencia/griegos_m6.png',
    color: '#9B59B6',
    icon: '/assets/griegos_ciencia/griegos_m6.png',
    contentEs: {
      sections: [
        {
          id: 'griegos_m6_s1',
          title: 'Hipatia de Alejandría: la última científica del mundo antiguo',
          text: [
            '¿Sabías que en el siglo IV de nuestra era, en la ciudad de Alejandría, una mujer se convirtió en la matemática y filósofa más respetada de todo el mundo mediterráneo? En una época en que las mujeres rara vez recibían educación, Hipatia de Alejandría no solo estudió sino que enseñó a los hombres más poderosos e inteligentes de su tiempo. Nacida alrededor del año 355 d.C., Hipatia es considerada una de las últimas grandes pensadoras del mundo antiguo, un faro de sabiduría y razón que brilló con fuerza en los años finales de la civilización clásica.',

            'Hipatia era hija de Teón de Alejandría, un destacado matemático y astrónomo que trabajaba en el Museo de Alejandría, la institución heredera de la legendaria Biblioteca. Teón fue un padre extraordinario que decidió educar a su hija con el mismo rigor que se educaba a los varones, algo excepcional en aquella época. Le enseñó matemáticas, astronomía, filosofía y retórica, y la animó a desarrollar tanto su cuerpo como su mente. Según las fuentes antiguas, Hipatia practicaba ejercicio físico regularmente, siguiendo la tradición griega de que una mente sana requiere un cuerpo sano.',

            '¡Prepárate para conocer a una científica que desafió todas las convenciones de su tiempo! Hipatia no se limitó a aprender lo que su padre le enseñaba: pronto superó a su maestro y se convirtió en una pensadora original e innovadora. Viajó a Atenas para completar su formación, donde estudió en la escuela neoplatónica y se ganó la admiración de sus profesores y compañeros. Cuando regresó a Alejandría, comenzó a enseñar en la escuela neoplatónica de la ciudad, atrayendo a estudiantes de todo el imperio romano que viajaban grandes distancias solo para escuchar sus lecciones.',

            'Una de las contribuciones más importantes de Hipatia fue su trabajo editorial sobre las obras de los grandes matemáticos antiguos. Editó y escribió comentarios sobre la "Aritmética" de Diofanto de Alejandría, una obra fundamental que trataba sobre ecuaciones y que se considera precursora del álgebra moderna. Diofanto planteaba problemas como "encontrar dos números cuya suma sea 20 y cuyo producto sea 96", y Hipatia añadió explicaciones y soluciones alternativas que hicieron el texto más accesible para los estudiantes. Gracias a su trabajo, estas obras sobrevivieron y llegaron hasta nosotros.',

            'Hipatia también editó y comentó los "Elementos" de Euclides y el "Almagesto" de Claudio Ptolomeo, la obra astronómica más importante del mundo antiguo. El "Almagesto" describía un modelo del universo con la Tierra en el centro, rodeada por esferas que contenían el Sol, la Luna, los planetas y las estrellas. El trabajo de edición de Hipatia sobre estas obras fue crucial para su preservación: sin sus comentarios claros y sus correcciones cuidadosas, muchos de estos textos fundamentales podrían haberse perdido para siempre.',

            'Además de sus contribuciones teóricas, Hipatia fue una inventora práctica. Según las fuentes antiguas, diseñó una versión mejorada del astrolabio, un instrumento usado para medir la posición de las estrellas y los planetas en el cielo. El astrolabio era como una computadora astronómica portátil: con él, los navegantes podían determinar su latitud, los astrónomos podían predecir la posición de los cuerpos celestes, y los fieles podían calcular la hora de las oraciones. Las mejoras de Hipatia hicieron que este instrumento fuera más preciso y fácil de usar.',

            'Hipatia también diseñó un hidrómetro, un instrumento para medir la densidad de los líquidos. Este dispositivo, descrito en una carta de su alumno Sinesio de Cirene, consistía en un tubo sellado con un peso en un extremo que se sumergía verticalmente en el líquido. Cuanto más denso era el líquido, menos se hundía el tubo. Este instrumento tenía aplicaciones prácticas en la medicina, la producción de vino y perfumes, y en la determinación de la pureza de los metales. El principio básico del hidrómetro sigue usándose hoy en día.',

            'Como maestra, Hipatia era legendaria. Enseñaba filosofía neoplatónica, matemáticas y astronomía a estudiantes que luego se convertirían en líderes políticos y religiosos del imperio romano. Su alumno más famoso fue Sinesio de Cirene, quien llegó a ser obispo de Ptolemaida y mantuvo una extensa correspondencia con ella que se ha conservado hasta nuestros días. En sus cartas, Sinesio la llama "madre, hermana y maestra" y le pide consejo sobre cuestiones científicas, filosóficas e incluso personales. Estas cartas son una de nuestras principales fuentes de información sobre la vida de Hipatia.',

            'Hipatia vivió en una época de enormes tensiones religiosas y políticas. Alejandría era un caldero de conflictos entre paganos, cristianos y judíos, y el poder político estaba cambiando rápidamente. El cristianismo se había convertido en la religión oficial del imperio romano, y los templos paganos estaban siendo cerrados y destruidos. En el año 391 d.C., el obispo Teófilo de Alejandría ordenó la destrucción del Serapeo, el último templo pagano importante de la ciudad, que también contenía una parte de la colección de la antigua biblioteca. Hipatia presenció cómo el mundo intelectual en el que había crecido se desmoronaba a su alrededor.',

            'A pesar de las tensiones religiosas, Hipatia mantenía buenas relaciones con personas de todas las creencias. Muchos de sus estudiantes eran cristianos, y el prefecto romano Orestes, un cristiano, era uno de sus más cercanos consejeros. Hipatia no atacaba el cristianismo ni ninguna otra religión: su devoción era hacia el conocimiento y la razón. Sin embargo, su influencia sobre Orestes la puso en conflicto con Cirilo, el nuevo y ambicioso obispo de Alejandría, quien veía a Hipatia como un obstáculo para su poder político sobre la ciudad.',

            'En marzo del año 415 d.C., ocurrió una de las tragedias más oscuras de la historia del conocimiento. Una turba de fanáticos religiosos, seguidores del obispo Cirilo, emboscó a Hipatia cuando viajaba en su carruaje por las calles de Alejandría. La arrancaron del carruaje, la arrastraron hasta una iglesia y allí la asesinaron brutalmente. Tenía aproximadamente 60 años. Este acto de violencia conmocionó al mundo romano y se convirtió en un símbolo de lo que sucede cuando el fanatismo triunfa sobre la razón.',

            'La muerte de Hipatia marcó simbólicamente el fin de una era. Aunque la actividad intelectual en Alejandría no terminó inmediatamente, el asesinato de su pensadora más prominente envió un mensaje escalofriante: el libre pensamiento ya no era seguro. Muchos eruditos abandonaron la ciudad en los años siguientes, llevándose sus conocimientos a otros lugares. La gran tradición de aprendizaje y descubrimiento que había comenzado con la fundación de la Biblioteca de Alejandría, más de 600 años antes, estaba llegando a su fin.',

            'El legado de Hipatia sobrevivió a su muerte. Sus ediciones de textos matemáticos y astronómicos fueron copiadas y transmitidas a través de los siglos, llegando al mundo islámico medieval y luego a la Europa del Renacimiento. Sin su trabajo de preservación, obras fundamentales de Diofanto, Euclides y Ptolomeo podrían haberse perdido. En cierto sentido, cada vez que un estudiante de matemáticas estudia geometría euclidiana o resuelve una ecuación diofántica, está beneficiándose del trabajo silencioso pero esencial que Hipatia realizó en Alejandría.',

            'Hipatia se ha convertido en un poderoso símbolo de la defensa del conocimiento y la razón contra la intolerancia. En 2009, el director Alejandro Amenábar llevó su historia al cine con la película "Ágora", protagonizada por Rachel Weisz. Un asteroide del cinturón principal lleva su nombre (238 Hypatia), así como un cráter en la Luna. Su historia nos recuerda que el conocimiento es frágil y valioso, que debe ser defendido y compartido, y que las mujeres han contribuido a la ciencia desde los inicios mismos de la civilización.',

            '¡Has completado este viaje por la ciencia de la antigua Grecia! Desde Tales, que buscó las primeras explicaciones naturales, hasta Hipatia, que luchó por preservar el saber antiguo, estos seis científicos nos enseñaron que la curiosidad, la razón y el coraje intelectual son las herramientas más poderosas de la humanidad. Ellos encendieron la antorcha del conocimiento hace más de 2.500 años, y esa antorcha sigue ardiendo hoy en cada laboratorio, cada aula y cada mente que se atreve a preguntar: "¿Por qué?" ¡Felicidades, joven explorador, ahora eres un guardián de ese legado!'
          ],
          image: '/assets/griegos_ciencia/griegos_m6.png',
          imgCaption: 'Hipatia de Alejandría enseñando matemáticas y astronomía en la escuela neoplatónica',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué instrumento astronómico mejoró Hipatia?', options: ['El telescopio', 'El astrolabio', 'El sextante', 'La brújula'], a: 1 },
      { q: '¿Qué obras matemáticas editó y comentó Hipatia para preservarlas?', options: ['Las obras de Pitágoras y Tales', 'Las obras de Diofanto y Ptolomeo', 'Las obras de Arquímedes y Euclides', 'Las obras de Sócrates y Platón'], a: 1 },
      { q: '¿En qué año fue asesinada Hipatia por una turba de fanáticos?', options: ['315 d.C.', '370 d.C.', '415 d.C.', '476 d.C.'], a: 2 },
    ],
  },
];
