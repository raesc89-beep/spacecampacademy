const fs = require('fs');
const https = require('https');

const sunData = [
  { title: "Nuestra Estrella Gigante", facts: ["El Sol es una estrella amarilla enana enorme.", "Contiene el 99.8% de la masa del Sistema Solar.", "Es una bola de gas caliente.", "Ubicada en el centro.", "Da luz y calor a todos.", "Es la estrella más cercana.", "Se formó hace 4.600 millones de años.", "Sin ella no habría vida.", "Gira sobre su propio eje.", "A simple vista parece un círculo perfecto."] },
  { title: "El Núcleo Abrasador", facts: ["El centro del Sol es como un reactor nuclear gigante.", "Su temperatura alcanza los 15 millones de grados centígrados.", "Allí la presión es gigantesca.", "Convierte hidrógeno en helio constantemente.", "Este proceso se llama fusión nuclear.", "Libera una cantidad enorme de energía luminosa.", "La energía tarda miles de años en salir del núcleo.", "Es el motor secreto que da vida a la estrella.", "Nadie podría sobrevivir ahí.", "Es el lugar más caliente de nuestro vecindario cósmico."] },
  { title: "Viaje a la Fotosfera", facts: ["La fotosfera es la superficie que podemos ver desde la Tierra.", "Tiene unos 5,500 grados de temperatura.", "Desde aquí, la luz viaja hacia nosotros.", "Tarda 8 minutos en llegar a nuestro planeta.", "No es sólida como la Tierra, es gas hirviente.", "Aparecen manchas oscuras en ella.", "Esta capa es muy delgada comparada con el núcleo.", "Produce un brillo intenso cegador.", "Nunca debes mirarla directamente sin protección.", "A veces burbujea como agua hirviendo."] },
  { title: "El Misterio de las Manchas Solares", facts: ["Las manchas solares parecen pecas oscuras en su superficie.", "Son regiones un poco más frías que el resto.", "Pero siguen siendo extremadamente calientes.", "Se forman por tormentas magnéticas inmensas.", "A veces son más grandes que el planeta Tierra entero.", "Aparecen y desaparecen en ciclos de 11 años.", "Fueron observadas por Galileo hace siglos.", "Los científicos las vigilan todos los días.", "Nos ayudan a entender el clima espacial.", "Pueden causar explosiones repentinas de energía."] },
  { title: "Erupciones y Llamaradas", facts: ["El Sol a veces tiene explosiones súper potentes.", "Se llaman erupciones solares.", "Disparan fuego y radiación al espacio.", "Son las explosiones más grandes del Sistema Solar.", "Pueden apagar satélites de la Tierra.", "Liberan más energía que millones de volcanes.", "Se ven como arcos gigantes de fuego.", "Llegan a medir cientos de miles de kilómetros.", "Los astronautas deben protegerse de ellas.", "Son espectaculares pero muy peligrosas."] },
  { title: "El Viento Solar", facts: ["El Sol siempre está soplando un viento invisible.", "Se llama viento solar.", "Es una corriente de partículas eléctricas a toda velocidad.", "Viaja por todo el Sistema Solar hasta el infinito.", "Choca contra los planetas todo el tiempo.", "Afortunadamente, la Tierra tiene un escudo magnético.", "Este viento es el que crea las colas de los cometas.", "Empuja el polvo cósmico lejos del Sol.", "A veces viaja a millones de kilómetros por hora.", "Las sondas espaciales lo estudian de cerca."] },
  { title: "Auroras: El Regalo del Sol", facts: ["Cuando el viento solar choca con la Tierra, ocurre magia.", "Las partículas solares entran por los polos terrestres.", "Interactúan con los gases de nuestra atmósfera.", "Crean hermosas luces brillantes en el cielo nocturno.", "Se llaman Auroras Boreales y Australes.", "Bailan en colores verdes, rosas y púrpuras.", "Es la prueba visible del contacto con nuestra estrella.", "Son totalmente inofensivas para nosotros.", "Atraen a fotógrafos de todo el mundo.", "Otros planetas como Júpiter también tienen auroras."] },
  { title: "La Atmósfera Invisible: Corona", facts: ["La corona es la atmósfera exterior del Sol.", "Solo se puede ver durante un eclipse solar total.", "Aparece como un halo fantasmal blanco.", "Misteriosamente, es más caliente que la superficie.", "Alcanza más de un millón de grados centígrados.", "Los científicos aún intentan descubrir por qué.", "Se extiende millones de kilómetros en el espacio.", "Las naves espaciales tienen que usar escudos para cruzarla.", "Es el origen principal del viento solar rápido.", "Una danza constante de energía magnética."] },
  { title: "Eclipses: El Baile Cósmico", facts: ["A veces, la Luna se interpone entre el Sol y la Tierra.", "Esto crea un eclipse solar majestuoso.", "El día se oscurece como si fuera de noche.", "Los animales se confunden y van a dormir.", "Es posible ver la corona solar brillante.", "Es un evento astronómico muy emocionante.", "Solo dura unos pocos minutos cada vez.", "Sucede porque el Sol es 400 veces más grande que la Luna.", "Pero la Luna está 400 veces más cerca de nosotros.", "Una coincidencia cósmica perfecta en el cielo."] },
  { title: "Una Estrella Amarilla, no de Fuego", facts: ["Muchos piensan que el Sol es una bola de fuego.", "Pero en realidad no hay fuego en el espacio.", "El fuego necesita oxígeno para arder.", "El Sol brilla por la fusión nuclear, no por combustión.", "Aunque la dibujamos naranja, su luz real es blanca.", "La vemos amarilla por culpa de nuestra propia atmósfera.", "Es una estrella enana, ni muy grande ni muy pequeña.", "Existen estrellas rojas inmensas cien veces más grandes.", "Nuestro Sol es el tamaño perfecto para dar vida.", "Y seguirá brillando otros 5.000 millones de años."] },
  { title: "Naves que Tocan el Sol", facts: ["Explorar el Sol es súper difícil por su calor.", "Pero hemos enviado valientes sondas espaciales.", "La sonda Parker Solar Probe es la más famosa.", "Es la nave más rápida jamás construida por humanos.", "Viaja a más de 700.000 kilómetros por hora.", "Ha 'tocado' la corona solar resistiendo el calor.", "Usa un escudo térmico de carbono especial.", "Nos envía fotos increíbles de cerca.", "Ayuda a predecir el clima espacial peligroso.", "Es nuestra vigía en el infierno ardiente."] },
  { title: "El Ciclo de 11 Años", facts: ["El Sol no es siempre igual de activo.", "Tiene un ciclo de vida que dura 11 años.", "Pasa de estar muy tranquilo a muy violento.", "Cuando está activo, tiene muchas manchas solares.", "Esta etapa se llama Máximo Solar.", "Cuando está tranquilo, casi no hay erupciones.", "Este es el Mínimo Solar.", "Los científicos cuentan las manchas para saber la fase.", "Afecta el funcionamiento de nuestros satélites.", "Es un reloj cósmico muy puntual."] },
  { title: "Gravedad Poderosa", facts: ["El Sol es el gran jefe del Sistema Solar.", "Su gravedad es lo que mantiene todo unido.", "Sin su atracción, la Tierra saldría volando al espacio.", "Atrapa a los ocho planetas, asteroides y cometas.", "Cualquier objeto que caiga hacia él será destruido.", "Si pesas 30 kilos en la Tierra, pesarías más de 800 en el Sol.", "Es una fuerza aplastante y colosal.", "Actúa como un imán gigante invisible.", "Dicta las órbitas y el paso del tiempo planetario.", "Es el ancla de nuestro vecindario galáctico."] },
  { title: "El Futuro del Sol", facts: ["Nada dura para siempre, ni siquiera las estrellas.", "En 5.000 millones de años, el Sol cambiará.", "Se quedará sin combustible de hidrógeno.", "Comenzará a hincharse y se volverá una Gigante Roja.", "Se tragará a Mercurio, Venus y tal vez la Tierra.", "Después, perderá sus capas exteriores al espacio.", "Dejará una hermosa nebulosa planetaria brillante.", "El núcleo se encogerá en una pequeña Enana Blanca.", "Ese será su descanso final, apagándose poco a poco.", "Pero falta muchísimo tiempo para que eso ocurra."] },
  { title: "Amigo y Peligro", facts: ["El Sol es nuestro mejor amigo cósmico.", "Nos da la luz para que crezcan las plantas.", "Nos calienta para que el agua no se congele.", "Pero también puede ser peligroso si no nos cuidamos.", "Su radiación ultravioleta puede dañar nuestra piel.", "Por eso los cadetes espaciales siempre usan bloqueador.", "Las tormentas solares extremas pueden apagar el internet.", "Debemos respetarlo y estudiarlo a la distancia.", "Es el corazón latiente de nuestro Sistema Solar.", "Y el guardián de la vida en nuestro planeta."] }
];

