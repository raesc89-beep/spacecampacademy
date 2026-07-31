'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Astronomy themed) ─────────────────────────

function DecoPleiades({ size = 70, color = '#E8EAF6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {[
        {x: 30, y: 15, r: 2.5}, {x: 45, y: 22, r: 3}, {x: 20, y: 25, r: 2},
        {x: 35, y: 35, r: 3.5}, {x: 15, y: 40, r: 2.5}, {x: 28, y: 48, r: 2}, {x: 48, y: 45, r: 2.5}
      ].map((star, i) => (
        <g key={i}>
          <circle cx={star.x} cy={star.y} r={star.r} fill={color} opacity="0.8" />
          <path d={`M${star.x} ${star.y - star.r - 2} L${star.x} ${star.y + star.r + 2} M${star.x - star.r - 2} ${star.y} L${star.x + star.r + 2} ${star.y}`} stroke={color} strokeWidth="1" opacity="0.5" />
        </g>
      ))}
      <path d="M 30 15 Q 45 22 35 35 Q 28 48 15 40 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2,2" />
    </svg>
  );
}

function DecoRattlesnake({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M15 45 Q 25 35 35 45 Q 45 55 55 45" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {[35, 42, 49, 56].map((x, i) => (
        <rect key={i} x={x} y="41" width="4" height="8" rx="1" fill={color} opacity="0.8" transform={`rotate(${i*5} ${x} 45)`} />
      ))}
      <path d="M 5 25 Q 15 15 25 25 L 15 45 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="15" cy="22" r="1.5" fill={color} />
      <path d="M 5 25 Q -5 25 -5 15" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoRainCloud({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 15 30 Q 15 20 25 20 Q 30 10 40 15 Q 50 15 50 25 Q 55 25 55 35 Q 55 40 45 40 L 15 40 Q 5 40 5 30 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      {[
        {x: 15, y: 45}, {x: 25, y: 42}, {x: 35, y: 46}, {x: 45, y: 43}
      ].map((drop, i) => (
        <line key={i} x1={drop.x} y1={drop.y} x2={drop.x - 3} y2={drop.y + 6} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      ))}
    </svg>
  );
}

function DecoCornField({ size = 70, color = '#F9A825', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <line x1="30" y1="55" x2="30" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M 30 45 Q 20 40 15 30 Q 25 35 30 45" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M 30 35 Q 40 30 45 20 Q 35 25 30 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="25" cy="25" rx="3" ry="8" fill={color} opacity="0.5" transform="rotate(-15 25 25)" />
      <ellipse cx="35" cy="15" rx="3" ry="8" fill={color} opacity="0.5" transform="rotate(15 35 15)" />
    </svg>
  );
}

