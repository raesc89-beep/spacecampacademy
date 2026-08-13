'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom, Rocket, Globe } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// --- SVG Decorative Elements (Cinematic Nilo de Nut style) ---
function DecoOrbit({ size = 70, color = '#D87D4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="28" ry="12" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="28" ry="12" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(150 30 30)" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.8" />
      <circle cx="50" cy="18" r="3" fill={color} />
      <circle cx="10" cy="42" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoStar({ size = 70, color = '#D4B872', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.7" />
      <circle cx="15" cy="15" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="45" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCapsule({ size = 70, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" />
      <path d="M15 30 Q30 40 45 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M20 20 Q30 15 40 20" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      <line x1="30" y1="12" x2="30" y2="5" stroke={color} strokeWidth="2" />
    </svg>
  );
}

const DECO_MAP = {
  'seleccion': [DecoStar, DecoOrbit, DecoCapsule],
  'nave-vostok': [DecoCapsule, DecoStar, DecoOrbit],
  'orbita': [DecoOrbit, DecoCapsule, DecoStar],
  'regreso': [DecoCapsule, DecoStar, DecoOrbit],
  'legado': [DecoStar, DecoOrbit, DecoCapsule],
};

const BIBLIOGRAPHY = [
  'Burgess, C., & Hall, R. (2009). The First Soviet Cosmonaut Team: Their Lives and Legacies. Springer Praxis Books. (ISBN 978-0387848235)',
  'Evans, B. (2010). Escaping the Bonds of Earth: The Fifties and the Sixties. Springer Praxis Books. (ISBN 978-0387790930)',
  'Gerovitch, S. (2015). Soviet Space Mythologies: Public Images, Private Memories, and the Making of a Cultural Identity. University of Pittsburgh Press. (ISBN 978-0822963636)',
  'Siddiqi, A. A. (2000). Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974. NASA History Division. (NASA SP-2000-4408)',
  'Woodmansee, L. (2002). Women Astronauts. Apogee Books Space Series. (ISBN 978-1896522876)',
  'Tereshkova, V. (1964). Into Space. (Autobiographical accounts and Soviet state publications on the Vostok 6 mission).'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'seleccion',
    title: 'La Selección y Preparación',
    color: '#D87D4A',
    btnImage: '/assets/course/animales_pioneros/btn_valentina.jpg',
    image: '/assets/course/animales_pioneros/hero_valentina.jpg',
    content: [
      'La selección de la primera mujer para viajar al espacio fue un proceso exhaustivamente competitivo y envuelto en el más estricto secreto por parte de la Unión Soviética. A principios de la década de 1960, las autoridades soviéticas, bajo la dirección de Serguéi Koroliov, buscaban asestar un nuevo golpe propagandístico en la Carrera Espacial. Valentina Tereshkova, una joven trabajadora textil y paracaidista aficionada, fue seleccionada entre más de cuatrocientas candidatas. Su perfil proletario, combinado con su destreza en el paracaidismo, la convertía en la candidata ideal para el programa espacial, el cual requería que el cosmonauta saltara en paracaídas desde la cápsula durante el descenso final. Este requerimiento técnico fundamental descartó a muchas pilotos experimentadas que carecían de experiencia en salto libre.',
      'El entrenamiento al que fueron sometidas las candidatas fue extraordinariamente riguroso y físicamente demandante, diseñado para llevar al límite la resistencia del cuerpo humano. Tereshkova y sus compañeras soportaron semanas de aislamiento en cámaras de privación sensorial para simular la profunda soledad del espacio profundo. Además, se sometieron a pruebas de centrifugadora que alcanzaban aceleraciones extremas de hasta 10 G, poniendo a prueba su sistema cardiovascular y su capacidad para mantener la consciencia bajo fuerzas gravitacionales aplastantes. La preparación también incluía vuelos en aviones a reacción MiG-15 para acostumbrarse a la ingravidez transitoria y maniobras de paracaidismo sobre el agua, previendo cualquier escenario de aterrizaje de emergencia en el océano.',
      'La dimensión psicológica del entrenamiento fue tan brutal como la física, requiriendo una fortaleza mental inquebrantable. Las candidatas fueron evaluadas constantemente mediante complejos test psicométricos y entrevistas destinadas a medir su estabilidad emocional bajo presión extrema y su capacidad para tomar decisiones críticas en fracciones de segundo. La presión constante del régimen soviético y la competencia interna entre las cinco finalistas creaban un ambiente de alta tensión. Tereshkova demostró una resiliencia excepcional, manteniendo la calma y la concentración durante simulaciones de fallos catastróficos en los sistemas de soporte vital de la nave Vostok, lo que impresionó profundamente a los instructores y a los directores del programa espacial.',
      'La formación teórica constituyó un pilar fundamental de su preparación, abarcando disciplinas científicas complejas. Las cosmonautas debían asimilar rápidamente conocimientos avanzados en mecánica orbital, astronomía, navegación espacial y sistemas de radiocomunicación. Tereshkova, a pesar de no poseer una formación académica inicial en ciencias exactas, dedicó incontables horas al estudio intensivo, dominando los manuales técnicos de la nave Vostok y los principios de la física de vuelos espaciales. Este esfuerzo intelectual hercúleo garantizaba que no fuera simplemente una pasajera en la cápsula, sino una operadora plenamente capacitada, capaz de entender los parámetros de la misión y de intervenir si los sistemas automatizados fallaban.',
      'El impacto social y político de esta selección resonó profundamente en la estructura de la Guerra Fría. La elección de una mujer de origen obrero para liderar esta misión histórica fue un movimiento maestro de la propaganda soviética, diseñado para demostrar al mundo la supuesta igualdad de género bajo el sistema comunista y la superioridad tecnológica de la URSS. Mientras tanto, en los Estados Unidos, el programa espacial estaba firmemente restringido a pilotos de prueba masculinos de perfil militar. La inminente misión de Tereshkova no solo representaba un triunfo técnico monumental, sino que también desafiaba las normas de género establecidas a nivel global, abriendo un nuevo capítulo en la historia de la exploración espacial y sentando las bases para futuras generaciones de mujeres astronautas.'
    ],
    expandables: [
      { label: 'El Escuadrón Femenino', icon: 'star', text: 'El grupo final de candidatas estaba compuesto por cinco mujeres excepcionales: Tatyana Kuznetsova, Irina Solovyova, Zhanna Yorkina, Valentina Ponomaryova y Valentina Tereshkova. Aunque solo Tereshkova voló, todas se sometieron a un régimen brutal. Solovyova y Ponomaryova eran las suplentes principales. El gobierno soviético mantuvo la identidad de estas mujeres en el más absoluto anonimato hasta el día del lanzamiento, protegiendo así el secreto del programa ante el espionaje occidental.' },
      { label: 'El Factor Paracaídas', icon: 'zap', text: 'A diferencia de las cápsulas estadounidenses Mercury que amerizaban en el océano, las naves Vostok soviéticas aterrizaban en tierra firme, lo cual requería un impacto mucho más duro. Como los paracaídas de la cápsula no frenaban lo suficiente, el protocolo exigía que el cosmonauta se eyectara a gran altitud y descendiera con su propio paracaídas. La amplia experiencia de Tereshkova, con más de 120 saltos de exhibición, fue el factor decisivo que la impulsó por encima de otras candidatas con mayor educación formal.' }
    ],
    fact: 'Tereshkova fue ascendida al rango de teniente de la Fuerza Aérea Soviética antes de su vuelo, a pesar de ser civil. Este nombramiento honorífico le otorgó la autoridad militar necesaria para comandar la cápsula espacial en caso de emergencia y comunicarse de igual a igual con los controladores de vuelo militares.'
  },
  {
    id: 'nave-vostok',
    title: 'La Nave Vostok 6',
    color: '#80DEEA',
    btnImage: '/assets/course/animales_pioneros/btn_vostok6.jpg',
    image: '/assets/course/animales_pioneros/hero_vostok6.jpg',
    content: [
      'La cápsula espacial Vostok 6, el vehículo que llevaría a Valentina Tereshkova a la historia, era una maravilla de la ingeniería soviética de la época, aunque espartana y peligrosa según los estándares modernos. Diseñada por la oficina de diseño OKB-1 bajo la dirección de Serguéi Koroliov, la nave constaba de un módulo de descenso esférico de aproximadamente 2.3 metros de diámetro y un módulo de equipamiento cónico que albergaba los motores de frenado y los sistemas de soporte vital periféricos. La forma esférica del módulo de descenso fue elegida por su simplicidad aerodinámica durante la reentrada, ya que no requería un sistema de control de actitud complejo para mantener una orientación específica al interactuar con las densas capas de la atmósfera terrestre.',
      'El interior de la Vostok 6 estaba dominado por un asiento eyectable masivo y altamente complejo, que ocupaba la mayor parte del volumen habitable. Este asiento no solo servía como puesto de pilotaje durante el vuelo, sino que era el componente crítico para la supervivencia de la cosmonauta durante la fase de aterrizaje. Debido al peso y al diseño del módulo de descenso, los paracaídas de la cápsula no podían ralentizarla lo suficiente para garantizar un impacto seguro con el suelo. Por lo tanto, a una altitud de aproximadamente 7 kilómetros, la escotilla se abría mediante cargas explosivas y Tereshkova debía ser eyectada de la nave, descendiendo el resto del trayecto con su propio paracaídas personal, un procedimiento altamente riesgoso.',
      'Los sistemas de control y navegación de la Vostok 6 estaban altamente automatizados, reflejando la filosofía de diseño soviética que prefería confiar en sistemas robóticos terrestres antes que en el pilotaje manual. La nave estaba controlada principalmente por secuenciadores electromecánicos y comandos enviados desde las estaciones de seguimiento en tierra. Sin embargo, Tereshkova disponía de un panel de instrumentos básico (el panel SIS) y un visor óptico (el Vzor) que le permitía alinear la nave manualmente para el encendido del motor retrocohete en caso de que los sistemas automáticos de reentrada fallaran. Esta capacidad de intervención manual era rudimentaria pero absolutamente vital como última línea de defensa contra un desastre orbital.',
      'El sistema de soporte vital de la Vostok 6 era una proeza de la química y la ingeniería neumática, diseñado para mantener a la cosmonauta viva en el entorno hostil del vacío espacial durante un máximo de diez días. Utilizaba compuestos químicos como el superóxido de potasio para absorber el dióxido de carbono exhalado y reponer simultáneamente el oxígeno consumido. La presión y la temperatura de la cabina estaban estrictamente reguladas, aunque las variaciones térmicas eran frecuentes. El traje espacial Sokol SK-2, diseñado específicamente para ajustarse a la anatomía femenina, proporcionaba una capa adicional de protección en caso de despresurización de la cabina, estando conectado continuamente a los suministros umbilicales de la nave.',
      'La misión Vostok 6 no se lanzó de forma aislada, sino que formó parte de un ambicioso vuelo conjunto con la nave Vostok 5, pilotada por Valery Bykovsky, que había sido lanzada dos días antes. Este complejo ballet orbital requería una precisión de cálculo de trayectorias asombrosa para la época. Las dos naves espaciales llegaron a aproximarse a tan solo 5 kilómetros de distancia relativa, permitiendo establecer comunicaciones por radio directas entre Tereshkova y Bykovsky. Esta hazaña no solo demostró la capacidad soviética para coordinar lanzamientos múltiples y realizar encuentros cercanos en órbita, sino que también sentó un precedente tecnológico crucial para las futuras misiones de acoplamiento espacial y la construcción de estaciones orbitales.'
    ],
    expandables: [
      { label: 'El Traje Sokol SK-2', icon: 'globe', text: 'El traje espacial Sokol SK-2 utilizado por Tereshkova fue el primer traje espacial de la historia diseñado específicamente para la anatomía femenina. A diferencia de los voluminosos trajes masculinos anteriores, este traje presurizado de color naranja intenso estaba meticulosamente ajustado para proporcionar comodidad en la ingravidez y facilitar la movilidad dentro del reducido espacio de la cápsula esférica Vostok. Estaba conectado a los sistemas de ventilación de la nave, pero contaba con reservas internas en caso de emergencia.' },
      { label: 'El Visor Óptico Vzor', icon: 'star', text: 'El "Vzor" era el principal instrumento óptico que permitía a la cosmonauta orientar la nave visualmente. Consistía en un complejo periscopio óptico situado frente al asiento del piloto. A través de él, Tereshkova podía ver el horizonte terrestre en todas las direcciones para asegurarse de que la cápsula estaba correctamente alineada en la posición de retrofrenado antes de encender los motores. Sin una alineación perfecta confirmada por el Vzor, el encendido del motor habría resultado fatal.' }
    ],
    fact: 'La Vostok 6 pesaba aproximadamente 4.7 toneladas en el momento del lanzamiento, lo que la convertía en una de las naves tripuladas más pesadas jamás puestas en órbita hasta ese momento, un testimonio del inmenso poder de levantamiento del cohete R-7 soviético en comparación con los cohetes Atlas estadounidenses contemporáneos.'
  },
  {
    id: 'orbita',
    title: 'El Vuelo y la Órbita',
    color: '#D4B872',
    btnImage: '/assets/course/animales_pioneros/btn_orbita_valentina.jpg',
    image: '/assets/course/animales_pioneros/hero_orbita_valentina.jpg',
    content: [
      'El 16 de junio de 1963, el cosmódromo de Baikonur fue testigo del ensordecedor rugido del cohete R-7 Semyorka que impulsó a Valentina Tereshkova hacia la órbita terrestre, marcando un hito imborrable en la historia de la humanidad. Durante el lanzamiento, Tereshkova experimentó fuerzas gravitacionales masivas y una vibración intensa mientras el cohete atravesaba las capas más densas de la atmósfera. Al alcanzar la órbita y experimentar la ingravidez por primera vez, pronunció su famoso indicativo de llamada: «Aquí Chaika (Gaviota). Veo el horizonte, una banda azul claro... ¡La Tierra es hermosa!». Estas palabras, transmitidas a millones de personas a través de la radio soviética, se convirtieron instantáneamente en el símbolo del triunfo y la valentía de la primera mujer en el espacio.',
      'Durante sus 70.8 horas en órbita, Tereshkova completó 48 impresionantes vueltas alrededor del planeta Tierra, superando en un solo vuelo el tiempo total combinado de todos los astronautas estadounidenses del programa Mercury hasta la fecha. A lo largo de la misión, se encargó de realizar un extenso programa de experimentos biomédicos y observaciones científicas. Mantuvo registros detallados en un cuaderno de bitácora, tomó numerosas fotografías de la atmósfera terrestre, las formaciones nubosas y los continentes, y operó sistemas manuales de la nave. Sus observaciones fotográficas de las capas de aerosoles atmosféricos fueron particularmente valiosas para la comunidad científica y contribuyeron a la comprensión de la dinámica de la atmósfera superior.',
      'Sin embargo, el vuelo estuvo lejos de ser una experiencia cómoda o exenta de sufrimiento físico. La ingravidez prolongada causó estragos en el sistema vestibular de Tereshkova, provocándole un severo mareo espacial o "enfermedad de adaptación espacial". Sufrió de náuseas constantes, fatiga extrema, fuertes dolores de cabeza y molestias severas debido a las rozaduras del arnés de su pesado traje espacial. A pesar del inmenso malestar físico, demostró una determinación estoica, negándose a abortar la misión prematuramente y continuando con sus tareas programadas lo mejor que pudo, ocultando la magnitud de su sufrimiento a los controladores de vuelo terrestres para garantizar el éxito percibido de la misión.',
      'Un incidente crítico y potencialmente letal ocurrió durante el segundo día de vuelo, cuando Tereshkova detectó un grave error en el programa de navegación automática de la Vostok 6. Los parámetros de reentrada estaban invertidos: en lugar de encender los retrocohetes para frenar y descender hacia la Tierra, el sistema estaba programado para acelerar la nave hacia una órbita más alta, lo que habría condenado a la cosmonauta a perecer lentamente por falta de oxígeno en el espacio profundo. Manteniendo la compostura, Tereshkova alertó discretamente a Serguéi Koroliov y al equipo de control de vuelo. Recibió nuevos datos matemáticos por radio y los introdujo manualmente en el sistema de navegación, corrigiendo el error y salvando su propia vida, un hecho que la URSS mantuvo en secreto durante décadas.',
      'El vuelo conjunto con la Vostok 5 de Bykovsky añadió una capa de complejidad técnica y asombro humano a la misión. Aunque no se acercaron lo suficiente para realizar maniobras de acoplamiento, la capacidad de comunicarse directamente entre dos naves en órbita constituyó un avance tecnológico significativo. Las conversaciones por radio entre "Chaika" (Gaviota) y "Yastreb" (Halcón), los respectivos indicativos de Tereshkova y Bykovsky, fueron monitorizadas en todo el mundo. Charlaron sobre su estado de salud, coordinaron observaciones de la superficie terrestre y cantaron canciones patrióticas soviéticas. Esta interacción pionera entre dos naves espaciales en vuelo independiente allanó el camino para las futuras y complejas operaciones de encuentro orbital de las décadas siguientes.'
    ],
    expandables: [
      { label: 'El Secreto Mortal', icon: 'zap', text: 'El error en el sistema de navegación que casi envía a Tereshkova al espacio profundo fue un secreto de estado celosamente guardado durante la Guerra Fría. Koroliov y Tereshkova pactaron no revelar el incidente para proteger el prestigio del programa espacial soviético. Solo tras la caída de la Unión Soviética, tres décadas después, Tereshkova rompió su silencio y reveló el pavoroso suceso en una conferencia de prensa, demostrando que su rápida intervención manual salvó la misión.' },
      { label: 'Fotografías Científicas', icon: 'star', text: 'A pesar del intenso malestar físico que sufría, Tereshkova se dedicó incansablemente a fotografiar el horizonte terrestre. Estas imágenes no eran meras instantáneas turísticas; proporcionaron la primera evidencia visual continua de la fina capa de aerosoles en la atmósfera superior. Esta información fue vital para los meteorólogos y físicos atmosféricos, ayudando a refinar los modelos climáticos primitivos y a comprender la dispersión de la luz en la alta atmósfera.' }
    ],
    fact: 'La palabra rusa "Chaika" significa "Gaviota". Tereshkova eligió este indicativo de llamada personalmente. Se convirtió en un apodo tan icónico que el famoso compositor soviético Eduard Kolmanovsky escribió una exitosa canción titulada "Muchacha-Gaviota" en su honor, celebrando su vuelo alrededor del mundo.'
  },
  {
    id: 'regreso',
    title: 'El Descenso y Regreso',
    color: '#3949AB',
    btnImage: '/assets/course/animales_pioneros/btn_descenso_valentina.jpg',
    image: '/assets/course/animales_pioneros/hero_descenso_valentina.jpg',
    content: [
      'La fase de descenso de la misión Vostok 6 fue el momento más crítico y peligroso de todo el vuelo espacial, requiriendo una precisión matemática absoluta y una sincronización impecable. Tras introducir manualmente los datos de navegación corregidos para evitar el error de programación que la habría enviado al espacio profundo, Tereshkova activó la secuencia de reentrada. El motor retrocohete principal TDU-1 se encendió con un rugido silencioso en el vacío, reduciendo la velocidad orbital de la cápsula y alterando su trayectoria para interceptar la atmósfera terrestre. Poco después, el módulo de equipamiento se separó del módulo de descenso esférico, aunque la separación fue inicialmente incompleta, causando que la nave girara violentamente hasta que el calor atmosférico quemó las correas umbilicales restantes.',
      'Al penetrar en las capas superiores de la atmósfera, la fricción hiperbólica transformó la cápsula Vostok 6 en un infierno envuelto en plasma ardiente. Las temperaturas en el exterior del escudo térmico superaron los miles de grados Celsius, mientras que las fuerzas de desaceleración gravitacional (fuerzas G) empujaban a Tereshkova brutalmente contra su asiento, dificultándole la respiración. A través de la escotilla carbonizada (el visor Vzor), la cosmonauta observó el espectáculo aterrador y hermoso del plasma ionizado de color rojo anaranjado lamiendo el exterior de la nave. Las comunicaciones por radio se cortaron temporalmente debido a la ionización del aire circundante, dejando a Tereshkova en un completo aislamiento durante los minutos más críticos del descenso balístico.',
      'Aproximadamente a siete kilómetros de altitud, con la cápsula en caída libre hacia la Tierra, comenzó la dramática secuencia final del aterrizaje. Las escotillas principales fueron voladas por cargas explosivas y el poderoso mecanismo del asiento eyectable se disparó con una fuerza estremecedora. Tereshkova fue catapultada fuera de la cápsula esférica hacia la gélida atmósfera de la alta troposfera. Segundos después, se desplegó su paracaídas principal, deteniendo su caída libre con una sacudida violenta. Mientras flotaba hacia el suelo, la cosmonauta tuvo que lidiar con fuertes vientos y la dificultad de orientarse sobre el paisaje desconocido que se abría bajo sus pies, todo ello mientras observaba la cápsula principal descendiendo bajo su propio paracaídas en la distancia.',
      'El aterrizaje de Tereshkova estuvo a punto de convertirse en una tragedia debido a las fuertes ráfagas de viento en la zona de descenso, situada en la región de Altái, cerca de la frontera actual entre Rusia y Kazajistán. Los vientos la arrastraron peligrosamente hacia un gran lago, y careciendo de la fuerza necesaria para maniobrar el pesado paracaídas del asiento eyectable de la Vostok, se preparó para un impacto en el agua, recordando el entrenamiento de supervivencia. Afortunadamente, una fuerte racha de viento sopló en el último segundo, desviando su trayectoria y haciéndola aterrizar abruptamente en tierra firme. El impacto fue brutal; se golpeó la cara con el grueso casco espacial, sufriendo un gran hematoma en la nariz, pero logró sobrevivir milagrosamente a su regreso a la Tierra.',
      'Tras el brusco aterrizaje, Tereshkova se encontró sola en una vasta estepa agrícola, a cientos de kilómetros de los equipos de recuperación oficiales soviéticos. Fue descubierta rápidamente por un grupo de asombrados campesinos locales, quienes la ayudaron a liberarse de su pesado traje espacial. Fiel a la hospitalidad de la región, los aldeanos la invitaron a comer pan, patatas y kumis (leche de yegua fermentada), a pesar de que el protocolo médico espacial prohibía estrictamente la ingesta de alimentos no autorizados antes de un examen médico completo. Cuando los helicópteros de rescate finalmente llegaron horas más tarde, las autoridades soviéticas reprendieron severamente a Tereshkova por violar el protocolo dietético y por alterar el lugar del aterrizaje, empañando brevemente la alegría del éxito monumental que acababa de lograr.'
    ],
    expandables: [
      { label: 'El Impacto Brutal', icon: 'zap', text: 'El aterrizaje con paracaídas desde las naves Vostok nunca fue suave. Tereshkova, exhausta tras tres días en órbita luchando contra el mareo espacial, apenas tenía fuerzas para controlar las cuerdas del inmenso paracaídas en los fuertes vientos de la estepa de Altái. Al tocar tierra, fue arrastrada por varios metros y el grueso visor de su casco le golpeó violentamente la nariz. El maquillaje pesado que usó en las fotografías oficiales posteriores tenía como único propósito ocultar este enorme hematoma a la prensa internacional.' },
      { label: 'Hospitalidad Campesina', icon: 'globe', text: 'Las rigurosas normas médicas de la Agencia Espacial Soviética exigían exámenes fisiológicos exhaustivos inmediatamente después del vuelo para evaluar los efectos de la ingravidez prolongada. Sin embargo, Tereshkova, hambrienta tras tres días comiendo solo pasta en tubos de aluminio, aceptó gustosamente la comida tradicional (pan negro y kumis) ofrecida por los campesinos que la encontraron. Esta infracción enfureció enormemente al Dr. Vladimir Yazdovsky, el director médico del programa espacial.' }
    ],
    fact: 'El lugar exacto del aterrizaje de la cápsula Vostok 6 está marcado hoy en día por un gran monumento conmemorativo de plata cerca de la aldea de Baevo en la región de Altái (Rusia). Tereshkova aterrizó a varios kilómetros de distancia de la propia cápsula debido al sistema de eyección independiente.'
  },
  {
    id: 'legado',
    title: 'El Legado de Valentina',
    color: '#2C3E50',
    btnImage: '/assets/course/animales_pioneros/btn_legado_valentina.jpg',
    image: '/assets/course/animales_pioneros/hero_legado_valentina.jpg',
    content: [
      'El impacto inmediato del vuelo de Valentina Tereshkova resonó a nivel mundial, convirtiéndola en un icono instantáneo del siglo XX y en una poderosa herramienta diplomática durante la Guerra Fría. Fue proclamada Héroe de la Unión Soviética, el más alto honor del estado, y emprendió giras internacionales multitudinarias, donde fue recibida por jefes de estado y multitudes entusiastas. Su figura fue utilizada hábilmente por la propaganda soviética para proyectar una imagen de igualdad, modernidad y superioridad ideológica sobre Occidente, argumentando que bajo el socialismo, las mujeres podían alcanzar las mismas alturas cósmicas que los hombres. Esta narrativa desafiaba directamente las convenciones sociales de Estados Unidos, que aún tardaría dos décadas en enviar a su primera mujer, Sally Ride, al espacio.',
      'A pesar del triunfo propagandístico colosal que representó la misión Vostok 6, el programa espacial soviético cerró abruptamente las puertas a las mujeres cosmonautas poco después del vuelo de Tereshkova. El escuadrón original de mujeres cosmonautas fue disuelto en 1969, tras años de frustración y misiones canceladas. La cúpula conservadora militar e ingenieril, liderada por figuras que dudaban de la idoneidad física y psicológica de las mujeres para vuelos de larga duración, impuso un prolongado hiato. Tereshkova fue encumbrada en un pedestal simbólico, pero se le prohibió volver a volar, ya que las autoridades soviéticas consideraban que su vida era demasiado valiosa políticamente para arriesgarla en futuras misiones experimentales del programa Soyuz.',
      'En el ámbito científico y de ingeniería, el vuelo de Tereshkova aportó datos biomédicos invaluables sobre la respuesta del cuerpo femenino al estrés prolongado de la ingravidez y las fuerzas extremas de la reentrada. La demostración de que una mujer sin entrenamiento previo como piloto de pruebas podía pilotar una nave espacial en órbita y ejecutar correcciones de navegación manual críticas obligó a reevaluar los criterios de selección de astronautas a nivel internacional. Sus fotografías de las capas de aerosoles de la atmósfera y las formaciones nubosas proporcionaron una de las primeras bases de datos empíricos globales para la naciente disciplina de la meteorología satelital, ayudando a los científicos a comprender mejor la dinámica climática de nuestro planeta desde una perspectiva orbital sin precedentes.',
      'El legado más duradero de Valentina Tereshkova trasciende la política de la Guerra Fría; reside en su poder de inspiración incalculable para generaciones de mujeres y niñas en todo el mundo, particularmente en los campos de la ciencia, la tecnología, la ingeniería y las matemáticas (STEM). Al romper la estratosfera y el techo de cristal simultáneamente, demostró empíricamente que la exploración del universo no es un dominio exclusivo del género masculino. Su nombre ha sido inmortalizado en la toponimia espacial; un gran cráter en la cara oculta de la Luna y el asteroide 1671 Chaika han sido bautizados en su honor. Esta perpetuación de su nombre en el firmamento asegura que su hazaña pionera no se desvanezca en la historia, sino que permanezca como un testamento astronómico a su valentía.',
      'Hoy en día, el vuelo de Valentina Tereshkova es reconocido universalmente no solo como un hito de la ingeniería espacial soviética, sino como un momento fundacional en la historia de la igualdad de género en la exploración espacial contemporánea. Aunque el camino hacia la paridad en las agencias espaciales internacionales ha sido lento y lleno de obstáculos burocráticos, los cimientos fueron indudablemente sentados por la misión Vostok 6 en 1963. Las mujeres astronautas actuales, que comandan la Estación Espacial Internacional y se preparan para las futuras misiones lunares del programa Artemis, continúan el linaje de exploración que Tereshkova inauguró hace más de seis décadas, recordándonos que el horizonte del descubrimiento humano no reconoce barreras terrenales ni prejuicios de género.'
    ],
    expandables: [
      { label: 'Un Letargo de Diecinueve Años', icon: 'clock', text: 'Tras el heroico vuelo de Tereshkova en 1963, el mundo tuvo que esperar casi dos décadas completas para ver a otra mujer cruzar la línea de Kármán hacia el espacio exterior. No fue hasta 1982 que Svetlana Savítskaya, otra brillante aviadora y cosmonauta soviética, rompió esta larga barrera volando a bordo de la estación espacial Salyut 7, lo que demuestra la profunda misoginia estructural que plagaba los programas espaciales de ambas superpotencias durante la Guerra Fría.' },
      { label: 'Reconocimiento Astronómico', icon: 'star', text: 'En la topografía lunar, el "Cráter Tereshkova" se encuentra majestuosamente situado en el Mare Moscoviense, en el lado oscuro de la Luna, una zona invisible desde la Tierra. Además, los astrónomos descubrieron un pequeño planeta menor en el cinturón principal de asteroides y lo denominaron "1671 Chaika", asegurando que el apodo radiofónico de Tereshkova orbitará alrededor de nuestro Sol durante miles de millones de años, inmortalizando su legado entre las estrellas.' }
    ],
    fact: 'En la ceremonia de apertura de los Juegos Olímpicos de Invierno de 2014 en Sochi, Rusia, Valentina Tereshkova fue una de las distinguidas portadoras de la bandera olímpica, demostrando que su estatus como heroína nacional y su influencia inspiradora permanecían intactas más de medio siglo después de su vuelo.'
  }
];

// --- Star Field Background (Cinematic Space) ---
function StarField() {
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
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.0005,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.05,
      color: Math.random() > 0.5 ? '216, 125, 74' : '128, 222, 234',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.drift;
        p.y -= 0.05;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
        
        // Soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity * 0.2)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// --- Cinematic Header ---
function PioneerHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(216,125,74,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 5 orbital markers */}
        {Array.from({ length: 5 }, (_, i) => {
          const t = (i + 0.5) / 5;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D87D4A','#80DEEA','#D4B872','#3949AB','#2C3E50'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <path d="M300 20 L305 35 L320 35 L308 45 L312 60 L300 50 L288 60 L292 45 L280 35 L295 35 Z" fill="none" stroke="#D87D4A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="42" r="14" fill="none" stroke="#D87D4A" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(216,125,74,0.2)" />
            <stop offset="50%" stopColor="rgba(216,125,74,0.9)" />
            <stop offset="100%" stopColor="rgba(216,125,74,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="90" textAnchor="middle" fill="#D87D4A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VALENTINA TERESHKOVA</text>
        <text x="300" y="110" textAnchor="middle" fill="rgba(216,125,74,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MISIÓN VOSTOK 6 (1963)</text>
      </svg>
    </div>
  );
}

// --- Organic Node Button ---
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
        border: `3px solid ${isActive ? node.color : 'rgba(216,125,74,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: `2px solid ${node.color}`,
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
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotPioneros"
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 8px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// --- Expandable Section ---
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
  star: Star,
  globe: Globe,
};

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem',
      borderRadius: '14px',
      border: `1px solid ${color}25`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}12` }}
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
            background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              borderLeft: `3px solid ${color}30`,
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

// --- Cinematic Content Panel ---
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
        background: 'rgba(10, 12, 18, 0.95)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        {/* Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
          }} />
        </div>

        {/* Title + Initial text */}
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
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

      {/* Body Section */}
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
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E18',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '✦' : '✧'}
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
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
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

// --- Progress Bar ---
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
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D87D4A, #80DEEA)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// --- Main Component ---
export default function InteractiveInfographic_PionerosM4() {
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
      background: 'url(/assets/course/animales_pioneros/banner_pioneros.jpg) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Contextual Background Image (§18) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: `url('/assets/course/animales_pioneros/bg_pioneros.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,18,0.85) 0%, rgba(15,18,25,0.9) 40%, rgba(10,12,18,0.95) 100%)',
        zIndex: 1,
      }} />

      <StarField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(216,125,74,0.15)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 18, 0.4)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(216,125,74,0.05)',
      }}>
        <PioneerHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        {/* Nodes Grid */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem',
          margin: '2rem 0',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Active Node Content */}
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

        {/* Completion Message & Bibliography */}
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              marginTop: '4rem',
              textAlign: 'center',
              padding: '3rem 2rem',
              background: 'linear-gradient(180deg, rgba(216,125,74,0.05) 0%, rgba(128,222,234,0.02) 100%)',
              borderTop: '1px solid rgba(216,125,74,0.3)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #D87D4A, transparent)' }} />
            
            <Globe size={48} color="#D87D4A" style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
            <h3 style={{
              color: '#fff', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 1rem',
              letterSpacing: '1px', textShadow: '0 0 15px rgba(216,125,74,0.4)',
            }}>
              ¡Exploración Histórica Completada!
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6,
            }}>
              Has analizado todos los aspectos técnicos, históricos y científicos del monumental vuelo de Valentina Tereshkova en la Vostok 6.
            </p>

            {/* Bibliography */}
            <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
              <h4 style={{
                color: '#80DEEA', fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1.5rem',
                borderBottom: '1px solid rgba(128,222,234,0.3)', paddingBottom: '0.5rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Globe size={18} />
                Bibliografía Científica e Histórica
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {BIBLIOGRAPHY.map((bib, i) => (
                  <li key={i} style={{
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6,
                    paddingLeft: '1.5rem', position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: '4px',
                      color: '#D4B872', fontSize: '0.7rem',
                    }}>■</span>
                    {bib}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