const mercuryData = [
  { title: "El Planeta Más Pequeño", facts: ["Mercurio es el planeta más pequeño del Sistema Solar.", "Es apenas un poco más grande que nuestra Luna.", "Es el mundo más cercano al Sol ardiente.", "Gira a toda velocidad en su órbita.", "Los romanos lo llamaron como su dios mensajero veloz.", "Es un mundo rocoso y sólido.", "No tiene anillos ni lunas acompañándolo.", "Se ve grisáceo y lleno de cicatrices profundas.", "A pesar de estar cerca del Sol, no es el más caliente.", "Es un planeta de extremos brutales."] },
  { title: "Un Año Ultrarrápido", facts: ["En Mercurio el año es cortísimo.", "Tarda solo 88 días terrestres en dar una vuelta al Sol.", "Avanza por el espacio a casi 50 kilómetros por segundo.", "Es el corredor más veloz del Sistema Solar.", "Sin embargo, sus días son larguísimos.", "Gira sobre sí mismo muy lentamente.", "Un día solar ahí dura más de 175 días terrestres.", "Es decir, un día ¡es más largo que un año!", "Si vivieras ahí, verías amaneceres rarísimos.", "El Sol parecería retroceder en el cielo."] },
  { title: "El Mundo de Fuego y Hielo", facts: ["Estar tan cerca del Sol es una locura extrema.", "Durante el día, la temperatura sube a 430 grados.", "Hace suficiente calor para derretir el plomo.", "Pero como no tiene atmósfera, no guarda el calor.", "En la noche, la temperatura cae a -180 grados.", "Es el planeta con los cambios de temperatura más locos.", "Puedes congelarte o rostizarte en el mismo mundo.", "Sorprendentemente, los científicos encontraron hielo.", "El hielo está escondido en cráteres oscuros profundos.", "Donde la luz del Sol nunca puede tocarlo."] },
  { title: "Cicatrices del Pasado", facts: ["La superficie de Mercurio está llena de hoyos.", "Estos hoyos se llaman cráteres de impacto.", "Ocurrieron porque miles de asteroides chocaron contra él.", "Como no tiene atmósfera, nada detiene a las rocas espaciales.", "Y como no hay viento ni agua, las cicatrices nunca se borran.", "Es casi un gemelo visual de nuestra Luna terrestre.", "El cráter más famoso se llama la Cuenca Caloris.", "Es inmenso, provocado por un asteroide gigante.", "El choque fue tan fuerte que creó montañas al otro lado del planeta.", "Es un registro fósil de los inicios del Sistema Solar."] },
  { title: "El Corazón de Hierro", facts: ["Mercurio es un planeta muy pesado para su tamaño.", "Esto se debe a que tiene un centro gigantesco.", "Su núcleo de hierro ocupa casi el 85% del planeta.", "Es como una bala de cañón gigante con un poco de roca encima.", "Los científicos creen que un choque antiguo le quitó la roca exterior.", "O quizás el inmenso calor del Sol joven la evaporó.", "Ese núcleo metálico está parcialmente líquido.", "Esto crea un campo magnético como el de la Tierra.", "Aunque es cien veces más débil, es una gran sorpresa.", "Ningún otro planeta pequeño tiene este campo magnético activo."] },
  { title: "Cielos Negros de Día", facts: ["En la Tierra, nuestro cielo es azul de día.", "Eso ocurre gracias al aire que atrapa la luz solar.", "Pero Mercurio casi no tiene aire ni atmósfera real.", "Tiene una exósfera súper delgada e invisible.", "Si estuvieras parado en Mercurio durante el día, el cielo sería negro.", "Verías el Sol como un foco cegador sobre un cielo oscuro.", "Además, el Sol se vería tres veces más grande.", "Estaría rodeado de estrellas perfectamente visibles a mediodía.", "Sería un paisaje espeluznante y espectacular a la vez.", "Es la vista más solitaria del Sistema Solar interno."] },
  { title: "Un Planeta que se Encoge", facts: ["Mercurio es un mundo que se está haciendo pequeño.", "Su enorme núcleo de hierro se ha enfriado lentamente.", "Cuando el hierro caliente se enfría, se contrae.", "Esto hace que toda la superficie rocosa se arrugue.", "Ha creado acantilados gigantescos llamados escarpes.", "Estos muros de roca miden kilómetros de altura.", "Y se extienden como escaleras rotas por cientos de kilómetros.", "El planeta sigue encogiéndose un poquito cada año.", "Es literalmente un mundo arrugado como una pasa.", "Los terremotos de Mercurio continúan hasta el día de hoy."] },
  { title: "Colas Ocultas", facts: ["Los cometas tienen colas brillantes cuando se acercan al Sol.", "¡Sorpresa! Mercurio también tiene una cola brillante.", "El viento solar choca contra el planeta todo el tiempo.", "Arranca partículas químicas de su superficie rocosa.", "El Sol empuja estas partículas formando una larga cola visible.", "Está hecha de sodio brillante que brilla en amarillo.", "Solo los telescopios especiales pueden ver esta cola fantasma.", "Mide millones de kilómetros extendiéndose en la oscuridad.", "Es un fenómeno hermoso y poco conocido.", "Demuestra que el planeta interactúa con el viento estelar."] },
  { title: "La Visita del Mariner 10", facts: ["Mandar una nave a Mercurio es muy difícil.", "La gravedad del Sol atrae a las naves demasiado rápido.", "En 1974, la nave Mariner 10 fue la primera visitante.", "Voló cerca del planeta tres veces tomando las primeras fotos.", "Usó la gravedad de Venus para frenar su velocidad.", "Reveló los cráteres y su inesperado campo magnético.", "Pero solo logró fotografiar la mitad del planeta.", "El resto de Mercurio fue un misterio durante 30 años.", "Dejó a los científicos con ganas de saber más.", "Fue una misión pionera increíblemente valiente."] },
  { title: "El Gran Regreso de Messenger", facts: ["La humanidad regresó a Mercurio en 2011.", "Enviamos la sonda espacial MESSENGER a investigar.", "Logró entrar en la órbita del planeta por fin.", "Tomó más de 250,000 fotografías espectaculares.", "Reveló la otra mitad desconocida de este mundo de roca.", "Descubrió las reservas de hielo de agua en los polos.", "Y cartografió todos sus volcanes inactivos antiguos.", "La misión terminó cuando se quedó sin combustible.", "MESSENGER se estrelló intencionalmente contra la superficie en 2015.", "Creó su propio cráter nuevo, dejando su marca humana."] },
  { title: "La Misión BepiColombo", facts: ["Actualmente, hay otra gran misión en camino.", "Se llama BepiColombo, un proyecto europeo y japonés.", "Son dos sondas espaciales unidas viajando juntas.", "Llegarán a la órbita de Mercurio en el año 2025.", "Tienen escudos súper avanzados para resistir el calor infernal.", "Van a estudiar el núcleo metálico y los cráteres helados.", "Intentarán resolver el misterio de cómo se formó.", "También analizarán el raro campo magnético a fondo.", "Promete ser la misión más ambiciosa hacia el interior solar.", "Los cadetes espaciales esperan ansiosos sus hallazgos."] },
  { title: "El Tránsito de Mercurio", facts: ["Desde la Tierra, podemos ver un fenómeno mágico.", "A veces, Mercurio pasa justo por delante del disco del Sol.", "Se ve como un pequeñito punto negro cruzando la estrella.", "Este evento astronómico se llama 'Tránsito'.", "Solo ocurre unas 13 o 14 veces cada cien años.", "Es un baile orbital que ayuda a calcular distancias cósmicas.", "Los astrónomos usan telescopios con filtros seguros para verlo.", "El último ocurrió en 2019.", "El próximo gran tránsito visible ocurrirá en 2032.", "Es un recordatorio visual de lo pequeños que son los planetas."] },
  { title: "Volcanes del Pasado", facts: ["Hoy en día, Mercurio es un planeta geológicamente silencioso.", "Pero en el pasado distante, estaba muy activo.", "Hubo inmensos volcanes que escupían lava brillante.", "Grandes ríos de roca derretida inundaron los valles profundos.", "Esa lava se enfrió y creó las llanuras lisas que vemos hoy.", "A diferencia de la Tierra, no tiene placas tectónicas moviéndose.", "Así que sus volcanes murieron hace miles de millones de años.", "Solo quedan agujeros volcánicos solitarios y oscuros.", "Es un museo geológico congelado en el tiempo.", "Nos enseña cómo envejecen los mundos rocosos."] },
  { title: "El Aire Falso: La Exósfera", facts: ["Técnicamente, Mercurio sí tiene una pequeñísima capa de gases.", "No se le puede llamar atmósfera, se llama exósfera.", "Es tan fina que los gases casi nunca chocan entre sí.", "Contiene rastros de oxígeno, sodio, hidrógeno, y helio.", "Estos gases no provienen del interior del planeta.", "Son traídos por el viento del Sol y meteoritos.", "Como la gravedad es débil, esta exósfera se escapa al espacio.", "Se repone constantemente pero nunca es suficiente para respirar.", "Si te quitaras el casco allí, sería vacío casi perfecto.", "Es una curiosidad química de este extraño vecindario."] },
  { title: "El Sobreviviente Cercano", facts: ["A lo largo de la historia cósmica, Mercurio ha sobrevivido.", "Ha resistido el bombardeo de rocas y el calor de una estrella.", "Es un pequeño tanque blindado de hierro y silencio.", "Es la primera frontera de nuestro Sistema Solar.", "Estudiarlo nos enseña sobre mundos que giran cerca de otras estrellas.", "Los famosos exoplanetas ardientes se parecen mucho a él.", "A pesar de ser pequeño, está lleno de grandes secretos.", "Nos demuestra que la naturaleza extrema crea maravillas.", "Mercurio sigue corriendo su eterna pista de carreras solar.", "Un recordatorio veloz del poder de nuestra estrella."] }
];

