const fs = require('fs');
const courseDataPath = 'lib/courseData.js';

const sections = [
  {
    id: "bttf_sec_1",
    title: "I. El Umbral de la Velocidad y el Salto al Ayer",
    text: [
      "Nuestra aventura comienza en el estacionamiento oscuro de un centro comercial llamado Twin Pines Mall. Allí, el Dr. Emmett Brown nos presenta su creación más increíble: un coche de acero inoxidable que no solo corre por el pavimento, sino a través de los siglos. Pero, ¿por qué un coche necesita alcanzar exactamente 88 millas por hora para desaparecer en un rastro de fuego? Científicamente, no es que el coche corra tanto que el tiempo se canse. Lo que sucede es que el Condensador de Flujo funciona como un motor de geometría espaciotemporal que requiere una velocidad específica para sincronizar la masa del vehículo con las cuerdas del universo.",
      "Para profundizar en este misterio, debemos entender que la elección de las 88 mph no fue solo un número al azar en el guion. Según el diseño técnico de la producción, esta velocidad representa el punto de equilibrio donde el desplazamiento cinético del DeLorean permite que el campo de flujo generado por el condensador envuelva la carrocería por completo sin disiparse. Si el coche fuera más lento, la energía se perdería en el aire; si fuera más rápido, la fricción molecular podría destruir el vehículo antes de que la burbuja temporal se estabilizara. Es, en esencia, la velocidad de escape necesaria para abandonar la línea de tiempo presente.",
      "El Condensador de Flujo, el \"corazón\" de la máquina, actúa como un generador de Puentes de Einstein-Rosen. Estos puentes son túneles que unen dos puntos distantes del espacio-tiempo. Para los estudiantes, imaginen que el tiempo es una alfombra: el condensador la dobla tanto que los dos extremos se tocan, permitiendo que el DeLorean simplemente \"cruce\" al otro lado. Este proceso requiere una manipulación de la energía negativa, un concepto real en la física cuántica que permite mantener abierto el túnel mientras el coche lo atraviesa a gran velocidad.",
      "La carrocería de acero inoxidable del DeLorean DMC-12 desempeña un papel crucial que el Doc menciona con orgullo. El acero inoxidable no es solo resistente a la corrosión; funciona como una Jaula de Faraday masiva y un dispersor de flujo térmico. Durante el salto, el coche recibe una carga inmensa de partículas gamma y luz. El acero permite que esta energía fluya por la superficie sin electrocutar a Marty o a Einstein el perro, asegurando que la integridad molecular de los pasajeros se mantenga intacta al entrar en la \"cuarta dimensión\".",
      "Otro dato fascinante es el fenómeno de la Dilatación Temporal. En la película, cuando el perro Einstein realiza el primer viaje de un minuto al futuro, su reloj está un minuto atrasado respecto al del Doc. Esto se basa en la Teoría de la Relatividad de Einstein: el tiempo pasa más lento para los objetos que se mueven rápido. Aunque en la vida real necesitaríamos ir casi a la velocidad de la luz para notar un minuto, en la película el condensador de flujo \"exagera\" este efecto, permitiendo que el tiempo se mueva alrededor del coche mientras este permanece estático en su propia burbuja.",
      "Finalmente, debemos considerar la navegación. El panel de circuitos del tiempo requiere tres datos: dónde estás, a dónde vas y dónde estuviste. Esto se correlaciona con los sistemas de coordenadas de cuatro vectores en física, donde el tiempo es la cuarta coordenada (x, y, z, t). Sin un cálculo preciso, el DeLorean podría aparecer en el lugar correcto pero en un momento en que la Tierra no está allí, dejándolos flotando en el vacío del espacio. Por eso, el Navicomputer del Doc es la pieza de ingeniería más sofisticada, calculando la rotación planetaria y la órbita solar para que el coche siempre aterrice sobre suelo firme."
    ],
    image: "/assets/bttf/module_1.png"
  },
  {
    id: "bttf_sec_2",
    title: "II. El Poder del Rayo y el Sueño de los Gigavatios",
    text: [
      "Una vez que sabemos cómo saltar, el gran problema es la energía. El Doc Brown nos presenta una cifra que se volvió legendaria: 1.21 Gigavatios. En 1955, sin plutonio a la mano, el Doc tuvo que mirar al cielo y esperar un milagro de la naturaleza. Un rayo no es solo luz; es una transferencia masiva de electrones buscando el suelo. Para capturar esa fuerza, el plan del Doc de usar un gancho y un cable de cobre es una lección magistral de ingeniería eléctrica y física de plasma.",
      "Para poner en perspectiva los 1.21 GW, debemos entender que esta es la potencia de salida de una central nuclear moderna o de miles de motores de aviación funcionando al unísono. En la película, el rayo que golpea la torre del reloj proporciona esta descarga en un solo milisegundo. El desafío científico es la Ruptura Dieléctrica del Aire: el rayo ocurre porque el aire entre la nube y la torre se vuelve conductor debido al voltaje extremo. El Doc calculó el segundo exacto porque la ventana de oportunidad para que esa energía fluyera por el cable era menor a un parpadeo.",
      "La transferencia de esta energía al Condensador de Flujo requiere un sistema de almacenamiento de alta capacidad. En física, esto se logra mediante capacitores de alta tensión que pueden absorber un pico de corriente inmenso y soltarlo de forma controlada. El DeLorean funciona como un enorme circuito RC (Resistencia-Capacitor). Si el cable de cobre no hubiera tenido la pureza adecuada o si la conexión en el poste se hubiera soltado, los gigavatios habrían incinerado el motor en lugar de alimentar el viaje temporal, convirtiendo al coche en una costosa barbacoa de acero.",
      "Un detalle técnico vital es la sincronización de las 88 mph con el impacto del rayo a las 10:04 PM. Marty debe alcanzar la velocidad exacta en el momento en que el gancho toca el cable. Esto es un problema de cinemática clásica: distancia, tiempo y aceleración. Si Marty hubiera acelerado un segundo antes, habría pasado el cable antes del rayo; un segundo después, y el rayo ya habría golpeado el suelo. Esta escena enseña a los estudiantes la importancia de la precisión matemática en la experimentación científica, donde un margen de error del 1% significa el fracaso total.",
      "La transición de la energía nuclear (plutonio) a la energía natural (rayo) también nos habla de la densidad energética. El plutonio-239, utilizado al inicio, libera energía mediante la Fisión Nuclear, donde los átomos se rompen. El rayo, por otro lado, es energía eléctrica pura. El hecho de que el Condensador de Flujo pueda aceptar ambas fuentes sugiere que es un dispositivo de conversión universal, capaz de transformar calor o electricidad en \"energía de flujo\", una forma de poder teórica que permite rasgar el tejido del universo.",
      "Finalmente, el \"flyer\" o volante de \"Salven la Torre del Reloj\" actúa como el registro de datos más importante de la saga. En ciencia, los datos históricos son fundamentales para replicar experimentos. Sin ese papel que Marty guardó por accidente, el Doc de 1955 nunca habría sabido cuándo y dónde caería el rayo. Esto resalta un pilar del método científico: la observación y el registro de fenómenos naturales para su uso posterior en la resolución de problemas complejos, demostrando que incluso un dato pequeño puede cambiar el curso de la historia tecnológica."
    ],
    image: "/assets/bttf/module_2.png"
  },
  {
    id: "bttf_sec_3",
    title: "III. El Efecto Mariposa y las Fotos que se Desvanecen",
    text: [
      "Viajar al pasado parece divertido hasta que te das cuenta de que el tiempo es frágil. Si Marty evita que sus padres se conozcan, él empieza a desaparecer. Esto nos presenta la famosa Paradoja del Abuelo. En la ciencia, esto se estudia bajo el principio de Causalidad y la entropía. Si alteras el pasado, generas un conflicto lógico: si Marty no nace, no puede viajar al pasado para impedir su nacimiento. La película resuelve esto con el concepto de la \"desintegración borrosa\", sugiriendo que los cambios en el tiempo no son instantáneos, sino que se propagan como ondas en el agua.",
      "Para entender la desaparición de Marty en la fotografía, debemos entrar en el terreno de la Probabilidad Cuántica. La foto representa el estado de la realidad. A medida que las posibilidades de que sus padres se casen disminuyen, la \"función de onda\" de Marty empieza a colapsar hacia la inexistencia. No es magia; es una representación visual de cómo la información en el universo puede ser borrada si se rompe la cadena lógica de eventos. Los estudiantes pueden visualizarlo como un programa de computadora que se queda sin una línea de código esencial y empieza a fallar.",
      "La película introduce más tarde la Teoría de los Universos Paralelos o Líneas de Tiempo Alternas. El Doc Brown utiliza una pizarra para explicar cómo el Biff del futuro, al viajar a 1955, creó una bifurcación: el \"1985-A\" (el 1985 Alterno). En física teórica, esto se conoce como la Interpretación de los Muchos Mundos de Everett. Cada vez que alguien cambia algo significativo en el pasado, el universo no se \"borra\", sino que se divide en dos ramas que avanzan de forma independiente. El reto de Marty no es solo arreglar su vida, sino encontrar el camino de regreso a su rama original.",
      "La entropía juega un papel fundamental en la restauración del tiempo. Cuando Marty quema el Almanaque Deportivo en 1955, está eliminando una \"anomalía de baja entropía\", un objeto que no pertenece a esa época y que está inyectando información del futuro de manera artificial. Al destruir el libro, el flujo del tiempo vuelve a su estado de equilibrio natural. Esto nos enseña que el tiempo tiene una dirección (la Flecha del Tiempo) y que intentar forzar información en contra de esa dirección crea un caos que el universo intenta corregir constantemente.",
      "Un aspecto sociológico de la ciencia en la película es el Determinismo. ¿Está nuestro futuro ya escrito? El Doc Brown inicialmente cree que el futuro es peligroso y debe evitarse, pero al final de la tercera película nos da la lección definitiva: \"Tu futuro es lo que tú hagas de él\". Científicamente, esto apoya la idea de la Agencia Humana frente al destino. Aunque las leyes de la física dictan cómo se mueven los planetas, las acciones individuales son variables impredecibles (Teoría del Caos) que pueden cambiar drásticamente el resultado final de una línea temporal.",
      "Por último, el papel de la memoria y el registro es vital. El Doc de 1985 escribe una carta que Marty le entrega en 1955; el Doc de 1955 la rompe por miedo a las consecuencias, pero luego la une con cinta adhesiva. Este acto simboliza la lucha entre el miedo al conocimiento y la necesidad de usar la ciencia para proteger a las personas. La información, una vez creada, es muy difícil de destruir, y en la cronodinámica, la información es la moneda más valiosa que existe, ya que permite predecir y evitar desastres antes de que ocurran en nuestra línea de tiempo personal."
    ],
    image: "/assets/bttf/module_3.png"
  },
  {
    id: "bttf_sec_4",
    title: "IV. Patinetas que Flotan y el Frío que Vence a la Gravedad",
    text: [
      "¿Quién no ha soñado con una Hoverboard? En 2015, Marty descubre que las patinetas no necesitan ruedas porque pueden flotar. Aunque parece magia, es pura ciencia magnética llamada Efecto Meissner. Para que algo flote así, necesitamos materiales superconductores. Estos materiales tienen una propiedad asombrosa: cuando se enfrían mucho, expulsan todos los campos magnéticos y se quedan \"anclados\" en el aire sobre un imán, permitiendo una levitación estable sin contacto físico.",
      "Profundizando en la tecnología de la Hoverboard, debemos hablar de la Ley de Lenz y las corrientes de Foucault. En la película, vemos que la patineta funciona perfectamente sobre el pavimento pero se detiene sobre el agua. ¿Por qué? Porque el pavimento de Hill Valley en 2015 está diseñado con una malla metálica conductora. Al pasar la patineta (que tiene electroimanes potentes), se generan corrientes eléctricas en el suelo que crean un campo magnético opuesto que empuja la tabla hacia arriba. El agua, al no ser un buen conductor magnético, no puede generar esa fuerza de empuje, dejando a Marty varado.",
      "La aerodinámica de los coches voladores en 2015, conocidos como \"Hover Conversions\", utiliza una tecnología similar pero a mayor escala. Al convertir un coche terrestre en uno volador, se instalan bobinas de inducción en las ruedas que se pliegan. Estas bobinas interactúan con las \"vías de vuelo\" magnéticas de la ciudad. Esto reduce la fricción a cero, lo que permite que el DeLorean alcance las 88 mph de forma mucho más eficiente en el aire que en una carretera llena de baches, demostrando cómo la eficiencia energética mejora drásticamente con la levitación.",
      "Otro avance científico mostrado es la Biometría y la ropa inteligente. La chaqueta que se ajusta sola y se seca con aire caliente, o los tenis con \"Power Laces\" (cordones automáticos), utilizan micro-motores y sensores de presión. Estos sensores detectan la forma del pie o el cuerpo del usuario y activan aleaciones con memoria de forma (como el Nitinol), metales que \"recuerdan\" su forma original cuando se les aplica una pequeña corriente eléctrica. Es la integración de la ciencia de materiales con la robótica aplicada al uso cotidiano.",
      "El entorno de Hill Valley en 2015 también nos muestra una \"Smart City\" o ciudad inteligente. Desde la publicidad holográfica (como el tiburón de Jaws 19) hasta el control automático del clima, la película predice el uso de la Luz Coherente (Láseres) y el procesamiento de datos masivo. El tiburón holográfico es una proyección de luz tridimensional que interactúa con el espacio físico, un campo de estudio real en la óptica que busca crear imágenes que no necesiten pantallas, utilizando la difracción de la luz en el aire.",
      "Finalmente, la hidratación de alimentos (la pizza pequeña que se vuelve grande en segundos) nos habla de la Liofilización avanzada. En la ciencia de los alimentos, extraer el agua permite conservar la comida por años; rehidratarla rápidamente con calor infrarrojo preserva la estructura celular y el sabor. Aunque es una escena divertida, representa la búsqueda científica por alimentar a una población creciente de forma eficiente y rápida, uniendo la física del calor con la biología nutricional de una manera que parece mágica pero es puramente técnica."
    ],
    image: "/assets/bttf/module_4.png"
  },
  {
    id: "bttf_sec_5",
    title: "V. Mr. Fusion: El Futuro de la Basura Limpia",
    text: [
      "Al final de nuestra historia, el Doc regresa con una sorpresa: ya no necesita rayos. Ahora tiene un aparato llamado Mr. Fusion que funciona con cáscaras de plátano y latas de refresco. Esto nos lleva a la frontera final de la energía: la Fusión Nuclear. A diferencia de la fisión que rompe átomos, la fusión los une, liberando una cantidad de poder billones de veces mayor sin crear residuos radiactivos peligrosos, tal como ocurre en el corazón de las estrellas.",
      "El Mr. Fusion representa un salto tecnológico desde la energía nuclear de fisión (el plutonio del inicio) hacia la Fusión de Confinamiento Magnético a pequeña escala. Científicamente, para fusionar átomos de hidrógeno (que se encuentran en el agua o en los restos orgánicos de la basura), se necesitan presiones y temperaturas extremas. El Mr. Fusion logra lo que los científicos de hoy intentan con reactores gigantes como el ITER, pero de forma portátil. Utiliza la basura no por su suciedad, sino por los núcleos de hidrógeno y carbono que contienen, convirtiendo el desperdicio en combustible de alta densidad.",
      "La ecuación de Einstein, E=mc^2, es la clave aquí. Nos dice que la masa (m) y la energía (E) son dos caras de la misma moneda. Al procesar una cáscara de plátano, Mr. Fusion desintegra una pequeñísima parte de su masa y la convierte en energía pura. Debido a que la velocidad de la luz al cuadrado (c^2) es un número astronómico (90,000,000,000,000,000 m²/s²), incluso la masa de una semilla de manzana puede generar los 1.21 Gigavatios necesarios para rasgar el tiempo. Es el reciclaje definitivo: transformar el desecho en la fuerza más poderosa del cosmos.",
      "Este avance cambia la filosofía del Doc sobre la tecnología. En 1985, el plutonio era una fuente de ansiedad y peligro; en 2015, la energía es tan abundante y limpia que el viaje por el tiempo se vuelve una herramienta de exploración en lugar de un riesgo nuclear. Esto enseña a los estudiantes sobre la Sostenibilidad Energética: cómo el progreso científico busca eliminar nuestra dependencia de materiales tóxicos y limitados, moviéndonos hacia fuentes de energía que son seguras, inagotables y respetuosas con el medio ambiente.",
      "Comparando el Mr. Fusion con los reactores de fusión reales que se están construyendo hoy (como los Tokamaks), vemos que la película predijo la necesidad de la \"Fusión Fría\" o la fusión de baja energía. Aunque todavía estamos lejos de poner un reactor en un coche, la investigación actual en Física de Plasmas busca exactamente lo mismo que el Doc: una forma de controlar el poder de las estrellas dentro de una botella de acero. El Mr. Fusion es el recordatorio de que los grandes problemas de la humanidad (como el hambre o el cambio climático) tienen solución a través de la física aplicada.",
      "Finalmente, el legado del Mr. Fusion es la democratización de la ciencia. Al principio, solo un genio como el Doc podía manejar la energía necesaria para viajar en el tiempo. Al final, la tecnología se ha vuelto tan sencilla y segura que cualquiera con un cubo de basura podría, teóricamente, alimentar su propio destino. Esto cierra el ciclo del aprendizaje: la ciencia comienza como un misterio complejo pero, a través del estudio y la innovación, se convierte en la herramienta que nos permite volar hacia el mañana, recordándonos que el futuro no está escrito, sino que lo construimos átomo por átomo."
    ],
    image: "/assets/bttf/module_5.png"
  }
];

