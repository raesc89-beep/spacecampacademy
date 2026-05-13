
const fs = require('fs');

const raw = fs.readFileSync('lib/courseData.js', 'utf8');
const jsonStr = raw.replace('export const COURSE_DATA = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const starWarsIndex = data.findIndex(m => m.id === 'ciencia_star_wars');

if (starWarsIndex !== -1) {
    data[starWarsIndex].contentEs.sections = [
        {
            "id": "starwars_sec_1",
            "title": "Los Parsecs y el Corredor de Kessel",
            "text": [
                "En la astrofísica galáctica, el 'salto al hiperespacio' no es una aceleración lineal, sino una manipulación de la topología del espacio-tiempo. Según la Relatividad Especial, cualquier objeto con masa requeriría energía infinita para alcanzar la velocidad de la luz. Sin embargo, el hiperimpulsor opera bajo principios similares a la Métrica de Alcubierre.",
                "El Corredor de Kessel es una ruta plagada de singulariades. Cuando Han Solo afirma haberlo recorrido en 12 pársecs (una unidad de distancia, no de tiempo), se refiere a navegar peligrosamente cerca del horizonte de sucesos de los agujeros negros, calculando una hipotenusa espacial más corta gracias a la curvatura extrema."
            ],
            "image": "/assets/starwars/module_1.png"
        },
        {
            "id": "starwars_sec_2",
            "title": "Mundos Extremos y Raros: Tatooine, Hoth y Degobha",
            "text": [
                "Tatooine: El sistema de soles gemelos es un laboratorio de Mecánica Celeste. Para que la órbita sea estable, el planeta debe situarse más allá del Radio Crítico. La superposición de las zonas habitables de ambas estrellas genera un clima abrasador.",
                "Hoth y Dagobah: Mundos como Hoth demuestran cómo la vida puede persistir mediante calor geotérmico o fuerzas de marea. Dagobah, por su parte, es un ecosistema hiper-saturado de biomasa, similar al periodo Carbonífero de la Tierra, donde la alta concentración de carbono y agua fomenta una densidad biológica excepcional."
            ],
            "image": "/assets/starwars/module_2.png"
        },
        {
            "id": "starwars_sec_3",
            "title": "C3PO y R2-D2, mas cerca de lo que parecen, Biomecatronia e IA",
            "text": [
                "Las interfaces neuronales en Star Wars representan la cúspide de la Neuro-robótica. Los microprocesadores traducen señales digitales en potenciales de acción neuronales, permitiendo una retroalimentación háptica perfecta.",
                "Droides como R2-D2 operan bajo arquitecturas de Aprendizaje Agéntico Continuo. Al no recibir un borrado de memoria regular, acumulan sesgos y heurísticas de supervivencia que se manifiestan como una 'personalidad' distinta, mostrando una evolución no programada de la IA."
            ],
            "image": "/assets/starwars/module_3.png"
        },
        {
            "id": "starwars_sec_4",
            "title": "\"Conexión con la fuerza\" Una mirada al entrelazamiento cuantico",
            "text": [
                "Científicamente, la Fuerza puede interpretarse como un campo cuántico que permea el universo. Su capacidad de conexión a distancias galácticas refleja el Entrelazamiento Cuántico a macroescala, donde las partículas están unidas y se afectan instantáneamente (no-localidad).",
                "La presencia de 'midiclorianos' se alinea con la teoría de la Endosimbiosis Seriada. Actúan como transductores biológicos que permiten al sistema nervioso interactuar con el campo cuántico universal, traduciendo energía pura en estímulos cerebrales."
            ],
            "image": "/assets/starwars/module_4.png"
        },
        {
            "id": "starwars_sec_5",
            "title": "Xenobiologia y la fauna de Star Wars",
            "text": [
                "El registro fósil de criaturas masivas como el Dragón Krayt en ambientes desérticos es un ejemplo de tafonomía extrema. La Evolución Convergente sugiere que, bajo presiones ambientales similares en distintos planetas, la selección natural favorecerá morfologías parecidas (como el bipedismo o la depredación ápice).",
                "La adaptación biológica de organismos como los gusanos espaciales o los Sarlacc demuestra metabolismos quimiosintéticos, extrayendo energía de compuestos inorgánicos en ausencia de radiación estelar tradicional."
            ],
            "image": "/assets/starwars/module_5.png"
        },
        {
            "id": "starwars_sec_6",
            "title": "Física de Plasmas: Sables laser y Blasters",
            "text": [
                "Los sables de luz no son láseres de luz, sino tubos de plasma confinado magnéticamente. En física real, lograr un 'sable' requiere contener plasma a altísimas temperaturas dentro de un campo electromagnético toroidal que forma un bucle cerrado invisible.",
                "Los 'blasters' tampoco disparan láseres, que serían invisibles e instantáneos, sino proyectiles de plasma excitado. El gas tibanna es ionizado y acelerado electromagnéticamente, resultando en un rayo con masa térmica que viaja a velocidades subsónicas o supersónicas, pero mucho menores a 'c'."
            ],
            "image": "/assets/starwars/module_6.png"
        },
        {
            "id": "starwars_sec_7",
            "title": "El código Jedi: La neurociencia y el budismo para tus emociones",
            "text": [
                "El control emocional de un Jedi puede entenderse a través de la neurociencia contemporánea. Su entrenamiento busca suprimir la reactividad de la amígdala y fortalecer el córtex prefrontal, regulando respuestas de miedo e ira (el Lado Oscuro).",
                "Al igual que el budismo Zen, el Código Jedi practica la atención plena (mindfulness) y el desapego. Entender que las pasiones conducen a ciclos de recompensa de dopamina desregulados ayuda a mantener la homeostasis mental y fisiológica."
            ],
            "image": "/assets/starwars/module_7.png"
        },
        {
            "id": "starwars_sec_8",
            "title": "Cruceros espaciales: La ciencia detras de construir naves colosales",
            "text": [
                "La construcción de Destructores Estelares requeriría astilleros orbitales y minería de asteroides. En la Tierra, la resistencia de los materiales limita el tamaño de los edificios. En gravedad cero o microgravedad, las megaestructuras no colapsan bajo su propio peso.",
                "Mantener la gravedad artificial y el soporte vital en una nave de kilómetros de longitud implicaría el uso de superconductores a temperatura ambiente y generadores de fusión, gestionando colosales sistemas de disipación térmica para no derretir la propia nave."
            ],
            "image": "/assets/starwars/module_8.png"
        },
        {
            "id": "starwars_sec_9",
            "title": "El traje de Darth Vader: la biomedicina y la robotica del futuro",
            "text": [
                "El icónico traje negro de Darth Vader es, en realidad, una unidad de soporte vital móvil. Cuenta con un sistema de respiración de presión positiva, bombeando aire enriquecido hacia pulmones irreparablemente dañados por quemaduras.",
                "Sus extremidades robóticas van más allá de prótesis mecánicas; son enlaces neuromotores integrados directamente a sus terminales nerviosas supervivientes, un claro adelanto de la biomedicina cibernética que busca reemplazar tejido vivo garantizando retroalimentación sensorial."
            ],
            "image": "/assets/starwars/module_9.png"
        }
    ];

    fs.writeFileSync('lib/courseData.js',
      'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';\n',
      { encoding: 'utf8' }
    );
    console.log('Star Wars module updated with 9 sections');
} else {
    console.log('Star Wars module not found');
}
