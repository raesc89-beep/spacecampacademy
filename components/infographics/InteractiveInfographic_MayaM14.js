'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya / Edzná themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoGnomon({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <line x1="30" y1="50" x2="30" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="30" cy="50" rx="15" ry="4" fill={color} opacity="0.3" />
      <path d="M 30 15 L 45 50 L 30 50 Z" fill={color} opacity="0.4" />
      <circle cx="30" cy="10" r="3" fill={color} opacity="0.6" />
      {/* Sun rays */}
      <line x1="30" y1="2" x2="30" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="4" x2="25" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="4" x2="35" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoZenithSun({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="10" fill={color} />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} 
            x1={30 + 12 * Math.cos(rad)} y1={30 + 12 * Math.sin(rad)} 
            x2={30 + 26 * Math.cos(rad)} y2={30 + 26 * Math.sin(rad)} 
            stroke={color} strokeWidth={i%2===0 ? "2" : "1"} strokeLinecap="round" 
          />
        );
      })}
    </svg>
  );
}

function DecoCanal({ size = 70, color = '#0288D1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 0 20 Q 15 10 30 20 T 60 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 0 30 Q 15 20 30 30 T 60 30" fill="none" stroke={color} strokeWidth="2.5" opacity="0.7" />
      <path d="M 0 40 Q 15 30 30 40 T 60 40" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <rect x="10" y="15" width="4" height="4" fill={color} opacity="0.5" />
      <rect x="40" y="25" width="6" height="4" fill={color} opacity="0.6" />
      <rect x="25" y="35" width="5" height="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoFiveLevels({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="5" y="45" width="50" height="6" fill={color} opacity="0.8" />
      <rect x="10" y="39" width="40" height="6" fill={color} opacity="0.7" />
      <rect x="15" y="33" width="30" height="6" fill={color} opacity="0.6" />
      <rect x="20" y="27" width="20" height="6" fill={color} opacity="0.5" />
      <rect x="25" y="21" width="10" height="6" fill={color} opacity="0.4" />
      <rect x="27" y="10" width="6" height="11" fill={color} opacity="0.3" />
      <circle cx="30" cy="14" r="1.5" fill="#fff" />
      <circle cx="30" cy="18" r="1.5" fill="#fff" />
      <path d="M 28 51 L 28 21 L 32 21 L 32 51 Z" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoShadow({ size = 70, color = '#212121', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <defs>
        <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="10,50 50,50 35,10 25,10" fill="url(#shadowGrad)" />
      <circle cx="30" cy="8" r="4" fill={color} opacity="0.4" />
      <line x1="20" y1="30" x2="10" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
      <line x1="40" y1="30" x2="50" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

const DECO_MAP = {
  'edzna-ciudad': [DecoFiveLevels, DecoCanal, DecoZenithSun],
  'paso-cenital': [DecoZenithSun, DecoShadow, DecoGnomon],
  'gnomon-vertical': [DecoGnomon, DecoShadow, DecoZenithSun],
  'edificio-cinco-pisos': [DecoFiveLevels, DecoZenithSun, DecoCanal],
  'sistema-hidraulico': [DecoCanal, DecoZenithSun, DecoShadow],
  'latitud-tropical': [DecoZenithSun, DecoGnomon, DecoFiveLevels],'medicion-tiempo': [DecoShadow, DecoZenithSun, DecoGnomon],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Å prajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica, INAH',
  'Galindo Trejo, J. (2009). Arqueoastronomía en la América Antigua, UNAM',
  'Malmström, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press',
  'Andrews, G.F. (1995). Pyramids and Palaces, Monsters and Masks: Architecture of the Puuc Region, Labyrinthos',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'edzna-ciudad',
    title: 'La Ciudad',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m14/btn_edzna-ciudad.jpg',
    image: '/assets/maya/infographic_m14/hero_edzna-ciudad.jpg',
    content: [
      'Imagina que estás construyendo una ciudad de bloques gigante en medio de una selva espesa. Así es Edzná, una antigua metrópoli construida por los mayas en lo que hoy es Campeche, México. Su nombre significa "La Casa de los Itzáes". Esta familia gobernó la región durante cientos de años. Esta ciudad estuvo llena de vida desde el 600 a.C. hasta el 1500 d.C.',
      'A diferencia de donde vives, en Edzná no había ríos naturales cercanos para obtener agua potable. Los mayas diseñaron un sofisticado sistema hidráulico. Crearon una enorme red de canales y embalses artificiales para capturar y distribuir la lluvia. Transformaron un terreno salvaje en un paraíso donde el agua fluía de forma controlada.',
      'Piensa en la metrópoli como si fuera un embudo inteligente. Los arquitectos mayas construyeron plazas y plataformas con una inclinación sutil. Cuando llovía, esa pendiente obligaba al agua a correr hacia canales subterráneos y grandes depósitos. Gracias a esta planificación, la ciudad sobrevivía durante los meses secos.',
      'Además de su manejo acuático, Edzná estaba decorada con plazas hermosas, estelas de piedra y pirámides imponentes. Era una ciudad que conectaba el suelo fértil con los misterios celestiales. La vida diaria combinaba mercados, ceremonias religiosas y un trabajo meticuloso de observación astronómica.',
      'El núcleo urbano era la acrópolis central, una inmensa plataforma elevada donde descansaban los edificios principales. Hoy, al observar las ruinas blancas, puedes sentir la grandeza de los arquitectos que construyeron maravillas. Cada piedra guarda un mensaje sobre cómo los mayas entendían su cosmos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Edzná alcanzó su máximo tamaño y esplendor alrededor del año 900 d.C. Alojando a más de 25,000 personas. Para alimentar a toda esta multitud, no solo bebían el agua capturada, sino que criaban peces dulces en los canales y usaban el lodo húmedo del fondo como fertilizante súper nutritivo para sus cultivos, logrando cosechas abundantes.' },
      { label: 'Ingenio Maya', icon: 'clock', text: 'La gigantesca red de canales funcionaba también como verdaderas autopistas acuáticas. Los ciudadanos utilizaban ligeras canoas de madera para transportar pesadas cargas de comida y piedras de construcción rápidamente a través de la urbe, ahorrando muchísima energía humana en comparación con cargar todo sobre la espalda bajo el fuerte sol tropical.' },
    ],
    fact: 'Durante sus 2,000 años de historia ininterrumpida, Edzná experimentó enormes cambios arquitectónicos, fusionando distintos estilos como el Petén, el Puuc y estilos tardíos. Esto nos indica que no era un pueblo aislado, sino un centro cosmopolita brillante, conectado comercialmente con lejanas capitales mayas. Sus edificios superpuestos relatan visualmente las cambiantes modas de una civilización dinámica y viva.',
  },
  {
    id: 'paso-cenital',
    title: 'El Paso Cenital',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m14/btn_paso-cenital.jpg',
    image: '/assets/maya/infographic_m14/hero_paso-cenital.jpg',
    content: [
      '¿Has notado cómo tu sombra cambia de tamaño durante el día? En la mañana es larga, al mediodía se encoge y en la tarde vuelve a estirarse. Imagina un momento celestial donde, justo al mediodía, tu sombra desaparece. Este evento se llama "paso cenital", y ocurre cuando el sol pasa directamente por encima de tu cabeza.',
      'Piensa en una linterna que alumbra una pelota desde un lado: la pelota siempre proyecta una sombra estirada. Pero si colocas la linterna exactamente arriba, la sombra se oculta debajo. Este espectáculo no sucede en todo el mundo, solo ocurre dentro de las regiones tropicales. Las ciudades mayas prosperaron en esta franja geográfica.',
      'Para los sacerdotes mayas, este paso cenital no era un simple truco visual. El sol alcanza el cenit exactamente dos veces al año en la región maya. Estos días sin sombra funcionaban como marcadores divinos, permitiéndoles calibrar sus calendarios con una perfección asombrosa. Era una sincronización automática de su tiempo.',
      'Conocer la fecha exacta del paso cenital resultaba vital para los habitantes. Estos días coincidían con la llegada de las lluvias anuales y el momento idóneo para plantar el maíz. Cuando el sol quemaba en el cenit, ordenaba a los agricultores comenzar las siembras que mantendrían vivas a sus familias.',
      'Detectar el día cenital preciso requería suma paciencia. Sin utilizar ningún telescopio moderno, poseían una agudeza visual fenomenal. Erigían postes verticales y construían pirámides que funcionaban como observatorios solares. Confirmaban matemáticamente cuándo el disco luminoso tocaba la cúspide del firmamento. Así se convirtieron en grandes astrónomos de la antigua América.'
    ],
    expandables: [
      { label: 'Reloj Cósmico', icon: 'clock', text: 'A diferencia de los conocidos equinoccios, que ocurren el mismo día en todo el planeta, la fecha precisa del paso cenital cambia según la latitud de la ciudad. Cuanto más hacia el norte viajes, más tarde ocurrirá el fenómeno. Esto causaba que cada ciudad maya festejara sus mágicos "días sin sombra" en fechas diferentes, generando calendarios locales únicos.' },
      { label: 'Magia Acuática', icon: 'atom', text: 'Durante el místico mediodía del paso cenital, si observas cuidadosamente el interior de un profundo cenote natural, el poderoso haz de luz solar ilumina el agua cristalina hasta el fondo rocoso, sin dejar ninguna esquina oscura. Los mayas celebraban cómo la energía luminosa penetraba directamente hacia el acuático inframundo subterráneo, conectando el cosmos entero.' },
    ],
    fact: 'El alucinante paso cenital solamente puede experimentarse visualmente estando entre el Trópico de Cáncer y el Trópico de Capricornio. Fuera de esta extensa franja planetaria, como en los países europeos o norteamericanos, el Sol jamás alcanza un punto perfecto de 90 grados perpendiculares sobre nuestras cabezas. Por ello, los perplejos conquistadores europeos quedaron atónitos al atestiguar sombras que desaparecían, algo físicamente imposible en sus lejanos continentes de origen.',
  },
  {
    id: 'gnomon-vertical',
    title: 'El Gnomón',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m14/btn_gnomon-vertical.jpg',
    image: '/assets/maya/infographic_m14/hero_gnomon-vertical.jpg',
    content: [
      'Muchas veces, las herramientas científicas más trascendentales son también rudimentarias. Imagina que tomas un palo recto y lo entierras en la tierra. Acabas de fabricar el instrumento astronómico inicial de la humanidad: el gnomón. Aunque la palabra significa "el que comprende" en griego, para los mayas esta vara era el decodificador del universo.',
      'El gnomón opera como el puntero de un reloj solar. Conforme la estrella avanza por el cielo, la vara proyecta una sombra que altera su longitud y dirección. Observando estos cambios, los mayas descifraron los engranajes celestiales. Aprendieron a anticipar las estaciones registrando cuán corta era la sombra al mediodía.',
      'Durante el paso cenital, el gnomón se convertía en el protagonista ceremonial. En el mediodía astronómico, cuando el sol coronaba el ápice del cielo, la sombra del palo desaparecía. La oscuridad se encogía bajo la madera. Para el astrónomo maya, la nulidad de sombra representaba una confirmación categórica.',
      'Los sabios mayas no se limitaron a utilizar ramas de madera para sus investigaciones. Transmutaron su arquitectura en gnomones pétreos. Empleaban estelas rectangulares, pilones y las aristas de sus pirámides para atrapar la radiación solar y medir el transcurrir del tiempo cósmico.',
      'La meticulosidad astronómica que alcanzaron observando sombras fue deslumbrante. Marcando el extremo de la sombra matutina y vespertina, consiguieron estructurar calendarios que abarcaban millones de días. El humilde gnomón permitió amalgamar las complejas existencias sociales, agrícolas y místicas de la cultura mesoamericana.'
    ],
    expandables: [
      { label: 'Sombras Cruzadas', icon: 'clock', text: 'Para incrementar dramáticamente la precisión, los estudiosos mayas plantaban múltiples gnomones alineados estratégicamente. Observando cautelosamente cómo se cruzaban e intersectaban las líneas visuales entre ellos durante los amaneceres, fundaban asombrosos observatorios de horizonte. Si el sol despuntaba exactamente detrás del poste focal, inauguraban formalmente la festividad estacional correspondiente.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La utilización astronómica del gnomón vertical no se restringía de ninguna manera a documentar la iluminación diurna. Los mayas también aplicaban lógicamente estos infalibles principios geométricos durante las oscuras noches, usando las aristas pétreas para rastrear detalladamente el sinuoso trayecto de la resplandeciente Luna y del vital planeta Venus.' },
    ],
    fact: 'El eminente estudio de las cambiantes sombras proyectadas mediante postes rectos generó el nacimiento fáctico de la trigonometría temprana. Al medir la altura del palo vertical comparándola constantemente con la longitud de su oscura sombra tendida, los matemáticos antiguos deducían ángulos solares precisos. El rústico gnomón materializa la profunda premisa de que no requieres en absoluto tecnología electrónica para poder realizar cálculos y deducciones sofisticadas.',
  },
  {
    id: 'edificio-cinco-pisos',
    title: 'Edificio de Cinco Pisos',
    color: '#8D6E63',
    btnImage: '/assets/maya/infographic_m14/btn_edificio-cinco-pisos.jpg',
    image: '/assets/maya/infographic_m14/hero_edificio-cinco-pisos.jpg',
    content: [
      'Presidiendo la urbe de Edzná, encontramos una estructura inusual dentro del orbe maya: el Edificio de Cinco Pisos. Imáginate un pastel escalonado, alzándose a 31 metros de altura, construido con piedra caliza. Este portento arquitectónico domina majestuosamente la Acrópolis ceremonial.',
      'El aspecto singular de este palacio-pirámide reside en su diseño híbrido. Regularmente, los palacios son recintos horizontales, mientras que las pirámides son elevaciones sólidas que culminan en templos pequeños. Este edificio conjuga ambas funciones. Sus masivos niveles inferiores ostentan recámaras abovedadas, coronadas por un santuario empinado.',
      'Esta montaña labrada no sirvió meramente para ostentar opulencia. Su alineación geométrica la transforma en un observatorio astronómico. La ancha fachada principal fue planificada encarando directamente la trayectoria estacional del sol. Ingenieros y astrónomos sincronizaron sus disciplinas para interactuar físicamente con el astro.',
      'Cuando la sagrada fecha del paso cenital arribaba, los rayos solares caían sobre la caliza. Justo al mediodía, las escalinatas, cornisas y rebordes de la pirámide cesaban de emitir sombra. La edificación absorbía la lumbre cenital, transformándose en un pilar fulgurante.',
      'Coronando la quinta planta, reside una muralla pétrea denominada crestería. Cuando los sabios gobernantes escalaban las gradas para escudriñar cómo se filtraba la luz por las ventanas de piedra, refrendaban los augurios cósmicos. El edificio amalgama la autoridad política y el dominio celestial.'
    ],
    expandables: [
      { label: 'Ingenio en Piedra', icon: 'atom', text: 'Examinando las sólidas estancias contenidas interiormente, los arquitectos contemporáneos confirmaron cómo los mayas implementaron la sofisticada "bóveda en saledizo". Esta ingeniosa técnica superpone progresivamente hileras de grandes rocas hasta cerrar pesados techos interiores, permitiendo soportar asombrosamente las abrumadoras toneladas del masivo templo superior sin sufrir derrumbes estructurales.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La ancha escalinata central del monumental inmueble resguarda asombrosos secretos tallados. Múltiples peldaños inferiores ostentan detalladísimos bloques cincelados exhibiendo elaborados jeroglíficos antiguos. Ascender por esta histórica escalera equivalía literalmente a pisotear devotamente las victoriosas efemérides y el abolengo reverencial de los poderosos caudillos fundacionales de Edzná.' },
    ],
    fact: 'El soberbio Edificio de Cinco Pisos jamás fue alzado repentinamente, sino que materializa el denodado esfuerzo acumulado de múltiples generaciones a través de dilatados siglos. Evolucionó partiendo de un santuario basal modestísimo, siendo envuelto progresivamente por monumentales añadidos exteriores. Visualmente documenta la brillante hibridación arquitectónica, combinando el macizo y sobrio estilo inicial Petén oculto en su masivo núcleo, recubierto por los intrincadísimos detalles del tardío estilo Puuc.',
  },
  {
    id: 'sistema-hidraulico',
    title: 'Sistema Hidráulico',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m14/btn_sistema-hidraulico.jpg',
    image: '/assets/maya/infographic_m14/hero_sistema-hidraulico.jpg',
    content: [
      'Situémonos en un asentamiento edificado sobre barros que mutan de pantanos anegados a terrenos polvorientos. Semejante escenario era el escollo de la metrópoli. Los valerosos mayas, en lugar de claudicar, concibieron un manejo hídrico colosal. Demostraron un gran tesón ingenieril.',
      'Elaboraron un tejido integrado por treinta kilómetros de canales y embalses notables. Figura estas excavaciones como venas irrigando la totalidad cívica. El conducto supremo supera mil metros longitudinales, acaparando cincuenta metros horizontales. Recolectaba la lluvia y la canalizaba controladamente.',
      '¿Cómo lograba engarzarse la recolección acuífera con las esferas celestiales? Las inclemencias climáticas de Edzná gravitaban sobre un ciclo hídrico rígido. Observando los cenit solares, la jerarquía presagiaba el arribo del temporal lluvioso. Intersecaban la astronomía con la supervivencia estricta.',
      'Pronosticar certeramente la precipitación otorgaba la ventaja temporal para maniobrar compuertas lodosas, limpiar inmensos aljibes y depositar las semillas del maíz en las parcelas. Fallar estos cálculos astronómicos abocaría a la hambruna generalizada o a inundaciones devastadoras. La astrología cimentaba la prosperidad nutricional.',
      'Paralelamente al suministro potable y al riego de los sembradíos, este reticulado acuático propiciaba una movilidad expedita. Sustituyendo los acarreos peatonales, ágiles navegantes tripulaban pequeñas canoas, distribuyendo pertrechos por el circuito. Domando el agua cristalizaron su hegemonía cívica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante la penosa excavación de los mastodónticos canales zanjados, los incansables operarios extrajeron millares de toneladas del fecundo sustrato inferior. Jamás desperdiciaron este material orgánico: reutilizaron la totalidad del barro extraído para sobrellevar elevadas plataformas residenciales, protegiendo sagazmente sus delicadas habitaciones de las crecidas pluviales.' },
      { label: 'Mantenimiento Colosal', icon: 'clock', text: 'Indefectiblemente, la prolongada época de acentuada sequedad propiciaba un intensivo y organizado mantenimiento comunitario de la intrincada urdimbre hídrica. Pelotones de trabajadores paleaban el cenagoso limo residual depositado en la base de los acueductos, aprovechándolo directamente como inmejorable abono para fertilizar copiosamente los cercanos huertos familiares y vastas milpas periféricas.' },
    ],
    fact: 'Escaneos topográficos, empleando potentes rayos láser pulsados (LiDAR), confirmaron apabullantemente que la monumental obra civil de recolección fluida dominaba una astronómica cuenca cercana a los quince vastísimos kilómetros cuadrados. Semejantes proezas demuestran rotundamente avanzados conocimientos hidrodinámicos empíricos, equiparables plenamente a la magistral ingeniería de conducción de acueductos ejecutada masivamente durante el apogeo del antiguo Imperio Romano.',
  },
  {
    id: 'latitud-tropical',
    title: 'Latitud Tropical',
    color: '#4FC3F7',
    btnImage: '/assets/maya/infographic_m14/btn_latitud-tropical.jpg',
    image: '/assets/maya/infographic_m14/hero_latitud-tropical.jpg',
    content: [
      'Visualiza nuestra gigantesca Tierra rotando como un trompo inclinado persiguiendo al sol. Debido a esta postura, la irradiación solar bombardea diferentes sectores dependiendo de la progresión estacional del año. La cálida cintura que abraza el ecuador constituye la latitud tropical.',
      'Habitar dentro de esta zona geográfica permite atestiguar asombrosos eventos astronómicos. Únicamente dentro de estos linderos tropicales puede el sol situarse a noventa grados sobre nuestra posición, gestando el cenit. Poblaciones ubicadas fuera del perímetro soportan radiaciones oblicuas y persistentes sombras.',
      'Las capitales del universo maya, como Palenque, Tikal, Copán y Edzná, emergieron abrigadas bajo este palio tropical. Consecuentemente, la bóveda estelar que presenciaban estos polímatas difería de la perspectiva observable por los pensadores europeos.',
      'Considerando la curvatura de nuestra morada terrestre, el fenómeno cenital no se manifiesta sincrónicamente en todas partes. El cénit progresa barriendo el horizonte. Visita primeramente Copán, postergándose varias semanas hasta cobijar a Edzná. Diferentes poblados experimentaban sus jornadas sin sombra en distintas fechas.',
      'Esta asincronía climática obligó a los matemáticos de las diversas agrupaciones ciudadanas a forjar adecuaciones locales a su almanaque general. Ajustaron fórmulas geométricas para coincidir con el ángulo de su región. Demostraron una penetrante comprensión conceptual de la geometría esférica subyacente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El extendido y popular término "Trópico"procede curiosamente del arcaico léxico helénico (tropikós) denotando el concepto cardinal de"retorno". Los antiguos vigías astrales se percataron sagazmente de que al tocar los límites paralelos norte y sur, la candente estrella simulaba detenerse por completo para retroceder lentamente su marcha, señalando con espectacularidad los grandiosos solsticios celestiales extremos.' },
      { label: 'Copán y Astronomía', icon: 'atom', text: 'La colosal metrópoli sureña de Copán es universalmente distinguida por su manifiesta obsesión con la obsesiva exactitud calendárica de ciclos entrelazados. Su latitud propicia que el avasallante rayo cenital los impacte primeramente. Los sabios erigieron monumentales estelas monolíticas en cumbres remotas del extenso valle, buscando alineaciones solares perfectas durante los albares para decretar fehacientemente el inicio ceremonial del próspero tiempo fértil.' },
    ],
    fact: 'El inclinado y fundamental eje planetario terrestre, el cual propicia integralmente el incesante recambio periódico de todas nuestras coloridas y necesarias estaciones medioambientales, ostenta una peculiar angulación que fluctúa aproximadamente 23.5 grados. Por increíble y arcano que parezca, debido al pausado y paulatino efecto precesional astronómico espaciotemporal a lo largo de milenios, el preciso foco geométrico y los cálculos matemáticos de radiación solar esgrimidos por los mayas originales se han sutilmente desplazado del firmamento observable actual.',
  },
  {
    id: 'medicion-tiempo',
    title: 'Medición del Tiempo',
    color: '#E65100',
    btnImage: '/assets/maya/infographic_m14/btn_medicion-tiempo.jpg',
    image: '/assets/maya/infographic_m14/hero_medicion-tiempo.jpg',
    content: [
      'Visualicemos la encrucijada de intentar estructurar un calendario preciso careciendo de relojes modernos o telescopios de cuarzo. Dependiendo exclusivamente de sus ojos escrutadores, simples formaciones líticas y delgados postes vegetales, los mayas resolvieron el laberinto cósmico. Ubicaban puntos topográficos referenciales e inventariaban las secuencias del retorno solar.',
      'No obstante, el rudimentario recuento manual de amaneceres conlleva errores acumulativos. Una prolongada densidad de tormentas tropicales o dislexias numéricas arruinarían los pronósticos matemáticos. Ambicionaban una rúbrica celestial, exenta de debilidad perceptiva humana. El paso cenital confirió justamente esa exactitud irrefutable demandada por sus dogmas.',
      'Semejante singularidad óptica ejercía las funciones de un cronómetro rectificador impecable. Invocado en la jornada central, la exactitud del mediodía astronómico facultaba a la casta erudita maya para recalibrar cualquier desvío numérico. Podían corregir los errores que infestaban gradualmente sus calendarios a lo largo de un año cívico.',
      "Como un reloj integrado por discos dentados, orquestaron su paradigmática Rueda Calendárica. Sincronizaron su almanaque sagrado de 260 jornadas (Tzolkin) con el predecible recuento cívico-solar agrícola de 365 días (Haab'). Esta inmensa arquitectura numérica descansaba avalada constantemente por las puntuales intersecciones cenitales astronómicas anuales.",
      'Respaldados por siglos de devoción escudriñadora, los peritos matemáticos elaboraron un guarismo cronológico. Tasaron minuciosamente la traslación planetaria incesante del sol en 365.242 días reales. Este soberbio logro deductivo, alcanzado mediante troncos desnudos y cordeles, rivaliza sin ruborizarse contra las mediciones telescópicas satelitales actuales.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El enigmático y sacrosanto número de 260, conformante basal de su místico almanaque litúrgico, está entrañablemente ligado indisolublemente al astro rey calórico. Puntualmente evaluado sobre influyentes metrópolis meridionales, el compás aguardado para la traslación desde la inicial fulminación cenital observada estivalmente hasta su eventual y anhelado reencuentro de retorno, totalizaba pasmosamente una exacta contabilidad ininterrumpida de doscientas sesenta idénticas jornadas solares precisas.' },
      { label: 'Códices Antiguos', icon: 'clock', text: 'Extensa magnitud de nuestros vigentes entendimientos empíricos sobre las portentosas mecánicas del minucioso cronometrado cósmico maya florece íntegramente de un invaluable y esporádico rescate bibliográfico histórico: el venerable e intrincado "Códice de Dresde". En los frágiles pliegos amate apilados con pigmentos orgánicos imborrables, aquellos peritos estamparon pasmosas constancias tabuladas prediciendo espeluznantemente las cíclicas oscilaciones de las resplandecientes esferas celestiales y los espantosos oscurecimientos ecplípsales por decenas de generaciones venideras.' },
    ],
    fact: 'Reconociendo pragmáticamente la fraccionada acumulación diaria de residuales minutos cósmicos que impiden la simetría gregoriana absoluta (el sobrante empírico cuantificado), los eruditos mesoamericanos rehusaron añadir toscamente burdos días bisiestos artificiales interpolados en sus sagradas contabilidades inmemoriales originarias. Invocaron sabiamente una alternativa matemática purista, desarrollando laberínticas tablas de rectificación perpetua finamente inscritas en roca dura, cautelando imperturbablemente que el prístino transcurrir del engranaje temporal fundacional mítico del origen inmaculado fluyese majestuoso, prístino. Jamás resultase corrompido ni truncado transitoriamente.',
  },
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
      hue: Math.random() > 0.5 ? '255,214,0' : '2,136,209', // gold or blue
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,214,0,0.3))' }}>
        {/* Sun arc */}
        <path d="M 50 110 Q 300 -20, 550 110" fill="none" stroke="url(#sunGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 130;
          const colors = ['#8D6E63','#FFD600','#212121','#8D6E63','#0288D1','#4FC3F7','#E65100'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central sun icon */}
        <circle cx="300" cy="30" r="16" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.8" />
        <circle cx="300" cy="30" r="10" fill="#FFD600" opacity="0.9" />
        <line x1="300" y1="5" x2="300" y2="10" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="300" y1="50" x2="300" y2="55" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="275" y1="30" x2="280" y2="30" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="320" y1="30" x2="325" y2="30" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,214,0,0.1)" />
            <stop offset="50%" stopColor="rgba(255,214,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,214,0,0.1)" />
          </linearGradient>
        </defs>
        <text x="300" y="85" textAnchor="middle" fill="#FFD600" fontSize="22" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="4">EDZNÁ</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(255,214,0,0.7)" fontSize="12" fontWeight="700" fontFamily="sans-serif" letterSpacing="3">SOL EN EL CENIT</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,214,0,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
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
          layoutId="activeDotMayaM14"
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
      display: 'flex',
      flexDirection: 'column',
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{ height: '1px', flex: 1, background: `linear-gradient(90deg, transparent, ${node.color}40)` }} />
              <span style={{
                color: node.color, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px',
                textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Sparkles size={14} /> Explorar Más
              </span>
              <div style={{ height: '1px', flex: 1, background: `linear-gradient(270deg, transparent, ${node.color}40)` }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.5))`,
          border: `1px solid ${node.color}40`,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1,
            transform: 'rotate(-15deg)', pointerEvents: 'none',
          }}>
            <Star size={100} color={node.color} fill={node.color} />
          </div>
          <h4 style={{
            margin: '0 0 0.8rem', color: node.color, fontSize: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', background: node.color, display:'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Star size={14} color="#000" fill="#000" />
            </div>
            Dato Curioso
          </h4>
          <p style={{
            margin: 0, fontSize: '0.95rem', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.9)', fontStyle: 'italic',
          }}>
            "{node.fact}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar Component â”€â”€â”€
function ProgressBar({ total, exploredIds }) {
  const progress = (exploredIds.length / total) * 100;
  return (
    <div style={{
      width: '100%', maxWidth: '400px', margin: '2rem auto 0',
      background: 'rgba(0,0,0,0.4)', borderRadius: '20px',
      padding: '1rem 1.5rem', border: '1px solid rgba(255,214,0,0.2)',
      textAlign: 'center', position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#FFD600', fontWeight: 700 }}>
        <span>PROGRESO DE EXPLORACIÃ“N</span>
        <span>{exploredIds.length} / {total} Nodos</span>
      </div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: '#FFD600', boxShadow: '0 0 10px #FFD600' }}
        />
      </div>
      {exploredIds.length === total && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '0.8rem', fontSize: '0.85rem', color: '#4FC3F7', fontWeight: 700 }}
        >
          ¡Análisis Arquitectónico y Astronómico Completado!
        </motion.div>
      )}
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM14() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
    } else {
      setActiveNodeId(id);
      if (!exploredIds.includes(id)) {
        setExploredIds(prev => [...prev, id]);
      }
    }
  };

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #070912, #0D1226)',
      padding: '2rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <MayaHeader />

        {/* Main Interface */}
        <div style={{
          background: 'rgba(15, 20, 40, 0.6)',
          backdropFilter: 'blur(16px)',
          borderRadius: '32px',
          padding: '2rem',
          border: '1px solid rgba(255,214,0,0.15)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Node Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem',
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

          <AnimatePresence mode="wait">
            {activeNodeId ? (
              <ContentPanel
                key={activeNodeId}
                node={activeNode}
                onClose={() => setActiveNodeId(null)}
                setLightboxSrc={setLightboxSrc}
              />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center', padding: '4rem 2rem',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                <Sparkles size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: 300 }}>
                  Selecciona un concepto arquitectónico o astronómico para analizar la maravilla de Edzná.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ProgressBar total={INFOGRAPHIC_NODES.length} exploredIds={exploredIds} />

        {/* Bibliography */}
        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative', zIndex: 2,
        }}>
          <h4 style={{
            margin: '0 0 1rem', color: '#FFD600', fontSize: '0.9rem',
            textTransform: 'uppercase', letterSpacing: '2px',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#FFD600', borderRadius: '50%' }} />
            Referencias Científicas y Arqueológicas
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => <li key={i}>{bib}</li>)}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen expandida" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
