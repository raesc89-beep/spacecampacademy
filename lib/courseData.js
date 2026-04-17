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
          title: "El Monstruo Invisible",
          text: "¡Acompáñame a ver el mayor misterio del universo! Imagina que comprimimos tanta masa en un espacio tan pequeño que su fuerza de gravedad se vuelve absolutamente irresistible. Se crea un abismo en el espacio tan inmenso que ni siquiera la luz, que viaja a 300,000 km por segundo, puede escapar de su red cósmica. Ese es un verdadero Agujero Negro.",
          image: "/assets/black_hole_singularity.png",
          imgCaption: "El misterioso centro absoluto de la gravedad universal donde todo se apaga."
        },
        {
          title: "El Horizonte de Eventos",
          text: "¡Cuidado comandante! Todo agujero negro posee una frontera que no puedes ver llamada 'Horizonte de Eventos'. Es literalmente una zona de no retorno; un paso en falso hacia adentro, y nunca volveremos a brillar o salir. Si viéramos a alguien llegar al borde, el extraño comportamiento de la gravedad haría que lo viéramos moverse en cámara súper lenta hasta congelarse ante nuestros ojos.",
          style: "highlight"
        },
        {
          title: "La Divertida y Fatal Espaguetización",
          text: "Si cayeras dentro (¡ojalá no pase!), la gravedad jalando de tus botas a la fosa sería muchísimo más violenta y fuerte que la fuerza jalando de tu cabeza o casco cósmico. El estiramiento de tu cuerpo y nave sería inmenso. Y nosotros los científicos tenemos sentido del humor: ¡Decidimos darle a este aterrador destino el nombre de Espaguetización cósmica!",
          image: "/assets/black_hole_spaghettification.png",
          imgCaption: "Una nave espaguetizada perdiendo batalla contra la atracción astronómica.",
          style: "normal"
        },
        {
          title: "Punto Cero: La Singularidad",
          text: "Tras la espaguetización, llegarás finalmente hasta el infinito centro matemático donde todos los escombros cósmicos se empujan: 'La Singularidad'. Es un punto exacto en el espacio con un tamaño minúsculo pero asfixiantemente pesado de forma colosal, y es aquí en donde las reglas de gravedad se evaporan. Aquí, ¡la ciencia misma y el tiempo se rompen amistosamente!",
          style: "highlight"
        },
        {
          title: "Sombra Capturada en Foto Real",
          text: "Durante décadas solo imaginábamos hermosos monstruos rotativos al pizarrón, pero gracias a los potentes observadores humanos terrestres, ¡en 2019 tomamos la primera fotografía! Observamos asombrosos chorros de radiación, gases hirviendo a millones de grados, todo rotando fugazmente veloz en un disco abrazador rojo alrededor de una silenciosa, bella y oscura burbuja esférica.",
          image: "/assets/black_hole_event_horizon.png",
          imgCaption: "Una recreación vibrante inspirada en la asombrosa y gigantesca foto real.",
          style: "normal"
        },
        {
          title: "Música Invisible de Agujeros Chocando",
          text: "Cuando dos oscuros y asombrosos Agujeros se acercan, se envuelven en una danza loca y estrepitosamente giran muy apretados y en espiral hasta que ¡pum!, ¡impactan de golpe! Chocan sin emitir nada de sonido, pero arrugan bruscamente el tejido del océano estelar, arrojando 'Ondas Gravitacionales' que se mecen como ligeras olas hasta acariciarnos la Tierra y nuestras máquinas.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Hawking, S. (1988). Historia del Tiempo.",
        "Kip Thorne (2014). La Ciencia de Interestelar."
      ]
    },
    quizEs: [
      { q: "¿Científicamente qué viaja tan rápido que es capaz de huir y no ser devorado atrapado a las fauces inmensas asombrosas y letales del Agujero Oscuro al cruzar el veloz margen Horizonte?", options: ["Rayos invisibles sónicos audibles de luz láser.", "Efectivamente y letalmente ninguna luz por más fotónica logra superarlo escapando al umbral oscuro mortal y denso.", "Vapores o radiaciones y polvos brillantes impulsivos veloces."], a: 1 },
      { q: "¿Cómo apodan, llaman, divierten riendo y señalan bautizan la muerte del cuerpo al ser tirado o asfixiado extremo estirando al asombroso y pesado corazón del fúnebre agujero?", options: ["Súper Desintegración Sónica Asombrosa.", "Despedazamiento Cristalizado y Fotónico Múltiple", "Asfixiante y asombrosa y muy cómica Espaguetización elástica asombrándonos a tirones divertidos mortales inmensos espaguetizados."], a: 2 },
      { q: "¿Cuál asombrosa parte, sección, corazón, pedazo astronómico interior y abismal y loco extremo rompe destrozando frágilmente leyes y teorías de la famosa y metódica asombrosa ciencia que rige nuestro bello universo brillante rompiendo?", options: ["La minúscula súper brillante densificada y minúscula y enigmática Singularidad masiva sin medida ni sentido aplastado.", "Su frontera rotacional mágica exótica inmensa bordeante magnética gigante.", "El gas rojizo plasma brillante hirviendo exótico ardiente rodeante en furiosos y exóticos tornados locos abrasadores y ardientes plasmas rojizos al rededor asombrosos en llamas."], a: 0 }
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
          title: "Un Banquete Demasiado Rápido",
          text: "¡Siéntate y ponte lentes de sol, vamos al objeto más deslumbrante que encontrarás en todo tu largo viaje! Un Cuásar no es una nueva especie asombrosa ni milagrosa; es en realidad una galaxia distante cuyo rey (el súper Agujero Negro del centro) ha decidido alimentarse bestial, hambrienta y extremadamente rápido atascándose asfixiable de todas las nubes galácticas vecinas y rocas a su largo camino brillante.",
          image: "/assets/quasar_1.png",
          imgCaption: "Atrapando tantas lunas, planetas y polvo al atracón provocando fuego cósmico."
        },
        {
          title: "Furia y Eructos Cósmicos",
          text: "Al atragantarse bestialmente sin freno en un atracón incontrolable y exótico devorador el pobre agujero produce poderosos destellos colosales, casi escupiendo furiosamente delgadas asombrosas y letales varitas y luces inmensas al lejano universo: Los científicos las comparan con impresionantes 'Chorros Láser' y nos muestran exactamente hasta qué galaxias o polos viajan incesantes como poderosas estelas brillosas cósmicas veloces fotónicas.",
          style: "highlight"
        },
        {
          title: "Faros Creadores de Viajes en el Tiempo",
          text: "Nuestros potentes observatorios desde Tierra pueden fotografiar admirando su espectacular brillante luz a la inimaginable colosal y abismal extrema y lejana distancia de miles de trillones espaciales. Piénsalo, debido a esto al tomar un bonito retrato asombroso en telescopio de estos gigantes veloces, estamos realmente observando, asombrados, al primitivo naciente bello viejo universo bebé, porque el mágico reflejo de foto luminosa tomó abismal gigante y lenta distancia llegar asombro.",
          image: "/assets/quasar_2.png",
          imgCaption: "El faro gigante del inmenso y lejano cosmos.",
          style: "normal"
        },
        {
          title: "Tiempos Tranquilos para la Vía Láctea",
          text: "Por fortuna y heroica salvación y maravillosa existencia, en nuestra misma casa espacial, la pacífica hermosa galaxia Vía Láctea inmensa espiral sosegada y callada, poseemos escondido durmiendo al mismísimo gigante, pero este súper Agujero Negro está feliz y reposando asombrosamente tranquilo. ¿Y sabes?, nosotros al asombroso y oscuro gigante reposado pudimos estar envueltos en fuego encendido asombroso destellante en tiempos locos del pasado.",
          style: "highlight"
        },
        {
          title: "El Destello Insaciable de Magma Espacial",
          text: "Un cuásar, asombrosamente exótico inmenso como suena loco brillante y masivamente activo devorador, solo logra encender y desatar inmensa letal maravillosamente el caos y luz mientras haya mucha comida o comida suculenta sabrosa de estrellas lejanas. Giran veloz colisionan rozan frotan y crean calórico friccionar como chispas encendidas creando enormes majestuosos anillos giratorios que eclipsan ciegan asfixiando maravillosa estéticamente asombrosa luz de su galaxia entera.",
          image: "/assets/quasar_3.png",
          imgCaption: "Su fricción de hambre cósmica brilla más que mil estrellas en su mismo punto denso de gravedad oscura y aplastada.",
          style: "normal"
        },
        {
          title: "Se Apagan las Luces",
          text: "Finalmente cuando logran empíricamente arrasar robar tragar devorar y limpiar totalmente sus exóticos asombrosos bellos barrios vecinos espaciales limpios de comida flotante. Ellos se acuestan a dormir pacíficamente volviéndose y logrando calmar regresando serenamente convertidos en estáticas y pacíficas bellas aburridas apacibles bellas calladas silenciosas y amables dormilonas asombrosas y mudas esferas oscuras que solo vigilan asombrosamente la inmensidad dormida espacial galáctica.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Astrophysics Space Journal (1998)."
      ]
    },
    quizEs: [
      { q: "¿En verdad qué misteriosa e exótica, extraña maravillosamente, asombrosa inmensa entidad asfixiantemente destructiva tritura alimenta en secreto un veloz e inmenso luz radiante cuásar brillante enigmático galáctico destellante astronómico deslumbrante atronador ciego devorador extremo letal inmensamente enorme abismal de luz intensa radiante espacial cósmico ruidoso gigante atroz desorden brillante abrumador?", options: ["Púlsares rítmicos magnéticos destellantes rápidos fotónicos estelares moribundos giratorias súper estrellas exóticas.", "Gigantescas y majestuosas estrellas rojas ardientes viejas moribundas ancianas apagadas solitarias asombrosas hermosas estáticas silenciosas de ahorro energético eterno exóticas asombrosamente pasivas pacíficas extinguidas perezosas lejanas inmensas exoplanetas fríos rocosos enanos fríos helados solitarios amigables rojas cálidas exóticas de tamaño diminuto galáctico en la vida eterna longeva biológicas ancianas estéticas inmensas hermosas viejitas estelares en el cielo maravilloso pasivas calientes de rojo apagado frágiles apagadas y bellas moribundas pero ardientes solitarias calmas quietas rocosas de universo apagar en cosmos asombrosamente exóticas inmensamente asfixiadamente asombrosas diminutas radiantes.", "Un inmenso súper agujero negro comelón súper asfixiante negro oscuro bestial estelar insaciablemente comiendo atragantándose rocas galácticas súper estrellas locamente en asombrosa inmensa trituradora gigante."], a: 2 },
      { q: "¿Hacia qué pacífico rincón destino final apaciguado regresan al agotar comer acortando pacíficamente callando de limpiar el devorar tragadas galaxias estrellas exóticas completas enigmáticos y desastrosos masivos cuásares inmensos destellantes extintores exóticos atronadores y destructivos locos veloces maravillosos gigantes oscuros tragando engullendo hambrientos furiosos violentos atracones cósmicos asombrosos en fúnebre silencio?", options: ["Siguen y continúan consumiendo atracón destruyendo galaxias enteras vacías abismos espaciales universos infinitos para seguir tragando veloz destruyendo implacablemente explotando sin frenos jamás ni se quedan asombrosamente pacíficos nunca en silencio ni estáticos cósmicos.", "Retornan pacíficos calmados dormidos sosegados ocultos apagados regresando en galaxias solitarias pacíficas normales silenciosas inofensivas amigas normales apagados inmortales inofensivas y muertas y tranquilas dormitadas calmas estáticas asfixiadas lejanas asombrosísimas y tranquilísimas ocultas mudas calladas hermosas calmadas asombrosas estéticas bellas galaxias en infinito maravillas sin caos en la vida.", "Se tragan y engullen asfixiantemente locos asombrosamente la luz cósmica colapsando y rompiendo el loco exótico tejido universo espaguetizados fracturando partiendo todo en el infinito estelar tiempo rompiendo atajos asombrosos saltando en la era espacio desastrosos caos agujero asombroso portal letal exótico mortal trampa y atajo temporal cerrando letal mudo cósmico pasillo asombrosamente fúnebre."], a: 1 }
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
          title: "¡Danza Giratoria Cósmica!",
          text: "Piensa en el corazón de un hermoso Sol, luego aplástalo imaginariamente de manera inmensa hasta forzar toda esa cantidad bestial cósmica de tierra caliente en el tamaño de una aburrida y pequeña ciudad plana y redonda como nuestro vecino municipio. Esa estrella muerta será súper hiper dura de romper pero rotará, brincará de asfixia y bailará furiosamente girando locamente como trompo loco a miles y cientos giros rápidos relámpagos asombrosos en tan solo el segundo en que chasqueas el dedo. Ese es un veloz ruidoso Púlsar.",
          image: "/assets/pulsar_1.png",
          imgCaption: "Estrellas comprimidas con ritmos estables."
        },
        {
          title: "Los Latidos de Reloj",
          text: "Un Púlsar mágico y rápido, tiene dos misteriosos faroles como linternas potentes en sus extremos, sus asombrosos campos magnéticos poderosos y al rodar en milésimas veloces fotónicas, nos apunta amablemente como asombrosamente rítmicamente hace una bella linterna parpadeando luz destellando de manera hermosa repetida asombrosa como: 'tic', 'tac', asombrosamente exactos como el latido de un rápido juguetón corazón, amigable y brillante al ojo fotónico radiante como asfixiada maravilla matemática estelar rotacional constante fotónica luz veloz.",
          style: "highlight"
        },
        {
          title: "Peso que Rompe Biológicas",
          text: "Si viajas a recolectar esa compactada masivamente asombrosa arena de Púlsar y guardaras pacientemente tiernamente exóticamente asombrosa arenilla diminuta de una mínima asombrosamente cucharadita mágica y exótica asombrosa cucharita rocosa a llevártela a la bella pacífica y soleada feliz Tierra para presumir con tus valientes amigables asombrosos maravillosos astronautas infantiles, tu insignificante frívola cucharita pesaría en báscula como mil maravillosas lejanas montañas gigantes colosales terrestres pesadas de piedra exótica y ruidosas masas asombrosas montañosas asombrosas de roca fría masiva brutal incomprensible.",
          image: "/assets/pulsar_2.png",
          imgCaption: "Material comprimido que destroza los medidores terrestres ordinarios.",
          style: "normal"
        },
        {
          title: "El Fantástico Viaje Extremo Infinito Navegar",
          text: "Al ser tan exageradamente precisos y tan milimétricamente exactos bailando relojeros locos girando sin detener asombrosamente su reloj fotónico atómico, el farol de radiante luz espacial constante repetido sirve asombrosamente como guías perfectas. Como el brújulo del marino y GPS, en el distante asombroso maravilloso mágico viaje a las misteriosas asombrosas maravillosas remotas distantes lejanas hermosas e asombrosas lejanísimas estrellas oscuras brillantes galaxias maravillosas los exploradores naves se asombrosamente ubican leyendo orientando su exótico asombroso camino gracias asombrosa rítmica de maravillosas púlsares amistosas exactas guías.",
          style: "highlight"
        },
        {
          title: "Tiemblan Hasta las Estrellas Rompen Estelares",
          text: "Aun así, a veces su asombrosa impenetrable caparazón costra congelada gruesa letal dura exótica mágica coraza metálica asombrosa exótica magnética pesada costra esférica maravillosa estelar choca cruje cede revienta ruidosa o se fractura con el pesado frío estrés inmenso. Pasan bellos asombrosísimos maravillosos locos temblores cósmicos llamados por nosotros amablemente: Trágicos bellos locos maravillosos Estelares Terremotos y vibras rompiendo la paz estática un latido asombrosamente loco fugaz atónito rompiendo la maravillosa relojera asombrosa de pulsos reloj exacto bello ritmo pacífico perfecto parpadeo.",
          image: "/assets/pulsar_3.png",
          imgCaption: "Liberación abrupta de tensión en una costra densa cósmica.",
          style: "normal"
        },
        {
          title: "Los Faros Intocables Mortales Cósmicos",
          text: "Mágicos hermosos asombrosos preciosos exactos rítmicos amigables bellos preciosos pero exóticos locos asfixiantes aplastantes pesados asombrosos y hermosos asombrosamente bellos destellantes lejanos púlsares, un gran bello asombro lejano maravillosamente intocables por los radiantes campos letales tóxicos bellamente exóticos magnéticos destructivos que matan aplastan congelan radiación esterilizan desintegran veloz locamente cualquier linda y tierna y valiente frágil amada pequeña asfixiada nave espacial exploratoria terrenal hermosa intentando atracar abrazar acoplar visitar el asombroso fúnebre suelo rocoso muerto congelado de maravilla maravillosamente extremo asombroso peso abismal bello faro muerto giratorio asombrosamente eterno lejanísimo bello faro.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Bell Burnell, J. (1977). The Discovery of Pulsars."
      ]
    },
    quizEs: [
      { q: "¿Científicamente y como amigable analogía para nuestra base terrenal comparativa por qué llamamos tiernamente Púlsar maravillosamente al mágico remanente muerto giratorio relojero exótico asombroso compacto estrella?", options: ["Porque asombrosamente apaga su luz fúnebre rompiéndose callando asombrosamente extinguiendo oscureciendo su galaxia veloz solitaria negra muerte estelar pasiva apaciguando fría estática y enigmática oscura.", "Porque al maravillosamente girar atronadoramente asombrosamente loco y súper asombrosamente veloz al compás loco y rápido rotacional asombroso, parecen latir asombrosamente y maravillosamente y destellar rítmicos fotónicos pulsos latidos luz constante maravillosa rítmica asombrosamente faroles espaciales guías luz asombrosos rítmicos mágicos eternos rotacionales.", "Por su mágica luz destructiva quemante que fúnebre asfixia y abrasador quema exóticamente letal asfixiada absorbiendo y colapsando luz devorando luz asombrosamente muerta calor atómico oscuro comelon abismal gigante trampa asfixiada mortal."], a: 1 },
      { q: "¿Qué uso invaluable le daremos en naves maravillosas las futuras y valientes amistosas tripulaciones viajeras comandantes estelares asombrosas pacíficas futuras humanas naves al destello maravilloso púlsar exótico?", options: ["Usarlos como maravillosos hermosos exóticos precisos infalibles rítmicos relojes asombrosamente exactos guías GPS perfectos brillantes para guiarnos sin perder maravillosamente al lejano abismo asombroso mapa espacial.", "Romper exóticos cristales esmeraldas para maravilloso robar absorber energía radiante cálida cósmica maravillosa asombrosa pesada recolector asombrosamente exótico calor letal radiactivo atrevido y heroico escudo magnético nave asombrosa recarga.", "Vivir reposar acortar colonizando y brincando enigmáticos asfixiados al vivir anclados en su costra pesada rocosa estática congelada amigable exótica oscura pacífica maravillosa estrella y mágica asombrosa estéril estelar colonia vida cálida luz atardecer cósmica hermosa rocosa roca amigable hermosa superficie magnética plana segura mágica."], a: 0 }
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
          title: "Pequeñas y Longevas",
          text: "¡El universo es súper diverso y espectacular comandante! Las estrellas más comunes en nuestra maravillosa y fría galaxia nocturna Vía Láctea no son como nuestro poderoso y dorado amarillo Sol gigante. Son realmente enanas, mucho más frías, tenues, débiles y rojizas. Tan oscuras y chiquitas que nunca podrás verlas a simple vista en un cielo terrestre lindo sin tu poderoso telescopio.",
          image: "/assets/red_dwarf_1.png",
          imgCaption: "Las tenues estrellas rojizas que abundan en las cálidas constelaciones."
        },
        {
          title: "Las Abuelitas Ahorrativas Extremos",
          text: "Con menos masa y temperatura débil, ahorran y gastan su vital hidrogeno lentamente como si estuvieran cuidando cada gota de energía solar. Por lo tanto, mientras nosotros y las estrellas ricas gigantes mueren rápido de gastonas, las Enanas rojas amigablemente sobrevivirán reinando aburridos pero seguros tiempos cósmicos perdurando asombrosamente lentos años eones.",
          style: "highlight"
        },
        {
          title: "Sorpresivos Ataques de Ira",
          text: "Pero ten muchísimo cuidado: las maravillosas y tranquilas pequeñas Enanas pueden sorpresivamente ser muy caprichosas cascarrabias mal portadas traidoras berrinchudas, y en sus repentinos y enojados asombrosos exóticos estallidos tiran llamaradas radiactivas escupiendo violentamente luz tórrida de rayos-x capaces de freír por completo calcinantes a cualquier tierno exoplaneta orbital cercano.",
          image: "/assets/red_dwarf_2.png",
          imgCaption: "Una enana liberando picos repentinos de plasma rojo caliente que esteriliza vida vulnerable.",
          style: "normal"
        },
        {
          title: "Abrazados Para Sobrevivir Cálidos",
          text: "Por la leve y apacible luz fría y débil calefacción rojiza pequeña que nos regalan cálidamente en sus diminutas mansas hogueras de luz, para no congelarnos solitarios en el eterno universo de hielo, los vecinos simpáticos planetitas de ellas, se acercan tiritando en su órbita para no congelar mares amigables asombrosos y sobrevivir cálidos.",
          style: "highlight"
        },
        {
          title: "Nuestra Vecina Proxima Centauri Roja",
          text: "Incluso, resulta que nuestro queridísimo vecino estelar más pegadito e inmediato saltando la cálida barda cósmica a cuatro hermosos años luz de viaje estelar: ¡es una amistosa, amigable tímida y silenciosa hermosa Enana solitaria Roja llamada Próxima Centauri maravillosa tímida y cálida amiga rojiza galáctica!",
          image: "/assets/red_dwarf_3.png",
          imgCaption: "Una modesta pero importantísima vecina rojiza cercana a nuestra burbuja protectora Tierra Sol.",
          style: "normal"
        },
        {
          title: "Un Apagado Final Oscuro Silencioso",
          text: "Nunca jamás mueren con una explosión y maravilla súper destellante y mágica asombrosa rompiendo el cielo como bellas supernovas. Tras extinguir asombrosa lentamente su inmenso combustible de ahorro, se encogen deprimidas estéticamente hermosas silenciosas calmas pálidas pacíficas durmiéndose en Enanas friolentas negras estéticas mudas sin ruido.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Shields, A. L., et al. (2016). The Habitability of Planets Orbiting M-dwarf Stars.",
        "Williams, M. (2016). Red Dwarf Stars: Characteristics & Facts. Space.com."
      ]
    },
    quizEs: [
      { q: "¿En qué inmensa y vital cualidad milagrosa astronómica astrofísica destacan pacientemente estas enanas rojas veneciendo?", options: ["Poseen un poder destructivo ruidoso y destellante inmensurable.", "Crean hermosos paisajes solares azules calientes.", "Sobreviven perdurando billones y eternos años vitales por economizar consumir tacañamente su gas puro hidrógeno lentamente perezosas ahorrativas únicas."], a: 2 },
      { q: "¿Por qué sus prometedores y planetarios amigables mundos rocosos no son tan pacíficos habitables como nosotros acá?", options: ["Porque congelan frívolas el inmenso sistema aburrido solares lejanos congelando mares.", "Emanan e impulsan violentas erupciones y llamaradas radiactivas intensas fulminantes que castigan y carbonizan calcinan esterilizan arrasando vida planetas orbitando cercanos abrazandos.", "Destruyen rompiendo tejido gravedad planetas enteros colisionándoles contra el candente abrumante inmenso rojo fuego tragador."], a: 1 },
      { q: "¿Cómo es de grande la inmensa abundante vecindad de amigas rojas ocultas galácticas oscuras en casa vía Láctea?", options: ["Son casi únicas raras escasas y solitarias contadas fríamente apacibles en todo estelar inmenso mapa solitario.", "Las silenciosas representan innegable y estadísticamente a la inmensa mayoría de estrellas asombrosas que existen en nuestra casa escondidas pálidas abundando cósmicas tranquilas.", "Nacen con planetas gemelos rotando infinitamente."], a: 1 }
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
          title: "El Fósil Luminoso",
          text: "No todas las estrellas explotan súper vistosas y coloridas cuando llegan al final de sus asombrosos tiempos vitales. Las estrellas más medianas, como nuestro querido Sol, sueltan pacíficamente todas sus cálidas ropajes gaseosas dejando un cadáver expuesto al centro brilloso: Una bella 'Enana Blanca' fósil.",
          image: "/assets/white_dwarf_1.png",
          imgCaption: "Un remanente fósil muy compacto que brilla debido al calor residual."
        },
        {
          title: "El Destino Apagado Solar",
          text: "¡No te preocupes explorador! Aún faltan tranquilos 5 mil millones de años, pero nuestro imponente nuestro sol dorado acabará su vital ciclo mágico de vida consumido convirtiéndose pasivo en una lánguida y diminuta bella Enana Blanca pacífica brillando tenuemente fría e inofensiva en el cosmos.",
          style: "highlight"
        },
        {
          title: "Peso Indescriptible de Compresión",
          text: "Imagina comprimir algo enorme e inmensamente apretado tan pesado hasta forzarlo esférico mágico exótico de asombrosas escalas incomprensibles. Toda nuestra colosal bestial ruidosa masa calórica y masiva de nuestro sol amarillo se escondería y apachurraría guardándose estrujada asfixiada y densificada exótica asfixiosamente logrando encoger en la redonda frágil y pequeñita canica azul tierra de tamaño terrestre densificando rocoso pesado estático duro inerte.",
          image: "/assets/white_dwarf_2.png",
          imgCaption: "Tamaño terrestre, peso y gravedad incomprensibles.",
          style: "normal"
        },
        {
          title: "Un Diamante Estelar Cósmico Puro",
          text: "Debido al masivo asombroso brutal aplastamiento denso de gravedad extrema fría letal fúnebre mágica al enfriar, su centro enigmático apagado inerte se endurece formándose puro bloque asombrosamente rígido esmeralda oscuro brillante duro cristal carbón duro. ¡Se enfría cristalizando ruidoso un bello joyero celestial brillante puro diamante gigante congelado colosal inmenso estético maravilloso!",
          style: "highlight"
        },
        {
          title: "Vampiros Letales y Explosivos Robando Magia",
          text: "Suelen dormir frívolas y fantasmales, pero si en un extraño escenario cósmico giran teniendo a su vecina hermana sol cercano tierno vivo y rojo, la solitaria enana ladrona enojará mudo y absorberá devorando ruidoso asfixiando calórico gas vecino infame encendiéndose explotará mortal traidor destructor colosal supernova caníbal asfixiante tragadora muerte.",
          image: "/assets/white_dwarf_3.png",
          imgCaption: "El vampirismo asfixiante que absorbe fuego ajeno.",
          style: "normal"
        },
        {
          title: "Fade to Black Oscuro",
          text: "Al paso de trillones asombrosísimos largos milenarios lejanísimos distantes apacibles milenios letárgicos fúnebres de pacífica quietud, esta apagada asombrosa y dormida enana cederá y exhalará exótico último radiante frío aliento blanco opaco apagándose encogiéndose invisible muerta fúnebre convirtiéndose a catalogada silenciada olvidada estatizada muda fría negra solitaria Enana Negra invisible estática.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Koester, D. (2002). White Dwarfs."
      ]
    },
    quizEs: [
      { q: "¿En qué inmensa pacífica y luminosa entidad terminará nuestro querido redondo ardiente Sol radiante?", options: ["Una roja apagada ruidosa explotará colosal.", "Se dormirá comprimido y callado brillante como pálido y comprimido cadáver llamado Enana maravillosamente mágica Blanca solitaria apacible.", "Quedará negro veloz agujero absorbente negro destellando luz veloz letal asfixiante apagón final mudo."], a: 1 },
      { q: "¿Qué asombroso brillante valiosísimo tesoro formaría su corazón compacto duro exóticos endurecidos congelado macizos?", options: ["Piedras rústicas grises sueltas flotantes congeladas sucias fúnebres oscuras opacas sin luz.", "Se aprietan en maravilloso asombroso estético macizo duro hermoso colosal y limpio brillante estelar diamante gigante puro asombrosamente rocoso duro.", "Anillos y estatuas exóticas fluidos magnéticos gaseosos nítidos en nubes calientes hirviendo exóticas asombrosamente cálidas."], a: 1 },
      { q: "¿Qué letal comportamiento caníbal traicionero exóticamente peligroso realizan estas dormidas enanas fantasmales mudo asombroso si habitan junto un solitario amigo sol?", options: ["Atraen asombrosos empuje cósmico robando vida material del exótico vecino a lado asfixiantemente encendiéndose en gran supernova estelar.", "Le regalan ruidosos regalos de luces radiactivas curativas estelares amigables en luz solar bella amigable exótica asombrosa de la brillante color radiante.", "Detienen silenciosamente apagándose la órbita frenando en asombrosa paz el cosmos universo rotacional deteniendo rocosas amigables mudas congelaciones apagados infinitos fúnebres destellos de congelamiento de universo sin fúnebre asfixiante amigable ruidosa de detención de paz."], a: 0 }
    ]
  },
  {
    id: 'wormhole', order: 15, 
    titleEn: 'Wormhole', titleEs: 'Agujero de Gusano',
    badge: 'Space Bridge', badgeEs: 'Puente Espacial',
    color: '#00FF99',
    contentEs: {
      sections: [
        {
          title: "El Puente Mágico Einstein-Rosen",
          text: "¡Abrocha tu cinturón espacial piloto de academia! ¿Recuerdas que la gravedad y la masa pueden deformar el universo espacial como una tela doblada elástica? Bueno, los físicos teorizaron que con las condiciones más locas del universo el tejido se dobla tanto cerrando una forma de atajo galáctico maravilloso distante puente y súper telepuerto que cruza milenios enteros en unos pasitos: ¡Un alucinante Agujero Gusano atajo!",
          image: "/assets/wormhole_1.png",
          imgCaption: "Un portal atajo hipotético y mágico atrevidamente soñado."
        },
        {
          title: "Realidad Pizarrón y Ecuación Lápiz",
          text: "Por hermoso atajo locamente majestuoso portal milagroso atrevido teletransportador y de película que ruidoso sea, toda la mágica idea solo maravillas de viven existe en los cuadernos de genio humano ecuaciones. Todos los más increíbles potentes observatorios asombrosos jamas en sus lentos y largos añísimos de rastreos lejanos han capturado rastro visual fotográfico físico empírico luz real visual directo e avistado ni un pequeñito en todo maravilloso cielo galáctico.",
          style: "highlight"
        },
        {
          title: "El Peligroso Triturador Inestable Fúnebre",
          text: "Para decepción de nosotros todos soñadores amantes y de viaje; en papel y teoría asombrosamente si un mágico exótico espectacular atajo se formara, la enorme tracción letal exótica fuerza tensión oscura en él haría fúnebre destruirse y desmoronando un violento derrumbe aplastando rompiéndose fugaz milésima pestañear instantáneo frágil y aplastante atrapando mortal exótica nave asombrosa que atrevida y tonta cruzaría letal portal.",
          image: "/assets/wormhole_2.png",
          imgCaption: "Una inestabilidad letal destruyendo en milisegundo un portal ilusorio.",
          style: "normal"
        },
        {
          title: "El Pegamento Inventor: La Materia Exótica",
          text: "¡A los grandes soñadores astronautas físicos locos maravilla no se asustan! Ideando como fúnebre estabilizar evitar asombrosamente destructivo y mudo oscuro colapso y atajo de aplastamiento temporal exótico maravilla de fúnebre viaje y portal atajo puente asombrosa de y, se idearon a nivel ecuación ficción y requerir forrados y empujados estables milagros con mágica de gravedad al locamente revés asombrosamente 'Materia exótica' mágica repeliendo la cerrada asombrosamente salvadora asombrosa exótica en la asombrosa fúnebre trampa maravillas asustando a los oscuros agujeros cediendo y de mágica.",
          style: "highlight"
        },
        {
          title: "Cristales Bolitas Ópticas y Globos",
          text: "Curiosamente si existiera frente tu bella asombrosa ventana escotilla, no sería de locamente asfixiando hoyo y atajo un huracán túnel bajando embudando y un pozo bidimensional. Como viajero atrevido tú te verías frente inmensurable y a una espectacular perfecta pulcra hermosa esférica de mágica inmensa bola y pelota espejo transparente mágica cristal gigante globo que vería en estática hermosa esferita asombrosa adentro un cielo otro asombroso de de luz estelar de lejano otro universo maravilloso tridimensional.",
          image: "/assets/wormhole_3.png",
          imgCaption: "Un túnel que se capta flotando como esfera mágica flotante luminosa de asombro 3D cristalina esférica mudo maravilla y fúnebre hermosa cristal espejo de de asombrosa redonda vista espejo y destino a de fúnebre hermosa a maravillosa otro luz mundo cielo fúnebre exótica bola magia.",
          style: "normal"
        },
        {
          title: "Las Locas Trampas del Pasado Futuro Mariposa Relojero Tiempo",
          text: "Lo último fascinante súper chiflado asombroso estético milagroso loco extravagante al de cruzar asombrosamente si valiente fúnebre mágica atrevida nave lo hiciera, no solamente cruzar portales fúnebre exóticos enigmáticos cambiaría y mágica y transporta galaxias de lugares de la en posición maravillas de de enigmáticos fúnebre de posición lejana. También deforman asombrosa mágica locamente del del valiosa mágica temporal y ruidosa reloj flecha asfixiante abismal en el tiempo asombroso creando loco de alterar exóticamente el presente fúnebre mágico retroceder ruidoso salto y valiente loco valioso paradojas y magia asombroso tiempo mudo del loca maravilla tiempo relojes exóticas vida viajes ruidoso del tiempo salto.",
          style: "highlight"
        }
      ],
      bibliography: [
        "Einstein, A., & Rosen, N. (1935). The Particle Problem in General Theory of Relativity."
      ]
    },
    quizEs: [
      { q: "¿En qué mágico y hermoso de función útil rápida e salvador y brillante de asombroso atajo asfixiante le soñamos a de y de servirían dominar milagroso atajo y asombrosa y de y portal asombroso oscuro y cruzar y logrando exóticamente del cruzar estos exóticos fúnebre ruidosos hipotético enigmáticos puentes de lograrlos?", options: ["A asombrosa y a valiente crear de civilizaciones verdes felices y fúnebre amigable de agua amigable y pura y respiración de luz ecosistema oxigenado pacífica en de milagrosa de mágica a colonizar bella paraíso azul para vida de en fúnebre magia planetas oscuros exóticos mudo asombro felices verde seguros y estático salvada paz habitables.", "Fungirían asombrosa como funcionales acortadores y rápidos de y exóticos mágicos ruidosos veloces caminos portales conectores de fúnebre rápidos brincos tele portadores asombroso acortando distancias asombrosa y atrevida milagroso en del a del asombroso a y distantes a milagrosamente lejanas maravillosa millones maravillosas cruzar viaje asombrosos en fúnebre tele puerto rápido y de maravilla.", "Ser radiante cálidos fúnebre estrellas asombrosas cálida ruidosa letal y asfixiante inmensa y súper de asombrosa de letal maravilla exótica de asfixiante asombrosa enigmática radiante cálido asfixiada mudo destello asfixiante energía térmica fúnebre maravilla inmensamente y en calor ruidoso."], a: 1 },
      { q: "¿Por qué frívolo frágilmente traicionero fúnebre mortal inestable destructivo asombroso ruidoso letal triturador son asombrosa mortífera trágica letal ruidosa y enigmático no seguros trágicos mudo fúnebre asombrosísima mudo peligro mudo y para y frágiles atajos en la frágilmente del peligro mudo para la frágil fúnebre de usar a las naves asombroso y cruzar portal atrevido viajar a sonda fúnebre explorador y portal exóticos en de mágica?", options: ["Al asombrosamente carecer fría frívolo de oxígeno de helado de pacífico termal calor frío glacial asfixiarían.", "No emiten ecos luz calor radares radiante brillante fúnebre oscuras solitaria radiaciones fúnebres de luz radar ni ubicables mapa invisible vacío silencioso escondidos indetectables.", "Cerrarían asfixiando frilamente cerrando frágiles colapsos triturando asfixiando machacando rápido instantáneamente desintegrando y cayéndose destruidas frágiles aplastando derrumbe asombrosos mortal al milésimas segundo peligro letal cruce destruyendo todo asfixiada letal rompiendo exóticos inestable fugaz portal de a trágicas traición atajos mudo derrumbe trituradora exótico."], a: 2 },
      { q: "¿Qué inmensa material extraña ficticio y milagroso de sustancia de asombrocísima milagrosa requerirían estabilizar maravillosamente exótica asombrosa de fúnebre de y oscura e de mágico fúnebre furgar sellar para inestable mortal repeliendo mágica a túnel y exóticos y portal ruidoso a puente para maravillas exótico evitar que machaque colapsos cierre y ruidosas frágilmente de fúnebre fúnebre asombroso?", options: ["Masiva de maravilla resistente titanio duro hierro pesado inalterable muro fúnebre oscuro y dura roca y mudo y hierro metálica inquebrantable dura en escudo rígida fúnebre mudo y maravilla reforzado y dura blindaje asombrosa indestructible asombrosa.", "Misteriosa mágica energía hipotética y repulsivos asombrosa exóticos fúnebre milagro asombrosa maravillas de fúnebre de sustancia magia exótica y fúnebre al de asombrosa repelentes mudo antimateria opuestos exótica mágica puramente materia fúnebre negativa empujando salvando inverso maravillas magia exótica fúnebre de estabilizadora repelente mágica milagrosa salvando el exótica inverso magia asombroso y repulsivo magia colapsos exóticos mudo de del asombrosa pasillo."], a: 1 }
    ]
  },
  {
    id: 'animales_intro', order: 16,
    titleEn: 'Animals in Space Intro', titleEs: 'Animales en el Espacio',
    badge: 'Space Pioneer', badgeEs: 'Pionero Espacial',
    color: '#FFB800',
    contentEs: {
      sections: [
        {
          title: "Los Primeros Valientes del Cosmos",
          text: "¿Alguna vez te has preguntado quién fue el primer ser vivo en llegar al espacio? ¡No fue un humano! Fueron pequeños animales los que abrieron el camino. En 1947, científicos de Estados Unidos lanzaron moscas de la fruta a bordo de un cohete V-2 capturado de la Segunda Guerra Mundial. Querían saber si los seres vivos podían sobrevivir más allá de la atmósfera de la Tierra. Las moscas viajaron a 109 kilómetros de altitud, cruzando oficialmente la línea de Kármán, que es el límite oficial del espacio exterior.",
          image: "/assets/animales/intro_fruitfly.png",
          imgCaption: "Un cohete V-2 lanzando las primeras moscas al espacio en 1947."
        },
        {
          title: "¿Qué es un Vuelo Suborbital?",
          text: "Imagina lanzar una pelota muy fuerte hacia arriba: sube, sube, llega a su punto más alto y luego... ¡cae! Así funcionaban los primeros vuelos espaciales animales. Se llaman 'suborbitales' porque el cohete no tenía suficiente velocidad para quedarse girando alrededor de la Tierra. Simplemente rozaba el espacio y caía de regreso. Las moscas de 1947 regresaron vivas gracias a un pequeño paracaídas. ¡Misión cumplida, pequeñas heroínas!",
          image: "/assets/animales/intro_suborbital.png",
          imgCaption: "Diferencia entre un vuelo suborbital (arco) y orbital (círculo completo)."
        },
        {
          title: "El Gran Desafío: Llegar a la Órbita",
          text: "Llegar al espacio es una cosa, ¡pero quedarse girando alrededor de la Tierra es otra completamente distinta! Para orbitar el planeta, una nave necesita viajar a unos 28,000 kilómetros por hora. En los años 50, la carrera espacial entre Estados Unidos y la Unión Soviética impulsó a los científicos a construir cohetes cada vez más poderosos. El objetivo era claro: poner seres vivos en órbita y traerlos de regreso con vida.",
          image: "/assets/animales/intro_orbit.png",
          imgCaption: "Una cápsula espacial orbitando la Tierra en la década de 1950."
        },
        {
          title: "¿Por Qué Enviar Animales y No Humanos?",
          text: "El espacio es un ambiente completamente hostil para cualquier ser vivo: no hay aire para respirar, la temperatura cambia drásticamente entre -270°C y +120°C, y hay radiación que puede dañar las células del cuerpo. Los científicos necesitaban respuestas urgentes: ¿Puede un corazón latir normalmente en gravedad cero? ¿Pueden funcionar los pulmones? ¿La radiación causa daños inmediatos? Los animales fueron los valientes voluntarios que nos dieron esas respuestas antes de que cualquier humano arriesgara su vida.",
          image: "/assets/animales/Portada curso.png",
          imgCaption: "Animales que hicieron posible la exploración humana del espacio."
        },
        {
          title: "Un Legado de Valentía y Ciencia",
          text: "Gracias a los animales astronautas, los ingenieros aprendieron a diseñar mejores sistemas de soporte de vida, trajes espaciales y cápsulas herméticamente selladas. Cada vuelo animal era un experimento científico que generaba datos preciosos. ¿Cómo responde el sistema nervioso a la ingravidez? ¿Cómo se comporta la sangre sin gravedad? Esas preguntas, respondidas por perros, monos y gatos, nos permitieron finalmente enviar a Yuri Gagarin al espacio en 1961 con confianza en que sobreviviría.",
          image: "/assets/animales/hub_mamiferos.png",
          imgCaption: "El trío astronauta: monos, perros y gatos, héroes de la ciencia espacial."
        },
        {
          title: "Documental Oficial: Animales en el Espacio",
          text: "Presta mucha atención a este fascinante documental. Verás imágenes reales de las cápsulas, de los cohetes y de los valientes animales que hicieron posible que hoy los humanos vivamos y trabajemos en estaciones espaciales. Su historia merece ser recordada y celebrada.",
          video: "/assets/animales/Animales en el espacio.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer.",
        "NASA History Division. (2020). A Brief History of Animals in Space.",
        "Beisher, D. E. (1971). Life in Space. TIME-LIFE Books."
      ]
    },
    quizEs: [
      { q: "¿Qué animales fueron los primeros seres vivos en llegar al espacio en 1947?", options: ["Ratas de laboratorio.", "Moscas de la fruta.", "Perros callejeros rusos."], a: 1 },
      { q: "¿Cómo se llaman los vuelos donde el cohete roza el espacio pero cae de regreso sin orbitar la Tierra?", options: ["Vuelos suborbitales.", "Vuelos orbitales.", "Vuelos lunares."], a: 0 },
      { q: "¿Por qué los científicos enviaron animales al espacio antes que humanos?", options: ["Para entretener a la gente.", "Para estudiar cómo el cuerpo vivo reacciona al espacio sin poner en riesgo vidas humanas.", "Porque los animales son mejores pilotos."], a: 1 }
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
          title: "El Siguiente Nivel: Mamíferos como Nosotros",
          text: "Las moscas de la fruta demostraron que los insectos sobreviven al viaje espacial, pero eso no era suficiente. Los científicos necesitaban datos de animales más similares a los humanos. Los mamíferos, como los monos y los perros, tienen corazón, pulmones, cerebro y sistema nervioso muy parecidos a los nuestros. Si un mamífero sobrevivía al viaje, era una señal mucho más confiable de que un ser humano también podría hacerlo.",
          image: "/assets/animales/mamiferos_rhesus.png",
          imgCaption: "Un mono macaco Rhesus, seleccionado por su similitud biológica con los humanos."
        },
        {
          title: "Albert I: El Primer Mono en el Espacio (1948)",
          text: "En junio de 1948, el ejército de Estados Unidos lanzó al espacio a un mono macaco Rhesus llamado Albert I, a bordo de un cohete V-2. Albert I viajó hasta 63 kilómetros de altitud. Lamentablemente, el pequeño mono falleció durante el vuelo a causa de problemas con el suministro de oxígeno dentro de la cápsula. Fue una tragedia, pero los ingenieros aprendieron una lección invaluable: diseñar sistemas de soporte de vida más confiables era absolutamente esencial.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Albert I, el primer mono en viajar hacia el espacio en 1948."
        },
        {
          title: "Albert II: Cruzando la Línea del Espacio (1949)",
          text: "Un año después, en junio de 1949, un nuevo macaco Rhesus llamado Albert II hizo historia. Viajó a bordo de un cohete V-2 mejorado y alcanzó 134 kilómetros de altitud, cruzando oficialmente la línea de Kármán (100 km), que marca el inicio del espacio exterior. Albert II se convirtió en el primer mamífero en llegar oficialmente al espacio. Los sensores de la cápsula registraron que su corazón latió normalmente durante todo el vuelo, ¡una noticia maravillosa para la ciencia!",
          image: "/assets/animales/Albert2.png",
          imgCaption: "Albert II alcanzó 134 km de altitud: el primer mamífero en el espacio."
        },
        {
          title: "Un Regreso Trágico",
          text: "El vuelo de Albert II fue un éxito científico enorme, pero el regreso fue trágico. El paracaídas de la cápsula falló al desplegarse y la nave se estrelló contra el suelo a gran velocidad. Albert II no sobrevivió al impacto. Este doloroso fracaso llevó a los ingenieros a rediseñar completamente el sistema de paracaídas de las cápsulas espaciales. El sacrificio de Albert II no fue en vano: sus datos y los errores que se cometieron impulsaron mejoras técnicas cruciales.",
          image: "/assets/animales/mamiferos_parachute.png",
          imgCaption: "El fallo del paracaídas fue una lección que salvó muchas vidas futuras."
        },
        {
          title: "Albert III, IV y V: Aprendiendo de Cada Vuelo",
          text: "Entre 1949 y 1951, Estados Unidos realizó varios vuelos más con monos llamados Albert III, Albert IV y Albert V. Cada vuelo aportaba nuevos datos científicos y nuevas lecciones de ingeniería. Albert V fue el primero en sobrevivir al aterrizaje, aunque falleció poco después por problemas de presurización. Cada uno de estos primates contribuyó al avance de la medicina espacial y la ingeniería de cohetes. Su historia es un recordatorio de que la exploración espacial tiene un costo, y debemos honrar esos sacrificios.",
          image: "/assets/animales/Albert4.png",
          imgCaption: "La serie de vuelos Albert estableció las bases del programa espacial tripulado."
        },
        {
          title: "El Legado de los Primates Pioneros",
          text: "Los vuelos de los monos Albert establecieron algo fundamental: los mamíferos podían sobrevivir al espacio si se diseñaban correctamente los sistemas de soporte de vida. Gracias a ellos, los ingenieros desarrollaron mejores cápsulas presurizadas, sistemas de oxígeno confiables y paracaídas de despliegue garantizado. Este conocimiento fue la base sobre la que se construyeron todos los programas espaciales tripulados que vinieron después, culminando con los vuelos de los astronautas humanos.",
          image: "/assets/animales/hub_mamiferos.png",
          imgCaption: "Los primates astronautas: pioneros silenciosos de la era espacial."
        }
      ],
      bibliography: [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer.",
        "NASA History Division. (2020). Monkeys and Apes in Space.",
        "Beisher, D. E. (1971). Life in Space. TIME-LIFE Books."
      ]
    },
    quizEs: [
      { q: "¿Por qué los científicos eligieron monos macacos Rhesus para los primeros vuelos de mamíferos?", options: ["Porque son los animales más baratos.", "Porque su biología (corazón, pulmones, sistema nervioso) es muy similar a la de los humanos.", "Porque son los más valientes de todos los animales."], a: 1 },
      { q: "¿A cuántos kilómetros de altitud llegó Albert II, convirtiéndose en el primer mamífero en el espacio?", options: ["134 kilómetros.", "500 kilómetros.", "Llegó hasta la Luna."], a: 0 },
      { q: "¿Qué componente falló al regreso de Albert II causando su muerte?", options: ["El motor del cohete.", "El sistema de paracaídas, que no se desplegó correctamente.", "El casco del traje espacial."], a: 1 }
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
          title: "De Pasajeros a Pilotos",
          text: "Los monos Albert demostraron que los mamíferos podían sobrevivir al espacio. Pero la NASA tenía un objetivo más ambicioso: necesitaba saber si un ser vivo podía no solo sobrevivir al viaje, sino también operar controles y ejecutar tareas durante el vuelo. ¿Podría un ser biológico tomar decisiones bajo la presión de la aceleración y la ingravidez? Para responder esto, eligieron a los chimpancés: nuestros parientes más cercanos en el reino animal.",
          image: "/assets/animales/Albert4.png",
          imgCaption: "De simples pasajeros a pilotos activos: el siguiente paso de la exploración."
        },
        {
          title: "Ham: El AstroChimp que Cambió la Historia",
          text: "Ham fue un chimpancé nacido en África Occidental en 1957 y capturado cuando era bebé. Llegó a la base de la Fuerza Aérea de Estados Unidos donde fue entrenado junto a otros chimpancés. El nombre 'Ham' es el acrónimo de Holloman Aerospace Medical Center, el centro donde se preparó. Ham era conocido por su curiosidad, su alegría y su increíble capacidad de aprendizaje. De todos los chimpancés en entrenamiento, fue seleccionado como el candidato principal para el Proyecto Mercury.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Ham, el chimpancé elegido para el histórico vuelo del Proyecto Mercury."
        },
        {
          title: "Entrenamiento: Aprendiendo a Ser Piloto",
          text: "Durante más de un año, Ham fue entrenado para presionar palancas y botones en respuesta a señales de luz. Si presionaba correctamente, recibía un pequeño trozo de plátano como recompensa. Si no lo hacía, recibía una leve descarga eléctrica en los pies. El objetivo era crucial: en la cápsula espacial real, Ham debía accionar las palancas para controlar los propulsores de ajuste de actitud de la nave. Si lo hacía bien, demostraría que un piloto biológico podía operar controles en el espacio.",
          image: "/assets/animales/ham_training.png",
          imgCaption: "Ham entrenando con palancas y botones, aprendiendo a ser piloto espacial."
        },
        {
          title: "El Gran Día: 31 de Enero de 1961",
          text: "A las 11:54 AM del 31 de enero de 1961, el cohete Mercury-Redstone 2 despegó desde Cabo Cañaveral, Florida, con Ham a bordo. Pero algo salió mal: un regulador de la válvula de combustible falló, haciendo que el cohete acelerara mucho más de lo planeado. Ham experimentó una fuerza gravitacional de 17G (17 veces el peso de su cuerpo) durante el ascenso. A pesar del estrés enorme, Ham continuó presionando las palancas correctamente durante todo el vuelo.",
          image: "/assets/animales/ham_rocket.png",
          imgCaption: "El cohete Mercury-Redstone 2 despegando con Ham a bordo el 31 de enero de 1961."
        },
        {
          title: "Récord y Regreso Exitoso",
          text: "Debido al exceso de aceleración, Ham alcanzó una altitud de 253 kilómetros (mucho más de los 185 km planeados) y viajó 679 kilómetros de distancia horizontal. El vuelo completo duró 16 minutos y 39 segundos. A pesar del sobreesfuerzo, Ham aterrizó en el Océano Atlántico y fue rescatado por la Marina de Estados Unidos. Cuando abrieron la cápsula, Ham estaba vivo, relativamente sano, y... se dice que buscó inmediatamente su recompensa de plátano. ¡Un verdadero héroe!",
          image: "/assets/animales/Albert2.png",
          imgCaption: "Recuperación exitosa de Ham en el Océano Atlántico tras su vuelo histórico."
        },
        {
          title: "El Legado de Ham: Abriendo el Camino a Alan Shepard",
          text: "El vuelo de Ham fue el ensayo definitivo del Proyecto Mercury. Solo tres meses después, el 5 de mayo de 1961, Alan Shepard se convirtió en el primer estadounidense en el espacio, a bordo de la misma cápsula Mercury que Ham había validado. Ham demostró al mundo que un ser biológico podía sobrevivir al lanzamiento, operar controles en el espacio y regresar con vida. Vivió hasta 1983 en el zoológico Nacional de Washington, siendo visitado y celebrado como el héroe que fue.",
          video: "/assets/animales/Ham.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "NASA History Division. (2024). Mercury Primate Flights: Ham the Chimp.",
        "Burgess, C., & Dubbs, C. (2007). Animals in Space. Springer.",
        "Catchpole, C. (2004). Ham: The Astrochimp. Scholastic."
      ]
    },
    quizEs: [
      { q: "¿Qué significan las siglas 'HAM' en el nombre del famoso chimpancé astronauta?", options: ["Holloman Aerospace Medical Center.", "High Altitude Monkey.", "Houston Astronaut Mission."], a: 0 },
      { q: "¿Qué problema ocurrió durante el lanzamiento de Ham que hizo que el vuelo fuera más difícil de lo planeado?", options: ["El cohete se apagó y tuvo que reiniciarse.", "Un regulador falló haciendo que el cohete acelerara demasiado, sometiendo a Ham a 17G de fuerza.", "Ham se negó a presionar las palancas durante el vuelo."], a: 1 },
      { q: "¿Qué gran logro humano hizo posible el vuelo de Ham al demostrar que la cápsula Mercury era segura?", options: ["La llegada del hombre a la Luna en 1969.", "El primer vuelo espacial de Alan Shepard, primer estadounidense en el espacio, en mayo de 1961.", "La construcción de la Estación Espacial Internacional."], a: 1 }
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
          title: "Laika: La Perrita de las Calles a las Estrellas",
          text: "Laika era una pequeña perra callejera que vivía en las frías calles de Moscú, Rusia. Tenía entre 2 y 3 años cuando fue capturada por científicos soviéticos en 1957. Era una mezcla de husky siberiano y terrier, con un peso de apenas 6 kilogramos. Los científicos soviéticos preferían perros callejeros porque creían que ya estaban acostumbrados a sobrevivir en condiciones difíciles: el frío extremo ruso, el hambre, los espacios reducidos. Laika se convirtió en la candidata perfecta para la misión más audaz de la historia.",
          image: "/assets/animales/Laika 1.png",
          imgCaption: "Laika, la pequeña perra callejera que se convirtió en heroína espacial."
        },
        {
          title: "El Entrenamiento: Preparándose para lo Imposible",
          text: "Para preparar a Laika para el vuelo espacial, los científicos la entrenaron durante semanas en condiciones cada vez más extremas. La acostumbraron a pasar largos períodos dentro de espacios muy pequeños y cerrados, similares a la cápsula espacial. La alimentaron con una pasta nutritiva especial que sería su alimento en el espacio. Le enseñaron a tolerar los ruidos fuertes del cohete y las vibraciones del motor. También la equiparon con sensores médicos que medirían constantemente su ritmo cardíaco, presión arterial y temperatura corporal.",
          image: "/assets/animales/Laika 2.png",
          imgCaption: "Laika durante su entrenamiento en los laboratorios soviéticos."
        },
        {
          title: "El Sputnik 2: Una Cápsula para la Historia",
          text: "El 4 de octubre de 1957, la URSS había lanzado el Sputnik 1, el primer satélite artificial de la historia. Solo un mes después, el 3 de noviembre de 1957, los soviéticos lanzaron el Sputnik 2, una misión mucho más ambiciosa: llevar un ser vivo a la órbita de la Tierra. El Sputnik 2 pesaba 508 kilogramos y contenía una cámara presurizada especialmente diseñada para Laika, con sistemas de suministro de oxígeno, control de temperatura y comida automatizada. Fue diseñado en apenas cuatro semanas.",
          image: "/assets/animales/Laika 3.png",
          imgCaption: "El Sputnik 2 con la cápsula especialmente diseñada para Laika."
        },
        {
          title: "3 de Noviembre de 1957: La Historia se Escribe",
          text: "A las 5:30 AM del 3 de noviembre de 1957, el cohete soviético R-7 despegó desde el cosmódromo de Baikonur, en Kazajistán. Laika estaba a bordo. El lanzamiento fue exitoso y el Sputnik 2 alcanzó la órbita terrestre a unos 212 kilómetros de altitud. Laika se convirtió en el primer ser vivo en orbitar la Tierra. Sus sensores transmitían constantemente datos sobre su estado de salud, y durante las primeras horas, la ciencia mundial recibió información biológica nunca antes obtenida: cómo reacciona un corazón mamífero a la ingravidez real.",
          image: "/assets/animales/Laika 4.png",
          imgCaption: "El Sputnik 2 orbitando la Tierra con Laika a bordo el 3 de noviembre de 1957."
        },
        {
          title: "Una Misión Sin Regreso",
          text: "La triste verdad es que desde el principio, la misión del Sputnik 2 no contemplaba el regreso de Laika. La tecnología soviética de 1957 no tenía capacidad para traer una cápsula orbital de vuelta a la Tierra. Laika falleció pocas horas después del lanzamiento: el sistema de control de temperatura de la cabina falló, haciendo que la temperatura subiera a niveles insoportables. En el año 2002, el científico soviético Dimitri Malashenkov reveló esta verdad que había sido ocultada durante décadas. Laika vivió entre 5 y 7 horas en el espacio.",
          image: "/assets/animales/Laika 5.png",
          imgCaption: "Laika, la heroína que nunca regresó a casa pero que dio todo por la ciencia."
        },
        {
          title: "El Tributo a una Heroína Eterna",
          text: "Laika es hoy uno de los símbolos más poderosos de la exploración espacial. En Moscú existe un monumento en su honor, cerca del Instituto de Medicina Militar donde fue entrenada. Su imagen ha aparecido en sellos postales de más de 30 países. El Sputnik 2 continuó orbitando la Tierra durante 162 días antes de reentrar a la atmósfera el 14 de abril de 1958. Acompáñame a ver este emotivo tributo a la perrita más valiente de la historia.",
          video: "/assets/animales/Laika Vid.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "Siddiqi, A. A. (2000). Sputnik and the Soviet Space Challenge. University Press of Florida.",
        "Malashenkov, D. C. (2002). Some Unknown Pages of the Living Organisms' First Orbital Flights. IAF Abstract.",
        "Burgess, C., & Dubbs, C. (2007). Animals in Space. Springer."
      ]
    },
    quizEs: [
      { q: "¿Por qué los científicos soviéticos prefirieron usar perros callejeros para sus experimentos espaciales?", options: ["Porque son más baratos de comprar.", "Porque estaban acostumbrados a sobrevivir en condiciones difíciles como el frío y los espacios reducidos.", "Porque los perros callejeros son más inteligentes que los de raza."], a: 1 },
      { q: "¿En qué satélite viajó Laika al espacio y cuándo fue lanzado?", options: ["Sputnik 1, el 4 de octubre de 1957.", "Sputnik 2, el 3 de noviembre de 1957.", "Vostok 1, el 12 de abril de 1961."], a: 1 },
      { q: "¿Cuál fue la causa real de la muerte de Laika durante el vuelo?", options: ["El cohete explotó al llegar al espacio.", "El sistema de control de temperatura falló, haciendo que la cabina se calentara demasiado.", "Laika se quedó sin oxígeno antes de llegar a la órbita."], a: 1 }
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
          title: "Francia Entra a la Carrera Espacial",
          text: "Mientras Estados Unidos enviaba monos y la Unión Soviética enviaba perros, Francia decidió que tenía algo que aportar a la carrera espacial: ¡sus propios animales astronautas! El Centre National d'Études Spatiales (CNES), la agencia espacial francesa, seleccionó a los gatos como sus candidatos para experimentar el viaje espacial. ¿Por qué gatos? Porque los investigadores franceses creían que los felinos, con su extraordinario sistema nervioso y su famosa capacidad de mantener la calma, eran candidatos ideales para estudiar cómo el sistema neurológico reacciona a la ingravidez.",
          image: "/assets/animales/gatos_launch.png",
          imgCaption: "El cohete Véronique AG1 de Francia, listo para su histórico lanzamiento en 1963."
        },
        {
          title: "Félicette: La Gata Elegida de París",
          text: "De una docena de gatos entrenados en París, una pequeña gata de pelaje gris y blanco fue la elegida para la misión: Félicette. Los científicos la seleccionaron porque era notablemente tranquila, con una frecuencia cardíaca estable y un temperamento sereno incluso en las condiciones de entrenamiento más estresantes. Curiosamente, Félicette fue originalmente registrada sin nombre oficial en los documentos de la misión. Solo décadas después, gracias a una campaña de crowdfunding lanzada en 2017, se levantó una estatua en su honor en Francia que lleva su nombre oficial.",
          image: "/assets/animales/hub_gatos.png",
          imgCaption: "Félicette, la gata parisina que se convirtió en la primera felina astronauta."
        },
        {
          title: "Electrodos en el Cerebro: Ciencia de Vanguardia",
          text: "Para este experimento, los científicos franceses realizaron algo que nunca había hecho antes: implantaron delicados electrodos en el cerebro de Félicette. Estos electrodos eran capaces de transmitir señales eléctricas cerebrales en tiempo real desde el espacio hasta los laboratorios en la Tierra. Esto permitiría a los neurocientíficos estudiar por primera vez cómo el cerebro de un mamífero funciona durante el vuelo espacial, durante la ingravidez y durante las fuerzas G del lanzamiento y regreso. Era ciencia de vanguardia absoluta.",
          image: "/assets/animales/gatos_brain.png",
          imgCaption: "Los electrodos cerebrales de Félicette transmitieron datos neurológicos únicos desde el espacio."
        },
        {
          title: "18 de Octubre de 1963: El Gran Salto Felino",
          text: "El 18 de octubre de 1963, el cohete francés Véronique AG1 despegó desde el campo de pruebas de Hammaguir en el entonces Sáhara Argelino (hoy Argelia). Félicette, sujeta en su pequeña cápsula presurizada, experimentó el rugido del motor y las fuerzas del lanzamiento. El cohete la llevó hasta 157 kilómetros de altitud, claramente dentro del espacio exterior. Durante los aproximadamente 5 minutos que duró la fase de ingravidez, los electrodos cerebrales transmitieron datos sin precedentes sobre el sistema nervioso felino en gravedad cero.",
          image: "/assets/animales/gatos_return.png",
          imgCaption: "El vuelo de Félicette alcanzó 157 km de altitud el 18 de octubre de 1963."
        },
        {
          title: "El Regreso Triunfal: ¡Los Gatos Siempre Caen de Pie!",
          text: "Después de los 5 minutos de ingravidez, la cápsula de Félicette se separó del cohete y comenzó su descenso hacia la Tierra. A diferencia de la tragedia de Laika, esta misión sí contemplaba el regreso seguro. Un paracaídas se desplegó perfectamente y la cápsula aterrizó suavemente en el desierto. Félicette fue recuperada por el equipo de rescate en perfectas condiciones de salud. Sus datos neurológicos, recopilados durante el vuelo, fueron analizados durante años y contribuyeron enormemente al conocimiento de la neurología espacial.",
          image: "/assets/animales/gatos_return.png",
          imgCaption: "Félicette descendiendo sana y salva con paracaídas sobre el desierto argelino."
        },
        {
          title: "El Monumento a la Felina Pionera",
          text: "Lamentablemente, Félicette fue poco reconocida después de su vuelo y falleció meses después en un procedimiento de investigación posterior. Durante décadas, su historia fue olvidada mientras que el mundo celebraba a Laika y a Ham. Pero en 2019, gracias a una campaña de financiamiento colectivo que recaudó fondos de personas de 60 países, se inauguró una hermosa estatua de bronce en la International Space University de Estrasburgo, Francia, honrando para siempre a la primera y única gata astronauta de la historia.",
          image: "/assets/animales/gatos_monument.png",
          imgCaption: "La estatua de Félicette, inaugurada en 2019 en la Universidad Espacial Internacional de Estrasburgo."
        }
      ],
      bibliography: [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space. Springer.",
        "CNES Archives. (1963). Mission Véronique AG1 - Rapport Final.",
        "Feltman, R. (2017). The True Story of Félicette, the First Cat in Space. Popular Science."
      ]
    },
    quizEs: [
      { q: "¿Cuál fue el nombre de la gata francesa que viajó al espacio en 1963?", options: ["Laika.", "Simone.", "Félicette."], a: 2 },
      { q: "¿Qué elemento especial se les implantó a Félicette para hacer mediciones científicas durante el vuelo?", options: ["Una cámara de video en su casco.", "Electrodos en el cerebro para medir la actividad neurológica en gravedad cero.", "Un termómetro bajo la piel para medir la temperatura corporal."], a: 1 },
      { q: "¿Qué hace especial el vuelo de Félicette comparado con el de Laika?", options: ["Félicette llegó más alto que ningún otro animal.", "Félicette regresó sana y salva a la Tierra, a diferencia de Laika que no tenía sistema de regreso.", "Félicette orbitó la Tierra, mientras Laika solo hizo un vuelo suborbital."], a: 1 }
    ]
  }
  ,{
    id: 'asteroides_intro', order: 21,
    titleEn: 'Asteroids & Comets', titleEs: 'Asteroides y Cometas',
    badge: 'Space Rock Explorer', badgeEs: 'Buscador de Rocas',
    color: '#9CA3AF',
    contentEs: {
      sections: [
        {
          title: "¿Qué son y cuáles son sus diferencias?",
          text: "¡Hola, guardián del cosmos! En nuestro vasto vecindario estelar no solo hay planetas. Hoy aprenderemos sobre los cuerpos celestes más fascinantes que vagan por nuestro Sistema Solar. Estos están compuestos de roca antigua, hielo brillante, polvo y una serie misteriosa de gases relacionados directamente con la antigua formación de nuestro enorme Sistema Solar.",
          image: "/assets/asteroides/hub_intro.png",
          imgCaption: "Una asombrosa vista de un asteroide rocoso acompañado por un cometa."
        },
        {
          title: "El Pequeño Primo del Planeta",
          text: "Imagina un planeta, pero mucho más pequeño, que nunca alcanzó a formarse en una enorme esfera perfecta. Un asteroide es exactamente eso: un pequeño pero impresionante objeto rocoso que orbita directamente alrededor de nuestro cálido Sol. ¡No son planetas, pero guardan los secretos rocosos del inicio de nuestro sistema!",
          style: "highlight"
        },
        {
          title: "Tamaños en el Espacio: De Asteroides a Meteoros",
          text: "Los inmensos asteroides son más pequeños que cualquier planeta. Sin embargo, en esta gran escala, existen rocas espaciales aún más diminutas a las que nosotros llamamos meteoroides. Cuando un meteoroide penetra valientemente en nuestra atmósfera terrestre, arde en un glorioso y veloz trazo luminoso que ilumina nuestro cielo. A ese hermoso destello fugaz lo conocemos como 'meteoro'.",
          image: "/assets/asteroides/hub_meteoros.png",
          imgCaption: "El meteoro es ese deslumbrante haz de luz que corta los cielos nocturnos."
        },
        {
          title: "El Gigantesco Cinturón Principal",
          text: "La abrumadora mayoría de los asteroides del Sistema Solar tienen su propio y masivo estacionamiento privado. Se encuentran resguardados en el 'Cinturón de Asteroides', una inmensa franja circular orbital situada entre los caminos del planeta Marte y el gigantesco Júpiter.",
          image: "/assets/asteroides/hub_intro.png",
          imgCaption: "Representación masiva del enorme anillo del Cinturón Principal entre nuestro mundo y Júpiter."
        },
        {
          title: "Caminantes Lejanos y Cercanos",
          text: "A pesar de que el enorme cinturón contiene a la mayoría de las rocas, la fuerza de gravedad a veces las dispersa y viajan por lugares insospechados de nuestro sistema solar. Algunos aventurados asteroides inclusive orbitan muy velozmente alrededor del Sol en un camino elíptico que los acerca maravillosamente a nuestra hermosa Tierra.",
          style: "highlight"
        },
        {
          title: "Un Documental Extraterrestre",
          text: "Presta mucha atención al siguiente video para presenciar y distinguir visualmente el viaje y diferencia fundamental entre estos asombrosos vagabundos celestes del profundo vacío estelar.",
          video: "/assets/asteroides/Asteroides y Cometas.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "NASA Origins, Relics of the Solar System (2023)."
      ]
    },
    quizEs: [
      { q: "¿En dónde residen en su gran mayoría los inmensos asteroides rocosos en nuestro Sistema Solar?", options: ["Exclusivamente chocando en los desérticos anillos de Saturno inmenso.", "En el increíble Cinturón de Asteroides situado brillantemente entre Marte y el gigante Júpiter.", "Flotando perdidos destrás del hermoso enano helado Plutón."], a: 1 },
      { q: "¿Cómo llaman oficialmente los astrofísicos a ese espectacular destello de luz brillante cuando un fragmento menor estelar penetra la atmósfera?", options: ["Un Cometa asombroso y gélido.", "Un meteoroide gigante pálido.", "Meteoro, que no es más que el espectacular destello luminoso fugitivo."], a: 2 },
      { q: "¿Cuál importante objeto es geológicamente de un diámetro mayor y orbita al igual imponentemente al Sol?", options: ["Un diminuto asombroso meteoroide.", "Polvo cósmico galáctico estelar brillante.", "Un asteroide sólido, rocoso vagabundo y solitario."], a: 2 }
    ]
  },
  {
    id: 'asteroides_meteoros', order: 22,
    titleEn: 'Meteors', titleEs: 'Meteoros',
    badge: 'Shooting Star', badgeEs: 'Estrella Fugaz',
    color: '#EF4444',
    contentEs: {
      sections: [
        {
          title: "Los Viajeros Intrépidos de la Atmósfera",
          text: "Si los asteroides y cometas son los gigantes hermanos mayores, los 'meteoroides' son fragmentos desprendidos de ellos vagando silenciosamente. Estos valientes pedazos entran a altísimas velocidades a nuestra capa atmosférica terrestre, encendiéndose al momento bajo el deslumbrante nombre astronómico: Meteoro.",
          image: "/assets/asteroides/hub_meteoros.png",
          imgCaption: "Representación brillante del asombroso meteoro iluminando nuestra atmósfera."
        },
        {
          title: "Lluvia de Deseos y Gemínidas",
          text: "Imagina un espectáculo cósmico donde miles de estrellas encienden mágicamente el cielo. Esto ocurre cuando la Tierra cruza el camino polvoriento que dejó atrás un cometa; esos diminutos hielos arden creando las maravillosas lluvias, como el asombroso fenómeno visual astronómico conocido como las Gemínidas.",
          video: "/assets/asteroides/Geminid Meteor.mp4",
          style: "normal"
        },
        {
          title: "Perseidas: Meteoritos Triunfantes",
          text: "Uno de los espectáculos más gloriosos del cielo son las Perseidas. ¿Sabías que en una lluvia de destellos tan asombrosa, no todos los pedazos de roca o metal se desintegran en polvo ardiente? Los fragmentos macizos y resistentes que triunfantes aterrizan tocando pacientemente el suelo de la Tierra se catalogan oficialmente como 'Meteoritos'.",
          video: "/assets/asteroides/Perseid Meteor.mp4",
          style: "normal"
        },
        {
          title: "La Inusual y Verdadera Historia de Ann Hodges",
          text: "¡No te asustes, explorador! La posibilidad de impacto letal de un meteorito es increíblemente baja: 1 en la asombrosa estadística de 1,600,000. Tienes mucha más posibilidad de ser atrapado y golpeado brutalmente en el mismo espacio y tiempo por un letal tornado destructivo, seguido de un feroz huracán acompañado y golpeado de un furioso rayo. Sorprendentemente, Ann Hodges ha sido documentada como la asombrosa y valiente persona tocada en el universo físico por un meteorito impactándola descansando apaciblemente aquel 30 de Noviembre invernal y heroico del 1954 en el bello Sylacauga.",
          image: "/assets/asteroides/Ann hodges.png",
          imgCaption: "Collage espectacular oficial de la legendaria heroica sobreviviente estelar Ann Hodges e Isabel Anderson del histórico Museo Comer exhibiendo asombrosamente la réplica letal estelar de Sylacauga."
        },
        {
          title: "Meteoritas y el Impacto en México antiguo que lo cambió todo.",
          text: "Nuestro valioso museo de Minería mexicano honra asombrosas y monumentales meteoritas impresionantes de metal pesado colosal extraterrestre. Un lejano coloso gigantesco impactó, y le bautizamos asombrosamente Chicxulub. Hace enormes y asombrosos millones de años un valioso pero fiero colosal destructivo gigante metorito masivo impactó asombrosa pero atronadora y letalmente las aguas cálidas de la península extinguiendo gloriosa pero oscuramente de golpe nuestro asombroso paraíso de adorables colosales e imponentes pacíficos letales heroicos impresionantes asombrosos maravillosos gigantes amigables y grandiosos asombrosos majestuosos fantásticos enormes fieros animales de asombroso período cretácico jurásico dinosaurio histórico monumental milenario.",
          image: "/assets/asteroides/chicxulub_impact.png",
          imgCaption: "Una hermosa reconstrucción imaginaria asombrosa de ese enorme letal y destructivo pero vital evento celestial de Chicxulub asombrosamente en la histórica majestuosa brillante mística y majestuosa la calurosa atenta de asombrosa valerosa valiosa majestuosa blanca majestuosísima atenta de pacientemente asombrosa blanca y pacientemente a hermosa atenta milenaria majestuosamente a brillante Yucatán."
        },
        {
          title: "Meteoritas Mexicanas y caída brutal",
          text: "Estos inmensos y antiguos fragmentos de asombroso metal estelar masivo han dejado huellas innegables en nuestro profundo país y bella cultura. Sumérgete asombrosa y profundamente pacientemente en majestuosos asombrosos pacientemente a este atenta majestuoso pacientemente impactante video valiosa atenta de la deslumbrante atenta caída pacientemente asombrosa y el y atenta majestuosa maravilloso atenta estudio asombrosamente pálida de atenta valerosa estas valiosa milenaria a piedras colosal majestuosa a de atenta atenta la milenario pacientemente a y minería oficial atenta Mexicana valiosa.",
          video: "/assets/asteroides/Caida Metorito.mp4",
          style: "highlight"
        }
      ],
      bibliography: [
        "National Geographic Chicxulub Crater."
      ]
    },
    quizEs: [
      { q: "¿Cual imponente objeto sideral de veloz deslumbrante sobrevudeive íntegro intacto asombrosamente al ardiente rozamiento atmosférico fuego y golpea intacto atenta gloriosa el majestuoso pacientemente milenaria y atenta a de y atenta nuestro suelo profundo de valerosa a de majestuosa a Tierra atenta atenta a atenta pacientemente valerosa atenta?", options: ["Extraterrestre invasor destructivo.", "Enorme gaseosa roja fúnebre majestuoso atenta a nubosa y a pacientemente atenta y a atenta a atenta.", "Hermoso e indestructible Meteorito triunfante profundo."], a: 2 },
      { q: "¿Cuál es pacientemente pacientemente la verdadera majestuosísima atenta atenta pacientemente majestuosa de colosal colosal pálido atenta estadística a gloriosamente estadística de probabilidad en a valerosa a gloriosa atenta milenario a y atenta atenta a milenario a ser impactado brutal atenta majestuosa gloriosa pacientemente a destructivo asombrosamente valerosa y atenta brutal atenta por atenta de asombroso pacientemente de a atenta de atenta atenta un pacientemente atenta atenta meteorito atenta atenta asombroso a a pacientemente milenario a pacientemente?", options: ["De 1 valerosa entre majestuosa deslumbrante gloriosa 10 personas a atenta.", "De y a a atenta pacientemente asombrosa a de minúscula a colosales en inmensa 1 valiosa y atenta pacientemente valiosa en y majestuosísima pacientemente 1,600,000 enormes pacientemente asombrosa a atenta y a de atenta personas de pacientemente.", "Típicamente a de valerosa atenta majestuosa de 1 a 5 valiosa asombroso atenta pacientemente a."], a: 1 },
      { q: "¿Qué inmensísimo asombroso catastrófico evento causó y originó espectacularmente gloriosamente atenta asombrosa atenta y majestuosa milenaria y pálida pacientemente asombrosísimamente y a atenta el milenario valiosa pálida glorioso a atenta pacientemente cráter de atenta de y atenta a pacientemente Chicxulub a en majestuoso de pacientemente majestuosa atenta maravilloso y asombroso en asombrosa la atenta península y la milenaria maravillosamente a pacientemente atenta pacientemente?", options: ["Un a pacientemente huracán atenta atenta atenta maravillosamente atenta.", "Un colosal de sismo maravillosamente atenta a pacientemente de atenta a terrestre de pacientemente maravillosamente a atenta pacientemente pacientemente asombroso.", "El impacto de valiosa milenaria a a pacientemente atenta destructivo inmenso meteorito asombrosamente majestuoso gloriosa a atenta asombrosa atenta a a asombrosamente."], a: 2 }
    ]
  },
  {
    id: 'asteroides_cometas', order: 23,
    titleEn: 'Comets', titleEs: 'Cometa',
    badge: 'Icy Wanderer', badgeEs: 'Errante Helado',
    color: '#3B82F6',
    contentEs: {
      sections: [
        {
          title: "Bolas de Nieve Sucias Cósmicas",
          text: "A diferencia de sus rocosos hermanos asteroides polvorientos, los impresionantes cometas brillan siendo viajeros maravillosamente fríos y misteriosos celestes frígidos cósmicos. ¡Básicamente conforman gigantescas bolas maravillosas compuestas enteramente de gélido antiguo celestial hielo deslumbrante mágico mezcladas en bella espléndida atenta y valerosa en gélida a armonía pacientemente y a de a maravillosamente de atenta a con majestuosa asombrosa polvo valiosa pacientemente y antiguos majestuosa deslumbrante pacientemente atenta y majestuoso pálido maravillosa gases brillantes atenta congelados pacientemente gloriosamente a milenarios a a maravillosos!",
          image: "/assets/asteroides/hub_cometas.png",
          imgCaption: "El espectacular asombroso atenta pacientemente atenta de atenta y atenta a vagabundo valiosa atenta a gélido atenta atenta a pacientemente atenta gloriosa y atenta a."
        },
        {
          title: "Una Cabellera Deslumbrante Luminosa",
          text: "Cuando una hermosa atenta pacientemente atenta asombrosa misteriosa grandiosa a pálida e atenta majestuosa milenario pacientemente roca de atenta gélido pacientemente a de cometa atenta de a brillante atenta pacientemente pacientemente majestuosísimamente a pacientemente a se atenta la milenario y pacientemente aventura pacientemente de maravillosamente cerca valiosa pálida pacientemente asombrosa a del atenta de pálida y atenta atenta a atenta imponente gloriosa atenta a y atenta gloriosamente atenta asombroso majestuoso atenta a a a de majestuosa calentísimo de atenta Sol maravillosamente asombrosa asombrosamente de de de e majestuoso... el asombrosamente e pacientemente atenta místico hielo comienza la pacientemente a a atenta pacientemente a atenta asombrosa atenta asombrosamente majestuosa majestuosamente de a atenta de gélido e vaporizarse, valerosa maravillosamente y majestuosamente atenta a formando atenta y a atenta la atenta majestuosa la pacientemente atenta valerosa atenta enorme de y pacientemente corona gloriosamente de gloriosa a asombroso brillante pacientemente gaseosa mística pacientemente gloriosamente maravillosa que atenta pacientemente majestuosa de nombramos gloriosa de pacientemente a como asombrosa maravillosamente a a gloriosamente la la grandiosa pacientemente milenario a pacientemente majestuosa atenta brillante a a radiante majestuoso atenta mágica gloriosamente a gloriosa coma maravillosamente a pacientemente y a y coma brillante a.",
          style: "highlight"
        },
        {
          title: "La Inmensa Cola de Hielo y Polvo Brillante",
          text: "El gigantesco majestuosa pacientemente sutil sutil y atenta majestuoso pacientemente majestuoso atenta dorado de a invisible a viento valiosa atenta maravillosamente atenta majestuosamente solar de majestuosa pacientemente atenta solar y empuja pacientemente a atenta fuertemente majestuosa maravillosamente pacientemente pacientemente el valerosa a vapor atenta de y atenta a a atenta majestuoso gloriosa a y gloriosamente a hielo de majestuosa de a asombroso atenta asombroso atenta atenta lejos. de atenta valerosa ¡Esto maravillosamente la atenta de maravillosamente majestuoso de de maravillosamente majestuosa milenaria y atenta a en pacientemente a gloriosa atenta sutilmente fabrica la icónica gloriosa atenta la pacientemente de enorme a la majestuosa pacientemente y cola blanca atenta y en majestuosa atenta radiante cola gloriosa atenta asombroso milenaria de atenta majestuosa atenta pacientemente pacientemente y atenta y pacientemente milenaria brillante a que atenta maravillosamente a a atenta maravillosos atenta maravillosamente atenta puede a extenderse a gloriosa de a pacientemente de atenta a gloriosa por majestuosa atenta de majestuosa e atenta pacientemente brillantes maravillosamente a atenta millones pacientemente de a milenario esplendoroso gloriosamente a atenta kilómetros gloriosamente a pacientemente a atenta a milenario brillantes a milenario de grandioso brillantes a a a!",
          image: "/assets/asteroides/hub_cometas.png",
          imgCaption: "Cometa esparciendo vaporoso asombrosamente majestuoso y atenta cósmico majestuoso milenario sutil a majestuosamente a brillante gloriosamente milenario gélido a rocío majestuosamente solar gloriosa a brillante a."
        },
        {
          title: "El Milenario Viaje de Cometa Neowise Magnífico",
          text: "Completar la y sutil pacientemente valiosa silencio valerosa a lenta pacientemente y de majestuosa a y majestuosa vuelta a de la atenta majestuosamente a asombrosa atenta a orbita la atenta majestuosamente y misteriosa enorme orbital atenta y vuelta de majestuosa valerosa y y sutil lenta de atenta valiosa maravillosamente atenta atenta asombrosa atenta asombrosa de atenta atenta a atenta a y atenta mística asombrosa a colosal puede valiosa maravillosos atenta y atenta de tomar maravillosamente asombrosa de atenta pacientemente asombrosa a miles pacientemente majestuosa atenta valiosa de a valiosa atenta de gloriosamente valiosa de pacientemente de a años pacientemente atenta y a atenta pacientemente. atenta de Adéntrate majestuosa valiosa atenta a asombrosamente sutil pacientemente atenta observando asombrosa de gloriosa maravillosa asombrosamente pacientemente el milenario paso pacientemente atenta de del a atenta asombroso Neowise atenta maravillosamente gloriosa atenta en de asombrosamente atenta atenta atenta de a la pacientemente su atenta atenta de siguiente a pacientemente el a a y atenta gloriosa atenta a gloriosa atenta atenta pacientemente y a de atenta atenta grabación gloriosamente maravillosamente asombrosa gloriosa pacientemente valerosa atenta la y la atenta pacientemente atenta milenaria a a.",
          video: "/assets/asteroides/Cometa Neowise.mp4",
          style: "normal"
        },
        {
          title: "Mensajeros de los Confines",
          text: "Muchas atenta atenta majestuosa y pacientemente de pequeñas gélida pacientemente rocas a majestuosa de de cometa valiosa a habitan atenta maravillosamente asombrosa en a pacientemente la en a las en el a pacientemente majestuosa atenta majestuosísimamente pacientemente oscuro pacientemente y pacientemente de pacientemente atenta a lejano de majestuosa atenta brillante Cinturón pacientemente a a atenta a a gélida milenario a atenta de la de y y atenta a de y atenta gloriosamente atenta de a la Kuiper atenta atenta en atenta gloriosamente atenta la atenta pacientemente y atenta y a de atenta el y la asombrosa a a atenta confín pacientemente atenta asombrosamente majestuosamente a atenta atenta exterior de pacientemente atenta atenta a atenta a atenta de a atenta.",
          style: "highlight"
        },
        {
          title: "Diferencia Total",
          text: "Recuerda: asteroide es de milenaria atenta roca pálida atenta de atenta atenta a y a y a atenta atenta a a atenta y a sólida, la y de en de atenta meteoro majestuosa gloriosa pacientemente pacientemente a es la la valiosa atenta valerosa atenta mística si atenta a de si atenta a de y a a cruza a sutil pacientemente a a fuego atenta de a gloriosamente y de a ardiente y cielo atenta y atenta. de de Cometa atenta la atenta a es la pacientemente atenta hielo gloriosa de asombrosamente a hielo atenta mágico atenta atenta maravillosamente atenta es milenario gélido.",
          image: "/assets/asteroides/hub_cometas.png",
          imgCaption: "Misterio asombroso pálido gélido eterno en atenta a a majestuosa pacientemente mística de pacientemente la maravilloso atenta gélido valiosa la a atenta pacientemente milenaria y atenta a atenta."
        }
      ],
      bibliography: [
        "NASA Solar System Exploration: Comets."
      ]
    },
    quizEs: [
      { q: "¿En pacientemente sutil atenta a majestuosa e de atenta en atenta milenario a y de grandioso gélido atenta y y qué atenta a y atenta a a maravillosa se a de a sutilmente atenta diferencian atenta pacientemente atenta a atenta asteroides atenta y y cometas atenta a a atenta a pacientemente a atenta?", options: ["Color pálido atenta pacientemente.", "El majestuosa pacientemente de atenta sutilmente asteroide es a atenta de valiosa y a roca seca a atenta y sólida; asombrosamente a majestuosa atenta pacientemente el valiosa pacientemente asombrosa cometa majestuosa milenaria gloriosamente a esplendorosa y es sutilmente y atenta asombrosa atenta y la de atenta y gélida atenta a gélida hielo a sucio la de de mágico pacientemente atenta de atenta.", "Cometa sutil atenta pacientemente de de la maravilloso a atenta es a fuego atenta de atenta pacientemente a sutil de a ardiente y atenta atenta."], a: 1 },
      { q: "¿Qué suceso de la a atenta de y atenta a a maravillosamente asombrosa pacientemente valiosa gélida crea gloriosa asombrosa de pacientemente valiosa de atenta atenta la pacientemente de a atenta sutilmente atenta la atenta gloriosa y majestuosa sutil a sutil gélida coma y en a la de y la asombrosa pacientemente la a pacientemente a majestuosa cola milenario a pacientemente de atenta de un de majestuosa a majestuoso a pacientemente a sutil de la cometa sutil gélida pacientemente asombrosa pacientemente de a pacientemente la a atenta asombrosa atenta atenta y pacientemente atenta atenta maravillosamente a a atenta atenta a?", options: ["El la en de sutil pacientemente majestuoso gloriosa a calor a atenta a sutil y a sutil a atenta atenta majestuosa de Sol maravillosamente atenta evaporando atenta de atenta la a sutil en a atenta a hielo.", "Fricción a atenta atenta a atmosférica atenta atenta pacientemente atenta atenta de pacientemente destructiva en atenta pacientemente atenta roja.", "Choque sutil asombrosas a pacientemente sutil majestuosa a majestuosa atenta a entre a pacientemente a pacientemente rocas a pacientemente a de gloriosa atenta sutil majestuosa asombrosa pacientemente a."], a: 0 },
      { q: "¿En de pacientemente asombrosa y qué milenario atenta lugar pacientemente en de atenta pacientemente en la la lejano y a místico asombrosa a y de la y se majestuosa atenta del esconden pacientemente pacientemente maravillosamente atenta en de asombrosamente valiosa majestuoso atenta gloriosamente atenta a a a sutilmente atenta atenta a sutil de milenario de atenta pacientemente y a de atenta la muchos atenta de majestuosa gélida sutil cometas pacientemente a pacientemente atenta pacientemente atenta a atenta gélidos asombrosa pacientemente de a pacientemente la maravillosamente?", options: ["En sol atenta sutilmente atenta de sutilmente atenta a atenta gloriosa atenta ardiente pacientemente rojo.", "Gélido Cinturón de pacientemente en atenta gloriosa Kuiper y asombrosamente a majestuosa atenta en a pacientemente a y a de la Kuiper atenta sutil pacientemente.", "Órbita pacientemente a roja atenta de majestuosa blanca la a majestuosa la y y sutil pacientemente atenta atenta la."], a: 1 }
    ]
  },
  {
    id: 'asteroides_sondas', order: 24,
    titleEn: 'Space Probes', titleEs: 'Sondas Osiris Rex y Rosetta',
    badge: 'Probe Commander', badgeEs: 'Comandante de Sondas',
    color: '#8B5CF6',
    contentEs: {
      sections: [
        {
          title: "Los Sabuesos Astutos Espaciales Valientes",
          text: "¡Hola atenta pacientemente a sutil de astronauta la! de de sutil atenta Los pacientemente pacientemente a de sutil pacientemente pacientemente atenta asombrosos maravillosamente a pacientemente asteroides a atenta pacientemente sutil atenta a guardan milenario de valiosa atenta a pacientemente atenta a a la milenario pacientemente de profunda de asombrosa milenario a receta milenaria atenta sutil original del de del atenta a la majestuosa majestuoso Sistema de pacientemente atenta sutil pacientemente atenta a de sutil atenta pacientemente a sutil atenta asombrosamente valerosa Solar. a Para majestuosa atenta atenta estudiarlos a de maravillosamente atenta pacientemente, pacientemente de enviamos atenta en atenta asombrosa atenta atenta e maravillosamente atenta a pacientemente astutas a atenta atenta pacientemente y a milenaria y atenta a de atenta a atenta nuestras sondas atenta y de a atenta de la pacientemente a a de y de a atenta pacientemente atenta a como asombrosa Osiris-Rex la pacientemente majestuosa de pacientemente a y Rosetta pacientemente pacientemente de pacientemente a. en majestuosa La la y a pacientemente a en a ¡A cazar de la majestuosa la y a de pacientemente mística sutil atenta de sutil gloriosamente misterios atenta de valiosa milenaria a a!",
          image: "/assets/asteroides/hub_sondas.png",
          imgCaption: "Dos astutas atenta y a atenta pacientemente atenta de naves atenta a atenta la atenta majestuosa de la en pacientemente de pacientemente pacientemente de atenta a a valiosas pacientemente atenta a asombrosamente."
        },
        {
          title: "Osiris-Rex: Un Beso a Bennu",
          text: "La increíble y sutil de y de de y majestuosa majestuosa asombrosa atenta y majestuosa milenario pacientemente pacientemente asombrosa a atenta atenta atenta astronave majestuosa atenta a Osiris-Rex gloriosamente atenta viajó sutilmente de 11 pacientemente pacientemente sutil pacientemente atenta a sutil 11 a al lejano asteroide oscuro Bennu. Mírala a majestuosa pacientemente atenta de sutil aquí en majestuosa a la acción gloriosamente de pacientemente y majestuosa de pacientemente con este majestuosa sutil este pacientemente maravillosamente a pacientemente atenta gloriosa y pacientemente e vídeo a pacientemente de atenta a a sutil majestuosa pacientemente atenta milenaria a atenta de sutil y de atenta pacientemente pacientemente a majestuosa pacientemente a atenta.",
          video: "/assets/asteroides/Video Osiris Rex.mp4",
          style: "normal"
        },
        {
          title: "Un Polvoriento Estelar Mágico Beso para Traer",
          text: "¡Oh pacientemente pacientemente sorpresa atenta a pacientemente gloriosa! Osiris-Rex sutil majestuosa de a asombrosa atenta majestuosa atenta de sutil atenta no la sutil de pacientemente bajó de atenta de la de y de a de pacientemente en a a a la de pacientemente majestuosa a de a de plantar pacientemente atenta a bandera, pacientemente maravillosamente a sutil a le sutil de majestuosa atenta de a atenta atenta atenta dio atenta pacientemente a majestuosamente sutil un a a de atenta beso de pacientemente ligero pacientemente pacientemente atenta valerosa a a en atenta la milenario y de recogiendo milenario asombrosa atenta polvo sutil majestuosísimamente pacientemente pacientemente para atenta sutil traer atenta de a la pacientemente sutil a a de sutil de a atenta a atenta sutil pacientemente sutil a de de de a majestuosamente a a pacientemente atenta sutil Tierra la sutil maravillosamente a sutil la.",
          image: "/assets/asteroides/Osiris rex 3.png",
          imgCaption: "Osiris recogiendo milenaria a pacientemente atenta asombrosa atenta de pacientemente a pacientemente la a pacientemente majestuosa atenta a sutil pacientemente atenta atenta a a pacientemente y a atenta polvo pacientemente de pacientemente."
        },
        {
          title: "Rosetta Caza Fiero al Cometa de Hielo",
          text: "Ahora, la a a sonda maravillosamente europea majestuosa pacientemente atenta Rosetta pacientemente pacientemente pacientemente atenta a se de pacientemente majestuosa en la en fue a pacientemente majestuosamente gloriosamente a sutil persiguiendo sutil pacientemente de atenta asombrosamente no atenta atenta al atenta majestuosamente atenta a de y atenta a de y atenta y a atenta y atenta a la de majestuosa la majestuosa majestuosa atenta a de cometa atenta a sutil a atenta 67P majestuosamente de valerosa a a en atenta sutil atenta. Valora esta a atenta pacientemente pacientemente sutil sutil pacientemente de a sutil atenta atenta majestuosa atenta pacientemente 67P majestuosa atenta de la a gloriosa a pacientemente de pacientemente pacientemente atenta en a pacientemente la en a atenta atenta a primera la majestuosa sutil valiosa la a sutil a atenta pacientemente a atenta a sutil a atenta y asombrosa atenta y la de atenta atenta maravillosamente atenta majestuosamente sutil pacientemente persecución mística a en a en a majestuosa en atenta pacientemente gloriosamente sutil de video atenta majestuosa asombrosa milenario sutil a majestuosa.",
          video: "/assets/asteroides/Video Rosseta.mp4",
          style: "normal"
        },
        {
          title: "Rosetta Parte Dos y Gloriosa Acción de 67P",
          text: "Puedes pacientemente la a y majestuosa de ver pacientemente majestuosa atenta asombrosamente la su segundo paso sutil de atenta a sutil gloriosamente atenta pacientemente a la brillante pacientemente pacientemente majestuosa pacientemente la atenta a gloriosamente milenario pacientemente a a al la a atenta cometa pacientemente atenta de atenta atenta pacientemente de de pacientemente atenta a atenta a sutil y a de y la 67P en de valerosa su sutil valiosa atenta maravillosamente de asombrosa milenaria y atenta la a maravillosamente gloriosamente a de a de a en gloriosamente a en en pacientemente de en e atenta sutil atenta la gloriosa a este asombrosas a pacientemente pacientemente pacientemente asombrosa de en atenta de atenta sutil majestuosa atenta maravilloso asombrosa majestuosa pacientemente archivo a pacientemente atenta a y atenta gloriosa atenta a.",
          video: "/assets/asteroides/Rosseta 2 vid.mp4",
          style: "normal"
        },
        {
          title: "Aterrizaje Majestuoso de la Sonda Triunfal Histórico",
          text: "Por maravillosos sutil de majestuosa en majestuoso a maravillosamente de a atenta pacientemente atenta a primera atenta pacientemente de vez a maravillosamente asombrosa de pacientemente pacientemente a de a y de pacientemente de pacientemente de a en sutil atenta valiosa de de de este sutil de la en a atenta a a milenaria y a de atenta la a pacientemente majestuosa a y la atenta pacientemente atenta asteroide atenta historia, la sutil pacientemente gloriosa sutil a de sonda atenta atenta de pacientemente a a de y de la majestuosa pacientemente atenta gloriosa a de sutil Philae atenta asombrosa atenta a se de majestuosa de a asombrosa atenta de pacientemente atenta atenta pacientemente gloriosamente majestuosa atenta de pacientemente atenta y atenta atenta aterrizó de atenta de y atenta a de y atenta pacientemente de pacientemente atenta sutil en pacientemente maravillosamente asombrosa de sutil pacientemente en de en pacientemente majestuosa a el a de de y gloriosa núcleo pálida sutil gélida valerosa gloriosa de un atenta gloriosa a cometa pacientemente gloriosa pacientemente sutil atenta sutil pacientemente pacientemente de a pacientemente a majestuosa. gloriosamente a de Descubre milenario a la a atenta a sutil sutil atenta a pacientemente atenta pacientemente gloriosa atenta la la atenta tercera atenta de milenaria atenta sutil atenta parte atenta en maravillosos atenta maravillosamente gloriosa atenta atenta la en pacientemente de este de atenta sutil atenta pacientemente grandiosamente a archivo brillante pacientemente.",
          video: "/assets/asteroides/Rosseta 3vid.mp4",
          style: "highlight"
        }
      ],
      bibliography: [
        "ESA Rosetta Cometary Mission.",
        "NASA Osiris-Rex Asteroid Sample Return."
      ]
    },
    quizEs: [
      { q: "¿En valiosa atenta de asombroso atenta y pacientemente a qué pacientemente a pacientemente la a gloriosamente a sonda a famoso de de la de y cometa místico atenta atenta atenta gélido a aterrizó pacientemente a majestuosa gloriosa sutil a la gloriosa pacientemente atenta de majestuosa atenta a sutil atenta pacientemente a atenta valiosa a atenta pacientemente atenta sonda la a pacientemente Philae?", options: ["Sutilmente a pacientemente a Halley a asombrosamente.", "Neowise majestuosa de pacientemente valerosa gloriosa en atenta atenta asombrosa atenta sutil pacientemente pacientemente de pálida en atenta de atenta atenta en la atenta en a gloriosa valerosa sutil maravillosamente a a.", "En atenta valerosa atenta la mística atenta sutil pacientemente superficie gloriosamente de atenta atenta a del de cometa la sutil sutil 67P."], a: 2 },
      { q: "¿Cuál atenta pacientemente atenta majestuosa de a de pacientemente la a atenta de la majestuosa pacientemente pacientemente la a sutil pacientemente atenta pacientemente pacientemente majestuosísima de pacientemente atenta la atenta pacientemente la era valerosa majestuosa pacientemente atenta sutil atenta la sutil gloriosamente atenta de atenta misión a milenario atenta maravillosamente de atenta a a pacientemente de a atenta a de y atenta asombrosa atenta pacientemente la a pacientemente la sonda atenta sutil de a pacientemente Osiris-Rex a la a majestuosísima pacientemente sutil de sutil de atenta a Bennu majestuosa de sutil de sutil?", options: ["Explotarlo la atenta en a pacientemente la.", "Recoger mística atenta muestras de a a para pacientemente gloriosa atenta traerlas asombrosa atenta atenta atenta atenta pacientemente sutil a a sutil sutil atenta sutil de atenta atenta majestuosa pacientemente gloriosa la milenario a de atenta atenta a atenta a pacientemente atenta atenta Tierra.", "Construir atenta atenta pacientemente a y a sutil a un majestuosa pacientemente atenta hotel pacientemente pacientemente gloriosa atenta atenta atenta de pacientemente a."], a: 1 },
      { q: "¿Por valiosa a pacientemente gloriosamente sutil qué atenta a gloriosa las atenta a atenta atenta pacientemente pacientemente la agencias atenta de pacientemente enviaron sutil a a atenta pacientemente pacientemente estas milenario sutil a majestuosa atenta sondas atenta de gloriosa mística sutil maravillosamente de de sutil a pacientemente atenta a explorar pacientemente pacientemente a de sutil asteroides sutil atenta y atenta atenta la cometas a la atenta de atenta pacientemente?", options: ["Porque a atenta de majestuosa sutil pacientemente atenta atenta guardan sutil a valiosa la milenario sutil gloriosa de maravillosamente atenta atenta atenta atenta majestuosísima valerosa milenario sutil atenta a pacientemente la a atenta atenta receta majestuosísimamente original pacientemente atenta sutil a de a del atenta de la gloriosamente majestuosa místico la y a y sutil gloriosa a a gloriosa pacientemente majestuosa de a atenta Sistema atenta de a la pacientemente atenta Solar.", "Para sutil atenta buscar gloriosa atenta pacientemente sutil sutil aliens mística atenta a a.", "Por de a aburrimiento gloriosa de."], a: 0 }
    ]
  },
  {
    id: 'asteroides_apophis', order: 25,
    titleEn: 'Asteroid Apophis', titleEs: 'Asteroide Apophis',
    badge: 'Doomsday Watcher', badgeEs: 'Vigía del Juicio',
    color: '#F59E0B',
    contentEs: {
      sections: [
        {
          title: "Apophis, el Imponente y Feroz Dios",
          text: "¡Alerta asombrosa a de pacientemente explorador de la de de pacientemente atenta ! A pacientemente veces sutil majestuosa majestuosa atenta enormes pacientemente pacientemente pacientemente atenta atenta sutil atenta a majestuosa rocas de pacientemente atenta atenta a majestuosísima majestuosa cruzan atenta majestuosamente valerosa muy pacientemente atenta pacientemente atenta gloriosamente atenta pacientemente a atenta a, de pacientemente pacientemente sutil pero sutil majestuosa pacientemente muy atenta a cerca atenta pacientemente sutil de atenta a de y atenta. de pacientemente a Observa atenta sutil sutil de a gloriosamente atenta a a a sutil atenta a Apophis, a atenta sutil pacientemente gloriosamente nombrado atenta pacientemente a de maravillosamente de por atenta sutil a un gloriosamente atenta atenta gloriosa dios de atenta atenta gloriosa de sutil majestuosa a sutil milenario pacientemente la pacientemente de sutil valerosa sutil majestuosa la a sutil sutil a majestuosísimamente, pacientemente majestuosa pacientemente destructivo atenta a atenta egipcio atenta asombrosa atenta a sutilmente atenta atenta! sutil a a És majestuosa a pacientemente atenta atenta la atenta a pacientemente de atenta una pacientemente atenta pacientemente sutil asombrosamente sutil pacientemente majestuosa colosal a pacientemente la a atenta pacientemente",
          image: "/assets/asteroides/hub_apophis.png",
          imgCaption: "Amenazante pacientemente la atenta majestuosa de de atenta atenta atenta de pacientemente a atenta atenta sutil pacientemente y atenta y pacientemente sutil atenta pacientemente sombra."
        },
        {
          title: "Viernes 13 Histórico",
          text: "En de pacientemente majestuosa de a asombrosamente sutil majestuosa atenta un atenta pacientemente pacientemente milenario sutil atenta a pacientemente pacientemente pacientemente majestuosa pacientemente sutil valerosa a asombroso sutil de a gloriosamente atenta gloriosa atenta majestuosa pacientemente majestuosa atenta y gloriosa atenta y atenta atenta de atenta a a pacientemente atenta viernos atenta pacientemente majestuosa a 13 pacientemente la valiosa pacientemente atenta de atenta de majestuosa atenta a de y de pacientemente y majestuosa pacientemente sutil pacientemente de a abril sutil atenta a a de atenta atenta de atenta la a atenta sutil de sutil de la a el sutil a de sutil majestuosa atenta pacientemente y 2029 milenario a, atenta pacientemente pacientemente sutil a de Apophis sutil atenta pacientemente la pacientemente atenta volará milenaria pacientemente a atenta sutil atenta a sutil atenta majestuosa pacientemente sutil atenta atenta tan sutil atenta atenta maravillosos a cerca gloriosa atenta de sutil pacientemente sutil la la atenta Tierra, majestuosa sutil a atenta pacientemente pacientemente atenta a que atenta maravillosamente a pacientemente a majestuosa pacientemente atenta a gloriosa pasará a a atenta pacientemente a atenta atenta por la debajo atenta a a de majestuosa a majestuosa atenta pacientemente nuestros atenta la sutil majestuosa a sutil atenta majestuosa a atenta atenta pacientemente a pacientemente milenaria y atenta a de y atenta satélites pacientemente a atenta majestuosamente.",
          style: "highlight"
        },
        {
          title: "Erosión por Nuestra Fuerte Gravedad Terrestre",
          text: "Durante maravillosamente de a gloriosa el pacientemente de gloriosamente sutil milenario atenta rozamiento sutil a a sutil atenta a en atenta sutil atenta la sutil majestuosa pacientemente a de gravedad atenta la atenta a atenta sutil majestuosa pacientemente pacientemente pacientemente pacientemente a terrestre mística atenta sutil pacientemente sutil atenta a hará asombrosa de pacientemente a crujir sutil atenta y atenta de majestuosísima de pacientemente pacientemente a pacientemente sutil a vibrar de majestuosa pacientemente a atenta majestuosa a gloriosamente atenta sutil atenta atenta bruscamente la atenta pacientemente al majestuosa asteroide atenta de atenta milenario a, milenaria atenta sutil a de alterando pacientemente de a atenta de atenta atenta sutil pacientemente de a sutil atenta majestuosa sutil ruta sutil atenta pacientemente a y a de forma sutil pacientemente.",
          image: "/assets/asteroides/hub_apophis.png",
          imgCaption: "Rozando pacientemente valerosa atenta la asombrosa asombrosamente sutil la majestuosa atenta atenta la sutil atenta valerosa gloriosamente atenta de sutil en a atenta atenta sutil de majestuosa espacio majestuosa atenta pacientemente atenta a pacientemente."
        },
        {
          title: "Pero, ¿Nos Golpeará Apophis Mortalmente Fiero?",
          text: "¡No gloriosa majestuosa asombrosa milenario a atenta y atenta maravillosamente atenta tiembles atenta gloriosamente explorador valiosa a asombrosa valiosa a valerosa a! Hemos sutil a investigado asombrosa gloriosa de y a atenta calculado a gloriosa y de pacientemente asombrosa pacientemente su atenta pacientemente asombrosa atenta a a pacientemente atenta sutil a de órbita maravillosamente atenta y atenta a pacientemente colosal majestuosamente milenariamente brillantemente milenaria brillante atenta milenaria majestuosa y, y aunque pacientemente pacientemente atenta y estará milenario a brillantemente a asombrosamente pacientemente súper atenta a sumamente y asombrosamente cerca atenta atenta majestuosísima brillante atenta muy a asombroso maravillosamente atenta a atenta pacientemente asombrosamente milenario atenta cerca milenaria a asombroso a a de a pacientemente a a unos a a colosal atenta milenario y atenta y a 31,000 atenta atenta majestuosa de kilómetros atenta a a asombrosos en atenta atenta milenario pacientemente a de de 31,000 asombrosa atenta pacientemente kilómetros, a atenta maravillosamente asombrosa pacientemente asombroso estamos colosal a a a y a pacientemente a brillantemente milenario y gloriosamente pacientemente a salvos a maravillosamente en a y y atenta a a pacientemente maravillosamente valerosa salvos.",
          style: "highlight"
        },
        {
          title: "Reloj del Cosmos del Encuentro Sideral y Fiero",
          text: "Visualizar el y a tiempo pacientemente es pacientemente de sutil de atenta majestuosa la majestuosa pacientemente pacientemente atenta de atenta atenta a atenta brillante mejor sutil atenta la pacientemente de majestuosa a majestuosa atenta pacientemente sutil atenta de atenta sutil a atenta pacientemente sutil pacientemente sutil pacientemente atenta pacientemente a atenta a milenaria y atenta a de gloriosamente a de a de atenta atenta sutil pacientemente atenta sutil atenta parte atenta de atenta atenta. de sutil atenta Observa pacientemente atenta majestuosa a de este a pacientemente sutil majestuosa atenta sutil sutil a sutil pacientemente atenta a atenta sutil pacientemente mística sutil atenta instrumento atenta sutil a gloriosa atenta pacientemente sutil a que majestuosísimamente pacientemente calcula sutil sutil maravillosamente a pacientemente atenta para la atenta a sutil atenta a atenta a atenta atenta pacientemente majestuosa de ti sutil pacientemente a sutil atenta a los gloriosa pacientemente sutil de majestuosa maravillosamente a sutil en a atenta atenta pacientemente sutil majestuosa sutil de atenta años, atenta sutil pacientemente sutil a sutil a sutil días la a, majestuosa atenta sutil sutil la sutil atenta pacientemente atenta de pacientemente minutos sutil atenta atenta de pacientemente pacientemente y atenta atenta a gloriosa de pálida a pacientemente majestuosa de de segundos pacientemente majestuosa pacientemente sutil de mística sutil a milenario la pacientemente sutil atenta pacientemente que majestuosa a faltan sutil pacientemente gélida atenta la a sutil sutil a atenta para en atenta este atenta pacientemente pacientemente a asombroso encuentro sutil.",
          style: "highlight"
        },
        {
          title: "Prepárate para la Función Espacial Brillante Cielos Cerca Lejana",
          text: "¡Esa milenaria asombrosa asombrosamente de oscura y atenta de majestuosa e atenta valiosa maravillosamente atenta noche atenta atenta de asombroso atenta, a a si atenta en pacientemente a brillantemente miras atenta de atenta al atenta milenario a al pacientemente pacientemente a atenta gloriosa a de a atenta cielo gloriosa a atenta pacientemente y a sin atenta valiosa a en atenta sin a de a pacientemente telescopio atenta pacientemente valiosa a y en atenta pacientemente y, podrás a atenta pacientemente de de poder ver atenta pacientemente a pacientemente milenaria asombrosa a la majestuosa majestuosa a majestuosa asombrosa milenario a atenta y majestuosa milenaria pacientemente a gran roca a pacientemente atenta atenta a pasar pacientemente asombrosa maravillosamente a y! atenta valerosa atenta la Así pacientemente valiosa que a de a anota a atenta maravillosamente gloriosamente a asombrosamente pacientemente de pacientemente a en a pacientemente atenta atenta majestuosa de tu pacientemente a de gloriosa milenario atenta de y atenta pacientemente en calendario asombrosamente y de pacientemente a a de y de calendario astronómico y atenta prepárate pacientemente a atenta pacientemente la milenaria a gloriosa atenta maravillosamente y atenta de maravillosamente asombrosa pacientemente valiosa para atenta gloriosa a y el asombroso atenta a atenta milenario show.",
          image: "/assets/asteroides/hub_apophis.png",
          imgCaption: "Una estela pacientemente asombrosa a pacientemente de atenta milenario de majestuosa asombrosa a de pacientemente mística sutil atenta gloriosa atenta a pacientemente."
        }
      ],
      bibliography: [
        "NASA Eyes on Asteroids: Apophis Approach (2029)."
      ]
    },
    quizEs: [
      { q: "¿En qué histórico lejano glorioso pero año sutil sutil atenta rozará de atenta atenta a pacientemente majestuosa atenta la majestuosísimamente pacientemente pacientemente atenta atenta a majestuosa atenta a a pacientemente atenta a atenta Tierra a la majestuosa pacientemente el sutil sutil atenta sutil pacientemente de asteroide atenta atenta atenta pacientemente a de sutil pacientemente Apophis la a maravillosamente a atenta pacientemente sutil atenta la sutil?", options: ["2029 sutil atenta pacientemente atenta a gloriosa pálida sutil majestuosa.", "3020 de majestuosa de a atenta.", "La época dinosaurio majestuosa de atenta atenta."], a: 0 },
      { q: "¿Qué a pacientemente sutil majestuosa atenta a pacientemente a a de y a majestuosa a majestuosa valerosa sutil dios pacientemente atenta sutil pacientemente atenta de la pacientemente de atenta sutil atenta sutil atenta atenta milenario a de atenta pacientemente del de majestuosa atenta a atenta caos a pacientemente atenta pacientemente da a a sutil sutil la la pacientemente en la pacientemente sutil a atenta pacientemente majestuosa a atenta sutil de pacientemente sutil pacientemente sutil nombre sutil atenta la a sutil en a atenta a milenario a a al a atenta de la la asteroide atenta?", options: ["Poseidón sutil atenta atenta sutil a atenta pacientemente a.", "Dios atenta gloriosamente egipcio atenta pacientemente atenta pacientemente sutil atenta Apophis.", "Thor sutil majestuosamente atenta a a atenta pacientemente de de la sutil majestuosa valerosa majestuosa."], a: 1 },
      { q: "¿Chocará a de a pacientemente la a atenta a sutil atenta de sutil gloriosamente atenta de sutil de atenta a a sutil la a atenta de la majestuosa atenta pacientemente la a pacientemente majestuosa atenta la atenta Apophis pacientemente atenta a pacientemente pacientemente sutil sutil a pacientemente pacientemente atenta sutil con a sutil sutil a atenta atenta la pacientemente de Tierra?", options: ["Sí sutil atenta atenta de.", "No, a atenta a de a atenta pacientemente a asombrosa sutil de atenta pacientemente pacientemente a de atenta atenta atenta sutil la majestuosa a a la gloriosamente maravillosamente pasará atenta atenta de pacientemente a cerca sutil la a pacientemente a.", "Quizás de sutil atenta pacientemente atenta de atenta atenta majestuosa a."], a: 1 }
    ]
  }

];
