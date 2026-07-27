'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Star Wars Themed)
   ========================================================================= */

const DecoHyperspace = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <line x1="2" y1="12" x2="10" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    <line x1="14" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    <line x1="4" y1="6" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <line x1="8" y1="18" x2="20" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const DecoBlackHole = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="4" fill={color} opacity="0.9"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" stroke={color} strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

const DecoCompass = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill={color} opacity="0.8"/>
  </svg>
);

const DecoWavefront = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <path d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

const DecoRuler = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="2" y="10" width="20" height="4" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="6" y1="10" x2="6" y2="12" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="10" y1="10" x2="10" y2="14" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="14" y1="10" x2="14" y2="12" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <line x1="18" y1="10" x2="18" y2="14" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoLightBeam = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 22L4 4L20 4L12 22Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    <line x1="12" y1="4" x2="12" y2="22" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2"/>
  </svg>
);

const DecoShip = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2L4 20L12 16L20 20L12 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8"/>
    <path d="M12 16L12 2" stroke={color} strokeWidth="2" opacity="0.5"/>
  </svg>
);

const DecoStar = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill={color} opacity="0.8"/>
  </svg>
);

const DecoTelescope = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="4" y="8" width="16" height="8" rx="2" transform="rotate(-30 12 12)" stroke={color} strokeWidth="2" opacity="0.8"/>
    <path d="M8 18L5 22" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M16 18L19 22" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    <path d="M12 16L12 22" stroke={color} strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
  </svg>
);

const DECO_MAP = {
  'parsec-definicion': [DecoRuler, DecoCompass, DecoShip],
  'paralaje-estelar': [DecoLightBeam, DecoStar, DecoTelescope],
  'escalera-distancias': [DecoRuler, DecoStar, DecoLightBeam],
  'velocidad-luz': [DecoHyperspace, DecoWavefront, DecoStar],
  'warp-drive': [DecoWavefront, DecoShip, DecoHyperspace],
  'agujeros-negros': [DecoBlackHole, DecoWavefront, DecoStar],
  'navegacion-estelar': [DecoCompass, DecoShip, DecoStar],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Einstein, A. (1905). 'Zur Elektrodynamik bewegter Körper', Annalen der Physik, 17",
  "Bessel, F. W. (1838). 'Bestimmung der Entfernung des 61sten Sterns des Schwans', Astronomische Nachrichten, 16",
  "Leavitt, H. S. & Pickering, E. C. (1912). 'Periods of 25 Variable Stars in the Small Magellanic Cloud', Harvard College Observatory Circular, 173",
  "Alcubierre, M. (1994). 'The warp drive: hyper-fast travel within general relativity', Classical and Quantum Gravity, 11",
  "Event Horizon Telescope Collaboration (2019). 'First M87 Event Horizon Telescope Results I', The Astrophysical Journal Letters, 875",
  "Gaia Collaboration (2022). 'Gaia Data Release 3', Astronomy & Astrophysics, 674"
];

const FALCON_GALLERY = [
  { src: '/assets/starwars/infographic_kessel/falcon_hyperspace.png', caption: 'El Halcón Milenario saltando al hiperespacio' },
  { src: '/assets/starwars/infographic_kessel/falcon_kessel_run.png', caption: 'Navegando entre agujeros negros en el Corredor de Kessel' },
  { src: '/assets/starwars/infographic_kessel/falcon_cockpit_stars.png', caption: 'Vista desde la cabina hacia las estrellas infinitas' },
  { src: '/assets/starwars/infographic_kessel/falcon_asteroid_field.png', caption: 'Esquivando asteroides a velocidad imposible' },
  { src: '/assets/starwars/infographic_kessel/falcon_orbit_planet.png', caption: 'Orbitando un mundo desconocido con dos soles' },
];

