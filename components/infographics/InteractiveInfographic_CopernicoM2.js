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
  "Kuhn, T. S. (1957). The Copernican Revolution: Planetary Astronomy in the Development of Western Thought. Harvard University Press.",
  "Rosen, E. (trad.) (1959). Three Copernican Treatises: The Commentariolus of Copernicus, The Letter against Werner, The Narratio prima of Rheticus. Dover Publications.",
  "Copérnico, N. (1987). Sobre las revoluciones de los orbes celestes. Edición de Carlos Mínguez y Mercedes Testal. Madrid: Tecnos.",
  "Rabin, S. (2019). «Nicolaus Copernicus». Stanford Encyclopedia of Philosophy. https://plato.stanford.edu/entries/copernicus/",
  "NASA NSSDCA. Planetary Fact Sheet. https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
  "Bessel, F. W. (1838). «Bestimmung der Entfernung des 61sten Sterns des Schwans». Astronomische Nachrichten, 16, 65-96."
];

const INFOGRAPHIC_NODES = [
  {
    id: "helio-del-geocentrismo-al-sol",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-del-geocentrismo-al-sol.webp',
    bannerCaption: "«Heliocéntrico» viene del griego «helios», Sol: un modelo con el Sol en el centro y la Tierra girando a su alrededor.",
    title: "Del universo de Ptolomeo al Sol en el centro",
    color: '#8A7A5C',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-del-geocentrismo-al-sol.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-del-geocentrismo-al-sol.webp',
    content: [
      "Durante unos 1,400 años, la astronomía europea y del mundo islámico se basó en el Almagesto, el gran tratado que Claudio Ptolomeo escribió en Alejandría hacia el año 150. En su modelo, llamado geocéntrico, la Tierra permanecía inmóvil en el centro del universo y el Sol, la Luna, los planetas y las estrellas giraban a su alrededor. A simple vista, parece lo más lógico: sentimos el suelo firme bajo los pies y vemos al Sol salir por el este y ocultarse por el oeste todos los días.",
      "Para que sus predicciones coincidieran con lo que se observaba, Ptolomeo tuvo que usar herramientas geométricas ingeniosas. Cada planeta se movía en un círculo pequeño llamado epiciclo, cuyo centro a su vez recorría un círculo mayor llamado deferente. Además introdujo el ecuante, un punto desplazado del centro desde el cual el planeta parecía moverse con velocidad uniforme. El sistema funcionaba bastante bien para predecir posiciones, pero era complicado y cada planeta tenía su propio mecanismo.",
      "La palabra heliocéntrico une dos raíces griegas: «helios», que significa Sol, y «kentron», que significa centro. Nicolás Copérnico, nacido en Toruń (Polonia) en 1473, propuso que el Sol ocupaba el lugar central y que la Tierra era un planeta más, girando a su alrededor igual que Mercurio, Venus, Marte, Júpiter y Saturno. La Luna, en cambio, seguía girando alrededor de la Tierra. Fue un cambio de punto de vista que reorganizó todo el cielo.",
      "Copérnico no fue el primero en imaginar algo así. En el siglo III antes de nuestra era, el griego Aristarco de Samos ya había sugerido que la Tierra giraba alrededor del Sol. Su obra sobre ese tema se perdió, pero conocemos la idea gracias a Arquímedes, que la mencionó en un texto llamado El contador de arena. Copérnico conocía la tradición griega y citó a varios pensadores antiguos que habían propuesto que la Tierra se movía, como los pitagóricos Filolao y Ecfanto.",
      "Lo que distinguió a Copérnico fue que no se quedó en una idea filosófica: construyó un sistema matemático completo capaz de calcular las posiciones de todos los planetas. Uno de sus motivos principales era su rechazo al ecuante de Ptolomeo, porque violaba el ideal antiguo de movimientos circulares y uniformes. Al buscar una alternativa más armoniosa, descubrió que poner al Sol en el centro ordenaba el sistema de forma coherente, con cada planeta en un lugar definido."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Almagesto de Ptolomeo no llegó a Europa occidental directamente desde Grecia. Fue traducido al árabe en Bagdad durante el siglo IX y su nombre actual viene del árabe «al-majisti», que significa «el más grande». Más tarde, en el siglo XII, Gerardo de Cremona lo tradujo del árabe al latín en Toledo, España. Así, el libro que Copérnico estudió había viajado por tres idiomas y varios siglos." },
      { label: "Dato Científico", icon: "atom", text: "Hoy sabemos que el Sol tampoco es el centro del universo. Es el centro del sistema solar, pero él mismo orbita alrededor del centro de la Vía Láctea, a unos 26,000 años luz de distancia, y tarda alrededor de 230 millones de años en dar una vuelta completa. Incluso el centro de masas del sistema solar no coincide exactamente con el centro del Sol, porque Júpiter es tan masivo que lo desplaza ligeramente." }
    ],
    fact: "Copérnico no describió su sistema con el Sol exactamente en el centro geométrico. En su modelo, el centro de las órbitas planetarias era el centro de la órbita terrestre, un punto vacío situado cerca del Sol. Por eso algunos historiadores prefieren llamarlo modelo heliostático: el Sol estaba quieto y muy cerca del centro, pero no justo en él. Aun así, la idea esencial era revolucionaria: la Tierra se movía.",
  },
  {
    id: "helio-commentariolus",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-commentariolus.webp',
    bannerCaption: "Antes de 1514, Copérnico hizo circular entre amigos un breve manuscrito, el Commentariolus, con las bases de su modelo.",
    title: "El Commentariolus: la revolución en un manuscrito",
    color: '#6E7F8C',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-commentariolus.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-commentariolus.webp',
    content: [
      "Mucho antes de publicar su gran libro, Copérnico escribió un texto corto en latín conocido como Commentariolus, que significa «pequeño comentario». No se imprimió: circuló como manuscrito copiado a mano entre amigos y estudiosos de confianza. Sabemos que ya existía antes de mayo de 1514, porque aparece descrito en el catálogo de la biblioteca de Matías de Miechów, un profesor de Cracovia, fechado ese año. Es la primera exposición conocida del sistema copernicano.",
      "El Commentariolus comienza con una queja: Copérnico explica que los modelos antiguos no respetaban el principio de que los cuerpos celestes se mueven en círculos con velocidad uniforme, sobre todo por el uso del ecuante. Luego presenta siete postulados o supuestos básicos. Entre ellos, que no existe un único centro para todos los círculos celestes, que el centro de la Tierra no es el centro del universo y que todos los planetas giran alrededor del Sol.",
      "Otros postulados son igual de atrevidos. Uno dice que la distancia entre la Tierra y el Sol es insignificante comparada con la distancia a las estrellas. Otro afirma que el giro diario del cielo es solo aparente y se debe a que la Tierra rota sobre su eje. Uno más explica que los movimientos aparentes del Sol a lo largo del año y el retroceso ocasional de los planetas son efectos causados por el movimiento de la propia Tierra.",
      "El texto termina con una frase famosa que resume su ambición. Copérnico cuenta los círculos que necesita para describir el cielo: siete para Mercurio, cinco para Venus, tres para la Tierra, cuatro para la Luna y cinco para cada uno de Marte, Júpiter y Saturno. Concluye que treinta y cuatro círculos bastan para explicar toda la estructura del universo y el baile completo de los planetas. Era una promesa de orden y sencillez relativa.",
      "Durante siglos se creyó que el Commentariolus se había perdido. En el siglo XIX se encontraron copias manuscritas en Viena y en Estocolmo, y más tarde otra en Aberdeen, Escocia. Gracias a ellas, los historiadores pudieron estudiar cómo evolucionó el pensamiento de Copérnico entre ese primer borrador y su obra final de 1543. El manuscrito demuestra que la idea central del Sol en el centro ya estaba clara en su mente unos treinta años antes de publicarla."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Commentariolus no llevaba el nombre de su autor en las primeras copias, y por eso durante un tiempo hubo dudas sobre quién lo había escrito. Su título completo en latín se traduce como «Breve comentario de Nicolás Copérnico sobre las hipótesis de los movimientos celestes establecidas por él mismo». En español suele llamarse simplemente el Pequeño comentario, y su traducción cabe en pocas páginas." },
      { label: "Dato Científico", icon: "atom", text: "Un postulado del Commentariolus dice que la distancia Tierra-Sol es imperceptible comparada con la distancia a las estrellas. Hoy lo confirmamos: la Tierra está a unos 150 millones de kilómetros del Sol, pero la estrella más cercana, Próxima Centauri, está a unos 40 billones de kilómetros, cerca de 270,000 veces más lejos. Copérnico intuyó esa escala gigantesca sin poder medirla." }
    ],
    fact: "Copérnico compartió el Commentariolus solo con personas de confianza, y no por miedo inmediato a una persecución, sino porque era un trabajo incompleto: no incluía demostraciones matemáticas detalladas. Él mismo anunció que las pruebas aparecerían en una obra mayor. Esa obra fue De revolutionibus orbium coelestium, que tardaría unas tres décadas más en llegar a la imprenta, en 1543.",
  },
  {
    id: "helio-movimiento-retrogrado",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-movimiento-retrogrado.webp',
    bannerCaption: "Marte parece retroceder en el cielo unos 72 días cada 26 meses: es un efecto de perspectiva cuando la Tierra lo adelanta.",
    title: "El misterio del movimiento retrógrado",
    color: '#7A5E5A',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-movimiento-retrogrado.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-movimiento-retrogrado.webp',
    content: [
      "Si observas Marte noche tras noche durante varios meses, verás que normalmente avanza poco a poco hacia el este respecto a las estrellas de fondo. Pero de vez en cuando hace algo extraño: se detiene, retrocede hacia el oeste durante algunas semanas y luego vuelve a avanzar, dibujando un lazo en el cielo. A este fenómeno se le llama movimiento retrógrado, y fue uno de los grandes misterios de la astronomía antigua.",
      "En el modelo de Ptolomeo, el movimiento retrógrado se explicaba con los epiciclos. El planeta giraba en su pequeño círculo mientras el centro de ese círculo avanzaba por el deferente alrededor de la Tierra. Cuando el giro del epiciclo iba en sentido contrario al avance general, el planeta parecía retroceder. Funcionaba, pero había que ajustar el tamaño y la velocidad de cada epiciclo por separado, sin una razón física que los conectara.",
      "Copérnico ofreció una explicación mucho más natural: el retroceso es un efecto de perspectiva. La Tierra está más cerca del Sol que Marte y recorre su órbita más rápido. Cuando nuestro planeta alcanza y adelanta a Marte, la línea de visión desde la Tierra hacia Marte gira hacia atrás contra las estrellas lejanas. Marte nunca cambia de dirección realmente; solo parece hacerlo porque nosotros nos movemos más rápido en una carretera interior.",
      "Es como viajar en un auto por la autopista y adelantar a un camión más lento. Mientras lo rebasas, el camión parece desplazarse hacia atrás respecto a las montañas lejanas, aunque sigue avanzando. Lo mismo ocurre con Júpiter y Saturno, que también muestran retrogradaciones. Con planetas interiores como Mercurio y Venus sucede algo parecido, pero en ese caso son ellos los que adelantan a la Tierra por su órbita interior.",
      "El modelo heliocéntrico predice además cuándo ocurre el retroceso: siempre cerca de la oposición, cuando el planeta exterior queda en el lado opuesto al Sol visto desde la Tierra. En ese momento está más cerca de nosotros y brilla con más intensidad. Esto explicaba de golpe por qué Marte es más brillante justo durante su retrogradación, un detalle que en el sistema de Ptolomeo solo podía ajustarse, pero no explicarse a partir de una causa común."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Marte entra en movimiento retrógrado aproximadamente cada 26 meses, que es el tiempo que tarda la Tierra en volver a adelantarlo. Cada retrogradación dura unos dos meses y medio. Júpiter retrocede cerca de cuatro meses cada 13 meses, y Saturno unos cuatro meses y medio cada poco más de un año. Con una cámara y un trípode puedes fotografiar el lazo de Marte a lo largo de varias semanas." },
      { label: "Dato Científico", icon: "atom", text: "El intervalo entre dos retrogradaciones se llama período sinódico. Copérnico lo usó para calcular el período real de cada planeta alrededor del Sol, llamado sideral, con una fórmula sencilla que relaciona ambos con el año terrestre. Para Marte, el período sinódico de unos 780 días da un período sideral de unos 687 días, es decir, alrededor de 1.88 años terrestres, muy cerca del valor moderno." }
    ],
    fact: "La explicación del movimiento retrógrado fue uno de los argumentos más fuertes de Copérnico, porque convertía cinco mecanismos independientes en una sola causa: el movimiento de la Tierra. En el sistema de Ptolomeo, los grandes epiciclos de cada planeta repetían, sin saberlo, el reflejo del viaje anual de la Tierra alrededor del Sol. Copérnico reconoció ese patrón común y lo trasladó a su verdadero origen.",
  },
  {
    id: "helio-orden-y-distancias",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-orden-y-distancias.webp',
    bannerCaption: "Con el Sol en el centro, Copérnico calculó distancias relativas: Venus a 0.72 y Marte a 1.52 veces la distancia Tierra-Sol.",
    title: "El orden de los planetas y sus distancias",
    color: '#5E7A6B',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-orden-y-distancias.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-orden-y-distancias.webp',
    content: [
      "En el modelo de Ptolomeo, el orden de los planetas era un tema de debate. Se sabía que la Luna era el astro más cercano, pero no había una forma clara de decidir si Mercurio y Venus estaban más cerca o más lejos que el Sol. Distintos autores proponían órdenes diferentes, y el sistema no ofrecía una manera de medir las distancias reales. Cada planeta era un mecanismo aislado cuyo tamaño absoluto podía cambiarse sin afectar las predicciones.",
      "El sistema de Copérnico resolvió ese problema. Al poner al Sol en el centro, el orden quedaba determinado por el tiempo que tarda cada planeta en dar una vuelta: Mercurio, el más rápido, era el más cercano al Sol, seguido de Venus, la Tierra, Marte, Júpiter y Saturno, el más lento. En su famoso diagrama, Copérnico anotó que Saturno tardaba unos 30 años, Júpiter 12, Marte 2, la Tierra 1, Venus 9 meses y Mercurio unos 80 días.",
      "Además, Copérnico pudo calcular por primera vez las distancias relativas de los planetas al Sol, tomando como unidad la distancia Tierra-Sol. Para ello usó geometría y observaciones del cielo. Sus resultados fueron sorprendentemente buenos: unos 0.38 para Mercurio, 0.72 para Venus, 1.52 para Marte, 5.2 para Júpiter y 9.2 para Saturno. Los valores modernos son 0.39, 0.72, 1.52, 5.20 y 9.54, lo que muestra la calidad de su trabajo.",
      "El caso de Venus ilustra el método. Venus nunca se aleja del Sol más de unos 45 a 47 grados en el cielo, ángulo que se llama máxima elongación. En el modelo heliocéntrico, ese ángulo máximo ocurre cuando la línea de visión desde la Tierra toca la órbita de Venus, formando un triángulo rectángulo con el Sol. Con un poco de trigonometría, el seno de unos 46 grados da aproximadamente 0.72, la distancia de Venus al Sol en unidades de la órbita terrestre.",
      "Este resultado tenía un valor enorme: por primera vez, el sistema solar se veía como una estructura única y conectada, donde cada pieza tenía un tamaño definido respecto a las demás. Copérnico escribió que en su sistema no se podía mover ninguna parte sin desordenar el conjunto. Las distancias absolutas en kilómetros todavía no se conocían bien; eso llegaría en los siglos XVII y XVIII, con mediciones como los tránsitos de Venus."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hoy usamos una unidad llamada unidad astronómica, abreviada ua, que equivale a la distancia media entre la Tierra y el Sol: unos 149.6 millones de kilómetros. En 2012, la Unión Astronómica Internacional la fijó exactamente en 149,597,870,700 metros. Es la misma idea que usó Copérnico: medir las distancias de los planetas tomando la órbita de la Tierra como regla de referencia." },
      { label: "Dato Científico", icon: "atom", text: "Mercurio es más difícil de medir que Venus porque su órbita es bastante excéntrica: su distancia al Sol varía entre unos 46 y 70 millones de kilómetros. Por eso su máxima elongación cambia entre unos 18 y 28 grados según la época del año. Copérnico tuvo que añadir círculos extra a su modelo de Mercurio para reproducir esta variación, y aun así fue el planeta que peor describía." }
    ],
    fact: "La relación entre período y distancia que aparecía en el sistema de Copérnico, donde los planetas más lejanos se mueven más lentamente, inspiró décadas después a Johannes Kepler. En 1619, Kepler publicó su tercera ley: el cuadrado del período de un planeta es proporcional al cubo de su distancia media al Sol. Esa ley solo podía descubrirse en un sistema donde las distancias relativas estuvieran bien definidas.",
  },
  {
    id: "helio-tierra-en-movimiento",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-tierra-en-movimiento.webp',
    bannerCaption: "La Tierra orbita el Sol a unos 107,000 km/h y su ecuador rota a unos 1,670 km/h, pero no sentimos ninguno de esos movimientos.",
    title: "Una Tierra que gira y viaja",
    color: '#5C6E85',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-tierra-en-movimiento.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-tierra-en-movimiento.webp',
    content: [
      "La parte más difícil de aceptar en la propuesta de Copérnico era que la Tierra se mueve. Según él, nuestro planeta rota sobre su eje una vez al día, lo que explica la salida y puesta del Sol, la Luna y las estrellas. Además, la Tierra recorre una órbita alrededor del Sol cada año, lo que explica por qué el Sol parece desplazarse por las constelaciones del zodíaco a lo largo de las estaciones. El cielo no gira: somos nosotros quienes giramos.",
      "Las velocidades implicadas son enormes. La Tierra recorre su órbita a unos 29.8 kilómetros por segundo, aproximadamente 107,000 kilómetros por hora. En un año completa un recorrido de unos 940 millones de kilómetros, más de una vez y media la distancia que nos separa de Júpiter cuando está más cerca. Al mismo tiempo, un punto en el ecuador gira a unos 1,670 kilómetros por hora debido a la rotación diaria, porque debe recorrer los 40,075 kilómetros de la circunferencia terrestre en aproximadamente un día.",
      "La gente de la época preguntaba: si la Tierra gira tan rápido, ¿por qué no salen volando los objetos o por qué no sopla un viento constante? Copérnico respondió que el aire y todo lo que está sobre la Tierra comparten su movimiento. Un siglo después, Galileo desarrolló mejor esta idea con el principio de relatividad: dentro de un barco que navega suavemente, una pelota que cae lo hace en línea recta, como si el barco estuviera quieto.",
      "Lo mismo ocurre en un avión a velocidad de crucero: puedes servirte agua sin derramarla, aunque vueles a unos 900 kilómetros por hora. Solo percibimos los cambios de velocidad o de dirección, es decir, las aceleraciones. Como el movimiento de la Tierra es casi uniforme, nuestro cuerpo no lo detecta. Sí existen efectos pequeños, como la desviación de los vientos y corrientes oceánicas llamada efecto Coriolis, que confirman la rotación.",
      "Copérnico describió en realidad tres movimientos de la Tierra. El primero era la rotación diaria y el segundo la traslación anual alrededor del Sol. El tercero, llamado movimiento en declinación, servía para mantener el eje de la Tierra apuntando siempre en la misma dirección del espacio durante el año, porque en su geometría era necesario. Con esa inclinación constante del eje, de unos 23.5 grados, explicó el origen de las estaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En un solo día, mientras duermes, juegas y estudias, la Tierra avanza unos 2.6 millones de kilómetros en su órbita alrededor del Sol. Esa distancia equivale a casi siete viajes de ida a la Luna. Y si cuentas el movimiento del Sol alrededor de la galaxia, a unos 230 kilómetros por segundo, el viaje diario es todavía mucho mayor. ¡Eres un pasajero cósmico permanente!" },
      { label: "Dato Científico", icon: "atom", text: "Copérnico también explicó la precesión de los equinoccios, descubierta por Hiparco en la antigua Grecia, como un lento bamboleo del eje terrestre, parecido al de una peonza. Hoy sabemos que el eje completa una vuelta de precesión en unos 26,000 años. Por eso la estrella Polar no siempre ha sido la estrella del norte: hace casi 5,000 años ese papel lo tenía la estrella Thuban, en la constelación del Dragón." }
    ],
    fact: "La velocidad de rotación de la superficie terrestre depende de la latitud. En el ecuador es de unos 1,670 km/h, pero en Ciudad de México, a unos 19 grados al norte, baja a cerca de 1,580 km/h, y en Madrid, a unos 40 grados, a unos 1,280 km/h. En los polos es prácticamente cero: allí solo girarías sobre ti mismo una vez al día. Por eso los cohetes se lanzan cerca del ecuador.",
  },
  {
    id: "helio-objecion-del-paralaje",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-objecion-del-paralaje.webp',
    bannerCaption: "El paralaje estelar que exigía el modelo de Copérnico se midió por fin en 1838: Bessel lo detectó en la estrella 61 Cygni.",
    title: "La objeción del paralaje estelar",
    color: '#7A6A8A',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-objecion-del-paralaje.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-objecion-del-paralaje.webp',
    content: [
      "La resistencia al modelo de Copérnico no fue solo religiosa; también había objeciones científicas serias. La más importante era el paralaje estelar. Si la Tierra se mueve alrededor del Sol, al observar una estrella cercana en enero y luego en julio, desde lados opuestos de la órbita, deberíamos verla ligeramente desplazada respecto a estrellas más lejanas. Puedes probarlo extendiendo un dedo y mirándolo alternando el ojo izquierdo y el derecho.",
      "Los astrónomos de la época buscaron ese desplazamiento y no lo encontraron. Para los defensores de la Tierra inmóvil, esa era una prueba de que no se movía. Copérnico respondió que las estrellas estaban tan inmensamente lejos que el paralaje era demasiado pequeño para medirlo con los instrumentos disponibles. Era una respuesta correcta, pero en su época no podía comprobarse y a muchos les pareció una excusa para salvar la teoría.",
      "Tycho Brahe, el mejor observador antes del telescopio, añadió otro problema. Si las estrellas estaban tan lejos y aun así se veían como pequeños discos a simple vista, cada una debía ser gigantesca, más grande que toda la órbita terrestre. Hoy sabemos que esos aparentes discos son un efecto óptico del ojo y de la atmósfera, no el tamaño real de las estrellas, pero en el siglo XVI el argumento era razonable.",
      "La confirmación llegó por partes. En 1729, el astrónomo inglés James Bradley anunció el descubrimiento de la aberración de la luz: un pequeño desplazamiento anual de todas las estrellas causado por la combinación de la velocidad de la Tierra y la velocidad de la luz. Fue la primera prueba directa de que la Tierra se mueve alrededor del Sol, casi dos siglos después de la muerte de Copérnico.",
      "El paralaje estelar se midió finalmente en 1838. Friedrich Wilhelm Bessel, en Königsberg, detectó un desplazamiento de unos 0.3 segundos de arco en la estrella 61 Cygni, un ángulo equivalente al tamaño de una moneda vista a varios kilómetros de distancia. Casi al mismo tiempo, Thomas Henderson y Friedrich Struve midieron el de Alfa Centauri y Vega. Copérnico tenía razón: las estrellas estaban lejísimos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La rotación de la Tierra se demostró de forma espectacular en 1851, cuando Léon Foucault colgó un péndulo de 67 metros de largo en el Panteón de París. A lo largo de las horas, el plano de oscilación del péndulo fue girando lentamente, unos 11 grados por hora, porque la Tierra giraba debajo de él. Hoy hay péndulos de Foucault en museos de ciencia de todo el mundo." },
      { label: "Dato Científico", icon: "atom", text: "Incluso la estrella más cercana al Sol, Próxima Centauri, tiene un paralaje de solo 0.77 segundos de arco, unas 80 veces menor que el detalle más fino que puede distinguir el ojo humano, que ronda un minuto de arco. Hoy la misión espacial Gaia de la Agencia Espacial Europea ha medido el paralaje de más de mil millones de estrellas con una precisión de millonésimas de segundo de arco." }
    ],
    fact: "De la palabra paralaje nació una unidad de distancia: el pársec, la distancia a la que una estrella mostraría un paralaje de un segundo de arco. Un pársec equivale a unos 3.26 años luz, o unos 31 billones de kilómetros. Ninguna estrella está tan cerca de nosotros: Próxima Centauri se encuentra a unos 1.3 pársecs, lo que explica por qué el paralaje tardó casi tres siglos en medirse.",
  },
  {
    id: "helio-error-circulos-perfectos",
    bannerImage: '/assets/copernico/infographic_m2/banner_helio-error-circulos-perfectos.webp',
    bannerCaption: "Copérnico mantuvo órbitas circulares; en 1609 Kepler demostró que los planetas recorren elipses con el Sol en un foco.",
    title: "El gran error: los círculos perfectos",
    color: '#8C6E52',
    btnImage: '/assets/copernico/infographic_m2/btn_helio-error-circulos-perfectos.webp',
    image: '/assets/copernico/infographic_m2/hero_helio-error-circulos-perfectos.webp',
    content: [
      "El modelo de Copérnico tenía un error importante: suponía que los planetas se movían en círculos perfectos a velocidad uniforme. Esta idea venía de la filosofía griega, que consideraba el círculo como la figura perfecta, digna de los cielos. Copérnico era muy fiel a ese ideal; de hecho, uno de sus motivos para crear su sistema fue eliminar el ecuante de Ptolomeo, que según él rompía la uniformidad del movimiento circular.",
      "Pero las órbitas reales no son círculos. Como resultado, el modelo heliocéntrico con círculos simples no predecía las posiciones de los planetas mejor que el de Ptolomeo. Para corregirlo, Copérnico tuvo que conservar pequeños epiciclos y círculos desplazados del centro. Su sistema era más ordenado y coherente, pero no mucho más sencillo en número de círculos ni notablemente más preciso en sus predicciones que el antiguo modelo geocéntrico.",
      "La solución llegó con Johannes Kepler. Usando las observaciones precisas de Tycho Brahe sobre Marte, descubrió tras años de cálculos que las órbitas son elipses, una especie de óvalo, con el Sol situado en uno de sus focos. Publicó este resultado en 1609, en su libro Astronomia nova, junto con su segunda ley: un planeta se mueve más rápido cuando está cerca del Sol y más despacio cuando está lejos de él.",
      "En la mayoría de los planetas las elipses son casi circulares, y por eso el error de Copérnico era difícil de notar. La órbita de la Tierra tiene una excentricidad de solo 0.017, y su distancia al Sol varía entre unos 147 y 152 millones de kilómetros. La de Marte es más alargada, con una excentricidad de 0.093, y por eso fue la clave para que Kepler encontrara la forma correcta de las órbitas planetarias.",
      "El error de Copérnico no le quita mérito. La ciencia avanza por pasos, y cada paso corrige al anterior. Copérnico cambió la pregunta fundamental al poner a la Tierra en movimiento; Kepler descubrió la forma exacta de las órbitas; Galileo aportó pruebas con el telescopio; y en 1687 Isaac Newton explicó con la gravitación universal por qué los planetas siguen elipses. Sin el primer paso, los demás no habrían sido posibles."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Tierra está más cerca del Sol a principios de enero, en un punto llamado perihelio, y más lejos a principios de julio, en el afelio. Esto sorprende a mucha gente del hemisferio norte, donde enero es invierno. Las estaciones no dependen de la distancia al Sol, sino de la inclinación del eje terrestre, que hace que los rayos lleguen más directos a un hemisferio u otro." },
      { label: "Dato Científico", icon: "atom", text: "En una elipse, la suma de las distancias de cualquier punto a los dos focos es siempre la misma. Puedes dibujar una con dos chinchetas, un hilo y un lápiz: si el hilo queda tenso mientras mueves el lápiz, trazarás una elipse. Cuanto más separadas estén las chinchetas, más alargada será. Si las juntas en un solo punto, obtendrás un círculo, que es una elipse con excentricidad cero." }
    ],
    fact: "La prueba visual decisiva de que el modelo geocéntrico de Ptolomeo estaba equivocado llegó con Galileo en 1610. Con su telescopio observó que Venus muestra un ciclo completo de fases, como la Luna, incluida una fase casi llena. En el sistema de Ptolomeo, Venus siempre estaba entre la Tierra y el Sol y nunca podía verse casi lleno. En el sistema heliocéntrico, esas fases eran exactamente las esperadas.",
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
      hue: Math.random() > 0.5 ? '212,168,67' : '184,125,94', // slate blue or copper
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradCopernicoM2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#8A7A5C", "#6E7F8C", "#7A5E5A", "#5E7A6B", "#5C6E85", "#7A6A8A", "#8C6E52"];
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
          <linearGradient id="gradCopernicoM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL SOL TOMA EL CENTRO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">NICOLÁS COPÉRNICO</text>
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
          layoutId="activeDotCopernicoM2"
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
export default function InteractiveInfographic_CopernicoM2() {
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
              🏆 Del universo de Ptolomeo al sistema de Copérnico: la Tierra se pone en marcha
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
