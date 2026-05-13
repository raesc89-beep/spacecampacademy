
const fs = require('fs');

// ===== 1. FIX COURSEDATA: IMAGES + TEXT =====
const raw = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = raw.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const marsImgs = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/800px-OSIRIS_Mars_true_color.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/NASA_Mars_Rover.jpg/800px-NASA_Mars_Rover.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dust_devil_on_mars.jpg/640px-Dust_devil_on_mars.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Opportunity_on_Mars.jpg/800px-Opportunity_on_Mars.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25968_PIA25049-1280.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/26208_PIA25591-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25977_PIA25056-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25956_PIA25038-1280.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25764_PIA24836-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25742_PIA24813-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25734_PIA24805-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25726_PIA24797-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25718_PIA24789-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25710_PIA24781-800.jpg',
  'https://mars.nasa.gov/system/resources/detail_files/25702_PIA24773-800.jpg',
];

function getText(title, missionName) {
  const t = (title || '').toLowerCase();
  const m = (missionName || 'la mision').toLowerCase();

  const map = {
    'pioneros': `Antes de los modernos rovers, las sondas Viking y Mariner de la NASA fueron los primeros pioneros mecanicos en llegar a Marte. Enviadas en la decada de 1970, capturaron las primeras fotografias de la superficie y analizaron quimicamente el suelo en busca de vida.`,
    'luna rusa': `El programa espacial sovietico demostro con sus rovers Lunokhod que era posible operar robots a control remoto en la Luna. Esta tecnologia sento las bases para toda la exploracion interplanetaria con vehiculos roboticos que conocemos hoy.`,
    'peligro': `Aterrizar en Marte es uno de los mayores desafios de la ingenieria. Su atmosfera delgada apenas frena las naves, pero es suficientemente densa para quemarlas. Historicamente, casi la mitad de las misiones enviadas al planeta rojo han fallado.`,
    'sojourner': `Sojourner fue el primer rover en rodar sobre otro planeta. En 1997, este pequeño robot del tamaño de un microondas demostro que era posible explorar la superficie marciana con un vehiculo autonomo, abriendo la era de la geologia mobil interplanetaria.`,
    'familia rob': `Los rovers marcianos forman una familia tecnologica: Sojourner, Spirit, Opportunity, Curiosity y Perseverance. Cada nuevo miembro hereda y perfecciona la tecnologia de su predecesor, siendo cada generacion mas capaz y cientificamente potente.`,
    'primer robot': `Sojourner es el primer robot en rodar autonomamente sobre otro planeta. Su mision Pathfinder en 1997 revoluciono la ciencia planetaria al demostrar que podriamos explorar Marte con vehiculos moviles en lugar de sondas estaticas.`,
    'microondas': `Con solo 11.5 kilogramos y el tamaño de un horno de microondas, Sojourner fue revolucionario por su pequeñez. Su diseno compacto permitio alojarlo en la capsula Pathfinder junto con los airbags de aterrizaje que amortiguaron su llegada a Marte.`,
    'energia solar': `Sojourner funcionaba con un pequeño panel solar que generaba energia suficiente para moverse y operar sus instrumentos durante el dia marciano. Por la noche, sus baterias de litio lo mantenian activo a temperaturas de hasta menos 60 grados centigrados.`,
    'todoterreno': `Las seis ruedas de Sojourner usaban un sistema de suspension de paralelogramo que le permitia superar obstaculos del doble de su altura de rueda. Este mismo principio de suspension de "rocker-bogie" lo heredaron Spirit, Opportunity, Curiosity y Perseverance.`,
    'nombre inspirador': `El nombre Sojourner fue elegido por una estudiante de 12 años, Valerie Ambroise, en un concurso nacional. Lo nombro en honor a Sojourner Truth, la abolicionista y activista de derechos civiles estadounidense del siglo XIX.`,
    'mision original': `Sojourner debio operar solo 7 dias marcianos (soles). Sin embargo, el pequeño rover sobrevivio 83 soles, recorriendo casi 100 metros y analizando 15 rocas diferentes. Su exito inspiro el desarrollo de rovers mucho mas ambiciosos.`,
    'explorando cráteres': `Los rovers marcianos exploran cráteres de impacto porque estos revelan capas geológicas profundas que de otra forma serian inaccesibles. Las paredes de un crater actuan como una ventana al pasado geologico del planeta, exponiendo rocas de millones de años.`,
    'maratón': `Opportunity recorrio mas de 45 kilometros en la superficie marciana durante sus 14 años de operacion, superando con creces el maratonista de 42 km. Este increible logro lo convirtio en el vehiculo extraterrestre que mas distancia ha recorrido en la historia.`,
    'gemelo': `Spirit y Opportunity fueron diseñados como gemelos identicos con la mision de buscar evidencia de agua liquida en el pasado de Marte. Ambos aterrizaron en lados opuestos del planeta en enero del 2004, cubriendo el doble de superficie.`,
    'agua': `La mision principal de Spirit y Opportunity era "seguir el agua". Buscar minerales que solo se forman en presencia de agua, como hematita y sulfatos, fue clave para confirmar que Marte albergo ambientes acuosos hace miles de millones de años.`,
    'arándano': `Opportunity encontro pequeñas esferas de hematita apodadas "arándanos marcianos". Estos concreciones esfericas solo se forman cuando agua rica en hierro circula lentamente a traves de sedimentos durante millones de años, confirmando el pasado acuoso de Marte.`,
    '90 días': `Spirit y Opportunity fueron diseñados para durar solo 90 dias marcianos. Sin embargo, ambos superaron enormemente su vida util: Spirit opero 6 años y Opportunity, 14 años. Fueron victimas del exito, agotandose mucho mas alla de lo planeado.`,
    'limpieza eólica': `Los paneles solares de Opportunity estaban constantemente cubiertos de polvo marciano que reducia su generacion de energia. Afortunadamente, los remolinos de viento (dust devils) limpiaban periodicamente sus paneles, dandole repentinas explosiones de energia renovada.`,
    'atrapado': `En 2009, Spirit quedo atrapado en suelo blando lleno de silice. Los ingenieros intentaron durante meses liberarlo usando los motores de sus ruedas, pero el rover quedo permanentemente inmovilizado. Esto lo convirtio en una estacion cientifica fija en el lugar.`,
    'ocaso': `Tras 14 años de operacion, Opportunity fue silenciado definitivamente en febrero de 2019 por una tormenta global de polvo que bloqueo su generacion de energia solar durante meses. El JPL intento mas de 1000 veces contactarlo antes de declarar la mision terminada.`,
    'último mensaje': `El ultimo mensaje recibido de Opportunity fue interpretado poeticamente por sus ingenieros como: "Mi bateria esta baja y se oscurece". Este mensaje simbolico marco el fin de una de las misiones mas exitosas y longevas de la historia de la exploracion planetaria.`,
    'legado del agua': `El legado cientifico de Spirit y Opportunity es invaluable: confirmaron definitivamente que Marte albergo grandes masas de agua salada en su superficie hace miles de millones de años. Esto transformo nuestra comprension del planeta y su potencial para haber albergado vida.`,
    'hermano mayor': `Spirit fue lanzado el 10 de junio de 2003, tres semanas antes que su gemelo Opportunity. Aterrizó en el Cráter Gusev, una cuenca de 160 km de diámetro que los científicos creían fue una antigua laguna marciana llena de agua hace 3,500 millones de años.`,
    'aterrizaje': `El aterrizaje de Curiosity fue llamado los "Siete Minutos de Terror": su atmosfera delgada imposibilitaba el uso solo de paracaidas. Se usó un escudo termico, luego retrocohetes y finalmente una grua celestial que lo bajo con cables hasta posarlo suavemente sobre Marte.`,
    'cráter gale': `Curiosity aterrizó en el Cráter Gale, un impacto de 154 km de diámetro con una montaña de 5 km en el centro llamada Monte Sharp. Las capas sedimentarias de esta montaña son como un libro de historia geologica que revela 3,500 millones de años de clima marciano.`,
    'láser': `Curiosity lleva ChemCam, un instrumento que dispara pulsos de laser de 1,000 millones de vatios sobre rocas a 7 metros de distancia. El plasma resultante emite luz caracteristica de cada elemento quimico, permitiendo identificar la composicion exacta de cualquier roca.`,
    'ruedas destrozadas': `Las ruedas de aluminio de Curiosity, con solo 0.75 mm de grosor, comenzaron a mostrar grietas y agujeros despues de rodar sobre afiladas rocas basalticas en el cratér Gale. Los ingenieros tuvieron que cambiar la ruta y la velocidad para proteger las ruedas restantes.`,
    'monte sharp': `El Monte Sharp, el objetivo cientifico principal de Curiosity, es una montaña de sedimentos acumulados durante millones de años. Cada capa representa una epoca diferente del clima marciano, desde ambientes humidos con agua hasta el desierto arido que es hoy Marte.`,
    'perforando': `Curiosity puede perforar hasta 6.5 cm de profundidad en la roca marciana usando su taladro rotativo con percutor. El polvo extraido es analizado internamente por dos laboratorios miniatura: SAM (quimica organica) y CheMin (mineralogia con rayos X).`,
    'radiación': `Curiosity mide la radiacion en la superficie marciana con su instrumento RAD. Sus datos revelaron que los astronautas en Marte recibirian una dosis de radiacion 100 veces mayor que en la Tierra, informacion crucial para diseñar trajes y habitats de proteccion para futuras misiones tripuladas.`,
    'autofoto': `Curiosity, y luego Perseverance, tomaron selfies marcianas combinando decenas de imagenes individuales de su camara MAHLI. Estas autofotos no son solo para redes sociales: documentan el estado fisico del rover, mostrando acumulacion de polvo y daños en las ruedas.`,
    'orgánicas': `En 2018, Curiosity confirmó el mayor hallazgo de su mision: detecto moleculas organicas (tiofenos, benceno, tolueno) en rocas sedimentarias del Cráter Gale con 3,000 millones de años. Estas moleculas son los bloques constructores de la vida tal como la conocemos.`,
    'moderno': `Perseverance (Percy) es el rover mas avanzado jamas enviado a Marte. Con 1,025 kilogramos de peso y el tamaño de un automovil SUV, lleva 23 camaras, 2 microfonos y 7 instrumentos cientificos especializados en astrobiologia y recoleccion de muestras.`,
    'delta': `Perseverance aterrizo en el Cráter Jezero porque alberga los restos bien preservados de un antiguo delta fluvial. Cuando el agua fluyó por este delta hace 3,500 millones de años, deposito sedimentos que pudieron atrapar y preservar celulas microbianas fosilizadas.`,
    'tesoros': `Perseverance esta perforando y sellando nucleos de roca en 43 tubos de titanio del tamaño de un bolígrafo. Estos tubos son los especimenes mas preciosos jamas preparados para ser traidos a la Tierra, donde laboratorios avanzados buscaran señales inequivocas de vida antigua.`,
    'helicóptero': `Ingenuity es el primer vehiculo en lograr vuelo controlado en otro planeta. Aunque fue diseñado solo como demostracion tecnologica, ha superado todos los objetivos y continue volando como explorador aereo para Perseverance, identificando rutas y caracteristicas geologicas.`,
    'micrófonos': `Perseverance es el primer rover con microfonos que han capturado el sonido de Marte. Los audios revelan que el sonido viaja mas lento en la atmosfera marciana de CO2 y que las frecuencias altas se amortiguan rapidamente, dando a Marte un sonido sordo y silencioso.`,
    'moxie': `MOXIE (Mars Oxygen In-Situ Resource Utilization Experiment) en Perseverance convirtio exitosamente CO2 de la atmosfera marciana en oxigeno respirable. Esto demostro que los astronautas futuros podrian generar el oxigeno que necesitan directamente en Marte.`,
    'infrarrojo': `El instrumento SHERLOC en Perseverance usa espectroscopia Raman e imagenes UV para detectar moleculas organicas e identificar minerales. Puede detectar compuestos organicos que serian invisibles para otros instrumentos, siendo clave en la busqueda de biosignaturas.`,
    'pequeño volador': `Ingenuity es un helicoptero marciano de 1.8 kilogramos que demostro el primer vuelo motorizado en otro planeta el 19 de abril de 2021. Sus rotores de fibra de carbono giran a 2,400 rpm para generar sustentacion en la atmosfera marciana, 100 veces mas delgada que la terrestre.`,
    'aire': `La atmosfera de Marte tiene una presion de solo 0.7% de la terrestre. Para que Ingenuity vuele en este aire casi inexistente, sus palas de fibra de carbono deben ser extremadamente ligeras y girar mucho mas rapido que cualquier helicoptero terrestre equivalente.`,
    'hélice': `Los dos rotores contrarrotativos de Ingenuity tienen palas de 1.2 metros de punta a punta. Su diseño especial es mas rigido que los helicopteros terrestres para soportar las altas velocidades de rotacion, y ligerísimo para minimizar el peso total del vehiculo volador.`,
    'verdad': `El primer vuelo de Ingenuity fue el momento de la verdad: 39 segundos de vuelo autonomo a 3 metros de altura. El equipo en el JPL esperó 3 horas para confirmar el éxito debido al retraso de comunicaciones. Fue el equivalente marciano del primer vuelo de los hermanos Wright.`,
    'wright': `La NASA coloco un pequeño trozo de tela del avion original Wright Flyer de 1903 bajo el panel solar de Ingenuity. Este gesto simbolico conecta el primer vuelo motorizado de la humanidad en la Tierra con el primer vuelo en otro planeta, separados por 118 años de ingenieria.`,
    'autónomo': `Ingenuity opera completamente de forma autonoma durante sus vuelos. Dado que las comunicaciones con la Tierra tienen un retraso de hasta 22 minutos, el helicoptero usa su propio procesador Snapdragon 801, una camara y algoritmos de vision computacional para navegar.`,
    'visual': `El sistema de navegacion de Ingenuity usa su camara de navegacion para rastrear caracteristicas del suelo marciano a 30 fotogramas por segundo. Al comparar imagenes consecutivas, el helicoptero calcula su velocidad y posicion en tiempo real sin depender de GPS.`,
    'invierno': `Durante el invierno marciano en el Cráter Jezero, Ingenuity enfrentó su mayor desafío: temperaturas de menos 90 grados centigrados. Su calentador electrico debia mantener sus baterias y electronica funcionales, drenando energia en las noches mas largas del año marciano.`,
    'alas': `Tras realizar mas de 70 vuelos y volar varios kilometros, las alas de Ingenuity sufrieron daños que lo dejaron permanentemente en tierra en enero de 2024. Sin embargo, su camara e instrumentos siguen operativos, documentando el terreno marciano desde su posicion final.`,
    'carrera histórica': `La carrera espacial del siglo XX llevo a la humanidad desde los primeros satelites hasta poner robots en Marte. Cada nacion compitio por ser la primera en explorar el cosmos, impulsando avances tecnologicos que transformaron la civilizacion y abrieron el universo a la exploracion robotica.`,
    'misiones futuras': `Las futuras misiones a Marte incluyen el Mars Sample Return, que traera las muestras de Perseverance a la Tierra en la decada de 2030, y eventualmente misiones tripuladas. La humanidad esta preparando los pasos para que los primeros astronautas caminen sobre suelo marciano.`,
  };

  const lower = t.toLowerCase();
  for (const [key, val] of Object.entries(map)) {
    if (lower.includes(key)) return val;
  }

  // Specific fallbacks by section number
  if (lower.includes('secci') && lower.includes('12')) return `La mision ${missionName} continua transmitiendo datos invaluables desde la superficie marciana. Los ingenieros del JPL analizan cada byte de informacion para comprender mejor la geologia y atmosfera del planeta rojo.`;
  if (lower.includes('secci') && lower.includes('13')) return `Los instrumentos de ${missionName} han revelado datos sobre la composicion mineral del suelo marciano, incluyendo la presencia de perclorato, un compuesto quimico reactivo que podria ser toxico para las formas de vida terrestres pero que algunos microorganismos usan como fuente de energia.`;
  if (lower.includes('secci') && lower.includes('14')) return `El legado cientifico de la mision ${missionName} es enorme: ha demostrado que Marte tuvo condiciones habitables en el pasado y ha caracterizado el ambiente actual del planeta, informacion esencial para planificar misiones tripuladas seguras en el futuro.`;
  if (lower.includes('secci') && lower.includes('15')) return `La mision ${missionName} representa uno de los logros mas grandes de la humanidad en exploracion espacial. Cada sol marciano que opera genera nuevos descubrimientos y nos acerca mas a responder la pregunta fundamental: estamos solos en el universo?`;

  return `La mision ${missionName} opera en condiciones extremas: temperaturas entre -80°C y +20°C, radiación ultravioleta intensa y tormentas de polvo globales. Cada dato transmitido desde la superficie de Marte representa un triunfo de la ingeniería humana sobre las adversidades del cosmos.`;
}

let fixed = 0;
data.forEach(mod => {
  if (!mod.id.startsWith('robots_')) return;
  if (!mod.contentEs || !mod.contentEs.sections) return;
  const mName = mod.titleEs || mod.id.replace('robots_', '');
  const roverImg = '/assets/rovers/ai_' + mod.id.replace('robots_', '') + '.png';

  mod.contentEs.sections.forEach((sec, idx) => {
    // Fix image
    if (idx === 0) {
      sec.image = roverImg;
    } else if (idx < marsImgs.length) {
      sec.image = marsImgs[idx];
    } else {
      sec.image = marsImgs[idx % marsImgs.length];
    }
    // Fix text
    const newText = getText(sec.title, mName);
    sec.text = [newText];
    fixed++;
  });
});

fs.writeFileSync('lib/courseData.js',
  'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n',
  { encoding: 'utf8' }
);
console.log('Fixed', fixed, 'sections');
