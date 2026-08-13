'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Tesla's Last Years themed) ────────────────────
function DecoLightningBolt({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M28 5 L18 28 L26 28 L16 55 L38 24 L28 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="12" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="44" cy="12" r="1" fill={color} opacity="0.4" />
      <circle cx="46" cy="38" r="1.5" fill={color} opacity="0.5" />
      <circle cx="10" cy="42" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M14 12 Q8 18 12 24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M40 30 Q46 36 42 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoPigeon({ size = 70, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified bird silhouette */}
      <path d="M10 35 Q15 20 30 22 Q35 18 40 20 Q45 22 42 28 Q50 25 48 32 Q46 36 38 34 Q30 38 20 36 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2" />
      {/* Wing detail */}
      <path d="M22 30 Q28 24 36 26" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Eye */}
      <circle cx="38" cy="24" r="1.5" fill={color} opacity="0.6" />
      {/* Tail feathers */}
      <path d="M10 35 Q8 40 12 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M12 36 Q10 42 14 44" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function DecoHotelWindow({ size = 70, color = '#6B7B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Window frame */}
      <rect x="10" y="8" width="40" height="44" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
      {/* Cross bars */}
      <line x1="30" y1="8" x2="30" y2="52" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Light glow from within */}
      <rect x="12" y="10" width="16" height="18" fill={color} opacity="0.1" />
      <rect x="32" y="10" width="16" height="18" fill={color} opacity="0.08" />
      <rect x="12" y="32" width="16" height="18" fill={color} opacity="0.06" />
      <rect x="32" y="32" width="16" height="18" fill={color} opacity="0.12" />
      {/* Stars outside */}
      <circle cx="6" cy="4" r="1" fill={color} opacity="0.4" />
      <circle cx="54" cy="6" r="0.8" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoCoilTower({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tower base */}
      <rect x="24" y="30" width="12" height="25" fill="none" stroke={color} strokeWidth="1.5" rx="1" />
      {/* Dome top */}
      <circle cx="30" cy="24" r="10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="24" r="5" fill={color} opacity="0.15" />
      {/* Discharge arcs */}
      <path d="M20 20 Q14 14 10 18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M40 20 Q46 14 50 18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M22 16 Q18 8 14 10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M38 16 Q42 8 46 10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Ground line */}
      <line x1="15" y1="55" x2="45" y2="55" stroke={color} strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

function DecoTimeMagazine({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 60 48" style={{ opacity: 0.22, ...style }}>
      {/* Magazine cover outline */}
      <rect x="8" y="4" width="44" height="40" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
      {/* Header bar */}
      <rect x="8" y="4" width="44" height="8" fill={color} opacity="0.15" rx="2" />
      <text x="30" y="10.5" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" fontFamily="serif" opacity="0.5">TIME</text>
      {/* Portrait silhouette */}
      <circle cx="30" cy="24" r="8" fill={color} opacity="0.1" />
      <path d="M26 20 Q30 16 34 20 Q36 24 34 28 Q30 32 26 28 Q24 24 26 20" fill={color} opacity="0.15" />
      {/* Bottom text lines */}
      <line x1="14" y1="36" x2="46" y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="40" x2="42" y2="40" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoStarLegacy({ size = 60, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central star */}
      <polygon points="30,6 34,22 50,22 37,32 42,48 30,38 18,48 23,32 10,22 26,22" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      {/* Orbital ring */}
      <ellipse cx="30" cy="30" rx="26" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Small orbiting dots */}
      <circle cx="56" cy="30" r="1.5" fill={color} opacity="0.5" />
      <circle cx="4" cy="30" r="1.5" fill={color} opacity="0.5" />
      <circle cx="30" cy="20" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'genio-olvidado': [DecoCoilTower, DecoLightningBolt, DecoHotelWindow],
  'hotel-new-yorker': [DecoHotelWindow, DecoPigeon, DecoCoilTower],
  'palomas-tesla': [DecoPigeon, DecoStarLegacy, DecoHotelWindow],
  'celebridad-soledad': [DecoTimeMagazine, DecoCoilTower, DecoLightningBolt],
  'rayo-muerte-redux': [DecoLightningBolt, DecoCoilTower, DecoTimeMagazine],
  'ultimo-dia': [DecoHotelWindow, DecoPigeon, DecoStarLegacy],
  'legado-inmortal': [DecoStarLegacy, DecoLightningBolt, DecoCoilTower],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'O\'Neill, J.J. (1944). Prodigal Genius: The Life of Nikola Tesla, Ives Washburn',
  'Cheney, M. (2001). Tesla: Man Out of Time, Simon & Schuster',
  'Seifer, M.J. (1996). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
  'Jonnes, J. (2003). Empires of Light: Edison, Tesla, Westinghouse, and the Race to Electrify the World, Random House',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'genio-olvidado',
    title: 'El Genio Olvidado',
    color: '#6B7B8A',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'Después de la demolición de la torre Wardenclyffe en 1917, Nikola Tesla enfrentó una de las etapas más difíciles de su vida. La torre, ubicada en Shoreham, Long Island, había sido su proyecto más ambicioso: un sistema global de transmisión inalámbrica de energía y comunicaciones. J.P. Morgan, su principal financista, retiró su apoyo en 1904 tras descubrir que Tesla pretendía transmitir energía gratuita, no solo señales de radio comercializables. Sin fondos para continuar, Tesla perdió la propiedad en 1915 cuando el hotel Waldorf-Astoria, donde acumulaba deudas de habitación, obtuvo un fallo judicial para confiscarla como pago parcial.',
      'La ruina financiera de Tesla se debió en parte a su rechazo a comercializar sus inventos de formas que consideraba éticamente cuestionables. Mientras otros inventores acumulaban fortunas con patentes derivadas de sus principios, Tesla se negaba a comprometer su visión científica. Sus patentes de corriente alterna, vendidas a Westinghouse en 1888 por aproximadamente 60,000 dólares más regalías de 2.50 por caballo de fuerza, fueron renegociadas en 1897 cuando Westinghouse enfrentó dificultades financieras. Tesla, en un acto que le costaría millones, rompió el contrato de regalías para salvar a su socio.',
      'Durante las décadas de 1920 y 1930, Tesla sobrevivió con ingresos modestos de consultorías ocasionales y pagos por algunas patentes menores. Vivió en una sucesión de hoteles de Nueva York, siempre dejando cuentas impagadas antes de mudarse al siguiente. Pasó por el Hotel Marguery, el Hotel Pennsylvania y el Governor Clinton antes de establecerse en el Hotel New Yorker en 1933. Su reputación como genio excéntrico crecía a medida que sus recursos económicos disminuían de manera constante y preocupante.',
      'El gobierno yugoslavo le otorgó una pensión mensual de 7,200 dólares anuales a partir de 1934, reconociendo su contribución como el científico más distinguido nacido en el territorio que después se convertiría en Yugoslavia. Esta pensión, junto con contribuciones ocasionales de amigos como el escritor Robert Underwood Johnson y el industrial John Hays Hammond Jr., le permitió mantener una existencia modesta pero digna en los últimos años de su vida, aunque nunca recuperó la solvencia económica.',
      'A pesar de su situación financiera, Tesla continuó trabajando en ideas y diseños hasta sus últimos días. Su mente seguía activa, elaborando conceptos para motores de turbina mejorados, sistemas de energía geotérmica y dispositivos de comunicación interplanetaria. Mantenía cuadernos llenos de diagramas y ecuaciones, muchos de los cuales permanecieron sin publicar tras su muerte. La paradoja de Tesla era notable: el hombre cuyas invenciones habían hecho posible la electrificación del mundo moderno vivía en una habitación de hotel, dependiendo de la generosidad de otros para cubrir sus gastos diarios básicos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La torre Wardenclyffe medía 57 metros de altura y estaba coronada por una cúpula semiesférica de cobre de 20 metros de diámetro. Tesla la diseñó para transmitir electricidad a través de la ionosfera terrestre, usando la Tierra misma como conductor. Cuando fue demolida en 1917 para pagar deudas, el acero de la estructura se vendió como chatarra por apenas unos pocos miles de dólares. En 2013, un crowdfunding recaudó 1.37 millones de dólares para comprar el terreno y convertirlo en un museo dedicado a Tesla.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El concepto de Tesla sobre la transmisión inalámbrica de energía no era pura fantasía. En 2020, investigadores de la Universidad de Hiroshima lograron transmitir 1.8 kilovatios de energía a través de microondas a una distancia de 55 metros con una eficiencia del 42%. Empresas como Powercast y Ossia desarrollan tecnología de carga inalámbrica basada en principios similares a los que Tesla propuso en 1901, aunque a escalas mucho menores que las que él imaginó para su sistema global.' },
    ],
    fact: 'Cuando Tesla rompió su contrato de regalías con Westinghouse en 1897, renunció a ingresos estimados en 12 millones de dólares de la época, equivalentes a más de 400 millones de dólares actuales. Si hubiera mantenido ese acuerdo, habría sido uno de los hombres más ricos de Estados Unidos. Tesla tomó esa decisión en 15 minutos, rompiendo el contrato frente a George Westinghouse con las palabras: "Usted ha creído en mí cuando nadie más lo hizo. Usted me respaldó cuando los demás se burlaban. El beneficio que llegará a la humanidad de mi sistema de corriente alterna es más importante que el dinero."',
  },
  {
    id: 'hotel-new-yorker',
    title: 'Hotel New Yorker',
    color: '#D4A535',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'El Hotel New Yorker, ubicado en la Octava Avenida y la Calle 34 de Manhattan, fue el último hogar de Nikola Tesla durante los diez años finales de su vida, desde 1933 hasta su muerte en 1943. Ocupaba las habitaciones 3327 y 3328 en el piso 33, elegidas según sus reglas numéricas: Tesla tenía una fuerte predilección por números divisibles entre tres. El hotel, inaugurado en 1930, era uno de los más modernos de Nueva York, con su propia planta generadora de electricidad en el sótano, lo cual resultaba apropiado para el inventor del sistema eléctrico de corriente alterna.',
      'La rutina diaria de Tesla en el Hotel New Yorker seguía un patrón estricto e invariable. Se levantaba cada día a las 8:00 de la mañana, trabajaba en sus notas y cálculos hasta las 12:00 del mediodía, y luego caminaba hasta Bryant Park o Central Park para alimentar a las palomas. Regresaba al hotel a las 14:00, continuaba trabajando hasta las 18:00, y cenaba solo en el restaurante del hotel exactamente a las 20:10. Antes de cada comida, el personal del hotel debía proporcionarle exactamente 18 servilletas limpias, que usaba para pulir cada pieza de cubertería y cristalería antes de comer.',
      'Las excentricidades de Tesla en el hotel eran bien conocidas por el personal. Calculaba el volumen de cada plato de comida antes de consumirlo. Nunca estrechaba la mano de nadie y evitaba tocar objetos que otras personas hubieran manipulado recientemente. Usaba guantes blancos en la mayoría de las situaciones sociales y cambiaba sus servilletas con frecuencia obsesiva. Estas conductas, que hoy podrían diagnosticarse como trastorno obsesivo-compulsivo, se intensificaron durante sus años en el New Yorker, posiblemente exacerbadas por el aislamiento social y la falta de contacto regular con colegas científicos.',
      'Tesla también mostraba una aversión particular hacia los objetos esféricos, especialmente las perlas. Según varios testimonios, se negaba a hablar con mujeres que llevaran perlas como adorno. En una ocasión, pidió a su secretaria que se fuera a casa y regresara sin su collar de perlas antes de continuar dictándole una carta. También evitaba las habitaciones de hotel cuyo número no fuera divisible por tres, y contaba sus pasos al caminar. El número tres dominaba su vida: daba tres vueltas alrededor de un edificio antes de entrar, y requería tres servilletas dobladas junto a cada cubierto.',
      'A pesar de sus peculiaridades, el personal del Hotel New Yorker lo trataba con respeto y afecto. La dirección del hotel nunca le presionó por las deudas acumuladas en su cuenta, que ascendían a varios miles de dólares. Los empleados le guardaban las palomas heridas que encontraban en las calles cercanas, sabiendo que Tesla las cuidaría en su habitación. El gerente del hotel, que admiraba profundamente al inventor, instruyó al personal para que atendiera cada solicitud de Tesla sin cuestionar, reconociendo que albergaban a uno de los grandes genios de la historia de la humanidad entre sus paredes.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Hotel New Yorker tenía su propia planta generadora de electricidad, la más grande de cualquier edificio privado en su época, capaz de producir suficiente energía para una ciudad de 35,000 habitantes. Funcionaba con corriente alterna, el sistema inventado por Tesla. Había una simetría poética en el hecho de que Tesla viviera sus últimos años en un edificio alimentado por su propia creación. Hoy, una placa conmemorativa en el lobby del hotel marca la habitación 3327 como el último hogar del inventor.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El trastorno obsesivo-compulsivo (TOC) que Tesla aparentemente padecía afecta al 2-3% de la población mundial. Los estudios neurocientíficos modernos han identificado que el TOC está relacionado con una hiperactividad en el circuito córtico-estriado-talámico-cortical del cerebro. Investigadores de la Universidad de Cambridge publicaron en 2019 que personas con TOC muestran mayor actividad en la corteza orbitofrontal, lo cual podría estar relacionado con una mayor capacidad de detección de patrones, una habilidad que Tesla poseía en grado superlativo.' },
    ],
    fact: 'La habitación 3327 del Hotel New Yorker no fue elegida al azar. Tesla exigía que todos los números en su vida fueran divisibles por tres: la habitación 3327 (3+3+2+7=15, divisible por 3), su hora de cena (20:10, 2+0+1+0=3), sus 18 servilletas (divisible por 3). Esta fijación numérica llevó a Tesla a declarar públicamente en 1934: "Si supieras la magnificencia de los números 3, 6 y 9, tendrías la clave del universo." Esta frase se ha convertido en una de las citas más reproducidas en la cultura popular, aunque los matemáticos señalan que no tiene fundamento científico formal.',
  },
  {
    id: 'palomas-tesla',
    title: 'Las Palomas de Tesla',
    color: '#7A8B96',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'La relación de Nikola Tesla con las palomas de Nueva York fue uno de los aspectos más documentados y comentados de sus últimos años. Cada día, sin importar el clima, Tesla caminaba desde el Hotel New Yorker hasta Bryant Park y la Biblioteca Pública de Nueva York en la Quinta Avenida para alimentar a cientos de palomas. Llevaba bolsas de semillas y maíz compradas con dinero que apenas podía permitirse gastar. Esta rutina comenzó alrededor de 1920 y se mantuvo de manera ininterrumpida durante más de dos décadas, convirtiéndose en una parte esencial de su vida diaria.',
      'Tesla no solo alimentaba a las palomas en los parques, sino que también las cuidaba en su habitación del hotel cuando estaban heridas o enfermas. Construyó dispositivos caseros para entablillar alas rotas y preparaba mezclas especiales de semillas molidas para las aves que no podían comer por sí mismas. En una ocasión, gastó más de 2,000 dólares de la época en una operación para una paloma con el ala rota, llevándola a un veterinario que accedió a tratarla. Los hoteles anteriores donde vivió lo expulsaron parcialmente por esta práctica, pero el New Yorker fue más tolerante con su dedicación a estas aves urbanas.',
      'Entre todas las palomas, Tesla desarrolló un vínculo particular con una hembra blanca que visitaba regularmente su ventana en el piso 33. Tesla describió a esta paloma con una devoción que sorprendió incluso a sus amigos más cercanos. En una conversación con el biógrafo John O\'Neill en 1939, Tesla declaró: "He estado alimentando palomas, miles de ellas durante años. Pero había una, una paloma hermosa, blanca pura con manchas grises claras en sus alas; esa era diferente. Era una hembra. Yo solo tenía que desearla y llamarla y ella venía volando hacia mí. Yo la amaba como un hombre ama a una mujer, y ella me amaba a mí."',
      'La muerte de esta paloma blanca, que ocurrió aproximadamente en 1937, afectó profundamente a Tesla. Según su propio relato a O\'Neill, la paloma llegó una noche a su ventana y Tesla supo inmediatamente que estaba muriendo. "Cuando esa paloma murió, algo también murió en mí", le confesó a su biógrafo. "Hasta ese punto, supe que había una razón para seguir viviendo, un propósito para mi trabajo. Pero cuando se fue, supe que mi trabajo de vida había terminado." Varios historiadores han interpretado este episodio como una manifestación de la profunda soledad que Tesla experimentaba tras décadas de aislamiento social voluntario.',
      'Los psicólogos e historiadores modernos han analizado la relación de Tesla con las palomas desde múltiples perspectivas. Algunos sugieren que representaba una forma de conexión emocional para alguien que había rechazado las relaciones humanas íntimas durante toda su vida adulta. Tesla nunca se casó ni mantuvo una relación romántica documentada, creyendo que el celibato era necesario para mantener la concentración científica. Marc Seifer, autor de una biografía detallada de Tesla, señala que las palomas cumplían una función terapéutica, proporcionándole compañía incondicional sin las complejidades de las relaciones humanas que Tesla encontraba difíciles de manejar.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las palomas de roca (Columba livia), la especie que Tesla alimentaba en Nueva York, son capaces de reconocer rostros humanos individuales. Un estudio de 2011 publicado en la revista Avian Biology Research por investigadores de la Universidad de París demostró que las palomas entrenadas podían distinguir entre dos personas diferentes basándose únicamente en sus rasgos faciales, incluso cuando cambiaban de ropa. Es científicamente plausible que la paloma blanca de Tesla lo reconociera individualmente entre las miles de personas que pasaban por Bryant Park cada día.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las palomas poseen un sistema de navegación biológica que incluye cristales de magnetita en sus picos, que funcionan como una brújula magnética interna. Además, investigaciones de la Universidad de Oxford publicadas en 2004 demostraron que las palomas pueden detectar infrasonidos por debajo de 0.1 Hz y utilizar mapas olfativos para orientarse. Su capacidad visual incluye la percepción de luz ultravioleta y polarizada, lo cual les permite detectar patrones en el cielo invisibles para el ojo humano. Tesla, que estudiaba el electromagnetismo, posiblemente intuía esta conexión magnética con las aves.' },
    ],
    fact: 'Las palomas que Tesla alimentaba en Nueva York eran descendientes de las palomas de roca europeas traídas a América del Norte en el siglo XVII. Estas aves tienen una capacidad demostrada para volar a velocidades de hasta 148 km/h y recorrer distancias de más de 1,800 kilómetros para regresar a su hogar. Durante la Primera Guerra Mundial, una paloma mensajera llamada Cher Ami salvó a 194 soldados estadounidenses del Batallón Perdido en octubre de 1918, volando 40 kilómetros con un mensaje a pesar de haber sido herida por disparos. Tesla conocía estas capacidades y las consideraba una demostración de la conexión entre los organismos vivos y los campos electromagnéticos terrestres.',
  },
  {
    id: 'celebridad-soledad',
    title: 'Celebridad y Soledad',
    color: '#C49225',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'El 20 de julio de 1931, Nikola Tesla apareció en la portada de la revista Time Magazine con motivo de su septuagésimo quinto cumpleaños. El artículo lo describía como uno de los inventores más prolíficos de la historia y detallaba sus contribuciones al desarrollo del sistema eléctrico moderno. Esta portada representó un reconocimiento público significativo en un momento en que Tesla vivía en relativa oscuridad financiera. La revista publicó una fotografía suya mirando directamente a la cámara, con un pie de foto que lo identificaba como el padre de la corriente alterna que electrificó al mundo entero.',
      'Con ocasión de ese mismo cumpleaños, Tesla recibió cartas de felicitación de algunas de las mentes más destacadas de su época. Albert Einstein le envió una carta reconociendo su contribución al desarrollo de la ingeniería eléctrica moderna. Robert Millikan, premio Nobel de Física en 1923, también le escribió expresando admiración por su trabajo pionero. La Asociación de Patentes de Inventores le otorgó una condecoración especial. Sin embargo, estas muestras de respeto contrastaban con la realidad cotidiana de Tesla: un hombre solitario que cenaba solo cada noche y cuya principal compañía eran las palomas de los parques de Manhattan.',
      'Tesla continuó realizando sus anuncios anuales de cumpleaños ante la prensa hasta 1937, cuando cumplió 81 años. En cada conferencia, presentaba ideas para inventos que frecuentemente desafiaban la comprensión de los periodistas presentes. En 1931 anunció estar trabajando en un motor cósmico que aprovecharía la energía del espacio. En 1933 declaró haber descubierto una nueva fuente de energía diferente a cualquiera conocida. En 1934 habló de un arma defensiva de partículas que haría la guerra obsoleta. Los periodistas asistían fielmente, aunque muchos cuestionaban en privado la viabilidad de estos anuncios que nunca se materializaban en prototipos funcionales.',
      'La paradoja de la fama tardía de Tesla radica en que el público lo celebraba por sus logros pasados mientras ignoraba su situación presente. En los años treinta, su nombre aparecía en libros de texto de ingeniería eléctrica de todo el mundo, pero él no podía pagar su cuenta del hotel. Universidades le otorgaban doctorados honoris causa mientras él dependía de una pensión extranjera para sobrevivir. En 1936, recibió la Orden del Águila Blanca del gobierno yugoslavo, y en 1937 fue nominado al Premio Nobel de Física, aunque nunca lo recibió. Los rumores sugieren que Tesla rechazó compartir el premio con Edison en 1915.',
      'La soledad de Tesla era tanto elegida como impuesta. Había construido su vida alrededor de la investigación solitaria, rechazando deliberadamente las relaciones personales que consideraba distracciones de su trabajo. En una entrevista de 1935 con el periodista George Sylvester Viereck, Tesla explicó: "No creo que haya emoción más intensa para un inventor que ver su creación funcionando. Tales emociones hacen que uno se olvide de comer, de dormir, de todo." Sin embargo, sus escritos privados revelan una melancolía creciente, especialmente después de la muerte de su paloma blanca. Los pocos amigos que le quedaban notaron un deterioro en su ánimo y en su salud durante los últimos años de la década de 1930.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La carta que Einstein envió a Tesla en 1931 decía, en parte: "Me complace saber que usted está celebrando su 75 cumpleaños y que, como un pionero productivo en el campo de las corrientes de alta frecuencia, ha experimentado el maravilloso desarrollo de esta área de la tecnología." Aunque respetuosa, la carta era notablemente breve comparada con las que Einstein enviaba a colegas con quienes mantenía debates activos. Algunos historiadores interpretan esto como evidencia de que Einstein respetaba los logros de ingeniería de Tesla pero no lo consideraba un físico teórico de su mismo nivel.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Tesla afirmaba en su conferencia de 1931 que estaba trabajando en un motor que extraería energía del "medio ambiente". Aunque sus contemporáneos lo consideraron imposible, la física moderna ha confirmado que el vacío cuántico contiene energía (la energía del punto cero o zero-point energy). En 1948, Hendrik Casimir predijo que dos placas metálicas cercanas experimentarían una fuerza atractiva debido a fluctuaciones del vacío cuántico. Este efecto Casimir fue medido experimentalmente en 1997 por Steve Lamoreaux en Los Álamos, confirmando que el "espacio vacío" contiene energía medible.' },
    ],
    fact: 'La nominación de Tesla al Premio Nobel de Física en 1937 fue presentada por Felix Ehrenfeld, un físico de Graz, Austria, la misma ciudad donde Tesla estudió ingeniería eléctrica en 1875. El comité Nobel nunca concedió el premio a Tesla. Según los archivos del Nobel, abiertos al público 50 años después de cada nominación, Tesla fue nominado en total en pocas ocasiones, mientras que científicos como Marie Curie recibieron decenas de nominaciones antes de ganar. La leyenda urbana de que Tesla rechazó el Nobel en 1915 para no compartirlo con Edison carece de respaldo documental en los archivos oficiales de la Fundación Nobel.',
  },
  {
    id: 'rayo-muerte-redux',
    title: 'El Rayo de la Muerte',
    color: '#8A9AA6',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'En su conferencia de prensa de cumpleaños del 11 de julio de 1934, Tesla anunció al mundo que había desarrollado los planos de un arma defensiva que llamó "Teleforce". Los periódicos de la época, siempre propensos al sensacionalismo, la bautizaron inmediatamente como el "Rayo de la Muerte", un nombre que Tesla rechazó repetidamente. Según su descripción técnica, el dispositivo proyectaría un haz concentrado de partículas microscópicas a través de un tubo de vacío, capaces de destruir aviones a una distancia de 400 kilómetros y derribar ejércitos enteros de diez mil soldados en un instante.',
      'El mecanismo descrito por Tesla se basaba en cuatro componentes principales: un generador Van de Graaff de diseño propio capaz de producir voltajes de 60 millones de voltios, un sistema para producir y dirigir partículas de tungsteno o mercurio, un tubo de vacío abierto al exterior (algo que la tecnología de la época no podía lograr), y un mecanismo de enfoque electromagnético para dirigir el haz con precisión. Tesla afirmaba que la tecnología no usaba rayos de energía como los descritos en la ciencia ficción, sino partículas físicas aceleradas a velocidades cercanas a la de la luz, un principio similar al que utilizan los aceleradores de partículas modernos.',
      'Tesla intentó vender los planos del Teleforce a varios gobiernos durante la década de 1930. Ofreció el dispositivo al gobierno de Estados Unidos, que mostró interés limitado. El gobierno británico envió representantes para evaluar la propuesta pero no procedió con la compra. Tesla también se comunicó con la Unión Soviética, que en 1937 le pagó 25,000 dólares por un estudio preliminar del concepto, aunque el proyecto nunca avanzó más allá de la fase teórica. El gobierno yugoslavo también expresó interés pero carecía de los recursos técnicos y financieros para desarrollar el arma propuesta por el inventor.',
      'La relación entre Tesla y las agencias de inteligencia estadounidenses se intensificó durante sus últimos años. El FBI mantuvo un expediente sobre Tesla que incluía informes sobre sus reuniones con representantes de gobiernos extranjeros y sus anuncios públicos sobre armas avanzadas. J. Edgar Hoover, director del FBI, ordenó que se monitorearan las actividades de Tesla tras sus contactos con la embajada soviética. El Departamento de Guerra también seguía de cerca sus declaraciones, preocupado por la posibilidad de que tecnología militar potencialmente relevante cayera en manos de potencias rivales durante un período de creciente tensión internacional.',
      'Desde una perspectiva científica moderna, el concepto del Teleforce de Tesla tenía elementos tanto viables como imposibles. La aceleración de partículas cargadas es un principio bien establecido: el Gran Colisionador de Hadrones del CERN acelera protones al 99.999999% de la velocidad de la luz. Sin embargo, dirigir un haz de partículas a través de la atmósfera a 400 kilómetros es un desafío que la tecnología actual no ha resuelto, ya que las partículas interactúan con las moléculas del aire y se dispersan rápidamente. El programa de Defensa Estratégica de Estados Unidos (conocido como "Star Wars"), propuesto por Ronald Reagan en 1983, exploró conceptos similares con láseres y haces de partículas, pero fue abandonado por limitaciones técnicas comparables.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Tesla escribió un documento técnico detallado sobre el Teleforce titulado "New Art of Projecting Concentrated Non-Dispersive Energy Through Natural Media", fechado el 16 de mayo de 1935. Este documento, de aproximadamente 20 páginas, describía con precisión matemática los cuatro componentes del arma. Una copia fue encontrada en su habitación del Hotel New Yorker después de su muerte. El documento fue clasificado inmediatamente por la Oficina de Propiedad Alienígena del gobierno estadounidense y no fue desclasificado parcialmente hasta 1981, casi cuatro décadas después de la muerte de Tesla.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los aceleradores de partículas modernos utilizan principios que Tesla describió en 1934. El Gran Colisionador de Hadrones (LHC) del CERN, con 27 kilómetros de circunferencia, acelera protones usando campos electromagnéticos de radiofrecuencia, alcanzando energías de 6.5 TeV por haz. Sin embargo, estos haces funcionan en ultra-alto vacío (10^-10 mbar) y se dispersarían en microsegundos si se expusieran a la atmósfera. El desafío técnico que Tesla no pudo resolver — mantener un haz coherente en aire abierto — sigue sin solución práctica a escala militar en el año 2024.' },
    ],
    fact: 'El pago de 25,000 dólares que la Unión Soviética realizó a Tesla en 1937 por su estudio del Teleforce equivale a aproximadamente 530,000 dólares actuales. Este pago fue confirmado por documentos desclasificados del FBI y del Departamento de Estado estadounidense. La transacción fue legal en su momento, ya que Estados Unidos y la URSS no eran enemigos oficiales en 1937. Sin embargo, después de la muerte de Tesla en 1943, el miedo a que los soviéticos tuvieran acceso a tecnología avanzada de Tesla fue una de las razones por las que el gobierno estadounidense confiscó inmediatamente todos sus papeles y pertenencias del Hotel New Yorker.',
  },
  {
    id: 'ultimo-dia',
    title: 'El Último Día',
    color: '#B88420',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'El 7 de enero de 1943, alrededor de las 10:30 de la noche, Nikola Tesla falleció solo en su habitación 3327 del Hotel New Yorker en Manhattan. Su cuerpo fue descubierto al día siguiente, el 8 de enero, por la camarera Alice Monaghan, quien había ingresado a la habitación después de que Tesla no respondiera al servicio de limpieza durante dos días. Monaghan encontró al inventor en su cama, vestido, con las manos cruzadas sobre el pecho. El médico forense de la ciudad de Nueva York, H.W. Wembly, determinó que la causa de muerte fue una trombosis coronaria y certificó que Tesla había fallecido a la edad de 86 años.',
      'Los días previos a su muerte siguieron su rutina habitual con pocas variaciones observables. El 5 de enero, Tesla llamó al mensajero del hotel y le pidió que entregara un sobre a la oficina local de la Western Union. El 6 de enero, colocó el cartel de "No molestar" en su puerta, algo que hacía ocasionalmente cuando deseaba trabajar sin interrupciones. El personal del hotel no consideró esto inusual hasta que, el 8 de enero, la ausencia de comunicación motivó que Monaghan verificara su estado. Tesla había pedido que nadie entrara a su habitación sin su permiso explícito, una instrucción que el personal respetó fielmente incluso en este caso.',
      'Las horas siguientes al descubrimiento del cuerpo fueron caóticas. La policía de Nueva York fue notificada, seguida por el consulado yugoslavo y el FBI. Antes de que el sobrino de Tesla, Sava Kosanovic, pudiera llegar al hotel, agentes del gobierno estadounidense ya habían ingresado a la habitación y comenzado a revisar sus pertenencias. La Oficina de Propiedad Alienígena (OAP), una agencia federal encargada de manejar los bienes de ciudadanos extranjeros durante la guerra, tomó custodia oficial de todos los documentos de Tesla, a pesar de que Tesla había obtenido la ciudadanía estadounidense en 1891.',
      'El funeral de Tesla se celebró el 12 de enero de 1943 en la Catedral de San Juan el Divino en Manhattan, la catedral más grande del hemisferio occidental. Asistieron aproximadamente 2,000 personas, incluyendo varios premios Nobel y representantes de gobiernos de todo el mundo. El alcalde de Nueva York, Fiorello La Guardia, leyó un elogio fúnebre escrito por el autor Louis Adamic, transmitido en directo por la emisora WNYC. Los mensajes de condolencia incluyeron uno de Eleanor Roosevelt, la primera dama de Estados Unidos, y otro del rey Pedro II de Yugoslavia, entonces en el exilio en Londres.',
      'Tras el funeral, el cuerpo de Tesla fue cremado en el Cementerio de Ferncliff en Ardsley, Nueva York, el 13 de enero de 1943. Sus cenizas fueron inicialmente conservadas en el Cementerio de Ferncliff y posteriormente trasladadas en 1957 al Museo Nikola Tesla en Belgrado, Serbia, donde se encuentran en una urna esférica dorada, una forma geométrica que Tesla — conocido por su aversión a los objetos esféricos, especialmente las perlas — posiblemente no habría elegido. El museo fue inaugurado en la antigua residencia del príncipe Alejandro Obrenovic, un edificio que el gobierno yugoslavo destinó específicamente para honrar la memoria del inventor.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Alice Monaghan, la camarera que descubrió el cuerpo de Tesla, trabajó en el Hotel New Yorker durante más de 20 años. En una entrevista de 1955, recordó que Tesla siempre la trataba con cortesía y le dejaba propinas modestas pero regulares. Monaghan notó que Tesla había dejado una ventana ligeramente abierta, probablemente para que sus palomas pudieran entrar como hacían habitualmente. Junto a su cama había una libreta con anotaciones matemáticas recientes, indicando que había estado trabajando en cálculos hasta poco antes de su muerte a los 86 años de edad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La trombosis coronaria que mató a Tesla es causada por un coágulo sanguíneo que bloquea una arteria coronaria, interrumpiendo el flujo de sangre al músculo cardíaco. En 1943, no existían tratamientos efectivos para esta condición. Hoy, la angioplastia con stent puede resolver la obstrucción en menos de 90 minutos, y medicamentos trombolíticos como la alteplasa pueden disolver el coágulo si se administran dentro de las primeras 3-4.5 horas. La mortalidad por infarto agudo de miocardio ha disminuido del 30% en los años 1940 a menos del 5% en hospitales modernos con unidades de cuidados coronarios especializadas.' },
    ],
    fact: 'Después de la muerte de Tesla, la Oficina de Propiedad Alienígena confiscó aproximadamente 80 baúles con sus documentos personales, prototipos, cuadernos de notas y correspondencia. El Dr. John G. Trump, un profesor de ingeniería eléctrica del MIT y tío del expresidente Donald Trump, fue designado por la OAP para revisar los papeles de Tesla y evaluar si contenían información de valor militar. Trump concluyó en su informe de enero de 1943 que los documentos contenían principalmente "notas especulativas y filosóficas" y que no representaban un peligro para la seguridad nacional. Los baúles fueron finalmente entregados al sobrino de Tesla, Sava Kosanovic, en 1952 y enviados a Belgrado.',
  },
  {
    id: 'legado-inmortal',
    title: 'El Legado Inmortal',
    color: '#5A6B7A',
    btnImage: '/assets/tesla/tesla_m7.png',
    image: '/assets/tesla/tesla_m7.png',
    content: [
      'En 1960, la Conferencia General de Pesos y Medidas (CGPM) adoptó oficialmente el nombre "tesla" (símbolo T) como la unidad del Sistema Internacional para medir la densidad de flujo magnético, también conocida como inducción magnética. Esta decisión reconoció la contribución fundamental de Tesla al estudio del electromagnetismo. Un tesla equivale a un weber por metro cuadrado, o equivalente a 10,000 gauss en el sistema CGS. Para contexto, el campo magnético de la Tierra en su superficie es de aproximadamente 25-65 microteslas, mientras que una máquina de resonancia magnética hospitalaria genera entre 1.5 y 3 teslas, y los electroimanes más potentes del LHC del CERN alcanzan 8.3 teslas.',
      'El nombre de Tesla se encuentra también inscrito en el espacio exterior. El cráter Tesla en la cara oculta de la Luna, de 26 kilómetros de diámetro, fue nombrado por la Unión Astronómica Internacional en 1970 en su honor. El asteroide 2244 Tesla, descubierto el 22 de octubre de 1952 por el astrónomo serbio Milorad B. Protić en el Observatorio de Belgrado, orbita el Sol en el cinturón principal de asteroides entre Marte y Júpiter, completando una órbita cada 3.68 años. Además, una cadena montañosa en la cara oculta de la Luna lleva el nombre de Dorsa Tesla, y el aeropuerto principal de Belgrado fue renombrado Aeropuerto Nikola Tesla en 2006.',
      'La influencia cultural de Tesla experimentó un renacimiento significativo a partir de la década de 2000. En 2003, los empresarios Martin Eberhard y Marc Tarpenning fundaron Tesla Motors (hoy Tesla, Inc.) en Palo Alto, California, eligiendo el nombre del inventor para honrar su contribución a la tecnología de motores eléctricos y corriente alterna. Cuando Elon Musk se unió como presidente del consejo y principal inversor en 2004, la conexión entre la visión de Tesla sobre la energía limpia y la misión de la empresa de acelerar la transición hacia la energía sostenible se convirtió en un elemento central de la identidad de la marca.',
      'El reconocimiento científico de Tesla se ha ampliado progresivamente. En 1975, fue incluido en el Salón de la Fama de Inventores de Estados Unidos. En 2005, la revista Forbes lo incluyó en su lista de los empresarios más relevantes de la historia (aunque Tesla nunca fue un empresario exitoso en el sentido financiero). La IEEE, la organización profesional de ingeniería eléctrica más grande del mundo con más de 400,000 miembros, otorga anualmente la Medalla Nikola Tesla por contribuciones sobresalientes a la generación y utilización de energía eléctrica, considerada uno de los premios más prestigiosos del campo.',
      'El legado técnico de Tesla permanece integrado en la infraestructura tecnológica moderna. Cada motor eléctrico de inducción en funcionamiento, desde los que mueven trenes de alta velocidad hasta los que operan en lavadoras domésticas, utiliza el principio del campo magnético rotativo que Tesla patentó en 1888. Cada transformador que adapta voltajes en las redes eléctricas del mundo funciona con corriente alterna. Cada sistema de transmisión de radio emplea principios que Tesla demostró antes que Marconi. Se estima que el sistema de corriente alterna polifásica de Tesla genera, transmite y distribuye más del 90% de toda la electricidad consumida en el planeta, proporcionando energía a más de 8,000 millones de personas cada día del año.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2012, el dibujante web Matthew Inman de The Oatmeal lanzó una campaña en la plataforma Indiegogo para recaudar fondos y comprar el antiguo laboratorio de Tesla en Wardenclyffe, Long Island. La campaña recaudó 1.37 millones de dólares de más de 33,000 donantes en solo 9 días. Elon Musk contribuyó personalmente con 1 millón de dólares adicionales para la restauración. El Tesla Science Center en Wardenclyffe fue establecido como museo y centro educativo, preservando el único laboratorio de Tesla que sobrevive, aunque la torre original fue demolida en 1917 y solo queda la base del edificio principal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El motor de inducción de Tesla, patentado en 1888, convierte energía eléctrica en energía mecánica sin necesidad de contacto físico entre el rotor y las bobinas del estátor. Este principio se basa en la Ley de Faraday (1831) y la Ley de Lenz (1834), que describen cómo un campo magnético variable induce corrientes en un conductor. Los motores de inducción modernos alcanzan eficiencias del 95-97%, lo que significa que casi toda la energía eléctrica se convierte en movimiento útil. Más de 45% de toda la electricidad generada en el mundo es consumida por motores eléctricos industriales, la mayoría basados en el diseño original de Tesla.' },
    ],
    fact: 'La empresa Tesla, Inc. alcanzó una capitalización de mercado de más de 1 billón de dólares en octubre de 2021, convirtiéndose en la sexta empresa más valiosa del mundo. Nikola Tesla, cuyo nombre lleva la compañía, murió con deudas pendientes en su cuenta del Hotel New Yorker y fue enterrado con una ceremonia financiada parcialmente por contribuciones del gobierno yugoslavo. Sus 300 patentes, que abarcaban desde motores eléctricos hasta sistemas de iluminación y transmisión inalámbrica, habían expirado décadas antes de que su nombre se convirtiera en sinónimo de innovación tecnológica del siglo XXI. La ironía es que Tesla nunca recibió beneficios financieros proporcionales al valor que sus inventos crearon para la civilización.',
  },
];

