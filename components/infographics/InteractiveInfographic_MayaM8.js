'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Eclipses themed) ────────────────────────────

function DecoEclipse({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Corona rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 15 * Math.cos(rad)} y1={30 + 15 * Math.sin(rad)} x2={30 + 26 * Math.cos(rad)} y2={30 + 26 * Math.sin(rad)} stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />;
      })}
      {/* Sun glow */}
      <circle cx="30" cy="30" r="15" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Moon overlapping */}
      <circle cx="35" cy="30" r="14" fill="#000" opacity="0.8" />
      <circle cx="35" cy="30" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoJaguar({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized jaguar head */}
      <path d="M15 20 Q10 10 20 15 Q30 10 40 15 Q50 10 45 20 Q55 35 45 45 Q30 55 15 45 Q5 35 15 20 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      {/* Eyes */}
      <circle cx="23" cy="25" r="3" fill={color} opacity="0.5" />
      <circle cx="37" cy="25" r="3" fill={color} opacity="0.5" />
      <path d="M20 22 Q23 18 26 22" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M34 22 Q37 18 40 22" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Fangs */}
      <path d="M25 35 L27 42 L29 35 Z" fill={color} opacity="0.5" />
      <path d="M31 35 L33 42 L35 35 Z" fill={color} opacity="0.5" />
      {/* Spots */}
      <circle cx="18" cy="32" r="2" fill={color} opacity="0.4" />
      <circle cx="42" cy="32" r="2" fill={color} opacity="0.4" />
      <circle cx="20" cy="40" r="1.5" fill={color} opacity="0.4" />
      <circle cx="40" cy="40" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoMoonPhase({ size = 80, color = '#B0BEC5', style = {} }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 100 40" style={{ opacity: 0.22, ...style }}>
      <circle cx="15" cy="20" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M15 10 A10 10 0 0 1 15 30 A5 10 0 0 0 15 10" fill={color} opacity="0.5" />
      
      <circle cx="50" cy="20" r="12" fill={color} opacity="0.5" />
      <circle cx="50" cy="20" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      
      <circle cx="85" cy="20" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M85 10 A10 10 0 0 0 85 30 A5 10 0 0 1 85 10" fill={color} opacity="0.5" />
      
      <line x1="30" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="65" y1="20" x2="70" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoSarosCycle({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Infinity-like crossed orbits */}
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(-30 30 30)" />
      {/* Nodes */}
      <circle cx="13" cy="30" r="4" fill={color} opacity="0.6" />
      <circle cx="47" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Central body */}
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoDresdenGlyph({ size = 60, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Bar and dot numbers */}
      <rect x="15" y="40" width="30" height="6" rx="3" fill={color} opacity="0.6" />
      <rect x="15" y="50" width="30" height="6" rx="3" fill={color} opacity="0.6" />
      
      <circle cx="20" cy="25" r="4" fill={color} opacity="0.6" />
      <circle cx="30" cy="25" r="4" fill={color} opacity="0.6" />
      <circle cx="40" cy="25" r="4" fill={color} opacity="0.6" />
      
      <circle cx="30" cy="10" r="4" fill={color} opacity="0.6" />
      
      {/* Enclosing cartouche */}
      <rect x="5" y="0" width="50" height="60" rx="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'chiibal-kiin': [DecoJaguar, DecoEclipse, DecoMoonPhase],
  'tabla-eclipses-dresde': [DecoDresdenGlyph, DecoSarosCycle, DecoEclipse],
  'mecanismo-eclipses': [DecoSarosCycle, DecoMoonPhase, DecoEclipse],
  'prediccion-precisa': [DecoDresdenGlyph, DecoSarosCycle, DecoJaguar],
  'eclipse-lunar': [DecoMoonPhase, DecoEclipse, DecoJaguar],
  'registro-historico': [DecoDresdenGlyph, DecoJaguar, DecoMoonPhase],
  'ciencia-supersticion': [DecoEclipse, DecoJaguar, DecoSarosCycle],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Espenak, F. & Meeus, J. (2006). Five Millennium Canon of Solar Eclipses, NASA TP-2006-214141',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Lounsbury, F.G. (1978). Maya Numeration, Computation, and Calendrical Astronomy, DSB 15'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'chiibal-kiin',
    title: 'Chiibal K\'iin: El Sol Devorado',
    color: '#FFD54F',
    btnImage: '/assets/maya/infographic_m8/btn_chiibal-kiin.jpg',
    image: '/assets/maya/infographic_m8/hero_chiibal-kiin.jpg',
    content: [
      "Para los antiguos mayas, un eclipse solar no era un simple evento donde la Luna bloqueaba la luz. Lo llamaban 'Chiibal K\'iin', que significa literalmente 'el Sol devorado'. Imaginaban que criaturas gigantescas, como jaguares celestiales o serpientes estelares, daban mordiscos a nuestro astro rey en pleno día. Era un momento de mucho miedo porque el Sol era la fuente de toda la vida y el calor en su mundo.",
      'Imagina que estás jugando en el patio y, de repente, sin nubes, el cielo comienza a oscurecerse en pleno mediodía. Los pájaros dejan de cantar y los perros aúllan. Para un niño maya hace mil años, esto significaba que el mundo podía terminar. Creían que si el Sol era completamente comido por el jaguar cósmico, la oscuridad sería eterna y los monstruos bajarían a la Tierra para comerse a las personas.',
      'Por esta razón, cuando ocurría un eclipse, las ciudades mayas estallaban en ruido. Las personas golpeaban tambores de madera, hacían sonar caparazones de tortuga y gritaban al cielo. El objetivo era hacer tanto ruido como fuera posible para asustar al jaguar celestial y obligarlo a escupir al Sol. Es como cuando golpeas ollas para asustar a un animal salvaje que entra a tu jardín, pero a escala cósmica.',
      'Aunque la historia del jaguar suena a cuento de magia, la respuesta de los sacerdotes mayas fue muy científica. Decidieron que la única forma de proteger al Sol era saber exactamente cuándo el jaguar intentaría atacar. Comenzaron a registrar meticulosamente el movimiento del Sol y la Luna. Anotaban cada día, cada fase lunar y cada eclipse que veían. A lo largo de muchos años, acumularon montones de datos.',
      'Al mirar estos registros durante cientos de años, descubrieron patrones matemáticos. Se dieron cuenta de que los ataques del jaguar no eran aleatorios, sino que seguían reglas matemáticas estrictas. Convertir el miedo en matemáticas fue uno de los logros más grandes de la humanidad. Pasaron de gritarle al cielo a calcular las órbitas con una precisión que sorprende a los astrónomos modernos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La palabra maya "Chiibal" no solo se usaba para los eclipses. Es la misma raíz de la palabra usada cuando un perro o un jaguar muerde algo. Los mayas veían el cielo no como un espacio vacío, sino como una selva viva donde el Sol, la Luna y las estrellas eran animales poderosos que cazaban y eran cazados. Esta visión de un universo vivo y depredador era común en toda Mesoamérica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un eclipse solar ocurre porque la Luna, que es 400 veces más pequeña que el Sol, está exactamente 400 veces más cerca de la Tierra. Esto hace que, vistos desde nuestro planeta, ambos parezcan tener exactamente el mismo tamaño en el cielo. Esta increíble coincidencia geométrica es lo que permite que el pequeño disco de la Luna cubra completamente el enorme disco del Sol durante un eclipse total.' },
    ],
    fact: 'En el año 1991, hubo un eclipse solar total en México. Los arqueólogos notaron que algunas comunidades mayas modernas aún conservaban la tradición de hacer ruido golpeando metales y ollas para "ayudar" al Sol. Esto demuestra que la antigua memoria del Chiibal K\'iin ha sobrevivido durante más de mil años, transmitida de abuelos a nietos, manteniendo viva la historia del jaguar cósmico.',
  },
  {
    id: 'tabla-eclipses-dresde',
    title: 'El Códice de Dresde',
    color: '#C62828',
    btnImage: '/assets/maya/infographic_m8/btn_tabla-eclipses-dresde.jpg',
    image: '/assets/maya/infographic_m8/hero_tabla-eclipses-dresde.jpg',
    content: [
      'El Códice de Dresde es un libro maya antiguo, escrito en papel de corteza de árbol plegado como un acordeón. Es uno de los pocos libros mayas que sobrevivió a la conquista. En sus páginas 51 a 58, contiene algo espectacular: una tabla matemática diseñada específicamente para predecir eclipses. Es como un calendario del futuro, pero en lugar de marcar cumpleaños, marca los días en que el Sol está en peligro.',
      'Para entender cómo funciona, imagina que tienes un tren que da vueltas a una pista circular y anotas cuánto tarda en completar cada vuelta. Los astrónomos mayas hicieron lo mismo con la Luna. Descubrieron que 405 meses lunares (el tiempo de una Luna llena a la siguiente) duran exactamente 11,960 días. Este número mágico es la base de toda su tabla de eclipses y demuestra una capacidad de observación increíble.',
      'Pero, ¿por qué es tan importante este número? Porque 11,960 días también equivalen casi exactamente a 46 años sagrados mayas (llamados Tzolkin, que duran 260 días cada uno). Los mayas amaban que los ciclos cósmicos encajaran como piezas de Lego. Al alinear el ciclo de la Luna con su calendario sagrado, crearon un sistema perfecto para saber cuándo las órbitas crearían el peligro de un eclipse solar.',
      'Las páginas del códice están llenas de números escritos con puntos (que valen uno) y barras (que valen cinco). La tabla divide los 11,960 días en grupos más pequeños, generalmente de 177 o 148 días. Estos números no son aleatorios. Corresponden exactamente al tiempo que pasa entre las "estaciones de eclipses", que son los períodos en los que las órbitas de la Tierra y la Luna se cruzan en el ángulo correcto.',
      'Lo más brillante de esta tabla es que no predecía eclipses visibles individuales. Los mayas sabían que no todos los eclipses se ven desde su ciudad. La tabla predecía las "ventanas de peligro". Es como un pronóstico del clima que te advierte de la temporada de huracanes; no te dice si lloverá sobre tu casa hoy, pero te dice cuándo debes estar alerta. Era una herramienta de supervivencia cósmica y matemática.',
    ],
    expandables: [
      { label: 'En el Códice', icon: 'zap', text: 'El Códice de Dresde recibe su nombre porque se conserva en la ciudad de Dresde, en Alemania. Nadie sabe exactamente cómo llegó a Europa desde México, pero probablemente fue enviado como un regalo curioso al emperador Carlos V en el siglo dieciséis. Durante la Segunda Guerra Mundial, el libro casi fue destruido por una bomba, pero afortunadamente sobrevivió con daños menores.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'En la tabla de eclipses del Códice, hay dibujos (glifos) colgando de "bandas celestiales". Estos dibujos muestran imágenes muy gráficas del Sol y la Luna siendo tragados, o a la diosa de la muerte. Estas imágenes eran advertencias visuales para los sacerdotes sobre el tipo de peligro y el tipo de ritual que debían realizar para proteger al mundo de la oscuridad.' },
    ],
    fact: 'El sistema matemático maya usaba el concepto del cero cientos de años antes de que llegara a Europa. Usaban un dibujo de un caparazón de caracol para representar el cero. Además, su sistema era vigesimal (basado en veinte) en lugar de decimal (basado en diez) como el nuestro. Esto les permitía hacer cálculos gigantescos, como los 11,960 días de la tabla de eclipses, de manera muy compacta y eficiente.',
  },
  {
    id: 'mecanismo-eclipses',
    title: 'La Mecánica Oculta',
    color: '#0D47A1',
    btnImage: '/assets/maya/infographic_m8/btn_mecanismo-eclipses.jpg',
    image: '/assets/maya/infographic_m8/hero_mecanismo-eclipses.jpg',
    content: [
      'Imagina dos aros de hula-hula. Uno es la pista de la Tierra alrededor del Sol, y el otro es la pista de la Luna alrededor de la Tierra. Si ambos aros estuvieran perfectamente planos sobre una mesa, tendríamos un eclipse solar cada mes cuando la Luna pasara por el medio. Pero el aro de la Luna está ligeramente inclinado. La mayoría de los meses, la Luna pasa un poco por arriba o por abajo del Sol.',
      'Los puntos mágicos donde estos dos aros inclinados se cruzan se llaman "nodos". Para que ocurra un eclipse, la Luna debe estar cruzando uno de estos nodos exactamente al mismo tiempo que pasa entre la Tierra y el Sol. Esto es como intentar que dos trenes que viajan por vías diferentes lleguen a un cruce exactamente en el mismo segundo. Solo ocurre durante ciertas épocas del año llamadas "temporadas de eclipses".',
      'Aquí es donde entra el famoso Ciclo de Saros. Los astrónomos antiguos, tanto los babilonios como los mayas, descubrieron que la Tierra, la Luna y el Sol regresan casi exactamente a la misma posición geométrica cada 6,585.3 días (aproximadamente 18 años y 11 días). Después de este tiempo, el ciclo de eclipses se repite casi idéntico. Es como un bucle gigante en la coreografía de los astros.',
      'Lo asombroso de los mayas es que lograron calcular estas ventanas de peligro sin tener telescopios, sin saber que la Tierra era redonda, y sin entender que los planetas orbitan alrededor del Sol. Su método no era construir modelos físicos del sistema solar, sino encontrar los patrones matemáticos en el tiempo. Era pura ciencia de observación y aritmética, llevada a su nivel más alto posible.',
      'Piensa en ello como intentar entender las reglas de un videojuego súper complejo solo mirando la pantalla durante años, anotando cada vez que un enemigo aparece. Nunca ves el código de programación, pero descubres el patrón perfecto de cuándo atacar. Los mayas no conocían las leyes de la gravedad de Newton, pero sus números predecían el comportamiento de los planetas con precisión increíble.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'El .3 en los 6,585.3 días del ciclo de Saros es crucial. Es aproximadamente un tercio de día (8 horas). Debido a estas 8 horas extra, la Tierra gira un tercio de vuelta adicional antes del siguiente eclipse del ciclo. Por lo tanto, el mismo eclipse se repetirá 18 años después, pero será visible en una parte diferente del mundo, desplazado unos 120 grados hacia el oeste.' },
      { label: 'La coincidencia', icon: 'zap', text: 'Los mayas fueron muy afortunados. En el pasado remoto, la Luna estaba mucho más cerca de la Tierra y los eclipses totales eran muy comunes. En el futuro lejano, la Luna estará tan lejos que nunca podrá cubrir el Sol. Los humanos (y los mayas) existen en el punto exacto de la historia de la Tierra donde ambos discos miden exactamente medio grado en el cielo.' },
    ],
    fact: 'Las órbitas no son círculos perfectos, sino óvalos (elipses). Cuando la Luna está en su punto más alejado de la Tierra (apogeo) y pasa frente al Sol, no logra cubrirlo por completo. Esto deja un anillo de fuego brillante alrededor de la sombra lunar, conocido como eclipse anular. Los mayas también registraron estos eventos en sus tablas matemáticas con gran cuidado y respeto.',
  },
  {
    id: 'prediccion-precisa',
    title: 'Matemáticas Mayas vs El Mundo',
    color: '#311B92',
    btnImage: '/assets/maya/infographic_m8/btn_prediccion-precisa.jpg',
    image: '/assets/maya/infographic_m8/hero_prediccion-precisa.jpg',
    content: [
      'Para entender cuán buenas eran las matemáticas mayas, los científicos modernos pusieron a prueba la Tabla de Eclipses del Códice de Dresde. Descubrieron que su ciclo de 11,960 días tiene un error de apenas una fracción de día a lo largo de treinta y tres años. ¡Es un nivel de precisión asombroso para personas que hacían todos sus cálculos observando a simple vista y escribiendo en corteza de árbol!',
      'Al otro lado del mundo, en la antigua Mesopotamia, los astrónomos babilonios también descubrieron los ciclos de los eclipses. Usaban el Ciclo de Saros de 18 años. Los griegos antiguos aprendieron de los babilonios y construyeron la famosa Máquina de Anticitera, un ordenador de engranajes de bronce, para calcular los eclipses. Pero los mayas lograron algo similar estando completamente aislados.',
      'La astronomía maya se desarrolló de manera completamente independiente. Nunca conocieron a los babilonios, griegos o chinos. Inventaron su propia forma de matemáticas, su propio sistema de escritura y su propio calendario complejo. Que dos culturas separadas por océanos gigantescos llegaran a conclusiones matemáticas similares demuestra que las leyes de la naturaleza son universales y medibles.',
      'Un detalle fascinante de las tablas mayas es que incluyen "factores de corrección". Es como cuando tu reloj se atrasa un minuto cada mes, y tú aprendes a sumar un minuto al leer la hora. Los astrónomos mayas sabían que su sistema de 11,960 días no era infinitamente perfecto y se desfasaría con los siglos. Así que escribieron instrucciones matemáticas para ajustar y corregir la tabla en el futuro.',
      'Esta capacidad de auto-corregir sus matemáticas muestra que la ciencia maya no era estática. No era solo una religión rígida, sino un sistema dinámico. Los sacerdotes astrónomos eran verdaderos científicos que revisaban sus teorías, comparaban sus datos antiguos con las nuevas observaciones y ajustaban sus modelos matemáticos para que fueran más precisos. Era ciencia en estado puro.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El calendario sagrado maya, el Tzolkin de 260 días, encajaba perfectamente con las predicciones astronómicas porque un año de eclipses (el tiempo para que el Sol pase por ambos nodos de la órbita lunar) es de aproximadamente 346.6 días. Los mayas encontraron el mínimo común múltiplo entre estos extraños ciclos cósmicos y su calendario ritual.' },
      { label: 'En la historia', icon: 'zap', text: 'Fray Diego de Landa, un sacerdote español en el siglo dieciséis, quemó miles de libros mayas porque los consideraba "mentiras del diablo". Hoy, solo nos quedan cuatro códices mayas legibles en todo el mundo. Si no fuera por esta tragedia histórica, conoceríamos mucho más sobre los asombrosos cálculos astronómicos que estas mentes brillantes lograron realizar.' },
    ],
    fact: 'Un astrofísico moderno calculó que la predicción de la longitud del mes lunar hecha por los astrónomos mayas de la ciudad de Copán era de 29.53020 días. El valor moderno medido con satélites láser es de 29.53059 días. ¡Los mayas tenían un error de menos de un minuto por mes! Lograron esto contando los días entre cientos de lunas llenas a lo largo de décadas.',
  },
  {
    id: 'eclipse-lunar',
    title: 'Chiibal Uh: La Luna de Sangre',
    color: '#B0BEC5',
    btnImage: '/assets/maya/infographic_m8/btn_eclipse-lunar.jpg',
    image: '/assets/maya/infographic_m8/hero_eclipse-lunar.jpg',
    content: [
      'Mientras los eclipses solares eran aterradores por el día, los eclipses lunares traían su propio tipo de miedo mágico por la noche. Los mayas llamaban al eclipse lunar "Chiibal Uh", que significa "la mordida de la Luna". Durante un eclipse lunar total, la Tierra se pone exactamente entre el Sol y la Luna, proyectando una sombra gigante que cubre la cara brillante de nuestro satélite natural.',
      'Lo más dramático de un eclipse lunar total es que la Luna no desaparece por completo en la oscuridad. En lugar de volverse negra, se tiñe de un profundo color rojo oscuro, parecido al color del óxido o la sangre. Para los mayas, esta "Luna de Sangre" era una señal visual poderosa y aterradora. Imaginaban que el jaguar cósmico estaba masticando a la diosa de la Luna y haciéndola sangrar.',
      '¿Por qué se pone roja la Luna de verdad? Imagina que estás en la Luna mirando hacia la Tierra durante el eclipse. Verías a nuestro planeta como un círculo negro que tapa el Sol, pero alrededor del borde de la Tierra verías un anillo brillante de fuego. Ese anillo es la luz de todos los amaneceres y atardeceres del mundo ocurriendo al mismo tiempo. Esa luz rojiza es la que se refleja en la Luna.',
      'Debido a esta asociación con la sangre y las heridas en el cielo, los eclipses lunares impulsaban a los reyes mayas a realizar rituales de sacrificio. Sentían que, si los dioses celestiales estaban sangrando, los humanos debían ofrecer su propia sangre para mantener el equilibrio del universo. Los gobernantes realizaban ceremonias usando espinas de mantarraya para ofrendar pequeñas gotas sagradas.',
      'Curiosamente, los eclipses lunares son mucho más fáciles de ver que los solares. Un eclipse solar solo se puede ver desde una pequeña franja de sombra en la Tierra. Pero un eclipse lunar se puede ver desde cualquier lugar del mundo donde sea de noche. Por eso, los mayas tenían muchísimos más registros visuales de eclipses lunares para alimentar sus tablas matemáticas y mejorar sus cálculos.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'El fenómeno que tiñe la Luna de rojo se llama dispersión de Rayleigh. Es el mismo efecto óptico que hace que nuestro cielo sea azul durante el día y rojo al atardecer. La atmósfera de la Tierra actúa como una lente gigante que dobla la luz del Sol, filtrando los colores azules y dejando pasar solo la luz roja para bañar la superficie lunar.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La diosa maya de la Luna, Ixchel, era una de las figuras más poderosas de su religión. Se la asociaba con el agua, la fertilidad, los tejidos y los partos. Cuando ocurría un eclipse lunar, las mujeres embarazadas creían que el peligro cósmico podía causar malformaciones en sus bebés, por lo que usaban amuletos protectores de piedra roja.' },
    ],
    fact: 'Un eclipse lunar máximo puede durar hasta una hora y cuarenta y siete minutos en su fase de totalidad (cuando está completamente rojo). Este largo tiempo les daba a los sacerdotes mayas la oportunidad perfecta para encender hogueras en las pirámides, tocar los tambores sagrados y realizar cantos complejos antes de que la luz blanca regresara al satélite.',
  },
  {
    id: 'registro-historico',
    title: 'Piedras que Hablan del Cielo',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m8/btn_registro-historico.jpg',
    image: '/assets/maya/infographic_m8/hero_registro-historico.jpg',
    content: [
      'Los mayas no solo escribían en papel de corteza; también tallaban sus descubrimientos en grandes columnas de piedra llamadas estelas. Estas piedras son como los libros de historia o los noticieros de la ciudad, donde los reyes anunciaban sus victorias, cumpleaños y eventos astronómicos importantes. Al combinar fechas esculpidas con computadoras modernas, podemos comprobar la precisión de sus observaciones.',
      'Un ejemplo asombroso se encuentra en la antigua ciudad de Copán (en la actual Honduras). En un altar de piedra, tallaron una fecha que corresponde al calendario gregoriano moderno. Los astrónomos actuales corrieron sus programas de computadora hacia atrás en el tiempo y descubrieron que, exactamente en ese mismo día, un eclipse solar parcial oscureció los cielos sobre esa selva.',
      'Los reyes mayas a menudo usaban los eclipses para legitimar su poder. Si un rey sabía, gracias a sus matemáticos, que el Sol iba a ser "mordido", podía organizar una gran ceremonia pública en la plaza. En el momento exacto en que comenzaba la oscuridad, el rey ordenaba al jaguar cósmico que se alejara. Cuando la luz regresaba, el pueblo creía que el rey había salvado al mundo.',
      'El conocimiento era poder supremo. Los sacerdotes astrónomos eran la élite de la sociedad porque controlaban el calendario. Decían cuándo plantar el maíz, cuándo ir a la guerra y cuándo hacer ceremonias. Un error en la predicción de un eclipse podía costarle la cabeza al astrónomo, ya que indicaría que el rey había perdido su conexión divina con los dioses del cielo. Las matemáticas eran de vida o muerte.',
      'A través de la epigrafía (el estudio de leer los glifos antiguos), sabemos que los mayas conectaban eventos celestes con historias de sus antepasados. Si un eclipse ocurría cerca del aniversario de la muerte de un rey importante, decían que el espíritu de ese rey estaba peleando en el cielo. La astronomía y la historia política estaban tejidas en un mismo hilo mágico y exacto.',
    ],
    expandables: [
      { label: 'En las piedras', icon: 'zap', text: 'En la ciudad de Santa Elena, los arqueólogos encontraron un monumento que registra el ascenso al poder de un rey llamado "Jaguar Humeante". Lo fascinante es que la fecha tallada en la piedra para su coronación coincide perfectamente con un eclipse lunar visible en la región. El rey usó el espectáculo celestial como efectos especiales naturales para su ceremonia.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema de fechas mayas, llamado la Cuenta Larga, es tan preciso que puede especificar un solo día único dentro de un ciclo de 5,125 años. Es como decir "martes 14 a las 3 pm" pero sin que se repita nunca en miles de años. Esta exactitud extrema es la razón por la que hoy podemos relacionar sus monumentos de piedra con cálculos astronómicos de la NASA.' },
    ],
    fact: 'El mayor triunfo de la arqueoastronomía moderna ha sido usar los eclipses registrados en piedra para sincronizar el calendario maya antiguo con el calendario cristiano europeo. Dado que la astronomía moderna puede calcular la fecha exacta de un eclipse en el pasado a la hora y minuto exacto, estas piedras actúan como el ancla definitiva para datar toda la historia maya.',
  },
  {
    id: 'ciencia-supersticion',
    title: 'La Dualidad del Sabio Maya',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m8/btn_ciencia-supersticion.jpg',
    image: '/assets/maya/infographic_m8/hero_ciencia-supersticion.jpg',
    content: [
      'Al estudiar a los mayas, nos encontramos con un choque fascinante: ¿cómo podían ser científicos tan brillantes y matemáticos tan lógicos, y al mismo tiempo creer literalmente que un jaguar gigante se estaba comiendo al Sol? Para entender esto, debemos quitarnos nuestros lentes modernos y pensar como ellos. Para los mayas, la ciencia y la religión no eran cosas opuestas, eran exactamente lo mismo.',
      'Imagina que eres un detective intentando entender el comportamiento de un fantasma. Mides la temperatura, anotas la hora, calculas su velocidad. Usas métodos científicos rigurosos para estudiar algo sobrenatural. Los mayas hacían eso con el cosmos. Las matemáticas eran su herramienta para entender la mente de los dioses. Calcular la órbita de un planeta era como leer el diario íntimo de la deidad.',
      'El empirismo es la base de la ciencia moderna: recolectar datos reales observando el mundo cuidadosamente durante mucho tiempo. Los mayas fueron campeones del empirismo. Subían a lo alto de sus pirámides, que servían como observatorios gigantes, y usaban palos cruzados para medir las posiciones de las estrellas contra el horizonte, noche tras noche, siglo tras siglo. No inventaban los datos.',
      'Su método de recolección de datos era impecable y cien por ciento científico. Fue la interpretación de esos datos la que fue mitológica. Construyeron una teoría matemática perfecta sobre CÓMO se movían las luces en el cielo, pero su respuesta a POR QUÉ se movían involucraba monstruos, batallas y sangre. Esta mezcla de recolección de datos precisos y narrativa mágica es única en la historia antigua.',
      'Al final, el legado de la astronomía maya nos enseña una lección profunda. La inteligencia humana es universal. Hace mil años, en medio de la densa selva tropical, sin computadoras, lentes de cristal o metal forjado, la mente humana buscó patrones en el caos. Encontraron el ritmo matemático oculto en el miedo oscuro de un eclipse, y escribieron ese ritmo para la eternidad.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las famosas pirámides mayas no solo eran tumbas o templos; eran gigantescos instrumentos astronómicos de piedra. El edificio del Caracol en Chichén Itzá tiene ventanas estrechas alineadas perfectamente con los puntos donde se pone el Sol durante los equinoccios y donde Venus alcanza sus posiciones más extremas en el horizonte. ¡La arquitectura misma era un reloj!' },
      { label: 'Dato Científico', icon: 'atom', text: 'La diferencia entre astrología y astronomía: La astronomía mide y calcula las posiciones físicas y el movimiento real de los astros (ciencia maya fuerte). La astrología cree que esos astros controlan el destino de las personas (creencia maya fuerte). Hoy las separamos, pero para los mayas y casi todas las culturas antiguas, eran una sola disciplina sagrada.' },
    ],
    fact: 'El sistema matemático maya era tan avanzado que los sacerdotes podían predecir un eclipse que ocurriría muchos años después de su propia muerte. Escribían estos cálculos en los códices sabiendo que nunca vivirían para comprobarlos. Confiaban ciegamente en el poder de sus ecuaciones. Era un acto supremo de fe en la ciencia y un regalo de conocimiento para las futuras generaciones.',
  }
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
      hue: Math.random() > 0.5 ? '255,213,79' : '198,40,40', // gold or red
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

