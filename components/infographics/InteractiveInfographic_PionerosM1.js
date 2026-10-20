'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Atom, BookOpen } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const BIBLIOGRAPHY = [
  "Bizony, P., & Doran, J. (1998). Starman: The Truth Behind the Legend of Yuri Gagarin. Bloomsbury Publishing.",
  "Burgess, C., & Hall, R. (2009). The First Soviet Cosmonaut Team: Their Lives and Legacies. Springer Praxis Books.",
  "Siddiqi, A. A. (2000). Challenge to Apollo: The Soviet Union and the Space Race, 1945-1974. NASA History Division.",
  "French, F., & Burgess, C. (2007). Into That Silent Sea: Trailblazers of the Space Era, 1961-1965. University of Nebraska Press.",
  "Roscosmos Historical Archives (2011). Vostok 1: The Official Technical and Medical Flight Report. State Space Corporation."
];

const INFOGRAPHIC_NODES = [
  {
    "id": "seleccion-primer-grupo",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_seleccion-primer-grupo.webp',
    diagramCaption: 'El primer grupo de cosmonautas soviéticos seleccionados para el programa Vostok en 1960',
    "title": "La Selección Secreta: El Grupo de Cosmonautas de 1960",
    "color": "#D4A843",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_seleccion.webp",
    "content": [
      "En el otoño de 1959, bajo el más riguroso secreto de estado en la Unión Soviética, una comisión médica militar examinó los historiales de más de tres mil pilotos de combate de aviones de reacción de las fuerzas aéreas en todas las regiones del país. Los criterios exigidos eran sumamente específicos: debían ser pilotos menores de treinta años, con salud física perfecta, estabilidad psicológica probada ante situaciones de combate y una estatura máxima de un metro con setenta centímetros para poder caber dentro de la compacta esfera de la nave Vostok.",
      "Tras exhaustivas pruebas en cámaras barométricas de baja presión, centrífugas de alta aceleración y ensayos de resistencia en cámaras de aislamiento sensorial absoluto donde los candidatos pasaban semanas en soledad y silencio completo, la lista se redujo a veinte pilotos extraordinarios. Entre ellos destacaba el teniente primero Yuri Alekséyevich Gagarin, hijo de un carpintero y una lechera de una granja colectiva en Klúshino, reconocido por su calma inquebrantable, brillante agudeza técnica y contagiosa sonrisa.",
      "En el verano de 1960, el ingeniero jefe Serguéi Koroliov formó el grupo de élite conocido como 'Los Seis de Vanguardia', quienes entrenaron directamente en los simuladores de vuelo de la nave Vostok en la Ciudad de las Estrellas, cerca de Moscú. Las evaluaciones médicas continuas revelaron que Gagarin presentaba una respuesta psicofisiológica sobresaliente: su ritmo cardíaco y presión arterial apenas variaban incluso cuando se le sometía a pruebas de desorientación espacial severa.",
      "Junto a su compañero de cuarto y gran amigo Gherman Titov, Gagarin fue llevado al Cosmódromo de Baikonur en abril de 1961. Aunque Titov poseía calificaciones académicas ligeramente superiores, Koroliov y la comisión estatal seleccionaron a Gagarin como piloto titular para la misión histórica no solo por su impecable pericia técnica, sino también por su carácter sereno, su temple ante la adversidad y su extraordinaria capacidad de comunicación con el pueblo.",
      "La elección de Gagarin reflejaba la filosofía del programa soviético: un joven talentoso surgido de las raíces obreras de la nación que encarnaba los valores de disciplina, rigor y valentía. La noche previa al lanzamiento, Gagarin durmió plácidamente durante siete horas continuas con los electrodos médicos fijados en su pecho, demostrando la prodigiosa compostura de un hombre que estaba a punto de cambiar el destino de la civilización."
    ],
    "fact": "Yuri Alekséyevich Gagarin fue seleccionado entre más de tres mil pilotos de combate de caza soviéticos tras superar extenuantes pruebas de centrifugado a 12 G, semanas en cámaras de aislamiento sensorial profundo y rigurosos exámenes termodinámicos en la Ciudad de las Estrellas, destacando por su serenidad y brillantez.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los criterios biomédicos de la comisión militar soviética exigían estrictamente una estatura menor a un metro con setenta centímetros y un peso inferior a setenta kilogramos debido al volumen restringido de la cabina habitable de la cápsula esférica Vostok, cuyo diámetro exterior medía apenas dos punto tres metros útiles."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante su primera visita de inspección a la maqueta de ingeniería de la nave Vostok en el complejo de diseño OKB-1 en 1960, Gagarin se quitó solemnemente las botas militares antes de subir al habitáculo, mostrando un respeto que impresionó de inmediato al diseñador jefe Serguéi Koroliov sobre todos los demás postulantes."
      }
    ]
  },
  {
    "id": "koroliov-diseno-r7",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_koroliov-diseno-r7.webp',
    diagramCaption: 'Serguéi Koroliov concibiendo la cápsula esférica Vostok y el cohete lanzador R-7',
    "title": "Koroliov y la Nave Vostok: Genio de la Ingeniería",
    "color": "#80DEEA",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_nave-vostok.webp",
    "content": [
      "La nave Vostok 1 fue concebida por el legendario ingeniero jefe Serguéi Pávlovich Koroliov en la oficina de diseño OKB-1. Se trataba de una maravilla de la ingeniería aeroespacial que constaba de dos secciones principales: una cápsula de descenso esférica de dos punto tres metros de diámetro revestida con una coraza ablativa de fibra de vidrio y resina, y un módulo de servicio cónico que albergaba el motor de frenado de retrocohete TDU-1 y los tanques de oxígeno y nitrógeno.",
      "El vehículo lanzador era el colosal cohete Vostok-K, una variante civil del misil balístico intercontinental R-7 'Semyorka'. Con cuatro propulsores laterales cónicos acoplados a una etapa central, el cohete desarrollaba un empuje de casi cuatrocientas toneladas métricas al momento del despegue, consumiendo queroseno de grado T-1 y oxígeno líquido a temperaturas criogénicas para acelerar la nave hasta alcanzar la velocidad de escape orbital de ocho kilómetros por segundo.",
      "Dado que la comunidad médica soviética temía que la ingravidez prolongada pudiera provocar psicosis, alucinaciones sensoriales o pérdida inmediata del conocimiento en el cosmonauta, la misión fue programada para funcionar en modo completamente automatizado mediante comandos de radio y temporizadores giroscópicos. El piloto no tenía acceso directo a los controles manuales de orientación durante las fases rutinarias del vuelo.",
      "No obstante, ante una eventualidad de emergencia o fallo en los sistemas de control automático, Koroliov insistió en dotar a Gagarin de un sistema de control manual alternativo. Para activarlo, el cosmonauta debía abrir un sobre sellado que contenía un código numérico secreto de tres dígitos (el número 125) e ingresarlo en un teclado lógico de seis teclas situado junto a su visor de navegación astronómica 'Vzor'.",
      "El diseño de la Vostok 1 priorizó la seguridad pasiva y la redundancia aerodinámica. Su forma perfectamente esférica garantizaba que, debido a su centro de gravedad desplazado, la cápsula se autoorientara por fuerzas aerodinámicas naturales durante el reingreso a la atmósfera densa, protegiendo al cosmonauta del calor extremo incluso si los sistemas eléctricos de propulsión de actitud fallaban por completo."
    ],
    "fact": "La cápsula Vostok 1 diseñada por Serguéi Koroliov poseía un perfil esférico autoalineable por gravedad pasiva durante el reingreso y resguardaba en un sobre sellado el código numérico secreto 125, el cual permitía a Gagarin desbloquear los mandos manuales de la consola Vzor si los algoritmos automáticos fallaban en órbita.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La esfera habitable de descenso Vostok tenía una masa de dos mil cuatrocientos sesenta kilogramos y contaba con un escudo térmico de protección ablativa fenólica capaz de disipar el flujo térmico mediante sublimación controlada a temperaturas superficiales que sobrepasaban con creces los dos mil quinientos grados centígrados."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La identidad de Serguéi Koroliov fue protegida bajo el más estricto secreto de estado por la Unión Soviética durante toda su vida operativa; la prensa internacional y los comunicados del Kremlin solo se referían a su persona como 'El Diseñador Jefe' para resguardar su seguridad frente a cualquier intento de sabotaje extranjero."
      }
    ]
  },
  {
    "id": "lanzamiento-baikonur-1961",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_lanzamiento-baikonur-1961.webp',
    diagramCaption: 'El histórico despegue del Vostok 1 el 12 de abril de 1961 al grito de «¡Poyéjaly!»',
    "title": "El Despegue Histórico: ¡Poyéjaly! (12 de Abril de 1961)",
    "color": "#E57373",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_nave-vostok.webp",
    "content": [
      "Al amanecer del miércoles 12 de abril de 1961, la estepa kazaja en el Cosmódromo de Baikonur amaneció despejada y fría. A las 06:07 hora universal (09:07 hora de Moscú), Yuri Gagarin se encontraba firmemente sujeto en el asiento eyectable de la Vostok 1 en la cima del cohete lanzador de treinta y ocho metros de altura. Por los auriculares de radio, Koroliov inició la secuencia final de ignición de los treinta y dos motores químicos de la nave.",
      "Cuando las llamaradas iluminaron la plataforma de lanzamiento y el cohete comenzó a elevarse lentamente venciendo la gravedad terrestre, Gagarin pronunció por radio una única palabra que resonaría por siempre en los anales de la humanidad: '¡Poyéjaly!' ('¡Vámonos!'). Con esa sencilla expresión de optimismo juvenil, el ser humano se desprendía por primera vez de la cuna terrestre para emprender el viaje hacia lo desconocido.",
      "Durante los primeros cinco minutos de ascenso acelerado a través de las capas atmosféricas, Gagarin experimentó una fuerza de empuje de hasta cinco G, que dificultaba su respiración y triplicaba el peso aparente de sus extremidades contra la litera de amortiguación. A pesar del estruendo ensordecedor y la violenta vibración de los motores, su pulso cardíaco apenas aumentó a ciento cincuenta latidos por minuto, manteniendo una comunicación constante y serena con la estación de control terrestre.",
      "A los diez minutos del despegue, se produjo la separación limpia de la etapa final del cohete lanzador. El rugido de los motores se apagó bruscamente y fue reemplazado por un silencio cósmico absoluto. La nave Vostok 1 ingresó en una órbita elíptica alrededor de la Tierra con un perigeo de ciento sesenta y nueve kilómetros y un apogeo de trescientos veintisiete kilómetros, viajando a la vertiginosa velocidad orbital de veintiocho mil doscientos sesenta kilómetros por hora.",
      "Gagarin miró a través del visor óptico de su escotilla y contempló un panorama que ningún ojo humano había presenciado jamás: la curvatura perfecta y luminosa de la Tierra recortada contra la infinita negrura del espacio profundo, envuelta por un finísimo y resplandeciente halo de atmósfera azul cobalto. 'La Tierra es azul... ¡Qué hermosa es!', exclamó emocionado por el canal de radio 'Zarya', transmitiendo el asombro de toda la especie humana."
    ],
    "fact": "A las 09:07 hora de Moscú del 12 de abril de 1961, Yuri Gagarin pronunció su célebre exclamación '¡Poyéjaly!' al encenderse los motores del cohete Vostok-K en Baikonur, alcanzando la órbita de inserción terrestre a una velocidad de 28,260 km/h en solo diez minutos de aceleración constante que alcanzaron los cinco G de empuje.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad orbital de la nave Vostok 1 (siete punto ocho kilómetros por segundo) contrarrestaba con exactitud milimétrica la aceleración de la gravedad terrestre, permitiendo que tanto el vehículo espacial como el cosmonauta entraran en un estado de caída libre continua o ingravidez a más de trescientos kilómetros de altura."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La palabra rusa '¡Poyéjaly!' (traducible como '¡Vámonos!' o '¡En marcha!') se arraigó de inmediato en el lenguaje popular de la cultura rusa y mundial como una expresión icónica para inaugurar proyectos científicos audaces, misiones espaciales ambiciosas y momentos decisivos que exigen valentía histórica y espíritu de progreso."
      }
    ]
  },
  {
    "id": "orbita-108-minutos",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_orbita-108-minutos.webp',
    diagramCaption: 'La órbita de 108 minutos: «La Tierra es azul, qué hermosa es»',
    "title": "La Órbita de 108 Minutos: El Hombre en el Cosmos",
    "color": "#BA68C8",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_orbita.webp",
    "content": [
      "El vuelo completo de la Vostok 1 tuvo una duración de exactamente ciento ocho minutos, de los cuales ochenta y nueve correspondieron a la órbita completa alrededor de la Tierra. Durante ese tiempo, Gagarin sobrevoló Siberia, cruzó la inmensidad del Océano Pacífico en diagonal, rodeó el extremo sur del continente americano por el Cabo de Hornos y ascendió nuevamente sobre el Atlántico y África hacia el territorio de la Unión Soviética.",
      "Una de las tareas científicas primordiales del cosmonauta era verificar cómo interactuaba el cuerpo humano con los objetos en microgravedad absoluta. Gagarin realizó el primer experimento de alimentación y deglución en el espacio comiendo puré de carne y salsa de chocolate en tubos presurizados de aluminio, y bebiendo agua tratada con un dosificador especial. Comprobó que el acto biológico de deglutir no dependía de la gravedad y que el sistema digestivo operaba con total normalidad.",
      "Asimismo, Gagarin anotó sus observaciones en su cuaderno de bitácora de vuelo con un lápiz común. En un momento memorable, cuando soltó el lápiz para ajustar un dial en el panel de control, observó con deleite cómo el objeto flotaba libremente en el aire de la cabina delante de sus ojos. Desafortunadamente, un tornillo suelto del cuaderno permitió que el lápiz flotara hacia un rincón inaccesible de la cabina, obligándolo a dictar el resto de sus observaciones en la grabadora de cinta magnetofónica de a bordo.",
      "La visión del ciclo día-noche desde el espacio dejó una huella imborrable en el piloto. En menos de hora y media, Gagarin presenció el crepúsculo más espectacular de su vida: la transición entre el día radiante y la noche cerrada ocurrió en apenas unos segundos, observando cómo el horizonte terrestre se teñía de una banda iridiscente de tonos naranja, rojo carmesí, azul zafiro y violeta profundo antes de sumergirse en la oscuridad estelar.",
      "Durante toda la órbita, los científicos en tierra supervisaron de forma ininterrumpida su frecuencia cardíaca, su respiración y su nivel de alerta mediante la red de estaciones de radio soviéticas. Gagarin no experimentó cinetosis espacial, desorientación espacial ni náuseas, demostrando que el cerebro humano conserva su plena agudeza intelectual, capacidad analítica y juicio crítico mientras viaja a través del vacío sideral."
    ],
    "fact": "En un recorrido orbital de ciento ocho minutos alrededor de la Tierra, Gagarin se convirtió en el primer ser humano en alimentarse con pastas nutritivas en tubos presurizados, beber líquidos en microgravedad y observar cómo los objetos flotaban en la cabina, confirmando la perfecta viabilidad de las funciones orgánicas humanas.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La trayectoria orbital elíptica de la Vostok 1 alcanzó un apogeo máximo de trescientos veintisiete kilómetros sobre la superficie marina, cruzando la termosfera inferior donde la densidad del gas atmosférico es de apenas una billonésima de la presión a nivel del mar, eliminando casi toda resistencia de frenado aerodinámico."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Mientras sobrevolaba la noche orbital sobre el Océano Pacífico, Gagarin contempló con asombro las auroras polares resplandeciendo por debajo del horizonte de la nave, describiendo por radio el espectáculo visual como inmensas cortinas iridiscentes de luz verde esmeralda y destellos de fuego dorado danzando sobre el planeta."
      }
    ]
  },
  {
    "id": "reingreso-eyeccion-paracaidas",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_reingreso-eyeccion-paracaidas.webp',
    diagramCaption: 'Reingreso y eyección a gran altitud: aterrizaje en paracaídas cerca del río Volga',
    "title": "Reingreso y Eyección: Los Minutos de Máximo Peligro",
    "color": "#FFB74D",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_regreso.webp",
    "content": [
      "A las 07:25 UTC, sobre la costa occidental de África, el sistema automático encendió el motor de frenado TDU-1 durante cuarenta segundos para desacelerar la nave e iniciar la maniobra de descenso. Inmediatamente después del frenado orbital, debía producirse la separación pirotécnica entre la cabina de descenso esférica y el módulo de servicio de instrumentos para permitir que la cápsula encarara la atmósfera con su escudo térmico.",
      "Sin embargo, ocurrió una peligrosa anomalía técnica: un haz de cables umbilicales de datos no se cortó por completo, manteniendo a ambas secciones unidas mientras la nave comenzaba a girar en un violento balanceo de una revolución por segundo. Gagarin experimentó un momento de extrema tensión mientras la nave descendía rápidamente hacia las capas densas de la atmósfera en una trayectoria irregular.",
      "Afortunadamente, el calor abrasador generado por la fricción del reingreso atmosférico fundió los cables de conexión a los ciento treinta kilómetros de altura, permitiendo que la esfera se separara bruscamente y se autoalineara con su escudo protector hacia adelante. Las ventanas de cuarzo de la escotilla se cubrieron de un fuego violeta y Gagarin soportó una desaceleración de hasta diez G mientras el aire exterior alcanzaba temperaturas superiores a los dos mil quinientos grados centígrados.",
      "A siete kilómetros de altitud, con la cápsula desacelerada por un paracaídas de frenado piloto a una velocidad subsónica, se ejecutó el procedimiento estándar del sistema Vostok: la escotilla de la cabina salió disparada por cargas pirotécnicas y el asiento de Gagarin fue eyectado al vacío propulsado por cohetes de combustible sólido, separándose del asiento segundos después para permitir que el cosmonauta descendiera colgado de su propio paracaídas personal.",
      "A las 08:05 UTC, Gagarin descendió suavemente en un campo cultivado cerca de la aldea de Smelovka, en la región de Sarátov, a orillas del río Volga. Las primeras personas en verlo fueron una campesina llamada Anna Tajtárova y su nieta Rita, quienes se asustaron al ver aproximarse a una figura vestida con un traje naranja brillante y un gran casco blanco. Gagarin se quitó el casco con una sonrisa y les dijo con calma: '¡No tengan miedo! Soy un ciudadano soviético como ustedes, vengo del cielo'."
    ],
    "fact": "Gagarin no aterrizó dentro de la esfera Vostok 1: se eyectó mediante cohetes de combustible sólido a siete mil metros de altitud y descendió con su paracaídas personal en un campo de trigo cercano a Smelovka, junto al río Volga, donde una campesina y su nieta fueron las primeras en contemplar su traje espacial naranja.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La disociación e ionización térmica del aire circundante durante el reingreso hipersónico a Mach 24 generó una densa envoltura de plasma ionizado que causó un apagón de comunicaciones por radio de varios minutos de duración, bloqueando por completo la telemetría telemétrica entre la nave Vostok y el cosmódromo de control."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La Unión Soviética mantuvo bajo reserva oficial el mecanismo de eyección y aterrizaje en paracaídas independiente de Gagarin durante varios años para asegurar la homologación internacional definitiva del récord aeronáutico ante la Federación Aeronáutica Internacional (FAI), que en esa época exigía aterrizar dentro de la nave."
      }
    ]
  },
  {
    "id": "telemetria-observaciones",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_telemetria-observaciones.webp',
    diagramCaption: 'Telemetría biomédica y primeras anotaciones manuscritas realizadas en ingravidez',
    "title": "La Telemetría y Respuestas Fisiológicas del Vuelo",
    "color": "#4DB6AC",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_orbita.webp",
    "content": [
      "Los datos biomédicos transmitidos por la nave Vostok 1 constituyeron el primer archivo médico completo de la fisiología humana en el espacio. El doctor Vladímir Yazdovsky y el equipo médico del Instituto de Medicina de Aviación analizaron miles de metros de registros electrocardiográficos, electromiogramas y patrones respiratorios registrados a lo largo de las distintas fases del vuelo de Gagarin.",
      "Durante la cuenta regresiva en Baikonur, el ritmo cardíaco en reposo de Gagarin era de sesenta y cuatro latidos por minuto, aumentando a ciento cincuenta y siete pulsaciones por minuto durante los minutos más críticos del empuje del cohete. Sorprendentemente, tan pronto como la nave entró en la serenidad de la microgravedad, su pulso se estabilizó de manera constante en noventa latidos por minuto, demostrando una rápida adaptación autonómica a la ausencia de peso.",
      "Los médicos espaciales descubrieron que la función cardiovascular humana no experimentaba la hipertrofia ni la hipotensión aguda que algunos investigadores habían pronosticado. La tensión arterial media se mantuvo en rangos seguros y los reflejos vestibulares no mostraron signos de nistagmo patológico ni distorsión en la coordinación mano-ojo al accionar los interruptores de la consola de a bordo.",
      "En cuanto a las funciones cognitivas superiores, la prueba de la grabadora de audio reveló que Gagarin mantuvo una articulación lingüística perfecta, un tono de voz firme y una memoria de trabajo impecable. Describió con exactitud meteorológica la distribución de frentes nubosos sobre los continentes, la luminosidad de los océanos y la nitidez de las sombras proyectadas por las cordilleras montañosas.",
      "Los informes biomédicos desclasificados décadas después confirmaron que la Vostok 1 representó un éxito biomédico absoluto. La información recopilada permitió diseñar los regímenes de entrenamiento, las dietas energéticas, los ejercicios físicos con bandas de resistencia y los protocolos médicos que hasta el día de hoy garantizan la salud de los cosmonautas y astronautas en la Estación Espacial Internacional."
    ],
    "fact": "Los registros biomédicos telemétricos de Gagarin demostraron empíricamente que la frecuencia cardíaca y la presión arterial de un ser humano se estabilizan rápidamente tras el choque inicial de la ingravidez, disipando para siempre los temores clínicos de que la microgravedad causaría un colapso cardiovascular irreversible.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El registro del sensor neumográfico torácico documentó una frecuencia respiratoria estable de dieciocho ciclos por minuto a lo largo de toda la órbita, demostrando que el diafragma, la mecánica ventilatoria y el intercambio gaseoso alveolar operan con absoluta normalidad sin la presencia de un gradiente de peso hidrostático."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Dentro de la pequeña ración de provisiones de supervivencia de la Vostok 1, los nutricionistas aeroespaciales incluyeron tubos especiales de jugo de grosella negra concentrado y puré de carne enriquecido con glucosa, permitiendo que Gagarin realizara la primera ingestión de alimentos en ingravidez de la historia astronáutica."
      }
    ]
  },
  {
    "id": "triunfo-legado-gagarin",
    diagramImage: '/assets/pioneros/infographic_m1/diagram_triunfo-legado-gagarin.webp',
    diagramCaption: 'El triunfo universal de Yuri Gagarin: el primer ser humano en navegar el cosmos',
    "title": "El Triunfo Universal: El Hombre que Unió al Planeta",
    "color": "#FFD54F",
    "btnImage": "/assets/pioneros/hub_yuri.webp",
    "image": "/assets/pioneros/hub_yuri.webp",
    "bannerImage": "/assets/pioneros/infographic_m4/banner_legado.webp",
    "content": [
      "El anuncio del vuelo de la Vostok 1 paralizó las transmisiones radiales y televisivas en todo el planeta. En una época marcada por las tensiones geopolíticas de la Guerra Fría, la proeza de Gagarin trascendió las fronteras ideológicas para convertirse en una fiesta y un orgullo universal de toda la especie humana. Desde Londres y París hasta Tokio, Nueva York y La Habana, millones de ciudadanos salieron espontáneamente a las calles con carteles que decían '¡Bravo Yuri!' y '¡El Hombre en el Cosmos!'.",
      "Dos días después del vuelo, Moscú recibió a Gagarin con el desfile popular más gigantesco de su historia. Millones de personas arrojaron flores sobre su automóvil descapotable en la Plaza Roja y el gobierno le otorgó la máxima condecoración de Héroe de la Unión Soviética y la Orden de Lenin. Sin embargo, lo que cautivó al mundo entero no fue el poderío militar, sino la genuina sencillez, humildad y simpatía del joven piloto.",
      "En los meses siguientes, Gagarin emprendió la llamada 'Misión de Paz', una gira diplomática internacional que lo llevó a más de treinta países en todos los continentes. Fue recibido por jefes de estado, reinas, científicos y millones de escolares. En el Reino Unido, la Reina Isabel II rompió el protocolo real para tomarse una fotografía con él, declarando que Gagarin no pertenecía a un país, sino al mundo entero.",
      "El impacto del vuelo de Gagarin catalizó de inmediato la carrera espacial moderna. Apenas seis semanas después de la hazaña soviética, el presidente estadounidense John F. Kennedy pronunció su histórico discurso ante el Congreso anunciando la meta nacional de llevar un ser humano a la Luna y devolverlo sano y salvo antes del término de la década de 1960, acelerando un período sin precedentes de desarrollo científico.",
      "Aunque Yuri Gagarin falleció trágicamente en un accidente de aviación durante un vuelo de entrenamiento en un caza MiG-15 en 1968 a la temprana edad de treinta y cuatro años, su memoria permanece viva como el símbolo supremo de la exploración del cosmos. El 12 de abril fue proclamado por la Asamblea General de las Naciones Unidas como el Día Internacional de los Vuelos Espaciales Tripulados y 'La Noche de Yuri', recordándonos por siempre el día en que la humanidad tocó las estrellas."
    ],
    "fact": "La gesta de Gagarin inspiró a la Asamblea General de la ONU a instituir el 12 de abril como el Día Internacional de los Vuelos Espaciales Tripulados y la celebración de 'La Noche de Yuri', conmemorando el histórico amanecer en que un joven hijo de campesinos obreros cruzó las fronteras del planeta para guiar a toda la humanidad.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El triunfo del vuelo de la Vostok 1 impulsó directamente el desarrollo tecnológico de los programas de exploración Apolo de la NASA y Soyuz soviético, catalizando una inversión internacional sin precedentes en metalurgia avanzada, computación digital de estado sólido, sensores miniaturizados y ciencias de propulsión de cohetes."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante el primer alunizaje humano en el Mar de la Tranquilidad en julio de 1969, los astronautas del Apolo 11 Neil Armstrong y Buzz Aldrin depositaron solemnemente en la superficie lunar una medalla de tributo a Yuri Gagarin y Vladímir Komarov, demostrando que la hermandad y el respeto científico trascienden las fronteras terrestres."
      }
    ]
  }
];

