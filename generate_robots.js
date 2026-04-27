const fs = require('fs');

const paragraphs = {
  sec1: [
    "La exploración del Sistema Solar ha sido impulsada en gran medida por la robótica avanzada.",
    "A diferencia de las misiones tripuladas, los robots pueden soportar condiciones letales.",
    "Marte ha sido el objetivo principal de la exploración de superficie desde la década de 1970.",
    "Las primeras misiones exitosas fueron estacionarias, limitadas a estudiar su sitio de aterrizaje.",
    "Sin embargo, los científicos necesitaban movilidad para explorar diferentes regiones geológicas.",
    "Esto llevó al diseño de laboratorios móviles, conocidos mundialmente como rovers.",
    "Un rover es un vehículo de exploración espacial diseñado para moverse sobre la superficie.",
    "Estos vehículos están equipados con múltiples cámaras de navegación de alta resolución.",
    "También portan espectrómetros y brazos robóticos para analizar la composición de las rocas.",
    "La carrera por desarrollar rovers marcianos transformó nuestra comprensión astrobiológica."
  ],
  sec2: [
    "Aterrizar un robot en la superficie de Marte es uno de los mayores desafíos de ingeniería.",
    "El proceso es conocido como los 'siete minutos de terror' debido al retraso en las comunicaciones.",
    "La nave entra en la atmósfera marciana a más de veinte mil kilómetros por hora.",
    "Un escudo térmico protege al rover de las temperaturas extremas generadas por la fricción.",
    "A gran altitud, se despliegan paracaídas supersónicos masivos para reducir la velocidad.",
    "La atmósfera marciana es cien veces más delgada que la terrestre, dificultando el frenado.",
    "Por ello, los ingenieros han utilizado sistemas de bolsas de aire para amortiguar el impacto.",
    "En misiones más recientes, se implementó el revolucionario sistema 'Sky Crane' o grúa aérea.",
    "La grúa aérea utiliza retrocohetes para suspenderse en el aire y bajar al rover con cables.",
    "Una vez que el rover toca el suelo de forma segura, los cables se cortan automáticamente."
  ],
  sec3: [
    "Sojourner fue el primer rover de la NASA en recorrer exitosamente el suelo de Marte.",
    "Aterrizó el cuatro de julio de mil novecientos noventa y siete, como parte de la misión Pathfinder.",
    "Su nombre fue elegido en honor a Sojourner Truth, abolicionista y defensora de derechos.",
    "Era un vehículo extremadamente pequeño, con un peso de tan solo once kilogramos.",
    "A pesar de su tamaño, marcó un hito histórico al demostrar que la movilidad era posible.",
    "Su velocidad máxima era de apenas un centímetro por segundo, un ritmo muy cauteloso.",
    "Sojourner estaba equipado con un espectrómetro de rayos X para analizar las rocas marcianas.",
    "Su misión primaria estaba planeada para durar solamente siete días marcianos, conocidos como soles.",
    "Sin embargo, el pequeño explorador superó ampliamente las expectativas operando durante ochenta y tres días.",
    "Las imágenes enviadas por Sojourner revolucionaron el interés público en la exploración de Marte."
  ],
  sec4: [
    "Spirit, oficialmente designado como Mars Exploration Rover - A (MER-A), aterrizó en dos mil cuatro.",
    "Su objetivo principal era investigar la historia del agua líquida en el planeta rojo.",
    "Aterrizó en el cráter Gusev, que los científicos creían que pudo haber sido un antiguo lago.",
    "Spirit era significativamente más grande y pesado que su predecesor Sojourner.",
    "Pesaba aproximadamente ciento setenta y cuatro kilogramos y funcionaba con paneles solares.",
    "Su diseño incluía un mástil con cámaras panorámicas y un brazo robótico altamente articulado.",
    "Durante su travesía, descubrió evidencia mineralógica clara de la existencia pasada de agua.",
    "En dos mil nueve, el rover quedó irremediablemente atascado en un banco de arena suave.",
    "A pesar de estar inmóvil, continuó funcionando como una estación científica estática.",
    "Finalmente, en marzo de dos mil diez, la NASA perdió el contacto definitivo con Spirit."
  ],
  sec5: [
    "Un aspecto cultural fascinante de la misión MER fue la colaboración de la NASA con Warner Bros.",
    "El Laboratorio de Propulsión a Chorro (JPL) buscaba acercar la misión al público joven.",
    "En el año dos mil tres, se anunció una asociación educativa oficial centrada en los rovers.",
    "Los icónicos personajes de los Looney Tunes fueron elegidos como embajadores de la misión.",
    "El objetivo era generar entusiasmo en las escuelas primarias sobre la ciencia planetaria.",
    "Warner Bros diseñó emblemas exclusivos para los equipos de ingeniería que construían los robots.",
    "Estas ilustraciones se convirtieron en las mascotas oficiales de ambos rovers exploradores.",
    "Los emblemas fueron impresos e instalados físicamente en las cubiertas de las naves espaciales.",
    "Viajaron millones de kilómetros por el espacio profundo hasta llegar a la superficie marciana.",
    "Esta iniciativa demostró que la exploración espacial y la cultura popular pueden ser aliados poderosos."
  ],
  sec6: [
    "Para el rover Spirit (MER-A), la mascota oficial elegida fue el famoso Marvin el Marciano.",
    "El parche de misión oficial mostraba a Marvin saludando con un casco romano de gladiador.",
    "Debajo de él se leía el lema 'Red Planet Gladiators' (Gladiadores del Planeta Rojo).",
    "El parche incluía las insignias de NASA, Boeing, JPL y la Universidad de Cornell.",
    "Marvin, siendo un marciano de caricatura, era el representante perfecto para regresar a 'su hogar'.",
    "La ilustración se aplicó en las plataformas de lanzamiento y en el hardware de la misión.",
    "Millones de estudiantes siguieron el lanzamiento asociando la misión científica con el personaje.",
    "La imagen de Marvin aterrizando en el cráter Gusev se convirtió en un símbolo de triunfo.",
    "El equipo del JPL utilizó esta mascota en sus uniformes durante las operaciones críticas.",
    "Es un dato histórico oficial que Marvin el Marciano reposa actualmente en las llanuras de Marte."
  ],
  sec7: [
    "Opportunity (MER-B) fue el hermano gemelo de Spirit y aterrizó en Meridiani Planum.",
    "Llegó a Marte tres semanas después que Spirit, completando la ambiciosa misión dual.",
    "Su aterrizaje fue asombroso: rebotó con bolsas de aire y rodó hasta el fondo de un pequeño cráter.",
    "A los pocos días, descubrió esferas microscópicas de hematita, apodadas 'arándanos' marcianos.",
    "Estas esferas son una prueba irrefutable de que el agua subterránea fluyó por esa región.",
    "Diseñado para una misión de apenas noventa días, Opportunity superó cualquier expectativa técnica.",
    "Se mantuvo operativo explorando el terreno marciano durante más de catorce años ininterrumpidos.",
    "Durante su vida útil, el rover recorrió más de cuarenta y cinco kilómetros, rompiendo récords.",
    "Sobrevivió a brutales tormentas de polvo globales que bloquearon la luz solar por semanas.",
    "En dos mil dieciocho, una inmensa tormenta oscureció sus paneles, apagando al rover para siempre."
  ],
  sec8: [
    "El emblema oficial para el rover Opportunity estuvo protagonizado por el icónico Duck Dodgers.",
    "Duck Dodgers en el Siglo Veinticuatro y Medio es el alter ego heroico del Pato Lucas.",
    "En el parche de MER-B, Dodgers aparece plantando firmemente una bandera estadounidense.",
    "La insignia tiene forma de escudo y comparte el diseño base con el parche de Marvin el Marciano.",
    "Esta mascota representaba el espíritu audaz y exploratorio de la misión Opportunity.",
    "El logotipo fue bordado en las chaquetas de los controladores de vuelo y analistas de datos.",
    "Al igual que con Spirit, un parche oficial voló adherido al módulo de descenso de Opportunity.",
    "Durante catorce años, el emblema de Duck Dodgers sobrevivió a la intensa radiación marciana.",
    "La colaboración NASA-Looney Tunes fue considerada uno de los programas de alcance más exitosos.",
    "Inspiro a una nueva generación de ingenieros aeroespaciales a través de estos símbolos familiares."
  ],
  sec9: [
    "Curiosity (Mars Science Laboratory) representó una evolución masiva en la exploración robótica.",
    "Con un peso de novecientos kilogramos, tiene el tamaño aproximado de un automóvil compacto.",
    "Aterrizó en agosto de dos mil doce dentro del impresionante cráter Gale, utilizando la grúa aérea.",
    "A diferencia de los rovers anteriores, no depende de paneles solares para obtener su energía.",
    "Es propulsado por un generador termoeléctrico de radioisótopos (RTG) alimentado por plutonio.",
    "Esta batería nuclear le permite operar de noche y durante las densas tormentas de polvo globales.",
    "Curiosity cuenta con el laboratorio químico más avanzado jamás enviado a otro cuerpo celeste.",
    "Su láser, llamado ChemCam, puede vaporizar rocas a siete metros de distancia para analizarlas.",
    "El objetivo central de Curiosity es determinar si Marte alguna vez albergó ambientes habitables.",
    "El rover sigue escalando el Monte Sharp, leyendo la historia geológica de Marte en sus estratos."
  ],
  sec10: [
    "Los hallazgos de Curiosity han transformado drásticamente el paradigma científico sobre Marte.",
    "Poco después de su aterrizaje, descubrió un antiguo lecho de río con gravilla erosionada por agua.",
    "Posteriormente, perforó rocas sedimentarias y extrajo polvo para analizarlo en su horno interno.",
    "Los resultados confirmaron la presencia de elementos esenciales como carbono, hidrógeno y oxígeno.",
    "Curiosity demostró de forma concluyente que el cráter Gale fue un lago habitable hace miles de millones de años.",
    "Además, ha detectado múltiples picos inexplicables de gas metano en la atmósfera marciana.",
    "El metano es un compuesto que en la Tierra está fuertemente asociado con la actividad biológica.",
    "También ha descubierto complejas moléculas orgánicas conservadas dentro de formaciones rocosas.",
    "Aunque las moléculas orgánicas no son prueba de vida, son los bloques de construcción necesarios.",
    "Cada capa estratigráfica que analiza proporciona un nuevo capítulo sobre cómo Marte perdió su agua."
  ],
  sec11: [
    "Perseverance es el rover más reciente y tecnológicamente avanzado lanzado por la NASA.",
    "Aterrizó el dieciocho de febrero de dos mil veintiuno en el cráter Jezero.",
    "El cráter Jezero fue seleccionado porque conserva un antiguo y masivo delta fluvial.",
    "Este entorno es el lugar ideal para buscar biofirmas, es decir, signos de vida microbiana antigua.",
    "Mientras Curiosity buscaba habitabilidad, Perseverance tiene la misión directa de buscar vida.",
    "Físicamente es muy similar a Curiosity, utilizando el mismo chasis y sistema de energía nuclear.",
    "Sin embargo, Perseverance cuenta con instrumentos de análisis espectroscópico de última generación.",
    "Posee veintitrés cámaras, micrófonos para grabar los sonidos marcianos y un experimento llamado MOXIE.",
    "MOXIE logró con éxito extraer dióxido de carbono de la atmósfera y convertirlo en oxígeno puro.",
    "Esta tecnología es un paso crítico para futuras misiones tripuladas que necesitarán aire respirable."
  ],
  sec12: [
    "Una de las misiones más ambiciosas de Perseverance es la recolección activa de muestras físicas.",
    "El rover está equipado con un complejo taladro de percusión y un sistema de almacenamiento estéril.",
    "Perfora núcleos cilíndricos de roca en las áreas con mayor potencial biológico del cráter.",
    "Luego, encapsula estas preciosas muestras dentro de tubos de titanio herméticamente sellados.",
    "Estos tubos son el primer paso de la audaz campaña conjunta conocida como 'Mars Sample Return'.",
    "Perseverance ya ha depositado el primer depósito de tubos de titanio sobre la superficie marciana.",
    "En el futuro, una misión conjunta de NASA y la Agencia Espacial Europea viajará para recogerlos.",
    "Se lanzará un pequeño cohete desde Marte para poner las rocas en órbita y traerlas a la Tierra.",
    "Una vez en nuestro planeta, serán analizadas por los microscopios y laboratorios más avanzados.",
    "Estas muestras podrían proporcionar la evidencia final sobre si estamos solos en el universo."
  ],
  sec13: [
    "Junto con Perseverance, la NASA envió un experimento revolucionario llamado helicóptero Ingenuity.",
    "Ingenuity es un pequeño dron de menos de dos kilogramos de peso, compuesto de fibra de carbono.",
    "Su objetivo no era científico, sino una estricta demostración de tecnología aeroespacial pura.",
    "Volar en Marte es increíblemente difícil porque la densidad atmosférica es menos del uno por ciento.",
    "Para elevarse, sus rotores gemelos deben girar a más de dos mil quinientas revoluciones por minuto.",
    "El diecinueve de abril de dos mil veintiuno, Ingenuity hizo historia en la aeronáutica espacial.",
    "Logró el primer vuelo controlado y propulsado de una aeronave en la atmósfera de otro planeta.",
    "Diseñado para realizar solo cinco vuelos de prueba, superó enormemente sus límites estructurales.",
    "Llegó a completar asombrosamente más de setenta vuelos, actuando como explorador aéreo para Perseverance.",
    "Este éxito rotundo ha asegurado que las futuras misiones utilizarán drones para la exploración planetaria."
  ],
  sec14: [
    "La exploración de Marte no se detiene y las agencias espaciales preparan las próximas generaciones.",
    "Misiones internacionales como el rover Rosalind Franklin de la ESA están en fase de preparación.",
    "Estos futuros exploradores estarán equipados con taladros capaces de perforar a dos metros de profundidad.",
    "El objetivo es acceder a muestras de hielo y roca protegidas de la radiación ultravioleta letal.",
    "Además, los diseños de futuros rovers incluyen grados de autonomía mediante inteligencia artificial.",
    "Los robots del mañana podrán sortear obstáculos y seleccionar objetivos científicos sin intervención humana.",
    "La colaboración educativa sigue siendo vital, recordando iniciativas como la de Looney Tunes.",
    "Atraer a las nuevas mentes es tan crítico como desarrollar nuevos sistemas de propulsión interplanetaria.",
    "En última instancia, todos estos vehículos preparan el terreno para el objetivo supremo de la humanidad.",
    "Los rovers están allanando el camino para que, en las próximas décadas, los humanos pisen Marte."
  ],
  sec15: [
    "El legado de la exploración robótica en Marte es uno de los mayores triunfos de la ingeniería humana.",
    "Comenzando con los lentos pasos del humilde Sojourner en mil novecientos noventa y siete.",
    "Pasando por la épica resistencia de Spirit y Opportunity, que demostraron la tenacidad humana.",
    "Alcanzando la sofisticación científica de Curiosity y su análisis del Monte Sharp en el cráter Gale.",
    "Y culminando en la búsqueda activa de vida microscópica liderada por el poderoso Perseverance.",
    "Cada misión se ha basado en los conocimientos de su predecesora, iterando y mejorando la tecnología.",
    "Hemos descubierto que Marte fue un mundo azul, vibrante y rico en agua líquida en la antigüedad.",
    "Gracias a estos emisarios mecánicos, nuestra civilización ha podido extender sus sentidos al cosmos.",
    "Ellos actúan como nuestros ojos, nuestras manos y nuestra curiosidad en la superficie alienígena.",
    "La era robótica será recordada como el prólogo glorioso de la civilización interplanetaria humana."
  ]
};

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');
let jsData = eval(jsonString);

