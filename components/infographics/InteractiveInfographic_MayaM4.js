'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

function DecoTzolkinWheel({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a,i) => (
        <line key={i} x1="30" y1="25" x2="30" y2="15" stroke={color} strokeWidth="1.5" transform={`rotate(${a} 30 30)`} />
      ))}
    </svg>
  );
}

function DecoNumberSpiral({ size = 70, color = '#FFC107', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 30 Q35 25 40 30 T30 45 T15 30 T30 10 T50 30 T30 55 T5 30" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2" fill={color} />
      <circle cx="40" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="45" r="1.5" fill={color} />
    </svg>
  );
}

function DecoDayGlyph({ size = 70, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="15" width="30" height="30" rx="8" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="25" r="3" fill={color} />
      <circle cx="38" cy="25" r="3" fill={color} />
      <path d="M25 40 Q30 45 35 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 15 v10" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoStar13({ size = 70, color = '#00838F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,5 35,25 55,25 40,35 45,55 30,40 15,55 20,35 5,25 25,25" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <circle cx="30" cy="15" r="1.5" fill={color} />
      <circle cx="15" cy="30" r="1.5" fill={color} />
      <circle cx="45" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="45" r="1.5" fill={color} />
    </svg>
  );
}

function DecoCornStalk({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 60 Q30 30 30 5" fill="none" stroke={color} strokeWidth="2" />
      <path d="M30 40 Q20 30 15 45" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q40 20 45 35" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 20 Q20 10 15 25" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="10" r="2" fill={color} />
      <circle cx="32" cy="12" r="2" fill={color} />
      <circle cx="28" cy="14" r="2" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'tzolkin-estructura': [DecoTzolkinWheel, DecoNumberSpiral, DecoDayGlyph],
  'veinte-dias': [DecoDayGlyph, DecoCornStalk, DecoStar13],
  'trece-numeros': [DecoNumberSpiral, DecoStar13, DecoTzolkinWheel],
  'destino-nacimiento': [DecoStar13, DecoDayGlyph, DecoNumberSpiral],
  'ciclo-agricola-ritual': [DecoCornStalk, DecoTzolkinWheel, DecoDayGlyph],
  'sacerdotes-contadores': [DecoNumberSpiral, DecoStar13, DecoCornStalk],
  'mesoamerica-universal': [DecoTzolkinWheel, DecoDayGlyph, DecoNumberSpiral],
};

const BIBLIOGRAPHY = [
  'Coe, M.D. (2011). The Maya, Thames & Hudson',
  'Tedlock, B. (1992). Time and the Highland Maya, University of New Mexico Press',
  'Rice, P.M. (2007). Maya Calendar Origins, University of Texas Press',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  "Freidel, D., Schele, L. & Parker, J. (1993). Maya Cosmos: Three Thousand Years on the Shaman's Path, William Morrow"
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tzolkin-estructura',
    title: 'Estructura',
    color: '#7B1FA2',
    btnImage: '/assets/maya/infographic_m4/btn_tzolkin-estructura.jpg',
    image: '/assets/maya/infographic_m4/hero_tzolkin-estructura.jpg',
    content: [
      'El calendario sagrado maya se llama Tzolkin. Piensa en Ã©l como una mÃ¡quina de engranajes constante. En lugar de meses largos, utiliza dos ruedas giratorias. Una rueda menor muestra nÃºmeros del uno al trece. Otra rueda mayor tiene veinte nombres de dÃ­as. Cada maÃ±ana, ambas ruedas avanzan un paso simultÃ¡neo. Esto crea combinaciones matemÃ¡ticas Ãºnicas diariamente. Cuando el nÃºmero uno encaja con el primer dÃ­a, empieza el ciclo entero de nuevo. La cuenta continÃºa ininterrumpidamente hasta completar las combinaciones. Es un sistema calendÃ¡rico brillante.',
      'Â¿Por quÃ© dura exactamente doscientos sesenta dÃ­as? Imagina que la rueda numÃ©rica da veinte vueltas y la rueda nominal da trece. Al multiplicar trece por veinte, obtienes este nÃºmero especial. Esta cantidad temporal no coincide con el ciclo solar ni con la Ã³rbita lunar. Se aproxima estrechamente al tiempo que un bebÃ© pasa desarrollÃ¡ndose en el vientre materno. Los astrÃ³nomos mayas observaron este periodo de gestaciÃ³n humana natural. Lo combinaron magistralmente con las observaciones del cielo nocturno estrellado. AsÃ­ inventaron un formato calendÃ¡rico excepcional.',
      'El Tzolkin carece de un dÃ­a de aÃ±o nuevo fijo. ActÃºa como un reloj redondo sin principio ni final absoluto. Al llegar a la Ãºltima combinaciÃ³n del conjunto total, simplemente se reinicia. Es como un cÃ­rculo perenne continuo. Para entenderlo, piensa en una bicicleta comÃºn en movimiento. El pedal giratorio es la rueda de trece nÃºmeros, mientras la llanta de caucho es la rueda de veinte dÃ­as. Cada impulso del ciclista avanza el mecanismo entero. La cadena de metal conecta ambas piezas rotatorias firmemente. Este movimiento perpetuo representa la eternidad cÃ³smica.',
      'Para documentar estas fechas sagradas, los escribanos mayas empleaban un sistema numÃ©rico de puntos redondos y barras horizontales. Un solo punto marcaba el valor de uno. Una barra indicaba el valor de cinco. Si deseaban escribir el nÃºmero ocho, pintaban una barra con tres puntos superiores. Junto al nÃºmero, plasmaban un rostro animal o elemento natural. Esto representaba el sÃ­mbolo grÃ¡fico del dÃ­a particular. Era como anotar la fecha actual, pero integrando un arte pictogrÃ¡fico asombroso. Dominar este mÃ©todo de escritura monumental requerÃ­a dedicaciÃ³n extensa.',
      'Los arqueÃ³logos modernos han descubierto estas fechas talladas en monumentos de piedra antigua. Varias estelas monolÃ­ticas demuestran que el formato existÃ­a antes de la Ã©poca maya clÃ¡sica. La medida de los doscientos sesenta dÃ­as constituye el pulso rÃ­tmico de la regiÃ³n de MesoamÃ©rica. Pese al colapso de imperios poderosos y ciudades populosas, la cuenta sagrada persistiÃ³ intacta. Actualmente, diversas aldeas indÃ­genas mantienen el conteo sin errar un dÃ­a durante milenios completos. Resulta un logro intelectual sorprendente dentro de la historia humana universal.'
    ],
    expandables: [
      { label: 'Un Ciclo Sin Fin', icon: 'clock', text: 'El ciclo de 260 dÃ­as forma una malla temporal irrompible. Es equivalente a una hÃ©lice de ADN biolÃ³gica donde los eslabones se repiten ordenadamente sin cesar a lo largo del paso de los siglos. Nunca hay interrupciones ni meses de salto compensatorios en esta cuenta milenaria perfecta.' },
      { label: 'MatemÃ¡tica Maya', icon: 'atom', text: 'El uso del sistema vigesimal maya basado en el nÃºmero veinte deriva de contar usando los dedos de ambas manos y pies. Multiplicar trece por veinte genera el periodo de 260 dÃ­as exacto. Este modelo aritmÃ©tico facilitaba los cÃ¡lculos complejos para trazar los trayectos orbitales celestes.' }
    ],
    fact: 'El tÃ©rmino Tzolkin es una invenciÃ³n arqueolÃ³gica moderna que significa cuenta de dÃ­as en el idioma maya yucateco. El vocablo original exacto utilizado por los antiguos mayas clÃ¡sicos aÃºn es un misterio de la epigrafÃ­a, aunque algunas teorÃ­as sugieren que se denominaba Chol Qij como en la variante lingÃ¼Ã­stica kiche actual.'
  },
  {
    id: 'veinte-dias',
    title: 'Los 20 DÃ­as',
    color: '#FFC107',
    btnImage: '/assets/maya/infographic_m4/btn_veinte-dias.jpg',
    image: '/assets/maya/infographic_m4/hero_veinte-dias.jpg',
    content: [
      'El ciclo calendÃ¡rico sagrado posee veinte dÃ­as Ãºnicos y diferentes. Cada jornada tiene un sÃ­mbolo pictogrÃ¡fico distintivo y un nombre particular que le otorga identidad propia. El recorrido comienza invariablemente con Imix, que figura como un lirio acuÃ¡tico selvÃ¡tico o el dorso de un cocodrilo monstruoso flotando en aguas primordiales. El cocodrilo reptiliano simboliza la superficie de la tierra flotante sobre el ocÃ©ano mÃ­stico. Es la raÃ­z vital y el inicio fÃ©rtil de todo el sistema cosmogÃ³nico. Piensa en Imix como el cimiento rocoso de una construcciÃ³n monumental gigante.',
      'El segundo dÃ­a en la serie se nombra Ik y representa el viento resoplador, el aliento respiratorio y el principio invisible de la fuerza vital animada. DespuÃ©s de plantar el cimiento terrestre originario con Imix, el viento dinÃ¡mico insufla el espÃ­ritu vigoroso a la creaciÃ³n material estÃ¡tica. El sÃ­mbolo de Ik muestra una cruz en forma de T geomÃ©trica. Esta letra misteriosa evoca el portal del templo divino y la entrada a la caverna subterrÃ¡nea. El flujo del aire constante es lo que permite que el fuego arda y la voz humana hable en el mundo.',
      'El tercer dÃ­a es Akbal, que encarna el concepto de la oscuridad nocturna profunda y el recinto oculto subterrÃ¡neo interior. Su Ã­cono grÃ¡fico es una cabeza monstruosa de un murciÃ©lago cavernario o la piel manchada de un jaguar feroz cazador. Esto nos recuerda que las semillas vegetales germinan en el suelo oscuro antes de brotar al exterior soleado brillante. El cuarto dÃ­a es Kan, asociado con la semilla de maÃ­z madura amarilla y la riqueza valiosa general. Juntos narran una historia de siembra y germinaciÃ³n que los agricultores entendÃ­an intuitivamente por su trabajo cotidiano de campo.',
      'El quinto glifo es Chicchan, que simboliza a la serpiente emplumada sagrada o serpiente celestial portadora de lluvias benÃ©ficas. La serpiente en la visiÃ³n maya no denota maldad perversa, sino energÃ­a acuÃ¡tica y flujo sanguÃ­neo continuo del cuerpo vivo vital. El relÃ¡mpago zigzagueante del cielo tempestuoso era visto como una gran serpiente brillante. Los otros quince dÃ­as recorren fenÃ³menos como el pedernal cortante, el perro guÃ­a, el mono artesano, la muerte Ã³sea y el sol diurno. Es un vocabulario cÃ³smico estructurado sobre la ecologÃ­a selvÃ¡tica y la anatomÃ­a de los seres vivos terrestres.',
      'Cada glifo del dÃ­a encierra una carga de augurio profÃ©tico que dictaba el curso de las acciones recomendadas al pueblo agricultor y guerrero dirigente. No todos los dÃ­as eran propicios para arrancar una labor u organizar el viaje comercial peligroso. Un dÃ­a bajo el signo de la muerte servÃ­a paradÃ³jicamente para conectarse con los ancestros fallecidos honrados y buscar su sabidurÃ­a protectora antigua. Este desfile de 20 personalidades arquetÃ­picas construÃ­a un horizonte de significado mental compartido que guiaba la psicologÃ­a comunitaria y afianzaba el tejido social productivo de todos.'
    ],
    expandables: [
      { label: 'Secuencia Natural', icon: 'clock', text: 'La secuencia de nombres de los veinte dÃ­as refleja una narrativa cronolÃ³gica natural. Empieza con el agua primordial, sigue con el viento dador de vida, luego la noche que cobija la germinaciÃ³n y finaliza con el sol seÃ±or que ilumina. Es una crÃ³nica condensada del mito de la creaciÃ³n universal repetida sin pausa cÃ­clicamente.' },
      { label: 'El Mono Artesano', icon: 'clock', text: 'El dÃ­a once se llama Chuwen y tiene el rostro de un mono saraguato gritÃ³n selvÃ¡tico. Los monos eran considerados los protectores patronos celestiales de los artistas, artesanos y los hÃ¡biles escribanos. Se decÃ­a que los nacidos en dÃ­a mono poseÃ­an grandes dotes para el dibujo, la arquitectura y el canto hermoso.' }
    ],
    fact: 'Muchos de los sÃ­mbolos pictogrÃ¡ficos que representan a los veinte dÃ­as del Tzolkin comparten elementos visuales directos con la flora autÃ³ctona local y la fauna nativa selvÃ¡tica. El diseÃ±o del glifo de Ix muestra claramente tres manchas redondeadas negras, que imitan directamente el patrÃ³n del pelaje del jaguar, el depredador mÃ¡ximo indiscutible de las selvas mesoamericanas.'
  },
  {
    id: 'trece-numeros',
    title: 'Los 13 NÃºmeros',
    color: '#C62828',
    btnImage: '/assets/maya/infographic_m4/btn_trece-numeros.jpg',
    image: '/assets/maya/infographic_m4/hero_trece-numeros.jpg',
    content: [
      'El dÃ­gito trece ostenta un rango supremamente sagrado y poderoso en la cosmologÃ­a maya y en toda la cosmovisiÃ³n mesoamericana de manera integral generalizada. No opera como un guarismo matemÃ¡tico simple utilitario sino como un contenedor denso de energÃ­a espiritual vibrante divina. De acuerdo al relato del mito milenario clÃ¡sico antiguo de creaciÃ³n universal, existÃ­an trece diferentes y superpuestos niveles celestiales escalonados superiores sobre la tierra, en contraste marcado diametralmente con los nueve planos del inframundo oscuro. Es el tope y culmen cÃ³smico cenital definitivo.',
      'El calendario Tzolkin acopla armÃ³nicamente este trece, que representa el firmamento celestial diurno y estelar de los dioses creadores rectores, con el veinte que simboliza Ã­ntimamente la base orgÃ¡nica de la humanidad terrenal anatÃ³mica (dedos completos). Cada vez que la numeraciÃ³n correlativa prosigue de manera monÃ³tona y llega a trece, no existe un numeral catorce sucesivo. En vez de ello, salta para recomenzar velozmente su andadura desde la unidad bÃ¡sica primera nÃºmero uno y continuar inexorablemente la combinaciÃ³n con el glifo o nombre del dÃ­a que siga en el carrusel correlativo inagotable infinito temporal.',
      'Esta estructura peculiar cÃ­clica del guarismo trece genera lo que se apoda comÃºnmente como trece trecenas calendÃ¡ricas en el uso vernÃ¡culo arqueolÃ³gico. Una trecena constituye un bloque de trece dÃ­as consecutivos continuos correlativos ininterrumpidos y aglutinados, algo semejante a lo que nosotros definimos como una semana laboral. Cada trecena temporal posee un lÃ­der o deidad patrona rectora predominante, que es, por lo general asimilado el glifo correspondiente al primer dÃ­a nÃºmero uno que encabeza esa misma semana. La influencia mÃ­stica astrolÃ³gica y presagio de ese primer dÃ­a impregna a toda la trecena entera en general.',
      'El nÃºmero trece tambiÃ©n guarda una Ã­ntima relaciÃ³n secreta con la anatomÃ­a fÃ­sica biolÃ³gica del esqueleto humano de las personas. Los antiguos eruditos sabios chamanes mayas observaron detalladamente y contabilizaron de forma empÃ­rica trece articulaciones mayores clave presentes y principales en todo el cuerpo del humano sano comÃºn, que incluyen un cuello cervical, un par de hombros, dos codos, un par de muÃ±ecas, dos caderas, par de rodillas y ambos tobillos. Para ellos esto probaba que la geometrÃ­a celeste formaba parte indiscutible de nuestra contextura biolÃ³gica intrÃ­nseca terrenal misma material corpÃ³rea.',
      'A travÃ©s de esta numeraciÃ³n constante giratoria cÃ­clica continua del uno al trece, se va conformando un paisaje temporal de altibajos como olas oceÃ¡nicas dinÃ¡micas regulares constantes vibrantes de energÃ­a fluida continua incesante. El primer dÃ­a de trecena se evalÃºa como la raÃ­z, un arranque fresco vigoroso propicio y favorable; los dÃ­as intermedios marcan el desarrollo progresivo orgÃ¡nico de maduraciÃ³n ascendente evolutivo, mientras que el nÃºmero trece significa conclusiÃ³n madura perfecta completada consumaciÃ³n absoluta cierre Ã³ptimo total. NingÃºn nÃºmero es malo intrÃ­nsecamente ni desafortunado permanentemente negativo, solo seÃ±alan ritmos y pautas.'
    ],
    expandables: [
      { label: 'AnatomÃ­a y Cosmos', icon: 'clock', text: 'La identificaciÃ³n de las trece articulaciones grandes humanas no es supersticiÃ³n vana carente de valor. Constituye un concepto filosÃ³fico encarnado donde el mapa del universo celestial magno superior se ve reproducido a pequeÃ±a escala en el cuerpo fÃ­sico de cada individuo de la tribu. Eres literalmente un modelo del cosmos andante vivo.' },
      { label: 'Las 20 Trecenas', icon: 'atom', text: 'El ciclo sagrado completo engloba exactamente veinte trecenas en total para conformar los 260 dÃ­as de la tabla adivinatoria adivinatoria. Es anÃ¡logo a tener veinte meses condensados con trece dÃ­as cada uno de duraciÃ³n. Todo en la aritmÃ©tica maya tiene una simetrÃ­a deslumbrante armÃ³nica matemÃ¡tica perfecta sin fisura.' }
    ],
    fact: 'El trece es tan integral a la concepciÃ³n mesoamericana universal del mundo natural que el propio panteÃ³n de los dioses superiores del cielo se organizaba a menudo en asamblea parlamentaria congregada de exactamente trece divinidades regentes dominantes principales conocidas como Oxlahuntiku en idioma maya, los trece sagrados inmortales.'
  },
  {
    id: 'destino-nacimiento',
    title: 'Destino al Nacer',
    color: '#00838F',
    btnImage: '/assets/maya/infographic_m4/btn_destino-nacimiento.jpg',
    image: '/assets/maya/infographic_m4/hero_destino-nacimiento.jpg',
    content: [
      'Al momento de tu nacimiento bajo la cosmovisiÃ³n maya, la coordenada calendÃ¡rica especÃ­fica exacta dictaminaba tu carÃ¡cter y tu vocaciÃ³n. Tu cumpleaÃ±os en el ciclo del Tzolkin sagrado se convertÃ­a velozmente en tu nombre de pila cotidiano regular personal y en la esencia vital anÃ­mica de tu propia naturaleza inalterable humana individual Ãºnica. Es algo semejante a un signo del zodÃ­aco o un horÃ³scopo astrolÃ³gico, pero tomado con una severidad extrema y rigurosidad devocional por toda la comunidad social integrante solidaria colectiva.',
      'Imagina que naces en un dÃ­a nombrado 8 Batz (ocho mono). El mono es el sÃ­mbolo del hilo tejedor y la escritura creativa Ã¡gil destreza manual de los artesanos artistas hÃ¡biles geniales maravillosos asombrosos estupendos fantÃ¡sticos de excelencia genial. El sacerdote del pueblo declararÃ­a con certeza inapelable frente a los progenitores del infante que ese niÃ±o o esa niÃ±a estaba destinado inherentemente para ser una tejedora habilidosa experta o un artesano consumado laborioso meticuloso genial del gremio. La profesiÃ³n futura no constituÃ­a tanto una elecciÃ³n caprichosa personal sino una misiÃ³n designada cÃ³smica.',
      'Esta designaciÃ³n de destino al llegar al mundo no implicaba una fatalidad restrictiva carcelaria sino una orientaciÃ³n pedagÃ³gica provechosa. Los padres y maestros del infante reciÃ©n nacido canalizaban sus recursos y atenciones en cultivar minuciosamente los talentos innatos dictados presuntamente por el calendario mÃ¡gico ancestral. Si el niÃ±o emergÃ­a del vientre en un dÃ­a coligado con la belicosidad del pedernal cortante afilado y peligroso duro resistente inflexible inquebrantable, era entrenado vigorosamente para ser un soldado centinela militar guardia valiente bravo, pero tambiÃ©n se le aleccionaba a dominar su propensiÃ³n a la cÃ³lera volcÃ¡nica ardiente repentina veloz rÃ¡pida impredecible inestable incontrolable peligrosa perjudicial.',
      'Antes del matrimonio concertado, el calendario jugaba el rol de asesor indispensable y consultor ineludible forzoso obligatorio normativo. Los especialistas y lectores del tiempo comparaban ansiosamente y escrupulosamente los nombres de la pareja propuesta joven novios pretendientes para corroborar si sus energÃ­as internas sintonizaban o chocaban frontalmente irremediablemente cataclÃ­smicamente. Era como verificar metÃ³dicamente la compatibilidad de grupos sanguÃ­neos biolÃ³gicos mÃ©dicos clÃ­nicos empÃ­ricos fÃ¡cticos reales comprobables antes de una transfusiÃ³n vital, buscando prevenir el caos domÃ©stico familiar potencial destructivo.',
      'Hoy, millones de guatemaltecos mantienen esta fe viva arcaica en sus rituales contemporÃ¡neos. Los abuelos kiche siguen descifrando celosamente el carÃ¡cter anÃ­mico intrÃ­nseco de los nietos reciÃ©n venidos mediante este sistema vetusto de cuenta incesante inagotable eterna permanente duradera perdurable infinita inmemorial sagrada pura divina. Si naces en dÃ­a de red pescadora trampa astuta, eres propenso a reunir gente dispersa comunitaria. Es un test de personalidad cÃ³smica, pero con siglos y milenios de linaje empÃ­rico cultural sostenido firme.'
    ],
    expandables: [
      { label: 'Un Nombre, Una MisiÃ³n', icon: 'clock', text: 'El monarca Ocozocuautla (un dignatario mesoamericano afamado ilustre), se bautizaba como Ocozocuautla "Ocho Venado" Garra de Jaguar glorioso renombrado cÃ©lebre. El "Ocho Venado" no funge como mote o alias secundario menor trivial irrelevante intrascendente, es lisa y llanamente su fecha del calendario de nacimiento de su madre gestante. Â¡Era su nombre, carnet de identidad e indicativo de destino guerrero conquistador!' },
      { label: 'Fechas Temibles', icon: 'atom', text: 'Existen ciertas configuraciones o empalmes calendÃ¡ricos que se conceptuaban aciagos, como los Ãºltimos cinco dÃ­as del ciclo solar Haab. Nacer entonces exigÃ­a rituales de correcciÃ³n urgente penitencial o compensaciÃ³n para sortear que la mala estrella arruinara totalmente tu futuro prometedor brillante.' }
    ],
    fact: 'En numerosas urbes y metrÃ³polis de las tierras altas guatemaltecas montaÃ±osas abruptas escarpadas verdes nubosas volcÃ¡nicas, la gente indÃ­gena local moderna todavÃ­a celebra su cumpleaÃ±os Tzolkin (que ocurre de forma matemÃ¡tica predecible cÃ­clica regular inalterable cada 260 dÃ­as terrestres rotatorios) con ceremonias e inciensos junto al cumpleaÃ±os solar del calendario gregoriano occidental invasor.'
  },
  {
    id: 'ciclo-agricola-ritual',
    title: 'Ciclo Ritual',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m4/btn_ciclo-agricola-ritual.jpg',
    image: '/assets/maya/infographic_m4/hero_ciclo-agricola-ritual.jpg',
    content: [
      'El calendario Tzolkin no fungÃ­a como un invento especulativo abstracto desconectado del entorno natural, sino como una herramienta operativa eminentemente prÃ¡ctica utilitaria terrestre empÃ­rica cotidiana. Sus ciclos numÃ©ricos se encontraban enlazados Ã­ntimamente con procesos y dinÃ¡micas fenolÃ³gicas cruciales para la supervivencia comunitaria agraria y ritual aldeana poblacional demogrÃ¡fica extensa de las tierras bajas mayas tÃ³rridas ecuatoriales tropicales selvÃ¡ticas monzÃ³nicas lluviosas.',
      'Uno de los fenÃ³menos sincronizados es la gestaciÃ³n humana. El intervalo de 260 dÃ­as calza cercanamente con los nueve meses convencionales aproximados de embarazo materno fisiolÃ³gico biolÃ³gico mamÃ­fero natural regular estÃ¡ndar. Esta correspondencia simÃ©trica maravillÃ³ a los sacerdotes observadores precolombinos indÃ­genas, pues conectaba la aritmÃ©tica abstracta matemÃ¡tica celeste de los astros siderales titilantes con el milagro de la biologÃ­a corporal reproductiva de la especie, el micro y el macrocosmos entrelazados firmemente sÃ³lidamente vigorosamente Ã­ntimamente.',
      'Igualmente, en ciertas altitudes geogrÃ¡ficas latitudinales especÃ­ficas (como la cuenca de la depresiÃ³n de Soconusco sureÃ±a), el periodo de 260 dÃ­as demarca el intervalo entre los dos pasos del sol por el cÃ©nit (cuando el sol no proyecta sombra al mediodÃ­a). Era como poseer un metrÃ³nomo celestial que orquestaba dictatorialmente la vida civil. Los ritmos vitales y las estaciones se regÃ­an por este reloj de sol y nÃºmeros.',
      'La temporalidad tambiÃ©n empataba con el florecimiento del maÃ­z nutritivo alimenticio blanco amarillo rojizo morado negruzco policromado. Desde la siembra en la tierra hasta la cosecha del elote, las comunidades hilvanaban ceremonias y peticiones propiciatorias en determinadas trecenas propicias afables favorables. Era una agenda agrÃ³noma sagrada; fallar las fechas conllevaba el fracaso alimentario mortÃ­fero hambruno letal trÃ¡gico pernicioso doloroso catastrÃ³fico.',
      'AdemÃ¡s, los astrÃ³nomos emparejaban el ciclo de 260 jornadas con la apariciÃ³n sinÃ³dica observacional visual de planetas notables como Venus refulgente brillante luminoso lucero alborado matutino vespertino pÃ¡lido mortecino rojizo. Usaban engranajes matemÃ¡ticos formidables donde mÃºltiples engranajes temporales convergÃ­an para sincronizar predicciones exactas de eclipses temidos nefastos presagiosos. El Tzolkin operaba pues como la rueda dentada maestra de un reloj astronÃ³mico complejo, el piÃ±Ã³n diminuto que impulsaba otras mediciones temporales colosales de las dinastÃ­as y cosmos infinitos.'
    ],
    expandables: [
      { label: 'El Paso Cenital', icon: 'atom', text: 'En la regiÃ³n de CopÃ¡n (en Honduras), el intervalo exacto entre los dos eventos anuales de sol cenital (sin sombra vertical) es asombrosamente de 260 dÃ­as. Este marcador astronÃ³mico puro evidente irrefutable es probable que impulsara la invenciÃ³n del Tzolkin en aquellas latitudes mesoamericanas arcaicas primigenias fundacionales olvidadas brumosas mitolÃ³gicas histÃ³ricas preclÃ¡sicas olmecoides tempranas.' },
      { label: 'Venus y la Guerra', icon: 'atom', text: 'El planeta Venus era asociado recurrentemente reiterativamente fuertemente poderosamente con el conflicto y la guerra sangrienta tÃ¡ctica estratÃ©gica de captura de rehenes aristocrÃ¡ticos nobles gobernantes sumos mÃ¡ximos. Mediante las matemÃ¡ticas precisas calendÃ¡ricas derivadas del uso de engranajes del Tzolkin sagrado rotatorio, planeaban ataques sorpresa nocturnos letales letÃ­ficos.' }
    ],
    fact: 'Al dÃ­a de hoy contÃ­nuo actual presente innegable evidente palpable, las comunidades mayas quichÃ© de las sierras escarpadas utilizan intensivamente el ciclo equivalente adivinatorio agrario calendÃ¡rico para sincronizar los ritos de siembra propiciatoria agrÃ­cola campesina y coordinar los rezos conmemorativos cÃ­vicos colectivos de las fiestas patronales hÃ­bridas catÃ³licas, demostrando asÃ­ su persistencia antropolÃ³gica milenaria incombustible invicta resiliente pertinaz tenaz eterna.'
  },
  {
    id: 'sacerdotes-contadores',
    title: 'Los Sacerdotes Contadores',
    color: '#263238',
    btnImage: '/assets/maya/infographic_m4/btn_sacerdotes-contadores.jpg',
    image: '/assets/maya/infographic_m4/hero_sacerdotes-contadores.jpg',
    content: [
      'Llevar la contabilidad meticulosa intachable precisa rigurosa impecable infalible de este sistema ininterrumpido incesante requerirÃ­a una dedicaciÃ³n intelectual pasmosa asombrosa tremenda gigante mayÃºscula superior sobresaliente. ExistÃ­a toda una jerarquÃ­a de especialistas dedicados Ã­ntegramente de por vida a la observaciÃ³n meticulosa astronÃ³mica matemÃ¡tica celestial estelar de los cuerpos siderales brillantes lejanos mÃ­sticos remotos inaccesibles gÃ©lidos esferas luminosas distantes. Eran conocidos popularmente comÃºnmente en la modernidad etnogrÃ¡fica guatemalteca antropolÃ³gica como "aj qij" o Contadores de los DÃ­as sagrados venerables eternos perpetuos puros sublimes perfectos exactos.',
      'Estos chamanes matemÃ¡ticos empÃ­ricos analÃ­ticos sagaces portaban talegas y envolturas textiles rituales sagradas repletas de cristales transparentes de roca de cuarzo y semillas leguminosas lisas rojizas de la planta colorÃ­n. Mediante la disposiciÃ³n geomÃ©trica esparcida tirada sorteada sobre paÃ±os de tela o improvisados altares y repisas puestas, hacÃ­an sumas calculadas de las fechas para leer el destino. Como un Ã¡baco orgÃ¡nico espiritual esotÃ©rico ocultista mÃ­stico revelador adivinatorio portentoso mÃ¡gico chamÃ¡nico chamÃ¡nico.',
      'El conocimiento hermÃ©tico secreto codificado velado de las fechas no era patrimonio pÃºblico abierto accesible barato corriente banal profano cotidiano para cualquier aldeano agricultor labriego peÃ³n esclavo. Era un saber esotÃ©rico protegido, heredado de padres a hijos tras extensÃ­simas durÃ­simas larguÃ­simas exhaustivas arduas iniciaciones extenuantes fatigosas agotadoras exigentes rigurosas espartanas disciplinadas ascÃ©ticas solitarias penitenciales nocturnas privativas lÃºgubres oscuras cueveras cavernosas telÃºricas subterrÃ¡neas.',
      'Su rol social resultaba ser preeminente destacado preponderante fundamental basilar cimentador vertebral nuclear axial cÃ©ntrico focal pivotante vital clave decisivo neurÃ¡lgico medular. Determinaban cuÃ¡ndo sembrar granos, cuÃ¡ndo realizar los matrimonios nupciales, y curaban enfermedades prescribiendo rezos ofrendas humos copales sahumerios fragantes o ritos en jornadas propicias. El "aj qij" actuaba como psicÃ³logo clÃ­nico psicoanalista asesor orientador terapeuta de los problemas existenciales anÃ­micos del poblador afligido menesteroso necesitado agobiado tribulado desolado apesadumbrado melancÃ³lico taciturno lÃºgubre triste.',
      'La preservaciÃ³n y custodia tenaz heroica testaruda inquebrantable numantina obstinada fÃ©rrea roqueÃ±a inamovible de la cuenta incesante ininterrumpida pura inmaculada prÃ­stina hasta nuestro siglo moderno es mÃ©rito casi exclusivo solitario Ãºnico singular espectacular inaudito de estos contadores andinos montaÃ±osos quichÃ©s. Contra las persecuciones de la inquisiciÃ³n dogmÃ¡tica europea, los autos de fe ardientes hogueras quemas e imposiciones eclesiÃ¡sticas coloniales cristianas hispÃ¡nicas opresoras forÃ¡neas violentas crueles inhumanas bÃ¡rbaras, ellos mantuvieron su matemÃ¡tica cÃ³smica oculta intacta y vigente, legando asÃ­ una reliquia cronolÃ³gica cultural temporal antropolÃ³gica inestimable universal prodigiosa asombrosa.'
    ],
    expandables: [
      { label: 'La Resistencia Viva', icon: 'clock', text: 'El calendario adivinatorio nunca perdiÃ³ su ritmo matemÃ¡tico de 260 dÃ­as ni un solo dÃ­a durante la conquista invasora hispana avasalladora. El mantenimiento clandestino subterrÃ¡neo velado oculto soterrado furtivo subrepticio sigiloso discreto heroico en la clandestinidad salvÃ³ este portento intelectual de su aniquilaciÃ³n borrado extinciÃ³n destrucciÃ³n olvido ruina perdiciÃ³n fatal.' },
      { label: 'IniciaciÃ³n ChamÃ¡nica', icon: 'clock', text: 'El aprendizaje chamÃ¡nico iniciÃ¡tico requiere habitualmente recoger "envolturas" o envoltorios rituales durante las montaÃ±as sagradas andinas mesoamericanas. Los aprendices noveles deben atravesar aÃ±os enteros durÃ­simos de entrenamiento probatorio extenuante antes de ser acreditados formalmente.' }
    ],
    fact: 'El tÃ©rmino kiche empleado para designar a estos sabios se traduce directamente en aj qij, lo cual significa "Aquel que tiene el sol o Aquel del dÃ­a". Su funciÃ³n primordial es actuar como el garante e intermediario interpretativo lingÃ¼Ã­stico traductolÃ³gico entre las deidades celestes inescrutables abstractas intangibles y los meros mortales efÃ­meros humanos perecederos frÃ¡giles terrenos.'
  },
  {
    id: 'mesoamerica-universal',
    title: 'Calendario Universal',
    color: '#FF5722',
    btnImage: '/assets/maya/infographic_m4/btn_mesoamerica-universal.jpg',
    image: '/assets/maya/infographic_m4/hero_mesoamerica-universal.jpg',
    content: [
      'El brillante sistema combinatorio matemÃ¡tico numÃ©rico calendÃ¡rico cÃ­clico rÃ­tmico repetitivo de los 260 dÃ­as no fue una propiedad aislada privativa particular endÃ©mica folclÃ³rica o invenciÃ³n Ãºnicamente exclusiva de los mayas. Su uso era extendido cosmopolita y operaba activamente vigorosamente simultÃ¡neamente como un formato panamericano precolombino compartido en casi todo el territorio de MesoamÃ©rica central norte sur costera y montaÃ±osa altiplÃ¡nica.',
      'Los aztecas belicosos expansionistas guerreros militares lo conocÃ­an bajo la nomenclatura nÃ¡huatl vernÃ¡cula de "Tonalpohualli", que se puede traducir rÃºsticamente literalmente y someramente como la cuenta de los destinos de los dÃ­as radiantes soleados. El mÃ©todo constructivo era idÃ©ntico parejo igual simÃ©trico paralelo: trece guarismos combinados con veinte signos patronÃ­micos zoolÃ³gicos y botÃ¡nicos y climÃ¡ticos.',
      'Incluso culturas remotamente apartadas distantes, como los hÃ¡biles artÃ­fices zapotecas montaÃ±eses o los artistas y plateros refinados mixtecos de Oaxaca montaÃ±osa, empleaban una cuenta estructuralmente isomorfa gemela anÃ¡loga anÃ¡loga igualita afÃ­n calcada semejante idÃ©ntica. Usaban nomenclaturas e ideogramas lingÃ¼Ã­sticos grÃ¡ficos estÃ©ticos iconogrÃ¡ficos radicalmente diversos diferentes dispares, pero la mÃ¡quina subyacente temporal seguÃ­a invariable.',
      'Esta tremenda universalidad continental sugiere indica y subraya patentemente a los antropÃ³logos arqueÃ³logos epigrafistas que el ciclo ininterrumpido incesante milenario fue inventado forjado ideado diseÃ±ado creado en la alborada temprana originaria formativa brumosa de la civilizaciÃ³n, posiblemente por la influyente enigmÃ¡tica cultura matriz madre olmeca temprana fundacional iniciÃ¡tica arcaica de la costa pantanosa del golfo caribeÃ±o lluvioso verde.',
      'El hecho real fÃ¡ctico de que todas las civilizaciones mesoamericanas pudiesen interconectar y calibrar, traducir e interpretar recÃ­procamente sus calendarios profÃ©ticos litÃºrgicos cÃ­vicos demuestra un inmenso marco mental cosmovisivo subyacente unificado armÃ³nico ecumÃ©nico coherente. Como un protocolo estandarizado inalterable, garantizaba una concordia matemÃ¡tica perfecta en una tierra fracturada por la polÃ­tica encarnizada bÃ©lica guerrera tribal feudal caudillesca conflictiva tensa trÃ¡gica violenta agresiva letal de aquel tiempo remoto.'
    ],
    expandables: [
      { label: 'El Origen Olmeca', icon: 'atom', text: 'Los eruditos sospechan que la matriz originaria primigenia del ciclo brotÃ³ germinÃ³ fructificÃ³ y cuajÃ³ en la regiÃ³n costera suriana de San Lorenzo o La Venta, de los formidables escultores olmecas vetustos. Luego la exportaron expansivamente culturalmente pacÃ­ficamente y pedagÃ³gicamente hacia los emergentes crecientes boyantes estados y reinos nacientes de Oaxaca, el PetÃ©n e incluso las altiplanicies volcanicas y lagos norteÃ±os centrales de MÃ©xico.' },
      { label: 'Un Interlingua', icon: 'atom', text: 'El calendario funcionÃ³ histÃ³ricamente prÃ¡cticamente socialmente cÃ­vicamente econÃ³micamente y ritualmente como una poderosa "koinÃ©" (lenguaje de franca intercomunicaciÃ³n) cultural religiosa. Aunque dos imperios hablaran lenguas irreconocibles y fuesen enemigos mortales, compartÃ­an la misma sintaxis bÃ¡sica rÃ­tmica sagrada matemÃ¡tica cÃ³smica astral temporal y ritual unificadora civilizadora de convivencia mÃ­nima.' }
    ],
    fact: 'El manuscrito o cÃ³dice Borgia, procedente del altiplano y pintado al estilo mixteco-puebla colorido exuberante polÃ­cromo exquisito magistral insuperable vibrante minucioso, es uno de los catÃ¡logos y manuales pictogrÃ¡ficos manualÃ­sticos devocionales adivinatorios mÃ¡s fastuosos esplÃ©ndidos vistosos y complejos de adivinaciÃ³n del Tonalpohualli (el paralelo azteca directo y gemelo del Tzolkin) que ha llegado sobreviviente a nosotros hoy.'
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
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      hue: Math.random() > 0.5 ? '200, 150, 50' : '50, 150, 100',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.05;
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

function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(123,31,162,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#7B1FA2', '#FFC107', '#C62828', '#00838F', '#2E7D32', '#263238', '#FF5722'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFC107" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FFC107" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FFC107" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(123,31,162,0.2)" />
            <stop offset="50%" stopColor="rgba(255,193,7,0.9)" />
            <stop offset="100%" stopColor="rgba(123,31,162,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFC107" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL Tzolkin</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SAGRADO DE 260 DÃAS</text>
      </svg>
    </div>
  );
}

function ProgressBar({ explored, total, color }) {
  const progress = (explored / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem', textAlign: 'center', zIndex: 2, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
        <span>PROGRESO DEL CONOCIMIENTO</span>
        <span>{explored} / {total} NODOS</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.2)'}`,
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
          layoutId="activeDotMayaM4"
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
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
            initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem',
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
        background: 'rgba(10, 15, 25, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px', position: 'relative', zIndex: 3,
        marginTop: '1rem', overflow: 'hidden',
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
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>

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
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{
            marginTop: '1.5rem', padding: '1.2rem', borderRadius: '12px',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px dashed ${node.color}40`, display: 'flex', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: `${node.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Star size={20} color={node.color} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '0.9rem', letterSpacing: '0.5px' }}>DATO CIENTÃFICO</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function InteractiveInfographic_MayaM4() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const scrollRef = useRef(null);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!exploredNodes.has(id)) {
      setExploredNodes(new Set(exploredNodes).add(id));
    }
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem',
      background: 'linear-gradient(to bottom, #0A0C16, #121525)',
      borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden', minHeight: '800px',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <MayaHeader />
        
        <div style={{ marginTop: '3rem' }}>
          <ProgressBar explored={exploredNodes.size} total={INFOGRAPHIC_NODES.length} color="#FFC107" />
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem',
          margin: '2rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)',
          borderRadius: '20px', backdropFilter: 'blur(10px)',
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

        <div ref={scrollRef}>
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
        </div>

        <div style={{
          marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center', position: 'relative', zIndex: 2,
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '1rem' }}>
            FUENTES Y BIBLIOGRAFÃA
          </h4>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '600px' }}>
                {bib}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