async function applyFase1Batch1() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const jsonString = content.substring(startIndex).replace(/;\s*$/, '');
  let jsData = eval(jsonString);

  // Función para obtener imágenes de la wiki real
  const getImages = async (query) => {
    return new Promise((resolve) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;
      https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/6.0' } }, (res) => {
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

  const sunImages = await getImages('Sun solar flare observatory');
  const mercuryImages = await getImages('Mercury planet MESSENGER');

  const updateCourse = (id, dataObj, images) => {
    const idx = jsData.findIndex(c => c.id === id);
    if (idx === -1) return;
    
    const course = jsData[idx];
    const sections = [];
    
    for (let i = 0; i < 15; i++) {
      const data = dataObj[i];
      let finalLines = data.facts.slice(0, 10);
      while(finalLines.length < 10) finalLines.push("La exploración espacial continúa revelando misterios sorprendentes.");
      
      const img = (images && images.length > i) ? images[i] : `https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?lock=${id}-${i}`;
      
      sections.push({
        id: `${id}_sec_${i}`,
        title: `Sección ${i + 1}: ${data.title}`,
        text: finalLines,
        image: img,
        style: i % 2 === 0 ? "highlight" : "normal"
      });
    }

    if (!course.contentEs) course.contentEs = {};
    course.contentEs.sections = sections;
    
    // Create kid friendly quizzes
    course.quizEs = [
      {
        q: `¿Qué increíble propiedad física tiene el núcleo de ${id === 'sun' ? 'nuestra estrella brillante' : 'este planeta escurridizo'}?`,
        options: [
          `${id === 'sun' ? 'Convierte hidrógeno en helio a 15 millones de grados.' : 'Es de hierro gigantesco y forma el 85% del planeta.'}`,
          `Está hecho de hielo congelado y oxígeno.`,
          `Es un gran océano de agua salada.`
        ],
        a: 0
      },
      {
        q: `¿Cuál es el secreto más grande oculto en la superficie de ${id === 'sun' ? 'la fotosfera' : 'los cráteres profundos'}?`,
        options: [
          `Ciudades alienígenas invisibles.`,
          `Montañas de queso lunar.`,
          `${id === 'sun' ? 'Las manchas solares que son frías pero causan tormentas magnéticas.' : 'Rastros de hielo de agua congelada escondidos en la sombra infinita.'}`
        ],
        a: 2
      }
    ];
  };

  updateCourse('sun', sunData, sunImages);
  updateCourse('mercury', mercuryData, mercuryImages);

  const header = '// Archivo maestro estático del curso\\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\\n', 'utf8');
  console.log("Fase 1 (Batch 1): Sol y Mercurio han sido reescritos exitosamente al formato pedagógico estricto 15x15.");
}

applyFase1Batch1();
