// Curso: Albert Einstein — El Genio que Dobló el Universo
// 6 módulos con contenido educativo en español y 3 preguntas de quiz cada uno
export const EINSTEIN_COURSE_DATA = [
  {
    id: 'einstein_m1',
    order: 10001,
    titleEn: 'Young Albert: From Munich to Zurich',
    titleEs: 'El joven Albert: de Múnich a Zúrich',
    badge: 'Rebel Genius',
    badgeEs: 'Genio Rebelde',
    badgeIcon: '/assets/albert_einstein/einstein_m1.png',
    color: '#FF4500',
    icon: '/assets/albert_einstein/einstein_m1.png',
    contentEs: {
      sections: [
        {
          id: 'einstein_m1_s1',
          title: 'El joven Albert: de Múnich a Zúrich',
          text: [
            '¿Sabías que el científico más famoso de la historia casi fue considerado un mal estudiante? Albert Einstein nació el 14 de marzo de 1879 en la ciudad de Ulm, en el sur de Alemania. Su familia era judía y de clase media; su padre Hermann trabajaba como ingeniero eléctrico y su madre Pauline era una mujer culta y amante de la música. Curiosamente, el pequeño Albert tardó tanto en hablar que sus padres llegaron a preocuparse de que tuviera algún problema de desarrollo.',

            'Cuando Albert tenía apenas un año, su familia se mudó a Múnich, donde su padre y su tío Jakob abrieron una empresa de equipos eléctricos llamada Elektrotechnische Fabrik J. Einstein & Cie. Fue en Múnich donde Albert pasó la mayor parte de su infancia, rodeado de bobinas, imanes y aparatos eléctricos que despertaron su curiosidad infinita. La casa de los Einstein era un pequeño laboratorio donde el niño podía explorar y hacer preguntas sin parar.',

            '¡Prepárate para una historia que cambió la vida de Albert para siempre! Cuando tenía cinco años, su padre le regaló una brújula de bolsillo mientras estaba enfermo en cama. El pequeño Albert quedó absolutamente fascinado: ¿cómo era posible que la aguja siempre apuntara al norte, sin que nadie la tocara? Algo invisible y misterioso la estaba moviendo. Años después, Einstein confesó que ese momento fue una revelación: comprendió que el universo estaba lleno de fuerzas ocultas esperando ser descubiertas.',

            'La relación de Albert con la escuela fue complicada desde el principio. En el Luitpold Gymnasium de Múnich, el sistema educativo era extremadamente rígido y militarista: los alumnos debían memorizar datos sin cuestionar y obedecer sin preguntar. Para un niño curioso como Albert, que necesitaba entender el "por qué" de cada cosa, este método era una tortura. Algunos profesores llegaron a decirle que nunca llegaría a nada en la vida porque hacía demasiadas preguntas y no respetaba la autoridad.',

            'Sin embargo, Albert no era un mal estudiante en todas las materias. Adoraba las matemáticas y la física, materias en las que sobresalía con facilidad. Su tío Jakob le enseñó álgebra cuando era muy pequeño, presentándola como un juego de detectives: "Es como cazar un animalito que no conocemos, así que lo llamamos X hasta que lo atrapamos". A los doce años, Albert había aprendido geometría euclidiana por su cuenta y se había enamorado de un libro de geometría que él llamaba "el librito sagrado de geometría".',

            'A los quince años, la empresa eléctrica de su padre fracasó y la familia Einstein decidió mudarse a Italia, primero a Milán y luego a Pavía, buscando nuevas oportunidades de negocio. Pero Albert se quedó solo en Múnich para terminar sus estudios en el Gymnasium. La soledad y la rigidez de la escuela se volvieron insoportables. Albert odiaba el ambiente opresivo y la disciplina casi militar de la educación prusiana, que aplastaba cualquier chispa de creatividad.',

            'Albert tomó una decisión drástica y valiente: a los dieciséis años, abandonó el Gymnasium sin graduarse y se reunió con su familia en Italia. Para evitar el servicio militar obligatorio en Alemania, renunció a su ciudadanía alemana, quedándose durante un tiempo sin nacionalidad. Imagina lo que significa tener dieciséis años y ser un joven sin país, sin diploma y con un futuro incierto. Pero Albert tenía un plan: quería estudiar en la famosa Escuela Politécnica Federal de Zúrich, en Suiza.',

            'En 1895, Albert intentó ingresar a la Escuela Politécnica Federal de Zúrich (hoy conocida como ETH Zurich), pero tenía un problema: era dos años menor que la edad mínima de admisión. Le permitieron hacer el examen de ingreso de todas formas y, aunque obtuvo notas brillantes en matemáticas y física, reprobó en francés, botánica y zoología. El director de la escuela, impresionado por sus habilidades científicas, le recomendó terminar el bachillerato en la escuela cantonal de Aarau.',

            'La escuela de Aarau fue una revelación para Albert. A diferencia del rígido Gymnasium de Múnich, este colegio suizo seguía métodos pedagógicos modernos inspirados en las ideas del educador Johann Heinrich Pestalozzi. Los estudiantes eran animados a pensar de manera independiente, a hacer experimentos y a cuestionar todo. Albert floreció en este ambiente de libertad intelectual, sacando las mejores notas de su clase y recuperando su confianza en sí mismo.',

            'En Aarau, Albert vivió con la familia del profesor Jost Winteler, quienes lo acogieron como a un hijo más. Se enamoró de Marie Winteler, la hija del profesor, y disfrutó de una vida familiar cálida que contrastaba con la soledad de Múnich. Fue también en Aarau donde Albert realizó su primer experimento mental famoso: se preguntó qué vería si pudiera cabalgar sobre un rayo de luz. Esta pregunta aparentemente sencilla lo llevaría, diez años después, a la teoría de la relatividad.',

            'En 1896, Albert aprobó el examen de ingreso a la ETH Zurich con excelentes calificaciones y comenzó sus estudios universitarios en la sección de enseñanza de matemáticas y física. En la ETH conoció a Mileva Marić, una joven serbia que era la única mujer en su clase de física, algo extraordinariamente raro en aquella época. Mileva era brillante, independiente y apasionada por la ciencia, y entre ella y Albert surgió una profunda conexión intelectual y romántica.',

            'Durante sus años en la ETH, Albert se destacó por su brillantez pero también por su rebeldía. Faltaba a muchas clases que consideraba aburridas y prefería estudiar por su cuenta los trabajos de físicos como Maxwell, Boltzmann y Hertz. Esto irritaba a algunos profesores, especialmente a Heinrich Weber, quien llegó a decirle: "Eres un chico muy inteligente, Einstein, pero tienes un gran defecto: no dejas que nadie te enseñe nada". Albert dependía de los apuntes de su amigo Marcel Grossmann para aprobar los exámenes.',

            'Albert se graduó de la ETH en 1900, pero con notas que no fueron lo suficientemente altas como para conseguir un puesto de asistente en la universidad, que era el camino habitual para una carrera académica. Varios profesores se negaron a recomendarlo debido a su actitud independiente y rebelde. Durante casi dos años, Einstein pasó por momentos muy difíciles, trabajando como tutor particular y profesor sustituto para sobrevivir mientras buscaba desesperadamente un empleo estable.',

            'La salvación llegó en 1902, cuando su amigo Marcel Grossmann le consiguió un puesto como examinador técnico de tercera clase en la Oficina Federal de Patentes de Berna. El trabajo consistía en evaluar solicitudes de patentes y determinar si los inventos eran originales y viables. Aunque parecía un empleo modesto para alguien con la inteligencia de Einstein, resultó ser perfecto: le dejaba tiempo libre para pensar en física y le entrenaba para analizar ideas con rapidez y precisión.',

            'Así, el joven Albert Einstein se encontraba en Berna, trabajando de lunes a sábado en la oficina de patentes, con un salario modesto pero con la mente más libre que nunca. Nadie en aquella tranquila ciudad suiza sospechaba que aquel empleado de 23 años con el pelo despeinado y la mirada soñadora estaba a punto de revolucionar toda la física. ¡Prepárate para descubrir lo que ocurrió en el próximo módulo: el año más increíble de la historia de la ciencia!',
          ],
          image: '/assets/albert_einstein/einstein_m1.png',
          imgCaption: 'El joven Albert Einstein durante sus años de estudiante en Zúrich.',
        },
      ],
    },
    quizEs: [
      { q: '¿En qué ciudad nació Albert Einstein?', options: ['Múnich, Alemania', 'Ulm, Alemania', 'Berna, Suiza', 'Viena, Austria'], a: 1 },
      { q: '¿Qué objeto le regaló su padre a los cinco años que despertó su curiosidad por la ciencia?', options: ['Un telescopio', 'Una brújula', 'Un microscopio', 'Un libro de matemáticas'], a: 1 },
      { q: '¿En qué institución estudió Einstein su carrera universitaria?', options: ['Universidad de Múnich', 'Universidad de Berlín', 'La Escuela Politécnica Federal de Zúrich (ETH)', 'Universidad de Oxford'], a: 2 },
    ],
  },
  {
    id: 'einstein_m2',
    order: 10002,
    titleEn: '1905, the Annus Mirabilis: Four Revolutionary Papers',
    titleEs: '1905, el Annus Mirabilis: cuatro artículos revolucionarios',
    badge: 'Architect of Change',
    badgeEs: 'Arquitecto del Cambio',
    badgeIcon: '/assets/albert_einstein/einstein_m2.png',
    color: '#E74C3C',
    icon: '/assets/albert_einstein/einstein_m2.png',
    contentEs: {
      sections: [
        {
          id: 'einstein_m2_s1',
          title: '1905, el Annus Mirabilis: cuatro artículos revolucionarios',
          text: [
            '¡Prepárate para conocer el año más extraordinario en la historia de la ciencia! En 1905, un joven de apenas 26 años llamado Albert Einstein, que trabajaba como simple empleado en una oficina de patentes en Berna, Suiza, publicó cuatro artículos científicos que cambiaron para siempre nuestra comprensión del universo. Ese año fue tan revolucionario que los científicos lo llaman el "Annus Mirabilis", que en latín significa "año milagroso". Ningún científico antes ni después ha logrado algo similar en un solo año.',

            '¿Sabías que Einstein no era profesor universitario cuando hizo estos descubrimientos? Era un empleado de la Oficina Federal de Patentes suiza, evaluando solicitudes de inventos. Trabajaba seis días a la semana, de ocho de la mañana a seis de la tarde, y hacía su investigación científica en su tiempo libre: por las noches, los domingos y durante las pausas que le quedaban en la oficina. No tenía laboratorio, ni asistentes, ni acceso fácil a una biblioteca científica. Solo tenía su mente, papel y lápiz.',

            'El primer artículo revolucionario, publicado en marzo de 1905 en la prestigiosa revista Annalen der Physik, trataba sobre el efecto fotoeléctrico. Los científicos habían observado que cuando la luz golpea ciertos metales, estos liberan electrones, pero nadie podía explicar por qué esto solo ocurría con ciertos colores de luz. Einstein propuso una idea radical: la luz no es solo una onda continua, sino que también viene en pequeños paquetes de energía que él llamó "cuantos de luz" (hoy los llamamos fotones).',

            'La idea de que la luz pudiera comportarse como partículas era tan revolucionaria que muchos físicos la rechazaron al principio, incluyendo a Max Planck, quien irónicamente había sido el primero en proponer la idea de los "cuantos" de energía. Pero Einstein tenía razón, y su explicación del efecto fotoeléctrico fue tan importante que le valió el Premio Nobel de Física en 1921. Curiosamente, no recibió el Nobel por la relatividad, que es mucho más famosa, sino por este trabajo sobre la luz.',

            'El segundo artículo, publicado en mayo de 1905, abordaba un misterio que había fascinado a los científicos durante décadas: el movimiento browniano. En 1827, el botánico escocés Robert Brown había observado que los granos de polen suspendidos en agua se movían de forma errática y sin pausa, como si estuvieran vivos. Nadie había podido explicar satisfactoriamente por qué. Einstein demostró matemáticamente que este movimiento caótico era causado por millones de moléculas de agua invisibles golpeando los granos de polen desde todas las direcciones.',

            'Este artículo puede parecer menos espectacular que los otros, pero su importancia fue enorme: proporcionó la primera prueba matemática convincente de que los átomos y las moléculas realmente existen. En 1905, muchos científicos respetados, como Ernst Mach y Wilhelm Ostwald, todavía dudaban de la existencia de los átomos, considerándolos una hipótesis útil pero no una realidad comprobada. El trabajo de Einstein permitió al físico francés Jean Perrin realizar experimentos que confirmaron sus predicciones, lo que convenció a la comunidad científica de una vez por todas.',

            '¡Ahora viene lo más emocionante! El tercer artículo, publicado en junio de 1905, presentaba la teoría de la relatividad especial. Einstein partió de dos ideas aparentemente simples: primera, las leyes de la física son las mismas para todos los observadores que se mueven a velocidad constante; segunda, la velocidad de la luz en el vacío es siempre la misma, sin importar quién la mida ni a qué velocidad se mueva. De estos dos principios, Einstein dedujo consecuencias que desafiaban completamente el sentido común.',

            'La relatividad especial reveló que el tiempo no es absoluto: dos personas que se mueven a velocidades diferentes experimentan el paso del tiempo de manera distinta. Esto se llama dilatación temporal. Si pudieras viajar en una nave espacial casi a la velocidad de la luz, el tiempo pasaría más lentamente para ti que para las personas que se quedaron en la Tierra. Un viaje que para ti dure un año podría equivaler a décadas enteras en la Tierra. Esto no es ciencia ficción: se ha comprobado experimentalmente con relojes atómicos en aviones y satélites.',

            'Otra consecuencia asombrosa de la relatividad especial es la contracción de la longitud: los objetos que se mueven a velocidades cercanas a la luz se encogen en la dirección del movimiento. Si pudieras ver una nave espacial pasando a un 90% de la velocidad de la luz, la verías aplastada, mucho más corta de lo que realmente es cuando está quieta. Cuanto más rápido se mueve un objeto, más corto parece. Estos efectos son reales, pero solo se notan a velocidades extremadamente altas, cercanas a los 300,000 kilómetros por segundo.',

            'La relatividad especial también demostró que nada puede viajar más rápido que la luz. Mientras un objeto se acerca a la velocidad de la luz, su masa efectiva aumenta cada vez más, y se necesitaría una cantidad infinita de energía para acelerarlo hasta alcanzarla. Es como empujar un carro que se hace más y más pesado cada vez que empujas: nunca podrías llegar a esa velocidad máxima. La velocidad de la luz, 299,792,458 metros por segundo, es el límite de velocidad cósmico del universo.',

            'El cuarto artículo, publicado en septiembre de 1905, era casi una nota adicional de apenas tres páginas, pero contenía la ecuación más famosa de la historia: E=mc². Einstein demostró que la masa y la energía son dos formas de lo mismo y que una pequeña cantidad de masa puede convertirse en una enorme cantidad de energía. La "c" en la ecuación representa la velocidad de la luz, y como ese número es gigantesco, incluso un gramo de materia contiene una cantidad de energía casi inimaginable.',

            'Para entender cuánta energía hay encerrada en la materia, imagina esto: si pudieras convertir completamente en energía un clip de papel, que pesa aproximadamente un gramo, liberarías tanta energía como la explosión de 21,000 toneladas de dinamita. Eso es comparable a la bomba atómica que destruyó Hiroshima. Y eso es solo un clip de papel. La ecuación E=mc² explica por qué el Sol puede brillar durante miles de millones de años: convierte millones de toneladas de masa en energía pura cada segundo.',

            'Los cuatro artículos fueron publicados en la revista Annalen der Physik, la publicación científica más prestigiosa de la física en aquella época. Al principio, casi nadie prestó atención a los trabajos de aquel desconocido empleado de patentes. Pero poco a poco, los físicos más importantes de la época comenzaron a leer sus artículos. Max Planck, uno de los fundadores de la física cuántica y el editor más influyente de la revista, fue uno de los primeros en reconocer la genialidad de Einstein.',

            'En la Universidad de Berna, un joven profesor llamado Max von Laue quedó tan impresionado por el artículo de la relatividad que viajó hasta la oficina de patentes para conocer a Einstein en persona. Cuando llegó, esperaba encontrar a un distinguido profesor, pero se topó con un joven desaliñado de 26 años sentado detrás de un escritorio lleno de papeles de patentes. Von Laue no podía creer que aquel hombre tan joven y sin posición académica hubiera escrito algo tan profundo. Los dos se hicieron amigos para toda la vida.',

            'El Annus Mirabilis de 1905 convirtió gradualmente a Einstein en una estrella de la física. Para 1909 ya era profesor en la Universidad de Zúrich, y para 1914 era director del Instituto Kaiser Wilhelm de Física en Berlín, el puesto científico más prestigioso de Alemania. Todo esto logrado por un hombre que cuatro años antes no podía conseguir trabajo como profesor. ¡En el próximo módulo exploraremos en detalle la ecuación más famosa del mundo: E=mc²!',
          ],
          image: '/assets/albert_einstein/einstein_m2.png',
          imgCaption: 'La portada de la revista Annalen der Physik, donde Einstein publicó sus revolucionarios artículos de 1905.',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué significa "Annus Mirabilis"?', options: ['Año increíble', 'Año milagroso', 'Año dorado', 'Año magnífico'], a: 1 },
      { q: '¿Cuál era el trabajo de Einstein cuando publicó sus artículos de 1905?', options: ['Profesor de universidad', 'Empleado en una oficina de patentes', 'Investigador en un laboratorio', 'Estudiante de doctorado'], a: 1 },
      { q: '¿Por cuál de sus descubrimientos recibió Einstein el Premio Nobel de Física?', options: ['La relatividad especial', 'La ecuación E=mc²', 'El efecto fotoeléctrico', 'El movimiento browniano'], a: 2 },
    ],
  },
  {
    id: 'einstein_m3',
    order: 10003,
    titleEn: 'E=mc²: Mass-Energy Equivalence',
    titleEs: 'E=mc²: la equivalencia masa-energía',
    badge: 'Energy Tamer',
    badgeEs: 'Domador de la Energía',
    badgeIcon: '/assets/albert_einstein/einstein_m3.png',
    color: '#FFD700',
    icon: '/assets/albert_einstein/einstein_m3.png',
    contentEs: {
      sections: [
        {
          id: 'einstein_m3_s1',
          title: 'E=mc²: la equivalencia masa-energía',
          text: [
            '¡Bienvenido al módulo donde descifraremos la ecuación más famosa jamás escrita! E=mc² es probablemente la única fórmula científica que la mayoría de las personas en el mundo reconoce, incluso si no saben exactamente qué significa. Aparece en camisetas, tatuajes, obras de arte y hasta en canciones. Pero detrás de esas cinco letras y un número se esconde una verdad tan profunda sobre el universo que, cuando Einstein la descubrió, cambió para siempre la forma en que entendemos la materia y la energía.',

            'Vamos a descifrar la ecuación letra por letra. La "E" representa la energía, medida en julios. La "m" es la masa del objeto, medida en kilogramos. Y la "c" es la velocidad de la luz en el vacío, que es exactamente 299,792,458 metros por segundo, un número tan enorme que los científicos lo redondean a 300,000 kilómetros por segundo. Cuando multiplicas la masa por la velocidad de la luz al cuadrado (c²), obtienes la cantidad de energía contenida en esa masa. Y como c² es un número gigantesco, incluso una masa diminuta contiene una energía colosal.',

            '¿Sabías que antes de Einstein, los científicos pensaban que la masa y la energía eran cosas completamente diferentes y sin relación? La masa era "sustancia", lo que podías tocar y pesar, mientras que la energía era movimiento, calor o luz. Einstein demostró que son dos caras de la misma moneda: la masa es energía concentrada, y la energía tiene masa. Es como descubrir que el hielo y el vapor son la misma cosa (agua) en formas diferentes. Esta idea fue absolutamente revolucionaria y tardó años en ser aceptada por la comunidad científica.',

            'Para entender la magnitud de la energía encerrada en la materia, hagamos un experimento mental. Imagina que tienes una botella de agua de un litro, que pesa un kilogramo. Si pudieras convertir toda esa masa en energía pura usando la ecuación E=mc², liberarías aproximadamente 90,000,000,000,000,000 julios de energía. Eso es noventa mil billones de julios, suficiente para alimentar una ciudad entera durante varios años. Todo encerrado en una simple botella de agua.',

            'Pero, ¿cómo es posible que nunca veamos esta energía en la vida cotidiana? La respuesta es que convertir masa en energía es extremadamente difícil. En la vida diaria, cuando quemas leña o gasoline, la energía que liberas viene de reacciones químicas que reorganizan los átomos, pero la masa total apenas cambia (la diferencia es tan pequeña que no la puedes medir con una balanza normal). Para liberar la energía descrita por E=mc², necesitas reacciones mucho más poderosas: reacciones nucleares.',

            'El Sol es el ejemplo más espectacular de E=mc² en acción. En su núcleo, donde la temperatura alcanza los 15 millones de grados Celsius, cuatro átomos de hidrógeno se fusionan para formar un átomo de helio en un proceso llamado fusión nuclear. Pero el átomo de helio resultante pesa un poquito menos que los cuatro átomos de hidrógeno originales. Esa masa "perdida" no desaparece: se convierte en energía según E=mc². Cada segundo, el Sol convierte aproximadamente 4 millones de toneladas de masa en energía pura, que llega a la Tierra como luz y calor.',

            'Aunque 4 millones de toneladas por segundo suena como muchísimo, el Sol es tan enormemente masivo que puede seguir brillando así durante otros 5,000 millones de años antes de agotar su combustible de hidrógeno. Gracias a E=mc², podemos calcular exactamente cuánto tiempo vivirá una estrella: si conocemos su masa y la velocidad a la que brilla, podemos determinar cuánto tiempo le queda. Es como saber cuántas horas durará una vela conociendo la cantidad de cera que tiene y la velocidad a la que se derrite.',

            '¿Sabías que la velocidad de la luz es tan especial que funciona como un límite universal? La "c" en E=mc² no es solo un número grande: es una constante fundamental del universo. La luz siempre viaja exactamente a 299,792,458 metros por segundo en el vacío, sin importar quién la mida ni desde dónde la mida. Si enciendes una linterna en un tren que viaja a gran velocidad, la luz de tu linterna no va "más rápido" que la luz de una linterna en el andén. La velocidad de la luz es el límite de velocidad cósmico y nada con masa puede alcanzarla.',

            'La ecuación E=mc² también funciona al revés: si concentras suficiente energía en un punto, puedes crear masa. Esto ocurre constantemente en los aceleradores de partículas, como el Gran Colisionador de Hadrones (LHC) del CERN, en la frontera entre Suiza y Francia. Cuando dos partículas chocan a velocidades cercanas a la luz, la enorme energía del impacto se convierte en partículas nuevas con masa. Así fue como los científicos descubrieron el famoso bosón de Higgs en 2012: crearon masa a partir de energía pura.',

            'Las centrales nucleares que generan electricidad en muchos países del mundo funcionan gracias a E=mc², usando un proceso llamado fisión nuclear. En la fisión, un átomo pesado como el uranio-235 se rompe en dos átomos más pequeños cuando es golpeado por un neutrón. La masa total de los fragmentos es ligeramente menor que la del átomo original, y esa diferencia de masa se convierte en una enorme cantidad de energía. Un kilogramo de uranio puede producir tanta energía como 3,000 toneladas de carbón.',

            'La fusión nuclear, el proceso que alimenta al Sol, también se basa en E=mc², pero al revés de la fisión: en lugar de romper átomos pesados, une átomos ligeros. Los científicos de todo el mundo están trabajando en reactores de fusión que podrían proporcionar energía limpia y casi ilimitada. El proyecto más ambicioso es ITER, un reactor experimental gigante que se está construyendo en el sur de Francia con la colaboración de 35 países. Si funciona, podríamos tener una fuente de energía que imite al Sol aquí en la Tierra.',

            'Una consecuencia sorprendente de E=mc² es que todo lo que tiene energía tiene masa, y viceversa. Cuando calientas una olla de agua, el agua caliente pesa más que el agua fría, porque la energía térmica añade una cantidad minúscula de masa. Cuando comprimes un resorte, el resorte comprimido pesa más que el relajado. Las diferencias son increíblemente pequeñas, imposibles de medir con instrumentos ordinarios, pero son reales. Incluso un pensamiento en tu cerebro, que es una señal eléctrica con energía, tiene una masa asociada.',

            'La bomba atómica es quizás la aplicación más aterradora de E=mc². En una explosión nuclear, solo una fracción muy pequeña de la masa del combustible se convierte en energía, pero esa pequeña fracción es suficiente para destruir una ciudad entera. La bomba lanzada sobre Hiroshima el 6 de agosto de 1945 contenía 64 kilogramos de uranio, pero solo unos 700 miligramos (menos de un gramo) de masa se convirtieron en energía. Esa cantidad microscópica de masa liberó una explosión equivalente a 15,000 toneladas de TNT.',

            'Einstein no participó directamente en la construcción de la bomba atómica, pero su ecuación fue la base teórica que demostró que era posible liberar cantidades inmensas de energía a partir de la materia. Cuando supo del bombardeo de Hiroshima, Einstein exclamó: "¡Ay de mí!" ("Weh mir!" en alemán). Pasó el resto de su vida luchando contra la proliferación de armas nucleares y abogando por el uso pacífico de la energía atómica. La ecuación E=mc² es neutral: puede usarse para iluminar ciudades o para destruirlas.',

            'Hoy, E=mc² sigue siendo una de las ecuaciones más probadas y verificadas de toda la ciencia. Cada vez que un acelerador de partículas crea nuevas partículas, cada vez que una central nuclear genera electricidad, cada vez que el Sol brilla, la ecuación de Einstein se confirma. Es una ventana al funcionamiento más profundo del universo, un recordatorio de que la realidad es mucho más sorprendente de lo que parece. ¡En el próximo módulo descubrirás cómo Einstein fue aún más lejos y dobló el espacio y el tiempo con la relatividad general!',
          ],
          image: '/assets/albert_einstein/einstein_m3.png',
          imgCaption: 'La famosa ecuación E=mc² escrita por Einstein, mostrando la equivalencia entre masa y energía.',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué representa la "c" en la ecuación E=mc²?', options: ['La constante de gravedad', 'La carga eléctrica', 'La velocidad de la luz', 'El calor específico'], a: 2 },
      { q: '¿Cuántas toneladas de masa convierte el Sol en energía cada segundo?', options: ['400 toneladas', '4,000 toneladas', '4 millones de toneladas', '4 mil millones de toneladas'], a: 2 },
      { q: '¿Qué proceso nuclear ocurre en el interior del Sol?', options: ['Fisión nuclear', 'Fusión nuclear', 'Reacción química', 'Desintegración radiactiva'], a: 1 },
    ],
  },
  {
    id: 'einstein_m4',
    order: 10004,
    titleEn: 'General Relativity: Gravity as Curvature',
    titleEs: 'La Relatividad General: gravedad como curvatura',
    badge: 'Spacetime Weaver',
    badgeEs: 'Tejedor del Espacio-Tiempo',
    badgeIcon: '/assets/albert_einstein/einstein_m4.png',
    color: '#9B59B6',
    icon: '/assets/albert_einstein/einstein_m4.png',
    contentEs: {
      sections: [
        {
          id: 'einstein_m4_s1',
          title: 'La Relatividad General: gravedad como curvatura',
          text: [
            '¿Sabías que la gravedad no es una fuerza que "tira" de ti, sino una curvatura del espacio y el tiempo? Esta es la idea central de la relatividad general, la teoría más ambiciosa y elegante de Albert Einstein, publicada en noviembre de 1915. Si la relatividad especial de 1905 fue una revolución, la relatividad general fue un terremoto que transformó por completo nuestra comprensión del universo. Einstein tardó diez años de intenso trabajo, lucha y frustración en completarla, y la consideró su mayor logro científico.',

            'Para entender la relatividad general, primero necesitamos hablar de Isaac Newton. En 1687, Newton publicó su ley de gravitación universal, que dice que todos los objetos con masa se atraen entre sí con una fuerza proporcional a sus masas. Esta ley funcionaba maravillosamente para predecir el movimiento de los planetas, las mareas y la caída de las manzanas. Pero Newton nunca pudo explicar cómo funciona la gravedad a distancia: ¿cómo "sabe" la Tierra que el Sol está ahí, a 150 millones de kilómetros? El propio Newton admitió que no tenía respuesta y lo llamó su "gran vergüenza".',

            'Einstein ofreció una respuesta revolucionaria. Imagina que el espacio no es un escenario vacío e invisible donde ocurren las cosas, sino más bien como una enorme sábana elástica estirada. Cuando colocas un objeto pesado, como una bola de boliche, sobre la sábana, esta se hunde y se curva alrededor del objeto. Si luego lanzas una canica sobre la sábana, la canica no irá en línea recta: seguirá la curva creada por la bola pesada y parecerá ser "atraída" hacia ella. Eso es exactamente lo que hace la gravedad, según Einstein.',

            'Pero la analogía de la sábana es solo en dos dimensiones. En realidad, Einstein demostró que los objetos masivos curvan las cuatro dimensiones del espacio-tiempo: las tres dimensiones del espacio (largo, ancho, alto) y la dimensión del tiempo. Sí, leíste bien: ¡la gravedad también curva el tiempo! Cerca de un objeto muy masivo, como un planeta o una estrella, el tiempo pasa más lentamente que lejos de él. Un reloj en la superficie de la Tierra corre ligeramente más lento que un reloj en un satélite en órbita.',

            'Para Einstein, llegar a esta teoría fue un viaje agotador. Desde 1907, cuando tuvo lo que él llamó "la idea más feliz de mi vida", hasta 1915, Einstein trabajó incansablemente en las matemáticas necesarias. Tuvo que aprender geometría diferencial y tensores, herramientas matemáticas muy avanzadas, con la ayuda de su viejo amigo de la ETH, Marcel Grossmann. Hubo momentos en que Einstein estuvo completamente perdido, cometió errores graves y casi abandonó el proyecto. Pero su intuición física nunca lo abandonó.',

            'El momento "Eureka" llegó en noviembre de 1915. Einstein presentó su teoría completa en una serie de cuatro conferencias ante la Academia Prusiana de Ciencias en Berlín. Las ecuaciones de campo de Einstein, como se las conoce hoy, describen cómo la distribución de masa y energía en el universo determina la curvatura del espacio-tiempo. Son elegantes pero increíblemente complejas: un sistema de diez ecuaciones diferenciales no lineales interconectadas. Einstein estaba tan emocionado cuando terminó los cálculos que dijo que tuvo palpitaciones del corazón.',

            'Una de las primeras y más hermosas confirmaciones de la relatividad general fue la explicación de un misterio que había atormentado a los astrónomos durante décadas: la precesión anómala de la órbita de Mercurio. La órbita de Mercurio rota lentamente alrededor del Sol, y la ley de Newton no podía explicar completamente esta rotación. Los astrónomos habían propuesto incluso la existencia de un planeta oculto llamado Vulcano para explicar la discrepancia. Einstein demostró que la curvatura del espacio-tiempo cerca del Sol causaba exactamente la precesión observada, eliminando la necesidad de planetas fantasma.',

            'La relatividad general hizo predicciones asombrosas que han sido confirmadas una tras otra. Una de las más espectaculares es el efecto de lente gravitacional: la luz de estrellas y galaxias lejanas se curva al pasar cerca de objetos masivos, como si el espacio funcionara como una lente gigante. Esto significa que podemos ver galaxias que están detrás de otras galaxias, porque su luz se curva alrededor del obstáculo. El Telescopio Espacial Hubble y el James Webb han capturado imágenes espectaculares de este efecto, mostrando galaxias distorsionadas en forma de arcos y anillos.',

            '¿Sabías que tu teléfono celular necesita la relatividad general para funcionar correctamente? El Sistema de Posicionamiento Global (GPS) que usan tu teléfono, tu reloj inteligente y los aviones depende de 24 satélites que orbitan la Tierra a una altitud de 20,200 kilómetros. Los relojes atómicos en estos satélites corren 38 microsegundos más rápido cada día que los relojes en la superficie, debido a la menor curvatura del espacio-tiempo a esa altitud. Sin las correcciones de la relatividad general, el GPS acumularía errores de unos 10 kilómetros por día.',

            'La relatividad general también predijo la existencia de agujeros negros, objetos tan masivos que curvan el espacio-tiempo de manera tan extrema que nada, ni siquiera la luz, puede escapar de ellos. El término "agujero negro" fue acuñado por el físico John Wheeler en 1967, pero la predicción matemática surgió de las ecuaciones de Einstein ya en 1916, cuando el astrónomo Karl Schwarzschild encontró la primera solución exacta de las ecuaciones de campo mientras servía en el frente ruso durante la Primera Guerra Mundial.',

            'Durante décadas, los agujeros negros fueron considerados una curiosidad matemática, y ni el propio Einstein creía que existieran realmente en la naturaleza. Pero la evidencia se fue acumulando. En 2019, el proyecto Event Horizon Telescope (EHT), una red de telescopios distribuidos por todo el planeta, capturó la primera imagen directa de un agujero negro: el agujero negro supermasivo en el centro de la galaxia M87, a 55 millones de años luz de distancia. La imagen coincidía perfectamente con las predicciones de la relatividad general.',

            'Otra predicción extraordinaria de la relatividad general son las ondas gravitacionales: ondulaciones en el tejido del espacio-tiempo causadas por eventos cataclísmicos, como la colisión de dos agujeros negros. Einstein las predijo en 1916, pero pensaba que serían tan débiles que jamás podrían detectarse. Casi cien años después, el 14 de septiembre de 2015, el detector LIGO en Estados Unidos captó ondas gravitacionales por primera vez, generadas por dos agujeros negros que se fusionaron a 1,300 millones de años luz de distancia.',

            'La dilatación temporal gravitacional, predicha por Einstein, ha sido medida con una precisión increíble. En un experimento de 2010, científicos del NIST (Instituto Nacional de Estándares y Tecnología de Estados Unidos) demostraron que un reloj atómico colocado solo 33 centímetros más arriba que otro reloj corre ligeramente más rápido, exactamente como predice la relatividad general. La diferencia es minúscula, pero real y medible. El tiempo fluye a velocidades diferentes dependiendo de qué tan cerca estés de un objeto masivo.',

            'La relatividad general también ha revelado que el universo entero está en expansión. Cuando Einstein aplicó sus ecuaciones al universo como un todo, descubrió que predicen un universo dinámico, que se expande o se contrae. Esto le pareció tan extraño que añadió un término artificial llamado "constante cosmológica" para mantener el universo estático. Años después, cuando Edwin Hubble demostró que las galaxias efectivamente se alejan unas de otras, Einstein llamó a la constante cosmológica "el mayor error de mi vida".',

            'La relatividad general de Einstein es una de las teorías más probadas, elegantes y poderosas de toda la ciencia. Ha sobrevivido más de un siglo de pruebas experimentales sin una sola falla. Desde los agujeros negros hasta el GPS de tu teléfono, desde las ondas gravitacionales hasta la expansión del universo, la huella de Einstein está en todas partes. ¡En el próximo módulo descubrirás cómo un eclipse solar en 1919 convirtió a Einstein en la persona más famosa del planeta!',
          ],
          image: '/assets/albert_einstein/einstein_m4.png',
          imgCaption: 'Representación artística de la curvatura del espacio-tiempo causada por un objeto masivo, según la relatividad general de Einstein.',
        },
      ],
    },
    quizEs: [
      { q: 'Según la relatividad general, ¿qué es la gravedad?', options: ['Una fuerza que tira de los objetos', 'Una curvatura del espacio-tiempo', 'Una onda electromagnética', 'Un tipo de energía oscura'], a: 1 },
      { q: '¿Cuántos microsegundos por día se adelantan los relojes de los satélites GPS respecto a los de la superficie?', options: ['3.8 microsegundos', '38 microsegundos', '380 microsegundos', '3,800 microsegundos'], a: 1 },
      { q: '¿En qué año se detectaron ondas gravitacionales por primera vez?', options: ['1916', '1955', '2005', '2015'], a: 3 },
    ],
  },
  {
    id: 'einstein_m5',
    order: 10005,
    titleEn: 'The 1919 Eclipse and World Fame',
    titleEs: 'El eclipse de 1919 y la fama mundial',
    badge: 'Star Verifier',
    badgeEs: 'Verificador de Estrellas',
    badgeIcon: '/assets/albert_einstein/einstein_m5.png',
    color: '#3498DB',
    icon: '/assets/albert_einstein/einstein_m5.png',
    contentEs: {
      sections: [
        {
          id: 'einstein_m5_s1',
          title: 'El eclipse de 1919 y la fama mundial',
          text: [
            '¡Prepárate para una aventura científica que involucra un eclipse solar, expediciones a lugares remotos y el momento exacto en que un hombre se convirtió en la persona más famosa del mundo! En 1915, Einstein había publicado su teoría de la relatividad general, que predecía algo asombroso: la luz de las estrellas debía curvarse al pasar cerca de un objeto masivo como el Sol. La única forma de comprobarlo era observar estrellas cuya luz pasara justo al lado del Sol, y eso solo era posible durante un eclipse solar total.',

            '¿Sabías que la idea de que la gravedad puede desviar la luz era tan radical que muchos científicos la consideraban absurda? La teoría de Newton también predecía una pequeña desviación de la luz por la gravedad, pero Einstein calculó que la curvatura del espacio-tiempo causaría una desviación exactamente el doble de grande que la predicha por Newton: 1.75 segundos de arco para la luz que roza el borde del Sol. Un segundo de arco es una medida angular diminuta, equivalente al tamaño de una moneda vista desde 4 kilómetros de distancia. Medir esta diferencia era un desafío técnico enorme.',

            'El héroe de esta historia es Arthur Stanley Eddington, un brillante astrofísico británico de la Universidad de Cambridge. Eddington era un cuáquero pacifista que, durante la Primera Guerra Mundial, había evitado el servicio militar gracias a su objeción de conciencia. Fue uno de los primeros científicos fuera de Alemania en comprender y apreciar la teoría de la relatividad general, en un momento en que la mayoría de los científicos británicos ignoraban o despreciaban el trabajo de científicos alemanes debido a la guerra.',

            'Eddington organizó dos expediciones para observar el eclipse solar total del 29 de mayo de 1919. ¿Por qué esa fecha? Porque ese eclipse era perfecto: el Sol pasaría frente al cúmulo estelar de las Híades, una zona del cielo con muchas estrellas brillantes cuyas posiciones exactas eran bien conocidas. Si la relatividad general era correcta, las posiciones aparentes de esas estrellas deberían desplazarse ligeramente durante el eclipse, cuando su luz pasara cerca del Sol. Era una oportunidad que no se repetiría en muchos años.',

            'Una expedición fue enviada a la ciudad de Sobral, en el noreste de Brasil, liderada por Andrew Crommelin y Charles Davidson del Observatorio Real de Greenwich. La otra expedición, liderada por el propio Eddington y su asistente Edwin Cottingham, viajó a la isla de Príncipe, una pequeña isla en el Golfo de Guinea, frente a la costa occidental de África. Ambos equipos llevaron telescopios especiales, placas fotográficas y todo el equipo necesario para capturar las posiciones de las estrellas durante los preciosos minutos del eclipse.',

            'El viaje fue una odisea. Los equipos partieron de Inglaterra en marzo de 1919, apenas unos meses después del armisticio que puso fin a la Primera Guerra Mundial. Sobral y Príncipe fueron elegidos porque eran los puntos más accesibles dentro de la franja de totalidad del eclipse. El equipo de Eddington llegó a Príncipe a finales de abril y pasó semanas preparando sus instrumentos y tomando fotografías de las estrellas de referencia por la noche. Todo dependía de que el cielo estuviera despejado el día del eclipse.',

            'La mañana del 29 de mayo de 1919 amaneció nublada en Príncipe, y Eddington temió que toda la expedición fuera un fracaso. Llovió durante parte de la mañana, y las nubes cubrían el cielo. Pero justo cuando comenzó la fase de totalidad del eclipse, las nubes se abrieron lo suficiente para que Eddington pudiera tomar varias fotografías. En total, expuso 16 placas fotográficas, de las cuales solo unas pocas resultaron útiles. En Sobral, las condiciones fueron mejores, y el equipo logró obtener fotografías excelentes con cielos más claros.',

            'El análisis de las placas fotográficas fue un proceso meticuloso que tomó varios meses. Los astrónomos compararon las posiciones de las estrellas fotografiadas durante el eclipse con las posiciones de las mismas estrellas fotografiadas meses antes, cuando el Sol no estaba en la misma zona del cielo. La diferencia entre ambas posiciones mostraría cuánto se había desviado la luz estelar al pasar cerca del Sol. Los resultados de Sobral mostraron una desviación de 1.98 segundos de arco, y los de Príncipe dieron 1.61 segundos de arco.',

            'El valor predicho por Einstein era 1.75 segundos de arco, y las mediciones de ambas expediciones eran consistentes con esa predicción dentro del margen de error experimental. La predicción de Newton, que daba solo 0.87 segundos de arco (la mitad), quedó claramente descartada. Einstein tenía razón: la luz se curvaba al pasar cerca del Sol exactamente como predecía la relatividad general. El espacio-tiempo estaba curvado por la masa del Sol, y esa curvatura desviaba la luz de las estrellas lejanas.',

            'Los resultados fueron presentados oficialmente el 6 de noviembre de 1919 en una reunión conjunta de la Royal Society y la Royal Astronomical Society en Londres. El presidente de la Royal Society, el físico J.J. Thomson (descubridor del electrón), declaró que era "uno de los logros más grandes del pensamiento humano" y comparó la hazaña de Einstein con la de Isaac Newton. El ambiente en la sala era eléctrico: los científicos sabían que estaban presenciando un momento histórico que cambiaría la física para siempre.',

            'Al día siguiente, el 7 de noviembre de 1919, el periódico The Times de Londres publicó el titular que haría famoso a Einstein en todo el mundo: "Revolución en la ciencia — Nueva teoría del universo — Las ideas de Newton derrocadas". Otros periódicos siguieron con titulares igual de dramáticos. En cuestión de días, el nombre de Albert Einstein era conocido en todos los rincones del planeta. De la noche a la mañana, un físico teórico relativamente desconocido fuera del mundo académico se convirtió en la persona más famosa del mundo.',

            'La fama de Einstein fue un fenómeno sin precedentes. Nunca antes un científico había alcanzado tal nivel de celebridad mundial. Parte de la explicación era el momento histórico: el mundo acababa de salir de la devastadora Primera Guerra Mundial, y la gente anhelaba noticias positivas. La idea de que un científico alemán y un científico británico pudieran trabajar juntos para revelar verdades universales, superando las barreras del nacionalismo y la guerra, era profundamente inspiradora y esperanzadora para un mundo herido.',

            'Einstein recibió la fama con una mezcla de asombro y humor. Cuando le preguntaron cómo se sentía siendo la persona más famosa del mundo, respondió con su característico ingenio: "La fama es como un río: te lleva a donde no quieres ir". Empezó a recibir cientos de cartas diarias de admiradores, solicitudes de conferencias de todo el mundo, y propuestas de todo tipo. Se convirtió en una celebridad global, reconocido instantáneamente por su cabello despeinado, sus ojos brillantes y su bigote característico.',

            'Tras la confirmación del eclipse, Einstein realizó giras triunfales por Europa, Estados Unidos y Japón. En cada ciudad que visitaba, multitudes entusiastas lo recibían como si fuera una estrella de rock. En Nueva York, miles de personas salieron a las calles para verlo. En Japón, el entusiasmo fue tan grande que su tren no podía avanzar por la cantidad de gente que se agolpaba en las estaciones. Einstein se maravillaba de que tantas personas celebraran algo que, como él mismo admitía, muy pocas entendían realmente.',

            'El eclipse de 1919 no solo hizo famoso a Einstein: también demostró algo fundamental sobre la ciencia. Una teoría formulada por un hombre sentado en su escritorio en Berlín fue confirmada por observaciones realizadas en Brasil y África. La ciencia no tiene fronteras, y la verdad del universo puede ser descubierta y verificada por cualquiera, en cualquier lugar del mundo. ¡En el próximo y último módulo descubrirás los años finales de Einstein, su lucha por la paz y el legado inmenso que dejó a la humanidad!',
          ],
          image: '/assets/albert_einstein/einstein_m5.png',
          imgCaption: 'Fotografía del eclipse solar total de 1919, tomada durante la expedición de Eddington que confirmó la relatividad general.',
        },
      ],
    },
    quizEs: [
      { q: '¿Qué astrónomo lideró la expedición que confirmó la relatividad general en 1919?', options: ['Edwin Hubble', 'Arthur Eddington', 'Karl Schwarzschild', 'Max Planck'], a: 1 },
      { q: '¿En qué dos lugares se realizaron las observaciones del eclipse de 1919?', options: ['Londres y París', 'Nueva York y Tokio', 'Sobral (Brasil) y Príncipe (África)', 'El Cairo y Bombay'], a: 2 },
      { q: '¿Cuántos segundos de arco predijo Einstein para la desviación de la luz estelar por el Sol?', options: ['0.87 segundos de arco', '1.75 segundos de arco', '3.50 segundos de arco', '5.25 segundos de arco'], a: 1 },
    ],
  },
  {
    id: 'einstein_m6',
    order: 10006,
    titleEn: 'Princeton, the Atomic Bomb, and His Pacifist Legacy',
    titleEs: 'Princeton, la bomba atómica y su legado pacifista',
    badge: 'Peace Messenger',
    badgeEs: 'Mensajero de la Paz',
    badgeIcon: '/assets/albert_einstein/einstein_m6.png',
    color: '#2ECC71',
    icon: '/assets/albert_einstein/einstein_m6.png',
    contentEs: {
      sections: [
        {
          id: 'einstein_m6_s1',
          title: 'Princeton, la bomba atómica y su legado pacifista',
          text: [
            '¡Prepárate para conocer el capítulo más dramático y emotivo de la vida de Albert Einstein! En 1933, el mundo cambió radicalmente cuando Adolf Hitler llegó al poder en Alemania. El régimen nazi persiguió a los judíos, quemó libros y destruyó las instituciones científicas que habían hecho de Alemania la capital mundial de la física. Einstein, que era judío y estaba de viaje fuera de Alemania cuando Hitler tomó el poder, decidió no regresar jamás. Renunció a su puesto en la Academia Prusiana de Ciencias y a su ciudadanía alemana por segunda vez en su vida.',

            'Los nazis confiscaron las propiedades de Einstein, quemaron sus libros y pusieron una recompensa por su cabeza. Revistas pseudocientíficas publicaron artículos titulados "Cien autores contra Einstein", a lo que Einstein respondió con su ingenio habitual: "Si estuviera equivocado, bastaría con un solo autor". Su foto apareció en un panfleto nazi con la leyenda "todavía sin ahorcar", lo que da una idea de la peligrosidad de la situación. Einstein sabía que su vida estaba en riesgo real.',

            'Einstein encontró refugio en Estados Unidos, donde aceptó un puesto en el Instituto de Estudios Avanzados de Princeton, Nueva Jersey. Este instituto, fundado en 1930, fue diseñado como un paraíso para pensadores: no había clases obligatorias, ni exámenes, ni burocracia; solo investigación pura. Einstein recibió un salario generoso y la libertad total para pensar en lo que quisiera. Se mudó a una modesta casa en el número 112 de Mercer Street, que se convirtió en una de las direcciones más famosas del mundo.',

            'En Princeton, Einstein se convirtió en una figura querida y excéntrica del pueblo. Los vecinos lo veían caminar diariamente al instituto con su cabello despeinado, su vieja chaqueta de cuero y sin calcetines (odiaba usarlos porque le hacían agujeros en los dedos). Los niños del vecindario lo visitaban para pedirle ayuda con sus tareas de matemáticas, y Einstein los recibía encantado. Una niña de ocho años le preguntó una vez si era cierto que era el hombre más inteligente del mundo. Einstein le respondió: "No sé, pero hago buenas preguntas".',

            'El momento más angustiante de la vida de Einstein llegó el 2 de agosto de 1939. Junto con el físico húngaro Leo Szilard, Einstein firmó una carta dirigida al presidente Franklin D. Roosevelt, advirtiéndole de que científicos alemanes habían logrado la fisión del uranio, y que era posible que la Alemania nazi desarrollara una bomba atómica de poder devastador. La carta recomendaba que Estados Unidos iniciara su propio programa de investigación nuclear. Esta carta fue uno de los catalizadores del Proyecto Manhattan.',

            'Es crucial entender que Einstein NO participó directamente en el Proyecto Manhattan ni en la construcción de la bomba atómica. Su carta a Roosevelt fue una advertencia motivada por el miedo a que los nazis obtuvieran la bomba primero, pero el ejército estadounidense consideró que Einstein era un riesgo de seguridad debido a sus opiniones políticas progresistas y su pacifismo. El FBI, bajo J. Edgar Hoover, mantuvo un archivo de 1,427 páginas sobre Einstein, vigilando sus actividades durante décadas. La ironía es enorme: el hombre cuya ecuación hizo posible la bomba fue excluido del proyecto que la construyó.',

            'Cuando las bombas atómicas fueron lanzadas sobre Hiroshima el 6 de agosto de 1945 y sobre Nagasaki el 9 de agosto, matando a más de 200,000 personas, Einstein quedó profundamente conmocionado. Dijo a su secretaria: "¡Ay de mí!" y más tarde declaró en una entrevista con la revista Newsweek: "Si hubiera sabido que los alemanes no lograrían desarrollar una bomba atómica, no habría levantado un dedo". El remordimiento por haber firmado la carta a Roosevelt lo acompañó el resto de su vida.',

            'Después de la guerra, Einstein dedicó sus últimos años a luchar apasionadamente por la paz mundial y el desarme nuclear. Se convirtió en uno de los más vocales defensores del control internacional de las armas atómicas. En 1946, fue nombrado presidente del Comité de Emergencia de Científicos Atómicos, que abogaba por el uso pacífico de la energía nuclear. Einstein declaró: "No sé con qué armas se luchará la Tercera Guerra Mundial, pero la Cuarta se luchará con palos y piedras". Esta frase se convirtió en uno de los lemas más poderosos del movimiento pacifista.',

            'En 1921, Einstein recibió el Premio Nobel de Física, pero no por la relatividad, como muchos creen, sino por su explicación del efecto fotoeléctrico. El comité del Nobel consideró que la relatividad aún no había sido verificada de manera suficientemente concluyente, aunque el eclipse de 1919 ya la había confirmado. Es una de las ironías más grandes de la historia de la ciencia: Einstein recibió su premio por un trabajo que, siendo brillante, es mucho menos conocido que la relatividad que lo hizo famoso.',

            'Einstein también fue un defensor apasionado de los derechos civiles en Estados Unidos. Se opuso públicamente a la segregación racial y fue amigo del activista afroamericano Paul Robeson y del líder de los derechos civiles W.E.B. Du Bois. Cuando la cantante negra Marian Anderson fue rechazada de un hotel en Princeton por su raza, Einstein la invitó a quedarse en su propia casa. En su discurso en la Universidad Lincoln, una universidad históricamente negra, en 1946, Einstein declaró que el racismo era "una enfermedad de la gente blanca".',

            'El 11 de abril de 1955, apenas una semana antes de su muerte, Einstein firmó su último acto público significativo: el Manifiesto Russell-Einstein, redactado junto con el filósofo y matemático británico Bertrand Russell. Este documento, firmado por once destacados intelectuales y científicos, hacía un llamado urgente a los líderes mundiales para resolver sus disputas pacíficamente y abandonar las armas nucleares. El manifiesto advertía que "la raza humana se enfrenta a un peligro de exterminio" y condujo a la creación de las Conferencias Pugwash sobre ciencia y asuntos mundiales.',

            'Albert Einstein murió el 18 de abril de 1955 en el Hospital de Princeton, a los 76 años, debido a la ruptura de un aneurisma de la aorta abdominal. Rechazó la cirugía, diciendo: "Quiero irme cuando quiera. Es de mal gusto prolongar la vida artificialmente. He hecho mi parte, es hora de irme. Lo haré con elegancia". En su mesa de noche se encontraron sus últimas notas: cálculos matemáticos para una teoría del campo unificado, su sueño incompleto de unir todas las fuerzas de la naturaleza en una sola ecuación.',

            'Después de su muerte ocurrió algo extraordinario y controvertido: el patólogo Thomas Harvey, que realizó la autopsia, extrajo el cerebro de Einstein sin el permiso de la familia. Harvey conservó el cerebro en formaldehído y lo cortó en 240 bloques, que distribuyó a investigadores durante las siguientes décadas. Estudios posteriores encontraron que ciertas regiones del cerebro de Einstein, especialmente el lóbulo parietal inferior (asociado con el razonamiento matemático y espacial), eran significativamente más grandes que el promedio.',

            'El legado de Einstein es inmenso y omnipresente. Sus teorías no son reliquias del pasado: están vivas en cada GPS que usamos, en cada central nuclear que genera electricidad, en cada fotografía de agujeros negros, en cada detector de ondas gravitacionales. La constante cosmológica que Einstein consideró su "mayor error" resultó ser necesaria para explicar la expansión acelerada del universo, descubierta en 1998. Su trabajo sobre el efecto fotoeléctrico es la base de los paneles solares y las cámaras digitales que usamos todos los días.',

            'Einstein nos dejó más que ecuaciones y teorías: nos dejó un ejemplo de cómo vivir con curiosidad, valentía y compasión. Fue un rebelde que cuestionó todo, un refugiado que encontró un nuevo hogar, un genio que usó su fama para luchar por la paz y la justicia. Su famosa frase "La imaginación es más importante que el conocimiento" sigue inspirando a millones de jóvenes científicos en todo el mundo. Tú también puedes ser como Einstein: no necesitas ser el más inteligente de la clase, solo necesitas hacer preguntas, nunca dejar de asombrarte y atreverte a pensar diferente. ¡El universo está esperando que lo descubras!',
          ],
          image: '/assets/albert_einstein/einstein_m6.png',
          imgCaption: 'Albert Einstein en Princeton durante sus últimos años, dedicado a la ciencia y a la lucha por la paz mundial.',
        },
      ],
    },
    quizEs: [
      { q: '¿En qué fecha firmó Einstein la famosa carta al presidente Roosevelt sobre la bomba atómica?', options: ['6 de agosto de 1945', '2 de agosto de 1939', '11 de abril de 1955', '7 de noviembre de 1919'], a: 1 },
      { q: '¿Participó Einstein directamente en la construcción de la bomba atómica?', options: ['Sí, fue el director del Proyecto Manhattan', 'Sí, diseñó la bomba personalmente', 'No, fue excluido del proyecto por el ejército', 'No, porque vivía en Alemania'], a: 2 },
      { q: '¿Cómo se llama el documento pacifista que Einstein firmó una semana antes de morir?', options: ['La Carta de las Naciones Unidas', 'El Manifiesto Russell-Einstein', 'La Declaración de Ginebra', 'El Tratado de No Proliferación'], a: 1 },
    ],
  },
];
