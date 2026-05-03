const fs = require('fs');
const courseDataPath = 'lib/courseData.js';

const sections = [
  {
    id: "starwars_sec_1",
    title: "Módulo 1: La Métrica de Alcubierre y la Geometría del Corredor de Kessel",
    text: [
      "En la astrofísica galáctica, el 'salto al hiperespacio' no es una aceleración lineal, sino una manipulación de la topología del espacio-tiempo. Según la Relatividad Especial, cualquier objeto con masa requeriría energía infinita para alcanzar la velocidad de la luz. Sin embargo, el hiperimpulsor opera bajo principios similares a la Métrica de Alcubierre. Esta ecuación describe una 'burbuja de deformación'. El Halcón Milenario no se mueve a través del espacio, sino que contrae el espacio frente a la proa y lo expande tras la popa. La nave permanece en una zona de espacio plano, evitando la dilatación temporal relativista.",
      "El Enigma del Pársec: El Corredor de Kessel es una ruta plagada de singularidades (agujeros negros). Cuando Han Solo afirma haberlo recorrido en 12 pársecs, se refiere a una proa de geometría no euclidiana. Al navegar más cerca del horizonte de sucesos de los pozos de gravedad, la computadora de navegación calcula una hipotenusa espacial más corta. Esto requiere un procesamiento masivo de datos para evitar la espaguetización por fuerzas de marea. Un error de cálculo de milímetros resultaría en la destrucción total de la nave."
    ],
    image: "/assets/starwars/module_1.png"
  },
  {
    id: "starwars_sec_2",
    title: "Módulo 2: Astrofísica de Sistemas Binarios y Ecologías de Frontera",
    text: [
      "Tatooine y la Estabilidad de Tipo P: El sistema de soles gemelos de Tatooine es un laboratorio de Mecánica Celeste. Los planetas circumbinarios orbitan alrededor del centro de masa de dos estrellas. Para que la órbita sea estable y no sea eyectada por el caos gravitacional, el planeta debe situarse más allá del Radio Crítico. Tatooine ha logrado esta estabilidad, pero a un costo climático: la superposición de las zonas habitables de ambas estrellas genera un forzamiento radiativo extremo, evaporando grandes masas de agua y creando un ecosistema dominado por la arena y la baja humedad.",
      "Hoth y el Criovolcanismo: En contraste, mundos como Hoth demuestran cómo la vida puede persistir en el límite de la zona habitable. La energía térmica no proviene solo de su sol remoto, sino de las fuerzas de marea ejercidas por sus lunas, que mantienen el núcleo del planeta activo, permitiendo la existencia de cuevas térmicas donde especies como el Wampa pueden termorregular."
    ],
    image: "/assets/starwars/module_2.png"
  },
  {
    id: "starwars_sec_3",
    title: "Módulo 3: Biomecatrónica y la Evolución del Agente Autónomo",
    text: [
      "Interfaces Neuronales de Bucle Cerrado: La armadura de Darth Vader y la mano de Luke Skywalker representan la cúspide de la Neuro-robótica. No son simples prótesis; son sistemas con retroalimentación háptica. Para que un Jedi sienta la presión de su sable, los microprocesadores deben traducir señales digitales en potenciales de acción neuronales usando la Ecuación de Goldman-Hodgkin-Katz. Esta integración permite una latencia cercana a cero, esencial para los reflejos precognitivos.",
      "El Dilema de la Conciencia en Droides: Droides como R2-D2 operan bajo arquitecturas de Aprendizaje Agéntico Continuo. A diferencia de los modelos de IA que se estancan tras su entrenamiento, estos droides nunca reciben un 'borrado de memoria'. Esto genera comportamientos emergentes: la acumulación de sesgos, recuerdos y heurísticas de supervivencia que nosotros interpretamos como 'personalidad' o 'lealtad'."
    ],
    image: "/assets/starwars/module_3.png"
  },
  {
    id: "starwars_sec_4",
    title: "Módulo 4: El Campo de la Fuerza y el Entrelazamiento Cuántico",
    text: [
      "La Fuerza como Quinta Interacción: Científicamente, la Fuerza puede interpretarse como un campo que permea el universo, similar al Campo de Higgs. Sin embargo, su capacidad de conexión instantánea sugiere el uso del Entrelazamiento Cuántico a macroescala. Si dos partículas están entrelazadas, el cambio en una afecta a la otra instantáneamente, sin importar la distancia (no-localidad).",
      "Biología de los Midiclorianos: La presencia de midiclorianos propone un modelo de Endosimbiosis Seriada. Al igual que las mitocondrias en nuestras células, estos organismos actúan como transductores biológicos que permiten al sistema nervioso interactuar con el campo cuántico universal. El 'potencial de la Fuerza' es, por tanto, una medida de la eficiencia metabólica y comunicativa entre el huésped y el simbionte."
    ],
    image: "/assets/starwars/module_4.png"
  },
  {
    id: "starwars_sec_5",
    title: "Módulo 5: Xenobiología y el Registro Fósil Galáctico",
    text: [
      "Tafonomía en Mundos Desérticos: El registro fósil de criaturas como el Dragón Krayt en Tatooine es un caso de estudio en Exopaleontología. En ambientes de extrema aridez, la descomposición es lenta, permitiendo que la arena rica en silicatos reemplace la estructura ósea mediante procesos de permineralización.",
      "Evolución Convergente: ¿Por qué la galaxia está llena de humanoides? La teoría de la Evolución Convergente sugiere que ante presiones ambientales similares (gravedad de 1g, atmósferas de nitrógeno-oxígeno), la selección natural favorece soluciones morfológicas eficientes: bipedismo para liberar las manos, visión binocular para la caza y un sistema nervioso centralizado en la cabeza. Los remanentes fósiles en diversos planetas confirman que este diseño ha surgido de forma independiente en múltiples sistemas solares.",
      "Actividades de Cierre para el Estudiante: Ensayo: Compare el Código Jedi con las Meditaciones de Marco Aurelio. ¿Cómo ayuda la lógica estoica a evitar la 'caída' hacia el procesamiento emocional descontrolado (Lado Oscuro)? Cálculo: Use la masa estimada de una estrella enana roja para determinar el punto de Lagrange donde un satélite de comunicaciones podría orbitar de forma estable en el sistema de Tatooine."
    ],
    image: "/assets/starwars/module_5.png"
  }
];

