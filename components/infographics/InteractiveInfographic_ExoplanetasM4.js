'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Habitable Zone & Biosignatures themed) ─────────
function DecoHabitableZone({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="6" fill="#FFD740" />
      <circle cx="30" cy="30" r="14" fill="none" stroke="#FF5252" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="3" opacity="0.7" />
      <circle cx="30" cy="30" r="28" fill="none" stroke="#448AFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="48" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoMagnetosphere({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="32" cy="30" r="12" fill={color} opacity="0.6" />
      <path d="M 10 15 Q 35 15, 48 30 Q 35 45, 10 45" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 5 22 Q 32 22, 44 30 Q 32 38, 5 38" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="2" y1="18" x2="18" y2="18" stroke="#FFD740" strokeWidth="1.5" />
      <line x1="2" y1="30" x2="14" y2="30" stroke="#FFD740" strokeWidth="1.5" />
      <line x1="2" y1="42" x2="18" y2="42" stroke="#FFD740" strokeWidth="1.5" />
    </svg>
  );
}

function DecoTrappist({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="10" cy="30" r="7" fill={color} />
      <circle cx="20" cy="30" r="2" fill="#B388FF" />
      <circle cx="26" cy="30" r="2" fill="#00E5FF" />
      <circle cx="32" cy="30" r="2.5" fill="#64FFDA" />
      <circle cx="38" cy="30" r="2.5" fill="#64FFDA" />
      <circle cx="44" cy="30" r="2.5" fill="#64FFDA" />
      <circle cx="50" cy="30" r="2" fill="#FFD740" />
      <circle cx="56" cy="30" r="1.5" fill="#FF9100" />
    </svg>
  );
}