const INFOGRAPHIC_NODES = [
  {
    id: 'parsec-definicion',
    title: '¿Qué es un Parsec?',
    color: '#00CFFF',
    btnImage: '/assets/starwars/infographic_kessel/btn_parsec.png',
    image: '/assets/starwars/infographic_kessel/hero_parsec.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_parsec.png',
    bannerCaption: 'El Halcón Milenario navegando el temible Corredor de Kessel acortando distancias.',
    content: [
      "¿Te imaginas presumir de ser el corredor más rápido en una pista, pero en lugar de decir que terminaste en diez segundos, dices que la corriste en cien metros? Esto es exactamente lo que hace Han Solo en la primera película de Star Wars cuando afirma que su nave, el Halcón Milenario, completó el famoso Corredor de Kessel en menos de doce parsecs. Durante mucho tiempo los fans pensaron que era un error garrafal, porque un parsec es una unidad de distancia astronómica, no de tiempo. Es como si dijeras que llegaste a tu escuela en cinco kilómetros en lugar de decir que llegaste en quince minutos. ¡Pero en el espacio profundo, medir distancias es la clave!",
      "Un parsec, que significa 'paralaje de un segundo de arco', es una unidad fundamental que usan los astrónomos reales todos los días. Equivale exactamente a 3.26 años luz, lo que se traduce en la abrumadora e incomprensible cifra de 30.9 billones de kilómetros. Cuando los científicos hablan sobre la lejanía entre diferentes estrellas en nuestra galaxia, casi nunca usan los kilómetros porque los números serían demasiado grandes y engorrosos de escribir. En su lugar, el parsec les proporciona una medida mucho más manejable para cartografiar el inmenso universo. Por ejemplo, la estrella más cercana a nuestro Sistema Solar, Próxima Centauri, se encuentra a tan solo 1.3 parsecs de distancia.",
      "Para entender cómo funciona realmente un parsec, debemos pensar en la geometría del Sistema Solar. Se define utilizando el radio de la órbita de la Tierra alrededor del Sol como línea de base. Si pudieras viajar muy lejos en el espacio y mirar hacia atrás hacia nuestro Sistema Solar, verías que la distancia entre la Tierra y el Sol se hace cada vez más pequeña visualmente. La distancia exacta en la que esa separación entre la Tierra y el Sol parece medir apenas un 'segundo de arco' (una diminuta fracción de un grado) es exactamente lo que definimos como un parsec. Es un concepto matemático hermoso que conecta nuestra pequeña órbita terrestre con el vasto océano cósmico.",
      "Entonces, ¿cómo arregló George Lucas el aparente error de Han Solo en las películas posteriores? La respuesta fue ingeniosa e introdujo nueva física fascinante. Resulta que el Corredor de Kessel es una ruta hiperespacial traicionera llena de agujeros negros y peligros cósmicos llamada 'Las Fauces'. La ruta estándar era segura y larga. Lo que Han Solo hizo no fue volar más rápido en términos de velocidad, sino volar de manera mucho más peligrosa, rozando los pozos gravitatorios letales de los agujeros negros para acortar la trayectoria física. Al tomar atajos extremadamente arriesgados que destruirían cualquier otra nave, logró reducir la distancia total del viaje a menos de doce parsecs.",
      "Esta explicación tiene mucho sentido científico cuando consideramos cómo la gravedad extrema distorsiona verdaderamente el tejido del espacio y el tiempo. En nuestro universo real, la gravedad no solo atrae las cosas, sino que curva las rutas que la luz y las naves espaciales deben seguir. Acortar distancias navegando inteligentemente cerca de masas masivas es algo que nuestras propias sondas espaciales hacen al aprovechar la 'asistencia gravitatoria' de planetas como Júpiter. Así, el alarde de Han Solo se transformó de un posible error de guión a una fascinante demostración de navegación astrofísica avanzada, demostrando que en el universo, la ruta más corta no siempre es una línea recta."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En la película Solo: Una Historia de Star Wars (2018), finalmente pudimos presenciar exactamente cómo el joven Han Solo completó la legendaria hazaña del Corredor de Kessel. Utilizando el Halcón Milenario y la pericia de navegación de un droide conectado a la nave, Han se desvió intencionalmente de la ruta comercial segura. Al acercarse peligrosamente a un agujero negro supermasivo conocido como "El Sumidero", logró trazar un camino mucho más corto y directo, justificando así para siempre el uso de parsecs como medida de distancia en lugar de tiempo.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El término "parsec" fue acuñado por primera vez en el año 1913 por el astrónomo británico Herbert Hall Turner. Resultó ser una invención lingüística brillante y práctica, combinando las primeras sílabas de las palabras "paralaje" y "segundo". Aunque el público general está mucho más familiarizado con el concepto de "años luz" gracias a la ciencia ficción y la divulgación popular, el parsec sigue siendo la unidad estándar y preferida de medida en todos los artículos de investigación astrofísica profesional en la actualidad.' 
      }
    ],
    fact: 'Un parsec equivale a 3.26 años luz o aproximadamente 30.9 billones de kilómetros. Se define como la distancia a la cual el radio medio de la órbita terrestre subtiende un ángulo de un segundo de arco. Esta medida, basada fundamentalmente en la trigonometría de nuestro propio Sistema Solar, es la unidad de distancia más utilizada por los astrónomos profesionales para mapear el universo a gran escala.'
  },
  {
    id: 'paralaje-estelar',
    title: 'El Truco del Paralaje',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_kessel/btn_paralaje.png',
    image: '/assets/starwars/infographic_kessel/hero_paralaje.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_paralaje.png',
    bannerCaption: 'La Tierra en su órbita ofrece dos perspectivas distintas para medir distancias.',
    content: [
      "Si alguna vez quieres sentirte como un verdadero astrónomo desde el sofá de tu casa, intenta este sencillo experimento: levanta un dedo frente a tu cara y cierra un ojo, luego ábrelo y cierra el otro. Notarás que tu dedo parece saltar de un lado a otro en relación con el fondo de la habitación. Este efecto óptico fascinante se conoce como 'paralaje'. Tu cerebro utiliza constantemente esta ligera diferencia de perspectiva entre tus dos ojos para calcular a qué distancia se encuentran las cosas y darte la percepción de profundidad tridimensional en tu vida diaria.",
      "Los astrónomos usan exactamente este mismo truco para medir las inmensas distancias a las estrellas cercanas, pero en lugar de usar dos ojos separados por unos pocos centímetros, usan el planeta Tierra entero. Al estar nuestro planeta en constante movimiento alrededor del Sol, podemos tomar una fotografía del cielo estrellado hoy y esperar exactamente seis meses para tomar otra. En ese medio año, la Tierra se ha movido al lado opuesto de su órbita, proporcionando a los científicos una 'distancia entre los ojos' gigantesca de unos 300 millones de kilómetros. ¡Es el parpadeo cósmico definitivo!",
      "Friedrich Bessel fue el brillante pionero que logró medir la primera paralaje estelar exitosa de la historia en el año 1838. Eligió una estrella llamada 61 Cygni porque sabía que se movía inusualmente rápido en el cielo, lo que sugería que estaba relativamente cerca de nosotros. El cambio de posición de la estrella que Bessel logró medir fue increíblemente diminuto, menos de un segundo de arco, pero fue suficiente para calcular por fin, por primera vez en toda la historia de la humanidad, la verdadera y asombrosa distancia entre nuestro Sistema Solar y otra estrella vecina en la galaxia.",
      "Para entender lo difícil que es medir el paralaje estelar, imagina el nivel de precisión astronómica requerida. El ángulo que los astrónomos intentan detectar es a menudo equivalente a intentar medir el ancho de una pequeña moneda situada en la superficie de la Luna, observándola directamente desde la Tierra. Durante muchas décadas, este método estuvo severamente limitado por las turbulencias de nuestra propia atmósfera terrestre, que difuminaba la luz de las estrellas y hacía que medir ángulos tan microscópicos fuera una tarea casi titánica y repleta de incertidumbres observacionales.",
      "Todo esto cambió radicalmente con la llegada de las misiones espaciales. La Agencia Espacial Europea (ESA) lanzó el satélite Hipparcos en 1989 y posteriormente el revolucionario observatorio Gaia en 2013. Libre de las distorsiones de la atmósfera terrestre, Gaia ha logrado medir con una precisión asombrosa las posiciones, distancias y movimientos de casi dos mil millones de estrellas en nuestra Vía Láctea. Este mapa estelar tridimensional sin precedentes es lo más parecido que tenemos en la vida real a las avanzadas computadoras de navegación hiperespacial que utilizan las formidables naves del universo de Star Wars."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el universo de Star Wars, calcular rutas hiperespaciales es extremadamente complejo y requiere computadoras de navegación avanzadas ("navicomputers"). Si una nave salta al hiperespacio sin calcular correctamente las posiciones estelares y el paralaje de los objetos astronómicos, corre el riesgo de estrellarse directamente contra una estrella, un asteroide o rebotar demasiado cerca del pozo gravitatorio de una supernova masiva, un destino catastrófico que Han Solo describe vívidamente a Luke Skywalker para explicar por qué no pueden simplemente escapar de Tatooine de manera inmediata.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'La sonda espacial New Horizons de la NASA, tras su histórico y emocionante sobrevuelo de Plutón, viajó tan lejos en los confines oscuros y helados del Sistema Solar que logró capturar el primer paralaje interestelar verdaderamente visible a simple vista. En el año 2020, desde una asombrosa distancia de más de 7 mil millones de kilómetros de la Tierra, la sonda tomó fotografías precisas de las estrellas Próxima Centauri y Wolf 359, las cuales se veían claramente en posiciones distintas y desplazadas en comparación a las que observamos normalmente desde nuestro cálido planeta azul.' 
      }
    ],
    fact: 'Friedrich Bessel midió la primera paralaje estelar de la historia en 1838 para la estrella 61 Cygni. En la actualidad, el telescopio espacial Gaia de la Agencia Espacial Europea ha cartografiado detalladamente casi dos mil millones de estrellas con una impresionante precisión de microsegundos de arco, creando sin lugar a dudas el mapa tridimensional más detallado, profundo y extenso de nuestra galaxia jamás concebido por la mente humana.'
  },
  {
    id: 'escalera-distancias',
    title: 'La Escalera Cósmica',
    color: '#AB47BC',
    btnImage: '/assets/starwars/infographic_kessel/btn_escalera.png',
    image: '/assets/starwars/infographic_kessel/hero_escalera.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_escalera.png',
    bannerCaption: 'Cada peldaño de la escalera cósmica nos permite medir distancias cada vez más inmensas.',
    content: [
      "¿Cómo medirías la distancia a una ciudad lejana si no tuvieras un mapa ni un odómetro en tu auto? En la Tierra es relativamente fácil usar reglas o lásers, pero en el espacio profundo, los astrónomos no tienen una cinta métrica infinita. Una vez que las estrellas están demasiado lejos, el truco del paralaje estelar deja de funcionar porque el salto visual es tan microscópico que nuestros instrumentos no pueden detectarlo. Es aquí donde la ingeniosidad humana tuvo que construir lo que hoy conocemos cariñosamente como la 'Escalera de Distancias Cósmicas', un método paso a paso para medir el inabarcable universo.",
      "El primer gran peldaño de esta escalera se construyó gracias a la brillante astrónoma Henrietta Swan Leavitt en el año 1912. Ella estaba analizando montones de placas fotográficas y descubrió un tipo especial de estrellas latientes llamadas 'Cefeidas'. Henrietta notó un patrón asombrosamente rítmico y hermoso: cuanto más brillante era intrínsecamente la estrella, más tiempo tardaba en parpadear o latir. Este descubrimiento cambió la historia, porque al medir simplemente el tiempo que tardaba en pulsar una estrella lejana, los astrónomos ahora podían saber exactamente cuánta luz emitía de verdad.",
      "Piensa en las Cefeidas como si fueran faros en una costa oscura, conocidos como 'candelas estándar'. Si sabes que todas las bombillas de 100 vatios tienen un brillo específico, y ves una a lo lejos que parece muy tenue, puedes calcular con gran exactitud a qué distancia debe estar para verse tan débil. La regla de Henrietta Leavitt permitió a gigantes de la astronomía como Edwin Hubble medir por primera vez la distancia a la galaxia de Andrómeda, demostrando con asombro que el universo era muchísimo más grande y vasto de lo que cualquiera había atrevido a soñar en aquel momento.",
      "Pero la escalera no se detiene ahí. Para medir distancias aún más colosales, más allá de donde podemos distinguir estrellas individuales brillantes, los astrofísicos utilizan el segundo peldaño: las explosiones estelares masivas llamadas supernovas de Tipo Ia. Estas explosiones cataclísmicas ocurren cuando una pequeña pero densa estrella enana blanca devora demasiado material de una estrella compañera cercana hasta llegar a un límite de masa crítico y explotar. Debido a que siempre explotan al alcanzar exactamente la misma cantidad de masa, el estallido siempre tiene una luminosidad máxima idéntica, sirviendo como una bombilla de proporciones galácticas.",
      "Cada nuevo escalón de nuestra escalera cósmica depende crucialmente del peldaño anterior para ser calibrado y confirmado. Medimos las Cefeidas cercanas usando el confiable método de paralaje, y luego utilizamos esas Cefeidas ya medidas para calibrar a qué distancia exacta se encuentran las poderosas supernovas, lo que nos permite explorar los confines del universo observable. Esta cadena ininterrumpida de descubrimientos astronómicos es lo que nos permite trazar con confianza los abismos del cosmos, desde nuestro humilde vecindario estelar hasta las galaxias más lejanas y antiguas concebibles."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el universo expandido de Star Wars, los exploradores hiperespaciales y los audaces cartógrafos estelares tenían que descubrir y documentar gradualmente las rutas seguras de la inmensa galaxia a través del tiempo, trazando saltos hiperespaciales apoyados en faros de navegación cósmica (nav beacons) y mapeando meticulosamente los distintos sectores. Así como nosotros construimos la escalera de distancias cósmicas peldaño a peldaño, la antigua civilización galáctica tuvo que expandirse lentamente de sistema en sistema utilizando balizas para no perderse en la vastedad insondable del hiperespacio.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'A pesar de ser una de las mentes más brillantes de su generación y haber descubierto la crucial ley de las variables Cefeidas que permitió a la humanidad medir el universo a gran escala, Henrietta Swan Leavitt no recibió el reconocimiento formal ni el salario que verdaderamente merecía durante su vida en el Observatorio de Harvard. Años más tarde, cuando un colega intentó finalmente nominarla para el prestigioso Premio Nobel de Física por su revolucionaria labor, descubrió con tristeza que ella había fallecido varios años antes, impidiéndole recibir el merecido honor.' 
      }
    ],
    fact: 'Henrietta Swan Leavitt descubrió en 1912 la relación período-luminosidad de las estrellas variables Cefeidas, un avance monumental que sentó las bases para medir distancias intergalácticas extremas. Este descubrimiento fundamental fue la clave indispensable que permitió a Edwin Hubble en la década de 1920 demostrar fehacientemente que el universo se está expandiendo y que existen innumerables galaxias gigantescas mucho más allá de las tenues fronteras de nuestra Vía Láctea.'
  },
  {
    id: 'velocidad-luz',
    title: 'Nada Supera a la Luz',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_kessel/btn_velocidad.png',
    image: '/assets/starwars/infographic_kessel/hero_velocidad.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_velocidad.png',
    bannerCaption: 'La luz viaja a 300,000 km/s — el límite absoluto del cosmos.',
    content: [
      "Si existiera una policía de tránsito en el cosmos, tendría un trabajo muy sencillo, porque en nuestro universo solo existe un único y estricto límite de velocidad que nadie puede romper: la velocidad de la luz. Conocida por la famosa letra 'c', la luz viaja en el vacío a la asombrosa e incomprensible rapidez de casi 300,000 kilómetros por cada segundo que pasa. A esta vertiginosa velocidad, un rayo de luz podría dar la vuelta a la Tierra entera siete veces y media en un solo segundo, o viajar desde la superficie de nuestra Luna hasta nuestros ojos en poco más de un segundo.",
      "Pero, ¿por qué nada puede ir más rápido que la luz? La culpa de esta prohibición cósmica la tiene un genio llamado Albert Einstein y su famosa teoría de la Relatividad Especial, publicada en 1905. Einstein descubrió que a medida que un objeto con masa, como una nave espacial o una persona, se mueve más y más rápido acelerando por el espacio, la energía que se requiere para empujarlo y aumentar aún más su velocidad crece exponencialmente. Para que algo sólido lograra alcanzar la velocidad exacta de la luz, requeriría una cantidad infinita de energía, lo cual es físicamente imposible en nuestra realidad.",
      "Este límite de velocidad impone una condición fascinante en la astronomía: cuando miramos al cielo nocturno profundo, en realidad estamos mirando hacia el pasado distante. Porque la luz de las estrellas necesita tiempo para cruzar las inmensas distancias, siempre vemos los objetos cósmicos tal como eran cuando la luz salió de ellos. Cuando observas el sol en un día brillante, no estás viendo el sol en este mismo instante, sino el sol tal como era hace ocho agotadores minutos, que es el tiempo que tardan sus fotones en viajar por el vasto vacío espacial hasta alcanzar la superficie de nuestro planeta.",
      "Telescopios modernos increíblemente poderosos, como el Telescopio Espacial James Webb (JWST), son esencialmente inmensas y sofisticadas máquinas del tiempo. Pueden observar el débil resplandor de galaxias antiguas que se formaron hace más de trece mil millones de años, apenas poco tiempo después del mismísimo Big Bang que dio origen a todo lo que existe. La luz de estas primitivas galaxias ha estado viajando a través de la enorme expansión del universo durante miles de millones de años ininterrumpidos antes de chocar finalmente con los espejos dorados de nuestros telescopios en órbita terrestre.",
      "Otro fenómeno asombroso causado por la inmensidad del universo y la velocidad finita de la luz es el 'corrimiento al rojo'. A medida que el propio tejido del espacio se estira y el universo continúa expandiéndose rápidamente, las ondas de luz que viajan a través de él también se estiran implacablemente. Como si fuera una liga elástica que se tensa, la luz originalmente azul se estira hasta volverse roja o incluso transformarse en radiación infrarroja invisible. Por esta profunda y fascinante razón, los telescopios más modernos que buscan las galaxias más distantes deben estar equipados con cámaras térmicas especializadas en detectar luz infrarroja altamente estirada."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el rico y expansivo universo de Star Wars, los ingenieros espaciales lograron evadir magistralmente el estricto e inquebrantable límite de velocidad de la luz mediante el ingenioso uso del "hiperimpulsor". En lugar de tratar de acelerar inútilmente a través del espacio normal en un viaje que tomaría miles de años, el hiperimpulsor permite a la nave dar un asombroso salto hacia una dimensión paralela conocida como el hiperespacio, un atajo cósmico donde las rígidas leyes convencionales de la física relativista y las distancias tradicionales del universo no aplican de la misma manera limitante.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La Teoría de la Relatividad Especial de Albert Einstein (1905) estableció para siempre de manera concluyente que la velocidad de la luz en el inmenso vacío (c = 299,792.458 kilómetros por segundo) es absolutamente la velocidad máxima e insuperable a la que cualquier tipo de materia convencional, energía cuantificable o señal de información puede viajar lógicamente a través de la vasta extensión del espacio cósmico, dictando así la inquebrantable estructura de causalidad en nuestra misteriosa y maravillosa realidad física.' 
      }
    ],
    fact: 'El límite absoluto de velocidad cósmica c (la velocidad de la luz) es de casi 300,000 kilómetros por segundo, lo suficientemente veloz para darle siete vueltas completas a nuestro planeta Tierra en un solo segundo. Al mirar el firmamento estrellado, vemos inevitablemente hacia el pasado: la luz de la galaxia de Andrómeda que percibimos en este momento tardó la asombrosa cantidad de 2.5 millones de largos años en alcanzarnos.'
  },
  {
    id: 'warp-drive',
    title: 'El Motor de Curvatura',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_kessel/btn_warp.png',
    image: '/assets/starwars/infographic_kessel/hero_warp.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_warp.png',
    bannerCaption: 'Del concepto de Alcubierre a los solitones de Lentz: la evolución del motor de curvatura.',
    content: [
      "¿Es realmente imposible viajar más rápido que la luz sin romper las leyes estrictas de la física fundamental? Sorprendentemente, un brillante y atrevido físico teórico mexicano llamado Miguel Alcubierre propuso una idea revolucionaria en el año 1994 que dejó boquiabiertos a muchos científicos. Inspirado por la icónica ciencia ficción de Star Trek, desarrolló una asombrosa solución matemática basada en las mismísimas ecuaciones de la relatividad de Einstein, un concepto teórico que hoy en día todo el mundo conoce como el famoso e intrigante 'Motor de Curvatura' o 'Warp Drive'.",
      "El concepto ingenioso de Alcubierre es el siguiente: la nave en sí misma no se mueve más rápido que la luz a través de su espacio inmediato, algo que Einstein prohibió estrictamente. En lugar de eso, la nave se encapsula de forma segura dentro de una 'burbuja de curvatura' o burbuja de espacio-tiempo. El motor hipotético comprime o encoge rápidamente el espacio situado justo delante de la nave y expande velozmente el espacio ubicado justo detrás de ella. Al hacer esto, la nave simplemente surfea dócilmente en una ola del propio tejido espaciotemporal, deslizándose de forma majestuosa.",
      "Para imaginarlo de una manera mucho más cotidiana y fácil de entender, piensa en ti mismo de pie en una cinta transportadora mecánica, como las que hay en los aeropuertos. Tú no estás corriendo velozmente ni rompiendo el récord mundial de cien metros lisos; en realidad estás totalmente quieto sobre la goma de la cinta. Es la misma cinta (el tejido mismo del espacio-tiempo) la que se está moviendo a tu alrededor y transportándote de manera eficiente. De esta forma astuta, el universo permite que la burbuja de curvatura avance por el cosmos a velocidades infinitamente superiores a la luz.",
      "Por supuesto, esta idea tan maravillosamente exótica tenía originalmente un defecto colosal. Para poder encoger y expandir el espacio de la manera necesaria, las ecuaciones matemáticas originales requerían la existencia de 'energía negativa' o materia exótica con masa negativa, algo que hasta el día de hoy nunca hemos visto ni comprobado que exista en la naturaleza. Además, la cantidad absurda de energía requerida superaba con creces toda la energía presente en el mismísimo universo observable, haciendo que el prometedor motor Warp pareciera una imposibilidad pura para la eternidad.",
      "Sin embargo, la incesante investigación científica no se ha detenido nunca. Recientemente, en el año 2021, un astrofísico llamado Erik Lentz publicó unas ecuaciones mucho más optimistas demostrando que los motores de curvatura basados puramente en la geometría de los solitones (ondas autosuficientes estables) podrían llegar a construirse operando únicamente con fuentes convencionales de energía positiva. Y aunque todavía requeriría la inmensa cantidad de energía de cientos de veces la masa del planeta Júpiter convertida en energía pura, significa que viajar a las estrellas podría ser finalmente posible."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Cuando el intrépido y legendario Halcón Milenario da el famoso y vertiginoso salto hiperespacial, las estrellas visibles a través de su amplia cabina de mando se alargan formando espectaculares estrías brillantes de pura luz blanca (starlines). Esta inolvidable y emocionante representación visual cinematográfica captura perfectamente de forma artística cómo se percibiría y sentiría ser encapsulado mágicamente en un túnel dimensional distorsionado y ser lanzado brutalmente a viajar por el cosmos a velocidades inalcanzables rompiendo los límites de la física convencional conocida.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'La prestigiosa agencia espacial NASA financió durante mucho tiempo un interesante y discreto programa de física propulsora altamente experimental y revolucionario dirigido por el destacado científico Harold White en el Centro Espacial Johnson en Houston. El equipo del Dr. White intentó crear pequeñísimas e imperceptibles burbujas de curvatura microscópicas (warps) utilizando un complejo y delicado instrumento láser de interferometría muy avanzado, probando la fascinante hipótesis de que el tejido del espacio mismo realmente puede llegar a deformarse artificialmente en los modernos laboratorios.' 
      }
    ],
    fact: 'El físico mexicano Miguel Alcubierre demostró magistralmente en 1994 que un verdadero viaje a velocidades aparentemente superlumínicas es teóricamente y matemáticamente posible deformando y retorciendo el tejido del espacio-tiempo (el Motor Warp). En el año 2021, el investigador Erik Lentz propuso de manera brillante una nueva solución para lograr motores de curvatura estables de geometría hiperbólica que asombrosamente no requieren el uso de la imposible energía negativa, reavivando grandemente las serias esperanzas científicas de lograr algún día lejanos viajes interestelares humanos.'
  },
  {
    id: 'agujeros-negros',
    title: 'El Sumidero de Kessel',
    color: '#EF5350',
    btnImage: '/assets/starwars/infographic_kessel/btn_agujeros.png',
    image: '/assets/starwars/infographic_kessel/hero_agujeros.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_agujeros.png',
    bannerCaption: 'Los agujeros negros retuercen tanto la gravedad que ni siquiera la luz puede escapar de su interior.',
    content: [
      "En la apasionante leyenda y mitología del famoso Corredor de Kessel, la zona más letal y terrorífica se conoce coloquialmente como 'Las Fauces', un espeluznante cúmulo densamente poblado por colosales agujeros negros. Estos monstruosos pozos gravitatorios no son en absoluto una simple fantasía o un recurso barato de ciencia ficción cinematográfica. En nuestro impredecible y maravilloso universo real, los agujeros negros son posiblemente los objetos más fascinantes, destructivos y asombrosamente misteriosos que existen en toda la inmensa extensión del gélido cosmos inexplorado.",
      "Un agujero negro se forma típicamente cuando una estrella súper masiva, al menos unas veinte veces más pesada que nuestro propio modesto Sol, agota por completo todo su combustible de fusión nuclear y muere exhausta. Al detenerse bruscamente la reacción que generaba su energía hacia afuera, no hay nada que soporte el abrumador peso de la estrella, y la poderosa gravedad aplasta su enorme núcleo violentamente hacia adentro. Todo el material gigantesco se comprime incesantemente hasta quedar atrapado en un minúsculo e infinitamente denso punto geométrico que los astrofísicos llaman la 'singularidad'.",
      "La atracción gravitatoria de estos colapsos espectaculares es tan asombrosamente colosal e intensa que domina absolutamente su vecindario espacial cercano. Hay una temida y definitiva frontera o límite invisible alrededor del mortífero agujero negro llamada cariñosamente el 'horizonte de sucesos'. Si algo, incluso la luz más veloz del universo, cruza desprevenidamente esa invisible línea de no retorno gravitatorio, quedará atrapado sin remedio para toda la eternidad. Es por esta simple pero aplastante razón que los denominamos agujeros verdaderamente 'negros', ya que no emiten luz.",
      "Quizás el aspecto más extraño, perturbador y contra intuitivo de los poderosos agujeros negros es el fenómeno increíble conocido formalmente en la física relativista como la 'dilatación gravitacional del tiempo'. A medida que un valiente observador espacial se acerca temerariamente a un inmenso campo gravitacional, el tiempo literalmente se ralentiza y frena su ritmo de avance constante para esa persona en relación y comparación con las demás personas que se encuentran muy lejos, protegidas, seguras y libres de esa distorsión cósmica fundamental y abrumadoramente intensa de la relatividad.",
      "Este asombroso efecto no es exclusivo únicamente de los lejanos monstruos astronómicos; lo experimentamos de forma débil aquí mismo en nuestro planeta. Los relojes atómicos ultra precisos situados dentro de los modernos satélites de GPS en órbita están más lejos de la enorme atracción gravitacional de la Tierra que nosotros y, en consecuencia, deben corregir su ritmo inexorablemente por 38 microsegundos cada bendito día, ¡o de lo contrario nuestra navegación terrestre se desviaría catastróficamente! Acercarse a un agujero negro llevaría esta loca alteración del tiempo al límite más absoluto."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el largometraje "Solo: Una Historia de Star Wars", el Halcón Milenario y su valiente tripulación experimentan un aterrador y extremo peligro mortal debido a la irresistible y poderosa atracción implacable de El Sumidero de Kessel. Han Solo utiliza inteligentemente un pequeño y volátil frasco del valioso mineral combustible de hiper-propulsión líquido (coaxium) en bruto e inestable para darle mágicamente a los motores de la nave un explosivo impulso abrumador para liberarse justo en el límite fatídico del ineludible e invisible horizonte de sucesos.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Durante muchas décadas pasadas los formidables agujeros negros fueron meramente considerados como unos fascinantes y desconcertantes constructos teóricos o curiosidades matemáticas puras, pero en el año histórico del 2019, la audaz Colaboración Internacional del Event Horizon Telescope (EHT) publicó con enorme orgullo la primera e histórica fotografía auténtica de la oscura silueta supermasiva del gigantesco agujero negro y su disco brillante de acreción ubicado resplandecientemente en el brillante y agitado corazón de la galaxia Messier 87 (M87*).' 
      }
    ],
    fact: 'El consorcio internacional Event Horizon Telescope Collaboration (EHT) publicó asombrosamente en el glorioso año del 2019 la primera evidencia visual e imagen absolutamente histórica del gigantesco e imponente agujero negro supermasivo localizado firmemente en el violento y luminoso centro de la activa galaxia M87*, confirmando con un éxito arrollador e innegable todas y cada una de las grandes y osadas predicciones teóricas hechas por Einstein.'
  },
  {
    id: 'navegacion-estelar',
    title: 'GPS del Espacio Profundo',
    color: '#42A5F5',
    btnImage: '/assets/starwars/infographic_kessel/btn_navegacion.png',
    image: '/assets/starwars/infographic_kessel/hero_navegacion.png',
    bannerImage: '/assets/starwars/infographic_kessel/banner_navegacion.png',
    bannerCaption: 'La Red del Espacio Profundo mantiene contacto con nuestras sondas más lejanas.',
    content: [
      "Navegar exitosamente a través de nuestro colosal Sistema Solar, para no hablar del casi infinito vacío del abismo interestelar, representa uno de los desafíos técnicos más monumentales, alucinantes y formidables de toda la gran historia de la ingeniería y de la humanidad contemporánea en sí misma. ¿Cómo puede una minúscula y delicada sonda espacial como la famosa nave Voyager 1 saber con absoluta exactitud en qué recóndito y oscuro lugar remoto se halla cuando está navegando a miles de millones de fríos y tenebrosos kilómetros completamente lejos de nuestro diminuto y reconfortante hogar terrestre?",
      "Las heroicas y legendarias sondas interplanetarias Voyager 1 y Voyager 2, ambas magistralmente impulsadas por la agencia NASA en el emocionante año pionero de 1977, orientan su frágil e imparable rumbo en el frío espacio empleando asombrosos y avanzados 'rastreadores de estrellas'. Estos sumamente ingeniosos sensores visuales escanean metódica y permanentemente el firmamento negro para ubicar la luz constante de estrellas de referencia famosas y brillantes, como la resplandeciente Canopus o incluso el mismísimo Sol de nuestro propio barrio estelar, calculando así sus coordenadas espaciales precisas.",
      "Para lograr comunicarse eficazmente de manera continua y sin interrupciones con estas preciosas naves espaciales, la incansable NASA utiliza la gigantesca Red del Espacio Profundo (DSN, por sus siglas en inglés). La DSN es fundamentalmente un conjunto interconectado de descomunales y poderosas antenas parabólicas de radio de increíble alcance y gran potencia localizadas estratégicamente alrededor del globo terráqueo en la soleada California, en Madrid (España) y en Canberra (Australia). Esto garantiza que, mientras la inmensa esfera de la Tierra rota, siempre haya una antena apuntando firmemente hacia el objetivo cósmico.",
      "En el emocionante e incierto futuro de los viajes interestelares humanos, los astrónomos visionarios proponen valientemente utilizar exóticos y extraños cadáveres estelares densos y magnéticos llamados púlsares (estrellas de neutrones ultracompactas que giran frenéticamente a ritmos vertiginosos lanzando haces deslumbrantes de radiación constante al vacío cósmico) para construir un infalible Sistema de Posicionamiento Global verdaderamente intergaláctico, seguro y sumamente fiable. Sus incesantes pulsaciones cósmicas intermitentes son tan ridículamente precisas, ordenadas y constantes como los mejores relojes atómicos terrestres.",
      "De hecho, este innovador y futurista concepto de asombrosa ciencia no es simplemente otra vaga y soñadora ficción especulativa, ya que proyectos increíblemente osados y valientes liderados por ingenieros de vanguardia como la asombrosa iniciativa 'Breakthrough Starshot' apuntan fehacientemente y con tremenda convicción a impulsar muy pequeñas naves exploratorias, velas ligeras y sondas no tripuladas utilizando gigantescos enjambres coordinados de poderosos láseres, alcanzando asombrosamente hasta un inconcebible y alucinante 20% de la máxima e insuperable velocidad de la luz hacia nuestra vecina estelar más cercana, Alfa Centauri."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Star Wars, los droides astromecánicos como R2-D2 son los verdaderos héroes de la navegación hiperespacial. Se conectan directamente al sistema de vuelo de los cazas X-Wing y calculan instantáneamente las rutas hiperespaciales seguras, actuando como computadoras de navegación vivientes. Sin un droide astromecánico, un piloto rebelde arriesga estrellarse contra una estrella o quedarse varado en el vacío. Es la versión galáctica de intentar conducir por una ciudad desconocida sin GPS ni mapa.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Las sondas Pioneer 10 y Pioneer 11 llevan una placa dorada diseñada por Carl Sagan y Frank Drake que muestra la posición de nuestro Sol usando 14 púlsares como referencia. Cada púlsar tiene su frecuencia grabada en código binario, formando un mapa único que cualquier civilización avanzada podría usar para encontrar la Tierra. La Voyager 1, lanzada en 1977, es actualmente el objeto humano más lejano, a más de 24 mil millones de kilómetros, y sus señales de radio tardan casi 23 horas en llegar a nosotros.' 
      }
    ],
    fact: 'La Red del Espacio Profundo (DSN) de la NASA opera tres complejos de antenas en California, Madrid y Canberra, garantizando cobertura de comunicación las 24 horas. La Voyager 1, a más de 24 mil millones de km, transmite con apenas 23 vatios de potencia (como una bombilla de nevera) y sus señales tardan casi un día en llegar. El proyecto Breakthrough Starshot propone enviar nanosondas al 20% de la velocidad de la luz hacia Próxima Centauri, llegando en solo 20 años.'
  }
];

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
};

