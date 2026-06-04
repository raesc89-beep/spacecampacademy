/**
 * Expansion Batch 1: Star Wars modules
 * Expands starwars_sec_1 through starwars_sec_9 with 15 paragraphs each
 * Science-based content for kids 6-13, pedagogical language with metaphors
 */

const fs = require('fs');
const path = require('path');

const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

// Full 15-paragraph content for each Star Wars module
const CONTENT = {
  starwars_sec_1: {
    title: "Los Parsecs y el Corredor de Kessel",
    sections: [
      {
        id: "starwars_sec_1_s1",
        title: "¿Qué es un Parsec?",
        text: [
          "¿Alguna vez escuchaste a Han Solo decir que el Halcón Milenario completó el Corredor de Kessel en menos de 12 parsecs? ¡Eso es una distancia, no un tiempo! Un **parsec** es una unidad astronómica real que los científicos usan para medir distancias entre estrellas. Imagina que la distancia del Sol a la Tierra es como la longitud de tu brazo: un parsec equivale a unas 206,000 de esas mismas distancias. Es como si tu brazo se estirara de la Ciudad de México hasta la Luna y de vuelta ¡más de 800 veces! Los parsecs son la herramienta favorita de los astrónomos cuando hablan de viajes entre estrella y estrella.",
          "Un parsec equivale exactamente a **3.26 años luz**, o sea, la distancia que recorre la luz en 3 años y 3 meses viajando sin parar. La luz es lo más rápido que existe en el universo: en un segundo recorre 300,000 kilómetros, que es como dar la vuelta a la Tierra 7.5 veces en un abrir y cierre de ojos. Aun así, la luz tarda años enteros en cruzar la distancia de un parsec. Esto nos da una idea de lo gigantesco que es el universo: la estrella más cercana a nuestro Sol, Proxima Centauri, está a 1.3 parsecs de distancia.",
          "La palabra 'parsec' viene de combinar **par**alaje y **sec**undo de arco. El paralaje es un truco visual que usamos todos sin darnos cuenta: cierra un ojo, señala un objeto lejano con el dedo, y luego abre ese ojo y cierra el otro. ¡El objeto parece moverse! Eso es el paralaje. Los astrónomos usaron este mismo truco con las estrellas: midieron cuánto parecían moverse las estrellas cercanas cuando la Tierra está en diferentes puntos de su órbita alrededor del Sol. Con esa pequeña diferencia angular, calcularon las distancias exactas.",
          "La estrella del norte, la **Estrella Polar** (Polaris), está a aproximadamente 133 parsecs de la Tierra. Eso significa que la luz que ves hoy cuando miras la Estrella Polar salió de ella hace 433 años, ¡cuando en México existía el Virreinato! El universo observable completo tiene un radio de unos **14,000 millones de parsecs** (o 14 gigaparsecs). Es tan enorme que si redujéramos el universo al tamaño de una pelota de fútbol, la Vía Láctea entera, con sus 100,000 millones de estrellas, sería más pequeña que un átomo.",
          "Ahora bien, en Star Wars, el Corredor de Kessel era una ruta hiperespacial peligrosa cerca de varios agujeros negros. Han Solo presumía de haberlo completado en 12 parsecs, lo que en la ciencia ficción implica que el Halcón Milenario fue tan rápido que pudo navegar un camino más corto, más cerca de los agujeros negros, sin ser atrapado. En la física real, la **gravedad de un agujero negro** curva el espacio a su alrededor, y teóricamente podría usarse para acortar rutas, aunque de formas muy distintas a las de la película. Los físicos llaman a esto 'lente gravitacional'.",
        ]
      },
      {
        id: "starwars_sec_1_s2",
        title: "La Ciencia Real Detrás del Hiperespacio",
        text: [
          "El 'hiperespacio' de Star Wars tiene una base en teorías científicas reales. En física, existe el concepto de **dimensiones adicionales**. La teoría de cuerdas, por ejemplo, propone que el universo podría tener hasta 11 dimensiones, aunque nosotros solo percibimos 3 espaciales más el tiempo. Si existieran estas dimensiones extra, en principio podrías 'doblar' el espacio tridimensional a través de ellas, como cuando doblas una hoja de papel para acercar dos puntos que estaban lejos. Eso es exactamente lo que hace el hiperespacio en Star Wars.",
          "Albert Einstein, con su **Teoría General de la Relatividad** (1915), demostró que el espacio no es rígido sino flexible, como una sábana elástica. Los objetos masivos como estrellas y planetas la curvan. Cuanto más masivo el objeto, más curva el espacio a su alrededor. Un agujero negro tiene tanta masa concentrada que curva el espacio infinitamente, creando lo que los físicos llaman una **singularidad**. Alrededor de un agujero negro existe el 'horizonte de eventos': una frontera desde la cual ni siquiera la luz puede escapar. Es como un punto de no retorno.",
          "Los científicos han detectado **ondas gravitacionales**, que son como ondas en la sábana del espacio-tiempo. Fueron predichas por Einstein en 1916 y detectadas por primera vez en 2015 por el observatorio LIGO. Estas ondas se producen cuando objetos masivos se aceleran, como dos agujeros negros orbitándose mutuamente antes de fusionarse. Detectar estas ondas es como 'escuchar' el universo: nos da información sobre eventos cósmicos a miles de millones de años luz de distancia que no podemos ver de otra manera.",
          "¿Podría existir algo parecido al hiperespacio real? Algunos físicos teóricos proponen los **agujeros de gusano** (o puentes Einstein-Rosen): conexiones entre dos regiones distantes del espacio-tiempo, como un túnel a través de la sábana del universo. En teoría, si pudieras atravesar un agujero de gusano estable, llegarías casi instantáneamente a un lugar que de otra forma tardarías millones de años en alcanzar. Hasta ahora nadie ha encontrado uno real, pero tampoco hay ninguna ley física que los prohíba completamente. Son matemáticamente posibles.",
          "La razón por la que el hiperespacio de Star Wars parece tan real a los físicos es que sigue algunas reglas consistentes: no puedes saltar cerca de un planeta (la gravedad lo impide), necesitas coordenadas precisas calculadas por computadora, y los errores pueden ser catastróficos. Estas restricciones reflejan intuiciones físicas reales: los **campos gravitacionales intensos** distorsionarían cualquier 'corredor' dimensional, y calcular una trayectoria segura requeriría una potencia de cómputo enorme. En la NASA real, calcular trayectorias interplanetarias precisas requiere supercomputadoras y meses de cálculo.",
        ]
      },
      {
        id: "starwars_sec_1_s3",
        title: "Midiendo el Universo: Herramientas Reales",
        text: [
          "Los astrónomos tienen una 'escalera de distancias cósmicas' con diferentes métodos para medir distancias, según qué tan lejos está el objeto. Para estrellas cercanas (hasta unos 10,000 parsecs) usan el **paralaje estelar**: la misma idea del truco del dedo. Para estrellas más lejanas, usan estrellas especiales llamadas **Cefeidas**: estrellas que pulsan con un ritmo constante relacionado con su brillo real. Midiendo cuánto más tenues parecen, calculan su distancia. Este método fue descubierto por la astrónoma Henrietta Swan Leavitt en 1908.",
          "Para galaxias aún más lejanas, usan las **supernovas tipo Ia**: explosiones estelares que siempre tienen el mismo brillo máximo, como una bombilla estándar. Comparando ese brillo estándar con lo tenue que se ve, calculan la distancia. Con este método, los astrónomos descubrieron en 1998 que el universo no solo se expande, sino que su expansión se **acelera**. Algo que llamamos 'energía oscura' está empujando el universo a separarse cada vez más rápido. Por este descubrimiento, Saul Perlmutter, Brian Schmidt y Adam Riess ganaron el Premio Nobel de Física en 2011.",
          "La **galaxia de Andrómeda** (M31), la más cercana a la Vía Láctea con ojo desnudo, está a unos 770,000 parsecs (770 kiloparsecs) de nosotros. Y está acercándose: dentro de unos 4,500 millones de años, Andrómeda y la Vía Láctea se fusionarán en una colisión galáctica épica. Pero no te preocupes: las estrellas están tan separadas entre sí que la probabilidad de que dos estrellas colisionen directamente es casi cero. Las galaxias 'colisionan' pero sus estrellas simplemente se reorganizan gravitacionalmente durante millones de años.",
          "Una de las misiones más importantes en la historia de la astronomía es el satélite **Gaia** de la ESA (Agencia Espacial Europea), lanzado en 2013. Su misión es medir la posición y movimiento de más de **1,000 millones de estrellas** con una precisión sin precedente. Es como si tuvieras un mapa en 3D de toda la Vía Láctea con precisión de micrómetros. Los datos de Gaia han revolucionado nuestra comprensión de la estructura de nuestra galaxia y han confirmado que la Vía Láctea tiene al menos 200,000 millones de estrellas.",
          "Para concluir, los parsecs son una herramienta científica real e imprescindible. Cuando los astrofísicos hablan de que el agujero negro M87* (el primero en ser fotografiado, en 2019) está a **16.4 megaparsecs** de la Tierra, están usando una medida precisa basada en siglos de física y astronomía cuidadosa. La imagen de ese agujero negro fue captada por el Telescopio de Horizonte de Eventos (EHT), una red de radiotelescopios distribuidos por todo el planeta que funcionaron juntos como un telescopio del tamaño de la Tierra. La ciencia real de los parsecs es, si cabe, más asombrosa que la ficción de Han Solo.",
        ]
      }
    ],
    quiz: [
      { question: "¿Qué es un parsec?", options: ["Una unidad de tiempo", "Una unidad de distancia astronómica", "Un tipo de nave espacial", "La velocidad de la luz"], answer: 1 },
      { question: "¿A cuántos años luz equivale un parsec?", options: ["1 año luz", "2.5 años luz", "3.26 años luz", "10 años luz"], answer: 2 },
      { question: "¿Qué detectó el observatorio LIGO en 2015?", options: ["Un agujero negro", "Ondas gravitacionales", "Un agujero de gusano", "La energía oscura"], answer: 1 },
    ]
  },

  starwars_sec_2: {
    title: "La Física de la Fuerza: Campos y Energía",
    sections: [
      {
        id: "starwars_sec_2_s1",
        title: "¿Existe Algo Como la Fuerza?",
        text: [
          "En Star Wars, la **Fuerza** es descrita como 'un campo energético creado por todos los seres vivientes que nos rodea, nos penetra y mantiene unida a la galaxia'. Aunque suena a pura ciencia ficción, esta descripción tiene paralelismos sorprendentes con conceptos de la física real. En la naturaleza existen cuatro **fuerzas fundamentales** que actúan sobre toda la materia: la gravedad, el electromagnetismo, la fuerza nuclear fuerte y la fuerza nuclear débil. Estas fuerzas son campos invisibles que actúan a distancia, igual que la Fuerza de Jedi.",
          "La **gravedad** es la más familiar: es la que te mantiene pegado al suelo y hace que la Luna orbite la Tierra. Einstein la describió como una curvatura del espacio-tiempo causada por la masa. Pero lo asombroso es que la gravedad actúa a distancia sin necesitar contacto físico: la Tierra atrae a la Luna aunque estén a 384,400 km de distancia. Los científicos explican esto a través de 'partículas portadoras de fuerza': la gravedad sería transmitida por partículas hipotéticas llamadas **gravitones**, aunque todavía no han podido detectarlas directamente.",
          "El **electromagnetismo** es quizás la fuerza más parecida a la Fuerza de Star Wars: permite que los imanes atraigan metales a distancia, que la electricidad viaje por cables, y que la luz exista como onda electromagnética. Un electroimán puede levantar objetos sin tocarlos, como hacen los Jedi. La fuerza electromagnética es mediada por **fotones** (partículas de luz). Un campo magnético, aunque invisible, es perfectamente real y medible: se puede ver su efecto con limaduras de hierro alrededor de un imán.",
          "Los **midichlorianus** de Star Wars (los microbios que permiten conectarse con la Fuerza) tienen un paralelo en la biología real: las mitocondrias. Las mitocondrias son orgánulos dentro de nuestras células que producen la energía que nuestro cuerpo necesita para vivir. Son tan importantes que sin ellas, ninguna célula podría funcionar. De hecho, las mitocondrias tienen su propio ADN, lo que sugiere que en el pasado remoto de la evolución, fueron bacterias independientes que se fusionaron con células más grandes en un proceso llamado **endosimbiosis**.",
          "Los científicos de la Universidad de California han investigado si la **telekinesis** (mover objetos con la mente) podría ser posible en principio. La respuesta es: no como en Star Wars, pero hay fenómenos relacionados. Las **interfaces cerebro-computadora** permiten a personas con parálisis mover cursores de pantalla o brazos robóticos solo con sus pensamientos. El cerebro genera señales eléctricas que se detectan con electrodos, y una computadora las interpreta para controlar dispositivos. Es telekinesis real, aunque mediada por tecnología. Empresas como Neuralink trabajan en versiones más avanzadas de esta tecnología.",
        ]
      },
      {
        id: "starwars_sec_2_s2",
        title: "Campos de Energía y Biofísica",
        text: [
          "Nuestro cuerpo genera campos electromagnéticos reales. El corazón produce el campo eléctrico más fuerte del cuerpo, detectable a **un metro de distancia** con instrumentos sensibles. El cerebro también genera campos eléctricos medibles con el EEG (electroencefalograma). El cuerpo humano incluso emite luz infrarroja (calor) que los sensores de visión nocturna pueden detectar. Así que aunque no podemos mover objetos con la mente, literalmente somos seres de energía que emitimos campos medibles, ¡igual que en Star Wars!",
          "La **bioluminiscencia** es otro fenómeno que recuerda a la Fuerza: muchos seres vivos producen su propia luz. Las luciérnagas, ciertas bacterias, medusas y peces de las profundidades marinas generan luz sin calor a través de reacciones químicas. La luciérnaga usa una enzima llamada **luciferasa** que reacciona con una molécula llamada luciferina en presencia de oxígeno para producir luz. Los científicos han tomado prestado este sistema para crear células de laboratorio que brillan cuando se activan ciertos genes, revolucionando la biología molecular.",
          "¿Y los sables de luz? En Star Wars son haces de energía pura que pueden cortar casi cualquier material. En la física real, los **láseres** son el equivalente más cercano. Un láser de alta potencia puede cortar metal, realizar cirugías oculares con precisión de micrómetros, y usarse en telecomunicaciones para transmitir datos a velocidades increíbles. Sin embargo, los haces de luz normalmente no se detienen en un punto fijo: continúan en línea recta indefinidamente. Para hacer un 'sable de luz' real necesitarías un campo para doblar la luz de regreso, algo que todavía está en el reino de la ciencia ficción.",
          "Sin embargo, en 2013 físicos del MIT y Harvard lograron algo sorprendente: crearon **'moléculas de fotones'**, pares de fotones (partículas de luz) que interactúan entre sí como si tuvieran masa. Normalmente los fotones pasan unos a través de otros sin interactuar. Al hacer pasar luz a través de una nube de átomos ultrafríos, los fotones se comportaron como si se 'pegaran' entre sí. Los físicos bromearon diciendo que habían dado el primer paso hacia los sables de luz reales. Mihail Lukin del MIT dijo: 'Lo que hacemos es muy parecido a los sables de luz de George Lucas'.",
          "La **plasma de alta temperatura** podría ser el material más cercano a un sable de luz: es el cuarto estado de la materia (gas tan caliente que sus electrones se separan de los átomos). Los rayos son plasma, y también lo es el interior del Sol. Empresas como Hacksmith Industries han construido 'sables de plasma' reales usando gas propano ionizado a más de 2,000°C. Pueden cortar metal y son de colores distintos según el gas usado. Aunque no tienen la precisión ni la practicidad de los de Star Wars, demuestran que la física no prohíbe completamente armas de energía luminosa.",
        ]
      },
      {
        id: "starwars_sec_2_s3",
        title: "Fuerza y Conciencia: Neurociencia y Filosofía",
        text: [
          "Uno de los aspectos más fascinantes de la Fuerza es su conexión con la **conciencia y el universo**. Algunas interpretaciones filosóficas de la física cuántica, como la interpretación de **Muchos Mundos** de Hugh Everett, sugieren que la realidad es mucho más extraña de lo que percibimos. En mecánica cuántica, una partícula puede estar en múltiples estados a la vez (superposición) hasta que la observamos. El acto de observar parece influir en la realidad física, lo que ha llevado a debates filosóficos sobre el papel de la conciencia en el universo.",
          "El **entrelazamiento cuántico** es quizás el fenómeno más misterioso de la física: dos partículas pueden estar 'entrelazadas' de tal manera que medir el estado de una afecta instantáneamente al estado de la otra, sin importar qué tan lejos estén. Einstein lo llamó 'acción fantasmal a distancia' y le incomodaba profundamente. Experimentos modernos han confirmado que el entrelazamiento es real y se mantiene a distancias de más de **1,200 kilómetros** (confirmado por el satélite chino Micius en 2017). Aunque no puede usarse para transmitir información más rápido que la luz, es una conexión genuina entre objetos distantes.",
          "Los **Jedi** practican la meditación para conectarse con la Fuerza. Resulta que la meditación tiene efectos neurológicos muy reales y medibles. Estudios con resonancia magnética funcional muestran que la meditación regular cambia físicamente la estructura del cerebro: aumenta el grosor de la corteza prefrontal (relacionada con la toma de decisiones y el autocontrol) y reduce el tamaño de la amígdala (el centro del miedo). Los monjes tibetanos con décadas de práctica meditativa muestran patrones de ondas cerebrales (ondas gamma) muy inusuales, asociados con estados de alerta y procesamiento elevado.",
          "La **percepción extrasensorial** que exhiben los Jedi (predecir el futuro, sentir las emociones de otros) no tiene base científica probada. Sin embargo, el cerebro humano hace predicciones constantemente. La **neurociencia predictiva** muestra que el cerebro no registra pasivamente el mundo, sino que constantemente genera predicciones sobre lo que va a pasar y solo actualiza cuando se equivoca. Por eso, un portero de fútbol experimentado 'sabe' adónde irá el penalti antes de que el balón sea pateado: su cerebro ha modelado patrones tan bien que puede anticipar el futuro de forma casi instantánea.",
          "Para finalizar, la Fuerza de Star Wars es una mezcla creativa de ideas reales: los campos de fuerza de la física, la conciencia y el cerebro de la neurociencia, y los fenómenos cuánticos misteriosos. George Lucas se inspiró en parte en el **Taoísmo** chino y en el concepto hindú del **Prana** (energía vital universal). La ciencia moderna no ha encontrado una 'Fuerza' universal como la de la película, pero sí ha descubierto que el universo está lleno de campos de energía invisible, partículas que actúan en concierto a distancias enormes, y cerebros que de alguna manera generan la experiencia consciente de la realidad. En ese sentido, la realidad es tan misteriosa como cualquier ficción.",
        ]
      }
    ],
    quiz: [
      { question: "¿Cuántas fuerzas fundamentales existen en la naturaleza?", options: ["2", "3", "4", "5"], answer: 2 },
      { question: "¿Qué son las mitocondrias?", options: ["Huesos del cuerpo", "Orgánulos que producen energía en las células", "Células del cerebro", "Tipos de átomo"], answer: 1 },
      { question: "¿Qué es el entrelazamiento cuántico?", options: ["Cuando dos planetas colisionan", "Una conexión entre partículas a distancia", "El movimiento de los electrones", "La órbita de los átomos"], answer: 1 },
    ]
  },

  starwars_sec_3: {
    title: "Las Guerras de las Galaxias: Astrofísica Real",
    sections: [
      {
        id: "starwars_sec_3_s1",
        title: "Planetas Reales Tan Extraños Como en Star Wars",
        text: [
          "Star Wars presenta planetas asombrosos: Tatooine con sus dos soles, Hoth completamente helado, Coruscant totalmente urbanizado. ¿Existen lugares así en el universo real? ¡La respuesta es sí, y aún más extraños! Los telescopios modernos han descubierto miles de **exoplanetas** (planetas fuera de nuestro sistema solar), y algunos son tan raros que parecen sacados directamente de la ciencia ficción. La misión Kepler de NASA detectó más de **2,600 exoplanetas confirmados** entre 2009 y 2018.",
          "El planeta **Kepler-16b** es el 'Tatooine real': orbita alrededor de dos estrellas simultáneamente, como el planeta desértico de Luke Skywalker. Se llama **planeta circumbiario** y fue descubierto en 2011. Desde su superficie (si pudiera visitarse), verías dos soles de distintos tamaños y colores: uno naranja y uno rojo. Cuando están alineados, habría eclipses dobles. Kepler-16b tiene masa similar a Saturno y orbita las dos estrellas cada 229 días a una distancia donde el agua podría existir en estado líquido.",
          "¿Y Hoth, el planeta helado? Existen mundos reales completamente cubiertos de hielo. **Europa**, luna de Júpiter, tiene una superficie de hielo puro que esconde un océano de agua líquida debajo, mantenido líquido por las fuerzas de marea que Júpiter ejerce sobre ella. Bajo ese hielo podría haber más agua que en todos los océanos de la Tierra. La NASA planea enviar la misión **Europa Clipper** para investigar si ese océano subterráneo podría albergar vida. ¡Un Hoth real con posible vida bajo el hielo!",
          "¿Podría existir un **Coruscant** real, un planeta-ciudad? La astrofísica permite imaginarlo. Una civilización suficientemente avanzada podría en principio construir estructuras que cubrieran todo un planeta. El físico Freeman Dyson propuso las **'esferas de Dyson'**: estructuras megaengineering que rodean completamente una estrella para capturar toda su energía. Un planeta completamente urbanizado sería menos ambicioso. La 'paradoja de Fermi' pregunta por qué, si civilizaciones así existen, no las hemos detectado. ¿Será que son tan raras, o que están muy lejos?",
          "Los planetas más extraños descubiertos realmente incluyen **55 Cancri e**: un planeta del tamaño de la Tierra tan cercano a su estrella que su temperatura superficial supera los 2,000°C, lo que significa que su superficie podría estar cubierta de **lava y rocas fundidas**. También existe **WASP-12b**: un planeta gaseoso que orbita tan cerca de su estrella que está siendo literalmente devorado por ella, perdiendo material que forma una cola como un cometa. Y hay planetas negros como el carbón (TrES-2b) que reflejan menos luz que el alquitrán.",
        ]
      },
      {
        id: "starwars_sec_3_s2",
        title: "Estrellas de la Muerte y Física de Armamento Estelar",
        text: [
          "La **Estrella de la Muerte** de Star Wars dispara un rayo capaz de destruir un planeta. ¿Cuánta energía necesitaría eso realmente? Los físicos han calculado que para separar todos los átomos de un planeta del tamaño de la Tierra (vencer su **energía gravitacional de ligadura**) se necesitarían aproximadamente **2.25 × 10³² julios** de energía. Para ponerlo en perspectiva, eso es más de lo que el Sol irradia en una semana entera. Un reactor nuclear convencional tardaría más tiempo del que lleva existiendo el universo en producir esa energía.",
          "Los **láseres** de alta potencia son el arma energética más cercana a la realidad. El Laboratorio Nacional Lawrence Livermore tiene el **National Ignition Facility (NIF)**: un láser que dirige 192 haces de luz sobre un blanco del tamaño de un guisante con el objetivo de lograr fusión nuclear. En 2022 lograron un hito histórico: por primera vez en la historia, produjeron más energía de la que el láser aportó (**3.15 megajulios** producidos vs 2.05 megajulios del láser). Fue el primer paso hacia la energía de fusión comercial, la misma que impulsa el Sol.",
          "Una tecnología de defensa real que suena a Star Wars es el **Iron Dome** israelí y el sistema **SHIELD** de EE.UU.: sistemas de misiles interceptores que derriban cohetes enemigos en el aire. Más cercano a Star Wars son los **láseres antimisil** militares: la US Navy ha desplegado el sistema LaWS (Laser Weapon System) en barcos de guerra, capaz de derribar drones y pequeñas embarcaciones con un haz láser de 30 kilowatts. No destruye planetas, pero es un arma de energía dirigida completamente real y operacional.",
          "En cuanto a escudos de energía (los 'escudos deflectores' de Star Wars), los científicos trabajan en protecciones activas para naves espaciales reales, aunque para un problema diferente: la **radiación cósmica**. En el espacio profundo, los astronautas estarían expuestos a niveles letales de radiación. Un campo magnético artificial, similar al de la Tierra que nos protege del viento solar, podría funcionar como 'escudo' para una nave espacial. El proyecto **SR2S** financiado por la ESA ha estudiado la viabilidad de escudos magnéticos miniaturizados para misiones a Marte.",
          "La propulsión de las naves de Star Wars también tiene paralelos reales. El motor de **impulso de iones** no es ficción: la sonda Dawn de NASA usó motores iónicos para viajar al cinturón de asteroides y orbitar Ceres y Vesta. Un motor de iones funciona acelerando partículas cargadas (iones) con campos eléctricos para generar empuje. Son muy eficientes en combustible aunque lentos en acelerar. La sonda Dawn tardó 4 años en llegar a Ceres. Para viajes interestelares, los teóricos proponen la **vela solar**: una vela gigantesca impulsada por la presión de la luz solar o de láseres terrestres.",
        ]
      },
      {
        id: "starwars_sec_3_s3",
        title: "Civilizaciones Galácticas: ¿Solos en el Universo?",
        text: [
          "Star Wars muestra una galaxia repleta de civilizaciones inteligentes. En la realidad, la gran pregunta es: **¿estamos solos en el universo?** La escala del universo hace que la vida sea casi inevitable estadísticamente. Solo en la Vía Láctea hay entre 200,000 y 400,000 millones de estrellas. Los datos del telescopio Kepler sugieren que aproximadamente el **20% de las estrellas similares al Sol** tienen un planeta en la 'zona habitable' (distancia donde el agua puede existir en estado líquido). Eso serían decenas de miles de millones de planetas potencialmente habitables solo en nuestra galaxia.",
          "La **ecuación de Drake**, formulada por el radioastrónomo Frank Drake en 1961, intenta estimar cuántas civilizaciones tecnológicas podrían existir en la Vía Láctea. Considera factores como la tasa de formación estelar, la fracción de estrellas con planetas, la fracción de esos planetas donde emerge la vida, y la fracción donde evoluciona la inteligencia. Las estimaciones varían enormemente: desde una sola civilización (nosotros) hasta millones. La gran incertidumbre está en cuánto tiempo duran las civilizaciones tecnológicas antes de desaparecer.",
          "El programa **SETI** (Search for Extra-Terrestrial Intelligence) lleva décadas escuchando el espacio en busca de señales de radio artificiales de civilizaciones alienígenas. En 1977, el radiotelescopio Big Ear de Ohio recibió una señal de radio tan inusual que el investigador Jerry Ehman escribió '¡Guau!' en el papel. La señal, conocida como la **'señal Wow!'**, duró 72 segundos y venía de la dirección de la constelación Sagitario, pero nunca fue detectada de nuevo. Hasta hoy es el candidato más plausible de señal extraterrestre, aunque sin confirmación.",
          "La misión **Mars 2020 Perseverance** busca signos de vida antigua en Marte. Hace 3.5 mil millones de años, Marte tenía una atmósfera más densa, agua líquida en su superficie, y condiciones potencialmente habitables. Si la vida surgió en Marte entonces (aunque sea en forma de microbios), sería la prueba más revolucionaria en la historia de la humanidad: que la vida no es un accidente único de la Tierra sino un fenómeno común del universo. Perseverance toma muestras de roca que serán traídas de vuelta a la Tierra por futuras misiones.",
          "¿Qué pasaría si detectáramos una señal extraterrestre real? Existe el **Protocolo de SETI**: un conjunto de acuerdos internacionales sobre cómo proceder. Básicamente, la señal sería verificada por múltiples observatorios, se informaría a la comunidad científica mundial, y luego a los gobiernos y al público. La **ONU** tiene procedimientos para coordinar la respuesta de la humanidad. Pero nadie sabe realmente cómo reaccionaría el mundo. Lo que sí sabemos es que el descubrimiento de vida extraterrestre, aunque fuera de microbios marcianos, cambiaría para siempre la visión que la humanidad tiene de su lugar en el cosmos.",
        ]
      }
    ],
    quiz: [
      { question: "¿Cómo se llama el planeta con dos soles descubierto en la realidad?", options: ["Tatooine", "Kepler-16b", "Hoth real", "55 Cancri e"], answer: 1 },
      { question: "¿Qué programa busca señales de civilizaciones extraterrestres?", options: ["NASA", "ESA", "SETI", "LIGO"], answer: 2 },
      { question: "¿Cuántas estrellas hay aproximadamente en la Vía Láctea?", options: ["Miles", "Millones", "Miles de millones", "Billones"], answer: 2 },
    ]
  }
};

