const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');

let jsData;
try {
  jsData = eval(jsonString);
} catch(e) {
  console.log('Eval error', e);
  process.exit(1);
}

function getSectionText(topicIndex, partIndex) {
  const texts = [
    // Topic A: Que es un choque de galaxias y porque ocurren
    [
      [
        "El espacio infinito alberga incontables galaxias viajando a increíbles velocidades.",
        "A veces, dos enormes galaxias cruzan sus extensos caminos cósmicos.",
        "La poderosa fuerza de gravedad mutua las atrae sin piedad.",
        "Un choque estelar es uno de los eventos más asombrosos.",
        "Millones de brillantes estrellas inician una gigantesca danza cósmica eterna.",
        "Estos encuentros tardan miles de millones de años en completarse.",
        "Todo ocurre lentamente en la gigantesca escala del universo observable.",
        "La materia oscura invisible juega un papel absolutamente clave aquí.",
        "Su enorme gravedad actúa como el pegamento cósmico invisible atrayéndolas.",
        "Poco a poco, las estructuras espirales originales comienzan a deformarse.",
        "Inmensos brazos estelares se estiran formando largas colas de marea.",
        "Las colisiones no son realmente impactos físicos entre estrellas individuales.",
        "El inmenso vacío entre estrellas evita que choquen directamente siempre.",
        "Es un espectacular baile gravitacional que remodela galaxias enteras maravillosamente.",
        "Así nacen nuevas galaxias gigantes con formas completamente diferentes siempre."
      ],
      [
        "Nuestra propia galaxia, la Vía Láctea, no es ninguna excepción.",
        "La inmensa fuerza gravitacional actúa a enormes distancias sin límite.",
        "Las galaxias viajan juntas formando cúmulos gigantes en el universo.",
        "Dentro de estos cúmulos cósmicos, los encuentros cercanos son comunes.",
        "Al principio, las galaxias solo rozan sus bordes muy sutilmente.",
        "Pero la inexorable fuerza gravitacional las frena y las captura.",
        "Comienzan a orbitar mutuamente acercándose más en cada vuelta completa.",
        "Gases cósmicos y nubes de polvo interestelar chocan muy violentamente.",
        "Este impacto enciende nuevas generaciones brillantes de estrellas muy jóvenes.",
        "Los misteriosos agujeros negros supermasivos en sus centros interactúan fuertemente.",
        "Poderosas fuerzas de marea desgarran galaxias pequeñas casi sin esfuerzo.",
        "A menudo, grandes galaxias caníbales devoran otras galaxias mucho menores.",
        "El universo primitivo estaba más lleno y los choques abundaban.",
        "Por eso vemos galaxias monstruosas que crecieron tras múltiples colisiones.",
        "Comprender estos eventos cósmicos es vital para estudiar nuestro universo."
      ],
      [
        "Las colisiones estelares transforman radicalmente la evolución del hermoso cosmos.",
        "Estrellas recién nacidas iluminan brillantemente el antiguo espacio negro profundo.",
        "Enormes explosiones estelares enriquecen todo el vacío con pesados elementos.",
        "Inmensas nubes de gas chocan generando potentes ondas de choque.",
        "Estas maravillosas ondas desencadenan procesos complejos de majestuosa formación estelar.",
        "Las galaxias espirales originales suelen perder sus característicos brazos hermosos.",
        "Con el tiempo cósmico, tienden a fusionarse formando galaxias elípticas.",
        "Todo el caos orbital inicial finalmente logra encontrar un equilibrio.",
        "Las estrellas adoptan nuevas y complejas trayectorias espaciales muy ordenadas.",
        "Los agujeros negros se fusionan desatando inmensas ondas gravitacionales invisibles.",
        "Poderosos chorros de energía extrema brotan desde el núcleo galáctico.",
        "Este asombroso fenómeno moldea maravillosamente el futuro del universo observable.",
        "Miles de brillantes científicos observan maravillados estos eventos astronómicos gigantescos.",
        "Los grandes telescopios espaciales capturan las maravillosas imágenes muy detalladas.",
        "Aprender sobre estos choques cósmicos expande nuestro inmenso conocimiento humano."
      ]
    ],
    // Topic B: Que pasa cuando 2 galaxias chocan
    [
      [
        "Cuando dos galaxias colisionan, el caos gravitacional inicial es asombroso.",
        "Estrellas y sistemas planetarios son arrojados hacia nuevas órbitas distantes.",
        "Las hermosas estructuras espirales se destruyen casi por completo siempre.",
        "Enormes colas de mareas brillantes se extienden por el vacío.",
        "Estas colas contienen millones de antiguas y nuevas estrellas luminosas.",
        "Gigantescas nubes moleculares chocan comprimiendo todo el gas interestelar frío.",
        "Esta compresión genera millones de nuevas estrellas brillantes muy calientes.",
        "El cielo cósmico se ilumina con asombrosos colores muy intensos.",
        "Los centros galácticos se atraen mutuamente hundiendo sus núcleos densos.",
        "La fricción dinámica espacial frena velozmente las órbitas de estrellas.",
        "Poco a poco, los dos núcleos masivos se fusionan finalmente.",
        "En el centro absoluto, los agujeros negros supermasivos se acercan.",
        "Este evento libera increíbles cantidades extremas de pura energía cósmica.",
        "Radiación increíblemente intensa inunda el recién formado enorme centro galáctico.",
        "El nacimiento estelar masivo agota rápidamente el gas cósmico disponible."
      ],
      [
        "Sorprendentemente, la probabilidad de choques directos entre estrellas es mínima.",
        "El enorme vacío interestelar es infinitamente más grande que ellas.",
        "Dos galaxias pueden atravesarse como inmensos fantasmas cósmicos muy luminosos.",
        "Sin embargo, la inmensa gravedad altera todo el equilibrio espacial.",
        "Las órbitas perfectas de las estrellas se vuelven totalmente impredecibles.",
        "Sistemas solares enteros son expulsados brutalmente hacia el vacío oscuro.",
        "Se convierten en estrellas huérfanas vagando eternamente sin galaxia alguna.",
        "Otras estrellas son arrastradas violentamente hacia el peligroso núcleo galáctico.",
        "Allí pueden ser devoradas por enormes agujeros negros súper hambrientos.",
        "El gas interestelar frío sí experimenta una verdadera fricción violenta.",
        "Las colisiones cósmicas de gas forman nuevas y hermosas nebulosas.",
        "Miles de supernovas brillantes estallan iluminando la recién formada galaxia.",
        "Ráfagas intensas de radiación ultravioleta bañan el caos galáctico naciente.",
        "Todo este enorme proceso dura cientos de millones de años.",
        "Es un ballet cósmico increíblemente majestuoso, silencioso y extremadamente destructivo."
      ],
      [
        "El final de esta gran colisión galáctica siempre es asombroso.",
        "Las dos galaxias originales logran formar una única galaxia enorme.",
        "Normalmente resulta ser una gigantesca galaxia elíptica, rojiza y antigua.",
        "Al gastarse todo el gas original, no nacen nuevas estrellas.",
        "Solo sobreviven las estrellas rojas más viejas y muy frías.",
        "El polvo cósmico oscuro bloquea mucha brillante luz del centro.",
        "La enorme galaxia final brilla con un tono más oscuro.",
        "Los gigantes agujeros negros centrales se han unido para siempre.",
        "Su monstruosa masa domina todo el tranquilo nuevo sistema cósmico.",
        "A veces, los restos de colisiones forman maravillosas galaxias anulares.",
        "Un impacto central perfecto crea hermosos anillos cósmicos en expansión.",
        "La gran diversidad galáctica es el resultado de muchas fusiones.",
        "Nuestro magnífico telescopio Hubble capturó imágenes asombrosas de estas interacciones.",
        "Cada gran choque galáctico es completamente único e increíblemente hermoso.",
        "La gran astrofísica espacial nos muestra un asombroso universo vivo."
      ]
    ],
    // Topic C: que Galaxias han chocado?
    [
      [
        "El universo observable está absolutamente lleno de fascinantes choques galácticos.",
        "Una de las colisiones más famosas es maravillosamente llamada Antenas.",
        "Hace millones de años, estas dos galaxias comenzaron a cruzarse.",
        "Sus largas colas de estrellas se asemejan a grandes antenas.",
        "Otra gran y hermosa colisión famosa es la galaxia Cartwheel.",
        "Hace tiempo, una pequeña galaxia atravesó completamente su brillante centro.",
        "El violento impacto generó un inmenso anillo cósmico de estrellas.",
        "La famosa Galaxia del Sombrero también esconde un pasado turbulento.",
        "Es el asombroso resultado gigante de una fusión antigua masiva.",
        "Las magníficas Galaxias de los Ratones muestran largas colas estelares.",
        "Están actualmente en el complejo proceso de una gran fusión.",
        "En la gran constelación de Pegaso encontramos el asombroso Quinteto.",
        "El Quinteto de Stephan es un asombroso grupo interactivo galáctico.",
        "Varias galaxias allí bailan una danza caótica y extremadamente peligrosa.",
        "Científicos estudian maravillados todas estas colisiones usando enormes telescopios espaciales."
      ],
      [
        "La inmensa galaxia Centaurus A es otro fascinante ejemplo cósmico.",
        "Es una enorme galaxia elíptica devorando una pequeña galaxia espiral.",
        "Una brillante banda de polvo oscuro rodea su núcleo gigante.",
        "Este asombroso polvo oscuro pertenece a la galaxia siendo destruida.",
        "Centaurus A emite potentes e intensos chorros de radioseñales energéticas.",
        "Estas ráfagas energéticas extremas provienen de su colosal agujero negro.",
        "El choque galáctico alimentó masivamente al agujero negro súper masivo.",
        "La gigantesca galaxia Andrómeda misma tiene un pasado muy violento.",
        "Pruebas indican que Andrómeda absorbió varias pequeñas galaxias enanas antiguas.",
        "Restos estelares y corrientes de estrellas revelan estas colosales digestiones.",
        "Nuestra galaxia absorbió a la enana de Sagitario hace tiempo.",
        "La hermosa Vía Láctea sigue consumiendo pacientemente pequeñas galaxias satélites.",
        "El asombroso espacio lejano es un inmenso campo de asimilaciones.",
        "Las colisiones galácticas pasadas moldearon nuestro tranquilo grupo local actual.",
        "El universo actual guarda hermosas cicatrices estelares del caótico pasado."
      ],
      [
        "Al observar galaxias muy lejanas, miramos hacia el pasado profundo.",
        "En el antiguo universo primitivo, estas masivas colisiones eran frecuentes.",
        "Las jóvenes galaxias primigenias eran más pequeñas y muy caóticas.",
        "Crecieron absorbiéndose entre sí mediante violentos e incontables choques cósmicos.",
        "Imágenes de telescopios espaciales revelan galaxias primigenias deformadas y brillantes.",
        "Esta fascinante era oscura de enormes fusiones construyó grandes galaxias.",
        "Una colisión gigante notable es Arp doscientos noventa y nueve.",
        "Es un espectacular sistema interactuante donde ocurren múltiples explosiones supernovas.",
        "El inmenso choque comprimió muchísimo gas, formando miles de estrellas.",
        "Tantas estrellas masivas mueren muy rápido formando grandes agujeros negros.",
        "El estudio minucioso de Arp revela muchos secretos del universo.",
        "Cada nueva colisión descubierta aporta piezas al gran rompecabezas cósmico.",
        "Científicos analizan minuciosamente la increíble luz antigua de esos choques.",
        "El enorme legado visual nos ayuda a entender nuestra historia.",
        "Somos el inmenso resultado directo de infinitas fusiones espaciales antiguas."
      ]
    ],
    // Topic D: que galaxias estan proximas a colisionar?
    [
      [
        "La majestuosa Vía Láctea y Andrómeda están inexorablemente acercándose ahora.",
        "Estas dos grandes y masivas galaxias espirales gigantes se fusionarán.",
        "Actualmente viajan a cientos de kilómetros por cada segundo transcurrido.",
        "La grandiosa colisión cósmica ocurrirá en cuatro mil millones de años.",
        "Nuestro Sol brillará intensamente cuando comience este monumental choque galáctico.",
        "Desde la antigua Tierra, Andrómeda dominará lentamente el cielo nocturno.",
        "Veremos nubes cósmicas brillantes y millones de nuevas estrellas nacer.",
        "Las hermosas bandas espirales de ambas galaxias se deformarán drásticamente.",
        "Eventualmente, nuestros enormes agujeros negros centrales colisionarán liberando inmensa energía.",
        "Nacerá una gigantesca y rojiza galaxia elíptica llamada Lactómeda futura.",
        "Esta grandiosa nueva galaxia será el gigantesco hogar de todos.",
        "El hermoso Sol será arrojado hacia los remotos confines galácticos.",
        "Quizás la Tierra y todo nuestro sistema solar sobreviva intacto.",
        "Este titánico y gran evento cósmico es absolutamente inevitable siempre.",
        "La inmensa fuerza gravitacional de ambas galaxias garantiza este destino."
      ],
      [
        "Además de Andrómeda, otras inmensas colisiones galácticas gigantes se avecinan.",
        "Nuestra Vía Láctea colisionará primero con la Gran Nube Magallánica.",
        "Esta pequeña y brillante galaxia satélite espiral impactará nuestro disco.",
        "Ocurrirá pronto en unos breves dos mil millones de años.",
        "El inmenso choque masivo activará intensamente el tranquilo agujero negro.",
        "Emitirá enormes e increíbles cantidades letales de poderosa radiación cósmica.",
        "También nuestra galaxia cambiará ligeramente su hermosa forma de disco.",
        "Lejos de nosotros, numerosas galaxias masivas de Virgo también chocarán.",
        "El enorme y denso Cúmulo de Virgo atrae innumerables galaxias.",
        "Las increíbles colisiones múltiples seguirán formando colosales galaxias elípticas rojas.",
        "Los asombrosos cálculos precisos informáticos predicen todas estas colosales fusiones.",
        "Supercomputadoras modelan pacientemente la futura e increíble ruta de galaxias.",
        "El asombroso destino final del inmenso universo está sellado definitivamente.",
        "Las hermosas agrupaciones estelares seguirán consolidándose en inmensas estructuras gigantes.",
        "En un futuro lejano, solo existirán escasas galaxias súper masivas."
      ],
      [
        "Observar pacientemente el inmenso firmamento anticipa grandiosos eventos astronómicos lejanos.",
        "Existen galaxias gemelas interactuando silenciosamente en los confines del universo.",
        "El asombroso par galáctico NGC cuatro cinco seis está cerca.",
        "Ellas están irremediablemente cayendo hacia un inmenso y destructivo abrazo.",
        "Cada siglo cósmico sus hermosos bordes luminosos se acercan más.",
        "Las predicciones de la maravillosa astrofísica son grandiosas matemáticas infalibles.",
        "Masa, increíble velocidad y oscura distancia dictan cada colisión próxima.",
        "La misteriosa materia oscura inmensamente empuja estas monumentales galaxias gigantes.",
        "Sin este inmenso manto invisible, los asombrosos impactos serían menores.",
        "Científicos calculan majestuosamente las invisibles órbitas en enormes redes espaciales.",
        "El inmenso mapa cósmico local revela majestuosamente fuertes flujos gravitacionales.",
        "Todos estos asombrosos flujos cósmicos apuntan hacia el Atractor misterioso.",
        "Millones de galaxias grandes fluyen silenciosamente hacia ese destino enorme.",
        "El espectacular universo estelar es un asombroso lienzo vibrante vivo.",
        "Las futuras colisiones masivas garantizan constante asombrosa evolución del cosmos."
      ]
    ],
    // Topic E: Los misterios del choque de galaxias
    [
      [
        "Uno de los inmensos misterios galácticos es la materia oscura.",
        "Durante una brutal colisión galáctica gigante, ¿qué sucede con ella?",
        "Las grandes estrellas y brillante gas galáctico chocan creando fricción.",
        "Pero curiosamente la vasta materia oscura parece simplemente atravesarse silenciosamente.",
        "Este grandioso e increíble fenómeno fue observado en Cúmulo Bala.",
        "El increíble impacto separó limpiamente la materia visible de oscura.",
        "Esta enorme asombrosa separación prueba que la materia oscura existe.",
        "Comprender su misterioso enorme comportamiento en choques es verdaderamente vital.",
        "Otro inmenso misterio galáctico es el comportamiento de los agujeros.",
        "Cuando dos agujeros súper masivos chocan, emiten grandiosas ondas gravitacionales.",
        "Estas maravillosas inmensas ondas invisibles del espacio viajan velozmente siempre.",
        "Fueron asombrosamente predichas teóricamente hace años por el brillante Einstein.",
        "Detectarlas directamente ha revolucionado verdaderamente la increíble y asombrosa astrofísica.",
        "Los gigantes telescopios gravitacionales ahora escuchan emocionados estos maravillosos ecos.",
        "Aún desconocemos muchísimos maravillosos secretos sobre estas asombrosas colisiones extremas."
      ],
      [
        "También nos intriga enormemente el repentino apagado estelar en galaxias.",
        "Tras una asombrosa y gigantesca colisión, la formación estelar muere.",
        "La gran galaxia elíptica roja queda completamente muerta y estéril.",
        "¿Por qué se pierde repentinamente todo el valioso gas formador?",
        "Científicos brillantes creen que enormes agujeros negros soplan el gas.",
        "La increíble energía radiante central expulsa toda la materia interestelar.",
        "Estos inmensos y súper potentes vientos galácticos son un misterio.",
        "Observar inmensas galaxias lejanas interactuando aporta asombrosas pistas muy valiosas.",
        "Además, la misteriosa formación de extrañas galaxias anulares resulta fascinante.",
        "No todas las masivas colisiones gigantes terminan destruyendo ambos núcleos.",
        "A veces la increíble y brutal física genera hermosos patrones.",
        "Las asombrosas inmensas simulaciones por computadora replican estos eventos gigantescos.",
        "Sin embargo, el increíble universo real siempre nos sorprende majestuosamente.",
        "La asombrosa infinita complejidad de millones de estrellas es simplemente.",
        "Seguimos descifrando con paciencia y maravilla este inmenso rompecabezas de creación."
      ],
      [
        "Finalmente, el gran inmenso misterio último involucra el espacio absoluto.",
        "¿Hacia dónde evoluciona este asombroso universo lleno de continuas colisiones?",
        "Si todas las grandes galaxias se fusionan repetidamente, ¿qué quedará?",
        "El enigmático futuro distante cósmico parece increíblemente oscuro y gigantesco.",
        "Pero cada asombrosa colisión galáctica siempre esconde hermosas y grandes.",
        "Nuevos misteriosos inmensos elementos químicos podrían crearse en estos choques.",
        "Mundos completamente asombrosos y exóticos nacen de inmensa destrucción galáctica.",
        "La gran destrucción estelar masiva es siempre asombrosamente muy creativa.",
        "Observar hermosas y maravillosas galaxias colisionar es admirar el tiempo.",
        "Somos inmensamente afortunados de presenciar pacientemente este gran proceso espectacular.",
        "Los grandes valientes cadetes espaciales tienen un asombroso universo inmenso.",
        "Nuevos asombrosos y maravillosos misterios matemáticos aguardan ser descubiertos pronto.",
        "La inmensa astrofísica espacial moderna continúa investigando la infinita inmensidad.",
        "El asombroso estudio de colisiones galácticas nunca jamás terminará sorprendiéndonos.",
        "Las maravillosas inmensas galaxias continuarán su brillante baile asombroso eternamente."
      ]
    ]
  ];
  return texts[topicIndex][partIndex];
}

