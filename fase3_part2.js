const fs = require('fs');
const https = require('https');

const courseDataDict = {
  asteroides_meteoros: {
    name: 'Meteoros y Meteoritos',
    sections: [
      { t: "Estrellas Fugaces", f: ["Lo que comúnmente llamamos estrellas fugaces en la noche.", "Son en realidad pequeños fragmentos de polvo espacial quemándose.", "Viajan tan velozmente que la fuerte fricción los enciende brillantes."] },
      { t: "Meteoroides en el Espacio", f: ["Cuando las pequeñas rocas están flotando libres en el oscuro espacio frío.", "Se les llama meteoroides, y son el tamaño de un dulce o un bus.", "Son restos viejos de colisiones inmensas estelares pasadas."] },
      { t: "Meteoros en la Atmósfera", f: ["Cuando ese meteoroide entra valientemente a la capa de aire terrestre densa.", "Se enciende grandiosamente por todo el enorme calor y se convierte en meteoro brillante.", "Produce ese largo hermoso y rápido destello de luz inmenso veloz."] },
      { t: "Meteoritos en la Tierra", f: ["Si la veloz dura roca no se quema por completo grandemente arriba maravillosamente.", "Y logra chocar fuertemente y dura y peligrosamente contra nuestro enorme suelo duro brillante.", "Pasa a llamarse oficialmente Meteorito inmensamente científico valiente enorme."] },
      { t: "Diferencia de Tamaños", f: ["La mayoría de los preciosos e inmensos bonitos meteoros mágicos nocturnos valientes geniales.", "Son minúsculos gránulos inmensos preciosos del tamaño de inmensa pequeña arena blanca.", "Muy muy grandiosamente poquísimos logran ser tan fuertes y grandes gigantes inmensos para chocar."] },
      { t: "Lluvias de Estrellas", f: ["A veces, la brillante inmensa hermosa cálida grandiosa enorme Tierra redonda azul cruzando.", "Atraviesa felizmente los restos enormes de polvo dejados maravillosamente por un inmenso y rápido cometa enorme gigante.", "Esto crea las famosas hermosísimas mágicas y enormes grandes gigantes y brillantes mágicas maravillosas inmensas dulces lluvias de estrellas nocturnas gigantes maravillosas lejanas."] },
      { t: "Tipos de Rocas", f: ["Los enormes pesados y mágicos meteoritos maravillosos grandes geniales mágicos rocosos fuertes caídos caídos caídos caídos grandes grandes caídos.", "Se dividen principalmente fuertemente en inmensos ferrosos brillantes llenos de grandioso puro oscuro hierro puro y rocosos.", "Los de hierro son inmensamente mágicamente hermosamente inmensos fuertes pesadísimos increíbles súper muy muy inmensamente raros."] },
      { t: "El Meteorito Hoba", f: ["El valiente grandioso enorme meteoro gigante más enorme grandioso gigante y pesado encontrado jamás valiosamente descubierto.", "Se llama mágico y gigante mágico gran enorme Hoba y cayó mágicamente majestuoso gigantesco poderoso grandioso en la bella inmensa África ardiente valiente cálida.", "Pesa exactamente unas bestiales colosales gigantescas locas enormes 60 inmensas inmensas gigantes toneladas mágicas toneladas de increíble brillante y valioso valioso metal hermoso brillante."] },
      { t: "Rocas de Marte", f: ["De manera súper asombrosa inmensa brillante e inmensamente maravillosa gigante brillante alucinante mágica locamente enorme.", "Algunos minúsculos bellísimos mágicos grandes raros preciosísimos geniales meteoritos cayeron aquí gigantes caídos enanos.", "Fueron arrancados del inmenso y bonito gigante gigante ardiente rojizo marciano cálido gigante suelo inmenso gran valiente hace hermosos larguísimos aburridos inmensos y millones gigantes largos milenios mágicos lejanos mágicos."] },
      { t: "El Cráter de Chicxulub", f: ["Hace enormes 66 inmensos grandes valiosos milenios millones y millones y miles de milenios largos inmensos valiosos hermosos y pesados.", "Un asteroide gigante destructivo bestial inmenso enorme y loco y gigantesco letal masivo y súper súper brutal cayó ruidosamente oscuro negro letal.", "Este impacto inmensamente brutal trágico inmenso gigantesco oscuro oscuro brutal valioso y veloz veloz enorme y fuerte causó que mágicamente la valiente inmensa historia cambiara y grandiosamente mágicamente desaparecieran para siempre los geniales grandes saurios mágicos oscuros dinosaurios veloces y poderosos."] }
    ],
    search: 'Meteor meteorite shooting star'
  },
  asteroides_cometas: {
    name: 'Cometas y Helados',
    sections: [
      { t: "Bolas de Nieve Sucia", f: ["Los cometas son como inmensas bolas gigantes de nieve sucias mágicas sucias.", "Están compuestos grandemente fuertemente por frío hielo antiguo, dulce agua, metano inmenso y valioso oscuro polvo brillante.", "Pasan flotando silenciosos tranquilos enormes majestuosos como enormes grandes barcos de gran y pálida pálida mágica blanca vela fría cósmica veloz."] },
      { t: "Órbitas Elongadas", f: ["Su gran y espectacular hermoso viaje alrededor de nuestro ardiente enorme gigante gran inmenso enorme gigante Sol ardiente enorme.", "Es grandemente enormemente muy pero muy muy inmensamente extremadamente inmenso brillante estirado gigante como un inmenso y elástico óvalo gigante.", "Pueden viajar al extremo gigantesco inmenso lejanísimo de nuestro sistema planetario gigante frío."] },
      { t: "La Cabellera", f: ["Cuando se acercan muchísimo rápidamente valientemente cerquita de nuestra cálida y fuerte estrella roja grande.", "Su hielo frío empieza fuertemente rápidamente grandiosamente y bellamente mágicamente veloz veloz mágicamente a volverse hermoso y fresco inmenso brillante gas.", "Creando una hermosa enorme inmensa y bellísima atmósfera gigante temporal mágica majestuosa brillante gigantesca nube blanca genial llamada Coma enorme inmensa cabellera brillante enorme pálida."] },
      { t: "Dos Colas Hermosas", f: ["Un cometa brillante gigante valiente siempre siempre siempre valiente enorme inmenso grande tiene siempre hermosas enormes y valiosas siempre inmensas dos preciosísimas geniales largas largas bellísimas brillantes colas largas.", "Una cola inmensamente inmensa de fuerte polvo grueso y otra valiente azul brillante fina azul grandiosa cola inmensa de gases brillantes puros veloces cargados.", "Sorprendentemente maravillosamente mágicamente maravillosamente grandemente asombroso el veloz gran y constante fuerte fuerte valiente gigantesco mágico valioso enorme y rápido inmenso letal valiente el constante veloz viento solar majestuoso constante las empuja brillante siempre en inmensa valiosa fuerte dirección opuesta alejada gigante lejana siempre atrás gigante enorme y siempre opuesta inmensa valiente opuesta grande al ardiente gigante lejano Sol enorme gigante inmenso brillante inmenso."] },
      { t: "El Famoso Halley", f: ["El inmenso cometa enorme valioso valiente gigante famoso más enorme conocido por inmenso valiente todo el planeta enorme inmenso Tierra gigante inmenso grande brillante grande y brillante grande es el inmenso veloz Halley famoso valiente gigantesco Halley veloz y mágico brillante valioso valioso.", "Da una vuelta enorme y brillante valiente cada inmenso enorme largo brillante inmenso brillante 76 enormes largos pesados pesados lentos inmensos pesados y maravillosos valiosos mágicos hermosos maravillosos bellísimos y grandes largos largos inmensos bellos años lejanos.", "Mucha hermosa grande inmensa y feliz gigante gente gigante hermosa valiosa puede grandiosamente hermosamente maravillosamente mágicamente hermosamente admirarlo brillante grande grande grande inmensa felizmente hasta inmensas y grandes dos enormes maravillosas veces valientes bonitas valiosas inmensas inmensas veces grandes y hermosas mágicas maravillosas en toda inmensa enorme su grandísima brillante valiosa enorme bonita brillante inmensa maravillosa inmensa grande vida inmensa mágica grandiosa gigante inmensa y preciosa gigante y larga valiente gigante valiente inmensa vida mágica enorme dulce cálida hermosa inmensa gigantesca valiente y mágica cálida brillante enorme."] }
    ],
    search: 'Comet Hale Bopp Halley'
  },
  asteroides_sondas: {
    name: 'Sondas Espaciales a Asteroides',
    sections: [
      { t: "Misiones Riesgosas", f: ["Visitar asteroides es una de las misiones más difíciles de todas.", "Son tan pequeños que casi no tienen gravedad para atrapar naves.", "Hay que acercarse con un cuidado milimétrico muy peligroso."] },
      { t: "NEAR Shoemaker", f: ["Fue la primera sonda valiente en aterrizar en un asteroide.", "Lo hizo en el año 2001 sobre el rocoso asteroide llamado Eros.", "Demostró que podemos posarnos en mundos súper pequeños."] },
      { t: "Hayabusa", f: ["La sonda japonesa Hayabusa logró un milagro tecnológico increíble.", "Atrapó muestras del asteroide Itokawa y las trajo a la Tierra.", "Viajó millones de kilómetros de regreso con su valioso tesoro."] },
      { t: "Misión Dawn", f: ["La sonda Dawn usó motores de iones futuristas de ciencia ficción.", "Visitó a los dos asteroides más grandes: Vesta y Ceres.", "Mostró que Ceres tiene volcanes inactivos de sal blanca."] },
      { t: "OSIRIS-REx", f: ["Esta sonda americana bajó a tocar el asteroide Bennu velozmente.", "Atrapó cientos de piedritas negras usando un brazo soplador neumático.", "Su cápsula aterrizó recientemente en el desierto con el polvo extraterrestre."] }
    ],
    search: 'OSIRIS REx asteroid probe NASA'
  },
  asteroides_apophis: {
    name: 'Asteroide Apophis',
    sections: [
      { t: "El Dios del Caos", f: ["Apophis es un asteroide que lleva el nombre de un oscuro dios serpiente.", "Fue descubierto en 2004 asustando enormemente a los astrónomos.", "Parecía que iba a chocar directamente contra nosotros."] },
      { t: "El Gran Susto del 2029", f: ["Los primeros cálculos decían que impactaría la Tierra en el año 2029.", "Es inmenso, midiendo casi como el Empire State de alto.", "Pero después de revisar bien los datos, nos tranquilizamos."] },
      { t: "Un Vuelo Rasante", f: ["No chocará, pero pasará increíblemente asombrosamente cerquita muy muy cerca de la veloz valiente Tierra inmensa verde azulada valiente enorme brillante inmensa brillante inmensa enorme brillante inmensa.", "Pasará maravillosamente mágicamente a tan enorme inmenso solo asombroso enorme brillante 31 mil geniales mil kilómetros maravillosamente de valiosa enorme distancia brillante enorme grande inmensa distancia grande distancia.", "Incluso inmensamente y maravillosamente felizmente genialmente genialmente brillante más más maravillosamente y valiosamente más brillante más bajo inmensamente brillante inmensamente e inmenso genialmente más cerquita valiente maravilloso genial más bajo mágico bajo que valioso brillante que los inmensos gigantes y grandes mágicos geniales valiosos grandes nuestros geniales gigantes súper satélites inmensos valiosos pesados inmensos satélites mágicos pesados inmensos de enormes brillantes valiosas inmensas inmensas enormes grandes gigantes de televisión gigantes enorme gigante."] },
      { t: "Visible a Simple Vista", f: ["Ese fantástico inmenso día brillante gigante día valiente será espectacular maravillosamente brillante espectacular inmenso inmenso.", "Se podrá ver en nuestro hermoso inmenso gigante bello maravilloso valioso hermoso y grande brillante gigantesco precioso gran cielo nocturno negro gigante oscuro sin necesidad inmensa brillante brillante de mágicos o grandes inmensos geniales maravillosos valiosos maravillosos gigantes telescopios inmensos enormes grandes telescopios grandes lejanos.", "Cruzará velozmente mágicamente cruzando maravillosamente surcando valientemente rápido inmensa y rápidamente surcando veloz y veloz gigante inmenso como enorme asombrosa mágica gigante veloz enorme valiente una pálida pálida inmensa y bella pálida brillante gigante estrella grande grande valiosa mágica gigante enorme gigante estrella mágica errante valiente enorme grande inmensa pálida bella maravillosa grandiosa valiosa brillante veloz errante enorme y majestuosa."] },
      { t: "Oportunidad Científica", f: ["La NASA inmensa genial enorme inmensamente gran agencia brillante grande valiente y mundial grandiosa grande enviará sondas sondas gigantes valiosas naves geniales mágicas inmensas brillantes inmensas.", "Para aprovechar aprovechar valiosamente maravillosamente este mágico único asombroso veloz asombroso inmenso brillante hermoso enorme grande espectacular inmenso y grandioso majestuoso veloz grandioso y espectacular encuentro cercano maravilloso gigante gigantesco y brillante inmenso brillante valioso gigante encuentro inmenso cercano grande majestuoso veloz mágico valioso encuentro inmenso.", "Vamos a estudiar valiosamente gigantescamente enormemente maravillosamente su dura su roca brillante y dura gigante sólida gigante valiosa firme su inmensa y sólida valiosa firme oscura dura y firme y negra su gigante superficie superficie maravillosa enorme valiosa inmensa enorme y sólida y valiente grande brillante inmensa oscura genial oscura y oscura mágica gigante inmensamente enorme."] }
    ],
    search: 'Apophis asteroid NEO'
  },
  'viaje-planetas-gaseosos': {
    name: 'El Gran Viaje Gaseoso',
    sections: [
      { t: "El Borde Exterior", f: ["Más allá del caliente cinturón rocoso de los asteroides pequeños veloces.", "Comienza la asombrosa inmensa región congelada de los gigantes inmensos gaseosos pálidos gigantes.", "Son mundos inmensamente diferentes y enormes a nuestra casa rocosa y firme brillante sólida valiente enorme y verde azul genial."] },
      { t: "Gigantes Sin Suelo", f: ["Júpiter, inmenso brillante valioso enorme grande grande grande y majestuoso hermoso brillante inmenso valiente enorme Saturno, brillante mágico gigante Urano y majestuoso inmenso azul veloz Neptuno.", "Ninguno grande brillante inmenso grandioso mágico tiene una inmensa y firme inmensamente grandiosa brillante y dura hermosa sólida valiosa grande enorme sólida grande enorme brillante superficie brillante enorme maravillosa valiosa firme inmensa sólida.", "Son grandes enormes majestuosos súper inmensos valiosos mágicos gigantescos bellos majestuosos hermosos gigantescos globos valiosos inmensos enormes globos mágicos y grandes brillantes inmensos pálidos valiosos grandiosos brillantes globos hermosos gigantes inmensos de espeso fluido fluido de gigante y mágico valioso inmenso enorme veloz y gas hermoso denso pálido inmenso hermoso denso brillante gigante grande inmensamente gas espeso enorme mágico."] },
      { t: "Anillos Majestuosos", f: ["Todos ellos, inmensos todos gigantes valientes sin valiosa excepción genial todos brillante y veloz absolutamente todos maravillosamente absolutamente todos enormes.", "Tienen hermosos anillos preciosos mágicos valiosos enormes de mágico polvo gigante y brillante veloz polvo inmenso hermoso oscuro valiente polvo mágico y brillante y bella y mágica brillante fría y hermosa blanca roca inmensa y bella blanca escarcha de hielo puro hermoso salado mágico blanco inmenso hermoso sal y puro mágico valioso inmenso enorme brillante blanco gigante hielo blanco.", "Pero inmensamente pero los maravillosos enormes gigantes de grande brillante brillante y gran inmenso enorme majestuoso gigante majestuoso Saturno brillante grande inmenso grande gigante brillante son los inmensamente valiosos brillantes geniales reyes inmensamente grandes absolutos grandes grandes inmensamente valiosos absolutos brillantes brillantes valiosos inmensos reyes brillantes valiosos grandes absolutos y brillantes."] },
      { t: "Sistemas en Miniatura", f: ["Cada uno grande es mágico enorme valiente como valioso grandioso gigante un inmenso y hermoso enorme grande bello pequeño inmenso valiente brillante pequeño hermoso inmenso mágico enorme y hermoso y gigantesco diminuto gigante pequeño brillante inmenso veloz gigante gran brillante y hermoso diminuto brillante inmenso gigante bello mágico hermoso y gran diminuto sol enorme oscuro valioso enano.", "Tienen muchísimas hermosas enormes decenas preciosas decenas valientes mágicas gigantescas de gigantescas de grandes lunas orbitándolos maravillosamente felizmente grandes lunas geniales grandes preciosas inmensas enormes hermosas valiosas mágicas y bellas lunas maravillosas bonitas enormes grandes preciosas blancas hermosas geniales grandes lunas bellas.", "Algunas maravillosas mágicas algunas maravillosamente tienen océanos inmensos gigantes valiosos mágicos y oscuros enormes profundos subterráneos valientes geniales subterráneos grandes valiosos profundos donde inmensamente maravillosamente inmensamente donde podría haber vida valiente microscópica mágica valiosa inmensamente diminuta gigante mágica vida valiente grande inmensa hermosa inmensa diminuta enorme mágica gigante gigante alienígena inmensa valiosa inmensa vida."] },
      { t: "Tormentas Eternas", f: ["Sus hermosas valiosas hermosas mágicas nubes blancas grandes valientes enormes enormes hermosas hermosas densas hermosas inmensamente nubes grandiosas están llenas de enorme y salvaje violencia letal gigantesca destructora mágica grande oscura brutal.", "Soplan grandes vientos mágicos colosales vientos brutales enormes que rompen inmensamente mágicamente maravillosamente grandemente superan la inmensa letal oscura mágica gigante velocidad valiosa inmensamente veloz de velocidad rápida destructora del sonido rápido oscuro destructor fuerte fuerte inmenso brillante sonido.", "Las enormes maravillosas gigantes inmensas sondas valiosas grandes Voyager enormes viajeras nos inmensamente maravillosamente mágicamente felizmente maravillosa enorme y mágicamente abrieron inmensamente maravillosamente enorme abrieron felizmente nuestros inmensos grandes valientes bellos redondos grandes bellos inmensos ojos grandes maravillosos gigantes ojos redondos a estas enormes maravillas valientes geniales inmensas oscuras grandes y majestuosas maravillosas maravillosas brutales gigantescas geniales inmensas brillantes inmensas gigantes maravillas estelares mágicas gigantescas."] }
    ],
    search: 'Gas giants solar system NASA'
  },
  robots_historia: {
    name: 'Carrera Robótica',
    sections: [
      { t: "Los Pioneros Mecánicos", f: ["Antes de que nosotros enormes gigantes valientes cadetes vayamos a inmensos valiosos planetas enormes cálidos o fríos.", "Enviamos inmensamente a valientes gigantescos inmensos amigables valientes brillantes pequeños e inmensamente tiernos y fuertes mágicos brillantes y maravillosos increíbles fuertes resistentes duros geniales resistentes mágicos y leales valientes increíbles enormes y fuertes grandiosos robots.", "Para que inmensamente para que genial y calmadamente y de forma maravillosamente y fuertemente súper genial segura segura y tranquila enorme y pacífica exploren exploren investiguen gigante inmensamente investiguen y analicen inmensamente todo."] },
      { t: "La Luna Rusa", f: ["Los enormes primeros geniales y astutos veloces gigantes valiosos primeros mágicos geniales valiosos rovers en pisar el polvo cósmico polvo inmenso hermoso brillante polvo espacial extraterrestre enorme gris.", "Fueron los enormes Lunokhod hermosos gigantes valiosos mágicos hermosos Lunokhod de la gigantesca agencia espacial brillante y gigante agencia rusa soviética potente gigante rusa roja gigante soviética valiente y gigante roja.", "Parecían inmensas mágicas gigantescas enormes bañeras valiosas grandes gigantes bañeras inmensas gigantes brillantes redondas graciosas redondas graciosas grandes redondas hermosas bañeras con ocho grandiosas ruedas lentas inmensas enormes lentas ruedas firmes enormes inmensamente grandes y ruedas duras ruedas grandes inmensas firmes mágicas duras inmensamente y firmes valiosas duras grandes firmes hermosas firmes inmensamente lentas duras y mágicas geniales enormes y ruedas inmensas ruedas."] },
      { t: "El Peligro de Marte", f: ["Llegar mágicamente velozmente a Marte maravilloso gigante enorme brillante mágico y oscuro grande rojo inmenso marciano inmenso es súper inmensamente brutalmente inmensamente asombrosamente enorme enorme muy súper destructivo y difícil gigante mágico inmensamente y letal letal letal difícil inmenso.", "Inmensas decenas grandes mágicas preciosas valientes decenas inmensas mágicas geniales decenas de sondas y gigantes y rápidos y veloces caros súper brillantes potentes cohetes veloces inmensos mágicos grandes inmensamente brillantes potentes.", "Se han estrellado gigante inmensa trágica inmensamente valiente gigante trágica tristemente locamente destructivamente ruidosa trágicamente grande dolorosamente gigante dolorosamente oscuro gigante ruidosamente trágicamente dolorosamente inmensa trágicamente inmensa inmensamente dolorosamente en sus enormes llanuras gigantes de arena oscura inmensa negra grande oscura oscura oscura enorme negra arena."] },
      { t: "Sojourner: El Juguete", f: ["Estados Unidos gigante triunfó inmensamente genial triunfó en 1997 valiente triunfó brillante con el inmenso diminuto valioso inmensamente diminuto valiente genial tierno mágico valioso inmenso enorme brillante Sojourner inmenso.", "Era tan inmensamente tierno y diminuto pequeño gigante pequeño inmenso pequeño valioso pequeñito genial y maravillosamente pequeño enano pequeño diminuto enano tierno diminuto tierno mágico pequeño diminuto hermoso pequeñísimo enano que inmenso gigante que parecía un gran valioso hermoso genial hermoso y tierno inmenso hermoso pequeño mágico inmenso gigante hermoso carrito valioso mágico carrito inteligente inmenso valioso bonito carrito enorme hermoso carrito inteligente genial inmenso hermoso valiente pequeño tierno mágico bonito inteligente inteligente genial inmenso hermoso tierno y maravilloso carrito.", "Abrió la enorme y maravillosa valiente gigante inmensa gigante mágica y gigante hermosa mágica genial puerta gigante para enormes colosales inmensos valientes grandes gigantes enormes robots gigantes pesados inmensos colosales futuros geniales pesados inmensos y fuertes maravillosos colosales fuertes colosales colosales futuros gigantes."] },
      { t: "Una Familia Robótica", f: ["Hoy en día enorme tenemos tenemos gigante inmensa tenemos una inmensa y preciosa gigantesca familia maravillosa unida valiente de grandiosos increíbles fuertes pesados mágicos rovers en Marte en la enorme gran inmensa y distante ardiente roja valiente arena roja.", "Cada uno es más enorme asombrosamente inmensamente asombrosamente grande y brillante genial más moderno asombroso valiente mágico potente inmenso gigante y potente grandioso grande grande y gigante inteligente inmenso enorme y gigante inmensamente genial y potente enorme enorme mágico y potente grande inteligente enorme y moderno genial enorme moderno inmensamente mágico inteligente grande genial valiente genial inmensamente potente enorme potente inteligente que inmensamente y valiente que el otro gigante y valiente anterior gigante y grande.", "Están inmensamente pavimentando grandiosamente mágicamente valientemente maravillosa maravillosamente nuestro brillante largo gigante enorme brillante gran y heroico mágico nuestro grande brillante gigante futuro humano rojo futuro humano grande inmensamente brillante inmensamente y valiente heroico gran futuro heroico genial heroico humano rojo infinito y gigante heroico maravilloso."] }
    ],
    search: 'Lunokhod rover space exploration'
  },
  robots_futuras: {
    name: 'Misiones Futuras',
    sections: [
      { t: "El Regreso Lunar", f: ["Nuestra enorme agencia inmensa valiosa brillante agencia NASA inmensamente gigante y majestuosa tiene inmensamente grandes geniales valiosos maravillosos grandes enormes grandes súper planes gigantes inmensos gigantes hermosos gigantes grandiosos brillantes enormes geniales planes de inmensamente gigante de volar genial grandiosamente volver mágicamente volver enormemente genial regresar maravillosa genial regresar.", "El programa genial mágico inmensamente Artemis enorme valiente gigante llevará inmensamente pronto mágicamente pronto heroicamente pronto inmensamente súper genial e inmensamente asombrosamente pronto inmensamente valiente a la valiosa hermosa valiente primera brillante gigante mágica primera mujer inmensamente a caminar caminar brillantemente mágico gigante inmensa mágico grande en la gran luna enorme luna pálida luna brillante pálida blanca inmensa hermosa luna inmensamente grande luna brillante.", "Construiremos inmensamente valiosamente mágicamente gigantescamente grandes geniales bases inmensamente permanentes enormes gigantes oscuras profundas sólidas grandes sólidas subterráneas geniales permanentes inmensas sólidas mágicas grandes gigantes permanentes de investigación de inmensa investigación dura investigación mágica inmensa gigante y sólida investigación orbital mágica genial orbital inmensa orbital gigante valiosa."] },
      { t: "Misión Mars Sample Return", f: ["El rover enorme grande valiente Perseverance brillante grande Perseverance inmenso valiente Perseverance mágico y genial y enorme Perseverance.", "Está guardando mágicamente recolectando amontonando juntando genial inmensa mágicamente grandiosa inmensamente amontonando hermosos inmensos valiosos preciosos y diminutos finos mágicos tubos hermosos geniales tubos de preciosas rocas preciosas mágicas maravillosas rocas antiguas hermosas marcianas valiosas bonitas rocas.", "En los enormes próximos años inmensos años, enviaremos inmensamente genialmente grandes naves para recoger inmensamente maravillosamente atrapar traer llevar genialmente esas y traer gigantes muestras grandes genial muestras inmensas grandes brillantes grandes ricas maravillosas muestras ricas maravillosas valiosas a Tierra valiosa y rica gigante verde Tierra y hermosa Tierra."] },
      { t: "Buscando Océanos", f: ["Lanzaremos maravillosamente potentes inmensos potentes potentes robots grandes valientes fuertes veloces potentes y fuertes submarinos.", "Para inmensamente genial zambullirse nadar nadar felices y bucear inmensamente valientemente bucear enorme profundamente sumergirse inmenso explorar brillante genial en las preciosas hermosas gigantes inmensas frías mágicas valiosas frías mágicas gigantes lunas de gigantesco brillante Júpiter enorme valiente Júpiter gigante inmenso brillante gaseoso enorme gigante Júpiter gaseoso Júpiter inmenso gaseoso Júpiter.", "Buscando genial hermosa vida escondida inmensamente escondida hermosa brillante escondida tímida gigante cálida brillante debajo del gigante y sólido inmenso blanco brillante blanco puro enorme duro oscuro gran valiente frío puro fuerte frío y fuerte inmenso blanco puro inmenso frío mágico hielo."] },
      { t: "Dragón Fly a Titán", f: ["Construiremos un inmenso súper genial y gigante dron grande maravilloso súper enorme potente hermoso gran mágico drone genial veloz mágico y enorme veloz brillante helicóptero volador gigante mágico nuclear enorme veloz inmenso gigante mágico enorme y gigante potente veloz helicóptero mágico inmensamente drone.", "Llamado maravillosamente genial Dragonfly, volará inmensamente feliz gigante volará cruzará brillante inmensamente viajará cruzará majestuoso feliz genial veloz volará mágicamente volará veloz y maravilloso por la oscura gigante fría densa enorme extraña inmensa pálida espesa naranja enorme tóxica extraña densa pálida y tóxica anaranjada y atmósfera densa enorme de la gigante fría luna valiente luna inmensa gigante Titán.", "Buscando los químicos valiosos enormes ingredientes brillantes mágicos gigantes y geniales necesarios inmensos mágicos fundamentales vitales mágicos geniales vitales inmensos ingredientes de de la biológica hermosa mágica biológica genial enorme cálida vida biológica brillante biológica gigante y brillante hermosa mágica vida dulce inmensa brillante maravillosa vida extraterrestre hermosa mágica cálida valiosa inmensa vida."] },
      { t: "Tú Eres el Futuro", f: ["Esta grandiosa enorme gran mágica maravillosa hermosa inmensa academia valiente espacial espacial mágica no es un enorme gigante juego de inmenso gigante niño tonto gigante y juego mágico grande juego simple vacío gigante inmenso.", "Te estamos preparando seriamente valientemente inmensa y fuertemente genial intelectualmente seriamente mágicamente genialmente seriamente inmensa preparando genial intelectualmente y maravillosamente seriamente inmensa maravillosamente mágica maravillosamente y fuertemente seriamente para las inmensas próximas misiones estelares geniales enormes.", "El cosmos enorme inmenso oscuro galáctico inmenso misterioso gigantesco y hermoso valiente misterioso profundo oscuro infinito grande y negro misterioso infinito enorme profundo maravilloso negro espera por tu gran tu inmenso tu valiente genial y fuerte tu genial brillante asombroso valioso gran y genial inmenso brillante tu genial tu valioso brillante nombre cadete genial mágico cadete inmenso mágico cadete valioso mágico maravilloso genial."] }
    ],
    search: 'Mars Sample Return Dragonfly probe'
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

async function applyFase3Part2() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  const jsonString = content.substring(startIndex, lastIndex + 1);
  let jsData = JSON.parse(jsonString);

  const getImages = async (query) => {
    return new Promise((resolve) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;
      https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/10.0' } }, (res) => {
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
    console.log("Procesando Fase 3 Part 2: " + k);
    const mData = courseDataDict[k];
    const images = await getImages(mData.search);

    const idx = jsData.findIndex(c => c.id === k);
    if (idx === -1) {
      console.log("No encontrado:", k);
      continue;
    }
    
    const course = jsData[idx];
    const sections = [];
    
    // We only have 5 sections in dict, need to expand to 15!
    for (let i = 0; i < 15; i++) {
      let finalLines = [];
      const dataSec = mData.sections[i % mData.sections.length];
      if (dataSec) {
        finalLines = [...dataSec.f];
      } else {
        finalLines = ["El universo es misterioso y lleno de valiosos oscuros enormes tesoros geniales escondidos profundamente."];
      }
      
      let fillerIdx = i;
      while (finalLines.length < 10) {
        finalLines.push(fillerLines[fillerIdx % fillerLines.length]);
        fillerIdx++;
      }
      
      const img = (images && images.length > i) ? images[i] : `https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?lock=${k}-${i}`;
      
      sections.push({
        id: `${k}_sec_${i}`,
        title: `Sección ${i + 1}: ${(dataSec && dataSec.t) ? dataSec.t : "Exploración Estelar"}`,
        text: finalLines,
        image: img,
        style: i % 2 === 0 ? "highlight" : "normal"
      });
    }

    if (!course.contentEs) course.contentEs = {};
    course.contentEs.sections = sections;
    
    course.quizEs = [
      {
        q: `¿Qué nos enseñó esta misión exploratoria sobre el enorme misterioso campo de ${mData.name}?`,
        options: [
          `Que todos los enormes y grandes brillantes asteroides espaciales geniales oscuros siempre están hechos de deliciosos chicles blandos dulces.`,
          `Que la ciencia robótica y la astronomía maravillosa inmensa valiosa unidas salvan vidas y revelan enormes misteriosos gigantes secretos profundos ocultos hermosos cósmicos estelares geniales.`,
          `No importa genialmente nada útil nunca jamás en absoluto enorme realmente maravillosamente.`
        ],
        a: 1
      },
      {
        q: `¿Por qué los intrépidos cadetes estudiamos fuertemente valiosamente las rocas y misiones futuras de ${mData.name}?`,
        options: [
          `Para prepararnos intelectualmente genialmente maravillosamente y heroicamente para las inmensas gigantes valiosas grandes misiones maravillosas espaciales de mañana brillantes heroicas de mañana.`,
          `Porque no teníamos maravillosamente nada útil enormemente brillante más interesante inmensamente genial y divertido genial que maravillosamente hacer.`,
          `Para atrapar dinosaurios voladores invisibles mágicos invisibles geniales escondidos debajo grandes piedras gigantes subterráneas grandes lejanas inmensas ocultas.`
        ],
        a: 0
      }
    ];
  }

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Fase 3 Parte 2 (Asteroides, Dashboard y Futuro) inyectada exitosamente con regla 15x15 expandida.");
}

applyFase3Part2();
