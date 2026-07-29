'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya themed) ────────────────────────────
function DecoSerpentHead({ size = 70, color = '#FF6D00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 30 30 40 Q40 50 50 40 L55 45 L50 55 L10 55 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M10 40 L5 30 L15 25 L30 40" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="35" r="3" fill={color} opacity="0.6" />
      <path d="M40 45 Q45 40 50 45" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Feathers */}
      <path d="M15 25 Q20 15 10 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M20 28 Q30 18 20 15" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStaircase({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 55 L55 55 L55 45 L45 45 L45 35 L35 35 L35 25 L25 25 L25 15 L15 15 L15 5 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="15" y1="55" x2="15" y2="15" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="25" y1="55" x2="25" y2="25" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="35" y1="55" x2="35" y2="35" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <line x1="45" y1="55" x2="45" y2="45" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
    </svg>
  );
}

function DecoSunRays({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 15 * Math.cos(rad)} y1={30 + 15 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="2" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

function DecoTriangle({ size = 70, color = '#29B6F6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 10,50 50,50" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <polygon points="30,20 18,45 42,45" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <polygon points="30,30 25,40 35,40" fill={color} opacity="0.4" />
      {/* Light ray intersecting */}
      <line x1="0" y1="20" x2="60" y2="40" stroke={color} strokeWidth="1" opacity="0.7" strokeDasharray="4,2" />
    </svg>
  );
}

function DecoCalendarWheel({ size = 70, color = '#00C853', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner dots */}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
      {/* Divisions */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} x1={30 + 18 * Math.cos(rad)} y1={30 + 18 * Math.sin(rad)} x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)} stroke={color} strokeWidth="1" />
        );
      })}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'piramide-castillo': [DecoStaircase, DecoTriangle, DecoCalendarWheel],
  'equinoccio-serpiente': [DecoSerpentHead, DecoSunRays, DecoTriangle],
  'geometria-solar': [DecoSunRays, DecoTriangle, DecoStaircase],
  'calendario-piedra': [DecoCalendarWheel, DecoStaircase, DecoSunRays],
  'acustica-quetzal': [DecoSerpentHead, DecoTriangle, DecoCalendarWheel],
  'construccion-capas': [DecoStaircase, DecoTriangle, DecoSerpentHead],
  'patrimonio-mundial': [DecoCalendarWheel, DecoSunRays, DecoStaircase],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lubman, D. (1998). "An Archaeological Study of Chirped Echo from the Mayan Pyramid at Chichén Itzá", JASA, 104',
  'Carlson, J.B. (1999). "Pilgrimage and the Equinox Serpent of Light and Shadow Phenomenon at the Castillo", Archaeoastronomy, 14',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Ringle, W. et al. (1998). "The Return of Quetzalcoatl: Evidence for the Spread of a World Religion", Ancient Mesoamerica, 9',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'piramide-castillo',
    title: 'El Castillo',
    color: '#FF6D00',
    btnImage: '/assets/maya/infographic_m2/btn_piramide-castillo.jpg',
    image: '/assets/maya/infographic_m2/hero_piramide-castillo.jpg',
    content: [
      'La pirámide conocida como "El Castillo" se levanta majestuosa en el centro de Chichén Itzá. Imagina un edificio de 30 metros de altura, casi como un bloque de apartamentos de 10 pisos, pero construido hace unos mil años, alrededor del año 1000 d.C. No solo es una tumba o un templo común, es una obra maestra de la arquitectura monumental maya.',
      'Su estructura está formada por 9 terrazas escalonadas. En la cosmovisión maya, el universo tiene diferentes niveles, y estas 9 plataformas representan los 9 niveles del Xibalbá, el inframundo maya. Es como si la pirámide fuera un modelo a escala de todo su universo espiritual, construido bloque por bloque de piedra caliza, uniendo el cielo y el inframundo.',
      'Pero lo más asombroso de El Castillo son sus escaleras. Si las miras de cerca, verás que tiene escalinatas en sus cuatro lados. Cada escalera tiene 91 escalones. Si multiplicamos 91 por 4, nos da 364. Y si sumamos la plataforma superior del templo como el paso final, obtenemos exactamente 365, ¡el mismo número de días en un año solar!',
      'Esta pirámide es, de hecho, un inmenso calendario de piedra. Los mayas observaban el cielo con extrema precisión. Sin telescopios modernos, lograron calcular la duración del año solar (el Haab) con un margen de error mínimo comparado con nuestros cálculos actuales. Construyeron esta pirámide para demostrar su control sobre el tiempo y el espacio.',
      'Además, la ubicación de El Castillo no fue un accidente. Está posicionada con una desviación cuidadosa respecto al norte verdadero. Esta ligera rotación de la estructura permite que, en días específicos del año, el sol interactúe con la arquitectura de formas increíbles. Es un gigantesco reloj solar y un escenario para demostraciones astronómicas mágicas.',
    ],
    expandables: [
      { label: 'El Haab Maya', icon: 'clock', text: 'El calendario Haab de 365 días se dividía en 18 meses de 20 días cada uno (360 días), más un periodo final llamado "Wayeb" de 5 días. Durante el Wayeb, se creía que las barreras entre los mundos se debilitaban, por lo que era un tiempo de rituales y mucha precaución.' },
      { label: 'Un Nombre Español', icon: 'clock', text: 'El nombre "El Castillo" se lo dieron los conquistadores españoles en el siglo XVI porque la imponente estructura les recordaba a las fortalezas europeas. Sin embargo, para los mayas, este era el Templo de Kukulcán, el dios serpiente emplumada de la sabiduría y el viento.' },
    ],
    fact: 'En el interior de la pirámide principal que vemos hoy, ¡hay otra pirámide oculta más antigua! Es una práctica común en Mesoamérica: los gobernantes construían sus nuevos templos envolviendo y ampliando los edificios anteriores, como si fueran muñecas rusas gigantes hechas de piedra maciza y estuco.',
  },
  {
    id: 'equinoccio-serpiente',
    title: 'La Serpiente de Luz',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m2/btn_equinoccio-serpiente.jpg',
    image: '/assets/maya/infographic_m2/hero_equinoccio-serpiente.jpg',
    content: [
      'Dos veces al año, un espectáculo mágico ocurre en El Castillo. Ocurre durante los equinoccios de primavera y otoño, que suelen caer alrededor del 20 de marzo y el 22 de septiembre. Durante estas fechas, el día y la noche tienen exactamente la misma duración en todo el planeta. Es un momento de equilibrio cósmico.',
      'Al final de la tarde en estos días, a medida que el sol comienza a ponerse, sus rayos golpean la esquina noroeste de las 9 terrazas escalonadas de la pirámide. Esto proyecta una serie de sombras triangulares sobre la alfarda (el borde de piedra) de la escalinata norte. Imagina el sol actuando como un proyector de cine sobre una pantalla de piedra.',
      'Conforme el sol desciende en el horizonte, estas sombras forman un patrón exacto de 7 triángulos de luz y sombra. Estos triángulos parecen conectarse perfectamente con la enorme cabeza de serpiente de piedra tallada que se encuentra en la base de la escalinata. El efecto visual completo es el de una gigantesca serpiente luminosa bajando del cielo.',
      'Esta "Serpiente de Luz" es la manifestación de Kukulcán, la serpiente emplumada. Para los antiguos mayas, este evento visual era una señal divina. Kukulcán descendía del cielo a la tierra para bendecir las cosechas, marcar el inicio del ciclo agrícola de primavera, o anunciar el momento de las recolecciones en otoño. Era pura magia astronómica.',
      'El fenómeno es dinámico. No es solo una imagen estática. Comienza lentamente y a lo largo de aproximadamente tres horas, la serpiente parece deslizarse hacia abajo y ondulando por el costado de la pirámide a medida que cambia el ángulo del sol. ¡Es una película de animación en piedra impulsada por el movimiento de nuestro sistema solar!',
    ],
    expandables: [
      { label: 'Un Dios Viajero', icon: 'atom', text: 'Kukulcán es la versión maya del dios Quetzalcóatl de la cultura tolteca y azteca en el centro de México. Significa "Serpiente Emplumada", combinando al quetzal (el ave del cielo) y la serpiente (el animal de la tierra). Era un dios unificador en Mesoamérica.' },
      { label: 'Precisión Relojera', icon: 'clock', text: 'El evento no dura solo un día, sino que es visible durante varios días alrededor de las fechas de los equinoccios, pero alcanza su máxima perfección de 7 triángulos completos y perfectos exactamente en el día del equinoccio, dependiendo de las condiciones de las nubes.' },
    ],
    fact: 'El diseño es tan meticuloso que un pequeño error en el ángulo de inclinación de los muros de la pirámide, o en la orientación de sus esquinas respecto a la posición del sol en el ecuador, habría arruinado completamente el efecto. Los arquitectos mayas no solo entendían astronomía, dominaban la geometría 3D.',
  },
  {
    id: 'geometria-solar',
    title: 'Geometría Solar',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m2/btn_geometria-solar.jpg',
    image: '/assets/maya/infographic_m2/hero_geometria-solar.jpg',
    content: [
      '¿Cómo lograron los mayas que la luz formara exactamente la figura de una serpiente? No fue magia, fue una combinación maestra de matemáticas avanzadas, topografía, astronomía y geometría. El secreto está en cómo diseñaron y colocaron la pirámide en el terreno. Fue construida para jugar con la luz del sol como un espejo gigante.',
      'El Castillo no apunta exactamente al norte. Está rotado aproximadamente unos 20 grados al este del norte verdadero. Y esto es crucial: Chichén Itzá se encuentra en la latitud de 20 grados norte. Esta coincidencia matemática entre la latitud de la ciudad y el ángulo de construcción del edificio es el motor principal del fenómeno de luz y sombra.',
      'Además de la orientación, la forma de las terrazas es clave. Si miras las 9 plataformas desde arriba, notarás que no tienen paredes rectas. Las esquinas están diseñadas con formas redondeadas y ángulos precisos. Cuando la luz rasante del atardecer choca contra estos bordes específicos, proyecta esos 7 triángulos que forman el cuerpo de la serpiente.',
      'Piensa en ello como un rompecabezas tridimensional resuelto con sombras. El ángulo del sol debe ser exacto (equinoccio), la inclinación de las paredes de las terrazas debe ser exacta, y la pendiente de la alfarda de la escalera también debe estar en perfecta sincronía para "atrapar" esas sombras. Todo tuvo que calcularse antes de poner la primera piedra.',
      'Los constructores no usaron computadoras ni programas de diseño 3D. Observaron pacientemente los ciclos solares durante décadas o siglos desde observatorios como El Caracol (también en Chichén Itzá). Entendieron cómo se movían los astros y aplicaron ese conocimiento para diseñar su arquitectura sagrada.',
    ],
    expandables: [
      { label: 'Luz y Sombra', icon: 'clock', text: 'El uso de la luz y la sombra en la arquitectura antigua se llama "hierofanía", una revelación de lo sagrado a través de fenómenos físicos. Para los mayas, el sol no solo iluminaba, sino que hablaba y animaba a los dioses de piedra cuando se daban las alineaciones correctas.' },
      { label: 'Matemática Maya', icon: 'atom', text: 'Los mayas usaban un sistema matemático vigesimal (base 20) e inventaron el concepto del cero de forma independiente mucho antes que las culturas europeas. Su símbolo para el cero era una concha, lo que les permitía hacer cálculos astronómicos y calendáricos de enorme complejidad.' },
    ],
    fact: 'Debido a la precesión de los equinoccios (un bamboleo lento de la Tierra en su eje), la posición de las estrellas cambia con los milenios. Sin embargo, el fenómeno de la serpiente de luz se basa en el ciclo anual del sol, por lo que sigue funcionando hoy casi igual de bien que hace mil años cuando fue inaugurada la pirámide.',
  },
  {
    id: 'calendario-piedra',
    title: 'Calendario en Piedra',
    color: '#29B6F6',
    btnImage: '/assets/maya/infographic_m2/btn_calendario-piedra.jpg',
    image: '/assets/maya/infographic_m2/hero_calendario-piedra.jpg',
    content: [
      'Ya vimos que los 365 escalones de El Castillo simbolizan el año Haab, nuestro año solar. Pero la pirámide codifica mucha más información temporal. Es literalmente una computadora de piedra que calcula los ciclos cósmicos de los mayas. Imagina tener todo el sistema de cronometraje de una civilización tallado en la forma de tu edificio principal.',
      'Por ejemplo, las terrazas de la pirámide. Cada una de las 4 caras de la pirámide está dividida por la escalera central. Si observas los lados de las 9 terrazas, la escalera corta esas terrazas creando 18 secciones por cada cara de la pirámide. Estos 18 sectores representan los 18 meses (uinales) de 20 días que forman el calendario solar Haab.',
      'Pero hay otro calendario maya fundamental: el Tzolkín, o calendario sagrado, de 260 días (usado para rituales y para nombrar a las personas). Y luego está la Rueda Calendárica, que es el gran engranaje donde el Haab y el Tzolkín encajan. Un ciclo completo de la Rueda Calendárica dura 52 años solares. Esto era como su "siglo".',
      'Y aquí viene otro secreto de El Castillo: las fachadas de cada lado de la pirámide tienen grandes paneles decorativos tallados en la piedra. Si cuentas cuidadosamente estos paneles incrustados en la arquitectura, encontrarás que hay exactamente 52 tableros en cada lado del templo. Es decir, los 52 años que toma completar un ciclo mayor de la Rueda Calendárica.',
      'Toda la estructura es una inmensa ecuación. Números astronómicos y ciclos de tiempo están horneados en el diseño de las terrazas, paneles y escalones. Los mayas no solo construían para que se viera bien; diseñaban sus templos para que fueran monumentos perpetuos al tiempo mismo, funcionando en perfecta sincronía cósmica.',
    ],
    expandables: [
      { label: 'El Fuego Nuevo', icon: 'atom', text: 'El ciclo de 52 años era el más importante para los mesoamericanos. Al final de un ciclo, creían que el mundo podría acabar. Si el sol volvía a salir y las Pléyades cruzaban el cenit, celebraban la "Ceremonia del Fuego Nuevo", encendiendo hogueras para asegurar otros 52 años de vida y sol.' },
      { label: 'Dos Engranajes', icon: 'clock', text: 'Imagina el calendario Haab y el Tzolkín como dos grandes engranajes, uno con 365 dientes y otro con 260 dientes. Si haces girar ambos al mismo tiempo partiendo del mismo punto, tardarán exactamente 52 años solares (o 73 ciclos sagrados) en volver a alinearse en la misma posición inicial.' },
    ],
    fact: 'Además del Haab y el Tzolkín, los mayas usaban la "Cuenta Larga" para registrar fechas desde un punto de inicio mítico en el 3114 a.C. Esto les permitía fechar monumentos y estelas con una precisión que abarcaba miles de años, calculando eventos pasados y futuros con una notación numérica elegante de puntos y barras.',
  },
  {
    id: 'acustica-quetzal',
    title: 'Acústica del Quetzal',
    color: '#00C853',
    btnImage: '/assets/maya/infographic_m2/btn_acustica-quetzal.jpg',
    image: '/assets/maya/infographic_m2/hero_acustica-quetzal.jpg',
    content: [
      'Si alguna vez visitas El Castillo, probablemente verás a guías turísticos aplaudiendo frente a las grandes escalinatas. Esto no es solo para llamar la atención, es para demostrar uno de los efectos acústicos más extraordinarios del mundo antiguo. Al aplaudir frente a la pirámide, el edificio no te devuelve un simple eco de aplauso.',
      'El sonido que rebota desde los altos escalones de piedra se distorsiona de una forma muy peculiar. Escucharás un sonido agudo, metálico y reverberante que hace: "¡CHIRRP!". Este eco inusual suena idénticamente al canto del quetzal resplandeciente, el ave más sagrada del mundo maya y el símbolo alado del dios Kukulcán.',
      '¿Cómo es posible? Cuando las ondas de sonido del aplauso viajan hacia la pirámide, rebotan en los 91 escalones de piedra. Cada escalón está un poquito más lejos que el anterior. Esto significa que el sonido rebotado en los escalones más altos tarda un poco más en regresar a tus oídos que el sonido que rebota en los escalones bajos.',
      'Ese pequeño retraso continuo entre los múltiples ecos crea un efecto de "chirrido acústico". En acústica moderna, esto se llama una señal de frecuencia modulada o "chirp". Los científicos acústicos han grabado el eco de la pirámide y el canto real del quetzal y, al analizarlos en un espectrograma, descubrieron que las frecuencias y el patrón de las ondas son increíblemente similares.',
      '¿Fue intencional? Muchos expertos creen que sí. Los mayas no construyeron escalones de tamaño aleatorio. La altura y profundidad precisas de los peldaños de la escalinata norte fueron diseñadas no solo para proyectar las sombras de la Serpiente de Luz, sino para hacer que el edificio "cantara" con la voz del ave sagrada. ¡Arquitectura audiovisual mil años antes del cine!',
    ],
    expandables: [
      { label: 'El Ave Sagrada', icon: 'clock', text: 'El quetzal macho tiene largas plumas de cola color esmeralda que pueden medir más de un metro de largo. En la antigüedad, estas plumas valían más que el oro y se usaban para hacer los majestuosos penachos de los gobernantes mayas y aztecas. Era el ave de la libertad.' },
      { label: 'El Gran Juego de Pelota', icon: 'clock', text: 'Chichén Itzá tiene otro milagro acústico en su Gran Juego de Pelota. Un susurro en uno de los pequeños templos en los extremos puede escucharse claramente a más de 135 metros de distancia en el otro extremo, y los ecos allí rebotan hasta 7 veces debido a los altos muros paralelos.' },
    ],
    fact: 'El ingeniero acústico David Lubman presentó un estudio pionero sobre este eco en 1998, demostrando científicamente la asombrosa similitud entre el sonido del aplauso rebotado y la firma sónica de un quetzal. Esto cambió la forma en que los arqueólogos estudian la música y el sonido en las ruinas mesoamericanas.',
  },
  {
    id: 'construccion-capas',
    title: 'Construcción en Capas',
    color: '#D50000',
    btnImage: '/assets/maya/infographic_m2/btn_construccion-capas.jpg',
    image: '/assets/maya/infographic_m2/hero_construccion-capas.jpg',
    content: [
      'Al mirar El Castillo, estás viendo solo la capa más nueva de la cebolla arquitectónica. Como muchas estructuras importantes en Mesoamérica, esta pirámide fue construida sobre y alrededor de edificios más antiguos, sellándolos por completo en su interior en lugar de demolerlos. Los mayas literalmente "enterraban" sus viejos templos.',
      'En la década de 1930, un equipo de arqueólogos mexicanos realizó un trabajo detectivesco. Decidieron hacer túneles cuidadosos en la base de El Castillo para ver qué había dentro. Lo que encontraron fue espectacular: descubrieron una pirámide interior casi intacta (ahora conocida como la Subestructura), con sus propios escalones y su propio templo en la cima.',
      'Este templo interior, apodado "Kukulcán I", también tenía maravillas. En su sala principal, iluminada solo por linternas, los arqueólogos encontraron dos esculturas asombrosas que los mayas habían dejado allí hace siglos. Una era un Chac Mool (una figura de piedra reclinada que sostenía un recipiente para ofrendas) y la otra era el famoso Trono del Jaguar Rojo.',
      'El Trono del Jaguar es una escultura de piedra con la forma de un jaguar rugiendo, pintada de un rojo brillante. Lo más increíble es que sus manchas son incrustaciones de discos de jade real, de un color verde vibrante. Sus ojos y dientes también tienen decoraciones preciosas. Estaba escondido en el corazón oscuro de la pirámide.',
      'Esta práctica de construir en capas permitía a cada nuevo gobernante de Chichén Itzá demostrar su poder haciendo el templo principal aún más grande, mientras conservaba la santidad de los templos anteriores en el núcleo del edificio. Es una historia geológica artificial construida durante siglos por manos humanas.',
    ],
    expandables: [
      { label: 'Una Tercera Pirámide', icon: 'atom', text: '¡La historia no termina ahí! En 2015, utilizando tomografía eléctrica de resistividad 3D, ingenieros descubrieron que dentro de Kukulcán I hay AÚN OTRA pirámide más pequeña enterrada (Kukulcán 0). Es una muñeca rusa de tres capas que abarca la evolución completa de Chichén Itzá.' },
      { label: 'El Cenote Oculto', icon: 'atom', text: 'Ese mismo escaneo 3D reveló otro secreto profundo: toda la pirámide de El Castillo está construida directamente sobre un gran cenote oculto, un río o cueva subterránea llena de agua. Para los mayas, los cenotes eran las puertas principales al inframundo, haciendo del lugar el punto más sagrado posible.' },
    ],
    fact: 'El color original de la pirámide exterior no era del tono gris piedra que vemos hoy en día. ¡Estaba completamente cubierta de estuco y pintada de rojo intenso, con detalles en azul brillante y verde! En los días soleados del apogeo maya, este edificio enorme brillaba deslumbrante a kilómetros de distancia.',
  },
  {
    id: 'patrimonio-mundial',
    title: 'Patrimonio Mundial',
    color: '#D7CCC8',
    btnImage: '/assets/maya/infographic_m2/btn_patrimonio-mundial.jpg',
    image: '/assets/maya/infographic_m2/hero_patrimonio-mundial.jpg',
    content: [
      'Chichén Itzá es hoy uno de los sitios arqueológicos más famosos del mundo, y El Castillo es su joya más preciada. En 1988, la UNESCO reconoció la inmensa importancia cultural y arquitectónica de la antigua ciudad y la declaró oficialmente Patrimonio de la Humanidad. Esto significa que pertenece a la herencia de todo el planeta.',
      'Su fama global se disparó de nuevo en 2007, cuando decenas de millones de personas votaron alrededor del mundo para seleccionar las "Nuevas Siete Maravillas del Mundo Moderno". Chichén Itzá y su pirámide principal ganaron un lugar en esta prestigiosa lista, junto con maravillas como el Coliseo de Roma y la Gran Muralla China.',
      'Pero ser una maravilla mundial conlleva enormes desafíos. Cada año, casi 3 millones de turistas visitan Chichén Itzá, especialmente durante el fenómeno de la Serpiente de Luz en el equinoccio. Este enorme volumen de personas causa un gran desgaste en el sitio. La piedra caliza de los escalones, que ya tiene mil años, se gasta rápidamente con los pasos.',
      'Por esta razón, desde 2006, las autoridades prohibieron escalar la gran pirámide de El Castillo. Antes era común que la gente subiera por la estrecha y empinada escalinata, lo que también causaba accidentes peligrosos. Ahora, la estructura se puede admirar y fotografiar desde su base, garantizando su preservación para las futuras generaciones.',
      'Los esfuerzos de conservación son constantes. Los arqueólogos trabajan arduamente para limpiar el moho, reparar el estuco, y estudiar la estructura sin dañarla usando tecnologías modernas con lásers y escáneres de radar. Proteger El Castillo es asegurar que el conocimiento astronómico y la ingeniería brillante de los mayas nunca sean olvidados.',
    ],
    expandables: [
      { label: 'Redescubrimiento', icon: 'clock', text: 'Después de la caída del Imperio Maya, Chichén Itzá fue abandonada lentamente y la selva devoró los edificios. No fue hasta el siglo XIX, con exploradores como John Lloyd Stephens y Frederick Catherwood (quien hizo increíbles dibujos de las ruinas en 1843), que el mundo moderno se fascinó con el sitio.' },
      { label: 'Un Cielo para el Mañana', icon: 'clock', text: 'Además de conservar las ruinas de piedra, existe un movimiento para conservar el "Cielo Oscuro" alrededor de sitios astronómicos antiguos como este, reduciendo la contaminación lumínica urbana para que podamos seguir viendo las estrellas tal como los antiguos astrónomos mayas las veían.' },
    ],
    fact: 'En la década de 1920, la Institución Carnegie financió gran parte de las excavaciones y restauraciones iniciales de Chichén Itzá, trabajando con el gobierno mexicano. Un arqueólogo y diplomático pionero, Sylvanus Morley, dirigió estos enormes esfuerzos de excavación, desenterrando literalmente una de las grandes ciudades perdidas de la selva.',
  },
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '255,109,0' : '0,200,83', // orange or jade
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
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Header ──────────────────────────────────────────────────────
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,109,0,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FF6D00','#8D6E63','#FFD600','#29B6F6','#00C853','#D50000','#D7CCC8'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central icon */}
        <path d="M 285 30 L 315 30 L 300 10 Z" fill="none" stroke="#FF6D00" strokeWidth="1.5" opacity="0.6" />
        <path d="M 290 35 L 310 35 L 300 15 Z" fill="none" stroke="#FF6D00" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,109,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,109,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,109,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD600" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">KUKULCÁN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,109,0,0.8)" fontSize="12" fontFamily="monospace" letterSpacing="3">LA SERPIENTE DE LUZ</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,109,0,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
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
          layoutId="activeDotMayaM2"
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