const titles = [
  ["Atracción Inevitable", "Baile Cósmico", "El Cúmulo Galáctico"],
  ["El Impacto Caótico", "Nuevas Estrellas", "Galaxias Elípticas"],
  ["Las Antenas", "El Centaurus A", "Galaxias Antiguas"],
  ["Nuestra Lactómeda", "Magallanes", "Destino Atractor"],
  ["Materia Oscura", "Ondas Gravitacionales", "El Destino Final"]
];

const vids = [
  "https://drive.google.com/drive/folders/1VBXxxepMp_ejR09lLbmdQ0ty3lwpy5cd?usp=drive_link",
  "https://drive.google.com/drive/folders/1VBXxxepMp_ejR09lLbmdQ0ty3lwpy5cd?usp=drive_link",
  "https://drive.google.com/drive/folders/1VBXxxepMp_ejR09lLbmdQ0ty3lwpy5cd?usp=drive_link"
];

let sections = [];
let idx = 0;
for (let t = 0; t < 5; t++) {
  for (let p = 0; p < 3; p++) {
    sections.push({
      id: `colisiones_${t}_${p}`,
      title: titles[t][p],
      text: getSectionText(t, p),
      video: idx < 3 ? vids[idx] : "",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200",
      imgCaption: "Colisiones masivas galácticas.",
      style: p === 0 ? "highlight" : "normal"
    });
    idx++;
  }
}

