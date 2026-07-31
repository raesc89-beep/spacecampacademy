'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Comet themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoComet({ size = 70, color = '#81D4FA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="40" r="8" fill={color} opacity="0.8" />
      <circle cx="20" cy="40" r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M 24 36 L 50 10 L 55 15 L 28 42 Z" fill={color} opacity="0.3" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="48" cy="28" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCometTail({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 50 Q 30 40 50 10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round" />
      <path d="M 15 55 Q 35 45 55 15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M 5 45 Q 25 35 45 5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <circle cx="10" cy="50" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoOrbit({ size = 80, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <ellipse cx="40" cy="20" rx="35" ry="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="4 4" />
      <path d="M 5 20 Q 40 -10 75 20" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFB300" opacity="0.7" />
      <circle cx="75" cy="20" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoMolecule({ size = 60, color = '#7E57C2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.8" />
      <circle cx="15" cy="15" r="5" fill={color} opacity="0.6" />
      <circle cx="45" cy="45" r="5" fill={color} opacity="0.6" />
      <line x1="19" y1="19" x2="26" y2="26" stroke={color} strokeWidth="2" />
      <line x1="34" y1="34" x2="41" y2="41" stroke={color} strokeWidth="2" />
      <line x1="21" y1="17" x2="28" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoStarMap({ size = 70, color = '#FFB300', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
      <line x1="15" y1="20" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="40" x2="35" y2="50" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="40" x2="50" y2="25" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="15" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="45" cy="40" r="4" fill={color} opacity="0.9" />
      <circle cx="35" cy="50" r="2" fill={color} opacity="0.6" />
      <circle cx="50" cy="25" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-borisov': [DecoComet, DecoStarMap, DecoOrbit],
  'confirmacion-interestelar': [DecoOrbit, DecoCometTail, DecoStarMap],
  'primer-cometa-alien': [DecoCometTail, DecoMolecule, DecoComet],
  'composicion-molecular': [DecoMolecule, DecoOrbit, DecoCometTail],
  'nucleo-fragmentacion': [DecoComet, DecoMolecule, DecoStarMap],
  'sistema-origen': [DecoStarMap, DecoOrbit, DecoCometTail],
  'comparacion-oumuamua': [DecoOrbit, DecoComet, DecoMolecule],
}; const BIBLIOGRAPHY = ['Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", ApJ Letters, 886',
  'Bodewits, D. et al. (2020). "The carbon monoxide-rich interstellar comet 2I/Borisov", Nature Astronomy, 4',
  'Cordiner, M. et al. (2020). "Unusually high CO abundance of the first unambiguously identified interstellar comet", Nature Astronomy, 4',
  'Guzik, P. et al. (2020). "Initial characterization of interstellar comet 2I/Borisov", Nature Astronomy, 4',
  'Bailer-Jones, C.A.L. et al. (2020). "A search for the origin of the interstellar comet 2I/Borisov", A&A, 634'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'descubrimiento-borisov',
    title: 'El Descubrimiento',
    color: '#81D4FA',
    btnImage: '/assets/interestelar/infographic_m3/btn_descubrimiento-borisov.jpg',
    image: '/assets/interestelar/infographic_m3/hero_descubrimiento-borisov.jpg',
    content: [
      'Imagina mirar el cielo nocturno y encontrar un mensaje embotellado que viene desde una estrella lejana. Eso fue exactamente lo que le sucedió al astrónomo aficionado Gennady Borisov en la madrugada del 30 de agosto de 2019. Trabajando desde su propio observatorio en Crimea, este incansable cazador de cometas estaba escrutando el firmamento con un telescopio que él mismo había construido pieza por pieza. No dependía de agencias espaciales gigantes con presupuestos multimillonarios; solo de su paciencia, su conocimiento y un espejo de 0.65 metros diseñado específicamente para capturar la luz más tenue del universo.',
      'El telescopio de Borisov, llamado MARGO, no es como los juguetes que ves en las tiendas. Es una máquina de precisión excepcional, diseñada con una relación focal muy rápida para captar objetos difusos que los grandes observatorios profesionales a menudo pasan por alto porque están enfocados en otras investigaciones. Esa madrugada, Gennady notó una pequeña mancha borrosa moviéndose contra el fondo fijo de las estrellas en la constelación de Casiopea. Al principio, parecía un cometa ordinario de nuestro propio vecindario, pero su velocidad y trayectoria pronto revelarían un secreto que sacudiría a toda la comunidad astronómica.',
      'Descubrir un cometa no es simplemente mirar por un ocular y gritar ¡eureka! Requiere tomar múltiples fotografías a lo largo de varias horas para detectar el movimiento de un objeto en relación con las estrellas de fondo. Es como jugar al juego de "encuentra las diferencias"pero con miles de puntos de luz. Borisov envió cuidadosamente sus observaciones al Minor Planet Center (Centro de Planetas Menores), la organización internacional responsable de catalogar todos los objetos que se mueven en nuestro sistema solar. En ese momento, el objeto recibió la designación temporal"gb00234", y comenzó la cuenta regresiva para confirmar su verdadera identidad.',
      'Lo que hace que este descubrimiento sea inspirador para cualquier entusiasta de la astronomía es que demuestra que el cielo nocturno todavía guarda secretos accesibles para quienes estén dispuestos a mirar. Mientras los telescopios espaciales como el Hubble o el James Webb estudian galaxias a miles de millones de años luz de distancia, el espacio cercano todavía puede sorprendernos. Gennady Borisov ya había descubierto varios cometas antes de este, pero ninguno se compararía con la magnitud de este hallazgo. Había atrapado a un visitante interestelar con sus propias manos y herramientas, demostrando el inmenso valor de la astronomía amateur en el siglo veintiuno.',
      'La noticia del descubrimiento se propagó como un incendio forestal por los observatorios de todo el mundo. Los astrónomos profesionales, al ver los datos de la trayectoria inicial calculada por el software del Centro de Planetas Menores, se dieron cuenta de inmediato de que los números no encajaban con un cometa de la familia de Júpiter o de la Nube de Oort. La velocidad del objeto, incluso a esa inmensa distancia del Sol, era excesiva. Comenzó entonces una carrera frenética contrarreloj para apuntar los telescopios más grandes de la Tierra hacia esa pequeña mancha de luz, buscando confirmar si realmente estábamos ante el segundo visitante interestelar jamás detectado en la historia humana.'
    ],
    expandables: [
      { label: 'El Astrónomo y su Máquina', icon: 'zap', text: 'Gennady Borisov no es un astrónomo profesional empleado por una universidad, sino un ingeniero y fabricante de telescopios. Diseñó y construyó él mismo el instrumento MARGO de 0.65 metros específicamente para tener un amplio campo de visión, optimizado para detectar cometas que se acercan desde direcciones inusuales. Su éxito demuestra que la innovación técnica individual todavía puede competir con los grandes presupuestos.' },
      { label: '¿Cómo se nombran los cometas?', icon: 'clock', text: 'Tradicionalmente, los cometas llevan el nombre de sus descubridores (hasta tres personas). Cuando se confirmó la naturaleza de este objeto, la Unión Astronómica Internacional rompió sus propias reglas. En lugar de un nombre complejo con números, decidieron bautizarlo oficialmente como 2I/Borisov. El "2I"significa que es el segundo objeto interestelar confirmado (después de 1I/Oumuamua), y"Borisov" honra a su descubridor.' }
    ],
    fact: 'El cometa fue descubierto cuando se encontraba a unas 3 unidades astronómicas del Sol (tres veces la distancia entre la Tierra y el Sol), mucho más allá de la órbita de Marte. A esa distancia, la temperatura es muy baja, pero ya era suficiente para que los hielos volátiles de su superficie comenzaran a sublimarse y formar la coma brillante que permitió a Borisov detectarlo contra el cielo oscuro.'
  },
  {
    id: 'confirmacion-interestelar',
    title: 'Confirmación Interestelar',
    color: '#1565C0',
    btnImage: '/assets/interestelar/infographic_m3/btn_confirmacion-interestelar.jpg',
    image: '/assets/interestelar/infographic_m3/hero_confirmacion-interestelar.jpg',
    content: [
      'En astronomía, la forma de la órbita de un objeto es como su pasaporte: te dice de dónde viene y a dónde va. Los planetas y los cometas de nuestro propio sistema solar viajan en órbitas elípticas, que son como óvalos cerrados. Imagina que están atados al Sol por una cuerda elástica invisible llamada gravedad. No importa cuánto se alejen, siempre regresan. La excentricidad de una órbita mide cuán alargado es ese óvalo, y para los objetos que pertenecen a nuestro sistema, ese número siempre es menor que 1. Si la excentricidad es exactamente 1, tienes una parábola, el límite absoluto entre estar atrapado y estar libre.',
      'Cuando los astrónomos introdujeron las posiciones medidas del cometa Borisov en sus computadoras, los cálculos arrojaron un número que dejó a todos boquiabiertos: una excentricidad de 3.36. Este número es gigantesco en términos de mecánica orbital. Una excentricidad mayor que 1 significa que la órbita es una hipérbola, una curva abierta. Es como un coche que viaja por una carretera recta, toma una curva rápida alrededor de una rotonda (el Sol) y luego sale disparado por otra carretera recta para no volver jamás. El número 3.36 era tan ridículamente alto que no había margen de error: este cometa no era nuestro, venía del espacio profundo.',
      'Para entender la velocidad de Borisov, imagina lanzar una pelota al aire. Si la lanzas suavemente, la gravedad de la Tierra la hace caer (órbita elíptica). Si la disparas con un cohete gigante, escapará de la Tierra para siempre (órbita hiperbólica). Borisov entró en nuestro sistema solar moviéndose a unos asombrosos 32.2 kilómetros por SEGUNDO (unos 116,000 kilómetros por hora) antes de sentir el tirón principal del Sol. A esa velocidad, la gravedad de nuestra estrella no era lo suficientemente fuerte como para capturarlo. Solo pudo doblar ligeramente su trayectoria antes de que el cometa continuara su viaje eterno hacia el vacío interestelar.',
      'La confirmación oficial llegó a través del Minor Planet Center y del Jet Propulsion Laboratory de la NASA. Después de reunir cientos de observaciones de docenas de telescopios terrestres, la trayectoria se delineó con precisión milimétrica. En ese momento, la Unión Astronómica Internacional tomó una decisión histórica: crearon una nueva clasificación para objetos celestes. El cometa C/2019 Q4 (su nombre preliminar) fue rebautizado como 2I/Borisov. El prefijo "2I" cimentó su lugar en la historia como el segundo objeto interestelar confirmado, abriendo oficialmente la puerta a un nuevo campo de la astronomía: el estudio de visitantes de otras estrellas.',
      'A diferencia de Oumuamua (el primer objeto interestelar 1I, descubierto en 2017), Borisov fue encontrado mucho antes de alcanzar su punto más cercano al Sol (el perihelio). Oumuamua nos sorprendió por la espalda cuando ya se estaba alejando rápidamente hacia la oscuridad. Borisov, en cambio, venía de frente, dándonos meses de anticipación para planificar observaciones. Fue como recibir una invitación a una fiesta interestelar con meses de antelación, permitiendo a los astrónomos reservar tiempo en los telescopios más grandes del mundo, incluyendo el Telescopio Espacial Hubble, para estudiar a este alienígena de hielo en todo su esplendor.'
    ],
    expandables: [
      { label: 'Matemáticas del Infinito', icon: 'atom', text: 'La excentricidad orbital es una maravilla matemática. Un círculo perfecto tiene excentricidad 0. La Tierra tiene 0.016 (casi circular). Los cometas locales típicos tienen entre 0.9 y 0.99 (muy alargados pero cerrados). Una excentricidad de 3.36 significa que la trayectoria es tan abierta que forma un ángulo muy ancho, indicando que la energía cinética del cometa era superior a la energía potencial gravitatoria del Sol.' },
      { label: 'La Velocidad de Escape', icon: 'zap', text: 'Para que el Sol capture un objeto, este debe moverse por debajo de la "velocidad de escape" local. A la distancia donde se descubrió Borisov, la velocidad de escape del Sol es de unos 24 km/s. Borisov viajaba a más de 30 km/s en ese punto. No había ninguna combinación física posible donde la gravedad del Sol, o de planetas gigantes como Júpiter, pudiera frenarlo lo suficiente como para mantenerlo en nuestro sistema.' }
    ],
    fact: 'El Telescopio Espacial Hubble capturó imágenes increíbles de 2I/Borisov pasando a unos 300 millones de kilómetros de la Tierra. Fue la primera vez que la humanidad pudo observar el núcleo brillante y la extensa atmósfera de polvo y gas de un cometa originario de otro sistema planetario, con el nivel de detalle que solo puede proporcionar un telescopio situado por encima de la atmósfera terrestre.'
  },
  {
    id: 'primer-cometa-alien',
    title: 'Primer Cometa de Otro Sistema',
    color: '#00BCD4',
    btnImage: '/assets/interestelar/infographic_m3/btn_primer-cometa-alien.jpg',
    image: '/assets/interestelar/infographic_m3/hero_primer-cometa-alien.jpg',
    content: [
      'Cuando Oumuamua, el primer visitante interestelar, atravesó nuestro sistema solar, nos dejó rascándonos la cabeza. Parecía un asteroide alargado, una especie de cigarro o panqueque de roca, sin ninguna cola visible de polvo o gas. Era tan extraño que algunos incluso especularon de manera descabellada sobre naves espaciales. Pero cuando apareció Borisov, fue un suspiro de alivio astronómico. ¡Borisov se comportaba exactamente como un cometa debería comportarse! Tenía una brillante coma (una nube difusa de gas) y una cola polvorienta que se extendía en dirección opuesta al Sol. Era reconfortantemente normal, excepto por el hecho de que venía de otra estrella.',
      'Un cometa es esencialmente una "bola de nieve sucia", como la describió el famoso astrónomo Fred Whipple. Está compuesto de hielos primordiales, polvo y rocas que se formaron en los confines helados de un sistema planetario. Cuando un cometa se acerca a una estrella caliente, el hielo no se derrite, sino que pasa directamente de sólido a gas, un proceso llamado sublimación. Es como el hielo seco que ves en los conciertos o en Halloween, que produce humo blanco de inmediato. Este gas en expansión arrastra partículas de polvo, creando la espectacular coma y la larga cola que podemos ver desde la Tierra a través de nuestros telescopios.',
      'Lo asombroso de 2I/Borisov es que nos demostró visualmente, por primera vez y sin lugar a dudas, que el proceso de formación de cometas no es exclusivo de nuestro sistema solar. En el disco de gas y polvo que rodeaba al joven Sol hace 4.500 millones de años, el agua y otros volátiles se congelaron lejos del calor central, formando nuestros cometas locales. El hecho de que Borisov se vea y actúe como un cometa demuestra que una física y una química muy similares operan alrededor de otras estrellas. Nos dice que hay "nubes de Oort" exoplanetarias llenas de miles de millones de estas bolas de nieve sucias, esperando ser expulsadas al espacio.',
      'Los análisis de la luz reflejada por la coma de Borisov revelaron que estaba expulsando gas y polvo a tasas muy similares a los cometas muy activos de nuestro sistema. Los espectrógrafos de grandes telescopios separaron la luz del cometa en un arco iris de colores, buscando las firmas químicas específicas de diferentes moléculas. Encontraron gas cianógeno (CN) y carbono diatómico (C2), que son ingredientes clásicos que dan a los cometas locales ese hermoso tono verdoso en las fotografías. Desde lejos, si no conocieras su órbita extrema hiperbólica, jurarías que Borisov era simplemente otro residente temporal del vecindario del Sol.',
      'Sin embargo, debajo de esa apariencia familiar, se escondía una reliquia alienígena inestimable. Borisov no había sido tocado por el calor de una estrella probablemente en miles de millones de años. Había viajado a través de la gélida negrura del medio interestelar a temperaturas cercanas al cero absoluto. Cuando el calor de nuestro Sol comenzó a calentar su superficie, estaba liberando gases que habían estado congelados y sellados desde la formación de un sistema estelar diferente. Estudiar esa coma no era solo astronomía; era arqueología química de un mundo lejano, ofreciéndonos una muestra gratuita de la nube primordial de otra estrella.'
    ],
    expandables: [
      { label: 'El Verdadero Oumuamua', icon: 'zap', text: 'Mientras Borisov es un cometa clásico rico en hielos volátiles, Oumuamua se comportó más como un asteroide rocoso o un fragmento de planeta destruido, muy seco y desprovisto de polvo visible. Esta diferencia nos enseña que los sistemas estelares eyectan una gran variedad de escombros, y dependiendo de qué parte de su sistema de origen fueron expulsados, pueden ser rocosos o helados. Borisov representa a la población de los confines fríos de su sistema materno.' },
      { label: 'La Coma y el Viento Solar', icon: 'atom', text: 'La coma de un cometa puede llegar a ser más grande que el diámetro de Júpiter o incluso del Sol, a pesar de que el núcleo de hielo en el centro tiene solo unos pocos kilómetros de tamaño. La cola siempre apunta lejos del Sol, no porque el cometa se mueva rápido, sino porque el intenso "viento solar" (una corriente de partículas cargadas) y la presión de la radiación lumínica empujan físicamente el gas y el polvo hacia atrás como una manga de viento en un huracán.' }
    ],
    fact: 'Observaciones prolongadas con el Telescopio Espacial Hubble mostraron que el tamaño de la coma de Borisov era enorme y muy rica en polvo microscópico. Las partículas de polvo tenían propiedades de dispersión de luz casi idénticas a las del cometa Hale-Bopp, uno de los cometas más brillantes y masivos observados en nuestro sistema solar en el siglo XX, lo que sugiere procesos de formación similares.'
  },
  {
    id: 'composicion-molecular',
    title: 'Composición Molecular',
    color: '#7E57C2',
    btnImage: '/assets/interestelar/infographic_m3/btn_composicion-molecular.jpg',
    image: '/assets/interestelar/infographic_m3/hero_composicion-molecular.jpg',
    content: [
      'Al principio, Borisov parecía el gemelo de nuestros cometas locales, pero a medida que los astrónomos analizaron su composición con instrumentos más sensibles, comenzaron a notar que este alienígena tenía una química profundamente inusual. La verdadera magia de la astronomía moderna es la espectroscopia: la capacidad de usar un prisma de alta tecnología para descomponer la luz de un objeto distante en sus colores componentes. Cada elemento químico y molécula absorbe o emite luz en colores muy específicos, creando un código de barras único. Al leer el código de barras de la luz de Borisov, los científicos descubrieron algo extraordinario sobre su composición.',
      'El hallazgo más sorprendente de la composición química de Borisov fue su cantidad masiva de monóxido de carbono (CO). En los cometas típicos de nuestro sistema solar, el agua (H2O) es, con mucho, el hielo más abundante, y los niveles de gas CO suelen ser bastante bajos, una fracción del agua. Sin embargo, cuando el telescopio espacial Hubble y el observatorio ALMA en Chile apuntaron a Borisov, detectaron que estaba arrojando monóxido de carbono a un ritmo frenético. ¡El gas CO era entre 9 y 26 veces más abundante en proporción al agua que en un cometa promedio de nuestra familia solar! Borisov no era una bola de nieve de agua; era una bola de hielo venenoso de monóxido de carbono.',
      'Para entender por qué esto es tan importante, hay que pensar en la temperatura. El agua se congela a cero grados Celsius. Pero el monóxido de carbono es un gas hiper-volátil; necesita temperaturas increíblemente bajas, por debajo de los -250 grados Celsius (cerca de 20 Kelvin), para convertirse en hielo sólido. Si Borisov está lleno de hielo de CO, significa que se formó en un lugar extremadamente oscuro y brutalmente frío. Debió haber nacido en los confines más alejados de su sistema estelar nativo, mucho más lejos del equivalente a la órbita de Plutón en nuestro sistema solar, donde la luz de su estrella materna era poco más que un punto brillante.',
      'Además del monóxido de carbono extremo, los astrónomos también detectaron grandes cantidades de cianuro de hidrógeno (HCN) y proporciones inusuales de isótopos (versiones más pesadas de átomos comunes). El hielo de agua detectado en Borisov mostraba características que sugerían que el agua misma había estado expuesta a la intensa radiación cósmica del espacio interestelar durante eones. Es como si el cometa fuera una cápsula del tiempo criogénica que ha acumulado la escarcha y el daño por radiación del vacío entre las estrellas a lo largo de un viaje incomprensiblemente largo.',
      'Esta química única sugiere algo fascinante sobre el sistema estelar de origen de Borisov. Quizás se formó alrededor de una estrella enana roja muy pequeña y fría, donde la zona congelada de monóxido de carbono estaba mucho más cerca de la estrella. O quizás se formó en un disco protoplanetario inusualmente rico en carbono. Sea cual sea la respuesta, la abundancia de CO de Borisov nos dio la primera prueba tangible de que las "recetas" químicas para construir sistemas planetarios pueden variar enormemente en toda la Vía Láctea. El universo es un chef creativo que usa ingredientes ligeramente diferentes en cada cocina estelar.'
    ],
    expandables: [
      { label: 'El Observatorio ALMA', icon: 'zap', text: 'El Atacama Large Millimeter/submillimeter Array (ALMA) es un conjunto gigante de antenas de radio en lo alto del desierto de Atacama en Chile. ALMA fue crucial para detectar el monóxido de carbono en Borisov porque las moléculas de CO emiten ondas de radio muy específicas cuando giran y vibran en el frío del espacio, una firma que los telescopios ópticos normales no pueden ver tan claramente.' },
      { label: 'Veneno Interestelar', icon: 'atom', text: 'Aunque el monóxido de carbono (CO) y el cianuro de hidrógeno (HCN) son gases muy letales para los humanos en la Tierra, son moléculas fundamentales en el espacio interestelar. Son muy estables y comunes en las frías nubes moleculares donde nacen las estrellas. En astronomía astroquímica, su presencia nos habla de las condiciones de baja temperatura, no de toxicidad.' }
    ],
    fact: 'El cometa Borisov expulsaba monóxido de carbono a una velocidad de aproximadamente varios kilogramos por segundo. Para ponerlo en perspectiva, estaba emitiendo tanto CO al espacio cada segundo como las emisiones combinadas de varios coches deportivos conduciendo a toda velocidad, ¡todo desde un trozo de hielo de menos de un kilómetro de diámetro calentándose bajo el Sol!'
  },
  {
    id: 'nucleo-fragmentacion',
    title: 'El Núcleo y la Fragmentación',
    color: '#69F0AE',
    btnImage: '/assets/interestelar/infographic_m3/btn_nucleo-fragmentacion.jpg',
    image: '/assets/interestelar/infographic_m3/hero_nucleo-fragmentacion.jpg',
    content: [
      'En el corazón de cada cometa hay un núcleo sólido, la verdadera "bola de nieve sucia". Debido a que los cometas están envueltos en enormes nubes de gas brillante y polvo expansivo (la coma), ver directamente el núcleo sólido es como intentar ver una pequeña bombilla a través de una espesa niebla. Los astrónomos usaron los mejores telescopios del mundo, incluido el Hubble, para medir cuánta luz provenía del centro exacto del objeto y estimar su tamaño. Los cálculos revelaron que el núcleo de Borisov era sorprendentemente pequeño, con un radio estimado de entre 400 y 1000 metros (menos de 1 kilómetro).',
      'Imagínate un trozo de hielo oscuro, poroso y frágil, del tamaño del parque central de tu ciudad o de unos pocos rascacielos agrupados. Esta pequeña montaña de hielo interestelar había sobrevivido a un viaje de quizás cientos de millones, o miles de millones de años a través del vacío, solo para enfrentarse a su prueba más dura: el ardiente calor de nuestro Sol. Cuando Borisov alcanzó su punto más cercano al Sol (el perihelio) en diciembre de 2019, estaba a unos 300 millones de kilómetros de distancia. Eso es el doble de la distancia de la Tierra al Sol; frío para nosotros, pero una ola de calor catastrófica para un bloque de hielos volátiles del espacio profundo.',
      'El hielo comenzó a hervir, expandirse y fisurarse bajo el estrés térmico. Los cometas son objetos frágiles, formados por trozos de hielo y rocas unidos débilmente, con más agujeros vacíos que materia sólida, casi como el algodón de azúcar o la nieve recién caída pero sucia. A medida que los gases volátiles como el monóxido de carbono explotaban desde el interior hacia el vacío del espacio, ejercían presiones tremendas sobre la débil estructura del pequeño núcleo de Borisov. Los astrónomos observaban nerviosos, sabiendo que los cometas a menudo se desintegran por completo bajo la implacable radiación solar.',
      'En marzo de 2020, ocurrió el drama cósmico. Telescopios en Polonia y el telescopio espacial Hubble detectaron de repente múltiples núcleos brillantes dentro de la coma de Borisov. ¡El cometa se había roto! Un trozo importante del núcleo principal se había desprendido y ahora volaba junto al fragmento más grande. Fue un evento de fragmentación clásico impulsado por estallidos de gas. Imagina un glaciar partiéndose y soltando icebergs, pero sucediendo a 100,000 kilómetros por hora en el vacío del espacio, impulsado por géiseres de gas venenoso a alta presión.',
      'Afortunadamente, Borisov no se desintegró por completo como ocurre a veces con los cometas que se acercan demasiado al Sol. El fragmento más pequeño se desvaneció y probablemente se vaporizó después de unas semanas, pero el núcleo principal sobrevivió al encuentro. Aunque herido y habiendo perdido masa, Borisov conservó suficiente de sí mismo para continuar su viaje hacia el exterior de nuestro sistema solar. Llevando ahora las cicatrices de su encuentro cercano con nuestra estrella, la reliquia interestelar volvió a sumergirse en la oscuridad eterna, alejándose a gran velocidad para nunca volver.'
    ],
    expandables: [
      { label: 'El Efecto Cohete', icon: 'zap', text: 'Cuando un cometa es calentado por el Sol, los chorros de gas expulsados actúan como diminutos motores de cohete. Como estos chorros a menudo salen en direcciones irregulares debido a la forma asimétrica del núcleo y a las áreas expuestas de hielo, empujan físicamente al cometa. Esto causa cambios sutiles en su velocidad y órbita conocidos como aceleración no gravitacional, algo que los astrónomos deben tener en cuenta al rastrear su ruta.' },
      { label: 'Como un Azucarillo', icon: 'atom', text: 'Se cree que la densidad típica del núcleo de un cometa es baja, a menudo menos de la mitad de la densidad del agua líquida (menos de 0.5 g/cmÂ³). Si pudieras encontrar un océano lo suficientemente grande, la mayoría de los cometas flotarían en él como corcho. Son altamente porosos, una aglomeración suelta de material congelado muy diferente a las rocas sólidas de los asteroides.' }
    ],
    fact: 'El evento de fragmentación en marzo de 2020 resultó en un estallido repentino de brillo (un aumento de aproximadamente 0.7 magnitudes), ya que el nuevo material helado expuesto en las caras rotas del núcleo comenzó a sublimarse furiosamente, arrojando nubes frescas de polvo reflectante que fueron captadas brillantemente por los telescopios terrestres.'
  },
  {
    id: 'sistema-origen',
    title: '¿De Dónde Vino?',
    color: '#FFB300',
    btnImage: '/assets/interestelar/infographic_m3/btn_sistema-origen.jpg',
    image: '/assets/interestelar/infographic_m3/hero_sistema-origen.jpg',
    content: [
      'Una vez que supimos que Borisov era un intruso interestelar, la pregunta inmediata de todos los astrónomos del mundo fue: ¿de qué estrella vino? Gracias al preciso catálogo de la misión Gaia de la Agencia Espacial Europea, que ha mapeado las posiciones y movimientos de más de mil millones de estrellas en la Vía Láctea, los científicos pudieron rebobinar la cinta cósmica. Si conoces la trayectoria exacta por la que Borisov entró en nuestro sistema solar y su velocidad, puedes trazar una línea imaginaria hacia atrás en el espacio profundo y ver a través de qué vecindarios estelares pudo haber pasado.',
      'El equipo de astrónomos liderado por Coryn Bailer-Jones trazó la ruta de Borisov millones de años hacia el pasado. Calcularon los movimientos pasados de miles de estrellas locales y cruzaron esos datos con la trayectoria del cometa. Encontraron un candidato muy intrigante: un sistema estelar binario conocido como Kruger 60, ubicado a unos 13 años luz de distancia en la constelación de Cefeo. Hace aproximadamente un millón de años, Borisov pasó "peligrosamente" cerca (en términos astronómicos) de Kruger 60 a una velocidad increíblemente baja de solo unos pocos kilómetros por segundo en relación con esa estrella.',
      'Kruger 60 es un par de estrellas enanas rojas (estrellas muy frías y pequeñas, más pequeñas que nuestro Sol) que orbitan entre sí. La coincidencia de la baja velocidad relativa y la trayectoria cercana es fascinante. Es muy posible que Borisov haya sido expulsado originalmente de los bordes exteriores de Kruger 60. Imagina un sistema planetario naciente alrededor de esas pequeñas estrellas; la gravedad de los planetas gigantes en migración actúa como un tirachinas gigante, arrojando billones de cometas de hielo al espacio interestelar. Borisov podría ser una de esas balas de hielo expulsadas.',
      'Sin embargo, en astronomía es muy difícil estar cien por ciento seguro de algo que sucedió hace tanto tiempo y tan lejos. Debido a que las incertidumbres matemáticas crecen exponencialmente cuanto más retrocedemos en el tiempo, Kruger 60 es el mejor sospechoso que tenemos, pero no es una certeza definitiva. Otra teoría, respaldada por la altísima concentración de monóxido de carbono, sugiere que Borisov nació en un disco protoplanetario alrededor de una estrella rica en carbono en una región de formación estelar densa, donde las perturbaciones gravitacionales violentas de otras estrellas pasantes lo arrancaron de su órbita natal hace miles de millones de años.',
      'Independientemente de la estrella específica en la que nació, la mera existencia de 2I/Borisov es una confirmación espectacular de una vieja teoría. Durante décadas, los astrónomos sospechaban que el espacio entre las estrellas no estaba vacío, sino lleno de cuatrillones de asteroides y cometas expulsados por los sistemas planetarios de toda la galaxia. Estos objetos flotan solitarios en la oscuridad durante toda su existencia. Nosotros solo vemos a aquellos poquísimos que tienen la suerte (o la mala suerte) cósmica de apuntar directamente hacia nuestro sistema solar interior para ser iluminados brevemente por el calor del Sol.'
    ],
    expandables: [
      { label: 'La Misión Gaia', icon: 'zap', text: 'El satélite Gaia de la ESA es esencialmente la mejor cámara de mapeo 3D de la historia de la humanidad. Mide con extrema precisión la posición, la distancia y el movimiento propio de más de mil millones de estrellas de nuestra galaxia. Sin el mapa en movimiento de Gaia, habría sido imposible intentar rastrear de dónde vino el cometa Borisov, ya que no sabríamos dónde estaban las otras estrellas en el pasado.' },
      { label: 'El Tirachinas Gravitacional', icon: 'clock', text: 'La expulsión de cometas es un subproducto normal de la formación planetaria. En nuestro propio sistema solar, los planetas gigantes como Júpiter y Neptuno dispersaron gravitacionalmente billones de rocas y cometas helados, arrojándolos al espacio profundo para siempre, o formando la lejana Nube de Oort. Cada estrella con planetas probablemente esparce su propia "basura" por la galaxia, contaminando el vacío con fósiles helados.' }
    ],
    fact: 'El espacio está tan vacío que las probabilidades de que un cometa interestelar choque con la Tierra son prácticamente cero. Sin embargo, los astrónomos calculan que, en cualquier momento dado, hay miles de estos pequeños objetos interestelares viajando silenciosamente e invisibles a través de los confines exteriores de nuestro sistema solar, más allá de la órbita de Neptuno.'
  },
  {
    id: 'comparacion-oumuamua',
    title: 'Borisov vs Oumuamua',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m3/btn_comparacion-oumuamua.jpg',
    image: '/assets/interestelar/infographic_m3/hero_comparacion-oumuamua.jpg',
    content: [
      'Al comparar a 2I/Borisov con 1I/Oumuamua, los astrónomos descubrieron una historia de contrastes absolutos que resalta la increíble diversidad de nuestro universo. Oumuamua fue el primer visitante, y rompió todos los esquemas mentales. Tenía forma de cigarro o disco aplanado, estaba inactivo, no tenía polvo, y parecía reflejar un tono rojizo denso. Parecía un pedazo de metralla metálica o rocosa del núcleo de un planeta destruido. Su movimiento anómalo (acelerando al alejarse del Sol sin liberar gas visible) hizo que las teorías más locas circularan por los foros de ciencia.',
      'Por el contrario, 2I/Borisov era tranquilizadoramente normal. Visualmente, con su coma brillante, su núcleo helado sublimándose y su larga y clásica cola de polvo alejándose del Sol, se habría mezclado perfectamente con una multitud de cometas nativos de nuestro sistema solar. Esta "normalidad" fue crucial, porque demostró que los procesos físicos y químicos que formaron la Nube de Oort alrededor de nuestro Sol no son un milagro único. Son procesos estándar de la física cósmica que ocurren de manera idéntica en los gélidos viveros de otros sistemas planetarios de la Vía Láctea.',
      'Sin embargo, ambos compartían una característica crucial: la velocidad. Oumuamua viajaba a 26 kilómetros por segundo antes de sentir la gravedad del Sol, y Borisov viajaba aún más rápido, a 32 kilómetros por segundo. Estas velocidades hiperbólicas masivas fueron la huella dactilar innegable de su origen extrasolar. Ambos penetraron nuestro escudo planetario como balas de francotirador disparadas desde la oscuridad, doblaron sus trayectorias dramáticamente al rodear nuestra estrella debido a la gravedad, y luego salieron disparados de regreso hacia el abismo interestelar en direcciones diferentes.',
      'El análisis químico nos muestra el gran contraste de sus orígenes. Oumuamua estaba tan seco como un hueso blanqueado al sol, quizás cocinado y despojado de sus volátiles durante la catastrófica explosión de su sistema solar original, o tal vez era un fragmento rocoso originado en las ardientes regiones interiores de su estrella, parecido a nuestros asteroides cercanos al sol. Borisov, empapado en hielos tóxicos de monóxido de carbono ultrafrío y cianuro, nació claramente en la nevera cósmica profunda de las afueras frígidas de su sistema, un fósil químico prístino y congelado.',
      'El legado de estos dos primeros descubrimientos es el nacimiento de un nuevo campo científico. Antes de 2017, los objetos interestelares eran solo teoría matemática. Hoy, son una realidad observable. Los astrónomos están construyendo gigantescos telescopios de nueva generación, como el Observatorio Vera C. Rubin en Chile, equipado con la cámara digital más grande del mundo. Escaneará todo el cielo cada pocas noches con el objetivo específico de capturar no solo a uno o dos, sino quizás a docenas de estos fantasmas errantes cada año, abriendo una ventana sin precedentes a las estrellas distantes.'
    ],
    expandables: [
      { label: 'El Misterio de la Forma', icon: 'zap', text: 'Oumuamua mostraba una fluctuación de brillo extrema a medida que giraba, lo que los astrónomos interpretaron como un objeto muy alargado (forma de cigarro) o muy aplanado (forma de panqueque), cayendo dando tumbos caóticamente. Borisov no mostró tales fluctuaciones dramáticas, lo que indica que su núcleo era más redondo, grumoso y simétrico, muy parecido a las bolas de nieve de los cometas regulares como el cometa Halley o Churyumov-Gerasimenko.' },
      { label: 'El Telescopio Vera Rubin', icon: 'atom', text: 'Anteriormente conocido como LSST (Large Synoptic Survey Telescope), el Observatorio Vera C. Rubin revolucionará nuestra capacidad de encontrar objetos interestelares. Tiene un espejo enorme y una cámara de 3200 megapíxeles. Al fotografiar rápidamente todo el cielo visible repetidamente, su software detectará instantáneamente objetos que se mueven rápido en órbitas extrañas, alertando a los astrónomos semanas o meses antes de que pasen cerca del Sol.' }
    ],
    fact: 'A pesar de sus diferencias, tanto Oumuamua como Borisov han cruzado ya la órbita de Júpiter en su viaje de salida y se están adentrando en el frío del espacio profundo. Viajan tan rápido que ninguna de nuestras naves espaciales actuales podría atraparlos. Se irán para siempre, llevando consigo los secretos finales de sus estrellas maternas en su solitario viaje por la Vía Láctea.'
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      hue: Math.random() > 0.5 ? '129,212,250' : '21,101,192', // ice blue or deep blue
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

// â”€â”€â”€ Comet Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CometHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(129,212,250,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#cometGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#81D4FA','#1565C0','#00BCD4','#7E57C2','#69F0AE','#FFB300','#B3E5FC'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Comet icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#81D4FA" strokeWidth="1.5" opacity="0.6" />
        <circle cx="296" cy="34" r="4" fill="#81D4FA" opacity="0.8" />
        <path d="M 300 30 Q 315 15 325 5" fill="none" stroke="#81D4FA" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="cometGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(129,212,250,0.2)" />
            <stop offset="50%" stopColor="rgba(129,212,250,0.9)" />
            <stop offset="100%" stopColor="rgba(129,212,250,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#81D4FA" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">2I/BORISOV</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(129,212,250,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">EL COMETA ERRANTE</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(129,212,250,0.2)'}`,
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
          layoutId="activeDotComet"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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

      {/* â”€â”€â”€ Body Grid â”€â”€â”€ */}
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
                position: 'absolute'...pos, zIndex: 1, pointerEvents:'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            marginTop: '1.5rem', position: 'relative', zIndex: 2,
          }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
            ))}
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem', padding: '1.2rem',
          background: `linear-gradient(90deg, ${node.color}20, transparent)`,
          borderLeft: `4px solid ${node.color}`, borderRadius: '0 12px 12px 0',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          position: 'relative', zIndex: 2,
        }}>
          <Star size={24} style={{ color: node.color, flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
            {node.fact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, activeId, explored }) {
  const progress = (explored.size / nodes.length) * 100;
  return (
    <div style={{ marginTop: '2rem', padding: '0 1rem', maxWidth: '400px', margin: '2rem auto 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Exploración del Cometa</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #81D4FA, #00BCD4)',
            boxShadow: '0 0 10px rgba(129,212,250,0.5)',
          }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM3() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      setExplored(prev => new Set(prev).add(id));
    }
  };

  const activeNodeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(to bottom, #050814, #0a1128)',
      borderRadius: '24px',
      padding: '2rem',
      color: 'white',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(129,212,250,0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '800px',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CometHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          margin: '2rem 0',
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

        {/* Active Content Panel */}
        <AnimatePresence mode="wait">
          {activeNodeData && (
            <ContentPanel
              key={activeNodeData.id}
              node={activeNodeData}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        <ProgressBar nodes={INFOGRAPHIC_NODES} activeId={activeNode} explored={explored} />

        {/* Bibliography */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '16px',
          border: '1px solid rgba(129,212,250,0.15)',
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'rgba(129,212,250,0.8)', letterSpacing: '1px' }}>
            REFERENCIAS Y FUENTES
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
