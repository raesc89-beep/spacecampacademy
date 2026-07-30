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
};

const BIBLIOGRAPHY = [
  'Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", ApJ Letters, 886',
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
      'Imagina mirar el cielo nocturno y encontrar un mensaje embotellado que viene desde una estrella lejana. Eso fue exactamente lo que le sucediÃ³ al astrÃ³nomo aficionado Gennady Borisov en la madrugada del 30 de agosto de 2019. Trabajando desde su propio observatorio en Crimea, este incansable cazador de cometas estaba escrutando el firmamento con un telescopio que Ã©l mismo habÃ­a construido pieza por pieza. No dependÃ­a de agencias espaciales gigantes con presupuestos multimillonarios; solo de su paciencia, su conocimiento y un espejo de 0.65 metros diseÃ±ado especÃ­ficamente para capturar la luz mÃ¡s tenue del universo.',
      'El telescopio de Borisov, llamado MARGO, no es como los juguetes que ves en las tiendas. Es una mÃ¡quina de precisiÃ³n excepcional, diseÃ±ada con una relaciÃ³n focal muy rÃ¡pida para captar objetos difusos que los grandes observatorios profesionales a menudo pasan por alto porque estÃ¡n enfocados en otras investigaciones. Esa madrugada, Gennady notÃ³ una pequeÃ±a mancha borrosa moviÃ©ndose contra el fondo fijo de las estrellas en la constelaciÃ³n de Casiopea. Al principio, parecÃ­a un cometa ordinario de nuestro propio vecindario, pero su velocidad y trayectoria pronto revelarÃ­an un secreto que sacudirÃ­a a toda la comunidad astronÃ³mica.',
      'Descubrir un cometa no es simplemente mirar por un ocular y gritar Â¡eureka! Requiere tomar mÃºltiples fotografÃ­as a lo largo de varias horas para detectar el movimiento de un objeto en relaciÃ³n con las estrellas de fondo. Es como jugar al juego de "encuentra las diferencias" pero con miles de puntos de luz. Borisov enviÃ³ cuidadosamente sus observaciones al Minor Planet Center (Centro de Planetas Menores), la organizaciÃ³n internacional responsable de catalogar todos los objetos que se mueven en nuestro sistema solar. En ese momento, el objeto recibiÃ³ la designaciÃ³n temporal "gb00234", y comenzÃ³ la cuenta regresiva para confirmar su verdadera identidad.',
      'Lo que hace que este descubrimiento sea verdaderamente inspirador para cualquier entusiasta de la astronomÃ­a es que demuestra que el cielo nocturno todavÃ­a guarda secretos accesibles para quienes estÃ©n dispuestos a mirar. Mientras los telescopios espaciales como el Hubble o el James Webb estudian galaxias a miles de millones de aÃ±os luz de distancia, el espacio cercano todavÃ­a puede sorprendernos. Gennady Borisov ya habÃ­a descubierto varios cometas antes de este, pero ninguno se compararÃ­a con la magnitud de este hallazgo. HabÃ­a atrapado a un visitante interestelar con sus propias manos y herramientas, demostrando el inmenso valor de la astronomÃ­a amateur en el siglo veintiuno.',
      'La noticia del descubrimiento se propagÃ³ como un incendio forestal por los observatorios de todo el mundo. Los astrÃ³nomos profesionales, al ver los datos de la trayectoria inicial calculada por el software del Centro de Planetas Menores, se dieron cuenta de inmediato de que los nÃºmeros no encajaban con un cometa de la familia de JÃºpiter o de la Nube de Oort. La velocidad del objeto, incluso a esa inmensa distancia del Sol, era excesiva. ComenzÃ³ entonces una carrera frenÃ©tica contrarreloj para apuntar los telescopios mÃ¡s grandes de la Tierra hacia esa pequeÃ±a mancha de luz, buscando confirmar si realmente estÃ¡bamos ante el segundo visitante interestelar jamÃ¡s detectado en la historia humana.'
    ],
    expandables: [
      { label: 'El AstrÃ³nomo y su MÃ¡quina', icon: 'zap', text: 'Gennady Borisov no es un astrÃ³nomo profesional empleado por una universidad, sino un ingeniero y fabricante de telescopios. DiseÃ±Ã³ y construyÃ³ Ã©l mismo el instrumento MARGO de 0.65 metros especÃ­ficamente para tener un amplio campo de visiÃ³n, optimizado para detectar cometas que se acercan desde direcciones inusuales. Su Ã©xito demuestra que la innovaciÃ³n tÃ©cnica individual todavÃ­a puede competir con los grandes presupuestos.' },
      { label: 'Â¿CÃ³mo se nombran los cometas?', icon: 'clock', text: 'Tradicionalmente, los cometas llevan el nombre de sus descubridores (hasta tres personas). Cuando se confirmÃ³ la naturaleza de este objeto, la UniÃ³n AstronÃ³mica Internacional rompiÃ³ sus propias reglas. En lugar de un nombre complejo con nÃºmeros, decidieron bautizarlo oficialmente como 2I/Borisov. El "2I" significa que es el segundo objeto interestelar confirmado (despuÃ©s de 1I/Oumuamua), y "Borisov" honra a su descubridor.' }
    ],
    fact: 'El cometa fue descubierto cuando se encontraba a unas 3 unidades astronÃ³micas del Sol (tres veces la distancia entre la Tierra y el Sol), mucho mÃ¡s allÃ¡ de la Ã³rbita de Marte. A esa distancia, la temperatura es extremadamente baja, pero ya era suficiente para que los hielos volÃ¡tiles de su superficie comenzaran a sublimarse y formar la coma brillante que permitiÃ³ a Borisov detectarlo contra el cielo oscuro.'
  },
  {
    id: 'confirmacion-interestelar',
    title: 'ConfirmaciÃ³n Interestelar',
    color: '#1565C0',
    btnImage: '/assets/interestelar/infographic_m3/btn_confirmacion-interestelar.jpg',
    image: '/assets/interestelar/infographic_m3/hero_confirmacion-interestelar.jpg',
    content: [
      'En astronomÃ­a, la forma de la Ã³rbita de un objeto es como su pasaporte: te dice de dÃ³nde viene y a dÃ³nde va. Los planetas y los cometas de nuestro propio sistema solar viajan en Ã³rbitas elÃ­pticas, que son como Ã³valos cerrados. Imagina que estÃ¡n atados al Sol por una cuerda elÃ¡stica invisible llamada gravedad. No importa cuÃ¡nto se alejen, siempre regresan. La excentricidad de una Ã³rbita mide cuÃ¡n alargado es ese Ã³valo, y para los objetos que pertenecen a nuestro sistema, ese nÃºmero siempre es menor que 1. Si la excentricidad es exactamente 1, tienes una parÃ¡bola, el lÃ­mite absoluto entre estar atrapado y estar libre.',
      'Cuando los astrÃ³nomos introdujeron las posiciones medidas del cometa Borisov en sus computadoras, los cÃ¡lculos arrojaron un nÃºmero que dejÃ³ a todos boquiabiertos: una excentricidad de 3.36. Este nÃºmero es gigantesco en tÃ©rminos de mecÃ¡nica orbital. Una excentricidad mayor que 1 significa que la Ã³rbita es una hipÃ©rbola, una curva completamente abierta. Es como un coche que viaja por una carretera recta, toma una curva rÃ¡pida alrededor de una rotonda (el Sol) y luego sale disparado por otra carretera recta para no volver jamÃ¡s. El nÃºmero 3.36 era tan ridÃ­culamente alto que no habÃ­a margen de error: este cometa no era nuestro, venÃ­a del espacio profundo.',
      'Para entender la velocidad de Borisov, imagina lanzar una pelota al aire. Si la lanzas suavemente, la gravedad de la Tierra la hace caer (Ã³rbita elÃ­ptica). Si la disparas con un cohete gigante, escaparÃ¡ de la Tierra para siempre (Ã³rbita hiperbÃ³lica). Borisov entrÃ³ en nuestro sistema solar moviÃ©ndose a unos asombrosos 32.2 kilÃ³metros por SEGUNDO (unos 116,000 kilÃ³metros por hora) antes de sentir el tirÃ³n principal del Sol. A esa velocidad, la gravedad de nuestra estrella no era lo suficientemente fuerte como para capturarlo. Solo pudo doblar ligeramente su trayectoria antes de que el cometa continuara su viaje eterno hacia el vacÃ­o interestelar.',
      'La confirmaciÃ³n oficial llegÃ³ a travÃ©s del Minor Planet Center y del Jet Propulsion Laboratory de la NASA. DespuÃ©s de reunir cientos de observaciones de docenas de telescopios terrestres, la trayectoria se delineÃ³ con precisiÃ³n milimÃ©trica. En ese momento, la UniÃ³n AstronÃ³mica Internacional tomÃ³ una decisiÃ³n histÃ³rica: crearon una nueva clasificaciÃ³n para objetos celestes. El cometa C/2019 Q4 (su nombre preliminar) fue rebautizado como 2I/Borisov. El prefijo "2I" cimentÃ³ su lugar en la historia como el segundo objeto interestelar confirmado, abriendo oficialmente la puerta a un nuevo campo de la astronomÃ­a: el estudio de visitantes de otras estrellas.',
      'A diferencia de Oumuamua (el primer objeto interestelar 1I, descubierto en 2017), Borisov fue encontrado mucho antes de alcanzar su punto mÃ¡s cercano al Sol (el perihelio). Oumuamua nos sorprendiÃ³ por la espalda cuando ya se estaba alejando rÃ¡pidamente hacia la oscuridad. Borisov, en cambio, venÃ­a de frente, dÃ¡ndonos meses de anticipaciÃ³n para planificar observaciones. Fue como recibir una invitaciÃ³n a una fiesta interestelar con meses de antelaciÃ³n, permitiendo a los astrÃ³nomos reservar tiempo en los telescopios mÃ¡s grandes del mundo, incluyendo el Telescopio Espacial Hubble, para estudiar a este alienÃ­gena de hielo en todo su esplendor.'
    ],
    expandables: [
      { label: 'MatemÃ¡ticas del Infinito', icon: 'atom', text: 'La excentricidad orbital es una maravilla matemÃ¡tica. Un cÃ­rculo perfecto tiene excentricidad 0. La Tierra tiene 0.016 (casi circular). Los cometas locales tÃ­picos tienen entre 0.9 y 0.99 (muy alargados pero cerrados). Una excentricidad de 3.36 significa que la trayectoria es tan abierta que forma un Ã¡ngulo muy ancho, indicando que la energÃ­a cinÃ©tica del cometa era inmensamente superior a la energÃ­a potencial gravitatoria del Sol.' },
      { label: 'La Velocidad de Escape', icon: 'zap', text: 'Para que el Sol capture un objeto, este debe moverse por debajo de la "velocidad de escape" local. A la distancia donde se descubriÃ³ Borisov, la velocidad de escape del Sol es de unos 24 km/s. Borisov viajaba a mÃ¡s de 30 km/s en ese punto. No habÃ­a ninguna combinaciÃ³n fÃ­sica posible donde la gravedad del Sol, o de planetas gigantes como JÃºpiter, pudiera frenarlo lo suficiente como para mantenerlo en nuestro sistema.' }
    ],
    fact: 'El Telescopio Espacial Hubble capturÃ³ imÃ¡genes increÃ­bles de 2I/Borisov pasando a unos 300 millones de kilÃ³metros de la Tierra. Fue la primera vez que la humanidad pudo observar el nÃºcleo brillante y la extensa atmÃ³sfera de polvo y gas de un cometa originario de otro sistema planetario, con el nivel de detalle que solo puede proporcionar un telescopio situado por encima de la atmÃ³sfera terrestre.'
  },
  {
    id: 'primer-cometa-alien',
    title: 'Primer Cometa de Otro Sistema',
    color: '#00BCD4',
    btnImage: '/assets/interestelar/infographic_m3/btn_primer-cometa-alien.jpg',
    image: '/assets/interestelar/infographic_m3/hero_primer-cometa-alien.jpg',
    content: [
      'Cuando Oumuamua, el primer visitante interestelar, atravesÃ³ nuestro sistema solar, nos dejÃ³ rascÃ¡ndonos la cabeza. ParecÃ­a un asteroide alargado, una especie de cigarro o panqueque de roca, sin ninguna cola visible de polvo o gas. Era tan extraÃ±o que algunos incluso especularon de manera descabellada sobre naves espaciales. Pero cuando apareciÃ³ Borisov, fue un suspiro de alivio astronÃ³mico. Â¡Borisov se comportaba exactamente como un cometa deberÃ­a comportarse! TenÃ­a una brillante coma (una nube difusa de gas) y una cola polvorienta que se extendÃ­a en direcciÃ³n opuesta al Sol. Era reconfortantemente normal, excepto por el hecho de que venÃ­a de otra estrella.',
      'Un cometa es esencialmente una "bola de nieve sucia", como la describiÃ³ el famoso astrÃ³nomo Fred Whipple. EstÃ¡ compuesto de hielos primordiales, polvo y rocas que se formaron en los confines helados de un sistema planetario. Cuando un cometa se acerca a una estrella caliente, el hielo no se derrite, sino que pasa directamente de sÃ³lido a gas, un proceso llamado sublimaciÃ³n. Es como el hielo seco que ves en los conciertos o en Halloween, que produce humo blanco de inmediato. Este gas en expansiÃ³n arrastra partÃ­culas de polvo, creando la espectacular coma y la larga cola que podemos ver desde la Tierra a travÃ©s de nuestros telescopios.',
      'Lo asombroso de 2I/Borisov es que nos demostrÃ³ visualmente, por primera vez y sin lugar a dudas, que el proceso de formaciÃ³n de cometas no es exclusivo de nuestro sistema solar. En el disco de gas y polvo que rodeaba al joven Sol hace 4.500 millones de aÃ±os, el agua y otros volÃ¡tiles se congelaron lejos del calor central, formando nuestros cometas locales. El hecho de que Borisov se vea y actÃºe como un cometa demuestra que una fÃ­sica y una quÃ­mica muy similares operan alrededor de otras estrellas. Nos dice que hay "nubes de Oort" exoplanetarias llenas de miles de millones de estas bolas de nieve sucias, esperando ser expulsadas al espacio.',
      'Los anÃ¡lisis de la luz reflejada por la coma de Borisov revelaron que estaba expulsando gas y polvo a tasas muy similares a los cometas muy activos de nuestro sistema. Los espectrÃ³grafos de grandes telescopios separaron la luz del cometa en un arco iris de colores, buscando las firmas quÃ­micas especÃ­ficas de diferentes molÃ©culas. Encontraron gas cianÃ³geno (CN) y carbono diatÃ³mico (C2), que son ingredientes clÃ¡sicos que dan a los cometas locales ese hermoso tono verdoso en las fotografÃ­as. Desde lejos, si no conocieras su Ã³rbita extrema hiperbÃ³lica, jurarÃ­as que Borisov era simplemente otro residente temporal del vecindario del Sol.',
      'Sin embargo, debajo de esa apariencia familiar, se escondÃ­a una reliquia alienÃ­gena inestimable. Borisov no habÃ­a sido tocado por el calor de una estrella probablemente en miles de millones de aÃ±os. HabÃ­a viajado a travÃ©s de la gÃ©lida negrura del medio interestelar a temperaturas cercanas al cero absoluto. Cuando el calor de nuestro Sol comenzÃ³ a calentar su superficie, estaba liberando gases que habÃ­an estado congelados y sellados desde la formaciÃ³n de un sistema estelar completamente diferente. Estudiar esa coma no era solo astronomÃ­a; era arqueologÃ­a quÃ­mica de un mundo lejano, ofreciÃ©ndonos una muestra gratuita de la nube primordial de otra estrella.'
    ],
    expandables: [
      { label: 'El Verdadero Oumuamua', icon: 'zap', text: 'Mientras Borisov es un cometa clÃ¡sico rico en hielos volÃ¡tiles, Oumuamua se comportÃ³ mÃ¡s como un asteroide rocoso o un fragmento de planeta destruido, extremadamente seco y desprovisto de polvo visible. Esta diferencia nos enseÃ±a que los sistemas estelares eyectan una gran variedad de escombros, y dependiendo de quÃ© parte de su sistema de origen fueron expulsados, pueden ser rocosos o helados. Borisov representa a la poblaciÃ³n de los confines frÃ­os de su sistema materno.' },
      { label: 'La Coma y el Viento Solar', icon: 'atom', text: 'La coma de un cometa puede llegar a ser mÃ¡s grande que el diÃ¡metro de JÃºpiter o incluso del Sol, a pesar de que el nÃºcleo de hielo en el centro tiene solo unos pocos kilÃ³metros de tamaÃ±o. La cola siempre apunta lejos del Sol, no porque el cometa se mueva rÃ¡pido, sino porque el intenso "viento solar" (una corriente de partÃ­culas cargadas) y la presiÃ³n de la radiaciÃ³n lumÃ­nica empujan fÃ­sicamente el gas y el polvo hacia atrÃ¡s como una manga de viento en un huracÃ¡n.' }
    ],
    fact: 'Observaciones prolongadas con el Telescopio Espacial Hubble mostraron que el tamaÃ±o de la coma de Borisov era enorme y muy rica en polvo microscÃ³pico. Las partÃ­culas de polvo tenÃ­an propiedades de dispersiÃ³n de luz casi idÃ©nticas a las del cometa Hale-Bopp, uno de los cometas mÃ¡s brillantes y masivos observados en nuestro sistema solar en el siglo XX, lo que sugiere procesos de formaciÃ³n increÃ­blemente similares.'
  },
  {
    id: 'composicion-molecular',
    title: 'ComposiciÃ³n Molecular',
    color: '#7E57C2',
    btnImage: '/assets/interestelar/infographic_m3/btn_composicion-molecular.jpg',
    image: '/assets/interestelar/infographic_m3/hero_composicion-molecular.jpg',
    content: [
      'Al principio, Borisov parecÃ­a el gemelo de nuestros cometas locales, pero a medida que los astrÃ³nomos analizaron su composiciÃ³n con instrumentos mÃ¡s sensibles, comenzaron a notar que este alienÃ­gena tenÃ­a una quÃ­mica profundamente inusual. La verdadera magia de la astronomÃ­a moderna es la espectroscopia: la capacidad de usar un prisma de alta tecnologÃ­a para descomponer la luz de un objeto distante en sus colores componentes. Cada elemento quÃ­mico y molÃ©cula absorbe o emite luz en colores muy especÃ­ficos, creando un cÃ³digo de barras Ãºnico. Al leer el cÃ³digo de barras de la luz de Borisov, los cientÃ­ficos descubrieron algo extraordinario sobre su composiciÃ³n.',
      'El hallazgo mÃ¡s sorprendente de la composiciÃ³n quÃ­mica de Borisov fue su cantidad masiva de monÃ³xido de carbono (CO). En los cometas tÃ­picos de nuestro sistema solar, el agua (H2O) es, con mucho, el hielo mÃ¡s abundante, y los niveles de gas CO suelen ser bastante bajos, una fracciÃ³n del agua. Sin embargo, cuando el telescopio espacial Hubble y el observatorio ALMA en Chile apuntaron a Borisov, detectaron que estaba arrojando monÃ³xido de carbono a un ritmo frenÃ©tico. Â¡El gas CO era entre 9 y 26 veces mÃ¡s abundante en proporciÃ³n al agua que en un cometa promedio de nuestra familia solar! Borisov no era una bola de nieve de agua; era una bola de hielo venenoso de monÃ³xido de carbono.',
      'Para entender por quÃ© esto es tan importante, hay que pensar en la temperatura. El agua se congela a cero grados Celsius. Pero el monÃ³xido de carbono es un gas hiper-volÃ¡til; necesita temperaturas increÃ­blemente bajas, por debajo de los -250 grados Celsius (cerca de 20 Kelvin), para convertirse en hielo sÃ³lido. Si Borisov estÃ¡ lleno de hielo de CO, significa que se formÃ³ en un lugar extremadamente oscuro y brutalmente frÃ­o. DebiÃ³ haber nacido en los confines mÃ¡s alejados de su sistema estelar nativo, mucho mÃ¡s lejos del equivalente a la Ã³rbita de PlutÃ³n en nuestro sistema solar, donde la luz de su estrella materna era poco mÃ¡s que un punto brillante.',
      'AdemÃ¡s del monÃ³xido de carbono extremo, los astrÃ³nomos tambiÃ©n detectaron grandes cantidades de cianuro de hidrÃ³geno (HCN) y proporciones inusuales de isÃ³topos (versiones mÃ¡s pesadas de Ã¡tomos comunes). El hielo de agua detectado en Borisov mostraba caracterÃ­sticas que sugerÃ­an que el agua misma habÃ­a estado expuesta a la intensa radiaciÃ³n cÃ³smica del espacio interestelar durante eones. Es como si el cometa fuera una cÃ¡psula del tiempo criogÃ©nica que ha acumulado la escarcha y el daÃ±o por radiaciÃ³n del vacÃ­o entre las estrellas a lo largo de un viaje incomprensiblemente largo.',
      'Esta quÃ­mica Ãºnica sugiere algo fascinante sobre el sistema estelar de origen de Borisov. QuizÃ¡s se formÃ³ alrededor de una estrella enana roja muy pequeÃ±a y frÃ­a, donde la zona congelada de monÃ³xido de carbono estaba mucho mÃ¡s cerca de la estrella. O quizÃ¡s se formÃ³ en un disco protoplanetario inusualmente rico en carbono. Sea cual sea la respuesta, la abundancia de CO de Borisov nos dio la primera prueba tangible de que las "recetas" quÃ­micas para construir sistemas planetarios pueden variar enormemente en toda la VÃ­a LÃ¡ctea. El universo es un chef creativo que usa ingredientes ligeramente diferentes en cada cocina estelar.'
    ],
    expandables: [
      { label: 'El Observatorio ALMA', icon: 'zap', text: 'El Atacama Large Millimeter/submillimeter Array (ALMA) es un conjunto gigante de antenas de radio en lo alto del desierto de Atacama en Chile. ALMA fue crucial para detectar el monÃ³xido de carbono en Borisov porque las molÃ©culas de CO emiten ondas de radio muy especÃ­ficas cuando giran y vibran en el frÃ­o del espacio, una firma que los telescopios Ã³pticos normales no pueden ver tan claramente.' },
      { label: 'Veneno Interestelar', icon: 'atom', text: 'Aunque el monÃ³xido de carbono (CO) y el cianuro de hidrÃ³geno (HCN) son gases extremadamente letales para los humanos en la Tierra, son molÃ©culas fundamentales en el espacio interestelar. Son muy estables y comunes en las frÃ­as nubes moleculares donde nacen las estrellas. En astronomÃ­a astroquÃ­mica, su presencia nos habla de las condiciones de baja temperatura, no de toxicidad.' }
    ],
    fact: 'El cometa Borisov expulsaba monÃ³xido de carbono a una velocidad de aproximadamente varios kilogramos por segundo. Para ponerlo en perspectiva, estaba emitiendo tanto CO al espacio cada segundo como las emisiones combinadas de varios coches deportivos conduciendo a toda velocidad, Â¡todo desde un trozo de hielo de menos de un kilÃ³metro de diÃ¡metro calentÃ¡ndose bajo el Sol!'
  },
  {
    id: 'nucleo-fragmentacion',
    title: 'El NÃºcleo y la FragmentaciÃ³n',
    color: '#69F0AE',
    btnImage: '/assets/interestelar/infographic_m3/btn_nucleo-fragmentacion.jpg',
    image: '/assets/interestelar/infographic_m3/hero_nucleo-fragmentacion.jpg',
    content: [
      'En el corazÃ³n de cada cometa hay un nÃºcleo sÃ³lido, la verdadera "bola de nieve sucia". Debido a que los cometas estÃ¡n envueltos en enormes nubes de gas brillante y polvo expansivo (la coma), ver directamente el nÃºcleo sÃ³lido es como intentar ver una pequeÃ±a bombilla a travÃ©s de una espesa niebla. Los astrÃ³nomos usaron los mejores telescopios del mundo, incluido el Hubble, para medir cuÃ¡nta luz provenÃ­a del centro exacto del objeto y estimar su tamaÃ±o. Los cÃ¡lculos revelaron que el nÃºcleo de Borisov era sorprendentemente pequeÃ±o, con un radio estimado de entre 400 y 1000 metros (menos de 1 kilÃ³metro).',
      'ImagÃ­nate un trozo de hielo oscuro, poroso y frÃ¡gil, del tamaÃ±o del parque central de tu ciudad o de unos pocos rascacielos agrupados. Esta pequeÃ±a montaÃ±a de hielo interestelar habÃ­a sobrevivido a un viaje de quizÃ¡s cientos de millones, o miles de millones de aÃ±os a travÃ©s del vacÃ­o, solo para enfrentarse a su prueba mÃ¡s dura: el ardiente calor de nuestro Sol. Cuando Borisov alcanzÃ³ su punto mÃ¡s cercano al Sol (el perihelio) en diciembre de 2019, estaba a unos 300 millones de kilÃ³metros de distancia. Eso es el doble de la distancia de la Tierra al Sol; frÃ­o para nosotros, pero una ola de calor catastrÃ³fica para un bloque de hielos volÃ¡tiles del espacio profundo.',
      'El hielo comenzÃ³ a hervir, expandirse y fisurarse bajo el estrÃ©s tÃ©rmico. Los cometas son objetos frÃ¡giles, formados por trozos de hielo y rocas unidos dÃ©bilmente, con mÃ¡s agujeros vacÃ­os que materia sÃ³lida, casi como el algodÃ³n de azÃºcar o la nieve reciÃ©n caÃ­da pero sucia. A medida que los gases volÃ¡tiles como el monÃ³xido de carbono explotaban desde el interior hacia el vacÃ­o del espacio, ejercÃ­an presiones tremendas sobre la dÃ©bil estructura del pequeÃ±o nÃºcleo de Borisov. Los astrÃ³nomos observaban nerviosos, sabiendo que los cometas a menudo se desintegran por completo bajo la implacable radiaciÃ³n solar.',
      'En marzo de 2020, ocurriÃ³ el drama cÃ³smico. Telescopios en Polonia y el telescopio espacial Hubble detectaron de repente mÃºltiples nÃºcleos brillantes dentro de la coma de Borisov. Â¡El cometa se habÃ­a roto! Un trozo importante del nÃºcleo principal se habÃ­a desprendido y ahora volaba junto al fragmento mÃ¡s grande. Fue un evento de fragmentaciÃ³n clÃ¡sico impulsado por estallidos de gas. Imagina un glaciar partiÃ©ndose y soltando icebergs, pero sucediendo a 100,000 kilÃ³metros por hora en el vacÃ­o del espacio, impulsado por gÃ©iseres de gas venenoso a alta presiÃ³n.',
      'Afortunadamente, Borisov no se desintegrÃ³ por completo como ocurre a veces con los cometas que se acercan demasiado al Sol. El fragmento mÃ¡s pequeÃ±o se desvaneciÃ³ y probablemente se vaporizÃ³ despuÃ©s de unas semanas, pero el nÃºcleo principal sobreviviÃ³ al encuentro. Aunque herido y habiendo perdido masa, Borisov conservÃ³ suficiente de sÃ­ mismo para continuar su viaje hacia el exterior de nuestro sistema solar. Llevando ahora las cicatrices de su encuentro cercano con nuestra estrella, la reliquia interestelar volviÃ³ a sumergirse en la oscuridad eterna, alejÃ¡ndose a gran velocidad para nunca volver.'
    ],
    expandables: [
      { label: 'El Efecto Cohete', icon: 'zap', text: 'Cuando un cometa es calentado por el Sol, los chorros de gas expulsados actÃºan como diminutos motores de cohete. Como estos chorros a menudo salen en direcciones irregulares debido a la forma asimÃ©trica del nÃºcleo y a las Ã¡reas expuestas de hielo, empujan fÃ­sicamente al cometa. Esto causa cambios sutiles en su velocidad y Ã³rbita conocidos como aceleraciÃ³n no gravitacional, algo que los astrÃ³nomos deben tener en cuenta al rastrear su ruta.' },
      { label: 'Como un Azucarillo', icon: 'atom', text: 'Se cree que la densidad tÃ­pica del nÃºcleo de un cometa es increÃ­blemente baja, a menudo menos de la mitad de la densidad del agua lÃ­quida (menos de 0.5 g/cmÂ³). Si pudieras encontrar un ocÃ©ano lo suficientemente grande, la mayorÃ­a de los cometas flotarÃ­an en Ã©l como corcho. Son altamente porosos, una aglomeraciÃ³n suelta de material congelado muy diferente a las rocas sÃ³lidas de los asteroides.' }
    ],
    fact: 'El evento de fragmentaciÃ³n en marzo de 2020 resultÃ³ en un estallido repentino de brillo (un aumento de aproximadamente 0.7 magnitudes), ya que el nuevo material helado expuesto en las caras rotas del nÃºcleo comenzÃ³ a sublimarse furiosamente, arrojando nubes frescas de polvo reflectante que fueron captadas brillantemente por los telescopios terrestres.'
  },
  {
    id: 'sistema-origen',
    title: 'Â¿De DÃ³nde Vino?',
    color: '#FFB300',
    btnImage: '/assets/interestelar/infographic_m3/btn_sistema-origen.jpg',
    image: '/assets/interestelar/infographic_m3/hero_sistema-origen.jpg',
    content: [
      'Una vez que supimos que Borisov era un intruso interestelar, la pregunta inmediata de todos los astrÃ³nomos del mundo fue: Â¿de quÃ© estrella vino? Gracias al preciso catÃ¡logo de la misiÃ³n Gaia de la Agencia Espacial Europea, que ha mapeado las posiciones y movimientos de mÃ¡s de mil millones de estrellas en la VÃ­a LÃ¡ctea, los cientÃ­ficos pudieron rebobinar la cinta cÃ³smica. Si conoces la trayectoria exacta por la que Borisov entrÃ³ en nuestro sistema solar y su velocidad, puedes trazar una lÃ­nea imaginaria hacia atrÃ¡s en el espacio profundo y ver a travÃ©s de quÃ© vecindarios estelares pudo haber pasado.',
      'El equipo de astrÃ³nomos liderado por Coryn Bailer-Jones trazÃ³ la ruta de Borisov millones de aÃ±os hacia el pasado. Calcularon los movimientos pasados de miles de estrellas locales y cruzaron esos datos con la trayectoria del cometa. Encontraron un candidato muy intrigante: un sistema estelar binario conocido como Kruger 60, ubicado a unos 13 aÃ±os luz de distancia en la constelaciÃ³n de Cefeo. Hace aproximadamente un millÃ³n de aÃ±os, Borisov pasÃ³ "peligrosamente" cerca (en tÃ©rminos astronÃ³micos) de Kruger 60 a una velocidad increÃ­blemente baja de solo unos pocos kilÃ³metros por segundo en relaciÃ³n con esa estrella.',
      'Kruger 60 es un par de estrellas enanas rojas (estrellas muy frÃ­as y pequeÃ±as, mÃ¡s pequeÃ±as que nuestro Sol) que orbitan entre sÃ­. La coincidencia de la baja velocidad relativa y la trayectoria cercana es fascinante. Es muy posible que Borisov haya sido expulsado originalmente de los bordes exteriores de Kruger 60. Imagina un sistema planetario naciente alrededor de esas pequeÃ±as estrellas; la gravedad de los planetas gigantes en migraciÃ³n actÃºa como un tirachinas gigante, arrojando billones de cometas de hielo al espacio interestelar. Borisov podrÃ­a ser una de esas balas de hielo expulsadas.',
      'Sin embargo, en astronomÃ­a es muy difÃ­cil estar cien por ciento seguro de algo que sucediÃ³ hace tanto tiempo y tan lejos. Debido a que las incertidumbres matemÃ¡ticas crecen exponencialmente cuanto mÃ¡s retrocedemos en el tiempo, Kruger 60 es el mejor sospechoso que tenemos, pero no es una certeza definitiva. Otra teorÃ­a, respaldada por la altÃ­sima concentraciÃ³n de monÃ³xido de carbono, sugiere que Borisov naciÃ³ en un disco protoplanetario alrededor de una estrella rica en carbono en una regiÃ³n de formaciÃ³n estelar densa, donde las perturbaciones gravitacionales violentas de otras estrellas pasantes lo arrancaron de su Ã³rbita natal hace miles de millones de aÃ±os.',
      'Independientemente de la estrella especÃ­fica en la que naciÃ³, la mera existencia de 2I/Borisov es una confirmaciÃ³n espectacular de una vieja teorÃ­a. Durante dÃ©cadas, los astrÃ³nomos sospechaban que el espacio entre las estrellas no estaba vacÃ­o, sino lleno de cuatrillones de asteroides y cometas expulsados por los sistemas planetarios de toda la galaxia. Estos objetos flotan solitarios en la oscuridad durante toda su existencia. Nosotros solo vemos a aquellos poquÃ­simos que tienen la suerte (o la mala suerte) cÃ³smica de apuntar directamente hacia nuestro sistema solar interior para ser iluminados brevemente por el calor del Sol.'
    ],
    expandables: [
      { label: 'La MisiÃ³n Gaia', icon: 'zap', text: 'El satÃ©lite Gaia de la ESA es esencialmente la mejor cÃ¡mara de mapeo 3D de la historia de la humanidad. Mide con extrema precisiÃ³n la posiciÃ³n, la distancia y el movimiento propio de mÃ¡s de mil millones de estrellas de nuestra galaxia. Sin el mapa en movimiento de Gaia, habrÃ­a sido absolutamente imposible intentar rastrear de dÃ³nde vino el cometa Borisov, ya que no sabrÃ­amos dÃ³nde estaban las otras estrellas en el pasado.' },
      { label: 'El Tirachinas Gravitacional', icon: 'clock', text: 'La expulsiÃ³n de cometas es un subproducto normal de la formaciÃ³n planetaria. En nuestro propio sistema solar, los planetas gigantes como JÃºpiter y Neptuno dispersaron gravitacionalmente billones de rocas y cometas helados, arrojÃ¡ndolos al espacio profundo para siempre, o formando la lejana Nube de Oort. Cada estrella con planetas probablemente esparce su propia "basura" por la galaxia, contaminando el vacÃ­o con fÃ³siles helados.' }
    ],
    fact: 'El espacio estÃ¡ tan inmensamente vacÃ­o que las probabilidades de que un cometa interestelar choque con la Tierra son prÃ¡cticamente cero. Sin embargo, los astrÃ³nomos calculan que, en cualquier momento dado, hay miles de estos pequeÃ±os objetos interestelares viajando silenciosamente e invisibles a travÃ©s de los confines exteriores de nuestro sistema solar, mÃ¡s allÃ¡ de la Ã³rbita de Neptuno.'
  },
  {
    id: 'comparacion-oumuamua',
    title: 'Borisov vs Oumuamua',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m3/btn_comparacion-oumuamua.jpg',
    image: '/assets/interestelar/infographic_m3/hero_comparacion-oumuamua.jpg',
    content: [
      'Al comparar a 2I/Borisov con 1I/Oumuamua, los astrÃ³nomos descubrieron una historia de contrastes absolutos que resalta la increÃ­ble diversidad de nuestro universo. Oumuamua fue el primer visitante, y rompiÃ³ todos los esquemas mentales. TenÃ­a forma de cigarro o disco aplanado, estaba completamente inactivo, no tenÃ­a polvo, y parecÃ­a reflejar un tono rojizo denso. ParecÃ­a un pedazo de metralla metÃ¡lica o rocosa del nÃºcleo de un planeta destruido. Su movimiento anÃ³malo (acelerando al alejarse del Sol sin liberar gas visible) hizo que las teorÃ­as mÃ¡s locas circularan por los foros de ciencia.',
      'Por el contrario, 2I/Borisov era tranquilizadoramente normal. Visualmente, con su coma brillante, su nÃºcleo helado sublimÃ¡ndose y su larga y clÃ¡sica cola de polvo alejÃ¡ndose del Sol, se habrÃ­a mezclado perfectamente con una multitud de cometas nativos de nuestro sistema solar. Esta "normalidad" fue crucial, porque demostrÃ³ que los procesos fÃ­sicos y quÃ­micos que formaron la Nube de Oort alrededor de nuestro Sol no son un milagro Ãºnico. Son procesos estÃ¡ndar de la fÃ­sica cÃ³smica que ocurren de manera idÃ©ntica en los gÃ©lidos viveros de otros sistemas planetarios de la VÃ­a LÃ¡ctea.',
      'Sin embargo, ambos compartÃ­an una caracterÃ­stica crucial: la velocidad. Oumuamua viajaba a 26 kilÃ³metros por segundo antes de sentir la gravedad del Sol, y Borisov viajaba aÃºn mÃ¡s rÃ¡pido, a 32 kilÃ³metros por segundo. Estas velocidades hiperbÃ³licas masivas fueron la huella dactilar innegable de su origen extrasolar. Ambos penetraron nuestro escudo planetario como balas de francotirador disparadas desde la oscuridad, doblaron sus trayectorias dramÃ¡ticamente al rodear nuestra estrella debido a la gravedad, y luego salieron disparados de regreso hacia el abismo interestelar en direcciones completamente diferentes.',
      'El anÃ¡lisis quÃ­mico nos muestra el gran contraste de sus orÃ­genes. Oumuamua estaba tan seco como un hueso blanqueado al sol, quizÃ¡s cocinado y despojado de sus volÃ¡tiles durante la catastrÃ³fica explosiÃ³n de su sistema solar original, o tal vez era un fragmento rocoso originado en las ardientes regiones interiores de su estrella, parecido a nuestros asteroides cercanos al sol. Borisov, empapado en hielos tÃ³xicos de monÃ³xido de carbono ultrafrÃ­o y cianuro, naciÃ³ claramente en la nevera cÃ³smica profunda de las afueras frÃ­gidas de su sistema, un fÃ³sil quÃ­mico prÃ­stino y congelado.',
      'El legado de estos dos primeros descubrimientos es el nacimiento de un nuevo campo cientÃ­fico. Antes de 2017, los objetos interestelares eran solo teorÃ­a matemÃ¡tica. Hoy, son una realidad observable. Los astrÃ³nomos estÃ¡n construyendo gigantescos telescopios de nueva generaciÃ³n, como el Observatorio Vera C. Rubin en Chile, equipado con la cÃ¡mara digital mÃ¡s grande del mundo. EscanearÃ¡ todo el cielo cada pocas noches con el objetivo especÃ­fico de capturar no solo a uno o dos, sino quizÃ¡s a docenas de estos fantasmas errantes cada aÃ±o, abriendo una ventana sin precedentes a las estrellas distantes.'
    ],
    expandables: [
      { label: 'El Misterio de la Forma', icon: 'zap', text: 'Oumuamua mostraba una fluctuaciÃ³n de brillo extrema a medida que giraba, lo que los astrÃ³nomos interpretaron como un objeto muy alargado (forma de cigarro) o muy aplanado (forma de panqueque), cayendo dando tumbos caÃ³ticamente. Borisov no mostrÃ³ tales fluctuaciones dramÃ¡ticas, lo que indica que su nÃºcleo era mÃ¡s redondo, grumoso y simÃ©trico, muy parecido a las bolas de nieve de los cometas regulares como el cometa Halley o Churyumov-Gerasimenko.' },
      { label: 'El Telescopio Vera Rubin', icon: 'atom', text: 'Anteriormente conocido como LSST (Large Synoptic Survey Telescope), el Observatorio Vera C. Rubin revolucionarÃ¡ nuestra capacidad de encontrar objetos interestelares. Tiene un espejo enorme y una cÃ¡mara de 3200 megapÃ­xeles. Al fotografiar rÃ¡pidamente todo el cielo visible repetidamente, su software detectarÃ¡ instantÃ¡neamente objetos que se mueven rÃ¡pido en Ã³rbitas extraÃ±as, alertando a los astrÃ³nomos semanas o meses antes de que pasen cerca del Sol.' }
    ],
    fact: 'A pesar de sus diferencias, tanto Oumuamua como Borisov han cruzado ya la Ã³rbita de JÃºpiter en su viaje de salida y se estÃ¡n adentrando en el frÃ­o del espacio profundo. Viajan tan rÃ¡pido que ninguna de nuestras naves espaciales actuales podrÃ­a atraparlos. Se irÃ¡n para siempre, llevando consigo los secretos finales de sus estrellas maternas en su solitario viaje por la VÃ­a LÃ¡ctea.'
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
        <span>ExploraciÃ³n del Cometa</span>
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
