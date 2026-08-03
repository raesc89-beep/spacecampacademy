'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Exoplanets Detection themed) ───────────────────
function DecoTransit({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.6" />
      <circle cx="16" cy="30" r="4" fill="#0A0C1E" stroke={color} strokeWidth="1.5" />
      <line x1="5" y1="30" x2="55" y2="30" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoDoppler({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M10 20 Q 20 10, 30 20 T 50 20" fill="none" stroke="#FF5252" strokeWidth="2" />
      <path d="M10 40 Q 25 30, 35 40 T 50 40" fill="none" stroke="#448AFF" strokeWidth="2" />
      <circle cx="30" cy="30" r="3" fill={color} />
      <path d="M 20 30 L 40 30" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoLightCurve({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 5 20 L 20 20 L 25 45 L 35 45 L 40 20 L 55 20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="45" r="3" fill={color} />
      <line x1="5" y1="50" x2="55" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoSpectrograph({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <polygon points="30,10 50,48 10,48" fill="none" stroke={color} strokeWidth="2" />
      <line x1="5" y1="35" x2="20" y2="35" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="38" y1="35" x2="55" y2="25" stroke="#FF5252" strokeWidth="1.5" />
      <line x1="39" y1="37" x2="55" y2="35" stroke="#FFD740" strokeWidth="1.5" />
      <line x1="40" y1="39" x2="55" y2="45" stroke="#448AFF" strokeWidth="1.5" />
    </svg>
  );
}

function DecoStarOrbit({ size = 70, color = '#FF80AB', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(-20 30 30)" />
      <circle cx="30" cy="30" r="7" fill={color} opacity="0.8" />
      <circle cx="48" cy="24" r="3" fill="#FFFFFF" />
    </svg>
  );
}

function DecoTelescopeLens({ size = 70, color = '#448AFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M15 30 Q 30 15, 45 30 Q 30 45, 15 30 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'que-es-un-exoplaneta': [DecoTransit, DecoStarOrbit, DecoTelescopeLens],
  'metodo-del-transito': [DecoTransit, DecoLightCurve, DecoDoppler],
  'velocidad-radial-doppler': [DecoDoppler, DecoSpectrograph, DecoStarOrbit],
  'curva-de-luz': [DecoLightCurve, DecoTransit, DecoSpectrograph],
  'espectroscopia-doppler': [DecoSpectrograph, DecoDoppler, DecoTelescopeLens],
  'limitaciones-y-sesgos': [DecoTelescopeLens, DecoTransit, DecoStarOrbit],
  'complementariedad-metodos': [DecoStarOrbit, DecoDoppler, DecoLightCurve],
};

const BIBLIOGRAPHY = [
  'Mayor, M., & Queloz, D. (1995). "A Jupiter-mass companion to a solar-type star", Nature, 378(6555), 355-359.',
  'Charbonneau, D. et al. (2000). "Detection of Planetary Transits Across a Sun-like Star", The Astrophysical Journal Letters, 529(1), L45-L48.',
  'Marcy, G. W., & Butler, R. P. (1996). "A Planetary Companion to 70 Virginis", The Astrophysical Journal, 464, L147.',
  'Pepe, F. et al. (2011). "The HARPS search for southern extra-solar planets", Astronomy & Astrophysics, 534, A58.',
  'Perryman, M. (2018). "The Exoplanet Handbook", Cambridge University Press, 2nd Edition.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-un-exoplaneta',
    title: '¿Qué es un Exoplaneta?',
    color: '#00E5FF',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_que-es-un-exoplaneta.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_que-es-un-exoplaneta.jpg',
    content: [
      'Un exoplaneta es simplemente cualquier planeta que orbita alrededor de una estrella diferente a nuestro Sol. Imagina que el universo es una gran ciudad nocturna llena de edificios iluminados. Nuestro Sistema Solar es solo una pequeña casa en ese vecindario, con sus ocho planetas girando alrededor de la fogata solar. Los exoplanetas son los mundos que pertenecen a todas las demás casas de la ciudad galáctica. Aunque están increíblemente lejos de nosotros, comparten leyes físicas fundamentales con la Tierra y Júpiter.',
      'Durante siglos, la humanidad se preguntó si nuestro sistema planetario era único en el cosmos. Los filósofos de la antigüedad especulaban con mundos infinitos, pero no existía prueba experimental. Todo cambió en la década de 1990 cuando los astrónomos desarrollaron instrumentos ópticos capaces de medir variaciones diminutas en la luz estelar. Hoy sabemos que casi cada estrella del cielo nocturno alberga al menos un planeta. Nuestra galaxia Vía Láctea contiene cientos de miles de millones de estos mundos lejanos.',
      'Descubrir exoplanetas no es una tarea fácil porque las estrellas son excesivamente brillantes comparadas con sus planetas. Piensa en intentar ver una pequeña luciérnaga volando junto al foco de un faro marino a kilómetros de distancia. La luz intensa del faro encandila tus ojos y oculta por completo al pequeño insecto. De la misma forma, el resplandor de una estrella madre tapa la débil luz reflejada por sus planetas. Por esta razón, los astrofísicos tuvieron que inventar ingeniosos métodos indirectos para detectarlos.',
      'La diversidad de exoplanetas descubiertos hasta la fecha ha desmantelado nuestras teorías antiguas sobre la formación planetaria. Encontramos planetas gigantes hechos de gas que orbitan tan cerca de sus estrellas que su año dura apenas unas horas. También detectamos mundos rocosos más grandes que la Tierra y planetas donde llueve hierro derretido o cristales. El estudio de los exoplanetas nos ayuda a comprender mejor el origen de la Tierra y la posibilidad de hallar vida fuera de nuestro hogar.',
      'Para clasificar estos mundos exóticos, los científicos analizan su masa, su tamaño, su temperatura y la distancia a su estrella. Algunos exoplanetas vagan en la oscuridad sin estrella fija, expulsados de sus sistemas originales por cataclismos gravitacionales. Sin embargo, la gran mayoría sigue bailando en órbitas estables acopladas a la gravedad estelar. Comprender esta zoología planetaria requiere dominar dos técnicas fundamentales de la astrofísica moderna: el método del tránsito y la velocidad radial.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer exoplaneta confirmado alrededor de una estrella similar a nuestro Sol se descubrió en 1995 y se llama 51 Pegasi b. Se trata de un gigante gaseoso que tarda solo cuatro días en completar una vuelta entera alrededor de su estrella. Su descubrimiento fue tan revolucionario que le otorgó el Premio Nobel de Física a sus descubridores en el año 2019.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La palabra "exoplaneta" proviene del griego "exo" que significa "fuera de". La distancia promedio al exoplaneta confirmado más cercano, Proxima Centauri b, es de 4.24 años luz. Eso equivale a casi 40 billones de kilómetros. Si viajáramos en el cohete químico más rápido jamás construido por el ser humano, tardaríamos más de 70,000 años en llegar hasta allí.' }
    ],
    fact: 'Hasta la fecha, la NASA ha confirmado la existencia de más de 5,500 exoplanetas en nuestra galaxia, y hay miles de candidatos adicionales esperando verificación. Los modelos astronómicos sugieren que estadísticamente existen más planetas que estrellas en la Vía Láctea, sumando más de 100,000 millones de mundos exóticos.'
  },
  {
    id: 'metodo-del-transito',
    title: 'El Método del Tránsito',
    color: '#64FFDA',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_metodo-del-transito.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_metodo-del-transito.jpg',
    content: [
      'El método del tránsito es la técnica más exitosa de la historia para descubrir nuevos mundos en el espacio profundo. Su funcionamiento se basa en una idea sorprendentemente sencilla: un eclipse diminuto. Imagina que colocas una lámpara encendida en una habitación oscura y haces pasar una canica pequeña justo por delante del foco. Al pasar la canica, bloqueará una mínima fracción de la luz que llega a tus ojos, haciendo que la lámpara parezca parpadear momentáneamente.',
      'En la astronomía real, la lámpara es una estrella distante y la canica es un planeta orbitando a su alrededor. Cuando la órbita del planeta está alineada exactamente con nuestra línea de visión desde la Tierra, el planeta pasa justo por enfrente del disco estelar. Durante este recorrido llamado tránsito, el planeta bloquea un pequeño porcentaje del resplandor de la estrella. Los fotómetros ultrasensibles montados en telescopios registran esta disminución periódica del brillo estelar con precisión matemática.',
      'El grado de oscurecimiento nos revela de manera directa el tamaño físico del exoplaneta detectado. Si el planeta es gigantesco como Júpiter, bloqueará alrededor del uno por ciento de la luz estelar. Si el planeta es pequeño y rocoso como la Tierra, apenas bloqueará una fracción del cero punto cero uno por ciento. Comparando el tamaño del disco estelar con la profundidad de la caída de luz, los astrofísicos calculan el radio exacto del planeta en kilómetros.',
      'Además, el tiempo que transcurre entre un tránsito y el siguiente nos indica la duración exacta del año planetario. Si la caída de brillo ocurre de forma matemática cada diez días, sabemos que el exoplaneta tarda exactamente diez días en completar su órbita. Este ritmo constante permite confirmar que la sombra no es una mancha solar o una falla del detector, sino un cuerpo celeste orbitando con regularidad gravitacional.',
      'Aunque el método del tránsito es extremadamente poderoso, requiere que la órbita del planeta esté perfectamente alineada hacia la Tierra. Si la órbita está inclinada solo unos pocos grados, el planeta pasará por encima o por debajo del disco estelar desde nuestra perspectiva y nunca veremos su sombra. Por esta razón, el método del tránsito favorece el hallazgo de planetas que orbitan muy cerca de sus estrellas progenitoras.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Telescopios espaciales legendarios como Kepler y TESS han descubierto miles de exoplanetas utilizando únicamente el método del tránsito. Kepler observó fijamente una región fija del cielo durante años, fotografiando simultáneamente más de 150,000 estrellas para detectar estos parpadeos estelares microscópicos con fotómetros de alta definición.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La profundidad del tránsito depende de la relación entre el área del planeta y el área de la estrella. La fórmula matemática establece que la caída de brillo es igual al cuadrado del radio del planeta dividido entre el cuadrado del radio estelar. Esta relación geométrica simple permite determinar el volumen planetario con altísima precisión instrumental.' }
    ],
    fact: 'El primer tránsito de un exoplaneta observado en directo ocurrió en 1999 sobre la estrella HD 209458. Los astrónomos midieron una caída de brillo del 1.7% durante tres horas consecutivas, confirmando que el planeta HD 209458 b era un gigante gaseoso con un radio 1.35 veces mayor que el de Júpiter.'
  },
  {
    id: 'velocidad-radial-doppler',
    title: 'Velocidad Radial y Doppler',
    color: '#B388FF',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_velocidad-radial-doppler.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_velocidad-radial-doppler.jpg',
    content: [
      'La velocidad radial se basa en una verdad astrofísica fascinante: los planetas no orbitan alrededor del centro exacto de una estrella inmóvil. En realidad, la estrella y el planeta orbitan juntos alrededor de un centro de gravedad común llamado baricentro. Imagina a un adulto sosteniendo las manos de un niño pequeño y girando en círculos. El niño gira en un círculo grande mientras el adulto da pequeños pasos en un círculo minúsculo. La estrella experimenta un ligero tambaleo.',
      'Ese sutil bamboleo estelar se puede medir desde la Tierra gracias al famoso efecto Doppler de la luz. Piensa en una ambulancia con la sirena encendida que viaja por la calle. Cuando la ambulancia se acerca a ti, el sonido de la sirena se vuelve más agudo porque las ondas sonoras se comprimen. Cuando la ambulancia se aleja, las ondas se estiran y el sonido se vuelve más grave. Con la luz de las estrellas ocurre exactamente el mismo fenómeno físico.',
      'Cuando el bamboleo de la estrella la mueve ligeramente hacia la Tierra, las ondas de su luz se comprimen y se desplazan hacia el azul del espectro electromagnético. Cuando la estrella se aleja de nosotros en su minúscula órbita, su luz se estira y se desplaza hacia el rojo. Utilizando espectrógrafos súper precisos, los astrónomos analizan las líneas de absorción de la estrella para medir estos cambios infinitesimales en la longitud de onda.',
      'La magnitud de este desplazamiento Doppler nos informa de manera directa sobre la masa del exoplaneta invisible. Un planeta muy masivo tirará con más fuerza gravitacional de su estrella, provocando un bamboleo rápido y pronunciado. En cambio, un planeta ligero como la Tierra causará un movimiento estelar casi imperceptible de apenas unos pocos centímetros por segundo. Medir esa velocidad requiere instrumentos capaces de aislar cualquier interferencia térmica o mecánica.',
      'El método de velocidad radial es especialmente valioso porque funciona sin importar si el planeta pasa justo por enfrente del disco estelar. Mientras la órbita no esté orientada totalmente de frente hacia nosotros como una carátula de reloj, el bamboleo estelar tendrá una componente en nuestra línea de visión que revelará la presencia del planeta y su masa mínima estimada.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El efecto Doppler de la luz fue predicho originalmente por el físico austríaco Christian Doppler en 1842. En la actualidad, este concepto no solo sirve para descubrir exoplanetas lejanos, sino también para calcular la velocidad a la que se expande todo nuestro universo y para los radares de tráfico en las autopistas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad con la que Júpiter hace bambolear al Sol es de aproximadamente 12 metros por segundo, equivalente a la velocidad de un atleta corriendo. Sin embargo, la Tierra solo provoca que el Sol se mueva a unos 9 centímetros por segundo. Detectar esa variación requiere espectrógrafos ultrasensibles estabilizados al vacío.' }
    ],
    fact: 'El espectrógrafo HARPS instalado en el observatorio de La Silla en Chile puede medir variaciones en la velocidad de una estrella de tan solo 30 centímetros por segundo, lo que equivale a la velocidad a la que camina una tortuga terrestre de tamaño mediano.'
  },
  {
    id: 'curva-de-luz',
    title: 'Análisis de Curvas de Luz',
    color: '#FFD740',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_curva-de-luz.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_curva-de-luz.jpg',
    content: [
      'Una curva de luz es una gráfica matemática que registra el brillo de una estrella a lo largo del tiempo. Imagina dibujar una línea recta horizontal en un papel para representar el brillo constante de una linterna encendida. Si pasas un objeto por delante de la linterna, la línea caerá en forma de valle en V o en U durante el bloqueo de luz, para luego volver a su nivel normal al terminar el paso.',
      'En el análisis astrofísico de tránsitos, la forma exacta de esa caída curva revela información crucial sobre el exoplaneta y su sistema. La profundidad del perfil determina el tamaño relativo del planeta frente a la estrella. Si el fondo de la curva es plano en lugar de puntiagudo, significa que el planeta completo quedó dentro del disco estelar durante una parte del tránsito, permitiendo medir la duración de la fase total.',
      'Los bordes de entrada y salida de la curva de luz se llaman contactos astronómicos. Al medir la inclinación con la que cae y sube la curva durante estos contactos, los astrofísicos pueden deducir si la estrella tiene una atmósfera transparente o si presenta oscurecimiento del limbo. El oscurecimiento del limbo es un fenómeno por el cual el centro del disco estelar se ve más brillante que los bordes exteriores.',
      'Además, pequeñas variaciones en los tiempos de tránsito repetidos sugieren la presencia de otros planetas invisibles en el mismo sistema. Este efecto se conoce como variación en el tiempo de tránsito. Si un planeta hermano ejerce un tironcito gravitacional adicional, hará que el tránsito principal se adelante o se retrase unos segundos respecto al horario previsto, revelando la presencia de mundos ocultos.',
      'El estudio riguroso de las curvas de luz requiere eliminar primero el ruido de fondo generado por la actividad de la propia estrella. Las manchas solares, las llamaradas estelares y las pulsaciones internas pueden alterar el brillo de la estrella imitando falsos tránsitos. Mediante algoritmos matemáticos complejos y filtros estadísticos, los científicos limpian la señal estelar para aislar el parpadeo planetario verdadero.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Analizar la curva de luz cuando el planeta pasa por detrás de su estrella (evento llamado eclipse secundario) permite medir la temperatura de la cara diurna del exoplaneta. Al quedar oculto el planeta, la cantidad total de luz infrarroja disminuye, revelando cuánto calor emitía el planeta por sí mismo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las curvas de luz ultrasensibles obtenidas por telescopios modernos pueden detectar anillos planetarios y sistemas de lunas extrasolares (exolunas). Un planeta con anillos produce una caída de luz asimétrica y escalonada antes de que el cuerpo sólido principal ingrese al disco estelar.' }
    ],
    fact: 'Gracias al análisis avanzado de curvas de luz con el telescopio Kepler, en 2015 se descubrió la estrella de Tabby (KIC 8462852), la cual mostraba caídas de brillo irregulares de hasta el 22%, provocando intensos debates científicos sobre enjambres de cometas o polvo circunestelar.'
  },
  {
    id: 'espectroscopia-doppler',
    title: 'Espectroscopía de Precisión',
    color: '#FF9100',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_espectroscopia-doppler.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_espectroscopia-doppler.jpg',
    content: [
      'La espectroscopía de alta precisión es la herramienta técnica que permite aplicar la velocidad radial en la práctica astrofísica. Imagina que la luz de una estrella es un código de barras de colores que contiene la firma química de sus elementos. Cuando la luz atraviesa el gas de la atmósfera estelar, elementos como el hierro, el hidrógeno y el sodio absorben colores específicos, dejando líneas negras en el código.',
      'Un espectrógrafo de última generación funciona como un prisma gigantesco que descompone esa luz estelar en miles de bandas de color muy detalladas. Si la estrella se mueve debido a la fuerza gravitacional de un exoplaneta, todo ese código de barras de líneas negras se desliza sutilmente hacia la izquierda o hacia la derecha. Medir ese microdesplazamiento requiere una estabilidad instrumental extraordinaria.',
      'Para evitar errores causados por los cambios de temperatura o de presión del aire en la Tierra, los espectrógrafos modernos se instalan dentro de tanques de vacío metálicos blindados. El instrumento se mantiene a una temperatura constante que no varía ni un milésimo de grado Celsius durante todo el año. Cualquier mínima dilatación térmica del metal arruinaría las mediciones de velocidad radial.',
      'Además, se utiliza una fuente de referencia de calibración súper precisa, como un peine de frecuencias láser o lámparas de torio y argón. Esta fuente inyecta un espectro conocido de líneas de luz justo al lado del espectro estelar real. Así, las computadoras comparan el código de barras de la estrella con una regla inmutable de luz pura para calcular desplazamientos imperceptibles.',
      'Instalaciones avanzadas como el espectrógrafo ESPRESSO, ubicado en el Very Large Telescope en el desierto de Atacama, han llevado esta técnica al límite de la física. ESPRESSO puede combinar la luz de cuatro telescopios gigantes de ocho metros de diámetro para detectar planetas rocosos similares a la Tierra orbitando en la zona habitable de estrellas brillantes cercanas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los primeros espectrógrafos astronómicos del siglo XIX apenas podían medir desplazamientos correspondientes a decenas de kilómetros por segundo. En la actualidad, los espectrógrafos de ultra alta precisión han mejorado esa capacidad en un factor de cien mil, midiendo cambios en la velocidad de la luz equivalentes a la velocidad de gateo de un bebé.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un peine de frecuencias láser emite miles de líneas espectrales equiespaciadas con una precisión de reloj atómico. Sirve como la regla de medir más exacta del universo, garantizando que el espectrógrafo no sufra desviaciones físicas ni térmicas durante décadas de observaciones continuas.' }
    ],
    fact: 'El instrumento ESPRESSO en el Observatorio Paranal alcanzó una precisión instrumental sin precedentes inferior a 10 centímetros por segundo en sus pruebas de campo, abriendo la era de la detección directa de análogos terrestres por velocidad radial.'
  },
  {
    id: 'limitaciones-y-sesgos',
    title: 'Limitaciones y Sesgos',
    color: '#FF80AB',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_limitaciones-y-sesgos.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_limitaciones-y-sesgos.jpg',
    content: [
      'Ningún método de observación científica es perfecto y las técnicas de detección de exoplanetas tienen sesgos de selección inevitables. Un sesgo de selección significa que nuestros instrumentos encuentran con mayor facilidad ciertos tipos de planetas mientras ignoran otros. Piensa en pescar en el océano con una red de malla grande: atraparás peces gigantes fácilmente pero todos los peces pequeños escaparán sin que lo notes.',
      'Tanto el método del tránsito como el de velocidad radial favorecen fuertemente a los planetas masivos y grandes que orbitan muy cerca de sus estrellas. Un planeta gigante en una órbita corta realiza tránsitos frecuentes y profundos, y al mismo tiempo ejerce un tirón gravitacional violento sobre su estrella. Por esta razón histórica, los primeros exoplanetas descubiertos fueron llamados Júpiteres Calientes.',
      'En cambio, encontrar un verdadero análogo de la Tierra requiere una paciencia tremenda y tecnología superior. La Tierra tarda 365 días en dar una vuelta completa al Sol y bloquea solo un uno por diez mil de su luz. Para confirmar un tránsito terrestre con tres eventos observados, un telescopio espacial debe vigilar la misma estrella de manera ininterrumpida durante al menos tres años consecutivos sin perder señal.',
      'Otra limitación fundamental es la inclinación de la órbita planetaria en el espacio tridimensional. Si el plano orbital de un sistema planetario está inclinado noventa grados respecto a nuestra visión, la estrella no se acercará ni se alejará de la Tierra y no habrá variación de velocidad radial ni tránsitos visibles. Los astrofísicos deben aplicar correcciones estadísticas para calcular cuántos planetas se nos escapan.',
      'Por último, la propia actividad intrínseca de la estrella dificulta la detección de planetas pequeños. Las manchas estelares provocadas por campos magnéticos intensos giran con la estrella y alteran las líneas espectrales y la luz estelar. A veces, una mancha solar grande puede simular de forma engañosa la señal de una Supertierra rocosa, requiriendo modelos de filtrado para desentrañar la señal real.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Debido a los sesgos de detección, durante los primeros diez años de la búsqueda exoplanetaria los astrónomos creyeron erróneamente que casi todos los sistemas planetarios del universo eran caóticos y tenían planetas gigantes hirviendo pegados a sus estrellas. Apenas mejoró la tecnología se descubrió que los mundos pequeños son mucho más comunes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad radial únicamente mide la masa mínima del exoplaneta multiplicada por el seno del ángulo de inclinación orbital (m sin i). Si no conocemos la inclinación mediante un tránsito visible, la masa real del planeta podría ser sustancialmente mayor que la medida originalmente por el espectrógrafo.' }
    ],
    fact: 'La probabilidad geométrica de que un planeta idéntico a la Tierra orbite a 1 Unidad Astronómica de una estrella idéntica al Sol y produzca un tránsito alineado con nuestro punto de vista es de apenas un 0.47%, o una posibilidad entre doscientas doce.'
  },
  {
    id: 'complementariedad-metodos',
    title: 'Combinación de Métodos',
    color: '#448AFF',
    btnImage: '/assets/exoplanetas/infographic_m1/btn_complementariedad-metodos.jpg',
    image: '/assets/exoplanetas/infographic_m1/hero_complementariedad-metodos.jpg',
    content: [
      'La verdadera magia de la astrofísica ocurre cuando combinamos el método del tránsito y el método de la velocidad radial en el mismo planeta. Cada técnica por separado nos entrega solo una pieza del rompecabezas: el tránsito nos da el radio físico (tamaño) del planeta y la velocidad radial nos entrega su masa verdadera. Al unir ambas mediciones, obtenemos el retrato físico completo del mundo distante.',
      'Con el radio y la masa calculados con precisión, los científicos aplican la fórmula clásica de la física para obtener la densidad media del exoplaneta (densidad es igual a masa dividida entre volumen). La densidad es la clave definitiva para descubrir la composición interna de un planeta sin necesidad de viajar hasta él. Nos permite saber al instante si el exoplaneta es una bola de gas, un mundo de agua o una roca de hierro.',
      'Si un exoplaneta tiene una densidad baja similar a la del agua o el hielo de nitrógeno (alrededor de 1 gramo por centímetro cúbico), sabemos que está compuesto principalmente de hidrógeno y helio gaseoso como Júpiter y Saturno. En cambio, si posee una densidad alta (alrededor de 5.5 gramos por centímetro cúbico como la Tierra), confirmamos que posee una estructura rocosa con un núcleo metálico denso.',
      'Esta caracterización combinada permite trazar diagramas de masa-radio para clasificar la población exoplanetaria en familias bien definidas. Descubrimos que existen planetas con masas intermedias entre la Tierra y Neptuno que no tienen equivalente en nuestro Sistema Solar. La sinergia entre observaciones fotométricas y espectroscópicas es el pilar fundamental sobre el que se construye toda la astrobiología moderna.',
      'En el futuro cercano, misiones astronómicas coordinadas entre telescopios terrestres y observatorios espaciales aplicarán esta metodología combinada a miles de nuevos mundos. Al caracterizar la masa, el radio y la densidad de planetas pequeños en zonas habitables, la ciencia dará el paso crucial hacia el análisis directo de sus atmósferas y la búsqueda de indicios de vida en el universo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El planeta GJ 1214 b fue uno de los primeros exoplanetas caracterizados combinando tránsito y velocidad radial. Posee un radio 2.7 veces mayor que la Tierra y una densidad baja, lo que llevó a los astrofísicos a teorizar que se trata de un "mundo océano" rodeado por un denso manto de vapor de agua a alta presión.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Al conocer la densidad planetaria y la distancia a su estrella, los físicos pueden calcular la gravedad en la superficie del exoplaneta. Un astronauta que pisara una Supertierra densa experimentaría una gravedad hasta tres veces mayor que la terrestre, haciendo que su propio cuerpo se sintiera extraordinariamente pesado.' }
    ],
    fact: 'El estudio combinado de densidad demonstrated que el exoplaneta WASP-17b es uno de los planetas más "esponjosos" e hinchados jamás descubiertos: tiene la mitad de la masa de Júpiter pero casi el doble de su tamaño, dándole una densidad similar a la del corcho de una botella.'
  }
];

