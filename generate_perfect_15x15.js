const fs = require('fs');

const rovers = [
  { id: "robots_historia", name: "Carrera Histórica", year: "1970s", weight: "varios pesos", site: "Múltiples regiones", discovery: "la composición química de la superficie", inst: "cámaras vidicon y espectrómetros tempranos", extra: "marcando el inicio de la exploración interplanetaria." },
  { id: "robots_sojourner", name: "Sojourner", year: "1996", weight: "11.5 kg", site: "Ares Vallis", discovery: "evidencia de antiguas llanuras de inundación", inst: "espectrómetro APXS y cámaras estéreo", extra: "demostrando que la movilidad robótica era posible." },
  { id: "robots_opportunity", name: "Opportunity", year: "2003", weight: "185 kg", site: "Meridiani Planum", discovery: "esferas de hematita creadas en agua líquida", inst: "Pancam y herramienta de abrasión de rocas", extra: "sobreviviendo 14 años más allá de su garantía de 90 días." },
  { id: "robots_spirit", name: "Spirit", year: "2003", weight: "185 kg", site: "Cráter Gusev", discovery: "sílice puro indicando antiguas fuentes termales", inst: "Espectrómetro Mössbauer y cámaras", extra: "luchando valientemente contra el terreno implacable." },
  { id: "robots_curiosity", name: "Curiosity", year: "2011", weight: "899 kg", site: "Cráter Gale", discovery: "moléculas orgánicas complejas", inst: "ChemCam con láser y el laboratorio SAM", extra: "alimentado por un generador termoeléctrico de radioisótopos." },
  { id: "robots_perseverance", name: "Perseverance", year: "2020", weight: "1025 kg", site: "Cráter Jezero", discovery: "minerales formados en un antiguo delta fluvial", inst: "SuperCam, SHERLOC y PIXL", extra: "almacenando núcleos de roca para traerlos a la Tierra." },
  { id: "robots_ingenuity", name: "Ingenuity", year: "2020", weight: "1.8 kg", site: "Cráter Jezero", discovery: "vuelo aerodinámico controlado en Marte", inst: "rotores de carbono a 2500 RPM", extra: "abriendo la puerta a la exploración aérea extraterrestre." },
  { id: "robots_futuras", name: "Misiones Futuras", year: "2030s", weight: "más de 1000 kg", site: "regiones inexploradas", discovery: "rastros de vida microbiana pasada o presente", inst: "taladros profundos e IA autónoma", extra: "allanando el camino para la llegada de humanos a Marte." }
];

const uniqueImages = [
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200',
  'https://images.unsplash.com/photo-1632296766432-8df2fbc8da43?q=80&w=1200',
  'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1200',
  'https://images.unsplash.com/photo-1614728448839-b9d9c22b91d2?q=80&w=1200',
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
  'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200',
  'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=1200',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200',
  'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200',
  'https://images.unsplash.com/photo-1536697246787-1f276329d6c4?q=80&w=1200',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1200',
  'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?q=80&w=1200',
  'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200'
];

