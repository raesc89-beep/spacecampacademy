
const fs = require('fs');

let raw = fs.readFileSync('lib/courseData.js', 'utf8');
const dataStr = raw.split('export const COURSE_DATA = ')[1].replace(/;\s*$/, '');
const COURSE_DATA = eval('(' + dataStr + ')');

const mamiferos = COURSE_DATA.find(x => x.id === 'animales_mamiferos');
const albert_ham = COURSE_DATA.find(x => x.id === 'animales_albert_ham');

if (mamiferos && albert_ham) {
    // 6x6 for mamiferos general
    mamiferos.contentEs.sections = [
      {
        title: 'Los Primeros Astronautas No Humanos',
        text: 'Antes de enviar humanos al espacio, los científicos necesitaban saber si la vida podría soportar las intensas fuerzas G de los cohetes y la ingravidez extrema. Por ello, una diversa selección de mamíferos fue entrenada meticulosamente para actuar como pioneros. Desde perritos callejeros hasta simios con entrenamiento para operar niveles, todos jugaron un rol invaluable.',
        image: '/assets/animales/mamiferos_parachute.png',
        imgCaption: 'Un concepto de rescate y protección para la reentrada.'
      },
      {
        title: 'Los Perros Cósmicos (URSS)',
        text: 'El programa espacial soviético confió abrumadoramente en los canes. Los perros callejeros de Moscú fueron seleccionados por su robustez al frío y resistencia al estrés urbano. Fueron piezas clave no solo para probar cabinas vitales sino para demostrar que se podía orbitar y regresar con vida, allanando el camino para que Yuri Gagarin hiciera historia.',
        image: '/assets/animales/Laika 1.png',
        imgCaption: 'Perros cosmonautas de la Unión Soviética en entrenamiento.'
      },
      {
        title: 'Simios y Monos (EE. UU.)',
        text: 'Mientras los soviéticos usaban perros, los Estados Unidos se decantó por la inteligencia biológica de monos rhesus y chimpancés. A diferencia de otros animales, un mono podía ser entrenado psicomotrizmente para operar manivelas y mover controles bajo altos niveles de estrés y fuerza gravitatoria. Esto demostró que el cerebro humano podría seguir pensando allá arriba.',
        image: '/assets/animales/real_albert.png',
        imgCaption: 'Los primates fueron fundamentales para las pruebas de pilotaje.'
      },
      {
        title: 'Gatos y Pequeños Exploradores',
        text: 'Pero no solo perros y chimpancés hicieron historia. El programa francés introdujo felinos, como Félicette, para estudiar los impulsos neurológicos espaciales instalando neurosensores. Además, cientos de ratones formaron la infantería invisible del cosmos, permitiendo probar densidades poblacionales, dietas de radiación y oxigenación.',
        image: '/assets/animales/cat_course_1.png',
        imgCaption: 'Félicette, la heroína felina de Francia.'
      },
      {
        title: 'Trajes Espaciales a la Medida',
        text: 'Ninguno de estos animales voló de imprevisto. Ingenieros de todo el globo diseñaron cápsulas hiper-optimzadas a la biométrica de cada especie: trajes de oxígeno en miniatura, sillas contorneadas con gel absorbe-impactos para perros, y paneles de distribución ergonómica para chimpancés.',
        image: '/assets/animales/vector_mamiferos.png',
        imgCaption: 'Tecnología vital diseñada anatómicamente.'
      },
      {
        title: 'Un Legado Inmortal',
        text: 'Hoy la comunidad internacional reconoce la contribución de estas especies. Sin su coraje silencioso e instintivo, el programa Apolo jamás habría pisado la Luna y la ISS nunca existiría. Es fundamental honrar sus datos biológicos en la conquista que hoy pertenece a la humanidad.',
        video: '/assets/animales/Ham.mp4',
        imgCaption: 'El sacrificio y valentía de la vida animal.'
      }
    ];

    // 9x9 for albert_ham
    albert_ham.contentEs.sections = [
      {
        title: 'El Programa V-2 y Albert I',
        text: 'La historia de los primates comienza con el cratér del cohete V-2 capturado en White Sands, Nuevo México. En 1948, Albert I, un pequeño mono Rhesus, se convirtió en el primer mamífero astronauta. Aunque no superó su vuelo debido a problemas con la nave, sembró los pilares éticos y funcionales.',
        image: '/assets/animales/vector_albert_ham.png',
        imgCaption: 'Los orígenes de la línea macaca en la aeronáutica.'
      },
      {
        title: 'Albert II: Alcanzando el Espacio',
        text: 'En 1949, Albert II logró sobrevivir las feroces turbulencias atmosféricas y alcanzar unos espectaculares 134 km de altitud, cruzando legítimamente la Línea de Kármán (el límite del espacio). A efectos legales y físicos, Albert II fue el primer primate en pisar el cosmos.',
        image: '/assets/animales/real_albert.png',
        imgCaption: 'El mono pionero de 1949.'
      },
      {
        title: 'Los Retos del Regreso',
        text: 'Lanzar objetos es relativamente fácil, aterrizarlos no. La cápsula de Albert II experimentó un fallo en los paracaídas de recuperación al descender. Esta falla llevó a la NASA a repensar la seguridad de cabina, creando escudos térmicos protectores modernos que salvarían astronautas humanos.',
        image: '/assets/animales/mamiferos_parachute.png',
        imgCaption: 'Los paracaídas y el rediseño balístico.'
      },
      {
        title: 'Entrenamiento Neurológico Chimpancé',
        text: 'Para el Proyecto Mercury en los años 60, no bastaba con ser pasajero; había que volar la nave. La Fuerza Aérea reclutó a los chimpancés astrocadet. Fueron entrenados utilizando luces de colores, timbres y palancas de empuje, recompensándolos térmicamente con jugo de plátano.',
        image: '/assets/animales/ham_training.png',
        imgCaption: 'Una intensa formación neurológica operaria.'
      },
      {
        title: 'El Chimpancé Ham: Una Nueva Era',
        text: 'De docenas de chimpancés entrenados, destacó el recluta número #65, rebautizado inteligentemente como Ham (Holloman Aerospace Medical Center). A diferencia de sus predecesores asustados, Ham poseía un temperamento excepcionalmente tranquilo en simuladores de gravedad, lo que lo hizo candidato estelar.',
        image: '/assets/animales/real_ham.png',
        imgCaption: 'El chimpancé que pilotaría hacia la edad espacial.'
      },
      {
        title: 'El Traje Biométrico de Ham',
        text: 'Antes de volar, Ham era introducido en una bio-cápsula personalizada presurizada con un 100% de oxígeno que monitoreaba su frecuencia respiratoria, temperatura y electrocardiograma remotamente hasta Florida.',
        image: '/assets/animales/hub_albert_ham.png',
        imgCaption: 'Sistemas vitales remotos de los años 60.'
      },
      {
        title: 'El Histórico Vuelo Redstone 2',
        text: 'En enero de 1961, el cohete Mercury-Redstone 2 fue lanzado desde Cabo Cañaveral. Una falla en la válvula inyectó demasiado combustible, llevando a Ham 68 kilómetros más alto y a una velocidad terrorífica superior a la planeada, sufriendo hasta 14 fuerzas G durante el reingreso abrasador.',
        image: '/assets/animales/ham_rocket.png',
        imgCaption: 'El violento ascenso hacia la ingravidez.'
      },
      {
        title: 'Un Piloto Perfecto Bajo Estrés',
        text: '¿El miedo paralizó a Ham? ¡Al contrario! A pesar de sufrir fallas parciales de oxígeno y extrema sacudida brutal, la telemetría demostró que Ham siguió tirando de las palancas en el orden perfecto, probando que el estrés cósmico no borra la memoria motriz operaria.',
        image: '/assets/animales/hub_mamiferos.png',
        imgCaption: 'Un instinto firme contra el pánico planetario.'
      },
      {
        title: 'Regreso, Fama y Enos',
        text: 'Ham amerizó en el mar. Fue rescatado feliz, recompensado con una manzana y vivió apaciblemente décadas. Meses después, otro chimpancé llamado Enos repetiría la proeza, pero dando vueltas orbitales a todo el planeta. Demostraron que el ser humano estaba listo para el despegue absoluto.',
        video: '/assets/animales/Ham.mp4',
        imgCaption: 'Descanso histórico luego de la aceleración gravitacional.'
      }
    ];

    const newRaw = raw.split('export const COURSE_DATA = ')[0] + 'export const COURSE_DATA = ' + JSON.stringify(COURSE_DATA, null, 2) + ';';
    fs.writeFileSync('lib/courseData.js', newRaw);
    console.log('Textos modificados para 6x6 (Mamiferos) y 9x9 (Albert/Ham)');
}