const newCourse = {
  id: "colisiones_estelares",
  order: 10,
  titleEn: "Stellar Collisions",
  titleEs: "Colisiones Estelares",
  badge: "Galaxy Crusher",
  badgeEs: "Colisionador Cósmico",
  badgeImage: "/assets/course_colisiones.png",
  color: "#9933ff",
  contentEs: {
    sections: sections,
    bibliography: [
      "NASA (2024). Galaxy Collisions. Space Deep Observation.",
      "Hubble Telescope (2020). The Antenae Galaxies."
    ]
  },
  quizEs: [
    {
      q: "¿Qué sucede con la mayoría de las estrellas durante un choque de galaxias?",
      options: ["Chocan directamente y explotan", "No chocan debido al inmenso vacío", "Se convierten en agujeros negros"],
      a: 1
    },
    {
      q: "¿Cómo se llama la futura galaxia formada por la Vía Láctea y Andrómeda?",
      options: ["Andrómeda II", "Magallanes", "Lactómeda"],
      a: 2
    },
    {
      q: "¿Qué misterioso componente parece no interactuar ni friccionar durante el choque galáctico?",
      options: ["El polvo estelar", "La Materia Oscura", "El Hidrógeno"],
      a: 1
    }
  ],
  quiz: {
    questionsEs: [
      {
        question: "¿Qué es la materia oscura en el choque galáctico?",
        options: ["Una sombra de las estrellas", "Masa invisible que cruza intacta", "El gas que explota", "Una ilusión óptica"],
        correctIndex: 1,
        explanation: "La materia oscura es invisible y parece cruzar sin interactuar durante los choques."
      },
      {
        question: "¿Por qué nacen nuevas estrellas en los choques?",
        options: ["Porque el polvo se comprime violentamente", "Porque las estrellas viejas se rompen", "Porque llegan de otros universos", "No nacen estrellas"],
        correctIndex: 0,
        explanation: "La fricción y compresión del gas y polvo desata el nacimiento estelar."
      },
      {
        question: "¿Qué tipo de galaxia resulta comúnmente tras un gran choque?",
        options: ["Galaxia Espiral", "Galaxia Enana", "Galaxia Elíptica", "Un agujero negro gigante"],
        correctIndex: 2,
        explanation: "Suelen formar masivas galaxias elípticas rojas."
      },
      {
        question: "¿Qué son las ondas gravitacionales?",
        options: ["Luz verde espacial", "Sonido en el espacio", "Ondulaciones del espacio-tiempo por agujeros negros masivos", "Olas de plasma solar"],
        correctIndex: 2,
        explanation: "Son ondulaciones del tejido espacial producidas por el choque de masas enormes."
      },
      {
        question: "¿Cuándo chocará nuestra galaxia con Andrómeda?",
        options: ["En un millón de años", "Mañana", "En cuatro mil millones de años", "Ya chocó ayer"],
        correctIndex: 2,
        explanation: "El evento está proyectado para dentro de cuatro mil millones de años."
      }
    ]
  }
};

jsData = jsData.filter(m => m.id !== 'colisiones_estelares');
jsData.push(newCourse);

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('Colisiones course generated successfully!');
