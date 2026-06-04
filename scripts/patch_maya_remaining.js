/**
 * patch_maya_remaining.js — patches maya_m9 through maya_m15
 * These need 5 extra paragraphs to reach 15.
 */
const fs = require('fs');
const { patchModule, replaceTextAndQuiz, FILE } = require('./patch_helpers');
let src = fs.readFileSync(FILE, 'utf8');

const MAYA = {
  maya_m9: {
    extra: [
      "El mercado (tianguis) maya era un espacio de intercambio que iba más allá del comercio: era un lugar de encuentro social, información y diplomacia. Los mercaderes mayas (pochtecas) eran una clase especial, respetada y protegida, que viajaban largas distancias cargando mercancías de lujo: plumas de quetzal, jade, obsidiana, cacao.",
      "El cacao tenía un valor especial en la cultura maya: era el alimento de los dioses y la moneda más valiosa. Un esclavo podía comprarse por 100 granos de cacao. Los mayas preparaban el cacao como una bebida espumosa y amarga mezclada con chile y vainilla, muy diferente al chocolate dulce que conocemos hoy.",
      "Los edificios mayas se construían sin el uso de ruedas ni animales de carga: todo el trabajo lo hacían humanos. Las piedras se cortaban con herramientas de obsidiana y sílex, y se transportaban sobre rodillos de madera o arrastrándolas con cuerdas. La organización logística para mover bloques de varias toneladas era extraordinaria.",
      "Los mayas usaban un sistema de escritura completamente fonético: sus glifos representaban sílabas, no solo conceptos. Cuando los conquistadores españoles quemaron los códices mayas, destruyeron milenios de literatura, ciencia e historia. Solo sobrevivieron cuatro códices originales: el Dresden, el Madrid, el París y el Maya.",
      "El Códice de Dresden es el documento maya más antiguo que sobrevivió a la conquista. Contiene tablas astronómicas detalladas del planeta Venus, predicciones de eclipses y rituales del calendario. Su precisión astronómica asombra a los científicos modernos: el error en el ciclo de Venus es de solo 2 minutos en 500 años."
    ],
    quiz: [
      { q: "¿Qué moneda valiosa usaban los mayas en el comercio?", options: ["Oro","Plata","Granos de cacao","Obsidiana"], a: 2 },
      { q: "¿Cómo se llama el gremio de mercaderes de larga distancia en Mesoamérica?", options: ["Toltecas","Pochtecas","Olmecas","Zapotecas"], a: 1 },
      { q: "¿Cómo transportaban los mayas las pesadas piedras para sus edificios?", options: ["Con animales de carga","Con carros de ruedas","Con humanos, rodillos y cuerdas","Con balsas en ríos"], a: 2 },
      { q: "¿Cuántos códices mayas originales sobrevivieron a la conquista española?", options: ["Uno","Cuatro","Doce","Más de cien"], a: 1 },
      { q: "¿Qué contiene el Códice de Dresden?", options: ["Historia de los reyes mayas","Recetas de cocina","Tablas astronómicas detalladas de Venus y eclipses","Mapas de territorios mayas"], a: 2 }
    ]
  },
  maya_m10: {
    extra: [
      "Las pirámides mayas tenían una función que va más allá de la arquitectura monumental: eran relojes de piedra. En el equinoccio de primavera (21 de marzo), la sombra de la pirámide El Castillo en Chichén Itzá crea la ilusión de una serpiente descendiendo por las escaleras. Esto marcaba el inicio del ciclo agrícola.",
      "El juego de pelota (pok-ta-pok) fue uno de los rituales más importantes de la cultura maya. La pelota de caucho macizo pesaba unos 3 kilogramos y debía pasarse solo con las caderas, sin usar manos ni pies. Las canchas de juego, orientadas con precisión astronómica, se han encontrado en más de 1,500 sitios de Mesoamérica.",
      "Las investigaciones recientes con tecnología LiDAR (laser aéreo) han revelado que las ciudades mayas eran mucho más grandes de lo que se pensaba. Bajo la jungla guatemalteca se ocultaba una red de 60,000 estructuras mayas interconectadas por calzadas de piedra (sacbés), incluyendo pirámides aún sin excavar más altas que el Templo del Sol en Teotihuacán.",
      "Los mayas desarrollaron el primer sistema de agua potable conocido en América. En Palenque, Chiapas, construyeron canales subterráneos presurrizados que llevaban agua fresca hasta los palacios reales. El ingeniero que diseñó este sistema entendía los principios hidráulicos de la presión y el flujo de agua miles de años antes de que la ingeniería hidráulica se formalizara en Europa.",
      "La escritura maya fue descifrada principalmente en el siglo XX por investigadores como Yuri Knorosov (un lingüista soviético que descifró su naturaleza silábica en 1952) y Linda Schele (que en los años 70-80 tradujo las inscripciones dinásticas). Hoy podemos leer los textos mayas con comprensión razonablemente completa, revelando una historia rica en guerras, alianzas y drama político."
    ],
    quiz: [
      { q: "¿Qué fenómeno ocurre en la pirámide El Castillo cada equinoccio de primavera?", options: ["Un eclipse solar","Una serpiente de sombra desciende las escaleras","La luna se alinea con la cúspide","Chispas de luz iluminan el interior"], a: 1 },
      { q: "¿Cómo se llama la tecnología de laser aéreo que descubrió nuevas ciudades mayas bajo la jungla?", options: ["GPS","Sonar","LiDAR","Radar"], a: 2 },
      { q: "¿Qué civilización construyó el primer sistema de agua potable presurizada de América?", options: ["Aztecas","Olmecas","Mayas en Palenque","Incas"], a: 2 },
      { q: "¿Quién descifró la naturaleza silábica de la escritura maya en 1952?", options: ["Linda Schele","John Lloyd Stephens","Yuri Knorosov","Sylvanus Morley"], a: 2 },
      { q: "¿Qué son los sacbés mayas?", options: ["Barcos de comercio","Calzadas de piedra que conectaban ciudades","Sistemas de irrigación","Templos secundarios"], a: 1 }
    ]
  },
  maya_m11: {
    extra: [
      "Los mayas desarrollaron una medicina sofisticada basada en plantas medicinales, cirugía y conocimiento del cuerpo humano. Las plantas que usaban —como la corteza de sauce (fuente natural de aspirina), la coca (anestésico) y el tabaco (antiséptico)— eran destilaciones empíricas de siglos de observación y experimentación.",
      "La organización política de los mayas fue más compleja que un simple imperio centralizado. Era una red de ciudades-estado independientes, cada una con su propio gobernante (ajaw) que a veces se aliaba y a veces guerreaba con las demás. Esta fragmentación política era similar a la de las ciudades-estado griegas o las repúblicas italianas medievales.",
      "Las guerras mayas no tenían como objetivo principal la destrucción del enemigo, sino la captura de prisioneros nobles para sacrificar en rituales. Los guerreros de alto rango que eran capturados podían ser sacrificados en elaboradas ceremonias. Esto hacía que la guerra maya fuera muy diferente en su lógica a las guerras de conquista europeas.",
      "El arte maya alcanzó niveles de sofisticación extraordinarios. Las esculturas de estuco de Palenque, los murales de Bonampak (que muestran una batalla en detalle vívido y realista), y los vasos de cerámica pintados con escenas mitológicas muestran una tradición artística que se desarrolló durante siglos con una iconografía consistente y profundamente significativa.",
      "La declinación de las grandes ciudades mayas del Período Clásico (600-900 d.C.) fue gradual y tuvo múltiples causas: sequías prolongadas (verificadas con análisis de sedimentos de lagos), sobreexplotación agrícola, guerras entre ciudades-estado, y cambios climáticos. No fue una 'colapso misterioso' sino un proceso complejo que los arqueólogos y climatólogos siguen investigando."
    ],
    quiz: [
      { q: "¿Qué planta medicinal maya contiene el principio activo de la aspirina?", options: ["Tabaco","Corteza de sauce","Coca","Aloe vera"], a: 1 },
      { q: "¿Cómo se llama el gobernante de una ciudad-estado maya?", options: ["Tlatoani","Ajaw","Cacique","Tecuhtli"], a: 1 },
      { q: "¿Cuál era el principal objetivo de las guerras mayas?", options: ["Conquistar territorios","Capturar prisioneros nobles para rituales","Controlar rutas comerciales","Destruir ciudades rivales"], a: 1 },
      { q: "¿Dónde se encuentran los murales mayas que muestran escenas de batalla en detalle?", options: ["Chichén Itzá","Palenque","Bonampak","Tikal"], a: 2 },
      { q: "¿Qué causó la declinación de las ciudades mayas clásicas según la investigación moderna?", options: ["Una invasión extranjera","Un solo evento catastrófico","Múltiples factores: sequías, guerras, sobreexplotación","La llegada de los españoles"], a: 2 }
    ]
  },
  maya_m12: {
    extra: [
      "El sistema de escritura jeroglífica de los mayas fue el único del continente americano que representó el lenguaje hablado de manera completa. A diferencia de los quipus incas o los pictogramas aztecas, los glifos mayas podían expresar cualquier concepto del idioma, incluyendo tiempos verbales, conjunciones y expresiones abstractas.",
      "Los reyes mayas justificaban su poder a través de la astronomía y el calendario. Cuando un rey quería legitimar una conquista o una alianza matrimonial, la alineaba con fechas astronómicamente significativas. El mismo nacimiento de un nuevo rey podía ser retrasado o adelantado con métodos obstétricos para que coincidiera con una fecha propicia del calendario.",
      "El Templo de las Inscripciones de Palenque contiene una de las inscripciones mayas más largas conocidas: 620 glifos en 12 paneles que narran la historia dinástica de Palenque. Dentro de este templo, en 1952, el arqueólogo Alberto Ruz Lhuillier descubrió una cripta funeraria con el sarcófago de K'inich Janaab' Pakal, el gobernante más famoso de Palenque, quien reinó durante 68 años.",
      "Pakal el Grande, como se le conoce popularmente, subió al trono de Palenque a los 12 años y gobernó hasta los 80. Durante su reinado, Palenque alcanzó su mayor esplendor arquitectónico. Los estudios de sus restos óseos confirman que vivió hasta una edad avanzada, haciendo de él uno de los líderes más longevos del mundo antiguo.",
      "El hallazgo de la tumba de Pakal fue revolucionario en la arqueología maya porque demostró que, al igual que los faraones egipcios, los reyes mayas construían pirámides como tumbas monumentales, no solo como templos. La lápida de su sarcófago muestra una escena cosmológica elaborada que fue malinterpretada por algunos como representación de un astronauta en una nave espacial, lo cual los mayanistas rechazan completamente."
    ],
    quiz: [
      { q: "¿Cuántos glifos contiene la inscripción del Templo de las Inscripciones de Palenque?", options: ["120","250","620","1000"], a: 2 },
      { q: "¿Quién descubrió la tumba de Pakal en 1952?", options: ["Yuri Knorosov","Linda Schele","Alberto Ruz Lhuillier","Eduardo Matos"], a: 2 },
      { q: "¿Cuántos años gobernó Pakal el Grande?", options: ["20","40","68","80"], a: 2 },
      { q: "¿Qué distinguía la escritura maya de otros sistemas de América?", options: ["Era la más antigua","Usaba solo pictogramas","Era el único sistema que representaba el lenguaje hablado completo","Fue inventada por extraterrestres"], a: 2 },
      { q: "¿Qué demuestra la tumba de Pakal sobre las pirámides mayas?", options: ["Que eran solo templos religiosos","Que servían también como tumbas monumentales","Que eran observatorios astronómicos","Que eran palacios reales"], a: 1 }
    ]
  },
  maya_m13: {
    extra: [
      "El Popol Vuh (Libro del Consejo) es el texto más importante de la literatura maya quiché. Narra la creación del mundo, la historia de los Gemelos Heroicos (Hunahpú e Ixbalanqué) y el origen de la humanidad. Fue transcrito al alfabeto latino en el siglo XVI, pero refleja una tradición oral milenaria.",
      "Según el Popol Vuh, los dioses intentaron crear seres humanos tres veces antes de tener éxito. El primer intento fue con barro, pero se deshacía con el agua. El segundo, con madera, pero los seres no tenían alma. El tercero y exitoso fue con maíz (masa de maíz), de donde surgió la humanidad definitiva. Esta metáfora refleja la importancia fundamental del maíz en la cultura maya.",
      "Los mayas no solo cultivaron el maíz: lo domesticaron a partir del teosinte, una planta silvestre de aspecto muy diferente, hace unos 9,000 años. Este proceso de domesticación fue uno de los logros agrícolas más extraordinarios de la humanidad. El maíz resultante se convirtió en el cultivo más productivo del hemisferio occidental, base de la alimentación de billones de personas hoy.",
      "Las cenotes (pozos naturales de agua subterránea) eran consideradas entradas al inframundo (Xibalbá) por los mayas. Se realizaban rituales de ofrenda y, en casos de sequía extrema, sacrificios. El Cenote Sagrado de Chichén Itzá fue drenado en el siglo XX y se encontraron miles de objetos de jade, oro, cerámica y restos humanos, confirmando su papel ritual.",
      "Los mayas calcularon la edad del universo. Según su calendario de larga cuenta, el universo actual comenzó el equivalente al 11 de agosto de 3114 a.C. Si bien esta fecha no coincide con la cosmología moderna (el Big Bang fue hace 13,800 millones de años), refleja la ambición intelectual de una civilización que intentó ordenar el tiempo cósmico con los instrumentos conceptuales que tenía."
    ],
    quiz: [
      { q: "¿Cuál es el texto más importante de la literatura maya quiché?", options: ["El Códice de Dresden","El Popol Vuh","El Libro del Chilam Balam","El Códice Madrid"], a: 1 },
      { q: "¿De qué material hizo los dioses a los humanos en el tercer intento del Popol Vuh?", options: ["Barro","Madera","Maíz (masa)","Piedra"], a: 2 },
      { q: "¿Qué planta silvestre domesticaron los mayas para crear el maíz?", options: ["Trigo","Teosinte","Cañahua","Quinoa"], a: 1 },
      { q: "¿Qué representaban las cenotes para los mayas?", options: ["Fuentes de agua potable únicamente","Portales al inframundo (Xibalbá)","Campos de batalla rituales","Mercados subacuáticos"], a: 1 },
      { q: "¿Qué fecha marcó el inicio del universo actual según el calendario maya?", options: ["3000 a.C.","3114 a.C.","1000 d.C.","2012 d.C."], a: 1 }
    ]
  },
  maya_m14: {
    extra: [
      "La astronomía maya incluyó el estudio de las Pléyades (Tzab-ek, 'cola de serpiente de cascabel') como marcador del calendario agrícola. Cuando las Pléyades desaparecían del horizonte occidental al anochecer, era señal de que los días más cortos del año se aproximaban. Este conocimiento guiaba los ciclos de quema y siembra.",
      "Los mayas comprendieron el concepto del infinito numérico. Mientras los romanos no tenían símbolo para el cero y sus números no podían representar cantidades grandes con eficiencia, los mayas podían representar números de millones de años con pocas posiciones de su sistema posicional. Sus registros astronómicos cubren ciclos de miles de años.",
      "El Período Posclásico maya (900-1200 d.C.) vio el auge de Chichén Itzá como centro político-religioso del norte de Yucatán. Esta ciudad absorbió influencias de los toltecas de Tula, México central, creando un estilo artístico híbrido. La Serpiente Emplumada (Quetzalcóatl/Kukulcán) se convirtió en la deidad central de este período.",
      "La conquista española de los mayas no fue un evento único y rápido. Las guerras de conquista en Yucatán duraron casi 170 años (1527-1697). La última ciudad maya independiente, Tayasal (en el lago Petén Itzá, Guatemala), no cayó hasta 1697. Los mayas ofrecieron resistencia durante casi dos siglos, mucho más que otros pueblos mesoamericanos.",
      "Hoy, más de 7 millones de personas hablan lenguas mayas como idioma nativo, principalmente en México (Yucatán, Chiapas, Tabasco) y Guatemala. El tzeltal, el tzotzil, el yucateco, el quiché y el mam son las más habladas. Las lenguas mayas no son dialectos de una sola lengua sino una familia lingüística tan diversa como la familia romance europea."
    ],
    quiz: [
      { q: "¿Cómo llamaban los mayas a las Pléyades?", options: ["Hunab Ku","Tzab-ek (cola de serpiente de cascabel)","Kukulcán","Ixchel"], a: 1 },
      { q: "¿En qué año cayó la última ciudad maya independiente, Tayasal?", options: ["1521","1600","1697","1810"], a: 2 },
      { q: "¿Cuántas personas hablan lenguas mayas hoy como idioma nativo?", options: ["70,000","700,000","7 millones","70 millones"], a: 2 },
      { q: "¿Qué ciudad maya del Posclásico absorbió influencias de los toltecas de Tula?", options: ["Tikal","Palenque","Copán","Chichén Itzá"], a: 3 },
      { q: "¿Qué ventaja tenía el sistema numérico maya sobre el romano?", options: ["Era más decorativo","Tenía el cero y podía representar números grandes eficientemente","Era más antiguo","Tenía más símbolos"], a: 1 }
    ]
  },
  maya_m15: {
    extra: [
      "El diseño urbano maya incluía consideraciones de sanidad pública avanzadas para su época. En ciudades como Caracol (Belice) y Calakmul (Campeche), los arqueólogos han encontrado sistemas de alcantarillado, fosas comunes alejadas de las áreas habitacionales y disposición planificada de los espacios de residuos. Esto reduciría la transmisión de enfermedades.",
      "La música maya, aunque no sobrevivió en forma escrita, es recreada a través de la iconografía. En murales y vasos cerámicos aparecen conjuntos de músicos tocando trompetas de caracol, flautas de hueso, tambores de piel y sonajas de cerámica. Estos instrumentos tenían funciones rituales precisas en las ceremonias del ciclo del calendario.",
      "Los mayas practicaron modificaciones corporales que consideraban signos de belleza y estatus. El alargamiento craneal (deformación del cráneo desde la infancia mediante tablillas) producía una forma característica que imitaba la cabeza del maíz, el alimento sagrado. Los dientes eran incrustados con jade, obsidiana o pirita. Estas prácticas requerían conocimientos quirúrgicos y dentales precisos.",
      "El legado de la civilización maya en la ciencia moderna es enorme. Sus calendarios y tablas astronómicas siguen siendo estudiados. Su domesticación del maíz alimenta al mundo. Sus sistemas hidráulicos inspiran a ingenieros. Su escritura descifrada ofrece la historia más completa de cualquier civilización precolombina. Son un ejemplo de lo que la inteligencia humana puede lograr sin tecnología industrial.",
      "Para ti, que estudias en este curso, los mayas son un recordatorio de que grandes civilizaciones florecieron en cada continente, independientemente unas de otras, siguiendo los mismos principios universales: observación de la naturaleza, registro del conocimiento, organización social, y la búsqueda del significado del cosmos. La ciencia es la herramienta que conecta a todos esos exploradores del universo, sin importar cuándo o dónde vivieron."
    ],
    quiz: [
      { q: "¿Qué indicaba el alargamiento craneal en la cultura maya?", options: ["Castigo","Enfermedad","Belleza y estatus social","Profesión de guerrero"], a: 2 },
      { q: "¿Qué instrumento musical maya usaba conchas marinas?", options: ["Flauta","Tambor","Trompeta de caracol","Sonaja"], a: 2 },
      { q: "¿Qué logro maya alimenta literalmente a billones de personas hoy?", options: ["Su sistema de escritura","La domesticación del maíz","Sus calendarios","Su arquitectura"], a: 1 },
      { q: "¿Qué forma imitaba el alargamiento craneal maya?", options: ["La cabeza de un jaguar","La cabeza del maíz","La forma de la pirámide","La luna llena"], a: 1 },
      { q: "¿Qué tienen en común todas las grandes civilizaciones según la lección?", options: ["Contacto entre sí","Los mismos dioses","Observación de la naturaleza, registro y organización social","Origen en Mesopotamia"], a: 2 }
    ]
  }
};

for (const [id, data] of Object.entries(MAYA)) {
  src = patchModule(src, id, data.extra, data.quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Maya (m9-m15) all patched!');