// ─── Expandable Section with Random Direction ────────────────────────────────
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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

      {/* ─── Two-Column Hero Section ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        {/* Left: Hero Image */}
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
          }} />
        </div>

        {/* Right: Title + first 2 paragraphs */}
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* ─── Magazine Body ─── */}
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
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
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
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              color: node.color, fontSize: '1.1rem', margin: '0 0 1rem 0',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={18} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fun Fact Footer ─── */}
        {node.fact && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}30`,
            borderRadius: '16px',
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              width: '45px', height: '45px', borderRadius: '50%',
              background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, border: `1px solid ${node.color}40`,
            }}>
              <Star size={22} color={node.color} />
            </div>
            <div>
              <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '1rem' }}>Hecho Asombroso</h5>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const percent = Math.round((exploredIds.size / nodes.length) * 100);
  return (
    <div style={{
      width: '100%', maxWidth: '800px', margin: '0 auto 2rem',
      background: 'rgba(10,12,30,0.6)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px',
      padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
      position: 'relative', zIndex: 2,
    }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFD600', width: '45px' }}>{percent}%</span>
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: '#FFD600', borderRadius: '3px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {nodes.map((n, i) => (
          <button
            key={i}
            onClick={() => onSelect(n.id)}
            style={{
              width: '12px', height: '12px', borderRadius: '50%',
              border: 'none', cursor: 'pointer',
              background: exploredIds.has(n.id) ? n.color : 'rgba(255,255,255,0.2)',
              boxShadow: exploredIds.has(n.id) ? `0 0 5px ${n.color}` : 'none',
              transition: 'all 0.3s',
            }}
            title={n.title}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographic_MayaM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  const handleNodeClick = (id) => {
    setActiveNodeId(id);
    setExploredIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#050714',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <TimeTravelHeader />
        
        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onSelect={handleNodeClick} />

        {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Bibliography Section */}
        {!activeNode && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h4 style={{ color: '#FFD600', margin: '0 0 1rem', fontSize: '1rem', letterSpacing: '1px' }}>FUENTES Y BIBLIOGRAFÍA</h4>
            <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              {BIBLIOGRAPHY.map((bib, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{bib}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
