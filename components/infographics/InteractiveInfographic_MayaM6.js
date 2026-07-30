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
  'Galindo Trejo, J. (2009). ArqueoastronomÃ­a en la AmÃ©rica Antigua, UNAM',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Coggins, C. & Shane, O.C. III (1984). Cenote of Sacrifice: Maya Treasures from the Sacred Well, University of Texas Press',
  'MalmstrÃ¶m, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'dzibilchaltun-sitio',
    title: 'El Sitio: DzibilchaltÃºn',
    color: '#ECEFF1',
    btnImage: '/assets/maya/infographic_m6/btn_dzibilchaltun-sitio.jpg',
    image: '/assets/maya/infographic_m6/hero_dzibilchaltun-sitio.jpg',
    content: [
      'Imagina una ciudad gigante escondida bajo la selva durante miles de aÃ±os. DzibilchaltÃºn, cuyo nombre maya significa el "lugar donde hay escritura sobre piedras planas", fue uno de los asentamientos mÃ¡s grandes y antiguos de todo el norte de la penÃ­nsula de YucatÃ¡n. Los arqueÃ³logos calculan que la gente comenzÃ³ a vivir aquÃ­ desde el aÃ±o quinientos antes de Cristo, y el lugar estuvo ocupado sin interrupciÃ³n hasta que llegaron los conquistadores espaÃ±oles. Esta ocupaciÃ³n continua es como si tuviÃ©ramos una ciudad moderna donde las personas nunca dejaron de construir y remodelar sus casas durante mÃ¡s de dos milenios. Es un testimonio asombroso de la capacidad de adaptaciÃ³n y persistencia de la civilizaciÃ³n maya frente a los cambios del clima, la polÃ­tica y los recursos naturales.',
      'El sitio es verdaderamente colosal en su tamaÃ±o. Se han descubierto alrededor de ocho mil cuatrocientas estructuras arquitectÃ³nicas esparcidas por un Ã¡rea de diecisÃ©is kilÃ³metros cuadrados. Para que te hagas una idea, esto es el equivalente a tener miles de pequeÃ±as casas, templos, plazas y palacios en un Ã¡rea tan grande que te tomarÃ­a horas caminar de un extremo al otro. La mayorÃ­a de estas estructuras no son pirÃ¡mides gigantescas como las de ChichÃ©n ItzÃ¡, sino basamentos de piedra sobre los cuales los antiguos mayas construÃ­an sus casas de madera y techos de hojas de palma. Hoy en dÃ­a, la selva se ha tragado muchas de estas construcciones mÃ¡s pequeÃ±as, pero los expertos han logrado mapearlas meticulosamente para entender cÃ³mo funcionaba la ciudad.',
      'La ubicaciÃ³n de DzibilchaltÃºn no fue un accidente. Los antiguos mayas eran como ingenieros expertos que sabÃ­an elegir el mejor terreno. Estaban cerca de la costa del Golfo de MÃ©xico, lo que les permitÃ­a comerciar con la valiosa sal marina y obtener mariscos frescos, pero lo suficientemente tierra adentro para protegerse de los peores huracanes y ataques. AdemÃ¡s, el subsuelo de piedra caliza plana facilitaba la construcciÃ³n y el movimiento. El lugar perfecto para fundar una metrÃ³polis prÃ³spera. Al igual que nosotros buscamos vivir cerca de buenas carreteras y supermercados, ellos buscaron el equilibrio perfecto entre recursos naturales, rutas comerciales y protecciÃ³n natural.',
      'Uno de los aspectos mÃ¡s fascinantes de DzibilchaltÃºn es su diseÃ±o urbano. A diferencia de nuestras ciudades modernas con calles en forma de cuadrÃ­cula (como un tablero de ajedrez), esta ciudad maya estaba organizada en torno a conjuntos de edificios agrupados. Estos grupos se comunicaban mediante caminos elevados de piedra blanca. Cada familia importante o barrio tenÃ­a su propia pequeÃ±a plaza y santuario. Este tipo de organizaciÃ³n refleja cÃ³mo los mayas valoraban tanto la comunidad como su relaciÃ³n con el entorno natural circundante, creando un tejido social y urbano completamente diferente al que estamos acostumbrados.',
      'A pesar de su inmenso tamaÃ±o, DzibilchaltÃºn guarda muchos de sus secretos todavÃ­a. Durante cientos de aÃ±os, la naturaleza recuperÃ³ su espacio. Los Ã¡rboles crecieron sobre las plazas y las raÃ­ces rompieron las piedras talladas. Cuando los primeros exploradores modernos llegaron al sitio, lo que vieron no fue una ciudad reluciente, sino montÃ­culos cubiertos de maleza que parecÃ­an pequeÃ±as colinas naturales. Fueron necesarias dÃ©cadas de trabajo arqueolÃ³gico paciente, retirando capas de tierra y vegetaciÃ³n, para que la verdadera forma de las estructuras, incluyendo el famoso Templo de las Siete MuÃ±ecas, volviera a ver la luz del sol de YucatÃ¡n.'
    ],
    expandables: [
      { label: 'Un Nombre Misterioso', icon: 'clock', text: 'El nombre "DzibilchaltÃºn" no es el nombre original que los antiguos pobladores le daban a la ciudad. En realidad, los arqueÃ³logos modernos adoptaron este nombre basÃ¡ndose en cÃ³mo los mayas locales llamaban a la zona debido a unas estelas (piedras grabadas) que se encontraron allÃ­. El verdadero nombre ancestral de esta gigantesca metrÃ³polis sigue siendo un misterio que tal vez nunca lleguemos a conocer con certeza.' },
      { label: 'Comparando TamaÃ±os', icon: 'clock', text: 'Para entender la magnitud de DzibilchaltÃºn, piensa en que, en su momento de mÃ¡ximo esplendor, la ciudad pudo haber albergado a mÃ¡s de cuarenta mil habitantes. Esto la hacÃ­a mÃ¡s grande que muchas ciudades europeas de la misma Ã©poca. La planificaciÃ³n requerida para alimentar y proporcionar agua a tantas personas en un entorno donde no hay rÃ­os superficiales es un verdadero logro de ingenierÃ­a humana.' }
    ],
    fact: 'Una peculiaridad de la regiÃ³n de DzibilchaltÃºn es la falta absoluta de rÃ­os y lagos en la superficie. Todo el sistema hidrÃ¡ulico de la zona es subterrÃ¡neo. Esto significa que los mayas dependÃ­an completamente de las lluvias y de los cenotes (ojos de agua) para sobrevivir, lo que influyÃ³ profundamente en su religiÃ³n y su veneraciÃ³n por los dioses de la lluvia y el agua.'
  },
  {
    id: 'templo-munecos',
    title: 'El Templo de las 7 MuÃ±ecas',
    color: '#BF360C',
    btnImage: '/assets/maya/infographic_m6/btn_templo-munecos.jpg',
    image: '/assets/maya/infographic_m6/hero_templo-munecos.jpg',
    content: [
      'El Templo de las Siete MuÃ±ecas es el corazÃ³n mÃ¡gico de DzibilchaltÃºn. Imagina un edificio que parece un cubo sÃ³lido con pequeÃ±as puertas cuadradas y una especie de torre inusual en la parte superior. A diferencia de las famosas pirÃ¡mides escalonadas que la mayorÃ­a de nosotros asocia con los mayas, esta estructura es un basamento pequeÃ±o pero impresionantemente robusto. Fue construido alrededor del aÃ±o ochocientos de nuestra era y tiene cuatro puertas, cada una apuntando de manera sÃºper precisa hacia uno de los cuatro puntos cardinales: norte, sur, este y oeste. Es como si el edificio fuera una brÃºjula gigante de piedra diseÃ±ada para interactuar directamente con el movimiento del sol y las estrellas en el firmamento.',
      'El nombre del templo es tan intrigante como el edificio mismo. Cuando los arqueÃ³logos comenzaron a explorar su interior en la dÃ©cada de mil novecientos cincuenta, hicieron un descubrimiento sorprendente bajo el suelo del altar principal. Encontraron exactamente siete figurillas de arcilla toscamente modeladas que representaban formas humanas con caracterÃ­sticas un poco deformes o inusuales. Estas figurillas (que fueron llamadas "muÃ±ecas") parecÃ­an haber sido colocadas allÃ­ intencionalmente como una ofrenda sagrada. Inmediatamente, la prensa y los investigadores empezaron a llamarlo "El Templo de las Siete MuÃ±ecas", y el apodo se quedÃ³ para siempre, convirtiÃ©ndose en el sÃ­mbolo inconfundible del sitio arqueolÃ³gico.',
      'Â¿Pero por quÃ© este edificio es tan diferente? En el mundo de la arquitectura maya, la pequeÃ±a torre o "cresterÃ­a" en forma de ventana cuadrada que corona el techo del templo es completamente Ãºnica. NingÃºn otro edificio descubierto hasta la fecha en toda la regiÃ³n maya tiene algo exactamente igual. Los cientÃ­ficos creen que esta torre no solo servÃ­a como decoraciÃ³n o para darle mayor altura al templo, sino que formaba parte integral del sofisticado sistema de observaciÃ³n astronÃ³mica que los sacerdotes mayas utilizaban para medir el tiempo y registrar el paso de las estaciones a lo largo del aÃ±o solar.',
      'La construcciÃ³n de este santuario demuestra un conocimiento matemÃ¡tico y espacial extraordinario. Las paredes estÃ¡n hechas de bloques de piedra caliza perfectamente tallados que encajan unos con otros. Sin embargo, para crear el efecto de luz que veremos mÃ¡s adelante, los constructores tuvieron que calcular los Ã¡ngulos con una precisiÃ³n casi milimÃ©trica sin tener telescopios, computadoras, ni lÃ¡seres modernos. Utilizaron Ãºnicamente su observaciÃ³n, palos rectos, cuerdas para medir, y un entendimiento profundo del universo que les rodeaba, transmitido de generaciÃ³n en generaciÃ³n por sabios observadores del cielo.',
      'Con el paso de los siglos, los propios mayas decidieron cubrir el Templo de las Siete MuÃ±ecas. Literalmente construyeron un edificio mÃ¡s grande encima de Ã©l y lo rellenaron con rocas y tierra, dejÃ¡ndolo escondido como si fuera una cÃ¡psula del tiempo. Esta prÃ¡ctica de "superposiciÃ³n" era muy comÃºn entre los antiguos mayas; no destruÃ­an los edificios sagrados antiguos, sino que los envolvÃ­an respetuosamente con construcciones nuevas para renovar su poder. IrÃ³nicamente, gracias a que lo taparon por completo, el templo se conservÃ³ maravillosamente bien, protegiÃ©ndolo de los huracanes y la erosiÃ³n durante casi mil aÃ±os.'
    ],
    expandables: [
      { label: 'Las Misteriosas Figurillas', icon: 'atom', text: 'Las siete figurillas de barro encontradas no son muÃ±ecas para jugar. Los expertos sugieren que representan a individuos con enfermedades o deformidades fÃ­sicas. En la cosmovisiÃ³n maya, las personas que nacÃ­an con caracterÃ­sticas inusuales a menudo eran consideradas como tocadas por los dioses o con una conexiÃ³n especial con el mundo espiritual. Fueron enterradas ritualmente para consagrar el espacio o pedir sanaciÃ³n.' },
      { label: 'Arquitectura Cuadrangular', icon: 'clock', text: 'La forma cuadrada del templo y sus cuatro puertas no son un capricho estÃ©tico. El nÃºmero cuatro es uno de los nÃºmeros mÃ¡s sagrados para los mayas. Representa las cuatro esquinas del universo, los cuatro rumbos del cosmos y los cuatro colores principales (rojo, blanco, negro y amarillo) asociados a las deidades que sostenÃ­an el cielo y la tierra. El templo es, literalmente, una maqueta del universo en piedra.' }
    ],
    fact: 'El descubrimiento del templo oculto fue una de las sorpresas mÃ¡s grandes de la arqueologÃ­a moderna. Cuando E. Wyllys Andrews IV excavaba lo que parecÃ­a ser una pirÃ¡mide en ruinas bastante comÃºn, notÃ³ que habÃ­a un muro tallado debajo del relleno. Al retirar toneladas de roca con muchÃ­simo cuidado, desenterrÃ³ un edificio que habÃ­a permanecido intacto y a oscuras durante siglos.'
  },
  {
    id: 'equinoccio-solar',
    title: 'El FenÃ³meno del Equinoccio',
    color: '#FFC400',
    btnImage: '/assets/maya/infographic_m6/btn_equinoccio-solar.jpg',
    image: '/assets/maya/infographic_m6/hero_equinoccio-solar.jpg',
    content: [
      'El espectÃ¡culo mÃ¡s impresionante del Templo de las Siete MuÃ±ecas ocurre durante los equinoccios de primavera y otoÃ±o, es decir, alrededor del veinte de marzo y el veintidÃ³s de septiembre de cada aÃ±o. Imagina estar parado frente al templo al amanecer en uno de esos dÃ­as especiales. Mientras el sol comienza a asomarse por el horizonte oriental, algo mÃ¡gico sucede: la esfera brillante del sol aparece exactamente en el centro de la puerta del este del templo. La luz penetra directamente por la entrada y cruza todo el edificio de lado a lado, saliendo por la puerta oeste como un poderoso lÃ¡ser dorado antiguo.',
      'Para lograr este efecto visual tan dramÃ¡tico, los arquitectos mayas tuvieron que alinear el edificio de una forma asombrosamente precisa. Un equinoccio es el momento del aÃ±o en que el sol sale exactamente por el punto cardinal este y se pone exactamente por el punto cardinal oeste, haciendo que el dÃ­a y la noche duren casi lo mismo en todo el planeta. Que un edificio de piedra capture este preciso instante demuestra que los mayas habÃ­an observado el comportamiento del sol durante muchÃ­simos aÃ±os y calcularon la posiciÃ³n geomÃ©trica exacta para construir los muros.',
      'Pero, Â¿por quÃ© molestarse en hacer este truco de luz? Para los antiguos mayas, este no era un simple espectÃ¡culo de luces, era el momento en el que lo divino se conectaba con la humanidad. El equinoccio de primavera marcaba un punto crucial en el calendario agrÃ­cola: el momento de preparar la tierra para la siembra antes de la temporada de lluvias. Ver al sol, que representaba a la deidad solar Kinich Ahau, pasar a travÃ©s del templo era una seÃ±al cÃ³smica de que el tiempo de iniciar el ciclo agrÃ­cola habÃ­a llegado. El templo no solo era una iglesia; era un reloj y un calendario monumental funcional.',
      'El fenÃ³meno es tan exacto que miles de personas se congregan cada aÃ±o en DzibilchaltÃºn, a pesar del madrugÃ³n y el frÃ­o del amanecer, solo para ser testigos de este evento. Cuando el sol se eleva y su luz intensa se enmarca perfectamente en las puertas cuadradas, la multitud suele guardar un silencio reverencial, aplaudir o tocar instrumentos antiguos. Es una experiencia que te hace sentir pequeÃ±o y a la vez profundamente conectado con la inteligencia de los astrÃ³nomos que vivieron hace mÃ¡s de mil aÃ±os en esas tierras.',
      'Lo mÃ¡s extraordinario de esta alineaciÃ³n es que no solo depende del edificio, sino del horizonte plano de YucatÃ¡n. Como la penÃ­nsula no tiene grandes montaÃ±as que bloqueen la vista del sol naciente, los mayas podÃ­an observar la salida del sol en su punto mÃ¡s bajo y verdadero. Los arqueÃ³logos modernos utilizan teodolitos y herramientas lÃ¡ser de alta tecnologÃ­a para medir estas alineaciones hoy en dÃ­a, y resulta increÃ­ble constatar que los cÃ¡lculos de los mayas, hechos a simple vista y con herramientas rudimentarias de mediciÃ³n, tienen un margen de error menor a un grado.'
    ],
    expandables: [
      { label: 'La Importancia AgrÃ­cola', icon: 'clock', text: 'En una regiÃ³n donde las estaciones no estÃ¡n marcadas por la nieve o el frÃ­o extremo, sino por los periodos de lluvia y sequÃ­a, saber exactamente en quÃ© dÃ­a del aÃ±o estÃ¡s es asunto de vida o muerte. Si un agricultor sembraba su maÃ­z antes de tiempo, las semillas se secarÃ­an; si lo hacÃ­a demasiado tarde, las lluvias inundarÃ­an los brotes. El templo del equinoccio les garantizaba que su reloj agrÃ­cola no se desfasara jamÃ¡s.' },
      { label: 'Un EspectÃ¡culo EfÃ­mero', icon: 'clock', text: 'El paso de la luz a travÃ©s del templo durante el equinoccio dura apenas unos cuantos minutos. El sol se mueve rÃ¡pidamente por el cielo al amanecer, y casi tan pronto como se alinea perfectamente con ambas puertas, continÃºa su ascenso, y el rayo de luz deja de atravesar directamente el centro. Es un momento fugaz que requerÃ­a que los sacerdotes estuvieran atentos y listos en el instante preciso.' }
    ],
    fact: 'El equinoccio no es el Ãºnico evento que se observa aquÃ­. Debido a la forma en que los mayas entendÃ­an el tiempo como un ciclo interminable y sagrado, cada equinoccio (primavera y otoÃ±o) era celebrado con rituales especÃ­ficos, ofrendas de incienso de copal, mÃºsica de caracolas marinas y ceremonias para asegurar que el universo siguiera funcionando de manera equilibrada y armÃ³nica.'
  },
  {
    id: 'solsticio-alineacion',
    title: 'Los Solsticios: Las Otras Fechas',
    color: '#00B8D4',
    btnImage: '/assets/maya/infographic_m6/btn_solsticio-alineacion.jpg',
    image: '/assets/maya/infographic_m6/hero_solsticio-alineacion.jpg',
    content: [
      'Si el Templo de las Siete MuÃ±ecas solo funcionara en los equinoccios, ya serÃ­a un logro impresionante. Sin embargo, los astrÃ³nomos mayas fueron mucho mÃ¡s ambiciosos. El edificio estÃ¡ diseÃ±ado para marcar no dos, sino cuatro fechas crÃ­ticas del movimiento solar a lo largo del aÃ±o. AdemÃ¡s de los equinoccios, la estructura tambiÃ©n interactÃºa con los solsticios, los dÃ­as en que el sol alcanza su punto mÃ¡s al norte (en verano) y su punto mÃ¡s al sur (en invierno) del horizonte durante el amanecer y el atardecer.',
      'Durante el solsticio de verano (alrededor del veintiuno de junio), el dÃ­a mÃ¡s largo del aÃ±o en el hemisferio norte, si te pones en una posiciÃ³n especÃ­fica de la plaza frente al templo, verÃ¡s que el sol no se alinea con la puerta central, sino que parece salir exactamente por una de las esquinas frontales del techo del edificio. Esta alineaciÃ³n no es casualidad; los Ã¡ngulos de la base y las esquinas de la peculiar torre del templo fueron calculados meticulosamente para que sirvieran como "mirillas" monumentales para el sol en sus posiciones extremas.',
      'Piensa en el edificio como un observatorio astronÃ³mico de piedra gigantesco. Nosotros usamos telescopios modernos con lentes de cristal montados sobre ejes robÃ³ticos que giran para seguir las estrellas. Los mayas, en cambio, utilizaron el horizonte, la lÃ­nea de visiÃ³n humana y las aristas inamovibles de sus propios edificios para rastrear los astros. Al fijar estas posiciones en piedra maciza, se aseguraban de que su conocimiento perdurara a travÃ©s de las generaciones sin sufrir alteraciones, un registro astronÃ³mico permanente esculpido en la ciudad misma.',
      'El solsticio de invierno (alrededor del veintiuno de diciembre) marca el dÃ­a mÃ¡s corto del aÃ±o, el momento en el que el sol parece "detenerse" en el cielo (eso significa la palabra solsticio) antes de comenzar a regresar hacia el norte. En este dÃ­a, otra esquina del templo entra en juego, alineÃ¡ndose perfectamente con los Ãºltimos rayos del sol poniente. Esto confirmaba a la comunidad que el ciclo anual se habÃ­a completado, y que los dÃ­as comenzarÃ­an lentamente a alargarse de nuevo, trayendo la promesa de luz y calor.',
      'La capacidad de registrar con tal exactitud los solsticios y equinoccios permitÃ­a a los gobernantes mayas sincronizar sus calendarios cÃ­vicos y religiosos. Poseer este conocimiento era considerado un poder divino. El gobernante o sacerdote que podÃ­a "predecir" dÃ³nde saldrÃ­a el sol, o cuÃ¡ndo atravesarÃ­a la puerta, demostraba a su pueblo que tenÃ­a el favor y el control sobre las fuerzas del cosmos, reforzando asÃ­ la cohesiÃ³n social y el sistema de creencias que sostenÃ­a la civilizaciÃ³n de DzibilchaltÃºn.'
    ],
    expandables: [
      { label: 'El Concepto de Tiempo CÃ­clico', icon: 'atom', text: 'Nosotros a menudo imaginamos el tiempo como una lÃ­nea recta que va desde el pasado hacia el futuro. Los mayas, por otro lado, veÃ­an el tiempo como una serie de ciclos interminables en forma de engranajes interconectados. Los movimientos del sol, marcados por el Templo de las Siete MuÃ±ecas, eran la demostraciÃ³n visible de que los engranajes cÃ³smicos giraban correctamente, repitiendo patrones sagrados una y otra vez eternamente.' },
      { label: 'PrecisiÃ³n ArquitectÃ³nica', icon: 'clock', text: 'Para que las esquinas y los vanos de un edificio se alineen con el sol durante todo el aÃ±o, la plataforma base debe estar perfectamente nivelada. Los arqueÃ³logos han descubierto que los mayas usaron sofisticados niveles hechos de agua contenida en canales estrechos, permitiÃ©ndoles construir bases kilomÃ©tricas que no variaban ni un par de centÃ­metros de elevaciÃ³n. Â¡Una hazaÃ±a tecnolÃ³gica extraordinaria!' }
    ],
    fact: 'El estudio de estas alineaciones se llama ArqueoastronomÃ­a, una fascinante mezcla entre arqueologÃ­a y astronomÃ­a. Los investigadores utilizan modelos informÃ¡ticos tridimensionales del terreno de DzibilchaltÃºn y del cielo estrellado antiguo para confirmar que, hace mÃ¡s de mil aÃ±os, el sol realmente salÃ­a exactamente en los puntos marcados por las esquinas del templo, demostrando que nada en su arquitectura era al azar.'
  },
  {
    id: 'sacbe-procesional',
    title: 'El SacbÃ©: El Camino Blanco',
    color: '#FFE0B2',
    btnImage: '/assets/maya/infographic_m6/btn_sacbe-procesional.jpg',
    image: '/assets/maya/infographic_m6/hero_sacbe-procesional.jpg',
    content: [
      'Imagina una supercarretera ancha y elevada, completamente recta y cubierta con un reluciente estuco blanco brillante que resplandece incluso bajo la luz de la luna. Esto es un "sacbÃ©" (que en idioma maya significa literalmente "camino blanco"). En DzibilchaltÃºn, el sacbÃ© mÃ¡s importante es una calzada monumental que conecta directamente el Templo de las Siete MuÃ±ecas con la plaza principal de la ciudad y el majestuoso Cenote Xlakah. Con mÃ¡s de quinientos metros de longitud, este camino era la arteria principal del asentamiento, por donde fluÃ­a la vida cÃ­vica y religiosa de sus habitantes.',
      'Construir un sacbÃ© no era una tarea sencilla; era un proyecto colosal de ingenierÃ­a pÃºblica comparable a nuestras modernas vÃ­as rÃ¡pidas. Los trabajadores mayas rellenaban el terreno irregular de la selva con toneladas y toneladas de rocas, creando una base sÃ³lida y elevada. Luego, nivelaban la superficie con grava mÃ¡s fina y, finalmente, la cubrÃ­an con una espesa capa de estuco hecho a base de piedra caliza quemada. El resultado era un camino perfectamente llano, elevado por encima del fango y los charcos de la temporada de lluvias, que se mantenÃ­a limpio y deslumbrante bajo el candente sol de la penÃ­nsula yucateca.',
      'Pero el sacbÃ© no estaba diseÃ±ado simplemente para que la gente caminara mÃ¡s rÃ¡pido de un lugar a otro. Era, sobre todo, una ruta procesional sagrada. Durante los dÃ­as seÃ±alados del equinoccio o las grandes festividades agrÃ­colas, los sacerdotes, gobernantes y mÃºsicos caminaban majestuosamente a lo largo de este camino blanco. Es fÃ¡cil imaginar la escena: largas filas de dignatarios vistiendo coloridos penachos de plumas de quetzal, tocando tambores y quemando incienso oloroso, mientras el pueblo entero observaba y participaba desde los lados del camino elevado.',
      'La alineaciÃ³n del sacbÃ© tambiÃ©n es clave. No es una simple lÃ­nea recta trazada al azar en el mapa; el camino actÃºa como un eje que une el espacio arquitectÃ³nico divino (el templo que observa el cielo) con el elemento mÃ¡s importante del mundo natural y subterrÃ¡neo (el cenote que almacena el agua vital). AsÃ­, el camino blanco conectaba el inframundo o XibalbÃ¡ con la superficie de los hombres y los movimientos celestes. Es la representaciÃ³n fÃ­sica de la concepciÃ³n maya del universo, trazada en el suelo de su ciudad.',
      'Hoy en dÃ­a, puedes caminar a lo largo del mismo sacbÃ© por el que transitaban los reyes mayas. Aunque el brillante estuco blanco se ha perdido en su mayor parte debido a la erosiÃ³n de los siglos y la invasiÃ³n de la selva, la base elevada de piedra permanece firme y robusta. Caminar por esta vÃ­a milenaria, rodeado de Ã¡rboles inmensos y cantos de pÃ¡jaros tropicales, es una de las experiencias mÃ¡s evocadoras que permite sentir cÃ³mo la inmensa ciudad de DzibilchaltÃºn estaba unificada y estructurada por estas venas de piedra caliza.'
    ],
    expandables: [
      { label: 'Las "Carreteras" Nocturnas', icon: 'clock', text: 'El estuco blanco del sacbÃ© tenÃ­a una funciÃ³n prÃ¡ctica fantÃ¡stica: reflejaba intensamente la luz de la luna. Antes de que existiera la electricidad, viajar de noche en la selva oscura y densa era muy peligroso. Los caminos blancos de los mayas, sin embargo, brillaban tenuemente bajo el resplandor lunar, permitiendo que los viajeros comerciales y mensajeros navegaran con seguridad entre ciudades conectadas, como si caminaran sobre una pista fosforescente.' },
      { label: 'La Red Regional', icon: 'clock', text: 'DzibilchaltÃºn no era la Ãºnica ciudad con estas vÃ­as. Por todo el mundo maya existÃ­a una inmensa red de sacbeob (plural de sacbÃ©). Algunos, como el famoso sacbÃ© que une CobÃ¡ con YaxunÃ¡, medÃ­an mÃ¡s de cien kilÃ³metros de longitud. Eran las sÃºper-autopistas del mundo antiguo, demostrando que las diferentes capitales mayas mantenÃ­an un contacto constante, comerciando bienes, conocimientos y estableciendo alianzas poderosas.' }
    ],
    fact: 'El esfuerzo fÃ­sico para construir el sacbÃ© fue inmenso, especialmente considerando que los mayas no usaban animales de carga como caballos o bueyes, ni tampoco vehÃ­culos con ruedas para el transporte. Absolutamente cada piedra, cada cesta de grava y cada kilo de estuco fue transportado sobre las espaldas y hombros de los trabajadores humanos a lo largo de incontables meses de ardua labor colectiva.'
  },
  {
    id: 'cenote-xlakah',
    title: 'Cenote Xlakah: El Portal de Agua',
    color: '#0097A7',
    btnImage: '/assets/maya/infographic_m6/btn_cenote-xlakah.jpg',
    image: '/assets/maya/infographic_m6/hero_cenote-xlakah.jpg',
    content: [
      'En el extremo opuesto del sacbÃ© principal nos encontramos con el Cenote Xlakah (que se pronuncia ish-la-cÃ¡h), una maravilla natural que fue el corazÃ³n de agua de la ciudad de DzibilchaltÃºn. Un cenote es un gigantesco pozo o cueva inundada que se forma cuando el techo de piedra caliza de un rÃ­o subterrÃ¡neo se derrumba, dejando expuestas aguas cristalinas. Xlakah, cuyo nombre maya significa "pueblo viejo", es uno de los cenotes a cielo abierto mÃ¡s grandes y profundos de toda la regiÃ³n, y su presencia fue la razÃ³n principal por la que se fundÃ³ la ciudad en este lugar.',
      'El cenote es un gigante silencioso: su superficie parece tranquila, cubierta en las orillas por hermosos lirios acuÃ¡ticos y pequeÃ±os peces que nadan en aguas turquesas, pero sus profundidades son impresionantes. Alcanza mÃ¡s de cuarenta metros de profundidad, hundiÃ©ndose en un tÃºnel oscuro e inclinado hacia el abismo subterrÃ¡neo. Durante miles de aÃ±os, esta fue la fuente inagotable de agua dulce para decenas de miles de habitantes de la ciudad, un recurso de incalculable valor en una penÃ­nsula donde no hay rÃ­os superficiales para abastecer a las multitudes.',
      'Pero para los antiguos mayas, un cenote no era solamente un tanque de agua; era un portal sagrado. Ellos creÃ­an en un universo dividido en tres niveles: los cielos, la tierra de los vivos y el "XibalbÃ¡" o inframundo oscuro. Los cenotes eran las entradas directas a este mundo subterrÃ¡neo, el hogar de Chaac, el poderoso dios de la lluvia y los relÃ¡mpagos. Por lo tanto, acercarse al Cenote Xlakah no era solo ir a buscar agua para beber, era una experiencia espiritual, un encuentro en la frontera misma donde los mundos humano y divino colisionaban.',
      'Los arqueÃ³logos han buceado en las misteriosas y frÃ­as profundidades de Xlakah y han realizado descubrimientos que te dejarÃ¡n sin aliento. En el fondo cubierto de lodo, han encontrado mÃ¡s de treinta mil artefactos. Entre ellos hay ollas y cÃ¡ntaros enteros que mujeres y niÃ±os dejaron caer accidentalmente hace siglos mientras sacaban agua. Pero tambiÃ©n hallaron ofrendas intencionales: hermosas vasijas pintadas, joyas de jade verde importado de muy lejos, figurillas de hueso tallado e incluso instrumentos musicales. Todo esto fue arrojado a las aguas oscuras como regalos preciosos para apaciguar a los dioses del XibalbÃ¡.',
      'Hoy en dÃ­a, el Cenote Xlakah es un ecosistema vibrante y, hasta hace poco tiempo, los visitantes del sitio arqueolÃ³gico podÃ­an nadar en sus frescas aguas despuÃ©s de explorar las calientes y sudorosas ruinas. Los pequeÃ±os peces que habitan allÃ­ incluso mordisqueaban suavemente la piel de los nadadores. Aunque las reglas de conservaciÃ³n cambian, el cenote sigue siendo un recordatorio poderoso de que las grandes civilizaciones siempre surgen y dependen enteramente de su relaciÃ³n con el entorno natural y sus fuentes vitales de vida.'
    ],
    expandables: [
      { label: 'Ecosistema Ãšnico', icon: 'atom', text: 'Los cenotes como Xlakah tienen una biologÃ­a sumamente especial. Al estar aislados y formados por aguas filtradas a travÃ©s de kilÃ³metros de roca caliza, albergan especies de plantas y peces que a menudo son endÃ©micas, lo que significa que no existen en ningÃºn otro lugar del planeta. Algunas de estas especies de peces ciegos se han adaptado a vivir exclusivamente en las partes mÃ¡s oscuras y cavernosas del sistema subterrÃ¡neo.' },
      { label: 'La Flor de Loto Maya', icon: 'clock', text: 'En la superficie del cenote florecen lirios acuÃ¡ticos blancos y amarillos, una flor inmensamente sagrada en el arte maya. En las pinturas murales y las cerÃ¡micas antiguas, a menudo se dibuja a los reyes y deidades usando tocados adornados con estas flores o emergiendo de ellas, simbolizando la vida pura que brota desde el acuÃ¡tico inframundo hacia la luz dorada del sol.' }
    ],
    fact: 'Durante las expediciones subacuÃ¡ticas patrocinadas por la National Geographic en los aÃ±os cincuenta, los buzos tuvieron enormes problemas para excavar el fondo del Cenote Xlakah. La visibilidad era casi nula debido al sedimento fino, y la profundidad extrema causÃ³ que los buzos experimentaran descompresiÃ³n y narcosis por nitrÃ³geno, arriesgando literalmente sus vidas para rescatar las reliquias de jade de los antiguos mayas sumergidas en el barro negro.'
  },
  {
    id: 'restauracion-moderna',
    title: 'La RestauraciÃ³n Moderna',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m6/btn_restauracion-moderna.jpg',
    image: '/assets/maya/infographic_m6/hero_restauracion-moderna.jpg',
    content: [
      'El DzibilchaltÃºn que vemos hoy, con sus plazas limpias, cÃ©sped podado y el imponente Templo de las Siete MuÃ±ecas destacando bajo el cielo azul, es el resultado de dÃ©cadas de trabajo intenso de arqueÃ³logos e ingenieros modernos. Entre los aÃ±os mil novecientos cincuenta y seis y mil novecientos sesenta y cinco, el intrÃ©pido arqueÃ³logo E. Wyllys Andrews IV, bajo el patrocinio de prestigiosas universidades, liderÃ³ un proyecto masivo de exploraciÃ³n y restauraciÃ³n en el sitio, enfrentÃ¡ndose al calor sofocante, garrapatas y la densa maleza espinosa de la selva de YucatÃ¡n.',
      'Restaurar una ruina maya es como armar el rompecabezas mÃ¡s grande y complejo del mundo, pero sin tener la imagen de la caja para guiarte. A lo largo de los siglos, las raÃ­ces gigantes de los Ã¡rboles abrazaron y separaron los bloques de piedra, mientras que la erosiÃ³n y la gravedad colapsaron los techos. Los equipos modernos tuvieron que desenterrar cuidadosamente las piedras caÃ­das, numerar minuciosamente cada bloque descubierto y utilizar grÃºas y poleas para volver a colocar cada roca, literalmente toneladas de material, exactamente en su posiciÃ³n original teÃ³rica.',
      'Uno de los debates mÃ¡s intensos en la arqueologÃ­a es "cuÃ¡nto se debe reconstruir". El Instituto Nacional de AntropologÃ­a e Historia (INAH) de MÃ©xico aplica rigurosos estÃ¡ndares de conservaciÃ³n en DzibilchaltÃºn. El objetivo no es construir un edificio "falso" y nuevo, sino estabilizar las ruinas originales para que no sigan deteriorÃ¡ndose y restaurar partes clave, como las paredes del Templo de las Siete MuÃ±ecas, para que los visitantes puedan comprender verdaderamente cÃ³mo funcionaba el edificio, especialmente su alineaciÃ³n solar durante el fascinante equinoccio.',
      'Hoy, DzibilchaltÃºn es mucho mÃ¡s que un montÃ³n de rocas antiguas; es un centro educativo vivo y dinÃ¡mico. El sitio cuenta con un museo de clase mundial, el Museo del Pueblo Maya, que no solo exhibe los asombrosos tesoros de jade, hueso y cerÃ¡mica rescatados de las tumbas y el cenote, sino que tambiÃ©n cuenta la historia ininterrumpida de los mayas desde la prehistoria hasta las vibrantes comunidades mayas actuales. Es un puente increÃ­ble que conecta el pasado arqueolÃ³gico con el presente cultural de MÃ©xico y la regiÃ³n de YucatÃ¡n.',
      'El esfuerzo por proteger y estudiar DzibilchaltÃºn continÃºa todos los dÃ­as. Las lluvias Ã¡cidas, la vegetaciÃ³n implacable, y el impacto de miles de pisadas turÃ­sticas amenazan constantemente las frÃ¡giles estructuras de piedra caliza. Cada vez que visitas un sitio como este y caminas respetuosamente por los sacbeob, sin subir a las estructuras prohibidas y sin tocar los estucos originales, te conviertes tambiÃ©n en parte de la gran tarea de conservaciÃ³n, asegurando que las futuras generaciones sigan maravillÃ¡ndose con la genialidad arquitectÃ³nica de este reloj solar monumental.'
    ],
    expandables: [
      { label: 'Un ArqueÃ³logo Entregado', icon: 'clock', text: 'E. Wyllys Andrews IV dedicÃ³ gran parte de su carrera profesional y pasiÃ³n personal a DzibilchaltÃºn. Su trabajo fue tan extenso y metÃ³dico que reescribiÃ³ los libros de historia sobre cuÃ¡ndo y cÃ³mo comenzÃ³ la civilizaciÃ³n en la parte norte de la penÃ­nsula. Curiosamente, su hijo, E. Wyllys Andrews V, tambiÃ©n se convirtiÃ³ en un destacado arqueÃ³logo especializado en el mundo maya, continuando el legado familiar de descubrimiento.' },
      { label: 'El DesafÃ­o del Estuco', icon: 'clock', text: 'Originalmente, casi todos los edificios mayas estaban recubiertos con una gruesa capa de estuco liso y pintados de colores brillantes, principalmente rojo carmesÃ­. Hoy en dÃ­a, los restauradores raramente intentan replicar este estuco pintado. Prefieren dejar la piedra desnuda, parcialmente porque recrear la pintura exacta es casi imposible, y porque la imagen moderna de ruinas de piedra gris se ha convertido en el estÃ¡ndar visual que el pÃºblico espera encontrar, aunque los edificios antiguos fueran mucho mÃ¡s coloridos.' }
    ],
    fact: 'Aunque el sitio arqueolÃ³gico es enorme, se estima que menos del cinco por ciento del total de los ocho mil cuatrocientos edificios detectados en DzibilchaltÃºn han sido excavados y consolidados de manera formal. Esto significa que la gran mayorÃ­a de la antigua ciudad y sus secretos siguen escondidos de manera segura bajo nuestros pies, durmiendo pacÃ­ficamente bajo la sombra verde de la selva yucateca, esperando pacientemente a los arqueÃ³logos del futuro.'
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,196,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL RELOJ SOLAR DE DZIBILCHALTÃšN</text>
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
              Explora MÃ¡s a Fondo
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
          Progreso de ExploraciÃ³n
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
                Selecciona un nodo interactivo arriba para explorar el Templo de las 7 MuÃ±ecas.
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
            <ChevronRight size={14} /> Fuentes y BibliografÃ­a
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
