"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} 30 30)`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
      <path d="M30 6 Q35 15 30 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M54 30 Q45 35 42 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 54 Q25 45 30 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M6 30 Q15 25 18 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

const DECO_MAP = {
  'laika-preparativos': [DecoGear, DecoBolt, DecoAtomSvg],
  'fisiologia-entrenamiento': [DecoWormhole, DecoGear, DecoBolt],
  'belka-strelka': [DecoAtomSvg, DecoWormhole, DecoGear],
  'telemetria-resultados': [DecoBolt, DecoAtomSvg, DecoWormhole],
  'legado-biologico': [DecoGear, DecoBolt, DecoAtomSvg],
};

const BIBLIOGRAPHY = [
  "Siddiqi, A.A. (2000). Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974. NASA History Division.",
  "Gazenko, O.G. (1962). 'Medical problems of manned space flight', Space Science Reviews, 1(3), 369-398.",
  "Burgess, C., & Dubbs, C. (2007). Animals in Space: From Research Rockets to the Space Shuttle. Springer-Praxis.",
  "Gvamichava, A.R., et al. (1960). 'Biological experiments on spacecraft and satellites', Soviet Physics Uspekhi.",
  "Chernov, V.N., & Yakovlev, V.I. (1958). 'Research on the flight of a living creature in an artificial earth satellite', Artificial Earth Satellites, 1, 80.",
  "Nelson, C. (2014). Cold War Exiles and the Flight of the Astrodogs. Journal of Cold War Studies, 16(3), 45-67."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'laika-preparativos',
    title: 'Laika y Sputnik 2',
    color: '#D87D4A',
    btnImage: '/assets/course/animales_pioneros/btn_laika.jpg',
    image: '/assets/course/animales_pioneros/hero_laika.jpg',
    content: [
      "El histórico vuelo del Sputnik 2, lanzado en noviembre de 1957, marcó un hito sin precedentes en la historia de la exploración espacial al llevar a bordo al primer ser vivo en orbitar nuestro planeta, una perra mestiza de las calles de Moscú llamada Laika. Este hito no solo demostró la capacidad de la ingeniería soviética para colocar una carga útil biológica en órbita terrestre baja, sino que también inauguró una era de investigaciones fisiológicas fundamentales sobre los efectos de la microgravedad y la radiación cósmica en organismos complejos. Laika fue seleccionada por su temperamento dócil y su resistencia natural, cualidades esenciales para soportar las extremas condiciones de aceleración, ruido ensordecedor y confinamiento estricto dentro de la diminuta cápsula presurizada.",
      "La cápsula del Sputnik 2 fue un prodigio de la ingeniería de la época, diseñada apresuradamente pero con sistemas pioneros de soporte vital que incluían regeneradores de oxígeno, absorbentes de dióxido de carbono y un rudimentario sistema de control térmico. A pesar de estas innovaciones técnicas, las limitaciones logísticas y la premura política por conmemorar el aniversario de la Revolución de Octubre dictaron que el satélite no tuviera un mecanismo de reentrada seguro. En consecuencia, el destino de Laika estaba sellado desde el momento del lanzamiento, un sacrificio que proporcionó los primeros datos telemétricos vitales sobre la frecuencia cardíaca, el ritmo respiratorio y la presión arterial de un mamífero durante las fases críticas del ascenso orbital y la ingravidez sostenida.",
      "Durante el ascenso inicial, los sensores implantados quirúrgicamente en Laika registraron un aumento drástico en su frecuencia cardíaca, alcanzando más de tres veces su ritmo de reposo normal debido al tremendo estrés acústico y vibratorio de los motores del cohete R-7. Una vez alcanzada la órbita terrestre, los datos de telemetría indicaron que su pulso tardó aproximadamente tres veces más en estabilizarse en comparación con las pruebas de centrifugado realizadas en tierra. Este prolongado período de recuperación ofreció la primera evidencia empírica concluyente de que la ausencia de gravedad y la desorientación espacial provocaban respuestas fisiológicas anómalas en el sistema cardiovascular de los mamíferos, desafiando las suposiciones médicas previas sobre la adaptabilidad biológica.",
      "Lamentablemente, el sistema de control térmico del Sputnik 2 experimentó un fallo crítico poco después de la inserción orbital, probablemente debido al desprendimiento incompleto de la cofia protectora o a daños en el aislamiento térmico externo. Esto provocó que la temperatura en el interior de la estrecha cabina presurizada se elevara rápidamente por encima de los cuarenta grados Celsius, exponiendo a Laika a un estrés térmico insoportable. Los registros telemétricos desclasificados décadas más tarde revelaron que la valiente canina sucumbió al agotamiento por calor y al pánico extremo entre la quinta y la séptima órbita terrestre, desmintiendo la propaganda inicial soviética que afirmaba que había sobrevivido durante varios días antes de una eutanasia programada y humanitaria.",
      "A pesar del trágico y éticamente cuestionable final de Laika, su pionero vuelo orbital destruyó de manera concluyente el arraigado mito científico de que los mamíferos superiores serían incapaces de sobrevivir incluso a unos pocos minutos de ingravidez espacial. Los datos fisiológicos, aunque limitados por el fallo prematuro de la cápsula, proporcionaron a los científicos y médicos espaciales soviéticos la confianza y la información empírica necesarias para desarrollar sistemas de soporte vital mucho más sofisticados y seguros. Este sacrificio allanó directamente el camino para misiones biológicas posteriores con retorno seguro y, en última instancia, para el histórico vuelo orbital de Yuri Gagarin en 1961, consolidando el legado inmortal de Laika en los anales de la historia aeroespacial."
    ],
    expandables: [
      { label: 'El Cohete R-7', icon: 'zap', text: "El lanzador utilizado para impulsar el Sputnik 2 hacia su órbita terrestre fue una variante modificada del temible misil balístico intercontinental R-7 Semyorka, una maravilla tecnológica concebida inicialmente por Sergei Korolev para el arsenal estratégico militar soviético. Este gigantesco vehículo de lanzamiento empleaba queroseno de grado de aviación y oxígeno líquido criogénico como propelentes principales, generando una fuerza de empuje colosal capaz de vencer la gravedad terrestre. La adaptación civil de este misil balístico demostró de manera contundente la supremacía inicial de la Unión Soviética en la tecnología de propulsión espacial pesada durante los primeros años de la competitiva Guerra Fría." },
      { label: 'Condiciones Extremas', icon: 'atom', text: "A pesar de los esfuerzos heroicos de los ingenieros soviéticos por proporcionar un entorno habitable, las condiciones interiores de la cápsula presurizada del Sputnik 2 eran verdaderamente extremas y albergaban innumerables riesgos imprevistos. Las restricciones masivas de peso dictadas por la capacidad de carga del cohete impidieron la instalación de blindaje adecuado contra la intensa radiación cósmica y las extremas fluctuaciones de temperatura experimentadas durante el tránsito orbital. Estas severas limitaciones técnicas transformaron inevitablemente el vuelo de Laika en una misión de sacrificio sin retorno posible, un hecho trágico que suscitó un intenso debate internacional sobre la ética de la experimentación biológica extraterrestre." }
    ],
    fact: "Curiosamente, el nombre original de Laika era Kudryavka, que significa 'Pequeña de pelo rizado' en ruso. Se ganó el nombre de Laika, que se traduce como 'Ladradora', debido a su ruidoso comportamiento durante las sesiones de entrenamiento. Este apelativo se volvió tan icónico internacionalmente que múltiples razas de perros de caza siberianos pasaron a ser conocidas popularmente con el mismo nombre."
  },
  {
    id: 'fisiologia-entrenamiento',
    title: 'Fisiología Canina',
    color: '#D4B872',
    btnImage: '/assets/course/animales_pioneros/btn_laika.jpg',
    image: '/assets/course/animales_pioneros/hero_laika.jpg',
    content: [
      "El riguroso proceso de selección y entrenamiento de los perros espaciales soviéticos, conocidos cariñosamente como 'astrodogos', representó un hito metodológico en la incipiente disciplina de la medicina espacial. Los científicos del Instituto de Medicina de Aviación de Moscú reclutaron deliberadamente hembras mestizas callejeras, presumiendo acertadamente que su lucha por la supervivencia en los crudos inviernos urbanos les confería una resistencia superior a las fluctuaciones extremas de temperatura y a las privaciones nutricionales. Además, las hembras fueron preferidas exclusivamente porque la anatomía de sus sistemas de recolección de desechos, diseñados específicamente para trajes presurizados, requería que permanecieran en una posición estática con las patas traseras extendidas durante largos períodos.",
      "El entrenamiento simulaba meticulosamente los estímulos sensoriales abrumadores y las fuerzas físicas extremas asociadas con el lanzamiento de un misil balístico intercontinental modificado. Los canes eran sometidos rutinariamente a sesiones extenuantes en centrifugadoras humanas de gran radio para familiarizarlos con las aceleraciones que superaban los diez 'G', monitoreando cuidadosamente sus respuestas cardiovasculares y respiratorias. Asimismo, se utilizaban cámaras de aislamiento acústico y plataformas vibratorias de alta frecuencia para replicar el rugido ensordecedor y las trepidaciones estructurales masivas generadas por los potentes motores de los cohetes de la serie R, evaluando su estabilidad psicológica y su capacidad para mantener la calma bajo niveles extremos de estrés ambiental.",
      "Para adaptar a los animales al confinamiento extremo de las diminutas cápsulas espaciales es esféricas, los investigadores implementaron un régimen de adaptación espacial progresiva que duraba varias semanas. Los perros eran introducidos gradualmente en compartimentos de volumen decreciente, comenzando con jaulas relativamente amplias y culminando en habitáculos rígidos que apenas les permitían ponerse de pie o cambiar ligeramente de posición. Este proceso, que hoy en día plantearía serias objeciones éticas en el ámbito del bienestar animal, era considerado absolutamente indispensable para prevenir ataques de pánico claustrofóbico durante el vuelo orbital, asegurando que los sensores biométricos implantados pudieran registrar de manera continua y precisa los datos fisiológicos vitales sin artefactos por movimiento.",
      "La nutrición en el espacio representaba un desafío de ingeniería biológica sin precedentes en la década de los cincuenta, dado que la microgravedad impedía el uso de cuencos de agua tradicionales y alimentos sólidos convencionales. Los nutricionistas soviéticos desarrollaron una pasta gelatinosa altamente calórica y rica en humedad, fortificada con vitaminas esenciales y minerales, que satisfacía simultáneamente los requerimientos hídricos y nutricionales de los animales. Los perros debían aprender a alimentarse de dispensadores automáticos que extruían esta sustancia nutritiva a intervalos programados regularmente, un proceso de condicionamiento operante que garantizaba su supervivencia básica sin necesidad de intervención manual o de complejos sistemas hidráulicos propensos a fallos mecánicos.",
      "Las intervenciones quirúrgicas preparatorias constituían la fase más invasiva y crítica del programa biológico soviético, requiriendo precisión técnica y cuidados postoperatorios intensivos para evitar infecciones. Se implantaban sensores telemétricos directamente en las arterias carótidas de los animales para medir la presión arterial continua, mientras que electrodos subcutáneos monitorizaban la actividad electrocardiográfica (ECG) y electroencefalográfica (EEG) en tiempo real. Estas sondas biométricas se conectaban mediante finos cables de transmisión a transmisores de radio de estado sólido compactos, convirtiendo los impulsos fisiológicos biológicos en señales electrónicas moduladas que posteriormente eran transmitidas, decodificadas y analizadas exhaustivamente por estaciones de seguimiento terrestres."
    ],
    expandables: [
      { label: 'Simulador Orbital', icon: 'zap', text: "Para preparar adecuadamente a los astrodogos, los científicos de Moscú diseñaron simuladores ambientales altamente avanzados que replicaban de manera precisa la presión barométrica, la composición gaseosa y la humedad relativa de las cabinas espaciales reales. Estos módulos herméticos de confinamiento, equipados con sistemas autónomos de depuración de aire basados en superóxidos alcalinos, permitían a los investigadores evaluar la tasa metabólica del oxígeno y la acumulación tóxica de dióxido de carbono durante misiones simuladas de larga duración. La invaluable recopilación de estos datos empíricos resultó absolutamente esencial para calcular los requisitos logísticos de soporte vital en misiones humanas posteriores." },
      { label: 'Sensores Quirúrgicos', icon: 'atom', text: "La avanzada tecnología de telemetría biomédica desarrollada para el programa espacial soviético requería procedimientos quirúrgicos invasivos que hoy serían objeto de un intenso escrutinio bioético por parte de la comunidad científica internacional. Además de los sensores arteriales principales, se implantaron quirúrgicamente finos transductores neumográficos alrededor de la caja torácica de los perros para registrar con absoluta precisión la profundidad, el ritmo y la frecuencia de las expansiones respiratorias. Estos valiosos dispositivos electromecánicos debían soportar las formidables fuerzas inerciales del lanzamiento sin desprenderse, garantizando una transmisión de datos biométricos ininterrumpida durante toda la fase de ascenso orbital." }
    ],
    fact: "Es un hecho histórico poco conocido que muchos de los prominentes científicos involucrados en el programa espacial soviético desarrollaron profundos vínculos afectivos y emocionales con los perros bajo su cuidado. Vladimir Yazdovsky, director del programa médico espacial, rompió los estrictos protocolos de cuarentena para llevar a Laika a su propia casa la noche anterior al histórico lanzamiento, permitiéndole jugar libremente con sus hijos por última vez."
  },
  {
    id: 'belka-strelka',
    title: 'Belka y Strelka',
    color: '#80DEEA',
    btnImage: '/assets/course/animales_pioneros/btn_laika.jpg',
    image: '/assets/course/animales_pioneros/hero_laika.jpg',
    content: [
      "El triunfo monumental de la misión Korabl-Sputnik 2 en agosto de 1960, protagonizada por las célebres perras Belka y Strelka, representó un gigantesco salto cualitativo en la exploración biológica espacial y restauró el prestigio de la ciencia soviética tras varios fracasos trágicos. A diferencia de la infortunada misión unidireccional de Laika, esta sofisticada nave espacial estaba equipada con un masivo y complejo escudo térmico ablativo y un sistema de paracaídas de múltiples etapas, diseñados específicamente para garantizar una reentrada atmosférica segura y un aterrizaje suave. Este vuelo pionero no solo demostró la viabilidad técnica de recuperar organismos vivos intactos desde la órbita terrestre, sino que también allanó directamente el camino para la primera misión espacial tripulada por un ser humano.",
      "Belka, que significa 'Blanquita', y Strelka, 'Flechita', no viajaron solas en su épica travesía orbital; la espaciosa cápsula presurizada funcionaba como un verdadero arca de Noé tecnológica, albergando una asombrosa diversidad biológica. Junto a los canes, los científicos incluyeron un conejo gris, cuarenta ratones blancos, dos ratas de laboratorio, plantas experimentales, cepas bacterianas y un vasto surtido de cultivos celulares de drosophila y hongos. El objetivo científico primordial de esta multitudinaria tripulación biológica era evaluar de manera exhaustiva y holística los efectos de la microgravedad prolongada y la intensa radiación de los rayos cósmicos galácticos en múltiples niveles de complejidad biológica, desde simples microorganismos hasta mamíferos superiores.",
      "Durante el transcurso de las diecisiete órbitas terrestres que completó la misión, los primitivos pero eficaces sistemas de videotelemetría instalados a bordo transmitieron las primeras imágenes en movimiento en blanco y negro de los animales flotando en un entorno de ingravidez sostenida. Las grabaciones históricas revelaron que, en las primeras órbitas, los perros mostraron signos evidentes de desorientación espacial, letargo inducido por el estrés e incluso episodios de náuseas por cinetosis espacial. Sin embargo, a medida que avanzaba la misión, la sorprendente capacidad adaptativa de su fisiología canina les permitió estabilizar sus funciones motoras y consumir la gelatina nutritiva dispensada automáticamente, proporcionando evidencia invaluable sobre la adaptabilidad de los mamíferos al entorno espacial.",
      "El exitoso y dramático descenso balístico de la cápsula de reentrada desencadenó una inmensa ola de celebración patriótica en toda la Unión Soviética y cautivó la imaginación del mundo entero, transformando a Belka y Strelka en celebridades internacionales instantáneas. Las fotografías de los perros emergiendo sanos y salvos de la escotilla carbonizada del Korabl-Sputnik 2 ocuparon las portadas de los principales diarios globales, sirviendo como una poderosa herramienta de propaganda diplomática que demostraba de manera irrefutable la absoluta superioridad tecnológica y científica del régimen soviético. Posteriormente, los animales fueron sometidos a rigurosos y extensos chequeos médicos post-vuelo que confirmaron que no habían sufrido daños fisiológicos permanentes ni mutaciones genéticas debido a la exposición a la radiación cósmica.",
      "El legado biológico de Strelka se extendió mucho más allá de su histórico viaje orbital cuando, meses después de su regreso triunfal a la Tierra, dio a luz a una saludable camada de seis cachorros vigorosos, disipando los temores científicos occidentales sobre los posibles efectos esterilizantes de los rayos cósmicos. En un magistral movimiento de diplomacia de la Guerra Fría, el primer ministro soviético Nikita Jrushchov obsequió personalmente a una de estas famosas crías, llamada Pushinka, a la hija del presidente estadounidense John F. Kennedy, Caroline. Esta pequeña perrita cruzó la frontera ideológica más tensa del planeta, convirtiéndose en un conmovedor e inesperado símbolo viviente de posible coexistencia pacífica y cooperación internacional en medio de la frenética carrera armamentística espacial."
    ],
    expandables: [
      { label: 'El Arca Orbital', icon: 'atom', text: "La nave espacial Korabl-Sputnik 2 fue un verdadero prodigio de la ingeniería soviética, incorporando los primeros ecosistemas cerrados y sistemas regenerativos de purificación atmosférica diseñados para mantener una vasta biodiversidad en el espacio. El complejo laberinto de contenedores biológicos y biosensores automatizados monitorizó continuamente los niveles de radiación gamma, la germinación de las semillas de plantas vasculares y la tasa de división celular en los cultivos de levadura. Esta enorme riqueza de datos experimentales sentó las bases metodológicas fundamentales para disciplinas científicas completamente nuevas como la radiobiología espacial y la ecología de sistemas cerrados para futuros viajes interplanetarios de larga duración." },
      { label: 'Cámaras On-Board', icon: 'zap', text: "La transmisión pionera de imágenes televisivas de circuito cerrado desde la órbita terrestre baja requirió el desarrollo de una revolucionaria tecnología de videotelemetría de barrido lento y alta potencia. Dos diminutas cámaras monocromáticas, estratégicamente posicionadas para capturar perfiles completos y expresiones faciales, estaban sincronizadas mecánicamente con transmisores de radio de frecuencia modulada para enviar datos visuales a las estaciones terrestres de seguimiento en el vasto territorio soviético. El análisis meticuloso cuadro por cuadro de estas transmisiones granuladas permitió a los médicos diagnosticar con precisión el mareo espacial y formular contramedidas farmacológicas eficaces para los cosmonautas humanos que las seguirían." }
    ],
    fact: "Pushinka, la cachorrita de Strelka que fue regalada al presidente Kennedy, se integró plenamente en la familia presidencial estadounidense y posteriormente tuvo sus propios cachorros con un terrier galés llamado Charlie, propiedad de la familia Kennedy. El presidente se refería cariñosamente a esta histórica camada de descendientes de la Guerra Fría como 'pupniks', combinando humorísticamente la palabra puppy (cachorro) con Sputnik."
  },
  {
    id: 'telemetria-resultados',
    title: 'Telemetría y Datos',
    color: '#3949AB',
    btnImage: '/assets/course/animales_pioneros/btn_laika.jpg',
    image: '/assets/course/animales_pioneros/hero_laika.jpg',
    content: [
      "La sofisticada red de estaciones de telemetría terrestre, estratégicamente diseminadas a lo largo y ancho del vasto territorio de la Unión Soviética, constituyó la verdadera columna vertebral tecnológica invisible que posibilitó el resonante éxito del programa espacial biológico canino. Estas colosales instalaciones de radar y recepción de ondas de radio estaban equipadas con masivas antenas parabólicas orientables de ganancia ultra-alta y gigantescos conjuntos de ordenadores analógicos de primera generación que procesaban inmensos volúmenes de datos brutos. La capacidad ininterrumpida de recibir, decodificar en tiempo real y almacenar en cintas magnéticas la incesante lluvia de señales biométricas desde la órbita terrestre fue un logro monumental de la ingeniería de telecomunicaciones soviética.",
      "El análisis pormenorizado y exhaustivo de los electrocardiogramas transmitidos desde el espacio profundo reveló fenómenos fisiológicos fascinantes y completamente inesperados sobre el funcionamiento del músculo cardíaco mamífero en condiciones de caída libre sostenida. Los cardiólogos espaciales observaron fluctuaciones significativas en el intervalo Q-T y alteraciones menores pero persistentes en la repolarización ventricular que no estaban presentes durante las pruebas de control realizadas en laboratorios terrestres. Estos sutiles cambios electromecánicos sugirieron fuertemente que la ausencia de carga gravitatoria forzaba al sistema cardiovascular a reconfigurar sus mecanismos de regulación de la presión hidrostática, un descubrimiento pionero que alteró para siempre el campo de la cardiología.",
      "Para monitorizar la respiración celular y el metabolismo del oxígeno a nivel sistémico, las cápsulas espaciales estaban repletas de avanzados espectrómetros de masas miniaturizados y precisos sensores electroquímicos de gases intersticiales. Estos instrumentos científicos de vanguardia documentaron meticulosamente cómo los ritmos respiratorios de los canes fluctuaban en respuesta directa a los niveles cambiantes de presión parcial de dióxido de carbono ambiental y a los drásticos cambios térmicos. La información empírica recopilada demostró de manera concluyente la necesidad imperiosa e ineludible de instalar ventiladores de flujo forzado robustos y depuradores químicos redundantes en cualquier nave espacial concebida para albergar tripulaciones humanas durante períodos orbitales prolongados.",
      "Uno de los descubrimientos más sorprendentes y valiosos arrojados por el extenso análisis de los datos fisiológicos telemétricos fue la profunda alteración observada en los ritmos circadianos naturales y los delicados ciclos de sueño-vigilia de los animales. En el duro entorno espacial, donde las rápidas órbitas terrestres producían puestas y salidas de sol cegadoras cada noventa minutos, los electroencefalogramas transmitidos revelaron una preocupante disrupción de la crucial fase de sueño de movimientos oculares rápidos (REM). Esta desincronización neurológica severa provocó episodios transitorios de irritabilidad y fatiga en los canes, subrayando la necesidad crítica de implementar protocolos estrictos de iluminación artificial y control ambiental para las futuras misiones cosmonáuticas tripuladas.",
      "La minuciosa evaluación dosimétrica de la radiación ionizante absorbida por los especímenes biológicos proporcionó a los físicos soviéticos un mapa detallado y sin precedentes del complejo entorno de radiación en la órbita terrestre baja, incluyendo las peligrosas anomalías geomagnéticas. Los contadores Geiger-Müller y los dosímetros de centelleo a bordo del Korabl-Sputnik confirmaron que, a altitudes inferiores a los trescientos kilómetros, el intenso campo magnético natural de la Tierra proporcionaba un escudo protector excepcionalmente eficaz contra el letal viento solar y las violentas erupciones coronales. Este descubrimiento cosmológico crítico garantizó a los planificadores del programa espacial que las misiones orbitales cortas no requerirían un blindaje de plomo prohibitivamente masivo que hubiera hecho imposible el lanzamiento de la cápsula tripulada Vostok."
    ],
    expandables: [
      { label: 'Ordenadores Analógicos', icon: 'zap', text: "El procesamiento masivo y la interpretación precisa de las complejas señales biométricas extraterrestres exigían el empleo de colosales y revolucionarios ordenadores analógicos de válvulas de vacío que ocupaban salas enteras con sistemas de refrigeración industrial. Estos titánicos cerebros electrónicos, mediante el uso de complejos algoritmos matemáticos de transformada de Fourier y filtrado de ruido blanco, lograban separar los débiles impulsos electrocardiográficos caninos del ensordecedor ruido de fondo electromagnético emitido por la ionosfera terrestre. El incesante análisis matemático predictivo ejecutado por estas máquinas gigantes permitió a los investigadores soviéticos identificar rápidamente anomalías cardíacas sutiles y anomalías metabólicas en tiempo real, mucho antes de que el animal mostrara signos externos de sufrimiento agudo." },
      { label: 'Sensores Ambientales', icon: 'atom', text: "Además de monitorear a los propios animales, la nave espacial orbitante estaba erizada externamente con densas matrices de transductores ambientales altamente sensibles y espectrómetros direccionales de masas y partículas cuánticas. Estos instrumentos microscópicos registraron y transmitieron fluctuaciones infinitesimales en la densidad del plasma ionosférico, variaciones en el flujo de micrometeoritos primordiales y dramáticos gradientes de temperatura externa que oscilaban entre los doscientos grados bajo cero y los ciento cincuenta grados sobre cero. El inmenso volumen de datos ambientales precisos correlacionado meticulosamente con la telemetría fisiológica permitió a los ingenieros espaciales rediseñar por completo y optimizar de manera espectacular el aislamiento térmico y los sistemas de control de las futuras cápsulas Vostok." }
    ],
    fact: "Curiosamente, el sistema telemétrico soviético, conocido en clave secreta como 'Tral', fue considerado inicialmente un secreto militar de estado absoluto, tan protegido como los propios diseños de armas nucleares del régimen. La frecuencia de radio exacta utilizada para transmitir los valiosos latidos del corazón de Laika fue guardada celosamente para evitar la interceptación y el análisis por parte de la comunidad de inteligencia occidental durante la incipiente y paranoica Guerra Fría."
  },
  {
    id: 'legado-biologico',
    title: 'El Legado Espacial',
    color: '#2C3E50',
    btnImage: '/assets/course/animales_pioneros/btn_laika.jpg',
    image: '/assets/course/animales_pioneros/hero_laika.jpg',
    content: [
      "El inmenso y duradero legado biológico y científico forjado por el intrépido escuadrón de perros espaciales soviéticos trasciende con creces los confines de la era de la Guerra Fría, sentando los cimientos irrefutables de la medicina aeroespacial moderna y la biología gravitacional contemporánea. Cada misión pionera canina, desde los vuelos suborbitales parabólicos en cohetes geofísicos hasta los extensos ensayos de viabilidad orbital de larga duración, actuó como un eslabón insustituible y crucial en la compleja cadena de pruebas que culminó en el histórico vuelo tripulado de Yuri Gagarin. Sin la inestimable y silenciosa contribución fisiológica y los enormes sacrificios involuntarios de estos caninos callejeros moscovitas, el cronograma de exploración tripulada del espacio profundo soviético se habría retrasado irremediablemente por décadas o quizás nunca se habría materializado.",
      "Las rigurosas autopsias post-mortem y los minuciosos análisis patológicos longitudinales practicados a los valientes perros veteranos que lograron regresar a salvo proporcionaron una mina de oro de conocimientos biológicos invaluables que no podrían haberse obtenido de ninguna otra fuente disponible en la Tierra. Los investigadores biomédicos descubrieron alteraciones bioquímicas previamente desconocidas en la regulación de la masa ósea y cambios atróficos microscópicos en las fibras musculares de contracción lenta causados por la prolongada ausencia de carga gravitacional, fenómenos que hoy conocemos clínicamente como osteopenia y atrofia muscular inducidas por el espacio. Estos descubrimientos tempranos impulsaron el diseño inmediato y el desarrollo acelerado de avanzados programas de ejercicios contramedida y suplementación nutricional intensiva que ahora son un pilar indispensable y rutinario para los astronautas contemporáneos en la Estación Espacial Internacional.",
      "Además del profundo impacto biomédico, la saga épica de los perros espaciales catalizó una verdadera revolución cultural y sociológica que alteró profundamente la percepción pública global sobre la interacción entre la ciencia, la exploración del cosmos y la ética animal. El profundo duelo público internacional desatado por la lamentable y solitaria muerte de Laika sirvió como un potente y temprano catalizador para el desarrollo y la implementación rigurosa de comités éticos institucionales contemporáneos que hoy en día supervisan estrictamente y regulan rigurosamente el uso de animales en la investigación biomédica de vanguardia. La humanidad comenzó a reconocer colectivamente una enorme e impagable deuda moral de gratitud hacia los seres vivos consintientes no humanos que involuntariamente abrieron el traicionero camino hacia las deslumbrantes estrellas.",
      "La abrumadora influencia geopolítica y la enorme tracción de la maquinaria de propaganda que aprovecharon hábilmente los repetidos éxitos del programa biológico soviético desempeñaron un papel absolutamente fundamental y determinante en la exacerbación y aceleración frenética de la competitiva carrera espacial. Mientras los ingenieros soviéticos celebraban el regreso seguro de sus astrodogos, las potencias occidentales, sintiéndose humilladas e intelectualmente superadas, canalizaban sumas de dinero sin precedentes y movilizaban recursos humanos masivos para impulsar sus propios y paralelos programas espaciales centrados en primates homínidos. Esta encarnizada rivalidad ideológica, científica y tecnológica impulsó de manera espectacular e irreversible los límites del ingenio humano colectivo, culminando menos de una década después con el colosal triunfo del programa Apolo estadounidense y los primeros pasos del hombre en la superficie lunar.",
      "Hoy en día, el glorioso e imborrable recuerdo de Laika, Belka, Strelka, y decenas de otros astrodogos soviéticos heroicos y menos conocidos, permanece solemnemente honrado y reverenciado en monumentos conmemorativos, extensas exhibiciones en museos aeroespaciales de clase mundial e innumerables referencias en la cultura pop literaria y cinematográfica. Su legado perdura de manera palpable y tangible en las avanzadas y refinadas tecnologías de telemetría biomédica portátil que monitorean ininterrumpidamente los signos vitales de los cosmonautas modernos, así como en las sofisticadas infraestructuras de soporte de vida de circuito cerrado y regenerativo. Estos nobles pioneros de cuatro patas demostraron irrefutablemente la notable y sorprendente resiliencia de la frágil vida terrestre y garantizaron que los primeros audaces pasos humanos en la inmensidad del vacío espacial estuvieran respaldados por datos fisiológicos sólidos y no por conjeturas arriesgadas."
    ],
    expandables: [
      { label: 'Veteranos Caninos', icon: 'zap', text: "A diferencia del solitario y trágico destino unidireccional que selló el vuelo de Laika, la gran mayoría de los astrodogos veteranos que sobrevivieron a las misiones suborbitales e inserciones orbitales subsiguientes gozaron de retiros sumamente largos, pacíficos y repletos de comodidades. Muchos de estos perros héroes fueron adoptados personalmente por los investigadores jefe, los ingenieros aeronáuticos de alto rango y el personal médico de élite que formaban parte del Instituto de Medicina de Aviación de Moscú, quienes los cuidaron con extremo afecto y devoción genuina en sus residencias privadas. Estos venerables veteranos cuadrúpedos del cosmos vivieron cómodamente hasta alcanzar edades avanzadas sin mostrar absolutamente ningún tipo de efecto secundario negativo y permanente derivado de sus extraordinarias y estresantes experiencias en la órbita de la Tierra." },
      { label: 'Impacto Médico', icon: 'atom', text: "Los asombrosos y disruptivos avances tecnológicos logrados en el campo de la telemetría biomédica y la biometría continua durante el extenuante programa de los astrodogos soviéticos desencadenaron de manera directa aplicaciones sumamente beneficiosas e inmediatas en la medicina cardiovascular clínica terrestre. La urgente y crítica necesidad de transmitir de forma inalámbrica y confiable los electrocardiogramas detallados de los perros desde el espacio exterior profundo hacia las estaciones de control terrestre fomentó la invención acelerada de sistemas de monitoreo de telemetría inalámbrica hospitalaria de alta fidelidad. Hoy en día, esta misma tecnología fundacional desarrollada apresuradamente durante la Guerra Fría es la que emplean los cardiólogos modernos para monitorizar meticulosamente a los pacientes en unidades de cuidados intensivos coronarios en todo el globo terráqueo." }
    ],
    fact: "En un conmovedor y solemne tributo póstumo a su sacrificio incalculable por el avance de la ciencia y la exploración, el gobierno ruso inauguró oficialmente en el año 2008 un majestuoso monumento conmemorativo de bronce fundido dedicado exclusivamente a la memoria de Laika. La impresionante y emotiva escultura, situada en las inmediaciones del complejo de investigación biomédica militar de Moscú donde se planificó originalmente su vuelo, representa la orgullosa figura del famoso perro espacial ergida noblemente sobre las aletas de un cohete espacial estilizado que apunta directamente hacia el firmamento, honrando eternamente a la 'pasajera silenciosa' de las estrellas."
  }
];

