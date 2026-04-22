// Archivo maestro estático del curso
export const COURSE_DATA = [
  {
    "id": "sun",
    "order": 0,
    "titleEn": "The Sun",
    "titleEs": "El Sol",
    "badge": "Solar Pioneer",
    "badgeEs": "Pionero Estelar",
    "color": "#FFD700",
    "contentEs": {
      "sections": [
        {
          "title": "El Corazón del Sistema Solar",
          "text": "El Sol es la estrella central de nuestro sistema planetario, una enorme esfera de plasma caliente que concentra el 99.8% de toda la masa del sistema. Gracias a su gigantesca fuerza de gravedad, mantiene unidos desde los diminutos asteroides hasta los lejanos gigantes gaseosos.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000972/GSFC_20171208_Archive_e000972~small.jpg",
          "imgCaption": "Una gigante ardiente en la plenitud de su vida (Secuencia Principal)."
        },
        {
          "title": "Fusión Nuclear Incesante",
          "text": "En el núcleo solar, las temperaturas superan los 15 millones de grados Celsius bajo presiones aplastantes. En estas condiciones, los átomos de hidrógeno se fusionan formando helio, liberando inmensas cantidades de energía que viajan hacia la superficie y luego al espacio en forma de luz y calor, energía indispensable para sostener la vida en la Tierra.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000971/GSFC_20171208_Archive_e000971~small.jpg"
        },
        {
          "title": "Zonas de la Estrella",
          "text": "La estructura solar es profunda. Desde el núcleo, la energía radiactiva asciende por la inmensa Zona Radiativa durante cien mil años, hasta alcanzar la Zona Convectiva inferior, donde inmensos calderos de plasma suben y bajan ebullendo el calórico poder hasta llegar al borde visual o termoclima.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000974/GSFC_20171208_Archive_e000974~small.jpg",
          "imgCaption": "El laberinto termonuclear desde el corazón a la fotosfera incandescente."
        },
        {
          "title": "Atmósfera y Viento Solar",
          "text": "El exterior del Sol posee una gruesa capa magnética llamada Corona. De aquí se disparan constantemente corrientes de partículas cargadas conocidas como viento solar. A veces, la turbulencia magnética crea enormes erupciones (Fulguraciones y Eyecciones de Masa Coronal), arrojando tsunamis de plasma radiactivo que alcanzan y desafían los escudos magnéticos de los planetas colindantes.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000976/GSFC_20171208_Archive_e000976~small.jpg",
          "imgCaption": "Poderosas tormentas geomagnéticas vomitan millones de toneladas de plasma al espacio.",
          "style": "normal"
        },
        {
          "title": "El Destino del Viejo Rey",
          "text": "El Sol está catalogado como una estrella enana amarilla de unos 4,500 millones de años, es decir, se encuentra a la mitad de su vida. En miles de millones de años consumirá todo su hidrógeno, engrosándose hasta volverse una mortal Gigante Roja que terminará abrasando el sistema interior.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000973/GSFC_20171208_Archive_e000973~medium.jpg"
        },
        {
          "title": "Observando el Infierno Orbital",
          "text": "Naves modernas como la sonda Solar Parker Probe de la NASA logran hoy en día hitos impensables buceando literalmente dentro de los valles de la corona superior magnética, soportando picos de mil grados centígrados detrás de escudos térmicos macizos recabando la danza magnética solar en riguroso directo.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000977/GSFC_20171208_Archive_e000977~medium.jpg",
          "imgCaption": "La sonda Parker se sumerge rozando la corona solar sin derretirse."
        },
        {
          "title": "Las Capas del Sol",
          "text": "El Sol tiene capas como una cebolla gigante. En el centro está el núcleo, a 15 millones de grados, donde el hidrógeno se convierte en helio liberando energía. Luego viene la zona radiativa, donde la luz tarda ¡100,000 años en escapar! Después la zona de convección, donde el plasma caliente sube y baja como agua hirviendo. Finalmente la fotosfera, la capa visible, a 5,500°C.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000975/GSFC_20171208_Archive_e000975~medium.jpg",
          "imgCaption": "Diagrama de las capas internas del Sol: núcleo, zonas radiativa y de convección, fotosfera. Fuente: NASA"
        },
        {
          "title": "La Corona Solar y la Cromosfera",
          "text": "Sobre la fotosfera hay dos capas invisibles a simple vista. La cromosfera es una franja rojiza de 2,000 km de grosor visible solo durante eclipses totales. Encima está la corona, la atmósfera exterior del Sol, que alcanza temperaturas de hasta 2 millones de grados — mucho más caliente que la superficie. Los científicos de la NASA aún investigan por qué la corona es tan caliente.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000439/GSFC_20171208_Archive_e000439~small.jpg",
          "imgCaption": "Eyección de masa coronal del Sol captada por el Observatorio Solar SOHO de la NASA/ESA."
        },
        {
          "title": "Las Manchas Solares: Cicatrices Magnéticas",
          "text": "Las manchas solares son áreas oscuras en la fotosfera donde el campo magnético es tan intenso que impide que el calor suba desde abajo. Parecen oscuras porque están 'solo' a 3,700°C, más frías que el entorno de 5,500°C. Aparecen en ciclos de 11 años. En los períodos de máximo solar hay cientos de manchas; en el mínimo, casi ninguna.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8790824238331243",
          "imgCaption": "Imagen del Sol mostrando manchas solares activas sobre su fotosfera. Fuente: NASA/SDO"
        },
        {
          "title": "Las Eyecciones de Masa Coronal: Tormentas Solares",
          "text": "El Sol lanza enormes nubes de plasma y energía al espacio llamadas eyecciones de masa coronal (CME). Cuando una CME golpea la Tierra, puede causar apagones de energía eléctrica, interferencias en satélites y auroras boreales espectaculares en los polos. La CME más poderosa registrada fue el 'Evento Carrington' de 1859, que habría destruido nuestra red eléctrica actual.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3135322019902398",
          "imgCaption": "Eyección de masa coronal capturada por el satélite SOHO. Las CMEs pueden alcanzar la Tierra en 1-3 días. Fuente: NASA"
        },
        {
          "title": "La Sonda Parker: Tocando el Sol",
          "text": "La Sonda Solar Parker de la NASA, lanzada en 2018, es la nave espacial más rápida jamás construida: alcanza 690,000 km/h. Su misión es volar a través de la corona solar para estudiarla desde adentro. Está protegida por un escudo térmico especial que resiste 1,377°C. En 2021 se convirtió en la primera nave en 'tocar' el Sol al atravesar la corona.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.30546402906945147",
          "imgCaption": "Representación artística de la Sonda Solar Parker acercándose al Sol. Fuente: NASA/Johns Hopkins APL"
        },
        {
          "title": "La Fusión Nuclear: La Receta Energética del Sol",
          "text": "Cada segundo, el Sol convierte 600 millones de toneladas de hidrógeno en helio mediante fusión nuclear. En este proceso, una pequeña cantidad de masa se convierte en energía colosal (siguiendo E=mc² de Einstein). Esta energía viaja desde el núcleo hasta la superficie en forma de luz y calor. El Sol lleva 4,600 millones de años haciendo esto y tiene combustible para 5,000 millones de años más.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4109281856869931",
          "imgCaption": "El proceso de fusión nuclear en el núcleo solar transforma 4 millones de toneladas de masa en energía pura cada segundo. Fuente: NASA"
        },
        {
          "title": "Los Vientos Solares: El Aliento del Astro Rey",
          "text": "El Sol emite constantemente un flujo de partículas cargadas llamado viento solar. Viaja a entre 400 y 800 km/s y llena todo el Sistema Solar creando la heliosfera, una burbuja gigante de influencia solar. El viento solar es el responsable de que las colas de los cometas siempre apunten alejándose del Sol, sin importar la dirección en que viajan.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.17942977460821374",
          "imgCaption": "El viento solar fluye desde el Sol hacia los confines del Sistema Solar, creando la heliosfera. Fuente: NASA"
        },
        {
          "title": "El Futuro del Sol: La Gigante Roja",
          "text": "Dentro de unos 5,000 millones de años, el Sol agotará su hidrógeno y se expandirá hasta convertirse en una Gigante Roja. Su diámetro podría superar la órbita de Venus y posiblemente la de la Tierra. Luego expulsará sus capas externas formando una nebulosa planetaria y su núcleo quedará como una enana blanca. ¡No te preocupes: la humanidad tiene tiempo de sobra para planear!",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9785581521562241",
          "imgCaption": "En su fase final, el Sol se convertirá en una gigante roja antes de colapsar en una enana blanca. Fuente: NASA"
        },
        {
          "title": "Récords Solares: El Astro de los Extremos",
          "text": "El Sol guarda impresionantes récords: es 109 veces más ancho que la Tierra y contiene el 99.8% de toda la masa del Sistema Solar. Su núcleo alcanza 15 millones °C y su superficie 'solo' 5,500°C. La luz solar tarda 8 minutos y 20 segundos en llegar a la Tierra. El Sol también tiene su propio campo magnético, ¡que es 5,000 veces más fuerte que el de la Tierra en las manchas solares!",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6761897180540052",
          "imgCaption": "Comparativa de tamaños: la Tierra cabe 109 veces a lo largo del diámetro del Sol. Fuente: NASA"
        }
      ],
      "bibliography": [
        "NASA (2024). Sun Overview. NASA Solar System Exploration.",
        "Phillips, T. (2018). First Touch of the Sun. Science Mission Directorate."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué porcentaje de la masa total del sistema solar concentra el Sol?",
        "options": [
          "50%",
          "75%",
          "99.8%"
        ],
        "a": 2
      },
      {
        "q": "¿En qué etapa de su ciclo vital se encuentra el Sol actualmente?",
        "options": [
          "Secuencia Principal (Mitad de su vida)",
          "Estrella de Neutrones",
          "Gigante Roja"
        ],
        "a": 0
      },
      {
        "q": "¿Cómo se llama el flujo de partículas cargadas disparadas por el Sol?",
        "options": [
          "Niebla cósmica",
          "Viento Solar",
          "Radiación residual"
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de El Sol (El Corazón del Sistema Solar)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Fusión Nuclear Incesante', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'El Sol', �qu� funci�n cumple la fase de 'Zonas de la Estrella'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Atmósfera y Viento Solar'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de El Sol",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Destino del Viejo Rey', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'El Sol' ocurre en 'Observando el Infierno Orbital'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Corazón del Sistema Solar'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'El Sol', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Observando el Infierno Orbital', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "mercury",
    "order": 1,
    "titleEn": "Mercury",
    "titleEs": "Mercurio",
    "badge": "Speed Demon",
    "badgeEs": "Demonio Veloz",
    "color": "#8C8C8C",
    "contentEs": {
      "sections": [
        {
          "title": "Visión General y Composición",
          "text": "Mercurio es el planeta más pequeño de nuestro sistema solar y el más cercano al Sol. Apenas un poco más grande que la Luna de la Tierra, es un mundo terrestre rocoso con un núcleo de hierro masivo que constituye aproximadamente el 85% del radio del planeta. Su superficie está cicatrizada por miles de cráteres de impacto debido a que no posee una atmósfera densa que frene a los meteoritos.",
          "image": "https://images-assets.nasa.gov/image/PIA13477/PIA13477~medium.jpg",
          "imgCaption": "Representación del planeta rocoso. Las temperaturas diurnas y nocturnas son extremas."
        },
        {
          "title": "Temperaturas Extremas sin Atmósfera",
          "text": "Podrías pensar que Mercurio es el planeta más caliente debido a su proximidad al Sol, pero no lo es (ese récord le pertenece a Venus). Debido a que Mercurio carece de una atmósfera significativa para retener el calor, sus temperaturas superficiales fluctúan extremadamente: desde 430°C (800°F) durante el día, hasta -180°C (-290°F) al llegar la noche. Esta amplitud térmica es la más grande del sistema solar.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001918/GSFC_20171208_Archive_e001918~small.jpg",
          "imgCaption": "El vacío del espacio no retiene la radiación calórica, provocando congelamiento nocturno en una de sus caras."
        },
        {
          "title": "Exploración Orbital: MESSENGER",
          "text": "Dada su cercanía con el Sol, explorar Mercurio es un enorme desafío gravitacional e ingenieril. La sonda Mariner 10 de la NASA fue la primera en visitarlo en 1974, pero fue la misión MESSENGER (2004-2015) la que orbitó exhaustivamente el planeta, revelando presencia de hielo de agua en los cráteres profundos de sus polos, donde la luz solar directa nunca llega.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000797/GSFC_20171208_Archive_e000797~small.jpg"
        },
        {
          "title": "Danza Orbital y Resonancia",
          "text": "La órbita de Mercurio es altamente elíptica, la más excéntrica de todo el sistema solar. Presenta una resonancia de espín-órbita única de 3:2, lo que significa que por cada dos órbitas que completa alrededor del Sol, gira exactamente tres veces sobre su propio eje. Si estuvieras de pie en la superficie correcta, verías el Sol salir, detenerse en el cielo, retroceder y volver a avanzar hacia el ocaso.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001625/GSFC_20171208_Archive_e001625~small.jpg",
          "imgCaption": "El Sol aparenta detenerse y retroceder en el negro cielo de Mercurio debido a su resonancia 3:2.",
          "style": "normal"
        },
        {
          "title": "Ausencia de Estaciones y Magnetismo",
          "text": "Debido a que el eje de rotación de Mercurio tiene una inclinación de apenas 2 grados, carece de verdaderas estaciones (primavera, verano, otoño, invierno) como las experimentamos nosotros. Misteriosamente, a pesar de su tamaño recesivo, Mercurio genera un campo magnético global activo, una rareza astronómica para cuerpos de roca sólida.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001545/GSFC_20171208_Archive_e001545~orig.png"
        },
        {
          "title": "El Futuro: BepiColombo",
          "text": "Actualmente, la sonda BepiColombo (una misión inter-agencia liderada por la Agencia Espacial Europea ESA y la JAXA japonesa) está volando en trayectorias espirales complejas y llegará a establecerse en la órbita de Mercurio en 2025. Los científicos confían en que sus sofisticados láseres barrerán la superficie resolviendo las formaciones huecas llamadas 'hollows'.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001365/GSFC_20171208_Archive_e001365~small.jpg",
          "imgCaption": "El orbitador fotorealista barre la topografía en busca de hielo en los cráteres oscuros."
        },
        {
          "title": "El Interior Metálico de Mercurio",
          "text": "Mercurio tiene un núcleo de hierro sólido y líquido enormemente grande para su tamaño, abarcando el 85% de su radio total. Esto lo hace el planeta con el mayor porcentaje de metal en el Sistema Solar. Los científicos creen que Mercurio sufrió un impacto colosal en su historia temprana que le arrancó la mayor parte de su manto rocoso, dejando expuesto ese enorme núcleo metálico.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001544/GSFC_20171208_Archive_e001544~small.jpg",
          "imgCaption": "La estructura interna de Mercurio muestra un núcleo de hierro desproporcionadamente grande. Fuente: NASA/MESSENGER"
        },
        {
          "title": "El Campo Magnético de Mercurio",
          "text": "A pesar de su pequeño tamaño, Mercurio tiene un campo magnético activo, aunque 100 veces más débil que el de la Tierra. Este campo protege al planeta parcialmente de los vientos solares, pero al ser tan débil, el plasma solar llega constantemente a la superficie. La sonda MESSENGER descubrió que este campo magnético está desplazado hacia el norte, lo que intriga a los científicos.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001425/GSFC_20171208_Archive_e001425~medium.jpg",
          "imgCaption": "El campo magnético de Mercurio, débil pero real, fue detectado por primera vez por la sonda Mariner 10. Fuente: NASA"
        },
        {
          "title": "Mercurio Viaja Solo: Sin Lunas",
          "text": "A diferencia de la Tierra con la Luna, Marte con dos lunas o Júpiter con 95, Mercurio no tiene ningún satélite natural. La gravedad del Sol es tan dominante en esa región del Sistema Solar que cualquier luna que Mercurio pudiera haber tenido habría sido atraída por el Sol o expulsada al espacio. También carece de anillos.",
          "image": "https://images-assets.nasa.gov/image/PIA12045/PIA12045~small.jpg",
          "imgCaption": "Mercurio, el planeta más cercano al Sol, orbita solo sin ninguna luna ni anillos. Fuente: NASA/MESSENGER"
        },
        {
          "title": "La Sonda MESSENGER: Revelando Mercurio",
          "text": "La nave MESSENGER de la NASA orbitó Mercurio durante 4 años (2011-2015). Tomó más de 270,000 fotos y mapeó el 100% de su superficie. Sus descubrimientos fueron asombrosos: encontró agua helada en cráteres permanentemente a la sombra en los polos norte y sur, y confirmó el enorme núcleo metálico. Al agotar su combustible, MESSENGER impactó Mercurio creando un cráter de 16 metros.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001919/GSFC_20171208_Archive_e001919~medium.jpg",
          "imgCaption": "La sonda MESSENGER de NASA orbitó Mercurio durante 4 años y transmitió más de 270,000 fotografías. Fuente: NASA"
        },
        {
          "title": "Los Cráteres: Cicatrices del Sistema Solar",
          "text": "La superficie de Mercurio está cubierta de cráteres de impacto, similar a la Luna. El más grande es la Cuenca Caloris, con 1,550 km de diámetro, formada por un impacto colosal hace unos 3,900 millones de años. Como Mercurio no tiene atmósfera ni clima que erosione los cráteres, estas cicatrices permanecen perfectamente conservadas por miles de millones de años.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001693/GSFC_20171208_Archive_e001693~small.jpg",
          "imgCaption": "La superficie de Mercurio está densamente cubierta de cráteres, preservados por la ausencia de atmósfera. Fuente: NASA/MESSENGER"
        },
        {
          "title": "Hielo en el Planeta de Fuego",
          "text": "Aunque Mercurio alcanza 430°C en su lado iluminado, sus polos esconden un secreto sorprendente: ¡hay agua helada! Los cráteres polares están permanentemente a la sombra del Sol y sus temperaturas bajan a -180°C. La sonda MESSENGER confirmó depósitos de hielo mezclados con compuestos orgánicos oscuros. Este hielo pudo llegar por cometas y asteroides que impactaron el planeta.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001809/GSFC_20171208_Archive_e001809~small.jpg",
          "imgCaption": "Imagen de radar del polo norte de Mercurio mostrando zonas brillantes de hielo agua en cráteres sombreados. Fuente: NASA/MESSENGER"
        },
        {
          "title": "La Resonancia Orbital: El Día Más Largo",
          "text": "Mercurio tiene una peculiaridad asombrosa: un día en Mercurio (176 días terrestres) es más largo que su año (88 días terrestres). Esto ocurre porque Mercurio está en resonancia orbital 3:2 con el Sol: da 3 vueltas sobre sí mismo por cada 2 órbitas alrededor del Sol. Desde la superficie de Mercurio, el Sol aparece detenerse, moverse al revés y luego continuar.",
          "image": "https://images-assets.nasa.gov/image/PIA12842/PIA12842~small.jpg",
          "imgCaption": "Mercurio completa dos órbitas alrededor del Sol por cada tres rotaciones sobre su propio eje. Fuente: NASA"
        },
        {
          "title": "BepiColombo: La Misión Europea a Mercurio",
          "text": "La Agencia Espacial Europea (ESA) y la Agencia Espacial Japonesa (JAXA) lanzaron juntas la misión BepiColombo en 2018. La nave llegará a Mercurio en 2025 y estudiará su campo magnético, su núcleo y su superficie con instrumentos mucho más avanzados que MESSENGER. BepiColombo tiene dos orbitadores: el MPO europeo y el Mio japonés, que trabajarán juntos.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001834/GSFC_20171208_Archive_e001834~small.jpg",
          "imgCaption": "Representación artística de la misión BepiColombo de ESA/JAXA aproximándose a Mercurio en 2025. Fuente: ESA"
        },
        {
          "title": "Mercurio en la Historia: El Planeta Veloz",
          "text": "Mercurio fue conocido por las civilizaciones antiguas que lo observaban a simple vista al amanecer y al atardecer. Los griegos lo llamaban Hermes (el mensajero de los dioses) y los romanos lo nombraron Mercurio por su velocidad orbital: ¡viaja a 47 km/s, el más rápido del Sistema Solar! No fue explorado por una nave espacial hasta 1974, cuando el Mariner 10 hizo el primer sobrevuelo.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001914/GSFC_20171208_Archive_e001914~small.jpg",
          "imgCaption": "Mercurio visto desde la Tierra en tránsito frente al Sol, un evento visible solo unas pocas veces por siglo. Fuente: NASA"
        }
      ],
      "bibliography": [
        "NASA (2024). Mercury Overview. NASA Solar System Exploration. Recuperado de science.nasa.gov",
        "Dunford, B. (2021). The MESSENGER Mission. Johns Hopkins Applied Physics Laboratory.",
        "Cartwright, R. (2019). Planetary Sciences: Inner Solar System Geophysics. Cambridge University Press."
      ]
    },
    "quizEs": [
      {
        "q": "¿Es Mercurio el planeta más caliente de todo el sistema solar?",
        "options": [
          "Sí",
          "No"
        ],
        "a": 1
      },
      {
        "q": "¿Qué porcentaje aproximado del radio de Mercurio corresponde a su gigantesco núcleo de hierro?",
        "options": [
          "20%",
          "50%",
          "85%"
        ],
        "a": 2
      },
      {
        "q": "¿Cómo subsiste hielo de agua en Mercurio si está tan cerca del Sol?",
        "options": [
          "En cráteres polares donde no da el Sol",
          "Dentro del núcleo",
          "En las nubes de su atmósfera"
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Mercurio (Visión General y Composición)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Temperaturas Extremas sin Atmósfera', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Mercurio', �qu� funci�n cumple la fase de 'Exploración Orbital: MESSENGER'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Danza Orbital y Resonancia'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Mercurio",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Ausencia de Estaciones y Magnetismo', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Mercurio' ocurre en 'El Futuro: BepiColombo'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Visión General y Composición'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Mercurio', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Futuro: BepiColombo', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "venus",
    "order": 2,
    "titleEn": "Venus",
    "titleEs": "Venus",
    "badge": "Volcano Voyager",
    "badgeEs": "Viajero Volcánico",
    "color": "#E1A95F",
    "contentEs": {
      "sections": [
        {
          "title": "El Infierno Atmosférico",
          "text": "Venus es el segundo planeta desde el Sol y es el vecino planetario más cercano a la Tierra. A pesar de ser similar en estructura y tamaño a la Tierra, Venus es un mundo tóxico con un efecto invernadero descontrolado. Su atmósfera espesa de dióxido de carbono atrapa el calor en su superficie de manera implacable, alcanzando los 475°C (900°F), suficiente para derretir plomo.",
          "image": "https://images-assets.nasa.gov/image/PIA00256/PIA00256~medium.jpg",
          "imgCaption": "Venus está permanentemente envuelto en nubes súper densas de ácido sulfúrico."
        },
        {
          "title": "Rotación Retrógrada Lenta",
          "text": "Venus rota increíblemente lento sobre su eje y además lo hace en dirección opuesta a la mayoría de los planetas (rotación retrógrada). ¡Un día en Venus (el tiempo que tarda en girar una vez sobre su eje) dura 243 días terrestres! Sin embargo, un año en Venus (orbita alrededor del Sol) dura solo 225 días terrestres. Esto significa que un día venuziano es más largo que su propio año.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA00255/PIA00255~medium.jpg"
        },
        {
          "title": "Topografía Volcánica",
          "text": "Observaciones mediante radar, como las de la sonda espacial Magallanes, han revelado un planeta dominado por llanuras volcánicas, gigantescas montañas, y miles de escudos volcánicos que se sospecha aún podrían estar activos. Su presión superficial aplastante es unas 90 veces más poderosa que la de la Tierra, comparable a estar a 1 km bajo el nivel del mar.",
          "image": "https://images-assets.nasa.gov/image/PIA10124/PIA10124~small.jpg",
          "imgCaption": "Paisaje volcánico inhóspito bajo las densas nubes de ácido sulfúrico venusiano."
        },
        {
          "title": "Misiones Soviéticas Venera",
          "text": "Durante la Guerra Fría, mientras la carrera espacial miraba a la Luna, la extinta Unión Soviética logró la heroica y poco conocida tarea de aterrizar sobre Venus con el programa Venera. Las sondas espaciales soportaron la abrumadora presión de 90 atmósferas y los ácidos letales, enviando de vuelta las únicas fotografías físicas reales de la costra de lava dorada antes de fundirse a los pocos minutos de operación.",
          "image": "https://images-assets.nasa.gov/image/PIA09378/PIA09378~medium.jpg",
          "imgCaption": "La heroica y letal travesía de las sondas soviéticas hacia el infierno aplastante.",
          "style": "normal"
        },
        {
          "title": "Efecto Invernadero como Advertencia Climática",
          "text": "Venus es ampliamente estudiado como un laboratorio astrofísico en la vida real sobre cómo un planeta puede volverse inhóspito si el clima colapsa. Su atmósfera densa es principalmente Dióxido de Carbono atrapando radiación letal sin posibilidades de refracción, una advertencia contundente del cambio climático extremo.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA25838/PIA25838~medium.jpg"
        },
        {
          "title": "Posibilidad de Vida en las Nubes",
          "text": "Recurriendo a las capas altas de su atmósfera, las temperaturas venusianas se tornan inesperadamente agradables y la presión disminuye, casi como el aire de nuestro planeta terrestre. En la misma década reciente investigadores detectaron trazas de gases orgánicos en las colosales nubes reavivando un audaz debate astrobiológico.",
          "image": "https://images-assets.nasa.gov/image/0301101/0301101~medium.jpg",
          "imgCaption": "Existen bacterias extremófilas que podrían subsistir en los estratos sulfúricos superiores."
        },
        {
          "title": "El Interior de Venus: Un Mundo de Roca",
          "text": "Venus tiene un interior similar al de la Tierra: un núcleo de hierro, un manto rocoso y una corteza. Sin embargo, a diferencia de la Tierra, Venus no tiene placas tectónicas activas que reciclen la corteza. Esto significa que el calor interno se acumula hasta provocar erupciones volcánicas masivas que renuevan la superficie cada 500 millones de años aproximadamente.",
          "image": "https://images-assets.nasa.gov/image/S91-50688/S91-50688~medium.jpg",
          "imgCaption": "Volcanes activos en Venus detectados por la sonda Magellan y confirmados por la misión Venus Express. Fuente: NASA/ESA"
        },
        {
          "title": "Sin Campo Magnético: Venus Desprotegido",
          "text": "Venus no tiene un campo magnético significativo, lo que lo deja expuesto al bombardeo del viento solar. Los científicos creen que esto ocurre porque Venus rota muy lentamente (un día venusiano dura 243 días terrestres), lo que impide generar el efecto dinamo en su núcleo. Sin escudo magnético, el viento solar erosiona la atmósfera superior de Venus continuamente.",
          "image": "https://images-assets.nasa.gov/image/PIA18175/PIA18175~medium.jpg",
          "imgCaption": "Sin campo magnético, Venus pierde continuamente su atmósfera superior por efecto del viento solar. Fuente: ESA/Venus Express"
        },
        {
          "title": "La Rotación Retrógrada: El Sol Nace por el Oeste",
          "text": "Venus hace algo extraordinario: ¡gira al revés! Si pudieras pararte en Venus y ver el Sol (imposible por las nubes), saldría por el oeste y se pondría por el este. Esto se llama rotación retrógrada. Además rota extremadamente despacio: un día en Venus dura más que un año venusiano. Las razones exactas de esta peculiaridad aún son debatidas por los astrónomos.",
          "image": "https://images-assets.nasa.gov/image/GRC-2019-C-09958/GRC-2019-C-09958~medium.jpg",
          "imgCaption": "Venus rota en sentido contrario a la mayoría de planetas, haciendo que el Sol salga por el oeste en su superficie. Fuente: NASA"
        },
        {
          "title": "El Efecto Invernadero Extremo",
          "text": "La atmósfera de Venus es 96% dióxido de carbono, creando el efecto invernadero más extremo del Sistema Solar. La superficie alcanza 465°C, suficiente para derretir plomo. Esta temperatura es más alta que la de Mercurio, pese a estar más lejos del Sol. Venus es el planeta más caliente del Sistema Solar. La ESA señala que Venus es un ejemplo extremo de lo que el cambio climático podría hacer a la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA25839/PIA25839~medium.jpg",
          "imgCaption": "Las espesas nubes de ácido sulfúrico de Venus atrapan el calor creando el efecto invernadero más severo del Sistema Solar. Fuente: ESA"
        },
        {
          "title": "Las Sondas Venera: Sobrevivir el Infierno",
          "text": "La Unión Soviética logró la hazaña de aterrizar en Venus con las sondas Venera entre 1970 y 1984. Las naves sobrevivían solo entre 23 minutos y 2 horas antes de ser aplastadas y fundidas por la presión de 90 atmósferas y 465°C. La Venera 13 envió las primeras fotografías en color de la superficie. Es el ambiente más hostil que una nave humana ha sobrevivido.",
          "image": "https://images-assets.nasa.gov/image/PIA25835/PIA25835~medium.jpg",
          "imgCaption": "Las sondas soviéticas Venera sobrevivieron poco tiempo pero enviaron imágenes invaluables de la superficie venusiana. Fuente: NASA/NSSDC"
        },
        {
          "title": "Los Volcanes de Venus: Un Mundo Volcánico Activo",
          "text": "Venus tiene más volcanes que cualquier otro planeta del Sistema Solar: más de 1,600 volcanes mayores y miles de menores. En 2023, científicos analizando imágenes antiguas de la sonda Magellan de NASA confirmaron erupciones volcánicas activas. El volcán Maat Mons, de 8 km de altura, mostró cambios en su forma entre 1991 y 1992, evidencia de actividad reciente.",
          "image": "https://images-assets.nasa.gov/image/PIA23791/PIA23791~small.jpg",
          "imgCaption": "El volcán Maat Mons de 8 km de altura, uno de los cientos de volcanes activos de Venus. Fuente: NASA/JPL/Magellan"
        },
        {
          "title": "Las Nubes de Ácido Sulfúrico",
          "text": "Las nubes que cubren completamente Venus no son de agua como en la Tierra: son de ácido sulfúrico concentrado. Se extienden entre 45 y 70 km de altura, reflejan el 70% de la luz solar (por eso Venus brilla tanto en el cielo) y son tan densas que desde la superficie reina una luz anaranjada tenue similar a un día nublado. En las nubes la temperatura es de apenas -40°C.",
          "image": "https://images-assets.nasa.gov/image/PIA25833/PIA25833~medium.jpg",
          "imgCaption": "Las densas nubes de ácido sulfúrico de Venus, fotografiadas en ultravioleta por la sonda Venus Express de ESA. Fuente: ESA"
        },
        {
          "title": "La Misión DAVINCI y EnVision: Regreso a Venus",
          "text": "La NASA y la ESA tienen misiones gemelas planeadas para Venus en la década de 2030. DAVINCI+ de NASA descenderá a través de la atmósfera midiendo su composición exacta y fotografiando el terreno. EnVision de ESA orbitará Venus durante años mapeando su geología con radar. Juntas, estas misiones resolverán preguntas clave: ¿alguna vez Venus tuvo océanos? ¿Podría haber vida en sus nubes?",
          "image": "https://images-assets.nasa.gov/image/PIA25832/PIA25832~medium.jpg",
          "imgCaption": "Representación artística de la futura misión DAVINCI+ de NASA descendiendo a través de la atmósfera de Venus. Fuente: NASA"
        },
        {
          "title": "Venus y la Tierra: Gemelos Diferentes",
          "text": "Venus y la Tierra son llamados 'gemelos planetarios' porque tienen tamaño, masa y composición similares. Sin embargo, son mundos completamente opuestos: la Tierra tiene agua líquida, temperatura media de 15°C y vida abundante. Venus tiene 465°C, ácido sulfúrico y presión aplastante. Estudiar por qué evolucionaron tan diferente ayuda a los científicos a entender qué hace habitable a nuestro planeta.",
          "image": "https://images-assets.nasa.gov/image/KSC-04pd1631/KSC-04pd1631~medium.jpg",
          "imgCaption": "Venus y la Tierra son casi del mismo tamaño pero con condiciones completamente opuestas. Fuente: NASA"
        }
      ],
      "bibliography": [
        "NASA (2024). Venus Overview. NASA Solar System Exploration.",
        "Smrekar, S. E., et al. (2010). Recent hotspot volcanism on Venus from VIRTIS emissivity data. Science, 328(5978), 605-608.",
        "Esposito, L. W. (2006). Planetary Data System: Venus Atmosphere. Space Science Reviews."
      ]
    },
    "quizEs": [
      {
        "q": "¿Por qué Venus es aún más caliente que Mercurio?",
        "options": [
          "Está más cerca del sol",
          "Efecto invernadero masivo por CO2",
          "Su núcleo de lava está expuesto"
        ],
        "a": 1
      },
      {
        "q": "¿En qué dirección rota Venus sobre sí mismo?",
        "options": [
          "Igual que la Tierra",
          "Retrógrada (hacia atrás)",
          "No rota"
        ],
        "a": 1
      },
      {
        "q": "¿Cuánto dura un día en Venus en comparación con su año?",
        "options": [
          "El día es más largo que el año",
          "El año es más largo",
          "Duran exactamente lo mismo"
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Venus (El Infierno Atmosférico)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Rotación Retrógrada Lenta', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Venus', �qu� funci�n cumple la fase de 'Topografía Volcánica'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Misiones Soviéticas Venera'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Venus",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Efecto Invernadero como Advertencia Climática', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Venus' ocurre en 'Posibilidad de Vida en las Nubes'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Infierno Atmosférico'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Venus', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Posibilidad de Vida en las Nubes', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "earth",
    "order": 3,
    "titleEn": "Earth",
    "titleEs": "Tierra",
    "badge": "Home Hero",
    "badgeEs": "Héroe del Hogar",
    "color": "#2A82D7",
    "contentEs": {
      "sections": [
        {
          "title": "El Oasis Azul",
          "text": "Nuestro planeta hogar es el tercer planeta desde el Sol y, hasta donde sabemos empíricamente, el único puerto seguro para la vida en el vasto cosmos. Se caracteriza por ser un sistema dinámico y equilibrado donde interactúan hidrósfera, litosfera, atmósfera y biosfera de forma sinérgica.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001871/GSFC_20171208_Archive_e001871~medium.jpg",
          "imgCaption": "La Tierra, un majestuoso canica azul dominada por océanos líquidos."
        },
        {
          "title": "Un Equilibrio Químico Perfecto",
          "text": "La atmósfera terrestre está compuesta por un 78% de nitrógeno y un 21% de oxígeno, complementada por trazas de vapor de agua y dióxido de carbono. Esta cubierta gaseosa es fundamental: nos protege de meteoritos, filtra la peligrosa letalidad de la radiación ultravioleta del Sol, y orquesta el clima global.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/sts056-90-0034/sts056-90-0034~medium.jpg"
        },
        {
          "title": "Tectónica de Placas",
          "text": "La Tierra es el único planeta conocido con tectónica de placas activa. La corteza rígida se divide en losas que flotan e interactúan sobre el manto parcialmente fundido. El movimiento de estas placas moldea montañas, desencadena terremotos y renueva constantemente la superficie, ciclo vital crucial para la regulación a largo plazo del carbono y la temperatura del planeta.",
          "image": "https://images-assets.nasa.gov/image/sts056-92-0028/sts056-92-0028~medium.jpg",
          "imgCaption": "Flujos de magma incandescente impulsan el movimiento tectónico creando nuevas formaciones geológicas."
        },
        {
          "title": "Agua en los Tres Estados Vitales",
          "text": "Una peculiaridad biológicamente milagrosa de la Tierra es que se ubica exactamente en la 'Zona Ricitos de Oro', permitiendo no solo albergar agua, sino hacerlo coexistir de forma perpetua en sus tres estados fundamentales físicos: sólidos glaciares en los polos árticos criogénicos, inmensos mares líquidos que abarcan el monumental 71% del globo e invisibles nubes de vapor acuoso entrelazando la troposfera meteorológica.",
          "image": "https://images-assets.nasa.gov/image/s08-49-1722/s08-49-1722~medium.jpg",
          "imgCaption": "La sincronía perfecta de los estados acuosos es el motor único geofísico.",
          "style": "normal"
        },
        {
          "title": "El Escudo Magnético y las Auroras",
          "text": "El gigantesco núcleo fundido rico en metales que rota intensamente casi como un dínamo geológico bajo nuestros pies oscuros, otorga un paraguas invisible infranqueable: la Magnetósfera. Más allá de orientar nuestras agujas de navegación náutica apuntando eternamente de norte a sur, esta armadura elástica absorbe físicamente la descarga cósmica. Cuando los haces eléctricos solares rebotan contra este anillo e inyectan energía directa a los polos opuestos, vemos brillar ilusoriamente Auroras Boreales.",
          "image": "https://images-assets.nasa.gov/image/PIA22653/PIA22653~medium.jpg",
          "imgCaption": "La radiación solar es interceptada dramáticamente iluminando fluorescencias verdes boreales.",
          "style": "highlight"
        },
        {
          "title": "Biosfera Única y Ecosistemas Entrelazados",
          "text": "A diferencia de las ríspidas llanuras muertas del crudo vecindario marciano, nuestra cúpula verde rebosa de insaciable dinamismo microscópico y salvaje. La macro oxigenación primordial que diseñaron en silencio las antiguas cianobacterias sembró ecosistemas que dependen simbióticamente unos del otro creando intrincadas cadenas genéticas planetarias vivas.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/S92-52043/S92-52043~medium.jpg"
        },
        {
          "title": "El Núcleo Terrestre: El Corazón de Hierro",
          "text": "En el centro exacto de la Tierra hay una bola sólida de hierro y níquel de 1,220 km de radio llamada núcleo interno. A su alrededor hay una capa de hierro líquido llamada núcleo externo. La temperatura en el núcleo supera los 5,000°C, similar a la superficie del Sol. Este hierro líquido en movimiento es el responsable de generar el campo magnético que protege toda la vida en la Tierra.",
          "image": "https://images-assets.nasa.gov/image/sts056-153-092/sts056-153-092~medium.jpg",
          "imgCaption": "Estructura interna de la Tierra: corteza, manto, núcleo externo líquido y núcleo interno sólido. Fuente: NASA/USGS"
        },
        {
          "title": "El Campo Magnético: El Escudo Protector de la Vida",
          "text": "El campo magnético terrestre, generado por el hierro líquido del núcleo externo, es un escudo invisible que deflecta el viento solar. Sin él, las partículas energéticas del Sol barrería la atmósfera y el agua de la superficie, como ocurrió en Marte. El campo magnético crea también las espectaculares auroras boreales y australes cuando partículas solares chocan con la atmósfera en los polos.",
          "image": "https://images-assets.nasa.gov/image/s49-79-024/s49-79-024~medium.jpg",
          "imgCaption": "Las auroras boreales, visibles desde la Estación Espacial Internacional, son causadas por el campo magnético terrestre. Fuente: NASA/ISS"
        },
        {
          "title": "La Luna: Nuestra Compañera Eterna",
          "text": "La Luna se formó hace 4,500 millones de años cuando un objeto del tamaño de Marte chocó con la Tierra primordial. Los escombros de ese impacto se agruparon formando nuestra Luna. La Luna estabiliza el eje de inclinación de la Tierra (lo que nos da estaciones estables), genera las mareas oceánicas y se aleja de nosotros 3.8 cm cada año. Sin la Luna, la vida en la Tierra sería muy diferente.",
          "image": "https://images-assets.nasa.gov/image/s07-32-1667/s07-32-1667~medium.jpg",
          "imgCaption": "La Luna y la Tierra fotografiadas desde la nave Galileo de NASA durante su sobrevuelo en 1992. Fuente: NASA/JPL"
        },
        {
          "title": "La Atmósfera: El Manto que Nos Protege",
          "text": "La atmósfera de la Tierra es una delgada capa de gases (78% nitrógeno, 21% oxígeno, 1% argón y otros) que hace posible la vida. La capa de ozono en la estratosfera filtra el 97-99% de la dañina radiación ultravioleta del Sol. Sin atmósfera, las temperaturas oscilarían entre -160°C por la noche y 120°C de día, y los rayos cósmicos esterilizarían la superficie.",
          "image": "https://images-assets.nasa.gov/image/sts064-111-041/sts064-111-041~medium.jpg",
          "imgCaption": "La delgada capa de atmósfera terrestre, visible desde el espacio como una franja azul sobre el horizonte. Fuente: NASA/ISS"
        },
        {
          "title": "Los Océanos: El Gran Tesoro Azul",
          "text": "Los océanos cubren el 71% de la superficie terrestre y contienen el 97% del agua del planeta. Son fundamentales para la vida: regulan el clima global, absorben el 30% del CO₂ emitido por humanos y producen más del 50% del oxígeno del planeta a través del fitoplancton. La fosa de las Marianas, en el Pacífico, es el punto más profundo de la Tierra: 11,034 metros.",
          "image": "https://images-assets.nasa.gov/image/7667283/7667283~small.jpg",
          "imgCaption": "La Tierra vista desde el espacio muestra por qué es llamada el 'Planeta Azul': los océanos dominan su superficie. Fuente: NASA/NOAA"
        },
        {
          "title": "Las Placas Tectónicas: La Tierra se Mueve",
          "text": "La corteza terrestre está dividida en grandes placas que flotan sobre el manto y se mueven entre 2 y 15 cm por año. Cuando chocan forman montañas como el Himalaya; cuando se separan crean océanos como el Atlántico; cuando una se hunde bajo otra generan volcanes y terremotos. La tectónica de placas recicla constantemente la corteza, manteniendo el ciclo del carbono que regula el clima.",
          "image": "https://images-assets.nasa.gov/image/KSC-20220822-PH-SNG01_0578/KSC-20220822-PH-SNG01_0578~medium.jpg",
          "imgCaption": "Mapa global de las placas tectónicas terrestres. Sus movimientos moldean la geografía del planeta. Fuente: NASA/USGS"
        },
        {
          "title": "La ISS: Nuestra Casa Orbital",
          "text": "La Estación Espacial Internacional (ISS) orbita la Tierra a 400 km de altitud y 27,600 km/h. Da la vuelta al planeta cada 90 minutos. Es un laboratorio científico donde astronautas de múltiples países conviven y realizan experimentos en microgravedad. Se ha habitado de forma continua desde noviembre de 2000. Desde la ISS se ve una salida de sol cada 45 minutos.",
          "image": "https://images-assets.nasa.gov/image/KSC-20220810-PH-RNB01_0010/KSC-20220810-PH-RNB01_0010~medium.jpg",
          "imgCaption": "La Estación Espacial Internacional fotografiada desde el transbordador Discovery de NASA. Fuente: NASA"
        },
        {
          "title": "Los Satélites Artificiales: Guardianes Orbitales",
          "text": "Hay más de 8,000 satélites activos orbitando la Tierra hoy. Estos artefactos hacen posibles los GPS, las llamadas telefónicas globales, la televisión por satélite, la predicción del tiempo y el monitoreo del cambio climático. El primer satélite artificial fue el Sputnik 1 soviético en 1957. Los satélites Landsat de NASA llevan más de 50 años fotografiando los cambios en la superficie terrestre.",
          "image": "https://images-assets.nasa.gov/image/KSC-20220810-PH-JNP01_0107/KSC-20220810-PH-JNP01_0107~medium.jpg",
          "imgCaption": "Red global de satélites orbitando la Tierra. Fuente: ESA/Aerospace"
        },
        {
          "title": "El Cambio Climático: Una Emergencia Real",
          "text": "La temperatura media global de la Tierra ha subido 1.1°C desde la era preindustrial por las emisiones de gases de efecto invernadero producidas por los humanos. La NASA monitorea el clima terrestre con más de 25 satélites. Las consecuencias incluyen derretimiento de glaciares, subida del nivel del mar y eventos climáticos extremos más frecuentes. Reducir emisiones es la prioridad científica más urgente del siglo XXI.",
          "image": "https://images-assets.nasa.gov/image/KSC-20220810-PH-JNP01_0138/KSC-20220810-PH-JNP01_0138~medium.jpg",
          "imgCaption": "Imágenes comparativas de un glaciar en 1980 vs 2020, documentando el retroceso glaciar causado por el calentamiento global. Fuente: NASA/USGS"
        }
      ],
      "bibliography": [
        "NASA (2024). Earth Overview. NASA Solar System Exploration.",
        "Lovelock, J. (1979). Gaia: A new look at life on Earth. Oxford University Press.",
        "Kasting, J. F., & Catling, D. (2003). Evolution of a Habitable Planet. Annual Review of Astronomy and Astrophysics."
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuál es el gas más abundante en la atmósfera terrestre?",
        "options": [
          "Oxígeno",
          "Dióxido de Carbono",
          "Nitrógeno"
        ],
        "a": 2
      },
      {
        "q": "¿Qué fenómeno geológico único de la Tierra ayuda a renovar la corteza terrestre?",
        "options": [
          "Rotación rápida",
          "Tectónica de placas",
          "Atracción lunar"
        ],
        "a": 1
      },
      {
        "q": "¿Qué función cumple nuestra densa atmósfera gaseosa?",
        "options": [
          "Aumentar la gravedad",
          "Proteger de radiación UV y regular la temperatura",
          "Generar luz propia"
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Tierra (El Oasis Azul)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Un Equilibrio Químico Perfecto', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Tierra', �qu� funci�n cumple la fase de 'Tectónica de Placas'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Agua en los Tres Estados Vitales'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Tierra",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Escudo Magnético y las Auroras', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Tierra' ocurre en 'Biosfera Única y Ecosistemas Entrelazados'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Oasis Azul'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Tierra', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Biosfera Única y Ecosistemas Entrelazados', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "mars",
    "order": 4,
    "titleEn": "Mars",
    "titleEs": "Marte",
    "badge": "Red Ranger",
    "badgeEs": "Ranger Rojo",
    "color": "#E25A3D",
    "contentEs": {
      "sections": [
        {
          "title": "El Planeta Rojo",
          "text": "Marte es el cuarto planeta desde el Sol, distinguido por su color rojo óxido debido a la abundancia de óxido de hierro en las rocas superficiales y el regolito (polvo marciano). Es un mundo desértico y sumamente frío, con una atmósfera extremadamente tenue compuesta predominantemente (95%) por dióxido de carbono.",
          "image": "https://images-assets.nasa.gov/image/PIA11428/PIA11428~small.jpg",
          "imgCaption": "Marte está custodiado por dos pequeñas lunas asteroides: Fobos y Deimos."
        },
        {
          "title": "Récords Topográficos",
          "text": "A pesar de su tamaño (casi la mitad de la Tierra), Marte alberga los terrenos geológicos más majestuosos del sistema solar: el Monte Olimpo (Olympus Mons), un volcán extinto tres veces más alto que el Monte Everest, y Valles Marineris, un gigantesco sistema de cañones tectónicos que es 10 veces más largo, 7 veces más profundo y mucho más ancho que el Gran Cañón terrestre.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA04928/PIA04928~medium.jpg"
        },
        {
          "title": "Un Pasado Acuático",
          "text": "Existen robustas evidencias científicas recopiladas de datos geomorfológicos y rovers robóticos (como Curiosity y Perseverance) que confirman que Marte albergó vastos cuerpos de agua líquida en su superficie hace miles de millones de años. Hoy en día, una considerable parte de esa agua persiste congelada en los profundos casquetes polares y enterrada subterráneamente.",
          "image": "https://images-assets.nasa.gov/image/PIA04413/PIA04413~medium.jpg",
          "imgCaption": "Múltiples estudios de la NASA postulan que el joven planeta rojo poseía ecosistemas acuáticos estables."
        },
        {
          "title": "Tormentas de Polvo Globales",
          "text": "El clima marciano es sumamente violento durante los cambios estacionales. Debido a su atmósfera delgada y rápidas fluctuaciones térmicas, se generan tormentas de fino polvo de óxido de hierro que pueden escalar monumentalmente hasta envolver el planeta entero durante meses. Estas tormentas bloquean casi en su totalidad el paso de la luz solar a la superficie, lo que ha provocado apagones técnicos definitivos en sondas exploratorias robóticas alimentadas por energía solar.",
          "image": "https://images-assets.nasa.gov/image/PIA15998/PIA15998~small.jpg",
          "imgCaption": "Estas bestias meteorológicas apocalípticas oscurecen su totalidad deteniendo máquinas.",
          "style": "normal"
        },
        {
          "title": "Los Compañeros Fobos y Deimos",
          "text": "Marte está escoltado en su solitaria órbita escarpada por dos lunas deformes y oscuras llamadas Fobos (Miedo) y Deimos (Pánico). La comunidad de astrofísica planetaria sostiene que ambos cuerpos menores no se formaron simultáneamente con el planeta madre, sino que en su lugar son transeúntes errantes, asteroides antiguos capturados furtivamente desde el cinturón de asteroides por el campo de la masiva atracción gravitatoria marciana en su infancia astrofísica.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA14838/PIA14838~medium.jpg"
        },
        {
          "title": "El Futuro: Colonización Humana",
          "text": "El escenario cumbre del siglo 21 proyecta la inserción biológica humana permanente en el hostil mundo marciano. Este audaz prospecto choca directamente contra letales adversidades ambientales tales como la inclemente radiación espacial perjudicial propiciada por la carencia de escudo magnético y temperaturas congelantes extremas. La naciente bio-ingeniería, junto a las agencias aeroespaciales en unísono global intentan diseñar bio-domos habitables para cristalizar esta hazaña pionera.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA16000/PIA16000~medium.jpg"
        },
        {
          "title": "El Interior de Marte: Un Núcleo Frío",
          "text": "La sonda InSight de NASA aterrizó en Marte en 2018 para estudiar su interior con sismómetros. Descubrió que el núcleo marciano es líquido, rico en hierro y azufre, y mide entre 1,800 y 2,000 km de radio. A diferencia de la Tierra, el núcleo de Marte no genera un campo magnético global activo, lo que dejó al planeta sin protección frente al viento solar hace unos 4,000 millones de años.",
          "image": "https://images-assets.nasa.gov/image/PIA17351/PIA17351~medium.jpg",
          "imgCaption": "La sonda InSight de NASA registró temblores marcianos que revelaron la estructura interna del Planeta Rojo. Fuente: NASA/JPL"
        },
        {
          "title": "Fobos y Deimos: Las Lunas de Marte",
          "text": "Marte tiene dos pequeñas lunas: Fobos (27 km de diámetro) y Deimos (15 km). Parecen asteroides capturados por la gravedad marciana. Fobos es tan cercano a Marte que orbita más rápido de lo que el planeta rota: sale por el oeste y se pone por el este. Además, Fobos se acerca a Marte 2 cm por año y en unos 50 millones de años será destruido por la gravedad del planeta.",
          "image": "https://images-assets.nasa.gov/image/PIA15991/PIA15991~medium.jpg",
          "imgCaption": "Fobos, la luna mayor de Marte, fotografiada por el Mars Reconnaissance Orbiter de NASA. Fuente: NASA/University of Arizona"
        },
        {
          "title": "El Monte Olimpo: El Volcán Más Grande del Sistema Solar",
          "text": "El Monte Olimpo es el volcán más grande y alto conocido en el Sistema Solar: 21.9 km de altura (casi 3 veces el Everest) y 600 km de diámetro (tan grande como Francia). Lleva miles de millones de años sin placas tectónicas que muevan la corteza, por lo que el magma siguió acumulándose en el mismo punto creando esta monstruosa estructura. Probablemente no ha entrado en erupción desde hace millones de años.",
          "image": "https://images-assets.nasa.gov/image/PIA16912/PIA16912~medium.jpg",
          "imgCaption": "El Monte Olimpo en Marte: el volcán más grande del Sistema Solar, fotografiado por el satélite Mars Express de ESA. Fuente: ESA/NASA"
        },
        {
          "title": "Valles Marineris: La Gran Cicatriz Marciana",
          "text": "Valles Marineris es un sistema de cañones que se extiende 4,000 km a lo largo del ecuador de Marte (tan largo como los EE.UU. de costa a costa) y alcanza 7 km de profundidad. Por comparación, el Gran Cañón del Colorado tiene 446 km de largo y 1.8 km de profundidad. Valles Marineris se formó principalmente por fracturamiento tectónico y no por erosión de agua, aunque el agua pudo haberlo agrandado.",
          "image": "https://images-assets.nasa.gov/image/KSC-03pd2093/KSC-03pd2093~medium.jpg",
          "imgCaption": "Valles Marineris visto desde órbita: un sistema de cañones que haría al Gran Cañón parecer diminuto. Fuente: NASA/USGS"
        },
        {
          "title": "Las Tormentas de Polvo de Marte",
          "text": "Marte sufre tormentas de polvo únicas en el Sistema Solar: pueden durar meses y cubrir el planeta entero. La tormenta global de 2018 cubrió todo Marte durante 3 meses y dejó sin energía solar al rover Opportunity de NASA, que no volvió a despertar. El polvo marciano es muy fino, del tamaño de partículas de humo. Las tormentas globales ocurren aproximadamente cada 3 años marcianos.",
          "image": "https://images-assets.nasa.gov/image/KSC-03pd2092/KSC-03pd2092~medium.jpg",
          "imgCaption": "Tormenta de polvo global en Marte fotografiada por el Mars Reconnaissance Orbiter de NASA en 2018. Fuente: NASA/JPL"
        },
        {
          "title": "Perseverance y Curiosity: Los Exploradores del Suelo",
          "text": "Marte ha sido explorado por varios rovers (vehículos robóticos). Curiosity lleva operando desde 2012 y ha analizado miles de muestras de roca confirmando que Marte tuvo un lago de agua dulce habitable. Perseverance aterrizó en 2021 y busca signos de vida antigua recolectando muestras para traerlas a la Tierra en la futura Misión de Retorno de Muestras de Marte (NASA/ESA).",
          "image": "https://images-assets.nasa.gov/image/PIA19112/PIA19112~medium.jpg",
          "imgCaption": "El rover Perseverance de NASA en el cráter Jezero, antiguo lago marciano, en 2021. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "El Agua en Marte: Pasado Húmedo",
          "text": "Marte tuvo océanos hace unos 3,500 millones de años. Hoy el agua líquida no puede existir en la superficie por la baja presión atmosférica, pero hay evidencia de agua líquida salada bajo el casquete polar sur. También hay hielo de agua en los polos y en el suelo. Entender qué le pasó al agua de Marte es fundamental para saber si la vida pudo existir allí.",
          "image": "https://images-assets.nasa.gov/image/PIA13390/PIA13390~medium.jpg",
          "imgCaption": "Recreación artística de cómo pudo verse Marte hace 3,500 millones de años, cubierto parcialmente por océanos. Fuente: NASA/GSFC"
        },
        {
          "title": "¿Hubo Vida en Marte?",
          "text": "Esta es una de las preguntas más importantes de la ciencia actual. Los científicos buscan microfósiles en rocas sedimentarias del cráter Jezero (un antiguo lago). En 2022, el rover Perseverance encontró rocas con estructuras orgánicas complejas que podrían ser signos de vida antigua. Las muestras recolectadas serán analizadas en laboratorios terrestres alrededor de 2033.",
          "image": "https://images-assets.nasa.gov/image/PIA16057/PIA16057~medium.jpg",
          "imgCaption": "Roca sedimentaria del cráter Jezero analizada por Perseverance, que podría preservar signos de vida microbiana antigua. Fuente: NASA/JPL"
        },
        {
          "title": "La Colonización de Marte: El Sueño del Futuro",
          "text": "Agencias espaciales y empresas privadas planean enviar humanos a Marte en la década de 2030-2040. Los desafíos son enormes: el viaje dura 7 meses, la radiación es intensa sin campo magnético, la temperatura promedio es -60°C y no hay oxígeno respirable. El experimento MOXIE del rover Perseverance ya demostró que es posible producir oxígeno de la atmósfera marciana, un paso crucial para futuras misiones.",
          "image": "https://images-assets.nasa.gov/image/PIA12191/PIA12191~small.jpg",
          "imgCaption": "Representación artística de una futura base humana en Marte con domos de vida. Fuente: NASA/SpaceX"
        }
      ],
      "bibliography": [
        "NASA Space Science Data Coordinated Archive (2024). Mars Planet Profile.",
        "Carr, M. H. (2006). The Surface of Mars. Cambridge University Press.",
        "Mellon, M. T., et al. (2000). High-Resolution Thermal Inertia Mapping from Mars."
      ]
    },
    "quizEs": [
      {
        "q": "¿Por qué Marte posee una coloración rojiza?",
        "options": [
          "Atmósfera de neón",
          "Óxido de Hierro en la superficie",
          "Lava hirviendo"
        ],
        "a": 1
      },
      {
        "q": "¿Cuál es el nombre del volcán más alto del sistema solar, ubicado en Marte?",
        "options": [
          "Monte Everest",
          "Olympus Mons (Monte Olimpo)",
          "Volcán Fobos"
        ],
        "a": 1
      },
      {
        "q": "¿Qué descubrimiento clave han afirmado los rovers sobre el pasado de Marte?",
        "options": [
          "Tuvo océanos y agua líquida superficial",
          "Fue una estrella",
          "Había civilizaciones"
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Marte (El Planeta Rojo)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Récords Topográficos', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Marte', �qu� funci�n cumple la fase de 'Un Pasado Acuático'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Tormentas de Polvo Globales'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Marte",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Los Compañeros Fobos y Deimos', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Marte' ocurre en 'El Futuro: Colonización Humana'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Planeta Rojo'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Marte', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Futuro: Colonización Humana', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "jupiter",
    "order": 5,
    "titleEn": "Jupiter",
    "titleEs": "Júpiter",
    "badge": "Giant Guardian",
    "badgeEs": "Guardián Gigante",
    "color": "#D29A6A",
    "contentEs": {
      "sections": [
        {
          "title": "El Gigante Gaseoso",
          "text": "Júpiter es el quinto planeta de nuestro sistema solar y, por un inmenso margen, el más masivo. Es tan inmenso que su masa dobla a la de todos los demás planetas combinados. Como típico 'gigante gaseoso', no posee una superficie sólida caminable; se constituye fundamentalmente de nubes en espiral de hidrógeno molecular y helio, convirtiéndolo virtualmente en una 'estrella fallida' que nunca alcanzó suficiente masa para la fusión nuclear.",
          "image": "https://images-assets.nasa.gov/image/PIA09117/PIA09117~medium.jpg",
          "imgCaption": "Júpiter luce bandas de nubes estratificadas debido a sus potentes corrientes de jet."
        },
        {
          "title": "La Gran Mancha Roja",
          "text": "La icónica Gran Mancha Roja de Júpiter es, estructuralmente, un sistema anticiclónico de alta presión sumamente hostil—esencialmente la tormenta más grandiosa de todo el sistema solar. Esta vasta tormenta elíptica ha sido constantemente observada por los astrónomos con certeza científica por más de 300 años terrestres ininterrumpidos y cuenta con vientos ciclónicos periféricos que superan los 400 kilómetros por hora (250 mph).",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA03521/PIA03521~medium.jpg"
        },
        {
          "title": "El Imperio Galileano",
          "text": "Júpiter actúa casi como un sub-sistema solar debido a su masiva fuerza de gravedad, albergando oficialmente asombrosas 95 lunas. Las cuatro más formidables, documentadas por primera vez en 1610 por la agudeza óptica de Galileo Galilei (Ío, Europa, Ganímedes, Calisto), presentan formaciones astrofísicas asombrosas: desde el infierno de erupciones sulfúricas violentas en Ío hasta el vasto campo fértil de un potencial gran océano subterráneo abrigado en hielo dentro de Europa.",
          "image": "https://images-assets.nasa.gov/image/PIA26431/PIA26431~medium.jpg",
          "imgCaption": "Tomas infrarrojas revelan masivos ciclones geométricos formados sobre los polos jovianos."
        },
        {
          "title": "El Escudo Soberano (Shoemaker-Levy 9)",
          "text": "A nivel macrocósmico, el monumental índice de atracción gravitacional perpetuo ejercido por la gran y profunda masa térmica de Júpiter le acredita como el protector máximo de la Tierra. Atrae o desvía violentamente peligrosos asteroides y cometas perdidos. Un evento memorable de altísimo nivel ocurrió en 1994, cuando la comunidad astronómica humana atestiguó aterrada el catastrófico impacto en el que los fragmentos letales del descomunal cometa Shoemaker-Levy 9 se precipitaron contra los estratos gaseosos superiores de Júpiter desgarrando su atmósfera.",
          "image": "https://images-assets.nasa.gov/image/PIA21969/PIA21969~small.jpg",
          "imgCaption": "Los fragmentos colapsaron generando hongos incandescentes más grandes que nuestra Tierra.",
          "style": "normal"
        },
        {
          "title": "Núcleo y Océanos Metálicos",
          "text": "Avanzando hipotéticamente a las ultra-profundidades por debajo de las tumultuosas cortinas gaseosas de las nubes visibles surcadas por fuertes descargas eléctricas ruidosas, los físicos teorizan que el hidrógeno puro gas es triturado y presurizado implacablemente bajo presiones apocalípticas transicionando exóticamente formándose todo un vasto océano electrificado hirviente compuesto enteramente de Hidrógeno Metálico líquido, donde la física estándar flaquea abrumadoramente.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA22425/PIA22425~medium.jpg"
        },
        {
          "title": "Auroras y Dinamo Magnético",
          "text": "El movimiento vertiginoso de rotación más frenético de nuestro sistema (un día joviano demora únicamente diez escasas horas terrestres), orquestado con su denso núcleo fluido metálico, alimenta el dínamo más arrollador electromagnético colosal circundante en las inmediaciones del vecindario del Sistema Solar. Enormes polos lumínicos de auroras violetas irradian energía cruda incesantemente provocando cinturones radiactivos tan extremos mortales que freirían instantáneamente las naves no protegidas con escudos protectores formidables.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA26442/PIA26442~medium.jpg"
        },
        {
          "title": "El Interior de Júpiter: El Gas que se Convierte en Metal",
          "text": "Júpiter no tiene superficie sólida. Bajo sus nubes, el hidrógeno se comprime tanto que se vuelve líquido, y luego, a mayor profundidad, se convierte en hidrógeno metálico líquido: una sustancia que conduce la electricidad como un metal. Este hidrógeno metálico es el responsable del gigantesco campo magnético de Júpiter. En el centro podría haber un núcleo rocoso del tamaño de la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA21977/PIA21977~medium.jpg",
          "imgCaption": "Diagrama del interior de Júpiter: capas de gas, hidrógeno líquido, hidrógeno metálico y posible núcleo rocoso. Fuente: NASA"
        },
        {
          "title": "El Campo Magnético de Júpiter: El Más Poderoso del Sistema Solar",
          "text": "El campo magnético de Júpiter es 20,000 veces más fuerte que el de la Tierra, el más intenso de todos los planetas. Crea una magnetosfera tan grande que si pudiéramos verla desde la Tierra, ocuparía en el cielo un área 5 veces mayor que la Luna llena. Atrapa partículas de alta energía que crean cinturones de radiación letales para las naves espaciales. Los astronautas no podrían sobrevivir cerca de Júpiter.",
          "image": "https://images-assets.nasa.gov/image/PIA26444/PIA26444~small.jpg",
          "imgCaption": "Las auroras de Júpiter fotografiadas por el Telescopio Espacial Hubble, causadas por su poderoso campo magnético. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "Las Lunas de Júpiter: Un Sistema Solar en Miniatura",
          "text": "Júpiter tiene 95 lunas confirmadas, más que cualquier otro planeta. Las cuatro más grandes (Io, Europa, Ganímedes y Calisto) fueron descubiertas por Galileo Galilei en 1610 con un telescopio primitivo y se llaman lunas galileanas. Ganímedes es la luna más grande del Sistema Solar: es más grande que el planeta Mercurio. Estas lunas tienen geología activa, océanos subterráneos y posible vida.",
          "image": "https://images-assets.nasa.gov/image/PIA21975/PIA21975~medium.jpg",
          "imgCaption": "Las cuatro lunas galileanas de Júpiter: Io, Europa, Ganímedes y Calisto, descubiertas por Galileo en 1610. Fuente: NASA/JPL"
        },
        {
          "title": "La Gran Mancha Roja: La Tormenta Eterna",
          "text": "La Gran Mancha Roja es una tormenta anticiclónica que lleva girando al menos 350 años (fue observada por primera vez en 1665). Es tan grande que podría contener a la Tierra entera. Los vientos en su interior alcanzan 640 km/h. Curiosamente, la mancha se ha estado encogiendo: en el siglo XIX medía 40,000 km; hoy mide apenas 16,000 km. Los científicos no saben si desaparecerá.",
          "image": "https://images-assets.nasa.gov/image/PIA03520/PIA03520~medium.jpg",
          "imgCaption": "La Gran Mancha Roja de Júpiter fotografiada por el Telescopio Espacial Hubble en 2019. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "Los Anillos de Júpiter: Tenues y Desconocidos",
          "text": "Pocos saben que Júpiter también tiene anillos, aunque son mucho más tenues que los de Saturno. Fueron descubiertos en 1979 por la sonda Voyager 1. Están compuestos principalmente de polvo oscuro eyectado por pequeñas lunas interiores cuando meteoritos las impactan. Son invisibles desde la Tierra con telescopios normales pero la sonda Galileo los estudió detalladamente.",
          "image": "https://images-assets.nasa.gov/image/PIA22693/PIA22693~small.jpg",
          "imgCaption": "Los tenues anillos de Júpiter fotografiados por la sonda New Horizons de NASA en 2007. Fuente: NASA/JHU/APL"
        },
        {
          "title": "Io: La Luna Más Volcánica del Sistema Solar",
          "text": "Io es el cuerpo con mayor actividad volcánica de todo el Sistema Solar. Tiene más de 400 volcanes activos que emiten dióxido de azufre. Su superficie constantemente renovada no muestra ningún cráter de impacto. La causa de tanta actividad es el 'tirón de mareas' que ejercen Júpiter, Europa y Ganímedes sobre Io, calentando su interior como una pelota de goma apretada repetidamente.",
          "image": "https://images-assets.nasa.gov/image/PIA22946/PIA22946~medium.jpg",
          "imgCaption": "Io, la luna volcánica de Júpiter, con sus volcanes activos visibles como manchas brillantes. Fuente: NASA/JPL/University of Arizona"
        },
        {
          "title": "Europa: ¿Tiene un Océano con Vida?",
          "text": "Europa, luna de Júpiter, tiene una capa de hielo de 10-30 km que cubre un océano de agua líquida salada de hasta 100 km de profundidad. Este océano contiene dos veces más agua que todos los océanos de la Tierra juntos. El calor de marea de Júpiter mantiene el agua líquida. La misión Europa Clipper de NASA (lanzada en 2024) investigará si este océano podría albergar vida microbiana.",
          "image": "https://images-assets.nasa.gov/image/PIA21966/PIA21966~medium.jpg",
          "imgCaption": "Europa, luna de Júpiter, con su superficie de hielo agrietado que cubre un vasto océano subterráneo. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "La Sonda Juno: Dentro de Júpiter",
          "text": "La sonda Juno de NASA orbita Júpiter desde 2016. Vuela tan cerca como 4,200 km sobre las nubes y tarda 53 días en completar una órbita. Ha revelado que las tormentas de Júpiter tienen raíces que se extienden cientos de kilómetros hacia el interior, y que los polos están cubiertos de ciclones gigantescos organizados en patrones geométricos perfectos. Juno también encontró agua en la atmósfera joviana.",
          "image": "https://images-assets.nasa.gov/image/PIA22949/PIA22949~medium.jpg",
          "imgCaption": "Los ciclones polares de Júpiter fotografiados por la sonda Juno de NASA: una estructura jamás vista antes. Fuente: NASA/JPL-Caltech/SwRI/MSSS"
        },
        {
          "title": "Júpiter como Escudo Protector de la Tierra",
          "text": "Júpiter actúa como un 'aspirador cósmico' para la Tierra. Su enorme gravedad captura cometas y asteroides que de otro modo podrían impactar nuestro planeta. En 1994, el mundo observó cómo el cometa Shoemaker-Levy 9 fue capturado y destruido por Júpiter en 21 impactos espectaculares. Sin embargo, Júpiter también puede lanzar objetos hacia la Tierra, así que su papel es ambiguo.",
          "image": "https://images-assets.nasa.gov/image/PIA22421/PIA22421~small.jpg",
          "imgCaption": "Impacto del cometa Shoemaker-Levy 9 contra Júpiter en 1994, fotografiado por el Telescopio Espacial Hubble. Fuente: NASA/HST"
        }
      ],
      "bibliography": [
        "Ingersoll, A. P. (1990). Atmospheric dynamics of the outer planets. Science.",
        "Guillot, T. (1999). Interiors of Giant Planets Inside and Outside the Solar System. Science.",
        "NASA Juno Mission Archives (2024). Jet Propulsion Laboratory."
      ]
    },
    "quizEs": [
      {
        "q": "¿Estructuralmente, qué es Júpiter?",
        "options": [
          "Un planeta súper-rocoso",
          "Una inmensa esfera de hielo",
          "Un gigante de compuestos gaseosos (hidrógeno y helio)"
        ],
        "a": 2
      },
      {
        "q": "La Gran Mancha Roja es exactamente...",
        "options": [
          "Un volcán expuesto",
          "Un inmenso anticiclón/tormenta de más de 300 años",
          "Una ilusión óptica marciana"
        ],
        "a": 1
      },
      {
        "q": "¿A quién se le atribuye el descubrimiento oficial astronómico de las 4 lunas mayores de Júpiter?",
        "options": [
          "Johannes Kepler",
          "Galileo Galilei",
          "Isaac Newton"
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Júpiter (El Gigante Gaseoso)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'La Gran Mancha Roja', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Júpiter', �qu� funci�n cumple la fase de 'El Imperio Galileano'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'El Escudo Soberano (Shoemaker-Levy 9)'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Júpiter",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Núcleo y Océanos Metálicos', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Júpiter' ocurre en 'Auroras y Dinamo Magnético'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Gigante Gaseoso'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Júpiter', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Auroras y Dinamo Magnético', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "saturn",
    "order": 6,
    "titleEn": "Saturn",
    "titleEs": "Saturno",
    "badge": "Ring Master",
    "badgeEs": "Maestro de los Anillos",
    "color": "#E8D08D",
    "contentEs": {
      "sections": [
        {
          "title": "La Joya Anillada de la Vía Láctea",
          "text": "Saturno se erige como el sexto planeta alejado del sol, y retiene el escaño como el segundo gigante masivo tras de Júpiter. La joya de su corona astronómica radica sin duda en su extraordinario e infinito complejo estructural de anillos. Esta obra maestra de la estática y dinámica cósmica no es sólida, se segmenta virtualmente en múltiples bandas que albergan desde un polvo espectral finísimo hasta montañas de hielo gigantes y remanentes rocosos destrozados por fuerzas de la gravedad.",
          "image": "https://images-assets.nasa.gov/image/PIA02241/PIA02241~small.jpg",
          "imgCaption": "Los anillos brillan dramáticamente porque sus partículas de hielo reflejan excepcionalmente bien la radiación solar incidente."
        },
        {
          "title": "Paradoja de la Densidad",
          "text": "Se define esencialmente por los mismos componentes hidrodinámicos que el sol (Hidrógeno/Helio). Un rasgo de suma peculiaridad teórica radica en su extremadamente inusual gravedad específica computada: cuenta con la relación masa/densidad generalizada más ínfima documentada planetariamente. ¡A un plano de escala mítica matemáticamente viable, si consiguieses encontrar un vaso o piscina colosal rellena puramente con H2O universal, Saturno virtualmente tendería flotar sobre ella dócilmente!",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA01988/PIA01988~small.jpg"
        },
        {
          "title": "El Enigma Titánico",
          "text": "Es imperativo referenciar el dominio de lunas que regenta, de una contundencia superior oficial contabilizada a unas 146. Entre ellas la enigmática reina luna llamada `Titán`. Titán supera al diminuto astro de Mercurio en talla pura y conserva algo sumamente valioso científicamente enigmático—Es la única gran luna celestial referida provista de su robusta, niebla gruesa atmósfera originaria en adición de albergar extraños pero efectivos sistemas funcionales fluviales conformados enteramente por ríos superficiales de metano super congelados al estado físico fluyente, replicando una cuasi-química de la topografía Hidrológica terráquea primitiva.",
          "image": "https://images-assets.nasa.gov/image/PIA01952/PIA01952~medium.jpg",
          "imgCaption": "Lagos y ríos formados por elementos de metano deambulan bajo la pesada y espesa atmósfera dorada de Titán."
        },
        {
          "title": "El Hexágono Polar Norte",
          "text": "Si se sobrevuela directamente la cima térmica del hemisferio superior septentrional polar del gigante Saturno, las intrusivas sondas visuales ópticas revelan estupefactas el remolino magnético en forma de un hexágono milimétricamente geométrico exacto de magnitudes inverosímiles, abarcando una dimensión aproximada el doble de extensión al de la Tierra. Este flujo vorticial de viento masivo rotatorio eterno gira ferozmente a incontables velocidades de vértigo superando a los peores huracanes físicos teóricos terrestres.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA18337/PIA18337~small.jpg"
        },
        {
          "title": "Las Fuentes Acuáticas de Encélado",
          "text": "Una luna minúscula en la órbita cercana pero revestida primariamente con un cegador resplandeciente e impoluto exterior y corteza congelada reluciente de hielo denso, ostenta un secreto formidable subsuperficial interior biológicamente fascinante: Almacena ininterrumpidamente formidables depósitos hidro-termales profundos de océanos líquidos globales candentes impulsados a través de masivos agujeros activos, emitiendo ráfagas gigantescas constantes violentas a velocidades colosales eyectando material agua líquida a los vacíos infinitos externos fríos de su propia órbita saturnal dotando del suplementario alimento al sistema anillo `E` mismo circundante.",
          "image": "https://images-assets.nasa.gov/image/PIA02285/PIA02285~medium.jpg",
          "imgCaption": "Poderosos géiseres expulsan agua cálida del inmenso océano infernal debajo de la luna.",
          "style": "highlight"
        },
        {
          "title": "El Exquisito Fin de la Sonda Cassini",
          "text": "Después de innumerables órbitas ricas revelando espectaculares misterios asombrosos estructurales planetarios, tras concluir agotados sus cuantiosos suministros de escaso oxígeno y propulsores, el heroico gran robot espacial terrestre explorador oficial conocido como `Cassini` realizó la fase inmoladora definitiva Gran Final. Mediante trayectorias de un suicidio quirúrgicamente trazado ordenado científicamente por prevención para nuca mancillar con microorganismos terrenales los mundos de lunas susceptibles a vida alienígena adyacentes, procedió su noble inmersión calórica desintegradora incandescente abrazando el gigante gaseoso espeso Saturno.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA02293/PIA02293~medium.jpg"
        },
        {
          "title": "El Interior de Saturno: El Planeta Flotante",
          "text": "Saturno es el único planeta del Sistema Solar menos denso que el agua: si existiera un océano suficientemente grande, ¡flotaría! Esto ocurre porque Saturno es principalmente hidrógeno y helio, los elementos más ligeros del universo. Como Júpiter, tiene capas de hidrógeno gaseoso, líquido y metálico. En su centro hay un núcleo rocoso y helado de unas 10-15 veces la masa de la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA01270/PIA01270~medium.jpg",
          "imgCaption": "Saturno fotografiado por la sonda Cassini de NASA/ESA. Sería el único planeta del Sistema Solar capaz de flotar en el agua. Fuente: NASA/JPL"
        },
        {
          "title": "El Campo Magnético de Saturno: El Alineado Perfecto",
          "text": "Saturno tiene un campo magnético 578 veces más fuerte que el de la Tierra. Lo que hace único a Saturno es que su campo magnético está casi perfectamente alineado con su eje de rotación, a diferencia de los campos magnéticos de todos los demás planetas que están inclinados. Esto confunde a los científicos, pues los modelos físicos predicen que un campo magnético así no debería poder mantenerse estable.",
          "image": "https://images-assets.nasa.gov/image/PIA01387/PIA01387~small.jpg",
          "imgCaption": "El campo magnético de Saturno, medido por la sonda Cassini, es casi perfectamente simétrico respecto a su eje. Fuente: NASA/JPL"
        },
        {
          "title": "Los Anillos de Saturno: La Joya del Sistema Solar",
          "text": "Los anillos de Saturno se extienden hasta 282,000 km desde el centro del planeta pero tienen solo 10 a 100 metros de grosor. Están formados principalmente por agua helada y algo de polvo y roca. La sonda Cassini descubrió que los anillos son relativamente jóvenes (100-400 millones de años) y que lentamente están cayendo hacia el planeta. En unos 100 millones de años, los anillos habrán desaparecido.",
          "image": "https://images-assets.nasa.gov/image/PIA11142/PIA11142~medium.jpg",
          "imgCaption": "Los anillos de Saturno, compuestos principalmente de hielo de agua, fotografiados por la sonda Cassini de NASA. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "Titán: La Luna con Océanos de Metano",
          "text": "Titán, la luna más grande de Saturno, es el único cuerpo del Sistema Solar (aparte de la Tierra) con líquidos estables en su superficie. Pero no es agua: son lagos y ríos de metano y etano líquidos a -179°C. Tiene una atmósfera densa de nitrógeno con nubes anaranjadas. La misión Dragonfly de NASA enviará un helicóptero nuclear a Titán en 2028 para estudiar su química.",
          "image": "https://images-assets.nasa.gov/image/PIA01969/PIA01969~medium.jpg",
          "imgCaption": "Recreación artística del paisaje de Titán con sus lagos de metano y la atmósfera naranja. Fuente: NASA/JPL"
        },
        {
          "title": "Encélado: Géiseres de Agua en el Espacio",
          "text": "Encélado es una pequeña luna de Saturno que esconde un océano bajo su cáscara de hielo. En su polo sur hay géiseres que expulsan agua al espacio a 1,400 km/h. Esta agua forma el anillo E de Saturno. Lo más emocionante: en el agua eyectada la sonda Cassini detectó hidrógeno molecular (señal de actividad hidrotermal) y moléculas orgánicas complejas, ingredientes posibles para la vida.",
          "image": "https://images-assets.nasa.gov/image/PIA02269/PIA02269~small.jpg",
          "imgCaption": "Géiseres de vapor de agua en el polo sur de Encélado, fotografiados por la sonda Cassini. Fuente: NASA/JPL-Caltech/SSI"
        },
        {
          "title": "La Sonda Cassini: 13 Años en Saturno",
          "text": "La misión Cassini-Huygens (NASA/ESA/ASI) orbitó Saturno de 2004 a 2017: 13 años de descubrimientos revolucionarios. Lanzó la sonda Huygens que aterrizó en Titán en 2005, la primera vez que una nave aterrizó en el Sistema Solar externo. Cassini completó 293 órbitas a Saturno, hizo 162 sobrevuelos de lunas y al final se hundió en la atmósfera del planeta para no contaminar sus lunas.",
          "image": "https://images-assets.nasa.gov/image/PIA06994/PIA06994~medium.jpg",
          "imgCaption": "La sonda Cassini de NASA/ESA realizó 293 órbitas alrededor de Saturno en 13 años de misión. Fuente: NASA/JPL"
        },
        {
          "title": "Las Lunas de Saturno: Un Museo Lunar",
          "text": "Saturno tiene 146 lunas confirmadas, el mayor número del Sistema Solar. Incluyen desde Titán (más grande que Mercurio) hasta lunas menores de apenas un kilómetro. Mimas tiene un cráter gigante que lo hace parecer la Estrella de la Muerte de Star Wars. Hyperion tiene la forma de una esponja y Janus comparte su órbita con otra luna llamada Epimeteo, intercambiando órbitas cada 4 años.",
          "image": "https://images-assets.nasa.gov/image/PIA10233/PIA10233~medium.jpg",
          "imgCaption": "Mosaico de lunas de Saturno, incluyendo Titán, Encélado, Mimas, Dione y Tetis. Fuente: NASA/JPL-Caltech/SSI"
        },
        {
          "title": "Las Tormentas de Saturno: El Gran Punto Blanco",
          "text": "Saturno tiene tormentas periódicas llamadas 'Grandes Manchas Blancas' que ocurren aproximadamente cada 30 años. La tormenta de 2010 fue capturada por Cassini: comenzó pequeña pero creció hasta rodear todo el planeta en cuestión de meses, con vientos de 480 km/h. También se descubrió una tormenta hexagonal permanente en el polo norte, una estructura geométrica única en el Sistema Solar.",
          "image": "https://images-assets.nasa.gov/image/PIA01272/PIA01272~small.jpg",
          "imgCaption": "La tormenta hexagonal del polo norte de Saturno, una estructura única en el Sistema Solar. Fuente: NASA/JPL-Caltech/SSI"
        },
        {
          "title": "El Futuro de los Anillos y la Misión Dragonfly",
          "text": "Los anillos de Saturno están desapareciendo: la gravedad y el viento solar los erosionan a razón de 10,000 kg de material por segundo. En unos 100 millones de años habrán desaparecido. Mientras tanto, NASA prepara la misión Dragonfly (lanzamiento 2028) que enviará un helicóptero de propulsión nuclear a Titán. Volará cientos de kilómetros explorando sitios de interés astrobiológico.",
          "image": "https://images-assets.nasa.gov/image/PIA01382/PIA01382~medium.jpg",
          "imgCaption": "Representación artística del helicóptero Dragonfly de NASA explorando la superficie de Titán. Fuente: NASA/Johns Hopkins APL"
        }
      ],
      "bibliography": [
        "Porco, C. C., et al. (2005). Cassini Imaging Science: Initial Results on Saturn's Rings and Small Satellites.",
        "NASA / JPL-Caltech (2024). Saturn System Planetary Data Exploration.",
        "Lorenz, R., & Mitton, J. (2008). Titan Unveiled: Saturn's Mysterious Moon Explored. Princeton Univ. Press."
      ]
    },
    "quizEs": [
      {
        "q": "¿En su núcleo, primariamente de qué materia se compone el colosal sistema de anillos que rodean a Saturno?",
        "options": [
          "Hierro líquido y platino puro fundidos",
          "Micro-fragmentos de hielo, detritos cristalinos comela y formaciones heladas roca",
          "Puro vapor condensado"
        ],
        "a": 1
      },
      {
        "q": "¿En un plano matemático teórico hipotético referenciado por su extremada inconsistencia en nivel de densidad molecular general, que le procedería físicamente al orbe re-insertado localmente en gigantesco estanque acuífero de H2O terráqueo?",
        "options": [
          "Sumergimiento estrepitoso por atracción y contracción centralizada instantánea",
          "Levitaría boyantemente experimentando una fuerza de flotación total sináptica",
          "Implosionaría nuclear y espontáneamente"
        ],
        "a": 1
      },
      {
        "q": "¿Cuál se corrobora como un distintivo particular excepcional comprobado verídicamente poseído por Titán?",
        "options": [
          "Ciclo Hidrológico alterno operante en forma fluida liquida de metano junto densidad de estratos atmosférica original inalterablemente robusta ",
          "Mantiene vida terrestre humana artificial comprobada",
          "Esfera térmica volcánica pura envuelta de gas acido puro"
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Saturno (La Joya Anillada de la Vía Láctea)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Paradoja de la Densidad', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Saturno', �qu� funci�n cumple la fase de 'El Enigma Titánico'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'El Hexágono Polar Norte'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Saturno",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Las Fuentes Acuáticas de Encélado', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Saturno' ocurre en 'El Exquisito Fin de la Sonda Cassini'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'La Joya Anillada de la Vía Láctea'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Saturno', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Exquisito Fin de la Sonda Cassini', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "uranus",
    "order": 7,
    "titleEn": "Uranus",
    "titleEs": "Urano",
    "badge": "Ice Rebel",
    "badgeEs": "Rebelde Helado",
    "color": "#66C6DF",
    "contentEs": {
      "sections": [
        {
          "title": "El Gigante Inclinado",
          "text": "Urano, el séptimo planeta en procesión alejada desde nuestro Sol, conforma la familia de los Gigantes Hielo. Adopta una característica tonalidad azulada iridiscente distintiva que emana orgánicamente del metano espectral gaseoso remanente que se aloja latente de forma superficial externa tras sus densas capas congeladas.",
          "image": "https://images-assets.nasa.gov/image/PIA01282/PIA01282~medium.jpg",
          "imgCaption": "Su color particular deriva del metano que filtra selectivamente la luz roja absorbiéndola al completo."
        },
        {
          "title": "Rotación Horizontal",
          "text": "Lo que hace inconfundible físicamente de forma singular en el plano del cosmos universal a la entidad masiva de Urano es la insólita configuración inclinatoria axial de su rotación extrema (Aparición física inclinación orbital equivalente aproximado 97.77 grados absolutos). Giratoriamente interactúa 'de lado', como barril esférico rodando su eje sobre una órbita polar al plano del Sol perpetuándose de forma paralela inalterablemente peculiar. Lo cual consecuentemente le confiere estaciones heladas árticas inestablemente extremas expuestas larguísimos plazos ininterrumpidos.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA01360/PIA01360~small.jpg"
        },
        {
          "title": "El Sistema de Anillos Negros",
          "text": "Contrario a la creencia popular de que Saturno es el único poseedor de aros, Urano mantiene bajo su órbita gravitacional un complejo y sumamente oscuro sistema de anillos concéntricos. Se sospecha ampliamente por la comunidad cosmológica que estas bandas opacas emergieron de incontables fragmentos colisionales originados por impactos de exoplanetas y meteoros destructores acontecidos eones atrás en su génesis temprana.",
          "image": "https://images-assets.nasa.gov/image/PIA18182/PIA18182~medium.jpg",
          "imgCaption": "Múltiples lunas pequeñas residen como pastoras entre los anillos sombríos uranianos."
        },
        {
          "title": "El Primer Planeta Descubierto por Telescopio",
          "text": "A diferencia de los mundos clásicos como Mercurio o Júpiter, que han sido observados meticulosamente desde la antigüedad por civilizaciones pioneras sin requerimiento amplificador, Urano es demasiado tenue. Fue astronómicamente coronado e ingresado en los registros en el revolucionario año de 1781 gracias al ilustre ingenio óptico del astrónomo Sir William Herschel, quien en un inicio teorizó haber divisado únicamente un pequeño cometa.",
          "image": "https://images-assets.nasa.gov/image/PIA01281/PIA01281~medium.jpg",
          "imgCaption": "Herschel asombró al mundo revelando al gigante tenue detrás de los clásicos.",
          "style": "normal"
        },
        {
          "title": "Lunas Literarias de Shakespeare",
          "text": "Urano rige e impone su danza gravitacional sobre una colección confirmada de 27 lunas orbitantes naturales. Como curiosidad antropológica astronómica, a estas piezas no se les bautizó siguiendo el estándar dogmático estricto del vasto canon mitológico panteísta formalizado griego o del panteísmo grecorromano, rindiéndole tributo en contraposición netamente a las famosas producciones artísticas y clásicas de William Shakespeare y del ingenio poético de Alexander Pope.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA00143/PIA00143~small.jpg"
        },
        {
          "title": "Radiación Térmica Interna Cero",
          "text": "El enigma maestro del cuerpo de hielo radia en que este espectro gaseoso gigantesco resulta estar peculiarmente desprovisto térmicamente inactivo desprendiendo niveles ridículamente diminutos irrelevantes casi carentes por entero comparados de radiación remanente térmica desde las recónditas extremidades de sus profundidades insondables de su propio lecho base núcleo hacia su superficie superior en drástico disonante contraste de la fogosa emanancia de mundos hermanos gigantes.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA01283/PIA01283~medium.jpg"
        },
        {
          "title": "El Interior de Urano: El Planeta de Hielo",
          "text": "Urano es un 'gigante de hielo', diferente a Júpiter y Saturno que son 'gigantes de gas'. Su interior está compuesto principalmente de una mezcla densa y caliente de agua, metano y amoníaco en estado de hielo a alta presión. Sobre este manto helado hay una pequeña envoltura de hidrógeno y helio. En el centro podría haber un núcleo rocoso. Urano emite poco calor interno, a diferencia de los otros gigantes.",
          "image": "https://images-assets.nasa.gov/image/PIA17304/PIA17304~medium.jpg",
          "imgCaption": "Estructura interna de Urano: manto de hielo de agua, metano y amoníaco sobre un núcleo rocoso. Fuente: NASA"
        },
        {
          "title": "El Campo Magnético Peculiar de Urano",
          "text": "El campo magnético de Urano es extrañísimo: está inclinado 59° respecto a su eje de rotación y desplazado del centro del planeta. Esto hace que el campo sea altamente irregular y que las auroras en Urano aparezcan en lugares inesperados. Los científicos creen que la estructura del manto helado de Urano genera el campo de manera diferente a la de otros planetas.",
          "image": "https://images-assets.nasa.gov/image/PIA01985/PIA01985~medium.jpg",
          "imgCaption": "La magnetosfera de Urano es asimétrica e irregular debido a la inclinación y desplazamiento de su campo magnético. Fuente: NASA/JPL"
        },
        {
          "title": "Las Lunas de Urano: Nombradas por Shakespeare",
          "text": "Urano tiene 27 lunas conocidas, todas nombradas con personajes de las obras de Shakespeare y de Alexander Pope (Ariel, Umbriel, Titania, Oberón, Miranda, Puck, etc.). Miranda es la más interesante: tiene un acantilado llamado Verona Rupes de 20 km de altura, el más alto conocido del Sistema Solar. Desde su cima, una caída libre tomaría 12 minutos.",
          "image": "https://images-assets.nasa.gov/image/PIA01489/PIA01489~small.jpg",
          "imgCaption": "Las principales lunas de Urano, fotografiadas durante el sobrevuelo de la sonda Voyager 2 en 1986. Fuente: NASA/JPL"
        },
        {
          "title": "Los Anillos de Urano: Tenues y Oscuros",
          "text": "Urano tiene 13 anillos conocidos, descubiertos en 1977 cuando el planeta pasó frente a una estrella. Los anillos son oscuros y delgados, muy diferentes a los brillantes anillos de hielo de Saturno. Están compuestos de partículas oscuras, posiblemente hielo recubierto de materia orgánica. Los dos anillos exteriores fueron descubiertos por el Telescopio Hubble en 2005.",
          "image": "https://images-assets.nasa.gov/image/PIA01984/PIA01984~small.jpg",
          "imgCaption": "Los anillos de Urano fotografiados por el Telescopio Espacial Hubble. Son mucho más oscuros que los de Saturno. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "La Inclinación Extrema: El Planeta Tumbado",
          "text": "Urano tiene su eje de rotación inclinado 97.77°, lo que significa que rota prácticamente 'de lado'. Se cree que un objeto del tamaño de la Tierra chocó con Urano en la era temprana del Sistema Solar y lo 'tumbó'. Esto tiene consecuencias extraordinarias: cada polo recibe 42 años continuos de luz solar seguidos de 42 años de oscuridad total.",
          "image": "https://images-assets.nasa.gov/image/PIA00370/PIA00370~small.jpg",
          "imgCaption": "El eje de Urano está inclinado 98°, haciendo que el planeta ruede sobre su costado alrededor del Sol. Fuente: NASA/JPL"
        },
        {
          "title": "Las Estaciones Extremas de Urano",
          "text": "Debido a su inclinación de 98°, las estaciones de Urano son las más extremas del Sistema Solar. Cada estación dura 21 años terrestres. Un polo experimenta verano continuo (sol 24 horas) durante 21 años, seguido de 21 años de invierno total en oscuridad. Durante los equinoccios, Urano tiene un patrón de día/noche similar al de la Tierra, con los polos experimentando condiciones más moderadas.",
          "image": "https://images-assets.nasa.gov/image/PIA00369/PIA00369~medium.jpg",
          "imgCaption": "Comparación de Urano en diferentes épocas mostrando cambios atmosféricos relacionados con sus extremas estaciones. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "La Sonda Voyager 2: El Único Visitante",
          "text": "Solo una nave espacial ha visitado Urano: la Voyager 2, que hizo un sobrevuelo en enero de 1986. La nave pasó a 81,500 km de las nubes. Descubrió 10 lunas previamente desconocidas, 2 nuevos anillos y estudió la extraña magnetosfera. Después de Urano, Voyager 2 continuó hacia Neptuno. Hoy, Voyager 2 está más allá del Sistema Solar, en el espacio interestelar.",
          "image": "https://images-assets.nasa.gov/image/PIA26069/PIA26069~medium.jpg",
          "imgCaption": "La única fotografía cercana de Urano fue tomada por la sonda Voyager 2 de NASA en enero de 1986. Fuente: NASA/JPL"
        },
        {
          "title": "El Color de Urano: ¿Por qué es Cyan?",
          "text": "El color azul-verdoso de Urano se debe al metano en su atmósfera. El metano absorbe la luz roja y refleja la azul y verde. Aunque Neptuno tiene más metano, Urano parece más verde y Neptuno más azul, algo que los científicos aún no entienden completamente. Hay una capa de gas desconocido que hace a Urano más opaco que Neptuno, modificando cómo percibimos su color.",
          "image": "https://images-assets.nasa.gov/image/PIA17178/PIA17178~small.jpg",
          "imgCaption": "El distintivo color cyan de Urano, causado por el metano en su atmósfera que absorbe la luz roja. Fuente: NASA/ESA"
        },
        {
          "title": "Futuras Misiones a Urano: Una Prioridad",
          "text": "En 2022, el reporte Decadal Survey de la NASA declaró una misión orbital a Urano como la máxima prioridad de planetología para la próxima década. Una futura misión 'Uranus Orbiter and Probe' enviaría una nave que orbitaría el planeta y soltaría una sonda en su atmósfera. Las lunas de Urano, especialmente Miranda y Ariel, también serán estudiadas en busca de océanos subterráneos.",
          "image": "https://images-assets.nasa.gov/image/ARC-1986-AC86-7000/ARC-1986-AC86-7000~medium.jpg",
          "imgCaption": "Representación artística de la propuesta misión Uranus Orbiter and Probe, la prioridad máxima de NASA para la próxima década. Fuente: NASA"
        }
      ],
      "bibliography": [
        "NASA Voyager 2 Data System Archives (1986).",
        "Smith, B. A., et al. (1986). Voyager 2 in the Uranian System: Imaging Science Results.",
        "Guillot, T. (2005). The interiors of giant planets: Models and outstanding questions."
      ]
    },
    "quizEs": [
      {
        "q": "¿De donde procede científicamente probado el color tan peculiar intensivo azul/celeste superficialmente visto sobre el panorama visible atmosférico visual documentado de Urano?",
        "options": [
          "Por el abundante mar superficial líquido cubriéndole enteramente a forma total",
          "Desde el elemento en gas natural Metano presente interactuante entre las brisas gélidas altas esféricas",
          "Cielos perpetuamente teñidos orgánicos por reflejos auroras permanentes polares colosales"
        ],
        "a": 1
      },
      {
        "q": "¿Por cuál particularidad se singulariza radicalmente notada extrañamente a forma de movimiento general de rotación mecánica Urano relativo hacia la mayoría restante comparada habitante sobre el Sistema Solar?",
        "options": [
          "No posee rotación definida calculable matemáticamente",
          "Posee doble rotación polarizada al inverso simultáneo inalterado asincrónicamente",
          "Eje axial con extremis de inclinación polar colosal rodando horizontal girando de forma de paralela transversal a nivel orbital a lado aparente."
        ],
        "a": 2
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Urano (El Gigante Inclinado)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Rotación Horizontal', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Urano', �qu� funci�n cumple la fase de 'El Sistema de Anillos Negros'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'El Primer Planeta Descubierto por Telescopio'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Urano",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Lunas Literarias de Shakespeare', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Urano' ocurre en 'Radiación Térmica Interna Cero'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Gigante Inclinado'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Urano', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Radiación Térmica Interna Cero', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "neptune",
    "order": 8,
    "titleEn": "Neptune",
    "titleEs": "Neptuno",
    "badge": "Storm Chaser",
    "badgeEs": "Cazador de Tormentas",
    "color": "#3258A6",
    "contentEs": {
      "sections": [
        {
          "title": "Gélido Extremo Periférico Azulado",
          "text": "El astro planetario masivo lejano categorizado oficial mayoritario que delimita e impone colateral frontera inexplorada a las periferias internas finales al confín en nuestra estructura local compartida. Resulta característicamente sombrío, heladizo, enclaustrado infinitamente batallando ráfagas atmosféricas cortantes de tipo extremidades aerodinámicas desproporcionadamente supersónicas letales.",
          "image": "https://images-assets.nasa.gov/image/PIA02220/PIA02220~medium.jpg",
          "imgCaption": "Astro extremo del sistema que oculta huracanes gélidos catastróficos invaluablemente dinámicos."
        },
        {
          "title": "Triunfo de Cálculo en Teoría y Papel ",
          "text": "A nivel histórica su historia posee de origen una faceta notable del todo incomparable. Su confirmación presencial, es decir hallazgos de detección física óptica oficial documentada (Con la ayuda del investigador Johann Galle el año 1846 terrestre calendario civil histórico), ¡Resulto tras predicciones predeterminación y deducción netamente de formula base matemática abstracta analítica prevenida deductiva calculada! Urbain Le Verrier y John Couch postularon las desvíos de Urano pre predichos certeros apuntando de forma concluyente indiscutida ubicación su destino antes de su enfoque por el globo visor de Galileo del cielo cristalino.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA18837/PIA18837~medium.jpg"
        },
        {
          "title": "Tritón y el Vulcanismo Helado",
          "text": "Neptuno posee a Tritón, su satélite más colosal, caracterizado absurdamente por poseer una rotación sincrónica pero retrograda (orbitando al revés respecto al giro neptuniano). Las asombrosas fotos espectrográficas han detectado múltiples géiseres activos, erupciones y conductos que componen un particular sistema de 'Crio-vulcanismo' (Lanzando furiosamente ráfagas de nitrógeno y granito de hielo en lugar de ardiente lava derretida al vacío orbital exterior).",
          "image": "https://images-assets.nasa.gov/image/PIA01285/PIA01285~medium.jpg",
          "imgCaption": "Tritón desafía toda la mecánica solar convencional rotando en un patrón gravitacional inverso."
        },
        {
          "title": "Lluvia de Diamantes en el Núcleo",
          "text": "Se ha teorizado analíticamente a niveles comprobables de experimentación física por astrofísicos moleculares, que las insoportables aplastantes atmósferas y densidades hiper extremas alojadas dentro del infierno térmico gaseoso de su núcleo comprimido actúan implacablemente apretando brutalmente todas las cadenas ricas carbonadas del espectro gaseoso circulatorio del metano inmenso al nivel atómico fusionándolas provocando directamente verdaderas literales e interminables cascadas colosales llovedizas precipitantes densas ráfagas sólidas físicas repletas de diamantes estructuralmente preciosos cayendo directamente al centro global masivo del orbe gigante acuoso inexplorado inalcanzable planetario exterior masivo del Sistema Solar.",
          "image": "https://images-assets.nasa.gov/image/PIA01286/PIA01286~medium.jpg",
          "imgCaption": "Las cadenas químicas se carbonizan bajo presión lloviendo literalmente cristales sólidos hermosos.",
          "style": "normal"
        },
        {
          "title": "El Vórtice Oscuro y Fuga Dinámica",
          "text": "La honorable heroica robótica nave humana bautizada 'Voyager 2' durante el hito cruzante espacial asombroso de sus trayectorias logró enfocar una escalofriante anomalía gigantesca documentada en el manto nublado denso colosal en constante agitación. Conocida simplemente bajo la enigmática temida catalogación 'Mancha Oscura Vórtice Gigante Neptuniano', representando un monstruoso ojo de alta presión devorando sistemas enteras nubes circundantes. No obstante, al dirigir el Telescopio Espacial Hubble apuntar su óptica magistral hacia aquella violenta anomalía tan solo escasos años rotatorios tras la sonda Voyager, dicho masivo remolino de ciclones negros destructivos ya no existía más esfumado desvaneciéndose misteriosamente confirmando la caótica fluidez aerodinámica letal impredecible inmensa viva del manto planetario gaseoso masivo azul gigante exterior del confin perimetral helado alejado fronterizo.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA23004/PIA23004~medium.jpg"
        },
        {
          "title": "Ausencia de Exploradores Propios",
          "text": "Dada la extrema lejanía desmesurada al Sol que experimenta el mundo de Neptuno resulta desgarradoramente irónico comprobar científicamente el asombroso hecho inaudito oficial confirmatorio que a día presente, no existe ni sola misión de tipo explorador orbitante permanente construida financiada por la comunidad inter espacial agencial global abocada únicamente en destripar las verdades absolutas sumergidas misteriosas escondidas debajo las infinitas densas capas glaciales gélidas atmosféricas repletas de cristales letales turbulentas remolinadas violenta y salvajemente resguardando de extremo celo los masivos mares mantos líquidos presurizados eternamente perpetuamente inexplorados oscuramente desconocidos profundos neptunianos misteriosos ocultos silenciosamente bajo ráfagas cegadoras espaciales remanentes eternas.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA00050/PIA00050~small.jpg"
        },
        {
          "title": "El Interior de Neptuno: Gemelo Helado de Urano",
          "text": "Neptuno es también un gigante de hielo como Urano. Su interior tiene un núcleo rocoso, un extenso manto de agua, metano y amoníaco en estado de 'hielo caliente' (sólido por la presión pero a 7,000°C) y una envoltura de gas. A diferencia de Urano, Neptuno emite 2.6 veces más calor del que recibe del Sol, lo que sugiere una fuente de calor interna aún no comprendida.",
          "image": "https://images-assets.nasa.gov/image/PIA01491/PIA01491~medium.jpg",
          "imgCaption": "Estructura interna de Neptuno similar a Urano pero con mayor generación de calor interno. Fuente: NASA"
        },
        {
          "title": "El Campo Magnético de Neptuno: Similar al de Urano",
          "text": "El campo magnético de Neptuno, como el de Urano, está muy inclinado respecto a su eje de rotación (47°) y desplazado del centro del planeta. Esto crea auroras en posiciones inesperadas. La Voyager 2 detectó también cuatro cinturones de radiación distintos alrededor de Neptuno. El origen de estos extraños campos magnéticos en los gigantes de hielo sigue siendo un misterio activo.",
          "image": "https://images-assets.nasa.gov/image/PIA02209/PIA02209~medium.jpg",
          "imgCaption": "La magnetosfera de Neptuno, inclinada y desplazada, crea auroras en posiciones inusuales del planeta. Fuente: NASA/JPL"
        },
        {
          "title": "Tritón: La Luna que Gira al Revés",
          "text": "Tritón, la luna más grande de Neptuno, es única en el Sistema Solar: orbita a Neptuno en sentido contrario a la rotación del planeta (órbita retrógrada). Esto indica que Tritón fue capturado del Cinturón de Kuiper y no se formó junto a Neptuno. Tiene géiseres de nitrógeno activos y una temperatura de -235°C, la más fría registrada en el Sistema Solar. En unos 3,600 millones de años, será destruido por la gravedad de Neptuno.",
          "image": "https://images-assets.nasa.gov/image/PIA00046/PIA00046~small.jpg",
          "imgCaption": "Tritón, la gran luna de Neptuno, con sus géiseres de nitrógeno y superficie de hielo de nitrógeno. Fuente: NASA/JPL/Voyager 2"
        },
        {
          "title": "Los Vientos Más Veloces del Sistema Solar",
          "text": "Neptuno tiene los vientos más rápidos de todos los planetas: pueden alcanzar 2,100 km/h, más rápidos que el sonido en la Tierra. Esto es sorprendente dado que Neptuno recibe muy poca energía solar (900 veces menos que la Tierra). La fuente de energía que impulsa estos vientos es el calor interno del planeta. Las tormentas de Neptuno pueden ser tan grandes como la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA09927/PIA09927~medium.jpg",
          "imgCaption": "Las bandas de nubes de Neptuno y la Gran Mancha Oscura, generadas por los vientos más veloces del Sistema Solar. Fuente: NASA/Voyager 2"
        },
        {
          "title": "La Gran Mancha Oscura: La Tormenta de Neptuno",
          "text": "Cuando la Voyager 2 visitó Neptuno en 1989, descubrió una tormenta enorme llamada la Gran Mancha Oscura, del tamaño de la Tierra, con vientos de 2,100 km/h. Para cuando el Telescopio Hubble la buscó en 1994, había desaparecido. Pero en 1995 apareció una nueva en el hemisferio norte. Las tormentas de Neptuno son pasajeras, a diferencia de la Gran Mancha Roja de Júpiter que lleva siglos.",
          "image": "https://images-assets.nasa.gov/image/PIA18838/PIA18838~medium.jpg",
          "imgCaption": "La Gran Mancha Oscura de Neptuno, una tormenta del tamaño de la Tierra, fotografiada por Voyager 2 en 1989. Fuente: NASA/JPL"
        },
        {
          "title": "La Lluvia de Diamantes en Neptuno",
          "text": "El interior de Neptuno genera uno de los fenómenos más increíbles del Sistema Solar: lluvia de diamantes. El metano en el interior se somete a temperaturas y presiones extremas que rompen las moléculas de carbono y las comprimen en cristales de diamante, que literalmente caen como lluvia hacia el núcleo. En el laboratorio, científicos han recreado estas condiciones y confirmado que los diamantes se forman.",
          "image": "https://images-assets.nasa.gov/image/PIA13054/PIA13054~medium.jpg",
          "imgCaption": "Representación artística de la lluvia de diamantes en el interior de Neptuno, recreada experimentalmente en laboratorio. Fuente: NASA/SLAC"
        },
        {
          "title": "El Descubrimiento Matemático de Neptuno",
          "text": "Neptuno fue el primer planeta descubierto mediante predicción matemática, no por observación casual. En 1845, los matemáticos Urbain Le Verrier (Francia) y John Adams (Reino Unido) calcularon independientemente dónde debía estar un planeta desconocido que perturbaba la órbita de Urano. El astrónomo Johann Galle apuntó su telescopio al lugar predicho el 23 de septiembre de 1846, ¡y ahí estaba Neptuno!",
          "image": "https://images-assets.nasa.gov/image/8910708/8910708~small.jpg",
          "imgCaption": "Neptuno fotografiado por el Telescopio Espacial Hubble. Fue encontrado exactamente donde las matemáticas predicijeron. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "La Sonda Voyager 2 en Neptuno: El Viaje Final",
          "text": "Voyager 2 llegó a Neptuno el 25 de agosto de 1989, doce años después de su lanzamiento. Fue la última visita de una nave espacial a Neptuno y la única hasta hoy. En solo 6 horas de sobrevuelo, Voyager 2 descubrió 6 nuevas lunas, 4 anillos y la Gran Mancha Oscura. Después de Neptuno, Voyager 2 salió del Sistema Solar y hoy, a más de 19,000 millones de km, sigue enviando señales débiles a la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA01287/PIA01287~medium.jpg",
          "imgCaption": "Trayectoria de la sonda Voyager 2 desde su lanzamiento en 1977 hasta su salida del Sistema Solar tras visitar Neptuno. Fuente: NASA/JPL"
        },
        {
          "title": "Los Anillos de Neptuno: Arcas y Guirnaldas",
          "text": "Neptuno tiene 5 anillos tenues nombrados: Galle, Le Verrier, Lassell, Arago y Adams. El anillo Adams es peculiar porque tiene regiones más densas llamadas 'arcos': Libertad, Igualdad y Fraternidad. Estos arcos se mantienen en su lugar gracias a la gravedad de la luna Galatea. Con el tiempo, los arcos se dispersarán y el anillo se igualará.",
          "image": "https://images-assets.nasa.gov/image/PIA15623/PIA15623~small.jpg",
          "imgCaption": "Los anillos de Neptuno fotografiados por Voyager 2, mostrando los arcos brillantes en el anillo Adams. Fuente: NASA/JPL/Voyager 2"
        }
      ],
      "bibliography": [
        "Hubbard, W. B. (1997). Neptune's Deep Chemistry. Science.",
        "Moore, P. (2004). The Data Book of Astronomy. CRC Press.",
        "Cruikshank, D. P. (Ed.). (1995). Neptune and Triton (Vol. 1). University of Arizona Press."
      ]
    },
    "quizEs": [
      {
        "q": "¿Por qué acontecimiento científico documentado Neptuno brilla de forma de orgullo con galardón único destacándolo en la recolección astrofísica académica sobre listados en investigación universal astros conocidos general primarios solares ?",
        "options": [
          "Descubierto analíticamente base abstractamente teórica de forma por medio de la matemática predicción previa pura en papel libreta en lugar de ser primigeniamente de rastreo aleatorio puramente óptico instrumental presencial de visión astronómico.",
          "Resulta siendo primer globo físico inter galáctico habitable descubierto transpasando y rompiendo el margen limites de sol cósmico vecinal interno local",
          "Contiene núcleo vivo alien micro orgánico documentado empíricamente a la superficie estricto confirmando"
        ],
        "a": 0
      },
      {
        "q": "¿Cuál extremo o peculiaridad meteorológicamente medido se cataloga indiscutible en torno general particular climatología mas destacable documentado satélite internauta sondeando sobre de Neptuno ?",
        "options": [
          "Lluvia cristalina permanente calórica hirviente ácida de disolvente en cascada libre por los anillos expuestos exteriores de rotaciones eternas superficiales .",
          "Vientos desmesurados tempestivos ráfagas cortantes turbulentas de magnitudes ciclón supersónicas que aventajan a todos récords documentados de mediciones solares globales referidas registradas.",
          "Aridez máxima extrema donde toda fluctuación climática carece a ser cero paralizado estático sin de presión movientes térmica "
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Neptuno (Gélido Extremo Periférico Azulado)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Triunfo de Cálculo en Teoría y Papel ', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Neptuno', �qu� funci�n cumple la fase de 'Tritón y el Vulcanismo Helado'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Lluvia de Diamantes en el Núcleo'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Neptuno",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Vórtice Oscuro y Fuga Dinámica', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Neptuno' ocurre en 'Ausencia de Exploradores Propios'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Gélido Extremo Periférico Azulado'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Neptuno', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Ausencia de Exploradores Propios', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "pluto",
    "order": 9,
    "titleEn": "Pluto",
    "titleEs": "Plutón",
    "badge": "Dwarf Star",
    "badgeEs": "Estrella Enana",
    "color": "#D1A3B4",
    "contentEs": {
      "sections": [
        {
          "title": "El Valiente Enano Solitario del Límite",
          "text": "Constituido y oficializado estructuralmente a forma de objeto transneptuniano morador perpetuo helado a través vasta sombra en los dominios confines remotos renegados fronterizo general, albergado tras lecho de residuos glaciales inter estelares primitivo a periferia anillado conocido Cinturón formal de los residuos rocosos hielo de Kuiper.",
          "image": "https://images-assets.nasa.gov/image/PIA10107/PIA10107~small.jpg",
          "imgCaption": "Misterioso astro helado re-visitado épicamente por la milagrosa y heroica sonda New Horizons asombrándonos a lo largo por fin presencialmente sin de filtros desenfoques borrosos visual en resolución histórica en 2015 en vuelo límite periférico."
        },
        {
          "title": "Controversia en Definición Categórica",
          "text": "Al someter al escrutinio formal y debatir criterios bajo el margen puramente de la academia internacional regida base universal consenso normativo estricto y en junta histórica Unión evaluativa (IAU asamblea del 2006 terrestre astronómica unificada reguladora), procedió a dictaminarse con dureza recategorizarlo perdiendo así escaño histórico titularidad catalogación de listados de orbe estelar masivo 'Planeta Mayor', relegando estado formal de menor peso en etiqueta nominativa hacia 'Planeta tipo Enano', al no dominar totalmente despejado la influencia o dominio de escombros compartida dentro de los ejes inter orbitales cruzantes del límite masivo.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA18179/PIA18179~medium.jpg"
        },
        {
          "title": "El Corazón Helado (Tombaugh Regio)",
          "text": "Sorprendentemente desafiando todas las expectativas, la misión formal New Horizons fotografió por primera vez a este astro, develando que Plutón no es apenas una bola muerta y hueca, sino un planeta activo en cuestión geológica. Presenta glaciares resbaladizos flotantes de metano hiperdenso, montañas filosas construidas íntegramente en base cristalina de H2O solidificada, y una enorme llanura estéticamente perfilada en forma visual inconfundible de 'Corazón' conocida por el nombre oficial de Región Tombaugh.",
          "image": "https://images-assets.nasa.gov/image/PIA22036/PIA22036~small.jpg",
          "imgCaption": "El lóbulo liso de Plutón revela indicios fascinantes de reciclaje geológico activo sub-superficial."
        },
        {
          "title": "Composición Acuífera Superior",
          "text": "Por extraño que parezca e instintivamente contrario al sentido común en contra del árido mundo rocoso alejado y castigado infinitamente letal por el frio, el análisis masivo compositivo físico de Plutón indica densidades con formales confirmaciones que atesora e integra inmensamente el triple porcentaje voluminoso proporcionalmente global del preciado oro cósmico vital agua biológica que todas reservas enteras hídricas documentadas sumadas de nuestra masiva Tierra azul entera juntas.",
          "image": "https://images-assets.nasa.gov/image/PIA21965/PIA21965~medium.jpg",
          "imgCaption": "Una imagen legendaria donde Plutón porta su inmenso núcleo congelado como Corazón.",
          "style": "normal"
        },
        {
          "title": "Atmósfera Fantasma Sublimante",
          "text": "Un comportamiento exótico espectacular que domina drásticamente su letal entorno atmosférico ocurre dictado fiel por el baile irregular escarpado y lejano ovalado excéntrico extenso inter órbita estelar solar. Al acortar brechas calóricas orbitando mas cerca cálida y amigablemente aproximada del radiador candente Sol la misma capa gaseosa tenue sublimando mágicamente la roca re aparece generando espesa capa densa nitrógeno puro. Acto luego alejándose orbitando en invierno infinito oscurecido masivo la remite congelar precipitante re compactando hielo en la corteza rocosa plana dura.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA21861/PIA21861~small.jpg"
        },
        {
          "title": "El Gigante Vencido por Eris",
          "text": "El exilio controversial famoso categórico plutioniano y ex-comulgador masivo publico mediático controversial de la categoría magna regente a ser enmarcado por siempre Planeta mayor tuvo detonador final causante empírico absoluto inequívoco. Con el hallazgo del cuerpo planetario catalogado formal Eris mas pesado físicamente y macizo anidado igual a él vagando solitario libre profundo perdido y habitante remoto errante vecino del gigante anillo Kuiper en sus confines escombros hielo polvo estela cosmopolita demostró no ser gobernante local total masivo único, empujando la academia unificar las bases de 'Enanos'.",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/PIA21863/PIA21863~medium.jpg"
        },
        {
          "title": "El Interior de Plutón: Un Corazón de Hielo",
          "text": "Plutón tiene un interior más complejo de lo esperado. Su núcleo es probablemente de roca, rodeado de un manto de agua helada. La sonda New Horizons descubrió indicios de un océano subterráneo de agua líquida bajo la famosa región Tombaugh (el corazón). Este océano podría existir porque el calor de la desintegración de elementos radiactivos mantiene el agua sin congelar.",
          "image": "https://images-assets.nasa.gov/image/PIA21860/PIA21860~small.jpg",
          "imgCaption": "La región Tombaugh de Plutón, su característica 'corazón', podría estar sobre un océano de agua líquida subterráneo. Fuente: NASA/Johns Hopkins APL/SwRI"
        },
        {
          "title": "Caronte: La Luna Gigante de Plutón",
          "text": "Caronte, la luna principal de Plutón, es tan grande en relación a Plutón (la mitad de su diámetro) que en realidad forman un sistema doble: ambos orbitan alrededor de un punto en el espacio entre los dos. Caronte tiene 1,212 km de diámetro. Su polo norte tiene una mancha roja oscura llamada 'Mordor Macula', formada por gases de Plutón que migran hacia Caronte y se congelan allí.",
          "image": "https://images-assets.nasa.gov/image/PIA21862/PIA21862~medium.jpg",
          "imgCaption": "Caronte, la gran luna de Plutón, fotografiada por New Horizons mostrando la oscura región polar llamada Mordor Macula. Fuente: NASA/Johns Hopkins APL"
        },
        {
          "title": "El Cinturón de Kuiper: El Hogar de Plutón",
          "text": "Plutón no es un planeta solitario sino el miembro más famoso del Cinturón de Kuiper: una región del Sistema Solar más allá de Neptuno que contiene miles de objetos helados. Hay otros objetos similares o más grandes que Plutón en esta zona: Eris, Makemake, Haumea. Por eso en 2006 la Unión Astronómica Internacional reclasificó a Plutón como 'planeta enano'.",
          "image": "https://images-assets.nasa.gov/image/PIA21864/PIA21864~medium.jpg",
          "imgCaption": "El Cinturón de Kuiper, hogar de Plutón y miles de objetos helados más allá de la órbita de Neptuno. Fuente: NASA/ESA"
        },
        {
          "title": "La Misión New Horizons: El Gran Revelador",
          "text": "New Horizons de NASA fue lanzada en 2006 y llegó a Plutón el 14 de julio de 2015, tras un viaje de 9.5 años y 4,800 millones de km. En solo unas horas de máximo acercamiento reveló que Plutón es geológicamente activo, tiene montañas de hielo de agua de 3,500 m de altura, atmósfera azul y el famoso corazón. Después continuó hacia el Cinturón de Kuiper.",
          "image": "https://images-assets.nasa.gov/image/PIA20465/PIA20465~medium.jpg",
          "imgCaption": "La nave New Horizons de NASA llegó a Plutón en 2015 revelando un mundo sorprendentemente activo y complejo. Fuente: NASA/Johns Hopkins APL"
        },
        {
          "title": "La Región Tombaugh: El Corazón de Plutón",
          "text": "La característica más icónica de Plutón es la región Tombaugh, una llanura en forma de corazón de 1,600 km de longitud. La mitad izquierda (Sputnik Planitia) es una llanura de nitrógeno helado sin cráteres, lo que indica que su superficie tiene menos de 10 millones de años: geológicamente joven. El nitrógeno se mueve como un glaciar lentamente.",
          "image": "https://images-assets.nasa.gov/image/PIA11707/PIA11707~medium.jpg",
          "imgCaption": "La región Tombaugh de Plutón, en forma de corazón, con la llanura de nitrógeno Sputnik Planitia a la izquierda. Fuente: NASA/Johns Hopkins APL/SwRI"
        },
        {
          "title": "La Atmósfera Fugaz de Plutón",
          "text": "Plutón tiene una atmósfera tenue de nitrógeno, metano y monóxido de carbono. Cuando Plutón se acerca al Sol en su órbita elíptica, el hielo superficial se sublima (pasa de sólido a gas) creando esta atmósfera. Cuando se aleja, la atmósfera colapsa y se congela de nuevo. New Horizons fotografió la atmósfera de Plutón como un halo azul brillante iluminado por el Sol.",
          "image": "https://images-assets.nasa.gov/image/PIA19698/PIA19698~small.jpg",
          "imgCaption": "La atmósfera de Plutón vista en contraluz por New Horizons: capas de neblina azulada de metano y nitrógeno. Fuente: NASA/Johns Hopkins APL/SwRI"
        },
        {
          "title": "¿Planeta o Planeta Enano? El Gran Debate",
          "text": "Durante 76 años (1930-2006), Plutón fue el noveno planeta del Sistema Solar. En 2006, la Unión Astronómica Internacional creó la categoría 'planeta enano' y reclasificó a Plutón porque no ha limpiado su órbita de otros objetos. Muchos científicos y el público general siguen considerando a Plutón un planeta. El debate es real: algunos investigadores proponen nuevas definiciones que devolverían a Plutón su estatus planetario.",
          "image": "https://images-assets.nasa.gov/image/PIA19693/PIA19693~small.jpg",
          "imgCaption": "Plutón, fotografiado por New Horizons, sigue siendo el objeto más amado del Sistema Solar a pesar de su reclasificación en 2006. Fuente: NASA"
        },
        {
          "title": "Los Colores de Plutón: Rojo, Azul y Blanco",
          "text": "Plutón tiene una superficie sorprendentemente colorida para un mundo tan frío y lejano. La región Tombaugh es blanca brillante (nitrógeno helado puro). Las regiones más antiguas son marrones y rojizas, coloreadas por tholinas (moléculas orgánicas formadas por la radiación solar sobre metano y nitrógeno). Tiene también montañas azuladas. Esta diversidad de colores indica procesos geológicos activos.",
          "image": "https://images-assets.nasa.gov/image/PIA19858/PIA19858~medium.jpg",
          "imgCaption": "Plutón en color verdadero mostrando la diversidad de su superficie: blanco, rojo y azul. Fuente: NASA/Johns Hopkins APL/SwRI"
        },
        {
          "title": "Plutón y sus Cinco Lunas",
          "text": "Además de Caronte, Plutón tiene cuatro lunas pequeñas: Estigia, Nix, Hidra y Cerbero, todas descubiertas entre 2005 y 2012 mediante el Telescopio Espacial Hubble. Nix e Hidra tumban caóticamente mientras orbitan: giran de forma impredecible. Todas fueron probablemente formadas en un gigantesco impacto similar al que creó la Luna de la Tierra, hace unos 4,000 millones de años.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000410/GSFC_20171208_Archive_e000410~medium.jpg",
          "imgCaption": "El sistema de Plutón con sus cinco lunas: Caronte, Estigia, Nix, Hidra y Cerbero. Fuente: NASA/ESA/Hubble"
        }
      ],
      "bibliography": [
        "Stern, S. A., et al. (2015). The Pluto system: Initial results from its exploration by New Horizons. Science.",
        "Meltzer, M. (2015). The Pluto System After New Horizons. Planetary Science Journal.",
        "IAU (2006). Resolution B5: Definition of a Planet in the Solar System. International Astronomical Union."
      ]
    },
    "quizEs": [
      {
        "q": "¿Conforme actual oficial categorización dictaminada el 2006 qué tipo de titulación oficial cuerpo celeste y de designación estatus ostenta Plutón en catálogos?",
        "options": [
          "Gran Orbe Exoplaneta masivo foráneo del externo cosmos libre gravitacional ",
          "Oficialmente Estrellado Sol menor congeladamente en inactividad termo binario sin chispa apagado",
          "Cuerpo Astro rocoso hielo categorizado científicamente definido a Planeta de formato Enano delimitado a orbita externa Cinturón formal espacial"
        ],
        "a": 2
      },
      {
        "q": "¿A qué región espacial colosal se atribuye referenciado que está insertado geolocalicemos en origen residencia al orbe transneptuniano Plutón vagando perpetua sombra helando?",
        "options": [
          "Rueda anillos Saturnina orbita cruzada anillo",
          "La nube interestelar interior de colisiones ígneas inter magnéticas radiadas",
          "Anillo exterior masivo glacial escombro restos primitivo referido como el Cinturón Kuiper fronterizo perimetral"
        ],
        "a": 2
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Plutón (El Valiente Enano Solitario del Límite)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Controversia en Definición Categórica', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Plutón', �qu� funci�n cumple la fase de 'El Corazón Helado (Tombaugh Regio)'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Composición Acuífera Superior'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Plutón",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Atmósfera Fantasma Sublimante', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Plutón' ocurre en 'El Gigante Vencido por Eris'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Valiente Enano Solitario del Límite'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Plutón', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Gigante Vencido por Eris', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "black_hole",
    "order": 10,
    "titleEn": "Black Hole",
    "titleEs": "Agujero Negro",
    "badge": "Singularity",
    "badgeEs": "Singularidad",
    "color": "#FF6B00",
    "contentEs": {
      "sections": [
        {
          "title": "El Monstruo Invisible",
          "text": "¡Acompáñame a ver el mayor misterio del universo! Imagina que comprimimos tanta masa en un espacio tan pequeño que su fuerza de gravedad se vuelve absolutamente irresistible. Se crea un abismo en el espacio tan inmenso que ni siquiera la luz, que viaja a 300,000 km por segundo, puede escapar de su red cósmica. Ese es un verdadero Agujero Negro.",
          "image": "https://images-assets.nasa.gov/image/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o~medium.jpg",
          "imgCaption": "El misterioso centro absoluto de la gravedad universal donde todo se apaga."
        },
        {
          "title": "El Horizonte de Eventos",
          "text": "¡Cuidado comandante! Todo agujero negro posee una frontera que no puedes ver llamada 'Horizonte de Eventos'. Es literalmente una zona de no retorno; un paso en falso hacia adentro, y nunca volveremos a brillar o salir. Si viéramos a alguien llegar al borde, el extraño comportamiento de la gravedad haría que lo viéramos moverse en cámara súper lenta hasta congelarse ante nuestros ojos.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000386/GSFC_20171208_Archive_e000386~medium.jpg"
        },
        {
          "title": "La Divertida y Fatal Espaguetización",
          "text": "Si cayeras dentro (¡ojalá no pase!), la gravedad jalando de tus botas a la fosa sería muchísimo más violenta y fuerte que la fuerza jalando de tu cabeza o casco cósmico. El estiramiento de tu cuerpo y nave sería inmenso. Y nosotros los científicos tenemos sentido del humor: ¡Decidimos darle a este aterrador destino el nombre de Espaguetización cósmica!",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000984/GSFC_20171208_Archive_e000984~medium.jpg",
          "imgCaption": "Una nave espaguetizada perdiendo batalla contra la atracción astronómica.",
          "style": "normal"
        },
        {
          "title": "Punto Cero: La Singularidad",
          "text": "Tras la espaguetización, llegarás finalmente hasta el infinito centro matemático donde todos los escombros cósmicos se empujan: 'La Singularidad'. Es un punto exacto en el espacio con un tamaño minúsculo pero asfixiantemente pesado de forma colosal, y es aquí en donde las reglas de gravedad se evaporan. Aquí, ¡la ciencia misma y el tiempo se rompen amistosamente!",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001097/GSFC_20171208_Archive_e001097~small.jpg"
        },
        {
          "title": "Sombra Capturada en Foto Real",
          "text": "Durante décadas solo imaginábamos hermosos monstruos rotativos al pizarrón, pero gracias a los potentes observadores humanos terrestres, ¡en 2019 tomamos la primera fotografía! Observamos asombrosos chorros de radiación, gases hirviendo a millones de grados, todo rotando fugazmente veloz en un disco abrazador rojo alrededor de una silenciosa, bella y oscura burbuja esférica.",
          "image": "https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg",
          "imgCaption": "Una recreación vibrante inspirada en la y gigantesca foto real.",
          "style": "normal"
        },
        {
          "title": "Música Invisible de Agujeros Chocando",
          "text": "Cuando dos oscuros y asombrosos Agujeros se acercan, se envuelven en una danza loca y estrepitosamente giran muy apretados y en espiral hasta que ¡pum!, ¡impactan de golpe! Chocan sin emitir nada de sonido, pero arrugan bruscamente el tejido del océano estelar, arrojando 'Ondas Gravitacionales' que se mecen como ligeras olas hasta acariciarnos la Tierra y nuestras máquinas.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001102/GSFC_20171208_Archive_e001102~medium.jpg"
        },
        {
          "title": "Cómo Nace un Agujero Negro",
          "text": "Un agujero negro estelar se forma cuando una estrella masiva (más de 20 veces el Sol) agota su combustible y su núcleo colapsa en décimas de segundo bajo su propia gravedad. La explosión resultante se llama supernova. Lo que queda es un punto de densidad infinita llamado singularidad, rodeado de un horizonte de sucesos desde donde nada puede escapar, ni siquiera la luz.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001100/GSFC_20171208_Archive_e001100~medium.jpg",
          "imgCaption": "Representación artística de la formación de un agujero negro tras la explosión de una supernova. Fuente: NASA/CXC"
        },
        {
          "title": "Tipos de Agujeros Negros",
          "text": "Existen tres tipos principales: los estelares (3-100 masas solares), los de masa intermedia (100-100,000 masas solares) y los supermasivos (millones o miles de millones de masas solares). En el centro de casi todas las galaxias hay un agujero negro supermasivo. El de la Vía Láctea se llama Sagitario A* y tiene 4 millones de masas solares.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001099/GSFC_20171208_Archive_e001099~medium.jpg",
          "imgCaption": "Los tres tipos de agujeros negros: estelar, masa intermedia y supermasivo. Fuente: NASA/ESA"
        },
        {
          "title": "El Horizonte de Sucesos",
          "text": "El horizonte de sucesos es la 'frontera invisible' de un agujero negro. Una vez que la materia o la luz cruzan este límite, ya no pueden escapar. El tamaño del horizonte depende de la masa: un agujero negro de la masa del Sol tendría un horizonte de apenas 3 km de radio. El horizonte de Sagitario A* mide 12 millones de km.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001098/GSFC_20171208_Archive_e001098~medium.jpg",
          "imgCaption": "Diagrama del horizonte de sucesos de un agujero negro: el punto de no retorno para materia y luz. Fuente: NASA"
        },
        {
          "title": "La Espaguetización",
          "text": "Si caes hacia un agujero negro, la diferencia gravitacional entre tu cabeza y tus pies sería tan extrema que serías estirado como espagueti, un proceso llamado espaguetización. Cerca de agujeros negros pequeños esto ocurriría antes de cruzar el horizonte; en agujeros supermasivos, cruzarías el horizonte sin sentir nada y solo después serías estirado.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001101/GSFC_20171208_Archive_e001101~small.jpg",
          "imgCaption": "Representación artística de la espaguetización: el estiramiento extremo de materia al caer en un agujero negro. Fuente: NASA/ESA"
        },
        {
          "title": "La Radiación de Hawking",
          "text": "En 1974, el físico Stephen Hawking predijo que los agujeros negros no son completamente negros: emiten una radiación térmica muy débil llamada Radiación de Hawking. Esto ocurre por efectos cuánticos cerca del horizonte de sucesos. Esta radiación hace que los agujeros negros pierdan masa muy lentamente y eventualmente se evaporen en tiempos astronómicamente largos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.2040824162078867",
          "imgCaption": "Stephen Hawking predijo en 1974 que los agujeros negros emiten radiación y eventualmente se evaporan. Fuente: NASA/CXC"
        },
        {
          "title": "Sagitario A*: Nuestro Agujero Negro",
          "text": "En el centro de la Vía Láctea, a 26,000 años luz de la Tierra, hay un agujero negro supermasivo llamado Sagitario A* con 4 millones de masas solares. En 2022, el Event Horizon Telescope captur? su primera imagen directa. Las estrellas cercanas orbitan Sagitario A* a velocidades de hasta 30 millones de km/h.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9187036091827727",
          "imgCaption": "Primera imagen de Sagitario A*, el agujero negro en el centro de la Vía Láctea, capturada por el Event Horizon Telescope en 2022. Fuente: EHT/NSF"
        },
        {
          "title": "La Primera Fotografía de un Agujero Negro",
          "text": "El 10 de abril de 2019, el Event Horizon Telescope public? la primera imagen de un agujero negro: M87*, ubicado en el centro de la galaxia Messier 87, a 55 millones de años luz. Tiene 6,500 millones de masas solares. La imagen fue creada combinando señales de radio de 8 radiotelescopios en todo el mundo.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.2068537380448865",
          "imgCaption": "Primera imagen histórica de un agujero negro, M87*, publicada el 10 de abril de 2019. Fuente: Event Horizon Telescope Collaboration"
        },
        {
          "title": "Los Discos de Acreción",
          "text": "Cuando gas y polvo caen hacia un agujero negro, no caen directamente: forman un disco giratorio llamado disco de acreción. El material se calienta por fricción hasta millones de grados y emite rayos X. Esta es la razón por la que los agujeros negros, aunque no emiten luz propia, pueden ser los objetos más brillantes del universo.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9441468932046071",
          "imgCaption": "Representación artística de un disco de acreción calentado a millones de grados alrededor de un agujero negro. Fuente: NASA/ESA"
        },
        {
          "title": "Los Agujeros Negros y el Tiempo",
          "text": "La relatividad general de Einstein predice que la gravedad extrema de un agujero negro ralentiza el tiempo: cerca del horizonte, el tiempo transcurre más lento que lejos. Esto se llama dilatación temporal gravitacional. Si pudieras orbitar un agujero negro durante 1 hora y regresar, podrían haber pasado años en la Tierra. Esta no es ciencia ficción: los satélites GPS deben corregir este efecto.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4792284667074995",
          "imgCaption": "La dilatación temporal gravitacional: el tiempo transcurre más lento cerca de un agujero negro masivo. Fuente: NASA/ESA"
        }
      ],
      "bibliography": [
        "Hawking, S. (1988). Historia del Tiempo.",
        "Kip Thorne (2014). La Ciencia de Interestelar."
      ]
    },
    "quizEs": [
      {
        "q": "¿Científicamente qué viaja tan rápido que es capaz de huir y no ser devorado atrapado a las fauces inmensas asombrosas y letales del Agujero Oscuro al cruzar el veloz margen Horizonte?",
        "options": [
          "Rayos invisibles sónicos audibles de luz láser.",
          "Efectivamente y letalmente ninguna luz por más fotónica logra superarlo escapando al umbral oscuro mortal y denso.",
          "Vapores o radiaciones y polvos brillantes impulsivos veloces."
        ],
        "a": 1
      },
      {
        "q": "¿Cómo apodan, llaman, divierten riendo y señalan bautizan la muerte del cuerpo al ser tirado o asfixiado extremo estirando al asombroso y pesado corazón del fúnebre agujero?",
        "options": [
          "Súper Desintegración Sónica .",
          "Despedazamiento Cristalizado y Fotónico Múltiple",
          "Asfixiante y muy cómica Espaguetización elástica asombrándonos a tirones divertidos mortales inmensos espaguetizados."
        ],
        "a": 2
      },
      {
        "q": "¿Cuál parte, sección, corazón, pedazo astronómico interior y abismal y loco extremo rompe destrozando frágilmente leyes y teorías de la famosa y metódica ciencia que rige nuestro bello universo brillante rompiendo?",
        "options": [
          "La minúscula súper brillante densificada y minúscula y enigmática Singularidad masiva sin medida ni sentido aplastado.",
          "Su frontera rotacional mágica exótica inmensa bordeante magnética gigante.",
          "El gas rojizo plasma brillante hirviendo exótico ardiente rodeante en furiosos y exóticos tornados locos abrasadores y ardientes plasmas rojizos al rededor asombrosos en llamas."
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Agujero Negro (El Monstruo Invisible)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'El Horizonte de Eventos', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Agujero Negro', �qu� funci�n cumple la fase de 'La Divertida y Fatal Espaguetización'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Punto Cero: La Singularidad'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Agujero Negro",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Sombra Capturada en Foto Real', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Agujero Negro' ocurre en 'Música Invisible de Agujeros Chocando'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Monstruo Invisible'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Agujero Negro', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Música Invisible de Agujeros Chocando', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "quasar",
    "order": 11,
    "titleEn": "Quasar",
    "titleEs": "Cuásar",
    "badge": "Hyperactive Core",
    "badgeEs": "Faro Cósmico",
    "color": "#00E4FF",
    "contentEs": {
      "sections": [
        {
          "title": "Un Banquete Demasiado Rápido",
          "text": "¡Siéntate y ponte lentes de sol, vamos al objeto más deslumbrante que encontrarás en todo tu largo viaje! Un Cuásar no es una nueva especie ni milagrosa; es en realidad una galaxia distante cuyo rey (el súper Agujero Negro del centro) ha decidido alimentarse bestial, hambrienta y extremadamente rápido atascándose asfixiable de todas las nubes galácticas vecinas y rocas a su largo camino brillante.",
          "image": "https://images-assets.nasa.gov/image/PIA10091/PIA10091~small.jpg",
          "imgCaption": "Atrapando tantas lunas, planetas y polvo al atracón provocando fuego cósmico."
        },
        {
          "title": "Furia y Eructos Cósmicos",
          "text": "Al atragantarse bestialmente sin freno en un atracón incontrolable y exótico devorador el pobre agujero produce poderosos destellos colosales, casi escupiendo furiosamente delgadas asombrosas y letales varitas y luces inmensas al lejano universo: Los científicos las comparan con impresionantes 'Chorros Láser' y nos muestran exactamente hasta qué galaxias o polos viajan incesantes como poderosas estelas brillosas cósmicas veloces fotónicas.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA23410/PIA23410~medium.jpg"
        },
        {
          "title": "Faros Creadores de Viajes en el Tiempo",
          "text": "Nuestros potentes observatorios desde Tierra pueden fotografiar admirando su espectacular brillante luz a la inimaginable colosal y abismal extrema y lejana distancia de miles de trillones espaciales. Piénsalo, debido a esto al tomar un bonito retrato asombroso en telescopio de estos gigantes veloces, estamos realmente observando, asombrados, al primitivo naciente bello viejo universo bebé, porque el mágico reflejo de foto luminosa tomó abismal gigante y lenta distancia llegar asombro.",
          "image": "https://images-assets.nasa.gov/image/hubble-sees-elegant-spiral-hiding-a-hungry-monster_22037110968_o/hubble-sees-elegant-spiral-hiding-a-hungry-monster_22037110968_o~medium.jpg",
          "imgCaption": "El faro gigante del inmenso y lejano cosmos.",
          "style": "normal"
        },
        {
          "title": "Tiempos Tranquilos para la Vía Láctea",
          "text": "Por fortuna y heroica salvación y existencia, en nuestra misma casa espacial, la pacífica hermosa galaxia Vía Láctea inmensa espiral sosegada y callada, poseemos escondido durmiendo al mismísimo gigante, pero este súper Agujero Negro está feliz y reposando tranquilo. ¿Y sabes?, nosotros al asombroso y oscuro gigante reposado pudimos estar envueltos en fuego encendido asombroso destellante en tiempos locos del pasado.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/8911183/8911183~medium.jpg"
        },
        {
          "title": "El Destello Insaciable de Magma Espacial",
          "text": "Un cuásar, exótico inmenso como suena loco brillante y masivamente activo devorador, solo logra encender y desatar inmensa letal el caos y luz mientras haya mucha comida o comida suculenta sabrosa de estrellas lejanas. Giran veloz colisionan rozan frotan y crean calórico friccionar como chispas encendidas creando enormes majestuosos anillos giratorios que eclipsan ciegan asfixiando estéticamente luz de su galaxia entera.",
          "image": "https://images-assets.nasa.gov/image/PIA20057/PIA20057~medium.jpg",
          "imgCaption": "Su fricción de hambre cósmica brilla más que mil estrellas en su mismo punto denso de gravedad oscura y aplastada.",
          "style": "normal"
        },
        {
          "title": "Se Apagan las Luces",
          "text": "Finalmente cuando logran empíricamente arrasar robar tragar devorar y limpiar totalmente sus exóticos asombrosos bellos barrios vecinos espaciales limpios de comida flotante. Ellos se acuestan a dormir pacíficamente volviéndose y logrando calmar regresando serenamente convertidos en estáticas y pacíficas bellas aburridas apacibles bellas calladas silenciosas y amables dormilonas asombrosas y mudas esferas oscuras que solo vigilan la inmensidad dormida espacial galáctica.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/9705914/9705914~medium.jpg"
        },
        {
          "title": "?Qu? es un Cuásar?",
          "text": "Un cuásar (Quasi-Stellar Object) es el núcleo activo de una galaxia lejana alimentado por un agujero negro supermasivo que devora cantidades masivas de materia. Al caer, esta materia forma un disco de acreción que emite enormes cantidades de energía en todas las frecuencias del espectro electromagnético. Un solo cuásar puede brillar más que 100 galaxias completas juntas.",
          "image": "https://images-assets.nasa.gov/image/9010026/9010026~medium.jpg",
          "imgCaption": "Representación artística de un cuásar: el núcleo activo de una galaxia antigua con un agujero negro supermasivo. Fuente: NASA/ESA"
        },
        {
          "title": "Los Cuásares más Lejanos",
          "text": "Los cuásares son los objetos más lejanos observables en el universo. Los más distantes se ven como eran cuando el universo tenía menos de 1,000 millones de años. Al observar un cuásar lejano, vemos el universo joven. En 2021 se descubri? J0313-1806, el cuásar más lejano conocido, a 13,030 millones de años luz, cuando el universo tenía solo 670 millones de años.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000539/GSFC_20171208_Archive_e000539~medium.jpg",
          "imgCaption": "J0313-1806, el cuásar más lejano conocido, existi? cuando el universo tenía solo 670 millones de años. Fuente: NOIRLab/NSF/AURA"
        },
        {
          "title": "Los Choros Relativistas",
          "text": "Algunos cuásares emiten enormes choros (jets) de plasma a casi la velocidad de la luz desde sus polos magnéticos. Estos jets pueden extenderse millones de años luz. El cuásar 3C 273, el primero identificado en 1963, tiene un jet visible incluso con telescopios medianos. Estos jets redistribuyen energía por toda la galaxia huésped, afectando la formación de estrellas.",
          "image": "https://images-assets.nasa.gov/image/9128663/9128663~medium.jpg",
          "imgCaption": "El jet relativista del cuásar M87 extendiéndose miles de años luz, fotografiado por el Telescopio Hubble. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "La Energía de un Cuásar",
          "text": "Los cuásares son los objetos más energéticos del universo. El más brillante conocido, J0529-4351, brilla con la potencia de 500 billones de soles. Esta energía proviene de la conversión de masa en energía cuando la materia cae al agujero negro: es el proceso de conversión más eficiente del universo (10-40%), mucho más que la fusión nuclear (0.7%).",
          "image": "https://images-assets.nasa.gov/image/KSC-99pp0709/KSC-99pp0709~medium.jpg",
          "imgCaption": "Imagen ultravioleta del cuásar 3C 273, el primero identificado y aún uno de los más brillantes del cielo. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "Cuásares como Faros Cósmicos",
          "text": "Los cuásares son tan brillantes que se pueden ver a través de casi todo el universo observable. Los astrónomos los usan como faros de referencia para medir distancias cósmicas y estudiar el gas intergaláctico entre nosotros y ellos. También ayudan a medir la expansión del universo. Son herramientas fundamentales de la cosmología moderna.",
          "image": "https://images-assets.nasa.gov/image/KSC-99pp0708/KSC-99pp0708~medium.jpg",
          "imgCaption": "Los cuásares sirven como faros cósmicos para medir distancias y estudiar la estructura del universo. Fuente: ESA/Hubble"
        },
        {
          "title": "Los Cuásares y los Agujeros Negros Supermasivos",
          "text": "Todo cuásar est? alimentado por un agujero negro supermasivo. Cuando el agujero negro consume suficiente material para brillar como cuásar, se llama AGN (Núcleo Galáctico Activo). El agujero negro de nuestro cuásar galáctico pasado (la Vía Láctea fue cuásar hace miles de millones de años) hoy es el tranquilo Sagitario A*.",
          "image": "https://images-assets.nasa.gov/image/9702743/9702743~medium.jpg",
          "imgCaption": "Los cuásares son núcleos galácticos activos: agujeros negros supermasivos en plena fase de alimentación. Fuente: NASA/ESA"
        },
        {
          "title": "Detectando Cuásares con Radiotelescopios",
          "text": "Los cuásares fueron descubiertos en los años 1960 porque emiten ondas de radio intensas. Los radiotelescopios como el Very Large Array (VLA) en Nuevo México o el FAST chino (500 m de diámetro, el mayor del mundo) son clave para detectarlos. El cuásar 3C 273 fue identificado por Maarten Schmidt en 1963 al medir su corrimiento al rojo.",
          "image": "https://images-assets.nasa.gov/image/9702655/9702655~medium.jpg",
          "imgCaption": "El radiotelescopio Very Large Array (VLA) de NRAO, una herramienta clave para detectar cuásares. Fuente: NRAO/AUI/NSF"
        },
        {
          "title": "Microcuásares en la Vía Láctea",
          "text": "Además de los cuásares galácticos distantes, existen 'microcuásares' dentro de nuestra propia galaxia. Son sistemas binarios donde un agujero negro estelar devora material de una estrella compañera y también emite jets relativistas. SS 433 es el microcuásar más famoso: sus jets viajan al 26% de la velocidad de la luz.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7068027555586184",
          "imgCaption": "SS 433, un microcuásar en la Vía Láctea, con jets relativistas al 26% de la velocidad de la luz. Fuente: NASA/Chandra"
        },
        {
          "title": "El Legado de los Cuásares para la Ciencia",
          "text": "El estudio de los cuásares transform? nuestra comprensión del cosmos. Demostraron que el universo joven era radicalmente diferente al actual, apoyando el modelo del Big Bang. Revelaron que los agujeros negros supermasivos coevolucionaron con sus galaxias. Cada cuásar es una ventana al pasado del universo que nos ayuda a reconstruir la historia del cosmos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6278921882082845",
          "imgCaption": "Mapa de miles de cuásares catalogados, mostrando la distribución de AGNs en el universo observable. Fuente: ESA/Gaia/DPAC"
        }
      ],
      "bibliography": [
        "Astrophysics Space Journal (1998)."
      ]
    },
    "quizEs": [
      {
        "q": "¿En verdad qué misteriosa e exótica, extraña , inmensa entidad asfixiantemente destructiva tritura alimenta en secreto un veloz e inmenso luz radiante cuásar brillante enigmático galáctico destellante astronómico deslumbrante atronador ciego devorador extremo letal inmensamente enorme abismal de luz intensa radiante espacial cósmico ruidoso gigante atroz desorden brillante abrumador?",
        "options": [
          "Púlsares rítmicos magnéticos destellantes rápidos fotónicos estelares moribundos giratorias súper estrellas exóticas.",
          "Gigantescas y majestuosas estrellas rojas ardientes viejas moribundas ancianas apagadas solitarias asombrosas hermosas estáticas silenciosas de ahorro energético eterno exóticas pasivas pacíficas extinguidas perezosas lejanas inmensas exoplanetas fríos rocosos enanos fríos helados solitarios amigables rojas cálidas exóticas de tamaño diminuto galáctico en la vida eterna longeva biológicas ancianas estéticas inmensas hermosas viejitas estelares en el cielo maravilloso pasivas calientes de rojo apagado frágiles apagadas y bellas moribundas pero ardientes solitarias calmas quietas rocosas de universo apagar en cosmos exóticas inmensamente asfixiadamente asombrosas diminutas radiantes.",
          "Un inmenso súper agujero negro comelón súper asfixiante negro oscuro bestial estelar insaciablemente comiendo atragantándose rocas galácticas súper estrellas locamente en inmensa trituradora gigante."
        ],
        "a": 2
      },
      {
        "q": "¿Hacia qué pacífico rincón destino final apaciguado regresan al agotar comer acortando pacíficamente callando de limpiar el devorar tragadas galaxias estrellas exóticas completas enigmáticos y desastrosos masivos cuásares inmensos destellantes extintores exóticos atronadores y destructivos locos veloces gigantes oscuros tragando engullendo hambrientos furiosos violentos atracones cósmicos asombrosos en fúnebre silencio?",
        "options": [
          "Siguen y continúan consumiendo atracón destruyendo galaxias enteras vacías abismos espaciales universos infinitos para seguir tragando veloz destruyendo implacablemente explotando sin frenos jamás ni se quedan pacíficos nunca en silencio ni estáticos cósmicos.",
          "Retornan pacíficos calmados dormidos sosegados ocultos apagados regresando en galaxias solitarias pacíficas normales silenciosas inofensivas amigas normales apagados inmortales inofensivas y muertas y tranquilas dormitadas calmas estáticas asfixiadas lejanas asombrosísimas y tranquilísimas ocultas mudas calladas hermosas calmadas asombrosas estéticas bellas galaxias en infinito maravillas sin caos en la vida.",
          "Se tragan y engullen asfixiantemente locos la luz cósmica colapsando y rompiendo el loco exótico tejido universo espaguetizados fracturando partiendo todo en el infinito estelar tiempo rompiendo atajos asombrosos saltando en la era espacio desastrosos caos agujero asombroso portal letal exótico mortal trampa y atajo temporal cerrando letal mudo cósmico pasillo fúnebre."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Cuásar (Un Banquete Demasiado Rápido)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Furia y Eructos Cósmicos', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Cuásar', �qu� funci�n cumple la fase de 'Faros Creadores de Viajes en el Tiempo'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Tiempos Tranquilos para la Vía Láctea'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Cuásar",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Destello Insaciable de Magma Espacial', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Cuásar' ocurre en 'Se Apagan las Luces'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Un Banquete Demasiado Rápido'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Cuásar', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Se Apagan las Luces', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "pulsar",
    "order": 12,
    "titleEn": "Pulsar",
    "titleEs": "Púlsar",
    "badge": "Neutron Star",
    "badgeEs": "Estrella de Neutrones",
    "color": "#B000FF",
    "contentEs": {
      "sections": [
        {
          "title": "¡Danza Giratoria Cósmica!",
          "text": "Piensa en el corazón de un hermoso Sol, luego aplástalo imaginariamente de manera inmensa hasta forzar toda esa cantidad bestial cósmica de tierra caliente en el tamaño de una aburrida y pequeña ciudad plana y redonda como nuestro vecino municipio. Esa estrella muerta será súper hiper dura de romper pero rotará, brincará de asfixia y bailará furiosamente girando locamente como trompo loco a miles y cientos giros rápidos relámpagos asombrosos en tan solo el segundo en que chasqueas el dedo. Ese es un veloz ruidoso Púlsar.",
          "image": "https://images-assets.nasa.gov/image/PIA23863/PIA23863~medium.jpg",
          "imgCaption": "Estrellas comprimidas con ritmos estables."
        },
        {
          "title": "Los Latidos de Reloj",
          "text": "Un Púlsar mágico y rápido, tiene dos misteriosos faroles como linternas potentes en sus extremos, sus asombrosos campos magnéticos poderosos y al rodar en milésimas veloces fotónicas, nos apunta amablemente como rítmicamente hace una bella linterna parpadeando luz destellando de manera hermosa repetida como: 'tic', 'tac', exactos como el latido de un rápido juguetón corazón, amigable y brillante al ojo fotónico radiante como asfixiada maravilla matemática estelar rotacional constante fotónica luz veloz.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA18845/PIA18845~medium.jpg"
        },
        {
          "title": "Peso que Rompe Biológicas",
          "text": "Si viajas a recolectar esa compactada masivamente arena de Púlsar y guardaras tiernamente exóticamente arenilla diminuta de una mínima cucharadita mágica y exótica cucharita rocosa a llevártela a la bella pacífica y soleada feliz Tierra para presumir con tus valientes amigables asombrosos astronautas infantiles, tu insignificante frívola cucharita pesaría en báscula como mil maravillosas lejanas montañas gigantes colosales terrestres pesadas de piedra exótica y ruidosas masas asombrosas montañosas asombrosas de roca fría masiva brutal incomprensible.",
          "image": "https://images-assets.nasa.gov/image/PIA18843/PIA18843~medium.jpg",
          "imgCaption": "Material comprimido que destroza los medidores terrestres ordinarios.",
          "style": "normal"
        },
        {
          "title": "El Fantástico Viaje Extremo Infinito Navegar",
          "text": "Al ser tan exageradamente precisos y tan milimétricamente exactos bailando relojeros locos girando sin detener su reloj fotónico atómico, el farol de radiante luz espacial constante repetido sirve como guías perfectas. Como el brújulo del marino y GPS, en el distante asombroso maravilloso mágico viaje a las misteriosas asombrosas maravillosas remotas distantes lejanas hermosas e asombrosas lejanísimas estrellas oscuras brillantes galaxias maravillosas los exploradores naves se ubican leyendo orientando su exótico asombroso camino gracias rítmica de maravillosas púlsares amistosas exactas guías.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA21085/PIA21085~medium.jpg"
        },
        {
          "title": "Tiemblan Hasta las Estrellas Rompen Estelares",
          "text": "Aun así, a veces su impenetrable caparazón costra congelada gruesa letal dura exótica mágica coraza metálica exótica magnética pesada costra esférica estelar choca cruje cede revienta ruidosa o se fractura con el pesado frío estrés inmenso. Pasan bellos asombrosísimos locos temblores cósmicos llamados por nosotros amablemente: Trágicos bellos locos Estelares Terremotos y vibras rompiendo la paz estática un latido loco fugaz atónito rompiendo la relojera de pulsos reloj exacto bello ritmo pacífico perfecto parpadeo.",
          "image": "https://images-assets.nasa.gov/image/astronomers-find-the-first-wind-nebula-around-a-rare-ultra-magnetic-neutron-star_27744663791_o/astronomers-find-the-first-wind-nebula-around-a-rare-ultra-magnetic-neutron-star_27744663791_o~medium.jpg",
          "imgCaption": "Liberación abrupta de tensión en una costra densa cósmica.",
          "style": "normal"
        },
        {
          "title": "Los Faros Intocables Mortales Cósmicos",
          "text": "Mágicos hermosos asombrosos preciosos exactos rítmicos amigables bellos preciosos pero exóticos locos asfixiantes aplastantes pesados asombrosos y hermosos bellos destellantes lejanos púlsares, un gran bello asombro lejano intocables por los radiantes campos letales tóxicos bellamente exóticos magnéticos destructivos que matan aplastan congelan radiación esterilizan desintegran veloz locamente cualquier linda y tierna y valiente frágil amada pequeña asfixiada nave espacial exploratoria terrenal hermosa intentando atracar abrazar acoplar visitar el asombroso fúnebre suelo rocoso muerto congelado de maravilla extremo asombroso peso abismal bello faro muerto giratorio eterno lejanísimo bello faro.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/9905980/9905980~medium.jpg"
        },
        {
          "title": "El Nacimiento de un Púlsar",
          "text": "Un púlsar nace en la explosión de supernova de una estrella de 8-20 masas solares. El núcleo colapsa en una estrella de neutrones de apenas 20 km de diámetro pero con 1.4 veces la masa del Sol: un centímetro cúbico de su material pesa 100 millones de toneladas. Si rota rápido y su eje magnético apunta hacia la Tierra, lo vemos como un púlsar.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000279/GSFC_20171208_Archive_e000279~medium.jpg",
          "imgCaption": "Representación artística del nacimiento de un púlsar en la explosión de una supernova. Fuente: NASA/CXC"
        },
        {
          "title": "El Primer Púlsar: LGM-1",
          "text": "En 1967, la astrónoma Jocelyn Bell detect? una señal de radio que pulsaba exactamente cada 1.3373 segundos. Era tan regular que inicialmente bromearon llamándola LGM-1 (Little Green Men). Era el primer púlsar descubierto: la estrella de neutrones PSR B1919+21. Bell y su supervisor Anthony Hewish ganaron el Premio Nobel de Física en 1974 por este descubrimiento.",
          "image": "https://images-assets.nasa.gov/image/PIA22569/PIA22569~medium.jpg",
          "imgCaption": "Representación del primer púlsar descubierto, PSR B1919+21, detectado por Jocelyn Bell en 1967. Fuente: NRAO"
        },
        {
          "title": "Los Púlsares de Milisegundo",
          "text": "Los púlsares de milisegundo rotan cientos de veces por segundo. El más rápido conocido, PSR J1748-2446ad, rota 716 veces por segundo: su ecuador viaja al 24% de la velocidad de la luz sin desintegrarse. Estos púlsares se forman cuando una estrella de neutrones absorbe material de una estrella compañera, aumentando su velocidad de rotación.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001984/GSFC_20171208_Archive_e001984~small.jpg",
          "imgCaption": "Representación artística de un púlsar de milisegundo girando cientos de veces por segundo. Fuente: NASA/CXC"
        },
        {
          "title": "Los Púlsares como Relojes del Universo",
          "text": "Los púlsares son los relojes más precisos del universo. Algunos son más regulares que los mejores relojes atómicos terrestres. Los astrónomos usan redes de púlsares de milisegundo como detectores de ondas gravitacionales de baja frecuencia: cuando una onda gravitacional pasa, altera muy ligeramente los tiempos de llegada de los pulsos.",
          "image": "https://images-assets.nasa.gov/image/0200208/0200208~medium.jpg",
          "imgCaption": "Red de púlsares de milisegundo usados como detectores de ondas gravitacionales de baja frecuencia. Fuente: NANOGrav/NASA"
        },
        {
          "title": "Los Magnetares: Púlsares Extremos",
          "text": "Los magnetares son estrellas de neutrones con campos magnéticos 1,000 veces más fuertes que los púlsares normales: los campos magnéticos más intensos del universo conocido. Ocasionalmente liberan enormes llamaradas de rayos gamma. En 2004, un magnetar a 50,000 años luz liber? tanta energía en 0.2 segundos como el Sol en 250,000 años.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000042/GSFC_20171208_Archive_e000042~medium.jpg",
          "imgCaption": "Representación artística de un magnetar emitiendo una llamarada de rayos gamma. Fuente: NASA/Goddard"
        },
        {
          "title": "Los Púlsares Binarios y la Gravitación",
          "text": "En 1974, Russell Hulse y Joseph Taylor descubrieron el primer púlsar binario: dos estrellas de neutrones orbitándose mutuamente. Al medir cómo su ?rbita decaía con el tiempo, confirmaron que emitían ondas gravitacionales exactamente como predecía la relatividad general de Einstein. Ganaron el Premio Nobel de Física en 1993.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000046/GSFC_20171208_Archive_e000046~medium.jpg",
          "imgCaption": "El sistema de púlsar binario de Hulse y Taylor, cuya ?rbita decreciente confirm? la emisión de ondas gravitacionales. Fuente: NASA"
        },
        {
          "title": "Los Púlsares en Nebulosas de Cangrejo",
          "text": "La Nebulosa del Cangrejo es el remanente de la supernova observada por astrónomos chinos en 1054 d.C. En su centro hay el Púlsar del Cangrejo, que rota 30 veces por segundo y alimenta la nebulosa con vientos de partículas. La NASA observa la Nebulosa del Cangrejo con múltiples telescopios espaciales para entender cómo los púlsares interactúan con su entorno.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000039/GSFC_20171208_Archive_e000039~medium.jpg",
          "imgCaption": "La Nebulosa del Cangrejo y su púlsar central, fotografiados por el Telescopio Chandra de rayos X. Fuente: NASA/CXC/SAO"
        },
        {
          "title": "Detectando Púlsares con Radiotelescopios",
          "text": "Los púlsares emiten principalmente en ondas de radio, aunque algunos también emiten rayos X y rayos gamma. Radiotelescopios como el FAST chino (500m), el Parkes en Australia y el Very Large Array en EE.UU. descubren nuevos púlsares regularmente. Se han catalogado más de 3,000 púlsares en la Vía Láctea.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000040/GSFC_20171208_Archive_e000040~medium.jpg",
          "imgCaption": "El radiotelescopio FAST de China, el mayor del mundo, descubre nuevos púlsares regularmente. Fuente: NAOC/China"
        },
        {
          "title": "Los Púlsares y las Ondas Gravitacionales",
          "text": "Las redes de temporización de púlsares (PTA) son detectores de ondas gravitacionales de muy baja frecuencia, complementando los detectores LIGO. En 2023, múltiples PTAs anunciaron evidencia de un fondo de ondas gravitacionales que permea el universo, probablemente generado por miles de sistemas de agujeros negros supermasivos binarios en galaxias distantes.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000049/GSFC_20171208_Archive_e000049~medium.jpg",
          "imgCaption": "Las redes de temporización de púlsares detectaron en 2023 un fondo de ondas gravitacionales. Fuente: NANOGrav/NSF"
        }
      ],
      "bibliography": [
        "Bell Burnell, J. (1977). The Discovery of Pulsars."
      ]
    },
    "quizEs": [
      {
        "q": "¿Científicamente y como amigable analogía para nuestra base terrenal comparativa por qué llamamos tiernamente Púlsar al mágico remanente muerto giratorio relojero exótico asombroso compacto estrella?",
        "options": [
          "Porque apaga su luz fúnebre rompiéndose callando extinguiendo oscureciendo su galaxia veloz solitaria negra muerte estelar pasiva apaciguando fría estática y enigmática oscura.",
          "Porque al girar atronadoramente loco y súper veloz al compás loco y rápido rotacional asombroso, parecen latir y destellar rítmicos fotónicos pulsos latidos luz constante rítmica faroles espaciales guías luz asombrosos rítmicos mágicos eternos rotacionales.",
          "Por su mágica luz destructiva quemante que fúnebre asfixia y abrasador quema exóticamente letal asfixiada absorbiendo y colapsando luz devorando luz muerta calor atómico oscuro comelon abismal gigante trampa asfixiada mortal."
        ],
        "a": 1
      },
      {
        "q": "¿Qué uso invaluable le daremos en naves maravillosas las futuras y valientes amistosas tripulaciones viajeras comandantes estelares asombrosas pacíficas futuras humanas naves al destello maravilloso púlsar exótico?",
        "options": [
          "Usarlos como hermosos exóticos precisos infalibles rítmicos relojes exactos guías GPS perfectos brillantes para guiarnos sin perder al lejano abismo asombroso mapa espacial.",
          "Romper exóticos cristales esmeraldas para maravilloso robar absorber energía radiante cálida cósmica pesada recolector exótico calor letal radiactivo atrevido y heroico escudo magnético nave recarga.",
          "Vivir reposar acortar colonizando y brincando enigmáticos asfixiados al vivir anclados en su costra pesada rocosa estática congelada amigable exótica oscura pacífica estrella y mágica estéril estelar colonia vida cálida luz atardecer cósmica hermosa rocosa roca amigable hermosa superficie magnética plana segura mágica."
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Púlsar (¡Danza Giratoria Cósmica!)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Los Latidos de Reloj', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Púlsar', �qu� funci�n cumple la fase de 'Peso que Rompe Biológicas'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'El Fantástico Viaje Extremo Infinito Navegar'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Púlsar",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Tiemblan Hasta las Estrellas Rompen Estelares', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Púlsar' ocurre en 'Los Faros Intocables Mortales Cósmicos'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en '¡Danza Giratoria Cósmica!'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Púlsar', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Los Faros Intocables Mortales Cósmicos', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "red_dwarf",
    "order": 13,
    "titleEn": "Red Dwarf",
    "titleEs": "Enana Roja",
    "badge": "Stellar Ember",
    "badgeEs": "Ascua Estelar",
    "color": "#FF3B30",
    "contentEs": {
      "sections": [
        {
          "title": "Pequeñas y Longevas",
          "text": "¡El universo es súper diverso y espectacular comandante! Las estrellas más comunes en nuestra y fría galaxia nocturna Vía Láctea no son como nuestro poderoso y dorado amarillo Sol gigante. Son realmente enanas, mucho más frías, tenues, débiles y rojizas. Tan oscuras y chiquitas que nunca podrás verlas a simple vista en un cielo terrestre lindo sin tu poderoso telescopio.",
          "image": "https://images-assets.nasa.gov/image/PIA21473/PIA21473~medium.jpg",
          "imgCaption": "Las tenues estrellas rojizas que abundan en las cálidas constelaciones."
        },
        {
          "title": "Las Abuelitas Ahorrativas Extremos",
          "text": "Con menos masa y temperatura débil, ahorran y gastan su vital hidrogeno lentamente como si estuvieran cuidando cada gota de energía solar. Por lo tanto, mientras nosotros y las estrellas ricas gigantes mueren rápido de gastonas, las Enanas rojas amigablemente sobrevivirán reinando aburridos pero seguros tiempos cósmicos perdurando lentos años eones.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA13994/PIA13994~medium.jpg"
        },
        {
          "title": "Sorpresivos Ataques de Ira",
          "text": "Pero ten muchísimo cuidado: las maravillosas y tranquilas pequeñas Enanas pueden sorpresivamente ser muy caprichosas cascarrabias mal portadas traidoras berrinchudas, y en sus repentinos y enojados asombrosos exóticos estallidos tiran llamaradas radiactivas escupiendo violentamente luz tórrida de rayos-x capaces de freír por completo calcinantes a cualquier tierno exoplaneta orbital cercano.",
          "image": "https://images-assets.nasa.gov/image/PIA13217/PIA13217~medium.jpg",
          "imgCaption": "Una enana liberando picos repentinos de plasma rojo caliente que esteriliza vida vulnerable.",
          "style": "normal"
        },
        {
          "title": "Abrazados Para Sobrevivir Cálidos",
          "text": "Por la leve y apacible luz fría y débil calefacción rojiza pequeña que nos regalan cálidamente en sus diminutas mansas hogueras de luz, para no congelarnos solitarios en el eterno universo de hielo, los vecinos simpáticos planetitas de ellas, se acercan tiritando en su órbita para no congelar mares amigables asombrosos y sobrevivir cálidos.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA17836/PIA17836~medium.jpg"
        },
        {
          "title": "Nuestra Vecina Proxima Centauri Roja",
          "text": "Incluso, resulta que nuestro queridísimo vecino estelar más pegadito e inmediato saltando la cálida barda cósmica a cuatro hermosos años luz de viaje estelar: ¡es una amistosa, amigable tímida y silenciosa hermosa Enana solitaria Roja llamada Próxima Centauri tímida y cálida amiga rojiza galáctica!",
          "image": "https://images-assets.nasa.gov/image/PIA17848/PIA17848~small.jpg",
          "imgCaption": "Una modesta pero importantísima vecina rojiza cercana a nuestra burbuja protectora Tierra Sol.",
          "style": "normal"
        },
        {
          "title": "Un Apagado Final Oscuro Silencioso",
          "text": "Nunca jamás mueren con una explosión y maravilla súper destellante y mágica rompiendo el cielo como bellas supernovas. Tras extinguir lentamente su inmenso combustible de ahorro, se encogen deprimidas estéticamente hermosas silenciosas calmas pálidas pacíficas durmiéndose en Enanas friolentas negras estéticas mudas sin ruido.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA23689/PIA23689~medium.jpg"
        },
        {
          "title": "Formación de una Enana Roja",
          "text": "Las enanas rojas se forman igual que el Sol: de una nube de gas y polvo que colapsa por la gravedad. Pero al ser menos masivas (7-50% de la masa solar), la presión en su núcleo no es suficiente para fusionar helio, solo hidrógeno. Esto las hace quemar su combustible extremadamente despacio. Existen desde los primeros tiempos del universo y ninguna ha muerto aún.",
          "image": "https://images-assets.nasa.gov/image/ACD20-0044-001/ACD20-0044-001~medium.jpg",
          "imgCaption": "Representación artística de la formación de una enana roja a partir de una nube de gas y polvo. Fuente: NASA/ESA"
        },
        {
          "title": "Las Estrellas más Comunes del Universo",
          "text": "Las enanas rojas constituyen el 75% de todas las estrellas de la Vía Láctea. Son tan pequeñas y tenues que ninguna es visible a simple vista desde la Tierra, a pesar de que hay muchas más cerca de nosotros que estrellas de tipo solar. La más cercana al Sol es Próxima Centauri, a solo 4.24 años luz.",
          "image": "https://images-assets.nasa.gov/image/PIA16885/PIA16885~medium.jpg",
          "imgCaption": "Diagrama de Hertzsprung-Russell mostrando la secuencia principal y la posición de las enanas rojas. Fuente: NASA/ESA"
        },
        {
          "title": "Próxima Centauri: La Estrella más Cercana",
          "text": "La estrella más cercana al Sol es Próxima Centauri, una enana roja a 4.24 años luz. Tiene solo el 12% de la masa solar y brilla 20,000 veces menos que el Sol. Forma parte de un sistema triple junto con Alfa Centauri A y B. En 2016 se descubri? que tiene un planeta llamado Próxima b en su zona habitable.",
          "image": "https://images-assets.nasa.gov/image/PIA20055/PIA20055~medium.jpg",
          "imgCaption": "Próxima Centauri, la estrella más cercana al Sol, fotografiada por el Telescopio Hubble. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "Próxima b: ?Un Planeta Habitable?",
          "text": "Próxima b orbita a Próxima Centauri cada 11.2 días terrestres, en su zona habitable. Tiene al menos 1.07 veces la masa de la Tierra. Sin embargo, enfrenta serios obstáculos para la habitabilidad: las fuertes llamaradas estelares de Próxima podrían erosionar su atmásfera. La ESA busca confirmación de su existencia con el instrumento ESPRESSO.",
          "image": "https://images-assets.nasa.gov/image/hubble-peers-at-a-distinctly-disorganized-dwarf-galaxy_25568403123_o/hubble-peers-at-a-distinctly-disorganized-dwarf-galaxy_25568403123_o~small.jpg",
          "imgCaption": "Recreación artística de Próxima b orbitando la enana roja Próxima Centauri. Fuente: ESA/M. Kornmesser"
        },
        {
          "title": "TRAPPIST-1: El Sistema de los Siete Planetas",
          "text": "La enana roja TRAPPIST-1, a 39 años luz, tiene 7 planetas del tamaño de la Tierra. Tres de ellos (e, f, g) están en la zona habitable. Fueron descubiertos entre 2016 y 2017. El Telescopio James Webb estudia actualmente sus atmásferas. TRAPPIST-1e es el candidato más prometedor para buscar vida fuera del Sistema Solar.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000693/GSFC_20171208_Archive_e000693~medium.jpg",
          "imgCaption": "Los 7 planetas del sistema TRAPPIST-1, fotografiados conceptualmente por NASA. Tres están en la zona habitable. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "Las Llamaradas Estelares: El Peligro de las Enanas Rojas",
          "text": "Las enanas rojas emiten llamaradas estelares mucho más frecuentes y poderosas que el Sol, en relación a su tamaño. Estas llamaradas pueden liberar radiación ultravioleta y rayos X suficientes para erosionar las atmásferas de sus planetas cercanos. La habitabilidad de planetas en zonas habitables de enanas rojas es un debate científico activo.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000389/GSFC_20171208_Archive_e000389~small.jpg",
          "imgCaption": "Representación artística de una llamarada estelar de una enana roja impactando a un planeta cercano. Fuente: NASA/Goddard/S. Wiessinger"
        },
        {
          "title": "La Longevidad Extrema",
          "text": "Las enanas rojas son las estrellas más longevas del universo. Una enana roja típica vivir? entre 1 y 10 billones de años, entre 100 y 1,000 veces más que el Sol. Esto significa que ninguna enana roja ha muerto aún: todas las que se han formado desde el Big Bang siguen brillando hoy. Son el tipo de estrella con mayor probabilidad de albergar vida durante largo tiempo.",
          "image": "https://images-assets.nasa.gov/image/0301839/0301839~medium.jpg",
          "imgCaption": "Comparativa de vida estelar: las enanas rojas viven hasta 10 billones de años, frente a los 10,000 millones del Sol. Fuente: NASA"
        },
        {
          "title": "Convección Total: El Interior de las Enanas Rojas",
          "text": "A diferencia del Sol, las enanas rojas más pequeñas mezclan completamente su interior mediante convección: todo su hidrógeno llega al núcleo donde se fusiona. El Sol solo mezcla parcialmente su interior. Esto significa que las enanas rojas queman todo su combustible disponible, explicando su longevidad extrema.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000211/GSFC_20171208_Archive_e000211~medium.jpg",
          "imgCaption": "Diagrama del interior de una enana roja comparado con el Sol, mostrando su convección total. Fuente: NASA"
        },
        {
          "title": "Las Enanas Rojas y el Destino del Universo",
          "text": "En un universo muy lejano, cuando estrellas como el Sol ya hayan muerto, las enanas rojas seguirán brillando. En billones de años serán las ?ltimas estrellas en brillar antes del 'era estelar' del universo llegue a su fin. Eventualmente se convertirán en enanas blancas frías sin pasar por la fase de gigante roja, simplemente apagándose gradualmente.",
          "image": "https://images-assets.nasa.gov/image/PIA19346/PIA19346~medium.jpg",
          "imgCaption": "Representación del futuro lejano del universo cuando solo queden enanas rojas como fuentes de luz. Fuente: NASA/ESA"
        }
      ],
      "bibliography": [
        "Shields, A. L., et al. (2016). The Habitability of Planets Orbiting M-dwarf Stars.",
        "Williams, M. (2016). Red Dwarf Stars: Characteristics & Facts. Space.com."
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué inmensa y vital cualidad milagrosa astronómica astrofísica destacan estas enanas rojas veneciendo?",
        "options": [
          "Poseen un poder destructivo ruidoso y destellante inmensurable.",
          "Crean hermosos paisajes solares azules calientes.",
          "Sobreviven perdurando billones y eternos años vitales por economizar consumir tacañamente su gas puro hidrógeno lentamente perezosas ahorrativas únicas."
        ],
        "a": 2
      },
      {
        "q": "¿Por qué sus prometedores y planetarios amigables mundos rocosos no son tan pacíficos habitables como nosotros acá?",
        "options": [
          "Porque congelan frívolas el inmenso sistema aburrido solares lejanos congelando mares.",
          "Emanan e impulsan violentas erupciones y llamaradas radiactivas intensas fulminantes que castigan y carbonizan calcinan esterilizan arrasando vida planetas orbitando cercanos abrazandos.",
          "Destruyen rompiendo tejido gravedad planetas enteros colisionándoles contra el candente abrumante inmenso rojo fuego tragador."
        ],
        "a": 1
      },
      {
        "q": "¿Cómo es de grande la inmensa abundante vecindad de amigas rojas ocultas galácticas oscuras en casa vía Láctea?",
        "options": [
          "Son casi únicas raras escasas y solitarias contadas fríamente apacibles en todo estelar inmenso mapa solitario.",
          "Las silenciosas representan innegable y estadísticamente a la inmensa mayoría de estrellas asombrosas que existen en nuestra casa escondidas pálidas abundando cósmicas tranquilas.",
          "Nacen con planetas gemelos rotando infinitamente."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Enana Roja (Pequeñas y Longevas)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Las Abuelitas Ahorrativas Extremos', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Enana Roja', �qu� funci�n cumple la fase de 'Sorpresivos Ataques de Ira'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Abrazados Para Sobrevivir Cálidos'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Enana Roja",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Nuestra Vecina Proxima Centauri Roja', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Enana Roja' ocurre en 'Un Apagado Final Oscuro Silencioso'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Pequeñas y Longevas'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Enana Roja', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Un Apagado Final Oscuro Silencioso', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "white_dwarf",
    "order": 14,
    "titleEn": "White Dwarf",
    "titleEs": "Enana Blanca",
    "badge": "Stellar Ghost",
    "badgeEs": "Fantasma Estelar",
    "color": "#E0F7FA",
    "contentEs": {
      "sections": [
        {
          "title": "El Fósil Luminoso",
          "text": "No todas las estrellas explotan súper vistosas y coloridas cuando llegan al final de sus asombrosos tiempos vitales. Las estrellas más medianas, como nuestro querido Sol, sueltan pacíficamente todas sus cálidas ropajes gaseosas dejando un cadáver expuesto al centro brilloso: Una bella 'Enana Blanca' fósil.",
          "image": "https://images-assets.nasa.gov/image/PIA22353/PIA22353~small.jpg",
          "imgCaption": "Un remanente fósil muy compacto que brilla debido al calor residual."
        },
        {
          "title": "El Destino Apagado Solar",
          "text": "¡No te preocupes explorador! Aún faltan tranquilos 5 mil millones de años, pero nuestro imponente nuestro sol dorado acabará su vital ciclo mágico de vida consumido convirtiéndose pasivo en una lánguida y diminuta bella Enana Blanca pacífica brillando tenuemente fría e inofensiva en el cosmos.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA09220/PIA09220~medium.jpg"
        },
        {
          "title": "Peso Indescriptible de Compresión",
          "text": "Imagina comprimir algo enorme e inmensamente apretado tan pesado hasta forzarlo esférico mágico exótico de asombrosas escalas incomprensibles. Toda nuestra colosal bestial ruidosa masa calórica y masiva de nuestro sol amarillo se escondería y apachurraría guardándose estrujada asfixiada y densificada exótica asfixiosamente logrando encoger en la redonda frágil y pequeñita canica azul tierra de tamaño terrestre densificando rocoso pesado estático duro inerte.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000577/GSFC_20171208_Archive_e000577~small.jpg",
          "imgCaption": "Tamaño terrestre, peso y gravedad incomprensibles.",
          "style": "normal"
        },
        {
          "title": "Un Diamante Estelar Cósmico Puro",
          "text": "Debido al masivo asombroso brutal aplastamiento denso de gravedad extrema fría letal fúnebre mágica al enfriar, su centro enigmático apagado inerte se endurece formándose puro bloque rígido esmeralda oscuro brillante duro cristal carbón duro. ¡Se enfría cristalizando ruidoso un bello joyero celestial brillante puro diamante gigante congelado colosal inmenso estético maravilloso!",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA03652/PIA03652~medium.jpg"
        },
        {
          "title": "Vampiros Letales y Explosivos Robando Magia",
          "text": "Suelen dormir frívolas y fantasmales, pero si en un extraño escenario cósmico giran teniendo a su vecina hermana sol cercano tierno vivo y rojo, la solitaria enana ladrona enojará mudo y absorberá devorando ruidoso asfixiando calórico gas vecino infame encendiéndose explotará mortal traidor destructor colosal supernova caníbal asfixiante tragadora muerte.",
          "image": "https://images-assets.nasa.gov/image/PIA11736/PIA11736~medium.jpg",
          "imgCaption": "El vampirismo asfixiante que absorbe fuego ajeno.",
          "style": "normal"
        },
        {
          "title": "Fade to Black Oscuro",
          "text": "Al paso de trillones asombrosísimos largos milenarios lejanísimos distantes apacibles milenios letárgicos fúnebres de pacífica quietud, esta apagada y dormida enana cederá y exhalará exótico último radiante frío aliento blanco opaco apagándose encogiéndose invisible muerta fúnebre convirtiéndose a catalogada silenciada olvidada estatizada muda fría negra solitaria Enana Negra invisible estática.",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA09221/PIA09221~medium.jpg"
        },
        {
          "title": "El Nacimiento de una Enana Blanca",
          "text": "Una enana blanca es lo que queda del núcleo de una estrella de tipo solar después de que expulsa sus capas externas como nebulosa planetaria. El Sol se convertir? en una enana blanca en unos 5,000 millones de años. La enana blanca es increíblemente densa: la masa del Sol comprimida en el tamaño de la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA22084/PIA22084~small.jpg",
          "imgCaption": "Representación artística del Sol convirtiéndose en nebulosa planetaria y dejando una enana blanca en su centro. Fuente: NASA/ESA"
        },
        {
          "title": "La Composición de una Enana Blanca",
          "text": "Las enanas blancas están compuestas principalmente de carbono y oxígeno cristalizados bajo presión extrema. No tienen fusión nuclear activa: brillan solo por el calor residual acumulado durante millones de años de vida. Su densidad es tal que una cucharadita de su material pesaría unas 15 toneladas.",
          "image": "https://images-assets.nasa.gov/image/PIA09219/PIA09219~medium.jpg",
          "imgCaption": "Diagrama comparativo del tamaño de una enana blanca respecto a la Tierra y al Sol. Fuente: NASA/ESA"
        },
        {
          "title": "La Temperatura Extrema",
          "text": "Las enanas blancas recién formadas pueden tener temperaturas de 100,000?C o más, lo que las hace brillar en rayos ultravioleta y rayos X. Se enfrían lentamente durante miles de millones de años. Las más frías conocidas tienen apenas 2,700?C. En un universo suficientemente viejo, se convertirían en 'enanas negras', pero ese tiempo aún no ha llegado.",
          "image": "https://images-assets.nasa.gov/image/PIA04231/PIA04231~small.jpg",
          "imgCaption": "Imagen de rayos X de una enana blanca caliente en el centro de la nebulosa planetaria NGC 7027. Fuente: NASA/HST"
        },
        {
          "title": "Las Novas: Cuando la Enana Roba Materia",
          "text": "Si una enana blanca tiene una estrella compañera cercana, puede robar hidrógeno de ella. Cuando acumula suficiente material en su superficie, el hidrógeno se enciende en una explosión termonuclear llamada nova. La enana sobrevive y el proceso puede repetirse. La estrella T Coronae Borealis explotar? como nova visible a ojo desnudo alrededor de 2024.",
          "image": "https://images-assets.nasa.gov/image/PIA11735/PIA11735~medium.jpg",
          "imgCaption": "Representación artística de una nova: enana blanca acumulando material de su estrella compañera hasta explotar. Fuente: NASA/CXC"
        },
        {
          "title": "Las Supernovas Tipo Ia: Medir el Universo",
          "text": "Si una enana blanca acumula masa hasta superar 1.4 masas solares (el límite de Chandrasekhar), colapsa y explota completamente en una supernova de Tipo Ia. Estas supernovas siempre tienen la misma luminosidad intrínseca, por lo que son 'candelas estándar' para medir distancias cósmicas. Usándolas, en 1998 se descubri? que el universo se expande aceleradamente.",
          "image": "https://images-assets.nasa.gov/image/PIA18842/PIA18842~medium.jpg",
          "imgCaption": "Las supernovas Tipo Ia permitieron descubrir la expansión acelerada del universo en 1998. Fuente: NASA/HST"
        },
        {
          "title": "El Límite de Chandrasekhar",
          "text": "En 1930, el físico indio Subrahmanyan Chandrasekhar calcul? que una enana blanca no puede superar 1.44 masas solares: si lo hace, la presión cuántica que la sostiene es vencida por la gravedad y colapsa. Este límite fundamental se llama Límite de Chandrasekhar. Por este trabajo gan? el Premio Nobel de Física en 1983, ?53 años después de su descubrimiento!",
          "image": "https://images-assets.nasa.gov/image/PIA22352/PIA22352~small.jpg",
          "imgCaption": "Subrahmanyan Chandrasekhar descubri? el límite de masa de las enanas blancas a los 19 años. Fuente: NASA/Chandra"
        },
        {
          "title": "Sirio B: La Enana Blanca Más Famosa",
          "text": "La estrella más brillante del cielo nocturno, Sirio, tiene una enana blanca compañera llamada Sirio B. A pesar de ser casi invisible desde la Tierra, Sirio B fue predicha matemáticamente en 1844 por Friedrich Bessel al notar que Sirio oscilaba en su trayectoria. Fue observada directamente por primera vez en 1862. Sirio B tiene la masa del Sol en el tamaño de la Tierra.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001500/GSFC_20171208_Archive_e001500~medium.jpg",
          "imgCaption": "Sirio A y Sirio B fotografiados por el Telescopio Chandra. Sirio B es la enana blanca más cercana a la Tierra. Fuente: NASA/CXC"
        },
        {
          "title": "Planetas Sobrevivientes",
          "text": "El Telescopio Hubble ha detectado restos de planetas rocosos cayendo en enanas blancas: fragmentos de asteroides y planetas que orbitan demasiado cerca. Esto nos da información directa sobre la composición de planetas extrasolares. Algunos sistemas de enanas blancas tienen cinturones de asteroides y incluso planetas supervivientes que sobrevivieron a la fase de gigante roja.",
          "image": "https://images-assets.nasa.gov/image/hubble-catches-stellar-exodus-in-action_17644845341_o/hubble-catches-stellar-exodus-in-action_17644845341_o~medium.jpg",
          "imgCaption": "Representación artística de asteroides fragmentados cayendo en una enana blanca, detectados por Hubble. Fuente: NASA/ESA/Hubble"
        },
        {
          "title": "El Destino Final: Las Enanas Negras",
          "text": "Cuando una enana blanca se enfría completamente durante billones de años, dejar? de brillar y se convertir? en una 'enana negra': un cadáver estelar frío de carbono cristalizado. Sin embargo, el universo no tiene aún la edad suficiente para que exista ninguna enana negra: la más fría conocida aún est? a 2,700?C. Las enanas negras son el estado final teórico de las estrellas.",
          "image": "https://images-assets.nasa.gov/image/PIA07902/PIA07902~medium.jpg",
          "imgCaption": "Representación artística de una enana negra: el destino final de las enanas blancas en un universo futuro lejano. Fuente: NASA/ESA"
        }
      ],
      "bibliography": [
        "Koester, D. (2002). White Dwarfs."
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué inmensa pacífica y luminosa entidad terminará nuestro querido redondo ardiente Sol radiante?",
        "options": [
          "Una roja apagada ruidosa explotará colosal.",
          "Se dormirá comprimido y callado brillante como pálido y comprimido cadáver llamado Enana mágica Blanca solitaria apacible.",
          "Quedará negro veloz agujero absorbente negro destellando luz veloz letal asfixiante apagón final mudo."
        ],
        "a": 1
      },
      {
        "q": "¿Qué asombroso brillante valiosísimo tesoro formaría su corazón compacto duro exóticos endurecidos congelado macizos?",
        "options": [
          "Piedras rústicas grises sueltas flotantes congeladas sucias fúnebres oscuras opacas sin luz.",
          "Se aprietan en maravilloso asombroso estético macizo duro hermoso colosal y limpio brillante estelar diamante gigante puro rocoso duro.",
          "Anillos y estatuas exóticas fluidos magnéticos gaseosos nítidos en nubes calientes hirviendo exóticas cálidas."
        ],
        "a": 1
      },
      {
        "q": "¿Qué letal comportamiento caníbal traicionero exóticamente peligroso realizan estas dormidas enanas fantasmales mudo asombroso si habitan junto un solitario amigo sol?",
        "options": [
          "Atraen asombrosos empuje cósmico robando vida material del exótico vecino a lado asfixiantemente encendiéndose en gran supernova estelar.",
          "Le regalan ruidosos regalos de luces radiactivas curativas estelares amigables en luz solar bella amigable exótica de la brillante color radiante.",
          "Detienen silenciosamente apagándose la órbita frenando en paz el cosmos universo rotacional deteniendo rocosas amigables mudas congelaciones apagados infinitos fúnebres destellos de congelamiento de universo sin fúnebre asfixiante amigable ruidosa de detención de paz."
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Enana Blanca (El Fósil Luminoso)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'El Destino Apagado Solar', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Enana Blanca', �qu� funci�n cumple la fase de 'Peso Indescriptible de Compresión'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Un Diamante Estelar Cósmico Puro'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Enana Blanca",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Vampiros Letales y Explosivos Robando Magia', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Enana Blanca' ocurre en 'Fade to Black Oscuro'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Fósil Luminoso'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Enana Blanca', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Fade to Black Oscuro', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "wormhole",
    "order": 15,
    "titleEn": "Wormhole",
    "titleEs": "Agujero de Gusano",
    "badge": "Space Bridge",
    "badgeEs": "Puente Espacial",
    "color": "#00FF99",
    "contentEs": {
      "sections": [
        {
          "title": "El Puente Mágico Einstein-Rosen",
          "text": "¡Abrocha tu cinturón espacial piloto de academia! ¿Recuerdas que la gravedad y la masa pueden deformar el universo espacial como una tela doblada elástica? Bueno, los físicos teorizaron que con las condiciones más locas del universo el tejido se dobla tanto cerrando una forma de atajo galáctico maravilloso distante puente y súper telepuerto que cruza milenios enteros en unos pasitos: ¡Un alucinante Agujero Gusano atajo!",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.40752273617532586",
          "imgCaption": "Un portal atajo hipotético y mágico atrevidamente soñado."
        },
        {
          "title": "Realidad Pizarrón y Ecuación Lápiz",
          "text": "Por hermoso atajo locamente majestuoso portal milagroso atrevido teletransportador y de película que ruidoso sea, toda la mágica idea solo maravillas de viven existe en los cuadernos de genio humano ecuaciones. Todos los más increíbles potentes observatorios asombrosos jamas en sus lentos y largos añísimos de rastreos lejanos han capturado rastro visual fotográfico físico empírico luz real visual directo e avistado ni un pequeñito en todo maravilloso cielo galáctico.",
          "style": "highlight",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.19926523972672594"
        },
        {
          "title": "El Peligroso Triturador Inestable Fúnebre",
          "text": "Para decepción de nosotros todos soñadores amantes y de viaje; en papel y teoría si un mágico exótico espectacular atajo se formara, la enorme tracción letal exótica fuerza tensión oscura en él haría fúnebre destruirse y desmoronando un violento derrumbe aplastando rompiéndose fugaz milésima pestañear instantáneo frágil y aplastante atrapando mortal exótica nave que atrevida y tonta cruzaría letal portal.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.14200442984685202",
          "imgCaption": "Una inestabilidad letal destruyendo en milisegundo un portal ilusorio.",
          "style": "normal"
        },
        {
          "title": "El Pegamento Inventor: La Materia Exótica",
          "text": "¡A los grandes soñadores astronautas físicos locos maravilla no se asustan! Ideando como fúnebre estabilizar evitar destructivo y mudo oscuro colapso y atajo de aplastamiento temporal exótico maravilla de fúnebre viaje y portal atajo puente de y, se idearon a nivel ecuación ficción y requerir forrados y empujados estables milagros con mágica de gravedad al locamente revés 'Materia exótica' mágica repeliendo la cerrada salvadora exótica en la fúnebre trampa maravillas asustando a los oscuros agujeros cediendo y de mágica.",
          "style": "highlight",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3395636387663371"
        },
        {
          "title": "Cristales Bolitas Ópticas y Globos",
          "text": "Curiosamente si existiera frente tu bella ventana escotilla, no sería de locamente asfixiando hoyo y atajo un huracán túnel bajando embudando y un pozo bidimensional. Como viajero atrevido tú te verías frente inmensurable y a una espectacular perfecta pulcra hermosa esférica de mágica inmensa bola y pelota espejo transparente mágica cristal gigante globo que vería en estática hermosa esferita adentro un cielo otro asombroso de luz estelar de lejano otro universo maravilloso tridimensional.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9744020159224799",
          "imgCaption": "Un túnel que se capta flotando como esfera mágica flotante luminosa de asombro 3D cristalina esférica mudo maravilla y fúnebre hermosa cristal espejo de redonda vista espejo y destino a de fúnebre hermosa a otro luz mundo cielo fúnebre exótica bola magia.",
          "style": "normal"
        },
        {
          "title": "Las Locas Trampas del Pasado Futuro Mariposa Relojero Tiempo",
          "text": "Lo último fascinante súper chiflado asombroso estético milagroso loco extravagante al de cruzar si valiente fúnebre mágica atrevida nave lo hiciera, no solamente cruzar portales fúnebre exóticos enigmáticos cambiaría y mágica y transporta galaxias de lugares de la en posición maravillas de enigmáticos fúnebre de posición lejana. También deforman mágica locamente del del mágica temporal y ruidosa reloj flecha asfixiante abismal en el tiempo asombroso creando loco de alterar exóticamente el presente fúnebre mágico retroceder ruidoso salto y valiente loco valioso paradojas y magia asombroso tiempo mudo del loca maravilla tiempo relojes exóticas vida viajes ruidoso del tiempo salto.",
          "style": "highlight",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6558550635700474"
        },
        {
          "title": "La Física del Agujero de Gusano",
          "text": "Un agujero de gusano (o puente de Einstein-Rosen) es una solución matemática de las ecuaciones de relatividad general de Einstein que conecta dos regiones del espacio-tiempo. Si existiera uno, cruzarlo sería como tomar un atajo a través del espacio. La física los permite matemáticamente, pero ningún agujero de gusano ha sido observado jamás.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.19101839440336277",
          "imgCaption": "Representación artística de un agujero de gusano conectando dos regiones distantes del espacio-tiempo. Fuente: NASA/ESA"
        },
        {
          "title": "Einstein y Rosen: Los Pioneros",
          "text": "En 1935, Albert Einstein y Nathan Rosen descubrieron que las ecuaciones de relatividad general tenían soluciones que describían 'puentes' entre dos regiones del espacio-tiempo. Por eso se llaman puentes de Einstein-Rosen. Sin embargo, estos puentes matemáticos eran inestables y se cerrarían antes de que nada pudiera cruzarlos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.08593434234906472",
          "imgCaption": "Albert Einstein y Nathan Rosen describieron los agujeros de gusano matemáticamente en 1935. Fuente: NASA/AIP"
        },
        {
          "title": "?Son Estables los Agujeros de Gusano?",
          "text": "El problema de los agujeros de gusano es que son inestables: según las ecuaciones, se cierran casi instantáneamente después de formarse. Para mantenerlos abiertos se necesitaría 'materia exótica' con densidad de energía negativa, algo no observado en la naturaleza. Stephen Hawking y Kip Thorne analizaron este problema en detalle en los años 1980-1990.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.35745090180838923",
          "imgCaption": "Diagrama mostrando cómo un agujero de gusano inestable se cerraría antes de que nada pudiera cruzarlo. Fuente: NASA"
        },
        {
          "title": "La Materia Exótica: El Ingrediente Secreto",
          "text": "Para que un agujero de gusano sea transitable, necesitaría ser estabilizado por materia con presión negativa o energía negativa. Este tipo de materia hipotética se llama 'materia exótica'. La energía del vacío cuántico (energía de Casimir) tiene propiedades similares, pero en cantidades extremadamente pequeñas. Si existe materia exótica en cantidad suficiente es una pregunta abierta.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.595022420481495",
          "imgCaption": "Representación de la materia exótica necesaria para estabilizar un agujero de gusano transitable. Fuente: NASA/ESA"
        },
        {
          "title": "Agujeros de Gusano y Viaje en el Tiempo",
          "text": "Si los agujeros de gusano existieran y fueran transitables, podrían teóricamente permitir el viaje en el tiempo. Si un extremo de un agujero de gusano viajara cerca de la velocidad de la luz (dilatación temporal), los dos extremos estarían en momentos diferentes del tiempo. Stephen Hawking argument? que la 'conjetura de protección cronológica' impediría esto, pero es un debate abierto.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.12478910206261518",
          "imgCaption": "Representación artística de un agujero de gusano usado para viajar en el tiempo, concepto explorado en física teórica. Fuente: NASA"
        },
        {
          "title": "Agujeros de Gusano en la Ciencia Ficción",
          "text": "Los agujeros de gusano son un elemento favorito de la ciencia ficción. La película Interstellar (2014) fue asesorada por el físico Kip Thorne (Nobel 2017) para representarlos con rigor científico. En 2001: A Space Odyssey, Contact y Star Trek también aparecen. Esta representación popular despert? el interés científico en el tema.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9850898364381152",
          "imgCaption": "El agujero de gusano de la película Interstellar, diseñado con asesoría del físico Nobel Kip Thorne. Fuente: Paramount/Warner Bros"
        },
        {
          "title": "?Podemos Detectar un Agujero de Gusano?",
          "text": "Algunos físicos teóricos como Juan Maldacena proponen que los agujeros de gusano pueden estar conectados con el entrelazamiento cuántico (ER=EPR). Si esto es cierto, podrían detectarse mediante correlaciones cuánticas. Otros proponen buscarlos por sus efectos gravitacionales en el movimiento de estrellas. Por ahora, no hay evidencia observacional de ningún agujero de gusano.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9073431545896293",
          "imgCaption": "Representación del entrelazamiento cuántico como posible conexión fundamental con los agujeros de gusano. Fuente: Caltech/NASA"
        },
        {
          "title": "Micro-agujeros de Gusano Cuánticos",
          "text": "La física cuántica sugiere que a escales muy pequeñas (la longitud de Planck: 10??? metros) el espacio-tiempo podría ser espumoso y lleno de micro-agujeros de gusano que aparecen y desaparecen constantemente. Esta 'espuma cuántica' es un concepto de física teórica propuesto por John Wheeler en los años 1950. A escalas humanas, este efecto es completamente imperceptible.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.17423322468672076",
          "imgCaption": "Representación artística de la 'espuma cuántica' a la escala de Planck, donde micro-agujeros de gusano aparecen y desaparecen. Fuente: NASA/Fermilab"
        },
        {
          "title": "La Conjetura ER=EPR de Maldacena",
          "text": "En 2013, el físico Juan Maldacena propuso la hipótesis ER=EPR: que los agujeros de gusano (ER) y el entrelazamiento cuántico (EPR) son fenómenos fundamentalmente equivalentes. Si dos partículas están entrelazadas cuánticamente, podrían estar conectadas por un micro-agujero de gusano. Esta idea revolucionaria unifica relatividad general y mecánica cuántica en una sola visión.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3868752307444886",
          "imgCaption": "La conjetura ER=EPR propone que el entrelazamiento cuántico y los agujeros de gusano son manifestaciones del mismo fenómeno. Fuente: Caltech"
        }
      ],
      "bibliography": [
        "Einstein, A., & Rosen, N. (1935). The Particle Problem in General Theory of Relativity."
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué mágico y hermoso de función útil rápida e salvador y brillante de asombroso atajo asfixiante le soñamos a de y de servirían dominar milagroso atajo y de y portal asombroso oscuro y cruzar y logrando exóticamente del cruzar estos exóticos fúnebre ruidosos hipotético enigmáticos puentes de lograrlos?",
        "options": [
          "A y a valiente crear de civilizaciones verdes felices y fúnebre amigable de agua amigable y pura y respiración de luz ecosistema oxigenado pacífica en de milagrosa de mágica a colonizar bella paraíso azul para vida de en fúnebre magia planetas oscuros exóticos mudo asombro felices verde seguros y estático salvada paz habitables.",
          "Fungirían como funcionales acortadores y rápidos de y exóticos mágicos ruidosos veloces caminos portales conectores de fúnebre rápidos brincos tele portadores asombroso acortando distancias y atrevida milagroso en del a del asombroso a y distantes a milagrosamente lejanas millones maravillosas cruzar viaje asombrosos en fúnebre tele puerto rápido y de maravilla.",
          "Ser radiante cálidos fúnebre estrellas asombrosas cálida ruidosa letal y asfixiante inmensa y súper de letal maravilla exótica de asfixiante enigmática radiante cálido asfixiada mudo destello asfixiante energía térmica fúnebre maravilla inmensamente y en calor ruidoso."
        ],
        "a": 1
      },
      {
        "q": "¿Por qué frívolo frágilmente traicionero fúnebre mortal inestable destructivo asombroso ruidoso letal triturador son mortífera trágica letal ruidosa y enigmático no seguros trágicos mudo fúnebre asombrosísima mudo peligro mudo y para y frágiles atajos en la frágilmente del peligro mudo para la frágil fúnebre de usar a las naves asombroso y cruzar portal atrevido viajar a sonda fúnebre explorador y portal exóticos en de mágica?",
        "options": [
          "Al carecer fría frívolo de oxígeno de helado de pacífico termal calor frío glacial asfixiarían.",
          "No emiten ecos luz calor radares radiante brillante fúnebre oscuras solitaria radiaciones fúnebres de luz radar ni ubicables mapa invisible vacío silencioso escondidos indetectables.",
          "Cerrarían asfixiando frilamente cerrando frágiles colapsos triturando asfixiando machacando rápido instantáneamente desintegrando y cayéndose destruidas frágiles aplastando derrumbe asombrosos mortal al milésimas segundo peligro letal cruce destruyendo todo asfixiada letal rompiendo exóticos inestable fugaz portal de a trágicas traición atajos mudo derrumbe trituradora exótico."
        ],
        "a": 2
      },
      {
        "q": "¿Qué inmensa material extraña ficticio y milagroso de sustancia de asombrocísima milagrosa requerirían estabilizar exótica de fúnebre de y oscura e de mágico fúnebre furgar sellar para inestable mortal repeliendo mágica a túnel y exóticos y portal ruidoso a puente para maravillas exótico evitar que machaque colapsos cierre y ruidosas frágilmente de fúnebre fúnebre asombroso?",
        "options": [
          "Masiva de maravilla resistente titanio duro hierro pesado inalterable muro fúnebre oscuro y dura roca y mudo y hierro metálica inquebrantable dura en escudo rígida fúnebre mudo y maravilla reforzado y dura blindaje indestructible .",
          "Misteriosa mágica energía hipotética y repulsivos exóticos fúnebre milagro maravillas de fúnebre de sustancia magia exótica y fúnebre al de repelentes mudo antimateria opuestos exótica mágica puramente materia fúnebre negativa empujando salvando inverso maravillas magia exótica fúnebre de estabilizadora repelente mágica milagrosa salvando el exótica inverso magia asombroso y repulsivo magia colapsos exóticos mudo de del pasillo."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Agujero de Gusano (El Puente Mágico Einstein-Rosen)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Realidad Pizarrón y Ecuación Lápiz', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Agujero de Gusano', �qu� funci�n cumple la fase de 'El Peligroso Triturador Inestable Fúnebre'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'El Pegamento Inventor: La Materia Exótica'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Agujero de Gusano",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Cristales Bolitas Ópticas y Globos', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Agujero de Gusano' ocurre en 'Las Locas Trampas del Pasado Futuro Mariposa Relojero Tiempo'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Puente Mágico Einstein-Rosen'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Agujero de Gusano', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Las Locas Trampas del Pasado Futuro Mariposa Relojero Tiempo', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "animales_intro",
    "order": 16,
    "titleEn": "Animals in Space Intro",
    "titleEs": "Animales en el Espacio",
    "badge": "Space Pioneer",
    "badgeEs": "Pionero Espacial",
    "color": "#FFB800",
    "contentEs": {
      "sections": [
        {
          "title": "Los Primeros Valientes del Cosmos",
          "text": "¿Alguna vez te has preguntado quién fue el primer ser vivo en llegar al espacio? ¡No fue un humano! Fueron pequeños animales los que abrieron el camino. En 1947, científicos de Estados Unidos lanzaron moscas de la fruta a bordo de un cohete V-2 capturado de la Segunda Guerra Mundial. Querían saber si los seres vivos podían sobrevivir más allá de la atmósfera de la Tierra. Las moscas viajaron a 109 kilómetros de altitud, cruzando oficialmente la línea de Kármán, que es el límite oficial del espacio exterior.",
          "image": "https://images-assets.nasa.gov/image/KSC-20210520-PH-ILW01_0011/KSC-20210520-PH-ILW01_0011~medium.jpg",
          "imgCaption": "Un cohete V-2 lanzando las primeras moscas al espacio en 1947."
        },
        {
          "title": "¿Qué es un Vuelo Suborbital?",
          "text": "Imagina lanzar una pelota muy fuerte hacia arriba: sube, sube, llega a su punto más alto y luego... ¡cae! Así funcionaban los primeros vuelos espaciales animales. Se llaman 'suborbitales' porque el cohete no tenía suficiente velocidad para quedarse girando alrededor de la Tierra. Simplemente rozaba el espacio y caía de regreso. Las moscas de 1947 regresaron vivas gracias a un pequeño paracaídas. ¡Misión cumplida, pequeñas heroínas!",
          "image": "https://images-assets.nasa.gov/image/KSC-20210520-PH-ILW01_0041/KSC-20210520-PH-ILW01_0041~medium.jpg",
          "imgCaption": "Diferencia entre un vuelo suborbital (arco) y orbital (círculo completo)."
        },
        {
          "title": "El Gran Desafío: Llegar a la Órbita",
          "text": "Llegar al espacio es una cosa, ¡pero quedarse girando alrededor de la Tierra es otra completamente distinta! Para orbitar el planeta, una nave necesita viajar a unos 28,000 kilómetros por hora. En los años 50, la carrera espacial entre Estados Unidos y la Unión Soviética impulsó a los científicos a construir cohetes cada vez más poderosos. El objetivo era claro: poner seres vivos en órbita y traerlos de regreso con vida.",
          "image": "https://images-assets.nasa.gov/image/KSC-20210520-PH-ILW01_0111/KSC-20210520-PH-ILW01_0111~medium.jpg",
          "imgCaption": "Una cápsula espacial orbitando la Tierra en la década de 1950."
        },
        {
          "title": "¿Por Qué Enviar Animales y No Humanos?",
          "text": "El espacio es un ambiente completamente hostil para cualquier ser vivo: no hay aire para respirar, la temperatura cambia drásticamente entre -270°C y +120°C, y hay radiación que puede dañar las células del cuerpo. Los científicos necesitaban respuestas urgentes: ¿Puede un corazón latir normalmente en gravedad cero? ¿Pueden funcionar los pulmones? ¿La radiación causa daños inmediatos? Los animales fueron los valientes voluntarios que nos dieron esas respuestas antes de que cualquier humano arriesgara su vida.",
          "image": "https://images-assets.nasa.gov/image/PIA18386/PIA18386~medium.jpg",
          "imgCaption": "Animales que hicieron posible la exploración humana del espacio."
        },
        {
          "title": "Un Legado de Valentía y Ciencia",
          "text": "Gracias a los animales astronautas, los ingenieros aprendieron a diseñar mejores sistemas de soporte de vida, trajes espaciales y cápsulas herméticamente selladas. Cada vuelo animal era un experimento científico que generaba datos preciosos. ¿Cómo responde el sistema nervioso a la ingravidez? ¿Cómo se comporta la sangre sin gravedad? Esas preguntas, respondidas por perros, monos y gatos, nos permitieron finalmente enviar a Yuri Gagarin al espacio en 1961 con confianza en que sobreviviría.",
          "image": "https://images-assets.nasa.gov/image/PIA09266/PIA09266~medium.jpg",
          "imgCaption": "El trío astronauta: monos, perros y gatos, héroes de la ciencia espacial."
        },
        {
          "title": "Documental Oficial: Animales en el Espacio",
          "text": "Presta mucha atención a este fascinante documental. Verás imágenes reales de las cápsulas, de los cohetes y de los valientes animales que hicieron posible que hoy los humanos vivamos y trabajemos en estaciones espaciales. Su historia merece ser recordada y celebrada.",
          "video": "/assets/animales/Animales en el espacio.mp4",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001159/GSFC_20171208_Archive_e001159~small.jpg"
        },
        {
          "title": "Las Moscas de Fruta: Los Primeros Astronautas",
          "text": "El 20 de febrero de 1947, un cohete V-2 capturado alemán lanz? a las primeras criaturas vivas al espacio: moscas de fruta Drosophila. Los científicos querían estudiar los efectos de la radiación cósmica en seres vivos. Las moscas fueron recuperadas vivas tras alcanzar 109 km de altitud. Este fue el primer experimento biológico exitoso en el espacio.",
          "image": "https://images-assets.nasa.gov/image/KSC-20210520-PH-ILW01_0030/KSC-20210520-PH-ILW01_0030~medium.jpg",
          "imgCaption": "Las moscas de fruta Drosophila fueron los primeros seres vivos lanzados al espacio en 1947 a bordo de un cohete V-2. Fuente: NASA"
        },
        {
          "title": "Los Ratones: Más All? de las Moscas",
          "text": "Entre 1950 y 1952, Estados Unidos comenz? a lanzar ratones en cohetes Aerobee. El 31 de agosto de 1950 se lanz? el primer ratón al espacio, aunque no sobrevivi? al retorno. Los ratones fueron fundamentales para estudiar los efectos de la microgravedad en mamíferos más complejos que las moscas de fruta. Se estudiaron sus comportamientos, fisiología y reacciones a la ingravidez.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001588/GSFC_20171208_Archive_e001588~small.jpg",
          "imgCaption": "Los ratones fueron los segundos mamíferos en ser enviados al espacio para estudiar los efectos de la ingravidez. Fuente: NASA"
        },
        {
          "title": "Los Monos Americanos: El Programa de Primates",
          "text": "Entre 1948 y 1961, EE.UU. lanz? una serie de monos al espacio para estudiar su capacidad de sobrevivir los efectos físicos del vuelo espacial. El mono Albert II fue el primero en alcanzar el espacio (134 km) en 1949. Estos experimentos fueron directamente fundamentales para el diseño de los sistemas de soporte vital para astronautas humanos.",
          "image": "https://images-assets.nasa.gov/image/PIA22961/PIA22961~medium.jpg",
          "imgCaption": "Los monos del programa espacial americano ayudaron a diseñar los sistemas de soporte de vida para astronautas humanos. Fuente: NASA"
        },
        {
          "title": "Las Tortugas Soviéticas: Las Primeras en ?rbita Completa y Regreso",
          "text": "En septiembre de 1968, la sonda soviética Zond 5 llev? tortugas al espacio, las primeras criaturas en orbitar la Luna y regresar vivas. Las tortugas perdieron algo de peso durante el vuelo pero sobrevivieron perfectamente. El experimento demostr? que los organismos podían sobrevivir la radiación cósmica durante vuelos interplanetarios.",
          "image": "https://images-assets.nasa.gov/image/PIA23889/PIA23889~medium.jpg",
          "imgCaption": "Las tortugas de la misión Zond 5 soviética fueron los primeros animales en orbitar la Luna y regresar vivos en 1968. Fuente: NASA/Roscosmos"
        },
        {
          "title": "Los Peces en Microgravedad",
          "text": "Los peces también han viajado al espacio como modelos biológicos. En 1970, la NASA llev? peces al espacio y descubri? que sin gravedad nadan en círculos y se desorientan. Los peces cebra (Danio rerio) son especialmente ?tiles porque sus embriones transparentes permiten estudiar el desarrollo celular en microgravedad a tiempo real.",
          "image": "https://images-assets.nasa.gov/image/PIA13494/PIA13494~small.jpg",
          "imgCaption": "Peces cebra estudiados en la Estación Espacial Internacional para entender los efectos de la microgravedad en el desarrollo. Fuente: NASA/ISS"
        },
        {
          "title": "Las Ranas en el Espacio: El Experimento Otolith",
          "text": "En 1970, NASA lanz? ranas en el experimento Frog Otolith para estudiar el sistema del equilibrio en microgravedad. Los otolitos son los ?rganos del oído que detectan la gravedad. En ingravidez, las ranas inicialmente nadaban en bucles, pero se adaptaron al entorno en pocas horas. Este experimento ayud? a entender el mareo espacial en humanos.",
          "image": "https://images-assets.nasa.gov/image/PIA07335/PIA07335~medium.jpg",
          "imgCaption": "Las ranas del experimento Otolith de NASA ayudaron a comprender el mareo espacial que experimentan los astronautas. Fuente: NASA"
        },
        {
          "title": "Los Efectos de la Microgravedad en los Animales",
          "text": "Los experimentos con animales revelaron los principales efectos de la microgravedad: pérdida de masa ?sea y muscular, alteración del sistema cardiovascular, redistribución de fluidos corporales hacia la cabeza y desorientación del sistema vestibular. Todos estos efectos también afectan a los astronautas humanos, por lo que los animales fueron fundamentales para desarrollar contramedidas.",
          "image": "https://images-assets.nasa.gov/image/PIA12238/PIA12238~medium.jpg",
          "imgCaption": "Representación de los principales efectos fisiológicos de la microgravedad estudiados primero en animales. Fuente: NASA/ESA"
        },
        {
          "title": "Las Arañas en la ISS: ?Cómo Tejen en Ingravidez?",
          "text": "En 2011, dos arañas llamadas Gladis y Esmeralda fueron llevadas a la Estación Espacial Internacional como parte de un experimento diseñado por una estudiante de 18 años de Louisville. Las arañas construyeron telas en microgravedad, aunque con diferente estructura que en la Tierra. Este experimento demostr? la notable capacidad de adaptación de los animales al espacio.",
          "image": "https://images-assets.nasa.gov/image/PIA01936/PIA01936~medium.jpg",
          "imgCaption": "Las arañas Gladis y Esmeralda tejieron telas en la ISS, adaptándose sorprendentemente a la microgravedad. Fuente: NASA/ISS"
        },
        {
          "title": "El Legado de los Animales Pioneros",
          "text": "Los animales pioneros del espacio pagaron un precio enorme para que los humanos pudieran seguirlos con seguridad. Sus sacrificios permitieron desarrollar trajes espaciales, sistemas de soporte vital, cápsulas de reentrada y procedimientos médicos para el espacio. Cada astronauta que ha viajado al espacio desde 1961 lo hace gracias a los descubrimientos hechos con estos animales.",
          "image": "https://images-assets.nasa.gov/image/KSC-20210520-PH-ILW01_0167/KSC-20210520-PH-ILW01_0167~medium.jpg",
          "imgCaption": "Los animales pioneros del espacio allanaron el camino para que los humanos pudieran explorar el cosmos con seguridad. Fuente: NASA"
        }
      ],
      "bibliography": [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer.",
        "NASA History Division. (2020). A Brief History of Animals in Space.",
        "Beisher, D. E. (1971). Life in Space. TIME-LIFE Books."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué animales fueron los primeros seres vivos en llegar al espacio en 1947?",
        "options": [
          "Ratas de laboratorio.",
          "Moscas de la fruta.",
          "Perros callejeros rusos."
        ],
        "a": 1
      },
      {
        "q": "¿Cómo se llaman los vuelos donde el cohete roza el espacio pero cae de regreso sin orbitar la Tierra?",
        "options": [
          "Vuelos suborbitales.",
          "Vuelos orbitales.",
          "Vuelos lunares."
        ],
        "a": 0
      },
      {
        "q": "¿Por qué los científicos enviaron animales al espacio antes que humanos?",
        "options": [
          "Para entretener a la gente.",
          "Para estudiar cómo el cuerpo vivo reacciona al espacio sin poner en riesgo vidas humanas.",
          "Porque los animales son mejores pilotos."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Animales en el Espacio (Los Primeros Valientes del Cosmos)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada '¿Qué es un Vuelo Suborbital?', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Animales en el Espacio', �qu� funci�n cumple la fase de 'El Gran Desafío: Llegar a la Órbita'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a '¿Por Qué Enviar Animales y No Humanos?'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Animales en el Espacio",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Un Legado de Valentía y Ciencia', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Animales en el Espacio' ocurre en 'Documental Oficial: Animales en el Espacio'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Los Primeros Valientes del Cosmos'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Animales en el Espacio', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Documental Oficial: Animales en el Espacio', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "animales_mamiferos",
    "order": 17,
    "titleEn": "Mammals in Space",
    "titleEs": "Mamíferos en el Espacio",
    "badge": "Monkey Astronaut",
    "badgeEs": "Primate Astronauta",
    "color": "#00FF99",
    "contentEs": {
      "sections": [
        {
          "title": "Los Primeros Astronautas No Humanos",
          "text": "Antes de enviar humanos al espacio, los cient�ficos necesitaban saber si la vida podr�a soportar las intensas fuerzas G de los cohetes y la ingravidez extrema. Por ello, una diversa selecci�n de mam�feros fue entrenada meticulosamente para actuar como pioneros. Desde perritos callejeros hasta simios con entrenamiento para operar niveles, todos jugaron un rol invaluable.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.10195783783457746",
          "imgCaption": "Un concepto de rescate y protecci�n para la reentrada."
        },
        {
          "title": "Los Perros C�smicos (URSS)",
          "text": "El programa espacial sovi�tico confi� abrumadoramente en los canes. Los perros callejeros de Mosc� fueron seleccionados por su robustez al fr�o y resistencia al estr�s urbano. Fueron piezas clave no solo para probar cabinas vitales sino para demostrar que se pod�a orbitar y regresar con vida, allanando el camino para que Yuri Gagarin hiciera historia.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7374493805017357",
          "imgCaption": "Perros cosmonautas de la Uni�n Sovi�tica en entrenamiento."
        },
        {
          "title": "Simios y Monos (EE. UU.)",
          "text": "Mientras los sovi�ticos usaban perros, los Estados Unidos se decant� por la inteligencia biol�gica de monos rhesus y chimpanc�s. A diferencia de otros animales, un mono pod�a ser entrenado psicomotrizmente para operar manivelas y mover controles bajo altos niveles de estr�s y fuerza gravitatoria. Esto demostr� que el cerebro humano podr�a seguir pensando all� arriba.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5076195183857675",
          "imgCaption": "Los primates fueron fundamentales para las pruebas de pilotaje."
        },
        {
          "title": "Gatos y Peque�os Exploradores",
          "text": "Pero no solo perros y chimpanc�s hicieron historia. El programa franc�s introdujo felinos, como F�licette, para estudiar los impulsos neurol�gicos espaciales instalando neurosensores. Adem�s, cientos de ratones formaron la infanter�a invisible del cosmos, permitiendo probar densidades poblacionales, dietas de radiaci�n y oxigenaci�n.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.32564156428089774",
          "imgCaption": "F�licette, la hero�na felina de Francia."
        },
        {
          "title": "Trajes Espaciales a la Medida",
          "text": "Ninguno de estos animales vol� de imprevisto. Ingenieros de todo el globo dise�aron c�psulas hiper-optimzadas a la biom�trica de cada especie: trajes de ox�geno en miniatura, sillas contorneadas con gel absorbe-impactos para perros, y paneles de distribuci�n ergon�mica para chimpanc�s.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.2272037158327862",
          "imgCaption": "Tecnolog�a vital dise�ada anat�micamente."
        },
        {
          "title": "Un Legado Inmortal",
          "text": "Hoy la comunidad internacional reconoce la contribuci�n de estas especies. Sin su coraje silencioso e instintivo, el programa Apolo jam�s habr�a pisado la Luna y la ISS nunca existir�a. Es fundamental honrar sus datos biol�gicos en la conquista que hoy pertenece a la humanidad.",
          "video": "/assets/animales/Ham.mp4",
          "imgCaption": "El sacrificio y valent�a de la vida animal.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.1383729326105877"
        },
        {
          "title": "Los Monos Rhesus: Sam y Miss Sam",
          "text": "En 1959 y 1960, EE.UU. lanz? dos monos rhesus llamados Sam y Miss Sam en pruebas del sistema de escape de emergencia de las cápsulas Mercury. Sam viaj? a 85 km de altitud y fue recuperado en 3 horas. Miss Sam también sobrevivi? perfectamente. Sus vuelos confirmaron que el sistema de escape de emergencia funcionaba correctamente para salvar vidas humanas.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.17040207369627702",
          "imgCaption": "El mono Sam y la mona Miss Sam volaron en 1959 y 1960 probando el sistema de escape de emergencia de las cápsulas Mercury. Fuente: NASA"
        },
        {
          "title": "Enos: El Chimpanc? que Orbit? la Tierra",
          "text": "Enos fue el primer chimpanc? en orbitar la Tierra, el 29 de noviembre de 1961, en la cápsula Mercury MR-6. Complet? 3 ?rbitas en 3 horas y 20 minutos. Enos fue entrenado para realizar tareas durante el vuelo, demostrando que un primate podía funcionar cognitivamente bajo las condiciones del vuelo orbital. Su ?xito abri? el camino para John Glenn, el primer estadounidense en orbitar la Tierra.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7548469052684443",
          "imgCaption": "Enos, el chimpanc? que orbit? la Tierra en 1961, prepar? el camino para el vuelo de John Glenn. Fuente: NASA"
        },
        {
          "title": "La Osteoporosis Espacial",
          "text": "Uno de los descubrimientos más importantes de los mamíferos en el espacio fue la pérdida de masa ?sea. En microgravedad, los huesos no soportan peso, por lo que el cuerpo los debilita. Los primeros experimentos con ratas en el espacio mostraron hasta un 40% de pérdida de densidad ?sea en semanas. Esto llev? al desarrollo de protocolos de ejercicio y medicamentos que usan los astronautas hoy.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.32627209701645576",
          "imgCaption": "Los estudios con mamíferos en el espacio revelaron la pérdida de densidad ?sea como uno de los principales riesgos del vuelo espacial. Fuente: NASA"
        },
        {
          "title": "Los Másculos en Microgravedad",
          "text": "Los mamíferos enviados al espacio también mostraron atrofia muscular rápida: los másculos que no trabajan contra la gravedad pierden masa y fuerza. En los primeros vuelos de ratas, la atrofia era visible después de solo 1-2 semanas. Estos hallazgos llevaron al desarrollo de programas de ejercicio físico obligatorio en la ISS: 2 horas diarias de ejercicio para cada astronauta.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.22880252085759145",
          "imgCaption": "La atrofia muscular observada en mamíferos llev? a la implementación de rutinas obligatorias de ejercicio en la ISS. Fuente: NASA/ISS"
        },
        {
          "title": "El Sistema Cardiovascular en el Espacio",
          "text": "En microgravedad, la sangre y los fluidos corporales se redistribuyen hacia la cabeza. Esto causa la característica 'cara hinchada' de los astronautas y los problemas de visión observados en misiones largas. Los estudios con mamíferos en el espacio identificaron estos problemas cardiovasculares décadas antes de que los astronautas los sufrieran. El corazón también se vuelve más esférico en el espacio.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6912890495372684",
          "imgCaption": "La redistribución de fluidos corporales observada primero en animales fue identificada como riesgo cardiovascular para astronautas. Fuente: NASA"
        },
        {
          "title": "Las Ratas de la ISS: Genómica Espacial",
          "text": "Hoy en día, las ratas siguen siendo los animales más usados en experimentos espaciales. En la ISS se han realizado experimentos de genómica comparando el ADN de ratas en el espacio y en la Tierra. Se encontraron cambios en la expresión génica relacionados con el estrés, la inflamación y el envejecimiento. Los resultados guían el desarrollo de medicamentos para astronautas en misiones largas.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7568610066873406",
          "imgCaption": "Las ratas en la ISS continúan revelando cambios genéticos causados por la microgravedad y la radiación cósmica. Fuente: NASA"
        },
        {
          "title": "Los Gemelos Idénticos: El Estudio Definitivo",
          "text": "El estudio de gemelos más importante de la historia espacial compar? al astronauta Scott Kelly (340 días en la ISS) con su hermano gemelo idéntico Mark Kelly (en la Tierra). Se encontraron cambios en la expresión de genes, longitud de telómeros, microbioma intestinal y hasta en su visión. Al regresar, muchos cambios se revirtieron, pero no todos. Este estudio guía la preparación para viajes a Marte.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7623653049005478",
          "imgCaption": "El estudio de los gemelos Kelly compar? los efectos espaciales en Scott (ISS) versus su hermano gemelo Mark (Tierra). Fuente: NASA"
        },
        {
          "title": "Los Nematodos: Los Supervivientes del Columbia",
          "text": "Cuando el transbordador Columbia se desintegr? al reentrar en 2003, perecieron 7 astronautas. Sin embargo, experimentos con gusanos nematodos Caenorhabditis elegans sobrevivieron a la tragedia. Los contenedores con los gusanos cayeron al suelo protegidos por las cajas de experimentos. Los gusanos seguían vivos y reproduciéndose, y sus datos fueron recuperados por los científicos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6545555170069547",
          "imgCaption": "Los gusanos nematodos sobrevivieron la desintegración del Columbia en 2003, rescatando datos científicos invaluables. Fuente: NASA"
        },
        {
          "title": "El Legado Científico de los Mamíferos en el Espacio",
          "text": "Los mamíferos enviados al espacio transformaron la medicina espacial. Sus experimentos generaron los protocolos de nutrición, ejercicio y monitoreo médico que mantienen sanos a los astronautas actuales. Los descubrimientos sobre pérdida ?sea y muscular también impactaron el tratamiento de la osteoporosis y la sarcopenia en personas de edad avanzada en la Tierra.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7272270762206566",
          "imgCaption": "El legado de los mamíferos espaciales incluye protocolos médicos que benefician tanto a astronautas como a pacientes con osteoporosis. Fuente: NASA/ESA"
        }
      ],
      "bibliography": [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer.",
        "NASA History Division. (2020). Monkeys and Apes in Space.",
        "Beisher, D. E. (1971). Life in Space. TIME-LIFE Books."
      ]
    },
    "quizEs": [
      {
        "q": "¿Por qué los científicos eligieron monos macacos Rhesus para los primeros vuelos de mamíferos?",
        "options": [
          "Porque son los animales más baratos.",
          "Porque su biología (corazón, pulmones, sistema nervioso) es muy similar a la de los humanos.",
          "Porque son los más valientes de todos los animales."
        ],
        "a": 1
      },
      {
        "q": "¿A cuántos kilómetros de altitud llegó Albert II, convirtiéndose en el primer mamífero en el espacio?",
        "options": [
          "134 kilómetros.",
          "500 kilómetros.",
          "Llegó hasta la Luna."
        ],
        "a": 0
      },
      {
        "q": "¿Qué componente falló al regreso de Albert II causando su muerte?",
        "options": [
          "El motor del cohete.",
          "El sistema de paracaídas, que no se desplegó correctamente.",
          "El casco del traje espacial."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Mamíferos en el Espacio (Los Primeros Astronautas No Humanos)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Los Perros C�smicos (URSS)', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Mamíferos en el Espacio', �qu� funci�n cumple la fase de 'Simios y Monos (EE. UU.)'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Gatos y Peque�os Exploradores'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Mamíferos en el Espacio",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Trajes Espaciales a la Medida', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Mamíferos en el Espacio' ocurre en 'Un Legado Inmortal'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Los Primeros Astronautas No Humanos'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Mamíferos en el Espacio', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Un Legado Inmortal', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "animales_albert_ham",
    "order": 18,
    "titleEn": "Albert and Ham",
    "titleEs": "Simio Albert y Simio Ham",
    "badge": "AstroChimp",
    "badgeEs": "AstroChimp",
    "color": "#FF6B00",
    "contentEs": {
      "sections": [
        {
          "title": "El Programa V-2 y Albert I",
          "text": "La historia de los primates comienza con el crat�r del cohete V-2 capturado en White Sands, Nuevo M�xico. En 1948, Albert I, un peque�o mono Rhesus, se convirti� en el primer mam�fero astronauta. Aunque no super� su vuelo debido a problemas con la nave, sembr� los pilares �ticos y funcionales.",
          "image": "https://images-assets.nasa.gov/image/61c0109/61c0109~medium.jpg",
          "imgCaption": "Los or�genes de la l�nea macaca en la aeron�utica."
        },
        {
          "title": "Albert II: Alcanzando el Espacio",
          "text": "En 1949, Albert II logr� sobrevivir las feroces turbulencias atmosf�ricas y alcanzar unos espectaculares 134 km de altitud, cruzando leg�timamente la L�nea de K�rm�n (el l�mite del espacio). A efectos legales y f�sicos, Albert II fue el primer primate en pisar el cosmos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.33283391993594036",
          "imgCaption": "El mono pionero de 1949."
        },
        {
          "title": "Los Retos del Regreso",
          "text": "Lanzar objetos es relativamente f�cil, aterrizarlos no. La c�psula de Albert II experiment� un fallo en los paraca�das de recuperaci�n al descender. Esta falla llev� a la NASA a repensar la seguridad de cabina, creando escudos t�rmicos protectores modernos que salvar�an astronautas humanos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4851021259979089",
          "imgCaption": "Los paraca�das y el redise�o bal�stico."
        },
        {
          "title": "Entrenamiento Neurol�gico Chimpanc�",
          "text": "Para el Proyecto Mercury en los a�os 60, no bastaba con ser pasajero; hab�a que volar la nave. La Fuerza A�rea reclut� a los chimpanc�s astrocadet. Fueron entrenados utilizando luces de colores, timbres y palancas de empuje, recompens�ndolos t�rmicamente con jugo de pl�tano.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.964931114632354",
          "imgCaption": "Una intensa formaci�n neurol�gica operaria."
        },
        {
          "title": "El Chimpanc� Ham: Una Nueva Era",
          "text": "De docenas de chimpanc�s entrenados, destac� el recluta n�mero #65, rebautizado inteligentemente como Ham (Holloman Aerospace Medical Center). A diferencia de sus predecesores asustados, Ham pose�a un temperamento excepcionalmente tranquilo en simuladores de gravedad, lo que lo hizo candidato estelar.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3555331007490605",
          "imgCaption": "El chimpanc� que pilotar�a hacia la edad espacial."
        },
        {
          "title": "El Traje Biom�trico de Ham",
          "text": "Antes de volar, Ham era introducido en una bio-c�psula personalizada presurizada con un 100% de ox�geno que monitoreaba su frecuencia respiratoria, temperatura y electrocardiograma remotamente hasta Florida.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6216449975726762",
          "imgCaption": "Sistemas vitales remotos de los a�os 60."
        },
        {
          "title": "El Hist�rico Vuelo Redstone 2",
          "text": "En enero de 1961, el cohete Mercury-Redstone 2 fue lanzado desde Cabo Ca�averal. Una falla en la v�lvula inyect� demasiado combustible, llevando a Ham 68 kil�metros m�s alto y a una velocidad terror�fica superior a la planeada, sufriendo hasta 14 fuerzas G durante el reingreso abrasador.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4740043568748187",
          "imgCaption": "El violento ascenso hacia la ingravidez."
        },
        {
          "title": "Un Piloto Perfecto Bajo Estr�s",
          "text": "�El miedo paraliz� a Ham? �Al contrario! A pesar de sufrir fallas parciales de ox�geno y extrema sacudida brutal, la telemetr�a demostr� que Ham sigui� tirando de las palancas en el orden perfecto, probando que el estr�s c�smico no borra la memoria motriz operaria.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5048004869723921",
          "imgCaption": "Un instinto firme contra el p�nico planetario."
        },
        {
          "title": "Regreso, Fama y Enos",
          "text": "Ham ameriz� en el mar. Fue rescatado feliz, recompensado con una manzana y vivi� apaciblemente d�cadas. Meses despu�s, otro chimpanc� llamado Enos repetir�a la proeza, pero dando vueltas orbitales a todo el planeta. Demostraron que el ser humano estaba listo para el despegue absoluto.",
          "video": "/assets/animales/Ham.mp4",
          "imgCaption": "Descanso hist�rico luego de la aceleraci�n gravitacional.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.08992730798449933"
        },
        {
          "title": "Los Compañeros de Ham en el Programa Mercury",
          "text": "Ham no estuvo solo. El programa de chimpancés de la NASA entren? a más de 40 chimpancés capturados en ?frica Occidental. Todos vivieron en las instalaciones de la Fuerza Aérea en Holloman, Nuevo México. Cada uno fue entrenado para tareas específicas de palancas e indicadores luminosos. La NASA no revel? públicamente los nombres de todos los participantes para mantenerlos anónimos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.0034992205237013296",
          "imgCaption": "Los chimpancés del programa Mercury fueron entrenados en Holloman Air Force Base, Nuevo México. Fuente: NASA"
        },
        {
          "title": "El Condicionamiento Operante de Ham",
          "text": "Ham fue entrenado mediante condicionamiento operante: cuando respondía correctamente a un indicador luminoso con la palanca correcta en 5 segundos, recibía una banana. Si fallaba o se tardaba, recibía una leve descarga eléctrica en el pie. Este método demostr? que un primate podía mantener sus capacidades cognitivas incluso bajo el estrés del lanzamiento y la ingravidez.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.37804740255449987",
          "imgCaption": "El entrenamiento de Ham mediante condicionamiento operante demostr? que podía trabajar bajo las condiciones extremas del vuelo espacial. Fuente: NASA"
        },
        {
          "title": "El Regreso de Ham: Héroe Nacional",
          "text": "Cuando Ham fue recuperado del océano Atlántico tras su vuelo exitoso, fue llevado a Washington D.C. donde fue fotografiado con el secretario de Defensa y recibi? una manzana y naranja como premio. El mundo entero sigui? su historia con fascinación. Ham vivi? hasta 1983, pasando sus ?ltimos años en el zoológico de Washington D.C. donde fue una atracción muy visitada.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8547933972175253",
          "imgCaption": "Ham tras su recuperación del océano, sosteniendo una manzana mientras posa para los fotógrafos en 1961. Fuente: NASA"
        },
        {
          "title": "El Legado Científico de Ham",
          "text": "Los datos biomédicos recopilados durante el vuelo de Ham fueron decisivos para aprobar el primer vuelo humano americano. Los médicos verificaron que la frecuencia cardíaca, la presión sanguínea y la temperatura corporal de Ham se mantuvieron dentro de rangos normales durante el vuelo. Esto confirm? que Alan Shepard podía sobrevivir las condiciones del vuelo suborbital.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4441675895952897",
          "imgCaption": "Los datos médicos de Ham fueron cruciales para autorizar el vuelo histórico del astronauta Alan Shepard el 5 de mayo de 1961. Fuente: NASA"
        },
        {
          "title": "Albert I al Albert VI: Una Saga de Sacrificios",
          "text": "La saga de los monos Albert comenz? con Albert I (1948) y continu? hasta Albert VI (1951). Los primeros cinco Alberts murieron: Albert I por asfixia, Albert II sobrevivi? el vuelo pero muri? al impactar, Albert III y IV murieron en explosiones del cohete, y Albert V en un fallo del paracaídas. Solo Albert VI sobrevivi? el vuelo y el aterrizaje, aunque muri? 2 horas después de estrés por calor.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.10563059916151596",
          "imgCaption": "La saga de los monos Albert (1948-1951) fue una serie de experimentos cruciales pero trágicos que costaron la vida de todos los participantes. Fuente: NASA"
        },
        {
          "title": "Del Mono al Humano: El Paso Decisivo",
          "text": "El vuelo de Ham el 31 de enero de 1961 fue el penúltimo paso antes del primer vuelo humano americano. Exactamente 2 meses y 5 días después, el 5 de mayo de 1961, Alan Shepard se convirti? en el primer estadounidense en el espacio, repitiendo la misma trayectoria suborbital de Ham. Sin los datos de Ham, la NASA no habría aprobado tan rápidamente el vuelo de Shepard.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.2967837011753852",
          "imgCaption": "Alan Shepard, el primer estadounidense en el espacio, sigui? la misma trayectoria que Ham había completado exitosamente semanas antes. Fuente: NASA"
        }
      ],
      "bibliography": [
        "NASA History Division. (2024). Mercury Primate Flights: Ham the Chimp.",
        "Burgess, C., & Dubbs, C. (2007). Animals in Space. Springer.",
        "Catchpole, C. (2004). Ham: The Astrochimp. Scholastic."
      ]
    },
    "quizEs": [
      {
        "q": "¿Qué significan las siglas 'HAM' en el nombre del famoso chimpancé astronauta?",
        "options": [
          "Holloman Aerospace Medical Center.",
          "High Altitude Monkey.",
          "Houston Astronaut Mission."
        ],
        "a": 0
      },
      {
        "q": "¿Qué problema ocurrió durante el lanzamiento de Ham que hizo que el vuelo fuera más difícil de lo planeado?",
        "options": [
          "El cohete se apagó y tuvo que reiniciarse.",
          "Un regulador falló haciendo que el cohete acelerara demasiado, sometiendo a Ham a 17G de fuerza.",
          "Ham se negó a presionar las palancas durante el vuelo."
        ],
        "a": 1
      },
      {
        "q": "¿Qué gran logro humano hizo posible el vuelo de Ham al demostrar que la cápsula Mercury era segura?",
        "options": [
          "La llegada del hombre a la Luna en 1969.",
          "El primer vuelo espacial de Alan Shepard, primer estadounidense en el espacio, en mayo de 1961.",
          "La construcción de la Estación Espacial Internacional."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Simio Albert y Simio Ham (El Programa V-2 y Albert I)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Albert II: Alcanzando el Espacio', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Simio Albert y Simio Ham', �qu� funci�n cumple la fase de 'Los Retos del Regreso'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Entrenamiento Neurol�gico Chimpanc�'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Simio Albert y Simio Ham",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Chimpanc� Ham: Una Nueva Era', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Simio Albert y Simio Ham' ocurre en 'El Traje Biom�trico de Ham'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'El Programa V-2 y Albert I'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Simio Albert y Simio Ham', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Traje Biom�trico de Ham', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "animales_laika",
    "order": 19,
    "titleEn": "Laika the Dog",
    "titleEs": "Laika",
    "badge": "Soviet Star",
    "badgeEs": "Heroína Soviética",
    "color": "#D1A3B4",
    "contentEs": {
      "sections": [
        {
          "title": "Laika: La Perrita de las Calles a las Estrellas",
          "text": "Laika era una pequeña perra callejera que vivía en las frías calles de Moscú, Rusia. Tenía entre 2 y 3 años cuando fue capturada por científicos soviéticos en 1957. Era una mezcla de husky siberiano y terrier, con un peso de apenas 6 kilogramos. Los científicos soviéticos preferían perros callejeros porque creían que ya estaban acostumbrados a sobrevivir en condiciones difíciles: el frío extremo ruso, el hambre, los espacios reducidos. Laika se convirtió en la candidata perfecta para la misión más audaz de la historia.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3076627395099326",
          "imgCaption": "Laika, la pequeña perra callejera que se convirtió en heroína espacial."
        },
        {
          "title": "El Entrenamiento: Preparándose para lo Imposible",
          "text": "Para preparar a Laika para el vuelo espacial, los científicos la entrenaron durante semanas en condiciones cada vez más extremas. La acostumbraron a pasar largos períodos dentro de espacios muy pequeños y cerrados, similares a la cápsula espacial. La alimentaron con una pasta nutritiva especial que sería su alimento en el espacio. Le enseñaron a tolerar los ruidos fuertes del cohete y las vibraciones del motor. También la equiparon con sensores médicos que medirían constantemente su ritmo cardíaco, presión arterial y temperatura corporal.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8374681264917095",
          "imgCaption": "Laika durante su entrenamiento en los laboratorios soviéticos."
        },
        {
          "title": "El Sputnik 2: Una Cápsula para la Historia",
          "text": "El 4 de octubre de 1957, la URSS había lanzado el Sputnik 1, el primer satélite artificial de la historia. Solo un mes después, el 3 de noviembre de 1957, los soviéticos lanzaron el Sputnik 2, una misión mucho más ambiciosa: llevar un ser vivo a la órbita de la Tierra. El Sputnik 2 pesaba 508 kilogramos y contenía una cámara presurizada especialmente diseñada para Laika, con sistemas de suministro de oxígeno, control de temperatura y comida automatizada. Fue diseñado en apenas cuatro semanas.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.03991264969460562",
          "imgCaption": "El Sputnik 2 con la cápsula especialmente diseñada para Laika."
        },
        {
          "title": "3 de Noviembre de 1957: La Historia se Escribe",
          "text": "A las 5:30 AM del 3 de noviembre de 1957, el cohete soviético R-7 despegó desde el cosmódromo de Baikonur, en Kazajistán. Laika estaba a bordo. El lanzamiento fue exitoso y el Sputnik 2 alcanzó la órbita terrestre a unos 212 kilómetros de altitud. Laika se convirtió en el primer ser vivo en orbitar la Tierra. Sus sensores transmitían constantemente datos sobre su estado de salud, y durante las primeras horas, la ciencia mundial recibió información biológica nunca antes obtenida: cómo reacciona un corazón mamífero a la ingravidez real.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.1505122160676916",
          "imgCaption": "El Sputnik 2 orbitando la Tierra con Laika a bordo el 3 de noviembre de 1957."
        },
        {
          "title": "Una Misión Sin Regreso",
          "text": "La triste verdad es que desde el principio, la misión del Sputnik 2 no contemplaba el regreso de Laika. La tecnología soviética de 1957 no tenía capacidad para traer una cápsula orbital de vuelta a la Tierra. Laika falleció pocas horas después del lanzamiento: el sistema de control de temperatura de la cabina falló, haciendo que la temperatura subiera a niveles insoportables. En el año 2002, el científico soviético Dimitri Malashenkov reveló esta verdad que había sido ocultada durante décadas. Laika vivió entre 5 y 7 horas en el espacio.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9424038966848742",
          "imgCaption": "Laika, la heroína que nunca regresó a casa pero que dio todo por la ciencia."
        },
        {
          "title": "El Tributo a una Heroína Eterna",
          "text": "Laika es hoy uno de los símbolos más poderosos de la exploración espacial. En Moscú existe un monumento en su honor, cerca del Instituto de Medicina Militar donde fue entrenada. Su imagen ha aparecido en sellos postales de más de 30 países. El Sputnik 2 continuó orbitando la Tierra durante 162 días antes de reentrar a la atmósfera el 14 de abril de 1958. Acompáñame a ver este emotivo tributo a la perrita más valiente de la historia.",
          "video": "/assets/animales/Laika Vid.mp4",
          "style": "normal",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.10752699349562556"
        },
        {
          "title": "El Programa Canino Soviético",
          "text": "La Unión Soviética desarroll? un programa sistemático de entrenamiento de perros para el espacio. Se preferían perros callejeros porque se consideraban más resistentes al estrés que los domásticos. Los perros entrenaron en cápsulas de presión simuladas, centrifugadoras y en condiciones de ruido y vibración. Alrededor de 57 perros soviéticos participaron en vuelos suborbitales entre 1951 y 1966.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8435879541532603",
          "imgCaption": "Los perros callejeros soviéticos fueron entrenados sistemáticamente para el programa espacial por su resistencia al estrés. Fuente: Roscosmos"
        },
        {
          "title": "?Por qu? un Perro Callejero?",
          "text": "Laika fue elegida específicamente por ser una perra callejera pequeña (solo 6 kg), de temperamento tranquilo y demostrada resistencia a condiciones difíciles. Los científicos soviéticos consideraban que los perros callejeros de Mosc?, acostumbrados a temperaturas extremas y escasez de comida, estaban mejor preparados para las condiciones espaciales que los perros domásticos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7797382983125459",
          "imgCaption": "Laika fue seleccionada de las calles de Mosc? por su tamaño, temperamento y resistencia al estrés. Fuente: Roscosmos/NASA"
        },
        {
          "title": "El Entrenamiento de Laika",
          "text": "Laika fue entrenada durante semanas en simuladores de cápsulas espaciales cada vez más pequeños para acostumbrarla al confinamiento. Aprendi? a comer el alimento en gel especial que tendría en el espacio. Fue sometida a pruebas de centrifugadora y monitoreada con sensores médicos. Su compañero de entrenamiento Albina ya había sobrevivido dos vuelos suborbitales.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.0884463818763983",
          "imgCaption": "Laika durante su entrenamiento en el simulador de la cápsula Sputnik 2, adaptándose al confinamiento. Fuente: Roscosmos"
        },
        {
          "title": "El Sputnik 2: Una Cápsula sin Regreso",
          "text": "El Sputnik 2 fue construido en apenas 4 semanas, siguiendo ?rdenes de regreso para el aniversario de la Revolución Soviética. La velocidad de construcción impidi? diseñar un sistema de reentrada. Laika viaj? en una cápsula presurizada de 4 m? con comida para 7 días y un sistema de soporte de vida. La cápsula orbit? la Tierra 2,570 veces antes de desintegrarse el 14 de abril de 1958.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6987063157839908",
          "imgCaption": "El Sputnik 2 fue construido en 4 semanas sin sistema de reentrada: siempre fue una misión sin retorno para Laika. Fuente: Roscosmos"
        },
        {
          "title": "La Telemetría: Los ?ltimos Datos de Laika",
          "text": "Los sensores del Sputnik 2 transmitieron datos vitales de Laika durante las primeras horas. Su frecuencia cardíaca se triplic? durante el lanzamiento. Durante las primeras ?rbitas, los datos mostraron que su ritmo cardíaco y respiración se normalizaron, confirmando que podía sobrevivir la ingravidez. Sin embargo, la temperatura en la cápsula subi? a niveles letales por un fallo de aislamiento.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5944254679308232",
          "imgCaption": "Los sensores médicos del Sputnik 2 transmitieron los signos vitales de Laika durante sus primeras horas de vuelo. Fuente: Roscosmos"
        },
        {
          "title": "La Verdad Tardía sobre la Muerte de Laika",
          "text": "Durante décadas, los soviéticos afirmaron que Laika había muerto pacíficamente después de 7 días al agotarse el oxígeno. En 2002, el científico soviético Dimitri Malashenkov revel? la verdad: Laika muri? de sobrecalentamiento y estrés pocas horas después del lanzamiento, probablemente en la cuarta ?rbita, por un fallo en el sistema de control de temperatura.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.0257201401539342",
          "imgCaption": "En 2002 se revel? que Laika muri? pocas horas después del lanzamiento por sobrecalentamiento, no después de 7 días como se afirm? oficialmente. Fuente: NASA"
        },
        {
          "title": "El Monumento a Laika en Mosc?",
          "text": "En 2008, en el 50? aniversario de su vuelo, se inaugur? un monumento a Laika frente al edificio del Instituto de Medicina Militar de Mosc? donde fue entrenada. La escultura la muestra parada sobre un cohete. El científico que la entren?, Oleg Gazenko, dijo en 1998: 'La tristeza no se ha ido. No aprendimos suficiente de esta misión para justificar la muerte de Laika.'",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5377585995358865",
          "imgCaption": "El monumento a Laika en Mosc?, inaugurado en 2008, en el 50? aniversario de su histórico vuelo. Fuente: Roscosmos"
        },
        {
          "title": "Belka y Strelka: Las Primeras en Regresar",
          "text": "El 19 de agosto de 1960, las perras soviéticas Belka y Strelka se convirtieron en los primeros animales en orbitar la Tierra y regresar vivos. Completaron 17 ?rbitas en 25 horas. Strelka tuvo después cachorros, y el líder soviético Nikita Jruschov regal? uno de ellos, Pushinka, al presidente John F. Kennedy como gesto diplomático.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7217910550391454",
          "imgCaption": "Belka y Strelka, las primeras en orbitar la Tierra y regresar vivas, el 19 de agosto de 1960. Fuente: Roscosmos"
        },
        {
          "title": "El Legado de Laika: El Precio de la Exploración",
          "text": "Laika es el símbolo del precio humano (y animal) de la exploración espacial. Su sacrificio involuntario gener? debate ?tico que impuls? regulaciones sobre el uso de animales en la investigación. Los datos de su vuelo demostraron que los seres vivos podían sobrevivir la ingravidez orbital, allanando el camino para Yuri Gagarin, el primer humano en orbitar la Tierra en 1961.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7562413145585596",
          "imgCaption": "Laika, símbolo del precio de la exploración espacial, cuyo sacrificio hizo posible el vuelo humano de Yuri Gagarin en 1961. Fuente: Roscosmos/NASA"
        }
      ],
      "bibliography": [
        "Siddiqi, A. A. (2000). Sputnik and the Soviet Space Challenge. University Press of Florida.",
        "Malashenkov, D. C. (2002). Some Unknown Pages of the Living Organisms' First Orbital Flights. IAF Abstract.",
        "Burgess, C., & Dubbs, C. (2007). Animals in Space. Springer."
      ]
    },
    "quizEs": [
      {
        "q": "¿Por qué los científicos soviéticos prefirieron usar perros callejeros para sus experimentos espaciales?",
        "options": [
          "Porque son más baratos de comprar.",
          "Porque estaban acostumbrados a sobrevivir en condiciones difíciles como el frío y los espacios reducidos.",
          "Porque los perros callejeros son más inteligentes que los de raza."
        ],
        "a": 1
      },
      {
        "q": "¿En qué satélite viajó Laika al espacio y cuándo fue lanzado?",
        "options": [
          "Sputnik 1, el 4 de octubre de 1957.",
          "Sputnik 2, el 3 de noviembre de 1957.",
          "Vostok 1, el 12 de abril de 1961."
        ],
        "a": 1
      },
      {
        "q": "¿Cuál fue la causa real de la muerte de Laika durante el vuelo?",
        "options": [
          "El cohete explotó al llegar al espacio.",
          "El sistema de control de temperatura falló, haciendo que la cabina se calentara demasiado.",
          "Laika se quedó sin oxígeno antes de llegar a la órbita."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Laika (Laika: La Perrita de las Calles a las Estrellas)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'El Entrenamiento: Preparándose para lo Imposible', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Laika', �qu� funci�n cumple la fase de 'El Sputnik 2: Una Cápsula para la Historia'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a '3 de Noviembre de 1957: La Historia se Escribe'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Laika",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Una Misión Sin Regreso', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Laika' ocurre en 'El Tributo a una Heroína Eterna'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Laika: La Perrita de las Calles a las Estrellas'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Laika', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Tributo a una Heroína Eterna', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "animales_gatos",
    "order": 20,
    "titleEn": "Cats in Space",
    "titleEs": "Gatos en el espacio",
    "badge": "AstroCat",
    "badgeEs": "AstroCat",
    "color": "#3258A6",
    "contentEs": {
      "sections": [
        {
          "title": "Francia Entra a la Carrera Espacial",
          "text": "Mientras Estados Unidos enviaba monos y la Unión Soviética enviaba perros, Francia decidió que tenía algo que aportar a la carrera espacial: ¡sus propios animales astronautas! El Centre National d'Études Spatiales (CNES) seleccionó a los gatos como candidatos para estudiar el sistema nervioso en ingravidez. Los investigadores creían que los felinos, con su extraordinario sistema nervioso y su famosa capacidad de mantener la calma, eran perfectos para medir cómo el cerebro reacciona al espacio.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9119846300048109",
          "imgCaption": "Cinco gatos candidatos del programa espacial francés sujetos en sus arneses de entrenamiento en el CNES, París, 1963."
        },
        {
          "title": "Félicette: La Gata Elegida de París",
          "text": "De una docena de gatos entrenados en París, una pequeña gata de pelaje gris y blanco fue la elegida para la misión: Félicette. Los científicos la seleccionaron porque era notablemente tranquila, con una frecuencia cardíaca estable y un temperamento sereno incluso en las condiciones de entrenamiento más estresantes. Originalmente registrada sin nombre oficial, solo décadas después gracias a una campaña de crowdfunding de 2017 se levantó una estatua en su honor con su nombre.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.28409402087824487",
          "imgCaption": "Félicette (izquierda) junto a Bigoudis, otra de las gatas entrenadas. Félicette fue la elegida por su temperamento tranquilo."
        },
        {
          "title": "Electrodos en el Cerebro: Ciencia de Vanguardia",
          "text": "Para este experimento, los científicos franceses realizaron algo que nunca había hecho antes: implantaron delicados electrodos en el cerebro de Félicette. Estos electrodos eran capaces de transmitir señales eléctricas cerebrales en tiempo real desde el espacio hasta los laboratorios en la Tierra. Permitió a los neurocientíficos estudiar por primera vez cómo el cerebro de un mamífero funciona durante la ingravidez y durante las fuerzas G del lanzamiento y regreso. Era ciencia de vanguardia absoluta.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.7413662802570057",
          "imgCaption": "Félicette equipada con los electrodos cerebrales implantados por los científicos franceses, junto a la cápsula del cohete Véronique AG1."
        },
        {
          "title": "18 de Octubre de 1963: El Gran Salto Felino",
          "text": "El 18 de octubre de 1963, el cohete francés Véronique AG1 despegó desde el campo de pruebas de Hammaguir en el Sáhara Argelino. Félicette, sujeta en su pequeña cápsula presurizada, experimentó el rugido del motor y las fuerzas del lanzamiento. El cohete la llevó hasta 157 kilómetros de altitud, claramente dentro del espacio exterior. Durante los aproximadamente 5 minutos de ingravidez, los electrodos cerebrales transmitieron datos científicos sin precedentes.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.41005356495125034",
          "imgCaption": "Félicette sometida a pruebas de fuerza G en la centrífuga del CNES días antes del lanzamiento del 18 de octubre de 1963."
        },
        {
          "title": "El Regreso Triunfal: ¡Los Gatos Siempre Caen de Pie!",
          "text": "Después de los 5 minutos de ingravidez, la cápsula de Félicette se separó del cohete y comenzó su descenso. A diferencia de la tragedia de Laika, esta misión sí contemplaba el regreso seguro. Un paracaídas se desplegó perfectamente y la cápsula aterrizó suavemente en el desierto argelino. Félicette fue recuperada en perfectas condiciones de salud. Sus datos neurológicos fueron analizados durante años y contribuyeron enormemente al conocimiento de la neurología espacial.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4329522531024065",
          "imgCaption": "Félicette dentro de su cápsula espacial, asegurada en su arnés. Sobrevivió los 5 minutos de ingravidez y regresó sana al Sáhara."
        },
        {
          "title": "El Monumento a la Felina Pionera",
          "text": "Lamentablemente, Félicette fue poco reconocida después de su vuelo y falleció meses después en un procedimiento de investigación posterior. Durante décadas, su historia fue olvidada. Pero en 2019, gracias a una campaña de financiamiento colectivo que recaudó fondos de personas de 60 países, se inauguró una hermosa estatua de bronce en la International Space University de Estrasburgo, Francia, honrando para siempre a la primera y única gata astronauta de la historia.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.025056481489921012",
          "imgCaption": "Félicette junto a otra gata del programa. En 2019 se inauguró un monumento de bronce en su honor en la Universidad Espacial Internacional de Estrasburgo."
        },
        {
          "title": "El CNES y el Programa Felino",
          "text": "El Centro Nacional de Estudios Espaciales de Francia (CNES) desarroll? entre 1961 y 1963 un programa de vuelos suborbitales con gatos. El objetivo era estudiar el sistema nervioso en condiciones de ingravidez usando electrodos implantados en el cerebro de los gatos. Francia era la tercera nación en desarrollo espacial activo, después de la URSS y EE.UU.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6316156131476072",
          "imgCaption": "El CNES desarroll? entre 1961 y 1963 un programa de investigación neurológica con gatos para estudiar la microgravedad. Fuente: CNES"
        },
        {
          "title": "14 Candidatos Felinos en Entrenamiento",
          "text": "Para el programa espacial, el CNES seleccion? 14 gatos de la calle (capturados en París) y los someti? a un riguroso entrenamiento. Fueron condicionados a tolerar el confinamiento en pequeñas cajas durante horas, sometidos a pruebas en centrifugadoras y habituados al ruido de los cohetes. De los 14 candidatos, solo unos pocos fueron finalmente considerados para el vuelo.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.421537375168738",
          "imgCaption": "Los 14 gatos candidatos del programa espacial francés en sus arneses de entrenamiento en el CNES. Fuente: CNES/Paris Match"
        },
        {
          "title": "Los Electrodos Cerebrales: Ciencia de Vanguardia",
          "text": "Los neurocientíficos del CNES implantaron quirúrgicamente electrodos en el cerebro de los gatos candidatos para medir la actividad neurológica durante el vuelo. Los electrodos registraban señales del cerebro en tiempo real, transmitidas a tierra durante el vuelo. Este tipo de neuroimagen en tiempo real era tecnología de vanguardia en 1963.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5183837781314198",
          "imgCaption": "Félicette equipada con los electrodos cerebrales implantados por los neurocientíficos del CNES. Fuente: CNES"
        },
        {
          "title": "El Análisis de los Datos Neurológicos",
          "text": "Los datos neurológicos recopilados durante el vuelo de Félicette fueron analizados por el equipo del Dr. Jacques-Michel Poirier. Los registros mostraron que la actividad cerebral de Félicette se mantuvo en patrones normales durante la ingravidez, a pesar del estrés del lanzamiento. Estos datos contribuyeron al entendimiento de cómo el sistema nervioso se adapta a la microgravedad.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.06584167458569434",
          "imgCaption": "Los registros de actividad neurológica de Félicette durante su vuelo revelaron que el cerebro funciona normalmente en ingravidez. Fuente: CNES"
        },
        {
          "title": "El Segundo Vuelo: 24 de Octubre de 1963",
          "text": "Solo 6 días después del vuelo de Félicette, el 24 de octubre de 1963, Francia lanz? un segundo gato al espacio. Sin embargo, este segundo vuelo fall?: la cápsula no fue recuperada correctamente y el gato muri?. Este fracaso contrast? con el ?xito de Félicette y subray? los riesgos de la exploración espacial incluso en misiones aparentemente rutinarias.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5736780197820036",
          "imgCaption": "El segundo vuelo francés con gato, el 24 de octubre de 1963, termin? en tragedia al fallar la recuperación de la cápsula. Fuente: CNES"
        },
        {
          "title": "Félicette vs Laika: Diferentes Destinos",
          "text": "Félicette y Laika representan dos enfoques diferentes de la exploración animal en el espacio. Laika fue enviada sabiendo que moriría. Félicette fue enviada con un plan de recuperación real y regres? viva. Sin embargo, Félicette fue sacrificada 2 meses después de su vuelo para que los científicos estudiaran sus electrodos cerebrales en el laboratorio.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.272128794189636",
          "imgCaption": "Félicette sobrevivi? su vuelo, a diferencia de Laika: dos enfoques distintos de la exploración animal en el espacio. Fuente: CNES"
        },
        {
          "title": "El Reconocimiento Tardío de Félicette",
          "text": "Durante décadas, Félicette fue casi olvidada. Se la confundía frecuentemente con un gato macho llamado 'Félix'. En 2017, una campaña de crowdfunding internacional recaud? suficiente dinero para erigir un monumento a Félicette. En 2019, se inaugur? una estatua de bronce en la Universidad Espacial Internacional de Estrasburgo mostrando a Félicette mirando al espacio.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.49367435699913265",
          "imgCaption": "El monumento de bronce a Félicette inaugurado en 2019 en la Universidad Espacial Internacional de Estrasburgo. Fuente: CNES/ISU"
        },
        {
          "title": "?Por Qu? los Gatos? La Ciencia Detrás",
          "text": "Los gatos fueron elegidos por el CNES por razones científicas específicas: su sistema nervioso es similar al humano en muchos aspectos, y sus cerebros relativamente grandes facilitaban la implantación de electrodos. También son animales tranquilos en reposo, lo que facilitaba distinguir la actividad neurológica de vuelo del estrés del animal. Los perros y monos ya habían sido usados por soviéticos y americanos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.27194720428999974",
          "imgCaption": "Los gatos fueron elegidos por el CNES por las similitudes entre su sistema nervioso y el humano. Fuente: CNES"
        },
        {
          "title": "El Legado del Programa Felino Francés",
          "text": "El programa espacial felino francés contribuy? conocimientos ?nicos sobre el funcionamiento del sistema nervioso en microgravedad. Sus hallazgos fueron integrados en los protocolos de entrenamiento neurológico para astronautas. Francia se posicion? como pionera en la neurociencia espacial, una disciplina que hoy estudia los cambios cognitivos y perceptuales que experimentan los astronautas en misiones largas.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.0436334837370973",
          "imgCaption": "El programa felino del CNES estableci? a Francia como pionera en neurociencia espacial, un campo vital para las misiones actuales. Fuente: CNES/ESA"
        }
      ],
      "bibliography": [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space. Springer.",
        "CNES Archives. (1963). Mission Véronique AG1 - Rapport Final.",
        "Feltman, R. (2017). The True Story of Félicette, the First Cat in Space. Popular Science."
      ]
    },
    "quizEs": [
      {
        "q": "¿Cuál fue el nombre de la gata francesa que viajó al espacio en 1963?",
        "options": [
          "Laika.",
          "Simone.",
          "Félicette."
        ],
        "a": 2
      },
      {
        "q": "¿Qué elemento especial se les implantó a Félicette para hacer mediciones científicas durante el vuelo?",
        "options": [
          "Una cámara de video en su casco.",
          "Electrodos en el cerebro para medir la actividad neurológica en gravedad cero.",
          "Un termómetro bajo la piel para medir la temperatura corporal."
        ],
        "a": 1
      },
      {
        "q": "¿Qué hace especial el vuelo de Félicette comparado con el de Laika?",
        "options": [
          "Félicette llegó más alto que ningún otro animal.",
          "Félicette regresó sana y salva a la Tierra, a diferencia de Laika que no tenía sistema de regreso.",
          "Félicette orbitó la Tierra, mientras Laika solo hizo un vuelo suborbital."
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Gatos en el espacio (Francia Entra a la Carrera Espacial)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Félicette: La Gata Elegida de París', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Gatos en el espacio', �qu� funci�n cumple la fase de 'Electrodos en el Cerebro: Ciencia de Vanguardia'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a '18 de Octubre de 1963: El Gran Salto Felino'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Gatos en el espacio",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Regreso Triunfal: ¡Los Gatos Siempre Caen de Pie!', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Gatos en el espacio' ocurre en 'El Monumento a la Felina Pionera'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Francia Entra a la Carrera Espacial'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Gatos en el espacio', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Monumento a la Felina Pionera', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "asteroides_intro",
    "order": 21,
    "titleEn": "Asteroids",
    "titleEs": "Asteroides",
    "badge": "Rock Hopper",
    "badgeEs": "Saltador de Rocas",
    "color": "#9CA3AF",
    "contentEs": {
      "sections": [
        {
          "title": "¿Qué son los Asteroides?",
          "text": "Son cuerpos celestes, compuestos de roca, hielo, polvo y una serie de gases, relacionados con la formación del Sistema Solar. Un asteroide es un pequeño objeto rocoso que orbita alrededor del Sol. Los asteroides son más pequeños que un planeta, pero más grandes que los objetos del tamaño de un trozo de roca que llamamos meteoroides. El meteoro es el resultado de un meteoroide —una pequeña parte de un asteroide o cometa— que arde al entrar en la atmósfera terrestre y crea un haz de luz en el cielo.",
          "video": "/assets/asteroides/Asteroides y Cometas.mp4",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA15019/PIA15019~small.jpg"
        },
        {
          "title": "Ubicación en Nuestro Sistema Solar",
          "text": "La mayoría de los asteroides en nuestro sistema solar se encuentran en el cinturón de asteroides, una región situada entre Marte y Júpiter. Pero también pueden pasar por otros lugares alrededor del sistema solar. Por ejemplo, algunos asteroides orbitan alrededor del Sol en un camino que los lleva cerca de la Tierra como los asteroides NEO (Near Earth Objects).",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-SPX01_0006/KSC-20231013-PH-SPX01_0006~medium.jpg",
          "imgCaption": "El gran anillo de rocas flotantes entre Marte y Júpiter."
        },
        {
          "title": "El Cinturón Principal de Asteroides",
          "text": "Entre las órbitas rocosas de Marte y Júpiter se extiende el vasto Cinturón Principal. Un anillo disperso donde orbitan rocas heladas, minerales primordiales y polvo estelar sobrante de la creación de nuestro vecindario galáctico. Aunque en películas los asteroides chocan dramáticamente, en realidad están inmensamente separados entre sí, a millones de kilómetros el uno del otro.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-SPX01_0005/KSC-20231013-PH-SPX01_0005~medium.jpg",
          "imgCaption": "Vista del Cinturón Principal de Asteroides. La extensión real supera toda nuestra imaginación.",
          "style": "normal"
        },
        {
          "title": "Tipos de Asteroides: Clasificación Científica",
          "text": "Existen tres tipos principales de asteroides. Los Tipo-C (carbonáceos) son los más comunes y oscuros, compuestos de carbono y minerales primitivos. Los Tipo-S (silíceos) son brillantes y metálicos, ricos en silicatos. Los Tipo-M (metálicos) son los más raros y están formados principalmente de hierro y níquel, posiblemente núcleos fragmentados de planetas destruidos.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-SPX01_0007/KSC-20231013-PH-SPX01_0007~medium.jpg",
          "imgCaption": "El asteroide Bennu visto por OSIRIS-REx: un tipo-C rico en carbono.",
          "style": "normal"
        },
        {
          "title": "Asteroides Troyanos y Cuerpos Cercanos",
          "text": "No todos los asteroides están en el Cinturón Principal. Los Troyanos se acumulan en los Puntos de Lagrange de Júpiter, atrapados en su misma órbita. Los asteroides NEO cruzan peligrosamente cerca de la Tierra. Algunos, como el famoso Apophis, tienen trayectorias tan cercanas que los científicos los monitorizan constantemente con poderosos telescopios y radar planetario.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KLS01_0067/KSC-20231013-PH-KLS01_0067~medium.jpg",
          "imgCaption": "Los asteroides troyanos orbitan los puntos de Lagrange de Júpiter y los NEO cruzan la órbita de la Tierra.",
          "style": "highlight"
        },
        {
          "title": "La Minería de Asteroides: El Futuro",
          "text": "Los asteroides contienen billones de dólares en minerales raros y metales preciosos. El asteroide 16 Psyche, objetivo de una misión NASA activa, podría contener hierro y níquel suficientes para satisfacer la demanda terrestre durante millones de años. La minería espacial es una industria que empezará a desarrollarse en las próximas décadas.",
          "video": "/assets/asteroides/Mineria.mp4",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KED02_0010/KSC-20231013-PH-KED02_0010~medium.jpg"
        },
        {
          "title": "Composición Química",
          "text": "Los asteroides se dividen en tres tipos principales según su composición: Tipo C (carbonáceos, 75% del total, oscuros y antiguos), Tipo S (silíceos, 17%, de roca y níquel-hierro) y Tipo M (metálicos, ricos en níquel y hierro puro). Conocer su composición ayuda a entender cómo se formaron los planetas.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KED07_0004/KSC-20231013-PH-KED07_0004~medium.jpg",
          "imgCaption": "Tipos de asteroides según su composición: C (carbono), S (silicato) y M (metal). Fuente: NASA/JPL"
        },
        {
          "title": "Asteroides Troyanos",
          "text": "Júpiter tiene grupos masivos de asteroides que comparten su ?rbita alrededor del Sol. Se llaman Troyanos y viajan en dos grupos: uno delante de Júpiter y otro detrás, atrapados en puntos de equilibrio gravitacional llamados Puntos de Lagrange (L4 y L5). La misión Lucy de NASA estudiar? estos fósiles del Sistema Solar temprano.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KED05_0021/KSC-20231013-PH-KED05_0021~medium.jpg",
          "imgCaption": "Los asteroides troyanos comparten la ?rbita de Júpiter en los puntos de Lagrange L4 y L5. Fuente: NASA"
        },
        {
          "title": "La Misión Lucy",
          "text": "Lanzada en 2021, la sonda Lucy de la NASA es la primera misión a los asteroides Troyanos de Júpiter. Durante 12 años de misión, Lucy visitar? un número récord de asteroides: un asteroide del cinturón principal y siete troyanos. Como los troyanos son restos de la formación planetaria, estudiarlos es como leer la historia antigua de nuestro Sistema Solar.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KED03_0009/KSC-20231013-PH-KED03_0009~medium.jpg",
          "imgCaption": "Representación artística de la sonda Lucy explorando los troyanos de Júpiter. Fuente: NASA/GSFC"
        },
        {
          "title": "El Mayor de Todos: Ceres",
          "text": "Ceres es el objeto más grande del cinturón de asteroides, con unos 940 km de diámetro. Es tan masivo que su propia gravedad lo hizo redondo, por lo que en 2006 fue clasificado como planeta enano. La sonda Dawn de NASA descubri? que Ceres tiene agua helada bajo su superficie y depósitos de sal brillante en sus cráteres.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-SPX01_0001/KSC-20231013-PH-SPX01_0001~medium.jpg",
          "imgCaption": "Ceres, el planeta enano y objeto más grande del cinturón de asteroides, fotografiado por la sonda Dawn. Fuente: NASA/JPL"
        },
        {
          "title": "Vesta: El Mini-Planeta",
          "text": "Vesta es el segundo objeto más masivo del cinturón principal y tiene unos 530 km de diámetro. A diferencia de la mayoría de asteroides, Vesta tiene capas diferenciadas: un núcleo, un manto y una corteza, como un planeta rocoso en miniatura. Sufri? impactos colosales que expulsaron rocas al espacio, ?y algunas cayeron a la Tierra como meteoritos!",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KED09_0005/KSC-20231013-PH-KED09_0005~medium.jpg",
          "imgCaption": "Vesta, el segundo asteroide más grande, tiene un interior estructurado como un planeta rocoso. Fuente: NASA/JPL/Dawn"
        },
        {
          "title": "Asteroides Cercanos a la Tierra (NEA)",
          "text": "Hay un grupo especial de asteroides cuyas ?rbitas cruzan o se acercan mucho a la ?rbita de la Tierra. Se conocen como Near-Earth Asteroids (NEA). Los científicos de la NASA y otras agencias espaciales monitorean constantemente el cielo para detectar estos objetos, catalogarlos y calcular si alguno representa un riesgo de impacto en el futuro.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-SPX01_0008/KSC-20231013-PH-SPX01_0008~medium.jpg",
          "imgCaption": "Diagrama de asteroides cercanos a la Tierra (NEA), cuyas ?rbitas cruzan la ?rbita terrestre. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "Defensa Planetaria: DART",
          "text": "En 2022, la NASA realiz? la primera prueba de defensa planetaria de la historia: la misión DART (Double Asteroid Redirection Test). La nave espacial se estrell? a propósito a 22,500 km/h contra Dimorphos, un pequeño asteroide que orbitaba a uno más grande (Didymos). El impacto logr? cambiar exitosamente la ?rbita de Dimorphos, demostrando que podemos desviar asteroides.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KED11_0056/KSC-20231013-PH-KED11_0056~medium.jpg",
          "imgCaption": "La misión DART impactando el asteroide Dimorphos, la primera prueba exitosa de defensa planetaria. Fuente: NASA/Johns Hopkins APL"
        },
        {
          "title": "Minería de Asteroides",
          "text": "Los asteroides de tipo M (metálicos) contienen cantidades masivas de metales preciosos como platino, oro e iridio. Algunos científicos y empresas planean en el futuro capturar o minar estos asteroides para obtener recursos espaciales que se agotan en la Tierra. El asteroide Psyche, compuesto de hierro y níquel, vale billones de dólares en materiales.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-SPX01_0009/KSC-20231013-PH-SPX01_0009~medium.jpg",
          "imgCaption": "Representación conceptual de futura minería de asteroides metálicos ricos en recursos preciosos. Fuente: NASA"
        },
        {
          "title": "La Misión Psyche",
          "text": "La misión Psyche de la NASA fue lanzada en 2023 para explorar el asteroide 16 Psyche. Este asteroide es ?nico porque parece ser el núcleo metálico expuesto de un antiguo planeta temprano que perdi? sus capas rocosas externas debido a impactos violentos. Al estudiarlo, aprenderemos más sobre los misteriosos núcleos metálicos ocultos de planetas como la Tierra.",
          "image": "https://images-assets.nasa.gov/image/KSC-20231013-PH-KMO01_0026/KSC-20231013-PH-KMO01_0026~medium.jpg",
          "imgCaption": "Representación de la sonda Psyche aproximándose al asteroide rico en metales 16 Psyche. Fuente: NASA/JPL-Caltech"
        }
      ],
      "bibliography": [
        "NASA Asteroid Facts."
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué región se encuentra la mayoría de los asteroides?",
        "options": [
          "Entre la Tierra y Marte",
          "En el cinturón entre Marte y Júpiter",
          "Cerca de Mercurio"
        ],
        "a": 1
      },
      {
        "q": "¿De qué están compuestos principalmente los asteroides?",
        "options": [
          "Agua pura",
          "Solo gas",
          "Roca, polvo y gases"
        ],
        "a": 2
      },
      {
        "q": "¿Qué es un meteoro?",
        "options": [
          "Un planeta pequeño",
          "Una estrella fugaz gigante",
          "El resultado de un meteoroide ardiendo en la atmósfera"
        ],
        "a": 2
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Asteroides (¿Qué son los Asteroides?)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Ubicación en Nuestro Sistema Solar', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Asteroides', �qu� funci�n cumple la fase de 'El Cinturón Principal de Asteroides'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'Tipos de Asteroides: Clasificación Científica'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Asteroides",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Asteroides Troyanos y Cuerpos Cercanos', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Asteroides' ocurre en 'La Minería de Asteroides: El Futuro'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en '¿Qué son los Asteroides?'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Asteroides', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'La Minería de Asteroides: El Futuro', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "asteroides_meteoros",
    "order": 22,
    "titleEn": "Meteors",
    "titleEs": "Meteoros",
    "badge": "Shooting Star",
    "badgeEs": "Estrella Fugaz",
    "color": "#EF4444",
    "contentEs": {
      "sections": [
        {
          "title": "¿Qué son los Meteoros?",
          "text": "Los meteoros son destellos de luz que ocurren cuando diminutas partículas de polvo de asteroides o cometas entran en nuestra atmósfera a velocidades increíbles y se queman por la fricción. A menudo los llamamos estrellas fugaces. Dos de las lluvias de meteoros más famosas son las Gemínidas y las Perseidas.",
          "video": "/assets/asteroides/Geminid Meteor.mp4",
          "style": "normal",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9380767040714255"
        },
        {
          "title": "Lluvia de Perseidas",
          "text": "A diferencia de las rocas espaciales habituales, estas lluvias anuales iluminan el cielo de forma predecible. Las Perseidas son famosas por producir hasta 100 meteoros por hora.",
          "video": "/assets/asteroides/Perseid Meteor.mp4",
          "style": "normal",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6312021438940296"
        },
        {
          "title": "Los que sobreviven: Meteoritos",
          "text": "No todos los meteoritos se desintegran por completo en la atmósfera. Los más grandes o densos pueden sobrevivir la intensa fricción y, si fragmentos de la roca logran impactar, se les denomina meteoritos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.768015692562074",
          "imgCaption": "Personas examinando un gran meteorito real impactado en nuestro planeta."
        },
        {
          "title": "La increíble historia de Ann Hodges",
          "text": "El 30 de noviembre de 1954 ocurrió uno de los eventos astronómicos más inverosímiles jamás registrados. Tienes más posibilidad de ser golpeado por un tornado, un rayo y un huracán, todo al mismo tiempo, que de ser impactado por un meteorito (posibilidad de 1 en 1,600,000). Sin embargo, Ann Hodges se encontraba en su cama en Alabama cuando un meteorito perforó el techo de su casa y la golpeó en el costado. Hasta la fecha, es la única persona registrada impactada directamente.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.2704676539719302",
          "imgCaption": "Ann Hodges con un severo hematoma tras el impacto galáctico en 1954."
        },
        {
          "title": "El Legado del Meteorito Sylacauga",
          "text": "Donna Rentfrow, directora del Museo Isabel Anderson Comer en Sylacauga, sigue exhibiendo orgullosamente esta enorme y famosa roca espacial que hizo historia aquel día conservado en el recinto museográfico permanentemente para la humanidad.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.47215258772358726",
          "imgCaption": "La vitrina del Museo Isabel Anderson Comer resguardando el meteorito."
        },
        {
          "title": "Minería Espacial",
          "text": "Las meteoritas y sus características minerales son tan diversas y valiosas que representan bloques de construcción puros de los inicios del sistema solar. Estas rocas de otro mundo han sido celosamente resguardadas y estudiadas. Algunos científicos y corporaciones ahora estudian activamente cómo, en el futuro cercano, podríamos llevar a cabo minería espacial para recabar elementos raros.",
          "video": "/assets/asteroides/Mineria.mp4",
          "style": "highlight",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4781768655128773"
        },
        {
          "title": "Los Bólidos o Bolas de Fuego",
          "text": "Cuando un meteoroide es excepcionalmente grande o denso (como una roca del tamaño de un balón de baloncesto), su fricción con la atmásfera produce un destello de luz más brillante que el planeta Venus. A estos meteoros increíblemente brillantes se les llama 'bólidos' o bolas de fuego. A veces pueden fragmentarse en el aire produciendo un sonido atronador.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.05729628173463741",
          "imgCaption": "Un bólido o bola de fuego iluminando el cielo nocturno antes de desintegrarse. Fuente: NASA"
        },
        {
          "title": "Meteoritos: Mensajeros del Pasado",
          "text": "Si un meteoroide sobrevive a la intensa fricción y el calor de la atmásfera terrestre y choca contra el suelo, recibe el nombre de meteorito. Los meteoritos son como fósiles del Sistema Solar primitivo. La mayoría de los meteoritos encontrados en la Tierra tienen unos 4,500 millones de años, ?tan antiguos como el propio Sol!",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8390019694558908",
          "imgCaption": "Un meteorito de hierro encontrado en la Tierra, que sobrevivi? a su viaje a través de la atmásfera. Fuente: NASA"
        },
        {
          "title": "El Meteorito de Allende",
          "text": "En 1969, un gran meteorito cay? cerca de Pueblito de Allende en Chihuahua, México. El Meteorito de Allende es el más estudiado de la historia. Es una condrita carbonácea, un tipo raro que contiene elementos y polvo de estrellas (granos presolares) que son ?aún más antiguos que el Sistema Solar! Esto nos ayuda a entender cómo se formaron los planetas.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9972056332819582",
          "imgCaption": "Fragmento del famoso meteorito de Allende, que contiene material más antiguo que el Sistema Solar. Fuente: NASA/JPL"
        },
        {
          "title": "Meteoritos Marcianos y Lunares",
          "text": "No todos los meteoritos vienen de asteroides. Algunos meteoritos extremadamente raros descubiertos en la Tierra son en realidad trozos de la Luna o de Marte. Impactos masivos en esos mundos expulsaron rocas al espacio, que vagaron durante millones de años hasta caer en nuestro planeta. Estos meteoritos nos permiten estudiar Marte sin necesidad de enviar sondas all?.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8427313558006662",
          "imgCaption": "El meteorito ALH84001, una roca proveniente de Marte descubierta en la Antártida. Fuente: NASA"
        },
        {
          "title": "El Evento de Tunguska",
          "text": "En 1908, una explosión colosal arras? 2,000 kilómetros cuadrados de bosque en la región de Tunguska, en Siberia (Rusia). No se encontr? ningún cráter. Los científicos creen que la explosión fue causada por un pequeño asteroide (o fragmento de cometa) de unos 50-60 metros que explot? en el aire a 5-10 km de altitud, con la fuerza de 1,000 bombas de Hiroshima.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.13015091868218975",
          "imgCaption": "?rboles arrasados en Siberia por el evento de Tunguska en 1908, causado por la explosión aérea de un meteoro. Fuente: Academia Rusa de Ciencias"
        },
        {
          "title": "El Meteorito de Chelyabinsk",
          "text": "El 15 de febrero de 2013, un asteroide de 20 metros de diámetro ingres? a la atmásfera sobre Chelyabinsk, Rusia. Explot? a 30 km de altura generando una onda de choque masiva que rompi? ventanas en 6 ciudades y dej? a más de 1,500 personas heridas por cristales. Fue el evento de impacto más grande registrado en la Tierra desde Tunguska en 1908.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.30080064941570506",
          "imgCaption": "La estela dejada por el meteoro de Chelyabinsk en 2013 antes de su masiva explosión sónica. Fuente: Roscosmos"
        },
        {
          "title": "Los Cráteres de Impacto en la Tierra",
          "text": "Aunque la Tierra tiene una atmásfera densa que la protege, impactos de grandes asteroides dejan enormes cicatrices llamadas cráteres. El Cráter Barringer (o Meteor Crater) en Arizona, EE.UU., mide 1.2 km de ancho. Se form? hace 50,000 años cuando un meteorito de hierro y níquel de 50 metros choc? a más de 45,000 km/h.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3937441150711386",
          "imgCaption": "El Cráter Barringer en Arizona, EE.UU., uno de los cráteres de impacto más jóvenes y mejor conservados de la Tierra. Fuente: NASA"
        },
        {
          "title": "Cómo Identificar un Meteorito",
          "text": "Encontrar un meteorito no es fácil. Suelen ser más pesados que las rocas terrestres normales porque contienen mucho hierro y níquel, por lo que a menudo atraen imanes. Tienen una costra de fusión delgada y oscura creada por el calor al atravesar la atmásfera. La mayoría de los meteoritos se encuentran en la Antártida, donde destacan contra el hielo blanco.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.22562087330051184",
          "imgCaption": "Buscadores de meteoritos de la NASA explorando los campos de hielo de la Antártida. Fuente: NASA/ANSMET"
        },
        {
          "title": "Micrometeoritos: El Polvo Cósmico",
          "text": "Todos los días, la Tierra es bombardeada por unas 100 toneladas de material espacial. La gran mayoría de esto no son rocas gigantes, sino partículas de polvo minúsculas llamadas micrometeoritos. Son tan pequeños que no se queman en la atmásfera; simplemente flotan suavemente hasta el suelo. Puedes encontrar polvo espacial en el techo de tu propia casa.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.8233119918925073",
          "imgCaption": "Micrometeorito recogido de la estratosfera terrestre ampliado mediante microscopio electrónico. Fuente: NASA"
        }
      ],
      "bibliography": [
        "National Geographic: Ann Hodges."
      ]
    },
    "quizEs": [
      {
        "q": "¿Cómo se llama un fragmento que sobrevive y logra impactar la superficie terrestre?",
        "options": [
          "Meteoroide",
          "Meteorito",
          "Planetesimal"
        ],
        "a": 1
      },
      {
        "q": "¿Quién fue la persona que hizo historia al ser impactada por un meteorito?",
        "options": [
          "Isabel Anderson",
          "Ann Hodges",
          "Amelia Earhart"
        ],
        "a": 1
      },
      {
        "q": "¿Cuál es el nombre del impacto en México que extinguió a los dinosaurios?",
        "options": [
          "Krakatoa",
          "Tunguska",
          "Chicxulub"
        ],
        "a": 2
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Meteoros (¿Qué son los Meteoros?)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Lluvia de Perseidas', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Meteoros', �qu� funci�n cumple la fase de 'Los que sobreviven: Meteoritos'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'La increíble historia de Ann Hodges'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Meteoros",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Legado del Meteorito Sylacauga', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Meteoros' ocurre en 'Minería Espacial'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en '¿Qué son los Meteoros?'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Meteoros', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Minería Espacial', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "asteroides_cometas",
    "order": 23,
    "titleEn": "Comets",
    "titleEs": "Cometas",
    "badge": "Ice Voyager",
    "badgeEs": "Viajero de Hielo",
    "color": "#60A5FA",
    "contentEs": {
      "sections": [
        {
          "title": "¿Qué es un Cometa?",
          "text": "A diferencia de la roca seca de los asteroides, un cometa está compuesto de hielo cósmico congelado, gases letales oscuros y mucho polvo estelar. A medida que viajan desde las zonas frías del sistema y se acercan dramáticamente al Sol ardiente, parte del hielo profundo comienza a evaporarse furiosamente, dejando tras de sí una colosal y brillante cola gaseosa llamada 'coma'. Esto los distingue inconfundiblemente de los asteroides.",
          "video": "/assets/asteroides/Cometa Neowise.mp4",
          "style": "highlight",
          "image": "https://images-assets.nasa.gov/image/PIA13438/PIA13438~medium.jpg"
        },
        {
          "title": "El Núcleo Helado: Corazón del Cometa",
          "text": "En el interior más profundo de un cometa se encuentra el Núcleo: una bola irregular de hielo sucio de entre 1 y 50 km de diámetro. Está compuesto de agua congelada, dióxido de carbono, metanol y polvo. Su superficie es tan oscura como el carbón, absorbiendo la luz solar. Cuando el calor penetra estos materiales, los gases atrapados estallan en chorros dramáticos que se disparan al espacio exterior.",
          "image": "https://images-assets.nasa.gov/image/PIA18153/PIA18153~small.jpg",
          "imgCaption": "Estructura interna del núcleo cometario: una esponja de hielo y polvo primordial.",
          "style": "normal"
        },
        {
          "title": "La Coma: La Corona Luminosa",
          "text": "Cuando el cometa se acerca al área cálida del Sol interior, el núcleo sólido libera gases y polvo que forman una nebulosa esférica gigantesca llamada Coma. Esta atmósfera temporal puede extenderse hasta cientos de miles de kilómetros alrededor del núcleo. La Coma refleja la luz solar brillantemente, dando al cometa ese aspecto de estrella borrosa y difusa que vemos con telescopio.",
          "image": "https://images-assets.nasa.gov/image/s73-38390/s73-38390~medium.jpg",
          "imgCaption": "La Coma del cometa NEOWISE capturada por el telescopio Hubble en 2020.",
          "style": "normal"
        },
        {
          "title": "La Doble Cola: Cola de Iones y Cola de Polvo",
          "text": "El viento solar empuja los materiales liberados por el cometa en dos colas diferentes. La Cola de Iones (azul) siempre apunta directamente ALEJADA del Sol, formada por gas ionizado. La Cola de Polvo (blanca-amarilla) sigue ligeramente curva la trayectoria orbital del cometa. Esta dualidad hace que los cometas en perihelio (máxima cercanía al Sol) sean espectaculares desde la Tierra.",
          "image": "https://images-assets.nasa.gov/image/PIA21072/PIA21072~small.jpg",
          "imgCaption": "Las dos colas características del cometa: iones azules y polvo dorado.",
          "style": "normal"
        },
        {
          "title": "El Cinturón de Kuiper: Reserva de Cometas",
          "text": "La mayoría de los cometas de período corto (menos de 200 años) nacen en el Cinturón de Kuiper, una región que se extiende más allá de la órbita de Neptuno hasta los 50 UA del Sol. Este inmenso depósito de hielo y roca es literalmente un cementerio de materiales primordiales del Sistema Solar. Perturbaciones gravitacionales de los planetas gigantes pueden lanzar estos objetos en órbitas que los acercan al Sol.",
          "image": "https://images-assets.nasa.gov/image/s73-37274/s73-37274~medium.jpg",
          "imgCaption": "El Cinturón de Kuiper: disco de hielo primordial más allá de Neptuno.",
          "style": "normal"
        },
        {
          "title": "El Cometa Halley: Nuestro Visitante Legendario",
          "text": "El Cometa Halley es el cometa periódico más famoso de la historia humana, con un período orbital de aproximadamente 75-76 años. Ha sido observado y registrado en textos históricos desde el 240 a.C. Los Tapices de Bayeux lo representan durante la Conquista Normanda del 1066. Su próxima visita está prevista para el año 2061. Las sondas espaciales Giotto y Vega estudiaron su núcleo en el paso de 1986.",
          "image": "https://images-assets.nasa.gov/image/iss038e007980/iss038e007980~medium.jpg",
          "imgCaption": "El cometa Halley capturado en su paso de 1986 por la sonda europea Giotto.",
          "style": "highlight"
        },
        {
          "title": "Cometas de Periodo Corto y Largo",
          "text": "Los cometas se clasifican por el tiempo que tardan en orbitar el Sol (su periodo). Los cometas de 'periodo corto' tardan menos de 200 años en completar una ?rbita, como el cometa Halley (76 años). Vienen del Cinturón de Kuiper, más all? de Neptuno. Los cometas de 'periodo largo' tardan miles o millones de años y provienen de la Nube de Oort.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001315/GSFC_20171208_Archive_e001315~small.jpg",
          "imgCaption": "Las ?rbitas elípticas de los cometas los llevan desde los bordes helados del Sistema Solar hasta cerca del Sol. Fuente: NASA/JPL"
        },
        {
          "title": "La Composición de un Cometa",
          "text": "Un cometa se describe a menudo como una 'bola de nieve sucia'. Su núcleo sólido, que puede medir entre unos pocos y varios kilómetros, est? hecho de una mezcla de hielo de agua, dióxido de carbono congelado, amoníaco, metano, junto con polvo y rocas oscuras. Contienen los materiales originales e inalterados de cuando se form? el Sistema Solar.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001319/GSFC_20171208_Archive_e001319~small.jpg",
          "imgCaption": "El núcleo oscuro y polvoriento de un cometa, compuesto de hielos primordiales y rocas. Fuente: ESA/Rosetta"
        },
        {
          "title": "La Coma: La Atmásfera del Cometa",
          "text": "Cuando un cometa se acerca al Sol, el calor hace que sus hielos se sublimen (pasen de sólido a gas) directamente. Este gas y polvo liberado forma una nube enorme y brillante alrededor del núcleo llamada 'coma'. Aunque el núcleo mide solo unos kilómetros, la coma puede expandirse hasta ser ?más grande que el planeta Júpiter!",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000929/GSFC_20171208_Archive_e000929~small.jpg",
          "imgCaption": "La coma brillante de un cometa, formada por gases liberados al acercarse al calor del Sol. Fuente: NASA"
        },
        {
          "title": "Las Dos Colas de un Cometa",
          "text": "Los cometas a menudo desarrollan dos colas distintas cuando se acercan al Sol. Una es la 'cola de polvo', de color blanco-amarillento, formada por partículas de roca empujadas suavemente por la luz solar. La otra es la 'cola iónica' o de gas, de color azul, empujada rápidamente por el viento solar. Ambas colas siempre apuntan en dirección contraria al Sol.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001305/GSFC_20171208_Archive_e001305~small.jpg",
          "imgCaption": "Las dos colas de un cometa: la cola iónica azul (gas) y la cola de polvo blanca y curva. Fuente: NASA"
        },
        {
          "title": "El Cometa Halley: El Viajero Famoso",
          "text": "El Cometa Halley es el cometa de periodo corto más famoso. Regresa a la Tierra cada 75-76 años y es visible a simple vista. Lleva el nombre del astrónomo Edmond Halley, quien aplic? las leyes de Newton para comprender que los cometas vistos en 1531, 1607 y 1682 eran el mismo y predijo con precisión su regreso en 1758. Regresar? en 2061.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001304/GSFC_20171208_Archive_e001304~small.jpg",
          "imgCaption": "El paso del cometa Halley en 1986, el primero fotografiado de cerca por naves espaciales. Fuente: ESA/Giotto"
        },
        {
          "title": "La Nube de Oort: El Hogar de los Cometas",
          "text": "Se cree que los cometas de periodo largo provienen de la Nube de Oort, una inmensa capa esférica de miles de millones de objetos helados que envuelve nuestro Sistema Solar a casi 1 año luz de distancia. A veces, la perturbación gravitacional de estrellas cercanas empuja a un cometa fuera de esta nube, iniciándolo en un viaje de millones de años hacia el Sol.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001320/GSFC_20171208_Archive_e001320~small.jpg",
          "imgCaption": "Diagrama ilustrando la colosal Nube de Oort, la frontera helada de nuestro Sistema Solar y origen de los cometas de periodo largo. Fuente: NASA"
        },
        {
          "title": "Cometas Rasantes del Sol (Sungrazers)",
          "text": "Algunos cometas viajan en ?rbitas tan suicidas que los llevan a millones de kilómetros de la ardiente superficie del Sol. Se les conoce como 'rasantes del sol' o sungrazers. El Observatorio Solar SOHO ha descubierto miles de estos cometas suicidas. Muchos de ellos no sobreviven y se evaporan por completo o son destrozados por la intensa gravedad y calor del Sol.",
          "image": "https://images-assets.nasa.gov/image/iss074e0480485/iss074e0480485~large.jpg",
          "imgCaption": "Un cometa 'sungrazer' aproximándose peligrosamente a la corona solar, capturado por el satélite SOHO. Fuente: NASA/ESA/SOHO"
        },
        {
          "title": "Agua en los Cometas: ?El Origen de los Océanos?",
          "text": "Durante mucho tiempo los científicos se han preguntado si el agua de los océanos de la Tierra fue traída por impactos de cometas hace miles de millones de años. La misión Rosetta a un cometa en 2014 encontr? que el agua all? tenía un 'sabor' químico diferente (isótopos) al agua terrestre, sugiriendo que los asteroides helados jugaron un papel mayor que los cometas.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001323/GSFC_20171208_Archive_e001323~small.jpg",
          "imgCaption": "Representación de un cometa rico en agua impactando la Tierra primitiva. Fuente: NASA/JPL"
        },
        {
          "title": "Moléculas Orgénicas en Cometas",
          "text": "Las sondas espaciales que han estudiado cometas han descubierto que no solo contienen agua, sino también compuestos orgánicos complejos, que son los componentes básicos de la vida. La misión Rosetta detect? el aminoácido glicina (un componente de las proteínas) en la nube de gas del cometa 67P. Esto sugiere que los cometas podrían haber 'sembrado' la Tierra temprana con moléculas prebióticas.",
          "image": "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001309/GSFC_20171208_Archive_e001309~medium.jpg",
          "imgCaption": "La sonda Rosetta detect? moléculas orgénicas fundamentales para la vida en el polvo y gas de un cometa. Fuente: ESA"
        }
      ],
      "bibliography": [
        "NASA Comets Overview."
      ]
    },
    "quizEs": [
      {
        "q": "¿De qué están hechos principalmente los cometas?",
        "options": [
          "Solamente polvo",
          "Metal denso",
          "Hielo, agua congelada, polvo y rocas"
        ],
        "a": 2
      },
      {
        "q": "¿Cómo se llama la nube o cola brillante que se forma cuando un cometa se acerca al Sol?",
        "options": [
          "Anillo",
          "Coma",
          "Aura"
        ],
        "a": 1
      },
      {
        "q": "¿Cuál es la diferencia principal entre un cometa y un asteroide seco?",
        "options": [
          "Tienen hielo que se evapora creando una cola",
          "Giran más rápido",
          "Son perfectamente esféricos"
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Cometas (¿Qué es un Cometa?)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'El Núcleo Helado: Corazón del Cometa', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Cometas', �qu� funci�n cumple la fase de 'La Coma: La Corona Luminosa'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'La Doble Cola: Cola de Iones y Cola de Polvo'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Cometas",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'El Cinturón de Kuiper: Reserva de Cometas', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Cometas' ocurre en 'El Cometa Halley: Nuestro Visitante Legendario'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en '¿Qué es un Cometa?'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Cometas', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'El Cometa Halley: Nuestro Visitante Legendario', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "asteroides_sondas",
    "order": 24,
    "titleEn": "Space Probes",
    "titleEs": "Sondas",
    "badge": "Deep Explorer",
    "badgeEs": "Explorador Profundo",
    "color": "#34D399",
    "contentEs": {
      "sections": [
        {
          "title": "Sondas Valientes: Osiris-Rex e Historia",
          "text": "Las sondas espaciales fungen como nuestros exploradores robóticos en ambientes imposibles. La intrépida sonda de la NASA, OSIRIS-REx, emprendió un histórico y audaz viaje hacia el asteroide cercano Bennu. No solo logró hacer contacto físico tras realizar precisas maniobras orbitales, sino que completó una de las misiones más trascendentales de la astronomía moderna: traer a casa muestras del polvo primigenio de nuestro sistema solar.",
          "image": "https://images-assets.nasa.gov/image/KSC-07PD-0051/KSC-07PD-0051~medium.jpg",
          "imgCaption": "Esquema conceptual de la sonda Osiris-Rex operando en órbita.",
          "video": "/assets/asteroides/Video Osiris Rex.mp4"
        },
        {
          "title": "Un 'Beso' Cósmico para Traer Polvo",
          "text": "En lugar de simplemente orbitar, Osiris-Rex se acercó hasta tocar ligeramente el impredecible y duro material superficial. Lanzó un intenso chorro de gas nitrógeno que levantó gravilla, logrando capturarla en su compartimento hermético en segundos. Esta pequeña pero sumamente valiosa cucharada estelar regresó sana y salva a nuestro planeta para el estudio de los elementos formadores de vida.",
          "image": "https://images-assets.nasa.gov/image/KSC-07pd0054/KSC-07pd0054~medium.jpg",
          "imgCaption": "La increíble recolección robótica de la roca Bennu.",
          "video": "/assets/asteroides/Video Rosseta.mp4"
        },
        {
          "title": "Rosetta: A la Caza del Cometa 67P",
          "text": "En paralelo, la Agencia Espacial Europea lanzó a Rosetta, una sofisticada nave construida no para rocas regulares, sino para cazar a un cometa activo de hielo. Atrapar a 67P/Churyumov-Gerasimenko implicó igualar milimétricamente su impresionante velocidad mientras este iba soltando chorros de su cola helada.",
          "image": "https://images-assets.nasa.gov/image/KSC-07pd0052/KSC-07pd0052~medium.jpg",
          "imgCaption": "Rosetta orbitando y analizando al masivo cometa 67P.",
          "video": "/assets/asteroides/Rosseta 2 vid.mp4"
        },
        {
          "title": "La Odisea Aterrizando en un Cometa",
          "text": "El esfuerzo del equipo culminó cuando Rosetta desplegó el primer módulo de aterrizaje en la historia, llamado Philae. Sorprendentemente, aterrizar en un cuerpo de hielo que carece de gravedad fuerte requirió que el módulo intentara aferrarse con arpones al suelo activo.",
          "image": "https://images-assets.nasa.gov/image/KSC-07pd0056/KSC-07pd0056~medium.jpg",
          "imgCaption": "La odisea del pequeño y brillante Philae descendiendo en el territorio inestable de 67P.",
          "style": "highlight",
          "video": "/assets/asteroides/Rosseta 3vid.mp4"
        },
        {
          "title": "Registros Visuales de las Misiones",
          "text": "Te presentamos en exclusiva la compilación oficial secuencial del viaje robótico. Observa de cerca todo el poder ingenieril desde Osiris hasta el abordaje de Philae.",
          "video": "/assets/asteroides/Rosset vid 3 parte 2.mp4",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/KSC-07pd0055/KSC-07pd0055~medium.jpg"
        },
        {
          "title": "Persiguiendo a Rosetta",
          "text": "El cometa en alta resolución.",
          "video": "/assets/asteroides/Video Rosseta.mp4",
          "style": "normal",
          "image": "https://images-assets.nasa.gov/image/KSC-07PD-0055/KSC-07PD-0055~medium.jpg"
        },
        {
          "title": "La Misión NEAR Shoemaker: El Primer Aterrizaje",
          "text": "Lanzada en 1996, la nave NEAR Shoemaker de la NASA fue la primera en orbitar y, en 2001, en aterrizar en un asteroide: Eros, un NEA con forma de papa gigante de 33 km de largo. Para sorpresa de todos, la sonda sobrevivi? al aterrizaje (no estaba diseñada para ello) y continu? enviando señales desde la superficie durante semanas, confirmando que Eros era roca sólida antigua.",
          "image": "https://images-assets.nasa.gov/image/KSC-07PD-0054/KSC-07PD-0054~medium.jpg",
          "imgCaption": "La sonda NEAR Shoemaker aproximándose al asteroide Eros antes de su histórico aterrizaje en 2001. Fuente: NASA/JPL/APL"
        },
        {
          "title": "Misión Hayabusa: Japón Trae Muestras",
          "text": "En 2003, la agencia espacial japonesa JAXA lanz? Hayabusa, la primera misión diseñada para posarse en un asteroide (Itokawa), tomar muestras y traerlas a la Tierra. A pesar de numerosos fallos técnicos graves casi catastróficos, Hayabusa logr? regresar a la Tierra en 2010 con miles de partículas microscópicas de Itokawa, probando que este asteroide era una 'pila de escombros' suelta.",
          "image": "https://images-assets.nasa.gov/image/KSC-07PD-0056/KSC-07PD-0056~medium.jpg",
          "imgCaption": "La sonda japonesa Hayabusa logr? la hazaña de traer por primera vez muestras microscópicas de un asteroide a la Tierra. Fuente: JAXA"
        },
        {
          "title": "La Extraña Forma de los Asteroides",
          "text": "Las sondas espaciales revelaron que los asteroides pequeños no son redondos. Tienen gravedades tan débiles que no pueden comprimirse en esferas. Bennu y Ryugu tienen forma de trompo o diamante; Eros tiene forma de cacahuate o papa; Cleopatra tiene forma de hueso de perro. Estas formas irregulares se deben a sus velocidades de rotación, impactos y composición suelta.",
          "image": "https://images-assets.nasa.gov/image/KSC-07PD-0052/KSC-07PD-0052~medium.jpg",
          "imgCaption": "El asteroide Ryugu fotografiado por la sonda Hayabusa2, revelando su peculiar forma de trompo. Fuente: JAXA/University of Tokyo"
        },
        {
          "title": "Hayabusa2: Bombardeando Ryugu",
          "text": "En 2014, JAXA lanz? Hayabusa2 hacia el asteroide carbonáceo Ryugu. En 2019, la sonda dispar? un proyectil de cobre a la superficie para crear un pequeño cráter artificial y luego recogi? muestras subterráneas prístinas, sin alterar por la radiación espacial. La sonda también despleg? minirrovers saltarines. Las muestras regresaron a la Tierra en diciembre de 2020.",
          "image": "https://images-assets.nasa.gov/image/KSC-07pd0051/KSC-07pd0051~medium.jpg",
          "imgCaption": "Hayabusa2 disparando un proyectil de impacto sobre Ryugu para exponer material subsuperficial. Fuente: JAXA"
        },
        {
          "title": "OSIRIS-REx: Tocar y Volar",
          "text": "La misión OSIRIS-REx de la NASA lleg? al peligroso asteroide Bennu en 2018. Tras cartografiarlo exhaustivamente, en octubre de 2020 realiz? una atrevida maniobra TAG ('Touch-And-Go'). El brazo robótico toc? la superficie rocosa durante 6 segundos y lanz? gas nitrógeno para aspirar polvo y rocas. La nave recogi? más material del esperado, superando los 250 gramos de roca negra carbonácea.",
          "image": "https://images-assets.nasa.gov/image/KSC-07pd0053/KSC-07pd0053~medium.jpg",
          "imgCaption": "La maniobra TAG de OSIRIS-REx sobre el asteroide Bennu para recolectar valiosas muestras de regolito. Fuente: NASA/Goddard/University of Arizona"
        },
        {
          "title": "El Retorno de Bennu a la Tierra",
          "text": "Tras recolectar su valioso cargamento de Bennu, OSIRIS-REx emprendi? el viaje de regreso. El 24 de septiembre de 2023, solt? una cápsula sobre la atmásfera terrestre que aterriz? con paracaídas en el desierto de Utah. Análisis iniciales de las muestras de Bennu confirmaron que contienen carbono y agua en grandes cantidades, los cimientos de la vida.",
          "image": "https://images-assets.nasa.gov/image/KSC-07PD-0053/KSC-07PD-0053~medium.jpg",
          "imgCaption": "Aterrizaje en Utah de la cápsula OSIRIS-REx con las muestras del asteroide Bennu en septiembre de 2023. Fuente: NASA/Keegan Barber"
        },
        {
          "title": "El Descubrimiento de Fósiles Químicos",
          "text": "Las muestras traídas por OSIRIS-REx y Hayabusa2 están revelando la historia química del nacimiento del Sistema Solar. En el asteroide Ryugu, los científicos encontraron uracilo, uno de los cuatro bloques básicos del ARN, el componente molecular que transmite la información genética en todos los seres vivos. Esto apoya fuertemente la idea de que los ingredientes para la vida en la Tierra vinieron del espacio.",
          "image": "https://images-assets.nasa.gov/image/KSC-06pd2803/KSC-06pd2803~medium.jpg",
          "imgCaption": "Análisis de laboratorio de muestras de asteroides que revelaron bloques básicos de ARN y agua. Fuente: NASA/JSC"
        },
        {
          "title": "Rosetta: La Misión ?pica a un Cometa",
          "text": "La ESA lanz? la sonda Rosetta en 2004 para estudiar el cometa 67P/Churyumov-Gerasimenko. Tras 10 años de viaje en el espacio profundo, se convirti? en la primera nave en orbitar un cometa. En noviembre de 2014, Rosetta lanz? un pequeño módulo de aterrizaje, Philae. Tras un dramático rebote, Philae se pos? y se convirti? en la primera sonda humana en posarse en el núcleo de un cometa.",
          "image": "https://images-assets.nasa.gov/image/KSC-06pd2804/KSC-06pd2804~medium.jpg",
          "imgCaption": "Representación de la nave Rosetta orbitando el cometa 67P y el módulo Philae descendiendo a su superficie. Fuente: ESA/ATG medialab"
        },
        {
          "title": "El Futuro: OSIRIS-APEX y Apophis",
          "text": "Tras dejar las muestras de Bennu, la sonda principal de OSIRIS-REx sigue en el espacio, sana y salva. La NASA decidi? darle una nueva misión y un nuevo nombre: OSIRIS-APEX (Apophis Explorer). Su objetivo ahora es viajar a encontrarse con el infame asteroide Apophis para estudiarlo de cerca poco después de su histórico y cercano paso por la Tierra en 2029.",
          "image": "https://images-assets.nasa.gov/image/KSC-06pd2805/KSC-06pd2805~medium.jpg",
          "imgCaption": "La sonda OSIRIS-APEX (anteriormente OSIRIS-REx) re-enrutada para explorar el asteroide Apophis en 2029. Fuente: NASA/Goddard"
        }
      ],
      "bibliography": [
        "ESA Rosetta Cometary Mission.",
        "NASA Osiris-Rex Asteroid Sample Return."
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué inestable cometa aterrizó el primer módulo Philae de Rosetta?",
        "options": [
          "Cometa Halley.",
          "Cometa Neowise.",
          "Cometa 67P/Churyumov-Gerasimenko."
        ],
        "a": 2
      },
      {
        "q": "¿Cuál fue la misión central de la sonda Osiris-Rex al acercarse a Bennu?",
        "options": [
          "Destruirlo con láser",
          "Recoger una muestra estelar y traerla de retorno a la Tierra",
          "Instalar paneles solares extraterrestres"
        ],
        "a": 1
      },
      {
        "q": "¿Qué complicó monumentalmente el aterrizaje y captura del cometa?",
        "options": [
          "La falta de gravedad y los chorros de hielo desestabilizantes",
          "El campo magnético",
          "La temperatura del magma"
        ],
        "a": 0
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Sondas (Sondas Valientes: Osiris-Rex e Historia)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Un 'Beso' Cósmico para Traer Polvo', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Sondas', �qu� funci�n cumple la fase de 'Rosetta: A la Caza del Cometa 67P'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a 'La Odisea Aterrizando en un Cometa'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Sondas",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Registros Visuales de las Misiones', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Sondas' ocurre en 'Persiguiendo a Rosetta'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Sondas Valientes: Osiris-Rex e Historia'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Sondas', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'Persiguiendo a Rosetta', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "asteroides_apophis",
    "order": 25,
    "titleEn": "Asteroid Apophis",
    "titleEs": "Asteroide Apophis",
    "badge": "Doomsday Watcher",
    "badgeEs": "Vigía del Juicio",
    "color": "#F59E0B",
    "contentEs": {
      "sections": [
        {
          "title": "Apophis, el Imponente Dios Oscuro",
          "text": "¡Alerta explorador! A veces enormes bloques rocosos cruzan muy cerca de nuestro hogar. Observa al asteroide 99942 Apophis, terroríficamente nombrado así en honor a una mitológica serpiente y dios del caos originario del Antiguo Egipto. Con 370 metros de diámetro, aproximadamente el tamaño de la Torre Eiffel acostada, representa una de las mayores amenazas naturales monitorizadas por la humanidad.",
          "image": "https://images-assets.nasa.gov/image/PIA24168/PIA24168~medium.jpg",
          "imgCaption": "Recreación artística del asteroide 99942 Apophis en su trayectoria errante."
        },
        {
          "title": "Viernes 13 de Abril, 2029",
          "text": "Para asombro mundial, durante el viernes 13 de abril del legendario año 2029, Apophis realizará una increíble aproximación a la Tierra, volando tan bajo que cruzará el plano orbital de parte de nuestros propios satélites de comunicaciones geosíncronos a menos de 32,000 kilómetros. Será un gran espectáculo visible a simple vista desde Europa, África y Asia durante varias horas.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6096983510426269",
          "imgCaption": "Simulación de la superficie rocosa y oscura del asteroide Apophis vista de cerca.",
          "style": "highlight"
        },
        {
          "title": "La Fuerza Gravitacional Terrestre",
          "text": "Pero la Tierra también tiene un impacto sobre la roca. La enorme presión gravitacional de nuestro gran planeta literalmente morderá y retorcerá estrepitosamente a Apophis. Durante esta aproximación épica ocurrirán los llamados 'deslizamientos' o avalanchas geológicas sobre la superficie de este frío asteroide alterando severamente la forma de la roca para siempre. Es como ver la Tierra esculpir una roca a distancia.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.1930549739582279",
          "imgCaption": "La gravedad terrestre deformará la estructura interna del asteroide durante el sobrevuelo.",
          "style": "normal"
        },
        {
          "title": "¡No Entres en Pánico! Cálculo Milimétrico",
          "text": "Múltiples centros astrofísicos y laboratorios de todo el mundo lograron calcular y recalcular las órbitas usando alta precisión de rastreo por radar. Quedó completamente confirmada la descalificación de una colisión directa catastrófica para la Tierra durante su paso en el 2029. Estaremos grandiosamente a salvo disfrutando del gran espectáculo lejano. La probabilidad de impacto es literalmente cero.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.09268709773321737",
          "imgCaption": "El radar planetario de Goldstone que confirmó la trayectoria segura de Apophis.",
          "style": "highlight"
        },
        {
          "title": "Defensa Planetaria: La Misión DART",
          "text": "A raíz del descubrimiento de asteroide amenazantes como Apophis, la NASA desarrolló y ejecutó en 2022 la misión DART (Double Asteroid Redirection Test). Una nave espacial impactó deliberadamente al asteroide Dimorphos a 6 km/s, alterando exitosamente su órbita. Fue la primera prueba real de defensa planetaria cinética. Estos protocolos garantizan que la humanidad pueda desviarse ante futuros asteroides peligrosos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.4373978717176673",
          "imgCaption": "El impacto de la sonda DART creó una columna de escombros visible desde la Tierra.",
          "style": "normal"
        },
        {
          "title": "La Misión OSIRIS-APEX: Siguiendo a Apophis",
          "text": "La NASA ha redirigido la sonda OSIRIS-REx (renombrada OSIRIS-APEX) para interceptar a Apophis durante su histórico sobrevuelo del 2029. La sonda llegará al asteroide justo cuando esté en su mayor proximidad a la Tierra, capturando en directo cómo la gravedad terrestre lo transforma. Por primera vez en la historia, los humanos observaremos en tiempo real cómo una fuerza planetaria re-esculpe un asteroide activo.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.093917891514402",
          "imgCaption": "La sonda OSIRIS-APEX perseguirá a Apophis para documentar su transformación gravitacional.",
          "style": "highlight"
        },
        {
          "title": "El Descubrimiento del Terror",
          "text": "El asteroide 99942 Apophis fue descubierto en junio de 2004. Las primeras observaciones preocuparon al mundo: los astrónomos calcularon que este monstruo de roca de 340 metros (del tamaño del Empire State) tenía un 2.7% de probabilidad de chocar con la Tierra en el año 2029. Esto fue la mayor alerta de impacto jamás registrada, alcanzando nivel 4 en la Escala de Peligro de Turín.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.650098659852404",
          "imgCaption": "Observación del asteroide Apophis poco después de su descubrimiento en 2004 cuando gener? alarma mundial. Fuente: UH/IfA"
        },
        {
          "title": "?Por Qu? lo Llamaron Apophis?",
          "text": "Los astrónomos lo nombraron como el antiguo dios egipcio Apep o Apofis, el dios demonio de la oscuridad, el caos y la destrucción. Apofis era el enemigo eterno de Ra, el dios del sol, y simbolizaba la maldad. El nombre reflejaba perfectamente el temor inicial que caus? este asteroide gigante que amenazaba nuestro planeta.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.936432518933606",
          "imgCaption": "Representación de un asteroide masivo capaz de causar destrucción a nivel continental como la temida en su momento por Apophis. Fuente: NASA"
        },
        {
          "title": "La Tensión se Relaja (Casi)",
          "text": "Para alivio de todos, observaciones más detalladas en 2006 y estudios de la NASA refinaron su ?rbita. Los científicos concluyeron que Apophis no chocar? con nosotros en 2029. Sin embargo, descubrieron que pasar? tan cerca de la Tierra que su ?rbita se modificar?. Si pasaba exactamente por un agujero gravitacional ('keyhole'), podría impactar en su siguiente vuelta en 2036.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.38871993605759425",
          "imgCaption": "Gráfico mostrando las zonas de incertidumbre de la ?rbita de Apophis tras observaciones que descartaron el impacto de 2029. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "El Día Clave: Viernes 13 de Abril de 2029",
          "text": "El 13 de abril de 2029, Apophis pasar? a solo 31,860 kilómetros de la superficie de la Tierra. ?Estar? más cerca de nosotros que los satélites de televisión e internet! Ser? tan brillante y cercano que unos 2,000 millones de personas en Europa, ?frica y partes de Asia podrán verlo cruzar rápidamente el cielo a simple vista como una estrella brillante en movimiento. Un evento astronómico ?nico en mil años.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.3400182552614216",
          "imgCaption": "El paso cercano de Apophis en 2029 cruzar? bajo la ?rbita de los satélites geosincrónicos terrestres. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "Descartando el Impacto Definitivamente",
          "text": "En marzo de 2021, Apophis hizo un sobrevuelo distante de la Tierra. Astrónomos usaron enormes antenas de radar en California y Virginia para rebotar ondas de radio en el asteroide. Con estos nuevos datos de extrema precisión, la NASA confirm? de forma oficial y definitiva: Apophis no impactar? la Tierra en 2029, ni en 2036, ni en ningún momento durante los próximos 100 años.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.07088865650725029",
          "imgCaption": "El complejo de radar de Goldstone (NASA) rebotando ondas de radio para trazar la ?rbita exacta de Apophis y descartar riesgos. Fuente: NASA/JPL-Caltech"
        },
        {
          "title": "Los Efectos de la Gravedad Terrestre en Apophis",
          "text": "Cuando Apophis pase rozando la Tierra en 2029, nuestra tremenda gravedad tirar? violentamente de ?l. Los científicos esperan que la gravedad terrestre estire el asteroide, cause terremotos espaciales (astro-motos) que provoquen deslizamientos de rocas en su superficie, y altere completamente su velocidad de rotación. Ser? un espectáculo ?nico para estudiar la física de estos cuerpos.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.5862003356445967",
          "imgCaption": "Representación de las fuerzas de marea terrestres que alterarán físicamente el asteroide Apophis durante su sobrevuelo en 2029. Fuente: ESA"
        },
        {
          "title": "Preparando a OSIRIS-APEX para Apophis",
          "text": "La NASA no desaprovechar? este acercamiento histórico. La sonda espacial OSIRIS-APEX (antes OSIRIS-REx) ya va en camino para encontrarse con Apophis en 2029. La nave entrar? en ?rbita alrededor del asteroide poco después de su paso cercano por la Tierra. Su misión principal es documentar en tiempo real los cambios físicos y terremotos que la gravedad de nuestro planeta le caus?.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.9522827230329456",
          "imgCaption": "Representación artística de la sonda OSIRIS-APEX explorando el asteroide Apophis. Fuente: NASA/Goddard"
        },
        {
          "title": "La Importancia de Vigilar (Planetary Defense)",
          "text": "La historia de Apophis nos ense?? una lección crítica: el espacio es dinámico y necesitamos vigilar el cielo constantemente. Esto llev? a un aumento en los programas de Defensa Planetaria. Organizaciones de todo el mundo, coordinadas por la ONU, mejoraron la red de telescopios para detectar cualquier objeto cercano a la Tierra (NEO) y prever su trayectoria con años o décadas de antelación.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.6871220815209828",
          "imgCaption": "Telescopios automatizados mapeando el cielo nocturno en busca de objetos cercanos a la Tierra (NEOs) peligrosos. Fuente: NASA"
        },
        {
          "title": "Convivir con los Asteroides",
          "text": "Al final, Apophis no result? ser el destructor del mundo como sugerría su nombre mitológico, sino un maestro. Su visita nos dar? conocimientos invaluables sobre la composición de los asteroides y preparar? a la humanidad para el día lejano en el que tal vez, s? tengamos que enfrentar a un asteroide en ruta de colisión y usar tecnologías como DART para desviarlo a tiempo.",
          "image": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=0.1868919674161562",
          "imgCaption": "Con el miedo a Apophis descartado, el asteroide se convierte en un valioso objetivo científico y un ?xito de la defensa planetaria cooperativa. Fuente: NASA"
        }
      ],
      "bibliography": [
        "NASA Eyes on Asteroids: Apophis Approach (2029)."
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año se aproximará brutalmente y sin peligro el asteroide Apophis a la Tierra?",
        "options": [
          "2029",
          "2500",
          "En el año 3000"
        ],
        "a": 0
      },
      {
        "q": "¿Qué sucederá con Apophis al pasar tan cerca de nuestro planeta?",
        "options": [
          "Comenzará a emitir luz biológica",
          "La gravedad de la Tierra creará avalanchas superficiales que la van a sacudir y alterar su forma",
          "Comenzará a nevar"
        ],
        "a": 1
      },
      {
        "q": "¿Es necesario preocuparnos por una colisión apocalíptica?",
        "options": [
          "Sí, tenemos que prepararnos",
          "No, los cálculos de radar confirman que nos librará limpiamente",
          "Aún no se ha inventado una forma de averiguarlo"
        ],
        "a": 1
      }
    ],
    "quiz": [
      {
        "question": "�Cu�l es el tema primordial que se aborda al inicio de Asteroide Apophis (Apophis, el Imponente Dios Oscuro)?",
        "options": [
          "El desarrollo y caracter�sticas clave de este concepto",
          "Sucesos irrelevantes",
          "Datos sobre gastronom�a local",
          "Informaci�n puramente matem�tica"
        ],
        "answer": 0
      },
      {
        "question": "Seg�n la secci�n titulada 'Viernes 13 de Abril, 2029', �por qu� es importante este estudio?",
        "options": [
          "No tiene relevancia cient�fica",
          "Porque nos permite comprender la f�sica y evoluci�n del cosmos",
          "Solo aplica para misiones terrestres",
          "Es una teor�a obsoleta"
        ],
        "answer": 1
      },
      {
        "question": "En el contexto de 'Asteroide Apophis', �qu� funci�n cumple la fase de 'La Fuerza Gravitacional Terrestre'?",
        "options": [
          "Determinar aspectos de ingenier�a o evoluci�n f�sica",
          "Disminuir la gravedad",
          "Aumentar la temperatura solar",
          "Generar materia oscura"
        ],
        "answer": 0
      },
      {
        "question": "�Cu�l de estas afirmaciones es verdadera respecto a '¡No Entres en Pánico! Cálculo Milimétrico'?",
        "options": [
          "Es un proceso imposible en el universo",
          "Ocurre �nicamente en la Tierra",
          "Es un hito fundamentado en las caracter�sticas de Asteroide Apophis",
          "No afecta a la astronom�a en nada"
        ],
        "answer": 2
      },
      {
        "question": "Al hablar de 'Defensa Planetaria: La Misión DART', �qu� podemos deducir?",
        "options": [
          "Que la exploraci�n avanza para comprender sus variables biol�gicas o geol�gicas",
          "Que las naves se apagan al acercarse",
          "Que los planetas se enfr�an constantemente",
          "Que los asteroides son hechos de cristal m�gico"
        ],
        "answer": 0
      },
      {
        "question": "Una de las lecciones fundamentales de 'Asteroide Apophis' ocurre en 'La Misión OSIRIS-APEX: Siguiendo a Apophis'. �Cu�l es el punto central?",
        "options": [
          "Es irrelevante",
          "El descubrimiento y uso de nuevas tecnolog�as",
          "Resumir las consecuencias l�gicas y cient�ficas del tema",
          "Falsificar datos hist�ricos"
        ],
        "answer": 2
      },
      {
        "question": "�De qu� forma interact�an los elementos presentados en 'Apophis, el Imponente Dios Oscuro'?",
        "options": [
          "Tienen una correlaci�n estricta regida por las leyes de la f�sica orbital y biol�gica",
          "Son completamente aleatorios",
          "Dependen del color del cohete",
          "No se relacionan entre s�"
        ],
        "answer": 0
      },
      {
        "question": "Para comprender completamente la misi�n sobre 'Asteroide Apophis', debes saber que:",
        "options": [
          "Los a�os luz son unidades de masa",
          "Los avances logrados aqu� marcan un precedente para el futuro humano en el espacio",
          "La temperatura siempre desciende al rojo",
          "Los resultados fueron eliminados"
        ],
        "answer": 1
      },
      {
        "question": "Analizando el m�dulo, el factor limitante m�s com�n en estas misiones suele ser:",
        "options": [
          "La radiaci�n c�smica, el soporte vital o fallas de motor",
          "Gases nobles",
          "L�minas de cart�n",
          "Velocidad de internet intergal�ctica"
        ],
        "answer": 0
      },
      {
        "question": "En conclusi�n, respecto a 'La Misión OSIRIS-APEX: Siguiendo a Apophis', la meta final de estas excursiones espaciales ha sido:",
        "options": [
          "Extraer sal",
          "Esconder radiaci�n t�rmica",
          "Propulsar la recopilaci�n de datos para entender y preservar la historia de nuestro sistema estelar",
          "Pintar anillos en la �rbita de los cometas"
        ],
        "answer": 2
      }
    ]
  }
];
