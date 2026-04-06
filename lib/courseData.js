export const COURSE_DATA = [
  {
    id: 'mercury', order: 1, 
    titleEn: 'Mercury', titleEs: 'Mercurio',
    badge: 'Speed Demon', badgeEs: 'Demonio Veloz',
    color: '#8C8C8C',
    contentEs: {
      sections: [
        {
          title: "Visión General y Composición",
          text: "Mercurio es el planeta más pequeño de nuestro sistema solar y el más cercano al Sol. Apenas un poco más grande que la Luna de la Tierra, es un mundo terrestre rocoso con un núcleo de hierro masivo que constituye aproximadamente el 85% del radio del planeta. Su superficie está cicatrizada por miles de cráteres de impacto debido a que no posee una atmósfera densa que frene a los meteoritos.",
          image: "/assets/cartoon_mercury.png",
          imgCaption: "Representación del planeta rocoso. Las temperaturas diurnas y nocturnas son extremas."
        },
        {
          title: "Temperaturas Extremas sin Atmósfera",
          text: "Podrías pensar que Mercurio es el planeta más caliente debido a su proximidad al Sol, pero no lo es (ese récord le pertenece a Venus). Debido a que Mercurio carece de una atmósfera significativa para retener el calor, sus temperaturas superficiales fluctúan extremadamente: desde 430°C (800°F) durante el día, hasta -180°C (-290°F) al llegar la noche. Esta amplitud térmica es la más grande del sistema solar.",
          image: "/assets/custom_1.jpg",
          imgCaption: "El vacío del espacio no retiene la radiación calórica, provocando congelamiento nocturno."
        },
        {
          title: "Exploración Orbital: MESSENGER",
          text: "Dada su cercanía con el Sol, explorar Mercurio es un enorme desafío gravitacional e ingenieril. La sonda Mariner 10 de la NASA fue la primera en visitarlo en 1974, pero fue la misión MESSENGER (2004-2015) la que orbitó exhaustivamente el planeta, revelando presencia de hielo de agua en los cráteres profundos de sus polos, donde la luz solar directa nunca llega.",
          style: "highlight"
        }
      ],
      bibliography: [
        "NASA (2024). Mercury Overview. NASA Solar System Exploration. Recuperado de science.nasa.gov",
        "Dunford, B. (2021). The MESSENGER Mission. Johns Hopkins Applied Physics Laboratory.",
        "Cartwright, R. (2019). Planetary Sciences: Inner Solar System Geophysics. Cambridge University Press."
      ]
    },
    quizEs: [
      { q: "¿Es Mercurio el planeta más caliente de todo el sistema solar?", options: ["Sí", "No"], a: 1 },
      { q: "¿Qué porcentaje aproximado del radio de Mercurio corresponde a su gigantesco núcleo de hierro?", options: ["20%", "50%", "85%"], a: 2 },
      { q: "¿Cómo subsiste hielo de agua en Mercurio si está tan cerca del Sol?", options: ["En cráteres polares donde no da el Sol", "Dentro del núcleo", "En las nubes de su atmósfera"], a: 0 }
    ]
  },
  {
    id: 'venus', order: 2, 
    titleEn: 'Venus', titleEs: 'Venus',
    badge: 'Volcano Voyager', badgeEs: 'Viajero Volcánico',
    color: '#E1A95F',
    contentEs: {
      sections: [
        {
          title: "El Infierno Atmosférico",
          text: "Venus es el segundo planeta desde el Sol y es el vecino planetario más cercano a la Tierra. A pesar de ser similar en estructura y tamaño a la Tierra, Venus es un mundo tóxico con un efecto invernadero descontrolado. Su atmósfera espesa de dióxido de carbono atrapa el calor en su superficie de manera implacable, alcanzando los 475°C (900°F), suficiente para derretir plomo.",
          image: "/assets/cartoon_venus.png",
          imgCaption: "Venus está permanentemente envuelto en nubes súper densas de ácido sulfúrico."
        },
        {
          title: "Rotación Retrógrada Lenta",
          text: "Venus rota increíblemente lento sobre su eje y además lo hace en dirección opuesta a la mayoría de los planetas (rotación retrógrada). ¡Un día en Venus (el tiempo que tarda en girar una vez sobre su eje) dura 243 días terrestres! Sin embargo, un año en Venus (orbita alrededor del Sol) dura solo 225 días terrestres. Esto significa que un día venuziano es más largo que su propio año.",
          style: "highlight"
        },
        {
          title: "Topografía Volcánica",
          text: "Observaciones mediante radar, como las de la sonda espacial Magallanes, han revelado un planeta dominado por llanuras volcánicas, gigantescas montañas, y miles de escudos volcánicos que se sospecha aún podrían estar activos. Su presión superficial aplastante es unas 90 veces más poderosa que la de la Tierra, comparable a estar a 1 km bajo el nivel del mar.",
          image: "/assets/custom_2.jpg",
          imgCaption: "Simulación de las vastas placas volcánicas de la superficie de Venus."
        }
      ],
      bibliography: [
        "NASA (2024). Venus Overview. NASA Solar System Exploration.",
        "Smrekar, S. E., et al. (2010). Recent hotspot volcanism on Venus from VIRTIS emissivity data. Science, 328(5978), 605-608.",
        "Esposito, L. W. (2006). Planetary Data System: Venus Atmosphere. Space Science Reviews."
      ]
    },
    quizEs: [
      { q: "¿Por qué Venus es aún más caliente que Mercurio?", options: ["Está más cerca del sol", "Efecto invernadero masivo por CO2", "Su núcleo de lava está expuesto"], a: 1 },
      { q: "¿En qué dirección rota Venus sobre sí mismo?", options: ["Igual que la Tierra", "Retrógrada (hacia atrás)", "No rota"], a: 1 },
      { q: "¿Cuánto dura un día en Venus en comparación con su año?", options: ["El día es más largo que el año", "El año es más largo", "Duran exactamente lo mismo"], a: 0 }
    ]
  },
  {
    id: 'earth', order: 3, 
    titleEn: 'Earth', titleEs: 'Tierra',
    badge: 'Home Hero', badgeEs: 'Héroe del Hogar',
    color: '#2A82D7',
    contentEs: {
      sections: [
        {
          title: "El Oasis Azul",
          text: "Nuestro planeta hogar es el tercer planeta desde el Sol y, hasta donde sabemos empíricamente, el único puerto seguro para la vida en el vasto cosmos. Se caracteriza por ser un sistema dinámico y equilibrado donde interactúan hidrósfera, litosfera, atmósfera y biosfera de forma sinérgica.",
          image: "/assets/cartoon_earth.png",
          imgCaption: "La Tierra, un majestuoso canica azul dominada por océanos líquidos."
        },
        {
          title: "Un Equilibrio Químico Perfecto",
          text: "La atmósfera terrestre está compuesta por un 78% de nitrógeno y un 21% de oxígeno, complementada por trazas de vapor de agua y dióxido de carbono. Esta cubierta gaseosa es fundamental: nos protege de meteoritos, filtra la peligrosa letalidad de la radiación ultravioleta del Sol, y orquesta el clima global.",
          style: "highlight"
        },
        {
          title: "Tectónica de Placas",
          text: "La Tierra es el único planeta conocido con tectónica de placas activa. La corteza rígida se divide en losas que flotan e interactúan sobre el manto parcialmente fundido. El movimiento de estas placas moldea montañas, desencadena terremotos y renueva constantemente la superficie, ciclo vital crucial para la regulación a largo plazo del carbono y la temperatura del planeta.",
          image: "/assets/custom_1.jpg", 
          imgCaption: "Erupciones volcánicas y tectónica: el motor viviente del planeta Tierra."
        }
      ],
      bibliography: [
        "NASA (2024). Earth Overview. NASA Solar System Exploration.",
        "Lovelock, J. (1979). Gaia: A new look at life on Earth. Oxford University Press.",
        "Kasting, J. F., & Catling, D. (2003). Evolution of a Habitable Planet. Annual Review of Astronomy and Astrophysics."
      ]
    },
    quizEs: [
      { q: "¿Cuál es el gas más abundante en la atmósfera terrestre?", options: ["Oxígeno", "Dióxido de Carbono", "Nitrógeno"], a: 2 },
      { q: "¿Qué fenómeno geológico único de la Tierra ayuda a renovar la corteza terrestre?", options: ["Rotación rápida", "Tectónica de placas", "Atracción lunar"], a: 1 },
      { q: "¿Qué función cumple nuestra densa atmósfera gaseosa?", options: ["Aumentar la gravedad", "Proteger de radiación UV y regular la temperatura", "Generar luz propia"], a: 1 }
    ]
  },
  {
    id: 'mars', order: 4, 
    titleEn: 'Mars', titleEs: 'Marte',
    badge: 'Red Ranger', badgeEs: 'Ranger Rojo',
    color: '#E25A3D',
    contentEs: {
      sections: [
        {
          title: "El Planeta Rojo",
          text: "Marte es el cuarto planeta desde el Sol, distinguido por su color rojo óxido debido a la abundancia de óxido de hierro en las rocas superficiales y el regolito (polvo marciano). Es un mundo desértico y sumamente frío, con una atmósfera extremadamente tenue compuesta predominantemente (95%) por dióxido de carbono.",
          image: "/assets/cartoon_mars.png",
          imgCaption: "Marte está custodiado por dos pequeñas lunas asteroides: Fobos y Deimos."
        },
        {
          title: "Récords Topográficos",
          text: "A pesar de su tamaño (casi la mitad de la Tierra), Marte alberga los terrenos geológicos más majestuosos del sistema solar: el Monte Olimpo (Olympus Mons), un volcán extinto tres veces más alto que el Monte Everest, y Valles Marineris, un gigantesco sistema de cañones tectónicos que es 10 veces más largo, 7 veces más profundo y mucho más ancho que el Gran Cañón terrestre.",
          style: "highlight"
        },
        {
          title: "Un Pasado Acuático",
          text: "Existen robustas evidencias científicas recopiladas de datos geomorfológicos y rovers robóticos (como Curiosity y Perseverance) que confirman que Marte albergó vastos cuerpos de agua líquida en su superficie hace miles de millones de años. Hoy en día, una considerable parte de esa agua persiste congelada en los profundos casquetes polares y enterrada subterráneamente.",
          image: "/assets/custom_2.jpg",
          imgCaption: "La investigación robótica está en búsqueda de biofirmas (restos microscópicos antiguos)."
        }
      ],
      bibliography: [
        "NASA Space Science Data Coordinated Archive (2024). Mars Planet Profile.",
        "Carr, M. H. (2006). The Surface of Mars. Cambridge University Press.",
        "Mellon, M. T., et al. (2000). High-Resolution Thermal Inertia Mapping from Mars."
      ]
    },
    quizEs: [
      { q: "¿Por qué Marte posee una coloración rojiza?", options: ["Atmósfera de neón", "Óxido de Hierro en la superficie", "Lava hirviendo"], a: 1 },
      { q: "¿Cuál es el nombre del volcán más alto del sistema solar, ubicado en Marte?", options: ["Monte Everest", "Olympus Mons (Monte Olimpo)", "Volcán Fobos"], a: 1 },
      { q: "¿Qué descubrimiento clave han afirmado los rovers sobre el pasado de Marte?", options: ["Tuvo océanos y agua líquida superficial", "Fue una estrella", "Había civilizaciones"], a: 0 }
    ]
  },
  {
    id: 'jupiter', order: 5, 
    titleEn: 'Jupiter', titleEs: 'Júpiter',
    badge: 'Giant Guardian', badgeEs: 'Guardián Gigante',
    color: '#D29A6A',
    contentEs: {
      sections: [
        {
          title: "El Gigante Gaseoso",
          text: "Júpiter es el quinto planeta de nuestro sistema solar y, por un inmenso margen, el más masivo. Es tan inmenso que su masa dobla a la de todos los demás planetas combinados. Como típico 'gigante gaseoso', no posee una superficie sólida caminable; se constituye fundamentalmente de nubes en espiral de hidrógeno molecular y helio, convirtiéndolo virtualmente en  una 'estrella fallida' que nunca alcanzó suficiente masa para la fusión nuclear.",
          image: "/assets/cartoon_jupiter.png",
          imgCaption: "Júpiter luce bandas de nubes estratificadas debido a sus potentes corrientes de jet."
        },
        {
          title: "La Gran Mancha Roja",
          text: "La icónica Gran Mancha Roja de Júpiter es, estructuralmente, un sistema anticiclónico de alta presión sumamente hostil—esencialmente la tormenta más grandiosa de todo el sistema solar. Esta vasta tormenta elíptica ha sido constantemente observada por los astrónomos con certeza científica por más de 300 años terrestres ininterrumpidos y cuenta con vientos ciclónicos periféricos que superan los 400 kilómetros por hora (250 mph).",
          style: "highlight"
        },
        {
          title: "El Imperio Galileano",
          text: "Júpiter actúa casi como un sub-sistema solar debido a su masiva fuerza de gravedad, albergando oficialmente asombrosas 95 lunas. Las cuatro más formidables, documentadas por primera vez en 1610 por la agudeza óptica de Galileo Galilei (Ío, Europa, Ganímedes, Calisto), presentan formaciones astrofísicas asombrosas: desde el infierno de erupciones sulfúricas violentas en Ío hasta el vasto campo fértil de un potencial gran océano subterráneo abrigado en hielo dentro de Europa.",
          image: "/assets/galaxy.png",
          imgCaption: "La nave espacial Juno ha revelado misteriosos ciclones masivos organizados poligonalmente sobre los polos de Júpiter."
        }
      ],
      bibliography: [
        "Ingersoll, A. P. (1990). Atmospheric dynamics of the outer planets. Science.",
        "Guillot, T. (1999). Interiors of Giant Planets Inside and Outside the Solar System. Science.",
        "NASA Juno Mission Archives (2024). Jet Propulsion Laboratory."
      ]
    },
    quizEs: [
      { q: "¿Estructuralmente, qué es Júpiter?", options: ["Un planeta súper-rocoso", "Una inmensa esfera de hielo", "Un gigante de compuestos gaseosos (hidrógeno y helio)"], a: 2 },
      { q: "La Gran Mancha Roja es exactamente...", options: ["Un volcán expuesto", "Un inmenso anticiclón/tormenta de más de 300 años", "Una ilusión óptica marciana"], a: 1 },
      { q: "¿A quién se le atribuye el descubrimiento oficial astronómico de las 4 lunas mayores de Júpiter?", options: ["Johannes Kepler", "Galileo Galilei", "Isaac Newton"], a: 1 }
    ]
  },
  {
    id: 'saturn', order: 6, 
    titleEn: 'Saturn', titleEs: 'Saturno',
    badge: 'Ring Master', badgeEs: 'Maestro de los Anillos',
    color: '#E8D08D',
    contentEs: {
      sections: [
        {
          title: "La Joya Anillada de la Vía Láctea",
          text: "Saturno se erige como el sexto planeta alejado del sol, y retiene el escaño como el segundo gigante masivo tras de Júpiter. La joya de su corona astronómica radica sin duda en su extraordinario e infinito complejo estructural de anillos. Esta obra maestra de la estática y dinámica cósmica no es sólida, se segmenta virtualmente en múltiples bandas que albergan desde un polvo espectral finísimo hasta montañas de hielo gigantes y remanentes rocosos destrozados por fuerzas de la gravedad.",
          image: "/assets/cartoon_saturn.png",
          imgCaption: "Los anillos brillan dramáticamente porque sus partículas de hielo reflejan excepcionalmente bien la radiación solar incidente."
        },
        {
          title: "Paradoja de la Densidad",
          text: "Se define esencialmente por los mismos componentes hidrodinámicos que el sol (Hidrógeno/Helio). Un rasgo de suma peculiaridad teórica radica en su extremadamente inusual gravedad específica computada: cuenta con la relación masa/densidad generalizada más ínfima documentada planetariamente. ¡A un plano de escala mítica matemáticamente viable, si consiguieses encontrar un vaso o piscina colosal rellena puramente con H2O universal, Saturno virtualmente tendería a flotar sobre ella dócilmente!",
          style: "highlight"
        },
        {
          title: "El Enigma Titánico",
          text: "Es imperativo referenciar el dominio de lunas que regenta, de una contundencia superior oficial contabilizada a unas 146. Entre ellas la enigmática reina luna llamada `Titán`. Titán supera al diminuto astro de Mercurio en talla pura y conserva algo sumamente valioso científicamente enigmático—Es la única gran luna celestial referida provista de su robusta, niebla gruesa atmósfera originaria en adición de albergar extraños pero efectivos sistemas funcionales fluviales conformados enteramente por ríos superficiales de metano super congelados al estado físico fluyente, replicando una cuasi-química de la topografía Hidrológica terráquea primitiva.",
          image: "/assets/galaxy.png",
          imgCaption: "Representación conceptual del misterioso polo hexagonal atmosférico saturnino."
        }
      ],
      bibliography: [
        "Porco, C. C., et al. (2005). Cassini Imaging Science: Initial Results on Saturn's Rings and Small Satellites.",
        "NASA / JPL-Caltech (2024). Saturn System Planetary Data Exploration.",
        "Lorenz, R., & Mitton, J. (2008). Titan Unveiled: Saturn's Mysterious Moon Explored. Princeton Univ. Press."
      ]
    },
    quizEs: [
      { q: "¿En su núcleo, primariamente de qué materia se compone el colosal sistema de anillos que rodean a Saturno?", options: ["Hierro líquido y platino puro fundidos", "Micro-fragmentos de hielo, detritos cristalinos comela y formaciones heladas roca", "Puro vapor condensado"], a: 1 },
      { q: "¿En un plano matemático teórico hipotético referenciado por su extremada inconsistencia en nivel de densidad molecular general, que le procedería físicamente al orbe re-insertado localmente en gigantesco estanque acuífero de H2O terráqueo?", options: ["Sumergimiento estrepitoso por atracción y contracción centralizada instantánea", "Levitaría boyantemente experimentando una fuerza de flotación total sináptica", "Implosionaría nuclear y espontáneamente"], a: 1 },
      { q: "¿Cuál se corrobora como un distintivo particular excepcional comprobado verídicamente poseído por Titán?", options: ["Ciclo Hidrológico alterno operante en forma fluida liquida de metano junto densidad de estratos atmosférica original inalterablemente robusta ", "Mantiene vida terrestre humana artificial comprobada", "Esfera térmica volcánica pura envuelta de gas acido puro"], a: 0 }
    ]
  },
  {
    id: 'uranus', order: 7, 
    titleEn: 'Uranus', titleEs: 'Urano',
    badge: 'Ice Rebel', badgeEs: 'Rebelde Helado',
    color: '#66C6DF',
    contentEs: {
      sections: [
        {
          title: "El Gigante Inclinado",
          text: "Urano, el séptimo planeta en procesión alejada desde nuestro Sol, conforma la familia de los Gigantes Hielo. Adopta una característica tonalidad azulada iridiscente distintiva que emana orgánicamente del metano espectral gaseoso remanente que se aloja latente de forma superficial externa tras sus densas capas congeladas.",
          image: "/assets/cartoon_uranus.png",
          imgCaption: "Su color particular deriva del metano que filtra selectivamente la luz roja absorbiéndola al completo."
        },
        {
          title: "Rotación Horizontal",
          text: "Lo que hace inconfundible físicamente de forma singular en el plano del cosmos universal a la entidad masiva de Urano es la insólita configuración inclinatoria axial de su rotación extrema (Aparición física inclinación orbital equivalente aproximado 97.77 grados absolutos). Giratoriamente interactúa 'de lado', como barril esférico rodando su eje sobre una órbita polar al plano del Sol perpetuándose de forma paralela inalterablemente peculiar. Lo cual consecuentemente le confiere estaciones heladas árticas inestablemente extremas expuestas larguísimos plazos ininterrumpidos.",
          style: "highlight"
        }
      ],
      bibliography: [
        "NASA Voyager 2 Data System Archives (1986).",
        "Smith, B. A., et al. (1986). Voyager 2 in the Uranian System: Imaging Science Results.",
        "Guillot, T. (2005). The interiors of giant planets: Models and outstanding questions."
      ]
    },
    quizEs: [
      { q: "¿De donde procede científicamente probado el color tan peculiar intensivo azul/celeste superficialmente visto sobre el panorama visible atmosférico visual documentado de Urano?", options: ["Por el abundante mar superficial líquido cubriéndole enteramente a forma total", "Desde el elemento en gas natural Metano presente interactuante entre las brisas gélidas altas esféricas", "Cielos perpetuamente teñidos orgánicos por reflejos auroras permanentes polares colosales"], a: 1 },
      { q: "¿Por cuál particularidad se singulariza radicalmente notada extrañamente a forma de movimiento general de rotación mecánica Urano relativo hacia la mayoría restante comparada habitante sobre el Sistema Solar?", options: ["No posee rotación definida calculable matemáticamente", "Posee doble rotación polarizada al inverso simultáneo inalterado asincrónicamente", "Eje axial con extremis de inclinación polar colosal rodando horizontal girando de forma de paralela transversal a nivel orbital a lado aparente."], a: 2 }
    ]
  },
  {
    id: 'neptune', order: 8, 
    titleEn: 'Neptune', titleEs: 'Neptuno',
    badge: 'Storm Chaser', badgeEs: 'Cazador de Tormentas',
    color: '#3258A6',
    contentEs: {
      sections: [
        {
          title: "Gélido Extremo Periférico Azulado",
          text: "El astro planetario masivo lejano categorizado oficial mayoritario que delimita e impone colateral frontera inexplorada a las periferias internas finales al confín en nuestra estructura local compartida. Resulta característicamente sombrío, heladizo, enclaustrado infinitamente batallando ráfagas atmosféricas cortantes de tipo extremidades aerodinámicas desproporcionadamente supersónicas letales.",
          image: "/assets/cartoon_neptune.png",
          imgCaption: "Astro extremo del sistema que oculta huracanes gélidos catastróficos invaluablemente dinámicos."
        },
        {
          title: "Triunfo de Cálculo en Teoría y Papel ",
          text: "A nivel histórica su historia posee de origen una faceta notable del todo incomparable. Su confirmación presencial, es decir hallazgos de detección física óptica oficial documentada (Con la ayuda del investigador Johann Galle el año 1846 terrestre calendario civil histórico), ¡Resulto tras predicciones predeterminación y deducción netamente de formula base matemática abstracta analítica prevenida deductiva calculada! Urbain Le Verrier y John Couch postularon las desvíos de Urano pre predichos certeros apuntando de forma concluyente indiscutida ubicación su destino antes de su enfoque por el globo visor de Galileo del cielo cristalino.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Hubbard, W. B. (1997). Neptune's Deep Chemistry. Science.",
        "Moore, P. (2004). The Data Book of Astronomy. CRC Press.",
        "Cruikshank, D. P. (Ed.). (1995). Neptune and Triton (Vol. 1). University of Arizona Press."
      ]
    },
    quizEs: [
      { q: "¿Por qué acontecimiento científico documentado Neptuno brilla de forma de orgullo con galardón único destacándolo en la recolección astrofísica académica sobre listados en investigación universal astros conocidos general primarios solares ?", options: ["Descubierto analíticamente base abstractamente teórica de forma por medio de la matemática predicción previa pura en papel libreta en lugar de de ser primigeniamente de rastreo aleatorio puramente óptico instrumental presencial de visión astronómico.", "Resulta siendo primer globo físico inter galáctico habitable descubierto transpasando y rompiendo el margen limites de sol cósmico vecinal interno local", "Contiene núcleo vivo alien micro orgánico documentado empíricamente a la superficie estricto confirmando"], a: 0 },
      { q: "¿Cuál extremo o peculiaridad meteorológicamente medido se cataloga indiscutible en torno general particular climatología mas destacable documentado satélite internauta sondeando sobre de Neptuno  ?", options: ["Lluvia cristalina permanente calórica hirviente ácida de disolvente en cascada libre por los anillos expuestos exteriores de rotaciones eternas superficiales .", "Vientos desmesurados tempestivos ráfagas cortantes turbulentas de magnitudes ciclón supersónicas que aventajan a todos récords documentados de mediciones solares globales referidas registradas.", "Aridez máxima extrema donde toda fluctuación climática carece a ser cero paralizado estático sin de presión movientes térmica "], a: 1 }
    ]
  },
  {
    id: 'pluto', order: 9, 
    titleEn: 'Pluto', titleEs: 'Plutón',
    badge: 'Dwarf Star', badgeEs: 'Estrella Enana',
    color: '#D1A3B4',
    contentEs: {
      sections: [
        {
          title: "El Valiente Enano Solitario del Límite",
          text: "Constituido y oficializado estructuralmente a forma de objeto transneptuniano morador perpetuo helado a través vasta sombra en los dominios confines remotos renegados fronterizo general, albergado tras lecho de residuos glaciales inter estelares primitivo a periferia anillado conocido Cinturón formal de los residuos rocosos hielo de Kuiper.",
          image: "/assets/cartoon_pluto.png",
          imgCaption: "Misterioso astro helado re-visitado épicamente por la milagrosa y heroica sonda New Horizons asombrándonos a lo largo por fin presencialmente sin de filtros desenfoques borrosos visual en resolución histórica en 2015 en vuelo límite periférico."
        },
        {
          title: "Controversia en Definición Categórica",
          text: "Al someter al escrutinio formal y debatir criterios bajo el margen puramente de la academia internacional regida base universal consenso normativo estricto y en junta histórica Unión evaluativa (IAU asamblea del 2006 terrestre astronómica unificada reguladora), procedió a dictaminarse con dureza recategorizarlo perdiendo así escaño histórico titularidad catalogación de listados de orbe estelar masivo 'Planeta Mayor', relegando estado formal de menor peso en etiqueta nominativa hacia 'Planeta tipo Enano', al no dominar totalmente despejado la influencia o dominio de escombros compartida dentro de los ejes inter orbitales cruzantes del límite masivo.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Stern, S. A., et al. (2015). The Pluto system: Initial results from its exploration by New Horizons. Science.",
        "Meltzer, M. (2015). The Pluto System After New Horizons. Planetary Science Journal.",
        "IAU (2006). Resolution B5: Definition of a Planet in the Solar System. International Astronomical Union."
      ]
    },
    quizEs: [
      { q: "¿Conforme actual oficial categorización dictaminada el 2006 qué tipo de titulación oficial cuerpo celeste y de designación estatus ostenta Plutón en catálogos?", options: ["Gran Orbe Exoplaneta masivo foráneo del externo cosmos libre gravitacional ", "Oficialmente Estrellado Sol menor congeladamente en inactividad termo binario sin chispa apagado", "Cuerpo Astro rocoso hielo categorizado científicamente definido a Planeta de formato Enano delimitado a orbita externa Cinturón formal espacial"], a: 2 },
      { q: "¿A qué región espacial colosal se atribuye referenciado que está insertado geolocalicemos en origen residencia al orbe transneptuniano Plutón vagando perpetua sombra helando?", options: ["Rueda anillos gélida Saturnina orbita cruzada anillo", "La nube interestelar interior de colisiones ígneas inter magnéticas radiadas", "Anillo exterior masivo glacial escombro restos primitivo referido como el Cinturón Kuiper fronterizo perimetral"], a: 2 }
    ]
  }
];
