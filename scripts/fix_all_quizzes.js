const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function patchQuiz(src, moduleId, newQuiz) {
  const moduleStart = src.indexOf(`"id": "${moduleId}"`);
  if (moduleStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const quizStart = src.indexOf('"quizEs"', moduleStart);
  if (quizStart === -1) { 
    // Try inserting quizEs before closing bracket
    console.log(`NO quizEs field: ${moduleId}`); 
    return src; 
  }
  const quizArrStart = src.indexOf('[', quizStart);
  let d2 = 0, j = quizArrStart;
  while (j < src.length) {
    if (src[j] === '[') d2++;
    else if (src[j] === ']') { d2--; if (d2 === 0) break; }
    j++;
  }
  src = src.slice(0, quizArrStart) + JSON.stringify(newQuiz, null, 4) + src.slice(j + 1);
  console.log(`✅ Quiz patched: ${moduleId}`);
  return src;
}

const quizzes = {
  animales_intro: [
    { q: "¿Cuál fue el primer animal en orbitar la Tierra?", options: ["Un chimpancé", "Un perro", "Una rata", "Un gato"], a: 1 },
    { q: "¿Cómo se llamaba el primer perro en ir al espacio?", options: ["Belka", "Laika", "Rex", "Sputnik"], a: 1 },
    { q: "¿En qué año fue enviada Laika al espacio?", options: ["1953", "1957", "1961", "1969"], a: 1 },
    { q: "¿Qué animal llamado Ham fue enviado al espacio?", options: ["Un gato", "Un chimpancé", "Un mono araña", "Un delfín"], a: 1 },
    { q: "¿Por qué se usaban animales antes que humanos en el espacio?", options: ["Eran más inteligentes", "Para probar la seguridad antes de enviar personas", "Los animales sobreviven mejor en el vacío", "Era más económico"], a: 1 }
  ],
  animales_albert_ham: [
    { q: "¿Cómo se llamaba el mono rhesus enviado al espacio en 1948?", options: ["Ham", "Albert I", "Enos", "Baker"], a: 1 },
    { q: "¿En qué año voló Ham el chimpancé?", options: ["1957", "1959", "1961", "1963"], a: 2 },
    { q: "¿Qué tarea realizó Ham durante su vuelo?", options: ["Solo durmió", "Empujó palancas en respuesta a señales luminosas", "Pilotó la cápsula", "Tomó fotografías"], a: 1 },
    { q: "¿Cuánto tiempo duró el vuelo de Ham?", options: ["5 horas", "16.5 minutos", "2 días", "45 segundos"], a: 1 },
    { q: "¿Qué misión humana siguió poco después del vuelo de Ham?", options: ["Apolo 11", "Mercury-Redstone 3 de Alan Shepard", "Vostok 1 de Gagarin", "Gemini 1"], a: 1 }
  ],
  animales_laika: [
    { q: "¿En qué misión viajó Laika?", options: ["Sputnik 1", "Sputnik 2", "Vostok 1", "Luna 1"], a: 1 },
    { q: "¿Qué tipo de perro era Laika?", options: ["Labrador", "Pastor alemán", "Mestiza callejera de Moscú", "Husky siberiano"], a: 2 },
    { q: "¿Qué pasó con Laika durante la misión?", options: ["Regresó sana a la Tierra", "Murió por sobrecalentamiento pocas horas después del lanzamiento", "Fue rescatada por otra nave", "Nunca llegó a orbitar"], a: 1 },
    { q: "¿Cuándo se reveló la verdad sobre la muerte de Laika?", options: ["1957", "1970", "2002", "2010"], a: 2 },
    { q: "¿Qué importancia tuvo la misión de Laika?", options: ["Demostró que los perros son mejores astronautas que los humanos", "Confirmó que los seres vivos podían sobrevivir en órbita", "Fue la primera misión espacial tripulada", "Laika llevó mensajes a extraterrestres"], a: 1 }
  ],
  animales_gatos: [
    { q: "¿Cómo se llamaba el único gato enviado al espacio?", options: ["Felix", "Whiskers", "Félicette", "Luna"], a: 2 },
    { q: "¿Qué país envió un gato al espacio?", options: ["URSS", "EE.UU.", "Francia", "Alemania"], a: 2 },
    { q: "¿En qué año voló Félicette?", options: ["1957", "1963", "1969", "1971"], a: 1 },
    { q: "¿Regresó Félicette viva a la Tierra?", options: ["Sí, aterrizó con paracaídas", "No, murió en el espacio", "Sí, pero tardó 10 días en ser rescatada", "No, sigue en órbita"], a: 0 },
    { q: "¿Para qué sirvieron los animales en las misiones espaciales?", options: ["Para entretener a los astronautas", "Para probar sistemas de soporte vital y efectos de la ingravidez", "Para comunicarse con extraterrestres", "Como fuente de alimento"], a: 1 }
  ],
  asteroides_intro: [
    { q: "¿Qué son los asteroides?", options: ["Estrellas pequeñas", "Rocas espaciales que orbitan principalmente el Sol entre Marte y Júpiter", "Cometas sin cola", "Fragmentos de la Luna"], a: 1 },
    { q: "¿Dónde se encuentra la mayoría de los asteroides del sistema solar?", options: ["Cerca del Sol", "En el Cinturón de Asteroides entre Marte y Júpiter", "Más allá de Neptuno", "En la órbita de la Tierra"], a: 1 },
    { q: "¿Cuál es el asteroide más grande del cinturón principal?", options: ["Eros", "Vesta", "Ceres", "Bennu"], a: 2 },
    { q: "¿Qué causó la extinción de los dinosaurios hace 66 millones de años?", options: ["Un volcán gigante", "El impacto de un asteroide de ~10 km", "Una glaciación", "Una pandemia"], a: 1 },
    { q: "¿Cuántos asteroides conocidos hay en el sistema solar?", options: ["Unos 100", "Miles", "Millones", "Más de 1.1 millones catalogados"], a: 3 }
  ],
  asteroides_meteoros: [
    { q: "¿Qué es un meteoroide?", options: ["Un asteroide grande", "Un fragmento pequeño de roca o metal en el espacio", "Una estrella fugaz", "Un planeta enano"], a: 1 },
    { q: "¿Cómo se llama un meteoroide cuando entra a la atmósfera y se incendia?", options: ["Meteoro o estrella fugaz", "Asteroide", "Cometa", "Bólido"], a: 0 },
    { q: "¿Cómo se llama un meteoroide que llega al suelo sin desintegrarse?", options: ["Meteorito", "Meteoro", "Meteoroide", "Bolígrafo cósmico"], a: 0 },
    { q: "¿Cuál fue el meteorito más famoso que cayó en el siglo XXI?", options: ["El meteorito de Tunguska", "El de Chelyabinsk en 2013", "El de Arizona", "El de Yucatán"], a: 1 },
    { q: "¿Qué son las lluvias de meteoros?", options: ["Lluvia de agua del espacio", "Cuando la Tierra cruza los restos de un cometa y vemos muchas estrellas fugaces", "Tormentas solares", "Asteroides acercándose a la Tierra"], a: 1 }
  ],
  asteroides_cometas: [
    { q: "¿Qué son los cometas?", options: ["Asteroides de metal", "Cuerpos de hielo, polvo y roca que desarrollan una cola al acercarse al Sol", "Planetas pequeños", "Estrellas muertas"], a: 1 },
    { q: "¿De dónde vienen la mayoría de los cometas?", options: ["Del cinturón de asteroides", "De la Nube de Oort y el Cinturón de Kuiper", "De otras galaxias", "De Júpiter"], a: 1 },
    { q: "¿Por qué los cometas tienen cola?", options: ["Por su velocidad", "El viento solar y la radiación solar subliman el hielo creando una cola de gas y polvo", "Son colas de fuego", "Por la atmósfera terrestre"], a: 1 },
    { q: "¿Cada cuánto vuelve el cometa Halley?", options: ["Cada 10 años", "Cada 75-76 años", "Cada 200 años", "Una sola vez"], a: 1 },
    { q: "¿Qué misión aterrizó en el cometa 67P/Churyumov-Gerasimenko?", options: ["Cassini", "New Horizons", "Rosetta/Philae", "DART"], a: 2 }
  ],
  asteroides_sondas: [
    { q: "¿Cuál fue la primera misión que tomó muestras de un asteroide?", options: ["NEAR Shoemaker", "Hayabusa de Japón (2003)", "OSIRIS-REx", "Dawn"], a: 1 },
    { q: "¿Qué asteroide estudió la misión OSIRIS-REx de la NASA?", options: ["Eros", "Vesta", "Bennu", "Apophis"], a: 2 },
    { q: "¿En qué año la misión Dawn llegó a Ceres?", options: ["2001", "2010", "2015", "2020"], a: 2 },
    { q: "¿Qué demostró la misión DART en 2022?", options: ["Que los asteroides tienen agua", "Que podemos cambiar la órbita de un asteroide impactando contra él", "Que hay vida en los asteroides", "Que Apophis chocará con la Tierra"], a: 1 },
    { q: "¿Por qué es importante el estudio de los asteroides?", options: ["Solo por curiosidad científica", "Para extraer minerales, entender el origen del sistema solar y proteger la Tierra", "Para colonizarlos", "Para usarlos como combustible"], a: 1 }
  ],
  asteroides_apophis: [
    { q: "¿Qué es el asteroide Apophis?", options: ["Un cometa", "Un asteroide de 370 m que pasará muy cerca de la Tierra en 2029", "Un planeta enano", "Un fragmento lunar"], a: 1 },
    { q: "¿A qué distancia pasará Apophis de la Tierra en 2029?", options: ["31,000 km", "384,000 km", "1 millón de km", "100 km"], a: 0 },
    { q: "¿Apophis chocará con la Tierra?", options: ["Sí, en 2029", "No: los cálculos actuales descartan impacto hasta 2068", "Sí, en 2036", "Es completamente seguro para siempre"], a: 1 },
    { q: "¿Cómo se descubrió Apophis?", options: ["Por radar", "Con telescopios ópticos en 2004 por Tucker, Tholen y Bernardi", "Por Galileo", "Lo descubrió la NASA en 1960"], a: 1 },
    { q: "¿Qué misión de la NASA visitará Apophis en 2029?", options: ["DART", "New Horizons", "OSIRIS-Apex", "Curiosity"], a: 2 }
  ],
  'viaje-planetas-gaseosos': [
    { q: "¿Cuáles son los planetas gaseosos gigantes del sistema solar?", options: ["Tierra y Venus", "Júpiter y Saturno", "Júpiter, Saturno, Urano y Neptuno", "Solo Júpiter"], a: 2 },
    { q: "¿Cuál es el planeta más grande del sistema solar?", options: ["Saturno", "Neptuno", "Júpiter", "Urano"], a: 2 },
    { q: "¿Qué caracteriza a Saturno?", options: ["Su color rojo", "Sus famosos anillos de hielo y roca", "Sus volcanes", "Su gran mancha blanca"], a: 1 },
    { q: "¿Qué son los anillos de Saturno?", options: ["Nubes de polvo", "Partículas de hielo y roca que orbitan el planeta", "Cinturones de asteroides", "Tormentas atmosféricas"], a: 1 },
    { q: "¿Qué sonda estudió el sistema de Saturno durante 13 años?", options: ["Voyager 1", "New Horizons", "Cassini", "Galileo"], a: 2 }
  ],
  pioneros_yuri: [
    { q: "¿Quién fue el primer ser humano en volar al espacio?", options: ["Alan Shepard", "Yuri Gagarin", "John Glenn", "Neil Armstrong"], a: 1 },
    { q: "¿En qué año voló Yuri Gagarin?", options: ["1957", "1961", "1963", "1969"], a: 1 },
    { q: "¿Cuánto duró el vuelo de Gagarin?", options: ["108 minutos (1 órbita)", "1 hora exacta", "3 días", "45 minutos"], a: 0 },
    { q: "¿Cómo se llamaba la nave de Gagarin?", options: ["Sputnik 3", "Vostok 1", "Apollo 1", "Mir"], a: 1 },
    { q: "¿Qué frase famosa dijo Gagarin al ver la Tierra desde el espacio?", options: ["Un pequeño paso para el hombre", "'La Tierra es azul!'", "Ad astra", "Houston, tenemos un problema"], a: 1 }
  ],
  pioneros_alan: [
    { q: "¿Quién fue el primer estadounidense en el espacio?", options: ["John Glenn", "Neil Armstrong", "Alan Shepard", "Gus Grissom"], a: 2 },
    { q: "¿En qué año viajó Alan Shepard al espacio?", options: ["1957", "1961", "1963", "1969"], a: 1 },
    { q: "¿Era el vuelo de Shepard orbital?", options: ["Sí, dio 3 vueltas a la Tierra", "No, fue un vuelo suborbital de 15 minutos", "Fue a la Luna", "Duró 2 días"], a: 1 },
    { q: "¿Cuál fue otra gran misión de Alan Shepard años después?", options: ["Gemini 7", "Apolo 14: caminó en la Luna", "Skylab", "Mercury-Atlas 6"], a: 1 },
    { q: "¿Qué hizo Shepard en la superficie lunar que fue famoso?", options: ["Plantó una bandera gigante", "Golpeó pelotas de golf con un palo improvisado", "Construyó una base", "Recogió una piedra gigante"], a: 1 }
  ],
  pioneros_john: [
    { q: "¿Quién fue el primer estadounidense en orbitar la Tierra?", options: ["Alan Shepard", "John Glenn", "Neil Armstrong", "Buzz Aldrin"], a: 1 },
    { q: "¿Cuántas órbitas hizo John Glenn en su primer vuelo?", options: ["1", "3", "10", "27"], a: 1 },
    { q: "¿En qué año fue el vuelo orbital de John Glenn?", options: ["1961", "1962", "1965", "1969"], a: 1 },
    { q: "¿Cuántos años tenía Glenn cuando volvió al espacio en 1998 con la misión STS-95?", options: ["60 años", "70 años", "77 años", "85 años"], a: 2 },
    { q: "¿Por qué fue famoso el segundo vuelo de Glenn en 1998?", options: ["Fue el primero en hacer un paseo espacial", "Se convirtió en el astronauta de mayor edad en volar al espacio", "Llegó a la Luna", "Fue el primer vuelo del transbordador"], a: 1 }
  ],
  pioneros_valentina: [
    { q: "¿Quién fue la primera mujer en volar al espacio?", options: ["Sally Ride", "Svetlana Savitskaya", "Valentina Tereshkova", "Christa McAuliffe"], a: 2 },
    { q: "¿En qué año voló Tereshkova?", options: ["1961", "1963", "1969", "1974"], a: 1 },
    { q: "¿Cuántas órbitas completó Tereshkova?", options: ["3 órbitas", "48 órbitas en 3 días", "1 órbita", "100 órbitas"], a: 1 },
    { q: "¿Cómo se llamaba la nave de Tereshkova?", options: ["Vostok 5", "Vostok 6", "Soyuz 1", "Mir"], a: 1 },
    { q: "¿Cuál era la profesión de Tereshkova antes de ser cosmonauta?", options: ["Piloto militar", "Médica", "Obrera textil y paracaidista amateur", "Ingeniera"], a: 2 }
  ],
  pioneros_leonov: [
    { q: "¿Quién fue el primer humano en realizar un paseo espacial (EVA)?", options: ["Neil Armstrong", "Alexei Leonov", "Ed White", "Buzz Aldrin"], a: 1 },
    { q: "¿En qué año fue el primer paseo espacial de Leonov?", options: ["1961", "1963", "1965", "1969"], a: 2 },
    { q: "¿Cuánto tiempo pasó Leonov fuera de la nave?", options: ["12 minutos", "2 horas", "30 segundos", "8 horas"], a: 0 },
    { q: "¿Qué problema casi trágico ocurrió en el paseo de Leonov?", options: ["La nave perdió combustible", "Su traje se infló e inflexibilizó tanto que casi no pudo regresar a la nave", "Se cortó el cordón umbilical", "La temperatura bajó a -200°C"], a: 1 },
    { q: "¿En qué misión histórica conjunta participó Leonov en 1975?", options: ["Misión Mir", "Apolo-Soyuz", "SkyLab", "Vostok 9"], a: 1 }
  ],
  pioneros_svetlana: [
    { q: "¿Quién fue la primera mujer en hacer un paseo espacial (EVA)?", options: ["Valentina Tereshkova", "Sally Ride", "Svetlana Savitskaya", "Peggy Whitson"], a: 2 },
    { q: "¿En qué año hizo Savitskaya su primer vuelo al espacio?", options: ["1963", "1975", "1982", "1990"], a: 2 },
    { q: "¿Cuánto tiempo duró el paseo espacial de Savitskaya?", options: ["30 minutos", "3 horas y 35 minutos", "8 horas", "12 minutos"], a: 1 },
    { q: "¿Qué tarea realizó Savitskaya durante su paseo espacial?", options: ["Plantó una bandera", "Realizó experimentos de soldadura en el vacío", "Reparó paneles solares", "Tomó fotografías de la Tierra"], a: 1 },
    { q: "¿Fue Savitskaya la primera o segunda mujer en ir al espacio?", options: ["La primera", "La segunda (Tereshkova fue la primera en 1963)", "La tercera", "La quinta"], a: 1 }
  ],
  pioneros_sally: [
    { q: "¿Quién fue la primera mujer estadounidense en volar al espacio?", options: ["Valentina Tereshkova", "Peggy Whitson", "Sally Ride", "Kathleen Sullivan"], a: 2 },
    { q: "¿En qué año voló Sally Ride?", options: ["1973", "1978", "1983", "1988"], a: 2 },
    { q: "¿En qué transbordador espacial voló?", options: ["Columbia", "Challenger", "Discovery", "Endeavour"], a: 1 },
    { q: "¿Cuántos años tenía Sally Ride cuando voló?", options: ["25", "32", "41", "55"], a: 1 },
    { q: "¿Qué hizo Sally Ride después de su carrera como astronauta?", options: ["Se retiró completamente", "Fundó Sally Ride Science para inspirar a jóvenes en STEM", "Se convirtió en senadora", "Escribió solo novelas"], a: 1 }
  ],
  colisiones_estelares: [
    { q: "¿Qué ocurre cuando dos estrellas de neutrones colisionan?", options: ["Se convierten en planetas", "Producen una kilonova y liberan ondas gravitacionales y metales pesados", "Crean una supernova", "Desaparecen sin dejar rastro"], a: 1 },
    { q: "¿Qué son las ondas gravitacionales?", options: ["Ondas de radio del espacio", "Perturbaciones en el espacio-tiempo causadas por masas en aceleración", "Ondas de calor solar", "Tormentas magnéticas"], a: 1 },
    { q: "¿En qué año LIGO detectó las primeras ondas gravitacionales?", options: ["2000", "2010", "2015", "2020"], a: 2 },
    { q: "¿De dónde vienen el oro y el platino en la Tierra?", options: ["Del Sol", "De colisiones de estrellas de neutrones y supernovas", "De asteroides de carbono", "Del manto terrestre"], a: 1 },
    { q: "¿Qué es LIGO?", options: ["Un satélite de la NASA", "Un detector de ondas gravitacionales por interferometría láser", "Un telescopio de rayos X", "Una estación espacial"], a: 1 }
  ],
  robots_historia: [
    { q: "¿Cuál fue el primer rover en pisar otro mundo?", options: ["Sojourner", "Lunokhod 1 (Luna, 1970)", "Opportunity", "Curiosity"], a: 1 },
    { q: "¿Por qué enviamos robots al espacio en lugar de personas?", options: ["Los robots son más inteligentes", "Son más baratos, no necesitan aire ni comida, y toleran radiación y temperaturas extremas", "Las personas se niegan a ir", "Los robots conocen mejor el espacio"], a: 1 },
    { q: "¿Qué es un rover?", options: ["Un satélite meteorológico", "Un vehículo robótico diseñado para moverse sobre la superficie de planetas o lunas", "Un cohete pequeño", "Un telescopio robótico"], a: 1 },
    { q: "¿Cuántos rovers de la NASA han explorado Marte?", options: ["1", "3", "5", "10"], a: 2 },
    { q: "¿Para qué usan los rovers los paneles solares o los RTGs?", options: ["Para comunicarse con la Tierra", "Para generar electricidad y alimentar sus sistemas", "Para calentarse durante el verano", "Para despegar de Marte"], a: 1 }
  ],
  robots_sojourner: [
    { q: "¿Cuándo llegó Sojourner a Marte?", options: ["1976", "1997", "2004", "2012"], a: 1 },
    { q: "¿Cuánto pesaba Sojourner?", options: ["900 kg", "170 kg", "10.6 kg", "1 tonelada"], a: 2 },
    { q: "¿Cuánto tiempo estuvo activo Sojourner?", options: ["Solo 1 día", "83 días", "2 años", "Todavía funciona"], a: 1 },
    { q: "¿Qué misión llevó a Sojourner a Marte?", options: ["Viking 1", "Mars Pathfinder", "Mars Exploration Rover", "Mars Science Laboratory"], a: 1 },
    { q: "¿Cuántos metros recorrió Sojourner en total?", options: ["100 m", "100 km", "100 m aproximadamente", "10 km"], a: 0 }
  ],
  robots_opportunity: [
    { q: "¿Cuántos kilómetros recorrió Opportunity en Marte?", options: ["10 km", "45 km", "100 km", "200 km"], a: 1 },
    { q: "¿Cuánto tiempo estuvo activo Opportunity?", options: ["90 días (lo planificado)", "15 años (mucho más de lo planificado)", "3 años", "Solo 10 días"], a: 1 },
    { q: "¿Qué descubrió Opportunity en Marte?", options: ["Vida microbiana", "Evidencia de que el agua líquida existió en el pasado de Marte", "Oro", "Oxígeno puro"], a: 1 },
    { q: "¿Qué puso fin a la misión de Opportunity?", options: ["Una colisión con una roca", "Una tormenta de polvo global en 2018 que cubrió sus paneles solares", "Se quedó sin batería", "Cayó en un cráter"], a: 1 },
    { q: "¿Cuándo aterrizó Opportunity en Marte?", options: ["1997", "2004", "2009", "2012"], a: 1 }
  ],
  robots_spirit: [
    { q: "¿Cuándo aterrizó Spirit en Marte?", options: ["1997", "2004", "2008", "2012"], a: 1 },
    { q: "¿Cuánto tiempo estuvo activo Spirit?", options: ["90 días", "6 años (2004-2010)", "2 años", "Solo 30 días"], a: 1 },
    { q: "¿Qué le pasó a Spirit al final de su misión?", options: ["Se cayó en un cráter", "Quedó atrapado en arena suave y perdió contacto", "Se sobrecalentó", "Sus ruedas explotaron"], a: 1 },
    { q: "¿Cuántas ruedas rompió Spirit durante su misión?", options: ["Ninguna", "Una (la rueda delantera derecha)", "Todas", "Cuatro"], a: 1 },
    { q: "¿Qué gemelo tenía Spirit?", options: ["Curiosity", "Opportunity", "Perseverance", "Sojourner"], a: 1 }
  ],
  robots_curiosity: [
    { q: "¿Cuándo aterrizó Curiosity en Marte?", options: ["2004", "2009", "2012", "2021"], a: 2 },
    { q: "¿Cómo aterrizó Curiosity en Marte?", options: ["Con airbags", "Con paracaídas solo", "Con la 'grúa del cielo', bajando por cables de una plataforma voladora", "Con retrocohetes directos"], a: 2 },
    { q: "¿Cuánto pesa Curiosity?", options: ["11 kg", "170 kg", "900 kg", "5 toneladas"], a: 2 },
    { q: "¿Qué fuente de energía usa Curiosity?", options: ["Paneles solares", "Batería de litio", "RTG (generador termoléctrico de radioisótopos)", "Pilas de combustible"], a: 2 },
    { q: "¿Cuál es el principal hallazgo de Curiosity?", options: ["Encontró vida en Marte", "Confirmó que Marte fue habitable en el pasado (agua, carbono)", "Descubrió que Marte tiene atmósfera densa", "Encontró meteoritos de oro"], a: 1 }
  ],
  robots_perseverance: [
    { q: "¿Cuándo aterrizó Perseverance en Marte?", options: ["2018", "2019", "2021", "2023"], a: 2 },
    { q: "¿Cuál es el objetivo principal de Perseverance?", options: ["Buscar agua en el subsuelo", "Buscar signos de vida antigua y recoger muestras para traer a la Tierra", "Fotografiar la atmósfera", "Preparar una base humana"], a: 1 },
    { q: "¿Qué lleva Perseverance además de sus propios instrumentos?", options: ["Una cápsula de retorno", "El helicóptero Ingenuity", "Un submarino para buscar agua", "Un robot caminante"], a: 1 },
    { q: "¿Qué experimento de Perseverance demostró por primera vez?", options: ["Que hay vida en Marte", "MOXIE produjo oxígeno a partir del CO2 marciano", "Que hay oro en Marte", "Que Marte tiene mareas"], a: 1 },
    { q: "¿Dónde aterrizó Perseverance?", options: ["Monte Olimpo", "Cráter Jezero (un antiguo delta de río)", "Valles Marineris", "El polo sur de Marte"], a: 1 }
  ],
  robots_ingenuity: [
    { q: "¿Qué es Ingenuity?", options: ["Un rover grande", "El primer helicóptero en volar en otro planeta (Marte)", "Un satélite de Marte", "Un robot perforador"], a: 1 },
    { q: "¿Por qué es difícil volar un helicóptero en Marte?", options: ["Por la alta gravedad", "La atmósfera de Marte es muy delgada (1% de la terrestre), así que las aspas deben girar muy rápido", "Hace demasiado frío", "No hay viento"], a: 1 },
    { q: "¿Cuántas veces estaba planificado que Ingenuity volara?", options: ["1 vuelo de prueba", "5 vuelos de prueba", "50 vuelos", "100 vuelos"], a: 1 },
    { q: "¿Cuántos vuelos llegó a completar Ingenuity?", options: ["5 vuelos", "18 vuelos", "72 vuelos", "Más de 70"], a: 3 },
    { q: "¿Qué puso fin a la misión de Ingenuity?", options: ["Se acabó la batería", "Un daño en las aspas durante el aterrizaje en enero de 2024", "Se quedó sin comunicación", "Lo aplastó una roca"], a: 1 }
  ],
  robots_futuras: [
    { q: "¿Cuál es la próxima gran misión robótica planificada para Marte?", options: ["Curiosity 2", "Mars Sample Return (traer muestras de Marte a la Tierra)", "Un rover más grande", "Una sonda orbitadora"], a: 1 },
    { q: "¿Qué moon robot está explorando Europa (luna de Júpiter)?", options: ["Cassini", "Europa Clipper (2024)", "Galileo", "Juno"], a: 1 },
    { q: "¿Qué es el Dragonfly de la NASA?", options: ["Un telescopio", "Un helicóptero nuclear que explorará Titán (luna de Saturno)", "Un rover para la Luna", "Un satélite de comunicaciones"], a: 1 },
    { q: "¿Para qué sirven los robots en la preparación para misiones humanas?", options: ["Solo para fotografías", "Para mapear el terreno, buscar recursos y preparar infraestructuras", "Para terraformar planetas", "No son útiles en esta tarea"], a: 1 },
    { q: "¿Qué mineral buscan algunos robots en Marte y la Luna?", options: ["Oro y platino", "Agua en forma de hielo (crucial para astronautas futuros)", "Diamantes", "Combustible fósil"], a: 1 }
  ],
  viaje_planetas_rocosos: [
    { q: "¿Cuáles son los planetas rocosos del sistema solar?", options: ["Júpiter, Saturno, Urano, Neptuno", "Mercurio, Venus, Tierra y Marte", "Solo la Tierra y Marte", "Todos los planetas son rocosos"], a: 1 },
    { q: "¿Por qué Venus es el planeta más caliente?", options: ["Está más cerca del Sol", "Por su efecto invernadero extremo de CO2 (460°C)", "Tiene un núcleo muy activo", "No tiene atmósfera que lo enfríe"], a: 1 },
    { q: "¿Cuánto tarda Marte en orbitar el Sol?", options: ["1 año terrestre", "1.88 años terrestres", "2 años exactos", "6 meses"], a: 1 },
    { q: "¿Cuál es el volcán más alto del sistema solar?", options: ["El Everest en la Tierra", "El Monte Olimpo en Marte (21 km)", "Uno en Venus", "Uno en Io"], a: 1 },
    { q: "¿Por qué Mercurio tiene tantos cráteres?", options: ["Tiene muchos volcanes", "Tiene muy poca atmósfera, así que los meteoritos no se frenan antes de impactar", "Está hecho de hielo", "Es muy antiguo"], a: 1 }
  ],
  exoplanetas: [
    { q: "¿Qué es un exoplaneta?", options: ["Un planeta artificial", "Un planeta que orbita una estrella diferente al Sol", "Un planeta fuera del universo observable", "Un satélite natural grande"], a: 1 },
    { q: "¿Cuántos exoplanetas confirmados hay?", options: ["Menos de 100", "Unos 1,000", "Más de 5,500 confirmados", "Solo 10"], a: 2 },
    { q: "¿Qué telescopio fue el mayor cazador de exoplanetas?", options: ["Hubble", "Telescopio Kepler", "Spitzer", "Chandra"], a: 1 },
    { q: "¿Qué es la 'zona habitable' de una estrella?", options: ["La zona más cercana a la estrella", "El rango de distancias donde el agua líquida puede existir en la superficie", "Donde no hay radiación", "Donde el planeta tiene atmósfera"], a: 1 },
    { q: "¿Qué método se usa más para detectar exoplanetas?", options: ["Fotografía directa", "El método de tránsito (la luz de la estrella baja cuando el planeta pasa por delante)", "Radar", "Ondas de radio"], a: 1 }
  ],
  objetos_interestelares: [
    { q: "¿Cómo se llama el primer objeto interestelar detectado en nuestro sistema solar?", options: ["Oumuamua", "'Oumuamua (2017)", "Borisov", "Halley"], a: 1 },
    { q: "¿Qué forma inusual tenía 'Oumuamua?", options: ["Esférica", "Muy alargada, como un cigarro (relación 10:1)", "Cúbica", "En espiral"], a: 1 },
    { q: "¿Qué fue Borisov (2I/Borisov)?", options: ["Un asteroide interestelar", "El primer cometa interestelar confirmado (2019)", "Un satélite de Neptuno", "Una nave espacial extraterrestre"], a: 1 },
    { q: "¿De dónde vienen los objetos interestelares?", options: ["Del cinturón de Kuiper", "De otros sistemas estelares, eyectados por las fuerzas gravitacionales de sus planetas", "De la Luna", "Del Big Bang directamente"], a: 1 },
    { q: "¿Por qué son interesantes los objetos interestelares para los científicos?", options: ["Pueden ser naves alienígenas", "Traen material de otros sistemas estelares que podemos analizar directamente", "Son muy grandes y peligrosos", "Contienen oro"], a: 1 }
  ],
  exoplanetas_m1: [
    { q: "¿Qué es un exoplaneta?", options: ["Un planeta artificial", "Un planeta que orbita una estrella diferente al Sol", "La Luna de otro planeta", "Un asteroide grande"], a: 1 },
    { q: "¿En qué año se confirmó el primer exoplaneta alrededor de una estrella similar al Sol?", options: ["1960", "1975", "1995", "2010"], a: 2 },
    { q: "¿Cuántos exoplanetas hay confirmados al 2024?", options: ["Menos de 500", "Unos 1,000", "Más de 5,500", "Exactamente 100"], a: 2 },
    { q: "¿Qué telescopio descubrió la mayoría de los exoplanetas conocidos?", options: ["Hubble", "James Webb", "Kepler/K2", "Chandra"], a: 2 },
    { q: "¿Cómo detecta el método de tránsito un exoplaneta?", options: ["Con láser", "Detecta la pequeña caída de brillo de la estrella cuando el planeta pasa por delante", "Por las ondas de radio que emite", "Fotografía directa del planeta"], a: 1 }
  ],
  exoplanetas_m3: [
    { q: "¿Qué es la zona habitable de una estrella?", options: ["La zona más fría", "El rango donde el agua puede existir líquida en la superficie de un planeta", "La zona sin asteroides", "El anillo de planetas internos"], a: 1 },
    { q: "¿Cómo se llama el sistema con 7 planetas en zona habitable cercano a la Tierra?", options: ["Kepler-452", "TRAPPIST-1", "Proxima Centauri b", "Tau Ceti"], a: 1 },
    { q: "¿A qué distancia está TRAPPIST-1 de la Tierra?", options: ["4 años luz", "39 años luz", "1,000 años luz", "100 años luz"], a: 1 },
    { q: "¿Qué telescopio comenzó a estudiar la atmósfera de exoplanetas en zona habitable?", options: ["Hubble", "Kepler", "James Webb (JWST)", "Spitzer"], a: 2 },
    { q: "¿Qué tipo de estrellas suelen tener los exoplanetas en zona habitable más cercanos?", options: ["Estrellas gigantes azules", "Enanas rojas (M tipo)", "Estrellas como el Sol (G tipo)", "Estrellas binarias"], a: 1 }
  ]
};

for (const [moduleId, quiz] of Object.entries(quizzes)) {
  src = patchQuiz(src, moduleId, quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\nAll quizzes patched! Done.');
