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
  'wakah-chan-arbol': [DecoCeibaTree, DecoMilkyWay, DecoThreeLevels],'via-lactea-maya': [DecoMilkyWay, DecoCrocodile, DecoCanoe],
  'canoa-cosmica': [DecoCanoe, DecoMilkyWay, DecoCrocodile],
  'ceiba-sagrada': [DecoCeibaTree, DecoThreeLevels, DecoMilkyWay],'tres-niveles': [DecoThreeLevels, DecoCeibaTree, DecoMilkyWay],'orientacion-nocturna': [DecoMilkyWay, DecoCeibaTree, DecoCanoe],
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
    "id": "wakah-chan-arbol",
    diagramImage: '/assets/maya/infographic_m9/diagram_wakah-chan-arbol.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Wakah Chan: El Árbol Cósmico',
    "bannerImage": "/assets/maya/infographic_m9/banner_wakah-chan-arbol.webp",
    "title": "Wakah Chan: El Árbol Cósmico",
    "color": "#CFD8DC",
    "btnImage": "/assets/maya/infographic_m9/btn_wakah-chan-arbol.jpg",
    "image": "/assets/maya/infographic_m9/hero_wakah-chan-arbol.jpg",
    "content": [
      "Para la civilización maya del periodo Clásico (250 a 900 d.C.), el universo no era un espacio vacío e inerte, sino una estructura viva orientada por un eje vertical llamado Wakah Chan, traducido como «Cielo Elevado» o «Árbol Erguido». Este pilar cósmico conectaba el inframundo subterráneo, la superficie terrestre y las trece capas celestiales, sirviendo como canal de comunicación entre los dioses creadores y los gobernantes mortales.",
      "Los sacerdotes astrónomos de centros ceremoniales como Tikal, Palenque y Copán identificaron visualmente este árbol cósmico con la banda brillante de la Vía Láctea cuando cruza verticalmente la bóveda celeste de norte a sur. Durante ciertas épocas del año, la galaxia parece alzarse directamente desde el horizonte nocturno, simulando el tronco de una ceiba colosal cuyas ramas sostienen el firmamento y cuyas raíces penetran en la oscuridad telúrica.",
      "En los monumentos de piedra esculpidos en el Petén guatemalteco y las tierras bajas de Chiapas, los reyes mayas eran retratados portando cetros ceremoniales y vestimentas que personificaban al Wakah Chan. Al colocarse en el centro de las plazas ceremoniales orientadas hacia los puntos cardinales, el soberano k'uhul ajaw se transformaba en el eje viviente del mundo, capaz de sostener el orden cósmico mediante rituales de autosacrificio y plegarias astronómicas.",
      "Las investigaciones arqueoastronómicas dirigidas por especialistas como Anthony Aveni y Linda Schele demostraron que las representaciones del árbol sagrado en estelas y cerámicas polícromas coinciden con posiciones estelares observables a simple vista. La hendidura visible en la Gran Nebulosa Oscura de la Vía Láctea, cercana a las constelaciones modernas de Sagitario y Escorpio, era concebida como la entrada primordial al reino subterráneo de Xibalbá.",
      "El simbolismo del Wakah Chan no solo explicaba la génesis mítica, sino que regulaba la arquitectura urbana y los ciclos agrícolas en Mesoamérica. Las pirámides mayas eran erigidas como montañas artificiales o witz que emulaban este árbol celestial, elevando los santuarios hacia las alturas del cielo para facilitar la observación de los solsticios, los tránsitos cenitales solares y el movimiento constante de las constelaciones nocturnas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el famoso sarcófago de K'inich Janaab' Pakal en Palenque, tallado en caliza hacia el año 683 d.C., el emperador aparece recostado en la base del Wakah Chan. De su pecho surge el árbol cósmico cruciforme rematado por el ave celestial Itzamye, simbolizando su renacimiento triunfal hacia los cielos superiores como el dios del maíz divinizado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La banda de la Vía Láctea contiene entre 100,000 y 400,000 millones de estrellas y abarca un diámetro aproximado de 100,000 años luz. Los astrónomos mayas lograron cartografiar su desplazamiento visual y sus nubes de polvo interestelar sin telescopios, utilizando únicamente gnomones de madera, miras de piedra tallada y una observación sistemática transmitida por generaciones."
      }
    ],
    "fact": "El eje de la Vía Láctea se alinea de forma casi perfectamente vertical de norte a sur sobre las latitudes mayas de la península de Yucatán (entre 17° y 21° de latitud norte) durante las medianoches de los meses de abril y mayo, marcando con exactitud matemática el inicio de la temporada de lluvias y la germinación del maíz en Mesoamérica."
  },
  {
    "id": "via-lactea-maya",
    diagramImage: '/assets/maya/infographic_m9/diagram_via-lactea-maya.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Vía Láctea Maya',
    "bannerImage": "/assets/maya/infographic_m9/banner_via-lactea-maya.webp",
    "title": "La Vía Láctea Maya",
    "color": "#4A148C",
    "btnImage": "/assets/maya/infographic_m9/btn_via-lactea-maya.jpg",
    "image": "/assets/maya/infographic_m9/hero_via-lactea-maya.jpg",
    "content": [
      "En la cosmovisión astronómica maya, la Vía Láctea recibía múltiples nombres y metáforas según su posición angular respecto al horizonte terrestre. Durante las noches de invierno, cuando cruza el firmamento de este a oeste, los observadores del periodo Clásico la denominaban Sak Beh o «Camino Blanco», la calzada luminosa por donde transitaban las almas de los ancestros fallecidos y los héroes legendarios hacia sus moradas eternas.",
      "Cuando la rotación terrestre hace que la Vía Láctea gire sobre la bóveda y se incline hacia el norte, los textos jeroglíficos la identificaban con una gigantesca serpiente bicéfala celestial. Este reptil cósmico, adornado con escamas de estrellas y glifos celestes, derramaba periódicamente líquidos sagrados sobre la tierra en forma de rocío y tormentas benéficas indispensables para la supervivencia de las comunidades agrícolas mesoamericanas.",
      "Un rasgo sobresaliente de la arqueoastronomía maya fue su atención rigurosa a las zonas oscuras de la galaxia, conocidas hoy como nebulosas de absorción interestelar compuestas de gas frío y polvo cósmico denso. En lugar de limitarse a trazar figuras uniendo estrellas brillantes, los sabios de ciudades como Calakmul y Yaxchilán delinearon constelaciones oscuras sobre la Gran Grieta galáctica, identificando animales míticos y deidades tutelares.",
      "La bifurcación oscura que se extiende desde la constelación de Cygnus hasta la constelación de Escorpio era interpretada como el cruce de caminos del inframundo o Xibalbá Be. Según los relatos del Popol Vuh, los gemelos divinos Hunahpú e Ixbalanqué debieron recorrer este sendero tenebroso de bifurcaciones celestiales para enfrentar y derrotar en el juego ritual de pelota a los soberbios señores de la muerte y la enfermedad.",
      "Los escribas y astrónomos mayas plasmaron estos movimientos galácticos en códices de papel amate plegado y en vasijas funerarias de estilo códice procedentes de la cuenca de El Mirador. La precisión de sus registros calendáricos demuestra que comprendían los ciclos anuales de traslación terrestre a través de las variaciones estacionales del arco galáctico, utilizándolo como una escala temporal de inmensa magnitud cósmica."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En varios vasos cerámicos del periodo Clásico Tardío (600 a 800 d.C.), la Gran Grieta de la Vía Láctea aparece dibujada como la mandíbula abierta de un monstruo reptil cósmico. Esta colosal boca telúrica tragaba al Sol durante el atardecer y permitía que los astros realizaran su peligroso periplo nocturno a través de las oscuras aguas subterráneas antes del amanecer."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La Gran Nebulosa Oscura de la Vía Láctea está formada por densas nubes moleculares de polvo y gas que bloquean la radiación electromagnética visible de las estrellas ubicadas detrás de ellas. Esta estructura galáctica se extiende por más de mil años luz de longitud y su centro aparente coincide en coordenadas celestes con el agujero negro supermasivo Sagitario A*, el corazón de nuestra galaxia."
      }
    ],
    "fact": "La Vía Láctea completa una rotación visual de 360 grados respecto al horizonte terrestre cada 23 horas y 56 minutos debido al día sidéreo de la Tierra. Los astrónomos mayas registraron con asombrosa constancia este desplazamiento continuo mediante postes indicadores y alineaciones arquitectónicas fijadas en plataformas ceremoniales de caliza."
  },
  {
    "id": "canoa-cosmica",
    diagramImage: '/assets/maya/infographic_m9/diagram_canoa-cosmica.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Canoa Cósmica',
    "bannerImage": "/assets/maya/infographic_m9/banner_canoa-cosmica.webp",
    "title": "La Canoa Cósmica",
    "color": "#0277BD",
    "btnImage": "/assets/maya/infographic_m9/btn_canoa-cosmica.jpg",
    "image": "/assets/maya/infographic_m9/hero_canoa-cosmica.jpg",
    "content": [
      "Uno de los mitos astronómicos más bellos y complejos del periodo Clásico maya representa a la Vía Láctea inclinándose hacia el horizonte como una gran canoa cósmica que surca las aguas primordiales del cielo. Esta embarcación estelar es piloteada por dos deidades ancianas conocidas por los epigrafistas como los Dioses Remeros: el Remero Raya, asociado al oeste y la noche, y el Remero Jaguar, vinculado al este y la radiación solar diurna.",
      "En el centro de la embarcación viaja el Dios del Maíz, una de las figuras esenciales de la teología maya, quien inicia su travesía hacia el lugar mítico de su muerte ritual y posterior resurrección. Conforme la Vía Láctea avanza durante la noche y desciende horizontalmente sobre el horizonte occidental, la canoa parece hundirse bajo el mar primordial, simbolizando el tránsito inevitable del grano de maíz depositado en la tierra antes de brotar.",
      "Esta escena fue descubierta de forma magistral en los huesos grabados hallados dentro del Entierro 116 de Tikal, correspondiente a la suntuosa sepultura del soberano Jasaw Chan K'awiil I, fallecido en 734 d.C. Los grabados en hueso de jaguar y venado exhiben con asombroso detalle la canoa en descenso cargada con diversos animales sagrados: un mono aullador, una iguana, un perro de aguas y un loro, todos acompañando la metamorfosis del dios.",
      "Arqueoastrónomos contemporáneos han vinculado directamente esta narrativa visual con el fenómeno astronómico que ocurre a finales del verano. Hacia el mes de agosto, la Vía Láctea se posiciona al atardecer en sentido cenital y, al paso de las horas, desciende en un arco horizontal hasta tocar el horizonte noroeste cerca de la medianoche, escenificando con fidelidad astronómica el mítico hundimiento de la canoa celeste en las aguas cósmicas.",
      "La correspondencia entre el mito de la canoa y los ciclos agrícolas reafirma que para los mayas la ciencia astronómica y la religión formaban una unidad indivisible. Cada movimiento observable de los cuerpos celestes aportaba una guía cronológica exacta para las faenas de roza, quema y cosecha, protegiendo a la sociedad civil de hambrunas mediante una estricta planificación basada en las leyes inmutables del firmamento observable."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los Dioses Remeros grabados en las piezas óseas de Tikal muestran signos de ancianidad con rostros arrugados y ojos saltones característicos de los seres primordiales. Los textos jeroglíficos detallan que estos ancianos eternos fueron convocados el 13 de agosto del 3114 a.C., la fecha inicial de la Cuenta Larga maya, para colocar las piedras sagradas del hogar cósmico primordial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El fenómeno de precesión de los equinoccios modifica gradualmente la orientación aparente de las constelaciones a razón de un grado cada 71.6 años terrestres. Hace 1,300 años, durante el reinado de Jasaw Chan K'awiil I en Tikal, la inclinación de la Vía Láctea al anochecer en agosto era perceptiblemente más pronunciada que en la actualidad, coincidiendo de forma todavía más exacta con el mito fluvial."
      }
    ],
    "fact": "El hueso tallado con el dibujo de la Canoa Cósmica recuperado en el Entierro 116 de Tikal mide apenas 23 centímetros de largo. En ese reducido espacio de materia orgánica fosilizada, un artista maya plasmó una escena cósmica completa que resume la traslación galáctica, la teología del grano de maíz y la legitimidad divina de la dinastía reinante."
  },
  {
    "id": "ceiba-sagrada",
    diagramImage: '/assets/maya/infographic_m9/diagram_ceiba-sagrada.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Ceiba Sagrada',
    "bannerImage": "/assets/maya/infographic_m9/banner_ceiba-sagrada.webp",
    "title": "La Ceiba Sagrada",
    "color": "#1B5E20",
    "btnImage": "/assets/maya/infographic_m9/btn_ceiba-sagrada.jpg",
    "image": "/assets/maya/infographic_m9/hero_ceiba-sagrada.jpg",
    "content": [
      "La ceiba pentandra, conocida en lengua maya yucateca como Ya'axche o «Primer Árbol Verde», es una especie botánica gigantesca que alcanza alturas de hasta 70 metros y desarrolla majestuosas raíces tabulares en la selva tropical. Para los sacerdotes y constructores mayas, este árbol no era un vegetal común, sino el modelo viviente del universo que materializaba en el plano terrenal la geometría sagrada del Árbol Cósmico Wakah Chan.",
      "Según la tradición cosmológica mesoamericana, en el momento primordial de la creación los dioses plantaron cuatro ceibas sagradas en las cuatro esquinas del mundo para delimitar los rumbos cardinales: la ceiba roja en el este, la blanca en el norte, la negra en el oeste y la amarilla en el sur. En el punto medio exacto sembraron la Gran Ceiba Verde central, elevando el cielo para evitar que colapsara sobre la superficie terrestre.",
      "Las ramas superiores de la ceiba penetraban en los trece estratos del Oxlahuntik'in o supra-mundo celeste, donde habitaban los dioses creadores y los astros luminosos como el Sol diurno y Venus. Sus raíces colosales, por el contrario, descendían a través de las nueve capas cavernosas del Bolontik'in o inframundo de Xibalbá, creando una vía de comunicación vertical indispensable para la circulación de la energía cósmica y las plegarias.",
      "La arquitectura de las grandes metrópolis del Clásico, como Calakmul en Campeche o Cobá en Quintana Roo, emulaba físicamente esta distribución arbórea. Las pirámides truncadas imitaban los troncos escalonados de las ceibas, mientras que los templos superiores actuaban como el follaje verde desde el cual los sacerdotes vigilaban la aparición de las estrellas guía, monitoreando las estaciones del año con instrumental lítico calibrado.",
      "La veneración hacia la ceiba sagrada sobrevivió a la conquista militar española y aún persiste viva entre las comunidades mayas contemporáneas de los Altos de Chiapas y la península de Yucatán. Hoy en día, cortar una ceiba sin solicitar permiso formal a los espíritus guardianes del monte mediante ofrendas ceremoniales es considerado una falta grave que altera el equilibrio ecológico y espiritual de las comunidades tradicionales."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las semillas de la Ceiba pentandra están envueltas en una fibra sedosa e impermeable llamada capoc. Los antiguos mayas utilizaban este material ligero para amortiguar recipientes ceremoniales y transportar ofrendas delicadas, asociando la suave fibra blanca con las nubes algodonosas que descienden sobre la bóveda celeste durante las mañanas brumosas de la selva tropical."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un ejemplar maduro de Ceiba pentandra puede absorber más de 1,000 litros de agua al día y transpirarla hacia la atmósfera mediante evapotranspiración. Este fenómeno biológico colosal genera microclimas húmedos y nubes bajas sobre las copas de la selva, un hecho ecológico observable que los sacerdotes mayas relacionaban con el poder del árbol cósmico para atraer las lluvias celestiales."
      }
    ],
    "fact": "La copa de una ceiba madura puede alcanzar un diámetro de más de 40 metros y albergar un ecosistema microscópico y macroscópico con más de 200 especies diferentes de epífitas, orquídeas, aves nocturnas, murciélagos polinizadores e insectos, funcionando como un verdadero cosmos viviente suspendido entre el suelo y el cielo de la selva maya."
  },
  {
    "id": "tres-niveles",
    diagramImage: '/assets/maya/infographic_m9/diagram_tres-niveles.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Los Tres Niveles del Cosmos',
    "bannerImage": "/assets/maya/infographic_m9/banner_tres-niveles.webp",
    "title": "Los Tres Niveles del Cosmos",
    "color": "#FFD54F",
    "btnImage": "/assets/maya/infographic_m9/btn_tres-niveles.jpg",
    "image": "/assets/maya/infographic_m9/hero_tres-niveles.jpg",
    "content": [
      "La arquitectura del cosmos maya estaba dividida rigurosamente en tres estratos superpuestos y complementarios: el mundo celeste superior (Cab), la superficie terrestre intermedia y el reino subterráneo e hídrico del inframundo (Xibalbá). Lejos de representar un modelo estático, estos tres reinos estaban entrelazados por una dinámica constante de ciclos temporales, donde la muerte en un estrato posibilitaba la vida en el siguiente.",
      "El plano celeste superior constaba de trece niveles escalonados gobernados por una asamblea de deidades conocidas colectivamente como Oxlahuntik'u. En este cielo diáfano transitaban el Sol, la Luna, los planetas visibles a simple vista y las constelaciones zodiacales mayas. Cada nivel celeste poseía características espirituales y meteorológicas propias que influían directamente en los destinos humanos y en los pronósticos adivinatorios.",
      "La superficie terrestre habitada por los seres humanos era concebida como el lomo rugoso de un reptil cósmico gigantesco, una tortuga o un cocodrilo mitológico flotando sobre una inmensa laguna de nenúfares. Las montañas eran consideradas pirámides naturales sagradas llamadas witz, y las cuevas y cenotes eran bocas abiertas y conductos hidrogeológicos que conducían de forma directa a las profundidades secretas del inframundo maya.",
      "El inframundo o Xibalbá comprendía nueve estratos subterráneos regidos por los temibles señores Bolontik'u. Este mundo no era un infierno de castigo moral, sino un húmedo útero primordial donde la materia orgánica se descomponía para renacer. Cada atardecer, el Sol K'inich Ahau descendía en las fauces de Xibalbá transformándose en un jaguar nocturno que combatía en la oscuridad para renacer victorioso al alba por el horizonte oriental.",
      "Los sacerdotes astrónomos unificaron este esquema tridimensional con el calendario ritual de 260 días (Tzolk'in), que multiplicaba los 13 números celestes por los 20 signos diarios terrestres. Asimismo, estructuraron los enterramientos reales de las élites dinásticas dentro del lecho rocoso de las pirámides, garantizando que el gobernante fallecido cruzara los nueve estratos oscuros para ascender triunfante hacia los trece cielos."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el sitio arqueológico de Copán, Honduras, los arqueólogos hallaron altares tallados con la forma de un cocodrilo cósmico flotante. En su lomo vegetal brotan flores de loto y lirios de agua que representan la fertilidad del suelo, confirmando cómo los sabios mayas unían la biología local de los humedales con la estructura general del universo tridimensional."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La península de Yucatán está formada por una gigantesca plataforma de roca caliza permeable con más de 7,000 cenotes interconectados por ríos subterráneos. Los mayas no poseían ríos superficiales en el norte, por lo que su cosmovisión de un inframundo acuático navegable reflejaba de forma fidedigna la estructura hidrogeológica kárstica real de su territorio geográfico."
      }
    ],
    "fact": "La suma de los 13 niveles celestiales del Oxlahuntik'u y los 9 niveles del inframundo de Xibalbá equivale a 22 estratos cósmicos invisibles que rodean a la superficie terrestre intermedia. Los números 13 y 9 se repiten de forma deliberada en las proporciones métricas, número de terrazas y escalones de templos en Tikal, Palenque y Chichén Itzá."
  },
  {
    "id": "orientacion-nocturna",
    diagramImage: '/assets/maya/infographic_m9/diagram_orientacion-nocturna.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Orientación Nocturna',
    "bannerImage": "/assets/maya/infographic_m9/banner_orientacion-nocturna.webp",
    "title": "Orientación Nocturna",
    "color": "#4E342E",
    "btnImage": "/assets/maya/infographic_m9/btn_orientacion-nocturna.jpg",
    "image": "/assets/maya/infographic_m9/hero_orientacion-nocturna.jpg",
    "content": [
      "La observación sistemática de la noche permitió a los navegantes, cazadores y sacerdotes mayas orientarse con precisión matemática en medio de la densa y uniforme selva tropical. Al carecer de brújulas magnéticas, los mayas utilizaron la estrella polar norte (conocida como Xaman Ek' o la Estrella del Norte) y las constelaciones circumpolares como referencias angulares fijas para definir las rutas comerciales y la traza urbana.",
      "Xaman Ek' era venerada como la deidad protectora de los comerciantes y viajeros que recorrían miles de kilómetros a pie transportando sal, obsidiana, cacao y jade a lo largo de Mesoamérica. Debido a su aparente inmovilidad en el cielo del hemisferio norte, este astro servía como un faro celestial inmutable, asegurando que las caravanas mercantiles no perdieran el rumbo en travesías nocturnas realizadas para eludir el sofocante calor diurno.",
      "Para medir los ángulos astronómicos sin instrumental óptico moderno, los sabios mayas idearon herramientas visuales de extraordinaria sencillez y efectividad geométrica. Cruzaban dos varas delgadas de madera o caña dentro del vano de una ventana o pórtico de observación, creando una retícula fija que permitía encuadrar el horizonte y marcar con exactitud el instante en que un cuerpo celeste cruzaba el meridiano local del observador.",
      "Ciudades enteras fueron diseñadas conforme a estas directrices estelares. En sitios como Copán, Uaxactún y Mayapán, las calzadas monumentales de piedra caliza blanca (sacbeob) y los muros de los palacios presentan desviaciones deliberadas de unos pocos grados respecto al norte geográfico verdadero, alineándose intencionalmente hacia ortos estelares significativos o hacia las posiciones extremas de constelaciones clave.",
      "La regularidad de las constelaciones estacionales funcionaba además como un reloj nocturno de alta fiabilidad. Al observar qué grupo de estrellas culminaba en el cenit a la medianoche, los vigías sacerdotales calculaban las horas nocturnas restantes, organizaban los turnos de guardia militar y determinaban el momento exacto para iniciar las ceremonias de encendido de antorchas y sacrificios previos a la salida del Sol matutino."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los textos jeroglíficos y representaciones pictóricas, Xaman Ek' aparece con frecuencia dibujada con la nariz chata y los rasgos distintivos de un mono aullador benévolo. Los sacerdotes la llamaban «la guía de los caminantes», ya que era el único punto de luz en la bóveda nocturna que permanecía fijo mientras todas las demás estrellas giraban a su alrededor."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En el año 700 d.C., la estrella Polaris actual no era el polo norte celeste exacto debido a la precesión del eje terrestre, cuyo ciclo dura 25,772 años. En la época clásica maya, el punto inmóvil del firmamento norte se encontraba a varios grados de distancia, cerca de la constelación de Draco, una sutil variación angular que los astrónomos mayas compensaban en sus cálculos empíricos."
      }
    ],
    "fact": "La latitud geográfica de ciudades mayas centrales como Tikal (17° 13' N) permitía observar tanto las estrellas circumpolares del norte como la resplandeciente constelación de la Cruz del Sur en el horizonte meridional. Esta doble visibilidad otorgaba a los astrónomos mayas un dominio astronómico excepcional de ambos hemisferios celestes simultáneamente."
  },
  {
    "id": "popol-vuh-cielo",
    diagramImage: '/assets/maya/infographic_m9/diagram_popol-vuh-cielo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Popol Vuh y el Cielo',
    "bannerImage": "/assets/maya/infographic_m9/banner_popol-vuh-cielo.webp",
    "title": "El Popol Vuh y el Cielo",
    "color": "#212121",
    "btnImage": "/assets/maya/infographic_m9/btn_popol-vuh-cielo.jpg",
    "image": "/assets/maya/infographic_m9/hero_popol-vuh-cielo.jpg",
    "content": [
      "El Popol Vuh o «Libro del Consejo», texto sagrado conservado por los mayas k'iche' de las tierras altas de Guatemala, constituye una de las obras cumbres de la literatura universal y un testimonio astronómico de primer orden. Aunque fue redactado en caracteres latinos a mediados del siglo XVI por nobles indígenas cristianizados y copiado por Fray Francisco Ximénez hacia 1701, sus mitos hunden sus raíces en el periodo Clásico mesoamericano.",
      "Los epigrafistas modernos, entre ellos Dennis Tedlock y Michael Coe, demostraron que las hazañas de los héroes míticos narradas en el texto corresponden con precisión a ciclos astronómicos observables. La lucha de los gemelos Hunahpú e Ixbalanqué contra los señores de Xibalbá no es una fábula moral desprovista de contexto empírico, sino una alegoría cosmológica que codifica los movimientos del Sol, la Luna, Venus y la Vía Láctea.",
      "El soberbio monstruo pájaro Vucub Caquix («Siete Guacamaya»), quien pretendía iluminar el mundo antes de la creación del Sol verdadero, representa a la constelación de la Osa Mayor. Cuando los gemelos divinos le disparan con su cerbatana derribándolo de su árbol cósmico de nance, el mito describe con fidelidad arqueoastronómica el descenso estacional de la Osa Mayor bajo el horizonte septentrional al inicio de la temporada de secas.",
      "Tras vencer las pruebas mortales de la Casa Oscura, la Casa de las Navajas y la Casa de los Murciélagos en el inframundo, los gemelos divinos ascienden triunfalmente al cielo. Hunahpú se transforma en el Sol viviente y dador de energía diurna, mientras que su hermano gemelo Ixbalanqué se convierte en la Luna llena o, según análisis iconográficos alternativos, en el resplandeciente lucero matutino del planeta Venus.",
      "Esta mitología estelar quedaba grabada de forma permanente en las plazas de juego de pelota de ciudades como Copán y Yaxchilán, donde los marcadores centrales de piedra escenificaban los enfrentamientos celestes. Jugar a la pelota con un esférico de hule macizo era recrear el pulso cósmico del universo, garantizando que los cuerpos celestes continuaran su trayectoria cíclica indispensable para la regeneración de la vida biológica."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En vasijas funerarias polícromas pintadas mil años antes de la transcripción colonial del Popol Vuh, ya aparecen retratados los gemelos Hunahpú e Ixbalanqué con sus cerbatanas disparando contra un ave monstruosa posada en la copa de un árbol cósmico. Esto comprueba que la tradición mitológica y astronómica maya se transmitió intacta durante milenios."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La declinación aparente de las estrellas que componen la Osa Mayor (Vucub Caquix) provocaba que, en las latitudes mesoamericanas del año 500 d.C., el asterismo tocara el horizonte norte y desapareciera de la vista nocturna durante el mes de octubre, un fenómeno celeste regular que coincide exactamente con el momento en que el mito relata la caída y derrota del falso sol."
      }
    ],
    "fact": "El manuscrito del Popol Vuh rescatado por el fraile dominico Francisco Ximénez en el pueblo de Chichicastenango consta de 112 folios escritos a doble columna en lengua k'iche' y traducción al español. Actualmente se preserva en la Biblioteca Newberry de Chicago, consolidado como una enciclopedia invaluable de la mitología astronómica mesoamericana."
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
        <text x="300" y="105" textAnchor="middle" fill="rgba(255,213,79,0.9)" fontSize="12" fontFamily="monospace" letterSpacing="2">EL ÁRBOL CÓSMICO</text>
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
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

              {node.bannerImage && (
                <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                  <img src={node.bannerImage} alt={node.bannerCaption || ''}
                       style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                  {node.bannerCaption && (
                    <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                                fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {node.bannerCaption}
                    </p>
                  )}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

                </div>
              )}
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