export default function InteractiveInfographic_ExoplanetasM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(8,12,28,0.92) 0%, rgba(12,18,38,0.88) 40%, rgba(6,10,24,0.95) 100%)',
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
      <ExoplanetasHeaderM1 />
      
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
              background: 'linear-gradient(90deg, #00E5FF, #64FFDA)',
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
        border: '1px solid rgba(0,229,255,0.15)',
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
              <Sparkles size={36} style={{ color: '#00E5FF', opacity: 0.6 }} />
              <h3 style={{ margin: 0, color: '#00E5FF', fontSize: '1.2rem', fontWeight: 700 }}>
                Explora la Detección de Exoplanetas
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                Haz clic en cualquiera de los 7 módulos superiores para descubrir cómo la ciencia astronómica detecta mundos lejanos mediante eclipses de tránsito y espectroscopía Doppler.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Bibliography */}
      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(0,229,255,0.2)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: '#00E5FF', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
          Referencias y Fuentes Académicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', borderLeft: '3px solid #00E5FF' }}>
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
      hue: Math.random() > 0.5 ? '0, 229, 255' : '100, 255, 218',
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

function ExoplanetasHeaderM1() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(0,229,255,0.4))' }}>
        <path d="M 40 100 Q 300 15, 560 100" fill="none" stroke="url(#exoGrad1)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 40 + t * 520;
          const cy = 100 - Math.sin(t * Math.PI) * 85;
          const colors = ['#00E5FF','#64FFDA','#B388FF','#FFD740','#FF9100','#FF80AB','#448AFF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5.5, 3] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="18" r="12" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.7" />
        <circle cx="300" cy="18" r="3" fill="#64FFDA" opacity="0.9" />
        <defs>
          <linearGradient id="exoGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.15)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.95)" />
            <stop offset="100%" stopColor="rgba(100,255,218,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="68" textAnchor="middle" fill="#00E5FF" fontSize="19" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DETECCIÓN DE EXOPLANETAS</text>
        <text x="300" y="88" textAnchor="middle" fill="rgba(100,255,218,0.85)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">MÉTODOS DE TRÁNSITO Y VELOCIDAD RADIAL</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.25)'}`,
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
          layoutId="activeDotExoM1"
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
        background: 'rgba(10, 14, 32, 0.94)', backdropFilter: 'blur(20px)', border: `1px solid ${node.color}40`, borderRadius: '24px',
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
                <div style={{ position: 'absolute', top: '-9px', left: '14px', background: node.color, color: '#060A18', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'CONCEPTO FEYNMAN' : i === 1 ? 'APLICACIÓN TÉCNICA' : 'PERSPECTIVA FUTURA'}
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