function DecoFireCeremony({ size = 70, color = '#6D4C41', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 45 L 30 15" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M 15 45 Q 30 55 45 45" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M 25 35 Q 30 25 25 15 Q 35 25 35 35 Z" fill={color} opacity="0.5" />
      <circle cx="25" cy="20" r="1" fill={color} opacity="0.8" />
      <circle cx="35" cy="18" r="1.5" fill={color} opacity="0.8" />
      <circle cx="32" cy="10" r="1" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'tzab-ek-nombre': [DecoPleiades, DecoRattlesnake, DecoCornField],'paso-cenital': [DecoRainCloud, DecoPleiades, DecoRattlesnake],'calendario-agricola': [DecoCornField, DecoRainCloud, DecoPleiades],'nueva-cuenta-fuego': [DecoFireCeremony, DecoPleiades, DecoRattlesnake],'astronomia-precisa': [DecoPleiades, DecoCornField, DecoRattlesnake],'cascabel-cosmico': [DecoRattlesnake, DecoRainCloud, DecoPleiades],'culturas-comparadas': [DecoCornField, DecoFireCeremony, DecoPleiades],
}; const BIBLIOGRAPHY = ['Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Tedlock, D. (1996). Popol Vuh: The Definitive Edition of The Mayan Book of the Dawn of Life, Simon & Schuster',
  'MalmstrÃƒÂ¶m, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press',
  'Ã…Â prajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica del Centro de México, INAH',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tzab-ek-nombre',
    title: 'Tzab-ek: La Serpiente',
    color: '#E8EAF6',
    btnImage: '/assets/maya/infographic_m10/btn_tzab-ek-nombre.jpg',
    image: '/assets/maya/infographic_m10/hero_tzab-ek-nombre.jpg',
    content: [
      'Imagina que miras el cielo nocturno y ves un grupo muy junto de estrellas brillantes. Este pequeño racimo parece una nube de luz suave. Los astrónomos mayas observaron este mismo grupo hace miles de años. Ellos lo llamaron Tzab-ek en su idioma yucateco. Tzab-ek significa literalmente la cola de la serpiente. Cuando miras a estas estrellas juntas, realmente parecen los segmentos unidos de un cascabel sonando en la oscuridad del universo.',
      'Nosotros hoy conocemos a este grupo como las Pléyades o las Siete Hermanas. Es un cúmulo estelar abierto, lo que significa que son estrellas jóvenes que nacieron juntas de la misma nube de gas. Es como si fueran una familia de estrellas que todavía viajan juntas por el espacio. Para los mayas, este grupo no era solo un adorno en el cielo. Era una de las constelaciones más importantes de su cultura entera. Las observaban con mucha atención cada noche.',
      'Aunque a veces les decimos las Siete Hermanas, la cantidad exacta de estrellas que puedes ver depende de lo oscuro que esté el cielo. En una noche despejada, lejos de las luces de cualquier ciudad, podrías llegar a contar hasta nueve estrellas. Los sabios mayas, que tenían cielos oscuros sin contaminación, podían ver muchos detalles. Ellos construyeron ciudades enteras para poder seguir el camino de estas estrellas en particular.',
      'El cielo funcionaba como un reloj gigante y perfecto para los observadores mesoamericanos. Tzab-ek era como la manecilla de este reloj. Al observar dónde salían estas estrellas en el horizonte, los sacerdotes podían saber exactamente en qué parte del año estaban. Esto era vital para sobrevivir. Sin calendarios de papel ni teléfonos, el cielo nocturno era la única forma de saber cuándo cambiarían las estaciones del año.',
      'Piensa en el cielo como un mapa en movimiento. Las Pléyades se encuentran en la constelación que hoy llamamos Tauro. Para encontrar a Tzab-ek, solo tienes que buscar una forma de cucharón en miniatura. Es tan distintiva que una vez que aprendes a identificarla, tu ojo siempre la encontrará rápidamente. Los niños mayas seguramente aprendían a buscar este cascabel desde que eran pequeños, sentados afuera de sus casas.'
    ],
    expandables: [
      { label: 'El viaje de la luz', icon: 'clock', text: 'Cuando miras a Tzab-ek hoy, la luz que entra a tus ojos comenzó su viaje hace aproximadamente cuatrocientos cuarenta años. Esto significa que estás viendo las estrellas tal como eran en el pasado. Es como recibir una carta que tardó siglos en llegar viajando a la velocidad máxima permitida por el cosmos infinito.' },
      { label: 'Cúmulos estelares jóvenes', icon: 'atom', text: 'Las Pléyades son estrellas muy jóvenes en términos astronómicos. Tienen solo cien millones de años. Eso suena a mucho tiempo, pero nuestro Sol tiene cuatro mil quinientos millones de años. Si el Sol fuera un abuelo, las estrellas de Tzab-ek serían apenas unos bebés brillando en su cuna de polvo.' }
    ],
    fact: 'Las Pléyades contienen en realidad más de mil estrellas en total, aunque nuestros ojos sin ayuda de telescopios solo pueden ver las más brillantes. Toda esta familia estelar está unida por la fuerza de gravedad y se mueve junta a través del espacio a una velocidad de cuarenta kilómetros por segundo. Con el tiempo, dentro de doscientos cincuenta millones de años, este grupo se separará lentamente.'
  },
  {
    id: 'paso-cenital',
    title: 'El Paso Cenital',
    color: '#1565C0',
    btnImage: '/assets/maya/infographic_m10/btn_paso-cenital.jpg',
    image: '/assets/maya/infographic_m10/hero_paso-cenital.jpg',
    content: [
      'Imagina que el cielo es una cúpula sobre tu cabeza. El punto más alto se llama el cenit. Es como si trazaras una línea desde el centro de la Tierra, que pasa por tu cabeza y sigue hasta tocar el techo del cielo. El paso cenital ocurre cuando un astro pasa justo por este punto exacto. En las latitudes de las ciudades mayas, que están cerca del paralelo veinte, este fenómeno astronómico tiene una importancia enorme para la naturaleza.',
      'Cuando el Sol o unas estrellas pasan por el cenit, los objetos como los postes no hacen ninguna sombra hacia los lados. Es un momento donde la luz cae verticalmente. Para los sabios mayas, el paso de Tzab-ek por el cenit en la mitad de la noche era un aviso del universo. Ocurría cerca de nuestro mes de mayo. Este evento astronómico era la alarma que despertaba a la naturaleza para el inicio de un nuevo ciclo vital.',
      'El paso cenital de las Pléyades anunciaba la llegada inminente de la temporada de lluvias. Piensa en la lluvia como la sangre que le da vida a la tierra reseca. Después de muchos meses de sol, los campesinos miraban hacia el cielo esperando esta señal. Cuando el cascabel cruzaba el punto más alto del firmamento, sabían que las nubes pronto traerían el agua necesaria para sembrar. La astronomía dictaba el ritmo de la vida.',
      'Los arquitectos mayas eran tan precisos que construyeron edificios especiales solo para marcar este momento exacto. Hacían agujeros en los techos de cavernas o creaban chimeneas de piedra en sus observatorios. Durante el paso cenital, la luz bajaba por estos túneles rectos e iluminaba una cámara oscura en el fondo. Era una forma inteligente de capturar el paso del tiempo usando solo roca y luz. Un calendario que nunca fallaba.',
      'Este alineamiento entre el cielo y la tierra demuestra que los mayas entendían la geometría del espacio muy bien. Ellos sabían que la Tierra es redonda y que la posición de las estrellas cambia dependiendo de dónde te encuentres en el planeta. Si viajas al norte, las Pléyades nunca pasarán justo arriba de tu cabeza. Este fenómeno solo se puede ver en la zona donde se desarrolló esta civilización antigua.'
    ],
    expandables: [
      { label: 'La danza de las sombras', icon: 'clock', text: 'Durante un paso cenital solar, puedes pararte derecho al mediodía y ver cómo tu propia sombra desaparece debajo de tus zapatos. Los mayas medían estas sombras con estelas altas de piedra para calcular con gran exactitud la duración del año trópico. Es un método elegante de usar las herramientas de la naturaleza natural.' },
      { label: 'Medición del tiempo nocturno', icon: 'clock', text: 'Las estrellas sirven para medir el tiempo durante la noche al igual que el Sol lo hace durante el día. Observar a Tzab-ek cruzar el meridiano superior ayudaba a los sacerdotes a dividir la noche en horas exactas. El cielo era un reloj gigante lleno de puntos brillantes que giraban sobre un eje invisible y constante.' }
    ],
    fact: 'El paralelo de veinte grados pasa justo por encima de la península de Yucatán. Debido a la inclinación del eje del planeta Tierra, las estrellas que tienen una declinación cercana a los veinticuatro grados, como las Pléyades, logran alcanzar el punto cenital visible en esta región geográfica. Los cálculos para predecir esto requieren observaciones de muchas décadas continuas.'
  },
  {
    id: 'calendario-agricola',
    title: 'Calendario Agrícola',
    color: '#F9A825',
    btnImage: '/assets/maya/infographic_m10/btn_calendario-agricola.jpg',
    image: '/assets/maya/infographic_m10/hero_calendario-agricola.jpg',
    content: [
      'El evento astronómico llamado orto helíaco suena complicado, pero es un concepto muy simple. Imagina que las estrellas y el Sol están jugando a las escondidas. El orto helíaco ocurre en el primer día del año en que puedes ver una estrella salir por el este justo antes de que la luz del Sol la borre. Es la primera aparición visible de la estrella después de haber estado escondida detrás del brillo durante varias semanas. Para Tzab-ek, esto pasa a finales de abril.',
      'Cuando el cascabel volvía a aparecer en la madrugada, era el aviso más urgente para los campesinos mayas. Significaba que era el momento exacto para preparar la milpa, que es el campo donde siembran el maíz. Si empezaban antes, la tierra estaba seca. Si empezaban después, las lluvias arruinarían las semillas. Las estrellas funcionaban como un calendario perfecto y gratuito que todos podían leer si miraban al horizonte del amanecer.',
      'El ciclo de cultivar el maíz estaba amarrado de manera invisible a los movimientos de las Pléyades. Las familias enteras trabajaban cortando y quemando la maleza del campo antes de que llegaran las lluvias prometidas por las estrellas. La ceniza rica en minerales servía como abono nutritivo para la tierra cansada. Este método tradicional requiere una sincronización con la naturaleza para que la cosecha sea muy abundante.',
      'Es fascinante pensar que la supervivencia de millones de personas dependía de observar correctamente un puñado de luces distantes. No usaban termómetros ni pronósticos de computadora. Su tecnología era la observación paciente y sistemática del horizonte. Sabían que las estrellas nunca mienten. El ciclo del universo físico y el ciclo biológico de las plantas estaban conectados por el conocimiento ancestral que se pasaba de abuelos a nietos.',
      'El maíz no era solo un alimento para los mayas; era la sustancia sagrada de la que estaban hechos los primeros humanos según sus historias antiguas. Por lo tanto, seguir a Tzab-ek para saber cuándo sembrar el maíz era una actividad religiosa también. Era como seguir las instrucciones directas de los creadores del mundo escritas en la pizarra del cielo. Cada semilla plantada era una respuesta al mensaje que traían las estrellas de la madrugada.'
    ],
    expandables: [
      { label: 'El giro de la Tierra', icon: 'clock', text: 'El orto helíaco sucede porque la Tierra se mueve alrededor del Sol a lo largo del año. Cada día que pasa, el Sol parece moverse un poco hacia el este en relación a las estrellas de fondo. Esto hace que diferentes constelaciones queden visibles en momentos diferentes del año. Es un ciclo anual y cíclico sin fin aparente.' },
      { label: 'El cultivo de la milpa', icon: 'atom', text: 'El sistema agrícola maya no solo sembraba maíz. Sembraban frijoles que se enredaban en el tallo del maíz y calabazas que cubrían el suelo para mantener la humedad. Este método inteligente previene las plagas destructivas y mantiene la tierra sana durante mucho tiempo. Es un sistema ecológico finamente equilibrado.' }
    ],
    fact: 'El Códice de Madrid, que es uno de los pocos libros mayas originales que sobrevivieron a la historia, contiene páginas dedicadas exclusivamente a los ciclos agrícolas. Muestra dibujos de dioses plantando semillas usando palos afilados, acompañados por glifos que indican las fechas astronómicas exactas. Los investigadores han encontrado una relación directa entre estas fechas y los movimientos de Tzab-ek.'
  },
  {
    id: 'nueva-cuenta-fuego',
    title: 'Cuenta del Fuego',
    color: '#6D4C41',
    btnImage: '/assets/maya/infographic_m10/btn_nueva-cuenta-fuego.jpg',
    image: '/assets/maya/infographic_m10/hero_nueva-cuenta-fuego.jpg',
    content: [
      'Imagina vivir en un mundo donde el calendario más largo se acaba por completo. Para los habitantes de Mesoamérica, como los aztecas y otros pueblos conectados con la tradición maya, esto pasaba cada cincuenta y dos años. Sus dos calendarios principales, el civil de trescientos sesenta y cinco días y el ritual de doscientos sesenta días, volvían a empezar juntos en ese momento exacto. Era como el cambio de siglo más importante de todos.',
      'Esta fecha monumental se marcaba con una ceremonia llamada el Fuego Nuevo. La señal cósmica para iniciar este ritual profundo era el paso de las Pléyades por el punto más alto del cielo durante la medianoche. Si el cascabel no se detenía y continuaba su camino continuo por el cielo, significaba que el universo seguiría existiendo por otro ciclo completo. Era una prueba física de que la maquinaria del mundo no se había roto.',
      'Para prepararse para este momento de renovación, la gente rompía todas sus vasijas viejas y limpiaba sus casas profundamente. La parte más dramática era que apagaban todos los fuegos de todas las ciudades. Imagina un mundo sumergido en una oscuridad densa, sin una sola llama encendida. La única luz que quedaba era la luz tenue de las estrellas frías que cruzaban lentamente por encima de sus cabezas.',
      'Cuando los sacerdotes observaban desde una montaña alta que Tzab-ek cruzaba el cenit, sabían que el mundo estaba a salvo. Entonces tomaban dos trozos de madera seca y los frotaban rápidamente hasta crear una pequeña chispa roja. Este nuevo fuego sagrado nacía en el pecho del cielo. De esta única llama inicial, mensajeros rápidos corrían con antorchas ardientes para llevar el fuego a cada templo del imperio dormido.',
      'Es una analogía hermosa sobre los ciclos del tiempo. Así como las estrellas giran y vuelven a su lugar, la vida humana también debe renovarse y empezar limpia otra vez. El cosmos participaba en esta fiesta de cumpleaños del mundo. Las Pléyades no eran solo indicadores agrícolas; eran los engranajes brillantes que marcaban el inicio y el fin del tiempo cósmico mismo. El destino de la humanidad estaba atado a este racimo estelar.'
    ],
    expandables: [
      { label: 'El ciclo del Siglo', icon: 'atom', text: 'El número cincuenta y dos no es casualidad. Es el mínimo común múltiplo de los dos calendarios importantes. Pasaban trece mil ochocientos ochenta días exactos para que las fechas volvieran a combinarse igual. Una persona que vivía para ver este evento dos veces se consideraba un anciano de enorme respeto y sabiduría total.' },
      { label: 'Constelación del Fuego', icon: 'clock', text: 'En muchas culturas antiguas, a las Pléyades se les asocia con el fuego. Esto podría ser porque parecen un grupo de brasas calientes que brillan juntas en la oscuridad. Su luz azulada parpadea mucho más cuando están cerca del horizonte, debido a las turbulencias invisibles de la atmósfera terrestre que distorsionan la visión.' }
    ],
    fact: 'Los registros históricos escritos muestran que la última gran Ceremonia del Fuego Nuevo celebrada por los aztecas ocurrió en el año mil quinientos siete de nuestra era. Fue realizada en la cumbre del Cerro de la Estrella, ubicado cerca del centro de la actual Ciudad de México. Las investigaciones astronómicas confirman que en noviembre de ese año específico, las Pléyades cruzaron el cenit de ese lugar exacto.'
  },
  {
    id: 'astronomia-precisa',
    title: 'Astronomía Precisa',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m10/btn_astronomia-precisa.jpg',
    image: '/assets/maya/infographic_m10/hero_astronomia-precisa.jpg',
    content: [
      'Si crees que para ser un buen astrónomo necesitas usar un telescopio moderno gigante, los mayas probarían que estás equivocado. Ellos lograron una precisión astronómica increíble usando solo sus ojos humanos y edificios de piedra muy largos. Imagina usar la pared de tu casa para ver por dónde sale el sol cada día y hacer marcas en el suelo a lo largo de los años. Así fue como empezaron a entender el ritmo del inmenso universo estrellado.',
      'Los sabios mayas no solo anotaban la posición diaria de las cosas. Ellos descubrieron un movimiento de la Tierra lento llamado la precesión de los equinoccios. Piensa en un trompo que está girando rápido pero también se tambalea muy lentamente de lado a lado. Nuestro planeta hace exactamente lo mismo. Este tambaleo hace que la posición aparente de las estrellas cambie un poquito cada siglo. ¡Es un ciclo que tarda veintiséis mil años en completarse!',
      'Detectar un cambio tan minúsculo requiere observaciones metódicas durante muchísimas generaciones humanas. Los abuelos pasaban sus libros de datos anotados a los nietos, siglo tras siglo sin interrupción. Notaron que el punto exacto por donde Tzab-ek salía en el horizonte este iba cambiando poco a poco con el paso de los años. Alinear un templo a una estrella requiere saber que ese alineamiento dejará de ser perfecto en el futuro.',
      'En muchas zonas arqueológicas famosas como Chichén Itzá o Uxmal, hay edificios que están deliberadamente orientados para apuntar hacia las Pléyades. Las calles antiguas y las plazas ceremoniales siguen líneas rectas que apuntan al horizonte por donde este cascabel cósmico subía al cielo. Usaron la arquitectura inmensa como un instrumento astronómico gigante que convertía su profundo conocimiento matemático en pura roca sólida.',
      'Esta precisión asombra a los científicos de hoy. Usando una matemática base veinte y símbolos escritos complejos, lograron calcular órbitas planetarias con un error de apenas unas fracciones de día. Conocer el movimiento exacto del universo les daba un poder político inmenso a los gobernantes, porque demostraba que estaban en sintonía perfecta con los dioses creadores. Eran los dueños del tiempo porque sabían medirlo de manera impecable.'
    ],
    expandables: [
      { label: 'Arquitectura alienada', icon: 'atom', text: 'El famoso Palacio del Gobernador en Uxmal no está alineado con el resto de la ciudad. Su fachada principal está girada unos grados hacia el sureste. Los arqueólogos descubrieron que apunta exactamente al punto por donde salía Venus cuando alcanzaba su extremo máximo en el horizonte durante el siglo noveno.' },
      { label: 'Matemáticas estelares', icon: 'clock', text: 'El sistema numérico maya era muy elegante. Solo necesitaban tres símbolos básicos para escribir cualquier cantidad enorme: un punto que vale uno, una raya horizontal que vale cinco y un caracol marino que representa el número cero. Fueron una de las primeras civilizaciones mundiales en usar el cero de forma posicional matemática.' }
    ],
    fact: 'El arqueoastrónomo Anthony Aveni comprobó midiendo las calles de la ciudad antigua de Teotihuacán que su orientación principal tiene una desviación de quince grados y medio al este del norte geográfico verdadero. Esa línea recta milenaria apunta exactamente a la posición donde se veía el ocultamiento de las Pléyades en el horizonte durante la época en que la enorme metrópolis urbana fue construida laboriosamente.'
  },
  {
    id: 'cascabel-cosmico',
    title: 'Cascabel Cósmico',
    color: '#311B92',
    btnImage: '/assets/maya/infographic_m10/btn_cascabel-cosmico.jpg',
    image: '/assets/maya/infographic_m10/hero_cascabel-cosmico.jpg',
    content: [
      '¿Por qué llamaron a este grupo de estrellas una cola de serpiente y no un cucharón como nosotros? Para entenderlo, tenemos que pensar como un campesino mesoamericano rodeado de selva profunda. La serpiente de cascabel es un animal poderoso y muy respetado en su región tropical cálida. Además, la serpiente tiene una piel escamosa que se renueva y cambia periódicamente, lo que la convierte en un símbolo perfecto de la vida renovable.',
      'Si miras el dibujo que forman las siete estrellas principales de las Pléyades, realmente se parece a los anillos duros que forman el cascabel final de la víbora. Cuando la serpiente real mueve su cascabel en el suelo, hace un sonido fuerte para avisar su presencia antes de morder. De manera similar, cuando Tzab-ek aparecía brillando fuerte en el cielo matutino, era un aviso ruidoso de que el tiempo lluvioso estaba a punto de llegar.',
      'En la mitología antigua maya, hay un dios muy importante llamado Chaac. Es el dios de la lluvia, de los relámpagos fuertes y de las tormentas violentas. A menudo se le representa cargando un hacha afilada que produce los truenos y acompañado por grandes serpientes míticas de agua. La serpiente celestial de estrellas está conectada íntimamente con este dios benefactor de la lluvia. Es el mensajero que trae el agua dulce para las semillas.',
      'El arte antiguo mesoamericano está lleno de dibujos de serpientes con plumas y con estrellas. La famosa Serpiente Emplumada de Chichén Itzá, que baja por la pirámide durante el equinoccio, es parte de este mismo lenguaje simbólico. Las estrellas no eran esferas de gas ardiente para ellos; eran seres vivos inmortales que habitaban el techo del mundo. Tzab-ek era un animal cósmico gigante que nadaba a través del océano oscuro del cielo.',
      'Usar analogías de animales para entender las estrellas es algo que todos los humanos hacemos desde siempre. Los griegos vieron toros y osos inmensos; los mayas vieron tortugas redondas, jaguares moteados y serpientes ruidosas. Es nuestra manera humana de intentar ordenar un universo que es inmenso y caótico. Pintamos figuras conocidas conectando los puntos brillantes distantes para sentir que el cielo es una extensión familiar de nuestro propio patio.'
    ],
    expandables: [
      { label: 'Estrellas animales', icon: 'clock', text: 'Otra constelación muy importante para los mayas era Ak-ek, que significa la Estrella Tortuga. Esta corresponde a una parte de lo que nosotros conocemos hoy como la constelación de Orión. Las tres estrellas del cinturón de Orión formaban el caparazón duro de la tortuga cósmica flotando en el cielo estrellado y vasto.' },
      { label: 'El sonido del cascabel', icon: 'atom', text: 'El cascabel de la serpiente real no tiene piezas adentro que suenen como unas maracas. El sonido peculiar se produce porque los anillos de queratina hueca chocan entre sí muy rápido, unas cincuenta veces por cada segundo. Las estrellas vibran con luz distante; la serpiente vibra con un sonido rápido de advertencia constante.' }
    ],
    fact: 'En el famoso libro sagrado maya llamado Popol Vuh, que narra la creación misteriosa del mundo, se menciona a un grupo de cuatrocientos muchachos jóvenes que fueron asesinados por un monstruo terrestre llamado Zipacná. Las leyendas dicen que estos jóvenes inocentes subieron al cielo oscuro para convertirse en las brillantes estrellas del grupo de las Pléyades y vivir allí eternamente como luces en la noche profunda.'
  },
  {
    id: 'culturas-comparadas',
    title: 'Culturas Comparadas',
    color: '#FFEE58',
    btnImage: '/assets/maya/infographic_m10/btn_culturas-comparadas.jpg',
    image: '/assets/maya/infographic_m10/hero_culturas-comparadas.jpg',
    content: [
      'Lo más increíble de las Pléyades no es solo lo importantes que eran para los antiguos mayas, sino que casi todas las culturas antiguas del mundo entero les prestaron la misma atención. Como es un grupo estelar muy brillante y compacto, resalta mucho en la bóveda del cielo. Es como un faro luminoso único que llama la vista humana de forma casi magnética sin importar en qué continente te encuentres parado hoy.',
      'Piensa en el otro lado del gran océano pacífico. En Japón, a este mismo grupo de estrellas lo llaman Subaru. Significa literalmente unir fuerzas o agruparse juntos. Si alguna vez has visto el logotipo de los autos marca Subaru, notarás que es exactamente un grupo de seis estrellas conectadas entre sí. Ellos también usaban el cielo para saber cuándo plantar su arroz importante. Es una herramienta agrícola que traspasa fronteras enormes.',
      'Para los intrépidos navegantes del pueblo maorí en la lejana Nueva Zelanda, este conjunto de estrellas se llama Matariki. Su aparición lenta antes de que salga el sol frío del invierno marca el inicio de todo el año nuevo tradicional de su calendario milenario. Las familias se reúnen contentas para recordar a los familiares que murieron durante el año pasado y para celebrar unidos la promesa de una nueva cosecha futura.',
      'En el país inmenso de la India, el grupo se conoce como Krittika, y está fuertemente asociado con el fuego sagrado de la creación mística y con las seis madres maravillosas que cuidaron al dios guerrero llamado Kartikeya. Por otro lado, en la mitología clásica europea, son famosas como las Siete Hermanas asustadas que fueron convertidas rápidamente en pájaros blancos y luego en estrellas eternas para escapar de un cazador rudo.',
      'Es un recordatorio poderoso de que todos los seres humanos compartimos exactamente el mismo cielo nocturno. Aunque los mayas imaginaron una cola de serpiente de cascabel ruidosa y los griegos vieron a siete hermanas bellas huyendo rápidamente, el propósito práctico y esencial era exactamente el mismo. Mirábamos unidos hacia arriba para poder entender cómo vivir mejor aquí abajo. El universo estrellado fue nuestro primer maestro global.'
    ],
    expandables: [
      { label: 'El mito perdido', icon: 'atom', text: 'Muchas culturas mundiales separadas tienen mitos sobre por qué una de las siete estrellas principales se perdió y ahora solo se ven seis. Los científicos descubrieron que hace cien mil años, dos estrellas del grupo estaban mucho más separadas y eran visibles como dos diferentes. Luego se movieron muy juntas gradualmente.' },
      { label: 'Herramienta universal', icon: 'clock', text: 'Sin importar si cultivaban el sagrado maíz verde en México, el arroz húmedo en Japón o las papas grandes en Nueva Zelanda, el movimiento anual regular y preciso de este cúmulo abierto en el cielo profundo servía para marcar fielmente los tiempos del delicado mundo natural. Era el mismo reloj para toda la humanidad antigua.' }
    ],
    fact: 'La mención escrita más antigua y verificada sobre las brillantes Pléyades se encuentra en los famosos textos chinos astronómicos que datan aproximadamente del año dos mil trescientos cincuenta antes de nuestra era común. También aparecen representadas visualmente en el enigmático Disco Celeste de Nebra, un artefacto de bronce europeo que tiene más de tres mil seiscientos años de antigüedad misteriosa e indiscutible.'
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
      hue: Math.random() > 0.5 ? '232,234,246' : '249,168,37', // Star white or harvest gold
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

// ─── Header ──────────────────────────────────────────────────────────────────
function MayaAstronomyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(249,168,37,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E8EAF6','#1565C0','#F9A825','#6D4C41','#2E7D32','#311B92','#FFEE58'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F9A825" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#F9A825" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#F9A825" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#F9A825" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,168,37,0.2)" />
            <stop offset="50%" stopColor="rgba(249,168,37,0.9)" />
            <stop offset="100%" stopColor="rgba(249,168,37,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F9A825" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TZAB-EK</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(249,168,37,0.8)" fontSize="12" fontFamily="monospace" letterSpacing="2">LA COLA DE SERPIENTE ESTELAR</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(232,234,246,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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
          layoutId="activeDotMayaM10"
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

// ─── Expandable Section ──────────────────────────────────────────────────────
const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};
const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.9)',
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

// ─── Content Panel ───────────────────────────────────────────────────────────
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
        background: 'rgba(10, 15, 25, 0.92)',
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}>
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>
        {(node.expandables && node.expandables.length > 0) && (
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explorar más</h4>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
            ))}
          </div>
        )}
        {node.fact && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '16px', background: `linear-gradient(45deg, ${node.color}15, transparent)`, border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>Dato Científico</span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>{node.fact}</p>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(249,168,37,0.15)' }}>
      <Star size={14} style={{ color: '#F9A825', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }} style={{ height: '100%', background: 'linear-gradient(90deg, #F9A825, #6D4C41)', borderRadius: '3px', boxShadow: '0 0 8px rgba(249,168,37,0.4)' }} />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F9A825', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>{explored}/{total}</span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM10() {
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
    <div style={{ backgroundImage: 'linear-gradient(180deg, rgba(10,15,25,0.85) 0%, rgba(15,20,30,0.8) 40%, rgba(10,15,25,0.88) 100%), ', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <TemporalField />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2, marginBottom: '2rem' }}>
        <MayaAstronomyHeader />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
        {INFOGRAPHIC_NODES.map((node, i) => (
          <NodeButton key={node.id} node={node} index={i} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>
      <div style={{ maxWidth: '300px', margin: '0 auto 1rem', position: 'relative', zIndex: 2 }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>
      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
        )}
      </AnimatePresence>
      <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', position: 'relative', zIndex: 2 }}>
        <h4 style={{ margin: '0 0 1rem', color: '#F9A825', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={16} /> Fuentes y Bibliografía
        </h4>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((bib, i) => (
            <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <ChevronRight size={12} style={{ color: '#F9A825', marginTop: '4px', flexShrink: 0 }} /> {bib}
            </li>
          ))}
        </ul>
      </div>
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
