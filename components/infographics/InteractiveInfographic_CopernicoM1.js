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
  "Kuhn, T. S. (1957). The Copernican Revolution: Planetary Astronomy in the Development of Western Thought. Cambridge (MA): Harvard University Press.",
  "Toomer, G. J. (trad.) (1984). Ptolemy's Almagest. Londres: Duckworth (reed. Princeton University Press, 1998).",
  "Heath, T. L. (1913). Aristarchus of Samos, the Ancient Copernicus. Oxford: Clarendon Press.",
  "Saliba, G. (2007). Islamic Science and the Making of the European Renaissance. Cambridge (MA): MIT Press.",
  "Gingerich, O. (2004). The Book Nobody Read: Chasing the Revolutions of Nicolaus Copernicus. Nueva York: Walker & Company.",
  "Copérnico, N. (1543). De revolutionibus orbium coelestium. Núremberg: Johannes Petreius.",
  "Danielson, D. R. (2001). The Great Copernican Cliché. American Journal of Physics, 69(10), 1029-1035."
];

const INFOGRAPHIC_NODES = [
  {
    id: "cielo-a-simple-vista",
    bannerImage: '/assets/copernico/infographic_m1/banner_cielo-a-simple-vista.webp',
    bannerCaption: "Antes del telescopio, el cielo parecía girar alrededor de una Tierra inmóvil: así nació el modelo geocéntrico.",
    title: "Un cielo que gira a nuestro alrededor",
    color: '#5B5F7A',
    btnImage: '/assets/copernico/infographic_m1/btn_cielo-a-simple-vista.webp',
    image: '/assets/copernico/infographic_m1/hero_cielo-a-simple-vista.webp',
    content: [
      "Antes de 1609, cuando Galileo apuntó por primera vez un telescopio al cielo, toda la astronomía se hacía a simple vista. Lo que se observaba cada día era claro: el Sol sale por el este y se pone por el oeste, y de noche las estrellas giran en bloque alrededor de un punto cercano a la estrella Polar, avanzando unos 15 grados por hora. Nadie siente que el suelo se mueva. La conclusión más natural era que la Tierra estaba quieta y que el cielo giraba a su alrededor.",
      "Esa idea se llama modelo geocéntrico, del griego «gê», que significa tierra, y «kéntron», que significa centro. Según él, la Tierra ocupaba el centro del universo y a su alrededor giraban siete astros errantes: la Luna, Mercurio, Venus, el Sol, Marte, Júpiter y Saturno. Más allá estaba la esfera de las estrellas fijas, que conservaban siempre la misma posición entre sí. La palabra planeta viene precisamente del griego «planétes», que significa errante o vagabundo.",
      "Los defensores del modelo tenían argumentos razonables para su época. Si la Tierra girara sobre sí misma, pensaban, una piedra lanzada hacia arriba caería lejos de donde salió y soplarían vientos continuos. Además, si la Tierra diera vueltas alrededor del Sol, las estrellas cercanas deberían cambiar ligeramente de posición a lo largo del año, un efecto llamado paralaje. Nadie lo veía. La razón es que las estrellas están tan lejos que el paralaje no se midió hasta 1838, cuando Friedrich Bessel lo logró con la estrella 61 Cygni.",
      "El filósofo griego Aristóteles, que vivió entre 384 y 322 antes de Cristo, dio al modelo una base física. Para él, todo lo que está bajo la Luna se compone de cuatro elementos, tierra, agua, aire y fuego, y la tierra, por ser el más pesado, tiende hacia el centro del universo. Los cielos, en cambio, estaban hechos de un quinto elemento, el éter, que solo podía moverse en círculos perfectos. Aristóteles también demostró que la Tierra es esférica, porque en los eclipses lunares su sombra siempre es redonda.",
      "Antes que él, Eudoxo de Cnido, hacia el año 370 antes de Cristo, imaginó el cosmos como un conjunto de 27 esferas que giraban unas dentro de otras con la Tierra en el centro. Aristóteles amplió el sistema hasta unas 55 esferas. Sin embargo, este modelo tenía un problema serio: como cada planeta quedaba siempre a la misma distancia de la Tierra, no explicaba por qué Marte o Venus brillan mucho más en unas épocas que en otras. Resolver ese y otros problemas fue la tarea de Ptolomeo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Es un mito que en la Edad Media se creyera que la Tierra era plana. Los sabios griegos ya sabían que era una esfera, y hacia el año 240 antes de Cristo Eratóstenes, director de la Biblioteca de Alejandría, calculó su tamaño comparando la sombra del Sol a mediodía en Siena y en Alejandría, en Egipto. Midió una diferencia de unos 7.2 grados y obtuvo una circunferencia cercana a la real, de unos 40,000 kilómetros." },
      { label: "Dato Científico", icon: "atom", text: "Puedes ver el paralaje con tu dedo: estira el brazo, levanta el pulgar y míralo cerrando un ojo y luego el otro. El pulgar parece saltar sobre el fondo. Las estrellas hacen lo mismo cuando la Tierra cambia de lado en su órbita, pero el salto es diminuto. Incluso Próxima Centauri, la estrella más cercana al Sol, a 4.24 años luz, muestra un paralaje de solo 0.77 segundos de arco, muy por debajo de lo que el ojo humano puede detectar." }
    ],
    fact: "Los siete astros errantes del modelo geocéntrico todavía viven en nuestro calendario. En español, el lunes está dedicado a la Luna, el martes a Marte, el miércoles a Mercurio, el jueves a Júpiter y el viernes a Venus. El sábado viene del hebreo «shabat» y el domingo del latín «dies Dominicus», día del Señor, aunque en inglés el sábado, Saturday, conserva el nombre de Saturno.",
  },
  {
    id: "ptolomeo-almagesto",
    bannerImage: '/assets/copernico/infographic_m1/banner_ptolomeo-almagesto.webp',
    bannerCaption: "Hacia el año 150 d. C., Claudio Ptolomeo reunió en el Almagesto el modelo geocéntrico más completo de la Antigüedad.",
    title: "Ptolomeo y el Almagesto",
    color: '#7A6A4F',
    btnImage: '/assets/copernico/infographic_m1/btn_ptolomeo-almagesto.webp',
    image: '/assets/copernico/infographic_m1/hero_ptolomeo-almagesto.webp',
    content: [
      "Claudio Ptolomeo vivió aproximadamente entre los años 100 y 170 después de Cristo en Alejandría, una ciudad de Egipto que entonces formaba parte del Imperio romano. Escribía en griego y registró observaciones fechadas entre los años 127 y 141. Hacia el año 150 terminó su obra principal, la «Sintaxis matemática». Siglos después, los astrónomos árabes la llamaron «al-Majistí», que significa «la más grande», y de ese nombre viene el título con el que la conocemos hoy: Almagesto.",
      "El Almagesto tiene 13 libros. En ellos Ptolomeo explicó la forma y la posición de la Tierra, los movimientos del Sol y de la Luna, el cálculo de los eclipses y las trayectorias de los cinco planetas visibles. También incluyó un catálogo de 1,022 estrellas organizadas en 48 constelaciones, con su brillo clasificado en seis magnitudes. Gran parte de ese trabajo se apoyaba en Hiparco de Nicea, un astrónomo del siglo II antes de Cristo que había descubierto la precesión de los equinoccios.",
      "El modelo de Ptolomeo usaba dos círculos para cada planeta. El primero, llamado deferente, era un círculo grande alrededor de la Tierra. El segundo, el epiciclo, era un círculo más pequeño cuyo centro avanzaba sobre el deferente, mientras el planeta giraba sobre el epiciclo. Así, el planeta trazaba una curva con bucles. Además, Ptolomeo colocó la Tierra un poco desplazada del centro del deferente, lo que permitía explicar por qué las estaciones del año no duran exactamente lo mismo.",
      "Su invento más polémico fue el ecuante, un punto situado al otro lado del centro del deferente, a la misma distancia que la Tierra. Desde ese punto, y no desde el centro del círculo, el centro del epiciclo parecía moverse a velocidad constante. El truco mejoraba mucho las predicciones, pero rompía la regla de Aristóteles según la cual los cielos debían moverse con velocidad uniforme alrededor de su propio centro. Siglos después, el ecuante fue una de las cosas que más molestó a Copérnico.",
      "En otra obra, las «Hipótesis planetarias», Ptolomeo colocó las esferas de los planetas unas dentro de otras y estimó el tamaño del cosmos. Calculó que el Sol estaba a unos 1,210 radios terrestres, cuando la distancia real es de unos 23,500, y situó las estrellas fijas a unos 20,000 radios terrestres. También escribió una «Geografía» con coordenadas de miles de lugares. Su sistema permitía predecir con utilidad práctica dónde estaría cada planeta, y por eso se usó durante más de 1,300 años."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Almagesto llegó a la Europa latina gracias a una cadena de traducciones. Primero se tradujo del griego al árabe en Bagdad durante el siglo IX. Después, hacia 1175, Gerardo de Cremona lo tradujo del árabe al latín en Toledo, en el reino de Castilla. La primera edición impresa de esa traducción latina apareció en Venecia en 1515, cuando Copérnico ya trabajaba en su propio sistema." },
      { label: "Dato Científico", icon: "atom", text: "Combinar círculos que giran unos sobre otros es una herramienta matemática muy potente. Con suficientes epiciclos de distintos tamaños y velocidades se puede aproximar casi cualquier movimiento periódico, una idea emparentada con las series de Fourier que hoy se usan para analizar sonidos e imágenes. Por eso el sistema de Ptolomeo podía ajustarse bien a las observaciones aunque partiera de una idea física equivocada." }
    ],
    fact: "Las 48 constelaciones de Ptolomeo siguen en uso. Cuando la Unión Astronómica Internacional fijó en 1922 la lista oficial de 88 constelaciones, conservó casi todas las del Almagesto, como Orión, Escorpio, la Osa Mayor o Andrómeda. La única que desapareció como tal fue el Navío Argos, que se dividió en tres constelaciones más pequeñas: Carina, Puppis y Vela.",
  },
  {
    id: "movimiento-retrogrado",
    bannerImage: '/assets/copernico/infographic_m1/banner_movimiento-retrogrado.webp',
    bannerCaption: "A veces los planetas parecen frenar y retroceder en el cielo: explicar ese bucle fue el gran reto de la astronomía antigua.",
    title: "El misterio del movimiento retrógrado",
    color: '#6B4F5E',
    btnImage: '/assets/copernico/infographic_m1/btn_movimiento-retrogrado.webp',
    image: '/assets/copernico/infographic_m1/hero_movimiento-retrogrado.webp',
    content: [
      "Si se observa la posición de Marte frente a las estrellas noche tras noche, se nota que normalmente avanza hacia el este. Pero de vez en cuando se detiene, retrocede hacia el oeste durante semanas, vuelve a detenerse y retoma su camino, dibujando un bucle o una zeta en el cielo. Este comportamiento se llama movimiento retrógrado. Lo presentan los cinco planetas visibles a simple vista, y por eso los antiguos los consideraban astros errantes, distintos de las estrellas fijas.",
      "Cada planeta tiene su propio ritmo. Marte entra en movimiento retrógrado aproximadamente cada 26 meses, y la marcha atrás dura unos 70 a 80 días. Júpiter lo hace cada 13 meses durante unos cuatro meses, y Saturno cada 12.5 meses durante unos cuatro meses y medio. Además, los antiguos notaron un detalle importante: un planeta exterior brilla más justo en mitad de su retroceso, cuando está en el lado opuesto del cielo respecto al Sol. Cualquier modelo serio tenía que explicar esa coincidencia.",
      "Ptolomeo lo explicaba con el epiciclo. Cuando el planeta recorría la parte interior de su epiciclo, la más cercana a la Tierra, su giro iba en sentido contrario al avance del deferente, y desde la Tierra parecía retroceder. Como en ese tramo el planeta estaba más cerca, también brillaba más. Era una solución ingeniosa que encajaba con lo observado, pero obligaba a ajustar el tamaño y la velocidad de cada epiciclo para que coincidieran con el movimiento del Sol, sin una razón física clara.",
      "El modelo heliocéntrico ofrece una explicación más directa. La Tierra recorre su órbita a unos 29.8 km por segundo y Marte, más alejado del Sol, a unos 24.1 km por segundo. Cuando la Tierra adelanta a Marte por la pista interior, Marte parece retroceder frente a las estrellas lejanas, igual que un auto lento parece ir hacia atrás respecto a las montañas cuando lo rebasas en la carretera. Ese adelantamiento ocurre justo cuando Marte está más cerca de nosotros, y por eso brilla más.",
      "El texto del curso repite una idea muy extendida: que los astrónomos medievales añadían epiciclos sin parar. Los historiadores, entre ellos Owen Gingerich, han mostrado que no fue así: las Tablas Alfonsinas se basaban en un modelo de Ptolomeo con un epiciclo por planeta. El propio Copérnico, al mantener órbitas circulares, necesitó varias decenas de círculos y no logró predicciones mucho más exactas. Su verdadera ventaja fue la coherencia: fijó el orden y las distancias relativas de los planetas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Con su modelo centrado en el Sol, Copérnico pudo calcular por primera vez las distancias de los planetas en relación con la distancia Tierra-Sol. Obtuvo unos 0.38 para Mercurio, 0.72 para Venus, 1.52 para Marte, 5.22 para Júpiter y 9.17 para Saturno. Los valores modernos son 0.39, 0.72, 1.52, 5.20 y 9.54, muy parecidos. El sistema de Ptolomeo no permitía obtener esas proporciones a partir de las observaciones." },
      { label: "Dato Científico", icon: "atom", text: "El intervalo entre dos retrocesos se llama periodo sinódico y se calcula con la fórmula 1/S = 1/T - 1/P, donde T es el año terrestre y P el periodo orbital del planeta. Para Marte, con P de 687 días y T de 365.25 días, el resultado es de unos 780 días, casi 26 meses. Es el tiempo que tarda la Tierra, que corre por la pista interior, en sacarle una vuelta completa de ventaja a Marte." }
    ],
    fact: "El 27 de agosto de 2003, en plena época de movimiento retrógrado, Marte pasó a unos 55.76 millones de kilómetros de la Tierra, la distancia más corta en casi 60,000 años. Esa noche brillaba más que cualquier estrella del cielo. Los acercamientos entre la Tierra y Marte se repiten cada 26 meses, aproximadamente, y siempre coinciden con la mitad de su bucle retrógrado.",
  },
  {
    id: "aristarco-de-samos",
    bannerImage: '/assets/copernico/infographic_m1/banner_aristarco-de-samos.webp',
    bannerCaption: "Hacia el 270 a. C., Aristarco de Samos propuso que la Tierra gira alrededor del Sol, unos 1,800 años antes que Copérnico.",
    title: "Aristarco: el Sol en el centro, 18 siglos antes",
    color: '#8A7350',
    btnImage: '/assets/copernico/infographic_m1/btn_aristarco-de-samos.webp',
    image: '/assets/copernico/infographic_m1/hero_aristarco-de-samos.webp',
    content: [
      "Aristarco nació hacia el año 310 antes de Cristo en Samos, una isla del mar Egeo, la misma donde había nacido Pitágoras, y murió hacia el 230 antes de Cristo. Trabajó en Alejandría, el gran centro de estudios del mundo griego. Hacia el año 270 antes de Cristo propuso una idea muy diferente de la habitual: que el Sol y las estrellas estaban quietos, que la Tierra giraba sobre su eje cada día y que además daba una vuelta alrededor del Sol cada año.",
      "El libro en el que Aristarco explicaba su sistema se perdió. Lo conocemos gracias a Arquímedes, que lo resumió en su obra «El arenario», dirigida al rey Gelón de Siracusa. Allí Arquímedes cuenta que, según Aristarco, las estrellas fijas y el Sol permanecen inmóviles y la Tierra gira alrededor del Sol en un círculo. Plutarco, un escritor del siglo I, añade que el filósofo Cleantes opinaba que Aristarco debía ser acusado de impiedad por poner en movimiento el hogar del mundo.",
      "Sí se conserva otra obra suya: «Sobre los tamaños y distancias del Sol y la Luna». En ella usó la geometría para estimar que el Sol estaba entre 18 y 20 veces más lejos que la Luna. El valor real es de unas 390 veces, porque el ángulo que midió, de 87 grados, es en realidad de 89.85 grados. Aun así, su cálculo mostraba que el Sol era mucho más grande que la Tierra. Muchos historiadores piensan que por eso le pareció más lógico que el astro mayor ocupara el centro.",
      "La idea de Aristarco no convenció a la mayoría. Contradecía la física de Aristóteles, según la cual la tierra pesada debía estar en el centro, y nadie notaba que el suelo se moviera. Además, no se observaba el paralaje de las estrellas. Aristarco respondió que las estrellas estaban muchísimo más lejos de lo que se creía, algo que resultó ser cierto. Solo se conoce un seguidor antiguo de su modelo: Seleuco de Seleucia, un astrónomo que vivió en Mesopotamia hacia el año 150 antes de Cristo.",
      "Copérnico sabía de Aristarco. En el manuscrito de su gran obra lo mencionaba en un pasaje que después tachó, y que no aparece en la edición impresa de 1543. En el prólogo sí citó a otros pensadores antiguos que habían hecho moverse a la Tierra, como el pitagórico Filolao, que la imaginó girando alrededor de un fuego central. La historia de Aristarco muestra que una idea correcta no basta: también hacen falta pruebas y una física que la haga creíble."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En la Luna hay un cráter llamado Aristarco, de unos 40 kilómetros de diámetro, que se considera la formación más brillante de la cara visible. Su roca es tan reflectante que a veces se distingue a simple vista en la parte de la Luna iluminada solo por la luz que refleja la Tierra. También hay un cráter llamado Copérnico, de unos 93 kilómetros, y uno llamado Ptolomeo, de unos 150 kilómetros." },
      { label: "Dato Científico", icon: "atom", text: "El método de Aristarco es geométrico. Cuando vemos la Luna exactamente medio iluminada, el ángulo entre la Tierra y el Sol visto desde la Luna es de 90 grados. Si se mide el ángulo entre la Luna y el Sol visto desde la Tierra, se puede calcular la proporción de distancias. Con 87 grados sale unas 19 veces; con el valor real de 89.85 grados salen unas 380. Un error de 3 grados cambia el resultado veinte veces." }
    ],
    fact: "En «El arenario», Arquímedes usó el universo enorme de Aristarco para un reto matemático: calcular cuántos granos de arena cabrían en todo el cosmos. Para expresar números tan grandes inventó un sistema propio, porque la numeración griega no lo permitía, y llegó a un resultado equivalente a 10 elevado a 63, un 1 seguido de 63 ceros.",
  },
  {
    id: "astronomia-islamica",
    bannerImage: '/assets/copernico/infographic_m1/banner_astronomia-islamica.webp',
    bannerCaption: "Entre los siglos IX y XIV, astrónomos del mundo islámico tradujeron, criticaron y mejoraron la astronomía de Ptolomeo.",
    title: "Bagdad, Damasco y Toledo: el saber que viajó",
    color: '#4E6E62',
    btnImage: '/assets/copernico/infographic_m1/btn_astronomia-islamica.webp',
    image: '/assets/copernico/infographic_m1/hero_astronomia-islamica.webp',
    content: [
      "Desde el siglo VIII, el califato abasí convirtió Bagdad en un gran centro de estudios. En la Casa de la Sabiduría, sobre todo durante el reinado del califa al-Mamún, entre 813 y 833, se tradujeron al árabe obras griegas de matemáticas, medicina y astronomía, entre ellas el Almagesto. Los textos griegos también se conservaron en el Imperio bizantino, pero los astrónomos de lengua árabe no se limitaron a guardarlos: los pusieron a prueba con nuevas observaciones y corrigieron muchos de sus datos.",
      "Uno de los más precisos fue al-Battani, que vivió aproximadamente entre 858 y 929 y observó durante décadas desde Raqqa, en la actual Siria. Midió la duración del año solar en 365 días, 5 horas, 46 minutos y 24 segundos, solo unos minutos más corta que el valor real, y corrigió la inclinación del eje terrestre calculada por Ptolomeo. En Europa se le conoció como Albategnius, y Copérnico citó sus observaciones varias veces en su obra de 1543.",
      "Ibn al-Haytham, nacido hacia 965 en Basora y fallecido hacia 1040 en El Cairo, es famoso por su «Libro de óptica». También escribió «Dudas sobre Ptolomeo», donde señaló que el ecuante y otros recursos del Almagesto no podían corresponder a un movimiento físico real. Al-Biruni, que vivió entre 973 y 1048 aproximadamente, calculó el radio de la Tierra en unos 6,340 km midiendo el horizonte desde una montaña, y discutió si la Tierra podía girar sobre sí misma.",
      "En 1259 se fundó el observatorio de Maragha, en el noroeste de la actual Irán, dirigido por Nasir al-Din al-Tusi. Allí ideó el «par de Tusi», una combinación de dos círculos que produce un movimiento en línea recta y permitía prescindir del ecuante. Un siglo después, Ibn al-Shatir, encargado de medir el tiempo en la Gran Mezquita de Damasco, construyó modelos sin ecuante cuyos cálculos para la Luna y Mercurio son casi idénticos a los de Copérnico. Cómo llegaron esas ideas a Europa sigue en estudio.",
      "Toledo, en manos castellanas desde 1085, se convirtió en un puente entre culturas. Allí, hacia 1175, Gerardo de Cremona tradujo el Almagesto del árabe al latín. Entre 1252 y 1270, bajo el rey Alfonso X el Sabio, astrónomos de Toledo elaboraron las Tablas Alfonsinas, que sirvieron en Europa para calcular posiciones de planetas hasta el siglo XVI. Copérnico las conoció durante sus estudios. Esa herencia sigue en palabras astronómicas de origen árabe como cenit, nadir o alidada."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Muchas estrellas brillantes tienen nombres de origen árabe. Aldebarán significa «el seguidor», porque sale después de las Pléyades; Rigel viene de «rijl», pie, porque marca un pie de Orión; y Altair significa «el que vuela». En el año 964, el astrónomo persa al-Sufi describió en su «Libro de las estrellas fijas» una pequeña nube en Andrómeda: es la primera mención escrita conocida de la galaxia de Andrómeda." },
      { label: "Dato Científico", icon: "atom", text: "El par de Tusi funciona así: un círculo pequeño rueda por dentro de otro círculo cuyo radio es el doble. Un punto marcado en el borde del círculo pequeño no dibuja una curva, sino una línea recta que coincide con un diámetro del círculo grande. Con este truco, al-Tusi obtuvo movimientos rectilíneos usando solo círculos. Copérnico describió el mismo mecanismo en el libro III de su obra de 1543." }
    ],
    fact: "Las Tablas Alfonsinas se imprimieron por primera vez en Venecia en 1483, y así se difundieron por las universidades europeas. Alfonso X impulsó también los «Libros del saber de astronomía», escritos en castellano y no en latín, algo poco habitual en su época. En su honor, un cráter lunar de unos 110 kilómetros de diámetro lleva el nombre de Alphonsus.",
  },
  {
    id: "navegacion-y-calendario",
    bannerImage: '/assets/copernico/infographic_m1/banner_navegacion-y-calendario.webp',
    bannerCaption: "En el siglo XV la astronomía guiaba a los navegantes y fijaba la fecha de la Pascua; sus errores impulsaron nuevos modelos.",
    title: "Barcos y calendarios: la astronomía útil",
    color: '#5A6B80',
    btnImage: '/assets/copernico/infographic_m1/btn_navegacion-y-calendario.webp',
    image: '/assets/copernico/infographic_m1/hero_navegacion-y-calendario.webp',
    content: [
      "En el siglo XV, los navegantes portugueses y castellanos que exploraban el Atlántico calculaban su latitud midiendo la altura de la estrella Polar o la del Sol al mediodía con instrumentos como el astrolabio náutico y el cuadrante. Para usar el Sol necesitaban tablas que indicaran su posición cada día del año. Una de las más usadas fue el «Almanach perpetuum» del astrónomo Abraham Zacut, formado en Salamanca, impreso en 1496 en Leiria, Portugal.",
      "Cristóbal Colón zarpó de Palos de la Frontera el 3 de agosto de 1492 y llegó a la isla de Guanahani el 12 de octubre. Navegó sobre todo por estima, calculando la posición a partir del rumbo, la velocidad y el tiempo transcurrido, y sus medidas de latitud con el cuadrante tuvieron errores notables. En su cuarto viaje, varado en Jamaica, consultó las efemérides de Regiomontano, impresas en Núremberg en 1474, para predecir el eclipse lunar del 29 de febrero de 1504.",
      "La latitud se podía obtener de las estrellas, pero la longitud, es decir, la posición en dirección este-oeste, era un problema mucho más difícil. Para calcularla había que saber la diferencia horaria entre el barco y un puerto de referencia, porque cada hora de diferencia equivale a 15 grados de longitud. Sin relojes precisos en el mar, los errores podían ser de cientos de kilómetros. En 1598, el rey Felipe III de España ofreció un premio a quien resolviera el problema de la longitud.",
      "El calendario era otro problema astronómico. El calendario juliano, implantado por Julio César en el año 45 antes de Cristo, suponía que el año dura 365.25 días, pero el año solar dura unos 365.2422 días. La diferencia, de unos 11 minutos por año, suma un día completo cada 128 años. El Concilio de Nicea, en el año 325, había ligado la fecha de la Pascua al equinoccio de primavera, fijado el 21 de marzo, pero hacia 1500 el equinoccio real ya caía unos 10 días antes.",
      "Durante el Concilio de Letrán, celebrado entre 1512 y 1517, el papa León X pidió opiniones a expertos para reformar el calendario. Copérnico fue consultado, pero respondió que los movimientos del Sol y de la Luna aún no se conocían con suficiente precisión. La reforma llegó con el papa Gregorio XIII: el jueves 4 de octubre de 1582 fue seguido por el viernes 15 de octubre. Los cálculos se apoyaron en las Tablas Prusianas de 1551, basadas en el modelo de Copérnico."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Santa Teresa de Jesús murió en Alba de Tormes la noche del 4 de octubre de 1582 y fue enterrada al día siguiente, que ya era el 15 de octubre por la reforma gregoriana. Otro caso curioso: Miguel de Cervantes y William Shakespeare murieron con fecha del 23 de abril de 1616, pero no el mismo día, porque España ya usaba el calendario gregoriano e Inglaterra todavía usaba el juliano." },
      { label: "Dato Científico", icon: "atom", text: "El calendario gregoriano mantiene un año bisiesto cada 4 años, pero elimina los años terminados en 00 que no se pueden dividir entre 400. Por eso 1900 no fue bisiesto y el año 2000 sí lo fue. Así quedan 97 años bisiestos cada 400 años, lo que da un año medio de 365.2425 días. La diferencia con el año solar es tan pequeña que solo acumula un día de error en más de 3,000 años." }
    ],
    fact: "No todos los países adoptaron el calendario gregoriano a la vez. España, Portugal, Italia y Polonia lo hicieron en 1582, pero Rusia no lo adoptó hasta 1918. Por eso la Revolución de Octubre, que comenzó el 25 de octubre de 1917 según el calendario juliano que se usaba en Rusia, corresponde al 7 de noviembre en el calendario gregoriano.",
  },
  {
    id: "joven-copernico-renacimiento",
    bannerImage: '/assets/copernico/infographic_m1/banner_joven-copernico-renacimiento.webp',
    bannerCaption: "Nacido en Toruń en 1473, Copérnico estudió en Cracovia, Bolonia y Padua antes de proponer un universo centrado en el Sol.",
    title: "El joven Copérnico en el Renacimiento",
    color: '#7A5560',
    btnImage: '/assets/copernico/infographic_m1/btn_joven-copernico-renacimiento.webp',
    image: '/assets/copernico/infographic_m1/hero_joven-copernico-renacimiento.webp',
    content: [
      "Nicolás Copérnico, Mikołaj Kopernik en polaco, nació el 19 de febrero de 1473 en Toruń, una ciudad comercial a orillas del río Vístula que pertenecía al Reino de Polonia. Su padre, un comerciante, murió cuando él tenía unos diez años, y su tío materno, Lucas Watzenrode, que después sería obispo de Varmia, se encargó de su educación. Gracias a su apoyo, Copérnico pudo estudiar en algunas de las mejores universidades de Europa y obtener después un puesto como canónigo.",
      "Creció en pleno Renacimiento. Hacia 1450, Johannes Gutenberg había desarrollado en Maguncia la imprenta de tipos móviles, y su Biblia se terminó hacia 1455; en 1500 ya circulaban miles de ediciones impresas por toda Europa. Leonardo da Vinci pintó «La última cena» entre 1495 y 1498, Colón llegó a América en 1492 y Vasco da Gama alcanzó la India por mar en 1498. Entre 1519 y 1522, la expedición de Magallanes, completada por Juan Sebastián Elcano, dio la primera vuelta al mundo.",
      "Entre 1491 y 1495, Copérnico estudió artes liberales en la Universidad de Cracovia, donde se enseñaba astronomía con los textos de Georg von Peurbach y las Tablas Alfonsinas. En 1496 se trasladó a Bolonia, en Italia, para estudiar derecho canónico. Allí vivió en casa del astrónomo Domenico Maria Novara, con quien hizo observaciones. El 9 de marzo de 1497 registró cómo la Luna ocultaba la estrella Aldebarán, una observación que más tarde incluyó en su gran obra.",
      "En el año 1500 estuvo en Roma, donde observó un eclipse lunar el 6 de noviembre. Entre 1501 y 1503 estudió medicina en Padua, y en mayo de 1503 obtuvo el doctorado en derecho canónico en la Universidad de Ferrara. Después regresó a Varmia, donde fue canónigo de la catedral de Frombork durante el resto de su vida. Además de astrónomo, trabajó como médico, administrador y economista: en 1526 escribió un tratado sobre la acuñación de moneda.",
      "Hacia 1514, Copérnico ya había escrito el «Commentariolus», un breve manuscrito en el que proponía que la Tierra gira alrededor del Sol. Lo compartió solo con algunos colegas y dedicó casi tres décadas a desarrollar los cálculos. En 1539 lo visitó el joven matemático Georg Joachim Rheticus, que lo animó a publicar. Su obra «De revolutionibus orbium coelestium» se imprimió en Núremberg en 1543, el mismo año en que Copérnico murió en Frombork, el 24 de mayo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante siglos no se supo dónde estaba enterrado Copérnico. En 2005, unos arqueólogos encontraron restos bajo el suelo de la catedral de Frombork, y en 2008 su ADN se comparó con cabellos hallados en un libro que perteneció al astrónomo, conservado en la Universidad de Upsala, en Suecia. Coincidían. El 22 de mayo de 2010, sus restos fueron enterrados de nuevo en la misma catedral." },
      { label: "Dato Científico", icon: "atom", text: "El «Commentariolus» resumía la nueva idea en siete postulados. Entre ellos: la Tierra no es el centro del universo, sino solo el de la órbita de la Luna; todos los planetas giran alrededor del Sol; la distancia de la Tierra al Sol es diminuta comparada con la distancia a las estrellas; el giro diario del cielo se debe a la rotación de la Tierra; y el movimiento retrógrado de los planetas se debe al movimiento de la propia Tierra." }
    ],
    fact: "En 2010, la Unión Internacional de Química Pura y Aplicada aprobó el nombre copernicio para el elemento químico 112, de símbolo Cn, creado por primera vez en 1996 en el laboratorio GSI de Darmstadt, Alemania. El nombre se anunció oficialmente el 19 de febrero de 2010, día en que se cumplían 537 años del nacimiento de Nicolás Copérnico.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradCopernicoM1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B5F7A", "#7A6A4F", "#6B4F5E", "#8A7350", "#4E6E62", "#5A6B80", "#7A5560"];
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
          <linearGradient id="gradCopernicoM1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL COSMOS GEOCÉNTRICO ANTES DE 1543</text>
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
          layoutId="activeDotCopernicoM1"
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
export default function InteractiveInfographic_CopernicoM1() {
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
              🏆 De Aristóteles y el Almagesto de Ptolomeo a las aulas de Bolonia y Padua
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
