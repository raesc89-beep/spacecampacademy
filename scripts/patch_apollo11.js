/**
 * patch_apollo11.js — Expands apollo11_m1 through apollo11_m6 to 15 paragraphs each
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function patchTextAndQuiz(src, moduleId, newText, newQuiz) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const nextMod = src.indexOf(`"id": "`, modStart + moduleId.length + 10);
  const modEnd = nextMod === -1 ? src.length : nextMod;
  let chunk = src.slice(modStart, modEnd);

  // Replace text[]
  const textKeyIdx = chunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT: ${moduleId}`); return src; }
  const arrOpen = chunk.indexOf('[', textKeyIdx);
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  src = src.slice(0, modStart + arrOpen) + JSON.stringify(newText, null, 10) + src.slice(modStart + i + 1);

  // Re-locate after text replacement
  const modStart2 = src.indexOf(`"id": "${moduleId}"`);
  const nextMod2 = src.indexOf(`"id": "`, modStart2 + moduleId.length + 10);
  const modEnd2 = nextMod2 === -1 ? src.length : nextMod2;
  chunk = src.slice(modStart2, modEnd2);

  // Replace or insert quizEs
  const quizKeyIdx = chunk.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qOpen = chunk.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qOpen;
    while (j < chunk.length) {
      if (chunk[j] === '[') d2++;
      else if (chunk[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    src = src.slice(0, modStart2 + qOpen) + JSON.stringify(newQuiz, null, 6) + src.slice(modStart2 + j + 1);
  } else {
    const contentEsIdx = chunk.indexOf('"contentEs"');
    const cOpen = chunk.indexOf('{', contentEsIdx);
    let d3 = 0, k = cOpen;
    while (k < chunk.length) {
      if (chunk[k] === '{') d3++;
      else if (chunk[k] === '}') { d3--; if (d3 === 0) break; }
      k++;
    }
    const insertAt = modStart2 + k + 1;
    src = src.slice(0, insertAt) + ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6) + src.slice(insertAt);
  }

  console.log(`✅ Patched ${moduleId}`);
  return src;
}

// ══════════════════════════════════════════════════════════
// APOLLO 11 — 6 modules
// ══════════════════════════════════════════════════════════
const APOLLO11 = {
  apollo11_m1: {
    text: [
      "El 16 de julio de 1969, la misión Apollo 11 despegó de la plataforma 39A del Centro Espacial Kennedy en Florida. A bordo iban tres astronautas: Neil Armstrong, Buzz Aldrin y Michael Collins. Era la primera vez que la humanidad intentaría poner un pie en la Luna.",
      "El cohete Saturn V que los llevó al espacio era el más poderoso jamás construido hasta ese momento. Medía 111 metros de altura, casi como un edificio de 36 pisos, y generaba una fuerza de empuje de 34 millones de newtons en el despegue, suficiente para mover 3,000 elefantes.",
      "El viaje de la Tierra a la Luna duró aproximadamente tres días. Durante ese tiempo, los astronautas navegaron por el espacio a una velocidad promedio de unos 3,900 kilómetros por hora, recorriendo una distancia de cerca de 384,000 kilómetros.",
      "La misión tenía tres partes clave: el Módulo de Mando 'Columbia', donde viajaban los tres astronautas; el Módulo de Servicio, que contenía el motor principal y los suministros; y el Módulo Lunar 'Eagle', que descendería a la superficie de la Luna.",
      "El 19 de julio, la nave entró en órbita lunar. Esta maniobra requería encender el motor en el momento exacto para que la gravedad lunar los capturara sin que salieran disparados hacia el espacio o chocaran contra la superficie.",
      "Michael Collins se quedó orbitando la Luna en el Módulo de Mando mientras Armstrong y Aldrin descendían en el Eagle. Fue una tarea solitaria pero absolutamente esencial: él era el piloto que aseguraría el regreso a casa.",
      "El descenso hacia la Luna fue lleno de tensión. A unos 9 kilómetros de altura, la computadora de a bordo comenzó a lanzar alarmas de error. Los ingenieros en Houston analizaron el código en segundos y determinaron que era seguro continuar.",
      "A las 4:17 p.m. del 20 de julio de 1969 (hora del Este de EE.UU.), el Eagle tocó la superficie lunar en el Mar de la Tranquilidad. Armstrong transmitió a la Tierra las palabras más famosas de la exploración espacial: 'The Eagle has landed' ('El Águila ha aterrizado').",
      "Seis horas y media después del alunizaje, Neil Armstrong abrió la escotilla y descendió por la escalerilla. Al poner el pie izquierdo en el suelo lunar, pronunció su famosa frase: 'Este es un pequeño paso para el hombre, un salto gigante para la humanidad'.",
      "La Luna tiene una gravedad que es solo un sexto de la de la Tierra. Esto significa que si pesas 30 kilos en la Tierra, en la Luna pesarías apenas 5 kilos. Armstrong y Aldrin podían saltar mucho más alto de lo que jamás podrían en casa.",
      "Los trajes espaciales que usaban Armstrong y Aldrin eran máquinas de supervivencia con 21 capas de distintos materiales. Mantenían la presión interna, regulaban la temperatura entre -120°C y +120°C, y suministraban oxígeno para respirar en el vacío lunar.",
      "Buzz Aldrin llegó a la superficie poco después que Armstrong. Los dos astronautas pasaron unas dos horas y media en la superficie, plantaron la bandera estadounidense, recogieron casi 22 kilos de rocas lunares y colocaron instrumentos científicos.",
      "Una de las primeras cosas que hicieron fue colocar un sismómetro para medir los temblores lunares (llamados 'moonquakes') y un reflector láser. Ese reflector todavía funciona hoy: científicos de la Tierra le disparan rayos láser y miden cuánto tarda en rebotar.",
      "El despegue desde la Luna fue uno de los momentos más críticos de toda la misión. El motor del Eagle solo tenía una oportunidad de encenderse; si fallaba, los astronautas quedarían atrapados para siempre en la Luna. Pero funcionó a la perfección.",
      "La Apollo 11 regresó a la Tierra el 24 de julio de 1969, amerizando en el Océano Pacífico. Los tres astronautas fueron colocados en cuarentena durante 21 días por precaución ante posibles microorganismos lunares. Hoy, el 20 de julio se celebra el Día de la Luna en todo el mundo."
    ],
    quiz: [
      { q: "¿Cuánto duró aproximadamente el viaje de la Tierra a la Luna en la Apollo 11?", options: ["1 día","3 días","1 semana","2 semanas"], a: 1 },
      { q: "¿Cuál era el nombre del Módulo Lunar de la Apollo 11?", options: ["Columbia","Eagle","Phoenix","Challenger"], a: 1 },
      { q: "¿Dónde amerizó la Apollo 11 al regresar a la Tierra?", options: ["Océano Atlántico","Mar Mediterráneo","Océano Pacífico","Golfo de México"], a: 2 },
      { q: "¿Cuánto pesa una persona en la Luna si pesa 30 kg en la Tierra?", options: ["30 kg","15 kg","10 kg","5 kg"], a: 3 },
      { q: "¿Cuántas capas tenía el traje espacial de los astronautas de la Apollo 11?", options: ["5","10","21","35"], a: 2 }
    ]
  },
  apollo11_m2: {
    text: [
      "La misión Apollo 11 no hubiera sido posible sin el trabajo de miles de científicos, ingenieros y técnicos que laboraron durante años para hacerla realidad. Se estima que más de 400,000 personas contribuyeron directa o indirectamente al programa Apollo.",
      "El presidente John F. Kennedy fue quien lanzó el desafío en 1961: 'Antes de que termine esta década, pondremos un hombre en la Luna y lo traeremos de vuelta sano y salvo'. Era un objetivo audaz cuando aún no había tecnología suficiente para lograrlo.",
      "La carrera espacial entre los Estados Unidos y la Unión Soviética fue el motor que impulsó el programa Apollo. Los soviéticos habían lanzado el primer satélite artificial (Sputnik) en 1957 y enviado al primer ser humano al espacio (Yuri Gagarin) en 1961.",
      "El programa Mercury fue el primero de la NASA para enviar estadounidenses al espacio. Sus cápsulas solo podían llevar un astronauta y duraban pocos minutos u horas en órbita. Era el primer peldaño de la escalera hacia la Luna.",
      "El programa Gemini le siguió. Sus cápsulas llevaban dos astronautas y las misiones podían durar varios días. Aquí los astronautas aprendieron a hacer caminatas espaciales, a unir naves en el espacio (rendezvous) y a navegar con precisión.",
      "El programa Apollo fue diseñado específicamente para llegar a la Luna. Constaba de tres naves: el Módulo de Mando (CM), el Módulo de Servicio (SM) y el Módulo Lunar (LM). La estrategia elegida fue la 'cita en órbita lunar': dos astronautas bajan a la Luna y uno se queda orbitando.",
      "El cohete Saturn V fue el vehículo de lanzamiento del Apollo. Su primera etapa tenía cinco motores F-1, cada uno quemando 2,700 litros de combustible por segundo. Producía más energía que todos los ríos de América del Norte combinados.",
      "La tragedia del Apollo 1 en enero de 1967 supuso un duro golpe para el programa. Un incendio en la cabina durante un ensayo en tierra mató a los tres astronautas: Gus Grissom, Ed White y Roger Chaffee. La NASA rediseñó completamente la cápsula.",
      "El Apollo 8 fue la primera misión que llevó humanos a la órbita lunar en diciembre de 1968. El Apollo 9 probó el Módulo Lunar en órbita terrestre. El Apollo 10 fue el ensayo general, llegando a solo 15 kilómetros de la superficie sin aterrizar.",
      "Los astronautas del Apollo 11 fueron seleccionados cuidadosamente. Neil Armstrong era piloto de pruebas y había volado en la misión Gemini 8. Buzz Aldrin tenía un doctorado en rendezvous orbital. Michael Collins era un experto piloto de caza y de naves espaciales.",
      "La computadora del Módulo de Mando (AGC) tenía menos potencia que la calculadora de bolsillo más sencilla de hoy. Sin embargo, fue diseñada con tal precisión que guió la nave con exactitud milimétrica a través de 384,000 kilómetros de espacio vacío.",
      "El Módulo Lunar tenía que cumplir una tarea increíblemente precisa: descender suavemente hasta la superficie lunar, compensar cualquier obstáculo en tiempo real, y luego volver a despegar y encontrarse con el Módulo de Mando en órbita.",
      "Los astronautas entrenaron durante años para la misión. Practicaron en simuladores que reproducían el vuelo, estudiaron geología lunar para saber qué rocas recoger, y aprendieron a moverse con trajes espaciales en piscinas que simulaban la microgravedad.",
      "La NASA también construyó una réplica exacta de la Luna en tierra para que los astronautas la estudiaran. Los geólogos marcaron en mapas detallados todos los cráteres, montañas y llanuras de la región donde iba a aterrizar el Eagle.",
      "El legado del programa Apollo va mucho más allá de poner el pie en la Luna. Sus desarrollos tecnológicos dieron lugar a los primeros microprocesadores, los sistemas de purificación de agua modernos, los trajes de aislamiento térmico, las cámaras digitales de alta resolución y muchos otros avances que usamos a diario."
    ],
    quiz: [
      { q: "¿Quién lanzó el desafío de llegar a la Luna 'antes de que termine la década'?", options: ["Richard Nixon","John F. Kennedy","Dwight Eisenhower","Lyndon Johnson"], a: 1 },
      { q: "¿Cuál fue el primer programa espacial de la NASA para enviar humanos al espacio?", options: ["Gemini","Apollo","Mercury","Artemis"], a: 2 },
      { q: "¿Qué tragedia afectó al programa Apollo en enero de 1967?", options: ["El Saturn V explotó en pruebas","Un incendio mató a los tres astronautas del Apollo 1","La Unión Soviética llegó primero a la Luna","Un huracán destruyó el Centro Espacial"], a: 1 },
      { q: "¿Cuánto combustible quemaba por segundo cada motor F-1 del Saturn V?", options: ["270 litros","2,700 litros","27,000 litros","270,000 litros"], a: 1 },
      { q: "¿Qué doctorado tenía Buzz Aldrin?", options: ["Física cuántica","Rendezvous orbital","Geología lunar","Ingeniería aeronáutica"], a: 1 }
    ]
  },
  apollo11_m3: {
    text: [
      "La superficie lunar es un lugar radicalmente diferente a cualquier lugar de la Tierra. No hay atmósfera, lo que significa que no hay viento, no hay sonido, no hay clima y no hay protección contra la radiación solar o los micrometeoritos.",
      "El suelo de la Luna está cubierto por una capa fina de polvo llamada regolito lunar. Se formó durante miles de millones de años por el impacto de meteoritos que molieron las rocas hasta hacerlas polvo extremadamente fino. Este polvo es abrasivo como cristal molido y se pega a todo.",
      "La temperatura en la superficie lunar varía de forma extrema. Durante el día lunar (que dura unas dos semanas terrestres), la temperatura puede alcanzar los 127°C. Durante la noche lunar, puede bajar hasta -173°C. Los astronautas tenían que protegerse de estos extremos.",
      "Armstrong y Aldrin alunizaron en el Mar de la Tranquilidad, una llanura relativamente plana en el hemisferio norte de la Luna. 'Mar' es el nombre que los antiguos astrónomosos daban a estas grandes llanuras oscuras, aunque nunca han tenido agua.",
      "Una de las primeras cosas que notaron los astronautas fue lo diferente que es caminar en la Luna. Con solo un sexto de la gravedad terrestre, cada paso podía lanzarlos hacia arriba. Aprendieron a adoptar un ritmo saltarín, casi como canguros.",
      "Buzz Aldrin describió la vista desde la superficie lunar como una 'magnífica desolación'. El cielo era completamente negro, sin estrellas visibles durante el día porque la luz solar era demasiado intensa. La Tierra brillaba como una esfera azul y blanca suspendida en el cielo oscuro.",
      "Los astronautas recogieron 21.7 kilogramos de rocas y suelo lunar. Estas muestras se han estudiado durante más de 50 años y han revelado la historia geológica de la Luna. Algunas rocas tienen más de 4,000 millones de años, más viejas que la mayoría de las rocas de la Tierra.",
      "Los científicos creen que la Luna se formó hace unos 4,500 millones de años cuando un objeto del tamaño de Marte chocó contra la Tierra primitiva. El material desprendido por el impacto se unió en órbita y formó la Luna. Esta teoría se llama la Hipótesis del Gran Impacto.",
      "La Luna no tiene campo magnético como la Tierra. Por eso no tiene una 'magnetósfera' que la proteja del viento solar. Los astronautas eran vulnerables a ráfagas de partículas energéticas del Sol, pero la misión fue planificada para minimizar este riesgo.",
      "Los cráteres de la Luna fueron creados por impactos de meteoritos a lo largo de miles de millones de años. Como no hay erosión (ni viento, ni agua), los cráteres se conservan perfectamente. El más grande visible desde la Tierra, el cráter Tycho, tiene 85 kilómetros de diámetro.",
      "Armstrong y Aldrin colocaron un panel de espejos especiales (retroreflectores) en la superficie. Los científicos aún hoy disparan rayos láser desde la Tierra y miden el tiempo que tardan en rebotar. Así sabemos que la Luna se aleja de la Tierra a razón de 3.8 centímetros por año.",
      "El sismómetro colocado por la Apollo 11 detectó que la Luna tiene 'lunarremotos'. Son causados por las fuerzas de marea de la Tierra y por la contracción y expansión de las rocas con los cambios de temperatura. La Luna geológicamente aún está viva.",
      "Las rocas lunares son distintas de las de la Tierra en formas importantes. No tienen agua atrapada en su estructura cristalina. Algunas son basaltos volcánicos muy similares a los de la Tierra, pero otras son brechas formadas por impactos, únicas de la Luna.",
      "Los astronautas plantaron la bandera de Estados Unidos en la superficie lunar. Sin embargo, hay un debate histórico sobre si la bandera sigue en pie hoy. Se cree que las corrientes de gas del motor del Eagle al despegar la derribaron. Las imágenes de satélite actuales no tienen suficiente resolución para confirmarlo.",
      "El legado científico de las muestras lunares es enorme. Han permitido entender cómo se formó el sistema solar, comprobar que la Luna no tiene vida, y desarrollar técnicas de datación geológica. Hoy, 842 kilos de rocas lunares traídas por las seis misiones Apollo que aterrizaron siguen siendo estudiadas en laboratorios de todo el mundo."
    ],
    quiz: [
      { q: "¿Cómo se llama la capa de polvo que cubre la superficie de la Luna?", options: ["Regolito","Basalto","Sedimento","Ceniza"], a: 0 },
      { q: "¿A qué temperatura puede llegar la superficie lunar durante el día?", options: ["-173°C","0°C","27°C","127°C"], a: 3 },
      { q: "¿Cómo se llama la teoría sobre la formación de la Luna?", options: ["Hipótesis de la Captura","Hipótesis del Gran Impacto","Teoría de la Fisión","Teoría de la Acreción"], a: 1 },
      { q: "¿Cuántos kilogramos de rocas recogieron Armstrong y Aldrin?", options: ["5 kg","11.7 kg","21.7 kg","42 kg"], a: 2 },
      { q: "¿A qué ritmo se aleja la Luna de la Tierra cada año?", options: ["0.38 cm","3.8 cm","38 cm","3.8 m"], a: 1 }
    ]
  },
  apollo11_m4: {
    text: [
      "El regreso a la Tierra desde la Luna fue tan complicado como el viaje de ida, si no más. El Módulo Lunar debía despegar de la superficie con un motor único, sin posibilidad de fallo, y encontrar al Columbia que orbitaba a 110 kilómetros de altura.",
      "El motor de ascenso del Módulo Lunar se encendió perfectamente el 21 de julio de 1969. Armstrong y Aldrin subieron a bordo del Eagle, cerraron la escotilla y, con un potente rugido silencioso en el vacío, el módulo se disparó hacia el cielo negro de la Luna.",
      "La fase de rendezvous (encuentro en órbita) requería cálculos extraordinariamente precisos. El Eagle y el Columbia tenían que estar en el lugar correcto al mismo tiempo. Si hubiera algún error de cálculo, los dos módulos nunca se encontrarían.",
      "Michael Collins en el Columbia había estado orbitando la Luna solo durante 21 horas y media, completando 27 órbitas. Estuvo fuera de toda comunicación durante casi 48 minutos en cada órbita al pasar por el lado oscuro de la Luna.",
      "Una vez que el Eagle y el Columbia se unieron, Armstrong y Aldrin transfirieron las rocas lunares y los datos científicos, y luego pasaron al Módulo de Mando. El Eagle fue liberado y quedó en órbita lunar hasta estrellarse eventualmente contra la superficie.",
      "Para regresar a la Tierra, el motor principal del Módulo de Servicio debía encenderse en el momento exacto detrás de la Luna, sin ninguna posibilidad de corrección en tiempo real desde Houston. Funcionó a la perfección.",
      "El viaje de regreso a la Tierra también duró tres días. Los astronautas descansaron, comieron, revisaron los sistemas de la nave y hablaron con Houston sobre sus experiencias extraordinarias. También hablaron con sus familias y recibieron mensajes de todo el mundo.",
      "Al acercarse a la Tierra, la nave entró en la atmósfera a una velocidad de casi 40,000 kilómetros por hora. El escudo térmico de la cápsula se calentó hasta 2,800°C, creando una envolvente de plasma que bloqueó todas las comunicaciones durante varios minutos.",
      "Los paracaídas se desplegaron a 7.5 kilómetros de altitud, primero tres pequeños drogue parachutes para estabilizar la cápsula, luego tres enormes paracaídas principales de 25 metros de diámetro cada uno para desacelerar suavemente la nave.",
      "La cápsula Columbia amerizó en el Océano Pacífico el 24 de julio de 1969 a las 12:50 p.m. hora del Este. El portaaviones USS Hornet esperaba en las coordenadas exactas para recuperar a los astronautas y la preciosa carga de rocas lunares.",
      "Por precaución científica, los tres astronautas fueron trasladados inmediatamente a una unidad de cuarentena móvil. Los científicos no sabían si podría haber microorganismos lunares peligrosos en su cuerpo o en las muestras. La cuarentena duró 21 días.",
      "En la cuarentena, los astronautas fueron examinados médicamente cada día. Todas las rocas lunares también fueron analizadas en busca de vida. No se encontró nada. Las misiones Apollo posteriores redujeron el período de cuarentena y eventualmente lo eliminaron.",
      "El presidente Nixon los visitó en el barco mientras seguían en cuarentena, hablando con ellos a través de un vidrio. Les dijo que habían sido testigos de 'la mayor semana desde la Creación'. Fue la primera vez en la historia que un presidente americano saludó a astronautas recién regresados de otro mundo.",
      "Después de la cuarentena, Armstrong, Aldrin y Collins realizaron una gira mundial llamada 'Giant Leap Tour' visitando 25 países en 45 días. En todas partes fueron recibidos como héroes de la humanidad, no solo de los Estados Unidos.",
      "Hoy, las rocas lunares de la Apollo 11 están guardadas en el Centro Espacial Johnson en Houston. Una pequeña muestra está en exhibición en el Museo Nacional del Aire y el Espacio en Washington D.C., donde puedes tocarla con tu propia mano. Cada año, millones de personas la visitan."
    ],
    quiz: [
      { q: "¿Cuántas horas orbitó Michael Collins la Luna solo en el Columbia?", options: ["8 horas","21.5 horas","48 horas","72 horas"], a: 1 },
      { q: "¿A qué velocidad entró la cápsula Columbia en la atmósfera terrestre?", options: ["5,000 km/h","15,000 km/h","40,000 km/h","100,000 km/h"], a: 2 },
      { q: "¿Cuántos días duró la cuarentena de los astronautas tras regresar?", options: ["3 días","7 días","14 días","21 días"], a: 3 },
      { q: "¿En qué barco fue recuperada la cápsula Columbia?", options: ["USS Enterprise","USS Hornet","USS Kennedy","USS Apollo"], a: 1 },
      { q: "¿Cómo se llamó la gira mundial que hicieron los tres astronautas después de la cuarentena?", options: ["Moon Tour","World Peace Tour","Giant Leap Tour","Apollo World Tour"], a: 2 }
    ]
  },
  apollo11_m5: {
    text: [
      "La misión Apollo 11 fue un triunfo de la ingeniería humana, pero también fue una lección sobre cómo trabajar en equipo bajo presión extrema. Cada decisión podía significar la diferencia entre el éxito y el desastre.",
      "El Centro de Control de Misión en Houston, Texas, fue el cerebro de la operación en tierra. Cientos de ingenieros y científicos trabajaban en turnos de 24 horas, cada uno monitoreando un sistema específico de la nave. Cualquiera de ellos podía detener la misión si detectaba un problema crítico.",
      "El director de vuelo Gene Kranz se hizo famoso por su chaleco blanco y su lema: 'Failure is not an option' (El fracaso no es una opción). Él coordinaba a todos los equipos y tomaba las decisiones finales en los momentos críticos.",
      "Las alarmas 1202 y 1201 que sonaron durante el descenso lunar fueron causadas porque la computadora estaba recibiendo más datos de los que podía procesar. El programador Jack Garman, de solo 24 años, reconoció el código en segundos y declaró que era seguro continuar.",
      "Margaret Hamilton dirigió el equipo que programó el software de la computadora de navegación del Apollo. Su trabajo fue tan preciso y completo que el software no tuvo ningún fallo durante todas las misiones Apollo. El término 'software engineering' fue popularizado precisamente gracias a su trabajo.",
      "La NASA también tenía preparados planes de contingencia para casi todos los escenarios posibles. Si el motor del Módulo Lunar fallaba, si había una grieta en el casco, si los astronautas enfermaban gravemente... todo estaba planificado con alternativas.",
      "La comida en el Apollo 11 era muy diferente a la comida normal. Los alimentos eran liofilizados (deshidratados por congelación) o en forma de pasta dentro de tubos. Los astronautas tenían que añadir agua para rehidratarlos. Tenían opciones como pollo con salsa, pudines y jugos de frutas.",
      "Dormir en el espacio también fue un desafío. Con la microgravedad lunar (en el módulo de mando en órbita), los astronautas podían flotar si no se ataban. Dormían en sacos de dormir especiales atados a los asientos, en turnos para que siempre hubiera alguien vigilando los instrumentos.",
      "La higiene personal en el Apollo 11 era limitada. No había ducha. Los astronautas usaban toallas húmedas especiales para limpiarse. Ir al baño también requería bolsas especiales selladas para evitar que los desechos flotaran por la cápsula en microgravedad.",
      "Las comunicaciones entre los astronautas y Houston usaban una frecuencia de radio de alta frecuencia. La voz era comprimida y transmitida a través de 384,000 kilómetros de espacio. En la Tierra, gigantescas antenas de la Red de Espacio Profundo captaban las señales.",
      "La misión fue transmitida en televisión a todo el mundo. Se estima que más de 600 millones de personas vieron el alunizaje en vivo, la mayor audiencia de televisión de la historia hasta ese momento. Era el año 1969, cuando muchos hogares apenas tenían televisor.",
      "En América Latina y España, los medios de comunicación cubrieron ampliamente el evento. En muchos países, escuelas y plazas pusieron televisores en la calle para que todos pudieran verlo. Fue un momento de unión para toda la humanidad.",
      "La misión también tuvo su lado más humano. Los astronautas llevaron consigo objetos personales pequeños. Armstrong llevó un trozo de tela y una pieza de hélice del avión de los hermanos Wright, los pioneros de la aviación. Era un homenaje al primer vuelo de la historia.",
      "Buzz Aldrin llevó consigo una pequeña Biblia y los elementos para celebrar la comunión. En silencio, antes de que Armstrong bajara, Aldrin realizó una pequeña ceremonia personal de reflexión en la superficie lunar. Es un momento poco conocido pero profundamente humano.",
      "La misión Apollo 11 demostró que cuando los seres humanos trabajan juntos con determinación, recursos y conocimiento científico, somos capaces de lograr cosas que parecen imposibles. Esa lección es quizás su legado más importante para las generaciones futuras."
    ],
    quiz: [
      { q: "¿Quién dirigió el equipo que programó el software del Apollo 11?", options: ["Gene Kranz","Jack Garman","Margaret Hamilton","Wernher von Braun"], a: 2 },
      { q: "¿Cuántas personas aproximadamente vieron el alunizaje en televisión?", options: ["6 millones","60 millones","600 millones","6 mil millones"], a: 2 },
      { q: "¿Qué causaron las alarmas 1202 y 1201 durante el descenso?", options: ["Un fallo del motor","La computadora recibía más datos de los que podía procesar","Un error de navegación","Un problema con el combustible"], a: 1 },
      { q: "¿Qué objeto especial llevó Neil Armstrong como homenaje?", options: ["Una bandera lunar","Una foto de su familia","Un trozo del avión de los hermanos Wright","Una moneda de 1969"], a: 2 },
      { q: "¿Cómo era la comida de los astronautas en el Apollo 11?", options: ["Comida fresca de restaurante","Comida liofilizada y en tubos","Comida enlatada normal","Solo bebidas energéticas"], a: 1 }
    ]
  },
  apollo11_m6: {
    text: [
      "La misión Apollo 11 fue solo el comienzo. Entre 1969 y 1972, la NASA realizó seis aterrizajes lunares exitosos (Apollo 11, 12, 14, 15, 16 y 17), y solo uno que falló en llegar a la Luna (Apollo 13). En total, 12 seres humanos han caminado por la Luna.",
      "El Apollo 12 aterrizó con precisión a solo 163 metros del robot Surveyor 3, que había llegado a la Luna dos años antes sin tripulación. Los astronautas recuperaron partes de ese robot para estudiar los efectos del ambiente lunar en los materiales.",
      "La misión Apollo 13, en abril de 1970, tuvo un accidente dramático: un tanque de oxígeno explotó a mitad del camino a la Luna. Los tres astronautas (Jim Lovell, Jack Swigert y Fred Haise) usaron el Módulo Lunar como bote salvavidas y regresaron a la Tierra sanos y salvos después de rodear la Luna.",
      "El Apollo 15, 16 y 17 llevaron el Rover Lunar, un vehículo eléctrico que permitía a los astronautas alejarse varios kilómetros del módulo. Con su ayuda, exploraron terrenos más variados y recogieron muestras de lugares antes inalcanzables a pie.",
      "El geólogo Harrison Schmitt fue el último ser humano en bajar a la Luna, durante la misión Apollo 17 en diciembre de 1972. Fue también el primer científico profesional (no piloto de pruebas) en caminar sobre la superficie lunar.",
      "Las misiones Apollo recogieron en total 842 kilogramos de rocas y suelo lunar. Esas muestras todavía se analizan hoy con instrumentos modernos mucho más precisos que los de 1969. Cada nueva generación de científicos descubre cosas nuevas en ellas.",
      "Después del Apollo 17, la NASA canceló los tres vuelos lunares restantes (Apollo 18, 19 y 20) por recortes presupuestarios. Las naves y cohetes ya construidos se convirtieron en piezas de museo. Muchos astronautas entrenados para esas misiones nunca llegaron a la Luna.",
      "Desde 1972, ningún ser humano ha vuelto a la Luna. Durante más de 50 años, la Luna ha sido explorada solo por robots y sondas no tripuladas. Sin embargo, hay planes para regresar con el programa Artemis de la NASA.",
      "El programa Artemis tiene como objetivo llevar nuevamente humanos a la Luna, esta vez incluyendo a la primera mujer y a la primera persona de color en caminar sobre la superficie lunar. La NASA planea establecer una presencia permanente en la Luna como trampolín hacia Marte.",
      "China también tiene su propio programa lunar ambicioso. Su misión Chang'e 5 trajo muestras de la Luna a la Tierra en 2020, la primera vez desde 1976. China planea enviar astronautas a la Luna antes de 2030.",
      "La India logró en 2023 aterrizar su sonda Chandrayaan-3 en el polo sur lunar, una zona nunca antes explorada. Descubrió indicios de azufre y otros elementos en el suelo, y confirmó la presencia de agua en forma de hielo en los cráteres permanentemente en sombra.",
      "El hielo de agua en el polo sur de la Luna es extremadamente importante para las futuras misiones humanas. Se podría usar para fabricar agua potable para los astronautas, para generar oxígeno para respirar, y para producir hidrógeno y oxígeno líquido como combustible de cohetes.",
      "La experiencia del Apollo también transformó profundamente a los astronautas que caminaron en la Luna. Muchos describieron un cambio de perspectiva que llaman el 'Overview Effect' (efecto perspectiva): ver la Tierra desde la Luna les hizo sentir profundamente la fragilidad y la unidad de nuestro planeta.",
      "Buzz Aldrin, que murió en 2024, dedicó décadas a abogar por la exploración de Marte. Neil Armstrong fue más reservado pero nunca dejó de apoyar la exploración espacial. Michael Collins escribió libros inspiradores sobre sus experiencias y la visión de la Tierra desde el espacio.",
      "El Apollo 11 sigue siendo uno de los logros más grandes de la humanidad. Demostró que cuando el conocimiento científico, la tecnología y la voluntad humana se unen, somos capaces de alcanzar literalmente las estrellas. Para los niños de hoy, Marte podría ser lo que la Luna fue para la generación de 1969: el siguiente gran paso."
    ],
    quiz: [
      { q: "¿Cuántos seres humanos han caminado en total sobre la Luna?", options: ["3","6","12","24"], a: 2 },
      { q: "¿Qué accidente ocurrió en la misión Apollo 13?", options: ["Se perdió contacto con Houston","Explotó un tanque de oxígeno","El motor del Módulo Lunar falló","Los astronautas se perdieron en la Luna"], a: 1 },
      { q: "¿Cuál fue el total de kilogramos de rocas lunares traídas por todas las misiones Apollo?", options: ["22 kg","100 kg","380 kg","842 kg"], a: 3 },
      { q: "¿Qué programa de la NASA planea llevar humanos de regreso a la Luna?", options: ["Orion","Artemis","Mercury","Constellation"], a: 1 },
      { q: "¿Qué descubrió la sonda India Chandrayaan-3 en el polo sur lunar en 2023?", options: ["Vida microbiana","Oro y platino","Indicios de agua helada","Oxígeno libre"], a: 2 }
    ]
  }
};

for (const [moduleId, data] of Object.entries(APOLLO11)) {
  src = patchTextAndQuiz(src, moduleId, data.text, data.quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Apollo 11 (m1-m6) all patched!');
