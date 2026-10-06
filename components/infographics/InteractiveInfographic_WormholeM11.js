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
  "Wheeler, J. A. (1955). «Geons». Physical Review 97, 511–536.",
  "Bekenstein, J. D. (1973). «Black Holes and Entropy». Physical Review D 7, 2333–2346.",
  "'t Hooft, G. (1993). «Dimensional Reduction in Quantum Gravity». arXiv:gr-qc/9310026.",
  "Susskind, L. (1995). «The World as a Hologram». Journal of Mathematical Physics 36, 6377–6396.",
  "Witten, E. (1995). «String Theory Dynamics in Various Dimensions». Nuclear Physics B 443, 85–126.",
  "Rovelli, C. & Smolin, L. (1995). «Discreteness of Area and Volume in Quantum Gravity». Nuclear Physics B 442, 593–619.",
  "Maldacena, J. (1998). «The Large N Limit of Superconformal Field Theories and Supergravity». Advances in Theoretical and Mathematical Physics 2, 231–252.",
  "Ryu, S. & Takayanagi, T. (2006). «Holographic Derivation of Entanglement Entropy from AdS/CFT». Physical Review Letters 96, 181602.",
  "Van Raamsdonk, M. (2010). «Building up spacetime with quantum entanglement». General Relativity and Gravitation 42, 2323–2329.",
  "Maldacena, J. & Susskind, L. (2013). «Cool horizons for entangled black holes». Fortschritte der Physik 61, 781–811.",
  "Abdo, A. A. et al. (Fermi LAT/GBM) (2009). «A limit on the variation of the speed of light arising from quantum gravity effects». Nature 462, 331–334."
];