function expandModules(content) {
  const fs = require('fs');
  let courseData = fs.readFileSync(COURSE_DATA_PATH, 'utf8');
  let modified = 0;
  
  for (const [moduleId, moduleContent] of Object.entries(content)) {
    const searchStr = `"id": "${moduleId}"`;
    const idx = courseData.indexOf(searchStr);
    if (idx < 0) {
      console.log(`WARNING: Module ${moduleId} not found`);
      continue;
    }
    
    // Find the contentEs section
    const contentEsIdx = courseData.indexOf('"contentEs"', idx);
    if (contentEsIdx < 0 || contentEsIdx > idx + 2000) {
      console.log(`WARNING: contentEs for ${moduleId} not found near position`);
      continue;
    }
    
    // Find the sections array start
    const sectionsIdx = courseData.indexOf('"sections"', contentEsIdx);
    if (sectionsIdx < 0) {
      console.log(`WARNING: sections for ${moduleId} not found`);
      continue;
    }
    
    // Find the opening bracket of sections array
    const arrStart = courseData.indexOf('[', sectionsIdx);
    if (arrStart < 0) continue;
    
    // Find matching closing bracket
    let depth = 0;
    let arrEnd = arrStart;
    for (let i = arrStart; i < courseData.length; i++) {
      if (courseData[i] === '[') depth++;
      else if (courseData[i] === ']') {
        depth--;
        if (depth === 0) {
          arrEnd = i;
          break;
        }
      }
    }
    
    // Build replacement sections
    const newSections = JSON.stringify(moduleContent.sections, null, 8)
      .replace(/\\\\n/g, '\\n');
    
    const oldSections = courseData.substring(arrStart, arrEnd + 1);
    courseData = courseData.substring(0, arrStart) + newSections + courseData.substring(arrEnd + 1);
    
    // Now add quiz if needed
    const quizSearch = `"quiz"`;
    const quizIdx = courseData.indexOf(quizSearch, idx);
    if (quizIdx < 0 || quizIdx > idx + 10000) {
      // No quiz, add one after contentEs closing
      // find contentEs closing brace
      const ceStart = courseData.indexOf('"contentEs"', idx);
      const ceObjStart = courseData.indexOf('{', ceStart);
      let cDepth = 0;
      let ceEnd = ceObjStart;
      for (let i = ceObjStart; i < courseData.length; i++) {
        if (courseData[i] === '{') cDepth++;
        else if (courseData[i] === '}') {
          cDepth--;
          if (cDepth === 0) { ceEnd = i; break; }
        }
      }
      // insert quiz before ceEnd
      const quizJson = `,\n        "quiz": ${JSON.stringify(moduleContent.quiz, null, 8)}`;
      courseData = courseData.substring(0, ceEnd) + quizJson + courseData.substring(ceEnd);
    }
    
    console.log(`✓ Expanded ${moduleId} with ${moduleContent.sections.reduce((a,b) => a + b.text.length, 0)} paragraphs`);
    modified++;
  }
  
  fs.writeFileSync(COURSE_DATA_PATH, courseData, 'utf8');
  console.log(`\nDone! Modified ${modified} modules.`);
}

expandModules(CONTENT);
