'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya / Cosmic themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    title: 'Wakah Chan: El Ãrbol CÃ³smico',
    color: '#CFD8DC',
    btnImage: '/assets/maya/infographic_m9/btn_wakah-chan-arbol.jpg',
    image: '/assets/maya/infographic_m9/hero_wakah-chan-arbol.jpg',
    content: [
      'Wakah Chan significa "Cielo Elevado". Es un Ã¡rbol gigante, pero no uno de madera y hojas. Es un Ã¡rbol hecho de estrellas brillantes. Imagina que sales al patio en una noche oscura, miras hacia arriba y ves una banda brillante de polvo estelar cruzando el cielo. Nosotros la llamamos VÃ­a LÃ¡ctea. Para los antiguos mayas, esa banda gigante de estrellas era el Wakah Chan. Era el Ã¡rbol mÃ¡s grande del universo, plantado justo en el centro del mundo para sostener todo.',
      'Este Ã¡rbol estelar funciona como una carretera gigante que conecta tres lugares diferentes. Imagina un edificio con tres pisos. El sÃ³tano oscuro y hÃºmedo es XibalbÃ¡, el mundo subterrÃ¡neo donde viven los seÃ±ores del inframundo. El primer piso es la Tierra, donde vivimos nosotros, cultivamos maÃ­z y construimos ciudades. El segundo piso es el cielo diurno, donde brillan el sol y los planetas. El Wakah Chan es como el ascensor brillante que conecta estos tres niveles.',
      'Las raÃ­ces del Ã¡rbol estelar se hunden en el suelo, bajando hacia las cuevas oscuras de XibalbÃ¡. Su tronco pasa a travÃ©s de nuestra Tierra, y sus ramas se abren en el cielo superior, tocando las nubes. Esta idea ayudaba a los mayas a entender cÃ³mo las cosas del cielo podÃ­an afectar a las cosas de abajo, como la lluvia cayendo a la tierra. Todo estaba conectado por este enorme pilar de polvo estelar y luz blanca brillante, como un esqueleto que mantiene todo el universo unido.',
      'Los gobernantes mayas querÃ­an ser como este gran Ã¡rbol cÃ³smico. Cuando un rey se vestÃ­a para una ceremonia importante, usaba ropa que lo hacÃ­a ver como el Wakah Chan. Se ponÃ­a un cinturÃ³n ancho que representaba el tronco y plumas verdes en la cabeza que representaban las ramas. El rey creÃ­a que, al hacer esto, podÃ­a traer energÃ­a del cielo a su pueblo, actuando como un puente viviente entre los dioses arriba y los humanos abajo.',
      'Entender el Wakah Chan nos ayuda a ver cÃ³mo la ciencia y la imaginaciÃ³n pueden trabajar juntas. Los mayas miraban las mismas estrellas que vemos hoy con nuestros telescopios modernos. Pero en lugar de ver solo rocas espaciales lejanas, veÃ­an un mapa brillante que explicaba cÃ³mo funcionaba su mundo. Era su forma de explicar algo tan grande y complejo como la galaxia, usando la imagen simple de un Ã¡rbol que veÃ­an crecer en su selva todos los dÃ­as.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Los mayas no construyeron telescopios de cristal como nosotros. HacÃ­an sus observaciones astronÃ³micas usando palos cruzados, lÃ­neas visuales en edificios de piedra y mucha paciencia. Registraron el movimiento de las estrellas con tanta precisiÃ³n matemÃ¡tica que sus mapas celestes siguen siendo exactos hoy. Â¡Eran verdaderos cientÃ­ficos del cielo nocturno!' },
      { label: 'Concepto CientÃ­fico', icon: 'atom', text: 'La VÃ­a LÃ¡ctea que los mayas llamaron Wakah Chan es en realidad un disco plano y enorme formado por miles de millones de soles. Como vivimos dentro de ese disco estelar, lo vemos de lado. Por eso parece una banda alargada cruzando el cielo, como el tronco de un Ã¡rbol altÃ­simo de luz brillante sobre nuestras cabezas.' }
    ],
    fact: 'El nombre completo del Ã¡rbol cÃ³smico en las inscripciones mayas antiguas a menudo aparece escrito con un sÃ­mbolo que parece una cruz y otro que significa cielo. Esta "cruz" maya no tiene relaciÃ³n con otras religiones, sino que marca el cruce de direcciones, el centro absoluto de su mundo. Al entender este glifo, los arqueÃ³logos lograron leer que las plazas centrales de las ciudades mayas eran rÃ©plicas a escala de este Ã¡rbol central.'
  },
  {
    id: 'via-lactea-maya',
    title: 'La VÃ­a LÃ¡ctea Maya',
    color: '#4A148C',
    btnImage: '/assets/maya/infographic_m9/btn_via-lactea-maya.jpg',
    image: '/assets/maya/infographic_m9/hero_via-lactea-maya.jpg',
    content: [
      'La VÃ­a LÃ¡ctea no siempre se ve igual en el cielo nocturno. Como nuestro planeta Tierra gira sobre sÃ­ mismo y tambiÃ©n viaja alrededor del sol, la posiciÃ³n de las estrellas parece cambiar. A veces, la VÃ­a LÃ¡ctea estÃ¡ de pie, apuntando de norte a sur. Cuando los observadores mayas veÃ­an esta lÃ­nea brillante vertical, decÃ­an que era el Ã¡rbol cÃ³smico levantado. ParecÃ­a un pilar enorme que sostenÃ­a el cielo nocturno para que no cayera sobre la tierra.',
      'Pero a medida que avanzaba la noche, la banda de estrellas parecÃ­a inclinarse y acostarse lentamente en el cielo, apuntando de este a oeste. Cuando la VÃ­a LÃ¡ctea estaba en esta posiciÃ³n horizontal, los mayas ya no veÃ­an un Ã¡rbol. En su lugar, veÃ­an una forma diferente: la imaginaban como una canoa cÃ³smica flotando en un rÃ­o de estrellas, o como un enorme cocodrilo estelar nadando a travÃ©s del gran ocÃ©ano negro de la noche oscura.',
      'Piensa en esto como mirar una nube mullida en el cielo. Si la miras desde un lado, puede parecer un perro corriendo, pero si el viento la voltea, puede parecer un barco navegando. Los mayas hicieron lo mismo, pero con la galaxia entera. Usaron diferentes nombres y diferentes formas para describir la misma banda de estrellas, dependiendo de cÃ³mo estuviera girada en relaciÃ³n con el horizonte, demostrando una comprensiÃ³n profunda de la rotaciÃ³n terrestre.',
      'Esta transformaciÃ³n de Ã¡rbol a cocodrilo no era solo un cuento antes de dormir. Era informaciÃ³n valiosa sobre cÃ³mo se movÃ­a el mundo fÃ­sico. Los sacerdotes mayas, que eran como los cientÃ­ficos modernos, pasaban noches enteras sentados en lo alto de sus pirÃ¡mides de piedra, mirando hacia arriba. Al observar cÃ³mo el Ã¡rbol estelar se inclinaba y se convertÃ­a en cocodrilo galÃ¡ctico, podÃ­an saber quÃ© hora de la noche era sin necesidad de usar relojes mecÃ¡nicos.',
      'Este cambio estelar tambiÃ©n anunciaba la llegada de diferentes estaciones climÃ¡ticas a lo largo del aÃ±o solar. Si el Ã¡rbol de estrellas estaba de pie justo despuÃ©s de que se ponÃ­a el sol, los mayas sabÃ­an que el clima seco estaba terminando y que pronto llegarÃ­an las lluvias fuertes. La forma del cielo les decÃ­a exactamente cuÃ¡ndo debÃ­an plantar sus semillas de maÃ­z en la tierra. Las estrellas eran su calendario gigante, escrito con luz galÃ¡ctica sobre un fondo negro.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'En muchas culturas antiguas de todo el mundo, la VÃ­a LÃ¡ctea fue imaginada como un camino, un rÃ­o o un Ã¡rbol. Los antiguos griegos pensaban que era leche derramada, los aborÃ­genes australianos veÃ­an un emÃº oscuro y las tribus de AmÃ©rica del Norte veÃ­an el camino polvoriento por donde caminaban los espÃ­ritus estelares.' },
      { label: 'ObservaciÃ³n Diaria', icon: 'clock', text: 'A diferencia de nosotros que tenemos farolas brillantes y luces de ciudad que ocultan las estrellas, los antiguos mayas tenÃ­an noches de oscuridad total. Su vista de la VÃ­a LÃ¡ctea era tan intensa y detallada que podÃ­an ver nubes oscuras de polvo espacial bloqueando la luz de las estrellas detrÃ¡s, formando figuras en negro.' }
    ],
    fact: 'El monstruo cÃ³smico que los mayas veÃ­an en la VÃ­a LÃ¡ctea horizontal solÃ­a representarse como un cocodrilo con dos cabezas. Esto parece raro, pero tiene sentido cientÃ­fico astronÃ³mico. Una cabeza apuntaba hacia el lugar donde sale el sol y la otra hacia donde se oculta. Las dos bocas del reptil representaban los puntos opuestos del horizonte, conectando el ciclo completo del dÃ­a y la noche.'
  },
  {
    id: 'canoa-cosmica',
    title: 'La Canoa CÃ³smica',
    color: '#0277BD',
    btnImage: '/assets/maya/infographic_m9/btn_canoa-cosmica.jpg',
    image: '/assets/maya/infographic_m9/hero_canoa-cosmica.jpg',
    content: [
      'Cuando la VÃ­a LÃ¡ctea se pone horizontal y corre de este a oeste, los antiguos mayas la llamaban la Canoa CÃ³smica. Imagina una barca de madera larga flotando en un rÃ­o brillante de estrellas brillantes, navegando silenciosamente a travÃ©s del cielo nocturno. En la gran historia de la creaciÃ³n maya, escrita en un libro sagrado llamado Popol Vuh, esta canoa galÃ¡ctica tiene un trabajo muy importante: transportar al gran Dios del MaÃ­z en su viaje.',
      'En la proa, la parte delantera del barco estelar, va un dios especial que rema con fuerza; y en la popa, la parte trasera, va otro remero cÃ³smico. Los llamamos los "Dioses Remeros". Estos remeros estelares guÃ­an la barca que lleva el alma del Dios del MaÃ­z hacia XibalbÃ¡, el reino oscuro bajo la tierra, despuÃ©s de que termina el tiempo de la cosecha. Este viaje mÃ­tico a travÃ©s de las estrellas es una historia sobre cÃ³mo las cosas mueren en invierno y vuelven a nacer.',
      'Lo increÃ­ble es que los mayas tallaron escenas de esta historia del Dios del MaÃ­z y su canoa en huesos diminutos. Los arqueÃ³logos encontraron unos huesos exquisitamente tallados en la ciudad de Tikal, que muestran exactamente este viaje cÃ³smico celestial. En el hueso grabado, se ve la canoa larga con los dioses trabajando duro para remar a travÃ©s del agua estelar, mientras el Dios del MaÃ­z va sentado en el centro con un sombrero alto.',
      'Esta historia mÃ¡gica en realidad ayudaba a los niÃ±os a entender hechos bÃ¡sicos sobre su suministro diario de alimentos. El viaje del Dios del MaÃ­z en la canoa celeste explicaba por quÃ© las semillas deben ser enterradas en la oscuridad de la tierra sucia para poder brotar como nuevas plantas verdes de maÃ­z meses despuÃ©s. La canoa que viajaba hacia el inframundo representaba las semillas entrando bajo tierra para empezar a crecer de nuevo con la lluvia fresca.',
      'Los remeros estelares de esta gran historia corresponden a estrellas reales o grupos de estrellas que los observadores antiguos podÃ­an ver brillar en el cielo nocturno. Una vez mÃ¡s, usaron su gran mapa galÃ¡ctico para contar la historia mÃ¡s importante de su cultura. Ver la Canoa CÃ³smica por encima de sus cabezas les daba esperanza. Les decÃ­a que, aunque las plantas se marchitaran, el gran motor del cielo seguÃ­a girando y pronto traerÃ­a nueva vida verde a sus campos secos.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Los famosos huesos tallados de Tikal, que muestran la historia completa de la canoa cÃ³smica remando hacia el inframundo, son increÃ­blemente pequeÃ±os. Algunos miden menos de un palmo de largo. Los artistas mayas usaban herramientas afiladas hechas de piedra obsidiana, porque el metal aÃºn no era comÃºn en su selva tropical hÃºmeda.' },
      { label: 'Concepto CientÃ­fico', icon: 'atom', text: 'La idea de un rÃ­o brillante flotando en el cielo es una descripciÃ³n bastante precisa de cÃ³mo se ve nuestro brazo en espiral de la galaxia desde la superficie de la tierra. Estamos mirando a travÃ©s del plano galÃ¡ctico, donde se concentra todo el polvo, el gas brillante y millones de estrellas jÃ³venes apretadas en una banda.' }
    ],
    fact: 'Algunos investigadores han notado que en ciertas Ã©pocas del aÃ±o y bajo el cielo despejado de AmÃ©rica Central, las estrellas brillantes que forman la constelaciÃ³n moderna de OriÃ³n estÃ¡n ubicadas justo donde estarÃ­an los Dioses Remeros en la VÃ­a LÃ¡ctea, dirigiendo la gran canoa brillante a lo largo de su viaje celestial.'
  },
  {
    id: 'ceiba-sagrada',
    title: 'La Ceiba Sagrada',
    color: '#1B5E20',
    btnImage: '/assets/maya/infographic_m9/btn_ceiba-sagrada.jpg',
    image: '/assets/maya/infographic_m9/hero_ceiba-sagrada.jpg',
    content: [
      'El Ã¡rbol fÃ­sico en el que se basaron para imaginar el Wakah Chan galÃ¡ctico es un Ã¡rbol real llamado Ceiba pentandra. Si alguna vez caminas por la selva hÃºmeda del sur de MÃ©xico o de Guatemala, notarÃ¡s la ceiba inmediatamente. Crece mucho mÃ¡s alto que el resto del dosel verde forestal. Algunas ceibas enormes pueden medir mÃ¡s de 60 metros de altura, lo que las hace casi tan altas como un edificio moderno de veinte pisos parado en medio de la jungla espesa.',
      'En la parte inferior, el tronco de la gran ceiba no es liso y redondo como el de un manzano. Tiene raÃ­ces enormes que parecen paredes delgadas de madera, llamadas raÃ­ces tabulares. Estas raÃ­ces anchas se extienden en todas las direcciones como los dedos de un pie gigante, hundiendo sus puntas profundas en la tierra oscura. Para los antiguos constructores de ciudades, estas raÃ­ces que bajaban a la tierra representaban las entradas hÃºmedas al temido XibalbÃ¡, el mundo inferior.',
      'El tronco central del Ã¡rbol sagrado es recto, cilÃ­ndrico y estÃ¡ cubierto de espinas cÃ³nicas cuando el Ã¡rbol es joven, como armadura vegetal protectora. Esta parte alta del tronco representaba el mundo de en medio terrestre, donde vivimos las personas, los animales ruidosos y las plantas verdes. Y en la cima mÃ¡s alta de la ceiba majestuosa, las ramas crecen horizontalmente como si formaran un gran techo plano, como un enorme paraguas verde tocando las nubes lluviosas.',
      'Ese dosel alto y ancho es tan denso que bloquea el sol brillante, y forma una gran plataforma natural elevada. En la imaginaciÃ³n maya antigua, estas ramas altas correspondÃ­an a los niveles celestiales, los pisos superiores del universo, habitados por aves sagradas como el quetzal verde. Como es el Ã¡rbol mÃ¡s visible y alto de su ambiente salvaje, tenÃ­a sentido perfecto usar la ceiba gigante como la plantilla terrenal para entender la VÃ­a LÃ¡ctea que cruza el cielo.',
      'Incluso hoy en dÃ­a, en muchas plazas centrales y pueblos de CentroamÃ©rica moderna, encontrarÃ¡s un enorme Ã¡rbol de ceiba creciendo pacÃ­ficamente en el centro exacto. La gente aÃºn lo considera un ser vivo muy respetado y protege sus ramas verdes. Cada gran ciudad maya antigua, como Tikal o CopÃ¡n, tambiÃ©n fue construida como un mapa mÃ¡gico, con las plazas abiertas imitando el claro de la selva y las altas pirÃ¡mides de piedra rodeando un Ã¡rbol sagrado o pilar central simulado.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Las semillas esponjosas de la ceiba flotan en el viento como la nieve suave. Esta pelusa especial se llama kapok. En Ã©pocas recientes, antes de que existieran los materiales sintÃ©ticos, el material flotante kapok de la ceiba se usaba para rellenar salvavidas de emergencia en los grandes barcos del ocÃ©ano profundo.' },
      { label: 'Mundo BiolÃ³gico', icon: 'atom', text: 'El Ã¡rbol sagrado no solo conecta mundos en la historia mÃ­tica. En la biologÃ­a real de la selva espesa, es un verdadero universo conectado. MurciÃ©lagos fruteros polinizan sus flores de noche en el nivel medio, monos comen hojas arriba y miles de insectos raros viven entre las grandes raÃ­ces tabulares en el suelo sombreado.' }
    ],
    fact: 'En las piezas de arte antiguas descubiertas por los arqueÃ³logos modernos, como en el sarcÃ³fago grabado del famoso rey Kinich Janaab Pakal en la gran ciudad de Palenque, el Ã¡rbol ceiba cÃ³smico aparece con un pÃ¡jaro celestial parado en la punta. Este monstruo aviar mÃ­stico representa el reino mÃ¡s alto del cielo, observando tranquilamente todo el mundo debajo de sus plumas mÃ¡gicas.'
  },
  {
    id: 'tres-niveles',
    title: 'Los Tres Niveles del Cosmos',
    color: '#FFD54F',
    btnImage: '/assets/maya/infographic_m9/btn_tres-niveles.jpg',
    image: '/assets/maya/infographic_m9/hero_tres-niveles.jpg',
    content: [
      'Los arquitectos mayas imaginaron un mundo estructurado, como un teatro gigante de varios pisos apilados uno sobre otro. No veÃ­an un espacio vacÃ­o y oscuro lleno de esferas de roca. Ellos imaginaron que el cosmos brillante tenÃ­a tres grandes niveles separados. Arriba de todo, estaba el cielo alto, dividido en trece pisos invisibles como una gran torre celeste, donde vivÃ­an las nubes de lluvia, los vientos veloces, el sol brillante diurno y la luna pÃ¡lida nocturna.',
      'En el medio estaba nuestro mundo, la Tierra firme donde vivimos. Imaginaban que el mundo humano no era una esfera redonda rodando en el espacio negro, sino un lugar plano. CreÃ­an que estÃ¡bamos de pie sobre la espalda de un monstruo gigante, como un cocodrilo cÃ³smico o una tortuga antigua de tierra, que flotaba en un ocÃ©ano enorme primigenio. Es una forma hermosa de explicar cÃ³mo el suelo sÃ³lido se siente fuerte bajo los pies rodeado por las aguas marinas azules infinitas.',
      'Y abajo en la profundidad sombrÃ­a estaba XibalbÃ¡, el mundo subterrÃ¡neo que tenÃ­a nueve oscuros pisos descendentes. Este lugar temido, un gran laberinto de cuevas peligrosas y rÃ­os de sangre caliente, era regido por los seÃ±ores de la muerte pÃ¡lida. El mundo bajo tierra no era un infierno de castigo de fuego, sino una parte normal del ciclo completo natural. Las semillas caen a la oscuridad bajo la tierra profunda antes de brotar al sol con vida nueva brillante.',
      'El Ã¡rbol cÃ³smico Wakah Chan era la parte mÃ¡s importante de esta gran casa galÃ¡ctica, porque era la Ãºnica estructura resistente que pasaba a travÃ©s de los tres pisos, conectando XibalbÃ¡ oscuro, la Tierra plana y el Cielo alto en una sola pieza estable. A travÃ©s del tronco brillante del gran Ã¡rbol galÃ¡ctico, los espÃ­ritus errantes, el agua vital, las plegarias humanas y los dioses cÃ³smicos podÃ­an subir y bajar cruzando los grandes lÃ­mites impenetrables del universo mÃ¡gico.',
      'Los mayas fueron tan detallados que su sistema matemÃ¡tico y calendÃ¡rico antiguo reflejaba estos nÃºmeros importantes constantemente. El ciclo especial de tiempo, llamado Tzolkin, usa combinaciones exactas del nÃºmero trece y veinte para marcar dÃ­as importantes. Para ellos, el tiempo que corrÃ­a sin parar y el espacio del cosmos que habitaban no eran dos cosas separadas, sino una misma gran mÃ¡quina conectada de tres niveles y ciclos numÃ©ricos sagrados que repetÃ­an eternamente.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Las antiguas pirÃ¡mides de piedra mayas no eran solo tumbas para gobernantes o fortalezas de defensa. Eran modelos arquitectÃ³nicos detallados de los tres grandes niveles cÃ³smicos. La base ancha tocaba XibalbÃ¡ oscuro en el fondo, las escaleras representaban el nivel humano del suelo y el templo pequeÃ±o de arriba simulaba la puerta celestial sagrada.' },
      { label: 'Leyendas Antiguas', icon: 'clock', text: 'SegÃºn las viejas historias heroicas, cruzar a XibalbÃ¡ era un viaje muy peligroso y aterrador. HabÃ­a rÃ­os de escorpiones picadores, casas de hielo congelante, murciÃ©lagos con grandes garras, y seÃ±ores de la oscuridad con nombres feos que engaÃ±aban a los hÃ©roes humanos jÃ³venes. Era la prueba extrema de valor humano inteligente.' }
    ],
    fact: 'El nÃºmero sagrado trece correspondÃ­a a las principales articulaciones mayores del cuerpo humano fuerte: dos tobillos bajos, dos rodillas sÃ³lidas, dos caderas, dos muÃ±ecas sueltas, dos codos curvos, dos hombros anchos y un cuello mÃ³vil central. AsÃ­, los pensadores mayas conectaron inteligentemente la anatomÃ­a fÃ­sica humana interna con los grandes trece niveles altos del gran cielo nocturno exterior, conectando la persona con el universo amplio.'
  },
  {
    id: 'orientacion-nocturna',
    title: 'OrientaciÃ³n Nocturna',
    color: '#4E342E',
    btnImage: '/assets/maya/infographic_m9/btn_orientacion-nocturna.jpg',
    image: '/assets/maya/infographic_m9/hero_orientacion-nocturna.jpg',
    content: [
      'Hoy en dÃ­a, si queremos saber quÃ© hora exacta de la noche es, miramos nuestros relojes de muÃ±eca y telÃ©fonos digitales de bolsillo. Si queremos saber a dÃ³nde viajar o manejar el carro hacia el norte oscuro, miramos las flechas parpadeantes de una pantalla tÃ¡ctil brillante. Los antiguos astrÃ³nomos no tenÃ­an herramientas electrÃ³nicas pequeÃ±as con baterÃ­as. Su herramienta gigante mÃ¡s precisa de navegaciÃ³n nocturna colgaba silenciosamente sobre sus cabezas calvas: el majestuoso Wakah Chan luminoso estelar.',
      'Al igual que el Sol caliente cruza la bÃ³veda del cielo durante el dÃ­a iluminado, la gran banda blanca polvorienta de la galaxia VÃ­a LÃ¡ctea cambia de posiciÃ³n constantemente a lo largo de las horas oscuras de la noche silenciosa. Los guardianes celestes aprendieron este giro lento regular como si estuvieran memorizando los nÃºmeros en la cara de un reloj gigante mecÃ¡nico preciso. A medida que el gran Ã¡rbol galÃ¡ctico se acostaba en la negrura oscura, sabÃ­an que amanecer brillante estaba cerca inminente.',
      'Y porque la Tierra azul no solo gira rÃ¡pidamente como un trompo pequeÃ±o sino que tambiÃ©n da una vuelta completa larga alrededor del fuego del Sol, el cielo estrellado lejano se ve un poco diferente cada nueva semana sucesiva del aÃ±o. AsÃ­, en enero frÃ­o el pilar brillante del Ã¡rbol aparece en una posiciÃ³n diferente a la que tiene en junio lluvioso hÃºmedo a la misma hora exacta despuÃ©s del atardecer rojizo crepuscular en el horizonte oeste lejano.',
      'Esta comprensiÃ³n experta de los grandes relojes del universo les daba un poder importante. Saber a quÃ© hora terminar la ceremonia religiosa nocturna, cuÃ¡ndo plantar la semilla de maÃ­z resistente, cÃ³mo evitar caminar en un bosque sombrÃ­o oscuro desorientado en plena oscuridad ciega, requerÃ­a conocer las estrellas precisas pequeÃ±as y la VÃ­a LÃ¡ctea blanca pÃ¡lida mejor que los surcos finos profundos en las palmas de sus propias manos oscuras delgadas.',
      'Los edificios altos y complejos mayas antiguos se construÃ­an alineando directamente sus grandes ventanas de piedra cuadradadas y pÃ³rticos profundos con posiciones clave importantes que la VÃ­a LÃ¡ctea inmensa ocupaba en la bÃ³veda oscura. Eran observatorios de roca sÃ³lida permanente, alineados como lentes de cÃ¡maras grandes pesadas para atrapar lÃ­neas visuales directas precisas. AsÃ­, la gran ceiba cÃ³smica blanca gobernaba cÃ³mo trazaban las amplias calles rectas pavimentadas blancas en la tierra hÃºmeda inferior.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Los antiguos sabios mayas usaban palos rÃºsticos cruzados simples con muescas como simples herramientas visuales manuales prÃ¡cticas, colocados frente a puertas cuadradadas alineadas. Desde un punto oscuro fijo y un palo cruzado en X adelante, creaban un sistema de punterÃ­a efectivo barato, muy parecido a las miras pequeÃ±as de los rifles largos modernos que alinean un pequeÃ±o tubo metÃ¡lico para enfocar puntos lejanos oscuros precisamente.' },
      { label: 'Uso PrÃ¡ctico', icon: 'atom', text: 'AÃºn hoy en tiempos rÃ¡pidos modernos en partes apartadas silenciosas y remotas de las selvas hÃºmedas mexicanas sureÃ±as grandes, algunas viejas personas campesinas usan la sombra larga blanca y el cambio angular que hace la galaxia nocturna blanca como indicador Ãºtil bÃ¡sico para predecir lluvia mojada pesada sobre los campos de granja.' }
    ],
    fact: 'Un arqueÃ³logo moderno famoso llamado Anthony Aveni usÃ³ grandes computadoras potentes digitales rÃ¡pidas con datos viejos astronÃ³micos y logrÃ³ descubrir asombrado que las avenidas principales amplias peatonales en la gran metrÃ³polis de Teotihuacan lejana en MÃ©xico grande se alineaban intencionalmente a la perfecciÃ³n con el hundimiento profundo de la gran VÃ­a LÃ¡ctea lejana hace casi ya cerca de largos dos mil pesados aÃ±os.'
  },
  {
    id: 'popol-vuh-cielo',
    title: 'El Popol Vuh y el Cielo',
    color: '#212121',
    btnImage: '/assets/maya/infographic_m9/btn_popol-vuh-cielo.jpg',
    image: '/assets/maya/infographic_m9/hero_popol-vuh-cielo.jpg',
    content: [
      'El libro mÃ¡s famoso de los mayas antiguos se llama el Popol Vuh. Aunque puede parecer un cuento lleno de monstruos mÃ¡gicos y aventuras sobre dos gemelos jÃ³venes que viajan bajo tierra para jugar un peligroso juego de pelota contra los seÃ±ores de la muerte, en realidad es mucho mÃ¡s. Este libro antiguo es un complejo mapa de ciencias del cielo disfrazado de un relato fantÃ¡stico misterioso. Cada uno de los personajes heroicos principales en sus densas pÃ¡ginas corresponde a algo que puedes ver si observas bien el cielo nocturno estrellado.',
      'En la historia, los Gemelos HÃ©roes bajan al peligroso XibalbÃ¡ para jugar contra reyes engaÃ±osos. Los astrÃ³nomos descubrieron que el viaje de estos muchachos valientes coincide con la manera en que el sol y la luna viajan en el cielo y desaparecen bajo el horizonte. Cuando el sol se oculta, decÃ­an que estaba entrando al mundo subterrÃ¡neo de los muertos para luchar durante la noche, para poder nacer triunfante como luz nueva al amanecer.',
      'Los grandes personajes monstruosos de esta gran historia del cielo tambiÃ©n tienen identidades astronÃ³micas precisas. Un personaje terrible que se llama Siete Guacamayo gigante, un ave fanfarrona, fingÃ­a ser el verdadero sol en una Ã©poca oscura. El mito habla de cÃ³mo los jÃ³venes hÃ©roes le disparan y el ave herida cae. Esto describe el movimiento de las estrellas brillantes que forman la Osa Mayor moderna cuando caen hacia el horizonte norte.',
      'Hasta el momento central cuando los valientes niÃ±os patean mÃ¡gicamente la gran pelota rebotadora para ganar, se sincroniza asombrosamente bien con los grandes ciclos astronÃ³micos. Los movimientos estelares de Venus radiante brillante se pueden medir tan exactamente mediante estos viejos mitos, que los viejos cuentos poÃ©ticos se convierten en una gran enciclopedia cientÃ­fica de astronomÃ­a. El conocimiento empÃ­rico fue empacado en cuentos emocionantes para la gente.',
      'Los mayas fueron sabios brillantes. Al contar un cuento emocionante, lograron que un conocimiento astronÃ³mico complejo pasara de abuelos a nietos durante cientos de aÃ±os. Entender esto prueba que la ciencia matemÃ¡tica no es un invento reciente. Siempre ha estado escondida en las grandes historias antiguas que contamos bajo el cielo. Wakah Chan, la enorme VÃ­a LÃ¡ctea, no era solo decoraciÃ³n. Era el escenario de la primera gran ciencia humana en el misterioso continente americano.'
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El texto del Popol Vuh casi se perdiÃ³ en el tiempo. Solo sobreviviÃ³ porque un sacerdote europeo en Guatemala, llamado Francisco XimÃ©nez, escuchÃ³ las historias, copiÃ³ un manuscrito oculto y lo tradujo. Sin ese momento de suerte, no sabrÃ­amos nada de esta conexiÃ³n astronÃ³mica que inventaron los antiguos pueblos de AmÃ©rica. Hoy es nuestro mayor tesoro.' },
      { label: 'ConexiÃ³n Cultural', icon: 'clock', text: 'Para estudiar ciencia hoy, nosotros vamos a aulas cerradas con pizarras blancas. Para aprender ciencia en la selva antigua, las personas se reunÃ­an alrededor del fuego para escuchar cantos. La historia poÃ©tica y el mito colorido eran la mejor manera de guardar informaciÃ³n compleja sobre la rotaciÃ³n terrestre en su memoria.' }
    ],
    fact: 'En muchas lenguas mayas indÃ­genas, la palabra para decir sol, la palabra para decir dÃ­a y la palabra para nombrar el concepto abstracto del tiempo son exactamente la misma palabra corta: K\'in. Esta antigua palabra de una sÃ­laba resume perfectamente su ciencia astronÃ³mica. EntendÃ­an que el movimiento de los astros brillantes en el firmamento oscuro, la duraciÃ³n de nuestras pequeÃ±as vidas mortales y el avance del tiempo eran todo la misma fuerza giratoria.'
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

// â”€â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
        <text x="300" y="105" textAnchor="middle" fill="rgba(255,213,79,0.9)" fontSize="12" fontFamily="monospace" letterSpacing="2">EL ÃRBOL CÃ“SMICO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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

// â”€â”€â”€ Expandable Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ProgressBar({ nodes, activeNodeId }) {
  const activeIndex = nodes.findIndex(n => n.id === activeNodeId);
  const progress = activeIndex === -1 ? 0 : (activeIndex + 1) / nodes.length;

  return (
    <div style={{ margin: '2rem auto 0', maxWidth: '400px', width: '100%', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>
          MÃ“DULO 9
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

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
          <h4 style={{ color: 'rgba(255,255,255,0.9)', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>BibliografÃ­a y Fuentes AcadÃ©micas</h4>
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