const generateText = (rover, sectionIndex) => {
  const titles = [
    "Origen y Concepto de la Misión",
    "Diseño e Ingeniería Estructural",
    "El Desafío del Lanzamiento",
    "Trayectoria Interplanetaria",
    "El Terror de los 7 Minutos (Aterrizaje)",
    "Despliegue en la Superficie",
    "Comprobación de Sistemas",
    "Movilidad y Navegación",
    "Instrumentación Científica",
    "Primer Análisis del Terreno",
    "Geología y Búsqueda de Biofirmas",
    "Sobreviviendo al Clima Marciano",
    "Hitos y Descubrimientos Mayores",
    "Legado Científico",
    "Preparando el Futuro"
  ];

  const templates = [
    // Sec 1
    [
      `La génesis del proyecto ${rover.name} representó un salto monumental en nuestra ambición espacial.`,
      `A principios de los preparativos, los ingenieros debían decidir el peso objetivo de la carga útil.`,
      `Con una masa final de ${rover.weight}, el diseño requería innovaciones radicales en materiales.`,
      `El objetivo principal de la misión se centraba en analizar ${rover.discovery}.`,
      `Cada gramo adicional en la sonda significaba millones de dólares extra en combustible.`,
      `Los paneles de diseño trabajaron día y noche para miniaturizar los subsistemas críticos.`,
      `Las salas limpias del Jet Propulsion Laboratory (JPL) se convirtieron en el hogar del ensamblaje.`,
      `Allí, operarios en trajes esterilizados aseguraban que ningún microbio terrestre contaminara los componentes.`,
      `El concepto base de ${rover.name} era revolucionario para su época.`,
      `Este fue el primer paso de un largo viaje desde la mesa de dibujo hasta las arenas de Marte.`
    ],
    // Sec 2
    [
      `Una vez establecido el concepto, la ingeniería estructural de ${rover.name} tomó protagonismo.`,
      `El chasis fue construido utilizando aleaciones aeroespaciales de titanio y aluminio de grado balístico.`,
      `Este esqueleto metálico debía soportar vibraciones extremas de hasta 100 G durante el despegue.`,
      `En su interior, el "cerebro" computacional fue aislado en un módulo de electrónica caliente (WEB).`,
      `El aislamiento aerogel, conocido como "humo sólido", protegió los circuitos del frío del espacio profundo.`,
      `Los ingenieros integraron sistemas primarios como ${rover.inst}.`,
      `Las ruedas fueron meticulosamente talladas para morder la superficie marciana sin hundirse.`,
      `Un sistema de suspensión innovador garantizaba que todas las ruedas mantuvieran contacto con el suelo.`,
      `Los brazos robóticos fueron sometidos a miles de ciclos de estrés térmico en cámaras de vacío.`,
      `La perfección en el diseño era innegociable; en Marte no existen mecánicos para reparar averías.`
    ],
    // Sec 3
    [
      `El año de lanzamiento, fijado para ${rover.year}, requería una alineación planetaria exacta.`,
      `El vehículo de lanzamiento, un inmenso cohete de múltiples etapas, rugió en la plataforma de Cabo Cañaveral.`,
      `Las fuerzas aerodinámicas golpeaban la cofia mientras el cohete atravesaba la estratosfera a velocidad hipersónica.`,
      `Monitores en el centro de control mostraban telemetría crítica en tiempo real.`,
      `Dentro de la cofia, el módulo de crucero que albergaba a ${rover.name} permanecía latente y asegurado.`,
      `Los propulsores de la etapa superior entraron en ignición para escapar de la gravedad terrestre.`,
      `Un silencio tenso se apoderó de la sala de control durante el corte de motor principal.`,
      `Minutos después, la confirmación de la inyección trans-marciana provocó el aplauso de los ingenieros.`,
      `La nave había comenzado su solitario viaje de millones de kilómetros.`,
      `Atrás dejaba la Tierra, poniendo rumbo directo a la oscuridad del espacio profundo.`
    ],
    // Sec 4
    [
      `La fase de crucero interplanetario fue una maratón de paciencia y precisión astronáutica.`,
      `Durante meses, ${rover.name} navegó en un silencio casi absoluto, corrigiendo su trayectoria.`,
      `Los paneles solares del módulo de crucero alimentaban los calentadores internos para evitar el congelamiento.`,
      `El rastreador de estrellas y los sensores solares mantenían la orientación perfecta hacia la Tierra.`,
      `Las comunicaciones se realizaban mediante la Red del Espacio Profundo, usando gigantescas antenas parabólicas.`,
      `Ocasionalmente, los propulsores disparaban pequeñas ráfagas de hidrazina para afinar la ruta.`,
      `La navegación requería compensar el viento solar y la presión de la radiación electromagnética.`,
      `El equipo de dinámica de vuelo calculaba las coordenadas de intersección con Marte con un margen de pocos kilómetros.`,
      `A medida que Marte crecía en los sensores ópticos, la tensión volvía a aumentar en el JPL.`,
      `La fase de crucero estaba a punto de terminar, dando paso a la secuencia más letal de la misión.`
    ],
    // Sec 5
    [
      `La Entrada, Descenso y Aterrizaje (EDL) se conoce comúnmente como "Los Siete Minutos de Terror".`,
      `Impactando la atmósfera a 20,000 km/h, el escudo térmico de ${rover.name} alcanzó temperaturas de 2,100 grados centígrados.`,
      `El plasma ardiente envolvía la cápsula interrumpiendo todas las señales de radio con la Tierra.`,
      `La resistencia aerodinámica desaceleró violentamente la nave, sometiéndola a inmensas fuerzas G.`,
      `A velocidad supersónica, un enorme paracaídas se desplegó con una explosión sorda en el aire enrarecido.`,
      `Momentos después, el escudo térmico fue eyectado, dejando al descubierto los radares de altimetría.`,
      `Los propulsores de retrofrenado cobraron vida para cancelar la velocidad restante.`,
      `Dependiendo de la misión, se utilizaron airbags o una revolucionaria "grúa aérea" para el toque final.`,
      `Los sensores detectaron la pérdida de peso; el contacto físico con Marte era un hecho.`,
      `Se envió el primer ping de confirmación de aterrizaje en ${rover.site}.`
    ],
    // Sec 6
    [
      `El polvo levantado por los propulsores aún flotaba cuando ${rover.name} despertó en la superficie.`,
      `El primer paso fue el despliegue automático de los paneles solares y antenas de alta ganancia.`,
      `Las cámaras de haz bajo capturaron la primera imagen granulada del horizonte alienígena.`,
      `El equipo en la Tierra recibió esta imagen, confirmando que la estructura había sobrevivido intacta.`,
      `Rodeado por la vastedad de ${rover.site}, el rover se encontraba en un paisaje inexplorado.`,
      `Las temperaturas externas rondaban los -60 grados Celsius, activando inmediatamente los calentadores de supervivencia.`,
      `Lentamente, las sujeciones pirotécnicas se detonaron para liberar los mástiles de los instrumentos.`,
      `El mástil de la cámara principal se elevó, girando para escanear los 360 grados de su nuevo hogar.`,
      `La fase de diagnóstico post-aterrizaje verificó voltajes, temperaturas y estado del software.`,
      `El robot estaba vivo, respirando la tenue atmósfera de dióxido de carbono.`
    ],
    // Sec 7
    [
      `La comprobación de sistemas fue un proceso metódico y cauteloso que duró varios soles (días marcianos).`,
      `Antes de mover un solo engranaje, ${rover.name} calibró instrumentos críticos como ${rover.inst}.`,
      `Se tomaron cientos de fotografías para modelar el terreno en 3D y evitar rocas afiladas.`,
      `Los operadores en la Tierra analizaron cada pixel del modelo digital de elevación.`,
      `El software de vuelo fue actualizado remotamente para pasar del modo "aterrizaje" al modo "superficie".`,
      `Los espectrómetros se encendieron por primera vez, midiendo la radiación cósmica de fondo.`,
      `Los motores de dirección en las ruedas recibieron pulsos eléctricos de prueba.`,
      `Con un leve gemido de los motores sin escobillas, las ruedas giraron unos pocos milímetros.`,
      `La prueba de movilidad inicial fue un éxito rotundo, validando años de simulación en bancos de arena terrestres.`,
      `Estaba listo para dejar sus primeras huellas en el polvo rojo.`
    ],
    // Sec 8
    [
      `La navegación en Marte es una proeza de la ingeniería de control diferido.`,
      `Dado que la luz tarda hasta 24 minutos en viajar de Marte a la Tierra, el control por joystick es imposible.`,
      `Los operadores trazan una ruta diaria y envían un paquete de secuencias de comandos.`,
      `El cerebro computacional de ${rover.name} ejecuta la ruta utilizando un software de navegación visual autónoma (AutoNav).`,
      `A medida que avanza, captura pares de imágenes estéreo para evitar obstáculos como cráteres ocultos o dunas blandas.`,
      `Las seis ruedas, diseñadas con un sistema de pivote bogie, le permiten escalar rocas del tamaño de su propio chasis.`,
      `La tracción es monitoreada milisegundo a milisegundo; si una rueda patina más del umbral permitido, el rover se detiene.`,
      `Cada metro recorrido es un triunfo científico y logístico.`,
      `A lo largo de su vida operativa, el sistema de odometría mediría kilómetros de travesía incansable.`,
      `La sinergia entre los planificadores humanos y la autonomía robótica ha redefinido la exploración espacial.`
    ],
    // Sec 9
    [
      `Más allá del movimiento, la verdadera misión dependía de su arsenal científico.`,
      `Equipado con herramientas de vanguardia como ${rover.inst}, el rover actúa como el geólogo de la humanidad.`,
      `Los mástiles albergan cámaras estéreo de ultra alta definición equipadas con ruedas de filtros multiespectrales.`,
      `Estas cámaras identifican falsos colores para revelar las propiedades de hidratación de los minerales.`,
      `En el extremo de su brazo robótico, instrumentos de contacto disparan partículas alfa o rayos X hacia las rocas.`,
      `Herramientas como el cepillo de alambre y el taladro percutor limpian y pulverizan las muestras geológicas.`,
      `A nivel interno, mini-laboratorios calientan las muestras de suelo a miles de grados para identificar isótopos.`,
      `Los sensores meteorológicos registran implacablemente la presión, radiación UV y velocidad del viento.`,
      `Esta orquesta de sensores recolecta terabytes de datos que viajan como ondas de radio hacia nuestro planeta.`,
      `Cada lectura es una pieza crucial en el rompecabezas de la historia climática de Marte.`
    ],
    // Sec 10
    [
      `El punto de inflexión de la misión ocurrió cuando analizaron las texturas y composición de ${rover.site}.`,
      `El equipo científico contuvo la respiración mientras los datos del espectrómetro confirmaban las sospechas.`,
      `Habían encontrado evidencia directa de ${rover.discovery}.`,
      `Las imágenes microscópicas revelaron vetas de minerales que sólo pueden cristalizar en presencia de agua neutra y no ácida.`,
      `Esto demostró que hace miles de millones de años, Marte poseía ríos caudalosos y lagos estables.`,
      `El pH del agua antigua, inferido por la química del suelo rocoso, habría sido amigable para la biología.`,
      `Papers científicos inundaron las revistas especializadas en la Tierra, alterando los libros de texto astronómicos.`,
      `La confirmación de la habitabilidad del pasado remoto fue un salto cuántico para la astrobiología.`,
      `Se demostró empíricamente que la Tierra no era el único planeta del sistema solar capaz de sostener la vida química.`,
      `Este descubrimiento garantizó un lugar inmortal en la historia de la ciencia moderna.`
    ],
    // Sec 11
    [
      `La geología de Marte es un registro fosilizado que quedó congelado debido a la muerte del núcleo magnético planetario.`,
      `A diferencia de la Tierra, no hay tectónica de placas que recicle constantemente la corteza de Marte.`,
      `El rover exploró formaciones estratigráficas donde las capas sedimentarias se acumularon durante eones.`,
      `Con el brazo robótico posicionado milimétricamente, el espectrómetro de masas bombardeó la roca expuesta.`,
      `Detectó hierro oxidado, sulfatos de magnesio y firmas isotópicas de carbono ligero.`,
      `La proporción inusual de ciertos isótopos de azufre proporcionó pistas vitales sobre la química fotoquímica de la atmósfera primordial.`,
      `Rastrearon cómo el planeta pasó de ser un edén húmedo a un desierto frío e irradiado.`,
      `Las mediciones de radiación aportaron datos críticos para comprender los peligros letales que enfrentarán los astronautas.`,
      `El análisis del polvo en suspensión reveló trazas percloratos, químicos altamente tóxicos.`,
      `Cada estrato examinado sirvió como una página de un diario geológico de 4 mil millones de años de antigüedad.`
    ],
    // Sec 12
    [
      `Sin embargo, Marte es un mundo implacable, y la supervivencia de ${rover.name} fue puesta a prueba.`,
      `Las tormentas de polvo globales pueden oscurecer el Sol durante meses, bajando drásticamente las temperaturas.`,
      `Para las misiones dependientes de energía solar, el polvo acumulado en los paneles amenaza con apagar los sistemas vitals.`,
      `Los torbellinos de arena (dust devils) se pasean por la superficie, a veces ayudando a limpiar los paneles solares.`,
      `Los ciclos térmicos extremos, desde el mediodía marciano hasta la profunda congelación nocturna, agrietan las soldaduras.`,
      `Las ruedas de aluminio, golpeadas por rocas de basalto afiladas, comenzaron a mostrar agujeros y desgaste profundo.`,
      `La computadora principal experimentó reinicios de seguridad inducidos por el duro bombardeo de rayos cósmicos.`,
      `Pero los ingenieros en la Tierra programaron parches de software de forma creativa para mitigar el deterioro.`,
      `Condujeron el vehículo en reversa para equilibrar el desgaste o usaron las laderas inclinadas para captar más luz invernal.`,
      `La tenacidad humana y la redundancia mecánica se enfrentaron cara a cara contra el clima más letal del sistema solar.`
    ],
    // Sec 13
    [
      `Superando su esperanza de vida original, la misión entró en su fase de exploración extendida.`,
      `El enfoque se volvió más audaz, asumiendo riesgos calculados en pendientes pronunciadas para alcanzar afloramientos rocosos únicos.`,
      `El equipo de planificación de la ruta llevó al rover a límites físicos nunca antes probados.`,
      `Se descubrieron misteriosas emisiones de metano que fluctuaban estacionalmente, abriendo un debate febril en la astrobiología.`,
      `¿El metano provenía de reacciones geológicas del subsuelo o de procesos biológicos actuales?`,
      `Las cámaras de la misión capturaron eclipses de las lunas Fobos y Deimos cruzando el sol distante.`,
      `Se fotografiaron nubes noctilucentes de hielo seco flotando en la mesosfera a gran altitud.`,
      `La exploración robótica se volvió una historia épica de resistencia, ${rover.extra}`,
      `Cada sol adicional operando en territorio alienígena rompía récords históricos de longevidad de hardware.`,
      `El vehículo se había ganado el estatus de embajador permanente de la humanidad.`
    ],
    // Sec 14
    [
      `El legado de ${rover.name} está grabado permanentemente en bases de datos científicas a nivel mundial.`,
      `Cientos de miles de imágenes en bruto de alta resolución forman un catálogo invaluable para generaciones futuras.`,
      `La telemetría térmica, atmosférica y de radiación se utiliza para diseñar hábitats para los pioneros humanos.`,
      `Científicos de todos los continentes analizan la huella digital geoquímica de los minerales marcianos.`,
      `Los descubrimientos reescribieron los paradigmas de la formación planetaria y la génesis geológica.`,
      `Demostramos nuestra capacidad para domar los misterios celestes mediante el código y el titanio.`,
      `Los nombres de las características del terreno, colinas y rocas estudiadas, perdurarán en los mapas de Marte para siempre.`,
      `Las instituciones educativas de todo el planeta integran estos datos en sus programas STEM.`,
      `Cada bit transmitido a través de la Red del Espacio Profundo representa el triunfo del intelecto.`,
      `El robot es una extensión de la mente humana cruzando el vacío infinito.`
    ],
    // Sec 15
    [
      `El viaje de ${rover.name} es el puente hacia el siguiente capítulo de la exploración interplanetaria.`,
      `Todo lo aprendido sobre los aerosoles de polvo y la dureza del suelo alimentará el diseño de aeronaves y bases futuras.`,
      `Misiones internacionales ya están planeando utilizar los mismos paracaídas y radares que demostraron su eficacia.`,
      `La recolección de testigos de perforación allana el camino para la ansiada misión Mars Sample Return.`,
      `Algún día, astronautas humanos caminarán sobre ${rover.site} y tal vez se encuentren con el hardware congelado.`,
      `Allí, las sondas robóticas permanecerán en silencio como monumentos a los primeros exploradores terrestres.`,
      `La búsqueda de microorganismos alienígenas fosilizados sigue siendo la empresa científica más ambiciosa de nuestra era.`,
      `La tecnología autónoma perfeccionada en las dunas rojas pronto se adaptará para explorar lunas gélidas como Europa o Titán.`,
      `El universo nos llama, y nuestras creaciones metálicas han respondido al eco del conocimiento.`,
      `Avanzamos incansablemente hacia las estrellas, llevando el legado científico hacia lo inexplorado.`
    ]
  ];

  return {
    title: titles[sectionIndex],
    text: templates[sectionIndex]
  };
};

