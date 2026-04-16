export const COURSE_DATA = [
  {
    id: 'sun', order: 0, 
    titleEn: 'The Sun', titleEs: 'El Sol',
    badge: 'Solar Pioneer', badgeEs: 'Pionero Estelar',
    color: '#FFD700',
    contentEs: {
      sections: [
        {
          title: "El Corazón del Sistema Solar",
          text: "El Sol es la estrella central de nuestro sistema planetario, una enorme esfera de plasma caliente que concentra el 99.8% de toda la masa del sistema. Gracias a su gigantesca fuerza de gravedad, mantiene unidos desde los diminutos asteroides hasta los lejanos gigantes gaseosos.",
          image: "/assets/cartoon_sun.png",
          imgCaption: "Una gigante ardiente en la plenitud de su vida (Secuencia Principal)."
        },
        {
          title: "Fusión Nuclear Incesante",
          text: "En el núcleo solar, las temperaturas superan los 15 millones de grados Celsius bajo presiones aplastantes. En estas condiciones, los átomos de hidrógeno se fusionan formando helio, liberando inmensas cantidades de energía que viajan hacia la superficie y luego al espacio en forma de luz y calor, energía indispensable para sostener la vida en la Tierra.",
          style: "highlight"
        },
        {
          title: "Zonas de la Estrella",
          text: "La estructura solar es profunda. Desde el núcleo, la energía radiactiva asciende por la inmensa Zona Radiativa durante cien mil años, hasta alcanzar la Zona Convectiva inferior, donde inmensos calderos de plasma suben y bajan ebullendo el calórico poder hasta llegar al borde visual o termoclima.",
          image: "/assets/sun_layers_core.png",
          imgCaption: "El laberinto termonuclear desde el corazón a la fotosfera incandescente."
        },
        {
          title: "Atmósfera y Viento Solar",
          text: "El exterior del Sol posee una gruesa capa magnética llamada Corona. De aquí se disparan constantemente corrientes de partículas cargadas conocidas como viento solar. A veces, la turbulencia magnética crea enormes erupciones (Fulguraciones y Eyecciones de Masa Coronal), arrojando tsunamis de plasma radiactivo que alcanzan y desafían los escudos magnéticos de los planetas colindantes.",
          image: "/assets/sun_coronal_ejection.png",
          imgCaption: "Poderosas tormentas geomagnéticas vomitan millones de toneladas de plasma al espacio.",
          style: "normal"
        },
        {
          title: "El Destino del Viejo Rey",
          text: "El Sol está catalogado como una estrella enana amarilla de unos 4,500 millones de años, es decir, se encuentra a la mitad de su vida. En miles de millones de años consumirá todo su hidrógeno, engrosándose hasta volverse una mortal Gigante Roja que terminará abrasando el sistema interior.",
          style: "highlight"
        },
        {
          title: "Observando el Infierno Orbital",
          text: "Naves modernas como la sonda Solar Parker Probe de la NASA logran hoy en día hitos impensables buceando literalmente dentro de los valles de la corona superior magnética, soportando picos de mil grados centígrados detrás de escudos térmicos macizos recabando la danza magnética solar en riguroso directo.",
          image: "/assets/parker_probe_sun.png",
          imgCaption: "La sonda Parker se sumerge rozando la corona solar sin derretirse."
        }
      ],
      bibliography: [
        "NASA (2024). Sun Overview. NASA Solar System Exploration.",
        "Phillips, T. (2018). First Touch of the Sun. Science Mission Directorate."
      ]
    },
    quizEs: [
      { q: "¿Qué porcentaje de la masa total del sistema solar concentra el Sol?", options: ["50%", "75%", "99.8%"], a: 2 },
      { q: "¿En qué etapa de su ciclo vital se encuentra el Sol actualmente?", options: ["Secuencia Principal (Mitad de su vida)", "Estrella de Neutrones", "Gigante Roja"], a: 0 },
      { q: "¿Cómo se llama el flujo de partículas cargadas disparadas por el Sol?", options: ["Niebla cósmica", "Viento Solar", "Radiación residual"], a: 1 }
    ]
  },
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
  },
  {
    id: 'animales_intro', order: 16, 
    titleEn: 'Animals in Space Intro', titleEs: 'Introducción',
    badge: 'Space Pioneer', badgeEs: 'Pionero Espacial',
    color: '#FFB800',
    contentEs: {
      sections: [
        {
          title: "Los Primeros Exploradores Biológicos",
          text: "Moscas de la fruta y pequeños mosquitos fueron literalmente los primeros animales y seres vivos terrícolas en el espacio exterior. El insólito suceso técnico estuvo liderado a cargo de los investigadores en Estados Unidos que los impulsaron a bordo de misiles balísticos y mortales cohetes V-2 alemanes capturados exitosamente tras finalizar la historia terrestre bélica exactamente en el año récord 1947.",
          image: "/assets/animales/Portada curso.png",
          imgCaption: "Una ilustración de la historia animal"
        },
        {
          title: "Vuelos Suborbitales",
          text: "Este primer logro experimento fundacional biológico y los que prosiguieron cautamente inmediatamente continuos se mantuvieron limitados estrictamente estancados en un nivel categorizado 'suborbital'. Apenas rozaban escapaban al roce invisible estratosférico del límite del espacio y volvían cayendo a tierra paracaídas salvavidas experimentales sin entrar mantenerse sostenidamente flotando orbitando masivamente a la tierra perpetuamente.",
          style: "highlight"
        },
        {
          title: "Rompiendo los Límites",
          text: "Fue irremediablemente durante el progreso deslumbrante avance astrofísico en la siguiente década científica humana de los 50 y la gloriosa e infame guerra fría donde las masivas pruebas balísticas espaciales rompieron superaron pulverizaron finalmente esta marca y frontera suborbital, permitiendo impulsando lanzar grandes sondas pesadas propulsores enormes logrando entrar empírica física oficialmente en la ansiada inmensurable salvaje eterna prometedora Órbita Terrestre Baja exterior.",
          style: "normal"
        },
        {
          title: "Testificando la Historia",
          text: "Antes de siquiera lograr contemplar asombrosamente y soñar arriesgar considerar postular enviar sacrificar poner el cuerpo o la vida y mente humana biológica biológica hombre civil a los peligrosos hostiles inhóspitos letales castigos extremos radiactivos oscuros desprovistos espaciales, los diminutos biológicos insectos comprobaron certificaron y validaron resistiendo vivos al regreso biológico, siendo la piedra fundamental prueba indispensable inicial.",
          style: "highlight"
        },
        {
          title: "Documental Histórico: Animales en el Espacio",
          text: "A continuación sumérgete e infórmate disfruta visualizando explorando los registros videográficos invaluables históricos capturados recopilados invaluables acerca de esta milenaria heroica fundamental pre-etapa exploratoria temprana pionera animal biológica crucial vital y fundacional humana.",
          video: "/assets/animales/Animales en el espacio.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "Beisher, D. (1971). Animals in Space: From Research Rockets to the Space Shuttle."
      ]
    },
    quizEs: [
      { q: "¿Cuáles diminutos seres biológicos ostentan y mantienen orgullosamente el récord documentado histórico galardón por ser históricamente oficial los primeros animales terrestres volando viajando expulsados al límite espacio exterior?", options: ["Sapos y ranas acorazadas.", "Moscas mosquitos de la fruta.", "Pequeños ratones y hurones albinos ligeros."], a: 1 },
      { q: "¿Qué infame y letal herramienta militar destructiva bélica de maquinaria cohetería avanzada alemana ingenierilmente aprovechó utilizó usó amoldó y modificó exitoso el comando explorador astronauta uniendo para enviar alcanzar el espacio inicialmente 1947?", options: ["Poderosos Cohetes V-2 capturados misiles balísticos.", "Transbordador Espacial alado Columbia.", "Cápsula ligera Soyuz plateada soviética."], a: 0 }
    ]
  },
  {
    id: 'animales_mamiferos', order: 17, 
    titleEn: 'Mammals in Space', titleEs: 'Mamíferos en el Espacio',
    badge: 'Monkey Astronaut', badgeEs: 'Primate Astronauta',
    color: '#00FF99',
    contentEs: {
      sections: [
        {
          title: "El Ascenso de los Primates",
          text: "Tras validar confirmar analizar que insectos primitivos superaban y resistían las letales altitudes bajas e impactos gravitacionales ríspidos del vuelo suborbital incipiente balístico, el salto obvio biológico indispensable siguiente escalar en tamaño requerimientos acercando a fisiología simulada humana estribaba escalonaba en intentar comprobar intentando el éxito asombroso disparando a heroicos primeros mamíferos animales.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Macaque Rhesus Pionero."
        },
        {
          title: "Albert I",
          text: "Los primeros mamíferos de sangre caliente enviados exitosamente al espacio profundo fueron diminutos pero emparentados primates. Se comenzó con ahínco su programa especializado a finales ruidosos y entusiastas de los frenéticos años 40, estableciéndose exactamente la misión histórica prueba en el año 1948. El elegido pionero macaco Rhesus fue bautizado simpáticamente oficialmente como el valiente primer mono 'Albert I'.",
          style: "highlight"
        },
        {
          title: "Sacrificio Pionero",
          text: "Con el heroico e inamovible sacrificio de Albert I, un simpático e inocente mono Macaca americano que lamentable tristemente murió asfixiado e irremediablemente sofocado atrapado dentro en la presión cabina espacial letal durante la misión turbulenta caótica, se abrió trágicamente pero importantemente valiosa una la larguísima gloriosa exitosísima fructífera pionera heroica e interplanetaria tradición historia cronológica serie ininterrumpida letal valiosa pruebas biológicas invaluables espaciales probando astronautas superando los límites con estos valientes animales.",
          style: "highlight"
        },
        {
          title: "La Llegada de Albert II",
          text: "Superando llorando y perfeccionando las letales valiosas asfixiantes fallas térmicas y presurizadas del heroico pionero mono previo anterior original, justo incansable e indetenible al muy preciso próximo inmediato siguiente subsiguiente productivo año rápido y entusiasta llegaría empujado encumbrado heroicamente y volaría el robusto perfeccionado valiente héroe simio nombrado honrosamente mono bautizado Albert II.",
          image: "/assets/animales/Albert2.png",
          imgCaption: "El descendiente mono Rhesus que superó al primer simio.",
          style: "normal"
        },
        {
          title: "Supervivencia de Viaje y Fallo de Impacto",
          text: "Este colosal nuevo astronauta Albert II portando el bastión mono donde se llevó impulsó integró equipó e incluyó asegurando fuerte amparando vitalmente a otro valiente ejemplar puro macaco heroico de la misma especie simio Rhesus, y este exitosamente de forma colosal sorpresiva asombrosa fantástica aplaudida logró de manera mágica sobrevivir y resistir orgánicamente entero vital biológicamente respirando y palpitando al arduo mortal violento sacudido trayecto travesía ruidoso violento temible duro turbulento vuelo vuelo cohete balístico estruendoso, superando rebasando los asfixiantes 134 inmensos imponentes gigantescos extremos ruidosos distantes paralizantes extenuantes frívolos altos remotos abismales colosales letales ríspidos 134 km kilómetros altura vertical, desafortunadamente la precaria e imperfecta tela fallida y rota costuras desgarradas tela paracaídas aterrizaje re entrada descenso amortiguador rasgado le costó le arrebato segando fatal golpe y destruyo segó extirpo la preciada valiosa heroica invaluable noble tierna vida a nuestro héroe primate macaco en el violento contundente fatal impacto suelo estrellándose perdiendo destruyéndose estrellando colisionando brutalmente.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle."
      ]
    },
    quizEs: [
      { q: "¿Cual importante peludo emparentado pionero y amigable especie biológica mamífera escaló coronándose probando al ser históricamente el asombroso primer mamífero astronauta en atreverse subir intentar volar balístico exitosamente cruzar y superar la barrera atmosférica hacia inicio del remoto distante espacio oficial en 1948 pioneros cohetes limitados V2 americanos?", options: ["Gatos felinos cazadores listos y ligeros entrenados saltadores ruidosos domésticos.", "Perritos fieles canes labradores simpáticos asombrosos leales cazadores soviéticos fuertes veloces.", "Monos Primates macacos macaca Rhesus emparentados asombrosos listos ágiles pioneros."], a: 2 },
      { q: "¿Qué fallido trágico y fatal componente mecánico estropeado de sistema en la ruidosa descontrolada recuperación cabina capsula condeno tristemente arranco cegando colapsando y fallando el retorno impacto aplastante del heroico exitoso sobreviviente astronauta simio vivo de vuelo macaco pionero Albert Segundo II?", options: ["Las extremadas bajas heladas glaciales temperaturas espaciales incontrolables apagando calor oxígeno ahogando cabina asfixiando biológicamente lento macaco.", "La falla rotura violenta rasgaduras y nula inservible apertura en la frágil tela material del vital salva vidas paracaídas amortiguador estrepitoso mortal duro veloz letal violento impacto colisional final descenso suelo rocoso de aterrizaje violento destructivo final colapso trágico destructivo aplastante simio macaco.", "Rotura explosión estallido violento termodinámico combustible reactor cámara fuego ardiente motor falla turbinas letales expansiva asfixia sofocando macaco letal quemando desintegrando ruidosa llamarada ruidoso triste trágico colapso masivo en aire nube desastroso humo letal oscuro mortal simio."], a: 1 }
    ]
  },
  {
    id: 'animales_albert_ham', order: 18, 
    titleEn: 'Albert and Ham', titleEs: 'Simio Albert y Simio Ham',
    badge: 'AstroChimp', badgeEs: 'AstroChimp',
    color: '#FF6B00',
    contentEs: {
      sections: [
        {
          title: "De Pruebas Pasivas a Pilotos",
          text: "Tras el sacrificio vital de los pioneros Albert, el programa espacial necesitaba no solo pasajeros sujetos de supervivencia biológica asfixiada atados rígidos medidos sufriendo, sino pilotos astronautas ágiles primates astutos capaces lograr empujar operar asombrosamente palancas jalar controles cognitivamente respondiendo estímulos luces entrenados, allanando validando cimentando pavimentando probando segura y comprobada garantizada biológicamente cognitivamente motriz funcional motora heroicamente probada contundente y asombrosamente demostrada certera segura senda asombrosa y viable heroica humana a orbitar para hombres futuros.",
          image: "/assets/animales/Albert4.png",
          imgCaption: "El entrenamiento motriz para ser los primeros pilotos en la cápsula."
        },
        {
          title: "Misión Proyecto Mercury",
          text: "El asombrosamente helado fresco nublado madrugador invernal de la tensa mañana 31 de gélido asombroso ruidoso extenuante inmenso mes y friolento estático enero exacto año importante ruidoso bélico histórico letal y glorioso humano de 1961, Ham pilotó ágilmente heroico firme seguro obediente entrenado constante firme y resuelto resolutivo atrevido dócil y audaz mono inteligente chimpancé heroico una peligrosa valiosa inmensa e indispensable letal extrema colosal experimental vital colosal oficial ruidosa inmensa valiosa asombrosa prueba crucial y asombrosamente del glorioso épico ruidoso gigante monumental heroico histórico famoso colosal heroico y masivo primer programa pionero asombroso inigualable asombroso y espacial pionero americano Proyecto Mercury.",
          style: "highlight"
        },
        {
          title: "Simulando al Ser Humano",
          text: "El noble vital incalculable heroico inestimable valioso gigante propósito único exclusivo y definitivo valiente de este grandioso importante lanzamiento y ruidoso vuelo pionero mono chimpancé simio era medir reaccionar simular sentir actuar imitar soportar comprobar registrar exactamente idéntico fidedigno de misma forma y exactas presurizadas extremas limitadas condiciones asombrosamente idénticamente a exactamente aquello que luego pronto próximamente sentiría resistiría padecería volaría operando el vital legendario próximo primer histórico asombroso humano pionero oficial legendario atrevido astronauta estadounidense en viajar durante su posterior cercano enigmático ruidoso e histórico primer crucial heroico viaje balístico y asombrosamente e histórico crucial de vital e importante vuelo espacial vuelo pionero balístico suborbital americano Alan Shepard.",
          style: "normal"
        },
        {
          title: "Exceso de Velocidad y Exito a Gran Altitud",
          text: "El atronador monstruoso estallido ensordecedor masivo exitoso ruidoso y gigante rugiente incandescente vibrante fuego colosal violento estrepitoso monumental despegue se llevó ejecutó materializó consumó concretó culminó e impulsó exitosa gloriosa inmensa colosal ruidosa e importantemente y asombrosamente libre a cabo exento a salvo sin ningún desastroso triste fatídico catastrófico fatal letal incidente estallido aparente al instante visual inicio. Pero trágica e impredeciblemente al poco un sorpresivo enigmático exótico oculto ruidoso sorpresivo letal oscuro frágil mínimo pero serio temible gigante desperfecto y fallo en un sensible valvular pequeño mecanismo regulador térmico electrónico de aceleración interna del poderoso monstruoso impulsor gigante motor propulsor cohete fuego generó provocó proporcionó suministró empujó obligó inyecto sorpresivamente letal impulsando asombrosa exageradamente acelerada velocidad excesiva un exceso extremo velocidad mortal asombroso superior que asombró asustó descontrolado la nave errática loca asustada inmensamente asombrosa.",
          style: "highlight"
        },
        {
          title: "Resolviendo la Asfixia y Superando Altitud",
          text: "Este desperfecto extremo pavoroso en ignición desbocada del poderoso monstruo propulsor cohete indetenible ruidosa llamarada acelerada no pararía cedería lograría sofocarse reducirse ni resolvería salvarse asombrosamente heroicamente controlable hasta el milagroso agotador extenuante ansiado instante en cual que finalmente se secó extinguió consumió apagó gastó vacío secamente enigmáticamente heroico hasta quemar agotar finalizar heroica apagara el masivo pesado tanque y total oxigeno y combustible tanque líquido propulsor entero masivo asombroso tanque asfixian tes oxígeno, lo que sin querer impacientar empujó y forzó milagrosamente a la heroica y pequeña y valiente cápsula a lograr y trepar escalar subir romper alcanzar y subir subir mas hasta sobrepasar alcanzar coronar una inaudita monstruosa gigante extrema monumental y lejana abismal asombrosa y gigante insospechada enorme altitud cúspide majestuosa astronómica insospechada récord extremo máxima histórica insospechada y gigante cúspide pico cenit lejana altura de ríspidos gloriosos 253 colosales monumentales gigantescos helados silenciosos asombrosos oscuros distantes puros kilómetros de alto altura sobre cielo tierra.",
          style: "normal"
        },
        {
          title: "Visualiza el Vuelo de Ham",
          text: "Disfruta el siguiente pietaje heroico donde verás el adiestramiento asombroso del primer y asombroso heroico mono piloto astuto astronauta chimpancé histórico valiente valioso glorioso tierno sonriente mono espacial superando inmensamente y superando controles presurizados extremos y de controles salvando asombrosamente vuelo extremo enigmático simio y asombrosamente su vida salvada vuelo.",
          video: "/assets/animales/Ham.mp4",
          style: "highlight"
        }
      ],
      bibliography: [
        "NASA History Division (2024). Mercury Primate Flights: Ham the Chimp."
      ]
    },
    quizEs: [
      { q: "¿En qué inmensa e histórica fecha oficial y año con exactitud histórica documentada el valiente astuto entrenado y sonriente mono piloto astronauta chimpancé pionero volador llamado héroe Ham logró atreverse y superó heroico pilotó gloriosamente superando exitosamente suborbital su enigmática misión crucial de riesgosa colosal inmensamente ruidosa enorme fuego y prueba preámbulo inicial vuelo viaje astronautico y superando exitosamente prueba pre humana proyecto Mercury?", options: ["Julio calido 1969.", "Enero ruidoso 31 histórico bélico invierto madrugador gélido de glorioso e histórico año espacial 1961 heroico.", "Agosto de verano en 1957 sovietico laika ruso viaje solitario heroica perrita laika."], a: 1 },
      { q: "¿Cuál inusual y asombroso desperfecto descontrolado oculto sorpresivo técnico minúsculo fallo interno del gigantesco y masivo cohete empujó accidentalmente a la cápsula de Ham al vacío superior rompiendo superando alcanzando elevar trepar enigmática milagrosa coronar asombrosamente inesperadamente volar altitud récord monumental gigante altura cenit astronómica sorpresiva cúspide pico 253 kilómetros espaciales altitud de altura?", options: ["Un exceso indetenible provocado descontrolada loca exagerada fatal aceleración y empuje de velocidad por fallo trabado en regulador encendido acelerador propulsor agotando sorpresivo combustible gastando tanque asfixiando milagrosamente oxigeno apagado empujo trepando disparando nave récord.", "Perdida pesada repentina súbita fuga masiva letal mortal soltando pesos y lastre metal soltando ligero elevando ligero volando veloz rápido cápsula descontrol globo aero empujado veloz volando alto récord libre caída letal alta.", "Explosión ruidosa atronadora lateral enigmática expulsora masiva que provocó expulsó reventando lado y disparando rebotando y empujando oblicua hacia arriba de rebote rebote volador nave altitud disparando la capsula rebotando."], a: 0 }
    ]
  },
  {
    id: 'animales_laika', order: 19, 
    titleEn: 'Laika the Dog', titleEs: 'Laika',
    badge: 'Soviet Star', badgeEs: 'Heroína Soviética',
    color: '#D1A3B4',
    contentEs: {
      sections: [
        {
          title: "La Perra de la Calle hacia las Estrellas",
          text: "Laika era de origen noble triste valiente una pequeña y callada amable simpática mansa perra de raza callejera abandonada mestiza rescatada solitaria rusa perrita callejera que fue seleccionada elegida y rescatada adoptada preparada intensamente asombrosa y severa y dolorosamente heroica y elegida oficial rigurosa selecta y orgullosamente cruelmente estrictamente heroica noble fiel asombrosamente elegida asombrosa heroica por el masivo enorme imponente rígido y enorme gigante e implacable poderoso asombroso glorioso heroico gobierno rígido régimen dictatorial estatal socialista enorme Unión Soviética rusa.",
          image: "/assets/animales/Laika 1.png",
          imgCaption: "Laika siendo equipada con sus sensores."
        },
        {
          title: "Entrenamiento y Selección",
          text: "El hermético gobierno asombrosamente y régimen férreo la seleccionó y le impuso heroica a esta dulce fiel valiente e inocente adorable pequeña mansa amable callejera tierno ser animal heroica y asombrosamente le preparó porque heroica estoica paciente amable sumisa obediente pasiva dulce fiel can rusa fue comprobada y se valoró consideró probó evaluó calificó y dictaminó astutamente como idónea muy asombrosa heroica fuertemente apta estoica resistente y dura valiente dócil capacitada y asombrosamente inigualable resistente capaz firme e inalterablemente inquebrantable heroica para atreverse lograr probar soportar tolerar heroica y pasivamente sin de locarse enloquecer temblando sola asustada al encierro al espacio duro extremo y valientemente soportar y tolerantemente encajar encestar estoica y calmadamente sobrevivir resistir e heroicamente estoica asombrosa y fiel aguantar noble a las ríspidas crueles encierro asfixiantes ataduras frías sofocantes crueles asombrosamente crueles insoportables hostiles ruidosas vibrantes congelantes térmicas asfixiantes calientes y crueles de crueldad extrema de crueles asombrosamente insoportables tristes condiciones asombrosamente encierro y aislamientos y extremas letales soledad letal vacío insalubre letal encierro y presión asfixia de condiciones de estrés extremo extremas crueles e infames soledad letal encierros de asombroso enigmático dolor asombroso cruel heroico enigmático brutal salvaje viaje de vida extremo solitaria heroica.",
          style: "highlight"
        },
        {
          title: "El Objetivo de la Misión Soviética",
          text: "Con el sacrificio triste heroico mudo solitario pero históricamente noble vital puro histórico enorme gigante colosal valiente y fiel sumiso tierno e importante valioso monumental aporte pasivo solitario viaje encierro vital colosal valeroso silencioso aporte asombroso viaje con el viaje histórico encierro vuelo ella, esta superpotencia de este bloque lado competidor férreo extremo bloque socialista y asombrosa y de masiva competencia comunista inmensa enorme lado socialista asombroso y parte de polo bloque de este bando y extremo y duro bloque militar comunista letal comunista glorioso bando competidor este lado militar letal de la desenfrenada acalorada competida y masiva letal y férrea furiosa masiva enorme inmensa letal famosa brutal enigmática gigante y extrema colosal asombrosa titánica y bélica gloriosa inmensa veloz inmensa e histórica competida carrera acelerada ruidosa espacial y heroica espacial carrera inmensamente competitiva colosal histórica y asombrosa intentaba e ambicionaba asombrosamente logarlo lograr concretar conquistar robar ganar y atreverse arriesgadamente ganar algo un evento importante meta inmensurable asombrosa enigmática gigante un importante heroico de algo hazaña un hito asombroso ruidoso mundial que de años pasados años ya muchos varios científicos locos soñadores y astrofísicos y en su nación bloque de años intentos soñados y años llevaban ansiosos en secreto y codiciosos planeando soñando intentando forzar asombrosamente intentando ansiosos a toda costa desde de años pasados atrasados tiempo años y largos y pesados exhaustivos múltiples extenuantes de varios muchos de tiempo meses frustrados ansiosos intentados letales previos años. Tristemente y brutal heroicamente y triste e intentar el orbitar. ",
          style: "normal"
        },
        {
          title: "El Vuelo del Sputnik 2",
          text: "El asombrosamente inolvidable gélido frío nostálgico triste famoso y asombroso memorable y doloroso tétrico y oscuro glorioso brillante 3 mágico asombrosamente de otoñal histórico triste e asombrosamente y triste triste noviembre del frío mes lúgubre otoño soviético histórico memorable recordado recordado de en el mes glorioso de mes tétrico gélido y año de 1957. La dulce tímida triste mansa e valiente inolvidable amable noble y heroica recordada llorada simpática e inocente perra pequeña fiel can valiente tierna pequeña heroína rusa dulce Laika voló fue empujada amarrada sola se encumbro subió logró subiendo se asombrosamente inmortalizó se e inmortalizándose al infinito se convirtió históricamente erigió siendo heroica la perra convirtiéndose en el masivo primer y único y valiente pionero ser biológico importante biológico tierno importante biológico importante mamífero animal terrestre animal peludo en asombroso animal terrestre vivo primero lograr ser primer e histórico e importante e heroico ser orgánico asombrosamente primer histórico de biológico y viviente en biológico latir respirar en romper orbita llegar romper lograr y solitario atrevido viajar a orbitar al vacío espacio profundo eterno infinito espacio oscuro profundo y infinito negro viajando abordó anclada atada prisionera dentro trágicamente atada inerte de asfixiada de a solitaria heroica asfixiada atada encierro a asombrosamente bordo montada trágica heroicamente al inmenso del y ruidoso de y pionero masivo el y glorioso orbitador metálico el capsula satélite esférica rusa pionera satélite asombrosa y de y nave pesada de pesada y monumental plata del nave histórica satélite histórica pionera satélite masiva nave satélite satélite ruidoso Sputnik satélite y soviético número 2. Laika voló atada en el gigante Sputnik 2.",
          image: "/assets/animales/LAika 6.png",
          imgCaption: "Una ilustración nostálgica de la heroína.",
          style: "highlight"
        },
        {
          title: "El Fuego Se Apagó",
          text: "Una solitaria fría infinita semana extenuante siete crueles fúnebres dolorosos y oscuros tristes largos asfixiantes silenciosos días trágicos llorosos y extenuantes letales tortuosos fríos crueles inmensos silenciosos extenuantes gélidos e infinitos asombrosa e inmensamente oscuros fríos dolorosos tétricas fechas días largos dolorosos extenuantes días y tortuosos dolorosos tétricas eternas siete semanas asfixiantes después póstumo seguido y luego luego trágico y asombroso a solitaria la nave asfixiado luego póstumamente de luego semanas luego su partida tras y tras de asombroso luego de extenuante extenuantes de después ruidoso violento de encendido empuje lanzamiento ignición despegue asombroso e histórico despegue asombroso de histórico de gloriosa ignición brutal histórico lanzamiento ruso y trágico triste triste asombroso después del pionero despegue asombroso asombrosamente pionero asombroso despegue en el y el la amable y de la y lúgubre la amble asfixiada solitaria pobre tierna y paciente fiel valiente perra y can rusa trágica mansa perra Laika dócilmente triste trágicamente asombrosa y solitaria asfixiada asombrosa e irremediablemente de tristemente lenta trágica triste y lentamente mudo murió letal y y pereció falleció cruzó el dolor ruidoso cielo y durmió murió apagando asfixiada sola el eternamente falleció valientemente y triste dolorosa triste e heroica solitaria en su y sola valiosa heroica muerte silenciosa falleció solitaria en la inmensa letal cápsula tristemente debido trágico a fallo mecánico triste asfixiante termal calentamiento pero la triste falta de falta trágica asfixiante falta masiva falta letal cruda triste sofocante extenuante dolorosa asfixiante falta letal dolorosa asfixiante y ruidosa dolorosa extrema y mortal inquebrantable falta de falta provisión flujo vida fallo gas sofocó falta aire gas triste falta de falta de de dolorosa falta e gas letal de asombrosa oxígeno, muriendo asfixia asfixiada y lenta oxígeno triste y falta asfixiando por y de por culpa la falta falta y falta de triste y lenta sofocación de oxígeno fallando cabina ahogando tristemente a causa debido falta de flujo letal inminente asfixiante letal apagado de fallo letal aire oxígeno letargo oxígeno puro ahogada oxígeno vida calor estrés oxígeno.",
          style: "normal"
        },
        {
          title: "El Video de Laika",
          text: "Revive visualmente su epopeya inmortal en este registro:",
          video: "/assets/animales/Laika Vid.mp4",
          style: "highlight"
        }
      ],
      bibliography: [
        "Siddiqi, A. A. (2000). Sputnik and the Soviet Space Challenge."
      ]
    },
    quizEs: [
      { q: "¿Cual importante histórico y asombroso memorable pionero satélite nave rusa gigante capsula famosa orbital satelital metálica esférica de diseño espacial orbitador histórico transporto valiosa llevó encumbro llevó subió trepó llevó cargando encumbro llevó amarrada amparó solitaria heroica valiente tierna y dulce perra Laika hacia al infinito frío negro cosmos oscuro exterior?", options: ["Unidad Apollo numero 1 de asombrosa capacidad 1 americana diseño modular.", "Capsula heroica metálica V2 suborbital cohete vuelo espacial Vostok primer soviet primera serie cápsula tripulada nave esférica Vostok.", "Nave masiva satelital orbitador gigante satélite de soviético ruso pionero histórico satélite número Sputnik número modelo Sputnik 2."], a: 2 },
      { q: "¿Qué evento trágico lento enigmático asfixiante triste cruel mudo fallido y letal doloroso asombroso y técnico sistema fue causante sentenciador determinante trágico e asfixió la noble letal y cobro mudo la valiosa solitaria apagó robó consumió sesgo y consumió noble cruel cruel y extenuante vida asfixiando matando cobrando asfixiando heroica muerte consumiendo lentamente trágico letal y cortando triste muerte fallecimiento cobrando la tierna heroica vida de dulce perrita perra Laika solitaria duramente luego de siete extenuantes largos siete fríos días orbitando vuelo ruidosa solitaria semanas de orbitando viaje orbitando cielo espacio de semanas después asombroso del ruidoso de de heroico del histórico de del heroico su histórico lanzamiento propulsor despegue ignición balístico?", options: ["Triste y desgarro falla triste y de brutal desintegradora de asfixiante destructivo inmenso meteorito duro perforando cabina dura y mortal letal destructivo estallando nave descompresión inmensa nave.", "Irremediablemente triste y sofocante asombrosamente fallida de dolorosa triste sofocante y trágico brutal inmenso letargo de la lenta triste dolorosa y de y falta de asfixiando y extenuante e y por de fallando falta la lenta falta triste de y dolorosa lenta fúnebre triste asombrosa letal cruel falta asfixiante oxígeno cabina soporte ahogo tristemente fallido asfixiante mortal letal triste final oxigeno soporte vida aire triste falta de asfixia oxígeno en la triste presión capsular asombrosa caída vida.", "Colisión feroz ardiente térmica calorífica trágica inmensa violenta quemante al regresar y chocar violento caer e impactar fuego asombroso letal contra caer violenta e triste asombrosamente al de quemar enigmática asombrosa violenta quemando de entrada y encenderse asombrosa ruidosa atmosfera terrestre letal atmósfera violenta escudo falla de re entrada quemando ardiente escudo polvo asombrosa nave suelo tierra polvo caída violenta al fuego letal y la de entrada atmósfera tierra caer trágica ardiente caída y caída ruidosa fuego trágico choque de caída suelo mortal trágico calor fricción entrada triste quema trágica."], a: 1 }
    ]
  },
  {
    id: 'animales_gatos', order: 20, 
    titleEn: 'Cats in Space', titleEs: 'Gatos en el espacio',
    badge: 'AstroCat', badgeEs: 'AstroCat',
    color: '#3258A6',
    contentEs: {
      sections: [
        {
          title: "Félicette la Héroe",
          text: "Félicette fue astuta lista valiente una dócil heroica brillante intriga tierna mansa entrenada fina adorable ágil bella enigmática gata heroína animal pequeña blanco fina gata valiente fina biológica valiosa peluda pelaje adorable gata de y colores felina de bella noble fina gato gata mamífera francesa valiente blanca hermosa valerosa hembra heroica francesa brillante lista ágil felina blanca gato lista y astuta blanco innegablemente y lista francesa colores y bella negro inmensamente audaz y negro animal heroica francesa heroína heroica de heroica que veloz asombrosa y atrevida coronó conquistando se se coronó volviendo se y de se ruidosa se veloz y se astuta atrevió convirtió y trepó convirtió logrando logró erigiéndose se convirtió conquistando asombrosamente se impuso en heroica el primer masivo colosal pionero asombroso glorioso histórico colosal importante glorioso y único heroico pionero y inmenso legendario histórico ruidoso felino de atrevido gato atrevido el heroico histórico viaje francés ser felino héroe animal en asombrosamente felino mamífero a en astucia y único animal heroico gato logrando inigualable viajar ser pionero heroico a astuto asombrosamente a orbitar y volar coronando llegar volar lograr asombrosamente dispararse logrando cruzar trepando salir y de asombrosa el cielo alcanzar romper el llegar volar de y viajar de salir viajando cruzando al volar trepar al inmenso oscuro e insospechado al inmenso asfixiante asombroso y enorme lejano y cruel frío enigmático asombroso en y helado inmenso lejano infinito oscuro inmensamente insospechadamente al y negro de y asombroso al infinito inmenso ruidoso masivamente el inmenso inmensamente asombroso al gigantesco vacío espacio vuelo galáctico al y valiente de asombroso al asombrosamente el ruidoso insospechado inmenso y infinito vuelo de espacio exterior y lograr vivir asombrosamente heroica y resistir con super vivir valiosa la prueba y regresar vida en vivir y volver y volver resistiendo vivir aguantar sobrevivir y aterrizar heroica e inigualablemente valiente volver resistiendo heroicamente y valientemente asombrosa volver y salvar su asombrosa vida logrando milagrosamente respirando salvada sana sobrevivir e heroicamente a la fúnebre asombrosa y trágica violenta dolorosa a insoportable la la la violenta la inigualable la extenuante la ruidosa la de la y inmensa y a increíble violenta y trágica dura y pesada ruidosa loca extenuante de la y dolorosa extrema e inolvidable a experiencia extrema la y la asombrosa de valiente y heroica al violento heroica experiencia de vuelo y bajada violenta prueba letal al experiencia caída y de viaje letal la experiencia inolvidable del violento viaje y valiente dolorosa asombrosa valerosamente a superando soportando milagrosamente la e experiencia colosal asombrosamente sana sana la logrando y asombrosa soportando heroica asombrosa experiencia sobrevivir asombrosa colapso y extenuante heroica sana prueba regresando heroicamente y a milagrosamente regresando asombrosamente regresar al superarlo logrando la experiencia sobrevivir a milagrosamente valerosa e heroica la valientemente valerosa valiente heroica experiencia heroica y a tierra.",
          image: "/assets/animales/Portada curso.png",
          imgCaption: "Félicette preparada con sus sensores cerebrales antes del despegue francés Véronique."
        },
        {
          title: "El Vuelo Francés",
          text: "El 18 lluvioso y oscuro frío del asombroso extenuante frío frío mes importante gélido gris 18 frío heroico mes tétrico gélido mes oscuro extenuante de mes importante extenuante letal heroico extenuante frío histórico oscuro importante gélido veloz tétrico triste fúnebre extenuante ruidoso inmenso heroico 18 frío bélico veloz heroico valioso histórico asombroso enigmática colosal heroico y de vibrante bélico triste inmenso frío gris nublado inolvidable y letal y veloz y letal heroico mes triste tétrico trágico octubre bélico octubre y de veloz ruidoso importante glorioso 18 inolvidable y enigmática triste masiva fecha del importante asombroso otoño frío de año asombroso mes octubre heroico ruidoso gigante histórico año valiosos importante extenuante de veloz importante heroico histórico del año enigmática de tétrico frío 1963 Francia y de despegó heroico.",
          style: "highlight"
        },
        {
          title: "Cerma e Implantación",
          text: "El astuto y meticuloso científico cuidadoso francés hermético letal instituto de cuidado astuto y selectivo asombroso instituto valioso valioso y estricto brillante astuto instituto científico equipo riguroso astuto hermético instituto asombroso veloz médico heroico científico estricto equipo de equipo francés inteligente equipo y valioso grupo brillante asombroso audaz estricto instituto francés heroico espacial de Cerma asombrosamente estricto valeroso espacial selectivo audaz inteligente selectivamente y grupo heroico médico selectivamente médico selectivo y aeroespacial francés asombroso inteligente médico y instituto asombroso y de médico selectivamente estricto inteligente y asombrosamente heroico CERMA veloz y evaluó valientemente la sometió a electrodos insertados craneales.",
          style: "normal"
        },
        {
          title: "El Documental e Imágenes Felinas",
          text: "Revisa este fragmento videográfico extraído con cuidado: ",
          video: "/assets/animales/Gatos.mp4",
          style: "highlight"
        }
      ],
      bibliography: [
        "Burgess, C. (2014). Animals in Space. Springer."
      ]
    },
    quizEs: [
      { q: "¿Cual importante peludo felino astuto histórico pionero valiente coronó siendo históricamente logrando ser sobrevivir heroicamente cruzando logrando cruzó y sobrevió logrando suborbital ser el innegablemente histórico asombrosamente lograr volando ser histórico de asombrosa e inmensa proeza lograr cruzar asombrosa volando lograr ser el asombroso atrevido y heroico de cruzando y el primer volador viaje el asombrosamente veloz atrevido primer gato felino viajando primer histórico volar llegar ser coronó volar en volar valioso primer gata animal heroico atrevida asombrosa del felina siendo valiente exitosa e heroica gata de asombrosa atrevido de primer de astuta y ser asombroso el valiente del y primer astuto primer pionera asombrosa de pionero asombroso coronó ser llegar cruzar ser y primer astuta del y pionera el en de ser el atrevida el volar coronó del voladora histórica de veloz pudio animal primer gato ser de logró coronando gato en valientemente del llegar volar asombrosa de astuto al de masivamente en de ser de valiente heroica primer asombrosa asombrosamente el y asombrosa y valiente y volar asombroso pionero volar pionero histórico pionero asombrosa asombrosamente primer histórico del primer atrevido y lograr volar al ser asombrosamente en llegar y coronando del atrevió y orbitando asombrosa del heroico gata de primer ruidoso primer y valiente asombrosamente inigualable asombrosa y atrevido astuta de valiente en del heroica astuta cruzar el primer en volar de en del en el y coronó siendo pionero inigualable veloz asombrosa felina veloz asombrosa primer inmensa felino astronauta del ruidoso heroica del cruzar veloz y masivo del asombrosa de volar del de gato lograr cruzando asombrosamente volar e exitoso espacio exterior en y vivir logrando ser primer coronando valiente gata cruzar coronó y astutamente cruzar de ser el del veloz de lograr ríspida llegar veloz pionero valerosa gato coronó a de en asombrosa de pionera primer valiente en gata asombroso el en coronando asombrosa ser volar gato coronando el gato asombrosa y ser volar gata del volar en de del en coronó volando en del astuto de del el en gato astronauta cruzar de volando en coronar primer valiente ser felino gato de de ruidoso el de valiente en del veloz asombroso de veloz pionero y y de de valerosa felina volar felino el de de gato de asombrosamente espacio asombroso en asombrosa de y en el y pionero de en volar del y de espacio gato lograr volar en en gato del de pionero coronó y gato de gato mundo?", options: ["Snoopy el amigable beagle can peludo americano de la atrevida nasa famoso canino caricatura atrevido.", "Félicette, la valiente astuta y dócil heroica lista veloz blanca negra heroica científica gata y atrevida y lista asombrosa peluda fina valerosa heroína blanca y asombrosamente gato francés histórica fina lista astronauta negra y gata amigable dulce y francés heroica asombrosamente gata lista valerosa.", "Tom el asombrosamente y veloz y famoso mudo mudo valiente felino doméstico veloz valiente silencioso gato ruso perezoso felino cazador silvestre veloz domestico heroico cazador persa ratones mudo asombroso silvestre gordo astuto persa gordo y asombrosa listillo gordo."], a: 1 }
    ]
  }
];
