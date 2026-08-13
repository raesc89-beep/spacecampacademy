'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Stellar Evolution themed) ————————————————————
function DecoNebula({ size = 70, color = '#4A7FB5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Cloud-like nebula shape */}
      <ellipse cx="30" cy="30" rx="22" ry="16" fill={color} opacity="0.15" />
      <ellipse cx="22" cy="26" rx="12" ry="10" fill={color} opacity="0.12" />
      <ellipse cx="38" cy="34" rx="14" ry="9" fill={color} opacity="0.12" />
      {/* Embedded stars */}
      <circle cx="20" cy="22" r="1.5" fill={color} opacity="0.6" />
      <circle cx="35" cy="28" r="2" fill={color} opacity="0.5" />
      <circle cx="42" cy="38" r="1" fill={color} opacity="0.4" />
      <circle cx="15" cy="35" r="1.2" fill={color} opacity="0.5" />
      {/* Dust lanes */}
      <path d="M10 30 Q20 24 30 28 Q40 32 50 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M12 38 Q22 32 32 36 Q42 40 52 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoProtostar({ size = 70, color = '#D4736A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Accretion disk */}
      <ellipse cx="30" cy="32" rx="24" ry="8" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="30" cy="32" rx="18" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Central protostar */}
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.35" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      {/* Jets */}
      <line x1="30" y1="24" x2="30" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="30" y1="36" x2="30" y2="54" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Jet spread */}
      <path d="M28 8 L30 4 L32 8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M28 52 L30 56 L32 52" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoHRDiagram({ size = 80, color = '#5A8FC5', style = {} }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 80 64" style={{ opacity: 0.22, ...style }}>
      {/* Axes */}
      <line x1="12" y1="8" x2="12" y2="56" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="12" y1="56" x2="72" y2="56" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Main sequence diagonal */}
      <path d="M18 14 Q35 30 65 52" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Giant branch */}
      <path d="M35 30 Q28 18 50 12" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      {/* White dwarf region */}
      <circle cx="56" cy="48" r="3" fill={color} opacity="0.25" />
      {/* Stars on sequence */}
      <circle cx="20" cy="16" r="2.5" fill={color} opacity="0.5" />
      <circle cx="36" cy="32" r="2" fill={color} opacity="0.45" />
      <circle cx="55" cy="46" r="1.5" fill={color} opacity="0.4" />
      <circle cx="48" cy="14" r="3" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoFusionCore({ size = 60, color = '#C46358', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Layered shells */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      {/* Proton particles */}
      <circle cx="30" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="48" cy="24" r="1.5" fill={color} opacity="0.5" />
      <circle cx="44" cy="44" r="1.5" fill={color} opacity="0.5" />
      <circle cx="16" cy="40" r="1.5" fill={color} opacity="0.5" />
      <circle cx="14" cy="20" r="1.5" fill={color} opacity="0.5" />
      {/* Energy arrows */}
      <path d="M30 6 Q34 3 30 0" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M52 30 Q55 26 58 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoSupernova({ size = 70, color = '#6A9FD5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central explosion */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.5" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Explosion rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x2 = 30 + 24 * Math.cos(rad);
        const y2 = 30 + 24 * Math.sin(rad);
        return <line key={i} x1={30 + 8 * Math.cos(rad)} y1={30 + 8 * Math.sin(rad)} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />;
      })}
      {/* Debris particles */}
      <circle cx="12" cy="12" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="14" r="1.5" fill={color} opacity="0.35" />
      <circle cx="50" cy="46" r="1" fill={color} opacity="0.4" />
      <circle cx="10" cy="48" r="1.5" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoBlackHole({ size = 70, color = '#B4534A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Event horizon */}
      <circle cx="30" cy="30" r="10" fill="rgba(0,0,0,0.6)" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Accretion disk */}
      <ellipse cx="30" cy="30" rx="26" ry="8" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Gravitational lensing arcs */}
      <path d="M10 18 Q20 8 30 12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M30 48 Q40 52 50 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Infalling matter */}
      <circle cx="50" cy="20" r="1" fill={color} opacity="0.5" />
      <circle cx="52" cy="28" r="0.8" fill={color} opacity="0.4" />
      <path d="M50 20 Q42 24 36 26" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'nubes-gas-polvo': [DecoNebula, DecoProtostar, DecoHRDiagram],
  'nacimiento-estrella': [DecoProtostar, DecoNebula, DecoFusionCore],
  'diagrama-hr': [DecoHRDiagram, DecoFusionCore, DecoNebula],
  'secuencia-principal': [DecoFusionCore, DecoHRDiagram, DecoProtostar],
  'gigantes-enanas': [DecoSupernova, DecoFusionCore, DecoHRDiagram],
  'supernovas-neutrones': [DecoSupernova, DecoBlackHole, DecoNebula],
  'agujeros-negros-estelares': [DecoBlackHole, DecoSupernova, DecoFusionCore],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Carroll, B.W. & Ostlie, D.A. (2017). An Introduction to Modern Astrophysics, 2nd ed. Cambridge University Press',
  'Kippenhahn, R., Weigert, A. & Weiss, A. (2012). Stellar Structure and Evolution, 2nd ed. Springer-Verlag',
  'Prialnik, D. (2009). An Introduction to the Theory of Stellar Structure and Evolution, 2nd ed. Cambridge University Press',
  'Bethe, H.A. (1939). Energy Production in Stars. Physical Review, 55(5), 434–456',
  'Payne, C.H. (1925). Stellar Atmospheres: A Contribution to the Observational Study of High Temperature in the Reversing Layers of Stars. Radcliffe College PhD Thesis',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'nubes-gas-polvo',
    title: 'Nubes de Gas y Polvo',
    color: '#4A7FB5',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_nubes-gas-polvo.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_nubes-gas-polvo.jpg',
    content: [
      'Las estrellas nacen en regiones del espacio llamadas nubes moleculares, que son enormes acumulaciones de gas (principalmente hidrógeno molecular, H₂) y polvo interestelar. Estas nubes pueden extenderse a lo largo de cientos de años luz y contener material suficiente para formar miles de estrellas. La Nebulosa de Orión, ubicada a unos 1,344 años luz de la Tierra según mediciones del telescopio Hubble publicadas en 2007, es una de las regiones de formación estelar más estudiadas y puede observarse a simple vista como una mancha difusa en la constelación de Orión.',
      'El gas dentro de estas nubes se encuentra a temperaturas extremadamente bajas, entre 10 y 20 Kelvin (alrededor de -253 °C a -263 °C). A estas temperaturas, las moléculas de hidrógeno se mueven con lentitud y la presión interna es baja. El astrónomo británico James Jeans calculó en 1902 la masa mínima que una nube necesita para colapsar bajo su propia gravedad, conocida hoy como la masa de Jeans. Para una nube molecular típica a 10 K con una densidad de 10⁴ partículas por centímetro cúbico, la masa de Jeans es aproximadamente una masa solar.',
      'Cuando una región de la nube acumula suficiente masa o recibe un empujón externo — como la onda expansiva de una supernova cercana o la compresión producida por la rotación de un brazo espiral de la galaxia — comienza un colapso gravitacional. Este proceso fue modelado por primera vez por el físico Frank Shu en 1977, quien propuso el modelo de colapso de adentro hacia afuera. La región central de la nube cae primero, y una onda de colapso se propaga hacia fuera a la velocidad del sonido local, que en estas nubes frías es de apenas 0.2 km/s.',
      'El polvo interestelar, compuesto por granos microscópicos de silicatos, grafito y hielos de agua, dióxido de carbono y monóxido de carbono, representa solo el 1% de la masa total de la nube, pero cumple funciones esenciales. Actúa como escudo contra la radiación ultravioleta de estrellas cercanas, protegiendo las moléculas de hidrógeno de ser destruidas. Además, la superficie de los granos de polvo funciona como laboratorio químico donde se forman moléculas complejas, incluyendo agua y compuestos orgánicos simples que luego se incorporarán a los sistemas planetarios.',
      'Las observaciones con radiotelescopios como ALMA (Atacama Large Millimeter Array), ubicado en el desierto de Atacama en Chile a 5,058 metros de altitud, han revelado que estas nubes moleculares contienen estructuras filamentosas — largos hilos de gas denso donde se concentran los núcleos preestelares. El satélite Herschel de la Agencia Espacial Europea, que operó entre 2009 y 2013, descubrió que estos filamentos tienen un ancho característico de 0.1 parsecs (aproximadamente 0.3 años luz), un resultado que cambió la forma en que los astrónomos entienden las etapas iniciales de la formación estelar.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Nebulosa del Águila, famosa por la imagen de los "Pilares de la Creación" tomada por el telescopio Hubble en 1995, contiene columnas de gas y polvo que miden hasta 4 años luz de longitud. Dentro de estas columnas se están formando nuevas estrellas en este momento. La imagen fue retomada por el James Webb en 2022 en infrarrojo, revelando estrellas recién nacidas que eran invisibles en luz visible porque el polvo las ocultaba por completo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La nube molecular gigante de Orión contiene aproximadamente 2,000 veces la masa del Sol distribuida en una región de unos 240 años luz de diámetro. Los astrónomos han identificado en ella más de 2,500 estrellas jóvenes con menos de 2 millones de años de edad. La densidad del gas en las regiones más densas alcanza 10⁶ moléculas por centímetro cúbico, un millón de veces más densa que el medio interestelar promedio, pero aún un vacío mejor que cualquiera que podamos producir en un laboratorio terrestre.' },
    ],
    fact: 'Cecilia Payne demostró en 1925 que el hidrógeno es el elemento más abundante en las estrellas. Las nubes moleculares confirman esta composición: están formadas por un 73% de hidrógeno, un 25% de helio y apenas un 2% de elementos más pesados. Todo el oxígeno, carbono, hierro y otros elementos que componen nuestros cuerpos fueron fabricados dentro de estrellas que existieron antes que el Sol y fueron dispersados al espacio por explosiones de supernovas, para luego incorporarse a una nueva nube molecular que colapsó hace 4,600 millones de años y formó nuestro sistema solar.',
  },
  {
    id: 'nacimiento-estrella',
    title: 'Nacimiento de una Estrella',
    color: '#D4736A',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_nacimiento-estrella.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_nacimiento-estrella.jpg',
    content: [
      'El colapso de un fragmento de nube molecular produce un objeto conocido como protoestrella — una esfera de gas en contracción que aún no ha iniciado la fusión nuclear de hidrógeno en su centro. La protoestrella se encuentra envuelta en un capullo opaco de gas y polvo que impide observarla en luz visible, pero que emite radiación infrarroja detectable con telescopios especializados. El proceso desde el inicio del colapso hasta la formación de una protoestrella tarda entre 10,000 y 100,000 años, dependiendo de la masa del fragmento original.',
      'A medida que el gas cae hacia el centro, la energía gravitacional se convierte en calor y la temperatura de la protoestrella aumenta progresivamente. Cuando la temperatura central alcanza unos 2,000 K, las moléculas de hidrógeno (H₂) se disocian en átomos individuales de hidrógeno, absorbiendo energía y causando una segunda fase de colapso rápido que el astrónomo Richard Larson describió en detalle en 1969. Se forma entonces un núcleo hidroestático caliente de unas pocas masas de Júpiter rodeado por material en caída libre.',
      'La fase T Tauri es un período de juventud estelar que dura entre 1 y 10 millones de años, nombrada en honor a la estrella T Tauri en la constelación de Tauro, identificada por Alfred Joy en 1945. Las estrellas T Tauri muestran variaciones de brillo irregulares, líneas de emisión intensas en su espectro — las mismas líneas espectrales que Cecilia Payne estudió para determinar la composición estelar — y están frecuentemente rodeadas por discos protoplanetarios de gas y polvo donde se formarán planetas.',
      'La ignición nuclear marca el verdadero nacimiento de una estrella. Ocurre cuando la temperatura en el centro de la protoestrella alcanza aproximadamente 10 millones de Kelvin, suficiente para que los protones (núcleos de hidrógeno) venzan su repulsión eléctrica mutua y se fusionen mediante la cadena protón-protón. Este momento define la entrada de la estrella en la secuencia principal del diagrama Hertzsprung-Russell, donde pasará la mayor parte de su vida. Para una estrella como el Sol, el viaje desde nube molecular hasta la secuencia principal toma unos 50 millones de años.',
      'El disco protoplanetario que rodea a la estrella joven contiene típicamente entre el 1% y el 10% de la masa de la estrella central. Con el tiempo, los granos de polvo dentro del disco colisionan y se adhieren, formando cuerpos cada vez más grandes llamados planetesimales. El telescopio ALMA ha fotografiado directamente estos discos alrededor de estrellas jóvenes como HL Tauri, revelando anillos y brechas que indican la presencia de planetas en formación. La imagen de HL Tauri, publicada en noviembre de 2014, muestra un disco con surcos concéntricos definidos a solo un millón de años de edad del sistema, sugiriendo que la formación planetaria comienza mucho antes de lo que se pensaba.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las protoestrellas más masivas se forman tan rápido que encienden la fusión nuclear mientras todavía están acumulando material de la nube circundante. Una protoestrella de 10 masas solares alcanza la secuencia principal en solo 100,000 años, mientras que una de 0.1 masas solares puede tardar 1,000 millones de años en completar su contracción. La velocidad de formación es proporcional a la masa: las estrellas grandes nacen deprisa y mueren jóvenes, mientras que las pequeñas nacen con lentitud y viven eternidades cósmicas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Durante la fase T Tauri, las estrellas jóvenes expulsan material a velocidades de hasta 200 km/s en forma de chorros bipolares (jets) que se extienden a lo largo de varios años luz. Estos jets son visibles como objetos Herbig-Haro, nombrados en honor a George Herbig y Guillermo Haro, quienes los catalogaron en la década de 1950. Se han identificado más de 1,000 objetos Herbig-Haro en nuestra galaxia. Los jets transportan momento angular, permitiendo que la protoestrella siga contrayéndose sin girar demasiado rápido.' },
    ],
    fact: 'Nuestro propio Sol nació hace 4,600 millones de años a partir del colapso de una nube molecular. La evidencia proviene de meteoritos primitivos llamados condritas carbonáceas, que contienen granos presolares — diminutos cristales que se formaron en las atmósferas de estrellas anteriores al Sol. El meteorito Murchison, caído en Australia en 1969, contiene granos de carburo de silicio con edades de hasta 7,000 millones de años, más antiguos que el propio Sistema Solar, demostrando que nuestro vecindario cósmico fue construido con material reciclado de generaciones anteriores de estrellas.',
  },
  {
    id: 'diagrama-hr',
    title: 'El Diagrama H-R',
    color: '#5A8FC5',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_diagrama-hr.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_diagrama-hr.jpg',
    content: [
      'El Diagrama Hertzsprung-Russell (H-R) es la herramienta más poderosa de la astrofísica para clasificar y comprender las estrellas. Fue desarrollado de forma independiente por el astrónomo danés Ejnar Hertzsprung en 1911 y el astrónomo estadounidense Henry Norris Russell en 1913. El diagrama grafica la luminosidad de las estrellas (cuánta energía emiten) en el eje vertical contra su temperatura superficial (o color) en el eje horizontal, con las estrellas más calientes a la izquierda y las más frías a la derecha.',
      'La secuencia principal es una banda diagonal que cruza el diagrama desde la esquina superior izquierda (estrellas calientes y luminosas) hasta la esquina inferior derecha (estrellas frías y tenues). Aproximadamente el 90% de todas las estrellas observables se encuentran en la secuencia principal, donde están fusionando hidrógeno en helio en sus núcleos. El Sol es una estrella de secuencia principal de tipo espectral G2V, con una temperatura superficial de 5,778 K y una luminosidad de 3.828 × 10²⁶ watts, ubicada cerca del centro del diagrama.',
      'Por encima de la secuencia principal se encuentran las gigantes y supergigantes rojas — estrellas que han agotado el hidrógeno en sus núcleos y se han expandido enormemente. Betelgeuse, la supergigante roja en el hombro de Orión, tiene un radio 764 veces mayor que el del Sol según mediciones interferométricas publicadas en 2020. Si Betelgeuse reemplazara al Sol, su superficie se extendería más allá de la órbita de Júpiter. Su temperatura superficial es de solo 3,600 K, pero su luminosidad es 126,000 veces la del Sol.',
      'En la esquina inferior izquierda del diagrama se agrupan las enanas blancas — los restos densos y calientes de estrellas que han agotado su combustible nuclear. Sirius B, la compañera de la estrella más brillante del cielo nocturno, fue la primera enana blanca identificada, por Walter Adams en 1915. Tiene una masa similar a la del Sol comprimida en un volumen comparable al de la Tierra, con una densidad de aproximadamente 1,000 kg por centímetro cúbico. Una cucharadita de su material pesaría tanto como un automóvil.',
      'El trabajo de Cecilia Payne fue fundamental para interpretar el diagrama H-R correctamente. Antes de su tesis de 1925, los astrónomos asumían que las diferencias espectrales entre estrellas reflejaban diferencias en composición química. Payne demostró que las variaciones en las líneas de absorción se deben principalmente a diferencias de temperatura, no de composición, y que todas las estrellas están compuestas mayoritariamente por hidrógeno y helio. Esta comprensión transformó el diagrama H-R de un catálogo descriptivo en una herramienta predictiva que permite trazar la evolución completa de una estrella según su masa inicial.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El diagrama H-R permite predecir el futuro de cualquier estrella si conocemos su masa. Una estrella de 1 masa solar (como el Sol) permanecerá en la secuencia principal durante unos 10,000 millones de años, luego se convertirá en gigante roja durante 1,000 millones de años, y finalmente terminará como enana blanca. Una estrella de 20 masas solares vivirá solo 10 millones de años en la secuencia principal y terminará su vida en una explosión de supernova. La masa es el destino de cada estrella.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las clases espectrales de las estrellas se clasifican con las letras O, B, A, F, G, K, M, ordenadas de mayor a menor temperatura. La nemotecnia clásica en inglés es "Oh Be A Fine Girl/Guy Kiss Me". Las estrellas O son las más calientes (30,000-50,000 K) y azules, mientras que las M son las más frías (2,400-3,700 K) y rojas. El Sol es tipo G2, con temperatura superficial de 5,778 K. Las estrellas M son las más comunes: representan el 76% de todas las estrellas de la Vía Láctea.' },
    ],
    fact: 'Henry Norris Russell, quien inicialmente rechazó el hallazgo de Cecilia Payne sobre la abundancia de hidrógeno en las estrellas, terminó llegando a la misma conclusión cuatro años después en 1929 y recibió el crédito por el descubrimiento durante décadas. El diagrama que lleva su nombre se convirtió en una de las herramientas centrales de la astronomía, y es irónico que su correcta interpretación depende del hallazgo que él mismo desestimó. En 1976, la Sociedad Astronómica Americana otorgó a Payne el Premio Henry Norris Russell, reconociendo finalmente su contribución pionera.',
  },
  {
    id: 'secuencia-principal',
    title: 'La Vida en la Secuencia Principal',
    color: '#C46358',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_secuencia-principal.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_secuencia-principal.jpg',
    content: [
      'Una estrella pasa la mayor parte de su vida en la secuencia principal, donde mantiene un equilibrio hidrostático entre la fuerza gravitatoria que intenta comprimir la estrella y la presión generada por la fusión nuclear en su centro, que empuja hacia afuera. Este equilibrio fue descrito cuantitativamente por Arthur Eddington en 1926, quien demostró que la luminosidad de una estrella depende fuertemente de su masa. La relación masa-luminosidad de Eddington establece que la luminosidad es proporcional a la masa elevada a una potencia entre 3 y 4, lo que significa que una estrella con 10 veces la masa del Sol emite unas 5,000 a 10,000 veces más luz.',
      'La fusión del hidrógeno en helio ocurre a través de dos mecanismos principales. La cadena protón-protón (cadena pp) domina en estrellas con masas iguales o menores a la del Sol. En este proceso, cuatro protones se combinan para formar un núcleo de helio-4, liberando dos positrones, dos neutrinos y 26.7 MeV de energía. El proceso completo requiere varias etapas y toma en promedio 10,000 millones de años en una estrella solar. Cada segundo, el Sol convierte 600 millones de toneladas de hidrógeno en 596 millones de toneladas de helio; las 4 millones de toneladas faltantes se transforman en energía según la ecuación E=mc² de Einstein.',
      'En estrellas más masivas que 1.3 masas solares, el ciclo carbono-nitrógeno-oxígeno (ciclo CNO) se convierte en el mecanismo dominante de fusión. Este ciclo fue propuesto independientemente por Hans Bethe y Carl Friedrich von Weizsäcker en 1938-1939. Bethe recibió el Premio Nobel de Física en 1967 por este trabajo. En el ciclo CNO, los núcleos de carbono, nitrógeno y oxígeno actúan como catalizadores: facilitan la fusión de hidrógeno en helio sin ser consumidos en el proceso. La temperatura mínima requerida para el ciclo CNO es de unos 15 millones de Kelvin.',
      'La masa de una estrella determina no solo su luminosidad sino también su tiempo de vida en la secuencia principal. Las estrellas masivas gastan su combustible a un ritmo mucho mayor que las estrellas pequeñas. Una estrella de tipo O con 60 masas solares agota su hidrógeno en apenas 3.4 millones de años. El Sol, con su ritmo moderado de fusión, tiene combustible para aproximadamente 10,000 millones de años, de los cuales ya ha consumido unos 4,600 millones. Las enanas rojas de tipo M, con solo 0.1 masas solares, pueden permanecer en la secuencia principal durante billones (10¹²) de años, mucho más que la edad actual del universo (13,800 millones de años).',
      'Los neutrinos producidos en el núcleo del Sol durante la fusión son partículas casi sin masa que apenas interactúan con la materia. Atraviesan el Sol entero en 2 segundos y llegan a la Tierra en 8 minutos viajando a casi la velocidad de la luz. El experimento Homestake, dirigido por Raymond Davis Jr. en una mina de oro abandonada en Dakota del Sur desde 1970 hasta 1994, detectó neutrinos solares y descubrió que llegaban solo un tercio de los esperados. Este "problema de los neutrinos solares" se resolvió cuando se demostró que los neutrinos cambian de tipo durante su viaje, un fenómeno llamado oscilación de neutrinos que le valió a Takaaki Kajita y Arthur McDonald el Nobel de Física en 2015.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un fotón generado en el centro del Sol tarda un promedio de 170,000 años en llegar a la superficie. No viaja en línea recta, sino que es absorbido y reemitido trillones de veces por los átomos del interior solar en un proceso llamado caminata aleatoria (random walk). Cuando finalmente emerge de la superficie, ese mismo fotón llega a la Tierra en solo 8 minutos y 20 segundos viajando a la velocidad de la luz. La luz del Sol que ves hoy fue generada cuando los Neandertales aún caminaban por Europa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El núcleo del Sol tiene una temperatura de 15.7 millones de Kelvin y una densidad de 150 gramos por centímetro cúbico — unas 13 veces más denso que el plomo. A pesar de estas condiciones, la tasa de generación de energía por unidad de masa es sorprendentemente baja: solo 276 microwatts por kilogramo, menos que el calor metabólico producido por el cuerpo humano en reposo. El Sol genera su enorme luminosidad no por la eficiencia de la reacción, sino por su volumen descomunal: 1.3 millones de Tierras cabrían dentro de él.' },
    ],
    fact: 'Hans Bethe publicó su artículo sobre la producción de energía en las estrellas en la revista Physical Review en marzo de 1939, demostrando que el ciclo CNO era responsable de la energía de las estrellas masivas. Este trabajo se apoyó directamente en el descubrimiento de Cecilia Payne de que las estrellas son principalmente hidrógeno: sin saber que el combustible estelar era hidrógeno, no habría sido posible identificar la cadena de reacciones nucleares correcta. Bethe calculó que el Sol convierte 3.6 × 10³⁸ protones en helio cada segundo, un número que los astrofísicos modernos han confirmado con una precisión de menos del 1%.',
  },
  {
    id: 'gigantes-enanas',
    title: 'Gigantes Rojas y Enanas Blancas',
    color: '#6A9FD5',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_gigantes-enanas.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_gigantes-enanas.jpg',
    content: [
      'Cuando una estrella de masa baja o intermedia (entre 0.5 y 8 masas solares) agota el hidrógeno en su núcleo, el centro de la estrella se contrae porque la presión de radiación producida por la fusión ya no puede sostener el peso de las capas superiores. Esta contracción calienta una capa de hidrógeno que rodea al núcleo de helio inerte, iniciando la fusión de hidrógeno en una cáscara. La energía adicional hace que las capas externas de la estrella se expandan y se enfríen, y la estrella se convierte en una gigante roja con una superficie más fría (3,000-4,000 K) pero una luminosidad cientos de veces mayor.',
      'Cuando la temperatura del núcleo de helio alcanza aproximadamente 100 millones de Kelvin, se inicia la fusión del helio en carbono y oxígeno mediante el proceso triple-alfa, descrito por Edwin Salpeter en 1952 y completado por Fred Hoyle en 1954. En este proceso, tres núcleos de helio-4 (partículas alfa) se combinan para formar un núcleo de carbono-12. En estrellas de menos de 2.25 masas solares, la ignición del helio ocurre de forma repentina en un evento llamado destello de helio (helium flash), que libera una energía equivalente a la luminosidad total de la Vía Láctea durante unos pocos segundos, aunque la energía es absorbida internamente.',
      'Después de agotar el helio en el núcleo, las estrellas de masa intermedia entran en la rama asintótica de gigantes (AGB), donde alternan entre la fusión de hidrógeno y helio en capas concéntricas. Durante esta fase, la estrella experimenta pulsos térmicos — episodios periódicos de fusión intensa que hacen que la estrella se expanda y expulse material de sus capas externas. Estos pulsos fueron predichos teóricamente por Martin Schwarzschild y Richard Härm en 1965. El material expulsado forma una nebulosa planetaria, un caparazón de gas ionizado que brilla con colores característicos.',
      'Las nebulosas planetarias son objetos de vida corta a escala cósmica, durando solo entre 10,000 y 30,000 años antes de dispersarse en el medio interestelar. La Nebulosa del Anillo (M57) en la constelación de Lira, descubierta por Antoine Darquier de Pellepoix en 1779, es un ejemplo clásico: un anillo de gas ionizado con un radio de 0.4 años luz que se expande a 20-30 km/s alrededor de una enana blanca central con una temperatura superficial de 120,000 K. El telescopio James Webb reveló en 2022 detalles sin precedentes de su estructura, incluyendo capas concéntricas que registran los pulsos térmicos finales de la estrella moribunda.',
      'El residuo que queda en el centro de la nebulosa planetaria es una enana blanca — un objeto con una masa típica de 0.6 masas solares comprimida en un volumen similar al de la Tierra. La materia en su interior se encuentra en un estado llamado materia degenerada, donde los electrones están empaquetados tan densamente que la presión de degeneración electrónica (un efecto cuántico predicho por el principio de exclusión de Pauli) sostiene la estrella contra el colapso gravitatorio. En 1930, Subrahmanyan Chandrasekhar calculó que una enana blanca no puede exceder 1.44 masas solares — el límite de Chandrasekhar — porque la presión de degeneración no puede soportar más peso.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Sol se convertirá en una gigante roja dentro de unos 5,000 millones de años. Cuando eso ocurra, su radio se expandirá hasta engullir las órbitas de Mercurio y Venus, y posiblemente la de la Tierra. La temperatura superficial terrestre superará los 1,500 °C, los océanos se evaporarán completamente y la atmósfera será arrancada por el viento estelar. Eventualmente, el Sol expulsará sus capas externas formando una nebulosa planetaria y su núcleo quedará como una enana blanca del tamaño de la Tierra que se enfriará lentamente durante billones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Subrahmanyan Chandrasekhar tenía solo 19 años cuando calculó el límite que lleva su nombre durante un viaje en barco desde India a Inglaterra en 1930. Su resultado fue ridiculizado públicamente por Arthur Eddington, el astrofísico más prestigioso de la época, quien se negó a aceptar que las estrellas pudieran colapsar indefinidamente. Chandrasekhar tuvo que esperar 53 años hasta que le otorgaron el Premio Nobel de Física en 1983. El telescopio de rayos X Chandra de la NASA, lanzado en 1999, lleva su nombre.' },
    ],
    fact: 'Fred Hoyle predijo que el proceso triple-alfa solo podía funcionar si el carbono-12 tenía un estado energético excitado específico (un nivel de resonancia) a 7.65 MeV por encima del estado fundamental. Sin este nivel, la probabilidad de que tres núcleos de helio se combinaran sería demasiado baja para producir carbono en cantidades significativas. El nivel fue confirmado experimentalmente por William Fowler en 1953 en Caltech, exactamente donde Hoyle había predicho. Esta predicción es considerada uno de los triunfos más notables de la astrofísica nuclear y le valió a Fowler el Nobel de Física en 1983.',
  },
  {
    id: 'supernovas-neutrones',
    title: 'Supernovas y Estrellas de Neutrones',
    color: '#B4534A',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_supernovas-neutrones.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_supernovas-neutrones.jpg',
    content: [
      'Las estrellas con masas superiores a 8 masas solares no terminan su vida como enanas blancas sino en explosiones cataclísmicas llamadas supernovas de tipo II. Cuando una estrella masiva agota el silicio en su núcleo (el último combustible fusionable), queda un núcleo de hierro de aproximadamente 1.4 masas solares. El hierro-56 es el elemento con mayor energía de enlace nuclear por nucleón, lo que significa que su fusión no libera energía sino que la consume. Sin una fuente de energía que lo sostenga, el núcleo colapsa en menos de un segundo, pasando de un diámetro de 8,000 km a apenas 20 km.',
      'Durante el colapso, la materia alcanza densidades de 4 × 10¹⁴ gramos por centímetro cúbico — equivalente a comprimir toda la masa de la humanidad en un cubo de azúcar. Los protones y electrones se combinan formando neutrones mediante captura electrónica, y se emite una avalancha de neutrinos que transporta el 99% de la energía gravitatoria liberada (aproximadamente 3 × 10⁴⁶ julios). Las capas externas de la estrella, que caen sobre el núcleo colapsado, rebotan contra la superficie de neutrones y son expulsadas al espacio a velocidades de hasta 30,000 km/s, produciendo la explosión visible de la supernova.',
      'La supernova SN 1987A, observada el 23 de febrero de 1987 en la Gran Nube de Magallanes a 168,000 años luz de distancia, fue la supernova más cercana observada desde la invención del telescopio. Los detectores Kamiokande II en Japón e IMB en Ohio registraron 24 neutrinos provenientes de la explosión, confirmando la teoría de que el colapso del núcleo produce una emisión masiva de estas partículas. La estrella progenitora fue identificada como Sanduleak -69° 202, una supergigante azul de unas 20 masas solares. Fue la primera vez que se identificó la estrella que explotó.',
      'El residuo compacto de una supernova de tipo II es una estrella de neutrones, un objeto con una masa de 1.4 a 2.1 masas solares comprimida en una esfera de solo 10 a 12 km de radio. La densidad en el centro alcanza entre 5 y 10 veces la densidad nuclear. Muchas estrellas de neutrones giran a velocidades extremas y emiten haces de radiación desde sus polos magnéticos; cuando estos haces barren la Tierra como un faro, detectamos pulsos regulares de radio y las llamamos púlsares. Jocelyn Bell Burnell descubrió el primer púlsar (PSR B1919+21) en noviembre de 1967, con un período de 1.337 segundos.',
      'Los magnetares son un tipo de estrella de neutrones con campos magnéticos extraordinariamente intensos, del orden de 10¹⁴ a 10¹⁵ teslas — billones de veces más intensos que el campo magnético terrestre (50 microteslas). El magnetar SGR 1806-20 emitió el 27 de diciembre de 2004 un destello de rayos gamma que, en una décima de segundo, liberó más energía que la que el Sol emite en 250,000 años. Si este magnetar estuviera a 10 años luz de la Tierra (en lugar de los 50,000 años luz reales), el destello habría destruido la capa de ozono y causado una extinción masiva. Solo se conocen unos 30 magnetares en nuestra galaxia.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El púlsar del Cangrejo (PSR B0531+21), ubicado en la Nebulosa del Cangrejo, gira 30 veces por segundo y es el remanente de una supernova observada por astrónomos chinos y árabes en el año 1054 d.C. Fue tan brillante que era visible a plena luz del día durante 23 días. Los registros chinos la describen como una "estrella invitada" (客星, kèxīng). La Nebulosa del Cangrejo se expande actualmente a 1,500 km/s y su diámetro actual es de 11 años luz, alimentada por la energía rotacional del púlsar central.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El descubrimiento de Jocelyn Bell Burnell del primer púlsar generó una de las injusticias más conocidas de la ciencia moderna. El Premio Nobel de Física de 1974 fue otorgado a su supervisor Antony Hewish y a Martin Ryle, pero no a Bell Burnell, quien realizó la observación y la identificación del fenómeno. Bell Burnell ha dicho que no guarda resentimiento, señalando que en aquella época se consideraba que los estudiantes de doctorado trabajaban bajo la dirección de sus supervisores. La situación tiene un paralelo directo con la experiencia de Cecilia Payne.' },
    ],
    fact: 'Todas las supernovas de tipo II producen elementos más pesados que el hierro mediante un proceso llamado captura rápida de neutrones (proceso r), que ocurre en los pocos segundos de la explosión. Este proceso es responsable de la creación de aproximadamente la mitad de todos los elementos más pesados que el hierro, incluyendo oro, platino y uranio. Cada anillo de oro que existe en la Tierra fue forjado en los últimos instantes de vida de una estrella masiva que explotó como supernova hace más de 4,600 millones de años. El astrónomo Carl Sagan lo expresó con precisión: "Somos materia estelar que se contempla a sí misma."',
  },
  {
    id: 'agujeros-negros-estelares',
    title: 'Agujeros Negros Estelares',
    color: '#3A6FA5',
    btnImage: '/assets/cecilia_payne/infographic_m4/btn_agujeros-negros-estelares.jpg',
    image: '/assets/cecilia_payne/infographic_m4/hero_agujeros-negros-estelares.jpg',
    content: [
      'Cuando una estrella con una masa inicial superior a aproximadamente 25 masas solares explota como supernova, el núcleo remanente puede exceder las 2-3 masas solares, superando el límite de Tolman-Oppenheimer-Volkoff (el máximo para una estrella de neutrones). En este caso, ninguna fuerza conocida puede detener el colapso gravitatorio y se forma un agujero negro estelar. La materia se comprime hasta una densidad teóricamente infinita en un punto llamado singularidad, rodeado por una frontera esférica denominada horizonte de eventos, cuyo radio fue calculado por Karl Schwarzschild en 1916 como r = 2GM/c².',
      'Para un agujero negro de 10 masas solares, el radio de Schwarzschild es de solo 29.5 kilómetros. Todo lo que cruza el horizonte de eventos — materia, luz, información — queda atrapado permanentemente y no puede escapar. Sin embargo, un agujero negro no es una "aspiradora cósmica": solo atrae gravitatoriamente al material que se acerca lo suficiente. Si el Sol fuera reemplazado por un agujero negro de la misma masa, la Tierra continuaría orbitando con normalidad; simplemente estaría a oscuras y congelada, pero su órbita no cambiaría porque la masa gravitatoria sería la misma.',
      'Cygnus X-1, ubicado a unos 6,070 años luz de la Tierra en la constelación del Cisne, fue el primer candidato a agujero negro estelar confirmado. Descubierto como fuente de rayos X en 1964 durante un vuelo de cohete suborbital, Cygnus X-1 tiene una masa estimada de 21.2 masas solares según mediciones publicadas en 2021 por el equipo de James Miller-Jones usando el Very Long Baseline Array. El agujero negro orbita una supergigante azul llamada HDE 226868, de la cual arranca material que forma un disco de acreción que se calienta a millones de grados y emite rayos X intensos antes de cruzar el horizonte de eventos.',
      'El 14 de septiembre de 2015, los detectores LIGO (Laser Interferometer Gravitational-Wave Observatory) en Hanford, Washington, y Livingston, Luisiana, detectaron por primera vez ondas gravitacionales — ondulaciones en el tejido del espacio-tiempo predichas por Einstein en 1916. La señal, designada GW150914, provenía de la fusión de dos agujeros negros de 36 y 29 masas solares a 1,300 millones de años luz de distancia, que se fusionaron formando un agujero negro de 62 masas solares. Las 3 masas solares faltantes se convirtieron en energía de ondas gravitacionales. Los fundadores de LIGO, Rainer Weiss, Kip Thorne y Barry Barish, recibieron el Nobel de Física en 2017.',
      'En abril de 2019, el Event Horizon Telescope (EHT) — una red de ocho radiotelescopios distribuidos por todo el planeta, funcionando como un telescopio virtual del tamaño de la Tierra — capturó la primera imagen directa de un agujero negro: M87*, el agujero negro supermasivo en el centro de la galaxia Messier 87, con una masa de 6,500 millones de masas solares. Aunque M87* no es un agujero negro estelar sino supermasivo, la imagen confirmó visualmente las predicciones de la relatividad general sobre la forma de la "sombra" del agujero negro y el anillo brillante de material acretado. En mayo de 2022, el EHT publicó la imagen de Sagittarius A*, el agujero negro supermasivo de nuestra propia Vía Láctea, con 4 millones de masas solares.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Stephen Hawking apostó con Kip Thorne en 1974 sobre si Cygnus X-1 era un agujero negro. Hawking apostó en contra, argumentando que si los agujeros negros no existían, al menos tendría el consuelo de ganar la apuesta. En 1990, Hawking concedió la apuesta cuando la evidencia se volvió abrumadora. El premio para Thorne fue una suscripción de un año a la revista Penthouse. Hawking firmó la concesión con su huella digital, ya que su enfermedad le impedía escribir.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ondas gravitacionales detectadas en el evento GW150914 produjeron un desplazamiento en los brazos de 4 km de los detectores LIGO de apenas 10⁻¹⁸ metros — una milésima del diámetro de un protón. Para alcanzar esta sensibilidad, los láseres de LIGO recorren los brazos 280 veces (recorrido efectivo de 1,120 km) y el sistema está aislado de vibraciones sísmicas, térmicas y acústicas con una precisión que lo convierte en el instrumento de medición más sensible jamás construido por la humanidad.' },
    ],
    fact: 'La conexión entre Cecilia Payne y los agujeros negros es profunda: todo el ciclo de evolución estelar — desde la fusión de hidrógeno que ella identificó como combustible fundamental, pasando por la creación de elementos pesados, hasta el colapso final en agujeros negros — depende de la composición química que Payne determinó en 1925. Sin saber que las estrellas son 73% hidrógeno, los modelos de estructura y evolución estelar no habrían podido predecir correctamente la formación de agujeros negros ni la producción de los elementos que componen planetas rocosos y seres vivos. El legado de Cecilia Payne sustenta toda la astrofísica moderna.',
  },
];

