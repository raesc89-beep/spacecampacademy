'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya / Cosmic themed) ─────────────────────────

function DecoCeibaTree({ size = 70, color = '#1B5E20', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M28 30 L28 45 L20 55 L30 48 L32 48 L40 55 L32 45 L32 30 Z" fill={color} opacity="0.7"/>
      <path d="M15 25 Q30 5 45 25 Q30 35 15 25 Z" fill={color} opacity="0.4"/>
      <path d="M10 20 Q30 0 50 20 Q30 30 10 20 Z" fill={color} opacity="0.3"/>
      <line x1="30" y1="30" x2="30" y2="48" stroke={color} strokeWidth="4" />
    </svg>
  );
}

function DecoMilkyWay({ size = 70, color = '#CFD8DC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.3, ...style }}>
      <path d="M5 55 Q30 30 55 5" fill="none" stroke={color} strokeWidth="4" strokeDasharray="6 4" strokeLinecap="round" opacity="0.6"/>
      <path d="M15 55 Q35 35 55 15" fill="none" stroke={color} strokeWidth="2" strokeDasharray="3 3" opacity="0.4"/>
      <circle cx="20" cy="20" r="2" fill={color}/>
      <circle cx="40" cy="40" r="1.5" fill={color}/>
      <circle cx="45" cy="25" r="2.5" fill={color}/>
      <circle cx="15" cy="35" r="1" fill={color}/>
      <path d="M45 25 L45 20 M45 25 L50 25 M45 25 L45 30 M45 25 L40 25" stroke={color} strokeWidth="1"/>
    </svg>
  );
}

function DecoCrocodile({ size = 70, color = '#4E342E', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 40" style={{ opacity: 0.25, ...style }}>
      <path d="M10 25 Q25 15 40 25 Q55 35 70 25" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <path d="M20 20 L25 15 L30 22 L35 15 L40 22 L45 15 L50 22 L55 15 L60 20" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="23" r="1.5" fill="#fff"/>
      <circle cx="68" cy="23" r="1.5" fill="#fff"/>
      <path d="M5 25 L10 25" stroke={color} strokeWidth="2"/>
      <path d="M70 25 L75 25" stroke={color} strokeWidth="2"/>
    </svg>
  );
}

function DecoCanoe({ size = 70, color = '#0277BD', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.25, ...style }}>
      <path d="M10 20 Q40 40 70 20 L65 20 Q40 35 15 20 Z" fill={color}/>
      <line x1="20" y1="25" x2="15" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="25" x2="65" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="25" r="3" fill={color} opacity="0.6"/>
      <path d="M35 25 Q40 20 45 25" fill="none" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

function DecoThreeLevels({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,10 50,20 30,30 10,20" fill={color} opacity="0.3"/>
      <polygon points="30,25 50,35 30,45 10,35" fill={color} opacity="0.5"/>
      <polygon points="30,40 50,50 30,60 10,50" fill={color} opacity="0.7"/>
      <line x1="30" y1="10" x2="30" y2="60" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
    </svg>
  );
}

const DECO_MAP = {
  'wakah-chan-arbol': [DecoCeibaTree, DecoMilkyWay, DecoThreeLevels],
  'via-lactea-maya': [DecoMilkyWay, DecoCrocodile, DecoCanoe],
  'canoa-cosmica': [DecoCanoe, DecoMilkyWay, DecoCrocodile],
  'ceiba-sagrada': [DecoCeibaTree, DecoThreeLevels, DecoMilkyWay],
  'tres-niveles': [DecoThreeLevels, DecoCeibaTree, DecoMilkyWay],
  'orientacion-nocturna': [DecoMilkyWay, DecoCeibaTree, DecoCanoe],
  'popol-vuh-cielo': [DecoCrocodile, DecoCanoe, DecoThreeLevels],
};

// ─── Content Data ────────────────────────────────────────────────────────────

