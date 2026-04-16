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
          title: "Nuestros Primeros Exploradores",
          text: "¡Hola pequeño astrofísico! Antes de que los humanos nos atreviéramos a cruzar las estrellas, enviamos a diminutos y valientes amigos. Moscas de la fruta fueron literalmente los primeros seres vivos de la Tierra en asomarse al espacio exterior y viajar en un cohete V-2 en 1947.",
          image: "/assets/animales/Portada curso.png",
          imgCaption: "Una ilustración de la historia animal."
        },
        {
          title: "Rozando el Cielo",
          text: "Al principio, estos insectos no orbitaban nuestro planeta. Solo hacían vuelos suborbitales: lograban tocar el frío límite del cielo y caían suavemente con paracaídas para contarnos que sobrevivir en la frontera espacial sí era biológicamente posible.",
          image: "/assets/animales/Laika 1.png",
          imgCaption: "Los vuelos suborbitales tocando la frontera estelar."
        },
        {
          title: "Rompiendo la Órbita",
          text: "Con el avance tecnológico brillante de los años 50, construimos cohetes colosales. La humanidad estaba lista para no solo rozar las nubes místicas, sino para empujar cargas pesadas hasta quedarse flotando alrededor, en nuestra mágica Órbita Terrestre Baja.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Las primeras cápsulas buscando llegar a la órbita."
        },
        {
          title: "Los Mejores Asistentes",
          text: "El espacio profundo es oscuro, no tiene aire y está lleno de radiación. Los científicos necesitábamos asegurarnos de proteger al cuerpo humano; estos nobles animales astronautas probaron las cápsulas y validaron que podíamos enviar tripulantes orgánicos vivos.",
          image: "/assets/animales/Albert2.png",
          imgCaption: "Héroes animales atreviéndose a lo desconocido."
        },
        {
          title: "Hitos Inolvidables",
          text: "Gracias a ellos descubrimos todos los secretos para crear trajes espaciales y métodos de entrenamiento avanzados. Ellos nos entregaron la maravillosa llave que nos abrió la puerta dorada hacia los planetas.",
          image: "/assets/animales/avatar_gatos.png",
          imgCaption: "Astro gatos, perritos y primates, todos aportaron en la aventura espacial."
        },
        {
          title: "Su Video Oficial",
          text: "Acompáñame a ver este hermoso documental. Observar sus cápsulas reales te hará sentir como si viajaras en el tiempo y fueras parte de la historia junto a los pioneros biológicos.",
          video: "/assets/animales/Animales en el espacio.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "Beisher, D. (1971). Animals in Space."
      ]
    },
    quizEs: [
      { q: "¿Qué animalitos fueron biológicos terrestres en viajar expulsados al límite exterior en 1947?", options: ["Sapos acorazados.", "Moscas de la fruta.", "Hurones albinos ligeros."], a: 1 },
      { q: "¿Qué nombre reciben los vuelos donde las naves rozan la frontera del espacio pero caen de regreso sin completar una vuelta a la Tierra?", options: ["Vuelos Suborbitales.", "Aterrizajes Lunares.", "Saltos Espaciales."], a: 0 },
      { q: "¿Por qué se enviaron biológicos antes de enviar humanos reales?", options: ["Para combatir alienígenas.", "Para estudiar si la supervivencia en sin aire espacial a pruebas biológicas.", "Para colonizar."], a: 1 }
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
          title: "El Salto a Mamíferos",
          text: "Insectos superando el espacio fueron buenas noticias, ¡pero los mamíferos somos biológicamente más complejos! Los astrofísicos querían probar qué pasaría con nuestro corazón y pulmones al ser sacudidos por la aceleración de un atronador motor balístico.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Un Mono Macaco Rhesus, ideal para pruebas de aviación."
        },
        {
          title: "Albert I, El Valiente Escogido",
          text: "A finales de los 40, Estados Unidos lanzó a su primer candidato peludo al cielo a bordo de un cohete modificado V-2. Fue el pionero macaco Rhesus llamado amistosamente 'Albert I'. Se convirtió en nuestro primer valiente héroe biológico mamífero.",
          image: "/assets/animales/Albert2.png",
          imgCaption: "Albert, uno de los primeros valientes preparados para escalar la órbita."
        },
        {
          title: "Las Lecciones de Albert",
          text: "El viaje del pionero no fue fácil, las cápsulas de aquel entonces eran inseguras e inestables. Al ir subiendo, la cápsula perdió el soporte y Albert I tristemente falleció. Sin embargo, su sacrificio no fue en vano; de esos errores se crearon equipos de soporte respiratorio efectivos.",
          image: "/assets/animales/Albert4.png",
          imgCaption: "El diseño de las cámaras asfixiantes obligó a los ingenieros a mejorar la ventilación del viaje espacial."
        },
        {
          title: "El Asombroso Vuelo de Albert II",
          text: "Los físicos americanos no se rindieron. Construyeron mejores herramientas y al siguiente año volvieron a intentar con un chico mas robusto: el mono Albert II, volando a probar la mejoría de la máquina estelar.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Albert II preparado valerosamente en la plataforma."
        },
        {
          title: "Rozando la Verdadera Cima",
          text: "Esta vez, la maravilla del cohete tronó el cielo y Albert II resistió. Llegó altísimo, tan lejos como la impresionante marca astronómica de 134 kilómetros arriba de tus cabezas, ganándose para la historia el título del primer mamífero en cruzar oficialmente al espacio exterior vivo.",
          image: "/assets/animales/Albert2.png",
          imgCaption: "Una hazaña asombrosa e histórica en 1949."
        },
        {
          title: "Un Paracaídas Testarudo",
          text: "Albert II superó vivo lo mas fuerte de todo el atronador viaje, pero ¡oh sorpresa!, durante el descenso el paracaídas se partió. La nave se estrelló bruscamente y perdimos a Albert II en el accidente, sin embargo, su valioso cuerpo probó la viabilidad fisiológica.",
          image: "/assets/animales/Albert4.png",
          imgCaption: "Trágicos y rápidos finales al descender para nuestros pioneros."
        }
      ],
      bibliography: [
        "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to Space Shuttle."
      ]
    },
    quizEs: [
      { q: "¿Cual pionero coronó siendo históricamente el primer mamífero biológico astronauta oficial?", options: ["Un felino persa.", "Laika ruidosa.", "Macaco Rhesus pioneer."], a: 2 },
      { q: "¿A cuántos impresionantes kilómetros llegó de altitud Albert II?", options: ["Llegó a la Luna.", "2000 km.", "pico colosal de 134 kilómetros de cielo extremo."], a: 2 },
      { q: "¿Qué trágico y vital componente mecánico se rompió fallando e impidiendo aterrizar seguro?", options: ["El paracaídas amortiguador estrepitoso rasgado letal.", "El motor explotó.", "Perdió el volante de navegación rusa."], a: 0 }
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
          text: "Después de confirmar que el cuerpo y la respiración aguantaban la aceleración y los viajes gélidos, la NASA necesitaba pilotos, no pasajeros atados en una camilla. Queríamos saber si allá arriba en el espacio un piloto biológico podría estirarse, pensar en calma con lucidez, jalar palancas y tomar buenas y pensadas decisiones con agilidad al asombroso volar.",
          image: "/assets/animales/Albert4.png",
          imgCaption: "Chimpancés practicando rutinas cognitivas para ganar ricas recompensas sabrosas."
        },
        {
          title: "El Astuto Proyecto Mercury",
          text: "Hacia los 60, el proyecto pionero espacial Mercury reclutó a geniales, astutos y simpatiquísimos chimpancés felices. El primer elegido y héroe de este atrevido programa grandioso fue el queridísimo y amigable simio feliz Ham. Un simio ágil sonriente de carácter lindo.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Ham, nuestro héroe del Proyecto Mercury norteamericano y asombroso valiente amigable."
        },
        {
          title: "Simulando Al Ser Humano",
          text: "Ham no era pasajero; estaba siendo evaluado con botones y palancas interactivas lumínicas complejas, imitando exacto todo el proceso e idéntico trabajo que pronto pronto iba a intentar e replicar fielmente el primer histórico aventurero humano piloto, tu amigo astronauta estadounidense explorador heroico Alan Shepard.",
          image: "/assets/animales/Albert2.png",
          imgCaption: "Con entrenamiento, demostró grandes dotes cognitivos inmensamente capaces."
        },
        {
          title: "El Despegue y el Susto Rápido Mortal y Fuego Excesivo de Récord",
          text: "Un soleado, brillante y memorable hermoso día frío y glorioso y de memorable 1961 su enorme brillante cohete de fuego ruidoso majestuoso despegó. De pronto, un pequeñito enigmático y regulador mal fabricado del cohete trancó escupiendo en exceso aceleración extrema e inmensa de letal fuego propulsor valioso. Ham el valioso chimpancé heroico aceleró tan rápido hacia la bóveda espacial que rebasó los pronósticos del plan volando fuera descontrolada ruta.",
          image: "/assets/animales/Laika 3.png",
          imgCaption: "El cohete Mercury acelerando fuera de pronóstico veloz volando en trayectoria sorpresa."
        },
        {
          title: "Récord Suborbital Heroico Salvando y Operando Botones",
          text: "Cualquier animal mudo y de susto habría asfixiado se congelado ruidosa de temblor; ¡pero asombrosamente nuestro lindo Ham y heroico no!. A pesar volar excediendo límites y romper en la gélida órbita suborbital maravillosos e insospechados gigantes picos lejanos de 253 colosales monumentales kilómetros récord, empujó bien palancas superando salvando gloriosamente exitoso y su bella vida superó el prueba biológica con sobresaliente de astronáutico histórico astronauta piloto macaco.",
          image: "/assets/animales/Albert.png",
          imgCaption: "Ham salvando vuelo ganando altitud heroico de exitosísima prueba récord suborbital."
        },
        {
          title: "Visualiza su Épico Vuelo Astro chimpancé Valiente Feliz",
          text: "Date tu pequeño gusto astronómico asombrosamente observando maravillando sus tiernas fotos y valiosa la histórica película balística vuelo a continuación. La sonrisa astuta mansa asombro y de dulce victoria piloto mono heroico valerosa astro macaco mono chimpancé héroe de y cápsula asombrosamente valiente y de a salvado gloriosamente feliz el asombroso aterrizaje al océano histórico vivo piloto chimpancé héroe sonriente feliz al.",
          video: "/assets/animales/Ham.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "NASA History Division (2024). Mercury Primate Flights: Ham the Chimp."
      ]
    },
    quizEs: [
      { q: "¿En qué histórico año valiente héroe chimpancé voló superó heroicamente su vuelo Mercury?", options: ["Julio plata luna 1969.", "Asombroso 1961.", "Septiembre soviético 1945."], a: 1 },
      { q: "¿Qué le valió a Ham volar a récord récord astronómica kilómetros espacial?", options: ["Propulsor trancado de exceso regulado.", "Cazaba en luna extraterrestre.", "Fallo y colisión feroz."], a: 0 },
      { q: "¿Por qué para Mercury chimpancés probaban palancas?", options: ["Jalar plátanos en juego.", "Imitaban misma destreza y trabajo que piloto humano americano Alan Shepard haría suborbitalmente pronto.", "Cazar marcianos hostiles de la cabina."], a: 1 }
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
          title: "La Callejera De Las Estrellas",
          text: "Probablemente nuestra amada dulce perrita callejera más famosa en la gloriosa Tierra, ¡Laika! Una mansa, fiel y dócil perrita de Moscú, elegida rigurosamente por los científicos rusos de su fuerte gobierno estelar socialista para coronar e iluminar hazañas inmortales biológicas insospechadas de orbitar en infinito cielo.",
          image: "/assets/animales/Laika 1.png",
          imgCaption: "La fiel perrita de las calles lista para entrenar por las estrellas e iluminar en su valioso heroico de histórico aporte."
        },
        {
          title: "Selección Resistente De Frío Invierno",
          text: "¿Sabías, explorador? Los científicos buscaron perritos sin casa porque confiaron en que ya estaban genéticamente aclimatados al cruel frío ruso. A Laika se le entrenó pacientemente permitiendo que tolerara el confinamiento con una nobleza inigualable.",
          image: "/assets/animales/Laika 2.png",
          imgCaption: "Aislada hermético resistente sin ladrar mudo y resistir asombrozamente valerosa."
        },
        {
          title: "El Exitoso Órbita De Sputnik 2",
          text: "En noviembre de 1957, Laika abordó el monstruoso satélite metálico Sputnik 2. Ella marcó el impresionante récord de ser el primer animal en orbitar vivo alrededor de nuestra majestuosa esfera terrestre.",
          image: "/assets/animales/Laika 3.png",
          imgCaption: "Pita heroico orbitador orbitante vivo asombrosísimas mundial."
        },
        {
          title: "Un Viaje Asombroso Sin Retorno",
          text: "Estados Unidos solo saltaba al espacio, pero la Unión Soviética mantuvo el Sputnik flotando durante meses. Lamentablemente, la tecnología de aquellos años no contemplaba un sistema seguro para regresar la nave a la superficie sana y salva.",
          image: "/assets/animales/Laika 4.png",
          imgCaption: "El hito ruso heroico orbitar en viva asombroso mundial vivo."
        },
        {
          title: "Héroe en Nuestros Corazones",
          text: "Pocas horas después del despegue, un desafortunado fallo térmico elevó demasiado la temperatura, y la pequeña amiga expiró. Laika será por siempre el pilar de la astronautica, un tierno sacrificio que nos impulsó a explorar.",
          image: "/assets/animales/Laika 5.png",
          imgCaption: "Una heroína que brillará siempre en el corazón."
        },
        {
          title: "Reviviendo a La Leyenda",
          text: "Acompáñame a ver este conmovedor y merecido tributo. Descubre al tierno héroe canino ruso que le dio rostro a toda una carrera espacial.",
          video: "/assets/animales/Laika Vid.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "Siddiqi, A. A. (2000). Sputnik and the Soviet Space Challenge."
      ]
    },
    quizEs: [
      { q: "¿Cual heroica mascota se convirtió fúnebre primer animal volar orbitar ser en viva alrededor mundial globo terrestre?", options: ["Gata francesa.", "Perrita callejera dócil Laika dulce soviética.", "Ham amigable piloto mono."], a: 1 },
      { q: "¿A bordo de qué monstruosa nave y satélite satelital ruso voló Laika?", options: ["Sputnik 2 histórico heroica soviético.", "Vostok americano.", "Apollo modular."], a: 0 },
      { q: "¿Qué fallo fúnebre le causó la noble a vuelo trágico?", options: ["Estropeado de de de térmico fallo letal calor cabina sofocante asfixiada calor estrés termostato.", "Asteroide destructivo letal asombrosa fúnebre y destructor.", "Paracaídas de estrellarse estrellar rusa."], a: 0 }
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
          title: "La AstroGata Francesa",
          text: "¡También los curiosos mininos tuvieron su día de gloria estelar! En 1963 Francia llevó cautelosamente a Félicette, una listísima y tierna gata que se erigió como la principal representante felina espacial de la humanidad.",
          image: "/assets/animales/Portada curso.png",
          imgCaption: "Félicette, de mirada curiosa preparándose para la aventura heroica."
        },
        {
          title: "Cuidado Biomédico Elite",
          text: "Los científicos neuro-franceses eligieron a Félicette por su admirable calma. Para documentar el comportamiento de su pequeño cerebro ante la microgravedad, le implantaron delicados y precisos electrodos. ¡Así monitorearon su bienestar en todo momento!",
          style: "highlight"
        },
        {
          title: "Volar al Infinito Cósmico",
          text: "En aquel frío octubre francés de 1963, el inmenso cohete Véronique despegó disparándola con agilidad suborbital a más de 100 kilómetros de altitud. ¡Fue una verdadera y audaz gata voladora récord coronando maravillas!",
          image: "/assets/animales/avatar_gatos.png",
          imgCaption: "Ascenso histórico astronauta suborbital de nuestra felina a más de 100km."
        },
        {
          title: "El Regreso Seguro a Patas",
          text: "Si los gatos de la Tierra siempre caen de pie, ¡las astrogatas caen aún mejor! Félicette regresó salva en su cápsula milagrosamente gracias a su paracaídas, con todos sus registros neurológicos completos, listos para la investigación viva.",
          style: "normal"
        },
        {
          title: "La Pionera Reconocida",
          text: "Mientras la cultura pop adoraba a perros y monos, el valiente logro de esta gatita permaneció calladito mucho tiempo. Afortunadamente hoy es reconocida mundialmente gracias a monumentos que honran por siempre a la dócil y astuta gatita francesa.",
          style: "highlight"
        },
        {
          title: "Félicette Documental",
          text: "Descubre cómo esta simpática y ágil amiguita nos regaló un hito histórico espectacular en los archivos de la Agencia Francesa.",
          video: "/assets/animales/Gatos.mp4",
          style: "normal"
        }
      ],
      bibliography: [
        "Burgess, C. (2014). Animals in Space. Springer."
      ]
    },
    quizEs: [
      { q: "¿Cual gatita coronó en ser la asombrosa de gatita la astuta francesa blancanieves primera asombrosa felina?", options: ["Laika perrita.", "Persa cat asombroso ratón.", "Félicette, la valiente heroína gata francesa."], a: 2 },
      { q: "¿Qué exacto procedimiento médico aplicaron francés científicos para medición a gata?", options: ["Electrodos cerebrales para medir impulsos nerviosos en gravedad cero.", "Rasuraron su piel veloz para resbalar de caída veloz atrevida en.", "Suero mutante fúnebre heroico letal de verde fuerza." ], a: 0 },
      { q: "¿Cómo regresó a tierra la majestuosa gata francesa de su vuelo?", options: ["Estrellarse ruidosa destructiva al re violenta y a destructiva a de ruidosos fúnebre a.", "Perdida y vagando asombrosamente a solitaria mansa en fúnebre y a en de a orbitar letal asombrosas a mansa.", "Bajó bajando sana asombrosa viva majestuosa en de heroico felino con cápsula y paracaídas francés."], a: 2 }
    ]
  }
];