function DecoBiosignature({ size = 70, color = '#FF80AB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="20" cy="20" r="5" fill={color} />
      <circle cx="40" cy="20" r="5" fill={color} />
      <circle cx="30" cy="42" r="7" fill={color} />
      <line x1="20" y1="20" x2="30" y2="42" stroke={color} strokeWidth="2" />
      <line x1="40" y1="20" x2="30" y2="42" stroke={color} strokeWidth="2" />
      <line x1="20" y1="20" x2="40" y2="20" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoTechnosignature({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 20 48 L 40 48 M 30 48 L 30 30" stroke={color} strokeWidth="2" />
      <path d="M 18 30 C 18 18 42 18 42 30 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 12 15 A 25 25 0 0 1 48 15" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 6 8 A 32 32 0 0 1 54 8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoAstrobiology({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 20 25 Q 30 15 40 25 T 20 35 T 40 45" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="25" cy="28" r="2" fill={color} />
      <circle cx="35" cy="32" r="2" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'concepto-zona-habitable': [DecoHabitableZone, DecoMagnetosphere, DecoTrappist],
  'factores-habitabilidad': [DecoMagnetosphere, DecoHabitableZone, DecoAstrobiology],
  'sistema-trappist-1': [DecoTrappist, DecoHabitableZone, DecoBiosignature],
  'biofirmas-atmosfericas': [DecoBiosignature, DecoAstrobiology, DecoTechnosignature],
  'tecnofirmas-espaciales': [DecoTechnosignature, DecoBiosignature, DecoTrappist],
  'falsos-positivos-biofirmas': [DecoAstrobiology, DecoBiosignature, DecoHabitableZone],
  'busqueda-vida-futuro': [DecoHabitableZone, DecoTechnosignature, DecoMagnetosphere],
};

const BIBLIOGRAPHY = [
  'Kasting, J. F., Whitmire, D. P., & Reynolds, R. T. (1993). "Habitable Zones around Main Sequence Stars", Icarus, 101(1), 108-128.',
  'Gillon, M. et al. (2017). "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1", Nature, 542(7642), 456-460.',
  'Schwieterman, E. W. et al. (2018). "Exoplanet Biosignatures: A Review of Remotely Detectable Signs of Life", Astrobiology, 18(6), 663-708.',
  'Meadows, V. S. et al. (2018). "The Habitable Zone Planet Finder and Biosignature Identification", Astrobiology, 18(6), 630-662.',
  'Des Marais, D. J. et al. (2002). "Remote Sensing of Planetary Biosignatures: Tenets in the Search for Extra-Terrestrial Life", Astrobiology, 2(2), 153-181.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'concepto-zona-habitable',
    title: 'La Zona Habitable',
    color: '#64FFDA',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_concepto-zona-habitable.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_concepto-zona-habitable.jpg',
    content: [
      'La zona habitable, conocida popularmente en la ciencia como la "Zona Ricitos de Oro", es la región anular alrededor de una estrella donde las temperaturas permiten que el agua exista en estado líquido sobre la superficie de un planeta rocoso. Imagina estar sentado frente a una fogata en una noche fría: si te sientas demasiado cerca te quemarás, y si te sientas demasiado lejos te congelarás. Debes buscar la distancia justa.',
      'En la astrofísica moderna, la zona habitable no depende únicamente del brillo directo de la estrella, sino de la cantidad de flujo estelar incidente que recibe la superficie planetaria. Si un planeta orbita demasiado cerca del límite interior de la zona habitable, la energía térmica provocará un efecto invernadero desbocado: los océanos se evaporarán por completo y el agua de la atmósfera se disociará en el espacio.',
      'Por el contrario, si el exoplaneta se encuentra más allá del límite exterior de la zona habitable, el dióxido de carbono de la atmósfera comenzará a congelarse en la superficie en forma de hielo seco. Sin suficientes gases invernadero para atrapar el calor, el planeta sufrirá una glaciación global ininterrumpida y permanente, convirtiéndose en un bola de nieve helada incapaz de sostener mares abiertos.',
      'El tamaño y la posición exacta de la zona habitable varían radicalmente según el tipo espectral de la estrella hospedera. Alrededor de estrellas calientes de tipo F o G como el Sol, la zona habitable se sitúa a grandes distancias. Sin embargo, alrededor de estrellas enanas rojas frías de tipo M, la zona habitable se encuentra apretada extremadamente cerca de la estrella, a solo una fracción de la distancia entre Mercurio y el Sol.',
      'Es importante comprender que pertenecer a la zona habitable es una condición necesaria pero no suficiente para que un planeta albergue vida. Marte se encuentra técnicamente en el borde exterior de la zona habitable del Sol, pero su baja masa y su falta de atmósfera impiden la existencia de agua líquida estable. La habitabilidad requiere una combinación perfecta de distancia orbital y geofísica planetaria.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El concepto moderno de zona habitable astrofísica fue calculado matemáticamente por el científico James Kasting en 1993. Kasting estableció las ecuaciones basadas en el comportamiento del agua y del dióxido de carbono bajo el efecto invernadero para determinar los límites de habitabilidad estelar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El límite interior de la zona habitable terrestre está fijado por la pérdida de agua por desbocamiento térmico (aproximadamente a 0.95 Unidades Astronómicas del Sol). El límite exterior lo establece el máximo efecto invernadero por CO2 (aproximadamente a 1.67 Unidades Astronómicas del Sol).' }
    ],
    fact: 'La Tierra gira cerca del borde interior de la zona habitable de nuestro Sol. A medida que el Sol envejezca y aumente su luminosidad en un 10% durante los próximos mil millones de años, la zona habitable se desplazará hacia afuera y los océanos terrestres se evaporarán de manera natural.'
  },
  {
    id: 'factores-habitabilidad',
    title: 'Factores de Habitabilidad',
    color: '#00E5FF',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_factores-habitabilidad.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_factores-habitabilidad.jpg',
    content: [
      'Para que un mundo sea habitable no basta con estar a la distancia correcta de su estrella; requiere una compleja sinfonía de factores geofísicos e interacciones atmosféricas. Imagina construir una casa perfecta: no solo necesitas terreno en un buen clima, sino también cimientos sólidos, paredes aislantes, techo protector y un sistema que recicle el aire limpio.',
      'El primer factor crucial es la masa y el tamaño del planeta. Si un exoplaneta es demasiado pequeño como Marte o la Luna, su gravedad será insuficiente para retener una atmósfera espesa a lo largo de miles de millones de años. Los gases de la atmósfera escaparán lentamente hacia el espacio por erosión del viento estelar. Un exoplaneta habitable debe tener masa suficiente para mantener aire denso.',
      'El segundo factor indispensable es la presencia de un escudo magnético o magnetósfera planetaria generado por un núcleo de hierro líquido en convección. El campo magnético actúa como un escudo invisible que desvía el plasma del viento estelar y las partículas cargadas de alta energía. Sin un campo magnético potente, las radiaciones estelares destruirán la capa de ozono y esterilizarán la superficie.',
      'El tercer pilar es la tectónica de placas y el ciclo del carbono-silicato. En la Tierra, el movimiento de los continentes y las zonas de subducción reciclan continuamente el dióxido de carbono entre el manto rocoso y la atmósfera. Este termostato geológico natural regula la temperatura del planeta a escalas de millones de años, evitando que el clima se vuelva demasiado cálido o demasiado frío.',
      'Por último, la composición química de la atmósfera y la presencia de un efecto invernadero moderado son esenciales. Sin gases de efecto invernadero como el dióxido de carbono y el vapor de agua, la temperatura media de la Tierra sería de 18 grados Celsius bajo cero, congelando todos los océanos. El equilibrio perfecto entre estos cuatro factores define la habitabilidad real.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marte perdió su habitabilidad primitiva hace unos cuatro mil millones de años cuando su núcleo de hierro se enfrió y su campo magnético colapsó. Sin la protección magnética, el viento solar barrió casi toda su atmósfera original, transformándolo en un desierto helado y seco.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El número de Dynamo mide la capacidad del núcleo metálico de un planeta para generar un campo magnético magnético mediante convección térmica y rotación. Una rotación demasiado lenta puede impedir que se genere una magnetósfera protectora incluso en planetas rocosos grandes.' }
    ],
    fact: 'El concepto de "Planeta Superhabitable", propuesto por el astrofísico René Heller, sugiere que exoplanetas ligeramente más grandes y masivos que la Tierra, orbitando estrellas enanas de tipo K con mayor vida media, podrían ser incluso más idóneos para la vida que nuestro propio planeta.'
  },
  {
    id: 'sistema-trappist-1',
    title: 'El Sistema TRAPPIST-1',
    color: '#FF5252',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_sistema-trappist-1.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_sistema-trappist-1.jpg',
    content: [
      'Ubicado a 39.6 años luz de la Tierra en la constelación de Acuario, el sistema TRAPPIST-1 representa el tesoro más fascinante para la astrobiología moderna. Descubierto por un equipo internacional liderado por el astrónomo Michaël Gillon en 2017, este sistema alberga a siete exoplanetas de tamaño casi idéntico a la Tierra orbitando alrededor de una estrella enana ultrafría.',
      'La estrella TRAPPIST-1 es una diminuta enana roja que apenas tiene el tamaño del planeta Júpiter y posee una masa equivalente al ocho por ciento de nuestro Sol. Como la estrella es tan pequeña y emite muy poco calor, toda la familia de siete planetas orbita extremadamente pegada a su superficie, apretados dentro de una distancia que es diez veces menor que la órbita de Mercurio alrededor del Sol.',
      'Lo más extraordinario de este sistema es que tres de los planetas (TRAPPIST-1 e, f y g) se encuentran orbitando justo dentro de la zona habitable conservadora del sistema. Estos tres mundos rocosos reciben niveles de radiación estelar muy parecidos a los que reciben la Tierra y Marte del Sol, ofreciendo la oportunidad ideal para buscar agua líquida y atmósferas sustentables.',
      'Debido a la cercanía física entre las órbitas de los planetas, si estuvieras de pie en la superficie de TRAPPIST-1 e verías a tus planetas vecinos pasar por el cielo con un tamaño aparente mayor que el de la Luna llena terrestre. Podrías distinguir los mares, continentes o patrones de nubes de los mundos hermanos a simple vista en el firmamento rojo.',
      'El telescopio espacial James Webb está dedicando cientos de horas de observación prioritaria para caracterizar espectroscópicamente cada uno de los mundos de TRAPPIST-1. Las observaciones iniciales ya están determinando cuáles planetas retuvieron sus atmósferas tras miles de millones de años de radiación estelar y cuáles son rocas desnudas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los siete planetas de TRAPPIST-1 forman una cadena de resonancia orbital armónica casi perfecta. Por cada 8 órbitas que completa el planeta b, el planeta c da 5 vueltas, el d da 3 y el e da 2. Esta sincronía exacta ha mantenido al sistema estable durante más de siete mil millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El planeta TRAPPIST-1 e es considerado por los astrofísicos el mejor candidato de masa terrestre conocido. Posee un radio de 0.92 radios terrestres, una masa de 0.69 masas terrestres y una densidad de 5.6 g/cm³, lo que sugiere una estructura interna con un gran núcleo de hierro similar a la Tierra.' }
    ],
    fact: 'Si juntáramos los siete planetas del sistema TRAPPIST-1, cabrían holgadamente dentro de la distancia que separa al Sol del planeta Mercurio, convirtiéndolo en el laboratorio planetario rocoso más compacto y extraordinario jamás descubierto.'
  },
  {
    id: 'biofirmas-atmosfericas',
    title: 'Biofirmas Atmosféricas',
    color: '#FF80AB',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_biofirmas-atmosfericas.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_biofirmas-atmosfericas.jpg',
    content: [
      'Una biofirma atmosférica es una sustancia química gaseosa o un patrón espectral cuya presencia en la atmósfera de un exoplaneta únicamente puede ser explicada razonablemente por la actividad biológica de seres vivos. Imagina buscar las huellas de pisadas de un animal en la arena: la forma y la profundidad del rastro revelan qué tipo de criatura estuvo allí.',
      'En la atmósfera terrestre, la biofirma más evidente y colosal es la presencia simultánea de dióxido de carbono, oxígeno molecular (O2) y su derivado el ozono (O3). El oxígeno es un gas sumamente reactivo que se combina rápidamente con las rocas y los metales. Si no existiera la fotosíntesis continua realizada por plantas y cianobacterias, todo el oxígeno de nuestro aire desaparecería en pocos miles de años.',
      'Otra biofirma fundamental es la detección conjunta de parejas de gases que se encuentran en desequilibrio termodinámico. El metano (CH4) y el oxígeno reaccionan químicamente entre sí para formar dióxido de carbono y agua. Si un telescopio espacial detecta concentraciones elevadas de metano y oxígeno al mismo tiempo en el aire de un exoplaneta, significa que alguna fuente viva debe estar inyectando ambos gases continuamente.',
      'También se investigan biofirmas secundarias como el dimetilsulfuro (DMS), un compuesto orgánico sulfurado producido en la Tierra exclusivamente por el fitoplancton marino en los océanos. La detección de DMS junto con vapor de agua en la atmósfera de una Supertierra sería una evidencia circunstancial extraordinaria de vida fotosintética marina.',
      'El análisis de biofirmas requiere descartar primero cualquier proceso químico inorgánico. Los científicos deben verificar que la estrella no esté produciendo gases por fotólisis del agua o que los volcanes no estén expulsando metano geológico. Buscar biofirmas es un trabajo riguroso de descarte estadístico antes de proclamar un hallazgo astrobiológico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Antes de la aparición de la fotosíntesis oxigénica hace unos 2.4 mil millones de años (Gran Evento de Oxidación), la Tierra primitiva era un mundo dominado por bacterias anaeróbicas que producían grandes cantidades de metano, dándole a nuestro planeta una atmósfera anaranjada similar a la de Titán.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La línea de absorción del ozono a 9.6 micrómetros en el espectro infrarrojo lejano es una de las biofirmas más fáciles de detectar por telescopios espaciales. El ozono se forma a partir del oxígeno O2 por radiación ultravioleta y sirve como un excelente indicador indirecto de fotosíntesis planetaria.' }
    ],
    fact: 'En 2023, observaciones del exoplaneta K2-18b con el JWST detectaron moléculas de carbono como metano y dióxido de carbono junto con posibles indicios tentativos de dimetilsulfuro (DMS), desatando un amplio debate científico sobre este mundo "Hicéano" (océano bajo atmósfera de hidrógeno).'
  },
  {
    id: 'tecnofirmas-espaciales',
    title: 'Tecnofirmas Espaciales',
    color: '#B388FF',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_tecnofirmas-espaciales.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_tecnofirmas-espaciales.jpg',
    content: [
      'Una tecnofirma es cualquier evidencia física, química o electromagnética observable a la distancia que demuestre el uso de tecnología avanzada por parte de una civilización extraterrestre. Mientras que las biofirmas buscan la huella de bacterias o plantas, las tecnofirmas buscan la presencia de construcciones de ingeniería, contaminantes sintéticos o emisiones energéticas deliberadas.',
      'Una de las tecnofirmas atmosféricas más prometedoras es la detección de gases contaminantes artificiales que no existen de forma natural en la geología. Los clorofluorocarbonos (CFC) son compuestos químicos industriales inventados por el ser humano para refrigeración que destruyen el ozono. Si detectáramos CFCs en la atmósfera de un exoplaneta rocoso, tendríamos la prueba directa de una sociedad industrial.',
      'Otra tecnofirma astronómica fascinante es la búsqueda de iluminación artificial nocturna en la cara no iluminada de un planeta rocoso acoplado por marea. Si una civilización inteligente habita el hemisferio nocturno helado de una enana roja, necesitaría mega-ciudades iluminadas. Los telescopios futuros podrían detectar la emisión de luz LED artificial durante eclipses o tránsitos.',
      'A escalas de ingeniería aún mayores, los científicos buscan megaestructuras espaciales como las Esferas de Dyson o enjambres de satélites solares gigantes. Una gran estructura artificial construida en órbita estelar bloquearía la luz de la estrella de forma asimétrica e irregular en la curva de luz, y al mismo tiempo emitiría un exceso de calor en el infrarrojo medio.',
      'Por último, la búsqueda de inteligencia extraterrestre (SETI) rastrea emisiones de radio de banda estrecha o pulsos de láser óptico dirigidos. Estas señales de comunicación cruzando el espacio interestelar destacarían claramente contra el ruido de fondo natural del universo, revelando la presencia de transmisores tecnológicos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los gases tetrafluorometano (CF4) y hexafluoroetano (C6F6) son gases de efecto invernadero industriales que duran hasta 50,000 años en la atmósfera sin descomponerse. Si una civilización alienígena intentara terraformar un planeta congelado, estos gases serían la tecnofirma perfecta visible por telescopios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El concepto de la Esfera de Dyson fue propuesto por el físico Freeman Dyson en 1960. Sugirió que civilizaciones avanzadas de Tipo II en la escala de Kardashev construirían enjambres de colectores solares rodeando a su estrella para atrapar el cien por ciento de su emisión energética.' }
    ],
    fact: 'El proyecto Breakthrough Listen es la iniciativa de búsqueda de tecnofirmas radioastronómicas más financiada de la historia, utilizando los radiotelescopios de Green Bank y Parkes para escanear millones de estrellas cercanas en busca de señales tecnológicas artificiales.'
  },
  {
    id: 'falsos-positivos-biofirmas',
    title: 'Falsos Positivos y Falsos Negativos',
    color: '#FFD740',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_falsos-positivos-biofirmas.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_falsos-positivos-biofirmas.jpg',
    content: [
      'En la búsqueda de vida en el universo, el mayor peligro para la ciencia es caer en el error de un falso positivo. Un falso positivo ocurre cuando los astrónomos detectan una molécula sospechosa como el oxígeno o el metano y concluyen apresuradamente que proviene de seres vivos, cuando en realidad fue producida por un proceso abiótico inerte como la geología o la química estelar.',
      'Por ejemplo, el oxígeno molecular (O2) puede ser producido en enormes cantidades sin necesidad de vida mediante la fotólisis del agua. Si un exoplaneta sufre una radiación ultravioleta violenta de su estrella, los fotones de luz solar romperán las moléculas de H2O de la atmósfera superior. El gas hidrógeno ligero escapará rápidamente al espacio exterior mientras que el pesado oxígeno quedará atrapado en el aire.',
      'De manera similar, el metano puede ser generado abióticamente mediante un proceso geológico llamado serpentinización. Cuando el agua de mar se filtra en las rocas del manto ricas en olivino bajo alta presión y temperatura, ocurren reacciones químicas inorgánicas que liberan grandes volúmenes de gas metano y nitrógeno sin intervención de organismos biológicos.',
      'Para evitar falsos positivos, la astrobiología ha desarrollado el concepto de contexto ambiental integrativo. Una molécula aislada no prueba la existencia de vida; debe evaluarse en conjunto con la edad de la estrella, la radiación ultravioleta incidente, la presencia de agua, la densidad del planeta y la abundancia de gases como el dióxido de carbono y el nitrógeno.',
      'Por otro lado, un falso negativo ocurre cuando un planeta alberga vida pero sus organismos producen sustancias químicas que no dejan una firma observable desde la distancia o cuyos gases son destruidos por la química atmosférica local. Comprender estos límites exige cautela experimental antes de anunciar la confirmación definitiva de vida extraterrestre.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante los primeros dos mil millones de años de historia de la Tierra, nuestro planeta estuvo habitado por una biosfera microbiana inmensa pero su atmósfera casi no tenía oxígeno libre. Si un astrónomo alienígena hubiera observado la Tierra en esa época, habría obtenido un falso negativo si solo buscaba oxígeno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La detección simultánea de monóxido de carbono (CO) sirve para descartar falsos positivos de metano biótico. Las bacterias metanogénicas consumen activamente monóxido de carbono; si hay abundantes cantidades de CO en el aire junto con metano, la fuente es casi seguro geológica inerte.' }
    ],
    fact: 'La NASA estableció la Escala CoLD (Confidence of Life Detection), un marco riguroso de 7 niveles que exige verificar la señal, descartar contaminación, modelar falsos positivos y confirmar el contexto biológico antes de declarar el descubrimiento de vida extraterrestre.'
  },
  {
    id: 'busqueda-vida-futuro',
    title: 'El Futuro de la Astrobiología',
    color: '#FF9100',
    btnImage: '/assets/exoplanetas/infographic_m4/btn_busqueda-vida-futuro.jpg',
    image: '/assets/exoplanetas/infographic_m4/hero_busqueda-vida-futuro.jpg',
    content: [
      'La búsqueda de vida en el universo se prepara para una década de descubrimientos sin precedentes históricos. La combinación de observatorios espaciales súper potentes, telescopios gigantes terrestres y algoritmos de inteligencia artificial nos está acercando al momento en que responderemos si estamos solos en el cosmos.',
      'El proyecto insignia de la NASA para la década de 2030 es el Habitable Worlds Observatory (HWO). Este observatorio espacial óptico e ultravioleta de seis metros de diámetro estará equipado con un coronógrafo de ultra alta precisión capaz de suprimir el resplandor estelar en un factor de diez mil millones, permitiendo fotografiar directamente a 25 planetas rocosos habitables.',
      'Al fotografiar directamente a estos análogos terrestres como diminutos puntos de luz azulada (Direct Imaging), el HWO podrá analizar sus atmósferas mediante espectroscopía de reflectancia. Esto medirá directamente el color de las superficies planetarias, detectando la presencia de océanos de agua, cobertura vegetal mediante el "Borde Rojo de la Clorofila" y variaciones estacionales.',
      'Paralelamente, misiones de interferometría espacial nula como el proyecto LIFE (Large Interferometer for Exoplanets) impulsado por la Agencia Espacial Europea planean combinar la luz de cuatro telescopios espaciales independientes volando en formación para obtener espectros infrarrojos térmicos directos de docenas de mundos terrestres.',
      'Estamos a las puertas de una revolución filosófica y científica sin igual. En los próximos veinte años, la humanidad dispondrá de la tecnología física necesaria para leer los códigos de barras químicos de docenas de tierras alienígenas. El descubrimiento de la primera biofirma confirmada transformará para siempre nuestra visión de la vida y de nuestra propia existencia en el universo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El "Borde Rojo de la Clorofila" (Vegetation Red Edge) es una firma espectral característica de las plantas terrestres. Las plantas absorben la luz azul y roja para la fotosíntesis pero reflejan intensamente la luz infrarroja cercana para evitar sobrecalentarse, creando un salto brusco de reflectancia a 700 nanómetros.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La interferometría nula destruye por interferencia destructiva la luz brillante de la estrella central al desfasar las ondas de luz medio ciclo en los telescopios combinados. Esto permite que la débil luz infrarroja del exoplaneta emerja de la oscuridad sin ser cegada por el resplandor estelar.' }
    ],
    fact: 'El astrónomo Carl Sagan demostró la técnica de detección de biofirmas en 1993 utilizando la sonda Galileo durante su sobrevuelo cercano a la Tierra. La sonda detectó abundancia de oxígeno, ozono, metano y el borde rojo vegetativo, confirmando científicamente que la Tierra está habitada.'
  }
];

