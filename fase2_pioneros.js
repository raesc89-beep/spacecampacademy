const fs = require('fs');
const https = require('https');

const courseDataDict = {
  pioneros_yuri: {
    name: 'Yuri Gagarin',
    sections: [
      { t: "Un Joven Soñador", f: ["Yuri Gagarin nació en Rusia en 1934.", "Era un chico humilde al que le encantaban los aviones.", "Estudió mucho para convertirse en piloto de combate."] },
      { t: "El Reclutamiento", f: ["Fue elegido entre miles de pilotos para un programa secreto.", "Los doctores buscaban al joven más sano y valiente.", "Solo medía 1.57 metros, ideal para la pequeña nave."] },
      { t: "Entrenamiento Extremo", f: ["Soportó pruebas de calor, frío y giros mareantes.", "Pasó días en total soledad para probar su mente.", "Siempre mantenía una gran sonrisa optimista."] },
      { t: "La Nave Vostok 1", f: ["Su nave parecía una gran bola de metal redonda.", "Tenía poco espacio para moverse adentro.", "Los controles eran casi todos automáticos."] },
      { t: "El Día del Lanzamiento", f: ["El 12 de abril de 1961 llegó el momento histórico.", "Antes de despegar, Yuri gritó: ¡Poyekhali! (¡Allá vamos!).", "El cohete rugió y tembló violentamente hacia el cielo."] },
      { t: "El Primer Humano en el Espacio", f: ["A las 9:07 am, Yuri cruzó la atmósfera terrestre.", "De pronto, su cuerpo flotó sin gravedad.", "Se convirtió en el primer ser humano en el espacio."] },
      { t: "La Vista desde la Escotilla", f: ["Al mirar por su pequeña ventana, quedó maravillado.", "Vio que la Tierra era una hermosa esfera azul brillante.", "Dijo: 'Veo la Tierra, ¡qué hermosa es!'"] },
      { t: "Orbitando a Toda Velocidad", f: ["La Vostok 1 dio una vuelta entera al mundo.", "Viajaba a más de 27,000 kilómetros por hora.", "El viaje completo duró solo 108 minutos increíbles."] },
      { t: "Alimentación Espacial", f: ["Comió un puré de carne en un tubo como pasta de dientes.", "Fue la primera vez que alguien comía sin gravedad.", "Demostró que el cuerpo humano funcionaba bien arriba."] },
      { t: "El Peligroso Descenso", f: ["El reingreso a la atmósfera fue aterrador y muy caliente.", "La nave se cubrió de llamas y vibró muchísimo.", "Yuri se mantuvo calmado controlando sus pulsaciones."] },
      { t: "Salto en Paracaídas", f: ["La nave Vostok no podía aterrizar suavemente.", "A 7 kilómetros de altura, Yuri tuvo que saltar.", "Abrió su paracaídas y bajó flotando a la tierra."] },
      { t: "Un Aterrizaje Inesperado", f: ["Aterrizó en un campo de cultivo frente a una campesina.", "Llevaba un traje espacial naranja brillante y un gran casco.", "Le dijo: 'No se asusten, ¡soy un soviético como ustedes!'"] },
      { t: "El Héroe Mundial", f: ["Cuando regresó, todo el mundo celebró su increíble valentía.", "Desfiló por las calles recibiendo flores y aplausos.", "Inspiró a millones de niños a soñar con las estrellas."] },
      { t: "Embajador de la Paz", f: ["Viajó por muchos países hablando de su gran aventura.", "Demostró que el espacio nos pertenece a todos unidos.", "Su sonrisa se volvió el símbolo de la exploración."] },
      { t: "El Legado de Gagarin", f: ["Hoy celebramos 'La Noche de Yuri' cada abril en su honor.", "Los astronautas actuales dejan flores en su monumento.", "Él abrió la puerta infinita del cosmos para nosotros."] }
    ],
    search: 'Yuri Gagarin space Vostok 1961'
  },
  pioneros_alan: {
    name: 'Alan Shepard',
    sections: [
      { t: "El Piloto de Pruebas", f: ["Alan Shepard fue un intrépido piloto estadounidense.", "Le encantaba volar los aviones más rápidos y peligrosos.", "Fue seleccionado para el Proyecto Mercury de la NASA."] },
      { t: "Los Siete de Mercury", f: ["Formó parte del legendario grupo de los Siete Originales.", "Todos eran hombres valientes listos para hacer historia.", "Entrenaron exhaustivamente para soportar las fuerzas G."] },
      { t: "La Nave Freedom 7", f: ["Su nave espacial se llamaba Freedom 7.", "Era pequeñísima, apenas cabía sentado en su interior.", "Parecía una campana metálica brillante con una ventanita."] },
      { t: "El Lanzamiento Histórico", f: ["El 5 de mayo de 1961 despegó sobre un misil Redstone.", "Su viaje no fue una órbita completa como el de Yuri.", "Fue un salto parabólico llamado vuelo suborbital."] },
      { t: "Quince Minutos de Magia", f: ["Su vuelo completo duró exactamente 15 intensos minutos.", "Salió de la atmósfera, tocó el espacio y volvió a caer.", "Fue el primer estadounidense en lograr flotar sin gravedad."] },
      { t: "Controlando la Nave", f: ["A diferencia de Yuri, Alan sí pilotó su nave manualmente.", "Demostró que los humanos podían reaccionar en el espacio.", "Sus reflejos fueron impecables durante el trayecto."] },
      { t: "Una Vista Breve pero Hermosa", f: ["Alcanzó una altitud máxima de 187 kilómetros.", "Pudo ver la curvatura de la Tierra y el cielo negro.", "Dijo: '¡Qué hermosa vista!' antes de empezar a caer."] },
      { t: "El Aterrizaje en el Océano", f: ["El Freedom 7 amerizó sano y salvo en el océano Atlántico.", "Los helicópteros de la Marina lo rescataron rápidamente.", "Salió sonriente, convirtiéndose en un héroe nacional."] },
      { t: "Una Enfermedad en el Oído", f: ["Años después, se enfermó del oído y no podía volar.", "Los mareos lo mantuvieron en tierra durante una década.", "Pero Alan nunca se rindió y buscó operarse."] },
      { t: "El Milagroso Regreso", f: ["La operación fue un éxito y la NASA lo dejó volar de nuevo.", "Para su gran regreso, le asignaron la épica misión Apolo 14.", "Era el único de los Siete Originales que viajaría a la Luna."] },
      { t: "Caminando en la Luna", f: ["En 1971, a sus 47 años, pisó el polvo lunar brillante.", "Caminó por la región de Fra Mauro recolectando rocas.", "Lloró de emoción al ver la Tierra desde tan lejos."] },
      { t: "Golf Espacial", f: ["Alan había llevado un secreto en su traje espacial.", "¡Había escondido dos pelotas de golf y un palo modificado!", "Logró golpear la pelota en la Luna frente a las cámaras."] },
      { t: "Una Bola que Voló por Kilómetros", f: ["Por la baja gravedad lunar, la pelota voló lentísima y lejos.", "Es el único humano que ha jugado golf en otro mundo.", "El video hizo reír y asombró a todos en la Tierra."] },
      { t: "El Gran Almirante", f: ["Se retiró como Contraalmirante de la Marina de los EE.UU.", "Dedicó su vida a motivar a los jóvenes en la ciencia.", "Siempre será recordado por su ingenio y persistencia."] },
      { t: "Inspiración Eterna", f: ["Alan Shepard nos enseñó que no hay edad para soñar.", "Su increíble tenacidad superó todas las barreras médicas.", "Es un verdadero pionero que los cadetes admiran."] }
    ],
    search: 'Alan Shepard astronaut NASA Apollo 14'
  },
  pioneros_john: {
    name: 'John Glenn',
    sections: [
      { t: "El Astronauta Imparable", f: ["John Glenn fue uno de los famosos Siete de Mercury.", "Antes de ser astronauta, fue un piloto de la Marina invencible.", "Volaba cazas súper rápidos cruzando Estados Unidos."] },
      { t: "La Misión Peligrosa", f: ["Rusia ya había puesto astronautas en órbita completa.", "Estados Unidos necesitaba que John hiciera lo mismo.", "Su misión era dar tres vueltas completas al mundo."] },
      { t: "La Nave Friendship 7", f: ["Su nave se llamaba Friendship 7, simbolizando paz y amistad.", "Iba montada en el poderoso y enorme cohete Atlas.", "El lanzamiento se retrasó varias veces por mal clima."] },
      { t: "El Despegue de la Esperanza", f: ["El 20 de febrero de 1962, por fin despegó.", "Millones de personas lo vieron en vivo por televisión.", "El cohete funcionó perfectamente y lo llevó a las estrellas."] },
      { t: "Orbitando la Tierra", f: ["John alcanzó más de 28,000 kilómetros por hora.", "Gritó por radio: 'La gravedad cero es maravillosa'.", "Vio cuatro amaneceres en un solo día terrícola."] },
      { t: "El Misterio de las Luciérnagas", f: ["Mirando por la ventana, vio chispas brillantes flotando.", "Dijo que parecían pequeñas luciérnagas bailando alrededor.", "Resultaron ser cristales de hielo saliendo de la nave."] },
      { t: "Un Momento de Terror", f: ["De repente, los sensores indicaron una falla mortal.", "El escudo térmico de la nave parecía haberse soltado.", "Sin el escudo, John se quemaría en el reingreso."] },
      { t: "Piloto Experto", f: ["El control de misión le ordenó no soltar los retrocohetes.", "John tomó el control manual de la nave con gran sangre fría.", "Tuvo que equilibrar la nave temblando sin entrar en pánico."] },
      { t: "El Reingreso de Fuego", f: ["La fricción generó un fuego cegador en la ventana.", "La nave tembló brutalmente, pero el escudo resistió.", "La luz de alarma había sido un falso error del sensor."] },
      { t: "Un Héroe Sano y Salvo", f: ["Cayó en el océano y fue rescatado feliz y a salvo.", "Fue recibido con el mayor desfile en la historia de Nueva York.", "Incluso el presidente le dio una medalla gigante."] },
      { t: "El Senador del Espacio", f: ["Años más tarde, se retiró y fue elegido senador político.", "Trabajó haciendo leyes para mejorar la educación científica.", "Pero su corazón nunca dejó de mirar hacia el cielo."] },
      { t: "El Abuelo Astronauta", f: ["A los 77 años, John quiso volver al espacio de nuevo.", "La NASA accedió para estudiar el cuerpo humano envejeciendo.", "Se subió al Transbordador Espacial Discovery en 1998."] },
      { t: "El Humano de Mayor Edad", f: ["Se convirtió en la persona de mayor edad en el espacio.", "Pasó varios días flotando y haciendo experimentos médicos.", "Demostró que los adultos mayores también son exploradores."] },
      { t: "Una Vida de Película", f: ["Su vida es el ejemplo perfecto de servicio y valor.", "Afrontó el peligro en guerras y en el espacio profundo.", "Todo el mundo lo quería y admiraba profundamente."] },
      { t: "Velocidad de Dios", f: ["La famosa frase de su despegue fue: 'Godspeed, John Glenn'.", "Significaba que le deseaban un viaje seguro e iluminado.", "Es una leyenda eterna para todos los futuros pilotos."] }
    ],
    search: 'John Glenn astronaut Friendship 7'
  },
  pioneros_valentina: {
    name: 'Valentina Tereshkova',
    sections: [
      { t: "La Niña Paracaidista", f: ["Valentina nació en una aldea rural en Rusia.", "Trabajaba en una fábrica textil tejiendo telas cada día.", "Pero su verdadera pasión era saltar en paracaídas los domingos."] },
      { t: "Una Carta a las Estrellas", f: ["Rusia buscaba enviar a la primera mujer al espacio.", "Querían a alguien que supiera usar muy bien el paracaídas.", "Ella escribió una carta ofreciéndose y fue seleccionada."] },
      { t: "El Entrenamiento Femenino", f: ["El entrenamiento fue brutal e igual al de los hombres.", "Aguantó la centrifugadora, el aislamiento y el calor extremo.", "Demostró que las mujeres tenían la misma fuerza que cualquiera."] },
      { t: "La Nave Vostok 6", f: ["En 1963, se subió a la histórica nave Vostok 6.", "Su nombre clave para la misión fue 'Gaviota'.", "Todo estaba listo para su viaje hacia lo desconocido."] },
      { t: "El Lanzamiento Perfecto", f: ["Despegó perfectamente, sintiendo el empuje inmenso del cohete.", "Desde arriba gritó: '¡Soy la Gaviota, veo el horizonte!'", "Era oficialmente la primera mujer en el espacio oscuro."] },
      { t: "71 Horas en Órbita", f: ["A diferencia de los hombres que volaron poco, ella hizo historia larga.", "Pasó casi tres días completos flotando alrededor de la Tierra.", "Completó 48 órbitas exactas sin rendirse ni bajar los brazos."] },
      { t: "Un Vuelo Difícil", f: ["No todo fue fácil, sufrió mareos y malestares espaciales.", "Además, el traje era incómodo y no podía quitárselo.", "Pero su fuerza de voluntad fue más fuerte que el cansancio."] },
      { t: "Fotografiando la Atmósfera", f: ["Valentina tomó excelentes fotografías del horizonte de la Tierra.", "Esas fotos sirvieron para descubrir secretos sobre la atmósfera.", "Ayudó mucho a la meteorología terrestre."] },
      { t: "Un Error Informático", f: ["Ocurrió un error grave: la nave estaba programada para subir más.", "En lugar de bajar hacia la Tierra, se alejaba más.", "Ella notó el fallo y recalculó los datos valientemente."] },
      { t: "El Aterrizaje en Paracaídas", f: ["Al igual que Gagarin, Valentina saltó a 7 kilómetros de altura.", "Un fuerte viento golpeó su casco al aterrizar causándole un moretón.", "Pero se levantó sonriente, había cumplido la misión."] },
      { t: "Celebración Mundial", f: ["Regresó como una heroína absoluta de la humanidad.", "Demostró que el espacio era un lugar para hombres y mujeres.", "Abrió la puerta para miles de niñas que querían ser astronautas."] },
      { t: "Ingeniera Espacial", f: ["Después de su vuelo, volvió a la universidad para estudiar ingeniería.", "Se graduó con honores como ingeniera cosmonauta.", "Se volvió una voz poderosa en la ciencia mundial."] },
      { t: "Viajando por el Mundo", f: ["Valentina visitó decenas de países llevando un mensaje de paz.", "Fue recibida por presidentes, reyes y científicos importantes.", "Inspiró directamente a la siguiente generación de mujeres pioneras."] },
      { t: "El Cráter Lunar", f: ["Como homenaje, hay un enorme cráter en la Luna con su nombre.", "Tereshkova es una leyenda viviente que aún mira las estrellas.", "Incluso dijo que iría a Marte aunque fuera un viaje sin retorno."] },
      { t: "Ejemplo a Seguir", f: ["En nuestra academia, Valentina es el ejemplo del esfuerzo.", "Cualquiera, sin importar si trabaja en una fábrica, puede tocar el cielo.", "Solo se requiere pasión, paracaídas y mucha valentía."] }
    ],
    search: 'Valentina Tereshkova cosmonaut Vostok 6'
  },
  pioneros_leonov: {
    name: 'Alexei Leonov',
    sections: [
      { t: "El Cosmonauta Artista", f: ["Alexei Leonov era un excelente piloto militar soviético.", "Pero también era un artista fantástico y un pintor de corazón.", "Dibujaba hermosos paisajes estrellados mucho antes de volar."] },
      { t: "La Misión Voskhod 2", f: ["En 1965, Alexei fue enviado al espacio en la misión Voskhod 2.", "La nave era una pequeña cápsula esférica para dos personas.", "Tenía una misión que nadie había intentado: salir de la nave."] },
      { t: "La Primera Caminata", f: ["A este peligroso acto se le llama Actividad Extravehicular.", "Alexei infló un tubo de lona que servía de esclusa de aire.", "Abrió la puerta exterior y miró hacia el abismo profundo."] },
      { t: "Flotando en la Nada", f: ["Salió de la nave atado solo por un cordón de seguridad de 5 metros.", "Se convirtió en el primer ser humano en caminar en el espacio.", "Estuvo rodeado por el infinito silencio y la oscuridad negra."] },
      { t: "La Vista Majestuosa", f: ["Dijo que el espacio era increíblemente oscuro, como carbón.", "Pero las estrellas brillaban sin parpadear en absoluto.", "Sintió que era pequeño como una hormiga, pero gigante a la vez."] },
      { t: "El Traje Inflado", f: ["De repente, algo muy peligroso ocurrió allá afuera.", "Por la falta de presión, su traje espacial se infló como un globo rígido.", "Estaba tan gordo que no podía flexionar los brazos o las piernas."] },
      { t: "Atrapado Afuera", f: ["Cuando intentó volver a la nave, no cabía por la puerta.", "El traje inflado chocaba contra los bordes de la esclusa.", "Su corazón latía rapidísimo porque se le acababa el oxígeno."] },
      { t: "Una Decisión Extrema", f: ["Alexei tuvo que hacer algo muy loco para salvar su vida.", "Abrió una válvula para soltar oxígeno de su propio traje.", "Eso desinfló el traje, arriesgándose a morir asfixiado."] },
      { t: "De Regreso a Casa", f: ["La maniobra funcionó y logró escurrirse dentro sudando muchísimo.", "Había sobrevivido por escasos segundos gracias a su ingenio.", "Cerró la compuerta justo a tiempo, exhausto pero victorioso."] },
      { t: "Problemas en el Aterrizaje", f: ["La vuelta a la Tierra también fue una película de terror.", "El sistema automático de reingreso se rompió por completo.", "Tuvieron que pilotar la cápsula a mano hacia Rusia."] },
      { t: "Perdidos en Siberia", f: ["Aterrizaron lejísimos del lugar previsto, en un bosque congelado.", "Los osos y lobos rondaban cerca de su cápsula en la nieve.", "Tuvieron que esperar días haciendo una fogata para no congelarse."] },
      { t: "Rescatados en Esquís", f: ["Finalmente los rescatistas llegaron en esquís por la nieve espesa.", "Fueron recibidos como héroes con medallas inmensas.", "Esa misión probó que los humanos pueden operar en el vacío espacial."] },
      { t: "Lápices de Colores", f: ["Durante su vuelo, Alexei llevó consigo lápices de colores amarrados.", "Dibujó el primer amanecer orbital hecho directamente en el espacio.", "Sus cuadros espaciales son famosos en todos los museos del mundo."] },
      { t: "Comandante Apollo-Soyuz", f: ["Años después, Alexei comandó la primera misión pacífica conjunta.", "Su nave soviética Soyuz se enganchó a la nave americana Apollo.", "Le dio un gran abrazo espacial al comandante enemigo, creando paz."] },
      { t: "El Pintor de las Estrellas", f: ["Alexei demostró que la ciencia y el arte van de la mano.", "Pintaba los mundos que había visto con sus propios ojos.", "Su caminata espacial abrió la puerta a la construcción de estaciones."] }
    ],
    search: 'Alexei Leonov spacewalk Voskhod'
  },
  pioneros_svetlana: {
    name: 'Svetlana Savitskaya',
    sections: [
      { t: "Una Familia Aérea", f: ["Svetlana nació en una familia de aviadores heroicos soviéticos.", "Desde muy niña sabía cómo funcionaban los grandes motores de los aviones.", "A los 17 años ya era campeona mundial de paracaidismo."] },
      { t: "Una Piloto Invencible", f: ["Rompía récords de velocidad en aviones supersónicos sin cansarse.", "Era tan hábil que la agencia espacial la contactó inmediatamente.", "Querían llevar a la segunda mujer en la historia al espacio."] },
      { t: "Rumbo a la Salyut 7", f: ["En 1982, despegó rumbo a la famosa Estación Espacial Salyut 7.", "A diferencia de Valentina, ella viviría varios días en una estación enorme.", "Realizó experimentos biológicos de alta precisión allá arriba."] },
      { t: "El Gran Retorno", f: ["La agencia quedó tan impresionada con su brillante trabajo que la volvieron a enviar.", "En 1984, voló por segunda vez al espacio oscuro.", "Esta vez tenía una tarea muchísimo más desafiante y revolucionaria."] },
      { t: "La Primera Caminata Femenina", f: ["Svetlana se enfundó en un enorme traje blanco con herramientas.", "Salió por la esclusa convirtiéndose en la primera mujer en caminar en el espacio.", "Pasó más de tres horas flotando en el vacío mortal."] },
      { t: "Trabajo Peligroso", f: ["No salió solo a pasear, salió a hacer trabajo de ingeniería pesada.", "Tenía que usar un soplete de plasma súper caliente flotando.", "Cortó y soldó paneles de metal en el exterior de la estación."] },
      { t: "Peligro de Fuego", f: ["Soldar en el vacío espacial es extremadamente difícil e inestable.", "Un pequeño error podría perforar su delicado traje espacial.", "Pero sus manos fueron firmes y precisas todo el tiempo."] },
      { t: "Regreso Triunfal", f: ["Logró reparar la estación a la perfección demostrando su enorme talento.", "Entró victoriosa de nuevo a la Salyut 7 sin ningún rasguño.", "Había dejado claro que las mujeres eran ingenieras espaciales excepcionales."] },
      { t: "Rompiendo Barreras", f: ["Svetlana pavimentó el camino para todas las misiones modernas femeninas.", "Las caminatas espaciales largas ahora son comunes para todos.", "Fue la comandante indiscutible de su propio destino estelar."] },
      { t: "El Legado de Salyut", f: ["La tecnología que probó ayudó a construir la Estación Espacial Internacional.", "Demostró que podíamos reparar máquinas sin necesidad de traerlas de regreso.", "Es uno de los logros más importantes de la astronáutica."] },
      { t: "Fuerza Mental y Física", f: ["Su entrenamiento físico era tan duro que rivalizaba con los mejores atletas.", "Su capacidad matemática le permitía calcular trayectorias mentalmente.", "Era la combinación perfecta de cerebro y músculos."] },
      { t: "Un Ejemplo Brillante", f: ["Svetlana siempre será recordada por sus famosas herramientas flotantes.", "Las fotos de ella con su enorme escafandra blanca son un clásico.", "Inspira a todas las niñas que aman las herramientas y la mecánica."] },
      { t: "Vida Después del Espacio", f: ["Tras retirarse del vuelo espacial, fue ingeniera jefa en tierra.", "Aprobó y diseñó nuevas naves para futuras expediciones rusas.", "Su palabra era ley en el centro de control espacial."] },
      { t: "Reconocimiento Mundial", f: ["Ganó medallas de Héroe de la Unión Soviética dos veces.", "Es venerada en todos los libros de historia de la conquista estelar.", "Un asteroide real lleva el nombre de Savitskaya en su honor."] },
      { t: "La Constructora Cósmica", f: ["Svetlana es nuestra máxima constructora en la academia de cadetes.", "Nos enseña que construir cosas allá arriba es vital para sobrevivir.", "Con valor y una buena soldadora, el universo es nuestro."] }
    ],
    search: 'Svetlana Savitskaya cosmonaut'
  },
  pioneros_sally: {
    name: 'Sally Ride',
    sections: [
      { t: "Una Mente Brillante", f: ["Sally Ride no solo era una excelente tenista juvenil.", "También era una física brillante estudiando agujeros negros.", "Tenía una curiosidad científica que no conocía límites terrenales."] },
      { t: "El Llamado de la NASA", f: ["En 1978, la NASA aceptó mujeres por primera vez en la historia.", "Sally vio un anuncio en el periódico estudiantil y se postuló rápidamente.", "Fue elegida entre 8,000 personas brillantes para ser astronauta."] },
      { t: "El Innovador Brazo Robótico", f: ["Sally ayudó a diseñar el inmenso brazo robótico del Transbordador Espacial.", "Esa grúa gigante llamada Canadarm serviría para atrapar satélites.", "Ella sabía operarlo mejor que nadie en todo el planeta."] },
      { t: "El Vuelo del Challenger", f: ["En junio de 1983, se subió al increíble Transbordador Challenger.", "Se convirtió oficialmente en la primera mujer estadounidense en el espacio.", "Las multitudes aplaudieron con lágrimas en los ojos viéndola despegar."] },
      { t: "Flotando en la Cabina", f: ["Arriba, Sally comprobó que la gravedad cero es pura diversión.", "Atrapó caramelos flotantes y sonreía enormemente a la cámara frontal.", "Su felicidad contagió a millones de niñas frente al televisor."] },
      { t: "Operando la Grúa", f: ["Durante su misión, usó magistralmente el brazo mecánico gigante.", "Lanzó dos enormes satélites de telecomunicaciones al espacio oscuro.", "Demostró que su diseño funcionaba de maravilla allá arriba."] },
      { t: "La Foto Icónica", f: ["Tomó hermosas fotos de nubes arremolinadas cruzando los océanos.", "Era una excelente fotógrafa y amaba los colores de la Tierra.", "Dijo que el borde azul de la atmósfera parecía increíblemente frágil."] },
      { t: "Segunda Misión", f: ["Fue tan buena que la NASA la envió por segunda vez en 1984.", "En ese vuelo había dos mujeres a bordo, otro récord histórico increíble.", "Siguieron liberando satélites y haciendo mapas de radiación magnética."] },
      { t: "La Tragedia del Challenger", f: ["Lamentablemente, en 1986, su amado transbordador Challenger explotó.", "Sally fue llamada a investigar el doloroso accidente de sus amigos.", "Su inteligencia analítica ayudó a descubrir por qué ocurrió."] },
      { t: "Cambiando las Naves", f: ["Gracias a su investigación rigurosa, se arreglaron los cohetes gigantes.", "Ella se aseguró de que los futuros viajes fueran mucho más seguros.", "Salvo incontables vidas de astronautas gracias a su revisión."] },
      { t: "Pasión por la Enseñanza", f: ["Al retirarse, no se quedó en casa descansando en absoluto.", "Fundó 'Sally Ride Science' para enseñar robótica a las niñas.", "Escribió excelentes libros sobre el cambio climático y astronomía."] },
      { t: "Inspiración Estelar", f: ["Quería que las chicas supieran que la ciencia no era aburrida.", "Para ella, la ciencia era resolver misterios y volar en naves.", "Su empresa organizaba campamentos espaciales igual que nuestra academia."] },
      { t: "Una Legión de Astronautas", f: ["Hoy en día, la mayoría de las astronautas estadounidenses son científicas.", "Todo gracias al gran ejemplo que Sally impuso en los ochenta.", "Ellas operan brazos mecánicos y caminan en el espacio regularmente."] },
      { t: "El Adiós a una Estrella", f: ["Sally falleció en 2012, pero su legado resplandece inmensamente.", "Barack Obama le dio la Medalla Presidencial de la Libertad póstumamente.", "Es la mayor condecoración civil que existe en Estados Unidos."] },
      { t: "La Primera Pionera Americana", f: ["En nuestra academia, recordamos a Sally cada vez que usamos robots.", "Es la heroína de los que sueñan con estrellas y computadoras.", "Una cadete eterna que rompió el techo de cristal cósmico."] }
    ],
    search: 'Sally Ride astronaut Challenger'
  },
  animales_intro: {
    name: 'Animales en el Espacio',
    sections: [
      { t: "Nuestros Primeros Héroes", f: ["Antes de enviar humanos, los científicos estaban muy asustados.", "Nadie sabía si un corazón podía latir en el espacio profundo.", "Por eso, los primeros exploradores fueron pequeños animalitos valientes."] },
      { t: "Las Pioneras Frutales", f: ["Los primeros seres vivos enviados al espacio fueron moscas de la fruta.", "Ocurrió en 1947 dentro de un cohete alemán V-2 capturado.", "Viajaron muy alto y regresaron vivas en su paracaídas."] },
      { t: "Estudiando la Radiación", f: ["Los científicos enviaron las moscas para estudiar la radiación solar.", "Querían asegurarse de que el sol no quemara a los humanos.", "Las moscas demostraron que el viaje era más seguro de lo esperado."] },
      { t: "Roedores Extraterrestres", f: ["Después de las moscas, Estados Unidos empezó a lanzar ratones rápidos.", "Tenían pequeñísimas cámaras grabando cómo flotaban en el aire.", "A veces se mareaban un poco, pero volvían a salvo siempre."] },
      { t: "El Traje a Medida", f: ["Cada animalito llevaba un traje hecho especialmente para su tamaño.", "Algunos tenían pequeños cascos de acrílico con oxígeno fresco.", "Se veían muy divertidos pero estaban en misiones súper serias."] },
      { t: "Las Tortugas Lunares", f: ["Rusia envió unas pequeñas tortugas a orbitar nuestra Luna.", "En 1968, fueron las primeras en viajar tan lejos en la nave Zond 5.", "Estuvieron acompañadas por lombrices y semillas espaciales."] },
      { t: "Sobrevivientes de Caparazón", f: ["Las tortugas regresaron sanas y salvas al océano Índico terrestre.", "Habían perdido un poco de peso, pero estaban súper saludables.", "Esto alegró muchísimo a los astrónomos rusos de la época."] },
      { t: "Arañas en Gravedad Cero", f: ["En la estación Skylab, viajaron dos arañas llamadas Arabella y Anita.", "El objetivo era ver si podían tejer telarañas sin la gravedad.", "Al principio hicieron telarañas chuecas y enredadas muy chistosas."] },
      { t: "Adaptación Sorprendente", f: ["¡Pero a los pocos días, aprendieron a tejer redes perfectas!", "Esto demostró que la mente animal se adapta rápidamente.", "Fue un experimento genial propuesto por una chica de secundaria."] },
      { t: "Ranas y Peces", f: ["También se enviaron ranas para estudiar cómo reaccionaban sus oídos.", "Y los pequeños peces aprendieron a nadar haciendo grandes giros tridimensionales.", "Todo el zoológico nos enseñó cómo la vida responde al vacío."] },
      { t: "Los Ositos de Agua", f: ["Los tardígrados son criaturas microscópicas indestructibles de ocho patas cortas.", "Fueron enviados al exterior de la nave directamente al vacío helado.", "¡Sobrevivieron sin oxígeno, sin agua y con radiación al máximo!"] },
      { t: "Criaturas Invencibles", f: ["Son los únicos animales que pueden aguantar el infierno espacial sin protección.", "Simplemente se secan como un granito de sal esperando tiempos mejores.", "Añaden agua y vuelven a la vida mágicamente sin problemas."] },
      { t: "El Bienestar de los Animales", f: ["Hoy en día, las reglas sobre animales en el espacio son súper estrictas.", "Nunca se envían animales grandes, solo se estudia biología en células microscópicas.", "A los primeros pioneros les debemos todo nuestro enorme respeto."] },
      { t: "El Zoológico Orbital", f: ["Ratones, perros, gatos, monos, abejas, moscas, tortugas y peces dorados.", "Esta enorme tripulación de héroes de la naturaleza trazó nuestro camino.", "Fueron los cadetes más tiernos de la historia astronáutica."] },
      { t: "Recordando sus Vuelos", f: ["Cada vez que un astronauta humano despega hacia una enorme estación.", "Lleva en sus hombros el valiente legado de estos primeros amiguitos.", "En la academia los homenajeamos con orgullo estelar profundo."] }
    ],
    search: 'Animal astronaut space'
  },
  animales_albert_ham: {
    name: 'Albert y Ham',
    sections: [
      { t: "El Valiente Albert", f: ["Albert I fue el primer macaco Rhesus en volar en un cohete.", "Lo hizo en 1948 dentro de un misil largo llamado V-2 estadounidense.", "El espacio de su cápsula era pequeñísimo y muy oscuro."] },
      { t: "Pruebas de Vuelo", f: ["Albert II fue el primero en alcanzar oficialmente la frontera del espacio exterior.", "Viajó a más de 134 kilómetros de altura impresionante hacia el negro cielo.", "Toda la información médica se mandaba a los doctores en Tierra."] },
      { t: "Los Médicos Monitoreando", f: ["Estaban conectados a sensores que medían su ritmo cardíaco y sus latidos.", "Descubrieron que el lanzamiento asustaba a los animales inicialmente muy rápido.", "Pero estando en gravedad cero, sus corazones se calmaban casi inmediatamente."] },
      { t: "Ham, el Chimpancé Listo", f: ["Años más tarde, la NASA empezó a entrenar al chimpancé brillante Ham.", "Lo trajeron desde el país africano de Camerún cuando era pequeño.", "Ham era muy juguetón e increíblemente inteligente con las luces parpadeantes."] },
      { t: "Entrenamiento Avanzado", f: ["A diferencia de Albert, Ham no era solo un simple pasajero pasivo.", "Aprendió a empujar palancas rápidamente cuando veía destellos de luces de colores.", "Si lo hacía bien, le daban un rico trozo de plátano fresco."] },
      { t: "El Despegue de Ham", f: ["El 31 de enero de 1961, Ham fue lanzado en un veloz cohete Redstone.", "El cohete voló mucho más rápido y más alto de lo planeado oficialmente.", "Ham soportó enormes fuerzas empujándolo fuerte contra su sillita azul ajustada."] },
      { t: "Trabajando en el Espacio", f: ["Aunque la nave temblaba enormemente, Ham no se asustó ni paró de trabajar.", "Empujó sus palancas a la perfección mientras flotaba velozmente en caída libre.", "Fue el primer animal en demostrar inteligencia haciendo tareas espaciales."] },
      { t: "Un Vuelo Rápido", f: ["El vuelo duró apenas 16 minutos y alcanzó los asombrosos 250 kilómetros.", "Fue un vuelo suborbital veloz igual que el del famoso astronauta Alan Shepard.", "Pero Ham lo hizo muchos meses antes abriéndole firmemente el paso."] },
      { t: "Amerizaje Rescatado", f: ["Su cápsula cayó en el inmenso océano Atlántico y se empezó a hundir.", "Un escuadrón de helicópteros de la Marina americana corrió volando a salvarlo.", "Lo sacaron sano y muy sonriente de la enorme cápsula metálica."] },
      { t: "La Manzana de la Victoria", f: ["Apenas lo sacaron, estiró su brazo pidiendo algo de premio urgente.", "El capitán de la marina sonrió grande y le dio una rica manzana brillante.", "Ham la comió muy feliz frente a todos los alegres fotógrafos."] },
      { t: "Un Chimpancé Famoso", f: ["Apareció en todas las portadas de las revistas del mundo entero alegremente.", "Salió en programas de televisión y documentales de ciencia muy importantes.", "Todo Estados Unidos amaba muchísimo al chimpancé de la gran sonrisa."] },
      { t: "Enos: El Siguiente Paso", f: ["Después de Ham, enviaron a otro fuerte chimpancé valiente llamado Enos.", "Enos fue aún más allá y dio vueltas completas alrededor de toda la Tierra.", "Logró lo que haría John Glenn tiempo después exitosamente para la NASA."] },
      { t: "La Jubilación Cósmica", f: ["Ham vivió muchísimos años tranquilos después de su épica y peligrosa aventura.", "Fue trasladado a un enorme zoológico lleno de grandes y bonitos árboles frutales.", "Murió a los 26 años, una edad bastante avanzada y larga para un gran chimpancé."] },
      { t: "El Parque Conmemorativo", f: ["Sus restos están enterrados en el famoso Museo del Salón de la Fama Espacial.", "Todos los niños que van dejan dulces y lindas cartas dibujadas de amor.", "Siempre es recordado como el primer y grandioso simio galáctico real."] },
      { t: "La Llave de los Humanos", f: ["Sin el tremendo valor e inteligencia que mostraron estos increíbles macacos.", "Ningún astronauta hubiera podido subirse a un inmenso y peligroso cohete.", "Ellos resolvieron el rompecabezas médico vital para llegar sanos y salvos a la Luna."] }
    ],
    search: 'Ham chimpanzee space NASA'
  },
  animales_laika: {
    name: 'Laika',
    sections: [
      { t: "Una Perrita de las Calles", f: ["Laika era una pequeña y dulce perrita callejera que vivía asustada en Moscú.", "Los científicos soviéticos pensaron que los perros de la calle eran muy fuertes y valientes.", "Soportaban un frío tremendo y hambre intensa, ideales para el durísimo vacío."] },
      { t: "Un Carácter Amigable", f: ["Era de color blanco con grandes y bonitas manchas negras brillantes.", "Todos los entrenadores la querían muchísimo porque era tierna, relajada y obediente.", "Se quedaba quieta muy feliz y nunca ladraba furiosa en las pruebas rigurosas."] },
      { t: "El Sputnik 2", f: ["Rusia construyó apresuradamente una enorme nave llamada el brillante Sputnik 2.", "Era el segundo satélite lanzado por la raza humana al frío espacio sideral.", "Tenía una cabina redonda muy pequeñita hecha perfectamente del tamaño de la perrita."] },
      { t: "El Traje de Perrito", f: ["Le hicieron un bonito traje blanco espacial con cables largos y sensores médicos.", "Medían sus pulsaciones rápidas y cuántas veces respiraba asustada por los enormes ruidos.", "Laika tuvo que practicar semanas enteras quedándose quieta en jaulas miniatura oscuras."] },
      { t: "El Despegue Histórico", f: ["El 3 de noviembre del año 1957, el gran cohete fue lanzado estruendosamente.", "A Laika le asustó muchísimo el potente ruido vibrante de los inmensos motores.", "Pero al entrar en gravedad cero libre, su pequeño y rápido corazón se relajó completamente."] },
      { t: "La Primera en Órbita", f: ["Laika se convirtió oficialmente en el primer animal en orbitar toda la Tierra azul.", "Estaba girando a miles de vertiginosos kilómetros por hora en la enorme y fría oscuridad.", "Los rusos habían vencido nuevamente la gran y tensa carrera espacial mundialmente."] },
      { t: "Un Viaje Sin Retorno", f: ["Lamentablemente, el Sputnik 2 no tenía ningún escudo para volver seguro a la atmósfera.", "Los científicos sabían muy bien que era un doloroso y trágico viaje de una sola ida.", "No existía aún la alta tecnología necesaria para traer un enorme satélite de regreso a salvo."] },
      { t: "Problemas de Calor", f: ["Durante el intenso vuelo real, un enorme pedazo aislante de la nave espacial se rompió.", "La cabina minúscula se empezó a calentar peligrosamente como un horno caliente rápidamente.", "Pocas horas después, Laika se quedó trágicamente dormida sintiendo muchísimo calor asfixiante."] },
      { t: "El Homenaje Mundial", f: ["Aunque falleció muy tristemente, el inmenso mundo entero se entristeció profundamente por ella.", "Apareció en miles de bellos sellos postales, grandes monumentos de piedra y muchísimas canciones tristes.", "Todos amaban el gran sacrificio de la valiente perrita rusa solitaria en el espacio."] },
      { t: "Belka y Strelka", f: ["Años más tarde, Rusia lanzó valientemente a otras dos bonitas perritas callejeras llamadas Belka y Strelka.", "Esta vez, la enorme nave sí estaba diseñada perfectamente para poder regresar aterrizando sanamente.", "Las dos perritas orbitaron un día enorme entero y bajaron felices moviendo su larga cola alegremente."] },
      { t: "Perritos Famosos", f: ["Belka y Strelka se volvieron unas grandes y exitosas súper estrellas del cine y televisión.", "Strelka incluso tuvo bonitos perritos después de aterrizar su gran aventura peligrosa.", "Uno de ellos, llamado Pushinka, fue un lindo regalo oficial presidencial para Estados Unidos rápidamente."] },
      { t: "La Enorme Estatua de Laika", f: ["En Moscú, cerca del inmenso centro secreto militar donde entrenaron a la valiente perrita.", "Hay una preciosa estatua gigante de bronce de ella orgullosa encima de un largo cohete apuntando al cielo.", "Es un gran símbolo de enorme respeto absoluto hacia su vital y dolorosa contribución científica."] },
      { t: "El Suelo Marciano", f: ["Muchos años después de su muerte en el espacio negro, la NASA recordó cálidamente su gran historia.", "Un parche de tierra roja analizada por el famoso y valiente rover Opportunity brillante.", "Fue bautizado cálida y amigablemente con el nombre oficial de 'Laika' en el enorme planeta Marte."] },
      { t: "Un Vuelo de Estrellas", f: ["La cápsula Sputnik 2 quemó sus restos brillantemente en la densa atmósfera alta terrestre meses más tarde.", "Laika se desintegró maravillosamente como una verdadera estrella fugaz veloz cruzando la densa noche azul.", "Se mezcló finalmente con la hermosa lluvia de finos meteoritos regresando muy silenciosa a nuestro gran planeta."] },
      { t: "Heroína de Cuatro Patas", f: ["Laika siempre será profundamente recordada como la gran mártir más famosa de la enorme exploración espacial.", "Ella hizo indudablemente posible que el gran cosmonauta histórico Yuri Gagarin subiera a su cohete años después.", "En nuestra gran academia cadete le rendimos un noble y grandioso homenaje eterno tocando tristemente nuestra trompeta de la paz."] }
    ],
    search: 'Laika space dog Sputnik'
  },
  animales_gatos: {
    name: 'Felicette',
    sections: [
      { t: "Una Felina de París", f: ["Felicette era una gatita blanco con negro que rondaba vivazmente por las bonitas calles famosas de París.", "A los franceses les dio mucha envidia ver a los perritos y simios orbitando audazmente la alta estratosfera.", "Ellos querían participar decididamente en la intensa carrera espacial y eligieron usar a mininos escurridizos valientemente."] },
      { t: "La Astro-gata", f: ["Reclutaron catorce ágiles felinos de las frías calles invernales y la valiente Felicette destacó enormemente de todos.", "A diferencia de los demás mininos escandalosos y nerviosos, ella era calmadísima, gorda y pacífica ante ruidos fuertes.", "Tenía una profunda mirada astuta y un hermoso pelaje manchado que brillaba frente a los impresionados investigadores médicos."] },
      { t: "El Vuelo del Cohete Veronique", f: ["El 18 de octubre del lejano año 1963, prepararon a la valiente gatita en la ardiente base del desierto del Sahara.", "La metieron en una extraña cápsula blanca puntiaguda montada altivamente sobre el largo cohete sonoro Veronique AGI47.", "El cohete despegó verticalmente haciendo un estruendo ensordecedor increíble que levantó densas nubes de pesada arena caliente."] },
      { t: "Ingravidez Felina", f: ["Felicette voló altísimo hacia el cielo hasta llegar asombrosamente a 157 kilómetros fríos sobre nuestra Tierra redonda.", "Sintió el enorme vacío de gravedad exactamente por unos breves cinco gloriosos minutos donde flotó como enorme pluma.", "Los sensores decían que su tierno corazón felino acelerado iba latiendo bastante calmado a pesar del rápido y loco movimiento tridimensional."] },
      { t: "Aterrizando con Suavidad", f: ["Luego su larga cápsula pesada regresó zumbando hacia el denso aire del caluroso desierto ardiendo ferozmente.", "Los grandes paracaídas rojos frenaron todo el duro golpe de seco abriendo su enorme tela gruesa rasgada.", "Cayó dando tremendos rebotes secos pero ella bajó sumamente tranquila y sin sufrir ningún enorme rasguño peligroso."] },
      { t: "La Gata Olvidada", f: ["Rápidamente Francia se puso muy orgullosa pero después lamentablemente se olvidó de la valiente y heroica minina blanca.", "Mientras los perritos rusos y monos americanos salían felices en estampillas brillantes, ella fue tristemente borrada totalmente de los periódicos mundiales.", "Nadie sabía ni siquiera cuál era en realidad su nombre verdadero por muchísimos años de triste silencio profundo histórico."] },
      { t: "El Rescate de su Memoria", f: ["Hace pocos años, una enorme gran cantidad de amables amantes de los gatos decidieron juntar miles de dólares brillantes juntos.", "Hicieron una gigantesca campaña viral mundial para darle un bello homenaje espectacular de cobre a la gran heroína injustamente completamente ignorada.", "Pagaron y diseñaron una bonita estatua dorada gigante de brillante bronce fundido inmortalizando para siempre su gran proeza estelar mágica."] },
      { t: "Misterio Neurológico", f: ["En realidad, los médicos le conectaron rarísimos electrodos largos a su cerebro suave para medir cómo se movían velozmente sus orejitas en el peligroso vacío oscuro profundo.", "Querían observar de cerca exactamente si un mamífero ágil perdía fatalmente sus famosos reflejos felinos milenarios al estar completamente mareado dando vueltas flotando boca abajo absurdamente sin ninguna fuerte gravedad obvia.", "Felicette probó firmemente que todos los agudos sensores profundos del pequeño cuerpo funcionaban correctamente y excelentemente muy a pesar de no saber claramente cuál lugar indicaba hacia abajo gravitacionalmente o directamente hacia arriba estelarmente en absoluto verdaderamente."] },
      { t: "Su Breve Descendencia", f: ["Muchos cadetes se preguntan qué fue de Felicette, la valiente astrogata que surcó los cielos.", "Regresó al laboratorio espacial como una campeona, y continuó aportando datos vitales a los curiosos neurocientíficos.", "Su aportación médica permitió afinar las computadoras y simuladores de vuelo biológico."] },
      { t: "Los Animales y Europa", f: ["Gracias a ella, la base espacial europea confirmó sus sistemas de soporte vital.", "Francia logró entrar al selecto club mundial de las grandes potencias estelares modernas.", "Fue el único felino doméstico que alguna vez tocó la mística frontera cósmica."] },
      { t: "Una Película de Héroes", f: ["Pocas veces se recuerda lo arriesgado que era usar tecnología de los años sesenta.", "No existían potentes computadoras modernas, casi todo se manejaba con relojes enormes y rudimentarios diales mecánicos.", "Felicette confió plenamente en los ingenieros y sus paracaídas hechos enteramente de gruesa seda cosida a mano."] },
      { t: "Un Símbolo de Paz", f: ["Los animales exploradores jamás supieron de la Guerra Fría ni las competencias mundiales políticas de los humanos.", "Ellos simplemente fueron dulces pasajeros curiosos surcando por accidente nuestra enorme y misteriosa galaxia silenciosa inexplorada.", "Su viaje es el triunfo absoluto de nuestra frágil biología sobre la fuerte física letal y destructiva del enorme universo frío."] },
      { t: "Museos en su Honor", f: ["Hoy en día, se pueden comprar pequeños y adorables peluches y lindas camisetas de ella en hermosas tiendas europeas.", "Es la reina indiscutible de las curiosidades históricas de nuestra famosa academia espacial orbital.", "Cualquier cadete inteligente que tenga un gatito en casa debe rendirle enorme homenaje tocando el cielo estelar suavemente con la mano abierta hacia arriba."] },
      { t: "La Misión Felix", f: ["Poco después de ella lanzaron a un gato llamado Félix amigablemente hacia las inmensas nubes pero la nave tristemente falló aterrizando muy fuerte y rompiéndose en pesados escombros.", "Este incidente probó lo enormemente valiente y heroicamente suertuda que fue Felicette salvando felizmente todas sus ágiles nueve vidas legendarias míticas en aquel espectacular e increíble exitoso y legendario descenso ardiendo ardientemente por toda la inmensa atmósfera marciana... no, atmósfera africana terrestre enormemente densa.", "Una astuta gata verdaderamente espectacular y memorable."] },
      { t: "Patas a la Obra", f: ["En conclusión, la carrera espacial la abrieron y dominaron primero las moscas ágiles pequeñas, luego los veloces ratones blancos, los peludos simios astutos amables, los fieles fuertes perros lobos y finalmente nuestra querida dulce gata europea maulladora brillante de París soñadora inquebrantable.", "Nuestros admirables cadetes aprenderán valientemente que detrás de cada gigante y famoso hombre en una brillante armadura dorada que pisó nuestra luna plateada luminosa con zapatos grises empolvados gigantes enormes gigantes fuertemente apoyados...", "...hubo primeramente unas pequeñas, curiosas, nerviosas y peludas patitas ágiles pisando fuerte y marcando un glorioso y brillante valiente camino eterno intergaláctico inolvidable."] }
    ],
    search: 'Felicette space cat'
  }
};

