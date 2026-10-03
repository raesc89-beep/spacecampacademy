'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#D4A843', style = {} }) {
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
  "Isaacson, W. (2017). Leonardo da Vinci: La biografía. Simon & Schuster.",
  "Capra, F. (2007). The Science of Leonardo: Inside the Mind of the Great Genius of the Renaissance. Doubleday.",
  "Kemp, M. (2006). Leonardo da Vinci: Experience, Experiment and Design. Princeton University Press.",
  "Nicholl, C. (2005). Leonardo da Vinci: Flights of the Mind. Penguin Books."
];

const INFOGRAPHIC_NODES = [
  {
    id: "ornithopter-diseno",
    bannerImage: '/assets/davinci/infographic_m1/banner_ornithopter-diseno.webp',
    title: "Diseño del Ornitóptero",
    color: '#D4A843',
    btnImage: '/assets/davinci/infographic_m1/btn_ornithopter-diseno.webp',
    image: '/assets/davinci/infographic_m1/hero_ornithopter-diseno.webp',
    content: [
      "El ornitóptero es quizás una de las máquinas más emblemáticas diseñadas por Leonardo da Vinci, representando su profundo deseo de conquistar los cielos mediante la imitación de la naturaleza. Este ingenio mecánico fue concebido para que un ser humano pudiera volar batiendo alas artificiales, impulsadas por su propia fuerza muscular, a semejanza del vuelo de los pájaros y los murciélagos. Leonardo dedicó incontables horas a estudiar la anatomía de las alas y a diseñar mecanismos complejos que permitieran transmitir la fuerza de los brazos y las piernas del piloto hacia las alas batientes de la máquina.",
      "A través de sus numerosos bocetos y manuscritos, como el famoso Códice sobre el vuelo de los pájaros, Da Vinci detalló minuciosamente la estructura del ornitóptero. Utilizó materiales ligeros pero resistentes que estaban disponibles en su época, tales como madera de pino, cañas, seda cruda y cuero fuerte. El diseño incorporaba un sistema de poleas, engranajes y pedales que buscaban multiplicar la fuerza humana, ya que Leonardo comprendía, aunque de forma intuitiva, que la relación entre el peso del ser humano y su capacidad de generar potencia muscular era un desafío monumental para lograr el vuelo sostenido.",
      "A pesar de la brillantez conceptual de sus dibujos, el ornitóptero de Leonardo da Vinci enfrentaba limitaciones insuperables debido a las restricciones tecnológicas y fisiológicas de su tiempo. La fisiología humana simplemente no puede producir la energía necesaria de manera continua para levantar su propio peso junto con el de una estructura mecánica mediante el batir de alas. Los pájaros poseen músculos pectorales masivos en proporción a su tamaño corporal, además de un sistema respiratorio altamente eficiente, características evolutivas de las que los seres humanos carecen por completo.",
      "Sin embargo, el valor del ornitóptero no reside en su viabilidad práctica en el siglo XV, sino en su revolucionario enfoque científico y de ingeniería. Leonardo fue pionero en aplicar principios mecánicos y observaciones anatómicas rigurosas al problema de la aviación. En lugar de recurrir a la magia o al mito, confió en la observación empírica y la racionalidad matemática. Sus estudios sobre los centros de gravedad, la resistencia del aire y la aerodinámica incipiente sentaron las bases conceptuales para las generaciones futuras de inventores y pioneros de la aeronáutica.",
      "Hoy en día, los diseños del ornitóptero de Leonardo da Vinci siguen inspirando a ingenieros, artistas y soñadores. Se han construido numerosas maquetas y réplicas a escala natural basadas en sus dibujos, demostrando la precisión de sus conceptos mecánicos, aunque requieran materiales modernos y fuentes de energía artificial para elevarse realmente. El ornitóptero simboliza el eterno anhelo humano por la libertad y la exploración, uniendo la creatividad artística sin límites con la naciente ingeniería mecánica del Renacimiento italiano."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La física del vuelo batiente requiere una comprensión profunda de la aerodinámica inestable. A diferencia de los aviones de ala fija que dependen de un flujo de aire constante sobre superficies aerodinámicas estáticas, un ornitóptero debe generar tanto sustentación como empuje simultáneamente mediante movimientos oscilatorios complejos. Esta dinámica fluida implica vórtices de borde de ataque y fuerzas no lineales que desafían los modelos aerodinámicos tradicionales, convirtiendo el sueño de Da Vinci en un desafío que la robótica moderna apenas comienza a dominar por completo en micro-vehículos aéreos." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci diseñó una versión de su máquina voladora en la que el piloto operaría la nave en posición horizontal, casi recostado o boca abajo? En sus notas, Leonardo argumentaba que esta postura permitiría al piloto utilizar la fuerza combinada de sus brazos y piernas simultáneamente, maximizando la producción de energía muscular y, al mismo tiempo, reduciendo significativamente la resistencia frontal al viento durante el vuelo. Esta disposición aerodinámica se asemeja asombrosamente a la posición adoptada por los pilotos de los primeros planeadores modernos y alas deltas." }
    ],
    fact: "En el Manuscrito B del Instituto de Francia, fechado alrededor de 1487-1489, Leonardo esbozó uno de sus ornitópteros más detallados. En estas páginas advirtió específicamente que las pruebas de vuelo deberían realizarse sobre un lago y que el piloto debía llevar un gran odre flotante como medida de seguridad para evitar ahogarse en caso de una caída inevitable, evidenciando su pragmatismo.",
  },
  {
    id: "aves-observacion",
    bannerImage: '/assets/davinci/infographic_m1/banner_aves-observacion.webp',
    title: "Observación de las Aves",
    color: '#B08D57',
    btnImage: '/assets/davinci/infographic_m1/btn_aves-observacion.webp',
    image: '/assets/davinci/infographic_m1/hero_aves-observacion.webp',
    content: [
      "La obsesión de Leonardo da Vinci por el vuelo humano tenía sus raíces en una observación meticulosa y exhaustiva del mundo natural, particularmente en el estudio del comportamiento, la anatomía y las técnicas de vuelo de las aves. Da Vinci pasaba incontables horas observando el cielo de Florencia y Milán, registrando en sus cuadernos cómo los pájaros aprovechaban las corrientes de aire, cómo ajustaban sus plumas y cómo posicionaban sus alas durante el despegue, el vuelo sostenido y el aterrizaje. Esta dedicación al estudio empírico fue el fundamento de todas sus teorías aerodinámicas.",
      "En su famoso \"Códice sobre el vuelo de los pájaros\" (Codice sul volo degli uccelli), compilado alrededor del año 1505, Leonardo documentó sus investigaciones sobre la física aviar. Observó detalladamente que los pájaros no simplemente baten sus alas de arriba hacia abajo de manera uniforme, sino que realizan un movimiento complejo en forma de ocho que genera propulsión y sustentación. Comprendió el papel crucial de la cola como timón y estabilizador, y cómo las aves rapaces utilizaban las corrientes térmicas ascendentes para planear en espiral sin realizar ningún esfuerzo muscular aparente.",
      "Leonardo diseccionó aves e insectos para comprender la estructura muscular y ósea subyacente que hacía posible el milagro del vuelo. Estudió la ligereza de sus huesos huecos y la extraordinaria fuerza de sus músculos pectorales. Al comparar la anatomía de un pájaro con la del ser humano, Leonardo pudo calcular las proporciones necesarias para un ala artificial y concluyó que el hombre necesitaría alas de dimensiones formidables para compensar su peso. Sus detallados dibujos anatómicos muestran un conocimiento biomecánico que estaba siglos por delante de su tiempo histórico.",
      "Una de las conclusiones más brillantes de Leonardo derivada de su observación de las aves fue el principio de que \"el aire ejerce tanta resistencia contra la cosa, como la cosa ejerce contra el aire\". Esta afirmación es, en esencia, una anticipación asombrosa de la Tercera Ley del Movimiento de Isaac Newton (acción y reacción), formulada casi doscientos años después. Leonardo aplicó este principio para explicar cómo las alas de los pájaros se apoyan en el aire denso bajo ellas para impulsarse hacia arriba, un concepto fundamental para el diseño de cualquier máquina voladora.",
      "El legado de los estudios aviares de Da Vinci trasciende la mera curiosidad naturalista; representa el nacimiento de la biomimética, la ciencia de emular los modelos, sistemas y elementos de la naturaleza para resolver problemas humanos complejos. Aunque sus máquinas voladoras no lograron conquistar los cielos en su época, su metodología científica, basada en observar, analizar y replicar los mecanismos biológicos del vuelo, sentó el precedente indispensable para el desarrollo de la aeronáutica moderna y sigue siendo una fuente de inspiración para los ingenieros contemporáneos."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La observación minuciosa de Leonardo le permitió identificar el fenómeno del alula o ala bastarda, un pequeño apéndice plumoso en el borde de ataque del ala de muchas aves. Observó cómo las aves despliegan esta pequeña estructura durante maniobras lentas o al aterrizar. Hoy en día sabemos que el alula actúa como un dispositivo hipersustentador (similar a los slats en los aviones modernos), retrasando la entrada en pérdida al suavizar el flujo de aire turbulento sobre la superficie superior del ala en altos ángulos de ataque, una maravilla de la ingeniería natural." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci no solo estudió a los pájaros, sino también a los murciélagos, y que estos últimos inspiraron gran parte de sus diseños alares finales? A diferencia de las alas emplumadas de las aves, que permiten el paso del aire entre las plumas en el movimiento ascendente, las alas membranosas de los murciélagos le parecieron a Leonardo mucho más eficientes para imitar artificialmente. Consideraba que una membrana continua de cuero o seda gruesa atraparía mejor el aire, lo que se refleja claramente en los famosos bocetos de su ornitóptero." }
    ],
    fact: "En su Códice sobre el vuelo, Leonardo dedicó extensas notas al estudio del centro de gravedad y el centro de presión aerodinámica en las aves. Comprendió que la estabilidad en el aire dependía de la relación entre estos dos puntos. Si un pájaro deseaba descender, movía su centro de gravedad hacia adelante; si quería ascender o frenar, lo desplazaba hacia atrás.",
  },
  {
    id: "aerodinamica-renacimiento",
    bannerImage: '/assets/davinci/infographic_m1/banner_aerodinamica-renacimiento.webp',
    title: "Aerodinámica en el Renacimiento",
    color: '#8C6B4F',
    btnImage: '/assets/davinci/infographic_m1/btn_aerodinamica-renacimiento.webp',
    image: '/assets/davinci/infographic_m1/hero_aerodinamica-renacimiento.webp',
    content: [
      "Durante el Renacimiento, una época caracterizada por el redescubrimiento del conocimiento clásico y un florecimiento sin precedentes de las artes y las ciencias, Leonardo da Vinci se erigió como un pionero solitario en el campo incipiente de la aerodinámica. En una época en la que el aire era considerado un elemento etéreo y misterioso, casi espiritual, Leonardo lo analizó como un fluido físico con propiedades medibles, tales como densidad, resistencia y presión. Sus cuadernos están repletos de estudios hidrodinámicos que aplicó directamente para comprender el comportamiento del aire en movimiento.",
      "Uno de los mayores logros de Leonardo en la aerodinámica del Renacimiento fue el diseño del primer anemómetro mecánico para medir la velocidad del viento, así como instrumentos para medir la humedad del aire (higrómetro) y la presión atmosférica. Entendió que las condiciones atmosféricas eran variables críticas que afectarían el rendimiento de cualquier máquina voladora. A través de la experimentación con corrientes de agua y modelos, observó cómo se formaban remolinos y turbulencias detrás de objetos de diferentes formas, anticipando el concepto moderno de resistencia aerodinámica o \"drag\".",
      "Leonardo llegó a concebir la idea del paracaídas mucho antes de que existiera cualquier medio práctico para elevarse a grandes alturas. En un dibujo fechado en 1485, diseñó una estructura piramidal cubierta de tela de lino sellada, acompañada de la nota: \"Si un hombre tiene una tienda de lino de cuyas aberturas se han tapado todas, y que tenga doce braccia (codos) de ancho y doce de profundidad, podrá arrojarse desde cualquier gran altura sin sufrir ningún daño\". Esta asombrosa invención demostraba su comprensión de cómo maximizar la resistencia del aire para contrarrestar la gravedad.",
      "Además de estudiar la sustentación y la resistencia, Leonardo reflexionó profundamente sobre los perfiles aerodinámicos. Observó que los cuerpos con forma de huso o de gota (como el cuerpo de un pez o de un pájaro) se movían a través de fluidos con mucha mayor eficiencia que los objetos con superficies planas. Estos principios geométricos los aplicó al diseño de proyectiles, embarcaciones y, por supuesto, a sus máquinas voladoras, intentando minimizar la fricción estructural y maximizar el flujo suave del aire sobre las superficies de sustentación, un principio básico de la aviación actual.",
      "Lamentablemente, los estudios aerodinámicos de Leonardo da Vinci permanecieron ocultos en sus cuadernos privados durante varios siglos tras su muerte. Sus manuscritos, escritos en su característica escritura especular de derecha a izquierda, fueron dispersados por Europa y no fueron publicados y analizados sistemáticamente hasta finales del siglo XIX y principios del XX. De haber sido compartidos con la comunidad intelectual de su tiempo, es posible que el desarrollo de la ciencia aerodinámica y de la ingeniería aeronáutica se hubiera adelantado varios siglos de manera espectacular."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La genialidad intuitiva de Leonardo da Vinci sobre la dinámica de fluidos lo llevó a esbozar las líneas de corriente (streamlines) del aire fluyendo alrededor de objetos sólidos, un concepto matemático que no fue formalizado rigurosamente hasta el siglo XVIII por científicos como Daniel Bernoulli y Leonhard Euler. Sus dibujos muestran claramente zonas de alta y baja presión, así como la formación de vórtices en la estela posterior, lo que demuestra una comprensión visual extraordinariamente profunda de la física que gobierna la aerodinámica contemporánea." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que en el año 2000, el paracaidista británico Adrian Nicholas puso a prueba el diseño original del paracaídas de Leonardo da Vinci? Construido rigurosamente según las especificaciones del maestro renacentista, utilizando solo herramientas y materiales disponibles en el siglo XV (madera, cuerda de cáñamo y tela de lino), Nicholas saltó desde un globo aerostático a 3.000 metros de altura. El paracaídas piramidal funcionó perfectamente, proporcionando un descenso más suave y estable que los paracaídas modernos tradicionales, validando la teoría aerodinámica de Leonardo 500 años después." }
    ],
    fact: "En el Códice Atlántico, Leonardo ilustra varios experimentos en los que dejaba caer objetos de diferentes formas y pesos desde torres para observar la fricción del aire. Se dio cuenta de que la resistencia aumentaba exponencialmente con la velocidad de caída, un principio fundamental de la mecánica de fluidos que desafiaba directamente la física aristotélica aceptada en su época.",
  },
  {
    id: "maquinas-guerra",
    bannerImage: '/assets/davinci/infographic_m1/banner_maquinas-guerra.webp',
    title: "Máquinas de Guerra Aeronáuticas",
    color: '#C9A24B',
    btnImage: '/assets/davinci/infographic_m1/btn_maquinas-guerra.webp',
    image: '/assets/davinci/infographic_m1/hero_maquinas-guerra.webp',
    content: [
      "Aunque hoy recordamos a Leonardo da Vinci principalmente por sus contribuciones al arte, la anatomía y sus sueños de vuelo humano pacífico, durante gran parte de su carrera se ganó la vida y el favor de poderosos mecenas ofreciendo sus servicios como ingeniero militar. En un período marcado por constantes conflictos entre las ciudades-estado italianas y las potencias extranjeras, los gobernantes valoraban inmensamente las innovaciones bélicas. Da Vinci diseñó una impresionante variedad de máquinas de guerra, demostrando su capacidad para aplicar la mecánica avanzada a propósitos destructivos.",
      "Uno de sus diseños bélicos más famosos es el precursor del tanque moderno. Leonardo diseñó un vehículo blindado circular, con forma de caparazón de tortuga, cubierto de placas protectoras y erizado de cañones en todas las direcciones. Este vehículo de combate debía ser propulsado desde el interior por un equipo de hombres que hacían girar manivelas conectadas a ruedas dentadas. Aunque su movilidad práctica en un campo de batalla real habría sido muy limitada debido a su enorme peso y a la tracción humana, el concepto revolucionario de un vehículo móvil blindado y fuertemente armado no tiene precedentes.",
      "Leonardo también revolucionó el diseño de la artillería con invenciones como la ametralladora de múltiples cañones. Para solucionar el problema del lento tiempo de recarga de los cañones tradicionales, ideó un sistema con varios cañones dispuestos en abanico sobre un soporte giratorio. Mientras una hilera de cañones disparaba, otra hilera podía estar enfriándose, y una tercera estaba lista para ser recargada. Esta invención buscaba aumentar drásticamente la cadencia de fuego en el campo de batalla, un objetivo táctico que se convirtió en el pilar de la guerra moderna siglos más tarde con armas como la Gatling.",
      "En el ámbito naval, Leonardo no fue menos prolífico. Trabajando para la República de Venecia, que temía un ataque naval del Imperio Otomano, diseñó equipos de buceo rudimentarios para que los saboteadores pudieran acercarse en secreto a los barcos enemigos y perforar sus cascos bajo el agua. Sus trajes de buceo incluían tubos de respiración de cuero reforzados con anillos metálicos (para evitar que la presión del agua los colapsara), gafas de vidrio, e incluso compartimentos inflables integrados que funcionaban como chalecos compensadores de flotabilidad para permitir ascender y descender.",
      "Es notable la dicotomía ética presente en la obra militar de Leonardo. Por un lado, describió repetidamente la guerra como una \"locura bestial\" (pazzia bestialissima) y un acto de barbarie. Por otro lado, dedicó su genio excepcional a inventar armamento de una letalidad teórica devastadora. Algunos historiadores argumentan que, consciente del potencial destructivo de sus inventos, introdujo intencionalmente fallos mecánicos sutiles en los planos de ciertas máquinas (como en los engranajes del tanque), asegurando que si caían en manos equivocadas, la maquinaria simplemente se atascaría al ser construida."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La enorme ballesta gigante ideada por Leonardo, diseñada para intimidar más que para disparar flechas convencionales, tenía brazos con una envergadura de casi 24 metros. El proyectil propuesto no era una saeta, sino grandes bolas de piedra o bombas incendiarias. El intrincado mecanismo de retroceso y el sistema de poleas para tensar la inmensa cuerda de la ballesta revelan una comprensión excepcional de las leyes de la palanca, la elasticidad y la acumulación de energía potencial elástica, características de la ingeniería mecánica renacentista más avanzada." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci diseñó cañones que se cargaban por la recámara en lugar de por la boca (avancarga)? En su época, la artillería se cargaba introduciendo la pólvora y el proyectil por la parte frontal del cañón, un proceso peligrosamente lento que exponía a los artilleros al fuego enemigo. El concepto de retrocarga de Leonardo, equipado con un mecanismo de bloqueo hermético, no se convirtió en la norma estándar de la artillería militar mundial hasta bien entrado el siglo XIX, debido a que la metalurgia del Renacimiento no podía forjar sellos lo suficientemente fuertes." }
    ],
    fact: "En la famosa carta de presentación que Leonardo envió a Ludovico Sforza, duque de Milán, en 1482, de sus diez puntos enumerando sus habilidades, nueve estaban dedicados exclusivamente a la ingeniería militar naval y terrestre. Solo en el último párrafo mencionó sus habilidades como arquitecto, escultor y pintor.",
  },
  {
    id: "helice-espiral",
    bannerImage: '/assets/davinci/infographic_m1/banner_helice-espiral.webp',
    title: "El Tornillo Aéreo",
    color: '#9C7E5A',
    btnImage: '/assets/davinci/infographic_m1/btn_helice-espiral.webp',
    image: '/assets/davinci/infographic_m1/hero_helice-espiral.webp',
    content: [
      "Entre las visiones más futuristas y proféticas esbozadas por Leonardo da Vinci se encuentra el tornillo aéreo (Vite Aerea), universalmente reconocido como el precursor directo del helicóptero moderno. Diseñado alrededor del año 1489, esta máquina fascinante no se basaba en el movimiento batiente de las alas de los pájaros (ornitóptero), sino en un principio aerodinámico completamente diferente y revolucionario: la rotación constante de una superficie helicoidal para generar sustentación vertical. Era un concepto puro de ala rotatoria, una idea que se adelantaba más de cuatrocientos años a la tecnología de su tiempo.",
      "El diseño del tornillo aéreo consistía en una gran hélice espiral construida con una estructura de caña, recubierta de tela de lino fuertemente almidonada para hacerla impermeable al aire, sostenida por cables y un mástil central. El funcionamiento teórico requería que un equipo de cuatro hombres, de pie sobre una plataforma circular en la base, empujara unas palancas o manivelas en sentido giratorio. Leonardo anotó en sus cuadernos que si esta máquina se construía correctamente y se giraba rápidamente, el tornillo \"haría su rosca en el aire\" y se elevaría hacia el cielo, como un tornillo penetra en la madera.",
      "La inspiración original para este diseño tan inusual probablemente provino de varias fuentes contemporáneas y clásicas. Leonardo estaba familiarizado con el tornillo de Arquímedes, una antigua invención utilizada para bombear agua hacia arriba mediante una estructura helicoidal. También es muy probable que haya observado un juguete popular asiático que había llegado a Europa, el trompo volador o libélula de bambú, un pequeño rotor de madera que se hacía girar frotando un eje entre las manos. Leonardo aplicó brillantemente estos principios hidráulicos y lúdicos al denso medio de la atmósfera terrestre.",
      "El principal obstáculo técnico del tornillo aéreo de Da Vinci, al igual que con su ornitóptero, era la falta de un motor o planta motriz adecuada. La fuerza muscular humana es completamente insuficiente para generar las revoluciones por minuto necesarias para que una estructura de ese tamaño levante su propio peso en contra de la gravedad. Además, el diseño carecía de un rotor de cola o un mecanismo para contrarrestar el par motor (torque); por lo tanto, incluso si la hélice principal lograra girar con suficiente fuerza, la plataforma base simplemente habría girado incontrolablemente en la dirección opuesta.",
      "A pesar de estas fallas operativas insuperables para la tecnología del siglo XV, el impacto conceptual del tornillo aéreo ha sido monumental en la historia de la aviación. La idea de que una superficie aerodinámica giratoria podía crear sustentación independientemente del movimiento hacia adelante del vehículo fue el concepto fundamental que eventualmente condujo al desarrollo exitoso de los autogiros y helicópteros en el siglo XX por pioneros como Juan de la Cierva e Igor Sikorsky. El esbozo del tornillo aéreo sigue siendo hoy un ícono atemporal del genio inventivo puro de Leonardo."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La eficiencia aerodinámica del diseño del tornillo aéreo ha sido analizada mediante simulaciones modernas de dinámica de fluidos computacional (CFD). Sorprendentemente, los resultados muestran que la inmensa estructura de lino sólido es aerodinámicamente muy ineficiente y generaría enormes cantidades de arrastre (drag) con muy poca sustentación útil. Las palas de rotor de los helicópteros modernos, que son largas, estrechas y con un perfil aerodinámico complejo, funcionan bajo principios muy diferentes a los del \"tornillo continuo\" imaginado por Da Vinci." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que un equipo de estudiantes de ingeniería aeronáutica de la Universidad de Maryland construyó en 2022 un cuadricóptero volador funcional (un dron llamado \"Crimson Spin\") utilizando rotores modelados exactamente según el diseño del tornillo aéreo de Leonardo da Vinci? Utilizando materiales modernos, impresión 3D y pequeños motores eléctricos de alta potencia, lograron demostrar que, aunque ineficiente, el concepto aerodinámico original de Leonardo para generar sustentación vertical realmente funciona bajo condiciones tecnológicas contemporáneas." }
    ],
    fact: "Leonardo especificó claramente en sus manuscritos las dimensiones que debía tener el tornillo aéreo para ser funcional: debía poseer un radio de cuatro braccia (aproximadamente 2,4 metros) y requería estar construido con materiales excepcionalmente robustos y ligeros.",
  },
  {
    id: "vuelo-moderno",
    bannerImage: '/assets/davinci/infographic_m1/banner_vuelo-moderno.webp',
    title: "El Vuelo Moderno",
    color: '#A88B5E',
    btnImage: '/assets/davinci/infographic_m1/btn_vuelo-moderno.webp',
    image: '/assets/davinci/infographic_m1/hero_vuelo-moderno.webp',
    content: [
      "El camino desde los visionarios pero impracticables bocetos de Leonardo da Vinci hasta la realidad tangible del vuelo moderno fue un proceso largo, arduo y repleto de fracasos monumentales y sacrificios humanos. Mientras que Da Vinci se centró principalmente en imitar el vuelo batiente de las aves y el concepto del rotor, la clave para el vuelo humano sostenido y controlado resultaría ser el ala fija. A lo largo del siglo XIX, inventores y científicos como George Cayley establecieron los principios modernos de la aerodinámica, separando el sistema de sustentación (el ala) del sistema de propulsión (el motor).",
      "Otto Lilienthal, un ingeniero alemán de finales del siglo XIX, llevó la experimentación aeronáutica a nuevas alturas mediante la construcción y prueba exhaustiva de planeadores de ala fija. A diferencia de Da Vinci, Lilienthal realizó miles de vuelos documentados, recopilando datos empíricos cruciales sobre la curvatura de las alas (perfil aerodinámico) y la distribución de presiones. Sus meticulosas tablas aerodinámicas y su insistencia en volar repetidamente para perfeccionar el control influyeron profundamente en los hermanos Wright, sirviendo como el puente crítico entre la teoría renacentista y la aviación motorizada.",
      "El hito definitivo en la historia de la aviación se logró el 17 de diciembre de 1903, cuando Orville y Wilbur Wright consiguieron el primer vuelo sostenido, controlado y con motor en las dunas de Kitty Hawk, Carolina del Norte. Su éxito no se basó simplemente en acoplar un motor a un planeador, sino en resolver el problema más complejo del vuelo: el control dinámico en los tres ejes del espacio (cabeceo, balanceo y guiñada). Los hermanos Wright desarrollaron un sistema de alabeo, un mecanismo para torcer las puntas de las alas, logrando la estabilidad que siempre eludió a los pioneros anteriores.",
      "El desarrollo de motores de combustión interna ligeros y potentes fue la tecnología habilitadora que finalmente proporcionó la fuerza motriz que Leonardo da Vinci soñó obtener de la anatomía humana. El motor fabricado a medida por Charles Taylor para el Flyer de los Wright generaba 12 caballos de fuerza pesando solo unos 80 kilos. Esta revolucionaria relación potencia-peso permitió que una máquina más pesada que el aire superara la resistencia aerodinámica de manera constante, abriendo la puerta a una rápida evolución tecnológica que pasaría de aviones de madera y tela a los reactores supersónicos en unas pocas décadas.",
      "Hoy en día, la aviación moderna abarca desde enormes aviones comerciales intercontinentales de fuselaje ancho hasta vehículos aéreos no tripulados (drones) microscópicos, pasando por aeronaves de despegue y aterrizaje vertical, cazas de combate invisibles al radar y la inminente era de la exploración espacial comercial. Cada vez que una aeronave surca los cielos, lleva consigo el eco innegable del espíritu pionero de Leonardo da Vinci. Él fue quien se atrevió a imaginar que los límites impuestos por la gravedad terrestre no eran absolutos, sino simplemente desafíos mecánicos esperando a ser resueltos por la inventiva humana."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La evolución del ala de las aeronaves es una maravilla de la ingeniería de materiales y la mecánica de fluidos. Desde las estructuras de madera de abeto recubiertas de tela de algodón de los primeros pioneros, hasta las alas modernas fabricadas con compuestos avanzados de fibra de carbono incrustados con sensores piezoeléctricos. Estos materiales compuestos no solo ofrecen una extraordinaria relación resistencia-peso, sino que permiten fabricar perfiles aerodinámicos supercríticos altamente eficientes que minimizan el arrastre de onda a velocidades cercanas a la barrera del sonido." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que el sistema de alabeo (wing warping) inventado por los hermanos Wright para controlar el balanceo de su aeronave fue rápidamente sustituido por los alerones (pequeñas superficies articuladas en el borde de fuga de las alas)? Sin embargo, en un giro fascinante de la ingeniería moderna, los aviones experimentales y algunos drones de vanguardia actuales están volviendo a explorar la tecnología de \"alas deformables\" utilizando materiales inteligentes y aleaciones con memoria de forma, retornando al concepto biomimético de modificar la forma del ala de manera fluida, como lo hace un pájaro en vuelo." }
    ],
    fact: "El primer avión comercial de reacción del mundo, el de Havilland Comet, introducido en 1952, sufrió varios accidentes trágicos debido a un fenómeno entonces desconocido: la fatiga del metal exarcebada por sus ventanas de cabina de forma cuadrada, lo que provocó una revisión mundial que estandarizó las ventanas elípticas u ovaladas para distribuir mejor las tensiones estructurales.",
  },
  {
    id: "legado-aviacion",
    bannerImage: '/assets/davinci/infographic_m1/banner_legado-aviacion.webp',
    title: "El Legado de la Aviación",
    color: '#E0B860',
    btnImage: '/assets/davinci/infographic_m1/btn_legado-aviacion.webp',
    image: '/assets/davinci/infographic_m1/hero_legado-aviacion.webp',
    content: [
      "El legado de Leonardo da Vinci en el campo de la aviación va mucho más allá de los bocetos específicos que dejó en sus códices dispersos. Su verdadera contribución perdurable fue el establecimiento de un paradigma metodológico visionario: la firme convicción de que los misterios del vuelo podrían ser desentrañados y dominados a través de la observación minuciosa de la naturaleza, el estudio empírico riguroso, la aplicación de principios matemáticos y la experimentación sistemática. Rompió radicalmente con las nociones místicas o mitológicas, como la historia de Ícaro, para acercar la aeronáutica al dominio de la ciencia exacta.",
      "La figura del inventor renacentista encarna la fusión indispensable entre el arte, la ingeniería y las ciencias naturales, un enfoque holístico e interdisciplinario que sigue siendo vital en la ingeniería aeroespacial moderna. Los diseños de Da Vinci, dibujados con una maestría artística insuperable, no eran meras fantasías estéticas; eran hipótesis mecánicas detalladas que mostraban un entendimiento profundo de la cinemática, la transmisión de engranajes y la dinámica de fluidos. Sus bellas ilustraciones continúan inspirando el diseño estético de tecnologías de vanguardia y vehículos conceptuales del futuro.",
      "Además del ornitóptero, el paracaídas y el tornillo aéreo, Leonardo conceptualizó otros dispositivos relacionados con la navegación aérea que resultaron asombrosamente clarividentes. Esbozó diseños para anemómetros, inclinómetros (para medir el ángulo de vuelo) e incluso propuso un primitivo tren de aterrizaje retráctil para reducir la resistencia aerodinámica en vuelo. Cada uno de estos instrumentos y conceptos son componentes absolutamente críticos y estándar en las cabinas de pilotaje y en la arquitectura de diseño de cualquier aeronave comercial o militar en la actualidad.",
      "Es un tributo apropiado a su visión profética que en el año 1960, el Aeropuerto Internacional de Roma-Fiumicino fuera nombrado oficialmente \"Aeropuerto Intercontinental Leonardo da Vinci\". Además, una enorme e impresionante estatua de bronce del sabio renacentista, sosteniendo un modelo de su tornillo aéreo, da la bienvenida a los millones de viajeros internacionales que transitan por sus terminales cada año, un recordatorio tangible de que el inmenso tráfico aéreo global contemporáneo tiene raíces profundas en los sueños trazados en papel por un artista toscano quinientos años atrás.",
      "En la era actual de la exploración espacial, el espíritu de Leonardo da Vinci sigue asombrosamente vivo y relevante. Cuando ingenieros de la NASA y de agencias espaciales globales diseñan rovers para explorar la superficie de Marte, helicópteros marcianos como el Ingenuity, o conceptualizan futuras misiones atmosféricas en las lunas de Júpiter o Saturno, continúan aplicando los mismos principios de curiosidad insaciable, adaptabilidad mecánica y biomimetismo que caracterizaron al genio de Vinci. Leonardo demostró de una vez por todas que la imaginación humana, cuando se combina con la perseverancia científica, no tiene límites ni fronteras terrenales."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "En homenaje a la universalidad de su genio y su conexión intrínseca con el anhelo de exploración, varias misiones espaciales han llevado obras de Da Vinci más allá de la atmósfera terrestre. Una copia digitalizada del \"Códice sobre el vuelo de los pájaros\" fue llevada a bordo del rover marciano Curiosity de la NASA, que aterrizó en el Planeta Rojo en 2012. Este gesto simbólico sitúa las reflexiones originales sobre la mecánica del vuelo humano en la superficie de un mundo alienígena, un logro que seguramente habría maravillado al propio Leonardo." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que un cráter de impacto en la superficie de la Luna, ubicado en la región del Mare Fecunditatis, fue nombrado oficialmente \"Da Vinci\" en su honor? Además, un asteroide del cinturón principal descubierto en 1981 lleva la designación \"3000 Leonardo\". Estos reconocimientos astronómicos subrayan cómo su insaciable sed de conocimiento, que abarcaba desde la geología y la botánica hasta la astronomía y el diseño de máquinas voladoras, lo ha convertido en un símbolo perdurable y universal del intelecto humano proyectado hacia el cosmos infinito." }
    ],
    fact: "En 1994, el magnate fundador de Microsoft, Bill Gates, adquirió en una subasta el famoso Códice Leicester de Leonardo da Vinci por más de 30 millones de dólares. Este cuaderno de notas se centra principalmente en el agua, la astronomía y las propiedades de las rocas y los fósiles, demostrando que la fascinación por el intelecto y el proceso científico de Leonardo sigue atrayendo enormemente a los grandes pioneros de la tecnología de nuestra era moderna.",
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
      hue: Math.random() > 0.5 ? '212,168,67' : '140,107,79', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#davinciGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#D4A843", "#B08D57", "#8C6B4F", "#C9A24B", "#9C7E5A", "#A88B5E", "#E0B860"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#D4A843" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="davinciGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MÁQUINAS VOLADORAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LEONARDO DA VINCI · RENACIMIENTO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,168,67,0.2)'}`,
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
          layoutId="activeDotDaVinciM1"
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
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A843', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A843, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A843', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_DaVinciM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/davinci/davinci_m1.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,168,67,0.12)',
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
            textAlign: 'center', color: 'rgba(212,168,67,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has completado Máquinas Voladoras!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia del Renacimiento
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