export default function InteractiveInfographic_ExoplanetasM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(6,20,24,0.92) 0%, rgba(10,32,30,0.88) 40%, rgba(4,14,18,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <TemporalFieldCanvas />
      <ExoplanetasHeaderM4 />
      
      {/* Progress Bar */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '1.5rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #64FFDA, #00E5FF)',
              borderRadius: '3px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Módulos explorados: {explored.size}/{INFOGRAPHIC_NODES.length}
          </span>
        </div>
      </div>

      {/* Top Node Selector Carousel */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1rem', marginTop: '0.5rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(100,255,218,0.2)',
        backdropFilter: 'blur(10px)'
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

      {/* Content Panel Area */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '320px',
                color: 'rgba(255,255,255,0.5)', textAlign: 'center', gap: '1rem',
                padding: '2rem'
              }}
            >
              <Sparkles size={36} style={{ color: '#64FFDA', opacity: 0.6 }} />
              <h3 style={{ margin: 0, color: '#64FFDA', fontSize: '1.2rem', fontWeight: 700 }}>
                Explora la Zona Habitable y las Biofirmas
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                Haz clic en cualquiera de los 7 módulos superiores para descubrir los criterios de habitabilidad, el sistema TRAPPIST-1, las biofirmas y tecnofirmas en la búsqueda de vida extraterrestre.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Bibliography */}
      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(100,255,218,0.25)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: '#64FFDA', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
          Referencias y Fuentes Académicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', borderLeft: '3px solid #64FFDA' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function TemporalFieldCanvas() {
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
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '100, 255, 218' : '0, 229, 255',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.35;
        p.x += p.driftX;
        p.y += p.driftY;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
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

function ExoplanetasHeaderM4() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(100,255,218,0.4))' }}>
        <path d="M 40 100 Q 300 15, 560 100" fill="none" stroke="url(#exoGrad4)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 40 + t * 520;
          const cy = 100 - Math.sin(t * Math.PI) * 85;
          const colors = ['#64FFDA','#00E5FF','#FF5252','#FF80AB','#B388FF','#FFD740','#FF9100'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5.5, 3] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="18" r="12" fill="none" stroke="#64FFDA" strokeWidth="1.5" opacity="0.7" />
        <circle cx="300" cy="18" r="3" fill="#00E5FF" opacity="0.9" />
        <defs>
          <linearGradient id="exoGrad4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(100,255,218,0.15)" />
            <stop offset="50%" stopColor="rgba(100,255,218,0.95)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="68" textAnchor="middle" fill="#64FFDA" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ZONA HABITABLE Y BIOFIRMAS</text>
        <text x="300" y="88" textAnchor="middle" fill="rgba(0,229,255,0.85)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">ASTROBIOLOGÍA Y BÚSQUEDA DE VIDA</text>
      </svg>
    </div>
  );
}