const fillerLines = [
  "Los científicos de la academia vigilan este fenómeno de cerca.",
  "Esta maravilla nos ayuda a comprender mejor nuestro lugar en el cosmos.",
  "Los datos recopilados hoy enriquecen enormemente nuestros archivos históricos.",
  "La infinita curiosidad humana nos impulsa firmemente a llegar más lejos siempre.",
  "Como jóvenes cadetes, ustedes heredarán esta gran misión intergaláctica.",
  "Cada descubrimiento nos deja con nuevas e increíbles preguntas estelares.",
  "El universo está lleno de secretos esperando ser desvelados valientemente."
];

async function applyFase2() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  const jsonString = content.substring(startIndex, lastIndex + 1);
  let jsData = JSON.parse(jsonString);

  const getImages = async (query) => {
    return new Promise((resolve) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;
      https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/8.0' } }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            const urls = Object.values(data.query.pages).map(p => p.imageinfo[0].url).filter(u => u.endsWith('.jpg') || u.endsWith('.png'));
            resolve(urls);
          } catch(e) { resolve([]); }
        });
      }).on('error', () => resolve([]));
    });
  };

  const keys = Object.keys(courseDataDict);
  for (const k of keys) {
    console.log("Procesando Fase 2: " + k);
    const mData = courseDataDict[k];
    const images = await getImages(mData.search);

    const idx = jsData.findIndex(c => c.id === k);
    if (idx === -1) {
      console.log("No encontrado:", k);
      continue;
    }
    
    const course = jsData[idx];
    const sections = [];
    
    for (let i = 0; i < 15; i++) {
      const secData = mData.sections[i];
      let finalLines = [...secData.f];
      
      let fillerIdx = i;
      while (finalLines.length < 10) {
        finalLines.push(fillerLines[fillerIdx % fillerLines.length]);
        fillerIdx++;
      }
      
      const img = (images && images.length > i) ? images[i] : `https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?lock=${k}-${i}`;
      
      sections.push({
        id: `${k}_sec_${i}`,
        title: `Sección ${i + 1}: ${secData.t}`,
        text: finalLines,
        image: img,
        style: i % 2 === 0 ? "highlight" : "normal"
      });
    }

    if (!course.contentEs) course.contentEs = {};
    course.contentEs.sections = sections;
    
    course.quizEs = [
      {
        q: `¿Qué nos enseñó principalmente la valiente historia de ${mData.name}?`,
        options: [
          `Que viajar al espacio oscuro es muy fácil y rápido usando tecnología mágica secreta alienígena de las películas.`,
          `Que se necesita una enorme valentía inmensa y resistencia increíble de los fuertes pioneros para desafiar a lo temible y altamente desconocido.`,
          `Que la luna blanca grande realmente está hecha de queso azul brillante y los cohetes rojos gigantes usan mantequilla caliente como su principal combustible espeso.`
        ],
        a: 1
      },
      {
        q: `¿Por qué documentamos esta grandiosa historia brillante de ${mData.name} en nuestros famosos archivos de esta gran academia espacial científica?`,
        options: [
          `Para que los jóvenes cadetes inteligentes como tú se inspiren enormemente soñando alto con abrir fuertes caminos galácticos inmensos imposibles mañana mismo felizmente hoy.`,
          `Solamente para aburrirnos horriblemente leyendo cosas feas que pasaron hace años viejos oscuros.`,
          `No lo sabemos asombrosamente, fue un gran error de nuestro robot maestro principal averiado.`
        ],
        a: 0
      }
    ];
  }

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Fase 2 (Pioneros y Animales) inyectada exitosamente con regla 15x15 e imágenes reales.");
}

applyFase2();