const quizData = [
  {
    q: '¿Por qué el DeLorean necesita alcanzar exactamente 88 millas por hora (mph)?',
    a: ['Porque es la velocidad legal máxima en California en 1985', 'Es el punto de equilibrio donde el campo de flujo envuelve la carrocería por completo sin disiparse', 'Para que el motor de gasolina encienda los capacitores nucleares', 'Para escapar de los terroristas libios a tiempo'],
    c: 1
  },
  {
    q: '¿Qué concepto de la física cuántica permite mantener abierto el túnel espaciotemporal generado por el Condensador de Flujo?',
    a: ['La manipulación de la energía negativa', 'La radiactividad del plutonio', 'La fricción cinética de las llantas', 'La energía magnética del acero inoxidable'],
    c: 0
  },
  {
    q: '¿Cuál es el propósito científico de la carrocería de acero inoxidable del DeLorean durante el viaje temporal?',
    a: ['Para reflejar los rayos del sol y evitar el sobrecalentamiento', 'Funciona como una Jaula de Faraday masiva y un dispersor térmico contra partículas gamma', 'Para que el coche pese menos y alcance las 88 mph más rápido', 'Para verse futurista en los años 50'],
    c: 1
  },
  {
    q: '¿Qué fenómeno físico explica por qué el reloj del perro Einstein está atrasado respecto al de Doc?',
    a: ['La Paradoja del Abuelo', 'La Teoría del Caos', 'La Dilatación Temporal basada en la Teoría de la Relatividad', 'El Efecto Meissner'],
    c: 2
  },
  {
    q: '¿Qué problema de cinemática enfrentan Marty y el Doc al usar el rayo de 1.21 Gigavatios?',
    a: ['Tienen que escapar del rayo antes de que golpee el coche', 'Sincronizar la aceleración a 88 mph en el milisegundo exacto en que el gancho toca el cable', 'Calcular la distancia de frenado después de cruzar la calle', 'Evitar que la lluvia apague el motor del DeLorean'],
    c: 1
  },
  {
    q: '¿Qué función teórica tiene el Condensador de Flujo respecto a fuentes de energía como plutonio o rayos?',
    a: ['Generar plutonio a partir de electricidad', 'Es un dispositivo de conversión universal que transforma calor o electricidad en "energía de flujo"', 'Almacenar electricidad para usarla como batería de coche normal', 'Medir el nivel de radiación en el ambiente'],
    c: 1
  },
  {
    q: 'Según el Módulo III, ¿qué principio científico explica la desaparición paulatina de Marty en la fotografía?',
    a: ['La Fisión Nuclear', 'El deterioro químico del papel polaroid antiguo', 'La Probabilidad Cuántica y el colapso de la función de onda', 'El magnetismo alterando la película fotográfica'],
    c: 2
  },
  {
    q: '¿Qué principio termodinámico se restablece cuando Marty quema el Almanaque Deportivo?',
    a: ['La presión atmosférica', 'La Entropía, eliminando una anomalía inyectada artificialmente desde el futuro', 'La gravedad cuántica', 'La Ley de Lenz'],
    c: 1
  },
  {
    q: '¿Qué efecto científico real permite que la Hoverboard de 2015 flote sobre el pavimento?',
    a: ['La antigravedad de la quinta dimensión', 'La presión de aire comprimido expulsado hacia abajo', 'El Efecto Meissner y las corrientes de Foucault con materiales superconductores', 'Helio a alta presión escondido en la tabla'],
    c: 2
  },
  {
    q: '¿Por qué el reactor Mr. Fusion representa un avance revolucionario frente a la fisión nuclear?',
    a: ['Utiliza Fusión Nuclear uniendo átomos de basura (E=mc²) para liberar energía sin residuos radiactivos', 'Funciona exclusivamente con plutonio ecológico', 'Quema basura para producir vapor y mover turbinas', 'Atrapa electrones de los plátanos usando química básica'],
    c: 0
  }
];

const newModule = {
    id: 'ciencia_volver_al_futuro',
    titleEs: 'La Ciencia de Volver al Futuro',
    titleEn: 'The Science of Back to the Future',
    description: 'Cronodinámica, dilatación temporal, energía de fusión y superconductores a través del DeLorean.',
    icon: '⚡',
    color: '#ff4d4d',
    contentEs: {
      sections: sections
    },
    quizEs: quizData,
    badgeEs: 'Viajero en el Tiempo'
};

let rawCode = fs.readFileSync(courseDataPath, 'utf8');

const lastBracketIdx = rawCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
   console.error('Could not find ];');
   process.exit(1);
}

// Remove previous if it exists
if (rawCode.includes(`id: 'ciencia_volver_al_futuro'`)) {
    console.log('Module already exists! Exiting.');
    process.exit(0);
}

const objStr = ',\n  ' + JSON.stringify(newModule, null, 2).replace(/^{/, '{\n    ').replace(/}$/, '  }') + '\n';

rawCode = rawCode.substring(0, lastBracketIdx) + objStr + rawCode.substring(lastBracketIdx);

fs.writeFileSync(courseDataPath, rawCode);
console.log('Appended BTTF module successfully to COURSE_DATA array!');