const BIBLIOGRAPHY = [
  "Freidel, D., Schele, L. & Parker, J. (1993). Maya Cosmos: Three Thousand Years on the Shaman\'s Path, William Morrow",
  'Christenson, A.J. (2007). Popol Vuh: The Sacred Book of the Maya, University of Oklahoma Press',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Taube, K. (1993). Aztec and Maya Myths, University of Texas Press',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'wakah-chan-arbol',
    title: 'Wakah Chan: El Árbol Cósmico',
    color: '#CFD8DC',
    btnImage: '/assets/maya/infographic_m9/btn_wakah-chan-arbol.jpg',
    image: '/assets/maya/infographic_m9/hero_wakah-chan-arbol.jpg',
    content: [
      'Wakah Chan significa "Cielo Elevado". Es un árbol gigante, pero no uno de madera y hojas. Es un árbol hecho de estrellas brillantes. Imagina que sales al patio en una noche oscura, miras hacia arriba y ves una banda brillante de polvo estelar cruzando el cielo. Nosotros la llamamos Vía Láctea. Para los antiguos mayas, esa banda gigante de estrellas era el Wakah Chan. Era el árbol más grande del universo, plantado justo en el centro del mundo para sostener todo.',
      'Este árbol estelar funciona como una carretera gigante que conecta tres lugares diferentes. Imagina un edificio con tres pisos. El sótano oscuro y húmedo es Xibalbá, el mundo subterráneo donde viven los señores del inframundo. El primer piso es la Tierra, donde vivimos nosotros, cultivamos maíz y construimos ciudades. El segundo piso es el cielo diurno, donde brillan el sol y los planetas. El Wakah Chan es como el ascensor brillante que conecta estos tres niveles.',
      'Las raíces del árbol estelar se hunden en el suelo, bajando hacia las cuevas oscuras de Xibalbá. Su tronco pasa a través de nuestra Tierra, y sus ramas se abren en el cielo superior, tocando las nubes. Esta idea ayudaba a los mayas a entender cómo las cosas del cielo podían afectar a las cosas de abajo, como la lluvia cayendo a la tierra. Todo estaba conectado por este enorme pilar de polvo estelar y luz blanca brillante, como un esqueleto que mantiene todo el universo unido.',
      'Los gobernantes mayas querían ser como este gran árbol cósmico. Cuando un rey se vestía para una ceremonia importante, usaba ropa que lo hacía ver como el Wakah Chan. Se ponía un cinturón ancho que representaba el tronco y plumas verdes en la cabeza que representaban las ramas. El rey creía que, al hacer esto, podía traer energía del cielo a su pueblo, actuando como un puente viviente entre los dioses arriba y los humanos abajo.',
      'Entender el Wakah Chan nos ayuda a ver cómo la ciencia y la imaginación pueden trabajar juntas. Los mayas miraban las mismas estrellas que vemos hoy con nuestros telescopios modernos. Pero en lugar de ver solo rocas espaciales lejanas, veían un mapa brillante que explicaba cómo funcionaba su mundo. Era su forma de explicar algo tan grande y complejo como la galaxia, usando la imagen simple de un árbol que veían crecer en su selva todos los días.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los mayas no construyeron telescopios de cristal como nosotros. Hacían sus observaciones astronómicas usando palos cruzados, líneas visuales en edificios de piedra y mucha paciencia. Registraron el movimiento de las estrellas con tanta precisión matemática que sus mapas celestes siguen siendo exactos hoy. ¡Eran verdaderos científicos del cielo nocturno!' },
      { label: 'Concepto Científico', icon: 'atom', text: 'La Vía Láctea que los mayas llamaron Wakah Chan es en realidad un disco plano y enorme formado por miles de millones de soles. Como vivimos dentro de ese disco estelar, lo vemos de lado. Por eso parece una banda alargada cruzando el cielo, como el tronco de un árbol altísimo de luz brillante sobre nuestras cabezas.' }
    ],
    fact: 'El nombre completo del árbol cósmico en las inscripciones mayas antiguas a menudo aparece escrito con un símbolo que parece una cruz y otro que significa cielo. Esta "cruz" maya no tiene relación con otras religiones, sino que marca el cruce de direcciones, el centro absoluto de su mundo. Al entender este glifo, los arqueólogos lograron leer que las plazas centrales de las ciudades mayas eran réplicas a escala de este árbol central.'
  },
  {
    id: 'via-lactea-maya',
    title: 'La Vía Láctea Maya',
    color: '#4A148C',
    btnImage: '/assets/maya/infographic_m9/btn_via-lactea-maya.jpg',
    image: '/assets/maya/infographic_m9/hero_via-lactea-maya.jpg',
    content: [
      'La Vía Láctea no siempre se ve igual en el cielo nocturno. Como nuestro planeta Tierra gira sobre sí mismo y también viaja alrededor del sol, la posición de las estrellas parece cambiar. A veces, la Vía Láctea está de pie, apuntando de norte a sur. Cuando los observadores mayas veían esta línea brillante vertical, decían que era el árbol cósmico levantado. Parecía un pilar enorme que sostenía el cielo nocturno para que no cayera sobre la tierra.',
      'Pero a medida que avanzaba la noche, la banda de estrellas parecía inclinarse y acostarse lentamente en el cielo, apuntando de este a oeste. Cuando la Vía Láctea estaba en esta posición horizontal, los mayas ya no veían un árbol. En su lugar, veían una forma diferente: la imaginaban como una canoa cósmica flotando en un río de estrellas, o como un enorme cocodrilo estelar nadando a través del gran océano negro de la noche oscura.',
      'Piensa en esto como mirar una nube mullida en el cielo. Si la miras desde un lado, puede parecer un perro corriendo, pero si el viento la voltea, puede parecer un barco navegando. Los mayas hicieron lo mismo, pero con la galaxia entera. Usaron diferentes nombres y diferentes formas para describir la misma banda de estrellas, dependiendo de cómo estuviera girada en relación con el horizonte, demostrando una comprensión profunda de la rotación terrestre.',
      'Esta transformación de árbol a cocodrilo no era solo un cuento antes de dormir. Era información valiosa sobre cómo se movía el mundo físico. Los sacerdotes mayas, que eran como los científicos modernos, pasaban noches enteras sentados en lo alto de sus pirámides de piedra, mirando hacia arriba. Al observar cómo el árbol estelar se inclinaba y se convertía en cocodrilo galáctico, podían saber qué hora de la noche era sin necesidad de usar relojes mecánicos.',
      'Este cambio estelar también anunciaba la llegada de diferentes estaciones climáticas a lo largo del año solar. Si el árbol de estrellas estaba de pie justo después de que se ponía el sol, los mayas sabían que el clima seco estaba terminando y que pronto llegarían las lluvias fuertes. La forma del cielo les decía exactamente cuándo debían plantar sus semillas de maíz en la tierra. Las estrellas eran su calendario gigante, escrito con luz galáctica sobre un fondo negro.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En muchas culturas antiguas de todo el mundo, la Vía Láctea fue imaginada como un camino, un río o un árbol. Los antiguos griegos pensaban que era leche derramada, los aborígenes australianos veían un emú oscuro y las tribus de América del Norte veían el camino polvoriento por donde caminaban los espíritus estelares.' },
      { label: 'Observación Diaria', icon: 'zap', text: 'A diferencia de nosotros que tenemos farolas brillantes y luces de ciudad que ocultan las estrellas, los antiguos mayas tenían noches de oscuridad total. Su vista de la Vía Láctea era tan intensa y detallada que podían ver nubes oscuras de polvo espacial bloqueando la luz de las estrellas detrás, formando figuras en negro.' }
    ],
    fact: 'El monstruo cósmico que los mayas veían en la Vía Láctea horizontal solía representarse como un cocodrilo con dos cabezas. Esto parece raro, pero tiene sentido científico astronómico. Una cabeza apuntaba hacia el lugar donde sale el sol y la otra hacia donde se oculta. Las dos bocas del reptil representaban los puntos opuestos del horizonte, conectando el ciclo completo del día y la noche.'
  },
  {
    id: 'canoa-cosmica',
    title: 'La Canoa Cósmica',
    color: '#0277BD',
    btnImage: '/assets/maya/infographic_m9/btn_canoa-cosmica.jpg',
    image: '/assets/maya/infographic_m9/hero_canoa-cosmica.jpg',
    content: [
      'Cuando la Vía Láctea se pone horizontal y corre de este a oeste, los antiguos mayas la llamaban la Canoa Cósmica. Imagina una barca de madera larga flotando en un río brillante de estrellas brillantes, navegando silenciosamente a través del cielo nocturno. En la gran historia de la creación maya, escrita en un libro sagrado llamado Popol Vuh, esta canoa galáctica tiene un trabajo muy importante: transportar al gran Dios del Maíz en su viaje.',
      'En la proa, la parte delantera del barco estelar, va un dios especial que rema con fuerza; y en la popa, la parte trasera, va otro remero cósmico. Los llamamos los "Dioses Remeros". Estos remeros estelares guían la barca que lleva el alma del Dios del Maíz hacia Xibalbá, el reino oscuro bajo la tierra, después de que termina el tiempo de la cosecha. Este viaje mítico a través de las estrellas es una historia sobre cómo las cosas mueren en invierno y vuelven a nacer.',
      'Lo increíble es que los mayas tallaron escenas de esta historia del Dios del Maíz y su canoa en huesos diminutos. Los arqueólogos encontraron unos huesos exquisitamente tallados en la ciudad de Tikal, que muestran exactamente este viaje cósmico celestial. En el hueso grabado, se ve la canoa larga con los dioses trabajando duro para remar a través del agua estelar, mientras el Dios del Maíz va sentado en el centro con un sombrero alto.',
      'Esta historia mágica en realidad ayudaba a los niños a entender hechos básicos sobre su suministro diario de alimentos. El viaje del Dios del Maíz en la canoa celeste explicaba por qué las semillas deben ser enterradas en la oscuridad de la tierra sucia para poder brotar como nuevas plantas verdes de maíz meses después. La canoa que viajaba hacia el inframundo representaba las semillas entrando bajo tierra para empezar a crecer de nuevo con la lluvia fresca.',
      'Los remeros estelares de esta gran historia corresponden a estrellas reales o grupos de estrellas que los observadores antiguos podían ver brillar en el cielo nocturno. Una vez más, usaron su gran mapa galáctico para contar la historia más importante de su cultura. Ver la Canoa Cósmica por encima de sus cabezas les daba esperanza. Les decía que, aunque las plantas se marchitaran, el gran motor del cielo seguía girando y pronto traería nueva vida verde a sus campos secos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los famosos huesos tallados de Tikal, que muestran la historia completa de la canoa cósmica remando hacia el inframundo, son increíblemente pequeños. Algunos miden menos de un palmo de largo. Los artistas mayas usaban herramientas afiladas hechas de piedra obsidiana, porque el metal aún no era común en su selva tropical húmeda.' },
      { label: 'Concepto Científico', icon: 'atom', text: 'La idea de un río brillante flotando en el cielo es una descripción bastante precisa de cómo se ve nuestro brazo en espiral de la galaxia desde la superficie de la tierra. Estamos mirando a través del plano galáctico, donde se concentra todo el polvo, el gas brillante y millones de estrellas jóvenes apretadas en una banda.' }
    ],
    fact: 'Algunos investigadores han notado que en ciertas épocas del año y bajo el cielo despejado de América Central, las estrellas brillantes que forman la constelación moderna de Orión están ubicadas justo donde estarían los Dioses Remeros en la Vía Láctea, dirigiendo la gran canoa brillante a lo largo de su viaje celestial.'
  },
  {
    id: 'ceiba-sagrada',
    title: 'La Ceiba Sagrada',
    color: '#1B5E20',
    btnImage: '/assets/maya/infographic_m9/btn_ceiba-sagrada.jpg',
    image: '/assets/maya/infographic_m9/hero_ceiba-sagrada.jpg',
    content: [
      'El árbol físico en el que se basaron para imaginar el Wakah Chan galáctico es un árbol real llamado Ceiba pentandra. Si alguna vez caminas por la selva húmeda del sur de México o de Guatemala, notarás la ceiba inmediatamente. Crece mucho más alto que el resto del dosel verde forestal. Algunas ceibas enormes pueden medir más de 60 metros de altura, lo que las hace casi tan altas como un edificio moderno de veinte pisos parado en medio de la jungla espesa.',
      'En la parte inferior, el tronco de la gran ceiba no es liso y redondo como el de un manzano. Tiene raíces enormes que parecen paredes delgadas de madera, llamadas raíces tabulares. Estas raíces anchas se extienden en todas las direcciones como los dedos de un pie gigante, hundiendo sus puntas profundas en la tierra oscura. Para los antiguos constructores de ciudades, estas raíces que bajaban a la tierra representaban las entradas húmedas al temido Xibalbá, el mundo inferior.',
      'El tronco central del árbol sagrado es recto, cilíndrico y está cubierto de espinas cónicas cuando el árbol es joven, como armadura vegetal protectora. Esta parte alta del tronco representaba el mundo de en medio terrestre, donde vivimos las personas, los animales ruidosos y las plantas verdes. Y en la cima más alta de la ceiba majestuosa, las ramas crecen horizontalmente como si formaran un gran techo plano, como un enorme paraguas verde tocando las nubes lluviosas.',
      'Ese dosel alto y ancho es tan denso que bloquea el sol brillante, y forma una gran plataforma natural elevada. En la imaginación maya antigua, estas ramas altas correspondían a los niveles celestiales, los pisos superiores del universo, habitados por aves sagradas como el quetzal verde. Como es el árbol más visible y alto de su ambiente salvaje, tenía sentido perfecto usar la ceiba gigante como la plantilla terrenal para entender la Vía Láctea que cruza el cielo.',
      'Incluso hoy en día, en muchas plazas centrales y pueblos de Centroamérica moderna, encontrarás un enorme árbol de ceiba creciendo pacíficamente en el centro exacto. La gente aún lo considera un ser vivo muy respetado y protege sus ramas verdes. Cada gran ciudad maya antigua, como Tikal o Copán, también fue construida como un mapa mágico, con las plazas abiertas imitando el claro de la selva y las altas pirámides de piedra rodeando un árbol sagrado o pilar central simulado.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las semillas esponjosas de la ceiba flotan en el viento como la nieve suave. Esta pelusa especial se llama kapok. En épocas recientes, antes de que existieran los materiales sintéticos, el material flotante kapok de la ceiba se usaba para rellenar salvavidas de emergencia en los grandes barcos del océano profundo.' },
      { label: 'Mundo Biológico', icon: 'zap', text: 'El árbol sagrado no solo conecta mundos en la historia mítica. En la biología real de la selva espesa, es un verdadero universo conectado. Murciélagos fruteros polinizan sus flores de noche en el nivel medio, monos comen hojas arriba y miles de insectos raros viven entre las grandes raíces tabulares en el suelo sombreado.' }
    ],
    fact: 'En las piezas de arte antiguas descubiertas por los arqueólogos modernos, como en el sarcófago grabado del famoso rey Kinich Janaab Pakal en la gran ciudad de Palenque, el árbol ceiba cósmico aparece con un pájaro celestial parado en la punta. Este monstruo aviar místico representa el reino más alto del cielo, observando tranquilamente todo el mundo debajo de sus plumas mágicas.'
  },
  {
    id: 'tres-niveles',
    title: 'Los Tres Niveles del Cosmos',
    color: '#FFD54F',
    btnImage: '/assets/maya/infographic_m9/btn_tres-niveles.jpg',
    image: '/assets/maya/infographic_m9/hero_tres-niveles.jpg',
    content: [
      'Los arquitectos mayas imaginaron un mundo estructurado, como un teatro gigante de varios pisos apilados uno sobre otro. No veían un espacio vacío y oscuro lleno de esferas de roca. Ellos imaginaron que el cosmos brillante tenía tres grandes niveles separados. Arriba de todo, estaba el cielo alto, dividido en trece pisos invisibles como una gran torre celeste, donde vivían las nubes de lluvia, los vientos veloces, el sol brillante diurno y la luna pálida nocturna.',
      'En el medio estaba nuestro mundo, la Tierra firme donde vivimos. Imaginaban que el mundo humano no era una esfera redonda rodando en el espacio negro, sino un lugar plano. Creían que estábamos de pie sobre la espalda de un monstruo gigante, como un cocodrilo cósmico o una tortuga antigua de tierra, que flotaba en un océano enorme primigenio. Es una forma hermosa de explicar cómo el suelo sólido se siente fuerte bajo los pies rodeado por las aguas marinas azules infinitas.',
      'Y abajo en la profundidad sombría estaba Xibalbá, el mundo subterráneo que tenía nueve oscuros pisos descendentes. Este lugar temido, un gran laberinto de cuevas peligrosas y ríos de sangre caliente, era regido por los señores de la muerte pálida. El mundo bajo tierra no era un infierno de castigo de fuego, sino una parte normal del ciclo completo natural. Las semillas caen a la oscuridad bajo la tierra profunda antes de brotar al sol con vida nueva brillante.',
      'El árbol cósmico Wakah Chan era la parte más importante de esta gran casa galáctica, porque era la única estructura resistente que pasaba a través de los tres pisos, conectando Xibalbá oscuro, la Tierra plana y el Cielo alto en una sola pieza estable. A través del tronco brillante del gran árbol galáctico, los espíritus errantes, el agua vital, las plegarias humanas y los dioses cósmicos podían subir y bajar cruzando los grandes límites impenetrables del universo mágico.',
      'Los mayas fueron tan detallados que su sistema matemático y calendárico antiguo reflejaba estos números importantes constantemente. El ciclo especial de tiempo, llamado Tzolkin, usa combinaciones exactas del número trece y veinte para marcar días importantes. Para ellos, el tiempo que corría sin parar y el espacio del cosmos que habitaban no eran dos cosas separadas, sino una misma gran máquina conectada de tres niveles y ciclos numéricos sagrados que repetían eternamente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las antiguas pirámides de piedra mayas no eran solo tumbas para gobernantes o fortalezas de defensa. Eran modelos arquitectónicos detallados de los tres grandes niveles cósmicos. La base ancha tocaba Xibalbá oscuro en el fondo, las escaleras representaban el nivel humano del suelo y el templo pequeño de arriba simulaba la puerta celestial sagrada.' },
      { label: 'Leyendas Antiguas', icon: 'zap', text: 'Según las viejas historias heroicas, cruzar a Xibalbá era un viaje muy peligroso y aterrador. Había ríos de escorpiones picadores, casas de hielo congelante, murciélagos con grandes garras, y señores de la oscuridad con nombres feos que engañaban a los héroes humanos jóvenes. Era la prueba extrema de valor humano inteligente.' }
    ],
    fact: 'El número sagrado trece correspondía a las principales articulaciones mayores del cuerpo humano fuerte: dos tobillos bajos, dos rodillas sólidas, dos caderas, dos muñecas sueltas, dos codos curvos, dos hombros anchos y un cuello móvil central. Así, los pensadores mayas conectaron inteligentemente la anatomía física humana interna con los grandes trece niveles altos del gran cielo nocturno exterior, conectando la persona con el universo amplio.'
  },
  {
    id: 'orientacion-nocturna',
    title: 'Orientación Nocturna',
    color: '#4E342E',
    btnImage: '/assets/maya/infographic_m9/btn_orientacion-nocturna.jpg',
    image: '/assets/maya/infographic_m9/hero_orientacion-nocturna.jpg',
    content: [
      'Hoy en día, si queremos saber qué hora exacta de la noche es, miramos nuestros relojes de muñeca y teléfonos digitales de bolsillo. Si queremos saber a dónde viajar o manejar el carro hacia el norte oscuro, miramos las flechas parpadeantes de una pantalla táctil brillante. Los antiguos astrónomos no tenían herramientas electrónicas pequeñas con baterías. Su herramienta gigante más precisa de navegación nocturna colgaba silenciosamente sobre sus cabezas calvas: el majestuoso Wakah Chan luminoso estelar.',
      'Al igual que el Sol caliente cruza la bóveda del cielo durante el día iluminado, la gran banda blanca polvorienta de la galaxia Vía Láctea cambia de posición constantemente a lo largo de las horas oscuras de la noche silenciosa. Los guardianes celestes aprendieron este giro lento regular como si estuvieran memorizando los números en la cara de un reloj gigante mecánico preciso. A medida que el gran árbol galáctico se acostaba en la negrura oscura, sabían que amanecer brillante estaba cerca inminente.',
      'Y porque la Tierra azul no solo gira rápidamente como un trompo pequeño sino que también da una vuelta completa larga alrededor del fuego del Sol, el cielo estrellado lejano se ve un poco diferente cada nueva semana sucesiva del año. Así, en enero frío el pilar brillante del árbol aparece en una posición diferente a la que tiene en junio lluvioso húmedo a la misma hora exacta después del atardecer rojizo crepuscular en el horizonte oeste lejano.',
      'Esta comprensión experta de los grandes relojes del universo les daba un poder importante. Saber a qué hora terminar la ceremonia religiosa nocturna, cuándo plantar la semilla de maíz resistente, cómo evitar caminar en un bosque sombrío oscuro desorientado en plena oscuridad ciega, requería conocer las estrellas precisas pequeñas y la Vía Láctea blanca pálida mejor que los surcos finos profundos en las palmas de sus propias manos oscuras delgadas.',
      'Los edificios altos y complejos mayas antiguos se construían alineando directamente sus grandes ventanas de piedra cuadradadas y pórticos profundos con posiciones clave importantes que la Vía Láctea inmensa ocupaba en la bóveda oscura. Eran observatorios de roca sólida permanente, alineados como lentes de cámaras grandes pesadas para atrapar líneas visuales directas precisas. Así, la gran ceiba cósmica blanca gobernaba cómo trazaban las amplias calles rectas pavimentadas blancas en la tierra húmeda inferior.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los antiguos sabios mayas usaban palos rústicos cruzados simples con muescas como simples herramientas visuales manuales prácticas, colocados frente a puertas cuadradadas alineadas. Desde un punto oscuro fijo y un palo cruzado en X adelante, creaban un sistema de puntería efectivo barato, muy parecido a las miras pequeñas de los rifles largos modernos que alinean un pequeño tubo metálico para enfocar puntos lejanos oscuros precisamente.' },
      { label: 'Uso Práctico', icon: 'zap', text: 'Aún hoy en tiempos rápidos modernos en partes apartadas silenciosas y remotas de las selvas húmedas mexicanas sureñas grandes, algunas viejas personas campesinas usan la sombra larga blanca y el cambio angular que hace la galaxia nocturna blanca como indicador útil básico para predecir lluvia mojada pesada sobre los campos de granja.' }
    ],
    fact: 'Un arqueólogo moderno famoso llamado Anthony Aveni usó grandes computadoras potentes digitales rápidas con datos viejos astronómicos y logró descubrir asombrado que las avenidas principales amplias peatonales en la gran metrópolis de Teotihuacan lejana en México grande se alineaban intencionalmente a la perfección con el hundimiento profundo de la gran Vía Láctea lejana hace casi ya cerca de largos dos mil pesados años.'
  },
  {
    id: 'popol-vuh-cielo',
    title: 'El Popol Vuh y el Cielo',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m9/btn_popol-vuh-cielo.jpg',
    image: '/assets/maya/infographic_m9/hero_popol-vuh-cielo.jpg',
    content: [
      'El libro más famoso de los mayas antiguos se llama el Popol Vuh. Aunque puede parecer un cuento lleno de monstruos mágicos y aventuras sobre dos gemelos jóvenes que viajan bajo tierra para jugar un peligroso juego de pelota contra los señores de la muerte, en realidad es mucho más. Este libro antiguo es un complejo mapa de ciencias del cielo disfrazado de un relato fantástico misterioso. Cada uno de los personajes heroicos principales en sus densas páginas corresponde a algo que puedes ver si observas bien el cielo nocturno estrellado.',
      'En la historia, los Gemelos Héroes bajan al peligroso Xibalbá para jugar contra reyes engañosos. Los astrónomos descubrieron que el viaje de estos muchachos valientes coincide con la manera en que el sol y la luna viajan en el cielo y desaparecen bajo el horizonte. Cuando el sol se oculta, decían que estaba entrando al mundo subterráneo de los muertos para luchar durante la noche, para poder nacer triunfante como luz nueva al amanecer.',
      'Los grandes personajes monstruosos de esta gran historia del cielo también tienen identidades astronómicas precisas. Un personaje terrible que se llama Siete Guacamayo gigante, un ave fanfarrona, fingía ser el verdadero sol en una época oscura. El mito habla de cómo los jóvenes héroes le disparan y el ave herida cae. Esto describe el movimiento de las estrellas brillantes que forman la Osa Mayor moderna cuando caen hacia el horizonte norte.',
      'Hasta el momento central cuando los valientes niños patean mágicamente la gran pelota rebotadora para ganar, se sincroniza asombrosamente bien con los grandes ciclos astronómicos. Los movimientos estelares de Venus radiante brillante se pueden medir tan exactamente mediante estos viejos mitos, que los viejos cuentos poéticos se convierten en una gran enciclopedia científica de astronomía. El conocimiento empírico fue empacado en cuentos emocionantes para la gente.',
      'Los mayas fueron sabios brillantes. Al contar un cuento emocionante, lograron que un conocimiento astronómico complejo pasara de abuelos a nietos durante cientos de años. Entender esto prueba que la ciencia matemática no es un invento reciente. Siempre ha estado escondida en las grandes historias antiguas que contamos bajo el cielo. Wakah Chan, la enorme Vía Láctea, no era solo decoración. Era el escenario de la primera gran ciencia humana en el misterioso continente americano.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El texto del Popol Vuh casi se perdió en el tiempo. Solo sobrevivió porque un sacerdote europeo en Guatemala, llamado Francisco Ximénez, escuchó las historias, copió un manuscrito oculto y lo tradujo. Sin ese momento de suerte, no sabríamos nada de esta conexión astronómica que inventaron los antiguos pueblos de América. Hoy es nuestro mayor tesoro.' },
      { label: 'Conexión Cultural', icon: 'zap', text: 'Para estudiar ciencia hoy, nosotros vamos a aulas cerradas con pizarras blancas. Para aprender ciencia en la selva antigua, las personas se reunían alrededor del fuego para escuchar cantos. La historia poética y el mito colorido eran la mejor manera de guardar información compleja sobre la rotación terrestre en su memoria.' }
    ],
    fact: 'En muchas lenguas mayas indígenas, la palabra para decir sol, la palabra para decir día y la palabra para nombrar el concepto abstracto del tiempo son exactamente la misma palabra corta: K\'in. Esta antigua palabra de una sílaba resume perfectamente su ciencia astronómica. Entendían que el movimiento de los astros brillantes en el firmamento oscuro, la duración de nuestras pequeñas vidas mortales y el avance del tiempo eran todo la misma fuerza giratoria.'
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
      hue: Math.random() > 0.5 ? '207,216,220' : '27,94,32', // white or green
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

function WakahChanHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(207,216,220,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#CFD8DC','#4A148C','#0277BD','#1B5E20','#FFD54F','#4E342E','#212121'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <path d="M 290 40 L 310 40 L 305 20 L 315 25 L 300 5 L 285 25 L 295 20 Z" fill="none" stroke="#CFD8DC" strokeWidth="1.5" opacity="0.6"/>
        <line x1="300" y1="40" x2="300" y2="45" stroke="#CFD8DC" strokeWidth="2" opacity="0.6"/>
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(207,216,220,0.2)" />
            <stop offset="50%" stopColor="rgba(207,216,220,0.9)" />
            <stop offset="100%" stopColor="rgba(207,216,220,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#CFD8DC" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">WAKAH CHAN</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(255,213,79,0.9)" fontSize="12" fontFamily="monospace" letterSpacing="2">EL ÁRBOL CÓSMICO</text>
      </svg>
    </div>
  );
}

// ─── Node Button ─────────────────────────────────────────────────────────────

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
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(207,216,220,0.2)'}`,
        boxShadow: isActive ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30` : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }}
          />
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
        <motion.div
          layoutId="activeDotMayaM9"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }}
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
      marginTop: '0.8rem', borderRadius: '14px', border: `1px solid ${color}25`,
      overflow: 'hidden', background: `linear-gradient(135deg, ${color}08, transparent)`,
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
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
            variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
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
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`, borderRadius: '24px', position: 'relative',
        zIndex: 3, marginTop: '1rem', overflow: 'hidden',
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {node.expandables.map((exp, i) => (
            <ExpandableSection key={i} item={exp} color={node.color} />
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '16px', background: `linear-gradient(45deg, ${node.color}15, transparent)`, borderLeft: `4px solid ${node.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
            <Star size={18} color={node.color} />
            <h4 style={{ margin: 0, color: node.color, fontSize: '1rem', fontWeight: 800 }}>Dato Curioso</h4>
          </div>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {node.fact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────

function ProgressBar({ nodes, activeNodeId }) {
  const activeIndex = nodes.findIndex(n => n.id === activeNodeId);
  const progress = activeIndex === -1 ? 0 : (activeIndex + 1) / nodes.length;

  return (
    <div style={{ margin: '2rem auto 0', maxWidth: '400px', width: '100%', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>
          MÓDULO 9
        </span>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>
          {activeIndex === -1 ? 0 : activeIndex + 1} / {nodes.length}
        </span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #CFD8DC, #FFD54F)' }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function InteractiveInfographic_MayaM9() {
  const [activeNodeId, setActiveNodeId] = useState(INFOGRAPHIC_NODES[0].id);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  
  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '800px', backgroundColor: '#050714', overflow: 'hidden', padding: '2rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
        <WakahChanHeader />
        
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem',
          margin: '2rem 0', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px',
          backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(node.id)}
              index={idx}
            />
          ))}
        </div>

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

        <ProgressBar nodes={INFOGRAPHIC_NODES} activeNodeId={activeNodeId} />
        
        <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.9)', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Bibliografía y Fuentes Académicas</h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