const EXPAND_ICONS = {
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  atom: <Atom size={18} />
};

/* =========================================================================
   3. COMPONENTS
   ========================================================================= */

const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.05) + 0.01
    }));

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.01) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#FFB74D',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(255, 183, 77, 0.4)'
      }}>
        PARSECS Y KESSEL
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        DISTANCIAS &middot; PARALAJE &middot; HIPERESPACIO
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec1" : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} 
          />
        ))}
      </div>
    </div>
  );
};

const NodeButton = ({ node, isVisited, onClick }) => {
  const isComplete = isVisited(node.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(node)}
      style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        padding: 0,
        border: `3px solid ${isComplete ? node.color : '#333'}`,
        background: '#1A1C29',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isComplete ? `0 0 15px ${node.color}55` : 'none',
        zIndex: 10
      }}
    >
      <img 
        src={node.btnImage} 
        alt={node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isComplete ? 1 : 0.6 }}
      />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: node.color,
          borderRadius: '50%',
          padding: '2px'
        }}>
          <Sparkles size={12} color="#000" />
        </div>
      )}
    </motion.button>
  );
};

const ExpandableSection = ({ data, color, direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const variant = dirVariants[direction] || dirVariants.up;
  
  return (
    <div style={{ marginBottom: '1rem', background: '#1A1C29', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${color}33` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: isOpen ? `${color}11` : 'transparent',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          fontFamily: '"Oswald", sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>
              {data.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoStar;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoStar;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        inset: '2rem',
        background: '#0B0D17',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>{node.title}</h2>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
          </div>
          <div style={{ 
            backgroundImage: `url(${node.image})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            borderLeft: `4px solid ${node.color}`,
            cursor: 'pointer'
          }} onClick={() => setLightboxSrc(node.image)} />
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[1]}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
                <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATAFILA
              </div>
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
                {node.fact}
              </p>
            </div>
            <div>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
              ))}
            </div>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '1rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}55` }}>
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ cursor: 'pointer', width: '100%', height: 'auto', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif' }}>
                  {node.bannerCaption}
                </div>
              )}
            </div>
          )}

          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[3]}
          </p>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[4]}
          </p>
        </div>
      </div>
      
      <div style={{ padding: '1rem 2rem', background: '#1A1C29', borderTop: `1px solid ${node.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ color: '#90A4AE', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
          ARCHIVOS DE LA ALIANZA / {node.title.toUpperCase()}
        </div>
        <button 
          onClick={onNext}
          style={{ 
            background: node.color, 
            color: '#000', 
            border: 'none', 
            padding: '0.75rem 2rem', 
            borderRadius: '24px', 
            fontWeight: 'bold', 
            fontFamily: '"Oswald", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: `0 4px 15px ${node.color}66`
          }}
        >
          {isLast ? 'FINALIZAR' : 'SIGUIENTE'} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec1() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

  const progress = (visitedNodes.size / INFOGRAPHIC_NODES.length) * 100;
  const isAllComplete = visitedNodes.size === INFOGRAPHIC_NODES.length;

  const handleNodeClick = (node) => {
    setActiveNode(node.id);
    if (!visitedNodes.has(node.id)) {
      setVisitedNodes(prev => new Set(prev).add(node.id));
    }
  };

  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      const nextNode = INFOGRAPHIC_NODES[currentIndex + 1];
      handleNodeClick(nextNode);
    } else {
      setActiveNode(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05060A', overflow: 'hidden', fontFamily: '"Lora", serif' }}>
      <StarField />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_kessel/bg_kessel.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNode} />
        
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '800px', 
          height: '400px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NodeButton node={node} isVisited={(id) => visitedNodes.has(id)} onClick={handleNodeClick} />
            </motion.div>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '600px', marginTop: '4rem', background: '#1A1C29', borderRadius: '12px', padding: '1rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: '"Oswald", sans-serif', color: '#90A4AE' }}>
            <span>PROGRESO DE DESCARGA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #42A5F5, #AB47BC)', boxShadow: '0 0 10px #42A5F5' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #FFB74D, #FF7043)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#000', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(255, 183, 77, 0.4)' }}
            >
              <Sparkles size={24} />
              ¡DATOS DE NAVEGACIÓN DESCARGADOS CON ÉXITO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Galería del Halcón Milenario */}
        <div style={{ marginTop: '4rem', width: '100%', maxWidth: '800px' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#FFB74D', fontSize: '1.4rem', textAlign: 'center', marginBottom: '1.5rem', textShadow: '0 0 20px rgba(255,183,77,0.3)' }}>
            🚀 EL HALCÓN MILENARIO EN EL CORREDOR DE KESSEL
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1rem' 
          }}>
            {FALCON_GALLERY.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,183,77,0.3)',
                  background: '#0B0D17',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
                onClick={() => setLightboxSrc(img.src)}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '160px' }}>
                  <img 
                    src={img.src} 
                    alt={img.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(5,6,10,0.85) 100%)' }} />
                </div>
                <p style={{ 
                  padding: '0.6rem 0.8rem', 
                  margin: 0, 
                  fontSize: '0.8rem', 
                  color: '#B0BEC5', 
                  fontFamily: '"Oswald", sans-serif',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}>
                  {img.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS JEDI (Bibliografía)</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#78909C', fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>

      </div>

      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            setLightboxSrc={setLightboxSrc}
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
