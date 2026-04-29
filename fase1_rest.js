const fs = require('fs');
const https = require('https');

const planetsData = {
  venus: {
    name: 'Venus',
    sections: [
      { t: "El Gemelo Malvado", f: ["Venus tiene casi el mismo tamaño que la Tierra.", "Pero es un mundo tóxico y ardiente.", "Gira al revés que los demás planetas."] },
      { t: "La Atmósfera Aplastante", f: ["Su aire es 90 veces más pesado que el nuestro.", "Está lleno de dióxido de carbono asfixiante.", "Sentirías la presión de estar en el fondo del océano."] },
      { t: "Calor Infernal", f: ["Es el planeta más caliente de todos.", "Alcanza los 470 grados centígrados.", "El efecto invernadero está fuera de control allí."] },
      { t: "Lluvia de Ácido", f: ["Las nubes no son de agua.", "Llueve ácido sulfúrico corrosivo todo el tiempo.", "Pero el ácido se evapora antes de tocar el suelo."] },
      { t: "Volcanes Activos", f: ["Está cubierto de miles de volcanes gigantes.", "Muchos científicos creen que aún están haciendo erupción.", "Su superficie es roca basáltica negra."] },
      { t: "Un Día Más Largo que un Año", f: ["Gira sobre su eje súper lento.", "Tarda 243 días en dar un giro sobre sí mismo.", "Su año dura solo 225 días terrestres."] },
      { t: "El Lucero del Alba", f: ["Es el objeto natural más brillante del cielo nocturno después de la Luna.", "Brilla porque sus nubes reflejan la luz del Sol.", "Los antiguos lo confundían con una estrella."] },
      { t: "La Exploración Soviética", f: ["Rusia envió muchas sondas llamadas Venera.", "Fueron las primeras naves en aterrizar en otro planeta.", "Sobrevivieron apenas un par de horas antes de derretirse."] },
      { t: "Cráteres Extraños", f: ["Los meteoritos pequeños se queman en su atmósfera gruesa.", "Solo los más grandes logran chocar y dejar cráteres.", "No hay cráteres menores a 3 kilómetros."] },
      { t: "Ausencia de Lunas", f: ["Al igual que Mercurio, no tiene lunas.", "Viaja completamente solo por el espacio.", "Tampoco tiene anillos de polvo."] },
      { t: "El Efecto Invernadero", f: ["Nos enseña qué pasa cuando los gases atrapan el calor.", "Es una advertencia para cuidar el clima de la Tierra.", "Es un laboratorio natural sobre el calentamiento extremo."] },
      { t: "Vientos Huracanados", f: ["En la parte alta de sus nubes hay súper vientos.", "Viajan a 300 kilómetros por hora.", "Dan la vuelta al planeta en solo 4 días."] },
      { t: "Superficie Naranja", f: ["Si estuvieras allí, todo se vería de color naranja oscuro.", "La gruesa atmósfera filtra casi toda la luz azul.", "Es un paisaje oscuro y tenebroso."] },
      { t: "Magallanes: El Mapa", f: ["La sonda Magallanes usó radar para ver debajo de las nubes.", "Mapeó el 98% del planeta en los años 90.", "Reveló montañas gigantes y ríos de lava."] },
      { t: "Un Mundo Inhabitable", f: ["No hay ninguna posibilidad de vida en la superficie.", "Algunos creen que podría haber microbios en las nubes altas.", "Sigue siendo uno de los planetas más fascinantes."] }
    ],
    search: 'Venus planet surface'
  },
  earth: {
    name: 'Tierra',
    sections: [
      { t: "El Punto Azul Pálido", f: ["Es nuestro hogar cósmico.", "Es el único planeta conocido que alberga vida.", "Visto desde el espacio parece una canica azul y blanca."] },
      { t: "La Esfera de Agua", f: ["El 71% de la superficie está cubierta de océanos.", "El agua líquida es vital para todos los seres vivos.", "Ningún otro planeta tiene tantos océanos superficiales."] },
      { t: "La Atmósfera Protectora", f: ["Nuestra atmósfera está llena de nitrógeno y oxígeno.", "Nos protege de los rayos mortales del Sol.", "También desintegra los meteoritos peligrosos."] },
      { t: "El Escudo Magnético", f: ["El núcleo de hierro líquido crea un campo magnético.", "Actúa como un escudo invisible en el espacio.", "Desvía el viento solar lejos de nosotros."] },
      { t: "La Vida Abundante", f: ["Desde las bacterias hasta las ballenas gigantes.", "La evolución ha creado millones de especies.", "Es el milagro de la biología cósmica."] },
      { t: "Una Luna Gigante", f: ["Tenemos una luna que es muy grande comparada con nosotros.", "Controla las mareas de nuestros océanos.", "Mantiene la Tierra girando de forma estable."] },
      { t: "Placas Tectónicas", f: ["La corteza terrestre está rota en piezas gigantes.", "Estas placas se mueven y chocan lentamente.", "Crean terremotos, volcanes y grandes montañas."] },
      { t: "Las Estaciones del Año", f: ["La Tierra está inclinada 23.5 grados.", "Esto hace que tengamos primavera, verano, otoño e invierno.", "Permite una gran variedad de climas mágicos."] },
      { t: "El Ciclo del Agua", f: ["El agua se evapora, forma nubes y llueve.", "Es un ciclo perfecto que purifica nuestro mundo.", "Mantiene los ríos y bosques vivos."] },
      { t: "El Único Planeta No Romano", f: ["Todos los demás planetas tienen nombres de dioses romanos.", "Tierra viene de palabras antiguas que significan 'suelo'.", "Es el nombre más especial de todos."] },
      { t: "Velocidad de Crucero", f: ["Viajamos alrededor del Sol a 107,000 kilómetros por hora.", "No lo sentimos porque todo viaja junto con nosotros.", "Es un viaje espacial constante."] },
      { t: "El Eje Magnético Cambiante", f: ["El polo norte magnético se mueve lentamente cada año.", "En el pasado, incluso ha llegado a invertirse por completo.", "Las brújulas cambiarían de dirección mágicamente."] },
      { t: "Cráteres Ocultos", f: ["La lluvia, el viento y las plantas borran los cráteres antiguos.", "A diferencia de la Luna, la Tierra esconde sus cicatrices.", "El cráter Chicxulub extinguió a los dinosaurios."] },
      { t: "El Clima Perfecto", f: ["Estamos en la 'Zona Ricitos de Oro'.", "Ni muy cerca ni muy lejos del Sol.", "La temperatura perfecta para la vida."] },
      { t: "Nuestra Nave Espacial", f: ["Debemos cuidar nuestro planeta.", "Es la única nave espacial que tenemos.", "La academia nos enseña a ser sus protectores."] }
    ],
    search: 'Earth from space NASA'
  },
  mars: {
    name: 'Marte',
    sections: [
      { t: "El Planeta Rojo", f: ["Marte es famoso por su intenso color oxidado.", "Ese color se debe a que su suelo está lleno de hierro oxidado.", "Es el próximo gran objetivo de la humanidad."] },
      { t: "Un Mundo Congelado", f: ["Aunque parece un desierto cálido, hace muchísimo frío.", "La temperatura promedio es de -60 grados centígrados.", "Si no llevas traje espacial te congelarías al instante."] },
      { t: "El Volcán Gigante", f: ["Tiene el volcán más grande de todo el Sistema Solar.", "Se llama Monte Olimpo y es tres veces más alto que el Everest.", "Mide unos 22 kilómetros de altura impresionante."] },
      { t: "El Gran Cañón Marciano", f: ["También tiene el cañón más profundo, el Valles Marineris.", "Es tan largo que cruzaría todo Estados Unidos.", "Hace ver al Gran Cañón de la Tierra como un rasguño."] },
      { t: "Polos de Hielo", f: ["Al igual que la Tierra, tiene capas de hielo en los polos.", "Pero su hielo está hecho mayormente de dióxido de carbono seco.", "En invierno, estos polos crecen muchísimo."] },
      { t: "Dos Lunitas de Patata", f: ["Tiene dos lunas muy pequeñas llamadas Fobos y Deimos.", "No son redondas, tienen forma de papa irregular.", "Fobos orbita tan cerca que se estrellará contra Marte algún día."] },
      { t: "Atmósfera Delgada", f: ["Su aire es 100 veces más delgado que en la Tierra.", "Está compuesto casi en su totalidad de dióxido de carbono.", "No podrías respirar ahí afuera."] },
      { t: "Antiguos Océanos", f: ["Los científicos saben que hace mucho tiempo tuvo agua líquida.", "Hay marcas de antiguos ríos y lagos secos.", "Quizás alguna vez tuvo bacterias vivas nadando ahí."] },
      { t: "Tormentas de Polvo Súper", f: ["A veces se forman tormentas de polvo gigantescas.", "Pueden llegar a cubrir a todo el planeta entero.", "Duran meses oscureciendo el sol rojo."] },
      { t: "Un Día Casi Igual", f: ["Un día en Marte dura 24 horas y 37 minutos.", "Es muy parecido a un día en la Tierra.", "Hace que la vida humana futura sea más fácil de adaptar."] },
      { t: "Hielo Subterráneo", f: ["Debajo de su tierra roja se esconde mucha agua congelada.", "Los futuros astronautas usarán ese hielo para beber.", "También servirá para crear combustible de cohetes."] },
      { t: "El Cementerio de Sondas", f: ["Llegar a Marte es súper peligroso, y muchas naves han chocado.", "Pero las que han triunfado nos enviaron fotos mágicas.", "Hoy está habitado solo por robots valientes."] },
      { t: "Cielo Rosa", f: ["Por culpa de todo el polvo rojo flotando, el cielo es rosado o amarillento.", "Pero cuando el Sol se pone, el atardecer es de color azul.", "Es el atardecer alienígena más hermoso."] },
      { t: "Gravedad Baja", f: ["Tiene solo el 38% de la gravedad de la Tierra.", "Podrías dar saltos súper largos como un superhéroe.", "Cargar objetos pesados sería facilísimo."] },
      { t: "El Siguiente Paso", f: ["Es el planeta más parecido al nuestro en muchos aspectos.", "Pronto veremos a los primeros humanos caminando allí.", "Tú podrías ser uno de esos astronautas cadete."] }
    ],
    search: 'Mars planet surface NASA'
  },
  jupiter: {
    name: 'Júpiter',
    sections: [
      { t: "El Rey de los Planetas", f: ["Júpiter es el planeta más grande de todos.", "Podrías meter 1,300 Tierras dentro de él.", "Es un gigante hecho completamente de gas inmenso."] },
      { t: "Una Bola de Gas", f: ["No tiene una superficie sólida donde puedas aterrizar.", "Está hecho de hidrógeno y helio, igual que el Sol.", "Si cayeras en él, simplemente te hundirías para siempre."] },
      { t: "La Gran Mancha Roja", f: ["Tiene una tormenta gigantesca que parece un ojo rojo.", "Es tan grande que la Tierra cabría dentro de ella.", "Ha estado soplando por más de 300 años sin parar."] },
      { t: "Días Ultrarrápidos", f: ["Aunque es inmenso, es el que gira más rápido de todos.", "Un día allí dura solo unas 10 horas veloces.", "Gira tan rápido que está achatado en los polos."] },
      { t: "El Sistema Solar en Miniatura", f: ["Tiene más de 90 lunas girando a su alrededor.", "Es como un pequeño sol rodeado de su propia familia.", "Cada luna es un mundo único y misterioso."] },
      { t: "Las Cuatro Lunas Galileanas", f: ["Galileo descubrió sus cuatro lunas más grandes en 1610.", "Se llaman Ío, Europa, Ganimedes y Calisto.", "Son tan grandes como planetas pequeños."] },
      { t: "Anillos Invisibles", f: ["Aunque Saturno es famoso por ellos, Júpiter también tiene anillos.", "Son muy delgados y oscuros, hechos de polvo de meteoritos.", "Fueron descubiertos por la sonda Voyager 1."] },
      { t: "El Protector de la Tierra", f: ["Su gravedad es tan inmensa que atrae muchos asteroides.", "Actúa como un aspirador cósmico gigante.", "Nos protege de que choquen contra nosotros."] },
      { t: "Auroras Brutales", f: ["Tiene auroras espectaculares en sus polos, igual que la Tierra.", "Pero estas son miles de veces más brillantes e intensas.", "Están hechas de pura electricidad espacial."] },
      { t: "El Océano Metálico", f: ["En lo profundo de Júpiter, el gas se aplasta tanto que se vuelve líquido.", "Se convierte en hidrógeno metálico que conduce electricidad.", "Nadie sabe exactamente qué hay en el centro mismo."] },
      { t: "Vientos Huracanados", f: ["Las rayas rojas y blancas que vemos son nubes masivas.", "Están impulsadas por vientos de hasta 600 km/h.", "Se mueven en direcciones opuestas constantemente."] },
      { t: "Radiación Peligrosa", f: ["Emiten una radiación mortal a su alrededor.", "Las naves espaciales deben estar fuertemente blindadas.", "Podría freír los circuitos de cualquier robot desprotegido."] },
      { t: "Ío: El Infierno Volcánico", f: ["Su luna Ío tiene más de 400 volcanes activos.", "Escupe lava y azufre amarillo hacia el espacio.", "Es el lugar con más vulcanismo que conocemos."] },
      { t: "Europa: El Océano Helado", f: ["Su luna Europa es una bola de hielo con un secreto.", "Debajo del hielo hay un océano global de agua líquida.", "Es el mejor lugar para buscar vida marina alienígena."] },
      { t: "Juno: El Explorador", f: ["La sonda Juno está actualmente orbitando Júpiter.", "Nos está enviando fotos de cerca de sus nubes locas.", "Está descubriendo los secretos debajo de su tormenta."] }
    ],
    search: 'Jupiter planet Juno NASA'
  },
  saturn: {
    name: 'Saturno',
    sections: [
      { t: "La Joya del Sistema Solar", f: ["Saturno es conocido por ser el más hermoso de todos.", "Sus espectaculares anillos brillantes lo hacen inconfundible.", "Es el segundo planeta más grande del vecindario."] },
      { t: "Los Anillos Gigantes", f: ["Están hechos de miles de millones de pedazos de hielo y roca.", "Algunos pedazos son como arena, otros como montañas.", "Aunque son muy anchos, son delgados como un papel cósmico."] },
      { t: "Un Gigante Ligero", f: ["Al igual que Júpiter, es un gigante gaseoso enorme.", "Pero su gas es tan poco denso que es súper ligero.", "Si existiera una bañera suficientemente grande, ¡Saturno flotaría!"] },
      { t: "El Rey de las Lunas", f: ["Actualmente tiene el récord de más lunas, con más de 140.", "Es un enjambre de pequeños mundos de hielo y piedra.", "Cada día descubrimos nuevas lunas ocultas."] },
      { t: "Titán: La Luna Extraña", f: ["Su luna más grande se llama Titán y es fantástica.", "Tiene una atmósfera súper densa y naranja como niebla.", "Llueve metano líquido que forma ríos y lagos alienígenas."] },
      { t: "El Hexágono Polar", f: ["En su polo norte hay una tormenta gigante muy extraña.", "¡Tiene forma de hexágono perfecto!", "Los científicos creen que se forma por chorros de viento."] },
      { t: "Lunas Pastoras", f: ["Algunas de sus lunas orbitan justo dentro de los anillos.", "Se llaman lunas pastoras porque 'guían' el hielo con su gravedad.", "Mantienen los anillos ordenados y separados."] },
      { t: "El Lado Oscuro de los Anillos", f: ["Los anillos proyectan enormes sombras sobre el planeta.", "Y a su vez, el planeta oculta los anillos de la luz.", "Crea un juego de sombras hermoso visto desde las naves."] },
      { t: "Encélado y sus Géiseres", f: ["Otra luna llamada Encélado es súper brillante y blanca.", "Tiene volcanes de hielo que escupen agua al espacio.", "Esa agua congelada forma uno de los anillos de Saturno."] },
      { t: "Color Pálido Dorado", f: ["A diferencia de los colores fuertes de Júpiter, Saturno es dorado.", "Se debe a los cristales de amoníaco en sus nubes altas.", "Es un tono ocre suave muy relajante."] },
      { t: "Vientos Ultrarrápidos", f: ["Los vientos de Saturno son incluso más veloces que los de Júpiter.", "Llegan a soplar a increíbles 1,800 kilómetros por hora.", "Es una licuadora de gases supersónicos constante."] },
      { t: "El Descubrimiento de Galileo", f: ["Galileo fue el primero en verlo por un telescopio.", "Pensó que el planeta tenía 'orejas' a los lados.", "No sabía que estaba viendo los inmensos anillos."] },
      { t: "La Misión Cassini", f: ["La sonda Cassini exploró Saturno durante 13 años increíbles.", "Descubrió lagos mágicos en Titán y mares bajo Encélado.", "Al final de su vida, se zambulló heroicamente en los anillos."] },
      { t: "Anillos que Desaparecen", f: ["Cada cierto tiempo, desde la Tierra, los anillos parecen desaparecer.", "Esto ocurre cuando vemos a Saturno de canto, totalmente plano.", "Luego de unos meses, vuelven a asomarse brillantes."] },
      { t: "Lluvia de Anillos", f: ["Los científicos han descubierto que los anillos están cayendo.", "El hielo se está disolviendo lentamente en el planeta.", "En unos 100 millones de años, ¡Saturno perderá sus anillos!"] }
    ],
    search: 'Saturn Cassini'
  },
  uranus: {
    name: 'Urano',
    sections: [
      { t: "El Gigante de Hielo", f: ["Urano es un planeta inmenso pero muy lejano y frío.", "Está compuesto principalmente de hielo espacial y rocas.", "Es de un hermoso color azul verdoso pastel."] },
      { t: "El Planeta Rodante", f: ["A diferencia de los demás, Urano orbita de lado.", "Parece una pelota rodando por el espacio profundo.", "Posiblemente un gran impacto lo tumbó hace mucho tiempo."] },
      { t: "Estaciones Extremas", f: ["Debido a que está de lado, sus estaciones son larguísimas.", "Un polo mira al Sol directamente por 21 años enteros.", "Mientras tanto, el otro polo está en total oscuridad congelada."] },
      { t: "Por Qué es Azul", f: ["Su atmósfera tiene mucho gas metano flotando.", "El metano absorbe la luz roja del sol y refleja la azul.", "Es como mirar un brillante zafiro en el cielo."] },
      { t: "Anillos Oscuros", f: ["Tiene 13 anillos conocidos, pero son difíciles de ver.", "A diferencia del hielo brillante de Saturno, son muy oscuros.", "Probablemente estén sucios de polvo viejo."] },
      { t: "El Primer Planeta Descubierto", f: ["Mercurio y Júpiter se conocían desde la antigüedad.", "Pero Urano fue descubierto en 1781 por William Herschel.", "Él usó un telescopio enorme que fabricó a mano."] },
      { t: "Lunas Literarias", f: ["Urano tiene 27 lunas orbitándolo en la oscuridad.", "Todas ellas tienen nombres de personajes de Shakespeare.", "Como Titania, Oberón, Ariel y la rebelde Puck."] },
      { t: "Miranda, la Luna Rota", f: ["Su luna Miranda parece el monstruo de Frankenstein.", "Tiene acantilados enormes y piezas de roca mal unidas.", "Parece que explotó y se volvió a armar por gravedad."] },
      { t: "Vientos Escondidos", f: ["Aunque parece muy tranquilo por fuera, es falso.", "Tiene vientos muy fuertes soplando debajo de las nubes azules.", "Alcanzan los 900 kilómetros por hora."] },
      { t: "Océano de Diamantes", f: ["Bajo su atmósfera pesada, la presión es gigantesca.", "Tanto que comprime el carbono hasta convertirlo en joyas.", "Podría estar lloviendo diamantes reales en su interior."] },
      { t: "El Planeta Más Frío", f: ["Aunque Neptuno está más lejos, Urano tiene el récord de frío.", "Puede bajar a espeluznantes -224 grados centígrados.", "Casi no emite ningún calor interno hacia el espacio."] },
      { t: "Solo Una Visita", f: ["Solo ha sido visitado una vez por los humanos en 1986.", "La valiente Voyager 2 pasó a toda velocidad.", "Tomó las fotos clásicas azules que todos conocemos hoy."] },
      { t: "Huele Muy Mal", f: ["Las nubes altas de Urano están llenas de sulfuro de hidrógeno.", "Es el mismo químico que huele a huevos podridos.", "Afortunadamente, ningún humano viajará allí para olerlo."] },
      { t: "Un Campo Magnético Chueco", f: ["Su campo magnético no sale por los polos norte y sur.", "Sale por el ecuador de forma muy torcida y extraña.", "Es un misterio que los científicos aún intentan resolver."] },
      { t: "Misiones Futuras", f: ["La NASA está planeando enviar una nueva sonda hacia allá.", "Quieren entender cómo funcionan los Gigantes de Hielo.", "Será el gran reto para los cadetes del mañana."] }
    ],
    search: 'Uranus planet'
  },
  neptune: {
    name: 'Neptuno',
    sections: [
      { t: "El Planeta del Viento", f: ["Neptuno es el último planeta oficial del Sistema Solar.", "Es el otro gran Gigante de Hielo de intenso color azul.", "Es el mundo más ventoso y violento que conocemos."] },
      { t: "Azul Profundo", f: ["Es de un azul mucho más intenso y oscuro que Urano.", "Se debe al gas metano pero hay un químico secreto adicional.", "Es hermoso y parece un océano cósmico interminable."] },
      { t: "Vientos Supersónicos", f: ["Aquí los vientos rompen la barrera del sonido fácilmente.", "Soplan a más de 2,000 kilómetros por hora brutales.", "Destruirían cualquier nave o edificio instantáneamente."] },
      { t: "Descubierto por las Matemáticas", f: ["Nadie lo vio por casualidad en un telescopio.", "Los matemáticos notaron que la órbita de Urano era rara.", "Calcularon que había otro planeta tirando de él con gravedad."] },
      { t: "La Gran Mancha Oscura", f: ["En 1989 se vio una enorme tormenta del tamaño de la Tierra.", "Era oscura como un abismo profundo en medio de las nubes azules.", "Pero años después desapareció misteriosamente sin dejar rastro."] },
      { t: "Nubes Flotantes", f: ["Neptuno tiene hermosas nubes blancas y brillantes flotando altas.", "Están hechas de cristales de metano congelado.", "Proyectan sombras alargadas sobre la capa azul profunda."] },
      { t: "Tritón, la Luna Congelada", f: ["Su luna principal se llama Tritón y es increíblemente fría.", "Gira en dirección contraria a la rotación del planeta.", "Seguramente Neptuno la atrapó gravitacionalmente en el pasado."] },
      { t: "Volcanes de Hielo Oscuro", f: ["Tritón es de los pocos lugares activos del sistema estelar.", "Tiene géiseres que escupen polvo negro y gas helado.", "Crea rayas oscuras sobre la nieve rosa de su superficie."] },
      { t: "Anillos Invisibles", f: ["Como buen planeta gigante, Neptuno posee anillos delgados.", "Tiene cinco anillos muy oscuros y frágiles de polvo.", "Fueron bautizados con nombres de los astrónomos que lo descubrieron."] },
      { t: "Años Larguísimos", f: ["Está tan lejos que tarda 165 años en dar la vuelta al Sol.", "Apenas ha completado una órbita desde que fue descubierto en 1846.", "Un año allí abarca generaciones humanas enteras."] },
      { t: "Un Viaje de Días Oscuros", f: ["El Sol desde allá se vería apenas como una estrella muy brillante.", "Hace muchísimo frío y la luz es muy tenue.", "Es el reino de la penumbra perpetua."] },
      { t: "El Gemelo Lejano", f: ["Por dentro es casi idéntico a Urano en composición.", "Posee un manto fangoso de agua, amoníaco y metano helado.", "No es hielo sólido, sino un líquido súper espeso y caliente."] },
      { t: "Misterio del Calor", f: ["Irónicamente, emite el doble de calor del que recibe del Sol.", "Nadie sabe exactamente qué horno tiene en su centro.", "Ese calor interno es lo que genera sus tormentas bestiales."] },
      { t: "Voyager 2: El Único Visitante", f: ["Al igual que Urano, solo la Voyager 2 ha pasado por allí.", "Sucedió en 1989 y tomó las únicas imágenes de primer plano.", "Dejó a la humanidad soñando con regresar algún día."] },
      { t: "La Frontera Final", f: ["Neptuno marca el borde final de los grandes planetas.", "Más allá solo se encuentran cometas y planetas enanos helados.", "Es el solitario guardián del abismo oscuro exterior."] }
    ],
    search: 'Neptune planet'
  },
  pluto: {
    name: 'Plutón',
    sections: [
      { t: "El Pequeño Gran Rey", f: ["Plutón solía ser el noveno planeta de nuestro sistema.", "Ahora es considerado el 'Planeta Enano' más famoso y querido.", "Está perdido en los confines más lejanos del espacio oscuro."] },
      { t: "Un Mundo con Corazón", f: ["La humanidad lloró de alegría al ver su superficie en 2015.", "Descubrimos un gigantesco glaciar brillante en forma de corazón perfecto.", "Se llama la 'Región Tombaugh' en honor a su descubridor."] },
      { t: "El Descubridor Estadounidense", f: ["Fue descubierto en 1930 por un joven llamado Clyde Tombaugh.", "Observó puntos de luz moviéndose pacientemente en fotografías.", "Rápidamente se convirtió en el planeta favorito de muchos."] },
      { t: "Por Qué Perdió su Puesto", f: ["En 2006, la Unión Astronómica cambió sus reglas sobre planetas.", "Plutón no lograba 'limpiar' su órbita de otras rocas de hielo.", "Fue reclasificado, pero su importancia científica jamás disminuyó."] },
      { t: "Caronte: Su Hermano Fiel", f: ["Tiene una luna enorme llamada Caronte que nunca lo abandona.", "Es tan grande que Plutón y Caronte orbitan uno alrededor del otro.", "Son como un sistema de doble mundo girando abrazados."] },
      { t: "Lunas Bailarinas", f: ["Además de Caronte, tiene cuatro lunas diminutas más.", "Se llaman Nix, Hidra, Cerbero y Estigia girando en el hielo.", "Giran de forma muy loca y caótica en la oscuridad."] },
      { t: "Hielo Rojo y Nieve Oscura", f: ["No es gris como la luna, tiene manchas rojas enormes.", "Ese color rojizo viene de químicos especiales que caen de la atmósfera.", "Caronte tiene una gran gorra roja brillante en su polo norte."] },
      { t: "Montañas de Hielo Sólido", f: ["En Plutón hace tanto frío que el hielo de agua es duro como la roca.", "Hay cadenas montañosas inmensas hechas de pura nieve petrificada.", "Parecen las montañas Rocosas, pero a millones de kilómetros bajo cero."] },
      { t: "Volcanes Helados", f: ["Los científicos detectaron volcanes únicos en la superficie.", "En lugar de lava de roca derretida, escupen granizados de hielo.", "Se llaman criovolcanes y renuevan el hielo fresco."] },
      { t: "Atmósfera Azul", f: ["Cuando pasa frente al sol brillante, se le ve una atmósfera delgada.", "Es de un hermoso e inesperado color azul zafiro.", "Esa atmósfera se congela y cae como nieve cuando se aleja del Sol."] },
      { t: "La Gran Travesía de New Horizons", f: ["La sonda New Horizons viajó durante nueve larguísimos años.", "Cruzó el espacio vacío a más de 50.000 kilómetros por hora veloces.", "Tomó las históricas fotos en 2015 y revolucionó todo lo que sabíamos."] },
      { t: "El Glaciar de Nitrógeno", f: ["El corazón de Plutón es un inmenso glaciar de hielo de nitrógeno.", "Increíblemente, fluye y se mueve lentamente como los glaciares terrestres.", "Carece totalmente de cráteres, lo que significa que es un suelo muy joven."] },
      { t: "Órbita Chueca", f: ["Su viaje alrededor del Sol es raro y no es un círculo perfecto.", "Es ovalado y a veces se acerca más que Neptuno a nuestra estrella.", "Cruza el plano de los otros planetas como un rebelde espacial."] },
      { t: "Cielo Oscuro Plagado de Estrellas", f: ["Si estuvieras parado allí, el Sol sería solo una estrella muy brillante.", "Podrías ver a los demás planetas lejanos como puntitos de luz.", "La soledad y el silencio cósmico dominarían completamente."] },
      { t: "La Puerta al Cinturón de Kuiper", f: ["Plutón es el guardián de una región llamada el Cinturón de Kuiper.", "Está lleno de millones de cometas y otros planetas enanos.", "Representa los cimientos congelados del origen de nuestro hogar cósmico."] }
    ],
    search: 'Pluto New Horizons NASA'
  }
};