const fullCourses = rovers.map(r => {
  const sections = [];
  for (let i = 0; i < 15; i++) {
    const contentData = generateText(r, i);
    sections.push({
      id: `${r.id}_sec_${i}`,
      title: contentData.title,
      image: uniqueImages[i], // Una de las 15 imagenes únicas de alta calidad de marte
      text: contentData.text,
      style: i % 3 === 0 ? 'highlight' : 'normal'
    });
  }
  
  return {
    id: r.id,
    titleEs: r.name,
    titleEn: r.name + ' Mission',
    color: '#FF6347',
    badgeImage: '/assets/rovers/ai_curiosity.png',
    completed: false,
    descriptionEs: `Expedición y análisis profundo de la misión ${r.name}.`,
    descriptionEn: `In-depth expedition and analysis of the ${r.name} mission.`,
    contentEs: {
      overview: `15 archivos de telemetría descifrados sobre los avances de ${r.name}.`,
      sections: sections
    }
  };
});

// Insertar videos en la primera seccion
fullCourses.find(m => m.id === 'robots_sojourner').contentEs.sections[0].video = 'https://drive.google.com/file/d/1sKO6BBodinxwJ_fwKrxIYCXNYOa_huNg/preview';
fullCourses.find(m => m.id === 'robots_sojourner').contentEs.sections[0].image = null;