// ——— Stellar Particle Field (Canvas Background) ——————————————————————————
function StellarField() {
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
      hue: Math.random() > 0.5 ? '74,127,181' : '212,115,106', // stellar blue or warm rose
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

// ——— Stellar Evolution Header ————————————————————————————————————————————
function StellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(74,127,181,0.3))' }}>
        {/* Stellar arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#stellarGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 stellar markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4A7FB5','#D4736A','#5A8FC5','#C46358','#6A9FD5','#B4534A','#3A6FA5'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4A7FB5" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="6" fill="#4A7FB5" opacity="0.3" />
        <circle cx="300" cy="30" r="3" fill="#4A7FB5" opacity="0.5" />
        {/* Star rays */}
        {[0, 60, 120, 180, 240, 300].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1={300 + 10 * Math.cos(rad)} y1={30 + 10 * Math.sin(rad)} x2={300 + 16 * Math.cos(rad)} y2={30 + 16 * Math.sin(rad)} stroke="#4A7FB5" strokeWidth="1" opacity="0.4" strokeLinecap="round" />;
        })}
        <defs>
          <linearGradient id="stellarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(74,127,181,0.2)" />
            <stop offset="50%" stopColor="rgba(74,127,181,0.9)" />
            <stop offset="100%" stopColor="rgba(74,127,181,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4A7FB5" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIDA ESTELAR</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(74,127,181,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">COMPOSICIÓN Y EVOLUCIÓN DE LAS ESTRELLAS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(74,127,181,0.2)'}`,
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
          layoutId="activeDotCeciliaM4"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Video Player (conditional) ——— */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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

// ——— Progress Bar ————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(74,127,181,0.15)',
    }}>
      <Star size={14} style={{ color: '#4A7FB5', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4A7FB5, #D4736A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(74,127,181,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4A7FB5', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————————
export default function InteractiveInfographic_CeciliaM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/cecilia/cecilia_m4.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(74,127,181,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StellarField />

      <StellarHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(74,127,181,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(74,127,181,0.08)', borderRadius: '16px',
              border: '1px solid rgba(74,127,181,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4A7FB5', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has completado el ciclo de vida de las estrellas!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrofísica Estelar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