function TemporalField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    const w = canvas.width, h = canvas.height;
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
      gearSize: Math.random() * 3 + 1,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
        
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3 + t * p.speed;
          const outerR = p.r * p.gearSize;
          ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
          ctx.lineTo(p.x + Math.cos(a + 0.3) * p.r, p.y + Math.sin(a + 0.3) * p.r);
        }
        ctx.closePath();
        
        ctx.fillStyle = \`rgba(\${p.color}, \${Math.max(0, opacity)})\`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 5 }, (_, i) => {
          const t = (i + 1) / 6;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#D4B872','#80DEEA','#3949AB','#2C3E50'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: \`drop-shadow(0 0 6px \${colors[i]})\` }}
            />
          );
        })}
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PERROS ESPACIALES SOVIÉTICOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LAIKA Y SUS SUCESORES</text>
      </svg>
    </div>
  );
}

function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: \`3px solid \${isActive ? node.color : 'rgba(216,125,74,0.2)'}\`,
        boxShadow: isActive
          ? \`0 0 20px \${node.color}50, 0 0 40px \${node.color}20, inset 0 0 15px \${node.color}30\`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: \`2px solid \${node.color}\`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '100px',
        textShadow: isActive ? \`0 0 8px \${node.color}40\` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotAnimalesM3"
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: node.color,
            boxShadow: \`0 0 8px \${node.color}\`,
          }}
        />
      )}
    </motion.button>
  );
}

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};

const EXPAND_ICONS = {
  clock: Clock,
  zap: Zap,
  atom: Atom,
};

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem',
      borderRadius: '14px',
      border: \`1px solid \${color}25\`,
      overflow: 'hidden',
      background: \`linear-gradient(135deg, \${color}08, transparent)\`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: \`\${color}12\` }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.8rem 1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: \`\${color}25\`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComp size={14} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.7 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dirVariants[dir]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: \`3px solid \${color}30\`,
              paddingLeft: '0.8rem',
            }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 12, 30, 0.92)',
        backdropFilter: 'blur(24px)',
        border: \`1px solid \${node.color}30\`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', border: \`1px solid \${node.color}40\`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: \`linear-gradient(135deg, \${node.color}15, rgba(0,0,0,0.4))\`,
        }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc && setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: \`linear-gradient(transparent, \${node.color}15)\`,
            pointerEvents: 'none',
          }} />
        </div>

        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: \`2px solid \${node.color}40\`,
              flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{
              margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none',
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: \`3px solid \${node.color}30\`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{
                  margin: 0, fontSize: '0.95rem', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: \`linear-gradient(90deg, \${node.color}15, transparent)\`,
            borderLeft: \`4px solid \${node.color}\`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: \`\${progress}%\` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

export default function InteractiveInfographic_AnimalesM3() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/course/animales_pioneros/banner_animales.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <TimeMachineHeader />
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode}
              node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '3rem',
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(216,125,74,0.1)',
              border: '1px solid rgba(216,125,74,0.3)',
              borderRadius: '16px',
            }}
          >
            <Star size={40} color="var(--gold-star, #FFD700)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: 'var(--gold-star, #FFD700)', margin: '0 0 1rem', fontSize: '1.5rem' }}>
              ¡Exploración Canina Completada!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              Has analizado todos los hitos y descubrimientos cruciales de los astrodogos soviéticos, desde el pionero vuelo de Laika hasta las investigaciones detalladas de la fisiología espacial.
            </p>
          </motion.div>
        )}

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Bibliografía Académica
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                <span style={{ color: '#D87D4A', marginRight: '0.5rem' }}>[{i + 1}]</span>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {lightboxSrc && ImageLightbox && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