const quizData = [
  {
    q: '¿Cómo funciona físicamente el salto al hiperespacio del Halcón Milenario?',
    a: ['Contrae el espacio frente a la proa y lo expande tras la popa (Métrica de Alcubierre)', 'Alcanza la velocidad de la luz mediante propulsión química', 'Atraviesa un agujero de gusano preexistente', 'Supera la barrera del sonido galáctico'],
    c: 0
  },
  {
    q: '¿A qué se refiere recorrer el Corredor de Kessel en "12 pársecs"?',
    a: ['A una medida de tiempo invertido en el viaje', 'A navegar más cerca de los pozos de gravedad, calculando una hipotenusa espacial más corta', 'A la cantidad de combustible consumido en la huida', 'A la velocidad máxima alcanzada en hiperespacio'],
    c: 1
  },
  {
    q: 'En Tatooine, ¿qué significa la "estabilidad de Tipo P"?',
    a: ['Que el planeta tiene un núcleo de hierro congelado', 'Que orbita alrededor de un solo sol estable', 'Que es un planeta circumbinario que orbita alrededor del centro de masa de dos estrellas', 'Que su órbita es inestable y será expulsado'],
    c: 2
  },
  {
    q: '¿Qué fuente de energía permite el criovolcanismo y termorregulación en mundos helados como Hoth?',
    a: ['Un sol gigantesco en las cercanías', 'Fuerzas de marea ejercidas por sus lunas sobre el núcleo del planeta', 'Reactores nucleares subterráneos antiguos', 'La combustión de gases atmosféricos'],
    c: 1
  },
  {
    q: '¿Qué permite a un Jedi sentir la retroalimentación háptica (presión) en una prótesis robótica avanzada?',
    a: ['Sensores mágicos incrustados en la piel', 'Microprocesadores que traducen señales digitales en potenciales de acción neuronales', 'El uso exclusivo de la Fuerza sin tecnología', 'Cables de cobre conectados a los músculos'],
    c: 1
  },
  {
    q: '¿Por qué los droides como R2-D2 desarrollan personalidades y lealtad?',
    a: ['Porque son programados intencionalmente con emociones humanas', 'Por la acumulación de sesgos y heurísticas de supervivencia al no recibir un borrado de memoria', 'Porque tienen cerebros biológicos en su interior', 'Por errores de fábrica en el sistema operativo'],
    c: 1
  },
  {
    q: 'Desde una perspectiva científica cuántica, ¿cómo funciona la Fuerza instantánea?',
    a: ['Por radiación electromagnética de ondas cortas', 'Por entrelazamiento cuántico a macroescala (no-localidad)', 'A través de satélites de comunicación galácticos', 'Mediante feromonas emitidas por el cerebro'],
    c: 1
  },
  {
    q: 'Biológicamente, ¿cómo actúan los midiclorianos según el concepto de Endosimbiosis Seriada?',
    a: ['Como parásitos que devoran el sistema nervioso', 'Como transductores biológicos que conectan al sistema nervioso con el campo cuántico universal', 'Como virus que causan enfermedades letales', 'Como glóbulos rojos mutados que transportan oxígeno extra'],
    c: 1
  },
  {
    q: '¿Cómo se conservan a nivel fósil gigantescos animales como el Dragón Krayt en Tatooine?',
    a: ['Congelados en cuevas de hielo glaciar', 'La descomposición es lenta en extrema aridez, y la arena de silicatos reemplaza el hueso (permineralización)', 'Son disecados por los soles y envueltos en tela', 'A través de un baño en ácido sulfúrico'],
    c: 1
  },
  {
    q: '¿Qué teoría evolutiva explica por qué la galaxia está llena de especies humanoides bípedas?',
    a: ['Evolución Convergente (soluciones morfológicas eficientes ante gravedades y atmósferas similares)', 'Creacionismo droide', 'Mutación aleatoria sin presiones ambientales', 'Todas las especies descienden de un solo humanoide original que viajó por el espacio'],
    c: 0
  }
];

const newModule = {
    id: 'ciencia_star_wars',
    titleEs: 'La Ciencia de Star Wars',
    titleEn: 'The Science of Star Wars',
    description: 'Astrofísica, biomecatrónica y evolución cuántica aplicadas al universo hiperespacial más famoso de la cultura pop.',
    icon: '⚔️',
    color: '#00f2fe',
    contentEs: {
      sections: sections
    },
    quizEs: quizData,
    badgeEs: 'Maestro Jedi'
};

let rawCode = fs.readFileSync(courseDataPath, 'utf8');

const lastBracketIdx = rawCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
   console.error('Could not find ];');
   process.exit(1);
}

// Remove previous if it exists
if (rawCode.includes(`id: 'ciencia_star_wars'`)) {
    console.log('Module already exists! Exiting.');
    process.exit(0);
}

const objStr = ',\n  ' + JSON.stringify(newModule, null, 2).replace(/^{/, '{\n    ').replace(/}$/, '  }') + '\n';

rawCode = rawCode.substring(0, lastBracketIdx) + objStr + rawCode.substring(lastBracketIdx);

fs.writeFileSync(courseDataPath, rawCode);
console.log('Appended Star Wars module successfully to COURSE_DATA array!');