// ─── Storm Particle Field (Canvas Background) ───────────────────────────────
function StormField() {
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
      hue: Math.random() > 0.5 ? '212,165,53' : '107,123,138', // marigold or storm grey
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

// ─── Tesla's Last Years Header ───────────────────────────────────────────────
function TeslaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#teslaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6B7B8A','#D4A535','#7A8B96','#C49225','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central lightning icon */}
        <path d="M302 18 L296 32 L300 32 L294 44 L308 28 L302 28 Z" fill="#D4A535" opacity="0.6" />
        <circle cx="300" cy="30" r="16" fill="none" stroke="#D4A535" strokeWidth="1.2" opacity="0.4" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LOS ÚLTIMOS AÑOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">NIKOLA TESLA · 1933–1943</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotTeslaM7"
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

// ─── Expandable Section with Random Direction ────────────────────────────────
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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

      {/* ─── Two-Column Hero Section ─── */}
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

      {/* ─── Magazine Body ─── */}
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
                  {i === 0 ? '◆' : '◇'}
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Video Section ─── */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
          </div>
        )}

        {/* Fact Box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`,
            borderRadius: '16px',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0,
              width: '36px', height: '36px',
              borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase',
              }}>
                Dato Científico
              </span>
              <p style={{
                margin: '0.3rem 0 0', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.92rem', lineHeight: 1.7,
              }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A535, #6B7B8A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_TeslaM7() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,12,20,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/tesla/tesla_m7.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StormField />

      <TeslaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem 1.2rem',
        position: 'relative',
        zIndex: 2,
        marginBottom: '1rem',
        padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton
            key={node.id}
            node={node}
            index={index}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel
            key={activeData.id}
            node={activeData}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has descubierto los últimos años de Nikola Tesla!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Historiador de Tesla
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ─── Bibliografía ─── */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📚 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
