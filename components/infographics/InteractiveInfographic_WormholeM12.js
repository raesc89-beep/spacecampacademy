'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9FB3C8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Jafferis, D., Zlokapa, A., Lykken, J. D., et al. (2022). «Traversable wormhole dynamics on a quantum processor». Nature, 612, 51–55.",
  "Kobrin, B., Schuster, T., Yao, N. Y. (2023). «Comment on: Traversable wormhole dynamics on a quantum processor». arXiv:2302.07897.",
  "Arkani-Hamed, N., Dimopoulos, S., Dvali, G. (1998). «The hierarchy problem and new dimensions at a millimeter». Physics Letters B, 429, 263–272.",
  "Ellis, J., Giudice, G., Mangano, M., Tkachev, I., Wiedemann, U. (LSAG) (2008). «Review of the safety of LHC collisions». Journal of Physics G, 35, 115004.",
  "Lamoreaux, S. K. (1997). «Demonstration of the Casimir force in the 0.6 to 6 μm range». Physical Review Letters, 78, 5–8.",
  "Cramer, J. G., Forward, R. L., Morris, M. S., Visser, M., Benford, G., Landis, G. A. (1995). «Natural wormholes as gravitational lenses». Physical Review D, 51, 3117.",
  "Cardoso, V., Franzin, E., Pani, P. (2016). «Is the gravitational-wave ringdown a probe of the event horizon?». Physical Review Letters, 116, 171101.",
  "CERN. «LHC: the guide» y «Facts and figures about the LHC». home.cern."
];

