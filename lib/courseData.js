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
          image: "/assets/mercury_extremes.png",
          imgCaption: "El vacío del espacio no retiene la radiación calórica, provocando congelamiento nocturno en una de sus caras."
        },
        {
          title: "Exploración Orbital: MESSENGER",
          text: "Dada su cercanía con el Sol, explorar Mercurio es un enorme desafío gravitacional e ingenieril. La sonda Mariner 10 de la NASA fue la primera en visitarlo en 1974, pero fue la misión MESSENGER (2004-2015) la que orbitó exhaustivamente el planeta, revelando presencia de hielo de agua en los cráteres profundos de sus polos, donde la luz solar directa nunca llega.",
          style: "highlight"
        },
        {
          title: "Danza Orbital y Resonancia",
          text: "La órbita de Mercurio es altamente elíptica, la más excéntrica de todo el sistema solar. Presenta una resonancia de espín-órbita única de 3:2, lo que significa que por cada dos órbitas que completa alrededor del Sol, gira exactamente tres veces sobre su propio eje. Si estuvieras de pie en la superficie correcta, verías el Sol salir, detenerse en el cielo, retroceder y volver a avanzar hacia el ocaso.",
          image: "/assets/mercury_orbital_resonance.png",
          imgCaption: "El Sol aparenta detenerse y retroceder en el negro cielo de Mercurio debido a su resonancia 3:2.",
          style: "normal"
        },
        {
          title: "Ausencia de Estaciones y Magnetismo",
          text: "Debido a que el eje de rotación de Mercurio tiene una inclinación de apenas 2 grados, carece de verdaderas estaciones (primavera, verano, otoño, invierno) como las experimentamos nosotros. Misteriosamente, a pesar de su tamaño recesivo, Mercurio genera un campo magnético global activo, una rareza astronómica para cuerpos de roca sólida.",
          style: "highlight"
        },
        {
          title: "El Futuro: BepiColombo",
          text: "Actualmente, la sonda BepiColombo (una misión inter-agencia liderada por la Agencia Espacial Europea ESA y la JAXA japonesa) está volando en trayectorias espirales complejas y llegará a establecerse en la órbita de Mercurio en 2025. Los científicos confían en que sus sofisticados láseres barrerán la superficie resolviendo las formaciones huecas llamadas 'hollows'.",
          image: "/assets/bepicolombo_probe.png",
          imgCaption: "El orbitador fotorealista barre la topografía en busca de hielo en los cráteres oscuros."
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
          image: "/assets/venus_volcanoes.png",
          imgCaption: "Paisaje volcánico inhóspito bajo las densas nubes de ácido sulfúrico venusiano."
        },
        {
          title: "Misiones Soviéticas Venera",
          text: "Durante la Guerra Fría, mientras la carrera espacial miraba a la Luna, la extinta Unión Soviética logró la heroica y poco conocida tarea de aterrizar sobre Venus con el programa Venera. Las sondas espaciales soportaron la abrumadora presión de 90 atmósferas y los ácidos letales, enviando de vuelta las únicas fotografías físicas reales de la costra de lava dorada antes de fundirse a los pocos minutos de operación.",
          image: "/assets/venera_probe_venus.png",
          imgCaption: "La heroica y letal travesía de las sondas soviéticas hacia el infierno aplastante.",
          style: "normal"
        },
        {
          title: "Efecto Invernadero como Advertencia Climática",
          text: "Venus es ampliamente estudiado como un laboratorio astrofísico en la vida real sobre cómo un planeta puede volverse inhóspito si el clima colapsa. Su atmósfera densa es principalmente Dióxido de Carbono atrapando radiación letal sin posibilidades de refracción, una advertencia contundente del cambio climático extremo.",
          style: "highlight"
        },
        {
          title: "Posibilidad de Vida en las Nubes",
          text: "Recurriendo a las capas altas de su atmósfera, las temperaturas venusianas se tornan inesperadamente agradables y la presión disminuye, casi como el aire de nuestro planeta terrestre. En la misma década reciente investigadores detectaron trazas de gases orgánicos en las colosales nubes reavivando un audaz debate astrobiológico.",
          image: "/assets/venus_sulfuric_clouds_thick.png",
          imgCaption: "Existen bacterias extremófilas que podrían subsistir en los estratos sulfúricos superiores."
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
          image: "/assets/earth_tectonics.png", 
          imgCaption: "Flujos de magma incandescente impulsan el movimiento tectónico creando nuevas formaciones geológicas."
        },
        {
          title: "Agua en los Tres Estados Vitales",
          text: "Una peculiaridad biológicamente milagrosa de la Tierra es que se ubica exactamente en la 'Zona Ricitos de Oro', permitiendo no solo albergar agua, sino hacerlo coexistir de forma perpetua en sus tres estados fundamentales físicos: sólidos glaciares en los polos árticos criogénicos, inmensos mares líquidos que abarcan el monumental 71% del globo e invisibles nubes de vapor acuoso entrelazando la troposfera meteorológica.",
          image: "/assets/earth_water_states.png",
          imgCaption: "La sincronía perfecta de los estados acuosos es el motor único geofísico.",
          style: "normal"
        },
        {
          title: "El Escudo Magnético y las Auroras",
          text: "El gigantesco núcleo fundido rico en metales que rota intensamente casi como un dínamo geológico bajo nuestros pies oscuros, otorga un paraguas invisible infranqueable: la Magnetósfera. Más allá de orientar nuestras agujas de navegación náutica apuntando eternamente de norte a sur, esta armadura elástica absorbe físicamente la descarga cósmica. Cuando los haces eléctricos solares rebotan contra este anillo e inyectan energía directa a los polos opuestos, vemos brillar ilusoriamente Auroras Boreales.",
          image: "/assets/earth_auroras_space.png",
          imgCaption: "La radiación solar es interceptada dramáticamente iluminando fluorescencias verdes boreales.",
          style: "highlight"
        },
        {
          title: "Biosfera Única y Ecosistemas Entrelazados",
          text: "A diferencia de las ríspidas llanuras muertas del crudo vecindario marciano, nuestra cúpula verde rebosa de insaciable dinamismo microscópico y salvaje. La macro oxigenación primordial que diseñaron en silencio milenario las antiguas cianobacterias sembró ecosistemas que dependen simbióticamente unos del otro creando intrincadas cadenas genéticas planetarias vivas.",
          style: "normal"
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
          image: "/assets/mars_ancient_oceans.png",
          imgCaption: "Múltiples estudios de la NASA postulan que el joven planeta rojo poseía ecosistemas acuáticos estables."
        },
        {
          title: "Tormentas de Polvo Globales",
          text: "El clima marciano es sumamente violento durante los cambios estacionales. Debido a su atmósfera delgada y rápidas fluctuaciones térmicas, se generan tormentas de fino polvo de óxido de hierro que pueden escalar monumentalmente hasta envolver el planeta entero durante meses. Estas tormentas bloquean casi en su totalidad el paso de la luz solar a la superficie, lo que ha provocado apagones técnicos definitivos en sondas exploratorias robóticas alimentadas por energía solar.",
          image: "/assets/mars_dust_storm.png",
          imgCaption: "Estas bestias meteorológicas apocalípticas oscurecen su totalidad deteniendo máquinas.",
          style: "normal"
        },
        {
          title: "Los Compañeros Fobos y Deimos",
          text: "Marte está escoltado en su solitaria órbita escarpada por dos lunas deformes y oscuras llamadas Fobos (Miedo) y Deimos (Pánico). La comunidad de astrofísica planetaria sostiene que ambos cuerpos menores no se formaron simultáneamente con el planeta madre, sino que en su lugar son transeúntes errantes, asteroides antiguos capturados furtivamente desde el cinturón de asteroides por el campo de la masiva atracción gravitatoria marciana en su infancia astrofísica.",
          style: "highlight"
        },
        {
          title: "El Futuro: Colonización Humana",
          text: "El escenario cumbre del siglo 21 proyecta la inserción biológica humana permanente en el hostil mundo marciano. Este audaz prospecto choca directamente contra letales adversidades ambientales tales como la inclemente radiación espacial perjudicial propiciada por la carencia de escudo magnético y temperaturas congelantes extremas. La naciente bio-ingeniería, junto a las agencias aeroespaciales en unísono global intentan diseñar bio-domos habitables para cristalizar esta hazaña pionera.",
          style: "normal"
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
          image: "/assets/jupiter_cyclones.png",
          imgCaption: "Tomas infrarrojas revelan masivos ciclones geométricos formados sobre los polos jovianos."
        },
        {
          title: "El Escudo Soberano (Shoemaker-Levy 9)",
          text: "A nivel macrocósmico, el monumental índice de atracción gravitacional perpetuo ejercido por la gran y profunda masa térmica de Júpiter le acredita como el protector máximo de la Tierra. Atrae o desvía violentamente peligrosos asteroides y cometas perdidos. Un evento memorable de altísimo nivel ocurrió en 1994, cuando la comunidad astronómica humana atestiguó aterrada el catastrófico impacto en el que los fragmentos letales del descomunal cometa Shoemaker-Levy 9 se precipitaron contra los estratos gaseosos superiores de Júpiter desgarrando su atmósfera.",
          image: "/assets/shoemaker_levy_jupiter.png",
          imgCaption: "Los fragmentos colapsaron generando hongos incandescentes más grandes que nuestra Tierra.",
          style: "normal"
        },
        {
          title: "Núcleo y Océanos Metálicos",
          text: "Avanzando hipotéticamente a las ultra-profundidades por debajo de las tumultuosas cortinas gaseosas de las nubes visibles surcadas por fuertes descargas eléctricas ruidosas, los físicos teorizan que el hidrógeno puro gas es triturado y presurizado implacablemente bajo presiones apocalípticas transicionando exóticamente formándose todo un vasto océano electrificado hirviente compuesto enteramente de Hidrógeno Metálico líquido, donde la física estándar flaquea abrumadoramente.",
          style: "highlight"
        },
        {
          title: "Auroras y Dinamo Magnético",
          text: "El movimiento vertiginoso de rotación más frenético de nuestro sistema (un día joviano demora únicamente diez escasas horas terrestres), orquestado con su denso núcleo fluido metálico, alimenta el dínamo más arrollador electromagnético colosal circundante en las inmediaciones del vecindario del Sistema Solar. Enormes polos lumínicos de auroras violetas irradian energía cruda incesantemente provocando cinturones radiactivos tan extremos mortales que freirían instantáneamente las naves no protegidas con escudos protectores formidables.",
          style: "normal"
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
          image: "/assets/saturn_titan_landscape.png",
          imgCaption: "Lagos y ríos formados por elementos de metano deambulan bajo la pesada y espesa atmósfera dorada de Titán."
        },
        {
          title: "El Hexágono Polar Norte",
          text: "Si se sobrevuela directamente la cima térmica del hemisferio superior septentrional polar del gigante Saturno, las intrusivas sondas visuales ópticas revelan estupefactas el remolino magnético en forma de un hexágono milimétricamente geométrico exacto de magnitudes inverosímiles, abarcando una dimensión aproximada el doble de extensión al de la Tierra. Este flujo vorticial de viento masivo rotatorio eterno gira ferozmente a incontables velocidades de vértigo superando a los peores huracanes físicos teóricos terrestres.",
          style: "normal"
        },
        {
          title: "Las Fuentes Acuáticas de Encélado",
          text: "Una luna minúscula en la órbita cercana pero revestida primariamente con un cegador resplandeciente e impoluto exterior y corteza congelada reluciente de hielo denso, ostenta un secreto formidable subsuperficial interior biológicamente fascinante: Almacena ininterrumpidamente formidables depósitos hidro-termales profundos de océanos líquidos globales candentes impulsados a través de masivos agujeros activos, emitiendo ráfagas gigantescas constantes violentas a velocidades colosales eyectando material agua líquida gélida a los vacíos infinitos externos fríos de su propia órbita saturnal dotando del suplementario alimento al sistema anillo `E` mismo circundante.",
          image: "/assets/enceladus_geysers.png",
          imgCaption: "Poderosos géiseres expulsan agua cálida del inmenso océano infernal debajo de la luna.",
          style: "highlight"
        },
        {
          title: "El Exquisito Fin de la Sonda Cassini",
          text: "Después de innumerables órbitas ricas revelando espectaculares misterios asombrosos estructurales planetarios, tras concluir agotados sus cuantiosos suministros de escaso oxígeno y propulsores, el heroico gran robot espacial terrestre explorador oficial conocido gloriosamente como `Cassini` realizó la fase inmoladora definitiva Gran Final. Mediante trayectorias de un suicidio quirúrgicamente trazado ordenado científicamente por prevención para nuca mancillar con microorganismos terrenales los mundos de lunas susceptibles a vida alienígena adyacentes, procedió su noble inmersión calórica desintegradora incandescente abrazando el gigante gaseoso espeso Saturno.",
          style: "normal"
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
        },
        {
          title: "El Sistema de Anillos Negros",
          text: "Contrario a la creencia popular de que Saturno es el único poseedor de aros, Urano mantiene bajo su órbita gravitacional un complejo y sumamente oscuro sistema de anillos concéntricos. Se sospecha ampliamente por la comunidad cosmológica que estas bandas opacas emergieron de incontables fragmentos colisionales originados por impactos de exoplanetas y meteoros destructores acontecidos eones atrás en su génesis temprana.",
          image: "/assets/uranus_rings.png",
          imgCaption: "Múltiples lunas pequeñas residen como pastoras entre los anillos sombríos uranianos."
        },
        {
          title: "El Primer Planeta Descubierto por Telescopio",
          text: "A diferencia de los mundos clásicos como Mercurio o Júpiter, que han sido observados meticulosamente desde la antigüedad por civilizaciones pioneras sin requerimiento amplificador, Urano es demasiado tenue. Fue astronómicamente coronado e ingresado en los registros en el revolucionario año de 1781 gracias al ilustre ingenio óptico del astrónomo Sir William Herschel, quien en un inicio teorizó haber divisado únicamente un pequeño cometa.",
          image: "/assets/herschel_telescope_space.png",
          imgCaption: "Herschel asombró al mundo revelando al gigante tenue detrás de los clásicos.",
          style: "normal"
        },
        {
          title: "Lunas Literarias de Shakespeare",
          text: "Urano rige e impone su danza gravitacional sobre una colección confirmada de 27 lunas orbitantes naturales. Como curiosidad antropológica astronómica, a estas piezas no se les bautizó siguiendo el estándar dogmático estricto del vasto canon mitológico panteísta formalizado griego o del panteísmo grecorromano, rindiéndole tributo en contraposición netamente a las famosas producciones artísticas y clásicas de William Shakespeare y del ingenio poético de Alexander Pope.",
          style: "highlight"
        },
        {
          title: "Radiación Térmica Interna Cero",
          text: "El enigma maestro del cuerpo de hielo radia en que este espectro gaseoso gigantesco resulta estar peculiarmente desprovisto térmicamente inactivo desprendiendo niveles ridículamente diminutos irrelevantes casi carentes por entero comparados de radiación remanente térmica desde las recónditas extremidades de sus profundidades insondables de su propio lecho base núcleo hacia su superficie superior en drástico disonante contraste de la fogosa emanancia de mundos hermanos gigantes.",
          style: "normal"
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
        },
        {
          title: "Tritón y el Vulcanismo Helado",
          text: "Neptuno posee a Tritón, su satélite más colosal, caracterizado absurdamente por poseer una rotación sincrónica pero retrograda (orbitando al revés respecto al giro neptuniano). Las asombrosas fotos espectrográficas han detectado múltiples géiseres activos, erupciones y conductos que componen un particular sistema de 'Crio-vulcanismo' (Lanzando furiosamente ráfagas de nitrógeno y granito de hielo en lugar de ardiente lava derretida al vacío orbital exterior).",
          image: "/assets/neptune_triton.png",
          imgCaption: "Tritón desafía toda la mecánica solar convencional rotando en un patrón gravitacional inverso."
        },
        {
          title: "Lluvia de Diamantes en el Núcleo",
          text: "Se ha teorizado analíticamente a niveles comprobables de experimentación física por astrofísicos moleculares, que las insoportables aplastantes atmósferas y densidades hiper extremas alojadas dentro del infierno térmico gaseoso de su núcleo comprimido actúan implacablemente apretando brutalmente todas las cadenas ricas carbonadas del espectro gaseoso circulatorio del metano inmenso al nivel atómico fusionándolas provocando directamente verdaderas literales e interminables cascadas colosales llovedizas precipitantes densas ráfagas sólidas físicas repletas de diamantes estructuralmente preciosos cayendo directamente al centro global masivo del orbe gigante acuoso inexplorado inalcanzable planetario exterior masivo del Sistema Solar.",
          image: "/assets/neptune_diamond_rain.png",
          imgCaption: "Las cadenas químicas se carbonizan bajo presión lloviendo literalmente cristales sólidos hermosos.",
          style: "normal"
        },
        {
          title: "El Vórtice Oscuro y Fuga Dinámica",
          text: "La honorable heroica robótica nave humana bautizada 'Voyager 2' durante el hito cruzante espacial asombroso de sus trayectorias logró enfocar una escalofriante anomalía gigantesca documentada en el manto nublado denso colosal en constante agitación. Conocida simplemente bajo la enigmática temida catalogación 'Mancha Oscura Vórtice Gigante Neptuniano', representando un monstruoso ojo de alta presión devorando sistemas enteras nubes circundantes. No obstante, al dirigir el Telescopio Espacial Hubble apuntar su óptica majestuosamente magistral hacia aquella violenta anomalía tan solo escasos años rotatorios tras la sonda Voyager, dicho masivo remolino de ciclones negros destructivos ya no existía más esfumado desvaneciéndose misteriosamente confirmando la caótica fluidez aerodinámica letal impredecible inmensa viva del manto planetario gaseoso masivo azul gigante exterior del confin perimetral helado alejado fronterizo.",
          style: "highlight"
        },
        {
          title: "Ausencia de Exploradores Propios",
          text: "Dada la extrema lejanía desmesurada al Sol que experimenta el mundo de Neptuno resulta desgarradoramente irónico comprobar científicamente el asombroso hecho inaudito oficial confirmatorio que a día presente, no existe ni sola misión de tipo explorador orbitante permanente construida financiada por la comunidad inter espacial agencial global abocada únicamente en destripar las verdades absolutas sumergidas misteriosas escondidas debajo las infinitas densas capas glaciales gélidas atmosféricas repletas de cristales letales turbulentas remolinadas violenta y salvajemente resguardando de extremo celo los masivos mares mantos líquidos presurizados eternamente perpetuamente inexplorados oscuramente desconocidos profundos neptunianos misteriosos ocultos silenciosamente bajo ráfagas cegadoras espaciales remanentes eternas.",
          style: "normal"
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
        },
        {
          title: "El Corazón Helado (Tombaugh Regio)",
          text: "Sorprendentemente desafiando todas las expectativas, la misión formal New Horizons fotografió por primera vez a este astro, develando que Plutón no es apenas una bola muerta y hueca, sino un planeta maravillosamente activo en cuestión geológica. Presenta glaciares resbaladizos flotantes de metano hiperdenso, montañas filosas construidas íntegramente en base cristalina de H2O solidificada, y una enorme llanura estéticamente perfilada en forma visual inconfundible de 'Corazón' conocida por el nombre oficial de Región Tombaugh.",
          image: "/assets/planet_pluto_1774880158286.png",
          imgCaption: "El lóbulo liso de Plutón revela indicios fascinantes de reciclaje geológico activo sub-superficial."
        },
        {
          title: "Composición Acuífera Superior",
          text: "Por extraño que parezca e instintivamente contrario al sentido común en contra del árido mundo rocoso alejado y castigado infinitamente letal por el frio, el análisis masivo compositivo físico de Plutón indica densidades con formales confirmaciones que atesora e integra inmensamente el triple porcentaje voluminoso proporcionalmente global del preciado oro cósmico vital agua biológica que todas reservas enteras hídricas documentadas sumadas de nuestra masiva Tierra azul entera juntas.",
          image: "/assets/pluto_tombaugh_regio_2.png",
          imgCaption: "Una imagen legendaria donde Plutón porta su inmenso núcleo congelado como Corazón.",
          style: "normal"
        },
        {
          title: "Atmósfera Fantasma Sublimante",
          text: "Un comportamiento exótico espectacular que domina drásticamente su letal entorno atmosférico ocurre dictado fiel por el baile irregular escarpado y lejano ovalado excéntrico extenso inter órbita estelar solar. Al acortar brechas calóricas orbitando mas cerca cálida y amigablemente aproximada del radiador candente Sol la misma capa gaseosa tenue sublimando mágicamente la roca re aparece generando espesa capa densa nitrógeno puro. Acto luego alejándose orbitando en invierno infinito oscurecido masivo la remite congelar precipitante re compactando hielo en la corteza rocosa plana dura.",
          style: "highlight"
        },
        {
          title: "El Gigante Vencido por Eris",
          text: "El exilio controversial famoso categórico plutioniano y ex-comulgador masivo publico mediático controversial de la categoría magna regente a ser enmarcado por siempre Planeta mayor tuvo detonador final causante empírico absoluto inequívoco. Con el hallazgo del cuerpo planetario catalogado formal Eris mas pesado físicamente y macizo anidado igual a él vagando solitario libre profundo perdido y habitante remoto errante vecino del gigante anillo Kuiper en sus confines escombros hielo polvo estela cosmopolita demostró no ser gobernante local total masivo único, empujando la academia unificar las bases de 'Enanos'.",
          style: "normal"
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
  },
  {
    id: 'black_hole', order: 10, 
    titleEn: 'Black Hole', titleEs: 'Agujero Negro',
    badge: 'Singularity', badgeEs: 'Singularidad',
    color: '#FF6B00',
    contentEs: {
      sections: [
        {
          title: "El Monstruo Invisible del Cosmos",
          text: "Imagina un gigantesco abismo en el tejido estelar con un poder de absorción gravitacional tan inconmensurablemente bestial que ni siquiera el mismísimo y rápido haz de luz, la entidad de mayor galope del universo, logra escapar de sus fauces opresivas. Al sobrepasar la misteriosa barrera orbital llamada 'Horizonte de Sucesos', la oscuridad traga por la eternidad a toda civilización, polvo o astro en una singularidad de energía y leyes físicas rotas.",
          image: "/assets/black_hole_singularity.png",
          imgCaption: "Una ilustración que retrata el centro colapsado implacable de un vórtice singular."
        },
        {
          title: "El Horizonte de Sucesos",
          text: "Este límite representa literal y trágicamente el inminente e irreversible punto de 'No Retorno'. Cualquier astronave comandante intrépido que raye escasamente dicha línea invisible fronteriza pasará irremediablemente suplicando a caer al interior triturador del agujero negro eternamente, sin importar que empuje sus hiper-propulsores hacia atrás. La frontera distorsiona el tiempo; desde afuera parecería el naufragio suspendido en cámara lentísima, perdiéndose difusamente.",
          style: "highlight"
        },
        {
          title: "Fenómeno de Espaguetización",
          text: "Las fuerzas de arrastre provocadas y multiplicadas por densidades negras inagotables resultan tan radicales que producen efectos que estiran mortalmente a las leyes de la física, bautizado cómicamente por los científicos como 'Espaguetización'. Un cuerpo precipitándose experimentaría que su base es halada millones de magnitudes más fuerte que la parte superior provocando elástico despedazamiento hasta transformarse en polvo.",
          image: "/assets/black_hole_spaghettification.png",
          imgCaption: "Representación conceptual de materia siendo arrastrada hacia el abismo insaciable.",
          style: "normal"
        },
        {
          title: "La Singularidad Central",
          text: "En el mismísimo y oscuro corazón yace el indescifrable misterio del cosmos nombrado puramente como 'Singularidad'. Se trata de un punto matemático exacto infinitamente diminuto de cero milímetros, en él se aprieta la masa triturada equivalente a miles de millones de astros o soles fusionados, rompiendo quebrantando con las ecuaciones del espacio y colapsando el plano geométrico del tiempo y universo conocido sin retorno alguno.",
          style: "highlight"
        },
        {
          title: "El Descubrimiento Humano",
          text: "A pesar de existir eternos invisibles oscuros engañosamente escondidos sin emitir un destello lumínico perceptible para los instrumentos ópticos del ojo humano, los radiotelescopios majestuosamente gigantes lograron finalmente 'fotografiar' en los últimos años un colosal agujero negro. Captaron exitosamente el anillo ardiente y turbulento de fuego plasmático circundante, dibujando revelando visual la silueta opaca al centro.",
          image: "/assets/black_hole_event_horizon.png",
          imgCaption: "La galaxia conteniendo agujeros supermasivos devorando su área perimetral.",
          style: "normal"
        },
        {
          title: "Choques Titánicos",
          text: "Las colosales dimensiones asombrosas a veces obligan irremediablemente al impacto. Cuando un par espiral o sistemas binarios de agujeros negros chocan bailan mortales vueltas estelares en milenarias coreografías giratorias acercándose inminente sin piedad terminando impactando y sacudiendo fundiéndose el tejido entero universo, causando perturbaciones temblorosas conocidas universalmente como elusivas pero reales ondas gravitacionales en todo lado.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Hawking, S. (1988). A Brief History of Time.",
        "Kip Thorne (2014). The Science of Interstellar.",
        "LIGO Scientific Collaboration (2016). Observation of Gravitational Waves from a Binary Black Hole Merger."
      ]
    },
    quizEs: [
      { q: "¿Científicamente, qué viaja suficientemente veloz como para fugarse cruzando del letal y siniestro 'Horizonte Sucesos' que corona a los agujeros cósmicos?", options: ["Las ondas puras magnéticas radiales emitidas bajo presión.", "Nada documentado, ni la luz lumínica pura más rápida material escapa a esa trampa.", "Los fotones impulsados reactivamente atómicos lumínicos energizados en ráfagas."], a: 1 },
      { q: "¿Cuál es el apodo asombroso dentro la comunidad astrofísica al fatal destino por despedazamiento elástico destructivo provocado por diferencias enormes de la gravedad masiva?", options: ["Descomposición atómica.", "Espaguetización de cuerpos.", "Fisura espacio-tiempo estructural."], a: 1 },
      { q: "¿Qué nombre bautiza y señala al centro estricto del agujero donde colapsan las matemáticas y se aplasta el universo sin reglas?", options: ["Singularidad gravitacional infinita.", "Núcleo plasmático inerte oscuro.", "Cota de densificación asfixiante termal."], a: 0 }
    ]
  },
  {
    id: 'quasar', order: 11, 
    titleEn: 'Quasar', titleEs: 'Cuásar',
    badge: 'Hyperactive Core', badgeEs: 'Faro Cósmico',
    color: '#00E4FF',
    contentEs: {
      sections: [
        {
          title: "El Faro Cegador Intergaláctico",
          text: "Concebidos estelarmente de una violenta contradicción, un Cuásar brota curiosamente cuando en el corazón ardiente devorador de una galaxia interactiva gigantesca, un inmenso y rebelde Agujero Negro Súper-masivo se 'alimenta' caóticamente devorando mas gas estelar al ritmo salvaje e insoportable que las capacidades de entrada y densas magnitudes pueden sostener eficientemente.",
          image: "/assets/quasar_1.png",
          imgCaption: "Un núcleo extremadamente activo empujado al límite de la capacidad devoradora galáctica."
        },
        {
          title: "Chorros de Plasma y Energía",
          text: "Al atascarse tragando ese caótico festín desbordante masivo de cometas gasificados fundidos girando desorbitadamente en espiral caliente, el disco brillante circundante eyecta furiosamente disparando perpendiculares e imponentes chorros hiper ruidosos letal láser purificadores. Esta radiación resulta tan cegadora e intensa cruzando miles billones magnitudes lumínicas que logran ahogar eclipsando brillantes al total colectivo acumulado luz de las estrellas nativas anfitrionas.",
          style: "highlight"
        },
        {
          title: "Cápsulas del Tiempo Remoto",
          text: "Alcanzando brillos monumentales exorbitantes que cruzan impunes todo el tejido universal conocido, estos faros exóticos viajan hacia la base planetaria tierra sirviendo invaluable y asombrosamente a los curiosos astrónomos terrestres para contemplarlos usándolos de referencia visual permitiendo medir indagar investigar sondear y leer sobre como nacían brutalmente galaxias primitivas del distante inicio nacimiento ancestral remoto espacio.",
          image: "/assets/quasar_2.png",
          imgCaption: "Mirar a un Quásar es equivalente a un vistazo al universo primitivo joven.",
          style: "normal"
        },
        {
          title: "Motores Devoradores Insaciables",
          text: "El ritmo acelerado bestial colosal voraz de un gran Cuásar alimentándose hambriento empujado al límite resulta trágicamente insostenible y no durará vivo para el final del lapso cósmico de los tiempos, calculando agotarse. Típicamente requieren engullir constantemente hasta el equivalente de al menos 100 y 1000 formidables grandes soles anuales para sostener la espectacular radiación destructiva chorreando incontrolable resplandor majestuoso asombroso.",
          style: "highlight"
        },
        {
          title: "Estructura del Disco de Acreción",
          text: "A medida material rocoso helado asfixiado arrastrado por succionadora poderosa fuerza centrífuga incesante, se acopla agrupándose espantosamente rápido veloz chocando brutalmente atómico contra las asfixiadas partículas atrapadas internas formando y coronando su infame mortífero disco girando a la luz. Es en este disco donde nacen fricciones inimaginables que desatan violentamente la llamarada del resplandor luminoso cósmico característico.",
          image: "/assets/quasar_3.png",
          imgCaption: "La fricción calórica de un disco de acreción encendido.",
          style: "normal"
        },
        {
          title: "Su Futuro Extinto Plácido",
          text: "El desenlace pacífico terminal irremediable predicho ocurre al acabar evaporándose el banquete suculento gas estelar circundante. Eventualmente apagándose calóricamente agotadas las provisiones y enfriando cesando dramáticamente la llamarada explosión intensa espectacular hiperactiva faro destellante transformándose convirtiendo tristemente la región a una sosegada, fría regular pacífica apagada y desapercibida galaxia regular orbitando como inofensiva y oscura en medio universo.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Ferrarese, L., & Ford, H. (2005). Supermassive Black Holes in Galactic Nuclei."
      ]
    },
    quizEs: [
      { q: "¿Quién desencadena alimentándose vorazmente de galaxias enteras este fenómeno, produciendo al atascarse llamaradas y erupciones colosales llamadas Cuásar brilloso?", options: ["Un pulsar de gas inestable radiactivo.", "Un remanente moribundo colosal viejo.", "Un Agujero Negro Súper-masivo hambriento saturado."], a: 2 },
      { q: "¿Por qué los cuásares son vitales y enormemente valorados astronómicamente por la ciencia y sondas de la humanidad terrestre local?", options: ["Sirven de espejos cálidos lumínicos rebotantes reflectores de fotones.", "Funcionan de sondas que permiten atisbar el nacimiento de galaxias del distante y primitivo pasado remoto del universo.", "Son faros seguros de recarga térmica combustible nuclear nave."], a: 1 },
      { q: "¿Hacia qué final inexorable irremediable plácido terminan cesando dirigiéndose moribundos estáticos los activos voraces e incontrolables Cuásares furiosos cósmicos?", options: ["Explotando en colosales supernovas expansivas infinitas.", "Agujerando partiendo el tejido espacio tiempo a la de otra asombrosa dimensión paralela.", "Agotando su combustible y enfriándose bajando estancándose en una pacífica y dormida galaxia normal."], a: 2 }
    ]
  },
  {
    id: 'pulsar', order: 12, 
    titleEn: 'Pulsar', titleEs: 'Púlsar',
    badge: 'Neutron Star', badgeEs: 'Estrella de Neutrones',
    color: '#B000FF',
    contentEs: {
      sections: [
        {
          title: "El Reloj Relámpago Cósmico",
          text: "Imagina comprimir las montañas inmensas del enorme e infernal Sol en una bolita minúscula densificada de apenas veinte insignificantes kilómetros redondos. El saldo asfixiante hiper comprimido brutal se conoce majestuosamente asombroso como rotatoria e imparable 'Estrella Densificada Neutrones'. Esto sucede tras el colapso violento super masivo supernova gigante expansiva.",
          image: "/assets/pulsar_1.png",
          imgCaption: "Estrellas giratorias cuyas masas están tan densamente comprimidas que su masa roza fuerzas inconcebibles."
        },
        {
          title: "Haces Magnéticos y Latidos",
          text: "La presión rotativa, le obliga a dar vueltas y machacar cientos giros constantes en escasos de rápidos segundos girando al vacío espacial infinito, irradiando rayos emitidos magnéticos fijos destructivos. Esos rayos destellantes cruzan el firmamento como faros inmensos, golpeando nuestros detectores ópticos humanos dándonos rítmicos compaces intermitentes engañosos simulando 'Latidos'.",
          style: "highlight"
        },
        {
          title: "Densidad Más Allá de lo Entendible",
          text: "La compresión material obligatoria física alcanzada supera por enormidades ridículas escalas medidas comprensibles logrando concentrar exótico extremo estado. Si algún asombroso atrevido minero astronáutico cortara recogiendo y levantara heroico apenas y únicamente una sola chiquita cucharada azúcar microscópica de este material púlsar en gravedad empírica costaría a la balanza miles de decenas completas y pesadas de inmensas montañas terrenales masivas.",
          image: "/assets/pulsar_2.png",
          imgCaption: "Un material donde los electrones chocan y se amalgaman en neutrones puros.",
          style: "normal"
        },
        {
          title: "Girando al Ritmo del Reloj",
          text: "El tic tac exacto implacablemente perfecto constante pulsante girando como bailarina violenta resulta en una precisión relojera divina que ni los ingenieros relojeros suizos de élite alcanzarían simular lograr. Esta característica rítmica tan predecible regular estable e inalterablemente útil permite que hoy sirvan valiosos universalmente geolocalizadores naturales cósmicos para orientarnos ubicarnos guiando futuras sondas navegación profunda estelar interestelar viaje.",
          style: "highlight"
        },
        {
          title: "Terremotos Estelares Sorpresivos",
          text: "A pesar aparente infalible precisión indestructible férrea relojera estable calculable y sólida blindada, la costra rígida férrea magnética dura pesada densa impenetrable a veces se resquebraja quiebra sorpresiva provocando minúsculas pero espantosas e imponentes grietas espaciales fallas, liberando picos de energía desatados y catalogados astrofísicamente llamados asombrosos temibles 'Estremecimientos Estelares', desfasando alterando ligeramente e intermitente su inmutable marcha regular continua pulsos.",
          image: "/assets/pulsar_3.png",
          imgCaption: "Liberación de energía letal que altera mínimamente la rotación magnética.",
          style: "normal"
        },
        {
          title: "Un Farol a lo Desconocido",
          text: "La naturaleza hostil letal salvaje e irradiante peligrosa mortífera que envuelve magnéticamente abrazadora girando sin frenos hace prohibitivamente letal impensable peligroso considerar enviar sondas biológicas cercanas al perímetro perimetral mortal órbita púlsares, pero sus intensos barridos radiactivos revelan incontables y provechosos datos remotos científicos invaluables que descifran los confines y reglas exóticas en las vastas extensiones inexploradas galaxias exteriores.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Bell Burnell, J. (1977). The Discovery of Pulsars.",
        "Lyne, A. G., & Graham-Smith, F. (2012). Pulsar Astronomy."
      ]
    },
    quizEs: [
      { q: "¿Bajo qué fenómeno se les considera el apodo referido al comportamiento destellante magnético imparable de un orbe pulsar estelar muerto vibratorio orbitando el infinito espacio?", options: ["Mártires celestiales fríos.", "Cometas errantes radiactivos.", "Faros y Latidos rítmicos exactos."], a: 2 },
      { q: "¿Por qué resultan cruciales valiosísimos los púlsares para las futuras expediciones a futuro lejano interestelares de humanidad navegante en la expansión de civilización astronáutica galáctica?", options: ["Sirven puramente majestuosos espectáculos admirables vacacionales espaciales orbitando el sistema.", "Por su rigurosa puntualidad rítmica que serviría orientando infalible GPS guiando las naves deep space exactas.", "Ofrecen un refugio denso pesado rocoso y protector anti asteroides escudo blindando acoplamiento base."], a: 1 },
      { q: "¿Qué exótico incidente destructivo impredecible repentino e intermitentemente interrumpe la pulcra danza calculada relojera de fallas rompiendo desfase magnético giratorio el púlsar estelar colosal?", options: ["Terremotos Cósmicos estelares que resquebrajan rompiendo fallando corteza y expulsando energía pico reajustando todo el giro de rotación desmesurada calculable milimétrica.", "Impacto frontal aplastante fatal contra un núcleo cometa colosal interrumpiendo deteniendo secamente freno total anómalamente.", "Congelación cristalina térmica absoluta glacial del polo termal impidiendo rotar fluido constante suave apagando."], a: 0 }
    ]
  },
  {
    id: 'red_dwarf', order: 13, 
    titleEn: 'Red Dwarf', titleEs: 'Enana Roja',
    badge: 'Stellar Ember', badgeEs: 'Ascua Estelar',
    color: '#FF3B30',
    contentEs: {
      sections: [
        {
          title: "Las Habitantes Invisibles de la Galaxia",
          text: "Silenciosas y longevas, las enanas rojas representan estadísticamente la aplastante mayoría estelar abarcadora poblando calladamente nuestra Vía Láctea, a pesar de que su lánguido resplandor apacible, bajo tenue calor anémico tímido rojizo carmesí, imposibilita lograrlas avistarlas contemplarlas directamente brillando a simple vista curiosa a ojo desnudo nocturno alzando la mirada terrenal, pareciendo escondidas invisibles lejanas y discretas sombras calientes solitarias modestamente albergadas espacio infinito galaxia.",
          image: "/assets/red_dwarf_1.png",
          imgCaption: "Estrellas longevas y frías escondidas en la vastedad de la Vía Láctea oscura, ardiendo suavemente lentas."
        },
        {
          title: "Inmortales por Ahorro Masivo",
          text: "Su enorme cualidad mágica milagrosa asombrosa biológica estelar resulta ser su eficiencia conservadora tacaña económica extrema extrema brutal, gastan quemando gas y convirtiendo el hidrógeno combustible primordial central de fusión atómica nuclear radiante en proporciones mínimamente avaras e insignificantes bajas asegurando prometiendo garantizándoles una vida incalculable asombrosa llegando billones y billones años edades perdurando sobrevivientes superando fácilmente superestrellas veloces ardientes despilfarradoras gigantes efímeras colosales y azules estrellas vecinas.",
          style: "highlight"
        },
        {
          title: "Temperamentos y Erupciones Rústicas",
          text: "Aun aparentando ser abuelas apacibles astrofísicas tranquilas sosegadas calladas durmiendo, ostentan repentinamente a menudo temperamentales berrinches caóticos furiosos feroces lanzando violentas inmensas llamaradas ardientes estelares disparando letales radiactivas dosis tóxicas abrasadoras capaces fácilmente exterminar carbonizar rostizar esterilizaciones biológicas puras arrasando a los planetas rocosos y de hielo colindantes arrimados dependientes pegados huérfanos ciegamente dependientes calentador vecino rojo asqueroso inestable orbitalmente traidor incandescente volátil furioso llamarada solar brutal extrema.",
          image: "/assets/red_dwarf_2.png",
          imgCaption: "Letales proyecciones de plasma irradiado hacia el vacío oscuro cercano exoplanetas rotantes habitables inciertos hostiles.",
          style: "normal"
        },
        {
          title: "La Aparente Promesa en su Zona Habitable Cálida",
          text: "El reducido calórico débil horno que proveen termal rojo escasamente obliga necesariamente cercanía aproximación apretada amontonada comprimida en los sistemas solares. Sus exoplanetas órbitan sospechosamente pegados, tan unidos juntos apretados abrazando pegados que, de existir algún vestigio hipotético civilización agua mares lagos estancados azules vida biológica bacteriana en un cuerpo planetario de enana roja orbital, su rotación terminaría usualmente bloqueando acoplada magnéticamente mostrando una misma única cara ardiente eternamente iluminada asada.",
          style: "highlight"
        },
        {
          title: "Hospedera de Proxima Centauri Estelar Cercano Amigo",
          text: "La ilustre e importante célebre reina representativa embajadora estelar de este humilde pero abundante catalogado grupo clase espacial es precisamente 'Proxima Centauri', el sol de hogar vecino astronómico inmediato vecino puerta pegada que colinda territorial galáctico, encontrándose apenas separada un humilde salto diminuto 4 simples escasos livianos pero interminables años luz interestelares viajeros distantes vacío hacia exterior exploratorio humanidad sonda viaje generacional espacial cósmica galaxia inmensa estelar viaje.",
          image: "/assets/red_dwarf_3.png",
          imgCaption: "Nuestro sistema más cercano está habitado por una enana roja rodeada de asteroides y exoplanetas fríos.",
          style: "normal"
        },
        {
          title: "Destino Pacífico Termal Final",
          text: "Desprovistas carentes insuficientes débiles faltas incapacitadas de poseer empujar alcanzar o lograr presiones internas masivas inmensas bestiales opresivas y pesadas gravitacionales para acabar morir y explotar épicamente estruendosas monumentales dramáticas ruidosas cataclismos supernovas rojas expansivas brutales fatales mortíferas destructivas cósmicas universo aniquiladoras masivas, se disuelven desvanecen apagan plácidamente encogiéndose convirtiendo consumido lánguidamente hacia insignificante enana blanca brillante pequeña terminando transformando en un cuerpo fósil frío oscuro muerto negro estático espacio silencio vacío sin vida estática.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Shields, A. L., et al. (2016). The Habitability of Planets Orbiting M-dwarf Stars.",
        "Williams, M. (2016). Red Dwarf Stars: Characteristics & Facts. Space.com."
      ]
    },
    quizEs: [
      { q: "¿En qué inmensa y vital cualidad milagrosa astronómica astrofísica destacan apabullantemente aplastantes las pequeñas estrellas diminutas rojas enanas galácticas venciendo contra gigantes?", options: ["Poseen un poder masivo mortal destructivo agujero negro.", "Son capaces de apagar apaciguar las supernovas.", "Sobreviven perdurando billones y eternos años vitales por economizar consumir tacañamente su gas puro hidrógeno lentamente perezosas ahorrativas únicas universales invencibles."], a: 2 },
      { q: "¿Por qué sus prometedores hipotéticos exoplanetas dependientes habitables vecinos orbitales de vida, orbitan obligados y condenados pegados peligrosamente acoplados muy cerca a su estruendoso mortífero rústico traidor sol rojo berrinchudo inestable?", options: ["Porque giran amarrados obligados atraídos atrayendo el fuerte poder gravitacional inmenso centro inamovible anclándose magnético hierro extremo.", "Porque las rojas y estables enanas no tienen potencia calórica para abrigar planetas de vida alejados distantes cálidos exigiendo abrazos apretados rotacionales cercanos arriesgados pero habitables térmicamente condicionados térmicamente abrazando.", "Porque nacen orbitando forzosamente y obligados compartiendo gases radiactivos biológicos termales solares juntos atados mutuamente ininterrumpidamente eternos estáticos inertes biológicos dependientes constantes compartiendo rotación única."], a: 1 },
      { q: "¿Qué infame y letal castigo o evento mortífero cósmico radiactivo violento emanan berrinchudas y asombrosas castigan arrasando esterilizando violentamente sorpresivo comúnmente a sus órbitas cercanas las llamadas estrellas dóciles calladas tranquilas rojizas asombrosas?", options: ["Choques directos gravitacionales de cometa letales helados secos colapsando lunas orbitales exoplanetas arrastrando todo polvo.", "Emanan e impulsan violentas erupciones y llamaradas radiactivas intensas fulminantes que castigan y carbonizan calcinan esterilizan arrasando vida planetas orbitando cercanos abrazando rojo incandescente arriesgado fatal letal abrasador toxico peligroso.", "Destruyen rompiendo y fraccionando partiendo cuarteando rasgando el tejido gravitacional provocando fisuras tragando abismo profundo exoplaneta entero destruyéndolo absorbiendo asfixia absorción extrema gravitatoria pesada rotacional mortal infinita letal trampa mortal sin retorno oscuro fin letal destructivo."], a: 1 }
    ]
  },
  {
    id: 'white_dwarf', order: 14, 
    titleEn: 'White Dwarf', titleEs: 'Enana Blanca',
    badge: 'Stellar Ghost', badgeEs: 'Fantasma Estelar',
    color: '#E0F7FA',
    contentEs: {
      sections: [
        {
          title: "El Cadáver Resplandeciente y Fósil Luminoso",
          text: "Excesivo denso caliente despojado masivo pero minúsculo brillante, constituye literalmente al núcleo cadáver quemado fósil apagado moribundo denso desudo revelado que pacientemente va dejando expuesto gradualmente en el centro al concluir el ciclo letal extinto tras de disiparse suavemente e irse expulsando sus nubes periféricas la colosal moribunda gigante amarilla.",
          image: "/assets/white_dwarf_1.png",
          imgCaption: "Un remanente fósil muy compacto que brilla debido al calor residual atrapado en su masiva desnudez estelar inerte despojado de combustión activa atómica inestable moribundo frío espacio."
        },
        {
          title: "El Futuro Destino Apagado Solar Terrestre",
          text: "Ese mismísimo inexorable y silencioso tétrico pequeño futuro blanco fantasmagórico aguarda pacientemente acechando como condena estelar final asegurada inminente para albergar de cadáver inerte brillando tenue a nuestro querido imponente sol terrestre protector sistema al terminar acabarse quemar los restos milenarios últimos remanentes gas hidrogeno agotados de su interior núcleo caliente fusionador moribundo anciano futuro trágico hermoso pacífico celestial pálido pálida luz fantasmal brillante blanco radiante compacto denso pesado rocoso muerto congelado estático inerte.",
          style: "highlight"
        },
        {
          title: "Densidad Más Allá de Escalas Ordinarias Biológicas y Rocosas Comunes Planetarias",
          text: "Compactado, aplastado, densificado apretado asfixiado concentrado concentrando la brutal colosal gigantesca enorme inmedible incontable monstruosa descomunal inimaginable impensable masiva materia y masa gigantesca enorme estelar inmensa en un cuerpo planetario frívolo apretado rígido comprimido en el escueto microscópico humilde reducido compacto tamaño esférico rocoso diminuto terrestre nuestro planeta tierra asfixiada estancada detenida bloqueada compacta asombrosamente pesado denso mortal aplastante rocoso letal inmenso peso abismal comprimido astronómico extremo impensable rocoso inmenso pesado roco blindaje impenetrable estelar duro duro diamante núcleo brillante compacto inerte letal.",
          image: "/assets/white_dwarf_2.png",
          imgCaption: "Una ilustración ficticia del tamaño terrestre asfixiando guardando y conteniendo aprisionada la masa de soles inmensos pesados y masónicos estelares de gran magnitud incomprensible.",
          style: "normal"
        },
        {
          title: "El Diamante del Cosmos Extremo Gigantesco",
          text: "Si los cadetes comandantes atrevidos tuvieran y poseyeran la heroica asombrosa valentía arriesgada loca temeraria para lograr volar bucear adentrarse excavar penetrando las densas cálidas costras ardientes asfixiantes luminosas densas fantasmas remanentes interiores blancos pesados estelares, muy curiosamente toparían observarían al centro asombrados abismados estupefactos un gigantesco monstruoso inmenso titánico abismal asombroso incalculable cristal esferoidal brillante estático sólido colosal diamante cristalizado carbón puro presurizado cristalino brilloso de tamaño impensable estelar masivo gigantesco.",
          style: "highlight"
        },
        {
          title: "Robo de Gas Vampírico Estelar Asombroso Inesperado Mortal Caníbal Estelar Binario Trágico Colosal",
          text: "Aunque se asumen declaran inertes pacíficas congeladas muertas apagadas aburridas frías inactivas quietas inmutables, en escenarios macabros exóticos singulares astrofísicos asombrosos sorprendentes de cercanías binarias enlazadas pegadas atrapadas unidas atrapadas gravitacionales emparejadas arrastrando robando succionando abrazando jalando chupando arrancando violenta e implacablemente materia gas viva ardiendo caliente viva vital plasma de sus desdichadas vecinas compañeras grandes estelares inmensas despojadas de materia gas de vida robado canibalizado absorbiendo acumulando atrayendo hasta colapsar supernova explosión tipo asombrosa destructiva mortal brillante efímera rápida fugaz brutal.",
          image: "/assets/white_dwarf_3.png",
          imgCaption: "Un remanente fósil vampirizando y robándole vida a su estrella vecina.",
          style: "normal"
        },
        {
          title: "Hacia el Final Enana Negra Estelar Enfriamiento",
          text: "Tras billones asombrosos incontables años eternos lentos milenarios apacibles sosegados tranquilos fríos vacíos apagados irradiando de gota en baja perdiendo calor calor residual luz tenue blanco fósil, concluirá disipada congelada apagada cristaliza opaca apagada terminando oscura negra fría estática silenciosa solitaria fúnebre olvidada conocida catalogada teóricamente predecida astrofísicamente descrita astronómicamente hipotetizada enana negra invisible inerte estática invisible oscura inubicable apagada congelada muerte térmico muerte universo.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Koester, D. (2002). White Dwarfs.",
        "Fontaine, G., Brassard, P., & Bergeron, P. (2001). The Potential of White Dwarf Cosmochronology."
      ]
    },
    quizEs: [
      { q: "¿En qué inmensa pacífica silenciosa entidad reliquia muerta inerte apagada terminará convirtiéndose apagándose encogiéndose transformando fúnebre extinta inerte estática inevitablemente el Sol nuestro tras quemar y agotar agotar gastar todo su material hidrógeno gaseoso caliente?", options: ["Súper masivo agujero negro.", "Cuásar activo emisor galáctico.", "En una Enana Blanca radiante fósil compactada iluminada remanente estática fósil apagada inerte despojada."], a: 2 },
      { q: "¿Qué asombroso e increíble colosal cuerpo precioso brillante cristalizado valioso inmenso se formaría cristaliza y densifica asfixiado en lo recóndito escondido oscuro asfixiante presurizado profundo núcleo interior denso exótico asombroso blanco blanco brillante inmenso brillante estelar fósil rígido y sólido cristal carbono puro?", options: ["Un hiper diamante gigante cósmico estelar puro.", "Un bloque de oro volcánico derretido incandescente.", "Un anillo inmenso cristal hielo glacial sólido brillante esmeralda puro estelar puro mineral congelado."], a: 0 },
      { q: "¿De qué macabro modo violento caníbal inestable voraz pueden reaccionar violentas y detonar explotar inmensas supernovas letales mortales estas apagadas moribundas enanas fantasmas inertes muertas frívolas congeladas fósil estelas?", options: ["Calentándose autónomas sin sentido y explotando a voluntad impredecible sin causa aparente estallar fugaz repentina inexplicable.", "Robando y succionando arrebatando arrastrando gas materia material a estrellas vecinas orbitando compañeras cercanas atrayendo vampírico masa extra saturando su densidad y estallando cataclismo mortal brutal radiactivo luminoso asombroso impredecible inestable destructor masivo.", "Partiéndose resquebrajando fracturando rompiéndose destrozándose de la inmensa enorme fuerte sólida congelación fisura sísmico terremoto mortal cristal estallar trozos miles pedazos estáticos cortantes."], a: 1 }
    ]
  },
  {
    id: 'wormhole', order: 15, 
    titleEn: 'Wormhole', titleEs: 'Agujero Gusano',
    badge: 'Space Bridge', badgeEs: 'Puente Espacial',
    color: '#00FF99',
    contentEs: {
      sections: [
        {
          title: "El Túnel Relatividad Einsten Rosen Hipotético Atajo Exótico Mágico Portal Atajo",
          text: "A nivel teórico científico planteado documentado propuesto físico y matemático, un exótico túnel maravilloso espacial asombroso portal cósmico atajo rápido puente Einstein-Rosen, representa conecta e interactúa fungiendo doblando conectando creando túnel abriendo uniendo mágica asombrosa maravillosamente 2 dos diferentes dispersos desconectados lejanos distantes alejadísimos remotos lugares rincones partes fragmentos áreas o puntos lejanos del espacio galaxia e incluso tiempo universal infinito continuo.",
          image: "/assets/wormhole_1.png",
          imgCaption: "Representación esférica 3D distorsionando de un umbral puente conectando curvatura galáctica inexplorado asombroso infinito túnel."
        },
        {
          title: "Hipótesis Teórica Pura Ausencia Evidencia Rastros Indicios Ópticos Observables Prueba Empírica",
          text: "A pesar e independientemente de que la física moderna relativista lo calcula valida respalda avala tolera permite de que las ecuaciones dictaminan soportan estructuran, la humanidad moderna actual satélites sondas avanzados telescópicos radares nunca jamás, ni una vez ni instante, ni remoto, han logrado observar fotografiar advertir sentir comprobar ni atrapar fotografiar probar empíricamente visual real asombrosa directa contundente veraz contundente existencia real verídica de estos asombrosos portales y puentes.",
          style: "highlight"
        },
        {
          title: "Inestabilidad Mortal Efímera Peligrosa Colapsando Derrumbe Fugaz Cerrar Triturar Trampa Atajo",
          text: "Según el escepticismo teórico matemático físico, inclusive si milagrosamente apareciera formara lograse nacer establecer abrir manifestar un espectacular paso de agujero espacial portal temporal, este irremediablemente colapsaría cerrándose derrumbando partiendo triturando aplastando asfixiantemente destruyendo comprimiendo desintegrando al instante pestañeo de inmediato frágilmente milisegundos veloces letales aniquilando instantáneo aplastando cualquier cosa átomo asombrosa estructura atrevida sonda nave luz intento material penetrar ingresar intentar atravesarlo impidiendo atajo.",
          image: "/assets/wormhole_2.png",
          imgCaption: "Una inestabilidad brutal destruyendo en pedazos y cerrando de golpe el pasillo oscuro colosal galáctico pasadizo dimensional.",
          style: "normal"
        },
        {
          title: "Sustentación Exótica Materia Hipotética Milagrosa Búsqueda Negativa",
          text: "En afán para lograr intentar concebir sostener estabilizar mantener abierto permitir seguro cruce nave y atajo temporal portal, el pasillo mágico maravilloso conector requiere demanda exige inmensamente necesitaría ser forrado tapizado bañado blindado y protegido armado por y de ingentes colosales asombrosas cantidades increíbles de masa antimateria inestable misteriosa enigmática material sustancia pura energía exótica masa puramente exótica negativa empuje repulsivo y milagro desconocido asombroso ficticio real hipotético universo expansivo indetectable repeliendo.",
          style: "highlight"
        },
        {
          title: "La Apariencia Cilíndrica Asombrosa Esférica Visual Visualizada Portal Tridimensional Bola Distorsión",
          text: "Nuestros limitados cerebros humanos y la ficción literaria moderna cinemática comúnmente engañosamente los pintan describen dibujan asumen imaginan asombrosos embudos y espirales hundidos planos bidimensionales de embudo, pero en realidad visual cósmica un ojo astrónomo flotando enfrente percibiría avistaría miraría observaría flotar asombrado perplejo estupefacto maravilloso impávido una inmensa esferoide colosal globo cristalina 3D cristalina bola portal mágica asombrosa transparente esfera mostrando reflejando adentro otro mundo universo estrella exótico al otro lado ventana pura esférica redonda luminiscencia radiante esférica pura redonda luz asombrosa.",
          image: "/assets/wormhole_3.png",
          imgCaption: "La curvatura óptica de la luz revelando redonda y cristalina otra parte del cosmos portal lejano a través espacio tiempo maravilla esférica.",
          style: "normal"
        },
        {
          title: "Máquinas del Tiempo Direccionales Cronológicas Relativistas Alteradores Retorno",
          text: "La relatividad advierte avisa predice especula hipotetiza matemáticamente avisa que adentrarse atravezar usar pilotear aprovechar estos colosales túneles exóticos hipotéticos atajos dimensionales interestelares no solo brinca salta teleporta traslada mueve posiciones coordenadas cartesianas distancias distantes galácticas lugares remotos recónditos abismales distancias, sino que altera distorsiona disgrega modifica invierte el tejido flecha aguja reloj cronológico del tiempo transcurrido asombrosamente viajero temporal posibilitando permitiría teóricamente y macabramente paradojas exóticas viajando brincando y salteando regresando irrumpiendo retrocediendo al o hacia tu asombroso inexorable y confuso complejo pasado temporal real o futuro salto alterando la realidad misma dimensional continua.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Einstein, A., & Rosen, N. (1935). The Particle Problem in the General Theory of Relativity.",
        "Morris, M. S., & Thorne, K. S. (1988). Wormholes in spacetime and their use for interstellar travel."
      ]
    },
    quizEs: [
      { q: "¿En qué inmensa y vital cualidad milagrosa astronómica astrofísica fundamental radicaría la colosal atractiva fama espectacular útil esperanzadora utilidad función de estos indescifrados inexplorados y exóticos hipotéticos asombrosos maravillas agujeros oscuros túneles de lograr dominar atravesarlos sanos puros salvos y sobrevivir lograrlo?", options: ["Otorgan poder y energía combustible gratuita infinita térmica para propulsores iónicos cohetes potentes velocidad warp y fotónico escudo letal invencible astronáutico militar supremo destructivo inmensurable mortal eterno letal e inmortal.", "Actuarían serian servirían y fungirían fungiendo maravillosamente y operativamente de túneles atajos y portales veloces puentes mágicos acortando saltando tele portando en milisegundos distancias exóticas inmensurables lejanas remotos abismales saltos de galaxias millones lejanísimos cruzando atajo puente.", "Crean formaría de la materia asfixiada aplastada generador milagroso planetas artificiales habitables llenos biológicamente atmósfera habitable y exoplanetas oxígeno listos agua habitable tierra fértil pura habitable amigable humana y vida pacifica cósmica segura."], a: 1 },
      { q: "¿Por qué resultarían un puente frágil inútil colapsado derrumbado inestable triturador peligroso letal impidiendo travesías sondas exploratorias nave intentar bucear ingresar atravesar y saltar explorar usarlos cruzarlos asombrosamente?", options: ["Sus temperaturas son frías glaciales cerco absoluto térmicas congelando combustible.", "No emitirían luz ni sonido ni ecos radar para encontrarlos navegación ubicar ruta.", "Cerrarían aplastando triturarían desintegrando asfixiando destruuyendo partiéndose y cerrando colapsando mortalmente frágiles instantáneamente de golpe apenas abriéndose, siendo imposibles mortales y efímeros atajos traicioneros inestables fugaces letales desmoronamiento estructural inestable gravitatorio fatal frágil colapso masivo en mili segundos de vida existencial."], a: 2 },
      { q: "¿Qué exótico material ingrediente hipotético raro materia milagrosa asombrosa desconocida indetectable requería demandan exigirían teóricamente y urgentemente para inyectar sellar cubrir blindar revestir y evitar evadir impedir el mortal colapso destructivo del ruidoso peligroso inestable y triturador agujero túnel túnel portal asombroso atajo?", options: ["Titanio masivo reforzado.", "Plasma fotónico estelar radiante de inmensos de pulsares remanentes magnéticos calórico ardiente escudo radiante protector blindado fuerte denso calórico eterno radiactivo escudo protector impenetrable poderoso.", "Materia inexplorada exótica misteriosa anti gravitacional Antimateria pura negativa asombrosa especulativa inexplorada repeliendo aplastamiento colapso frágil mortal salvando estabilidad puente tunel portal seguro estable."], a: 2 }
    ]
  }

];