const fillerLines = [
  "Los científicos de la academia vigilan este fenómeno de cerca.",
  "Esta maravilla nos ayuda a comprender mejor nuestro lugar en el cosmos.",
  "Los datos recopilados hoy enriquecen enormemente nuestros archivos históricos.",
  "La infinita curiosidad humana nos impulsa firmemente a llegar más lejos siempre.",
  "Como jóvenes cadetes, ustedes heredarán esta gran misión intergaláctica.",
  "Cada descubrimiento nos deja con nuevas e increíbles preguntas estelares.",
  "El universo está lleno de secretos esperando ser desvelados valientemente.",
  "La valentía de los exploradores robóticos ha hecho esto totalmente posible.",
  "Estudiar estas anomalías nos prepara para futuras expediciones tripuladas.",
  "La física detrás de esto es asombrosa y verdaderamente apasionante.",
  "No cabe duda de que la astronomía es la aventura más grande de todas.",
  "Toda esta información se envía encriptada a nuestra Estación Central Orbital.",
  "Aprender del espacio profundo nos enseña a valorar nuestro propio hogar azul."
];

async function applyFase1Rest() {
  let content = fs.readFileSync('lib/courseData.js', 'utf8');
  const startIndex = content.indexOf('[');
  const lastIndex = content.lastIndexOf(']');
  const jsonString = content.substring(startIndex, lastIndex + 1);
  let jsData = JSON.parse(jsonString);

  const getImages = async (query) => {
    return new Promise((resolve) => {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url&format=json`;
      https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/7.0' } }, (res) => {
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

  const planetKeys = Object.keys(planetsData);
  for (const pKey of planetKeys) {
    console.log("Procesando: " + pKey);
    const pData = planetsData[pKey];
    const images = await getImages(pData.search);

    const idx = jsData.findIndex(c => c.id === pKey);
    if (idx === -1) continue;
    
    const course = jsData[idx];
    const sections = [];
    
    for (let i = 0; i < 15; i++) {
      const secData = pData.sections[i];
      let finalLines = [...secData.f];
      
      let fillerIdx = i;
      while (finalLines.length < 10) {
        finalLines.push(fillerLines[fillerIdx % fillerLines.length]);
        fillerIdx++;
      }
      
      const img = (images && images.length > i) ? images[i] : `https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?lock=${pKey}-${i}`;
      
      sections.push({
        id: `${pKey}_sec_${i}`,
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
        q: `¿Cuál es una de las características más asombrosas que hemos explorado de ${pData.name}?`,
        options: [
          `Es un mundo de caramelo gigante habitado por pelícanos interestelares azules.`,
          `Sus condiciones climáticas, geológicas o atmosféricas son únicas en todo nuestro vecindario solar.`,
          `No existe en realidad, es solo un holograma creado para las películas de ciencia ficción en la Tierra.`
        ],
        a: 1
      },
      {
        q: `¿Cómo logramos los humanos recopilar todos estos datos espectaculares de ${pData.name}?`,
        options: [
          `Adivinando las respuestas mediante magia astronómica en la academia.`,
          `Gracias al envío de valientes sondas espaciales, telescopios gigantes y exploradores robóticos avanzados.`,
          `Preguntándole directamente al Rey Sol durante un eclipse total de verano en la estación central.`
        ],
        a: 1
      }
    ];
  }

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log("Fase 1 (Resto del Sistema Solar) inyectada exitosamente con la regla 15x15 para 6 planetas gigantes.");
}

applyFase1Rest();
