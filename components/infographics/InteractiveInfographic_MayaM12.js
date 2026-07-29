'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya themed) ────────────────────────────

function DecoStela({ size = 70, color = '#D7CCC8', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" style={{ opacity: 0.25, ...style }}>
      <rect x="10" y="5" width="20" height="50" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M15 10 L25 10 M15 15 L25 15 M15 20 L20 20 M15 25 L25 25 M15 30 L22 30 M15 35 L25 35 M15 40 L25 40 M15 45 L19 45 M15 50 L25 50" stroke={color} strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <circle cx="20" cy="15" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoBallCourt({ size = 70, color = '#558B2F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="5" y="15" width="15" height="30" fill="none" stroke={color} strokeWidth="2" />
      <rect x="40" y="15" width="15" height="30" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      <line x1="20" y1="30" x2="40" y2="30" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <path d="M 20 15 L 40 15 M 20 45 L 40 45" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoHieroglyphStair({ size = 70, color = '#F9A825', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 50 L15 50 L15 40 L25 40 L25 30 L35 30 L35 20 L45 20 L45 10 L55 10" fill="none" stroke={color} strokeWidth="2" />
      {/* Tiny glyph blocks */}
      {[10, 20, 30, 40].map((x, i) => (
        <rect key={i} x={x} y={45 - i * 10} width="4" height="4" fill={color} opacity="0.7" />
      ))}
      {[16, 26, 36, 46].map((x, i) => (
        <circle key={i} cx={x} cy={47 - i * 10} r="1.5" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}

function DecoAltarQ({ size = 70, color = '#D84315', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="10" y="15" width="40" height="30" rx="4" fill="none" stroke={color} strokeWidth="2" />
      {/* 4 sides representation */}
      <rect x="15" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <rect x="26" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <rect x="37" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Rulers tiny heads */}
      <circle cx="19" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="41" cy="25" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoMacaw({ size = 70, color = '#0277BD', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M40 20 Q50 15 55 25 Q45 28 40 25 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M40 20 Q35 10 25 15 C15 20 10 35 20 45 Q30 55 45 40 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="22" r="2.5" fill={color} opacity="0.8" />
      <path d="M25 25 Q15 30 20 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M55 25 Q58 35 50 45" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3,2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'copan-ciudad': [DecoStela, DecoHieroglyphStair, DecoMacaw],
  'estelas-astronomicas': [DecoStela, DecoAltarQ, DecoBallCourt],
  'congreso-astronomico': [DecoAltarQ, DecoStela, DecoHieroglyphStair],
  'altar-q': [DecoAltarQ, DecoHieroglyphStair, DecoMacaw],
  'escalinata-jeroglificos': [DecoHieroglyphStair, DecoStela, DecoBallCourt],
  'cancha-pelota': [DecoBallCourt, DecoMacaw, DecoAltarQ],
  'observatorio-copan': [DecoStela, DecoMacaw, DecoBallCourt],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Fash, W.L. (2001). Scribes, Warriors and Kings: The City of Copán and the Ancient Maya, Thames & Hudson',
  'Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Stuart, D. (2005). "Ideology and Classic Maya Kingship", A Catalyst for Ideas, SAR Press',
  'Baudez, C.F. (1994). Maya Sculpture of Copán, University of Oklahoma Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'copan-ciudad',
    title: 'La Ciudad: Copán',
    color: '#D7CCC8',
    btnImage: '/assets/maya/infographic_m12/btn_copan-ciudad.jpg',
    image: '/assets/maya/infographic_m12/hero_copan-ciudad.jpg',
    content: [
      'Imagina una ciudad inmensa escondida en medio de una espesa selva tropical. Así es Copán, ubicada en el actual país de Honduras, en el extremo sureste del territorio que ocupaban los antiguos mayas. Esta ciudad se alza en el fértil valle del Río Copán y es tan espectacular y llena de arte detallado que los expertos la llaman la "Atenas del Mundo Maya". A diferencia de otras ciudades que destacan por pirámides altísimas, Copán es famosa mundialmente por la belleza insuperable de sus esculturas de piedra, talladas con un nivel de detalle que parece imposible sin herramientas modernas. Cada rincón cuenta una historia.',
      'El sitio fue declarado Patrimonio de la Humanidad por la UNESCO porque representa uno de los logros artísticos y científicos más grandes de la humanidad antigua. Piensa en Copán como el equivalente maya a una gigantesca universidad y galería de arte al mismo tiempo. Aquí, los reyes no solo eran guerreros, sino también grandes intelectuales, astrónomos y patrocinadores de las artes. La ciudad estaba llena de plazas abiertas, templos pintados de colores brillantes (especialmente el rojo intenso) y enormes monumentos que brillaban bajo el sol, funcionando como libros de piedra que todos podían leer si entendían los símbolos sagrados.',
      'La ubicación de Copán no fue un accidente. El valle ofrecía tierras muy ricas para el cultivo del maíz, frijoles y calabazas, además de un río constante que aseguraba agua todo el año. Además, estaban cerca de importantes rutas comerciales de obsidiana y jade, los materiales más valiosos de la época. Esto hizo que la ciudad se volviera increíblemente rica y poderosa, permitiendo que sus gobernantes invirtieran muchísimos recursos en contratar a los mejores artistas, arquitectos y astrónomos de toda Mesoamérica. Era una verdadera metrópolis vibrante.',
      'Para entender la grandeza de Copán, hay que usar una analogía simple: si la ciudad maya de Tikal era como la Nueva York del mundo antiguo por sus rascacielos gigantes (las pirámides), Copán era como París, la capital del arte, la moda, el refinamiento y el conocimiento intelectual. Sus escultores lograron darle volumen y vida a la piedra de una manera que ninguna otra ciudad maya logró igualar, creando retratos tridimensionales de sus reyes que hoy nos miran desde el pasado con una humanidad asombrosa.',
      'Pero lo que hace verdaderamente especial a Copán es su profunda conexión con las estrellas. Toda la ciudad fue diseñada como un gigantesco espejo del cielo. Sus plazas, templos y monumentos estaban alineados de manera precisa con los movimientos del sol, la luna, Venus y las constelaciones. Para los mayas de Copán, la astronomía no era solo una ciencia para observar el cielo por curiosidad; era la herramienta principal para gobernar, para decidir cuándo plantar las cosechas, cuándo hacer la guerra y cómo mantener el equilibrio del universo entero.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Copán fue redescubierta de manera oficial para el mundo occidental en 1839 por el explorador estadounidense John Lloyd Stephens y el artista británico Frederick Catherwood. Stephens quedó tan impresionado con las ruinas que compró toda la ciudad por tan solo cincuenta dólares a un granjero local que usaba las plazas antiguas para cultivar tabaco. ¡Una ganga histórica increíble!' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'Los escultores de Copán trabajaban una piedra local llamada toba volcánica. Cuando esta piedra se extrae de la cantera, es relativamente suave y fácil de tallar, como si fuera jabón duro. Pero una vez que se expone al aire y al sol durante un tiempo, se endurece y se vuelve casi tan dura como el cemento, lo que permitió que sus obras maestras sobrevivieran mil años en la selva.' },
    ],
    fact: 'A pesar de no tener herramientas de metal (los mayas usaban cinceles de piedra más dura como el jade o la obsidiana), los artistas de Copán lograron crear esculturas en "alto relieve", lo que significa que las figuras resaltan casi por completo de la piedra base, creando efectos de luz y sombra dramáticos que cambian a lo largo del día según la posición del sol.',
  },
  {
    id: 'estelas-astronomicas',
    title: 'Las Estelas Solares',
    color: '#F9A825',
    btnImage: '/assets/maya/infographic_m12/btn_estelas-astronomicas.jpg',
    image: '/assets/maya/infographic_m12/hero_estelas-astronomicas.jpg',
    content: [
      'Las estelas son, sin duda, la firma artística más famosa de Copán. Imagina gigantescos bloques de piedra, algunos de más de cuatro metros de altura, clavados verticalmente en el suelo de las grandes plazas. Estos monumentos no son solo rocas; son asombrosos retratos tridimensionales de los reyes de Copán, cubiertos de pies a cabeza con símbolos mágicos, dioses, jeroglíficos y, sobre todo, registros astronómicos increíblemente precisos. En Copán hay más de 14 de estas estelas principales, y juntas forman un bosque de piedra que cuenta la historia del cosmos y de la dinastía gobernante.',
      'Piensa en una estela como si fuera la portada de una revista moderna gigante, pero tallada en roca, que anuncia el poder del rey y su conexión directa con las fuerzas del universo. El rey más famoso por construir estas estelas fue Waxaklajuun Ubaah Kawiil (también conocido como 18 Conejo). Él ordenó colocar estas estelas en la Gran Plaza en posiciones muy específicas. No las pusieron al azar, sino siguiendo patrones geométricos y astronómicos que formaban un mapa del tiempo y del espacio, alineándose con el sol durante los solsticios y equinoccios.',
      'El nivel de detalle es tan extraordinario que podemos ver las arrugas en el rostro de los gobernantes, las plumas individuales en sus tocados gigantes y los intrincados nudos de sus cinturones. Pero el verdadero secreto de las estelas está en sus costados y en la parte de atrás. Allí, los mayas tallaron largos textos jeroglíficos que funcionan como enormes calendarios y calculadoras astronómicas. Estos textos registran las fechas exactas en las que ocurrieron eclipses, los movimientos de Venus y los ciclos de la luna con un margen de error de fracciones de día.',
      'Para los mayas, el rey no era solo un líder político; era el ser humano responsable de mantener el orden del universo. Al representarse a sí mismos en las estelas, sostenían barras ceremoniales que simbolizaban el cielo y se vestían con la ropa de los dioses solares. Las estelas eran como antenas gigantes que conectaban la energía de las estrellas y los planetas con la tierra y el pueblo. Cuando la luz del sol iluminaba una estela en una fecha sagrada, era la prueba visual de que el rey estaba haciendo bien su trabajo y de que el universo seguía funcionando.',
      'Científicamente, estas estelas son monumentos a las matemáticas avanzadas. Los mayas usaban un sistema numérico vigesimal (basado en el número 20, porque usaban los dedos de manos y pies para contar) y conocían el concepto del cero mucho antes que los europeos. Usando solo puntos y barras tallados en la piedra de estas estelas, podían registrar fechas que retrocedían millones de años en el pasado o se proyectaban millones de años hacia el futuro, demostrando una comprensión del "tiempo profundo" que asombra a los astrónomos de hoy en día.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Originalmente, estas estelas no eran del color gris o beige de la piedra que vemos hoy. Estaban pintadas con colores increíblemente vibrantes. El color principal era el rojo intenso (hecho de un mineral llamado cinabrio), que representaba la vida, la sangre y el sol naciente. También usaban azul maya, verde, amarillo y negro. ¡La plaza debía verse espectacular!' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'Debajo de muchas estelas, los arqueólogos han encontrado "escondites" o cajas de piedra selladas (llamadas ofrendas dedicatorias) que contienen joyas de jade, conchas marinas, espinas de mantarraya y vasijas de cerámica. Estas ofrendas eran como la batería espiritual de la estela, plantadas en la tierra para darle vida y poder al monumento cuando era inaugurado.' },
    ],
    fact: 'La Estela C de Copán es fascinante porque tiene un retrato del rey Waxaklajuun Ubaah Kawiil en ambos lados, algo muy raro. Un lado muestra al rey como un hombre joven mirando hacia el este (por donde sale el sol), y el otro lado lo muestra como un hombre anciano con barba mirando hacia el oeste (por donde se pone el sol). Es una metáfora perfecta del ciclo de vida y del movimiento diario del sol.',
  },
  {
    id: 'congreso-astronomico',
    title: 'El Gran Congreso del 763',
    color: '#6A1B9A',
    btnImage: '/assets/maya/infographic_m12/btn_congreso-astronomico.jpg',
    image: '/assets/maya/infographic_m12/hero_congreso-astronomico.jpg',
    content: [
      'Una de las historias más increíbles y científicas de Copán ocurrió en el año 763 d.C. En ese año, Copán fue sede de un evento extraordinario que hoy llamaríamos una "Convención Internacional de Ciencias". Expertos astrónomos, sabios, matemáticos y sacerdotes de muchas otras ciudades mayas importantes viajaron a Copán para reunirse, debatir y compartir sus descubrimientos sobre el cielo. Fue como si los mejores científicos del mundo moderno se reunieran para resolver un gran misterio del universo.',
      'El rey que organizó este monumental encuentro fue el famoso gobernante K\'ak\' Yipyaj Chan Kawiil, y el motivo de la reunión era sumamente importante: necesitaban ajustar sus calendarios. Al igual que nuestro año bisiesto moderno añade un día cada cuatro años para mantener nuestro calendario alineado con las estaciones, los mayas se dieron cuenta de que su complejo sistema de calendarios se estaba desincronizando ligeramente con los verdaderos movimientos astronómicos del sol y de la luna.',
      "Imagina la escena: decenas de sabios vestidos con plumas de quetzal y adornos de jade reunidos en las plazas de Copán, desplegando libros largos hechos de corteza de higuera (códices), llenos de cálculos matemáticos y tablas de eclipses. Discutieron durante días sobre cómo calibrar la duración exacta de la lunación (el tiempo de luna nueva a luna nueva) y cómo hacer que el calendario ceremonial (Tzolkin de 260 días) encajara a la perfección con el calendario solar (Haab\' de 365 días).",
      'El resultado de este gran congreso astronómico fue un triunfo científico. Lograron calcular la duración de las fases de la luna y los ciclos del planeta Venus con una precisión asombrosa. Por ejemplo, calcularon que 149 ciclos lunares equivalían a 4,400 días. Esto significa que calcularon la duración promedio de un mes lunar en 29.5302 días. La ciencia astronómica moderna, usando telescopios espaciales y computadoras cuánticas, calcula que es de 29.53059 días. ¡La diferencia es de unos pocos segundos!',
      'Para conmemorar este gran éxito intelectual, los gobernantes de Copán mandaron a tallar monumentos específicos (como algunas partes del Altar Q y la Escalinata de los Jeroglíficos) donde se registraron estas fórmulas de corrección astronómica. Este congreso demuestra que los mayas no hacían monumentos solo por razones religiosas o para alabar a sus reyes, sino que usaban la piedra para registrar verdaderos congresos científicos internacionales, compartiendo conocimiento puro a lo largo de las generaciones.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Venus era el planeta más importante para los antiguos mayas, incluso más que el sol en algunos aspectos. Creían que Venus era el hermano gemelo del sol, un dios de la guerra. Usaban los ciclos precisos de Venus (cuándo aparecía como estrella de la mañana o estrella de la tarde) para decidir exactamente cuándo debían ir a la guerra o coronar a un nuevo gobernante.' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'Los astrónomos mayas no tenían telescopios ni lentes de cristal. Toda su astronomía se hacía a simple vista. Para lograr su extrema precisión, construían largos y estrechos tubos de observación usando piedras cruzadas o madera. Al mirar a través de un agujero pequeño durante muchas décadas, podían rastrear movimientos estelares minúsculos y registrar los datos generación tras generación.' },
    ],
    fact: 'El conocimiento astronómico compartido en este congreso se esparció por el mundo maya. Ciudades a cientos de kilómetros de distancia, como Palenque o Quiriguá, empezaron a usar exactamente las mismas fórmulas matemáticas de corrección lunar que se acordaron en Copán en el año 763, lo que demuestra que existía una red de comunicación científica pan-maya sumamente eficiente.',
  },
  {
    id: 'altar-q',
    title: 'El Misterioso Altar Q',
    color: '#D84315',
    btnImage: '/assets/maya/infographic_m12/btn_altar-q.jpg',
    image: '/assets/maya/infographic_m12/hero_altar-q.jpg',
    content: [
      'De todos los monumentos de Copán, ninguno es tan famoso ni tan enigmático como el Altar Q. Es un enorme bloque de piedra cuadrado que funciona como un libro de historia congelado en el tiempo. Imagina una fotografía familiar gigante, pero en lugar de tus primos y tíos, muestra a los 16 reyes de la dinastía completa de Copán, todos sentados en cojines que tienen forma de jeroglíficos. Fue mandado a hacer por el rey Yax Pasaj Chan Yopaat (el rey número 16) para demostrar que él tenía el derecho divino de gobernar.',
      "Alrededor de los cuatro lados de este altar, cuatro reyes en cada lado, vemos a cada gobernante pasando el bastón de mando a su sucesor. Pero la imagen principal está en la parte delantera, donde el fundador de la dinastía, un rey llamado Yax Kuk Mo\' (cuyo nombre significa Primer Quetzal Guacamaya), está entregándole directamente la varita de poder al rey 16, a pesar de que vivieron separados por 350 años de historia. Es un diagrama brillante que usa el arte para legitimar el poder político.",
      "Pero el Altar Q no es solo historia política; es también astronomía y matemáticas puras. En la parte superior del altar hay un texto jeroglífico inmenso que cuenta la historia secreta de cómo se fundó Copán. Este texto narra que Yax Kuk Mo\' realizó un viaje legendario a la ciudad central de Teotihuacán en el año 426 d.C. para recibir su cetro real y aprender los grandes secretos de la astronomía, y que tardó exactamente 153 días en llegar a Copán para fundar la ciudad.",
      'El altar mismo fue posicionado usando principios astronómicos. Se colocó al pie de la Estructura 16, un gran templo piramidal. Durante fechas específicas del año, la sombra del templo y la luz del sol interactúan de manera espectacular sobre el altar, iluminando a reyes específicos de la dinastía en aniversarios cósmicos importantes. Es como un reloj solar gigante donde la hora no marca minutos, sino siglos de historia real.',
      'Debajo del Altar Q, los arqueólogos hicieron un descubrimiento escalofriante y asombroso: una cripta secreta que contenía los restos de 15 jaguares sacrificados. El número 15 no es casualidad; representaba a los 15 reyes anteriores de Copán. Era un ritual de sangre, energía y astronomía para alimentar el nacimiento de este monumento y conectar el poder de los felinos más fuertes de la selva con la precisión de las estrellas del firmamento.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Yax Kuk Mo\', el fundador, era real. Los científicos encontraron su tumba (llamada Tumba Hunal) profunda bajo las pirámides de Copán en los años 90. Sus huesos tenían heridas graves en el brazo derecho y en el pecho, prueba de que era un guerrero feroz. Además, al analizar los isótopos de sus dientes, confirmaron que él no nació en Copán, sino que llegó de otra región, ¡tal como lo cuenta el Altar Q!' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'Cada rey en el Altar Q está sentado sobre un glifo (un símbolo de escritura). Ese glifo no es un cojín al azar; ¡es su propio nombre escrito en jeroglífico! Es una forma extremadamente inteligente e ingeniosa de ponerle etiqueta a cada personaje en la piedra sin ocupar espacio extra en el diseño. Diseño gráfico antiguo al más alto nivel.' },
    ],
    fact: 'El diseño del Altar Q, como un cuadrado perfecto con cuatro lados, representa la visión maya del cosmos. Ellos creían que el universo era plano y cuadrado, con cuatro esquinas asociadas a cuatro direcciones y cuatro colores (Rojo/Este, Negro/Oeste, Blanco/Norte, Amarillo/Sur), sostenido por el Árbol del Mundo en el centro. El altar es, literalmente, un modelo del universo.',
  },
  {
    id: 'escalinata-jeroglificos',
    title: 'La Escalinata de los Jeroglíficos',
    color: '#0277BD',
    btnImage: '/assets/maya/infographic_m12/btn_escalinata-jeroglificos.jpg',
    image: '/assets/maya/infographic_m12/hero_escalinata-jeroglificos.jpg',
    content: [
      'Prepárate para conocer el libro más grande del mundo antiguo americano. La Escalinata de los Jeroglíficos en Copán no es solo una escalera para subir a un templo; es una enorme biblioteca de piedra. Está formada por 63 escalones gigantescos, y en la cara de cada uno de esos escalones hay miles de símbolos tallados. En total, hay más de 2,200 jeroglíficos individuales. Es el texto escrito más largo que nos dejaron los antiguos mayas en toda su historia.',
      'Construir esto fue una obra titánica. Fue iniciada por el gran constructor Waxaklajuun Ubaah Kawiil, pero fue terminada e inaugurada por el rey número 15, llamado K\'ak\' Yipyaj Chan Kawiil en el año 755 d.C. ¿Qué dice este libro gigante? Cuenta la historia heroica, los nacimientos, las guerras, los matrimonios y las ceremonias sagradas de todos los grandes reyes de Copán, asegurándose de que su legado quedara tallado permanentemente en el corazón de la ciudad.',
      'Pero leer la escalinata es como intentar armar un rompecabezas de 2,200 piezas donde no tienes la caja con la foto, ¡y además hubo un terremoto! Durante mil años de abandono en la selva, un enorme árbol creció en medio de la pirámide, y sus raíces, junto con los sismos, provocaron un derrumbe que tiró los bloques al suelo. En el siglo XIX, los arqueólogos intentaron reconstruirla y pusieron los bloques en orden casi aleatorio porque en ese momento nadie sabía leer jeroglíficos mayas.',
      'Hoy, los epigrafistas (los científicos que descifran escrituras antiguas) llaman a la escalinata "el crucigrama más difícil del mundo". Han usado computadoras y escáneres 3D para "desarmar" digitalmente la escalera y volver a ordenar las piezas basándose en la gramática maya. Han descubierto que entre las historias de guerras y reyes, la escalinata está repleta de fechas astronómicas. Registra con enorme precisión las alineaciones de Venus y los ciclos lunares en los días exactos de las batallas clave.',
      'En el centro de la escalinata, cada diez o doce escalones, hay estatuas de guerreros a tamaño real vestidos con armaduras impresionantes y portando escudos de guerra. Se cree que estos guerreros representan a los espíritus de los reyes pasados que vigilan su propia historia. Y en la base de la escalera, hay un gran altar tallado con el símbolo de la deidad maya de las cuevas y el inframundo, recordando que la historia nace de las raíces más profundas de la tierra.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La piedra de Copán (la toba volcánica) es frágil frente a la lluvia y el viento. Hoy en día, si visitas Copán, verás la Escalinata de los Jeroglíficos protegida bajo una inmensa carpa de lona o lona gigantesca para evitar que las lluvias ácidas modernas y el sol terminen de borrar las letras de piedra. Es la joya más cuidada de Centroamérica.' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'La escritura maya es un sistema logosilábico. Esto significa que un solo dibujo (jeroglífico) puede representar una palabra completa (como "balam", que significa jaguar) o puede representar una sílaba de sonido (como "ba", "la" y "ma"). Podían escribir la misma palabra de cinco formas diferentes combinando sonidos e imágenes, ¡lo que hace que descifrarlos sea un arte muy complejo!' },
    ],
    fact: 'El texto de la escalinata revela un evento oscuro que intentó ser disfrazado. En el año 738, el gobernante más grande de Copán (18 Conejo) fue capturado y decapitado por el rey de una ciudad rival mucho más pequeña (Quiriguá). La escalinata de Copán menciona este evento de pasada, pero lo "maquilla" y le da más espacio a las victorias posteriores, como un gobierno que usa propaganda para ocultar una derrota terrible.',
  },
  {
    id: 'cancha-pelota',
    title: 'La Cancha de Pelota Cósmica',
    color: '#558B2F',
    btnImage: '/assets/maya/infographic_m12/btn_cancha-pelota.jpg',
    image: '/assets/maya/infographic_m12/hero_cancha-pelota.jpg',
    content: [
      'Imagínate un estadio deportivo, pero donde el juego es a vida o muerte y la cancha es un modelo del universo. Copán posee una de las canchas para el Juego de Pelota (llamado "Pok-ta-Pok") más bellas y mejor conservadas de toda Mesoamérica. Está ubicada en el corazón de la zona principal y fue remodelada en tres ocasiones diferentes por distintos reyes, cada vez haciéndola más grande y espectacular, hasta alcanzar su forma final bajo el reinado de 18 Conejo.',
      'El campo tiene la forma de una letra "I" mayúscula gigante, con dos pasillos anchos en los extremos y un corredor central estrecho bordeado por muros inclinados. Los jugadores, usando pesadas protecciones de cuero y algodón, debían golpear una pelota de hule sólido (del tamaño de un melón y pesando hasta 4 kilos) usando solo sus caderas, codos y rodillas. ¡No se podían usar las manos ni los pies! Un golpe de esa pelota podía romper costillas fácilmente.',
      'Pero este juego no era un simple deporte; era una recreación ritual profunda de un evento astronómico y mítico. Según el libro sagrado maya, el Popol Vuh, dos héroes gemelos bajaron al inframundo (Xibalbá) para jugar a la pelota contra los dioses de la muerte y los derrotaron, resucitando después como el Sol y la Luna. Jugar a la pelota en Copán era recrear esa batalla épica. El movimiento constante de la pelota rebotando representaba al sol moviéndose a través del cielo.',
      'Los marcadores de esta cancha son famosísimos. En lugar de los típicos aros de piedra verticales que vemos en otras ciudades mayas, los marcadores de Copán son tres grandes cabezas de guacamayas (el ave solar por excelencia) talladas en piedra y fijadas en los muros inclinados a los lados de la cancha. Cuando la pelota golpeaba a los guacamayos, representaba el contacto entre los humanos, el cielo y las fuerzas solares.',
      'La alineación astronómica del Juego de Pelota de Copán es impecable. El eje principal de la cancha está diseñado de tal manera que, durante los días del equinoccio (marzo y septiembre, cuando el día y la noche duran exactamente lo mismo), la luz del sol al amanecer y al atardecer cruza el campo de manera dramática y divide la luz y las sombras perfectamente, reflejando el equilibrio cósmico de las fuerzas del universo jugando el partido eterno.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El hule era un milagro tecnológico mesoamericano que no existía en Europa. Los mayas cosechaban la savia del árbol de caucho y la mezclaban con el jugo de una enredadera llamada "Ipomoea alba". Esta mezcla causaba una reacción química (una vulcanización antigua) que hacía que la pelota rebotara con muchísima fuerza. Los españoles se asustaron la primera vez que vieron una pelota rebotar así.' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'Debajo del piso del callejón central de la cancha de pelota, se encontró otro "escondite" mágico. Los arqueólogos hallaron un recipiente redondo de cerámica que contenía los restos de un sacrificio de fundación. Era la ofrenda que se puso antes de poner el piso nuevo, para que la cancha tuviera "vida" y fuerza espiritual. La energía de la tierra alimentando el juego del cielo.' },
    ],
    fact: 'Muchos guías turísticos cuentan el mito de que al equipo perdedor del juego de pelota se le cortaba la cabeza al final del partido. Los expertos creen que esto no era algo de todos los días. Probablemente, en Copán, la mayoría de los juegos eran deportivos o para resolver disputas políticas, y los sacrificios humanos reales en la cancha de pelota se reservaban solo para capturar reyes enemigos muy importantes después de una gran guerra.',
  },
  {
    id: 'observatorio-copan',
    title: 'El Observatorio de las Colinas',
    color: '#004D40',
    btnImage: '/assets/maya/infographic_m12/btn_observatorio-copan.jpg',
    image: '/assets/maya/infographic_m12/hero_observatorio-copan.jpg',
    content: [
      'A diferencia de las famosas torres circulares que construyeron otros mayas (como El Caracol en Chichén Itzá), los astrónomos de Copán fueron más creativos. Ellos convirtieron todo el valle en un gigantesco observatorio astronómico. Lo lograron utilizando las montañas que rodean la ciudad. En la cima de dos cerros ubicados en lados opuestos del valle, instalaron dos estelas clave: la Estela 10 en la colina occidental y la Estela 12 en la colina oriental, separadas por casi siete kilómetros.',
      'Si un astrónomo maya se paraba junto a la Estela 12 y miraba exactamente en línea recta hacia la Estela 10 en la colina del otro lado del valle, creaba una línea visual perfecta. ¿Y qué ocurría? En un día muy específico del año, exactamente el 12 de abril, el sol se oculta exactamente justo detrás de la Estela 10. ¡Crearon una mira telescópica natural de 7 kilómetros de ancho usando el paisaje entero!',
      'Esta fecha del 12 de abril no era aleatoria. En el clima de Copán, abril marca el final de la época seca y el comienzo inminente de la temporada de lluvias. Esta alineación astronómica funcionaba como un gigantesco reloj agrícola infalible. Cuando el rey, apoyado por sus astrónomos, observaba el sol caer detrás del monumento, podía anunciar oficialmente al pueblo campesino: "¡Es hora de quemar los campos y sembrar el maíz, las lluvias están a punto de llegar!".',
      'Este es el ejemplo supremo de lo que los científicos llaman "Astronomía Práctica". Mientras que algunos cálculos de Venus o la Luna eran para motivos religiosos y políticos de los reyes, la alineación del sol sobre las colinas servía directamente para la supervivencia del pueblo. Si sembraban demasiado pronto, las semillas se secarían por falta de lluvia. Si sembraban demasiado tarde, el suelo estaría demasiado lodoso para las plantas. El sol, a través de las estelas, dictaba la vida misma de Copán.',
      'El conocimiento del cielo en Copán era tan poderoso que las estelas no solo se alineaban entre las montañas, sino que también marcaban la posición desde los templos de la plaza principal. Era un complejo sistema de triángulos visuales y geometría gigantesca. Los mayas demostraron que no necesitas lentes ópticos sofisticados para medir el universo; si tienes paciencia infinita, colinas altas, monumentos de piedra y grandes mentes matemáticas, puedes atrapar al sol en un calendario perfecto.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sol vuelve a pasar por esa misma línea visual exacta en su viaje de regreso el día 1 de septiembre, lo que daba otra fecha clave para el ciclo de la cosecha del maíz. Hoy en día, muchos agricultores modernos de la región de Copán siguen usando mediados de abril y principios de septiembre como los puntos principales para sus actividades de campo, repitiendo una tradición milenaria.' },
      { label: 'Tecnología Maya', icon: 'zap', text: 'Los mayas no conocían la brújula magnética ni usaban estrellas polares para alinearse, porque la estrella polar no estaba tan clara en esa época debido a la precesión de la Tierra. Para construir todo Copán y orientar estas estelas, usaban estacas, cuerdas largas y observaciones visuales de las sombras del amanecer y atardecer en el horizonte (usando puntos de referencia naturales).' },
    ],
    fact: 'El nivel de sofisticación del "Observatorio de Copán" es tan impresionante que el arqueoastrónomo Anthony Aveni (uno de los padres de la astronomía antigua) lo ha catalogado como uno de los marcadores solares agrícolas más precisos y monumentales del mundo antiguo, demostrando que en el siglo VIII d.C., los sabios de Copán estaban haciendo ciencia de vanguardia mundial.',
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
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      // Mayan firefly/jungle colors
      hue: Math.random() > 0.5 ? '249,168,37' : '85,139,47', 
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.1;
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

// ─── Header Banner ──────────────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0.5rem' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(249,168,37,0.3))' }}>
        {/* Decorative arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D7CCC8','#F9A825','#6A1B9A','#D84315','#0277BD','#558B2F','#004D40'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Maya Sun icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F9A825" strokeWidth="2" opacity="0.8" />
        <circle cx="300" cy="30" r="6" fill="#F9A825" opacity="0.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line key={angle} x1="300" y1="16" x2="300" y2="10" stroke="#F9A825" strokeWidth="2" opacity="0.8" strokeLinecap="round" transform={`rotate(${angle} 300 30)`} />
        ))}
        
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,168,37,0.2)" />
            <stop offset="50%" stopColor="rgba(249,168,37,0.9)" />
            <stop offset="100%" stopColor="rgba(249,168,37,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F9A825" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">COPÁN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(249,168,37,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">LAS ESTELAS SOLARES</text>
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(215,204,200,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {isActive && (
          <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }} />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotMayaM12"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }} />
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

const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem', borderRadius: '14px', border: `1px solid ${color}25`,
      overflow: 'hidden', background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ backgroundColor: `${color}12` }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.8rem 1rem',
          background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)' }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(12, 16, 12, 0.95)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`,
        borderRadius: '24px', position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${node.color}40`, borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}>
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
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{
            marginTop: '1.5rem', background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px', padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase' }}>Dato Científico</span>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(249,168,37,0.2)' }}>
      <Star size={14} style={{ color: '#F9A825', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #F9A825, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(249,168,37,0.4)' }} />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F9A825', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM12() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(12,16,12,0.9) 0%, rgba(15,20,15,0.85) 40%, rgba(12,16,12,0.92) 100%), url(/assets/maya/infographic_m12/bg_copan.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(249,168,37,0.15)', boxShadow: '0 0 60px rgba(12,16,12,0.8), inset 0 0 80px rgba(0,0,0,0.5)',
    }}>
      <TemporalField />
      <MayaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ textAlign: 'center', color: 'rgba(249,168,37,0.8)', fontSize: '0.85rem', marginBottom: '1rem', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ChevronRight size={14} /> Toca cada monumento para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2, marginBottom: '1rem', padding: '0 0.5rem' }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: 'rgba(249,168,37,0.08)', borderRadius: '16px', border: '1px solid rgba(249,168,37,0.25)', position: 'relative', zIndex: 2 }}>
            <p style={{ margin: 0, color: '#F9A825', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la grandeza astronómica de Copán!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              Ya estás listo para continuar con el siguiente módulo.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bibliografía ─── */}
      <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', borderRadius: '0 0 16px 16px', position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📚 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
