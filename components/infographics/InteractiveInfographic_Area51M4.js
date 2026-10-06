'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9C8F5A', style = {} }) {
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
  "Pedlow, G. W. y Welzenbach, D. E. (1992; publicación desclasificada 2013). The Central Intelligence Agency and Overhead Reconnaissance: The U-2 and OXCART Programs, 1954–1974. CIA History Staff.",
  "Robarge, D. (2007). Archangel: CIA's Supersonic A-12 Reconnaissance Aircraft. CIA, Center for the Study of Intelligence.",
  "Ufimtsev, P. Ya. (1962). Method of Edge Waves in the Physical Theory of Diffraction. Moscú: Sovetskoye Radio. Traducción al inglés: U.S. Air Force Foreign Technology Division, 1971.",
  "Rich, B. R. y Janos, L. (1994). Skunk Works: A Personal Memoir of My Years at Lockheed. Boston: Little, Brown.",
  "NASA Armstrong Flight Research Center. SR-71 Blackbird Fact Sheet (FS-030).",
  "Knott, E. F., Shaeffer, J. F. y Tuley, M. T. (2004). Radar Cross Section, 2.ª ed. Raleigh: SciTech Publishing.",
  "Haines, G. K. (1997). CIA's Role in the Study of UFOs, 1947–90. Studies in Intelligence, 1(1).",
  "Office of the Director of National Intelligence (2021). Preliminary Assessment: Unidentified Aerial Phenomena. 25 de junio de 2021.",
  "All-domain Anomaly Resolution Office, AARO (2024). Report on the Historical Record of U.S. Government Involvement with Unidentified Anomalous Phenomena, Volume 1.",
  "Sagan, C. (1995). The Demon-Haunted World: Science as a Candle in the Dark. Nueva York: Random House."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a51m4-aerodinamica-mach",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-aerodinamica-mach.webp',
    bannerCaption: "La aerodinámica estudia cómo se mueven los objetos a través del aire; a Mach 3 el aire se comporta de forma muy distinta.",
    title: "Aerodinámica: domar las ondas de choque",
    color: '#5B7B8A',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-aerodinamica-mach.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-aerodinamica-mach.webp',
    content: [
      "La aerodinámica es la rama de la física que estudia cómo se mueven los objetos a través del aire y qué fuerzas aparecen cuando lo hacen. Cuatro fuerzas mandan en todo vuelo: la sustentación, que empuja hacia arriba; el peso, que tira hacia abajo; el empuje de los motores, que impulsa hacia delante; y la resistencia, que frena. A velocidades bajas el aire se comporta casi como un fluido suave que se aparta del avión, pero cuando se vuela muy rápido el aire ya no tiene tiempo de apartarse y aparecen fenómenos completamente nuevos.",
      "El sonido es una onda de presión que viaja por el aire. A nivel del mar y a 20 °C recorre unos 343 metros por segundo, pero su velocidad depende sobre todo de la temperatura: a 20 kilómetros de altura, donde hace unos 56 grados bajo cero, baja a unos 295 metros por segundo. Por eso los ingenieros usan el número de Mach, en honor al físico austriaco Ernst Mach. Mach 1 significa volar a la velocidad del sonido del aire que te rodea, y Mach 3 significa ir tres veces más rápido que ese sonido.",
      "Cuando un avión supera Mach 1, las ondas de presión que produce no pueden adelantarse a él y se amontonan en una frontera muy delgada llamada onda de choque. Al cruzarla, la presión, la temperatura y la densidad del aire saltan de golpe. Desde el suelo, ese salto se escucha como un estampido sónico, parecido a un trueno. Ojo con un mito frecuente: el estampido no ocurre solo en el instante de «romper la barrera», sino que el avión lo arrastra como una alfombra de ruido durante todo el tiempo que vuela a velocidad supersónica.",
      "Para los aviones de reconocimiento de Mach 3, como el A-12 probado en Groom Lake y su pariente el SR-71, uno de los retos más finos estaba en los motores. Un motor a reacción necesita recibir aire más lento que el sonido. Por eso cada toma de aire del SR-71 tenía un cono móvil, llamado spike, que se desplazaba hacia atrás a medida que aumentaba la velocidad. Su función era colocar las ondas de choque en el lugar exacto para frenar y comprimir el aire antes de que llegara al motor Pratt & Whitney J58.",
      "Si las ondas de choque se salían de su sitio ocurría un «unstart»: la toma expulsaba de golpe la onda de choque y el motor perdía empuje en una fracción de segundo, sacudiendo el avión con violencia hacia un lado. Lockheed acabó desarrollando un control automático que movía conos y compuertas mucho más rápido que cualquier piloto. A velocidad de crucero, según los ingenieros del programa, la mayor parte del empuje provenía de la compresión del aire en la toma y en el eyector del escape, y solo una parte menor del núcleo del motor."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El primer vuelo supersónico controlado y documentado lo hizo Chuck Yeager el 14 de octubre de 1947 a bordo del Bell X-1, un avión cohete lanzado desde un bombardero B-29. Menos de treinta años después, el 28 de julio de 1976, un SR-71 pilotado por Eldon Joersz y George Morgan estableció el récord absoluto de velocidad para un avión con motores que respiran aire, que aún sigue vigente: 3,529.6 km/h. ¡Así de rápido avanzó la aerodinámica en una sola generación!" },
      { label: "Dato Científico", icon: "atom", text: "La velocidad del sonido en un gas ideal se calcula con la fórmula c = √(γ·R·T), donde γ vale 1.4 para el aire, R es la constante específica del aire (287 J/kg·K) y T es la temperatura absoluta en kelvin. Con 288 K (15 °C) salen unos 340 m/s; con 217 K, la temperatura típica de la estratosfera baja, salen unos 295 m/s. Por eso un avión a Mach 3 avanza menos kilómetros por hora a gran altura que si volara a Mach 3 cerca del suelo." }
    ],
    fact: "El cono de cada toma de aire del SR-71 podía retroceder unos 66 centímetros (26 pulgadas) durante el vuelo. Por debajo de Mach 1.6 permanecía fijo en su posición delantera y, conforme el avión aceleraba hacia Mach 3.2, un sistema de control lo movía hacia atrás para mantener la onda de choque principal justo en el borde de la toma. Ese pequeño desplazamiento era la diferencia entre un vuelo estable y un violento «unstart».",
  },
  {
    id: "a51m4-titanio-barrera-termica",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-titanio-barrera-termica.webp',
    bannerCaption: "A Mach 3 la compresión del aire calienta la piel del avión a cientos de grados; el titanio resistió donde el aluminio habría fallado.",
    title: "La barrera térmica y el titanio",
    color: '#8A6E5B',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-titanio-barrera-termica.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-titanio-barrera-termica.webp',
    content: [
      "Al volar a más de tres veces la velocidad del sonido, el aire que choca contra el avión se comprime y roza su superficie, y esa energía se transforma en calor. Los ingenieros lo llaman calentamiento aerodinámico o «barrera térmica». En el A-12 y el SR-71 la piel del avión alcanzaba, según la zona, entre unos 200 °C y algo más de 300 °C en los bordes de ataque y alrededor del parabrisas, y las partes cercanas a la salida de los motores se calentaban todavía mucho más. Ningún avión de producción había enfrentado algo así.",
      "La mayoría de los aviones de la época estaban hechos de aleaciones de aluminio, ligeras y fáciles de trabajar. El problema es que esas aleaciones empiezan a perder resistencia a partir de unos 150 °C: un avión de aluminio a Mach 3 se habría debilitado como chocolate al sol. El acero sí aguanta el calor, pero pesa casi tres veces más que el aluminio. La respuesta fue el titanio: es casi un 45 % más ligero que el acero, tiene una resistencia comparable y conserva sus propiedades a las temperaturas del vuelo de crucero.",
      "Alrededor del 90 % de la estructura del A-12 y del SR-71 era de titanio, y trabajarlo fue una aventura. A altas temperaturas el titanio reacciona con el oxígeno y el nitrógeno del aire y se vuelve quebradizo, así que había que soldarlo protegido por un gas inerte como el argón. También hubo sorpresas: herramientas con recubrimiento de cadmio dañaban las piezas, y algunas soldaduras fallaban en verano porque el agua del grifo con la que se lavaban tenía más cloro en esa estación. Cada fallo obligaba a investigar como detectives.",
      "Los diseñadores también aceptaron que el avión cambiara de tamaño. Con el calor, el fuselaje se dilataba varios centímetros, así que algunos paneles de las alas se fabricaron con ondulaciones que les permitían crecer sin deformarse, y los tanques de combustible solo quedaban bien sellados cuando el metal estaba caliente y dilatado. Por eso, en tierra, el SR-71 goteaba combustible por sus juntas: no era un descuido, sino una consecuencia calculada de diseñar un avión para vivir a cientos de grados.",
      "El combustible también hacía de refrigerante: antes de quemarse, el JP-7 circulaba por el avión absorbiendo calor de la cabina, de los sistemas y del aceite de los motores. Era un combustible especial, tan poco volátil que no se encendía con una cerilla, así que para arrancar los motores se inyectaba trietilborano, un compuesto que arde espontáneamente al contacto con el aire produciendo una llamarada verde. Y la pintura oscura ayudaba a irradiar calor hacia el exterior: de ahí el apodo del SR-71, «Blackbird», el mirlo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una de las grandes ironías de la Guerra Fría es que buena parte del titanio que se usó para estos aviones espía procedía de la Unión Soviética. Según relatos de la CIA y de Lockheed, el mineral se compró a través de empresas intermediarias y de terceros países para que los soviéticos no supieran a dónde iba. Así, el país al que el avión iba a vigilar ayudó, sin saberlo, a fabricarlo. Es un buen ejemplo de cómo la ingeniería depende también de la economía y de las cadenas de suministro." },
      { label: "Dato Científico", icon: "atom", text: "La temperatura de estancamiento indica cuánto se calentaría el aire si se frenara por completo contra el avión. Se calcula como T₀ = T·(1 + 0.2·M²). En la estratosfera, con T ≈ 217 K y M = 3.2, sale T₀ ≈ 661 K, unos 388 °C. La piel real queda por debajo de ese máximo teórico porque irradia calor y porque no todo el aire se frena del todo junto a la superficie, lo que concuerda con las temperaturas medidas en vuelo." }
    ],
    fact: "El titanio funde a unos 1,668 °C y su densidad es de unos 4.5 gramos por centímetro cúbico, frente a unos 7.8 del acero y 2.7 del aluminio. Además resiste muy bien la corrosión y el cuerpo humano lo tolera sin rechazo. Por eso hoy se usa en implantes de cadera y dentales, en motores de avión, en bicicletas de competición, en relojes y en naves espaciales, siempre que se necesita un material fuerte, ligero y duradero.",
  },
  {
    id: "a51m4-fisica-del-sigilo",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-fisica-del-sigilo.webp',
    bannerCaption: "El radar detecta aviones por los ecos de sus ondas; la tecnología furtiva reduce esos ecos con geometría y materiales especiales.",
    title: "La física del sigilo: esconderse del radar",
    color: '#6B7F5E',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-fisica-del-sigilo.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-fisica-del-sigilo.webp',
    content: [
      "Un radar funciona como un grito en una cueva: emite pulsos de ondas de radio o microondas, que viajan a la velocidad de la luz, y escucha cuáles rebotan. Midiendo cuánto tarda en volver el eco calcula la distancia del objeto, y midiendo su dirección sabe dónde está. Se desarrolló en la década de 1930 en varios países y fue decisivo en la Segunda Guerra Mundial, por ejemplo con la red británica Chain Home. Desde entonces existe una carrera entre quienes mejoran los radares y quienes intentan esquivarlos.",
      "Lo que importa no es el tamaño real del avión, sino su sección transversal de radar, conocida como RCS por sus siglas en inglés: el área de un objeto ideal que devolvería la misma energía que el avión. Un avión con ángulos rectos, como la unión entre ala y fuselaje o entre las aletas de la cola, actúa como un reflector perfecto, igual que la esquina de una habitación devuelve una pelota hacia ti. Los diseñadores del sigilo buscaban justo lo contrario: que la energía rebotara hacia cualquier lado menos hacia el radar.",
      "La clave teórica vino de un físico soviético, Piotr Ufimtsev, que en 1962 publicó un trabajo sobre cómo se difractan las ondas electromagnéticas en los bordes de los objetos. La Fuerza Aérea de Estados Unidos lo tradujo al inglés en 1971 y, a mediados de los años setenta, el ingeniero Denys Overholser, de Lockheed, se dio cuenta de que esas ecuaciones permitían calcular el eco de una forma hecha de placas planas. Con ellas, el equipo creó un programa de computadora llamado Echo para predecir el RCS antes de construir nada.",
      "¿Por qué el F-117 parece un diamante tallado? Porque las computadoras de los años setenta solo podían calcular con rapidez superficies planas, no curvas complejas. Así nació un diseño de facetas inclinadas que desvían las ondas del radar como espejos. El primer modelo recibió el apodo de «Diamante sin esperanza» porque parecía imposible que volara bien. El demostrador Have Blue voló en 1977 en Groom Lake y abrió el camino al F-117, que necesitaba computadoras de control de vuelo para mantenerse estable en el aire.",
      "Las matemáticas del radar explican por qué hay que reducir tanto el eco. La energía que vuelve al radar disminuye con la cuarta potencia de la distancia: si duplicas la distancia, el eco es dieciséis veces más débil. Eso significa que, para que un radar solo pueda detectar un avión a la mitad de distancia, hay que reducir su RCS dieciséis veces, y para reducir esa distancia a la décima parte hay que reducirlo diez mil veces. El sigilo no vuelve invisible a un avión: retrasa el momento en que lo detectan."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Más tarde, con computadoras mucho más potentes, fue posible calcular el eco de superficies curvas. Por eso el bombardero B-2, desarrollado por Northrop y presentado en público en 1988, tiene formas suaves en lugar de facetas. La forma del F-117 no era una elección estética: era el límite de lo que la informática de su época podía resolver. Es un ejemplo perfecto de cómo las herramientas de cálculo condicionan lo que la ingeniería es capaz de construir." },
      { label: "Dato Científico", icon: "atom", text: "La ecuación del radar dice que la potencia recibida es Pr = Pt·G²·λ²·σ / ((4π)³·R⁴), donde Pt es la potencia emitida, G la ganancia de la antena, λ la longitud de onda, σ la sección transversal de radar y R la distancia. Como la distancia máxima de detección depende de la raíz cuarta de σ, reducir el RCS en un factor de 10,000 solo reduce el alcance de detección en un factor de 10. Por eso el sigilo exige reducciones enormes del eco." }
    ],
    fact: "Ufimtsev publicó su trabajo abiertamente en la Unión Soviética y, según contó Ben Rich, director del Skunk Works, las autoridades soviéticas no vieron su enorme aplicación militar. En 1990 Ufimtsev se trasladó a Estados Unidos, donde trabajó como profesor en la Universidad de California en Los Ángeles. Su historia muestra que la ciencia básica, como entender la difracción de ondas, puede tener consecuencias que ni su propio autor imagina.",
  },
  {
    id: "a51m4-materiales-absorbentes-radar",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-materiales-absorbentes-radar.webp',
    bannerCaption: "Los materiales absorbentes de radar convierten parte de la energía de las microondas en calor en lugar de reflejarla como eco.",
    title: "Materiales que se «comen» el radar",
    color: '#7A6A8C',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-materiales-absorbentes-radar.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-materiales-absorbentes-radar.webp',
    content: [
      "La forma de un avión furtivo desvía gran parte de las ondas de radar, pero no todas. Para el resto se usan los materiales absorbentes de radar, conocidos por sus siglas en inglés RAM. Su trabajo es atrapar la energía de las microondas y convertirla en una cantidad diminuta de calor, en lugar de devolverla como eco. Es la misma idea que los paneles de espuma de un estudio de grabación, que no reflejan el sonido sino que lo absorben. La diferencia es que aquí hablamos de ondas electromagnéticas invisibles.",
      "Muchos materiales absorbentes contienen partículas de ferrita, un compuesto de óxido de hierro, o de carbono, mezcladas en una pintura, una goma o una resina. Cuando la onda de radar entra en el material, sus campos eléctrico y magnético obligan a esas partículas a magnetizarse y a mover cargas de un lado a otro miles de millones de veces por segundo. Ese «rozamiento» interno disipa la energía en forma de calor. Por eso, en el cuestionario, la respuesta correcta es que estos materiales convierten las ondas de radar en calor.",
      "Otra estrategia usa la interferencia de ondas. En la pantalla de Salisbury, ideada por el ingeniero estadounidense Winfield Salisbury en la década de 1940, se coloca una lámina resistiva a un cuarto de longitud de onda por delante de una superficie metálica. La onda que rebota en el metal regresa desfasada media onda respecto a la que rebota en la lámina, y ambas se cancelan. Funciona muy bien, pero solo para una banda estrecha de frecuencias, así que los ingenieros combinan varias capas para cubrir más tipos de radar.",
      "Los aviones de Groom Lake ya probaron estas ideas. El A-12 incorporaba en los bordes de sus alas y en los lomos laterales del fuselaje paneles de materiales compuestos con propiedades absorbentes, diseñados además para soportar el calor del vuelo a Mach 3. Décadas después, el F-117 se cubrió con revestimientos absorbentes que exigían muchísimo mantenimiento: cualquier rasguño, tornillo mal sellado o junta abierta entre paneles podía crear un punto brillante en la pantalla de un radar.",
      "Los materiales absorbentes tienen costos importantes. Añaden peso, pueden ser sensibles a la humedad y al calor, y su eficacia depende de la frecuencia del radar: un material que absorbe muy bien las ondas de unos pocos centímetros puede ser casi transparente para radares de longitud de onda larga. Por eso el sigilo es siempre un compromiso entre forma, materiales, peso, costo y mantenimiento, y por eso los radares de baja frecuencia siguen siendo protagonistas de esta carrera tecnológica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las primeras pruebas de materiales absorbentes son anteriores a los aviones espía. Durante la Segunda Guerra Mundial, Alemania desarrolló recubrimientos de goma con partículas especiales para ocultar los tubos snorkel de sus submarinos frente a los radares aliados, un proyecto conocido como Schornsteinfeger, que significa «deshollinador». Los ingenieros de la Guerra Fría heredaron y perfeccionaron ideas que ya llevaban años investigándose en laboratorios de varios países." },
      { label: "Dato Científico", icon: "atom", text: "La longitud de onda se calcula como λ = c/f, donde c es la velocidad de la luz y f la frecuencia. Un radar de 10 GHz, en la llamada banda X, usa ondas de unos 3 centímetros; uno de 300 MHz usa ondas de 1 metro. Una pantalla de Salisbury para 10 GHz necesita su lámina a un cuarto de onda, unos 7.5 milímetros del metal. Para 300 MHz harían falta 25 centímetros, lo que explica por qué es tan difícil absorber radares de baja frecuencia." }
    ],
    fact: "Los materiales absorbentes no son solo militares. Las cámaras anecoicas, salas cubiertas de pirámides de espuma cargada con carbono, se usan para probar antenas de teléfonos móviles, satélites, aviones civiles y automóviles sin que los ecos de las paredes contaminen las mediciones. Los mismos principios físicos que ayudan a ocultar un avión sirven para medir con precisión cómo emite las ondas tu teléfono celular.",
  },
  {
    id: "a51m4-navegacion-y-optica",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-navegacion-y-optica.webp',
    bannerCaption: "Giroscopios, acelerómetros y un rastreador de estrellas guiaban al SR-71; cámaras de precisión fotografiaban desde más de 20 km.",
    title: "Navegar sin GPS y fotografiar desde la estratosfera",
    color: '#5E7F7A',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-navegacion-y-optica.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-navegacion-y-optica.webp',
    content: [
      "Hoy tu teléfono sabe dónde estás gracias al GPS, pero ese sistema no estuvo completo hasta 1995. ¿Cómo sabía un avión espía de los años sesenta dónde se encontraba sobre territorio lejano, sin ayuda de radiofaros? Con la navegación inercial: un sistema que mide continuamente las aceleraciones y los giros del avión con acelerómetros y giroscopios, y con esos datos calcula la velocidad y la posición sin recibir ninguna señal de radio del exterior. Es como caminar con los ojos cerrados contando pasos y giros.",
      "La idea matemática es sencilla: si conoces tu aceleración en cada instante, al acumularla en el tiempo obtienes tu velocidad, y al acumular la velocidad obtienes la distancia recorrida. El problema es que cualquier pequeño error del sensor también se acumula una y otra vez, y la posición calculada se va alejando poco a poco de la real. A esto se le llama deriva. Un error diminuto de un giroscopio, tras varias horas de vuelo, puede convertirse en kilómetros de desvío respecto al objetivo planeado.",
      "El SR-71 resolvió la deriva mirando al cielo. Su sistema astroinercial, fabricado por la división Nortronics de Northrop, combinaba la plataforma inercial con un rastreador de estrellas que observaba por una pequeña ventana en el lomo del avión. A más de 24 kilómetros de altura el cielo es tan oscuro que el sensor podía localizar estrellas brillantes incluso de día y usarlas para corregir los errores, como los antiguos navegantes con su sextante. No emitía ninguna señal, así que no delataba la posición del avión.",
      "Navegar con precisión era imprescindible para lo que realmente importaba: las fotografías. Las cámaras del U-2 se diseñaron con el consejo de científicos como Edwin Land, inventor de la cámara Polaroid, y el óptico James Baker, y usaban lentes de gran distancia focal y kilómetros de película ultrafina fabricada por Kodak. Según la historia oficial de la CIA, la cámara B del U-2 distinguía objetos de unos 75 centímetros desde unos 21 kilómetros de altura: suficiente para contar aviones en una base, pero no para leer matrículas.",
      "La óptica tiene límites físicos. La difracción de la luz, la turbulencia del aire, la vibración del avión y el tamaño del grano de la película degradan la imagen. Por eso las cámaras se montaban sobre soportes que compensaban los movimientos y se calibraban con muchísimo cuidado. A partir de 1960, los satélites del programa CORONA empezaron a tomar fotografías desde el espacio y, con el tiempo, el análisis de imágenes pasó de los ojos de los fotointérpretes a las computadoras, una historia que todavía continúa."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En el SR-71 viajaban dos personas: el piloto delante y, detrás, el oficial de sistemas de reconocimiento, que vigilaba la navegación, los sensores y los equipos de defensa electrónica durante toda la misión. El sistema astroinercial no solo calculaba la posición: también podía guiar al avión por la ruta planificada y ayudar a apuntar los sensores al objetivo correcto. A más de 3,000 km/h, un pequeño error de navegación significaba fotografiar el lugar equivocado." },
      { label: "Dato Científico", icon: "atom", text: "El límite de resolución por difracción de una lente sigue el criterio de Rayleigh: θ ≈ 1.22·λ/D, donde λ es la longitud de onda de la luz y D el diámetro de la lente. Para luz verde de 550 nanómetros y una lente de 20 centímetros, θ vale unas 3.4 millonésimas de radián; desde 21 km eso equivale a unos 7 centímetros. Como la cámara real lograba unos 75 cm, el límite práctico lo ponían la atmósfera, la vibración y la película, no la difracción." }
    ],
    fact: "La misma combinación de navegación inercial y corrección con estrellas se usó en las naves Apolo, cuyos astronautas tomaban mediciones con un sextante para ajustar la plataforma inercial, y hoy se emplea en satélites y sondas espaciales, que llevan rastreadores estelares para saber exactamente hacia dónde apuntan. Navegar mirando las estrellas es una técnica milenaria que la tecnología moderna nunca ha abandonado.",
  },
  {
    id: "a51m4-cuerpo-en-la-estratosfera",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-cuerpo-en-la-estratosfera.webp',
    bannerCaption: "Por encima del límite de Armstrong, unos 19 km, los líquidos corporales expuestos hierven a 37 °C: hacía falta un traje presurizado.",
    title: "El cuerpo humano a 21 kilómetros: trajes de presión",
    color: '#8C7A5B',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-cuerpo-en-la-estratosfera.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-cuerpo-en-la-estratosfera.webp',
    content: [
      "El U-2 volaba a unos 21 kilómetros de altura y el SR-71 por encima de los 24. Allí la presión del aire es menos del 5 % de la que hay al nivel del mar, y el cuerpo humano no puede sobrevivir sin protección. Si la cabina perdía presión, el piloto tenía apenas unos segundos de conciencia útil antes de desmayarse por falta de oxígeno. Por eso estos aviones fueron, además de máquinas de reconocimiento, laboratorios para aprender a mantener con vida a una persona en un ambiente casi espacial.",
      "La temperatura a la que hierve un líquido depende de la presión. En una olla a presión el agua hierve por encima de 100 °C, y en lo alto de una montaña hierve a menos temperatura. A unos 18 o 19 kilómetros de altitud la presión cae a unos 6.3 kilopascales y el agua hierve a 37 °C, la temperatura del cuerpo. Esa altura se llama límite de Armstrong, en honor al médico militar estadounidense Harry Armstrong. Por encima de ella, la saliva, las lágrimas y el líquido de los pulmones empezarían a hervir.",
      "Aquí la ciencia corrige un mito muy repetido: la sangre no hierve de golpe dentro de las venas, porque el corazón y los vasos sanguíneos la mantienen a una presión algo mayor que la del ambiente. Lo que sí ocurre es que los tejidos se hinchan por el vapor, el cerebro se queda sin oxígeno en segundos y el nitrógeno disuelto en la sangre forma burbujas, como cuando abres un refresco. El peligro es completamente real, aunque los detalles sean distintos de los que muestran las películas.",
      "La solución fueron los trajes de presión. Los primeros pilotos del U-2 usaban trajes de presión parcial, que apretaban el cuerpo con tubos inflables, y los del SR-71 vestían trajes de presión completa, con casco cerrado, que creaban a su alrededor una pequeña atmósfera artificial. Los fabricaba la empresa David Clark, de Massachusetts, que también diseñó trajes para astronautas del programa Gemini y del transbordador espacial. Ponerse uno requería la ayuda de técnicos especializados.",
      "Antes de cada misión, los pilotos respiraban oxígeno puro durante alrededor de una hora para eliminar el nitrógeno de su cuerpo y evitar la enfermedad descompresiva, la misma que amenaza a los buceadores que suben demasiado rápido. Aun así, en vuelos de muchas horas algunos pilotos del U-2 sufrieron síntomas, y en la década de 2010 la Fuerza Aérea modificó la cabina para mantenerla a una presión equivalente a una altitud mucho menor. La medicina aeroespacial sigue aprendiendo de estos vuelos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Antes de despegar, las tripulaciones del SR-71 solían tomar un desayuno rico en proteínas y bajo en fibra, a menudo bistec con huevos, para reducir la necesidad de ir al baño durante vuelos largos dentro de un traje sellado. Para comer y beber durante la misión, el casco tenía un pequeño orificio por el que se introducían tubos con comida en forma de pasta, muy parecida a la de los primeros astronautas. Los pilotos del U-2 todavía usan este sistema en sus misiones largas." },
      { label: "Dato Científico", icon: "atom", text: "La presión atmosférica disminuye aproximadamente de forma exponencial con la altura: cada unos 5.5 kilómetros se reduce más o menos a la mitad. A nivel del mar es de unos 101 kilopascales; a 5.5 km, unos 50; a 11 km, unos 23; hacia los 19 km, unos 6.3; y a 21 km, menos de 5. Con tan poca presión, aunque respiraras oxígeno puro, tus pulmones no podrían hacer pasar suficiente oxígeno a la sangre sin un traje o una cabina presurizada." }
    ],
    fact: "Hoy la NASA sigue usando dos aviones ER-2, versiones civiles del U-2, como laboratorios voladores. Llevan instrumentos para estudiar la capa de ozono, los huracanes, los incendios forestales y la calidad del aire, y sirven para probar sensores que luego viajarán en satélites. Sus pilotos visten trajes de presión muy parecidos a los de los astronautas, herederos directos de aquellos primeros trajes de la Guerra Fría.",
  },
  {
    id: "a51m4-metodo-cientifico",
    bannerImage: '/assets/area51/infographic_m4/banner_a51m4-metodo-cientifico.webp',
    bannerCaption: "Para la ciencia, una afirmación es válida si se apoya en evidencia medible y en resultados que otros pueden repetir y comprobar.",
    title: "Ciencia o ficción: cómo se pone a prueba una afirmación",
    color: '#6E6E80',
    btnImage: '/assets/area51/infographic_m4/btn_a51m4-metodo-cientifico.webp',
    image: '/assets/area51/infographic_m4/hero_a51m4-metodo-cientifico.webp',
    content: [
      "Todo lo que acabas de leer, el titanio, las ondas de choque, los ecos de radar, se puede medir, calcular y repetir en un laboratorio. Esa es la gran diferencia entre la ciencia real y la ficción. Para que la ciencia considere válida una afirmación necesita evidencia medible y experimentos o mediciones que otras personas, de forma independiente, puedan repetir y obtener el mismo resultado. Un testimonio, una foto borrosa o la opinión de muchísima gente pueden ser un punto de partida, pero nunca una prueba suficiente.",
      "Una buena hipótesis científica debe poder ponerse a prueba: tiene que decir qué observaríamos si fuera falsa. El filósofo Karl Popper llamó a esta propiedad falsabilidad. Además, los resultados se publican con todos los detalles para que otros expertos los revisen y busquen errores, un proceso llamado revisión por pares. La ciencia no avanza porque alguien tenga mucha autoridad o mucha fama, sino porque sus ideas sobreviven a intentos honestos de demostrar que están equivocadas.",
      "El Área 51 ofrece un ejemplo real. En 1997, el historiador de la CIA Gerald Haines publicó un estudio que reconocía que, desde finales de los años cincuenta y durante los sesenta, más de la mitad de los informes de ovnis recibidos por la Fuerza Aérea se debían a vuelos de reconocimiento tripulados, primero del U-2 y después del A-12. Pilotos comerciales veían destellos plateados a alturas imposibles para cualquier avión conocido. Había algo real en el cielo, pero la explicación era terrestre y secreta.",
      "Los gobiernos también aplican el método cuando analizan fenómenos extraños. El informe preliminar de la Oficina del Director de Inteligencia Nacional de Estados Unidos, de 2021, revisó 144 reportes de fenómenos aéreos no identificados y concluyó que faltaban datos para explicar la mayoría, sin afirmar que fueran extraterrestres. En 2024, la oficina AARO del Departamento de Defensa publicó una revisión histórica que no encontró pruebas de tecnología extraterrestre, y sí de que muchos rumores nacieron de programas secretos reales.",
      "Como cadete defensor de la ciencia, tienes herramientas para pensar con claridad. Carl Sagan popularizó la frase «afirmaciones extraordinarias requieren evidencias extraordinarias». La navaja de Ockham sugiere preferir la explicación que necesita menos suposiciones. Y conviene recordar nuestros sesgos: el de confirmación nos hace fijarnos solo en lo que apoya lo que ya creemos, y la pareidolia nos hace ver caras o naves en formas al azar. Dudar con método no es ser aguafiestas: es la forma más segura de acercarse a la verdad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Entre 1952 y 1969, la Fuerza Aérea de Estados Unidos investigó miles de avistamientos en el Proyecto Libro Azul. De 12,618 reportes, la gran mayoría se explicó como planetas brillantes, estrellas, globos, aviones, satélites o fenómenos meteorológicos, y 701 quedaron sin identificar, casi siempre por falta de datos suficientes. Recuerda: «no identificado» significa exactamente eso, que no se pudo identificar, no que se haya demostrado que es extraterrestre." },
      { label: "Dato Científico", icon: "atom", text: "Los científicos usan la estadística para saber si un resultado podría deberse al azar. Por ejemplo, en física de partículas se exige una significancia de «cinco sigma» para anunciar un descubrimiento, lo que equivale aproximadamente a una probabilidad de uno entre 3.5 millones de que una fluctuación aleatoria produzca por sí sola una señal así. Con ese estándar tan exigente anunció el CERN el descubrimiento del bosón de Higgs en julio de 2012." }
    ],
    fact: "Repetir un experimento no es desconfiar por desconfiar: es la base de la ciencia. En 2011, el experimento OPERA midió neutrinos que parecían viajar más rápido que la luz. En lugar de celebrarlo como una revolución, los propios investigadores pidieron a otros científicos que buscaran el error, y en 2012 se encontró: un cable de fibra óptica mal conectado y un reloj desajustado. Así es como la ciencia se corrige a sí misma.",
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
      hue: Math.random() > 0.5 ? '156,143,90' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(156,143,90,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradArea51M4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7B8A", "#8A6E5B", "#6B7F5E", "#7A6A8C", "#5E7F7A", "#8C7A5B", "#6E6E80"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9C8F5A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9C8F5A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradArea51M4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(156,143,90,0.2)" />
            <stop offset="50%" stopColor="rgba(156,143,90,0.9)" />
            <stop offset="100%" stopColor="rgba(156,143,90,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9C8F5A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA FÍSICA DE LOS AVIONES SECRETOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(156,143,90,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ÁREA 51 · PENSAMIENTO CRÍTICO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(156,143,90,0.2)'}`,
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
          layoutId="activeDotArea51M4"
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
      border: '1px solid rgba(156,143,90,0.15)',
    }}>
      <Star size={14} style={{ color: '#9C8F5A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9C8F5A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(156,143,90,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9C8F5A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Area51M4() {
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
      border: '1px solid rgba(156,143,90,0.12)',
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
            textAlign: 'center', color: 'rgba(156,143,90,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(156,143,90,0.08)', borderRadius: '16px',
              border: '1px solid rgba(156,143,90,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9C8F5A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Defensor de la Ciencia: física, materiales y método detrás del Área 51
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