const INFOGRAPHIC_NODES = [
  {
    id: "dos-teorias-incompatibles",
    bannerImage: '/assets/wormhole/infographic_m11/banner_dos-teorias-incompatibles.webp',
    bannerCaption: "La relatividad general y la mecánica cuántica han superado todas las pruebas, pero sus matemáticas chocan a la escala de Planck.",
    title: "Dos teorías geniales que no se entienden",
    color: '#6A7889',
    btnImage: '/assets/wormhole/infographic_m11/btn_dos-teorias-incompatibles.webp',
    image: '/assets/wormhole/infographic_m11/hero_dos-teorias-incompatibles.webp',
    content: [
      "La física del siglo XX nos dejó dos teorías extraordinarias. La relatividad general de Einstein, publicada en 1915, describe la gravedad como la curvatura del espacio-tiempo y explica desde la órbita de Mercurio hasta las ondas gravitacionales. La mecánica cuántica, desarrollada en los años veinte por científicos como Heisenberg, Schrödinger y Dirac, describe los átomos, la luz y las partículas subatómicas. Ambas han superado todas las pruebas experimentales durante un siglo.",
      "El problema es que hablan idiomas distintos. En la relatividad general, el espacio-tiempo es un tejido liso y continuo que se curva de forma precisa. En la mecánica cuántica, todo está sujeto a la incertidumbre y a fluctuaciones constantes, y muchas cantidades vienen en paquetes discretos. Cuando los físicos intentan aplicar las reglas cuánticas a la gravedad con los métodos habituales, los cálculos producen infinitos que no se pueden eliminar. La teoría, simplemente, se rompe.",
      "En la vida diaria, este choque no importa: para los planetas basta la relatividad y para los átomos basta la mecánica cuántica. Pero hay lugares donde necesitamos las dos a la vez: el centro de un agujero negro, el instante inicial del Big Bang y el interior de un agujero de gusano. Allí la gravedad es enorme y las distancias son minúsculas. La escala donde ambos efectos se vuelven igual de importantes se llama escala de Planck, y es increíblemente pequeña.",
      "La longitud de Planck mide unos 1.6 × 10 elevado a menos 35 metros. Para hacernos una idea: si un átomo se ampliara hasta el tamaño del universo observable, la longitud de Planck apenas alcanzaría la altura de un árbol muy alto. La energía necesaria para explorar esa escala directamente es casi mil billones de veces mayor que la del Gran Colisionador de Hadrones. Por eso los físicos trabajan sobre todo con matemáticas, coherencia lógica y pistas indirectas del universo.",
      "Encontrar una teoría de gravedad cuántica es considerado por muchos el gran desafío de la física del siglo XXI. No se trata solo de curiosidad: esa teoría nos diría qué ocurre realmente en las singularidades, si los agujeros de gusano pueden existir y qué es, en el fondo, el espacio-tiempo. Hay varios candidatos, cada uno con fortalezas y problemas. En este módulo conocerás los principales y una idea asombrosa que los conecta con los agujeros de gusano: el entrelazamiento cuántico."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El físico alemán Max Planck propuso en 1899 sus «unidades naturales», combinando la velocidad de la luz, la constante de gravitación y su nueva constante cuántica. Las eligió porque no dependen de ninguna convención humana, como el metro o el kilogramo: cualquier civilización del universo podría llegar a ellas. Hoy marcan la frontera de la física que conocemos." },
      { label: "Dato Científico", icon: "atom", text: "La longitud de Planck se obtiene como la raíz cuadrada del producto entre la constante de Planck reducida y la constante de gravitación, dividido entre el cubo de la velocidad de la luz. Su valor es de unos 1.616 × 10 elevado a menos 35 metros. La energía de Planck, por su parte, ronda 1.22 × 10 elevado a 19 gigaelectronvoltios." }
    ],
    fact: "Los infinitos también aparecieron en la teoría cuántica de la luz y los electrones, pero Richard Feynman, Julian Schwinger y Shin'ichirō Tomonaga encontraron cómo controlarlos mediante una técnica llamada renormalización, y recibieron el Premio Nobel de Física en 1965. Con la gravedad, esa misma técnica falla, lo que indica que hace falta una idea realmente nueva.",
  },
  {
    id: "espuma-cuantica",
    bannerImage: '/assets/wormhole/infographic_m11/banner_espuma-cuantica.webp',
    bannerCaption: "John Wheeler imaginó en 1955 que, a la escala de Planck, el espacio-tiempo hierve como espuma, con diminutos túneles efímeros.",
    title: "La espuma cuántica de Wheeler",
    color: '#7C7062',
    btnImage: '/assets/wormhole/infographic_m11/btn_espuma-cuantica.webp',
    image: '/assets/wormhole/infographic_m11/hero_espuma-cuantica.webp',
    content: [
      "Si miraras el océano desde un avión, verías una superficie lisa. Pero si bajaras en una lancha, descubrirías olas, espuma y burbujas. El físico estadounidense John Wheeler propuso en 1955 que el espacio-tiempo podría ser parecido. A gran escala parece liso y tranquilo, como lo describe la relatividad general. Pero a la escala de Planck, las fluctuaciones cuánticas lo harían «hervir», con su forma cambiando sin cesar. Wheeler llamó a esta idea «espuma cuántica».",
      "En esa espuma, según Wheeler, la geometría del espacio podría formar estructuras complicadas durante instantes brevísimos, incluidos diminutos agujeros de gusano que conectan puntos cercanos y desaparecen enseguida. Serían unas 10 elevado a 20 veces más pequeños que un protón y durarían alrededor de un tiempo de Planck, unos 10 elevado a menos 44 segundos. La espuma cuántica es una hipótesis: nadie la ha observado, y distintas teorías la describen de formas diferentes.",
      "Algunos investigadores han soñado con atrapar uno de esos microtúneles y agrandarlo hasta un tamaño útil. Pero no existe ningún método conocido para hacerlo: haría falta controlar la gravedad a escalas y energías inalcanzables, y además mantener el túnel abierto con energía negativa. Por eso esta idea pertenece, por ahora, a la especulación. Lo valioso de la espuma de Wheeler es que nos recuerda que el espacio-tiempo, a escalas diminutas, podría ser muy distinto de lo que percibimos.",
      "¿Se puede buscar la espuma cuántica? Algunos científicos pensaron que, si el espacio-tiempo es «granuloso», la luz de distintas energías que viaja miles de millones de años podría llegar con retrasos minúsculos. En 2009, el telescopio espacial Fermi observó un estallido de rayos gamma, GRB 090510, cuyos fotones de alta y baja energía llegaron prácticamente juntos. Esa observación descartó algunos modelos sencillos en los que la velocidad de la luz cambia con la energía a la escala de Planck.",
      "También conviene aclarar dos ideas que a veces se confunden. Primero, la materia oscura no sirve como materia exótica para sostener agujeros de gusano: las observaciones indican que tiene energía positiva y atrae gravitacionalmente, igual que la materia normal. Segundo, las partículas entrelazadas no se envían mensajes instantáneos. Están correlacionadas, pero un teorema de la mecánica cuántica impide usar el entrelazamiento para comunicarse más rápido que la luz. Ambas aclaraciones son claves para entender ER=EPR."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "John Wheeler no solo popularizó el término «agujero negro», sino también «agujero de gusano» y «espuma cuántica». Era un maestro inventando nombres memorables. Además fue un gran profesor: entre sus estudiantes de doctorado estuvieron Richard Feynman, Kip Thorne y Hugh Everett, creador de la interpretación de los muchos mundos de la mecánica cuántica." },
      { label: "Dato Científico", icon: "atom", text: "En el estallido GRB 090510, el telescopio Fermi registró un fotón de unos 31 gigaelectronvoltios que llegó menos de un segundo después del inicio del destello, tras viajar unos 7,000 millones de años. Ese retraso tan pequeño implica que, si la velocidad de la luz variara linealmente con la energía, el efecto solo podría aparecer por encima de aproximadamente la energía de Planck." }
    ],
    fact: "Los estallidos de rayos gamma son las explosiones más brillantes del universo conocido. Muchos de los cortos, como GRB 090510, se asocian a la fusión de dos estrellas de neutrones. En 2017 se confirmó esta conexión cuando LIGO y Virgo detectaron las ondas gravitacionales del evento GW170817 y, unos 1.7 segundos después, el telescopio Fermi registró un breve destello de rayos gamma.",
  },
  {
    id: "cuerdas-que-vibran",
    bannerImage: '/assets/wormhole/infographic_m11/banner_cuerdas-que-vibran.webp',
    bannerCaption: "En la teoría de cuerdas, cada partícula sería un modo de vibración distinto de una cuerda diminuta, como las notas de una guitarra.",
    title: "Cuerdas que vibran en diez dimensiones",
    color: '#5C7A7F',
    btnImage: '/assets/wormhole/infographic_m11/btn_cuerdas-que-vibran.webp',
    image: '/assets/wormhole/infographic_m11/hero_cuerdas-que-vibran.webp',
    content: [
      "La teoría de cuerdas propone que las partículas elementales, como electrones y quarks, no son puntos sin tamaño. Serían pequeñísimas cuerdas de energía, abiertas o cerradas como lazos, que vibran de distintas maneras. Igual que una cuerda de guitarra produce notas diferentes según cómo vibra, cada patrón de vibración de una cuerda fundamental correspondería a una partícula distinta, con su propia masa y carga. Toda la variedad de la materia sería una gran sinfonía de cuerdas.",
      "Lo más emocionante de la teoría es que la gravedad aparece sola. Entre las vibraciones posibles de una cuerda cerrada hay una que tiene exactamente las propiedades del gravitón, la partícula hipotética que transmitiría la gravedad. Los físicos no tuvieron que añadirla a mano: las matemáticas la exigen. Además, como las cuerdas tienen tamaño, se suavizan los infinitos que arruinaban los intentos anteriores de combinar la gravedad con la mecánica cuántica.",
      "Pero hay un precio sorprendente: para que las ecuaciones sean coherentes, el espacio-tiempo debe tener diez dimensiones en las teorías de supercuerdas. Nosotros solo percibimos cuatro: tres de espacio y una de tiempo. Las seis restantes estarían enrolladas en formas diminutas, demasiado pequeñas para detectarlas, igual que una manguera vista desde muy lejos parece una línea, aunque de cerca tenga un grosor circular por el que podría caminar una hormiga.",
      "A comienzos de los años noventa existían cinco versiones distintas de la teoría de supercuerdas, lo cual resultaba incómodo. En 1995, el físico Edward Witten propuso que las cinco eran aspectos de una teoría más profunda en once dimensiones, que recibió el nombre de teoría M. Ese mismo año, Joseph Polchinski mostró la importancia de las D-branas, superficies de varias dimensiones donde pueden terminar las cuerdas abiertas. Esta etapa se conoce como la «segunda revolución de las supercuerdas».",
      "En la teoría de cuerdas, ciertos cambios en la forma y las conexiones del espacio aparecen de manera natural en las soluciones, y las branas permiten construir modelos de agujeros negros cuyo comportamiento se puede calcular con detalle. Sin embargo, la teoría tiene un gran problema: hasta hoy no ha hecho una predicción comprobada experimentalmente que la distinga de otras ideas. Por eso sigue siendo una candidata prometedora, no una teoría confirmada."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La teoría de cuerdas nació casi por accidente. En 1968, el físico italiano Gabriele Veneziano encontró una fórmula que describía cómo chocan ciertas partículas nucleares. Poco después, varios físicos, entre ellos Yoichiro Nambu, Holger Nielsen y Leonard Susskind, se dieron cuenta de que esa fórmula describía cuerdas vibrantes. Al principio no tenía nada que ver con la gravedad." },
      { label: "Dato Científico", icon: "atom", text: "En 1996, Andrew Strominger y Cumrun Vafa usaron D-branas de la teoría de cuerdas para contar los estados microscópicos de cierto tipo especial de agujero negro. Obtuvieron exactamente la entropía predicha por la fórmula de Bekenstein y Hawking, que dice que la entropía es proporcional al área del horizonte. Fue uno de los mayores éxitos teóricos de la teoría de cuerdas." }
    ],
    fact: "Edward Witten es el único físico que ha recibido la Medalla Fields, el premio más prestigioso de las matemáticas, que obtuvo en 1990. Su trabajo muestra cómo la búsqueda de una teoría cuántica de la gravedad ha impulsado también descubrimientos matemáticos profundos, en áreas como la topología y la geometría de espacios de muchas dimensiones.",
  },
  {
    id: "atomos-de-espacio",
    bannerImage: '/assets/wormhole/infographic_m11/banner_atomos-de-espacio.webp',
    bannerCaption: "La gravedad cuántica de bucles propone que el espacio está hecho de unidades mínimas de área y volumen, cerca de la escala de Planck.",
    title: "Átomos de espacio: la gravedad cuántica de bucles",
    color: '#7E6F80',
    btnImage: '/assets/wormhole/infographic_m11/btn_atomos-de-espacio.webp',
    image: '/assets/wormhole/infographic_m11/hero_atomos-de-espacio.webp',
    content: [
      "La gravedad cuántica de bucles toma un camino muy diferente al de las cuerdas. No busca partículas nuevas ni dimensiones extra. En cambio, intenta aplicar las reglas de la mecánica cuántica directamente al espacio-tiempo de la relatividad general. Su idea central es audaz: así como la materia está hecha de átomos, el espacio mismo estaría formado por «granos» diminutos. No podrías dividir una superficie en pedazos infinitamente pequeños, porque existiría un área mínima.",
      "La teoría comenzó en la década de 1980, cuando el físico indio Abhay Ashtekar encontró una nueva forma de escribir las ecuaciones de Einstein que las hacía más parecidas a las de otras fuerzas de la naturaleza. Poco después, Carlo Rovelli y Lee Smolin desarrollaron el enfoque de los «bucles». En 1995 publicaron un resultado clave: en esta teoría, el área y el volumen solo pueden tomar ciertos valores permitidos, como los escalones de una escalera, no como una rampa continua.",
      "Para describir el espacio, la teoría usa unas estructuras llamadas redes de espín. Imagina una red de puntos unidos por líneas: cada punto representa un pequeño volumen de espacio y cada línea representa el área de la superficie que separa dos volúmenes vecinos. El espacio que percibimos, aparentemente liso, sería el resultado de una cantidad gigantesca de estos nodos, del mismo modo en que una tela suave está hecha de innumerables hilos entrelazados.",
      "Una consecuencia interesante aparece al aplicar la teoría al universo primitivo. En la llamada cosmología cuántica de bucles, desarrollada por Ashtekar, Martin Bojowald y otros, el Big Bang podría ser reemplazado por un «gran rebote»: un universo anterior que se contrajo hasta una densidad máxima y luego volvió a expandirse. Ideas similares sugieren que la singularidad de un agujero negro podría evitarse. Son resultados de modelos simplificados, todavía en estudio.",
      "La gravedad cuántica de bucles también enfrenta grandes retos. Ha sido difícil demostrar que, a gran escala, sus granos de espacio reproducen con precisión el espacio-tiempo liso de Einstein, y tampoco tiene predicciones confirmadas. En este marco, la forma y las conexiones del espacio también podrían cambiar, por lo que se estudian estructuras como los agujeros de gusano. Que existan dos grandes candidatas, cuerdas y bucles, muestra que el problema sigue completamente abierto."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Según la gravedad cuántica de bucles, en la superficie de una moneda cabrían alrededor de 10 elevado a 66 «granos» de área. Es un número tan grande que, aunque el espacio estuviera hecho de piezas, nunca podríamos notar sus bordes en la vida diaria, igual que no distinguimos los píxeles de una pantalla de altísima resolución vista desde lejos." },
      { label: "Dato Científico", icon: "atom", text: "En la gravedad cuántica de bucles, el área más pequeña distinta de cero es del orden de la longitud de Planck al cuadrado, multiplicada por un número llamado parámetro de Barbero-Immirzi. Ese parámetro suele ajustarse para que la teoría reproduzca la entropía de los agujeros negros calculada por Bekenstein y Hawking, conectando esta teoría con la termodinámica del horizonte." }
    ],
    fact: "Carlo Rovelli, uno de los fundadores de la gravedad cuántica de bucles, es también un divulgador muy leído. Su libro «Siete breves lecciones de física», publicado en 2014, se tradujo a decenas de idiomas y vendió más de un millón de ejemplares, acercando al público general ideas como los granos de espacio y la naturaleza del tiempo.",
  },
  {
    id: "universo-holografico",
    bannerImage: '/assets/wormhole/infographic_m11/banner_universo-holografico.webp',
    bannerCaption: "La información máxima que cabe en una región del espacio no depende de su volumen, sino del área de la superficie que la rodea.",
    title: "El principio holográfico",
    color: '#5F7A63',
    btnImage: '/assets/wormhole/infographic_m11/btn_universo-holografico.webp',
    image: '/assets/wormhole/infographic_m11/hero_universo-holografico.webp',
    content: [
      "Un holograma es una imagen plana que, al iluminarla, muestra un objeto en tres dimensiones. Algunas tarjetas bancarias lo llevan como sello de seguridad. Toda la información del objeto tridimensional está guardada en una superficie de dos dimensiones. En los años noventa, dos físicos propusieron que el universo podría funcionar de forma parecida: toda la información contenida en un volumen del espacio podría estar codificada en la superficie que lo rodea. Es el principio holográfico.",
      "La pista vino de los agujeros negros. En 1972, el físico Jacob Bekenstein, entonces estudiante de doctorado de John Wheeler, propuso que los agujeros negros tienen entropía, una medida de la cantidad de información escondida. Lo sorprendente es que esa entropía es proporcional al área del horizonte, no al volumen. Hawking confirmó la idea con su radiación en 1974 y fijó el valor exacto: la entropía es un cuarto del área del horizonte medida en unidades de Planck.",
      "Esto tiene una consecuencia extraña. Si llenas una región del espacio con cada vez más información, en algún momento la concentración será tan grande que formará un agujero negro. Y ese agujero negro tiene una entropía fijada por su área. Por lo tanto, la información máxima que puede contener cualquier región no depende de su volumen, sino del área de su frontera. En sistemas comunes, como una biblioteca, la información crece con el volumen. Con la gravedad, no.",
      "En 1993, el físico neerlandés Gerard 't Hooft, ganador del Premio Nobel de Física en 1999, propuso que esto revela algo fundamental: una descripción completa de la física en un volumen podría escribirse con una dimensión menos, en su superficie. En 1995, Leonard Susskind desarrolló la idea en un artículo titulado «El mundo como un holograma». Según esta visión, nuestro mundo tridimensional podría ser equivalente a una descripción en una frontera de dos dimensiones.",
      "Esto no significa que el universo sea una ilusión o una película proyectada. Significa que podrían existir dos descripciones matemáticas distintas, pero igual de válidas, de la misma realidad: una con gravedad en el volumen y otra sin gravedad en la frontera. Es parecido a cómo un mismo libro puede leerse en español o en inglés: el contenido es igual aunque las palabras cambien. El principio holográfico es hoy una de las ideas más influyentes de la física teórica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La entropía de un agujero negro es gigantesca. Uno con la masa del Sol tendría una entropía unas 10 elevado a 19 veces mayor que la del propio Sol. De hecho, los cálculos indican que el agujero negro supermasivo del centro de nuestra galaxia acumula más entropía que todas las estrellas, el gas y el polvo de la Vía Láctea juntos." },
      { label: "Dato Científico", icon: "atom", text: "La fórmula de Bekenstein-Hawking dice que la entropía de un agujero negro es igual al área del horizonte dividida entre cuatro veces el área de Planck, multiplicada por la constante de Boltzmann. Como el área crece con el cuadrado de la masa, duplicar la masa de un agujero negro cuadruplica su entropía y, por tanto, la información que puede ocultar." }
    ],
    fact: "Jacob Bekenstein enfrentó al principio la oposición de Stephen Hawking, quien pensaba que un objeto con entropía debería tener temperatura y emitir radiación, algo imposible para un agujero negro según la física de entonces. Paradójicamente, fue el propio Hawking quien, al estudiar el problema, descubrió en 1974 que los agujeros negros sí radian, dándole la razón a Bekenstein.",
  },
  {
    id: "correspondencia-ads-cft",
    bannerImage: '/assets/wormhole/infographic_m11/banner_correspondencia-ads-cft.webp',
    bannerCaption: "En 1997, Juan Maldacena propuso que una teoría con gravedad en cierto espacio curvo equivale a una teoría cuántica sin gravedad en su borde.",
    title: "AdS/CFT: el diccionario de Maldacena",
    color: '#86705F',
    btnImage: '/assets/wormhole/infographic_m11/btn_correspondencia-ads-cft.webp',
    image: '/assets/wormhole/infographic_m11/hero_correspondencia-ads-cft.webp',
    content: [
      "En noviembre de 1997, el físico argentino Juan Maldacena publicó una propuesta que transformó la física teórica. Se conoce como correspondencia AdS/CFT, y es el ejemplo más concreto del principio holográfico. Dice que una teoría de cuerdas con gravedad, en un tipo especial de espacio-tiempo curvado llamado anti-de Sitter, es exactamente equivalente a una teoría cuántica de partículas, sin gravedad, que vive en la frontera de ese espacio. Dos mundos distintos, una misma física.",
      "El espacio anti-de Sitter, o AdS, tiene una curvatura que actúa como una especie de caja: la luz puede llegar a su borde y regresar en un tiempo finito. Una buena imagen para imaginarlo son los grabados «Límite circular» del artista M. C. Escher, donde figuras de peces o ángeles se hacen más pequeñas al acercarse al borde de un disco, sin llegar nunca a él. En el borde de ese disco viviría la teoría cuántica sin gravedad, la CFT o teoría conformal de campos.",
      "La correspondencia funciona como un diccionario de traducción. Cada objeto del interior tiene su equivalente en el borde. Un agujero negro en el espacio AdS corresponde, por ejemplo, a un gas caliente de partículas en la frontera, y la temperatura de Hawking del agujero negro es la temperatura de ese gas. Así, problemas muy difíciles de un lado pueden resolverse traduciéndolos al otro, donde son más sencillos. Es como resolver un acertijo cambiándolo a otro idioma.",
      "Este diccionario ha tenido aplicaciones sorprendentes. Los físicos lo usaron para estudiar el plasma de quarks y gluones, un estado de la materia creado en el colisionador RHIC de Estados Unidos y en el LHC del CERN. Los cálculos holográficos sugerían una viscosidad extremadamente baja, y los experimentos encontraron que ese plasma se comporta como uno de los líquidos más perfectos conocidos. También se usa para estudiar materiales con electrones fuertemente correlacionados.",
      "Hay que aclarar un detalle importante: nuestro universo no es un espacio anti-de Sitter. Las observaciones muestran que el cosmos se expande aceleradamente, algo que se parece más a un espacio de De Sitter. Por eso AdS/CFT es, por ahora, un laboratorio teórico, no una descripción directa de nuestro mundo. Aun así, como permite estudiar con precisión la gravedad cuántica en un caso concreto, se ha convertido en la herramienta favorita para investigar agujeros negros y agujeros de gusano."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El artículo de Maldacena de 1997 es uno de los más citados en la historia de la física de altas energías, con más de 20,000 citas. Para comparar, la mayoría de los artículos científicos reciben solo unas decenas. Maldacena tenía apenas 29 años cuando lo publicó, y poco después se convirtió en profesor de la Universidad de Harvard." },
      { label: "Dato Científico", icon: "atom", text: "En la versión original de la correspondencia, la teoría gravitacional es una teoría de cuerdas de tipo IIB en un espacio que combina AdS de cinco dimensiones con una esfera de cinco dimensiones. Su equivalente en la frontera es la teoría de Yang-Mills con supersimetría máxima, conocida como N=4, que vive en un espacio-tiempo de cuatro dimensiones." }
    ],
    fact: "Juan Maldacena nació en Buenos Aires en 1968 y estudió en el Instituto Balseiro, en Argentina, antes de doctorarse en la Universidad de Princeton. Hoy trabaja en el Instituto de Estudios Avanzados de Princeton, donde también trabajó Einstein. Entre otros reconocimientos, recibió en 2012 el Breakthrough Prize en Física Fundamental por sus contribuciones a la gravedad cuántica.",
  },
  {
    id: "er-igual-epr",
    bannerImage: '/assets/wormhole/infographic_m11/banner_er-igual-epr.webp',
    bannerCaption: "En 2013, Maldacena y Susskind propusieron que dos agujeros negros entrelazados estarían unidos por un agujero de gusano no transitable.",
    title: "ER=EPR: ¿el espacio está tejido con entrelazamiento?",
    color: '#6D6A8C',
    btnImage: '/assets/wormhole/infographic_m11/btn_er-igual-epr.webp',
    image: '/assets/wormhole/infographic_m11/hero_er-igual-epr.webp',
    content: [
      "En 1935, Albert Einstein publicó dos artículos famosos con pocas semanas de diferencia. Uno, con Boris Podolsky y Nathan Rosen, señalaba un efecto cuántico extraño que hoy llamamos entrelazamiento: dos partículas pueden quedar tan conectadas que medir una revela información sobre la otra, aunque estén muy lejos. Ese trabajo se conoce como EPR. El otro, con Rosen, describía el puente geométrico de los agujeros de gusano: ER. Durante décadas, nadie relacionó ambas ideas.",
      "En 2013, Juan Maldacena y Leonard Susskind propusieron que ER y EPR son dos caras de lo mismo, una conjetura que resumieron como ER=EPR. Según ella, si dos agujeros negros están entrelazados cuánticamente, entonces sus interiores están conectados por un agujero de gusano. Pero ese túnel es no transitable: no se puede usar para enviar mensajes ni para viajar más rápido que la luz. Esto encaja perfectamente con el entrelazamiento, que tampoco permite comunicarse de forma instantánea.",
      "La idea tiene raíces en la correspondencia AdS/CFT. En 2003, Maldacena mostró que el puente de Einstein-Rosen entre dos agujeros negros en AdS equivale, en la frontera, a dos copias de una teoría cuántica en un estado muy entrelazado. En 2010, el físico Mark Van Raamsdonk propuso un experimento mental: si se reduce el entrelazamiento entre las dos copias, el espacio entre ellas se estira y adelgaza; si se elimina por completo, el espacio se separa en dos pedazos.",
      "De ahí surge una idea revolucionaria: quizá el espacio-tiempo no es el escenario fundamental de la física, sino algo que emerge de relaciones cuánticas más profundas, como el entrelazamiento. Una pista matemática viene de la fórmula de Shinsei Ryu y Tadashi Takayanagi, de 2006, que relaciona la cantidad de entrelazamiento en la frontera con el área de ciertas superficies en el interior. Sería parecido a cómo la temperatura de un gas emerge del movimiento de muchísimas moléculas.",
      "Si ER=EPR es correcta, el espacio y el tiempo dejarían de ser los ingredientes básicos del universo y pasarían a ser consecuencias de cómo se conecta la información cuántica. Sería un cambio tan profundo como el que trajo Einstein. Sin embargo, conviene ser prudentes: es una conjetura apoyada por cálculos en modelos teóricos, sin confirmación experimental en nuestro universo. Los experimentos con computadoras cuánticas, que verás en el próximo módulo, solo simulan versiones simplificadas de estas ideas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Einstein llamaba al entrelazamiento «acción fantasmal a distancia», porque le parecía absurdo. Sin embargo, los experimentos le quitaron la razón: el Premio Nobel de Física 2022 fue para Alain Aspect, John Clauser y Anton Zeilinger por sus experimentos con fotones entrelazados, que confirmaron las predicciones de la mecánica cuántica frente a las objeciones de Einstein." },
      { label: "Dato Científico", icon: "atom", text: "El teorema de no comunicación de la mecánica cuántica demuestra que, sin importar qué mida una persona en su partícula entrelazada, las estadísticas de los resultados de la otra persona no cambian. Las correlaciones solo aparecen al comparar ambos registros, y para eso hay que enviar información por un canal normal, que nunca supera la velocidad de la luz." }
    ],
    fact: "El artículo de Maldacena y Susskind se tituló en inglés «Cool horizons for entangled black holes» y se publicó en 2013 en la revista Fortschritte der Physik. Una de sus motivaciones era resolver la «paradoja del cortafuegos», planteada en 2012 por Almheiri, Marolf, Polchinski y Sully, que sugería que el horizonte de un agujero negro viejo podría ser una pared de energía.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM11)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6A7889", "#7C7062", "#5C7A7F", "#7E6F80", "#5F7A63", "#86705F", "#6D6A8C"];
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
          <linearGradient id="gradWormholeM11" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EN BUSCA DE LA GRAVEDAD CUÁNTICA</text>
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
          layoutId="activeDotWormholeM11"
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
export default function InteractiveInfographic_WormholeM11() {
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
              🏆 Viajero Cuántico · Módulo 11 · Cuerdas, hologramas y el puente ER=EPR
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
