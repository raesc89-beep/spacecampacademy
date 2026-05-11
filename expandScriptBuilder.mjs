import fs from 'fs';

const HUGE_TEXTS = {
  "egypt_m1": \`[1] ¡Saludos, explorador espacial! Viajamos a Nabta Playa, el observatorio astronómico prehistórico más antiguo del mundo, ubicado en el ardiente desierto del Sahara.
[2] Antes de las famosas pirámides, hace más de 7,000 años, tribus nómadas erigieron estos gigantescos megalitos circulares.
[3] No tenían telescopios de la NASA, pero su supervivencia dependía completamente de leer los movimientos de las estrellas.
[4] Las piedras centrales estaban alineadas para predecir con exactitud el solsticio de verano.
[5] El solsticio anunciaba los monzones y las lluvias torrenciales que llenaban los lagos y daban vida al desierto.
[6] La astrofísica moderna ha utilizado software para confirmar que apuntaban al cinturón de Orión.
[7] Los antiguos egipcios consideraban a la constelación de Orión como la manifestación del dios Osiris.
[8] Además, marcaban el amanecer helíaco de estrellas clave como Sirio, que anunciaba las inundaciones del Nilo.
[9] La disposición de las piedras demuestra un conocimiento profundo de la geometría celeste milenios antes que Stonehenge.
[10] Científicos de la Universidad de Colorado confirmaron en 1998 las alineaciones estelares exactas de Nabta Playa.
[11] Encontraron tumbas subterráneas para vacas sagradas, alineadas con patrones estelares específicos.
[12] La adoración al ganado cósmico se transformó más tarde en la veneración de la diosa Hathor en el Egipto dinástico.
[13] La precisión astronómica requerida para construir esto exige observaciones continuas durante múltiples generaciones.
[14] Los megalitos actúan como una computadora de piedra, donde la posición del sol proyecta sombras para leer el calendario.
[15] Este lugar prueba que la ciencia astronómica nació por pura necesidad de supervivencia y adaptación al clima extremo.
[16] Las tribus de Nabta Playa fueron forzadas a migrar al Valle del Nilo cuando el clima se secó por completo.
[17] Al migrar, llevaron consigo todos estos conocimientos estelares, sembrando la semilla de la ciencia faraónica.
[18] Hoy en día, astrobiólogos de la ESA estudian ruinas como esta para entender cómo las civilizaciones tempranas interactúan con su entorno cósmico.
[19] Nabta Playa no es solo un monumento, es el primer reloj y calendario de la historia humana.
[20] Así es como la humanidad aprendió por primera vez a conectar los eventos en la Tierra con los ritmos del Universo profundo.\`,

  "egypt_m2": \`[1] Imagínate en medio de la oscuridad absoluta del desierto egipcio sin ningún reloj moderno. ¿Cómo mides la noche?
[2] Los astrónomos egipcios inventaron una solución brillante: dividieron la banda del cielo en 36 secciones.
[3] A estos 36 grupos de estrellas brillantes los llamaron "Los Decanos" o estrellas decanales.
[4] A medida que la Tierra rota, un nuevo Decano emerge sobre el horizonte este, marcando el paso de una hora.
[5] Durante la noche estival en Egipto, aproximadamente 12 de estos Decanos son visibles sucesivamente.
[6] ¡Esta es la razón científica exacta por la que nuestro día moderno tiene 24 horas y nuestra noche 12!
[7] Pero no eran solo marcadores científicos; para la teología egipcia, eran espíritus celestiales de gran poder.
[8] Pintaban complejos 'relojes estelares diagonales' en los techos de las tumbas para guiar a las almas.
[9] Estos relojes permitían al difunto saber qué hora era mientras navegaba por el oscuro inframundo (la Duat).
[10] La NASA ha documentado cómo las constelaciones cambian lentamente debido a la precesión de los equinoccios.
[11] Los egipcios, con el paso de los siglos, notaron que sus decanos se desfasaban lentamente.
[12] Para corregirlo, integraron la observación de los planetas gigantes como Júpiter y Saturno en sus cálculos.
[13] Los textos de las pirámides mencionan a los Decanos como los "jueces" que pesan el corazón del muerto.
[14] A nivel astronómico, usaban un instrumento llamado merkhet para observar el tránsito de los Decanos.
[15] El merkhet era una plomada sostenida por una hoja de palma cortada que funcionaba como un visor de precisión.
[16] Registraban el nacimiento cósmico de cada decano en papiros médicos para determinar cuándo administrar medicinas.
[17] Sí, la primera cronobiología médica de la historia fue controlada por la luz de estrellas lejanas.
[18] Estudios recientes del Instituto Max Planck confirman la exactitud de los calendarios estelares encontrados en sarcófagos de Asyut.
[19] Los Decanos representan la fusión perfecta entre la astronomía empírica pura y la mitología religiosa inmersiva.
[20] Gracias a las estrellas del Nilo, nuestra sociedad moderna logró sincronizar sus relojes por primera vez en la historia.\`,

  "egypt_m3": \`[1] De todas las estrellas en la bóveda celeste, Sirio (en la constelación del Can Mayor) reina de forma suprema.
[2] Los egipcios la conocían como "Sopdet" y la personificaban como una diosa de deslumbrante belleza cósmica.
[3] El destino entero del Imperio Egipcio dependía matemáticamente de los movimientos de esta sola estrella.
[4] Cada año, Sopdet desaparecía del cielo nocturno durante exactamente 70 días al ser ocultada por el Sol.
[5] Creían que durante estos 70 días, la diosa viajaba por los peligros del inframundo purificándose.
[6] El evento más importante del año era el "Orto Helíaco" de Sirio: la mañana en que volvía a ser visible.
[7] Parpadeaba en el horizonte oriental justo minutos antes de que el brillo del amanecer inundara la Tierra.
[8] Este renacimiento estelar marcaba oficialmente el comienzo del Día de Año Nuevo egipcio.
[9] Su reaparición coincidía perfectamente con el comienzo de las inundaciones anuales del poderoso río Nilo.
[10] Las aguas desbordadas depositaban "Kemet", el lodo negro hiper-fértil sobre la arena del desierto.
[11] Sin este ciclo astronómico, las cosechas habrían fallado y Egipto habría perecido de hambruna total.
[12] La estrella Sirio es un sistema estelar binario, Sirio A y Sirio B, a solo 8.6 años luz de la Tierra.
[13] El telescopio Hubble de la NASA ha fotografiado a Sirio B, la compañera enana blanca masiva.
[14] Aunque los egipcios no tenían telescopios, su cálculo del ciclo de Sirio fue de 365.25 días exactos.
[15] Tan sagrados eran los 70 días de invisibilidad de Sopdet, que dictaron el proceso de momificación.
[16] El proceso de momificación para faraones duraba exactamente 70 días, imitando el ciclo estelar de la diosa.
[17] Al terminar, la momia "renacía" en la tumba al mismo tiempo que la estrella renacía en el cielo.
[18] Esta sincronización entre la biología mortuoria y la astrofísica demuestra un intelecto filosófico sin paralelo.
[19] Los templos de la diosa Isis estaban alineados para atrapar la luz del Orto Helíaco en sus santuarios oscuros.
[20] Así, la astronomía no solo medía el tiempo, sino que garantizaba la vida, el agua y la eternidad en el Nilo.\`,

  "egypt_m4": \`[1] Si miras al cielo norte, encontrarás El Gran Cazo o la Osa Mayor.
[2] Pero para los astrónomos egipcios, esta formación era "Mesjetiu", la poderosa pata delantera de un toro cósmico.
[3] Mesjetiu es una constelación circumpolar, lo que significa que gira cerca del polo y nunca se pone.
[4] Mientras otras estrellas nacían y morían en el horizonte, Mesjetiu giraba en círculos eternos e inmortales.
[5] Por esta razón, las llamaban "Las Imperecederas", las almas de los faraones que habían conquistado la muerte.
[6] Esta constelación era la herramienta de ingeniería y arquitectura más crítica de todo el imperio faraónico.
[7] A través del místico ritual nocturno llamado "El Estiramiento de la Cuerda", fijaban el Norte Verdadero.
[8] El faraón y una sacerdotisa (encarnando a la diosa Seshat) salían al desierto bajo la noche estrellada.
[9] Usando un compás estelar llamado merkhet, apuntaban visualmente hacia las estrellas de Mesjetiu.
[10] Al medir la posición más alta y más baja de la constelación durante la noche, encontraban el polo celeste.
[11] Trazaban este eje en el suelo, logrando alinear pirámides masivas con errores de apenas fracciones de grado.
[12] Los satélites topográficos modernos han confirmado que la Gran Pirámide está orientada casi perfectamente al norte.
[13] Lograron esto sin brújulas magnéticas, ya que el norte magnético varía, pero el astronómico es estable.
[14] La física detrás de esto implica la rotación axial de la Tierra, que los egipcios entendían empíricamente.
[15] Las estrellas de la Osa Mayor están ubicadas a distancias variables, desde 50 hasta 100 años luz de nosotros.
[16] Los egipcios documentaron cómo la constelación lentamente cambiaba de lugar por el bamboleo de la Tierra (Precesión).
[17] En los textos antiguos, Mesjetiu estaba controlada por el dios Seth para que nunca tocara las aguas del inframundo.
[18] Thot, el dios de la sabiduría, supervisaba estos cálculos que mantenían el orden cósmico o "Maat".
[19] Gracias a Mesjetiu, los egipcios no solo construyeron tumbas, sino observatorios geodésicos a escala monumental.
[20] Las estrellas imperecederas demostraron que, en Egipto, la matemática arquitectónica estaba escrita en el cielo.\`,

  "egypt_m5": \`[1] Las Grandes Pirámides de Giza son la máxima proeza astronómica e ingenieril del mundo antiguo.
[2] Son máquinas de precisión geodésica, montañas artificiales ancladas matemáticamente a los cielos oscuros.
[3] Su alineación hacia los cuatro puntos cardinales es perfecta, con un error estadístico prácticamente imperceptible.
[4] ¿Cómo lograron este prodigio tecnológico milenios antes del GPS, los satélites o los láseres?
[5] Utilizaron el método de la Bisección Estelar, utilizando los astros en su órbita aparente alrededor de la Tierra.
[6] Construían inmensos muros circulares nivelados con agua, creando un horizonte artificial perfecto sin dunas.
[7] Un sacerdote se paraba en el centro y marcaba dónde nacía una estrella en el este y dónde se ponía en el oeste.
[8] Trazaban líneas hacia ambos puntos, creando un ángulo. Al dividirlo exactamente a la mitad, hallaban el Norte Verdadero.
[9] Esta técnica astrométrica es alabada hoy por las facultades de astrofísica modernas por su simplicidad y brillantez.
[10] La Gran Pirámide no usaba el norte magnético porque sabían que es inestable; se anclaron al eje de rotación terrestre.
[11] En su apogeo, las pirámides estaban revestidas con piedra caliza blanca brillante y pulida como espejos.
[12] Actuaban como faros cósmicos que reflejaban la luz de la luna y el sol abrasador del desierto.
[13] La Agencia Espacial Europea (ESA) utiliza sistemas satelitales que todavía usan estas pirámides para calibrar lentes espaciales.
[14] Sorprendentemente, el perímetro de la Gran Pirámide dividido por su altura es igual a Pi (3.14) multiplicado por dos.
[15] Esto demuestra que los constructores poseían fórmulas matemáticas sofisticadas derivadas del movimiento circular de las estrellas.
[16] Al caer la noche, la pirámide señala hacia el cinturón de Orión, reflejando el orden del macrocosmos en el microcosmos.
[17] La civilización que las levantó entendía que la Tierra era un objeto que interactuaba geométricamente con los cielos.
[18] Son el testimonio de piedra definitivo de que la raza humana puede alcanzar lo imposible combinando ciencia y creencia.
[19] Los bloques megalíticos, que pesan toneladas, fueron izados no por alienígenas, sino por matemáticos estelares puros.
[20] El "Láser de Giza" no es luz, sino la inquebrantable línea recta matemática trazada desde las estrellas hasta las dunas.\`,

  "egypt_m6": \`[1] En las ardientes arenas de Deir el-Bahari se oculta la cámara secreta TT353, perteneciente al arquitecto Senenmut.
[2] Senenmut fue el genio plebeyo, científico y consejero supremo de Hatshepsut, una de las mayores faraonas.
[3] Su cámara no guarda oro macizo, sino el mapa astronómico del universo más antiguo descubierto por la humanidad.
[4] En el techo de su cámara funeraria, trazó con precisión milimétrica la anatomía de los cielos egipcios.
[5] El panel está científicamente dividido en dos hemisferios exactos: el cielo del norte y el cielo del sur.
[6] En el hemisferio norte catalogó los doce meses lunares y a los enormes dioses que regulan las estrellas inmortales.
[7] En el hemisferio sur dibujó a los Decanos, los marcadores estelares que rigen el reloj nocturno egipcio.
[8] Lo más asombroso es el registro astronómico de los grandes planetas, alineando a Júpiter y Saturno magistralmente.
[9] En el mapa, la diosa Isis navega sobre la Vía Láctea en su mágica barca solar rodeada de ecuaciones jeroglíficas.
[10] Senenmut no pintó esto para impresionar a arqueólogos futuros, sino como un GPS espiritual ultra-preciso.
[11] El mapa era el código de navegación cartográfico para que su propia alma pudiera viajar por las trampas del inframundo.
[12] Hoy, los astrónomos usan planetarios de computadora para retroceder el tiempo y validar la precisión del mapa de Senenmut.
[13] Descubrieron que las constelaciones pintadas coinciden matemáticamente con el cielo de hace 3,500 años en Egipto.
[14] El mapa incluye constelaciones perdidas en la modernidad, como "El Hipopótamo", que representaba el polo norte cósmico.
[15] Demuestra que el conocimiento astronómico egipcio no era una fábula, sino una ciencia de observación profunda y documentada.
[16] Los académicos de la Universidad de Yale han estudiado este techo para entender la evolución de la astronomía global.
[17] Gracias a este catálogo, sabemos que Kemet (Egipto) fue la cuna de la astronomía descriptiva.
[18] Senenmut codificó en este techo el secreto del cosmos: que la vida mortal está gobernada por fuerzas mecánicas y celestiales.
[19] Su descubrimiento en la década de 1920 revolucionó completamente la egiptología y la historia de la ciencia antigua.
[20] El techo de TT353 es verdaderamente la primera gran enciclopedia estelar de la raza humana, grabada para la eternidad.\`,

  "egypt_m7": \`[1] La Gran Pirámide del rey Keops esconde un misterio perturbador en las llamadas Cámaras del Rey y de la Reina.
[2] Desde las paredes de granito sólido de estas cámaras, se elevan unos canales estrechos de 20 por 20 centímetros.
[3] Al principio de la arqueología, los egiptólogos creyeron ingenuamente que eran tuberías de ventilación para los obreros antiguos.
[4] Sin embargo, investigaciones modernas con robots miniaturizados y láseres ópticos desmintieron por completo esta teoría simplista.
[5] Estos misteriosos canales son, en realidad, los telescopios fijos más grandes y pesados del mundo antiguo.
[6] Tienen un grado de inclinación diagonal calculado matemáticamente a la perfección para apuntar a puntos específicos del cielo.
[7] El canal norte de la Cámara del Rey apuntaba exactamente a la estrella polar de la época, llamada Thuban.
[8] Apuntar a Thuban significaba anclarse a las estrellas "Imperecederas", las almas cósmicas que nunca caen al horizonte.
[9] El canal sur, por su parte, estaba alineado de manera inmaculada hacia el cinturón del gigante cósmico, la constelación de Orión.
[10] Para los egipcios, Orión era la representación celestial pura del gran dios Osiris, el gobernante supremo de la resurrección.
[11] Estos enormes conductos vacíos no eran para que respiraran los vivos, sino que eran cañones espirituales balísticos.
[12] Actuaban como rampas de lanzamiento para que el alma inmaterial del faraón pudiera escapar de la gravedad terrestre.
[13] Creían que a través de estos canales, la energía del rey se dispararía a la velocidad de la luz hacia las estrellas.
[14] Investigadores como Robert Bauval proponen que toda la meseta de Giza es un mapa terrestre del cinturón de Orión.
[15] Las observaciones arqueoastronómicas de la NASA confirman que los ángulos de los ductos son demasiado exactos para ser coincidencia.
[16] Al usar simuladores espaciales (como Stellarium), vemos cómo las estrellas encajaban exactamente en la mira de estos canales.
[17] A medida que la Tierra bambolea en su eje (precesión), las estrellas cambian de lugar, por lo que los canales datan la pirámide perfectamente.
[18] Son relojes de piedra masivos e inquebrantables, petrificando el cielo nocturno del año 2500 a.C.
[19] Los canales estelares de Giza son la prueba innegable de la obsesión humana milenaria por alcanzar los cuerpos celestes.
[20] Hoy en día mandamos cohetes; hace milenios, los egipcios lanzaban el alma misma a través del núcleo vivo de una pirámide.\`,

  "egypt_m8": \`[1] Cerca de la remota frontera sur de Nubia, frente al Nilo, se levanta la maravilla megalómana del templo de Abu Simbel.
[2] Ordenado por Ramsés II (el Grande), este templo no fue construido, sino tallado enteramente dentro de una montaña de roca sólida.
[3] Su fachada es colosal, custodiada por estatuas del faraón de 20 metros de altura que intimidan a cualquier visitante.
[4] Pero el verdadero secreto hiper-científico de Abu Simbel está a 60 metros de profundidad, en las entrañas oscuras de la montaña.
[5] En lo profundo y al final del corredor, existe un santuario sagrado sumido en la oscuridad absoluta los 365 días del año.
[6] Allí descansan las estatuas esculpidas en la roca de Ra-Horajti, Ramsés deificado, Amón-Ra y el oscuro dios Ptah.
[7] La brillantez astronómica egipcia programó en piedra uno de los milagros arquitectónicos más impresionantes del planeta.
[8] Solo dos mañanas al año: el 22 de octubre y el 22 de febrero, un evento mágico y astronómico ocurre.
[9] En esas fechas precisas, que marcan el cumpleaños y la coronación de Ramsés, un fino rayo solar cruza la puerta principal.
[10] El láser de luz viaja intacto los 60 metros por el corredor de piedra e ilumina directamente el rostro de Ramsés, Ra y Amón.
[11] En un alarde de matemáticas magistrales, el rayo se corta abruptamente, dejando al dios Ptah siempre sumido en la oscuridad.
[12] ¿Por qué? Porque en la mitología teológica de Egipto, Ptah era el deidad del inframundo, quien nunca debe tocar la luz solar.
[13] Calcular la altitud, el acimut solar y el ángulo de penetración en una cueva oscura requiere una trigonometría impecable.
[14] Para lograr esto, los ingenieros debían entender a fondo la traslación de la Tierra alrededor del Sol en su eclíptica.
[15] En los años 60, cuando la represa de Asuán iba a inundar el templo, un equipo internacional lo cortó y mudó bloque por bloque.
[16] Al reensamblarlo más arriba, con la tecnología del siglo XX, los ingenieros fallaron por 1 día en igualar el rayo de luz original.
[17] Esto demuestra que los cálculos arqueoastronómicos de los arquitectos de Ramsés II superaban en fineza a algunas técnicas modernas.
[18] Abu Simbel es un gigantesco reloj solar, un teatro cósmico diseñado para glorificar la vida inmortal del faraón a través del sol.
[19] Es la prueba física inquebrantable de cómo la astronomía antigua podía doblegar a la geología de una montaña entera.
[20] El rayo de sol que ilumina la oscuridad en Abu Simbel es la firma luminosa de una de las civilizaciones más grandes de la historia.\`,

  "egypt_m9": \`[1] En las misteriosas y elevadas capillas del Templo de Hathor en Dendera, el cielo nocturno está petrificado en arenisca pura.
[2] Los arqueólogos europeos se quedaron sin aliento al descubrir en el techo un inmenso bloque de piedra conocido como el Zodiaco de Dendera.
[3] Es un planisferio cósmico, un colosal mapa circular bidimensional que resume y proyecta toda la bóveda estelar conocida.
[4] Pero este mapa no es puramente egipcio; es el artefacto que demuestra la fusión intelectual suprema de la antigüedad.
[5] Creado bajo el reinado de los Ptolomeos, funde el misticismo egipcio, la estricta geometría griega y la astrología asiria-babilónica.
[6] Al observarlo, puedes distinguir las constelaciones familiares como Aries, Tauro, Escorpio y Piscis, dispuestas en una rueda perfecta.
[7] Sin embargo, están reimaginadas bajo el lente de Kemet: dioses egipcios inmensos flanquean y sostienen el peso del firmamento.
[8] Además del horóscopo, el disco es un registro y una calculadora matemática de eventos y eclipses verdaderos.
[9] Los astrofísicos analizaron las posiciones y confirmaron que el Zodiaco señala una alineación planetaria exacta ocurrida en el año 51 a.C.
[10] Identificaron cinco planetas principales (Mercurio, Venus, Marte, Júpiter y Saturno) grabados en los signos zodiacales correctos para ese año.
[11] También inmortaliza un eclipse solar y un eclipse lunar utilizando la iconografía de deidades siendo ensombrecidas y consumidas.
[12] Dendera es, esencialmente, una supercomputadora celeste en formato sólido, un CD-ROM de granito de la astronomía prehistórica.
[13] Muestra una red invisible, donde el zodiaco actúa como el cinturón del espacio profundo por donde circulan todos los planetas.
[14] El original pesa toneladas y actualmente reside en el Museo del Louvre, robado por ingenieros franceses en el siglo XIX.
[15] A través del Zodiaco, comprendemos cómo la humanidad pasó de temer a los eclipses, a calcularlos y registrarlos como un reloj suizo.
[16] Es el testimonio innegable de la internacionalización temprana de las ciencias matemáticas y estelares en el mundo antiguo.
[17] La diosa Hathor, señora del cielo estrellado, domina el templo como la fuerza cósmica que une las órbitas de los cuerpos celestes.
[18] Cada cincelazo en ese bloque requirió cálculos trigonométricos avanzados y observaciones que se extendieron durante milenios.
[19] Las constelaciones nos recuerdan que las estrellas no pertenecen a una nación; son el patrimonio visual de la humanidad entera.
[20] El Zodiaco de Dendera es el puente definitivo entre el universo matemático y la profunda espiritualidad de las civilizaciones pasadas.\`,

  "egypt_m10": \`[1] El Valle de los Reyes, 1925. Howard Carter desenvuelve cuidadosamente las gruesas capas de lino del rey niño, Tutankamón.
[2] Oculta junto al muslo derecho de la momia dorada, se encontraba un arma misteriosa que revolucionaría la arqueología y la metalurgia.
[3] Era una hermosa daga con empuñadura de oro puro y cristal, pero el enigma radicaba completamente en su hoja afilada y prístina.
[4] La hoja era de hierro perfecto y brillante, completamente libre de óxido tras haber permanecido enterrada bajo tierra por 3,300 años.
[5] El conflicto científico era masivo: Egipto en esa época vivía la Edad del Bronce; no sabían fundir minerales de hierro terrestres.
[6] Para fundir las rocas de hierro de la Tierra se requieren hornos de altas temperaturas que la civilización egipcia simplemente no poseía.
[7] ¿De dónde obtuvo el imperio más poderoso de la Tierra un arma de hierro resplandeciente e imposible de fabricar?
[8] La verdad yacía en el espacio profundo. En 2016, un equipo de científicos bombardeó la hoja con espectrometría de fluorescencia de rayos X.
[9] El análisis químico molecular reveló que la hoja contenía casi un 11% de níquel y trazas indiscutibles de cobalto radiactivo inerte.
[10] Esta huella química no existe en las minas terrestres; es la firma inconfundible y patentada de los meteoritos férricos del espacio exterior.
[11] La daga del Faraón fue forjada literalmente del núcleo ardiente de un asteroide masivo que se estrelló en el desierto del Sahara.
[12] Los astrónomos y sacerdotes de la antigüedad entendían perfectamente el origen extraterrestre y divino de este metal pesado y sagrado.
[13] Desarrollaron una palabra especial en jeroglíficos para este material: "Bia-en-pet", que se traduce como "El Hierro que Cayó del Cielo".
[14] Empuñar esta daga no era solo un símbolo de poder político; significaba que el faraón dominaba los secretos del polvo de estrellas.
[15] Las agencias espaciales modernas han validado que meteoritos como el "Kharga" en Egipto coinciden geológicamente con la daga real.
[16] Al forjar el metal en frío, los orfebres egipcios crearon una hoja inoxidable, demostrando técnicas avanzadas de manipulación de metales duros.
[17] Esta daga prueba que los antiguos observaban asombrados las lluvias de meteoritos, recogiéndolos como fragmentos literales de los dioses.
[18] Para Tutankamón, el arma era un pasaporte celestial. Cortaría a los demonios en la oscuridad utilizando el poder concentrado de una estrella caída.
[19] No es alienígena en el sentido de la ciencia ficción, sino el testimonio del ingenio humano utilizando regalos caídos directamente del sistema solar.
[20] La daga de meteorito es la prueba irrefutable de que, en Egipto, la astrofísica y el armamento real estaban forjados en una misma pieza.\`,

  "egypt_m11": \`[1] A diferencia del concepto moderno del universo como un espacio frío y vacío lleno de vacío y radiación, los egipcios veían vida.
[2] Para ellos, el cosmos era gigantesco, cálido, mágico e increíblemente interconectado. "Como es arriba, es abajo" dictaba la regla cósmica.
[3] Al observar la magnífica cinta espiral que llamamos la Vía Láctea, no veían miles de millones de soles gaseosos en fusión nuclear.
[4] Veían a "Nut", la deidad suprema y protectora del cielo, la colosal madre divina arqueada sobre toda la superficie de la Tierra.
[5] El cuerpo azul noche de Nut estaba constelado de estrellas deslumbrantes. Sus manos se anclaban en el oeste y sus pies en el este.
[6] La mitología astronómica afirmaba que cada tarde, cuando el sol desaparecía en el horizonte rojo, Nut se estaba tragando a Ra.
[7] Ra viajaba como una chispa dorada por el tracto digestivo de la diosa, iluminando las estrellas desde adentro, produciendo la noche oscura.
[8] Al despuntar el alba matutina rosada, Nut daba a luz al Sol nuevamente, reiniciando el milagro de la vida y la fotosíntesis terrestre.
[9] Bajo la filosofía del "Maat" (equilibrio cósmico perfecto), la Vía Láctea no era un objeto aleatorio; era el inmenso "Nilo Celestial".
[10] Imaginaban la galaxia como un inmenso río de energía y luz plateada navegable, idéntico y paralelo al río Nilo terrenal.
[11] En las aguas celestiales, navegaban las estrellas y las almas incorruptibles de los muertos a bordo de gigantescas barcas solares.
[12] Fascinantemente, la geografía astronómica egipcia llevó a arquitectos a diseñar ciudades enteras para que funcionaran como un espejo estelar.
[13] Muchos templos y necrópolis sagradas fueron distribuidos a las orillas del Nilo para emular la distribución de constelaciones en la Vía Láctea.
[14] El cielo y el agua se convirtieron en la matriz fundacional de todo el urbanismo y la religión estatal de la antigüedad egipcia.
[15] Las pirámides se pintaban y coronaban de oro para captar los primeros rayos del renacimiento de Nut, uniendo las dimensiones estelares.
[16] Para el campesino promedio, observar la Vía Láctea era una profunda experiencia religiosa que reafirmaba que el universo estaba en orden y protegido.
[17] Si Nut dejaba de sostener el cielo arqueado, la gravedad y el caos destruirían la existencia; era la fuerza de la naturaleza personificada.
[18] Estudios recientes en astrometría revelan que el plano de la Vía Láctea era el verdadero eje referencial de muchas religiones arcaicas.
[19] Así, la galaxia en la que giramos no era un concepto ajeno o lejano; era la propia anatomía y circulación sanguínea del universo ptolemaico.
[20] El Nilo de Nut demuestra la profunda y poética necesidad del ser humano por conectar los ecosistemas terrestres con las maravillas galácticas.\`,

  "egypt_m12": \`[1] Elevándose sobre los inmensos atrios de los templos antiguos, proyectando imponentes sombras bajo el sol implacable, encontramos a los Obeliscos.
[2] Estéticamente deslumbrantes, estas columnas de hasta 30 metros de altura están talladas de un solo e inmenso bloque ininterrumpido de granito rojo masivo.
[3] En la parte superior culminan en un ápice piramidal perfecto (el piramidión), que en la antigüedad estaba bañado en electro (oro y plata).
[4] Este recubrimiento brillante estaba diseñado por los ingenieros ópticos antiguos para actuar como un destello cegador al atrapar el primer rayo del amanecer.
[5] Pero sería una equivocación rotunda creer que los obeliscos eran simples y majestuosos trofeos decorativos esculpidos por la megalomanía de un faraón.
[6] Tecnológicamente, los obeliscos eran colosales y exactos instrumentos astronómicos, calculadoras geométricas clavadas permanentemente al suelo del desierto.
[7] Funcionaban principalmente como gigantescos "gnomones". En la astronomía clásica, un gnomon es la barra central alta de un enorme reloj de sol.
[8] El brillante sol africano impactaba contra el granito y proyectaba una sombra afilada y oscura sobre la pavimentación pulida y milimétrica del templo.
[9] Equipos de sacerdotes matemáticos sumamente entrenados medían meticulosamente la longitud exacta y la trayectoria angular de esa sombra moviéndose cada minuto.
[10] Mediante el cálculo trigonométrico de las sombras, sabían con absoluta precisión la hora del día para organizar rituales, el comercio y la sociedad.
[11] Aún más crítico: al registrar con cuidado el día exacto en que la sombra del mediodía era estadísticamente más corta (verano) o más larga (invierno), calcularon los años solares.
[12] Determinaron sin fallos matemáticos la ocurrencia de los solsticios de verano e invierno, vitales para pronosticar los ciclos climáticos y las crecidas del río.
[13] Es el equivalente milenario a clavar un telescopio solar vertical que usa los fotones del sol en lugar de lentes de cristal.
[14] Erigir estos colosos monolíticos sin grúas hidráulicas de acero ni poleas motorizadas sigue asombrando y frustrando a los ingenieros y físicos mecánicos contemporáneos.
[15] Las fuerzas de palanca, la gravedad aplicada y la fricción de la arena fueron dominadas magistralmente por la inteligencia y la fuerza laboral sincronizada egipcia.
[16] Al observar las sombras, Egipto impuso el concepto de tiempo ordenado sobre el caótico ritmo de vida del ser humano primitivo.
[17] Muchos obeliscos fueron robados en siglos posteriores por los imperios romano y británico debido a su innegable majestuosidad y misterio matemático.
[18] Por ejemplo, el que está en la Plaza de San Pedro en Roma o el de la Concordia en París; todos son faros de la brillantez astronómica de Kemet.
[19] Un obelisco es, en última instancia, el intento más exitoso de la humanidad por atrapar la luz de una estrella en constante movimiento y medir su fuerza.
[20] Transformaron la piedra inerte en la primera aguja de reloj de alta precisión de la historia global, uniendo el tiempo del sol con la arena de la Tierra.\`,

  "egypt_m13": \`[1] Te parece completamente natural que tu smartphone te diga que el año tiene 365 días, pero en la prehistoria, nadie sabía cuánto duraba la órbita terrestre.
[2] Las primeras civilizaciones primitivas del mundo (como Babilonia) basaron sus ineficientes calendarios en las fases observables y cambiantes de la luna.
[3] El gigantesco problema científico de la Luna es que sus meses son asimétricos y caóticos, causando que un año lunar tenga apenas 354 días.
[4] Rápidamente, el calendario se desfasaba de la realidad estacional; los meses de "frío" terminaban cayendo en pleno verano asfixiante, arruinando la agricultura.
[5] Egipto no podía depender del azar: su imperio era una máquina perfecta construida en un desierto y su supervivencia pendía del ciclo exacto del Nilo.
[6] Los brillantes astrónomos y matemáticos de Kemet hicieron un avance que cambiaría a la humanidad para siempre: observaron detenidamente la traslación solar real.
[7] Mediante el seguimiento continuo del orto helíaco de la estrella Sirio y los solsticios, fijaron empíricamente que la Tierra tardaba aproximadamente 365 días en su viaje.
[8] Con valentía e innovación extrema, descartaron la caótica luna e implementaron el primer Calendario Civil Solar estandarizado y matemático de la historia humana.
[9] Diseñaron la estructura de manera perfecta: el año tendría exactamente 12 meses idénticos. Cada mes constaría de exactamente 30 días, resultando en un bloque central de 360 días.
[10] Esta simetría facilitaba inmensamente el cobro de impuestos, el pago a los ejércitos, los censos y la administración del enorme imperio burocrático.
[11] Pero la física astronómica es inflexible; sabían que faltaban cinco días críticos para que las matemáticas abstractas se sincronizaran con el cosmos real.
[12] ¿La genial solución? Inventaron los "Días Epagómenos": cinco días extra e independientes insertados audazmente justo al final de cada año solar base de 360.
[13] Crearon, en esencia, un "mes súper corto" de vacaciones festivas. Religiosamente, se declaraba que estos cinco días pertenecían exclusivamente a los dioses.
[14] La mitología los justificaba como los días en los que Nut (el cielo) dio a luz a los cinco grandes hijos: Osiris, Horus el Mayor, Seth, Isis y Neftis.
[15] Julius Caesar, siglos después, quedó tan impresionado por esta asombrosa perfección astronómica que basó todo el Calendario Juliano romano en la ciencia egipcia pura.
[16] Al corregir más tarde los años bisiestos, el sistema derivó directamente en el calendario Gregoriano que todo el planeta Tierra utiliza en la actualidad comercial.
[17] Detente a pensar en esto: cada vez que agendas un evento en Google Calendar, estás utilizando tecnología matemática concebida hace cinco milenios junto a las orillas del río Nilo.
[18] Superaron la superstición puramente astrológica e impusieron la geometría empírica sobre el caótico movimiento planetario del sistema solar interno.
[19] Así, Egipto logró conquistar no solo grandes territorios físicos, sino algo infinitamente más elusivo, inmaterial y poderoso: lograron conquistar el Tiempo mismo.
[20] El concepto de los 365 días es, posiblemente, el mayor, más antiguo y más duradero obsequio científico de los faraones al orden global contemporáneo.\`,

  "egypt_m14": \`[1] El cielo del norte de África en el Antiguo Egipto era monótono, eternamente despejado y predecible, con el sol calcinando la tierra ininterrumpidamente día tras día.
[2] Pero en raras, aterradoras y violentas excepciones astronómicas, el orden absoluto colapsaba; a plena luz del mediodía, un fenómeno paralizante y monstruoso se desataba.
[3] Sin advertencia visible, una sombra negra y densa comenzaba a devorar lentamente al brillante y omnipresente sol dorado; la temperatura caía bruscamente y soplaba un viento helado.
[4] Las aves dejaban de cantar, los animales entraban en pánico extremo, y una noche espeluznante, teñida de luces plateadas fantasmales, envolvía al mundo.
[5] Hoy, gracias a las matemáticas orbitales de la astrofísica moderna, comprendemos que esto es simplemente un Eclipse Solar Total, causado por el paso exacto de la luna frente al sol.
[6] Pero para el ciudadano egipcio común, sin telescopios ni sondas espaciales, este fenómeno no era un juego orbital; era literalmente el Apocalipsis, el colapso absoluto del universo.
[7] En su teología, el sol brillante era la encarnación visible e innegable del dios creador supremo, Ra, surcando en su magnífica barca las aguas del espacio.
[8] Si el Sol desaparecía, significaba que las fuerzas caóticas y demoníacas del mal habían triunfado; creían que la gran serpiente cósmica del inframundo, Apofis, lo había devorado.
[9] Apofis, el terror encarnado del vacío, representaba la antimateria mística, el caos destructivo que siempre buscaba aniquilar la luz y la creación estructurada.
[10] Al ver el eclipse, estallaba un pánico masivo pero intensamente organizado. Creían que, si no actuaban, el sol nunca regresaría y el mundo entero perecería congelado en la oscuridad demoníaca.
[11] En todos los inmensos templos de Egipto, desde Karnak hasta Philae, los altos sacerdotes y los astrónomos entraban en un estado de emergencia mística para librar la "guerra espiritual".
[12] Pero aquí radica el giro fascinante: los sacerdotes astrónomos de más alto rango en realidad llevaban siglos documentando los patrones matemáticos empíricos de la sombra lunar (ciclos de Saros).
[13] Empíricamente, podían predecir con notable precisión cuándo ocurriría la siguiente "mordida oscura", pero en lugar de educar al pueblo, usaron la ciencia para afianzar el poder teocrático.
[14] Convencían a la población de que debían unirse en ritos ruidosos; las multitudes golpeaban tambores frenéticamente, gritaban y destruían estatuas de cera con forma de serpiente maldita.
[15] Lanzaban hechizos mágicos, prendían fuego a las efigies e imploraban que la serpiente de la oscuridad soltara al dios de la luz y le devolviera el pulso a la naturaleza.
[16] Como la inquebrantable física celeste dictaba que el eclipse duraría a lo sumo unos pocos y cortos minutos, el sol irremediablemente volvía a surgir majestuoso en el cielo.
[17] Al volver el sol, la multitud estallaba en vítores extáticos. Creían fielmente que la magia de los sacerdotes y el Faraón había logrado herir a Apofis y salvar la existencia misma del planeta.
[18] Esto cimentó el poder de la astronomía en el imperio; el conocimiento de los astros no solo daba el calendario, sino que se percibía como el escudo militar contra el apocalipsis celestial.
[19] Sorprendentemente, como un guiño poético de la ciencia moderna a la mitología antigua, la NASA descubrió en el año 2004 un inmenso y peligroso asteroide cercano a la Tierra.
[20] Reconociendo su destructivo poder cósmico, los astrónomos contemporáneos lo bautizaron con el mismo nombre que el demonio egipcio de la oscuridad: el asteroide (99942) Apophis.\`,

  "egypt_m15": \`[1] Durante milenios consecutivos, los devotos astrónomos y sabios sacerdotes del antiguo Egipto mantuvieron sus cuellos firmemente alzados, estudiando extasiados el titilar de las estrellas oscuras.
[2] Cartografiaron el firmamento utilizando matemática básica, rastrearon el tránsito de los grandes planetas y tallaron con cinceles los complejos engranajes mecánicos del cosmos en inmensos bloques de roca dura.
[3] Hoy en día, miles de años después del entierro del último gran faraón, la humanidad moderna ha logrado cerrar un ciclo poético y asombrosamente tecnológico a escala interplanetaria.
[4] Nosotros ahora somos aquellos que viajan y orbitan flotando allá arriba en el abismo gélido, rodeados del mismo polvo de estrellas infinito que ellos tanto se esforzaron por entender desde la arena.
[5] Y desde el vacío silencioso del espacio orbital profundo, hemos girado nuestros instrumentos y hemos apuntado nuestras cámaras robóticas de vuelta hacia la Tierra, enfocando las áridas dunas del imperio egipcio.
[6] Bienvenidos a la vertiginosa, fascinante y totalmente revolucionaria era tecnológica de la Arqueoastronomía y Arqueología Satelital Espacial, la fusión definitiva entre el espacio y la prehistoria.
[7] Flotas de satélites hiper-avanzados, lanzados y operados por agencias espaciales como la NASA o la ESA, orbitan la Tierra a miles y miles de kilómetros de altura viajando a velocidades supersónicas.
[8] Mientras circundan el planeta, estos "Telescopios que miran hacia abajo" bombardean el desierto del Sahara con sofisticados láseres, escáneres infrarrojos penetrantes y sistemas de radar de apertura sintética ininterrumpidos.
[9] Estos potentes escáneres están buscando algo que es fisiológicamente invisible para el vulnerable ojo humano en la superficie terrestre: sutiles firmas de radiación infrarroja y variaciones minúsculas de temperatura.
[10] Ocurre que debajo de gruesas mantas compuestas por metros y metros de dunas y arena que se mueven constantemente por los vientos, se hallan enterradas gigantescas ciudades perdidas, muros espesos y antiguas pirámides ocultas.
[11] Las estructuras milenarias, hechas de ladrillos densos de adobe seco, lodo cocido y bloques de granito masivo, absorben la radiación solar y la poca humedad de una manera muy diferente a la arena suelta superficial.
[12] Cuando llega la gélida noche en el desierto, la arena suelta pierde su calor térmico rápidamente, pero la piedra densa sepultada retiene su calor radiante interior por muchas más horas continuas.
[13] Desde el helado abismo espacial, las cámaras satelitales térmicas logran fotografiar con perfección óptica estas ligeras y casi fantasmales diferencias de irradiación de calor en espectros de falso color deslumbrantes.
[14] Una vez capturada la inmensa cantidad de datos crudos espaciales, las supercomputadoras de procesamiento cuántico en la Tierra analizan los píxeles térmicos utilizando programas algorítmicos complejos de limpieza e interpolación.
[15] Como por arte de la más avanzada magia espectral cibernética, el software dibuja mapas arqueológicos perfectos e impecables que muestran formas completamente antinaturales bajo la geología desordenada del terreno.
[16] Cuadrados perfectos, grandes avenidas cívicas alineadas geométricamente, y contornos inconfundibles de enormes ciudadelas piramidales enterradas, emergen flotando majestuosamente sobre la pantalla oscura del computador de los científicos.
[17] En apenas las últimas dos décadas, gracias a la doctora Sarah Parcak y otros pioneros, estos "Ojos Espaciales" han desenterrado digitalmente y validado más de 17 pirámides desconocidas y más de 3,000 asentamientos humanos perdidos bajo el Sahara de Egipto.
[18] Esto es simplemente alucinante, demostrando categóricamente que tras siglos de excavación manual exhaustiva con palas, apenas hemos rascado menos del uno por ciento de las inmensas maravillas de la civilización de Kemet.
[19] La arqueología ya no depende del azar de un cepillo o del cansancio del sol ardiente en el desierto, ahora recae en los sensores ultra-sensibles que bailan en la microgravedad de las órbitas altas de la Tierra.
[20] Literálmente y en el más hermoso de los cierres astronómicos posibles, las avanzadas herramientas que orbitan las estrellas nos están susurrando desde el cielo los mayores e indescifrables secretos enterrados de nuestro antiguo y mágico pasado planetario.\`
};


const FINAL_CODE = \`
import fs from 'fs';
import { COURSE_DATA } from './lib/courseData.js';

const HUGE_TEXTS = \${JSON.stringify(HUGE_TEXTS, null, 2)};

const updatedData = COURSE_DATA.map(mod => {
  if (mod.id && mod.id.startsWith('egypt_m') && mod.contentEs && mod.contentEs.sections) {
    if(HUGE_TEXTS[mod.id]) {
      // Split the text into an array of lines/paragraphs, removing empty ones
      let paragraphs = HUGE_TEXTS[mod.id].split('\\n').map(p => p.trim()).filter(p => p.length > 0);
      mod.contentEs.sections[0].text = paragraphs;
    }
  }
  return mod;
});

const fileContent = 'export const COURSE_DATA = ' + JSON.stringify(updatedData, null, 2) + ';\\n';
fs.writeFileSync('lib/courseData.js', fileContent, 'utf8');
console.log('Successfully expanded all 15 modules with 20 massive paragraphs per module.');
\`;

fs.writeFileSync('expandContent4.mjs', FINAL_CODE, 'utf8');
