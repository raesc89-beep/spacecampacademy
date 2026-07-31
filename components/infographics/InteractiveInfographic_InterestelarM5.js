'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Oort Cloud themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoOortShell({ size = 70, color = '#1A237E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {/* Scattered cometary bodies */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const dist = 22 + (i % 3) * 3;
        return (
          <circle key={i} cx={30 + dist * Math.cos(rad)} cy={30 + dist * Math.sin(rad)} r="1.5" fill={color} opacity="0.7" />
        );
      })}
    </svg>
  );
}

function DecoIcyBody({ size = 70, color = '#B3E5FC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M25 15 L35 12 L45 20 L42 35 L30 45 L15 35 L12 22 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M25 15 L30 25 L45 20" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 25 L42 35" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 25 L30 45" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M30 25 L15 35" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Craters */}
      <circle cx="22" cy="22" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="35" cy="32" r="4" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="25" cy="38" r="2" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function DecoSolarSystem({ size = 80, color = '#CFD8DC', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <circle cx="40" cy="20" r="3" fill={color} />
      <ellipse cx="40" cy="20" rx="10" ry="4" fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
      <ellipse cx="40" cy="20" rx="20" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <ellipse cx="40" cy="20" rx="30" ry="12" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="50" cy="20" r="1.5" fill={color} opacity="0.8" />
      <circle cx="23" cy="16" r="2" fill={color} opacity="0.6" />
      <circle cx="65" cy="26" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoDistanceLine({ size = 80, color = '#00695C', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="15" x2="5" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="15" x2="75" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="45" cy="20" r="4" fill={color} opacity="0.6" />
      <path d="M15 10 Q20 5 25 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <text x="45" y="12" fill={color} fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.8">100,000 AU</text>
    </svg>
  );
}

function DecoStar({ size = 60, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 5 L33 22 L50 25 L35 32 L40 48 L30 38 L20 48 L25 32 L10 25 L27 22 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.4" />
      <path d="M30 15 L30 45 M15 30 L45 30 M20 20 L40 40 M20 40 L40 20" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'que-es-oort': [DecoOortShell, DecoIcyBody, DecoSolarSystem],'escala-distancia': [DecoDistanceLine, DecoOortShell, DecoStar],
  'origen-formacion': [DecoSolarSystem, DecoIcyBody, DecoOortShell],'cometas-largo-periodo': [DecoIcyBody, DecoStar, DecoDistanceLine],
  'limite-solar-interestelar': [DecoOortShell, DecoSolarSystem, DecoDistanceLine],'perturbaciones-estelares': [DecoStar, DecoOortShell, DecoIcyBody],
  'exploracion-futura': [DecoDistanceLine, DecoSolarSystem, DecoStar],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Oort, J.H. (1950). "The structure of the cloud of comets surrounding the Solar System", Bulletin of the Astronomical Institutes of the Netherlands, 11',
  'Dones, L. et al. (2004). "Oort Cloud Formation and Dynamics", Comets II, University of Arizona Press',
  'Levison, H. et al. (2010). "Capture of the Sun\'s Oort Cloud from the Birth Cluster", Science, 329',
  'Bailer-Jones, C.A.L. (2018). "The completeness-corrected rate of stellar encounters with the Sun", A&A, 609',
  'Stern, S.A. (2003). "The Evolution of Comets in the Oort Cloud and Kuiper Belt", Nature, 424'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-oort',
    title: '¿Qué es la Nube de Oort?',
    color: '#1A237E',
    btnImage: '/assets/interestelar/infographic_m5/btn_que-es-oort.jpg',
    image: '/assets/interestelar/infographic_m5/hero_que-es-oort.jpg',
    content: [
      '¿Qué es exactamente la nube que envuelve nuestro vecindario cósmico? Imagina que el Sol es una bombilla brillante en el centro de una habitación inmensa. A su alrededor giran los planetas, pero mucho más lejos, casi en los límites invisibles de la habitación, hay una esfera gigante hecha de trillones de bolas de hielo sucio. Esa esfera enorme es la Nube de Oort. Fue propuesta en mil novecientos cincuenta por un astrónomo holandés brillante llamado Jan Oort. Él notó que muchos cometas veloces venían de todas las direcciones del cielo, no solo de la línea plana donde orbitan los planetas rocosos. Esto le dio una gran pista científica sobre la forma tridimensional de su origen lejano.',
      'Esta nube funciona como un enorme congelador esférico. Se extiende desde dos mil hasta cien mil veces la distancia entre la Tierra y el Sol. Esa distancia fundamental se llama Unidad Astronómica. Para que te hagas una idea clara, Plutón enano está a solo treinta y nueve unidades astronómicas del Sol. La Nube de Oort está miles de veces más lejos en la oscuridad. Es la región más distante de nuestro sistema solar, y es tan grande que abarca casi una cuarta parte del camino interminable hacia la estrella más cercana. Aunque tiene miles de millones de objetos de hielo, el espacio vacío entre ellos es tan vasto que podrías volar velozmente a través de la nube durante años enteros sin chocar jamás con nada.',
      'La materia antigua que forma esta nube es primordial. Esto significa que está hecha de los restos congelados que sobraron cuando se formaron los planetas pesados hace cuatro mil seiscientos millones de años. Estos bloques de hielo contienen agua sólida, metano, amoníaco y otros compuestos congelados. Es como tener un archivo histórico perfecto que nos guarda los ingredientes originales que formaron nuestro mundo habitable. Al estudiar los cometas brillantes que provienen de allí, los científicos curiosos pueden leer la receta original de nuestro sistema estelar. Es literalmente viajar al pasado usando hielo cósmico que se ha preservado en el frío extremo durante eones infinitos.',
      'Curiosamente, la Nube de Oort nunca ha sido vista directamente a través de ningún telescopio potente. Esto es porque los objetos allí son muy oscuros y pequeños, y están tan lejos que la luz del Sol apenas los ilumina débilmente. ¿Entonces cómo sabemos que existe con seguridad? Los astrónomos observadores son como detectives astutos. Observaron que los cometas de largo período, aquellos cuerpos que tardan miles de años en dar una vuelta completa al Sol, necesitaban venir de un depósito lejano y esférico. La gravedad masiva de las estrellas cercanas y la marea sutil de nuestra galaxia desestabilizan de vez en cuando a estos objetos, empujándolos violentamente hacia el Sol y confirmando así las sospechas teóricas.',
      'El modelo original propuesto por Jan Oort sigue siendo la mejor explicación lógica que tenemos. Aunque se llama nube, no se parece en nada a las nubes de algodón que vemos en el cielo azul de la Tierra. Se divide principalmente en dos regiones distintas: una nube esférica exterior y una nube interior con forma de rosquilla gruesa llamada Nube de Hills. Esta estructura doble ayuda a explicar satisfactoriamente por qué hay tantos tipos diferentes de trayectorias de cometas y cómo el sistema entero sobrevive a las perturbaciones externas durante miles de millones de años de historia estelar. Esta frontera remota actúa como el borde definitivo donde el territorio solar termina y el espacio vacío exterior comienza realmente.'
    ],
    expandables: [
      { label: 'El Astrónomo Jan Oort', icon: 'atom', text: 'Jan Oort fue uno de los astrónomos más brillantes y famosos del siglo veinte. Además de proponer la Nube de Oort, calculó meticulosamente la distancia desde el Sol hasta el centro galáctico masivo y demostró fehacientemente que la Vía Láctea completa está rotando. Sus estudios fundamentales sobre la estructura galáctica establecieron bases sólidas. En su época, deducir la existencia oculta de una nube invisible inmensa analizando únicamente las órbitas de los cometas de largo período fue un salto intelectual extraordinario.' },
      { label: 'Forma Tridimensional Real', icon: 'zap', text: 'A diferencia del cinturón de Kuiper que es como un disco plano gigante de objetos helados, la Nube de Oort exterior es una esfera completa. Imagina una burbuja enorme que encierra a todo nuestro sistema planetario. Esta geometría esférica ocurre porque los tirones gravitacionales de las estrellas cercanas a lo largo de eones han alterado las órbitas originales planas, dispersando los objetos helados en todas las direcciones tridimensionales posibles, arriba y abajo del plano eclíptico.' }
    ],
    fact: 'Se calcula meticulosamente que la Nube de Oort exterior contiene al menos varios billones (millones de millones) de objetos helados que superan el kilómetro entero de diámetro. A pesar de este número asombroso e inimaginable, su masa total combinada se estima que es apenas de cinco a cien veces la masa total de nuestra Tierra. Están hechos principalmente de hielo ligero y polvo poroso, ocupando un volumen espacial inmenso y vacío.',
  },
  {
    id: 'escala-distancia',
    title: 'La Escala Inmensa',
    color: '#B3E5FC',
    btnImage: '/assets/interestelar/infographic_m5/btn_escala-distancia.jpg',
    image: '/assets/interestelar/infographic_m5/hero_escala-distancia.jpg',
    content: [
      'Para comprender el tamaño inmenso de la Nube de Oort, tenemos que usar la luz veloz como nuestra cinta métrica cósmica. La luz viaja a trescientos mil kilómetros por segundo, lo suficientemente rápido como para dar siete vueltas completas a la Tierra en un abrir y cerrar de ojos. La luz del Sol tarda solo ocho minutos en llegar a la Tierra azul, pero tarda casi dos años enteros en alcanzar el borde exterior de la Nube de Oort. ¡Imagina encender una linterna potente y que el haz de luz tarde casi dos años en tocar la pared distante de la habitación! Esa es la verdadera escala monumental de nuestro rincón oscuro en el universo expansivo.',
      'Si redujéramos artificialmente todo el Sol enorme al tamaño de una pelota de baloncesto, las cosas cotidianas se verían muy extrañas y vacías. La Tierra entera sería del tamaño diminuto de una semilla de manzana situada a unos treinta metros de la pelota central. Plutón lejano estaría a un kilómetro de distancia caminando. ¿Y dónde empezaría la Nube de Oort en este modelo reducido mentalmente? Su borde interior invisible estaría a unos noventa y tres kilómetros de distancia asombrosa, y su borde exterior lejano llegaría casi a tres mil kilómetros impresionantes. ¡Es como si el Sol brillante estuviera en Madrid y la nube helada llegara hasta Rusia! Esto nos muestra dramáticamente que la mayor parte del sistema solar es solo espacio vacío.',
      'Hablemos concretamente de nuestras naves espaciales humanas audaces. La sonda robótica Voyager 1 es la nave más rápida y lejana que hemos construido jamás. Viaja a sesenta y un mil kilómetros por hora vertiginosa y ya ha superado a todos los planetas conocidos. A pesar de esa velocidad increíble constante, a la Voyager 1 le tomará aproximadamente trescientos largos años tan solo alcanzar el borde interior de la Nube de Oort. Y no solo eso decepcionante, tardará unos treinta mil años más en cruzarla por completo y salir por el otro lado oscuro. Esto subraya enfáticamente que viajar por el espacio profundo interestelar requiere escalas de tiempo inmensas que superan la historia entera de la civilización humana frágil.',
      'Las distancias incalculables involucradas son tan enormes y vastas que la gravedad del Sol se vuelve muy débil en las zonas exteriores remotas. A cien mil unidades astronómicas asombrosas, el agarre gravitacional sutil del Sol compite directamente con la influencia de las estrellas vecinas masivas e incluso con el tirón gravitatorio combinado de toda la Vía Láctea. Es una zona espacial de equilibrio delicado y frágil. Los objetos helados que están allí apenas sienten la presencia cálida de nuestra estrella, orbitando con una lentitud majestuosa que parece congelada eternamente en el tiempo astronómico. Cada órbita silenciosa alrededor del Sol puede durar millones de años terrestres incontables, haciendo que un solo año allí dure eones aquí.',
      'Los astrónomos modernos usan estas escalas gigantes intimidantes para entender profundamente cómo se relacionan los sistemas estelares vecinos. La Nube de Oort es tan grande y expansiva que su borde exterior extremo toca casi las nubes hipotéticas de las estrellas más cercanas como el sistema Alfa Centauri. Esto significa directamente que las estrellas brillantes en nuestra galaxia majestuosa podrían estar intercambiando cometas helados constantemente, como vecinos amigables que se pasan azúcar útil por encima de la cerca limítrofe. Cuando miramos el tamaño real desproporcionado, nos damos cuenta humildemente de que nuestro sistema no es una pequeña burbuja aislada, sino una vasta red interconectada que se extiende profundamente en el espacio interestelar inmenso.'
    ],
    expandables: [
      { label: 'Unidad Astronómica (UA)', icon: 'clock', text: 'La Unidad Astronómica es la regla de medir indispensable para nuestro sistema solar. Equivale a la distancia media exacta entre la Tierra y el Sol: ciento cuarenta y nueve millones y medio de kilómetros. Cuando decimos que la Nube de Oort se extiende cien mil unidades astronómicas, estamos diciendo que su borde lejano está cien mil veces más lejos del Sol de lo que está nuestro propio mundo azul. Es una distancia colosal casi inabarcable para la mente humana finita.' },
      { label: 'Esfera de Hill', icon: 'zap', text: 'La frontera invisible donde la Nube de Oort exterior termina marca el borde preciso de la esfera de Hill del Sol. Esta esfera gravitacional define el volumen espacial exacto dentro del cual la gravedad solar domina sobre la atracción de la galaxia completa y de las estrellas vecinas circundantes. Si un cometa se aleja más allá de ese límite gravitatorio, el Sol perderá su control magnético sobre él y vagará libremente por el espacio interestelar profundo para siempre.' }
    ],
    fact: 'El borde exterior más lejano de la Nube de Oort se ubica asombrosamente a un tercio del camino total hacia Próxima Centauri, la estrella rojiza más cercana al Sol. Las distancias cósmicas son tan ridículamente inmensas que las nubes de Oort de las estrellas cercanas podrían estar literalmente superpuestas e interactuando sutilmente en este preciso momento de la historia universal, compartiendo material helado antiguo.',
  },
  {
    id: 'origen-formacion',
    title: 'El Origen Turbulento',
    color: '#CFD8DC',
    btnImage: '/assets/interestelar/infographic_m5/btn_origen-formacion.jpg',
    image: '/assets/interestelar/infographic_m5/hero_origen-formacion.jpg',
    content: [
      '¿Cómo se formó esta estructura esférica inmensa en las afueras frías de nuestro sistema? Para responder a eso, tenemos que retroceder mentalmente cuatro mil seiscientos millones de años turbulentos en el pasado distante. En ese entonces primigenio, el joven sistema solar era un disco plano lleno de polvo y gas arremolinado. Los planetas rocosos y gaseosos se estaban formando rápidamente chocando pedazos de materia. Sobraron muchos escombros helados, especialmente cerca de los planetas gigantes recién nacidos como Júpiter colosal y Saturno anillado. Estos planetesimales sobrantes eran como los ladrillos congelados que no se usaron para construir los planetas masivos.',
      'Júpiter y Saturno son pesados y masivos. Su gravedad combinada es tan fuerte e influyente que actuaron como inmensas catapultas celestiales. Cuando los pequeños objetos de hielo antiguos pasaban demasiado cerca de estos planetas colosales, la gravedad planetaria intensa no los atrapaba, sino que los aceleraba violentamente y los arrojaba lejos con una fuerza inmensa. Imagina un tiovivo giratorio que da vueltas muy rápido: si tiras una pelota de tenis sobre él, saldrá disparada hacia afuera con tremenda velocidad. Así, millones y millones de cuerpos helados fueron expulsados dramáticamente de sus órbitas originales cercanas al Sol hacia los rincones más lejanos del espacio oscuro.',
      'Pero si fueron arrojados tan violentamente, ¿por qué no escaparon del Sol brillante hacia el espacio interestelar vacío? Aquí es donde el modelo Niza moderno, propuesto por astrofísicos brillantes, ofrece una explicación elegante. Mientras estos objetos volaban velozmente hacia afuera, nuestro Sol no estaba solo en el espacio infinito. Nació presumiblemente en un cúmulo estelar denso junto con cientos de otras estrellas hermanas. La gravedad colectiva de las estrellas vecinas cercanas, junto con el tirón marea constante de la Vía Láctea inmensa, frenó sutilmente a estos objetos expulsados. Sus órbitas rectas se curvaron, formando gradualmente la gran esfera equilibrada que vemos hoy en teoría.',
      'Este proceso largo tomó cientos de millones de años caóticos en completarse enteramente. Durante ese período violento, muchos objetos de hielo frágiles chocaron, se rompieron o fueron eyectados para siempre al abismo oscuro del vacío. Se estima matemáticamente que solo una pequeña fracción del material original sobrevivió a este bombardeo gravitacional para formar la Nube de Oort actual. Los que se quedaron lograron encontrar un equilibrio delicado en las profundidades frías, donde la fuerza repulsiva de los gigantes gaseosos y el tirón gravitacional del Sol se igualaron con las influencias estelares exteriores estabilizadoras. Fue un juego de billar cósmico a gran escala.',
      'Recientes descubrimientos científicos sugieren que nuestro Sol podría incluso haber robado astutamente cometas de otras estrellas cercanas durante este período de cúmulo denso inicial. Algunos modelos computacionales avanzados del doctor Hal Levison y sus colegas proponen audazmente que un porcentaje significativo de la Nube de Oort podría tener origen extraterrestre verdadero, proveniente de los discos polvorientos de otras estrellas compañeras jóvenes. Si esto es cierto asombrosamente, estudiar los cometas de Oort es una forma directa y fascinante de probar material de sistemas estelares alienígenas sin tener que salir de nuestro propio patio trasero celestial y gigantesco.'
    ],
    expandables: [
      { label: 'El Modelo Niza', icon: 'atom', text: 'El modelo Niza, nombrado así por la ciudad francesa costera donde se desarrolló conceptualmente en 2005, propone audazmente que los planetas gigantes del sistema solar joven migraron de sus posiciones originales cercanas. Esta migración planetaria violenta y dramática causó inestabilidades orbitales masivas, dispersando los objetos helados pequeños hacia el cinturón de Kuiper y la distante Nube de Oort exterior, explicando la arquitectura actual que observamos hoy.' },
      { label: 'Captura Estelar', icon: 'zap', text: 'La hipótesis intrigante de que el Sol robó cometas es fascinante. En su cúmulo natal abarrotado, las estrellas jóvenes pasaban muy cerca unas de otras frecuentemente. Durante estos encuentros cercanos caóticos, la gravedad solar poderosa podría haber arrancado cometas de la periferia débil de estrellas hermanas, incorporándolos permanentemente a nuestra propia Nube de Oort emergente, enriqueciendo nuestra diversidad química.' }
    ],
    fact: 'Si la Tierra entera se redujera al tamaño de un grano de sal marina, y la distancia desde el Sol al borde lejano de la Nube de Oort se dibujara a esa misma escala exacta, la nube helada se extendería asombrosamente por más de treinta y dos kilómetros de distancia. Esta metáfora poderosa revela la vastedad incomprensible y el tamaño abrumador del espacio dominado por la gravedad de nuestro Sol.',
  },
  {
    id: 'cometas-largo-periodo',
    title: 'Cometas de Largo Período',
    color: '#6A1B9A',
    btnImage: '/assets/interestelar/infographic_m5/btn_cometas-largo-periodo.jpg',
    image: '/assets/interestelar/infographic_m5/hero_cometas-largo-periodo.jpg',
    content: [
      'La Nube de Oort exterior es la cuna fría de los cometas de largo período espectaculares. Estos cometas viajan en órbitas elípticas muy estiradas y alargadas. A diferencia del cometa Halley famoso, que visita la Tierra cada setenta y seis años (y probablemente vino originalmente de la nube antes de ser atrapado), un cometa de largo período verdadero tarda miles o incluso millones de años en completar un solo viaje majestuoso alrededor del Sol ardiente. El cometa Hale-Bopp resplandeciente, que deslumbró a la humanidad en mil novecientos noventa y siete, tardará más de dos mil años en regresar a nuestro cielo nocturno estrellado. Vienen de las fronteras más remotas inimaginables.',
      '¿Qué empuja exactamente a uno de estos bloques de hielo tranquilos a emprender un viaje épico hacia el Sol central? Imagina la Nube de Oort gigantesca como un montón de manzanas colgando débilmente de un manzano cósmico. Las manzanas heladas apenas se sostienen de la gravedad solar débil. Si una estrella masiva o una nube molecular gigante pasa moderadamente cerca de nuestro sistema estelar, su gravedad fuerte crea una vibración sutil, como agitar la rama del árbol espacial. Esta pequeña perturbación gravitacional es suficiente para cambiar la órbita lenta del cometa, haciendo que caiga precipitadamente en picada hacia el interior del sistema solar.',
      'El viaje largo hacia el centro ardiente es solitario, oscuro y muy silencioso al principio. El cometa helado se mueve lentamente en la oscuridad profunda durante milenios interminables. Pero a medida que se acerca al Sol, la gravedad fuerte lo acelera a velocidades asombrosas vertiginosas. Cuando cruza la órbita helada de Júpiter, el calor solar comienza a derretir espectacularmente su superficie congelada. El agua sólida, el monóxido de carbono y otros hielos se subliman directamente en gas expansivo, creando una atmósfera brillante enorme llamada coma y dos colas majestuosas (una de polvo y otra de iones) que pueden medir millones de kilómetros de longitud asombrosa.',
      'Estos visitantes prístinos son cápsulas del tiempo perfectas y herméticas. Han estado en congelación profunda inalterada desde el nacimiento turbulento de nuestro sistema solar antiguo. Cuando un cometa de largo período hermoso cruza el cielo terrestre brillante, nos está mostrando material virginal que no ha cambiado durante cuatro mil seiscientos millones de años largos. Analizar la luz espectral que atraviesa su coma brillante permite a los científicos descubrir de qué estaba hecha la nebulosa original que nos dio vida. Es una oportunidad de oro excepcional para investigar nuestros propios orígenes sin tener que enviar una nave espacial lejana, ¡el cometa hace el largo viaje por nosotros!',
      'Desafortunadamente o afortunadamente, estos cometas también representan un peligro hipotético y real. Como caen desde cualquier dirección imaginable, a menudo casi perpendiculares al plano planetario, son muy difíciles de detectar tempranamente. A diferencia de los asteroides rocosos del cinturón principal que orbitan en el mismo plano plano que la Tierra, un cometa oortiano podría aparecer repentinamente en nuestros telescopios potentes y golpearnos con muy poca advertencia previa. La energía destructiva del impacto sería devastadora debido a su alta velocidad de llegada inmensa. Por eso, los astrónomos vigilantes mantienen programas de búsqueda exhaustivos para detectar posibles intrusos veloces.'
    ],
    expandables: [
      { label: 'El Cometa Hale-Bopp', icon: 'atom', text: 'El cometa Hale-Bopp espectacular, descubierto independientemente en 1995, es uno de los cometas de largo período más ampliamente observados en toda la historia de la humanidad civilizada. Su núcleo masivo tenía unos asombrosos cuarenta kilómetros de diámetro entero, lo cual es inusualmente grande. Su brillo radiante en el cielo oscuro nocturno fue visible a simple vista inexperta durante un récord inigualable de dieciocho meses continuos enteros.' },
      { label: 'Dos Colas Distintas', icon: 'zap', text: 'Los cometas de Oort desarrollan magníficamente dos colas prominentes cuando se acercan al Sol caliente. La cola de polvo brillante está formada por partículas rocosas y siempre se curva hacia atrás a lo largo de la órbita curva. La segunda cola recta, formada por gas ionizado brillante y azulado, apunta perfectamente en dirección opuesta al Sol debido a la presión intensa del viento solar incesante que choca fuertemente contra ella.' }
    ],
    fact: 'El cometa C/2014 UN271 brillante, descubierto por los astrónomos Pedro Bernardinelli y Gary Bernstein astutos, es un objeto gigantesco proveniente de la Nube de Oort distante. Su núcleo masivo mide más de ciento treinta kilómetros de ancho excepcional. Nunca se acercará peligrosamente a la Tierra; su aproximación más cercana futura en el año 2031 lo dejará a una distancia segura más allá de la órbita de Saturno anillado.',
  },
  {
    id: 'limite-solar-interestelar',
    title: 'El Límite Interestelar',
    color: '#00695C',
    btnImage: '/assets/interestelar/infographic_m5/btn_limite-solar-interestelar.jpg',
    image: '/assets/interestelar/infographic_m5/hero_limite-solar-interestelar.jpg',
    content: [
      '¿Dónde termina verdaderamente nuestro hogar espacial y dónde empieza el misterioso espacio interestelar infinito? Responder a esto depende de cómo definas la "frontera" invisible. Mucha gente cree equivocadamente que el sistema solar termina justo después de Plutón o en la heliopausa expansiva (donde el viento solar choca violentamente con el medio interestelar), pero gravitacionalmente hablando, eso es solo el vecindario interior cercano. La Nube de Oort extensa es la última región remota donde la gravedad de nuestro Sol tiene la última palabra dominante, marcando el límite absoluto y real del imperio solar vasto.',
      'Esta frontera gravitacional extrema se llama la Esfera de Hill teórica. Imagina que el Sol tiene una cuerda gravitacional muy larga atada a todos los cometas de hielo esféricos. Mientras un cometa esté dentro de esta esfera enorme protectora, el Sol puede retenerlo y hacerlo orbitar constantemente. Pero a unas cien mil o doscientas mil unidades astronómicas lejanas, esa cuerda invisible imaginaria se vuelve demasiado débil y frágil. En ese límite extremo asombroso, la gravedad combinada enorme de toda la galaxia masiva y el tirón de las estrellas cercanas arranca el cometa definitivamente. Cruza la línea y ya eres formalmente un objeto interestelar libre.',
      'Es fascinante y poético pensar en cómo debe ser el entorno solitario en este límite lejano. Si pudieras pararte sobre un bloque de hielo oscuro en el borde exterior extremo de la Nube de Oort, el Sol abrasador ya no se vería como un disco brillante ardiente que da calor. Sería simplemente otra estrella reluciente en el cielo negro azabache, quizás solo un poco más brillante que Venus brillante en el firmamento terrestre. Todo el sistema planetario bullicioso, la Tierra azul, Júpiter gigante y los anillos de Saturno hermosos, estarían fusionados en ese único punto luminoso insignificante. El frío paralizante allí está a solo unos grados por encima del cero absoluto definitivo.',
      'Este límite borroso no es una pared sólida dura, sino una región difusa e interactiva permeable. Los cometas entran y salen silenciosamente a lo largo de millones de años interminables. Los objetos helados en el borde son vulnerables e inestables constantemente. Las nubes de gas gigante galácticas llamadas "nubes moleculares densas" que navegan majestuosamente por la Vía Láctea pueden empujar la marea gravitacional fuertemente, haciendo que los cometas caigan o escapen libres. Esto significa inequívocamente que la arquitectura de nuestra Nube de Oort exterior no es fija ni estática, sino que respira y cambia lentamente con la danza majestuosa de nuestra galaxia inmensa en rotación.',
      'Esta transición profunda entre la esfera solar íntima y el abismo interestelar vacío subraya nuestro verdadero lugar microscópico en el universo expansivo. Entender este límite exterior asombroso es crucial para la astrofísica moderna avanzada porque nos enseña cómo los sistemas solares pierden su material helado primordial y cómo el medio interestelar se enriquece químicamente. Los pedazos de hielo errantes que abandonan nuestra Nube de Oort lejana hoy, se convertirán eventualmente en los visitantes interestelares alienígenas de los sistemas planetarios de otras estrellas distantes, llevando el agua cristalina de nuestro origen primordial hacia destinos insondables desconocidos.'
    ],
    expandables: [
      { label: 'Heliopausa vs Oort', icon: 'zap', text: 'Es muy importante entender cabalmente la diferencia espacial. La heliopausa magnética es la frontera donde el viento de plasma del Sol choca y se detiene frente a la radiación cósmica galáctica, a unas ciento veinte unidades astronómicas cercanas. La sonda Voyager 1 valiente cruzó la heliopausa ruidosa en 2012, entrando al medio interestelar gasificado. Sin embargo, Voyager no dejará atrás verdaderamente el campo gravitacional del Sol hasta que cruce la Nube de Oort inmensa dentro de unos treinta mil años.' },
      { label: 'El Cero Absoluto', icon: 'atom', text: 'La temperatura letal típica en las profundidades lúgubres de la Nube de Oort exterior oscila implacablemente entre tres y diez grados Kelvin (aproximadamente menos doscientos sesenta y cinco grados Celsius bajo cero). En este frío tan profundo y penetrante, gases comunes como el metano apestoso y el monóxido de carbono tóxico se congelan convirtiéndose en hielos duros como rocas de diamante negro, preservando química inalterada primordial.' }
    ],
    fact: 'El concepto de la marea galáctica sutil es muy parecido a cómo la Luna cercana causa mareas regulares en nuestros océanos terrestres profundos. La masa combinada enorme de todas las estrellas billonarias y el gas interestelar abundante en el disco de la Vía Láctea inmensa ejerce una fuerza gravitacional diferencial continua y expansiva que aplasta y moldea la forma de la Nube de Oort lejana.',
  },
  {
    id: 'perturbaciones-estelares',
    title: 'Estrellas Errantes Peligrosas',
    color: '#FF8F00',
    btnImage: '/assets/interestelar/infographic_m5/btn_perturbaciones-estelares.jpg',
    image: '/assets/interestelar/infographic_m5/hero_perturbaciones-estelares.jpg',
    content: [
      '¿Sabías que las estrellas masivas no se quedan quietas en el espacio negro, sino que vagan constantemente como barcos gigantes en un océano inmenso e infinito? A lo largo de su viaje majestuoso de millones de años lentos alrededor del centro galáctico denso, nuestro Sol brillante se cruza cercanamente con otras estrellas nómadas. Cuando una estrella intrusa pasa cerca de nuestra frontera extrema lejana, su gravedad masiva causa estragos enormes. Imagina caminar torpemente por una habitación llena de globos de agua colgantes atados por hilos invisibles débiles; tu paso brusco hará que todos se muevan salvajemente y algunos caigan precipitadamente al suelo duro.',
      'Uno de los encuentros estelares más famosos y estudiados es el de la estrella de Scholz misteriosa. Hace apenas setenta mil años pasados cortos (un parpadeo en el tiempo cósmico, cuando los humanos antiguos caminaban por África prehistórica y los neandertales robustos habitaban Europa), esta enana roja tenue pasó rozando casi a través de los límites exteriores de la Nube de Oort inmensa. Llegó a estar a menos de un año luz de cercanía alarmante de nuestro Sol central. Aunque no causó una catástrofe inmediata visible, su tirón gravitacional sutil perturbó a muchos cometas helados, alterando sus órbitas frágiles permanentemente.',
      'Pero el evento futuro más dramático predecido será protagonizado en solitario por una estrella llamada Gliese 710 masiva. Según los datos precisos excepcionales del satélite Gaia avanzado, esta enana naranja masiva se dirige casi directamente hacia nuestro sistema estelar pacífico. En aproximadamente un millón trescientos mil años largos en el futuro, Gliese 710 cruzará brutalmente a través de las entrañas más profundas ricas de nuestra Nube de Oort interior y la poblada Nube de Hills. Pasará tan cerca que su perturbación gravitacional inmensa desatará una lluvia espectacular y colosal de cometas hacia los planetas interiores rocosos.',
      'Durante el encuentro cercano épico con Gliese 710 gigante, los científicos astronómicos calculan rigurosamente que miles de cometas brillantes de largo período serán lanzados simultáneamente hacia nuestro rincón interior habitado cálido. Los cielos nocturnos de la Tierra distante podrían llenarse visualmente de múltiples cometas hermosos al mismo tiempo brillante, creando un espectáculo visual inigualable e impresionante continuo, pero también aumentando exponencialmente el riesgo trágico de impactos catastróficos peligrosos contra nuestro planeta frágil. Afortunadamente, esto no sucederá sino hasta dentro de un millón de años largos por venir.',
      'Estos encuentros estelares constantes demuestran enfáticamente que el sistema solar entero no es un reloj aislado e invariable, sino parte de una ecología galáctica vasta interactiva vibrante. Las estrellas cercanas compañeras, las nubes moleculares inmensas y el polvo cósmico oscuro interactúan e intercambian material vital frecuentemente con nuestro depósito de hielo ancestral externo. La Nube de Oort es la interfaz permeable activa que nos conecta dinámicamente con el resto de la Vía Láctea inmensa, siendo moldeada y reformada perpetuamente por los encuentros casuales y azarosos en las profundidades del espacio profundo infinito.'
    ],
    expandables: [
      { label: 'La Estrella Gliese 710', icon: 'atom', text: 'Gliese 710 es una estrella del tipo espectral enana naranja masiva, con aproximadamente la mitad exacta del peso del Sol ardiente. Actualmente se encuentra inofensivamente a unos sesenta y dos años luz de distancia inmensa. Cuando llegue a su máxima aproximación crítica en un millón trescientos mil años venideros, podría brillar intensamente en nuestros cielos oscuros más que cualquier estrella actual visible, rivalizando seriamente con Júpiter radiante en brillo planetario.' },
      { label: 'La Estrella de Scholz', icon: 'zap', text: 'Descubierta en el año 2013 reciente por el astrónomo brillante Ralf-Dieter Scholz, es un sistema binario peculiar compuesto por una enana roja muy pequeña y una enana marrón muy tenue. Cuando atravesó astutamente nuestra Nube de Oort en el pasado humano prehistórico remoto, estaba demasiado oscura y débil para ser vista a simple vista por nuestros antepasados primitivos, a menos que sufriera una fulguración magnética intensa y repentina momentánea.' }
    ],
    fact: 'El satélite Gaia asombroso de la Agencia Espacial Europea ha rastreado con precisión increíble el movimiento exacto de millones de estrellas vecinas y masivas. Sus datos revelan que aproximadamente una docena entera de estrellas vagabundas han pasado a menos de unos pocos años luz de cortedad de nuestro Sol durante el último millón de años transcurridos, agitando continuamente los cometas remotos.',
  },
  {
    id: 'exploracion-futura',
    title: 'El Futuro de la Exploración',
    color: '#ECEFF1',
    btnImage: '/assets/interestelar/infographic_m5/btn_exploracion-futura.jpg',
    image: '/assets/interestelar/infographic_m5/hero_exploracion-futura.jpg',
    content: [
      'Hasta el día de hoy moderno, ninguna nave espacial robótica humana construida jamás ha alcanzado la misteriosa Nube de Oort inmensa. Y hay una buena y frustrante razón científica para esto: está terriblemente y ridículamente lejos en la oscuridad abismal. La sonda New Horizons valiente, que voló velozmente más allá de Plutón enano en 2015 a velocidades récords inigualables, tardará varios siglos dolorosamente largos tan solo en rasguñar el borde interior más cercano imaginario. Con nuestra actual y limitada tecnología de propulsión química tradicional ruidosa, un viaje dedicado exclusivo hacia ese lugar insondable es prácticamente y imposible en el tiempo de vida de un investigador.',
      'Pero los ingenieros espaciales visionarios y audaces nunca se rinden fácilmente ante un desafío notable y enorme. Para explorar este congelador primordial antiguo y valioso, necesitamos sistemas de propulsión radicalmente nuevos revolucionarios y diferentes. Las velas solares delgadas y brillantes, que usan el empuje suave pero constante de los fotones solares para acelerar en el vacío, podrían alcanzar velocidades increíbles asombrosas a largo plazo, reduciendo el viaje tedioso de milenios enteros a tal vez un siglo de espera. Los cohetes de propulsión nuclear térmica innovadores o iónicos potentes, que son mucho más eficientes energéticamente y poderosos que quemar combustible líquido químico, podrían acercar el viaje a márgenes humanos realistas.',
      'Una de las misiones teóricas más alucinantes fascinantes propuestas por los científicos soñadores es aprovechar directamente la asombrosa "Lente Gravitacional Solar" masiva. La teoría de la relatividad comprobada de Einstein nos dice que la masa inmensa de nuestro Sol deforma fuertemente el espacio, doblando y enfocando la luz brillante de objetos distantes de fondo exactamente como una lupa óptica gigantesca. El punto focal preciso de esta lente solar natural asombrosa se encuentra a quinientas cincuenta y unidades astronómicas lejanas, lo que está justo en la frontera limítrofe de la Nube de Hills interior difusa.',
      'Si logramos enviar audazmente un telescopio avanzado especializado hasta esa distancia exacta focal, a más de cincuenta mil millones de kilómetros lejanos del centro, podríamos usar nuestro propio Sol masivo como el lente primario gigantesco natural de un telescopio inmenso e inimaginable. Esto nos permitiría observar nítidamente la superficie detallada de los exoplanetas habitables distantes con resoluciones altísimas sin precedentes e investigar directamente las profundidades más oscuras insondables de la misma Nube de Oort antigua inexplorada, matando literalmente dos pájaros majestuosos de un solo y magistral tiro cósmico brillante.',
      'Hasta que esas naves espaciales futuristas increíbles se conviertan finalmente en una realidad tangible innegable, nuestra mejor y única ventana transparente para estudiar la Nube de Oort distante continuará siendo la cuidadosa observación espectroscópica detallada de los cometas prístinos helados que caen desde el cielo lejano hacia nosotros. Cada nuevo cometa veloz que es empujado gentilmente hacia el interior ardiente de nuestro vecindario planetario cálido es como un mensajero helado y silencioso antiguo trayendo secretos químicos primordiales y valiosos desde el confín más oscuro remoto de nuestro vasto y hermoso imperio estelar solar.'
    ],
    expandables: [
      { label: 'Propulsión Nuclear', icon: 'zap', text: 'La propulsión nuclear térmica audaz, en la que un reactor de fisión potente se usa para calentar directamente un gas expansivo ligero (como hidrógeno puro) e impulsarlo explosivamente por una boquilla de cohete brillante, podría teóricamente y prácticamente duplicar fácilmente la eficiencia de empuje y acortar masivamente drásticamente los tiempos de vuelo interplanetario interestelar hacia los rincones más profundos y lejanos del espacio oscuro.' },
      { label: 'Proyecto Breakthrough Starshot', icon: 'atom', text: 'Iniciativas futuristas privadas brillantes y atrevidas como el increíble proyecto Breakthrough Starshot proponen inteligentemente usar lásers de potencia gigavatio basados en tierra firme firme para impulsar microscópicas naves espaciales diminutas acopladas a velas ligeras reflectantes delgadas, acelerándolas a un veinte por ciento alucinante asombroso de la velocidad de la luz inalcanzable. A esa velocidad, cruzarían rápidamente la Nube de Oort lejana entera en pocos años.' }
    ],
    fact: 'El concepto espectacular de la lente gravitacional solar natural masiva no es pura y fantasiosa ciencia ficción entretenida. La NASA seria y metódica y el Laboratorio de Propulsión a Chorro prestigioso están estudiando matemáticamente y activamente conceptos técnicos de misiones y arquitectura de sondas ligeras enjambradas para llevar telescopios avanzados de vanguardia a 550 UA para visualizar de cerca otros mundos alienígenas.',
  },
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;
    
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    // Inicializar tamaño y event listener
    resize();
    window.addEventListener('resize', resize);
    
    const w = canvas.width, h = canvas.height;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '179,229,252' : '26,35,126', // Ice blue and deep blue
    }));
    
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08; // slow upward drift
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
    
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%' }} />;
}

// â”€â”€â”€ Oort Cloud Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function OortCloudHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(179,229,252,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#1A237E','#B3E5FC','#CFD8DC','#6A1B9A','#00695C','#FF8F00','#ECEFF1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#B3E5FC" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="4" fill="#B3E5FC" opacity="0.5" />
        <path d="M 300 16 L 300 44 M 286 30 L 314 30" stroke="#B3E5FC" strokeWidth="1" opacity="0.6" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(179,229,252,0.2)" />
            <stop offset="50%" stopColor="rgba(179,229,252,0.9)" />
            <stop offset="100%" stopColor="rgba(179,229,252,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B3E5FC" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA NUBE DE OORT</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(179,229,252,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA FRONTERA DEL SISTEMA SOLAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(179,229,252,0.2)'}`,
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
          layoutId="activeDotOort"
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px dashed rgba(255,255,255,0.1)',
            position: 'relative',
            zIndex: 2,
          }}>
            <h4 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fact Highlight â”€â”€â”€ */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(90deg, ${node.color}20, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            padding: '1.2rem',
            borderRadius: '0 12px 12px 0',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 2,
          }}>
            <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: node.color, fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Fascinante
              </strong>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredNodes, color = '#B3E5FC' }) {
  const progress = (exploredNodes.size / nodes.length) * 100;
  return (
    <div style={{ margin: '2rem auto 0', maxWidth: '300px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '1px' }}>
        <span>PROGRESO DE MISIÃ“N</span>
        <span>{exploredNodes.size} / {nodes.length} NUBES EXPLORADAS</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM5() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const handleNodeClick = (node) => {
    if (activeNode?.id === node.id) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
      setExploredNodes(prev => new Set([...prev, node.id]));
      setTimeout(() => {
        if (containerRef.current) {
          const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#0B0E14',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <OortCloudHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '2rem',
          position: 'relative',
          zIndex: 10,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode?.id === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        {/* Active Content Panel */}
        <div ref={containerRef}>
          <AnimatePresence mode="wait">
            {activeNode && (
              <ContentPanel
                key={activeNode.id}
                node={activeNode}
                onClose={() => setActiveNode(null)}
                setLightboxSrc={setLightboxSrc}
              />
            )}
          </AnimatePresence>
        </div>

        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredNodes={exploredNodes} />

        {/* Bibliography Section */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h5 style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes Científicas
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', maxWidth: '600px', lineHeight: 1.4 }}>
                {bib}
              </p>
            ))}
          </div>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista Ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
