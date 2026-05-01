const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

const johnIdx = jsData.findIndex(c => c.id === 'pioneros_john');

const newJohnSections = [
  {
    title: "Sección 1: Un Piloto Extraordinario",
    text: [
      "John Glenn nació en Ohio, Estados Unidos, con una profunda pasión por el vuelo que lo llevó a convertirse en uno de los mejores pilotos de pruebas del mundo.",
      "Desde joven soñaba con alcanzar las estrellas y empujar los límites de la ingeniería aeronáutica probando aviones experimentales que nadie más se atrevía a volar.",
      "Su valentía y habilidades técnicas llamaron rápidamente la atención de la recién formada NASA durante los inicios de la carrera espacial internacional.",
      "Cuando la agencia buscó a los primeros astronautas para el programa Mercury, Glenn fue seleccionado entre miles de candidatos rigurosos y altamente capacitados.",
      "Se sometió a entrenamientos extremos, incluyendo simuladores de fuerza centrífuga que ponían a prueba la resistencia física y mental humana ante la gravedad.",
      "Glenn no solo era un piloto talentoso, sino también un líder natural que inspiraba confianza en todos los ingenieros y científicos del equipo espacial.",
      "Su actitud calmada bajo presión lo convirtió en el candidato ideal para enfrentar los enormes riesgos de los primeros vuelos orbitales alrededor de la Tierra.",
      "Él sabía que el viaje al espacio exterior era un territorio inexplorado lleno de peligros desconocidos y desafíos técnicos sin precedentes históricos.",
      "Sin embargo, su deseo de explorar el universo y contribuir al avance de la ciencia humana era mucho más fuerte que cualquier temor terrenal.",
      "Esta es la historia del hombre que devolvió la esperanza a su nación y demostró que el espíritu humano puede conquistar el vasto y oscuro cosmos."
    ]
  },
  {
    title: "Sección 2: La Carrera Espacial",
    text: [
      "A principios de la década de 1960, el mundo estaba inmerso en una intensa competencia tecnológica y política conocida como la carrera espacial.",
      "Estados Unidos y la Unión Soviética competían ferozmente por demostrar quién tenía la mejor tecnología para explorar el desconocido espacio exterior.",
      "La Unión Soviética había tomado una clara delantera al enviar al primer hombre, Yuri Gagarin, a orbitar el planeta con gran éxito internacional.",
      "Esto generó una enorme presión sobre la NASA para igualar y superar este increíble hito histórico lo más rápido y seguro posible.",
      "John Glenn comprendió la enorme responsabilidad que recaía sobre sus hombros como representante de su país en esta competencia global sin precedentes.",
      "Cada pieza de la nave, cada cálculo matemático y cada decisión de ingeniería debían ser absolutamente perfectos para garantizar el éxito de la misión.",
      "Cientos de brillantes científicos, matemáticos e ingenieros trabajaron día y noche para diseñar y construir un cohete capaz de llevar un humano al vacío.",
      "Glenn participaba activamente en el diseño de su propia cápsula, aportando sus valiosos conocimientos como piloto de pruebas experimentado y audaz.",
      "Sabían que el margen de error era mínimo y que cualquier pequeña falla en los sistemas de soporte vital o propulsión podría resultar en una catástrofe.",
      "A pesar de la tensión y la urgencia, el equipo se mantuvo enfocado en la seguridad y la precisión matemática necesaria para conquistar las estrellas."
    ]
  },
  {
    title: "Sección 3: La Nave Friendship 7",
    text: [
      "Para su histórico viaje, la NASA construyó una pequeña pero increíblemente resistente cápsula espacial a la que John Glenn nombró cariñosamente Friendship 7.",
      "El número 7 representaba a los siete astronautas originales del programa Mercury, un símbolo de unidad, trabajo en equipo y camaradería excepcional.",
      "El nombre 'Friendship' (Amistad) fue elegido por Glenn para enviar un poderoso mensaje de paz global a todas las naciones de la Tierra.",
      "La cápsula tenía forma de campana y era tan pequeña que el astronauta no podía ni siquiera ponerse de pie, apenas cabía en su asiento personalizado.",
      "Estaba repleta de complejos paneles de control, cientos de interruptores manuales, luces parpadeantes y sistemas vitales esenciales para la supervivencia.",
      "En el morro de la cápsula se encontraba el escudo térmico, una pieza crucial diseñada para soportar las infernales temperaturas del reingreso atmosférico.",
      "La nave iría montada en la cima del poderoso cohete Atlas, un gigante de metal líquido y fuego capaz de generar una potencia de empuje descomunal.",
      "Durante meses, Glenn practicó cada movimiento dentro de la cápsula, memorizando la función de cada botón hasta que podía operarlos con los ojos cerrados.",
      "El equipo de ingenieros revisó exhaustivamente cada válvula, circuito eléctrico y sistema de oxígeno para asegurar que todo funcionara a la perfección.",
      "La pequeña campana metálica estaba lista para convertirse en el primer hogar orbital de un astronauta estadounidense en la inmensidad del espacio profundo."
    ]
  },
  {
    title: "Sección 4: El Despegue de la Esperanza",
    text: [
      "El día del lanzamiento, la tensión en el Centro de Control de Cabo Cañaveral se podía cortar con un cuchillo debido a los múltiples retrasos previos.",
      "Problemas técnicos y mal clima habían obligado a posponer el despegue varias veces, poniendo a prueba los nervios de toda la nación estadounidense.",
      "Finalmente, el 20 de febrero de 1962, el cielo se despejó y las condiciones fueron perfectas para encender los motores principales del cohete Atlas.",
      "John Glenn se acomodó en su ajustado asiento, esperando con calma las horas previas al encendido mientras escuchaba las voces del equipo de control.",
      "Millones de personas alrededor del mundo se congregaron frente a sus radios y televisores blanco y negro para presenciar este momento histórico en vivo.",
      "La cuenta regresiva resonó en los altavoces, marcando los segundos finales antes de que el poderoso cohete rugiera con una fuerza ensordecedora y feroz.",
      "Una brillante llamarada naranja iluminó la plataforma de lanzamiento mientras el colosal cohete Atlas comenzaba su lento y majestuoso ascenso hacia el cielo.",
      "La aceleración empujó a Glenn con fuerza contra su asiento, experimentando fuerzas extremas que multiplicaban el peso de su propio cuerpo varias veces.",
      "Atravesando las capas de la atmósfera a velocidades supersónicas, la vibración de la nave era intensa, pero el diseño de la cápsula demostró ser robusto.",
      "En pocos minutos, el ruido y la turbulencia desaparecieron repentinamente, dando paso al absoluto y pacífico silencio de la gravedad cero orbital."
    ]
  },
  {
    title: "Sección 5: Orbitando la Tierra",
    text: [
      "Al alcanzar la órbita terrestre baja, John Glenn se convirtió oficialmente en el primer estadounidense en rodear nuestro hermoso planeta azul.",
      "A una velocidad asombrosa de más de 28,000 kilómetros por hora, la pequeña cápsula completaba una vuelta entera a la Tierra cada 90 minutos exactos.",
      "Glenn experimentó la maravillosa sensación de la ingravidez, viendo cómo los objetos a su alrededor flotaban libremente dentro de la reducida cabina.",
      "A través de su pequeña ventana orbital, observó vistas impresionantes y sobrecogedoras que ningún otro hombre de su país había contemplado jamás.",
      "Vio enormes tormentas giratorias sobre los océanos, el verde vibrante de los continentes y el delgadísimo halo azul luminoso de la atmósfera terrestre.",
      "Reportó maravillado que el horizonte parecía un delicado arcoíris brillante que separaba la calidez de nuestro planeta del oscuro vacío cósmico infinito.",
      "Durante su viaje, Glenn experimentó increíbles amaneceres y atardeceres acelerados, pasando de la luz intensa a la oscuridad total en cuestión de minutos.",
      "También se percató de pequeñas partículas brillantes revoloteando alrededor de la nave, a las que llamó amistosamente 'luciérnagas' espaciales.",
      "Estas misteriosas luces resultaron ser cristales de hielo brillante provenientes de la condensación de la propia nave al expulsar vapor al frío extremo.",
      "Su perspectiva del mundo cambió para siempre, al comprender lo frágil y especial que es nuestra única casa en medio de un universo inmenso y misterioso."
    ]
  },
  {
    title: "Sección 6: Controlando la Nave",
    text: [
      "A diferencia de las misiones anteriores que eran totalmente automatizadas, Glenn tuvo que tomar el control manual activo de la cápsula Friendship 7.",
      "Poco después de entrar en órbita, un pequeño propulsor automático de estabilización falló, haciendo que la nave comenzara a girar de forma indeseada.",
      "Si este problema no se resolvía rápidamente, la nave perdería su orientación vital, poniendo en peligro el reingreso seguro a la atmósfera terrestre.",
      "Demostrando por qué era un piloto de pruebas excepcional, Glenn apagó los sistemas automáticos y tomó los controles manuales con gran serenidad.",
      "Usó pequeñas ráfagas de los cohetes de maniobra para corregir el rumbo de la nave y mantenerla perfectamente alineada con el horizonte visual de la Tierra.",
      "Esta acción demostró definitivamente el enorme valor de tener pilotos humanos capacitados en el espacio para resolver crisis de ingeniería complejas.",
      "Los ingenieros en tierra monitoreaban constantemente sus datos médicos, aliviados al ver que su pulso se mantenía estable a pesar del estrés inmenso.",
      "Glenn realizaba observaciones científicas continuas, tomando fotografías espectaculares de formaciones nubosas y probando su vista en la ingravidez total.",
      "Se alimentó utilizando tubos de comida especiales, comprobando por primera vez que la digestión humana funcionaba perfectamente sin la fuerza de gravedad.",
      "Su desempeño impecable sentó las bases operativas para todas las futuras misiones tripuladas, demostrando que el hombre podía vivir y trabajar en órbita."
    ]
  },
  {
    title: "Sección 7: Un Problema Aterrador",
    text: [
      "A pesar del éxito inicial de las operaciones orbitales, una luz de advertencia roja se encendió repentinamente en los paneles del Centro de Control de Misión.",
      "El indicador de telemetría sugería que el sistema de sujeción del vital escudo térmico de la cápsula se había aflojado peligrosamente durante el vuelo.",
      "El escudo térmico era la única barrera de protección entre Glenn y el calor abrasador provocado por la fricción extrema durante el futuro reingreso atmosférico.",
      "Si el escudo se desprendía, la cápsula y su ocupante se desintegrarían instantáneamente en una bola de fuego meteórica en las altas capas de la atmósfera.",
      "Los ingenieros terrestres entraron en un estado de análisis frenético y tensión absoluta, debatiendo rápidamente la mejor estrategia para salvar al astronauta.",
      "Decidieron no informarle a Glenn inmediatamente sobre la gravedad exacta del problema para evitar pánico y mantener su enfoque en las tareas manuales vitales.",
      "Sin embargo, le ordenaron que no soltara el paquete de retrocohetes agotados, con la esperanza de que sus correas mantuvieran el escudo en su lugar.",
      "Glenn, siendo un piloto brillante y perspicaz, notó el inusual cambio de procedimientos y rápidamente dedujo que algo andaba muy mal con la nave.",
      "Aunque sabía que su vida estaba en grave peligro inminente, mantuvo una calma asombrosa y siguió al pie de la letra las nuevas instrucciones de control.",
      "Esta emergencia demostró la necesidad crítica de contar con equipos de control de misión rápidos, analíticos y capaces de resolver problemas de vida o muerte."
    ]
  },
  {
    title: "Sección 8: Preparando el Regreso",
    text: [
      "Después de completar tres exitosas órbitas alrededor de la Tierra, llegó el momento crítico de iniciar las secuencias complejas para el retorno a casa.",
      "Glenn debía alinear la cápsula con absoluta precisión en un ángulo exacto para que los cohetes de frenado pudieran reducir su velocidad orbital enorme.",
      "Con un control manual suave pero firme, orientó la Friendship 7 de espaldas al sentido del avance para recibir el impulso desacelerador en la dirección correcta.",
      "Encendió los pequeños retrocohetes uno por uno, sintiendo cómo una fuerza violenta y opuesta sacudía la nave y lo empujaba hacia adelante en su asiento.",
      "La desaceleración fue efectiva y calculada con precisión milimétrica, reduciendo la velocidad lo suficiente para permitir que la gravedad terrestre hiciera su trabajo.",
      "En una situación normal, el paquete de cohetes usados se descartaría en el vacío para dejar el escudo térmico liso y preparado para el impacto atmosférico.",
      "Pero siguiendo las órdenes de emergencia de la NASA para mantener el escudo presuntamente suelto en su sitio, Glenn dejó el paquete atado a la cápsula.",
      "Nadie en el equipo de ingeniería sabía con certeza absoluta si esta decisión improvisada y desesperada funcionaría o si causaría daños irreparables en el descenso.",
      "El mundo entero contenía la respiración mientras la pequeña nave comenzaba a sumergirse en las primeras y delgadas capas de la alta atmósfera terrestre.",
      "Las comunicaciones se silenciarían pronto, dejando a Glenn completamente solo y aislado para enfrentar la fase más peligrosa y aterradora de toda la misión."
    ]
  },
  {
    title: "Sección 9: El Muro de Fuego",
    text: [
      "Al penetrar en las capas más densas de la atmósfera terrestre, la fricción aerodinámica extrema generó temperaturas superiores a los asombrosos 1,600 grados Celsius.",
      "La cápsula se vio rodeada rápidamente por una espectacular y cegadora bola de plasma ardiente y brillante que iluminó la pequeña ventana lateral de la nave.",
      "El gas súper ionizado del plasma bloqueó todas las ondas de radio, cortando por completo las comunicaciones vitales entre Glenn y el angustiado Control de Misión.",
      "Durante esos eternos y silenciosos minutos, la humanidad esperó en un silencio absoluto sin saber si el astronauta seguía vivo o si el escudo había fallado.",
      "Dentro de la cápsula en llamas, Glenn presenciaba un espectáculo visual verdaderamente aterrador mientras grandes trozos de los retrocohetes ardían en pedazos.",
      "Pudo ver brillantes fragmentos incandescentes volando furiosamente frente a su ventana, creyendo por un instante que su propio escudo protector se estaba desintegrando.",
      "A pesar de las intensas fuerzas G que lo aplastaban y del calor sofocante del exterior, se mantuvo alerta, concentrado y preparado para cualquier contingencia manual.",
      "La fricción siguió frenando la nave de manera brutal, y el fiel escudo térmico demostró ser una maravilla de la ingeniería al resistir todo el impacto.",
      "El falso indicador que causó tanto pánico resultó ser solo un fallo eléctrico menor, un sensor defectuoso que no reflejaba la integridad real de la placa.",
      "La nave sobrevivió a la prueba de fuego suprema, demostrando la capacidad de la tecnología humana para soportar las condiciones más extremas de la naturaleza."
    ]
  },
  {
    title: "Sección 10: Caída al Océano",
    text: [
      "A medida que la cápsula emergía del infierno de plasma y la velocidad se reducía considerablemente, las comunicaciones de radio se restablecieron por fin.",
      "La voz tranquila y exhausta de John Glenn resonó claramente en los altavoces de Control de Misión, confirmando con alivio que había sobrevivido al reingreso.",
      "Aproximadamente a unos 8,500 metros de altitud asombrosa, un pequeño paracaídas estabilizador se desplegó con éxito para alinear correctamente el morro de la nave.",
      "Momentos después, el enorme paracaídas principal naranja y blanco se abrió de golpe, reduciendo la velocidad de caída de la cápsula a unos suaves 32 km/h.",
      "La Friendship 7 descendió suavemente meciéndose en el aire fresco del cielo azul claro hasta impactar pacíficamente en las cálidas aguas del Océano Atlántico.",
      "El lugar del amarizaje estaba muy cerca de los barcos de recuperación de la Marina de los Estados Unidos, que ya se dirigían a toda máquina hacia la cápsula.",
      "Helicópteros de rescate y valientes buzos llegaron en pocos minutos para asegurar la pequeña nave flotante y garantizar la seguridad del cansado astronauta.",
      "Glenn permaneció dentro de la calurosa cápsula cerrada mientras era elevada y colocada cuidadosamente en la brillante cubierta plana del buque destructor.",
      "Cuando finalmente abrió la escotilla, el mundo entero celebró con alegría desbordante el regreso seguro de su nuevo y valeroso héroe explorador del espacio.",
      "El vuelo de 4 horas y 55 minutos llegó a su fin, pero su impacto duradero en la exploración humana del cosmos apenas acababa de comenzar ese gran día."
    ]
  },
  {
    title: "Sección 11: Fama y Heroísmo",
    text: [
      "El regreso seguro e histórico de John Glenn a la Tierra lo catapultó instantáneamente a la fama mundial como un héroe de proporciones legendarias y míticas.",
      "Fue recibido con un espectacular y multitudinario desfile de confeti en la ciudad de Nueva York, donde millones de personas agradecidas vitorearon su nombre.",
      "Su audaz y exitoso vuelo restauró profundamente el orgullo nacional de su país y renovó la confianza en la capacidad técnica y científica de la joven NASA.",
      "De repente, el programa espacial contaba con el apoyo unánime del público entusiasta, lo que permitió mayores inversiones gubernamentales en tecnología y ciencia.",
      "Glenn se reunió con el presidente de los Estados Unidos en la Casa Blanca, convirtiéndose en un poderoso símbolo internacional de valor, progreso y esperanza.",
      "A pesar de toda la fama abrumadora y la atención mundial constante, siempre mantuvo una actitud modesta, atribuyendo el gran éxito al trabajo en equipo colectivo.",
      "Su hazaña demostró que los astronautas humanos eran absolutamente esenciales para la exploración espacial, no solo como observadores, sino como operadores capaces y resolutivos.",
      "El éxito técnico del proyecto Mercury allanó directamente el camino para las complejas misiones Apolo que posteriormente llevarían al ser humano a la Luna.",
      "John Glenn inspiró a una generación entera de jóvenes científicos, ingenieros y soñadores a mirar hacia el cielo nocturno y preguntarse qué límites podrían superar.",
      "Su nombre quedó grabado de manera permanente e imborrable en las páginas doradas de la historia de la valiente exploración humana del universo inmenso."
    ]
  },
  {
    title: "Sección 12: Cambio de Carrera",
    text: [
      "A pesar de su inmenso éxito y su profundo deseo de regresar rápidamente al espacio, Glenn descubrió que la NASA no lo consideraría para futuros vuelos.",
      "Los líderes políticos y de la agencia lo consideraban un icono nacional demasiado valioso y vulnerable como para arriesgar su vida en otra misión peligrosa.",
      "Frustrado por no poder volver a volar en órbita, decidió enfocar su extraordinaria energía y compromiso público en una dirección completamente diferente y ambiciosa.",
      "Se retiró honrosamente del cuerpo oficial de astronautas en 1964, pero su ferviente deseo de servir a su nación no había disminuido en absoluto.",
      "Decidió entrar en la compleja arena política, llevando su mentalidad lógica, enfoque científico y popularidad nacional hacia el servicio público gubernamental y cívico.",
      "En 1974, después de una campaña dedicada, fue elegido como Senador de los Estados Unidos representando con orgullo a su estado natal de la gran Ohio.",
      "Durante su larga y distinguida carrera en el Senado, Glenn fue un firme y constante defensor de la educación de calidad, la investigación y la ciencia.",
      "Apoyó iniciativas cruciales para la exploración científica continua y luchó por aumentar el presupuesto de la NASA para la comprensión fundamental de nuestro cosmos.",
      "Sirvió al público con la misma dedicación e integridad moral inquebrantable que demostró como piloto de pruebas militar y pionero explorador de la gravedad cero.",
      "Aunque sus pies estaban ahora firmemente plantados en la Tierra, su visión e influencia continuaron impulsando fuertemente el avance de la tecnología aeroespacial estadounidense."
    ]
  },
  {
    title: "Sección 13: El Regreso Inesperado",
    text: [
      "Décadas después de su vuelo original en la cápsula Mercury, John Glenn sorprendió maravillosamente al mundo entero al anunciar que quería regresar al espacio.",
      "A la edad de 77 años, argumentó de manera convincente que estudiar los efectos de la ingravidez en su cuerpo mayor sería científicamente muy valioso.",
      "Los fisiólogos sabían que el viaje espacial prolongado afecta los huesos y músculos de forma muy similar al proceso natural del envejecimiento humano en la Tierra.",
      "Al estudiar a un hombre mayor en el espacio, la ciencia médica podría comprender y posiblemente encontrar curas para la osteoporosis y el deterioro muscular.",
      "La NASA analizó rigurosamente su propuesta y, asombrados por su impecable condición física y lucidez mental constante, aprobaron su regreso a la acción orbital.",
      "En 1998, 36 largos años después de su primera e histórica aventura, Glenn fue asignado como Especialista de Carga en el gran Transbordador Espacial Discovery.",
      "El anuncio fue recibido con inmensa alegría global, uniendo a diferentes generaciones de entusiastas espaciales y demostrando que la edad no limita los sueños audaces.",
      "Se entrenó duramente junto a tripulantes décadas más jóvenes que él, asimilando con entusiasmo la tecnología moderna y compleja de las grandes naves espaciales.",
      "Demostró una y otra vez que la sed insaciable de conocimiento científico y la pasión pura por la exploración no tienen una fecha de caducidad humana.",
      "El legendario astronauta pionero estaba listo para desafiar nuevamente las frías leyes de la gravedad y hacer historia astronómica mundial por segunda vez."
    ]
  },
  {
    title: "Sección 14: La Misión STS-95",
    text: [
      "El 29 de octubre de 1998, el poderoso Transbordador Espacial Discovery despegó con éxito desde la legendaria plataforma de lanzamiento en Cabo Cañaveral, Florida.",
      "John Glenn estableció un nuevo y asombroso récord mundial, convirtiéndose oficialmente en la persona de mayor edad en viajar y trabajar en el espacio profundo.",
      "Durante los emocionantes nueve días que duró la compleja misión STS-95, la tripulación realizó decenas de investigaciones médicas vitales y despliegues de tecnología satelital.",
      "Glenn participó activamente como sujeto de prueba en numerosos y rigurosos experimentos de salud sobre los ciclos de sueño, el equilibrio y la pérdida ósea.",
      "Esta vez viajaba en un ambiente orbital mucho más cómodo, espacioso y controlado que la diminuta, rudimentaria y claustrofóbica campana de su cápsula Mercury original.",
      "Pudo saborear la increíble experiencia de volar libremente por la espaciosa cabina sin la enorme tensión de estar probando los peligrosos límites del equipo básico.",
      "Sin embargo, la vista espectacular y majestuosa de la Tierra desde la ventana del transbordador seguía siendo exactamente igual de sobrecogedora y hermosa que siempre.",
      "El mundo observó maravillado cómo este gran veterano y héroe aportaba valiosos datos biológicos cruciales para entender el cuerpo humano en la investigación geriátrica moderna.",
      "El Transbordador Discovery aterrizó de forma segura y perfecta, marcando la exitosa culminación del último, glorioso y audaz vuelo espacial de una gran leyenda.",
      "Demostró al mundo entero que la determinación férrea, la buena salud y la curiosidad incesante permiten continuar grandes hazañas más allá de cualquier límite imaginario."
    ]
  },
  {
    title: "Sección 15: Un Legado Permanente",
    text: [
      "La vida y las asombrosas hazañas de John Glenn representan uno de los capítulos más brillantes, valientes e inspiradores de toda la historia humana y espacial.",
      "Desde sus humildes días volando peligrosos aviones de prueba hasta orbitar la Tierra dos veces en distintas épocas, su nombre es un sinónimo de audacia.",
      "Él encarnó a la perfección los más altos ideales de valentía incuestionable, profundo intelecto científico y un servicio público excepcional y desinteresado hacia la sociedad.",
      "Falleció en el año 2016 a los 95 años de edad, dejando un poderoso y positivo impacto que trasciende a la ciencia, la política y la cultura global.",
      "Numerosas prestigiosas escuelas, importantes centros de investigación de la NASA e incluso un avanzado telescopio espacial llevan hoy su ilustre nombre como tributo eterno.",
      "Las lecciones técnicas aprendidas de su primer vuelo histórico sentaron la indispensable base para que los astronautas pisaran la Luna y construyeran estaciones espaciales modernas.",
      "Su segundo vuelo ayudó directamente a entender las condiciones del envejecimiento y mejoró innegablemente la investigación biomédica y geriátrica para millones de ancianos en la Tierra.",
      "Para los jóvenes cadetes y estudiantes de esta academia, John Glenn es el ejemplo supremo de que la preparación rigurosa y el valor derrotan lo desconocido.",
      "Su asombrosa historia nos recuerda constantemente que, con gran esfuerzo y dedicación, la humanidad es capaz de conquistar incluso los entornos más hostiles del universo.",
      "Y siempre nos inspira profundamente a observar las brillantes estrellas y recordar que nuestra sed infinita de exploración es lo que nos impulsa siempre hacia adelante."
    ]
  }
];

if (johnIdx !== -1) {
  // Aseguramos mantener las imagenes ya establecidas en el curso
  for(let i=0; i<15; i++) {
    jsData[johnIdx].contentEs.sections[i].title = newJohnSections[i].title;
    jsData[johnIdx].contentEs.sections[i].text = newJohnSections[i].text;
  }
  
  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Misión de John Glenn reconstruida exitosamente con 10 líneas de narrativa rica por sección.");
}
