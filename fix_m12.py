import re
import os

filepath = r"c:\Users\raesc\Desktop\Antigravity Projects\space-camp-academy\components\infographics\InteractiveInfographic_MayaM12.js"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_block(pattern, replacement):
    global content
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content != content:
        print("Replaced!")
    else:
        print("Not replaced!")
    content = new_content

replacements = [
    # copan-ciudad
    (
        r"'Imagina una ciudad inmensa escondida en medio de una espesa selva tropical[^']*Cada rincón cuenta una historia\.'",
        "'Imagina una gran ciudad escondida en la selva. Así es Copán, ubicada en el actual país de Honduras. Esta ciudad se alza en el valle del Río Copán. Los expertos la llaman la \"Atenas del Mundo Maya\". Copán es famosa por sus esculturas de piedra detalladas. Cada rincón cuenta una historia.'"
    ),
    (
        r"'El sitio fue declarado Patrimonio de la Humanidad por la UNESCO[^']*si entendían los símbolos sagrados\.'",
        "'El sitio fue declarado Patrimonio de la Humanidad por la UNESCO. Representa uno de los logros científicos de la humanidad antigua. Piensa en Copán como una universidad y galería de arte. Aquí, los reyes eran guerreros, intelectuales y astrónomos. La ciudad tenía plazas abiertas y templos pintados de colores brillantes.'"
    ),
    (
        r"'La ubicación de Copán no fue un accidente[^']*Era una verdadera metrópolis vibrante\.'",
        "'La ubicación de Copán no fue un accidente. El valle ofrecía tierras ricas para el cultivo del maíz, frijoles y calabazas. Tenían un río constante que aseguraba agua todo el año. Estaban cerca de rutas comerciales de obsidiana y jade. Esto permitió que sus gobernantes contrataran a los mejores artistas y arquitectos.'"
    ),
    (
        r"'Para entender la grandeza de Copán[^']*humanidad asombrosa\.'",
        "'Si Tikal era como la Nueva York del mundo antiguo por sus pirámides, Copán era como París, la capital del arte y el conocimiento. Sus escultores lograron dar volumen a la piedra. Crearon retratos tridimensionales de sus reyes que asombran en la actualidad.'"
    ),
    (
        r"'Pero lo que hace especial a Copán[^']*equilibrio del universo entero\.'",
        "'Lo que hace especial a Copán es su conexión con las estrellas. Toda la ciudad fue diseñada como un espejo del cielo. Sus plazas y monumentos estaban alineados con los movimientos del sol, la luna, Venus y las constelaciones. La astronomía era la herramienta principal para gobernar y decidir cuándo plantar las cosechas.'"
    ),
    (
        r"'Copán fue redescubierta de manera oficial[^']*¡Una ganga histórica increíble!'",
        "'Copán fue redescubierta en 1839 por John Lloyd Stephens y Frederick Catherwood. Stephens compró la ciudad por cincuenta dólares a un granjero local que cultivaba tabaco.'"
    ),
    (
        r"'Los escultores de Copán trabajaban una piedra local[^']*sobrevivieran mil años en la selva\.'",
        "'Los escultores de Copán trabajaban una piedra llamada toba volcánica. Al extraerse, es suave y fácil de tallar. Al exponerse al aire, se endurece, permitiendo que sus obras sobrevivan en la selva.'"
    ),
    (
        r"'A pesar de no tener herramientas de metal[^']*posición del sol\.'",
        "'A pesar de no tener herramientas de metal, los artistas de Copán crearon esculturas en \"alto relieve\". Las figuras resaltan de la piedra base y crean efectos de luz según la posición del sol.'"
    ),

    # estelas-astronomicas
    (
        r"'Las estelas son, sin duda, la firma artística más famosa de Copán[^']*dinastía gobernante\.'",
        "'Las estelas son la firma artística de Copán. Son bloques de piedra de más de cuatro metros de altura. Estas esculturas son retratos de los reyes, cubiertos con símbolos, dioses y registros astronómicos. En Copán hay más de 14 estelas que cuentan la historia del cosmos y la dinastía.'"
    ),
    (
        r"'Piensa en una estela como si fuera la portada[^']*solsticios y equinoccios\.'",
        "'Piensa en una estela como la portada de una revista tallada en roca. Anuncia el poder del rey y su conexión con el universo. El rey Waxaklajuun Ubaah Kawiil ordenó colocar estas estelas en la Gran Plaza siguiendo patrones geométricos. Se alinean con el sol durante los solsticios y equinoccios.'"
    ),
    (
        r"'El nivel de detalle es tan extraordinario[^']*error de fracciones de día\.'",
        "'El nivel de detalle permite ver las plumas en los tocados y los nudos de los cinturones. En los costados y la parte trasera, los mayas tallaron textos jeroglíficos. Funcionan como calendarios y calculadoras astronómicas. Registran eclipses, movimientos de Venus y ciclos lunares con precisión.'"
    ),
    (
        r"'Para los mayas, el rey no era solo[^']*universo seguía funcionando\.'",
        "'Para los mayas, el rey mantenía el orden del universo. En las estelas, sostenían barras ceremoniales que simbolizaban el cielo. Las estelas funcionaban como antenas que conectaban la energía planetaria con la tierra. Cuando la luz iluminaba una estela, probaba que el universo funcionaba bien.'"
    ),
    (
        r"'Científicamente, estas estelas son monumentos[^']*astrónomos de hoy en día\.'",
        "'Estas estelas son monumentos matemáticos. Los mayas usaban un sistema vigesimal y conocían el cero. Usando puntos y barras, registraban fechas millones de años en el pasado o futuro. Esto demuestra su comprensión del \"tiempo profundo\".'"
    ),
    (
        r"'Originalmente, estas estelas no eran[^']*¡La plaza debía verse espectacular!'",
        "'Originalmente, estas estelas estaban pintadas con colores vibrantes. El color principal era el rojo de cinabrio, que representaba la vida y el sol. También usaban azul maya, verde, amarillo y negro.'"
    ),
    (
        r"'Debajo de muchas estelas, los arqueólogos[^']*inaugurado\.'",
        "'Bajo muchas estelas se encontraron \"escondites\" o cajas de piedra selladas. Contienen joyas de jade, conchas y vasijas. Estas ofrendas se plantaban para dar poder al monumento al inaugurarse.'"
    ),
    (
        r"'La Estela C de Copán es fascinante[^']*movimiento diario del sol\.'",
        "'La Estela C tiene un retrato del rey Waxaklajuun Ubaah Kawiil en ambos lados. Un lado muestra al rey joven mirando al este. El otro lado lo muestra anciano mirando al oeste, como metáfora del movimiento del sol.'"
    ),

    # congreso-astronomico
    (
        r"'Una de las historias más increíbles y científicas[^']*misterio del universo\.'",
        "'En el año 763 d.C., Copán fue sede de un congreso científico. Astrónomos, matemáticos y sacerdotes mayas se reunieron para debatir descubrimientos astronómicos. Fue similar a una convención científica para resolver problemas del calendario.'"
    ),
    (
        r"'El rey que organizó este monumental encuentro[^']*sol y de la luna\.'",
        "'El rey K'ak' Yipyaj Chan Kawiil organizó este encuentro. Necesitaban ajustar los calendarios porque se desincronizaron con los movimientos del sol y la luna. Era un ajuste similar a nuestro año bisiesto moderno.'"
    ),
    (
        r"\"Imagina la escena: decenas de sabios vestidos[^']*Haab' de 365 días\.\"",
        "\"Los sabios desplegaron códices llenos de cálculos matemáticos. Discutieron cómo calibrar la duración de la lunación. Su objetivo era sincronizar el calendario ceremonial de 260 días con el calendario solar de 365 días.\""
    ),
    (
        r"'El resultado de este gran congreso astronómico[^']*unos pocos segundos!'",
        "'El congreso fue un éxito científico. Calcularon la duración de las fases lunares con gran precisión. Determinaron que 149 ciclos lunares equivalían a 4,400 días. Esto da un mes lunar de 29.5302 días, muy cercano al cálculo moderno de 29.53059 días.'"
    ),
    (
        r"'Para conmemorar este gran éxito intelectual[^']*largo de las generaciones\.'",
        "'Para conmemorar este éxito, tallaron monumentos como el Altar Q y la Escalinata de los Jeroglíficos. Registraron estas fórmulas de corrección. Los mayas usaban la piedra para compartir conocimiento científico a través de las generaciones.'"
    ),
    (
        r"'Venus era el planeta más importante[^']*nuevo gobernante\.'",
        "'Venus era el planeta más importante para los mayas. Lo consideraban hermano del sol. Usaban sus ciclos para decidir cuándo ir a la guerra o coronar gobernantes.'"
    ),
    (
        r"'Los astrónomos mayas no tenían telescopios[^']*tras generación\.'",
        "'Los astrónomos mayas hacían observaciones a simple vista. Construían tubos estrechos de madera o piedra. Al mirar por estos agujeros, rastreaban movimientos estelares y registraban datos.'"
    ),
    (
        r"'El conocimiento astronómico compartido[^']*pan-maya eficiente\.'",
        "'El conocimiento astronómico de este congreso se esparció. Ciudades como Palenque o Quiriguá empezaron a usar las fórmulas matemáticas acordadas en Copán, demostrando una red científica eficiente.'"
    ),

    # altar-q
    (
        r"'De todos los monumentos de Copán, ninguno es tan famoso[^']*divino de gobernar\.'",
        "'El Altar Q es un bloque de piedra que funciona como un registro histórico. Muestra a los 16 reyes de la dinastía de Copán sentados en cojines jeroglíficos. Fue mandado a hacer por Yax Pasaj Chan Yopaat para demostrar su derecho a gobernar.'"
    ),
    (
        r"\"Alrededor de los cuatro lados de este altar[^']*legitimar el poder político\.\"",
        "\"En los lados del altar, cada rey pasa el mando a su sucesor. En la parte delantera, el fundador Yax Kuk Mo' entrega el cetro al rey 16. Aunque vivieron separados por 350 años, la imagen legitima el poder político.\""
    ),
    (
        r"\"Pero el Altar Q no es solo historia política[^']*fundar la ciudad\.\"",
        "\"El Altar Q contiene un texto jeroglífico sobre la fundación de Copán. Narra que Yax Kuk Mo' viajó a Teotihuacán en el año 426 d.C. para recibir su cetro y aprender astronomía. Tardó 153 días en llegar a Copán para fundar la ciudad.\""
    ),
    (
        r"'El altar mismo fue posicionado usando principios[^']*siglos de historia real\.'",
        "'El altar se colocó al pie de la Estructura 16. Durante el año, la sombra del templo ilumina a reyes específicos en aniversarios importantes. Funciona como un reloj solar histórico.'"
    ),
    (
        r"'Debajo del Altar Q, los arqueólogos[^']*estrellas del firmamento\.'",
        "'Debajo del altar, se descubrió una cripta con restos de 15 jaguares sacrificados. El número representaba a los 15 reyes anteriores. Era un ritual para conectar el poder de los felinos con las estrellas.'"
    ),
    (
        r"'Yax Kuk Mo', el fundador, era real[^']*como lo cuenta el Altar Q!'",
        "'Yax Kuk Mo' fue real. Los científicos encontraron su tumba bajo las pirámides en los años 90. Tenía heridas graves, demostrando que fue un guerrero. Sus isótopos dentales confirmaron que venía de otra región.'"
    ),
    (
        r"'Cada rey en el Altar Q está sentado[^']*más alto nivel\.'",
        "'Cada rey en el Altar Q se sienta sobre un glifo. Ese glifo es su propio nombre escrito en jeroglífico. Es una forma inteligente de identificar personajes sin ocupar espacio extra.'"
    ),
    (
        r"'El diseño del Altar Q, como un cuadrado perfecto[^']*modelo del universo\.'",
        "'El diseño cuadrado del Altar Q representa la visión maya del cosmos. Creían que el universo era plano con cuatro esquinas. El altar es un modelo del universo.'"
    ),

    # escalinata-jeroglificos
    (
        r"'Prepárate para conocer el libro más grande[^']*toda su historia\.'",
        "'La Escalinata de los Jeroglíficos en Copán es una biblioteca de piedra. Tiene 63 escalones con miles de símbolos tallados. Con más de 2,200 jeroglíficos, es el texto maya más largo de la historia.'"
    ),
    (
        r"'Construir esto fue una obra titánica[^']*corazón de la ciudad\.'",
        "'Iniciada por Waxaklajuun Ubaah Kawiil, fue terminada por el rey K'ak'Yipyaj Chan Kawiil en 755 d.C. Cuenta la historia, guerras y ceremonias de los reyes de Copán. Su legado quedó tallado en la ciudad.'"
    ),
    (
        r"'Pero leer la escalinata es como intentar armar[^']*leer jeroglíficos mayas\.'",
        "'Con el tiempo, las raíces de los árboles y los sismos derrumbaron la escalera. En el siglo XIX, los arqueólogos la reconstruyeron en orden aleatorio porque no sabían leer jeroglíficos.'"
    ),
    (
        r"'Hoy, los epigrafistas \(los científicos[^']*días exactos de las batallas clave\.'",
        "'Hoy, los epigrafistas usan computadoras para ordenar las piezas. Han descubierto que la escalinata registra fechas astronómicas. Muestra alineaciones de Venus y ciclos lunares en batallas clave.'"
    ),
    (
        r"'En el centro de la escalinata, cada diez o doce escalones[^']*profundas de la tierra\.'",
        "'En el centro de la escalinata hay estatuas de guerreros armados. Representan a los espíritus de reyes pasados. En la base, un altar con la deidad del inframundo recuerda el origen de su historia.'"
    ),
    (
        r"'La piedra de Copán \(la toba volcánica\) es frágil[^']*cuidada de Centroamérica\.'",
        "'La toba volcánica de Copán es frágil frente a la lluvia. Actualmente, la Escalinata está protegida por una gran carpa para evitar que las lluvias ácidas borren las letras de piedra.'"
    ),
    (
        r"'La escritura maya es un sistema logosilábico[^']*arte muy complejo!'",
        "'La escritura maya es logosilábica. Un jeroglífico puede representar una palabra completa o sílabas de sonido. Podían escribir la misma palabra de varias formas combinando sonidos e imágenes.'"
    ),
    (
        r"'El texto de la escalinata revela un evento oscuro[^']*derrota terrible\.'",
        "'El texto revela que en el año 738, el gobernante 18 Conejo fue decapitado por el rey de Quiriguá. La escalinata menciona esto de pasada y destaca las victorias posteriores como propaganda.'"
    ),

    # cancha-pelota
    (
        r"'Imagínate un estadio deportivo, pero donde el juego[^']*reinado de 18 Conejo\.'",
        "'Copán posee una de las canchas de Juego de Pelota mejor conservadas de Mesoamérica. Se encuentra en la zona principal y fue remodelada tres veces. Alcanzó su forma final bajo el reinado de 18 Conejo.'"
    ),
    (
        r"'El campo tiene la forma de una letra \"I\" mayúscula gigante[^']*romper costillas fácilmente\.'",
        "'El campo tiene forma de letra \"I\" mayúscula con un corredor central estrecho. Los jugadores golpeaban una pelota de hule con caderas, codos y rodillas. Usaban protecciones pesadas para evitar heridas graves.'"
    ),
    (
        r"'Pero este juego no era un simple deporte[^']*moviéndose a través del cielo\.'",
        "'El juego recreaba un evento astronómico y mítico. Según el Popol Vuh, héroes gemelos derrotaron a los dioses del inframundo y resucitaron como el Sol y la Luna. El rebote de la pelota representaba al sol.'"
    ),
    (
        r"'Los marcadores de esta cancha son famosísimos[^']*cielo y las fuerzas solares\.'",
        "'Los marcadores de Copán son cabezas de guacamayas, el ave solar. Estaban fijados en los muros inclinados. Cuando la pelota los golpeaba, representaba el contacto entre humanos y las fuerzas solares.'"
    ),
    (
        r"'La alineación astronómica del Juego de Pelota de Copán[^']*partido eterno\.'",
        "'La alineación astronómica del Juego de Pelota es precisa. Durante los equinoccios, la luz del sol cruza el campo y divide la luz y las sombras. Esto refleja el equilibrio cósmico.'"
    ),
    (
        r"'El hule era un milagro tecnológico mesoamericano[^']*pelota rebotar así\.'",
        "'Los mayas cosechaban savia de caucho y la mezclaban con jugo de Ipomoea alba. Esta reacción química vulcanizaba la pelota para que rebotara con fuerza.'"
    ),
    (
        r"'Debajo del piso del callejón central de la cancha[^']*juego del cielo\.'",
        "'Debajo de la cancha, los arqueólogos hallaron un escondite con un recipiente de cerámica. Contenía una ofrenda de fundación colocada antes del piso nuevo para dar fuerza al campo.'"
    ),
    (
        r"'Muchos guías turísticos cuentan el mito[^']*después de una gran guerra\.'",
        "'Los sacrificios humanos en el juego de pelota no ocurrían a diario. La mayoría de los juegos eran deportivos. Los sacrificios se reservaban para reyes capturados después de grandes guerras.'"
    ),

    # observatorio-copan
    (
        r"'A diferencia de las famosas torres circulares que construyeron[^']*casi siete kilómetros\.'",
        "'Los astrónomos de Copán convirtieron el valle en un observatorio astronómico. Instalaron la Estela 10 y la Estela 12 en colinas opuestas. Estaban separadas por siete kilómetros para funcionar como mira telescópica.'"
    ),
    (
        r"'Si un astrónomo maya se paraba junto a la Estela 12[^']*paisaje entero!'",
        "'Desde la Estela 12, se creaba una línea visual perfecta hacia la Estela 10. Cada 12 de abril, el sol se oculta justo detrás de la Estela 10. Era un marcador solar preciso.'"
    ),
    (
        r"'Esta fecha del 12 de abril no era aleatoria[^']*a punto de llegar!\"\.'",
        "'El 12 de abril marcaba el final de la época seca. Esta alineación era un reloj agrícola. El rey observaba el sol y anunciaba que era hora de sembrar maíz.'"
    ),
    (
        r"'Este es el ejemplo supremo de lo que los científicos[^']*vida misma de Copán\.'",
        "'Esto es astronomía práctica. La alineación del sol servía para la supervivencia agrícola. Si sembraban tarde o temprano, la cosecha fallaría. El sol dictaba la vida de Copán.'"
    ),
    (
        r"'El conocimiento del cielo en Copán era tan poderoso[^']*calendario perfecto\.'",
        "'El sistema de estelas formaba triángulos visuales desde los templos. Los mayas demostraron que no necesitan lentes ópticos para medir el universo. Usaron geometría, monumentos y paciencia para atrapar al sol.'"
    ),
    (
        r"'El sol vuelve a pasar por esa misma línea visual[^']*tradición milenaria\.'",
        "'El sol vuelve a pasar por esa línea el 1 de septiembre, marcando el ciclo de cosecha. Muchos agricultores de Copán siguen usando estas fechas para sus actividades.'"
    ),
    (
        r"'Los mayas no conocían la brújula magnética[^']*puntos de referencia naturales\)\.'",
        "'Los mayas usaban estacas, cuerdas y observaciones de sombras en el horizonte. No tenían brújula magnética para orientar estas estelas, confiaban en el entorno natural.'"
    ),
    (
        r"'El nivel de sofisticación del \"Observatorio de Copán\"[^']*vanguardia mundial\.'",
        "'El arqueoastrónomo Anthony Aveni cataloga a Copán como un marcador solar agrícola monumental. Demuestra que los sabios de Copán hacían ciencia de vanguardia.'"
    )
]

for pattern, replacement in replacements:
    replace_block(pattern, replacement)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"File {filepath} processed successfully.")