export default function InteractiveInfographic_PionerosM1() {
  const [selectedNode, setSelectedNode] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBiblio, setShowBiblio] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpandable = (nodeId, index) => {
    const key = `${nodeId}-${index}`;
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const node = INFOGRAPHIC_NODES[selectedNode];

  return (
    <div ref={containerRef} style={{
      background: 'radial-gradient(ellipse at 50% 20%, #1a1a2e 0%, #0d0d15 60%, #050508 100%)',
      minHeight: '100vh',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '16px 8px' : '32px 16px',
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 40 }}>
        <span style={{
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          fontWeight: 700,
          color: '#D4A843',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 8,
        }}>
          MÓDULO: PIONEROS_GAGARIN
        </span>
        <h1 style={{
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          margin: 0,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          Yuri Gagarin y la Vostok 1: El Primer Vuelo Orbital
        </h1>
      </header>

      {/* Selector de Nodos Circulares */}
      <div style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 12 : 20,
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? 16 : 32,
        paddingLeft: isMobile ? 8 : 0,
        paddingRight: isMobile ? 8 : 0,
        scrollbarWidth: 'none',
      }}>
        {INFOGRAPHIC_NODES.map((n, idx) => {
          const isSelected = idx === selectedNode;
          return (
            <button
              key={n.id}
              onClick={() => setSelectedNode(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: isMobile ? 76 : 116,
                height: isMobile ? 76 : 116,
                borderRadius: '50%',
                padding: 3,
                background: isSelected
                  ? `linear-gradient(135deg, ${n.color}, #ffffff)`
                  : 'rgba(255,255,255,0.1)',
                boxShadow: isSelected
                  ? `0 0 20px ${n.color}80`
                  : 'none',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0a0a14',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={n.btnImage}
                    alt={n.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <span style={{
                fontSize: isMobile ? '0.78rem' : '0.86rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? n.color : '#94a3b8',
                marginTop: 8,
                maxWidth: isMobile ? 90 : 128,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {n.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${node.color}30`,
            borderRadius: 24,
            padding: isMobile ? 20 : 36,
            backdropFilter: 'blur(16px)',
            boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${node.color}15`,
          }}
        >
          {/* Banner Panoramico si existe */}
          {node.bannerImage && (
            <div style={{
              width: '100%',
              height: isMobile ? 180 : 280,
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 28,
              position: 'relative',
              cursor: 'zoom-in',
            }} onClick={() => setLightboxSrc(node.bannerImage)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.bannerImage}
                alt={node.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%)',
              }} />
            </div>
          )}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

          {/* Titulo con Mini-Avatar Circular */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <span style={{
              display: 'inline-block',
              width: 36,
              height: 36,
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2px solid ${node.color}`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.btnImage}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </span>
            <h2 style={{
              fontSize: isMobile ? '1.4rem' : '1.85rem',
              fontWeight: 800,
              color: node.color,
              margin: 0,
              lineHeight: 1.25,
            }}>
              {node.title}
            </h2>
          </div>

          {/* Layout 1fr 1fr con Hero Image y Texto */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 24 : 36,
            alignItems: 'start',
            marginBottom: 28,
          }}>
            {/* Hero Image */}
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${node.color}40`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                cursor: 'zoom-in',
                position: 'relative',
                maxHeight: 400,
              }}
              onClick={() => setLightboxSrc(node.image)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.image}
                alt={node.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Primeros 2 Parrafos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {node.content.slice(0, 2).map((para, i) => (
                <p key={i} style={{
                  fontSize: isMobile ? '0.92rem' : '1rem',
                  lineHeight: 1.75,
                  color: '#cbd5e1',
                  margin: 0,
                  textAlign: 'justify',
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Parrafos restantes (3, 4, 5) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {node.content.slice(2).map((para, i) => (
              <p key={i + 2} style={{
                fontSize: isMobile ? '0.92rem' : '1rem',
                lineHeight: 1.75,
                color: '#cbd5e1',
                margin: 0,
                textAlign: 'justify',
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Fact Destacado */}
          {node.fact && (
            <div style={{
              background: `linear-gradient(135deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              borderRadius: '0 16px 16px 0',
              padding: '16px 20px',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Sparkles size={18} color={node.color} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: node.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hecho Histórico Clave
                </span>
              </div>
              <p style={{ fontSize: isMobile ? '0.9rem' : '0.95rem', lineHeight: 1.65, color: '#f1f5f9', margin: 0, fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          )}

          {/* Expandables */}
          {node.expandables && node.expandables.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              {node.expandables.map((exp, idx) => {
                const isExpanded = !!expandedSections[`${node.id}-${idx}`];
                return (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.03)',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => toggleExpandable(node.id, idx)}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        color: '#f8fafc',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {exp.icon === 'atom' ? (
                          <Atom size={18} color={node.color} />
                        ) : (
                          <Sparkles size={18} color={node.color} />
                        )}
                        <span>{exp.label}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: '#94a3b8',
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ padding: '0 18px 16px 18px' }}
                        >
                          <p style={{
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            color: '#94a3b8',
                            margin: 0,
                            paddingTop: 8,
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                          }}>
                            {exp.text}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bibliografia Colapsable */}
      <div style={{ maxWidth: 1100, margin: '36px auto 0', padding: '0 16px' }}>
        <button
          onClick={() => setShowBiblio(!showBiblio)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '10px 18px',
            color: '#94a3b8',
            fontSize: '0.85rem',
            cursor: 'pointer',
            margin: '0 auto',
            transition: 'all 0.2s',
          }}
        >
          <BookOpen size={16} />
          <span>{showBiblio ? 'Ocultar Referencias Bibliográficas' : 'Ver Referencias Bibliográficas'}</span>
          <ChevronDown
            size={16}
            style={{
              transform: showBiblio ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
        {showBiblio && (
          <div style={{
            marginTop: 16,
            padding: 20,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.8 }}>
              {BIBLIOGRAPHY.map((b, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />
    </div>
  );
}