const moduleRobots = {
  id: 'robots_espacio',
  titleEs: 'Robots en el Espacio',
  titleEn: 'Robots in Space',
  color: '#FF6347',
  badgeImage: '/assets/robots_espacio_cover.png',
  completed: false,
  descriptionEs: 'Explora la historia técnica de los rovers marcianos: desde Sojourner hasta Perseverance, y la colaboración con Looney Tunes.',
  descriptionEn: 'Explore the technical history of Martian rovers: from Sojourner to Perseverance, and the Looney Tunes collaboration.',
  contentEs: {
    overview: 'Un viaje a través de las misiones robóticas que han transformado nuestro entendimiento del Planeta Rojo.',
    sections: [
      {
        id: 'robots_1',
        title: 'La Era de la Exploración Robótica',
        image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200',
        text: paragraphs.sec1,
        style: 'normal'
      },
      {
        id: 'robots_2',
        title: 'El Desafío de Aterrizar en Marte',
        image: 'https://images.unsplash.com/photo-1610296669228-602fa0e851d0?q=80&w=1200',
        text: paragraphs.sec2,
        style: 'normal'
      },
      {
        id: 'robots_3',
        title: 'Sojourner: El Pionero de los Rovers',
        video: 'https://drive.google.com/file/d/1sKO6BBodinxwJ_fwKrxIYCXNYOa_huNg/view?usp=drive_link',
        text: paragraphs.sec3,
        style: 'highlight'
      },
      {
        id: 'robots_4',
        title: 'Spirit (MER-A): El Geólogo Marciano',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200',
        text: paragraphs.sec4,
        style: 'normal'
      },
      {
        id: 'robots_5',
        title: 'La Colaboración NASA JPL y Looney Tunes',
        image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200',
        text: paragraphs.sec5,
        style: 'normal'
      },
      {
        id: 'robots_6',
        title: 'Marvin el Marciano y el parche de Spirit',
        image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200',
        text: paragraphs.sec6,
        style: 'normal'
      },
      {
        id: 'robots_7',
        title: 'Opportunity (MER-B): El Explorador Incansable',
        video: 'https://drive.google.com/file/d/1iCm637qLcGV2sm0UFUAJ9vne2XOzSZ4c/view?usp=drive_link',
        text: paragraphs.sec7,
        style: 'highlight'
      },
      {
        id: 'robots_8',
        title: 'Duck Dodgers y el parche de Opportunity',
        image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=1200',
        text: paragraphs.sec8,
        style: 'normal'
      },
      {
        id: 'robots_9',
        title: 'Curiosity: Laboratorio Nuclear Sobre Ruedas',
        video: 'https://drive.google.com/file/d/1vKWif4d_wiUTec2o-UJQiZGaHq6S4GMM/view?usp=drive_link',
        text: paragraphs.sec9,
        style: 'highlight'
      },
      {
        id: 'robots_10',
        title: 'Descubrimientos Orgánicos de Curiosity',
        image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1200',
        text: paragraphs.sec10,
        style: 'normal'
      },
      {
        id: 'robots_11',
        title: 'Perseverance: Buscando Vida Pasada',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200',
        text: paragraphs.sec11,
        style: 'normal'
      },
      {
        id: 'robots_12',
        title: 'El Sistema de Recolección de Muestras',
        image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200',
        text: paragraphs.sec12,
        style: 'normal'
      },
      {
        id: 'robots_13',
        title: 'Ingenuity: El Helicóptero Pionero',
        video: 'https://drive.google.com/file/d/15fTNk-eeJ6eUD-0CHck3EFUu_XaMrZBk/view?usp=drive_link',
        text: paragraphs.sec13,
        style: 'highlight'
      },
      {
        id: 'robots_14',
        title: 'Futuras Misiones Espaciales',
        video: 'https://drive.google.com/file/d/1knQhfUbl25RYLZ3JQTfWp1NG-CooNnCo/view?usp=drive_link',
        text: paragraphs.sec14,
        style: 'normal'
      },
      {
        id: 'robots_15',
        title: 'El Legado de las Misiones Marcianas',
        image: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1200',
        text: paragraphs.sec15,
        style: 'normal'
      }
    ]
  }
};

const index = jsData.findIndex(c => c.id === 'robots_espacio');
if (index >= 0) {
  jsData[index] = moduleRobots;
} else {
  jsData.push(moduleRobots);
}

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('Robots en el Espacio course injected successfully!');
