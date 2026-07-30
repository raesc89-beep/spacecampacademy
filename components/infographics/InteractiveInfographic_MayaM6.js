'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya / Dzibilchaltun themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoTemple7({ size = 70, color = '#ECEFF1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 50 L50 50 L50 45 L45 45 L45 30 L40 30 L40 20 L35 20 L35 10 L25 10 L25 20 L20 20 L20 30 L15 30 L15 45 L10 45 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <rect x="25" y="35" width="10" height="15" fill={color} opacity="0.4" />
      <circle cx="30" cy="15" r="2" fill={color} />
      <line x1="20" y1="50" x2="20" y2="55" stroke={color} strokeWidth="2" />
      <line x1="40" y1="50" x2="40" y2="55" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoCenote({ size = 70, color = '#0097A7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="18" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="30" cy="30" rx="10" ry="4" fill={color} opacity="0.4" />
      <path d="M5 30 Q 15 45 30 50 Q 45 45 55 30" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="15" cy="30" r="1.5" fill={color} />
      <circle cx="45" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="40" r="1" fill={color} />
    </svg>
  );
}

function DecoSacbe({ size = 80, color = '#FFE0B2', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M10 35 L35 5 L45 5 L70 35" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="15" y1="30" x2="65" y2="30" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="22" y1="20" x2="58" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="28" y1="12" x2="52" y2="12" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <rect x="38" y="10" width="4" height="2" fill={color} opacity="0.5" />
      <rect x="35" y="18" width="6" height="3" fill={color} opacity="0.5" />
      <rect x="30" y="28" width="10" height="4" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSunDoor({ size = 70, color = '#FFC400', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="20" width="20" height="30" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="35" r="8" fill={color} opacity="0.5" />
      <path d="M30 15 L30 5 M45 35 L55 35 M15 35 L5 35" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 22 L50 15 M18 22 L10 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 48 L50 55 M18 48 L10 55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoFigurine({ size = 60, color = '#BF360C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="15" rx="8" ry="10" fill="none" stroke={color} strokeWidth="2" />
      <path d="M22 25 C10 30 15 45 20 45 L40 45 C45 45 50 30 38 25" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="27" cy="13" r="1" fill={color} />
      <circle cx="33" cy="13" r="1" fill={color} />
      <path d="M28 18 Q30 20 32 18" fill="none" stroke={color} strokeWidth="1" />
      <rect x="25" y="25" width="10" height="15" fill={color} opacity="0.3" rx="2" />
      <line x1="30" y1="45" x2="25" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="45" x2="35" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const DECO_MAP = {
  'dzibilchaltun-sitio': [DecoTemple7, DecoSacbe, DecoCenote],
  'templo-munecos': [DecoFigurine, DecoTemple7, DecoSunDoor],
  'equinoccio-solar': [DecoSunDoor, DecoTemple7, DecoFigurine],
  'solsticio-alineacion': [DecoSunDoor, DecoTemple7, DecoSacbe],
  'sacbe-procesional': [DecoSacbe, DecoTemple7, DecoCenote],
  'cenote-xlakah': [DecoCenote, DecoSacbe, DecoFigurine],
  'restauracion-moderna': [DecoTemple7, DecoSacbe, DecoSunDoor],
};

const BIBLIOGRAPHY = [
  'Andrews, E.W. IV (1965). Archaeology and Prehistory in the Northern Maya Lowlands, HMAI Vol. 2',
  'Galindo Trejo, J. (2009). Arqueoastronomía en la América Antigua, UNAM',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Coggins, C. & Shane, O.C. III (1984). Cenote of Sacrifice: Maya Treasures from the Sacred Well, University of Texas Press',
  'Malmström, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'dzibilchaltun-sitio',
    title: 'El Sitio: Dzibilchaltún',
    color: '#ECEFF1',
    btnImage: '/assets/maya/infographic_m6/btn_dzibilchaltun-sitio.jpg',
    image: '/assets/maya/infographic_m6/hero_dzibilchaltun-sitio.jpg',
    content: [
      'Imagina una ciudad gigante escondida bajo la selva durante miles de años. Dzibilchaltún, cuyo nombre maya significa el "lugar donde hay escritura sobre piedras planas", fue uno de los asentamientos más grandes y antiguos de todo el norte de la península de Yucatán. Los arqueólogos calculan que la gente comenzó a vivir aquí desde el año quinientos antes de Cristo, y el lugar estuvo ocupado sin interrupción hasta que llegaron los conquistadores españoles. Esta ocupación continua es como si tuviéramos una ciudad moderna donde las personas nunca dejaron de construir y remodelar sus casas durante más de dos milenios. Es un testimonio asombroso de la capacidad de adaptación y persistencia de la civilización maya frente a los cambios del clima, la política y los recursos naturales.',
      'El sitio es verdaderamente colosal en su tamaño. Se han descubierto alrededor de ocho mil cuatrocientas estructuras arquitectónicas esparcidas por un área de dieciséis kilómetros cuadrados. Para que te hagas una idea, esto es el equivalente a tener miles de pequeñas casas, templos, plazas y palacios en un área tan grande que te tomaría horas caminar de un extremo al otro. La mayoría de estas estructuras no son pirámides gigantescas como las de Chichén Itzá, sino basamentos de piedra sobre los cuales los antiguos mayas construían sus casas de madera y techos de hojas de palma. Hoy en día, la selva se ha tragado muchas de estas construcciones más pequeñas, pero los expertos han logrado mapearlas meticulosamente para entender cómo funcionaba la ciudad.',
      'La ubicación de Dzibilchaltún no fue un accidente. Los antiguos mayas eran como ingenieros expertos que sabían elegir el mejor terreno. Estaban cerca de la costa del Golfo de México, lo que les permitía comerciar con la valiosa sal marina y obtener mariscos frescos, pero lo suficientemente tierra adentro para protegerse de los peores huracanes y ataques. Además, el subsuelo de piedra caliza plana facilitaba la construcción y el movimiento. El lugar perfecto para fundar una metrópolis próspera. Al igual que nosotros buscamos vivir cerca de buenas carreteras y supermercados, ellos buscaron el equilibrio perfecto entre recursos naturales, rutas comerciales y protección natural.',
      'Uno de los aspectos más fascinantes de Dzibilchaltún es su diseño urbano. A diferencia de nuestras ciudades modernas con calles en forma de cuadrícula (como un tablero de ajedrez), esta ciudad maya estaba organizada en torno a conjuntos de edificios agrupados. Estos grupos se comunicaban mediante caminos elevados de piedra blanca. Cada familia importante o barrio tenía su propia pequeña plaza y santuario. Este tipo de organización refleja cómo los mayas valoraban tanto la comunidad como su relación con el entorno natural circundante, creando un tejido social y urbano completamente diferente al que estamos acostumbrados.',
      'A pesar de su inmenso tamaño, Dzibilchaltún guarda muchos de sus secretos todavía. Durante cientos de años, la naturaleza recuperó su espacio. Los árboles crecieron sobre las plazas y las raíces rompieron las piedras talladas. Cuando los primeros exploradores modernos llegaron al sitio, lo que vieron no fue una ciudad reluciente, sino montículos cubiertos de maleza que parecían pequeñas colinas naturales. Fueron necesarias décadas de trabajo arqueológico paciente, retirando capas de tierra y vegetación, para que la verdadera forma de las estructuras, incluyendo el famoso Templo de las Siete Muñecas, volviera a ver la luz del sol de Yucatán.'
    ],
    expandables: [
      { label: 'Un Nombre Misterioso', icon: 'clock', text: 'El nombre "Dzibilchaltún" no es el nombre original que los antiguos pobladores le daban a la ciudad. En realidad, los arqueólogos modernos adoptaron este nombre basándose en cómo los mayas locales llamaban a la zona debido a unas estelas (piedras grabadas) que se encontraron allí. El verdadero nombre ancestral de esta gigantesca metrópolis sigue siendo un misterio que tal vez nunca lleguemos a conocer con certeza.' },
      { label: 'Comparando Tamaños', icon: 'clock', text: 'Para entender la magnitud de Dzibilchaltún, piensa en que, en su momento de máximo esplendor, la ciudad pudo haber albergado a más de cuarenta mil habitantes. Esto la hacía más grande que muchas ciudades europeas de la misma época. La planificación requerida para alimentar y proporcionar agua a tantas personas en un entorno donde no hay ríos superficiales es un verdadero logro de ingeniería humana.' }
    ],
    fact: 'Una peculiaridad de la región de Dzibilchaltún es la falta absoluta de ríos y lagos en la superficie. Todo el sistema hidráulico de la zona es subterráneo. Esto significa que los mayas dependían completamente de las lluvias y de los cenotes (ojos de agua) para sobrevivir, lo que influyó profundamente en su religión y su veneración por los dioses de la lluvia y el agua.'
  },
  {
    id: 'templo-munecos',
    title: 'El Templo de las 7 Muñecas',
    color: '#BF360C',
    btnImage: '/assets/maya/infographic_m6/btn_templo-munecos.jpg',
    image: '/assets/maya/infographic_m6/hero_templo-munecos.jpg',
    content: [
      'El Templo de las Siete Muñecas es el corazón mágico de Dzibilchaltún. Imagina un edificio que parece un cubo sólido con pequeñas puertas cuadradas y una especie de torre inusual en la parte superior. A diferencia de las famosas pirámides escalonadas que la mayoría de nosotros asocia con los mayas, esta estructura es un basamento pequeño pero impresionantemente robusto. Fue construido alrededor del año ochocientos de nuestra era y tiene cuatro puertas, cada una apuntando de manera súper precisa hacia uno de los cuatro puntos cardinales: norte, sur, este y oeste. Es como si el edificio fuera una brújula gigante de piedra diseñada para interactuar directamente con el movimiento del sol y las estrellas en el firmamento.',
      'El nombre del templo es tan intrigante como el edificio mismo. Cuando los arqueólogos comenzaron a explorar su interior en la década de mil novecientos cincuenta, hicieron un descubrimiento sorprendente bajo el suelo del altar principal. Encontraron exactamente siete figurillas de arcilla toscamente modeladas que representaban formas humanas con características un poco deformes o inusuales. Estas figurillas (que fueron llamadas "muñecas") parecían haber sido colocadas allí intencionalmente como una ofrenda sagrada. Inmediatamente, la prensa y los investigadores empezaron a llamarlo "El Templo de las Siete Muñecas", y el apodo se quedó para siempre, convirtiéndose en el símbolo inconfundible del sitio arqueológico.',
      '¿Pero por qué este edificio es tan diferente? En el mundo de la arquitectura maya, la pequeña torre o "crestería" en forma de ventana cuadrada que corona el techo del templo es completamente única. Ningún otro edificio descubierto hasta la fecha en toda la región maya tiene algo exactamente igual. Los científicos creen que esta torre no solo servía como decoración o para darle mayor altura al templo, sino que formaba parte integral del sofisticado sistema de observación astronómica que los sacerdotes mayas utilizaban para medir el tiempo y registrar el paso de las estaciones a lo largo del año solar.',
      'La construcción de este santuario demuestra un conocimiento matemático y espacial extraordinario. Las paredes están hechas de bloques de piedra caliza perfectamente tallados que encajan unos con otros. Sin embargo, para crear el efecto de luz que veremos más adelante, los constructores tuvieron que calcular los ángulos con una precisión casi milimétrica sin tener telescopios, computadoras, ni láseres modernos. Utilizaron únicamente su observación, palos rectos, cuerdas para medir, y un entendimiento profundo del universo que les rodeaba, transmitido de generación en generación por sabios observadores del cielo.',
      'Con el paso de los siglos, los propios mayas decidieron cubrir el Templo de las Siete Muñecas. Literalmente construyeron un edificio más grande encima de él y lo rellenaron con rocas y tierra, dejándolo escondido como si fuera una cápsula del tiempo. Esta práctica de "superposición" era muy común entre los antiguos mayas; no destruían los edificios sagrados antiguos, sino que los envolvían respetuosamente con construcciones nuevas para renovar su poder. Irónicamente, gracias a que lo taparon por completo, el templo se conservó maravillosamente bien, protegiéndolo de los huracanes y la erosión durante casi mil años.'
    ],
    expandables: [
      { label: 'Las Misteriosas Figurillas', icon: 'atom', text: 'Las siete figurillas de barro encontradas no son muñecas para jugar. Los expertos sugieren que representan a individuos con enfermedades o deformidades físicas. En la cosmovisión maya, las personas que nacían con características inusuales a menudo eran consideradas como tocadas por los dioses o con una conexión especial con el mundo espiritual. Fueron enterradas ritualmente para consagrar el espacio o pedir sanación.' },
      { label: 'Arquitectura Cuadrangular', icon: 'clock', text: 'La forma cuadrada del templo y sus cuatro puertas no son un capricho estético. El número cuatro es uno de los números más sagrados para los mayas. Representa las cuatro esquinas del universo, los cuatro rumbos del cosmos y los cuatro colores principales (rojo, blanco, negro y amarillo) asociados a las deidades que sostenían el cielo y la tierra. El templo es, literalmente, una maqueta del universo en piedra.' }
    ],
    fact: 'El descubrimiento del templo oculto fue una de las sorpresas más grandes de la arqueología moderna. Cuando E. Wyllys Andrews IV excavaba lo que parecía ser una pirámide en ruinas bastante común, notó que había un muro tallado debajo del relleno. Al retirar toneladas de roca con muchísimo cuidado, desenterró un edificio que había permanecido intacto y a oscuras durante siglos.'
  },
  {
    id: 'equinoccio-solar',
    title: 'El Fenómeno del Equinoccio',
    color: '#FFC400',
    btnImage: '/assets/maya/infographic_m6/btn_equinoccio-solar.jpg',
    image: '/assets/maya/infographic_m6/hero_equinoccio-solar.jpg',
    content: [
      'El espectáculo más impresionante del Templo de las Siete Muñecas ocurre durante los equinoccios de primavera y otoño, es decir, alrededor del veinte de marzo y el veintidós de septiembre de cada año. Imagina estar parado frente al templo al amanecer en uno de esos días especiales. Mientras el sol comienza a asomarse por el horizonte oriental, algo mágico sucede: la esfera brillante del sol aparece exactamente en el centro de la puerta del este del templo. La luz penetra directamente por la entrada y cruza todo el edificio de lado a lado, saliendo por la puerta oeste como un poderoso láser dorado antiguo.',
      'Para lograr este efecto visual tan dramático, los arquitectos mayas tuvieron que alinear el edificio de una forma asombrosamente precisa. Un equinoccio es el momento del año en que el sol sale exactamente por el punto cardinal este y se pone exactamente por el punto cardinal oeste, haciendo que el día y la noche duren casi lo mismo en todo el planeta. Que un edificio de piedra capture este preciso instante demuestra que los mayas habían observado el comportamiento del sol durante muchísimos años y calcularon la posición geométrica exacta para construir los muros.',
      'Pero, ¿por qué molestarse en hacer este truco de luz? Para los antiguos mayas, este no era un simple espectáculo de luces, era el momento en el que lo divino se conectaba con la humanidad. El equinoccio de primavera marcaba un punto crucial en el calendario agrícola: el momento de preparar la tierra para la siembra antes de la temporada de lluvias. Ver al sol, que representaba a la deidad solar Kinich Ahau, pasar a través del templo era una señal cósmica de que el tiempo de iniciar el ciclo agrícola había llegado. El templo no solo era una iglesia; era un reloj y un calendario monumental funcional.',
      'El fenómeno es tan exacto que miles de personas se congregan cada año en Dzibilchaltún, a pesar del madrugón y el frío del amanecer, solo para ser testigos de este evento. Cuando el sol se eleva y su luz intensa se enmarca perfectamente en las puertas cuadradas, la multitud suele guardar un silencio reverencial, aplaudir o tocar instrumentos antiguos. Es una experiencia que te hace sentir pequeño y a la vez profundamente conectado con la inteligencia de los astrónomos que vivieron hace más de mil años en esas tierras.',
      'Lo más extraordinario de esta alineación es que no solo depende del edificio, sino del horizonte plano de Yucatán. Como la península no tiene grandes montañas que bloqueen la vista del sol naciente, los mayas podían observar la salida del sol en su punto más bajo y verdadero. Los arqueólogos modernos utilizan teodolitos y herramientas láser de alta tecnología para medir estas alineaciones hoy en día, y resulta increíble constatar que los cálculos de los mayas, hechos a simple vista y con herramientas rudimentarias de medición, tienen un margen de error menor a un grado.'
    ],
    expandables: [
      { label: 'La Importancia Agrícola', icon: 'clock', text: 'En una región donde las estaciones no están marcadas por la nieve o el frío extremo, sino por los periodos de lluvia y sequía, saber exactamente en qué día del año estás es asunto de vida o muerte. Si un agricultor sembraba su maíz antes de tiempo, las semillas se secarían; si lo hacía demasiado tarde, las lluvias inundarían los brotes. El templo del equinoccio les garantizaba que su reloj agrícola no se desfasara jamás.' },
      { label: 'Un Espectáculo Efímero', icon: 'clock', text: 'El paso de la luz a través del templo durante el equinoccio dura apenas unos cuantos minutos. El sol se mueve rápidamente por el cielo al amanecer, y casi tan pronto como se alinea perfectamente con ambas puertas, continúa su ascenso, y el rayo de luz deja de atravesar directamente el centro. Es un momento fugaz que requería que los sacerdotes estuvieran atentos y listos en el instante preciso.' }
    ],
    fact: 'El equinoccio no es el único evento que se observa aquí. Debido a la forma en que los mayas entendían el tiempo como un ciclo interminable y sagrado, cada equinoccio (primavera y otoño) era celebrado con rituales específicos, ofrendas de incienso de copal, música de caracolas marinas y ceremonias para asegurar que el universo siguiera funcionando de manera equilibrada y armónica.'
  },
  {
    id: 'solsticio-alineacion',
    title: 'Los Solsticios: Las Otras Fechas',
    color: '#00B8D4',
    btnImage: '/assets/maya/infographic_m6/btn_solsticio-alineacion.jpg',
    image: '/assets/maya/infographic_m6/hero_solsticio-alineacion.jpg',
    content: [
      'Si el Templo de las Siete Muñecas solo funcionara en los equinoccios, ya sería un logro impresionante. Sin embargo, los astrónomos mayas fueron mucho más ambiciosos. El edificio está diseñado para marcar no dos, sino cuatro fechas críticas del movimiento solar a lo largo del año. Además de los equinoccios, la estructura también interactúa con los solsticios, los días en que el sol alcanza su punto más al norte (en verano) y su punto más al sur (en invierno) del horizonte durante el amanecer y el atardecer.',
      'Durante el solsticio de verano (alrededor del veintiuno de junio), el día más largo del año en el hemisferio norte, si te pones en una posición específica de la plaza frente al templo, verás que el sol no se alinea con la puerta central, sino que parece salir exactamente por una de las esquinas frontales del techo del edificio. Esta alineación no es casualidad; los ángulos de la base y las esquinas de la peculiar torre del templo fueron calculados meticulosamente para que sirvieran como "mirillas" monumentales para el sol en sus posiciones extremas.',
      'Piensa en el edificio como un observatorio astronómico de piedra gigantesco. Nosotros usamos telescopios modernos con lentes de cristal montados sobre ejes robóticos que giran para seguir las estrellas. Los mayas, en cambio, utilizaron el horizonte, la línea de visión humana y las aristas inamovibles de sus propios edificios para rastrear los astros. Al fijar estas posiciones en piedra maciza, se aseguraban de que su conocimiento perdurara a través de las generaciones sin sufrir alteraciones, un registro astronómico permanente esculpido en la ciudad misma.',
      'El solsticio de invierno (alrededor del veintiuno de diciembre) marca el día más corto del año, el momento en el que el sol parece "detenerse" en el cielo (eso significa la palabra solsticio) antes de comenzar a regresar hacia el norte. En este día, otra esquina del templo entra en juego, alineándose perfectamente con los últimos rayos del sol poniente. Esto confirmaba a la comunidad que el ciclo anual se había completado, y que los días comenzarían lentamente a alargarse de nuevo, trayendo la promesa de luz y calor.',
      'La capacidad de registrar con tal exactitud los solsticios y equinoccios permitía a los gobernantes mayas sincronizar sus calendarios cívicos y religiosos. Poseer este conocimiento era considerado un poder divino. El gobernante o sacerdote que podía "predecir" dónde saldría el sol, o cuándo atravesaría la puerta, demostraba a su pueblo que tenía el favor y el control sobre las fuerzas del cosmos, reforzando así la cohesión social y el sistema de creencias que sostenía la civilización de Dzibilchaltún.'
    ],
    expandables: [
      { label: 'El Concepto de Tiempo Cíclico', icon: 'atom', text: 'Nosotros a menudo imaginamos el tiempo como una línea recta que va desde el pasado hacia el futuro. Los mayas, por otro lado, veían el tiempo como una serie de ciclos interminables en forma de engranajes interconectados. Los movimientos del sol, marcados por el Templo de las Siete Muñecas, eran la demostración visible de que los engranajes cósmicos giraban correctamente, repitiendo patrones sagrados una y otra vez eternamente.' },
      { label: 'Precisión Arquitectónica', icon: 'clock', text: 'Para que las esquinas y los vanos de un edificio se alineen con el sol durante todo el año, la plataforma base debe estar perfectamente nivelada. Los arqueólogos han descubierto que los mayas usaron sofisticados niveles hechos de agua contenida en canales estrechos, permitiéndoles construir bases kilométricas que no variaban ni un par de centímetros de elevación. ¡Una hazaña tecnológica extraordinaria!' }
    ],
    fact: 'El estudio de estas alineaciones se llama Arqueoastronomía, una fascinante mezcla entre arqueología y astronomía. Los investigadores utilizan modelos informáticos tridimensionales del terreno de Dzibilchaltún y del cielo estrellado antiguo para confirmar que, hace más de mil años, el sol realmente salía exactamente en los puntos marcados por las esquinas del templo, demostrando que nada en su arquitectura era al azar.'
  },
  {
    id: 'sacbe-procesional',
    title: 'El Sacbé: El Camino Blanco',
    color: '#FFE0B2',
    btnImage: '/assets/maya/infographic_m6/btn_sacbe-procesional.jpg',
    image: '/assets/maya/infographic_m6/hero_sacbe-procesional.jpg',
    content: [
      'Imagina una supercarretera ancha y elevada, completamente recta y cubierta con un reluciente estuco blanco brillante que resplandece incluso bajo la luz de la luna. Esto es un "sacbé" (que en idioma maya significa literalmente "camino blanco"). En Dzibilchaltún, el sacbé más importante es una calzada monumental que conecta directamente el Templo de las Siete Muñecas con la plaza principal de la ciudad y el majestuoso Cenote Xlakah. Con más de quinientos metros de longitud, este camino era la arteria principal del asentamiento, por donde fluía la vida cívica y religiosa de sus habitantes.',
      'Construir un sacbé no era una tarea sencilla; era un proyecto colosal de ingeniería pública comparable a nuestras modernas vías rápidas. Los trabajadores mayas rellenaban el terreno irregular de la selva con toneladas y toneladas de rocas, creando una base sólida y elevada. Luego, nivelaban la superficie con grava más fina y, finalmente, la cubrían con una espesa capa de estuco hecho a base de piedra caliza quemada. El resultado era un camino perfectamente llano, elevado por encima del fango y los charcos de la temporada de lluvias, que se mantenía limpio y deslumbrante bajo el candente sol de la península yucateca.',
      'Pero el sacbé no estaba diseñado simplemente para que la gente caminara más rápido de un lugar a otro. Era, sobre todo, una ruta procesional sagrada. Durante los días señalados del equinoccio o las grandes festividades agrícolas, los sacerdotes, gobernantes y músicos caminaban majestuosamente a lo largo de este camino blanco. Es fácil imaginar la escena: largas filas de dignatarios vistiendo coloridos penachos de plumas de quetzal, tocando tambores y quemando incienso oloroso, mientras el pueblo entero observaba y participaba desde los lados del camino elevado.',
      'La alineación del sacbé también es clave. No es una simple línea recta trazada al azar en el mapa; el camino actúa como un eje que une el espacio arquitectónico divino (el templo que observa el cielo) con el elemento más importante del mundo natural y subterráneo (el cenote que almacena el agua vital). Así, el camino blanco conectaba el inframundo o Xibalbá con la superficie de los hombres y los movimientos celestes. Es la representación física de la concepción maya del universo, trazada en el suelo de su ciudad.',
      'Hoy en día, puedes caminar a lo largo del mismo sacbé por el que transitaban los reyes mayas. Aunque el brillante estuco blanco se ha perdido en su mayor parte debido a la erosión de los siglos y la invasión de la selva, la base elevada de piedra permanece firme y robusta. Caminar por esta vía milenaria, rodeado de árboles inmensos y cantos de pájaros tropicales, es una de las experiencias más evocadoras que permite sentir cómo la inmensa ciudad de Dzibilchaltún estaba unificada y estructurada por estas venas de piedra caliza.'
    ],
    expandables: [
      { label: 'Las "Carreteras" Nocturnas', icon: 'clock', text: 'El estuco blanco del sacbé tenía una función práctica fantástica: reflejaba intensamente la luz de la luna. Antes de que existiera la electricidad, viajar de noche en la selva oscura y densa era muy peligroso. Los caminos blancos de los mayas, sin embargo, brillaban tenuemente bajo el resplandor lunar, permitiendo que los viajeros comerciales y mensajeros navegaran con seguridad entre ciudades conectadas, como si caminaran sobre una pista fosforescente.' },
      { label: 'La Red Regional', icon: 'clock', text: 'Dzibilchaltún no era la única ciudad con estas vías. Por todo el mundo maya existía una inmensa red de sacbeob (plural de sacbé). Algunos, como el famoso sacbé que une Cobá con Yaxuná, medían más de cien kilómetros de longitud. Eran las súper-autopistas del mundo antiguo, demostrando que las diferentes capitales mayas mantenían un contacto constante, comerciando bienes, conocimientos y estableciendo alianzas poderosas.' }
    ],
    fact: 'El esfuerzo físico para construir el sacbé fue inmenso, especialmente considerando que los mayas no usaban animales de carga como caballos o bueyes, ni tampoco vehículos con ruedas para el transporte. Absolutamente cada piedra, cada cesta de grava y cada kilo de estuco fue transportado sobre las espaldas y hombros de los trabajadores humanos a lo largo de incontables meses de ardua labor colectiva.'
  },
  {
    id: 'cenote-xlakah',
    title: 'Cenote Xlakah: El Portal de Agua',
    color: '#0097A7',
    btnImage: '/assets/maya/infographic_m6/btn_cenote-xlakah.jpg',
    image: '/assets/maya/infographic_m6/hero_cenote-xlakah.jpg',
    content: [
      'En el extremo opuesto del sacbé principal nos encontramos con el Cenote Xlakah (que se pronuncia ish-la-cáh), una maravilla natural que fue el corazón de agua de la ciudad de Dzibilchaltún. Un cenote es un gigantesco pozo o cueva inundada que se forma cuando el techo de piedra caliza de un río subterráneo se derrumba, dejando expuestas aguas cristalinas. Xlakah, cuyo nombre maya significa "pueblo viejo", es uno de los cenotes a cielo abierto más grandes y profundos de toda la región, y su presencia fue la razón principal por la que se fundó la ciudad en este lugar.',
      'El cenote es un gigante silencioso: su superficie parece tranquila, cubierta en las orillas por hermosos lirios acuáticos y pequeños peces que nadan en aguas turquesas, pero sus profundidades son impresionantes. Alcanza más de cuarenta metros de profundidad, hundiéndose en un túnel oscuro e inclinado hacia el abismo subterráneo. Durante miles de años, esta fue la fuente inagotable de agua dulce para decenas de miles de habitantes de la ciudad, un recurso de incalculable valor en una península donde no hay ríos superficiales para abastecer a las multitudes.',
      'Pero para los antiguos mayas, un cenote no era solamente un tanque de agua; era un portal sagrado. Ellos creían en un universo dividido en tres niveles: los cielos, la tierra de los vivos y el "Xibalbá" o inframundo oscuro. Los cenotes eran las entradas directas a este mundo subterráneo, el hogar de Chaac, el poderoso dios de la lluvia y los relámpagos. Por lo tanto, acercarse al Cenote Xlakah no era solo ir a buscar agua para beber, era una experiencia espiritual, un encuentro en la frontera misma donde los mundos humano y divino colisionaban.',
      'Los arqueólogos han buceado en las misteriosas y frías profundidades de Xlakah y han realizado descubrimientos que te dejarán sin aliento. En el fondo cubierto de lodo, han encontrado más de treinta mil artefactos. Entre ellos hay ollas y cántaros enteros que mujeres y niños dejaron caer accidentalmente hace siglos mientras sacaban agua. Pero también hallaron ofrendas intencionales: hermosas vasijas pintadas, joyas de jade verde importado de muy lejos, figurillas de hueso tallado e incluso instrumentos musicales. Todo esto fue arrojado a las aguas oscuras como regalos preciosos para apaciguar a los dioses del Xibalbá.',
      'Hoy en día, el Cenote Xlakah es un ecosistema vibrante y, hasta hace poco tiempo, los visitantes del sitio arqueológico podían nadar en sus frescas aguas después de explorar las calientes y sudorosas ruinas. Los pequeños peces que habitan allí incluso mordisqueaban suavemente la piel de los nadadores. Aunque las reglas de conservación cambian, el cenote sigue siendo un recordatorio poderoso de que las grandes civilizaciones siempre surgen y dependen enteramente de su relación con el entorno natural y sus fuentes vitales de vida.'
    ],
    expandables: [
      { label: 'Ecosistema Único', icon: 'atom', text: 'Los cenotes como Xlakah tienen una biología sumamente especial. Al estar aislados y formados por aguas filtradas a través de kilómetros de roca caliza, albergan especies de plantas y peces que a menudo son endémicas, lo que significa que no existen en ningún otro lugar del planeta. Algunas de estas especies de peces ciegos se han adaptado a vivir exclusivamente en las partes más oscuras y cavernosas del sistema subterráneo.' },
      { label: 'La Flor de Loto Maya', icon: 'clock', text: 'En la superficie del cenote florecen lirios acuáticos blancos y amarillos, una flor inmensamente sagrada en el arte maya. En las pinturas murales y las cerámicas antiguas, a menudo se dibuja a los reyes y deidades usando tocados adornados con estas flores o emergiendo de ellas, simbolizando la vida pura que brota desde el acuático inframundo hacia la luz dorada del sol.' }
    ],
    fact: 'Durante las expediciones subacuáticas patrocinadas por la National Geographic en los años cincuenta, los buzos tuvieron enormes problemas para excavar el fondo del Cenote Xlakah. La visibilidad era casi nula debido al sedimento fino, y la profundidad extrema causó que los buzos experimentaran descompresión y narcosis por nitrógeno, arriesgando literalmente sus vidas para rescatar las reliquias de jade de los antiguos mayas sumergidas en el barro negro.'
  },
  {
    id: 'restauracion-moderna',
    title: 'La Restauración Moderna',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m6/btn_restauracion-moderna.jpg',
    image: '/assets/maya/infographic_m6/hero_restauracion-moderna.jpg',
    content: [
      'El Dzibilchaltún que vemos hoy, con sus plazas limpias, césped podado y el imponente Templo de las Siete Muñecas destacando bajo el cielo azul, es el resultado de décadas de trabajo intenso de arqueólogos e ingenieros modernos. Entre los años mil novecientos cincuenta y seis y mil novecientos sesenta y cinco, el intrépido arqueólogo E. Wyllys Andrews IV, bajo el patrocinio de prestigiosas universidades, lideró un proyecto masivo de exploración y restauración en el sitio, enfrentándose al calor sofocante, garrapatas y la densa maleza espinosa de la selva de Yucatán.',
      'Restaurar una ruina maya es como armar el rompecabezas más grande y complejo del mundo, pero sin tener la imagen de la caja para guiarte. A lo largo de los siglos, las raíces gigantes de los árboles abrazaron y separaron los bloques de piedra, mientras que la erosión y la gravedad colapsaron los techos. Los equipos modernos tuvieron que desenterrar cuidadosamente las piedras caídas, numerar minuciosamente cada bloque descubierto y utilizar grúas y poleas para volver a colocar cada roca, literalmente toneladas de material, exactamente en su posición original teórica.',
      'Uno de los debates más intensos en la arqueología es "cuánto se debe reconstruir". El Instituto Nacional de Antropología e Historia (INAH) de México aplica rigurosos estándares de conservación en Dzibilchaltún. El objetivo no es construir un edificio "falso" y nuevo, sino estabilizar las ruinas originales para que no sigan deteriorándose y restaurar partes clave, como las paredes del Templo de las Siete Muñecas, para que los visitantes puedan comprender verdaderamente cómo funcionaba el edificio, especialmente su alineación solar durante el fascinante equinoccio.',
      'Hoy, Dzibilchaltún es mucho más que un montón de rocas antiguas; es un centro educativo vivo y dinámico. El sitio cuenta con un museo de clase mundial, el Museo del Pueblo Maya, que no solo exhibe los asombrosos tesoros de jade, hueso y cerámica rescatados de las tumbas y el cenote, sino que también cuenta la historia ininterrumpida de los mayas desde la prehistoria hasta las vibrantes comunidades mayas actuales. Es un puente increíble que conecta el pasado arqueológico con el presente cultural de México y la región de Yucatán.',
      'El esfuerzo por proteger y estudiar Dzibilchaltún continúa todos los días. Las lluvias ácidas, la vegetación implacable, y el impacto de miles de pisadas turísticas amenazan constantemente las frágiles estructuras de piedra caliza. Cada vez que visitas un sitio como este y caminas respetuosamente por los sacbeob, sin subir a las estructuras prohibidas y sin tocar los estucos originales, te conviertes también en parte de la gran tarea de conservación, asegurando que las futuras generaciones sigan maravillándose con la genialidad arquitectónica de este reloj solar monumental.'
    ],
    expandables: [
      { label: 'Un Arqueólogo Entregado', icon: 'clock', text: 'E. Wyllys Andrews IV dedicó gran parte de su carrera profesional y pasión personal a Dzibilchaltún. Su trabajo fue tan extenso y metódico que reescribió los libros de historia sobre cuándo y cómo comenzó la civilización en la parte norte de la península. Curiosamente, su hijo, E. Wyllys Andrews V, también se convirtió en un destacado arqueólogo especializado en el mundo maya, continuando el legado familiar de descubrimiento.' },
      { label: 'El Desafío del Estuco', icon: 'clock', text: 'Originalmente, casi todos los edificios mayas estaban recubiertos con una gruesa capa de estuco liso y pintados de colores brillantes, principalmente rojo carmesí. Hoy en día, los restauradores raramente intentan replicar este estuco pintado. Prefieren dejar la piedra desnuda, parcialmente porque recrear la pintura exacta es casi imposible, y porque la imagen moderna de ruinas de piedra gris se ha convertido en el estándar visual que el público espera encontrar, aunque los edificios antiguos fueran mucho más coloridos.' }
    ],
    fact: 'Aunque el sitio arqueológico es enorme, se estima que menos del cinco por ciento del total de los ocho mil cuatrocientos edificios detectados en Dzibilchaltún han sido excavados y consolidados de manera formal. Esto significa que la gran mayoría de la antigua ciudad y sus secretos siguen escondidos de manera segura bajo nuestros pies, durmiendo pacíficamente bajo la sombra verde de la selva yucateca, esperando pacientemente a los arqueólogos del futuro.'
  }
];

// â”€â”€â”€ Maya Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaField() {
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
    // Golden and cyan fireflies/particles
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.2,
      hue: Math.random() > 0.5 ? '255,196,0' : '0,151,167', // gold or cyan
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,196,0,0.3))' }}>
        {/* Sun arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#ECEFF1','#BF360C','#FFC400','#00B8D4','#FFE0B2','#0097A7','#2E7D32'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Sun Door Icon */}
        <rect x="292" y="22" width="16" height="24" fill="none" stroke="#FFC400" strokeWidth="1.5" opacity="0.8" />
        <circle cx="300" cy="34" r="5" fill="#FFC400" opacity="0.7" />
        <line x1="285" y1="34" x2="275" y2="34" stroke="#FFC400" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="315" y1="34" x2="325" y2="34" stroke="#FFC400" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,196,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,196,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,196,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFC400" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TEMPLO 7 MUÃ‘ECAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,196,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL RELOJ SOLAR DE DZIBILCHALTÚN</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,196,0,0.2)'}`,
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
          layoutId="activeDotMaya"
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
        background: 'rgba(10, 15, 10, 0.92)',
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              color: node.color, fontSize: '1.1rem', margin: '0 0 1rem 0',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={18} />
              Explora Más a Fondo
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        {node.fact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              background: `linear-gradient(45deg, ${node.color}15, transparent)`,
              border: `1px solid ${node.color}40`,
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{
              background: node.color, color: '#0B0E2D', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: `0 0 15px ${node.color}60`,
            }}>
              <Star size={20} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem' }}>Dato Fascinante</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onNodeClick }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      marginTop: '2rem',
      background: 'rgba(0,0,0,0.4)',
      padding: '1.5rem',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px' }}>
          Progreso de Exploración
        </span>
        <span style={{ color: '#FFC400', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}>
          {exploredIds.length} / {nodes.length} Nodos
        </span>
      </div>

      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            background: 'linear-gradient(90deg, #FFC400, #FFAB91)',
            boxShadow: '0 0 10px rgba(255,196,0,0.5)',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '4px' }}>
        {nodes.map((node, i) => {
          const isExplored = exploredIds.includes(node.id);
          return (
            <motion.button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: 'none', cursor: 'pointer',
                background: isExplored ? node.color : 'rgba(255,255,255,0.1)',
                boxShadow: isExplored ? `0 0 8px ${node.color}80` : 'none',
                transition: 'all 0.3s',
              }}
              title={node.title}
            />
          );
        })}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Exported Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM6() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  const handleNodeClick = (id) => {
    setActiveNodeId(id);
    if (!exploredIds.includes(id)) {
      setExploredIds(prev => [...prev, id]);
    }
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0A0D18, #111B24)',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      borderRadius: '24px',
      overflow: 'hidden',
    }} ref={containerRef}>
      
      {/* Background Particle Effects */}
      <MayaField />
      
      {/* Dark vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 30%, transparent 20%, rgba(10,13,24,0.85) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
        
        <MayaHeader />

        {/* â”€â”€â”€ Node Navigation Buttons â”€â”€â”€ */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '3rem 0',
          position: 'relative',
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

        {/* â”€â”€â”€ Selected Node Content â”€â”€â”€ */}
        <AnimatePresence mode="wait">
          {activeNode ? (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '24px',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.5, marginBottom: '1rem', color: '#FFC400' }} />
              <p style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                Selecciona un nodo interactivo arriba para explorar el Templo de las 7 Muñecas.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* â”€â”€â”€ Progress Tracker â”€â”€â”€ */}
        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onNodeClick={handleNodeClick} />

        {/* â”€â”€â”€ Bibliography â”€â”€â”€ */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.85rem',
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronRight size={14} /> Fuentes y Bibliografía
          </h4>
          <ul style={{ lineHeight: 1.8, paddingLeft: '1.5rem', listStyleType: 'circle' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* â”€â”€â”€ Global Lightbox â”€â”€â”€ */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