function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '82px',
        height: '82px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(100,255,218,0.25)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}60, 0 0 35px ${node.color}25, inset 0 0 12px ${node.color}40`
          : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
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
        color: isActive ? node.color : 'rgba(255,255,255,0.8)',
        fontSize: '0.76rem', fontWeight: 700, letterSpacing:'0.2px',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.3s',
        maxWidth: '95px',
        textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeDotExoM4"
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
  up:    { hidden: { y: -25, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 25, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -25, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 25, opacity: 0 },  visible: { x: 0, opacity: 1 } },
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
      border: `1px solid ${color}30`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}10, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}18` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <IconComp size={15} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.8 }} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 28 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', borderLeft: `3px solid ${color}40`, paddingLeft: '0.8rem' }}>
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
    { top: '6%', right: '-5px', rotate: 12 },
    { top: '48%', left: '-12px', rotate: -12 },
    { bottom: '10%', right: '10px', rotate: 18 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        background: 'rgba(8, 24, 28, 0.94)', backdropFilter: 'blur(20px)', border: `1px solid ${node.color}40`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${node.color}15`
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', border: `1px solid ${node.color}50`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Hero Grid 1fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}20, rgba(0,0,0,0.5))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}20)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '12px', right: '55px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 52, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.45rem', fontWeight: 800, color: node.color, letterSpacing:'-0.01em', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}60`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.9rem', fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -7, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 4, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 8} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.025)', borderRadius: '14px', padding: '1.25rem', borderLeft: `3px solid ${node.color}40`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-9px', left: '14px', background: node.color, color: '#040E12', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'CONCEPTO FEYNMAN' : i === 1 ? 'ANÁLISIS ASTROBIOLÓGICO' : 'FUTURO DE LA INVESTIGACIÓN'}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.4rem', background: `linear-gradient(90deg, ${node.color}18, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}35`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `${node.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={19} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico Clave
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', fontSize: '0.92rem', lineHeight: 1.68 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