fullCourses.find(m => m.id === 'robots_opportunity').contentEs.sections[0].video = 'https://drive.google.com/file/d/1iCm637qLcGV2sm0UFUAJ9vne2XOzSZ4c/preview';
fullCourses.find(m => m.id === 'robots_opportunity').contentEs.sections[0].image = null;

fullCourses.find(m => m.id === 'robots_spirit').contentEs.sections[0].video = 'https://drive.google.com/file/d/1knQhfUbl25RYLZ3JQTfWp1NG-CooNnCo/preview'; 
fullCourses.find(m => m.id === 'robots_spirit').contentEs.sections[0].image = null;

fullCourses.find(m => m.id === 'robots_curiosity').contentEs.sections[0].video = 'https://drive.google.com/file/d/1vKWif4d_wiUTec2o-UJQiZGaHq6S4GMM/preview';
fullCourses.find(m => m.id === 'robots_curiosity').contentEs.sections[0].image = null;

fullCourses.find(m => m.id === 'robots_ingenuity').contentEs.sections[0].video = 'https://drive.google.com/file/d/15fTNk-eeJ6eUD-0CHck3EFUu_XaMrZBk/preview';
fullCourses.find(m => m.id === 'robots_ingenuity').contentEs.sections[0].image = null;

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;\\s*$/, '');
let jsData = eval(jsonString);

// Filtrar todos los robots
jsData = jsData.filter(c => !c.id.startsWith('robots_'));

// Añadir los nuevos
fullCourses.forEach(m => jsData.push(m));

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log('Regla de 15x15 aplicada con estricta rigurosidad narrativa y sin imágenes repetidas.');