// ─── Maya Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,213,79,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFD54F','#C62828','#0D47A1','#311B92','#B0BEC5','#FF8F00','#212121'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central solar icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="8" fill="#FFD54F" opacity="0.5" />
        <path d="M 300 10 L 300 4 M 300 50 L 300 56 M 280 30 L 274 30 M 320 30 L 326 30 M 286 16 L 282 12 M 314 44 L 318 48 M 314 16 L 318 12 M 286 44 L 282 48" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,213,79,0.2)" />
            <stop offset="50%" stopColor="rgba(255,213,79,0.9)" />
            <stop offset="100%" stopColor="rgba(255,213,79,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD54F" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">ECLIPSES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,213,79,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">EL SOL DEVORADO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,213,79,0.2)'}`,
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
          layoutId="activeDotMaya"
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
        background: 'rgba(15, 10, 10, 0.92)',
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
              fontSize: '1.1rem', color: node.color,
              margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <ChevronRight size={18} /> Explorar Más
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fact Highlight ─── */}
        {node.fact && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(45deg, ${node.color}15, transparent)`,
            borderRadius: '16px',
            border: `1px solid ${node.color}30`,
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}>
                Dato Científico
              </span>
              <p style={{
                margin: '0.3rem 0 0', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.92rem', lineHeight: 1.7,
              }}>
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
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(255,213,79,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFD54F', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FFD54F, #C62828)', borderRadius: '3px', boxShadow: '0 0 8px rgba(255,213,79,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FFD54F', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM8() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
      setExplored(prev => new Set([...prev, nodeId]));
    }
  };

  const activeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      backgroundImage: 'linear-gradient(180deg, rgba(15,10,10,0.85) 0%, rgba(20,10,15,0.8) 40%, rgba(15,10,10,0.88) 100%), url(/assets/maya/infographic_m8/bg_maya_eclipses.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
        <MayaHeader />
        
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: '1.5rem', marginTop: '2rem',
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

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeData && (
            <ContentPanel
              key={activeData.id}
              node={activeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>
        
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#FFD54F', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Académicas
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Ampliación" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
