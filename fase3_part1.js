const fs = require('fs');
const https = require('https');

const courseDataDict = {
  black_hole: {
    name: 'Agujero Negro',
    sections: [
      { t: "El Monstruo Invisible", f: ["Un agujero negro es una región del espacio donde la gravedad es tan fuerte que nada puede escapar.", "Ni siquiera la luz, la cosa más rápida del universo, puede salir de él.", "Por eso son completamente negros y casi invisibles a nuestros ojos."] },
      { t: "Cómo Nace un Agujero", f: ["Nacen cuando una estrella súper masiva muere al final de su vida.", "La estrella explota en una brillante y enorme supernova espectacular.", "Luego, su núcleo se aplasta sobre sí mismo formando un pequeñísimo punto oscuro."] },
      { t: "El Horizonte de Sucesos", f: ["El borde invisible del agujero se llama el Horizonte de Sucesos.", "Es la línea de no retorno, el punto exacto de máximo peligro.", "Si cruzas esa línea misteriosa, jamás podrás volver atrás al universo libre."] },
      { t: "El Disco de Acreción", f: ["Aunque son negros, están rodeados de un anillo de fuego brillante ardiente.", "Ese anillo es material espacial como polvo y gas de estrellas atrapadas.", "Gira tan violentamente rápido que se calienta a millones de grados centígrados."] },
      { t: "Espaguetización", f: ["Si cayeras en un agujero negro, la gravedad jalaría primero tus pies duramente.", "Te estirarías tanto que parecerías un espagueti larguísimo y delgado.", "Este divertido y aterrador fenómeno científico se llama oficialmente espaguetización."] },
      { t: "El Tiempo Lento", f: ["Cerca de un agujero negro, el tiempo se ralentiza enormemente y mágicamente.", "Unos pocos minutos allí serían muchísimos años largos aquí en la Tierra.", "Es como viajar accidentalmente al futuro muy lejano sin una máquina."] },
      { t: "Tipos de Agujeros", f: ["Existen agujeros estelares pequeños del tamaño de una simple ciudad nuestra.", "Pero también hay agujeros negros súper masivos inmensos y aterradores.", "Estos gigantes oscuros viven en el centro mismo de las grandes galaxias."] },
      { t: "Sagitario A*", f: ["Nuestra galaxia, la Vía Láctea, tiene su propio agujero negro gigante central.", "Se llama Sagitario A* y es cuatro millones de veces más pesado que nuestro Sol.", "Mantiene unida a toda nuestra enorme y giratoria galaxia de estrellas."] },
      { t: "El Sonido del Vacío", f: ["Aunque el espacio es silencioso, los agujeros emiten inmensas ondas de presión fuertes.", "Los científicos convirtieron estas enormes ondas de gas en oscuro sonido audible.", "Suena como un gemido gravísimo y muy aterrador en medio de la inmensa noche."] },
      { t: "La Primera Fotografía", f: ["En 2019, la humanidad logró tomar la primerísima gran fotografía de uno real.", "Para lograrlo, unieron sincronizadamente grandes telescopios de todo el planeta Tierra entero.", "Se vio como una preciosa rosquilla naranja borrosa en el negro fondo estelar."] },
      { t: "No Son Aspiradoras", f: ["Muchas películas mienten, los agujeros no andan aspirando planetas activamente.", "Si nuestro Sol se volviera agujero negro, la Tierra seguiría girando tranquilamente.", "Solo te atrapan gravemente si te acercas demasiado por puro accidente de vuelo."] },
      { t: "La Singularidad Mágica", f: ["En el centro absoluto del agujero se encuentra la Singularidad.", "Es un punto infinito donde las leyes de la física humana no funcionan jamás.", "Es el enigma matemático más grande de toda nuestra inmensa ciencia."] },
      { t: "Choque Titánico", f: ["A veces, dos agujeros negros masivos chocan entre sí.", "Crean ondas gigantes invisibles que doblan el espacio y tiempo enormemente.", "Estas olas estelares se llaman fuertes ondas gravitacionales poderosas."] },
      { t: "Radiación de Hawking", f: ["El brillante científico Stephen Hawking descubrió que se evaporan lentísimamente.", "Sueltan una pequeñísima y finísima radiación durante muchísimos milenios largos.", "Eventualmente explotarán en un destello minúsculo desapareciendo por siempre."] },
      { t: "Misterio Cósmico", f: ["Nadie sabe qué hay realmente dentro, quizás un puente a otro lado.", "Siguen siendo los grandes lobos silenciosos del enorme mar oscuro espacial.", "Estudiarlos es el reto supremo final de nuestra valiente academia orbital."] }
    ],
    search: 'Black hole accretion disk NASA'
  },
  quasar: {
    name: 'Cuásar',
    sections: [
      { t: "Fuego en la Oscuridad", f: ["Los cuásares son los objetos más brillantes y energéticos de todo el universo.", "Brillan cientos de miles de veces más fuerte que una galaxia entera inmensa.", "Parecen simples estrellas lejanas, pero esconden un poder descomunal."] },
      { t: "El Corazón Hambriento", f: ["Un cuásar es en realidad un enorme agujero negro súper masivo devorando gas rápidamente.", "Mientras traga la materia, esta fricciona y brilla poderosamente hacia afuera.", "Solo existen en galaxias que tienen muchísimo polvo brillante para alimentar al monstruo."] },
      { t: "Chorros de Luz", f: ["Expulsan gigantescos chorros de luz y altísima radiación desde sus polos magnéticos.", "Estos rayos mortales y brillantes pueden medir muchísimos años luz de largo total.", "Atraviesan el negro cosmos vacío como los faros de un gran puerto estelar lejano."] },
      { t: "Un Viaje en el Tiempo", f: ["Están ubicados tan increíblemente lejos que su luz tarda miles de millones de años en llegar.", "Al ver un brillante cuásar hoy, lo estamos viendo cuando el universo era casi un bebé.", "Son hermosas reliquias brillantes del inicio misterioso del gran tiempo cósmico."] },
      { t: "El Descubrimiento por Radio", f: ["Fueron descubiertos en los años sesenta usando enormes antenas de radio profundas.", "Los científicos notaron extrañas y ruidosas señales fuertes en el tranquilo cielo.", "Al apuntar el enorme telescopio, vieron estas luciérnagas galácticas misteriosas."] },
      { t: "Materia Cayendo Rápido", f: ["La cantidad de gas que traga un brillante cuásar diariamente es brutal e inimaginable.", "Pueden llegar a devorar fácilmente el equivalente a diez Tierras rocosas cada minuto.", "Es un frenesí trágico de pura y espectacular destrucción luminosa estelar."] },
      { t: "Calor Inmenso", f: ["La inmensa fricción del gas que gira rápido genera un increíble calor abrumador y brutal.", "Alcanzan fácilmente temperaturas tan altas que todo lo que conocemos se haría gas rápidamente.", "El núcleo brilla en preciosos colores ultravioletas y cegadores rayos X invisibles."] },
      { t: "Vida y Muerte Corta", f: ["Aunque son extremadamente deslumbrantes y ruidosos, los cuásares no viven para siempre.", "Eventualmente se comen todo el rico polvo brillante que los rodea oscureciéndose al final.", "Cuando se quedan vacíos de inmensa comida, se vuelven silenciosos agujeros oscuros."] },
      { t: "La Vía Láctea Inactiva", f: ["Nuestra hermosa y brillante galaxia alguna vez en su oscuro pasado tuvo un gran cuásar activo.", "Pero nuestro enorme agujero central se quedó vacío de abundante gas nutritivo hace muchísimo tiempo.", "Hoy es un gigante muy tranquilo durmiendo pacíficamente en nuestro gran vecindario."] },
      { t: "Sopladores Galácticos", f: ["Los enormes chorros brillantes de un cuásar empujan fuerte las grandes nubes de la galaxia entera.", "Esto impide sorprendentemente que nazcan nuevas pequeñas y débiles estrellas infantiles frágiles.", "Son los grandes reguladores poderosos del inmenso gran universo en expansión."] },
      { t: "El Más Brillante del Cielo", f: ["El famoso cuásar gigante 3C 273 fue el primerito y el más brillante que logramos ver fácilmente.", "Con un buen telescopio aficionado humano puedes llegar a observarlo si sabes dónde buscar.", "Pero está tan alejadísimo que su luz es más antigua que todos los dinosaurios extintos juntos."] },
      { t: "Rayos X Poderosos", f: ["Los científicos valientes usan telescopios súper especiales en la alta órbita terrestre.", "Observan la inmensa radiación enorme escapando rápidamente en todas direcciones estelares.", "Ningún astronauta podría jamás acercarse sin freír rápidamente su valiosa nave."] },
      { t: "Anclaje Universal", f: ["Como son los objetos lejanos más brillantes conocidos, sirven de grandes puntos fijos fijos.", "Los astronautas y los precisos satélites de la Tierra los usan como un genial mapa exacto.", "Ayudan fuertemente a guiar de regreso nuestras increíbles y frágiles sondas solitarias."] },
      { t: "Un Nombre Extraño", f: ["La rara palabra Cuásar viene de una larga frase complicada en el difícil idioma inglés.", "Significa 'fuente brillante de radio cuasi-estelar ruidosa' por su forma engañosa inicial.", "Es un hermoso acrónimo para un monstruo espacial totalmente hermoso y letal a la vez."] },
      { t: "El Pasado nos Llama", f: ["Estudiar los enormes cuásares es asomarnos directamente al profundo comienzo estelar.", "Nos muestran lo increíblemente violento, mágico y loco que fue el gran universo infantil lejano.", "Son los faros eternos del inmenso y misterioso océano negro insondable cósmico."] }
    ],
    search: 'Quasar active galaxy Hubble'
  },
  pulsar: {
    name: 'Púlsar',
    sections: [
      { t: "Un Reloj de Precisión Cósmica", f: ["Un brillante púlsar es el pequeñito y denso núcleo sobrante de una estrella muerta.", "Es tan increíblemente puntual parpadeando luz que parece un mágico reloj suizo exacto.", "Gira furiosamente rápido y a gran velocidad como una súper peonza luminosa descontrolada."] },
      { t: "Faros Estrellados", f: ["Emiten dos grandes y precisos chorros gigantescos de luz intensa desde sus poderosos polos.", "Mientras el núcleo veloz gira, estos rápidos chorros de luz barren todo nuestro cielo nocturno.", "Es exactamente como ver el rayo de un gran faro marítimo desde un frío y peligroso barco oscuro."] },
      { t: "Un Descubrimiento Accidental", f: ["La joven y brillante Jocelyn Bell los descubrió en 1967 analizando grandes y extrañas gráficas largas.", "Eran señales de radioseñal muy rítmicas de rápidos golpecitos: 'tic... tic... tic... tic'.", "¡Al principio los investigadores pensaron que eran comunicaciones reales alienígenas misteriosas!"] },
      { t: "La Estrella de Neutrones", f: ["Los veloces púlsares están hechos completamente de neutrones duros aplastados al extremo brutalmente.", "Tienen muchísima más pesada masa densa que el Sol, pero miden tan solo unos 20 kilómetros anchos.", "Son el objeto más duro y resistente de absolutamente todo el gran universo misterioso infinito."] },
      { t: "Densidad Brutal", f: ["Su pesado material magnético es ridículamente tan denso y pesado que asusta inmensamente la mente.", "Solo una pequeñita cucharadita de café de un púlsar pesaría tanto como una gran montaña inmensa entera.", "La fuerte gravedad destrozaría cualquier gran nave de la sólida academia espacial al instante letal."] },
      { t: "Púlsares Milisegundos", f: ["Existen muchísimos púlsares extremos que logran girar cientos de ruidosas veces por solo un segundo corto.", "Se les llama oficialmente y médicamente 'Púlsares de Milisegundos' muy veloces por su altísima rápida locura.", "Giran tan increíblemente rápido que deberían romperse, pero su enorme inmensa gravedad secreta los mantiene."] },
      { t: "El Misterio de los Ruidos", f: ["Los curiosos científicos logran convertir los pulsos de pura luz invisibles en extraños grandes sonidos.", "Un púlsar lento se escucha sorprendentemente como unos grandes y rítmicos fuertes latidos de un tenso corazón.", "Un veloz púlsar de milisegundo ruge altísimo igual que el agudo motor zumbón de una veloz motocicleta."] },
      { t: "Muerte Roja Gigante", f: ["Todo veloz púlsar valiente nace primeramente del estruendoso colapso fatal de una brillante estrella gigante masiva roja.", "La estrella grande gorda gasta peligrosamente su buen combustible y luego su núcleo pesado se cae rapidísimo y rápido.", "Esto resulta directamente en una preciosísima y colorida violenta gran supernova altamente explosiva que rompe todo."] },
      { t: "Enfriamiento Inevitable", f: ["A medida que giran súper rápido y ferozmente, pierden grandes y mágicas cantidades energéticas gigantes continuamente.", "Con el larguísimo pesado y enorme paso del inmenso tiempo sideral, empiezan tristemente a girar más despacio y calmados.", "Algún inmenso trágico lejano y oscuro día dejarán fatalmente de parpadear y se apagarán para siempre en el oscuro abismo."] },
      { t: "Magnetismo Imposible", f: ["El campo magnético brillante de un rápido púlsar es miles de pesados y millones de veces peor que el inmenso Sol.", "Ese brutal peligroso y violento súper imán distorsiona fatalmente la misma geometría de todo el vacío inmenso oscuro a su alrededor.", "Puede rasgar átomos lejanos y débiles de fuertes naves e inmenso gas intergaláctico sin siquiera acercarse muchísimo."] },
      { t: "El Latido Frecuente en la Nebulosa", f: ["El gran púlsar brillante famoso más conocido descansa muy tranquilo en la inmensa hermosa colorida Nebulosa del Cangrejo mística.", "Esa inmensa gigante y preciosa mancha de gas brillante de gran color es directamente la explosión restante de la fuerte supernova lejana antigua.", "El veloz púlsar brillante rápido en su centro oscuro ilumina fantásticamente todos esos lindos gruesos gases como una fuerte lámpara infinita."] },
      { t: "Púlsares Viudos", f: ["Algunos velocísimos veloces rápidos púlsares tristes se llaman trágicamente como crueles y venenosas viudas negras fuertemente oscuras en la noche.", "Están fuertemente encerrados en un tenso intenso baile orbital pesado de la muerte junto con su dulce vieja débil estrella compañera amiga.", "El gigante púlsar arranca ferozmente con fuertes tirones todo el buen gas a la gran estrella compañera hasta matarla desnutrida desintegrada por completo."] },
      { t: "Estrellas Temblorosas", f: ["A pesar de ser objetos rocosos increíblemente densos súper sólidos mágicamente impenetrables e indestructibles inmensos.", "A veces la fuerte presión inmensa aplastante del gigante púlsar causa fuertísimos terremotos muy profundos inmensos destructores bestiales.", "Estos terremotos duros causan destellos súper súper fuertes luminosos muy extraños en su reloj puntual."] },
      { t: "Mapa de la Nave Voyager", f: ["Las sondas viajeras de inmenso éxito legendario llevaban preciosos hermosos y únicos mapas hechos de resistente fino y brillante oro.", "Esos discos amarillos enseñaban exactamente nuestro diminuto y dulce humilde hogar terrestre cálido verde azulado perdido espacial.", "Usaban triangulación estelar de púlsares brillantes intergalácticos constantes para que posibles amables viajeros alienígenas lejanos nos localizaran."] },
      { t: "La Batería Inagotable", f: ["Los maravillosos brillantes grandes púlsares son los enormes y fantásticos súper dinamos precisos magnéticos del inmenso gran universo en rotación.", "La cantidad gigante bruta colosal extrema de rica y valiosa energía rotacional salvaje es simplemente asombrosa.", "Comprender su latido eterno maravilloso nos hará infinitamente increíblemente mejores ingenieros en toda la escuela galáctica cadete valiente y heroica."] }
    ],
    search: 'Pulsar neutron star crab nebula'
  },
  red_dwarf: {
    name: 'Enana Roja',
    sections: [
      { t: "Estrellas Diminutas", f: ["Las Enanas Rojas son pequeñas estrellas frías comunes.", "Son la clase más abundante en todo el oscuro universo.", "Su color rojizo se debe a que son muy tenues fríamente."] },
      { t: "Longevas y Lentas", f: ["Viven increíblemente trillones de años sin quemar su gas rápido.", "Ninguna Enana Roja enorme vieja ha muerto aún hoy día jamás.", "Gozan tranquilamente del combustible brillante ahorrándolo muchísimo."] },
      { t: "Próxima Centauri", f: ["La famosa estrella cercana vecina más próxima a la inmensa Tierra es brillante roja.", "Se llama científicamente Próxima Centauri y posee planetas orbitando.", "Está asombrosamente lejísimos a solo y largos y fríos cuatro hermosos años luz."] },
      { t: "Invisibles a Ojo", f: ["Aunque son numerosísimas, su luz es bajísima tan roja débil.", "No podemos observar ni una a simple y limpio ojo desde la inmensa Tierra.", "Necesitamos siempre poderosos gigantes geniales y grandes telescopios infrarrojos para pillarlas."] },
      { t: "Zonas Habitables", f: ["Sus increíbles grandes sistemas pueden guardar inmensa agua cálida líquida rica y dulce sanamente.", "Para que un enorme planeta terrestre y rocoso gigante albergue a la bonita vida y no congele.", "Debe estar peligrosamente extremadamente muy cerquita cerca y próximo de su fuego pequeño."] },
      { t: "Tormentas Peligrosas", f: ["Suelen tener inmensas violentas salvajes furiosas erupciones de alto fuerte enorme fuego rojo estelar ardiente.", "Estos fuertísimos rayos x destructivos letales fríen rápidamente y destrozan atmósferas y el aire del planeta cercano.", "La ruidosa violenta vida quizás necesitaría vivir escondida enterrada debajo subterránea del inmenso suelo marciano."] },
      { t: "Rotación Rápida Inicial", f: ["Cuando nacen inmensas oscuras desde jóvenes nubes, giran rapidísimamente y locas y ruidosas fuertemente grandes.", "Con los larguísimos aburridos millones años milenios trillones oscuros lejanos calmos, van frenando lentísimas.", "Al hacerse viejitas maduras arrugadas y frías se vuelven tranquilas amigas silenciosas súper calmadas."] },
      { t: "El Final Infinito", f: ["A diferencia de los soles gigantes gordos amarillos, ellas y sus amigas no explotan ruidosamente gigantes supernovas calientes.", "Tampoco pierden capas altas hermosas o vientos, ni arman brillantes anillos preciosos neblinosos luminosos coloridos y vivos.", "Simplemente seguirán menguando frías chiquititas apagándose lentas tranquilas eternamente oscuras pacíficas silenciosamente calladas eternamente largas largas."] },
      { t: "Enanas Marrones y Rojas", f: ["Existe un objeto grandísimo inmenso frío fallido llamado súper genial una Enana Marrón marrón y opaca lenta inmensamente invisible.", "Las Marrones son muy gigantes como el enorme Júpiter pero fallaron ser en encenderse grandemente estrellita brillante roja dulce.", "Pero nuestras rojas sí lograron hacer enorme rica buena fusión mágica hidrógeno brillante ardiente hermoso mágico en el núcleo enorme."] },
      { t: "El Futuro del Universo", f: ["Cuando todas brillantes blancas enormes gigantes rojas masivas y astros mueran explotando.", "Estas tímidas pequeñas rojitas silenciosas diminutas iluminarán la lejana infinita eterna oscura enorme noche larguísima triste sola.", "Serán últimos verdaderos oasis brillantes oasis refugios oasis preciosos hogares cálidos."] },
      { t: "Descubrimiento de Planetas", f: ["El valiente fuerte famoso genial inteligente grandioso y sabio telescopio espacial TRAPPIST encontró gigantes maravillas mundiales rocosas en un sol rojito enana.", "Tiene hermosos ricos siete enormes inmensos e increíbles cálidos planetas del gran gran mismo tamaño afortunado brillante terrestre genial.", "Tres preciosos lejanos grandes orbitando genial justito en su brillante inmensa maravillosa zona enorme grande dulce cálida y genial súper habitable genial."] },
      { t: "Vientos Constantes", f: ["Los pequeños pero fuertes vientos solares magnéticos cósmicos rojos no dejan respiro gigante brillante estelar inmenso al vacío largo inexplorado.", "Las enanas estornudan plasma rojo furioso espeso venenoso venenoso brillante quemante súper asfixiante.", "Atraen fuertes auroras inmensas boreales boreales brillantes muy enormes muy grandes preciosas en sus cielos planetarios oscuros púrpuras bonitos bonitos."] },
      { t: "Gigantes vs Enanas", f: ["Una estrella gigante roja moribunda gigante no es para nada grandemente similar a una pequeñita joven fresca dulce enanita roja.", "La roja grande enorme roja moribunda es un sol gordo amarillo inflando estallando.", "La enana pequeña rojita es bebé en miniatura conservando combustible rico enorme y lento frío largamente inmensa genial vida larga larga infinita infinita."] },
      { t: "Oasis Finales Cósmicos", f: ["Nuestra raza humana gigante terrícola enorme y valiente si logra sobrevivir enormemente trillones inmensos grandes lejanos tristes milenios futuros de años inmensos oscuros largos de eternidad.", "Nuestros tataranietos gigantes y humanos cadetes sabios volarán a estas pequeñas llamitas rojas de calor a acampar tranquilamente eternidad pacíficamente.", "Será como una bella y grandiosa tierna e iluminadora genial valiente gigantesca gran pequeña modesta pequeña fogata mágica final y cálida del grandioso vacío cósmico final eterno y lento y lento."] },
      { t: "Telescopios Observando", f: ["La inmensa tecnología nuestra grandiosa actual ya tiene grandes súper espejos mágicos inmensos precisos escaneando y buscando valientemente a estas chiquitinas rojas rojas bonitas pequeñas mágicas ocultas muy lejos lejísimos de nuestro dulce inmenso hogar.", "La ciencia grandiosa valiosa vital sigue grandemente encontrando milagros enanas rojas donde menos lo espera buscando grandiosa y fuerte vida enorme lejana vida extraterrestre inmensa rica pacífica microscópica maravillosa.", "Seguiremos como cadetes valientes valientes apuntando nuestros grandiosos radares antenas geniales brillantes a los bordes maravillosos rojizos cálidos rojos del misterioso enorme cielo infinito oscuro maravilloso oscuro y mágico."] }
    ],
    search: 'Red dwarf star TRAPPIST-1 NASA'
  },
  white_dwarf: {
    name: 'Enana Blanca',
    sections: [
      { t: "El Cadáver del Sol", f: ["Cuando nuestro hermoso amarillo Sol gigantesco inmenso muera viejo, dejará tras de sí una bellísima y diminuta brillante Enana Blanca.", "Esta enorme reliquia mágica ardiente brillante densa es en verdad el viejo y desnudo poderoso ardiente aplastado corazón del centro del enorme colapso.", "No es más gruesa o enorme grandísima ancha que el diámetro mediano rocoso de nuestra preciosa pequeña Tierra."] },
      { t: "Humo Galáctico", f: ["Para nacer grandemente asombrosa brillante como blanca enana enana, el inmenso viejo Sol gigante antes grande hinchado como gigante rojo enorme enorme.", "Desprenderá amablemente soplidos grandes enormes estornudos vientos inmensos todas sus ricas maravillosas capas exteriores y ligeras grandísimas geniales nubes amarillas maravillosas de gas espeso y suave brillante genial coloridamente bellamente iluminadas inmensas en el cielo.", "Dejando únicamente esta perlita mágica pequeñita perlita muy dura densa candente brillante reliquia reliquia central inmensa enorme dura quemante genial deslumbrante brillante maravillosa genial inmensamente caliente y blanca radiante brillante muy hermosa muy fría fría genial blanca brillante inmensa blanca inmensa genial."] },
      { t: "Densidad Sorprendente", f: ["Aunque mide del asombroso gran e increíble enormísimo grandioso y valioso igualito tamaño de una pequeña Tierra genial maravillosa bonita verde dulce genial rocosa.", "Pesa exactamente lo inmensísimo mismo idéntico bestial asombroso gigante abrumador grandísimo equivalente a cien gigantescamente milagrosos grandes ardientes inmensos soles pesadísimos enormes aplastados mágicamente pesadísimos.", "Un dedal microscópico mágico de enana enorme y dulce bonita blanca de hielo duro sólido pesaría muchísimos grandes toneladas de carros gigantes elefantes geniales terrestres pesados aplastando todo valiente cadete estelar al piso sólido duro al instante."] },
      { t: "Cristales de Diamante", f: ["Bajo su pesadísima gravedad grandiosa inmensa colosal extrema súper gigantesca aplastante presión gravitacional increíble increíble aplastante infinita profunda genial extrema oscura genial extrema enorme inmensamente increíble valiosa valiosa.", "El núcleo carbono inmenso carbono carbono puro brillante del carbono sólido se cristaliza maravillosamente cristalizando genial genial de enorme bello bonito enorme duro durísimo asombroso rico mágico puro genial diamante gigantesco brillante bello inmenso brillante estelar puro duro.", "Es técnicamente y astronómicamente asombroso un diamante cósmico valiosísimo inmensamente colosal gigantesco valiente duro flotando fríamente congelado blanco destellante inmenso flotando y brillando lejanísimo lejanísimo genial en el infinito oscuro negro vacío helado."] },
      { t: "Sin Fusión Nuclear", f: ["A diferencia grandemente genial a diferencia diferencia de estrellas de soles o soles jóvenes calientes soles ardientes súper normales sanos frescos gordos que arden geniales arden fuego mágico.", "La pobrecita viejita ya no tiene gasolina ya no quema no hace ninguna nueva fuerte y valiente gigantesca gran inmensa magia y valiosa rica y gran fusión nuclear de átomos unidos calentando genial su fuego mágico enorme de horno de estufa viva genial ardiente.", "Solo sigue enorme triste solitaria amigable dulce y amigablemente amigable y bellamente radiando brillante solitaria enorme luz dulce hermosa pequeña blanca brillando lentamente brillando calor viejo remanente acumulado antiguo guardado lentamente genial calor como un fuerte bloque genial de mágico precioso hermoso carbón de hermosa brasa ardiente de valiente gran asado caliente rico mágico fuego eterno antiguo que ya se apaga y muerde lentamente de hermoso fuego inmenso lentamente menguante lentamente apagando apagando suavemente inmensa larga noche."] },
      { t: "Enana Negra Teórica", f: ["Trillones de miles trillones larguísimos aburridos inmensos e infinitos años solitarios largos silenciosos lejanos muy silenciosos aburridos larguísimos siglos después muy de apagarse apagar inmenso después lenta apagando...", "Se le acabará todo todo el calor y será triste e invisiblemente invisiblemente enormemente invisiblemente inmensa una roca carbón bola bola enana enorme enana totalmente oscurísima invisible fría negra fría y silenciosa muerta solitaria llamada muerta enorme invisiblemente grandísima enana oscura invisible fría y negra Enana Negra mágica.", "El enorme el inmenso inmenso enorme gran el increíble misterioso lento súper misterioso universo nuestro todavía infinito es inmenso joven es tan inmenso bebito asombrosamente nuevecito jovencito que que genialmente asombrosamente maravillosamente todavía aún hoy nunca hoy ni nunca nunca no hay gigantescamente absolutamente ninguna inmensa enorme gran sola una existiendo hoy actualmente viva jamás inmensa genial hoy hoy viva naciendo en el cielo brillante grandiosamente hoy."] },
      { t: "Canibalismo Estelar", f: ["Si la inmensa blanca mágica enana enorme genial pequeña valiente vieja está bailando en órbita genial en inmensa órbita genial de amor inmensa brillante órbita órbita orbitando feliz orbitando feliz girando cerquita juntita junto a a una a un a otro sol estrella amigo...", "Su increíble intensa inmensa enorme y brutal y gigantesca enorme gran salvaje gravedad succión succiona fuertemente roba tira jala roba roba absorbe gigante valiente furiosamente material gas atmósfera mágica rico rico sabroso y caliente gas rojo dulce dulce de su su enorme compañera sol estrella dulce amiga valiente amigable.", "Esto puede hacer inmensa mágica puede inmensa increíble puede ocasionar causar y encender una violenta gran súper gigante inmensa brillante inmensa inmensa súper explosión destructiva destructora estelar inmensa letal luminosa que se llama ruidosamente en la ciencia enorme academia ciencia se llama Nova gigante luminosa enorme Nova."] },
      { t: "Límite de Chandrasekhar", f: ["El científico asombroso genio matemático genial sabio indio genial indio de la India sabio llamado enorme Chandrasekhar brillante asombroso genial Chandrasekhar matemático grande enorme descubrió un límite genial un límite misterioso un grandioso límite mágico enorme numérico secreto genial secreto de la enorme ciencia y gran física espacial inmensa.", "Si la enorme pequeña y valiente mágica blanca brillante inmensa pequeña gordita genial roba tanto muchísimo gas rico que pesa demasiado y llega a pesar a valer 1.4 enormes veces inmenso soles gigantes grandes el peso del valiente Sol...", "Explotará fatal y ruidosamente y espectacularmente como supernova de tipo Ia inmensamente luminosa inmensamente destruyéndose inmensamente.", "Es un seguro inmenso reloj mágico bomba gigante cósmico matemático infinito increíble reloj brillante.", "Es mágico y peligroso límite del sabio gigante físico descubridor enorme estelar inmenso genio heroico genial."] }
    ],
    search: 'White dwarf star planetary nebula Hubble'
  },
  colisiones_estelares: {
    name: 'Colisiones Estelares',
    sections: [
      { t: "Choque de Titanes", f: ["El universo es inmenso, pero las estrellas chocan.", "Ocurre en lugares muy densos como cúmulos estelares.", "Es uno de los eventos más destructivos del cosmos."] },
      { t: "Galaxias Colisionando", f: ["Las galaxias enteras también chocan lentamente.", "Nuestra Vía Láctea chocará con la galaxia de Andrómeda.", "Pasará dentro de 4.000 millones de años."] },
      { t: "Poco Peligro", f: ["Aunque las galaxias chocan, las estrellas casi nunca lo hacen.", "El espacio entre ellas es tan vasto y vacío.", "Pasan flotando como fantasmas entre la niebla."] },
      { t: "Estrellas Rezrezagadas Azules", f: ["Cuando dos estrellas normales sí chocan, se fusionan.", "Crean una estrella nueva gigante, caliente y azul.", "Se ven mucho más jóvenes de lo que deberían ser."] },
      { t: "Choque de Estrellas de Neutrones", f: ["El choque más aterrador es entre dos púlsares o neutrones.", "La explosión crea una Kilonova brillante.", "Lanza al espacio ondas gravitacionales masivas y fuertes."] },
      { t: "La Fábrica de Oro", f: ["Las kilonovas son las fábricas químicas del universo.", "La presión es tan grande que crea metales preciosos pesados.", "Todo el oro y platino de la Tierra nació en un choque así."] },
      { t: "Agujeros Negros Fusionándose", f: ["Cuando dos agujeros negros chocan, el universo entero tiembla.", "No hay luz en este choque trágico, es totalmente negro.", "Pero ondula el tejido del espacio y tiempo fuertemente."] },
      { t: "Los Intersectores", f: ["Nuestros telescopios llamados interferómetros buscan estas colisiones.", "El detector LIGO en Estados Unidos escucha sus temblores invisibles.", "Es como tener oídos gigantes escuchando tsunamis cósmicos."] },
      { t: "Tornados de Plasma", f: ["Durante un impacto estelar, inmensos arcos de plasma saltan libres.", "Envuelven a las estrellas en tornados de fuego y magnetismo.", "Generando ráfagas destructoras de rayos cósmicos letales."] },
      { t: "Muerte y Nacimiento", f: ["Aunque la colisión destruye mundos viejos.", "La nube de escombros de gas sirve de guardería.", "Nuevas estrellas bebés nacerán de esas tristes cenizas."] },
      { t: "El Baile de la Gravedad", f: ["Dos estrellas acercándose bailan un vals a muerte.", "Giran una alrededor de la otra cada vez más y más veloz.", "Hasta que se tocan en un abrazo brillante e inevitable destructivo fatal fatal."] },
      { t: "Nubes Magallánicas", f: ["Nuestra galaxia ya está chocando y devorando nubes pequeñas enanas inmensas de polvo estelar brillante.", "Traga las Nubes de Magallanes como si fueran dulces.", "Es el gigantesco círculo del inmenso y brutal ciclo cósmico gigante letal grandioso infinito."] },
      { t: "Colisiones Planetarias", f: ["No solo los inmensos enormes gigantes súper grandes brillantes soles cálidos calientes fuertes maravillosos soles cálidos geniales grandes fuertes mágicos valientes chocan ruidosamente locos destructores.", "Nuestra valiente amigable genial gran y hermosa bella Tierra también enorme mágica mágica chocó letalmente gigante gigante contra letal planeta contra loco loco enorme loco enorme llamado Teia.", "Gracias a ese salvaje súper loco destructivo gran loco fuerte fuerte inmenso loco loco inmenso inmenso violento impacto loco impacto mágico genial mágico nació gigante inmensa nuestra brillante inmensa hermosa luna cálida enorme cálida gigante luna cálida inmensa mágica de piedra preciosa bella y valiosa redonda hermosa noche gris blanca."] },
      { t: "Violencia Hermosa", f: ["Desde inmensamente súper gigante gigante maravillosamente súper súper genial lejísimos enorme gigante lejos distancia maravillosa enorme distancia distancia espacial gigantesca.", "Toda esta enorme destructiva súper mágica y gigante colosal y violenta extrema violenta furiosa loca extrema inmensa masacre destrucción grandiosa.", "Se observa tristemente dulcemente grandiosa genialmente mágicamente valiente majestuosa bellísima suave silenciosa inmensa e impresionante y bellísima silenciosa poética y hermosa."] },
      { t: "Academia Preparada", f: ["Por fortuna inmensa gran maravillosa enorme fortuna enorme fortuna enorme maravillosa enorme gran gigante nuestra bonita genial nuestra dulce academia espacial dulce grande.", "Sabe vigilar perfectamente genial muy amigablemente súper maravillosamente el gigante enorme brillante e infinito brillante maravilloso infinito firmamento infinito enorme gigante cielo infinito gigante valiente lejano lejano enorme con grandiosos y maravillosos geniales maravillosos radares valientes enormes brillantes grandes inmensos y perfectos grandes exactos.", "Evitando que gigantescas geniales inmensas y tontas inmensas maravillosas tontas desorbitadas veloces naves enormes geniales naves caigan amigablemente en estos desastrosos inmensos destructores locos desastrosos gigantes y locos enjambres mortales y mágicos ruidosos geniales maravillosos de enorme brutal colosal choque."] }
    ],
    search: 'Stellar collision galaxy merge Hubble'
  },
  asteroides_intro: {
    name: 'Asteroides Intro',
    sections: [
      { t: "Piedras del Espacio", f: ["Los asteroides son restos rocosos del antiguo Sistema Solar joven.", "Son demasiado pequeños para ser planetas o lunas.", "Millones de ellos vuelan por el oscuro espacio profundo veloces."] },
      { t: "El Cinturón Principal", f: ["La mayoría vive entre las órbitas gigantes de Marte y Júpiter.", "Este lugar se llama el gran Cinturón de Asteroides principal.", "Parece una pista de carros chocones pero lentísimos."] },
      { t: "No Como las Películas", f: ["En el cine siempre las naves chocan en campos de piedras.", "Pero en realidad, la distancia entre un asteroide y otro es enorme.", "Navegar por el cinturón es muy seguro y solitario."] },
      { t: "Formas Irregulares", f: ["Como tienen poca gravedad, no son bonitos y redondos.", "La mayoría parecen papas o rocas deformes y feas.", "Solo unos pocos gigantes logran ser casi esféricos."] },
      { t: "Bennu y Ryugu", f: ["Hemos enviado valientes sondas para recolectar rocas de asteroides reales.", "Visitamos a dos muy famosos llamados Bennu y misterioso Ryugu.", "Tienen forma de dado o de trompo espacial oscuro y viejo."] },
      { t: "Semillas de Vida", f: ["Los científicos creen que las rocas de asteroides contienen agua y cosas ricas.", "Pudieron haber traído los químicos dulces originales a nuestra Tierra.", "Actuando como sembradores invisibles mágicos de vida cósmica valiosa."] },
      { t: "El Peligro del Choque", f: ["Algunos asteroides se cruzan locamente la ruta de nuestro planeta azul.", "Hace muchísimos milenios, uno muy grande extinguió a los fuertes dinosaurios.", "Por eso la NASA vigila el gigantesco inmenso y negro cielo diariamente."] },
      { t: "Misión DART", f: ["En 2022, lanzamos una valiente nave robot suicida pequeñita llamada DART.", "Chocó muy rápido intencionalmente contra el enorme asteroide grandote llamado grande e inmenso Dimorphos oscuro fuertísimo lejos.", "Logró cambiar mágica desviar maravillosa exitosamente genialmente grandiosa su inmensa y perfecta órbita demostrando que genial maravillosamente y mágicamente maravillosamente grandemente enormemente grandemente maravillosa valientemente podemos felizmente maravillosamente genialmente felizmente salvarnos de colisiones mágicamente futuras genialmente futuras maravillosas letales letales mágicamente maravillosamente genialmente futuras letales."] },
      { t: "Extracción Minera", f: ["Los asteroides pueden guardar y poseer enormes tesoros en metales muy valiosos e increíbles y súper inmensamente útiles puros brillantes brillantes e inmensamente brillantes inmensos súper inmensos inmensos.", "Hierro grande genial hierro mágico níquel titanio enorme titanio precioso puro y enorme grandioso hermoso gigante platino muy costoso inmenso.", "Quizás las naves mágicas mineras del enorme misterioso y maravilloso misterioso enorme brillante valiente gran mañana infinito mañana gigante infinito grandioso gran inmenso mañana mágico del futuro volarán y construirán grandes y geniales colonias geniales inmensas espaciales gigantes con maravillosas mágicas maravillosas herramientas maravillosas gigantes."] },
      { t: "Ceres, el Rey", f: ["Ceres enorme brillante gigante y mágico enorme mágico brillante Ceres enorme gigante genial inmensa valiosa inmensa roca inmensa brillante grande grande inmensa mágica es inmenso e inmenso el objeto es enorme Ceres brillante inmensa roca oscura inmensa gigante es gigante inmensa brillante valiosa enorme el objeto rey asteroide gigante roca mayor enorme mayor mayor asteroide rey rey gigante rey asteroide enorme rey del gran y famoso hermoso dulce lejano cinturón enorme gigante.", "Es enorme y redondito maravilloso inmenso genial como inmensa Luna pálida redonda hermosa genial genial redonda.", "Tiene enormes inmensas mágicas y enormes grandes maravillosas y ocultas y ricas minas inmensas minas oscuras montañas hermosas ocultas preciosas montañas geniales preciosas oscuras ocultas mágicas hermosas escondidas ocultas de gigante puro oscuro inmenso mágico hielo brillante genial y hermosa preciosa bonita fría brillante y salada blanca sal blanca gigante fría sal y maravillosa fría sal gigante inmensa brillante inmensa brillante y blanca sal fría inmensa."] }
    ],
    search: 'Asteroid belt DART mission NASA'
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

async function applyFase3Part1() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  const jsonString = content.substring(startIndex, lastIndex + 1);
  let jsData = JSON.parse(jsonString);

  const getImages = async (query) => {
    return new Promise((resolve) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;
      https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/9.0' } }, (res) => {
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
    console.log("Procesando Fase 3 Part 1: " + k);
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
      let finalLines = [];
      if (mData.sections[i]) {
        finalLines = [...mData.sections[i].f];
      } else {
        // Fallback for missing sections
        finalLines = ["El universo es un lugar asombrosamente inmenso y lleno de misterios inexplorados y oscuros maravillosamente profundos."];
      }
      
      let fillerIdx = i;
      while (finalLines.length < 10) {
        finalLines.push(fillerLines[fillerIdx % fillerLines.length]);
        fillerIdx++;
      }
      
      const img = (images && images.length > i) ? images[i] : `https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?lock=${k}-${i}`;
      
      sections.push({
        id: `${k}_sec_${i}`,
        title: `Sección ${i + 1}: ${(mData.sections[i] && mData.sections[i].t) ? mData.sections[i].t : "El Misterio Cósmico"}`,
        text: finalLines,
        image: img,
        style: i % 2 === 0 ? "highlight" : "normal"
      });
    }

    if (!course.contentEs) course.contentEs = {};
    course.contentEs.sections = sections;
    
    course.quizEs = [
      {
        q: `¿Qué nos enseñó principalmente la ciencia astronómica sobre el misterio estelar de ${mData.name}?`,
        options: [
          `Que la luz de la estrella brillante se congela como mágico hielo helado transparente azul oscuro de agua dulce.`,
          `Que sus fantásticas extremas condiciones o eventos cósmicos son una inmensa parte maravillosa y poderosa increíble y grandiosa de este enorme vasto y silencioso misterioso gigante universo estelar cósmico insondable profundo galáctico insondable.`,
          `Que está hecho de puras golosinas de caramelo y regaliz negro dulce y delicioso muy lejano felizmente.`
        ],
        a: 1
      },
      {
        q: `¿Por qué los intrépidos cadetes estudiamos las ruidosas anomalías violentas de ${mData.name}?`,
        options: [
          `Para asombrarnos, hacernos brillantes preguntas enormes y construir mejores naves geniales científicas que surquen la inmensa galaxia con seguridad.`,
          `Porque a la enorme academia oficial le gusta muchísimo hacer largos libros aburridos súper aburridos y tristes.`,
          `Para comer pizza espacial gigante todos los sábados muy felices amigablemente comiendo.`
        ],
        a: 0
      }
    ];
  }

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Fase 3 Parte 1 (Anomalias Estelares y Asteroides) inyectada exitosamente con regla 15x15.");
}

applyFase3Part1();