const INFOGRAPHIC_NODES = [
  {
    id: "abismo-energia-lhc",
    bannerImage: '/assets/wormhole/infographic_m12/banner_abismo-energia-lhc.webp',
    bannerCaption: "El LHC hace chocar protones a 13,6 TeV; la energía de Planck es casi mil billones de veces mayor.",
    title: "El Abismo de Energía",
    color: '#5B7A8C',
    btnImage: '/assets/wormhole/infographic_m12/btn_abismo-energia-lhc.webp',
    image: '/assets/wormhole/infographic_m12/hero_abismo-energia-lhc.webp',
    content: [
      "¿Por qué ningún laboratorio ha fabricado todavía un agujero de gusano? No es porque esté prohibido ni porque falte algún material raro en un almacén: el gran obstáculo es la energía. Según la relatividad general, para curvar el espacio-tiempo de forma apreciable hay que concentrar cantidades enormes de masa o energía en una región diminuta. La Tierra entera, con casi seis cuatrillones de kilogramos, apenas deforma el espacio lo suficiente para mantenernos pegados al suelo. Abrir un túnel exigiría curvaturas muchísimo más extremas.",
      "La herramienta más poderosa que hemos construido para explorar energías extremas es el Gran Colisionador de Hadrones (LHC) del CERN, un anillo de 27 kilómetros enterrado a unos 100 metros bajo la frontera entre Francia y Suiza. Allí, más de 1.200 imanes dipolares superconductores, enfriados a −271,3 °C, guían haces de protones que dan unas 11.000 vueltas al anillo cada segundo. Esos protones viajan al 99,9999991 % de la velocidad de la luz, tan cerca del límite cósmico que casi no pueden acelerar más.",
      "Desde 2022, en su tercera etapa de funcionamiento, llamada Run 3, el LHC hace chocar protones con una energía total de 13,6 teraelectronvoltios (TeV). Suena gigantesco, pero el propio CERN explica que un TeV equivale más o menos a la energía de movimiento de un mosquito en vuelo. Lo asombroso del LHC no es la cantidad total de energía, sino que la concentra en un espacio billones de veces más pequeño que un mosquito. Así recrea, por un instante, condiciones parecidas a las del universo recién nacido.",
      "La escala a la que la gravedad y la mecánica cuántica se mezclan por completo se llama energía de Planck, y vale unos 1,2 × 10¹⁹ gigaelectronvoltios. Comparada con los 13,6 TeV del LHC, la diferencia es de casi mil billones de veces: un uno seguido de quince ceros. Como la energía de un acelerador circular crece con el tamaño del anillo, alcanzar esa escala con imanes como los actuales exigiría un anillo de cientos de años luz de radio, mucho más grande que la distancia a las estrellas cercanas.",
      "Y aunque tuviéramos esa energía, no bastaría. Los cálculos de Michael Morris y Kip Thorne mostraron que mantener abierta la garganta de un agujero de gusano transitable exige materia exótica con densidad de energía negativa, algo que ningún acelerador produce en cantidades útiles. Por eso los experimentos actuales no intentan fabricar túneles directamente: buscan pistas indirectas. Prueban si existen dimensiones extra, miden efectos cuánticos del vacío, simulan geometrías en computadoras cuánticas y vigilan el cielo en busca de señales que no encajen con nada conocido."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los imanes del LHC funcionan a 1,9 kelvin, es decir, −271,3 °C. Es una temperatura más fría que la del espacio profundo, que ronda los 2,7 kelvin por culpa de la radiación de fondo de microondas que dejó el Big Bang. Para lograrlo, el CERN utiliza decenas de toneladas de helio líquido, lo que convierte al LHC en uno de los sistemas criogénicos más grandes del planeta. Sin ese frío extremo, los cables superconductores no podrían transportar las corrientes de casi 12.000 amperios necesarias para curvar los haces." },
      { label: "Dato Científico", icon: "atom", text: "La energía de Planck surge de combinar tres constantes fundamentales: la velocidad de la luz (c), la constante de gravitación universal (G) y la constante de Planck reducida (ħ). Su valor es de aproximadamente 2 × 10⁹ julios, parecido a la energía química de unos 55 litros de gasolina. Lo extremo no es la cantidad en sí, sino meterla entera en una sola partícula dentro de una región de 1,6 × 10⁻³⁵ metros, la longitud de Planck. Ningún aparato conocido puede concentrar energía de esa manera." }
    ],
    fact: "Dato Clave: en su diseño original, cada haz del LHC contiene unos 2.800 paquetes con más de cien mil millones de protones cada uno y almacena alrededor de 360 megajulios, una energía comparable a la de un tren de 400 toneladas lanzado a 150 km/h. Aun así, cada choque individual entre dos protones reúne apenas 13,6 TeV, casi mil billones de veces menos que la energía de Planck, el umbral donde la gravedad cuántica y los posibles microagujeros de gusano entrarían en juego.",
  },
  {
    id: "dimensiones-extra-mini-agujeros",
    bannerImage: '/assets/wormhole/infographic_m12/banner_dimensiones-extra-mini-agujeros.webp',
    bannerCaption: "En 1998, el modelo ADD propuso dimensiones extra que permitirían crear mini agujeros negros en colisionadores.",
    title: "Dimensiones Extra y Mini Agujeros Negros",
    color: '#7A6C8F',
    btnImage: '/assets/wormhole/infographic_m12/btn_dimensiones-extra-mini-agujeros.webp',
    image: '/assets/wormhole/infographic_m12/hero_dimensiones-extra-mini-agujeros.webp',
    content: [
      "La gravedad es, con muchísima diferencia, la fuerza más débil de la naturaleza. Entre dos protones, la repulsión eléctrica es alrededor de 10³⁶ veces más intensa que su atracción gravitatoria. Un pequeño imán de nevera vence sin esfuerzo la gravedad de todo el planeta cuando levanta un clip. Los físicos llaman a esta enorme diferencia el problema de la jerarquía, y llevan décadas preguntándose por qué la gravedad es tan débil comparada con las demás fuerzas fundamentales del universo.",
      "En 1998, Nima Arkani-Hamed, Savas Dimopoulos y Gia Dvali propusieron una respuesta audaz, conocida como modelo ADD por sus iniciales. Sugirieron que podrían existir dimensiones espaciales extra, enrolladas y de un tamaño que podía llegar hasta un milímetro. Las partículas de la materia y la luz quedarían atrapadas en nuestras tres dimensiones, pero la gravedad podría escaparse hacia las otras. Por eso nos parecería débil: gran parte de su fuerza se diluiría en un espacio que no podemos ver.",
      "Esta idea tenía una consecuencia emocionante. Si la gravedad se vuelve mucho más fuerte a distancias muy cortas, la escala de Planck efectiva podría bajar hasta unos pocos TeV, justo al alcance del LHC. En ese caso, dos protones chocando con suficiente energía podrían concentrar tanta masa en un punto que formarían un agujero negro microscópico. Según la teoría de Stephen Hawking, un objeto así se evaporaría casi al instante, emitiendo una lluvia de partículas en todas direcciones.",
      "Los detectores ATLAS y CMS buscaron esa firma desde que el LHC empezó a funcionar en 2010: colisiones con muchísimas partículas de alta energía repartidas de forma casi esférica. No apareció ninguna. Los análisis descartaron mini agujeros negros con masas inferiores a unos 9 o 10 TeV en muchos de los modelos estudiados. Al mismo tiempo, experimentos con balanzas de torsión de la Universidad de Washington confirmaron que la ley de gravedad de Newton se cumple hasta distancias de unas cincuenta micras.",
      "Este resultado negativo no refuta la teoría de cuerdas ni prohíbe todas las dimensiones extra: simplemente acota dónde podrían esconderse y qué tamaño podrían tener. En ciencia, un resultado nulo también es información valiosa. Antes del encendido, algunos temían que esos agujeros negros fueran peligrosos. El grupo de seguridad del CERN demostró que los rayos cósmicos llevan miles de millones de años provocando choques más energéticos contra la Tierra, la Luna y estrellas densas, y todos siguen intactos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El 15 de octubre de 1991, el detector Fly's Eye de Utah registró un rayo cósmico con unos 3,2 × 10²⁰ electronvoltios, apodado la partícula «Oh-My-God». Era un núcleo atómico microscópico que llevaba la energía de una pelota de béisbol lanzada a casi 100 km/h. Al chocar contra la atmósfera, la energía disponible en la colisión superó con creces la del LHC. Si choques así pudieran crear agujeros negros peligrosos, la naturaleza ya nos lo habría mostrado hace mucho tiempo." },
      { label: "Dato Científico", icon: "atom", text: "La temperatura de Hawking de un agujero negro es inversamente proporcional a su masa: cuanto más pequeño, más caliente está y más rápido se evapora. Un agujero negro del tamaño del Sol tardaría muchísimo más que la edad actual del universo en desaparecer, pero uno con la masa de unos pocos TeV se evaporaría en una fracción de tiempo inimaginable, del orden de 10⁻²⁶ segundos, convirtiéndose en una ráfaga de partículas que los detectores podrían ver." }
    ],
    fact: "Dato Clave: el informe de seguridad del LHC publicado en 2008 por el grupo LSAG del CERN calculó que la naturaleza ya ha realizado en la Tierra el equivalente a unos cien mil programas experimentales completos del LHC mediante rayos cósmicos. Además, estrellas de neutrones y enanas blancas, objetos densísimos que reciben esos impactos constantemente, siguen existiendo después de miles de millones de años. Los mini agujeros negros, si existieran, serían inofensivos.",
  },
  {
    id: "efecto-casimir-vacio",
    bannerImage: '/assets/wormhole/infographic_m12/banner_efecto-casimir-vacio.webp',
    bannerCaption: "En 1948, Hendrik Casimir predijo que dos placas metálicas en el vacío se atraen; en 1997 se midió con precisión.",
    title: "Energía Negativa en el Laboratorio",
    color: '#6B7F5E',
    btnImage: '/assets/wormhole/infographic_m12/btn_efecto-casimir-vacio.webp',
    image: '/assets/wormhole/infographic_m12/hero_efecto-casimir-vacio.webp',
    content: [
      "Para que un agujero de gusano transitable no se cierre de golpe, su garganta necesita energía negativa, es decir, una región donde haya menos energía que en el vacío normal. Parece absurdo: ¿cómo puede haber menos que nada? La clave es que, según la mecánica cuántica, el vacío no está realmente vacío. Incluso en el espacio más oscuro y frío, los campos cuánticos vibran sin cesar con fluctuaciones mínimas. Ese mar inquieto tiene una energía de referencia, y en ciertas situaciones se puede bajar por debajo de ella.",
      "En 1948, el físico neerlandés Hendrik Casimir, que trabajaba en los laboratorios de investigación de Philips en Eindhoven, hizo una predicción sorprendente. Si colocamos dos placas metálicas sin carga, perfectamente paralelas y muy cerca una de otra en el vacío, se atraerán. La razón es que entre las placas solo caben ciertas ondas del campo electromagnético, mientras que fuera caben todas. El resultado es que la energía del vacío entre ellas queda por debajo de la del exterior: una auténtica energía negativa relativa.",
      "Medir esta fuerza diminuta fue un reto durante medio siglo. En 1958, Marcus Sparnaay obtuvo resultados compatibles, aunque con errores muy grandes. En 1997, Steve Lamoreaux, entonces en la Universidad de Washington, usó un péndulo de torsión para medir la fuerza entre una placa y una lente esférica separadas entre 0,6 y 6 micras, con un acuerdo con la teoría del orden del cinco por ciento. Un año después, Umar Mohideen y Anushree Roy lo confirmaron con un microscopio de fuerza atómica, con precisión aún mayor.",
      "La fuerza de Casimir es muy débil a distancias cotidianas, pero crece de manera brutal al acercar las placas. Para dos placas de un centímetro cuadrado separadas una micra, equivale aproximadamente al peso de una mota de polvo. Si la separación baja a diez nanómetros, unas cien veces el tamaño de un átomo, la presión llega a ser parecida a la de toda la atmósfera terrestre. Por eso los ingenieros que diseñan micromáquinas deben tenerla en cuenta: puede hacer que piezas diminutas se peguen sin querer.",
      "El efecto Casimir demuestra que la energía negativa existe de verdad, pero no resuelve el problema de los agujeros de gusano. Los físicos Larry Ford y Thomas Roman descubrieron las llamadas desigualdades cuánticas, que limitan cuánta energía negativa puede acumularse y durante cuánto tiempo. Aplicadas a un agujero de gusano, implican que o bien el túnel es apenas un poco mayor que la longitud de Planck, o bien la energía negativa debe concentrarse en una franja extraordinariamente delgada comparada con el tamaño de su garganta."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El efecto Casimir no es solo una curiosidad de laboratorio. En los sistemas microelectromecánicos, como los acelerómetros diminutos que detectan el giro de tu teléfono, hay piezas móviles separadas por distancias microscópicas. A esas escalas, la fuerza de Casimir y otras fuerzas parecidas pueden hacer que dos piezas se queden pegadas, un fallo que los ingenieros llaman adherencia. Algunos grupos de investigación incluso estudian cómo aprovecharla para fabricar mecanismos sin contacto físico." },
      { label: "Dato Científico", icon: "atom", text: "Para dos placas paralelas ideales, la presión de Casimir es igual a π²ħc dividido entre 240 veces la distancia elevada a la cuarta potencia. Esa cuarta potencia es la clave de su comportamiento: si reduces la distancia a la mitad, la fuerza se multiplica por dieciséis; si la reduces a la décima parte, se multiplica por diez mil. Por eso es prácticamente imperceptible a escala humana, pero domina el mundo de las nanoestructuras." }
    ],
    fact: "Dato Clave: la energía negativa del efecto Casimir es real y medible, pero minúscula. Un agujero de gusano transitable de tamaño humano requeriría, según algunas estimaciones teóricas, una energía negativa equivalente a una masa del orden de la de Júpiter, concentrada alrededor de su garganta. Las desigualdades cuánticas de Ford y Roman sugieren que la naturaleza pone límites muy estrictos a esas acumulaciones, por lo que la ingeniería de túneles sigue fuera de nuestro alcance.",
  },
  {
    id: "chip-sycamore-2022",
    bannerImage: '/assets/wormhole/infographic_m12/banner_chip-sycamore-2022.webp',
    bannerCaption: "En 2022, un equipo liderado por Caltech usó 9 cúbits del procesador Sycamore de Google para simular un agujero de gusano.",
    title: "Un Agujero de Gusano en un Chip",
    color: '#5E7F8C',
    btnImage: '/assets/wormhole/infographic_m12/btn_chip-sycamore-2022.webp',
    image: '/assets/wormhole/infographic_m12/hero_chip-sycamore-2022.webp',
    content: [
      "Si no podemos fabricar un agujero de gusano con energía, ¿podríamos estudiarlo con información? Esa fue la idea detrás de uno de los experimentos más comentados de la última década. Gracias a la holografía, que ya conociste en el módulo anterior, ciertos sistemas cuánticos sin gravedad son matemáticamente equivalentes a geometrías con gravedad. Si se prepara el sistema cuántico adecuado, lo que ocurre dentro de él debería imitar lo que le pasaría a un mensaje que cruza un agujero de gusano en la versión gravitatoria.",
      "El experimento fue dirigido por Maria Spiropulu, del Instituto Tecnológico de California (Caltech), con científicos de Harvard, el MIT, Fermilab y Google Quantum AI. El artículo, firmado en primer lugar por Daniel Jafferis, se publicó en la revista Nature el 30 de noviembre de 2022. Usaron el procesador cuántico Sycamore de Google, formado por circuitos superconductores que se enfrían a temperaturas de apenas unas milésimas de grado por encima del cero absoluto para que los cúbits mantengan su comportamiento cuántico.",
      "El sistema elegido fue una versión del modelo SYK, llamado así por Subir Sachdev, Jinwu Ye y Alexei Kitaev. Este modelo describe partículas que interactúan de forma muy caótica y se sabe que tiene una descripción dual como un agujero negro en un espacio-tiempo simplificado. Como el modelo completo era demasiado grande para el chip, el equipo lo redujo con ayuda de aprendizaje automático hasta que cupo en solo 9 cúbits, conservando, según ellos, los rasgos esenciales del comportamiento de un agujero de gusano.",
      "El protocolo consistió en preparar dos sistemas cuánticos entrelazados, que representaban las dos bocas del túnel. Luego se introducía un cúbit de información en uno de ellos, que se mezclaba y desordenaba por completo. Después se aplicaba un pulso que conectaba ambos sistemas, el equivalente cuántico de la onda de energía negativa que, según un trabajo de Ping Gao, Daniel Jafferis y Aron Wall de 2016, puede volver transitable un agujero de gusano. Al final, la información reaparecía ordenada en el otro sistema.",
      "Lo más llamativo fue cómo reapareció esa información. Los investigadores observaron una firma llamada enrollamiento de tamaño, que indica que el mensaje se recompone en el orden correcto, tal como predice la descripción gravitatoria de un cuerpo que atraviesa el túnel. El resultado mostró que las ideas sobre la relación entre entrelazamiento y geometría son tan concretas que pueden programarse en una máquina real. Muchos titulares, sin embargo, exageraron y afirmaron que se había creado un agujero de gusano de verdad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El procesador Sycamore se hizo famoso en 2019, cuando Google anunció que había resuelto en unos 200 segundos un problema de muestreo que, según sus estimaciones, a la mejor supercomputadora clásica le llevaría unos 10.000 años. IBM respondió que con mejores algoritmos bastarían unos pocos días. Aquella polémica sobre la llamada supremacía cuántica muestra que, en computación cuántica, las afirmaciones espectaculares siempre deben revisarse con lupa." },
      { label: "Dato Científico", icon: "atom", text: "Teletransportar un cúbit no significa mover materia ni enviar nada más rápido que la luz. En la teletransportación cuántica, el estado de una partícula se reconstruye en otra gracias al entrelazamiento, pero siempre hace falta un canal ordinario que transmita información adicional. En el experimento de 2022, ese papel lo cumplía el pulso que conectaba ambos sistemas. Por eso ni el experimento ni la holografía permiten mensajes instantáneos entre lugares lejanos." }
    ],
    fact: "Dato Clave: el experimento de 2022 utilizó solo 9 cúbits y unas 164 operaciones entre pares de cúbits, una cifra modesta comparada con los más de 50 cúbits del chip Sycamore. No se abrió ninguna grieta en el espacio-tiempo del laboratorio: todo ocurrió dentro de circuitos superconductores enfriados cerca del cero absoluto. Lo que se obtuvo fue una simulación cuántica cuyo comportamiento coincidía con el que la teoría holográfica atribuye a un agujero de gusano atravesable.",
  },
  {
    id: "debate-holograma-cuantico",
    bannerImage: '/assets/wormhole/infographic_m12/banner_debate-holograma-cuantico.webp',
    bannerCaption: "En 2023, Kobrin, Schuster y Yao argumentaron que el modelo reducido de 2022 no reproducía bien la física de un agujero de gusano.",
    title: "¿Túnel Real o Túnel Simulado?",
    color: '#8C7A5B',
    btnImage: '/assets/wormhole/infographic_m12/btn_debate-holograma-cuantico.webp',
    image: '/assets/wormhole/infographic_m12/hero_debate-holograma-cuantico.webp',
    content: [
      "El experimento del procesador Sycamore fue celebrado y, a la vez, debatido con intensidad. La crítica más sencilla tiene que ver con la diferencia entre simular algo y crearlo. Una supercomputadora puede simular un huracán con enorme detalle sin mojar a nadie. Del mismo modo, la computadora cuántica representó con cúbits las matemáticas de un agujero de gusano, pero todo ocurrió en el espacio físico ordinario de un chip. Ningún objeto atravesó un túnel en el tejido del universo que habitamos.",
      "En febrero de 2023 llegó una crítica más técnica. Bryce Kobrin, Thomas Schuster y Norman Yao, físicos de Berkeley y Harvard, publicaron un comentario en el que analizaban el modelo simplificado usado en el chip. Según ellos, al reducirlo tanto, el sistema había dejado de comportarse como un sistema verdaderamente caótico, que es lo que se necesita para tener un dual gravitatorio. Además, señalaron que la firma de enrollamiento solo aparecía para los pocos casos con los que el modelo había sido entrenado.",
      "Los autores del experimento respondieron defendiendo que su modelo sí capturaba propiedades clave de la dinámica de un agujero de gusano, y el debate continuó en artículos y conferencias. Este tipo de intercambio no es una señal de que la ciencia falle, sino de que funciona. Cuando un resultado es importante, otros grupos lo revisan, intentan reproducirlo y buscan sus puntos débiles. Una afirmación extraordinaria sobrevive solo si resiste ese escrutinio colectivo durante el tiempo suficiente.",
      "Más allá de la polémica, el experimento forma parte de un programa llamado gravedad cuántica en el laboratorio. En 2019, un grupo que incluía a Adam Brown, Leonard Susskind y Brian Swingle propuso formalmente usar computadoras cuánticas para estudiar la teleportación a través de agujeros de gusano holográficos. La idea es aprovechar máquinas controlables para poner a prueba conjeturas teóricas que serían imposibles de explorar con telescopios o aceleradores, al menos durante muchas generaciones.",
      "El futuro de esta línea de investigación depende del avance de la tecnología. Las computadoras cuánticas actuales tienen pocos cúbits y cometen muchos errores. Con máquinas de cientos o miles de cúbits corregidos, los físicos podrían simular versiones completas del modelo SYK sin necesidad de simplificarlo tanto, y comprobar si la firma del agujero de gusano se mantiene. Si lo hiciera, tendríamos una prueba mucho más sólida de que la geometría del espacio-tiempo puede emerger del entrelazamiento cuántico."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La idea de usar máquinas cuánticas para simular la naturaleza se remonta a Richard Feynman. En 1981, en una conferencia en el MIT titulada «Simular la física con computadoras», argumentó que la naturaleza no es clásica y que, si queremos simularla, conviene usar máquinas que funcionen con las reglas de la mecánica cuántica. Cuarenta años después, su propuesta se usa para explorar fenómenos tan exóticos como los agujeros de gusano." },
      { label: "Dato Científico", icon: "atom", text: "Los análogos de laboratorio ya se han usado para estudiar otros fenómenos gravitatorios. Jeff Steinhauer, del Technion de Israel, creó un horizonte acústico en un condensado de Bose-Einstein, un gas de átomos ultrafríos, y en 2016 y 2019 publicó observaciones de un equivalente sonoro de la radiación de Hawking. Igual que con los agujeros de gusano simulados, estos experimentos no crean agujeros negros reales, pero ponen a prueba las matemáticas que los describen." }
    ],
    fact: "Dato Clave: la comunidad científica coincide en un punto esencial: en 2022 no se creó un agujero de gusano físico. Se simuló un sistema cuántico cuyas matemáticas, según la holografía, equivalen a uno. La discusión abierta es si el modelo tan reducido que se usó conserva realmente esa equivalencia. Responder a esa pregunta exigirá computadoras cuánticas más grandes y menos ruidosas que las disponibles hoy.",
  },
  {
    id: "lentes-tuneles-luz",
    bannerImage: '/assets/wormhole/infographic_m12/banner_lentes-tuneles-luz.webp',
    bannerCaption: "En 1995, Cramer, Forward, Morris, Visser, Benford y Landis calcularon cómo un agujero de gusano con masa negativa desviaría la luz.",
    title: "Lentes Cósmicas: Buscar Túneles con Luz",
    color: '#4F6D7A',
    btnImage: '/assets/wormhole/infographic_m12/btn_lentes-tuneles-luz.webp',
    image: '/assets/wormhole/infographic_m12/hero_lentes-tuneles-luz.webp',
    content: [
      "Una de las predicciones más famosas de Einstein es que la masa desvía la luz. En 1919, durante un eclipse total de Sol, la expedición organizada por Arthur Eddington midió que las estrellas cercanas al borde solar aparecían ligeramente desplazadas, tal como predecía la relatividad general. Hoy llamamos lente gravitacional a este efecto. Galaxias enteras curvan la luz de objetos más lejanos y producen arcos, imágenes múltiples e incluso anillos completos, conocidos como anillos de Einstein.",
      "Cuando el objeto que actúa como lente es pequeño, como una estrella, no vemos imágenes separadas, sino un aumento temporal del brillo de la estrella de fondo. A esto se le llama microlente gravitacional. La curva de luz típica sube y baja de forma suave y simétrica durante días o semanas. Proyectos como OGLE, desde Chile, y MOA, desde Nueva Zelanda, vigilan millones de estrellas del centro de la Vía Láctea para detectar estos eventos, y gracias a ellos se han descubierto muchos exoplanetas.",
      "En 1995, John Cramer, Robert Forward, Michael Morris, Matt Visser, Gregory Benford y Geoffrey Landis se preguntaron cómo se vería un agujero de gusano natural cuya boca tuviera masa total negativa. Calcularon que desviaría la luz hacia fuera en lugar de hacia dentro, actuando como una lente divergente. Su curva de luz sería muy distinta a la habitual: una caída de brillo flanqueada por dos picos agudos. Una firma así, si apareciera en los datos, sería muy difícil de explicar con objetos ordinarios.",
      "Otros modelos de agujero de gusano, como el propuesto por Homer Ellis en 1973, tienen masa nula vista desde lejos y aun así curvan la luz por la forma de su garganta. En 2010, Fumio Abe calculó que sus curvas de microlente serían algo más estrechas que las de una estrella normal. En 2013, Ryuichi Takahashi y Hideki Asada analizaron datos de cuásares del cartografiado Sloan y no encontraron señales de lentes de tipo Ellis, lo que les permitió poner un límite superior a cuántos de esos túneles podrían existir.",
      "Otra estrategia es estudiar las sombras de los objetos compactos. En 2019, el Telescopio del Horizonte de Sucesos presentó la primera imagen de la sombra del agujero negro de la galaxia M87, y en 2022 la de Sagitario A*, en el centro de nuestra galaxia. Los teóricos han calculado que la sombra de ciertos agujeros de gusano tendría un tamaño o una forma algo diferentes. Hasta ahora, las imágenes son compatibles con agujeros negros normales, pero distinguir diferencias sutiles exigirá mucha más resolución."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1936, el propio Einstein publicó un breve artículo en la revista Science sobre las lentes gravitacionales producidas por estrellas, animado por un ingeniero checo aficionado llamado Rudi Mandl. Einstein concluyó que no había mucha esperanza de observar el fenómeno porque las estrellas están demasiado lejos unas de otras. Se equivocó en eso: hoy se detectan miles de eventos de microlente gracias a cámaras digitales que vigilan millones de estrellas cada noche." },
      { label: "Dato Científico", icon: "atom", text: "El Telescopio del Horizonte de Sucesos no es un único aparato, sino una red de radiotelescopios repartidos por varios continentes que se sincronizan con relojes atómicos. Al combinar sus datos, funcionan como un telescopio virtual del tamaño de la Tierra. Su resolución es tan alta que, según sus científicos, equivaldría a leer un periódico en Nueva York desde un café en París. Esa precisión es necesaria para estudiar la forma de una sombra cósmica." }
    ],
    fact: "Dato Clave: hasta hoy no se ha detectado ninguna lente gravitacional atribuible a un agujero de gusano. Sin embargo, búsquedas como la de Takahashi y Asada en 2013 son ciencia real: al no encontrar la firma esperada en miles de cuásares, establecieron un límite máximo a la abundancia de agujeros de gusano de tipo Ellis en el universo. Cada búsqueda negativa restringe las teorías y nos dice dónde no debemos seguir buscando.",
  },
  {
    id: "ecos-ondas-gravitacionales",
    bannerImage: '/assets/wormhole/infographic_m12/banner_ecos-ondas-gravitacionales.webp',
    bannerCaption: "En 2016, Cardoso, Franzin y Pani propusieron que ecos tras una fusión podrían delatar un objeto sin horizonte, como un agujero de gusano.",
    title: "Ecos en las Ondas Gravitacionales",
    color: '#8C5E6B',
    btnImage: '/assets/wormhole/infographic_m12/btn_ecos-ondas-gravitacionales.webp',
    image: '/assets/wormhole/infographic_m12/hero_ecos-ondas-gravitacionales.webp',
    content: [
      "El 14 de septiembre de 2015, los dos detectores del observatorio LIGO, en Hanford y Livingston, Estados Unidos, registraron por primera vez ondas gravitacionales. La señal, llamada GW150914, procedía de la fusión de dos agujeros negros de unas 36 y 29 masas solares situados a unos 1.300 millones de años luz. Fue la confirmación directa de una predicción que Einstein había hecho un siglo antes. En 2017, Rainer Weiss, Barry Barish y Kip Thorne recibieron el Premio Nobel de Física por este logro.",
      "La señal de una fusión tiene tres fases. Primero, los dos objetos giran uno alrededor del otro cada vez más rápido. Después se unen en un instante violentísimo. Por último, el objeto resultante vibra y se calma, igual que una campana tras ser golpeada. Esta última fase se llama amortiguamiento, y sus tonos dependen solo de la masa y el giro del objeto final. Si ese objeto es un agujero negro como los que describe la relatividad general, la vibración se apaga de forma limpia y sin repeticiones.",
      "En 2016, Vitor Cardoso, Edgardo Franzin y Paolo Pani plantearon una pregunta provocadora: ¿y si el objeto final no tuviera horizonte de sucesos? Si fuera, por ejemplo, un agujero de gusano o algún objeto ultracompacto exótico, parte de las ondas no desaparecería tras el horizonte. Rebotaría entre la región donde la luz puede orbitar y la superficie o la garganta del objeto, escapando poco a poco. El resultado sería una serie de ecos cada vez más débiles que llegarían después de la señal principal.",
      "En 2017, Jahed Abedi, Hannah Dykaar y Niayesh Afshordi anunciaron indicios tentativos de ecos en los primeros datos de LIGO, aunque con una significancia estadística baja. Otros equipos repitieron el análisis con métodos distintos y concluyeron que esos indicios eran compatibles con el ruido de los detectores. Las colaboraciones LIGO, Virgo y KAGRA han incluido búsquedas de ecos en sus pruebas de la relatividad general con decenas de fusiones, y hasta ahora no han encontrado evidencia significativa de ellos.",
      "La búsqueda continúa con una red cada vez mayor de detectores: los dos de LIGO en Estados Unidos, Virgo en Italia y KAGRA en Japón. En el futuro, la misión espacial LISA, aprobada por la Agencia Espacial Europea en 2024 y prevista para la década de 2030, usará tres naves separadas por millones de kilómetros para captar fusiones de agujeros negros gigantes. Con señales más intensas y limpias, cualquier eco escondido tendría muchas más posibilidades de salir a la luz."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Cada detector LIGO tiene dos brazos en forma de L de 4 kilómetros de largo, por los que viaja un láser que rebota entre espejos. Cuando pasa una onda gravitacional, un brazo se estira y el otro se encoge una cantidad increíblemente pequeña: menos de una diezmilésima parte del diámetro de un protón. Para lograr esa sensibilidad, los espejos cuelgan de sistemas de suspensión que los aíslan de vibraciones del suelo, del tráfico e incluso de las olas del océano lejano." },
      { label: "Dato Científico", icon: "atom", text: "El retraso entre la señal principal y los ecos depende de lo cerca que esté la superficie del objeto del lugar donde estaría el horizonte, pero solo de forma logarítmica. Esto tiene una consecuencia sorprendente: incluso si la diferencia fuera tan pequeña como la longitud de Planck, los ecos de una fusión de agujeros de masa estelar llegarían con un retraso de fracciones de segundo. Eso los pondría dentro del alcance de los detectores actuales, si existieran." }
    ],
    fact: "Dato Clave: los ecos gravitacionales son una de las pocas formas propuestas para distinguir, con datos reales, un agujero negro de un objeto sin horizonte como un agujero de gusano. Desde 2016 se han analizado decenas de fusiones detectadas por LIGO, Virgo y KAGRA sin hallar ecos confirmados. Esto no descarta por completo los agujeros de gusano, pero sí indica que los objetos observados se comportan como los agujeros negros que predice la relatividad general.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '159,179,200' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(159,179,200,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM12)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A8C", "#7A6C8F", "#6B7F5E", "#5E7F8C", "#8C7A5B", "#4F6D7A", "#8C5E6B"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9FB3C8" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9FB3C8" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradWormholeM12" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CAZANDO TÚNELES EN EL LABORATORIO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(159,179,200,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">AGUJEROS DE GUSANO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(159,179,200,0.2)'}`,
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
          layoutId="activeDotWormholeM12"
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

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
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
              </div>
            )}
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
      border: '1px solid rgba(159,179,200,0.15)',
    }}>
      <Star size={14} style={{ color: '#9FB3C8', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9FB3C8, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(159,179,200,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9FB3C8', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_WormholeM12() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(159,179,200,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(159,179,200,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(159,179,200,0.08)', borderRadius: '16px',
              border: '1px solid rgba(159,179,200,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9FB3C8', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Del LHC a los chips cuánticos y los ecos gravitacionales: la búsqueda real
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
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
